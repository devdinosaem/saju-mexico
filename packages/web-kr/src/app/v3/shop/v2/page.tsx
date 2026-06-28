"use client"
// ════════════════════════════════════════════════════════════════
// 사주상품 v2 — 디자인 검토용 목업 (별도 페이지, /v3/shop 은 그대로 보존)
//
// 목적: 세로로 길게 흩어진 스토어를 "카테고리형" 으로 재구성.
//
// 핵심 재구성
//  · 흩어진 궁합(상단 Squad/Pairs 데모 + 힌트 섹션 썸·짝사랑 + 그리드 커플)을 "궁합" 한 섹션으로.
//  · 유명인 2블록(CelebDiscovery + 같은 일주 유명인)을 "유명인" 한 섹션으로.
//  · 무료 리텐션(오늘의 사주·월운 캘린더)·하드코딩 오늘 운세 카드는 제거 — 마이 v2 운세 위젯으로 이관됨.
//  · 광고 3개 → 1개. 작게 묻혀있던 구독 → 강조 배너로 승격.
//  · 카테고리 라벨(아이콘 칩 + 제목 + 헤어라인)로 마이/운테리어 v2 와 통일감.
//
// 방침: 펀널/데모는 기존 컴포넌트 재활용(실데이터), 새 골격(카테고리·통합)만 새로 작성.
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

// ── 카테고리 라벨 (마이/운테리어 v2 와 동일 패턴) ────────────────
function CatLabel({ icon, title, sub }: { icon: React.FC<{ className?: string }>; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-2 px-0.5 pt-1">
      <span className="w-6 h-6 rounded-full bg-pink/10 flex items-center justify-center shrink-0">
        <Ico as={icon} size={14} />
      </span>
      <span className="text-[15px] text-charcoal" style={FONT.title}>{title}</span>
      {sub && <span className="text-[11px] text-text-muted">{sub}</span>}
      <div className="flex-1 h-px bg-charcoal/8" />
    </div>
  )
}

// ── 나를 위한 분석 — 플래그십 리포트 3종 ─────────────────────────
const REPORTS = [
  { href: "/v3/self", title: "나 사용설명서", sub: "취급주의·충전법·인생 그래프까지", bg: "var(--love-bg)", price: priceLabel(PRICES.selfManual) },
  { href: "/v3/sinsal", title: "내 신살 도감", sub: "무서운 살의 진짜 뜻·능력치·올해 운", bg: "var(--warn-bg)", price: priceLabel(PRICES.sinsal) },
  { href: "/v3/nextmonth", title: "다음달 운 미리보기", sub: "운세 날씨·영역별·일진 캘린더", bg: "var(--info-bg)", price: priceLabel(PRICES.nextMonth) },
]

// ── 궁합 4종 ──────────────────────────────────────────────────
const COMPAT = [
  { href: "/v3/some", title: "썸 궁합", sub: "그 사람도 날 좋아할까?", D: DoodleHeart, bg: "var(--love-bg)", price: priceLabel(PRICES.someCompat) },
  { href: "/v3/onesided", title: "짝사랑 궁합", sub: "그 사람, 내 맘 알까?", D: DoodleMoon, bg: "var(--special-bg)", price: priceLabel(PRICES.onesidedCompat) },
  { href: "/v3/couple", title: "커플 궁합", sub: "두 사람 에너지 충돌 분석", D: DoodleSparkle, bg: "var(--warn-bg)", price: priceLabel(PRICES.coupleCompat) },
  { href: "/v3/compat", title: "친구 궁합", sub: "우리 케미 점수는?", D: DoodleStar, bg: "var(--info-bg)", price: priceLabel(PRICES.friendCompat) },
]

export default function ShopV2MockPage() {
  return (
    <div className="flex flex-col gap-7">
      {/* 목업 안내 배너 */}
      <div className="rounded-xl bg-charcoal/5 border border-dashed border-charcoal/15 px-3 py-2 flex items-center gap-2">
        <span className="text-[11px] font-bold text-charcoal/70">v2 목업 · 디자인 검토용</span>
        <Link href="/v3/shop" className="ml-auto text-[11px] font-bold text-pink active:opacity-60">현재 버전 보기 →</Link>
      </div>

      {/* ════ 히어로 · 일주 디스커버리 (첫 방문 후킹) ════ */}
      <div className="relative">
        <div className="absolute top-0 right-0 flex items-center gap-1.5 opacity-60 pointer-events-none">
          <DoodleStar className="w-4 h-4 -rotate-12" />
          <DoodleMoon className="w-4 h-4 rotate-6" />
          <DoodleSparkle className="w-4 h-4 -rotate-6" />
        </div>
        <IljuDiscovery />
      </div>

      {/* ════ 카테고리 1 · 나를 위한 분석 ════ */}
      <div className="flex flex-col gap-2.5">
        <CatLabel icon={DoodleBook} title="나를 위한 분석" sub="플래그십 리포트" />
        <div className="grid grid-cols-2 gap-2.5">
          {REPORTS.map(r => (
            <Link key={r.href} href={r.href} className="rounded-[var(--r-lg)] bg-white border border-charcoal/10 p-3.5 flex flex-col gap-2 active:opacity-90 transition-opacity">
              <div className="p-[2.5px] rounded-full w-fit shrink-0" style={{ background: "linear-gradient(135deg, var(--pink), #FBBF24)" }}>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white flex items-center justify-center" style={{ background: r.bg }}>
                  {ILJU_SVG_ICONS[ME_KEY]?.(getIljuProfileViewBox(ME_KEY))}
                </div>
              </div>
              <div>
                <p className="text-[14px] text-charcoal" style={FONT.title}>{r.title}</p>
                <p className="text-[12px] text-charcoal/55 mt-0.5 leading-snug">{r.sub}</p>
              </div>
              <span className="mt-auto w-full py-2 rounded-xl text-cream text-[12px] text-center bg-pink" style={FONT.title}>{r.price}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ════ 카테고리 2 · 궁합 (흩어졌던 5곳 통합) ════ */}
      <div className="flex flex-col gap-2.5">
        <CatLabel icon={DoodleHeart} title="궁합" sub="썸 · 짝사랑 · 커플 · 친구" />

        {/* 데모 후킹 — 마주보기/스쿼드 (랜딩 녹임) */}
        <PairsSection />
        <SquadSection />

        {/* 궁합 상품 4종 그리드 */}
        <div className="grid grid-cols-2 gap-2.5">
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
                  <p className="text-[14px] text-charcoal" style={FONT.title}>{c.title}</p>
                  <p className="text-[12px] text-charcoal/55 mt-0.5 leading-snug">{c.sub}</p>
                </div>
                <span className="mt-auto w-full py-2 rounded-xl text-cream text-[12px] text-center bg-pink" style={FONT.title}>{c.price}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ════ 카테고리 3 · 유명인 (펀널 + 같은 일주 유명인 통합) ════ */}
      <div className="flex flex-col gap-2.5">
        <CatLabel icon={DoodleCrown} title="유명인" sub="나와 같은 일주의 그 사람" />

        <CelebDiscovery />
      </div>

      {/* ════ 카테고리 4 · 구독 (작게 묻혀있던 걸 강조 배너로) ════ */}
      <div className="flex flex-col gap-2.5">
        <CatLabel icon={DoodleSparkle} title="구독" />
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
      </div>

      {/* 광고 1개만 (기존 3개 → 1개) */}
      <div className="rounded-xl overflow-hidden">
        <AdBanner slot="2222222222" format="horizontal" />
      </div>
    </div>
  )
}
