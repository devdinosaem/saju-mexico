"use client"
import { useEffect, useState } from "react"

/**
 * 명태(재화) 잔액·내역 — 로컬 mock 스토어.
 * mockAuth/inventory와 동일 패턴(localStorage + 이벤트). 추후 결제 백엔드(Supabase)로 교체.
 * 내역의 productId는 products.ts 카탈로그 id를 가리킨다(있으면).
 */

export type MyongtaeTxn = {
  id: string
  ts: number          // epoch ms
  delta: number       // +적립 / −사용 (명태)
  label: string       // "출석 보상" 등 고객 노출 사유
  productId?: string  // 연관 상품 (sticker.* / report.* …)
}

export type MyongtaeState = {
  balance: number
  history: MyongtaeTxn[]
}

const KEY = "saju-myongtae-v1"
export const MYONGTAE_EVENT = "saju-myongtae-change"

// 데모 시드 (백엔드 연동 전까지) — 절대시각 기준
const D = 86_400_000
const now = Date.now()
const SEED: MyongtaeState = {
  balance: 12.4,
  history: [
    { id: "m1", ts: now - 0 * D, delta: +0.1, label: "출석 보상" },
    { id: "m2", ts: now - 2 * D, delta: -1, label: "상세 리포트 열람", productId: "report.detail" },
    { id: "m3", ts: now - 5 * D, delta: +5, label: "명태 충전" },
    { id: "m4", ts: now - 7 * D, delta: -0.3, label: "소품 구매 · 수정구", productId: "sticker.crystal_ball" },
  ],
}

export function loadMyongtae(): MyongtaeState {
  if (typeof window === "undefined") return SEED
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return SEED
}

export function saveMyongtae(s: MyongtaeState): void {
  try { localStorage.setItem(KEY, JSON.stringify(s)) } catch {}
  if (typeof window !== "undefined") window.dispatchEvent(new Event(MYONGTAE_EVENT))
}

/** 잔액 변동 1건 기록(+적립/−사용). 잔액 부족 시 false. */
export function applyTxn(delta: number, label: string, productId?: string): boolean {
  const s = loadMyongtae()
  if (s.balance + delta < 0) return false
  const txn: MyongtaeTxn = { id: `m${now}-${Math.random().toString(36).slice(2, 6)}`, ts: Date.now(), delta, label, productId }
  saveMyongtae({ balance: Math.round((s.balance + delta) * 10) / 10, history: [txn, ...s.history] })
  return true
}

/** React 구독 훅. */
export function useMyongtae(): MyongtaeState {
  const [state, setState] = useState<MyongtaeState>(SEED)
  useEffect(() => {
    setState(loadMyongtae())
    const h = () => setState(loadMyongtae())
    window.addEventListener(MYONGTAE_EVENT, h)
    return () => window.removeEventListener(MYONGTAE_EVENT, h)
  }, [])
  return state
}
