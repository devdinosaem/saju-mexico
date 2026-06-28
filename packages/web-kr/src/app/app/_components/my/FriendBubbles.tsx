// 지인 목록 — 프로필 버블 + 오늘 궁합 1줄

const FRIENDS = [
  { name: "엄마",  emoji: "🌸", compat: 91, good: true  },
  { name: "남친",  emoji: "⚡", compat: 87, good: true  },
  { name: "친구",  emoji: "🌊", compat: 34, good: false },
] as const

const best = FRIENDS.reduce((a, b) => (a.compat > b.compat ? a : b))

export default function FriendBubbles() {
  return (
    <div>
      <p className="font-bold text-charcoal text-sm mb-2.5">👥 내 지인</p>
      <div className="rounded-2xl bg-white border border-charcoal/10 p-3">
        {/* 버블 목록 */}
        <div className="flex items-end gap-3 mb-3">
          {FRIENDS.map(f => (
            <button key={f.name} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-pink-light/40 border-2 border-charcoal/10 flex items-center justify-center text-xl">
                {f.emoji}
              </div>
              <span className="text-[11px] text-text-sub font-medium">{f.name}</span>
            </button>
          ))}
          {/* 추가 버튼 */}
          <button className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-charcoal/5 border-2 border-dashed border-charcoal/20 flex items-center justify-center text-xl text-text-muted">
              +
            </div>
            <span className="text-[11px] text-text-muted">추가</span>
          </button>
        </div>

        {/* 오늘 best 궁합 한줄 */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-neon-green/10 rounded-xl">
          <span className="text-sm">🟢</span>
          <span className="text-xs text-charcoal font-medium">
            오늘 {best.name}과 궁합 {best.compat}%
          </span>
        </div>
      </div>
    </div>
  )
}
