import { DoodleSparkle } from "@/components/doodles"
import AdBanner from "@/components/AdBanner"
import { ElementBadgePill } from "@/components/ilju-type-card"
import TodaySaju from "./_components/TodaySaju"
import AttendanceStreak from "./_components/AttendanceStreak"

const BALANCE = [
  { key: "목", label: "목(木)", pct: 28, bg: "#D1FAE5", border: "#4ADE80", text: "#166534", bar: "#4ADE80" },
  { key: "화", label: "화(火)", pct: 14, bg: "#FEE2E2", border: "#F87171", text: "#991B1B", bar: "#F87171" },
  { key: "토", label: "토(土)", pct: 22, bg: "#FEF3C7", border: "#FBBF24", text: "#92400E", bar: "#FBBF24" },
  { key: "금", label: "금(金)", pct: 26, bg: "#F1F5F9", border: "#94A3B8", text: "#334155", bar: "#94A3B8" },
  { key: "수", label: "수(水)", pct: 10, bg: "#DBEAFE", border: "#60A5FA", text: "#1E3A8A", bar: "#60A5FA" },
]

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* 인삿말 */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-sm font-medium text-text-sub">6월은</span>
        <span className="text-sm font-bold text-charcoal">금(金)의 달</span>
        <span className="text-sm text-text-muted">— 결단하기 딱 좋아 💎</span>
      </div>

      {/* 출석 스트릭 */}
      <AttendanceStreak />

      {/* 오늘의 사주 */}
      <TodaySaju />

      {/* 오행 밸런스 트래커 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <DoodleSparkle style={{ width: 20, height: 20 }} />
          <p className="text-sm font-bold text-charcoal">내 오행 밸런스</p>
          <span className="text-[11px] text-text-muted ml-auto">이달 기준</span>
        </div>
        <div className="space-y-2">
          {BALANCE.map(b => (
            <div key={b.key} className="flex items-center gap-2.5">
              <ElementBadgePill element={b.label} />
              <div className="flex-1 h-2 rounded-full bg-charcoal/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${b.pct}%`, backgroundColor: b.bar }}
                />
              </div>
              <span className="text-[11px] font-bold text-text-sub w-8 text-right">{b.pct}%</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-text-muted mt-3 leading-relaxed">
          💡 금(金) 기운이 강한 달. 수(水)가 부족해 — 물 많이 마시고 직관을 믿어.
        </p>
      </div>

      {/* 광고 배너 */}
      <div className="rounded-xl overflow-hidden">
        <AdBanner slot="3333333333" format="horizontal" />
      </div>
    </div>
  )
}
