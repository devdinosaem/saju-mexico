"use client"
import { useState } from "react"

type Props = {
  title: string
  emoji: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function SectionCard({ title, emoji, children, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-2xl border-2 border-charcoal overflow-hidden bg-white">
      <button
        className="w-full flex items-center justify-between px-4 py-3 active:opacity-70 transition-opacity"
        onClick={() => setOpen(v => !v)}
      >
        <span className="flex items-center gap-2 text-[14px] font-black text-charcoal">
          <span>{emoji}</span>
          <span>{title}</span>
        </span>
        <span className="text-text-muted text-[12px]">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="border-t-2 border-charcoal/10 px-4 py-3 flex flex-col gap-3">
          {children}
        </div>
      )}
    </div>
  )
}
