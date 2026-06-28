"use client"
/**
 * 시안 B — 미니 레이더 + 평가(좌우 배치).
 * 왼쪽 컴팩트 오각 레이더(5행 한눈에), 오른쪽 대표/부족 기운 + 평가 + 추천.
 * 비교용 시안 — 제거 시 이 파일 + interior/page.tsx 마운트만 지우면 됨.
 */
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DoodleBox, DoodleTaegeuk } from "@/components/doodles"
import { useRoomElementSummary } from "@/hooks/useRoomElementSummary"
import { ELEMENTS, ELEMENT_COLORS, ELEMENT_LABEL, ELEMENT_PILL } from "@/lib/room-element"
import RoomElementSheet from "./RoomElementSheet"

function MiniRadar({ percent }: { percent: Record<string, number> }) {
  const SZ = 132, c = SZ / 2, R = 40, n = ELEMENTS.length
  const max = Math.max(1, ...ELEMENTS.map(e => percent[e]))
  const pt = (i: number, r: number): [number, number] => {
    const a = (-90 + i * 72) * Math.PI / 180
    return [c + r * Math.cos(a), c + r * Math.sin(a)]
  }
  const poly = (f: (i: number) => number) => ELEMENTS.map((_, i) => pt(i, f(i)).join(",")).join(" ")
  return (
    <svg viewBox={`0 0 ${SZ} ${SZ}`} style={{ width: 132, height: 132 }} className="shrink-0">
      {[0.5, 1].map((f, i) => <polygon key={i} points={poly(() => R * f)} fill="none" stroke="#EDE4D4" strokeWidth={1} />)}
      {ELEMENTS.map((_, i) => { const [x, y] = pt(i, R); return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#EDE4D4" strokeWidth={1} /> })}
      <polygon points={poly(i => R * (percent[ELEMENTS[i]] / max))} fill="#F8B73E33" stroke="#E89A2C" strokeWidth={1.5} strokeLinejoin="round" />
      {ELEMENTS.map((e, i) => {
        const [dx, dy] = pt(i, R * (percent[e] / max))
        const [lx, ly] = pt(i, R + 9)
        return (
          <g key={e}>
            <circle cx={dx} cy={dy} r={2.5} fill={ELEMENT_COLORS[e]} stroke="white" strokeWidth={0.8} />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={9} fontWeight={700} fill="#7A6A55">{ELEMENT_LABEL[e]}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function RoomElementCardB() {
  const router = useRouter()
  const { room, result, saju, reading } = useRoomElementSummary()
  const { percent, total, dominant, lacking } = result
  const [sheet, setSheet] = useState(false)

  return (
    <>
      <div
        className="rounded-2xl bg-white border border-charcoal/10 p-4 cursor-pointer active:opacity-90 transition-opacity"
        onClick={() => total > 0 && setSheet(true)}
      >
        <div className="flex items-center gap-2 mb-1">
          <DoodleBox className="w-[18px] h-[18px]"><DoodleTaegeuk /></DoodleBox>
          <p className="text-sm font-bold text-charcoal">이 방의 기운</p>
        </div>

        {total === 0 ? (
          <p className="text-[12px] text-text-muted leading-relaxed mt-1">
            아직 방에 놓인 아이템이 없어요. 소품을 배치하면 기운이 채워져요.
          </p>
        ) : (
          <div className="flex items-center gap-1">
            <MiniRadar percent={percent} />
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              {dominant && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full self-start" style={{ background: ELEMENT_PILL[dominant].bg, border: `1.5px solid ${ELEMENT_PILL[dominant].border}`, color: ELEMENT_PILL[dominant].text }}>
                  대표 {ELEMENT_LABEL[dominant]} {percent[dominant]}%
                </span>
              )}
              {lacking && lacking !== dominant && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full self-start" style={{ background: "#F1ECE2", color: "#9A8C70" }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[lacking] }} />
                  부족 {ELEMENT_LABEL[lacking]}
                </span>
              )}
              {reading && (
                <>
                  <p className="text-[12px] text-text-muted leading-snug line-clamp-2">{reading.message}</p>
                  <button
                    className="mt-0.5 py-1.5 px-2.5 rounded-lg text-[11.5px] font-bold self-start active:opacity-80"
                    style={{ background: ELEMENT_PILL[reading.recommend].bg, border: `1.5px solid ${ELEMENT_PILL[reading.recommend].border}`, color: ELEMENT_PILL[reading.recommend].text }}
                    onClick={e => { e.stopPropagation(); router.push("/v3/interior/inventory/props") }}
                  >
                    {ELEMENT_LABEL[reading.recommend]} 더하기 →
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {sheet && <RoomElementSheet room={room} saju={saju} onClose={() => setSheet(false)} />}
    </>
  )
}
