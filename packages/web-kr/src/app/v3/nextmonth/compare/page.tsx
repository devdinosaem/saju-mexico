"use client"
// ════════════════════════════════════════════════════════════════
// 다음달 운 — v1 ↔ v2 비교 (디자인 시스템 적용 전/후). 페이월·연출 없음.
// ════════════════════════════════════════════════════════════════
import { useState } from "react"
import { useUser } from "@/lib/UserContext"
import { buildNextMonth, type NextMonthBirth, type Gender } from "@/lib/saju-play/nextmonth/nextmonth-adapter"
import { to24h } from "@/lib/saju-play/crush/saju-adapter"
import { NextMonthReport, nextMonthFallback } from "@/lib/saju-play/nextmonth/report"
import { NextMonthReportV2 } from "@/lib/saju-play/nextmonth/report.v2"
import { FONT } from "@/lib/ds"

const FALLBACK_BIRTH: NextMonthBirth = { year: 1995, month: 3, day: 15, hour: 12, minute: 0 }

export default function NextMonthComparePage() {
  const { user } = useUser()
  const bd = user.birthDate
  const birth: NextMonthBirth = bd
    ? { year: +bd.year, month: +bd.month, day: +bd.day, hour: to24h(bd.hour, bd.ampm), minute: parseInt(bd.minute) || 0 }
    : FALLBACK_BIRTH
  const gender: Gender = bd?.gender === "F" ? "F" : "M"
  const data = buildNextMonth(birth, gender)
  const [v, setV] = useState<"v1" | "v2">("v2")

  if (!data) {
    return <div className="pt-24 text-center text-[15px] text-charcoal" style={FONT.title}>사주를 불러올 수 없어요. 생일을 등록해 주세요.</div>
  }
  const aiText = nextMonthFallback(data)

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div className="pt-1">
        <div className="ds-card-flat flex p-1 gap-1">
          {(["v1", "v2"] as const).map(k => (
            <button key={k} onClick={() => setV(k)}
              className="flex-1 py-2 rounded-[var(--r-md)] text-[14px] font-bold transition-colors"
              style={v === k ? { background: "var(--grad-pink-bold)", color: "#fff" } : { color: "var(--text-muted)" }}>
              {k === "v1" ? "v1 · 현재" : "v2 · 새 디자인"}
            </button>
          ))}
        </div>
        <p className="text-[12px] text-text-muted text-center mt-1.5" style={FONT.flavor}>
          {v === "v1" ? "현재 라이브 화면" : "디자인 시스템 적용 — 흰 카드·소프트·핑크 Hero(검은선)·InfoBox·박다현/Pretendard"}
        </p>
      </div>

      {v === "v1"
        ? <NextMonthReport data={data} aiText={aiText} />
        : <NextMonthReportV2 data={data} aiText={aiText} />}
    </div>
  )
}
