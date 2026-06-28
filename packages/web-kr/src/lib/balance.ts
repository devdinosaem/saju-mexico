"use client"
import { useEffect, useState } from "react"
import { PRICES } from "./prices"

// 명태 잔액 — charge 페이지/BalanceSection과 동일한 localStorage 키·이벤트 공유
export const BALANCE_MOCK_KEY = "saju-balance-mock"
const KEY = BALANCE_MOCK_KEY
const EVENT = "saju-balance-change"
const HISTORY_KEY = "saju-balance-history"

export const CONSULT_COST = PRICES.aiConsultPerTurn // 상담 1턴 비용(0.1명태)

// 테스트 시드 — NEXT_PUBLIC_SAMPLE_FRIENDS=1(테스트 모드)에서만 최초 1회 100명태 지급.
// 운영 정책(신규=0)은 유지하고, 테스트 환경만 예외로 시드한다.
const SEED_ENABLED = process.env.NEXT_PUBLIC_SAMPLE_FRIENDS === "1"
const SEED_AMOUNT = 100
const SEEDED_KEY = "saju-balance-seeded"

// 0.1 단위 누적 부동소수 오차 방지
const norm = (v: number) => Math.round(v * 1000) / 1000

// ── 거래내역 ──────────────────────────────────────────────
export type Txn = { ts: number; label: string; delta: number }

function readHistory(): Txn[] {
  if (typeof window === "undefined") return []
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]") as Txn[] } catch { return [] }
}

/** 거래 한 건 기록(최신 먼저, 최근 50건 보존). */
export function recordTxn(label: string, delta: number): void {
  if (typeof window === "undefined") return
  const list = readHistory()
  list.unshift({ ts: Date.now(), label, delta: norm(delta) })
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 50))) } catch {}
  window.dispatchEvent(new Event(EVENT))
}

// ── 잔액 ──────────────────────────────────────────────────
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

/** 테스트 모드 최초 진입 시 100명태 시드(+내역 1건). 잔액 키가 이미 있으면 건드리지 않음. */
function maybeSeed(): void {
  if (!SEED_ENABLED || typeof window === "undefined") return
  if (localStorage.getItem(SEEDED_KEY)) return
  localStorage.setItem(SEEDED_KEY, "1")
  if (localStorage.getItem(KEY) === null) {
    localStorage.setItem(KEY, String(SEED_AMOUNT))
    recordTxn("테스트 지급", SEED_AMOUNT) // dispatch 포함 → 구독 훅 갱신
  }
}

// 잔액이 충분하면 차감하고 true, 부족하면 그대로 false. label 주면 내역 기록.
export function spend(amount: number, label?: string): boolean {
  const bal = getBalance()
  if (bal + 1e-9 < amount) return false
  setBalance(bal - amount)
  if (label) recordTxn(label, -amount)
  return true
}

export function refund(amount: number, label = "환불"): void {
  setBalance(getBalance() + amount)
  recordTxn(label, amount)
}

/** 충전(원화→명태) 성공 시 호출 — 잔액 증가 + 내역 기록. PG 연동부에서 사용. */
export function charge(amount: number, label = "명태 충전"): void {
  setBalance(getBalance() + amount)
  recordTxn(label, amount)
}

// 잔액 실시간 구독 훅 (헤더 표시·입력 게이팅용) — 마운트 시 테스트 시드 시도
export function useBalance(): number {
  const [bal, setBal] = useState(0)
  useEffect(() => {
    maybeSeed()
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

// 거래내역 실시간 구독 훅
export function useHistory(): Txn[] {
  const [list, setList] = useState<Txn[]>([])
  useEffect(() => {
    const update = () => setList(readHistory())
    update()
    window.addEventListener(EVENT, update)
    window.addEventListener("storage", update)
    return () => {
      window.removeEventListener(EVENT, update)
      window.removeEventListener("storage", update)
    }
  }, [])
  return list
}
