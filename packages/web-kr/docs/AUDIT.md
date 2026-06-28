# 사주KR 기능·정책 정합성 총정리 (마스터 리포트)

> 작성 시작: 2026-06-28 · 범위: 감사/리포트 (코드 수정 별도 합의)
> 기준 문서: 기획 스프레드시트(탭/기능/대상/정책/비용/퍼널) 사진 1장
> 기준 코드: `packages/web-kr` (활성 앱 = `src/app/v3/**`)
>
> 표기: ✅ 구현·정합 / ⚠️ 부분·불일치 / ❌ 미구현 / 🆕 문서에 없는 구현 / 🟦 미결정
> 짝꿍 문서: [AUDIT-MATRIX.md](./AUDIT-MATRIX.md) (사진 표 구조 그대로 + 실제 상태 컬럼)

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

## Phase 1 — 1탭 사주상품  *(진행 예정)*
## Phase 2 — 2탭 상담  *(진행 예정)*
## Phase 3 — 3탭 운테리어  *(진행 예정)*
## Phase 4 — 4탭 마이 (캘린더 편입 포함)  *(진행 예정)*
## Phase 5 — 상단 액막이샵/충전·구독  *(진행 예정)*

---

## 부록 A. 문서→서비스 역행(🆕) 누적
- 운기달력 독립 탭 (삭제 예정)
- saju-play API 5종 (self/nextmonth/sinsal/some/onesided) — 사진엔 기능명만, 백엔드 LLM 연동 명시 없음
- *(Phase 진행하며 누적)*

## 부록 B. 미결정(🟦) 누적
- 운기달력 탭 제거 후 슬롯 처리 (4탭 vs 액막이샵 승격)
- 가격 SSOT 단일화 + self/sinsal/some/onesided 정식 가격 항목
- 일괄 1명태 vs 차등가 정책 확정
- 구독: 명태 결제 vs 원화 결제
- *(Phase 진행하며 누적)*
