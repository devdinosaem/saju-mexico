"use client"
import { useEffect, useState } from "react"
import { PRICES } from "./prices"

// 명태 잔액 — charge 페이지/BalanceSection과 동일한 localStorage 키·이벤트 공유
const KEY = "saju-balance-mock"
const EVENT = "saju-balance-change"

export const CONSULT_COST = PRICES.aiConsultPerTurn // 상담 1턴 비용(0.1명태)

// 0.1 단위 누적 부동소수 오차 방지
const norm = (v: number) => Math.round(v * 1000) / 1000

// 신규 유저(키 없음) = 0명태 (정책: 시드·무료질문 없음 → 충전해야 상담 가능)
export function getBalance(): number {
  if (typeof window === "undefined") return 0
  const raw = localStorage.getItem(KEY)
  const v = raw === null ? 0 : parseFloat(raw)
  return Number.isFinite(v) ? v : 0
}

export function setBalance(v: number): void {
  if (typeof window === "undefined") return
  localStorage.setItem(KEY, String(norm(Math.max(0, v))))
  window.dispatchEvent(new Event(EVENT))
}

// 잔액이 충분하면 차감하고 true, 부족하면 그대로 false
export function spend(amount: number): boolean {
  const bal = getBalance()
  if (bal + 1e-9 < amount) return false
  setBalance(bal - amount)
  return true
}

export function refund(amount: number): void {
  setBalance(getBalance() + amount)
}

// 잔액 실시간 구독 훅 (헤더 표시·입력 게이팅용)
export function useBalance(): number {
  const [bal, setBal] = useState(0)
  useEffect(() => {
    const update = () => setBal(getBalance())
    update()
    window.addEventListener(EVENT, update)
    window.addEventListener("storage", update) // 다중 탭 동기화
    return () => {
      window.removeEventListener(EVENT, update)
      window.removeEventListener("storage", update)
    }
  }, [])
  return bal
}
