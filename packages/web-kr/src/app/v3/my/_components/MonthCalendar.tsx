"use client"
import { useState, useMemo } from "react"
import { getSonEopsDays, buildMonthDays } from "@/lib/lunar-utils"
import { getDayElem, getDayFortune, type ElemKr } from "@/lib/day-fortune"
import { useUser } from "@/lib/UserContext"
import { useSubscription } from "@/hooks/useSubscription"
import { isSubscribed } from "@/lib/subscription"
import Link from "next/link"

const now = new Date()
const YEAR = now.getFullYear()
const MONTH = now.getMonth() + 1
const TODAY = now.getDate()

const ELEM_COLOR: Record<ElemKr, string> = {
  목: "#4ADE80", 화: "#F87171", 토: "#FBBF24", 금: "#94A3B8", 수: "#60A5FA",
}

const ELEM_HANJA: Record<ElemKr, string> = {
  목: "木", 화: "火", 토: "土", 금: "金", 수: "水",
}

const elemOf = (day: number): ElemKr => getDayElem(YEAR, MONTH, day)

function Stars({ count }: { count: number }) {
  return (
    <span className="text-xs tracking-tight">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  )
}

export default function MonthCalendar() {
  const [selected, setSelected] = useState<number>(TODAY)
  const { ilju } = useUser()
  const iljuHanja = ilju?.hanja ?? "甲子"
  const sub = useSubscription()
  const premium = isSubscribed(sub)
  const fortune = getDayFortune(iljuHanja, YEAR, MONTH, selected)
  const DAYS = useMemo(() => buildMonthDays(YEAR, MONTH), [])
  const LUCKY_DAYS = useMemo(() => getSonEopsDays(YEAR, MONTH), [])
  // 프리미엄(구독): 이달 전체 일운 점수 → 길일(≥4)·주의일(≤2) 마킹·요약
  const monthScores = useMemo(() => {
    const m: Record<number, number> = {}
    for (const d of DAYS) if (d) m[d] = getDayFortune(iljuHanja, YEAR, MONTH, d).overall
    return m
  }, [iljuHanja, DAYS])
  const goodDays = useMemo(() => Object.keys(monthScores).map(Number).filter(d => monthScores[d] >= 4), [monthScores])
  const cautionDays = useMemo(() => Object.keys(monthScores).map(Number).filter(d => monthScores[d] <= 2), [monthScores])

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
            const elem = elemOf(day)
            const isToday = day === TODAY
            const isLucky = LUCKY_DAYS.includes(day)
            const isSel = day === selected
            const isGood = premium && monthScores[day] >= 4      // 길일(구독)
            const isCaution = premium && monthScores[day] <= 2   // 주의일(구독)

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
                      : (isGood || isLucky)
                      ? "ring-1 ring-[#FBBF24] bg-[#FEF9EC]"
                      : isCaution
                      ? "ring-1 ring-rose-300 bg-rose-50/60"
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

      {/* 프리미엄 캘린더: 이달의 길일·주의일 요약(구독) / 비구독 티저 */}
      {premium ? (
        <div className="rounded-2xl bg-[#FFFBF0] border border-[#FBBF24]/50 px-4 py-3 flex flex-col gap-1.5">
          <p className="text-[11px] font-bold text-[#92400E]">이달의 길일·주의일 ✦ 구독</p>
          <p className="text-[12px] text-charcoal">
            <span className="font-bold">길일</span> {goodDays.length ? goodDays.join(", ") + "일" : "특별한 날 없음"}
          </p>
          <p className="text-[12px] text-charcoal">
            <span className="font-bold">주의일</span> {cautionDays.length ? cautionDays.join(", ") + "일" : "특별한 날 없음"}
          </p>
        </div>
      ) : (
        <Link href="/v3/subscription" className="rounded-2xl bg-charcoal text-cream px-4 py-3 flex items-center justify-between gap-3 active:opacity-80">
          <div>
            <p className="text-[12px] font-bold">🔒 이달의 길일·택일 한눈에</p>
            <p className="text-[11px] text-cream/60 mt-0.5 leading-snug">구독하면 좋은 날·주의할 날이 캘린더에 표시돼요</p>
          </div>
          <span className="text-[11px] font-bold bg-pink px-2.5 py-1 rounded-full shrink-0">구독</span>
        </Link>
      )}

      {/* 선택 날짜 운세 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ background: `${ELEM_COLOR[fortune.element]}22` }}
        >
          <div>
            <p className="text-xs font-bold text-charcoal">
              {MONTH}/{selected} {selected === TODAY ? "(오늘)" : ""} · {fortune.ganji}일
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: ELEM_COLOR[fortune.element] }}>
              {fortune.element}({ELEM_HANJA[fortune.element]})의 기운
            </p>
          </div>
          {LUCKY_DAYS.includes(selected) && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FBBF24]">
              손없는 날 ✦
            </span>
          )}
        </div>

        {/* 메인 문구 */}
        <div className="px-4 pt-3.5 pb-3">
          <p className="text-[15px] font-bold text-charcoal leading-snug">{fortune.main}</p>
          <div className="flex items-start gap-1.5 mt-2">
            <span className="text-sm leading-none mt-px">💬</span>
            <p className="text-[12px] text-text-sub leading-relaxed flex-1">{fortune.subtext}</p>
          </div>
        </div>

        {/* 별점 */}
        <div className="px-4 py-3 space-y-2 border-t border-charcoal/5">
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

        {/* 사주 근거 */}
        <div className="px-4 py-2.5 border-t border-charcoal/5 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-charcoal/5 text-text-sub font-medium">{fortune.tenGodKr}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-charcoal/5 text-text-sub font-medium">{fortune.phaseKr}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-charcoal/5 text-text-sub font-medium">{fortune.spiritKr}</span>
        </div>
      </div>
    </div>
  )
}
