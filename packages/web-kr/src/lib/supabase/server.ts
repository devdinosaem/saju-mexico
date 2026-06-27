import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * 서버 컴포넌트/라우트 핸들러용 Supabase 클라이언트 (Next 16, async cookies).
 */
export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // 서버 컴포넌트에서 호출되면 set이 막힐 수 있음 → 미들웨어가 세션 갱신을 담당
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {}
        },
      },
    },
  )
}
