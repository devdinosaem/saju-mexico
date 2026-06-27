import React from "react";
import { getIljuType } from "@/lib/ilju-types";

// 남성 헤어 비포/애프터 1차 배치
// 애프터 2가지 모드:
//  - fringe: 라이브 카드 위에 앞머리만 오버레이 (캡은 그대로, 추가만)
//  - after : 머리를 통째로 갈아끼운 풀 카드 (기존 머리 제거가 필요한 경우)
// fringe는 지침대로 fill만(stroke 금지).

export type HairItem = {
  id: string;
  element: "wood" | "fire" | "earth" | "metal" | "water";
  style: string;
  fringe?: React.ReactNode;
  after?: React.ReactNode;
  // 같은 라이브 카드(BEFORE)를 공유하는 변형 행을 위해: 비포 조회는 baseId, 행 key는 id
  baseId?: string;
};

export const HAIR_BATCH: HairItem[] = [
  {
    id: "경인-m", element: "metal", style: "더벅",
    fringe: (
      <path d="M23 29 Q25 34 28 31 Q30 35 33 31 Q36 35 39 31 Q42 35 45 31 Q48 35 51 31 Q54 34 57 29 Q58 22 40 21 Q22 22 23 29 Z" fill="#1F2937" />
    ),
  },
  {
    id: "신묘-m", element: "metal", style: "가르마 스윕",
    fringe: (
      <>
        <path d="M24 27 Q26 31 31 29 Q38 32 46 29 Q52 31 56 26 Q57 20 40 19 Q25 20 24 27 Z" fill="#D1D5DB" />
        <path d="M47 22 Q42 27 36 30" stroke="#94A3B8" strokeWidth="0.9" fill="none" opacity="0.6" />
      </>
    ),
  },
  {
    id: "경자-m", element: "metal", style: "일자 뱅",
    fringe: (
      <path d="M24 27 Q25 32 28 31 Q34 33 40 31 Q46 33 52 31 Q55 32 56 27 Q57 20 40 19 Q24 20 24 27 Z" fill="#1F2937" />
    ),
  },
  {
    id: "신축-m", element: "metal", style: "전면 재제작 · 덮는머리 + 모래시계 + 확실한 길 지도",
    after: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#F1F5F9] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M60 160 Q90 140 110 155 Q130 168 168 150" stroke="#94A3B8" strokeWidth="2" opacity="0.1" fill="none" strokeDasharray="8 5" />
            <path d="M148 60 L153 66 L164 50" stroke="#4ADE80" strokeWidth="2" opacity="0.16" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 100 L33 106 L39 108 L33 110 L30 116 L27 110 L21 108 L27 106 Z" fill="#94A3B8" opacity="0.12" />
            <path d="M168 138 L178 148 L168 162 L158 148 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" opacity="0.15" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
            {/* 머리 — 크라운 캡 (다크) */}
            <path d="M22 32 Q20 12 40 10 Q60 12 58 32 Z" fill="#1F2937" />
            {/* 얼굴 */}
            <circle cx="40" cy="36" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" />
            {/* 앞머리 — 덮는 사이드 스윕 (fill only) */}
            <path d="M22 22 Q21 31 28 30 Q26 24 33 23 Q40 21 49 24 Q56 26 55 31 Q59 30 58 21 Q40 15 22 22 Z" fill="#1F2937" />
            <path d="M49 25 Q43 30 36 31" stroke="#374151" strokeWidth="0.9" fill="none" opacity="0.5" />
            {/* 눈썹 — 여유 아치 */}
            <path d="M29 31 Q33 28 37 30" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M43 30 Q47 28 51 31" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* 눈 — 반달 여유 */}
            <path d="M31 37 Q34 34 37 37" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M43 37 Q46 34 49 37" stroke="#2D2D2D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            {/* 콧대 */}
            <path d="M40 37 Q39 40 41 42" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
            {/* 입 — 여유 미소 */}
            <path d="M36 44 Q40 48 44 44" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* 볼터치 */}
            <ellipse cx="29" cy="42" rx="3.6" ry="2.2" fill="#FCA5A5" opacity="0.3" />
            <ellipse cx="51" cy="42" rx="3.6" ry="2.2" fill="#FCA5A5" opacity="0.3" />
            {/* 몸통 — 인디고 */}
            <path d="M24 52 Q22 56 22 72 L58 72 Q58 56 56 52 Q48 50 40 50 Q32 50 24 52Z" fill="#6366F1" stroke="#2D2D2D" strokeWidth="1.5" />
            <path d="M34 51 L40 57 L46 51" stroke="#E0E7FF" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            {/* 왼팔 → 모래시계 */}
            <path d="M24 58 Q15 57 11 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="60" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
            <line x1="3" y1="55" x2="13" y2="55" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="75" x2="13" y2="75" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 56 L12 56 L8 65 L12 74 L4 74 L8 65 Z" fill="#E0F2FE" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M5 57 L11 57 L8 63.5 Z" fill="#F59E0B" opacity="0.85" />
            <path d="M8 65 L8 73" stroke="#F59E0B" strokeWidth="1" opacity="0.7" />
            <path d="M5.5 73.5 Q8 70 10.5 73.5 Z" fill="#F59E0B" opacity="0.85" />
            {/* 오른팔 → 확실한 길 지도 */}
            <path d="M56 58 Q65 57 69 60" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="68" cy="60" r="2.3" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.1" />
            <rect x="60" y="56" width="16" height="15" rx="1.5" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.3" />
            <path d="M60 61 L76 61 M60 66 L76 66" stroke="#E5C97B" strokeWidth="0.5" opacity="0.6" />
            <path d="M63 68 Q66 64 69 66 Q72 67 73 62" stroke="#22C55E" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeDasharray="0.2 2" />
            <path d="M71 59 L72.5 61 L75 57.5" stroke="#22C55E" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="63" cy="68" r="1" fill="#EF4444" />
          </svg>
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("신축-m")!.emoji + " " + getIljuType("신축-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("신축-m")!.id + " · " + getIljuType("신축-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "경술-m", element: "metal", style: "쉼표머리",
    fringe: (
      <path d="M24 29 Q26 34 33 32 Q44 35 51 29 Q55 26 54 31 Q52 35 56 31 Q58 22 40 21 Q25 22 24 29 Z" fill="#1F2937" />
    ),
  },
  {
    id: "신해-m", element: "metal", style: "가르마 스윕",
    fringe: (
      <>
        <path d="M24 30 Q26 34 31 32 Q38 35 46 32 Q52 34 56 29 Q57 24 40 23 Q25 24 24 30 Z" fill="#4338CA" />
        <path d="M47 25 Q42 30 36 33" stroke="#312E81" strokeWidth="0.9" fill="none" opacity="0.6" />
      </>
    ),
  },
  {
    id: "경신-m", element: "metal", style: "더벅",
    fringe: (
      <path d="M23 29 Q25 34 28 31 Q30 35 33 31 Q36 35 39 31 Q42 35 45 31 Q48 35 51 31 Q54 34 57 29 Q58 22 40 21 Q22 22 23 29 Z" fill="#374151" />
    ),
  },
  {
    id: "신유-m", element: "metal", style: "가르마 스윕",
    fringe: (
      <>
        <path d="M24 28 Q26 32 31 30 Q38 33 46 30 Q52 32 56 27 Q57 21 40 20 Q25 21 24 28 Z" fill="#C4B5FD" />
        <path d="M47 23 Q42 28 36 31" stroke="#8B5CF6" strokeWidth="0.9" fill="none" opacity="0.6" />
      </>
    ),
  },
  {
    id: "경오-m", element: "metal", style: "일자 뱅",
    fringe: (
      <path d="M24 28 Q25 33 28 32 Q34 34 40 32 Q46 34 52 32 Q55 33 56 28 Q57 21 40 20 Q24 21 24 28 Z" fill="#92400E" />
    ),
  },
  {
    id: "임신-m", element: "water", style: "컬 펌",
    fringe: (
      <path d="M24 31 Q27 35 31 32 Q34 35 38 32 Q42 35 46 32 Q50 35 53 32 Q56 34 56 31 Q57 24 40 23 Q24 24 24 31 Z" fill="#0EA5E9" />
    ),
  },
  {
    id: "임오-m", element: "water", style: "일자 뱅",
    fringe: (
      <path d="M24 27 Q25 32 28 31 Q34 33 40 31 Q46 33 52 31 Q55 32 56 27 Q57 20 40 19 Q24 20 24 27 Z" fill="#2D2D2D" />
    ),
  },
  {
    id: "계미-m", element: "water", style: "가르마 스윕",
    fringe: (
      <>
        <path d="M24 31 Q26 35 31 33 Q38 36 46 33 Q52 35 56 30 Q57 24 40 23 Q25 24 24 31 Z" fill="#374151" />
        <path d="M47 25 Q42 30 36 33" stroke="#1F2937" strokeWidth="0.9" fill="none" opacity="0.5" />
      </>
    ),
  },
  {
    id: "임진-m", element: "water", style: "가르마 스윕 (젤)",
    fringe: (
      <>
        <path d="M24 27 Q26 31 31 29 Q38 32 46 29 Q52 31 56 26 Q57 20 40 19 Q25 20 24 27 Z" fill="#1F2937" />
        <path d="M47 22 Q42 27 36 30" stroke="#374151" strokeWidth="0.9" fill="none" opacity="0.55" />
      </>
    ),
  },
  {
    id: "임인-m", element: "water", style: "더벅",
    fringe: (
      <path d="M23 27 Q25 33 28 29 Q30 34 33 29 Q36 34 39 29 Q42 34 45 29 Q48 34 51 29 Q54 33 57 27 Q58 20 40 19 Q22 20 23 27 Z" fill="#3B82F6" />
    ),
  },
  {
    id: "기묘-m", element: "earth", style: "가르마 스윕",
    fringe: (
      <>
        <path d="M24 31 Q26 35 31 33 Q38 36 46 33 Q52 35 56 30 Q57 24 40 23 Q25 24 24 31 Z" fill="#2D2D2D" />
        <path d="M47 25 Q42 30 36 33" stroke="#4B5563" strokeWidth="0.9" fill="none" opacity="0.5" />
      </>
    ),
  },
  {
    id: "무신-m", element: "earth", style: "일자 뱅",
    fringe: (
      <>
        <path d="M24 27 Q25 32 28 31 Q34 33 40 31 Q46 33 52 31 Q55 32 56 27 Q57 20 40 19 Q24 20 24 27 Z" fill="#EAB308" />
        <path d="M31 22 L30 30 M40 21 L40 30 M49 22 L50 30" stroke="#A16207" strokeWidth="0.7" opacity="0.5" />
      </>
    ),
  },
  {
    id: "무오-m", element: "earth", style: "컬 펌",
    fringe: (
      <path d="M24 27 Q27 32 31 29 Q34 32 38 29 Q42 32 46 29 Q50 32 53 29 Q56 31 56 27 Q57 20 40 19 Q24 20 24 27 Z" fill="#1E3A5F" />
    ),
  },
  {
    id: "무진-m", element: "earth", style: "가르마 스윕",
    fringe: (
      <>
        <path d="M24 28 Q26 32 31 30 Q38 33 46 30 Q52 32 56 27 Q57 21 40 20 Q25 21 24 28 Z" fill="#2D2D2D" />
        <path d="M47 23 Q42 28 36 31" stroke="#52525B" strokeWidth="0.9" fill="none" opacity="0.5" />
      </>
    ),
  },
  {
    id: "갑신-m", element: "wood", style: "더벅",
    fringe: (
      <path d="M23 27 Q25 33 28 29 Q30 34 33 29 Q36 34 39 29 Q42 34 45 29 Q48 34 51 29 Q54 33 57 27 Q58 20 40 19 Q22 20 23 27 Z" fill="#4ADE80" />
    ),
  },
  {
    id: "을축-m", element: "wood", style: "일자 뱅",
    fringe: (
      <path d="M24 28 Q25 33 28 32 Q34 34 40 32 Q46 34 52 32 Q55 33 56 28 Q57 21 40 20 Q24 21 24 28 Z" fill="#2D2D2D" />
    ),
  },
  {
    id: "정사-m", element: "fire", style: "컬 펌",
    fringe: (
      <path d="M24 26 Q27 31 31 28 Q34 31 38 28 Q42 31 46 28 Q50 31 53 28 Q56 30 56 26 Q57 19 40 18 Q24 19 24 26 Z" fill="#4338CA" />
    ),
  },
  {
    id: "계사-m", element: "water", style: "베레모 밑 가르마 스윕",
    fringe: (
      <>
        <path d="M25 27 Q27 32 31 30 Q38 33 46 30 Q52 32 55 27 Q55 24 40 24 Q25 24 25 27 Z" fill="#2D2D2D" />
        <path d="M47 25 Q42 29 37 31" stroke="#4B5563" strokeWidth="0.9" fill="none" opacity="0.5" />
      </>
    ),
  },
  {
    id: "계묘-m", element: "water", style: "레이더캡 밑 일자 뱅",
    fringe: (
      <path d="M25 26 Q26 30 29 28 Q34 31 40 28 Q46 31 51 28 Q54 30 55 26 Q55 21 40 20 Q25 21 25 26 Z" fill="#06B6D4" />
    ),
  },
  {
    id: "임술-m", element: "water", style: "뇌모자 밑 더벅",
    fringe: (
      <path d="M24 26 Q26 31 29 28 Q31 32 34 28 Q37 32 40 28 Q43 32 46 28 Q49 32 51 28 Q54 31 56 26 Q57 21 40 20 Q23 21 24 26 Z" fill="#2D2D2D" />
    ),
  },
  {
    id: "계축-m", element: "water", style: "소뿔 밑 일자 뱅",
    fringe: (
      <path d="M25 30 Q26 34 29 33 Q35 35 41 33 Q47 35 53 33 Q56 34 56 30 Q57 25 40 24 Q24 25 25 30 Z" fill="#2D2D2D" />
    ),
  },
  {
    id: "계해-m", element: "water", style: "머리 교체 · 가운데 가르마 커튼",
    after: (
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
    id: "병인-m", element: "fire", style: "전면 리워크 · 더벅 + 빨간 머리띠",
    after: (
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
    id: "병자-m", element: "fire", style: "전면 리워크 · 컬 펌",
    after: (
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
    id: "정해-m", element: "fire", style: "전면 리워크 · 가르마 스윕",
    after: (
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
    id: "병술-m", element: "fire", style: "전면 리워크 · 강아지귀 + 더벅",
    after: (
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
    id: "병신-m", element: "fire", style: "동물화 · 말(horse) + 빠른 손",
    after: (
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
    id: "병오-m", element: "fire", style: "갑술(우회로) 머리 이식 + 왕관 맨위 레이어",
    after: (
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
    id: "정미-m", element: "fire", style: "전면 리워크 · 가르마 스윕 + 커피",
    after: (
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
    id: "병진-m", element: "fire", style: "전면 리워크 · 올백 + 미니 드래곤",
    after: (
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
    id: "신사-m", element: "metal", style: "동물화 · 비버 (집 뿌수고 다시 만듦)",
    after: (
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
    id: "임자-m", element: "water", style: "동물화 · 바쁜 상어 (멈추면 죽음)",
    after: (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-b from-[#DBEAFE] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M0 150 Q25 142 50 150 Q75 158 100 150 Q125 142 150 150 Q175 158 200 150" stroke="#60A5FA" strokeWidth="1.5" opacity="0.1" fill="none" />
            <circle cx="40" cy="55" r="8" stroke="#60A5FA" strokeWidth="1.2" opacity="0.1" fill="none" />
            <circle cx="160" cy="60" r="6" stroke="#60A5FA" strokeWidth="1" opacity="0.1" fill="none" />
            <path d="M150 40 L160 40 M152 50 L158 50" stroke="#60A5FA" strokeWidth="2" opacity="0.1" strokeLinecap="round" />
          </svg>
          <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
            {/* 물살/모션선 (뒤) */}
            <path d="M4 24 L14 26 M2 31 L12 31 M4 49 L14 47" stroke="#60A5FA" strokeWidth="1.7" strokeLinecap="round" opacity="0.5" />
            {/* 꼬리 (뒤, 몸에 붙음) */}
            <path d="M22 37 Q11 31 5 35 Q12 37 16 37 Q9 41 6 48 Q15 45 22 39Z" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1.3" strokeLinejoin="round" />
            {/* 등지느러미 (몸에 박음) */}
            <path d="M44 24 L48 7 L54 25 Z" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1.3" strokeLinejoin="round" />
            {/* 몸 (길쭉한 타원, 앞으로 돌진) */}
            <path d="M16 37 Q18 23 38 22 Q58 21 65 31 Q70 37 62 44 Q44 52 26 49 Q15 45 16 37Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
            {/* 배 */}
            <path d="M23 41 Q42 51 61 44 Q57 39 50 39 Q34 39 23 41Z" fill="#EFF6FF" stroke="#2D2D2D" strokeWidth="0.7" />
            {/* 아가미 */}
            <path d="M34 30 Q32 36 34 42 M38 29 Q36 36 38 43" stroke="#2D2D2D" strokeWidth="0.7" fill="none" opacity="0.45" />
            {/* 눈썹 — 결의 */}
            <path d="M38 25 Q42 23 46 26" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
            <path d="M50 26 Q53 24 57 27" stroke="#2D2D2D" strokeWidth="1.7" fill="none" strokeLinecap="round" />
            {/* 눈 — 부릅 */}
            <circle cx="43" cy="30" r="2.9" fill="white" stroke="#2D2D2D" strokeWidth="0.9" />
            <circle cx="53" cy="31" r="2.9" fill="white" stroke="#2D2D2D" strokeWidth="0.9" />
            <circle cx="44" cy="30" r="1.4" fill="#2D2D2D" />
            <circle cx="54" cy="31" r="1.4" fill="#2D2D2D" />
            {/* 입 — 이빨 벌리고 (가자!) */}
            <path d="M41 38 Q49 45 58 39 Q49 42 41 38Z" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
            <path d="M43 39 L45 42 L47 39 L49 42 L51 39 L53 42 L55 39" stroke="#2D2D2D" strokeWidth="0.7" fill="none" strokeLinejoin="round" />
            {/* 볼터치 */}
            <ellipse cx="37" cy="40" rx="2.6" ry="1.7" fill="#3B82F6" opacity="0.35" />
            {/* 땀방울 (전력질주) */}
            <path d="M62 22 C62 22 60 25 60 26.5 A1.5 1.5 0 0 0 64 26.5 C64 25 62 22 62 22Z" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="0.6" />
            <path d="M34 22 C34 22 32.6 24.3 32.6 25.6 A1.2 1.2 0 0 0 35.4 25.6 C35.4 24.3 34 22 34 22Z" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="0.5" />
            {/* 오른 가슴지느러미-팔 → 커피 (들고 달림) */}
            <path d="M60 45 Q64 47 67 50" stroke="#3B82F6" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <path d="M64 50 L73 50 L72 58 Q72 60 70 60 L66 60 Q64 60 64 58Z" fill="#FFF7ED" stroke="#2D2D2D" strokeWidth="1.1" />
            <path d="M73 52 Q76 53 73.5 55.5" stroke="#2D2D2D" strokeWidth="0.9" fill="none" />
            <path d="M65 52 L72 52" stroke="#C8956B" strokeWidth="2" opacity="0.85" />
            <path d="M66 47 Q67 45 66 43 M69 47 Q70 45 69 43.5" stroke="#CBD5E1" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.6" />
            {/* 왼 가슴지느러미-팔 → 휴대폰 (멀티태스킹) */}
            <path d="M27 48 Q23 51 19 54" stroke="#3B82F6" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <rect x="11" y="52" width="8" height="13" rx="1.6" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1" transform="rotate(20 15 58)" />
            <rect x="12.2" y="54" width="5.6" height="8.5" rx="0.5" fill="#60A5FA" opacity="0.75" transform="rotate(20 15 58)" />
          </svg>
        </div>
        <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{getIljuType("임자-m")!.emoji + " " + getIljuType("임자-m")!.name}</p>
        <p className="text-xs text-gray-500 text-center">{getIljuType("임자-m")!.id + " · " + getIljuType("임자-m")!.stemElement}</p>
      </div>
    ),
  },
  {
    id: "갑술-m", element: "wood", style: "전면 리워크 · 들소뿔 + 가르마 스윕",
    after: (
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
            {/* 콧대 */}
            <path d="M40 34 Q39 37 41 39" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
    id: "갑자-m", element: "wood", style: "전면 리워크 · 인간 불도저(안전모)",
    after: (
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
            {/* 콧대 */}
            <path d="M40 37 Q39 40 41 42" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
    id: "을사-m", element: "wood", style: "전면 리워크 · 선글라스 + 셀카 (쿨)",
    after: (
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
            {/* 콧대 (선글라스 밑) */}
            <path d="M40 43 Q39 45 41 47" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
    id: "을묘-m", element: "wood", style: "전면 리워크 · 아프로+베레모 아티스트",
    after: (
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
            {/* 콧대 */}
            <path d="M40 38 Q39 41 41 43" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
    id: "무인-m", element: "earth", style: "전면 리워크 · 모험가(지도+깃발)",
    after: (
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
            {/* 콧대 */}
            <path d="M40 40 Q39 43 41 45" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
    id: "무자-m", element: "earth", style: "전면 리워크 · 참다참다(화산 deadpan)",
    after: (
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
            {/* 콧대 */}
            <path d="M40 33 Q39.3 35.5 40.6 36.8" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.45" />
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
    id: "임자-m·v2", baseId: "임자-m", element: "water", style: "before 기준 · 배 색 채움 + 지느러미에 폰·커피",
    after: (
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
];
