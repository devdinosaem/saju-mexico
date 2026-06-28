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
import { TALENT, ELEM_TRAIT, MEETING } from "./flavor"
import { to24h } from "../crush/saju-adapter"
import {
  DoodleSparkles, DoodleBook, DoodleKey, DoodleTaegeuk, DoodleHeart,
  DoodleLightning, DoodleMedal, DoodleMirror, DoodleSpeechBubble, DoodleStar,
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
  // 작동 원리 파생
  const dominantElem = ELEMS.reduce((a, b) => (self.dist[b] > self.dist[a] ? b : a), "목" as Elem)
  const ego = self.dayElem, persona = dominantElem, sameCore = ego === persona
  const energyPos = self.strongLevel.includes("극신강") ? 90 : self.strongLevel.includes("신강") ? 72
    : self.strongLevel.includes("극신약") ? 8 : self.strongLevel.includes("신약") ? 30 : 50
  const seenLine = `${self.tgGroups.식상 >= 2 ? "표현이 분명하고 끼 있는" : "차분하고 편안한"} 인상${self.tgGroups.관성 >= 2 ? " + 믿음직한 분위기" : ""}${self.dohwa ? " + 묘하게 끌리는 매력" : ""}`
  const meetingOrder = [...ELEMS].sort((a, b) => self.dist[b] - self.dist[a])
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

      <ChapterDivider n={2} title="작동 원리" />

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

      <p className="text-[13px] text-text-muted text-center" style={GAEGU}>…연애 모드 · 일·돈 · 인생 그래프 · 취급법 · 올해의 나 (준비 중)</p>
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
