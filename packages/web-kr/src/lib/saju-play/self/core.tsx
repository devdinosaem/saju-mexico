"use client"
// ════════════════════════════════════════════════════════════════
// "나 사용설명서" 셸 — 1인·입력 0. 계정 생일로 즉시.
// 카드 → 연출 → 무료 표지 → 페이월 → 전체 리포트(챕터는 단계별로 추가).
// 디자인: crush와 동일 결(두들 Ico·14px floor·BINGGRAE/GAEGU·근거 칩·챕터 구분선).
// AI는 /api/saju-play/self(에이전트 제작) 호출, 없으면 폴백 줄글.
// ════════════════════════════════════════════════════════════════
import { useState, useEffect } from "react"
import { useUser } from "@/lib/UserContext"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { ILJU_TYPES } from "@/lib/ilju-types"
import { elemOf, ELEMS, type Elem } from "../engine"
import { ELEM_BG, ELEM_COLOR, ELEM_DOODLE } from "../flavor"
import { buildSelf, type SelfBirth, type Gender } from "./self-adapter"
import { to24h } from "../crush/saju-adapter"
import {
  DoodleSparkles, DoodleBook, DoodleKey, DoodleTaegeuk, DoodleHeart,
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

type Ai = { status: "idle" | "loading" | "done" | "error"; text: string }
const FALLBACK_BIRTH: SelfBirth = { year: 1995, month: 3, day: 15, hour: 12, minute: 0 }
const PRICE = "1명태"

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
  const strongElems = ELEMS.filter(e => self.dist[e] >= 3)
  const weakElems = ELEMS.filter(e => self.dist[e] === 0)
  const teaser = `${self.dayKr}(${self.dayElem})·${self.yinYang} 일간 — ${self.strongLevel}. 강한 기운은 ${strongElems.join("·") || "고른 편"}, 빠진 건 ${weakElems.join("·") || "없음"}.`
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

      <ChapterDivider n={1} title="기본 스펙" />

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
            나를 살리는 기운은 <span className="font-bold" style={{ color: PINK }}>{self.yong}</span> · 조심할 기운은 {self.gi}. {self.strongLevel}이라 {self.isStrong ? "주도적으로 밀어붙일 때" : "기대고 채우며 갈 때"} 잘 풀려.
          </p>
        </div>
      </div>

      <p className="text-[13px] text-text-muted text-center" style={GAEGU}>…작동 원리 · 연애 모드 · 일·돈 · 인생 그래프 · 취급법 · 올해의 나 (준비 중)</p>
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
              {["원국 전체를 읽은 정밀 풀이", "재능·연애·일·돈 · 인생 그래프", "취급·관리법 · 올해의 나"].map((t, i) => (
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
