"use client"
/** 시안 2 — 컴팩트 미니카드. 5행 바만(해석·CTA 없음). 탭 → 전용 페이지. */
import { useRouter } from "next/navigation"
import { DoodleBox, DoodleTaegeuk } from "@/components/doodles"
import { useMyRoom } from "@/hooks/useMyRoom"
import { calcRoomElements, ELEMENTS, ELEMENT_COLORS, ELEMENT_LABEL, ELEMENT_PILL } from "@/lib/room-element"
import ElementPill from "./ElementPill"

export default function RoomElementMini() {
  const router = useRouter()
  const { percent, dominant, total } = calcRoomElements(useMyRoom())

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
      className="rounded-2xl bg-white border border-charcoal/10 p-4 cursor-pointer active:opacity-90 transition-opacity flex flex-col gap-3"
    >
      <div className="flex items-center gap-1.5">
        <DoodleBox className="w-5 h-5"><DoodleTaegeuk /></DoodleBox>
        <span className="text-[13px] font-bold text-charcoal">이 방의 기운</span>
        {dominant && (
          <span className="ml-auto flex items-center gap-1 text-[11px] font-bold" style={{ color: ELEMENT_PILL[dominant].text }}>
            <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[dominant] }} />
            {ELEMENT_LABEL[dominant]} 기운
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        {ELEMENTS.map(e => (
          <div key={e} className="flex items-center gap-2.5">
            <ElementPill elem={e} />
            <div className="flex-1 h-2 rounded-full bg-charcoal/5 overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${percent[e]}%`, backgroundColor: ELEMENT_COLORS[e] }} />
            </div>
            <span className="text-[11px] font-bold text-charcoal/55 w-8 text-right tabular-nums">{percent[e]}%</span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-charcoal/40 text-center">자세히 보기 ›</p>
    </div>
  )
}
