"use client"
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react"
import { getMockUser, MOCK_AUTH_EVENT, type MockUser } from "./mockAuth"
import { ILJU_TYPES, type IljuType } from "./ilju-types"
import { createClient, isSupabaseConfigured } from "./supabase/client"

// 디폴트 프로필 이미지 — 일주 등록 전 표시
export const DEFAULT_PROFILE_IMG = "/images/ilju-default-character.svg"

type UserContextValue = {
  user: MockUser
  ilju: IljuType | null
  isLoggedIn: boolean
  hasIlju: boolean
}

const DEFAULT_USER: MockUser = { loggedIn: false, provider: null, birthDate: null, iljuId: null }

const UserContext = createContext<UserContextValue>({
  user: DEFAULT_USER,
  ilju: null,
  isLoggedIn: false,
  hasIlju: false,
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  // 사주/일주 출처: 아직 mock localStorage (다음 단계에서 profiles로 이전)
  const [mockUser, setMockUser] = useState<MockUser>(DEFAULT_USER)
  // 로그인 여부 출처: Supabase 세션(설정 시) / mock(미설정 시)
  const [sbProvider, setSbProvider] = useState<"kakao" | "naver" | null>(null)
  const [sbLoggedIn, setSbLoggedIn] = useState(false)

  useLayoutEffect(() => {
    setMockUser(getMockUser())
    const handler = () => setMockUser(getMockUser())
    window.addEventListener(MOCK_AUTH_EVENT, handler)
    return () => window.removeEventListener(MOCK_AUTH_EVENT, handler)
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) return
    const supabase = createClient()
    const apply = (session: { user: { app_metadata?: { provider?: string } } } | null) => {
      setSbLoggedIn(!!session)
      setSbProvider((session?.user?.app_metadata?.provider as "kakao" | "naver") ?? (session ? "kakao" : null))
    }
    supabase.auth.getSession().then(({ data }) => apply(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => apply(session))
    return () => sub.subscription.unsubscribe()
  }, [])

  const isLoggedIn = isSupabaseConfigured ? sbLoggedIn : mockUser.loggedIn
  const provider = isSupabaseConfigured ? sbProvider : mockUser.provider

  const user: MockUser = { ...mockUser, loggedIn: isLoggedIn, provider }
  const ilju = user.iljuId ? (ILJU_TYPES.find(t => t.id === user.iljuId) ?? null) : null

  return (
    <UserContext.Provider value={{ user, ilju, isLoggedIn, hasIlju: !!ilju }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
