// 썸/짝사랑 — 실제 사주(manseryeok + saju-engine)로 compat-engine 입력을 만든다.
// consult와 동일 스택. 클라이언트에서 동작. 실패 시 null → 호출측이 오행 fallback.
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN, dayPillar, STEM_ELEMENT } from "manseryeok"
import {
  analyzeTenGods, analyzeYongShin, calculateMajorFortunes, calculateYearlyFortunes, TEN_GOD_KOREAN,
} from "saju-engine"
import { computeCompat, compatPromptBlock, type Person as CompatPerson, type Timing, type CompatSignals } from "./compat-engine"

export type Gender = "M" | "F"
export type Birth = { year: number; month: number; day: number; hour: number; minute: number }
const EL_KO: Record<string, string> = { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" }

/** 시각 문자열 → 24시. 미상이면 정오(12) 추정. */
export function to24h(hour?: string, ampm?: "AM" | "PM"): number {
  const h = parseInt(hour ?? "")
  if (!Number.isFinite(h)) return 12
  if (ampm === "AM") return h === 12 ? 0 : h
  return h === 12 ? 12 : h + 12
}

type Saju = ReturnType<typeof calculateSaju>

function personOf(saju: Saju): CompatPerson {
  const { fourPillars: fp, fiveElements, dayMaster } = saju
  const tenGods = analyzeTenGods(fp, dayMaster.stem)
  const yong = analyzeYongShin(dayMaster.stem, fp, fiveElements, tenGods.count)
  const branches = [fp.year.branch, fp.month.branch, fp.day.branch, fp.hour?.branch].filter(Boolean) as string[]
  return {
    dayStem: fp.day.stem,
    dayBranch: fp.day.branch,
    branches,
    yearBranch: fp.year.branch,
    fiveElements,
    yongShin: yong.yongShin,
  }
}

function timingOf(saju: Saju, gender: Gender, b: Birth): Timing {
  const { fourPillars: fp, dayMaster } = saju
  const g = gender === "M" ? "male" : "female"
  const cy = new Date().getFullYear()
  const age = cy - b.year + 1
  const major = calculateMajorFortunes(fp.month, fp.year.stem, g, b.year, b.month, b.day, dayMaster.stem, 8)
  const cur = major.fortunes.find((f, i) => {
    const n = major.fortunes[i + 1]
    return f.startAge <= age && (!n || n.startAge > age)
  })
  const yThis = calculateYearlyFortunes(b.year, dayMaster.stem, cy, cy).find(f => f.year === cy)
  const tg: string[] = []
  if (cur) tg.push(TEN_GOD_KOREAN[cur.stemTenGod], TEN_GOD_KOREAN[cur.branchTenGod])
  if (yThis) tg.push(TEN_GOD_KOREAN[yThis.stemTenGod], TEN_GOD_KOREAN[yThis.branchTenGod])
  return { tenGods: tg.filter(Boolean) }
}

// 영문 오행분포 → 한글 키
function toKrDist(fe: Record<string, number>): Record<string, number> {
  return { 목: fe.wood ?? 0, 화: fe.fire ?? 0, 토: fe.earth ?? 0, 금: fe.metal ?? 0, 수: fe.water ?? 0 }
}
const GEN_EN: Record<string, string> = { wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" }

// 이번 달 길일 — 일별 간지의 오행이 내 용신/일간을 돕는 날
export type GoodDays = { 연락?: number; 만남?: number; 고백?: number }
function computeGoodDays(saju: Saju): GoodDays {
  const { fourPillars: fp, fiveElements, dayMaster } = saju
  const tenGods = analyzeTenGods(fp, dayMaster.stem)
  const yong = analyzeYongShin(dayMaster.stem, fp, fiveElements, tenGods.count).yongShin
  const dm = dayMaster.element
  const now = new Date(), y = now.getFullYear(), mo = now.getMonth() + 1
  const dim = new Date(y, mo, 0).getDate(), today = now.getDate()
  const out: GoodDays = {}
  for (let d = Math.max(1, today); d <= dim; d++) {
    const de = STEM_ELEMENT[dayPillar(y, mo, d).stem]
    if (out.고백 === undefined && de === yong) out.고백 = d             // 용신 드는 날 = 최상
    if (out.만남 === undefined && GEN_EN[de] === dm) out.만남 = d        // 그날 기운이 나를 생
    if (out.연락 === undefined && de === dm) out.연락 = d               // 동기 — 편한 날
    if (out.고백 !== undefined && out.만남 !== undefined && out.연락 !== undefined) break
  }
  return out
}

export type RealCompat = {
  score: number; compatBlock: string; themKey: string; signals: CompatSignals; myYongKr: string
  myDist: Record<string, number>; themDist: Record<string, number>; goodDays: GoodDays
}

/** 두 생일 → 깊은 궁합(점수·신호·프롬프트 블록·상대 일주키·내 용신). 실패 시 null. */
export function buildRealCompat(myBirth: Birth, myGender: Gender, crushBirth: Birth, crushGender: Gender): RealCompat | null {
  try {
    const me = calculateSaju({ year: myBirth.year, month: myBirth.month, day: myBirth.day, hour: myBirth.hour, minute: myBirth.minute })
    const cr = calculateSaju({ year: crushBirth.year, month: crushBirth.month, day: crushBirth.day, hour: crushBirth.hour, minute: crushBirth.minute })
    const mePerson = personOf(me), crPerson = personOf(cr)
    const { score, signals } = computeCompat(mePerson, crPerson, timingOf(me, myGender, myBirth))
    const fp = cr.fourPillars
    const themKey = `${STEM_KOREAN[fp.day.stem]}${BRANCH_KOREAN[fp.day.branch]}-${crushGender === "M" ? "m" : "f"}`
    return {
      score, compatBlock: compatPromptBlock(score, signals), themKey, signals,
      myYongKr: EL_KO[mePerson.yongShin] ?? "토",
      myDist: toKrDist(mePerson.fiveElements), themDist: toKrDist(crPerson.fiveElements), goodDays: computeGoodDays(me),
    }
  } catch {
    return null
  }
}
