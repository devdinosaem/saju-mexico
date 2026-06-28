import React from "react";
import { getIljuType } from "@/lib/ilju-types";
import { ElementBadge, SHOW_ELEMENT_BADGE } from "./characters-shared";

// 토(土) 일주 캐릭터 — 토049~토072
// 무인, 기묘, 무자, 기축, 무술, 기해, 무신, 기유, 무오, 기미, 무진, 기사

const _EarthChars: Array<{id: string; node: React.ReactNode}> = [
  {
    id: "무인-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M0 180 L50 100 L80 130 L120 70 L160 110 L200 80 L200 200 L0 200 Z" fill="#FBBF24" opacity="0.07" />
            <path d="M20 170 Q60 140 90 150 Q120 160 140 130 Q160 100 180 110" stroke="#FBBF24" strokeWidth="1.5" opacity="0.1" fill="none" strokeLinecap="round" strokeDasharray="4 3" />
            <path d="M30 60 L32 66 L38 68 L32 70 L30 76 L28 70 L22 68 L28 66 Z" fill="#FACC15" opacity="0.18" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무인-m")!.emoji + " " + getIljuType("무인-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("무인-m")!.id + " · " + getIljuType("무인-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "무인-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 발자국 */}
              <ellipse cx="50" cy="170" rx="6" ry="4" fill="#FBBF24" opacity="0.12" />
              <ellipse cx="65" cy="160" rx="6" ry="4" fill="#FBBF24" opacity="0.10" />
              <ellipse cx="80" cy="172" rx="6" ry="4" fill="#FBBF24" opacity="0.08" />
              {/* 하트 방패 */}
              <path d="M150 50 C144 44 135 44 135 52 C135 44 126 44 120 50 C114 60 135 72 135 72 C135 72 156 60 150 50Z" fill="#FBBF24" opacity="0.1" />
              {/* 스파클 */}
              <path d="M30 80 L32 86 L38 88 L32 90 L30 96 L28 90 L22 88 L28 86 Z" fill="#FACC15" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무인-f")!.emoji} {getIljuType("무인-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("무인-f")!.id} · {getIljuType("무인-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "기묘-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 밀밭 실루엣 */}
              <path d="M0 180 Q10 160 20 150 Q25 160 30 150 Q35 160 40 150 Q45 160 50 150 Q55 140 60 150 Q65 160 70 150" stroke="#FBBF24" strokeWidth="1.5" opacity="0.1" fill="none" strokeLinecap="round" />
              <path d="M130 180 Q140 160 150 150 Q155 160 160 150 Q165 140 170 150 Q175 160 180 150 Q185 140 190 150 Q195 160 200 150" stroke="#FBBF24" strokeWidth="1.5" opacity="0.08" fill="none" strokeLinecap="round" />
              {/* 이어폰 선 */}
              <path d="M95 80 Q100 90 105 80" stroke="#2D2D2D" strokeWidth="1" opacity="0.1" fill="none" />
              {/* 스파클 */}
              <path d="M155 160 L157 166 L163 168 L157 170 L155 176 L153 170 L147 168 L153 166 Z" fill="#FACC15" opacity="0.15" />
              {/* 풀잎 */}
              <path d="M160 100 Q162 90 166 95 Q162 100 160 100Z" fill="#FBBF24" opacity="0.12" />
              <path d="M168 100 Q172 88 176 94 Q172 100 168 100Z" fill="#FBBF24" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기묘-m")!.emoji} {getIljuType("기묘-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("기묘-m")!.id} · {getIljuType("기묘-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "기묘-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="30" cy="30" r="18" fill="#FBBF24" opacity="0.1" />
              <circle cx="170" cy="60" r="12" fill="#FBBF24" opacity="0.08" />
              <path d="M80 160 Q90 150 100 160 Q110 150 120 160" stroke="#FBBF24" strokeWidth="1.5" opacity="0.12" fill="none" strokeLinecap="round" />
              <path d="M150 120 L152 126 L158 128 L152 130 L150 136 L148 130 L142 128 L148 126 Z" fill="#FACC15" opacity="0.15" />
              <path d="M40 130 Q44 120 48 125 Q44 130 40 130Z" fill="#4ADE80" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기묘-f")!.emoji} {getIljuType("기묘-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("기묘-f")!.id} · {getIljuType("기묘-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "무자-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <line x1="100" y1="18" x2="100" y2="48" stroke="#FCD34D" strokeWidth="2" opacity="0.12" />
            <line x1="62" y1="35" x2="80" y2="58" stroke="#FCD34D" strokeWidth="1.5" opacity="0.1" />
            <line x1="138" y1="35" x2="120" y2="58" stroke="#FCD34D" strokeWidth="1.5" opacity="0.1" />
            <line x1="42" y1="70" x2="66" y2="80" stroke="#FCD34D" strokeWidth="1.2" opacity="0.08" />
            <line x1="158" y1="70" x2="134" y2="80" stroke="#FCD34D" strokeWidth="1.2" opacity="0.08" />
            <path d="M100 188 Q90 172 100 162 Q110 172 100 188Z" fill="#F9A8D4" opacity="0.12" />
            <path d="M82 185 Q78 170 92 165 Q96 177 82 185Z" fill="#F9A8D4" opacity="0.1" />
            <path d="M118 185 Q122 170 108 165 Q104 177 118 185Z" fill="#F9A8D4" opacity="0.1" />
            <circle cx="150" cy="60" r="22" stroke="#F87171" strokeWidth="1" opacity="0.06" fill="none" />
            <path d="M30 50 L32 56 L38 58 L32 60 L30 66 L28 60 L22 58 L28 56 Z" fill="#FBBF24" opacity="0.13" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무자-m")!.emoji + " " + getIljuType("무자-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("무자-m")!.id + " · " + getIljuType("무자-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "무자-f",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M150 40 Q158 36 166 40" stroke="#94A3B8" strokeWidth="1.5" opacity="0.1" fill="none" strokeLinecap="round" />
            <circle cx="40" cy="55" r="9" stroke="#94A3B8" strokeWidth="1" opacity="0.08" fill="none" />
            <path d="M30 150 L33 156 L39 158 L33 160 L30 166 L27 160 L21 158 L27 156 Z" fill="#FBBF24" opacity="0.1" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무자-f")!.emoji + " " + getIljuType("무자-f")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("무자-f")!.id + " · " + getIljuType("무자-f")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "기축-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <ellipse cx="100" cy="140" rx="60" ry="20" fill="#FBBF24" opacity="0.08" />
              <circle cx="160" cy="50" r="22" fill="#FEF3C7" opacity="0.2" />
              <path d="M30 90 L40 70 L50 90 Z" fill="#FBBF24" opacity="0.1" />
              <path d="M60 170 L170 170" stroke="#FBBF24" strokeWidth="1" opacity="0.1" strokeLinecap="round" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기축-m")!.emoji} {getIljuType("기축-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("기축-m")!.id} · {getIljuType("기축-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "기축-f",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <rect x="22" y="150" width="16" height="9" rx="1" fill="#C2410C" opacity="0.09" />
            <rect x="40" y="150" width="16" height="9" rx="1" fill="#DC2626" opacity="0.08" />
            <path d="M160 50 L162 56 L168 58 L162 60 L160 66 L158 60 L152 58 L158 56 Z" fill="#FBBF24" opacity="0.15" />
            <path d="M150 150 L153 156 L159 158 L153 160 L150 166 L147 160 L141 158 L147 156 Z" fill="#FBBF24" opacity="0.1" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기축-f")!.emoji + " " + getIljuType("기축-f")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("기축-f")!.id + " · " + getIljuType("기축-f")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "무술-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <rect x="20" y="20" width="160" height="160" rx="20" stroke="#FBBF24" strokeWidth="1" opacity="0.08" fill="none" />
              <rect x="40" y="40" width="120" height="120" rx="15" stroke="#FBBF24" strokeWidth="1" opacity="0.06" fill="none" />
              <path d="M30 170 L80 120 L130 170" fill="#FEF3C7" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무술-m")!.emoji} {getIljuType("무술-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("무술-m")!.id} · {getIljuType("무술-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "무술-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M85 30 C85 30 75 45 75 55 A25 25 0 0 0 115 55 C115 45 85 30 85 30Z" fill="#FBBF24" opacity="0.1" />
              <path d="M100 140 C100 140 90 155 90 165 A20 20 0 0 0 110 165 C110 155 100 140 100 140Z" fill="#FBBF24" opacity="0.08" />
              <path d="M155 120 L158 110 L161 120 L171 120 L163 126 L166 136 L158 130 L150 136 L153 126 L145 120 Z" fill="#FBBF24" opacity="0.12" />
              <circle cx="30" cy="150" r="14" fill="#FEF3C7" opacity="0.2" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무술-f")!.emoji} {getIljuType("무술-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("무술-f")!.id} · {getIljuType("무술-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "기해-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M100 20 C100 20 80 50 80 70 A30 30 0 0 0 120 70 C120 50 100 20 100 20Z" fill="#60A5FA" opacity="0.08" />
              <path d="M30 80 L170 80" stroke="#FBBF24" strokeWidth="1" opacity="0.1" strokeDasharray="5 5" />
              <path d="M155 140 L159 128 L163 140 L175 140 L165 147 L169 159 L159 152 L149 159 L153 147 L143 140 Z" fill="#FBBF24" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기해-m")!.emoji} {getIljuType("기해-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("기해-m")!.id} · {getIljuType("기해-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "기해-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M100 10 L180 100 L100 190 L20 100 Z" stroke="#FBBF24" strokeWidth="1" opacity="0.08" fill="none" />
              <path d="M100 40 L150 100 L100 160 L50 100 Z" stroke="#FBBF24" strokeWidth="1" opacity="0.06" fill="none" />
              <path d="M40 160 L160 160" stroke="#FBBF24" strokeWidth="1.5" opacity="0.1" strokeLinecap="round" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기해-f")!.emoji} {getIljuType("기해-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("기해-f")!.id} · {getIljuType("기해-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "무신-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <rect x="60" y="80" width="30" height="20" rx="3" stroke="#FBBF24" strokeWidth="1.5" opacity="0.15" fill="none" />
              <rect x="110" y="70" width="30" height="20" rx="3" stroke="#FBBF24" strokeWidth="1.5" opacity="0.12" fill="none" />
              <path d="M88 90 L112 80" stroke="#FBBF24" strokeWidth="1" opacity="0.15" strokeDasharray="3 2" />
              <circle cx="140" cy="140" r="15" stroke="#94A3B8" strokeWidth="1" opacity="0.12" fill="none" />
              <path d="M30 150 L50 130 L60 145 L80 120" stroke="#4ADE80" strokeWidth="1.5" opacity="0.12" fill="none" strokeLinecap="round" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무신-m")!.emoji} {getIljuType("무신-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("무신-m")!.id} · {getIljuType("무신-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "무신-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <rect x="40" y="60" width="40" height="5" rx="2" fill="#FBBF24" opacity="0.2" />
              <rect x="40" y="72" width="60" height="5" rx="2" fill="#FBBF24" opacity="0.15" />
              <rect x="40" y="84" width="50" height="5" rx="2" fill="#FBBF24" opacity="0.12" />
              <path d="M130 80 L140 70 L145 80 L155 80 L147 87 L150 97 L140 91 L130 97 L133 87 L125 80 Z" fill="#FBBF24" opacity="0.15" />
              <circle cx="160" cy="50" r="10" stroke="#FBBF24" strokeWidth="1.5" opacity="0.12" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무신-f")!.emoji} {getIljuType("무신-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("무신-f")!.id} · {getIljuType("무신-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "기유-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="100" cy="100" r="50" stroke="#FBBF24" strokeWidth="2" opacity="0.12" fill="none" />
              <circle cx="100" cy="100" r="30" stroke="#FBBF24" strokeWidth="1.5" opacity="0.1" fill="none" />
              <path d="M40 60 Q50 40 60 60 Q50 80 40 60Z" fill="#4ADE80" opacity="0.12" />
              <path d="M140 140 Q150 120 160 140 Q150 160 140 140Z" fill="#4ADE80" opacity="0.1" />
              <path d="M155 55 L158 45 L161 55 L171 55 L163 61 L166 71 L158 65 L150 71 L153 61 L145 55 Z" fill="#FBBF24" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기유-m")!.emoji} {getIljuType("기유-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("기유-m")!.id} · {getIljuType("기유-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "기유-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M155 50 L158 40 L161 50 L171 50 L163 56 L166 66 L158 60 L150 66 L153 56 L145 50 Z" fill="#FBBF24" opacity="0.15" />
              <path d="M40 130 L43 120 L46 130 L56 130 L48 136 L51 146 L43 140 L35 146 L38 136 L30 130 Z" fill="#FBBF24" opacity="0.12" />
              <circle cx="100" cy="80" r="25" stroke="#94A3B8" strokeWidth="1" opacity="0.12" fill="none" />
              <path d="M80 160 Q100 148 120 160 Q100 172 80 160Z" fill="#F9A8D4" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기유-f")!.emoji} {getIljuType("기유-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("기유-f")!.id} · {getIljuType("기유-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "무오-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 빗자루 아이콘 */}
              <path d="M40 60 L80 140" stroke="#FBBF24" strokeWidth="3" opacity="0.12" strokeLinecap="round" />
              <path d="M36 138 Q60 150 84 138 Q80 130 60 132 Q40 130 36 138Z" fill="#FBBF24" opacity="0.12" />
              {/* 하트들 */}
              <path d="M150 40 Q155 30 165 40 Q175 30 180 40 Q180 55 165 65 Q150 55 150 40Z" fill="#FDE68A" opacity="0.15" />
              <path d="M120 160 Q123 155 128 160 Q133 155 136 160 Q136 168 128 173 Q120 168 120 160Z" fill="#FDE68A" opacity="0.12" />
              {/* 스파클 */}
              <circle cx="30" cy="170" r="3" fill="#FBBF24" opacity="0.13" />
              <circle cx="170" cy="80" r="2.5" fill="#FBBF24" opacity="0.13" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무오-m")!.emoji} {getIljuType("무오-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("무오-m")!.id} · {getIljuType("무오-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "무오-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 하트 (따뜻함) */}
              <path d="M30 45 C30 45 27 41 27 39 A2 2 0 0 1 30 38 A2 2 0 0 1 33 39 C33 41 30 45 30 45Z" fill="#FB923C" opacity="0.15" />
              <path d="M170 55 C170 55 168 52 168 50.5 A1.5 1.5 0 0 1 170 49.5 A1.5 1.5 0 0 1 172 50.5 C172 52 170 55 170 55Z" fill="#FB923C" opacity="0.12" />
              {/* 별 */}
              <path d="M160 140 L162 146 L168 148 L162 150 L160 156 L158 150 L152 148 L158 146 Z" fill="#FACC15" opacity="0.15" />
              <path d="M35 155 L36 158 L39 159 L36 160 L35 163 L34 160 L31 159 L34 158 Z" fill="#FACC15" opacity="0.12" />
              {/* 서류 라인 */}
              <rect x="20" y="100" width="14" height="18" rx="1" stroke="#FBBF24" strokeWidth="0.8" opacity="0.08" fill="none" />
              {/* 김이 올라오는 국솥 */}
              <path d="M155 160 Q158 155 161 160 Q164 155 167 160" stroke="#FBBF24" strokeWidth="1" opacity="0.1" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무오-f")!.emoji} {getIljuType("무오-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("무오-f")!.id} · {getIljuType("무오-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "기미-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 힐링 오라 원 */}
              <circle cx="100" cy="100" r="60" stroke="#4ADE80" strokeWidth="1" opacity="0.08" />
              <circle cx="100" cy="100" r="80" stroke="#4ADE80" strokeWidth="0.8" opacity="0.05" />
              {/* 하트 (힐링) */}
              <path d="M30 50 C30 50 27 46 27 44 A2 2 0 0 1 30 43 A2 2 0 0 1 33 44 C33 46 30 50 30 50Z" fill="#4ADE80" opacity="0.15" />
              <path d="M170 60 C170 60 168 57 168 55.5 A1.5 1.5 0 0 1 170 54.5 A1.5 1.5 0 0 1 172 55.5 C172 57 170 60 170 60Z" fill="#4ADE80" opacity="0.12" />
              {/* 구름 */}
              <ellipse cx="160" cy="160" rx="16" ry="7" fill="#FBBF24" opacity="0.06" />
              <ellipse cx="35" cy="155" rx="12" ry="5" fill="#FBBF24" opacity="0.05" />
              {/* 음표 */}
              <path d="M165 40 L165 30 L172 28 L172 38" stroke="#FBBF24" strokeWidth="1" fill="none" opacity="0.1" />
              <circle cx="163" cy="41" r="2" fill="#FBBF24" opacity="0.1" />
              <circle cx="170" cy="39" r="2" fill="#FBBF24" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기미-m")!.emoji} {getIljuType("기미-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("기미-m")!.id} · {getIljuType("기미-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "기미-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 배터리 아이콘 */}
              <rect x="20" y="130" width="30" height="20" rx="3" stroke="#FBBF24" strokeWidth="1.5" opacity="0.15" fill="none" />
              <rect x="50" y="136" width="5" height="8" rx="1.5" fill="#FBBF24" opacity="0.12" />
              <rect x="24" y="133" width="8" height="14" rx="1" fill="#4ADE80" opacity="0.12" />
              {/* 번개 */}
              <path d="M155 40 L151 54 L158 54 L154 68 L165 50 L158 50 L162 40 Z" fill="#FACC15" opacity="0.15" />
              <path d="M35 50 L33 56 L37 56 L35 62 L40 55 L36 55 L38 50 Z" fill="#FACC15" opacity="0.12" />
              {/* 하트들 */}
              <path d="M165 120 C165 120 160 114 160 110 A5 5 0 0 1 165 108 A5 5 0 0 1 170 110 C170 114 165 120 165 120Z" fill="#F9A8D4" opacity="0.18" />
              <path d="M30 80 C30 80 27 76 27 73.5 A2.5 2.5 0 0 1 30 72 A2.5 2.5 0 0 1 33 73.5 C33 76 30 80 30 80Z" fill="#F9A8D4" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기미-f")!.emoji} {getIljuType("기미-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("기미-f")!.id} · {getIljuType("기미-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "무진-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 산 모티프 */}
              <path d="M0 170 L60 100 L120 170 Z" fill="#FBBF24" opacity="0.07" />
              <path d="M80 170 L140 90 L200 170 Z" fill="#FBBF24" opacity="0.06" />
              {/* 오뚝이 실루엣 */}
              <ellipse cx="160" cy="150" rx="12" ry="18" fill="#FBBF24" opacity="0.1" />
              <circle cx="160" cy="128" r="8" fill="#FBBF24" opacity="0.1" />
              {/* 스파클 */}
              <path d="M30 50 L32 56 L38 58 L32 60 L30 66 L28 60 L22 58 L28 56 Z" fill="#FBBF24" opacity="0.14" />
              {/* 수평선 */}
              <line x1="0" y1="160" x2="200" y2="160" stroke="#FBBF24" strokeWidth="1.5" opacity="0.1" strokeLinecap="round" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무진-m")!.emoji} {getIljuType("무진-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("무진-m")!.id} · {getIljuType("무진-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "무진-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 하트들 (포근함) */}
              <path d="M30 35 C30 35 27 31 27 29 A2 2 0 0 1 30 28 A2 2 0 0 1 33 29 C33 31 30 35 30 35Z" fill="#FB923C" opacity="0.15" />
              <path d="M170 45 C170 45 168 42 168 40.5 A1.5 1.5 0 0 1 170 39.5 A1.5 1.5 0 0 1 172 40.5 C172 42 170 45 170 45Z" fill="#FB923C" opacity="0.12" />
              <path d="M155 155 C155 155 152 151 152 149 A2 2 0 0 1 155 148 A2 2 0 0 1 158 149 C158 151 155 155 155 155Z" fill="#E84B6A" opacity="0.1" />
              {/* 별 (따뜻함) */}
              <path d="M165 80 L167 86 L173 88 L167 90 L165 96 L163 90 L157 88 L163 86 Z" fill="#FACC15" opacity="0.15" />
              <path d="M25 140 L26 143 L29 144 L26 145 L25 148 L24 145 L21 144 L24 143 Z" fill="#FACC15" opacity="0.12" />
              {/* 구름 (포근) */}
              <ellipse cx="160" cy="170" rx="18" ry="8" fill="#FBBF24" opacity="0.06" />
              <ellipse cx="40" cy="170" rx="14" ry="6" fill="#FBBF24" opacity="0.05" />
              {/* 음표 (평온한 bgm) */}
              <path d="M35 75 L35 65 L42 63 L42 73" stroke="#FBBF24" strokeWidth="1" fill="none" opacity="0.12" />
              <circle cx="33" cy="76" r="2" fill="#FBBF24" opacity="0.12" />
              <circle cx="40" cy="74" r="2" fill="#FBBF24" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("무진-f")!.emoji} {getIljuType("무진-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("무진-f")!.id} · {getIljuType("무진-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "기사-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 체스보드 패턴 */}
              <rect x="20" y="150" width="12" height="12" fill="#FBBF24" opacity="0.08" />
              <rect x="32" y="150" width="12" height="12" fill="#FBBF24" opacity="0.04" />
              <rect x="20" y="162" width="12" height="12" fill="#FBBF24" opacity="0.04" />
              <rect x="32" y="162" width="12" height="12" fill="#FBBF24" opacity="0.08" />
              {/* 기어 */}
              <circle cx="170" cy="50" r="10" stroke="#FBBF24" strokeWidth="1.5" opacity="0.12" fill="none" />
              <rect x="169" y="38" width="2" height="5" fill="#FBBF24" opacity="0.12" />
              <rect x="169" y="57" width="2" height="5" fill="#FBBF24" opacity="0.12" />
              <rect x="158" y="49" width="5" height="2" fill="#FBBF24" opacity="0.12" />
              <rect x="177" y="49" width="5" height="2" fill="#FBBF24" opacity="0.12" />
              {/* 뱀 S 무늬 */}
              <path d="M165 140 Q175 130 170 150 Q165 170 175 160" stroke="#4ADE80" strokeWidth="1.5" opacity="0.1" fill="none" />
              {/* 스파클 */}
              <path d="M30 40 L31.5 44 L35.5 45.5 L31.5 47 L30 51 L28.5 47 L24.5 45.5 L28.5 44 Z" fill="#FACC15" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기사-m")!.emoji} {getIljuType("기사-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("기사-m")!.id} · {getIljuType("기사-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "기사-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 체스판 패턴 */}
              <rect x="110" y="110" width="18" height="18" fill="#FBBF24" opacity="0.1" />
              <rect x="128" y="110" width="18" height="18" fill="#92400E" opacity="0.07" />
              <rect x="110" y="128" width="18" height="18" fill="#92400E" opacity="0.07" />
              <rect x="128" y="128" width="18" height="18" fill="#FBBF24" opacity="0.1" />
              <rect x="146" y="110" width="18" height="18" fill="#FBBF24" opacity="0.1" />
              <rect x="146" y="128" width="18" height="18" fill="#FBBF24" opacity="0.1" />
              {/* 왕관/리본 */}
              <path d="M40 40 Q50 20 60 40 Q70 20 80 40" stroke="#FBBF24" strokeWidth="2" opacity="0.15" fill="none" />
              {/* 별 */}
              <circle cx="30" cy="30" r="3" fill="#FBBF24" opacity="0.15" />
              <circle cx="170" cy="50" r="2" fill="#FBBF24" opacity="0.13" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="earth" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("기사-f")!.emoji} {getIljuType("기사-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("기사-f")!.id} · {getIljuType("기사-f")!.stemElement}</p>
        </div>
    ),
  },
];

export const EARTH_CHARACTER_MAP: Record<string, React.ReactNode> =
  Object.fromEntries(_EarthChars.map(e => [e.id, e.node]));

export function EarthCharacters() {
  return (
    <>
      {_EarthChars.map(e => (
        <div key={e.id} id={`card-${e.id}`} data-gender={e.id.endsWith("-f") ? "female" : "male"} className="ilju-card scroll-mt-24">{e.node}</div>
      ))}
    </>
  );
}