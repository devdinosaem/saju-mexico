"use client"
import { DoodleWood, DoodleFlameFive, DoodleEarth, DoodleMetal, DoodleWater } from "@/components/doodles"

type Elem = "목" | "화" | "토" | "금" | "수"

const ELEM_BG: Record<Elem, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE",
}

const STICKER: Record<Elem, React.ReactNode> = {
  목: <DoodleWood className="w-7 h-7" />,
  화: <DoodleFlameFive className="w-7 h-7" />,
  토: <DoodleEarth className="w-7 h-7" />,
  금: <DoodleMetal className="w-7 h-7" />,
  수: <DoodleWater className="w-7 h-7" />,
}

const RING_ACTIVE = "linear-gradient(135deg, #E84B6A 0%, #FBBF24 100%)"
const RING_INACTIVE = "#E5E7EB"

const ME = { name: "나", elem: "금" as Elem }

const FRIENDS: { name: string; elem: Elem; today: boolean }[] = [
  { name: "지수",   elem: "목", today: true  },
  { name: "민준",   elem: "화", today: true  },
  { name: "하은",   elem: "수", today: false },
  { name: "준호",   elem: "토", today: false },
  { name: "아름",   elem: "금", today: false },
]

function StoryCircle({
  name, elem, ring, bold,
}: { name: string; elem: Elem; ring: string; bold?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0">
      <div className="p-[2.5px] rounded-full" style={{ background: ring }}>
        <div
          className="w-[54px] h-[54px] rounded-full flex items-center justify-center"
          style={{ background: ELEM_BG[elem] }}
        >
          {STICKER[elem]}
        </div>
      </div>
      <p className={`text-[10px] ${bold ? "font-bold text-charcoal" : "text-text-muted"}`}>{name}</p>
    </div>
  )
}

export default function StoryRow() {
  return (
    <div
      className="flex gap-4 overflow-x-auto"
      style={{ scrollbarWidth: "none", paddingBottom: 2 }}
    >
      <StoryCircle name={ME.name} elem={ME.elem} ring={RING_ACTIVE} bold />
      {FRIENDS.map(f => (
        <StoryCircle
          key={f.name}
          name={f.name}
          elem={f.elem}
          ring={f.today ? RING_ACTIVE : RING_INACTIVE}
        />
      ))}
    </div>
  )
}
