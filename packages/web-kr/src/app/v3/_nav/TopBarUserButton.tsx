"use client"
import { logoutMockUser } from "@/lib/mockAuth"
import { useUser } from "@/lib/UserContext"
import { isSupabaseConfigured } from "@/lib/supabase/client"
import { signOut } from "@/lib/supabase/auth"

export default function TopBarUserButton() {
  const { isLoggedIn, user } = useUser()

  if (!isLoggedIn) return null

  const dotColor = user.provider === "naver" ? "#03C75A" : "#FEE500"

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await signOut()
    } else {
      logoutMockUser()
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 active:opacity-60 transition-opacity"
      style={{ background: "rgba(45,45,45,0.05)" }}
    >
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dotColor }} />
      <span className="text-[11px] font-bold text-charcoal/50">로그아웃</span>
    </button>
  )
}
