"use client"
// ════════════════════════════════════════════════════════════════
// 사주상품 v2 — 디자인 검토용 목업 (별도 페이지, /v3/shop 은 그대로 보존)
//
// 확정 룰 (v1 기준)
//  1) 상단 [일주 디스커버리 ~ 유명인 ~ 우리 궁합 데모] = v1 순서·디자인 그대로, 손대지 않음(의도 영역).
//     → IljuDiscovery → CelebDiscovery → SquadSection → PairsSection, 라벨 없이 raw.
//  2) 나 사용설명서·신살 도감·다음달 운(사진1 스타일 카드)을 썸/짝사랑(사진2 스타일)과 한 그리드로 합침.
//  3) "나와 같은 일주 유명인" 블록 제거.
//  · 구독 강조 배너 + 광고 1개 유지.
//
// 방침: 펀널/데모는 기존 컴포넌트 재활용, 새 골격(병합 그리드)만 새로 작성.
// ════════════════════════════════════════════════════════════════
import Link from "next/link"
import AdBanner from "@/components/AdBanner"
import { PRICES, priceLabel, subscriptionLabel } from "@/lib/prices"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { FONT } from "@/lib/ds"
import { Ico } from "@/components/ds"
import {
  DoodleStar, DoodleMoon, DoodleSparkle, DoodleHeart, DoodleBook,
  DoodleCrown, DoodleRocket,
} from "@/components/doodles"

import IljuDiscovery from "../_components/IljuDiscovery"
import CelebDiscovery from "../_components/CelebDiscovery"
import { SquadSection, PairsSection } from "../_components/CompatibilityCards"

const ME_KEY = "을미-f" // 고정 데모 캐릭터

// ── 리포트 3종 (사진1 스타일: 아이콘 카드) ───────────────────────
const REPORTS = [
  { href: "/v3/self", title: "나 사용설명서", sub: "취급주의·충전법·인생 그래프", icon: DoodleBook, bg: "var(--love-bg)", price: priceLabel(PRICES.selfManual) },
  { href: "/v3/sinsal", title: "내 신살 도감", sub: "능력치·시너지·올해 운", icon: DoodleStar, bg: "var(--warn-bg)", price: priceLabel(PRICES.sinsal) },
  { href: "/v3/nextmonth", title: "다음달 운 미리보기", sub: "운세 날씨·일진 캘린더", icon: DoodleMoon, bg: "var(--info-bg)", price: priceLabel(PRICES.nextMonth) },
]

// ── 썸·짝사랑 (사진2 스타일: 마주보기 카드) ──────────────────────
const COMPAT = [
  { href: "/v3/some", title: "썸 궁합", sub: "그 사람도 날 좋아할까?", D: DoodleHeart, bg: "var(--love-bg)", price: priceLabel(PRICES.someCompat) },
  { href: "/v3/onesided", title: "짝사랑 궁합", sub: "그 사람, 내 맘 알까?", D: DoodleMoon, bg: "var(--special-bg)", price: priceLabel(PRICES.onesidedCompat) },
]

export default function ShopV2MockPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* 목업 안내 배너 */}
      <div className="rounded-xl bg-charcoal/5 border border-dashed border-charcoal/15 px-3 py-2 flex items-center gap-2">
        <span className="text-[11px] font-bold text-charcoal/70">v2 목업 · 디자인 검토용</span>
        <Link href="/v3/shop" className="ml-auto text-[11px] font-bold text-pink active:opacity-60">현재 버전 보기 →</Link>
      </div>

      {/* ════ [고정] 상단 영역 — v1 순서·디자인 그대로 (손대지 않음) ════ */}
      {/* 일주 디스커버리 — 첫 방문 후킹 */}
      <div className="relative">
        <div className="absolute top-0 right-0 flex items-center gap-1.5 opacity-60 pointer-events-none">
          <DoodleStar className="w-4 h-4 -rotate-12" />
          <DoodleMoon className="w-4 h-4 rotate-6" />
          <DoodleSparkle className="w-4 h-4 -rotate-6" />
        </div>
        <IljuDiscovery />
      </div>
      <CelebDiscovery />
      <SquadSection />
      <PairsSection />

      {/* ════ 병합 그리드 — 마이 운세 위젯처럼 그라디언트 프레임에 담음 ════ */}
      <div className="rounded-[var(--r-xl)] p-3.5" style={{ background: "var(--grad-pink-surface)", border: "1px solid var(--love-line)" }}>
      <div className="grid grid-cols-2 gap-2.5">
        {/* 리포트 카드 (사진1 스타일) */}
        {REPORTS.map(r => (
          <Link key={r.href} href={r.href} className="rounded-[var(--r-lg)] bg-white border border-charcoal/10 p-3.5 flex flex-col gap-2 active:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: r.bg }}>
              <Ico as={r.icon} size={22} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-charcoal leading-tight">{r.title}</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-tight">{r.sub}</p>
            </div>
            <span className="mt-auto w-full py-1.5 rounded-lg bg-pink text-cream text-[11px] font-bold text-center">{r.price}</span>
          </Link>
        ))}

        {/* 썸/짝사랑 카드 (사진2 스타일: 마주보기) */}
        {COMPAT.map(c => {
          const D = c.D
          return (
            <Link key={c.href} href={c.href} className="rounded-[var(--r-lg)] bg-white border border-charcoal/10 p-3.5 flex flex-col gap-2 active:opacity-90 transition-opacity">
              <div className="flex items-center gap-1.5">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-charcoal/15 flex items-center justify-center shrink-0" style={{ background: c.bg }}>
                  {ILJU_SVG_ICONS[ME_KEY]?.(getIljuProfileViewBox(ME_KEY))}
                </div>
                <span className="w-4 h-4 inline-flex items-center justify-center shrink-0"><D className="w-full h-full" /></span>
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "#F1F5F9", border: "2px dashed #CBD5E1" }}>
                  <span className="text-[14px] text-charcoal/30">?</span>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-bold text-charcoal leading-tight">{c.title}</p>
                <p className="text-[11px] text-text-muted mt-0.5 leading-tight">{c.sub}</p>
              </div>
              <span className="mt-auto w-full py-1.5 rounded-lg bg-pink text-cream text-[11px] font-bold text-center">{c.price}</span>
            </Link>
          )
        })}
      </div>
      </div>

      {/* ════ 구독 강조 배너 ════ */}
      <button
        className="relative rounded-[var(--r-xl)] px-5 py-5 flex items-center gap-4 overflow-hidden text-left active:opacity-90 transition-opacity"
        style={{ background: "var(--grad-pink-bold)" }}
      >
        <div className="absolute -right-2 -top-2 opacity-25 rotate-12 pointer-events-none">
          <DoodleRocket className="w-16 h-16" />
        </div>
        <span className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
          <Ico as={DoodleCrown} size={28} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[17px] text-white" style={FONT.title}>구독 플랜</p>
          <p className="text-[12px] text-white/80 mt-0.5 leading-snug">모든 리포트·궁합·기능 무제한</p>
        </div>
        <span className="px-3.5 py-2 rounded-xl bg-white text-pink text-[13px] shrink-0" style={FONT.title}>{subscriptionLabel()}</span>
      </button>

      {/* 광고 1개 */}
      <div className="rounded-xl overflow-hidden">
        <AdBanner slot="2222222222" format="horizontal" />
      </div>
    </div>
  )
}
