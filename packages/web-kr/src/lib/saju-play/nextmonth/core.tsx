"use client"
// ════════════════════════════════════════════════════════════════
// "다음달 운 미리보기" 펀널 — 1인·입력 0. 예고편 → 페이월 → NextMonthReport.
// dedupeKey에 대상월 포함 → 매달 별도 기록. 결제·AI·보관함은 usePaidReport.
// AI는 /api/saju-play/nextmonth.
// ════════════════════════════════════════════════════════════════
import { useUser } from "@/lib/UserContext"
import { PRICES, priceLabel } from "@/lib/prices"
import { buildNextMonth, type NextMonthBirth, type Gender, type NextMonthData } from "./nextmonth-adapter"
import { to24h } from "../crush/saju-adapter"
import { makeBirthKey } from "@/lib/report-archive"
import BirthGate from "../BirthGate"
import { usePaidReport } from "../use-paid-report"
import { NextMonthReport, coverInfo, nextMonthFallback, Ico, Avatar, BINGGRAE, GAEGU, PINK } from "./report"
import { DoodleCalendar, DoodleKey, DoodleHeart, DoodleLetter } from "@/components/doodles"

const PRICE = priceLabel(PRICES.nextMonth)

export default function NextMonthFunnel() {
  const { user } = useUser()
  const bd = user.birthDate
  const birth: NextMonthBirth | null = bd
    ? { year: +bd.year, month: +bd.month, day: +bd.day, hour: to24h(bd.hour, bd.ampm), minute: parseInt(bd.minute) || 0 }
    : null
  const gender: Gender = bd?.gender === "F" ? "F" : "M"
  const data = birth ? buildNextMonth(birth, gender) : null

  // 대상월별 별도 기록 → dedupeKey에 월 포함
  const dedupeKey = (birth && data) ? `nextmonth|${makeBirthKey(birth)}|${data.ym.year}-${data.ym.month}` : null

  const { step, unlocked, aiText, aiLoading, onUnlock } = usePaidReport<NextMonthData>({
    data,
    dedupeKey,
    price: PRICES.nextMonth,
    spendLabel: "다음달 운 미리보기",
    fetchAiText: (d) =>
      fetch("/api/saju-play/nextmonth", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: bd?.name || "너", monthBlock: d.monthBlock }),
      })
        .then(r => (r.ok ? r.json() : null))
        .then((j: { text?: string } | null) => j?.text ?? null),
    fallbackText: nextMonthFallback,
    buildSave: (d, ai) => {
      const birthKey = makeBirthKey(birth!)
      return {
        type: "nextmonth",
        dedupeKey: `nextmonth|${birthKey}|${d.ym.year}-${d.ym.month}`,
        subjects: [{ who: "me", name: bd?.name || "나", birthKey, iljuKey: d.iljuKey }],
        title: `${d.monthLabel} 운 미리보기`,
        highlight: `${coverInfo(d).weather.label} · ${d.keywords[0] ? `#${d.keywords[0]}` : "잔잔"}`,
        snapshot: { v: 1, data: d, aiText: ai },
      }
    },
  })

  if (!bd) return <BirthGate title="생일을 알려주면 다음달 운을 펼쳐줄게" />
  if (!data) {
    return <div className="pt-24 text-center text-[15px] text-charcoal" style={BINGGRAE}>사주를 불러올 수 없어요. 생일을 등록해 주세요.</div>
  }

  const { charKey, weather, letter } = coverInfo(data)

  if (step === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-24 text-center">
        <span className="animate-pulse"><Ico as={DoodleCalendar} size={60} /></span>
        <p className="text-[18px] text-charcoal" style={BINGGRAE}>다음달을 미리 펼쳐보는 중…</p>
        <p className="text-[14px] text-text-muted" style={GAEGU}>{data.monthLabel}의 바람을 읽는 중</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6">
      {/* [무료] 예고편 표지 */}
      <div className="flex flex-col items-center gap-2.5 text-center pt-2">
        <span className="text-[13px] text-text-muted tracking-wider">다 음 달 예 고 편</span>
        <div className="p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
          <Avatar iljuKey={charKey} size={88} />
        </div>
        <p className="text-[24px] text-charcoal" style={BINGGRAE}>다음달 운 미리보기</p>
        <div className="px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#FFF4E0", border: "1.5px dashed #F0C060" }}>
          <Ico as={weather.D} size={15} /> <p className="text-[14px] text-[#9A7050]" style={BINGGRAE}>{data.monthLabel} · {weather.label}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {data.keywords.map(k => (
            <span key={k} className="px-2.5 py-1 rounded-full text-[13px] font-bold" style={{ background: "#FFF0F5", color: PINK }}>#{k}</span>
          ))}
        </div>
        <div className="w-full rounded-2xl px-4 py-3.5 flex items-start gap-2.5 mt-1" style={{ background: "#FFFDF5", border: "1.5px solid #F0C060" }}>
          <Ico as={DoodleLetter} size={20} />
          <p className="text-[14px] text-charcoal/80 leading-snug text-left" style={GAEGU}>{letter}</p>
        </div>
      </div>

      {/* [유료] 페이월 게이트 */}
      {unlocked ? <NextMonthReport data={data} aiText={aiText} aiLoading={aiLoading} /> : (
        <div className="flex flex-col">
          <div className="relative overflow-hidden" style={{ maxHeight: 150 }}>
            <div className="blur-[5px] pointer-events-none select-none"><NextMonthReport data={data} aiText={aiText} aiLoading={aiLoading} /></div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,254,242,0.15), var(--bg-cream,#FFFEF2) 88%)" }} />
          </div>
          <div className="-mt-7 rounded-2xl bg-white border-2 border-charcoal px-5 py-5 flex flex-col items-center gap-2.5 text-center" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
            <Ico as={DoodleKey} size={36} />
            <p className="text-[16px] text-charcoal" style={BINGGRAE}>다음달 전체 예보 펼치기</p>
            <div className="flex flex-col gap-1.5 w-full py-1">
              {["AI 정밀 예보 — 다음달 흐름 풀이", "영역별(애정·일·돈·건강·관계) 게이지", "일진 캘린더 — 길일·주의일까지"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-charcoal/70"><Ico as={DoodleHeart} size={13} /> {t}</div>
              ))}
            </div>
            <button onClick={onUnlock} className="w-full h-[52px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal mt-0.5" style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
              {PRICE} 내고 전체 보기
            </button>
            <p className="text-[13px] text-text-muted">매달 새로 갱신돼요 — 다음달도 보러 와</p>
          </div>
        </div>
      )}
    </div>
  )
}
