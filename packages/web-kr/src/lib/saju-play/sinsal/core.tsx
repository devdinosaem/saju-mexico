"use client"
// ════════════════════════════════════════════════════════════════
// "내 신살 도감" 펀널 — 1인·입력 0. 표지 → 페이월 → SinsalReport(본문 순수).
// 리포트 완성 순간 보관함에 자동 저장(스냅샷 = SinsalData + AI원문).
// AI는 /api/saju-play/sinsal 호출, 없으면 폴백 줄글.
// ════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/lib/UserContext"
import { PRICES, priceLabel } from "@/lib/prices"
import { spend } from "@/lib/balance"
import { buildSinsal, type SinsalBirth, type Gender } from "./sinsal-adapter"
import { to24h } from "../crush/saju-adapter"
import { saveReport, makeBirthKey, findByDedupe } from "@/lib/report-archive"
import BirthGate from "../BirthGate"
import { SinsalReport, coverInfo, sinsalFallback, Ico, Avatar, BINGGRAE, GAEGU, PINK } from "./report"
import { DoodleBook, DoodleKey, DoodleHeart } from "@/components/doodles"

type Ai = { status: "idle" | "loading" | "done" | "error"; text: string }
const PRICE = priceLabel(PRICES.sinsal)

export default function SinsalFunnel() {
  const { user } = useUser()
  const bd = user.birthDate
  const router = useRouter()
  const birth: SinsalBirth | null = bd
    ? { year: +bd.year, month: +bd.month, day: +bd.day, hour: to24h(bd.hour, bd.ampm), minute: parseInt(bd.minute) || 0 }
    : null
  const gender: Gender = bd?.gender === "F" ? "F" : "M"
  const data = birth ? buildSinsal(birth, gender) : null

  // 재열람 판정 — 같은 생일 리포트가 보관함에 있으면 페이월·AI 스킵
  const existing = birth ? findByDedupe(`sinsal|${makeBirthKey(birth)}`) : null

  const [step, setStep] = useState<"loading" | "result">(existing ? "result" : "loading")
  const [unlocked, setUnlocked] = useState(!!existing)
  const [ai, setAi] = useState<Ai>(existing ? { status: "done", text: existing.snapshot.aiText } : { status: "idle", text: "" })
  const savedRef = useRef(!!existing)

  useEffect(() => {
    if (!data || existing) return // 재열람이면 AI 호출 안 함(스냅샷 사용)
    setAi({ status: "loading", text: "" })
    fetch("/api/saju-play/sinsal", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: bd?.name || "너", sinsalBlock: data.sinsalBlock }),
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { text?: string }) => d.text ? setAi({ status: "done", text: d.text }) : Promise.reject())
      .catch(() => setAi({ status: "error", text: "" }))
    const t = setTimeout(() => setStep("result"), 1600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 리포트 완성 순간 보관함에 1회 저장
  useEffect(() => {
    if (savedRef.current || !data || !unlocked) return
    if (ai.status !== "done" && ai.status !== "error") return
    savedRef.current = true
    const aiText = ai.status === "done" ? ai.text : sinsalFallback(data)
    saveReport({
      type: "sinsal",
      subjects: [{ who: "me", name: bd?.name || "나", birthKey: makeBirthKey(birth!), iljuKey: data.iljuKey }],
      title: "내 신살 도감",
      highlight: `시그니처 · ${coverInfo(data).sigInfo.alias}`,
      snapshot: { v: 1, data, aiText },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked, ai.status])

  if (!bd) return <BirthGate title="생일을 알려주면 내 신살 도감을 펼쳐줄게" />
  if (!data) {
    return <div className="pt-24 text-center text-[15px] text-charcoal" style={BINGGRAE}>사주를 불러올 수 없어요. 생일을 등록해 주세요.</div>
  }

  const { charKey, sigInfo, sigCs, teaser } = coverInfo(data)
  const aiText = ai.status === "done" ? ai.text : sinsalFallback(data)
  const aiLoading = ai.status === "loading"
  const onUnlock = () => {
    if (!spend(PRICES.sinsal, "내 신살 도감")) { router.push("/v3/charge"); return }
    setUnlocked(true)
  }

  if (step === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-24 text-center">
        <span className="animate-pulse"><Ico as={DoodleBook} size={60} /></span>
        <p className="text-[18px] text-charcoal" style={BINGGRAE}>네 신살을 펼쳐보는 중…</p>
        <p className="text-[14px] text-text-muted" style={GAEGU}>무서운 이름, 사실은 다 특별한 거야</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6">
      {/* [무료] 표지 */}
      <div className="flex flex-col items-center gap-2.5 text-center pt-2">
        <span className="text-[13px] text-text-muted tracking-wider">신 살 도 감</span>
        <div className="p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
          <Avatar iljuKey={charKey} size={88} />
        </div>
        <p className="text-[24px] text-charcoal" style={BINGGRAE}>내 신살 도감</p>
        <div className="px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: sigCs.bg, border: `1.5px dashed ${sigCs.ink}` }}>
          <Ico as={sigInfo.D} size={15} /> <p className="text-[14px]" style={{ ...BINGGRAE, color: sigCs.ink }}>대표 · {sigInfo.alias}</p>
        </div>
        <p className="text-[14px] text-charcoal/70 leading-relaxed" style={GAEGU}>{teaser}</p>
      </div>

      {/* [유료] 페이월 게이트 */}
      {unlocked ? <SinsalReport data={data} aiText={aiText} aiLoading={aiLoading} /> : (
        <div className="flex flex-col">
          <div className="relative overflow-hidden" style={{ maxHeight: 150 }}>
            <div className="blur-[5px] pointer-events-none select-none"><SinsalReport data={data} aiText={aiText} aiLoading={aiLoading} /></div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,254,242,0.15), var(--bg-cream,#FFFEF2) 88%)" }} />
          </div>
          <div className="-mt-7 rounded-2xl bg-white border-2 border-charcoal px-5 py-5 flex flex-col items-center gap-2.5 text-center" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
            <Ico as={DoodleKey} size={36} />
            <p className="text-[16px] text-charcoal" style={BINGGRAE}>내 신살 도감 전체 펼치기</p>
            <div className="flex flex-col gap-1.5 w-full py-1">
              {["보유 신살 전체 풀이 — 무서운 이름의 진짜 뜻", "신살 능력치 · 자리별 의미 · 시너지", "살릴 건 살리고 · 올해의 신살"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-charcoal/70"><Ico as={DoodleHeart} size={13} /> {t}</div>
              ))}
            </div>
            <button onClick={onUnlock} className="w-full h-[52px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal mt-0.5" style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
              {PRICE} 내고 전체 보기
            </button>
            <p className="text-[13px] text-text-muted">내 생일 그대로, 언제든 다시 볼 수 있어요</p>
          </div>
        </div>
      )}
    </div>
  )
}
