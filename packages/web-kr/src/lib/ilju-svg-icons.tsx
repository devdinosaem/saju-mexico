import React from "react"

// 원형 프로필 전용 profileViewBox: 얼굴이 원의 40~47% 위치에 자연스럽게 오도록 설정
// 공식: y_start = cy_face - 32 (face at ~40%), 단 중요 상단 요소(왕관 등) 클리핑 방지
export const ILJU_PROFILE_VIEWBOXES: Record<string, string> = {
  "갑오-m": "0 0 80 80",   // cy=32
  "갑자-f": "0 4 80 80",   // cy=42, 왕관 y=6 보존
  "을미-f": "0 0 80 80",   // cy=36
  "병자-f": "0 4 80 80",   // cy=40
  "병오-m": "0 6 80 80",   // cy=44, 왕관 y=4 보존
  "계묘-f": "0 0 80 80",   // cy=36
  "갑자-m": "0 2 80 80",   // cy=38
  "병인-m": "0 2 80 80",   // cy=38
  "병인-f": "0 0 80 80",   // cy=36
  "무인-m": "0 4 80 80",   // cy=40
  "임신-m": "0 4 80 80",   // cy=40
  "경진-m": "0 10 80 80",  // cy=46, 모자 y=10 보존
  "신미-f": "0 0 80 80",   // cy=36
}

export const ILJU_PROFILE_VIEWBOX_DEFAULT = "0 0 80 80"

export function getIljuProfileViewBox(id: string, padding = 10): string {
  const vb = ILJU_PROFILE_VIEWBOXES[id] ?? ILJU_PROFILE_VIEWBOX_DEFAULT
  const [x, y, w, h] = vb.split(" ").map(Number)
  return `${x - padding} ${y - padding} ${w + padding * 2} ${h + padding * 2}`
}

export function IljuDefaultCharacter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 90" className={className ?? "w-full h-full"} fill="none">
      {/* 점선 후광 */}
      <circle cx="40" cy="38" r="30" fill="none" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
      {/* 헤어 실루엣 */}
      <path d="M20 30 Q18 10 40 8 Q62 10 60 30 L62 72 Q56 82 48 78 Q40 76 32 78 Q24 82 18 72 Z" fill="#E5E7EB" />
      {/* 얼굴 실루엣 */}
      <ellipse cx="40" cy="36" rx="15" ry="14" fill="#F3F4F6" />
      {/* 눈 */}
      <circle cx="34" cy="34" r="2.5" fill="#D1D5DB" />
      <circle cx="46" cy="34" r="2.5" fill="#D1D5DB" />
      {/* 입 */}
      <path d="M35 42 Q40 45 45 42" stroke="#D1D5DB" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 몸통 실루엣 */}
      <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#E5E7EB" />
      {/* 팔 */}
      <path d="M28 56 L16 50" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M52 56 L64 50" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
      {/* 반짝이 — 3개 */}
      <path d="M6 26 L7.2 29.5 L8.4 26 L7.2 22.5 Z" fill="#CBD5E1" opacity="0.8" />
      <path d="M71 17 L72.2 20.5 L73.4 17 L72.2 13.5 Z" fill="#CBD5E1" opacity="0.7" />
      <circle cx="14" cy="54" r="1.5" fill="#CBD5E1" opacity="0.7" />
      <circle cx="65" cy="50" r="1.5" fill="#CBD5E1" opacity="0.7" />
    </svg>
  )
}

export const ILJU_SVG_ICONS: Record<string, (viewBox?: string) => React.ReactNode> = {
  "갑오-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 에너지 후광 */}
      <circle cx="40" cy="32" r="24" fill="none" stroke="#4ADE80" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 3" />
      {/* 머리카락 — closed Z, 솟구치는 헤어 */}
      <path d="M20 28 Q18 10 30 8 Q40 4 50 8 Q62 10 60 28 Q58 42 54 48 Q46 54 40 54 Q34 54 26 48 Q22 42 20 28Z" fill="#92400E" />
      <line x1="32" y1="5" x2="30" y2="0" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="4" x2="40" y2="-2" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      <line x1="48" y1="5" x2="50" y2="0" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      {/* 얼굴 */}
      <circle cx="40" cy="32" r="15" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.8" />
      {/* 에너지 넘치는 눈 */}
      <circle cx="34" cy="30" r="4" fill="#2D2D2D" />
      <circle cx="46" cy="30" r="4" fill="#2D2D2D" />
      <circle cx="35.5" cy="28.5" r="1.5" fill="white" opacity="0.9" />
      <circle cx="47.5" cy="28.5" r="1.5" fill="white" opacity="0.9" />
      {/* 눈썹 — 들뜬 */}
      <path d="M28 24 Q34 20 40 24" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M40 24 Q46 20 52 24" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* 입 — 와아! */}
      <path d="M30 40 Q40 50 50 40" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M32 41 Q40 49 48 41" fill="#F9A8D4" opacity="0.3" />
      {/* 볼터치 */}
      <ellipse cx="26" cy="36" rx="4.5" ry="2.5" fill="#F9A8D4" opacity="0.5" />
      <ellipse cx="54" cy="36" rx="4.5" ry="2.5" fill="#F9A8D4" opacity="0.5" />
      {/* 몸통 */}
      <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#D1FAE5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 팔 벌린 포즈 */}
      <path d="M28 56 L8 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M52 56 L72 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      {/* 폭죽 양손 */}
      <circle cx="6" cy="43" r="3.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
      <line x1="2" y1="40" x2="0" y2="36" stroke="#F87171" strokeWidth="1" opacity="0.8" />
      <line x1="5" y1="39" x2="5" y2="34" stroke="#4ADE80" strokeWidth="1" opacity="0.8" />
      <line x1="9" y1="40" x2="11" y2="36" stroke="#FACC15" strokeWidth="1" opacity="0.8" />
      <circle cx="74" cy="43" r="3.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
      <line x1="70" y1="40" x2="68" y2="36" stroke="#F87171" strokeWidth="1" opacity="0.8" />
      <line x1="74" y1="39" x2="74" y2="34" stroke="#4ADE80" strokeWidth="1" opacity="0.8" />
      <line x1="78" y1="40" x2="80" y2="36" stroke="#FACC15" strokeWidth="1" opacity="0.8" />
    </svg>
  ),
  "갑자-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 왕관 — 먼저 그림 (머리카락 뒤에) */}
      <path d="M26 18 L30 10 L35 16 L40 6 L45 16 L50 10 L54 18" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="26" y="16" width="28" height="5" rx="1.5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="40" cy="7" r="2.2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
      {/* 긴 머리 — 노란색 closed Z, 머리와 붙어있게 */}
      <path d="M20 34 Q18 16 40 14 Q62 16 60 34 L66 76 Q62 82 56 80 Q40 78 24 80 Q18 82 14 76 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 얼굴 */}
      <circle cx="40" cy="42" r="14" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
      {/* 눈 — 귀찮아서 반쯤 감긴 */}
      <path d="M30 39 Q34 35 38 39" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="30" y="39" width="8" height="4" rx="1" fill="#FDE68A" />
      <path d="M42 39 Q46 35 50 39" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="42" y="39" width="8" height="4" rx="1" fill="#FDE68A" />
      {/* 눈썹 — 한쪽만 올라간 */}
      <path d="M29 35 Q33 33 37 35" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M43 33 Q47 32 51 34" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 입 — 삐죽한 귀찮음 */}
      <path d="M34 48 Q37 50 40 48 Q43 46 46 47" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="27" cy="44" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.45" />
      <ellipse cx="53" cy="44" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.45" />
      {/* 핑크 드레스 */}
      <path d="M22 56 Q20 62 18 76 L62 76 Q60 62 58 56 Q50 54 40 54 Q30 54 22 56Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 드레스 주름 */}
      <path d="M29 58 Q27 66 26 74" stroke="#F472B6" strokeWidth="0.8" opacity="0.3" fill="none" />
      <path d="M51 58 Q53 66 54 74" stroke="#F472B6" strokeWidth="0.8" opacity="0.3" fill="none" />
      {/* 왼팔 — 볼에 살짝 기댄 */}
      <path d="M22 60 Q14 62 12 54" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="11" cy="51" rx="4" ry="3.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
    </svg>
  ),
  "을미-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 헤어 — 장발 스트레이트, 핑크 */}
      <path d="M18 32 Q18 10 40 8 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 속눈썹 */}
      <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 눈 — 친근한 */}
      <circle cx="34" cy="34" r="2" fill="#2D2D2D" />
      <circle cx="46" cy="34" r="2" fill="#2D2D2D" />
      <circle cx="35" cy="33" r="0.8" fill="white" />
      <circle cx="47" cy="33" r="0.8" fill="white" />
      {/* 입 — 환한 미소 */}
      <path d="M34 41 Q40 46 46 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="30" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
      <ellipse cx="50" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
      {/* 몸통 */}
      <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 자석 소품 */}
      <path d="M8 60 Q8 52 14 52 Q20 52 20 60" stroke="#F87171" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M8 60 L8 64" stroke="#F87171" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 60 L20 64" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
      {/* 작은 하트들 */}
      <path d="M60 42 C60 40 62 38 64 40 C66 38 68 40 68 42 C68 44 64 48 64 48 C64 48 60 44 60 42Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  ),
  "병자-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 헤어 — 장발 불꽃 머리 (닫힌 Z) */}
      <path d="M22 32 Q18 20 28 14 Q32 10 36 16 Q38 8 42 14 Q46 8 48 16 Q52 10 56 18 Q62 24 58 32 L62 62 Q56 72 48 70 Q40 68 32 70 Q24 72 18 62 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 불꽃 팁 */}
      <path d="M30 16 Q32 10 34 16" fill="#FACC15" stroke="none" />
      <path d="M42 12 Q44 6 46 12" fill="#FACC15" stroke="none" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="40" rx="14" ry="13" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
      {/* 속눈썹 */}
      <path d="M31 35 Q34 33 37 35" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M43 35 Q46 33 49 35" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 눈 — 열정적인 반짝이는 큰 눈 */}
      <circle cx="34" cy="38" r="3.5" fill="#2D2D2D" />
      <circle cx="46" cy="38" r="3.5" fill="#2D2D2D" />
      <circle cx="35.5" cy="37" r="1.2" fill="white" />
      <circle cx="47.5" cy="37" r="1.2" fill="white" />
      {/* 입 — 열정적으로 벌린 */}
      <ellipse cx="40" cy="47" rx="4" ry="2.5" fill="#2D2D2D" />
      <ellipse cx="40" cy="46.5" rx="2.5" ry="1" fill="#F87171" />
      {/* 볼터치 */}
      <ellipse cx="27" cy="43" rx="3" ry="1.5" fill="#FB923C" opacity="0.5" />
      <ellipse cx="53" cy="43" rx="3" ry="1.5" fill="#FB923C" opacity="0.5" />
      {/* 몸통 */}
      <rect x="28" y="56" width="24" height="18" rx="5" fill="#F87171" stroke="#2D2D2D" strokeWidth="2" />
      {/* 여러 개 팔 (열정 과부하) */}
      {/* 왼팔 1 — 메모 들고 */}
      <path d="M28 58 L14 52" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      <rect x="6" y="46" width="10" height="8" rx="1" fill="white" stroke="#2D2D2D" strokeWidth="1" />
      <line x1="8" y1="49" x2="14" y2="49" stroke="#F87171" strokeWidth="0.6" />
      <line x1="8" y1="51" x2="12" y2="51" stroke="#F87171" strokeWidth="0.6" />
      {/* 왼팔 2 — 아래로 */}
      <path d="M28 64 L16 72" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      {/* 오른팔 1 — 연필 */}
      <path d="M52 58 L66 52" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      <line x1="66" y1="52" x2="74" y2="44" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M74 44 L76 42" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
      {/* 오른팔 2 — 아래로 엄지척 */}
      <path d="M52 64 L64 72" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      <circle cx="66" cy="73" r="3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1" />
      {/* 불꽃 이펙트 — 주변 */}
      <path d="M4 38 C4 38 2 34 2 32 A2 2 0 0 1 6 32 C6 34 4 38 4 38Z" fill="#FACC15" opacity="0.5" />
      <path d="M76 34 C76 34 74 30 74 28 A2 2 0 0 1 78 28 C78 30 76 34 76 34Z" fill="#FACC15" opacity="0.4" />
    </svg>
  ),
  "병오-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      <rect x="22" y="24" width="36" height="6" rx="2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 24 L28 10 L34 22 L40 4 L46 22 L52 10 L58 24" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="34" cy="20" r="2" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="40" cy="11" r="2.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="46" cy="20" r="2" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.8" />
      <path d="M22 36 Q22 28 40 28 Q58 28 58 36" fill="#2D2D2D" />
      <circle cx="40" cy="44" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="35" cy="42" r="2.5" fill="#2D2D2D" />
      <circle cx="45" cy="42" r="2.5" fill="#2D2D2D" />
      <circle cx="36" cy="41" r="1" fill="white" />
      <circle cx="46" cy="41" r="1" fill="white" />
      <path d="M33 49 Q40 55 47 49" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M35 49 Q40 53 45 49" fill="#F9A8D4" opacity="0.3" />
      <ellipse cx="29" cy="45" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.55" />
      <ellipse cx="51" cy="45" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.55" />
      <rect x="28" y="58" width="24" height="22" rx="5" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="2" />
      <path d="M34 60 L40 68 L46 60" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <circle cx="40" cy="72" r="1.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="61" cy="57" r="5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
      <rect x="59" y="62" width="4" height="12" rx="1" fill="#2D2D2D" />
      <path d="M67 55 Q71 58 67 61" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M70 52 Q75 58 70 64" stroke="#FACC15" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  "계묘-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      <path d="M22 30 Q22 10 40 8 Q58 10 58 30" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M20 30 Q12 40 14 62 Q16 70 20 68 Q26 64 22 50 Q20 40 22 32 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M60 30 Q68 40 66 62 Q64 70 60 68 Q54 64 58 50 Q60 40 58 32 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="21" cy="30" r="3.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="59" cy="30" r="3.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1" />
      <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="34" r="2" fill="#2D2D2D" />
      <circle cx="46" cy="34" r="2" fill="#2D2D2D" />
      <circle cx="35" cy="33" r="0.8" fill="white" />
      <circle cx="47" cy="33" r="0.8" fill="white" />
      <path d="M36 41 Q40 45 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="30" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
      <ellipse cx="50" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
      <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="40" cy="62" r="4" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8" />
      <path d="M9 58 L11 52 L13 58 L19 58 L14 62 L16 68 L11 64 L6 68 L8 62 L3 58 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  ),
  "갑자-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} fill="none" className="w-full h-full">
      <path d="M25 28 Q40 12 55 28" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="40" cy="38" r="18" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
      <rect x="31" y="34" width="6" height="4" rx="1" fill="#2D2D2D" />
      <rect x="43" y="34" width="6" height="4" rx="1" fill="#2D2D2D" />
      <line x1="35" y1="44" x2="45" y2="44" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      <rect x="28" y="56" width="24" height="18" rx="4" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="2" />
      <rect x="10" y="60" width="18" height="14" rx="2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="30" cy="78" r="5" fill="#2D2D2D" />
      <circle cx="50" cy="78" r="5" fill="#2D2D2D" />
    </svg>
  ),
  "병인-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} fill="none" className="w-full h-full">
      <path d="M22 20 Q18 8 26 10 Q30 16 28 22" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M58 20 Q62 8 54 10 Q50 16 52 22" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M22 30 Q22 14 40 12 Q58 14 58 30" fill="#2D2D2D" />
      <circle cx="40" cy="38" r="16" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="34" cy="36" r="3.2" fill="#2D2D2D" />
      <circle cx="46" cy="36" r="3.2" fill="#2D2D2D" />
      <circle cx="35.5" cy="35" r="1.3" fill="#FACC15" opacity="0.9" />
      <circle cx="47.5" cy="35" r="1.3" fill="#FACC15" opacity="0.9" />
      <path d="M28 30 Q33 27 38 30" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 30 Q47 27 52 30" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 44 L40 42 L46 44" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="27" cy="40" rx="3.5" ry="1.8" fill="#F87171" opacity="0.45" />
      <ellipse cx="53" cy="40" rx="3.5" ry="1.8" fill="#F87171" opacity="0.45" />
      <rect x="28" y="54" width="24" height="20" rx="5" fill="#F87171" stroke="#2D2D2D" strokeWidth="2" />
      <path d="M28 58 L12 50" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M52 56 L68 48" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  "병인-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} fill="none" className="w-full h-full">
      <path d="M22 28 Q22 10 40 8 Q58 10 58 28" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M20 28 Q12 40 14 62 Q16 70 20 68 Q26 64 22 52 Q20 40 22 30 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M60 28 Q68 40 66 62 Q64 70 60 68 Q54 64 58 52 Q60 40 58 30 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M14 62 Q10 72 14 76 Q18 72 16 64 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M66 62 Q70 72 66 76 Q62 72 64 64 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="21" cy="30" r="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="59" cy="30" r="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
      <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M29 28 Q33 25 37 28" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M43 28 Q47 25 51 28" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="34" cy="33" r="3" fill="#2D2D2D" />
      <circle cx="46" cy="33" r="3" fill="#2D2D2D" />
      <circle cx="35.2" cy="31.8" r="1.2" fill="white" />
      <circle cx="47.2" cy="31.8" r="1.2" fill="white" />
      <ellipse cx="28" cy="39" rx="5" ry="3" fill="#F9A8D4" opacity="0.7" />
      <ellipse cx="52" cy="39" rx="5" ry="3" fill="#F9A8D4" opacity="0.7" />
      <path d="M33 41 Q40 47 47 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
    </svg>
  ),
  "무인-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} fill="none" className="w-full h-full">
      <path d="M24 24 Q28 16 40 14 Q52 16 56 24" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M18 26 L62 26 Q60 30 40 30 Q20 30 18 26 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 32 Q22 18 40 16 Q58 18 58 32" fill="#2D2D2D" />
      <circle cx="40" cy="40" r="16" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="34" cy="37" r="3.2" fill="#2D2D2D" />
      <circle cx="46" cy="37" r="3.2" fill="#2D2D2D" />
      <circle cx="35.5" cy="35.8" r="1.3" fill="white" />
      <circle cx="47.5" cy="35.8" r="1.3" fill="white" />
      <path d="M29 31 Q33 27 37 31" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M43 31 Q47 27 51 31" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M34 43 Q40 48 46 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="41" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
      <ellipse cx="52" cy="41" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
      <rect x="28" y="56" width="24" height="20" rx="5" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
      <rect x="4" y="54" width="16" height="12" rx="2" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="16" cy="58" r="1.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.5" />
      <path d="M52 58 Q60 50 66 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="66" y1="44" x2="66" y2="30" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M66 30 L78 35 L66 40" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1" />
      <rect x="38" y="2" width="4" height="10" rx="2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="40" cy="15" r="2.2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  ),
  "임신-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} fill="none" className="w-full h-full">
      <path d="M22 28 Q18 18 22 12 Q28 6 40 8 Q52 6 58 12 Q62 18 58 28 Q54 22 48 26 Q44 28 40 26 Q36 24 32 26 Q26 28 22 28 Z" fill="#0EA5E9" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="16" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
      <ellipse cx="34" cy="38" rx="3.5" ry="2.5" fill="#2D2D2D" />
      <ellipse cx="46" cy="38" rx="3.5" ry="2.5" fill="#2D2D2D" />
      <circle cx="35.2" cy="37" r="1.2" fill="white" />
      <circle cx="47.2" cy="37" r="1.2" fill="white" />
      <line x1="29" y1="31" x2="37" y2="30" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      <line x1="43" y1="30" x2="51" y2="31" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 46 Q40 50 44 46" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="43" rx="4" ry="2.5" fill="#38BDF8" opacity="0.65" />
      <ellipse cx="52" cy="43" rx="4" ry="2.5" fill="#38BDF8" opacity="0.65" />
      <rect x="28" y="56" width="24" height="20" rx="5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="13" cy="62" r="8" stroke="#2D2D2D" strokeWidth="1.5" fill="#BFDBFE" />
      <circle cx="13" cy="62" r="4" stroke="#2D2D2D" strokeWidth="1" fill="white" />
      <rect x="11" y="53" width="4" height="3.5" rx="1" fill="#1E40AF" />
      <rect x="11" y="67.5" width="4" height="3.5" rx="1" fill="#1E40AF" />
      <circle cx="66" cy="64" r="8" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
      <line x1="66" y1="56" x2="66" y2="64" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      <line x1="66" y1="64" x2="71" y2="60" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "경진-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} fill="none" className="w-full h-full">
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
  ),
  "신미-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      <path d="M20 30 Q18 10 40 8 Q62 10 60 30 L62 74 Q56 84 48 80 Q40 78 32 80 Q24 84 18 74 Z" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M28 12 Q36 8 46 10 Q52 14 56 20" stroke="white" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" fill="none" />
      <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="34" r="2.5" fill="#2D2D2D" />
      <circle cx="46" cy="34" r="2.5" fill="#2D2D2D" />
      <circle cx="35" cy="33" r="0.9" fill="white" />
      <circle cx="47" cy="33" r="0.9" fill="white" />
      <path d="M35 42 Q38 46 44 42" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="38" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.55" />
      <ellipse cx="52" cy="38" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.55" />
      <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#BFDBFE" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M52 54 L65 42" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="65" y1="42" x2="69" y2="36" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
      <path d="M69 31 L71 34 L74 34 L72 36.5 L73 40 L69 38 L65 40 L66 36.5 L64 34 L67 34 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
      <path d="M28 57 L14 48" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="11" cy="46" rx="4.5" ry="3.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="8" y="42" width="6" height="2" rx="1" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.6" />
      <path d="M5 34 L6.5 37 L8 34 L6.5 31 Z" fill="#FACC15" opacity="0.75" />
      <path d="M72 22 L73.5 25 L75 22 L73.5 19 Z" fill="#FACC15" opacity="0.65" />
      <circle cx="61" cy="50" r="1.2" fill="#FACC15" opacity="0.7" />
    </svg>
  ),
}
