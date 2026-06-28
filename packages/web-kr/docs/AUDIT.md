# 사주KR 기능·정책 정합성 총정리 (마스터 리포트)

> 작성 시작: 2026-06-28 · 범위: 감사/리포트 (코드 수정 별도 합의)
> 기준 문서: 기획 스프레드시트(탭/기능/대상/정책/비용/퍼널) 사진 1장
> 기준 코드: `packages/web-kr` (활성 앱 = `src/app/v3/**`)
>
> 표기: ✅ 구현·정합 / ⚠️ 부분·불일치 / ❌ 미구현 / 🆕 문서에 없는 구현 / 🟦 미결정
> 짝꿍 문서: [AUDIT-MATRIX.md](./AUDIT-MATRIX.md) (사진 표 구조 그대로 + 실제 상태 컬럼)

---

## 경영 요약 (TL;DR)

**콘텐츠·AI·UI는 출시급, 비즈니스 레이어(결제·인증·소셜)는 프로토타입.** 23개 라우트 전수 감사 결과:

- ✅ **잘 됨**: 상담(앱 최고 완성도), 사주분석 리포트(saju-play 키트+DeepSeek AI+명리계산), 궁합, 미니홈피/마이 UI, 콘텐츠 감수성 규칙.
- 🔴 **치명적 미완**:
  1. **결제 0** — `spend()`는 앱 전체에서 상담 1곳뿐. 1탭 페이월은 `setUnlocked(true)` 목업, 샵 구매는 `alert("결제 준비중")`, 충전·구독은 버튼만. **실매출 경로 없음.**
  2. **소셜 0** — 방명록/친구/스토리/인벤토리 전부 단일기기 localStorage. 서버 없음.
  3. **인증 mock** — Supabase 미이관, 로그인/생일 게이트 미적용.
- 🟠 **정합성**: 가격이 4곳(사진·prices.ts·products.ts·UI하드코딩)에 분산되어 제각각. 목업 데이터·디자인 시안이 프로덕션 화면에 잔존.

→ **출시 차단 요인 = 결제·인증·소셜 백엔드.** 상세는 [부록 C 리스크](#부록-c-최중대-리스크-top-경영-판단용)·[부록 D 완성도](#부록-d-기능-완성도-한눈에).

---

## 0. 감사 방법론

각 기능을 세 축으로 본다.

1. **구현 여부** — 라우트/화면이 존재하고 렌더되는가
2. **작동 범위** — 어디까지 동작하는가 (목업 vs 실데이터, 결제·DB 연동, 입력→출력 흐름)
3. **정책 반영** — 비용/퍼널/대상 정책이 코드에 실제로 반영됐는가

추가 2개 축(요청 ②③):

4. **문서→서비스 역행(🆕)** — 코드엔 있는데 문서에 없는 기능/정책
5. **미결정(🟦)** — 사진 밖에서 결정이 필요한 화면/정책/UX

---

## Phase 0 — 전역 인프라

### 0.1 탭 구조 (사진 ↔ 실제)

실제 하단 내비: [`src/app/v3/_nav/BottomNav.tsx`](../src/app/v3/_nav/BottomNav.tsx)

| 사진 문서 | 실제 앱 (BottomNav) | 상태 |
|---|---|---|
| 1탭 - 상품 | 사주상품 `/v3/shop` | ✅ |
| 2탭 - 상담 | 상담 `/v3/consult` | ✅ |
| (없음) | **운기달력 `/v3/calendar`** | 🆕→🗑️ **삭제 예정** (사용자 확정 2026-06-28). 캘린더는 마이 하위로 |
| 3탭 - 운테리어 | 운테리어 `/v3/interior` | ✅ |
| 4탭 - 마이 | 마이 `/v3/my` | ✅ |
| 상단탭 - 액막이샵 | (충전 `/v3/charge`는 별도 진입) | ⚠️ 위치 불일치 — 상단탭 형태 미확인, Phase 5에서 정밀 확인 |

- **`/v3` 루트는 `/v3/shop`으로 리다이렉트** ([`v3/page.tsx`](../src/app/v3/page.tsx)). 첫 화면 = 사주상품 탭.
- 하단 탭은 5개 → 운기달력 제거 시 **4개**가 되어 사진 문서와 정합.
- **결정필요 🟦**: 운기달력 탭 제거 후 빈 슬롯을 액막이샵(상단탭)로 채울지, 4탭 유지할지.

### 0.2 유저 상태 모델

출처: [`src/lib/UserContext.tsx`](../src/lib/UserContext.tsx), [`src/lib/mockAuth.ts`](../src/lib/mockAuth.ts)

- `useUser()` → `{ user, ilju, isLoggedIn, hasIlju }` 단일 소스. (정책: localStorage 직접 구독 금지 — 메모리 규칙과 정합 ✅)
- **로그인 출처 이원화**: Supabase 설정 시 세션 기반, 미설정 시 mock localStorage(`saju-mock-user`). 현재는 mock 경로가 기본.
- `MockUser = { loggedIn, provider(kakao|naver), birthDate, iljuId }`.
- `birthDate`: 이름·생년월일·시·분·AM/PM·성별. `isBirthDateComplete()`로 완성도 검증.
- `iljuId`: 일주 1개(불변). 일주 캐릭터 N개는 별도(메모리 [[project-ilju-character-invariant]]).
- ⚠️ **인증 미완성**: 실제 인증은 `auth/callback/route.ts`(OAuth) 1개뿐. 회원가입/세션은 사실상 mock. 프로덕션 전 Supabase 이관 필요.

### 0.3 명태(통화)·결제 시스템

출처: [`src/lib/prices.ts`](../src/lib/prices.ts), [`src/lib/balance.ts`](../src/lib/balance.ts), [`src/lib/products.ts`](../src/lib/products.ts)

| 항목 | 값/상태 |
|---|---|
| 명태 환율 | `WON_PER_MYONGTAE = 980` (1명태 ≈ 980원) |
| 잔액 저장 | localStorage `saju-balance-mock` (목업). 신규 유저 = **0명태** (시드/무료질문 없음) |
| 차감/환불 | `spend()`/`refund()`/`useBalance()` — 실시간 구독 훅. 0.1 부동소수 보정 |
| 상품 SSOT | `products.ts` (6도메인: sticker/character/skin/report/consult/plan), id 컨벤션 `{domain}.{slug}` |
| 지급 모델 | permanent(영구 소유) / consumable(명태 차감) / term(구독) |

#### ⚠️ 시스템적 문제 1 — 가격이 SSOT를 우회해 UI에 하드코딩

[`shop/page.tsx`](../src/app/v3/shop/page.tsx)에서 다수 상품 가격이 **문자열 하드코딩**되어 `prices.ts`와도, 사진 문서와도 불일치. (제품별 표는 Phase 1)

| 상품 | shop 하드코딩 | prices.ts(SSOT) | 사진 문서 |
|---|---|---|---|
| 나 사용설명서(self) | `0.8명태` | (항목 없음) | 1명태 |
| 내 신살 도감(sinsal) | `0.9명태` | (항목 없음) | 1명태 |
| 다음달 운(nextmonth) | `0.7명태` | exFortune `0.6` | 1명태 |
| 썸 궁합(some) | `0.8명태` | (항목 없음) | 1명태 |
| 짝사랑(onesided) | `0.8명태` | (항목 없음) | 1명태 |
| 올해운/상세/커플/오늘/월운 | `priceLabel(PRICES.*)` 사용 ✅ | 정합 | 부분 정합 |

→ **결정필요 🟦**: (a) 가격 정책의 진짜 SSOT를 `prices.ts`로 단일화하고 UI 하드코딩 제거, (b) self/sinsal/some/onesided 가격을 `prices.ts`에 정식 항목으로 추가, (c) 사진 문서의 "1명태" 일괄가 vs 실제 차등가(0.6~0.9) 중 무엇이 정책인지 확정.

#### ⚠️ 시스템적 문제 2 — 구독가 표기 3중 불일치

- 사진 문서: 구독 **2명태**
- `products.ts`: `plan.monthly` = **₩2,900/월**
- `shop/page.tsx` 구독 카드: **₩2,900/월** (하드코딩)
→ 명태 결제인지 원화 결제인지 정책 확정 필요. (2,900원 ≈ 2.96명태)

### 0.4 공통 퍼널

사진의 표준 퍼널: `(가입) → (생년월일) → 로딩 → [맛보기 → 결제] → 상세 결과`

- 가입: mock `loginMockUser()` / 생년월일: `saveMockBirthDate()` / 일주: `saveMockIlju()`
- 로딩: `app/generating/[id]/page.tsx` 존재 (Phase 1에서 실제 연결 확인)
- 맛보기→결제 게이트: `balance.spend()` 기반 (각 상품 페이지에서 확인 — Phase 1)
- ⚠️ 퍼널 일관성(어떤 상품이 맛보기를 거치고 어떤 게 바로 결제인지)은 상품별 편차 가능 → Phase 1 정밀 확인

### 0.5 API 라우트 인벤토리

```
app/api/consult/greeting      app/api/consult/route      app/api/consult/summary
app/api/saju-play/self        app/api/saju-play/nextmonth
app/api/saju-play/sinsal      app/api/saju-play/some      app/api/saju-play/onesided
```

- 🆕 **compat/couple은 API 라우트 없음** → 클라이언트 계산이거나 무료(LLM 미사용)일 가능성. Phase 1 확인.
- 🆕 미사용 의심: `consult/greeting` (메모리 [[project-consult-pending]]에 "미사용 greeting 라우트 정리" 과제 기록됨).

---

## Phase 1 — 1탭 사주상품

### 1.1 구조 — "saju-play 키트" 공유 퍼널 프레임워크

[`src/lib/saju-play/`](../src/lib/saju-play/). 상품 5종(self/sinsal/nextmonth/some/onesided)이 공통 셸을 공유:
`page.tsx(스텁)` → `core.tsx(퍼널 셸)` + `*-adapter.ts(명리 계산)` + `flavor.ts(카피)` + `engine.ts(오행 엔진)`.
퍼널 단계: **로딩(연출) → 무료 표지(teaser) → 페이월 게이트(blur+잠금카드) → 전체 리포트**.
썸/짝사랑은 `crush/core.tsx` 1개를 `config`(some.ts/onesided.ts)로 갈아끼움.

### 1.2 상품별 상태

| 상품 | 라우트/구현 | 작동 범위 | AI 백엔드 | 결제 | 정책 정합 |
|---|---|---|---|---|---|
| 일주카드 | `IljuDiscovery`(shop) | ✅ 렌더 | - | 무료 | ⏳ 진입만 확인, 상세 흐름 미확인 |
| 내 사주 분석(유명인) | `CelebFunnel`(shop) | ✅ 나/타인 입력→결과 | 클라계산(`genOhaengAnalysis`) | ❌ **목업** | ⚠️ "차감됩니다" 문구만, 실제 차감X |
| 친구 궁합 | `/v3/compat` (551줄) | ✅ 실구현 | 클라 추정(API없음) | 무료 ✅ | ⏳ 흐름 정밀확인 P 잔여 |
| 커플 궁합 | `/v3/couple` (443줄) | ✅ 실구현 | 클라 추정(API없음) | 무료 ✅ | ✅ `coupleCompat=0` 정합 |
| 나 사용설명서(self) | `saju-play/self` | ✅ 풀 리포트(7챕터+보너스) | ✅ DeepSeek | ❌ **목업** | ⚠️ 0.8 하드코딩·차감X |
| 다음달 운(nextmonth) | `saju-play/nextmonth` | ✅ | ✅ DeepSeek | ❌ **목업** | ⚠️ 0.7 하드코딩·차감X |
| 12·18신살(sinsal) | `saju-play/sinsal` | ✅ | ✅ DeepSeek | ❌ **목업** | ⚠️ 0.9 하드코딩·차감X |
| 썸 궁합(some) | `crush+some config` | ✅ | ✅ DeepSeek(apiPath) | ❌ **목업** | ⚠️ 0.8 하드코딩·차감X |
| 짝사랑(onesided) | `crush+onesided config` | ✅ | ✅ DeepSeek | ❌ **목업** | ⚠️ 0.8 하드코딩·차감X |

### 1.3 ⚠️ 시스템적 문제 3 — **결제(페이월)가 전부 목업, 명태 미차감** (최중대)

- 모든 saju-play 퍼널의 "결제" 버튼 = `onClick={() => setUnlocked(true)}` 뿐. **`spend()`·잔액확인·잔액부족 처리 전무.** ([self/core.tsx:736](../src/lib/saju-play/self/core.tsx#L736), sinsal:512, nextmonth:450, crush:992)
- `CelebFunnel`도 CTA가 `setStep("result")` — "명태 잔액에서 차감됩니다"는 **문구만** ([CelebFunnel.tsx:413-417](../src/app/v3/shop/_components/CelebFunnel.tsx#L413))
- 즉 1탭 **유료 상품 전부가 사실상 무료로 열림.** 명태 잔액 시스템([balance.ts](../src/lib/balance.ts))은 존재하나 상품 결제에 **배선 안 됨** (실제 소모는 상담만으로 추정 → Phase 2 확인).
- → **결정필요 🟦**: 페이월에 `spend(price)` 연결 + 잔액부족 시 충전 유도 + 재열람 정책(한번 사면 보관함에서 무료 재열람? `unlocked` 영속화?) 설계.

### 1.4 ⚠️ 시스템적 문제 4 — 로그인/생일 게이트 미적용, 폴백 생일 사용

- saju-play 퍼널은 `isLoggedIn`/`hasIlju` **게이트 없음**. 계정 생일 없으면 `FALLBACK_BIRTH`(self=1995-03-15, sinsal/nextmonth=1990-02-14)로 렌더 — dev 폴백이 운영 경로에 노출.
- 사진 퍼널 `(가입)→(생년월일)→...` 의 앞단(가입·생일 강제)이 **미구현**. self/core.tsx:231 주석도 "지금은 폴백 생일로 렌더(dev)" 인정.
- → **결정필요 🟦**: 비로그인/생일미등록 시 (a) 입력 시트 강제 vs (b) 게스트 체험 허용 정책 확정.

### 1.5 AI 백엔드

- self/sinsal/nextmonth/some/onesided → `app/api/saju-play/*` (edge). **DeepSeek `deepseek-v4-flash`** 호출, `DEEPSEEK_API_KEY` 필요. 키 없거나 실패 시 **로컬 폴백 줄글**로 graceful degrade. ✅ 견고
- 프롬프트에 콘텐츠 감수성 규칙(강점 프레임·결함단어 금지·시기전망 절망 금지) 내장 — 메모리 [[feedback-ilju-content-sensitivity]]와 정합 ✅
- ⚠️ 모델 ID `deepseek-v4-flash` 외부 의존 — 키 미설정 시 전 상품이 폴백 품질로만 동작.

### 1.6 일주카드·유명인 진입

- `IljuDiscovery`/`CelebDiscovery`(shop) → 호기심 후킹. `CelebFunnel`은 나/타인(`target`) 분기 + `SajuInputSheet`(타인은 `skipSave`) ✅ 대상 정책(나/타인) 반영.

## Phase 2 — 2탭 상담

[`/v3/consult/page.tsx`](../src/app/v3/consult/page.tsx) (947줄) — **앱에서 가장 완성된 기능. 1탭이 따라야 할 레퍼런스 구현.**

### 2.1 결제 — ✅ 제대로 배선됨 (1탭과 정반대)

- 턴 전송 시 `spend(CONSULT_COST)` 차감([page:530](../src/app/v3/consult/page.tsx#L530)), AI 응답 실패 시 `refund`([:597,602](../src/app/v3/consult/page.tsx#L597)). ✅ 트랜잭션 안전.
- `CONSULT_COST = 0.1명태/턴` (`prices.aiConsultPerTurn`).
- ⚠️ **사진 정책 "1명태"와 불일치** — 실제는 0.1명태/**턴** 종량제. 사진은 회당 1명태처럼 읽힘 → 과금 모델(턴당 vs 회당) 명문화 필요.

### 2.2 게이팅 퍼널 — ✅ 구현 (1탭에 없는 것)

`gate = !hasIlju ? "card" : (balance < CONSULT_COST ? "charge" : null)` ([:417-419](../src/app/v3/consult/page.tsx#L417))
- 일주카드 없음 → "사주카드 뽑기" 유도 / 잔액 부족 → "명태 충전" 유도(`/v3/charge`).
- 입력창 placeholder·플로팅 CTA가 상태별로 분기 ✅. 사진 퍼널의 결제 게이트가 여기선 실제 작동.

### 2.3 대화 지속·재접속 — ✅ 구현

- `loadHistory/saveHistory` (localStorage, [consult-history.ts](../src/lib/consult-history.ts))로 대화 영속.
- **재접속 시 요약+이어받기 그리팅**: `resumeWithSummary` → `/api/consult/summary`로 요약 생성, `getSummaryCache/setSummaryCache`로 캐시. `SUMMARY_WINDOW=40`으로 비용 폭증 방지. ✅ 사진 퍼널 "재접속→AI그리팅" 정합.

### 2.4 AI 백엔드

- `/api/consult/route.ts` — DeepSeek `deepseek-v4-flash` **스트리밍**(SSE), `max_tokens=2100`(2500자 상한). `DEEPSEEK_API_KEY` 필요.
- 시스템 프롬프트가 매우 정교 — 깊이6동작·일반론 자가검증·시기전망 두 실패모드(절망/공허) 방지·욕설거부 정체성 등. 메모리 [[project-saju-consult-prompt]]와 정합 ✅.

### 2.5 미결/정리 대상

- 🗑️ `/api/consult/greeting/route.ts` — 페이지에서 fetch 호출 없음(요약 경로만 사용). **미사용 의심** → 정리 후보. 메모리 [[project-consult-pending]] 기록과 일치.
- ⚠️ 대화 이력 localStorage 저장 → **DB(Supabase) 이관 미완**. 기기간 동기화·영속 불가.
- ⚠️ `next build` 검증·수동 E2E 미완(메모리 과제).

## Phase 3 — 3탭 운테리어

[`/v3/interior/page.tsx`](../src/app/v3/interior/page.tsx). 구성: 스토리 → 미니홈피(MiniRoom) → 방의 기운(오행그래프) → 방명록 → 보관함 → 친구 미니홈피.

### 3.1 기능별 상태

| 기능(사진) | 구현 | 작동 범위 | 비고 |
|---|---|---|---|
| 스토리 | `StoryRow` | ✅ UI | 친구 스토리 행 + 친구추가. 사진 정책(활동시 테두리·일간기반 매일문구) 반영 여부 ⏳ |
| 내 미니홈피 꾸미기 | `MiniRoom`/`/v3/my/room` | ✅ UI | 소품 배치·스킨 |
| 내 미니홈피 방명록 | `guestbook` | ✅ but ⚠️ | **localStorage만** — 타인이 실제로 남길 수 없음 |
| 내 미니홈피 오행 그래프 | `RoomElementCard` 외 4종 | ⚠️ **미결** | 시안 5종 동시 노출 |
| 소품/캐릭터/스킨샵 | `interior/inventory/[type]` | ❌ **구매 미구현** | 보유표시·가격(SSOT)만, 구매=alert |
| 친구 미니홈피 | `interior/[friend]` | ✅ UI | 친구 목록→방문 |

### 3.2 🔴 시스템적 문제 5 — 샵 구매 미구현 (수익화 확정 결론)

- **앱 전체에서 `spend()` 호출 지점은 상담(consult:530) 단 하나.** ([전역 grep 결과](../src/lib/balance.ts#L30))
- 보관함 "구매하기" 버튼 = `onClick={() => alert("결제 준비중 🌙")}` ([inventory/page.tsx:586](../src/app/v3/inventory/page.tsx#L586)). 카트는 위시리스트 토글만.
- 소품/캐릭터/스킨 가격은 SSOT(`ITEM_PRICES`)로 정상 표시되나 **명태 차감·소유 적재 로직 없음.**
- `inventory.ts`에 `purchase()`(spend+owned 추가) 함수 자체가 부재. 접근 판정(`canAccess`)·소유목록 구조만 존재.
- → **결론**: 1탭(목업 페이월) + 3탭(alert 구매) 합산 → **상담 외 전 결제가 미배선.** 수익화 = 상담 종량제만 작동.

### 3.3 🔴 시스템적 문제 6 — 소셜 레이어가 전부 단일기기 localStorage

- 방명록(`gbKey` localStorage), 친구(`useFriends`/[friends.ts](../src/lib/friends.ts)), 인벤토리·대표캐릭터 모두 localStorage. **서버 동기화 없음** → 친구가 내 방명록에 실제로 글을 남기거나, 친구의 진짜 미니홈피를 보는 게 불가능(샘플/로컬 데이터).
- 즉 "운테리어=소셜" 컨셉의 핵심(타인 상호작용)이 **백엔드 미구현**. 사진의 스토리 정책("친구가 방 꾸미거나 방명록 달리면 테두리 생김")은 서버 없이는 성립 불가.
- → **결정필요 🟦**: 소셜 백엔드(방명록/친구/스토리 활동) 설계 — Supabase 등.

### 3.4 🟠 미완 — 오행 그래프 시안 5종 동시 노출

[interior/page.tsx:121-142](../src/app/v3/interior/page.tsx#L121): "방의 기운"이 `현재/시안A/B/C/D` **5개 카드로 동시 렌더**(주석 "임시·시안 비교"). 프로덕션 화면에 디자인 비교본이 그대로 노출 — **1종 선택 후 나머지 제거 필요.**

### 3.5 접근 등급 레지스트리

- `STICKER_ACCESS`: CrystalBall/MagicWand/Tarot/Crystal=purchase, Crown=subscription, 나머지 free. `CHARACTER_ACCESS={}`(전부 free 판정), 스킨은 `RoomSkin.access` 개별 정의.
- ⚠️ 구독(`isSubscribed`) 기반 해금 경로는 있으나 구독 결제(Phase 5)가 미배선이라 실효 없음.

## Phase 4 — 4탭 마이

[`/v3/my/page.tsx`](../src/app/v3/my/page.tsx).

### 4.1 항목별 상태 (사진 ↔ 실제)

| 사진 항목 | 실제 | 상태 | 비고 |
|---|---|---|---|
| 프로필 | `MyHero` | ✅ | 공유 카드 시트 |
| 내 명식 | `MyMyeongsikCard` + `SajuInputSheet`→`calcIlju`→`saveMockIlju` | ✅ | 팔자·오행분포, 수정 시 일주 재계산 |
| 캘린더 | `MonthCalendar` (+`TodaySaju`,`WeeklyEnergyFlow`) | ✅ 🆕 | **운기달력 탭에서 마이로 이전 완료** (주석 "운기달력에서 이전") — 사용자 결정과 정합 |
| 사주 보관함 | `COLLECTION`/`PURCHASED` 배열 | ❌ **하드코딩 목업** | "23", "엄마 궁합 91%", "경진일주" 고정. 실제 구매내역 미연동. 카테고리도 사진(일주/나/친구/커플/다음달/살/썸/짝사랑)과 불일치 |
| 소품 보관함 | (운테리어로 분리) | ⚠️ 위치이동 | 마이엔 없음, `interior/inventory`로 |
| 친구 관리 | `FRIENDS` 배열(지인 위젯) | ❌ **하드코딩 목업** | 엄마/남친/친구 고정. `useFriends` 미사용 → 메모리 [[project-friend-model]] 단일소스 **위반** |
| 계정 관리 | "계정 설정" 버튼 | ❌ | onClick 없음(placeholder) |
| 홈 화면 바로가기 등록 | (없음) | ❌ | 미구현(PWA add-to-homescreen 부재) |

### 4.2 추가 위젯 (🆕 사진 미기재 — 리텐션 기능)

- 명태 잔액/충전/내역(`MyongtaeCard`), 오늘의 사주(`OhneulSajuCard`+`TodaySaju`), 주간 에너지(`WeeklyEnergyFlow`), 출석체크(`attendanceReward` 0.1명태, SSOT ✅).
- 메모리 [[project-saju-retention]]의 5대 기능 중 오늘사주·월운캘린더·주간에너지 3종이 마이에 집결. 오행 트래커·궁합 캘린더는 별도 위치/미확인.
- ⚠️ 출석체크·알림설정·계정설정·구독관리 카드 모두 **onClick 없는 시각 버튼**(미배선).

## Phase 5 — 상단 액막이샵 / 충전·구독

### 5.1 충전 [`/v3/charge`](../src/app/v3/charge/page.tsx)

- 잔액 카드: `BALANCE_MOCK_KEY` localStorage 실시간 구독 ✅. (⚠️ 초기값 `useState(5.2)` 목업 — balance.ts의 신규=0 정책과 불일치)
- 충전 플랜: 작은명태 1개 ₩980 / 큰명태 10개 ₩9,500(3%할인). **버튼에 onClick 없음 → 실제 충전(PG 결제) 미구현.**
- "쓰는 곳" 표는 SSOT(`PRICES`) 사용 ✅ — 단 이 표의 값(올해운0.6·상세1·유명인2·상담0.1)이 **shop UI 하드코딩(0.7~0.9)과 또 불일치.**
- 이용 내역(`HISTORY`) 하드코딩 목업. 환불 정책 문구 존재("미사용분 환불").

### 5.2 구독 — ❌ 화면 자체가 없음

- 사진: "상단탭-액막이샵 = 충전 + 구독". 실제 `/v3/charge`는 **충전만**. 구독은 shop·my의 "₩2,900/월" 카드 버튼뿐(onClick 없음, 관리 화면 없음).
- `products.ts`엔 `plan.monthly`(term) 모델 정의됨 + `inventory.isSubscribed` 해금 경로 존재하나, **구독 결제·상태 토글 UI 전무.**
- 사진 구독 혜택(매월 다음달운 지급 / 영구 컬러스킨 / 영구 캘린더)은 미구현.

### 5.3 "액막이샵" 상단탭 — ❌ 미구현

- 사진의 "상단탭-액막이샵" 진입점 없음. `/v3/charge`가 shop "← 돌아가기"로만 연결(상단탭 아님). 명칭도 "명태 지갑/충전"으로 다름.

### 5.4 🔴 시스템적 문제 7 — 결제 파이프라인 전체 미배선 (PG 0)

| 단계 | 상태 |
|---|---|
| 충전(원화→명태) | ❌ 버튼만, PG(토스 등) 미연동 |
| 소비(명태→상품) | ⚠️ 상담만 ✅, 1탭/샵 전부 ❌ |
| 구독(원화 정기) | ❌ 화면 없음 |
→ **실매출 발생 가능 경로 0개.** 명태는 충전할 수도, (상담 외) 쓸 수도 없음.

---

## 부록 A. 문서→서비스 역행(🆕) 누적
- 운기달력 독립 탭 (삭제 예정)
- saju-play API 5종 (self/nextmonth/sinsal/some/onesided) — 사진엔 기능명만, DeepSeek LLM 연동 명시 없음
- 올해운 미리보기(yearFortune 0.6명태) — 사진 미기재 상품
- 오늘의 사주(무료) — 사진 미기재, 라우트 연결 확인필요
- saju-play 키트(공유 퍼널 프레임워크) — 문서엔 상품명만, 구조 무명시
- *(Phase 진행하며 누적)*

## 부록 B. 미결정(🟦) 누적
- 운기달력 탭 제거 후 슬롯 처리 (4탭 vs 액막이샵 승격)
- 가격 SSOT 단일화 + self/sinsal/some/onesided 정식 가격 항목
- 일괄 1명태 vs 차등가(0.6~0.9) 정책 확정
- 구독: 명태 결제 vs 원화 결제(₩2,900)
- 소품/캐릭터/스킨 가격: 사진(캐릭터2·스킨3) vs 코드(캐릭터3·스킨2) 정정
- **페이월 실결제 연결**(spend) + 잔액부족 충전유도 + 1회구매 재열람(unlocked 영속) 정책
- 비로그인/생일미등록: 입력시트 강제 vs 게스트 체험 허용
- *(Phase 진행하며 누적)*

### 부록 B 추가 (Phase 4~5)
- 마이 사주보관함·친구관리(지인) 하드코딩 → 실데이터 연동 + `useFriends` 단일소스로 통합
- 계정관리·홈화면 바로가기·알림설정 미구현 — 구현 여부/우선순위 결정
- "쓰는 곳" 표(charge)와 shop UI 가격 불일치 → SSOT 단일화로 동시 해소
- charge 잔액 초기값 5.2 목업 → 0(정책)으로

## 부록 C. 최중대 리스크 TOP (경영 판단용)
1. 🔴 **결제 파이프라인 전체 미배선** — 충전(PG)·상품결제(상담 제외)·구독 모두 미구현. `spend()` 호출은 앱 전체에서 상담 1곳뿐. **실매출 경로 0.** (Phase 1·3·5)
2. 🔴 **소셜 백엔드 부재** — 방명록/친구/스토리/인벤토리 전부 단일기기 localStorage. "운테리어=소셜" 컨셉의 타인 상호작용 불가. (Phase 3)
3. 🔴 **인증 미완성** — 로그인/세션 사실상 mock, Supabase 이관 미완. 로그인/생일 게이트도 미적용(폴백 생일). (Phase 0·1)
4. 🟠 **가격 정책 4중 분산** — 사진/prices.ts/products.ts/UI하드코딩이 제각각. 구독 명태 vs 원화, 소품 캐릭터·스킨가 뒤바뀜. (전 Phase)
5. 🟠 **목업 데이터 잔존** — 마이 보관함·지인, charge 내역, 운테리어 오행그래프 시안 5종 등 프로덕션에 목업/시안 노출. (Phase 3·4·5)

## 부록 D. 기능 완성도 한눈에
| 영역 | 완성도 | 한 줄 |
|---|---|---|
| 상담(2탭) | 🟢 높음 | 결제·게이팅·재접속·AI 전부 실구현. 레퍼런스 |
| 사주분석 콘텐츠(1탭 리포트) | 🟢 높음 | saju-play 키트·AI·명리계산 충실. **단 결제만 목업** |
| 궁합(커플/친구) | 🟢 높음 | 무료·실구현 |
| 미니홈피 UI(3탭) | 🟡 중간 | 화면 O, 소셜 백엔드·구매 X |
| 마이 위젯(4탭) | 🟡 중간 | 명식·캘린더·명태 O, 보관함·지인 목업 |
| 결제/충전/구독 | 🔴 낮음 | 상담 외 전부 미배선 |
| 인증/계정 | 🔴 낮음 | mock 단계 |
| 소셜(친구/방명록) | 🔴 낮음 | localStorage 목업 |
