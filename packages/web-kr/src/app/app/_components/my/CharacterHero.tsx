// 내 캐릭터 히어로 + 말풍선
// 말풍선 멘트는 시간대별 + 일주 성격(경진: 직설적) 반영

// 서버 컴포넌트 — 시간은 서버 기준 (skeleton 단계에서는 무관)
function getQuote(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "기회는 기다리는 게 아니야. 만드는 거지. 오늘도 GO!"
  if (hour < 18) return "지금 집중력 최고점이야. 중요한 거 지금 해."
  return "오늘도 부숨. 잘했어."
}

export default function CharacterHero() {
  const quote = getQuote()

  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
      <div className="bg-lavender/10 pt-8 pb-5 flex flex-col items-center gap-4">
        {/* 일주 라벨 */}
        <p className="text-xs font-semibold text-text-muted tracking-widest">
          경진(庚辰) · 직진 본능
        </p>

        {/* 캐릭터 플레이스홀더 — 실제 SVG 캐릭터로 교체 예정 */}
        <div className="w-32 h-32 rounded-full bg-lavender/20 border-2 border-charcoal/10 flex items-center justify-center text-6xl">
          💎
        </div>

        {/* 말풍선 */}
        <div className="mx-5 px-4 py-3 bg-white rounded-2xl border border-charcoal/10 shadow-sm text-sm text-charcoal font-medium text-center leading-snug">
          💬 &ldquo;{quote}&rdquo;
        </div>
      </div>
    </div>
  )
}
