"use client"
/** 시안 3 — 슬림 스트립 + 오행 두들·숫자 칩 일렬. 탭 → 전용 페이지. */
import { useRouter } from "next/navigation"
import {
  DoodleBox, DoodleTaegeuk, DoodleWood, DoodleFlameFive, DoodleEarth, DoodleMetal, DoodleWater,
} from "@/components/doodles"
import { useMyRoom } from "@/hooks/useMyRoom"
import { calcRoomElements, ELEMENTS, ELEMENT_COLORS, ELEMENT_PILL } from "@/lib/room-element"

type DoodleC = React.FC<{ className?: string }>
type ElemKr = (typeof ELEMENTS)[number]
const ELEM_DOODLE: Record<ElemKr, DoodleC> = {
  목: DoodleWood, 화: DoodleFlameFive, 토: DoodleEarth, 금: DoodleMetal, 수: DoodleWater,
}

export default function RoomElementChips() {
  const router = useRouter()
  const { percent, total } = calcRoomElements(useMyRoom())

  if (total === 0) {
    return (
      <div className="rounded-2xl px-4 py-3 flex items-center gap-2" style={{ border: "1.5px dashed #D8C4A0", background: "#FFFBF2" }}>
        <DoodleBox className="w-4 h-4"><DoodleTaegeuk /></DoodleBox>
        <p className="text-[12px] text-charcoal/45">소품을 놓으면 방의 기운이 차요.</p>
      </div>
    )
  }

  return (
    <div
      onClick={() => router.push("/v3/interior/energy")}
      className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3 cursor-pointer active:opacity-90 transition-opacity flex flex-col gap-2.5"
    >
      <div className="flex items-center gap-1.5">
        <DoodleBox className="w-4 h-4"><DoodleTaegeuk /></DoodleBox>
        <span className="text-[13px] font-bold text-charcoal">이 방의 기운</span>
        <span className="ml-auto text-charcoal/30 text-[15px] leading-none">›</span>
      </div>
      <div className="flex items-center justify-between gap-1.5">
        {ELEMENTS.map(e => {
          const D = ELEM_DOODLE[e]
          return (
            <div key={e} className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: `${ELEMENT_COLORS[e]}1F` }}>
              <span className="w-4 h-4 inline-flex shrink-0"><D className="w-full h-full" /></span>
              <span className="text-[12px] font-bold tabular-nums" style={{ color: ELEMENT_PILL[e].text }}>{percent[e]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
