// 사주 4주 계산 및 오행 분포
// 절기: Jean Meeus "Astronomical Algorithms" 기반 천문 계산 (고정 테이블 없음)
// 일주: JDN 기반, 기준일 1900-01-01 = 甲午日 (60갑자 cycle 30)
// 검증: 실제 만세력 앱과 대조 후 REF_CYCLE 값 조정 가능

const STEM_ELEMENT = [
  "목(木)", "목(木)",
  "화(火)", "화(火)",
  "토(土)", "토(土)",
  "금(金)", "금(金)",
  "수(水)", "수(水)",
]
const BRANCH_ELEMENT = [
  "수(水)", "토(土)", "목(木)", "목(木)", "토(土)", "화(火)",
  "화(火)", "토(土)", "금(金)", "금(金)", "토(土)", "수(水)",
]
const STEM_KR   = ["갑","을","병","정","무","기","경","신","임","계"]
const BRANCH_KR = ["자","축","인","묘","진","사","오","미","신","유","술","해"]

// 지장간(支藏干): [천간인덱스, 기간(일)] 쌍의 배열, 합산=30
// 子丑寅卯辰巳午未申酉戌亥 순
const BRANCH_HIDDEN_STEMS: [number, number][][] = [
  [[8,10],[9,20]],          // 子: 壬10 癸20
  [[5,18],[9,9],[7,3]],     // 丑: 己18 癸9 辛3
  [[0,16],[2,7],[4,7]],     // 寅: 甲16 丙7 戊7
  [[1,20],[0,10]],          // 卯: 乙20 甲10
  [[4,18],[1,9],[9,3]],     // 辰: 戊18 乙9 癸3
  [[2,16],[6,7],[4,7]],     // 巳: 丙16 庚7 戊7
  [[3,10],[5,10],[2,10]],   // 午: 丁10 己10 丙10
  [[5,18],[3,9],[1,3]],     // 未: 己18 丁9 乙3
  [[6,16],[8,7],[4,7]],     // 申: 庚16 壬7 戊7
  [[7,20],[6,10]],          // 酉: 辛20 庚10
  [[4,18],[7,9],[3,3]],     // 戌: 戊18 辛9 丁3
  [[8,16],[0,7],[4,7]],     // 亥: 壬16 甲7 戊7
]

export interface Pillar {
  stemIdx: number
  branchIdx: number
  label: string
  stemElement: string
  branchElement: string
}
export interface SajuPillars {
  year: Pillar
  month: Pillar
  day: Pillar
  hour: Pillar | null
  hasTime: boolean
  warnings: string[]
}

// 야자시 모드: "standard"=표준(자정 기준), "yajasi"=야자시(23시 기준 전날 일주)
export interface CalcOptions {
  hourMode?: "standard" | "yajasi"
}

// ── 천문: 태양 겉보기 황경 (VSOP87 저정밀 근사) ──
const R = Math.PI / 180

function sunLongitude(jde: number): number {
  const T  = (jde - 2451545.0) / 36525
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T
  const M  = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * R
  const C  =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M)
  const theta = L0 + C
  const omega = (125.04 - 1934.136 * T) * R
  return ((theta - 0.00569 - 0.00478 * Math.sin(omega)) % 360 + 360) % 360
}

// ── JDE → 그레고리력 날짜 ──
function jdeToDate(jde: number): { year: number; month: number; day: number } {
  const z = Math.floor(jde + 0.5)
  const A = z < 2299161 ? z : (() => {
    const a = Math.floor((z - 1867216.25) / 36524.25)
    return z + 1 + a - Math.floor(a / 4)
  })()
  const B = A + 1524
  const C = Math.floor((B - 122.1) / 365.25)
  const D = Math.floor(365.25 * C)
  const E = Math.floor((B - D) / 30.6001)
  const month = E < 14 ? E - 1 : E - 13
  return {
    day: B - D - Math.floor(30.6001 * E),
    month,
    year: month > 2 ? C - 4716 : C - 4715,
  }
}

// ── JDE(UTC) → KST 날짜+시각 ──
interface DateTime { year: number; month: number; day: number; hour: number; minute: number }

function jdeToDateTimeKST(jde_utc: number): DateTime {
  const jde_kst = jde_utc + 9 / 24
  const { year, month, day } = jdeToDate(jde_kst)
  const frac = (jde_kst + 0.5) - Math.floor(jde_kst + 0.5)
  const totalMin = Math.round(frac * 1440)
  return { year, month, day, hour: Math.floor(totalMin / 60) % 24, minute: totalMin % 60 }
}

// 절기 정보: 날짜·시각 (KST)
interface TermDateTime { day: number; hour: number; minute: number }

/**
 * 황경 λ(°)의 절기가 calendar year에 발생하는 KST { day, hour, minute } 반환.
 * λ: 소한=285, 입춘=315, 경칩=345, 청명=15, …, 입동=225, 대설=255
 */
function solarTermDateTime(year: number, lambda: number): TermDateTime {
  const T = (year - 2000) / 1000
  const vernalJDE =
    2451623.80984 +
    365242.37404 * T +
    0.05169 * T * T -
    0.00411 * T * T * T

  let jde0 = vernalJDE + (lambda / 360) * 365.2422
  // 소한(285°)·입춘(315°)·경칩(345°): 같은 연도 춘분 이전 발생 → 1년 앞당김
  if (lambda > 270) jde0 -= 365.2422

  let lo = jde0 - 10
  let hi = jde0 + 10
  for (let i = 0; i < 60; i++) {
    const mid  = (lo + hi) / 2
    const lng  = sunLongitude(mid)
    const diff = ((lambda - lng + 540) % 360) - 180
    if (Math.abs(diff) < 0.0005) { lo = hi = mid; break }
    diff > 0 ? (lo = mid) : (hi = mid)
  }

  const { day, hour, minute } = jdeToDateTimeKST((lo + hi) / 2)
  return { day, hour, minute }
}

// 12절기 황경 · 해당 양력 월 · 절기 이후 月支 인덱스
// 순서: 소한, 입춘, 경칩, 청명, 입하, 망종, 소서, 입추, 백로, 한로, 입동, 대설
const TERM_LAMBDAS = [285, 315, 345,  15,  45,  75, 105, 135, 165, 195, 225, 255]
const TERM_MONTHS  = [  1,   2,   3,   4,   5,   6,   7,   8,   9,  10,  11,  12]
const TERM_BRANCH  = [  1,   2,   3,   4,   5,   6,   7,   8,   9,  10,  11,   0]

// 연도별 절기 캐시 (TermDateTime[] — day+hour+minute 포함)
const termCache = new Map<number, TermDateTime[]>()

function getTermData(year: number): TermDateTime[] {
  if (termCache.has(year)) return termCache.get(year)!
  const data = TERM_LAMBDAS.map(λ => solarTermDateTime(year, λ))
  termCache.set(year, data)
  return data
}

// ── 절기 시각 비교 ──
// 출생 시각(bH=null이면 미입력)과 절기 시각을 비교
// 반환: true=절기 이후, false=절기 이전, "ambiguous"=날짜는 같은데 시각 미입력
function isAfterTerm(
  bMonth: number, bDay: number, bH: number | null, bMin: number | null,
  tMonth: number, tDay: number, tH: number, tMin: number,
): boolean | "ambiguous" {
  const bmd = bMonth * 10000 + bDay
  const tmd = tMonth * 10000 + tDay
  if (bmd > tmd) return true
  if (bmd < tmd) return false
  // 날짜가 같은 경우
  if (bH === null) return "ambiguous"
  return (bH * 60 + (bMin ?? 0)) >= (tH * 60 + tMin)
}

// ── 사주 계산 ──

function makePillar(stemIdx: number, branchIdx: number): Pillar {
  return {
    stemIdx, branchIdx,
    label:         STEM_KR[stemIdx] + BRANCH_KR[branchIdx],
    stemElement:   STEM_ELEMENT[stemIdx],
    branchElement: BRANCH_ELEMENT[branchIdx],
  }
}

function jdn(y: number, m: number, d: number): number {
  const a  = Math.floor((14 - m) / 12)
  const yr = y + 4800 - a
  const mo = m + 12 * a - 3
  return d + Math.floor((153 * mo + 2) / 5) + 365 * yr
    + Math.floor(yr / 4) - Math.floor(yr / 100) + Math.floor(yr / 400) - 32045
}

// 연주: 입춘 시각 기준
function calcYearPillar(
  y: number, m: number, d: number,
  bH: number | null, bMin: number | null,
  warnings: string[],
): Pillar {
  const terms = getTermData(y)
  const lichun = terms[1]  // 입춘 = index 1 (315°)
  const after = isAfterTerm(m, d, bH, bMin, 2, lichun.day, lichun.hour, lichun.minute)
  let eff: number
  if (after === "ambiguous") {
    warnings.push(`입춘 당일(${y}년 2월 ${lichun.day}일) 출생: 시각 미입력으로 전년도 연주로 계산됩니다.`)
    eff = y - 1  // 보수적: 절기 이전으로 처리
  } else {
    eff = after ? y : y - 1
  }
  return makePillar(((eff - 4) % 10 + 10) % 10, ((eff - 4) % 12 + 12) % 12)
}

// 월주: 절기 시각 기준 月支 계산
function monthBranchFromSolar(
  year: number, month: number, day: number,
  bH: number | null, bMin: number | null,
  warnings: string[],
): number {
  const terms = getTermData(year)
  // 뒤에서부터 탐색: 가장 늦은 절기부터
  for (let i = TERM_MONTHS.length - 1; i >= 0; i--) {
    if (month > TERM_MONTHS[i]) return TERM_BRANCH[i]
    if (month < TERM_MONTHS[i]) continue
    // 같은 달
    const t = terms[i]
    const after = isAfterTerm(month, day, bH, bMin, TERM_MONTHS[i], t.day, t.hour, t.minute)
    if (after === "ambiguous") {
      warnings.push(`절기 당일(${year}년 ${TERM_MONTHS[i]}월 ${t.day}일) 출생: 시각 미입력으로 절기 이전 월주로 계산됩니다.`)
      // 보수적: 절기 이전 월지 사용 → continue로 이전 인덱스 탐색
      continue
    }
    if (after) return TERM_BRANCH[i]
  }
  return 0  // 소한 이전 → 子月
}

// 五虎遁年法: 甲己→寅=丙(2), 乙庚→戊(4), 丙辛→庚(6), 丁壬→壬(8), 戊癸→甲(0)
const MONTH_STEM_START = [2, 4, 6, 8, 0]

function calcMonthPillar(
  yearStemIdx: number, y: number, m: number, d: number,
  bH: number | null, bMin: number | null,
  warnings: string[],
): Pillar {
  const branchIdx   = monthBranchFromSolar(y, m, d, bH, bMin, warnings)
  const monthOffset = (branchIdx - 2 + 12) % 12  // 寅月 = 0번째
  const stemIdx     = (MONTH_STEM_START[yearStemIdx % 5] + monthOffset) % 10
  return makePillar(stemIdx, branchIdx)
}

// 일주: JDN 기준 (1900-01-01 = 甲午, cycle 30)
// ※ REF_CYCLE=30 미검증 — 실제 만세력과 대조 후 조정 필요
const REF_JDN   = jdn(1900, 1, 1)
const REF_CYCLE = 30

function calcDayPillar(
  y: number, m: number, d: number,
  bH: number | null,
  hourMode: "standard" | "yajasi",
): Pillar {
  let adjY = y, adjM = m, adjD = d
  // 야자시: 23:00~24:00 출생은 전날 일주 사용
  if (hourMode === "yajasi" && bH !== null && bH >= 23) {
    const prev = jdeToDate(jdn(y, m, d) - 1)  // 전날
    adjY = prev.year; adjM = prev.month; adjD = prev.day
  }
  const cycle = ((jdn(adjY, adjM, adjD) - REF_JDN + REF_CYCLE) % 60 + 60) % 60
  return makePillar(cycle % 10, cycle % 12)
}

// 시주: 五鼠遁日法 — 甲己→子=甲(0), 乙庚→丙(2), 丙辛→戊(4), 丁壬→庚(6), 戊癸→壬(8)
const HOUR_STEM_START = [0, 2, 4, 6, 8]

function calcHourPillar(dayStemIdx: number, hour24: number): Pillar {
  const branchIdx = Math.floor(((hour24 + 1) % 24) / 2)
  const stemIdx   = (HOUR_STEM_START[dayStemIdx % 5] + branchIdx) % 10
  return makePillar(stemIdx, branchIdx)
}

// ── 백분율 합 100 보장 (Largest Remainder Method) ──
const ELEMS = ["목(木)", "화(火)", "토(土)", "금(金)", "수(水)"] as const

function normalizeTo100(scores: Record<string, number>): Record<string, number> {
  const total = ELEMS.reduce((s, e) => s + (scores[e] ?? 0), 0)
  if (total === 0) return Object.fromEntries(ELEMS.map(e => [e, 20]))
  const items = ELEMS.map(e => {
    const exact = (scores[e] ?? 0) / total * 100
    return { e, exact, floor: Math.floor(exact), rem: exact % 1 }
  })
  let rem = 100 - items.reduce((s, x) => s + x.floor, 0)
  items.sort((a, b) => b.rem - a.rem)
  for (let i = 0; i < rem; i++) items[i].floor++
  return Object.fromEntries(items.map(x => [x.e, x.floor]))
}

// ── 공개 API ──

export function calcSajuPillars(
  year: string,
  month: string,
  day: string,
  hour?: string,
  minute?: string,
  ampm?: "AM" | "PM",
  options?: CalcOptions,
): SajuPillars {
  const y = parseInt(year)  || 1990
  const m = parseInt(month) || 1
  const d = parseInt(day)   || 1
  const warnings: string[] = []

  const hasTime = !!(hour && hour.trim())
  let bH: number | null = null
  let bMin: number | null = null

  if (hasTime) {
    bH = parseInt(hour!) || 0
    bMin = parseInt(minute || "0") || 0
    if (ampm === "PM" && bH !== 12) bH += 12
    if (ampm === "AM" && bH === 12) bH = 0
  }

  const hourMode = options?.hourMode ?? "standard"

  const yearP  = calcYearPillar(y, m, d, bH, bMin, warnings)
  const dayP   = calcDayPillar(y, m, d, bH, hourMode)
  const monthP = calcMonthPillar(yearP.stemIdx, y, m, d, bH, bMin, warnings)

  let hourP: Pillar | null = null
  if (hasTime && bH !== null) {
    hourP = calcHourPillar(dayP.stemIdx, bH)
  }

  return { year: yearP, month: monthP, day: dayP, hour: hourP, hasTime, warnings }
}

export function calcElementDistribution(pillars: SajuPillars): Record<string, number> {
  const raw: Record<string, number> = {
    "목(木)": 0, "화(火)": 0, "토(土)": 0, "금(金)": 0, "수(水)": 0,
  }
  const ps = [pillars.year, pillars.month, pillars.day, ...(pillars.hour ? [pillars.hour] : [])]
  for (const p of ps) {
    raw[p.stemElement] += 100  // 천간: 100점
    for (const [sIdx, w] of BRANCH_HIDDEN_STEMS[p.branchIdx]) {
      raw[STEM_ELEMENT[sIdx]] += Math.round(w / 30 * 100)  // 지장간: 비율 환산
    }
  }
  return normalizeTo100(raw)
}
