"use client"
// ════════════════════════════════════════════════════════════════
// "내 신살 도감" 펀널 — 1인·입력 0. 표지 → 페이월 → SinsalReport(본문 순수).
// 결제·AI·보관함·재열람은 usePaidReport 공용 훅. AI는 /api/saju-play/sinsal.
// ════════════════════════════════════════════════════════════════
import { useUser } from "@/lib/UserContext"
import { PRICES, priceLabel } from "@/lib/prices"
import { buildSinsal, type SinsalBirth, type Gender, type SinsalData } from "./sinsal-adapter"
import { to24h } from "../crush/saju-adapter"
import { makeBirthKey } from "@/lib/report-archive"
import BirthGate from "../BirthGate"
import { usePaidReport } from "../use-paid-report"
import { SinsalReport, coverInfo, sinsalFallback, Ico, Avatar, BINGGRAE, GAEGU, PINK } from "./report"
import { DoodleBook, DoodleKey, DoodleHeart } from "@/components/doodles"

const PRICE = priceLabel(PRICES.sinsal)

export default function SinsalFunnel() {
  const { user } = useUser()
  const bd = user.birthDate
  const birth: SinsalBirth | null = bd
    ? { year: +bd.year, month: +bd.month, day: +bd.day, hour: to24h(bd.hour, bd.ampm), minute: parseInt(bd.minute) || 0 }
    : null
  const gender: Gender = bd?.gender === "F" ? "F" : "M"
  const data = birth ? buildSinsal(birth, gender) : null

  const { step, unlocked, aiText, aiLoading, onUnlock } = usePaidReport<SinsalData>({
    data,
    dedupeKey: birth ? `sinsal|${makeBirthKey(birth)}` : null,
    price: PRICES.sinsal,
    spendLabel: "내 신살 도감",
    fetchAiText: (d) =>
      fetch("/api/saju-play/sinsal", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: bd?.name || "너", sinsalBlock: d.sinsalBlock }),
      })
        .then(r => (r.ok ? r.json() : null))
        .then((j: { text?: string } | null) => j?.text ?? null),
    fallbackText: sinsalFallback,
    buildSave: (d, ai) => ({
      type: "sinsal",
      subjects: [{ who: "me", name: bd?.name || "나", birthKey: makeBirthKey(birth!), iljuKey: d.iljuKey }],
      title: "내 신살 도감",
      highlight: `시그니처 · ${coverInfo(d).sigInfo.alias}`,
      snapshot: { v: 1, data: d, aiText: ai },
    }),
  })

  if (!bd) return <BirthGate title="생일을 알려주면 내 신살 도감을 펼쳐줄게" />
  if (!data) {
    return <div className="pt-24 text-center text-[15px] text-charcoal" style={BINGGRAE}>사주를 불러올 수 없어요. 생일을 등록해 주세요.</div>
  }

  const { charKey, sigInfo, sigCs, teaser } = coverInfo(data)

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
