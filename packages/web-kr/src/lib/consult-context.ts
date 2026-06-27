"use client"

// 전송 컨텍스트·요약 캐시 — 표시(전체 이력)와 독립적으로 AI에 보낼 분량을 관리

export type ApiMsg = { role: "user" | "assistant"; content: string }

export const CTX_MAX_MESSAGES = 12 // 최근 N메시지(요약과 함께 전송)

// 최근 N메시지 윈도우 + 첫 user 메시지 핀(핵심 맥락 보존)
export function windowMessages(msgs: ApiMsg[]): ApiMsg[] {
  if (msgs.length <= CTX_MAX_MESSAGES) return msgs
  const recent = msgs.slice(-CTX_MAX_MESSAGES)
  const firstUser = msgs.find(m => m.role === "user")
  return firstUser && !recent.includes(firstUser) ? [firstUser, ...recent] : recent
}

// 재접속 요약 캐시 — basedOnLen이 현재 이력 길이와 같을 때만 유효
// (새 메시지 보내면 길이가 달라져 자동 무효화 → 다음 재접속 때 재생성)
export type SummaryCache = { summary: string; greeting: string; basedOnLen: number }

const sKey = (iljuId: string) => `saju-consult-summary:${iljuId}`

export function getSummaryCache(iljuId: string): SummaryCache | null {
  if (typeof window === "undefined" || !iljuId) return null
  try {
    const raw = localStorage.getItem(sKey(iljuId))
    return raw ? (JSON.parse(raw) as SummaryCache) : null
  } catch {
    return null
  }
}

export function setSummaryCache(iljuId: string, c: SummaryCache): void {
  if (typeof window === "undefined" || !iljuId) return
  try {
    localStorage.setItem(sKey(iljuId), JSON.stringify(c))
  } catch {}
}
