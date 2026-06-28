"use client"
import { useState, useLayoutEffect } from "react"
import { getIljuType } from "@/lib/ilju-types"
import {
  DoodleWood, DoodleFlameFive, DoodleEarth, DoodleMetal, DoodleWater, DoodleCrown,
} from "@/components/doodles"
import LoginSheet from "./LoginSheet"
import SajuInputSheet from "./SajuInputSheet"
import LoadingOverlay from "./LoadingOverlay"
import SajuRevealOverlay from "./SajuRevealOverlay"
import { getMockUser, loginMockUser, logoutMockUser, isBirthDateComplete, MOCK_AUTH_EVENT, type MockUser, type MockBirthDate } from "@/lib/mockAuth"
import { IljuDefaultCharacter } from "@/lib/ilju-svg-icons"
import CTAButton from "@/components/cta-button"

const GAEGU: React.CSSProperties = {
  fontFamily: "'Cafe24Dongdong', var(--font-gaegu), cursive",
  fontSizeAdjust: 0.52,
  letterSpacing: "normal",
}

// 카드별 고정 기울기 — 삐뚤빼뚤 느낌
const TILTS = [-3, 2, -1.5, 3.5, -2.5, 1, -3.5, 2.5]

const CHARS: {
  id: string
  element: string
  elementKey: "목" | "화" | "토" | "금" | "수"
  bg: string
  border: string
  svg: React.ReactNode
  label?: string[]
}[] = [
  {
    id: "갑자-m",
    element: "목(木)",
    elementKey: "목",
    bg: "#D1FAE5",
    border: "#4ADE80",
    svg: (
      <svg viewBox="0 0 80 90" fill="none" className="w-full h-full">
        <path d="M25 28 Q40 12 55 28" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" />
        <circle cx="40" cy="38" r="18" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
        <rect x="31" y="34" width="6" height="4" rx="1" fill="#2D2D2D" />
        <rect x="43" y="34" width="6" height="4" rx="1" fill="#2D2D2D" />
        <line x1="35" y1="44" x2="45" y2="44" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        <rect x="28" y="56" width="24" height="18" rx="4" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="2" />
        <rect x="10" y="60" width="18" height="14" rx="2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" />
        <circle cx="30" cy="78" r="5" fill="#2D2D2D" />
        <circle cx="50" cy="78" r="5" fill="#2D2D2D" />
      </svg>
    ),
  },
  {
    id: "정해-f",
    element: "화(火)",
    elementKey: "화",
    bg: "#FEE2E2",
    border: "#F87171",
    label: ["태어나길", "눈치 만렙"],
    svg: (
      <svg viewBox="0 0 80 90" fill="none" className="w-full h-full">
        {/* 장발 스트레이트 — 핫핑크 */}
        <path d="M18 32 Q18 10 40 10 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#EC4899" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 큰 귀 (안테나 역할) */}
        <ellipse cx="16" cy="34" rx="6" ry="13" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        <ellipse cx="64" cy="34" rx="6" ry="13" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 안테나 */}
        <line x1="36" y1="14" x2="30" y2="2" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="30" cy="1" r="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <line x1="44" y1="14" x2="50" y2="2" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="1" r="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 33 Q34 31 37 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 33 Q46 31 49 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 크고 동그란 */}
        <circle cx="34" cy="35" r="4.5" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="34" cy="36" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="35" r="4.5" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="46" cy="36" r="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="34" r="1" fill="white" />
        <circle cx="47" cy="34" r="1" fill="white" />
        {/* 입 */}
        <circle cx="40" cy="43" r="1.5" fill="#2D2D2D" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="40" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.7" />
        <ellipse cx="52" cy="40" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.7" />
        {/* 몸통 — 선명한 노랑 */}
        <path d="M28 52 Q26 56 26 70 L54 70 Q54 56 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 레이더 파장 */}
        <path d="M67 34 Q72 32 74 37 Q76 42 72 46" stroke="#FB923C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M69 30 Q76 28 80 35 Q82 42 78 48" stroke="#FB923C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "경인-f",
    element: "금(金)",
    elementKey: "금",
    bg: "#F1F5F9",
    border: "#94A3B8",
    label: ["지면", "잠 못잠"],
    svg: (
      <svg viewBox="0 0 80 90" fill="none" className="w-full h-full">
        {/* 단발 스트레이트 — 빨강 */}
        <path d="M20 32 Q20 10 40 8 Q60 10 60 32 Q62 48 54 54 Q46 58 40 58 Q34 58 26 54 Q18 48 20 32 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 1등 메달 */}
        <circle cx="40" cy="4" r="7" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 8 L34 16" stroke="#F87171" strokeWidth="2" strokeLinecap="round" />
        <path d="M44 8 L46 16" stroke="#F87171" strokeWidth="2" strokeLinecap="round" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 33 Q34 31 37 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 33 Q46 31 49 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 강렬한 투지 */}
        <circle cx="34" cy="35" r="3" fill="#2D2D2D" />
        <circle cx="46" cy="35" r="3" fill="#2D2D2D" />
        <circle cx="35.5" cy="33.5" r="1.2" fill="white" />
        <circle cx="47.5" cy="33.5" r="1.2" fill="white" />
        {/* 눈썹 — 의지 */}
        <line x1="29" y1="29" x2="37" y2="28" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="51" y1="29" x2="43" y2="28" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" />
        {/* 입 — 당당한 미소 */}
        <path d="M35 42 Q40 46 45 42" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="39" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />
        <ellipse cx="52" cy="39" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />
        {/* 몸통 — 황금색 */}
        <rect x="28" y="58" width="24" height="20" rx="5" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
        {/* 트로피 */}
        <path d="M58 72 L58 56 Q58 50 65 50 Q72 50 72 56 L72 72" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M58 56 Q54 54 54 60 Q54 65 58 65" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
        <path d="M72 56 Q76 54 76 60 Q76 65 72 65" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
        <rect x="62" y="72" width="6" height="5" rx="1" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" />
        <line x1="58" y1="77" x2="72" y2="77" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 왼팔 주먹 — 승부 포즈 */}
        <path d="M28 62 L12 52" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
        <circle cx="10" cy="50" r="4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "병인-f",
    element: "화(火)",
    elementKey: "화",
    bg: "#FEE2E2",
    border: "#F87171",
    svg: (
      <svg viewBox="0 0 80 90" fill="none" className="w-full h-full">
        <path d="M22 28 Q22 10 40 8 Q58 10 58 28" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M20 28 Q12 40 14 62 Q16 70 20 68 Q26 64 22 52 Q20 40 22 30 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M60 28 Q68 40 66 62 Q64 70 60 68 Q54 64 58 52 Q60 40 58 30 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M14 62 Q10 72 14 76 Q18 72 16 64 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M66 62 Q70 72 66 76 Q62 72 64 64 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="21" cy="30" r="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="59" cy="30" r="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M29 28 Q33 25 37 28" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M43 28 Q47 25 51 28" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="34" cy="33" r="3" fill="#2D2D2D" />
        <circle cx="46" cy="33" r="3" fill="#2D2D2D" />
        <circle cx="35.2" cy="31.8" r="1.2" fill="white" />
        <circle cx="47.2" cy="31.8" r="1.2" fill="white" />
        <ellipse cx="28" cy="39" rx="5" ry="3" fill="#F9A8D4" opacity="0.7" />
        <ellipse cx="52" cy="39" rx="5" ry="3" fill="#F9A8D4" opacity="0.7" />
        <path d="M33 41 Q40 47 47 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
      </svg>
    ),
  },
]

const STICKER: Record<string, React.ReactNode> = {
  목: <DoodleWood className="w-8 h-8" />,
  화: <DoodleFlameFive className="w-8 h-8" />,
  토: <DoodleEarth className="w-8 h-8" />,
  금: <DoodleMetal className="w-8 h-8" />,
  수: <DoodleWater className="w-8 h-8" />,
}

// 나? 카드 + 미스터리 카드
const NA_CARD = { id: "나?", element: "", elementKey: "목" as const, bg: "#FFF1F2", border: "#F9A8D4", svg: null }
const MYSTERY  = { id: "mystery", element: "", elementKey: "목" as const, bg: "#F0F9FF", border: "#BAE6FD", svg: null }
// 갑자-m, 정해-f, 나?, 병인-f(텐션최고봉), 경인-f(지면잠못잠), mystery
const ALL_ITEMS = [CHARS[0], CHARS[1], NA_CARD, CHARS[3], CHARS[2], MYSTERY]

function CardItem({ c, idx }: { c: typeof ALL_ITEMS[number]; idx: number }) {
  const tilt = TILTS[idx % TILTS.length]
  const mt   = idx % 2 === 0 ? 8 : 0

  if (c.id === "mystery") {
    return (
      <div
        className="shrink-0 flex flex-col rounded-2xl overflow-hidden"
        style={{
          width: 108,
          background: "#F0F9FF",
          border: "2.5px dashed #BAE6FD",
          transform: `rotate(${tilt}deg)`,
          marginTop: mt,
        }}
      >
        <div className="px-2.5 pt-2.5 pb-1">
          <p className="text-[17px] leading-tight text-sky-300/50 text-center" style={GAEGU}>나는?</p>
          <p className="text-[12px] text-sky-300/40 leading-tight text-center mt-0.5" style={GAEGU}>???일주</p>
        </div>
        <div className="relative overflow-hidden flex items-end justify-center" style={{ height: 100 }}>
          <div style={{ width: 90, marginBottom: -4 }}>
            <IljuDefaultCharacter />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center gap-1 pt-2 border-t-2 border-[#9CA3AF]/30">
          <span className="text-[11px] leading-none text-sky-300/40 select-none" style={GAEGU}>???</span>
        </div>
      </div>
    )
  }

  if (c.id === "나?") {
    return (
      <div
        className="shrink-0 flex flex-col rounded-2xl overflow-hidden"
        style={{
          width: 108,
          background: "#FFF1F2",
          border: "2.5px dashed #F9A8D4",
          transform: `rotate(${tilt}deg)`,
          marginTop: mt,
        }}
      >
        <div className="px-2.5 pt-2.5 pb-1">
          <p className="text-[17px] leading-tight text-pink/50 text-center" style={GAEGU}>나는?</p>
          <p className="text-[12px] text-pink/30 leading-tight text-center mt-0.5" style={GAEGU}>???일주</p>
        </div>
        <div className="relative overflow-hidden flex items-end justify-center" style={{ height: 100 }}>
          <div style={{ width: 90, marginBottom: -4 }}>
            <IljuDefaultCharacter />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center pt-2 border-t-2 border-pink/20">
          <span className="text-[11px] leading-none text-pink/30 select-none" style={GAEGU}>???</span>
        </div>
      </div>
    )
  }

  const name = getIljuType(c.id)?.name ?? c.id
  const ilju = c.id.split("-")[0]
  const lines: string[] = (c as { label?: string[] }).label ?? [name]

  return (
    <div
      className="shrink-0 flex flex-col rounded-2xl overflow-hidden"
      style={{
        width: 108,
        background: "white",
        border: "2px solid rgba(45,45,45,0.1)",
        transform: `rotate(${tilt}deg)`,
        boxShadow: "2px 2px 0px rgba(45,45,45,0.1)",
        marginTop: mt,
      }}
    >
      <div className="px-2.5 pt-2.5 pb-1">
        <p className="text-[17px] leading-tight text-charcoal text-center" style={GAEGU}>
          {lines.map((l, i) => <span key={i} className="block">{l}</span>)}
        </p>
        <p className="text-[12px] text-text-muted leading-tight text-center mt-0.5" style={GAEGU}>
          {ilju}일주
        </p>
      </div>
      <div className="relative overflow-hidden bg-white" style={{ height: 100 }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 90, marginBottom: -4 }}>
          {c.svg}
        </div>
      </div>
      <div
        className="flex-1 flex items-center justify-center gap-1 pt-2 border-t-2 border-charcoal/20"
        style={{ background: c.bg }}
      >
        {STICKER[c.elementKey]}
      </div>
    </div>
  )
}

export function IljuMarquee() {
  const loopItems = [...ALL_ITEMS, ...ALL_ITEMS]
  return (
    <div style={{ overflow: "clip", paddingTop: 8, paddingBottom: 8 }}>
      <div
        className="flex gap-3"
        style={{ width: "max-content", animation: "ilju-marquee 15s linear infinite", willChange: "transform" }}
      >
        {loopItems.map((c, i) => (
          <CardItem key={`${c.id}-${i}`} c={c} idx={i % ALL_ITEMS.length} />
        ))}
      </div>
    </div>
  )
}

export default function IljuDiscovery() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [revealOpen, setRevealOpen] = useState(false)
  const [user, setUser] = useState<MockUser>({ loggedIn: false, provider: null, birthDate: null, iljuId: null })
  const loopItems = [...ALL_ITEMS, ...ALL_ITEMS]

  useLayoutEffect(() => {
    setUser(getMockUser())
    const handler = () => setUser(getMockUser())
    window.addEventListener(MOCK_AUTH_EVENT, handler)
    return () => window.removeEventListener(MOCK_AUTH_EVENT, handler)
  }, [])

  function handleCTA() {
    if (!user.loggedIn) {
      setLoginOpen(true)
    } else if (!user.birthDate) {
      setSheetOpen(true)
    } else if (isBirthDateComplete(user.birthDate)) {
      setLoadingOpen(true)
    } else {
      // 시간 미입력 등 불완전 — 기존 데이터 프리필 후 시트 열기
      setSheetOpen(true)
    }
  }

  const ctaLabel = user.loggedIn && user.birthDate && isBirthDateComplete(user.birthDate)
    ? "내 사주카드 보기"
    : "내 사주카드 뽑기"

  return (
    <>
    <div className="flex flex-col gap-3">
      {/* 헤드라인 */}
      <div>
        <p className="text-[28px] leading-tight text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
          내 SAJUPLAY는 뭘까?
        </p>
        <p className="text-[12px] text-text-muted mt-0.5">
          120가지 캐릭터 중 딱 하나가 내 거야
        </p>
      </div>

      {/* 마퀴 — overflow:clip 필수. 제거 시 width:max-content 자식이 페이지 가로 넘침 유발 */}
      <div
        style={{ overflow: "clip", paddingTop: 12, paddingBottom: 16, marginTop: -12 }}
      >
        <div
          className="flex gap-3"
          style={{
            width: "max-content",
            animation: "ilju-marquee 15s linear infinite",
            willChange: "transform",
          }}
        >
          {loopItems.map((c, i) => (
            <CardItem key={`${c.id}-${i}`} c={c} idx={i % ALL_ITEMS.length} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <CTAButton onClick={handleCTA}>
        <span className="w-6 h-6 flex items-center justify-center shrink-0">
          <DoodleCrown style={{ width: 20, height: 20 }} />
        </span>
        {ctaLabel}
        <span className="w-6 h-6 flex items-center justify-center shrink-0">
          <DoodleCrown style={{ width: 20, height: 20 }} />
        </span>
      </CTAButton>
    </div>

    <LoginSheet
      open={loginOpen}
      onClose={() => setLoginOpen(false)}
      onSuccess={(provider) => {
        loginMockUser(provider)
        setLoginOpen(false)
        setTimeout(() => setSheetOpen(true), 400)
      }}
    />
    <SajuInputSheet
      open={sheetOpen}
      onClose={() => setSheetOpen(false)}
      initialData={user.birthDate ?? undefined}
      onSuccess={() => setLoadingOpen(true)}
    />
    <LoadingOverlay
      open={loadingOpen}
      name={user.birthDate?.name ?? ""}
      onDone={() => { setLoadingOpen(false); setRevealOpen(true) }}
    >
      <IljuMarquee />
    </LoadingOverlay>
    {user.birthDate && (
      <SajuRevealOverlay
        open={revealOpen}
        birthDate={user.birthDate}
        onClose={() => setRevealOpen(false)}
        onRetry={() => {
          setRevealOpen(false)
          logoutMockUser()
          setTimeout(() => setSheetOpen(true), 300)
        }}
      />
    )}
    </>
  )
}
