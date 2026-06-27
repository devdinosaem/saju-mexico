import React from "react";
import { getIljuType } from "@/lib/ilju-types";
import { ElementBadge, SHOW_ELEMENT_BADGE } from "./characters-shared";

// 수(水) 일주 캐릭터 — 수097~수120
// 임신, 계유, 임오, 계미, 임진, 계사, 임인, 계묘, 임자, 계축, 임술, 계해

const _WaterChars: Array<{id: string; node: React.ReactNode}> = [
  {
    id: "임신-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 기어/톱니바퀴 */}
              <circle cx="50" cy="100" r="20" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" fill="none" />
              <circle cx="50" cy="100" r="12" stroke="#60A5FA" strokeWidth="1" opacity="0.08" fill="none" />
              {/* 톱니 */}
              <rect x="48" y="78" width="4" height="6" rx="1" fill="#60A5FA" opacity="0.1" />
              <rect x="48" y="116" width="4" height="6" rx="1" fill="#60A5FA" opacity="0.1" />
              <rect x="28" y="98" width="6" height="4" rx="1" fill="#60A5FA" opacity="0.1" />
              <rect x="66" y="98" width="6" height="4" rx="1" fill="#60A5FA" opacity="0.1" />
              {/* 그래프 선 */}
              <path d="M110 160 L130 140 L150 150 L170 120 L190 110" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* 스파클 */}
              <path d="M165 55 L167 61 L173 63 L167 65 L165 71 L163 65 L157 63 L163 61 Z" fill="#60A5FA" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
              {/* 콧대 */}
              <path d="M40 40 Q39 43 41 45" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임신-m")!.emoji} {getIljuType("임신-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("임신-m")!.id} · {getIljuType("임신-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "임신-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 얼음 크리스탈 */}
              <path d="M30 50 L30 80 M15 57.5 L45 72.5 M15 72.5 L45 57.5" stroke="#93C5FD" strokeWidth="1" opacity="0.15" strokeLinecap="round" />
              <path d="M165 120 L165 150 M150 127.5 L180 142.5 M150 142.5 L180 127.5" stroke="#93C5FD" strokeWidth="1" opacity="0.12" strokeLinecap="round" />
              {/* 눈송이 */}
              <circle cx="100" cy="160" r="3" fill="#DBEAFE" opacity="0.2" />
              <circle cx="140" cy="50" r="2" fill="#DBEAFE" opacity="0.18" />
              <circle cx="50" cy="140" r="2.5" fill="#93C5FD" opacity="0.15" />
              {/* 물결 */}
              <path d="M0 180 Q50 172 100 180 Q150 188 200 180" stroke="#60A5FA" strokeWidth="1" opacity="0.08" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임신-f")!.emoji} {getIljuType("임신-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("임신-f")!.id} · {getIljuType("임신-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "계유-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 생각 구름 */}
              <ellipse cx="40" cy="45" rx="16" ry="10" stroke="#60A5FA" strokeWidth="1" opacity="0.08" fill="none" />
              <ellipse cx="55" cy="38" rx="12" ry="8" stroke="#60A5FA" strokeWidth="0.8" opacity="0.06" fill="none" />
              {/* 얼음 결정 */}
              <path d="M170 50 L170 40 M170 50 L170 60 M170 50 L162 45 M170 50 L178 45 M170 50 L162 55 M170 50 L178 55" stroke="#60A5FA" strokeWidth="1" opacity="0.12" />
              <path d="M30 150 L30 143 M30 150 L30 157 M30 150 L24 146 M30 150 L36 146 M30 150 L24 154 M30 150 L36 154" stroke="#60A5FA" strokeWidth="0.8" opacity="0.08" />
              {/* 물음표 */}
              <path d="M165 150 Q165 142 172 142 Q179 142 179 149 Q179 154 172 154 L172 158" stroke="#60A5FA" strokeWidth="1" opacity="0.1" fill="none" />
              <circle cx="172" cy="162" r="1.2" fill="#60A5FA" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계유-m")!.emoji} {getIljuType("계유-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("계유-m")!.id} · {getIljuType("계유-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "계유-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* '왜?' 깊이 파동 — 동심원 */}
              <circle cx="100" cy="105" r="78" stroke="#60A5FA" strokeWidth="1" opacity="0.06" fill="none" />
              <circle cx="100" cy="105" r="56" stroke="#60A5FA" strokeWidth="1" opacity="0.07" fill="none" />
              <circle cx="100" cy="105" r="34" stroke="#60A5FA" strokeWidth="1" opacity="0.08" fill="none" />
              {/* 떠다니는 물음표 */}
              <text x="22" y="56" fontSize="22" fill="#60A5FA" opacity="0.13" fontWeight="bold">{"?"}</text>
              <text x="158" y="74" fontSize="16" fill="#60A5FA" opacity="0.11" fontWeight="bold">{"?"}</text>
              <text x="150" y="168" fontSize="19" fill="#8B5CF6" opacity="0.1" fontWeight="bold">{"?"}</text>
              {/* 거울 반짝임 */}
              <path d="M44 150 L47 158 L55 161 L47 164 L44 172 L41 164 L33 161 L41 158 Z" fill="#A5B4FC" opacity="0.14" />
              <path d="M172 120 L174 126 L180 128 L174 130 L172 136 L170 130 L164 128 L170 126 Z" fill="#60A5FA" opacity="0.1" />
              {/* 물방울 */}
              <path d="M30 96 C30 96 23 107 23 112 A7 7 0 0 0 37 112 C37 107 30 96 30 96Z" fill="#60A5FA" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계유-f")!.emoji} {getIljuType("계유-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("계유-f")!.id} · {getIljuType("계유-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "임오-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 불꽃 */}
              <path d="M40 160 C40 160 28 145 28 136 A12 12 0 0 1 52 136 C52 145 40 160 40 160Z" fill="#F87171" opacity="0.12" />
              {/* 얼음 결정 */}
              <path d="M160 50 L160 70 M150 55 L170 65 M150 65 L170 55" stroke="#60A5FA" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
              {/* 온도계 */}
              <rect x="92" y="25" width="6" height="30" rx="3" fill="#F87171" opacity="0.12" />
              <circle cx="95" cy="58" r="5" fill="#F87171" opacity="0.12" />
              {/* 물방울 */}
              <path d="M165 130 C165 130 158 120 158 115 A7 7 0 0 1 172 115 C172 120 165 130 165 130Z" fill="#60A5FA" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임오-m")!.emoji} {getIljuType("임오-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("임오-m")!.id} · {getIljuType("임오-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "임오-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FFE4EA] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 물방울 (수) */}
              <path d="M30 40 C30 40 25 50 25 55 A5 5 0 0 0 35 55 C35 50 30 40 30 40Z" fill="#60A5FA" opacity="0.12" />
              <path d="M165 60 C165 60 162 66 162 69 A3 3 0 0 0 168 69 C168 66 165 60 165 60Z" fill="#60A5FA" opacity="0.1" />
              {/* 불꽃 (화) */}
              <path d="M170 140 C170 140 164 150 164 155 A6 6 0 0 0 176 155 C176 150 170 140 170 140Z" fill="#F87171" opacity="0.12" />
              <path d="M25 150 C25 150 22 156 22 158 A3 3 0 0 0 28 158 C28 156 25 150 25 150Z" fill="#F87171" opacity="0.1" />
              {/* 하트들 (속마음) */}
              <path d="M160 30 C160 30 156 25 156 22.5 A2.5 2.5 0 0 1 160 21 A2.5 2.5 0 0 1 164 22.5 C164 25 160 30 160 30Z" fill="#E84B6A" opacity="0.15" />
              <path d="M40 160 C40 160 37 156 37 154 A2 2 0 0 1 40 153 A2 2 0 0 1 43 154 C43 156 40 160 40 160Z" fill="#E84B6A" opacity="0.1" />
              {/* 눈결정 (쿨함) */}
              <path d="M175 100 L175 90 M175 100 L175 110 M175 100 L167 95 M175 100 L183 95 M175 100 L167 105 M175 100 L183 105" stroke="#60A5FA" strokeWidth="1" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임오-f")!.emoji} {getIljuType("임오-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("임오-f")!.id} · {getIljuType("임오-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "계미-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M60 10 C60 10 40 30 40 45 A20 20 0 0 0 80 45 C80 30 60 10 60 10Z" fill="#60A5FA" opacity="0.1" />
              <path d="M160 80 C160 80 145 95 145 106 A15 15 0 0 0 175 106 C175 95 160 80 160 80Z" fill="#60A5FA" opacity="0.08" />
              <path d="M20 140 L80 140" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" strokeLinecap="round" />
              <path d="M100 160 L160 160" stroke="#60A5FA" strokeWidth="1.5" opacity="0.08" strokeLinecap="round" />
              <path d="M140 40 L144 28 L148 40 L160 40 L150 47 L154 59 L144 52 L134 59 L138 47 L128 40 Z" fill="#60A5FA" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계미-m")!.emoji} {getIljuType("계미-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("계미-m")!.id} · {getIljuType("계미-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "계미-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 잔잔한 물결 */}
              <path d="M0 150 Q25 142 50 150 Q75 158 100 150 Q125 142 150 150 Q175 158 200 150" stroke="#60A5FA" strokeWidth="1.2" opacity="0.1" fill="none" />
              <path d="M0 166 Q25 158 50 166 Q75 174 100 166 Q125 158 150 166 Q175 174 200 166" stroke="#60A5FA" strokeWidth="1" opacity="0.07" fill="none" />
              {/* 떠오르는 거품 */}
              <circle cx="40" cy="55" r="9" stroke="#60A5FA" strokeWidth="1.2" opacity="0.1" fill="none" />
              <circle cx="58" cy="38" r="5" stroke="#60A5FA" strokeWidth="1" opacity="0.09" fill="none" />
              <circle cx="160" cy="60" r="11" stroke="#22D3EE" strokeWidth="1.2" opacity="0.09" fill="none" />
              <circle cx="172" cy="44" r="5" stroke="#22D3EE" strokeWidth="1" opacity="0.08" fill="none" />
              {/* 균형 — 잔잔한 평형선 */}
              <line x1="60" y1="115" x2="140" y2="115" stroke="#60A5FA" strokeWidth="1" opacity="0.08" strokeLinecap="round" />
              <circle cx="100" cy="115" r="3" fill="#60A5FA" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계미-f")!.emoji} {getIljuType("계미-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("계미-f")!.id} · {getIljuType("계미-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "임진-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 스포트라이트 */}
              <path d="M100 0 L60 120 L140 120 Z" fill="#60A5FA" opacity="0.07" />
              {/* 물결 에너지 */}
              <path d="M0 150 Q50 130 100 150 Q150 170 200 150" stroke="#60A5FA" strokeWidth="1.5" fill="none" opacity="0.12" />
              <path d="M0 165 Q50 145 100 165 Q150 185 200 165" stroke="#60A5FA" strokeWidth="1" fill="none" opacity="0.08" />
              {/* 마이크 그림자 */}
              <ellipse cx="40" cy="60" rx="10" ry="16" fill="#60A5FA" opacity="0.1" />
              {/* 스파클 */}
              <circle cx="150" cy="40" r="3" fill="#60A5FA" opacity="0.15" />
              <circle cx="30" cy="100" r="2" fill="#60A5FA" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
              {/* 콧대 */}
              <path d="M40 35 Q39 38 41 40" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임진-m")!.emoji} {getIljuType("임진-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("임진-m")!.id} · {getIljuType("임진-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "임진-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 파도 */}
              <path d="M0 152 Q25 142 50 152 Q75 162 100 152 Q125 142 150 152 Q175 162 200 152" stroke="#60A5FA" strokeWidth="2" opacity="0.1" fill="none" />
              <path d="M0 168 Q25 158 50 168 Q75 178 100 168 Q125 158 150 168 Q175 178 200 168" stroke="#60A5FA" strokeWidth="1.5" opacity="0.07" fill="none" />
              {/* 느낌표들 */}
              <rect x="28" y="36" width="3" height="12" rx="1" fill="#60A5FA" opacity="0.13" />
              <circle cx="29.5" cy="52" r="1.5" fill="#60A5FA" opacity="0.13" />
              <rect x="168" y="50" width="2.5" height="10" rx="1" fill="#60A5FA" opacity="0.1" />
              <circle cx="169.5" cy="63" r="1.2" fill="#60A5FA" opacity="0.1" />
              {/* 소리 파동 */}
              <path d="M155 68 Q162 75 155 82" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" fill="none" />
              <path d="M162 62 Q171 74 162 86" stroke="#60A5FA" strokeWidth="1" opacity="0.07" fill="none" />
              {/* 스파클 */}
              <path d="M164 142 L166 148 L172 150 L166 152 L164 158 L162 152 L156 150 L162 148 Z" fill="#FACC15" opacity="0.14" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 사이드 포니테일 — 인디고 */}
              <path d="M58 26 Q72 28 73 44 Q72 53 66 50 Q70 40 60 32 Z" fill="#6366F1" stroke="#2D2D2D" strokeWidth="1.5" />
              <circle cx="60" cy="30" r="2.6" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
              {/* 헤어 — 활기찬 단발, 인디고 (closed Z) */}
              <path d="M18 36 Q18 12 40 10 Q62 12 62 36 Q63 46 57 52 Q49 57 40 55 Q31 57 23 52 Q17 46 18 36 Z" fill="#6366F1" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 헤어밴드 */}
              <path d="M20 30 Q40 21 60 30" stroke="#FACC15" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* 얼굴 */}
              <circle cx="40" cy="40" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 속눈썹 */}
              <path d="M29 34 Q32 32 35 34" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              <path d="M45 34 Q48 32 51 34" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              {/* 눈썹 — 살짝 올림 */}
              <path d="M28 31 Q32 29 37 31" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M43 31 Q48 29 52 31" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* 눈 — 반짝 큰 눈 */}
              <circle cx="34" cy="38" r="2.6" fill="#2D2D2D" />
              <circle cx="46" cy="38" r="2.6" fill="#2D2D2D" />
              <circle cx="35" cy="37" r="1.1" fill="white" />
              <circle cx="47" cy="37" r="1.1" fill="white" />
              {/* 입 — 환한 미소 */}
              <path d="M35 44 Q40 49 45 44" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* 볼터치 */}
              <ellipse cx="27" cy="44" rx="4.5" ry="2.6" fill="#F472B6" opacity="0.6" />
              <ellipse cx="53" cy="44" rx="4.5" ry="2.6" fill="#F472B6" opacity="0.6" />
              {/* 몸통 — 코랄 + 앞치마 (내가 해줄게) */}
              <path d="M28 54 Q26 58 26 74 L54 74 Q54 58 52 54 Q46 52 40 52 Q34 52 28 54Z" fill="#FB7185" stroke="#2D2D2D" strokeWidth="1.5" />
              <path d="M34 53 L34 74 L46 74 L46 53 Q43 51 40 51 Q37 51 34 53Z" fill="white" stroke="#2D2D2D" strokeWidth="1" opacity="0.9" />
              <path d="M34 54 Q40 50 46 54" stroke="#FB7185" strokeWidth="1.3" fill="none" />
              {/* 오른팔 ↑ → 메가폰 (다들 모여!) */}
              <path d="M52 58 Q58 53 61 48" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M59 50 L70 40 L75 50 L64 56 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
              <rect x="58" y="50" width="5" height="7" rx="1.5" transform="rotate(-42 60 53)" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1" />
              {/* 왼팔 → 손 흔들며 부름 */}
              <path d="M28 60 Q20 58 15 54" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="12" cy="51" r="3.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임진-f")!.emoji} {getIljuType("임진-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("임진-f")!.id} · {getIljuType("임진-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "계사-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 노트북/대본 그림자 */}
              <rect x="30" y="130" width="60" height="40" rx="4" fill="#60A5FA" opacity="0.07" />
              {/* 화살표 */}
              <path d="M120 50 L160 50 L155 44 M160 50 L155 56" stroke="#60A5FA" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" strokeLinejoin="round" />
              {/* 타겟 과녁 */}
              <circle cx="165" cy="150" r="18" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" fill="none" />
              <circle cx="165" cy="150" r="10" stroke="#60A5FA" strokeWidth="1" opacity="0.12" fill="none" />
              <circle cx="165" cy="150" r="4" fill="#60A5FA" opacity="0.1" />
              {/* 물결 */}
              <path d="M10 80 Q50 70 90 80 Q130 90 170 80" stroke="#60A5FA" strokeWidth="1" opacity="0.08" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계사-m")!.emoji} {getIljuType("계사-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("계사-m")!.id} · {getIljuType("계사-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "계사-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 물결 */}
              <path d="M0 160 Q50 150 100 160 Q150 170 200 160" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" fill="none" />
              <path d="M0 175 Q50 165 100 175 Q150 185 200 175" stroke="#60A5FA" strokeWidth="1" opacity="0.08" fill="none" />
              {/* 체스말 실루엣 */}
              <path d="M165 50 L165 60 L160 60 L160 62 L170 62 L170 60 L165 60" stroke="#60A5FA" strokeWidth="1" opacity="0.1" fill="none" />
              <circle cx="165" cy="47" r="4" stroke="#60A5FA" strokeWidth="1" opacity="0.1" fill="none" />
              {/* 뱀 무늬 S */}
              <path d="M30 40 Q40 30 35 50 Q30 70 40 60" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" fill="none" />
              {/* 스파클 */}
              <path d="M170 140 L171.5 144 L175.5 145.5 L171.5 147 L170 151 L168.5 147 L164.5 145.5 L168.5 144 Z" fill="#60A5FA" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계사-f")!.emoji} {getIljuType("계사-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("계사-f")!.id} · {getIljuType("계사-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "임인-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 큰 물결 (수생목 에너지) */}
              <path d="M0 148 C30 130 60 166 100 148 C140 130 170 166 200 148" stroke="#60A5FA" strokeWidth="2" opacity="0.1" fill="none" />
              <path d="M0 166 C30 150 60 182 100 166 C140 150 170 182 200 166" stroke="#60A5FA" strokeWidth="1.3" opacity="0.07" fill="none" />
              {/* 떠다니는 가능성들 — 별/새싹/하트 */}
              <path d="M150 44 L153 52 L161 52 L154 57 L157 65 L150 60 L143 65 L146 57 L139 52 L147 52 Z" fill="#FACC15" opacity="0.13" />
              <path d="M34 58 Q34 50 40 48 Q40 56 34 58Z" fill="#4ADE80" opacity="0.13" />
              <path d="M170 120 Q170 116 173 116 Q176 116 176 119 Q176 124 170 128 Q164 124 164 119 Q164 116 167 116 Q170 116 170 120Z" fill="#F472B6" opacity="0.12" />
              {/* 물방울 */}
              <path d="M30 96 C30 96 23 107 23 112 A7 7 0 0 0 37 112 C37 107 30 96 30 96Z" fill="#60A5FA" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
              {/* 콧대 */}
              <path d="M40 36 Q39 39 41 41" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임인-m")!.emoji} {getIljuType("임인-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("임인-m")!.id} · {getIljuType("임인-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "임인-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="100" cy="100" r="70" stroke="#60A5FA" strokeWidth="1" opacity="0.08" fill="none" strokeDasharray="6 4" />
              <circle cx="100" cy="100" r="50" stroke="#60A5FA" strokeWidth="1" opacity="0.06" fill="none" strokeDasharray="4 3" />
              <path d="M100 100 L160 40" stroke="#60A5FA" strokeWidth="1" opacity="0.1" />
              <path d="M80 50 L84 38 L88 50 L100 50 L90 57 L94 69 L84 62 L74 69 L78 57 L68 50 Z" fill="#60A5FA" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임인-f")!.emoji} {getIljuType("임인-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("임인-f")!.id} · {getIljuType("임인-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "계묘-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M100 20 L104 8 L108 20 L120 20 L110 28 L114 40 L104 32 L94 40 L98 28 L88 20 Z" fill="#60A5FA" opacity="0.12" />
              <path d="M30 110 C60 90 100 130 130 110" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" fill="none" />
              <circle cx="160" cy="130" r="16" fill="#DBEAFE" opacity="0.15" />
              <path d="M30 170 L170 170" stroke="#60A5FA" strokeWidth="1" opacity="0.08" strokeLinecap="round" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계묘-m")!.emoji} {getIljuType("계묘-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("계묘-m")!.id} · {getIljuType("계묘-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "계묘-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M70 50 C70 50 55 65 55 75 A20 20 0 0 0 85 75 C85 65 70 50 70 50Z" fill="#60A5FA" opacity="0.1" />
              <path d="M140 120 C140 120 128 132 128 140 A16 16 0 0 0 152 140 C152 132 140 120 140 120Z" fill="#60A5FA" opacity="0.08" />
              <path d="M85 160 Q100 148 115 160 Q100 172 85 160Z" fill="#F9A8D4" opacity="0.12" />
              <path d="M30 40 L34 28 L38 40 L50 40 L40 47 L44 59 L34 52 L24 59 L28 47 L18 40 Z" fill="#60A5FA" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계묘-f")!.emoji} {getIljuType("계묘-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("계묘-f")!.id} · {getIljuType("계묘-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "임자-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M30 100 C50 80 80 120 100 100 C120 80 150 120 170 100" stroke="#60A5FA" strokeWidth="1.5" opacity="0.15" fill="none" />
            <path d="M20 120 C40 100 70 140 100 120 C130 100 160 140 180 120" stroke="#60A5FA" strokeWidth="1" opacity="0.1" fill="none" />
            <path d="M100 30 Q120 20 110 40 Q100 50 90 40 Q80 20 100 30Z" fill="#60A5FA" opacity="0.15" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임자-m")!.emoji + " " + getIljuType("임자-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("임자-m")!.id + " · " + getIljuType("임자-m")!.stemElement + " · v2"}</p>
      </div>
    ),
  },
  {
    id: "임자-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M30 100 C60 70 100 130 170 100" stroke="#60A5FA" strokeWidth="2" opacity="0.15" fill="none" />
              <path d="M40 140 C70 110 110 160 160 140" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" fill="none" />
              <path d="M100 50 C100 50 90 62 90 68 A10 10 0 0 0 110 68 C110 62 100 50 100 50Z" fill="#60A5FA" opacity="0.15" />
              <path d="M155 50 L158 40 L161 50 L171 50 L163 56 L166 66 L158 60 L150 66 L153 56 L145 50 Z" fill="#60A5FA" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임자-f")!.emoji} {getIljuType("임자-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("임자-f")!.id} · {getIljuType("임자-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "계축-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 물결 */}
              <path d="M0 165 Q50 155 100 165 Q150 175 200 165" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" fill="none" />
              {/* 망치 그림자 */}
              <rect x="160" y="140" width="20" height="6" rx="2" fill="#60A5FA" opacity="0.08" transform="rotate(-20 170 143)" />
              <rect x="166" y="120" width="6" height="20" rx="1" fill="#60A5FA" opacity="0.06" transform="rotate(-20 169 130)" />
              {/* 스파클 */}
              <path d="M30 50 L32 56 L38 58 L32 60 L30 66 L28 60 L22 58 L28 56 Z" fill="#60A5FA" opacity="0.12" />
              {/* 발자국 */}
              <ellipse cx="165" cy="170" rx="6" ry="4" fill="#60A5FA" opacity="0.07" />
              <ellipse cx="175" cy="165" rx="6" ry="4" fill="#60A5FA" opacity="0.07" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
              {/* 콧대 */}
              <path d="M40 42 Q39 45 41 47" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계축-m")!.emoji} {getIljuType("계축-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("계축-m")!.id} · {getIljuType("계축-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "계축-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 악보 라인 */}
              <line x1="20" y1="140" x2="180" y2="140" stroke="#60A5FA" strokeWidth="0.8" opacity="0.1" />
              <line x1="20" y1="147" x2="180" y2="147" stroke="#60A5FA" strokeWidth="0.8" opacity="0.1" />
              <line x1="20" y1="154" x2="180" y2="154" stroke="#60A5FA" strokeWidth="0.8" opacity="0.1" />
              <line x1="20" y1="161" x2="180" y2="161" stroke="#60A5FA" strokeWidth="0.8" opacity="0.1" />
              <line x1="20" y1="168" x2="180" y2="168" stroke="#60A5FA" strokeWidth="0.8" opacity="0.1" />
              {/* 음표 */}
              <path d="M30 50 L30 38 L38 36 L38 48" stroke="#60A5FA" strokeWidth="1" fill="none" opacity="0.1" />
              <circle cx="28" cy="51" r="2.5" fill="#60A5FA" opacity="0.1" />
              <circle cx="36" cy="49" r="2.5" fill="#60A5FA" opacity="0.1" />
              {/* 물결 */}
              <path d="M0 120 Q50 110 100 120 Q150 130 200 120" stroke="#60A5FA" strokeWidth="1" opacity="0.08" fill="none" />
              {/* 스파클 */}
              <path d="M165 50 L167 56 L173 58 L167 60 L165 66 L163 60 L157 58 L163 56 Z" fill="#FACC15" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 왼팔 + 빨간 100점 종이 */}
              {/* 헤어 — 단발 다크네이비, closed Z */}
              <path d="M22 34 Q20 14 40 12 Q60 14 58 34 Q56 46 56 52 Q48 58 40 58 Q32 58 24 52 Q22 46 22 34 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5" />
              <path d="M32 18 Q33 24 31 29" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.6" />
              <path d="M48 18 Q47 24 49 29" stroke="#475569" strokeWidth="0.8" fill="none" opacity="0.6" />
              {/* 음표 핀 — 에이스 */}
              <line x1="52" y1="20" x2="52" y2="13" stroke="#FACC15" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="50.5" cy="20.5" r="1.6" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 눈썹 — 차분한 에이스 */}
              <path d="M30 29 Q34 27.5 37 29" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M43 29 Q46 27.5 50 29" stroke="#2D2D2D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* 속눈썹 */}
              <path d="M31 31.5 Q34 30 37 31.5" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              <path d="M43 31.5 Q46 30 49 31.5" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              {/* 눈 — 맑고 또렷한 */}
              <circle cx="33" cy="33.5" r="3" fill="#2D2D2D" />
              <circle cx="47" cy="33.5" r="3" fill="#2D2D2D" />
              <circle cx="34.2" cy="32.3" r="1.2" fill="white" />
              <circle cx="48.2" cy="32.3" r="1.2" fill="white" />
              {/* 입 — 옅은 미소 (손가락 뒤) */}
              <path d="M37 42 Q40 44 43 42" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              {/* 볼터치 — 은은하게 */}
              <ellipse cx="28" cy="38" rx="3.5" ry="2" fill="#93C5FD" opacity="0.35" />
              <ellipse cx="52" cy="38" rx="3.5" ry="2" fill="#93C5FD" opacity="0.35" />
              {/* 몸통 */}
              <path d="M28 52 Q26 56 26 72 L54 72 Q54 56 52 52 Q46 50 40 50 Q34 50 28 52Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 왼팔 */}
              <path d="M28 56 Q18 54 14 58" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* 빨간 100점 종이 — 왼손 (1.5배 크게) */}
              <rect x="0" y="49" width="24" height="30" rx="2" fill="white" stroke="#EF4444" strokeWidth="2" />
              <text x="12" y="61" fontSize="8" fill="#EF4444" fontWeight="bold" textAnchor="middle">100</text>
              <text x="12" y="71" fontSize="7" fill="#EF4444" fontWeight="bold" textAnchor="middle">점!</text>
              {/* 쉿 제스처 — 오른손 (입 앞으로) */}
              <path d="M52 54 Q48 46 42 41" stroke="#FDDCB5" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M52 54 Q48 46 42 41" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <ellipse cx="40" cy="40" rx="3.5" ry="2.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계축-f")!.emoji} {getIljuType("계축-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("계축-f")!.id} · {getIljuType("계축-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "임술-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 전구 반짝임 */}
              <circle cx="170" cy="40" r="8" stroke="#FACC15" strokeWidth="1" opacity="0.15" fill="none" />
              <line x1="170" y1="30" x2="170" y2="26" stroke="#FACC15" strokeWidth="1" opacity="0.15" />
              <line x1="178" y1="40" x2="182" y2="40" stroke="#FACC15" strokeWidth="1" opacity="0.15" />
              <line x1="176" y1="34" x2="179" y2="31" stroke="#FACC15" strokeWidth="1" opacity="0.12" />
              {/* 물방울 */}
              <path d="M30 50 C30 50 26 42 26 38 A4 4 0 0 1 34 38 C34 42 30 50 30 50Z" fill="#60A5FA" opacity="0.1" />
              <path d="M165 155 C165 155 163 150 163 148 A2 2 0 0 1 167 148 C167 150 165 155 165 155Z" fill="#60A5FA" opacity="0.08" />
              {/* 수식 문자 */}
              <path d="M25 140 L33 134 M28 134 L30 140" stroke="#60A5FA" strokeWidth="0.8" opacity="0.1" strokeLinecap="round" />
              {/* 스파클 */}
              <path d="M165 110 L167 116 L173 118 L167 120 L165 126 L163 120 L157 118 L163 116 Z" fill="#FACC15" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임술-m")!.emoji} {getIljuType("임술-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("임술-m")!.id} · {getIljuType("임술-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "임술-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 전구들 */}
              <circle cx="30" cy="50" r="7" fill="#FACC15" opacity="0.12" />
              <line x1="30" y1="57" x2="30" y2="62" stroke="#FACC15" strokeWidth="1.2" opacity="0.12" />
              <circle cx="170" cy="60" r="5" fill="#FACC15" opacity="0.1" />
              <line x1="170" y1="65" x2="170" y2="69" stroke="#FACC15" strokeWidth="1" opacity="0.1" />
              <circle cx="155" cy="155" r="6" fill="#FACC15" opacity="0.1" />
              {/* 물방울 */}
              <path d="M170 130 C170 130 162 120 162 115 A8 8 0 0 1 178 115 C178 120 170 130 170 130Z" fill="#60A5FA" opacity="0.1" />
              {/* 스파클 */}
              <path d="M40 155 L42 161 L48 163 L42 165 L40 171 L38 165 L32 163 L38 161 Z" fill="#FACC15" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
              <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임술-f")!.emoji} {getIljuType("임술-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("임술-f")!.id} · {getIljuType("임술-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "계해-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <circle cx="100" cy="100" r="70" stroke="#60A5FA" strokeWidth="1" opacity="0.08" fill="none" />
            <circle cx="100" cy="100" r="50" stroke="#60A5FA" strokeWidth="1" opacity="0.1" fill="none" />
            <circle cx="100" cy="100" r="30" stroke="#60A5FA" strokeWidth="1" opacity="0.12" fill="none" />
            <path d="M40 40 L50 30 L50 50 Z" fill="#60A5FA" opacity="0.12" />
            <path d="M150 150 L160 140 L160 160 Z" fill="#60A5FA" opacity="0.1" />
            <circle cx="155" cy="55" r="6" fill="#60A5FA" opacity="0.12" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
            {/* 콧대 */}
            <path d="M40 36 Q39 39 41 41" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계해-m")!.emoji + " " + getIljuType("계해-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("계해-m")!.id + " · " + getIljuType("계해-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "계해-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M100 50 C100 50 82 68 82 80 A18 18 0 0 0 118 80 C118 68 100 50 100 50Z" fill="#60A5FA" opacity="0.12" />
              <path d="M50 130 C50 130 38 144 38 152 A14 14 0 0 0 62 152 C62 144 50 130 50 130Z" fill="#60A5FA" opacity="0.1" />
              <path d="M155 50 L158 40 L161 50 L171 50 L163 56 L166 66 L158 60 L150 66 L153 56 L145 50 Z" fill="#60A5FA" opacity="0.12" />
              <path d="M30 60 Q40 50 50 60 Q40 70 30 60Z" fill="#F9A8D4" opacity="0.15" />
              <path d="M140 140 Q150 130 160 140 Q150 150 140 140Z" fill="#C4B5FD" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="water" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("계해-f")!.emoji} {getIljuType("계해-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("계해-f")!.id} · {getIljuType("계해-f")!.stemElement}</p>
        </div>
    ),
  },
];

export const WATER_CHARACTER_MAP: Record<string, React.ReactNode> =
  Object.fromEntries(_WaterChars.map(e => [e.id, e.node]));

export function WaterCharacters() {
  return (
    <>
      {_WaterChars.map(e => (
        <div key={e.id} id={`card-${e.id}`} data-gender={e.id.endsWith("-f") ? "female" : "male"} className="ilju-card scroll-mt-24">{e.node}</div>
      ))}
    </>
  );
}