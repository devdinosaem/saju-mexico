"use client";

import { ILJU_TYPES } from "@/lib/ilju-types";
import { SetlogCard, SetlogCardA1, SetlogCardA3, NightCard, NightCardB1, BubbleCard } from "@/components/ilju-type-card";
import { SetlogCardA4 } from "@/components/ilju-card-a4";
import { SetlogCardA5 } from "@/components/ilju-card-a5";
import { SetlogCardA4Ilju } from "@/components/ilju-card-a4-ilju";
import { NightCardB1Ilju } from "@/components/ilju-card-b1-ilju";
import { CelebCardA4, CelebCardB, CelebCardMuseum, CelebCardPlatinum, type CelebCardData } from "@/components/ilju-card-celeb";

// 카드 디자인 시안용 — 실제 캐릭터 SVG 예시 3개
function CharacterBuldozer() {
  return (
    <svg viewBox="0 0 80 90" className="w-[120px]" fill="none">
      {/* 헬멧 */}
      <ellipse cx="40" cy="18" rx="18" ry="14" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="2" />
      <rect x="22" y="22" width="36" height="8" rx="2" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="36" rx="14" ry="12" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="35" cy="34" r="2" fill="#2D2D2D" />
      <circle cx="45" cy="34" r="2" fill="#2D2D2D" />
      <path d="M36 40 Q40 43 44 40" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="33" cy="38" rx="3" ry="1.5" fill="#F9A8D4" opacity="0.6" />
      <ellipse cx="47" cy="38" rx="3" ry="1.5" fill="#F9A8D4" opacity="0.6" />
      {/* 몸통 */}
      <rect x="26" y="48" width="28" height="20" rx="4" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 불도저 삽날 */}
      <rect x="16" y="60" width="14" height="8" rx="2" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 바퀴 */}
      <circle cx="32" cy="72" r="5" fill="#2D2D2D" />
      <circle cx="48" cy="72" r="5" fill="#2D2D2D" />
      <circle cx="32" cy="72" r="2" fill="#6B7280" />
      <circle cx="48" cy="72" r="2" fill="#6B7280" />
    </svg>
  );
}

function CharacterGamseong() {
  return (
    <svg viewBox="0 0 80 90" className="w-[120px]" fill="none">
      {/* 꽃 장식 */}
      <circle cx="40" cy="10" r="6" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="33" cy="14" r="4" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="47" cy="14" r="4" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="34" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈 — 감성적 반달 */}
      <path d="M33 31 Q35 29 37 31" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M43 31 Q45 29 47 31" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="35" cy="37" rx="3" ry="1.5" fill="#F9A8D4" opacity="0.6" />
      <ellipse cx="45" cy="37" rx="3" ry="1.5" fill="#F9A8D4" opacity="0.6" />
      <path d="M37 40 Q40 43 43 40" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 머리카락 */}
      <path d="M25 28 Q22 20 28 16 Q34 12 40 14 Q48 12 52 18 Q56 24 54 30" stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* 몸통 */}
      <rect x="27" y="48" width="26" height="20" rx="4" fill="#D1FAE5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 붓 */}
      <rect x="52" y="44" width="3" height="18" rx="1.5" fill="#92400E" stroke="#2D2D2D" strokeWidth="1" />
      <ellipse cx="53.5" cy="62" rx="2.5" ry="4" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" />
      {/* 팔레트 */}
      <ellipse cx="22" cy="60" rx="7" ry="5" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="20" cy="59" r="1.5" fill="#F87171" />
      <circle cx="24" cy="57" r="1.5" fill="#4ADE80" />
      <circle cx="24" cy="62" r="1.5" fill="#60A5FA" />
      {/* 다리 */}
      <rect x="30" y="67" width="7" height="12" rx="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      <rect x="43" y="67" width="7" height="12" rx="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
    </svg>
  );
}

function CharacterByungO() {
  return (
    <svg viewBox="0 0 80 90" className="w-[120px]" fill="none">
      {/* 왕관 */}
      <path d="M24 22 L28 12 L35 20 L40 8 L45 20 L52 12 L56 22 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* 얼굴 */}
      <circle cx="40" cy="36" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈 — 당당한 */}
      <circle cx="34" cy="34" r="2.5" fill="#2D2D2D" />
      <circle cx="46" cy="34" r="2.5" fill="#2D2D2D" />
      <circle cx="35" cy="33" r="1" fill="white" />
      <circle cx="47" cy="33" r="1" fill="white" />
      <path d="M36 40 Q40 44 44 40" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="32" cy="38" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.5" />
      <ellipse cx="48" cy="38" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.5" />
      {/* 망토 몸통 */}
      <path d="M20 52 Q40 48 60 52 L62 75 Q40 80 18 75 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M24 52 L20 75" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M56 52 L60 75" stroke="#2D2D2D" strokeWidth="1" />
      {/* 스파클 */}
      <path d="M62 30 L64 26 L66 30 L70 32 L66 34 L64 38 L62 34 L58 32 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M10 42 L11 39 L12 42 L15 43 L12 44 L11 47 L10 44 L7 43 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  );
}

// ── 유명인 캐릭터 SVG ────────────────────────────────────────────

function CelebJensen() {
  return (
    <svg viewBox="0 0 80 90" className="w-[120px]" fill="none">
      {/* 헤어 베이스 — 실버그레이 */}
      <path d="M24 30 Q22 18 25 11 Q30 6 40 7 Q50 6 55 11 Q58 18 56 30 Z" fill="#9CA3AF" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 정수리 진회색 */}
      <path d="M31 9 Q40 7 49 9 Q46 14 40 13 Q34 14 31 9 Z" fill="#6B7280" opacity="0.5" />
      {/* 측면 밝은 은발 하이라이트 */}
      <path d="M24 30 Q22 20 25 12" stroke="#D1D5DB" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M56 30 Q58 20 55 12" stroke="#D1D5DB" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* 결 방향선 */}
      <path d="M27 12 Q33 10 39 11" stroke="#BEC5CE" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M41 11 Q47 10 53 12" stroke="#BEC5CE" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M25 20 Q29 18 34 19" stroke="#C8CDD7" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M46 19 Q51 18 55 20" stroke="#C8CDD7" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* 얼굴 */}
      <circle cx="40" cy="37" r="15" fill="#EFBA87" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 — 굵고 수평 */}
      <path d="M26 30 Q31 28 36 30" stroke="#374151" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M44 30 Q49 28 54 30" stroke="#374151" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* 직사각 안경 */}
      <rect x="24" y="31" width="12" height="8" rx="1.5" fill="none" stroke="#1F2937" strokeWidth="1.8" />
      <rect x="44" y="31" width="12" height="8" rx="1.5" fill="none" stroke="#1F2937" strokeWidth="1.8" />
      <path d="M36 35 Q40 34 44 35" stroke="#1F2937" strokeWidth="1.3" fill="none" />
      <line x1="14" y1="34.5" x2="24" y2="34.5" stroke="#1F2937" strokeWidth="1.2" />
      <line x1="56" y1="34.5" x2="66" y2="34.5" stroke="#1F2937" strokeWidth="1.2" />
      {/* 눈 */}
      <circle cx="30" cy="35" r="2.3" fill="#2D2D2D" />
      <circle cx="50" cy="35" r="2.3" fill="#2D2D2D" />
      <circle cx="31" cy="34.2" r="0.8" fill="white" />
      <circle cx="51" cy="34.2" r="0.8" fill="white" />
      {/* 코 */}
      <path d="M38 40 Q40 43 42 40" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3" />
      {/* 볼 */}
      <ellipse cx="27" cy="41" rx="4.5" ry="2.5" fill="#FCA5A5" opacity="0.22" />
      <ellipse cx="53" cy="41" rx="4.5" ry="2.5" fill="#FCA5A5" opacity="0.22" />
      {/* 눈가 주름 */}
      <path d="M22 38 Q20 40 22 42" stroke="#C47B5A" strokeWidth="0.8" fill="none" opacity="0.28" />
      <path d="M58 38 Q60 40 58 42" stroke="#C47B5A" strokeWidth="0.8" fill="none" opacity="0.28" />
      {/* 환한 미소 */}
      <path d="M30 44 Q40 52 50 44" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M31 44 Q40 51 49 44 L49 46.5 Q40 53 31 46.5 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.6" />
      {/* 블랙 레더재킷 */}
      <rect x="21" y="52" width="38" height="30" rx="3" fill="#111827" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M40 52 L33 64 L21 59" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M40 52 L47 64 L59 59" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M33 64 L40 73 L47 64" fill="#0F172A" stroke="#374151" strokeWidth="0.8" strokeLinejoin="round" />
      <line x1="40" y1="73" x2="40" y2="82" stroke="#374151" strokeWidth="1" opacity="0.45" />
      <path d="M23 58 Q25 55 27 60" stroke="#374151" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M53 58 Q55 55 57 60" stroke="#374151" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M21 53 Q15 58 14 65" stroke="#111827" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M59 53 Q65 58 66 65" stroke="#111827" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function CelebSejong() {
  return (
    <svg viewBox="0 0 80 90" className="w-[120px]" fill="none">
      {/* 익선관 — 흑색 관모 */}
      <rect x="27" y="7" width="26" height="17" rx="3" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
      <ellipse cx="40" cy="8" rx="13" ry="3.5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 관모 날개 */}
      <path d="M27 16 Q14 14 12 21 Q14 27 27 22 Z" fill="#2D3748" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M53 16 Q66 14 68 21 Q66 27 53 22 Z" fill="#2D3748" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 금 장식선 */}
      <line x1="27" y1="21" x2="53" y2="21" stroke="#FBBF24" strokeWidth="1.5" opacity="0.8" />
      {/* 얼굴 */}
      <circle cx="40" cy="38" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 */}
      <path d="M29 33 Q34 31 38 33" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M42 33 Q46 31 51 33" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="33.5" cy="36" r="2" fill="#2D2D2D" />
      <circle cx="46.5" cy="36" r="2" fill="#2D2D2D" />
      <circle cx="34.3" cy="35.2" r="0.7" fill="white" />
      <circle cx="47.3" cy="35.2" r="0.7" fill="white" />
      {/* 코 */}
      <path d="M38.5 40 Q40 42.5 41.5 40" stroke="#2D2D2D" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.28" />
      {/* 수염 */}
      <path d="M32 46 Q36 50 40 51 Q44 50 48 46" fill="#D1D5DB" stroke="#2D2D2D" strokeWidth="0.8" />
      <path d="M30 46 Q32 50 35 51 Q40 53 45 51 Q48 50 50 46" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* 콧수염 */}
      <path d="M33 43.5 Q36.5 45.5 40 44.5 Q43.5 43.5 47 43.5" stroke="#4B5563" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 입 */}
      <path d="M36 42 Q40 44.5 44 42" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* 곤룡포 — 붉은 왕복 */}
      <rect x="18" y="52" width="44" height="32" rx="4" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M40 52 L33 61 L18 57" fill="#991B1B" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M40 52 L47 61 L62 57" fill="#991B1B" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M33 61 L40 70 L47 61" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
      {/* 용 문양 (원형 간략 표현) */}
      <circle cx="27" cy="63" r="3" fill="none" stroke="#FACC15" strokeWidth="0.8" opacity="0.6" />
      <circle cx="53" cy="66" r="3" fill="none" stroke="#FACC15" strokeWidth="0.8" opacity="0.6" />
      <circle cx="40" cy="73" r="3" fill="none" stroke="#FACC15" strokeWidth="0.8" opacity="0.6" />
      {/* 금 허리띠 */}
      <rect x="18" y="71" width="44" height="4" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.85" />
      <path d="M18 53 Q10 58 9 66" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M62 53 Q70 58 71 66" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function CelebJayLee() {
  return (
    <svg viewBox="0 0 80 90" className="w-[120px]" fill="none">
      {/* 헤어 — 짙은 단발, 사이드파트 */}
      <path d="M25 30 Q24 17 30 10 Q35 7 40 7 Q47 7 52 11 Q57 17 55 30 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M33 9 Q36 8 40 8" stroke="#374151" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M26 20 Q30 18 35 19" stroke="#374151" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M45 19 Q50 18 54 20" stroke="#374151" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="37" rx="14" ry="13" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 */}
      <path d="M28 31 Q33 29.5 37 31" stroke="#374151" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M43 31 Q47 29.5 52 31" stroke="#374151" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="32.5" cy="35" r="2.2" fill="#2D2D2D" />
      <circle cx="47.5" cy="35" r="2.2" fill="#2D2D2D" />
      <circle cx="33.3" cy="34.2" r="0.8" fill="white" />
      <circle cx="48.3" cy="34.2" r="0.8" fill="white" />
      {/* 코 */}
      <path d="M38.5 39 Q40 41.5 41.5 39" stroke="#2D2D2D" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.28" />
      {/* 볼 */}
      <ellipse cx="28" cy="40" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.18" />
      <ellipse cx="52" cy="40" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.18" />
      {/* 입 */}
      <path d="M34 43 Q40 46.5 46 43" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* 네이비 수트 */}
      <rect x="20" y="51" width="40" height="33" rx="3" fill="#1E3A5F" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M40 51 L33 63 L20 58" fill="#152D4A" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M40 51 L47 63 L60 58" fill="#152D4A" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      {/* 흰 셔츠 */}
      <path d="M33 63 L40 72 L47 63" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.8" strokeLinejoin="round" />
      {/* 블루 타이 */}
      <path d="M37 63 L40 72 L43 63 L40 60 Z" fill="#1D4ED8" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
      {/* 수트 광택 */}
      <path d="M22 57 Q24 54 26 59" stroke="#2D3F5A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M54 57 Q56 54 58 59" stroke="#2D3F5A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M20 52 Q13 57 12 65" stroke="#1E3A5F" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M60 52 Q67 57 68 65" stroke="#1E3A5F" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function CelebIU() {
  return (
    <svg viewBox="0 0 80 90" className="w-[120px]" fill="none">
      {/* 긴 머리 — 뒷면 레이어 */}
      <path d="M20 36 Q18 52 20 78 Q30 82 40 82 Q50 82 60 78 Q62 52 60 36 Q55 26 40 26 Q25 26 20 36 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 얼굴 */}
      <ellipse cx="40" cy="38" rx="14" ry="14.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 앞머리 */}
      <path d="M26 26 Q28 15 40 14 Q52 15 54 26 Q50 22 40 21 Q30 22 26 26 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M27 26 Q30 29 35 27" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M53 26 Q50 29 45 27" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1" />
      {/* 헤어 광택 */}
      <path d="M30 16 Q35 14 41 15" stroke="#374151" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* 눈썹 — 얇고 여성적 */}
      <path d="M28 30 Q33 28 37 30" stroke="#374151" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M43 30 Q47 28 52 30" stroke="#374151" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* 속눈썹 */}
      <path d="M27 33.5 Q32 31 37 32.5" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M43 32.5 Q48 31 53 33.5" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 눈 — 크고 여성적 (ellipse) */}
      <ellipse cx="32" cy="35" rx="3.5" ry="3" fill="#2D2D2D" />
      <ellipse cx="48" cy="35" rx="3.5" ry="3" fill="#2D2D2D" />
      <circle cx="33.2" cy="33.8" r="1.1" fill="white" />
      <circle cx="49.2" cy="33.8" r="1.1" fill="white" />
      {/* 아랫 속눈썹 */}
      <path d="M28.5 37 Q30 38.5 32 37.5" stroke="#1F2937" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M48 37.5 Q50 38.5 51.5 37" stroke="#1F2937" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      {/* 코 */}
      <path d="M38.5 40 Q40 42 41.5 40" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.28" />
      {/* 볼 — 뚜렷하게 */}
      <ellipse cx="26" cy="40" rx="4.5" ry="3" fill="#FCA5A5" opacity="0.38" />
      <ellipse cx="54" cy="40" rx="4.5" ry="3" fill="#FCA5A5" opacity="0.38" />
      {/* 밝은 미소 */}
      <path d="M32 44 Q40 49 48 44" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M32.5 44 Q40 48 47.5 44 L47.5 46 Q40 50 32.5 46 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.5" />
      {/* 의상 — 보라/핑크 */}
      <rect x="24" y="53" width="32" height="22" rx="4" fill="#E879F9" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M40 53 Q36 57 28 54" fill="none" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
      <path d="M40 53 Q44 57 52 54" fill="none" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
      <path d="M26 58 Q28 55 30 60" stroke="#F0ABFC" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* 마이크 */}
      <rect x="57" y="48" width="4" height="10" rx="2" fill="#9CA3AF" stroke="#2D2D2D" strokeWidth="1" />
      <ellipse cx="59" cy="46" rx="3.5" ry="4" fill="#4B5563" stroke="#2D2D2D" strokeWidth="1" />
      {/* 음표 */}
      <text x="8" y="42" fontSize="8" fill="#E879F9" opacity="0.6">♪</text>
      <text x="63" y="60" fontSize="6" fill="#E879F9" opacity="0.5">♫</text>
      {/* 긴 머리 아래 부분 */}
      <path d="M26 53 Q24 66 25 82" stroke="#1F2937" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M54 53 Q56 66 55 82" stroke="#1F2937" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── 유명인 카드 데이터 ─────────────────────────────────────────────

const CELEB_DATA: CelebCardData[] = [
  {
    emoji: "🖥️",
    nameKr: "젠슨 황",
    nameEn: "Jensen Huang",
    title: "NVIDIA CEO",
    ilju: "신묘",
    iljuKanji: "辛卯",
    domainColor: "#4ADE80",
    domainBg: "#ECFDF5",
    category: "테크 CEO",
    character: <CelebJensen />,
  },
  {
    emoji: "👑",
    nameKr: "세종대왕",
    nameEn: "世宗大王",
    title: "조선 제4대 임금",
    ilju: "갑신",
    iljuKanji: "甲申",
    domainColor: "#F59E0B",
    domainBg: "#FFFBEB",
    category: "조선 왕",
    character: <CelebSejong />,
  },
  {
    emoji: "💼",
    nameKr: "이재용",
    nameEn: "Lee Jae-yong",
    title: "삼성전자 회장",
    ilju: "갑자",
    iljuKanji: "甲子",
    domainColor: "#3B82F6",
    domainBg: "#EFF6FF",
    category: "기업인",
    character: <CelebJayLee />,
  },
  {
    emoji: "🎵",
    nameKr: "아이유",
    nameEn: "IU",
    title: "가수/배우",
    ilju: "정유",
    iljuKanji: "丁酉",
    domainColor: "#C084FC",
    domainBg: "#FAF5FF",
    category: "음악가",
    character: <CelebIU />,
  },
];

const DEMO_DATA = [
  {
    id: "갑자-m",
    character: <CharacterBuldozer />,
    bg: "#D1FAE5",
  },
  {
    id: "을묘-f",
    character: <CharacterGamseong />,
    bg: "#D1FAE5",
  },
  {
    id: "병오-m",
    character: <CharacterByungO />,
    bg: "#FEE2E2",
  },
];

export default function PreviewCardPage() {
  const items = DEMO_DATA.map((d) => ({
    ...d,
    ilju: ILJU_TYPES.find((t) => t.id === d.id)!,
  }));

  return (
    <main className="min-h-screen bg-[#F9F6F1] py-16 px-8">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-2xl font-black mb-2">사주TI 카드 디자인 시안</h1>
        <p className="text-sm text-gray-500 mb-12">
          캐릭터 일러스트 + 성격 데이터 통합 카드 — 결과 페이지, 공유 카드에 사용
        </p>

        {/* ── 신규 시안 A (원본): Setlog 피드 스타일 ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 A — Setlog 피드 스타일 (원본)</h2>
          <p className="text-sm text-gray-400 mb-6">한자 없음 · 프로필 헤더 · 포토 슬롯 · 강점 태그</p>
          <div className="flex gap-6 flex-wrap">
            {items.map(({ ilju, character, bg }) => (
              <SetlogCard key={ilju.id} ilju={ilju} character={character} characterBg={bg} />
            ))}
          </div>
        </div>

        {/* ── 신규 시안 A-1 ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 A-1</h2>
          <p className="text-sm text-gray-400 mb-6">헤더 제거 · 메인 오행 뱃지 앞으로 · 폰트 강화 (28px · 흑색)</p>
          <div className="flex gap-6 flex-wrap">
            {items.map(({ ilju, character, bg }) => (
              <SetlogCardA1 key={ilju.id} ilju={ilju} character={character} characterBg={bg} />
            ))}
          </div>
        </div>

        {/* ── 신규 시안 A-3 ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 A-3</h2>
          <p className="text-sm text-gray-400 mb-6">A-2 기반 · 캐릭터명 Black Han Sans · 본문 Noto Sans KR · 너비 조정</p>
          <div className="flex gap-6 flex-wrap">
            {items.map(({ ilju, character, bg }) => (
              <SetlogCardA3 key={ilju.id} ilju={ilju} character={character} characterBg={bg} />
            ))}
          </div>
        </div>

        {/* ── 신규 시안 A-4 ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 A-4</h2>
          <p className="text-sm text-gray-400 mb-6">A-3 기반 · 로고+브랜드명 삽입 (반투명 필 오버레이) · ilju-card-a4.tsx 분리</p>
          <div className="flex gap-6 flex-wrap">
            {items.map(({ ilju, character, bg }) => (
              <SetlogCardA4 key={ilju.id} ilju={ilju} character={character} characterBg={bg} />
            ))}
          </div>
        </div>

        {/* ── 신규 시안 A-5 ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 A-5</h2>
          <p className="text-sm text-gray-400 mb-6">A-4 기반 · 캐릭터 영역 mx-4 인셋 네모 박스 · 오행색 테두리</p>
          <div className="flex gap-6 flex-wrap">
            {items.map(({ ilju, character, bg }) => (
              <SetlogCardA5 key={ilju.id} ilju={ilju} character={character} characterBg={bg} />
            ))}
          </div>
        </div>

        {/* ── 신규 시안 B: 다크/네온 스타일 ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 B — 다크 네온 스타일</h2>
          <p className="text-sm text-gray-400 mb-6">한자 없음 · 딥 다크 배경 · 오행 네온 강조색</p>
          <div className="flex gap-6 flex-wrap">
            {items.map(({ ilju, character, bg }) => (
              <NightCard key={ilju.id} ilju={ilju} character={character} characterBg={bg} />
            ))}
          </div>
        </div>

        {/* ── 신규 시안 B-1 ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 B-1</h2>
          <p className="text-sm text-gray-400 mb-6">B 기반 · 서비스 로고 추가 · SAJU TI 16px · 인스타 공유 최적화</p>
          <div className="flex gap-6 flex-wrap">
            {items.map(({ ilju, character, bg }) => (
              <NightCardB1 key={ilju.id} ilju={ilju} character={character} characterBg={bg} />
            ))}
          </div>
        </div>

        {/* ── 신규 시안 A-4 일주 ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 A-4 일주</h2>
          <p className="text-sm text-gray-400 mb-6">A-4 기반 · 캐릭터 영역 하단 중앙에 일주(갑자 등) 크게 표시</p>
          <div className="flex gap-6 flex-wrap">
            {items.map(({ ilju, character, bg }) => (
              <SetlogCardA4Ilju key={ilju.id} ilju={ilju} character={character} characterBg={bg} />
            ))}
          </div>
        </div>

        {/* ── 신규 시안 B-1 일주 ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 B-1 일주</h2>
          <p className="text-sm text-gray-400 mb-6">B-1 기반 · 캐릭터 박스 하단에 일주 네온 글로우 표시</p>
          <div className="flex gap-6 flex-wrap">
            {items.map(({ ilju, character, bg }) => (
              <NightCardB1Ilju key={ilju.id} ilju={ilju} character={character} characterBg={bg} />
            ))}
          </div>
        </div>

        {/* ── 신규 시안 C: 팝/스티커 스타일 ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 C — 팝 스티커 스타일</h2>
          <p className="text-sm text-gray-400 mb-6">한자 없음 · 굵은 외곽선 · 원형 캐릭터 무대 · 컬러 배너</p>
          <div className="flex gap-8 flex-wrap">
            {items.map(({ ilju, character, bg }) => (
              <BubbleCard key={ilju.id} ilju={ilju} character={character} characterBg={bg} />
            ))}
          </div>
        </div>
        {/* ══════════════════════════════════════════════════════════
            유명인 카드 — "나와 같은 일주를 지닌 유명인은?"
            일주·이름·직함 강조, 4종 디자인 × 4명 = 16장
        ══════════════════════════════════════════════════════════ */}

        <div className="mt-32 border-t-4 border-dashed border-gray-200 pt-16">
          <h2 className="text-2xl font-black mb-1">유명인 카드 — 일주 후킹용</h2>
          <p className="text-sm text-gray-400 mb-2">
            "나와 같은 일주를 지닌 유명인은?" — 이름/직함/일주 강조, 오행 태그 없음
          </p>
          <p className="text-xs text-gray-300 mb-12">
            젠슨 황 신묘(辛卯) · 세종대왕 갑신(甲申) · 이재용 갑자(甲子) · 아이유 정유(丁酉)
          </p>
        </div>

        {/* ── 유명인 A-4 ── */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 A-4 유명인</h2>
          <p className="text-sm text-gray-400 mb-6">A-4 베이스 · 일주 36px 최우선 · 이름·직함 하위 계층</p>
          <div className="flex gap-6 flex-wrap">
            {CELEB_DATA.map((celeb) => (
              <CelebCardA4 key={celeb.nameKr} celeb={celeb} />
            ))}
          </div>
        </div>

        {/* ── 유명인 B ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">신규 시안 B 유명인</h2>
          <p className="text-sm text-gray-400 mb-6">B 다크 베이스 · 일주 네온 글로우 · 이름 흰색</p>
          <div className="flex gap-6 flex-wrap">
            {CELEB_DATA.map((celeb) => (
              <CelebCardB key={celeb.nameKr} celeb={celeb} />
            ))}
          </div>
        </div>

        {/* ── 자유로운 제안 1: 뮤지엄 카드 ── */}
        <div className="mt-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">자유로운 제안 1 — 인물도감 카드</h2>
          <p className="text-sm text-gray-400 mb-6">
            크림 페이퍼 · 흑색 헤더 스트립 · 일주 도장(회전) · 사선 패턴 · 박스 섀도우
          </p>
          <div className="flex gap-6 flex-wrap">
            {CELEB_DATA.map((celeb) => (
              <CelebCardMuseum key={celeb.nameKr} celeb={celeb} />
            ))}
          </div>
        </div>

        {/* ── 자유로운 제안 2: 플래티넘 홀로그램 ── */}
        <div className="mt-24 pb-24">
          <h2 className="text-lg font-bold mb-1 text-gray-700">자유로운 제안 2 — 플래티넘 홀로그램 카드</h2>
          <p className="text-sm text-gray-400 mb-6">
            플래티넘 멀티 그라데이션 · 홀로그램 무지개 스트립 · 골드 스파클 8개 · 금속 광택 원 · 골드 텍스트
          </p>
          <div className="flex gap-6 flex-wrap">
            {CELEB_DATA.map((celeb) => (
              <CelebCardPlatinum key={celeb.nameKr} celeb={celeb} />
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
