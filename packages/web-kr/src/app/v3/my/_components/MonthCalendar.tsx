"use client"
import { useState, useMemo } from "react"
import { getSonEopsDays, buildMonthDays } from "@/lib/lunar-utils"
import { dayPillar, STEM_ELEMENT } from "manseryeok"

const now = new Date()
const YEAR = now.getFullYear()
const MONTH = now.getMonth() + 1
const TODAY = now.getDate()

type Elem = "목" | "화" | "토" | "금" | "수"

const ELEM_COLOR: Record<Elem, string> = {
  목: "#4ADE80", 화: "#F87171", 토: "#FBBF24", 금: "#94A3B8", 수: "#60A5FA",
}

const FIVEELEMENT_KR: Record<string, Elem> = {
  wood: "목", fire: "화", earth: "토", metal: "금", water: "수",
}

function getDayElem(day: number): Elem {
  const gz = dayPillar(YEAR, MONTH, day)
  return FIVEELEMENT_KR[STEM_ELEMENT[gz.stem]]
}

type DayFortune = {
  overall: number
  money: number
  love: number
  health: number
  advice: string
  lucky: string
}

const ADVICE_POOL = [
  "오늘은 새로운 시도보다 기존 일에 집중하는 게 좋아.",
  "작은 결단이 큰 흐름을 바꿀 수 있어. 망설이지 마.",
  "관계에서 먼저 손 내밀면 뜻밖의 기쁨이 생겨.",
  "재물 관련 결정은 오늘 피하는 게 나아. 내일이 더 좋아.",
  "에너지가 넘치는 날. 오늘 시작한 것은 잘 마무리돼.",
  "조용히 있어도 좋아. 충전이 필요한 날이야.",
  "뜻하지 않은 만남에서 기회가 올 수 있어.",
  "오늘 한 약속은 꼭 지켜. 신뢰가 쌓이는 날.",
  "창의적인 생각이 폭발하는 날. 메모해 둬.",
  "몸 컨디션 체크. 오늘은 무리하지 않는 게 최선.",
]

const LUCKY_THINGS = [
  "행운색 빨강 · 방향 남쪽 · 숫자 9",
  "행운색 파랑 · 방향 북쪽 · 숫자 1",
  "행운색 초록 · 방향 동쪽 · 숫자 3",
  "행운색 흰색 · 방향 서쪽 · 숫자 7",
  "행운색 노랑 · 방향 중앙 · 숫자 5",
]

function getDayFortune(day: number): DayFortune {
  const s = day * 7 + 3
  return {
    overall: ((s * 1) % 3) + 3,
    money:   ((s * 2) % 4) + 2,
    love:    ((s * 3) % 4) + 2,
    health:  ((s * 4) % 3) + 3,
    advice:  ADVICE_POOL[s % ADVICE_POOL.length],
    lucky:   LUCKY_THINGS[s % LUCKY_THINGS.length],
  }
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-xs tracking-tight">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  )
}

export default function MonthCalendar() {
  const [selected, setSelected] = useState<number>(TODAY)
  const fortune = getDayFortune(selected)
  const DAYS = useMemo(() => buildMonthDays(YEAR, MONTH), [])
  const LUCKY_DAYS = useMemo(() => getSonEopsDays(YEAR, MONTH), [])

  return (
    <div className="flex flex-col gap-3">
      {/* 달력 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-charcoal">{YEAR}년 {MONTH}월</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full ring-1 ring-[#FBBF24]" style={{ background: "#FEF3C7" }} />
              <span className="text-[10px] text-text-muted">길일</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-pink/80" />
              <span className="text-[10px] text-text-muted">오늘</span>
            </div>
          </div>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-1">
          {["일", "월", "화", "수", "목", "금", "토"].map(d => (
            <div key={d} className="text-center text-[10px] text-text-muted font-medium py-1">{d}</div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-y-1">
          {DAYS.map((day, i) => {
            if (!day) return <div key={`e-${i}`} />
            const elem = getDayElem(day)
            const isToday = day === TODAY
            const isLucky = LUCKY_DAYS.includes(day)
            const isSel = day === selected

            return (
              <button
                key={day}
                onClick={() => setSelected(day)}
                className="flex flex-col items-center gap-0.5 py-1"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium transition-all ${
                    isSel && !isToday
                      ? "ring-2 ring-charcoal bg-charcoal/5 font-bold"
                      : isToday
                      ? "bg-pink/75 text-cream font-bold"
                      : isLucky
                      ? "ring-1 ring-[#FBBF24] bg-[#FEF9EC]"
                      : "text-charcoal"
                  }`}
                >
                  {day}
                </div>
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: isToday ? "#E84B6A" : ELEM_COLOR[elem] }}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* 선택 날짜 운세 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ background: `${ELEM_COLOR[getDayElem(selected)]}22` }}
        >
          <div>
            <p className="text-xs font-bold text-charcoal">
              {MONTH}/{selected} {selected === TODAY ? "(오늘)" : ""}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: ELEM_COLOR[getDayElem(selected)] }}>
              {getDayElem(selected)}(
              {getDayElem(selected) === "목" ? "木" : getDayElem(selected) === "화" ? "火" : getDayElem(selected) === "토" ? "土" : getDayElem(selected) === "금" ? "金" : "水"}
              )의 기운
            </p>
          </div>
          {LUCKY_DAYS.includes(selected) && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FBBF24]">
              길일 ✦
            </span>
          )}
        </div>

        <div className="px-4 py-3.5 space-y-2">
          {[
            { label: "전체운", val: fortune.overall },
            { label: "재물운", val: fortune.money },
            { label: "연애운", val: fortune.love },
            { label: "건강운", val: fortune.health },
          ].map(r => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="text-[11px] text-text-muted w-12 shrink-0">{r.label}</span>
              <Stars count={r.val} />
            </div>
          ))}
        </div>

        <div className="px-4 pb-3 space-y-1.5">
          <p className="text-[12px] text-charcoal leading-relaxed">"{fortune.advice}"</p>
          <p className="text-[11px] text-text-muted">{fortune.lucky}</p>
        </div>
      </div>
    </div>
  )
}
