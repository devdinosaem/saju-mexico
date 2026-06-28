"use client"
// ════════════════════════════════════════════════════════════════
// SelfReport — "나 사용설명서" 결과 본문(순수). data + aiText만 받아 렌더.
// 펀널(라이브)·보관함 뷰어(저장본) 공용. 디자인 수정은 여기 한 곳.
// ════════════════════════════════════════════════════════════════
import { useState } from "react"
import Link from "next/link"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { ILJU_TYPES } from "@/lib/ilju-types"
import { ILJU_CELEB_DATA } from "@/lib/ilju-celeb-data"
import { elemOf, ELEMS, type Elem } from "../engine"
import { ELEM_BG, ELEM_COLOR, ELEM_DOODLE } from "../flavor"
import { tgGroup, type SelfData, type LifePoint } from "./self-adapter"
import { TALENT, ELEM_TRAIT, MEETING, LOVE_STYLE, IDEAL, JOB, SELF_MANUAL, SELF_ENV, ELEM_ORGAN, SEUN_LINE, PAST_LIFE, DARK_HIST, MEME, ELEM_FILL } from "./flavor"
import {
  DoodleSparkles, DoodleBook, DoodleKey, DoodleTaegeuk, DoodleHeart,
  DoodleLightning, DoodleMedal, DoodleMirror, DoodleSpeechBubble, DoodleStar,
  DoodleDiamond, DoodleCalendar, DoodleClover, DoodleQuestionMark, DoodleMoon, DoodleCrown,
  DoodleWood, DoodleFlameFive, DoodleEarth, DoodleMetal, DoodleWater, DoodleSparkle,
} from "@/components/doodles"

type DoodleC = React.FC<{ className?: string }>
export const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
export const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
export const PINK = "#E84B6A"

export function Ico({ as: D, size = 18 }: { as: DoodleC; size?: number }) {
  return <span className="inline-flex items-center justify-center shrink-0 align-middle" style={{ width: size, height: size }}><D className="w-full h-full" /></span>
}
function Basis({ t }: { t: string }) {
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] font-bold shrink-0" style={{ background: "#FFF0F5", color: PINK }}><Ico as={DoodleTaegeuk} size={11} /> {t}</span>
}
const SectionTitle = ({ icon, children, basis }: { icon: DoodleC; children: React.ReactNode; basis?: string }) => (
  <div className="flex items-center justify-between gap-2">
    <p className="text-[15px] text-charcoal flex items-center gap-1.5 min-w-0" style={BINGGRAE}><Ico as={icon} size={18} /> {children}</p>
    {basis && <Basis t={basis} />}
  </div>
)
function ChapterDivider({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5 pt-3">
      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0" style={{ background: PINK }}>{n}</span>
      <span className="text-[15px] text-charcoal shrink-0" style={BINGGRAE}>{title}</span>
      <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
    </div>
  )
}
function renderBold(s: string) {
  return s.split(/(\*\*[^*]+\*\*)/g).map((seg, i) => seg.startsWith("**") && seg.endsWith("**")
    ? <strong key={i} className="text-charcoal font-bold">{seg.slice(2, -2)}</strong> : <span key={i}>{seg}</span>)
}
function Prose({ text }: { text: string }) {
  return <div className="flex flex-col gap-2.5">{text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).map((p, i) => <p key={i} className="text-[14px] text-charcoal/85 leading-relaxed">{renderBold(p)}</p>)}</div>
}

const ICON_KEYS = Object.keys(ILJU_SVG_ICONS)
export function resolveChar(id: string): string {
  if (ILJU_SVG_ICONS[id]) return id
  const g = id.endsWith("-f") ? "-f" : "-m", e = elemOf(id)
  const pool = ICON_KEYS.filter(k => k.endsWith(g) && elemOf(k) === e)
  if (pool.length) return pool[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % pool.length]
  return ICON_KEYS.find(k => k.endsWith(g)) ?? ICON_KEYS[0]
}
export function Avatar({ iljuKey, size = 80 }: { iljuKey: string; size?: number }) {
  return <div className="rounded-full overflow-hidden border-2 border-charcoal/15 shrink-0 flex items-center justify-center" style={{ width: size, height: size, background: ELEM_BG[elemOf(iljuKey)] }}>{ILJU_SVG_ICONS[iljuKey]?.(getIljuProfileViewBox(iljuKey))}</div>
}

function LifeGraph({ life }: { life: LifePoint[] }) {
  const W = 320, H = 150, padL = 10, padR = 10, padT = 16, padB = 26
  const n = life.length
  const xs = (i: number) => padL + (n > 1 ? (i / (n - 1)) * (W - padL - padR) : 0)
  const ys = (f: number) => padT + (1 - (Math.max(20, Math.min(95, f)) - 20) / 75) * (H - padT - padB)
  const pts = life.map((l, i) => [xs(i), ys(l.favor)] as const)
  const line = pts.map(p => p.join(",")).join(" ")
  const area = `${padL},${H - padB} ${line} ${xs(n - 1)},${H - padB}`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <polygon points={area} fill="rgba(232,75,106,0.10)" />
      <polyline points={line} fill="none" stroke={PINK} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {life.map((l, i) => {
        const [x, y] = pts[i]
        const top = l.favor >= Math.max(...life.map(p => p.favor))
        return (
          <g key={i}>
            {top && <circle cx={x} cy={y} r={7} fill="none" stroke="#F0A020" strokeWidth={2} />}
            <circle cx={x} cy={y} r={l.current ? 5 : 3.5} fill={l.current ? "#fff" : PINK} stroke={l.current ? PINK : "none"} strokeWidth={l.current ? 2.5 : 0} />
            <text x={x} y={H - 8} textAnchor="middle" fontSize={11} fontWeight={700} fill={l.current ? PINK : "#94A3B8"}>{l.startAge}</text>
          </g>
        )
      })}
    </svg>
  )
}

function Radar({ data }: { data: { label: string; value: number }[] }) {
  const size = 200, c = 100, R = 64, n = data.length
  const pt = (i: number, r: number): [number, number] => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
    return [c + r * Math.cos(a), c + r * Math.sin(a)]
  }
  const ring = (f: number) => data.map((_, i) => pt(i, R * f).join(",")).join(" ")
  const poly = data.map((d, i) => pt(i, R * (Math.max(0, Math.min(100, d.value)) / 100)).join(",")).join(" ")
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto" style={{ width: "100%", maxWidth: 220 }}>
      {[0.25, 0.5, 0.75, 1].map((f, i) => <polygon key={i} points={ring(f)} fill="none" stroke="#E5E7EB" strokeWidth={1} />)}
      {data.map((_, i) => { const [x, y] = pt(i, R); return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#E5E7EB" strokeWidth={1} /> })}
      <polygon points={poly} fill="rgba(232,75,106,0.18)" stroke={PINK} strokeWidth={2} strokeLinejoin="round" />
      {data.map((d, i) => { const [x, y] = pt(i, R + 16); return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={12} fontWeight={700} fill="#2D2D2D">{d.label}</text> })}
    </svg>
  )
}
const clampN = (n: number) => Math.max(22, Math.min(96, Math.round(n)))

const CAT_DOODLE: Record<string, DoodleC> = {
  기업인: DoodleDiamond, 정치인: DoodleSpeechBubble, 배우: DoodleStar, 위인: DoodleCrown,
  왕족: DoodleCrown, 스포츠: DoodleLightning, 노벨상: DoodleMedal, 가수: DoodleSparkles,
}
const CAT_BG: Record<string, string> = {
  기업인: "#FEF3C7", 정치인: "#DBEAFE", 배우: "#FFE9F0", 위인: "#FEF3C7",
  왕족: "#FEF3C7", 스포츠: "#FEE2E2", 노벨상: "#EFEAFE", 가수: "#FFE9F0",
}
function CelebAvatar({ name, cat, size = 52 }: { name: string; cat: string; size?: number }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="rounded-full flex items-center justify-center border-2 border-charcoal/10 shrink-0" style={{ width: size, height: size, background: CAT_BG[cat] ?? "#FFF0F5" }}>
        <Ico as={CAT_DOODLE[cat] ?? DoodleSparkles} size={Math.round(size * 0.5)} />
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/images/celebs/${name.replace(/\s/g, "")}.png`} alt={name} width={size} height={size} onError={() => setFailed(true)}
      className="rounded-full object-cover border-2 border-charcoal/10 shrink-0" style={{ width: size, height: size }} />
  )
}

const TILTS = [-3, 2, -1.5, 3.5, -2.5, 1, -3.5, 2.5, -2, 3, 1.5, -4]
const ELEMENT_STYLE: Record<string, { bg: string; border: string }> = {
  목: { bg: "#D1FAE5", border: "#4ADE80" }, 화: { bg: "#FEE2E2", border: "#F87171" },
  토: { bg: "#FEF3C7", border: "#FBBF24" }, 금: { bg: "#F1F5F9", border: "#94A3B8" }, 수: { bg: "#DBEAFE", border: "#60A5FA" },
}
const STICKER: Record<string, React.ReactNode> = {
  목: <DoodleWood className="w-8 h-8" />, 화: <DoodleFlameFive className="w-8 h-8" />, 토: <DoodleEarth className="w-8 h-8" />,
  금: <DoodleMetal className="w-8 h-8" />, 수: <DoodleWater className="w-8 h-8" />,
}
const NA_STICKERS: { comp: React.ReactNode; top?: number; left?: number; right?: number; bottom?: number; rotate: number }[] = [
  { comp: <DoodleCrown className="w-4 h-4" />, top: 4, left: 4, rotate: -15 },
  { comp: <DoodleHeart className="w-3.5 h-3.5" />, top: 6, right: 5, rotate: 12 },
  { comp: <DoodleStar className="w-3 h-3" />, bottom: 28, left: 5, rotate: -8 },
  { comp: <DoodleSparkle className="w-3 h-3" />, bottom: 30, right: 4, rotate: 10 },
]
function ElemStrip({ elem }: { elem: Elem }) {
  return <div className="flex-1 flex items-center justify-center pt-2 border-t-2 border-charcoal/20" style={{ background: ELEMENT_STYLE[elem]?.bg ?? "#F1F5F9" }}>{STICKER[elem]}</div>
}
function CelebCard({ name, role, cat, elem, idx }: { name: string; role: string; cat: string; elem: Elem; idx: number }) {
  const tilt = TILTS[idx % TILTS.length], mt = idx % 2 === 0 ? 8 : 0
  return (
    <div className="shrink-0 flex flex-col rounded-2xl overflow-hidden" style={{ width: 108, background: "white", border: "2px solid rgba(45,45,45,0.1)", transform: `rotate(${tilt}deg)`, boxShadow: "2px 2px 0px rgba(45,45,45,0.1)", marginTop: mt }}>
      <div className="flex flex-col items-center px-2.5 pt-2.5 pb-1.5 gap-1">
        <CelebAvatar name={name} cat={cat} size={64} />
        <p className="text-[13px] leading-tight text-charcoal text-center font-bold">{name}</p>
        <p className="text-[12px] text-text-muted leading-tight text-center" style={GAEGU}>{role}</p>
      </div>
      <ElemStrip elem={elem} />
    </div>
  )
}
function NaCard({ iljuKey, role, elem, idx }: { iljuKey: string; role: string; elem: Elem; idx: number }) {
  const tilt = TILTS[idx % TILTS.length], mt = idx % 2 === 0 ? 8 : 0
  return (
    <div className="shrink-0 flex flex-col rounded-2xl overflow-hidden relative" style={{ width: 108, background: "#FACC15", border: "2px solid rgba(45,45,45,0.1)", transform: `rotate(${tilt}deg)`, boxShadow: "2px 2px 0px rgba(45,45,45,0.1)", marginTop: mt }}>
      {NA_STICKERS.map((s, i) => <div key={i} className="absolute pointer-events-none" style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom, transform: `rotate(${s.rotate}deg)` }}>{s.comp}</div>)}
      <div className="flex flex-col items-center px-2.5 pt-2.5 pb-1.5 gap-1">
        <div className="w-16 h-16 rounded-full border-2 border-charcoal/20 shrink-0 overflow-hidden flex items-end justify-center" style={{ background: ELEM_BG[elem] }}>
          {ILJU_SVG_ICONS[iljuKey]?.()}
        </div>
        <p className="text-[13px] leading-tight text-charcoal text-center font-bold">나</p>
        <p className="text-[12px] text-charcoal/60 leading-tight text-center" style={GAEGU}>{role}</p>
      </div>
      <ElemStrip elem={elem} />
    </div>
  )
}

/** 무료 표지용 파생 (캐릭터키·일주명·티저) */
export function coverInfo(data: SelfData) {
  const charKey = resolveChar(data.iljuKey)
  const iljuType = ILJU_TYPES.find(t => t.id === data.iljuKey)
  const strongElems = ELEMS.filter(e => data.dist[e] >= 3)
  const weakElems = ELEMS.filter(e => data.dist[e] === 0)
  const teaser = `${data.dayKr}(${data.dayElem})·${data.yinYang} 일간 — ${data.strongLevel}. 강한 기운은 ${strongElems.join("·") || "고른 편"}, 빠진 건 ${weakElems.join("·") || "없음"}.`
  return { charKey, iljuName: iljuType?.name ?? `${data.dayKr}${data.dayElem} 일간`, teaser }
}

// ════════════════════════════════════════════════════════════════
// SelfReport — 본문(순수). aiLoading 시 히어로 스켈레톤, 아니면 Prose(aiText).
// ════════════════════════════════════════════════════════════════
export function SelfReport({ data: self, aiText, aiLoading = false }: { data: SelfData; aiText: string; aiLoading?: boolean }) {
  const charKey = resolveChar(self.iljuKey)
  const iljuType = ILJU_TYPES.find(t => t.id === self.iljuKey)
  const bareIlju = self.iljuKey.replace(/-[mf]$/, "")
  const celeb = ILJU_CELEB_DATA[bareIlju]
  const weakElems = ELEMS.filter(e => self.dist[e] === 0)
  const dominantElem = ELEMS.reduce((a, b) => (self.dist[b] > self.dist[a] ? b : a), "목" as Elem)
  const ego = self.dayElem, persona = dominantElem, sameCore = ego === persona
  const energyPos = self.strongLevel.includes("극신강") ? 90 : self.strongLevel.includes("신강") ? 72
    : self.strongLevel.includes("극신약") ? 8 : self.strongLevel.includes("신약") ? 30 : 50
  const seenLine = `${self.tgGroups.식상 >= 2 ? "표현이 분명하고 끼 있는" : "차분하고 편안한"} 인상${self.tgGroups.관성 >= 2 ? " + 믿음직한 분위기" : ""}${self.dohwa ? " + 묘하게 끌리는 매력" : ""}`
  const meetingOrder = [...ELEMS].sort((a, b) => self.dist[b] - self.dist[a])
  const loveAges = self.life.filter(l => tgGroup(l.tenGod) === "관성").map(l => `${l.startAge}세`)
  const moneyAges = self.life.filter(l => tgGroup(l.tenGod) === "재성").map(l => `${l.startAge}세`)
  const jae = self.tgGroups.재성
  const moneyLine = jae >= 3 ? "돈·실리 감각이 타고난 편 — 현실을 굴려 결과로 만드는 그릇이야."
    : jae >= 1 ? "돈 감각은 무난한 편 — 꾸준히 쌓을수록 그릇이 커져."
    : "돈보다 전문성·관계가 먼저 와. 그게 결국 돈으로 돌아오는 타입이야."
  const cur = self.life.find(l => l.current)
  const curFavorLine = cur ? (cur.favor >= 72 ? "흐름이 트이는 좋은 구간" : cur.favor >= 50 ? "차곡차곡 쌓는 구간" : "눌렸다 펴지기 직전 구간") : "흐름 위"
  const manual = SELF_MANUAL[self.dayElem]
  const env = SELF_ENV[self.yong]
  const burnout = self.isStrong
    ? "혼자 다 짊어지고 폭주할 때가 방전 신호 — 위임·휴식이 약이야."
    : "남 신경 쓰다 나를 소진할 때가 방전 신호 — 거절·경계가 약이야."
  const weakest = ELEMS.reduce((a, b) => (self.dist[b] < self.dist[a] ? b : a), "목" as Elem)
  const seunGroup = self.seunTenGod ? tgGroup(self.seunTenGod) : null
  const curIdx = self.life.findIndex(l => l.current)
  const nextDaeun = curIdx >= 0 ? self.life[curIdx + 1] : undefined
  const d = self.dist, tg = self.tgGroups
  const stats = [
    { label: "추진", value: clampN(34 + d.목 * 13 + tg.비겁 * 8 + (self.isStrong ? 8 : 0)) },
    { label: "매력", value: clampN(34 + d.화 * 10 + tg.식상 * 7 + (self.dohwa ? 22 : 0)) },
    { label: "안정", value: clampN(40 + d.토 * 13 + tg.인성 * 5) },
    { label: "지혜", value: clampN(34 + d.수 * 13 + tg.인성 * 8) },
    { label: "재력", value: clampN(34 + d.금 * 8 + tg.재성 * 14) },
  ]
  const topStat = stats.reduce((a, b) => (b.value > a.value ? b : a))
  const code = [
    self.yinYang === "양" ? "E" : "I",
    (d.목 + d.화) >= (d.금 + d.수) ? "D" : "C",
    self.isStrong ? "L" : "S",
    (tg.식상 + d.화 + d.수) >= (tg.재성 + d.토 + d.금) ? "F" : "T",
  ].join("")
  const meme = MEME[dominantElem]

  return (
    <div className="flex flex-col gap-6">
      {/* 나 정밀 풀이 — 히어로 */}
      <div className="rounded-2xl px-4 py-4 flex flex-col gap-3 border-2 border-charcoal" style={{ background: "linear-gradient(160deg,#FFF6FA,#FFFDF5)", boxShadow: "0 4px 16px rgba(232,75,106,0.08)" }}>
        <div className="flex items-center gap-2">
          <Ico as={DoodleSparkles} size={20} />
          <span className="text-[15px] text-charcoal" style={BINGGRAE}>나 정밀 풀이</span>
          <span className="ml-auto"><Basis t="원국 종합" /></span>
        </div>
        {aiLoading ? (
          <div className="flex flex-col gap-2 py-1">
            {[100, 96, 100, 72].map((w, i) => <div key={i} className="h-3 rounded-full bg-charcoal/10 animate-pulse" style={{ width: `${w}%` }} />)}
            <p className="text-[13px] text-text-muted mt-1">원국을 깊게 읽는 중…</p>
          </div>
        ) : <Prose text={aiText} />}
      </div>

      <ChapterDivider n={1} title="나는 이런 사람" />

      {/* 일주 스펙시트 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleStar} basis="일주">내 스펙시트</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar iljuKey={charKey} size={48} />
            <div>
              <p className="text-[15px] text-charcoal" style={BINGGRAE}>{iljuType?.name ?? `${self.dayKr}${self.dayElem} 일간`}</p>
              <p className="text-[13px] text-text-muted">{self.dayKr}({self.dayElem})·{self.yinYang} 일간</p>
            </div>
          </div>
          {iljuType && (
            <>
              <div className="flex flex-wrap gap-1.5">
                {iljuType.strengths.slice(0, 4).map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full text-[12px] font-bold" style={{ background: "#F0FFF4", color: "#16A34A" }}>{s}</span>
                ))}
              </div>
              {iljuType.weaknesses?.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap gap-1.5">
                    {iljuType.weaknesses.slice(0, 3).map((w, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full text-[12px] font-bold" style={{ background: "#F1F5F9", color: "#94A3B8" }}>{w}</span>
                    ))}
                  </div>
                  <p className="text-[13px] text-charcoal/55 leading-snug" style={GAEGU}>이런 면도 있는데, 알아두면 오히려 다루기 쉬워.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 사주가 같은 사람 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleCrown} basis="일주">사주가 같은 사람</SectionTitle>
        {celeb && celeb.persons.length > 0 ? (() => {
          const cs = celeb.persons.slice(0, 2)
          const naRole = `${bareIlju}일주`
          return (
            <div className="flex justify-center items-start gap-2 pt-2 pb-1">
              {cs.length >= 2 ? (
                <>
                  <CelebCard name={cs[0].name} role={cs[0].role} cat={cs[0].cat} elem={self.dayElem} idx={0} />
                  <NaCard iljuKey={charKey} role={naRole} elem={self.dayElem} idx={1} />
                  <CelebCard name={cs[1].name} role={cs[1].role} cat={cs[1].cat} elem={self.dayElem} idx={2} />
                </>
              ) : (
                <>
                  <NaCard iljuKey={charKey} role={naRole} elem={self.dayElem} idx={0} />
                  <CelebCard name={cs[0].name} role={cs[0].role} cat={cs[0].cat} elem={self.dayElem} idx={1} />
                </>
              )}
            </div>
          )
        })() : (
          <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 text-center">
            <p className="text-[14px] text-charcoal/60 leading-snug" style={GAEGU}>{bareIlju}일주는 아직 등록된 유명인이 없어 — 네가 1호일지도?</p>
          </div>
        )}
        <p className="text-[13px] text-text-muted text-center" style={GAEGU}>너도 이 기운을 타고났어.</p>
      </div>

      {/* 내 오행 밸런스 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleTaegeuk} basis="오행 분포">내 오행 밸런스</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2.5">
          {ELEMS.map(e => {
            const v = self.dist[e], max = Math.max(1, ...ELEMS.map(x => self.dist[x]))
            return (
              <div key={e} className="flex items-center gap-2.5">
                <Ico as={ELEM_DOODLE[e]} size={16} />
                <span className="w-4 text-[14px] font-bold text-charcoal shrink-0">{e}</span>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                  <div className="h-full rounded-full" style={{ width: `${(v / max) * 100}%`, background: ELEM_COLOR[e] }} />
                </div>
                <span className="w-4 text-[14px] text-text-muted text-right shrink-0">{v}</span>
              </div>
            )
          })}
          <p className="text-[14px] text-charcoal/70 leading-snug pt-1" style={GAEGU}>
            나를 살리는 기운은 <span className="font-bold" style={{ color: PINK }}>{self.yong}</span> · 조심할 기운은 {self.gi}.
          </p>
        </div>
      </div>

      {/* 부족 오행 채우는 것들 */}
      <div className="rounded-2xl px-4 py-4 flex flex-col gap-3" style={{ background: ELEM_BG[weakest], border: `1.5px solid ${ELEM_COLOR[weakest]}` }}>
        <div className="flex items-center gap-2">
          <Ico as={ELEM_DOODLE[weakest]} size={22} />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-charcoal leading-tight">너에겐 {weakest}({weakest}) 기운이 부족해</p>
            <p className="text-[14px] text-charcoal/60">{weakest}({weakest}) 기운을 채우는 걸 해봐</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {ELEM_FILL[weakest].map((a, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.7)" }}>
              <Ico as={a.D} size={18} />
              <span className="text-[14px] font-bold text-charcoal">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 에너지 운용 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleLightning} basis="신강신약">에너지 운용</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[12px] text-text-muted"><span>기댐·충전형</span><span>주도·추진형</span></div>
          <div className="relative h-3 rounded-full" style={{ background: "linear-gradient(90deg,#93C5FD,#E5E7EB,#F9A8C4)" }}>
            <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 shadow-sm" style={{ left: `${energyPos}%`, borderColor: PINK }} />
          </div>
          <p className="text-[14px] font-bold text-charcoal">{self.strongLevel}</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{self.isStrong ? "에너지 풀충전형 — 내가 키 쥐고 밀어붙일 때 잘 풀려. 가끔 브레이크만 잊지 마." : self.strongLevel.includes("중화") ? "균형형 — 상황 따라 유연하게 가는 게 강점이야." : "섬세·기댐형 — 좋은 환경·사람에 기대고 채울 때 빛나. 무리한 독주는 방전돼."}</p>
        </div>
      </div>

      <ChapterDivider n={2} title="내 안엔 이런 게" />

      {/* 타고난 재능 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleMedal} basis="십신">타고난 재능</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {self.topTalent.map((gp, i) => {
            const t = TALENT[gp]; const D = t.D
            return (
              <div key={i} className="rounded-2xl bg-white border border-charcoal/10 px-3 py-3.5 flex flex-col gap-1.5">
                <Ico as={D} size={22} />
                <p className="text-[14px] font-bold" style={{ color: PINK }}>{t.tag}</p>
                <p className="text-[13px] text-charcoal/65 leading-snug" style={GAEGU}>{t.line}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* 본캐 vs 부캐 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleMirror} basis="일간·오행">본캐 vs 부캐</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2.5">
          {sameCore ? (
            <p className="text-[14px] text-charcoal/75 leading-snug" style={GAEGU}>겉과 속이 일관된 사람. 보이는 그대로 — <span className="font-bold text-charcoal">{ELEM_TRAIT[ego]}</span>.</p>
          ) : (
            <>
              <div className="flex items-start gap-2.5"><span className="text-[13px] font-bold w-12 shrink-0" style={{ color: PINK }}>겉(부캐)</span><span className="text-[14px] text-charcoal/75 leading-snug" style={GAEGU}>{ELEM_TRAIT[persona]}</span></div>
              <div className="flex items-start gap-2.5"><span className="text-[13px] font-bold w-12 shrink-0" style={{ color: PINK }}>속(본캐)</span><span className="text-[14px] text-charcoal/75 leading-snug" style={GAEGU}>{ELEM_TRAIT[ego]}</span></div>
            </>
          )}
        </div>
      </div>

      {/* 남들이 보는 나 */}
      <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={{ background: "#EFF6FF", border: "1.5px solid #93C5FD" }}>
        <Ico as={DoodleSpeechBubble} size={18} />
        <div><p className="text-[14px] font-bold text-charcoal">남들이 보는 나</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{seenLine} 쪽으로 비쳐.</p></div>
      </div>

      {/* 내 안의 오행 회의실 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleSpeechBubble} basis="오행 분포">내 안의 오행 회의실</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-1">
          {meetingOrder.map(e => {
            const m = MEETING[e]; const n = self.dist[e]
            const power = n >= 3 ? "주도권" : n === 0 ? "발언권 없음" : n >= 2 ? "목소리 큼" : "한마디"
            return (
              <div key={e} className="flex items-center gap-2.5 py-2.5 border-b border-charcoal/5 last:border-0" style={n === 0 ? { opacity: 0.4 } : undefined}>
                <Ico as={ELEM_DOODLE[e]} size={18} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-charcoal">{e} · {m.role} <span className="text-[12px] text-text-muted font-normal">{power}</span></p>
                  <p className="text-[13px] text-charcoal/60 leading-snug" style={GAEGU}>&ldquo;{m.voice}&rdquo;</p>
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-[13px] text-text-muted leading-snug" style={GAEGU}>제일 목소리 큰 {meetingOrder[0]}({MEETING[meetingOrder[0]].role})이 너를 주로 끌고 가. {weakElems.length ? `빠진 ${weakElems.join("·")}은 의식적으로 챙겨야 균형이 맞아.` : ``}</p>
      </div>

      <ChapterDivider n={3} title="사랑할 때 나는" />

      {/* 내 연애 스타일 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleHeart} basis="일간·도화">내 연애 스타일</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5 flex flex-col gap-1.5">
          <p className="text-[14px] font-bold" style={{ color: PINK }}>{LOVE_STYLE[self.dayElem].tag}</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{LOVE_STYLE[self.dayElem].line}.{self.dohwa ? " 매력(도화) 기운이 있어 끌어당기는 힘도 있어." : ""}</p>
        </div>
      </div>

      {/* 이상형 + 결혼 흐름 */}
      <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={{ background: ELEM_BG[self.yong], border: `1.5px solid ${ELEM_COLOR[self.yong]}` }}>
        <Ico as={ELEM_DOODLE[self.yong]} size={22} />
        <div className="min-w-0"><p className="text-[14px] font-bold text-charcoal">나를 채워주는 사람 ({self.yong} 기운)</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{IDEAL[self.yong]}{loveAges.length ? ` 관계 흐름은 ${loveAges.slice(0, 2).join(", ")} 전후에 움직여.` : ""}</p></div>
      </div>

      {/* 크로스셀 → 썸/짝사랑 */}
      <div className="grid grid-cols-2 gap-2">
        <Link href="/v3/some" className="rounded-2xl px-3 py-3 flex flex-col gap-1 active:opacity-85 transition-opacity" style={{ background: "#FFF0F5", border: "1.5px solid #F9A8C4" }}>
          <Ico as={DoodleHeart} size={18} />
          <p className="text-[13px] font-bold text-charcoal">썸 궁합 보기 →</p>
          <p className="text-[12px] text-charcoal/55 leading-snug" style={GAEGU}>그 사람과 나, 가능성은?</p>
        </Link>
        <Link href="/v3/onesided" className="rounded-2xl px-3 py-3 flex flex-col gap-1 active:opacity-85 transition-opacity" style={{ background: "#EFEAFE", border: "1.5px solid #C4B5FD" }}>
          <Ico as={DoodleSparkles} size={18} />
          <p className="text-[13px] font-bold text-charcoal">짝사랑 궁합 보기 →</p>
          <p className="text-[12px] text-charcoal/55 leading-snug" style={GAEGU}>그 사람, 내 맘 알까?</p>
        </Link>
      </div>

      <ChapterDivider n={4} title="일·돈 앞에서 나는" />

      {/* 어울리는 일 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleMedal} basis="십신">어울리는 일</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5 flex flex-col gap-2">
          {self.topTalent.map((gp, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0" style={{ background: PINK }}>{i + 1}</span>
              <p className="text-[14px] text-charcoal/75 leading-snug" style={GAEGU}>{JOB[gp]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 재물 그릇 + 돈 시기 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleDiamond} basis="재성·대운">재물 그릇</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5 flex flex-col gap-2.5">
          <p className="text-[14px] text-charcoal/75 leading-snug" style={GAEGU}>{moneyLine}</p>
          <div className="rounded-xl px-3 py-2.5 flex items-center gap-2" style={{ background: "#FFF7ED", border: "1.5px solid #FDB877" }}>
            <Ico as={DoodleCalendar} size={16} />
            <p className="text-[13px] text-charcoal/75 leading-snug" style={GAEGU}>{moneyAges.length ? `돈이 트이는 시기: ${moneyAges.slice(0, 3).join(", ")} 전후` : "한 방보다 쌓는 게 맞아 — 꾸준함이 돈으로 와."}</p>
          </div>
        </div>
      </div>

      <ChapterDivider n={5} title="나, 지금 어디쯤" />

      {/* 내 인생 그래프 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleStar} basis="대운">내 인생 그래프</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2">
          <LifeGraph life={self.life} />
          <div className="flex items-center justify-center gap-3 text-[12px] text-text-muted">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: PINK, background: "#fff" }} />지금</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: "#F0A020" }} />황금기</span>
          </div>
          <p className="text-[14px] text-charcoal/70 leading-snug text-center" style={GAEGU}>{self.peak ? `황금기는 ${self.peak.ageLabel}세 전후. ` : ""}지금({self.curAge}세)은 {curFavorLine}이야.</p>
        </div>
      </div>

      <ChapterDivider n={6} title="나 다루는 법" />

      {/* 나 사용설명서 카드 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleBook} basis="일간·용신">나 사용설명서</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
          {([["취급주의", manual.care], ["충전법", manual.charge], ["방전 신호", manual.drain], ["셀프 A/S", manual.as]] as const).map(([k, v]) => (
            <div key={k} className="px-4 py-2.5 flex gap-3 border-b border-charcoal/5 last:border-0">
              <span className="text-[13px] font-bold shrink-0 w-16 whitespace-nowrap" style={{ color: PINK }}>{k}</span>
              <span className="text-[14px] text-charcoal/75 leading-snug" style={GAEGU}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 번아웃 신호 */}
      <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={{ background: "#FFF7ED", border: "1.5px solid #FDB877" }}>
        <Ico as={DoodleLightning} size={18} />
        <div><p className="text-[14px] font-bold text-charcoal">번아웃 신호</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{burnout}</p></div>
      </div>

      {/* 나를 살리는 환경 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleClover} basis="용신">나를 살리는 환경</SectionTitle>
        <div className="rounded-2xl px-4 py-3.5 flex flex-col gap-2.5" style={{ background: ELEM_BG[self.yong], border: `1.5px solid ${ELEM_COLOR[self.yong]}` }}>
          <p className="text-[14px] text-charcoal/75 leading-snug" style={GAEGU}><span className="font-bold text-charcoal">{self.yong}</span> 기운을 채우면 잘 풀려 — {env.act} 쪽이 보약이야.</p>
          <div className="grid grid-cols-3 gap-2">
            {[["방향", env.dir], ["색", env.color], ["때", env.season]].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white/70 px-2 py-2 flex flex-col items-center gap-0.5 text-center">
                <span className="text-[12px] text-text-muted">{k}</span>
                <span className="text-[13px] font-bold text-charcoal">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 건강 신호등 */}
      <div className="rounded-2xl px-4 py-3 flex items-start gap-2.5" style={{ background: "#F0FFF4", border: "1.5px solid #86EFAC" }}>
        <Ico as={DoodleHeart} size={18} />
        <div><p className="text-[14px] font-bold text-charcoal">건강 신호등</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>가장 약한 {weakest} 기운 — {ELEM_ORGAN[weakest]}. 단정은 아니고, 이 기운만 챙겨주면 컨디션이 좋아져.</p></div>
      </div>

      <ChapterDivider n={7} title="올해의 나" />

      {/* 올해 흐름 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleCalendar} basis="세운">올해 흐름</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5 flex flex-col gap-2">
          <p className="text-[14px] font-bold text-charcoal">{seunGroup ? SEUN_LINE[seunGroup] : "잔잔히 흐르는 해 — 네 페이스대로"}</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>무리해서 판을 뒤집기보다, 이 흐름에 맞춰 한 발씩 가면 돼.</p>
        </div>
      </div>

      {/* 인생 전환점 */}
      {nextDaeun && (
        <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={{ background: "#EFF6FF", border: "1.5px solid #93C5FD" }}>
          <Ico as={DoodleStar} size={18} />
          <div><p className="text-[14px] font-bold text-charcoal">다음 전환점 · {nextDaeun.startAge}세</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{nextDaeun.startAge}세부터 결이 바뀌어{nextDaeun.favor >= (cur?.favor ?? 50) ? " — 흐름이 한 단계 트여." : " — 새로운 색으로 갈아타는 시기야."}</p></div>
        </div>
      )}

      {/* 삼재 */}
      {self.samjae && (
        <div className="rounded-2xl px-4 py-3 flex items-start gap-2.5" style={{ background: "#FEF2F2", border: "1.5px solid #FCA5A5" }}>
          <Ico as={DoodleQuestionMark} size={18} />
          <div><p className="text-[14px] font-bold text-charcoal">삼재 구간</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>너무 겁먹지 마 — 큰 결정만 한 박자 신중히, 평소처럼 살면 무탈하게 지나가.</p></div>
        </div>
      )}

      {/* ── 보너스 ── */}
      <div className="flex items-center gap-2.5 pt-3">
        <Ico as={DoodleSparkles} size={20} />
        <span className="text-[15px] text-charcoal shrink-0" style={BINGGRAE}>재미로 보는 나</span>
        <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
      </div>

      {/* 사주 RPG 스탯 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleStar} basis="오행·십신">사주 RPG 스탯</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-1">
          <Radar data={stats} />
          <p className="text-[14px] text-charcoal/70 leading-snug text-center" style={GAEGU}>최고 스탯은 <span className="font-bold" style={{ color: PINK }}>{topStat.label}</span> ({topStat.value}) — 여기로 승부 봐.</p>
        </div>
      </div>

      {/* 나 코드 + 한 줄 밈 */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white border border-charcoal/10 px-3 py-3.5 flex flex-col items-center gap-1 text-center">
          <Ico as={DoodleKey} size={18} />
          <span className="text-[12px] text-text-muted">나 코드</span>
          <span className="text-[20px]" style={{ ...BINGGRAE, color: PINK, letterSpacing: "0.05em" }}>{code}</span>
        </div>
        <div className="rounded-2xl px-3 py-3.5 flex flex-col items-center justify-center gap-1 text-center border-2 border-dashed border-charcoal/25" style={{ background: "#FFFDF5" }}>
          <span className="text-[12px] text-text-muted">한 줄 요약</span>
          <span className="text-[16px]" style={{ ...BINGGRAE, color: PINK }}>{meme}</span>
        </div>
      </div>

      {/* 전생의 나 */}
      <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={{ background: "#EFEAFE", border: "1.5px solid #C4B5FD" }}>
        <Ico as={DoodleMoon} size={20} />
        <div><p className="text-[14px] font-bold text-charcoal">전생의 나</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{PAST_LIFE[dominantElem]}</p></div>
      </div>

      {/* 나의 흑역사 버튼 */}
      <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={{ background: "#FFF0F5", border: "1.5px solid #F9A8C4" }}>
        <Ico as={DoodleLightning} size={18} />
        <div><p className="text-[14px] font-bold text-charcoal">나의 흑역사 버튼</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{DARK_HIST[dominantElem]}</p></div>
      </div>

      {/* consult 크로스셀 */}
      <Link href="/v3/consult" className="rounded-2xl px-4 py-4 flex items-center gap-3 active:opacity-85 transition-opacity" style={{ background: "linear-gradient(160deg,#FFF6FA,#FFFDF5)", border: "2px solid #2D2D2D" }}>
        <Ico as={DoodleSpeechBubble} size={24} />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-charcoal" style={BINGGRAE}>더 궁금한 건 대화로 물어봐</p>
          <p className="text-[13px] text-charcoal/60 leading-snug" style={GAEGU}>내 사주 캐릭터한테 직접 — 연애·일·고민 뭐든</p>
        </div>
        <span className="text-[18px]" style={{ color: PINK }}>→</span>
      </Link>
    </div>
  )
}
