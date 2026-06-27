"use client"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { calcIlju } from "@/lib/ilju-calc"
import { ILJU_TYPES } from "@/lib/ilju-types"
import { saveMockIlju, type MockBirthDate } from "@/lib/mockAuth"
import CTAButton from "@/components/cta-button"
import SajuCard from "@/components/saju-card"

const BINGGRAE: React.CSSProperties = {
  fontFamily: "'BinggraeTaom', sans-serif",
  fontWeight: 700,
}

type Props = {
  open: boolean
  birthDate: MockBirthDate
  onClose: () => void
  onRetry: () => void
}

export default function SajuRevealOverlay({ open, birthDate, onClose, onRetry }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const ilju = calcIlju(birthDate.year, birthDate.month, birthDate.day, birthDate.gender)
  useEffect(() => {
    if (open) saveMockIlju(ilju.id)
  }, [open, ilju.id])

  if (!open || !mounted) return null

  const bestMatchIlju = ILJU_TYPES.find(t => t.id === ilju.bestMatch)

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: `${birthDate.name}님의 ${ilju.ilju}일주`, url: window.location.href })
        .catch(() => {})
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[200] bg-cream flex flex-col">
      <div className="w-full max-w-[480px] mx-auto flex flex-col h-full">

        {/* 닫기 */}
        <div className="flex justify-end px-4 pt-3 pb-1 shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-charcoal/8 flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="text-[16px] text-charcoal/50 leading-none">✕</span>
          </button>
        </div>

        {/* 카드 + 설명 그룹 */}
        <div className="flex-1 flex flex-col justify-center min-h-0 px-5">

          <SajuCard
            ilju={ilju}
            name={birthDate.name}
            style={{ height: "min(560px, calc(100dvh - 240px))" }}
          />

          {/* 카드 하단 설명 */}
          <div className="pt-4 pb-1 shrink-0">
            <div className="rounded-xl border border-charcoal/10 bg-white/50 px-4 py-3 space-y-2">
              <p className="text-[11px] text-charcoal/65 leading-relaxed" style={BINGGRAE}>
                &ldquo;{ilju.description}&rdquo;
              </p>
              {bestMatchIlju && (
                <div className="flex items-center gap-1.5 pt-2 border-t border-charcoal/8">
                  <span className="text-[13px]">💫</span>
                  <p className="text-[11px] text-charcoal/50" style={BINGGRAE}>가장 잘 맞는 일주</p>
                  <p className="text-[11px] text-charcoal ml-auto" style={BINGGRAE}>
                    {bestMatchIlju.ilju}일주 · {bestMatchIlju.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 공유 버튼 */}
        <div className="px-5 pb-8 pt-3 shrink-0">
          <CTAButton onClick={handleShare}>공유하기</CTAButton>
        </div>

      </div>
    </div>,
    document.body
  )
}
