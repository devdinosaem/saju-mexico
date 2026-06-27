"use client"
// ════════════════════════════════════════════════════════════════
// 썸/짝사랑 분석기 공용 코어 — 혼자서 둘 다 입력하는 유료 단품.
// 같은 셸(입력→연출→페이월→결과)을 config(some.ts / crush.ts)로 갈아끼운다.
// 친구·커플과 다른 전제: 아직 안 가까운 사이 → "진단"이 아니라 "예측+전략+타이밍".
// 무료: 성사 가능성 % + 온도계 / 유료: 정밀 풀이 + 마음·전략·타이밍 (페이월 목업)
// 폰트 정책(친구·커플 동일): 제목=BINGGRAE, 따뜻한 설명줄=GAEGU(손글씨), 줄글 본문=고딕.
// 연출(스켈레톤) 단계에서 풀이를 미리 돌려 결과 진입 시 바로 보이게.
// ════════════════════════════════════════════════════════════════
import { useState } from "react"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { elemOf, relType, ELEMS, pairKey, mockDist, clamp, type Elem, type Rel } from "../engine"
import { ELEM_BG, ELEM_COLOR, ELEM_DOODLE } from "../flavor"
import { useUser } from "@/lib/UserContext"
import {
  DoodleHeart, DoodleSparkle, DoodleSparkles, DoodleSpeechBubble, DoodlePencil, DoodlePolaroid,
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
  /** 상황별 케미 — base 점수에 delta 가감, % 바로 표시(커플 상황별 패턴). */
  situational: { key: string; D: DoodleC; delta: number; line: string }[]
  persona: Record<Elem, { tag: string; line: string }>        // 오행 → 연애 성향(프로필 카드)
  openHeart: Record<Elem, { title: string; line: string }>   // 상대(그 사람) 오행 → 마음 여는 법
  chemi: Record<Rel, { good: string; care: string }>          // 끌리는/어긋나는 포인트
  strategy: Record<Rel, string[]>                             // 다가가는 전략(처방전)
  timing: { when: string; line: string; avoid: string }       // 진전·고백 타이밍
  anti: Record<Elem, string>                                  // 상대 오행 → 하지 말 것
  extra: { title: string; D: DoodleC; a: { k: string; v: string }[] } // 모드 전용(썸=밀당 / 짝사랑=현실·위로)
  lucky: Record<Elem, { day: string; place: string; color: string; colorHex: string }>
  price: string
}

// ── mock 일주: 등록된 캐릭터 키 풀에서 입력 기반으로 결정적 선택(빈 아바타 방지) ──
const ICON_KEYS = Object.keys(ILJU_SVG_ICONS)
const KEYS_M = ICON_KEYS.filter(k => k.endsWith("-m"))
const KEYS_F = ICON_KEYS.filter(k => k.endsWith("-f"))
// 비로그인/일주 미설정(개발·목업) 폴백 — 운영은 로그인 우선이라 계정 일주 사용
const FALLBACK_ME_KEY = ICON_KEYS.includes("병오-m") ? "병오-m" : (KEYS_M[0] ?? ICON_KEYS[0])
// 계정 일주 → 그릴 수 있는 캐릭터 키로 해석. 미등록 일주는 같은 오행·성별 대표 캐릭터로 대체(빈 아바타 방지).
function resolveCharKey(id?: string | null): string {
  if (id && ILJU_SVG_ICONS[id]) return id
  if (id) {
    const g = id.endsWith("-f") ? "-f" : "-m"
    const e = elemOf(id)
    const pool = ICON_KEYS.filter(k => k.endsWith(g) && elemOf(k) === e)
    if (pool.length) return pool[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % pool.length]
  }
  return FALLBACK_ME_KEY
}
type Person = { name: string; birth: { y: string; m: string; d: string }; gender: "M" | "F" }
function mockIlju(p: Person): string {
  const pool = (p.gender === "M" ? KEYS_M : KEYS_F)
  const base = pool.length ? pool : ICON_KEYS
  const seed = (parseInt(p.birth.y || "0") || 0) + (parseInt(p.birth.m || "0") || 0) * 31 +
    (parseInt(p.birth.d || "0") || 0) * 3 + [...p.name].reduce((a, c) => a + c.charCodeAt(0), 0)
  return base[seed % base.length]
}

// 결과 파생 — 나는 계정 일주(myKey), 그 사람만 입력(렌더·연출 동일 결과 보장)
function derive(myKey: string, them: Person, config: CrushConfig) {
  const meK = myKey, themK = mockIlju(them)
  const eMe = elemOf(meK), eThem = elemOf(themK)
  const rel = relType(eMe, eThem)
  const arch = eMe === eThem ? config.sameArch : (config.archetype[pairKey(eMe, eThem)] ?? config.sameArch)
  const seed = [...(myKey + them.name)].reduce((a, c) => a + c.charCodeAt(0), 0)
  const score = clamp(config.scoreOpt[rel] + (seed % 7) - 3, 35, 97)
  const stage = [...config.temp].reverse().find(t => score >= t.min) ?? config.temp[0]
  return { meK, themK, eMe, eThem, rel, arch, score, stage }
}

function Avatar({ iljuKey, size = 72 }: { iljuKey: string; size?: number }) {
  return (
    <div className="rounded-full overflow-hidden border-2 border-charcoal/15 shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: ELEM_BG[elemOf(iljuKey)] }}>
      {ILJU_SVG_ICONS[iljuKey]?.(getIljuProfileViewBox(iljuKey))}
    </div>
  )
}

// 오행 배지 (이름 옆 작은 칩)
function ElemBadge({ elem }: { elem: Elem }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[13px] font-bold"
      style={{ background: ELEM_BG[elem], color: ELEM_COLOR[elem] }}>
      <Ico as={ELEM_DOODLE[elem]} size={13} /> {elem}
    </span>
  )
}

function PersonForm({ label, hint, p, set }: {
  label: string; hint: string; p: Person; set: (p: Person) => void
}) {
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
      <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}>
        <Ico as={DoodlePencil} size={17} /> {label} {hint && <span className="text-[13px] text-text-muted font-normal">{hint}</span>}
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

// **굵게** 인라인 파싱 (줄글용)
function renderBold(s: string) {
  return s.split(/(\*\*[^*]+\*\*)/g).map((seg, i) =>
    seg.startsWith("**") && seg.endsWith("**")
      ? <strong key={i} className="text-charcoal font-bold">{seg.slice(2, -2)}</strong>
      : <span key={i}>{seg}</span>)
}
function Prose({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      {text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).map((para, i) => (
        <p key={i} className="text-[14px] text-charcoal/85 leading-relaxed">{renderBold(para)}</p>
      ))}
    </div>
  )
}

type Ai = { status: "idle" | "loading" | "done" | "error"; text: string }
type Step = "landing" | "input" | "loading" | "result"
const emptyP = (): Person => ({ name: "", birth: { y: "", m: "", d: "" }, gender: "M" })
const validP = (p: Person) => p.name.trim() !== "" && p.birth.y.length === 4 && !!p.birth.m && !!p.birth.d

export default function CrushFunnel({ config }: { config: CrushConfig }) {
  const { ilju } = useUser()
  const myKey = resolveCharKey(ilju?.id)
  const [step, setStep] = useState<Step>("landing")
  const [them, setThem] = useState<Person>(() => ({ ...emptyP(), gender: "F" }))
  const [unlocked, setUnlocked] = useState(false)
  const [ai, setAi] = useState<Ai>({ status: "idle", text: "" })

  // 연출 단계에서 미리 풀이를 돌린다 → 결과 진입 시 보통 이미 완성
  const start = () => {
    setStep("loading")
    const d = derive(myKey, them, config)
    setAi({ status: "loading", text: "" })
    fetch("/api/some", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        me: { name: "나", elem: d.eMe }, them: { name: them.name, elem: d.eThem },
        archetype: d.arch.name, vibe: d.arch.vibe, score: d.score, rel: d.rel, stage: d.stage.label,
      }),
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((x: { text?: string }) => x.text ? setAi({ status: "done", text: x.text }) : Promise.reject())
      .catch(() => setAi({ status: "error", text: "" }))
    setTimeout(() => setStep("result"), 1800)
  }
  const reset = () => {
    setThem({ ...emptyP(), gender: "F" }); setUnlocked(false); setAi({ status: "idle", text: "" }); setStep("input")
  }

  // ── 랜딩 (커플과 동일 레이아웃) ──
  if (step === "landing") {
    return (
      <div className="flex flex-col items-center gap-5 pt-6 text-center">
        <p className="text-[20px] text-charcoal flex items-center justify-center gap-1.5 flex-wrap" style={BINGGRAE}>
          {config.landing.line} <Ico as={config.landing.hi} size={20} />
        </p>
        <div className="flex items-center gap-3">
          <div className="p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
            <Avatar iljuKey={myKey} size={76} />
          </div>
          <Ico as={DoodleHeart} size={26} />
          <div className="rounded-full flex items-center justify-center" style={{ width: 82, height: 82, background: "#F1F5F9", border: "2px dashed #CBD5E1" }}>
            <span className="text-[26px] text-charcoal/25">?</span>
          </div>
        </div>
        <div className="w-full rounded-2xl bg-white border border-charcoal/10 px-4 py-4">
          <p className="text-[14px] text-charcoal flex items-center justify-center gap-1.5 leading-relaxed" style={GAEGU}>{config.landing.sub} <Ico as={DoodleSparkle} size={16} /></p>
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-text-muted">
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
    const valid = validP(them)
    return (
      <div className="flex flex-col gap-4 pt-2">
        <p className="text-[20px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleRedString} size={22} /> 그 사람 정보</p>
        {/* 내 사주 — 계정 카드 자동 포함 */}
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3 flex items-center gap-3">
          <Avatar iljuKey={myKey} size={44} />
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-bold text-charcoal">나 <span className="text-text-muted font-normal">· 내 사주</span></span>
            <ElemBadge elem={elemOf(myKey)} />
          </div>
          <span className="ml-auto text-[12px] text-text-muted">자동 포함</span>
        </div>
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
        <p className="text-[14px] text-text-muted flex items-center gap-1.5">{"나"} <Ico as={DoodleHeart} size={14} /> {them.name || "그 사람"}</p>
      </div>
    )
  }

  // ── 결과 계산 ──
  const { meK, themK, eMe, eThem, rel, arch, score, stage } = derive(myKey, them, config)
  const md = mockDist(meK), td = mockDist(themK)
  const open = config.openHeart[eThem]
  const lucky = config.lucky[eThem]
  const fallbackProse =
    `${"나"}랑 ${them.name || "그 사람"}은 **${arch.name}**. ${arch.vibe}.\n\n` +
    `${them.name || "그 사람"}은 ${config.persona[eThem].line}이에요. ${open.title} — ${open.line}\n\n` +
    `${config.strategy[rel][0]} 지금 가능성은 ${score}%, 흐름은 충분히 만들 수 있어요.`

  const people: { k: string; e: Elem; label: string }[] = [
    { k: meK, e: eMe, label: "나" },
    { k: themK, e: eThem, label: them.name || "그 사람" },
  ]

  // ── 유료 본문 ──
  const PaidBody = (
    <div className="flex flex-col gap-6">
      {/* 정밀 풀이 — 유료 히어로 (줄글) */}
      <div className="rounded-2xl px-4 py-4 flex flex-col gap-3 border-2 border-charcoal"
        style={{ background: "linear-gradient(160deg,#FFF6FA,#FFFDF5)", boxShadow: "0 4px 16px rgba(232,75,106,0.08)" }}>
        <div className="flex items-center gap-2">
          <Ico as={DoodleSparkles} size={20} />
          <span className="text-[15px] text-charcoal" style={BINGGRAE}>사주 정밀 풀이</span>
          <span className="ml-auto flex -space-x-2">
            <Avatar iljuKey={meK} size={26} /><Avatar iljuKey={themK} size={26} />
          </span>
        </div>
        {ai.status === "loading" && (
          <div className="flex flex-col gap-2 py-1">
            {[100, 96, 100, 72].map((w, i) => (
              <div key={i} className="h-3 rounded-full bg-charcoal/10 animate-pulse" style={{ width: `${w}%` }} />
            ))}
            <p className="text-[13px] text-text-muted mt-1">두 사람 사주를 깊게 읽는 중…</p>
          </div>
        )}
        {ai.status === "done" && <Prose text={ai.text} />}
        {(ai.status === "error" || ai.status === "idle") && <Prose text={fallbackProse} />}
      </div>

      {/* 두 사람 프로필 — 일주 캐릭터 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleHeart}>두 사람 프로필</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {people.map((x, i) => {
            const per = config.persona[x.e]
            return (
              <div key={i} className="rounded-2xl bg-white border border-charcoal/10 px-3 py-3.5 flex flex-col items-center gap-1.5 text-center">
                <Avatar iljuKey={x.k} size={60} />
                <span className="text-[14px] font-bold text-charcoal">{x.label}</span>
                <ElemBadge elem={x.e} />
                <span className="text-[14px] font-bold" style={{ color: PINK }}>{per.tag}</span>
                <span className="text-[13px] text-charcoal/60 leading-snug" style={GAEGU}>{per.line}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 상대 마음 여는 법 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleKey}>{them.name || "그 사람"} 마음 여는 법</SectionTitle>
        <div className="rounded-2xl px-4 py-3.5 flex items-center gap-3" style={{ background: ELEM_BG[eThem], border: `1.5px solid ${ELEM_COLOR[eThem]}` }}>
          <Avatar iljuKey={themK} size={48} />
          <div className="min-w-0">
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
            <span className="flex items-center gap-1 text-[14px] text-charcoal/70"><span className="w-2.5 h-2.5 rounded-full" style={{ background: PINK }} />{"나"}</span>
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

      {/* 썸 상황별 케미 — % 바 (커플 상황별 패턴) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleSparkles}>썸 상황별 케미</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
          {config.situational.map(s => {
            const v = clamp(score + s.delta, 35, 98)
            return (
              <div key={s.key} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-charcoal flex items-center gap-1.5"><Ico as={s.D} size={16} /> {s.key}</span>
                  <span className="text-[14px] font-bold" style={{ color: v >= 80 ? PINK : "#2D2D2D" }}>{v}%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                  <div className="h-full rounded-full" style={{ width: `${v}%`, background: v >= 80 ? PINK : v >= 65 ? "#FBBF24" : "#94A3B8" }} />
                </div>
                <p className="text-[13px] text-text-muted leading-snug" style={GAEGU}>{s.line}</p>
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
            <div key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0" style={{ background: PINK }}>{i + 1}</span>
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
            <p className="text-[13px] text-charcoal/50 leading-snug mt-1" style={GAEGU}>피할 때 · {config.timing.avoid}</p>
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
            <span className="text-[14px] font-bold text-charcoal">{"나"}</span>
            <ElemBadge elem={eMe} />
          </div>
          <div className="flex flex-col items-center">
            <Ico as={DoodleRedString} size={26} />
            <span className="text-[13px] text-text-muted -mt-0.5">{config.gaugeName}</span>
            <span className="text-[40px] leading-none" style={{ ...BINGGRAE, color: PINK }}>{score}%</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar iljuKey={themK} size={68} />
            <span className="text-[14px] font-bold text-charcoal">{them.name || "그 사람"}</span>
            <ElemBadge elem={eThem} />
          </div>
        </div>
        <div className="px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#FFF4E0", border: "1.5px dashed #F0C060" }}>
          <Ico as={arch.D} size={16} /> <p className="text-[15px] text-[#9A7050]" style={BINGGRAE}>{arch.name}</p>
        </div>
        <p className="text-[15px] text-charcoal/75 leading-relaxed" style={GAEGU}>{arch.vibe}</p>
      </div>

      {/* [무료] 온도계 — 양 끝에서 두 캐릭터가 끌어당기는 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleSparkle}>우리 사이 온도</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Avatar iljuKey={meK} size={30} />
            <div className="relative flex-1 h-3.5 rounded-full overflow-hidden" style={{ background: "linear-gradient(90deg,#BFDBFE,#FBBF24,#E84B6A)" }}>
              <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 shadow-sm" style={{ left: `${score}%`, borderColor: PINK }} />
            </div>
            <Avatar iljuKey={themK} size={30} />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="self-start px-2.5 py-1 rounded-full text-[13px] font-bold text-white" style={{ background: PINK }}>{stage.label}</span>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{stage.line}</p>
          </div>
        </div>
      </div>

      {/* [유료] 페이월 게이트 — 짧은 미리보기 + 잠금 카드 */}
      {unlocked ? PaidBody : (
        <div className="flex flex-col">
          <div className="relative overflow-hidden" style={{ maxHeight: 150 }}>
            <div className="blur-[5px] pointer-events-none select-none">{PaidBody}</div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,254,242,0.15), var(--bg-cream,#FFFEF2) 88%)" }} />
          </div>
          <div className="-mt-7 rounded-2xl bg-white border-2 border-charcoal px-5 py-5 flex flex-col items-center gap-2.5 text-center"
            style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
            <Ico as={DoodleKey} size={36} />
            <p className="text-[16px] text-charcoal" style={BINGGRAE}>정밀 풀이 잠금 해제</p>
            <div className="flex flex-col gap-1.5 w-full py-1">
              {["둘 사주를 깊이 읽은 정밀 풀이", `${them.name || "그 사람"} 마음 여는 법 · 다가가는 전략`, "진전·고백 타이밍과 밀당 가이드"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-charcoal/70">
                  <Ico as={DoodleHeart} size={13} /> {t}
                </div>
              ))}
            </div>
            <button onClick={() => setUnlocked(true)}
              className="w-full h-[52px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal mt-0.5"
              style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
              {config.price} 내고 전체 보기
            </button>
            <p className="text-[13px] text-text-muted">같은 상대는 다시 무료로 볼 수 있어요</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex flex-col gap-2 pt-1">
        <button className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-white text-charcoal active:opacity-70 flex items-center justify-center gap-1.5">
          <Ico as={DoodlePolaroid} size={18} /> 결과 카드 저장
        </button>
        <button onClick={reset}
          className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-white text-charcoal active:opacity-70 flex items-center justify-center gap-1.5">
          <Ico as={DoodleSparkle} size={18} /> 다른 사람도 분석하기
        </button>
      </div>
    </div>
  )
}
