/**
 * 방 오행 밸런스 집계 — 미니홈피 "방의 기운"
 *
 * 배치된 모든 아이템(소품·캐릭터·스킨)의 오행을 가중 합산해 방의 기운을 산출한다.
 *   - 소품(스티커): ×1   · element 는 doodle-categories SSOT
 *   - 캐릭터:        ×3   · 일주키 첫 글자(일간)의 오행
 *   - 스킨:          ×2   · RoomSkin.element (색상 매핑)
 * 특수값: "무" → 집계 제외 / "전체" → 5행 균등 분배(각 weight×0.2)
 *
 * 기획: docs/plans/interior-element-balance.md
 */
import type { ElemKr } from "@/lib/day-fortune"
import { ALL_STICKERS, type StickerElement } from "@/components/doodle-categories"
import { SKINS, type RoomData } from "@/app/v3/my/_components/MiniRoom"

export const ELEMENTS: readonly ElemKr[] = ["목", "화", "토", "금", "수"] as const

/** 오행 대표 색 (뱃지·바·도트 공용) */
export const ELEMENT_COLORS: Record<ElemKr, string> = {
  목: "#4ADE80", 화: "#F87171", 토: "#FBBF24", 금: "#94A3B8", 수: "#60A5FA",
}

/** 직관적 순한글 라벨 (한자 미사용 — 전역 한자 제거 정책 준수) */
export const ELEMENT_LABEL: Record<ElemKr, string> = {
  목: "나무", 화: "불", 토: "흙", 금: "쇠", 수: "물",
}

/** 가중치 (기획 확정값) */
export const ELEMENT_WEIGHTS = { sticker: 1, character: 3, skin: 2 } as const

/** 일간(천간 첫 글자) → 오행 */
const STEM_TO_ELEM: Record<string, ElemKr> = {
  갑: "목", 을: "목", 병: "화", 정: "화",
  무: "토", 기: "토", 경: "금", 신: "금",
  임: "수", 계: "수",
}

/** 소품 name → element 룩업 (ALL_STICKERS 1회 빌드) */
const STICKER_ELEM = new Map<string, StickerElement>(
  ALL_STICKERS.map(s => [s.name, s.element]),
)

export function getStickerElement(name: string): StickerElement | undefined {
  return STICKER_ELEM.get(name)
}

export type ElementScores = Record<ElemKr, number>

export type RoomElementResult = {
  /** 가중 합산 원점수 */
  raw: ElementScores
  /** 정규화 비율(%) — 반올림 탓에 합이 정확히 100이 아닐 수 있음 */
  percent: ElementScores
  /** 집계에 포함된 총점(무 제외) */
  total: number
  /** 대표 기운(최대). 빈 방이면 null */
  dominant: ElemKr | null
  /** 부족한 기운(최소·0 포함). 빈 방이면 null */
  lacking: ElemKr | null
}

const emptyScores = (): ElementScores => ({ 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 })

function addElement(scores: ElementScores, el: StickerElement, weight: number) {
  if (el === "무") return
  if (el === "전체") {
    for (const e of ELEMENTS) scores[e] += weight * 0.2
    return
  }
  scores[el] += weight
}

export function calcRoomElements(
  room: Pick<RoomData, "stickers" | "chars" | "skinId">,
): RoomElementResult {
  const raw = emptyScores()

  // 소품 ×1
  for (const s of room.stickers ?? []) {
    const el = getStickerElement(s.name)
    if (el) addElement(raw, el, ELEMENT_WEIGHTS.sticker)
  }

  // 캐릭터 ×3 (일간 오행)
  for (const c of room.chars ?? []) {
    const el = STEM_TO_ELEM[c.key[0]]
    if (el) raw[el] += ELEMENT_WEIGHTS.character
  }

  // 스킨 ×2
  if (room.skinId) {
    const skin = SKINS.find(s => s.id === room.skinId)
    if (skin) raw[skin.element] += ELEMENT_WEIGHTS.skin
  }

  const total = ELEMENTS.reduce((acc, e) => acc + raw[e], 0)

  const percent = emptyScores()
  if (total > 0) for (const e of ELEMENTS) percent[e] = Math.round((raw[e] / total) * 100)

  let dominant: ElemKr | null = null
  let lacking: ElemKr | null = null
  if (total > 0) {
    dominant = ELEMENTS.reduce((a, b) => (raw[b] > raw[a] ? b : a))
    lacking = ELEMENTS.reduce((a, b) => (raw[b] < raw[a] ? b : a))
  }

  return { raw, percent, total, dominant, lacking }
}

// ─────────────────────────────────────────────────────────────
// Phase 2: 사주 분포 비교 해석
// ─────────────────────────────────────────────────────────────

export type ReadingTone = "complement" | "excess" | "suggest"

export type RoomReading = {
  tone: ReadingTone
  /** 따뜻한 권유체 한 줄 해석 */
  message: string
  /** 보완 추천 오행 (사주에 가장 옅은 기운) */
  recommend: ElemKr
}

/** 방 기운이 사주에 부족한 기운을 채워주는 정도로 충분하다고 볼 임계치(%) */
const COMPLEMENT_THRESHOLD = 20

/**
 * 방 오행 분포 vs 사주 오행 분포 비교 → 한 줄 해석 + 보완 추천 오행.
 * 빈 방(total 0)이거나 사주 분포가 없으면 null.
 */
export function interpretRoomVsSaju(
  room: RoomElementResult,
  saju: ElementScores,
): RoomReading | null {
  if (room.total === 0 || !room.dominant) return null

  const weak = ELEMENTS.reduce((a, b) => (saju[b] < saju[a] ? b : a))
  const strong = ELEMENTS.reduce((a, b) => (saju[b] > saju[a] ? b : a))
  const wl = ELEMENT_LABEL[weak]
  const sl = ELEMENT_LABEL[strong]
  const rl = ELEMENT_LABEL[room.dominant]

  // 1) 방의 대표 기운이 사주가 가장 필요로 하는 기운 → 완벽 보완
  if (room.dominant === weak) {
    return {
      tone: "complement", recommend: weak,
      message: `사주에 옅은 ${wl} 기운이 이 방엔 가장 가득해요. 머무는 것만으로 균형이 잡히는, 당신과 잘 맞는 공간이에요.`,
    }
  }
  // 2) 부족한 기운을 어느 정도 채워주는 중 → 한 발 더 권유
  if (room.percent[weak] >= COMPLEMENT_THRESHOLD) {
    return {
      tone: "complement", recommend: weak,
      message: `사주에 부족한 ${wl} 기운을 방이 어느 정도 채워주고 있어요. ${wl} 소품을 조금만 더 더하면 한결 편안해질 거예요.`,
    }
  }
  // 3) 이미 넉넉한 기운이 방에도 가장 강함 → 다른 결 제안
  if (room.dominant === strong) {
    return {
      tone: "excess", recommend: weak,
      message: `이미 넉넉한 ${sl} 기운이 방에도 가장 강하네요. 가끔은 ${wl} 기운 소품으로 다른 결을 더해보면 균형이 좋아져요.`,
    }
  }
  // 4) 그 외 → 부족 기운 보완 제안
  return {
    tone: "suggest", recommend: weak,
    message: `방은 ${rl} 기운이 강한 편이에요. 사주에 옅은 ${wl} 기운을 조금 더 채워주면 더 잘 어울리는 공간이 될 거예요.`,
  }
}
