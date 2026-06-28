"use client"
import type { ChargePlan } from "./plans"

// 토스페이먼츠 결제창 호출(클라). 테스트 키는 .env.local의 NEXT_PUBLIC_TOSS_CLIENT_KEY.
// 결제 성공 시 토스가 successUrl로 paymentKey·orderId·amount를 붙여 리다이렉트 → 거기서 서버 승인.
export const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? ""

function genOrderId(): string {
  return `mt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

/** 충전 결제창 열기. 키 미설정 시 안내만 하고 no-op. */
export async function requestTossCharge(plan: ChargePlan): Promise<void> {
  if (!TOSS_CLIENT_KEY) {
    alert(
      "토스 테스트 키가 아직 설정되지 않았어요.\n" +
      ".env.local에 NEXT_PUBLIC_TOSS_CLIENT_KEY / TOSS_SECRET_KEY를 넣어주세요.\n" +
      "(토스페이먼츠 개발자센터 → 테스트 키에서 발급)"
    )
    return
  }
  const { loadTossPayments, ANONYMOUS } = await import("@tosspayments/tosspayments-sdk")
  const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY)
  const payment = tossPayments.payment({ customerKey: ANONYMOUS })
  await payment.requestPayment({
    method: "CARD",
    amount: { currency: "KRW", value: plan.krw },
    orderId: genOrderId(),
    orderName: `${plan.label} ${plan.myeongtae}개`,
    successUrl: `${window.location.origin}/v3/charge/success`,
    failUrl: `${window.location.origin}/v3/charge/fail`,
    card: { useEscrow: false, flowMode: "DEFAULT", useCardPoint: false, useAppCardOnly: false },
  })
}
