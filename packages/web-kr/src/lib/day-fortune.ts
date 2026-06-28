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

/* ── 12운성 점수 (별점용) ─────────────────────────────── */

const PHASE_SCORE: Record<TwelvePhase, number> = {
  jangsaeng: 4, mogyok: 3, gwandae: 4, geonrok: 5, jewang: 5, soe: 3,
  byeong: 2, sa: 2, myo: 3, jeol: 2, tae: 3, yang: 4,
}

/* ── 메인 문구: 십신(10) × 12운성(12) = 120개 ──────────────── */

const MAIN: Record<TenGod, Record<TwelvePhase, string>> = {
  bijeon: {
    jangsaeng: "내 색깔이 막 피어나는 날, 나답게 시작해",
    mogyok:    "마음이 들뜨는 날, 휘둘리지 말고 중심 잡아",
    gwandae:   "자신감이 붙는 날, 한 걸음 더 나서봐",
    geonrok:   "내 힘으로 서는 날, 스스로 결정해도 좋아",
    jewang:    "나다운 힘이 정점, 오늘은 주도해",
    soe:       "기세가 한풀 꺾이는 날, 무리하지 마",
    byeong:    "혼자 끌어안지 말고 잠시 기대도 괜찮아",
    sa:        "고집은 내려놓고 마무리에 집중해",
    myo:       "안으로 힘을 갈무리하는 날, 조용히 다져",
    jeol:      "관계를 정리하고 나를 리셋하는 날",
    tae:       "새로운 나를 구상하기 좋은 날, 씨앗을 심어",
    yang:      "나를 천천히 키우는 날, 서두르지 마",
  },
  geopjae: {
    jangsaeng: "경쟁심이 싹트는 날, 동료와 함께 시작해",
    mogyok:    "욕심이 앞서는 날, 한 박자 늦춰",
    gwandae:   "추진력이 붙는 날, 손잡으면 더 커져",
    geonrok:   "주도권을 잡는 날, 단 과욕은 금물",
    jewang:    "경쟁에서 앞서는 날, 욕심만 다스리면 완벽",
    soe:       "기세가 빠지는 날, 지출·약속 조심",
    byeong:    "재물이 새기 쉬운 날, 큰 결정은 미뤄",
    sa:        "벌이던 일을 정리할 때, 손절도 용기야",
    myo:       "돈도 마음도 갈무리하는 날, 아껴둬",
    jeol:      "돈과 사람 사이, 거리를 끊고 비워내",
    tae:       "새 판을 구상하는 날, 동업이라면 신중히",
    yang:      "다음 기회를 기르는 날, 천천히 준비해",
  },
  siksin: {
    jangsaeng: "즐거움이 샘솟는 날, 좋아하는 걸 시작해",
    mogyok:    "기분 따라 흔들리는 날, 가볍게 즐겨",
    gwandae:   "표현하고 싶은 날, 솜씨를 보여줘",
    geonrok:   "여유가 자리잡는 날, 누리면서 일해",
    jewang:    "표현력이 빛나는 날, 즐기면 다 풀려",
    soe:       "흥이 가라앉는 날, 욕심내지 말고 쉬어",
    byeong:    "기운이 처지는 날, 잘 먹고 잘 쉬어",
    sa:        "벌인 걸 마무리하고 입맛을 정리해",
    myo:       "안으로 음미하는 날, 나만의 취향을 즐겨",
    jeol:      "익숙한 즐거움을 끊고 새 취향을 찾아봐",
    tae:       "새로운 재미를 구상하는 날, 메모해 둬",
    yang:      "취미를 키우는 날, 꾸준히 가꿔봐",
  },
  sanggwan: {
    jangsaeng: "아이디어가 싹트는 날, 떠오르면 적어",
    mogyok:    "말이 앞서기 쉬운 날, 한 번 더 걸러",
    gwandae:   "재능을 드러내고 싶은 날, 무대를 찾아",
    geonrok:   "표현이 살아나는 날, 자신 있게 펼쳐",
    jewang:    "재능이 터지는 날, 마음껏 드러내",
    soe:       "날이 무뎌지는 날, 튀는 행동은 자제해",
    byeong:    "예민해지는 날, 말 한마디 조심",
    sa:        "벌인 말을 수습하고 매듭지어",
    myo:       "재주를 안으로 감추는 날, 조용히 갈고닦아",
    jeol:      "틀을 깨고 싶은 날, 방향만 잘 잡아",
    tae:       "새 표현을 구상하는 날, 실험해봐",
    yang:      "재능을 다듬는 날, 기본기를 키워",
  },
  pyeonjae: {
    jangsaeng: "기회가 싹트는 날, 사람을 만나봐",
    mogyok:    "돈이 들썩이는 날, 충동구매 조심",
    gwandae:   "재물운이 살아나는 날, 발을 넓혀",
    geonrok:   "수완이 빛나는 날, 거래를 성사시켜",
    jewang:    "재물·기회 잡기 최고의 날, 움직여",
    soe:       "흐름이 꺾이는 날, 큰 지출은 멈춰",
    byeong:    "돈이 빠지기 쉬운 날, 투자 결정은 미뤄",
    sa:        "벌인 거래를 정리하고 셈을 맞춰",
    myo:       "재물을 갈무리하는 날, 묻어두고 지켜",
    jeol:      "욕심을 끊는 날, 비워야 들어와",
    tae:       "새 기회를 구상하는 날, 판을 그려봐",
    yang:      "씨앗 같은 기회를 기르는 날, 길게 봐",
  },
  jeongjae: {
    jangsaeng: "꾸준함이 싹트는 날, 작게 시작해",
    mogyok:    "씀씀이가 흔들리는 날, 가계부를 봐",
    gwandae:   "살림이 자리잡는 날, 차근차근 쌓아",
    geonrok:   "성실함이 통하는 날, 실리를 챙겨",
    jewang:    "노력이 결실 맺는 날, 알차게 거둬",
    soe:       "수입이 더뎌지는 날, 새 지출은 자제",
    byeong:    "셈이 어긋나기 쉬운 날, 계약 다시 봐",
    sa:        "벌인 일을 결산하고 매듭지어",
    myo:       "차곡차곡 저축하는 날, 묻어두면 든든",
    jeol:      "낭비를 끊는 날, 군더더기를 비워",
    tae:       "새 계획을 구상하는 날, 예산을 짜봐",
    yang:      "살림을 가꾸는 날, 꾸준함이 돈이 돼",
  },
  pyeongwan: {
    jangsaeng: "도전 욕구가 싹트는 날, 작게 부딪쳐봐",
    mogyok:    "긴장이 도는 날, 욱하지 말고 숨 고르기",
    gwandae:   "추진력이 차오르는 날, 정면으로 가",
    geonrok:   "위기를 돌파하는 날, 밀어붙여",
    jewang:    "부딪힐수록 강해지는 날, 정면돌파해",
    soe:       "기세가 눌리는 날, 무리 말고 페이스 지켜",
    byeong:    "압박감 큰 날, 한 발 물러서도 돼",
    sa:        "버티던 일을 마무리하고 짐을 내려",
    myo:       "힘을 안으로 비축하는 날, 때를 기다려",
    jeol:      "버티던 걸 내려놓고 방향을 트는 날",
    tae:       "새 도전을 구상하는 날, 전략을 세워",
    yang:      "실력을 기르는 날, 다음 승부를 준비해",
  },
  jeonggwan: {
    jangsaeng: "신뢰가 싹트는 날, 약속부터 지켜",
    mogyok:    "규칙이 흔들리는 날, 원칙을 다잡아",
    gwandae:   "책임이 커지는 날, 자세를 갖춰",
    geonrok:   "질서가 잡히는 날, 원칙대로 가면 통해",
    jewang:    "신뢰가 쌓이는 날, 책임지면 인정받아",
    soe:       "위신이 흔들리는 날, 겸손하게 처신해",
    byeong:    "규칙에 눌리는 날, 잠시 거리를 둬",
    sa:        "맡은 일을 마무리하고 책임을 정리해",
    myo:       "내실을 다지는 날, 조용히 자리를 지켜",
    jeol:      "맡은 역할을 점검하고 군더더기를 끊어",
    tae:       "새 역할을 구상하는 날, 큰 그림을 그려",
    yang:      "명예를 천천히 쌓는 날, 신용을 길러",
  },
  pyeonin: {
    jangsaeng: "영감이 싹트는 날, 촉이 오면 따라가",
    mogyok:    "생각이 산만한 날, 한 가지에 집중해",
    gwandae:   "통찰이 깊어지는 날, 파고들어",
    geonrok:   "직관이 또렷해지는 날, 감을 믿어",
    jewang:    "직관이 날카로운 날, 촉을 믿어",
    soe:       "머리가 무거운 날, 생각을 잠시 비워",
    byeong:    "잡념이 많은 날, 혼자 끙끙대지 마",
    sa:        "벌인 궁리를 정리하고 결론을 내",
    myo:       "내면을 파고드는 날, 깊이 사색해",
    jeol:      "익숙한 생각을 끊고 새로 배우는 날",
    tae:       "새 관심사가 싹트는 날, 호기심을 따라가",
    yang:      "지식을 익히는 날, 차근차근 쌓아",
  },
  jeongin: {
    jangsaeng: "배움이 싹트는 날, 새 책을 펼쳐",
    mogyok:    "마음이 일렁이는 날, 차분히 가라앉혀",
    gwandae:   "이해가 깊어지는 날, 받아들이며 자라",
    geonrok:   "안정이 자리잡는 날, 기본에 충실해",
    jewang:    "배움이 깊어지는 날, 받아들이면 커져",
    soe:       "의욕이 가라앉는 날, 쉬어가도 괜찮아",
    byeong:    "마음이 약해지는 날, 기대도 괜찮아",
    sa:        "배운 걸 정리하고 마음을 다잡아",
    myo:       "안으로 새기는 날, 조용히 되새겨",
    jeol:      "묵은 마음의 짐을 끊고 비워내",
    tae:       "새 배움을 구상하는 날, 방향을 정해",
    yang:      "마음을 돌보는 날, 천천히 재충전해",
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
  const base = PHASE_SCORE[phase]

  return {
    ganji: today.stem + today.branch,
    tenGodKr: TEN_GOD_KOREAN[tenGod],
    phaseKr: PHASE_KOREAN[phase],
    spiritKr: SPIRIT_STAR_KOREAN[spirit],
    element: FIVEELEMENT_KR[STEM_ELEMENT[today.stem]],
    main: MAIN[tenGod][phase],
    subtext: SUBTEXT[spirit],
    overall: base,
    money: clamp(base + (WEALTH_GODS.includes(tenGod) ? 1 : 0) + (tenGod === "geopjae" ? -1 : 0)),
    love: clamp(base + (spirit === "nyeonsal" ? 1 : 0) + (LOVE_GODS.includes(tenGod) ? 1 : 0)),
    health: clamp(base + (["byeong", "sa", "jeol"].includes(phase) ? -1 : 0)),
  }
}
