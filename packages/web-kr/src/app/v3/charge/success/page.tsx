"use client"
import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { charge } from "@/lib/balance"
import { myeongtaeForKrw } from "@/lib/payments/plans"
import { DoodleMyeongtae, DoodleMyeongtaePink } from "@/components/doodle-myeongtae"

// 새로고침/뒤로가기로 인한 중복 적립 방지(이미 처리한 orderId 기록).
const PROCESSED_KEY = "saju-charge-processed"
function readProcessed(): string[] {
  try { return JSON.parse(localStorage.getItem(PROCESSED_KEY) || "[]") as string[] } catch { return [] }
}

type State = "loading" | "ok" | "fail"

function SuccessInner() {
  const sp = useSearchParams()
  const [state, setState] = useState<State>("loading")
  const [mt, setMt] = useState(0)
  const [msg, setMsg] = useState("")
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const paymentKey = sp.get("paymentKey")
    const orderId = sp.get("orderId")
    const amount = Number(sp.get("amount"))
    if (!paymentKey || !orderId || !Number.isFinite(amount)) {
      setState("fail"); setMsg("잘못된 접근이에요."); return
    }

    const processed = readProcessed()
    if (processed.includes(orderId)) {
      // 이미 적립 완료된 주문 — 재승인·재적립 없이 결과만 표시
      setMt(myeongtaeForKrw(amount)); setState("ok"); return
    }

    ;(async () => {
      try {
        const r = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentKey, orderId, amount }),
        })
        const d = await r.json() as { ok: boolean; amount?: number; error?: string }
        if (!d.ok) { setState("fail"); setMsg(d.error || "결제 승인에 실패했어요."); return }

        const credited = myeongtaeForKrw(d.amount ?? amount)
        if (credited > 0) charge(credited, "명태 충전")
        try { localStorage.setItem(PROCESSED_KEY, JSON.stringify([...processed, orderId].slice(-50))) } catch {}
        setMt(credited); setState("ok")
      } catch {
        setState("fail"); setMsg("네트워크 오류로 승인을 못 했어요.")
      }
    })()
  }, [sp])

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <DoodleMyeongtae className="w-10 h-[60px] animate-pulse" />
        <p className="text-[13px] text-text-muted">결제를 확인하고 있어요…</p>
      </div>
    )
  }

  if (state === "fail") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <p className="text-[22px] text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
          충전을 완료하지 못했어요
        </p>
        <p className="text-[13px] text-text-muted leading-snug">{msg}</p>
        <Link href="/v3/charge" className="mt-2 px-6 py-2.5 rounded-xl bg-charcoal text-cream text-[13px] font-bold active:scale-[0.98]">
          충전으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="flex gap-1">
        <DoodleMyeongtaePink className="w-9 h-[54px]" />
        <DoodleMyeongtae className="w-9 h-[54px]" />
      </div>
      <p className="text-[24px] text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
        <span className="highlight-pink">{mt}명태</span> 충전 완료!
      </p>
      <p className="text-[13px] text-text-muted leading-snug">명태 지갑에 바로 담아뒀어요.</p>
      <Link href="/v3/charge" className="mt-2 px-6 py-2.5 rounded-xl bg-charcoal text-cream text-[13px] font-bold active:scale-[0.98]">
        지갑 확인하기
      </Link>
    </div>
  )
}

export default function ChargeSuccessPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-[13px] text-text-muted">불러오는 중…</div>}>
      <SuccessInner />
    </Suspense>
  )
}
