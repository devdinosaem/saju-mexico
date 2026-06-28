"use client"
import { useState } from "react"
import { ElementBadgePill, YinyangBadge } from "@/components/ilju-type-card"
import { ILJU_TYPES } from "@/lib/ilju-types"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { ELEMENT_THEME } from "@/lib/ilju-calc"
import { useUser, DEFAULT_PROFILE_IMG } from "@/lib/UserContext"
import { useMyDisplayCharacter } from "@/hooks/useMyDisplayCharacter"
import DisplayCharacterSheet from "./DisplayCharacterSheet"

/* ── 아바타 SVG ─────────────────────────────────────────── */

const AvatarMe = ({ s = 52 }: { s?: number }) => (
  <svg viewBox="0 0 36 36" fill="none" width={s} height={s}>
    <path d="M5 14 Q5 3 18 2 Q31 3 31 14" fill="#94A3B8"/>
    <rect x="4" y="13" width="28" height="4" rx="1" fill="#64748B"/>
    <circle cx="18" cy="23" r="9" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
    <line x1="12" y1="20" x2="16" y2="22" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="20" x2="20" y2="22" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="15.5" cy="22.5" r="1.5" fill="#2D2D2D"/>
    <circle cx="20.5" cy="22.5" r="1.5" fill="#2D2D2D"/>
    <circle cx="15" cy="22" r="0.6" fill="white"/>
    <circle cx="20" cy="22" r="0.6" fill="white"/>
    <line x1="15" y1="28" x2="21" y2="28" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)


/* ── 컴포넌트 ───────────────────────────────────────────── */

export default function MyHero({ onEdit }: { onEdit?: () => void }) {
  const { user, ilju: registeredIlju, hasIlju } = useUser()
  const ilju = registeredIlju ?? ILJU_TYPES[0]
  const theme = ELEMENT_THEME[ilju.stemElement]
  // 아바타 = 대표 캐릭터(소셜), 타입 라벨/뱃지 = 태생 일주(정체성)
  const displayKey = useMyDisplayCharacter()
  const svgFn = hasIlju && displayKey ? ILJU_SVG_ICONS[displayKey] : null
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="flex flex-col gap-5">
      {/* 프로필 행 */}
      <div className="flex items-center gap-4">
        {/* 원형 아바타 — 탭하면 대표 캐릭터 변경 (일주 등록된 경우만) */}
        <button
          className="shrink-0 p-[3px] rounded-full active:scale-95 transition-transform"
          style={{ background: "linear-gradient(135deg, #E84B6A 0%, #FBBF24 100%)" }}
          onClick={() => hasIlju && setSheetOpen(true)}
        >
          <div
            className="w-[68px] h-[68px] rounded-full overflow-hidden flex items-end justify-center"
            style={{ background: hasIlju && theme ? `radial-gradient(ellipse at 50% 80%, white 0%, ${theme.bg} 100%)` : "#F1F5F9" }}
          >
            {svgFn ? (
              svgFn(getIljuProfileViewBox(displayKey!))
            ) : DEFAULT_PROFILE_IMG ? (
              <img src={DEFAULT_PROFILE_IMG} alt="프로필" className="w-full h-full object-cover" />
            ) : (
              <AvatarMe s={56} />
            )}
          </div>
        </button>

        {/* 이름 + 뱃지 */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-text-muted">{ilju.ilju}일주</p>
          <p className="text-[18px] font-bold text-charcoal leading-tight mb-2">{ilju.name}</p>
          <div className="flex gap-1.5 flex-wrap">
            <ElementBadgePill element={ilju.stemElement} />
            <ElementBadgePill element={ilju.branchElement} />
            <YinyangBadge yinyang={ilju.yinyang} />
          </div>
        </div>

        {/* 수정 */}
        <button onClick={onEdit} className="shrink-0 px-3 py-2 rounded-xl bg-charcoal/5 border border-charcoal/10 text-[12px] font-medium text-charcoal/60 active:opacity-70 transition-opacity">
          수정
        </button>
      </div>

      <DisplayCharacterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  )
}
