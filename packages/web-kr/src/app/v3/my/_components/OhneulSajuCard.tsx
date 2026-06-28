"use client"
import { useUser } from "@/lib/UserContext"
import { getDayFortune, type ElemKr } from "@/lib/day-fortune"
import { DoodleSun, DoodleSprout, DoodleFire, DoodleEarth, DoodleDiamond, DoodleWave, DoodleYeopjeon, DoodleHeart, DoodleSparkle } from "@/components/doodles"

/* 디자인 계약(saju-play): 두들 Ico · 14px floor · 메인 핑크 · 이모지 금지 */
const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
const PINK = "#E84B6A"

type Elem = ElemKr
type DoodleC = React.FC<{ className?: string }>
const ELEM_BG: Record<Elem, string> = { 목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE" }
const ELEM_DARK: Record<Elem, string> = { 목: "#047857", 화: "#DC2626", 토: "#B45309", 금: "#475569", 수: "#2563EB" }
const ELEM_DOODLE: Record<Elem, DoodleC> = { 목: DoodleSprout, 화: DoodleFire, 토: DoodleEarth, 금: DoodleDiamond, 수: DoodleWave }

function Ico({ as: D, size = 18 }: { as: DoodleC; size?: number }) {
  return <span className="inline-flex items-center justify-center shrink-0 align-middle" style={{ width: size, height: size }}><D className="w-full h-full" /></span>
}

function Dots({ score, color }: { score: number; color: string }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className="rounded-full" style={{ width: 6, height: 6, background: i <= score ? color : "#E2E8F0" }} />
      ))}
    </span>
  )
}

export default function OhneulSajuCard() {
  const { ilju, hasIlju } = useUser()
  if (!hasIlju || !ilju) return null

  const now = new Date()
  const f = getDayFortune(ilju.hanja, now.getFullYear(), now.getMonth() + 1, now.getDate())
  const el = f.element as Elem

  const stats: { label: string; D: DoodleC; v: number; c: string }[] = [
    { label: "종합", D: DoodleSparkle, v: f.overall, c: PINK },
    { label: "재물", D: DoodleYeopjeon, v: f.money, c: "#B45309" },
    { label: "애정", D: DoodleHeart, v: f.love, c: "#EC4899" },
    { label: "건강", D: DoodleSprout, v: f.health, c: "#10B981" },
  ]

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}>
        <Ico as={DoodleSun} size={18} /> 오늘의 사주
        <span className="text-[12px] text-text-muted ml-1">{now.getMonth() + 1}.{now.getDate()}</span>
      </p>

      <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
        {/* 오늘 간지 + 한마디 */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 border-2"
            style={{ background: ELEM_BG[el], borderColor: "rgba(45,45,45,0.08)" }}>
            <span className="text-[17px] leading-none" style={{ color: ELEM_DARK[el], ...BINGGRAE }}>{f.ganji}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] text-charcoal leading-snug" style={BINGGRAE}>{f.main}</p>
            <p className="text-[13px] text-text-muted leading-snug mt-0.5 flex items-center gap-1" style={GAEGU}>
              <Ico as={ELEM_DOODLE[el]} size={13} /> {f.element} 기운의 날 · {f.tenGodKr}
            </p>
          </div>
        </div>

        {/* 부연 */}
        <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{f.subtext}</p>

        <div className="border-t border-charcoal/8" />

        {/* 분야별 5점 */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {stats.map(s => (
            <div key={s.label} className="flex items-center gap-1.5">
              <Ico as={s.D} size={14} />
              <span className="text-[13px] text-charcoal/70 w-7 shrink-0">{s.label}</span>
              <Dots score={s.v} color={s.c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
