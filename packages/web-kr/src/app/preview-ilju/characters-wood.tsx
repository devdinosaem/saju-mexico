import React from "react";
import { getIljuType } from "@/lib/ilju-types";
import { ElementBadge, SHOW_ELEMENT_BADGE } from "./characters-shared";

// 목(木) 일주 캐릭터 — 목001~목024
// 갑자, 을축, 갑술, 을해, 갑신, 을유, 갑오, 을미, 갑진, 을사, 갑인, 을묘

const _WoodChars: Array<{id: string; node: React.ReactNode}> = [
  {
    id: "갑자-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <circle cx="160" cy="140" r="12" fill="#E5E5E5" opacity="0.3" />
            <circle cx="175" cy="125" r="8" fill="#E5E5E5" opacity="0.2" />
            <path d="M20 100 L50 100" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" opacity="0.2" />
            <path d="M45 95 L55 100 L45 105" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.2" />
            <path d="M170 40 L172 46 L178 48 L172 50 L170 56 L168 50 L162 48 L168 46 Z" fill="#FACC15" opacity="0.3" />
            <path d="M0 175 Q50 170 100 175 Q150 180 200 175 L200 200 L0 200 Z" fill="#D4A853" opacity="0.1" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑자-m")!.emoji + " " + getIljuType("갑자-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("갑자-m")!.id + " · " + getIljuType("갑자-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "갑자-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 별 */}
              <path d="M168 42 L170 48 L176 50 L170 52 L168 58 L166 52 L160 50 L166 48 Z" fill="#FACC15" opacity="0.17" />
              <path d="M28 52 L29.5 56 L33.5 57.5 L29.5 59 L28 63 L26.5 59 L22.5 57.5 L26.5 56 Z" fill="#FACC15" opacity="0.13" />
              {/* 구름 */}
              <ellipse cx="152" cy="152" rx="18" ry="9" fill="#4ADE80" opacity="0.07" />
              <ellipse cx="165" cy="145" rx="10" ry="6" fill="#4ADE80" opacity="0.05" />
              {/* 꽃 */}
              <circle cx="38" cy="158" r="5" fill="#F9A8D4" opacity="0.1" />
              <circle cx="30" cy="162" r="3.5" fill="#F9A8D4" opacity="0.08" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑자-f")!.emoji} {getIljuType("갑자-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("갑자-f")!.id} · {getIljuType("갑자-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "을축-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 뒤에 큰 나무 실루엣 (미래) */}
              <path d="M85 170 L85 120 Q85 80 100 60 Q115 80 115 120 L115 170 Z" fill="#4ADE80" opacity="0.07" />
              <ellipse cx="100" cy="55" rx="28" ry="35" fill="#4ADE80" opacity="0.07" />
              {/* 새싹 */}
              <path d="M30 160 Q34 152 38 160 Q34 168 30 160Z" fill="#4ADE80" opacity="0.15" />
              <path d="M165 55 Q169 48 173 55 Q169 62 165 55Z" fill="#4ADE80" opacity="0.12" />
              {/* 스파클 */}
              <path d="M30 80 L32 86 L38 88 L32 90 L30 96 L28 90 L22 88 L28 86 Z" fill="#FACC15" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을축-m")!.emoji} {getIljuType("을축-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("을축-m")!.id} · {getIljuType("을축-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "을축-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 달팽이 껍질 나선 흔적 */}
              <path d="M30 150 Q60 130 90 150 Q120 170 150 150" stroke="#4ADE80" strokeWidth="1.5" opacity="0.1" fill="none" />
              {/* 결승선 깃발 */}
              <line x1="165" y1="40" x2="165" y2="80" stroke="#2D2D2D" strokeWidth="1.5" opacity="0.12" />
              <rect x="165" y="40" width="18" height="12" rx="2" fill="#F87171" opacity="0.12" />
              <line x1="168" y1="43" x2="180" y2="43" stroke="white" strokeWidth="0.8" opacity="0.3" />
              <line x1="165" y1="49" x2="183" y2="49" stroke="white" strokeWidth="0.8" opacity="0.3" />
              {/* 체크 표시 */}
              <path d="M30 60 L36 66 L46 52" stroke="#4ADE80" strokeWidth="1.5" opacity="0.12" strokeLinecap="round" strokeLinejoin="round" />
              {/* 스파클 */}
              <path d="M40 170 L42 176 L48 178 L42 180 L40 186 L38 180 L32 178 L38 176 Z" fill="#FACC15" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 헤어 — 양갈래 단발, 갈색 */}
              <path d="M22 30 Q22 10 40 8 Q58 10 58 30" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 왼쪽 갈래 */}
              <path d="M20 30 Q12 40 14 56 Q16 62 20 60 Q26 56 22 46 Q20 38 22 32 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 오른쪽 갈래 */}
              <path d="M60 30 Q68 40 66 56 Q64 62 60 60 Q54 56 58 46 Q60 38 58 32 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 묶음 */}
              <circle cx="21" cy="30" r="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
              <circle cx="59" cy="30" r="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="38" rx="15" ry="15" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.8" />
              {/* 속눈썹 */}
              <path d="M31 33 Q34 31 37 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M43 33 Q46 31 49 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 눈 */}
              <path d="M32 36 Q35 33 38 36" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M42 36 Q45 33 48 36" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* 눈썹 */}
              <path d="M30 31 Q34 29 38 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M42 31 Q46 29 50 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 입 */}
              <path d="M35 43 Q40 47 45 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 볼터치 */}
              <ellipse cx="29" cy="40" rx="4" ry="2.5" fill="#FB923C" opacity="0.4" />
              <ellipse cx="51" cy="40" rx="4" ry="2.5" fill="#FB923C" opacity="0.4" />
              {/* 몸통 — 노란 원피스 */}
              <path d="M28 54 Q26 58 26 72 L54 72 Q54 58 52 54 Q46 52 40 52 Q34 52 28 54Z" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 오른팔 — 칼 들기 */}
              <path d="M52 60 Q60 54 64 48" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* 칼 손잡이 */}
              <rect x="59" y="44" width="10" height="12" rx="2" fill="#B45309" stroke="#2D2D2D" strokeWidth="1.2" />
              {/* 칼 가드 */}
              <rect x="52" y="40" width="24" height="5" rx="2" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1" />
              {/* 칼날 — 3배 크게 */}
              <path d="M56 40 L64 2 L72 40 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" />
              <line x1="64" y1="6" x2="64" y2="36" stroke="white" strokeWidth="1.2" opacity="0.7" />
              {/* 꾸준 텍스트 — 3배 크게, 굵게 */}
              <g transform="translate(64, 6) rotate(90)">
                <text x="0" y="0" fontSize="13" fill="#1E293B" fontFamily="sans-serif" fontWeight="bold" dominantBaseline="middle">꾸준</text>
              </g>
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을축-f")!.emoji} {getIljuType("을축-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("을축-f")!.id} · {getIljuType("을축-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "갑술-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M20 50 Q30 40 40 50 Q30 60 20 50Z" fill="#4ADE80" opacity="0.15" />
            <path d="M165 60 Q172 52 180 60 Q172 68 165 60Z" fill="#4ADE80" opacity="0.12" />
            <path d="M155 145 Q163 137 170 145 Q163 153 155 145Z" fill="#4ADE80" opacity="0.1" />
            <path d="M20 160 Q60 130 100 150 Q140 170 180 140" stroke="#4ADE80" strokeWidth="2" opacity="0.1" fill="none" strokeDasharray="5 3" />
            <path d="M30 100 L32 106 L38 108 L32 110 L30 116 L28 110 L22 108 L28 106 Z" fill="#FACC15" opacity="0.15" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑술-m")!.emoji + " " + getIljuType("갑술-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("갑술-m")!.id + " · " + getIljuType("갑술-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "갑술-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 스파클들 */}
              <path d="M30 40 L32 46 L38 48 L32 50 L30 56 L28 50 L22 48 L28 46 Z" fill="#FACC15" opacity="0.18" />
              <path d="M165 50 L166.5 54 L170.5 55.5 L166.5 57 L165 61 L163.5 57 L159.5 55.5 L163.5 54 Z" fill="#FACC15" opacity="0.15" />
              <path d="M160 155 L161 157.5 L163.5 158.5 L161 159.5 L160 162 L159 159.5 L156.5 158.5 L159 157.5 Z" fill="#FACC15" opacity="0.12" />
              {/* 별 */}
              <path d="M175 120 L176 123 L179 124 L176 125 L175 128 L174 125 L171 124 L174 123 Z" fill="#4ADE80" opacity="0.15" />
              {/* 꼬리 흔적 */}
              <path d="M20 150 Q40 140 50 150 Q60 160 80 155" stroke="#4ADE80" strokeWidth="1" opacity="0.08" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑술-f")!.emoji} {getIljuType("갑술-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("갑술-f")!.id} · {getIljuType("갑술-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "을해-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 물결 */}
              <path d="M0 140 Q30 130 60 140 Q90 150 120 140 Q150 130 180 140 Q195 145 200 140" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" fill="none" />
              <path d="M0 155 Q30 145 60 155 Q90 165 120 155 Q150 145 180 155 Q195 160 200 155" stroke="#60A5FA" strokeWidth="1" opacity="0.07" fill="none" />
              {/* 나뭇잎들 */}
              <path d="M30 40 Q35 35 40 40 Q35 45 30 40Z" fill="#4ADE80" opacity="0.15" />
              <path d="M165 55 Q168 51 172 55 Q168 59 165 55Z" fill="#4ADE80" opacity="0.12" />
              <path d="M170 150 Q174 146 178 150 Q174 154 170 150Z" fill="#4ADE80" opacity="0.1" />
              {/* 스파클 */}
              <path d="M25 130 L26.5 134 L30.5 135.5 L26.5 137 L25 141 L23.5 137 L19.5 135.5 L23.5 134 Z" fill="#FACC15" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을해-m")!.emoji} {getIljuType("을해-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("을해-m")!.id} · {getIljuType("을해-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "을해-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 나비 실루엣 */}
              <path d="M80 90 Q60 70 40 80 Q60 100 80 90Z" fill="#4ADE80" opacity="0.08" />
              <path d="M80 90 Q100 70 120 80 Q100 100 80 90Z" fill="#4ADE80" opacity="0.08" />
              {/* 미니 사람 실루엣들 */}
              <circle cx="30" cy="50" r="5" fill="#4ADE80" opacity="0.1" />
              <rect x="27" y="55" width="6" height="8" rx="2" fill="#4ADE80" opacity="0.1" />
              <circle cx="160" cy="60" r="5" fill="#4ADE80" opacity="0.1" />
              <rect x="157" y="65" width="6" height="8" rx="2" fill="#4ADE80" opacity="0.1" />
              <circle cx="170" cy="140" r="5" fill="#4ADE80" opacity="0.1" />
              <rect x="167" y="145" width="6" height="8" rx="2" fill="#4ADE80" opacity="0.1" />
              {/* 스파클 */}
              <path d="M40 150 L42 156 L48 158 L42 160 L40 166 L38 160 L32 158 L38 156 Z" fill="#4ADE80" opacity="0.13" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 나비 — 머리 위에, 날개부터 그려야 앞에 표시 */}
              <path d="M30 8 Q22 2 24 10 Q30 14 34 12Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" />
              <path d="M50 8 Q58 2 56 10 Q50 14 46 12Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" />
              <path d="M32 12 Q30 16 34 16 Q36 14 34 12Z" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.8" />
              <path d="M48 12 Q50 16 46 16 Q44 14 46 12Z" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.8" />
              <line x1="40" y1="12" x2="38" y2="7" stroke="#2D2D2D" strokeWidth="0.8" />
              <line x1="40" y1="12" x2="42" y2="7" stroke="#2D2D2D" strokeWidth="0.8" />
              <circle cx="38" cy="6" r="1" fill="#2D2D2D" />
              <circle cx="42" cy="6" r="1" fill="#2D2D2D" />
              {/* 머리카락 — closed Z */}
              <path d="M22 32 Q20 14 40 12 Q60 14 58 32 Q58 46 56 52 Q48 60 40 60 Q32 60 24 52 Q22 46 22 32Z" fill="#2D2D2D" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="38" rx="15" ry="15" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.8" />
              {/* 눈 — 호기심 반짝 */}
              <circle cx="34" cy="35" r="3.5" fill="#2D2D2D" />
              <circle cx="46" cy="35" r="3.5" fill="#2D2D2D" />
              <circle cx="35.5" cy="33.5" r="1.5" fill="white" />
              <circle cx="47.5" cy="33.5" r="1.5" fill="white" />
              <circle cx="35" cy="33" r="0.6" fill="white" />
              <circle cx="47" cy="33" r="0.6" fill="white" />
              {/* 입 — 호기심 */}
              <path d="M34 43 Q40 48 46 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 볼터치 */}
              <ellipse cx="28" cy="40" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.55" />
              <ellipse cx="52" cy="40" rx="4" ry="2.5" fill="#F9A8D4" opacity="0.55" />
              {/* 몸통 — 주황색 */}
              <path d="M28 54 Q26 58 26 72 L54 72 Q54 58 52 54 Q46 52 40 52 Q34 52 28 54Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 왼팔 */}
              <path d="M28 58 Q18 56 12 56" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* 종이 — 왼손 (2배 크게) */}
              <rect x="-4" y="44" width="22" height="30" rx="1" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 접힌 귀퉁이 */}
              <path d="M16 44 L18 46 L16 46 Z" fill="#E5E7EB" stroke="#2D2D2D" strokeWidth="0.8" />
              {/* 졸라맨 */}
              <circle cx="7" cy="53" r="4" fill="none" stroke="#2D2D2D" strokeWidth="1.5" />
              <line x1="7" y1="57" x2="7" y2="65" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="7" y1="60" x2="1" y2="56" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="7" y1="60" x2="13" y2="56" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="7" y1="65" x2="2" y2="72" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="7" y1="65" x2="12" y2="72" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
              {/* 반기는 오른손 */}
              <path d="M52 58 L66 50" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M60 46 Q64 42 68 46" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을해-f")!.emoji} {getIljuType("을해-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("을해-f")!.id} · {getIljuType("을해-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "갑신-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <rect x="90" y="20" width="6" height="50" rx="3" fill="#4ADE80" opacity="0.12" />
              <rect x="20" y="80" width="6" height="40" rx="3" fill="#4ADE80" opacity="0.1" />
              <path d="M150 50 L154 38 L158 50 L170 50 L160 57 L164 69 L154 62 L144 69 L148 57 L138 50 Z" fill="#4ADE80" opacity="0.12" />
              <path d="M30 160 Q40 150 50 160 Q60 150 70 160" stroke="#4ADE80" strokeWidth="1.5" opacity="0.1" fill="none" strokeLinecap="round" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑신-m")!.emoji} {getIljuType("갑신-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("갑신-m")!.id} · {getIljuType("갑신-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "갑신-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M28 18 L32 10 L37 16 L40 8 L43 16 L48 10 L52 18 Z" fill="#FACC15" opacity="0.15" />
              <path d="M148 68 L152 60 L157 66 L160 58 L163 66 L168 60 L172 68 Z" fill="#4ADE80" opacity="0.1" />
              <circle cx="160" cy="150" r="20" fill="#D1FAE5" opacity="0.2" />
              <path d="M30 140 L40 120 L50 140 Z" fill="#4ADE80" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑신-f")!.emoji} {getIljuType("갑신-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("갑신-f")!.id} · {getIljuType("갑신-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "을유-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M100 10 L102 4 L104 10 L110 10 L105 14 L107 20 L102 16 L97 20 L99 14 L94 10 Z" fill="#4ADE80" opacity="0.15" />
              <path d="M30 80 L170 80" stroke="#4ADE80" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 4" />
              <path d="M30 100 L170 100" stroke="#4ADE80" strokeWidth="0.5" opacity="0.08" strokeDasharray="4 4" />
              <rect x="148" y="140" width="24" height="16" rx="3" fill="#D1FAE5" opacity="0.2" />
              <path d="M40 160 L60 160" stroke="#4ADE80" strokeWidth="1.5" opacity="0.12" strokeLinecap="round" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을유-m")!.emoji} {getIljuType("을유-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("을유-m")!.id} · {getIljuType("을유-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "을유-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="50" cy="50" r="25" stroke="#4ADE80" strokeWidth="1" opacity="0.1" fill="none" />
              <circle cx="50" cy="50" r="15" stroke="#4ADE80" strokeWidth="1" opacity="0.08" fill="none" />
              <path d="M140 40 L160 40 L160 60 L140 60 Z" fill="#D1FAE5" opacity="0.15" />
              <path d="M140 40 L150 30 L160 40" fill="#D1FAE5" opacity="0.1" />
              <path d="M30 150 L34 138 L38 150 L50 150 L40 157 L44 169 L34 162 L24 169 L28 157 L18 150 Z" fill="#4ADE80" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을유-f")!.emoji} {getIljuType("을유-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("을유-f")!.id} · {getIljuType("을유-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "갑오-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 폭죽 불꽃들 */}
              <circle cx="40" cy="40" r="3" fill="#4ADE80" opacity="0.18" />
              <circle cx="160" cy="35" r="4" fill="#FACC15" opacity="0.15" />
              <circle cx="20" cy="120" r="2.5" fill="#F87171" opacity="0.12" />
              <circle cx="170" cy="130" r="3" fill="#4ADE80" opacity="0.15" />
              {/* 방사 에너지 */}
              <line x1="100" y1="10" x2="100" y2="50" stroke="#4ADE80" strokeWidth="1.5" opacity="0.12" />
              <line x1="140" y1="20" x2="120" y2="55" stroke="#4ADE80" strokeWidth="1" opacity="0.1" />
              <line x1="60" y1="20" x2="80" y2="55" stroke="#4ADE80" strokeWidth="1" opacity="0.1" />
              <line x1="170" y1="60" x2="140" y2="80" stroke="#FACC15" strokeWidth="1" opacity="0.1" />
              <line x1="30" y1="60" x2="60" y2="80" stroke="#FACC15" strokeWidth="1" opacity="0.1" />
              {/* 별 파편 */}
              <circle cx="30" cy="170" r="4" fill="#4ADE80" opacity="0.12" />
              <circle cx="170" cy="160" r="3" fill="#FACC15" opacity="0.12" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑오-m")!.emoji} {getIljuType("갑오-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("갑오-m")!.id} · {getIljuType("갑오-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "갑오-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 스피드라인 */}
              <line x1="20" y1="80" x2="60" y2="80" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" opacity="0.12" />
              <line x1="20" y1="90" x2="50" y2="90" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" opacity="0.08" />
              {/* 큰 불꽃들 — 배경 */}
              <path d="M160 120 C160 120 150 100 150 88 A12 12 0 0 1 172 88 C172 100 160 120 160 120Z" fill="#F97316" opacity="0.18" />
              <path d="M168 120 C168 120 160 104 162 96 A8 8 0 0 1 176 98 C176 108 168 120 168 120Z" fill="#FACC15" opacity="0.15" />
              <path d="M30 160 C30 160 22 148 22 142 A8 8 0 0 1 38 142 C38 148 30 160 30 160Z" fill="#F87171" opacity="0.2" />
              <path d="M25 160 C25 160 20 152 21 148 A5 5 0 0 1 31 149 C31 154 25 160 25 160Z" fill="#FACC15" opacity="0.15" />
              <path d="M100 170 C100 170 94 162 94 158 A6 6 0 0 1 106 158 C106 162 100 170 100 170Z" fill="#F97316" opacity="0.12" />
              {/* 깃발 */}
              <line x1="170" y1="140" x2="170" y2="170" stroke="#4ADE80" strokeWidth="1" opacity="0.1" />
              <path d="M170 140 L185 147 L170 154" fill="#4ADE80" opacity="0.08" />
              {/* 스파클 */}
              <path d="M160 60 L162 66 L168 68 L162 70 L160 76 L158 70 L152 68 L158 66 Z" fill="#FACC15" opacity="0.2" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 불꽃 머리띠 */}
              <path d="M22 26 L58 26" stroke="#F87171" strokeWidth="3" strokeLinecap="round" />
              <path d="M30 26 C30 26 28 20 28 18 A3 3 0 0 1 34 18 C34 20 32 26 32 26" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
              <path d="M40 26 C40 26 38 18 38 15 A3 3 0 0 1 44 15 C44 18 42 26 42 26" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
              <path d="M50 26 C50 26 48 20 48 18 A3 3 0 0 1 54 18 C54 20 52 26 52 26" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
              {/* 머리카락 — closed Z */}
              <path d="M22 32 Q20 16 40 14 Q60 16 58 32 Q56 48 54 54 Q46 60 40 60 Q34 60 26 54 Q24 48 22 32Z" fill="#2D2D2D" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="38" rx="15" ry="15" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.8" />
              {/* 눈 — 결의 */}
              <circle cx="34" cy="36" r="2.5" fill="#2D2D2D" />
              <circle cx="46" cy="36" r="2.5" fill="#2D2D2D" />
              <circle cx="35" cy="35" r="0.9" fill="white" />
              <circle cx="47" cy="35" r="0.9" fill="white" />
              {/* 눈썹 — 찌푸린 */}
              <line x1="29" y1="31" x2="37" y2="30" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
              <line x1="51" y1="31" x2="43" y2="30" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
              {/* 입 — 각오 미소 */}
              <path d="M35 43 Q40 47 45 43" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 볼터치 */}
              <ellipse cx="28" cy="40" rx="3.5" ry="2" fill="#F87171" opacity="0.4" />
              <ellipse cx="52" cy="40" rx="3.5" ry="2" fill="#F87171" opacity="0.4" />
              {/* 몸통 */}
              <path d="M28 54 Q26 58 26 72 L54 72 Q54 58 52 54 Q46 52 40 52 Q34 52 28 54Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 오른팔 — 달리기 */}
              <path d="M52 58 L66 50" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
              {/* 깃발 */}
              <line x1="66" y1="50" x2="66" y2="34" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M66 34 L78 38 L66 42" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
              {/* 왼팔 — 횃불 */}
              <path d="M28 58 L14 52" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="12" y1="52" x2="12" y2="36" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
              {/* 불꽃 */}
              <path d="M12 36 C12 36 6 26 10 20 C10 20 8 28 16 26 C16 26 18 20 14 18 C18 16 20 24 12 36Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
              <path d="M12 36 C12 36 18 28 14 22 C18 22 20 30 14 36Z" fill="#F87171" opacity="0.8" />
              {/* 불꽃 트레일 */}
              <path d="M2 56 C6 52 10 58 14 54" stroke="#F97316" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
              <path d="M2 62 C6 58 10 64 14 60" stroke="#FACC15" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑오-f")!.emoji} {getIljuType("갑오-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("갑오-f")!.id} · {getIljuType("갑오-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "을미-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 광명 오라 */}
              <circle cx="100" cy="100" r="70" stroke="#FACC15" strokeWidth="1" opacity="0.08" fill="none" />
              <circle cx="100" cy="100" r="50" stroke="#FACC15" strokeWidth="0.8" opacity="0.06" fill="none" />
              {/* 연꽃 */}
              <path d="M82 172 Q92 160 100 168 Q108 160 118 172 Q108 184 100 178 Q92 184 82 172Z" fill="#F9A8D4" opacity="0.12" />
              {/* 스파클 */}
              <path d="M30 50 L31.5 54.5 L36 56 L31.5 57.5 L30 62 L28.5 57.5 L24 56 L28.5 54.5 Z" fill="#FACC15" opacity="0.16" />
              <path d="M168 140 L169 143 L172 144 L169 145 L168 148 L167 145 L164 144 L167 143 Z" fill="#FACC15" opacity="0.14" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을미-m")!.emoji} {getIljuType("을미-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("을미-m")!.id} · {getIljuType("을미-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "을미-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="100" cy="100" r="60" stroke="#4ADE80" strokeWidth="1" opacity="0.1" fill="none" strokeDasharray="6 4" />
              <circle cx="30" cy="60" r="10" fill="#4ADE80" opacity="0.1" />
              <circle cx="170" cy="60" r="10" fill="#4ADE80" opacity="0.1" />
              <circle cx="30" cy="140" r="8" fill="#4ADE80" opacity="0.08" />
              <circle cx="170" cy="140" r="8" fill="#4ADE80" opacity="0.08" />
              <path d="M30 60 Q100 80 170 60" stroke="#4ADE80" strokeWidth="0.8" opacity="0.1" fill="none" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을미-f")!.emoji} {getIljuType("을미-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("을미-f")!.id} · {getIljuType("을미-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "갑진-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <rect x="20" y="20" width="70" height="50" rx="4" stroke="#4ADE80" strokeWidth="1" opacity="0.1" fill="none" />
              <rect x="110" y="20" width="70" height="50" rx="4" stroke="#4ADE80" strokeWidth="1" opacity="0.08" fill="none" />
              <path d="M55 70 L100 90 L145 70" stroke="#4ADE80" strokeWidth="1" opacity="0.1" fill="none" />
              <circle cx="100" cy="160" r="22" fill="#D1FAE5" opacity="0.15" />
              <path d="M100 130 L100 160" stroke="#4ADE80" strokeWidth="1" opacity="0.1" strokeLinecap="round" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑진-m")!.emoji} {getIljuType("갑진-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("갑진-m")!.id} · {getIljuType("갑진-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "갑진-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M100 180 L100 40" stroke="#4ADE80" strokeWidth="1.5" opacity="0.1" strokeLinecap="round" />
              <path d="M100 40 Q120 60 140 50" stroke="#4ADE80" strokeWidth="1.5" opacity="0.1" strokeLinecap="round" />
              <circle cx="140" cy="50" r="8" fill="#4ADE80" opacity="0.12" />
              <path d="M30 150 L50 130 L70 150 Z" fill="#D1FAE5" opacity="0.15" />
              <path d="M155 160 L159 148 L163 160 L175 160 L165 167 L169 179 L159 172 L149 179 L153 167 L143 160 Z" fill="#4ADE80" opacity="0.1" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑진-f")!.emoji} {getIljuType("갑진-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("갑진-f")!.id} · {getIljuType("갑진-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "을사-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <circle cx="30" cy="45" r="5" fill="#F9A8D4" opacity="0.15" />
            <circle cx="170" cy="55" r="7" fill="#F9A8D4" opacity="0.12" />
            <circle cx="160" cy="155" r="4" fill="#FBCFE8" opacity="0.15" />
            <path d="M165 35 L167 41 L173 43 L167 45 L165 51 L163 45 L157 43 L163 41 Z" fill="#FACC15" opacity="0.18" />
            <path d="M20 100 Q60 85 100 100 Q140 115 180 100" stroke="#4ADE80" strokeWidth="1" opacity="0.06" fill="none" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을사-m")!.emoji + " " + getIljuType("을사-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("을사-m")!.id + " · " + getIljuType("을사-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "을사-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 꽃잎들 */}
              <circle cx="30" cy="60" r="12" fill="#F9A8D4" opacity="0.12" />
              <circle cx="170" cy="50" r="10" fill="#4ADE80" opacity="0.12" />
              <circle cx="150" cy="150" r="14" fill="#F9A8D4" opacity="0.1" />
              {/* 비단결 */}
              <path d="M0 100 Q50 80 100 100 Q150 120 200 100" stroke="#4ADE80" strokeWidth="1.5" fill="none" opacity="0.1" />
              <path d="M0 115 Q50 95 100 115 Q150 135 200 115" stroke="#4ADE80" strokeWidth="1" fill="none" opacity="0.07" />
              {/* 스파클 */}
              <circle cx="50" cy="170" r="2.5" fill="#4ADE80" opacity="0.15" />
              <circle cx="170" cy="170" r="2" fill="#F9A8D4" opacity="0.15" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 꽃 머리장식 */}
              <circle cx="52" cy="12" r="6" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" />
              <circle cx="48" cy="8" r="4" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1" />
              <circle cx="56" cy="8" r="4" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1" />
              <circle cx="52" cy="5" r="4" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1" />
              <circle cx="52" cy="10" r="3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8" />
              {/* 헤어 — 중단발 스트레이트, 짙은 슬레이트 (닫힌 Z) */}
              <path d="M18 32 Q18 10 40 8 Q62 10 62 32 L62 62 Q56 72 46 70 Q40 68 34 70 Q24 72 18 62 Z" fill="#374151" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 얼굴 */}
              <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
              {/* 속눈썹 */}
              <path d="M31 31 Q34 29 37 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M43 31 Q46 29 49 31" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* 조용하지만 날카로운 눈 */}
              <ellipse cx="34" cy="34" rx="4" ry="2.5" fill="#2D2D2D" />
              <ellipse cx="46" cy="34" rx="4" ry="2.5" fill="#2D2D2D" />
              <circle cx="35.5" cy="33" r="1.2" fill="white" opacity="0.7" />
              <circle cx="47.5" cy="33" r="1.2" fill="white" opacity="0.7" />
              {/* 눈썹 — 섬세하게 */}
              <path d="M29 28 Q34 26 38 28" stroke="#2D2D2D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path d="M42 28 Q46 26 51 28" stroke="#2D2D2D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              {/* 입 — 우아한 미소 */}
              <path d="M34 43 Q40 48 46 43" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* 볼터치 */}
              <ellipse cx="27" cy="39" rx="3.8" ry="2" fill="#F9A8D4" opacity="0.45" />
              <ellipse cx="53" cy="39" rx="3.8" ry="2" fill="#F9A8D4" opacity="0.45" />
              {/* 몸통 — 꽃 무늬 원피스 */}
              <path d="M26 52 Q22 56 20 74 L60 74 Q58 56 54 52 Q46 50 40 50 Q34 50 26 52Z" fill="#D1FAE5" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 꽃 무늬 프린트 */}
              <circle cx="40" cy="62" r="3" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.6" />
              <circle cx="36" cy="57" r="2" fill="#F472B6" stroke="#2D2D2D" strokeWidth="0.5" />
              <circle cx="44" cy="67" r="2" fill="#F472B6" stroke="#2D2D2D" strokeWidth="0.5" />
              <circle cx="40" cy="61.5" r="1" fill="#FDE68A" />
              {/* 오른팔 — 강력한 주먹질 */}
              <path d="M54 56 Q64 48 68 44" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <rect x="65" y="40" width="10" height="8" rx="2" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
              <line x1="67" y1="40" x2="67" y2="38" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
              <line x1="70" y1="40" x2="70" y2="38" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
              <line x1="73" y1="40" x2="73" y2="38" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
              {/* 주먹 이펙트 */}
              <path d="M75 37 L78 33 L80 35" stroke="#F9A8D4" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
              {/* 왼팔 — 여유로운 */}
              <path d="M26 58 Q16 56 12 52" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을사-f")!.emoji} {getIljuType("을사-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("을사-f")!.id} · {getIljuType("을사-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "갑인-m",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 방패 그림자 */}
              <path d="M20 100 Q20 60 50 50 Q80 60 80 100 Q80 140 50 160 Q20 140 20 100Z" fill="#4ADE80" opacity="0.07" />
              {/* 호랑이 줄무늬 */}
              <path d="M140 60 Q150 70 145 80" stroke="#FBBF24" strokeWidth="2" opacity="0.12" fill="none" strokeLinecap="round" />
              <path d="M150 55 Q162 68 155 80" stroke="#FBBF24" strokeWidth="2" opacity="0.1" fill="none" strokeLinecap="round" />
              {/* 스파클 */}
              <path d="M160 140 L162 146 L168 148 L162 150 L160 156 L158 150 L152 148 L158 146 Z" fill="#4ADE80" opacity="0.14" />
              {/* 발자국 */}
              <ellipse cx="170" cy="170" rx="7" ry="5" fill="#4ADE80" opacity="0.08" />
              <ellipse cx="155" cy="162" rx="7" ry="5" fill="#4ADE80" opacity="0.07" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑인-m")!.emoji} {getIljuType("갑인-m")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("갑인-m")!.id} · {getIljuType("갑인-m")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "갑인-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 번개 */}
              <path d="M32 22 L27 44 L36 41 L30 66" stroke="#FACC15" strokeWidth="2" opacity="0.14" fill="none" strokeLinejoin="round" />
              <path d="M168 38 L165 52 L171 50 L166 67" stroke="#FACC15" strokeWidth="1.5" opacity="0.11" fill="none" strokeLinejoin="round" />
              {/* 저울 */}
              <line x1="88" y1="158" x2="112" y2="158" stroke="#4ADE80" strokeWidth="1.5" opacity="0.1" />
              <line x1="100" y1="152" x2="100" y2="162" stroke="#4ADE80" strokeWidth="1.5" opacity="0.1" />
              <path d="M86 158 L83 166 L93 166 Z" stroke="#4ADE80" strokeWidth="1" opacity="0.07" fill="none" />
              <path d="M114 158 L110 166 L120 166 Z" stroke="#4ADE80" strokeWidth="1" opacity="0.07" fill="none" />
              {/* 스파클 */}
              <path d="M168 142 L170 148 L176 150 L170 152 L168 158 L166 152 L160 150 L166 148 Z" fill="#FACC15" opacity="0.14" />
              <circle cx="24" cy="152" r="2" fill="#F87171" opacity="0.09" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 긴 머리 양 옆 */}
              <path d="M18 40 Q14 54 16 70" stroke="#2D2D2D" strokeWidth="9" strokeLinecap="round" fill="none" />
              <path d="M62 40 Q66 54 64 70" stroke="#2D2D2D" strokeWidth="9" strokeLinecap="round" fill="none" />
              {/* 티아라 */}
              <path d="M22 22 L28 13 L34 20 L40 8 L46 20 L52 13 L58 22" stroke="#FACC15" strokeWidth="2.2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
              <circle cx="40" cy="10" r="3" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1" />
              <circle cx="28" cy="15" r="2" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8" />
              <circle cx="52" cy="15" r="2" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8" />
              {/* 머리카락 */}
              <path d="M20 32 Q18 14 40 12 Q62 14 60 32" fill="#2D2D2D" />
              {/* 얼굴 */}
              <circle cx="40" cy="40" r="14" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="2" />
              {/* 눈썹 — 단단히 찌푸린 */}
              <path d="M28 34 Q32 31 36 33" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M44 33 Q48 31 52 34" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* 눈 */}
              <circle cx="33" cy="38" r="2.5" fill="#2D2D2D" />
              <circle cx="47" cy="38" r="2.5" fill="#2D2D2D" />
              {/* 입 — 단호하게 다문 */}
              <path d="M35 46 L40 44 L45 46" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* 볼터치 — 분홍 */}
              <ellipse cx="27" cy="41" rx="3.5" ry="2" fill="#F87171" opacity="0.42" />
              <ellipse cx="53" cy="41" rx="3.5" ry="2" fill="#F87171" opacity="0.42" />
              {/* 드레스 몸통 */}
              <path d="M24 54 Q22 60 22 74 L58 74 Q58 60 56 54 Q48 52 40 52 Q32 52 24 54Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
              {/* 드레스 주름 */}
              <path d="M30 56 Q28 64 28 72" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.2" fill="none" />
              <path d="M50 56 Q52 64 52 72" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.2" fill="none" />
              {/* 왼쪽 팔 — 주먹 불끈 */}
              <path d="M24 58 Q14 58 10 64" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <rect x="4" y="61" width="10" height="8" rx="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
              <line x1="4" y1="65" x2="14" y2="65" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.35" />
              {/* 오른쪽 팔 — 주먹 불끈 */}
              <path d="M56 58 Q66 58 70 64" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <rect x="66" y="61" width="10" height="8" rx="3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
              <line x1="66" y1="65" x2="76" y2="65" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.35" />
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("갑인-f")!.emoji} {getIljuType("갑인-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("갑인-f")!.id} · {getIljuType("갑인-f")!.stemElement}</p>
        </div>
    ),
  },
  {
    id: "을묘-m",
    node: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M20 150 Q60 130 100 150 Q140 170 180 150" stroke="#4ADE80" strokeWidth="2" opacity="0.08" strokeLinecap="round" fill="none" />
            <circle cx="30" cy="45" r="5" fill="#F9A8D4" opacity="0.18" />
            <circle cx="170" cy="55" r="7" fill="#60A5FA" opacity="0.12" />
            <path d="M165 35 L167 41 L173 43 L167 45 L165 51 L163 45 L157 43 L163 41 Z" fill="#FACC15" opacity="0.18" />
            <path d="M20 80 Q60 70 100 80 Q140 90 180 80" stroke="#F9A8D4" strokeWidth="1" opacity="0.07" fill="none" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
            {/* 아프로 (먼저) */}
            <circle cx="40" cy="24" r="22" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
            <circle cx="22" cy="16" r="5" fill="#92400E" stroke="#2D2D2D" strokeWidth="0.8" />
            <circle cx="58" cy="16" r="5" fill="#92400E" stroke="#2D2D2D" strokeWidth="0.8" />
            <circle cx="16" cy="28" r="4" fill="#92400E" stroke="#2D2D2D" strokeWidth="0.8" />
            <circle cx="64" cy="28" r="4" fill="#92400E" stroke="#2D2D2D" strokeWidth="0.8" />
            {/* 베레모 */}
            <ellipse cx="40" cy="20" rx="20" ry="7" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
            <path d="M20 20 Q20 10 40 10 Q60 10 60 20" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
            <circle cx="40" cy="10" r="3.5" fill="#2D2D2D" />
            {/* 얼굴 */}
            <circle cx="40" cy="38" r="16" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
            {/* 눈썹 — 감성 */}
            <path d="M30 32 Q34 30 38 32" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
            <path d="M42 32 Q46 30 50 32" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
            {/* 눈 — 반짝 감성 */}
            <circle cx="34" cy="37" r="3" fill="#2D2D2D" />
            <circle cx="46" cy="37" r="3" fill="#2D2D2D" />
            <circle cx="35.4" cy="35.8" r="1.2" fill="white" />
            <circle cx="47.4" cy="35.8" r="1.2" fill="white" />
            {/* 입 — 우아한 미소 */}
            <path d="M35 45 Q40 49 45 45" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* 볼터치 */}
            <ellipse cx="28" cy="41" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.45" />
            <ellipse cx="52" cy="41" rx="3.5" ry="2" fill="#F9A8D4" opacity="0.45" />
            {/* 몸통 */}
            <rect x="28" y="54" width="24" height="20" rx="5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
            <path d="M35 54 L40 59 L45 54" stroke="#2D2D2D" strokeWidth="1.1" fill="none" strokeLinecap="round" />
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
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을묘-m")!.emoji + " " + getIljuType("을묘-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("을묘-m")!.id + " · " + getIljuType("을묘-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "을묘-f",
    node: (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#D1FAE5] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
            {/* 배경 장식 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              {/* 꽃잎 */}
              <circle cx="30" cy="40" r="6" fill="#F9A8D4" opacity="0.2" />
              <circle cx="170" cy="50" r="8" fill="#F9A8D4" opacity="0.15" />
              <circle cx="160" cy="150" r="5" fill="#FBCFE8" opacity="0.2" />
              {/* 붓 터치 */}
              <path d="M20 160 Q60 140 100 160" stroke="#4ADE80" strokeWidth="3" opacity="0.1" strokeLinecap="round" />
              <path d="M100 170 Q140 150 180 170" stroke="#F9A8D4" strokeWidth="2" opacity="0.1" strokeLinecap="round" />
              {/* 스파클 */}
              <path d="M165 30 L167 36 L173 38 L167 40 L165 46 L163 40 L157 38 L163 36 Z" fill="#FACC15" opacity="0.2" />
            </svg>
            {SHOW_ELEMENT_BADGE && <ElementBadge element="wood" />}
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
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
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("을묘-f")!.emoji} {getIljuType("을묘-f")!.name}</p>
          <p className="text-xs text-gray-500 text-center">{getIljuType("을묘-f")!.id} · {getIljuType("을묘-f")!.stemElement}</p>
        </div>
    ),
  },
];

export const WOOD_CHARACTER_MAP: Record<string, React.ReactNode> =
  Object.fromEntries(_WoodChars.map(e => [e.id, e.node]));

export function WoodCharacters() {
  return (
    <>
      {_WoodChars.map(e => (
        <div key={e.id} id={`card-${e.id}`} data-gender={e.id.endsWith("-f") ? "female" : "male"} className="ilju-card scroll-mt-24">{e.node}</div>
      ))}
    </>
  );
}