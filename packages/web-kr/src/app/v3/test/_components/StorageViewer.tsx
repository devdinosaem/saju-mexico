"use client"
import { useState } from "react"
import SectionCard from "./SectionCard"
import { BALANCE_MOCK_KEY } from "@/app/v3/charge/page"
import { FRIENDS_KEY } from "@/lib/friends"

const KEYS = [
  { key: "saju-mock-user",        label: "인증 (saju-mock-user)" },
  { key: "saju-inventory-v1",     label: "인벤토리 (saju-inventory-v1)" },
  { key: "saju-wishlist-v1",      label: "위시리스트 (saju-wishlist-v1)" },
  { key: "saju-miniroom-v1",      label: "미니룸 (saju-miniroom-v1)" },
  { key: "saju-guestbook-경진",   label: "방명록 (saju-guestbook-경진)" },
  { key: BALANCE_MOCK_KEY,        label: "명태 잔액 (saju-balance-mock)" },
  { key: FRIENDS_KEY,             label: "친구 (saju-custom-friends)" },
]

function StorageEntry({ label, storageKey }: { label: string; storageKey: string }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const raw = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null
  const display = raw ? (() => {
    try { return JSON.stringify(JSON.parse(raw), null, 2) } catch { return raw }
  })() : "(없음)"

  const copy = () => {
    navigator.clipboard.writeText(display).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="rounded-xl border border-charcoal/10 overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-3 py-2 bg-white active:opacity-70"
        onClick={() => setOpen(v => !v)}
      >
        <span className="text-[11px] font-bold text-charcoal text-left">{label}</span>
        <span className="text-[10px] text-text-muted ml-2 shrink-0">
          {raw ? `${raw.length}B` : "null"} {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div className="border-t border-charcoal/10 bg-charcoal/5 px-3 py-2">
          <pre className="text-[10px] text-charcoal/80 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
            {display}
          </pre>
          <button
            onClick={copy}
            className="mt-2 text-[10px] text-text-muted border border-charcoal/20 rounded-full px-2.5 py-0.5 active:opacity-70"
          >
            {copied ? "복사됨!" : "복사"}
          </button>
        </div>
      )}
    </div>
  )
}

export default function StorageViewer() {
  const [key, setKey] = useState(0)

  const refresh = () => setKey(k => k + 1)

  const clearAll = () => {
    KEYS.forEach(k => localStorage.removeItem(k.key))
    localStorage.removeItem("saju-sample-friends-seeded")
    window.dispatchEvent(new Event("saju-auth-change"))
    window.dispatchEvent(new Event("saju-inventory-change"))
    window.dispatchEvent(new Event("saju-balance-change"))
    window.dispatchEvent(new Event("saju-custom-friends-change"))
    refresh()
  }

  return (
    <SectionCard title="localStorage 뷰어" emoji="🗄️" defaultOpen={false}>
      <div className="flex gap-2">
        <button
          onClick={refresh}
          className="flex-1 py-1.5 rounded-full text-[11px] font-bold border border-charcoal/20 text-charcoal active:opacity-70"
        >
          새로고침
        </button>
        <button
          onClick={clearAll}
          className="flex-1 py-1.5 rounded-full text-[11px] font-bold border border-red-200 text-red-400 active:opacity-70"
        >
          전체 초기화
        </button>
      </div>
      <div key={key} className="flex flex-col gap-1.5">
        {KEYS.map(({ key: k, label }) => (
          <StorageEntry key={k} label={label} storageKey={k} />
        ))}
      </div>
    </SectionCard>
  )
}
