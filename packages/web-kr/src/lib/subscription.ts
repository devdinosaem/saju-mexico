"use client"
import { useEffect, useState } from "react"

// 명태 구독 상태 — SSOT. 정책: docs/SUBSCRIPTION-BILLING-PLAN.md.
// 테스트모드에선 localStorage에 보관(빌링키 포함). 라이브에선 auth+서버 ledger로 교체(P5).
// inventory.isSubscribed(단순 bool)와 달리 "만료일(currentPeriodEnd)" 개념을 가진다.

export const SUBSCRIPTION_KEY = "saju-subscription-v1"
const EVENT = "saju-subscription-change"

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

const NONE: Subscription = { status: "none", customerKey: "", startedAt: 0, currentPeriodEnd: 0 }

export function loadSubscription(): Subscription {
  if (typeof window === "undefined") return NONE
  try {
    const raw = localStorage.getItem(SUBSCRIPTION_KEY)
    if (raw) return { ...NONE, ...JSON.parse(raw) }
  } catch {}
  return NONE
}

export function saveSubscription(sub: Subscription): void {
  if (typeof window === "undefined") return
  try { localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(sub)) } catch {}
  window.dispatchEvent(new Event(EVENT))
}

/**
 * 구독 활성 여부(파생). active든 canceled든 "기간 만료 전"이면 혜택 유지(기간 만료형 정책).
 * inventory.isSubscribed / canAccess(구독 스킨)는 P4에서 이 값으로 연결.
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

/** 구독 상태 실시간 구독 훅. */
export function useSubscription(): Subscription {
  const [sub, setSub] = useState<Subscription>(NONE)
  useEffect(() => {
    const update = () => setSub(loadSubscription())
    update()
    window.addEventListener(EVENT, update)
    window.addEventListener("storage", update)
    return () => {
      window.removeEventListener(EVENT, update)
      window.removeEventListener("storage", update)
    }
  }, [])
  return sub
}
