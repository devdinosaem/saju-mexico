// 월운 달력 — 6월 2026 하드코딩 (데모)
// 도트 색상으로 일진 흐름만 전달, 설명 없음

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"]

// 6월 2026: 1일 = 월요일
const WEEKS = [
  [null, 1,  2,  3,  4,  5,  6 ],
  [7,   8,  9,  10, 11, 12, 13],
  [14,  15, 16, 17, 18, 19, 20],
  [21,  22, 23, 24, 25, 26, 27],
  [28,  29, 30, null, null, null, null],
]

const GOOD_DAYS  = new Set([1, 4, 7, 10, 14, 17, 21])
const BAD_DAYS   = new Set([3, 8, 12, 18, 22])
const TODAY = 23

function DayDot({ day }: { day: number }) {
  if (GOOD_DAYS.has(day))
    return <span className="w-1.5 h-1.5 rounded-full bg-neon-green inline-block" />
  if (BAD_DAYS.has(day))
    return <span className="w-1.5 h-1.5 rounded-full bg-pink inline-block" />
  return <span className="w-1.5 h-1.5 rounded-full bg-mustard/50 inline-block" />
}

export default function MiniCalendar() {
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <button className="text-text-muted text-xl px-1 leading-none">‹</button>
        <span className="font-bold text-charcoal text-sm">2026년 6월</span>
        <button className="text-text-muted text-xl px-1 leading-none">›</button>
      </div>

      {/* 요일 라벨 */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d, i) => (
          <div
            key={d}
            className={`text-center text-[11px] font-semibold ${
              i === 0 ? "text-pink" : i === 6 ? "text-blue-400" : "text-text-muted"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      {WEEKS.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 mb-1">
          {week.map((day, di) => {
            if (day === null) return <div key={`e${wi}-${di}`} />

            const isToday  = day === TODAY
            const isPast   = day < TODAY
            const isFuture = day > TODAY

            return (
              <div key={day} className="flex flex-col items-center py-0.5">
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium ${
                    isToday
                      ? "bg-pink text-white font-bold"
                      : isPast
                      ? "text-charcoal"
                      : "text-text-muted"
                  }`}
                >
                  {isFuture ? <span className="text-[9px]">🔒</span> : day}
                </div>
                {isPast   && <DayDot day={day} />}
                {isToday  && <span className="w-1.5 h-1.5 rounded-full bg-pink inline-block" />}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
