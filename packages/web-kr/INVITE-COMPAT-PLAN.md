# 친구 초대 + 그룹 궁합 설계 (INVITE & COMPAT)

> 상태: **설계 확정, 미구현.** 카카오 로그인(동의항목) 작동이 전 단계 선결.
> 백엔드 기반: `supabase/migrations/0001_init.sql`(profiles·friendships·rooms·guestbook).

## 확정된 결정

- **1:1 친구 초대**: `friend_code` 링크 + **auto-accept**(클릭 시 즉시 양방향 친구). `friendships.status=pending`은 추후 "코드 검색 친구신청"용.
- **그룹 궁합**: **로그인-퍼스트** + **맛보기 오픈**(결과 아하모먼트는 안 가림) + 결과화면 **전원 친구추가 기본 ON**.
- **신원**: 로그인-퍼스트라 참여자는 항상 계정(익명 티어 없음 → 친구 그래프·백엔드 단순).
- **친구 생성 프리미티브 1개**: `accept_invite(code)` / `add_friend(target)` RPC. 궁합도 이걸 재사용.

## 데이터 모델 (추가 마이그레이션 0002)

```sql
create table public.compat_sessions (
  id uuid primary key default gen_random_uuid(),
  host_id uuid references public.profiles(id) on delete set null,
  capacity int not null check (capacity between 2 and 4),
  status text not null default 'open' check (status in ('open','done')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '24 hours'  -- 만료 후 정리
);

create table public.compat_participants (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.compat_sessions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,  -- 로그인-퍼스트
  slot int not null,
  ilju_key text not null,      -- 입력 사주에서 계산
  birth_info jsonb,
  created_at timestamptz not null default now(),
  unique (session_id, user_id),
  unique (session_id, slot)
);
```

RLS: 세션/참여자 select는 인증 유저(링크 id가 capability). 쓰기는 RPC 경유(capacity 검증).

## RPC (security definer, 멱등)

```
accept_invite(p_code text)        -- 1:1: code→inviter, friendship(inviter, me, accepted). self/중복 체크
add_friend(p_target uuid)         -- friendship(me, target, accepted). 결과화면 전원추가용 (1행=양방향, are_friends가 양방향 판정)
create_compat_session(p_cap int) → session_id
join_compat(p_session, p_ilju, p_birth)  -- open·capacity 검증 후 다음 slot 배정 + participant insert. 다 차면 status='done'
```
※ 궁합 계산은 서버 RPC 불필요 — 참여자 `ilju_key`들을 읽어 **클라이언트에서 계산**(기존 궁합 로직 재사용).

## 라우트

- `/invite?ref={friend_code}` — ref 저장 → 로그인/온보딩 게이트 → `accept_invite` → "○○와 친구가 됐어요"
- `/compat/[id]` — 세션·참여자 로드 → **맛보기(호스트 일주) 먼저 노출** → "너도 넣어봐" → 로그인-퍼스트 → 사주 입력 → `join_compat` → 다 차면 궁합 결과 + **전원 친구추가(기본 ON)**
- `/auth/callback` — 구현됨 (OAuth code→세션)

## 플로우

**1:1 초대 (A→B)**
```
A 스토리 "친구 초대" → 로그인 확인 → Kakao Share(링크 /invite?ref=A.friend_code, A 대표캐릭터 카드)
B 클릭 → ref 저장 → (비로그인) 카카오 로그인 → 신규면 사주입력→profiles → accept_invite(ref) → 친구 완료
```

**그룹 궁합 (단톡)**
```
호스트 → create_compat_session → 링크 /compat/{id} 카톡 공유 ("○○가 궁합 보자고 초대")
참여자 → 랜딩 맛보기 → "카카오로 1초 입장" → 사주 입력 → join_compat
2~4 다 참 → 궁합 % 결과 → "전원 친구 추가"(기본 ON, 빼고싶은 사람만 해제) → add_friend 일괄
```

## 친구 정책 요약
- 궁합 참여 자체는 친구 생성 안 함 → **결과화면 opt-out형(기본 ON)** 으로 전원 추가
- 단톡=이미 아는 사이라 default-on 자연스러움. 모두 계정이라 분기 없음

## 성장 루프
```
단톡 궁합 링크 → 맛보기 → "카카오 1초 입장"(친구 훅) → 궁합 결과 → 전원 친구 → 미니홈피 → 리텐션
```

## 의존성 / 선결 (구현 순서)
- **B0** 카카오 동의항목(KOE205) → 로그인 작동 ← **선결**
- **B1** 온보딩 → `profiles` 생성 (Phase 2 잔여)
- **B2** `accept_invite`/`add_friend` RPC + `/invite` 라우트 (1:1)
- **B3** compat 스키마(0002) + `create/join_compat` + `/compat` 라우트 + 전원친구
- **B4** Kakao JS SDK 공유 연결 (JS키 `3f095cb…` + SDK 도메인 등록) — 양쪽 링크 발송
- 별도: 일주간 궁합 계산 로직 위치 확인 (shop SquadSection/PairsSection에 이미 있을 가능성)
