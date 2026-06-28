"use client"
/**
 * "방의 기운" 상세 바텀시트 — 레이더 차트 + 아이템별 기여 내역 + 사주 해석/추천.
 */
import { useRouter } from "next/navigation"
import {
  calcRoomElements, roomElementBreakdown, interpretRoomVsSaju,
  ELEMENT_COLORS, ELEMENT_LABEL, type ElementScores,
} from "@/lib/room-element"
import type { RoomData } from "@/app/v3/my/_components/MiniRoom"
import ElementRadar from "./ElementRadar"
import ElementTag from "./ElementTag"

const KIND_LABEL = { sticker: "소품", character: "캐릭터", skin: "스킨" } as const

export default function RoomElementSheet({
  room,
  saju,
  onClose,
}: {
  room: RoomData
  saju: ElementScores | null
  onClose: () => void
}) {
  const router = useRouter()
  const result = calcRoomElements(room)
  const breakdown = roomElementBreakdown(room).sort((a, b) => b.weight - a.weight)
  const reading = saju ? interpretRoomVsSaju(result, saju) : null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] mx-auto rounded-t-3xl px-4 pt-3 pb-8 max-h-[88vh] overflow-y-auto"
        style={{ background: "#FFFBF2", fontFamily: "'BinggraeTaom', sans-serif" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full mx-auto mb-3" style={{ background: "#D8C4A0" }} />
        <p className="text-[16px] font-bold text-charcoal mb-1">✦ 방의 기운 자세히</p>

        {result.total === 0 ? (
          <p className="text-[13px] text-charcoal/55 py-6 text-center leading-relaxed">
            아직 방에 놓인 아이템이 없어요.<br />소품과 캐릭터를 배치하면 기운이 채워져요.
          </p>
        ) : (
          <>
            {/* 레이더 */}
            <div className="flex justify-center py-2">
              <ElementRadar percent={result.percent} size={210} />
            </div>

            {/* 대표/부족 요약 */}
            <div className="flex justify-center gap-2 mb-3">
              {result.dominant && (
                <span className="flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${ELEMENT_COLORS[result.dominant]}22`, color: "#5C4A3A" }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[result.dominant] }} />
                  대표 {ELEMENT_LABEL[result.dominant]}
                </span>
              )}
              {result.lacking && result.dominant !== result.lacking && (
                <span className="flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full" style={{ background: "#F1ECE2", color: "#9A8C70" }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[result.lacking] }} />
                  부족 {ELEMENT_LABEL[result.lacking]}
                </span>
              )}
            </div>

            {/* 사주 해석 + CTA */}
            {reading && (
              <div className="rounded-2xl px-3.5 py-3 mb-4" style={{ background: "#FFF7E8", border: "1px solid #F0E2C4" }}>
                <p className="text-[12.5px] leading-relaxed text-charcoal/85">{reading.message}</p>
                <button
                  className="mt-2.5 w-full py-2 rounded-xl text-[12px] font-bold active:opacity-80 transition-opacity flex items-center justify-center gap-1.5"
                  style={{ background: `${ELEMENT_COLORS[reading.recommend]}22`, color: "#5C4A3A" }}
                  onClick={() => { onClose(); router.push("/v3/interior/inventory/props") }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[reading.recommend] }} />
                  {ELEMENT_LABEL[reading.recommend]} 기운 소품 더하기 →
                </button>
              </div>
            )}

            {/* 아이템별 기여 내역 */}
            <p className="text-[13px] font-bold text-charcoal mb-2">아이템별 기여 ({breakdown.length})</p>
            <div className="flex flex-col gap-1.5">
              {breakdown.map(item => (
                <div key={item.id} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "white", border: "1px solid #EFE6D6" }}>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0" style={{ background: "#F1ECE2", color: "#9A8C70" }}>
                    {KIND_LABEL[item.kind]}
                  </span>
                  <span className="flex-1 min-w-0 truncate text-[13px] text-charcoal">{item.label}</span>
                  <ElementTag el={item.element} />
                  <span className="text-[11px] font-bold tabular-nums shrink-0" style={{ color: "#A0896C" }}>+{item.weight}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
