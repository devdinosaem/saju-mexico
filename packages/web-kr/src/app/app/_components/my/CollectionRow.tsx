// 내 보관함 — 가로 스크롤 컬렉션

const ITEMS = [
  { icon: "📅", label: "운세",   count: "23", locked: false },
  { icon: "📄", label: "요약",   count: "✅", locked: false },
  { icon: "🔮", label: "상세",   count: "🔒", locked: true  },
  { icon: "💕", label: "궁합",   count: "0",  locked: false },
] as const

export default function CollectionRow() {
  return (
    <div>
      <p className="font-bold text-charcoal text-sm mb-2.5">📁 내 보관함</p>
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {ITEMS.map(item => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border min-w-[72px] shrink-0 transition-opacity ${
              item.locked
                ? "bg-charcoal/5 border-charcoal/10 opacity-50"
                : "bg-white border-charcoal/10"
            }`}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <span className={`text-base font-bold leading-none ${item.locked ? "text-text-muted" : "text-charcoal"}`}>
              {item.count}
            </span>
            <span className="text-[11px] text-text-muted">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
