import { DoodleMoon } from "@/components/doodles"

// 오행별 막대 색 (calendar의 BALANCE와 분리 — 결합 끊기용 자체 상수)
const BAR: Record<string, string> = {
  목: "#4ADE80",
  화: "#F87171",
  토: "#FBBF24",
  금: "#94A3B8",
  수: "#60A5FA",
}

// 월~일 7일 영역(골격만). 높이·오행은 placeholder.
// TODO(주간 재설계): 오늘 강조 + 베스트/워스트 마킹 + saju-engine 실데이터 연동.
const DAYS = [
  { day: "월", height: 40, ohaeng: "목" },
  { day: "화", height: 60, ohaeng: "화" },
  { day: "수", height: 85, ohaeng: "토" },
  { day: "목", height: 70, ohaeng: "금" },
  { day: "금", height: 45, ohaeng: "수" },
  { day: "토", height: 55, ohaeng: "목" },
  { day: "일", height: 35, ohaeng: "화" },
]

export default function WeeklyEnergyFlow() {
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 p-4">
      <div className="flex items-center gap-2 mb-3">
        <DoodleMoon style={{ width: 20, height: 20 }} />
        <p className="text-sm font-bold text-charcoal">이번 주 에너지 흐름</p>
      </div>
      <div className="flex items-end justify-between gap-1 h-20">
        {DAYS.map(d => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-lg"
              style={{ height: `${d.height}%`, backgroundColor: BAR[d.ohaeng] + "66", border: `1px solid ${BAR[d.ohaeng]}` }}
            />
            <span className="text-[10px] text-text-muted">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
