"use client"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

function FailInner() {
  const sp = useSearchParams()
  const message = sp.get("message")
  const code = sp.get("code")
  const userCancelled = code === "USER_CANCEL" || code === "PAY_PROCESS_CANCELED"

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <p className="text-[22px] text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
        {userCancelled ? "구독을 취소했어요" : "카드 등록에 실패했어요"}
      </p>
      <p className="text-[13px] text-text-muted leading-snug">
        {userCancelled ? "필요할 때 다시 시작할 수 있어요." : (message || "잠시 후 다시 시도해 주세요.")}
      </p>
      <Link href="/v3/subscription" className="mt-2 px-6 py-2.5 rounded-xl bg-charcoal text-cream text-[13px] font-bold active:scale-[0.98]">
        구독으로 돌아가기
      </Link>
    </div>
  )
}

export default function SubscriptionFailPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-[13px] text-text-muted">불러오는 중…</div>}>
      <FailInner />
    </Suspense>
  )
}
