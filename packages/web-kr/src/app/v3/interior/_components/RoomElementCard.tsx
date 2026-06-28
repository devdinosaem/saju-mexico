"use client"
/**
 * "방의 기운" 카드 — 미니홈피에 배치한 아이템들의 오행 분포 시각화.
 * 디자인: 운기달력 "내 오행 밸런스"와 통일(흰 카드 · 오행 칩 · 행별 진행바).
 * 카드를 탭하면 상세 시트(레이더 + 아이템별 기여)가 열린다.
 * 기획: docs/plans/interior-element-balance.md
 */
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DoodleSprout, DoodleFire, DoodleEarth, DoodleDiamond, DoodleWave, DoodleTaegeuk } from "@/components/doodles"
import { useMyRoom } from "@/hooks/useMyRoom"
import { useSajuDistribution } from "@/hooks/useSajuDistribution"
import {
  calcRoomElements, interpretRoomVsSaju,
  ELEMENTS, ELEMENT_COLORS, ELEMENT_LABEL, ELEMENT_PILL,
} from "@/lib/room-element"
import type { ElemKr } from "@/lib/day-fortune"
import RoomElementSheet from "./RoomElementSheet"

type DoodleC = React.FC<{ className?: string; style?: React.CSSProperties }>
const ELEM_DOODLE: Record<ElemKr, DoodleC> = {
  목: DoodleSprout, 화: DoodleFire, 토: DoodleEarth, 금: DoodleDiamond, 수: DoodleWave,
}

function ElementPill({ elem }: { elem: ElemKr }) {
  const D = ELEM_DOODLE[elem]
  const p = ELEMENT_PILL[elem]
  return (
    <span
      className="inline-flex items-center justify-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 w-[56px] whitespace-nowrap"
      style={{ background: p.bg, border: `1.5px solid ${p.border}`, color: p.text }}
    >
      <D style={{ width: 13, height: 13 }} />
      {ELEMENT_LABEL[elem]}
    </span>
  )
}

export default function RoomElementCard() {
  const router = useRouter()
  const room = useMyRoom()
  const result = calcRoomElements(room)
  const { percent, total, dominant } = result
  const saju = useSajuDistribution()
  const reading = saju ? interpretRoomVsSaju(result, saju) : null
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="rounded-2xl bg-white border border-charcoal/10 p-4 cursor-pointer active:opacity-90 transition-opacity"
        onClick={() => total > 0 && setOpen(true)}
      >
        {/* 헤더 */}
        <div className="flex items-center gap-2 mb-3">
          <DoodleTaegeuk style={{ width: 20, height: 20 }} />
          <p className="text-sm font-bold text-charcoal">이 방의 기운</p>
          {total > 0 && dominant && (
            <span className="ml-auto flex items-center gap-1 text-[11px] font-bold" style={{ color: ELEMENT_PILL[dominant].text }}>
              <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[dominant] }} />
              {ELEMENT_LABEL[dominant]} 기운
            </span>
          )}
        </div>

        {total === 0 ? (
          <p className="text-[12px] text-text-muted leading-relaxed py-1">
            아직 방에 놓인 아이템이 없어요.<br />
            소품과 캐릭터를 배치하면 방의 기운이 채워져요.
          </p>
        ) : (
          <>
            {/* 오행별 행 */}
            <div className="space-y-2">
              {ELEMENTS.map(e => (
                <div key={e} className="flex items-center gap-2.5">
                  <ElementPill elem={e} />
                  <div className="flex-1 h-2 rounded-full bg-charcoal/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${percent[e]}%`, backgroundColor: ELEMENT_COLORS[e] }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-charcoal/55 w-8 text-right tabular-nums">{percent[e]}%</span>
                </div>
              ))}
            </div>

            {/* 사주 비교 해석 + 보완 추천 */}
            {reading && (
              <>
                <p className="text-[12px] text-text-muted leading-relaxed mt-3">{reading.message}</p>
                <button
                  className="mt-2.5 w-full py-2.5 rounded-xl text-[12.5px] font-bold active:opacity-80 transition-opacity flex items-center justify-center gap-1.5"
                  style={{ background: ELEMENT_PILL[reading.recommend].bg, border: `1.5px solid ${ELEMENT_PILL[reading.recommend].border}`, color: ELEMENT_PILL[reading.recommend].text }}
                  onClick={e => { e.stopPropagation(); router.push("/v3/interior/inventory/props") }}
                >
                  {ELEMENT_LABEL[reading.recommend]} 기운 소품 더하기 →
                </button>
              </>
            )}

            <p className="text-[11px] text-text-muted/70 text-center mt-3">탭하면 자세히 볼 수 있어요</p>
          </>
        )}
      </div>

      {open && <RoomElementSheet room={room} saju={saju} onClose={() => setOpen(false)} />}
    </>
  )
}
