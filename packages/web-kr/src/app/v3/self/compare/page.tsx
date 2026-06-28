"use client"
// ════════════════════════════════════════════════════════════════
// 나 사용설명서 — v1 ↔ v2 비교 (디자인 시스템 적용 전/후).
// 같은 SelfData·aiText를 두 본문 컴포넌트에 흘려 토글로 비교. 페이월·연출 없음.
// ════════════════════════════════════════════════════════════════
import { useState } from "react"
import { useUser } from "@/lib/UserContext"
import { buildSelf, type SelfBirth, type Gender } from "@/lib/saju-play/self/self-adapter"
import { to24h } from "@/lib/saju-play/crush/saju-adapter"
import { SelfReport } from "@/lib/saju-play/self/report"
import { SelfReportV2 } from "@/lib/saju-play/self/report.v2"
import { FONT } from "@/lib/ds"

const FALLBACK_BIRTH: SelfBirth = { year: 1995, month: 3, day: 15, hour: 12, minute: 0 }

export default function SelfComparePage() {
  const { user } = useUser()
  const bd = user.birthDate
  const birth: SelfBirth = bd
    ? { year: +bd.year, month: +bd.month, day: +bd.day, hour: to24h(bd.hour, bd.ampm), minute: parseInt(bd.minute) || 0 }
    : FALLBACK_BIRTH
  const gender: Gender = bd?.gender === "F" ? "F" : "M"
  const self = buildSelf(birth, gender)
  const [v, setV] = useState<"v1" | "v2">("v2")

  if (!self) {
    return <div className="pt-24 text-center text-[15px] text-charcoal" style={FONT.title}>사주를 불러올 수 없어요. 생일을 등록해 주세요.</div>
  }

  const aiText =
    `너는 **${self.dayKr}(${self.dayElem})·${self.yinYang}** 일간, ${self.strongLevel}이야.\n\n` +
    `타고난 결은 **${self.topTalent.join("·")}** 쪽 — 여기에 네 무기가 있어. 나를 살리는 기운은 **${self.yong}**, 이걸 채울수록 잘 풀려.\n\n` +
    `${self.peak ? `인생 흐름으로 보면 **${self.peak.ageLabel}세 전후**가 가장 트이는 구간이야. ` : ``}지금은 ${self.curAge}세, 네 계절을 잘 타면 돼.`

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* 토글 */}
      <div className="sticky top-16 z-10 -mx-1 px-1 py-2" style={{ background: "var(--surface-page)" }}>
        <div className="ds-card-flat flex p-1 gap-1">
          {(["v1", "v2"] as const).map(k => (
            <button key={k} onClick={() => setV(k)}
              className="flex-1 py-2 rounded-[var(--r-md)] text-[14px] font-bold transition-colors"
              style={v === k
                ? { background: "var(--grad-pink-bold)", color: "#fff", boxShadow: "var(--shadow-sm)" }
                : { color: "var(--text-muted)" }}>
              {k === "v1" ? "v1 · 현재" : "v2 · 새 디자인"}
            </button>
          ))}
        </div>
        <p className="text-[12px] text-text-muted text-center mt-1.5" style={FONT.flavor}>
          {v === "v1" ? "현재 라이브 화면" : "디자인 시스템 적용 — 파스텔·소프트 섀도우·그라디언트 히어로·InfoBox 통합"}
        </p>
      </div>

      {v === "v1"
        ? <SelfReport data={self} aiText={aiText} />
        : <SelfReportV2 data={self} aiText={aiText} />}
    </div>
  )
}
