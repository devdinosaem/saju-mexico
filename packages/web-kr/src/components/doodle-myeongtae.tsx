// 명태 재화 두들 스티커 — 끈 없음, 잘록한 허리

type C = { body: string; tail: string; grain: string }

const WOOD:   C = { body: "#D4956A", tail: "#C4834A", grain: "#B8723A" }
const PINK:   C = { body: "#FBCFE8", tail: "#F472B6", grain: "#F472B6" }
const ORANGE: C = { body: "#FED7AA", tail: "#FB923C", grain: "#FB923C" }
const SKY:    C = { body: "#BAE6FD", tail: "#38BDF8", grain: "#38BDF8" }

function Base({ className = "w-12 h-[144px]", c }: { className?: string; c: C }) {
  return (
    <svg viewBox="0 0 60 90" className={className} fill="none">
      {/* 수염 */}
      <line x1="30" y1="14" x2="22" y2="4" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="24" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="27" y2="1" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="30" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="33" y2="1" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="36" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="38" y2="4" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      {/* 고리 */}
      <circle cx="30" cy="14" r="3" fill="none" stroke="#94A3B8" strokeWidth="1.8"/>
      <circle cx="30" cy="14" r="1.5" fill="#94A3B8"/>
      {/* 위 끈 */}
      <rect x="27" y="16" width="6" height="30" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 20 Q30 22 33 20" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 24 Q30 26 33 24" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 28 Q30 30 33 28" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 32 Q30 34 33 32" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 36 Q30 38 33 36" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 40 Q30 42 33 40" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 44 Q30 46 33 44" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      {/* 꼬리 지느러미 */}
      <path d="M46 50 Q54 46 56 52 Q54 58 46 56 Z" fill={c.tail} stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      {/* 몸통 — 허리 잘록 */}
      <path d="M10 48 Q6 50 6 54 Q8 61 18 65 Q22 66 28 60 Q30 58 32 60 Q36 66 44 63 Q48 60 50 53 Q50 49 46 46 Q38 44 32 48 Q30 50 28 48 Q22 44 14 45 Q12 45 10 48 Z" fill={c.body} stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* 결 — 머리쪽 */}
      <path d="M14 52 Q20 50 24 52" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M12 57 Q20 55 24 57" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.45"/>
      {/* 결 — 꼬리쪽 */}
      <path d="M34 50 Q39 48 44 51" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M34 57 Q39 55 44 58" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.45"/>
      {/* 등지느러미 */}
      <path d="M24 46 Q30 41 36 46" fill={c.tail} stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      {/* 눈 */}
      <circle cx="13" cy="53" r="2.5" fill="#2D2D2D"/>
      <circle cx="13.8" cy="52.2" r="1" fill="white"/>
      {/* 아래 끈 (끈 없음 — 허리 밑에서 자연스럽게 이어짐) */}
      <rect x="27" y="65" width="6" height="18" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 69 Q30 71 33 69" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 73 Q30 75 33 73" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 77 Q30 79 33 77" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 81 Q30 83 33 81" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
    </svg>
  )
}

export function DoodleMyeongtae({ className = "" }: { className?: string }) {
  return <Base className={className} c={WOOD} />
}
export function DoodleMyeongtaePink({ className = "" }: { className?: string }) {
  return <Base className={className} c={PINK} />
}
export function DoodleMyeongtaeOrange({ className = "" }: { className?: string }) {
  return <Base className={className} c={ORANGE} />
}
export function DoodleMyeongtaeSky({ className = "" }: { className?: string }) {
  return <Base className={className} c={SKY} />
}
