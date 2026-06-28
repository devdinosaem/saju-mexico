"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { PRICES, priceLabel } from "@/lib/prices"
import { DoodleSparkle, DoodleHeart, DoodleCrown } from "@/components/doodles"
import { DoodleMyeongtae, DoodleMyeongtaePink } from "@/components/doodle-myeongtae"
import { BALANCE_MOCK_KEY } from "@/lib/balance"

const GAEGU: React.CSSProperties = {
  fontFamily: "'Cafe24Dongdong', var(--font-gaegu), cursive",
  letterSpacing: "normal",
}

const PLANS = [
  {
    key: "small",
    label: "작은 명태",
    amount: 1,
    price: "₩980",
    desc: "딱 한 마리",
    highlight: false,
  },
  {
    key: "big",
    label: "큰 명태",
    amount: 10,
    price: "₩9,500",
    desc: "3% 할인",
    highlight: true,
  },
]

const COSTS = [
  { label: "커플 궁합 분석",     cost: priceLabel(PRICES.coupleCompat),       free: PRICES.coupleCompat === 0       },
  { label: "오늘의 사주",        cost: priceLabel(PRICES.todaySaju),          free: PRICES.todaySaju === 0          },
  { label: "월운 캘린더",        cost: priceLabel(PRICES.monthCalendar),      free: PRICES.monthCalendar === 0      },
  { label: "AI 상담 1턴",        cost: priceLabel(PRICES.aiConsultPerTurn),   free: false                           },
  { label: "올해운",              cost: priceLabel(PRICES.yearFortune),        free: false                           },
  { label: "상세 리포트",         cost: priceLabel(PRICES.detailReport),       free: false                           },
  { label: "유명인 카드 뽑기",    cost: priceLabel(PRICES.celebCard),          free: false                           },
]

const HISTORY = [
  { date: "06.23", label: "AI 상담 3턴", delta: -0.6 },
  { date: "06.22", label: "큰명태 충전",  delta: +10  },
  { date: "06.20", label: "유명인 카드 뽑기", delta: -2 },
]

export default function ChargePage() {
  const [balance, setBalance] = useState(5.2)
  useEffect(() => {
    const raw = localStorage.getItem(BALANCE_MOCK_KEY)
    if (raw !== null) setBalance(parseFloat(raw) || 0)
    const handler = () => {
      const r = localStorage.getItem(BALANCE_MOCK_KEY)
      if (r !== null) setBalance(parseFloat(r) || 0)
    }
    window.addEventListener("saju-balance-change", handler)
    return () => window.removeEventListener("saju-balance-change", handler)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {/* 뒤로 */}
      <div className="flex items-center gap-2">
        <Link href="/v3/shop" className="text-text-muted text-[13px] active:opacity-60">← 돌아가기</Link>
      </div>

      {/* 잔액 카드 */}
      <div className="rounded-2xl bg-white border-2 border-charcoal overflow-hidden">
        <div className="bg-charcoal px-4 py-3 flex items-center gap-2">
          <DoodleSparkle className="w-4 h-4" />
          <span className="text-cream text-sm font-bold">명태 지갑</span>
        </div>
        <div className="px-4 py-5 flex items-center gap-4">
          <DoodleMyeongtae className="w-10 h-[60px] shrink-0" />
          <div>
            <p className="text-[11px] text-text-muted">현재 잔액</p>
            <p className="text-[32px] font-black text-charcoal leading-none mt-0.5">
              {balance}
              <span className="text-[16px] font-bold text-text-muted ml-1.5">명태</span>
            </p>
            <p className="text-[11px] text-text-muted mt-1">≈ 원화 {(balance * 980).toLocaleString()}원 상당</p>
          </div>
        </div>
      </div>

      {/* 충전 플랜 */}
      <div>
        <p className="text-[22px] leading-snug text-charcoal mb-3" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
          명태 <span className="highlight-pink">충전하기</span>
        </p>
        <div className="grid grid-cols-2 gap-3">
          {PLANS.map(plan => (
            <button
              key={plan.key}
              className={`rounded-2xl border-2 p-4 flex flex-col items-center gap-2 active:scale-[0.98] transition-transform text-left ${
                plan.highlight
                  ? "bg-pink/8 border-pink"
                  : "bg-white border-charcoal"
              }`}
            >
              {plan.highlight && (
                <div className="self-end -mt-1 -mr-1">
                  <span className="text-[10px] bg-pink text-cream font-bold px-1.5 py-0.5 rounded-full">BEST</span>
                </div>
              )}
              {plan.key === "small"
                ? <DoodleMyeongtae className="w-8 h-12" />
                : <div className="flex gap-1">
                    <DoodleMyeongtaePink className="w-7 h-[42px]" />
                    <DoodleMyeongtae className="w-7 h-[42px]" />
                  </div>
              }
              <div className="text-center">
                <p className="text-[13px] font-bold text-charcoal">{plan.label}</p>
                <p className="text-[11px] text-text-muted mt-0.5">명태 {plan.amount}개</p>
                {plan.desc && (
                  <p className={`text-[10px] mt-0.5 ${plan.highlight ? "text-pink font-bold" : "text-text-muted"}`}>{plan.desc}</p>
                )}
              </div>
              <div className={`w-full py-2 rounded-xl text-[13px] font-black text-center ${
                plan.highlight ? "bg-pink text-cream" : "bg-charcoal text-cream"
              }`} style={GAEGU}>
                {plan.price}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 소비 구조 */}
      <div>
        <p className="text-[22px] leading-snug text-charcoal mb-3" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
          명태 <span className="highlight-pink">쓰는 곳</span>
        </p>
        <div className="rounded-2xl bg-white border-2 border-charcoal overflow-hidden divide-y divide-charcoal/8">
          {COSTS.map(item => (
            <div key={item.label} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                {item.free
                  ? <DoodleHeart className="w-4 h-4" />
                  : <DoodleMyeongtae className="w-3 h-[18px] shrink-0" />
                }
                <span className="text-[13px] text-charcoal">{item.label}</span>
              </div>
              <span className={`text-[13px] font-bold ${item.free ? "text-text-muted" : "text-charcoal"}`}>
                {item.cost}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 이용 내역 */}
      <div>
        <p className="text-[22px] leading-snug text-charcoal mb-3" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
          이용 내역
        </p>
        <div className="rounded-2xl bg-white border-2 border-charcoal overflow-hidden divide-y divide-charcoal/8">
          {HISTORY.map((h, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-[13px] text-charcoal">{h.label}</p>
                <p className="text-[11px] text-text-muted mt-0.5">{h.date}</p>
              </div>
              <span className={`text-[14px] font-bold ${h.delta > 0 ? "text-pink" : "text-charcoal"}`}>
                {h.delta > 0 ? "+" : ""}{h.delta}명태
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="rounded-xl bg-charcoal/5 px-4 py-3 flex items-start gap-2">
        <DoodleCrown className="w-4 h-4 shrink-0 mt-0.5 opacity-40" />
        <p className="text-[11px] text-text-muted leading-snug">
          명태는 사주TI 서비스 전용 재화입니다. 법정화폐와 교환되지 않으며, 결제 후 환불은 미사용분에 한해 가능합니다.
        </p>
      </div>
    </div>
  )
}
