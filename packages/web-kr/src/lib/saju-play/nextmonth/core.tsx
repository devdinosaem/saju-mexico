"use client"
// ════════════════════════════════════════════════════════════════
// "다음달 운 미리보기" 셸 — 1인·입력 0. 계정 생일로 즉시.
// 무료 예고편(날씨·키워드·한 줄 편지) → 페이월 → 본편(일진 캘린더는 단계별 추가).
// 디자인: self/sinsal과 동일 결. AI는 /api/saju-play/nextmonth(에이전트 제작), 없으면 폴백.
// ════════════════════════════════════════════════════════════════
import { useState, useEffect } from "react"
import Link from "next/link"
import { useUser } from "@/lib/UserContext"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { elemOf } from "../engine"
import { ELEM_BG, ELEM_DOODLE } from "../flavor"
import { buildNextMonth, type NextMonthBirth, type Gender } from "./nextmonth-adapter"
import { WEATHER, MONTH_THEME, AREA, EVENT_COPY } from "./flavor"
import { to24h } from "../crush/saju-adapter"
import {
  DoodleSparkles, DoodleKey, DoodleTaegeuk, DoodleHeart,
  DoodleCalendar, DoodleLetter, DoodleSpeechBubble, DoodleLightning,
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

type Ai = { status: "idle" | "loading" | "done" | "error"; text: string }
const FALLBACK_BIRTH: NextMonthBirth = { year: 1990, month: 2, day: 14, hour: 12, minute: 0 }
const PRICE = "0.7명태"
const AREA_LABEL = Object.fromEntries(AREA.map(a => [a.key, a.label]))

export default function NextMonthFunnel() {
  const { user } = useUser()
  const bd = user.birthDate
  const birth: NextMonthBirth = bd
    ? { year: +bd.year, month: +bd.month, day: +bd.day, hour: to24h(bd.hour, bd.ampm), minute: parseInt(bd.minute) || 0 }
    : FALLBACK_BIRTH
  const gender: Gender = bd?.gender === "F" ? "F" : "M"
  const data = buildNextMonth(birth, gender)

  const [step, setStep] = useState<"loading" | "result">("loading")
  const [unlocked, setUnlocked] = useState(false)
  const [ai, setAi] = useState<Ai>({ status: "idle", text: "" })

  useEffect(() => {
    if (!data) return
    setAi({ status: "loading", text: "" })
    fetch("/api/saju-play/nextmonth", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: bd?.name || "너", monthBlock: data.monthBlock }),
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
  const weather = WEATHER.find(w => data.favorMonth >= w.min) ?? WEATHER[WEATHER.length - 1]
  const theme = MONTH_THEME[data.monthGroup]
  const topAreaKey = (Object.keys(data.areas) as (keyof typeof data.areas)[]).reduce((a, b) => (data.areas[b] > data.areas[a] ? b : a))
  const lowAreaKey = (Object.keys(data.areas) as (keyof typeof data.areas)[]).reduce((a, b) => (data.areas[b] < data.areas[a] ? b : a))
  const topAreaLabel = AREA_LABEL[topAreaKey]
  const elemFavor = data.monthElem === data.yong ? "good" : data.monthElem === data.gi ? "warn" : "neutral"
  const evtTypes = [...new Set(data.events.map(e => e.type))]
  const gaugeColor = (v: number) => (v >= 66 ? "#16A34A" : v >= 45 ? PINK : "#94A3B8")
  const letter = `${data.monthLabel}의 너에게 — ${weather.line} ${theme.title}이 기다리고 있어.`
  const fallbackProse =
    `**${data.monthLabel}**, 너에겐 **${weather.label}** 같은 달이 와.\n\n` +
    `${theme.line} ${data.monthElem === data.yong ? "나를 살리는 기운이 들어와서 흐름이 트여." : data.monthElem === data.gi ? "살짝 눌리는 구간이라, 키우기보다 다지기가 맞아." : "무난하게 흘러가는 달이야."}\n\n` +
    `특히 **${topAreaLabel}** 쪽으로 바람이 불어. 좋은 날은 ${data.goodDays.slice(0, 3).join(", ") || "고른 편"}일${data.warnDays.length ? `, 조심할 날은 ${data.warnDays.join(", ")}일` : ""} 정도야.`

  if (step === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-24 text-center">
        <span className="animate-pulse"><Ico as={DoodleCalendar} size={60} /></span>
        <p className="text-[18px] text-charcoal" style={BINGGRAE}>다음달을 미리 펼쳐보는 중…</p>
        <p className="text-[14px] text-text-muted" style={GAEGU}>{data.monthLabel}의 바람을 읽는 중</p>
      </div>
    )
  }

  // ── 유료 본문(2차: 히어로 + 날씨 종합. 영역·일진은 다음 단계) ──
  const PaidBody = (
    <div className="flex flex-col gap-6">
      {/* 다음달 정밀 예보 — 히어로 */}
      <div className="rounded-2xl px-4 py-4 flex flex-col gap-3 border-2 border-charcoal" style={{ background: "linear-gradient(160deg,#FFF6FA,#FFFDF5)", boxShadow: "0 4px 16px rgba(232,75,106,0.08)" }}>
        <div className="flex items-center gap-2">
          <Ico as={DoodleSparkles} size={20} />
          <span className="text-[15px] text-charcoal" style={BINGGRAE}>다음달 정밀 예보</span>
          <span className="ml-auto"><Basis t={`${data.monthLabel} 월운`} /></span>
        </div>
        {ai.status === "loading" && (
          <div className="flex flex-col gap-2 py-1">
            {[100, 96, 100, 72].map((w, i) => <div key={i} className="h-3 rounded-full bg-charcoal/10 animate-pulse" style={{ width: `${w}%` }} />)}
            <p className="text-[13px] text-text-muted mt-1">다음달 흐름을 읽는 중…</p>
          </div>
        )}
        {ai.status === "done" && <Prose text={ai.text} />}
        {(ai.status === "error" || ai.status === "idle") && <Prose text={fallbackProse} />}
      </div>

      <ChapterDivider n={1} title="다음달, 한눈에" />

      {/* 운세 날씨 종합 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={weather.D} basis="종합">{data.monthLabel} 운세 날씨</SectionTitle>
        <div className="rounded-2xl border-2 border-charcoal/10 bg-white px-4 py-5 flex flex-col items-center gap-2 text-center">
          <Ico as={weather.D} size={52} />
          <p className="text-[22px] text-charcoal" style={BINGGRAE}>{weather.label}</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{weather.line}</p>
          <div className="flex flex-wrap justify-center gap-1.5 pt-1">
            {data.keywords.map(k => (
              <span key={k} className="px-2.5 py-1 rounded-full text-[13px] font-bold" style={{ background: "#FFF0F5", color: PINK }}>#{k}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 이 달의 테마 */}
      <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={{ background: "#FFFDF5", border: "1.5px solid #F0C060" }}>
        <Ico as={theme.D} size={22} />
        <div className="min-w-0"><p className="text-[14px] font-bold text-charcoal">{theme.title} · {data.monthTenGod}결</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{theme.line}</p></div>
      </div>

      {/* 오행 호악 */}
      <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5"
        style={elemFavor === "good" ? { background: "#F0FFF4", border: "1.5px solid #86EFAC" } : elemFavor === "warn" ? { background: "#FFF7ED", border: "1.5px solid #FDB877" } : { background: "white", border: "1px solid rgba(45,45,45,0.1)" }}>
        <Ico as={ELEM_DOODLE[data.monthElem]} size={22} />
        <div className="min-w-0">
          <p className="text-[14px] font-bold text-charcoal">다음달은 {data.monthElem} 기운의 달</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>
            {elemFavor === "good" ? `나를 살리는 ${data.yong} 기운이 들어와 — 흐름이 트이는 달이야. 벌여도 좋아.`
              : elemFavor === "warn" ? `조심할 ${data.gi} 기운이 도는 달 — 키우기보다 다지기, 큰 결정은 한 박자 쉬어가.`
                : `용신 ${data.yong}·기신 ${data.gi} 어느 쪽도 아닌 무난한 달 — 내 페이스대로 가면 돼.`}
          </p>
        </div>
      </div>

      {/* 충/합 이벤트 배지 */}
      {evtTypes.length > 0 && (
        <div className="flex flex-col gap-2">
          {evtTypes.map(type => {
            const c = EVENT_COPY[type]
            const withList = [...new Set(data.events.filter(e => e.type === type).map(e => e.withLabel))].join(", ")
            const good = type === "합"
            return (
              <div key={type} className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={good ? { background: "#EFF6FF", border: "1.5px solid #93C5FD" } : { background: "#FEF2F2", border: "1.5px solid #FCA5A5" }}>
                <Ico as={good ? DoodleSparkles : DoodleLightning} size={20} />
                <div className="min-w-0"><p className="text-[14px] font-bold text-charcoal">{c.title} <span className="text-[12px] text-text-muted font-normal">· {withList} {type}</span></p>
                  <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{c.line}</p></div>
              </div>
            )
          })}
        </div>
      )}

      <ChapterDivider n={2} title="영역별 예보" />

      {/* 5대 영역 게이지 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleTaegeuk} basis="십신·신살">애정·일·돈·건강·관계</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
          {AREA.map(a => {
            const v = data.areas[a.key]
            return (
              <div key={a.key} className="flex items-center gap-2.5">
                <Ico as={a.D} size={16} />
                <span className="w-12 text-[14px] font-bold text-charcoal shrink-0">{a.label}</span>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                  <div className="h-full rounded-full" style={{ width: `${v}%`, background: gaugeColor(v) }} />
                </div>
                <span className="w-7 text-[13px] text-text-muted text-right shrink-0">{v}</span>
              </div>
            )
          })}
          <p className="text-[14px] text-charcoal/70 leading-snug pt-1" style={GAEGU}>
            다음달은 <span className="font-bold" style={{ color: PINK }}>{topAreaLabel}</span> 쪽으로 바람이 불어{data.areas[lowAreaKey] < 45 ? `, ${AREA_LABEL[lowAreaKey]} 쪽은 살짝 신경 써주면 좋아` : ""}.
          </p>
        </div>
      </div>

      {/* consult 크로스셀 */}
      <Link href="/v3/consult" className="rounded-2xl px-4 py-4 flex items-center gap-3 active:opacity-85 transition-opacity" style={{ background: "linear-gradient(160deg,#FFF6FA,#FFFDF5)", border: "2px solid #2D2D2D" }}>
        <Ico as={DoodleSpeechBubble} size={24} />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-charcoal" style={BINGGRAE}>다음달, 더 궁금한 건 물어봐</p>
          <p className="text-[13px] text-charcoal/60 leading-snug" style={GAEGU}>내 사주 캐릭터한테 직접 — 시기·선택 뭐든</p>
        </div>
        <span className="text-[18px]" style={{ color: PINK }}>→</span>
      </Link>
    </div>
  )

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6">
      {/* [무료] 예고편 표지 */}
      <div className="flex flex-col items-center gap-2.5 text-center pt-2">
        <span className="text-[13px] text-text-muted tracking-wider">다 음 달 예 고 편</span>
        <div className="p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
          <Avatar iljuKey={charKey} size={88} />
        </div>
        <p className="text-[24px] text-charcoal" style={BINGGRAE}>다음달 운 미리보기</p>
        <div className="px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#FFF4E0", border: "1.5px dashed #F0C060" }}>
          <Ico as={weather.D} size={15} /> <p className="text-[14px] text-[#9A7050]" style={BINGGRAE}>{data.monthLabel} · {weather.label}</p>
        </div>
        {/* 키워드 미리보기 */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {data.keywords.map(k => (
            <span key={k} className="px-2.5 py-1 rounded-full text-[13px] font-bold" style={{ background: "#FFF0F5", color: PINK }}>#{k}</span>
          ))}
        </div>
        {/* 한 줄 편지 */}
        <div className="w-full rounded-2xl px-4 py-3.5 flex items-start gap-2.5 mt-1" style={{ background: "#FFFDF5", border: "1.5px solid #F0C060" }}>
          <Ico as={DoodleLetter} size={20} />
          <p className="text-[14px] text-charcoal/80 leading-snug text-left" style={GAEGU}>{letter}</p>
        </div>
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
            <p className="text-[16px] text-charcoal" style={BINGGRAE}>다음달 전체 예보 펼치기</p>
            <div className="flex flex-col gap-1.5 w-full py-1">
              {["AI 정밀 예보 — 다음달 흐름 풀이", "영역별(애정·일·돈·건강·관계) 게이지", "일진 캘린더 — 길일·주의일까지"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-charcoal/70"><Ico as={DoodleHeart} size={13} /> {t}</div>
              ))}
            </div>
            <button onClick={() => setUnlocked(true)} className="w-full h-[52px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal mt-0.5" style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
              {PRICE} 내고 전체 보기
            </button>
            <p className="text-[13px] text-text-muted">매달 새로 갱신돼요 — 다음달도 보러 와</p>
          </div>
        </div>
      )}
    </div>
  )
}
