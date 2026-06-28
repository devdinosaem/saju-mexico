// 오늘 운세 카드 — 1줄 티저 + 열기 CTA

export default function TodayFortuneCard() {
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs text-text-muted font-medium">📅 오늘 운세 · 6월 23일</p>
        <p className="text-base font-bold text-charcoal mt-0.5">"금(金)이 강한 날 ✦"</p>
      </div>
      <button className="flex items-center gap-0.5 text-pink text-sm font-bold shrink-0">
        열기 →
      </button>
    </div>
  )
}
