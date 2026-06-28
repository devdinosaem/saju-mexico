import {
  dayPillar,
  STEM_ELEMENT, STEM_YINYANG,
  type HeavenlyStem, type EarthlyBranch,
} from "manseryeok"
import {
  determineTenGod,
  getPhase,
  getTwelveSpiritStar,
  TEN_GOD_KOREAN,
  PHASE_KOREAN,
  SPIRIT_STAR_KOREAN,
  type TenGod,
  type TwelvePhase,
  type TwelveSpiritStar,
} from "saju-engine"

/* ── 오행 한글 ─────────────────────────────────────── */

export type ElemKr = "목" | "화" | "토" | "금" | "수"

const FIVEELEMENT_KR: Record<string, ElemKr> = {
  wood: "목", fire: "화", earth: "토", metal: "금", water: "수",
}

/** 양력 날짜 → 그날 일진 천간의 오행(한글) */
export function getDayElem(year: number, month: number, day: number): ElemKr {
  const gz = dayPillar(year, month, day)
  return FIVEELEMENT_KR[STEM_ELEMENT[gz.stem]]
}

/* ── 12운성 강도 그룹 ─────────────────────────────────── */

type PhaseStrength = "peak" | "rising" | "waning" | "turning"

const PHASE_STRENGTH: Record<TwelvePhase, PhaseStrength> = {
  geonrok: "peak", jewang: "peak",
  jangsaeng: "rising", gwandae: "rising", yang: "rising",
  soe: "waning", byeong: "waning", sa: "waning",
  mogyok: "turning", myo: "turning", jeol: "turning", tae: "turning",
}

const PHASE_SCORE: Record<TwelvePhase, number> = {
  jangsaeng: 4, mogyok: 3, gwandae: 4, geonrok: 5, jewang: 5, soe: 3,
  byeong: 2, sa: 2, myo: 3, jeol: 2, tae: 3, yang: 4,
}

/* ── 메인 문구: 십신 × 12운성 강도 (40개) ─────────────────── */

const MAIN: Record<TenGod, Record<PhaseStrength, string>> = {
  bijeon: {
    peak:    "나다운 힘이 정점, 주도해도 좋은 날",
    rising:  "자립심이 차오르는 날, 스스로 결정해",
    waning:  "혼자 끌어안지 말고 한 박자 쉬어가",
    turning: "관계를 정리하고 내 페이스를 되찾는 날",
  },
  geopjae: {
    peak:    "경쟁에서 앞서는 날, 단 과욕은 금물",
    rising:  "추진력 좋은 날, 동료와 손잡으면 더 커져",
    waning:  "지출·약속 조심, 욕심 내려놓는 게 이득",
    turning: "돈과 사람 사이, 거리 조절이 필요한 날",
  },
  siksin: {
    peak:    "표현력이 빛나는 날, 즐기면 다 풀려",
    rising:  "여유가 생기는 날, 좋아하는 걸 시작해",
    waning:  "무리한 일정보다 충분히 쉬는 게 나아",
    turning: "입맛도 마음도 바뀌는 날, 새 취향을 찾아봐",
  },
  sanggwan: {
    peak:    "재능이 터지는 날, 마음껏 드러내",
    rising:  "아이디어가 샘솟는 날, 메모해 둬",
    waning:  "말 한마디 조심, 튀는 행동은 한 박자 참아",
    turning: "틀을 깨고 싶은 날, 방향만 잘 잡으면 돼",
  },
  pyeonjae: {
    peak:    "재물·기회 잡기 최고의 날, 움직여",
    rising:  "돈 흐름이 열리는 날, 사람을 만나봐",
    waning:  "큰 지출·투자 결정은 미루는 게 나아",
    turning: "기회가 들고나는 날, 욕심보다 타이밍",
  },
  jeongjae: {
    peak:    "성실함이 결실 맺는 날, 실리를 챙겨",
    rising:  "차근차근 쌓는 날, 꾸준함이 돈이 돼",
    waning:  "무리한 약속·계약은 다시 살펴봐",
    turning: "씀씀이를 점검하고 살림 정리하기 좋은 날",
  },
  pyeongwan: {
    peak:    "부딪힐수록 강해지는 날, 정면돌파해",
    rising:  "도전 에너지가 차오르는 날, 밀어붙여",
    waning:  "압박감 큰 날, 무리 말고 페이스를 지켜",
    turning: "버티던 걸 내려놓고 방향을 트는 날",
  },
  jeonggwan: {
    peak:    "신뢰가 쌓이는 날, 책임지면 인정받아",
    rising:  "질서가 잡히는 날, 원칙대로 가면 통해",
    waning:  "규칙·관계에 눌리는 날, 거리를 둬",
    turning: "맡은 자리와 역할을 다시 점검하는 날",
  },
  pyeonin: {
    peak:    "직관이 날카로운 날, 촉을 믿어",
    rising:  "공부·궁리가 잘 되는 날, 파고들어",
    waning:  "생각이 많아지는 날, 혼자 끙끙대지 마",
    turning: "익숙한 걸 의심하고 새로 배우는 날",
  },
  jeongin: {
    peak:    "배움이 깊어지는 날, 받아들이면 커져",
    rising:  "마음이 안정되는 날, 차분히 흡수해",
    waning:  "기대고 싶은 날, 쉬어가도 괜찮아",
    turning: "마음의 짐을 정리하고 재충전하는 날",
  },
}

/* ── 한마디: 12신살 (12개) ───────────────────────────── */

const SUBTEXT: Record<TwelveSpiritStar, string> = {
  geobsal:    "예상 못한 변수 조심, 욕심부리면 탈나",
  jaesal:     "다툼·충돌 주의, 한 발 물러서면 무탈해",
  cheonsal:   "내 뜻대로 안 풀려도 하늘에 맡겨봐",
  jisal:      "새 출발·이동에 좋은 날, 움직여봐",
  nyeonsal:   "매력이 빛나는 날, 사람들 앞에 나서봐",
  wolsal:     "괜히 위축되는 날, 큰일은 잠시 미뤄",
  mangsinsal: "실수·구설 조심, 말과 행동을 단정히",
  jangseong:  "리더의 기운 가득, 앞장서도 좋아",
  banan:      "안정과 승진의 기운, 지금 자리를 지켜",
  yeokma:     "이동하거나 환경을 바꾸면 운이 열려",
  yukhae:     "건강·관계에 신경 쓰고 무리하지 마",
  hwagae:     "혼자 집중하는 시간이 오히려 충전이야",
}

/* ── 재물/연애 가중 십신 ──────────────────────────────── */

const WEALTH_GODS: TenGod[] = ["pyeonjae", "jeongjae"]
const LOVE_GODS: TenGod[] = ["siksin", "jeongjae", "jeonggwan"]

const clamp = (n: number) => Math.max(1, Math.min(5, n))

/* ── 결과 타입 ────────────────────────────────────────── */

export interface DayFortune {
  ganji: string       // "庚子"
  tenGodKr: string    // "편재"
  phaseKr: string     // "제왕"
  spiritKr: string    // "역마살"
  element: ElemKr     // 일진 천간 오행
  main: string
  subtext: string
  overall: number
  money: number
  love: number
  health: number
}

/**
 * 유저 일주(한자) 기준으로 특정 양력 날짜의 일운을 계산
 * @param userIljuHanja "庚辰" 형태 (없으면 갑자 기준 폴백)
 */
export function getDayFortune(
  userIljuHanja: string,
  year: number, month: number, day: number,
): DayFortune {
  const dayStem = userIljuHanja[0] as HeavenlyStem
  const dayBranch = userIljuHanja[1] as EarthlyBranch

  const today = dayPillar(year, month, day)

  const tenGod = determineTenGod(
    STEM_ELEMENT[dayStem], STEM_YINYANG[dayStem],
    STEM_ELEMENT[today.stem], STEM_YINYANG[today.stem],
  )
  const phase = getPhase(dayStem, today.branch)
  const spirit = getTwelveSpiritStar(dayBranch, today.branch)
  const strength = PHASE_STRENGTH[phase]
  const base = PHASE_SCORE[phase]

  return {
    ganji: today.stem + today.branch,
    tenGodKr: TEN_GOD_KOREAN[tenGod],
    phaseKr: PHASE_KOREAN[phase],
    spiritKr: SPIRIT_STAR_KOREAN[spirit],
    element: FIVEELEMENT_KR[STEM_ELEMENT[today.stem]],
    main: MAIN[tenGod][strength],
    subtext: SUBTEXT[spirit],
    overall: base,
    money: clamp(base + (WEALTH_GODS.includes(tenGod) ? 1 : 0) + (tenGod === "geopjae" ? -1 : 0)),
    love: clamp(base + (spirit === "nyeonsal" ? 1 : 0) + (LOVE_GODS.includes(tenGod) ? 1 : 0)),
    health: clamp(base + (["byeong", "sa", "jeol"].includes(phase) ? -1 : 0)),
  }
}
