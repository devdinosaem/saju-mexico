"use client"
import { useState, useRef } from "react"
import {
  DoodleFlower, DoodleLightning, DoodleCandy, DoodleCrystal, DoodleMoon,
} from "@/components/doodles"

const ELEM_CFG = {
  목: { label: "목(木)", emoji: "🌿", color: "#D1FAE5", border: "#4ADE80", text: "#166534", bar: "#4ADE80", Doodle: DoodleFlower },
  화: { label: "화(火)", emoji: "🔥", color: "#FEE2E2", border: "#F87171", text: "#991B1B", bar: "#F87171", Doodle: DoodleLightning },
  토: { label: "토(土)", emoji: "🍯", color: "#FEF3C7", border: "#FBBF24", text: "#92400E", bar: "#FBBF24", Doodle: DoodleCandy },
  금: { label: "금(金)", emoji: "💎", color: "#F1F5F9", border: "#94A3B8", text: "#334155", bar: "#94A3B8", Doodle: DoodleCrystal },
  수: { label: "수(水)", emoji: "💧", color: "#DBEAFE", border: "#60A5FA", text: "#1E3A8A", bar: "#60A5FA", Doodle: DoodleMoon },
} as const
type Elem = keyof typeof ELEM_CFG

type Chip = { id: number; food: string; elem: Elem }

const REACTIONS: Record<Elem, { normal: string; excess: string; lack: string }> = {
  목: {
    normal: "목 기운 충전 중! 간이 기뻐하는 맛이야 🌿",
    excess: "초록이 좀 넘치는데? 창의력 폭발하겠지만 피로 조심해",
    lack:   "요즘 눈 피로하거나 괜히 짜증나지 않아? 신맛 좀 챙겨봐",
  },
  화: {
    normal: "화 기운 충전! 오늘 뭔가 시작하기 딱이야 🔥",
    excess: "헐, 불 뿜겠다. 오늘 뭔가 시작하기 엄청 좋은 날이네",
    lack:   "에너지 좀 처지지 않아? 쓴맛 있는 거 조금만 먹어봐",
  },
  토: {
    normal: "토 기운 충전! 위장이 든든해지는 느낌 🍯",
    excess: "단 거 너무 많이 먹었는데... 위장아 괜찮니?",
    lack:   "입맛 없거나 소화 좀 느리지 않아? 단맛 살짝 챙겨봐",
  },
  금: {
    normal: "금 기운 충전! 폐 맑아지는 느낌 💎",
    excess: "매운 거 오늘 너무 먹었다. 대장이 고생 중일 수 있어",
    lack:   "피부 좀 건조하거나 기침 나오진 않아? 매운맛 살짝 챙겨봐",
  },
  수: {
    normal: "수 기운 충전! 신장 사랑해 💧",
    excess: "오늘 짠 거 좀 많은데. 부기 조심하고 물 충분히 마셔",
    lack:   "몸이 건조해지고 있어. 물 마시고, 조용한 곳 잠깐 가봐",
  },
}

const WEEKLY_MOCK: Record<Elem, number> = { 목: 5, 화: 9, 토: 7, 금: 3, 수: 2 }
const YONGSHIN_GOAL: Partial<Record<Elem, number>> = { 수: 40 }

function classifyFood(text: string): Elem {
  if (/고기|삼겹|치킨|소고기|돼지|닭|생선|회|육/.test(text)) return "화"
  if (/채소|샐러드|나물|김치|상추|브로콜리|시금치|토마토/.test(text)) return "목"
  if (/국|탕|찌개|라면|된장|소금|짠|미역|미소/.test(text)) return "수"
  if (/달달|케이크|초콜릿|아이스크림|설탕|밥|떡|빵|과자|쿠키/.test(text)) return "토"
  if (/매운|고추|마늘|양파|생강|후추|겨자/.test(text)) return "금"
  const fallback: Elem[] = ["목", "화", "토", "금", "수"]
  return fallback[text.charCodeAt(0) % 5]
}

// 기본 제안 칩 — 처음부터 pending에 담겨 있는 것들
const DEFAULTS: { food: string; elem: Elem }[] = [
  { food: "고기류",   elem: "화" },
  { food: "채소",     elem: "목" },
  { food: "국물",     elem: "수" },
  { food: "달달한 것", elem: "토" },
]

function makeDefaults(startId: number): Chip[] {
  return DEFAULTS.map((d, i) => ({ ...d, id: startId + i }))
}

export default function FoodLogger() {
  const nextId = useRef(DEFAULTS.length)
  // pending: 등록 대기 칩 (기본 제안 포함, 사용자 추가 포함 — 구분 없음)
  const [pending, setPending] = useState<Chip[]>(() => makeDefaults(0))
  const [deleteMode, setDeleteMode] = useState(false)

  const [counts, setCounts] = useState<Record<Elem, number>>({ 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 })
  const [stickers, setStickers] = useState<Chip[]>([])
  const [lastElem, setLastElem] = useState<Elem | null>(null)

  const [input, setInput] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [showWeekly, setShowWeekly] = useState(false)

  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  function enqueue(food: string, elem: Elem) {
    setPending(prev => [...prev, { id: nextId.current++, food, elem }])
  }

  function analyze() {
    if (!input.trim()) return
    setAnalyzing(true)
    setTimeout(() => {
      enqueue(input.trim(), classifyFood(input))
      setInput("")
      setAnalyzing(false)
    }, 700)
  }

  function removeChip(id: number) {
    setPending(prev => {
      const next = prev.filter(c => c.id !== id)
      if (next.length === 0) setDeleteMode(false)
      return next
    })
  }

  function register() {
    if (pending.length === 0) return
    const last = pending[pending.length - 1].elem
    setCounts(prev => {
      const next = { ...prev }
      pending.forEach(c => { next[c.elem] += 1 })
      return next
    })
    setStickers(prev => [...prev, ...pending])
    setLastElem(last)
    // 등록 후 기본 제안 칩으로 리셋
    const id = nextId.current
    nextId.current += DEFAULTS.length
    setPending(makeDefaults(id))
    setDeleteMode(false)
  }

  function getReaction(elem: Elem) {
    const c = counts[elem]
    if (c === 0) return REACTIONS[elem].lack
    if (c >= 3) return REACTIONS[elem].excess
    return REACTIONS[elem].normal
  }

  const maxWeekly = Math.max(...Object.values(WEEKLY_MOCK))
  const maxElem = (Object.entries(WEEKLY_MOCK).sort((a, b) => b[1] - a[1])[0][0]) as Elem
  const minElem = (Object.entries(WEEKLY_MOCK).sort((a, b) => a[1] - b[1])[0][0]) as Elem

  const chipBase = "px-2.5 py-1.5 rounded-full text-[12px] font-bold border transition-all active:scale-95"

  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 p-4 flex flex-col gap-4">
      {/* 헤더 */}
      <div className="flex items-center gap-2">
        <span className="text-lg">🍽️</span>
        <p className="text-sm font-bold text-charcoal">오늘 뭐 먹었어?</p>
        <span className="text-[11px] text-text-muted ml-auto">맛으로 오행 채우기</span>
      </div>

      {/* 텍스트 입력 */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && analyze()}
          placeholder="먹은 음식 입력 (예: 된장찌개)"
          className="flex-1 text-[13px] px-3 py-2 rounded-xl border border-charcoal/15 bg-cream outline-none focus:border-charcoal/40 transition-colors placeholder:text-text-muted"
        />
        <button
          onClick={analyze}
          disabled={analyzing || !input.trim()}
          className="px-3 py-2 rounded-xl bg-charcoal/5 border border-charcoal/10 text-[12px] font-bold text-charcoal active:opacity-70 disabled:opacity-40 transition-all"
        >
          {analyzing ? "🔮" : "분석"}
        </button>
      </div>

      {/* 통합 칩 영역 + 없애기 */}
      <div className="flex items-start gap-2">
        <div className="flex-1 flex flex-wrap gap-2">
          {pending.map(chip => {
            const cfg = ELEM_CFG[chip.elem]
            return (
              <button
                key={chip.id}
                onClick={() => deleteMode && removeChip(chip.id)}
                className={[chipBase, deleteMode ? "cursor-pointer" : "cursor-default"].join(" ")}
                style={{ background: cfg.color, borderColor: cfg.border, color: cfg.text }}
              >
                {chip.food}
                {deleteMode && <span className="ml-1 text-[11px] font-black opacity-50">×</span>}
              </button>
            )
          })}
        </div>
        <button
          onClick={() => setDeleteMode(v => !v)}
          disabled={pending.length === 0}
          className={[
            "shrink-0 px-2.5 py-1.5 rounded-full text-[12px] font-medium border transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none",
            deleteMode
              ? "bg-rose-50 border-rose-200 text-rose-400"
              : "bg-charcoal/[0.04] border-charcoal/15 text-charcoal/50",
          ].join(" ")}
        >
          없애기
        </button>
      </div>

      {/* 등록하기 */}
      <button
        onClick={register}
        disabled={pending.length === 0}
        className="w-full py-2 rounded-xl bg-charcoal text-cream text-[13px] font-bold active:opacity-75 disabled:opacity-40 transition-opacity"
      >
        등록하기
      </button>

      {/* 스티커 누적 시각화 */}
      {stickers.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {stickers.map(s => {
            const cfg = ELEM_CFG[s.elem]
            const D = cfg.Doodle
            return (
              <span
                key={s.id}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: cfg.color, border: `1.5px solid ${cfg.border}` }}
              >
                <D className="w-4 h-4" />
              </span>
            )
          })}
        </div>
      )}

      {/* 오행 게이지 */}
      {total > 0 && (
        <div className="space-y-2">
          {(Object.keys(ELEM_CFG) as Elem[]).map(e => {
            const cfg = ELEM_CFG[e]
            const pct = Math.round((counts[e] / total) * 100)
            const goal = YONGSHIN_GOAL[e]
            return (
              <div key={e} className="flex items-center gap-2">
                <span className="text-[11px] font-bold w-12 shrink-0" style={{ color: cfg.text }}>{cfg.label}</span>
                <div className="flex-1 relative h-2.5 rounded-full bg-charcoal/5 overflow-visible">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: cfg.bar }}
                  />
                  {goal && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
                      style={{ left: `${goal}%` }}
                    >
                      <div className="w-0.5 h-4 bg-charcoal/50 rounded-full" />
                      <span className="text-[8px] font-bold text-charcoal/50 whitespace-nowrap">목표</span>
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-bold w-7 text-right" style={{ color: cfg.text }}>{pct}%</span>
              </div>
            )
          })}
          {lastElem && (
            <p className="text-[12px] font-medium pt-0.5" style={{ color: ELEM_CFG[lastElem].text }}>
              {getReaction(lastElem)}
            </p>
          )}
        </div>
      )}

      {total === 0 && (
        <p className="text-[11px] text-text-muted">먹은 거 추가하면 오행 게이지가 쌓여 ✨</p>
      )}

      {/* 주간 밸런스 리포트 */}
      <div className="border-t border-charcoal/10 pt-3">
        <button
          onClick={() => setShowWeekly(v => !v)}
          className="w-full flex items-center justify-between"
        >
          <span className="text-sm font-bold text-charcoal">📊 이번 주 오행 밸런스</span>
          <span className="text-text-muted text-xs">{showWeekly ? "접기 ▲" : "보기 ▼"}</span>
        </button>

        {showWeekly && (
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="flex-1 rounded-xl p-2.5 text-center" style={{ background: ELEM_CFG[maxElem].color }}>
                <p className="text-[10px] text-text-muted">이번 주 최다</p>
                <p className="text-sm font-bold" style={{ color: ELEM_CFG[maxElem].text }}>
                  {ELEM_CFG[maxElem].emoji} {ELEM_CFG[maxElem].label}
                </p>
              </div>
              <div className="flex-1 rounded-xl p-2.5 text-center" style={{ background: ELEM_CFG[minElem].color }}>
                <p className="text-[10px] text-text-muted">이번 주 부족</p>
                <p className="text-sm font-bold" style={{ color: ELEM_CFG[minElem].text }}>
                  {ELEM_CFG[minElem].emoji} {ELEM_CFG[minElem].label}
                </p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden">
              <div className="p-3 space-y-1.5">
                {(Object.entries(WEEKLY_MOCK) as [Elem, number][]).map(([e, cnt]) => {
                  const cfg = ELEM_CFG[e]
                  return (
                    <div key={e} className="flex items-center gap-2">
                      <span className="text-[11px] font-bold w-12 shrink-0" style={{ color: cfg.text }}>{cfg.label}</span>
                      <div className="flex-1 h-2 rounded-full bg-charcoal/5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(cnt / maxWeekly) * 100}%`, backgroundColor: cfg.bar }} />
                      </div>
                      <span className="text-[11px] text-text-muted w-6 text-right">{cnt}회</span>
                    </div>
                  )
                })}
              </div>
              <div className="absolute inset-0 backdrop-blur-sm bg-white/65 flex flex-col items-center justify-center gap-2">
                <span className="text-2xl">🔒</span>
                <p className="text-xs font-bold text-charcoal">구독자 전용</p>
                <button className="px-4 py-1.5 rounded-full bg-pink/75 text-cream text-[11px] font-bold border border-charcoal active:opacity-80">
                  구독하기 · ₩2,900/월
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
