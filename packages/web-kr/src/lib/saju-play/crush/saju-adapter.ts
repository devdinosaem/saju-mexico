// 썸/짝사랑 — 실제 사주(manseryeok + saju-engine)로 compat-engine 입력을 만든다.
// consult와 동일 스택. 클라이언트에서 동작. 실패 시 null → 호출측이 오행 fallback.
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from "manseryeok"
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

export type RealCompat = { score: number; compatBlock: string; themKey: string; signals: CompatSignals; myYongKr: string }

/** 두 생일 → 깊은 궁합(점수·신호·프롬프트 블록·상대 일주키·내 용신). 실패 시 null. */
export function buildRealCompat(myBirth: Birth, myGender: Gender, crushBirth: Birth, crushGender: Gender): RealCompat | null {
  try {
    const me = calculateSaju({ year: myBirth.year, month: myBirth.month, day: myBirth.day, hour: myBirth.hour, minute: myBirth.minute })
    const cr = calculateSaju({ year: crushBirth.year, month: crushBirth.month, day: crushBirth.day, hour: crushBirth.hour, minute: crushBirth.minute })
    const mePerson = personOf(me)
    const { score, signals } = computeCompat(mePerson, personOf(cr), timingOf(me, myGender, myBirth))
    const fp = cr.fourPillars
    const themKey = `${STEM_KOREAN[fp.day.stem]}${BRANCH_KOREAN[fp.day.branch]}-${crushGender === "M" ? "m" : "f"}`
    return { score, compatBlock: compatPromptBlock(score, signals), themKey, signals, myYongKr: EL_KO[mePerson.yongShin] ?? "토" }
  } catch {
    return null
  }
}
