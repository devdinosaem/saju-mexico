"use client"
// ════════════════════════════════════════════════════════════════
// "나 사용설명서" 셸 — 1인·입력 0. 계정 생일로 즉시.
// 카드 → 연출 → 무료 표지 → 페이월 → 전체 리포트(챕터는 단계별로 추가).
// 디자인: crush와 동일 결(두들 Ico·14px floor·BINGGRAE/GAEGU·근거 칩·챕터 구분선).
// AI는 /api/saju-play/self(에이전트 제작) 호출, 없으면 폴백 줄글.
// ════════════════════════════════════════════════════════════════
import { useState, useEffect } from "react"
import Link from "next/link"
import { useUser } from "@/lib/UserContext"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { ILJU_TYPES } from "@/lib/ilju-types"
import { ILJU_CELEB_DATA } from "@/lib/ilju-celeb-data"
import { elemOf, ELEMS, type Elem } from "../engine"
import { ELEM_BG, ELEM_COLOR, ELEM_DOODLE } from "../flavor"
import { buildSelf, tgGroup, type SelfBirth, type Gender, type LifePoint } from "./self-adapter"
import { TALENT, ELEM_TRAIT, MEETING, LOVE_STYLE, IDEAL, JOB, SELF_MANUAL, SELF_ENV, ELEM_ORGAN, SEUN_LINE, PAST_LIFE, DARK_HIST, MEME, ELEM_FILL } from "./flavor"
import { to24h } from "../crush/saju-adapter"
import {
  DoodleSparkles, DoodleBook, DoodleKey, DoodleTaegeuk, DoodleHeart,
  DoodleLightning, DoodleMedal, DoodleMirror, DoodleSpeechBubble, DoodleStar,
  DoodleDiamond, DoodleCalendar, DoodleClover, DoodleQuestionMark, DoodleMoon, DoodleCrown,
} from "@/components/doodles"

type DoodleC = React.FC<{ className?: string }>
const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
const PINK = "#E84B6A"

function Ico({ as: D, size = 18 }: { as: DoodleC; size?: number }) {
  return <span className="inline-flex items-center justify-center shrink-0 align-middle" style={{ width: size, height: size }}><D className="w-full h-full" /></span>
}
// 근거 칩 (핑크 단일톤)
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

// 일주 → 그릴 수 있는 캐릭터 키로 해석(미등록은 같은 오행·성별 대표)
const ICON_KEYS = Object.keys(ILJU_SVG_ICONS)
function resolveChar(id: string): string {
  if (ILJU_SVG_ICONS[id]) return id
  const g = id.endsWith("-f") ? "-f" : "-m", e = elemOf(id)
  const pool = ICON_KEYS.filter(k => k.endsWith(g) && elemOf(k) === e)
  if (pool.length) return pool[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % pool.length]
  return ICON_KEYS.find(k => k.endsWith(g)) ?? ICON_KEYS[0]
}
function Avatar({ iljuKey, size = 80 }: { iljuKey: string; size?: number }) {
  return <div className="rounded-full overflow-hidden border-2 border-charcoal/15 shrink-0 flex items-center justify-center" style={{ width: size, height: size, background: ELEM_BG[elemOf(iljuKey)] }}>{ILJU_SVG_ICONS[iljuKey]?.(getIljuProfileViewBox(iljuKey))}</div>
}

// 인생 그래프 — 대운 길흉 곡선
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

// 사주 RPG 스탯 — 5각 레이더
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
// 셀럽 분야 → 두들 (사진 공백 채움)
const CAT_DOODLE: Record<string, DoodleC> = {
  기업인: DoodleDiamond, 정치인: DoodleSpeechBubble, 배우: DoodleStar, 위인: DoodleCrown,
  왕족: DoodleCrown, 스포츠: DoodleLightning, 노벨상: DoodleMedal, 가수: DoodleSparkles,
}
// 받침 유무로 조사 선택 (기업인'이' / 배우'가')
const josa = (w: string, a: string, b: string) => (w && (w.charCodeAt(w.length - 1) - 0xAC00) % 28 !== 0 ? a : b)
// 분야 → 폴백 파스텔 배경
const CAT_BG: Record<string, string> = {
  기업인: "#FEF3C7", 정치인: "#DBEAFE", 배우: "#FFE9F0", 위인: "#FEF3C7",
  왕족: "#FEF3C7", 스포츠: "#FEE2E2", 노벨상: "#EFEAFE", 가수: "#FFE9F0",
}
// 셀럽 아바타 — 사진 있으면 사진, 없거나 실패하면 분야 두들 (동적)
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

type Ai = { status: "idle" | "loading" | "done" | "error"; text: string }
const FALLBACK_BIRTH: SelfBirth = { year: 1995, month: 3, day: 15, hour: 12, minute: 0 }
const PRICE = "0.8명태"

export default function SelfFunnel() {
  const { user } = useUser()
  const bd = user.birthDate
  const birth: SelfBirth = bd
    ? { year: +bd.year, month: +bd.month, day: +bd.day, hour: to24h(bd.hour, bd.ampm), minute: parseInt(bd.minute) || 0 }
    : FALLBACK_BIRTH
  const gender: Gender = bd?.gender === "F" ? "F" : "M"
  const self = buildSelf(birth, gender)

  const [step, setStep] = useState<"loading" | "result">("loading")
  const [unlocked, setUnlocked] = useState(false)
  const [ai, setAi] = useState<Ai>({ status: "idle", text: "" })

  useEffect(() => {
    if (!self) return
    setAi({ status: "loading", text: "" })
    fetch("/api/saju-play/self", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selfBlock: self.selfBlock, day: self.dayKr, elem: self.dayElem, strong: self.strongLevel }),
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { text?: string }) => d.text ? setAi({ status: "done", text: d.text }) : Promise.reject())
      .catch(() => setAi({ status: "error", text: "" }))
    const t = setTimeout(() => setStep("result"), 1600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 운영: bd 없으면 생일 등록 유도가 맞지만, 지금은 폴백 생일로 렌더(dev)
  if (!self) {
    return <div className="pt-24 text-center text-[15px] text-charcoal" style={BINGGRAE}>사주를 불러올 수 없어요. 생일을 등록해 주세요.</div>
  }

  const charKey = resolveChar(self.iljuKey)
  const iljuType = ILJU_TYPES.find(t => t.id === self.iljuKey)
  const bareIlju = self.iljuKey.replace(/-[mf]$/, "")        // 성별 제거 → 60일주 키
  const celeb = ILJU_CELEB_DATA[bareIlju]                    // 수익가능·남여합산 (데이터 자체가 정제됨)
  const strongElems = ELEMS.filter(e => self.dist[e] >= 3)
  const weakElems = ELEMS.filter(e => self.dist[e] === 0)
  const teaser = `${self.dayKr}(${self.dayElem})·${self.yinYang} 일간 — ${self.strongLevel}. 강한 기운은 ${strongElems.join("·") || "고른 편"}, 빠진 건 ${weakElems.join("·") || "없음"}.`
  // 작동 원리 파생
  const dominantElem = ELEMS.reduce((a, b) => (self.dist[b] > self.dist[a] ? b : a), "목" as Elem)
  const ego = self.dayElem, persona = dominantElem, sameCore = ego === persona
  const energyPos = self.strongLevel.includes("극신강") ? 90 : self.strongLevel.includes("신강") ? 72
    : self.strongLevel.includes("극신약") ? 8 : self.strongLevel.includes("신약") ? 30 : 50
  const seenLine = `${self.tgGroups.식상 >= 2 ? "표현이 분명하고 끼 있는" : "차분하고 편안한"} 인상${self.tgGroups.관성 >= 2 ? " + 믿음직한 분위기" : ""}${self.dohwa ? " + 묘하게 끌리는 매력" : ""}`
  const meetingOrder = [...ELEMS].sort((a, b) => self.dist[b] - self.dist[a])
  // 연애·일·돈·흐름 파생
  const loveAges = self.life.filter(l => tgGroup(l.tenGod) === "관성").map(l => `${l.startAge}세`)
  const moneyAges = self.life.filter(l => tgGroup(l.tenGod) === "재성").map(l => `${l.startAge}세`)
  const jae = self.tgGroups.재성
  const moneyLine = jae >= 3 ? "돈·실리 감각이 타고난 편 — 현실을 굴려 결과로 만드는 그릇이야."
    : jae >= 1 ? "돈 감각은 무난한 편 — 꾸준히 쌓을수록 그릇이 커져."
    : "돈보다 전문성·관계가 먼저 와. 그게 결국 돈으로 돌아오는 타입이야."
  const cur = self.life.find(l => l.current)
  const curFavorLine = cur ? (cur.favor >= 72 ? "흐름이 트이는 좋은 구간" : cur.favor >= 50 ? "차곡차곡 쌓는 구간" : "눌렸다 펴지기 직전 구간") : "흐름 위"
  // 취급·관리 + 올해 파생
  const manual = SELF_MANUAL[self.dayElem]
  const env = SELF_ENV[self.yong]
  const burnout = self.isStrong
    ? "혼자 다 짊어지고 폭주할 때가 방전 신호 — 위임·휴식이 약이야."
    : "남 신경 쓰다 나를 소진할 때가 방전 신호 — 거절·경계가 약이야."
  const weakest = ELEMS.reduce((a, b) => (self.dist[b] < self.dist[a] ? b : a), "목" as Elem)
  const seunGroup = self.seunTenGod ? tgGroup(self.seunTenGod) : null
  const curIdx = self.life.findIndex(l => l.current)
  const nextDaeun = curIdx >= 0 ? self.life[curIdx + 1] : undefined
  // 재미 파생
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
  const fallbackProse =
    `너는 **${self.dayKr}(${self.dayElem})·${self.yinYang}** 일간, ${self.strongLevel}이야.\n\n` +
    `타고난 결은 **${self.topTalent.join("·")}** 쪽 — 여기에 네 무기가 있어. 나를 살리는 기운은 **${self.yong}**, 이걸 채울수록 잘 풀려.\n\n` +
    `${self.peak ? `인생 흐름으로 보면 **${self.peak.ageLabel}세 전후**가 가장 트이는 구간이야. ` : ``}지금은 ${self.curAge}세, 네 계절을 잘 타면 돼.`

  if (step === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-24 text-center">
        <span className="animate-pulse"><Ico as={DoodleBook} size={60} /></span>
        <p className="text-[18px] text-charcoal" style={BINGGRAE}>네 사주를 펼쳐보는 중…</p>
        <p className="text-[14px] text-text-muted" style={GAEGU}>제품명: 나</p>
      </div>
    )
  }

  // ── 유료 본문(2차: 히어로 + 오행 밸런스. 챕터는 다음 단계) ──
  const PaidBody = (
    <div className="flex flex-col gap-6">
      {/* 나 정밀 풀이 — 히어로 */}
      <div className="rounded-2xl px-4 py-4 flex flex-col gap-3 border-2 border-charcoal" style={{ background: "linear-gradient(160deg,#FFF6FA,#FFFDF5)", boxShadow: "0 4px 16px rgba(232,75,106,0.08)" }}>
        <div className="flex items-center gap-2">
          <Ico as={DoodleSparkles} size={20} />
          <span className="text-[15px] text-charcoal" style={BINGGRAE}>나 정밀 풀이</span>
          <span className="ml-auto"><Basis t="원국 종합" /></span>
        </div>
        {ai.status === "loading" && (
          <div className="flex flex-col gap-2 py-1">
            {[100, 96, 100, 72].map((w, i) => <div key={i} className="h-3 rounded-full bg-charcoal/10 animate-pulse" style={{ width: `${w}%` }} />)}
            <p className="text-[13px] text-text-muted mt-1">원국을 깊게 읽는 중…</p>
          </div>
        )}
        {ai.status === "done" && <Prose text={ai.text} />}
        {(ai.status === "error" || ai.status === "idle") && <Prose text={fallbackProse} />}
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

      {/* 사주가 같은 사람 — 나 + 같은 일주 셀럽 카드 가로 스크롤 (사진 적응형, 동적) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleCrown} basis="일주">사주가 같은 사람</SectionTitle>
        {celeb ? (() => {
          const shown = celeb.persons.slice(0, 3)
          const extra = Math.min(celeb.count - shown.length, 3)
          return (
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
              {/* 나 카드 */}
              <div className="relative shrink-0 w-[94px] rounded-2xl bg-white px-2.5 pt-3 pb-2.5 flex flex-col items-center gap-1.5 border-2" style={{ borderColor: PINK }}>
                <span className="absolute top-1 right-1.5"><Ico as={DoodleCrown} size={18} /></span>
                <div className="p-[2px] rounded-full" style={{ background: "linear-gradient(135deg,#E84B6A,#FBBF24)" }}><Avatar iljuKey={charKey} size={44} /></div>
                <p className="text-[13px] font-bold text-charcoal" style={BINGGRAE}>나</p>
                <p className="text-[10px] text-text-muted text-center leading-tight">{bareIlju}일주</p>
                <Ico as={ELEM_DOODLE[self.dayElem]} size={15} />
              </div>
              {/* 셀럽 카드 */}
              {shown.map((p, i) => (
                <div key={i} className="relative shrink-0 w-[94px] rounded-2xl bg-white border border-charcoal/10 px-2.5 pt-3 pb-2.5 flex flex-col items-center gap-1.5">
                  <span className="absolute top-1 right-1.5"><Ico as={DoodleHeart} size={14} /></span>
                  <CelebAvatar name={p.name} cat={p.cat} size={44} />
                  <p className="text-[12px] font-bold text-charcoal text-center leading-tight">{p.name}</p>
                  <p className="text-[10px] text-text-muted text-center leading-tight truncate w-full">{p.role}</p>
                  <Ico as={ELEM_DOODLE[self.dayElem]} size={15} />
                </div>
              ))}
              {/* 외 N명 카드 */}
              {extra > 0 && (
                <div className="shrink-0 w-[66px] rounded-2xl border border-dashed border-charcoal/20 flex flex-col items-center justify-center gap-0.5 text-center" style={{ background: "rgba(45,45,45,0.03)" }}>
                  <span className="text-[18px]" style={{ ...BINGGRAE, color: PINK }}>+{extra}</span>
                  <span className="text-[11px] text-text-muted">명 더</span>
                </div>
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

      {/* 부족 오행 채우는 것들 (다른 분석기와 동일) */}
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

      {/* 에너지 운용 (신강신약) */}
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

      {/* 나 사용설명서 카드 — 제품명 시그니처 */}
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

      {/* 삼재 (있을 때만) */}
      {self.samjae && (
        <div className="rounded-2xl px-4 py-3 flex items-start gap-2.5" style={{ background: "#FEF2F2", border: "1.5px solid #FCA5A5" }}>
          <Ico as={DoodleQuestionMark} size={18} />
          <div><p className="text-[14px] font-bold text-charcoal">삼재 구간</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>너무 겁먹지 마 — 큰 결정만 한 박자 신중히, 평소처럼 살면 무탈하게 지나가.</p></div>
        </div>
      )}

      {/* ── 보너스 · 재미로 보는 나 ── */}
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

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6">
      {/* [무료] 표지 */}
      <div className="flex flex-col items-center gap-2.5 text-center pt-2">
        <span className="text-[13px] text-text-muted tracking-wider">사 용 설 명 서</span>
        <div className="p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
          <Avatar iljuKey={charKey} size={88} />
        </div>
        <p className="text-[24px] text-charcoal" style={BINGGRAE}>제품명 · 나</p>
        <div className="px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#FFF4E0", border: "1.5px dashed #F0C060" }}>
          <Ico as={DoodleHeart} size={15} /> <p className="text-[14px] text-[#9A7050]" style={BINGGRAE}>{iljuType?.name ?? `${self.dayKr}${self.dayElem} 일간`}</p>
        </div>
        <p className="text-[14px] text-charcoal/70 leading-relaxed" style={GAEGU}>{teaser}</p>
      </div>

      {/* [유료] 페이월 게이트 — 짧은 미리보기 + 잠금 카드 */}
      {unlocked ? PaidBody : (
        <div className="flex flex-col">
          <div className="relative overflow-hidden" style={{ maxHeight: 150 }}>
            <div className="blur-[5px] pointer-events-none select-none">{PaidBody}</div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,254,242,0.15), var(--bg-cream,#FFFEF2) 88%)" }} />
          </div>
          <div className="-mt-7 rounded-2xl bg-white border-2 border-charcoal px-5 py-5 flex flex-col items-center gap-2.5 text-center" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
            <Ico as={DoodleKey} size={36} />
            <p className="text-[16px] text-charcoal" style={BINGGRAE}>나 사용설명서 전체 펼치기</p>
            <div className="flex flex-col gap-1.5 w-full py-1">
              {["원국 전체를 읽은 정밀 풀이", "재능·연애·일·돈 · 인생 그래프", "나 다루는 법 · 올해의 나"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-charcoal/70"><Ico as={DoodleHeart} size={13} /> {t}</div>
              ))}
            </div>
            <button onClick={() => setUnlocked(true)} className="w-full h-[52px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal mt-0.5" style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
              {PRICE} 내고 전체 보기
            </button>
            <p className="text-[13px] text-text-muted">내 생일 그대로, 언제든 다시 볼 수 있어요</p>
          </div>
        </div>
      )}
    </div>
  )
}
