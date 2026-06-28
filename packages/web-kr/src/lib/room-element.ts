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
