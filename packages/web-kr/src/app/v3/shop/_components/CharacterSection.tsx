"use client"
import { useState } from "react"
import { SetlogCardA3, ElementBadgePill, YinyangBadge } from "@/components/ilju-type-card"
import { getIljuType } from "@/lib/ilju-types"
import { DoodleHeart } from "@/components/doodles"

function KyungJinChar({ size = 100 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 90" style={{ width: size }} fill="none">
      <path d="M20 34 Q18 12 40 10 Q62 12 60 34" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="2" />
      <line x1="40" y1="10" x2="40" y2="34" stroke="#64748B" strokeWidth="2" opacity="0.5" />
      <rect x="16" y="32" width="48" height="7" rx="2" fill="#64748B" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="40" cy="46" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="2" />
      <line x1="28" y1="39" x2="38" y2="43" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
      <line x1="52" y1="39" x2="42" y2="43" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
      <circle cx="34" cy="44" r="2.5" fill="#2D2D2D" />
      <circle cx="46" cy="44" r="2.5" fill="#2D2D2D" />
      <circle cx="33" cy="43" r="0.8" fill="white" />
      <circle cx="45" cy="43" r="0.8" fill="white" />
      <line x1="35" y1="51" x2="45" y2="51" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      <rect x="24" y="60" width="32" height="22" rx="4" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="2" />
      <line x1="40" y1="60" x2="40" y2="82" stroke="#64748B" strokeWidth="1.5" />
      <path d="M32 66 Q40 72 48 66" stroke="#64748B" strokeWidth="1.2" fill="none" />
      <path d="M16 60 Q14 66 18 70 L24 68 L24 60 Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M64 60 Q66 66 62 70 L56 68 L56 60 Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
      <rect x="62" y="38" width="3" height="38" rx="1" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="57" y="52" width="13" height="3.5" rx="1" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1" />
      <rect x="62.5" y="38" width="2" height="14" rx="0.5" fill="#FACC15" opacity="0.7" />
    </svg>
  )
}

export default function CharacterSection() {
  const [shareOpen, setShareOpen] = useState(false)
  const ilju = getIljuType("경진-m")!

  return (
    <>
      {/* 앱 네이티브 캐릭터 카드 */}
      <div className="rounded-2xl overflow-hidden border border-charcoal/10 shadow-sm">
        {/* 상단: 금(金) 실버 배경 + 캐릭터 */}
        <div
          className="relative px-5 pt-5 flex items-end gap-3 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #F1F5F9 0%, #E8EEF4 100%)",
            minHeight: 152,
          }}
        >
          {/* 한자 워터마크 */}
          <span
            className="absolute top-2 right-3 text-[48px] font-black select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-black-han-sans), sans-serif",
              color: "rgba(45,45,45,0.06)",
            }}
          >
            庚辰
          </span>

          {/* 텍스트 */}
          <div className="flex-1 pb-4 z-10">
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              <ElementBadgePill element={ilju.stemElement} />
              <ElementBadgePill element={ilju.branchElement} />
              <YinyangBadge yinyang={ilju.yinyang} />
            </div>
            <p
              className="text-[26px] leading-[1.1] text-charcoal"
              style={{ fontFamily: "var(--font-black-han-sans), sans-serif" }}
            >
              {ilju.name}
            </p>
            <p className="text-[11px] text-text-muted mt-1">{ilju.tagline}</p>
          </div>

          {/* 캐릭터 */}
          <div className="shrink-0 -mb-1 z-10">
            <KyungJinChar size={108} />
          </div>
        </div>

        {/* 하단: 강점 + 명언 + 버튼 */}
        <div className="bg-white px-5 pt-3.5 pb-4">
          <div className="flex gap-1.5 flex-wrap mb-2.5">
            {ilju.strengths.slice(0, 3).map(s => (
              <span
                key={s}
                className="text-[11px] px-2.5 py-1 rounded-full bg-cream border border-charcoal/10 text-charcoal font-medium"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="text-[12px] text-text-sub font-medium leading-relaxed">
            &ldquo;{ilju.quote}&rdquo;
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setShareOpen(true)}
              className="flex-1 py-2.5 rounded-xl bg-charcoal text-cream text-xs font-bold active:opacity-80 transition-opacity"
            >
              카드 공유하기
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-cream border border-charcoal/10 active:opacity-70 transition-opacity">
              <DoodleHeart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 공유 시트 */}
      {shareOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          onClick={() => setShareOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative bg-white rounded-t-3xl px-5 pt-4 pb-8 flex flex-col items-center gap-4"
            onClick={e => e.stopPropagation()}
          >
            {/* 핸들 */}
            <div className="w-10 h-1 rounded-full bg-charcoal/20 mb-1" />
            <p className="text-sm font-bold text-charcoal self-start">내 일주 카드 공유</p>

            {/* 카드 — 여기서만 SetlogCardA3 사용 */}
            <SetlogCardA3 ilju={ilju} character={<KyungJinChar size={120} />} />

            <div className="flex gap-2 w-full">
              <button className="flex-1 py-3 rounded-xl bg-charcoal text-cream text-sm font-bold active:opacity-80 transition-opacity">
                이미지 저장
              </button>
              <button className="flex-1 py-3 rounded-xl bg-pink/10 text-pink text-sm font-bold active:opacity-80 transition-opacity">
                인스타 공유
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
