import React from "react"
import { DoodleHeart, DoodleCrown, DoodleMagicWand } from "@/components/doodles"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import CTAButton from "@/components/cta-button"

const WaterDrop = () => (
  <svg viewBox="0 0 14 18" fill="none" width={16} height={20} className="shrink-0">
    <path d="M7 1 C7 1 1 8 1 12.5 A6 6 0 0 0 13 12.5 C13 8 7 1 7 1Z" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="1.2"/>
    <path d="M5 11 Q6 9 8 10" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.7"/>
  </svg>
)

const GAEGU: React.CSSProperties = {
  fontFamily: "'Cafe24Dongdong', var(--font-gaegu), cursive",
  fontSizeAdjust: 0.52,
  letterSpacing: "normal",
}

const ELEM_BG: Record<string, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE",
}

const PAIRS: Array<{
  left: { key: string; elem: string; label: string };
  right: { key: string; elem: string; label: string };
  score: number;
  vibe: string;
  quote: string;
}> = [
  {
    left:  { key: "병오-m", elem: "화", label: "존재감 풀옵션" },
    right: { key: "계묘-f", elem: "수", label: "말랑말랑 독종" },
    score: 41,
    vibe: "lightning",
    quote: "매일 싸우는데 헤어지진 않음 ㅋㅋ",
  },
]

const SQUAD: Array<{ key: string; elem: string; label: string; winner?: boolean }> = [
  { key: "갑자-f", elem: "목", label: "생각은 나중에" },
  { key: "을미-f", elem: "목", label: "인맥 자석" },
  { key: "신미-f", elem: "금", label: "예쁜 쓴소리 담당", winner: true },
  { key: "병자-f", elem: "화", label: "열정 과부하" },
]

function CharIcon({ charKey, elem }: { charKey: string; elem: string }) {
  return (
    <div
      className="w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-charcoal/15 shrink-0 animate-rock"
      style={{ background: ELEM_BG[elem] }}
    >
      {ILJU_SVG_ICONS[charKey]?.(getIljuProfileViewBox(charKey))}
    </div>
  )
}

export function SquadSection() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-[22px] leading-snug text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
          우리 중에 타고난{" "}
          <span className="highlight-pink">공주는 누구?</span>
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          {SQUAD.map(c => (
            <div key={c.key} className="flex flex-col items-center gap-1.5 relative">
              {c.winner && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <DoodleCrown className="w-5 h-5" />
                </div>
              )}
              <div
                className={`rounded-full overflow-hidden shrink-0 ${
                  c.winner
                    ? "w-[54px] h-[54px] border-[2.5px] border-yellow-400 animate-rock"
                    : "w-[44px] h-[44px] border-2 border-charcoal/15"
                }`}
                style={{ background: ELEM_BG[c.elem] }}
              >
                {ILJU_SVG_ICONS[c.key]?.(getIljuProfileViewBox(c.key))}
              </div>
              <p
                className={`text-center leading-tight text-[9px] ${c.winner ? "font-bold text-charcoal" : "text-text-muted"}`}
                style={{ width: c.winner ? 54 : 44, wordBreak: "keep-all" }}
              >{c.label}</p>
            </div>
          ))}
        </div>

        <div className="w-full border-t border-charcoal/10" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 shrink-0">
              <DoodleCrown className="w-4 h-4" />
              <span className="text-[11px] text-text-muted">공주 팔자</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
              <div className="w-[20px] h-[20px] rounded-full overflow-hidden shrink-0 border border-amber-300" style={{ background: ELEM_BG["금"] }}>
                {ILJU_SVG_ICONS["신미-f"]?.(getIljuProfileViewBox("신미-f"))}
              </div>
              <span className="text-[12px] font-bold text-amber-700">예쁜 쓴소리 담당</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 shrink-0">
              <DoodleHeart className="w-4 h-4" />
              <span className="text-[11px] text-text-muted">베스트 궁합</span>
            </div>
            <div className="flex items-center gap-1.5 bg-pink-50 border border-pink-200 rounded-full px-2.5 py-1">
              <div className="w-[20px] h-[20px] rounded-full overflow-hidden shrink-0 border border-pink-200" style={{ background: ELEM_BG["목"] }}>
                {ILJU_SVG_ICONS["을미-f"]?.(getIljuProfileViewBox("을미-f"))}
              </div>
              <span className="text-[11px] text-text-muted">인맥 자석</span>
              <DoodleHeart className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[12px] font-bold text-pink-500">98%</span>
              <span className="text-[11px] text-text-muted">열정 과부하</span>
              <div className="w-[20px] h-[20px] rounded-full overflow-hidden shrink-0 border border-pink-200" style={{ background: ELEM_BG["화"] }}>
                {ILJU_SVG_ICONS["병자-f"]?.(getIljuProfileViewBox("병자-f"))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTAButton>
        <span className="w-6 h-6 flex items-center justify-center shrink-0">
          <DoodleMagicWand className="w-5 h-5" />
        </span>
        친구랑 무료 궁합 보기
        <span className="w-6 h-6 flex items-center justify-center shrink-0">
          <DoodleMagicWand className="w-5 h-5" />
        </span>
      </CTAButton>
    </div>
  )
}

export function PairsSection() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-[22px] leading-snug text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
          우리 궁합, <span className="highlight-pink">밤티</span>인 거 아니지..?
        </p>
        <p className="text-[12px] text-text-muted mt-0.5">사주로 보는 두 사람의 에너지 충돌</p>
      </div>

      {PAIRS.map((pair, i) => (
        <div
          key={`b-${i}`}
          className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-1.5 w-[68px]">
              <CharIcon charKey={pair.left.key} elem={pair.left.elem} />
              <p className="text-[11px] font-bold text-charcoal text-center leading-tight">{pair.left.label}</p>
            </div>

            <div
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-bold"
              style={pair.vibe === "heart"
                ? { background: "#FFE4EA", color: "#E84B6A" }
                : { background: "#FEF3C7", color: "#D97706" }
              }
            >
              <span>{pair.vibe === "heart" ? "♥" : "⚡"}</span>
              <span>{pair.score}%</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 w-[68px]">
              <CharIcon charKey={pair.right.key} elem={pair.right.elem} />
              <p className="text-[11px] font-bold text-charcoal text-center leading-tight">{pair.right.label}</p>
            </div>
          </div>

          <p className="text-[12px] text-text-sub text-center leading-snug">
            &ldquo;{pair.quote}&rdquo;
          </p>
        </div>
      ))}

      <CTAButton>
        <span className="w-6 h-6 flex items-center justify-center shrink-0">
          <WaterDrop />
        </span>
        칼로 물베듯 궁합보기
        <span className="w-6 h-6 flex items-center justify-center shrink-0">
          <WaterDrop />
        </span>
      </CTAButton>
    </div>
  )
}

export default function CompatibilityCards() {
  return (
    <>
      <SquadSection />
      <PairsSection />
    </>
  )
}
