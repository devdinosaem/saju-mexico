// 오늘 카드 — 크게 강조, 도장 찍기 CTA

export default function TodayEnergyCard() {
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
      {/* 상단 상태 바 */}
      <div className="bg-neon-green/10 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-text-sub font-medium">오늘 6월 23일 · 경진일주</p>
          <p className="font-bold text-charcoal mt-0.5">금(金) ↑↑</p>
        </div>
        <span className="text-2xl">🟢</span>
      </div>

      {/* 본문 */}
      <div className="px-4 py-3.5">
        <p className="text-sm font-semibold text-charcoal">"결단력 최고점인 날"</p>
        <p className="text-xs text-text-muted mt-1">
          럭키컬러: 흰색 ⬜ &nbsp;·&nbsp; 럭키숫자: 4, 9
        </p>
        <button className="mt-3 w-full py-2.5 rounded-xl bg-charcoal text-white text-sm font-bold flex items-center justify-center gap-2">
          🔖 도장 찍고 운세 열기
        </button>
      </div>
    </div>
  )
}
