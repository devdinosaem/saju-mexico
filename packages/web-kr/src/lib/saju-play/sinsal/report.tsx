"use client"
// ════════════════════════════════════════════════════════════════
// SinsalReport — "내 신살 도감" 결과 본문(순수). data + aiText만 받아 렌더.
// 펀널·보관함 뷰어 공용. 디자인 수정은 여기 한 곳.
// ════════════════════════════════════════════════════════════════
import Link from "next/link"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { elemOf } from "../engine"
import { ELEM_BG } from "../flavor"
import { POS_LABEL, type SinsalData, type Pos } from "./sinsal-adapter"
import { SINSAL, CAT_STYLE, CAT_ORDER, STAT_LABEL, STAT_MEME, SYNERGY, type SinsalStat } from "./flavor"
import {
  DoodleSparkles, DoodleBook, DoodleKey, DoodleTaegeuk, DoodleHeart,
  DoodleStar, DoodleSpeechBubble, DoodleQuestionMark, DoodleLightning,
  DoodleClover, DoodleCalendar,
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

export function SinsalBadge({ name, sub }: { name: string; sub?: string }) {
  const info = SINSAL[name]; if (!info) return null
  const cs = CAT_STYLE[info.cat]
  return (
    <div className="rounded-2xl px-3 py-2.5 flex items-center gap-2.5" style={{ background: cs.bg }}>
      <span className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center shrink-0"><Ico as={info.D} size={20} /></span>
      <div className="min-w-0">
        <p className="text-[14px] font-bold leading-tight truncate" style={{ color: cs.ink }}>{info.alias}</p>
        <p className="text-[12px] text-charcoal/55 leading-tight truncate" style={GAEGU}>{name}{sub ? ` · ${sub}` : ""}</p>
      </div>
    </div>
  )
}

export function Radar({ data }: { data: { label: string; value: number }[] }) {
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

export function SinsalCard({ name, positions }: { name: string; positions: Pos[] }) {
  const info = SINSAL[name]; if (!info) return null
  const cs = CAT_STYLE[info.cat]
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: cs.bg }}>
        <span className="w-11 h-11 rounded-full bg-white/80 flex items-center justify-center shrink-0"><Ico as={info.D} size={24} /></span>
        <div className="min-w-0 flex-1">
          <p className="text-[16px] leading-tight" style={{ ...BINGGRAE, color: cs.ink }}>{info.alias}</p>
          <p className="text-[12px] text-charcoal/55" style={GAEGU}>{name} · {info.cat}</p>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/70 shrink-0" style={{ color: cs.ink }}>
          {positions.map(p => POS_LABEL[p].era.split("·")[0]).join("·")}
        </span>
      </div>
      <div className="px-4 py-3.5 flex flex-col gap-2.5">
        <p className="text-[14px] text-charcoal/85 leading-snug" style={GAEGU}>{info.mean}.</p>
        {info.myth && (
          <div className="rounded-xl px-3 py-2.5 flex items-start gap-2" style={{ background: "#FFF7ED", border: "1.5px solid #FDB877" }}>
            <Ico as={DoodleQuestionMark} size={16} />
            <div><span className="text-[13px] font-bold text-charcoal">무서운 이름, 사실은 </span>
              <span className="text-[13px] text-charcoal/75 leading-snug" style={GAEGU}>{info.myth}</span></div>
          </div>
        )}
        {([["좋은 면", info.good], ["주의", info.caution], ["살릴 곳", info.use]] as const).map(([k, v]) => (
          <div key={k} className="flex gap-2.5">
            <span className="text-[12px] font-bold shrink-0 w-12 mt-0.5" style={{ color: PINK }}>{k}</span>
            <span className="text-[14px] text-charcoal/75 leading-snug" style={GAEGU}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** 무료 표지용 파생 */
export function coverInfo(data: SinsalData) {
  const charKey = resolveChar(data.iljuKey)
  const sigInfo = SINSAL[data.signature]
  const sigCs = CAT_STYLE[sigInfo.cat]
  const teaser = `${data.bareIlju} 일주 — 신살 ${data.ownedCount}개를 타고났어. 대표는 «${sigInfo.alias}».`
  return { charKey, sigInfo, sigCs, teaser }
}

/** 폴백 줄글 — 표시·저장 공용 */
export function sinsalFallback(data: SinsalData): string {
  const sigInfo = SINSAL[data.signature]
  return (
    `너에겐 신살이 **${data.ownedCount}개** 있어. 그중 가장 너다운 건 **${sigInfo.alias}**(${data.signature}) — ${sigInfo.mean}.\n\n` +
    `${sigInfo.good}\n\n` +
    `무서운 이름이 섞여 있어도 걱정 마. 살은 흉이 아니라 네가 타고난 특수 속성이야. 하나씩 도감처럼 펼쳐보자.`
  )
}

// ════════════════════════════════════════════════════════════════
// deriveSinsal — 화면 파생값 일괄 계산(순수). v1/v2 공용.
// ════════════════════════════════════════════════════════════════
export const POS_ORDER: Pos[] = ["year", "month", "day", "hour"]
export const POS_MEAN: Record<Pos, string> = {
  year: "뿌리·어린 시절. 집안과 초년의 색이 여기 담겨.",
  month: "사회·일터. 부모와 바깥 활동의 무대야.",
  day: "나 자신·배우자. 가장 핵심이 되는 자리.",
  hour: "노년·자식. 말년의 결실이 모이는 자리.",
}
export function deriveSinsal(data: SinsalData) {
  const sig = data.signature
  const sigInfo = SINSAL[sig]
  const sigCs = CAT_STYLE[sigInfo.cat]
  const statData = (Object.keys(data.stats) as SinsalStat[]).map(k => ({ label: k, value: Math.min(100, data.stats[k] * 22 + 12) }))
  const topStat = statData.reduce((a, b) => (b.value > a.value ? b : a))
  const byCat = CAT_ORDER.map(cat => ({ cat, items: data.owned.filter(o => SINSAL[o.name].cat === cat) })).filter(g => g.items.length)
  const posStars = (p: Pos) => [...new Set([data.byPos[p].twelve, ...data.byPos[p].special])].filter(n => SINSAL[n])
  const synergies = SYNERGY
    .filter(s => data.stats[s.a] > 0 && data.stats[s.b] > 0)
    .map(s => ({ ...s, power: data.stats[s.a] + data.stats[s.b] }))
    .sort((a, b) => b.power - a.power)
    .slice(0, 4)
  const blessUse = data.owned.filter(o => ["귀인·행운", "재능·예술", "매력·인기"].includes(SINSAL[o.name].cat)).slice(0, 4)
  const scary = data.owned.filter(o => SINSAL[o.name].myth)
  const seunInfo = SINSAL[data.seunSinsal]
  const charHead = synergies[0]?.alias ?? sigInfo.alias
  const charLine = synergies[0]?.line ?? sigInfo.good
  const meme = STAT_MEME[topStat.label as SinsalStat]
  const rarity = data.ownedCount >= 8 ? "신살 종합선물세트" : data.ownedCount >= 5 ? "다채로운 멀티플레이어" : data.ownedCount >= 3 ? "개성 뚜렷한 스페셜리스트" : "한 우물 파는 집중형"
  return { sig, sigInfo, sigCs, statData, topStat, byCat, posStars, synergies, blessUse, scary, seunInfo, charHead, charLine, meme, rarity }
}

// ════════════════════════════════════════════════════════════════
export function SinsalReport({ data, aiText, aiLoading = false }: { data: SinsalData; aiText: string; aiLoading?: boolean }) {
  const sig = data.signature
  const sigInfo = SINSAL[sig]
  const sigCs = CAT_STYLE[sigInfo.cat]
  const statData = (Object.keys(data.stats) as SinsalStat[]).map(k => ({ label: k, value: Math.min(100, data.stats[k] * 22 + 12) }))
  const topStat = statData.reduce((a, b) => (b.value > a.value ? b : a))
  const byCat = CAT_ORDER.map(cat => ({ cat, items: data.owned.filter(o => SINSAL[o.name].cat === cat) })).filter(g => g.items.length)
  const POS_ORDER: Pos[] = ["year", "month", "day", "hour"]
  const POS_MEAN: Record<Pos, string> = {
    year: "뿌리·어린 시절. 집안과 초년의 색이 여기 담겨.",
    month: "사회·일터. 부모와 바깥 활동의 무대야.",
    day: "나 자신·배우자. 가장 핵심이 되는 자리.",
    hour: "노년·자식. 말년의 결실이 모이는 자리.",
  }
  const posStars = (p: Pos) => [...new Set([data.byPos[p].twelve, ...data.byPos[p].special])].filter(n => SINSAL[n])
  const synergies = SYNERGY
    .filter(s => data.stats[s.a] > 0 && data.stats[s.b] > 0)
    .map(s => ({ ...s, power: data.stats[s.a] + data.stats[s.b] }))
    .sort((a, b) => b.power - a.power)
    .slice(0, 4)
  const blessUse = data.owned.filter(o => ["귀인·행운", "재능·예술", "매력·인기"].includes(SINSAL[o.name].cat)).slice(0, 4)
  const scary = data.owned.filter(o => SINSAL[o.name].myth)
  const seunInfo = SINSAL[data.seunSinsal]
  const charHead = synergies[0]?.alias ?? sigInfo.alias
  const charLine = synergies[0]?.line ?? sigInfo.good
  const meme = STAT_MEME[topStat.label as SinsalStat]
  const rarity = data.ownedCount >= 8 ? "신살 종합선물세트" : data.ownedCount >= 5 ? "다채로운 멀티플레이어" : data.ownedCount >= 3 ? "개성 뚜렷한 스페셜리스트" : "한 우물 파는 집중형"

  return (
    <div className="flex flex-col gap-6">
      {/* 내 신살 정밀 풀이 — 히어로 */}
      <div className="rounded-2xl px-4 py-4 flex flex-col gap-3 border-2 border-charcoal" style={{ background: "linear-gradient(160deg,#FFF6FA,#FFFDF5)", boxShadow: "0 4px 16px rgba(232,75,106,0.08)" }}>
        <div className="flex items-center gap-2">
          <Ico as={DoodleSparkles} size={20} />
          <span className="text-[15px] text-charcoal" style={BINGGRAE}>내 신살 정밀 풀이</span>
          <span className="ml-auto"><Basis t="신살 종합" /></span>
        </div>
        {aiLoading ? (
          <div className="flex flex-col gap-2 py-1">
            {[100, 96, 100, 72].map((w, i) => <div key={i} className="h-3 rounded-full bg-charcoal/10 animate-pulse" style={{ width: `${w}%` }} />)}
            <p className="text-[13px] text-text-muted mt-1">신살을 하나씩 풀어보는 중…</p>
          </div>
        ) : <Prose text={aiText} />}
      </div>

      <ChapterDivider n={1} title="내가 가진 신살은" />

      {/* 시그니처 신살 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleStar} basis="대표 신살">나의 시그니처</SectionTitle>
        <div className="rounded-2xl border-2 px-4 py-4 flex flex-col gap-3" style={{ background: sigCs.bg, borderColor: sigCs.ink }}>
          <div className="flex items-center gap-3">
            <span className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shrink-0"><Ico as={sigInfo.D} size={30} /></span>
            <div className="min-w-0">
              <p className="text-[18px] leading-tight" style={{ ...BINGGRAE, color: sigCs.ink }}>{sigInfo.alias}</p>
              <p className="text-[13px] text-charcoal/55" style={GAEGU}>{sig} · {sigInfo.cat}</p>
            </div>
          </div>
          <p className="text-[14px] text-charcoal/80 leading-snug" style={GAEGU}>{sigInfo.mean}.</p>
          <div className="rounded-xl bg-white/70 px-3 py-2.5">
            <p className="text-[14px] text-charcoal/80 leading-snug" style={GAEGU}>{sigInfo.good}</p>
          </div>
        </div>
      </div>

      {/* 보유 신살 도감 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleBook} basis="원국 종합">내 신살 도감 · {data.ownedCount}개</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {data.owned.map(o => <SinsalBadge key={o.name} name={o.name} sub={`${o.positions.length}자리`} />)}
        </div>
        <p className="text-[13px] text-text-muted leading-snug" style={GAEGU}>무서운 이름도 사실은 다 너의 특수 속성이야. 다음 장에서 하나씩 풀어줄게.</p>
      </div>

      {/* 신살 능력치 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleLightning} basis="신살 분포">내 신살 능력치</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-1">
          <Radar data={statData} />
          <p className="text-[14px] text-charcoal/70 leading-snug text-center" style={GAEGU}>
            제일 센 건 <span className="font-bold" style={{ color: PINK }}>{STAT_LABEL[topStat.label as SinsalStat]}</span> — 여기에 네 무기가 몰려 있어.
          </p>
        </div>
      </div>

      {/* 6분류 묶음 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleTaegeuk} basis="카테고리">신살, 결대로 묶어보면</SectionTitle>
        <div className="flex flex-col gap-2">
          {byCat.map(({ cat, items }) => {
            const cs = CAT_STYLE[cat]
            return (
              <div key={cat} className="rounded-2xl px-3.5 py-3 flex items-start gap-2.5" style={{ background: cs.bg }}>
                <span className="text-[13px] font-bold shrink-0 mt-0.5 px-2 py-0.5 rounded-full bg-white/70" style={{ color: cs.ink }}>{cat}</span>
                <p className="text-[14px] text-charcoal/75 leading-snug pt-0.5" style={GAEGU}>
                  {items.map(o => SINSAL[o.name].alias).join(" · ")}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <ChapterDivider n={2} title="무서운 이름, 사실은" />

      {/* 신살 풀 카드 도감 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleBook} basis="신살 풀이">신살 하나씩 펼치기</SectionTitle>
        <div className="flex flex-col gap-3">
          {data.owned.map(o => <SinsalCard key={o.name} name={o.name} positions={o.positions} />)}
        </div>
        <p className="text-[13px] text-text-muted leading-snug" style={GAEGU}>겁주는 이름은 다 옛날식 작명일 뿐 — 네가 가진 건 전부 쓸 수 있는 힘이야.</p>
      </div>

      <ChapterDivider n={3} title="어디에 있냐면" />

      {/* 자리별 신살 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleStar} basis="년·월·일·시">자리마다 다른 신살</SectionTitle>
        <div className="flex flex-col gap-2">
          {POS_ORDER.map(p => {
            const stars = posStars(p), isMe = p === "day"
            return (
              <div key={p} className="rounded-2xl px-4 py-3 flex flex-col gap-1.5" style={isMe ? { background: "#FFF0F5", border: `1.5px solid ${PINK}` } : { background: "white", border: "1px solid rgba(45,45,45,0.1)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-charcoal">{POS_LABEL[p].era}</span>
                  <span className="text-[12px] text-text-muted">{POS_LABEL[p].area}</span>
                  {isMe && <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full text-white shrink-0" style={{ background: PINK }}>나</span>}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stars.map(n => {
                    const cs = CAT_STYLE[SINSAL[n].cat]
                    return <span key={n} className="text-[12px] font-bold px-2 py-0.5 rounded-full" style={{ background: cs.bg, color: cs.ink }}>{SINSAL[n].alias}</span>
                  })}
                </div>
                <p className="text-[13px] text-charcoal/60 leading-snug" style={GAEGU}>{POS_MEAN[p]}</p>
              </div>
            )
          })}
        </div>
      </div>

      <ChapterDivider n={4} title="신살끼리 만나면" />

      {/* 시너지 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleSparkles} basis="능력치 조합">내 신살 시너지</SectionTitle>
        {synergies.length > 0 ? (
          <div className="flex flex-col gap-2">
            {synergies.map((s, i) => (
              <div key={i} className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0 mt-0.5" style={{ background: PINK }}>{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-charcoal leading-tight">
                    {s.alias} <span className="text-[12px] text-text-muted font-normal">· {STAT_LABEL[s.a]}+{STAT_LABEL[s.b]}</span>
                  </p>
                  <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{s.line}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 text-center">
            <p className="text-[14px] text-charcoal/60 leading-snug" style={GAEGU}>한 가지 힘에 집중된 타입 — 시그니처 «{sigInfo.alias}» 하나로 승부 보는 스타일이야.</p>
          </div>
        )}
      </div>

      <ChapterDivider n={5} title="살릴 건 살리고" />

      {/* 길성 활용 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleClover} basis="길성·재능">이건 키워</SectionTitle>
        {blessUse.length > 0 ? (
          <div className="rounded-2xl px-4 py-4 flex flex-col gap-3" style={{ background: "#F0FFF4", border: "1.5px solid #86EFAC" }}>
            {blessUse.map(o => {
              const info = SINSAL[o.name]
              return (
                <div key={o.name} className="flex items-start gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shrink-0"><Ico as={info.D} size={18} /></span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-charcoal leading-tight">{info.alias}</p>
                    <p className="text-[13px] text-charcoal/70 leading-snug" style={GAEGU}>{info.use}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl px-4 py-3.5" style={{ background: "#F0FFF4", border: "1.5px solid #86EFAC" }}>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>화려한 길성은 적지만, 그만큼 한 길을 우직하게 파는 힘이 있어 — 꾸준함이 네 무기야.</p>
          </div>
        )}
      </div>

      {/* 흉살 안심 */}
      {scary.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <SectionTitle icon={DoodleHeart} basis="안심 처방">겁낼 것 없어</SectionTitle>
          <div className="rounded-2xl px-4 py-4 flex flex-col gap-3" style={{ background: "#FFF7ED", border: "1.5px solid #FDB877" }}>
            <p className="text-[14px] text-charcoal/80 leading-snug" style={GAEGU}>이름이 무서운 살들, 사실은 다 다룰 수 있는 힘이야. 이렇게만 기억해 둬.</p>
            {scary.map(o => {
              const info = SINSAL[o.name]
              return (
                <div key={o.name} className="rounded-xl bg-white/70 px-3 py-2.5 flex items-start gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0"><Ico as={info.D} size={18} /></span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-charcoal leading-tight">{info.alias} <span className="text-[12px] text-text-muted font-normal">· {o.name}</span></p>
                    <p className="text-[13px] text-charcoal/70 leading-snug" style={GAEGU}>{info.caution}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <ChapterDivider n={6} title="올해의 신살" />

      {/* 올해 들어오는 신살 */}
      {seunInfo && (
        <div className="flex flex-col gap-2.5">
          <SectionTitle icon={DoodleCalendar} basis="세운">{data.curYear}년의 기운</SectionTitle>
          <div className="rounded-2xl border-2 px-4 py-4 flex flex-col gap-3" style={{ background: CAT_STYLE[seunInfo.cat].bg, borderColor: CAT_STYLE[seunInfo.cat].ink }}>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shrink-0"><Ico as={seunInfo.D} size={26} /></span>
              <div className="min-w-0">
                <p className="text-[16px] leading-tight" style={{ ...BINGGRAE, color: CAT_STYLE[seunInfo.cat].ink }}>{seunInfo.alias}</p>
                <p className="text-[13px] text-charcoal/55" style={GAEGU}>{data.seunSinsal}{data.seunOwned ? " · 원래 가진 기운이 더 세지는 해" : " · 올해 새로 들어오는 기운"}</p>
              </div>
            </div>
            <p className="text-[14px] text-charcoal/80 leading-snug" style={GAEGU}>{seunInfo.mean}.</p>
            <div className="rounded-xl bg-white/70 px-3 py-2.5 flex flex-col gap-1.5">
              <p className="text-[13px] text-charcoal/75 leading-snug" style={GAEGU}><span className="font-bold" style={{ color: PINK }}>이렇게 써 · </span>{seunInfo.use}</p>
              <p className="text-[13px] text-charcoal/75 leading-snug" style={GAEGU}><span className="font-bold" style={{ color: PINK }}>이건 살짝 · </span>{seunInfo.caution}</p>
            </div>
            <p className="text-[13px] text-text-muted leading-snug" style={GAEGU}>무리해서 판을 뒤집기보다, 올해 들어온 이 결에 맞춰 한 발씩 가면 돼.</p>
          </div>
        </div>
      )}

      {/* ── 보너스 ── */}
      <div className="flex items-center gap-2.5 pt-3">
        <Ico as={DoodleSparkles} size={20} />
        <span className="text-[15px] text-charcoal shrink-0" style={BINGGRAE}>재미로 보는 신살</span>
        <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
      </div>

      {/* 신살 한 줄 캐릭터 */}
      <div className="rounded-2xl px-4 py-4 flex flex-col items-center gap-2 text-center border-2 border-dashed border-charcoal/25" style={{ background: "#FFFDF5" }}>
        <span className="text-[12px] text-text-muted">내 신살을 한 줄로</span>
        <p className="text-[20px]" style={{ ...BINGGRAE, color: PINK }}>{charHead}</p>
        <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{charLine}</p>
      </div>

      {/* 희귀도 + 한 줄 밈 */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white border border-charcoal/10 px-3 py-3.5 flex flex-col items-center gap-1 text-center">
          <Ico as={DoodleKey} size={18} />
          <span className="text-[12px] text-text-muted">도감 희귀도</span>
          <span className="text-[15px]" style={{ ...BINGGRAE, color: PINK }}>{rarity}</span>
        </div>
        <div className="rounded-2xl px-3 py-3.5 flex flex-col items-center justify-center gap-1 text-center border-2 border-dashed border-charcoal/25" style={{ background: "#FFFDF5" }}>
          <span className="text-[12px] text-text-muted">한 줄 요약</span>
          <span className="text-[15px]" style={{ ...BINGGRAE, color: PINK }}>{meme}</span>
        </div>
      </div>

      {/* consult 크로스셀 */}
      <Link href="/v3/consult" className="rounded-2xl px-4 py-4 flex items-center gap-3 active:opacity-85 transition-opacity" style={{ background: "linear-gradient(160deg,#FFF6FA,#FFFDF5)", border: "2px solid #2D2D2D" }}>
        <Ico as={DoodleSpeechBubble} size={24} />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-charcoal" style={BINGGRAE}>더 궁금한 건 대화로 물어봐</p>
          <p className="text-[13px] text-charcoal/60 leading-snug" style={GAEGU}>내 사주 캐릭터한테 직접 — 신살·운세 뭐든</p>
        </div>
        <span className="text-[18px]" style={{ color: PINK }}>→</span>
      </Link>
    </div>
  )
}
