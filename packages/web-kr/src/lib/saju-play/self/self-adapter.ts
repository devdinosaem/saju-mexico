// ════════════════════════════════════════════════════════════════
// "나 사용설명서" — 1인 사주 추출(manseryeok + saju-engine).
// 원국 전체에서 self 신호 + 대운 곡선(인생 그래프) + selfBlock(AI용) 산출.
// consult와 동일 스택. 클라이언트 동작. 실패 시 null → 호출측 폴백.
// ════════════════════════════════════════════════════════════════
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN, STEM_ELEMENT } from "manseryeok"
import {
  analyzeTenGods, analyzeYongShin, calculateMajorFortunes, calculateYearlyFortunes,
  TEN_GOD_KOREAN, STRENGTH_KOREAN,
} from "saju-engine"
import type { Elem } from "../engine"

export type Gender = "M" | "F"
export type SelfBirth = { year: number; month: number; day: number; hour: number; minute: number }
type TGGroup = "비겁" | "식상" | "재성" | "관성" | "인성"

const EL_KO: Record<string, Elem> = { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" }
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.round(n)))
export const tgGroup = (kr: string): TGGroup =>
  ["비견", "겁재"].includes(kr) ? "비겁" :
  ["식신", "상관"].includes(kr) ? "식상" :
  ["정재", "편재"].includes(kr) ? "재성" :
  ["정관", "편관"].includes(kr) ? "관성" : "인성"

export type LifePoint = { startAge: number; ageLabel: string; elem: Elem; tenGod: string; favor: number; current: boolean }
export type SelfData = {
  iljuKey: string                         // 일주 + 성별 (캐릭터용, 예: 경진-m)
  dayKr: string                           // 일간 한글
  dayElem: Elem
  yinYang: "양" | "음"
  dist: Record<Elem, number>              // 오행 분포(한글)
  strongLevel: string                     // 신강/중화/신약 (한글)
  isStrong: boolean
  yong: Elem; gi: Elem                    // 용신/기신(한글)
  tgGroups: Record<TGGroup, number>       // 십신 그룹별 개수
  topTalent: TGGroup[]                    // 두드러진 재능결(상위 2)
  dohwa: boolean
  curAge: number
  life: LifePoint[]                       // 대운 곡선(인생 그래프)
  peak: LifePoint | null                 // 황금기(가장 favor 높은 대운)
  seunTenGod: string                      // 올해 세운 십신(한글)
  samjae: boolean
  selfBlock: string                       // AI 프롬프트 데이터 블록
}

/** 도화 — 연지 기준 도화 지지가 사주 지지에 있는지 */
const DOHWA_OF: Record<string, string> = {
  申: "酉", 子: "酉", 辰: "酉", 亥: "子", 卯: "子", 未: "子",
  寅: "卯", 午: "卯", 戌: "卯", 巳: "午", 酉: "午", 丑: "午",
}
function hasDohwa(branches: string[], yearBranch: string): boolean {
  const d = DOHWA_OF[yearBranch]
  return !!d && branches.includes(d)
}

export function buildSelf(b: SelfBirth, gender: Gender): SelfData | null {
  try {
    const saju = calculateSaju({ year: b.year, month: b.month, day: b.day, hour: b.hour, minute: b.minute })
    const { fourPillars: fp, fiveElements, dayMaster } = saju
    const g = gender === "M" ? "male" : "female"
    const now = new Date(), cy = now.getFullYear()
    const curAge = cy - b.year + 1

    const tenGods = analyzeTenGods(fp, dayMaster.stem)
    const yongR = analyzeYongShin(dayMaster.stem, fp, fiveElements, tenGods.count)
    const yong = EL_KO[yongR.yongShin] ?? "토", gi = EL_KO[yongR.giShin] ?? "목"
    const strongLevel = STRENGTH_KOREAN[yongR.strength.level] ?? "중화"
    const isStrong = strongLevel.includes("강")

    const dist: Record<Elem, number> = {
      목: fiveElements.wood ?? 0, 화: fiveElements.fire ?? 0, 토: fiveElements.earth ?? 0,
      금: fiveElements.metal ?? 0, 수: fiveElements.water ?? 0,
    }

    // 십신 그룹 집계
    const tgGroups: Record<TGGroup, number> = { 비겁: 0, 식상: 0, 재성: 0, 관성: 0, 인성: 0 }
    tenGods.entries.forEach(e => { tgGroups[tgGroup(TEN_GOD_KOREAN[e.tenGod])]++ })
    const topTalent = (Object.keys(tgGroups) as TGGroup[]).sort((a, b2) => tgGroups[b2] - tgGroups[a]).slice(0, 2)

    const branches = [fp.year.branch, fp.month.branch, fp.day.branch, fp.hour?.branch].filter(Boolean) as string[]
    const dohwa = hasDohwa(branches, fp.year.branch)

    // 대운 곡선 — 각 대운의 길흉을 점수화
    const major = calculateMajorFortunes(fp.month, fp.year.stem, g, b.year, b.month, b.day, dayMaster.stem, 8)
    const life: LifePoint[] = major.fortunes.slice(0, 8).map((f, i) => {
      const next = major.fortunes[i + 1]
      const elem = EL_KO[STEM_ELEMENT[f.ganZhi.stem]] ?? "토"
      const grp = tgGroup(TEN_GOD_KOREAN[f.stemTenGod])
      const productive = isStrong ? ["식상", "재성", "관성"].includes(grp) : ["인성", "비겁"].includes(grp)
      const favor = clamp(
        52 + (elem === yong ? 20 : elem === gi ? -16 : 0) + (productive ? 12 : -2) + (grp === "재성" || grp === "관성" ? 4 : 0),
        26, 92,
      )
      return {
        startAge: f.startAge, ageLabel: `${f.startAge}~${f.startAge + 9}`,
        elem, tenGod: TEN_GOD_KOREAN[f.stemTenGod], favor,
        current: f.startAge <= curAge && (!next || next.startAge > curAge),
      }
    })
    const peak = life.length ? life.reduce((a, c) => (c.favor > a.favor ? c : a)) : null

    const yThis = calculateYearlyFortunes(b.year, dayMaster.stem, cy, cy).find(f => f.year === cy)
    const seunTenGod = yThis ? TEN_GOD_KOREAN[yThis.stemTenGod] : ""
    const samjae = (() => {
      const SAMHAP_LAST: Record<string, string[]> = { 申: ["寅", "卯", "辰"], 巳: ["亥", "子", "丑"], 寅: ["申", "酉", "戌"], 亥: ["巳", "午", "未"] }
      // 간이 삼재: 연지 삼합 마지막 글자 기준(보수적). 정밀 계산은 calculateSamjae 사용 권장.
      return Object.values(SAMHAP_LAST).some(g2 => g2.includes(fp.year.branch))
    })()

    const cur = life.find(l => l.current)
    const strongElems = (Object.keys(dist) as Elem[]).filter(e => dist[e] >= 3)
    const weakElems = (Object.keys(dist) as Elem[]).filter(e => dist[e] === 0)
    const goodAges = life.filter(l => l.favor >= 72).map(l => `${l.startAge}세`).slice(0, 3)
    const selfBlock = [
      `[나 사주 데이터 — 현상으로 풀고 용어·숫자라벨 노출 금지. 강점 프레임 유지]`,
      `일간: ${dayMaster.stem}(${STEM_KOREAN[dayMaster.stem]}·${EL_KO[dayMaster.element] ?? "토"}·${dayMaster.yinYang === "yang" ? "양" : "음"})`,
      `기운 균형: 강한 기운 ${strongElems.join("·") || "고른 편"} / 빠진 기운 ${weakElems.join("·") || "없음"}`,
      `힘: ${strongLevel} → ${isStrong ? "주도적으로 밀어붙일 때 잘 풀림" : "기대고 채우며 갈 때 잘 풀림"}`,
      `나를 살리는 기운(용신): ${yong} / 조심할 기운: ${gi} → "이 기운 채우면 트인다"로`,
      `재능결: ${topTalent.join("·")} 두드러짐`,
      `현재: ${curAge}세, ${cur ? `${cur.ageLabel}세 대운(${cur.tenGod}결, 길흉 ${cur.favor}/100)` : ""} / 올해 ${seunTenGod}결`,
      `인생 흐름(대운 길흉): ${life.map(l => `${l.startAge}세 ${l.favor}`).join(" / ")}`,
      peak ? `황금기: ${peak.ageLabel}세 전후` : ``,
      goodAges.length ? `트이는 시기: ${goodAges.join(", ")}` : ``,
      dohwa ? `매력(도화) 기운 있음` : ``,
      samjae ? `현재 삼재 구간(가벼운 안심 톤으로)` : ``,
    ].filter(Boolean).join("\n")

    const iljuKey = `${STEM_KOREAN[fp.day.stem]}${BRANCH_KOREAN[fp.day.branch]}-${gender === "M" ? "m" : "f"}`
    return {
      iljuKey, dayKr: STEM_KOREAN[fp.day.stem], dayElem: EL_KO[dayMaster.element] ?? "토",
      yinYang: dayMaster.yinYang === "yang" ? "양" : "음",
      dist, strongLevel, isStrong, yong, gi, tgGroups, topTalent, dohwa, curAge,
      life, peak, seunTenGod, samjae, selfBlock,
    }
  } catch {
    return null
  }
}
