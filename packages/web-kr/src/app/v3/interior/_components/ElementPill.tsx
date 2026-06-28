/**
 * 오행 칩(pill) — 두들 아이콘 + 순한글 라벨. 운기달력 "내 오행 밸런스" 룩.
 */
import { DoodleSprout, DoodleFire, DoodleEarth, DoodleDiamond, DoodleWave } from "@/components/doodles"
import { ELEMENT_LABEL, ELEMENT_PILL } from "@/lib/room-element"
import type { ElemKr } from "@/lib/day-fortune"

type DoodleC = React.FC<{ className?: string; style?: React.CSSProperties }>
export const ELEM_DOODLE: Record<ElemKr, DoodleC> = {
  목: DoodleSprout, 화: DoodleFire, 토: DoodleEarth, 금: DoodleDiamond, 수: DoodleWave,
}

export default function ElementPill({
  elem,
  size = "md",
}: {
  elem: ElemKr
  size?: "sm" | "md"
}) {
  const D = ELEM_DOODLE[elem]
  const p = ELEMENT_PILL[elem]
  const sm = size === "sm"
  return (
    <span
      className={`inline-flex items-center justify-center gap-1 font-bold rounded-full shrink-0 whitespace-nowrap ${
        sm ? "text-[10px] px-1.5 py-0.5 w-[48px]" : "text-[11px] px-2 py-0.5 w-[56px]"
      }`}
      style={{ background: p.bg, border: `1.5px solid ${p.border}`, color: p.text }}
    >
      <D style={{ width: sm ? 11 : 13, height: sm ? 11 : 13 }} />
      {ELEMENT_LABEL[elem]}
    </span>
  )
}
