"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const TABS = [
  { href: "/v3/shop",     label: "사주상품", icon: "✦", size: "text-xl"     },
  { href: "/v3/consult",  label: "상담",    icon: "✧", size: "text-xl"     },
  { href: "/v3/interior", label: "운테리어", icon: "⌂", size: "text-[26px]" },
  { href: "/v3/my",       label: "마이",    icon: "☺", size: "text-xl"     },
]

export default function BottomNav() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 border-t border-charcoal/10 backdrop-blur-sm">
      <div className="max-w-[480px] mx-auto flex">
        {TABS.map(tab => {
          const active = path.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex flex-col items-center gap-0.5 py-2.5"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <span className={`${tab.size} leading-none transition-colors ${active ? "text-pink" : "text-text-muted"}`}>
                  {tab.icon}
                </span>
              </div>
              <span className={`text-[11px] transition-colors ${active ? "text-pink font-bold" : "text-text-muted font-medium"}`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
