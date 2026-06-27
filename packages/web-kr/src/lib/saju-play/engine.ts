// ════════════════════════════════════════════════════════════════
// 사주 풀이 공용 엔진 — 오행 상생상극 기반.
// 모든 궁합/분석/풀이 기능(친구·커플·가족·직장·베프·썸…)이 공유한다.
// ⚠️ 점수·풀이는 "랜덤 금지, 오행 로직" 원칙. 지금은 mock, 추후 saju-engine 연동.
// ════════════════════════════════════════════════════════════════

export type Elem = "목" | "화" | "토" | "금" | "수"
export const ELEMS: Elem[] = ["목", "화", "토", "금", "수"]

/** 관계 종류 — 시리즈 확장의 축. 상황별/아키타입/톤이 이 값으로 갈린다. */
export type RelKind = "friend" | "couple" | "family" | "work" | "bestie" | "crush"

const STEM_TO_ELEM: Record<string, Elem> = {
  갑: "목", 을: "목", 병: "화", 정: "화", 무: "토", 기: "토", 경: "금", 신: "금", 임: "수", 계: "수",
}
export const elemOf = (iljuKey: string): Elem => STEM_TO_ELEM[iljuKey[0]] ?? "토"

export const SHENG: Record<Elem, Elem> = { 목: "화", 화: "토", 토: "금", 금: "수", 수: "목" } // 상생
export const KE: Record<Elem, Elem> = { 목: "토", 토: "수", 수: "화", 화: "금", 금: "목" }     // 상극

export type Rel = "same" | "sheng" | "ke"
export const relType = (a: Elem, b: Elem): Rel =>
  a === b ? "same" : SHENG[a] === b || SHENG[b] === a ? "sheng" : "ke"

/** 두 오행을 정렬해 결합한 키(조합별 데이터 조회용). 예: ("화","목") → "목화" */
export const pairKey = (a: Elem, b: Elem) => [a, b].sort().join("")

export const clamp = (n: number, lo = 30, hi = 98) => Math.max(lo, Math.min(hi, Math.round(n)))

// ── 분포 ─────────────────────────────────────────────────────────
/** mock 개인 사주 오행 분포(8자 가정, 일간 강조 + 결정적 분배). 추후 saju-engine으로 대체. */
export function mockDist(iljuKey: string): Record<Elem, number> {
  const d: Record<Elem, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 }
  d[elemOf(iljuKey)] = 3
  const seed = iljuKey.charCodeAt(0) + (iljuKey.charCodeAt(1) || 0) * 7 + (iljuKey.charCodeAt(3) || 0) * 3
  let i = seed % 5, rest = 5
  while (rest > 0) { d[ELEMS[i % 5]]++; i += (seed % 3) + 1; rest-- }
  return d
}
/** 여러 명의 일간 오행 카운트(1인 1원소). 그룹 "누가 무슨 기운" 표시용. */
export function elemCount(iljuKeys: string[]): Record<Elem, number> {
  const d: Record<Elem, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 }
  iljuKeys.forEach(k => { d[elemOf(k)]++ })
  return d
}
/** 여러 명의 사주 분포 합산(8자 기반). 커플 분할 막대 등. */
export function sumDist(iljuKeys: string[]): Record<Elem, number> {
  const d: Record<Elem, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 }
  iljuKeys.forEach(k => { const md = mockDist(k); ELEMS.forEach(e => { d[e] += md[e] }) })
  return d
}
export const dominantElem = (d: Record<Elem, number>): Elem => ELEMS.reduce((a, b) => (d[b] > d[a] ? b : a), "목")
export const weakestElem = (d: Record<Elem, number>): Elem => ELEMS.reduce((a, b) => (d[b] < d[a] ? b : a), "목")

// ── 점수 ─────────────────────────────────────────────────────────
/** 두 사람 오행 케미 점수. 상생 높음 / 상극 중간(설렘) / 동일 안정. 조합 미세 차등은 flavor에서. */
export function pairScore(a: Elem, b: Elem, opt?: { same?: number; sheng?: number; ke?: number }): number {
  const o = { same: 74, sheng: 90, ke: 60, ...opt }
  return relType(a, b) === "same" ? o.same : relType(a, b) === "sheng" ? o.sheng : o.ke
}
/** 그룹 종합 점수 = 모든 페어 평균. */
export function groupScore(iljuKeys: string[]): number {
  const es = iljuKeys.map(elemOf)
  if (es.length < 2) return 0
  let sum = 0, n = 0
  for (let i = 0; i < es.length; i++) for (let j = i + 1; j < es.length; j++) { sum += pairScore(es[i], es[j]); n++ }
  return Math.round(sum / n)
}
