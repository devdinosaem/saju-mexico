// ════════════════════════════════════════════════════════════════
// "다음달 운 미리보기" — 원국 + 다음달 월운(월주) + 일진(매일 간지) 추출.
// 월운 십신/오행 호악 · 월지 신살 · 월지↔원국 충합 · 일자별 길일/주의일 · 영역 게이지.
// consult와 동일 스택. 클라이언트 동작. 실패 시 null → 호출측 폴백.
// ════════════════════════════════════════════════════════════════
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN, STEM_ELEMENT, dayPillar } from "manseryeok"
import {
  analyzeTenGods, analyzeYongShin, calculateMonthlyFortunes,
  getTwelveSpiritStar, SPIRIT_STAR_KOREAN, TEN_GOD_KOREAN, STRENGTH_KOREAN,
} from "saju-engine"
import type { Elem } from "../engine"
import { tgGroup } from "../self/self-adapter"
import type { TGGroup } from "../self/flavor"
import { SINSAL } from "../sinsal/flavor"
import type { AreaKey } from "./flavor"

export type Gender = "M" | "F"
export type NextMonthBirth = { year: number; month: number; day: number; hour: number; minute: number }

const EL_KO: Record<string, Elem> = { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" }
const clamp = (n: number, lo = 20, hi = 95) => Math.max(lo, Math.min(hi, Math.round(n)))

// 지지 육충/육합 (한자 기준)
const CHUNG: Record<string, string> = { 子: "午", 午: "子", 丑: "未", 未: "丑", 寅: "申", 申: "寅", 卯: "酉", 酉: "卯", 辰: "戌", 戌: "辰", 巳: "亥", 亥: "巳" }
const HAP: Record<string, string> = { 子: "丑", 丑: "子", 寅: "亥", 亥: "寅", 卯: "戌", 戌: "卯", 辰: "酉", 酉: "辰", 巳: "申", 申: "巳", 午: "未", 未: "午" }
const POS_KR: Record<string, string> = { year: "년주(뿌리)", month: "월주(사회)", day: "일주(나)", hour: "시주(말년)" }

export type DayPoint = { day: number; favor: number; good: boolean; warn: boolean; tag?: string }
export type MonthEvent = { type: "충" | "합"; withLabel: string }
export type NextMonthData = {
  iljuKey: string
  dayKr: string
  dayElem: Elem
  strongLevel: string
  isStrong: boolean
  yong: Elem; gi: Elem
  ym: { year: number; month: number }
  monthLabel: string                       // "2026년 7월"
  monthStemKr: string; monthBranchKr: string
  monthElem: Elem
  monthTenGod: string                      // 한글 (월간 십신)
  monthGroup: TGGroup
  monthSinsal: string                      // 월지 12신살 (한글, SINSAL 연동)
  favorMonth: number                       // 다음달 종합 점수(날씨용)
  thisFavor: number                        // 이번달 종합 점수(비교용)
  keywords: string[]                       // 키워드 3개
  events: MonthEvent[]
  chungCount: number; hapCount: number
  areas: Record<AreaKey, number>           // 영역별 게이지
  days: DayPoint[]                          // 1..말일
  goodDays: number[]; warnDays: number[]
  monthBlock: string                       // AI 프롬프트 데이터 블록
}

// 특정 달(solarYear, monthNum)의 종합 점수 — 오행 호악·생산성·충합
function favorOf(
  solarYear: number, monthNum: number,
  dm: Parameters<typeof calculateMonthlyFortunes>[1],
  yong: Elem, gi: Elem, isStrong: boolean, natalBranches: string[],
): number {
  const mf = calculateMonthlyFortunes(solarYear, dm).find(m => m.month === monthNum)
  if (!mf) return 50
  const elem = EL_KO[STEM_ELEMENT[mf.ganZhi.stem]] ?? "토"
  const grp = tgGroup(TEN_GOD_KOREAN[mf.stemTenGod])
  const prod = isStrong ? ["식상", "재성", "관성"].includes(grp) : ["인성", "비겁"].includes(grp)
  let hap = 0, chung = 0
  for (const br of natalBranches) { if (CHUNG[mf.ganZhi.branch] === br) chung++; if (HAP[mf.ganZhi.branch] === br) hap++ }
  return clamp(52 + (elem === yong ? 18 : elem === gi ? -14 : 0) + (prod ? 10 : -2) + hap * 4 - chung * 6)
}

export function buildNextMonth(b: NextMonthBirth, gender: Gender): NextMonthData | null {
  try {
    const saju = calculateSaju({ year: b.year, month: b.month, day: b.day, hour: b.hour, minute: b.minute })
    const { fourPillars: fp, fiveElements, dayMaster } = saju
    const dm = dayMaster.stem

    // 용신/신강
    const tenGods = analyzeTenGods(fp, dm)
    const yongR = analyzeYongShin(dm, fp, fiveElements, tenGods.count)
    const yong = EL_KO[yongR.yongShin] ?? "토", gi = EL_KO[yongR.giShin] ?? "목"
    const strongLevel = STRENGTH_KOREAN[yongR.strength.level] ?? "중화"
    const isStrong = strongLevel.includes("강")

    // 다음달 (양력 기준)
    const now = new Date()
    let ny = now.getFullYear(), nm = now.getMonth() + 2 // +1 다음달, getMonth 0-base → +2
    if (nm > 12) { nm = 1; ny += 1 }
    const monthLabel = `${ny}년 ${nm}월`

    // 월운 — 절기상 솔라이어(1월은 전년 솔라이어에 속함)
    const solarYear = nm === 1 ? ny - 1 : ny
    const mf = calculateMonthlyFortunes(solarYear, dm).find(m => m.month === nm)
    if (!mf) return null
    const monthStem = mf.ganZhi.stem, monthBranch = mf.ganZhi.branch
    const monthElem = EL_KO[STEM_ELEMENT[monthStem]] ?? "토"
    const monthTenGod = TEN_GOD_KOREAN[mf.stemTenGod]
    const monthGroup = tgGroup(monthTenGod)
    const monthSinsal = SPIRIT_STAR_KOREAN[getTwelveSpiritStar(fp.year.branch, monthBranch)]
    const mStat = SINSAL[monthSinsal]?.stat

    // 월지 ↔ 원국 충/합
    const natal = ([["year", fp.year.branch], ["month", fp.month.branch], ["day", fp.day.branch], ["hour", fp.hour?.branch]] as const)
      .filter(([, br]) => !!br) as [string, string][]
    const events: MonthEvent[] = []
    for (const [pos, br] of natal) {
      if (CHUNG[monthBranch] === br) events.push({ type: "충", withLabel: POS_KR[pos] })
      if (HAP[monthBranch] === br) events.push({ type: "합", withLabel: POS_KR[pos] })
    }
    const chungCount = events.filter(e => e.type === "충").length
    const hapCount = events.filter(e => e.type === "합").length

    // 종합 점수 → 날씨
    const productive = isStrong ? ["식상", "재성", "관성"].includes(monthGroup) : ["인성", "비겁"].includes(monthGroup)
    const favorMonth = clamp(52 + (monthElem === yong ? 18 : monthElem === gi ? -14 : 0) + (productive ? 10 : -2) + hapCount * 4 - chungCount * 6)
    // 이번달 점수 (비교용)
    const cy = now.getFullYear(), cm = now.getMonth() + 1
    const natalBranches = natal.map(([, br]) => br)
    const thisFavor = favorOf(cm === 1 ? cy - 1 : cy, cm, dm, yong, gi, isStrong, natalBranches)

    // 영역별 게이지
    const areas: Record<AreaKey, number> = {
      love: clamp(50 + (mStat === "매력" ? 20 : 0) + (["재성", "관성"].includes(monthGroup) ? 12 : 0) + hapCount * 5, 22, 95),
      work: clamp(50 + (["관성", "식상"].includes(monthGroup) ? 14 : 0) + (mStat === "추진" ? 10 : 0) + (mStat === "재능" ? 8 : 0), 22, 95),
      money: clamp(50 + (monthGroup === "재성" ? 22 : 0) + (monthGroup === "식상" ? 8 : 0) + (mStat === "복" ? 8 : 0), 22, 95),
      health: clamp(60 - chungCount * 9 + (monthGroup === "인성" ? 8 : 0) + (monthElem === yong ? 6 : 0), 22, 95),
      rel: clamp(50 + hapCount * 9 - chungCount * 6 + (monthGroup === "비겁" ? 6 : 0) + (mStat === "매력" ? 8 : 0), 22, 95),
    }

    // 일진 — 매일 간지 스코어링
    const dayBranchNatal = fp.day.branch
    const daysInMonth = new Date(ny, nm, 0).getDate()
    const days: DayPoint[] = []
    for (let d = 1; d <= daysInMonth; d++) {
      const gz = dayPillar(ny, nm, d)
      const dElem = EL_KO[STEM_ELEMENT[gz.stem]] ?? "토"
      const isHap = HAP[dayBranchNatal] === gz.branch
      const isChung = CHUNG[dayBranchNatal] === gz.branch
      const favor = clamp(
        50 + (dElem === yong ? 14 : dElem === gi ? -12 : 0) + (isHap ? 14 : 0) + (isChung ? -16 : 0) + (gz.branch === monthBranch ? 4 : 0),
        20, 92,
      )
      const good = favor >= 70, warn = isChung || favor <= 36
      const tag = isChung ? "변동" : dElem === yong ? "기회" : isHap ? "인연" : undefined
      days.push({ day: d, favor, good, warn, tag })
    }
    const goodDays = [...days].filter(d => d.good).sort((a, b) => b.favor - a.favor).slice(0, 5).map(d => d.day).sort((a, b) => a - b)
    const warnDays = [...days].filter(d => d.warn).sort((a, b) => a.favor - b.favor).slice(0, 3).map(d => d.day).sort((a, b) => a - b)

    // 키워드 3개
    const kwGroup: Record<TGGroup, string> = { 재성: "재물", 관성: "성취", 식상: "표현", 비겁: "도전", 인성: "충전" }
    const kwStat: Record<string, string> = { 매력: "인연", 이동: "이동", 재능: "재능", 추진: "추진", 복: "행운" }
    const keywords = [...new Set([
      kwGroup[monthGroup],
      mStat ? kwStat[mStat] : "",
      hapCount > chungCount ? "귀인" : chungCount > 0 ? "변화" : "안정",
    ].filter(Boolean))].slice(0, 3)

    const topArea = (Object.keys(areas) as AreaKey[]).reduce((a, b2) => (areas[b2] > areas[a] ? b2 : a))
    const monthBlock = [
      `[다음달 운 데이터 — 현상으로 풀고 단정·공포 금지. 예보 톤(흐름·확률)]`,
      `대상: ${STEM_KOREAN[dm]}(${EL_KO[dayMaster.element] ?? "토"}) 일간, ${strongLevel}`,
      `다음달: ${monthLabel} / 월운 ${STEM_KOREAN[monthStem]}${BRANCH_KOREAN[monthBranch]}(${monthElem})·${monthTenGod}결`,
      `오행 호악: 나를 살리는 ${yong} / 조심할 ${gi} → 다음달은 ${monthElem === yong ? "기운이 채워지는 호재" : monthElem === gi ? "살짝 눌리는 구간" : "무난한 흐름"}`,
      `이 달 켜지는 기운: ${monthSinsal}${mStat ? `(${mStat}계)` : ""}`,
      events.length ? `이벤트: ${events.map(e => `${e.withLabel} ${e.type}`).join(", ")}` : `이벤트: 큰 충·합 없음(잔잔)`,
      `좋은 날: ${goodDays.join(", ") || "고른 편"} / 주의 날: ${warnDays.join(", ") || "특별히 없음"}`,
      `영역 강세: ${topArea}`,
    ].join("\n")

    const iljuKey = `${STEM_KOREAN[fp.day.stem]}${BRANCH_KOREAN[fp.day.branch]}-${gender === "M" ? "m" : "f"}`
    return {
      iljuKey, dayKr: STEM_KOREAN[fp.day.stem], dayElem: EL_KO[dayMaster.element] ?? "토",
      strongLevel, isStrong, yong, gi,
      ym: { year: ny, month: nm }, monthLabel,
      monthStemKr: STEM_KOREAN[monthStem], monthBranchKr: BRANCH_KOREAN[monthBranch],
      monthElem, monthTenGod, monthGroup, monthSinsal,
      favorMonth, thisFavor, keywords, events, chungCount, hapCount, areas,
      days, goodDays, warnDays, monthBlock,
    }
  } catch {
    return null
  }
}
