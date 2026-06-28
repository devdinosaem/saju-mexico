"use client"
import Link from "next/link"
import {
  useSubscription, isSubscribed, cancelSubscription,
  activateSubscription, addOneMonth,
} from "@/lib/subscription"
import { SUBSCRIPTION_MONTHLY_WON, subscriptionLabel } from "@/lib/prices"
import { DoodleCrown, DoodleSparkle } from "@/components/doodles"

// 테스트모드에서만 "결제 없이 구독 시작" 허용 — 빌링 연동(P2·P3) 전 상태/혜택 흐름 검증용.
const DEV = process.env.NEXT_PUBLIC_SAMPLE_FRIENDS === "1"

const BENEFITS = [
  { t: "매월 다음달운 무료", d: "다음달 운세 미리보기를 매달 1회 무료로" },
  { t: "컬러 스킨 해금", d: "구독 중 프리미엄 미니홈피 스킨 사용" },
  { t: "프리미엄 캘린더", d: "길일·택일·시간대별 운·중요일 알림" },
]

function fmtDate(ms: number): string {
  const d = new Date(ms)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`
}

export default function SubscriptionPage() {
  const sub = useSubscription()
  const active = isSubscribed(sub)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/v3/my" className="text-text-muted text-[13px] active:opacity-60">← 돌아가기</Link>
      </div>

      {/* 헤더 */}
      <div className="rounded-2xl bg-charcoal text-cream p-5 flex flex-col gap-2">
        <DoodleCrown className="w-9 h-9" />
        <p className="text-[22px]" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>명태 구독</p>
        <p className="text-[13px] text-cream/70">
          {subscriptionLabel()} · 매월 ₩{SUBSCRIPTION_MONTHLY_WON.toLocaleString()} 자동결제
        </p>
      </div>

      {/* 혜택 */}
      <div className="rounded-2xl bg-white border-2 border-charcoal overflow-hidden divide-y divide-charcoal/8">
        {BENEFITS.map(b => (
          <div key={b.t} className="flex items-start gap-3 px-4 py-3">
            <DoodleSparkle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] font-bold text-charcoal">{b.t}</p>
              <p className="text-[11px] text-text-muted mt-0.5">{b.d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 상태 / CTA */}
      {active ? (
        <div className="rounded-2xl bg-white border-2 border-charcoal p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-charcoal">
              {sub.status === "canceled" ? "해지 예약됨" : "구독 중"}
            </span>
            <span className="text-[11px] text-text-muted">
              {sub.status === "canceled"
                ? `${fmtDate(sub.currentPeriodEnd)} 종료`
                : `다음 결제 ${fmtDate(sub.currentPeriodEnd)}`}
            </span>
          </div>
          {sub.status === "active" && (
            <button
              onClick={() => { if (confirm("구독을 해지할까요? 다음 결제일까지는 계속 이용할 수 있어요.")) cancelSubscription() }}
              className="w-full py-2.5 rounded-xl bg-charcoal/5 text-charcoal text-[13px] font-bold active:opacity-70"
            >
              구독 해지
            </button>
          )}
          <p className="text-[11px] text-text-muted leading-snug">
            해지해도 다음 결제일까지 혜택이 유지돼요. 결제 후 7일 이내 + 혜택 미사용 시 전액 환불 가능합니다.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              if (DEV) { activateSubscription("test_billing_key", addOneMonth()); return }
              alert("결제 연동은 다음 단계(P2·P3)에서 붙어요. 지금은 정책·상태 모델까지 준비됐어요.")
            }}
            className="w-full py-3 rounded-xl bg-pink text-cream text-[14px] font-black active:scale-[0.98]"
          >
            구독 시작하기
          </button>
          <p className="text-[11px] text-text-muted text-center leading-snug">
            매월 ₩{SUBSCRIPTION_MONTHLY_WON.toLocaleString()} 자동결제 · 언제든 1탭 해지
          </p>
        </div>
      )}
    </div>
  )
}
