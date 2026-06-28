import { NextRequest } from "next/server"

// 정기청구(서버 전용) — billingKey로 실제 결제를 일으킨다. 첫 청구(구독 시작)와
// 매월 갱신(P5 서버 cron) 모두 이 경로를 쓴다. 금액은 서버에서 강제(클라 신뢰 X).
const SUBSCRIPTION_WON = 1960 // prices.ts SUBSCRIPTION_MONTHLY_WON과 동일 — 서버 권위값

export async function POST(req: NextRequest) {
  const secret = process.env.TOSS_SECRET_KEY
  if (!secret) return Response.json({ ok: false, error: "no_secret_key" }, { status: 500 })

  let body: { billingKey?: string; customerKey?: string; orderId?: string }
  try { body = await req.json() } catch { return Response.json({ ok: false, error: "bad_json" }, { status: 400 }) }
  const { billingKey, customerKey, orderId } = body
  if (!billingKey || !customerKey || !orderId) {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 })
  }

  const res = await fetch(`https://api.tosspayments.com/v1/billing/${billingKey}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${secret}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerKey,
      amount: SUBSCRIPTION_WON,     // ★ 금액 서버 강제
      orderId,
      orderName: "명태 구독 (월)",
    }),
  })
  const data = await res.json() as { totalAmount?: number; approvedAt?: string; message?: string; code?: string }
  if (!res.ok) {
    return Response.json({ ok: false, error: data?.message ?? "charge_failed", code: data?.code }, { status: res.status })
  }
  return Response.json({ ok: true, amount: data.totalAmount ?? SUBSCRIPTION_WON, approvedAt: data.approvedAt })
}
