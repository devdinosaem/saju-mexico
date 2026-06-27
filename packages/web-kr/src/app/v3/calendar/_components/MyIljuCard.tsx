"use client"
import { useUser } from "@/lib/UserContext"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import { ELEMENT_THEME } from "@/lib/ilju-calc"
import {
  DoodleWood, DoodleFlameFive, DoodleEarth, DoodleMetal, DoodleWater,
} from "@/components/doodles"

const GAEGU: React.CSSProperties = {
  fontFamily: "'Cafe24Dongdong', var(--font-gaegu), cursive",
  fontSizeAdjust: 0.52,
}

const ELEMENT_STICKER: Record<string, React.ReactNode> = {
  "목(木)": <DoodleWood className="w-6 h-6" />,
  "화(火)": <DoodleFlameFive className="w-6 h-6" />,
  "토(土)": <DoodleEarth className="w-6 h-6" />,
  "금(金)": <DoodleMetal className="w-6 h-6" />,
  "수(水)": <DoodleWater className="w-6 h-6" />,
}

export default function MyIljuCard() {
  const { ilju } = useUser()
  const theme = ilju ? (ELEMENT_THEME[ilju.stemElement] ?? ELEMENT_THEME["목(木)"]) : null
  const svgFn = ilju ? ILJU_SVG_ICONS[ilju.id] : null
  const svg = svgFn ? svgFn() : null

  if (!ilju || !theme) return null

  return (
    <div
      className="rounded-2xl bg-white border-2 border-charcoal overflow-hidden"
      style={{ boxShadow: "2px 2px 0px #2D2D2D" }}
    >
      <div className="flex">
        {/* 캐릭터 영역 */}
        <div
          className="shrink-0 w-[108px] flex items-end justify-center overflow-hidden border-r-2 border-charcoal"
          style={{ background: `radial-gradient(ellipse at 50% 80%, white 10%, ${theme.bg} 100%)` }}
        >
          {svg ? (
            <div style={{ width: 108, height: 118, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <div style={{ width: 100, height: 110, overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                {svg}
              </div>
            </div>
          ) : (
            <span className="text-[48px] pb-2">{ilju.emoji}</span>
          )}
        </div>

        {/* 정보 영역 */}
        <div className="flex-1 px-3.5 py-3 flex flex-col justify-between">
          <div className="flex flex-col gap-1.5">
            <div>
              <p className="text-[20px] leading-tight text-charcoal" style={{ ...GAEGU, fontSizeAdjust: undefined }}>
                {ilju.ilju}일주
              </p>
              <p className="text-[12px] text-text-muted mt-0.5" style={GAEGU}>{ilju.name}</p>
            </div>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {ilju.strengths.map(s => (
                <span
                  key={s}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{ background: theme.bg, color: theme.text, borderColor: `${theme.accent}40` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-text-muted leading-tight mt-2" style={GAEGU}>
            &ldquo;{ilju.tagline}&rdquo;
          </p>
        </div>
      </div>

      {/* 오행 푸터 */}
      <div
        className="flex items-center justify-center gap-2 py-2 border-t-2 border-charcoal/20"
        style={{ background: theme.bg }}
      >
        {ELEMENT_STICKER[ilju.stemElement]}
        <span className="text-[11px] font-bold" style={{ ...GAEGU, color: theme.text }}>{ilju.stemElement}의 사람</span>
        {ELEMENT_STICKER[ilju.stemElement]}
      </div>
    </div>
  )
}
