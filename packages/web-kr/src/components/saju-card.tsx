import { type IljuType, ILJU_TYPES } from "@/lib/ilju-types"
import { ELEMENT_THEME } from "@/lib/ilju-calc"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import { SajuTILogo } from "@/components/logo"
import {
  DoodleWood, DoodleFlameFive, DoodleEarth, DoodleMetal, DoodleWater, DoodleStar,
} from "@/components/doodles"

const BINGGRAE: React.CSSProperties = {
  fontFamily: "'BinggraeTaom', sans-serif",
  fontWeight: 700,
}

const STICKER: Record<string, React.ReactNode> = {
  "목(木)": <DoodleWood className="w-8 h-8" />,
  "화(火)": <DoodleFlameFive className="w-8 h-8" />,
  "토(土)": <DoodleEarth className="w-8 h-8" />,
  "금(金)": <DoodleMetal className="w-8 h-8" />,
  "수(水)": <DoodleWater className="w-8 h-8" />,
}

type Props = {
  ilju: IljuType
  name: string
  className?: string
  style?: React.CSSProperties
}

export default function SajuCard({ ilju, name, className, style }: Props) {
  const theme = ELEMENT_THEME[ilju.stemElement] ?? ELEMENT_THEME["목(木)"]
  const svgFn = ILJU_SVG_ICONS[ilju.id]
  const svg = svgFn ? svgFn() : null
  const cardNo = String(ILJU_TYPES.findIndex(t => t.id === ilju.id) + 1).padStart(3, "0")

  return (
    <div
      className={`rounded-2xl border-2 border-charcoal/10 overflow-hidden flex flex-col bg-white ${className ?? ""}`}
      style={{ boxShadow: "4px 4px 0 rgba(45,45,45,0.10)", ...style }}
    >
      {/* 헤더 */}
      <div
        className="flex items-center justify-between px-3 shrink-0"
        style={{ background: theme.bg, height: 52 }}
      >
        <div className="flex items-center gap-1">
          <SajuTILogo className="w-4 h-4" />
          <span className="text-[10px] font-bold text-charcoal/50" style={BINGGRAE}>사주TI</span>
        </div>
        <p className="text-[17px] text-charcoal leading-tight text-center truncate px-1" style={BINGGRAE}>
          <span style={{ fontWeight: 900 }}>{name}</span>
          <span className="text-[13px] text-charcoal/60 ml-0.5" style={{ fontWeight: 700 }}>({ilju.ilju}일주)</span>
        </p>
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          <p className="text-[10px] text-charcoal/70">{"★".repeat(ilju.rarity)}{"☆".repeat(5 - ilju.rarity)}</p>
          <p className="text-[8px] text-charcoal/40" style={BINGGRAE}>{ilju.stemElement}</p>
        </div>
      </div>

      {/* 캐릭터 씬 */}
      <div
        className="flex-1 relative min-h-0 overflow-hidden flex items-end justify-center"
        style={{ background: `radial-gradient(ellipse at 50% 70%, white 15%, ${theme.bg} 100%)` }}
      >
        <div
          className="absolute inset-2 rounded-xl pointer-events-none"
          style={{ border: `1.5px solid ${theme.accent}40` }}
        />
        <div
          className="absolute top-2 right-3 opacity-[0.07]"
          style={{ transform: "rotate(12deg) scale(2.5)" }}
        >
          {STICKER[ilju.stemElement]}
        </div>
        {svg ? (
          <div className="w-[180px] h-[210px] relative z-10">{svg}</div>
        ) : (
          <span className="text-[80px]">{ilju.emoji}</span>
        )}
      </div>

      {/* 오행 구분선 */}
      <div style={{ height: 3, background: theme.accent, opacity: 0.4 }} />

      {/* 이름 + 태그라인 */}
      <div className="bg-white px-4 pt-2 pb-1.5 shrink-0">
        <div className="flex items-center gap-1">
          <DoodleStar className="w-4 h-4 shrink-0" />
          <p className="text-[16px] leading-tight text-charcoal" style={BINGGRAE}>{ilju.name}</p>
        </div>
        <p className="text-[11px] text-charcoal/60 mt-0.5" style={BINGGRAE}>
          &ldquo;{ilju.tagline}&rdquo;
        </p>
      </div>

      {/* 스킬 */}
      <div className="bg-white px-4 pt-1 pb-1 shrink-0 border-t-2 border-charcoal/10">
        {ilju.strengths.map((s, i) => (
          <div
            key={s}
            className={`flex items-center gap-1.5 py-1 ${i < ilju.strengths.length - 1 ? "border-b border-charcoal/6" : ""}`}
          >
            <DoodleWood className="w-3 h-3 opacity-60 shrink-0" />
            <p className="flex-1 text-[12px] text-charcoal" style={BINGGRAE}>{s}</p>
            <p className="text-[9px] text-charcoal/35 tracking-widest" style={BINGGRAE}>MAX</p>
          </div>
        ))}
        <div className="flex items-center justify-between mt-1 pt-1 border-t border-charcoal/8">
          <p className="text-[9px] text-charcoal/35" style={BINGGRAE}>사주TI</p>
          <p className="text-[9px] text-charcoal/35" style={BINGGRAE}>{ilju.ilju} · {cardNo}/120</p>
        </div>
      </div>
    </div>
  )
}
