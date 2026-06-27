"use client"

// 상담 대화 영속 — 일주(가입자 본인·고정) 기준 단일 스레드. 캐릭터 교체와 무관하게 유지.
export type StoredMsg = { role: "user" | "char" | "system"; text: string }

const PREFIX = "saju-consult:"
const keyFor = (iljuId: string) => PREFIX + iljuId

export function loadHistory(iljuId: string): StoredMsg[] | null {
  if (typeof window === "undefined" || !iljuId) return null
  try {
    const raw = localStorage.getItem(keyFor(iljuId))
    if (!raw) return null
    const data = JSON.parse(raw)
    const msgs = data?.msgs
    return Array.isArray(msgs) && msgs.length ? msgs : null
  } catch {
    return null
  }
}

const MAX_STORED = 400 // 저장 상한(≈200턴). 초과 시 오래된 것부터 드롭(첫 user 메시지는 보존)

// 매우 긴 대화의 localStorage 용량 폭증 방지. 표시·요약은 별개라 맥락은 요약이 보존.
function capStored(msgs: StoredMsg[]): StoredMsg[] {
  if (msgs.length <= MAX_STORED) return msgs
  const tail = msgs.slice(-MAX_STORED)
  const firstUser = msgs.find(m => m.role === "user")
  return firstUser && !tail.includes(firstUser) ? [firstUser, ...tail] : tail
}

export function saveHistory(iljuId: string, msgs: StoredMsg[]): void {
  if (typeof window === "undefined" || !iljuId || !msgs.length) return
  try {
    localStorage.setItem(keyFor(iljuId), JSON.stringify({ v: 1, updatedAt: Date.now(), msgs: capStored(msgs) }))
  } catch {
    // 용량 초과 등 — 조용히 무시(다음 저장 때 재시도)
  }
}

export function clearHistory(iljuId: string): void {
  if (typeof window === "undefined" || !iljuId) return
  try {
    localStorage.removeItem(keyFor(iljuId))
  } catch {}
}
