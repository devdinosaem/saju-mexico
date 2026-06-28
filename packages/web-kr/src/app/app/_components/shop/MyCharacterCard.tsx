// 내 요약 리포트 카드 (1탭 최상단 전폭)
// 데모: 경진(庚辰) 일주 — 금(金)

export default function MyCharacterCard() {
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
      {/* 캐릭터 비주얼 */}
      <div className="bg-pink-light/20 pt-7 pb-4 flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full bg-lavender/20 border-2 border-charcoal/10 flex items-center justify-center text-5xl">
          💎
        </div>
        <div className="text-center">
          <p className="font-display text-3xl text-charcoal leading-tight">직진 본능</p>
          <p className="text-sm text-text-sub mt-1">경진(庚辰) 일주</p>
        </div>
        {/* 강점 태그 */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {["✓ 결단력", "✓ 리더십", "✓ 책임감"].map(s => (
            <span
              key={s}
              className="px-2.5 py-0.5 rounded-full bg-white border border-charcoal/10 text-xs text-charcoal font-medium"
            >
              {s}
            </span>
          ))}
        </div>
        {/* 대사 말풍선 */}
        <div className="mx-6 px-4 py-2.5 bg-white rounded-xl border border-pink/25 text-sm text-charcoal text-center font-medium">
          "벽이 있으면 부숨."
        </div>
      </div>
      {/* 하단 버튼 */}
      <div className="flex gap-2 p-3">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-charcoal text-white text-sm font-semibold">
          📤 공유하기
        </button>
        <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-charcoal/15 text-sm text-charcoal font-medium">
          💾 저장
        </button>
      </div>
    </div>
  )
}
