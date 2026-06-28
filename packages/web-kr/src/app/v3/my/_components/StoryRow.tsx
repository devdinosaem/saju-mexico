"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import { useFriends } from "@/hooks/useFriends"
import type { Friend as FriendModel } from "@/lib/friends"

const GAEGU: React.CSSProperties = {
  fontFamily: "'Cafe24Dongdong', var(--font-gaegu), cursive",
}

const RING_ON = "linear-gradient(135deg, #E84B6A 0%, #FBBF24 100%)"

type Elem = "목" | "화" | "토" | "금" | "수"

const ELEM_RING: Record<Elem, string> = {
  목: "linear-gradient(135deg, #4ADE80, #86EFAC)",
  화: "linear-gradient(135deg, #F87171, #FCA5A5)",
  토: "linear-gradient(135deg, #FBBF24, #FDE68A)",
  금: "linear-gradient(135deg, #94A3B8, #CBD5E1)",
  수: "linear-gradient(135deg, #60A5FA, #93C5FD)",
}

const ELEM_ACCENT: Record<Elem, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE",
}

const ELEM_LABEL: Record<Elem, string> = {
  목: "목 기운 🌱", 화: "화 기운 🔥", 토: "토 기운 🌍", 금: "금 기운 💎", 수: "수 기운 🌊",
}

const ELEM_MSG: Record<Elem, string> = {
  목: "오늘 뭔가 새로 시작하고 싶어. 아이디어 있으면 말해줘",
  화: "오늘 좀 뜨거워. 건드리면 타",
  토: "오늘 차분하게 있을 예정. 큰 변화 없음",
  금: "오늘 결단 모드야. 쓸데없는 말 하면 잘림",
  수: "오늘 감수성 폭발 중. 연락해줘",
}

/* ── 얼굴 SVG ─────────────────────────────────────────── */

export const FaceMe = ({ s = 50 }: { s?: number }) => (
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

export const FaceJisu = ({ s = 50 }: { s?: number }) => (
  <svg viewBox="0 0 36 36" fill="none" width={s} height={s}>
    <path d="M7 14 L9 8 L13 12 L18 4 L23 12 L27 8 L29 14" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
    <rect x="7" y="13" width="22" height="3" rx="1" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8"/>
    <circle cx="18" cy="24" r="9" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
    <path d="M11 21 Q14 19 17 21" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M19 21 Q22 19 25 21" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <circle cx="14" cy="22" r="1.5" fill="#2D2D2D"/>
    <circle cx="22" cy="22" r="1.5" fill="#2D2D2D"/>
    <ellipse cx="10" cy="25" rx="2.5" ry="1.5" fill="#FCA5A5" opacity="0.5"/>
    <ellipse cx="26" cy="25" rx="2.5" ry="1.5" fill="#FCA5A5" opacity="0.5"/>
    <path d="M14 28 Q18 32 22 28" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  </svg>
)

export const FaceMinjun = ({ s = 50 }: { s?: number }) => (
  <svg viewBox="0 0 36 36" fill="none" width={s} height={s}>
    <path d="M7 16 Q7 4 18 3 Q29 4 29 16 Q25 11 21 14 Q18 12 15 14 Q11 11 7 16Z" fill="#2D2D2D"/>
    <path d="M8 14 Q10 6 13 13" fill="#2D2D2D"/>
    <path d="M14 12 Q17 4 20 12" fill="#2D2D2D"/>
    <path d="M21 13 Q24 6 27 14" fill="#2D2D2D"/>
    <circle cx="18" cy="23" r="9" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
    <path d="M11 19 Q14 17.5 17 19" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M19 19 Q22 17.5 25 19" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <circle cx="14" cy="22" r="2" fill="#2D2D2D"/>
    <circle cx="22" cy="22" r="2" fill="#2D2D2D"/>
    <circle cx="14.6" cy="21.4" r="0.7" fill="white"/>
    <circle cx="22.6" cy="21.4" r="0.7" fill="white"/>
    <path d="M15 28 Q18 26 21 28" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  </svg>
)

export const FaceHaeun = ({ s = 50 }: { s?: number }) => (
  <svg viewBox="0 0 36 36" fill="none" width={s} height={s}>
    <path d="M6 17 Q6 4 18 3 Q30 4 30 17 Q26 12 22 16 Q20 14 18 15 Q16 14 14 16 Q10 12 6 17Z" fill="#0EA5E9"/>
    <circle cx="18" cy="24" r="9" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
    <ellipse cx="14" cy="22" rx="2.5" ry="2" fill="#2D2D2D"/>
    <ellipse cx="22" cy="22" rx="2.5" ry="2" fill="#2D2D2D"/>
    <circle cx="14.8" cy="21.3" r="0.9" fill="white"/>
    <circle cx="22.8" cy="21.3" r="0.9" fill="white"/>
    <ellipse cx="10" cy="26" rx="2.5" ry="1.5" fill="#38BDF8" opacity="0.5"/>
    <ellipse cx="26" cy="26" rx="2.5" ry="1.5" fill="#38BDF8" opacity="0.5"/>
    <path d="M14 29 Q18 33 22 29" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  </svg>
)

export const FaceJunho = ({ s = 50 }: { s?: number }) => (
  <svg viewBox="0 0 36 36" fill="none" width={s} height={s}>
    <path d="M7 16 Q7 12 18 11 Q29 12 29 16" fill="#92400E"/>
    <rect x="5" y="15" width="26" height="4" rx="1" fill="#78350F"/>
    <circle cx="18" cy="24" r="9" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
    <path d="M11 20 Q14 18.5 17 20" stroke="#92400E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M19 20 Q22 18.5 25 20" stroke="#92400E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <circle cx="14" cy="22" r="2" fill="#2D2D2D"/>
    <circle cx="22" cy="22" r="2" fill="#2D2D2D"/>
    <circle cx="14.7" cy="21.3" r="0.8" fill="white"/>
    <circle cx="22.7" cy="21.3" r="0.8" fill="white"/>
    <ellipse cx="10" cy="25" rx="2.5" ry="1.5" fill="#FCA5A5" opacity="0.3"/>
    <ellipse cx="26" cy="25" rx="2.5" ry="1.5" fill="#FCA5A5" opacity="0.3"/>
    <path d="M14 28 Q18 32 22 28" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  </svg>
)

export const FaceAreum = ({ s = 50 }: { s?: number }) => (
  <svg viewBox="0 0 36 36" fill="none" width={s} height={s}>
    <rect x="3" y="16" width="5" height="20" rx="2.5" fill="#2D2D2D"/>
    <rect x="28" y="16" width="5" height="20" rx="2.5" fill="#2D2D2D"/>
    <path d="M3 16 Q3 4 18 3 Q33 4 33 16" fill="#2D2D2D"/>
    <ellipse cx="18" cy="22" rx="11" ry="12" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
    <path d="M10 17 Q13 15 16 17" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M20 17 Q23 15 26 17" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <circle cx="13" cy="19" r="1.8" fill="#2D2D2D"/>
    <circle cx="23" cy="19" r="1.8" fill="#2D2D2D"/>
    <circle cx="13.7" cy="18.3" r="0.7" fill="white"/>
    <circle cx="23.7" cy="18.3" r="0.7" fill="white"/>
    <ellipse cx="9" cy="23" rx="2.5" ry="1.5" fill="#FCA5A5" opacity="0.6"/>
    <ellipse cx="27" cy="23" rx="2.5" ry="1.5" fill="#FCA5A5" opacity="0.6"/>
    <path d="M13 26 Q18 30 23 26" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  </svg>
)

/* ── 데이터 ─────────────────────────────────────────────── */

type Friend = { id: string; name: string; Face: ({ s }: { s?: number }) => React.ReactElement; bg: string; elem: Elem; daewun: boolean }

const STEM_TO_ELEM: Record<string, Elem> = {
  갑: "목", 을: "목", 병: "화", 정: "화",
  무: "토", 기: "토", 경: "금", 신: "금",
  임: "수", 계: "수",
}
const ELEM_BG_MAP: Record<Elem, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#E2E8F0", 수: "#DBEAFE",
}

function makeIljuFace(iljuKey: string): ({ s }: { s?: number }) => React.ReactElement {
  const fn = ILJU_SVG_ICONS[iljuKey]
  return function IljuFace({ s = 50 }: { s?: number }) {
    if (!fn) return <span style={{ fontSize: Math.floor(s / 2.8), fontWeight: "bold", color: "#94A3B8" }}>{iljuKey[0]}</span> as React.ReactElement
    return <div style={{ width: s, height: s }}>{fn()}</div> as React.ReactElement
  }
}

function toFriend(cf: FriendModel): Friend {
  const elem = STEM_TO_ELEM[cf.iljuKey[0]] ?? "토"
  return { id: cf.id, name: cf.name, Face: makeIljuFace(cf.iljuKey), bg: ELEM_BG_MAP[elem], elem, daewun: false }
}

/* ── 컴포넌트 ───────────────────────────────────────────── */

function StoryCircle({
  name, Face, bg, ring, bold, daewun, onClick,
}: { name: string; Face: ({ s }: { s?: number }) => React.ReactElement; bg: string; ring: string; bold?: boolean; daewun?: boolean; onClick?: () => void }) {
  return (
    <button className="flex flex-col items-center gap-1.5 shrink-0 active:scale-95 transition-transform" onClick={onClick}>
      <div className="relative">
        <div className="p-[2.5px] rounded-full" style={{ background: ring }}>
          <div className="w-[42px] h-[42px] rounded-full overflow-hidden flex items-center justify-center" style={{ background: bg }}>
            <Face />
          </div>
        </div>
        {daewun && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[14px] leading-none">👑</span>}
      </div>
      <p className={`text-[10px] ${bold ? "font-bold text-charcoal" : "text-text-muted"}`}>{name}</p>
    </button>
  )
}

export default function StoryRow({ onAdd }: { onAdd?: () => void }) {
  const router = useRouter()
  const { friends } = useFriends()
  const customFriends = friends.map(toFriend)
  const [active, setActive] = useState<Friend | null>(null)

  return (
    <>
      <div className="flex gap-4 overflow-x-auto" style={{ scrollbarWidth: "none", paddingBottom: 2 }}>
        <button
          className="flex flex-col items-center gap-1.5 shrink-0 active:scale-95 transition-transform"
          onClick={() => onAdd ? onAdd() : navigator.share?.({ title: "SAJUPLAY", text: "나랑 같이 SAJUPLAY 해봐!", url: window.location.origin })}
        >
          <div className="p-[2.5px] rounded-full" style={{ background: "#E2E8F0" }}>
            <div className="w-[42px] h-[42px] rounded-full overflow-hidden flex items-center justify-center bg-[#F1F5F9]">
              <span className="text-[24px] leading-none text-[#94A3B8]">+</span>
            </div>
          </div>
          <p className="text-[10px] text-text-muted">친구 초대</p>
        </button>
        {customFriends.map(f => (
          <StoryCircle
            key={f.id}
            name={f.name}
            Face={f.Face}
            bg={f.bg}
            ring={ELEM_RING[f.elem]}
            daewun={f.daewun}
            onClick={() => setActive(f)}
          />
        ))}
      </div>

      {/* 스토리 바텀시트 */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={() => setActive(null)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-[480px] bg-white rounded-t-3xl overflow-hidden border-t-2 border-x-2 border-charcoal"
            style={{ boxShadow: "0 -4px 0px #2D2D2D" }}
            onClick={e => e.stopPropagation()}
          >
            {/* 핸들 */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-charcoal/20" />
            </div>

            {/* 오행 배경 헤더 */}
            <div className="px-6 pt-3 pb-4 flex flex-col items-center gap-2.5 text-center" style={{ background: ELEM_ACCENT[active.elem] }}>
              <div
                className="w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-charcoal flex items-center justify-center"
                style={{ background: active.bg }}
              >
                <active.Face s={64} />
              </div>
              <div>
                <p className="text-[12px] text-text-muted">{ELEM_LABEL[active.elem]}{active.daewun ? " · 👑 대운 달" : ""}</p>
                <p className="text-[16px] font-bold text-charcoal mt-0.5">{active.name}</p>
              </div>
            </div>

            {/* 메시지 */}
            <div className="px-6 py-4">
              <p className="text-[16px] text-charcoal leading-relaxed text-center" style={GAEGU}>
                "{ELEM_MSG[active.elem]}"
              </p>
              <p className="text-[12px] text-text-muted mt-2.5 text-center">
                사주가 {active.name}의 오늘 에너지를 대신 전해줬어요
              </p>
            </div>

            {/* 버튼 */}
            <div
              className="px-6 pt-1 pb-6 flex flex-col gap-2"
              style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
            >
              <button
                onClick={() => {
                  setActive(null)
                  router.push(`/v3/interior/${active.id}`)
                }}
                className="w-full py-3 rounded-2xl border-2 border-charcoal text-[14px] font-bold text-charcoal active:opacity-70 transition-opacity"
                style={{ background: "#FFF9F0", boxShadow: "2px 2px 0px #2D2D2D" }}
              >
                {active.name}의 미니홈피 가기 →
              </button>
              <button
                onClick={() => setActive(null)}
                className="w-full py-3 rounded-2xl bg-charcoal/5 border border-charcoal/10 text-[14px] font-bold text-charcoal active:opacity-70 transition-opacity"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
