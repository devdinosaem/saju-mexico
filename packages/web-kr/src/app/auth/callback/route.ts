import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * OAuth(카카오) 콜백 — code를 세션으로 교환 후 next로 리다이렉트.
 * env 미설정 시 그냥 홈으로 보냄.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/v3/shop"

  if (code && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }
  return NextResponse.redirect(`${origin}/v3/shop`)
}
