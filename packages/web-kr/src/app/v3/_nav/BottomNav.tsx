"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

// 유니코드 글리프는 문자마다 em 크기·베이스라인이 달라 같은 font-size여도 실제 크기가 제각각.
// → 고정 컨테이너(w-7 h-7) 안에서 글리프별 fs(시각 크기 보정) + dy(세로 정렬 보정)로 맞춤.
const TABS = [
  { href: "/v3/shop",     label: "사주상품", icon: "✦", fs: 20, dy: 0    },
  { href: "/v3/consult",  label: "상담",    icon: "✧", fs: 20, dy: 0    },
  { href: "/v3/interior", label: "운테리어", icon: "⌂", fs: 24, dy: 0.5  },
  { href: "/v3/my",       label: "마이",    icon: "☺", fs: 23, dy: -0.5 },
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
              <div className="w-7 h-7 flex items-center justify-center overflow-hidden">
                <span
                  className={`transition-colors ${active ? "text-pink" : "text-text-muted"}`}
                  style={{ fontSize: tab.fs, lineHeight: 1, transform: `translateY(${tab.dy}px)` }}
                >
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
