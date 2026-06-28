# 소셜 백엔드 정책 (Social Backend Policy)

> 목적: 방명록·친구·스토리·미니홈피를 단일기기 localStorage → Supabase 실연동으로 전환하기 전,
> 정책을 못 박는 문서. 구현 착수 전 합의용.
> 기준: `supabase/migrations/0001_init.sql`(스키마+RLS), `SUPABASE-SETUP.md`(트랙 B 계획), 실제 소셜 UX.

## 0. 현재 상태 (2026-06-28)

| 레이어 | 상태 |
|---|---|
| 스키마(profiles·friendships·rooms·guestbook + RLS) | ✅ 작성됨(0001_init.sql). 원격 적용 여부 미확인 |
| Supabase 클라이언트(`lib/supabase/*`) | ✅ 있음. `isSupabaseConfigured=true`(.env.local 실 크레덴셜) |
| 인증(카카오 로그인 → 세션) | ❌ 미완. `auth/callback` 라우트만, 로그인 버튼이 OAuth 미발동. 생일·일주는 mock localStorage |
| 데이터 실연동(테이블 read/write) | ❌ **0%**. 앱 전체에서 `supabase.from(...)` 호출 0건 |
| 소셜 데이터(친구·방명록·방·스토리) | ⚠️ 전부 localStorage 단일기기 |

→ **핵심 의존성: 소셜 데이터(Phase 3)는 인증(Phase 2)을 전제로 한다.** RLS가 전부 `auth.uid()` 기반이라, 실유저 세션 없이는 read/write 자체가 불가.

---

## 1. 신원·계정 정책 (스키마 확정)

- **1유저 = 1 profile** (`profiles`, auth.users 1:1). 가입 시 생성.
- **일주 1개 불변** (`profiles.ilju_key`). 메모리 [[project-ilju-character-invariant]]와 정합.
- **생년월일** = `profiles.birth_info`(jsonb).
- **친구 코드** = `profiles.friend_code` (8자 랜덤, unique) → 친구 추가 키.
- **소셜 로그인 = 1차 카카오만** (SUPABASE-SETUP 명시). 네이버는 후속.
- 🟦 **결정필요**: 비로그인 게스트가 사주 분석(1탭)은 체험 가능하되, **소셜 기능은 로그인 강제**가 맞는지 (권장: 강제).

## 2. 친구 정책 (스키마 확정 + 갭)

- **상호 친구** (`friendships`: requester→addressee, status `pending`/`accepted`). **초대→수락** 양방향.
- 추가 방법: 상대 **friend_code 입력** 또는 **초대 링크 공유**(카카오 공유). (현 StoryRow "친구 초대"는 `navigator.share`로 URL만 뿌림 → friend_code 연결 필요)
- RLS: 당사자만 조회/생성/수정/삭제.
- 🟦 **"친구 관리" vs "계정 관리" 구분** (사진): 
  - *친구 관리* = 스토리/미니홈피에 노출되는 **상호 친구**(friendships) ✅ 스키마 있음.
  - *계정 관리 = "사주 볼 타인 리스트"* = 내가 **생일을 입력해 저장해 둔 타인의 사주**(앱 유저가 아닐 수도). CelebFunnel "타인"(skipSave) 흐름과 연결. **친구(friendships)와 별개 개념** → 스키마에 테이블 없음.
  - 🟦 **결정필요**: "사주 볼 타인"을 (a) 개인 저장 프로필(신규 `saved_profiles` 테이블, 앱유저 무관) (b) 친구와 통합 (c) 보류 중 무엇으로?

## 3. 미니홈피(rooms) 정책 (스키마 확정)

- **1유저 1방** (`rooms.user_id` PK, `data` jsonb = `{stickers, chars, charPos, skinId}`).
- 캐릭터 N개는 `data.chars` 안에서(불변식: 일주1·캐릭터N).
- RLS: **본인+친구 읽기, 본인만 쓰기**. `updated_at` 자동 갱신(스토리 활동 신호로 사용).
- 마이그레이션: 현 `inventory`(소품/스킨/캐릭터 owned)·방 배치 localStorage → rooms.data로 이관 또는 신규.

## 4. 방명록 정책 (스키마 확정)

- `guestbook_entries`: `owner_id`(벽 주인)·`author_id`(작성자)·`message`(**1~100자**).
- RLS: **작성=친구 또는 본인만**, 조회=주인·작성자·주인의 친구, 삭제=작성자 또는 벽 주인.
- 현 localStorage 방명록(작성자=이름 문자열)은 실유저 id 기반으로 전환.
- 🟦 **결정필요**: 신고/차단·수정 기능 v1 포함 여부 (권장: v1은 삭제만, 신고/수정 후순위).

## 5. 스토리 정책 (⚠️ 갭 — 미구현)

사진 정책: "**테두리**: 친구가 방 꾸미거나 방명록 달리면 생김 / **바텀시트 문구**: 일간 기반 매일 생성".

현 구현([StoryRow.tsx](../src/app/v3/my/_components/StoryRow.tsx)):
- 링이 **항상 오행색**(활동 무관). `RING_ON`(핑크-골드 활동링) 정의돼 있으나 미사용. `daewun` 하드코딩 false.
- 바텀시트 문구 = **오행별 정적 5종**(`ELEM_MSG`). 일간 기반도, 매일 생성도 아님.

→ 설계 필요:
- **활동 링 점등 규칙**: 친구의 `rooms.updated_at` 또는 `guestbook_entries.created_at`(내가 안 본 것)이 최근이면 활동링(`RING_ON`). "안 봤음" 판정 = last-seen 타임스탬프 비교.
- **일간 기반 매일 문구**: 친구의 일간 × 오늘 날짜 → 하루 1개 문구. 🟦 **결정필요**: 생성 방식
  - (a) **클라이언트 결정적 생성**(일간+날짜 시드로 풀에서 선택) — 무비용·재현가능·오프라인. 풀은 일간(또는 오행)×템플릿.
  - (b) **서버 일배치/LLM** — 풍부하지만 비용·인프라(cron/edge).
  - (c) 현 오행 5종 풀을 일간(60)×다회로 **정적 확장**.
- 🟦 **결정필요**: 스토리 정렬·만료(최근 활동순? 24h 만료?).

## 6. 공개범위·프라이버시

- 스키마 현재: `profiles_select = true`(로그인 유저면 **누구나 타인 이름+일주 조회 가능** — 디스커버리/친구표시용). 방·방명록은 친구 한정.
- 🟦 **결정필요**: profiles 전체 공개 유지 vs 친구만(코드로 찾을 때만). 디스커버리(같은 일주 유저 등) 기능을 살리려면 전체 공개가 편하지만 프라이버시 약함.

## 7. 알림

- 신호: **친구 요청 수신**, **새 방명록**(현 `hasNew` 빨간 점은 localStorage 기반).
- 🟦 권장: v1은 **인앱 배지/뱃지**만(쿼리 기반). 푸시(웹푸시/카카오)는 후순위.

## 8. 샘플/마이그레이션

- 현 `SAMPLE_FRIENDS`(NEXT_PUBLIC_SAMPLE_FRIENDS=1) = 로컬 테스트 전용.
- 🟦 **결정필요**: localStorage 친구/방명록/방 데이터 → (a) **폐기(fresh start, 권장)** — 테스트 더미라 이관 가치 낮음 (b) 로그인 후 1회 이관.
- 실연동 후 샘플 친구는 백엔드 시드(테스트 계정)로 대체하거나 제거(SETUP Phase 4).

## 9. 실시간

- 🟦 **결정필요**: 방명록·스토리 갱신을 (a) **진입 시 refetch + 수동 새로고침**(단순, 권장 v1) vs (b) Supabase Realtime 구독(즉시성, 복잡).

---

## 10. 권장 시퀀스 (구현 순서)

1. **인증 실연동(Phase 2)** — 카카오 로그인 버튼→OAuth, `/auth/callback`, 세션 미들웨어, UserContext가 profiles 사용. **소셜의 전제.**
2. **profiles 부트스트랩** — 최초 로그인 시 일주/생일/friend_code 생성(온보딩).
3. **친구**(friendships) — 코드 추가·초대 수락·목록.
4. **방(rooms)·방명록(guestbook)** 실연동.
5. **스토리** — 활동 링 + 일간 문구.
6. **정리(Phase 4)** — localStorage 친구모델·샘플 제거.

---

## 11. 확정 결정 (2026-06-28)

| # | 결정 | 확정값 | 영향 |
|---|---|---|---|
| 1 | 시퀀싱 | **데이터부터(고정 테스트 유저)** | 카카오 OAuth UI는 후순위. 테스트 계정(Supabase 이메일 유저)으로 로그인해 RLS 충족하며 데이터층 먼저 구축 |
| 2 | "사주 볼 타인" | **별도 `saved_profiles` 테이블** | 친구(friendships)와 분리. 내가 저장한 타인 사주(앱유저 무관). 본인만 접근 |
| 3 | 스토리 문구 | **클라이언트 결정적 생성** | 일간×날짜 시드 → 풀에서 선택. 무비용·오프라인·매일 변함. 테이블 불필요 |
| 4 | 프로필 공개범위 | **기본 친구만 + `is_public` 플래그** | profiles_select RLS 변경: self OR 친구 OR is_public. 향후 일부 유저 공개 대비 |
| 5 | 소셜 로그인 강제 | 강제(소셜 기능 한정) | 1탭 사주분석은 게스트 체험 유지 |
| 6 | 방명록 신고·수정 | v1 삭제만 | 신고/수정 후순위 |
| 7 | 스토리 정렬·만료 | 최근 활동순, 만료 없음(v1) | last-seen으로 활동링 점등 |
| 8 | 로컬 데이터 마이그레이션 | **폐기(fresh start)** | 기존 localStorage 친구/방명록은 테스트 더미 → 이관 안 함 |
| 9 | 실시간 | refetch(진입 시)·수동 새로고침 | Realtime 후순위 |
| 10 | 스토리 last-seen | 클라 localStorage(per-friend) | 읽음 상태는 기기 로컬로 충분(v1) |

### 데이터 모델 추가 (결정 반영)
- 🆕 `saved_profiles` — 결정 #2. `{ id, owner_id(본인), name, ilju_key, birth_info jsonb, created_at }`. RLS: 본인만 CRUD.
- 🆕 `profiles.is_public boolean default false` — 결정 #4. `profiles_select` RLS를 self/친구/is_public로 교체.
- 스토리는 테이블 없음(결정 #3·#10): 활동링 = 친구 `rooms.updated_at`/`guestbook.created_at` vs 로컬 last-seen, 문구 = 클라 결정적.

### 수정된 구현 시퀀스 (데이터부터)
1. **마이그레이션 0002** — saved_profiles + profiles.is_public + RLS 갱신.
2. **테스트 유저 셋업** — Supabase 이메일 테스트 계정 + 시드 profiles/friendships(테스트 친구).
3. **데이터 접근 레이어**(`lib/social/*`) — friendships·rooms·guestbook·saved_profiles CRUD(supabase client).
4. **UI 실연동** — useFriends/방명록/MiniRoom/StoryRow를 localStorage→supabase로 교체.
5. **스토리** — 활동링(updated_at/last-seen) + 일간 결정적 문구.
6. **인증(Phase 2)** — 카카오 OAuth로 테스트유저 대체.
7. **정리** — 샘플·localStorage 친구모델 제거.
