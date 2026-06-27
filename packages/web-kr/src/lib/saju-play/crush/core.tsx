"use client"
// ════════════════════════════════════════════════════════════════
// 썸/짝사랑 분석기 공용 코어 — 혼자서 둘 다 입력하는 유료 단품.
// 같은 셸(입력→연출→페이월→결과)을 config(some.ts / crush.ts)로 갈아끼운다.
// 친구·커플과 다른 전제: 아직 안 가까운 사이 → "진단"이 아니라 "예측+전략+타이밍".
// 무료: 성사 가능성 % + 온도계 / 유료: 마음·전략·타이밍·럭키 (페이월 목업, 실결제 추후)
// ════════════════════════════════════════════════════════════════
import { useState } from "react"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { elemOf, relType, ELEMS, pairKey, mockDist, clamp, type Elem, type Rel } from "../engine"
import { ELEM_BG, ELEM_COLOR, ELEM_DOODLE } from "../flavor"
import {
  DoodleHeart, DoodleSparkle, DoodleSpeechBubble, DoodlePencil, DoodlePolaroid,
  DoodleLightning, DoodleKey, DoodleHourglass, DoodleCalendar, DoodleTaegeuk,
  DoodleRedString, DoodleClover, DoodleQuestionMark,
} from "@/components/doodles"

type DoodleC = React.FC<{ className?: string }>
const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
const PINK = "#E84B6A"

function Ico({ as: D, size = 18 }: { as: DoodleC; size?: number }) {
  return (
    <span className="inline-flex items-center justify-center shrink-0 align-middle" style={{ width: size, height: size }}>
      <D className="w-full h-full" />
    </span>
  )
}

// ── config 계약 ──────────────────────────────────────────────────
export type CrushConfig = {
  mode: "some" | "crush"
  accent: string                       // 모드 대표색 (썸=핑크, 짝사랑=보라)
  landing: { hi: DoodleC; line: React.ReactNode; sub: string; cta: string }
  gaugeName: string                    // "성사 가능성" 등
  scoreOpt: { same: number; sheng: number; ke: number }
  /** 오행 조합별 아키타입(상생/상극) + 동일(same). 키는 pairKey(정렬결합). */
  archetype: Record<string, { name: string; vibe: string; D: DoodleC }>
  sameArch: { name: string; vibe: string; D: DoodleC }
  /** 온도계 단계 — min 오름차순. score가 속한 마지막 단계 적용. */
  temp: { min: number; label: string; line: string }[]
  openHeart: Record<Elem, { title: string; line: string }>   // 상대(그 사람) 오행 → 마음 여는 법
  chemi: Record<Rel, { good: string; care: string }>          // 끌리는/어긋나는 포인트
  strategy: Record<Rel, string[]>                             // 다가가는 전략(처방전)
  timing: { when: string; line: string; avoid: string }       // 진전·고백 타이밍
  anti: Record<Elem, string>                                  // 상대 오행 → 하지 말 것
  extra: { title: string; D: DoodleC; a: { k: string; v: string }[] } // 모드 전용(썸=밀당 / 짝사랑=현실·위로)
  lucky: Record<Elem, { day: string; place: string; color: string; colorHex: string }>
  price: string
}

// ── mock 일주: 입력(이름·생일·성별)에서 결정적으로 파생 → 입력 달라지면 결과 달라짐 ──
const STEMS = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"]
const BRANCHES = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"]
type Person = { name: string; birth: { y: string; m: string; d: string }; gender: "M" | "F" }
function mockIlju(p: Person): string {
  const seed = (parseInt(p.birth.y || "0") || 0) + (parseInt(p.birth.m || "0") || 0) * 31 +
    (parseInt(p.birth.d || "0") || 0) * 3 + [...p.name].reduce((a, c) => a + c.charCodeAt(0), 0)
  const stem = STEMS[seed % 10]
  const branch = BRANCHES[(seed * 7) % 12]
  return `${stem}${branch}-${p.gender === "M" ? "m" : "f"}`
}

function Avatar({ iljuKey, size = 72 }: { iljuKey: string; size?: number }) {
  return (
    <div className="rounded-full overflow-hidden border-2 border-charcoal/15 shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: ELEM_BG[elemOf(iljuKey)] }}>
      {ILJU_SVG_ICONS[iljuKey]?.(getIljuProfileViewBox(iljuKey))}
    </div>
  )
}

function PersonForm({ label, hint, p, set }: {
  label: string; hint: string; p: Person; set: (p: Person) => void
}) {
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
      <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}>
        <Ico as={DoodlePencil} size={17} /> {label} <span className="text-[13px] text-text-muted font-normal" style={{ fontFamily: "inherit" }}>{hint}</span>
      </p>
      <input value={p.name} onChange={e => set({ ...p, name: e.target.value.slice(0, 10) })} placeholder="이름 / 별명"
        className="w-full text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none"
        style={{ background: "#FFFDE8", border: "1.5px dashed #D4B870" }} />
      <div className="flex gap-2">
        <input value={p.birth.y} onChange={e => set({ ...p, birth: { ...p.birth, y: e.target.value.replace(/\D/g, "").slice(0, 4) } })} placeholder="1998" inputMode="numeric"
          className="flex-1 text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none text-center" style={{ background: "white", border: "1.5px solid #E0D4C0" }} />
        <input value={p.birth.m} onChange={e => set({ ...p, birth: { ...p.birth, m: e.target.value.replace(/\D/g, "").slice(0, 2) } })} placeholder="월" inputMode="numeric"
          className="w-16 text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none text-center" style={{ background: "white", border: "1.5px solid #E0D4C0" }} />
        <input value={p.birth.d} onChange={e => set({ ...p, birth: { ...p.birth, d: e.target.value.replace(/\D/g, "").slice(0, 2) } })} placeholder="일" inputMode="numeric"
          className="w-16 text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none text-center" style={{ background: "white", border: "1.5px solid #E0D4C0" }} />
      </div>
      <div className="flex gap-2">
        {(["M", "F"] as const).map(g => (
          <button key={g} onClick={() => set({ ...p, gender: g })}
            className="flex-1 py-2.5 rounded-xl text-[14px] font-bold border-2 transition-colors"
            style={p.gender === g ? { background: PINK, color: "#FFF9F0", borderColor: PINK } : { background: "white", color: "#94A3B8", borderColor: "#E0D4C0" }}>
            {g === "M" ? "남" : "여"}
          </button>
        ))}
      </div>
    </div>
  )
}

const SectionTitle = ({ icon, children }: { icon: DoodleC; children: React.ReactNode }) => (
  <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={icon} size={18} /> {children}</p>
)

type Step = "landing" | "input" | "loading" | "result"
const emptyP = (): Person => ({ name: "", birth: { y: "", m: "", d: "" }, gender: "M" })
const validP = (p: Person) => p.name.trim() !== "" && p.birth.y.length === 4 && !!p.birth.m && !!p.birth.d

export default function CrushFunnel({ config }: { config: CrushConfig }) {
  const [step, setStep] = useState<Step>("landing")
  const [me, setMe] = useState<Person>(emptyP)
  const [them, setThem] = useState<Person>(() => ({ ...emptyP(), gender: "F" }))
  const [unlocked, setUnlocked] = useState(false)

  const start = () => {
    setStep("loading")
    setTimeout(() => setStep("result"), 1800)
  }

  // ── 랜딩 ──
  if (step === "landing") {
    return (
      <div className="flex flex-col items-center gap-5 pt-4 text-center">
        <Ico as={config.landing.hi} size={56} />
        <p className="text-[21px] text-charcoal leading-snug" style={BINGGRAE}>{config.landing.line}</p>
        <div className="w-full rounded-2xl bg-white border border-charcoal/10 px-4 py-4">
          <p className="text-[14px] text-charcoal/80 leading-relaxed" style={GAEGU}>{config.landing.sub}</p>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-text-muted">
          <Ico as={DoodleKey} size={15} /> 혼자만 보는 분석이에요. 상대는 몰라요.
        </div>
        <button onClick={() => setStep("input")}
          className="w-full h-[54px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal"
          style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
          {config.landing.cta}
        </button>
      </div>
    )
  }

  // ── 입력 (나 + 그 사람) ──
  if (step === "input") {
    const valid = validP(me) && validP(them)
    return (
      <div className="flex flex-col gap-4 pt-2">
        <p className="text-[20px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleRedString} size={22} /> 두 사람 정보</p>
        <PersonForm label="나" hint="" p={me} set={setMe} />
        <PersonForm label="그 사람" hint="· 아는 만큼만" p={them} set={setThem} />
        <button onClick={start} disabled={!valid}
          className="w-full h-[54px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal disabled:opacity-30"
          style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
          분석 시작
        </button>
      </div>
    )
  }

  // ── 연출 ──
  if (step === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-24 text-center">
        <span className="animate-pulse"><Ico as={DoodleRedString} size={64} /></span>
        <p className="text-[18px] text-charcoal" style={BINGGRAE}>두 사람 사주를 맞춰보는 중…</p>
        <p className="text-[14px] text-text-muted" style={GAEGU}>{me.name || "나"} ❤ {them.name || "그 사람"}</p>
      </div>
    )
  }

  // ── 결과 ──
  const meK = mockIlju(me), themK = mockIlju(them)
  const eMe = elemOf(meK), eThem = elemOf(themK)
  const rel = relType(eMe, eThem)
  const arch = eMe === eThem ? config.sameArch : (config.archetype[pairKey(eMe, eThem)] ?? config.sameArch)
  const seed = [...(me.name + them.name)].reduce((a, c) => a + c.charCodeAt(0), 0)
  const score = clamp(config.scoreOpt[rel] + (seed % 7) - 3, 35, 97)
  const stage = [...config.temp].reverse().find(t => score >= t.min) ?? config.temp[0]
  const md = mockDist(meK), td = mockDist(themK)
  const open = config.openHeart[eThem]
  const lucky = config.lucky[eThem]

  // 페이월 뒤 유료 블록
  const PaidBody = (
    <div className="flex flex-col gap-6">
      {/* 상대 마음 여는 법 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleKey}>{them.name || "그 사람"} 마음 여는 법</SectionTitle>
        <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={{ background: ELEM_BG[eThem], border: `1.5px solid ${ELEM_COLOR[eThem]}` }}>
          <Ico as={ELEM_DOODLE[eThem]} size={22} />
          <div>
            <p className="text-[14px] font-bold text-charcoal">{open.title}</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{open.line}</p>
          </div>
        </div>
      </div>

      {/* 끌리는 / 어긋나는 포인트 */}
      <div className="grid grid-cols-1 gap-2">
        <div className="rounded-2xl px-4 py-3 flex items-start gap-2.5" style={{ background: "#F0FFF4", border: "1.5px solid #86EFAC" }}>
          <Ico as={DoodleHeart} size={18} />
          <div><p className="text-[14px] font-bold text-charcoal">끌리는 포인트</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{config.chemi[rel].good}</p></div>
        </div>
        <div className="rounded-2xl px-4 py-3 flex items-start gap-2.5" style={{ background: "#FFF7ED", border: "1.5px solid #FDB877" }}>
          <Ico as={DoodleLightning} size={18} />
          <div><p className="text-[14px] font-bold text-charcoal">어긋나기 쉬운 포인트</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{config.chemi[rel].care}</p></div>
        </div>
      </div>

      {/* 사주 오행 밸런스 (좌 나 / 우 그 사람) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleTaegeuk}>사주 오행 밸런스</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-end gap-3">
            <span className="flex items-center gap-1 text-[14px] text-charcoal/70"><span className="w-2.5 h-2.5 rounded-full" style={{ background: PINK }} />{me.name || "나"}</span>
            <span className="flex items-center gap-1 text-[14px] text-charcoal/70"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#60A5FA" }} />{them.name || "그 사람"}</span>
          </div>
          {ELEMS.map(e => {
            const a = md[e], b = td[e], tot = a + b
            return (
              <div key={e} className="flex items-center gap-2">
                <Ico as={ELEM_DOODLE[e]} size={16} />
                <span className="w-4 text-[14px] font-bold text-charcoal shrink-0">{e}</span>
                <span className="w-4 text-[14px] font-bold text-right shrink-0" style={{ color: PINK }}>{a}</span>
                <div className="flex-1 h-3.5 rounded-full overflow-hidden flex" style={{ background: "#F1F5F9" }}>
                  <div style={{ width: `${tot ? (a / tot) * 100 : 0}%`, background: PINK }} />
                  <div style={{ width: `${tot ? (b / tot) * 100 : 0}%`, background: "#60A5FA" }} />
                </div>
                <span className="w-4 text-[14px] font-bold shrink-0" style={{ color: "#60A5FA" }}>{b}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 다가가는 전략 (처방전) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleSpeechBubble}>다가가는 전략</SectionTitle>
        <div className="rounded-2xl px-4 py-3.5 flex flex-col gap-2.5" style={{ background: "#FFF0F5", border: "1.5px solid #F9A8C4" }}>
          {config.strategy[rel].map((s, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[14px] font-bold shrink-0" style={{ color: PINK }}>{i + 1}</span>
              <p className="text-[14px] text-charcoal/80 leading-snug" style={GAEGU}>{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 진전·고백 타이밍 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleHourglass}>진전·고백 타이밍</SectionTitle>
        <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={{ background: "#EFF6FF", border: "1.5px solid #93C5FD" }}>
          <Ico as={DoodleCalendar} size={20} />
          <div>
            <p className="text-[14px] font-bold text-charcoal">{config.timing.when}</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{config.timing.line}</p>
            <p className="text-[14px] text-charcoal/50 leading-snug mt-1" style={GAEGU}>피할 때: {config.timing.avoid}</p>
          </div>
        </div>
      </div>

      {/* 하지 말 것 */}
      <div className="rounded-2xl px-4 py-3 flex items-start gap-2.5" style={{ background: "#FEF2F2", border: "1.5px solid #FCA5A5" }}>
        <Ico as={DoodleQuestionMark} size={18} />
        <div><p className="text-[14px] font-bold text-charcoal">이건 역효과예요</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{config.anti[eThem]}</p></div>
      </div>

      {/* 모드 전용 (썸=밀당 / 짝사랑=현실·위로) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={config.extra.D}>{config.extra.title}</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-1">
          {config.extra.a.map((row, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-charcoal/5 last:border-0">
              <span className="text-[14px] font-bold text-charcoal shrink-0 w-14">{row.k}</span>
              <span className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{row.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 고백 럭키 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleClover}>고백 럭키</SectionTitle>
        <div className="grid grid-cols-3 gap-2">
          {[
            { k: "좋은 날", v: lucky.day },
            { k: "장소", v: lucky.place },
            { k: "색", v: lucky.color, hex: lucky.colorHex },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl bg-white border border-charcoal/10 px-2 py-3 flex flex-col items-center gap-1 text-center">
              <span className="text-[13px] text-text-muted">{c.k}</span>
              <span className="text-[14px] font-bold text-charcoal flex items-center gap-1">
                {c.hex && <span className="w-3 h-3 rounded-full" style={{ background: c.hex }} />}{c.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6">
      {/* [무료] 헤더 — 마주보기 + 가능성 % */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <Avatar iljuKey={meK} size={68} />
            <span className="text-[14px] font-bold text-charcoal">{me.name || "나"}</span>
            <span className="text-[14px] text-text-muted flex items-center gap-1">{eMe} <Ico as={ELEM_DOODLE[eMe]} size={13} /></span>
          </div>
          <div className="flex flex-col items-center">
            <Ico as={DoodleRedString} size={26} />
            <span className="text-[13px] text-text-muted -mt-0.5">{config.gaugeName}</span>
            <span className="text-[40px] leading-none" style={{ ...BINGGRAE, color: PINK }}>{score}%</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar iljuKey={themK} size={68} />
            <span className="text-[14px] font-bold text-charcoal">{them.name || "그 사람"}</span>
            <span className="text-[14px] text-text-muted flex items-center gap-1">{eThem} <Ico as={ELEM_DOODLE[eThem]} size={13} /></span>
          </div>
        </div>
        <div className="px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#FFF4E0", border: "1.5px dashed #F0C060" }}>
          <Ico as={arch.D} size={16} /> <p className="text-[15px] text-[#9A7050]" style={BINGGRAE}>{arch.name}</p>
        </div>
        <p className="text-[14px] text-charcoal/70 leading-relaxed" style={GAEGU}>{arch.vibe}</p>
      </div>

      {/* [무료] 온도계 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleSparkle}>우리 사이 온도</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2.5">
          <div className="relative h-3.5 rounded-full overflow-hidden" style={{ background: "linear-gradient(90deg,#BFDBFE,#FBBF24,#E84B6A)" }}>
            <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 shadow-sm" style={{ left: `${score}%`, borderColor: PINK }} />
          </div>
          <p className="text-[15px] font-bold text-charcoal flex items-center gap-1.5" style={BINGGRAE}>{stage.label}</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{stage.line}</p>
        </div>
      </div>

      {/* [유료] 페이월 게이트 */}
      <div className="relative">
        <div className={unlocked ? "" : "blur-[6px] pointer-events-none select-none"} aria-hidden={!unlocked}>
          {PaidBody}
        </div>
        {!unlocked && (
          <div className="absolute inset-0 flex items-start justify-center pt-10"
            style={{ background: "linear-gradient(to bottom, rgba(255,254,242,0.35), var(--bg-cream, #FFFEF2) 28%)" }}>
            <div className="w-[88%] rounded-2xl bg-white border-2 border-charcoal px-5 py-5 flex flex-col items-center gap-3 text-center"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
              <Ico as={DoodleKey} size={36} />
              <p className="text-[16px] text-charcoal" style={BINGGRAE}>마음·전략·타이밍 잠금 해제</p>
              <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>
                {them.name || "그 사람"} 마음 여는 법, 다가가는 전략, 고백 타이밍까지 전부 풀려요.
              </p>
              <button onClick={() => setUnlocked(true)}
                className="w-full h-[52px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal mt-1"
                style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
                {config.price} 결제하고 전체 보기
              </button>
              <p className="text-[13px] text-text-muted">같은 상대는 다시 무료로 볼 수 있어요</p>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2 pt-1">
        <button className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-white text-charcoal active:opacity-70 flex items-center justify-center gap-1.5" style={GAEGU}>
          <Ico as={DoodlePolaroid} size={18} /> 결과 카드 저장
        </button>
        <button onClick={() => { setMe(emptyP()); setThem({ ...emptyP(), gender: "F" }); setUnlocked(false); setStep("input") }}
          className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-white text-charcoal active:opacity-70 flex items-center justify-center gap-1.5" style={GAEGU}>
          <Ico as={DoodleSparkle} size={18} /> 다른 사람도 분석하기
        </button>
      </div>
    </div>
  )
}
