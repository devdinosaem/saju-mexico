import { DoodleSparkle } from "@/components/doodles"

const FORTUNES = [
  { label: "전체운", stars: 4, sub: "기운이 넘쳐. 실행해!" },
  { label: "재물운", stars: 3, sub: "지출 전 한 번 더 검토" },
  { label: "연애운", stars: 5, sub: "적극적으로 나서기 좋은 날" },
  { label: "건강운", stars: 4, sub: "가벼운 운동이 도움돼" },
  { label: "사업운", stars: 3, sub: "준비한 걸 내보일 때" },
]

const LUCKY = [
  { label: "행운색", value: "골드 · 흰색" },
  { label: "행운 방향", value: "서쪽 💎" },
  { label: "행운 숫자", value: "7 · 9" },
  { label: "피할 것", value: "큰 지출 · 성급한 결정" },
]

function Stars({ count }: { count: number }) {
  return (
    <span className="tracking-tight text-[13px]">
      <span className="text-[#FBBF24]">{"★".repeat(count)}</span>
      <span className="text-charcoal/20">{"☆".repeat(5 - count)}</span>
    </span>
  )
}

export default function TodaySaju() {
  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-[#F1F5F9] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DoodleSparkle style={{ width: 22, height: 22 }} />
          <div>
            <p className="text-xs font-bold text-charcoal">오늘의 사주 · 6/24 (수)</p>
            <p className="text-[11px] text-[#334155]">경진(庚辰)일주 · 금(金)의 기운</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-text-muted">전체운</p>
          <Stars count={4} />
        </div>
      </div>

      {/* 운세 5항목 */}
      <div className="px-4 pt-3.5 pb-2 space-y-2.5">
        {FORTUNES.map(f => (
          <div key={f.label} className="flex items-center gap-3">
            <span className="text-[11px] text-text-muted w-12 shrink-0">{f.label}</span>
            <Stars count={f.stars} />
            <span className="text-[11px] text-text-muted ml-auto shrink-0">{f.sub}</span>
          </div>
        ))}
      </div>

      {/* 한줄 어드바이스 */}
      <div className="mx-4 my-2.5 rounded-xl bg-[#F8F9FA] px-3 py-2.5">
        <p className="text-[12px] text-charcoal leading-relaxed">
          💡 <span className="font-bold">금(金)의 날</span> — 결단이 빠를수록 유리해. 오래 고민하면 기회가 지나가.
        </p>
      </div>

      {/* 행운 정보 */}
      <div className="px-4 pb-3 grid grid-cols-2 gap-2">
        {LUCKY.map(l => (
          <div key={l.label} className="flex flex-col gap-0.5">
            <span className="text-[10px] text-text-muted">{l.label}</span>
            <span className="text-[12px] font-bold text-charcoal">{l.value}</span>
          </div>
        ))}
      </div>

      {/* 상세 보기 구독 게이트 */}
      <div className="mx-4 mb-4 rounded-xl overflow-hidden relative">
        <div className="px-3 py-2.5 space-y-1 opacity-30 pointer-events-none select-none">
          <p className="text-[11px] text-charcoal font-bold">시간대별 에너지 흐름</p>
          <div className="flex gap-1 items-end h-8">
            {[40, 60, 85, 70, 55, 90, 65, 45].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-[#94A3B8]" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="text-[11px] text-charcoal font-bold mt-1">이달 사주 총평</p>
          <p className="text-[11px] text-text-muted">경진일주는 6월 금기운이 강화되어...</p>
        </div>
        <div className="absolute inset-0 backdrop-blur-[3px] bg-white/60 flex flex-col items-center justify-center gap-1.5">
          <span className="text-xl">🔒</span>
          <p className="text-xs font-bold text-charcoal">상세 리포트는 구독자 전용</p>
          <button className="px-4 py-1.5 rounded-full bg-pink/75 text-cream text-[11px] font-bold border border-charcoal active:opacity-80">
            구독하기 · ₩2,900/월
          </button>
        </div>
      </div>
    </div>
  )
}
