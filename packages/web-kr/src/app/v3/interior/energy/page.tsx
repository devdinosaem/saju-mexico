"use client"
/**
 * "방의 기운" 전용 상세 페이지 (Tier 2).
 * 세그먼트 요약 + 레이더 + 대표/부족 + 사주 비교 해석/추천 + 아이템별 기여.
 * 기획: docs/plans/interior-element-balance.md
 */
import { useRouter } from "next/navigation"
import { useMyRoom } from "@/hooks/useMyRoom"
import { useSajuDistribution } from "@/hooks/useSajuDistribution"
import {
  calcRoomElements, roomElementBreakdown, interpretRoomVsSaju,
  ELEMENTS, ELEMENT_COLORS, ELEMENT_LABEL,
} from "@/lib/room-element"
import ElementRadar from "../_components/ElementRadar"
import ElementTag from "../_components/ElementTag"

const BINGGRAE = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 } as const
const KIND_LABEL = { sticker: "소품", character: "캐릭터", skin: "스킨" } as const

export default function RoomEnergyPage() {
  const router = useRouter()
  const room = useMyRoom()
  const result = calcRoomElements(room)
  const saju = useSajuDistribution()
  const reading = saju ? interpretRoomVsSaju(result, saju) : null
  const breakdown = roomElementBreakdown(room).sort((a, b) => b.weight - a.weight)
  const { percent, dominant, lacking, total } = result

  return (
    <div className="flex flex-col gap-4" style={BINGGRAE}>
      {/* 뒤로 */}
      <button onClick={() => router.back()} className="flex items-center gap-1 text-[13px] text-charcoal/55 active:opacity-60 w-fit">
        ‹ 뒤로
      </button>

      <div className="flex items-center gap-2">
        <p className="text-[20px] text-charcoal" style={BINGGRAE}>방의 기운</p>
        {total > 0 && dominant && (
          <span className="ml-auto flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${ELEMENT_COLORS[dominant]}22`, color: "#5C4A3A" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[dominant] }} />
            대표 {ELEMENT_LABEL[dominant]}
          </span>
        )}
      </div>

      {total === 0 ? (
        <div className="rounded-2xl px-4 py-10 text-center" style={{ background: "#FFFBF2", border: "1.5px dashed #D8C4A0" }}>
          <p className="text-[13px] text-charcoal/55 leading-relaxed">아직 방에 놓인 아이템이 없어요.<br />소품과 캐릭터를 배치하면 기운이 채워져요.</p>
        </div>
      ) : (
        <>
          {/* 세그먼트 요약 바 */}
          <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2.5">
            <div className="flex h-3 rounded-full overflow-hidden bg-charcoal/5">
              {ELEMENTS.map(e => percent[e] > 0 ? <div key={e} style={{ width: `${percent[e]}%`, background: ELEMENT_COLORS[e] }} /> : null)}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {ELEMENTS.map(e => (
                <span key={e} className="flex items-center gap-1 text-[12px] font-bold text-charcoal/60">
                  <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[e] }} />
                  {ELEMENT_LABEL[e]} {percent[e]}%
                </span>
              ))}
            </div>
          </div>

          {/* 레이더 */}
          <div className="rounded-2xl bg-white border border-charcoal/10 py-3 flex flex-col items-center">
            <ElementRadar percent={percent} size={220} />
            {lacking && dominant !== lacking && (
              <span className="flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full mt-1" style={{ background: "#F1ECE2", color: "#9A8C70" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[lacking] }} />
                부족한 기운 · {ELEMENT_LABEL[lacking]}
              </span>
            )}
          </div>

          {/* 사주 비교 해석 + 추천 */}
          {reading && (
            <div className="rounded-2xl px-4 py-3.5" style={{ background: "#FFF7E8", border: "1px solid #F0E2C4" }}>
              <p className="text-[13px] leading-relaxed text-charcoal/85">{reading.message}</p>
              <button
                className="mt-3 w-full py-2.5 rounded-xl text-[12.5px] font-bold active:opacity-80 transition-opacity flex items-center justify-center gap-1.5"
                style={{ background: `${ELEMENT_COLORS[reading.recommend]}22`, color: "#5C4A3A" }}
                onClick={() => router.push("/v3/interior/inventory/props")}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[reading.recommend] }} />
                {ELEMENT_LABEL[reading.recommend]} 기운 소품 더하기 →
              </button>
            </div>
          )}

          {/* 아이템별 기여 */}
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-bold text-charcoal">아이템별 기여 <span className="text-charcoal/40 text-[12px]">{breakdown.length}</span></p>
            <div className="flex flex-col gap-1.5">
              {breakdown.map(item => (
                <div key={item.id} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "white", border: "1px solid #EFE6D6" }}>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0" style={{ background: "#F1ECE2", color: "#9A8C70" }}>{KIND_LABEL[item.kind]}</span>
                  <span className="flex-1 min-w-0 truncate text-[13px] text-charcoal">{item.label}</span>
                  <ElementTag el={item.element} />
                  <span className="text-[11px] font-bold tabular-nums shrink-0" style={{ color: "#A0896C" }}>+{item.weight}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
