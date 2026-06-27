"use client"
import { ElementBadgePill, YinyangBadge } from "@/components/ilju-type-card"
import { ILJU_TYPES } from "@/lib/ilju-types"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { ELEMENT_THEME } from "@/lib/ilju-calc"
import { useUser, DEFAULT_PROFILE_IMG } from "@/lib/UserContext"

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

const AvatarElon = ({ s = 52 }: { s?: number }) => (
  <svg viewBox="0 0 36 36" fill="none" width={s} height={s}>
    <path d="M8 16 Q8 5 18 4 Q28 5 28 16 Q24 12 18 13 Q12 12 8 16Z" fill="#2D2D2D"/>
    <circle cx="18" cy="23" r="9" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
    <path d="M12 20 Q15 18.5 18 20" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M18 20 Q21 18.5 24 20" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <circle cx="14.5" cy="22" r="1.8" fill="#2D2D2D"/>
    <circle cx="21.5" cy="22" r="1.8" fill="#2D2D2D"/>
    <circle cx="15.1" cy="21.4" r="0.7" fill="white"/>
    <circle cx="22.1" cy="21.4" r="0.7" fill="white"/>
    <path d="M15 27.5 Q18 29.5 21 27.5" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  </svg>
)


const AvatarJayZ = ({ s = 52 }: { s?: number }) => (
  <svg viewBox="0 0 36 36" fill="none" width={s} height={s}>
    <circle cx="18" cy="9" r="7" fill="#1a1a1a"/>
    <circle cx="18" cy="23" r="9" fill="#8B5E3C" stroke="#2D2D2D" strokeWidth="1.5"/>
    <path d="M12 20 Q15 18.5 18 20" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M18 20 Q21 18.5 24 20" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <circle cx="14.5" cy="22.5" r="1.8" fill="#2D2D2D"/>
    <circle cx="21.5" cy="22.5" r="1.8" fill="#2D2D2D"/>
    <circle cx="15.1" cy="21.9" r="0.7" fill="white"/>
    <circle cx="22.1" cy="21.9" r="0.7" fill="white"/>
    <path d="M14.5 28 Q18 30.5 21.5 28" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
  </svg>
)

const AvatarBill = ({ s = 52 }: { s?: number }) => (
  <svg viewBox="0 0 36 36" fill="none" width={s} height={s}>
    <path d="M7 17 Q6 4 18 3 Q30 4 29 17 Q26 13 18 14 Q10 13 7 17Z" fill="#C8A87A"/>
    <circle cx="18" cy="23" r="9" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
    <rect x="8" y="15" width="20" height="3.5" rx="1" fill="#C8A" opacity="0"/>
    <path d="M11 20 Q14 18.5 17 20" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    <path d="M19 20 Q22 18.5 25 20" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    <circle cx="14.5" cy="22.5" r="1.8" fill="#2D2D2D"/>
    <circle cx="21.5" cy="22.5" r="1.8" fill="#2D2D2D"/>
    <circle cx="15.1" cy="21.9" r="0.7" fill="white"/>
    <circle cx="22.1" cy="21.9" r="0.7" fill="white"/>
    <path d="M14.5 28 Q18 31 21.5 28" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <rect x="14" y="19" width="8" height="5" rx="1" fill="none" stroke="#94A3B8" strokeWidth="0.8" opacity="0.6"/>
  </svg>
)

/* ── 동문 데이터 ─────────────────────────────────────────── */

type Elem = "목" | "화" | "토" | "금" | "수"

const ELEM_RING: Record<Elem, string> = {
  목: "linear-gradient(135deg, #4ADE80, #86EFAC)",
  화: "linear-gradient(135deg, #F87171, #FCA5A5)",
  토: "linear-gradient(135deg, #FBBF24, #FDE68A)",
  금: "linear-gradient(135deg, #94A3B8, #CBD5E1)",
  수: "linear-gradient(135deg, #60A5FA, #93C5FD)",
}

const DONGMUN = [
  { name: "일론 머스크", sub: "테슬라 CEO",    Face: AvatarElon,  bg: "#F1F5F9", elem: "금" as Elem },
  { name: "Jay-Z",       sub: "래퍼",          Face: AvatarJayZ,  bg: "#DBEAFE", elem: "수" as Elem },
  { name: "빌 게이츠",   sub: "마이크로소프트", Face: AvatarBill,  bg: "#D1FAE5", elem: "목" as Elem },
]

/* ── 컴포넌트 ───────────────────────────────────────────── */

export default function MyHero() {
  const { user, ilju: registeredIlju, hasIlju } = useUser()
  const ilju = registeredIlju ?? ILJU_TYPES[0]
  const theme = ELEMENT_THEME[ilju.stemElement]
  const svgFn = hasIlju ? ILJU_SVG_ICONS[ilju.id] : null

  return (
    <div className="flex flex-col gap-5">
      {/* 프로필 행 */}
      <div className="flex items-center gap-4">
        {/* 원형 아바타 */}
        <div className="shrink-0 p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A 0%, #FBBF24 100%)" }}>
          <div
            className="w-[68px] h-[68px] rounded-full overflow-hidden flex items-end justify-center"
            style={{ background: hasIlju && theme ? `radial-gradient(ellipse at 50% 80%, white 0%, ${theme.bg} 100%)` : "#F1F5F9" }}
          >
            {svgFn ? (
              svgFn(getIljuProfileViewBox(ilju.id))
            ) : DEFAULT_PROFILE_IMG ? (
              <img src={DEFAULT_PROFILE_IMG} alt="프로필" className="w-full h-full object-cover" />
            ) : (
              <AvatarMe s={56} />
            )}
          </div>
        </div>

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
        <button className="shrink-0 px-3 py-2 rounded-xl bg-charcoal/5 border border-charcoal/10 text-[12px] font-medium text-charcoal/60 active:opacity-70 transition-opacity">
          수정
        </button>
      </div>

      {/* 사주 동문 */}
      <div>
        <p className="font-bold text-charcoal text-sm mb-3">🎓 사주 동문</p>
        <div className="flex gap-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {DONGMUN.map(celeb => (
            <button key={celeb.name} className="flex flex-col items-center gap-1.5 shrink-0 active:scale-95 transition-transform">
              <div className="p-[2.5px] rounded-full" style={{ background: ELEM_RING[celeb.elem] }}>
                <div
                  className="w-[54px] h-[54px] rounded-full overflow-hidden flex items-center justify-center"
                  style={{ background: celeb.bg }}
                >
                  <celeb.Face s={50} />
                </div>
              </div>
              <p className="text-[10px] font-bold text-charcoal">{celeb.name}</p>
              <p className="text-[9px] text-text-muted -mt-1">{celeb.sub}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
