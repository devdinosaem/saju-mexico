"use client"
/**
 * 시안 A — 접이식 요약 카드.
 * 평소엔 5색 바 + 평가 한 줄(최소 높이). 탭하면 5행 %·추천 CTA가 인라인 펼침.
 * 비교용 시안 — 제거 시 이 파일 + interior/page.tsx 마운트만 지우면 됨.
 */
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DoodleTaegeuk } from "@/components/doodles"
import { useRoomElementSummary } from "@/hooks/useRoomElementSummary"
import { ELEMENTS, ELEMENT_COLORS, ELEMENT_LABEL, ELEMENT_PILL } from "@/lib/room-element"
import RoomElementBar from "./RoomElementBar"
import RoomElementSheet from "./RoomElementSheet"
import ElementPill from "./ElementPill"

export default function RoomElementCardA() {
  const router = useRouter()
  const { room, result, saju, reading } = useRoomElementSummary()
  const { percent, total, dominant } = result
  const [expanded, setExpanded] = useState(false)
  const [sheet, setSheet] = useState(false)

  return (
    <>
      <div className="rounded-2xl bg-white border border-charcoal/10 p-4">
        {/* 헤더 — 탭하면 펼침 */}
        <button
          className="w-full flex items-center gap-2 active:opacity-80"
          onClick={() => total > 0 && setExpanded(v => !v)}
        >
          <DoodleTaegeuk style={{ width: 18, height: 18 }} />
          <p className="text-sm font-bold text-charcoal">이 방의 기운</p>
          {total > 0 && dominant && (
            <span className="ml-auto flex items-center gap-1 text-[11px] font-bold" style={{ color: ELEMENT_PILL[dominant].text }}>
              <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[dominant] }} />
              {ELEMENT_LABEL[dominant]} 기운
              <span className="text-charcoal/40 ml-0.5">{expanded ? "▴" : "▾"}</span>
            </span>
          )}
        </button>

        {total === 0 ? (
          <p className="text-[12px] text-text-muted leading-relaxed mt-2">
            아직 방에 놓인 아이템이 없어요. 소품을 배치하면 기운이 채워져요.
          </p>
        ) : (
          <>
            <div className="mt-2.5">
              <RoomElementBar percent={percent} compact />
            </div>

            {reading && !expanded && (
              <p className="text-[12px] text-text-muted leading-snug mt-2 line-clamp-1">{reading.message}</p>
            )}

            {/* 펼침 영역 */}
            {expanded && (
              <>
                <div className="space-y-2 mt-3">
                  {ELEMENTS.map(e => (
                    <div key={e} className="flex items-center gap-2.5">
                      <ElementPill elem={e} />
                      <div className="flex-1 h-2 rounded-full bg-charcoal/5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${percent[e]}%`, backgroundColor: ELEMENT_COLORS[e] }} />
                      </div>
                      <span className="text-[11px] font-bold text-charcoal/55 w-8 text-right tabular-nums">{percent[e]}%</span>
                    </div>
                  ))}
                </div>

                {reading && (
                  <>
                    <p className="text-[12px] text-text-muted leading-relaxed mt-3">{reading.message}</p>
                    <button
                      className="mt-2.5 w-full py-2.5 rounded-xl text-[12.5px] font-bold active:opacity-80 transition-opacity"
                      style={{ background: ELEMENT_PILL[reading.recommend].bg, border: `1.5px solid ${ELEMENT_PILL[reading.recommend].border}`, color: ELEMENT_PILL[reading.recommend].text }}
                      onClick={() => router.push("/v3/interior/inventory/props")}
                    >
                      {ELEMENT_LABEL[reading.recommend]} 기운 소품 더하기 →
                    </button>
                  </>
                )}

                <button className="text-[11px] text-text-muted/70 text-center w-full mt-2.5 active:opacity-60" onClick={() => setSheet(true)}>
                  기여 내역 자세히 ›
                </button>
              </>
            )}
          </>
        )}
      </div>

      {sheet && <RoomElementSheet room={room} saju={saju} onClose={() => setSheet(false)} />}
    </>
  )
}
