"use client"
/**
 * 시안 C — 초박형 스택바 + 인라인 레전드(최대 효율).
 * 얇은 5색 바 + 5행을 한 줄 인라인(나무33 불56 …) + 평가 한 줄 + 미니 CTA.
 * 비교용 시안 — 제거 시 이 파일 + interior/page.tsx 마운트만 지우면 됨.
 */
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DoodleBox, DoodleTaegeuk } from "@/components/doodles"
import { useRoomElementSummary } from "@/hooks/useRoomElementSummary"
import { ELEMENTS, ELEMENT_COLORS, ELEMENT_LABEL, ELEMENT_PILL } from "@/lib/room-element"
import RoomElementBar from "./RoomElementBar"
import RoomElementSheet from "./RoomElementSheet"

export default function RoomElementCardC() {
  const router = useRouter()
  const { room, result, saju, reading } = useRoomElementSummary()
  const { percent, total, dominant } = result
  const [sheet, setSheet] = useState(false)

  return (
    <>
      <div
        className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3 cursor-pointer active:opacity-90 transition-opacity"
        onClick={() => total > 0 && setSheet(true)}
      >
        <div className="flex items-center gap-2 mb-2">
          <DoodleBox className="w-4 h-4"><DoodleTaegeuk /></DoodleBox>
          <p className="text-[13px] font-bold text-charcoal">이 방의 기운</p>
          {total > 0 && dominant && (
            <span className="ml-auto flex items-center gap-1 text-[11px] font-bold" style={{ color: ELEMENT_PILL[dominant].text }}>
              <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[dominant] }} />
              {ELEMENT_LABEL[dominant]}
            </span>
          )}
        </div>

        {total === 0 ? (
          <p className="text-[12px] text-text-muted leading-relaxed">
            아직 방에 놓인 아이템이 없어요. 소품을 배치하면 기운이 채워져요.
          </p>
        ) : (
          <>
            <RoomElementBar percent={percent} compact />

            {/* 인라인 5행 레전드 */}
            <div className="flex items-center justify-between mt-2">
              {ELEMENTS.map(e => (
                <span key={e} className="flex items-center gap-0.5 text-[10px] font-bold text-charcoal/70">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: ELEMENT_COLORS[e] }} />
                  {ELEMENT_LABEL[e]}
                  <span className="tabular-nums text-charcoal/90">{percent[e]}</span>
                </span>
              ))}
            </div>

            {/* 평가 한 줄 + 미니 CTA */}
            {reading && (
              <div className="flex items-center gap-2 mt-2.5">
                <p className="flex-1 min-w-0 text-[11.5px] text-text-muted leading-snug line-clamp-1">{reading.message}</p>
                <button
                  className="shrink-0 py-1 px-2 rounded-lg text-[11px] font-bold active:opacity-80"
                  style={{ background: ELEMENT_PILL[reading.recommend].bg, border: `1.5px solid ${ELEMENT_PILL[reading.recommend].border}`, color: ELEMENT_PILL[reading.recommend].text }}
                  onClick={e => { e.stopPropagation(); router.push("/v3/interior/inventory/props") }}
                >
                  {ELEMENT_LABEL[reading.recommend]} +
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {sheet && <RoomElementSheet room={room} saju={saju} onClose={() => setSheet(false)} />}
    </>
  )
}
