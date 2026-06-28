import MiniCalendar        from "../_components/calendar/MiniCalendar"
import TodayEnergyCard     from "../_components/calendar/TodayEnergyCard"
import BalanceTrackerCard  from "../_components/calendar/BalanceTrackerCard"

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-3 py-3">
      {/* 이번 달 에너지 예보 */}
      <p className="text-sm text-text-sub font-medium">
        6월은 <strong className="text-charcoal">금(金)의 달</strong>. 결단해!
      </p>

      {/* 월운 달력 */}
      <MiniCalendar />

      {/* 오늘 카드 */}
      <TodayEnergyCard />

      {/* 오행 트래커 */}
      <BalanceTrackerCard />

      {/* 광고 배너 placeholder */}
      <div className="rounded-xl bg-charcoal/5 border border-charcoal/10 h-14 flex items-center justify-center">
        <span className="text-xs text-text-muted">광고</span>
      </div>
    </div>
  )
}
