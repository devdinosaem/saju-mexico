import { createBrowserClient } from "@supabase/ssr"

/**
 * 브라우저(클라이언트 컴포넌트)용 Supabase 클라이언트.
 * env 미설정 시 호출하면 throw → 사용 측에서 isSupabaseConfigured로 가드할 것.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

/** Supabase 환경변수가 설정돼 있는지 (백엔드 전환 점진 적용용 가드) */
export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
