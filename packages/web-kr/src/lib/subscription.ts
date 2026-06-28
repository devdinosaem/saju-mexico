// 명태 구독 상태 — SSOT (순수 함수, RSC-safe). React 훅은 hooks/useSubscription.ts.
// 정책: docs/SUBSCRIPTION-BILLING-PLAN.md. 테스트:localStorage / 라이브:서버 ledger(P5).
// inventory.isSubscribed(단순 bool)와 달리 "만료일(currentPeriodEnd)" 개념을 가진다.

export const SUBSCRIPTION_KEY = "saju-subscription-v1"
export const SUBSCRIPTION_CHANGE_EVENT = "saju-subscription-change"

export type SubStatus = "active" | "canceled" | "none"

export type Subscription = {
  status: SubStatus
  billingKey?: string        // 테스트: localStorage / 라이브: 서버 전용
  customerKey: string        // 빌링키 발급용 기기 식별자
  startedAt: number
  currentPeriodEnd: number   // 다음 청구일(ms). 해지해도 이 시점까지 혜택 유지
  canceledAt?: number
  benefitUsedMonth?: string  // "2026-06" — 혜택① 다음달운 월 1회 사용 판정용
}

export const EMPTY_SUBSCRIPTION: Subscription = {
  status: "none", customerKey: "", startedAt: 0, currentPeriodEnd: 0,
}

export function loadSubscription(): Subscription {
  if (typeof window === "undefined") return EMPTY_SUBSCRIPTION
  try {
    const raw = localStorage.getItem(SUBSCRIPTION_KEY)
    if (raw) return { ...EMPTY_SUBSCRIPTION, ...JSON.parse(raw) }
  } catch {}
  return EMPTY_SUBSCRIPTION
}

export function saveSubscription(sub: Subscription): void {
  if (typeof window === "undefined") return
  try { localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(sub)) } catch {}
  window.dispatchEvent(new Event(SUBSCRIPTION_CHANGE_EVENT))
}

/**
 * 구독 활성 여부(파생). active든 canceled든 "기간 만료 전"이면 혜택 유지(기간 만료형 정책).
 */
export function isSubscribed(sub: Subscription = loadSubscription()): boolean {
  return sub.status !== "none" && Date.now() < sub.currentPeriodEnd
}

/** customerKey 보장(빌링키 발급에 필요). 없으면 생성·저장. */
export function ensureCustomerKey(): string {
  const sub = loadSubscription()
  if (sub.customerKey) return sub.customerKey
  const key = `cust_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
  saveSubscription({ ...sub, customerKey: key })
  return key
}

/** 다음 청구일(+1개월). */
export function addOneMonth(from: number = Date.now()): number {
  const d = new Date(from)
  d.setMonth(d.getMonth() + 1)
  return d.getTime()
}

/** 구독 활성화 — 첫 청구 성공 후 호출(P3 빌링에서 사용). */
export function activateSubscription(billingKey: string, periodEnd: number): void {
  const sub = loadSubscription()
  saveSubscription({
    ...sub,
    status: "active",
    billingKey,
    startedAt: sub.startedAt || Date.now(),
    currentPeriodEnd: periodEnd,
    canceledAt: undefined,
  })
}

/** 해지 — 자동결제 중단, 기간 만료까지 혜택 유지(중도 차단 안 함). */
export function cancelSubscription(): void {
  const sub = loadSubscription()
  if (sub.status === "none") return
  saveSubscription({ ...sub, status: "canceled", canceledAt: Date.now() })
}

// ── 혜택① 다음달운 월 1회 무료 (캘린더월 기준 — 매월 1일 리셋) ──
const benefitMonthKey = (d: Date = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`

/** 구독 중 + 이번 캘린더월에 아직 안 썼으면 true. */
export function nextmonthBenefitAvailable(sub: Subscription = loadSubscription()): boolean {
  return isSubscribed(sub) && sub.benefitUsedMonth !== benefitMonthKey()
}

/** 무료 혜택 사용 처리(이번 달로 마킹). */
export function consumeNextmonthBenefit(): void {
  saveSubscription({ ...loadSubscription(), benefitUsedMonth: benefitMonthKey() })
}
