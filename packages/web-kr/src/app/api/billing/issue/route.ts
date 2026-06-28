import { NextRequest } from "next/server"

// 빌링키 발급(서버 전용) — 카드 등록(requestBillingAuth) 성공 후 받은 authKey를
// billingKey로 교환한다. billingKey는 이후 정기청구의 토대(라이브에선 서버에만 보관).
export async function POST(req: NextRequest) {
  const secret = process.env.TOSS_SECRET_KEY
  if (!secret) return Response.json({ ok: false, error: "no_secret_key" }, { status: 500 })

  let body: { authKey?: string; customerKey?: string }
  try { body = await req.json() } catch { return Response.json({ ok: false, error: "bad_json" }, { status: 400 }) }
  const { authKey, customerKey } = body
  if (!authKey || !customerKey) return Response.json({ ok: false, error: "bad_request" }, { status: 400 })

  const res = await fetch("https://api.tosspayments.com/v1/billing/authorizations/issue", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${secret}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authKey, customerKey }),
  })
  const data = await res.json() as { billingKey?: string; message?: string; code?: string }
  if (!res.ok || !data.billingKey) {
    return Response.json({ ok: false, error: data?.message ?? "issue_failed", code: data?.code }, { status: res.ok ? 502 : res.status })
  }
  return Response.json({ ok: true, billingKey: data.billingKey })
}
