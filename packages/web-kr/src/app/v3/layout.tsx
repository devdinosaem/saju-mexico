import { SajuTILogo } from "@/components/logo"
import BottomNav from "./_nav/BottomNav"
import TopBarRight from "./_nav/TopBarRight"
import { UserProvider } from "@/lib/UserContext"

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
    <div className="min-h-dvh bg-cream">
      {/* TopBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream">
        <div className="max-w-[480px] mx-auto flex items-center justify-between px-4 h-12">
          <SajuTILogo className="h-7 w-7" />
          <TopBarRight />
        </div>
      </header>

      {/* Content — 패딩 단일 정책: 실효 여백 사방 16px
          (pt-16 = 헤더 48px + 숨 16px / pb-24 = 탭바 80px + 숨 16px / px-4 = 좌우 16px)
          페이지는 px/py/pt/pb를 추가하지 말 것. 세로 간격은 gap으로. */}
      <main className="pt-16 pb-24 max-w-[480px] mx-auto px-4 overflow-x-hidden">
        {children}
      </main>

      <BottomNav />
    </div>
    </UserProvider>
  )
}
