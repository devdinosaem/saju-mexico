"use client"
import { useState } from "react"
import { DoodleMyeongtae } from "@/components/doodle-myeongtae"
import { DoodleCalendar, DoodleSparkle } from "@/components/doodles"
import { wonLabel } from "@/lib/prices"
import { useMyongtae, type MyongtaeTxn } from "@/lib/myongtae"

/* 디자인 계약(saju-play) 준수: 두들 Ico, 14px floor, 메인 핑크, 이모지 금지 */
const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
const PINK = "#E84B6A"

type DoodleC = React.FC<{ className?: string }>
function Ico({ as: D, size = 18 }: { as: DoodleC; size?: number }) {
  return (
    <span className="inline-flex items-center justify-center shrink-0 align-middle" style={{ width: size, height: size }}>
      <D className="w-full h-full" />
    </span>
  )
}

function fmtDate(ts: number): string {
  const d = new Date(ts)
  return `${d.getMonth() + 1}.${d.getDate()}`
}

function TxnRow({ t }: { t: MyongtaeTxn }) {
  const plus = t.delta >= 0
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <span className="text-[12px] text-text-muted w-9 shrink-0 tabular-nums">{fmtDate(t.ts)}</span>
      <span className="text-[14px] text-charcoal/80 flex-1 min-w-0 truncate">{t.label}</span>
      <span className="text-[14px] font-bold shrink-0 tabular-nums" style={{ color: plus ? "#10B981" : "#2D2D2D" }}>
        {plus ? "+" : "−"}{Math.abs(t.delta)}
      </span>
    </div>
  )
}

export default function MyongtaeCard() {
  const { balance, history } = useMyongtae()
  const [open, setOpen] = useState(false)
  const shown = open ? history : history.slice(0, 3)

  return (
    <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
      {/* 잔액 */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "#FFF4E0" }}>
          <Ico as={DoodleMyeongtae} size={30} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] text-text-muted" style={BINGGRAE}>내 명태</p>
          <p className="leading-none flex items-end gap-1">
            <span className="text-[30px] text-charcoal" style={BINGGRAE}>{balance}</span>
            <span className="text-[14px] text-charcoal/50 mb-0.5" style={BINGGRAE}>명태</span>
          </p>
          <p className="text-[12px] text-text-muted mt-0.5">≈ {wonLabel(balance)}</p>
        </div>
      </div>

      {/* 충전 */}
      <button
        className="w-full h-[48px] rounded-2xl flex items-center justify-center gap-1.5 active:opacity-85 transition-opacity border-2 border-charcoal text-[15px]"
        style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}
      >
        <Ico as={DoodleSparkle} size={18} /> 명태 충전하기
      </button>

      {/* 내역 */}
      <div className="border-t border-charcoal/8 pt-1">
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}>
            <Ico as={DoodleCalendar} size={16} /> 사용·적립 내역
          </p>
          {history.length > 3 && (
            <button onClick={() => setOpen(v => !v)} className="text-[12px] text-text-muted active:opacity-60" style={GAEGU}>
              {open ? "접기" : "전체 보기"}
            </button>
          )}
        </div>
        <div className="flex flex-col divide-y divide-charcoal/5">
          {shown.map(t => <TxnRow key={t.id} t={t} />)}
        </div>
      </div>
    </div>
  )
}
