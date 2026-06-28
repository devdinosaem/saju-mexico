"use client"

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream border-b border-charcoal/10">
      <div className="max-w-[390px] mx-auto h-14 flex items-center justify-between px-4">
        <span className="font-display text-xl text-charcoal tracking-tight">사주TI</span>
        <button className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-white border border-charcoal/15 text-sm text-charcoal">
          <span className="text-base">✨</span>
          <span className="font-bold tabular-nums">3</span>
          <span className="text-text-sub">운기</span>
        </button>
      </div>
    </header>
  )
}
