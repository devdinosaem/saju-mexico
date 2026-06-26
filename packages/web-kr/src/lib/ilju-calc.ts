import { ILJU_TYPES, type IljuType } from "./ilju-types"

// SVG가 준비된 일주 ID 풀 (mock 계산 시 이 범위 내에서만 반환)
const SVG_POOL_M = ["갑자-m", "갑오-m", "병오-m", "병인-m", "경진-m", "무인-m", "임신-m"]
const SVG_POOL_F = ["갑자-f", "을미-f", "병자-f", "병인-f", "계묘-f"]

export function calcIlju(year: string, month: string, day: string, gender: "M" | "F"): IljuType {
  const y = parseInt(year) || 0
  const m = parseInt(month) || 0
  const d = parseInt(day) || 0
  const hash = y * 13 + m * 31 + d * 7
  const pool = gender === "M" ? SVG_POOL_M : SVG_POOL_F
  const id = pool[hash % pool.length]
  return ILJU_TYPES.find(t => t.id === id) ?? ILJU_TYPES[0]
}

// 카드 어택행 — strengths를 포켓몬 어택처럼 데미지/코스트로 표현 (rarity 무관)
export const attackPower = (i: number) => Math.max(30, 90 - i * 30) // 90/60/30...
export const attackCost = (i: number) => (i === 0 ? 2 : 1)         // 첫 스킬 코스트 2

export const ELEMENT_THEME: Record<string, { bg: string; accent: string; text: string }> = {
  "목(木)": { bg: "#D1FAE5", accent: "#4ADE80", text: "#166534" },
  "화(火)": { bg: "#FEE2E2", accent: "#F87171", text: "#991B1B" },
  "토(土)": { bg: "#FEF3C7", accent: "#FBBF24", text: "#92400E" },
  "금(金)": { bg: "#F1F5F9", accent: "#94A3B8", text: "#1E293B" },
  "수(水)": { bg: "#DBEAFE", accent: "#60A5FA", text: "#1E3A8A" },
}
