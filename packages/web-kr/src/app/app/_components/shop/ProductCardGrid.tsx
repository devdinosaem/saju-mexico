// 2열 상품 카드 그리드 — 상세 리포트 + 커플 궁합
// 훅은 텍스트가 아니라 비주얼이 담당

export default function ProductCardGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">

      {/* 상세 리포트 카드 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
        {/* 유명인 사진 영역 (placeholder) */}
        <div className="h-28 bg-charcoal/5 flex flex-col items-center justify-center gap-1.5 px-3">
          <div className="flex items-center">
            {["J", "E", "T"].map((initial, i) => (
              <div
                key={initial}
                className="w-9 h-9 rounded-full bg-charcoal/15 border-2 border-white flex items-center justify-center text-xs font-bold text-charcoal"
                style={{ marginLeft: i > 0 ? -8 : 0 }}
              >
                {initial}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-text-muted font-medium">경진일주 동문 3명</span>
        </div>
        <div className="p-3">
          <p className="text-sm font-bold text-charcoal">상세 리포트</p>
          <p className="text-xs text-text-muted mt-0.5">14섹션 · AI 풀 분석</p>
          <button className="mt-2 w-full py-1.5 rounded-lg bg-charcoal text-white text-xs font-semibold">
            🔒 10운기
          </button>
        </div>
      </div>

      {/* 커플 궁합 카드 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
        {/* 궁합 비주얼 영역 */}
        <div className="h-28 bg-pink-light/30 flex flex-col items-center justify-center gap-1.5">
          <span className="text-3xl">💕</span>
          <span className="text-[11px] text-text-sub font-medium">일주 × 일주</span>
        </div>
        <div className="p-3">
          <p className="text-sm font-bold text-charcoal">커플 궁합</p>
          <p className="text-xs text-text-muted mt-0.5">오늘의 조합 분석</p>
          <button className="mt-2 w-full py-1.5 rounded-lg bg-pink-light/60 text-pink text-xs font-semibold border border-pink/20">
            🔒 3운기
          </button>
        </div>
      </div>

    </div>
  )
}
