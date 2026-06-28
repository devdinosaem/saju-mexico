/**
 * 오행 분포 스택 바 (+ 선택 레전드) — 카드·편집기 미터 공용.
 */
import { ELEMENTS, ELEMENT_COLORS, ELEMENT_LABEL, type ElementScores } from "@/lib/room-element"

export default function RoomElementBar({
  percent,
  compact = false,
}: {
  percent: ElementScores
  compact?: boolean
}) {
  return (
    <>
      <div
        className={`flex w-full rounded-full overflow-hidden ${compact ? "h-2.5" : "h-4"}`}
        style={{ background: "#EDE4D4" }}
      >
        {ELEMENTS.map(e =>
          percent[e] > 0 ? (
            <div
              key={e}
              style={{ width: `${percent[e]}%`, background: ELEMENT_COLORS[e] }}
              title={`${ELEMENT_LABEL[e]} ${percent[e]}%`}
            />
          ) : null,
        )}
      </div>

      {!compact && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5">
          {ELEMENTS.map(e => (
            <span key={e} className="flex items-center gap-1 text-[11px]">
              <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[e] }} />
              <span className="text-charcoal/70">{ELEMENT_LABEL[e]}</span>
              <span className="font-bold text-charcoal/90">{percent[e]}%</span>
            </span>
          ))}
        </div>
      )}
    </>
  )
}
