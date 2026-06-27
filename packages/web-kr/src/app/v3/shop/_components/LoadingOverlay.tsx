"use client"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const GAEGU: React.CSSProperties = {
  fontFamily: "'Cafe24Dongdong', var(--font-gaegu), cursive",
}

type Props = {
  open: boolean
  name: string
  onDone: () => void
  children?: React.ReactNode
}

export default function LoadingOverlay({ open, name, onDone, children }: Props) {
  const [mounted, setMounted] = useState(false)
  const [dots, setDots] = useState(".")

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!open) { setDots("."); return }
    const dotTimer = setInterval(() => {
      setDots(d => d.length >= 3 ? "." : d + ".")
    }, 350)
    const doneTimer = setTimeout(onDone, 2400)
    return () => { clearInterval(dotTimer); clearTimeout(doneTimer) }
  }, [open])

  if (!open || !mounted) return null

  const maskStyle = "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)"

  return createPortal(
    <div className="fixed inset-0 z-[200] flex justify-center bg-cream">
      <div className="w-full max-w-[430px] flex flex-col items-center justify-center h-full gap-4">
        {/* 마퀴 영역 */}
        <div
          className="w-full overflow-hidden"
          style={{ WebkitMaskImage: maskStyle, maskImage: maskStyle }}
        >
          {children}
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <p className="text-charcoal text-[22px]" style={GAEGU}>나만의 사주카드</p>
          <p className="text-charcoal text-[22px]" style={GAEGU}>
            만드는 중{dots}
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}
