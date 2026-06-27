"use client"
// ════════════════════════════════════════════════════════════════
// 사주 풀이 재사용 결과 모듈 — 어떤 기능(친구/커플/가족…)이든 조립해 쓴다.
// 데이터는 flavor, 스타일은 ui 계약. 새 기능은 이 블록들을 골라 배치만.
// ════════════════════════════════════════════════════════════════
import { useState } from "react"
import { DoodleSpeechBubble, DoodleCalendar, DoodleMedal, DoodleSparkle } from "@/components/doodles"
import type { Elem, RelKind } from "./engine"
import { Ico, Card, SectionTitle, BINGGRAE, GAEGU, PINK } from "./ui"
import {
  ELEM_BG, ELEM_COLOR, ELEM_DOODLE,
  LUCKY, SAJU_CODE, SCENARIO, MONTH_FLOW, COMPARE, QUIZ, REENGAGE, REL_META,
} from "./flavor"

/** ① 럭키 세트 — 오행 기반 색/숫자/아이템/방향 */
export function LuckySet({ elem }: { elem: Elem }) {
  const l = LUCKY[elem]
  const rows: [string, React.ReactNode][] = [
    ["행운의 색", <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-full" style={{ background: l.colorHex }} />{l.color}</span>],
    ["행운의 숫자", l.numbers],
    ["행운의 아이템", l.item],
    ["행운의 방향", l.direction],
  ]
  return (
    <div className="flex flex-col gap-2.5">
      <SectionTitle icon={l.D}>럭키 세트</SectionTitle>
      <Card className="px-4 py-1">
        {rows.map(([k, v], i) => (
          <div key={i} className="flex items-center justify-between py-2.5 border-b border-charcoal/5 last:border-0">
            <span className="text-[14px] text-text-muted">{k}</span>
            <span className="text-[14px] font-bold text-charcoal">{v}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}

/** ② 한 줄 사주 코드 (MBTI식) */
export function SajuCode({ elem, name }: { elem: Elem; name?: string }) {
  const c = SAJU_CODE[elem]
  return (
    <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: ELEM_BG[elem], border: `1.5px solid ${ELEM_COLOR[elem]}` }}>
      <Ico as={ELEM_DOODLE[elem]} size={24} />
      <div>
        <p className="text-[14px] text-charcoal/60">{name ? `${name}의 사주 코드` : "사주 코드"}</p>
        <p className="text-[15px] font-bold text-charcoal" style={BINGGRAE}>{c.code} · {c.nick}</p>
      </div>
    </div>
  )
}

/** ③ "이럴 땐?" 시나리오 카드 */
export function ScenarioCards({ rel }: { rel: RelKind }) {
  const list = SCENARIO[rel]
  if (!list?.length) return null
  return (
    <div className="flex flex-col gap-2.5">
      <SectionTitle icon={DoodleSpeechBubble}>이럴 땐?</SectionTitle>
      <div className="flex flex-col gap-2">
        {list.map((s, i) => (
          <Card key={i} className="px-4 py-3">
            <p className="text-[14px] font-bold text-charcoal">Q. {s.q}</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{s.a}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

/** ④ 시기운 — 이번 달 관계 흐름 (월운 cross-sell 훅) */
export function MonthFlow() {
  return (
    <div className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5" style={{ background: "#EFF6FF", border: "1.5px solid #93C5FD" }}>
      <Ico as={DoodleCalendar} size={20} />
      <div>
        <p className="text-[14px] font-bold text-charcoal">이번 달 흐름 · {MONTH_FLOW.rating}</p>
        <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{MONTH_FLOW.line} (베스트: {MONTH_FLOW.bestWeek})</p>
      </div>
    </div>
  )
}

/** ⑤ 비교 모드 — 나 vs 유명인/평균 */
export function CompareBar({ score }: { score: number }) {
  const rows = [
    { label: "우리", value: score, color: PINK },
    { label: COMPARE.celebPair.name, value: COMPARE.celebPair.score, color: "#FBBF24" },
    { label: "전체 평균", value: COMPARE.averageScore, color: "#94A3B8" },
  ]
  return (
    <div className="flex flex-col gap-2.5">
      <SectionTitle icon={DoodleMedal}>비교 · {COMPARE.percentileLabel(score)}</SectionTitle>
      <Card className="px-4 py-4 flex flex-col gap-3">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="w-16 text-[14px] font-bold text-charcoal shrink-0 truncate">{r.label}</span>
            <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
              <div className="h-full rounded-full" style={{ width: `${r.value}%`, background: r.color }} />
            </div>
            <span className="w-9 text-[14px] font-bold text-right shrink-0">{r.value}%</span>
          </div>
        ))}
      </Card>
    </div>
  )
}

/** ⑦ 인터랙션 — "누가 더 ~할까?" 투표 */
export function QuizVote({ rel, leftName = "나", rightName = "상대" }: { rel: RelKind; leftName?: string; rightName?: string }) {
  const qs = QUIZ[rel]
  const [answers, setAnswers] = useState<Record<number, "L" | "R">>({})
  if (!qs?.length) return null
  return (
    <div className="flex flex-col gap-2.5">
      <SectionTitle icon={DoodleSparkle}>누가 더?</SectionTitle>
      <Card className="px-4 py-3 flex flex-col gap-3">
        {qs.map((q, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <p className="text-[14px] font-bold text-charcoal">{q}</p>
            <div className="flex gap-2">
              {(["L", "R"] as const).map(side => (
                <button key={side} onClick={() => setAnswers(a => ({ ...a, [i]: side }))}
                  className="flex-1 py-2 rounded-xl text-[14px] font-bold border-2 transition-colors"
                  style={answers[i] === side ? { background: PINK, color: "#FFF9F0", borderColor: PINK } : { background: "white", color: "#94A3B8", borderColor: "#E0D4C0" }}>
                  {side === "L" ? leftName : rightName}
                </button>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

/** ⑧ 재참여 훅 CTA */
export function ReengageCTA({ rel, onClick }: { rel: RelKind; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-white text-charcoal active:opacity-70 flex items-center justify-center gap-1.5" style={GAEGU}>
      <Ico as={REL_META[rel].D} size={18} /> {REENGAGE[rel]}
    </button>
  )
}

/** ⑨ 시리즈 배지 — 관계종류 라벨 (가족/직장/베프… 확장 표시) */
export function RelBadge({ rel }: { rel: RelKind }) {
  const m = REL_META[rel]
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[14px] font-bold" style={{ background: "#FFF4E0", color: "#9A7050" }}>
      <Ico as={m.D} size={14} /> {m.label} 궁합
    </span>
  )
}
