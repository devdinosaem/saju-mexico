import { NextRequest } from "next/server"

// 결제 승인(서버 전용) — 결제는 클라에서 끝내면 안 되고, 서버가 토스에 confirm 요청해
// 금액 위변조를 검증한 뒤에야 적립해야 안전하다. TOSS_SECRET_KEY는 서버 전용 env.
export async function POST(req: NextRequest) {
  const secret = process.env.TOSS_SECRET_KEY
  if (!secret) return Response.json({ ok: false, error: "no_secret_key" }, { status: 500 })

  let body: { paymentKey?: string; orderId?: string; amount?: number }
  try { body = await req.json() } catch { return Response.json({ ok: false, error: "bad_json" }, { status: 400 }) }
  const { paymentKey, orderId, amount } = body
  if (!paymentKey || !orderId || typeof amount !== "number") {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 })
  }

  // 토스는 paymentKey에 묶인 실제 결제금액과 amount가 다르면 승인을 거부한다 → 위변조 차단.
  const res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${secret}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  })
  const data = await res.json() as { totalAmount?: number; orderId?: string; message?: string; code?: string }
  if (!res.ok) {
    return Response.json({ ok: false, error: data?.message ?? "confirm_failed", code: data?.code }, { status: res.status })
  }
  return Response.json({ ok: true, amount: data.totalAmount ?? amount, orderId: data.orderId ?? orderId })
}
