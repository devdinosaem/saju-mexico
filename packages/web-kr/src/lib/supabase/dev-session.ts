"use client"
import { createClient, isSupabaseConfigured } from "./client"

// "데이터부터(테스트 유저)" 전략용 — 카카오 OAuth 전까지 임시.
// .env.local에 NEXT_PUBLIC_DEV_LOGIN_EMAIL/PASSWORD가 있으면, 세션이 없을 때 자동 로그인한다.
// 운영 배포엔 이 env를 넣지 말 것(없으면 no-op).
const EMAIL = process.env.NEXT_PUBLIC_DEV_LOGIN_EMAIL
const PASSWORD = process.env.NEXT_PUBLIC_DEV_LOGIN_PASSWORD

/** 개발 테스트 세션 보장. env 없거나 이미 세션이면 아무것도 안 함. 중복 호출 안전. */
let pending: Promise<void> | null = null
export function ensureDevSession(): Promise<void> {
  if (!isSupabaseConfigured || !EMAIL || !PASSWORD) return Promise.resolve()
  if (pending) return pending
  pending = (async () => {
    const sb = createClient()
    const { data } = await sb.auth.getSession()
    if (!data.session) {
      await sb.auth.signInWithPassword({ email: EMAIL, password: PASSWORD })
    }
  })()
  return pending
}

/** 백엔드(소셜 실연동) 사용 여부 — Supabase 설정 + 개발 로그인 env가 있을 때만. */
export const SOCIAL_BACKEND_ENABLED = isSupabaseConfigured && !!EMAIL && !!PASSWORD
