"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { DoodleHeart, DoodleSparkle } from "@/components/doodles"

/* ────────────────────────────────────────────────────────────
   그룹 궁합 펀널 — 목업 UI (INVITE-COMPAT-PLAN.md)
   랜딩(맛보기) → 카카오 1초 입장 → 사주 입력 → 대기 → 결과(전원 친구추가)
   ※ 백엔드/실제 궁합 계산 미연동. 카카오 로그인도 mock.
──────────────────────────────────────────────────────────── */

const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }

const ELEM_BG: Record<string, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE",
}
const ELEM_LABEL: Record<string, string> = {
  목: "목 기운 🌱", 화: "화 기운 🔥", 토: "토 기운 🌍", 금: "금 기운 💎", 수: "수 기운 🌊",
}
const STEM_TO_ELEM: Record<string, string> = {
  갑: "목", 을: "목", 병: "화", 정: "화", 무: "토", 기: "토", 경: "금", 신: "금", 임: "수", 계: "수",
}
const elemOf = (key: string) => STEM_TO_ELEM[key[0]] ?? "토"

type Participant = { name: string; iljuKey: string; me?: boolean }

const CAPACITY = 4
const HOST: Participant = { name: "지수", iljuKey: "갑자-f" }
// 데모용 나머지 친구(시뮬레이션으로 채움)
const DEMO_FILL: Participant[] = [
  { name: "민준", iljuKey: "병인-m" },
  { name: "하은", iljuKey: "계묘-f" },
]
const MY_MOCK_ILJU = "무인-m" // 입력 완료 시 부여하는 mock 일주

function mockScore(ps: Participant[]): number {
  const sum = ps.reduce((s, p) => s + p.iljuKey.charCodeAt(0) + p.iljuKey.charCodeAt(1), 0)
  return 70 + (sum % 28) // 70~97
}
function vibeOf(score: number): string {
  if (score >= 90) return "찰떡궁합 ✨"
  if (score >= 82) return "꽤 잘 맞아요 💛"
  if (score >= 74) return "티격태격 케미 ⚡"
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
    <div
      className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: "#F1F5F9", border: "2px dashed #CBD5E1" }}
    >
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
    setParts(prev => {
      const need = CAPACITY - prev.length
      return [...prev, ...DEMO_FILL.slice(0, need)]
    })
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
        <button
          onClick={() => setStep("input")}
          className="w-full h-[54px] rounded-2xl flex items-center justify-center gap-2 active:opacity-85 transition-opacity border-2 border-charcoal text-[15px]"
          style={{ background: "#FEE500", color: "#3C1E1E", ...BINGGRAE }}
        >
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
            <input
              value={name} onChange={e => setName(e.target.value)} maxLength={10} placeholder="이름"
              className="w-full text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none"
              style={{ background: "#FFFDE8", border: "1.5px dashed #D4B870" }}
            />
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
        <button
          onClick={submitMine} disabled={!valid}
          className="w-full h-[54px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal disabled:opacity-30"
          style={{ background: "#2D2D2D", color: "#FFF9F0", ...BINGGRAE }}
        >
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
              <span className="text-[14px] text-charcoal" style={GAEGU}>
                {p ? (p.me ? `${p.name} (나)` : p.name) : "입력 대기 중..."}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={demoFillRest}
          className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-charcoal/5 text-charcoal active:opacity-70"
          style={GAEGU}
        >
          🎬 데모: 나머지 친구 자동 입력
        </button>
      </div>
    )
  }

  // ── 결과 ──
  const score = mockScore(parts)
  const others = parts.filter(p => !p.me)
  return (
    <div className="flex flex-col items-center gap-5 pt-4 text-center pb-8">
      <div className="flex items-center gap-1.5">
        <DoodleHeart className="w-5 h-5" />
        <p className="text-[16px] text-text-muted" style={GAEGU}>우리 {parts.length}명의 궁합은</p>
      </div>
      <p className="text-[64px] leading-none text-pink" style={BINGGRAE}>{score}%</p>
      <p className="text-[18px] text-charcoal" style={BINGGRAE}>{vibeOf(score)}</p>

      <div className="flex gap-2.5 flex-wrap justify-center">
        {parts.map((p, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <Avatar p={p} size={52} />
            <span className="text-[11px] font-bold text-charcoal">{p.me ? "나" : p.name}</span>
          </div>
        ))}
      </div>

      <div className="w-full rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5">
        <p className="text-[13px] text-charcoal/80 leading-relaxed" style={GAEGU}>
          오행이 골고루 섞여서 서로 빈 곳을 채워주는 조합이에요. 가끔 부딪혀도 결국 다시 모이는 사이 💞
        </p>
      </div>

      {/* 전원 친구 추가 (기본 ON) */}
      <button
        onClick={() => setAddAll(v => !v)}
        className="w-full rounded-2xl px-4 py-3.5 flex items-center justify-between active:opacity-80 transition-opacity"
        style={{ background: addAll ? "#FFF4E0" : "#F1F5F9", border: `1.5px solid ${addAll ? "#F0C060" : "#E0D4C0"}` }}
      >
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {others.map((p, i) => <Avatar key={i} p={p} size={28} />)}
          </div>
          <span className="text-[13px] font-bold text-charcoal">전원 친구 추가</span>
        </div>
        <span
          className="w-11 h-6 rounded-full relative transition-colors shrink-0"
          style={{ background: addAll ? "#2D2D2D" : "#CBD5E1" }}
        >
          <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: addAll ? 22 : 2 }} />
        </span>
      </button>

      <button
        onClick={() => router.push("/v3/interior")}
        className="w-full h-[54px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal"
        style={{ background: "#E84B6A", color: "#FFF9F0", boxShadow: "2px 2px 0px #2D2D2D", ...BINGGRAE }}
      >
        {addAll ? "친구 추가하고 내 미니홈피로 →" : "내 미니홈피로 →"}
      </button>
    </div>
  )
}
