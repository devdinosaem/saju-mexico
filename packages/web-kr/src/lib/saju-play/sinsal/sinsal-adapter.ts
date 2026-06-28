// ════════════════════════════════════════════════════════════════
// "내 신살 도감" — 1인 신살 추출(manseryeok + saju-engine).
// 원국에서 12신살(자리별) + 특수신살(자리별) → 보유 도감 + 시그니처 + sinsalBlock(AI용).
// ⚠️ analyzeSpiritStars는 영문키 → SPIRIT_STAR_KOREAN으로 한글 변환 후 사용.
//    getSpecialStars는 한글 배열. buildSinsalBlock·자리계산은 sinsal-engine(라우트 에이전트 소유)을 호출만.
// 클라이언트 동작. 실패 시 null → 호출측 폴백.
// ════════════════════════════════════════════════════════════════
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from "manseryeok"
import { analyzeSpiritStars, getSpecialStars, SPIRIT_STAR_KOREAN } from "saju-engine"
import { buildSinsalBlock, type TwelveByPos, type SpecialByPos } from "./sinsal-engine"
import { SINSAL, SIG_PRIORITY, type SinsalStat } from "./flavor"

export type Gender = "M" | "F"
export type SinsalBirth = { year: number; month: number; day: number; hour: number; minute: number }
export type Pos = "year" | "month" | "day" | "hour"
const POS_ALL: Pos[] = ["year", "month", "day", "hour"]
export const POS_LABEL: Record<Pos, { era: string; area: string }> = {
  year: { era: "초년·뿌리", area: "조상·어린 나" },
  month: { era: "청년·사회", area: "부모·사회" },
  day: { era: "중년·자기", area: "나·배우자" },
  hour: { era: "말년·결실", area: "자식·노년" },
}

export type SinsalItem = {
  name: string         // 한글 신살명 (SINSAL 키)
  kind: "twelve" | "special"
  positions: Pos[]     // 떠오른 자리들
}
export type SinsalData = {
  iljuKey: string                       // 일주+성별 (캐릭터용, 예: 경진-m)
  dayKr: string                         // 일간 한글
  bareIlju: string                      // 일주 한글 (예: 경진)
  twelve: TwelveByPos                   // 자리별 12신살 (한글, 각 1개)
  special: SpecialByPos                 // 자리별 특수신살 (한글 배열)
  byPos: Record<Pos, { twelve: string; special: string[] }>
  owned: SinsalItem[]                   // 보유 전체(중복 제거, 시그니처 우선순위 정렬)
  ownedCount: number                    // 보유 신살 종류 수
  signature: string                     // 대표(시그니처) 신살명
  stats: Record<SinsalStat, number>     // 5능력치 합산(레이더용)
  sinsalBlock: string                   // AI 프롬프트 데이터 블록
}

const sigIdx = (name: string) => {
  const i = SIG_PRIORITY.indexOf(name)
  return i < 0 ? SIG_PRIORITY.length : i
}

export function buildSinsal(b: SinsalBirth, gender: Gender): SinsalData | null {
  try {
    const saju = calculateSaju({ year: b.year, month: b.month, day: b.day, hour: b.hour, minute: b.minute })
    const fp = saju.fourPillars
    const dm = saju.dayMaster.stem

    // 12신살 (영문키 → 한글)
    const ss = analyzeSpiritStars(fp)
    const K = SPIRIT_STAR_KOREAN
    const twelve: TwelveByPos = { year: K[ss.year], month: K[ss.month], day: K[ss.day], hour: K[ss.hour] }

    // 특수신살 (자리별 한글 배열)
    const allBranches = [fp.year.branch, fp.month.branch, fp.day.branch, fp.hour.branch]
    const sp = (stem: typeof dm, br: (typeof allBranches)[number]) =>
      getSpecialStars(dm, fp.month.branch, allBranches, stem, br)
    const special: SpecialByPos = {
      year: sp(fp.year.stem, fp.year.branch),
      month: sp(fp.month.stem, fp.month.branch),
      day: sp(fp.day.stem, fp.day.branch),
      hour: sp(fp.hour.stem, fp.hour.branch),
    }

    const byPos = {
      year: { twelve: twelve.year, special: special.year },
      month: { twelve: twelve.month, special: special.month },
      day: { twelve: twelve.day, special: special.day },
      hour: { twelve: twelve.hour, special: special.hour },
    } as Record<Pos, { twelve: string; special: string[] }>

    // 보유 신살 집계 (이름 → 자리들)
    const namePos = new Map<string, Pos[]>()
    const push = (name: string, pos: Pos) => {
      if (!SINSAL[name]) return // 카피 뱅크에 없는 신살은 스킵(안전)
      namePos.set(name, [...(namePos.get(name) ?? []), pos])
    }
    POS_ALL.forEach(p => push(twelve[p], p))
    POS_ALL.forEach(p => special[p].forEach(s => push(s, p)))

    const TWELVE_NAMES = new Set(Object.values(twelve))
    const owned: SinsalItem[] = [...namePos.entries()]
      .map(([name, positions]) => ({
        name,
        kind: TWELVE_NAMES.has(name) ? ("twelve" as const) : ("special" as const),
        positions,
      }))
      .sort((a, b2) => sigIdx(a.name) - sigIdx(b2.name))

    const signature = owned[0]?.name ?? twelve.day

    // 5능력치 합산
    const stats: Record<SinsalStat, number> = { 이동: 0, 매력: 0, 재능: 0, 추진: 0, 복: 0 }
    owned.forEach(o => { stats[SINSAL[o.name].stat] += o.positions.length })

    const sinsalBlock = buildSinsalBlock(twelve, special)
    const iljuKey = `${STEM_KOREAN[fp.day.stem]}${BRANCH_KOREAN[fp.day.branch]}-${gender === "M" ? "m" : "f"}`
    const bareIlju = `${STEM_KOREAN[fp.day.stem]}${BRANCH_KOREAN[fp.day.branch]}`

    return {
      iljuKey, dayKr: STEM_KOREAN[fp.day.stem], bareIlju,
      twelve, special, byPos, owned, ownedCount: owned.length, signature, stats, sinsalBlock,
    }
  } catch {
    return null
  }
}
