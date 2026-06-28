import Image from "next/image"
import Link from "next/link"
import AdBanner from "@/components/AdBanner"
import { PRICES, priceLabel } from "@/lib/prices"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import IljuDiscovery from "./_components/IljuDiscovery"
import CelebDiscovery from "./_components/CelebDiscovery"
import { SquadSection, PairsSection } from "./_components/CompatibilityCards"
import {
  DoodleHeart, DoodleSparkle, DoodleStar, DoodleCrystal,
  DoodleMoon, DoodleLightning, DoodleCrown, DoodleCandy,
  DoodlePlanet, DoodleBalloon, DoodleFlower, DoodleCloud,
  DoodleGhost, DoodleKey, DoodleRocket,
  DoodleCalendar,
} from "@/components/doodles"

const CELEBS = [
  { name: "젠슨 황",     role: "NVIDIA CEO",   file: "젠슨황.png"    },
  { name: "일론 머스크", role: "Tesla CEO",    file: "일론머스크.png" },
]

// 썸/짝사랑 궁합 — 미니 마주보기 카드(랜딩 녹임). '나'는 고정 캐릭터.
const BINGGRAE = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 } as const
const GAEGU = { fontFamily: "'Cafe24Dongdong', cursive" } as const
const PINK = "#E84B6A"
const ME_KEY = "을미-f" // 고정 캐릭터
const COMPAT_HINTS = [
  { href: "/v3/some", title: "썸 궁합", sub: "그 사람도 날 좋아할까?", D: DoodleHeart, meBg: "#FFE9F0" },
  { href: "/v3/onesided", title: "짝사랑 궁합", sub: "그 사람, 내 맘 알까?", D: DoodleMoon, meBg: "#EFEAFE" },
]

export default function ShopPage() {
  const nextMonth = (new Date().getMonth() + 2) % 12 || 12
  return (
    <div className="flex flex-col gap-10">
      {/* 일주 디스커버리 — 첫 방문자용 호기심 촉발 */}
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

      {/* 귀한 나를 위한 우주의 힌트 */}
      <div className="flex flex-col gap-3">
        <p className="text-[22px] leading-snug text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
          <span className="highlight-pink">귀한 나</span>를 위한 우주의 힌트
        </p>

        {/* ★ 나 사용설명서 — 플래그십 셀프 리포트 */}
        <Link href="/v3/self" className="rounded-2xl bg-white border border-charcoal/10 p-4 flex items-center gap-3.5 active:opacity-90 transition-opacity">
          <div className="p-[3px] rounded-full shrink-0" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
            <div className="w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-white flex items-center justify-center" style={{ background: "#FFF0F5" }}>
              {ILJU_SVG_ICONS[ME_KEY]?.(getIljuProfileViewBox(ME_KEY))}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[16px] text-charcoal" style={BINGGRAE}>나 사용설명서</p>
            <p className="text-[13px] text-charcoal/60 leading-snug mt-0.5" style={GAEGU}>제품명: 나 — 취급주의·충전법·인생 그래프까지</p>
          </div>
          <span className="px-3 py-2 rounded-xl text-cream text-[12px] text-center shrink-0" style={{ background: PINK, ...BINGGRAE }}>0.8명태</span>
        </Link>

        {/* 올해운 + 광고 */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl bg-white border border-charcoal/10 p-3.5 flex flex-col h-[168px]">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-charcoal/10 flex items-center justify-center">
              <DoodleCalendar style={{ width: 28, height: 28 }} />
            </div>
            <div className="mt-2">
              <p className="text-sm font-bold text-charcoal">{nextMonth}월운 미리보기</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-snug">준비됐든 안 됐든 오긴 온다</p>
            </div>
            <button className="mt-auto w-full py-2 rounded-xl bg-pink/75 text-cream text-[11px] font-semibold active:opacity-80">
              {priceLabel(PRICES.yearFortune)}
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden h-[168px] bg-charcoal/5 border border-charcoal/10 flex items-center justify-center">
            <AdBanner slot="1111111111" format="rectangle" className="w-full h-full" />
          </div>
        </div>

        {/* 썸 궁합 + 짝사랑 궁합 — 미니 마주보기 카드 (랜딩 녹임) */}
        <div className="grid grid-cols-2 gap-2.5">
          {COMPAT_HINTS.map(c => {
            const D = c.D
            return (
              <Link key={c.title} href={c.href}
                className="rounded-2xl bg-white border border-charcoal/10 p-3.5 flex flex-col h-[168px] active:opacity-90 transition-opacity">
                {/* 미니 마주보기: 고정 캐릭터 + 연결부 + ? */}
                <div className="flex items-center gap-1.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-charcoal/15 flex items-center justify-center shrink-0" style={{ background: c.meBg }}>
                    {ILJU_SVG_ICONS[ME_KEY]?.(getIljuProfileViewBox(ME_KEY))}
                  </div>
                  <span className="w-4 h-4 inline-flex items-center justify-center shrink-0"><D className="w-full h-full" /></span>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "#F1F5F9", border: "2px dashed #CBD5E1" }}>
                    <span className="text-[14px] text-charcoal/30">?</span>
                  </div>
                </div>
                <div className="mt-2.5">
                  <p className="text-[14px] text-charcoal" style={BINGGRAE}>{c.title}</p>
                  <p className="text-[12px] text-charcoal/55 mt-0.5 leading-snug" style={GAEGU}>{c.sub}</p>
                </div>
                <span className="mt-auto w-full py-2 rounded-xl text-cream text-[12px] text-center" style={{ background: PINK, ...BINGGRAE }}>0.8명태</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 같은 일주 유명인 → 상세 리포트 후킹 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
        <div className="px-4 pt-4 pb-3 flex items-start justify-between">
          <div>
            <p className="font-bold text-charcoal text-sm">✦ 나와 같은 일주 유명인</p>
            <p className="text-[11px] text-text-muted mt-0.5">경진(庚辰)일주의 DNA를 공유한 인물들</p>
          </div>
          <DoodleCrown className="w-6 h-6 opacity-40 rotate-12 shrink-0 mt-0.5" />
        </div>
        <div className="flex border-t border-charcoal/5">
          {CELEBS.map((c, i) => (
            <div
              key={c.name}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3.5 ${
                i < CELEBS.length - 1 ? "border-r border-charcoal/5" : ""
              }`}
            >
              <div className="w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-charcoal/10">
                <Image
                  src={`/images/celebs/${c.file}`}
                  alt={c.name}
                  width={52}
                  height={52}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center px-1">
                <p className="text-[11px] font-bold text-charcoal leading-tight">{c.name}</p>
                <p className="text-[10px] text-text-muted leading-tight">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pt-2 pb-4">
          <button className="w-full py-2.5 rounded-xl bg-charcoal text-cream text-xs font-bold active:opacity-80 transition-opacity">
            🔮 상세 리포트 보기 · {priceLabel(PRICES.detailReport)}
          </button>
        </div>
      </div>

      {/* 2-col 상품 그리드 */}
      <div className="relative">
        <div className="absolute -top-2 right-1 opacity-40 rotate-12 pointer-events-none">
          <DoodleRocket className="w-7 h-7" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl bg-white border border-charcoal/10 p-3.5 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-pink-light/60 flex items-center justify-center">
              <DoodleHeart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal">커플 궁합</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-tight">두 사람의 에너지 충돌 분석</p>
            </div>
            <button className="mt-auto py-1.5 rounded-lg bg-charcoal/5 text-charcoal text-[11px] font-bold active:opacity-80">
              {priceLabel(PRICES.coupleCompat)}
            </button>
          </div>
          <div className="rounded-2xl bg-white border border-charcoal/10 p-3.5 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
              <DoodleStar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal">오늘의 사주</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-tight">일일 에너지 흐름 진단</p>
            </div>
            <button className="mt-auto py-1.5 rounded-lg bg-charcoal/5 text-charcoal text-[11px] font-bold active:opacity-80">
              무료
            </button>
          </div>
          <div className="rounded-2xl bg-white border border-charcoal/10 p-3.5 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <DoodleCrystal className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal">월운 캘린더</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-tight">이달의 길일·흉일 지도</p>
            </div>
            <button className="mt-auto py-1.5 rounded-lg bg-charcoal/5 text-charcoal text-[11px] font-bold active:opacity-80">
              무료
            </button>
          </div>
          <div className="rounded-2xl bg-charcoal p-3.5 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <DoodleSparkle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-cream">구독 플랜</p>
              <p className="text-[11px] text-cream/60 mt-0.5 leading-tight">모든 기능 무제한</p>
            </div>
            <button className="mt-auto py-1.5 rounded-lg bg-pink text-cream text-[11px] font-bold active:opacity-80">
              ₩2,900/월
            </button>
          </div>
        </div>
      </div>

      {/* 오늘 운세 */}
      <div className="relative rounded-2xl bg-charcoal text-cream px-4 py-3.5 flex items-start gap-3 overflow-hidden">
        <div className="absolute right-3 top-2 opacity-15 pointer-events-none">
          <DoodleCloud className="w-14 h-14" />
        </div>
        <DoodleSparkle className="w-6 h-6 shrink-0 mt-0.5" />
        <div>
          <p className="text-[11px] text-cream/50 font-medium">오늘의 운세</p>
          <p className="text-sm font-bold leading-snug mt-0.5">
            &ldquo;전진하기 좋은 날. 결단이 빠를수록 유리.&rdquo;
          </p>
        </div>
      </div>

      {/* 광고 배너 */}
      <div className="rounded-xl overflow-hidden">
        <AdBanner slot="2222222222" format="horizontal" />
      </div>
    </div>
  )
}
