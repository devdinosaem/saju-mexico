"use client"
import { useEffect, useState } from "react"
import SectionCard from "./SectionCard"
import { getMockUser, loginMockUser, logoutMockUser, MOCK_AUTH_EVENT, type MockUser } from "@/lib/mockAuth"

export default function AuthSection() {
  const [user, setUser] = useState<MockUser>({ loggedIn: false, provider: null, birthDate: null, iljuId: null })

  useEffect(() => {
    setUser(getMockUser())
    const handler = () => setUser(getMockUser())
    window.addEventListener(MOCK_AUTH_EVENT, handler)
    return () => window.removeEventListener(MOCK_AUTH_EVENT, handler)
  }, [])

  const toggle = () => {
    if (user.loggedIn) {
      logoutMockUser()
    } else {
      loginMockUser("kakao")
    }
  }

  const switchProvider = (p: "kakao" | "naver") => {
    if (!user.loggedIn) return
    loginMockUser(p)
  }

  return (
    <SectionCard title="인증 상태" emoji="🔐">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-bold text-charcoal">
            {user.loggedIn ? "로그인됨" : "비로그인"}
          </p>
          {user.loggedIn && user.provider && (
            <p className="text-[11px] text-text-muted">{user.provider}</p>
          )}
        </div>
        <button
          onClick={toggle}
          className={`px-4 py-1.5 rounded-full text-[12px] font-bold border-2 active:opacity-70 transition-opacity ${
            user.loggedIn
              ? "border-charcoal text-charcoal"
              : "border-charcoal bg-charcoal text-cream"
          }`}
        >
          {user.loggedIn ? "로그아웃" : "로그인"}
        </button>
      </div>

      {user.loggedIn && (
        <div>
          <p className="text-[11px] text-text-muted mb-1.5">로그인 제공자</p>
          <div className="flex gap-2">
            {(["kakao", "naver"] as const).map(p => (
              <button
                key={p}
                onClick={() => switchProvider(p)}
                className={`flex-1 py-2 rounded-xl text-[12px] font-bold border-2 active:opacity-70 transition-opacity ${
                  user.provider === p
                    ? "bg-charcoal text-cream border-charcoal"
                    : "bg-white text-charcoal border-charcoal/30"
                }`}
              >
                {p === "kakao" ? "카카오" : "네이버"}
              </button>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  )
}
