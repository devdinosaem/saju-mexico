"use client"
import { useState } from "react"
import Image from "next/image"
import {
  DoodleWood, DoodleFlameFive, DoodleEarth, DoodleMetal, DoodleWater,
  DoodleCrown, DoodleHeart, DoodleStar, DoodleSparkle, DoodleSun,
} from "@/components/doodles"
import CelebFunnel from "./CelebFunnel"
import CTAButton from "@/components/cta-button"

const GAEGU: React.CSSProperties = {
  fontFamily: "'Cafe24Dongdong', var(--font-gaegu), cursive",
  fontSizeAdjust: 0.52,
  letterSpacing: "normal",
}

const TILTS = [-3, 2, -1.5, 3.5, -2.5, 1, -3.5, 2.5, -2, 3, 1.5, -4]

const ELEMENT_STYLE: Record<string, { bg: string; border: string }> = {
  목: { bg: "#D1FAE5", border: "#4ADE80" },
  화: { bg: "#FEE2E2", border: "#F87171" },
  토: { bg: "#FEF3C7", border: "#FBBF24" },
  금: { bg: "#F1F5F9", border: "#94A3B8" },
  수: { bg: "#DBEAFE", border: "#60A5FA" },
}

const STICKER: Record<string, React.ReactNode> = {
  목: <DoodleWood className="w-8 h-8" />,
  화: <DoodleFlameFive className="w-8 h-8" />,
  토: <DoodleEarth className="w-8 h-8" />,
  금: <DoodleMetal className="w-8 h-8" />,
  수: <DoodleWater className="w-8 h-8" />,
}

// 계축-f 캐릭터 SVG
const SvgGyechuk = (
  <svg viewBox="0 0 80 68" fill="none" style={{ width: 68, flexShrink: 0 }}>
    <path d="M22 34 Q20 14 40 12 Q60 14 58 34 Q56 46 56 52 Q48 58 40 58 Q32 58 24 52 Q22 46 22 34 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
    <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
    <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <circle cx="33" cy="33" r="3" fill="#2D2D2D" />
    <circle cx="47" cy="33" r="3" fill="#2D2D2D" />
    <circle cx="34" cy="32" r="1.2" fill="white" />
    <circle cx="48" cy="32" r="1.2" fill="white" />
    <path d="M36 41 Q40 45 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <ellipse cx="28" cy="38" rx="3.5" ry="2" fill="#93C5FD" opacity="0.35" />
    <ellipse cx="52" cy="38" rx="3.5" ry="2" fill="#93C5FD" opacity="0.35" />
    <path d="M28 52 Q26 56 26 72 L54 72 Q54 56 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
    <path d="M28 56 Q18 54 14 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <rect x="0" y="49" width="22" height="28" rx="2" fill="white" stroke="#EF4444" strokeWidth="2" />
    <text x="11" y="60" fontSize="7.5" fill="#EF4444" fontWeight="bold" textAnchor="middle">100</text>
    <text x="11" y="70" fontSize="7" fill="#EF4444" fontWeight="bold" textAnchor="middle">점!</text>
  </svg>
)

// 호날두 두들 셀럽 캐릭터
const SvgRonaldo = (
  <svg viewBox="0 0 80 72" fill="none" style={{ width: 68, flexShrink: 0 }}>
    <g transform="rotate(-6, 40, 50)">
      <path d="M22 32 Q22 12 40 10 Q58 12 58 32 Q54 26 50 22 Q44 18 40 23 Q36 18 30 22 Q26 26 22 32 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="40" cy="36" r="15" fill="#F0C9A3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M27 28 Q32 26 37 28" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M43 28 Q48 26 53 28" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="33" cy="33" r="2.8" fill="#2D2D2D"/>
      <circle cx="47" cy="33" r="2.8" fill="#2D2D2D"/>
      <circle cx="34" cy="32" r="1" fill="white"/>
      <circle cx="48" cy="32" r="1" fill="white"/>
      <path d="M33 44 Q40 49 47 44" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M34 44 Q40 48 46 44 L46 46 Q40 51 34 46 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.6"/>
      <ellipse cx="27" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.2"/>
      <ellipse cx="53" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.2"/>
      <rect x="20" y="52" width="40" height="26" rx="3" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M34 52 Q40 58 46 52" fill="white" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <text x="40" y="67" fontSize="5.5" fill="white" fontWeight="bold" textAnchor="middle" opacity="0.95">AIG</text>
      <text x="27" y="62" fontSize="5" fill="white" fontWeight="bold" textAnchor="middle" opacity="0.75">7</text>
      <path d="M20 54 Q13 60 11 66" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M60 54 Q67 60 69 66" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" fill="none"/>
    </g>
  </svg>
)

// 무진-f 캐릭터 SVG (걱정 삭제 담당)
const SvgMujin = (
  <svg viewBox="0 0 80 80" fill="none" style={{ width: 68, flexShrink: 0 }}>
    <circle cx="26" cy="22" r="8" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
    <circle cx="54" cy="22" r="8" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
    <circle cx="26" cy="22" r="4" fill="#FDE68A" />
    <circle cx="54" cy="22" r="4" fill="#FDE68A" />
    <circle cx="40" cy="40" r="20" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
    <path d="M32 36 Q34 32 36 36" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M44 36 Q46 32 48 36" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M34 44 Q40 50 46 44" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="28" cy="42" rx="4" ry="2" fill="#FB923C" opacity="0.3" />
    <ellipse cx="52" cy="42" rx="4" ry="2" fill="#FB923C" opacity="0.3" />
    <ellipse cx="40" cy="70" rx="22" ry="14" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
    <path d="M18 63 Q12 70 18 78" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M62 63 Q68 70 62 78" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M40 70 C40 70 36 66 36 64 A2.5 2.5 0 0 1 40 63 A2.5 2.5 0 0 1 44 64 C44 66 40 70 40 70Z" fill="#FB923C" opacity="0.4" />
  </svg>
)

// 신미-m 캐릭터 SVG
const SvgSinmi = (
  <svg viewBox="0 0 80 72" fill="none" style={{ width: 68, flexShrink: 0 }}>
    <path d="M26 30 Q24 18 30 8 Q34 2 37 14 Q38 6 40 0 Q42 6 43 14 Q46 2 50 8 Q56 18 54 30 Q48 26 40 27 Q32 26 26 30Z" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1.5" />
    <path d="M36 26 Q38 14 40 6 Q42 14 44 26 Q42 24 40 25 Q38 24 36 26Z" fill="#FDE047" />
    <circle cx="40" cy="40" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="2" />
    <rect x="26" y="33" width="12" height="8" rx="2.5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.2" />
    <rect x="42" y="33" width="12" height="8" rx="2.5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.2" />
    <line x1="38" y1="37" x2="42" y2="37" stroke="#2D2D2D" strokeWidth="1.2" />
    <line x1="18" y1="37" x2="26" y2="37" stroke="#2D2D2D" strokeWidth="1" />
    <line x1="54" y1="37" x2="62" y2="37" stroke="#2D2D2D" strokeWidth="1" />
    <line x1="27" y1="30" x2="37" y2="29" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
    <line x1="43" y1="29" x2="53" y2="30" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
    <path d="M36 46 Q40 50 44 46" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <ellipse cx="28" cy="43" rx="3.5" ry="2" fill="#FBBF24" opacity="0.6" />
    <ellipse cx="52" cy="43" rx="3.5" ry="2" fill="#FBBF24" opacity="0.6" />
    <rect x="28" y="56" width="24" height="20" rx="5" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="2" />
    <path d="M38 56 L40 63 L42 56" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
    <rect x="38" y="63" width="4" height="7" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
    <rect x="5" y="52" width="16" height="20" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
    <rect x="9" y="50" width="8" height="4" rx="1.5" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1" />
    <line x1="8" y1="59" x2="19" y2="59" stroke="#3B82F6" strokeWidth="1" />
    <line x1="8" y1="63" x2="19" y2="63" stroke="#3B82F6" strokeWidth="1" />
    <path d="M7 58 L9 60 L12 56" stroke="#4ADE80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="62" y="52" width="4" height="18" rx="2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1" />
    <path d="M62 70 L66 70 L64 75 Z" fill="#2D2D2D" />
  </svg>
)

// 임오-f 캐릭터 SVG
const SvgImo = (
  <svg viewBox="0 0 80 72" fill="none" style={{ width: 68, flexShrink: 0 }}>
    <path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 40 60 46 Q54 52 62 58 Q66 64 58 70 Q50 74 44 72 Q40 70 36 72 Q30 74 22 70 Q14 64 18 58 Q26 52 20 46 Q14 40 18 30 Z" fill="#1E3A8A" stroke="#2D2D2D" strokeWidth="1.5" />
    <path d="M61 24 L61 18 M61 24 L57 21 M61 24 L65 21 M61 24 L57 27 M61 24 L65 27" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="61" cy="24" r="1.5" fill="white" />
    <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
    <path d="M31 33 Q34 31 37 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M43 33 Q46 31 49 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M30 36 L37 36" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
    <circle cx="46" cy="36" r="3.5" fill="#2D2D2D" />
    <circle cx="47.5" cy="34.5" r="1.3" fill="white" />
    <path d="M36 43 Q40 46 44 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <ellipse cx="28" cy="40" rx="5" ry="3" fill="#F87171" opacity="0.7" />
    <ellipse cx="52" cy="40" rx="5" ry="3" fill="#F87171" opacity="0.7" />
    <path d="M28 50 Q26 54 26 70 L40 70 L40 50 Q34 48 28 50Z" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1.5" />
    <path d="M52 50 Q54 54 54 70 L40 70 L40 50 Q46 48 52 50Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
    <line x1="40" y1="50" x2="40" y2="70" stroke="#2D2D2D" strokeWidth="1" strokeDasharray="3,2" />
    <path d="M64 26 C64 26 61 22 61 19.5 A2.5 2.5 0 0 1 64 18 A2.5 2.5 0 0 1 67 19.5 C67 22 64 26 64 26Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.8" />
  </svg>
)

type CelebItem = { type: "celeb"; name: string; role: string; element: string; file: string }
type NaItem    = { type: "na";    name: string; role: string; element: string; cardBg: string; circleBg: string; svg: React.ReactNode }
type CardItem  = CelebItem | NaItem

const CARDS: CardItem[] = [
  { type: "celeb", name: "젠슨 황",     role: "엔비디아 창업자", element: "금", file: "젠슨황.png" },
  { type: "celeb", name: "아인슈타인",  role: "노벨물리학상",     element: "화", file: "아인슈타인.png" },
  { type: "na",    name: "나",          role: "공부잘함",         element: "토", cardBg: "#FACC15", circleBg: "linear-gradient(to bottom, #FEF3C7, #FDE68A)", svg: SvgMujin },
  { type: "celeb", name: "일론 머스크", role: "테슬라 창업자",     element: "목", file: "일론머스크.png" },
  { type: "na",    name: "나",          role: "귀하게 자람",       element: "금", cardBg: "#FACC15", circleBg: "linear-gradient(to bottom, #F1F5F9, #FEF3C7)", svg: SvgSinmi },
  { type: "celeb", name: "스티브 잡스", role: "애플 창업자",       element: "화", file: "스티븐잡스.png" },
  { type: "celeb", name: "만수르",      role: "UAE 왕자",          element: "목", file: "만수르.png" },
  { type: "na",    name: "나",           role: "축구 잘함",         element: "목", cardBg: "#FACC15", circleBg: "linear-gradient(to bottom, #FEF2F2, #FEE2E2)", svg: SvgRonaldo },
  { type: "celeb", name: "세종대왕",    role: "조선 제4대 왕",     element: "목", file: "세종대왕.png" },
  { type: "celeb", name: "오드리 햅번", role: "전설의 배우",       element: "토", file: "오드리햅번.png" },
  { type: "na",    name: "나",          role: "공주임",            element: "토", cardBg: "#FACC15", circleBg: "linear-gradient(to bottom, #DBEAFE, #FFE4EA)", svg: SvgImo },
]

function CelebCard({ item, idx }: { item: CelebItem; idx: number }) {
  const tilt = TILTS[idx % TILTS.length]
  const mt = idx % 2 === 0 ? 8 : 0
  const { bg } = ELEMENT_STYLE[item.element]
  return (
    <div
      className="shrink-0 flex flex-col rounded-2xl overflow-hidden"
      style={{ width: 108, background: "white", border: "2px solid rgba(45,45,45,0.1)", transform: `rotate(${tilt}deg)`, boxShadow: "2px 2px 0px rgba(45,45,45,0.1)", marginTop: mt }}
    >
      <div className="flex flex-col items-center px-2.5 pt-2.5 pb-1.5 gap-1">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-charcoal/20 shrink-0">
          <Image src={`/images/celebs/${item.file}`} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
        </div>
        <p className="text-[13px] leading-tight text-charcoal text-center font-bold">{item.name}</p>
        <p className="text-[12px] text-text-muted leading-tight text-center" style={GAEGU}>{item.role}</p>
      </div>
      <div className="flex-1 flex items-center justify-center pt-2 border-t-2 border-charcoal/20" style={{ background: bg }}>
        {STICKER[item.element]}
      </div>
    </div>
  )
}

const NA_STICKERS = [
  { comp: <DoodleCrown className="w-4 h-4" />,   top: 4,  left: 4,  rotate: -15 },
  { comp: <DoodleHeart className="w-3.5 h-3.5" />, top: 6,  right: 5, rotate: 12  },
  { comp: <DoodleStar className="w-3 h-3" />,    bottom: 28, left: 5,  rotate: -8  },
  { comp: <DoodleSparkle className="w-3 h-3" />, bottom: 30, right: 4, rotate: 10  },
]

function NaCard({ item, idx }: { item: NaItem; idx: number }) {
  const tilt = TILTS[idx % TILTS.length]
  const mt = idx % 2 === 0 ? 8 : 0
  const { bg } = ELEMENT_STYLE[item.element]
  return (
    <div
      className="shrink-0 flex flex-col rounded-2xl overflow-hidden relative"
      style={{ width: 108, background: item.cardBg, border: "2px solid rgba(45,45,45,0.1)", transform: `rotate(${tilt}deg)`, boxShadow: "2px 2px 0px rgba(45,45,45,0.1)", marginTop: mt }}
    >
      {/* 스티커 장식 */}
      {NA_STICKERS.map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ top: s.top, left: (s as { left?: number }).left, right: (s as { right?: number }).right, bottom: s.bottom, transform: `rotate(${s.rotate}deg)` }}
        >
          {s.comp}
        </div>
      ))}
      <div className="flex flex-col items-center px-2.5 pt-2.5 pb-1.5 gap-1">
        <div className="w-16 h-16 rounded-full border-2 border-charcoal/20 shrink-0 overflow-hidden flex items-end justify-center" style={{ background: item.circleBg }}>
          {item.svg}
        </div>
        <p className="text-[13px] leading-tight text-charcoal text-center font-bold">{item.name}</p>
        <p className="text-[12px] text-charcoal/60 leading-tight text-center" style={GAEGU}>{item.role}</p>
      </div>
      <div className="flex-1 flex items-center justify-center pt-2 border-t-2 border-charcoal/20" style={{ background: bg }}>
        {STICKER[item.element]}
      </div>
    </div>
  )
}

export function CelebMarquee() {
  const loopCards = [
    ...CARDS.map((c, i) => ({ card: c, origIdx: i })),
    ...CARDS.map((c, i) => ({ card: c, origIdx: i })),
  ]
  return (
    <div style={{ overflow: "clip", paddingTop: 8, paddingBottom: 8 }}>
      <div
        className="flex gap-3"
        style={{ width: "max-content", animation: "ilju-marquee 32s linear infinite", willChange: "transform" }}
      >
        {loopCards.map(({ card, origIdx }, i) =>
          card.type === "na"
            ? <NaCard key={`na-${origIdx}-${i}`} item={card} idx={origIdx} />
            : <CelebCard key={`${card.file}-${i}`} item={card} idx={origIdx} />
        )}
      </div>
    </div>
  )
}

export default function CelebDiscovery() {
  const loopCards = [...CARDS.map((c, i) => ({ card: c, origIdx: i })),
                     ...CARDS.map((c, i) => ({ card: c, origIdx: i }))]
  const [funnelOpen, setFunnelOpen] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-[22px] leading-snug text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
          젠슨황, 일론머스크랑<br />
          사주카드가 같은 사람이 <span className="highlight-pink">나일지도..?</span>
        </p>
      </div>

      <div className="overflow-hidden" style={{ paddingTop: 12, paddingBottom: 16, marginTop: -12 }}>
        <div
          className="flex gap-3"
          style={{ width: "max-content", animation: "ilju-marquee 32s linear infinite", willChange: "transform" }}
        >
          {loopCards.map(({ card, origIdx }, i) =>
            card.type === "na"
              ? <NaCard key={`na-${origIdx}-${i}`} item={card} idx={origIdx} />
              : <CelebCard key={`${card.file}-${i}`} item={card} idx={origIdx} />
          )}
        </div>
      </div>

      <CTAButton onClick={() => setFunnelOpen(true)}>
        <span className="w-6 h-6 flex items-center justify-center shrink-0">
          <DoodleSun style={{ width: 20, height: 20 }} />
        </span>
        나인지 확인하기
        <span className="w-6 h-6 flex items-center justify-center shrink-0">
          <DoodleSun style={{ width: 20, height: 20 }} />
        </span>
      </CTAButton>

      <CelebFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} />
    </div>
  )
}
