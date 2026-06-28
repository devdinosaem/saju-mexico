"use client"
import { ILJU_TYPES } from "@/lib/ilju-types"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import { ELEMENT_THEME, attackPower, attackCost } from "@/lib/ilju-calc"
import { SajuTILogo } from "@/components/logo"
import {
  DoodleWood, DoodleFlameFive, DoodleEarth, DoodleMetal, DoodleWater, DoodleStar,
} from "@/components/doodles"

const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }

const ELEMENT_STICKER_LG: Record<string, React.ReactNode> = {
  "목(木)": <DoodleWood className="w-8 h-8" />,
  "화(火)": <DoodleFlameFive className="w-8 h-8" />,
  "토(土)": <DoodleEarth className="w-8 h-8" />,
  "금(金)": <DoodleMetal className="w-8 h-8" />,
  "수(水)": <DoodleWater className="w-8 h-8" />,
}
const ELEMENT_DOODLE: Record<string, React.FC<{ className?: string }>> = {
  "목(木)": DoodleWood, "화(火)": DoodleFlameFive, "토(土)": DoodleEarth,
  "금(金)": DoodleMetal, "수(水)": DoodleWater,
}
const GOLD_FRAME = "linear-gradient(145deg, #F3E8B8, #C9A84C 45%, #E8D9A0)"
const HOLO_FOIL = "conic-gradient(from 0deg, #ff5f6d, #ffc371, #47e891, #4facfe, #b06ab3, #ff5f6d)"
const GLOSS_STREAK = "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)"

function Emblem({ element, box, inner }: { element: string; box: number; inner: string }) {
  const t = ELEMENT_THEME[element] ?? ELEMENT_THEME["목(木)"]
  const Doodle = ELEMENT_DOODLE[element] ?? DoodleWood
  return (
    <span className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{ width: box, height: box, background: `${t.accent}26`, border: `1.5px solid ${t.accent}` }}>
      <Doodle className={inner} />
    </span>
  )
}

const CARD_H = 560

export default function CardComparePage() {
  const ilju = ILJU_TYPES.find(t => t.id === "갑자-m")!
  const theme = ELEMENT_THEME[ilju.stemElement]
  const svgFn = ILJU_SVG_ICONS[ilju.id]
  const svg = svgFn ? svgFn() : null
  const cardNo = String(ILJU_TYPES.findIndex(t => t.id === ilju.id) + 1).padStart(3, "0")
  const bestMatchIlju = ILJU_TYPES.find(t => t.id === ilju.bestMatch)
  const isYang = ilju.yinyang.startsWith("양")
  const name = "김한샘"

  return (
    <div className="min-h-dvh bg-cream py-6 px-4">
      <p className="text-center text-[13px] font-bold text-charcoal/40 mb-6 tracking-wider" style={BINGGRAE}>
        ← BEFORE · · · AFTER →
      </p>
      <div className="flex gap-4 items-start justify-center overflow-x-auto pb-6">

        {/* ── BEFORE (이전 디자인) ── */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <p className="text-[11px] font-bold text-charcoal/40 mb-1" style={BINGGRAE}>이전</p>
          <div
            className="w-[220px] rounded-2xl border-2 border-charcoal/10 overflow-hidden flex flex-col bg-white"
            style={{ boxShadow: "4px 4px 0 rgba(45,45,45,0.10)", height: CARD_H }}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between px-3 shrink-0" style={{ background: theme.bg, height: 52 }}>
              <div className="flex items-center gap-1">
                <SajuTILogo className="w-4 h-4" />
                <span className="text-[10px] font-bold text-charcoal/50" style={BINGGRAE}>SAJUPLAY</span>
              </div>
              <p className="text-[14px] text-charcoal leading-tight text-center" style={BINGGRAE}>
                {name}<span className="text-[11px] text-charcoal/60 ml-0.5">({ilju.ilju}일주)</span>
              </p>
              <div className="flex flex-col items-end gap-0.5">
                <p className="text-[10px] text-charcoal/70 leading-none">
                  {"★".repeat(ilju.rarity)}{"☆".repeat(5 - ilju.rarity)}
                </p>
                <p className="text-[8px] text-charcoal/40" style={BINGGRAE}>{ilju.stemElement}</p>
              </div>
            </div>
            {/* 캐릭터 */}
            <div className="flex-1 relative min-h-0 overflow-hidden flex items-end justify-center"
              style={{ background: `radial-gradient(ellipse at 50% 70%, white 15%, ${theme.bg} 100%)` }}>
              <div className="absolute inset-2 rounded-xl pointer-events-none" style={{ border: `1.5px solid ${theme.accent}40` }} />
              <div className="absolute top-2 right-3 opacity-[0.07]" style={{ transform: "rotate(12deg) scale(2.5)" }}>
                {ELEMENT_STICKER_LG[ilju.stemElement]}
              </div>
              {svg ? <div className="w-[160px] h-[180px] relative z-10">{svg}</div> : <span className="text-[60px]">{ilju.emoji}</span>}
            </div>
            {/* 구분선 */}
            <div style={{ height: 3, background: theme.accent, opacity: 0.4 }} />
            {/* 이름+태그라인 */}
            <div className="bg-white px-3 pt-2 pb-1.5 shrink-0">
              <div className="flex items-center gap-1">
                <DoodleStar className="w-4 h-4 shrink-0" />
                <p className="text-[14px] leading-tight text-charcoal" style={BINGGRAE}>{ilju.name}</p>
              </div>
              <p className="text-[10px] text-charcoal/60 mt-0.5" style={BINGGRAE}>&ldquo;{ilju.tagline}&rdquo;</p>
            </div>
            {/* 스킬 */}
            <div className="bg-white px-3 pt-1 pb-1 shrink-0 border-t-2 border-charcoal/10">
              {ilju.strengths.map((s, i) => (
                <div key={s} className={`flex items-center gap-1.5 py-1 ${i < ilju.strengths.length - 1 ? "border-b border-charcoal/6" : ""}`}>
                  <DoodleWood className="w-3 h-3 opacity-60 shrink-0" />
                  <p className="flex-1 text-[11px] text-charcoal" style={BINGGRAE}>{s}</p>
                  <p className="text-[9px] text-charcoal/35 tracking-widest" style={BINGGRAE}>MAX</p>
                </div>
              ))}
              <div className="flex items-center justify-between mt-1 pt-1 border-t border-charcoal/8">
                <p className="text-[9px] text-charcoal/35" style={BINGGRAE}>SAJUPLAY</p>
                <p className="text-[9px] text-charcoal/35" style={BINGGRAE}>{ilju.ilju} · {cardNo}/120</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── AFTER (새 디자인) ── */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <p className="text-[11px] font-bold text-pink mb-1" style={BINGGRAE}>신규</p>
          {/* 골드 프레임 */}
          <div className="w-[220px] rounded-2xl" style={{ background: GOLD_FRAME, padding: 4, boxShadow: "4px 4px 0 rgba(45,45,45,0.10)", height: CARD_H }}>
          <div className="w-full h-full rounded-[10px] overflow-hidden flex flex-col bg-white">
            {/* 헤더 */}
            <div className="flex items-center justify-between px-2.5 shrink-0" style={{ background: theme.bg, height: 52 }}>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full shrink-0" style={{
                ...BINGGRAE,
                background: isYang ? "#2D2D2D" : "#FFF9F0",
                color: isYang ? "#FFF9F0" : "#2D2D2D",
                border: "1.5px solid #2D2D2D",
              }}>{ilju.yinyang}</span>
              <p className="text-[13px] text-charcoal leading-tight text-center truncate px-0.5" style={BINGGRAE}>
                {name}<span className="text-[10px] text-charcoal/60 ml-0.5">({ilju.ilju}일주)</span>
              </p>
              <div className="flex items-center gap-0.5 shrink-0">
                <Emblem element={ilju.stemElement} box={26} inner="w-4 h-4" />
                <Emblem element={ilju.branchElement} box={16} inner="w-2.5 h-2.5" />
              </div>
            </div>
            {/* 캐릭터 */}
            <div className="flex-1 relative min-h-0 overflow-hidden flex items-end justify-center"
              style={{ background: `radial-gradient(ellipse at 50% 70%, white 15%, ${theme.bg} 100%)` }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: HOLO_FOIL, mixBlendMode: "color-dodge", opacity: 0.14 }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: GLOSS_STREAK }} />
              <div className="absolute inset-1.5 rounded-lg pointer-events-none" style={{ border: "1.5px solid transparent", borderImage: `${GOLD_FRAME} 1`, opacity: 0.7 }} />
              <div className="absolute top-2 right-3 opacity-[0.07]" style={{ transform: "rotate(12deg) scale(2.5)" }}>
                {ELEMENT_STICKER_LG[ilju.stemElement]}
              </div>
              {svg ? <div className="w-[160px] h-[180px] relative z-10">{svg}</div> : <span className="text-[60px]">{ilju.emoji}</span>}
            </div>
            {/* 구분선 */}
            <div style={{ height: 3, background: theme.accent, opacity: 0.4 }} />
            {/* 이름+태그라인 */}
            <div className="bg-white px-3 pt-1.5 pb-1 shrink-0">
              <div className="flex items-center gap-1">
                <DoodleStar className="w-4 h-4 shrink-0" />
                <p className="text-[14px] leading-tight text-charcoal" style={BINGGRAE}>{ilju.name}</p>
              </div>
              <p className="text-[10px] text-charcoal/60 mt-0.5" style={BINGGRAE}>&ldquo;{ilju.tagline}&rdquo;</p>
            </div>
            {/* 오행 강조 블록 */}
            <div className="bg-white px-3 pb-1 shrink-0">
              <div className="flex items-center gap-2 rounded-md px-2 py-1" style={{ background: `${theme.bg}80` }}>
                <div className="flex items-center gap-1">
                  <Emblem element={ilju.stemElement} box={22} inner="w-3 h-3" />
                  <div className="leading-tight">
                    <p className="text-[10px] text-charcoal" style={BINGGRAE}>{ilju.stemElement}</p>
                    <p className="text-[7px] text-charcoal/45" style={BINGGRAE}>천간·MAIN</p>
                  </div>
                </div>
                <div className="w-px h-4 bg-charcoal/10" />
                <div className="flex items-center gap-1 opacity-70">
                  <Emblem element={ilju.branchElement} box={16} inner="w-2.5 h-2.5" />
                  <div className="leading-tight">
                    <p className="text-[10px] text-charcoal/80" style={BINGGRAE}>{ilju.branchElement}</p>
                    <p className="text-[7px] text-charcoal/40" style={BINGGRAE}>지지</p>
                  </div>
                </div>
              </div>
            </div>
            {/* 어택 */}
            <div className="bg-white px-3 pt-0.5 pb-1 shrink-0 border-t-2 border-charcoal/10">
              {ilju.strengths.map((s, i) => (
                <div key={s} className={`flex items-center gap-1.5 py-0.5 ${i < ilju.strengths.length - 1 ? "border-b border-charcoal/6" : ""}`}>
                  <span className="flex items-center gap-0.5 shrink-0">
                    {Array.from({ length: attackCost(i) }).map((_, k) => (
                      <Emblem key={k} element={ilju.stemElement} box={13} inner="w-2 h-2" />
                    ))}
                  </span>
                  <p className="flex-1 text-[11px] text-charcoal" style={BINGGRAE}>{s}</p>
                  <p className="text-[13px] text-charcoal tracking-tight" style={BINGGRAE}>{attackPower(i)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between mt-0.5 pt-1 border-t border-charcoal/8">
                <span className="flex items-center gap-0.5">
                  <SajuTILogo className="w-3 h-3" />
                  <p className="text-[9px] text-charcoal/35" style={BINGGRAE}>Illus. SAJUPLAY</p>
                </span>
                <p className="text-[9px] text-charcoal/35" style={BINGGRAE}>{ilju.ilju} · {cardNo}/120</p>
              </div>
            </div>
          </div>
          </div>
        </div>

      </div>

      {/* 설명 */}
      {bestMatchIlju && (
        <div className="max-w-[470px] mx-auto mt-2 rounded-xl border border-charcoal/10 bg-white/50 px-4 py-3">
          <p className="text-[11px] text-charcoal/65 leading-relaxed italic" style={BINGGRAE}>
            &ldquo;{ilju.description}&rdquo;
          </p>
          <div className="flex items-center gap-1.5 pt-2 border-t border-charcoal/8 mt-2">
            <span className="text-[13px]">💫</span>
            <p className="text-[11px] text-charcoal/50" style={BINGGRAE}>가장 잘 맞는 일주</p>
            <p className="text-[11px] text-charcoal ml-auto" style={BINGGRAE}>{bestMatchIlju.ilju}일주 · {bestMatchIlju.name}</p>
          </div>
        </div>
      )}
    </div>
  )
}
