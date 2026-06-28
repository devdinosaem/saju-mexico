"use client"
// ════════════════════════════════════════════════════════════════
// "다음달 운 미리보기" v2 — compat 결과창급 고도화 UI.
// 데이터(buildNextMonth)·flavor는 v1 그대로 재사용. 렌더만 재설계.
//  · 강한 히어로(큰 점수 + vibe + dashed pill)
//  · 영역 바(라벨+%+바+한줄) — compat 상황별 궁합 패턴
//  · 흰 카드 + 단일 액센트 위주(알록달록 알림박스 절제)
// ════════════════════════════════════════════════════════════════
import { useState, useEffect } from "react"
import Link from "next/link"
import { useUser } from "@/lib/UserContext"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { elemOf } from "../engine"
import { ELEM_BG, ELEM_DOODLE } from "../flavor"
import { buildNextMonth, type NextMonthBirth, type Gender, type DayPoint } from "./nextmonth-adapter"
import { WEATHER, MONTH_THEME, AREA, AREA_LINE, EVENT_COPY, LUCKY, MISSION } from "./flavor"
import { SINSAL, CAT_STYLE } from "../sinsal/flavor"
import { to24h } from "../crush/saju-adapter"
import {
  DoodleSparkles, DoodleKey, DoodleTaegeuk, DoodleHeart, DoodleCalendar,
  DoodleLetter, DoodleSpeechBubble, DoodleLightning, DoodleCompass,
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
function TitleRow({ icon, t, children }: { icon: DoodleC; t: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <p className="text-[15px] text-charcoal flex items-center gap-1.5 min-w-0" style={BINGGRAE}><Ico as={icon} size={18} /> {children}</p>
      <Basis t={t} />
    </div>
  )
}
function ChapterDivider({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5 pt-1">
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

// 일진 달력
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"]
function CalendarGrid({ days, year, month }: { days: DayPoint[]; year: number; month: number }) {
  const firstDow = new Date(year, month - 1, 1).getDay()
  const cells: (DayPoint | null)[] = [...Array(firstDow).fill(null), ...days]
  const cellBg = (c: DayPoint) => (c.good ? "#ECFDF5" : c.warn ? "#FEF2F2" : "transparent")
  const numColor = (c: DayPoint) => (c.good ? "#16A34A" : c.warn ? "#DC2626" : "#2D2D2D")
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-1.5">
        {WEEKDAYS.map((w, i) => <div key={w} className="text-center text-[12px] font-bold" style={{ color: i === 0 ? "#DC2626" : i === 6 ? "#2563EB" : "#94A3B8" }}>{w}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((c, i) => c === null ? <div key={i} /> : (
          <div key={i} className="aspect-square rounded-lg flex flex-col items-center justify-center gap-0.5" style={{ background: cellBg(c), border: c.good || c.warn ? "1px solid rgba(45,45,45,0.06)" : "none" }}>
            <span className="text-[13px] font-bold" style={{ color: numColor(c) }}>{c.day}</span>
            <span className="w-1 h-1 rounded-full" style={{ background: c.good ? "#16A34A" : c.warn ? "#DC2626" : "transparent" }} />
          </div>
        ))}
      </div>
    </div>
  )
}

type Ai = { status: "idle" | "loading" | "done" | "error"; text: string }
const FALLBACK_BIRTH: NextMonthBirth = { year: 1990, month: 2, day: 14, hour: 12, minute: 0 }
const PRICE = "0.7명태"
const AREA_LABEL = Object.fromEntries(AREA.map(a => [a.key, a.label]))
const barColor = (v: number) => (v >= 80 ? PINK : v >= 65 ? "#FBBF24" : "#94A3B8")

export default function NextMonthFunnelV2() {
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
  const monthSinsalInfo = SINSAL[data.monthSinsal]
  const lucky = LUCKY[data.yong]
  const mission = MISSION[data.yong]
  const diff = data.favorMonth - data.thisFavor
  const trend = diff >= 6 ? { arrow: "↗", line: "이번달보다 흐름이 한 단계 트여 — 미뤘던 걸 움직이기 좋아.", color: "#16A34A" }
    : diff <= -6 ? { arrow: "↘", line: "이번달보다 살짝 가라앉는 흐름 — 벌이기보다 다지는 달로.", color: "#DC2626" }
      : { arrow: "→", line: "이번달과 비슷한 결 — 큰 변화 없이 이어가면 돼.", color: "#94A3B8" }
  const areaLine = (k: keyof typeof data.areas, v: number) => v >= 72 ? AREA_LINE[k].hi : v <= 42 ? AREA_LINE[k].lo : AREA_LINE[k].mid
  const letter = `${data.monthLabel}의 너에게 — ${weather.line} ${theme.title}이 기다리고 있어.`
  const fallbackProse =
    `**${data.monthLabel}**, 너에겐 **${weather.label}** 같은 달이 와.\n\n` +
    `${theme.line} ${elemFavor === "good" ? "나를 살리는 기운이 들어와서 흐름이 트여." : elemFavor === "warn" ? "살짝 눌리는 구간이라, 키우기보다 다지기가 맞아." : "무난하게 흘러가는 달이야."}\n\n` +
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

  // ── 유료 본문 ──
  const PaidBody = (
    <div className="flex flex-col gap-6">
      {/* AI 정밀 예보 */}
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

      {/* 오행 호악 — 흰 카드 + 좌측 컬러바 */}
      <div className="flex flex-col gap-2.5">
        <TitleRow icon={ELEM_DOODLE[data.monthElem]} t="월운 오행">다음달 기운</TitleRow>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5 flex items-start gap-3">
          <span className="w-1.5 self-stretch rounded-full shrink-0" style={{ background: elemFavor === "good" ? "#16A34A" : elemFavor === "warn" ? "#F0A020" : "#CBD5E1" }} />
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-charcoal">{data.monthElem} 기운의 달 · {data.monthStemKr}{data.monthBranchKr}</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>
              {elemFavor === "good" ? `나를 살리는 ${data.yong} 기운이 들어와 — 흐름이 트이는 달이야. 벌여도 좋아.`
                : elemFavor === "warn" ? `조심할 ${data.gi} 기운이 도는 달 — 키우기보다 다지기, 큰 결정은 한 박자 쉬어가.`
                  : `용신 ${data.yong}·기신 ${data.gi} 어느 쪽도 아닌 무난한 달 — 내 페이스대로.`}
            </p>
          </div>
        </div>
      </div>

      {/* 충/합 이벤트 — 한 줄 칩 카드 */}
      {evtTypes.length > 0 && (
        <div className="grid grid-cols-1 gap-2">
          {evtTypes.map(type => {
            const c = EVENT_COPY[type], good = type === "합"
            const withList = [...new Set(data.events.filter(e => e.type === type).map(e => e.withLabel))].join(", ")
            return (
              <div key={type} className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3 flex items-center gap-3">
                <Ico as={good ? DoodleSparkles : DoodleLightning} size={20} />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-charcoal">{c.title} <span className="text-[12px] text-text-muted font-normal">· {withList} {type}</span></p>
                  <p className="text-[13px] text-charcoal/65 leading-snug" style={GAEGU}>{c.line}</p>
                </div>
                <span className="text-[12px] font-bold shrink-0" style={{ color: good ? "#16A34A" : "#DC2626" }}>{good ? "기회" : "변동"}</span>
              </div>
            )
          })}
        </div>
      )}

      <ChapterDivider n={2} title="영역별 예보" />

      {/* 5대 영역 — 바 + 한 줄 (compat 상황별 패턴) */}
      <div className="flex flex-col gap-2.5">
        <TitleRow icon={DoodleCompass} t="십신·신살">애정·일·돈·건강·관계</TitleRow>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3.5">
          {AREA.map(a => {
            const v = data.areas[a.key]
            return (
              <div key={a.key} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-charcoal flex items-center gap-1.5"><Ico as={a.D} size={16} /> {a.label}</span>
                  <span className="text-[14px] font-bold" style={{ color: v >= 80 ? PINK : "#2D2D2D" }}>{v}%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${v}%`, background: barColor(v) }} />
                </div>
                <p className="text-[13px] text-text-muted leading-snug" style={GAEGU}>{areaLine(a.key, v)}</p>
              </div>
            )
          })}
        </div>
        <p className="text-[13px] text-text-muted leading-snug px-1" style={GAEGU}>
          다음달은 <span className="font-bold" style={{ color: PINK }}>{topAreaLabel}</span> 쪽으로 바람이 불어{data.areas[lowAreaKey] < 45 ? `, ${AREA_LABEL[lowAreaKey]} 쪽은 살짝 신경 써줘` : ""}.
        </p>
      </div>

      <ChapterDivider n={3} title="이 달의 결" />

      {/* 켜지는 신살 — 신살 도감 연동 */}
      {monthSinsalInfo && (
        <div className="flex flex-col gap-2.5">
          <TitleRow icon={DoodleSparkles} t="월지 신살">이번 달 켜지는 기운</TitleRow>
          <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: CAT_STYLE[monthSinsalInfo.cat].bg }}>
              <span className="w-11 h-11 rounded-full bg-white/80 flex items-center justify-center shrink-0"><Ico as={monthSinsalInfo.D} size={24} /></span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] leading-tight" style={{ ...BINGGRAE, color: CAT_STYLE[monthSinsalInfo.cat].ink }}>{monthSinsalInfo.alias} <span className="text-[12px] font-normal text-charcoal/45">ON</span></p>
                <p className="text-[12px] text-charcoal/55" style={GAEGU}>{data.monthSinsal} · {monthSinsalInfo.cat}</p>
              </div>
              <Link href="/v3/sinsal" className="text-[12px] font-bold shrink-0 active:opacity-70" style={{ color: CAT_STYLE[monthSinsalInfo.cat].ink }}>도감 →</Link>
            </div>
            <div className="px-4 py-3 flex flex-col gap-1.5">
              <p className="text-[14px] text-charcoal/80 leading-snug" style={GAEGU}>{monthSinsalInfo.mean}.</p>
              <p className="text-[13px] text-charcoal/65 leading-snug" style={GAEGU}>{monthSinsalInfo.good}</p>
            </div>
          </div>
        </div>
      )}

      {/* 테마 심화 */}
      <div className="flex flex-col gap-2.5">
        <TitleRow icon={theme.D} t="월운 십신">이 기운, 이렇게 써</TitleRow>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5 flex items-start gap-3">
          <span className="w-1.5 self-stretch rounded-full shrink-0" style={{ background: PINK }} />
          <div><p className="text-[14px] font-bold text-charcoal">{theme.title}</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{theme.use}</p></div>
        </div>
      </div>

      <ChapterDivider n={4} title="일진 캘린더" />

      {/* 달력 */}
      <div className="flex flex-col gap-2.5">
        <TitleRow icon={DoodleCalendar} t="일진">{data.monthLabel} 좋은 날·주의할 날</TitleRow>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-3.5 py-4 flex flex-col gap-3">
          <CalendarGrid days={data.days} year={data.ym.year} month={data.ym.month} />
          <div className="flex items-center justify-center gap-4 text-[12px] text-text-muted pt-1 border-t border-charcoal/5">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#16A34A" }} />좋은 날</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#DC2626" }} />주의할 날</span>
          </div>
        </div>
      </div>

      {/* 좋은 날 / 조심할 날 */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white border border-charcoal/10 px-3.5 py-3.5 flex flex-col gap-2">
          <p className="text-[13px] font-bold flex items-center gap-1" style={{ color: "#16A34A" }}><span className="w-2 h-2 rounded-full" style={{ background: "#16A34A" }} />이런 날 움직여</p>
          {data.goodDays.length ? (
            <div className="flex flex-wrap gap-1.5">
              {data.goodDays.map(dn => {
                const tag = data.days.find(x => x.day === dn)?.tag
                return <span key={dn} className="px-2 py-0.5 rounded-full text-[12px] font-bold" style={{ background: "#ECFDF5", color: "#16A34A" }}>{dn}일{tag ? `·${tag}` : ""}</span>
              })}
            </div>
          ) : <p className="text-[13px] text-charcoal/55" style={GAEGU}>고른 편이야.</p>}
        </div>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-3.5 py-3.5 flex flex-col gap-2">
          <p className="text-[13px] font-bold flex items-center gap-1" style={{ color: "#DC2626" }}><span className="w-2 h-2 rounded-full" style={{ background: "#DC2626" }} />이런 날 쉬어</p>
          {data.warnDays.length ? (
            <div className="flex flex-wrap gap-1.5">
              {data.warnDays.map(dn => <span key={dn} className="px-2 py-0.5 rounded-full text-[12px] font-bold" style={{ background: "#FEF2F2", color: "#DC2626" }}>{dn}일</span>)}
            </div>
          ) : <p className="text-[13px] text-charcoal/55" style={GAEGU}>크게 없어 — 무난.</p>}
        </div>
      </div>

      <ChapterDivider n={5} title="다음달 처방" />

      {/* 미션 */}
      <div className="flex flex-col gap-2.5">
        <TitleRow icon={mission.D} t="용신">이 달의 미션</TitleRow>
        <div className="rounded-2xl px-4 py-3.5 flex items-center gap-3" style={{ background: ELEM_BG[data.yong], border: "1.5px solid rgba(45,45,45,0.08)" }}>
          <span className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center shrink-0"><Ico as={mission.D} size={22} /></span>
          <p className="text-[14px] text-charcoal/80 leading-snug" style={GAEGU}>{mission.act} — 나를 살리는 <span className="font-bold text-charcoal">{data.yong}</span> 기운이 보약이야.</p>
        </div>
      </div>

      {/* 행운 아이템 */}
      <div className="grid grid-cols-4 gap-2">
        {([["색", lucky.color], ["방향", lucky.dir], ["숫자", lucky.num], ["아이템", lucky.item]] as const).map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-white border border-charcoal/10 px-2 py-3 flex flex-col items-center gap-0.5 text-center">
            <span className="text-[11px] text-text-muted">{k}</span>
            <span className="text-[12px] font-bold text-charcoal leading-tight">{v}</span>
          </div>
        ))}
      </div>

      {/* 할 것 / 하지 말 것 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
        <div className="px-4 py-3 flex items-start gap-2.5 border-b border-charcoal/5">
          <span className="text-[13px] font-bold shrink-0 w-14" style={{ color: "#16A34A" }}>이렇게</span>
          <p className="text-[14px] text-charcoal/75 leading-snug" style={GAEGU}>{theme.use}</p>
        </div>
        <div className="px-4 py-3 flex items-start gap-2.5">
          <span className="text-[13px] font-bold shrink-0 w-14" style={{ color: "#C2660C" }}>한 박자</span>
          <p className="text-[14px] text-charcoal/75 leading-snug" style={GAEGU}>{data.chungCount > 0 ? "충 기운이 도는 달 — 큰 계약·이사·결별 같은 결정은 신중히." : data.monthElem === data.gi ? "무리한 확장·새 빚은 다음으로 — 키우기보다 지키기." : "욕심내서 일을 키우기보다, 벌인 것부터 매듭짓기."}</p>
        </div>
      </div>

      {/* ── 보너스 ── */}
      <div className="flex items-center gap-2.5 pt-1">
        <Ico as={DoodleSparkles} size={20} />
        <span className="text-[15px] text-charcoal shrink-0" style={BINGGRAE}>재미로 보는 다음달</span>
        <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
      </div>

      {/* 이번달 vs 다음달 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex-1 text-center"><p className="text-[12px] text-text-muted">이번달</p><p className="text-[22px]" style={{ ...BINGGRAE, color: "#94A3B8" }}>{data.thisFavor}</p></div>
          <span className="text-[30px]" style={{ ...BINGGRAE, color: trend.color }}>{trend.arrow}</span>
          <div className="flex-1 text-center"><p className="text-[12px] text-text-muted">다음달</p><p className="text-[22px]" style={{ ...BINGGRAE, color: PINK }}>{data.favorMonth}</p></div>
        </div>
        <p className="text-[13px] text-text-muted leading-snug text-center" style={GAEGU}>{trend.line}</p>
      </div>

      {/* 한 줄 운세 카드 */}
      <div className="rounded-2xl px-4 py-4 flex flex-col items-center gap-2 text-center border-2 border-dashed border-charcoal/25" style={{ background: "#FFFDF5" }}>
        <Ico as={weather.D} size={28} />
        <span className="text-[12px] text-text-muted">{data.monthLabel} 한 줄 운세</span>
        <p className="text-[17px]" style={{ ...BINGGRAE, color: PINK }}>{weather.label}{data.keywords[0] ? `, #${data.keywords[0]}` : ""}의 달</p>
        <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{topAreaLabel} 쪽으로 바람이 불어와.</p>
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
      {/* [무료] 예고편 히어로 — 강한 앵커 */}
      <div className="flex flex-col items-center gap-2 text-center pt-2">
        <p className="text-[15px] text-text-muted flex items-center gap-1.5" style={GAEGU}><Ico as={DoodleCalendar} size={18} /> {data.monthLabel}, 너의 운세는</p>
        <div className="p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
          <Avatar iljuKey={charKey} size={76} />
        </div>
        <p className="text-[64px] leading-none mt-1" style={{ ...BINGGRAE, color: PINK }}>{data.favorMonth}<span className="text-[24px]">점</span></p>
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}>{weather.label} <Ico as={weather.D} size={18} /></p>
        <div className="mt-1 px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#FFF4E0", border: "1.5px dashed #F0C060" }}>
          <Ico as={theme.D} size={16} /> <p className="text-[14px] text-[#9A7050]" style={BINGGRAE}>{theme.title} · {data.monthTenGod}결</p>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 mt-1">
          {data.keywords.map(k => <span key={k} className="px-2.5 py-1 rounded-full text-[13px] font-bold" style={{ background: "#FFF0F5", color: PINK }}>#{k}</span>)}
        </div>
        <div className="w-full rounded-2xl px-4 py-3.5 flex items-start gap-2.5 mt-1.5" style={{ background: "#FFFDF5", border: "1.5px solid #F0C060" }}>
          <Ico as={DoodleLetter} size={20} />
          <p className="text-[14px] text-charcoal/80 leading-snug text-left" style={GAEGU}>{letter}</p>
        </div>
      </div>

      {/* [유료] 페이월 */}
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
