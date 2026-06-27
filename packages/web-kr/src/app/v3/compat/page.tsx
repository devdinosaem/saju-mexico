"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { DoodleHeart, DoodleSparkle, DoodleCrown } from "@/components/doodles"

/* ────────────────────────────────────────────────────────────
   그룹 궁합 펀널 — 목업 UI (INVITE-COMPAT-PLAN.md)
   랜딩 → 카카오 1초 입장(mock) → 사주 입력 → 대기 → 결과(고도화)
   ※ 백엔드/실제 궁합 계산 미연동. 모든 풀이는 오행 기반 mock 로직.
──────────────────────────────────────────────────────────── */

const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }

const ELEMS = ["목", "화", "토", "금", "수"] as const
type Elem = (typeof ELEMS)[number]

const ELEM_BG: Record<string, string> = { 목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE" }
const ELEM_COLOR: Record<string, string> = { 목: "#4ADE80", 화: "#F87171", 토: "#FBBF24", 금: "#94A3B8", 수: "#60A5FA" }
const ELEM_LABEL: Record<string, string> = { 목: "목 기운 🌱", 화: "화 기운 🔥", 토: "토 기운 🌍", 금: "금 기운 💎", 수: "수 기운 🌊" }
const STEM_TO_ELEM: Record<string, Elem> = { 갑: "목", 을: "목", 병: "화", 정: "화", 무: "토", 기: "토", 경: "금", 신: "금", 임: "수", 계: "수" }
const elemOf = (key: string): Elem => STEM_TO_ELEM[key[0]] ?? "토"

const ROLE: Record<Elem, { label: string; emoji: string }> = {
  목: { label: "기획자", emoji: "🌱" },
  화: { label: "분위기메이커", emoji: "🔥" },
  토: { label: "든든한 중재자", emoji: "🏔️" },
  금: { label: "팩폭 담당", emoji: "💎" },
  수: { label: "감성 케어", emoji: "🌊" },
}
const ARCHETYPE: Record<Elem, string> = {
  목: "아이디어 뱅크 모임 🌱", 화: "추진력 만렙 불도저 모임 🔥", 토: "든든한 베이스캠프 모임 🏕️",
  금: "칼같은 팩폭 모임 💎", 수: "물 흐르듯 평화로운 모임 🌊",
}
const STEMS_OF: Record<Elem, string> = { 목: "갑·을", 화: "병·정", 토: "무·기", 금: "경·신", 수: "임·계" }
const SHENG: Record<Elem, Elem> = { 목: "화", 화: "토", 토: "금", 금: "수", 수: "목" } // 상생
const KE: Record<Elem, Elem> = { 목: "토", 토: "수", 수: "화", 화: "금", 금: "목" }     // 상극

type Participant = { name: string; iljuKey: string; me?: boolean }

const CAPACITY = 4
const HOST: Participant = { name: "지수", iljuKey: "갑자-f" }
const DEMO_FILL: Participant[] = [
  { name: "민준", iljuKey: "병인-m" },
  { name: "하은", iljuKey: "계묘-f" },
]
const MY_MOCK_ILJU = "무인-m"

// ── mock 풀이 로직 (오행 기반) ──
function distOf(ps: Participant[]): Record<Elem, number> {
  const d: Record<Elem, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 }
  ps.forEach(p => { d[elemOf(p.iljuKey)]++ })
  return d
}
function dominantElem(d: Record<Elem, number>): Elem {
  return ELEMS.reduce((a, b) => (d[b] > d[a] ? b : a), "목")
}
function archetype(ps: Participant[], d: Record<Elem, number>): string {
  const present = ELEMS.filter(e => d[e] > 0).length
  if (present >= 4) return "오행 풀세트 밸런스 모임 ✨"
  return ARCHETYPE[dominantElem(d)]
}
function balanceLine(d: Record<Elem, number>): string {
  const over = dominantElem(d)
  const miss = ELEMS.filter(e => d[e] === 0)
  if (miss.length === 0) return "오행이 골고루 섞여 균형 잡힌 모임이에요. 서로 빈 곳을 채워줘요 💞"
  return `${over}(${over}) 기운이 강하고 ${miss.map(m => `${m}(${m})`).join("·")} 기운이 비어요 → 추진력은 좋은데 ${miss.includes("수") ? "차분함" : miss.includes("금") ? "결단력" : "균형"}이 아쉬워요`
}
function pairScore(a: Participant, b: Participant): number {
  const ea = elemOf(a.iljuKey), eb = elemOf(b.iljuKey)
  if (ea === eb) return 72
  if (SHENG[ea] === eb || SHENG[eb] === ea) return 91
  if (KE[ea] === eb || KE[eb] === ea) return 56
  return 80
}
function bestWorstPair(ps: Participant[]) {
  let best = { a: ps[0], b: ps[1], s: -1 }, worst = { a: ps[0], b: ps[1], s: 101 }
  for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
    const s = pairScore(ps[i], ps[j])
    if (s > best.s) best = { a: ps[i], b: ps[j], s }
    if (s < worst.s) worst = { a: ps[i], b: ps[j], s }
  }
  return { best, worst }
}
function overallScore(ps: Participant[]): number {
  if (ps.length < 2) return 0
  let sum = 0, n = 0
  for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) { sum += pairScore(ps[i], ps[j]); n++ }
  return Math.round(sum / n)
}
function vibeOf(score: number): string {
  if (score >= 88) return "찰떡궁합 ✨"
  if (score >= 80) return "꽤 잘 맞아요 💛"
  if (score >= 70) return "티격태격 케미 ⚡"
  return "노력하면 됨 🌱"
}

function Avatar({ p, size = 56 }: { p: Participant; size?: number }) {
  return (
    <div
      className="rounded-full overflow-hidden border-2 border-charcoal/15 shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: ELEM_BG[elemOf(p.iljuKey)] }}
    >
      {ILJU_SVG_ICONS[p.iljuKey]?.(getIljuProfileViewBox(p.iljuKey))}
    </div>
  )
}
function EmptySlot({ size = 56 }: { size?: number }) {
  return (
    <div className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: "#F1F5F9", border: "2px dashed #CBD5E1" }}>
      <span className="text-[18px] text-charcoal/25">?</span>
    </div>
  )
}

type Step = "landing" | "input" | "waiting" | "result"

export default function CompatFunnelPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("landing")
  const [parts, setParts] = useState<Participant[]>([HOST])
  const [name, setName] = useState("")
  const [birth, setBirth] = useState({ y: "", m: "", d: "" })
  const [addAll, setAddAll] = useState(true)

  const filled = parts.length
  const slots = Array.from({ length: CAPACITY }, (_, i) => parts[i] ?? null)

  const submitMine = () => {
    if (!name.trim()) return
    setParts(prev => [...prev, { name: name.trim(), iljuKey: MY_MOCK_ILJU, me: true }])
    setStep("waiting")
  }
  const demoFillRest = () => {
    setParts(prev => [...prev, ...DEMO_FILL.slice(0, CAPACITY - prev.length)])
    setStep("result")
  }

  // ── 랜딩 (맛보기) ──
  if (step === "landing") {
    return (
      <div className="flex flex-col items-center gap-5 pt-6 text-center">
        <p className="text-[20px] text-charcoal" style={BINGGRAE}>
          <span className="highlight-pink">{HOST.name}</span>님이 궁합 보자고 초대했어요 ✦
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
            <Avatar p={HOST} size={84} />
          </div>
          <p className="text-[13px] text-text-muted">{ELEM_LABEL[elemOf(HOST.iljuKey)]}</p>
        </div>
        <div className="w-full rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col items-center gap-3">
          <p className="text-[14px] text-charcoal" style={GAEGU}>4명이 모이면 우리 궁합이 나와요 💞</p>
          <div className="flex gap-2.5">
            {slots.map((p, i) => (p ? <Avatar key={i} p={p} size={44} /> : <EmptySlot key={i} size={44} />))}
          </div>
          <p className="text-[12px] text-text-muted">{filled} / {CAPACITY} 참여 중</p>
        </div>
        <button onClick={() => setStep("input")}
          className="w-full h-[54px] rounded-2xl flex items-center justify-center gap-2 active:opacity-85 transition-opacity border-2 border-charcoal text-[15px]"
          style={{ background: "#FEE500", color: "#3C1E1E", ...BINGGRAE }}>
          💬 카카오로 1초 입장
        </button>
        <p className="text-[11px] text-text-muted">로그인하면 내 결과 저장 + 친구 맺기 가능</p>
      </div>
    )
  }

  // ── 사주 입력 ──
  if (step === "input") {
    const valid = name.trim() && birth.y.length === 4 && birth.m && birth.d
    return (
      <div className="flex flex-col gap-5 pt-4">
        <p className="text-[20px] text-charcoal" style={BINGGRAE}>내 사주 입력 ✏️</p>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[12px] text-text-muted font-bold mb-1.5 block">이름</label>
            <input value={name} onChange={e => setName(e.target.value)} maxLength={10} placeholder="이름"
              className="w-full text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none"
              style={{ background: "#FFFDE8", border: "1.5px dashed #D4B870" }} />
          </div>
          <div>
            <label className="text-[12px] text-text-muted font-bold mb-1.5 block">생년월일</label>
            <div className="flex gap-2">
              <input value={birth.y} onChange={e => setBirth({ ...birth, y: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="1998" inputMode="numeric"
                className="flex-1 text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none text-center" style={{ background: "white", border: "1.5px solid #E0D4C0" }} />
              <input value={birth.m} onChange={e => setBirth({ ...birth, m: e.target.value.replace(/\D/g, "").slice(0, 2) })} placeholder="월" inputMode="numeric"
                className="w-16 text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none text-center" style={{ background: "white", border: "1.5px solid #E0D4C0" }} />
              <input value={birth.d} onChange={e => setBirth({ ...birth, d: e.target.value.replace(/\D/g, "").slice(0, 2) })} placeholder="일" inputMode="numeric"
                className="w-16 text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none text-center" style={{ background: "white", border: "1.5px solid #E0D4C0" }} />
            </div>
          </div>
        </div>
        <button onClick={submitMine} disabled={!valid}
          className="w-full h-[54px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal disabled:opacity-30"
          style={{ background: "#2D2D2D", color: "#FFF9F0", ...BINGGRAE }}>
          입력 완료
        </button>
      </div>
    )
  }

  // ── 대기 ──
  if (step === "waiting") {
    return (
      <div className="flex flex-col items-center gap-5 pt-6 text-center">
        <DoodleSparkle className="w-8 h-8" />
        <p className="text-[20px] text-charcoal" style={BINGGRAE}>친구를 기다리는 중...</p>
        <p className="text-[14px] text-text-muted">{filled} / {CAPACITY} 명 입력 완료</p>
        <div className="w-full rounded-2xl bg-white border border-charcoal/10 px-4 py-5 flex flex-col gap-3">
          {slots.map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              {p ? <Avatar p={p} size={44} /> : <EmptySlot size={44} />}
              <span className="text-[14px] text-charcoal" style={GAEGU}>{p ? (p.me ? `${p.name} (나)` : p.name) : "입력 대기 중..."}</span>
            </div>
          ))}
        </div>
        <button onClick={demoFillRest}
          className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-charcoal/5 text-charcoal active:opacity-70" style={GAEGU}>
          🎬 데모: 나머지 친구 자동 입력
        </button>
      </div>
    )
  }

  // ── 결과 (고도화) ──
  const d = distOf(parts)
  const score = overallScore(parts)
  const arch = archetype(parts, d)
  const miss = ELEMS.filter(e => d[e] === 0)
  const { best, worst } = bestWorstPair(parts)
  const maxCount = Math.max(...ELEMS.map(e => d[e]), 1)
  const others = parts.filter(p => !p.me)

  return (
    <div className="flex flex-col gap-6 pt-4 pb-10">
      {/* [1] 종합 % + 아키타입 — 무료, 스샷 핵심 */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-1.5">
          <DoodleHeart className="w-5 h-5" />
          <p className="text-[15px] text-text-muted" style={GAEGU}>우리 {parts.length}명의 궁합은</p>
        </div>
        <p className="text-[64px] leading-none text-pink" style={BINGGRAE}>{score}%</p>
        <p className="text-[15px] text-charcoal" style={BINGGRAE}>{vibeOf(score)}</p>
        <div className="mt-1 px-4 py-1.5 rounded-full" style={{ background: "#FFF4E0", border: "1.5px dashed #F0C060" }}>
          <p className="text-[14px] text-[#9A7050]" style={BINGGRAE}>{arch}</p>
        </div>
      </div>

      {/* [2] 그룹 롤 배정 — 무료, 태그 유발 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal" style={BINGGRAE}>🎭 우리 모임 역할</p>
        <div className="grid grid-cols-2 gap-2">
          {parts.map((p, i) => {
            const r = ROLE[elemOf(p.iljuKey)]
            return (
              <div key={i} className="flex items-center gap-2.5 rounded-2xl bg-white border border-charcoal/10 px-3 py-2.5">
                <Avatar p={p} size={40} />
                <div className="min-w-0">
                  <p className="text-[11px] text-text-muted truncate">{p.me ? "나" : p.name}</p>
                  <p className="text-[13px] font-bold text-charcoal leading-tight">{r.emoji} {r.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* [3] 오행 밸런스 — 무료, 사주 차별 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal" style={BINGGRAE}>⚖️ 우리 모임 오행 밸런스</p>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2.5">
          {ELEMS.map(e => (
            <div key={e} className="flex items-center gap-2.5">
              <span className="w-6 text-[12px] font-bold text-charcoal shrink-0">{e}</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${(d[e] / maxCount) * 100}%`, background: ELEM_COLOR[e] }} />
              </div>
              <span className="w-5 text-[11px] text-text-muted text-right shrink-0">{d[e]}</span>
            </div>
          ))}
          <p className="text-[12px] text-charcoal/70 leading-relaxed mt-1" style={GAEGU}>{balanceLine(d)}</p>
        </div>
      </div>

      {/* 유료 잠금 티저 — 페어/개인/상황별 */}
      <div className="relative rounded-2xl overflow-hidden border border-charcoal/10">
        <div className="px-4 py-4 flex flex-col gap-3" style={{ filter: "blur(4px)", pointerEvents: "none", userSelect: "none" }}>
          <p className="text-[15px] text-charcoal" style={BINGGRAE}>💘 페어별 궁합</p>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-charcoal">최고 케미: {best.a.me ? "나" : best.a.name} ❤️ {best.b.me ? "나" : best.b.name}</span>
            <span className="text-[15px] font-bold text-pink">{best.s}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-charcoal">물·기름: {worst.a.me ? "나" : worst.a.name} ⚡ {worst.b.me ? "나" : worst.b.name}</span>
            <span className="text-[15px] font-bold text-charcoal/50">{worst.s}%</span>
          </div>
          <p className="text-[15px] text-charcoal mt-1" style={BINGGRAE}>🧑‍🤝‍🧑 개인별 심층 · 상황별(연애/일/돈)</p>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/40 backdrop-blur-[1px]">
          <span className="text-2xl">🔒</span>
          <p className="text-[13px] font-bold text-charcoal" style={BINGGRAE}>페어별·개인별·상황별 전체 분석</p>
          <button className="mt-1 px-4 py-2 rounded-full text-[12px] font-bold border-2 border-charcoal active:opacity-70"
            style={{ background: "#FFF9F0", color: "#2D2D2D", boxShadow: "2px 2px 0px #2D2D2D" }}>
            잠금 해제 (구독)
          </button>
        </div>
      </div>

      {/* 성장 훅 — 부족 오행 친구 초대 */}
      {miss.length > 0 && (
        <div className="rounded-2xl px-4 py-3.5 flex items-center gap-3" style={{ background: ELEM_BG[miss[0]], border: `1.5px solid ${ELEM_COLOR[miss[0]]}` }}>
          <span className="text-2xl">{miss[0] === "수" ? "💧" : miss[0] === "금" ? "💎" : miss[0] === "목" ? "🌱" : miss[0] === "화" ? "🔥" : "🌍"}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-charcoal leading-tight">이 모임엔 {miss[0]}({miss[0]}) 기운이 없어요</p>
            <p className="text-[11px] text-charcoal/60">{STEMS_OF[miss[0]]} 일주 친구를 초대하면 밸런스 완성 ✨</p>
          </div>
          <button className="shrink-0 px-3 py-1.5 rounded-full text-[12px] font-bold border-2 border-charcoal active:opacity-70" style={{ background: "white", color: "#2D2D2D" }}>
            친구 초대
          </button>
        </div>
      )}

      {/* 전원 친구 추가 (기본 ON) */}
      <button onClick={() => setAddAll(v => !v)}
        className="w-full rounded-2xl px-4 py-3.5 flex items-center justify-between active:opacity-80 transition-opacity"
        style={{ background: addAll ? "#FFF4E0" : "#F1F5F9", border: `1.5px solid ${addAll ? "#F0C060" : "#E0D4C0"}` }}>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">{others.map((p, i) => <Avatar key={i} p={p} size={28} />)}</div>
          <span className="text-[13px] font-bold text-charcoal">전원 친구 추가</span>
        </div>
        <span className="w-11 h-6 rounded-full relative transition-colors shrink-0" style={{ background: addAll ? "#2D2D2D" : "#CBD5E1" }}>
          <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: addAll ? 22 : 2 }} />
        </span>
      </button>

      {/* 모임 길일 + 공유 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5 flex items-center gap-3">
        <DoodleCrown className="w-6 h-6 shrink-0" />
        <div className="flex-1">
          <p className="text-[12px] text-text-muted">이 모임 다음 만나기 좋은 날</p>
          <p className="text-[14px] font-bold text-charcoal">7월 12일 (토) · 화기운 충전 ⚡</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button onClick={() => router.push("/v3/interior")}
          className="w-full h-[54px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal"
          style={{ background: "#E84B6A", color: "#FFF9F0", boxShadow: "2px 2px 0px #2D2D2D", ...BINGGRAE }}>
          {addAll ? "친구 추가하고 내 미니홈피로 →" : "내 미니홈피로 →"}
        </button>
        <button className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-white text-charcoal active:opacity-70" style={GAEGU}>
          📷 결과 카드 단톡에 공유
        </button>
      </div>
    </div>
  )
}
