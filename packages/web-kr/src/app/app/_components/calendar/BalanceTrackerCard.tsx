// 오행 밸런스 트래커 — 게이지 + 입력 CTA
// 화(火) 과잉 상태 데모

const ELEMENTS = [
  { emoji: "🌳", label: "목(木)", color: "bg-neon-green",  pct: 20 },
  { emoji: "🔥", label: "화(火)", color: "bg-pop-orange",  pct: 65 },
  { emoji: "⛰️", label: "토(土)", color: "bg-mustard",      pct: 20 },
  { emoji: "💎", label: "금(金)", color: "bg-lavender",     pct: 5  },
  { emoji: "💧", label: "수(水)", color: "bg-blue-300",     pct: 10 },
] as const

export default function BalanceTrackerCard() {
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <p className="font-bold text-charcoal text-sm">⚖️ 오늘 오행 밸런스</p>
        <span className="text-xs font-semibold text-pop-orange">화(火) 과잉!</span>
      </div>

      {/* 게이지 */}
      <div className="space-y-2">
        {ELEMENTS.map(el => (
          <div key={el.label} className="flex items-center gap-2">
            <span className="text-base w-5 text-center leading-none">{el.emoji}</span>
            <div className="flex-1 h-2 bg-charcoal/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${el.color}`}
                style={{ width: `${el.pct}%` }}
              />
            </div>
            <span
              className={`text-xs w-8 text-right font-medium tabular-nums ${
                el.pct >= 50 ? "text-pop-orange font-bold" : "text-text-muted"
              }`}
            >
              {el.pct}%
            </span>
          </div>
        ))}
      </div>

      {/* 입력 CTA */}
      <button className="mt-3.5 w-full py-2.5 rounded-xl border border-charcoal/15 text-sm text-charcoal font-medium flex items-center justify-center gap-1.5">
        오늘 뭐 먹었어? 입력하기 →
      </button>
    </div>
  )
}
