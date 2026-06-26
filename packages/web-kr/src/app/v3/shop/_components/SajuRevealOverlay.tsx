"use client"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { SajuTILogo } from "@/components/logo"
import {
  DoodleWood, DoodleFlameFive, DoodleEarth, DoodleMetal, DoodleWater,
  DoodleStar,
} from "@/components/doodles"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import { calcIlju, ELEMENT_THEME, attackPower, attackCost } from "@/lib/ilju-calc"
import { ILJU_TYPES } from "@/lib/ilju-types"
import { saveMockIlju, type MockBirthDate } from "@/lib/mockAuth"

const BINGGRAE: React.CSSProperties = {
  fontFamily: "'BinggraeTaom', sans-serif",
  fontWeight: 700,
}

// 메탈릭 골드 프레임
const GOLD_FRAME = "linear-gradient(145deg, #F3E8B8, #C9A84C 45%, #E8D9A0)"
// 정적 홀로 포일 (무지개 conic)
const HOLO_FOIL =
  "conic-gradient(from 0deg, #ff5f6d, #ffc371, #47e891, #4facfe, #b06ab3, #ff5f6d)"
// 대각선 글로시 streak
const GLOSS_STREAK =
  "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)"

const ELEMENT_STICKER_LG: Record<string, React.ReactNode> = {
  "목(木)": <DoodleWood className="w-8 h-8" />,
  "화(火)": <DoodleFlameFive className="w-8 h-8" />,
  "토(土)": <DoodleEarth className="w-8 h-8" />,
  "금(金)": <DoodleMetal className="w-8 h-8" />,
  "수(水)": <DoodleWater className="w-8 h-8" />,
}

const ELEMENT_DOODLE: Record<string, React.FC<{ className?: string }>> = {
  "목(木)": DoodleWood,
  "화(火)": DoodleFlameFive,
  "토(土)": DoodleEarth,
  "금(金)": DoodleMetal,
  "수(水)": DoodleWater,
}

// 오행 에너지 엠블럼 — accent 링 + 도들 (포켓몬 타입/에너지 심볼)
function Emblem({
  element,
  box,
  inner,
  ring = true,
}: {
  element: string
  box: number
  inner: string
  ring?: boolean
}) {
  const t = ELEMENT_THEME[element] ?? ELEMENT_THEME["목(木)"]
  const Doodle = ELEMENT_DOODLE[element] ?? DoodleWood
  return (
    <span
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{
        width: box,
        height: box,
        background: `${t.accent}26`,
        border: ring ? `1.5px solid ${t.accent}` : "none",
      }}
    >
      <Doodle className={inner} />
    </span>
  )
}

type Props = {
  open: boolean
  birthDate: MockBirthDate
  onClose: () => void
  onRetry: () => void
}

export default function SajuRevealOverlay({ open, birthDate, onClose, onRetry }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const ilju = calcIlju(birthDate.year, birthDate.month, birthDate.day, birthDate.gender)
  useEffect(() => {
    if (open) saveMockIlju(ilju.id)
  }, [open, ilju.id])

  if (!open || !mounted) return null

  const theme = ELEMENT_THEME[ilju.stemElement] ?? ELEMENT_THEME["목(木)"]
  const svgFn = ILJU_SVG_ICONS[ilju.id]
  const svg = svgFn ? svgFn() : null
  const cardNo = String(ILJU_TYPES.findIndex(t => t.id === ilju.id) + 1).padStart(3, "0")
  const bestMatchIlju = ILJU_TYPES.find(t => t.id === ilju.bestMatch)
  const isYang = ilju.yinyang.startsWith("양")

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: `${birthDate.name}님의 ${ilju.ilju}일주`, url: window.location.href })
        .catch(() => {})
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[200] bg-cream flex flex-col">
      <div className="w-full max-w-[430px] mx-auto flex flex-col h-full">

        {/* 닫기 */}
        <div className="flex justify-end px-4 pt-3 pb-1 shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-charcoal/8 flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="text-[16px] text-charcoal/50 leading-none">✕</span>
          </button>
        </div>

        {/* 카드 + 설명 그룹 */}
        <div className="flex-1 flex flex-col justify-center min-h-0 px-5">
          {/* 메탈릭 골드 프레임 래퍼 */}
          <div
            className="card-reveal w-full rounded-2xl"
            style={{ background: GOLD_FRAME, padding: 5, boxShadow: "4px 4px 0 rgba(45,45,45,0.10)", height: "min(560px, calc(100dvh - 240px))" }}
          >
          <div className="w-full h-full rounded-[12px] overflow-hidden flex flex-col bg-white">

            {/* ① 헤더 — 음양 배지 + 일주명 + 오행 엠블럼 */}
            <div
              className="flex items-center justify-between px-3 shrink-0"
              style={{ background: theme.bg, height: 52 }}
            >
              {/* 음양 스테이지 배지 */}
              <span
                className="text-[10px] leading-none px-2 py-1 rounded-full shrink-0"
                style={{
                  ...BINGGRAE,
                  background: isYang ? "#2D2D2D" : "#FFF9F0",
                  color: isYang ? "#FFF9F0" : "#2D2D2D",
                  border: "1.5px solid #2D2D2D",
                }}
              >
                {ilju.yinyang}
              </span>
              <p className="text-[18px] text-charcoal leading-tight text-center truncate px-1" style={BINGGRAE}>
                {birthDate.name}
                <span className="text-[13px] text-charcoal/60 ml-1">({ilju.ilju}일주)</span>
              </p>
              {/* 오행 엠블럼 — 천간(메인, 크게) + 지지(작게) */}
              <div className="flex items-center gap-0.5 shrink-0">
                <Emblem element={ilju.stemElement} box={32} inner="w-5 h-5" />
                <Emblem element={ilju.branchElement} box={20} inner="w-3 h-3" />
              </div>
            </div>

            {/* ② 캐릭터 — 오행 그라디언트 씬 + 메탈릭 이너프레임 + 포일 + 글로스 */}
            <div
              className="flex-1 relative min-h-0 overflow-hidden flex items-end justify-center"
              style={{
                background: `radial-gradient(ellipse at 50% 70%, white 15%, ${theme.bg} 100%)`,
              }}
            >
              {/* 정적 홀로 포일 */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: HOLO_FOIL, mixBlendMode: "color-dodge", opacity: 0.14 }}
              />
              {/* 대각선 글로시 streak */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: GLOSS_STREAK }} />
              {/* 메탈릭 이너프레임 */}
              <div
                className="absolute inset-2 rounded-xl pointer-events-none"
                style={{ border: "2px solid transparent", borderImage: `${GOLD_FRAME} 1`, opacity: 0.7 }}
              />
              {/* 배경 두들 워터마크 */}
              <div className="absolute top-2 right-3 opacity-[0.07]" style={{ transform: "rotate(12deg) scale(2.5)" }}>
                {ELEMENT_STICKER_LG[ilju.stemElement]}
              </div>
              <div className="absolute bottom-[230px] left-2 opacity-[0.06]" style={{ transform: "rotate(-8deg) scale(2)" }}>
                {ELEMENT_STICKER_LG[ilju.stemElement]}
              </div>

              {svg ? (
                <div className="w-[220px] h-[240px] relative z-10">{svg}</div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-[80px]">{ilju.emoji}</span>
                </div>
              )}
            </div>

            {/* 오행 구분선 */}
            <div style={{ height: 3, background: theme.accent, opacity: 0.4 }} />

            {/* ③ 이름 + 태그라인 */}
            <div className="bg-white px-4 pt-2 pb-1.5 shrink-0">
              <div className="flex items-center gap-1.5">
                <DoodleStar className="w-5 h-5 shrink-0" />
                <p className="text-[19px] leading-tight text-charcoal" style={BINGGRAE}>{ilju.name}</p>
              </div>
              <p className="text-[12px] text-charcoal/60 mt-0.5" style={BINGGRAE}>
                &ldquo;{ilju.tagline}&rdquo;
              </p>
            </div>

            {/* ④ 오행 강조 블록 — 천간(메인) + 지지(보조) */}
            <div className="bg-white px-4 pb-1.5 shrink-0">
              <div className="flex items-center gap-3 rounded-lg px-3 py-1.5" style={{ background: `${theme.bg}80` }}>
                <div className="flex items-center gap-1.5">
                  <Emblem element={ilju.stemElement} box={28} inner="w-4 h-4" />
                  <div className="leading-tight">
                    <p className="text-[13px] text-charcoal" style={BINGGRAE}>{ilju.stemElement}</p>
                    <p className="text-[8px] text-charcoal/45 tracking-wider" style={BINGGRAE}>천간 · MAIN</p>
                  </div>
                </div>
                <div className="w-px h-6 bg-charcoal/10" />
                <div className="flex items-center gap-1.5 opacity-70">
                  <Emblem element={ilju.branchElement} box={22} inner="w-3 h-3" />
                  <div className="leading-tight">
                    <p className="text-[12px] text-charcoal/80" style={BINGGRAE}>{ilju.branchElement}</p>
                    <p className="text-[8px] text-charcoal/40 tracking-wider" style={BINGGRAE}>지지</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ⑤ 어택 섹션 — 강점을 코스트+데미지로 */}
            <div className="bg-white px-4 pt-0.5 pb-1 shrink-0 border-t-2 border-charcoal/10">
              {ilju.strengths.map((s, i) => (
                <div
                  key={s}
                  className={`flex items-center gap-2 py-1 ${i < ilju.strengths.length - 1 ? "border-b border-charcoal/6" : ""}`}
                >
                  <span className="flex items-center gap-0.5 shrink-0">
                    {Array.from({ length: attackCost(i) }).map((_, k) => (
                      <Emblem key={k} element={ilju.stemElement} box={16} inner="w-2.5 h-2.5" />
                    ))}
                  </span>
                  <p className="flex-1 text-[13px] text-charcoal" style={BINGGRAE}>{s}</p>
                  <p className="text-[16px] text-charcoal tracking-tight" style={BINGGRAE}>{attackPower(i)}</p>
                </div>
              ))}
              {/* ⑥ 인포바 */}
              <div className="flex items-center justify-between mt-0.5 pt-1 border-t border-charcoal/8">
                <span className="flex items-center gap-1">
                  <SajuTILogo className="w-3.5 h-3.5" />
                  <p className="text-[10px] text-charcoal/35" style={BINGGRAE}>Illus. 사주TI</p>
                </span>
                <p className="text-[10px] text-charcoal/35" style={BINGGRAE}>{ilju.ilju} · {cardNo}/120</p>
              </div>
            </div>

          </div>
          </div>

          {/* 카드 하단 설명 */}
          <div className="pt-4 pb-1 shrink-0">
          <div className="rounded-xl border border-charcoal/10 bg-white/50 px-4 py-3 space-y-2">
            <p className="text-[11px] text-charcoal/65 leading-relaxed italic" style={BINGGRAE}>
              &ldquo;{ilju.description}&rdquo;
            </p>
            {bestMatchIlju && (
              <div className="flex items-center gap-1.5 pt-2 border-t border-charcoal/8">
                <span className="text-[13px]">💫</span>
                <p className="text-[11px] text-charcoal/50" style={BINGGRAE}>가장 잘 맞는 일주</p>
                <p className="text-[11px] text-charcoal ml-auto" style={BINGGRAE}>
                  {bestMatchIlju.ilju}일주 · {bestMatchIlju.name}
                </p>
              </div>
            )}
          </div>
          </div>
        </div>

        {/* 공유 버튼 */}
        <div className="px-5 pb-8 pt-3 shrink-0">
          <button
            onClick={handleShare}
            className="w-full h-[46px] rounded-xl bg-pink border-2 border-charcoal text-cream text-[15px] font-bold active:opacity-85 transition-opacity"
            style={BINGGRAE}
          >
            공유하기
          </button>
        </div>

      </div>
    </div>,
    document.body
  )
}
