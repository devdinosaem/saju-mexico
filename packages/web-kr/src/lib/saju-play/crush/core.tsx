"use client"
// ════════════════════════════════════════════════════════════════
// 썸/짝사랑 분석기 공용 코어 — 혼자서 둘 다 입력하는 유료 단품.
// 같은 셸(입력→연출→페이월→결과)을 config(some.ts / crush.ts)로 갈아끼운다.
// 친구·커플과 다른 전제: 아직 안 가까운 사이 → "진단"이 아니라 "예측+전략+타이밍".
// 무료: 성사 가능성 % + 온도계 / 유료: 정밀 풀이 + 마음·전략·타이밍 (페이월 목업)
// 폰트 정책(친구·커플 동일): 제목=BINGGRAE, 따뜻한 설명줄=GAEGU(손글씨), 줄글 본문=고딕.
// 연출(스켈레톤) 단계에서 풀이를 미리 돌려 결과 진입 시 바로 보이게.
// ════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { spend } from "@/lib/balance"
import { saveReport, findByDedupe, makeBirthKey } from "@/lib/report-archive"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { elemOf, relType, ELEMS, SHENG, KE, pairKey, mockDist, clamp, type Elem, type Rel } from "../engine"
import { ELEM_BG, ELEM_COLOR, ELEM_DOODLE } from "../flavor"
import { useUser } from "@/lib/UserContext"
import { buildRealCompat, to24h, type Birth, type Gender } from "./saju-adapter"
import type { CompatSignals } from "./compat-engine"
import {
  DoodleHeart, DoodleSparkle, DoodleSparkles, DoodleSpeechBubble, DoodlePencil, DoodlePolaroid,
  DoodleLightning, DoodleKey, DoodleHourglass, DoodleCalendar, DoodleTaegeuk,
  DoodleRedString, DoodleClover, DoodlePush, DoodleBook,
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
  journey: { name: string; tip: string }[]                       // 썸 진행 4단계
  dateCourse: Record<Elem, { label: string; D: DoodleC }[]>       // 상대 오행 → 공략 데이트
  mines: Record<Elem, string[]>                                   // 상대 오행 → 지뢰(하지 말 것) TOP3
  manual: Record<Elem, { care: string; charge: string; ban: string; as: string }> // 상대 오행 → 사용설명서
  memes: { min: number; label: string }[]                         // 점수 → 한 단어 밈
  pushPull: Record<Elem, { best: "push" | "pull"; pushLine: string; pullLine: string }> // 밀당 시뮬
  persona: Record<Elem, { tag: string; line: string }>        // 오행 → 연애 성향(프로필 카드)
  openHeart: Record<Elem, { title: string; line: string }>   // 상대(그 사람) 오행 → 마음 여는 법
  chemi: Record<Rel, { good: string; care: string }>          // 끌리는/어긋나는 포인트
  strategy: Record<Rel, string[]>                             // 다가가는 전략(처방전)
  timing: { when: string; line: string; avoid: string }       // 진전·고백 타이밍
  anti: Record<Elem, string>                                  // 상대 오행 → 하지 말 것
  extra: { title: string; D: DoodleC; a: { k: string; v: string }[] } // 모드 전용(썸=밀당 / 짝사랑=현실·위로)
  lucky: Record<Elem, { day: string; place: string; color: string; colorHex: string }>
  price: string
  priceMt: number                                   // 결제용 숫자 가격(명태)
  reportType: "some" | "onesided"                   // 보관함 저장 타입
  // ── 모드별 제목·라벨 (썸/짝사랑) ──
  apiPath: string                                   // 정밀 풀이 호출 경로
  chapters: string[]                                // 7개 챕터명
  tempTitle: string                                 // 무료 온도 섹션 제목
  journeyTitle: string                              // 진행 지도 제목
  situationalTitle: string                          // 상황별 제목
  leverTitle: string                                // 다가가기/밀당 시뮬 제목
  lever: { prompt: string; push: string; pull: string } // 시뮬 버튼·배너 라벨
  balance: Record<CompatSignals["role"], { pos: number; line: string }> // 끌림 무게중심
  /** 가능성 낮을 때 모드전용(짝사랑 위로). 있으면 점수 기준으로 extra와 교체 */
  extraLow?: { title: string; D: DoodleC; a: { k: string; v: string }[] }
  extraThreshold?: number                           // 위로 전환 점수(기본 60)
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
export type Person = { name: string; birth: { y: string; m: string; d: string }; gender: "M" | "F" }
function mockIlju(p: Person): string {
  const pool = (p.gender === "M" ? KEYS_M : KEYS_F)
  const base = pool.length ? pool : ICON_KEYS
  const seed = (parseInt(p.birth.y || "0") || 0) + (parseInt(p.birth.m || "0") || 0) * 31 +
    (parseInt(p.birth.d || "0") || 0) * 3 + [...p.name].reduce((a, c) => a + c.charCodeAt(0), 0)
  return base[seed % base.length]
}

// ── 엔진 신호 → 카피 (운명 배지·저울·용신 강도) ──────────────────
const FATE_CORE: Record<CompatSignals["core"], { label: string; line: string; gold?: boolean }> = {
  천간합: { label: "천생연분 신호", line: "서로를 끌어당겨 묶는 기운이 흘러요", gold: true },
  천간충: { label: "불꽃 신호", line: "부딪히며 끌리는, 강렬한 긴장의 기운" },
  상생: { label: "북돋는 인연", line: "서로를 키워주는 결이에요" },
  상극: { label: "끌리는 긴장", line: "다름에서 오는 강한 끌림" },
  비화: { label: "닮은 결", line: "비슷해서 편안한 사이" },
}
const FATE_SPOUSE: Record<CompatSignals["spouse"], { label: string; line: string }> = {
  육합: { label: "일지 육합", line: "곁에 있으면 자연스럽게 안정되는 끌림" },
  삼합: { label: "일지 삼합", line: "죽이 잘 맞고 통하는 결" },
  충: { label: "일지 충", line: "긴장이 오히려 끌림이 되는 밀당형" },
  무관계: { label: "잔잔한 자성", line: "강한 끌림보단 진심·꾸준함이 변수" },
}
const YONG_LV = ["아직은 약하지만 천천히", "조금씩", "꽤 많이", "아주 많이"]
const RADAR_TIP: Record<string, string> = {
  호감: "서로 끌리는 기본기가 탄탄해",
  긴장: "밀당의 짜릿함이 큰 사이",
  안정: "오래 볼수록 편해지는 결",
  설렘: "두근거림이 살아있는 케미",
  주도권: "네가 흐름을 쥐고 있어",
}

// 연애 세포 5각 레이더
function RadarChart({ data }: { data: { label: string; value: number }[] }) {
  const size = 200, c = size / 2, R = 64, n = data.length
  const pt = (i: number, r: number): [number, number] => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
    return [c + r * Math.cos(a), c + r * Math.sin(a)]
  }
  const ring = (f: number) => data.map((_, i) => pt(i, R * f).join(",")).join(" ")
  const poly = data.map((d, i) => pt(i, R * (Math.max(0, Math.min(100, d.value)) / 100)).join(",")).join(" ")
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto" style={{ width: "100%", maxWidth: 224 }}>
      {[0.25, 0.5, 0.75, 1].map((f, i) => <polygon key={i} points={ring(f)} fill="none" stroke="#E5E7EB" strokeWidth={1} />)}
      {data.map((_, i) => { const [x, y] = pt(i, R); return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#E5E7EB" strokeWidth={1} /> })}
      <polygon points={poly} fill="rgba(232,75,106,0.18)" stroke={PINK} strokeWidth={2} strokeLinejoin="round" />
      {data.map((d, i) => { const [x, y] = pt(i, R + 16); return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={12} fontWeight={700} fill="#2D2D2D">{d.label}</text> })}
    </svg>
  )
}

// 사주 없을 때(목업/비로그인) 오행으로 유사 신호 생성 — 화면이 항상 채워지게
function roleOf(eMe: Elem, eThem: Elem): CompatSignals["role"] {
  if (eMe === eThem) return "같음"
  if (SHENG[eThem] === eMe) return "생받음"   // 그 사람이 나를 생
  if (SHENG[eMe] === eThem) return "생해줌"
  if (KE[eThem] === eMe) return "극받음"       // 그 사람이 나를 극
  return "극해줌"
}
function fallbackSignals(eMe: Elem, eThem: Elem, seed: number): { signals: CompatSignals; myYongKr: Elem } {
  const role = roleOf(eMe, eThem)
  const rel = relType(eMe, eThem)
  const core: CompatSignals["core"] = rel === "same" ? "비화" : rel === "sheng" ? "상생" : "상극"
  const spouse: CompatSignals["spouse"] = rel === "sheng" ? "삼합" : rel === "ke" ? "충" : "무관계"
  const yongFulfill = ({ 생받음: 3, 같음: 2, 극받음: 2, 생해줌: 1, 극해줌: 1 } as const)[role]
  const myYongKr = (ELEMS.find(e => SHENG[e] === eMe) ?? eMe) // 나를 생하는 원소(유사 용신)
  return { signals: { spouse, yongFulfill, core, role, timingHot: seed % 3 === 0, dohwa: seed % 2 === 0 }, myYongKr }
}

// 결과 파생 — 나=계정 일주/생일, 그 사람만 입력. 둘 생일 다 있으면 진짜 사주(compat-engine),
// 아니면 오행 fallback. 렌더·연출 동일 결과 보장(결정적).
function derive(myKey: string, myBirth: Birth | null, myGender: Gender, them: Person, config: CrushConfig) {
  const meK = myKey
  const eMe = elemOf(meK)
  const crushReady = them.birth.y.length === 4 && !!them.birth.m && !!them.birth.d
  const real = (myBirth && crushReady)
    ? buildRealCompat(myBirth, myGender,
        { year: +them.birth.y, month: +them.birth.m, day: +them.birth.d, hour: 12, minute: 0 }, them.gender)
    : null
  const themK = real ? resolveCharKey(real.themKey) : mockIlju(them)
  const eThem = elemOf(themK)
  const rel = relType(eMe, eThem)
  const seed = [...(myKey + them.name)].reduce((a, c) => a + c.charCodeAt(0), 0)
  let score: number, compatBlock: string | null, signals: CompatSignals, myYongKr: Elem
  let myDist: Record<string, number>, themDist: Record<string, number>, goodDays: { 연락?: number; 만남?: number; 고백?: number }
  if (real) {
    score = real.score; compatBlock = real.compatBlock; signals = real.signals; myYongKr = real.myYongKr as Elem
    myDist = real.myDist; themDist = real.themDist; goodDays = real.goodDays
  } else {
    score = clamp(config.scoreOpt[rel] + (seed % 7) - 3, 35, 97)
    compatBlock = null
    const fb = fallbackSignals(eMe, eThem, seed); signals = fb.signals; myYongKr = fb.myYongKr
    myDist = mockDist(meK); themDist = mockDist(themK); goodDays = {}
  }
  const arch = eMe === eThem ? config.sameArch : (config.archetype[pairKey(eMe, eThem)] ?? config.sameArch)
  const stage = [...config.temp].reverse().find(t => score >= t.min) ?? config.temp[0]
  return { meK, themK, eMe, eThem, rel, arch, score, stage, compatBlock, signals, myYongKr, myDist, themDist, goodDays }
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

// 근거 칩 — 항목이 어떤 사주를 근거로 했는지 (핑크 단일톤). deep은 데이터용(미사용 표시).
function Basis({ t }: { t: string; deep?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] font-bold shrink-0"
      style={{ background: "#FFF0F5", color: PINK }}>
      <Ico as={DoodleTaegeuk} size={11} /> {t}
    </span>
  )
}
const SectionTitle = ({ icon, children, basis }: { icon: DoodleC; children: React.ReactNode; basis?: { t: string; deep?: boolean } }) => (
  <div className="flex items-center justify-between gap-2">
    <p className="text-[15px] text-charcoal flex items-center gap-1.5 min-w-0" style={BINGGRAE}><Ico as={icon} size={18} /> {children}</p>
    {basis && <Basis {...basis} />}
  </div>
)
// 챕터 구분선 — 결과 리포트 맥락 구획
function ChapterDivider({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5 pt-3">
      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0" style={{ background: PINK }}>{n}</span>
      <span className="text-[15px] text-charcoal shrink-0" style={BINGGRAE}>{title}</span>
      <div className="flex-1 h-px" style={{ background: "var(--line-medium)" }} />
    </div>
  )
}
// 하단 글로서리 — [용어, 깊은엔진여부, 쉬운설명]
const GLOSSARY: [string, boolean, string][] = [
  ["종합 풀이", true, "아래 근거를 다 합쳐 읽은 풀이예요"],
  ["일간 인력", true, "두 사람 본체(일간)가 끌어당기는 힘"],
  ["일지 합·충", true, "배우자 자리(일지)끼리의 끌림·긴장"],
  ["용신", true, "내게 부족해 채워야 할 기운"],
  ["도화", true, "매력이 잘 드러나는 기운(도화살)"],
  ["대운·세운", true, "지금의 연애운 흐름과 좋은 날"],
  ["원국 오행", true, "사주 8글자 기운의 균형"],
  ["오행 종합", true, "위 신호들을 점수로 종합한 거예요"],
  ["일간 오행", false, "상대의 기본 기질(목·화·토·금·수)"],
]

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

// 다가가기/밀당 시뮬레이터 — 선택 → 상대 오행 맞춤 예상 반응. 라벨은 모드별(lever)
function PullPushSim({ best, pushLine, pullLine, lever }: { best: "push" | "pull"; pushLine: string; pullLine: string; lever: { prompt: string; push: string; pull: string } }) {
  const [sel, setSel] = useState<"push" | "pull" | null>(null)
  const line = sel === "push" ? pushLine : sel === "pull" ? pullLine : null
  const good = sel === best
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
      <p className="text-[14px] font-bold text-charcoal text-center">{lever.prompt}</p>
      <div className="flex gap-2">
        {([["push", lever.push], ["pull", lever.pull]] as const).map(([k, label]) => (
          <button key={k} onClick={() => setSel(k)}
            className="flex-1 py-3 rounded-xl text-[14px] font-bold border-2 transition-colors"
            style={sel === k ? { background: PINK, color: "#FFF9F0", borderColor: PINK } : { background: "white", color: "#94A3B8", borderColor: "#E0D4C0" }}>
            {label}
          </button>
        ))}
      </div>
      {line && (
        <div className="rounded-xl px-3 py-2.5 flex items-start gap-2" style={{ background: good ? "#F0FFF4" : "#FFF7ED", border: `1.5px solid ${good ? "#86EFAC" : "#FDB877"}` }}>
          <Ico as={good ? DoodleHeart : DoodleLightning} size={16} />
          <p className="text-[14px] text-charcoal/80 leading-snug">{line}</p>
        </div>
      )}
    </div>
  )
}

// 이번 달 캘린더 — 길일 마킹
function MonthCalendar({ year, month, marks }: { year: number; month: number; marks: Record<number, string> }) {
  const dim = new Date(year, month + 1, 0).getDate()
  const fdow = new Date(year, month, 1).getDay()
  const cells: (number | null)[] = [...Array(fdow).fill(null), ...Array.from({ length: dim }, (_, i) => i + 1)]
  const W = ["일", "월", "화", "수", "목", "금", "토"]
  return (
    <div className="grid grid-cols-7 gap-1">
      {W.map((w, i) => <div key={"w" + i} className="text-[12px] text-center text-text-muted py-0.5">{w}</div>)}
      {cells.map((d, i) => (
        <div key={i} className="aspect-square flex items-center justify-center text-[13px]">
          {d && (marks[d]
            ? <span className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white" style={{ background: marks[d] }}>{d}</span>
            : <span className="text-charcoal/70">{d}</span>)}
        </div>
      ))}
    </div>
  )
}

type Ai = { status: "idle" | "loading" | "done" | "error"; text: string }
type Step = "landing" | "input" | "loading" | "result"
const emptyP = (): Person => ({ name: "", birth: { y: "", m: "", d: "" }, gender: "M" })
const validP = (p: Person) => p.name.trim() !== "" && p.birth.y.length === 4 && !!p.birth.m && !!p.birth.d

export type CrushReplay = { them: Person; aiText: string; me?: { myKey: string; myBirth: Birth | null; myGender: Gender } }

export default function CrushFunnel({ config, replay }: { config: CrushConfig; replay?: CrushReplay }) {
  const { user, ilju } = useUser()
  const router = useRouter()
  const bd = user.birthDate
  // 재열람: 저장된 me 사용(생일 변경 시 드리프트 방지). 일반: 계정에서.
  const myKey = replay?.me ? replay.me.myKey : resolveCharKey(ilju?.id)
  const myBirth: Birth | null = replay?.me ? replay.me.myBirth
    : bd ? { year: +bd.year, month: +bd.month, day: +bd.day, hour: to24h(bd.hour, bd.ampm), minute: parseInt(bd.minute) || 0 }
    : null
  const myGender: Gender = replay?.me ? replay.me.myGender : (bd?.gender === "F" ? "F" : "M")
  // 재열람(replay): 저장된 입력+AI로 결과를 바로 표시 (랜딩·입력·AI호출 스킵)
  const [step, setStep] = useState<Step>(replay ? "result" : "landing")
  const [them, setThem] = useState<Person>(() => (replay ? replay.them : { ...emptyP(), gender: "F" }))
  const [unlocked, setUnlocked] = useState(!!replay)
  const [ai, setAi] = useState<Ai>(replay ? { status: "done", text: replay.aiText } : { status: "idle", text: "" })

  // 보관함 저장 — 클릭 즉시 말고 AI 확정(done/error) 후 1회 (느린 AI 폴백 박제 방지)
  const savedRef = useRef(false)
  const [wantSave, setWantSave] = useState(false)
  const saveFnRef = useRef<() => void>(() => {})
  useEffect(() => {
    if (!wantSave || savedRef.current) return
    if (ai.status !== "done" && ai.status !== "error") return
    savedRef.current = true
    saveFnRef.current()
  }, [wantSave, ai.status])

  // 연출 단계에서 미리 풀이를 돌린다 → 결과 진입 시 보통 이미 완성
  const start = () => {
    setStep("loading")
    const d = derive(myKey, myBirth, myGender, them, config)
    setAi({ status: "loading", text: "" })
    fetch(config.apiPath, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        me: { name: "나", elem: d.eMe }, them: { name: them.name, elem: d.eThem },
        archetype: d.arch.name, vibe: d.arch.vibe, score: d.score, rel: d.rel, stage: d.stage.label,
        compatBlock: d.compatBlock ?? undefined,
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
          <p className="text-[14px] text-charcoal flex items-center justify-center gap-1.5 leading-relaxed">{config.landing.sub} <Ico as={DoodleSparkle} size={16} /></p>
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
  const { meK, themK, eMe, eThem, rel, arch, score, stage, signals, myYongKr, myDist, themDist, goodDays } = derive(myKey, myBirth, myGender, them, config)
  const realTiming = goodDays.고백 !== undefined || goodDays.만남 !== undefined
  const timingWhen = realTiming ? `${new Date().getMonth() + 1}월, 사주가 가리키는 길일이 있어요` : config.timing.when
  const timingLine = realTiming
    ? `${[goodDays.고백 && `${goodDays.고백}일 고백`, goodDays.만남 && `${goodDays.만남}일 만남`].filter(Boolean).join(", ")} 타이밍이 좋아요.`
    : config.timing.line
  const coreCopy = FATE_CORE[signals.core]
  const spouseCopy = FATE_SPOUSE[signals.spouse]
  const bal = config.balance[signals.role]
  const isLow = !!config.extraLow && score < (config.extraThreshold ?? 60)
  const extraSec = isLow ? config.extraLow! : config.extra
  const leverPick = config.pushPull[eThem].best === "push" ? config.lever.push : config.lever.pull
  const dohwaVal = signals.dohwa ? clamp(72 + (score % 14), 60, 95) : clamp(34 + (score % 16), 25, 55)
  const jIdx = score >= 80 ? 3 : score >= 66 ? 2 : score >= 52 ? 1 : 0
  const radar = [
    { label: "호감", value: clamp(score, 30, 95) },
    { label: "긴장", value: clamp(rel === "ke" ? 80 : rel === "sheng" ? 45 : 62, 30, 95) },
    { label: "안정", value: clamp(signals.spouse === "육합" ? 85 : signals.spouse === "삼합" ? 75 : signals.spouse === "충" ? 42 : 55, 30, 95) },
    { label: "설렘", value: clamp((signals.dohwa ? 78 : 52) + (signals.core === "천간충" || signals.spouse === "충" ? 12 : 0), 30, 95) },
    { label: "주도권", value: clamp(110 - bal.pos, 30, 95) },
  ]
  const topCell = radar.reduce((a, b) => (b.value > a.value ? b : a))
  const cal = (() => {
    const now = new Date(), y = now.getFullYear(), mo = now.getMonth()
    const dim = new Date(y, mo + 1, 0).getDate()
    const s = themK.charCodeAt(0) + score
    const cl = (d: number) => Math.min(dim, Math.max(1, d))
    const d1 = goodDays.연락 ?? cl((s % 7) + 4)
    const d2 = goodDays.만남 ?? cl((s % 6) + 13)
    const d3 = goodDays.고백 ?? cl((s % 5) + 22)
    const marks: Record<number, string> = { [d1]: "#60A5FA", [d2]: "#FBBF24", [d3]: PINK }
    const legend = [
      { d: d1, label: "연락 좋은 날", color: "#60A5FA" },
      { d: d2, label: "만남 좋은 날", color: "#FBBF24" },
      { d: d3, label: "고백 좋은 날", color: PINK },
    ]
    return { y, mo, marks, legend }
  })()
  const md = myDist, td = themDist
  const minElem = ELEMS.reduce((a, b) => (md[b] + td[b] < md[a] + td[a] ? b : a), ELEMS[0])
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

  // ── 결제·보관함 ──
  const meBirthKey = myBirth ? makeBirthKey(myBirth) : "me"
  const themBirthKey = makeBirthKey({ year: +them.birth.y, month: +them.birth.m, day: +them.birth.d })
  const crushDedupe = `${config.reportType}|${[meBirthKey, themBirthKey].sort().join(",")}`
  const existing = findByDedupe(crushDedupe)
  // 저장 클로저(매 렌더 최신 ai·them 반영) — 실제 호출은 위 effect가 AI 확정 후 1회.
  saveFnRef.current = () => saveReport({
    type: config.reportType,
    subjects: [
      { who: "me", name: "나", birthKey: meBirthKey, iljuKey: meK },
      { who: "other", name: them.name || "그 사람", birthKey: themBirthKey, iljuKey: themK },
    ],
    title: `나 × ${them.name || "그 사람"} · ${config.reportType === "some" ? "썸" : "짝사랑"}`,
    highlight: `${score}%`,
    snapshot: { v: 1, data: { me: { myKey, myBirth, myGender }, them: { name: them.name, gender: them.gender, birth: them.birth } }, aiText: ai.status === "done" ? ai.text : fallbackProse },
  })
  const onUnlock = () => {
    // 이미 산 상대면 무차감(재열람 무료), 아니면 명태 차감
    if (!existing && !spend(config.priceMt, config.reportType === "some" ? "썸 궁합" : "짝사랑 궁합")) {
      router.push("/v3/charge"); return // 잔액 부족 → 충전
    }
    setUnlocked(true)
    setWantSave(true) // 저장은 effect가 AI 확정 후 처리
  }

  // ── 유료 본문 ──
  const PaidBody = (
    <div className="flex flex-col gap-6">
      {/* 정밀 풀이 — 유료 히어로 (줄글) */}
      <div className="rounded-2xl px-4 py-4 flex flex-col gap-3 border-2 border-charcoal"
        style={{ background: "linear-gradient(160deg,#FFF6FA,#FFFDF5)" }}>
        <div className="flex items-center gap-2">
          <Ico as={DoodleSparkles} size={20} />
          <span className="text-[15px] text-charcoal" style={BINGGRAE}>사주 정밀 풀이</span>
          <Basis t="종합 풀이" deep />
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

      <ChapterDivider n={1} title={config.chapters[0]} />

      {/* 사주 오행 밸런스 (좌 나 / 우 그 사람) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleTaegeuk} basis={{ t: "원국 오행", deep: true }}>사주 오행 밸런스</SectionTitle>
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

      {/* 부족 오행 채우는 활동 (친구 사주 동일) */}
      <div className="rounded-2xl px-4 py-4 flex flex-col gap-3" style={{ background: ELEM_BG[minElem], border: `1.5px solid ${ELEM_COLOR[minElem]}` }}>
        <div className="flex items-center gap-2">
          <Ico as={ELEM_DOODLE[minElem]} size={22} />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-charcoal leading-tight">둘에겐 {minElem}({minElem}) 기운이 없어요</p>
            <p className="text-[14px] text-charcoal/60">{minElem}({minElem}) 기운을 채우는 활동을 같이 해봐요</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {config.dateCourse[minElem].map((a, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.7)" }}>
              <Ico as={a.D} size={18} />
              <span className="text-[14px] font-bold text-charcoal">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 결핍 채워주는 사람 — 용신 충족 (엔진 신호) */}
      <div className="rounded-2xl px-4 py-3.5 flex items-center gap-3" style={{ background: ELEM_BG[myYongKr], border: `1.5px solid ${ELEM_COLOR[myYongKr]}` }}>
        <Ico as={ELEM_DOODLE[myYongKr]} size={26} />
        <div className="min-w-0">
          <p className="text-[14px] font-bold text-charcoal flex items-center gap-1.5 flex-wrap">네 부족한 {myYongKr} 기운을 채워주는 사람 <Basis t="용신" deep /></p>
          <p className="text-[14px] text-charcoal/70 leading-snug">{them.name || "그 사람"}은 네게 부족한 {myYongKr}을 {YONG_LV[signals.yongFulfill]} 채워줘. 옆에 있으면 숨통 트이는 결이야.</p>
        </div>
      </div>

      <ChapterDivider n={2} title={config.chapters[1]} />

      {/* 운명 신호 — 천간합/일지 합충 (엔진 신호) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleRedString} basis={{ t: "일간·일지 합충", deep: true }}>운명 신호</SectionTitle>
        <div className="flex flex-col gap-2">
          <div className="rounded-2xl px-4 py-3 flex items-center gap-3"
            style={coreCopy.gold ? { background: "linear-gradient(135deg,#FFF7E0,#FFFDF5)", border: "1.5px solid #F0C060" } : { background: "#FFF0F5", border: "1.5px solid #F9A8C4" }}>
            <Ico as={coreCopy.gold ? DoodleSparkles : DoodleHeart} size={22} />
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-charcoal flex items-center gap-1.5">
                {coreCopy.label}
                {coreCopy.gold && <span className="text-[11px] px-1.5 py-0.5 rounded-full text-white" style={{ background: "#F0A020" }}>RARE</span>}
              </p>
              <p className="text-[14px] text-charcoal/70 leading-snug">{coreCopy.line}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3 flex items-center gap-3">
            <Ico as={DoodleTaegeuk} size={20} />
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-charcoal">{spouseCopy.label}</p>
              <p className="text-[14px] text-charcoal/70 leading-snug">{spouseCopy.line}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 끌림의 무게중심 — 역할 (엔진 신호) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleHeart} basis={{ t: "일간 역할", deep: true }}>끌림의 무게중심</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-center gap-0.5"><Avatar iljuKey={meK} size={30} /><span className="text-[12px] text-text-muted">나</span></div>
            <div className="relative flex-1 h-3.5 rounded-full" style={{ background: "linear-gradient(90deg,#F9A8C4,#E5E7EB,#93C5FD)" }}>
              <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 shadow-sm" style={{ left: `${bal.pos}%`, borderColor: "#2D2D2D" }} />
            </div>
            <div className="flex flex-col items-center gap-0.5"><Avatar iljuKey={themK} size={30} /><span className="text-[12px] text-text-muted">{them.name || "그 사람"}</span></div>
          </div>
          <p className="text-[14px] text-charcoal/70 leading-snug text-center">{bal.line}</p>
        </div>
      </div>

      <ChapterDivider n={3} title={config.chapters[2]} />

      {/* 썸 상황별 케미 — % 바 (커플 상황별 패턴) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleSparkles} basis={{ t: "오행 종합", deep: true }}>{config.situationalTitle}</SectionTitle>
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
                <p className="text-[13px] text-text-muted leading-snug">{s.line}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* 연애 세포 레이더차트 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleSparkle} basis={{ t: "오행 종합", deep: true }}>연애 세포 활성도</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-1">
          <RadarChart data={radar} />
          <p className="text-[14px] text-charcoal/70 leading-snug text-center">
            가장 도드라지는 건 <span className="font-bold" style={{ color: PINK }}>{topCell.label}</span> ({topCell.value}) — {RADAR_TIP[topCell.label]}
          </p>
        </div>
      </div>

      <ChapterDivider n={4} title={config.chapters[3]} />

      {/* 두 사람 프로필 — 일주 캐릭터 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleHeart} basis={{ t: "일간 오행" }}>두 사람 프로필</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {people.map((x, i) => {
            const per = config.persona[x.e]
            return (
              <div key={i} className="rounded-2xl bg-white border border-charcoal/10 px-3 py-3.5 flex flex-col items-center gap-1.5 text-center">
                <Avatar iljuKey={x.k} size={60} />
                <span className="text-[14px] font-bold text-charcoal">{x.label}</span>
                <ElemBadge elem={x.e} />
                <span className="text-[14px] font-bold" style={{ color: PINK }}>{per.tag}</span>
                <span className="text-[13px] text-charcoal/60 leading-snug">{per.line}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 상대 마음 여는 법 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleKey} basis={{ t: "일간 오행" }}>{them.name || "그 사람"} 마음 여는 법</SectionTitle>
        <div className="rounded-2xl px-4 py-3.5 flex items-center gap-3" style={{ background: ELEM_BG[eThem], border: `1.5px solid ${ELEM_COLOR[eThem]}` }}>
          <Avatar iljuKey={themK} size={48} />
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-charcoal">{open.title}</p>
            <p className="text-[14px] text-charcoal/70 leading-snug">{open.line}</p>
          </div>
        </div>
      </div>

      {/* 그 사람 사용설명서 — 오행 매뉴얼 패러디 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleBook} basis={{ t: "일간 오행" }}>{them.name || "그 사람"} 사용설명서</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
          <div className="px-4 py-2.5 flex items-center gap-2 border-b border-charcoal/10" style={{ background: "#F8FAFC" }}>
            <Avatar iljuKey={themK} size={28} />
            <span className="text-[13px] text-text-muted">제품명 · {config.persona[eThem].tag}형</span>
          </div>
          {([["취급주의", "care"], ["충전법", "charge"], ["금지사항", "ban"], ["A/S", "as"]] as const).map(([k, key]) => (
            <div key={k} className="px-4 py-2.5 flex gap-3 border-b border-charcoal/5 last:border-0">
              <span className="text-[13px] font-bold shrink-0 w-16" style={{ color: PINK }}>{k}</span>
              <span className="text-[14px] text-charcoal/75 leading-snug">{config.manual[eThem][key]}</span>
            </div>
          ))}
        </div>
      </div>

      <ChapterDivider n={5} title={config.chapters[4]} />

      {/* 썸 진행 지도 — 4단계 + 다음 액션 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleRedString} basis={{ t: "오행 종합", deep: true }}>{config.journeyTitle}</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
          <div className="flex items-center">
            {config.journey.map((j, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold border-2"
                    style={i === jIdx ? { background: PINK, color: "#FFF9F0", borderColor: PINK }
                      : i < jIdx ? { background: "#FBD5E0", color: PINK, borderColor: "#FBD5E0" }
                      : { background: "white", color: "#CBD5E1", borderColor: "#E5E7EB" }}>
                    {i + 1}
                  </span>
                  <span className="text-[12px] font-bold" style={{ color: i === jIdx ? PINK : "#94A3B8" }}>{j.name}</span>
                </div>
                {i < config.journey.length - 1 && <div className="flex-1 h-0.5 mx-1 -mt-4" style={{ background: i < jIdx ? "#FBD5E0" : "#E5E7EB" }} />}
              </div>
            ))}
          </div>
          <div className="rounded-xl px-3 py-2.5" style={{ background: "#FFF0F5" }}>
            <p className="text-[14px] text-charcoal/80 leading-snug">
              <span className="font-bold" style={{ color: PINK }}>다음 칸으로 →</span> {config.journey[jIdx].tip}
            </p>
          </div>
        </div>
      </div>

      {/* 끌리는 / 어긋나는 포인트 */}
      <div className="grid grid-cols-1 gap-2">
        <div className="rounded-2xl px-4 py-3 flex items-start gap-2.5" style={{ background: "#F0FFF4", border: "1.5px solid #86EFAC" }}>
          <Ico as={DoodleHeart} size={18} />
          <div><p className="text-[14px] font-bold text-charcoal">끌리는 포인트</p>
            <p className="text-[14px] text-charcoal/70 leading-snug">{config.chemi[rel].good}</p></div>
        </div>
        <div className="rounded-2xl px-4 py-3 flex items-start gap-2.5" style={{ background: "#FFF7ED", border: "1.5px solid #FDB877" }}>
          <Ico as={DoodleLightning} size={18} />
          <div><p className="text-[14px] font-bold text-charcoal">어긋나기 쉬운 포인트</p>
            <p className="text-[14px] text-charcoal/70 leading-snug">{config.chemi[rel].care}</p></div>
        </div>
      </div>

      {/* 다가가는 전략 (처방전) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleSpeechBubble} basis={{ t: "일간 오행" }}>다가가는 전략</SectionTitle>
        <div className="rounded-2xl px-4 py-3.5 flex flex-col gap-2.5" style={{ background: "#FFF0F5", border: "1.5px solid #F9A8C4" }}>
          {config.strategy[rel].map((s, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0" style={{ background: PINK }}>{i + 1}</span>
              <p className="text-[14px] text-charcoal/80 leading-snug">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 첫 데이트 공략 코스 — 상대 오행이 끌리는 곳 */}
      <div className="rounded-2xl px-4 py-4 flex flex-col gap-3" style={{ background: ELEM_BG[eThem], border: `1.5px solid ${ELEM_COLOR[eThem]}` }}>
        <div className="flex items-center gap-2">
          <Ico as={ELEM_DOODLE[eThem]} size={22} />
          <p className="text-[14px] font-bold text-charcoal leading-tight flex items-center gap-1.5 flex-wrap">{them.name || "그 사람"} 공략 데이트 — {eThem} 기운이 끌리는 곳 <Basis t="일간 오행" /></p>
        </div>
        <div className="flex flex-col gap-2">
          {config.dateCourse[eThem].map((a, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.7)" }}>
              <Ico as={a.D} size={18} />
              <span className="text-[14px] font-bold text-charcoal">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      <ChapterDivider n={6} title={config.chapters[5]} />

      {/* 밀당 가이드 (썸=밀당 / 짝사랑=현실·위로) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={extraSec.D} basis={{ t: "일간 오행" }}>{extraSec.title}</SectionTitle>
        {!isLow && (
          <div className="rounded-xl px-3 py-2.5 flex items-center gap-2" style={{ background: "#FFF0F5", border: "1.5px solid #F9A8C4" }}>
            <Ico as={DoodleLightning} size={16} />
            <p className="text-[14px] text-charcoal/80 leading-snug">이 사람한텐 <span className="font-bold" style={{ color: PINK }}>{leverPick}</span>가 더 통해요</p>
          </div>
        )}
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-1">
          {extraSec.a.map((row, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-charcoal/5 last:border-0">
              <span className="text-[14px] font-bold text-charcoal shrink-0 w-[72px] whitespace-nowrap">{row.k}</span>
              <span className="text-[14px] text-charcoal/70 leading-snug">{row.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 밀당 시뮬레이터 — 인터랙션 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleLightning} basis={{ t: "일간 오행" }}>{config.leverTitle}</SectionTitle>
        <PullPushSim {...config.pushPull[eThem]} lever={config.lever} />
      </div>

      {/* 이건 조심해요 — 이 조합에서 역효과 나는 행동 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodlePush} basis={{ t: "일간 오행" }}>이건 조심해요</SectionTitle>
        <div className="rounded-2xl px-4 py-3.5 flex flex-col gap-2.5" style={{ background: "#FEF2F2", border: "1.5px solid #FCA5A5" }}>
          {config.mines[eThem].map((m, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0" style={{ background: "#EF4444" }}>{i + 1}</span>
              <p className="text-[14px] text-charcoal/80 leading-snug">{m}</p>
            </div>
          ))}
        </div>
      </div>

      <ChapterDivider n={7} title={config.chapters[6]} />

      {/* 매력 발산 지수 — 도화 (엔진 신호) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleSparkles} basis={{ t: "도화", deep: true }}>매력 발산 지수</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-charcoal">{signals.dohwa ? "지금 매력이 빛나는 시기" : "은은한 매력 구간"}</span>
            <span className="text-[15px] font-bold" style={{ color: signals.dohwa ? PINK : "#94A3B8" }}>{dohwaVal}</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
            <div className="h-full rounded-full" style={{ width: `${dohwaVal}%`, background: signals.dohwa ? "linear-gradient(90deg,#FBBF24,#E84B6A)" : "#CBD5E1" }} />
          </div>
          <p className="text-[14px] text-charcoal/70 leading-snug">{signals.dohwa ? "지금이 들이대기 좋은 때. 자신감 있게 다가가도 통해." : "확 끌기보단 꾸준함으로 스며들 때야."}</p>
        </div>
      </div>

      {/* 연애운 신호등 — 타이밍 (엔진 신호) */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleCalendar} basis={{ t: "대운·세운", deep: true }}>연애운 신호등</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5 flex items-center gap-3.5">
          <div className="flex flex-col gap-1.5 shrink-0 rounded-full px-1.5 py-2" style={{ background: "#2D2D2D" }}>
            {["#EF4444", "#FBBF24", "#22C55E"].map((c, i) => {
              const lit = signals.timingHot ? i === 2 : i === 1
              return <span key={i} className="w-3 h-3 rounded-full" style={{ background: lit ? c : "#4B5563", boxShadow: lit ? `0 0 6px ${c}` : "none" }} />
            })}
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-charcoal">{signals.timingHot ? "인연이 움직이는 시기" : "잔잔한 흐름"}</p>
            <p className="text-[14px] text-charcoal/70 leading-snug">{signals.timingHot ? "네 연애운이 들어오는 때 — 적극적으로 움직여도 좋아." : "큰 바람은 약해 — 지금은 네가 먼저 만드는 게 핵심이야."}</p>
          </div>
        </div>
      </div>

      {/* 진전·고백 타이밍 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleHourglass} basis={{ t: "대운·세운", deep: true }}>진전·고백 타이밍</SectionTitle>
        <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={{ background: "#EFF6FF", border: "1.5px solid #93C5FD" }}>
          <Ico as={DoodleCalendar} size={20} />
          <div>
            <p className="text-[14px] font-bold text-charcoal">{timingWhen}</p>
            <p className="text-[14px] text-charcoal/70 leading-snug">{timingLine}</p>
            <p className="text-[13px] text-charcoal/50 leading-snug mt-1">피할 때 · {config.timing.avoid}</p>
          </div>
        </div>
      </div>

      {/* 이번 달 썸 캘린더 — 길일 마킹 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleCalendar} basis={{ t: "대운·세운", deep: true }}>이번 달 썸 캘린더</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
          <p className="text-[14px] font-bold text-charcoal text-center">{cal.mo + 1}월</p>
          <MonthCalendar year={cal.y} month={cal.mo} marks={cal.marks} />
          <div className="flex flex-col gap-1.5 pt-1">
            {cal.legend.map((l, i) => (
              <div key={i} className="flex items-center gap-2 text-[14px]">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: l.color }} />
                <span className="text-charcoal/75">{cal.mo + 1}월 {l.d}일 · {l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 고백 럭키 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleClover} basis={{ t: "일간 오행" }}>고백 럭키</SectionTitle>
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

      {/* 사주 근거 한눈에 — 글로서리 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleBook}>사주 근거 한눈에</SectionTitle>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-1">
          {GLOSSARY.map(([term, deep, desc]) => (
            <div key={term} className="flex items-center gap-2.5 py-2 border-b border-charcoal/5 last:border-0">
              <span className="w-[88px] shrink-0"><Basis t={term} deep={deep} /></span>
              <span className="text-[14px] text-charcoal/70 leading-snug">{desc}</span>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-text-muted leading-snug">칩은 각 항목이 어떤 사주를 근거로 했는지 알려줘요.</p>
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
        <p className="text-[15px] text-charcoal/75 leading-relaxed">{arch.vibe}</p>
      </div>

      {/* [무료] 온도계 — 양 끝에서 두 캐릭터가 끌어당기는 */}
      <div className="flex flex-col gap-2.5">
        <SectionTitle icon={DoodleSparkle} basis={{ t: "오행 종합", deep: true }}>{config.tempTitle}</SectionTitle>
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
            <p className="text-[14px] text-charcoal/70 leading-snug">{stage.line}</p>
          </div>
        </div>
      </div>

      {/* [유료] 페이월 게이트 — 짧은 미리보기 + 잠금 카드 */}
      {(unlocked || existing) ? PaidBody : (
        <div className="flex flex-col">
          <div className="relative overflow-hidden" style={{ maxHeight: 150 }}>
            <div className="blur-[5px] pointer-events-none select-none">{PaidBody}</div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,254,242,0.15), var(--bg-cream,#FFFEF2) 88%)" }} />
          </div>
          <div className="-mt-7 rounded-2xl bg-white border-2 border-charcoal px-5 py-5 flex flex-col items-center gap-2.5 text-center">
            <Ico as={DoodleKey} size={36} />
            <p className="text-[16px] text-charcoal" style={BINGGRAE}>정밀 풀이 잠금 해제</p>
            <div className="flex flex-col gap-1.5 w-full py-1">
              {["둘 사주를 깊이 읽은 정밀 풀이", `${them.name || "그 사람"} 마음 여는 법 · 다가가는 전략`, "진전·고백 타이밍과 밀당 가이드"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-charcoal/70">
                  <Ico as={DoodleHeart} size={13} /> {t}
                </div>
              ))}
            </div>
            <button onClick={onUnlock}
              className="w-full h-[52px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal mt-0.5"
              style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
              {existing ? "다시 보기 (무료)" : `${config.price} 내고 전체 보기`}
            </button>
            <p className="text-[13px] text-text-muted">같은 상대는 다시 무료로 볼 수 있어요</p>
          </div>
        </div>
      )}

      {/* CTA — 재열람(replay)에선 숨김(저장본에서 입력모드로 새지 않게) */}
      {!replay && (
        <div className="flex flex-col gap-2 pt-1">
          <button className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-white text-charcoal active:opacity-70 flex items-center justify-center gap-1.5">
            <Ico as={DoodlePolaroid} size={18} /> 결과 카드 저장
          </button>
          <button onClick={reset}
            className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-white text-charcoal active:opacity-70 flex items-center justify-center gap-1.5">
            <Ico as={DoodleSparkle} size={18} /> 다른 사람도 분석하기
          </button>
        </div>
      )}
    </div>
  )
}
