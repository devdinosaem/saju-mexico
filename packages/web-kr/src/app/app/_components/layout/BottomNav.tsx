"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const TABS = [
  { href: "/app/shop",     emoji: "🔮", label: "상품"   },
  { href: "/app/calendar", emoji: "📅", label: "캘린더" },
  { href: "/app/my",       emoji: "🙋", label: "마이"   },
] as const

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-cream border-t border-charcoal/10">
      <div className="max-w-[390px] mx-auto flex h-16">
        {TABS.map(({ href, emoji, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
                active ? "text-pink" : "text-text-muted"
              }`}
            >
              <span className="text-xl leading-tight">{emoji}</span>
              <span className="text-[11px] font-semibold tracking-tight">{label}</span>
              {active && <span className="w-1.5 h-1.5 rounded-full bg-pink mt-0.5" />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
