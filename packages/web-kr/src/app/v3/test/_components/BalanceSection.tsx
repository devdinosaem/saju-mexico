"use client"
import { useEffect, useState } from "react"
import SectionCard from "./SectionCard"
import { BALANCE_MOCK_KEY } from "@/lib/balance"

const QUICK = [0, 0.1, 1, 5, 10, 50, 999]

function setBalanceStorage(val: number) {
  localStorage.setItem(BALANCE_MOCK_KEY, String(val))
  window.dispatchEvent(new Event("saju-balance-change"))
}

export default function BalanceSection() {
  const [balance, setBalance] = useState(5.2)
  const [input, setInput] = useState("5.2")

  useEffect(() => {
    const raw = localStorage.getItem(BALANCE_MOCK_KEY)
    const val = raw !== null ? parseFloat(raw) : 5.2
    setBalance(val)
    setInput(String(val))
    const handler = () => {
      const r = localStorage.getItem(BALANCE_MOCK_KEY)
      const v = r !== null ? parseFloat(r) : 5.2
      setBalance(v)
      setInput(String(v))
    }
    window.addEventListener("saju-balance-change", handler)
    return () => window.removeEventListener("saju-balance-change", handler)
  }, [])

  const apply = () => {
    const val = parseFloat(input)
    if (!isNaN(val) && val >= 0) {
      setBalanceStorage(val)
      setBalance(val)
    }
  }

  return (
    <SectionCard title="명태 잔액" emoji="🐟">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-[10px] text-text-muted">현재 잔액 (명태)</label>
          <input
            type="number"
            min={0}
            step={0.1}
            className="w-full mt-0.5 border-2 border-charcoal/20 rounded-xl px-3 py-2 text-[15px] font-black text-charcoal bg-white"
            value={input}
            onChange={e => setInput(e.target.value)}
            onBlur={apply}
          />
        </div>
        <button
          onClick={apply}
          className="mt-4 px-4 py-2.5 rounded-xl bg-charcoal text-cream text-[12px] font-bold active:opacity-70 whitespace-nowrap"
        >
          적용
        </button>
      </div>

      <div>
        <p className="text-[10px] text-text-muted mb-1.5">빠른 설정</p>
        <div className="flex flex-wrap gap-1.5">
          {QUICK.map(q => (
            <button
              key={q}
              onClick={() => {
                setBalanceStorage(q)
                setBalance(q)
                setInput(String(q))
              }}
              className={`px-3 py-1.5 rounded-full text-[12px] font-bold border-2 active:opacity-70 transition-opacity ${
                balance === q
                  ? "bg-charcoal text-cream border-charcoal"
                  : "bg-white text-charcoal border-charcoal/20"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-text-muted">
        ≈ 원화 {Math.round(balance * 980).toLocaleString()}원 상당
      </p>
    </SectionCard>
  )
}
