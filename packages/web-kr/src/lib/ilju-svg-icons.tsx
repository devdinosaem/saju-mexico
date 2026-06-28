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
  "경신-m": "0 2 80 80",   // cy=38 (auto)
  "경오-f": "0 2 80 80",   // cy=38 (auto)
  "경오-m": "0 2 80 80",   // cy=38 (auto)
  "경인-m": "0 2 80 80",   // cy=38 (auto)
  "계미-f": "0 2 80 80",   // cy=38 (auto)
  "계사-f": "0 2 80 80",   // cy=38 (auto)
  "계사-m": "0 2 80 80",   // cy=38 (auto)
  "계유-m": "0 2 80 80",   // cy=38 (auto)
  "기미-f": "0 2 80 80",   // cy=38 (auto)
  "무오-f": "0 2 80 80",   // cy=38 (auto)
  "무진-m": "0 2 80 80",   // cy=38 (auto)
  "병술-m": "0 2 80 80",   // cy=38 (auto)
  "병진-m": "0 2 80 80",   // cy=38 (auto)
  "신유-m": "0 2 80 80",   // cy=38 (auto)
  "신축-f": "0 2 80 80",   // cy=38 (auto)
  "신축-m": "0 2 80 80",   // cy=38 (auto)
  "을묘-m": "0 2 80 80",   // cy=38 (auto)
  "을사-m": "0 2 80 80",   // cy=38 (auto)
  "을축-f": "0 2 80 80",   // cy=38 (auto)
  "을축-m": "0 2 80 80",   // cy=38 (auto)
  "임신-f": "0 2 80 80",   // cy=38 (auto)
  "임진-f": "0 2 80 80",   // cy=38 (auto)
  "정미-m": "0 2 80 80",   // cy=38 (auto)
  "정유-f": "0 2 80 80",   // cy=38 (auto)
  "정유-m": "0 2 80 80",   // cy=38 (auto)
  "정해-m": "0 2 80 80",   // cy=38 (auto)
  "경신-f": "0 4 80 80",   // cy=40 (auto)
  "계미-m": "0 4 80 80",   // cy=40 (auto)
  "기묘-m": "0 4 80 80",   // cy=40 (auto)
  "기미-m": "0 4 80 80",   // cy=40 (auto)
  "기사-m": "0 4 80 80",   // cy=40 (auto)
  "병오-f": "0 4 80 80",   // cy=40 (auto)
  "신미-m": "0 4 80 80",   // cy=40 (auto)
  "신해-m": "0 4 80 80",   // cy=40 (auto)
  "정축-m": "0 1 80 80",   // cy=40, 윗머리 보존 위해 y↓
  "정축-f": "0 -3 80 80",  // 윗머리 보존 위해 y↓
  "계축-m": "0 6 80 80",   // cy=42 (auto)
  "갑인-m": "0 10 80 80",   // cy=46 (auto)
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
  "갑자-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 옆머리 (안전모 밑) */}
      <path d="M26 35 Q24 29 27 25 L31 27 Q29 31 30 36Z" fill="#2D2D2D" />
      <path d="M54 35 Q56 29 53 25 L49 27 Q51 31 50 36Z" fill="#2D2D2D" />
      {/* 얼굴 */}
      <circle cx="40" cy="36" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 안전모 (이마 위) */}
      <path d="M26 27 Q40 11 54 27 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="25" y="26" width="30" height="3.5" rx="1.5" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M40 13 L40 26" stroke="#EAB308" strokeWidth="1" opacity="0.6" />
      {/* 눈썹 — 낮고 강하게 (무시무시) */}
      <path d="M30 30 L37 32" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M43 32 L50 30" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" />
      {/* 눈 — before 무표정 (각진 눈) */}
      <rect x="31" y="35" width="6" height="4" rx="1.5" fill="#2D2D2D" />
      <rect x="43" y="35" width="6" height="4" rx="1.5" fill="#2D2D2D" />
      {/* 입 — 꾹 다문 (직진) */}
      <path d="M35 46 Q40 45 45 46" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* === 장갑 불도저 차체 === */}
      {/* 캐터필러 트랙 */}
      <rect x="20" y="63" width="42" height="13" rx="6.5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="27" cy="69.5" r="3" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="35" cy="69.5" r="3" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="43" cy="69.5" r="3" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="51" cy="69.5" r="3" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.8" />
      <path d="M22 64 L24 62 M30 64 L32 62 M38 64 L40 62 M46 64 L48 62 M54 64 L56 62" stroke="#0F172A" strokeWidth="1" opacity="0.6" />
      {/* 장갑 차체 (사다리꼴) */}
      <path d="M25 49 L55 49 L58 64 L22 64 Z" fill="#4B5563" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M25 49 L55 49" stroke="#6B7280" strokeWidth="1.2" opacity="0.7" />
      <circle cx="28" cy="52" r="0.9" fill="#1F2937" />
      <circle cx="52" cy="52" r="0.9" fill="#1F2937" />
      <circle cx="26" cy="61" r="0.9" fill="#1F2937" />
      <circle cx="54" cy="61" r="0.9" fill="#1F2937" />
      {/* 경고 줄무늬 */}
      <path d="M31 58 L35 54 M36 58 L40 54 M41 58 L45 54 M46 58 L50 54" stroke="#FACC15" strokeWidth="1.6" opacity="0.85" />
      {/* 배기관 + 매연 */}
      <rect x="55" y="43" width="3.5" height="8" rx="1" fill="#374151" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="60" cy="41" r="2.5" fill="#6B7280" opacity="0.5" />
      <circle cx="64" cy="37" r="2" fill="#6B7280" opacity="0.35" />
      <circle cx="67" cy="34" r="1.5" fill="#6B7280" opacity="0.25" />
      {/* 유압 암 */}
      <path d="M24 56 L16 58" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="22" cy="56.5" r="1.2" fill="#1F2937" />
      {/* 삽날 (경고 줄무늬) */}
      <path d="M4 50 L17 52 L17 70 L4 72 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 52 L10 70 M12 52 L14 70" stroke="#1F2937" strokeWidth="1.8" opacity="0.8" />
      {/* 삽날 하단 송곳니 */}
      <path d="M4 72 L6 77 L9 72 L11 77 L14 72 L16 77 L17 72" fill="#E5E7EB" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      {/* 충격 먼지 */}
      <circle cx="6" cy="46" r="3" fill="#E5E5E5" opacity="0.5" />
      <circle cx="2" cy="42" r="2" fill="#E5E5E5" opacity="0.35" />
    </svg>
  ),
  "갑자-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 왕관 — 먼저 그림 (머리카락 뒤에) */}
      <path d="M26 18 L30 10 L35 16 L40 6 L45 16 L50 10 L54 18" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="26" y="16" width="28" height="5" rx="1.5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="40" cy="7" r="2.2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
      {/* 긴 머리 — 노란색 closed Z */}
      <path d="M20 34 Q18 16 40 14 Q62 16 60 34 L66 76 Q62 82 56 80 Q40 78 24 80 Q18 82 14 76 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 얼굴 — 살색만 교체 */}
      <circle cx="40" cy="42" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="2" />
      {/* 눈 — 귀찮아서 반쯤 감긴 (마스크 살색 교체) */}
      <path d="M30 39 Q34 35 38 39" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="30" y="39" width="8" height="4" rx="1" fill="#FDDCB5" />
      <path d="M42 39 Q46 35 50 39" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="42" y="39" width="8" height="4" rx="1" fill="#FDDCB5" />
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
      <path d="M29 58 Q27 66 26 74" stroke="#F472B6" strokeWidth="0.8" opacity="0.3" fill="none" />
      <path d="M51 58 Q53 66 54 74" stroke="#F472B6" strokeWidth="0.8" opacity="0.3" fill="none" />
      {/* 왼팔 — 볼에 살짝 기댄 */}
      <path d="M22 60 Q14 62 12 54" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="11" cy="51" rx="4" ry="5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
    </svg>
  ),
  "을축-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 새싹 모자 */}
        <path d="M36 16 Q36 10 40 7 Q44 10 44 16" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M40 7 Q37 3 34 7 Q37 11 40 7Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M40 7 Q43 3 46 7 Q43 11 40 7Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" />
        <rect x="30" y="16" width="20" height="4" rx="2" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" />
        {/* 머리카락 — 남성 캡-Z */}
        <path d="M22 32 Q20 14 40 12 Q60 14 58 32 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 17 Q34 22 32 26" stroke="#52525B" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M40 15 Q41 21 40 26" stroke="#52525B" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M47 17 Q46 22 48 26" stroke="#52525B" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 구레나룻 */}
        <path d="M24 32 Q22 37 24 42" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M56 32 Q58 37 56 42" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* 얼굴 */}
        <circle cx="40" cy="38" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈 — 느긋한 반달 */}
        <path d="M32 36 Q35 33 38 36" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M42 36 Q45 33 48 36" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 입 — 여유 넘치는 미소 */}
        <path d="M34 43 Q40 48 46 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="40" rx="3.5" ry="2" fill="#FB923C" opacity="0.35" />
        <ellipse cx="52" cy="40" rx="3.5" ry="2" fill="#FB923C" opacity="0.35" />
        {/* 몸통 */}
        <path d="M28 54 Q26 58 26 72 L54 72 Q54 58 52 54 Q46 52 40 52 Q34 52 28 54Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 물조리개 — 오른손 */}
        <path d="M52 60 L64 54" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="68" cy="52" rx="5" ry="4" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M72 50 Q78 46 76 42" stroke="#60A5FA" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <line x1="74" y1="42" x2="76" y2="38" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <line x1="77" y1="44" x2="80" y2="40" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        {/* 왼팔 + 겁나 큰 횃불 */}
        <path d="M28 60 Q18 54 10 48" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 횃불 손잡이 */}
        <rect x="7" y="30" width="5" height="20" rx="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2" />
        {/* 횃불 컵 */}
        <path d="M5 30 L14 30 L12 38 L7 38 Z" fill="#B45309" stroke="#2D2D2D" strokeWidth="1.2" />
        {/* 거대 불꽃 */}
        <path d="M9.5 30 C9.5 30 1 18 4 8 C6 2 9.5 4 9.5 4 C9.5 2 11 0 13 6 C17 14 15 6 14 14 C18 10 17 20 13 24 C15 18 12 26 9.5 30Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M9.5 30 C9.5 30 5 20 7 12 A4 4 0 0 1 12 12 C14 20 9.5 30 9.5 30Z" fill="#FACC15" opacity="0.9" />
        <circle cx="9.5" cy="6" r="2.5" fill="#FDE68A" opacity="0.8" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M24 28 Q25 33 28 32 Q34 34 40 32 Q46 34 52 32 Q55 33 56 28 Q57 21 40 20 Q24 21 24 28 Z" fill="#2D2D2D" />
    </svg>
  ),
  "을축-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 헤어 — 양갈래, 갈색 (신미-f처럼 닫힌 풀캡 — 얼굴 덮음) */}
      <path d="M22 30 Q22 10 40 8 Q58 10 58 30 Q58 38 50 42 Q40 44 30 42 Q22 38 22 30 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M20 30 Q12 40 14 56 Q16 62 20 60 Q26 56 22 46 Q20 38 22 32 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M60 30 Q68 40 66 56 Q64 62 60 60 Q54 56 58 46 Q60 38 58 32 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="21" cy="30" r="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="59" cy="30" r="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
      {/* 얼굴 — 살색만 교체 (#FDE68A→#FDDCB5) */}
      <ellipse cx="40" cy="38" rx="15" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 */}
      <path d="M30 31 Q34 29 38 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M42 31 Q46 29 50 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 눈 — 반달 여유 */}
      <path d="M32 36 Q35 33 38 36" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M42 36 Q45 33 48 36" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 입 */}
      <path d="M35 43 Q40 47 45 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="29" cy="40" rx="4" ry="2.5" fill="#FB923C" opacity="0.4" />
      <ellipse cx="51" cy="40" rx="4" ry="2.5" fill="#FB923C" opacity="0.4" />
      {/* 몸통 — 원피스 (형태 유지, 색만 변경 → 로즈) */}
      <path d="M28 54 Q26 58 26 72 L54 72 Q54 58 52 54 Q46 52 40 52 Q34 52 28 54Z" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 오른팔 — 칼 들기 (꾸준 칼 그대로 유지) */}
      <path d="M52 60 Q60 54 64 48" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="59" y="44" width="10" height="12" rx="2" fill="#B45309" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="52" y="40" width="24" height="5" rx="2" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M56 40 L64 2 L72 40 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" />
      <line x1="64" y1="6" x2="64" y2="36" stroke="white" strokeWidth="1.2" opacity="0.7" />
      <g transform="translate(64, 6) rotate(90)">
        <text x="0" y="0" fontSize="13" fill="#1E293B" fontFamily="sans-serif" fontWeight="bold" dominantBaseline="middle">꾸준</text>
      </g>
    </svg>
  ),
  "갑술-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 머리카락 — 크라운 캡 (뿔보다 먼저) */}
      <path d="M22 31 Q20 11 40 9 Q60 11 58 31 Z" fill="#2D2D2D" />
      {/* 들소 뿔 — 헤어 위에 */}
      <path d="M20 24 Q8 10 14 2 Q22 10 24 22" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M60 24 Q72 10 66 2 Q58 10 56 22" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M21 21 Q14 14 15 6 M59 21 Q66 14 65 6" stroke="#5B2C0A" strokeWidth="0.6" fill="none" opacity="0.5" />
      {/* 얼굴 */}
      <circle cx="40" cy="34" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 앞머리 — 가르마 스윕 (fill only, 두피~눈썹 위) */}
      <path d="M23 19 Q22 26 28 24 Q32 27 37 24 Q43 27 49 24 Q54 26 57 24 Q58 22 57 19 Q40 13 23 19 Z" fill="#2D2D2D" />
      {/* 눈썹 — 강한 도전 (곡선) */}
      <path d="M29 28 Q33 25 37 27" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M43 27 Q47 25 51 28" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="34" cy="34" r="3.4" fill="#2D2D2D" />
      <circle cx="46" cy="34" r="3.4" fill="#2D2D2D" />
      <circle cx="35.3" cy="32.7" r="1.2" fill="white" />
      <circle cx="47.3" cy="32.7" r="1.2" fill="white" />
      {/* 입 — 자신감 */}
      <path d="M34 43 Q40 47 46 43" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="27" cy="40" rx="3.6" ry="2.2" fill="#F9A8D4" opacity="0.45" />
      <ellipse cx="53" cy="40" rx="3.6" ry="2.2" fill="#F9A8D4" opacity="0.45" />
      {/* 몸통 */}
      <path d="M28 53 Q26 57 26 73 L54 73 Q54 57 52 53 Q46 51 40 51 Q34 51 28 53Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 카라 + 개척자 가방끈 */}
      <path d="M36 51 L40 56 L44 51" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M34 52 L47 71" stroke="#92400E" strokeWidth="2.6" opacity="0.85" strokeLinecap="round" />
      {/* 오른팔 → 정글도 */}
      <path d="M52 57 L64 47" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="65" cy="46" r="2.6" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="61" y="44" width="6" height="3" rx="1" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" transform="rotate(-30 64 45)" />
      <path d="M62 40 L70 36 L73 43 L66 46 Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M64 40 L71 37" stroke="#E2E8F0" strokeWidth="0.6" opacity="0.8" />
      {/* 왼팔 → 나침반 */}
      <path d="M28 59 L14 52" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="51" r="2.6" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
      <circle cx="8" cy="50" r="6" fill="white" stroke="#2D2D2D" strokeWidth="1.3" />
      <circle cx="8" cy="50" r="6" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="1 2" />
      <path d="M8 44.5 L9.3 50 L8 50 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.5" />
      <path d="M8 55.5 L6.7 50 L8 50 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.5" />
      <circle cx="8" cy="50" r="1" fill="#2D2D2D" />
    </svg>
  ),
  "갑술-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 여우 귀 — 머리에 뿌리내림 */}
        <path d="M23 30 L25 9 L37 25 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M57 30 L55 9 L43 25 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M26 28 L27 14 L34 25 Z" fill="#FACC15" opacity="0.85" />
        <path d="M54 28 L53 14 L46 25 Z" fill="#FACC15" opacity="0.85" />
        {/* 여우 얼굴 */}
        <ellipse cx="40" cy="38" rx="18" ry="16" fill="#F97316" stroke="#2D2D2D" strokeWidth="2" />
        {/* 여우 주둥이 */}
        <ellipse cx="40" cy="46" rx="9" ry="6" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1" />
        {/* 눈 — 게으른 반달 */}
        <path d="M29 33 Q33 30 37 33" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="29" y="33" width="8" height="3.5" fill="#F97316" />
        <path d="M43 33 Q47 30 51 33" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="43" y="33" width="8" height="3.5" fill="#F97316" />
        {/* 코 */}
        <ellipse cx="40" cy="44" rx="2.5" ry="1.8" fill="#2D2D2D" />
        {/* 입 — 무덤덤한 */}
        <path d="M37 48 Q40 50 43 48" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="27" cy="43" rx="4" ry="2" fill="#FCA5A5" opacity="0.4" />
        <ellipse cx="53" cy="43" rx="4" ry="2" fill="#FCA5A5" opacity="0.4" />
        {/* 여우 몸통 — 얼굴과 붙임 */}
        <ellipse cx="40" cy="66" rx="15" ry="14" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 배 흰 부분 */}
        <ellipse cx="40" cy="69" rx="7.5" ry="9" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 여우 꼬리 7개 — 위에서 아래 순서 */}
        <path d="M50 68 Q58 56 60 42 Q62 30 56 26 Q52 36 54 44 Q54 58 50 66Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        <ellipse cx="57" cy="27" rx="4" ry="3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M52 70 Q64 62 68 46 Q70 36 64 32 Q60 42 62 52 Q58 64 52 68Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        <ellipse cx="65" cy="33" rx="4" ry="3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M52 72 Q66 68 70 54 Q72 44 66 40 Q62 50 64 58 Q60 68 52 70Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        <ellipse cx="68" cy="42" rx="5" ry="4" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M52 74 Q66 70 70 60 Q72 52 66 48 Q62 56 64 62 Q60 70 52 72Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        <ellipse cx="68" cy="50" rx="5" ry="4" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M54 76 Q70 74 74 64 Q76 54 70 50 Q66 60 68 66 Q64 74 54 76Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        <ellipse cx="72" cy="52" rx="5" ry="4" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M52 78 Q68 80 74 72 Q78 64 72 60 Q68 68 70 72 Q64 80 52 78Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        <ellipse cx="74" cy="62" rx="5" ry="4" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M50 80 Q66 86 72 80 Q78 72 72 68 Q68 76 68 80 Q62 86 50 82Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        <ellipse cx="73" cy="70" rx="5" ry="4" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 앞발 */}
        <ellipse cx="28" cy="80" rx="8" ry="4" fill="#F97316" stroke="#2D2D2D" strokeWidth="1" />
        <ellipse cx="52" cy="80" rx="8" ry="4" fill="#F97316" stroke="#2D2D2D" strokeWidth="1" />
    </svg>
  ),
  "을해-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 투블럭 스트레이트, 짙은 검정 */}
        <path d="M22 28 Q20 10 40 8 Q60 10 58 28" fill="#1F2937" stroke="#2D2D2D" strokeWidth="2" />
        {/* 새싹 — 머리 위에서 솟음 */}
        <rect x="38.5" y="1" width="3" height="8" rx="1.5" fill="#65A30D" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M40 5 Q35 0 31 2 Q35 6 40 5Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M40 3 Q45 -1 48 2 Q45 5 40 3Z" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1" />
        {/* 얼굴 */}
        <circle cx="40" cy="36" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="2" />
        {/* 앞머리 — 일자 뱅 (얼굴 위) */}
        <path d="M24 26 Q25 31 28 30 Q34 32 40 30 Q46 32 52 30 Q55 31 56 26 Q57 20 40 19 Q24 20 24 26 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.3" />
        <path d="M31 22 L30 30 M40 21 L40 30 M49 22 L50 30" stroke="#374151" strokeWidth="0.7" opacity="0.5" />
        {/* 눈썹 — 강한 */}
        <path d="M30 29 Q34 26 38 29" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M42 29 Q46 26 50 29" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 눈 — 날카로운 */}
        <circle cx="34" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 자신감 있는 미소 */}
        <path d="M35 41 Q40 45 45 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="39" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.25" />
        <ellipse cx="52" cy="39" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.25" />
        {/* 몸통 — 그린 재킷 */}
        <rect x="24" y="52" width="32" height="22" rx="4" fill="#065F46" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 재킷 라펠 */}
        <path d="M36 52 L40 58 L44 52" stroke="#4ADE80" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  "을해-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 나비 날개 (뒤) */}
      <path d="M34 44 Q12 30 10 14 Q26 18 36 38 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M34 50 Q14 54 12 70 Q28 66 36 54 Z" fill="#C084FC" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M46 44 Q68 30 70 14 Q54 18 44 38 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M46 50 Q66 54 68 70 Q52 66 44 54 Z" fill="#C084FC" stroke="#2D2D2D" strokeWidth="1.2" />
      <circle cx="22" cy="24" r="2.5" fill="#FBCFE8" />
      <circle cx="58" cy="24" r="2.5" fill="#FBCFE8" />
      <circle cx="22" cy="60" r="2" fill="#E9D5FF" />
      <circle cx="58" cy="60" r="2" fill="#E9D5FF" />
      {/* 머리 — 웨이브 펌 단발 (여성 템플릿2) */}
      <path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 38 60 44 Q54 50 62 54 Q66 60 58 64 Q50 68 44 65 Q40 63 36 65 Q30 68 22 64 Q14 60 18 54 Q26 50 20 44 Q14 38 18 30 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 36 Q26 33 30 36" stroke="#B45309" strokeWidth="0.9" fill="none" opacity="0.5" />
      <path d="M50 36 Q54 33 58 36" stroke="#B45309" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="34" rx="13" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 명랑 */}
      <path d="M30 28 Q33 26 36 28" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M44 28 Q47 26 50 28" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 눈 — 한쪽 윙크 (사교) */}
      <circle cx="34" cy="32" r="2.7" fill="#2D2D2D" />
      <circle cx="35" cy="31" r="1" fill="white" />
      <path d="M43.5 32 Q46 30 48.5 32" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 입 — 활짝 */}
      <path d="M33 39 Q40 45 47 39" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="29" cy="37" rx="3.4" ry="2" fill="#F9A8D4" opacity="0.55" />
      <ellipse cx="51" cy="37" rx="3.4" ry="2" fill="#F9A8D4" opacity="0.55" />
      {/* 몸통 — 주황 드레스 */}
      <path d="M28 48 Q25 54 24 70 L56 70 Q55 54 52 48 Q46 46 40 46 Q34 46 28 48Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 양팔 벌려 환영 */}
      <path d="M28 52 Q18 50 12 54" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="11" cy="54" r="2.4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <path d="M52 52 Q62 50 68 54" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="69" cy="54" r="2.4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      {/* 떠다니는 하트 (사람 연결) */}
      <path d="M16 46 C16 46 14 43.5 14 42 A1.6 1.6 0 0 1 17 41.5 A1.6 1.6 0 0 1 20 42 C20 43.5 16 46 16 46Z" fill="#E84B6A" opacity="0.6" />
      <path d="M64 46 C64 46 62 43.5 62 42 A1.6 1.6 0 0 1 65 41.5 A1.6 1.6 0 0 1 68 42 C68 43.5 64 46 64 46Z" fill="#E84B6A" opacity="0.55" />
    </svg>
  ),
  "갑신-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 새싹 — 성장 모티프 (헤어 위) */}
        <path d="M40 9 Q40 3 44 1 Q45 5 42 8Z" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
        <path d="M40 9 Q40 4 36 2 Q35 6 38 9Z" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
        {/* 머리 — 초록 헤어, closed Z path */}
        <path d="M20 30 Q18 10 40 8 Q62 10 60 30 Q58 44 54 50 Q46 56 40 56 Q34 56 26 50 Q22 44 20 30Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M20 30 Q16 36 18 44" stroke="#4ADE80" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M60 30 Q64 36 62 44" stroke="#4ADE80" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* 앞머리 결 */}
        <path d="M32 16 Q33 21 31 25" stroke="#15803D" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M48 16 Q47 21 49 25" stroke="#15803D" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="16" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 볼 반창고 — 성장통 (한 개만, 깔끔하게) */}
        <rect x="48" y="40" width="8" height="4" rx="1.5" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="0.8" transform="rotate(-18 52 42)" />
        <path d="M50 42 L54 41" stroke="#F87171" strokeWidth="1" strokeLinecap="round" />
        {/* 눈썹 강하게 */}
        <path d="M30 29 Q34 26 38 29" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M42 29 Q46 26 50 29" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* 눈 — 강한 눈빛 */}
        <circle cx="34" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="1" fill="white" />
        <circle cx="47" cy="33" r="1" fill="white" />
        {/* 입 — 씩 각오 미소 */}
        <path d="M34 43 Q40 47 46 43" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        {/* 몸통 — 나무 줄기 + 나이테 */}
        <path d="M26 52 Q24 56 24 72 L56 72 Q56 56 54 52 Q48 50 40 50 Q32 50 26 52Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M40 72 Q34 66 36 60 Q37 56 40 54" stroke="#B45309" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M40 72 Q46 66 44 60 Q43 56 40 54" stroke="#B45309" strokeWidth="1" fill="none" opacity="0.6" />
        {/* 오른팔 → 도끼 (성장을 다듬는 도구) */}
        <path d="M54 58 Q60 54 64 50" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M62 51 L70 44" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M66 39 L74 41 L72 50 L64 47 Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M67 42 L71 43" stroke="#E2E8F0" strokeWidth="0.8" opacity="0.7" />
        {/* 왼팔 → 알통 (이겨낸다 포즈) */}
        <path d="M26 58 Q20 56 18 50 Q17 46 21 46" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="22" cy="49" r="3.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M23 27 Q25 33 28 29 Q30 34 33 29 Q36 34 39 29 Q42 34 45 29 Q48 34 51 29 Q54 33 57 27 Q58 20 40 19 Q22 20 23 27 Z" fill="#4ADE80" />
    </svg>
  ),
  "갑신-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 장발 스트레이트, 금발 */}
        <path d="M18 32 Q18 10 40 8 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 왕관 */}
        <path d="M28 18 L32 10 L37 16 L40 8 L43 16 L48 10 L52 18 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 당당한 */}
        <circle cx="34" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 당당한 미소 */}
        <path d="M36 41 Q40 45 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="30" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6" />
        <ellipse cx="50" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 왼팔 — 큰 칼 잡기 */}
        <path d="M28 56 Q44 54 59 52" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 오른팔 — 큰 칼 잡기 */}
        <path d="M52 54 Q56 48 59 45" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 큰 칼 — 수직으로 */}
        {/* 칼날 */}
        <path d="M58 44 L60 2 L62 44 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="60" y1="6" x2="60" y2="40" stroke="white" strokeWidth="0.8" opacity="0.8" />
        {/* 가드 */}
        <rect x="50" y="42" width="20" height="5" rx="2" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2" />
        {/* 손잡이 */}
        <rect x="57" y="47" width="7" height="14" rx="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2" />
    </svg>
  ),
  "을유-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 머리 — 투블럭 퍼머, 남색 + 결 */}
        <path d="M22 28 Q18 18 22 12 Q28 6 40 8 Q52 6 58 12 Q62 18 58 28 Q54 22 48 26 Q44 28 40 26 Q36 24 32 26 Q26 28 22 28 Z" fill="#6366F1" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 14 Q34 19 32 23" stroke="#A5B4FC" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M47 14 Q46 19 48 23" stroke="#A5B4FC" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="16" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 앞머리 — 가르마 스윕 (얼굴 위) */}
        <path d="M24 26 Q26 30 31 28 Q38 31 46 28 Q52 30 56 25 Q57 20 40 19 Q25 20 24 26 Z" fill="#6366F1" stroke="#2D2D2D" strokeWidth="1.3" />
        <path d="M47 21 Q42 26 36 29" stroke="#4338CA" strokeWidth="0.9" fill="none" opacity="0.6" />
        {/* 눈썹 — 예리하게 각진 */}
        <path d="M29 28 Q33 26.5 37 28.5" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M43 28.5 Q47 26.5 51 28" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* 슬림 사각 안경 — 예리·꼼꼼 */}
        <path d="M28 32 L39 32 L38.5 37 L28.5 37 Z" fill="none" stroke="#2D2D2D" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M41 32 L52 32 L51.5 37 L41.5 37 Z" fill="none" stroke="#2D2D2D" strokeWidth="1.4" strokeLinejoin="round" />
        <line x1="39" y1="33" x2="41" y2="33" stroke="#2D2D2D" strokeWidth="1.2" />
        <line x1="22" y1="33" x2="28" y2="33" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
        <line x1="52" y1="33" x2="58" y2="33" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
        <path d="M28.5 33 L37 33" stroke="white" strokeWidth="0.8" opacity="0.5" />
        {/* 눈 — 또렷하고 예리한 */}
        <circle cx="33.5" cy="34.5" r="2.1" fill="#2D2D2D" />
        <circle cx="46.5" cy="34.5" r="2.1" fill="#2D2D2D" />
        <circle cx="34.4" cy="33.6" r="0.9" fill="white" />
        <circle cx="47.4" cy="33.6" r="0.9" fill="white" />
        {/* 입 — 차분한 자신감 미소 */}
        <path d="M37 45 Q40 47 43 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="27" cy="41" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.3" />
        <ellipse cx="53" cy="41" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.3" />
        {/* 몸통 — 작업 앞치마 */}
        <path d="M24 52 Q22 56 22 74 L58 74 Q58 56 56 52 Q48 50 40 50 Q32 50 24 52Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M32 51 L32 74 M48 51 L48 74" stroke="#16A34A" strokeWidth="0.8" opacity="0.5" />
        <rect x="35" y="60" width="10" height="8" rx="1" fill="#22C55E" stroke="#16A34A" strokeWidth="0.8" opacity="0.7" />
        {/* 오른팔 → 정밀 가위 */}
        <path d="M56 58 Q60 54 63 50" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M62 50 L70 42" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M64 52 L72 44" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="61" cy="49" r="2.2" fill="none" stroke="#2D2D2D" strokeWidth="1.2" />
        <circle cx="63" cy="51.5" r="2.2" fill="none" stroke="#2D2D2D" strokeWidth="1.2" />
        {/* 왼팔 → 분재 화분 (완벽주의의 작품) */}
        <path d="M24 60 Q18 60 14 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M6 66 L16 66 L14 72 L8 72 Z" fill="#B45309" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="5" y="64" width="12" height="3" rx="1" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M11 64 L11 56" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="54" r="3.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="14" cy="55" r="3" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="11.5" cy="51" r="2.8" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1" />
    </svg>
  ),
  "을유-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 중단발 웨이브, 핑크 */}
        <path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 40 60 46 Q54 52 62 58 Q64 64 58 70 Q50 74 44 72 Q40 70 36 72 Q30 74 22 70 Q16 64 18 58 Q26 52 20 46 Q14 40 18 30 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 단호한 */}
        <circle cx="34" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 미소 */}
        <path d="M36 41 Q40 44 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="30" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.65" />
        <ellipse cx="50" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.65" />
        {/* 몸통 — 꽃무늬 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 꽃 장식 */}
        <circle cx="40" cy="60" r="4" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
        <circle cx="36" cy="57" r="2.5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.6" />
        <circle cx="44" cy="57" r="2.5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.6" />
        <circle cx="40" cy="60" r="1.5" fill="#F97316" />
        {/* 작은 강철 뱃지 */}
        <path d="M10 58 L10 54 L14 52 L18 54 L18 58 L14 60 Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  ),
  "갑오-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 에너지 후광 */}
        <circle cx="40" cy="32" r="24" fill="none" stroke="#4ADE80" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 3" />
        {/* 머리카락 — closed Z, 솟구치는 헤어 */}
        <path d="M20 28 Q18 10 30 8 Q40 4 50 8 Q62 10 60 28 Q58 42 54 48 Q46 54 40 54 Q34 54 26 48 Q22 42 20 28Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M32 6 Q30 1 33 -1 Q34 3 35 7Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M40 5 Q40 -1 43 -2 Q43 2 42 6Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M48 6 Q50 1 47 -1 Q46 3 45 7Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" />
        {/* 앞머리 결 */}
        <path d="M33 12 Q34 17 32 21" stroke="#B45309" strokeWidth="0.8" fill="none" opacity="0.55" />
        <path d="M47 12 Q46 17 48 21" stroke="#B45309" strokeWidth="0.8" fill="none" opacity="0.55" />
        {/* 얼굴 */}
        <circle cx="40" cy="32" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 들뜬 */}
        <path d="M28 24 Q34 20 40 24" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M40 24 Q46 20 52 24" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* 에너지 넘치는 눈 */}
        <circle cx="34" cy="30" r="4" fill="#2D2D2D" />
        <circle cx="46" cy="30" r="4" fill="#2D2D2D" />
        <circle cx="35.5" cy="28.5" r="1.5" fill="white" opacity="0.9" />
        <circle cx="47.5" cy="28.5" r="1.5" fill="white" opacity="0.9" />
        {/* 입 — 와아! 입꼬리 위로 */}
        <path d="M30 39 Q40 50 50 39" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="26" cy="36" rx="4.5" ry="2.5" fill="#F9A8D4" opacity="0.5" />
        <ellipse cx="54" cy="36" rx="4.5" ry="2.5" fill="#F9A8D4" opacity="0.5" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#D1FAE5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 팔 벌린 포즈 */}
        <path d="M28 56 L11 46" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M52 56 L69 46" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="9" cy="45" r="2.6" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        <circle cx="71" cy="45" r="2.6" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
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
  "갑오-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 스피드 라인 (뒤=왼쪽) */}
      <path d="M4 32 L16 33 M1 40 L13 40 M4 48 L16 47" stroke="#4ADE80" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
      {/* 흩날리는 머리 (뒤로) */}
      <path d="M32 24 Q14 18 4 26 Q15 27 9 32 Q20 31 13 38 Q24 36 30 33 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.3" strokeLinejoin="round" />
      {/* 머리 캡 */}
      <path d="M31 26 Q31 14 44 13 Q57 14 56 28 Q56 30 54 31 Q44 28 33 31 Q30 29 31 26Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.3" />
      {/* 얼굴 (앞으로 기울임) */}
      <ellipse cx="45" cy="33" rx="13" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 신나서 올라간 */}
      <path d="M39 28 Q42 26 45 28" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M49 28 Q52 26 55 28" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* 눈 — 앞만 보고 돌진 */}
      <circle cx="43" cy="32" r="2.7" fill="#2D2D2D" />
      <circle cx="53" cy="32" r="2.7" fill="#2D2D2D" />
      <circle cx="44" cy="31" r="1" fill="white" />
      <circle cx="54" cy="31" r="1" fill="white" />
      {/* 입 — 신나서 벌린 */}
      <path d="M42 38 Q46 42 51 38" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="40" cy="37" rx="3" ry="1.8" fill="#F9A8D4" opacity="0.5" />
      <ellipse cx="54" cy="36" rx="3" ry="1.8" fill="#F9A8D4" opacity="0.5" />
      {/* 몸통 — 앞으로 돌진 (초록 트랙수트) */}
      <path d="M36 47 Q31 55 33 65 Q44 69 54 63 Q57 54 52 47 Q44 44 36 47Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M43 47 L46 60" stroke="#22C55E" strokeWidth="1.2" opacity="0.5" />
      {/* 앞팔 (앞으로 쭉) */}
      <path d="M51 50 Q59 49 63 45" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="64" cy="44" r="2.4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      {/* 뒷팔 (뒤로 펌핑) */}
      <path d="M36 52 Q30 55 28 51" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="27" cy="50" r="2.4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      {/* 달리는 다리 */}
      <path d="M41 65 Q38 71 34 73" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M50 65 Q53 70 51 74" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="33" cy="74" rx="3.6" ry="2" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1" />
      <ellipse cx="51" cy="75" rx="3.6" ry="2" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1" />
      {/* 로켓 화염 — 양발 */}
      <path d="M32 76 Q26 80 24 88 Q29 83 32 83 Q27 86 30 89 Q35 82 35 77Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="0.7" strokeLinejoin="round" opacity="0.9" />
      <path d="M30 78 Q27 81 29 85 Q32 81 32 78Z" fill="#FACC15" />
      <path d="M50 77 Q44 81 42 88 Q47 84 50 84 Q45 87 48 89 Q53 83 53 78Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="0.7" strokeLinejoin="round" opacity="0.9" />
      <path d="M48 79 Q45 82 47 86 Q50 82 50 79Z" fill="#FACC15" />
    </svg>
  ),
  "을미-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 황금 후광 */}
        <circle cx="40" cy="30" r="22" stroke="#FACC15" strokeWidth="2" fill="none" opacity="0.5" />
        <circle cx="40" cy="30" r="18" stroke="#FDE68A" strokeWidth="0.8" fill="none" opacity="0.3" />
        {/* 민머리 — 둥글고 매끈하게 */}
        <ellipse cx="40" cy="32" rx="16" ry="18" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 정수리 돌기 (육계) */}
        <ellipse cx="40" cy="16" rx="5" ry="4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        {/* 이마 백호 (bindi) */}
        <circle cx="40" cy="24" r="2" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.6" opacity="0.85" />
        {/* 눈 — 명상 중 반쯤 감긴 */}
        <path d="M32 32 Q36 30 40 32" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M40 32 Q44 30 48 32" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M32 33.5 Q36 34.5 40 33.5" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.35" />
        <path d="M40 33.5 Q44 34.5 48 33.5" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.35" />
        {/* 눈썹 — 부드럽게 */}
        <path d="M30 28 Q34 26 38 28" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M42 28 Q46 26 50 28" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 입 — 온화한 미소 */}
        <path d="M35 40 Q40 44 45 40" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="30" cy="36" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.3" />
        <ellipse cx="50" cy="36" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.3" />
        {/* 법복 — 주황색 가사 */}
        <path d="M24 50 Q20 54 20 72 L60 72 Q60 54 56 50 Q50 48 40 48 Q30 48 24 50Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 법복 주름 */}
        <path d="M24 52 Q30 50 38 52" stroke="#EA580C" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M40 50 Q38 60 38 72" stroke="#EA580C" strokeWidth="0.8" opacity="0.25" fill="none" />
        {/* 선정인 — 배 위에 두 손 포개기 */}
        <ellipse cx="34" cy="64" rx="8" ry="5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        <ellipse cx="46" cy="64" rx="8" ry="5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M36 60 Q40 58 44 60" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4" />
        {/* 연꽃 장식 */}
        <path d="M30 80 Q35 73 40 77 Q45 73 50 80 Q45 87 40 83 Q35 87 30 80Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M34 80 Q37 75 40 78 Q43 75 46 80 Q43 85 40 82 Q37 85 34 80Z" fill="#F472B6" opacity="0.55" />
        <circle cx="40" cy="80" r="2" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
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
  "갑진-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 머리 — 투블럭 스트레이트, 검정 */}
        <path d="M22 28 Q20 10 40 8 Q60 10 58 28" fill="#1F2937" stroke="#2D2D2D" strokeWidth="2" />
        {/* 얼굴 — 남성 circle */}
        <circle cx="40" cy="36" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 앞머리 — 더벅 (얼굴 위) */}
        <path d="M23 26 Q25 32 28 28 Q30 33 33 28 Q36 33 39 28 Q42 33 45 28 Q48 33 51 28 Q54 32 57 26 Q58 19 40 18 Q22 19 23 26 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.3" />
        {/* 눈 — 멀리 보는 눈빛 */}
        <circle cx="34" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="35.2" cy="33" r="1" fill="white" />
        <circle cx="47.2" cy="33" r="1" fill="white" />
        {/* 눈썹 — 강하게 */}
        <line x1="29" y1="28" x2="37" y2="27" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        <line x1="43" y1="27" x2="51" y2="28" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        {/* 입 — 자신있는 미소 */}
        <path d="M34 42 Q40 46 46 42" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* 몸통 */}
        <rect x="24" y="52" width="32" height="22" rx="4" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 오른팔 — 청사진 두루마리 */}
        <path d="M56 58 Q64 54 68 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="62" y="54" width="14" height="10" rx="1" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="1.2" />
        <line x1="64" y1="57" x2="74" y2="57" stroke="#2563EB" strokeWidth="0.8" />
        <line x1="64" y1="59" x2="74" y2="59" stroke="#2563EB" strokeWidth="0.8" />
        <line x1="64" y1="61" x2="70" y2="61" stroke="#2563EB" strokeWidth="0.8" />
        {/* 왼팔 — 건물 스케치 */}
        <path d="M24 58 Q14 54 8 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="2" y="48" width="12" height="18" rx="1" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
        {/* 건물들 */}
        <rect x="4" y="54" width="3" height="12" rx="0.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.6" />
        <rect x="8" y="51" width="3" height="15" rx="0.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.6" />
        <path d="M4 54 L5.5 51 L7 54" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.4" />
    </svg>
  ),
  "갑진-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 장발 스트레이트, 초록 */}
        <path d="M18 32 Q18 10 40 8 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈썹 — 결의 (안쪽으로 힘) */}
        <path d="M29 28 Q33 26.5 37 28.5" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M43 28.5 Q47 26.5 51 28" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 눈 — 끝을 보는 또렷한 눈빛 */}
        <circle cx="34" cy="34" r="2.9" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.9" fill="#2D2D2D" />
        <circle cx="35.2" cy="32.8" r="1.2" fill="white" />
        <circle cx="47.2" cy="32.8" r="1.2" fill="white" />
        <circle cx="33" cy="35.2" r="0.6" fill="white" opacity="0.7" />
        <circle cx="45" cy="35.2" r="0.6" fill="white" opacity="0.7" />
        {/* 입 — 자신있게 한쪽 올린 미소 */}
        <path d="M35 43 Q39 46 45 42" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="30" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.55" />
        <ellipse cx="50" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.55" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 몸통 글자 '끝' */}
        <text x="40" y="65" textAnchor="middle" fill="#1F2937" fontSize="11" fontWeight="bold" fontFamily="sans-serif">끝</text>
        {/* 새싹 소품 — 성장 */}
        <rect x="54" y="56" width="3" height="16" rx="1.5" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M55.5 60 Q62 54 66 58 Q62 60 55.5 60Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M55.5 56 Q50 50 46 54 Q50 56 55.5 56Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" />
    </svg>
  ),
  "을사-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 머리카락 — 크라운 캡 */}
      <path d="M22 31 Q20 13 40 11 Q60 13 58 31 Z" fill="#2D2D2D" />
      {/* 얼굴 */}
      <circle cx="40" cy="38" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 앞머리 — 가르마 스윕 (fill only) */}
      <path d="M23 20 Q22 27 28 25 Q33 28 39 25 Q45 28 51 25 Q56 27 57 25 Q58 23 57 20 Q40 14 23 20 Z" fill="#2D2D2D" />
      <path d="M26 18 Q31 15 37 17" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* 눈썹 — 여유 */}
      <path d="M29 32 Q33 30 37 32" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M43 32 Q47 30 51 32" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* 선글라스 */}
      <rect x="28" y="35" width="10" height="6.5" rx="3" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="42" y="35" width="10" height="6.5" rx="3" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.2" />
      <line x1="38" y1="38" x2="42" y2="38" stroke="#2D2D2D" strokeWidth="1.2" />
      <line x1="22" y1="38" x2="28" y2="37" stroke="#2D2D2D" strokeWidth="1.2" />
      <line x1="52" y1="37" x2="58" y2="38" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M30 37 L33 38" stroke="white" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <path d="M44 37 L47 38" stroke="white" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      {/* 입 — 자신만만 */}
      <path d="M35 48 Q40 51 45 48" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="28" cy="45" rx="3.2" ry="1.9" fill="#F9A8D4" opacity="0.45" />
      <ellipse cx="52" cy="45" rx="3.2" ry="1.9" fill="#F9A8D4" opacity="0.45" />
      {/* 몸통 */}
      <path d="M28 56 Q26 60 26 72 L54 72 Q54 60 52 56 Q46 54 40 54 Q34 54 28 56Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M36 54 L40 59 L44 54" stroke="#2D2D2D" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      {/* 왼팔 — 손을 머리에 (쿨 포즈) */}
      <path d="M28 60 Q22 52 26 46" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="26" cy="43" rx="4" ry="5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 오른팔 — 폰 셀카 */}
      <path d="M52 60 Q62 55 66 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="64" cy="57" r="2.4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <rect x="64" y="50" width="10" height="14" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="65.5" y="52" width="7" height="9" rx="0.5" fill="#60A5FA" />
      <circle cx="69" cy="62.5" r="1" fill="#2D2D2D" />
      <path d="M18 32 L19.5 36 L23.5 37.5 L19.5 39 L18 43 L16.5 39 L12.5 37.5 L16.5 36 Z" fill="#FACC15" opacity="0.5" />
    </svg>
  ),
  "을사-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 꽃 머리장식 */}
      <circle cx="52" cy="12" r="6" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" />
      <circle cx="48" cy="8" r="4" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="56" cy="8" r="4" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="52" cy="5" r="4" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="52" cy="10" r="3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
      {/* 헤어 — 중단발 슬레이트 */}
      <path d="M18 32 Q18 10 40 8 Q62 10 62 32 L62 62 Q56 72 46 70 Q40 68 34 70 Q24 72 18 62 Z" fill="#374151" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 속눈썹 */}
      <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 눈 — 둥글고 환한 (표정 변경) */}
      <circle cx="34" cy="34" r="3" fill="#2D2D2D" />
      <circle cx="46" cy="34" r="3" fill="#2D2D2D" />
      <circle cx="35.2" cy="32.9" r="1.2" fill="white" />
      <circle cx="47.2" cy="32.9" r="1.2" fill="white" />
      {/* 눈썹 — 섬세하게 */}
      <path d="M29 28 Q34 26 38 28" stroke="#2D2D2D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M42 28 Q46 26 51 28" stroke="#2D2D2D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* 입 — 우아한 미소 (유지) */}
      <path d="M34 43 Q40 48 46 43" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="27" cy="39" rx="3.8" ry="2" fill="#F9A8D4" opacity="0.45" />
      <ellipse cx="53" cy="39" rx="3.8" ry="2" fill="#F9A8D4" opacity="0.45" />
      {/* 몸통 — 꽃 무늬 원피스 */}
      <path d="M26 52 Q22 56 20 74 L60 74 Q58 56 54 52 Q46 50 40 50 Q34 50 26 52Z" fill="#D1FAE5" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="40" cy="62" r="3" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.6" />
      <circle cx="36" cy="57" r="2" fill="#F472B6" stroke="#2D2D2D" strokeWidth="0.5" />
      <circle cx="44" cy="67" r="2" fill="#F472B6" stroke="#2D2D2D" strokeWidth="0.5" />
      <circle cx="40" cy="61.5" r="1" fill="#FDE68A" />
      {/* 오른팔 — 부드러운 한 방 */}
      <path d="M54 56 Q64 48 68 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="65" y="40" width="10" height="8" rx="2" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M75 37 L78 33 L80 35" stroke="#F9A8D4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* 왼팔 — 여유 */}
      <path d="M26 58 Q16 56 12 52" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  "갑인-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 투구 — 회색 갑옷 헬멧 */}
        <path d="M18 36 Q16 14 40 10 Q64 14 62 36" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="2" />
        <rect x="14" y="34" width="52" height="8" rx="2" fill="#64748B" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="40" y1="10" x2="40" y2="34" stroke="#475569" strokeWidth="1.5" opacity="0.6" />
        {/* 얼굴 */}
        <circle cx="40" cy="46" r="13" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈 — 강인한 */}
        <circle cx="35" cy="44" r="2.5" fill="#2D2D2D" />
        <circle cx="45" cy="44" r="2.5" fill="#2D2D2D" />
        <circle cx="36" cy="43" r="1" fill="white" />
        <circle cx="46" cy="43" r="1" fill="white" />
        {/* 눈썹 — 인상 */}
        <line x1="30" y1="40" x2="38" y2="41" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="41" x2="50" y2="40" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        {/* 입 — 굳건한 다문 */}
        <line x1="35" y1="51" x2="45" y2="51" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        {/* 갑옷 몸통 */}
        <rect x="24" y="60" width="32" height="22" rx="4" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="2" />
        <line x1="40" y1="60" x2="40" y2="82" stroke="#64748B" strokeWidth="1.5" />
        <path d="M28 66 Q40 72 52 66" stroke="#64748B" strokeWidth="1.2" fill="none" />
        {/* 어깨 보호대 */}
        <path d="M16 60 Q14 66 18 70 L24 68 L24 60 Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M64 60 Q66 66 62 70 L56 68 L56 60 Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 팔 벌려 막는 자세 */}
        <path d="M24 64 L8 54" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
        <path d="M56 64 L72 54" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
        {/* 방패 — 왼팔 */}
        <path d="M2 44 Q2 32 8 30 Q14 32 14 44 Q14 56 8 62 Q2 56 2 44Z" fill="#64748B" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="8" y1="32" x2="8" y2="60" stroke="#2D2D2D" strokeWidth="1" opacity="0.5" />
        <path d="M5 44 Q8 40 11 44 Q8 48 5 44Z" fill="white" opacity="0.3" />
    </svg>
  ),
  "갑인-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 망토 (뒤) */}
      <path d="M30 30 Q8 38 10 64 Q18 56 24 58 Q16 66 22 74 Q34 60 38 46 Z" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.3" strokeLinejoin="round" />
      {/* 헤어 — 병신-f 장발 스트레이트 빨강 (그대로 이식) */}
      <path d="M18 32 Q18 10 40 8 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 병신-f */}
      <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 눈 — 열정 반짝 */}
      <circle cx="34" cy="34" r="2.5" fill="#2D2D2D" />
      <circle cx="46" cy="34" r="2.5" fill="#2D2D2D" />
      <circle cx="35" cy="33" r="0.8" fill="white" />
      <circle cx="47" cy="33" r="0.8" fill="white" />
      {/* 입 — 활짝 웃는 */}
      <path d="M33 42 Q40 48 47 42" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="28" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6" />
      <ellipse cx="52" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6" />
      {/* 몸통 — 히어로 수트 */}
      <path d="M28 50 Q26 56 26 72 L54 72 Q54 56 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#2563EB" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 가슴 번개 엠블럼 */}
      <path d="M41 53 L37 60 L40 60 L38 66 L45 58 L42 58 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
      {/* 허리 벨트 */}
      <path d="M27 64 L53 64" stroke="#FACC15" strokeWidth="1.6" opacity="0.7" />
      {/* 든 주먹 (정의!) */}
      <path d="M52 52 Q58 46 57 38" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="57" cy="35" r="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M55 31.5 L55 33.5 M58 31.5 L58 33.5" stroke="#2D2D2D" strokeWidth="0.7" strokeLinecap="round" />
      {/* 번개 (주먹 위) */}
      <path d="M63 25 L59 33 L63 32 L58 42" stroke="#FACC15" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* 허리 손 */}
      <path d="M28 56 Q23 58 25 62" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="62" r="2.6" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
    </svg>
  ),
  "을묘-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 머리 — 다크 웨이브 (아티스트) */}
      <path d="M22 30 Q20 14 40 12 Q60 14 58 30 Q57 41 54 47 Q47 51 40 51 Q33 51 26 47 Q23 41 22 30Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M26 24 Q32 20 38 22" stroke="#374151" strokeWidth="1" fill="none" opacity="0.5" />
      {/* 베레모 */}
      <ellipse cx="40" cy="17" rx="18" ry="6" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 17 Q22 8 40 8 Q58 8 58 17" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="40" cy="8" r="3" fill="#2D2D2D" />
      {/* 얼굴 */}
      <circle cx="40" cy="38" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 감성 */}
      <path d="M30 33 Q34 31 38 33" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M42 33 Q46 31 50 33" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      {/* 눈 — 반짝 감성 */}
      <circle cx="34" cy="37" r="2.8" fill="#2D2D2D" />
      <circle cx="46" cy="37" r="2.8" fill="#2D2D2D" />
      <circle cx="35.2" cy="35.9" r="1.1" fill="white" />
      <circle cx="47.2" cy="35.9" r="1.1" fill="white" />
      {/* 입 — 우아한 미소 */}
      <path d="M35 44 Q40 48 45 44" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="28" cy="42" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.45" />
      <ellipse cx="52" cy="42" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.45" />
      {/* 몸통 — 줄무늬 아티스트 셔츠 */}
      <path d="M26 53 Q24 57 24 73 L56 73 Q56 57 54 53 Q47 51 40 51 Q33 51 26 53Z" fill="#F1F5F9" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M24 58 L56 58 M24 63 L56 63 M24 68 L56 68" stroke="#2D2D2D" strokeWidth="1.1" opacity="0.55" />
      <path d="M35 52 L40 57 L45 52" stroke="#94A3B8" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      {/* 왼팔 → 그림판(캔버스) 듦 */}
      <path d="M28 60 L22 62" stroke="#2D2D2D" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="21" cy="62" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <g transform="rotate(-8 13 60)">
        <rect x="3" y="48" width="20" height="24" rx="1.5" fill="#A8743A" stroke="#2D2D2D" strokeWidth="1.5" />
        <rect x="5.5" y="50.5" width="15" height="19" rx="0.5" fill="#FFFDF7" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M7 60 Q11 54 15 60 Q18 64 19 58" stroke="#F9A8D4" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M7 64 Q12 60 18 64" stroke="#60A5FA" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="9" cy="55" r="1.6" fill="#FACC15" />
        <path d="M14 54 L20 53" stroke="#4ADE80" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      {/* 오른팔 → 붓 (올려서 페인트) */}
      <path d="M52 58 Q60 54 64 48" stroke="#2D2D2D" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="65" cy="47" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <line x1="66" y1="46" x2="72" y2="36" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M70 36 L73 41 L75 35 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
      <circle cx="73" cy="44" r="1" fill="#60A5FA" opacity="0.8" />
      {/* 페인트 방울 + 반짝 */}
      <circle cx="57" cy="63" r="1.4" fill="#F9A8D4" opacity="0.65" />
      <circle cx="61" cy="68" r="1" fill="#FACC15" opacity="0.65" />
      <path d="M70 26 L71.5 30 L75.5 31.5 L71.5 33 L70 37 L68.5 33 L64.5 31.5 L68.5 30 Z" fill="#FACC15" opacity="0.4" />
    </svg>
  ),
  "을묘-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 장발 웨이브 퍼머 — 보라색 */}
        <path d="M16 30 Q16 8 40 6 Q64 8 64 30 Q68 42 62 50 Q56 58 64 66 Q68 74 62 80 Q54 86 46 82 Q40 80 34 82 Q26 86 18 80 Q12 74 16 66 Q24 58 18 50 Q12 42 16 30 Z" fill="#A855F7" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 꽃 헤어핀 */}
        <circle cx="62" cy="26" r="5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="62" cy="26" r="2.5" fill="#F97316" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="34" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 */}
        <circle cx="34" cy="32" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="32" r="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="31" r="1" fill="white" />
        <circle cx="47" cy="31" r="1" fill="white" />
        {/* 입 */}
        <path d="M36 39 Q40 43 44 39" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="29" cy="37" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.7" />
        <ellipse cx="51" cy="37" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.7" />
        {/* 몸통 — 청록 */}
        <path d="M28 50 Q26 54 26 70 L54 70 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#2DD4BF" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 붓 */}
        <line x1="14" y1="52" x2="14" y2="76" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 76 L14 84 L16 76" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
        {/* 팔레트 — 알록달록 */}
        <ellipse cx="67" cy="65" rx="11" ry="8" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="63" cy="63" r="2.5" fill="#F87171" />
        <circle cx="68" cy="61" r="2.5" fill="#4ADE80" />
        <circle cx="72" cy="64" r="2.5" fill="#60A5FA" />
        <circle cx="67" cy="68" r="2.5" fill="#C084FC" />
    </svg>
  ),
  "병인-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      <path d="M22 30 Q20 12 40 10 Q60 12 58 30 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 앞머리 더벅 */}
      <path d="M23 31 Q25 36 28 32 Q31 37 34 32 Q37 37 40 32 Q43 37 46 32 Q49 37 52 32 Q55 36 57 31 Q59 19 40 18 Q21 19 23 31 Z" fill="#1F2937" />
      {/* 빨간 머리띠 */}
      <path d="M20 28 L60 28" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 28 L13 25 M20 28 L13 31" stroke="#EF4444" strokeWidth="2.4" strokeLinecap="round" />
      {/* 눈썹 — 불타는 */}
      <path d="M28 33 Q33 30 37 33" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M43 33 Q47 30 52 33" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="34" cy="38" r="3" fill="#2D2D2D" />
      <circle cx="46" cy="38" r="3" fill="#2D2D2D" />
      <circle cx="35.2" cy="37" r="1.2" fill="white" />
      <circle cx="47.2" cy="37" r="1.2" fill="white" />
      {/* 입 — 외치는 (stroke만) */}
      <path d="M35 47 L40 45 L45 47" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="27" cy="44" rx="3.5" ry="1.8" fill="#F87171" opacity="0.4" />
      <ellipse cx="53" cy="44" rx="3.5" ry="1.8" fill="#F87171" opacity="0.4" />
      {/* 몸통 — 레드 재킷 + 카라 */}
      <path d="M24 54 Q22 58 22 76 L58 76 Q58 58 56 54 Q48 52 40 52 Q32 52 24 54Z" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M36 53 L40 59 L44 53" stroke="#FCA5A5" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      {/* 오른팔 ↑ → 돌격 깃발 */}
      <path d="M56 60 Q60 54 62 49" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="63" y1="50" x2="65" y2="24" stroke="#92400E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M65 26 L77 30 L65 36 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      {/* 왼팔 → 주먹 */}
      <path d="M24 60 Q18 58 15 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="61" r="3.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
    </svg>
  ),
  "병인-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* === HAIR FIRST — prevents triangles === */}
        {/* Top of head */}
        <path d="M22 28 Q22 10 40 8 Q58 10 58 28" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* Left twin tail going down */}
        <path d="M20 28 Q12 40 14 62 Q16 70 20 68 Q26 64 22 52 Q20 40 22 30 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* Right twin tail */}
        <path d="M60 28 Q68 40 66 62 Q64 70 60 68 Q54 64 58 52 Q60 40 58 30 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* Fire tips on left tail */}
        <path d="M14 62 Q10 72 14 76 Q18 72 16 64 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
        <path d="M12 64 Q8 70 11 73 Q14 70 13 65 Z" fill="#FACC15" opacity="0.8"/>
        {/* Fire tips on right tail */}
        <path d="M66 62 Q70 72 66 76 Q62 72 64 64 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
        <path d="M68 64 Q72 70 69 73 Q66 70 67 65 Z" fill="#FACC15" opacity="0.8"/>
        {/* Hair ties */}
        <circle cx="21" cy="30" r="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
        <circle cx="59" cy="30" r="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
        {/* === FACE — drawn AFTER hair, covers center naturally === */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 속눈썹 */}
        <path d="M31 30 Q34 28 37 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M43 30 Q46 28 49 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 눈썹 — 신나게 위로 */}
        <path d="M29 28 Q33 25 37 28" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M43 28 Q47 25 51 28" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* 눈 — 신나서 활짝 뜬 눈 */}
        <circle cx="34" cy="33" r="3" fill="#2D2D2D"/>
        <circle cx="46" cy="33" r="3" fill="#2D2D2D"/>
        <circle cx="35.2" cy="31.8" r="1.2" fill="white"/>
        <circle cx="47.2" cy="31.8" r="1.2" fill="white"/>
        {/* 볼터치 — 선명한 핑크 */}
        <ellipse cx="28" cy="39" rx="5" ry="3" fill="#F9A8D4" opacity="0.7"/>
        <ellipse cx="52" cy="39" rx="5" ry="3" fill="#F9A8D4" opacity="0.7"/>
        {/* 입 — 활짝 웃음 */}
        <path d="M33 41 Q40 47 47 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 몸통 — 여성스러운 실루엣 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 팔 — 양 팔 번쩍 들기 */}
        <path d="M28 55 Q18 47 10 42" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M52 55 Q62 47 70 42" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        {/* 손 — 반짝 */}
        <circle cx="10" cy="41" r="3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
        <circle cx="70" cy="41" r="3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 불꽃 이펙트 — 손 주변 */}
        <path d="M6 38 C6 38 4 35 4 33 A2 2 0 0 1 8 33 C8 35 6 38 6 38Z" fill="#FACC15" opacity="0.6"/>
        <path d="M74 38 C74 38 72 35 72 33 A2 2 0 0 1 76 33 C76 35 74 38 74 38Z" fill="#FACC15" opacity="0.6"/>
    </svg>
  ),
  "정묘-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 머리카락 — 포마드 퀴프, 버건디 (cap-Z) */}
        <path d="M22 28 Q20 16 24 10 Q30 5 40 5 Q50 5 56 10 Q60 16 58 28 Z" fill="#9F1239" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 얼굴 */}
        <circle cx="40" cy="36" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 앞머리 — 컬 펌 (fill only) */}
        <path d="M24 26 Q27 31 31 28 Q34 31 38 28 Q42 31 46 28 Q50 31 53 28 Q56 30 56 26 Q57 20 40 19 Q24 20 24 26 Z" fill="#9F1239"/>
        {/* 눈썹 — 부드러운 볼매 */}
        <path d="M30 30 Q33 28 36 30" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
        <path d="M44 30 Q47 28 50 30" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
        {/* 눈 — 동그란 */}
        <circle cx="34" cy="34" r="2.5" fill="#2D2D2D"/>
        <circle cx="46" cy="34" r="2.5" fill="#2D2D2D"/>
        <circle cx="34.8" cy="33.2" r="1" fill="white"/>
        <circle cx="46.8" cy="33.2" r="1" fill="white"/>
        {/* 입 — 여유있는 볼매 미소 */}
        <path d="M35 43 Q40 47 45 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 볼터치 — 볼매 */}
        <ellipse cx="27" cy="41" rx="4" ry="2.3" fill="#E84B6A" opacity="0.5"/>
        <ellipse cx="53" cy="41" rx="4" ry="2.3" fill="#E84B6A" opacity="0.5"/>
        {/* 몸통 — 부드럽게 */}
        <path d="M26 52 Q24 56 24 74 L56 74 Q56 56 54 52 Q47 50 40 50 Q33 50 26 52Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
        <path d="M34 51 L40 56 L46 51" stroke="#FECACA" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        {/* 왼팔 — 편안 */}
        <path d="M26 58 Q20 59 17 63" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <circle cx="16" cy="64" r="2.4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1"/>
        {/* 오른팔 → 촛불 듦 */}
        <path d="M54 58 Q60 57 63 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <circle cx="63" cy="61" r="2.4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1"/>
        <rect x="60.5" y="49" width="5" height="12" rx="1" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1"/>
        <path d="M63 49 C61 46 60 43 63 41 C66 43 65 46 63 49 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8"/>
        <circle cx="63" cy="45" r="4" fill="#FACC15" opacity="0.25"/>
        {/* 볼매 하트 */}
        <path d="M11 40 C11 40 9 38 9 36.5 A1.6 1.6 0 0 1 12 36 A1.6 1.6 0 0 1 15 36.5 C15 38 11 40 11 40Z" fill="#E84B6A" opacity="0.45"/>
        <path d="M70 32 C70 32 68.8 30.8 68.8 29.8 A1 1 0 0 1 70.8 29.4 A1 1 0 0 1 71.6 29.8 C71.6 30.8 70 32 70 32Z" fill="#E84B6A" opacity="0.35"/>
    </svg>
  ),
  "정묘-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 달 머리장식 — 먼저 */}
        <path d="M36 8 Q32 2 36 0 Q44 2 42 10 Q38 8 36 8Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.2" />
        <circle cx="38" cy="5" r="1.2" fill="#2D2D2D" />
        {/* 헤어 — 장발 스트레이트, 검정 (닫힌 Z) */}
        <path d="M18 30 Q18 10 40 8 Q62 10 62 30 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="34" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="2" />
        {/* 속눈썹 */}
        <path d="M31 29 Q34 27 37 29" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 29 Q46 27 49 29" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 집중하는 눈 — 가늘게 */}
        <ellipse cx="34" cy="33" rx="3.5" ry="2" fill="#2D2D2D" />
        <ellipse cx="46" cy="33" rx="3.5" ry="2" fill="#2D2D2D" />
        <circle cx="35" cy="32.2" r="0.9" fill="white" opacity="0.7" />
        <circle cx="47" cy="32.2" r="0.9" fill="white" opacity="0.7" />
        {/* 눈썹 — 몰두, 더 강하게 */}
        <path d="M29 27 Q34 24 38 27" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M42 27 Q46 24 51 27" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* 입 — 꼭 다문 */}
        <path d="M35 42 L45 42" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="27" cy="38" rx="3.5" ry="1.8" fill="#F9A8D4" opacity="0.4" />
        <ellipse cx="53" cy="38" rx="3.5" ry="1.8" fill="#F9A8D4" opacity="0.4" />
        {/* 몸통 */}
        <rect x="27" y="50" width="26" height="22" rx="5" fill="#FEE2E2" stroke="#2D2D2D" strokeWidth="2" />
        {/* 책/노트 — 앞으로 숙임 */}
        <rect x="10" y="56" width="18" height="22" rx="3" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="13" y1="62" x2="25" y2="62" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="13" y1="66" x2="25" y2="66" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="13" y1="70" x2="22" y2="70" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 연필 */}
        <rect x="29" y="52" width="3" height="14" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" transform="rotate(-15 30 60)" />
        {/* 흐릿한 배경 효과 — 머리 주변 */}
        <circle cx="60" cy="30" r="5" fill="#FACC15" opacity="0.25" />
        <circle cx="15" cy="50" r="4" fill="#F87171" opacity="0.2" />
    </svg>
  ),
  "병자-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 불사조 — 회복력 치트키 (잿더미에서 부활) */}
      {/* 꼬리 깃 (불꽃) — 뒤 */}
      <path d="M40 68 Q26 78 19 69 Q25 65 31 67 Q24 59 29 54 Q34 61 40 63 Q46 61 51 54 Q56 59 49 67 Q55 65 61 69 Q54 78 40 68Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M40 68 Q33 73 29 68 Q33 64 40 66 Q47 64 51 68 Q47 73 40 68Z" fill="#FACC15" opacity="0.85" />
      {/* 날개 */}
      <path d="M28 50 Q13 47 9 58 Q18 57 22 53 Q17 62 24 61 Q26 55 32 53Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M52 50 Q67 47 71 58 Q62 57 58 53 Q63 62 56 61 Q54 55 48 53Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      {/* 몸 */}
      <ellipse cx="40" cy="50" rx="14" ry="16" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
      <ellipse cx="40" cy="54" rx="8" ry="10" fill="#FED7AA" stroke="#2D2D2D" strokeWidth="0.7" />
      {/* 머리 */}
      <circle cx="40" cy="29" r="11" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 볏 (불꽃 crest) */}
      <path d="M40 18 Q37 9 41 5 Q44 9 42 14Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
      <path d="M40 18 Q45 10 49 8 Q47 15 43 16Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
      <path d="M40 18 Q35 10 31 8 Q33 15 37 16Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
      {/* 눈썹 — 신난 */}
      <path d="M31 24 Q34 22 37 24" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M43 24 Q46 22 49 24" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* 눈 — 반짝 */}
      <circle cx="35" cy="29" r="2.6" fill="#2D2D2D" />
      <circle cx="45" cy="29" r="2.6" fill="#2D2D2D" />
      <circle cx="36" cy="28" r="1.1" fill="white" />
      <circle cx="46" cy="28" r="1.1" fill="white" />
      {/* 부리 */}
      <path d="M37 32 L40 36.5 L43 32 Q40 33.5 37 32Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
      {/* 볼터치 */}
      <ellipse cx="31" cy="33" rx="2.6" ry="1.5" fill="#EF4444" opacity="0.4" />
      <ellipse cx="49" cy="33" rx="2.6" ry="1.5" fill="#EF4444" opacity="0.4" />
      {/* 다리 */}
      <line x1="35" y1="64" x2="34" y2="71" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="64" x2="46" y2="71" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      <path d="M31 72 L37 72 M43 72 L49 72" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
      {/* 부활 잿불 스파크 */}
      <circle cx="24" cy="76" r="1.2" fill="#FACC15" opacity="0.8" />
      <circle cx="56" cy="74" r="1" fill="#F97316" opacity="0.7" />
      <circle cx="50" cy="80" r="0.8" fill="#FACC15" opacity="0.6" />
    </svg>
  ),
  "병자-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 헤어 — 장발 불꽃 머리 (유지) */}
      <path d="M22 32 Q18 20 28 14 Q32 10 36 16 Q38 8 42 14 Q46 8 48 16 Q52 10 56 18 Q62 24 58 32 L62 62 Q56 72 48 70 Q40 68 32 70 Q24 72 18 62 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M30 16 Q32 10 34 16" fill="#FACC15" stroke="none" />
      <path d="M42 12 Q44 6 46 12" fill="#FACC15" stroke="none" />
      {/* 얼굴 (유지) */}
      <ellipse cx="40" cy="40" rx="14" ry="13" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 속눈썹 (유지) */}
      <path d="M31 35 Q34 33 37 35" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M43 35 Q46 33 49 35" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 눈 — 열정 큰 눈 (유지) */}
      <circle cx="34" cy="38" r="3.5" fill="#2D2D2D" />
      <circle cx="46" cy="38" r="3.5" fill="#2D2D2D" />
      <circle cx="35.5" cy="37" r="1.2" fill="white" />
      <circle cx="47.5" cy="37" r="1.2" fill="white" />
      {/* 입 — 열정 벌린 (유지) */}
      <ellipse cx="40" cy="47" rx="4" ry="2.5" fill="#2D2D2D" />
      <ellipse cx="40" cy="46.5" rx="2.5" ry="1" fill="#F87171" />
      {/* 볼터치 (유지) */}
      <ellipse cx="27" cy="43" rx="3" ry="1.5" fill="#FB923C" opacity="0.5" />
      <ellipse cx="53" cy="43" rx="3" ry="1.5" fill="#FB923C" opacity="0.5" />
      {/* 몸통 (before) */}
      <rect x="28" y="56" width="24" height="18" rx="5" fill="#F87171" stroke="#2D2D2D" strokeWidth="2" />
      {/* 왼팔 — 메모 */}
      <path d="M28 58 L14 52" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      <rect x="6" y="46" width="10" height="8" rx="1" fill="white" stroke="#2D2D2D" strokeWidth="1" />
      <line x1="8" y1="49" x2="14" y2="49" stroke="#F87171" strokeWidth="0.6" />
      <line x1="8" y1="51" x2="12" y2="51" stroke="#F87171" strokeWidth="0.6" />
      {/* 오른팔 — 연필 */}
      <path d="M52 58 L66 52" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      <line x1="66" y1="52" x2="74" y2="44" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M74 44 L76 42" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
      {/* 불꽃 이펙트 (다리 제거) */}
      <path d="M4 38 C4 38 2 34 2 32 A2 2 0 0 1 6 32 C6 34 4 38 4 38Z" fill="#FACC15" opacity="0.5" />
      <path d="M76 34 C76 34 74 30 74 28 A2 2 0 0 1 78 28 C78 30 76 34 76 34Z" fill="#FACC15" opacity="0.4" />
    </svg>
  ),
  "정축-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 머리카락 — 남성 투블럭 */}
        <path d="M22 32 Q20 12 40 10 Q60 12 58 32 Z" fill="#2D2D2D" />
        {/* 얼굴 */}
        <circle cx="40" cy="40" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 앞머리 — 투블럭 앞머리 내림 (얼굴 위) */}
        <path d="M28 31 Q30 35 34 32 Q40 35 46 32 Q50 35 52 31 Q53 24 40 23 Q27 24 28 31 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.3" />
        <path d="M35 25 L34 32 M44 25 L45 32" stroke="#52525B" strokeWidth="0.7" opacity="0.5" />
        {/* 눈 — 은근한 집착 눈, 살짝 내리뜬 */}
        <ellipse cx="34" cy="37" rx="3" ry="2" fill="#2D2D2D" />
        <ellipse cx="46" cy="37" rx="3" ry="2" fill="#2D2D2D" />
        {/* 집착 불꽃 — 눈 안에 작은 불꽃 */}
        <path d="M34 36 C34 36 33 35 33 34.5 A0.8 0.8 0 0 1 35 34.5 C35 35 34 36 34 36Z" fill="#FACC15" opacity="0.7" />
        <path d="M46 36 C46 36 45 35 45 34.5 A0.8 0.8 0 0 1 47 34.5 C47 35 46 36 46 36Z" fill="#FACC15" opacity="0.7" />
        {/* 눈썹 — 은근한 */}
        <path d="M30 31 Q33 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q47 29 50 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 입 — 은근한 미소 */}
        <path d="M36 45 Q40 48 44 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="42" rx="3" ry="1.5" fill="#F87171" opacity="0.3" />
        <ellipse cx="52" cy="42" rx="3" ry="1.5" fill="#F87171" opacity="0.3" />
        {/* 몸통 */}
        <rect x="28" y="56" width="24" height="20" rx="5" fill="#F87171" stroke="#2D2D2D" strokeWidth="2" />
        {/* 촛불 — 왼손 */}
        <rect x="6" y="62" width="6" height="12" rx="1.5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M9 62 C9 62 7 58 7 56 A2 2 0 0 1 11 56 C11 58 9 62 9 62Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M9 62 C9 62 8 60 8 59 A1 1 0 0 1 10 59 C10 60 9 62 9 62Z" fill="#FACC15" />
        {/* 스크랩북/메모 — 오른손 */}
        <rect x="56" y="52" width="14" height="18" rx="2" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="58" y1="57" x2="68" y2="57" stroke="#F87171" strokeWidth="0.8" />
        <line x1="58" y1="61" x2="68" y2="61" stroke="#F87171" strokeWidth="0.8" />
        <line x1="58" y1="65" x2="65" y2="65" stroke="#F87171" strokeWidth="0.8" />
        {/* 작은 하트 메모에 */}
        <path d="M60 54 C59.4 53.2 58 53.2 58 54.5 C58 53.2 56.6 53.2 56 54 C55.4 55.2 58 57 58 57 C58 57 60.6 55.2 60 54Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.5" />
    </svg>
  ),
  "정축-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* === HAIR FIRST — 공주 올림머리(updo) before face === */}
        {/* Side tendrils left */}
        <path d="M24 28 Q18 34 20 44 Q22 50 24 48 Q26 44 24 36 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1"/>
        {/* Side tendrils right */}
        <path d="M56 28 Q62 34 60 44 Q58 50 56 48 Q54 44 56 36 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1"/>
        {/* Updo base — hair swept up at back of head */}
        <path d="M24 28 Q24 14 40 12 Q56 14 56 28 Q56 32 50 34 Q40 36 30 34 Q24 32 24 28 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* Bun on top */}
        <ellipse cx="40" cy="10" rx="9" ry="7" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* Bun highlight */}
        <path d="M34 7 Q38 5 43 7" stroke="#4B5563" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
        {/* Small flower pin on bun */}
        <circle cx="47" cy="7" r="3.5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1"/>
        <circle cx="47" cy="7" r="1.5" fill="#FACC15"/>
        <circle cx="44" cy="5" r="2" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8"/>
        <circle cx="50" cy="5" r="2" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8"/>
        <circle cx="44" cy="9" r="2" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8"/>
        <circle cx="50" cy="9" r="2" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8"/>
        {/* === FACE — drawn AFTER hair === */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 속눈썹 */}
        <path d="M31 30 Q34 28 37 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M43 30 Q46 28 49 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 눈 — 부드러운 초승달 눈 */}
        <path d="M31 33 Q34 30 37 33" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M43 33 Q46 30 49 33" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* 볼터치 — 복숭아색 */}
        <ellipse cx="27" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7"/>
        <ellipse cx="53" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7"/>
        {/* 입 — 따뜻한 미소 */}
        <path d="M34 41 Q40 47 46 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 몸통 — 여성스러운 실루엣 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 커피잔 — 양 손으로 감싸기 */}
        <rect x="28" y="56" width="24" height="14" rx="3" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
        <ellipse cx="40" cy="56" rx="12" ry="4" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.2"/>
        {/* 커피 내용물 */}
        <ellipse cx="40" cy="56" rx="9" ry="2.5" fill="#92400E"/>
        {/* 잔 손잡이 */}
        <path d="M52 59 Q56 59 56 63 Q56 67 52 67" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 향기 선 */}
        <path d="M34 54 Q36 50 34 46" stroke="#F87171" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"/>
        <path d="M40 53 Q42 49 40 45" stroke="#FACC15" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"/>
        {/* 하트 — 주변에 */}
        <path d="M8 46 C6.8 44.4 4 44.4 4 46.5 C4 44.4 1.2 44.4 0 46 C-1.2 48 4 52 4 52 C4 52 9.2 48 8 46Z" fill="#F87171" opacity="0.6"/>
        <path d="M76 48 C75 46.6 72.6 46.6 72.6 48.5 C72.6 46.6 70.2 46.6 69.2 48 C68.2 49.6 72.6 53 72.6 53 C72.6 53 77 49.6 76 48Z" fill="#F87171" opacity="0.5"/>
    </svg>
  ),
  "병술-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 강아지 귀 */}
      <path d="M22 22 Q14 12 18 7 Q24 10 26 20Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M58 22 Q66 12 62 7 Q56 10 54 20Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      {/* 크라운 캡 */}
      <path d="M22 30 Q20 12 40 10 Q60 12 58 30 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 앞머리 더벅 */}
      <path d="M23 31 Q25 36 28 32 Q31 37 34 32 Q37 37 40 32 Q43 37 46 32 Q49 37 52 32 Q55 36 57 31 Q59 19 40 18 Q21 19 23 31 Z" fill="#92400E" />
      {/* 눈썹 — 진심 */}
      <path d="M28 32 Q33 29 37 32" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M43 32 Q47 29 52 32" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="37" r="2.8" fill="#2D2D2D" />
      <circle cx="46" cy="37" r="2.8" fill="#2D2D2D" />
      <circle cx="35.1" cy="36" r="1.1" fill="white" />
      <circle cx="47.1" cy="36" r="1.1" fill="white" />
      {/* 입 — 솔직한 미소 */}
      <path d="M35 45 Q40 49 45 45" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <ellipse cx="27" cy="43" rx="3.5" ry="2" fill="#F87171" opacity="0.4" />
      <ellipse cx="53" cy="43" rx="3.5" ry="2" fill="#F87171" opacity="0.4" />
      {/* 몸통 — 레드 + 카라 + 하트 배지 */}
      <path d="M24 54 Q22 58 22 76 L58 76 Q58 58 56 54 Q48 52 40 52 Q32 52 24 54Z" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M36 53 L40 59 L44 53" stroke="#FCA5A5" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      <path d="M47 60 Q47 58.5 48.2 58.5 Q49.4 58.5 49.4 60 Q49.4 61.6 47 63 Q44.6 61.6 44.6 60 Q44.6 58.5 45.8 58.5 Q47 58.5 47 60Z" fill="#F472B6" stroke="#2D2D2D" strokeWidth="0.5" />
      {/* 오른팔 → 가슴에 주먹 (의리) */}
      <path d="M55 60 Q48 60 44 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="41" cy="63" r="3.4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 왼팔 → 든든한 주먹 */}
      <path d="M24 60 Q18 58 15 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="61" r="3.4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 강아지 꼬리 */}
      <path d="M58 70 Q66 66 68 58 Q72 64 66 70 Q62 73 58 72Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.1" />
    </svg>
  ),
  "병술-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 양갈래 머리, 빨강 */}
        <path d="M22 30 Q22 10 40 8 Q58 10 58 30" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M20 30 Q12 40 14 62 Q16 70 20 68 Q26 64 22 50 Q20 40 22 32 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M60 30 Q68 40 66 62 Q64 70 60 68 Q54 64 58 50 Q60 40 58 32 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="21" cy="30" r="3.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="59" cy="30" r="3.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 */}
        <circle cx="34" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 크게 웃음 */}
        <path d="M34 41 Q40 47 46 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="30" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
        <ellipse cx="50" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 음표 */}
        <path d="M10 54 L10 46 L16 44 L16 52" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="10" cy="54" r="2.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="16" cy="52" r="2.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
    </svg>
  ),
  "정해-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      <path d="M22 30 Q20 12 40 10 Q60 12 58 30 Z" fill="#374151" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 앞머리 가르마 스윕 */}
      <path d="M23 30 Q25 34 30 32 Q38 35 46 32 Q53 34 57 29 Q59 20 40 19 Q23 20 23 30 Z" fill="#374151" />
      <path d="M48 23 Q42 29 36 33" stroke="#52525B" strokeWidth="0.9" fill="none" opacity="0.55" />
      {/* 눈썹 — 다정하게 */}
      <path d="M28 32 Q32 30.5 37 32" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M43 32 Q48 30.5 52 32" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      {/* 눈 — 눈치 빠른 따뜻한 */}
      <circle cx="34" cy="37" r="2.6" fill="#2D2D2D" />
      <circle cx="46" cy="37" r="2.6" fill="#2D2D2D" />
      <circle cx="35" cy="36" r="1.1" fill="white" />
      <circle cx="47" cy="36" r="1.1" fill="white" />
      {/* 입 — 잔잔한 미소 */}
      <path d="M36 45 Q40 48 44 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="43" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.4" />
      <ellipse cx="52" cy="43" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.4" />
      {/* 몸통 — 딥 틸 니트 + 카라 */}
      <path d="M24 54 Q22 58 22 76 L58 76 Q58 58 56 54 Q48 52 40 52 Q32 52 24 54Z" fill="#0E7490" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M36 53 L40 59 L44 53" stroke="#67E8F9" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      {/* 오른팔 → 따뜻한 커피 (커피 사왔어) */}
      <path d="M56 60 Q60 60 63 61" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M62 57 L74 57 L72.5 67 Q72 69 70 69 L64 69 Q62 69 62 67 Z" fill="#FFF7ED" stroke="#2D2D2D" strokeWidth="1.3" />
      <path d="M63 60 L73 60" stroke="#C8956B" strokeWidth="2.4" opacity="0.8" />
      <path d="M74 59 Q78 61 74 64" stroke="#2D2D2D" strokeWidth="1.2" fill="none" />
      <path d="M66 54 Q67 51 66 49" stroke="#CBD5E1" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* 왼팔 → 편안한 손 */}
      <path d="M24 60 Q18 60 14 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="11" cy="63" r="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 말풍선 '어 알아' */}
      <rect x="44" y="2" width="32" height="18" rx="3" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M48 18 L42 26 L56 18 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <text x="60" y="11" fontSize="9" fontWeight="bold" fill="#2D2D2D" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">{"어 알아"}</text>
    </svg>
  ),
  "정해-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 장발 스트레이트 — 핫핑크 */}
        <path d="M18 32 Q18 10 40 10 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#EC4899" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 큰 귀 (안테나 역할) */}
        <ellipse cx="16" cy="34" rx="6" ry="13" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        <ellipse cx="64" cy="34" rx="6" ry="13" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 안테나 */}
        <line x1="36" y1="14" x2="30" y2="2" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="30" cy="1" r="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <line x1="44" y1="14" x2="50" y2="2" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="1" r="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 33 Q34 31 37 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 33 Q46 31 49 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 크고 동그란 */}
        <circle cx="34" cy="35" r="4.5" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="34" cy="36" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="35" r="4.5" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="46" cy="36" r="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="34" r="1" fill="white" />
        <circle cx="47" cy="34" r="1" fill="white" />
        {/* 입 */}
        <circle cx="40" cy="43" r="1.5" fill="#2D2D2D" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="40" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.7" />
        <ellipse cx="52" cy="40" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.7" />
        {/* 몸통 — 선명한 노랑 */}
        <path d="M28 52 Q26 56 26 70 L54 70 Q54 56 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 레이더 파장 */}
        <path d="M67 34 Q72 32 74 37 Q76 42 72 46" stroke="#FB923C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M69 30 Q76 28 80 35 Q82 42 78 48" stroke="#FB923C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  "병신-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 말 귀 */}
      <path d="M31 16 L29 7 L36 14Z" fill="#C68642" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M49 16 L51 7 L44 14Z" fill="#C68642" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M32 14.5 L31 9 L34.5 13.5Z" fill="#FDE68A" />
      <path d="M48 14.5 L49 9 L45.5 13.5Z" fill="#FDE68A" />
      {/* 갈기 — 정수리 */}
      <path d="M34 13 Q40 8 46 13 Q47 18 43 19 Q40 15 37 19 Q33 18 34 13Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
      {/* 머리 — 긴 말 얼굴 */}
      <path d="M28 22 Q28 14 40 13 Q52 14 52 22 Q53 31 50 37 Q48 45 40 46 Q32 45 30 37 Q27 31 28 22Z" fill="#C68642" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 주둥이 */}
      <ellipse cx="40" cy="41" rx="7.5" ry="5.5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
      <ellipse cx="36.5" cy="41" rx="1" ry="1.6" fill="#2D2D2D" />
      <ellipse cx="43.5" cy="41" rx="1" ry="1.6" fill="#2D2D2D" />
      {/* 눈썹 — 빠릿 (한쪽 올림) */}
      <path d="M30 24 Q33 22 36 24" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M44 23 Q47 21 50 23" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="34" cy="28" r="2.6" fill="#2D2D2D" />
      <circle cx="46" cy="28" r="2.6" fill="#2D2D2D" />
      <circle cx="35" cy="27" r="1.1" fill="white" />
      <circle cx="47" cy="27" r="1.1" fill="white" />
      {/* 입 — 자신만만 */}
      <path d="M37 44.5 Q40 46.5 43 44.5" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="31" cy="34" rx="2.6" ry="1.5" fill="#F87171" opacity="0.35" />
      <ellipse cx="49" cy="34" rx="2.6" ry="1.5" fill="#F87171" opacity="0.35" />
      {/* 몸통 — 작업 멜빵 (얼굴과 붙임) */}
      <path d="M25 49 Q23 53 23 76 L57 76 Q57 53 55 49 Q47 45 40 45 Q33 45 25 49Z" fill="#2563EB" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M33 47 L33 76 M47 47 L47 76" stroke="#1E40AF" strokeWidth="1.6" opacity="0.6" />
      <rect x="36" y="60" width="8" height="6" rx="1" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="0.5" opacity="0.7" />
      {/* 오른팔 + 손 → 스패너 (빠르게!) */}
      <path d="M54 58 Q60 55 63 51" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="64" cy="50" r="2.6" fill="#C68642" stroke="#2D2D2D" strokeWidth="1.1" />
      <path d="M64 49 L71 42" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <path d="M70 39 Q74 37 75 41 Q74 44 71 43 Q68 45 68 41 Q69 38 72 39Z" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1" />
      {/* 왼팔 + 손 (빠른 주먹) */}
      <path d="M26 58 Q20 56 16 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="13" cy="59" r="3" fill="#C68642" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 빠른 손 모션선 */}
      <path d="M9 55 L4 53 M9 59 L3 59 M9 63 L4 65" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <path d="M75 46 L79 44 M76 49 L80 50" stroke="#F87171" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  "병신-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 장발 스트레이트, 빨간색 (닫힌 Z path 먼저) */}
        <path d="M18 32 Q18 10 40 8 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 열정적 반짝이는 */}
        <circle cx="34" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 활짝 웃는 */}
        <path d="M33 42 Q40 48 47 42" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6" />
        <ellipse cx="52" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6" />
        {/* 몸통 — 노란 원피스 (여성형) */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 원피스 넥라인 */}
        <path d="M33 50 Q40 55 47 50" stroke="#F59E0B" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* 팔 1 — 왼쪽 위: 체크리스트 (손) */}
        <path d="M28 56 Q21 53 16 51" stroke="#2D2D2D" strokeWidth="2.3" strokeLinecap="round" fill="none" />
        <circle cx="13" cy="50" r="2.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
        <rect x="1" y="43" width="12" height="15" rx="1.5" fill="white" stroke="#2D2D2D" strokeWidth="1.1" />
        <path d="M3 47 L5 49 L9 45" stroke="#4ADE80" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 52 L5 54 L9 50" stroke="#4ADE80" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* 팔 2 — 오른쪽 아래: 펜으로 빠르게 메모 (손) */}
        <path d="M52 64 Q60 64 65 67" stroke="#2D2D2D" strokeWidth="2.3" strokeLinecap="round" fill="none" />
        <circle cx="67" cy="68" r="2.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
        <line x1="67" y1="67" x2="74" y2="61" stroke="#6366F1" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M74 61 L76 59" stroke="#2D2D2D" strokeWidth="1.4" strokeLinecap="round" />
        {/* 팔 3 — 오른쪽 위: 커피 (손) */}
        <path d="M52 58 Q60 55 64 53" stroke="#2D2D2D" strokeWidth="2.3" strokeLinecap="round" fill="none" />
        <rect x="62" y="48" width="11" height="12" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="1.3" />
        <path d="M73 51 Q77 53 73 56" stroke="#2D2D2D" strokeWidth="1.1" fill="none" />
        <rect x="63" y="49" width="9" height="2.5" rx="0.8" fill="#C8956B" opacity="0.8" />
        <path d="M65 46 Q66 43 65 41" stroke="#CBD5E1" strokeWidth="0.9" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M69 46 Q70 43 69 41" stroke="#CBD5E1" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round" />
        {/* 번개 이펙트 */}
        <path d="M4 34 L2 38 L6 37 L3 42" stroke="#FACC15" strokeWidth="1" fill="none" strokeLinejoin="round" opacity="0.5" />
        <path d="M76 30 L74 34 L78 33 L75 38" stroke="#FACC15" strokeWidth="1" fill="none" strokeLinejoin="round" opacity="0.4" />
    </svg>
  ),
  "정유-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 촉 안테나 — 왼쪽, 우아하게 휘어짐 */}
        <path d="M34 15 Q30 7 33 1" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="33" cy="1" r="3.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2" />
        <circle cx="33" cy="1" r="1.5" fill="white" opacity="0.7" />
        {/* 촉 안테나 — 오른쪽 */}
        <path d="M46 15 Q50 7 47 1" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="47" cy="1" r="3.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2" />
        <circle cx="47" cy="1" r="1.5" fill="white" opacity="0.7" />
        {/* 머리카락 — 캡 Z */}
        <path d="M22 30 Q22 14 40 12 Q58 14 58 30 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 앞머리 — 가운데 가르마 커튼 (얼굴 위) */}
        <path d="M23 28 Q28 34 38 31 Q40 29 40 26 Q40 29 42 31 Q52 34 57 28 Q58 20 40 19 Q22 20 23 28 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.3" />
        <path d="M40 21 L40 28" stroke="#52525B" strokeWidth="0.7" opacity="0.5" />
        {/* 눈썹 — 약간 치켜올린 (예민) */}
        <path d="M28 30 Q32 27 36 29" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        <path d="M44 29 Q48 27 52 30" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        {/* 눈 — 크고 깊은, 모든 걸 꿰뚫는 */}
        <circle cx="33" cy="37" r="5" fill="#2D2D2D" />
        <circle cx="47" cy="37" r="5" fill="#2D2D2D" />
        <circle cx="31" cy="35" r="1.8" fill="white" />
        <circle cx="45" cy="35" r="1.8" fill="white" />
        <circle cx="31.5" cy="35.5" r="0.6" fill="#2D2D2D" />
        <circle cx="45.5" cy="35.5" r="0.6" fill="#2D2D2D" />
        {/* 입 — 이미 다 알고있다는 미소 */}
        <path d="M35 45 Q40 48 45 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="26" cy="42" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.4" />
        <ellipse cx="54" cy="42" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.4" />
        {/* 몸통 — 보스 셔츠 + 넥타이 */}
        <path d="M26 54 Q24 58 24 74 L56 74 Q56 58 54 54 Q47 52 40 52 Q33 52 26 54Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 53 L40 58 L44 53" stroke="#FECACA" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        <path d="M40 58 L37 62 L40 72 L43 62 Z" fill="#B91C1C" stroke="#2D2D2D" strokeWidth="1" />
        {/* 오른팔 → 돋보기 (예민하게 탐지) */}
        <path d="M54 60 Q60 58 64 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="68" cy="60" r="7" fill="#FECACA" fillOpacity="0.5" stroke="#2D2D2D" strokeWidth="1.8" />
        <circle cx="66" cy="58" r="2" fill="white" opacity="0.7" />
        <line x1="73" y1="65" x2="77" y2="70" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        {/* 왼팔 → 감지 손 (귀 기울임) + 파동 */}
        <path d="M26 60 Q20 58 17 54" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="15" cy="52" rx="3" ry="3.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M9 50 Q4 45 6 39" stroke="#F87171" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />
        <path d="M6 53 Q0 48 2 40" stroke="#F87171" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3" />
    </svg>
  ),
  "정유-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 날개 (데이터 블루) */}
      <path d="M28 46 Q6 28 12 12 Q22 20 30 40 Z" fill="#A5B4FC" stroke="#2D2D2D" strokeWidth="1.2" opacity="0.85" />
      <path d="M28 52 Q4 58 8 70 Q18 66 30 56 Z" fill="#C7D2FE" stroke="#2D2D2D" strokeWidth="1.2" opacity="0.8" />
      <path d="M52 46 Q74 28 68 12 Q58 20 50 40 Z" fill="#A5B4FC" stroke="#2D2D2D" strokeWidth="1.2" opacity="0.85" />
      <path d="M52 52 Q76 58 72 70 Q62 66 50 56 Z" fill="#C7D2FE" stroke="#2D2D2D" strokeWidth="1.2" opacity="0.8" />
      {/* 머리카락 — 웨이브 펌 단발 (파란색) */}
      <path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 38 60 44 Q54 50 62 54 Q66 60 58 64 Q50 68 44 65 Q40 63 36 65 Q30 68 22 64 Q14 60 18 54 Q26 50 20 44 Q14 38 18 30 Z" fill="#2563EB" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 36 Q26 33 30 36" stroke="#1E40AF" strokeWidth="0.9" fill="none" opacity="0.55" />
      <path d="M50 36 Q54 33 58 36" stroke="#1E40AF" strokeWidth="0.9" fill="none" opacity="0.55" />
      {/* 별 머리핀 */}
      <path d="M54 12 L55.5 16.5 L60 18 L55.5 19.5 L54 24 L52.5 19.5 L48 18 L52.5 16.5 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="38" rx="15" ry="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 신난 */}
      <path d="M30 31 Q34 28 38 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M42 31 Q46 28 50 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 눈 — 반짝이는 요정 눈 */}
      <circle cx="34" cy="36" r="3.5" fill="#2D2D2D" />
      <circle cx="46" cy="36" r="3.5" fill="#2D2D2D" />
      <circle cx="35.5" cy="34.5" r="1.5" fill="white" />
      <circle cx="47.5" cy="34.5" r="1.5" fill="white" />
      <circle cx="35" cy="34" r="0.6" fill="white" />
      <circle cx="47" cy="34" r="0.6" fill="white" />
      {/* 입 — 신난 미소 */}
      <path d="M34 43 Q40 48 46 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="28" cy="40" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.6" />
      <ellipse cx="52" cy="40" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.6" />
      {/* 몸통 — 초록 요정 드레스 */}
      <path d="M30 54 Q26 60 24 74 L56 74 Q54 60 50 54Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M37 60 L38 63 L41 64 L38 65 L37 68 L36 65 L33 64 L36 63 Z" fill="#FACC15" opacity="0.7" />
      {/* 지팡이 — 오른손 */}
      <line x1="50" y1="58" x2="62" y2="40" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <path d="M62 40 L64 35 L66 40 L71 40 L67 43 L69 48 L64 45 L59 48 L61 43 L57 40 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
      {/* 소환된 막대그래프 (마법) */}
      <rect x="60" y="20" width="3.5" height="8" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.6" />
      <rect x="64.5" y="15" width="3.5" height="13" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.6" />
      <rect x="69" y="22" width="3.5" height="6" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.6" />
      <line x1="59" y1="28" x2="74" y2="28" stroke="#2D2D2D" strokeWidth="0.7" />
      <path d="M56 33 L58 30 M60 34 L62 31" stroke="#FACC15" strokeWidth="0.9" opacity="0.7" strokeLinecap="round" />
      {/* 왼손 → 떠다니는 셀(✓) */}
      <path d="M30 56 L16 50" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="15" cy="49" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <rect x="3" y="40" width="11" height="9" rx="1" fill="white" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M5.5 44.5 L7.5 46.5 L11.5 42.5" stroke="#22C55E" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "병오-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 머리카락 — 크라운 캡 (갑술 동일, 병오 위치로) */}
      <path d="M22 41 Q20 21 40 19 Q60 21 58 41 Z" fill="#2D2D2D" />
      {/* 얼굴 */}
      <circle cx="40" cy="44" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 앞머리 — 가르마 스윕 (갑술 동일, 병오 위치로) */}
      <path d="M23 29 Q22 36 28 34 Q32 37 37 34 Q43 37 49 34 Q54 36 57 34 Q58 32 57 29 Q40 23 23 29 Z" fill="#2D2D2D" />
      {/* 눈 (원본 유지) */}
      <circle cx="35" cy="43" r="2.5" fill="#2D2D2D" />
      <circle cx="45" cy="43" r="2.5" fill="#2D2D2D" />
      <circle cx="36" cy="42" r="1" fill="white" />
      <circle cx="46" cy="42" r="1" fill="white" />
      {/* 입 — 시원하게 웃는 (원본 유지) */}
      <path d="M33 50 Q40 56 47 50" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 볼터치 (원본 유지) */}
      <ellipse cx="29" cy="46" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.55" />
      <ellipse cx="51" cy="46" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.55" />
      {/* 몸통 — 파란 왕자복 (원본 유지) */}
      <rect x="28" y="58" width="24" height="22" rx="5" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="2" />
      <path d="M34 60 L40 68 L46 60" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <circle cx="40" cy="72" r="1.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
      {/* 마이크 — 오른손 (원본 유지) */}
      <circle cx="61" cy="57" r="5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
      <rect x="59" y="62" width="4" height="12" rx="1" fill="#2D2D2D" />
      <path d="M67 55 Q71 58 67 61" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M70 52 Q75 58 70 64" stroke="#FACC15" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
      {/* 왕관 — 가장 위 레이어 (맨 마지막) */}
      <rect x="22" y="22" width="36" height="6" rx="2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 22 L28 8 L34 20 L40 2 L46 20 L52 8 L58 22" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="34" cy="18" r="2" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="40" cy="9" r="2.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="46" cy="18" r="2" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  ),
  "병오-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 빛 발산 광선 (뒤) */}
      <path d="M40 10 L40 2 M24 16 L18 8 M56 16 L62 8 M16 36 L6 32 M64 36 L74 32 M20 54 L11 58 M60 54 L69 58" stroke="#FACC15" strokeWidth="1.6" opacity="0.5" strokeLinecap="round" />
      {/* 큰 별 (머리 위) */}
      <path d="M40 4 L42.5 11 L50 11 L44 15.5 L46.5 23 L40 18.5 L33.5 23 L36 15.5 L30 11 L37.5 11 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
      {/* 머리 — 단발 스트레이트 하늘색 (기유-f 동일) */}
      <path d="M20 36 Q20 14 40 12 Q60 14 60 36 Q62 52 54 58 Q46 62 40 62 Q34 62 26 58 Q18 52 20 36 Z" fill="#06B6D4" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="40" rx="15" ry="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 들뜬 */}
      <path d="M29 32 Q33 29 37 32" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M43 32 Q47 29 51 32" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* 눈 — 해맑은 큰 눈 */}
      <circle cx="34" cy="38" r="3.6" fill="#2D2D2D" />
      <circle cx="46" cy="38" r="3.6" fill="#2D2D2D" />
      <circle cx="35.5" cy="36.5" r="1.6" fill="white" />
      <circle cx="47.5" cy="36.5" r="1.6" fill="white" />
      {/* 입 — 활짝 노래 */}
      <path d="M32 47 Q40 54 48 47" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="26" cy="43" rx="4" ry="2.5" fill="#FB923C" opacity="0.5" />
      <ellipse cx="54" cy="43" rx="4" ry="2.5" fill="#FB923C" opacity="0.5" />
      {/* 몸통 — 반짝 드레스 (노랑) */}
      <path d="M28 58 Q24 62 22 76 L58 76 Q56 62 52 58 Q46 56 40 56 Q34 56 28 58Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.6" />
      <path d="M34 60 L36 64 L40 65 L36 66 L34 70 L32 66 L28 65 L32 64Z" fill="#FDE68A" opacity="0.8" />
      {/* 양팔 활짝 벌림 (에너지 발산) */}
      <path d="M28 60 Q16 54 8 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="7" cy="56" r="2.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <path d="M52 60 Q64 54 72 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="73" cy="56" r="2.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      {/* 손끝 스파클 + 하트 */}
      <path d="M4 48 L5 51 L8 52 L5 53 L4 56 L3 53 L0 52 L3 51Z" fill="#FACC15" opacity="0.6" />
      <path d="M76 48 L77 51 L80 52 L77 53 L76 56 L75 53 L72 52 L75 51Z" fill="#FACC15" opacity="0.6" />
      <path d="M66 49 C66 49 64.5 47 64.5 45.8 A1.3 1.3 0 0 1 67 45.4 A1.3 1.3 0 0 1 69.5 45.8 C69.5 47 66 49 66 49Z" fill="#E84B6A" opacity="0.55" />
    </svg>
  ),
  "정미-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      <path d="M22 30 Q20 12 40 10 Q60 12 58 30 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 앞머리 가르마 스윕 */}
      <path d="M23 30 Q25 34 30 32 Q38 35 46 32 Q53 34 57 29 Q59 20 40 19 Q23 20 23 30 Z" fill="#92400E" />
      <path d="M48 23 Q42 29 36 33" stroke="#B45309" strokeWidth="0.9" fill="none" opacity="0.55" />
      {/* 눈썹 — 한쪽 올린 잔소리 (다정) */}
      <path d="M28 32 Q33 30 37 32" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M43 30 Q47 28 52 31" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="37" r="2.6" fill="#2D2D2D" />
      <circle cx="46" cy="37" r="2.6" fill="#2D2D2D" />
      <circle cx="35" cy="36" r="1.1" fill="white" />
      <circle cx="47" cy="36" r="1.1" fill="white" />
      {/* 입 — 한마디 하는 (살짝 오므림) */}
      <path d="M36 45 Q38 44 40 45 Q42 46 44 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="43" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.4" />
      <ellipse cx="52" cy="43" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.4" />
      {/* 몸통 — 니트 + 흰 앞치마 */}
      <path d="M24 54 Q22 58 22 76 L58 76 Q58 58 56 54 Q48 52 40 52 Q32 52 24 54Z" fill="#B45309" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M33 57 L47 57 L46 76 L34 76 Z" fill="white" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M34 57 Q40 53 46 57" stroke="#E2E8F0" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* 오른팔 → 따뜻한 커피 */}
      <path d="M56 60 Q60 60 63 61" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M62 57 L74 57 L72.5 67 Q72 69 70 69 L64 69 Q62 69 62 67 Z" fill="#FFF7ED" stroke="#2D2D2D" strokeWidth="1.3" />
      <path d="M63 60 L73 60" stroke="#C8956B" strokeWidth="2.4" opacity="0.8" />
      <path d="M74 59 Q78 61 74 64" stroke="#2D2D2D" strokeWidth="1.2" fill="none" />
      <path d="M66 54 Q67 51 66 49" stroke="#CBD5E1" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* 왼팔 → 주먹 (검지 제거) */}
      <path d="M24 60 Q18 58 15 55" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="13" cy="53" r="3.2" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M10.3 52.2 L15.7 52.2 M10.3 54 L15.7 54" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.4" />
    </svg>
  ),
  "정미-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 중단발 웨이브, 핑크 (닫힌 Z path 먼저) */}
        <path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 40 60 46 Q54 52 62 58 Q64 64 56 68 Q48 70 44 68 Q40 66 36 68 Q28 70 22 66 Q16 62 18 56 Q26 50 20 44 Q14 38 18 30 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 32 Q34 30 37 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 32 Q46 30 49 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 반짝이는 레이더 눈 */}
        <ellipse cx="34" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <ellipse cx="46" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 미소 */}
        <path d="M36 41 Q40 45 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.65" />
        <ellipse cx="52" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.65" />
        {/* 헤어핀 — 레이더 안테나 */}
        <line x1="46" y1="10" x2="52" y2="4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="52" cy="4" r="2" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 하트 소품 */}
        <path d="M36 57 C36 55 34 53 32 55 C30 57 32 60 36 63 C40 60 42 57 40 55 C38 53 36 55 36 57Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  ),
  "병진-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      <path d="M22 30 Q20 12 40 10 Q60 12 58 30 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 미니 왕관 */}
      <path d="M31 13 L34 6 L38 11 L40 4 L42 11 L46 6 L49 13 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="40" cy="9" r="1.4" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.5" />
      <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 앞머리 올백 가르마 */}
      <path d="M24 28 Q26 30 31 29 Q38 31 46 29 Q52 30 56 27 Q57 22 40 21 Q24 22 24 28 Z" fill="#1F2937" />
      <path d="M40 22 L40 28" stroke="#374151" strokeWidth="0.7" fill="none" opacity="0.5" />
      {/* 눈썹 — 한쪽 올린 근자감 */}
      <path d="M28 32 Q33 30 37 32" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M43 30 Q47 28 52 30" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="37" r="2.8" fill="#2D2D2D" />
      <circle cx="46" cy="37" r="2.8" fill="#2D2D2D" />
      <circle cx="35.1" cy="36" r="1.1" fill="white" />
      <circle cx="47.1" cy="36" r="1.1" fill="white" />
      <path d="M33 34 L36 33.5 M44 33.5 L47 34" stroke="#FACC15" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />
      {/* 입 — 자신만만 스미르크 */}
      <path d="M35 45 Q39 47.5 45 44" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="43" rx="3.5" ry="1.8" fill="#F87171" opacity="0.35" />
      <ellipse cx="52" cy="43" rx="3.5" ry="1.8" fill="#F87171" opacity="0.35" />
      {/* 몸통 — 로열 퍼플 + 골드 트림 */}
      <path d="M24 54 Q22 58 22 76 L58 76 Q58 58 56 54 Q48 52 40 52 Q32 52 24 54Z" fill="#7C3AED" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M36 53 L40 59 L44 53" stroke="#FACC15" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <circle cx="40" cy="64" r="1.3" fill="#FACC15" />
      {/* 오른팔 → 자신 가리킴 (내가 하면 달라) */}
      <path d="M55 60 Q49 61 45 63" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="43" cy="64" r="3.2" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 왼팔 + 미니 드래곤 (어깨) */}
      <path d="M24 60 Q19 60 16 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="11" cy="58" rx="5" ry="4" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M7 56 Q4 53 6 51 Q8 54 9 56Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.9" />
      <path d="M11 54 Q9 49 12 47 Q13 51 13 54Z" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="9" cy="58" r="1" fill="#2D2D2D" />
      <path d="M6 60 Q4 61 3 60" stroke="#F97316" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  ),
  "병진-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 장발 스트레이트, 주황 (닫힌 Z path 먼저) */}
        <path d="M18 32 Q18 10 40 8 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 32 Q34 30 37 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 32 Q46 30 49 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 밝고 큰 눈 */}
        <ellipse cx="34" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <ellipse cx="46" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 환한 미소 */}
        <path d="M35 41 Q40 47 45 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.65" />
        <ellipse cx="52" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.65" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 오른팔 — 꽃 */}
        <path d="M52 56 Q62 52 66 55" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="68" cy="52" r="5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="68" cy="46" r="3.5" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="0.8" />
        <circle cx="62" cy="52" r="3.5" fill="#FB923C" stroke="#2D2D2D" strokeWidth="0.8" />
        <circle cx="74" cy="52" r="3.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.8" />
        <circle cx="68" cy="58" r="3.5" fill="#FB923C" stroke="#2D2D2D" strokeWidth="0.8" />
        <circle cx="68" cy="52" r="2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* 왼팔 — 꽃 뿌리는 */}
        <path d="M28 56 Q18 52 12 55" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="8" cy="50" r="3" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8" />
        <circle cx="4" cy="44" r="2" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="0.7" />
        <circle cx="12" cy="42" r="2" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.7" />
        <circle cx="2" cy="52" r="1.5" fill="#FB923C" stroke="#2D2D2D" strokeWidth="0.6" />
        <circle cx="14" cy="50" r="1.5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.6" />
    </svg>
  ),
  "정사-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 머리카락 — 인디고 캡-Z + 몰입해서 헝클어진 삐침 */}
        <path d="M22 30 Q20 12 40 11 Q60 12 58 30 Z" fill="#4338CA" stroke="#2D2D2D" strokeWidth="1.5"/>
        <path d="M40 11 Q44 4 48 7 Q45 9 43 13Z" fill="#4338CA" stroke="#2D2D2D" strokeWidth="1"/>
        <path d="M26 14 Q23 9 27 7 Q28 11 29 15Z" fill="#4338CA" stroke="#2D2D2D" strokeWidth="1"/>
        <path d="M33 16 Q34 21 32 25" stroke="#818CF8" strokeWidth="0.8" fill="none" opacity="0.55"/>
        <path d="M47 16 Q46 21 48 25" stroke="#818CF8" strokeWidth="0.8" fill="none" opacity="0.55"/>
        {/* 얼굴 */}
        <ellipse cx="40" cy="35" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 눈썹 — 몰입 집중 */}
        <path d="M28 29 Q32 27.5 36 29.5" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M44 29.5 Q48 27.5 52 29" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* 눈 — 몰입한 또렷한 */}
        <circle cx="33" cy="33" r="3" fill="#2D2D2D"/>
        <circle cx="47" cy="33" r="3" fill="#2D2D2D"/>
        <circle cx="34.2" cy="31.8" r="1.2" fill="white"/>
        <circle cx="48.2" cy="31.8" r="1.2" fill="white"/>
        {/* 입 — 몰입한 작은 미소 */}
        <path d="M37 42 Q40 44 43 42" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 볼터치 */}
        <ellipse cx="27" cy="39" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.45"/>
        <ellipse cx="53" cy="39" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.45"/>
        {/* 몸통 — 틸 셔츠 + 깃 */}
        <path d="M26 50 Q24 54 24 73 L56 73 Q56 54 54 50 Q47 48 40 48 Q33 48 26 50Z" fill="#14B8A6" stroke="#2D2D2D" strokeWidth="1.5"/>
        <path d="M36 49 L40 55 L44 49" stroke="#99F6E4" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
        {/* 오른팔 ↑ → 돋보기 (몰입해서 들여다봄) */}
        <path d="M54 56 Q60 52 63 47" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <circle cx="67" cy="42" r="7" stroke="#2D2D2D" strokeWidth="1.6" fill="#DBEAFE" fillOpacity="0.5"/>
        <circle cx="65" cy="40" r="2" fill="white" opacity="0.7"/>
        <line x1="62" y1="47" x2="64" y2="49" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round"/>
        {/* 왼팔 → 시계 (시간 증발) */}
        <path d="M26 58 Q20 58 15 59" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <circle cx="9" cy="60" r="6" fill="white" stroke="#2D2D2D" strokeWidth="1.3"/>
        <line x1="9" y1="60" x2="9" y2="56" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="9" y1="60" x2="12" y2="61" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round"/>
        {/* 시간 증발 효과 */}
        <path d="M6 51 Q4 48 6 45" stroke="#94A3B8" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
        <path d="M11 51 Q13 48 11 45" stroke="#94A3B8" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.4"/>
        <path d="M2 38 L3 41 L6 38 L3 35 Z" fill="#FACC15" opacity="0.6"/>
        <path d="M74 36 L75 33 L76 36 L75 39 Z" fill="#FACC15" opacity="0.5"/>
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M24 26 Q27 31 31 28 Q34 31 38 28 Q42 31 46 28 Q50 31 53 28 Q56 30 56 26 Q57 19 40 18 Q24 19 24 26 Z" fill="#4338CA" />
    </svg>
  ),
  "정사-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 양갈래 머리, 빨강 (닫힌 Z path 먼저 — 상단+갈래 전체 하나로) */}
        <path d="M22 30 Q22 10 40 8 Q58 10 58 30" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 왼쪽 갈래 */}
        <path d="M20 30 Q12 40 14 60 Q16 68 20 66 Q26 62 22 50 Q20 40 22 32 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 오른쪽 갈래 */}
        <path d="M60 30 Q68 40 66 60 Q64 68 60 66 Q54 62 58 50 Q60 40 58 32 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 묶음 장식 */}
        <circle cx="21" cy="30" r="3.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="59" cy="30" r="3.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 32 Q34 30 37 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 32 Q46 30 49 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 강렬한 눈 */}
        <ellipse cx="34" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <ellipse cx="46" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 단호한 미소 */}
        <path d="M36 41 Q40 45 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
        <ellipse cx="52" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 말풍선 '싫어' */}
        <rect x="3" y="24" width="24" height="13" rx="3" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
        <path d="M20 37 L18 43 L24 37" fill="white" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
        <text x="15" y="33.5" fontSize="5.5" fill="#EF4444" fontWeight="bold" textAnchor="middle">싫어</text>
        {/* 불꽃 소품 */}
        <path d="M62 68 C62 68 56 60 56 56 A6 6 0 0 1 68 56 C68 60 62 68 62 68Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M62 64 C62 64 58 59 58 57 A4 4 0 0 1 66 57 C66 59 62 64 62 64Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  ),
  "무인-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 머리카락 (모자 밑) */}
      <path d="M22 32 Q22 18 40 16 Q58 18 58 32" fill="#2D2D2D" />
      {/* 얼굴 */}
      <circle cx="40" cy="40" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 앞머리 — 모자 밑 살짝 (fill only) */}
      <path d="M25 27 Q24 33 30 31 Q35 34 40 31 Q45 34 50 31 Q56 33 55 27 Q40 23 25 27 Z" fill="#2D2D2D" />
      {/* 모험가 모자 */}
      <path d="M24 24 Q28 16 40 14 Q52 16 56 24" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M18 26 L62 26 Q60 30 40 30 Q20 30 18 26 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M18 26 L62 26" stroke="#FBBF24" strokeWidth="1" />
      {/* 눈썹 — 흥분해서 올라간 */}
      <path d="M29 35 Q33 31 37 35" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M43 35 Q47 31 51 35" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 눈 — 반짝 */}
      <circle cx="34" cy="40" r="3.2" fill="#2D2D2D" />
      <circle cx="46" cy="40" r="3.2" fill="#2D2D2D" />
      <circle cx="35.4" cy="38.8" r="1.3" fill="white" />
      <circle cx="47.4" cy="38.8" r="1.3" fill="white" />
      {/* 입 — 갑자기! */}
      <path d="M34 47 Q40 52 46 47" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="28" cy="45" rx="3.2" ry="1.8" fill="#F9A8D4" opacity="0.45" />
      <ellipse cx="52" cy="45" rx="3.2" ry="1.8" fill="#F9A8D4" opacity="0.45" />
      {/* 몸통 */}
      <rect x="28" y="56" width="24" height="20" rx="5" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M35 56 L40 61 L45 56" stroke="#2D2D2D" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      {/* 왼팔 → 지도 */}
      <path d="M28 62 L20 60" stroke="#2D2D2D" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="20" cy="60" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <rect x="4" y="54" width="16" height="12" rx="2" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M7 57 Q10 60 13 57 Q16 54 19 57" stroke="#FBBF24" strokeWidth="0.8" fill="none" />
      <path d="M7 61 Q10 64 13 61" stroke="#FBBF24" strokeWidth="0.8" fill="none" />
      <circle cx="16" cy="58" r="1.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.5" />
      {/* 오른팔 → 깃발 */}
      <path d="M52 58 Q60 50 66 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="66" cy="44" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <line x1="66" y1="44" x2="66" y2="30" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M66 30 L78 35 L66 40" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
      {/* 퀘스트 느낌표 */}
      <rect x="38" y="2" width="4" height="9" rx="2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="40" cy="14" r="2.2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8" />
      <rect x="70" y="52" width="4" height="9" rx="2" fill="#10B981" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="72" cy="64" r="2.2" fill="#10B981" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  ),
  "무인-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* === HAIR FIRST — full long closed path before face === */}
        <path d="M18 32 Q18 10 40 8 Q62 10 62 32 L64 74 Q56 84 46 80 Q40 78 34 80 Q24 84 16 74 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* Hair shine highlight */}
        <path d="M26 12 Q36 8 46 10" stroke="#4B5563" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
        {/* === BEAR EARS — on top of hair === */}
        <circle cx="24" cy="18" r="7" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
        <circle cx="56" cy="18" r="7" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
        <circle cx="24" cy="18" r="4" fill="#D97706"/>
        <circle cx="56" cy="18" r="4" fill="#D97706"/>
        {/* === FACE — drawn AFTER hair === */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 속눈썹 */}
        <path d="M31 30 Q34 28 37 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M43 30 Q46 28 49 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 눈썹 — 강인한 굵은 눈썹 */}
        <path d="M29 27 Q33 24.5 37 27" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M43 27 Q47 24.5 51 27" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* 눈 — 강인하지만 따뜻한 눈 */}
        <circle cx="34" cy="33" r="3" fill="#2D2D2D"/>
        <circle cx="46" cy="33" r="3" fill="#2D2D2D"/>
        <circle cx="35.2" cy="31.8" r="1.2" fill="white"/>
        <circle cx="47.2" cy="31.8" r="1.2" fill="white"/>
        {/* 볼터치 — 큼직한 핑크 */}
        <ellipse cx="27" cy="38" rx="6" ry="3.5" fill="#F9A8D4" opacity="0.7"/>
        <ellipse cx="53" cy="38" rx="6" ry="3.5" fill="#F9A8D4" opacity="0.7"/>
        {/* 입 — 강인한 미소 */}
        <path d="M35 41 Q40 45 45 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 몸통 — 여성스러운 실루엣 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 방패 — 왼손 */}
        <path d="M6 52 Q6 44 14 44 Q22 44 22 52 L22 68 Q14 74 6 68 Z" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 방패에 하트 */}
        <path d="M16 54 C14.8 52.4 12 52.4 12 54.5 C12 52.4 9.2 52.4 8 54 C6.8 56 12 60 12 60 C12 60 17.2 56 16 54Z" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="0.8"/>
        {/* 오른팔 — 힘차게 */}
        <path d="M52 57 Q62 52 68 49" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <circle cx="69" cy="48" r="4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 주먹 쥔 손 — 강함 표현 */}
        <line x1="67" y1="46" x2="71" y2="46" stroke="#2D2D2D" strokeWidth="1"/>
        <line x1="67" y1="48" x2="71" y2="48" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  ),
  "기묘-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 이어폰 */}
        <circle cx="24" cy="38" r="3.5" fill="#475569" stroke="#2D2D2D" strokeWidth="1.2" />
        <circle cx="56" cy="38" r="3.5" fill="#475569" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M24 34 Q40 26 56 34" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 머리카락 — 자연스럽게 */}
        <path d="M22 32 Q22 14 40 12 Q58 14 58 32" fill="#2D2D2D" />
        <path d="M22 24 Q20 20 24 16" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
        <path d="M58 24 Q60 20 56 16" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
        {/* 얼굴 */}
        <circle cx="40" cy="40" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 반항기 — 눈썹 살짝 올림 */}
        <path d="M29 31 Q33 28 37 31" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M43 30 Q47 27 51 30" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* 눈 — 부드럽지만 살짝 반항기 */}
        <path d="M31 37 Q34 34 37 37" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M43 37 Q46 34 49 37" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 입 — 부드러운 미소, 살짝 비뚤 */}
        <path d="M35 46 Q39 49 44 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 — 부드럽게 */}
        <ellipse cx="28" cy="43" rx="3" ry="1.5" fill="#FB923C" opacity="0.25" />
        <ellipse cx="52" cy="43" rx="3" ry="1.5" fill="#FB923C" opacity="0.25" />
        {/* 몸통 — 후드 + 끈 */}
        <path d="M26 56 Q24 60 24 76 L56 76 Q56 60 54 56 Q47 54 40 54 Q33 54 26 56Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 55 Q40 60 47 55" stroke="#B45309" strokeWidth="1.2" fill="none" />
        <line x1="37" y1="57" x2="36" y2="67" stroke="#2D2D2D" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="43" y1="57" x2="44" y2="67" stroke="#2D2D2D" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="36" cy="68" r="1.2" fill="#B45309" stroke="#2D2D2D" strokeWidth="0.5" />
        <circle cx="44" cy="68" r="1.2" fill="#B45309" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* 이어폰 선 — 몸까지 이어짐 */}
        <path d="M24 41 Q22 48 22 56 Q24 60 28 60" stroke="#475569" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M56 41 Q58 48 58 56 Q56 60 52 60" stroke="#475569" strokeWidth="1" fill="none" opacity="0.6" />
        {/* 왼팔 → 밀 한 줄기 */}
        <path d="M26 62 Q18 62 13 64" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M11 66 L11 46" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 54 Q7 48 9 44 Q11 50 11 54Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M11 50 Q15 44 13 40 Q11 46 11 50Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M11 46 Q8 40 10 36 Q12 42 11 46Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 오른팔 → 여유로운 V 손짓 */}
        <path d="M54 62 Q62 60 66 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="68" cy="54" rx="3" ry="3.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M66 52 L65 47 M69 52 L70 47" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<>
  <path d="M24 31 Q26 35 31 33 Q38 36 46 33 Q52 35 56 30 Q57 24 40 23 Q25 24 24 31 Z" fill="#2D2D2D" />
  <path d="M47 25 Q42 30 36 33" stroke="#4B5563" strokeWidth="0.9" fill="none" opacity="0.5" />
</>
    </svg>
  ),
  "기묘-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 단발 스트레이트, 토끼귀 */}
        <path d="M20 32 Q20 10 40 8 Q60 10 60 32 Q62 48 54 54 Q46 58 40 58 Q34 58 26 54 Q18 48 20 32 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 토끼귀 */}
        <path d="M26 16 Q22 4 28 2 Q32 6 30 16 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M54 16 Q58 4 52 2 Q48 6 50 16 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M27 14 Q24 6 28 4 Q30 8 29 14 Z" fill="#FDDCB5" />
        <path d="M53 14 Q56 6 52 4 Q50 8 51 14 Z" fill="#FDDCB5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 */}
        <circle cx="34" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 미소 */}
        <path d="M36 41 Q40 45 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="30" cy="38" rx="5" ry="3" fill="#F9A8D4" opacity="0.7" />
        <ellipse cx="50" cy="38" rx="5" ry="3" fill="#F9A8D4" opacity="0.7" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 팔 — 손 흔드는 */}
        <path d="M28 52 Q18 48 14 42" stroke="#FDDCB5" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M28 52 Q18 48 14 42" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* 와이파이 신호 — 오른쪽 */}
        <path d="M56 52 Q63 44 70 52" stroke="#60A5FA" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M58 56 Q63 50 68 56" stroke="#60A5FA" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M60 60 Q63 56 66 60" stroke="#60A5FA" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5" />
        <circle cx="63" cy="63" r="1.8" fill="#60A5FA" opacity="0.8" />
    </svg>
  ),
  "무자-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* === 부처님 (참다참다 한 방) === */}
      {/* 후광 */}
      <circle cx="40" cy="30" r="19" fill="#FEF9C3" opacity="0.3" />
      <circle cx="40" cy="30" r="19" fill="none" stroke="#FCD34D" strokeWidth="2" opacity="0.85" />
      <circle cx="40" cy="30" r="22" fill="none" stroke="#FCD34D" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 3" />
      {/* 긴 귓불 */}
      <ellipse cx="27" cy="37" rx="2.6" ry="6.5" fill="#F5D9A8" stroke="#2D2D2D" strokeWidth="1.2" />
      <ellipse cx="53" cy="37" rx="2.6" ry="6.5" fill="#F5D9A8" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 얼굴 */}
      <circle cx="40" cy="33" r="13" fill="#F5D9A8" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 나발 캡 + 육계 */}
      <path d="M28 31 Q26 16 40 14 Q54 16 52 31 Q47 25 40 24 Q33 25 28 31 Z" fill="#3B4252" stroke="#2D2D2D" strokeWidth="1.3" strokeLinejoin="round" />
      <ellipse cx="40" cy="14" rx="6" ry="6.5" fill="#3B4252" stroke="#2D2D2D" strokeWidth="1.3" />
      {/* 보주(정수리 불꽃) */}
      <path d="M40 8 Q42.5 4 40 0.5 Q37.5 4 40 8 Z" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="0.7" strokeLinejoin="round" />
      {/* 나발 컬 */}
      <circle cx="33" cy="22" r="1.3" fill="#2D3340" />
      <circle cx="40" cy="20.5" r="1.3" fill="#2D3340" />
      <circle cx="47" cy="22" r="1.3" fill="#2D3340" />
      <circle cx="36.5" cy="18" r="1.2" fill="#2D3340" />
      <circle cx="43.5" cy="18" r="1.2" fill="#2D3340" />
      <circle cx="40" cy="14" r="1.2" fill="#2D3340" />
      {/* 백호(미간) */}
      <circle cx="40" cy="29" r="1.3" fill="white" stroke="#2D2D2D" strokeWidth="0.6" />
      {/* 눈썹 — 온화 */}
      <path d="M33 30.5 Q36 29.5 38.5 30.5" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M41.5 30.5 Q44 29.5 47 30.5" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* 눈 — 반개(평온) */}
      <path d="M33 33.5 Q35.5 35.5 38 33.5" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M42 33.5 Q44.5 35.5 47 33.5" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* 입 — 잔잔한 미소 */}
      <path d="M36 39 Q40 41.5 44 39" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* 살짝 분노 힘줄 (참다…) */}
      <path d="M48 23 L50 25 M50.5 23 L48.5 25 M49.3 22.3 L49.3 25.7" stroke="#EF4444" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      {/* 가사(robe) 몸통 */}
      <path d="M28 50 Q26 56 26 74 L54 74 Q54 56 52 50 Q46 48 40 48 Q34 48 28 50 Z" fill="#E8851E" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M30 50 Q40 58 53 53" stroke="#C2410C" strokeWidth="1.6" fill="none" opacity="0.8" />
      <path d="M34 74 L37 56 M44 74 L46 58" stroke="#C2410C" strokeWidth="1" opacity="0.5" />
      {/* 왼손 — 평온한 무드라 */}
      <path d="M28 60 Q23 63 23 67" stroke="#E8851E" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="23" cy="68" rx="4" ry="3" fill="#F5D9A8" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M20 68 L26 68" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.5" />
      {/* === 오른손 한 방 (주먹) === */}
      <path d="M56 50 L50 49 M57 54 L51 55 M56 58 L50 60" stroke="#EF4444" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
      <path d="M52 55 L64 54" stroke="#E8851E" strokeWidth="4" strokeLinecap="round" />
      <circle cx="67" cy="54" r="4.5" fill="#F5D9A8" stroke="#2D2D2D" strokeWidth="1.4" />
      <path d="M64 52 L70 52 M64 54.5 L70 54.5" stroke="#2D2D2D" strokeWidth="0.6" opacity="0.6" />
      {/* 임팩트 버스트 */}
      <path d="M73 54 L77 51 L75 55 L79 56 L74.5 57 L76 61 L72.5 58 L71 62 L71 56 Z" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="0.7" strokeLinejoin="round" opacity="0.9" />
    </svg>
  ),
  "무자-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 늑대 꼬리 (뒤) */}
      <path d="M52 58 Q66 56 70 46 Q66 51 60 53 Q68 49 66 41 Q59 51 52 60Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M64 47 Q67 45 67 42" stroke="#475569" strokeWidth="0.8" fill="none" />
      {/* 늑대 귀 */}
      <path d="M26 18 L22 8 L31 14Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M54 18 L58 8 L49 14Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M27 15 L25 10 L29.5 13Z" fill="#475569" />
      <path d="M53 15 L55 10 L50.5 13Z" fill="#475569" />
      {/* 머리 — 잔잔 웨이브 단발 (여성 템플릿5, 차분) */}
      <path d="M18 34 Q18 12 40 10 Q62 12 62 34 Q64 46 58 52 Q60 58 56 62 Q48 66 40 64 Q32 66 24 62 Q20 58 22 52 Q16 46 18 34 Z" fill="#374151" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 40 Q26 37 30 40" stroke="#1F2937" strokeWidth="0.9" fill="none" opacity="0.45" />
      <path d="M50 40 Q54 37 58 40" stroke="#1F2937" strokeWidth="0.9" fill="none" opacity="0.45" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="34" rx="14" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 차분 */}
      <path d="M30 30 Q34 29 38 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M42 30 Q46 29 50 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 눈 — 차분한 (살짝 가늘게) */}
      <path d="M31 33.5 Q34.5 32 38 33.5" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M42 33.5 Q45.5 32 49 33.5" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* 입 — 차분한 미소 + 살짝 송곳니(속은 야생) */}
      <path d="M35 40 Q40 43 45 40" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M42 40.5 L43 43" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="29" cy="38" rx="3.2" ry="1.9" fill="#F9A8D4" opacity="0.45" />
      <ellipse cx="51" cy="38" rx="3.2" ry="1.9" fill="#F9A8D4" opacity="0.45" />
      {/* 몸통 */}
      <path d="M28 52 Q26 58 26 74 L54 74 Q54 58 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#64748B" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M34 51 L40 56 L46 51" stroke="#334155" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 양팔 — 차분 포즈 (허리) */}
      <path d="M28 58 Q23 60 25 64" stroke="#2D2D2D" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="64" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <path d="M52 58 Q57 60 55 64" stroke="#2D2D2D" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="55" cy="64" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
    </svg>
  ),
  "기축-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 뿔 */}
        <path d="M27 18 Q24 10 20 8 Q22 14 27 18 Z" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.2"/>
        <path d="M53 18 Q56 10 60 8 Q58 14 53 18 Z" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.2"/>
        {/* 귀 */}
        <ellipse cx="21" cy="26" rx="7" ry="9" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        <ellipse cx="21" cy="26" rx="4" ry="6" fill="#FCA5A5"/>
        <ellipse cx="59" cy="26" rx="7" ry="9" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        <ellipse cx="59" cy="26" rx="4" ry="6" fill="#FCA5A5"/>
        {/* 머리 */}
        <ellipse cx="40" cy="34" rx="17" ry="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 눈 — 느긋한 반달눈 */}
        <path d="M31 30 Q34 33 37 30" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M43 30 Q46 33 49 30" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* 코 */}
        <ellipse cx="40" cy="38" rx="6" ry="4" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1"/>
        <circle cx="37.5" cy="38" r="1.5" fill="#2D2D2D"/>
        <circle cx="42.5" cy="38" r="1.5" fill="#2D2D2D"/>
        {/* 볼터치 */}
        <ellipse cx="27" cy="36" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.5"/>
        <ellipse cx="53" cy="36" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.5"/>
        {/* 입 — 여유 미소 */}
        <path d="M35 43 Q40 47 45 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 몸통 — 통통한 소 */}
        <ellipse cx="40" cy="67" rx="18" ry="16" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 소 무늬 */}
        <ellipse cx="34" cy="62" rx="5" ry="6" fill="#2D2D2D" opacity="0.12"/>
        <ellipse cx="47" cy="68" rx="4" ry="5" fill="#2D2D2D" opacity="0.1"/>
        <ellipse cx="37" cy="73" rx="3" ry="4" fill="#2D2D2D" opacity="0.09"/>
        {/* 앞발 */}
        <ellipse cx="28" cy="80" rx="5" ry="4" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
        <ellipse cx="52" cy="80" rx="5" ry="4" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 꼬리 */}
        <path d="M58 56 Q68 54 70 60 Q72 68 66 70" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  "기축-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 벽돌 더미 (왼쪽) */}
      <rect x="3" y="60" width="15" height="6" rx="1" fill="#C2410C" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="5" y="54" width="15" height="6" rx="1" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="3" y="48" width="15" height="6" rx="1" fill="#C2410C" stroke="#2D2D2D" strokeWidth="1.2" />
      <line x1="10.5" y1="60" x2="10.5" y2="66" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.4" />
      {/* 머리 — 양갈래 (여성 템플릿4, 안전모 밑 실용적) */}
      <path d="M22 30 Q22 10 40 8 Q58 10 58 30 Q58 38 50 42 Q40 44 30 42 Q22 38 22 30 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M20 30 Q12 40 14 62 Q16 70 20 68 Q26 64 22 50 Q20 40 22 32 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M60 30 Q68 40 66 62 Q64 70 60 68 Q54 64 58 50 Q60 40 58 32 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="21" cy="31" r="3" fill="#0EA5E9" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="59" cy="31" r="3" fill="#0EA5E9" stroke="#2D2D2D" strokeWidth="1" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="34" rx="14" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 안전모 */}
      <path d="M26 26 Q40 12 54 26 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="25" y="25" width="30" height="3.5" rx="1.5" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1" />
      {/* 눈썹 — 든든 */}
      <path d="M30 30 Q34 28.5 38 30" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M42 30 Q46 28.5 50 30" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="35" cy="34" r="2.5" fill="#2D2D2D" />
      <circle cx="45" cy="34" r="2.5" fill="#2D2D2D" />
      <circle cx="36" cy="33" r="0.9" fill="white" />
      <circle cx="46" cy="33" r="0.9" fill="white" />
      {/* 입 — 믿음직한 미소 */}
      <path d="M35 40 Q40 44 45 40" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="29" cy="38" rx="3.4" ry="2" fill="#FCA5A5" opacity="0.5" />
      <ellipse cx="51" cy="38" rx="3.4" ry="2" fill="#FCA5A5" opacity="0.5" />
      {/* 몸통 — 작업복 */}
      <path d="M28 52 Q26 58 26 74 L54 74 Q54 58 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#0EA5E9" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M34 51 L40 56 L46 51" stroke="#0369A1" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 왼팔 → 벽돌더미 짚음 */}
      <path d="M28 58 Q22 60 18 56" stroke="#2D2D2D" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="17" cy="55" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      {/* 오른팔 → 엄지척 (맡겨!) */}
      <path d="M52 58 Q58 55 60 50" stroke="#2D2D2D" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="61" cy="49" r="2.6" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <rect x="59.8" y="42" width="2.4" height="5" rx="1.2" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  ),
  "무술-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 머리 — 투블럭 스트레이트, 갈색 + 결 */}
        <path d="M22 28 Q20 10 40 8 Q60 10 58 28 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 13 Q34 18 32 22" stroke="#B45309" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M40 11 Q41 17 40 22" stroke="#B45309" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M47 13 Q46 18 48 22" stroke="#B45309" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="16" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 앞머리 — 쉼표머리 (한쪽 쓸어 + 끝 컬) */}
        <path d="M24 27 Q26 32 33 30 Q44 33 51 27 Q55 24 54 29 Q52 33 56 29 Q58 20 40 19 Q25 20 24 27 Z" fill="#92400E" />
        <path d="M48 22 Q44 27 38 30" stroke="#B45309" strokeWidth="0.9" fill="none" opacity="0.6" />
        {/* 눈썹 — 든든하게 */}
        <path d="M30 29 Q34 27.5 37 29" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M43 29 Q46 27.5 50 29" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* 눈 — 여유있는 */}
        <path d="M31 34 Q34 36 37 34" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M43 34 Q46 36 49 34" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 입 — 여유있는 미소 */}
        <path d="M35 43 Q40 46 45 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="29" cy="39" rx="3" ry="2" fill="#FB923C" opacity="0.25" />
        <ellipse cx="51" cy="39" rx="3" ry="2" fill="#FB923C" opacity="0.25" />
        {/* 몸통 — 넓고 든든 + 안전벨트 */}
        <rect x="22" y="52" width="36" height="22" rx="4" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M30 52 L48 74" stroke="#475569" strokeWidth="3" opacity="0.85" />
        <rect x="36" y="61" width="4" height="3" rx="0.6" fill="#1E293B" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* 왼팔 — 운전대 잡기 */}
        <path d="M22 60 Q16 62 10 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 운전대 */}
        <circle cx="10" cy="68" r="7" fill="none" stroke="#2D2D2D" strokeWidth="2" />
        <circle cx="10" cy="68" r="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="10" y1="61" x2="10" y2="68" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="68" x2="10" y2="75" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="68" x2="17" y2="68" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        {/* 오른팔 — 커피 들기 */}
        <path d="M58 58 Q64 56 68 54" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 커피컵 */}
        <rect x="64" y="48" width="10" height="12" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M74 51 Q78 52 74 57" stroke="#2D2D2D" strokeWidth="1.2" fill="none" />
        <rect x="65" y="49" width="8" height="3" rx="1" fill="#92400E" opacity="0.7" />
        {/* 커피 스팀 */}
        <path d="M67 47 Q68 44 67 42" stroke="#94A3B8" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M70 46 Q71 43 70 41" stroke="#94A3B8" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  "무술-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 풍성한 양옆 파마, 다크브라운 (여성: 닫힌 Z-path 먼저!) */}
        <path d="M11 44 Q6 36 7 24 Q8 14 14 9 Q20 5 40 5 Q60 5 66 9 Q72 14 73 24 Q74 36 69 44 Q64 52 40 54 Q16 52 11 44 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 파마 컬 질감 — 왼쪽 */}
        <path d="M11 26 Q14 22 17 26 Q20 30 23 26" stroke="#5C2608" strokeWidth="1" fill="none" opacity="0.55" strokeLinecap="round"/>
        <path d="M10 35 Q13 31 16 35 Q19 39 22 35" stroke="#5C2608" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round"/>
        <path d="M13 44 Q16 40 19 44 Q22 48 25 44" stroke="#5C2608" strokeWidth="1" fill="none" opacity="0.45" strokeLinecap="round"/>
        {/* 파마 컬 질감 — 오른쪽 */}
        <path d="M69 26 Q66 22 63 26 Q60 30 57 26" stroke="#5C2608" strokeWidth="1" fill="none" opacity="0.55" strokeLinecap="round"/>
        <path d="M70 35 Q67 31 64 35 Q61 39 58 35" stroke="#5C2608" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round"/>
        <path d="M67 44 Q64 40 61 44 Q58 48 55 44" stroke="#5C2608" strokeWidth="1" fill="none" opacity="0.45" strokeLinecap="round"/>
        {/* 파마 컬 질감 — 상단 */}
        <path d="M28 7 Q32 4 36 7 Q40 10 44 7 Q48 4 52 7" stroke="#5C2608" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"/>
        {/* 얼굴 */}
        <ellipse cx="40" cy="30" rx="14" ry="13" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 속눈썹 — 여성 */}
        <path d="M27 23 Q30 20 33 23" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M47 23 Q50 20 53 23" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 눈 */}
        <ellipse cx="30" cy="27" rx="3" ry="2.5" fill="#2D2D2D"/>
        <ellipse cx="50" cy="27" rx="3" ry="2.5" fill="#2D2D2D"/>
        <circle cx="31" cy="26.2" r="1" fill="white"/>
        <circle cx="51" cy="26.2" r="1" fill="white"/>
        {/* 볼터치 — 크고 따뜻한 */}
        <ellipse cx="24" cy="32" rx="5" ry="3" fill="#FCA5A5" opacity="0.7"/>
        <ellipse cx="56" cy="32" rx="5" ry="3" fill="#FCA5A5" opacity="0.7"/>
        {/* 입 — 큰 따뜻한 미소 */}
        <path d="M32 37 Q40 43 48 37" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 몸통 — 여성, 둥근 체형 */}
        <path d="M24 46 Q18 50 18 64 Q18 74 40 76 Q62 74 62 64 Q62 50 56 46 Q50 44 40 44 Q30 44 24 46 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 앞치마 */}
        <path d="M28 48 Q28 62 40 64 Q52 62 52 48 Q46 46 40 46 Q34 46 28 48 Z" fill="white" stroke="#2D2D2D" strokeWidth="1" opacity="0.85"/>
        {/* 앞치마 리본 */}
        <path d="M34 48 Q37 51 40 48 Q43 51 46 48" stroke="#FCA5A5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 팔 — 포옹 포즈, 넓게 펼침 */}
        <path d="M18 52 Q8 50 4 56 Q2 62 6 66 Q10 68 18 62" stroke="#FDDCB5" strokeWidth="9" strokeLinecap="round" fill="none"/>
        <path d="M18 52 Q8 50 4 56 Q2 62 6 66 Q10 68 18 62" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M62 52 Q72 50 76 56 Q78 62 74 66 Q70 68 62 62" stroke="#FDDCB5" strokeWidth="9" strokeLinecap="round" fill="none"/>
        <path d="M62 52 Q72 50 76 56 Q78 62 74 66 Q70 68 62 62" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        {/* 발 */}
        <ellipse cx="31" cy="78" rx="6" ry="5" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5"/>
        <ellipse cx="49" cy="78" rx="6" ry="5" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 하트들 — 따뜻한 에너지 */}
        <path d="M3 48 C3 48 1.5 46.5 1.5 45.5 A1.5 1.5 0 0 1 3 45 A1.5 1.5 0 0 1 4.5 45.5 C4.5 46.5 3 48 3 48Z" fill="#FCA5A5" opacity="0.5"/>
        <path d="M77 48 C77 48 75.5 46.5 75.5 45.5 A1.5 1.5 0 0 1 77 45 A1.5 1.5 0 0 1 78.5 45.5 C78.5 46.5 77 48 77 48Z" fill="#FCA5A5" opacity="0.5"/>
        <path d="M40 6 C40 6 38.5 4.5 38.5 3.5 A1.5 1.5 0 0 1 40 3 A1.5 1.5 0 0 1 41.5 3.5 C41.5 4.5 40 6 40 6Z" fill="#FCA5A5" opacity="0.4"/>
    </svg>
  ),
  "기해-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 양갈래 + 빨간 머리핀 (겉바속촉) */}
        <path d="M22 30 Q22 10 40 8 Q58 10 58 30" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M20 30 Q12 40 14 60 Q16 68 20 66 Q26 62 22 50 Q20 40 22 32 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M60 30 Q68 40 66 60 Q64 68 60 66 Q54 62 58 50 Q60 40 58 32 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 빨간 머리핀 */}
        <circle cx="21" cy="30" r="3.5" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="59" cy="30" r="3.5" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1" />
        {/* 얼굴 */}
        <circle cx="40" cy="36" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈 — 무심한 */}
        <circle cx="34" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2" fill="#2D2D2D" />
        {/* 입 — 무표정에 살짝 미소 */}
        <path d="M35 42 Q40 44 45 42" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 — 은근히 따뜻 */}
        <ellipse cx="29" cy="38" rx="3" ry="2" fill="#FCA5A5" opacity="0.3" />
        <ellipse cx="51" cy="38" rx="3" ry="2" fill="#FCA5A5" opacity="0.3" />
        {/* 몸통 — 세련된 정장 */}
        <rect x="24" y="52" width="32" height="22" rx="4" fill="#1E3A8A" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 정장 라펠 */}
        <path d="M34 52 L40 58 L46 52" stroke="#94A3B8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 넥타이 */}
        <path d="M39 58 L40 65 L41 58" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 크루아상 소품 */}
        <path d="M8 66 C8 60 14 58 18 62 C22 60 26 64 24 68 C22 72 14 72 10 70 C8 70 8 68 8 66Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M10 64 C12 62 16 60 18 62" stroke="#92400E" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        {/* 숨겨진 하트 */}
        <path d="M54 40 C54 38 56 36 58 38 C60 36 62 38 62 40 C62 42 58 46 58 46 C58 46 54 42 54 40Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.7" />
    </svg>
  ),
  "기해-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 단발 스트레이트, 검정 */}
        <path d="M20 32 Q20 10 40 8 Q60 10 60 32 Q62 48 54 54 Q46 58 40 58 Q34 58 26 54 Q18 48 20 32 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 평온한 */}
        <path d="M31 34 Q34 36 37 34" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M43 34 Q46 36 49 34" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 입 — 차분한 미소 */}
        <path d="M36 41 Q40 44 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="30" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.55" />
        <ellipse cx="50" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.55" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 에어팟 — 마이웨이, 내 음악 */}
        <ellipse cx="25" cy="38" rx="2.5" ry="3.5" fill="white" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="25" cy="40" r="1.2" fill="#D1D5DB" />
        <ellipse cx="55" cy="38" rx="2.5" ry="3.5" fill="white" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="55" cy="40" r="1.2" fill="#D1D5DB" />
        {/* 음표 */}
        <path d="M10 60 Q10 56 14 55 L14 62" stroke="#FBBF24" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="12" cy="62" r="2" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="0.7" />
    </svg>
  ),
  "무신-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 투블럭, 금발 + 결 */}
        <path d="M22 28 Q20 10 40 8 Q60 10 58 28 Z" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 13 Q34 18 32 22" stroke="#A16207" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M40 11 Q41 17 40 22" stroke="#A16207" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M47 13 Q46 18 48 22" stroke="#A16207" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="16" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 집중 (결과 뽑는 중) */}
        <path d="M30 29 Q34 27 37 29" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M43 29 Q46 27 50 29" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* 눈 — 또렷 */}
        <circle cx="34" cy="34" r="2.6" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.6" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="1" fill="white" />
        <circle cx="47" cy="33" r="1" fill="white" />
        {/* 입 — 효율적인 미소 */}
        <path d="M36 43 Q40 46 44 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="29" cy="39" rx="3" ry="2" fill="#FCA5A5" opacity="0.3" />
        <ellipse cx="51" cy="39" rx="3" ry="2" fill="#FCA5A5" opacity="0.3" />
        {/* 몸통 — 작업셔츠 + 카라 + 펜포켓 */}
        <path d="M24 52 Q22 56 22 74 L58 74 Q58 56 56 52 Q48 50 40 50 Q32 50 24 52Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 51 L40 57 L44 51" stroke="#B45309" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        <rect x="46" y="58" width="6" height="7" rx="1" fill="#FDE68A" stroke="#B45309" strokeWidth="0.8" />
        <line x1="48" y1="57" x2="48" y2="62" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" />
        {/* 오른팔 → 톱니바퀴 (돌리는 중) */}
        <path d="M56 58 Q61 56 64 54" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="66" cy="54" r="7" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2" />
        <circle cx="66" cy="54" r="3" fill="#FDF6EE" stroke="#2D2D2D" strokeWidth="0.8" />
        <rect x="64.5" y="45" width="3" height="4" rx="1" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.5" />
        <rect x="64.5" y="59" width="3" height="4" rx="1" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.5" />
        <rect x="57" y="52.5" width="4" height="3" rx="1" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.5" />
        <rect x="71" y="52.5" width="4" height="3" rx="1" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* 왼팔 → 완성 결과물 (체크된 서류) */}
        <path d="M24 60 Q18 60 14 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="3" y="50" width="13" height="16" rx="1.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(-6 9 58)" />
        <rect x="5" y="54" width="13" height="16" rx="1.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M7 60 L9 63 L13 57" stroke="#4ADE80" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="7" y1="66" x2="15" y2="66" stroke="#94A3B8" strokeWidth="0.8" strokeLinecap="round" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<>
  <path d="M24 27 Q25 32 28 31 Q34 33 40 31 Q46 33 52 31 Q55 32 56 27 Q57 20 40 19 Q24 20 24 27 Z" fill="#EAB308" />
  <path d="M31 22 L30 30 M40 21 L40 30 M49 22 L50 30" stroke="#A16207" strokeWidth="0.7" opacity="0.5" />
</>
    </svg>
  ),
  "무신-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 단발 스트레이트, 딥핑크 (닫힌 Z path) */}
        <path d="M20 32 Q20 10 40 8 Q60 10 60 32 Q62 48 54 54 Q46 58 40 58 Q34 58 26 54 Q18 48 20 32 Z" fill="#BE185D" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 헤어핀 — 별 */}
        <path d="M55 16 L56.5 12 L58 16 L62 16 L59 19 L60 23 L56.5 21 L53 23 L54 19 L51 16 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.7" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 32 Q34 30 37 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 32 Q46 30 49 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 */}
        <ellipse cx="34" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <ellipse cx="46" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 자신감 미소 */}
        <path d="M36 41 Q40 45 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
        <ellipse cx="52" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
        {/* 몸통 — 하늘색 블라우스 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#7DD3FC" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* V넥 깃 */}
        <path d="M36 50 L40 57 L44 50" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* 왼팔 — 파일 스택 들기 */}
        <path d="M27 58 Q20 58 18 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 정렬된 컬러 파일 스택 */}
        <rect x="4" y="58" width="16" height="14" rx="2" fill="#FCE7F3" stroke="#2D2D2D" strokeWidth="1" />
        <rect x="3" y="55" width="16" height="14" rx="2" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="1" />
        <rect x="2" y="52" width="16" height="14" rx="2" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1" />
        {/* 오른팔 — 클립보드 들기 */}
        <path d="M52 54 Q55 52 58 50" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 클립보드 */}
        <rect x="56" y="46" width="16" height="20" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="1" />
        <rect x="59" y="44" width="10" height="4" rx="1" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 컬러 탭 */}
        <rect x="69" y="48" width="4" height="4" rx="1" fill="#F87171" />
        <rect x="69" y="54" width="4" height="4" rx="1" fill="#FBBF24" />
        <rect x="69" y="60" width="4" height="4" rx="1" fill="#4ADE80" />
        {/* 체크마크 + 항목들 */}
        <path d="M59 52 L61 55 L66 49" stroke="#4ADE80" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="59" y1="58" x2="68" y2="58" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="59" y1="62" x2="65" y2="62" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  ),
  "기유-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 크라운 — 캡-Z, 딥 네이비 */}
        <path d="M22 30 Q20 12 40 10 Q60 12 58 30 Z" fill="#1E3A8A" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <circle cx="40" cy="36" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 앞머리 — 가르마 스윕 (얼굴 위, fill만) */}
        <path d="M24 26 Q26 30 31 28 Q38 31 46 28 Q52 30 56 25 Q57 20 40 19 Q25 20 24 26 Z" fill="#1E3A8A" />
        <path d="M47 21 Q42 26 36 29" stroke="#2563EB" strokeWidth="0.9" fill="none" opacity="0.6" />
        {/* 눈썹 — 장인의 집중 */}
        <path d="M30 30 Q34 28 37 30" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        <path d="M43 30 Q46 28 50 30" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        {/* 눈 — 집중력 */}
        <circle cx="34" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="1" fill="white" />
        <circle cx="47" cy="33" r="1" fill="white" />
        {/* 입 — 자신만만 */}
        <path d="M36 43 Q40 46 44 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="29" cy="40" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.3" />
        <ellipse cx="51" cy="40" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.3" />
        {/* 몸통 — 청색 작업복 + 깃 */}
        <path d="M24 52 Q22 56 22 74 L58 74 Q58 56 56 52 Q48 50 40 50 Q32 50 24 52Z" fill="#1D4ED8" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 51 L40 57 L44 51" stroke="#93C5FD" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* 흰 작업 앞치마 */}
        <path d="M33 57 L47 57 L46 74 L34 74 Z" fill="white" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M34 57 Q40 53 46 57" stroke="#E2E8F0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 왼팔 → 우물 */}
        <path d="M24 58 Q19 58 16 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 우물 지붕 */}
        <path d="M3 50 L12 44 L21 50 Z" fill="#B45309" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
        {/* 우물 기둥 */}
        <line x1="5" y1="50" x2="5" y2="62" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="19" y1="50" x2="19" y2="62" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
        {/* 두레박 + 줄 */}
        <line x1="12" y1="48" x2="12" y2="57" stroke="#2D2D2D" strokeWidth="0.8" />
        <rect x="9" y="56" width="6" height="5" rx="1" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 우물 기단 */}
        <rect x="2" y="62" width="20" height="8" rx="2" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.2" />
        <ellipse cx="12" cy="62" rx="10" ry="3" fill="#B45309" stroke="#2D2D2D" strokeWidth="1" />
        {/* 오른팔 → 바이올린 */}
        <path d="M56 58 Q60 56 62 53" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 바이올린 */}
        <ellipse cx="66" cy="52" rx="5" ry="7" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2" />
        <ellipse cx="66" cy="52" rx="2.4" ry="3.4" fill="#B45309" stroke="#2D2D2D" strokeWidth="0.6" />
        <line x1="66" y1="45" x2="66" y2="41" stroke="#2D2D2D" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="64" y1="48" x2="68" y2="48" stroke="#2D2D2D" strokeWidth="0.7" />
        {/* 활 */}
        <line x1="58" y1="64" x2="76" y2="47" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="58" y1="64" x2="76" y2="47" stroke="#FDE68A" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),
  "기유-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 겁나 큰 화살표 — 왼쪽 상단(머리)→오른쪽 하단, 몸 뒤에 */}
        <path d="M3 4 L9 26 L14 22 L72 88 L78 84 L19 17 L24 12 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
        {/* 헤어 — 단발 스트레이트, 하늘색 (닫힌 Z path 먼저) */}
        <path d="M20 32 Q20 10 40 8 Q60 10 60 32 Q62 48 54 54 Q46 58 40 58 Q34 58 26 54 Q18 48 20 32 Z" fill="#06B6D4" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 32 Q34 30 37 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 32 Q46 30 49 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 확신에 찬 눈 */}
        <ellipse cx="34" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <ellipse cx="46" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 당당한 미소 */}
        <path d="M36 41 Q40 45 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
        <ellipse cx="52" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
        {/* 헤어 장식 — 반짝이 핀 */}
        <path d="M52 10 L54 6 L56 10 L60 10 L57 13 L58 17 L54 15 L50 17 L51 13 L48 10 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 다이아 소품 */}
        <path d="M60 52 L66 52 L70 57 L63 66 L56 57 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
        <path d="M60 52 L66 52 L63 56 Z" fill="#F1F5F9" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
    </svg>
  ),
  "무오-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 투블럭, 짙은 슬레이트 + 결 */}
        <path d="M22 28 Q20 10 40 8 Q60 10 58 28 Z" fill="#1E3A5F" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 13 Q34 18 32 22" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M47 13 Q46 18 48 22" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 얼굴 */}
        <circle cx="40" cy="36" r="17" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 */}
        <path d="M28 29 Q34 27 39 29" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M41 29 Q46 27 52 29" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* 따뜻한 눈 — 살짝 감긴 */}
        <path d="M30 35 Q34 32 38 35" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M42 35 Q46 32 50 35" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 따뜻한 미소 */}
        <path d="M32 45 Q40 52 48 45" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="26" cy="41" rx="4.5" ry="2.5" fill="#F9A8D4" opacity="0.45" />
        <ellipse cx="54" cy="41" rx="4.5" ry="2.5" fill="#F9A8D4" opacity="0.45" />
        {/* 몸통 — 든든한 서포터 유니폼 */}
        <path d="M24 52 Q22 56 22 76 L58 76 Q58 56 56 52 Q48 50 40 50 Q32 50 24 52Z" fill="#0369A1" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* V넥 흰 트림 */}
        <path d="M35 51 L40 58 L45 51" stroke="#BAE6FD" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
        {/* 사이드 스트라이프 */}
        <path d="M27 53 L26 76" stroke="#FBBF24" strokeWidth="1.8" opacity="0.85" />
        <path d="M53 53 L54 76" stroke="#FBBF24" strokeWidth="1.8" opacity="0.85" />
        {/* 어깨 트림 */}
        <path d="M26 54 L31 57 M54 54 L49 57" stroke="#075985" strokeWidth="1.2" strokeLinecap="round" />
        {/* 번호 플레이트 + 1번 */}
        <rect x="33" y="60" width="14" height="11" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M38.6 63 L40.3 61.8 L40.3 69" stroke="#0369A1" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* 가슴 응원 하트 */}
        <path d="M30 55.5 Q30 54.2 31.1 54.2 Q32.2 54.2 32.2 55.6 Q32.2 57 30 58.4 Q27.8 57 27.8 55.6 Q27.8 54.2 28.9 54.2 Q30 54.2 30 55.5Z" fill="#F472B6" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* 빗자루 — 오른손 */}
        <path d="M56 58 Q62 54 65 50" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M62 52 L72 42" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M66 46 Q74 38 78 44 Q74 52 66 46Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M68 45 L74 47 M67 48 L73 50" stroke="#B45309" strokeWidth="0.6" opacity="0.7" />
        {/* 왼팔 → 엄지척 (응원하는 서포터) */}
        <path d="M24 58 Q16 56 12 52" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="9" cy="50" r="3.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M8 47 L8 42" stroke="#FDDCB5" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M8 47 L8 42" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M24 27 Q27 32 31 29 Q34 32 38 29 Q42 32 46 29 Q50 32 53 29 Q56 31 56 27 Q57 20 40 19 Q24 20 24 27 Z" fill="#1E3A5F" />
    </svg>
  ),
  "무오-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 장발 웨이브 퍼머, 연한 갈색 (먼저 그림) */}
        <path d="M16 30 Q16 8 40 6 Q64 8 64 30 Q68 42 62 50 Q56 58 64 66 Q68 74 62 80 Q54 86 46 82 Q40 80 34 82 Q26 86 18 80 Q12 74 16 66 Q24 58 18 50 Q12 42 16 30 Z" fill="#C68642" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="38" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="2" />
        {/* 속눈썹 */}
        <path d="M31 33 Q34 31 37 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 33 Q46 31 49 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 따뜻하지만 단호한 */}
        <circle cx="34" cy="36" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="36" r="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="35" r="0.8" fill="white" />
        <circle cx="47" cy="35" r="0.8" fill="white" />
        {/* 눈썹 — 단호한 */}
        <line x1="30" y1="31" x2="37" y2="31" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="43" y1="31" x2="50" y2="31" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        {/* 입 — 따뜻한 보스 미소 */}
        <path d="M35 43 Q40 47 45 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="41" rx="3" ry="1.5" fill="#FB923C" opacity="0.35" />
        <ellipse cx="52" cy="41" rx="3" ry="1.5" fill="#FB923C" opacity="0.35" />
        {/* 몸통 — 보스 앞치마 원피스 */}
        <path d="M28 54 Q26 58 26 74 L54 74 Q54 58 52 54 Q46 52 40 52 Q34 52 28 54Z" fill="#7C3AED" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 앞치마 */}
        <rect x="31" y="57" width="18" height="14" rx="2" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M33 57 Q40 53 47 57" stroke="#FDE68A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 왼팔 */}
        <path d="M28 58 L18 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 왼손: 서류 */}
        <rect x="6" y="52" width="12" height="16" rx="1.5" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="9" y1="56" x2="15" y2="56" stroke="#94A3B8" strokeWidth="0.6" />
        <line x1="9" y1="59" x2="14" y2="59" stroke="#94A3B8" strokeWidth="0.6" />
        <line x1="9" y1="62" x2="15" y2="62" stroke="#94A3B8" strokeWidth="0.6" />
        {/* 오른팔 — 몽둥이 들기 */}
        <path d="M52 58 L62 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 강철 몽둥이 — 손잡이 */}
        <rect x="59" y="18" width="6" height="28" rx="2" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 몽둥이 머리 */}
        <rect x="54" y="10" width="16" height="12" rx="5" fill="#64748B" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="62" y1="13" x2="62" y2="19" stroke="white" strokeWidth="1.5" opacity="0.6" />
    </svg>
  ),
  "기미-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 거북이 등껍질 (모자처럼) */}
        <path d="M22 30 Q22 12 40 10 Q58 12 58 30" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 등껍질 육각 패턴 */}
        <path d="M34 16 L40 14 L46 16 L46 22 L40 24 L34 22 Z" stroke="#2D2D2D" strokeWidth="0.8" fill="#66D19E" opacity="0.6" />
        {/* 얼굴 */}
        <circle cx="40" cy="40" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 느긋하게 */}
        <path d="M30 32 Q34 31 37 32.5" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M43 32.5 Q46 31 50 32" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* 눈 — 느긋한 3자 눈 */}
        <path d="M31 37 Q34 35 37 37" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M43 37 Q46 35 49 37" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 입 — 느긋한 웃음 */}
        <path d="M35 45 Q40 49 45 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="43" rx="3.5" ry="1.5" fill="#FB923C" opacity="0.3" />
        <ellipse cx="52" cy="43" rx="3.5" ry="1.5" fill="#FB923C" opacity="0.3" />
        {/* 몸통 — 거북이 등껍질 */}
        <ellipse cx="40" cy="70" rx="20" ry="16" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="2" />
        {/* 등껍질 패턴 */}
        <path d="M32 64 L40 62 L48 64 L48 72 L40 74 L32 72 Z" stroke="#2D2D2D" strokeWidth="0.8" fill="#66D19E" opacity="0.5" />
        <path d="M24 70 Q28 68 30 72" stroke="#2D2D2D" strokeWidth="0.7" fill="none" opacity="0.4" />
        <path d="M50 72 Q52 68 56 70" stroke="#2D2D2D" strokeWidth="0.7" fill="none" opacity="0.4" />
        {/* 왼팔 → 손 (느긋) */}
        <path d="M22 62 Q17 67 18 74" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="18" cy="76" r="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        {/* 오른팔 → 힐링 허브 든 손 */}
        <path d="M58 62 Q63 66 63 72" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="63" cy="74" r="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M63 71 L63 60" stroke="#15803D" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M63 64 Q58 61 59 56 Q63 59 63 64Z" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M63 62 Q68 59 67 54 Q63 57 63 62Z" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 힐링 오라 */}
        <circle cx="12" cy="48" r="3" fill="#4ADE80" opacity="0.2" />
        <circle cx="70" cy="50" r="2" fill="#4ADE80" opacity="0.15" />
        <circle cx="8" cy="56" r="2" fill="#4ADE80" opacity="0.15" />
    </svg>
  ),
  "기미-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 롱웨이브, 따뜻한 갈색 (여성 템플릿3) */}
        <path d="M16 30 Q16 8 40 6 Q64 8 64 30 Q68 42 62 50 Q56 58 64 66 Q68 74 62 80 Q54 86 46 82 Q40 80 34 82 Q26 86 18 80 Q12 74 16 66 Q24 58 18 50 Q12 42 16 30 Z" fill="#A16207" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M20 42 Q24 38 28 42" stroke="#854D0E" strokeWidth="0.9" fill="none" opacity="0.5" />
        <path d="M52 42 Q56 38 60 42" stroke="#854D0E" strokeWidth="0.9" fill="none" opacity="0.5" />
        {/* 얼굴 — 여성 타원 */}
        <ellipse cx="40" cy="38" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 33 Q34 31 37 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 33 Q46 31 49 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 밝고 환한 */}
        <circle cx="34" cy="36" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="36" r="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="35" r="1" fill="white" />
        <circle cx="47" cy="35" r="1" fill="white" />
        {/* 입 — 환한 미소 */}
        <path d="M34 43 Q40 49 46 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="29" cy="39" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6" />
        <ellipse cx="51" cy="39" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6" />
        {/* 몸통 — 여성 */}
        <path d="M28 52 Q26 56 26 72 L54 72 Q54 56 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 왼팔 → 따뜻한 머그 (위로) */}
        <path d="M28 60 Q20 60 15 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M4 60 L15 60 L14 70 Q14 72 12 72 L6 72 Q4 72 4 70 Z" fill="#FFF7ED" stroke="#2D2D2D" strokeWidth="1.3" />
        <path d="M15 62 Q19 63 18 67" stroke="#2D2D2D" strokeWidth="1.2" fill="none" />
        <path d="M5 63 L13 63" stroke="#C8956B" strokeWidth="2.5" opacity="0.85" />
        <path d="M9 65 Q8 63.8 7 64.6 Q7.4 66 9 67.2 Q10.6 66 11 64.6 Q10 63.8 9 65Z" fill="#F472B6" opacity="0.8" />
        <path d="M7 58 Q8 55 7 53" stroke="#CBD5E1" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M11 58 Q12 55 11 53" stroke="#CBD5E1" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.45" />
        {/* 오른팔 — 배터리 들기 */}
        <path d="M52 58 L62 52" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 배터리 소품 */}
        <rect x="60" y="40" width="16" height="22" rx="3" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <rect x="64" y="37" width="8" height="4" rx="2" fill="#4B5563" stroke="#2D2D2D" strokeWidth="1" />
        {/* 배터리 게이지 — 충전 중 */}
        <rect x="63" y="55" width="10" height="4" rx="1" fill="#4ADE80" />
        <rect x="63" y="49" width="10" height="4" rx="1" fill="#4ADE80" />
        <rect x="63" y="43" width="10" height="4" rx="1" fill="#E5E7EB" />
        {/* 번개 아이콘 */}
        <path d="M65 46 L63 50 L67 50 L65 55 L70 49 L66 49 L68 46 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.7" />
    </svg>
  ),
  "무진-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 머리카락 — 캡 Z + 결 */}
        <path d="M22 32 Q22 14 40 12 Q58 14 58 32 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 17 Q34 22 32 26" stroke="#52525B" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M47 17 Q46 22 48 26" stroke="#52525B" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 얼굴 — 넉넉하고 안정적 */}
        <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 평온한 */}
        <path d="M30 31 Q34 29 38 31" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M42 31 Q46 29 50 31" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* 눈 — 흔들리지 않는 평온한 눈 */}
        <circle cx="34" cy="36" r="2.8" fill="#2D2D2D" />
        <circle cx="46" cy="36" r="2.8" fill="#2D2D2D" />
        <circle cx="35" cy="35" r="1" fill="white" />
        <circle cx="47" cy="35" r="1" fill="white" />
        {/* 입 — 여유 있는 미소 */}
        <path d="M33 44 Q40 49 47 44" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="27" cy="41" rx="3.5" ry="1.8" fill="#FBBF24" opacity="0.35" />
        <ellipse cx="53" cy="41" rx="3.5" ry="1.8" fill="#FBBF24" opacity="0.35" />
        {/* 몸통 — 오뚝이 (상하 2톤 + 광택 + 무게추) */}
        <ellipse cx="40" cy="66" rx="14" ry="18" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
        {/* 하단 무게추 (진한 톤) */}
        <path d="M26.3 70 Q40 75 53.7 70 Q54 79 40 83.5 Q26 79 26.3 70Z" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 허리 밴드 */}
        <path d="M26.3 70 Q40 73.5 53.7 70" stroke="#B45309" strokeWidth="1.4" fill="none" />
        {/* 광택 하이라이트 */}
        <path d="M30 56 Q27 62 29 68" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
        {/* 중심 잡는 팔 — 수평으로 벌린 + 손 */}
        <path d="M26 60 Q18 59 12 57" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="10" cy="56" r="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M54 60 Q62 59 68 57" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="70" cy="56" r="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        {/* 가슴 산 엠블럼 (원형 배지) */}
        <circle cx="40" cy="62" r="6.5" fill="white" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M34.8 64.5 L40 57.5 L45.2 64.5 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
        <path d="M37.6 61 L40 58.2 L42.4 61" stroke="white" strokeWidth="0.7" fill="none" />
        {/* 흔들 모션 호 (오뚝이) */}
        <path d="M19 83 Q23 79 25 81" stroke="#FBBF24" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />
        <path d="M61 83 Q57 79 55 81" stroke="#FBBF24" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<>
  <path d="M24 28 Q26 32 31 30 Q38 33 46 30 Q52 32 56 27 Q57 21 40 20 Q25 21 24 28 Z" fill="#2D2D2D" />
  <path d="M47 23 Q42 28 36 31" stroke="#52525B" strokeWidth="0.9" fill="none" opacity="0.5" />
</>
    </svg>
  ),
  "무진-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 곰 귀 */}
        <circle cx="26" cy="22" r="8" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
        <circle cx="54" cy="22" r="8" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
        <circle cx="26" cy="22" r="4" fill="#FDE68A" />
        <circle cx="54" cy="22" r="4" fill="#FDE68A" />
        {/* 얼굴 */}
        <circle cx="40" cy="40" r="20" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
        {/* 눈 — 따뜻한 아치형 */}
        <path d="M32 36 Q34 32 36 36" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M44 36 Q46 32 48 36" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* 입 — 부드러운 미소 */}
        <path d="M34 44 Q40 50 46 44" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="42" rx="4" ry="2" fill="#FB923C" opacity="0.3" />
        <ellipse cx="52" cy="42" rx="4" ry="2" fill="#FB923C" opacity="0.3" />
        {/* 몸통 — 둥근 곰 */}
        <ellipse cx="40" cy="72" rx="22" ry="16" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
        {/* 팔 — 포옹 자세 */}
        <path d="M18 65 Q12 72 18 80" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M62 65 Q68 72 62 80" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 배 하트 */}
        <path d="M40 72 C40 72 36 68 36 66 A2.5 2.5 0 0 1 40 65 A2.5 2.5 0 0 1 44 66 C44 68 40 72 40 72Z" fill="#FB923C" opacity="0.4" />
    </svg>
  ),
  "기사-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 뱀 후드 (귀여운 뱀 모티프) */}
        <path d="M20 32 Q16 14 40 10 Q64 14 60 32" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 뱀 비늘 패턴 */}
        <circle cx="30" cy="18" r="2.5" fill="#66D19E" opacity="0.5" />
        <circle cx="40" cy="14" r="2.5" fill="#66D19E" opacity="0.5" />
        <circle cx="50" cy="18" r="2.5" fill="#66D19E" opacity="0.5" />
        {/* 얼굴 */}
        <circle cx="40" cy="40" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 순하게 */}
        <path d="M30 33 Q34 31.5 37 33" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M43 33 Q46 31.5 50 33" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* 눈 — 순한 큰 눈 */}
        <circle cx="34" cy="38" r="3.5" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="34" cy="39" r="2" fill="#2D2D2D" />
        <circle cx="46" cy="38" r="3.5" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="46" cy="39" r="2" fill="#2D2D2D" />
        <circle cx="35" cy="37" r="0.8" fill="white" />
        <circle cx="47" cy="37" r="0.8" fill="white" />
        {/* 입 — 순둥이 미소 */}
        <path d="M36 45 Q40 49 44 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="27" cy="43" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
        <ellipse cx="53" cy="43" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
        {/* 전구 — 머리 위 */}
        <path d="M40 2 L40 6" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="40" cy="0" r="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M38 3 L42 3" stroke="#2D2D2D" strokeWidth="0.6" />
        {/* 몸통 — 카라 */}
        <path d="M26 56 Q24 60 24 76 L56 76 Q56 60 54 56 Q47 54 40 54 Q33 54 26 56Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 55 L40 61 L44 55" stroke="#B45309" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* 오른팔 → 체스보드 */}
        <path d="M54 60 Q58 60 61 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="60" y="54" width="16" height="16" rx="1" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <rect x="60" y="54" width="8" height="8" fill="#2D2D2D" opacity="0.15" />
        <rect x="68" y="62" width="8" height="8" fill="#2D2D2D" opacity="0.15" />
        {/* 왼팔 → 체스 말 (전략) */}
        <path d="M26 60 Q20 61 16 64" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M11 70 L17 70 L16 66 Q16 62 14 61 Q12 62 12 66 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
        <ellipse cx="14" cy="71" rx="4" ry="1.5" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" />
        {/* 뱀 꼬리 — 발 옆 */}
        <path d="M24 74 Q18 78 20 82 Q22 86 16 85" stroke="#4ADE80" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  "기사-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 장발 스트레이트, 갈색 (닫힌 Z path) */}
        <path d="M18 32 Q18 10 40 8 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 큰 리본 — 헤어 위에 그림 */}
        <path d="M28 14 Q20 6 24 2 Q32 6 36 14Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M52 14 Q60 6 56 2 Q48 6 44 14Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="40" cy="14" r="4" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="2" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 초롱초롱 */}
        <circle cx="34" cy="33" r="3" fill="#2D2D2D"/>
        <circle cx="46" cy="33" r="3" fill="#2D2D2D"/>
        <circle cx="35.2" cy="31.8" r="1.3" fill="white"/>
        <circle cx="47.2" cy="31.8" r="1.3" fill="white"/>
        <circle cx="36.5" cy="34.5" r="0.7" fill="white" opacity="0.7"/>
        <circle cx="48.5" cy="34.5" r="0.7" fill="white" opacity="0.7"/>
        {/* 입 — 환한 웃음 (위로 올림) */}
        <path d="M30 40 Q40 48 50 40" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M32 40 Q40 46 48 40" fill="#F9A8D4" opacity="0.3" />
        {/* 볼터치 */}
        <ellipse cx="26" cy="40" rx="4.5" ry="2.5" fill="#F9A8D4" opacity="0.5" />
        <ellipse cx="54" cy="40" rx="4.5" ry="2.5" fill="#F9A8D4" opacity="0.5" />
        {/* 몸통 */}
        <rect x="27" y="52" width="26" height="22" rx="5" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="2" />
        {/* 체스 말 — 손에 */}
        <rect x="58" y="54" width="8" height="14" rx="3" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.2" />
        <circle cx="62" cy="53" r="3.5" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.2" />
    </svg>
  ),
  "경인-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 머리카락 — 다크, 캡 + 삐친머리 */}
        <path d="M22 30 Q20 12 40 10 Q60 12 58 30 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M40 10 Q45 3 49 7 Q46 9 44 12Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1" />
        {/* 앞머리 결 */}
        <path d="M33 16 Q34 20 32 24" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M40 14 Q41 19 40 24" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M47 16 Q46 20 48 24" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* 머리띠 — 헤어 위 */}
        <path d="M21 27 L59 27" stroke="#F87171" strokeWidth="4" strokeLinecap="round" />
        <path d="M21 27 L14 24 M21 27 L14 30" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" />
        {/* 얼굴 */}
        <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 힘차게 */}
        <path d="M29 30 Q33 27 37 30" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M51 30 Q47 27 43 30" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 눈 — 불타는 */}
        <circle cx="34" cy="36" r="3" fill="#2D2D2D" />
        <circle cx="46" cy="36" r="3" fill="#2D2D2D" />
        <circle cx="35.5" cy="35" r="1.2" fill="white" />
        <circle cx="47.5" cy="35" r="1.2" fill="white" />
        {/* 입 — 의지에 찬 */}
        <path d="M35 45 L40 43 L45 45" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 볼터치 — 빨간 열정 */}
        <ellipse cx="27" cy="41" rx="3.5" ry="1.8" fill="#F87171" opacity="0.4" />
        <ellipse cx="53" cy="41" rx="3.5" ry="1.8" fill="#F87171" opacity="0.4" />
        {/* 몸통 — 네이비 + 카라 */}
        <path d="M26 54 Q24 58 24 74 L56 74 Q56 58 54 54 Q47 52 40 52 Q33 52 26 54Z" fill="#1E3A8A" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 53 L40 58 L44 53" stroke="#93C5FD" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* 왼팔 → 글러브 */}
        <path d="M26 58 Q18 58 14 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="11" cy="55" rx="8" ry="7" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M11 49 Q9 51 9 54" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.5" />
        <line x1="4" y1="55" x2="9" y2="55" stroke="#B91C1C" strokeWidth="1" opacity="0.5" />
        {/* 오른팔 → 글러브 */}
        <path d="M54 58 Q62 58 66 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="69" cy="55" rx="8" ry="7" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M69 49 Q67 51 67 54" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.5" />
        <line x1="71" y1="55" x2="76" y2="55" stroke="#B91C1C" strokeWidth="1" opacity="0.5" />
        {/* 파이팅 이펙트 */}
        <path d="M3 44 L1 48 L5 47 L2 52" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinejoin="round" opacity="0.6" />
        <path d="M77 44 L79 48 L75 47 L78 52" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinejoin="round" opacity="0.5" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M23 29 Q25 34 28 31 Q30 35 33 31 Q36 35 39 31 Q42 35 45 31 Q48 35 51 31 Q54 34 57 29 Q58 22 40 21 Q22 22 23 29 Z" fill="#1F2937" />
    </svg>
  ),
  "경인-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 단발 스트레이트 — 빨강 (승부욕 표현) */}
        <path d="M20 32 Q20 10 40 8 Q60 10 60 32 Q62 48 54 54 Q46 58 40 58 Q34 58 26 54 Q18 48 20 32 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 1등 메달 — 머리 위 */}
        <circle cx="40" cy="4" r="7" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 8 L34 16" stroke="#F87171" strokeWidth="2" strokeLinecap="round" />
        <path d="M44 8 L46 16" stroke="#F87171" strokeWidth="2" strokeLinecap="round" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 33 Q34 31 37 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 33 Q46 31 49 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 강렬한 투지 */}
        <circle cx="34" cy="35" r="3" fill="#2D2D2D" />
        <circle cx="46" cy="35" r="3" fill="#2D2D2D" />
        <circle cx="35.5" cy="33.5" r="1.2" fill="white" />
        <circle cx="47.5" cy="33.5" r="1.2" fill="white" />
        {/* 눈썹 — 의지 */}
        <line x1="29" y1="29" x2="37" y2="28" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="51" y1="29" x2="43" y2="28" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" />
        {/* 입 — 당당한 미소 */}
        <path d="M35 42 Q40 46 45 42" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="39" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />
        <ellipse cx="52" cy="39" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />
        {/* 몸통 — 황금색 (1등 느낌) */}
        <rect x="28" y="58" width="24" height="20" rx="5" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
        {/* 트로피 — 크고 선명하게 */}
        <path d="M58 72 L58 56 Q58 50 65 50 Q72 50 72 56 L72 72" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M58 56 Q54 54 54 60 Q54 65 58 65" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
        <path d="M72 56 Q76 54 76 60 Q76 65 72 65" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
        <rect x="62" y="72" width="6" height="5" rx="1" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" />
        <line x1="58" y1="77" x2="72" y2="77" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 왼팔 주먹 — 승부 포즈 */}
        <path d="M28 62 L12 52" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
        <circle cx="10" cy="50" r="4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
    </svg>
  ),
  "신묘-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 머리 — 중단발 커튼앞머리, 은발 */}
        <path d="M20 30 Q20 10 40 8 Q60 10 60 30" fill="#D1D5DB" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M26 22 Q30 28 36 26 Q40 24 44 26 Q50 28 54 22" fill="#D1D5DB" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 앞머리 결 */}
        <path d="M32 16 Q33 21 31 25" stroke="#94A3B8" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M48 16 Q47 21 49 25" stroke="#94A3B8" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 구레나룻 */}
        <path d="M24 30 Q22 35 24 40" stroke="#D1D5DB" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M56 30 Q58 35 56 40" stroke="#D1D5DB" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="16" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 날카롭게 */}
        <path d="M30 29 Q34 27 37 30" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M43 30 Q46 27 50 29" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* 눈 — 날카로운 */}
        <circle cx="34" cy="34" r="2.2" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.2" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.9" fill="white" />
        <circle cx="47" cy="33" r="0.9" fill="white" />
        {/* 입 — 냉소적 미소 */}
        <path d="M35 43 Q39 46 45 42" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 몸통 — 딥 틸 + 카라 */}
        <path d="M24 52 Q22 56 22 74 L58 74 Q58 56 56 52 Q48 50 40 50 Q32 50 24 52Z" fill="#0F766E" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M35 51 L40 57 L45 51" stroke="#5EEAD4" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        <circle cx="40" cy="63" r="1.2" fill="#5EEAD4" opacity="0.7" />
        {/* 오른팔 → 검 */}
        <path d="M56 58 Q62 52 64 46" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 검 */}
        <path d="M62 46 L74 22" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
        <path d="M63 44 L73 24" stroke="#F8FAFC" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        <path d="M58 49 L67 44" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="61" cy="48" r="1.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<>
  <path d="M24 27 Q26 31 31 29 Q38 32 46 29 Q52 31 56 26 Q57 20 40 19 Q25 20 24 27 Z" fill="#D1D5DB" />
  <path d="M47 22 Q42 27 36 30" stroke="#94A3B8" strokeWidth="0.9" fill="none" opacity="0.6" />
</>
    </svg>
  ),
  "신묘-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 헤어 — 웨이브 펌 단발, 금발 */}
      <path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 38 60 44 Q54 50 62 54 Q66 60 58 64 Q50 68 44 65 Q40 63 36 65 Q30 68 22 64 Q14 60 18 54 Q26 50 20 44 Q14 38 18 30 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 36 Q26 33 30 36" stroke="#EAB308" strokeWidth="0.9" fill="none" opacity="0.5" />
      <path d="M50 36 Q54 33 58 36" stroke="#EAB308" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 단정하게 (속눈썹 제거됨) */}
      <path d="M30 30 Q34 28.5 37 30" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M43 30 Q46 28.5 50 30" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="34" cy="34" r="2.2" fill="#2D2D2D" />
      <circle cx="46" cy="34" r="2.2" fill="#2D2D2D" />
      <circle cx="35" cy="33" r="0.9" fill="white" />
      <circle cx="47" cy="33" r="0.9" fill="white" />
      {/* 입 — 야무진 미소 */}
      <path d="M36 42 Q40 45 44 42" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="29" cy="39" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.6" />
      <ellipse cx="51" cy="39" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.6" />
      {/* 머리핀 — 노랑별 */}
      <path d="M52 16 L53.5 12 L55 16 L59 16 L56 18.5 L57 22 L53.5 20 L50 22 L51 18.5 L48 16 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
      {/* 몸통 — 바이올렛 + 깃 */}
      <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#7C3AED" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M36 49 L40 55 L44 49" stroke="#C4B5FD" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      {/* 왼팔 → 스카이블루 자 */}
      <path d="M28 58 Q20 57 15 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="2" y="56" width="14" height="4" rx="1" fill="#38BDF8" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M4 56 L4 59 M6 56 L6 58 M8 56 L8 59 M10 56 L10 58 M12 56 L12 59 M14 56 L14 58" stroke="#0C4A6E" strokeWidth="0.5" opacity="0.7" />
      {/* 오른팔 → 정리된 컬러 라벨 */}
      <path d="M52 58 Q60 57 64 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="64" y="49" width="13" height="5" rx="1" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.9" />
      <rect x="64" y="55" width="13" height="5" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.9" />
      <rect x="64" y="61" width="13" height="5" rx="1" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.9" />
    </svg>
  ),
  "경자-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 머리 — 숏컷, 검정 + 삐친머리 */}
        <path d="M24 30 Q24 14 40 12 Q56 14 56 30" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M40 12 Q45 5 49 9 Q46 11 44 14Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1" />
        {/* 앞머리 결 */}
        <path d="M33 17 Q34 21 32 25" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M47 17 Q46 21 48 25" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* 얼굴 */}
        <circle cx="40" cy="36" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 단호하게 */}
        <path d="M30 28 Q34 25 38 28" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M42 28 Q46 25 50 28" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 눈 — 날카로운 */}
        <circle cx="34" cy="34" r="2.2" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.2" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.9" fill="white" />
        <circle cx="47" cy="33" r="0.9" fill="white" />
        {/* 입 — 크게 벌린 (팩트 발사) */}
        <ellipse cx="40" cy="44" rx="5" ry="3.5" fill="#1F2937" />
        <ellipse cx="40" cy="43" rx="3.5" ry="2" fill="#F87171" />
        {/* 몸통 — 네이비 + 카라 */}
        <path d="M24 52 Q22 56 22 74 L58 74 Q58 56 56 52 Q48 50 40 50 Q32 50 24 52Z" fill="#1E3A8A" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 51 L40 57 L44 51" stroke="#93C5FD" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* 왼팔 → 폭탄 */}
        <path d="M24 60 Q17 60 13 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="10" cy="63" r="7" fill="#374151" stroke="#2D2D2D" strokeWidth="1.2" />
        <circle cx="8" cy="61" r="2" fill="#64748B" opacity="0.6" />
        <path d="M10 56 Q14 50 18 52" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M18 50 L17 47 L20 49 L19 52Z" fill="#FACC15" />
        {/* FACT 플래카드 — 오른팔로 듦 */}
        <path d="M56 60 Q63 60 67 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="60" y="54" width="18" height="13" rx="2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M63 58 L63 63 M63 58 L66 58 M63 60.5 L65 60.5" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M69 58 L69 63 M67.5 58 L70.5 58" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M73 58 L75 63 M77 58 L75 63" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M24 27 Q25 32 28 31 Q34 33 40 31 Q46 33 52 31 Q55 32 56 27 Q57 20 40 19 Q24 20 24 27 Z" fill="#1F2937" />
    </svg>
  ),
  "경자-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 중단발 스트레이트, 실버 */}
        <path d="M18 32 Q18 10 40 8 Q62 10 62 32 L62 62 Q56 72 46 70 Q40 68 34 70 Q24 72 18 62 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 쿨한 */}
        <circle cx="34" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 쿨한 미소 */}
        <path d="M36 41 Q40 44 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="30" cy="38" rx="4" ry="2.5" fill="#BAE6FD" opacity="0.6" />
        <ellipse cx="50" cy="38" rx="4" ry="2.5" fill="#BAE6FD" opacity="0.6" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#BAE6FD" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 삭제 버튼 소품 */}
        <rect x="8" y="54" width="14" height="14" rx="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M11 57 L19 65" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 57 L11 65" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* 눈꽃 */}
        <path d="M60 44 L60 56" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M54 47 L66 53" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M54 53 L66 47" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="60" cy="50" r="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
    </svg>
  ),
  "신축-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 얼굴 */}
      <circle cx="40" cy="38" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 옆머리 — 헬멧 브림 밑 관자놀이에만 살짝 */}
      <path d="M26 31 Q24 38 27 42 Q30 40 29 32Z" fill="#1F2937" />
      <path d="M54 31 Q56 38 53 42 Q50 40 51 32Z" fill="#1F2937" />
      {/* 안전모 — 큰 돔이 정수리 완전히 덮음 + 브림 */}
      <path d="M23 29 Q23 9 40 8 Q57 9 57 29 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M30 14 Q40 11 50 14" stroke="#CBD5E1" strokeWidth="1" fill="none" opacity="0.6" />
      <rect x="21" y="28" width="38" height="4" rx="2" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 안전 ✚ (헬멧 정면) */}
      <path d="M40 15 L40 23 M36 19 L44 19" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
      {/* 눈썹 — 여유 (브림 밑) */}
      <path d="M30 34 Q34 32 38 34" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M42 34 Q46 32 50 34" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* 눈 — 반달 여유 */}
      <path d="M31 39 Q34 37 37 39" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M43 39 Q46 37 49 39" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* 입 — 여유 미소 */}
      <path d="M36 45 Q40 48 44 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="29" cy="43" rx="3.4" ry="2" fill="#FCA5A5" opacity="0.35" />
      <ellipse cx="51" cy="43" rx="3.4" ry="2" fill="#FCA5A5" opacity="0.35" />
      {/* 몸통 — 안전 조끼 */}
      <path d="M24 52 Q22 56 22 73 L58 73 Q58 56 56 52 Q48 50 40 50 Q32 50 24 52Z" fill="#475569" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M33 51 L33 73 M47 51 L47 73" stroke="#F59E0B" strokeWidth="2.6" opacity="0.9" />
      <path d="M24 64 L56 64" stroke="#FDE68A" strokeWidth="1.4" />
      {/* 오른손 → 지팡이(폴)에 확실한 길 지도 (비포 지도 이식) */}
      <path d="M56 58 L64 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="65" cy="56" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <line x1="68" y1="58" x2="68" y2="43" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <rect x="60" y="28" width="16" height="15" rx="1.5" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.3" />
      <path d="M60 33 L76 33 M60 38 L76 38" stroke="#E5C97B" strokeWidth="0.5" opacity="0.6" />
      <path d="M63 40 Q66 36 69 38 Q72 39 73 34" stroke="#22C55E" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeDasharray="0.2 2" />
      <path d="M71 31 L72.5 33 L75 29.5" stroke="#22C55E" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="63" cy="40" r="1" fill="#EF4444" />
      {/* 왼손 → 워킹 스틱 (steady) */}
      <path d="M24 58 L16 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="15" cy="60" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <line x1="14" y1="56" x2="11" y2="80" stroke="#A16207" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="14" cy="55" r="1.7" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.6" />
    </svg>
  ),
  "신축-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 머리 — 웨이브 펌 단발 (인디고) */}
      <path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 38 60 44 Q54 50 62 54 Q66 60 58 64 Q50 68 44 65 Q40 63 36 65 Q30 68 22 64 Q14 60 18 54 Q26 50 20 44 Q14 38 18 30 Z" fill="#312E81" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 36 Q26 33 30 36" stroke="#4F46E5" strokeWidth="0.9" fill="none" opacity="0.5" />
      <path d="M50 36 Q54 33 58 36" stroke="#4F46E5" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="38" rx="14" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 차분 자신감 */}
      <path d="M30 33 Q34 31 38 33" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M42 33 Q46 31 50 33" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* 눈 — 반짝 */}
      <circle cx="34" cy="37" r="2.7" fill="#2D2D2D" />
      <circle cx="46" cy="37" r="2.7" fill="#2D2D2D" />
      <circle cx="35.1" cy="35.9" r="1.1" fill="white" />
      <circle cx="47.1" cy="35.9" r="1.1" fill="white" />
      {/* 입 — 뿌듯한 미소 */}
      <path d="M35 44 Q40 47 45 44" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="28" cy="42" rx="3.4" ry="2" fill="#FCA5A5" opacity="0.4" />
      <ellipse cx="52" cy="42" rx="3.4" ry="2" fill="#FCA5A5" opacity="0.4" />
      {/* 몸통 — 인디고 드레스 */}
      <path d="M28 53 Q26 57 26 73 L54 73 Q54 57 52 53 Q46 51 40 51 Q34 51 28 53Z" fill="#6366F1" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M34 52 L40 57 L46 52" stroke="#E0E7FF" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 오른손 → 반지 들어올림 (결과!) */}
      <path d="M52 56 Q58 50 58 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="58" cy="42" r="2.4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <circle cx="58" cy="37" r="3.2" fill="none" stroke="#FACC15" strokeWidth="1.8" />
      <path d="M58 33 L56 30 L58 28.5 L60 30 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.7" strokeLinejoin="round" />
      <path d="M62 30 L64 28 M64 32 L66.5 31 M61 26 L62 24" stroke="#FACC15" strokeWidth="0.9" opacity="0.7" strokeLinecap="round" />
      {/* 왼손 → 모래시계 (슬로우) */}
      <path d="M28 58 Q22 58 18 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="17" cy="60" r="2.2" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M9 54 L17 54 L13 60 L17 66 L9 66 L13 60Z" fill="#E0F2FE" stroke="#2D2D2D" strokeWidth="1.1" strokeLinejoin="round" />
      <line x1="9" y1="54" x2="17" y2="54" stroke="#92400E" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="9" y1="66" x2="17" y2="66" stroke="#92400E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11 64 Q13 62 15 64Z" fill="#F59E0B" opacity="0.8" />
    </svg>
  ),
  "경술-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 개 귀 소품 (충견 의리) — 헤어 뒤 */}
        <path d="M20 20 Q14 10 18 6 Q22 8 22 16Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M60 20 Q66 10 62 6 Q58 8 58 16Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" />
        {/* 헤어 — 숏컷, 검정 + 결 */}
        <path d="M24 30 Q24 14 40 12 Q56 14 56 30" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M34 16 Q35 20 33 24" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M40 14 Q41 19 40 24" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M46 16 Q45 20 47 24" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="16" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 강한 */}
        <path d="M30 29 Q34 27 37 29" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M43 29 Q46 27 50 29" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 눈 — 단호한 눈 */}
        <circle cx="34" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.5" fill="#2D2D2D" />
        <circle cx="35.2" cy="33" r="1" fill="white" />
        <circle cx="47.2" cy="33" r="1" fill="white" />
        {/* 입 — 굳은 결의 */}
        <path d="M35 43 Q40 46 45 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="29" cy="40" rx="3" ry="2" fill="#FCA5A5" opacity="0.25" />
        <ellipse cx="51" cy="40" rx="3" ry="2" fill="#FCA5A5" opacity="0.25" />
        {/* 몸통 — 로열 블루 + 카라 */}
        <path d="M24 52 Q22 56 22 74 L58 74 Q58 56 56 52 Q48 50 40 50 Q32 50 24 52Z" fill="#1D4ED8" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 51 L40 57 L44 51" stroke="#93C5FD" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* 오른팔 → 방패 */}
        <path d="M56 58 Q62 58 66 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M60 54 L72 54 L72 66 Q66 73 60 66 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M66 56 L66 67" stroke="#94A3B8" strokeWidth="1" />
        <path d="M62 60 L70 60" stroke="#94A3B8" strokeWidth="1" />
        <circle cx="66" cy="60" r="1.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M24 29 Q26 34 33 32 Q44 35 51 29 Q55 26 54 31 Q52 35 56 31 Q58 22 40 21 Q25 22 24 29 Z" fill="#1F2937" />
    </svg>
  ),
  "경술-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 중단발 스트레이트, 화사한 바이올렛 (닫힌 Z path 먼저) */}
        <path d="M18 32 Q18 10 40 10 Q62 10 62 32 L62 62 Q56 72 46 70 Q40 68 34 70 Q24 72 18 62 Z" fill="#8B5CF6" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M26 18 Q24 28 26 40" stroke="#C4B5FD" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M54 18 Q56 28 54 40" stroke="#C4B5FD" strokeWidth="1" fill="none" opacity="0.6" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 32 Q34 30 37 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 32 Q46 30 49 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 날카로운 관찰 눈 */}
        <ellipse cx="34" cy="34" rx="2.5" ry="2" fill="#2D2D2D" />
        <ellipse cx="46" cy="34" rx="2.5" ry="2" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 의심스러운 미소 */}
        <path d="M36 41 Q40 45 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="38" rx="5" ry="3" fill="#C4B5FD" opacity="0.6" />
        <ellipse cx="52" cy="38" rx="5" ry="3" fill="#C4B5FD" opacity="0.6" />
        {/* 몸통 — 코랄 + 깃 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#FB7185" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 49 L40 55 L44 49" stroke="#FECDD3" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* 오른팔 → 거짓말 탐지 종 */}
        <path d="M52 56 Q58 54 62 51" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M64 50 L72 50" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M64 50 Q64 43 68 43 Q72 43 72 50 L72 50 Q66 52 64 50 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.2" />
        <circle cx="68" cy="40.5" r="1.6" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="0.8" />
        <circle cx="68" cy="52.5" r="1.6" fill="#92400E" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 딸랑 — 화사한 울림 */}
        <path d="M75 44 Q78 46 76 49" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M61 43 Q58 45 60 48" stroke="#FACC15" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55" />
    </svg>
  ),
  "신해-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 머리카락 — 인디고 캡 (헤드폰 밑) */}
        <path d="M24 34 Q24 16 40 14 Q56 16 56 34" fill="#4338CA" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M34 19 Q35 24 33 28" stroke="#818CF8" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M46 19 Q45 24 47 28" stroke="#818CF8" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 큰 헤드폰 밴드 */}
        <path d="M16 38 Q16 12 40 12 Q64 12 64 38" stroke="#2D2D2D" strokeWidth="3" fill="none" />
        {/* 헤드폰 왼쪽 */}
        <rect x="10" y="34" width="10" height="14" rx="4" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="15" y1="37" x2="15" y2="45" stroke="#FDBA74" strokeWidth="1" opacity="0.7" />
        {/* 헤드폰 오른쪽 */}
        <rect x="60" y="34" width="10" height="14" rx="4" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="65" y1="37" x2="65" y2="45" stroke="#FDBA74" strokeWidth="1" opacity="0.7" />
        {/* 얼굴 */}
        <circle cx="40" cy="40" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 편안하게 */}
        <path d="M30 33 Q34 31.5 37 33" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M43 33 Q46 31.5 50 33" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* 눈 — 편안히 감은 */}
        <path d="M31 38 Q34 41 37 38" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M43 38 Q46 41 49 38" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 입 — 편안한 미소 */}
        <path d="M36 45 Q40 48 44 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="43" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.4" />
        <ellipse cx="52" cy="43" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.4" />
        {/* 몸통 — 틸 + 후드끈 */}
        <path d="M26 56 Q24 60 24 76 L56 76 Q56 60 54 56 Q47 54 40 54 Q33 54 26 56Z" fill="#0F766E" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="36" y1="55" x2="35" y2="66" stroke="#2D2D2D" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="44" y1="55" x2="45" y2="66" stroke="#2D2D2D" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="35" cy="67" r="1.3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.5" />
        <circle cx="45" cy="67" r="1.3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* 배터리 아이콘 — 가슴 */}
        <rect x="48" y="60" width="11" height="6.5" rx="1.5" fill="white" stroke="#2D2D2D" strokeWidth="1" />
        <rect x="59" y="62" width="2" height="3" rx="0.5" fill="#2D2D2D" />
        <rect x="49.5" y="61.5" width="6" height="3.5" rx="0.5" fill="#4ADE80" />
        {/* 음표 떠다니는 */}
        <path d="M70 24 L70 16 L74 15 L74 23" stroke="#0F766E" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx="68" cy="25" r="2" fill="#0F766E" opacity="0.4" />
        <circle cx="73" cy="24" r="1.8" fill="#0F766E" opacity="0.4" />
        <path d="M8 28 L8 20" stroke="#0F766E" strokeWidth="1" opacity="0.4" />
        <circle cx="6" cy="29" r="2" fill="#0F766E" opacity="0.3" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<>
  <path d="M24 30 Q26 34 31 32 Q38 35 46 32 Q52 34 56 29 Q57 24 40 23 Q25 24 24 30 Z" fill="#4338CA" />
  <path d="M47 25 Q42 30 36 33" stroke="#312E81" strokeWidth="0.9" fill="none" opacity="0.6" />
</>
    </svg>
  ),
  "신해-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 초승달 + 별 머리장식 (🌌 혼자의 우주) */}
        <path d="M55 8 A6 6 0 1 0 55 20 A4.5 4.5 0 1 1 55 8Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M48 6 L49 9 L52 9.5 L49 10.5 L48 13.5 L47 10.5 L44 9.5 L47 9 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* 머리카락 — 딥 인디고 롱웨이브 (closed Z) */}
        <path d="M18 32 Q18 10 40 8 Q62 10 62 32 Q66 44 60 52 Q54 60 62 66 Q66 74 58 80 Q50 84 44 80 Q40 78 36 80 Q28 84 20 80 Q14 74 18 66 Q26 60 20 52 Q14 44 18 32 Z" fill="#312E81" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M22 42 Q26 38 30 42" stroke="#4F46E5" strokeWidth="0.9" fill="none" opacity="0.55" />
        <path d="M50 42 Q54 38 58 42" stroke="#4F46E5" strokeWidth="0.9" fill="none" opacity="0.55" />
        <path d="M21 58 Q25 54 29 58" stroke="#4F46E5" strokeWidth="0.9" fill="none" opacity="0.45" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M30 32 Q33 30.5 36 32" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M44 32 Q47 30.5 50 32" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* 눈썹 — 여유롭게 */}
        <path d="M29 28 Q33 26.5 37 28" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M43 28 Q47 26.5 51 28" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* 눈 — 여유로운 반개 (윗꺼풀 + 또렷 동공) */}
        <path d="M30 34 Q33.5 32.4 37 34" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M43 34 Q46.5 32.4 50 34" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <ellipse cx="33.5" cy="36" rx="2" ry="2.2" fill="#2D2D2D" />
        <ellipse cx="46.5" cy="36" rx="2" ry="2.2" fill="#2D2D2D" />
        <circle cx="34.3" cy="35.2" r="0.8" fill="white" />
        <circle cx="47.3" cy="35.2" r="0.8" fill="white" />
        {/* 입 — 만족 미소 */}
        <path d="M36 43 Q40 46 44 43" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="40" rx="4.2" ry="2.4" fill="#F9A8D4" opacity="0.55" />
        <ellipse cx="52" cy="40" rx="4.2" ry="2.4" fill="#F9A8D4" opacity="0.55" />
        {/* 몸통 — 카멜 니트 가디건 + 깃 + 브로치 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#D4A574" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M40 48 L36 54 L37 72 M40 48 L44 54 L43 72" stroke="#B0814E" strokeWidth="1" fill="none" />
        <path d="M34 60 Q40 56 46 60" stroke="#B0814E" strokeWidth="0.8" fill="none" opacity="0.6" />
        <circle cx="44" cy="55" r="1.4" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6" />
        {/* 오른팔 → 라떼 (혼카페) */}
        <path d="M52 58 Q58 58 62 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M61 56 L75 56 L73.5 66 Q73 68 71 68 L64.5 68 Q62.5 68 62 66 Z" fill="#FFF7ED" stroke="#2D2D2D" strokeWidth="1.3" />
        <path d="M62 59 L74.5 59" stroke="#C8956B" strokeWidth="2.5" opacity="0.8" />
        <path d="M68 58 Q66 60 68 61.5 Q70 60 68 58Z" fill="#A16207" opacity="0.7" />
        <path d="M75 58 Q79 59 78 63" stroke="#2D2D2D" strokeWidth="1.2" fill="none" />
        <path d="M66 53 Q67 50 66 48" stroke="#CBD5E1" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M70 53 Q71 50 70 48" stroke="#CBD5E1" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.45" />
        {/* 왼팔 → 펼친 책 (혼영·감성) */}
        <path d="M28 58 Q20 58 15 61" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M3 62 Q9 59 14 62 Q9 60 4 63 Z" fill="#A5B4FC" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M3 62 L3 72 Q8.5 69 14 72 L14 62 Q9 59.5 3 62 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
        <line x1="8.5" y1="62.5" x2="8.5" y2="71" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.6" />
        <line x1="4.5" y1="65" x2="7.5" y2="64.5" stroke="#94A3B8" strokeWidth="0.6" />
        <line x1="9.5" y1="64.5" x2="12.5" y2="65" stroke="#94A3B8" strokeWidth="0.6" />
        {/* 작은 토성 (우주 아우라) */}
        <circle cx="68" cy="34" r="2.4" fill="#C4B5FD" stroke="#2D2D2D" strokeWidth="0.8" />
        <ellipse cx="68" cy="34" rx="4.5" ry="1.6" fill="none" stroke="#FACC15" strokeWidth="0.9" transform="rotate(-20 68 34)" />
        <circle cx="13" cy="40" r="1.3" fill="#E2E8F0" opacity="0.7" />
    </svg>
  ),
  "경신-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 투블럭, 다크 차콜 + 삐친머리 */}
        <path d="M22 30 Q20 10 40 8 Q60 10 58 30 Z" fill="#374151" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M40 9 Q45 2 49 6 Q46 8 44 11Z" fill="#374151" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M33 14 Q34 19 32 23" stroke="#64748B" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M47 14 Q46 19 48 23" stroke="#64748B" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* 얼굴 */}
        <circle cx="40" cy="38" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 긴장된 */}
        <path d="M30 31 Q34 28 38 31" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M42 31 Q46 28 50 31" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 눈 — 긴장된 집중 */}
        <circle cx="34" cy="36" r="3" fill="#2D2D2D" />
        <circle cx="46" cy="36" r="3" fill="#2D2D2D" />
        <circle cx="35" cy="35" r="1.2" fill="white" />
        <circle cx="47" cy="35" r="1.2" fill="white" />
        {/* 입 — 흥분한 */}
        <path d="M34 45 Q40 48 46 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="41" rx="3" ry="1.5" fill="#F87171" opacity="0.35" />
        <ellipse cx="52" cy="41" rx="3" ry="1.5" fill="#F87171" opacity="0.35" />
        {/* 몸통 — 레이싱 레드 + 지퍼 */}
        <path d="M26 53 Q24 57 24 73 L56 73 Q56 57 54 53 Q47 51 40 51 Q33 51 26 53Z" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="40" y1="53" x2="40" y2="71" stroke="#7F1D1D" strokeWidth="1" strokeDasharray="1.5 1.5" />
        <rect x="38.5" y="53" width="3" height="3" rx="1" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* 왼팔 — 운전대 왼쪽 */}
        <path d="M28 60 L20 68" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        {/* 오른팔 — 운전대 오른쪽 */}
        <path d="M52 60 L60 68" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        {/* 운전대 */}
        <circle cx="40" cy="74" r="11" stroke="#2D2D2D" strokeWidth="2" fill="none" />
        <circle cx="40" cy="74" r="3.5" fill="#374151" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="40" y1="70.5" x2="40" y2="63" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="36.5" y1="74" x2="29" y2="74" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="43.5" y1="74" x2="51" y2="74" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속도 이펙트 */}
        <path d="M4 58 L16 58" stroke="#F87171" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M2 63 L14 63" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M4 68 L12 68" stroke="#F87171" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M23 29 Q25 34 28 31 Q30 35 33 31 Q36 35 39 31 Q42 35 45 31 Q48 35 51 31 Q54 34 57 29 Q58 22 40 21 Q22 22 23 29 Z" fill="#374151" />
    </svg>
  ),
  "경신-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 떠다니는 다이아 (검사 대상, 위) */}
      <path d="M37 14 L43 14 L46 19 L40 27 L34 19 Z" fill="#A5F3FC" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M37 14 L40 19 L43 14 M34 19 L46 19" stroke="#2D2D2D" strokeWidth="0.6" opacity="0.6" />
      <path d="M48 12 L49 15 M31 16 L33 17" stroke="#FACC15" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
      {/* 머리 — 잔잔 웨이브 단발 (다크, 단정) */}
      <path d="M18 36 Q18 14 40 12 Q62 14 62 36 Q64 48 58 54 Q60 60 56 64 Q48 68 40 66 Q32 68 24 64 Q20 60 22 54 Q16 48 18 36 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 42 Q26 39 30 42" stroke="#374151" strokeWidth="0.9" fill="none" opacity="0.45" />
      <path d="M50 42 Q54 39 58 42" stroke="#374151" strokeWidth="0.9" fill="none" opacity="0.45" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="40" rx="14" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 집중 */}
      <path d="M30 35 Q34 34 38 35.5" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M42 35.5 Q46 34 50 35" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      {/* 눈 — 한쪽 동그(보는 눈) 한쪽 가늘게(집중) */}
      <circle cx="34" cy="39" r="2.7" fill="#2D2D2D" />
      <circle cx="35.1" cy="37.9" r="1.1" fill="white" />
      <path d="M43.5 39 Q46 37.5 48.5 39" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 입 — 야무진 */}
      <path d="M36 46 Q40 48.5 44 46" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="29" cy="44" rx="3.2" ry="1.9" fill="#FCA5A5" opacity="0.35" />
      <ellipse cx="51" cy="44" rx="3.2" ry="1.9" fill="#FCA5A5" opacity="0.35" />
      {/* 몸통 — 실버그레이 */}
      <path d="M28 55 Q26 59 26 74 L54 74 Q54 59 52 55 Q46 53 40 53 Q34 53 28 55Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M34 54 L40 59 L46 54" stroke="#E2E8F0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 오른손 → 돋보기 (위로 검사) */}
      <path d="M52 58 Q58 54 61 49" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="62" cy="48" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <line x1="60" y1="46" x2="55" y2="40" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="52" cy="35" r="5.5" fill="#BFDBFE" opacity="0.5" stroke="#2D2D2D" strokeWidth="1.4" />
      {/* 왼손 — 허리(꼼꼼) */}
      <path d="M28 60 Q23 62 25 66" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="66" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
    </svg>
  ),
  "신유-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 투블럭 — 연보라 + 결 */}
        <path d="M22 28 Q20 10 40 8 Q60 10 58 28 Z" fill="#C4B5FD" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 13 Q34 18 32 22" stroke="#8B5CF6" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M40 11 Q41 17 40 22" stroke="#8B5CF6" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M47 13 Q46 18 48 22" stroke="#8B5CF6" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* 얼굴 */}
        <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 까다롭게 */}
        <path d="M29 29 Q34 26 38 29" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="42" y1="29" x2="51" y2="27" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        {/* 눈 — 까다로운 (한쪽 째림) */}
        <circle cx="33" cy="36" r="3" fill="#2D2D2D" />
        <circle cx="34.2" cy="35" r="1.1" fill="white" />
        <path d="M43 35 L50 34" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
        {/* 입 삐죽 */}
        <path d="M35 45 Q38 43 42 45 Q44 43 47 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 몸통 — 선명한 보라 */}
        <path d="M25 54 Q23 58 23 76 L57 76 Q57 58 55 54 Q48 52 40 52 Q32 52 25 54Z" fill="#7C3AED" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 보석 목걸이 */}
        <path d="M33 53 L40 60 L47 53" stroke="#A78BFA" strokeWidth="1.5" fill="none" />
        <path d="M37 58 L40 62 L43 58" fill="#C4B5FD" stroke="#2D2D2D" strokeWidth="1" />
        {/* 왼팔 → 돋보기 */}
        <path d="M25 60 Q18 62 15 64" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="11" cy="62" r="8" stroke="#2D2D2D" strokeWidth="2" fill="none" />
        <circle cx="11" cy="62" r="5.5" fill="#DBEAFE" opacity="0.7" />
        <line x1="16.5" y1="67.5" x2="21" y2="73" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        {/* 오른팔 → 메뉴판 */}
        <path d="M55 58 Q60 56 63 54" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="58" y="48" width="17" height="25" rx="3" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="62" y1="55" x2="71" y2="55" stroke="#7C3AED" strokeWidth="1.2" />
        <line x1="62" y1="60" x2="71" y2="60" stroke="#7C3AED" strokeWidth="1.2" />
        <line x1="62" y1="65" x2="69" y2="65" stroke="#7C3AED" strokeWidth="1.2" />
        <path d="M62 70 L64 68 L66 70" stroke="#EF4444" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<>
  <path d="M24 28 Q26 32 31 30 Q38 33 46 30 Q52 32 56 27 Q57 21 40 20 Q25 21 24 28 Z" fill="#C4B5FD" />
  <path d="M47 23 Q42 28 36 31" stroke="#8B5CF6" strokeWidth="0.9" fill="none" opacity="0.6" />
</>
    </svg>
  ),
  "신유-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 머리카락 — 허니 블론드 단발 */}
      <path d="M20 34 Q20 12 40 9 Q60 12 60 34 L60 60 Q54 68 46 64 Q40 62 34 64 Q26 68 20 60 Z" fill="#E0AC5A" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M44 12 Q39 18 37 28" stroke="#B5821F" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 차분한 안목 (속눈썹 제거됨) */}
      <path d="M30 29 Q34 27.5 38 29" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M43 29 Q47 27.5 51 29" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="34" cy="34" r="2.6" fill="#2D2D2D" />
      <circle cx="46" cy="34" r="2.6" fill="#2D2D2D" />
      <circle cx="35" cy="33" r="1.1" fill="white" />
      <circle cx="47" cy="33" r="1.1" fill="white" />
      {/* 입 — 검은 입술 */}
      <path d="M36 43 Q40 45.5 44 43" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="28" cy="40" rx="4" ry="2.4" fill="#F9A8D4" opacity="0.45" />
      <ellipse cx="52" cy="40" rx="4" ry="2.4" fill="#F9A8D4" opacity="0.45" />
      {/* 몸통 — 차콜 블레이저 */}
      <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#334155" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M40 49 L34 56 M40 49 L46 56" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="40" cy="62" r="1.2" fill="#FACC15" />
      {/* 왼팔 → 명품 백 */}
      <path d="M28 56 Q22 58 19 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M8 60 Q8 57 18 57 Q22 60 19 62" stroke="#A16207" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <rect x="5" y="60" width="16" height="12" rx="2.5" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.4" />
      <rect x="11" y="62.5" width="4" height="2.5" rx="0.8" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6" />
      {/* 오른팔 → PICK 추천 태그 */}
      <path d="M52 54 Q58 52 61 48" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M60 42 L74 42 L77 49 L74 56 L60 56 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M67 52 Q67 49 69.5 49 Q72 49 72 51 Q72 53 67 55.5 Q62 53 62 51 Q62 49 64.5 49 Q67 49 67 52Z" fill="#E11D48" stroke="#2D2D2D" strokeWidth="0.7" />
    </svg>
  ),
  "경오-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 투블럭 — 주황빛 갈색 + 결 */}
        <path d="M22 28 Q20 10 40 8 Q60 10 58 28 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 13 Q34 18 32 22" stroke="#B45309" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M40 11 Q41 17 40 22" stroke="#B45309" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M47 13 Q46 18 48 22" stroke="#B45309" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 얼굴 */}
        <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 한쪽 올려서 당당 */}
        <line x1="28" y1="29" x2="38" y2="29" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M42 31 L52 28" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" />
        {/* 눈 — 날카로운 직선 */}
        <line x1="30" y1="36" x2="38" y2="36" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="36" x2="50" y2="36" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        {/* 입 — 자신만만 비꼬는 한쪽 미소 */}
        <path d="M34 45 Q39 48 46 44" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="27" cy="42" rx="3.5" ry="2" fill="#FB923C" opacity="0.5" />
        <ellipse cx="53" cy="42" rx="3.5" ry="2" fill="#FB923C" opacity="0.5" />
        {/* 몸통 — 강렬한 주황 + 카라 */}
        <path d="M25 54 Q23 58 23 76 L57 76 Q57 58 55 54 Q48 52 40 52 Q32 52 25 54Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 53 L40 59 L44 53" stroke="#C2410C" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* 오른팔 → 망치 */}
        <path d="M55 58 Q60 54 63 50" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M61 51 L70 42" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="64" y="35" width="13" height="11" rx="2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" transform="rotate(-12 70 40)" />
        {/* 왼팔 → 팩트 메모지 */}
        <path d="M25 60 Q18 60 14 61" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="2" y="55" width="16" height="13" rx="2" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="5" y1="59" x2="15" y2="59" stroke="#2D2D2D" strokeWidth="0.9" />
        <line x1="5" y1="63" x2="13" y2="63" stroke="#2D2D2D" strokeWidth="0.9" />
        <path d="M4 58 L6 60 L9 56" stroke="#EF4444" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M24 28 Q25 33 28 32 Q34 34 40 32 Q46 34 52 32 Q55 33 56 28 Q57 21 40 20 Q24 21 24 28 Z" fill="#92400E" />
    </svg>
  ),
  "경오-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 머리 — 웨이브 단발 (다크) */}
      <path d="M18 32 Q18 12 40 10 Q62 12 62 32 Q64 46 58 52 Q60 58 56 62 Q48 66 40 64 Q32 66 24 62 Q20 58 22 52 Q16 46 18 32 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 38 Q26 35 30 38" stroke="#374151" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="38" rx="14" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 강한 직설 */}
      <path d="M30 32 L37 33" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 32 L43 33" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
      {/* 눈 — 당당 */}
      <circle cx="34" cy="37" r="2.8" fill="#2D2D2D" />
      <circle cx="46" cy="37" r="2.8" fill="#2D2D2D" />
      <circle cx="35.1" cy="35.9" r="1.1" fill="white" />
      <circle cx="47.1" cy="35.9" r="1.1" fill="white" />
      {/* 입 — 할 말 하는 (stroke) */}
      <path d="M36 44 Q40 47 44 44" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="29" cy="42" rx="3.2" ry="1.9" fill="#93C5FD" opacity="0.4" />
      <ellipse cx="51" cy="42" rx="3.2" ry="1.9" fill="#93C5FD" opacity="0.4" />
      {/* 몸통 — 블루 블레이저 */}
      <path d="M28 53 Q26 57 26 73 L54 73 Q54 57 52 53 Q46 51 40 51 Q34 51 28 53Z" fill="#1D4ED8" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M40 52 L35 58 M40 52 L45 58" stroke="#1E3A8A" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="40" cy="63" r="1.2" fill="#FACC15" />
      {/* 오른손 → 메가폰 (직설) */}
      <path d="M52 56 Q58 54 61 50" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="62" cy="49" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      <path d="M62 46 L70 41 L74 38 L74 52 L70 49 L62 53 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="59.5" y="46" width="3" height="7" rx="1" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="0.9" />
      <path d="M76 40 Q80 45 76 50" stroke="#F87171" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M78 37 Q83 44 78 53" stroke="#F87171" strokeWidth="0.8" fill="none" opacity="0.3" />
      {/* 왼손 → 직설 말풍선 (→) */}
      <path d="M28 58 Q22 60 19 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="18" cy="57.5" r="2.2" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1" />
      <rect x="2" y="44" width="16" height="12" rx="3" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M8 56 L6 60 L11 56 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5 50 L13 50 M11 47 L14 50 L11 53" stroke="#2563EB" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "신미-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 금발 모히칸 */}
        <path d="M26 30 Q24 18 30 8 Q34 2 37 14 Q38 6 40 0 Q42 6 43 14 Q46 2 50 8 Q56 18 54 30 Q48 26 40 27 Q32 26 26 30Z" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 26 Q38 14 40 6 Q42 14 44 26 Q42 24 40 25 Q38 24 36 26Z" fill="#FDE047" />
        {/* 얼굴 */}
        <circle cx="40" cy="40" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="2" />
        {/* 선글라스 */}
        <rect x="26" y="33" width="12" height="8" rx="2.5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.2" />
        <rect x="42" y="33" width="12" height="8" rx="2.5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.2" />
        <line x1="38" y1="37" x2="42" y2="37" stroke="#2D2D2D" strokeWidth="1.2" />
        <line x1="18" y1="37" x2="26" y2="37" stroke="#2D2D2D" strokeWidth="1" />
        <line x1="54" y1="37" x2="62" y2="37" stroke="#2D2D2D" strokeWidth="1" />
        {/* 눈썹 — 집중 (선글라스 위) */}
        <line x1="27" y1="30" x2="37" y2="29" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        <line x1="43" y1="29" x2="53" y2="30" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        {/* 입 — 살짝 만족 미소 */}
        <path d="M36 46 Q40 50 44 46" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="43" rx="3.5" ry="2" fill="#FBBF24" opacity="0.6" />
        <ellipse cx="52" cy="43" rx="3.5" ry="2" fill="#FBBF24" opacity="0.6" />
        {/* 몸통 — 파란색 */}
        <path d="M26 56 Q24 60 24 76 L56 76 Q56 60 54 56 Q47 54 40 54 Q33 54 26 56Z" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 넥타이 — 노랑 포인트 */}
        <path d="M38 55 L40 62 L42 55" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <rect x="38" y="62" width="4" height="7" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        {/* 왼팔 → 클립보드 */}
        <path d="M26 62 Q18 62 14 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 오른팔 → 펜 */}
        <path d="M54 62 Q60 60 64 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 클립보드 — 왼손 선명하게 */}
        <rect x="5" y="52" width="16" height="20" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <rect x="9" y="50" width="8" height="4" rx="1.5" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1" />
        <line x1="8" y1="59" x2="19" y2="59" stroke="#3B82F6" strokeWidth="1" />
        <line x1="8" y1="63" x2="19" y2="63" stroke="#3B82F6" strokeWidth="1" />
        <line x1="8" y1="67" x2="17" y2="67" stroke="#3B82F6" strokeWidth="1" />
        <path d="M7 58 L9 60 L12 56" stroke="#4ADE80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* 펜 — 오른손, 선명하게 */}
        <rect x="62" y="52" width="4" height="18" rx="2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M62 70 L66 70 L64 75 Z" fill="#2D2D2D" />
    </svg>
  ),
  "신미-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 양갈래 상단 캡 — 파랑, 먼저 */}
        <path d="M22 30 Q22 10 40 8 Q58 10 58 30 Q58 38 50 42 Q40 44 30 42 Q22 38 22 30 Z" fill="#38BDF8" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 왼쪽 갈래 */}
        <path d="M14 32 Q6 42 10 66 Q14 76 22 72 Q28 68 24 52 Q22 44 22 32 Z" fill="#38BDF8" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 오른쪽 갈래 */}
        <path d="M66 32 Q74 42 70 66 Q66 76 58 72 Q52 68 56 52 Q58 44 58 32 Z" fill="#38BDF8" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 묶음 — 노란 별 */}
        <path d="M22 28 L23.5 24 L25 28 L29 28 L26 31 L27 35 L23.5 33 L20 35 L21 31 L18 28 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8"/>
        <path d="M58 28 L59.5 24 L61 28 L65 28 L62 31 L63 35 L59.5 33 L56 35 L57 31 L54 28 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8"/>
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 속눈썹 */}
        <path d="M31 30 Q34 28 37 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M43 30 Q46 28 49 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 눈썹 — 힘차게 올라간 */}
        <path d="M29 26 Q33 23 37 26" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M43 26 Q47 23 51 26" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* 눈 — 크게 뜬 소리치는 */}
        <circle cx="34" cy="32" r="3" fill="#2D2D2D"/>
        <circle cx="46" cy="32" r="3" fill="#2D2D2D"/>
        <circle cx="35.2" cy="30.8" r="1.2" fill="white"/>
        <circle cx="47.2" cy="30.8" r="1.2" fill="white"/>
        {/* 입 — 크게 벌린 소리치는 */}
        <ellipse cx="40" cy="44" rx="7" ry="5" fill="#2D2D2D"/>
        <ellipse cx="40" cy="43" rx="5" ry="3" fill="#F87171"/>
        {/* 볼터치 — 핑크 */}
        <ellipse cx="27" cy="38" rx="5" ry="3" fill="#F9A8D4" opacity="0.7"/>
        <ellipse cx="53" cy="38" rx="5" ry="3" fill="#F9A8D4" opacity="0.7"/>
        {/* 몸통 — 하늘색 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#BAE6FD" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 왼팔 — 외침 포즈 올리기 */}
        <path d="M28 56 Q18 50 14 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        {/* 오른팔 — 공주봉 들기 */}
        <path d="M52 56 Q60 50 64 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        {/* 공주봉 */}
        <line x1="64" y1="44" x2="70" y2="20" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="65" y1="44" x2="71" y2="21" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        {/* 별 */}
        <path d="M70 11 L71.5 15 L76 15 L72.5 18 L74 22 L70 19 L66 22 L67.5 18 L64 15 L68.5 15 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
        {/* 스파클 */}
        <circle cx="65" cy="9" r="1.5" fill="#FACC15" opacity="0.8"/>
        <circle cx="77" cy="13" r="1" fill="#FACC15" opacity="0.6"/>
        <path d="M63 15 L61 12" stroke="#FACC15" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    </svg>
  ),
  "경진-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 투구 깃털 장식 — 레드 플룸 */}
        <path d="M40 10 Q34 2 38 -2 Q42 4 44 10Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M44 9 Q46 1 50 1 Q48 6 47 11Z" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1" />
        {/* 투구 */}
        <path d="M20 34 Q18 12 40 10 Q62 12 60 34" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="2" />
        {/* 투구 능선 */}
        <line x1="40" y1="11" x2="40" y2="34" stroke="#64748B" strokeWidth="2" opacity="0.5" />
        <path d="M30 16 Q31 24 29 30" stroke="#CBD5E1" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 투구 차양 */}
        <rect x="16" y="32" width="48" height="7" rx="2" fill="#64748B" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <circle cx="40" cy="46" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 부리부리, 코 쪽으로 내려오는 각도 */}
        <line x1="28" y1="39" x2="38" y2="43" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
        <line x1="52" y1="39" x2="42" y2="43" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
        {/* 눈 — 단호한 */}
        <circle cx="34" cy="44" r="2.5" fill="#2D2D2D" />
        <circle cx="46" cy="44" r="2.5" fill="#2D2D2D" />
        <circle cx="33" cy="43" r="0.9" fill="white" />
        <circle cx="45" cy="43" r="0.9" fill="white" />
        {/* 입 — 굳게 다문 */}
        <line x1="35" y1="52" x2="45" y2="52" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        {/* 갑옷 몸통 — 회색 */}
        <rect x="24" y="60" width="32" height="22" rx="4" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="2" />
        {/* 가슴 엠블럼 — 골드 */}
        <path d="M40 64 L44 68 L40 74 L36 68 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
        <line x1="40" y1="60" x2="40" y2="64" stroke="#64748B" strokeWidth="1.5" />
        <line x1="40" y1="74" x2="40" y2="82" stroke="#64748B" strokeWidth="1.5" />
        {/* 어깨 보호대 */}
        <path d="M16 60 Q14 66 18 70 L24 68 L24 60 Z" fill="#B91C1C" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M64 60 Q66 66 62 70 L56 68 L56 60 Z" fill="#B91C1C" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 오른팔(건틀릿) → 검 */}
        <path d="M56 66 Q61 62 64 56" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* 검 */}
        <rect x="62" y="34" width="3" height="24" rx="1" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.2" />
        <rect x="57" y="52" width="13" height="3.5" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <rect x="62.5" y="35" width="2" height="16" rx="0.5" fill="#F8FAFC" opacity="0.8" />
    </svg>
  ),
  "경진-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 웨이브 퍼머 — 노란색 중단발, 먼저 */}
        <path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 38 60 44 Q54 50 62 56 Q66 62 58 68 Q50 72 44 70 Q40 68 36 70 Q30 72 22 68 Q14 62 18 56 Q26 50 20 44 Q14 38 18 30 Z" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 속눈썹 */}
        <path d="M31 30 Q34 28 37 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M43 30 Q46 28 49 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 눈썹 — 자신감 */}
        <path d="M30 26 Q34 24 38 26" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M42 26 Q46 24 50 26" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* 눈 — 생기 있는 */}
        <ellipse cx="34" cy="32" rx="2.5" ry="2.5" fill="#2D2D2D"/>
        <ellipse cx="46" cy="32" rx="2.5" ry="2.5" fill="#2D2D2D"/>
        <circle cx="35" cy="31" r="1" fill="white"/>
        <circle cx="47" cy="31" r="1" fill="white"/>
        {/* 입 — 자신감 있는 웃음 */}
        <path d="M35 41 Q40 46 45 41" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* 볼터치 */}
        <ellipse cx="29" cy="37" rx="4.5" ry="2.5" fill="#FCA5A5" opacity="0.6"/>
        <ellipse cx="51" cy="37" rx="4.5" ry="2.5" fill="#FCA5A5" opacity="0.6"/>
        {/* 몸통 — 노란 원피스 */}
        <path d="M26 50 Q24 54 24 72 L56 72 Q56 54 54 50 Q48 48 40 48 Q32 48 26 50Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 꽃 무늬 1 */}
        <circle cx="34" cy="57" r="3" fill="white" opacity="0.85"/>
        <circle cx="32" cy="55" r="1.8" fill="white" opacity="0.65"/>
        <circle cx="36" cy="55" r="1.8" fill="white" opacity="0.65"/>
        <circle cx="32" cy="59" r="1.8" fill="white" opacity="0.65"/>
        <circle cx="36" cy="59" r="1.8" fill="white" opacity="0.65"/>
        <circle cx="34" cy="57" r="1.5" fill="#F97316"/>
        {/* 꽃 무늬 2 */}
        <circle cx="45" cy="63" r="2.5" fill="white" opacity="0.85"/>
        <circle cx="43" cy="61.5" r="1.5" fill="white" opacity="0.65"/>
        <circle cx="47" cy="61.5" r="1.5" fill="white" opacity="0.65"/>
        <circle cx="43" cy="64.5" r="1.5" fill="white" opacity="0.65"/>
        <circle cx="47" cy="64.5" r="1.5" fill="white" opacity="0.65"/>
        <circle cx="45" cy="63" r="1.2" fill="#F97316"/>
        {/* 작은 꽃 */}
        <circle cx="37" cy="67" r="1.8" fill="white" opacity="0.7"/>
        <circle cx="37" cy="67" r="0.9" fill="#F97316"/>
        {/* 왼팔 + 클립보드 */}
        <path d="M26 58 Q16 55 10 57" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <rect x="2" y="55" width="14" height="18" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
        <rect x="6" y="53" width="6" height="3" rx="1" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8"/>
        <path d="M4 61 L6 63 L10 58" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="5" y1="66" x2="14" y2="66" stroke="#94A3B8" strokeWidth="0.8"/>
        <line x1="5" y1="69" x2="12" y2="69" stroke="#94A3B8" strokeWidth="0.8"/>
        {/* 오른팔 — 포인팅 */}
        <path d="M54 58 Q64 53 68 48" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <circle cx="70" cy="46" r="3.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2"/>
        <path d="M68 44 L71 41" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "신사-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 공사 안전모 */}
      <path d="M27 23 Q40 12 53 23 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="26" y="22" width="28" height="3.5" rx="1.5" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1" />
      {/* 귀 */}
      <circle cx="29" cy="25" r="3" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2" />
      <circle cx="51" cy="25" r="3" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2" />
      <circle cx="29" cy="25" r="1.2" fill="#5B2C0A" />
      <circle cx="51" cy="25" r="1.2" fill="#5B2C0A" />
      {/* 머리 */}
      <circle cx="40" cy="34" r="15" fill="#A16207" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 머리 털결 */}
      <path d="M27 30 Q26 33 28 35 M53 30 Q54 33 52 35" stroke="#7C4A12" strokeWidth="0.7" fill="none" opacity="0.5" strokeLinecap="round" />
      {/* 주둥이 */}
      <ellipse cx="40" cy="40" rx="9" ry="7" fill="#D4A574" stroke="#2D2D2D" strokeWidth="0.8" />
      <ellipse cx="40" cy="36" rx="2.5" ry="1.8" fill="#2D2D2D" />
      <ellipse cx="39.2" cy="35.4" rx="0.8" ry="0.6" fill="white" opacity="0.7" />
      {/* 수염 */}
      <path d="M31 39 L24 38 M31 41 L24 42 M49 39 L56 38 M49 41 L56 42" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.45" strokeLinecap="round" />
      {/* 큰 앞니 (비버) */}
      <rect x="37.4" y="41" width="2.3" height="5" rx="0.5" fill="white" stroke="#2D2D2D" strokeWidth="0.8" />
      <rect x="40.3" y="41" width="2.3" height="5" rx="0.5" fill="white" stroke="#2D2D2D" strokeWidth="0.8" />
      {/* 눈썹 — 신난 */}
      <path d="M31 28 Q34 26 37 28" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M43 28 Q46 26 49 28" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="35" cy="32" r="2.4" fill="#2D2D2D" />
      <circle cx="45" cy="32" r="2.4" fill="#2D2D2D" />
      <circle cx="36" cy="31" r="1" fill="white" />
      <circle cx="46" cy="31" r="1" fill="white" />
      {/* 볼터치 */}
      <ellipse cx="30" cy="37" rx="2.6" ry="1.5" fill="#F87171" opacity="0.4" />
      <ellipse cx="50" cy="37" rx="2.6" ry="1.5" fill="#F87171" opacity="0.4" />
      {/* 몸 */}
      <ellipse cx="40" cy="60" rx="15" ry="14" fill="#A16207" stroke="#2D2D2D" strokeWidth="1.5" />
      <ellipse cx="40" cy="62" rx="8" ry="9" fill="#D4A574" stroke="#2D2D2D" strokeWidth="0.7" />
      {/* 배 털결 */}
      <path d="M40 56 L40 70 M37 58 L37 68 M43 58 L43 68" stroke="#C8956B" strokeWidth="0.5" opacity="0.5" strokeLinecap="round" />
      {/* 안전 조끼 */}
      <path d="M32 49 L34 64" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 49 L46 64" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
      <path d="M34 59 L46 59" stroke="#FEF3C7" strokeWidth="1.4" />
      <rect x="38.5" y="57.5" width="3" height="3" rx="0.6" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6" />
      {/* 납작 꼬리 */}
      <ellipse cx="62" cy="69" rx="7" ry="9" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.3" transform="rotate(30 62 69)" />
      <path d="M57 65 L66 73 M55 69 L64 75 M59 63 L68 71" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.5" />
      {/* 오른발 → 망치 (집 짓기) */}
      <path d="M52 56 Q57 53 60 49" stroke="#A16207" strokeWidth="3" strokeLinecap="round" />
      <path d="M59 47 L58 50 M61 47 L61 50 M63 47 L63.5 50" stroke="#7C4A12" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="60" y1="50" x2="66" y2="42" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <rect x="62" y="36" width="10" height="6" rx="1.5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(-15 67 39)" />
      {/* 망치질 톱밥/충격 */}
      <path d="M58 35 L55 33 M61 32 L60 29 M64 33 L65 30" stroke="#FACC15" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
      <circle cx="56" cy="37" r="0.8" fill="#D4A574" opacity="0.8" />
      {/* 왼발 → 통나무 (다시 만들기) */}
      <path d="M28 56 Q23 55 19 57" stroke="#A16207" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 55 L17 58 M20 55 L20 58 M22 55 L22.5 58" stroke="#7C4A12" strokeWidth="0.8" strokeLinecap="round" />
      <rect x="6" y="54" width="14" height="6" rx="3" fill="#B45309" stroke="#2D2D2D" strokeWidth="1.2" />
      <ellipse cx="6" cy="57" rx="1.6" ry="3" fill="#D4A574" stroke="#2D2D2D" strokeWidth="0.8" />
      <ellipse cx="6" cy="57" rx="0.7" ry="1.4" fill="none" stroke="#92400E" strokeWidth="0.4" />
      <path d="M10 55.5 L18 55.5 M9 58.5 L17 58.5" stroke="#92400E" strokeWidth="0.4" opacity="0.5" />
      {/* 나무조각 (뿌수고) */}
      <path d="M24 77 L27 74 L28 78Z" fill="#D4A574" opacity="0.85" />
      <path d="M51 79 L54 76 L55 80Z" fill="#D4A574" opacity="0.7" />
    </svg>
  ),
  "신사-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* zzz — OFF쪽 오른쪽 위 */}
        <text x="56" y="26" fontSize="5" fill="#94A3B8" fontWeight="bold" opacity="0.9">z</text>
        <text x="61" y="21" fontSize="6" fill="#94A3B8" fontWeight="bold" opacity="0.7">z</text>
        <text x="67" y="15" fontSize="7" fill="#94A3B8" fontWeight="bold" opacity="0.5">z</text>
        {/* ON쪽 왼쪽 별 */}
        <path d="M12 20 L13.5 14 L15 20 L21 20 L16 24 L18 30 L13.5 26 L9 30 L11 24 L6 20 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 헤어 — 중단발 보라, closed Z */}
        <path d="M18 34 Q18 10 40 8 Q62 10 62 34 L62 62 Q56 72 46 70 Q40 68 34 70 Q24 72 18 62 Z" fill="#8B5CF6" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 왼쪽 눈썹 — 올라감 (ON) */}
        <path d="M29 27 Q32 24 36 26" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* 오른쪽 눈썹 — 처짐 (OFF) */}
        <path d="M44 28 Q47 28 51 28" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* 왼쪽 속눈썹 (ON) */}
        <path d="M29 31 Q32 29 36 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 왼쪽 눈 — 반짝 크게 뜬 (ON) */}
        <ellipse cx="33" cy="33" rx="3" ry="3.5" fill="#2D2D2D" />
        <circle cx="34.2" cy="31.5" r="1" fill="white" />
        {/* 오른쪽 속눈썹 (OFF) */}
        <path d="M44 31 Q47 30 50 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 오른쪽 눈 — 반쯤 감긴 (OFF) */}
        <ellipse cx="47" cy="34" rx="3" ry="1.5" fill="#2D2D2D" />
        {/* 볼터치 — ON쪽 핑크, OFF쪽 라벤더 */}
        <ellipse cx="29" cy="38" rx="4.5" ry="2.8" fill="#FDA4AF" opacity="0.55" />
        <ellipse cx="51" cy="38" rx="4.5" ry="2.8" fill="#C4B5FD" opacity="0.55" />
        {/* 입 — ON쪽 올라가는 미소 */}
        <path d="M35 42 Q38 45 40 44 Q42 43 45 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 몸통 — 왼쪽(ON) 보라, 오른쪽(OFF) 회색 */}
        <path d="M28 50 Q26 54 26 72 L40 72 L40 48 Q34 48 28 50Z" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M40 48 Q46 48 52 50 Q54 54 54 72 L40 72 Z" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 왼팔 — 폰 들기 (ON) */}
        <path d="M28 56 Q18 53 14 57" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 폰 */}
        <rect x="8" y="55" width="8" height="11" rx="1.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
        <rect x="9.5" y="57" width="5" height="7" rx="0.5" fill="#8B5CF6" />
        <circle cx="12" cy="64.5" r="0.8" fill="#2D2D2D" />
        <path d="M10.5 59.5 Q12 58 12 59.5 Q12 58 13.5 59.5 Q13.5 61 12 62 Q10.5 61 10.5 59.5Z" fill="#F43F5E" />
        {/* 오른팔 — 머그컵 (OFF) */}
        <path d="M52 56 Q62 53 66 57" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 머그컵 */}
        <rect x="60" y="55" width="10" height="8" rx="1.5" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M70 58 Q73 58 73 60 Q73 62 70 62" stroke="#2D2D2D" strokeWidth="1" fill="none" />
        <path d="M63 54 Q64 51 63 49" stroke="#94A3B8" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M66 54 Q67 51 66 48" stroke="#94A3B8" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  "임신-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 투블럭 퍼머 — 청록색 (효율적인 개성) */}
        <path d="M22 28 Q18 18 22 12 Q28 6 40 8 Q52 6 58 12 Q62 18 58 28 Q54 22 48 26 Q44 28 40 26 Q36 24 32 26 Q26 28 22 28 Z" fill="#0EA5E9" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 14 Q34 19 32 23" stroke="#0369A1" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M47 14 Q46 19 48 23" stroke="#0369A1" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* 얼굴 */}
        <circle cx="40" cy="40" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 날카로운 집중 */}
        <line x1="29" y1="32" x2="37" y2="31" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        <line x1="43" y1="31" x2="51" y2="32" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        {/* 눈 — 예리하게 계산 */}
        <ellipse cx="34" cy="38" rx="3.5" ry="2.5" fill="#2D2D2D" />
        <ellipse cx="46" cy="38" rx="3.5" ry="2.5" fill="#2D2D2D" />
        <circle cx="35.2" cy="37" r="1.2" fill="white" />
        <circle cx="47.2" cy="37" r="1.2" fill="white" />
        {/* 입 — 자신감 있는 미소 */}
        <path d="M36 47 Q40 50 44 47" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 볼터치 — 선명하게 */}
        <ellipse cx="28" cy="44" rx="4" ry="2.5" fill="#38BDF8" opacity="0.6" />
        <ellipse cx="52" cy="44" rx="4" ry="2.5" fill="#38BDF8" opacity="0.6" />
        {/* 몸통 — 블루 + 지퍼 */}
        <path d="M26 56 Q24 60 24 76 L56 76 Q56 60 54 56 Q47 54 40 54 Q33 54 26 56Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="40" y1="56" x2="40" y2="74" stroke="#1E40AF" strokeWidth="1" strokeDasharray="1.5 1.5" />
        <rect x="38.5" y="56" width="3" height="3" rx="1" fill="#BFDBFE" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* 왼팔 → 기어 */}
        <path d="M26 62 Q19 62 15 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="12" cy="62" r="7.5" stroke="#2D2D2D" strokeWidth="1.5" fill="#BFDBFE" />
        <circle cx="12" cy="62" r="3.5" stroke="#2D2D2D" strokeWidth="1" fill="white" />
        <rect x="10" y="53.5" width="4" height="3.5" rx="1" fill="#1E40AF" />
        <rect x="10" y="67" width="4" height="3.5" rx="1" fill="#1E40AF" />
        <rect x="3.5" y="60" width="3.5" height="4" rx="1" fill="#1E40AF" />
        <rect x="17" y="60" width="3.5" height="4" rx="1" fill="#1E40AF" />
        {/* 오른팔 → 스톱워치 */}
        <path d="M54 62 Q61 62 65 63" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="68" cy="64" r="7.5" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="68" y1="57" x2="68" y2="64" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="68" y1="64" x2="72" y2="61" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="65" y="54.5" width="6" height="3" rx="1.5" fill="#2D2D2D" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M24 31 Q27 35 31 32 Q34 35 38 32 Q42 35 46 32 Q50 35 53 32 Q56 34 56 31 Q57 24 40 23 Q24 24 24 31 Z" fill="#0EA5E9" />
    </svg>
  ),
  "임신-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* ① 머리카락 — 닫힌 단일 path, face보다 먼저 (삼각형 방지) */}
        <path d="M18 32 Q18 10 40 10 Q62 10 62 32 L62 66 Q56 74 46 70 Q40 68 34 70 Q24 74 18 66 Z"
          fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1"/>
        {/* ② 얼굴 — 머리 위에 그려서 삼각형 자연스럽게 없어짐 */}
        <ellipse cx="40" cy="38" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* ③ 얼음 크리스탈 머리장식 — face 위 */}
        <path d="M40 8 L40 18" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 10 L48 16 M32 16 L48 10" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="40" cy="7" r="3" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1.5"/>
        <circle cx="30" cy="10" r="2" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1"/>
        <circle cx="50" cy="10" r="2" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1"/>
        {/* 속눈썹 */}
        <path d="M29 32 Q32 30 35 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M45 32 Q48 30 51 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* 선글라스 */}
        <rect x="28" y="33" width="10" height="7" rx="3" fill="#1E3A5F" stroke="#2D2D2D" strokeWidth="1.5"/>
        <rect x="42" y="33" width="10" height="7" rx="3" fill="#1E3A5F" stroke="#2D2D2D" strokeWidth="1.5"/>
        <line x1="38" y1="36.5" x2="42" y2="36.5" stroke="#2D2D2D" strokeWidth="1.5"/>
        <line x1="22" y1="35" x2="28" y2="36" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="52" y1="36" x2="58" y2="35" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M30 35 L32 34 L31 36" stroke="white" strokeWidth="0.8" opacity="0.6" strokeLinecap="round"/>
        {/* 볼터치 */}
        <ellipse cx="27" cy="43" rx="5" ry="3" fill="#F9A8D4" opacity="0.7"/>
        <ellipse cx="53" cy="43" rx="5" ry="3" fill="#F9A8D4" opacity="0.7"/>
        {/* 입 — 무표정 일자 */}
        <line x1="37" y1="47" x2="43" y2="47" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
        {/* 몸통 — 좁은 어깨 둥근 실루엣 */}
        <path d="M28 52 Q26 56 26 72 L54 72 Q54 56 52 52 Q46 50 40 50 Q34 50 28 52Z"
          fill="#93C5FD" stroke="#2D2D2D" strokeWidth="1.5"/>
        {/* 팔짱 */}
        <path d="M26 60 Q20 62 18 65 Q20 68 26 68" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M54 60 Q60 62 62 65 Q60 68 54 68" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* 얼음 결정 주변 */}
        <path d="M8 58 L8 68 M3 61 L13 65 M3 65 L13 61" stroke="#93C5FD" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        <path d="M72 58 L72 68 M67 61 L77 65 M67 65 L77 61" stroke="#93C5FD" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
    </svg>
  ),
  "계유-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 얼음 결정 안경+모자 */}
        <path d="M20 26 Q20 8 40 6 Q60 8 60 26" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 결정 모양 장식 */}
        <path d="M40 4 L38 8 L42 8 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M30 10 L28 14 L32 14 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.6" />
        <path d="M50 10 L48 14 L52 14 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.6" />
        {/* 얼굴 */}
        <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 한쪽 올린 의아함 */}
        <path d="M27 28 Q31 25 36 27" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <line x1="44" y1="27" x2="53" y2="28" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" />
        {/* 안경 */}
        <rect x="26" y="32" width="12" height="9" rx="2" fill="none" stroke="#2D2D2D" strokeWidth="1.5" />
        <rect x="42" y="32" width="12" height="9" rx="2" fill="none" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="38" y1="36" x2="42" y2="36" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈 — 호기심 반짝 */}
        <circle cx="32" cy="36" r="3.5" fill="#2D2D2D" />
        <circle cx="48" cy="36" r="3.5" fill="#2D2D2D" />
        <circle cx="33" cy="35" r="1.5" fill="white" />
        <circle cx="49" cy="35" r="1.5" fill="white" />
        {/* 입 — 놀란 O */}
        <ellipse cx="40" cy="45.5" rx="3" ry="2.6" fill="none" stroke="#2D2D2D" strokeWidth="1.6" />
        {/* 왼팔 — 의아하게 들어올린 */}
        <path d="M28 58 Q16 50 14 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 오른팔 — 들어올린 */}
        <path d="M52 58 Q64 50 66 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 물음표 — 오른쪽 위 */}
        <path d="M66 26 Q66 18 72 18 Q78 18 78 24 Q78 28 72 29 L72 32" stroke="#60A5FA" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="72" cy="35" r="2" fill="#60A5FA" />
        {/* 물음표 — 왼쪽 위 */}
        <path d="M2 30 Q2 23 7 23 Q12 23 12 29 Q12 33 7 34 L7 37" stroke="#3B82F6" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="7" cy="40" r="1.8" fill="#3B82F6" />
        {/* 몸통 — 블루 + 카라 */}
        <path d="M26 56 Q24 60 24 76 L56 76 Q56 60 54 56 Q47 54 40 54 Q33 54 26 56Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 55 L40 61 L44 55" stroke="#BFDBFE" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        <circle cx="40" cy="67" r="1.2" fill="#BFDBFE" opacity="0.8" />
        {/* 생각 구름 — 머리 위 */}
        <circle cx="68" cy="22" r="2" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="0.8" />
        <circle cx="72" cy="16" r="3" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="0.8" />
        <ellipse cx="74" cy="8" rx="6" ry="4" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="0.8" />
        <text x="71" y="10" fill="#2D2D2D" fontSize="5" opacity="0.5">{"?"}</text>
    </svg>
  ),
  "계유-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 장발 웨이브, 인디고 (닫힌 Z path 먼저) */}
        <path d="M16 30 Q16 8 40 6 Q64 8 64 30 Q68 42 62 50 Q56 58 64 66 Q68 74 62 80 Q54 86 46 82 Q40 80 34 82 Q26 86 18 80 Q12 74 16 66 Q24 58 18 50 Q12 42 16 30 Z" fill="#4338CA" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 웨이브 결 */}
        <path d="M20 40 Q24 36 28 40" stroke="#312E81" strokeWidth="0.9" fill="none" opacity="0.5" />
        <path d="M52 40 Q56 36 60 40" stroke="#312E81" strokeWidth="0.9" fill="none" opacity="0.5" />
        <path d="M19 56 Q23 52 27 56" stroke="#312E81" strokeWidth="0.9" fill="none" opacity="0.45" />
        <path d="M53 56 Q57 52 61 56" stroke="#312E81" strokeWidth="0.9" fill="none" opacity="0.45" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 대마왕 미니 왕관 — 호기심의 왕 */}
        <path d="M31 13 L34 5 L38 11 L40 2 L42 11 L46 5 L49 13 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
        <circle cx="40" cy="9" r="1.6" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.6" />
        <circle cx="34" cy="11" r="1" fill="#F472B6" />
        <circle cx="46" cy="11" r="1" fill="#F472B6" />
        {/* 속눈썹 */}
        <path d="M28 29 Q31 27 34 29" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M46 29 Q49 27 52 29" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈썹 — 호기심에 한쪽 더 올림 */}
        <path d="M27 27 Q31 24 36 27" stroke="#2D2D2D" strokeWidth="1.7" strokeLinecap="round" fill="none" />
        <path d="M44 26 Q48 23 53 26" stroke="#2D2D2D" strokeWidth="1.7" strokeLinecap="round" fill="none" />
        {/* 눈 — 순한 반달 눈웃음 */}
        <path d="M29 36 Q33 31 37 36" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M43 36 Q47 31 51 36" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <circle cx="35" cy="33.6" r="0.9" fill="white" opacity="0.9" />
        <circle cx="49" cy="33.6" r="0.9" fill="white" opacity="0.9" />
        {/* 입 — 호기심 가득 미소 */}
        <path d="M36 43 Q40 47 44 43" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="27" cy="41" rx="4.5" ry="2.8" fill="#F9A8D4" opacity="0.7" />
        <ellipse cx="53" cy="41" rx="4.5" ry="2.8" fill="#F9A8D4" opacity="0.7" />
        {/* 몸통 — 라벤더 블라우스 + 깃 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#A5B4FC" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 49 L40 55 L44 49" stroke="#6366F1" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        <circle cx="40" cy="63" r="1.2" fill="#6366F1" opacity="0.7" />
        {/* 오른팔 → 손거울 (본질 비추기) */}
        <path d="M52 56 Q58 56 62 57" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="69" cy="48" rx="6.5" ry="8" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
        <ellipse cx="69" cy="48" rx="4" ry="5.5" fill="#BAE6FD" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M66.5 44 L70.5 51" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
        <path d="M68 43 L70 47" stroke="white" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
        <path d="M65 55 L62 60" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
        <path d="M65 55 L62 60" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        {/* 왼팔 → 돋보기 ('왜?' 파기) */}
        <path d="M28 58 Q20 58 15 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="10" cy="60" r="6.5" fill="#DBEAFE" fillOpacity="0.55" stroke="#2D2D2D" strokeWidth="1.8" />
        <path d="M7 57 Q9 56 11 57" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.8" />
        <line x1="14.5" y1="64.5" x2="19" y2="70" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        {/* 거울에 비친 작은 물음표 */}
        <text x="76" y="40" fontSize="6" fill="#6366F1" fontWeight="bold" opacity="0.8">{"?"}</text>
    </svg>
  ),
  "임오-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 남성 숏컷, closed Z + 결 */}
        <path d="M22 34 Q20 14 40 12 Q60 14 58 34 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 17 Q34 22 32 26" stroke="#52525B" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M47 17 Q46 22 48 26" stroke="#52525B" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 얼굴 — 반반 (왼쪽=뜨거움, 오른쪽=차가움) */}
        <circle cx="40" cy="36" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M40 21 A15 15 0 0 0 40 51 Z" fill="#FCA5A5" opacity="0.5" />
        <path d="M40 21 A15 15 0 0 1 40 51 Z" fill="#BFDBFE" opacity="0.5" />
        {/* 눈썹 — 둘 다 곤란하게 안쪽 올림 */}
        <path d="M28 30 Q32 28 36 30.5" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        <path d="M44 30.5 Q48 28 52 30" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        {/* 눈 — 동글동글 곤란 */}
        <circle cx="33" cy="35" r="2.7" fill="#2D2D2D" />
        <circle cx="47" cy="35" r="2.7" fill="#2D2D2D" />
        <circle cx="34" cy="33.9" r="1.1" fill="white" />
        <circle cx="48" cy="33.9" r="1.1" fill="white" />
        {/* 입 — 온도조절 실패 물결 입 */}
        <path d="M34 45 Q36 43 38 45 Q40 47 42 45 Q44 43 46 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 땀방울 (뜨거운 쪽) */}
        <path d="M25 38 C25 38 22 42 22 44 A2.4 2.4 0 0 0 28 44 C28 42 25 38 25 38Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 눈꽃 (차가운 쪽) */}
        <path d="M55 30 L55 37 M52 31.5 L58 35.5 M52 35.5 L58 31.5" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />
        {/* 몸통 — 왼 빨강 오른 파랑 */}
        <path d="M28 52 Q26 56 26 72 L40 72 L40 50 Q34 48 28 52Z" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M40 50 Q46 48 52 52 Q54 56 54 72 L40 72 Z" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="40" y1="50" x2="40" y2="72" stroke="#2D2D2D" strokeWidth="0.8" strokeDasharray="2.5 2" opacity="0.5" />
        {/* 왼팔 → 불꽃 (과열) */}
        <path d="M28 58 Q23 57 20 54" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M22 56 C20 52 14 50 16 44 C18 40 20 42 20 46 C22 42 24 38 26 42 C27 39 28 45 24 56Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M22 53 C21 51 18 49 19 46 C20 44 21 45 21 47 C22 45 23 44 23 48 Z" fill="#FACC15" />
        {/* 오른팔 → 얼음 결정 (냉각) */}
        <path d="M52 58 Q57 57 60 59" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M62 54 L62 68 M56 57 L68 65 M56 65 L68 57" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="62" cy="61" r="3.5" fill="#BFDBFE" stroke="#60A5FA" strokeWidth="1.2" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M24 27 Q25 32 28 31 Q34 33 40 31 Q46 33 52 31 Q55 32 56 27 Q57 20 40 19 Q24 20 24 27 Z" fill="#2D2D2D" />
    </svg>
  ),
  "임오-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 중단발 웨이브 — 다크 네이비 (겉 쿨함) */}
        <path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 40 60 46 Q54 52 62 58 Q66 64 58 70 Q50 74 44 72 Q40 70 36 72 Q30 74 22 70 Q14 64 18 58 Q26 52 20 46 Q14 40 18 30 Z" fill="#1E3A8A" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈결정 헤어핀 */}
        <path d="M61 24 L61 18 M61 24 L57 21 M61 24 L65 21 M61 24 L57 27 M61 24 L65 27" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="61" cy="24" r="1.5" fill="white" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 33 Q34 31 37 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 33 Q46 31 49 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 왼쪽 눈 — 시크하게 반개 */}
        <path d="M30 36 L37 36" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
        {/* 오른쪽 눈 — 속마음: 반짝 동그란 눈 */}
        <circle cx="46" cy="36" r="3.5" fill="#2D2D2D" />
        <circle cx="47.5" cy="34.5" r="1.3" fill="white" />
        {/* 입 — 시크한 곡선 */}
        <path d="M36 43 Q40 46 44 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 — 빨간색 선명하게 */}
        <ellipse cx="28" cy="40" rx="5" ry="3" fill="#F87171" opacity="0.7" />
        <ellipse cx="52" cy="40" rx="5" ry="3" fill="#F87171" opacity="0.7" />
        {/* 몸통 — 반반 (파랑+빨강) */}
        <path d="M28 50 Q26 54 26 70 L40 70 L40 50 Q34 48 28 50Z" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M52 50 Q54 54 54 70 L40 70 L40 50 Q46 48 52 50Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 경계선 */}
        <line x1="40" y1="50" x2="40" y2="70" stroke="#2D2D2D" strokeWidth="1" strokeDasharray="3,2" />
        {/* 하트들 — 속마음 삐져나옴 */}
        <path d="M64 26 C64 26 61 22 61 19.5 A2.5 2.5 0 0 1 64 18 A2.5 2.5 0 0 1 67 19.5 C67 22 64 26 64 26Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M70 18 C70 18 68.5 15.5 68.5 14.5 A1.5 1.5 0 0 1 70 14 A1.5 1.5 0 0 1 71.5 14.5 C71.5 15.5 70 18 70 18Z" fill="#F87171" opacity="0.7" />
        <path d="M74 28 C74 28 73 26.5 73 26 A1 1 0 0 1 74 25.5 A1 1 0 0 1 75 26 C75 26.5 74 28 74 28Z" fill="#F87171" opacity="0.5" />
    </svg>
  ),
  "계미-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 우산 — FIRST */}
        <path d="M20 26 Q40 6 60 26 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M20 26 Q40 8 60 26" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
        <line x1="40" y1="26" x2="40" y2="46" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M40 46 Q40 50 37 50" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 헤어 — 남성 숏컷 dark gray, closed Z */}
        <path d="M24 36 Q22 18 40 16 Q58 18 56 36 Z" fill="#374151" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M34 18 Q38 14 42 16" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 얼굴 */}
        <circle cx="40" cy="40" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 걱정 */}
        <path d="M30 34 Q33 31 36 33" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M44 33 Q47 31 50 34" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* 눈 */}
        <circle cx="34" cy="37" r="2" fill="#2D2D2D" />
        <circle cx="46" cy="37" r="2" fill="#2D2D2D" />
        <circle cx="35" cy="36" r="0.8" fill="white" />
        <circle cx="47" cy="36" r="0.8" fill="white" />
        {/* 입 — 살짝 처진 걱정 입 */}
        <path d="M36 43 Q40 47 44 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 땀방울 */}
        <path d="M53 28 C53 28 51 31 53 33 C55 31 53 28 53 28Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 볼터치 */}
        <ellipse cx="30" cy="41" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.35" />
        <ellipse cx="50" cy="41" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.35" />
        {/* 몸통 */}
        <path d="M28 54 Q26 58 26 72 L54 72 Q54 58 52 54 Q46 52 40 52 Q34 52 28 54Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 53 L40 59 L44 53" stroke="#BFDBFE" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* 왼팔 */}
        <path d="M28 58 Q18 55 12 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* A 종이 — 왼손 */}
        <rect x="4" y="56" width="14" height="18" rx="1.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
        <text x="11" y="69" fontSize="9" fill="#2D2D2D" fontWeight="bold" textAnchor="middle">A</text>
        {/* 오른팔 */}
        <path d="M52 58 Q62 55 66 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* B 종이 — 오른손 */}
        <rect x="62" y="56" width="14" height="18" rx="1.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
        <text x="69" y="69" fontSize="9" fill="#2D2D2D" fontWeight="bold" textAnchor="middle">B</text>
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<>
  <path d="M24 31 Q26 35 31 33 Q38 36 46 33 Q52 35 56 30 Q57 24 40 23 Q25 24 24 31 Z" fill="#374151" />
  <path d="M47 25 Q42 30 36 33" stroke="#1F2937" strokeWidth="0.9" fill="none" opacity="0.5" />
</>
    </svg>
  ),
  "계미-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 잔잔한 웨이브 단발, 청록 (closed Z) */}
        <path d="M18 34 Q18 12 40 10 Q62 12 62 34 Q64 46 58 52 Q60 58 56 62 Q48 66 40 64 Q32 66 24 62 Q20 58 22 52 Q16 46 18 34 Z" fill="#22D3EE" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 웨이브 결 */}
        <path d="M22 40 Q26 37 30 40" stroke="#0E7490" strokeWidth="0.9" fill="none" opacity="0.5" />
        <path d="M50 40 Q54 37 58 40" stroke="#0E7490" strokeWidth="0.9" fill="none" opacity="0.5" />
        {/* 물방울 머리핀 */}
        <path d="M55 16 C55 16 51 23 51 26 A4 4 0 0 0 59 26 C59 23 55 16 55 16Z" fill="#38BDF8" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="53.5" cy="24.5" r="1" fill="white" opacity="0.7" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="38" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M30 33 Q33 31.5 36 33" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M44 33 Q47 31.5 50 33" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* 눈 — 잔잔한 반달 */}
        <path d="M30 37 Q34 33.5 38 37" stroke="#2D2D2D" strokeWidth="2.1" fill="none" strokeLinecap="round" />
        <path d="M42 37 Q46 33.5 50 37" stroke="#2D2D2D" strokeWidth="2.1" fill="none" strokeLinecap="round" />
        <circle cx="36" cy="35" r="0.8" fill="white" opacity="0.9" />
        <circle cx="48" cy="35" r="0.8" fill="white" opacity="0.9" />
        {/* 입 — 차분한 미소 */}
        <path d="M36 43 Q40 46 44 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="29" cy="41" rx="4.5" ry="2.6" fill="#F9A8D4" opacity="0.6" />
        <ellipse cx="51" cy="41" rx="4.5" ry="2.6" fill="#F9A8D4" opacity="0.6" />
        {/* 몸통 — 소프트 블루 + 깃 */}
        <path d="M28 52 Q26 56 26 72 L54 72 Q54 56 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#BFDBFE" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 51 L40 57 L44 51" stroke="#60A5FA" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* 오른팔 → 텐션 다이얼 (슬쩍 온도 낮춤) */}
        <path d="M52 58 Q58 58 62 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="68" cy="58" r="8" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M62 56 A8 8 0 0 1 66 51" stroke="#F87171" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M70 51 A8 8 0 0 1 74 58" stroke="#60A5FA" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <line x1="68" y1="58" x2="64" y2="61" stroke="#2D2D2D" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="68" cy="58" r="1.6" fill="#2D2D2D" />
        {/* 왼팔 → 거품 불기 */}
        <path d="M28 58 Q20 56 16 52" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="13" cy="50" r="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        {/* 🫧 떠오르는 거품 */}
        <circle cx="9" cy="42" r="3.5" fill="#BAE6FD" fillOpacity="0.5" stroke="#38BDF8" strokeWidth="1" />
        <circle cx="7.5" cy="40.5" r="0.9" fill="white" opacity="0.8" />
        <circle cx="14" cy="34" r="2.5" fill="#BAE6FD" fillOpacity="0.5" stroke="#38BDF8" strokeWidth="0.9" />
        <circle cx="6" cy="31" r="1.8" fill="#BAE6FD" fillOpacity="0.5" stroke="#38BDF8" strokeWidth="0.8" />
    </svg>
  ),
  "임진-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 젤 올백 남성 숏컷, closed Z */}
        <path d="M22 32 Q20 10 40 8 Q60 10 58 32 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M26 14 Q36 10 48 12" stroke="#374151" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
        {/* 얼굴 */}
        <circle cx="40" cy="36" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 카리스마 */}
        <path d="M27 28 Q33 25 39 27" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M41 27 Q47 25 53 28" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* 눈 — 날카롭게 */}
        <ellipse cx="34" cy="32" rx="3.5" ry="2.8" fill="#2D2D2D" />
        <ellipse cx="46" cy="32" rx="3.5" ry="2.8" fill="#2D2D2D" />
        <circle cx="35.5" cy="31" r="1.2" fill="white" opacity="0.9" />
        <circle cx="47.5" cy="31" r="1.2" fill="white" opacity="0.9" />
        {/* 볼터치 */}
        <ellipse cx="27" cy="39" rx="4" ry="2.5" fill="#93C5FD" opacity="0.45" />
        <ellipse cx="53" cy="39" rx="4" ry="2.5" fill="#93C5FD" opacity="0.45" />
        {/* 입 — 자신감 있는 미소 */}
        <path d="M33 43 Q40 48 47 43" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 몸통 — 정장 수트 */}
        <rect x="24" y="50" width="32" height="22" rx="4" fill="#1E3A8A" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 수트 라펠 */}
        <path d="M36 50 L40 57 L44 50" stroke="#60A5FA" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 왼팔 */}
        <path d="M24 56 Q14 52 8 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 사운드 웨이브 */}
        <path d="M-2 52 Q3 46 8 52" stroke="#60A5FA" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M-2 58 Q3 52 8 58" stroke="#60A5FA" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M-2 64 Q3 58 8 64" stroke="#60A5FA" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
        {/* 오른팔 */}
        <path d="M56 56 Q66 50 72 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 마이크 — 전문적인 핸드마이크 */}
        <rect x="69" y="34" width="9" height="14" rx="4.5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="71.5" cy="36.5" r="1.5" fill="white" opacity="0.5" />
        <line x1="73" y1="48" x2="73" y2="58" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M70 52 Q73 55 76 52" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M70 37 L78 37 M70 41 L78 41 M70 45 L78 45" stroke="#60A5FA" strokeWidth="0.7" opacity="0.6" />
        {/* 퍼포머 에너지 — 별 스파클 */}
        <path d="M5 20 L6 16 L7 20 L11 20 L8 23 L9 27 L6 24 L3 27 L4 23 L1 20 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6" opacity="0.85" />
        <path d="M14 10 L14.8 7 L15.6 10 L18.6 10 L16.2 12 L17 15 L14.8 13 L12.6 15 L13.4 12 L11 10 Z" fill="#FACC15" opacity="0.6" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<>
  <path d="M24 27 Q26 31 31 29 Q38 32 46 29 Q52 31 56 26 Q57 20 40 19 Q25 20 24 27 Z" fill="#1F2937" />
  <path d="M47 22 Q42 27 36 30" stroke="#374151" strokeWidth="0.9" fill="none" opacity="0.55" />
</>
    </svg>
  ),
  "임진-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 파도 (뒤) */}
      <path d="M4 52 Q8 48 12 52 Q16 56 20 52" stroke="#38BDF8" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.65" />
      {/* 머리 — 롱웨이브 (활기, 청록) */}
      <path d="M16 30 Q16 8 40 6 Q64 8 64 30 Q68 42 62 50 Q56 58 64 66 Q68 74 62 80 Q54 86 46 82 Q40 80 34 82 Q26 86 18 80 Q12 74 16 66 Q24 58 18 50 Q12 42 16 30 Z" fill="#0E7490" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M20 40 Q24 36 28 40" stroke="#155E75" strokeWidth="0.9" fill="none" opacity="0.5" />
      <path d="M52 40 Q56 36 60 40" stroke="#155E75" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="38" rx="14" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 들뜬 */}
      <path d="M30 32 Q34 29 38 32" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M42 32 Q46 29 50 32" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      {/* 눈 — 활짝 신난 */}
      <circle cx="34" cy="37" r="3" fill="#2D2D2D" />
      <circle cx="46" cy="37" r="3" fill="#2D2D2D" />
      <circle cx="35.3" cy="35.8" r="1.2" fill="white" />
      <circle cx="47.3" cy="35.8" r="1.2" fill="white" />
      {/* 입 — 크게 웃는/말하는 */}
      <path d="M33 43 Q40 50 47 43" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="28" cy="42" rx="3.6" ry="2.2" fill="#F9A8D4" opacity="0.55" />
      <ellipse cx="52" cy="42" rx="3.6" ry="2.2" fill="#F9A8D4" opacity="0.55" />
      {/* 몸통 — 청록 */}
      <path d="M28 53 Q26 57 26 73 L54 73 Q54 57 52 53 Q46 51 40 51 Q34 51 28 53Z" fill="#06B6D4" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M34 52 L40 57 L46 52" stroke="#CFFAFE" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 오른팔 번쩍 (떠들썩 리드) */}
      <path d="M52 56 Q58 48 56 40" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="55" cy="38" r="2.6" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      {/* 왼팔 벌림 */}
      <path d="M28 58 Q22 60 24 64" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="64" r="2.4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
      {/* 음표 + 반짝 (떠들썩) */}
      <path d="M60 30 L60 22 L66 20 L66 28" stroke="#0EA5E9" strokeWidth="1.4" fill="none" />
      <circle cx="58.5" cy="31" r="1.8" fill="#0EA5E9" />
      <circle cx="64.5" cy="29" r="1.8" fill="#0EA5E9" />
      <path d="M62 46 L63 49 L66 50 L63 51 L62 54 L61 51 L58 50 L61 49 Z" fill="#FACC15" opacity="0.5" />
    </svg>
  ),
  "계사-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 베레모 — 헤어 앞 */}
        <ellipse cx="40" cy="14" rx="22" ry="9" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
        <ellipse cx="40" cy="10" rx="20" ry="5" fill="#374151" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="48" cy="6" r="3.5" fill="#374151" stroke="#2D2D2D" strokeWidth="1" />
        {/* 작가 안경 — 헤어 앞 */}
        <rect x="26" y="36" width="10" height="7" rx="3" fill="none" stroke="#2D2D2D" strokeWidth="1.5" />
        <rect x="44" y="36" width="10" height="7" rx="3" fill="none" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="36" y1="39" x2="44" y2="39" stroke="#2D2D2D" strokeWidth="1.2" />
        <line x1="20" y1="39" x2="26" y2="39" stroke="#2D2D2D" strokeWidth="1.2" />
        <line x1="54" y1="39" x2="60" y2="39" stroke="#2D2D2D" strokeWidth="1.2" />
        {/* 헤어 — 남성 단정 숏컷, closed Z */}
        <path d="M22 34 Q20 12 40 10 Q60 12 58 34 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <circle cx="40" cy="38" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈 — 집중하는 눈 (안경 안) */}
        <circle cx="31" cy="38" r="2" fill="#2D2D2D" />
        <circle cx="49" cy="38" r="2" fill="#2D2D2D" />
        <circle cx="31.8" cy="37.2" r="0.8" fill="white" />
        <circle cx="49.8" cy="37.2" r="0.8" fill="white" />
        {/* 눈썹 — 영감 폭발 */}
        <path d="M27 29 Q31 24 36 26" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M44 26 Q48 24 52 29" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* 입 — 아! 탄성 */}
        <path d="M35 44 Q37 51 40 52 Q43 51 45 44 Q43 41 40 41 Q37 41 35 44 Z" fill="#2D2D2D" />
        <path d="M36 47 Q40 51 44 47" stroke="#C2410C" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="42" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.3" />
        <ellipse cx="52" cy="42" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.3" />
        {/* 몸통 */}
        <path d="M28 52 Q26 56 26 72 L54 72 Q54 56 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 왼팔 + 대본 */}
        <path d="M28 58 Q18 55 12 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="4" y="56" width="18" height="16" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
        <line x1="7" y1="60" x2="19" y2="60" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="7" y1="63" x2="19" y2="63" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="7" y1="66" x2="16" y2="66" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 오른팔 + 대왕 연필 */}
        <path d="M52 58 Q60 52 66 46" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <line x1="55" y1="24" x2="74" y2="72" stroke="#2D2D2D" strokeWidth="12" strokeLinecap="butt" />
        <line x1="56" y1="24" x2="73" y2="70" stroke="#FBBF24" strokeWidth="9" strokeLinecap="butt" />
        <rect x="51" y="20" width="9" height="6" rx="1" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" />
        <polygon points="69,68 78,74 62,79" fill="#F5F5F4" stroke="#2D2D2D" strokeWidth="1" />
        <polygon points="71,70 75,73 68,75" fill="#2D2D2D" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<>
  <path d="M25 27 Q27 32 31 30 Q38 33 46 30 Q52 32 55 27 Q55 24 40 24 Q25 24 25 27 Z" fill="#2D2D2D" />
  <path d="M47 25 Q42 29 37 31" stroke="#4B5563" strokeWidth="0.9" fill="none" opacity="0.5" />
</>
    </svg>
  ),
  "계사-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 장발 흑발 — 먼저 */}
        <path d="M18 32 Q18 10 40 10 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 후드 */}
        <path d="M16 38 Q14 16 40 12 Q66 16 64 38" fill="#1D4ED8" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="38" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 서늘하게 살짝 내림 */}
        <path d="M30 32 Q34 31 37 32.5" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        <path d="M43 32.5 Q46 31 50 32" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        {/* 속눈썹 */}
        <path d="M31 35 Q34 33.5 37 35" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M43 35 Q46 33.5 49 35" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* 눈 — 차분하고 서늘한 눈매 (윗꺼풀 + 또렷 동공) */}
        <path d="M30 37 L37 36.5" stroke="#2D2D2D" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M43 36.5 L50 37" stroke="#2D2D2D" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="34" cy="37.6" r="2" fill="#2D2D2D" />
        <circle cx="46" cy="37.6" r="2" fill="#2D2D2D" />
        <circle cx="34.8" cy="36.9" r="0.7" fill="white" />
        <circle cx="46.8" cy="36.9" r="0.7" fill="white" />
        {/* 입 — 조용한 자신감 한쪽 올림 */}
        <path d="M37 44 Q40 45.5 44 43.5" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 — 연보라 */}
        <ellipse cx="30" cy="41" rx="3.5" ry="2" fill="#C4B5FD" opacity="0.5" />
        <ellipse cx="50" cy="41" rx="3.5" ry="2" fill="#C4B5FD" opacity="0.5" />
        {/* 몸통 — 네이비 */}
        <path d="M28 52 Q26 56 26 72 L54 72 Q54 56 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#1D4ED8" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 뱀 — 선명한 초록, 크게 */}
        <path d="M52 50 Q66 44 72 54 Q78 64 70 70 Q62 76 56 64 Q50 54 60 50" stroke="#22C55E" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M52 50 Q66 44 72 54" stroke="#2D2D2D" strokeWidth="1.2" fill="none" />
        <circle cx="73" cy="52" r="2.5" fill="#2D2D2D" />
        <path d="M75 50 L79 48 M75 50 L79 52" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" />
        {/* 체스말 — 크게 */}
        <rect x="6" y="69" width="14" height="5" rx="2" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1" />
        <rect x="10" y="61" width="6" height="8" rx="1" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="13" cy="57" r="5" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="13" cy="57" r="3" fill="#60A5FA" />
    </svg>
  ),
  "임인-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 새싹 — 수생목 성장 (헤어 위) */}
        <path d="M40 9 Q40 3 44 1 Q45 5 42 8Z" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
        <path d="M40 9 Q40 4 36 2 Q35 6 38 9Z" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
        {/* 헤어 — 남성 숏컷 파랑, closed Z + 결 */}
        <path d="M22 32 Q20 12 40 10 Q60 12 58 32 Z" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M32 16 Q33 21 31 25" stroke="#1D4ED8" strokeWidth="0.8" fill="none" opacity="0.55" />
        <path d="M40 14 Q41 19 40 24" stroke="#1D4ED8" strokeWidth="0.8" fill="none" opacity="0.55" />
        <path d="M48 16 Q47 21 49 25" stroke="#1D4ED8" strokeWidth="0.8" fill="none" opacity="0.55" />
        {/* 얼굴 */}
        <circle cx="40" cy="36" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 신난 호기심 */}
        <path d="M28 28 Q32 25 37 28" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M43 28 Q48 25 52 28" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* 눈 — 반짝이는 호기심 */}
        <circle cx="34" cy="34" r="2.8" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.8" fill="#2D2D2D" />
        <circle cx="35.2" cy="32.8" r="1.2" fill="white" />
        <circle cx="47.2" cy="32.8" r="1.2" fill="white" />
        {/* 입 — 신난 미소 */}
        <path d="M35 43 Q40 48 45 43" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="29" cy="40" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.45" />
        <ellipse cx="51" cy="40" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.45" />
        {/* 몸통 — 탐험가 베스트 + 깃 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 49 L40 55 L44 49" stroke="#BFDBFE" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        <rect x="44" y="56" width="5" height="6" rx="1" fill="#FBBF24" stroke="#1E40AF" strokeWidth="0.8" />
        {/* 오른팔 → 가능성 항아리 (버킷리스트) */}
        <path d="M52 58 Q58 58 62 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M61 56 Q60 56 60 58 L60 70 Q60 72 62 72 L73 72 Q75 72 75 70 L75 58 Q75 56 74 56 Z" fill="#DBEAFE" fillOpacity="0.55" stroke="#2D2D2D" strokeWidth="1.4" />
        <rect x="59" y="53" width="17" height="3.5" rx="1.2" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="1" />
        {/* 항아리 속 수집된 가능성들 */}
        <path d="M64 63 L65.5 66 L68.5 66 L66 68 L67 71 L64 69 L61 71 L62 68 L59.5 66 L62.5 66 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.5" />
        <path d="M71 66 Q71 62 74 61 Q74 65 71 66Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.5" />
        <path d="M70 70 Q70 68 71.5 68 Q73 68 73 69.5 Q73 71 70 72.5 Q67 71 67 69.5 Q67 68 68.5 68 Q70 68 70 70Z" fill="#F472B6" stroke="#2D2D2D" strokeWidth="0.4" />
        {/* 왼팔 → 채집망 (새 가능성 잡기) */}
        <path d="M28 54 Q22 52 18 48" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <line x1="18" y1="48" x2="10" y2="38" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="9" cy="35" rx="6" ry="7" fill="#DBEAFE" fillOpacity="0.35" stroke="#2D2D2D" strokeWidth="1.4" />
        <path d="M4 33 Q9 36 14 33" stroke="#60A5FA" strokeWidth="0.6" fill="none" opacity="0.6" />
        <path d="M5 38 Q9 40 13 38" stroke="#60A5FA" strokeWidth="0.6" fill="none" opacity="0.5" />
        {/* 망에 갓 잡힌 별 */}
        <path d="M9 31 L10 34 L13 34 L10.5 36 L11.5 39 L9 37 L6.5 39 L7.5 36 L5 34 L8 34 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.9" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M23 27 Q25 33 28 29 Q30 34 33 29 Q36 34 39 29 Q42 34 45 29 Q48 34 51 29 Q54 33 57 27 Q58 20 40 19 Q22 20 23 27 Z" fill="#3B82F6" />
    </svg>
  ),
  "임인-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 장발 웨이브 퍼머, 주황 */}
        <path d="M16 30 Q16 8 40 6 Q64 8 64 30 Q68 42 62 50 Q56 58 64 66 Q68 74 62 80 Q54 86 46 82 Q40 80 34 82 Q26 86 18 80 Q12 74 16 66 Q24 58 18 50 Q12 42 16 30 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 레이더 눈빛 */}
        <circle cx="34" cy="34" r="2.2" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2.2" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.9" fill="white" />
        <circle cx="47" cy="33" r="0.9" fill="white" />
        {/* 입 — 크게 벌린 소리치는 */}
        <ellipse cx="40" cy="44" rx="7" ry="5" fill="#2D2D2D"/>
        <ellipse cx="40" cy="43" rx="5" ry="3" fill="#F87171"/>
        {/* 볼터치 */}
        <ellipse cx="30" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.65" />
        <ellipse cx="50" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.65" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 호랑이 꼬리 */}
        <path d="M54 62 Q62 58 66 52 Q70 58 64 64 Q60 68 56 66 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M56 64 Q60 62 64 58" stroke="#92400E" strokeWidth="1" strokeLinecap="round" fill="none" />
        {/* 느낌표 */}
        <rect x="67" y="6" width="5" height="16" rx="2.5" fill="#F97316" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="69.5" cy="27" r="3" fill="#F97316" stroke="#2D2D2D" strokeWidth="1" />
    </svg>
  ),
  "계묘-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 레이더 플랫탑, cyan */}
        <path d="M24 28 Q22 14 40 12 Q58 14 56 28 Z" fill="#06B6D4" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 레이더 접시 — 머리 위에 장착 */}
        <ellipse cx="40" cy="12" rx="14" ry="4" fill="#0F172A" stroke="#2D2D2D" strokeWidth="1.2" />
        <ellipse cx="40" cy="11" rx="12" ry="2.5" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 안테나 포스트 */}
        <line x1="40" y1="7" x2="40" y2="3" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="40" cy="2" r="2" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" />
        {/* 신호 웨이브 */}
        <path d="M36 4 Q40 0 44 4" stroke="#4ADE80" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M30 18 Q34 14 37 16" stroke="#0EA5E9" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M43 15 Q47 12 50 15" stroke="#0EA5E9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 얼굴 */}
        <circle cx="40" cy="36" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 날카롭게 */}
        <path d="M30 30 Q33 27 36 29" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M44 29 Q47 27 50 30" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* 눈 — 레이더 눈빛, 날카롭게 */}
        <ellipse cx="34" cy="34" rx="2.5" ry="2" fill="#2D2D2D" />
        <ellipse cx="46" cy="34" rx="2.5" ry="2" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.9" fill="white" />
        <circle cx="47" cy="33" r="0.9" fill="white" />
        {/* 입 — 확신의 미소 */}
        <path d="M35 41 Q40 45 45 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="29" cy="38" rx="3.5" ry="2" fill="#BAE6FD" opacity="0.55" />
        <ellipse cx="51" cy="38" rx="3.5" ry="2" fill="#BAE6FD" opacity="0.55" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 49 L40 55 L44 49" stroke="#BFDBFE" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* 왼팔 + 레이더 화면 */}
        <path d="M28 56 Q18 52 12 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="10" cy="62" r="8" fill="#0F172A" stroke="#2D2D2D" strokeWidth="1.2" />
        <circle cx="10" cy="62" r="5" stroke="#60A5FA" strokeWidth="0.8" fill="none" opacity="0.6" />
        <circle cx="10" cy="62" r="2.5" stroke="#60A5FA" strokeWidth="0.8" fill="none" opacity="0.4" />
        <line x1="10" y1="62" x2="14" y2="58" stroke="#4ADE80" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="14" cy="58" r="1.2" fill="#4ADE80" />
        {/* 오른팔 + 감지 포즈 */}
        <path d="M52 56 Q62 52 66 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="68" cy="60" rx="5" ry="4" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M25 26 Q26 30 29 28 Q34 31 40 28 Q46 31 51 28 Q54 30 55 26 Q55 21 40 20 Q25 21 25 26 Z" fill="#06B6D4" />
    </svg>
  ),
  "계묘-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 양갈래, 핑크 */}
        <path d="M22 30 Q22 10 40 8 Q58 10 58 30" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M20 30 Q12 40 14 62 Q16 70 20 68 Q26 64 22 50 Q20 40 22 32 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M60 30 Q68 40 66 62 Q64 70 60 68 Q54 64 58 50 Q60 40 58 32 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="21" cy="30" r="3.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="59" cy="30" r="3.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 귀여운 */}
        <circle cx="34" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="46" cy="34" r="2" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 귀여운 미소 */}
        <path d="M36 41 Q40 45 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="30" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
        <ellipse cx="50" cy="38" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 겉은 부드러워 보이는 꽃 */}
        <circle cx="40" cy="62" r="4" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 속은 독한 — 날카로운 별 */}
        <path d="M9 58 L11 52 L13 58 L19 58 L14 62 L16 68 L11 64 L6 68 L8 62 L3 58 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  ),
  "임자-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* === BEFORE 상어 몸체·표정 그대로 === */}
      {/* 지느러미 */}
      <path d="M35 12 Q38 4 42 12" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 몸 */}
      <ellipse cx="40" cy="40" rx="22" ry="28" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 배 — 빈 곳 색 채움 (옅은 회색 → 또렷한 하늘색) */}
      <ellipse cx="40" cy="44" rx="14" ry="18" fill="#CDE6FF" stroke="#2D2D2D" strokeWidth="1" />
      {/* 눈 */}
      <ellipse cx="33" cy="32" rx="3" ry="3" fill="white" stroke="#2D2D2D" strokeWidth="1" />
      <ellipse cx="47" cy="32" rx="3" ry="3" fill="white" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="34" cy="33" r="1.5" fill="#2D2D2D" />
      <circle cx="48" cy="33" r="1.5" fill="#2D2D2D" />
      <circle cx="34.5" cy="32.5" r="0.6" fill="white" />
      <circle cx="48.5" cy="32.5" r="0.6" fill="white" />
      {/* 입 — 상어 이빨 미소 */}
      <path d="M32 42 Q40 48 48 42" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M34 42 L36 46 L38 42 L40 46 L42 42 L44 46 L46 42" stroke="#2D2D2D" strokeWidth="1" fill="white" strokeLinejoin="round" />
      {/* 볼터치 */}
      <ellipse cx="27" cy="38" rx="4" ry="2.5" fill="#93C5FD" opacity="0.6" />
      <ellipse cx="53" cy="38" rx="4" ry="2.5" fill="#93C5FD" opacity="0.6" />
      {/* 측면 지느러미 (그대로) */}
      <path d="M18 40 Q10 35 14 50 Q20 48 18 40Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M62 40 Q70 35 66 50 Q60 48 62 40Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1" />
      {/* 꼬리 (그대로) */}
      <path d="M32 68 Q24 76 18 72 Q22 64 28 66Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M48 68 Q56 76 62 72 Q58 64 52 66Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1" />
      {/* === 왼쪽 지느러미에 휴대폰 === */}
      <path d="M13 49 L9 53" stroke="#2D2D2D" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="3" y="51" width="8" height="13" rx="1.6" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1" transform="rotate(-13 7 57)" />
      <rect x="4.2" y="53" width="5.6" height="8.5" rx="0.5" fill="#60A5FA" opacity="0.8" transform="rotate(-13 7 57)" />
      {/* === 오른쪽 지느러미에 커피 === */}
      <path d="M67 49 L71 53" stroke="#2D2D2D" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M68 52 L77 52 L76 61 Q76 63 74 63 L70 63 Q68 63 68 61Z" fill="#FFF7ED" stroke="#2D2D2D" strokeWidth="1.1" />
      <path d="M77 54 Q80 55 77.5 57.5" stroke="#2D2D2D" strokeWidth="0.9" fill="none" />
      <path d="M69 54 L76 54" stroke="#C8956B" strokeWidth="2" opacity="0.85" />
      <path d="M70 49 Q71 47 70 45 M73 49 Q74 47 73 45.5" stroke="#CBD5E1" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  "임자-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 장발 웨이브, 파랑 (닫힌 Z path 먼저) */}
        <path d="M16 30 Q16 8 40 6 Q64 8 64 30 Q68 42 62 50 Q56 58 64 66 Q68 74 62 80 Q54 86 46 82 Q40 80 34 82 Q26 86 18 80 Q12 74 16 66 Q24 58 18 50 Q12 42 16 30 Z" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 32 Q34 30 37 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 32 Q46 30 49 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 에너지 넘치는 눈 */}
        <ellipse cx="34" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <ellipse cx="46" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 입 — 크게 웃는 입 */}
        <path d="M35 41 Q40 47 45 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="38" rx="5" ry="3" fill="#93C5FD" opacity="0.7" />
        <ellipse cx="52" cy="38" rx="5" ry="3" fill="#93C5FD" opacity="0.7" />
        {/* 헤어 장식 — 파도 핀 */}
        <path d="M22 12 Q26 8 30 12 Q26 16 22 12Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 음표 소품 */}
        <circle cx="62" cy="56" r="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="65" y1="56" x2="65" y2="48" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M65 48 L70 50 L70 54 L65 52Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
        <circle cx="68" cy="60" r="2.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="70.5" y1="60" x2="70.5" y2="54" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  "계축-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 소 뿔 */}
        <path d="M24 20 Q18 8 22 4 Q26 8 28 18" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M56 20 Q62 8 58 4 Q54 8 52 18" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
        {/* 머리카락 + 결 */}
        <path d="M22 30 Q22 16 40 16 Q58 16 58 30 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M33 20 Q34 25 32 29" stroke="#52525B" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M47 20 Q46 25 48 29" stroke="#52525B" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 얼굴 — 묵직하고 넓은 */}
        <circle cx="40" cy="42" r="18" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 묵직하게 */}
        <line x1="28" y1="34" x2="37" y2="34" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="43" y1="34" x2="52" y2="34" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" />
        {/* 눈 — 과묵한 좁은 눈 */}
        <path d="M29 39 L36 39" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M44 39 L51 39" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
        {/* 입 — 꾹 다문 */}
        <line x1="35" y1="49" x2="45" y2="49" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="27" cy="46" rx="3.5" ry="1.8" fill="#FCA5A5" opacity="0.25" />
        <ellipse cx="53" cy="46" rx="3.5" ry="1.8" fill="#FCA5A5" opacity="0.25" />
        {/* 몸통 — 묵직한 체형 + 멜빵 */}
        <rect x="24" y="62" width="32" height="22" rx="6" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="2" />
        <line x1="33" y1="62" x2="33" y2="84" stroke="#1E40AF" strokeWidth="2" opacity="0.7" />
        <line x1="47" y1="62" x2="47" y2="84" stroke="#1E40AF" strokeWidth="2" opacity="0.7" />
        <rect x="31" y="70" width="4" height="3" rx="0.8" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.5" />
        <rect x="45" y="70" width="4" height="3" rx="0.8" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* 왼팔 → 망치 */}
        <path d="M24 68 Q17 66 12 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="8" y="58" width="5" height="22" rx="1.5" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
        <rect x="3" y="53" width="14" height="8" rx="2" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
        <rect x="4" y="55" width="5" height="4" rx="1" fill="#CBD5E1" opacity="0.6" />
        {/* 오른팔 → 주먹 */}
        <path d="M56 68 Q60 67 62 66" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="60" y="64" width="12" height="10" rx="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="62" y1="62" x2="62" y2="64" stroke="#2D2D2D" strokeWidth="1" />
        <line x1="65" y1="62" x2="65" y2="64" stroke="#2D2D2D" strokeWidth="1" />
        <line x1="68" y1="62" x2="68" y2="64" stroke="#2D2D2D" strokeWidth="1" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M25 30 Q26 34 29 33 Q35 35 41 33 Q47 35 53 33 Q56 34 56 30 Q57 25 40 24 Q24 25 25 30 Z" fill="#2D2D2D" />
    </svg>
  ),
  "계축-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 헤어 — 신미-f 양갈래 (노랑) */}
      <path d="M22 30 Q22 10 40 8 Q58 10 58 30 Q58 38 50 42 Q40 44 30 42 Q22 38 22 30 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M14 32 Q6 42 10 66 Q14 76 22 72 Q28 68 24 52 Q22 44 22 32 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M66 32 Q74 42 70 66 Q66 76 58 72 Q52 68 56 52 Q58 44 58 32 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M22 28 L23.5 24 L25 28 L29 28 L26 31 L27 35 L23.5 33 L20 35 L21 31 L18 28 Z" fill="#2563EB" stroke="#2D2D2D" strokeWidth="0.8" />
      <path d="M58 28 L59.5 24 L61 28 L65 28 L62 31 L63 35 L59.5 33 L56 35 L57 31 L54 28 Z" fill="#2563EB" stroke="#2D2D2D" strokeWidth="0.8" />
      {/* 음표 핀 — 에이스 (유지) */}
      <line x1="52" y1="20" x2="52" y2="13" stroke="#0EA5E9" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="50.5" cy="20.5" r="1.6" fill="#0EA5E9" stroke="#2D2D2D" strokeWidth="0.6" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 */}
      <path d="M30 29 Q34 27.5 37 29" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M43 29 Q46 27.5 50 29" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* 속눈썹 (유지) */}
      <path d="M31 31.5 Q34 30 37 31.5" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M43 31.5 Q46 30 49 31.5" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="33" cy="33.5" r="3" fill="#2D2D2D" />
      <circle cx="47" cy="33.5" r="3" fill="#2D2D2D" />
      <circle cx="34.2" cy="32.3" r="1.2" fill="white" />
      <circle cx="48.2" cy="32.3" r="1.2" fill="white" />
      {/* 입 */}
      <path d="M37 42 Q40 44 43 42" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="28" cy="38" rx="3.5" ry="2" fill="#93C5FD" opacity="0.35" />
      <ellipse cx="52" cy="38" rx="3.5" ry="2" fill="#93C5FD" opacity="0.35" />
      {/* 몸통 */}
      <path d="M28 52 Q26 56 26 72 L54 72 Q54 56 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 왼팔 + 빨간 100점 종이 */}
      <path d="M28 56 Q18 54 14 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="0" y="49" width="24" height="30" rx="2" fill="white" stroke="#EF4444" strokeWidth="2" />
      <text x="12" y="61" fontSize="8" fill="#EF4444" fontWeight="bold" textAnchor="middle">{"100"}</text>
      <text x="12" y="71" fontSize="7" fill="#EF4444" fontWeight="bold" textAnchor="middle">{"점!"}</text>
      {/* 쉿 제스처 — 오른손 */}
      <path d="M52 54 Q48 46 42 41" stroke="#FDDCB5" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M52 54 Q48 46 42 41" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <ellipse cx="40" cy="40" rx="3.5" ry="2.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1" />
    </svg>
  ),
  "임술-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 뇌 모자 — FIRST */}
        <ellipse cx="40" cy="12" rx="16" ry="9" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M30 12 Q32 8 35 12 Q38 8 40 12 Q42 8 45 12 Q48 8 50 12" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* 전구 — 뇌 위 */}
        <circle cx="40" cy="3" r="3.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <path d="M38 6.5 L42 6.5" stroke="#2D2D2D" strokeWidth="0.7" />
        {/* 빛 라인들 */}
        <line x1="40" y1="8" x2="40" y2="5" stroke="#FACC15" strokeWidth="1" opacity="0.6" />
        <line x1="45" y1="4" x2="47" y2="2" stroke="#FACC15" strokeWidth="0.8" opacity="0.5" />
        <line x1="35" y1="4" x2="33" y2="2" stroke="#FACC15" strokeWidth="0.8" opacity="0.5" />
        {/* 헤어 — 남성 숏컷 (뇌 모자 아래), closed Z */}
        <path d="M22 32 Q20 18 40 18 Q60 18 58 32 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <circle cx="40" cy="36" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 눈썹 — 한쪽 들린 (번득임) */}
        <path d="M29 29 Q32 26 36 29" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <line x1="43" y1="28" x2="51" y2="26" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" />
        {/* 눈 — 번뜩이는 */}
        <circle cx="33" cy="33" r="2.8" fill="#2D2D2D" />
        <circle cx="47" cy="33" r="2.8" fill="#2D2D2D" />
        <circle cx="34.5" cy="32" r="1.2" fill="white" />
        <circle cx="48.5" cy="32" r="1.2" fill="white" />
        {/* 입 — 확신의 미소 */}
        <path d="M34 42 Q40 47 46 42" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="38" rx="3" ry="1.8" fill="#60A5FA" opacity="0.35" />
        <ellipse cx="52" cy="38" rx="3" ry="1.8" fill="#60A5FA" opacity="0.35" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M36 49 L40 55 L44 49" stroke="#BFDBFE" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        {/* 왼팔 + 비교차트 */}
        <path d="M28 56 Q18 52 12 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="4" y="52" width="16" height="14" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
        <line x1="12" y1="52" x2="12" y2="66" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="4" y1="58" x2="20" y2="58" stroke="#2D2D2D" strokeWidth="0.8" />
        <circle cx="8" cy="55" r="1.5" fill="#EF4444" />
        <circle cx="16" cy="55" r="1.5" fill="#4ADE80" />
        <line x1="7" y1="63" x2="11" y2="63" stroke="#94A3B8" strokeWidth="0.8" />
        <line x1="13" y1="62" x2="19" y2="62" stroke="#2563EB" strokeWidth="1.2" />
        {/* 오른팔 + 포인팅 손가락 */}
        <path d="M52 56 Q62 52 66 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="68" cy="57" rx="4" ry="5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
        <path d="M66 55 Q70 50 72 55" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 번뜩이 효과 */}
        <path d="M6 32 L4 36 L8 35 L5 40" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinejoin="round" opacity="0.5" />
                  {/* fringe(앞머리) 베이크 — 오버레이를 char-svg에 삽입 */}
<path d="M24 26 Q26 31 29 28 Q31 32 34 28 Q37 32 40 28 Q43 32 46 28 Q49 32 51 28 Q54 31 56 26 Q57 21 40 20 Q23 21 24 26 Z" fill="#2D2D2D" />
    </svg>
  ),
  "임술-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 전구 머리 위 여러 개 */}
        <circle cx="30" cy="8" r="4" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <line x1="30" y1="12" x2="30" y2="16" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="40" cy="4" r="5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2" />
        <line x1="40" y1="9" x2="40" y2="14" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="50" cy="8" r="4" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <line x1="50" y1="12" x2="50" y2="16" stroke="#2D2D2D" strokeWidth="1" />
        {/* 작은 가로선 (전구 필라멘트) */}
        <line x1="38" y1="7" x2="42" y2="7" stroke="#2D2D2D" strokeWidth="0.6" />
        {/* 초록 펌 긴머리 (closed Z) */}
        <path d="M20 30 Q18 12 40 10 Q62 12 60 30 Q64 42 58 54 Q62 64 56 76 Q52 84 46 82 Q40 80 34 82 Q28 84 24 76 Q18 64 22 54 Q16 42 20 30 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M22 36 Q26 32 30 36 Q34 40 38 36" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M22 46 Q26 42 30 46 Q34 50 38 46" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M24 56 Q28 52 32 56 Q36 60 40 56" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.4" />
        {/* 얼굴 — 여성 ellipse */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 반짝이는 눈 */}
        <circle cx="34" cy="33" r="3" fill="#2D2D2D" />
        <circle cx="46" cy="33" r="3" fill="#2D2D2D" />
        <circle cx="35.5" cy="32" r="1.2" fill="white" />
        <circle cx="47.5" cy="32" r="1.2" fill="white" />
        {/* 눈썹 — 들뜬 */}
        <path d="M29 27 Q34 24 38 27" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M42 27 Q46 24 51 27" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 입 — 아이디어 폭발 흥분 미소 */}
        <path d="M32 41 Q40 47 48 41" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="27" cy="37" rx="3.5" ry="1.8" fill="#60A5FA" opacity="0.3" />
        <ellipse cx="53" cy="37" rx="3.5" ry="1.8" fill="#60A5FA" opacity="0.3" />
        {/* 몸통 — 여성 body path */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 노트+펜 — 손에 */}
        <rect x="56" y="52" width="12" height="16" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
        <line x1="59" y1="57" x2="65" y2="57" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="59" y1="60" x2="65" y2="60" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="59" y1="63" x2="63" y2="63" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="56" y1="50" x2="60" y2="46" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M58 45 L60 48 L62 46" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 번쩍 이펙트 */}
        <path d="M6 40 L4 44 L8 43 L5 48" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinejoin="round" opacity="0.5" />
    </svg>
  ),
  "계해-m": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
      {/* 고래 */}
      <ellipse cx="63" cy="18" rx="13" ry="7" fill="#8B5CF6" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M50 13 Q43 10 45 18 Q43 26 50 23" fill="#8B5CF6" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M62 11 L65 3 L68 11" fill="#8B5CF6" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="71" cy="17" r="1.5" fill="#2D2D2D" />
      <path d="M60 8 Q57 3 60 1" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M65 6 Q65 1 63 1" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* 상어 */}
      <ellipse cx="18" cy="74" rx="16" ry="7" fill="#64748B" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M18 67 L22 54 L26 67" fill="#64748B" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M4 70 Q2 74 4 78" stroke="#2D2D2D" strokeWidth="1" fill="none" />
      <ellipse cx="10" cy="72" rx="2" ry="1.5" fill="#2D2D2D" />
      <path d="M6 74 L10 72 L8 76 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.6" />
      {/* 헤어 크라운 — 심플 캡 (옆으로 안 감쌈) */}
      <path d="M22 30 Q20 12 40 10 Q60 12 58 30 Z" fill="#1E3A8A" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="36" rx="16" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 앞머리 — 가르마 스윕 (fill만) */}
      <path d="M23 27 Q25 31 30 29 Q38 32 46 29 Q53 31 57 26 Q58 20 40 19 Q24 20 23 27 Z" fill="#1E3A8A" />
      <path d="M48 21 Q42 27 36 30" stroke="#3B5BA5" strokeWidth="0.9" fill="none" opacity="0.6" />
      {/* 눈썹 */}
      <path d="M29 30 Q33 28.5 37 30" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M43 30 Q47 28.5 51 30" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <path d="M30 34 Q34 32 37 34" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M43 34 Q46 32 49 34" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 입 */}
      <path d="M35 43 Q40 46 45 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="29" cy="39" rx="3" ry="2" fill="#93C5FD" opacity="0.3" />
      <ellipse cx="51" cy="39" rx="3" ry="2" fill="#93C5FD" opacity="0.3" />
      {/* 몸통 */}
      <path d="M24 52 Q22 56 22 74 L58 74 Q58 56 56 52 Q48 50 40 50 Q32 50 24 52Z" fill="#1E40AF" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M36 51 L40 57 L44 51" stroke="#60A5FA" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      {/* 왼팔 → 턱 괸 사색 포즈 */}
      <path d="M28 56 Q30 52 35 51" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="36" cy="50" rx="3" ry="2.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1" />
      {/* 우주 소품 */}
      <circle cx="64" cy="54" r="8" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="62" cy="52" r="1.2" fill="white" opacity="0.8" />
      <circle cx="66" cy="55" r="0.8" fill="white" opacity="0.8" />
      <circle cx="63" cy="58" r="1" fill="white" opacity="0.6" />
      <circle cx="67" cy="51" r="0.6" fill="white" opacity="0.7" />
      {/* 말풍선 */}
      <rect x="6" y="50" width="16" height="10" rx="2" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="0.8" />
      <path d="M14 52 L14 54" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round" />
      <circle cx="14" cy="56" r="0.8" fill="#60A5FA" />
      <path d="M10 60 L8 64 L14 60" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  ),
  "계해-f": (viewBox = "0 0 80 90") => (
    <svg viewBox={viewBox} className="w-full h-full" fill="none">
        {/* 헤어 — 중단발 웨이브, 라벤더 (닫힌 Z path 먼저) */}
        <path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 40 60 46 Q54 52 62 58 Q64 64 56 68 Q48 70 44 68 Q40 66 36 68 Q28 70 22 66 Q16 62 18 56 Q26 50 20 44 Q14 38 18 30 Z" fill="#C4B5FD" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 얼굴 */}
        <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 속눈썹 */}
        <path d="M31 32 Q34 30 37 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 32 Q46 30 49 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 눈 — 감성 넘치는 촉촉한 눈 */}
        <ellipse cx="34" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <ellipse cx="46" cy="34" rx="2.5" ry="2.5" fill="#2D2D2D" />
        <circle cx="35" cy="33" r="0.8" fill="white" />
        <circle cx="47" cy="33" r="0.8" fill="white" />
        {/* 눈 아래 반짝 (촉촉한 눈물기) */}
        <ellipse cx="34" cy="36.5" rx="1.5" ry="0.8" fill="#93C5FD" opacity="0.5" />
        <ellipse cx="46" cy="36.5" rx="1.5" ry="0.8" fill="#93C5FD" opacity="0.5" />
        {/* 입 — 감동 미소 */}
        <path d="M36 41 Q40 46 44 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 볼터치 */}
        <ellipse cx="28" cy="38" rx="5" ry="3" fill="#C4B5FD" opacity="0.7" />
        <ellipse cx="52" cy="38" rx="5" ry="3" fill="#C4B5FD" opacity="0.7" />
        {/* 헤어 장식 — 물방울 핀 */}
        <path d="M50 10 C50 10 46 14 46 16 A4 4 0 0 0 54 16 C54 14 50 10 50 10Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
        {/* 몸통 */}
        <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        {/* 이어폰 소품 */}
        <circle cx="62" cy="52" r="4" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8" />
        <path d="M60 52 Q56 46 52 48" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* 음표 */}
        <circle cx="10" cy="58" r="2.5" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="0.8" />
        <line x1="12.5" y1="58" x2="12.5" y2="51" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
}
