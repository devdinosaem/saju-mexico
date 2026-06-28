"use client"
import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { activateSubscription, addOneMonth } from "@/lib/subscription"
import { DoodleCrown, DoodleSparkle } from "@/components/doodles"

// 카드 등록(빌링 인증) 성공 리다이렉트 핸들러.
// customerKey·authKey → billingKey 발급 → 첫 결제 → 구독 활성화. (서버가 금액 강제)
type State = "loading" | "ok" | "fail"

function BillingInner() {
  const sp = useSearchParams()
  const [state, setState] = useState<State>("loading")
  const [msg, setMsg] = useState("")
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const customerKey = sp.get("customerKey")
    const authKey = sp.get("authKey")
    if (!customerKey || !authKey) { setState("fail"); setMsg("잘못된 접근이에요."); return }

    ;(async () => {
      try {
        // 1) authKey → billingKey
        const issueRes = await fetch("/api/billing/issue", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ authKey, customerKey }),
        })
        const issue = await issueRes.json() as { ok: boolean; billingKey?: string; error?: string }
        if (!issue.ok || !issue.billingKey) { setState("fail"); setMsg(issue.error || "카드 등록에 실패했어요."); return }

        // 2) 첫 청구
        const orderId = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
        const chargeRes = await fetch("/api/billing/charge", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ billingKey: issue.billingKey, customerKey, orderId }),
        })
        const charge = await chargeRes.json() as { ok: boolean; error?: string }
        if (!charge.ok) { setState("fail"); setMsg(charge.error || "결제에 실패했어요."); return }

        // 3) 구독 활성화(다음 청구일 = +1개월)
        activateSubscription(issue.billingKey, addOneMonth())
        setState("ok")
      } catch {
        setState("fail"); setMsg("네트워크 오류로 구독을 시작하지 못했어요.")
      }
    })()
  }, [sp])

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <DoodleCrown className="w-10 h-10 animate-pulse" />
        <p className="text-[13px] text-text-muted">구독을 시작하고 있어요…</p>
      </div>
    )
  }

  if (state === "fail") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <p className="text-[22px] text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
          구독을 시작하지 못했어요
        </p>
        <p className="text-[13px] text-text-muted leading-snug">{msg}</p>
        <Link href="/v3/subscription" className="mt-2 px-6 py-2.5 rounded-xl bg-charcoal text-cream text-[13px] font-bold active:scale-[0.98]">
          구독으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <DoodleSparkle className="w-10 h-10" />
      <p className="text-[24px] text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
        <span className="highlight-pink">구독 시작</span> 완료!
      </p>
      <p className="text-[13px] text-text-muted leading-snug">이제 모든 구독 혜택을 누릴 수 있어요.</p>
      <Link href="/v3/subscription" className="mt-2 px-6 py-2.5 rounded-xl bg-charcoal text-cream text-[13px] font-bold active:scale-[0.98]">
        구독 관리로
      </Link>
    </div>
  )
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-[13px] text-text-muted">불러오는 중…</div>}>
      <BillingInner />
    </Suspense>
  )
}
