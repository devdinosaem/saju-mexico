import { DoodleMoon } from "@/components/doodles"

// 오행별 막대 색 (calendar의 BALANCE와 분리 — 결합 끊기용 자체 상수)
const BAR: Record<string, string> = {
  목: "#4ADE80",
  화: "#F87171",
  토: "#FBBF24",
  금: "#94A3B8",
  수: "#60A5FA",
}

// TODO(주간 재설계): 현재는 calendar에서 옮겨온 월간 5주 목업.
// 지침(CLAUDE.md "주간 에너지 그래프" / APP-UI-PLAN 마이 섹션)대로
// 월~일 7일 + 오늘 강조 + 베스트/워스트 마킹으로 재설계 예정.
const WEEKS = [
  { week: "1주", height: 40, ohaeng: "목" },
  { week: "2주", height: 60, ohaeng: "화" },
  { week: "3주", height: 85, ohaeng: "금" },
  { week: "4주", height: 70, ohaeng: "금" },
  { week: "5주", height: 45, ohaeng: "수" },
]

export default function WeeklyEnergyFlow() {
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 p-4">
      <div className="flex items-center gap-2 mb-3">
        <DoodleMoon style={{ width: 20, height: 20 }} />
        <p className="text-sm font-bold text-charcoal">이번 주 에너지 흐름</p>
      </div>
      <div className="flex items-end justify-between gap-1 h-20">
        {WEEKS.map(w => (
          <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-lg"
              style={{ height: `${w.height}%`, backgroundColor: BAR[w.ohaeng] + "66", border: `1px solid ${BAR[w.ohaeng]}` }}
            />
            <span className="text-[10px] text-text-muted">{w.week}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
