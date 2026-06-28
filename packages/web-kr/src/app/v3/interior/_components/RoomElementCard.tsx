"use client"
/**
 * "방의 기운" 카드 — 미니홈피에 배치한 아이템들의 오행 분포 시각화.
 * Phase 1: 분포 표시만 (사주 비교 해석·추천 CTA 는 Phase 2).
 * 기획: docs/plans/interior-element-balance.md
 */
import { useRouter } from "next/navigation"
import { useMyRoom } from "@/hooks/useMyRoom"
import { useSajuDistribution } from "@/hooks/useSajuDistribution"
import {
  calcRoomElements, interpretRoomVsSaju, ELEMENTS, ELEMENT_COLORS, ELEMENT_LABEL,
} from "@/lib/room-element"

export default function RoomElementCard() {
  const router = useRouter()
  const room = useMyRoom()
  const result = calcRoomElements(room)
  const { percent, total, dominant } = result
  const saju = useSajuDistribution()
  const reading = saju ? interpretRoomVsSaju(result, saju) : null

  return (
    <div
      className="rounded-2xl px-4 py-3.5"
      style={{
        background: "#FFFBF2",
        border: "1.5px dashed #D8C4A0",
        fontFamily: "'BinggraeTaom', sans-serif",
      }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[13px] font-bold text-charcoal">✦ 이 방의 기운</span>
        {total > 0 && dominant && (
          <span className="flex items-center gap-1 text-[11px] font-bold" style={{ color: "#A0896C" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: ELEMENT_COLORS[dominant] }} />
            {ELEMENT_LABEL[dominant]} 기운이 가장 강해요
          </span>
        )}
      </div>

      {total === 0 ? (
        <p className="text-[12px] text-charcoal/50 leading-relaxed py-1.5">
          아직 방에 놓인 아이템이 없어요.<br />
          소품과 캐릭터를 배치하면 방의 기운이 채워져요.
        </p>
      ) : (
        <>
          {/* 스택 바 */}
          <div className="flex w-full h-4 rounded-full overflow-hidden" style={{ background: "#EDE4D4" }}>
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

          {/* 레전드 */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5">
            {ELEMENTS.map(e => (
              <span key={e} className="flex items-center gap-1 text-[11px]">
                <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[e] }} />
                <span className="text-charcoal/70">{ELEMENT_LABEL[e]}</span>
                <span className="font-bold text-charcoal/90">{percent[e]}%</span>
              </span>
            ))}
          </div>

          {/* 사주 비교 해석 + 보완 추천 (사주 정보 있을 때만) */}
          {reading && (
            <div className="mt-3 pt-3" style={{ borderTop: "1px dashed #E0D4C0" }}>
              <p className="text-[12px] leading-relaxed text-charcoal/80">{reading.message}</p>
              <button
                className="mt-2.5 w-full py-2 rounded-xl text-[12px] font-bold active:opacity-80 transition-opacity flex items-center justify-center gap-1.5"
                style={{ background: `${ELEMENT_COLORS[reading.recommend]}22`, color: "#5C4A3A" }}
                onClick={() => router.push("/v3/interior/inventory/props")}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[reading.recommend] }} />
                {ELEMENT_LABEL[reading.recommend]} 기운 소품 더하기 →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
