-- ════════════════════════════════════════════════════════════════
-- 소셜 백엔드 정책 반영 (0002)
-- 근거: docs/SOCIAL-BACKEND-POLICY.md §11 확정 결정
--   · #2 "사주 볼 타인" = saved_profiles (본인 전용, 앱유저 무관)
--   · #4 프로필 공개범위 = 기본 친구만 + is_public + friend_code 직접조회
-- ════════════════════════════════════════════════════════════════

-- ── #4 프로필 공개 플래그 ────────────────────────────────────────
alter table public.profiles
  add column if not exists is_public boolean not null default false;

-- profiles 조회 정책 교체: (구) 로그인 전체공개 → 본인 / 공개프로필 / 친구관계(대기·수락 모두)
-- 대기(pending)도 허용해야 친구요청 발신·수신자가 서로 프로필을 볼 수 있음.
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select to authenticated
  using (
    id = auth.uid()
    or is_public
    or exists (
      select 1 from public.friendships f
      where (f.requester_id = auth.uid() and f.addressee_id = profiles.id)
         or (f.addressee_id = auth.uid() and f.requester_id = profiles.id)
    )
  );

-- friend_code 직접 조회 경로 — RLS 우회(SECURITY DEFINER)로 '코드를 정확히 아는' 경우만
-- 최소 정보(id·이름·일주) 반환. 친구 추가 전 상대 확인용.
create or replace function public.find_profile_by_code(p_code text)
returns table (id uuid, name text, ilju_key text)
language sql
stable
security definer
set search_path = public
as $$
  select p.id, p.name, p.ilju_key
  from public.profiles p
  where p.friend_code = lower(p_code)
  limit 1;
$$;
grant execute on function public.find_profile_by_code(text) to authenticated;

-- ── #2 saved_profiles : 내가 저장한 타인 사주 (친구관계와 무관, 본인 전용) ──
create table if not exists public.saved_profiles (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null references public.profiles(id) on delete cascade,
  name       text not null,
  ilju_key   text not null,
  birth_info jsonb,                                  -- 생년월일/시 (CelebFunnel '타인' 입력)
  created_at timestamptz not null default now()
);
create index if not exists saved_profiles_owner_idx
  on public.saved_profiles(owner_id, created_at desc);

alter table public.saved_profiles enable row level security;

create policy "saved_profiles_select" on public.saved_profiles
  for select to authenticated using (owner_id = auth.uid());
create policy "saved_profiles_insert" on public.saved_profiles
  for insert to authenticated with check (owner_id = auth.uid());
create policy "saved_profiles_update" on public.saved_profiles
  for update to authenticated using (owner_id = auth.uid());
create policy "saved_profiles_delete" on public.saved_profiles
  for delete to authenticated using (owner_id = auth.uid());
