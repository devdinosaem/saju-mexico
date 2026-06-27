import React from "react";
import { getIljuType } from "@/lib/ilju-types";
import { ElementBadge, SHOW_ELEMENT_BADGE } from "./characters-shared";

// 화(火) 일주 캐릭터 — 화025~화048
// 병인, 정묘, 병자, 정축, 병술, 정해, 병신, 정유, 병오, 정미, 병진, 정사

const _FireChars: Array<{id: string; node: React.ReactNode}> = [
  {
    id: "병인-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M30 60 C30 60 24 50 24 44 A6 6 0 0 1 36 44 C36 50 30 60 30 60Z" fill="#F87171" opacity="0.12" />
            <path d="M150 140 C150 140 144 130 144 124 A6 6 0 0 1 156 124 C156 130 150 140 150 140Z" fill="#F87171" opacity="0.1" />
            <path d="M20 112 L58 112 M22 126 L50 126" stroke="#F87171" strokeWidth="2" opacity="0.1" strokeLinecap="round" />
            <path d="M158 48 L162 42 L166 48" stroke="#FACC15" strokeWidth="1.5" opacity="0.15" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
            <path d="M40 40 Q39 43 41 45" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병인-m")!.emoji + " " + getIljuType("병인-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("병인-m")!.id + " · " + getIljuType("병인-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "병인-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 폭발 불꽃 오라 */}
              <path d="M100 100 C100 100 80 75 80 62 A20 20 0 0 1 120 62 C120 75 100 100 100 100Z" fill="#F87171" opacity="0.12" />
              <path d="M100 100 C100 100 72 85 68 72 A14 14 0 0 1 96 62 C104 72 100 100 100 100Z" fill="#FACC15" opacity="0.1" />
              {/* 반짝임 스파클 */}
              <path d="M40 50 L42 56 L48 58 L42 60 L40 66 L38 60 L32 58 L38 56 Z" fill="#FACC15" opacity="0.2" />
              <path d="M155 130 L157 136 L163 138 L157 140 L155 146 L153 140 L147 138 L153 136 Z" fill="#F87171" opacity="0.15" />
              {/* 에너지 파동선 */}
              <path d="M10 100 Q55 90 100 100 Q145 110 190 100" stroke="#F87171" strokeWidth="1.5" opacity="0.08" fill="none" />
              <path d="M10 115 Q55 105 100 115 Q145 125 190 115" stroke="#FACC15" strokeWidth="1" opacity="0.06" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
              <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병인-f")!.emoji} {getIljuType("병인-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("병인-f")!.id} · {getIljuType("병인-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "정묘-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 은은한 하트들 (서서히 나타남) */}
              <path d="M30 50 C30 50 27 46 27 44 A2 2 0 0 1 30 43 A2 2 0 0 1 33 44 C33 46 30 50 30 50Z" fill="#E84B6A" opacity="0.08" />
              <path d="M170 60 C170 60 167 56 167 54 A2 2 0 0 1 170 53 A2 2 0 0 1 173 54 C173 56 170 60 170 60Z" fill="#E84B6A" opacity="0.12" />
              <path d="M160 150 C160 150 157 146 157 144 A2 2 0 0 1 160 143 A2 2 0 0 1 163 144 C163 146 160 150 160 150Z" fill="#E84B6A" opacity="0.18" />
              <path d="M40 160 C40 160 37 156 37 154 A2 2 0 0 1 40 153 A2 2 0 0 1 43 154 C43 156 40 160 40 160Z" fill="#E84B6A" opacity="0.22" />
              {/* 촛불 빛 */}
              <circle cx="100" cy="170" r="20" fill="#FACC15" opacity="0.06" />
              <circle cx="100" cy="170" r="35" fill="#FACC15" opacity="0.03" />
              {/* 스파클 */}
              <path d="M165 35 L167 41 L173 43 L167 45 L165 51 L163 45 L157 43 L163 41 Z" fill="#FACC15" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 머리카락 — 포마드 퀴프, 버건디 (남성: cap-Z) */}
              <path d="M22 28 Q20 16 24 10 Q30 5 40 5 Q50 5 56 10 Q60 16 58 28 Z" fill="#9F1239" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 얼굴 */}
              <circle cx="40" cy="36" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 앞머리 — 컬 펌 (얼굴 위) */}
              <path d="M24 26 Q27 31 31 28 Q34 31 38 28 Q42 31 46 28 Q50 31 53 28 Q56 30 56 26 Q57 20 40 19 Q24 20 24 26 Z" fill="#9F1239"/>
              {/* 눈 — 남성: 동그란 눈, 속눈썹 없음 */}
              <circle cx="34" cy="34" r="2.5" fill="#2D2D2D"/>
              <circle cx="46" cy="34" r="2.5" fill="#2D2D2D"/>
              <circle cx="34.8" cy="33.2" r="1" fill="white"/>
              <circle cx="46.8" cy="33.2" r="1" fill="white"/>
              {/* 볼터치 */}
              <ellipse cx="27" cy="40" rx="4" ry="2" fill="#E84B6A" opacity="0.55"/>
              <ellipse cx="53" cy="40" rx="4" ry="2" fill="#E84B6A" opacity="0.55"/>
              {/* 입 — 여유있는 미소 */}
              <path d="M36 43 Q40 47 44 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              {/* 몸통 — 남성, 넓은 어깨 */}
              <rect x="22" y="52" width="36" height="24" rx="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 소매 */}
              <rect x="12" y="54" width="12" height="14" rx="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
              <rect x="56" y="54" width="12" height="14" rx="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 다리 */}
              <rect x="26" y="76" width="10" height="12" rx="2" fill="#7F1D1D" stroke="#2D2D2D" strokeWidth="1.5"/>
              <rect x="44" y="76" width="10" height="12" rx="2" fill="#7F1D1D" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 촛불 소품 */}
              <rect x="61" y="62" width="4" height="12" rx="1" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1"/>
              <path d="M63 62 C61 59 60 56 63 54 C66 56 65 59 63 62 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8"/>
              {/* 떠다니는 하트들 */}
              <path d="M8 45 C8 45 6.5 43.5 6.5 42.5 A1.5 1.5 0 0 1 8 42 A1.5 1.5 0 0 1 9.5 42.5 C9.5 43.5 8 45 8 45Z" fill="#E84B6A" opacity="0.4"/>
              <path d="M73 35 C73 35 72 34 72 33 A1 1 0 0 1 73 32.5 A1 1 0 0 1 74 33 C74 34 73 35 73 35Z" fill="#E84B6A" opacity="0.3"/>
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정묘-m")!.emoji} {getIljuType("정묘-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("정묘-m")!.id} · {getIljuType("정묘-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "정묘-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 달 */}
              <circle cx="170" cy="30" r="22" fill="#FEF9C3" opacity="0.18" />
              <circle cx="178" cy="26" r="16" fill="#FEE2E2" opacity="0.18" />
              {/* 별 */}
              <circle cx="30" cy="40" r="3" fill="#FACC15" opacity="0.13" />
              <circle cx="60" cy="20" r="2" fill="#FACC15" opacity="0.13" />
              <circle cx="140" cy="60" r="2.5" fill="#FACC15" opacity="0.13" />
              {/* 책 라인들 */}
              <rect x="20" y="130" width="50" height="35" rx="4" fill="#F87171" opacity="0.08" />
              <line x1="26" y1="142" x2="64" y2="142" stroke="#F87171" strokeWidth="1" opacity="0.12" />
              <line x1="26" y1="150" x2="64" y2="150" stroke="#F87171" strokeWidth="1" opacity="0.12" />
              {/* 집중 파문 */}
              <circle cx="100" cy="100" r="40" fill="none" stroke="#F87171" strokeWidth="1" opacity="0.08" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="#F87171" strokeWidth="1" opacity="0.05" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 달 머리장식 — 먼저 */}
              <path d="M36 8 Q32 2 36 0 Q44 2 42 10 Q38 8 36 8Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.2" />
              <circle cx="38" cy="5" r="1.2" fill="#2D2D2D" />
              {/* 헤어 — 장발 스트레이트, 검정 (닫힌 Z) */}
              <path d="M18 30 Q18 10 40 8 Q62 10 62 30 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="34" rx="15" ry="14" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정묘-f")!.emoji} {getIljuType("정묘-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("정묘-f")!.id} · {getIljuType("정묘-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "병자-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M40 60 C40 60 33 48 33 41 A7 7 0 0 1 47 41 C47 48 40 60 40 60Z" fill="#FB923C" opacity="0.13" />
            <path d="M160 150 C160 150 154 140 154 134 A6 6 0 0 1 166 134 C166 140 160 150 160 150Z" fill="#FB923C" opacity="0.1" />
            {/* 회복 화살표 (원형) */}
            <path d="M150 50 A18 18 0 1 1 138 44" stroke="#FB923C" strokeWidth="2" opacity="0.13" fill="none" strokeLinecap="round" />
            <path d="M138 44 L136 50 L143 49" stroke="#FB923C" strokeWidth="2" opacity="0.13" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 150 L30 156 L36 158 L30 160 L28 166 L26 160 L20 158 L26 156 Z" fill="#FACC15" opacity="0.13" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병자-m")!.emoji + " " + getIljuType("병자-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("병자-m")!.id + " · " + getIljuType("병자-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "병자-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 불꽃들 */}
              <path d="M30 50 C30 50 26 42 26 38 A4 4 0 0 1 34 38 C34 42 30 50 30 50Z" fill="#F87171" opacity="0.12" />
              <path d="M170 45 C170 45 167 39 167 36 A3 3 0 0 1 173 36 C173 39 170 45 170 45Z" fill="#F87171" opacity="0.1" />
              <path d="M160 155 C160 155 157 149 157 146 A3 3 0 0 1 163 146 C163 149 160 155 160 155Z" fill="#FACC15" opacity="0.1" />
              {/* 메모 조각 */}
              <rect x="25" y="140" width="12" height="16" rx="1" stroke="#F87171" strokeWidth="0.8" opacity="0.1" fill="none" transform="rotate(-10 31 148)" />
              <rect x="165" y="130" width="10" height="14" rx="1" stroke="#F87171" strokeWidth="0.8" opacity="0.08" fill="none" transform="rotate(15 170 137)" />
              {/* 느낌표 */}
              <text x="40" y="165" fill="#F87171" opacity="0.12" fontSize="16" fontWeight="bold">{"!"}</text>
              <text x="155" y="170" fill="#F87171" opacity="0.1" fontSize="12" fontWeight="bold">{"!"}</text>
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병자-f")!.emoji} {getIljuType("병자-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("병자-f")!.id} · {getIljuType("병자-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "정축-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 촛불 흔들림 */}
              <path d="M50 150 C50 150 44 140 44 134 A6 6 0 0 1 56 134 C56 140 50 150 50 150Z" fill="#F87171" opacity="0.1" />
              <rect x="47" y="150" width="6" height="14" rx="1" fill="#FDE68A" opacity="0.1" />
              {/* 스크랩 메모 */}
              <rect x="130" y="30" width="40" height="28" rx="3" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" opacity="0.12" />
              <line x1="134" y1="40" x2="166" y2="40" stroke="#F87171" strokeWidth="0.8" opacity="0.12" />
              <line x1="134" y1="46" x2="160" y2="46" stroke="#F87171" strokeWidth="0.8" opacity="0.12" />
              {/* 하트 흔적 */}
              <path d="M160 150 C160 150 155 144 155 141 A5 5 0 0 1 165 141 C165 144 160 150 160 150Z" fill="#F87171" opacity="0.08" />
              <path d="M170 100 C166 96 160 96 160 101 C160 96 154 96 150 100 C146 110 160 118 160 118 C160 118 174 110 170 100Z" fill="#F87171" opacity="0.08" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정축-m")!.emoji} {getIljuType("정축-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("정축-m")!.id} · {getIljuType("정축-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "정축-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 따뜻한 빛 오라 원형 */}
              <circle cx="100" cy="90" r="50" stroke="#F87171" strokeWidth="1" opacity="0.08" fill="none" />
              <circle cx="100" cy="90" r="35" stroke="#FACC15" strokeWidth="0.8" opacity="0.06" fill="none" />
              {/* 하트들 */}
              <path d="M40 60 C37.6 57.2 34 57.2 34 60.5 C34 57.2 30.4 57.2 28 60 C25.6 63.6 34 70 34 70 C34 70 42.4 63.6 40 60Z" fill="#F87171" opacity="0.12" />
              <path d="M165 130 C163.2 127.8 160 127.8 160 130.5 C160 127.8 156.8 127.8 155 130 C153.2 132.8 160 138 160 138 C160 138 166.8 132.8 165 130Z" fill="#F87171" opacity="0.1" />
              {/* 커피 향기 선 */}
              <path d="M155 60 Q158 55 155 50 Q152 45 155 40" stroke="#F87171" strokeWidth="1" opacity="0.1" fill="none" strokeLinecap="round" />
              <path d="M165 60 Q168 55 165 50 Q162 45 165 40" stroke="#FACC15" strokeWidth="1" opacity="0.1" fill="none" strokeLinecap="round" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정축-f")!.emoji} {getIljuType("정축-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("정축-f")!.id} · {getIljuType("정축-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "병술-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M160 40 Q160 30 168 30 Q176 30 176 40 Q176 50 168 58 Q160 50 160 40Z" fill="#F87171" opacity="0.13" />
            <path d="M28 150 Q28 142 34 142 Q40 142 40 150 Q40 158 34 164 Q28 158 28 150Z" fill="#F87171" opacity="0.1" />
            <path d="M150 150 L153 156 L159 158 L153 160 L150 166 L147 160 L141 158 L147 156 Z" fill="#FACC15" opacity="0.13" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
            <path d="M40 39 Q39 42 41 44" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병술-m")!.emoji + " " + getIljuType("병술-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("병술-m")!.id + " · " + getIljuType("병술-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "병술-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M100 10 C100 10 70 40 70 60 A30 30 0 0 0 130 60 C130 40 100 10 100 10Z" fill="#F87171" opacity="0.1" />
              <circle cx="30" cy="130" r="20" fill="#FACC15" opacity="0.1" />
              <path d="M155 40 L159 28 L163 40 L175 40 L165 47 L169 59 L159 52 L149 59 L153 47 L143 40 Z" fill="#F87171" opacity="0.12" />
              <path d="M140 160 Q155 148 170 160" stroke="#FACC15" strokeWidth="1.5" opacity="0.1" fill="none" strokeLinecap="round" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병술-f")!.emoji} {getIljuType("병술-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("병술-f")!.id} · {getIljuType("병술-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "정해-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <circle cx="155" cy="55" r="16" stroke="#C084FC" strokeWidth="1.2" opacity="0.12" fill="none" />
            <circle cx="155" cy="55" r="9" fill="#C084FC" opacity="0.07" />
            <path d="M30 150 L32 156 L38 158 L32 160 L30 166 L28 160 L22 158 L28 156 Z" fill="#C084FC" opacity="0.12" />
            <path d="M40 56 C40 56 36 50 36 47 A4 4 0 0 1 44 47 C44 50 40 56 40 56Z" fill="#F87171" opacity="0.1" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
            <path d="M40 39 Q39 42 41 44" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정해-m")!.emoji + " " + getIljuType("정해-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("정해-m")!.id + " · " + getIljuType("정해-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "정해-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 촛불 */}
              <path d="M95 170 L95 150 L105 150 L105 170" stroke="#FBBF24" strokeWidth="1" fill="#FDE68A" opacity="0.15" />
              <path d="M100 150 C100 150 96 142 96 138 A4 4 0 0 1 104 138 C104 142 100 150 100 150Z" fill="#F87171" opacity="0.12" />
              {/* 물결 — 감지선 */}
              <path d="M20 80 Q40 75 60 80 Q80 85 100 80" stroke="#F87171" strokeWidth="1" opacity="0.08" fill="none" />
              <path d="M100 120 Q120 115 140 120 Q160 125 180 120" stroke="#F87171" strokeWidth="1" opacity="0.08" fill="none" />
              {/* 눈 아이콘 (관찰) */}
              <ellipse cx="170" cy="50" rx="10" ry="6" stroke="#F87171" strokeWidth="1" opacity="0.12" fill="none" />
              <circle cx="170" cy="50" r="3" fill="#F87171" opacity="0.1" />
              {/* 스파클 */}
              <path d="M30 40 L31.5 44 L35.5 45.5 L31.5 47 L30 51 L28.5 47 L24.5 45.5 L28.5 44 Z" fill="#FACC15" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정해-f")!.emoji} {getIljuType("정해-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("정해-f")!.id} · {getIljuType("정해-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "병신-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <circle cx="155" cy="55" r="14" stroke="#94A3B8" strokeWidth="1.5" opacity="0.12" fill="none" />
            <rect x="151" y="40" width="8" height="6" rx="1" fill="#94A3B8" opacity="0.1" />
            <path d="M30 150 L34 144 L40 150 L36 154 L40 160 L34 156 L28 160 L32 154 Z" fill="#FACC15" opacity="0.13" />
            <path d="M18 60 L40 60 M20 72 L36 72 M22 84 L34 84" stroke="#F87171" strokeWidth="2" opacity="0.1" strokeLinecap="round" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병신-m")!.emoji + " " + getIljuType("병신-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("병신-m")!.id + " · " + getIljuType("병신-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "병신-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 번개 */}
              <path d="M35 30 L30 50 L38 48 L32 70" stroke="#FACC15" strokeWidth="2" opacity="0.12" fill="none" strokeLinejoin="round" />
              <path d="M170 40 L167 52 L172 50 L168 65" stroke="#FACC15" strokeWidth="1.5" opacity="0.1" fill="none" strokeLinejoin="round" />
              {/* 체크 표시 */}
              <path d="M160 145 L164 151 L172 141" stroke="#4ADE80" strokeWidth="1.5" opacity="0.12" fill="none" strokeLinecap="round" />
              <path d="M25 155 L28 159 L34 151" stroke="#4ADE80" strokeWidth="1" opacity="0.08" fill="none" strokeLinecap="round" />
              {/* 느낌표 */}
              <rect x="30" y="40" width="2.5" height="10" rx="1" fill="#F87171" opacity="0.12" />
              <circle cx="31.25" cy="54" r="1.2" fill="#F87171" opacity="0.12" />
              {/* 스파클 */}
              <path d="M170 130 L172 136 L178 138 L172 140 L170 146 L168 140 L162 138 L168 136 Z" fill="#FACC15" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병신-f")!.emoji} {getIljuType("병신-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("병신-f")!.id} · {getIljuType("병신-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "정유-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 레이더 동심원 */}
              <circle cx="100" cy="100" r="35" stroke="#F87171" strokeWidth="1" opacity="0.07" />
              <circle cx="100" cy="100" r="60" stroke="#F87171" strokeWidth="1" opacity="0.055" />
              <circle cx="100" cy="100" r="88" stroke="#F87171" strokeWidth="1" opacity="0.04" />
              {/* 감지 파티클 */}
              <circle cx="38" cy="55" r="2" fill="#F87171" opacity="0.12" />
              <circle cx="162" cy="72" r="1.5" fill="#F87171" opacity="0.1" />
              <circle cx="170" cy="148" r="2" fill="#FACC15" opacity="0.13" />
              <circle cx="28" cy="158" r="1.5" fill="#F87171" opacity="0.09" />
              <circle cx="155" cy="38" r="1.2" fill="#F87171" opacity="0.11" />
              {/* 스파클 */}
              <path d="M163 42 L165 48 L171 50 L165 52 L163 58 L161 52 L155 50 L161 48 Z" fill="#FACC15" opacity="0.16" />
              <path d="M24 88 L25.5 92 L29.5 93.5 L25.5 95 L24 99 L22.5 95 L18.5 93.5 L22.5 92 Z" fill="#F87171" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
              {/* 콧대 */}
              <path d="M40 40 Q39 43 41 44" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정유-m")!.emoji} {getIljuType("정유-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("정유-m")!.id} · {getIljuType("정유-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "정유-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 수식 배경 */}
              <text x="24" y="52" fontSize="9" fill="#F87171" opacity="0.12">{"=SUM"}</text>
              <text x="152" y="165" fontSize="8" fill="#F87171" opacity="0.1">{"∑"}</text>
              {/* 스파클 */}
              <path d="M30 50 L32 56 L38 58 L32 60 L30 66 L28 60 L22 58 L28 56 Z" fill="#FACC15" opacity="0.2" />
              <path d="M165 40 L167 46 L173 48 L167 50 L165 56 L163 50 L157 48 L163 46 Z" fill="#FACC15" opacity="0.18" />
              <circle cx="158" cy="150" r="3" fill="#FACC15" opacity="0.2" />
              <circle cx="35" cy="155" r="2.5" fill="#FACC15" opacity="0.15" />
              {/* 스프레드시트 격자 배경 */}
              <rect x="130" y="130" width="14" height="10" fill="none" stroke="#4ADE80" strokeWidth="0.6" opacity="0.1" />
              <rect x="144" y="130" width="14" height="10" fill="none" stroke="#4ADE80" strokeWidth="0.6" opacity="0.1" />
              <rect x="130" y="140" width="14" height="10" fill="none" stroke="#4ADE80" strokeWidth="0.6" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 날개 — 얼굴보다 먼저 */}
              <path d="M28 46 Q6 28 12 12 Q22 20 30 40 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.2" opacity="0.85" />
              <path d="M28 52 Q4 58 8 70 Q18 66 30 56 Z" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.2" opacity="0.8" />
              <path d="M52 46 Q74 28 68 12 Q58 20 50 40 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.2" opacity="0.85" />
              <path d="M52 52 Q76 58 72 70 Q62 66 50 56 Z" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.2" opacity="0.8" />
              {/* 날개 맥락선 */}
              <path d="M28 46 Q18 36 18 20" stroke="#FBBF24" strokeWidth="0.7" fill="none" opacity="0.4" />
              <path d="M52 46 Q62 36 62 20" stroke="#FBBF24" strokeWidth="0.7" fill="none" opacity="0.4" />
              {/* 머리카락 */}
              <path d="M22 32 Q20 14 40 10 Q60 14 58 32" fill="#2D2D2D" />
              {/* 별 머리핀 */}
              <path d="M54 12 L55.5 16.5 L60 18 L55.5 19.5 L54 24 L52.5 19.5 L48 18 L52.5 16.5 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="38" rx="15" ry="16" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.8" />
              {/* 눈 — 반짝이는 요정 눈 */}
              <circle cx="34" cy="36" r="3.5" fill="#2D2D2D" />
              <circle cx="46" cy="36" r="3.5" fill="#2D2D2D" />
              <circle cx="35.5" cy="34.5" r="1.5" fill="white" />
              <circle cx="47.5" cy="34.5" r="1.5" fill="white" />
              <circle cx="35" cy="34" r="0.6" fill="white" />
              <circle cx="47" cy="34" r="0.6" fill="white" />
              {/* 눈썹 */}
              <path d="M30 31 Q34 28 38 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M42 31 Q46 28 50 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 입 */}
              <path d="M35 43 Q40 48 45 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 볼터치 */}
              <ellipse cx="28" cy="40" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.6" />
              <ellipse cx="52" cy="40" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.6" />
              {/* 몸통 — 초록 요정 드레스 */}
              <path d="M30 54 Q26 60 24 74 L56 74 Q54 60 50 54Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 드레스 별 장식 */}
              <path d="M37 60 L38 63 L41 64 L38 65 L37 68 L36 65 L33 64 L36 63 Z" fill="#FACC15" opacity="0.7" />
              {/* 지팡이 — 오른손 */}
              <line x1="50" y1="58" x2="68" y2="38" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
              <path d="M68 38 L70 32 L72 38 L78 38 L73 41 L75 47 L70 43 L65 47 L67 41 L62 38 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
              {/* 지팡이 스파클 + 수식 */}
              <path d="M74 32 L76 28" stroke="#FACC15" strokeWidth="1" opacity="0.7" strokeLinecap="round" />
              <path d="M78 34 L80 30" stroke="#FACC15" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
              <text x="68" y="26" fontSize="4" fill="#4ADE80" fontWeight="bold" opacity="0.8">{"=SUM"}</text>
              {/* 왼팔 + 스파클 */}
              <path d="M30 56 L14 48" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M8 42 L9.5 46 L14 47.5 L9.5 49 L8 53 L6.5 49 L2 47.5 L6.5 46 Z" fill="#FACC15" opacity="0.5" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정유-f")!.emoji} {getIljuType("정유-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("정유-f")!.id} · {getIljuType("정유-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "병오-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M100 0 L55 110 L145 110 Z" fill="#FACC15" opacity="0.05" />
            <line x1="100" y1="8" x2="100" y2="52" stroke="#FACC15" strokeWidth="2" opacity="0.13" />
            <line x1="68" y1="18" x2="82" y2="58" stroke="#FACC15" strokeWidth="1.5" opacity="0.1" />
            <line x1="132" y1="18" x2="118" y2="58" stroke="#FACC15" strokeWidth="1.5" opacity="0.1" />
            <path d="M28 42 L30 48 L36 50 L30 52 L28 58 L26 52 L20 50 L26 48 Z" fill="#FACC15" opacity="0.18" />
            <path d="M168 130 L169.5 134 L173.5 135.5 L169.5 137 L168 141 L166.5 137 L162.5 135.5 L166.5 134 Z" fill="#FACC15" opacity="0.14" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병오-m")!.emoji + " " + getIljuType("병오-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("병오-m")!.id + " · " + getIljuType("병오-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "병오-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 스포트라이트 */}
              <path d="M100 0 L65 130 L135 130 Z" fill="#FACC15" opacity="0.05" />
              {/* 스파클 */}
              <path d="M30 40 L33 49 L42 52 L33 55 L30 64 L27 55 L18 52 L27 49 Z" fill="#FACC15" opacity="0.18" />
              <path d="M165 35 L167 41 L173 43 L167 45 L165 51 L163 45 L157 43 L163 41 Z" fill="#FACC15" opacity="0.18" />
              {/* 하트 */}
              <path d="M170 100 C170 100 167 96 167 94 A2 2 0 0 1 170 93 A2 2 0 0 1 173 94 C173 96 170 100 170 100Z" fill="#E84B6A" opacity="0.2" />
              <path d="M25 130 C25 130 23 127 23 125.5 A1.5 1.5 0 0 1 25 124.5 A1.5 1.5 0 0 1 27 125.5 C27 127 25 130 25 130Z" fill="#E84B6A" opacity="0.15" />
              {/* 음표 */}
              <path d="M160 155 L160 147 L167 145 L167 153" stroke="#F87171" strokeWidth="1" fill="none" opacity="0.12" />
              <circle cx="158" cy="156" r="2" fill="#F87171" opacity="0.12" />
              <circle cx="165" cy="154" r="2" fill="#F87171" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 왕관 */}
              <rect x="26" y="14" width="28" height="5" rx="2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2" />
              <path d="M26 14 L30 4 L35 12 L40 2 L45 12 L50 4 L54 14" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
              <circle cx="35" cy="10" r="1.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.8" />
              <circle cx="40" cy="4" r="2" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
              <circle cx="45" cy="10" r="1.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.8" />
              {/* 머리카락 — 풍성한 단발 */}
              <path d="M22 34 Q20 16 40 14 Q60 16 58 34 Q56 46 58 50 Q54 54 40 54 Q26 54 22 50 Q24 46 22 34Z" fill="#2D2D2D" />
              <path d="M26 20 Q30 26 34 22" stroke="#1a1a1a" strokeWidth="1" fill="none" />
              <path d="M54 20 Q50 26 46 22" stroke="#1a1a1a" strokeWidth="1" fill="none" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="36" rx="15" ry="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 눈썹 — 들뜬 */}
              <path d="M29 28 Q33 25 37 28" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M43 28 Q47 25 51 28" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* 눈 — 해맑은 큰 눈 */}
              <circle cx="34" cy="34" r="3.5" fill="#2D2D2D" />
              <circle cx="46" cy="34" r="3.5" fill="#2D2D2D" />
              <circle cx="35.5" cy="32.5" r="1.5" fill="white" />
              <circle cx="47.5" cy="32.5" r="1.5" fill="white" />
              {/* 입 — 노래하듯 환한 미소 */}
              <path d="M32 43 Q40 50 48 43" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* 볼터치 */}
              <ellipse cx="26" cy="38" rx="4" ry="2.5" fill="#FB923C" opacity="0.5" />
              <ellipse cx="54" cy="38" rx="4" ry="2.5" fill="#FB923C" opacity="0.5" />
              {/* 몸통 — 핑크 드레스 */}
              <path d="M26 54 Q22 58 20 74 L60 74 Q58 58 54 54Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.8" />
              {/* 드레스 허리 띠 */}
              <path d="M24 62 Q40 64 56 62" stroke="#EC4899" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
              {/* 드레스 결 */}
              <path d="M32 56 Q30 64 28 72" stroke="#F472B6" strokeWidth="0.8" opacity="0.3" fill="none" />
              <path d="M48 56 Q50 64 52 72" stroke="#F472B6" strokeWidth="0.8" opacity="0.3" fill="none" />
              {/* 마이크 — 오른손 높이 들어올림 */}
              <path d="M54 56 L66 40" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="68" cy="37" rx="5" ry="7" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
              <ellipse cx="68" cy="34" rx="3.5" ry="2.5" fill="#64748B" opacity="0.5" />
              {/* 음파 */}
              <path d="M74 35 Q78 39 74 43" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.8" />
              <path d="M77 31 Q82 38 77 45" stroke="#FACC15" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
              {/* 왼팔 — 위로 흔들기 */}
              <path d="M26 56 L12 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M12 44 L8 38" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
              {/* 스파클 — 왼손 */}
              <path d="M4 28 L5.5 32.5 L10 34 L5.5 35.5 L4 40 L2.5 35.5 L-2 34 L2.5 32.5 Z" fill="#FACC15" opacity="0.55" />
              {/* 하트 — 주변 */}
              <path d="M62 22 C62 22 60 19 60 17.5 A1.5 1.5 0 0 1 62 16.5 A1.5 1.5 0 0 1 64 17.5 C64 19 62 22 62 22Z" fill="#E84B6A" opacity="0.6" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병오-f")!.emoji} {getIljuType("병오-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("병오-f")!.id} · {getIljuType("병오-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "정미-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M152 46 Q154 40 156 46 M160 44 Q162 38 164 44" stroke="#C8956B" strokeWidth="1.5" opacity="0.13" fill="none" strokeLinecap="round" />
            <path d="M30 150 Q30 144 36 144 Q42 144 42 150 Q42 156 36 162 Q30 156 30 150Z" fill="#FB923C" opacity="0.1" />
            <path d="M165 140 L166.5 144 L170.5 145.5 L166.5 147 L165 151 L163.5 147 L159.5 145.5 L163.5 144 Z" fill="#FACC15" opacity="0.13" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
            <path d="M40 39 Q39 42 41 44" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
            {/* 왼팔 → 잔소리 검지 */}
            <path d="M24 60 Q18 58 15 55" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="13" cy="53" r="3.2" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
            <path d="M13 50 L13 45" stroke="#FDDCB5" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M13 50 L13 45" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
          </svg>
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정미-m")!.emoji + " " + getIljuType("정미-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("정미-m")!.id + " · " + getIljuType("정미-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "정미-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="100" cy="100" r="60" stroke="#F87171" strokeWidth="1" opacity="0.15" fill="none" />
              <circle cx="100" cy="100" r="40" stroke="#F87171" strokeWidth="1" opacity="0.12" fill="none" />
              <circle cx="100" cy="100" r="20" stroke="#F87171" strokeWidth="1" opacity="0.1" fill="none" />
              <path d="M100 100 L150 60" stroke="#F87171" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
              <circle cx="150" cy="60" r="4" fill="#F87171" opacity="0.2" />
              <path d="M160 140 L165 130 L168 140 L178 140 L170 146 L173 156 L165 150 L157 156 L160 146 L152 140 Z" fill="#FBBF24" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정미-f")!.emoji} {getIljuType("정미-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("정미-f")!.id} · {getIljuType("정미-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "병진-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M30 50 L32 56 L38 58 L32 60 L30 66 L28 60 L22 58 L28 56 Z" fill="#FACC15" opacity="0.15" />
            <path d="M160 130 L162 136 L168 138 L162 140 L160 146 L158 140 L152 138 L158 136 Z" fill="#FACC15" opacity="0.13" />
            <path d="M150 40 Q160 30 170 40 Q160 50 150 40Z" fill="#C084FC" opacity="0.1" />
            <circle cx="40" cy="150" r="3" fill="#F87171" opacity="0.12" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
            <path d="M40 39 Q39 42 41 44" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병진-m")!.emoji + " " + getIljuType("병진-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("병진-m")!.id + " · " + getIljuType("병진-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "병진-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 꽃들 — 배경 */}
              <circle cx="40" cy="50" r="10" fill="#F9A8D4" opacity="0.2" />
              <circle cx="40" cy="40" r="6" fill="#F9A8D4" opacity="0.15" />
              <circle cx="30" cy="50" r="6" fill="#FBBF24" opacity="0.15" />
              <circle cx="50" cy="50" r="6" fill="#FB923C" opacity="0.15" />
              <circle cx="40" cy="60" r="6" fill="#F87171" opacity="0.15" />
              <circle cx="40" cy="50" r="4" fill="#FACC15" opacity="0.25" />
              <circle cx="160" cy="100" r="12" fill="#F9A8D4" opacity="0.18" />
              <circle cx="160" cy="88" r="8" fill="#FBBF24" opacity="0.14" />
              <circle cx="150" cy="100" r="8" fill="#FB923C" opacity="0.14" />
              <circle cx="170" cy="100" r="8" fill="#F87171" opacity="0.14" />
              <circle cx="160" cy="112" r="8" fill="#F9A8D4" opacity="0.14" />
              <circle cx="160" cy="100" r="5" fill="#FACC15" opacity="0.2" />
              <circle cx="90" cy="160" r="8" fill="#F9A8D4" opacity="0.18" />
              <circle cx="82" cy="160" r="5" fill="#FBBF24" opacity="0.12" />
              <circle cx="98" cy="160" r="5" fill="#F87171" opacity="0.12" />
              <circle cx="90" cy="152" r="5" fill="#FB923C" opacity="0.12" />
              <circle cx="90" cy="160" r="3" fill="#FACC15" opacity="0.2" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("병진-f")!.emoji} {getIljuType("병진-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("병진-f")!.id} · {getIljuType("병진-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "정사-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M80 100 C80 100 68 116 68 124 A16 16 0 0 0 92 124 C92 116 80 100 80 100Z" fill="#F87171" opacity="0.1" />
              <path d="M130 60 C130 60 118 76 118 84 A16 16 0 0 0 142 84 C142 76 130 60 130 60Z" fill="#FBBF24" opacity="0.1" />
              <circle cx="100" cy="100" r="40" stroke="#F87171" strokeWidth="1" opacity="0.08" fill="none" strokeDasharray="4 4" />
              <path d="M40 50 L48 40 L48 60 Z" fill="#F87171" opacity="0.12" />
              <path d="M155 155 L158 145 L161 155 L171 155 L163 161 L166 171 L158 165 L150 171 L153 161 L145 155 Z" fill="#F87171" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
              {/* 콧대 */}
              <path d="M40 35 Q39 38 41 39.5" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45"/>
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
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정사-m")!.emoji} {getIljuType("정사-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("정사-m")!.id} · {getIljuType("정사-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "정사-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEE2E2] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M70 80 C70 80 60 96 60 104 A14 14 0 0 0 80 104 C80 96 70 80 70 80Z" fill="#F87171" opacity="0.15" />
              <path d="M130 80 C130 80 120 96 120 104 A14 14 0 0 0 140 104 C140 96 130 80 130 80Z" fill="#FACC15" opacity="0.15" />
              <path d="M155 50 L158 40 L161 50 L171 50 L163 56 L166 66 L158 60 L150 66 L153 56 L145 50 Z" fill="#F87171" opacity="0.12" />
              <path d="M40 140 L43 130 L46 140 L56 140 L48 146 L51 156 L43 150 L35 156 L38 146 L30 140 Z" fill="#FBBF24" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="fire" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("정사-f")!.emoji} {getIljuType("정사-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("정사-f")!.id} · {getIljuType("정사-f")!.stemElement}</p>
        </div>
    ),
  },
];

export const FIRE_CHARACTER_MAP: Record<string, React.ReactNode> =
  Object.fromEntries(_FireChars.map(e => [e.id, e.node]));

export function FireCharacters() {
  return (
    <>
      {_FireChars.map(e => (
        <div key={e.id} id={`card-${e.id}`} data-gender={e.id.endsWith("-f") ? "female" : "male"} className="ilju-card scroll-mt-24">{e.node}</div>
      ))}
    </>
  );
}