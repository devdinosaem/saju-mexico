"use client"
/** 시안 1 — 슬림 세그먼트 스트립. 방 아래 한 줄. 탭 → 전용 페이지. */
import { useRouter } from "next/navigation"
import { DoodleBox, DoodleTaegeuk } from "@/components/doodles"
import { useMyRoom } from "@/hooks/useMyRoom"
import { calcRoomElements, ELEMENTS, ELEMENT_COLORS, ELEMENT_LABEL, ELEMENT_PILL } from "@/lib/room-element"

export default function RoomElementStrip() {
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
      className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3 cursor-pointer active:opacity-90 transition-opacity flex flex-col gap-2"
    >
      <div className="flex items-center gap-1.5">
        <DoodleBox className="w-4 h-4"><DoodleTaegeuk /></DoodleBox>
        <span className="text-[13px] font-bold text-charcoal">이 방의 기운</span>
        {dominant && (
          <span className="ml-auto flex items-center gap-1 text-[11px] font-bold" style={{ color: ELEMENT_PILL[dominant].text }}>
            <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[dominant] }} />
            {ELEMENT_LABEL[dominant]} 가득
          </span>
        )}
        <span className="text-charcoal/30 text-[15px] leading-none">›</span>
      </div>
      <div className="flex h-2.5 rounded-full overflow-hidden bg-charcoal/5">
        {ELEMENTS.map(e => percent[e] > 0 ? <div key={e} style={{ width: `${percent[e]}%`, background: ELEMENT_COLORS[e] }} /> : null)}
      </div>
    </div>
  )
}
