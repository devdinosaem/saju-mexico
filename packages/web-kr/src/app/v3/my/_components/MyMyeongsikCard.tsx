"use client"
import { useUser } from "@/lib/UserContext"
import { calcSajuPillars, calcElementDistribution, type Pillar } from "@/lib/calcSaju"
import { DoodleTaegeuk, DoodleSprout, DoodleFire, DoodleEarth, DoodleDiamond, DoodleWave, DoodlePencil } from "@/components/doodles"

/* 디자인 계약(saju-play): 두들 Ico · 14px floor · 메인 핑크 · 이모지 금지 */
const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
const PINK = "#E84B6A"

type Elem = "목" | "화" | "토" | "금" | "수"
type DoodleC = React.FC<{ className?: string }>
const ELEMS: Elem[] = ["목", "화", "토", "금", "수"]
const ELEM_BG: Record<Elem, string> = { 목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE" }
const ELEM_DARK: Record<Elem, string> = { 목: "#047857", 화: "#DC2626", 토: "#B45309", 금: "#475569", 수: "#2563EB" }
const ELEM_FILL: Record<Elem, string> = { 목: "#4ADE80", 화: "#F87171", 토: "#FBBF24", 금: "#94A3B8", 수: "#60A5FA" }
const ELEM_DOODLE: Record<Elem, DoodleC> = { 목: DoodleSprout, 화: DoodleFire, 토: DoodleEarth, 금: DoodleDiamond, 수: DoodleWave }
const short = (long: string): Elem => long[0] as Elem  // "목(木)" → "목"

function Ico({ as: D, size = 18 }: { as: DoodleC; size?: number }) {
  return <span className="inline-flex items-center justify-center shrink-0 align-middle" style={{ width: size, height: size }}><D className="w-full h-full" /></span>
}

function Glyph({ char, elem, highlight }: { char: string; elem: Elem; highlight?: boolean }) {
  return (
    <div
      className="w-full rounded-xl flex items-center justify-center border-2"
      style={{
        aspectRatio: "1", maxWidth: 60,
        background: ELEM_BG[elem],
        borderColor: highlight ? PINK : "rgba(45,45,45,0.08)",
      }}
    >
      <span className="text-[26px] leading-none" style={{ color: ELEM_DARK[elem], ...BINGGRAE }}>{char}</span>
    </div>
  )
}

function EmptyGlyph() {
  return (
    <div className="w-full rounded-xl flex items-center justify-center border-2 border-dashed border-charcoal/15"
      style={{ aspectRatio: "1", maxWidth: 60, background: "#F8FAFC" }}>
      <span className="text-[22px] text-charcoal/25" style={BINGGRAE}>?</span>
    </div>
  )
}

function PillarCol({ title, pillar, highlight }: { title: string; pillar: Pillar | null; highlight?: boolean }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
      <span className="text-[12px]" style={{ color: highlight ? PINK : "#94A3B8", ...BINGGRAE }}>{title}</span>
      {pillar ? (
        <>
          <Glyph char={pillar.label[0]} elem={short(pillar.stemElement)} highlight={highlight} />
          <Glyph char={pillar.label[1]} elem={short(pillar.branchElement)} highlight={highlight} />
        </>
      ) : (
        <><EmptyGlyph /><EmptyGlyph /></>
      )}
    </div>
  )
}

export default function MyMyeongsikCard({ onEdit }: { onEdit?: () => void }) {
  const { user, ilju } = useUser()
  const bd = user.birthDate

  // ── 생년월일 없음 → 안내 ──
  if (!bd) {
    return (
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleTaegeuk} size={18} /> 내 명식</p>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-6 flex flex-col items-center gap-3 text-center">
          <Ico as={DoodleTaegeuk} size={36} />
          <p className="text-[14px] text-charcoal/70" style={GAEGU}>생년월일을 입력하면<br />내 사주팔자(명식)를 볼 수 있어요</p>
          <button onClick={onEdit} className="px-5 h-[44px] rounded-2xl flex items-center justify-center gap-1.5 active:opacity-85 transition-opacity border-2 border-charcoal text-[14px]"
            style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
            <Ico as={DoodlePencil} size={16} /> 생년월일 입력하기
          </button>
        </div>
      </div>
    )
  }

  const pillars = calcSajuPillars(bd.year, bd.month, bd.day, bd.hour, bd.minute, bd.ampm)
  const dist = calcElementDistribution(pillars)
  const maxPct = Math.max(...ELEMS.map(e => dist[`${e}(${{ 목: "木", 화: "火", 토: "土", 금: "金", 수: "水" }[e]})`] ?? 0))
  const pctOf = (e: Elem) => dist[`${e}(${{ 목: "木", 화: "火", 토: "土", 금: "金", 수: "水" }[e]})`] ?? 0

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleTaegeuk} size={18} /> 내 명식</p>
        <div className="flex items-center gap-2">
          {ilju && <span className="text-[12px] text-text-muted" style={BINGGRAE}>{ilju.ilju}일주 · {ilju.name}</span>}
          <button onClick={onEdit} className="text-[12px] text-charcoal/45 flex items-center gap-0.5 active:opacity-60" style={BINGGRAE}>
            <Ico as={DoodlePencil} size={12} /> 수정
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-4">
        {/* 사주팔자 4기둥 */}
        <div className="flex gap-2">
          <PillarCol title="년주" pillar={pillars.year} />
          <PillarCol title="월주" pillar={pillars.month} />
          <PillarCol title="일주" pillar={pillars.day} highlight />
          <PillarCol title="시주" pillar={pillars.hour} />
        </div>
        {!pillars.hasTime && (
          <p className="text-[12px] text-text-muted text-center -mt-1" style={GAEGU}>시간 미입력 — 시주 제외(사주육자) 기준</p>
        )}

        <div className="border-t border-charcoal/8" />

        {/* 오행 분포 */}
        <div className="flex flex-col gap-2">
          <p className="text-[14px] text-charcoal" style={BINGGRAE}>오행 분포</p>
          {ELEMS.map(e => {
            const pct = pctOf(e)
            return (
              <div key={e} className="flex items-center gap-2.5">
                <Ico as={ELEM_DOODLE[e]} size={16} />
                <span className="w-4 text-[14px] font-bold text-charcoal shrink-0">{e}</span>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${maxPct ? (pct / maxPct) * 100 : 0}%`, background: ELEM_FILL[e] }} />
                </div>
                <span className="w-9 text-[14px] text-text-muted text-right shrink-0 tabular-nums">{pct}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
