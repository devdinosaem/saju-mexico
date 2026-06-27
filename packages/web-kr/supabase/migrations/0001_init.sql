-- ════════════════════════════════════════════════════════════════
-- 사주TI 백엔드 초기 스키마 (Supabase / Postgres)
-- 정책 반영:
--   · 일주(정체성)는 사용자당 1개 (profiles.ilju_key)
--   · 미니홈피 방 데이터 = rooms.data(jsonb), 캐릭터 N개는 data 안에서 관리
--   · 친구 = 실제 유저 간 초대/수락 (friendships)
--   · 방명록: 친구만 작성, 내 글 또는 내 벽의 글 삭제 가능 (RLS로 강제)
-- ════════════════════════════════════════════════════════════════

-- ── profiles : auth.users 1:1 확장 ──────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text not null,
  ilju_key    text not null,                       -- 일주 1개 (불변식)
  birth_info  jsonb,                               -- 생년월일/시 등 사주 입력
  friend_code text unique not null
                default lower(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
  created_at  timestamptz not null default now()
);

-- ── friendships : 초대/수락 관계 ────────────────────────────────
create table if not exists public.friendships (
  id           uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles(id) on delete cascade,
  addressee_id uuid not null references public.profiles(id) on delete cascade,
  status       text not null default 'pending' check (status in ('pending','accepted')),
  created_at   timestamptz not null default now(),
  unique (requester_id, addressee_id),
  check (requester_id <> addressee_id)
);
create index if not exists friendships_addressee_idx on public.friendships(addressee_id);
create index if not exists friendships_requester_idx on public.friendships(requester_id);

-- ── rooms : 사용자당 1개 미니홈피 (방 데이터 JSON) ───────────────
create table if not exists public.rooms (
  user_id    uuid primary key references public.profiles(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,   -- { stickers, chars, charPos, skinId }
  updated_at timestamptz not null default now()
);

-- ── guestbook_entries : 방명록 ──────────────────────────────────
create table if not exists public.guestbook_entries (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null references public.profiles(id) on delete cascade,  -- 벽 주인
  author_id  uuid not null references public.profiles(id) on delete cascade,  -- 작성자
  message    text not null check (char_length(message) between 1 and 100),
  created_at timestamptz not null default now()
);
create index if not exists guestbook_owner_idx on public.guestbook_entries(owner_id, created_at desc);

-- ── 친구 여부 헬퍼 (RLS에서 사용) ───────────────────────────────
create or replace function public.are_friends(a uuid, b uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.friendships f
    where f.status = 'accepted'
      and ( (f.requester_id = a and f.addressee_id = b)
         or (f.requester_id = b and f.addressee_id = a) )
  );
$$;

-- ── updated_at 자동 갱신 ────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists rooms_touch on public.rooms;
create trigger rooms_touch before update on public.rooms
  for each row execute function public.touch_updated_at();

-- ════════════════════════════════════════════════════════════════
-- RLS (Row Level Security)
-- ════════════════════════════════════════════════════════════════
alter table public.profiles          enable row level security;
alter table public.friendships       enable row level security;
alter table public.rooms             enable row level security;
alter table public.guestbook_entries enable row level security;

-- profiles : 로그인 유저는 모두 조회 가능(친구/방문자 표시용), 본인만 생성·수정
create policy "profiles_select" on public.profiles
  for select to authenticated using (true);
create policy "profiles_insert" on public.profiles
  for insert to authenticated with check (id = auth.uid());
create policy "profiles_update" on public.profiles
  for update to authenticated using (id = auth.uid());

-- friendships : 당사자만 조회/생성/수정/삭제
create policy "friendships_select" on public.friendships
  for select to authenticated
  using (requester_id = auth.uid() or addressee_id = auth.uid());
create policy "friendships_insert" on public.friendships
  for insert to authenticated with check (requester_id = auth.uid());
create policy "friendships_update" on public.friendships
  for update to authenticated
  using (requester_id = auth.uid() or addressee_id = auth.uid());
create policy "friendships_delete" on public.friendships
  for delete to authenticated
  using (requester_id = auth.uid() or addressee_id = auth.uid());

-- rooms : 본인 + 친구는 읽기, 본인만 쓰기
create policy "rooms_select" on public.rooms
  for select to authenticated
  using (user_id = auth.uid() or public.are_friends(auth.uid(), user_id));
create policy "rooms_insert" on public.rooms
  for insert to authenticated with check (user_id = auth.uid());
create policy "rooms_update" on public.rooms
  for update to authenticated using (user_id = auth.uid());

-- guestbook : 작성은 친구(또는 본인)만, 조회는 주인·작성자·주인의 친구, 삭제는 작성자 또는 벽주인
create policy "guestbook_select" on public.guestbook_entries
  for select to authenticated
  using (owner_id = auth.uid()
      or author_id = auth.uid()
      or public.are_friends(auth.uid(), owner_id));
create policy "guestbook_insert" on public.guestbook_entries
  for insert to authenticated
  with check (author_id = auth.uid()
          and (owner_id = auth.uid() or public.are_friends(auth.uid(), owner_id)));
create policy "guestbook_delete" on public.guestbook_entries
  for delete to authenticated
  using (author_id = auth.uid() or owner_id = auth.uid());
