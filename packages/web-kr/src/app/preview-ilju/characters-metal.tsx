import React from "react";
import { getIljuType } from "@/lib/ilju-types";
import { ElementBadge, SHOW_ELEMENT_BADGE } from "./characters-shared";

// 금(金) 일주 캐릭터 — 금073~금096
// 경인, 신묘, 경자, 신축, 경술, 신해, 경신, 신유, 경오, 신미, 경진, 신사

const _MetalChars: Array<{id: string; node: React.ReactNode}> = [
  {
    id: "경인-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 불꽃 이펙트 */}
              <path d="M30 50 C30 50 26 42 26 38 A4 4 0 0 1 34 38 C34 42 30 50 30 50Z" fill="#F87171" opacity="0.1" />
              <path d="M170 50 C170 50 167 43 167 40 A3 3 0 0 1 173 40 C173 43 170 50 170 50Z" fill="#F87171" opacity="0.08" />
              {/* 별 */}
              <path d="M165 140 L167 146 L173 148 L167 150 L165 156 L163 150 L157 148 L163 146 Z" fill="#FACC15" opacity="0.18" />
              <path d="M30 150 L31.5 154 L35.5 155.5 L31.5 157 L30 161 L28.5 157 L24.5 155.5 L28.5 154 Z" fill="#FACC15" opacity="0.12" />
              {/* 권투 링 줄 */}
              <line x1="20" y1="120" x2="80" y2="120" stroke="#94A3B8" strokeWidth="1" opacity="0.08" />
              <line x1="20" y1="130" x2="80" y2="130" stroke="#94A3B8" strokeWidth="0.8" opacity="0.06" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경인-m")!.emoji} {getIljuType("경인-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경인-m")!.id} · {getIljuType("경인-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "경인-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 트로피 그림자 */}
              <path d="M85 130 L85 170 L115 170 L115 130 Q115 110 100 110 Q85 110 85 130Z" fill="#FACC15" opacity="0.08" />
              {/* 1등 리본 */}
              <circle cx="160" cy="50" r="14" fill="#FACC15" opacity="0.12" />
              <text x="155" y="55" fontSize="10" fill="#2D2D2D" opacity="0.2" fontWeight="bold">{"1st"}</text>
              {/* 스파클 */}
              <path d="M30 60 L32 66 L38 68 L32 70 L30 76 L28 70 L22 68 L28 66 Z" fill="#94A3B8" opacity="0.15" />
              {/* 경쟁 화살표 */}
              <path d="M20 100 L55 100 L50 95 M55 100 L50 105" stroke="#94A3B8" strokeWidth="1.5" opacity="0.12" strokeLinecap="round" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경인-f")!.emoji} {getIljuType("경인-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경인-f")!.id} · {getIljuType("경인-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "신묘-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M30 100 L100 30 L170 100" stroke="#94A3B8" strokeWidth="1" opacity="0.1" fill="none" />
              <path d="M50 160 L100 110 L150 160" stroke="#94A3B8" strokeWidth="1" opacity="0.08" fill="none" />
              <path d="M10 60 L20 30 L40 60 Z" fill="#E2E8F0" opacity="0.12" />
              <circle cx="160" cy="160" r="18" fill="#E2E8F0" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신묘-m")!.emoji} {getIljuType("신묘-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("신묘-m")!.id} · {getIljuType("신묘-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "신묘-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <rect x="20" y="40" width="60" height="8" rx="4" fill="#94A3B8" opacity="0.1" />
              <rect x="20" y="54" width="50" height="8" rx="4" fill="#94A3B8" opacity="0.08" />
              <rect x="20" y="68" width="40" height="8" rx="4" fill="#94A3B8" opacity="0.06" />
              <path d="M140 140 L160 120 L180 140 L180 180 L140 180 Z" fill="#E2E8F0" opacity="0.1" />
              <path d="M150 50 L154 38 L158 50 L170 50 L160 57 L164 69 L154 62 L144 69 L148 57 L138 50 Z" fill="#94A3B8" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 헤어 — 웨이브 펌 단발, 금발 (closed Z) */}
              <path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 38 60 44 Q54 50 62 54 Q66 60 58 64 Q50 68 44 65 Q40 63 36 65 Q30 68 22 64 Q14 60 18 54 Q26 50 20 44 Q14 38 18 30 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
              <path d="M22 36 Q26 33 30 36" stroke="#EAB308" strokeWidth="0.9" fill="none" opacity="0.5" />
              <path d="M50 36 Q54 33 58 36" stroke="#EAB308" strokeWidth="0.9" fill="none" opacity="0.5" />
              <path d="M21 50 Q25 47 29 50" stroke="#EAB308" strokeWidth="0.9" fill="none" opacity="0.45" />
              <path d="M51 50 Q55 47 59 50" stroke="#EAB308" strokeWidth="0.9" fill="none" opacity="0.45" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 눈썹 — 단정하게 */}
              <path d="M30 30 Q34 28.5 37 30" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M43 30 Q46 28.5 50 30" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* 속눈썹 */}
              <path d="M31 31.5 Q34 30 37 31.5" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              <path d="M43 31.5 Q46 30 49 31.5" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
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
              {/* 오른팔 → 정리된 컬러 라벨 (정리정돈) */}
              <path d="M52 58 Q60 57 64 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <rect x="64" y="49" width="13" height="5" rx="1" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.9" />
              <rect x="64" y="55" width="13" height="5" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.9" />
              <rect x="64" y="61" width="13" height="5" rx="1" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.9" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신묘-f")!.emoji} {getIljuType("신묘-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("신묘-f")!.id} · {getIljuType("신묘-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "경자-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="100" cy="100" r="50" stroke="#94A3B8" strokeWidth="1" opacity="0.1" fill="none" strokeDasharray="8 4" />
              <path d="M20 30 L50 30 L50 60 L20 60 Z" fill="#E2E8F0" opacity="0.1" />
              <path d="M150 140 L175 140 L175 165 L150 165 Z" fill="#E2E8F0" opacity="0.08" />
              <path d="M80 170 L100 150 L120 170" fill="#E2E8F0" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경자-m")!.emoji} {getIljuType("경자-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경자-m")!.id} · {getIljuType("경자-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "경자-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M20 100 C60 80 140 120 180 100" stroke="#BAE6FD" strokeWidth="1.5" opacity="0.12" fill="none" />
              <path d="M20 120 C60 100 140 140 180 120" stroke="#BAE6FD" strokeWidth="1" opacity="0.1" fill="none" />
              <path d="M80 30 L100 10 L120 30 L100 50 Z" fill="#E2E8F0" opacity="0.12" />
              <circle cx="160" cy="160" r="18" fill="#DBEAFE" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경자-f")!.emoji} {getIljuType("경자-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경자-f")!.id} · {getIljuType("경자-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "신축-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M60 160 Q90 140 110 155 Q130 168 168 150" stroke="#94A3B8" strokeWidth="2" opacity="0.1" fill="none" strokeDasharray="8 5" />
            <path d="M148 60 L153 66 L164 50" stroke="#4ADE80" strokeWidth="2" opacity="0.16" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 100 L33 106 L39 108 L33 110 L30 116 L27 110 L21 108 L27 106 Z" fill="#94A3B8" opacity="0.12" />
            <path d="M168 138 L178 148 L168 162 L158 148 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" opacity="0.15" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신축-m")!.emoji + " " + getIljuType("신축-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("신축-m")!.id + " · " + getIljuType("신축-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "신축-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 반짝이는 보석들 */}
              <path d="M30 50 L33 44 L36 50 L33 53 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" opacity="0.2" />
              <path d="M165 45 L168 40 L171 45 L168 48 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" opacity="0.15" />
              <path d="M160 155 L162 150 L164 155 L162 158 Z" fill="#FACC15" opacity="0.15" />
              {/* 스파클 */}
              <path d="M170 100 L172 106 L178 108 L172 110 L170 116 L168 110 L162 108 L168 106 Z" fill="#94A3B8" opacity="0.15" />
              {/* 시계 원 */}
              <circle cx="35" cy="155" r="10" stroke="#94A3B8" strokeWidth="1" opacity="0.1" fill="none" />
              <line x1="35" y1="149" x2="35" y2="155" stroke="#94A3B8" strokeWidth="1" opacity="0.1" />
              <line x1="35" y1="155" x2="40" y2="157" stroke="#94A3B8" strokeWidth="0.8" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 헤어 — 양갈래, 노랑 */}
              <path d="M22 28 Q22 8 40 6 Q58 8 58 28" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 왼쪽 갈래 */}
              <path d="M20 28 Q12 38 14 60 Q16 68 20 66 Q26 62 22 48 Q20 38 22 30 Z" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 오른쪽 갈래 */}
              <path d="M60 28 Q68 38 66 60 Q64 68 60 66 Q54 62 58 48 Q60 38 58 30 Z" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 묶음 장식 */}
              <circle cx="21" cy="28" r="3.5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" />
              <circle cx="59" cy="28" r="3.5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" />
              {/* 얼굴 — 통통한 어린 소녀 */}
              <ellipse cx="40" cy="36" rx="15" ry="16" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
              {/* 속눈썹 */}
              <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 눈 — 초롱초롱 */}
              <circle cx="34" cy="34" r="3" fill="#2D2D2D"/>
              <circle cx="46" cy="34" r="3" fill="#2D2D2D"/>
              <circle cx="35.2" cy="32.8" r="1.3" fill="white"/>
              <circle cx="47.2" cy="32.8" r="1.3" fill="white"/>
              <circle cx="36.5" cy="35.5" r="0.7" fill="white" opacity="0.7"/>
              <circle cx="48.5" cy="35.5" r="0.7" fill="white" opacity="0.7"/>
              {/* 입 — 귀여운 미소 */}
              <path d="M36 44 Q40 48 44 44" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 볼터치 — 통통하게 */}
              <ellipse cx="28" cy="40" rx="5" ry="3" fill="#F9A8D4" opacity="0.6" />
              <ellipse cx="52" cy="40" rx="5" ry="3" fill="#F9A8D4" opacity="0.6" />
              {/* 몸통 — 분홍 원피스 */}
              <path d="M28 52 Q26 56 26 72 L54 72 Q54 56 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 왼팔 — 늘어진 */}
              <path d="M28 56 Q20 60 16 64" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* 오른팔 — 베개 끌어안기 */}
              <path d="M52 58 Q60 55 64 52" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* 베개 */}
              <rect x="60" y="46" width="18" height="14" rx="5" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
              <path d="M63 50 Q69 48 75 50" stroke="#FBCFE8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M63 54 Q69 52 75 54" stroke="#FBCFE8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신축-f")!.emoji} {getIljuType("신축-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("신축-f")!.id} · {getIljuType("신축-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "경술-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M80 60 L100 40 L120 60 L110 60 L100 50 L90 60 Z" fill="#94A3B8" opacity="0.15" fillRule="evenodd" />
              <circle cx="50" cy="140" r="20" stroke="#94A3B8" strokeWidth="1.5" opacity="0.1" fill="none" />
              <path d="M140 100 L155 85 L170 100 L155 115 Z" fill="#E2E8F0" opacity="0.2" />
              <path d="M30 60 Q40 50 50 60 Q40 70 30 60Z" fill="#94A3B8" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경술-m")!.emoji} {getIljuType("경술-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경술-m")!.id} · {getIljuType("경술-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "경술-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M90 60 Q100 50 110 60 Q100 70 90 60Z" fill="#94A3B8" opacity="0.15" />
              <circle cx="150" cy="100" r="25" stroke="#94A3B8" strokeWidth="1" opacity="0.12" fill="none" />
              <path d="M30 140 Q40 130 50 140" stroke="#94A3B8" strokeWidth="2" opacity="0.15" fill="none" />
              <path d="M140 50 L148 40 L148 60 Z" fill="#E2E8F0" opacity="0.2" />
              <path d="M55 70 L60 60 L63 70 L73 70 L65 76 L68 86 L60 80 L52 86 L55 76 L47 70 Z" fill="#94A3B8" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경술-f")!.emoji} {getIljuType("경술-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경술-f")!.id} · {getIljuType("경술-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "신해-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 음표들 */}
              <path d="M30 50 L30 38 L38 36 L38 48" stroke="#94A3B8" strokeWidth="1" fill="none" opacity="0.1" />
              <circle cx="28" cy="51" r="2.5" fill="#94A3B8" opacity="0.1" />
              <circle cx="36" cy="49" r="2.5" fill="#94A3B8" opacity="0.1" />
              <path d="M165 140 L165 130 L172 128 L172 138" stroke="#94A3B8" strokeWidth="1" fill="none" opacity="0.08" />
              <circle cx="163" cy="141" r="2" fill="#94A3B8" opacity="0.08" />
              <circle cx="170" cy="139" r="2" fill="#94A3B8" opacity="0.08" />
              {/* 배터리 */}
              <rect x="160" y="50" width="20" height="10" rx="2" stroke="#4ADE80" strokeWidth="1" opacity="0.12" fill="none" />
              <rect x="180" y="53" width="3" height="4" rx="0.5" fill="#4ADE80" opacity="0.12" />
              <rect x="162" y="52" width="12" height="6" rx="1" fill="#4ADE80" opacity="0.08" />
              {/* Zzz */}
              <text x="25" y="160" fill="#94A3B8" opacity="0.1" fontSize="14" fontWeight="bold">{"z"}</text>
              <text x="35" y="150" fill="#94A3B8" opacity="0.08" fontSize="10" fontWeight="bold">{"z"}</text>
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신해-m")!.emoji} {getIljuType("신해-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("신해-m")!.id} · {getIljuType("신해-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "신해-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 밤하늘 별들 */}
              <circle cx="30" cy="20" r="2.5" fill="#E2E8F0" opacity="0.2" />
              <circle cx="70" cy="15" r="1.8" fill="#E2E8F0" opacity="0.18" />
              <circle cx="130" cy="25" r="2" fill="#E2E8F0" opacity="0.2" />
              <circle cx="170" cy="18" r="2.5" fill="#E2E8F0" opacity="0.18" />
              <circle cx="50" cy="50" r="1.5" fill="#E2E8F0" opacity="0.15" />
              <circle cx="155" cy="60" r="2" fill="#E2E8F0" opacity="0.15" />
              <circle cx="90" cy="35" r="1.5" fill="#E2E8F0" opacity="0.15" />
              {/* 달 */}
              <path d="M170 80 A30 30 0 1 1 170 140 A20 20 0 1 0 170 80Z" fill="#E2E8F0" opacity="0.15" />
              {/* 와인잔 그림자 */}
              <path d="M20 140 Q30 110 40 140 L44 160 L16 160 Z" fill="#94A3B8" opacity="0.08" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신해-f")!.emoji} {getIljuType("신해-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("신해-f")!.id} · {getIljuType("신해-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "경신-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M30 100 L170 100" stroke="#94A3B8" strokeWidth="2" opacity="0.15" strokeDasharray="8 4" />
              <path d="M80 40 L120 160" stroke="#94A3B8" strokeWidth="1.5" opacity="0.1" />
              <path d="M100 40 L130 30 L120 60 Z" fill="#E2E8F0" opacity="0.2" />
              <path d="M40 140 L50 130 L52 142 Z" fill="#94A3B8" opacity="0.15" />
              <circle cx="155" cy="55" r="12" stroke="#94A3B8" strokeWidth="1" opacity="0.12" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경신-m")!.emoji} {getIljuType("경신-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경신-m")!.id} · {getIljuType("경신-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "경신-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M80 60 L100 40 L120 60 L100 80 Z" fill="#E2E8F0" opacity="0.2" />
              <circle cx="50" cy="130" r="18" stroke="#94A3B8" strokeWidth="1" opacity="0.12" fill="none" />
              <path d="M140 130 L155 115 L170 130 L155 145 Z" fill="#E2E8F0" opacity="0.15" />
              <path d="M155 55 L158 45 L161 55 L171 55 L163 61 L166 71 L158 65 L150 71 L153 61 L145 55 Z" fill="#94A3B8" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 헤어 — 단정한 보라 단발 (닫힌 Z) */}
              <path d="M20 32 Q20 10 40 8 Q60 10 60 32 Q62 48 54 54 Q46 58 40 58 Q34 58 26 54 Q18 48 20 32 Z" fill="#8B5CF6" stroke="#2D2D2D" strokeWidth="1.5" />
              <path d="M40 9 Q35 16 33 26" stroke="#6D28D9" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
              {/* 보석 감정 루페 — 이마 위로 올림 */}
              <path d="M24 25 Q40 19 57 24" stroke="#334155" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <circle cx="52" cy="21" r="3.4" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1.2" />
              <circle cx="52" cy="21" r="1.9" fill="#BAE6FD" fillOpacity="0.85" />
              <circle cx="51" cy="20" r="0.7" fill="white" opacity="0.8" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="37" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 눈썹 — 집중 */}
              <path d="M28 31 Q32 29 36 31" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M44 31 Q48 29 52 31" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* 속눈썹 */}
              <path d="M30 33 Q33 31 36 33" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <path d="M44 33 Q47 31 50 33" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              {/* 눈 — 또렷한 */}
              <ellipse cx="33" cy="35.5" rx="2.6" ry="2.8" fill="#2D2D2D" />
              <ellipse cx="47" cy="35.5" rx="2.6" ry="2.8" fill="#2D2D2D" />
              <circle cx="34" cy="34.3" r="1" fill="white" />
              <circle cx="48" cy="34.3" r="1" fill="white" />
              {/* 입 — 야무진 미소 */}
              <path d="M37 45 Q40 47 43 45" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* 볼터치 */}
              <ellipse cx="28" cy="40" rx="4.5" ry="2.6" fill="#C4B5FD" opacity="0.6" />
              <ellipse cx="52" cy="41" rx="3.5" ry="2.2" fill="#C4B5FD" opacity="0.5" />
              {/* 몸통 — 버건디 탑 + 깃 */}
              <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#9F1239" stroke="#2D2D2D" strokeWidth="1.5" />
              <path d="M36 49 L40 55 L44 49" stroke="#FBCFE8" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
              <circle cx="40" cy="62" r="1.3" fill="#FBCFE8" opacity="0.8" />
              {/* 오른팔 → 손끝으로 다이아 감정 */}
              <path d="M52 56 Q58 54 62 50" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M61 42 L69 42 L72 48 L65 56 L58 48 Z" fill="#E0F2FE" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M61 42 L65 46 L69 42Z" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="0.7" strokeLinejoin="round" />
              {/* 왼팔 → 광택천 (계속 닦음) */}
              <path d="M28 58 Q20 58 15 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M4 58 Q10 56 16 59 Q14 64 16 68 Q10 70 4 68 Q6 63 4 58 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경신-f")!.emoji} {getIljuType("경신-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경신-f")!.id} · {getIljuType("경신-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "신유-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 보석들 */}
              <path d="M30 50 L35 42 L40 50 L35 54 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" opacity="0.2" />
              <path d="M160 40 L163 35 L166 40 L163 43 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" opacity="0.15" />
              {/* X 표시들 (불가!) */}
              <path d="M160 145 L168 153 M168 145 L160 153" stroke="#F87171" strokeWidth="1.5" opacity="0.12" />
              <path d="M30 155 L36 161 M36 155 L30 161" stroke="#F87171" strokeWidth="1" opacity="0.1" />
              {/* 스파클 */}
              <path d="M170 80 L172 86 L178 88 L172 90 L170 96 L168 90 L162 88 L168 86 Z" fill="#94A3B8" opacity="0.15" />
              {/* 체크리스트 선 */}
              <line x1="25" y1="100" x2="50" y2="100" stroke="#94A3B8" strokeWidth="1" opacity="0.08" />
              <line x1="25" y1="108" x2="45" y2="108" stroke="#94A3B8" strokeWidth="1" opacity="0.06" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신유-m")!.emoji} {getIljuType("신유-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("신유-m")!.id} · {getIljuType("신유-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "신유-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 핸드백 그림자 */}
              <rect x="140" y="130" width="40" height="30" rx="6" fill="#94A3B8" opacity="0.08" />
              {/* 체크 */}
              <path d="M30 60 L38 68 L52 50" stroke="#4ADE80" strokeWidth="2" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
              {/* 엑스 */}
              <path d="M155 45 L165 55 M165 45 L155 55" stroke="#F87171" strokeWidth="2" opacity="0.18" strokeLinecap="round" />
              {/* 스파클 */}
              <path d="M30 140 L32 146 L38 148 L32 150 L30 156 L28 150 L22 148 L28 146 Z" fill="#94A3B8" opacity="0.1" />
              {/* 다이아 */}
              <path d="M90 20 L100 35 L90 50 L80 35 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 머리카락 — 허니 블론드 단발, closed Z path */}
              <path d="M20 34 Q20 12 40 9 Q60 12 60 34 L60 60 Q54 68 46 64 Q40 62 34 64 Q26 68 20 60 Z" fill="#E0AC5A" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 사이드 파트 결 */}
              <path d="M44 12 Q39 18 37 28" stroke="#B5821F" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 속눈썹 */}
              <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 눈썹 — 차분한 안목 */}
              <path d="M30 29 Q34 27.5 38 29" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M43 29 Q47 27.5 51 29" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* 눈 — 또렷한 안목 */}
              <circle cx="34" cy="34" r="2.6" fill="#2D2D2D" />
              <circle cx="46" cy="34" r="2.6" fill="#2D2D2D" />
              <circle cx="35" cy="33" r="1.1" fill="white" />
              <circle cx="47" cy="33" r="1.1" fill="white" />
              {/* 입 — 레드립 차분한 미소 */}
              <path d="M36 43 Q40 45.5 44 43" stroke="#E11D48" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* 볼터치 */}
              <ellipse cx="28" cy="40" rx="4" ry="2.4" fill="#F9A8D4" opacity="0.45" />
              <ellipse cx="52" cy="40" rx="4" ry="2.4" fill="#F9A8D4" opacity="0.45" />
              {/* 몸통 — 차콜 블레이저 + 라펠 */}
              <path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="#334155" stroke="#2D2D2D" strokeWidth="1.5" />
              <path d="M40 49 L34 56 M40 49 L46 56" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="40" cy="62" r="1.2" fill="#FACC15" />
              {/* 왼팔 → 명품 백 (팔에 걺) */}
              <path d="M28 56 Q22 58 19 62" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M8 60 Q8 57 18 57 Q22 60 19 62" stroke="#A16207" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <rect x="5" y="60" width="16" height="12" rx="2.5" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.4" />
              <rect x="11" y="62.5" width="4" height="2.5" rx="0.8" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6" />
              {/* 오른팔 → 'PICK' 추천 태그 (이거 써봐) */}
              <path d="M52 54 Q58 52 61 48" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M60 42 L74 42 L77 49 L74 56 L60 56 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M67 52 Q67 49 69.5 49 Q72 49 72 51 Q72 53 67 55.5 Q62 53 62 51 Q62 49 64.5 49 Q67 49 67 52Z" fill="#E11D48" stroke="#2D2D2D" strokeWidth="0.7" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신유-f")!.emoji} {getIljuType("신유-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("신유-f")!.id} · {getIljuType("신유-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "경오-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 망치 그림자 */}
              <path d="M30 80 L90 160" stroke="#94A3B8" strokeWidth="4" opacity="0.1" strokeLinecap="round" />
              <rect x="20" y="68" width="30" height="20" rx="4" fill="#94A3B8" opacity="0.1" />
              {/* 메모지들 */}
              <rect x="130" y="40" width="35" height="25" rx="3" fill="#FDE68A" opacity="0.15" />
              <rect x="140" y="80" width="30" height="22" rx="3" fill="#FDE68A" opacity="0.12" />
              {/* 직선 */}
              <line x1="10" y1="100" x2="190" y2="100" stroke="#94A3B8" strokeWidth="1" opacity="0.08" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경오-m")!.emoji} {getIljuType("경오-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경오-m")!.id} · {getIljuType("경오-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "경오-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 직선 화살표들 */}
              <path d="M20 80 L60 80" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" opacity="0.12" />
              <path d="M55 75 L65 80 L55 85" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.12" />
              <path d="M140 120 L175 120" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" opacity="0.1" />
              <path d="M170 116 L180 120 L170 124" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.1" />
              {/* 느낌표 */}
              <rect x="170" y="40" width="3" height="12" rx="1" fill="#94A3B8" opacity="0.15" />
              <circle cx="171.5" cy="56" r="1.5" fill="#94A3B8" opacity="0.15" />
              {/* 스파클 */}
              <path d="M30 150 L32 156 L38 158 L32 160 L30 166 L28 160 L22 158 L28 156 Z" fill="#94A3B8" opacity="0.12" />
              {/* 대화 버블 */}
              <ellipse cx="35" cy="50" rx="14" ry="8" stroke="#94A3B8" strokeWidth="1" opacity="0.08" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 토네이도 — 뒤에 배치 */}
              <path d="M10 4 Q40 6 70 4 Q72 22 58 36 Q50 48 44 64 Q42 70 40 74 Q38 70 36 64 Q30 48 22 36 Q8 22 10 4Z" fill="#94A3B8" stroke="none" opacity="0.3" />
              <path d="M18 8 Q40 10 62 8 Q63 24 52 38 Q46 48 40 62 Q34 48 28 38 Q17 24 18 8Z" fill="#CBD5E1" opacity="0.35" />
              <path d="M24 12 Q40 14 56 12 Q57 26 48 38 Q44 46 40 56 Q36 46 32 38 Q23 26 24 12Z" fill="#E2E8F0" opacity="0.5" />
              <path d="M28 20 Q40 22 52 20" stroke="#94A3B8" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M24 32 Q40 34 56 32" stroke="#94A3B8" strokeWidth="1.2" fill="none" opacity="0.5" />
              <path d="M26 44 Q40 46 54 44" stroke="#94A3B8" strokeWidth="1" fill="none" opacity="0.4" />
              {/* 머리카락 — 단정한 숏컷 */}
              <path d="M22 30 Q20 14 40 12 Q60 14 58 30" fill="#2D2D2D" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="38" rx="16" ry="15" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
              {/* 속눈썹 */}
              <path d="M30 32 Q33 30 36 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M44 32 Q47 30 50 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 눈 — 당당한 큰 눈 */}
              <circle cx="34" cy="36" r="3" fill="#2D2D2D" />
              <circle cx="46" cy="36" r="3" fill="#2D2D2D" />
              <circle cx="35" cy="35" r="1" fill="white" />
              <circle cx="47" cy="35" r="1" fill="white" />
              {/* 눈썹 — 강한 */}
              <line x1="29" y1="30" x2="37" y2="29" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
              <line x1="51" y1="30" x2="43" y2="29" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
              {/* 입 — 크게 벌어진 (직설) */}
              <ellipse cx="40" cy="46" rx="6" ry="4" fill="#2D2D2D" />
              <ellipse cx="40" cy="45" rx="4" ry="2" fill="#F87171" />
              {/* 몸통 */}
              <rect x="28" y="54" width="24" height="20" rx="5" fill="#1D4ED8" stroke="#2D2D2D" strokeWidth="2" />
              {/* 왼손: 칼 (직설의 칼) */}
              <rect x="8" y="50" width="3" height="22" rx="1" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1" />
              <rect x="5" y="48" width="9" height="4" rx="1" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1" />
              {/* 오른손: 메가폰 */}
              <path d="M58 56 L68 50 L74 46 L74 62 L68 58 L58 64 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
              <rect x="56" y="56" width="4" height="8" rx="1" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1" />
              {/* 소리 파동 */}
              <path d="M76 50 Q80 54 76 58" stroke="#F87171" strokeWidth="1" fill="none" opacity="0.5" />
              <path d="M78 47 Q84 54 78 61" stroke="#F87171" strokeWidth="0.8" fill="none" opacity="0.3" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경오-f")!.emoji} {getIljuType("경오-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경오-f")!.id} · {getIljuType("경오-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "신미-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 체크리스트 선 */}
              <rect x="30" y="40" width="50" height="60" rx="4" stroke="#94A3B8" strokeWidth="1" opacity="0.1" fill="none" />
              <line x1="42" y1="56" x2="72" y2="56" stroke="#94A3B8" strokeWidth="1" opacity="0.1" />
              <line x1="42" y1="64" x2="72" y2="64" stroke="#94A3B8" strokeWidth="1" opacity="0.1" />
              <line x1="42" y1="72" x2="72" y2="72" stroke="#94A3B8" strokeWidth="1" opacity="0.1" />
              <path d="M34 56 L37 59 L41 52" stroke="#94A3B8" strokeWidth="1" opacity="0.12" strokeLinecap="round" strokeLinejoin="round" />
              {/* 다이아몬드 장식 */}
              <path d="M155 60 L162 70 L155 80 L148 70 Z" fill="#E2E8F0" opacity="0.15" />
              {/* 스파클 */}
              <path d="M160 140 L162 146 L168 148 L162 150 L160 156 L158 150 L152 148 L158 146 Z" fill="#94A3B8" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신미-m")!.emoji} {getIljuType("신미-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("신미-m")!.id} · {getIljuType("신미-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "신미-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 별 스파클 */}
              <path d="M28 46 L29.5 40 L31 46 L37 46 L32 50 L34 56 L29.5 52 L25 56 L27 50 L22 46 Z" fill="#FACC15" opacity="0.15" />
              <path d="M160 38 L161.5 34 L163 38 L167 38 L164 41 L165 45 L161.5 42 L158 45 L159 41 L156 38 Z" fill="#FACC15" opacity="0.12" />
              {/* 느낌표 */}
              <rect x="170" y="78" width="4" height="16" rx="2" fill="#60A5FA" opacity="0.15" />
              <circle cx="172" cy="98" r="2" fill="#60A5FA" opacity="0.15" />
              <rect x="24" y="148" width="3" height="12" rx="1.5" fill="#60A5FA" opacity="0.12" />
              <circle cx="25.5" cy="163" r="1.5" fill="#60A5FA" opacity="0.12" />
              {/* 공주봉 실루엣 */}
              <line x1="140" y1="158" x2="170" y2="108" stroke="#94A3B8" strokeWidth="2" opacity="0.1" strokeLinecap="round" />
              <path d="M170 103 L172 98 L174 103 L178 103 L175 106 L176 111 L172 108 L168 111 L169 106 L166 103 Z" fill="#94A3B8" opacity="0.1" />
              {/* 파문 */}
              <circle cx="100" cy="168" r="20" stroke="#38BDF8" strokeWidth="1" opacity="0.1" fill="none" />
              <circle cx="100" cy="168" r="12" stroke="#38BDF8" strokeWidth="0.8" opacity="0.08" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신미-f")!.emoji} {getIljuType("신미-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("신미-f")!.id} · {getIljuType("신미-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "경진-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 성벽 */}
              <rect x="18" y="158" width="16" height="28" fill="#94A3B8" opacity="0.07" />
              <rect x="40" y="158" width="16" height="28" fill="#94A3B8" opacity="0.07" />
              <rect x="62" y="158" width="16" height="28" fill="#94A3B8" opacity="0.07" />
              <rect x="18" y="148" width="8" height="12" fill="#94A3B8" opacity="0.05" />
              <rect x="28" y="148" width="8" height="12" fill="#94A3B8" opacity="0.05" />
              {/* 직진 화살표 */}
              <path d="M145 90 L180 90" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.15" />
              <path d="M174 84 L184 90 L174 96" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.15" />
              {/* 별 */}
              <path d="M30 48 L32 54 L38 56 L32 58 L30 64 L28 58 L22 56 L28 54 Z" fill="#94A3B8" opacity="0.12" />
              {/* 금속 파편 */}
              <rect x="162" y="152" width="10" height="3" rx="1" fill="#E2E8F0" opacity="0.18" transform="rotate(25 167 153)" />
              <rect x="28" y="168" width="7" height="2" rx="1" fill="#E2E8F0" opacity="0.13" transform="rotate(-15 31 169)" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경진-m")!.emoji} {getIljuType("경진-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경진-m")!.id} · {getIljuType("경진-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "경진-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 꽃 배경 */}
              <circle cx="40" cy="50" r="12" fill="#FDE047" opacity="0.1" />
              <circle cx="40" cy="40" r="7" fill="#FDE047" opacity="0.07" />
              <circle cx="50" cy="54" r="5" fill="#FDE047" opacity="0.07" />
              <circle cx="30" cy="54" r="5" fill="#FDE047" opacity="0.07" />
              {/* 별들 */}
              <path d="M160 48 L161.5 44 L163 48 L167 48 L164 51 L165 55 L161.5 52 L158 55 L159 51 L156 48 Z" fill="#FACC15" opacity="0.15" />
              <path d="M28 148 L29.5 145 L31 148 L34 148 L31.8 150 L32.5 153 L29.5 151 L26.5 153 L27.2 150 L25 148 Z" fill="#FACC15" opacity="0.12" />
              {/* 체크 장식 */}
              <path d="M150 138 L158 146 L170 132" stroke="#4ADE80" strokeWidth="2" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
              {/* 웨이브 선 */}
              <path d="M10 118 Q50 108 90 118 Q130 128 170 118" stroke="#EAB308" strokeWidth="1.5" opacity="0.1" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("경진-f")!.emoji} {getIljuType("경진-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("경진-f")!.id} · {getIljuType("경진-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "신사-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <rect x="22" y="150" width="14" height="14" fill="#D4A574" opacity="0.12" />
            <rect x="40" y="156" width="12" height="8" fill="#B45309" opacity="0.1" />
            <path d="M150 145 L156 139 L162 145 L156 151 Z" fill="#94A3B8" opacity="0.12" />
            <path d="M160 50 L162 56 L168 58 L162 60 L160 66 L158 60 L152 58 L158 56 Z" fill="#FACC15" opacity="0.13" />
            <path d="M28 50 L42 50 M30 60 L40 60" stroke="#94A3B8" strokeWidth="2" opacity="0.1" strokeLinecap="round" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신사-m")!.emoji + " " + getIljuType("신사-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("신사-m")!.id + " · " + getIljuType("신사-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "신사-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M20 100 L100 20 L180 100 L180 180 L20 180 Z" fill="#E2E8F0" opacity="0.08" />
              <circle cx="40" cy="160" r="16" fill="#94A3B8" opacity="0.1" />
              <path d="M150 40 L154 28 L158 40 L170 40 L160 48 L164 60 L154 52 L144 60 L148 48 L138 40 Z" fill="#E2E8F0" opacity="0.12" />
              <path d="M80 170 Q100 155 120 170" stroke="#94A3B8" strokeWidth="1.5" opacity="0.1" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="metal" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신사-f")!.emoji} {getIljuType("신사-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("신사-f")!.id} · {getIljuType("신사-f")!.stemElement}</p>
        </div>
    ),
  },
];

export const METAL_CHARACTER_MAP: Record<string, React.ReactNode> =
  Object.fromEntries(_MetalChars.map(e => [e.id, e.node]));

export function MetalCharacters() {
  return (
    <>
      {_MetalChars.map(e => (
        <div key={e.id} id={`card-${e.id}`} data-gender={e.id.endsWith("-f") ? "female" : "male"} className="ilju-card scroll-mt-24">{e.node}</div>
      ))}
    </>
  );
}