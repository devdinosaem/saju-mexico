// 썸 궁합 — 두 사람 사주의 깊은 명리 신호를 코드가 산출(모델은 현상 번역만).
// stem/branch는 saju-engine과 동일 한자, element는 엔진 영문키(wood/fire/earth/metal/water).
// 작성: consult 프롬프트 설계 차용 — 명리는 코드, 현상·조언은 프롬프트.

export type Stem = string   // 甲乙丙丁戊己庚辛壬癸
export type Branch = string // 子丑寅卯辰巳午未申酉戌亥
export type Elem = "wood" | "fire" | "earth" | "metal" | "water"

const STEM_EL: Record<Stem, Elem> = {
  甲:"wood",乙:"wood", 丙:"fire",丁:"fire", 戊:"earth",己:"earth", 庚:"metal",辛:"metal", 壬:"water",癸:"water",
}
const STEM_HAP: Record<Stem, Stem> = { 甲:"己",己:"甲", 乙:"庚",庚:"乙", 丙:"辛",辛:"丙", 丁:"壬",壬:"丁", 戊:"癸",癸:"戊" }
const STEM_CHUNG: Record<Stem, Stem> = { 甲:"庚",庚:"甲", 乙:"辛",辛:"乙", 丙:"壬",壬:"丙", 丁:"癸",癸:"丁" }
const BR_YUKHAP: [Branch,Branch][] = [["子","丑"],["寅","亥"],["卯","戌"],["辰","酉"],["巳","申"],["午","未"]]
const BR_CHUNG:  [Branch,Branch][] = [["子","午"],["丑","未"],["寅","申"],["卯","酉"],["辰","戌"],["巳","亥"]]
const SAMHAP: Branch[][] = [["申","子","辰"],["亥","卯","未"],["寅","午","戌"],["巳","酉","丑"]]
const DOHWA_OF: Record<string, Branch> = { "申子辰":"酉","亥卯未":"子","寅午戌":"卯","巳酉丑":"午" }

const GEN:  Record<Elem,Elem> = { wood:"fire",fire:"earth",earth:"metal",metal:"water",water:"wood" }
const CTRL: Record<Elem,Elem> = { wood:"earth",earth:"water",water:"fire",fire:"metal",metal:"wood" }
const inPairs = (a:string,b:string, list:[string,string][]) =>
  list.some(([x,y]) => (x===a&&y===b)||(x===b&&y===a))

function elemRel(a:Elem,b:Elem): "생받음"|"생해줌"|"극받음"|"극해줌"|"같음" {
  if (a===b) return "같음"
  if (GEN[b]===a) return "생받음"   // 상대가 나를 생(북돋움)
  if (GEN[a]===b) return "생해줌"
  if (CTRL[b]===a) return "극받음"  // 상대가 나를 극
  return "극해줌"
}
function stemRelation(a:Stem,b:Stem): "천간합"|"천간충"|"상생"|"상극"|"비화" {
  if (STEM_HAP[a]===b) return "천간합"
  if (STEM_CHUNG[a]===b) return "천간충"
  const r = elemRel(STEM_EL[a], STEM_EL[b])
  return r==="같음" ? "비화" : (r==="생받음"||r==="생해줌") ? "상생" : "상극"
}
function branchRelation(a:Branch,b:Branch): "육합"|"삼합"|"충"|"무관계" {
  if (inPairs(a,b,BR_YUKHAP)) return "육합"
  if (SAMHAP.some(g => g.includes(a)&&g.includes(b)&&a!==b)) return "삼합"
  if (inPairs(a,b,BR_CHUNG)) return "충"
  return "무관계"
}
function hasDohwa(branches: Branch[], anchor: Branch): boolean {
  const g = SAMHAP.find(grp => grp.includes(anchor))
  if (!g) return false
  return branches.includes(DOHWA_OF[g.join("")])
}

// ── 입력: 각 사람(엔진 결과에서 추출) ──
export type Person = {
  dayStem: Stem
  dayBranch: Branch
  branches: Branch[]              // 4지지(가용분)
  yearBranch: Branch
  fiveElements: Record<Elem, number>
  yongShin: Elem                  // analyzeYongShin().yongShin
}
// 상담자(me)의 현재 연애운 타이밍: 현재 대운+세운의 십신 라벨(한글). 예: ["정관","식신"]
export type Timing = { tenGods: string[] }

const ROMANCE_TENGODS = ["정관","편관","정재","편재","식신","상관"]

export type CompatSignals = {
  spouse: "육합"|"삼합"|"충"|"무관계"          // 일지(배우자궁)
  yongFulfill: 0|1|2|3                          // 상대가 내 용신 채우는 정도
  core: "천간합"|"천간충"|"상생"|"상극"|"비화"  // 일간 인력
  role: "생받음"|"생해줌"|"극받음"|"극해줌"|"같음"
  timingHot: boolean
  dohwa: boolean
}

export function computeCompat(me: Person, crush: Person, myTiming: Timing): { score: number; signals: CompatSignals } {
  const spouse = branchRelation(me.dayBranch, crush.dayBranch)
  const yongFulfill = Math.min(3, crush.fiveElements[me.yongShin] ?? 0) as 0|1|2|3
  const core = stemRelation(me.dayStem, crush.dayStem)
  const role = elemRel(STEM_EL[me.dayStem], STEM_EL[crush.dayStem])
  const timingHot = myTiming.tenGods.some(g => ROMANCE_TENGODS.includes(g))
  const dohwa = hasDohwa(me.branches, me.yearBranch) || hasDohwa(crush.branches, crush.yearBranch)

  let s = 50
  s += { 육합:18, 삼합:14, 충:8, 무관계:0 }[spouse]
  s += [ -5, 8, 14, 18 ][yongFulfill]
  s += { 천간합:12, 상생:6, 비화:3, 상극:-2, 천간충:-4 }[core]
  s += { 생받음:6, 같음:4, 생해줌:3, 극받음:2, 극해줌:1 }[role]
  s += timingHot ? 10 : 0
  s += dohwa ? 5 : 0

  const score = Math.max(48, Math.min(94, Math.round(s))) // 100 금지·바닥 보장(절망 방지)
  return { score, signals: { spouse, yongFulfill, core, role, timingHot, dohwa } }
}

// 프롬프트에 박을 '현상 힌트' 데이터 블록(용어·숫자라벨 노출 금지 — 모델이 현상으로 풀게)
export function compatPromptBlock(score: number, sig: CompatSignals): string {
  const spouse = {
    육합:"곁에 있으면 자연스럽게 안정되는 끌림",
    삼합:"죽이 잘 맞고 통하는 결",
    충:"긴장이 오히려 강한 끌림이 되는 밀당형 — 안정감을 주는 게 공략",
    무관계:"강한 자성은 약함 — 진심·꾸준함이 변수",
  }[sig.spouse]
  const core = {
    천간합:"서로를 끌어당겨 묶는 결", 상생:"서로 북돋는 결", 비화:"닮아서 편한 결",
    상극:"다름에서 오는 긴장", 천간충:"부딪히며 끌리는",
  }[sig.core]
  const role = {
    생받음:"상대가 너를 북돋아주는", 같음:"비슷한 결이라 편한", 생해줌:"네가 챙겨주고 싶어지는",
    극받음:"너를 긴장시키며 끌리게 하는", 극해줌:"네가 리드하게 되는",
  }[sig.role]
  return [
    `[궁합 데이터 — 현상으로 풀고 용어·숫자라벨 노출 금지]`,
    `가능성: ${score}%  ← "운명" 아니라 "나머지는 네 행동에 달렸다"로`,
    `배우자궁: ${spouse}`,
    `상대가 네 부족함 채우는 정도: ${["거의 안 채움","조금","꽤","많이"][sig.yongFulfill]}${sig.yongFulfill>=2 ? " → '네 부족함을 채워주는 사람' 강조" : ""}`,
    `본체 인력: ${core}`,
    `역할 케미: ${role}`,
    `지금 네 연애 흐름: ${sig.timingHot ? "인연이 움직이는 시기" : "잔잔 — 네가 만드는 게 핵심"}${sig.dohwa ? " / 매력이 잘 드러나는 기운 있음" : ""}`,
  ].join("\n")
}
