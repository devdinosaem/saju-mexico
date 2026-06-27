"use client"
import { useLayoutEffect, useState } from "react"
import { getMockUser, logoutMockUser, MOCK_AUTH_EVENT, type MockUser } from "@/lib/mockAuth"

export default function TopBarUserButton() {
  const [user, setUser] = useState<MockUser>({ loggedIn: false, provider: null, birthDate: null })

  useLayoutEffect(() => {
    setUser(getMockUser())
    const handler = () => setUser(getMockUser())
    window.addEventListener(MOCK_AUTH_EVENT, handler)
    return () => window.removeEventListener(MOCK_AUTH_EVENT, handler)
  }, [])

  if (!user.loggedIn) return null

  const dotColor = user.provider === "kakao" ? "#FEE500" : "#03C75A"

  return (
    <button
      onClick={logoutMockUser}
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 active:opacity-60 transition-opacity"
      style={{ background: "rgba(45,45,45,0.05)" }}
    >
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dotColor }} />
      <span className="text-[11px] font-bold text-charcoal/50">로그아웃</span>
    </button>
  )
}
