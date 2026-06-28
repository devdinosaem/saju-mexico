"use client"
// ════════════════════════════════════════════════════════════════
// "나 사용설명서" 펀널 — 1인·입력 0. 계정 생일로 즉시.
// 연출 → 무료 표지 → 페이월 → SelfReport(본문 순수 컴포넌트).
// 리포트 완성 순간 보관함에 자동 저장(스냅샷 = SelfData + AI원문).
// AI는 /api/saju-play/self 호출, 없으면 폴백 줄글.
// ════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from "react"
import { useUser } from "@/lib/UserContext"
import { PRICES, priceLabel } from "@/lib/prices"
import { buildSelf, type SelfBirth, type Gender, type SelfData } from "./self-adapter"
import { to24h } from "../crush/saju-adapter"
import { saveReport, makeBirthKey } from "@/lib/report-archive"
import { SelfReport, coverInfo, Ico, Avatar, BINGGRAE, GAEGU, PINK } from "./report"
import { DoodleBook, DoodleKey, DoodleHeart } from "@/components/doodles"

type Ai = { status: "idle" | "loading" | "done" | "error"; text: string }
const FALLBACK_BIRTH: SelfBirth = { year: 1995, month: 3, day: 15, hour: 12, minute: 0 }
const PRICE = priceLabel(PRICES.selfManual)

// 폴백 줄글 (AI 미응답 시) — 표시·저장 공용
function buildFallback(s: SelfData): string {
  return (
    `너는 **${s.dayKr}(${s.dayElem})·${s.yinYang}** 일간, ${s.strongLevel}이야.\n\n` +
    `타고난 결은 **${s.topTalent.join("·")}** 쪽 — 여기에 네 무기가 있어. 나를 살리는 기운은 **${s.yong}**, 이걸 채울수록 잘 풀려.\n\n` +
    `${s.peak ? `인생 흐름으로 보면 **${s.peak.ageLabel}세 전후**가 가장 트이는 구간이야. ` : ``}지금은 ${s.curAge}세, 네 계절을 잘 타면 돼.`
  )
}

export default function SelfFunnel() {
  const { user } = useUser()
  const bd = user.birthDate
  const birth: SelfBirth = bd
    ? { year: +bd.year, month: +bd.month, day: +bd.day, hour: to24h(bd.hour, bd.ampm), minute: parseInt(bd.minute) || 0 }
    : FALLBACK_BIRTH
  const gender: Gender = bd?.gender === "F" ? "F" : "M"
  const self = buildSelf(birth, gender)

  const [step, setStep] = useState<"loading" | "result">("loading")
  const [unlocked, setUnlocked] = useState(false)
  const [ai, setAi] = useState<Ai>({ status: "idle", text: "" })
  const savedRef = useRef(false)

  useEffect(() => {
    if (!self) return
    setAi({ status: "loading", text: "" })
    fetch("/api/saju-play/self", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selfBlock: self.selfBlock, day: self.dayKr, elem: self.dayElem, strong: self.strongLevel }),
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { text?: string }) => d.text ? setAi({ status: "done", text: d.text }) : Promise.reject())
      .catch(() => setAi({ status: "error", text: "" }))
    const t = setTimeout(() => setStep("result"), 1600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 리포트 완성(잠금 해제 + AI 확정) 순간 보관함에 1회 저장
  useEffect(() => {
    if (savedRef.current || !self || !unlocked) return
    if (ai.status !== "done" && ai.status !== "error") return
    savedRef.current = true
    const aiText = ai.status === "done" ? ai.text : buildFallback(self)
    saveReport({
      type: "self",
      subjects: [{ who: "me", name: bd?.name || "나", birthKey: makeBirthKey(birth), iljuKey: self.iljuKey }],
      title: "나 사용설명서",
      highlight: `${self.dayKr}(${self.dayElem})·${self.yinYang} · ${self.strongLevel}`,
      snapshot: { v: 1, data: self, aiText },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked, ai.status])

  if (!self) {
    return <div className="pt-24 text-center text-[15px] text-charcoal" style={BINGGRAE}>사주를 불러올 수 없어요. 생일을 등록해 주세요.</div>
  }

  const { charKey, iljuName, teaser } = coverInfo(self)
  const aiText = ai.status === "done" ? ai.text : buildFallback(self)
  const aiLoading = ai.status === "loading"

  if (step === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-24 text-center">
        <span className="animate-pulse"><Ico as={DoodleBook} size={60} /></span>
        <p className="text-[18px] text-charcoal" style={BINGGRAE}>네 사주를 펼쳐보는 중…</p>
        <p className="text-[14px] text-text-muted" style={GAEGU}>제품명: 나</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6">
      {/* [무료] 표지 */}
      <div className="flex flex-col items-center gap-2.5 text-center pt-2">
        <span className="text-[13px] text-text-muted tracking-wider">사 용 설 명 서</span>
        <div className="p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
          <Avatar iljuKey={charKey} size={88} />
        </div>
        <p className="text-[24px] text-charcoal" style={BINGGRAE}>제품명 · 나</p>
        <div className="px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#FFF4E0", border: "1.5px dashed #F0C060" }}>
          <Ico as={DoodleHeart} size={15} /> <p className="text-[14px] text-[#9A7050]" style={BINGGRAE}>{iljuName}</p>
        </div>
        <p className="text-[14px] text-charcoal/70 leading-relaxed" style={GAEGU}>{teaser}</p>
      </div>

      {/* [유료] 페이월 게이트 */}
      {unlocked ? <SelfReport data={self} aiText={aiText} aiLoading={aiLoading} /> : (
        <div className="flex flex-col">
          <div className="relative overflow-hidden" style={{ maxHeight: 150 }}>
            <div className="blur-[5px] pointer-events-none select-none"><SelfReport data={self} aiText={aiText} aiLoading={aiLoading} /></div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,254,242,0.15), var(--bg-cream,#FFFEF2) 88%)" }} />
          </div>
          <div className="-mt-7 rounded-2xl bg-white border-2 border-charcoal px-5 py-5 flex flex-col items-center gap-2.5 text-center" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
            <Ico as={DoodleKey} size={36} />
            <p className="text-[16px] text-charcoal" style={BINGGRAE}>나 사용설명서 전체 펼치기</p>
            <div className="flex flex-col gap-1.5 w-full py-1">
              {["원국 전체를 읽은 정밀 풀이", "재능·연애·일·돈 · 인생 그래프", "나 다루는 법 · 올해의 나"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-charcoal/70"><Ico as={DoodleHeart} size={13} /> {t}</div>
              ))}
            </div>
            <button onClick={() => setUnlocked(true)} className="w-full h-[52px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal mt-0.5" style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
              {PRICE} 내고 전체 보기
            </button>
            <p className="text-[13px] text-text-muted">내 생일 그대로, 언제든 다시 볼 수 있어요</p>
          </div>
        </div>
      )}
    </div>
  )
}
