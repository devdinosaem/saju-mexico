import TopBar from "./_components/layout/TopBar"
import BottomNav from "./_components/layout/BottomNav"
import type { ReactNode } from "react"

export const metadata = { title: "사주TI" }

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-cream min-h-screen">
      <TopBar />
      <main className="max-w-[390px] mx-auto px-4 pt-14 pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
