"use client"
import { useState } from "react"

const DAYS = ["월", "화", "수", "목", "금", "토", "일"]
const CHECKED_MOCK = [true, true, true, true, true, false, false] // 5일 연속

export default function AttendanceStreak() {
  const [checked, setChecked] = useState(CHECKED_MOCK)
  const [todayDone, setTodayDone] = useState(false)

  const streak = checked.filter(Boolean).length

  function checkIn() {
    if (todayDone) return
    const next = [...checked]
    next[5] = true
    setChecked(next)
    setTodayDone(true)
  }

  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <div>
            <p className="text-sm font-bold text-charcoal">{streak}일 연속 출석</p>
            <p className="text-[11px] text-text-muted">매일 체크하면 운기 +10</p>
          </div>
        </div>
        <button
          onClick={checkIn}
          disabled={todayDone}
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
            todayDone
              ? "bg-charcoal/5 text-text-muted border-charcoal/10 cursor-default"
              : "bg-pink/75 text-cream border-charcoal active:opacity-80"
          }`}
        >
          {todayDone ? "✓ 완료" : "오늘 체크인"}
        </button>
      </div>

      <div className="flex gap-1.5">
        {DAYS.map((d, i) => (
          <div key={d} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full aspect-square rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                checked[i]
                  ? "bg-pink/75 text-cream border border-charcoal"
                  : "bg-charcoal/5 text-text-muted"
              }`}
            >
              {checked[i] ? "✓" : ""}
            </div>
            <span className="text-[9px] text-text-muted">{d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
