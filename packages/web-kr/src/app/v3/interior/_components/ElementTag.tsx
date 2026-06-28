/**
 * 오행 미니 태그 — 보관함/편집기에서 아이템의 오행을 직관적으로 표시.
 * "무"(중립)·"전체"(올라운드)도 함께 처리.
 */
import { ELEMENT_COLORS, ELEMENT_LABEL } from "@/lib/room-element"
import type { StickerElement } from "@/components/doodle-categories"

const NEUTRAL: Record<"무" | "전체", { color: string; label: string }> = {
  무: { color: "#C8BBA8", label: "중립" },
  전체: { color: "#B79CE0", label: "올라운드" },
}

export default function ElementTag({
  el,
  className = "",
}: {
  el: StickerElement
  className?: string
}) {
  const { color, label } =
    el === "무" || el === "전체"
      ? NEUTRAL[el]
      : { color: ELEMENT_COLORS[el], label: ELEMENT_LABEL[el] }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold leading-none ${className}`}
      style={{ background: `${color}22`, color: "#5C4A3A" }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
      {label}
    </span>
  )
}
