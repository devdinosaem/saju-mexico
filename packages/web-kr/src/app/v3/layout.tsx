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

      {/* Content */}
      <main className="pt-12 pb-20 max-w-[480px] mx-auto px-4 overflow-x-hidden">
        {children}
      </main>

      <BottomNav />
    </div>
    </UserProvider>
  )
}
