import AdBanner from "@/components/AdBanner"
import TodaySaju from "./_components/TodaySaju"
import AttendanceStreak from "./_components/AttendanceStreak"

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

      {/* 광고 배너 */}
      <div className="rounded-xl overflow-hidden">
        <AdBanner slot="3333333333" format="horizontal" />
      </div>
    </div>
  )
}
