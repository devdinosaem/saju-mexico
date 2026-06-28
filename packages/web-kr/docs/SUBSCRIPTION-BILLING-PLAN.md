# 구독 빌링 기획안 (SAJUPLAY 명태 구독)

> 작성: 2026-06-29 · 상태: **정책 확정 (P1 착수 가능)**
> 결제 PG: 토스페이먼츠 빌링(자동결제) · 충전 PG([charge])와 동일 제공자
> 짝꿍: [AUDIT.md](./AUDIT.md) §5.2 구독, [prices.ts](../src/lib/prices.ts), [products.ts](../src/lib/products.ts), [inventory.ts](../src/lib/inventory.ts)

---

## 0. 근본 제약 (먼저 읽기)

충전과 결정적으로 다른 점: **구독의 핵심은 "매월 자동 청구"인데, 이건 서버 없이는 원천적으로 불가능하다.**

- 자동결제 = **빌링키(billingKey)를 서버에 저장**해두고 **매월 서버 스케줄러(cron)가 청구**하는 구조. 브라우저 localStorage로는 불가(사용자가 매월 그 시각에 앱을 열 리 없음).
- 토스 **빌링(자동결제)은 라이브에서 일반결제보다 심사가 까다롭고 별도 계약**. (테스트는 즉시 가능)

→ **테스트모드 완성 범위**: 카드 등록(빌링키 발급) → 첫 회 즉시 청구 → 구독 ON → 혜택 적용 → 해지(상태). **"매월 자동 갱신"만 서버(P5) 단계로 분리.** 이 선을 명확히 긋는다. (충전 PG와 동일하게, 적립/상태는 테스트에선 localStorage → 라이브에선 auth+서버 ledger로 교체)

---

## 1. 확정 정책 (§11 결정 로그)

> 2026-06-29 사용자 확정.

| 항목 | 결정 |
|---|---|
| 가격 | **₩1,960/월** (표시 "2명태/월") — `SUBSCRIPTION_MONTHLY_WON` |
| 주기 | 월 1회 자동결제 |
| 결제수단 | 카드 **빌링키**(토스) |
| 해지 | 앱 내 **1탭 즉시 해지**(다크패턴 금지·법 의무) → 자동결제 중단 |
| 해지 후 이용 | 이미 낸 당월은 **다음 청구일까지 이용** 후 종료 (기간 만료형) |
| 환불 | **7일 이내 + 그달 혜택 미사용 → 전액 환불**(전자상거래법 필수). 그 외 중도해지는 잔여기간 환불 없음(기간 보장), 약관 명확 고지 |
| 고지 | 첫 결제·갱신 전 가격·주기·해지법 안내 |

### 혜택 3종 (확정)

| 혜택 | 확정 내용 | 배선 |
|---|---|---|
| ① 매월 다음달운 | 구독자는 **다음달운(nextmonth) 페이월 무료**(월 1회) | `usePaidReport`에 `freeIfSubscribed` 분기 + 월 1회 사용 카운트 |
| ② 컬러 스킨 | **구독 중에만 해금** (사진의 "영구" 폐기 — 해지 시 자동 잠김) | `canAccess(access==="subscription")` = `isSubscribed` (이미 구현됨). `ownedSkins` 적재 **안 함** |
| ③ 프리미엄 캘린더 | **신설**: 무료=기본 월운 / 구독=**길일·택일·시간대별 운·중요일 알림** 등 고급 | 별도 미니 스펙 필요(P4). 무료 캘린더는 현행 유지 |

> ⚠️ ③은 별도 기능 개발이라 P4 범위가 늘어남. 프리미엄 캘린더 세부 항목(어떤 고급기능을 넣을지)은 P4 직전 별도 확정.

### 근거 — 해지/환불 (한국 법령)

- **7일 청약철회**: 결제 후 7일 내 + 콘텐츠 미이용 시 전액 환불 (전자상거래법).
- **중도해지**: 계속거래는 언제든 해지 가능, 환불 부당거부 금지.
- **해지 절차**: 앱/웹에서 간편하게(다크패턴 불공정행위).
- **유료전환 고지**: 7일 전 사전고지.
- 표준약관은 일할환불도 권장하나, ₩1,960 소액엔 "기간 만료형 + 7일 청약철회"가 법 최소요건 충족 + 운영 단순. *실제 출시 약관은 법무 검토 권장.*
- 출처: 금융위 구독경제 표준약관 / 전자상거래법(국가법령정보센터) / 정기구독 유료전환 고지(생활법령).

---

## 2. 기술 흐름 (토스 빌링)

```
[카드 등록]  클라: payment.requestBillingAuth("카드", { customerKey, successUrl, failUrl })
              → 카드 등록창 → successUrl?customerKey=&authKey= 리다이렉트
[키 발급]    서버: authKey + customerKey → POST /v1/billing/authorizations/issue
              → billingKey 발급 → 저장 (테스트:localStorage / 라이브:서버 필수)
[첫 청구]    서버: billingKey로 POST /v1/billing/{billingKey} (amount ₩1,960)
              → 구독 status=active, currentPeriodEnd=+1개월
[매월 갱신]  ★서버 cron: 만료일 도래 → billingKey 재청구 → 기간 연장   ← P5(서버 전제)
[해지]       status=canceled → 자동청구 중단, currentPeriodEnd까지 혜택 유지
```

테스트모드 데모 = 카드등록 ~ 첫청구 ~ 혜택 ~ 해지. 매월 갱신은 P5.

---

## 3. 상태 모델 (신규 `lib/subscription.ts`)

`inventory.isSubscribed`(단순 bool, 만료 개념 없음)를 만료 기반 구조로 확장.

```ts
export type SubStatus = "active" | "canceled" | "none"
export type Subscription = {
  status: SubStatus
  billingKey?: string        // 테스트: localStorage / 라이브: 서버
  customerKey: string
  startedAt: number
  currentPeriodEnd: number   // 다음 청구일(ms)
  canceledAt?: number
  benefitUsedMonth?: string  // "2026-06" — ① 다음달운 월 1회 사용 판정
}
// 파생: isSubscribed = status !== "none" && Date.now() < currentPeriodEnd
```

→ `inventory.isSubscribed`는 이 파생값을 주입(기존 `canAccess` 로직 그대로 활용). localStorage 키 예: `saju-subscription-v1`.

---

## 4. 화면/UX

- **구독 카드** (shop·my): 현행 "₩2,900" → **₩1,960** 정정 + onClick → 카드등록.
- **구독 관리 화면** `/v3/subscription` (신규):
  - 미구독: 혜택 3종 소개 + "구독 시작"(카드등록 결제창)
  - 구독중: 상태·다음 청구일·"구독 해지"(1탭) + 7일 청약철회 안내
- **리다이렉트** `/v3/subscription/success`·`/fail`: 충전(charge/success)과 동형 패턴 재사용.

---

## 5. 구현 단계

| Phase | 내용 | 서버 필요 |
|---|---|---|
| **P1** | `subscription.ts` 상태모델·SSOT, 가격표기 정정(₩1,960), 구독카드 onClick 자리 | X |
| **P2** | 빌링키 발급: 클라 `requestBillingAuth` + 서버 `/api/billing/issue` | X(테스트) |
| **P3** | 첫 청구(`/api/billing/charge`) + 구독 active + 관리화면 `/v3/subscription` + 해지 | X(테스트) |
| **P4** | 혜택 배선 ①(nextmonth 무료) ②(스킨 해금 검증) ③(프리미엄 캘린더 — 세부 스펙 먼저) | X |
| **P5** | 자동갱신 cron + billingKey·구독상태 **서버 ledger 이관** (auth 전제) | ✅ |

P1~P4 = 테스트모드 가능, P5 = auth+서버 단계(충전 PG와 동일한 선).

---

## 6. 잔여 결정 (P4 직전)

- 프리미엄 캘린더 세부 기능 목록 확정(길일/택일/시간대별운/알림 중 무엇을).
- ① 다음달운 "월 1회 무료"의 리셋 기준(`benefitUsedMonth` = 결제월 기준 vs 캘린더월 기준).
