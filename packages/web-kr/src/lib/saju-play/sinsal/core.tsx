"use client"
// ════════════════════════════════════════════════════════════════
// "내 신살 도감" 셸 — 1인·입력 0. 계정 생일로 즉시.
// 표지(무료: 보유 개수 + 시그니처 1개) → 페이월 → 전체 도감(챕터는 단계별 추가).
// 디자인: self/crush와 동일 결(두들 Ico·14px floor·BINGGRAE/GAEGU·근거 칩·챕터 구분선).
// AI는 /api/saju-play/sinsal(에이전트 제작, body {name, sinsalBlock}) 호출, 없으면 폴백 줄글.
// ════════════════════════════════════════════════════════════════
import { useState, useEffect } from "react"
import Link from "next/link"
import { useUser } from "@/lib/UserContext"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { elemOf, type Elem } from "../engine"
import { ELEM_BG } from "../flavor"
import { buildSinsal, POS_LABEL, type SinsalBirth, type Gender, type Pos } from "./sinsal-adapter"
import { SINSAL, CAT_STYLE, CAT_ORDER, STAT_LABEL, type SinsalStat } from "./flavor"
import { to24h } from "../crush/saju-adapter"
import {
  DoodleSparkles, DoodleBook, DoodleKey, DoodleTaegeuk, DoodleHeart,
  DoodleStar, DoodleSpeechBubble, DoodleQuestionMark, DoodleLightning,
} from "@/components/doodles"

type DoodleC = React.FC<{ className?: string }>
const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
const PINK = "#E84B6A"

function Ico({ as: D, size = 18 }: { as: DoodleC; size?: number }) {
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

// 일주 → 그릴 수 있는 캐릭터 키 (미등록은 같은 오행·성별 대표)
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

// 신살 배지 (도감 칸) — 두들 + 별명 + 신살명
function SinsalBadge({ name, sub }: { name: string; sub?: string }) {
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

// 신살 능력치 — 5각 레이더
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

// 신살 풀 카드 — 별명·진짜뜻·myth 오해풀기·좋은면·주의·활용
function SinsalCard({ name, positions }: { name: string; positions: Pos[] }) {
  const info = SINSAL[name]; if (!info) return null
  const cs = CAT_STYLE[info.cat]
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
      {/* 헤더 */}
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

type Ai = { status: "idle" | "loading" | "done" | "error"; text: string }
const FALLBACK_BIRTH: SinsalBirth = { year: 1990, month: 2, day: 14, hour: 12, minute: 0 }  // 갑신일주(셀럽 풍부) 테스트
const PRICE = "0.9명태"

export default function SinsalFunnel() {
  const { user } = useUser()
  const bd = user.birthDate
  const birth: SinsalBirth = bd
    ? { year: +bd.year, month: +bd.month, day: +bd.day, hour: to24h(bd.hour, bd.ampm), minute: parseInt(bd.minute) || 0 }
    : FALLBACK_BIRTH
  const gender: Gender = bd?.gender === "F" ? "F" : "M"
  const data = buildSinsal(birth, gender)

  const [step, setStep] = useState<"loading" | "result">("loading")
  const [unlocked, setUnlocked] = useState(false)
  const [ai, setAi] = useState<Ai>({ status: "idle", text: "" })

  useEffect(() => {
    if (!data) return
    setAi({ status: "loading", text: "" })
    fetch("/api/saju-play/sinsal", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: bd?.name || "너", sinsalBlock: data.sinsalBlock }),
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { text?: string }) => d.text ? setAi({ status: "done", text: d.text }) : Promise.reject())
      .catch(() => setAi({ status: "error", text: "" }))
    const t = setTimeout(() => setStep("result"), 1600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data) {
    return <div className="pt-24 text-center text-[15px] text-charcoal" style={BINGGRAE}>사주를 불러올 수 없어요. 생일을 등록해 주세요.</div>
  }

  const charKey = resolveChar(data.iljuKey)
  const sig = data.signature
  const sigInfo = SINSAL[sig]
  const sigCs = CAT_STYLE[sigInfo.cat]
  // 능력치 레이더 (자리 수 기반 스케일)
  const statData = (Object.keys(data.stats) as SinsalStat[]).map(k => ({ label: k, value: Math.min(100, data.stats[k] * 22 + 12) }))
  const topStat = statData.reduce((a, b) => (b.value > a.value ? b : a))
  // 6분류 묶음 (보유한 카테고리만)
  const byCat = CAT_ORDER.map(cat => ({ cat, items: data.owned.filter(o => SINSAL[o.name].cat === cat) })).filter(g => g.items.length)
  const teaser = `${data.bareIlju} 일주 — 신살 ${data.ownedCount}개를 타고났어. 대표는 «${sigInfo.alias}».`
  const fallbackProse =
    `너에겐 신살이 **${data.ownedCount}개** 있어. 그중 가장 너다운 건 **${sigInfo.alias}**(${sig}) — ${sigInfo.mean}.\n\n` +
    `${sigInfo.good}\n\n` +
    `무서운 이름이 섞여 있어도 걱정 마. 살은 흉이 아니라 네가 타고난 특수 속성이야. 하나씩 도감처럼 펼쳐보자.`

  if (step === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-24 text-center">
        <span className="animate-pulse"><Ico as={DoodleBook} size={60} /></span>
        <p className="text-[18px] text-charcoal" style={BINGGRAE}>네 신살을 펼쳐보는 중…</p>
        <p className="text-[14px] text-text-muted" style={GAEGU}>무서운 이름, 사실은 다 특별한 거야</p>
      </div>
    )
  }

  // ── 유료 본문(2차: 히어로 + 시그니처 + 보유 도감. 나머지 챕터는 다음 단계) ──
  const PaidBody = (
    <div className="flex flex-col gap-6">
      {/* 내 신살 정밀 풀이 — 히어로 */}
      <div className="rounded-2xl px-4 py-4 flex flex-col gap-3 border-2 border-charcoal" style={{ background: "linear-gradient(160deg,#FFF6FA,#FFFDF5)", boxShadow: "0 4px 16px rgba(232,75,106,0.08)" }}>
        <div className="flex items-center gap-2">
          <Ico as={DoodleSparkles} size={20} />
          <span className="text-[15px] text-charcoal" style={BINGGRAE}>내 신살 정밀 풀이</span>
          <span className="ml-auto"><Basis t="신살 종합" /></span>
        </div>
        {ai.status === "loading" && (
          <div className="flex flex-col gap-2 py-1">
            {[100, 96, 100, 72].map((w, i) => <div key={i} className="h-3 rounded-full bg-charcoal/10 animate-pulse" style={{ width: `${w}%` }} />)}
            <p className="text-[13px] text-text-muted mt-1">신살을 하나씩 풀어보는 중…</p>
          </div>
        )}
        {ai.status === "done" && <Prose text={ai.text} />}
        {(ai.status === "error" || ai.status === "idle") && <Prose text={fallbackProse} />}
      </div>

      <ChapterDivider n={1} title="내가 가진 신살은" />

      {/* 시그니처 신살 — 대표 카드 */}
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

      {/* 보유 신살 도감 — 한눈에 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleBook} basis="원국 종합">내 신살 도감 · {data.ownedCount}개</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {data.owned.map(o => <SinsalBadge key={o.name} name={o.name} sub={`${o.positions.length}자리`} />)}
        </div>
        <p className="text-[13px] text-text-muted leading-snug" style={GAEGU}>무서운 이름도 사실은 다 너의 특수 속성이야. 다음 장에서 하나씩 풀어줄게.</p>
      </div>

      {/* 신살 능력치 — 레이더 */}
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

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6">
      {/* [무료] 표지 */}
      <div className="flex flex-col items-center gap-2.5 text-center pt-2">
        <span className="text-[13px] text-text-muted tracking-wider">신 살 도 감</span>
        <div className="p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
          <Avatar iljuKey={charKey} size={88} />
        </div>
        <p className="text-[24px] text-charcoal" style={BINGGRAE}>내 신살 도감</p>
        <div className="px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: sigCs.bg, border: `1.5px dashed ${sigCs.ink}` }}>
          <Ico as={sigInfo.D} size={15} /> <p className="text-[14px]" style={{ ...BINGGRAE, color: sigCs.ink }}>대표 · {sigInfo.alias}</p>
        </div>
        <p className="text-[14px] text-charcoal/70 leading-relaxed" style={GAEGU}>{teaser}</p>
      </div>

      {/* [유료] 페이월 게이트 */}
      {unlocked ? PaidBody : (
        <div className="flex flex-col">
          <div className="relative overflow-hidden" style={{ maxHeight: 150 }}>
            <div className="blur-[5px] pointer-events-none select-none">{PaidBody}</div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,254,242,0.15), var(--bg-cream,#FFFEF2) 88%)" }} />
          </div>
          <div className="-mt-7 rounded-2xl bg-white border-2 border-charcoal px-5 py-5 flex flex-col items-center gap-2.5 text-center" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
            <Ico as={DoodleKey} size={36} />
            <p className="text-[16px] text-charcoal" style={BINGGRAE}>내 신살 도감 전체 펼치기</p>
            <div className="flex flex-col gap-1.5 w-full py-1">
              {["보유 신살 전체 풀이 — 무서운 이름의 진짜 뜻", "신살 능력치 · 자리별 의미 · 시너지", "살릴 건 살리고 · 올해의 신살"].map((t, i) => (
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
