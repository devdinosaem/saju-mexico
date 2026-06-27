"use client"
import { createClient } from "./client"

/** 카카오 OAuth 로그인 시작 (Supabase Auth). 콜백은 /auth/callback 라우트가 처리. */
export async function signInWithKakao(next = "/v3/shop") {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  })
  if (error) throw error
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
}
