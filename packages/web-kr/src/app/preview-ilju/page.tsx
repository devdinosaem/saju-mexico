"use client";

import { useState } from "react";
import { ILJU_TYPES } from "@/lib/ilju-types";
import { DoodleWood, DoodleFlameFive, DoodleEarth, DoodleMetal, DoodleWater } from "@/components/doodles";
import { WoodCharacters } from "./characters-wood";
import { FireCharacters } from "./characters-fire";
import { EarthCharacters } from "./characters-earth";
import { MetalCharacters } from "./characters-metal";
import { WaterCharacters } from "./characters-water";

export default function IljuPreview() {
  const [gender, setGender] = useState<"all" | "male" | "female">("all");
  const maleCount = ILJU_TYPES.filter(t => t.gender === "male").length;
  const femaleCount = ILJU_TYPES.filter(t => t.gender === "female").length;
  const chips: { key: "all" | "male" | "female"; label: string }[] = [
    { key: "all", label: `전체 ${ILJU_TYPES.length}` },
    { key: "male", label: `남 ${maleCount}` },
    { key: "female", label: `여 ${femaleCount}` },
  ];

  return (
    <main className="min-h-screen bg-[#FDF6EE] p-4">
      {/* 다른 성별 카드 숨김 */}
      {gender !== "all" && (
        <style>{`.ilju-card[data-gender="${gender === "male" ? "female" : "male"}"]{display:none}`}</style>
      )}
      <h1 className="text-2xl font-bold text-center mb-1">{"일주 120유형 검수"}</h1>
      <p className="text-sm text-center text-gray-500 mb-3">
        {"총 " + ILJU_TYPES.length + "개 | 남 " + maleCount + " · 여 " + femaleCount}
      </p>

      {/* 성별 필터 칩 */}
      <div className="sticky top-0 z-30 flex justify-center gap-2 py-2 mb-4 bg-[#FDF6EE]/90 backdrop-blur">
        {chips.map(c => (
          <button
            key={c.key}
            onClick={() => setGender(c.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition ${
              gender === c.key
                ? c.key === "male"
                  ? "bg-blue-500 text-white border-blue-500"
                  : c.key === "female"
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-[#2D2D2D] text-white border-[#2D2D2D]"
                : "bg-white text-[#2D2D2D] border-[#2D2D2D]/20 hover:border-[#2D2D2D]/50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#2D2D2D] text-white text-left">
              <th className="p-2 sticky left-0 bg-[#2D2D2D] z-10">{"#"}</th>
              <th className="p-2 sticky left-8 bg-[#2D2D2D] z-10">{"ID"}</th>
              <th className="p-2">{"한자"}</th>
              <th className="p-2">{"성별"}</th>
              <th className="p-2">{"이모지"}</th>
              <th className="p-2 min-w-[140px]">{"이름"}</th>
              <th className="p-2 min-w-[200px]">{"태그라인"}</th>
              <th className="p-2 min-w-[160px]">{"강점"}</th>
              <th className="p-2 min-w-[120px]">{"약점"}</th>
              <th className="p-2 min-w-[200px]">{"대사 (quote)"}</th>
              <th className="p-2 min-w-[280px]">{"캐치포인트"}</th>
            </tr>
          </thead>
          <tbody>
            {ILJU_TYPES.map((t, i) => (gender !== "all" && t.gender !== gender) ? null : (
              <tr
                key={t.id}
                className={`border-b border-[#2D2D2D]/10 ${i % 2 === 0 ? "bg-white" : "bg-[#FDF6EE]"}`}
              >
                <td className="p-2 font-mono text-[#999] sticky left-0 bg-inherit z-10">{i + 1}</td>
                <td className="p-2 font-mono font-bold sticky left-8 bg-inherit z-10">
                  <a href={`#card-${t.id}`} className="text-blue-600 hover:underline">{t.id}</a>
                </td>
                <td className="p-2 font-mono">{t.hanja}</td>
                <td className="p-2">
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${t.gender === "male" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"}`}>
                    {t.gender === "male" ? "남" : "여"}
                  </span>
                </td>
                <td className="p-2 text-lg">{t.emoji}</td>
                <td className="p-2 font-bold text-[#2D2D2D]">{t.name}</td>
                <td className="p-2 text-[#666]">{t.tagline}</td>
                <td className="p-2">
                  {t.strengths.map((s) => (
                    <span key={s} className="inline-block bg-green-100 text-green-700 rounded px-1 py-0.5 mr-1 mb-0.5 text-[10px]">
                      {s}
                    </span>
                  ))}
                </td>
                <td className="p-2">
                  {t.weaknesses.map((w) => (
                    <span key={w} className="inline-block bg-red-100 text-red-600 rounded px-1 py-0.5 mr-1 mb-0.5 text-[10px]">
                      {w}
                    </span>
                  ))}
                </td>
                <td className="p-2 text-[#666] italic">{"“" + t.quote + "”"}</td>
                <td className="p-2 text-[#999]">{t.catchpoint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ═══ 오행 5종 스티커 ═══ */}
      <h2 className="text-xl font-bold text-center mt-16 mb-6">{"오행 5종 두들 스티커"}</h2>
      <div className="max-w-[600px] mx-auto flex justify-center gap-8 mb-16">
        {[
          { comp: <DoodleWood className="!w-16 !h-18" />, label: "목(木)", color: "#4ADE80" },
          { comp: <DoodleFlameFive className="!w-14 !h-18" />, label: "화(火)", color: "#F87171" },
          { comp: <DoodleEarth className="!w-16 !h-16" />, label: "토(土)", color: "#FBBF24" },
          { comp: <DoodleMetal className="!w-14 !h-16" />, label: "금(金)", color: "#E2E8F0" },
          { comp: <DoodleWater className="!w-14 !h-18" />, label: "수(水)", color: "#60A5FA" },
        ].map((el) => (
          <div key={el.label} className="flex flex-col items-center gap-2">
            <div className="bg-white rounded-2xl p-5 border-2 border-[#2D2D2D]/10">
              {el.comp}
            </div>
            <span className="text-xs font-bold" style={{ color: el.color }}>{el.label}</span>
          </div>
        ))}
      </div>

      {/* ═══ 오행 원형 뱃지 ═══ */}
      <h2 className="text-xl font-bold text-center mt-12 mb-6">{"오행 원형 뱃지"}</h2>
      <div className="max-w-[700px] mx-auto flex justify-center gap-6 mb-16">
        {[
          { label: "목", hanja: "木", bg: "#D1FAE5", border: "#4ADE80", inner: (
            <>
              <rect x="27" y="36" width="6" height="12" rx="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
              <circle cx="30" cy="26" r="13" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
              <circle cx="26" cy="24" r="1.8" fill="#2D2D2D" />
              <circle cx="34" cy="24" r="1.8" fill="#2D2D2D" />
              <path d="M27 30 Q30 33 33 30" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
              <ellipse cx="22" cy="28" rx="2.5" ry="1.2" fill="#4ADE80" opacity="0.5" />
              <ellipse cx="38" cy="28" rx="2.5" ry="1.2" fill="#4ADE80" opacity="0.5" />
              <path d="M40 20 Q44 17 42 23" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.8" />
            </>
          )},
          { label: "화", hanja: "火", bg: "#FEE2E2", border: "#F87171", inner: (
            <>
              <path d="M30 6 C30 6 14 22 14 32 A16 16 0 0 0 46 32 C46 22 30 6 30 6Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
              <path d="M30 18 C30 18 22 28 22 33 A8 8 0 0 0 38 33 C38 28 30 18 30 18Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
              <circle cx="26" cy="30" r="1.8" fill="#2D2D2D" />
              <circle cx="34" cy="30" r="1.8" fill="#2D2D2D" />
              <path d="M27 36 Q30 39 33 36" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
              <ellipse cx="22" cy="34" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.4" />
              <ellipse cx="38" cy="34" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.4" />
            </>
          )},
          { label: "토", hanja: "土", bg: "#FEF3C7", border: "#FBBF24", inner: (
            <>
              <path d="M8 46 L30 12 L52 46 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M22 20 L30 12 L38 20" fill="white" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
              <circle cx="26" cy="32" r="1.8" fill="#2D2D2D" />
              <circle cx="34" cy="32" r="1.8" fill="#2D2D2D" />
              <path d="M27 37 Q30 40 33 37" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
              <ellipse cx="22" cy="36" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.3" />
              <ellipse cx="38" cy="36" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.3" />
            </>
          )},
          { label: "금", hanja: "金", bg: "#F1F5F9", border: "#94A3B8", inner: (
            <>
              <path d="M30 6 L50 22 L30 50 L10 22 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M30 6 L18 22 L42 22 Z" fill="#F1F5F9" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
              <circle cx="25" cy="28" r="1.8" fill="#2D2D2D" />
              <circle cx="35" cy="28" r="1.8" fill="#2D2D2D" />
              <circle cx="25.5" cy="27.5" r="0.5" fill="white" />
              <circle cx="35.5" cy="27.5" r="0.5" fill="white" />
              <path d="M27 34 Q30 37 33 34" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
              <path d="M46 10 L47.5 14 L52 15.5 L47.5 17 L46 21 L44.5 17 L40 15.5 L44.5 14 Z" fill="#FACC15" opacity="0.5" />
            </>
          )},
          { label: "수", hanja: "水", bg: "#DBEAFE", border: "#60A5FA", inner: (
            <>
              <path d="M30 6 C30 6 12 24 12 34 A18 18 0 0 0 48 34 C48 24 30 6 30 6Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
              <ellipse cx="22" cy="20" rx="3.5" ry="1.5" fill="white" opacity="0.5" transform="rotate(-20 22 20)" />
              <circle cx="25" cy="30" r="1.8" fill="#2D2D2D" />
              <circle cx="35" cy="30" r="1.8" fill="#2D2D2D" />
              <circle cx="25.5" cy="29.5" r="0.5" fill="white" />
              <circle cx="35.5" cy="29.5" r="0.5" fill="white" />
              <path d="M27 36 Q30 39 33 36" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
              <ellipse cx="21" cy="34" rx="2.5" ry="1.2" fill="#3B82F6" opacity="0.3" />
              <ellipse cx="39" cy="34" rx="2.5" ry="1.2" fill="#3B82F6" opacity="0.3" />
            </>
          )},
        ].map((el) => (
          <div key={el.label} className="flex flex-col items-center gap-2">
            <svg viewBox="0 0 60 60" className="w-[80px] h-[80px]" fill="none">
              <circle cx="30" cy="30" r="28" fill={el.bg} stroke={el.border} strokeWidth="1.5" />
              <g transform="translate(0, 0) scale(1)">
                {el.inner}
              </g>
            </svg>
            <span className="text-xs font-bold" style={{ color: el.border }}>{el.label + "(" + el.hanja + ")"}</span>
          </div>
        ))}
      </div>

      {/* ═══ 일주 두들 캐릭터 시안 ═══ */}
      <h2 className="text-xl font-bold text-center mt-16 mb-2">{"일주 두들 캐릭터 시안"}</h2>
      <p className="text-sm text-center text-gray-500 mb-8">{"일주별 특성을 하나의 캐릭터로"}</p>

      <div className="max-w-[800px] mx-auto grid grid-cols-3 gap-8 mb-12">
        <WoodCharacters />
        <FireCharacters />
        <EarthCharacters />
        <MetalCharacters />
        <WaterCharacters />
      </div>

      {/* ═══ 유명인 두들 캐릭터 ═══ */}
      <h2 className="text-xl font-bold text-center mt-16 mb-2">{"유명인 두들 캐릭터"}</h2>
      <p className="text-sm text-center text-gray-500 mb-8">{"실존 인물 두들 시안"}</p>
      <div className="max-w-[800px] mx-auto grid grid-cols-3 gap-8 mb-16">

        {/* 젠슨 황 */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#ECFDF5] to-[#D1FAE5] rounded-2xl p-6 border-2 border-[#4ADE80]/25 w-full flex justify-center relative overflow-hidden">
            {/* 배경 — 회로 기판 패턴 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <rect x="18" y="18" width="44" height="28" rx="3" stroke="#4ADE80" strokeWidth="0.8" opacity="0.15" fill="none"/>
              <line x1="62" y1="32" x2="95" y2="32" stroke="#4ADE80" strokeWidth="0.8" opacity="0.1"/>
              <circle cx="95" cy="32" r="2.5" fill="#4ADE80" opacity="0.12"/>
              <line x1="97.5" y1="32" x2="120" y2="32" stroke="#4ADE80" strokeWidth="0.8" opacity="0.1"/>
              <rect x="138" y="58" width="44" height="32" rx="3" stroke="#4ADE80" strokeWidth="0.8" opacity="0.12" fill="none"/>
              <line x1="160" y1="90" x2="160" y2="114" stroke="#4ADE80" strokeWidth="0.8" opacity="0.1"/>
              <circle cx="160" cy="116" r="2.5" fill="#4ADE80" opacity="0.1"/>
              <rect x="22" y="142" width="58" height="42" rx="3" stroke="#4ADE80" strokeWidth="0.8" opacity="0.1" fill="none"/>
              <line x1="33" y1="157" x2="70" y2="157" stroke="#4ADE80" strokeWidth="0.5" opacity="0.1"/>
              <line x1="33" y1="164" x2="66" y2="164" stroke="#4ADE80" strokeWidth="0.5" opacity="0.1"/>
              <line x1="33" y1="171" x2="60" y2="171" stroke="#4ADE80" strokeWidth="0.5" opacity="0.1"/>
              <path d="M152 140 L163 128 M167 124 L178 140" stroke="#4ADE80" strokeWidth="0.8" opacity="0.1"/>
              <circle cx="163" cy="127" r="2.5" fill="#4ADE80" opacity="0.1"/>
              <line x1="100" y1="165" x2="130" y2="165" stroke="#4ADE80" strokeWidth="0.6" opacity="0.08"/>
              <circle cx="132" cy="165" r="1.5" fill="#4ADE80" opacity="0.08"/>
            </svg>
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 헤어 — 전체 은회색 베이스 */}
              <path d="M24 29 Q22 17 25 10 Q30 7 40 7 Q50 7 55 10 Q58 17 56 29 Z" fill="#9CA3AF" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 정수리 진회색 — 볼륨감/깊이 */}
              <path d="M31 9 Q40 7 49 9 Q46 14 40 13 Q34 14 31 9 Z" fill="#6B7280" opacity="0.5"/>
              {/* 측두부 밝은 은발 */}
              <path d="M24 29 Q22 19 25 11" stroke="#D1D5DB" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7"/>
              <path d="M56 29 Q58 19 55 11" stroke="#D1D5DB" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7"/>
              {/* 머리카락 결 방향선 */}
              <path d="M27 11 Q33 9 39 10" stroke="#BEC5CE" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.65"/>
              <path d="M41 10 Q47 9 53 11" stroke="#BEC5CE" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.65"/>
              <path d="M25 18 Q30 16 35 17" stroke="#C8CDD7" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55"/>
              <path d="M45 17 Q50 16 55 18" stroke="#C8CDD7" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55"/>
              <path d="M24 24 Q28 22 33 23" stroke="#D1D5DB" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.45"/>
              <path d="M47 23 Q52 22 56 24" stroke="#D1D5DB" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.45"/>
              {/* 얼굴 — 약간 통통한 원형 */}
              <circle cx="40" cy="36" r="15" fill="#EFBA87" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 눈썹 — 짙고 약간 수평 */}
              <path d="M26 29 Q31 27 36 29" stroke="#374151" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              <path d="M44 29 Q49 27 54 29" stroke="#374151" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              {/* 안경 — 직사각형 얇은 프레임 (핵심 특징!) */}
              <rect x="24" y="31" width="12.5" height="8" rx="1.5" fill="none" stroke="#1F2937" strokeWidth="1.8"/>
              <rect x="43.5" y="31" width="12.5" height="8" rx="1.5" fill="none" stroke="#1F2937" strokeWidth="1.8"/>
              {/* 안경 브릿지 */}
              <path d="M36.5 35.5 Q40 34.5 43.5 35.5" stroke="#1F2937" strokeWidth="1.3" fill="none"/>
              {/* 안경 다리 */}
              <line x1="14" y1="34.5" x2="24" y2="34.5" stroke="#1F2937" strokeWidth="1.2"/>
              <line x1="56" y1="34.5" x2="66" y2="34.5" stroke="#1F2937" strokeWidth="1.2"/>
              {/* 눈 — 안경 안 */}
              <circle cx="30.5" cy="35" r="2.3" fill="#2D2D2D"/>
              <circle cx="49.5" cy="35" r="2.3" fill="#2D2D2D"/>
              <circle cx="31.4" cy="34.1" r="0.8" fill="white"/>
              <circle cx="50.4" cy="34.1" r="0.8" fill="white"/>
              {/* 코 — 은은하게 */}
              <path d="M38 40 Q40 43 42 40" stroke="#2D2D2D" strokeWidth="1" fill="none" opacity="0.35" strokeLinecap="round"/>
              {/* 볼 — 통통하고 따뜻한 */}
              <ellipse cx="27" cy="41" rx="4.5" ry="2.8" fill="#FCA5A5" opacity="0.22"/>
              <ellipse cx="53" cy="41" rx="4.5" ry="2.8" fill="#FCA5A5" opacity="0.22"/>
              {/* 눈가 주름 (환한 미소형) */}
              <path d="M22 39 Q20 41 22 43" stroke="#C47B5A" strokeWidth="0.8" fill="none" opacity="0.28"/>
              <path d="M58 39 Q60 41 58 43" stroke="#C47B5A" strokeWidth="0.8" fill="none" opacity="0.28"/>
              {/* 입 — 활짝 치아 드러나는 환한 미소 */}
              <path d="M30 44 Q40 51 50 44" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M31 44 Q40 50 49 44 L49 46.5 Q40 53 31 46.5 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.6"/>
              {/* 몸통 — 시그니처 블랙 레더 재킷 */}
              <rect x="21" y="52" width="38" height="30" rx="3" fill="#111827" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 재킷 라펠 왼쪽 */}
              <path d="M40 52 L33 64 L21 59" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
              {/* 재킷 라펠 오른쪽 */}
              <path d="M40 52 L47 64 L59 59" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
              {/* V넥 검정 티셔츠 (안쪽) */}
              <path d="M33 64 L40 73 L47 64" fill="#0F172A" stroke="#374151" strokeWidth="0.8" strokeLinejoin="round"/>
              {/* 지퍼 선 */}
              <line x1="40" y1="73" x2="40" y2="82" stroke="#374151" strokeWidth="1" opacity="0.45"/>
              {/* 가죽 광택 하이라이트 */}
              <path d="M23 58 Q25 55 27 60" stroke="#374151" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
              <path d="M53 58 Q55 55 57 60" stroke="#374151" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
              {/* 어깨 확장 */}
              <path d="M21 53 Q15 58 14 65" stroke="#111827" strokeWidth="5" strokeLinecap="round" fill="none"/>
              <path d="M59 53 Q65 58 66 65" stroke="#111827" strokeWidth="5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{"🖥️ 젠슨 황"}</p>
          <p className="text-xs text-gray-500 text-center">{"Jensen Huang · NVIDIA CEO"}</p>
        </div>

        {/* 세종대왕 */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF9E7] to-[#FEF3C7] rounded-2xl p-6 border-2 border-[#D97706]/25 w-full flex justify-center relative overflow-hidden">
            {/* 배경 — 전통 문양 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M15 30 Q25 20 35 30 Q45 40 55 30 Q65 20 75 30" stroke="#D97706" strokeWidth="0.9" opacity="0.1" fill="none"/>
              <path d="M125 75 Q135 65 145 75 Q155 85 165 75 Q175 65 185 75" stroke="#D97706" strokeWidth="0.9" opacity="0.1" fill="none"/>
              <path d="M10 125 Q25 113 40 125 Q55 137 70 125 Q85 113 100 125" stroke="#D97706" strokeWidth="0.7" opacity="0.09" fill="none"/>
              <path d="M100 165 Q120 153 140 165 Q160 177 180 165" stroke="#D97706" strokeWidth="0.7" opacity="0.08" fill="none"/>
              <rect x="12" y="12" width="176" height="176" rx="4" stroke="#D97706" strokeWidth="0.5" opacity="0.06" fill="none"/>
              <path d="M45 168 Q65 156 90 164 Q110 172 135 156 Q155 140 172 153" stroke="#D97706" strokeWidth="1.1" opacity="0.08" fill="none"/>
              <circle cx="30" cy="170" r="7" stroke="#D97706" strokeWidth="0.5" opacity="0.07" fill="none"/>
              <circle cx="170" cy="30" r="7" stroke="#D97706" strokeWidth="0.5" opacity="0.07" fill="none"/>
            </svg>
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 곤룡포 — 먼저 (뒤에) */}
              {/* 왼쪽 소매 — 넓게 펼침 */}
              <path d="M0 56 Q0 68 2 84 L24 86 L27 56 Z" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.3"/>
              {/* 오른쪽 소매 */}
              <path d="M80 56 Q80 68 78 84 L56 86 L53 56 Z" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.3"/>
              {/* 몸통 용포 */}
              <path d="M27 54 Q21 62 19 86 L61 86 Q59 62 53 54 Q47 50 40 50 Q33 50 27 54 Z" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 소매 경계선 */}
              <line x1="27" y1="57" x2="24" y2="86" stroke="#B91C1C" strokeWidth="0.9" opacity="0.45"/>
              <line x1="53" y1="57" x2="56" y2="86" stroke="#B91C1C" strokeWidth="0.9" opacity="0.45"/>
              {/* 용 문양 흉배 */}
              <ellipse cx="40" cy="69" rx="14" ry="9" fill="#FEF9C3" stroke="#D97706" strokeWidth="0.9" opacity="0.9"/>
              <path d="M29 67 Q34 63 40 66 Q46 69 51 66" stroke="#B45309" strokeWidth="1.3" fill="none" opacity="0.8"/>
              <path d="M31 71 Q36 68 40 70 Q44 72 49 69" stroke="#B45309" strokeWidth="1" fill="none" opacity="0.7"/>
              <circle cx="29" cy="67" r="2.5" fill="#D97706" stroke="#B45309" strokeWidth="0.8" opacity="0.9"/>
              <path d="M29 66 L27 63 L31 64 Z" fill="#D97706" opacity="0.7"/>
              {/* 흰 옷깃 */}
              <path d="M32 52 Q36 56 40 59 Q44 56 48 52 Q45 63 40 65 Q35 63 32 52 Z" fill="#F8FAFC" stroke="#D1D5DB" strokeWidth="0.8"/>
              {/* 얼굴 */}
              <circle cx="40" cy="44" r="13" fill="#F5D9B5" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 익선관 — 얼굴 위에 씌움 */}
              {/* 날개 좌 */}
              <path d="M30 13 Q31 5 34 5 Q37 6 37 13 L36 17 Q33 18 31 17 Z" fill="#111827" stroke="#2D2D2D" strokeWidth="1"/>
              {/* 날개 우 */}
              <path d="M43 13 Q43 5 46 5 Q49 6 50 13 L49 17 Q47 18 44 17 Z" fill="#111827" stroke="#2D2D2D" strokeWidth="1"/>
              {/* 모자 돔 */}
              <path d="M21 35 Q20 8 40 6 Q60 8 59 35 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 모자 챙 */}
              <ellipse cx="40" cy="35" rx="21" ry="5.5" fill="#111827" stroke="#2D2D2D" strokeWidth="1.3"/>
              {/* 모자 광택선 */}
              <path d="M26 14 Q30 11 35 16" stroke="#374151" strokeWidth="0.9" fill="none" opacity="0.55"/>
              {/* 이목구비 — 챙 아래 (y≥41) */}
              {/* 눈썹 */}
              <path d="M29 41 Q34 39 39 41" stroke="#2D2D2D" strokeWidth="1.9" fill="none" strokeLinecap="round"/>
              <path d="M41 41 Q46 39 51 41" stroke="#2D2D2D" strokeWidth="1.9" fill="none" strokeLinecap="round"/>
              {/* 눈 — 위엄있는 아몬드형 */}
              <path d="M29.5 44 Q33 41.5 37 44 Q33 46 29.5 44 Z" fill="#1F2937"/>
              <path d="M43 44 Q47 41.5 50.5 44 Q47 46 43 44 Z" fill="#1F2937"/>
              <circle cx="32" cy="43.5" r="0.8" fill="white" opacity="0.7"/>
              <circle cx="46" cy="43.5" r="0.8" fill="white" opacity="0.7"/>
              {/* 코 */}
              <path d="M38 47.5 Q40 50.5 42 47.5" stroke="#2D2D2D" strokeWidth="0.9" fill="none" opacity="0.35" strokeLinecap="round"/>
              {/* 콧수염 */}
              <path d="M35 51 Q40 53.5 45 51" stroke="#111827" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
              {/* 입 */}
              <path d="M35 55 Q40 57 45 55" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              {/* 턱수염 — V형 뾰족 */}
              <path d="M34 57 Q32 63 34 69 Q37 74 40 74 Q43 74 46 69 Q48 63 46 57" stroke="#111827" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
              <path d="M36 59 Q40 64 44 59" stroke="#374151" strokeWidth="0.9" fill="none" opacity="0.4"/>
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{"👑 세종대왕"}</p>
          <p className="text-xs text-gray-500 text-center">{"世宗大王 · 조선 제4대 임금"}</p>
        </div>

        {/* 이재용 */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] rounded-2xl p-6 border-2 border-[#3B82F6]/20 w-full flex justify-center relative overflow-hidden">
            {/* 배경 — 삼성 테크 모티프 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <rect x="18" y="18" width="52" height="34" rx="4" stroke="#3B82F6" strokeWidth="0.7" opacity="0.1" fill="none"/>
              <line x1="70" y1="35" x2="100" y2="35" stroke="#3B82F6" strokeWidth="0.7" opacity="0.08"/>
              <circle cx="102" cy="35" r="2.2" fill="#3B82F6" opacity="0.1"/>
              <line x1="104" y1="35" x2="138" y2="35" stroke="#3B82F6" strokeWidth="0.7" opacity="0.08"/>
              <rect x="140" y="58" width="42" height="30" rx="4" stroke="#3B82F6" strokeWidth="0.7" opacity="0.1" fill="none"/>
              <line x1="161" y1="88" x2="161" y2="114" stroke="#3B82F6" strokeWidth="0.7" opacity="0.08"/>
              <circle cx="161" cy="116" r="2.2" fill="#3B82F6" opacity="0.09"/>
              <rect x="22" y="145" width="56" height="40" rx="4" stroke="#3B82F6" strokeWidth="0.7" opacity="0.09" fill="none"/>
              <line x1="34" y1="158" x2="68" y2="158" stroke="#3B82F6" strokeWidth="0.4" opacity="0.08"/>
              <line x1="34" y1="165" x2="65" y2="165" stroke="#3B82F6" strokeWidth="0.4" opacity="0.08"/>
              <line x1="34" y1="172" x2="62" y2="172" stroke="#3B82F6" strokeWidth="0.4" opacity="0.07"/>
            </svg>
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 헤어 — 짧은 검정 숏컷, 가르마 */}
              <path d="M23 30 Q22 11 40 9 Q58 11 57 30 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 가르마 (왼쪽) */}
              <path d="M36 10 Q34 16 33 22" stroke="#374151" strokeWidth="0.9" fill="none" opacity="0.6"/>
              {/* 앞머리 볼륨 */}
              <path d="M24 30 Q27 22 36 20 Q38 19 40 20" stroke="#374151" strokeWidth="1.1" fill="none" opacity="0.4"/>
              {/* 얼굴 */}
              <circle cx="40" cy="36" r="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 눈썹 */}
              <path d="M26 29 Q31 27 36 29" stroke="#374151" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <path d="M44 29 Q49 27 54 29" stroke="#374151" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              {/* 안경 — 얇은 직사각 */}
              <rect x="24" y="31" width="12" height="7.5" rx="1.2" fill="none" stroke="#4B5563" strokeWidth="1.5"/>
              <rect x="44" y="31" width="12" height="7.5" rx="1.2" fill="none" stroke="#4B5563" strokeWidth="1.5"/>
              <path d="M36 34.8 Q40 33.8 44 34.8" stroke="#4B5563" strokeWidth="1.1" fill="none"/>
              <line x1="14" y1="34.5" x2="24" y2="34.5" stroke="#4B5563" strokeWidth="1"/>
              <line x1="56" y1="34.5" x2="66" y2="34.5" stroke="#4B5563" strokeWidth="1"/>
              {/* 눈 */}
              <circle cx="30" cy="35" r="2.2" fill="#2D2D2D"/>
              <circle cx="50" cy="35" r="2.2" fill="#2D2D2D"/>
              <circle cx="30.8" cy="34.2" r="0.8" fill="white"/>
              <circle cx="50.8" cy="34.2" r="0.8" fill="white"/>
              {/* 코 */}
              <path d="M38 40 Q40 43 42 40" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round"/>
              {/* 볼 */}
              <ellipse cx="27" cy="40" rx="4.5" ry="2.8" fill="#FCA5A5" opacity="0.22"/>
              <ellipse cx="53" cy="40" rx="4.5" ry="2.8" fill="#FCA5A5" opacity="0.22"/>
              {/* 입 — 부드러운 미소 */}
              <path d="M32 45 Q40 50 48 45" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              {/* 몸통 — 네이비 수트 */}
              <rect x="22" y="52" width="36" height="30" rx="3" fill="#1E3A5F" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 라펠 좌 */}
              <path d="M40 52 L33 63 L22 58" fill="#172B47" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
              {/* 라펠 우 */}
              <path d="M40 52 L47 63 L58 58" fill="#172B47" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
              {/* 흰 셔츠 V */}
              <path d="M33 63 L40 72 L47 63" fill="white" stroke="#E5E7EB" strokeWidth="0.8" strokeLinejoin="round"/>
              {/* 상단 칼라 */}
              <path d="M36 52 L40 58 L44 52" fill="white" stroke="#E5E7EB" strokeWidth="0.6"/>
              {/* 살몬 넥타이 */}
              <path d="M38.5 57 L40 59 L41.5 57 L41.5 71 L40 73 L38.5 71 Z" fill="#FB923C" stroke="#EA580C" strokeWidth="0.7" strokeLinejoin="round"/>
              {/* 수트 광택 */}
              <path d="M24 58 Q26 55 27 62" stroke="#2A4A73" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.6"/>
              <path d="M53 58 Q55 55 56 62" stroke="#2A4A73" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.6"/>
              {/* 어깨 */}
              <path d="M22 53 Q15 58 14 65" stroke="#1E3A5F" strokeWidth="5" strokeLinecap="round" fill="none"/>
              <path d="M58 53 Q65 58 66 65" stroke="#1E3A5F" strokeWidth="5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{"💼 이재용"}</p>
          <p className="text-xs text-gray-500 text-center">{"Lee Jae-yong · 삼성전자 회장"}</p>
        </div>

        {/* 아이유 */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FFF1F2] to-[#FFE4E6] rounded-2xl p-6 border-2 border-[#FDA4AF]/25 w-full flex justify-center relative overflow-hidden">
            {/* 배경 — 음악/스타 모티프 */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M165 28 L167 20 L169 28 L177 30 L169 32 L167 40 L165 32 L157 30 Z" fill="#FDA4AF" opacity="0.14"/>
              <path d="M22 138 L23.5 131 L25 138 L32 139.5 L25 141 L23.5 148 L22 141 L15 139.5 Z" fill="#FDA4AF" opacity="0.1"/>
              <path d="M140 160 L141 155 L142 160 L147 161 L142 162 L141 167 L140 162 L135 161 Z" fill="#FDA4AF" opacity="0.1"/>
              <circle cx="145" cy="40" r="3.5" fill="#FDA4AF" opacity="0.14"/>
              <circle cx="35" cy="95" r="2.5" fill="#FDA4AF" opacity="0.1"/>
              <circle cx="170" cy="115" r="3" fill="#FDA4AF" opacity="0.12"/>
              <text x="18" y="52" fontSize="20" fill="#FDA4AF" opacity="0.14" fontFamily="serif">{"♪"}</text>
              <text x="148" y="82" fontSize="24" fill="#FDA4AF" opacity="0.11" fontFamily="serif">{"♫"}</text>
              <text x="75" y="168" fontSize="16" fill="#FDA4AF" opacity="0.1" fontFamily="serif">{"♩"}</text>
            </svg>
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 헤어 — 긴 흑발 웨이브 장발 (닫힌 Z path) */}
              <path d="M19 30 Q18 8 40 6 Q62 8 61 30 L64 68 Q62 78 58 82 Q52 88 44 86 Q40 85 36 86 Q28 88 22 82 Q18 78 16 68 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 웨이브 결 — 좌 */}
              <path d="M19 42 Q16 50 19 58 Q22 66 18 74" stroke="#374151" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.5"/>
              {/* 웨이브 결 — 우 */}
              <path d="M61 42 Q64 50 61 58 Q58 66 62 74" stroke="#374151" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.5"/>
              {/* 앞머리 가르마 */}
              <path d="M30 8 Q36 12 38 10" stroke="#374151" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.5"/>
              {/* 얼굴 — 갸름한 타원, 여성 */}
              <ellipse cx="40" cy="33" rx="13.5" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 속눈썹 */}
              <path d="M28 27 Q31.5 25 35 27" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M45 27 Q48.5 25 52 27" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              {/* 눈썹 — 부드러운 아치 */}
              <path d="M27 25.5 Q31.5 23 36 25" stroke="#374151" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
              <path d="M44 25 Q48.5 23 53 25.5" stroke="#374151" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
              {/* 눈 — 크고 아몬드형 */}
              <ellipse cx="31.5" cy="30" rx="4.5" ry="4" fill="#1F2937"/>
              <ellipse cx="48.5" cy="30" rx="4.5" ry="4" fill="#1F2937"/>
              {/* 쌍꺼풀 선 */}
              <path d="M27.5 28 Q31.5 26 35.5 28" stroke="#2D2D2D" strokeWidth="0.6" fill="none" opacity="0.5"/>
              <path d="M44.5 28 Q48.5 26 52.5 28" stroke="#2D2D2D" strokeWidth="0.6" fill="none" opacity="0.5"/>
              {/* 눈 하이라이트 */}
              <circle cx="30" cy="28.5" r="1.4" fill="white" opacity="0.9"/>
              <circle cx="47" cy="28.5" r="1.4" fill="white" opacity="0.9"/>
              {/* 코 */}
              <path d="M38 36 Q40 39.5 42 36" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round"/>
              {/* 볼터치 */}
              <ellipse cx="25" cy="35" rx="5.5" ry="3" fill="#FCA5A5" opacity="0.5"/>
              <ellipse cx="55" cy="35" rx="5.5" ry="3" fill="#FCA5A5" opacity="0.5"/>
              {/* 입술 — 코랄 미소 */}
              <path d="M33 40 Q40 45 47 40" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              <path d="M34 40 Q40 44.5 46 40 L46 42 Q40 47 34 42 Z" fill="#FB7185"/>
              {/* 몸통 — 흰 드레스 (스트랩리스) */}
              <path d="M28 49 Q25 54 24 68 L56 68 Q55 54 52 49 Q46 47 40 47 Q34 47 28 49 Z" fill="#F8FAFC" stroke="#D1D5DB" strokeWidth="1.3"/>
              {/* 드레스 상단 경계 */}
              <path d="M28 49 Q40 46 52 49" stroke="#D1D5DB" strokeWidth="0.8" fill="none"/>
              {/* 드레스 레이스 디테일 */}
              <path d="M29 55 Q33 57 37 55" stroke="#E5E7EB" strokeWidth="0.9" fill="none" opacity="0.7"/>
              <path d="M43 55 Q47 57 51 55" stroke="#E5E7EB" strokeWidth="0.9" fill="none" opacity="0.7"/>
              <path d="M27 61 Q31 63 35 61" stroke="#E5E7EB" strokeWidth="0.9" fill="none" opacity="0.6"/>
              <path d="M45 61 Q49 63 53 61" stroke="#E5E7EB" strokeWidth="0.9" fill="none" opacity="0.6"/>
              {/* 오른팔 + 손 흔들기 — 맨 마지막 (앞에 배치) */}
              <path d="M52 58 Q60 50 67 42" stroke="#FDDCB5" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
              {/* 손바닥 */}
              <ellipse cx="69" cy="39" rx="5.5" ry="5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.2"/>
              {/* 손가락 4개 */}
              <line x1="65" y1="35.5" x2="63.5" y2="28" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
              <line x1="68.5" y1="34.5" x2="68" y2="27" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
              <line x1="72" y1="34.5" x2="72.5" y2="27" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
              <line x1="74.5" y1="36" x2="76" y2="29" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{"🎵 아이유"}</p>
          <p className="text-xs text-gray-500 text-center">{"IU · 가수/배우"}</p>
        </div>

        {/* 만수르 */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF9E7] to-[#FEF3C7] rounded-2xl p-6 border-2 border-[#D4A553]/25 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <rect x="0" y="0" width="7" height="200" fill="#EF4444" opacity="0.06"/>
              <path d="M168 180 L168 140 Q162 128 157 126 Q162 130 168 126 Q174 130 179 126 Q174 128 168 140 L168 180" stroke="#D4A553" strokeWidth="0.7" opacity="0.1" fill="none"/>
              <path d="M30 118 Q30 96 52 96 Q74 96 74 118 L74 152 L30 152 Z" stroke="#D4A553" strokeWidth="0.6" opacity="0.08" fill="none"/>
              <path d="M100 26 L101.5 20 L103 26 L109 27.5 L103 29 L101.5 35 L100 29 L94 27.5 Z" fill="#D4A553" opacity="0.1"/>
              <path d="M138 78 Q138 56 160 56 Q182 56 182 78 L182 112 L138 112 Z" stroke="#D4A553" strokeWidth="0.5" opacity="0.07" fill="none"/>
            </svg>
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 칸두라 (금색 로브) */}
              <path d="M14 54 Q10 64 8 88 L72 88 Q70 64 66 54 Q56 50 40 50 Q24 50 14 54 Z" fill="#D4A553" stroke="#2D2D2D" strokeWidth="1.5"/>
              <path d="M34 52 L40 65 L46 52" fill="#C4903A" stroke="#B87D28" strokeWidth="0.8" strokeLinejoin="round"/>
              <line x1="34" y1="54" x2="31" y2="74" stroke="#B87D28" strokeWidth="0.7" opacity="0.5"/>
              <line x1="46" y1="54" x2="49" y2="74" stroke="#B87D28" strokeWidth="0.7" opacity="0.5"/>
              {/* 구트라 — 상단·좌·우 하나로 연결된 흰 천 */}
              <path d="M8 86 Q4 50 6 34 Q7 6 40 4 Q73 6 74 34 Q76 50 72 86 Z" fill="white" stroke="#D1D5DB" strokeWidth="1.3"/>
              {/* 좌측 드레이프 주름 */}
              <path d="M9 36 Q7 52 9 70 Q11 78 18 82" stroke="#E5E7EB" strokeWidth="0.9" fill="none" opacity="0.6"/>
              <path d="M15 36 Q13 50 15 66" stroke="#E5E7EB" strokeWidth="0.6" fill="none" opacity="0.4"/>
              {/* 우측 드레이프 주름 */}
              <path d="M71 36 Q73 52 71 70 Q69 78 62 82" stroke="#E5E7EB" strokeWidth="0.9" fill="none" opacity="0.6"/>
              <path d="M65 36 Q67 50 65 66" stroke="#E5E7EB" strokeWidth="0.6" fill="none" opacity="0.4"/>
              {/* 얼굴 */}
              <ellipse cx="40" cy="45" rx="13.5" ry="14.5" fill="#C8956C" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 아갈 하단 링 */}
              <ellipse cx="40" cy="33" rx="17" ry="5.5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.3"/>
              {/* 아갈 상단 링 */}
              <ellipse cx="40" cy="27" rx="15" ry="4.8" fill="#111827" stroke="#2D2D2D" strokeWidth="1.1"/>
              <path d="M26 27 Q33 25 40 27" stroke="#374151" strokeWidth="0.9" fill="none" opacity="0.5"/>
              {/* 구트라 상단 돔 (아갈 위) */}
              <path d="M22 30 Q21 5 40 3 Q59 5 58 30 Z" fill="white" stroke="#D1D5DB" strokeWidth="1.2"/>
              <path d="M29 8 Q35 6 41 8" stroke="#E5E7EB" strokeWidth="0.8" fill="none" opacity="0.5"/>
              <path d="M26 16 Q32 14 38 16" stroke="#E5E7EB" strokeWidth="0.6" fill="none" opacity="0.4"/>
              {/* 눈썹 — y=41 (아갈 아래) */}
              <path d="M29 41 Q34 39 39 41" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M41 41 Q46 39 51 41" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
              {/* 눈 — 살짝 오른쪽 방향 */}
              <ellipse cx="34" cy="45" rx="3.5" ry="3" fill="#1F2937"/>
              <ellipse cx="47" cy="45" rx="3.5" ry="3" fill="#1F2937"/>
              <circle cx="33" cy="44" r="0.9" fill="white" opacity="0.7"/>
              <circle cx="46" cy="44" r="0.9" fill="white" opacity="0.7"/>
              {/* 코 */}
              <path d="M37 49 Q40 52.5 43 49" stroke="#2D2D2D" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"/>
              {/* 볼 */}
              <ellipse cx="27.5" cy="48" rx="4" ry="2.5" fill="#D4856A" opacity="0.2"/>
              <ellipse cx="52.5" cy="48" rx="4" ry="2.5" fill="#D4856A" opacity="0.2"/>
              {/* 콧수염 */}
              <path d="M34 51 Q40 53.5 46 51" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
              {/* 입 — 따뜻한 미소 */}
              <path d="M32 54 Q40 59 48 54" stroke="#2D2D2D" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
              {/* 수염 — 볼 양쪽 + 턱 */}
              <path d="M26 50 Q23 56 25 62 Q28 68 33 70" stroke="#1F2937" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
              <path d="M54 50 Q57 56 55 62 Q52 68 47 70" stroke="#1F2937" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
              <path d="M33 70 Q36 73 40 73 Q44 73 47 70" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{"🤍 만수르"}</p>
          <p className="text-xs text-gray-500 text-center">{"Sheikh Mansour · UAE 부통령"}</p>
        </div>

        {/* 일론 머스크 */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] rounded-2xl p-6 border-2 border-[#93C5FD]/30 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="160" cy="50" r="18" stroke="#60A5FA" strokeWidth="0.8" opacity="0.15" fill="none"/>
              <circle cx="160" cy="50" r="10" stroke="#60A5FA" strokeWidth="0.5" opacity="0.1" fill="none"/>
              <path d="M30 150 L35 130 L25 130 Z" stroke="#3B82F6" strokeWidth="0.7" opacity="0.1" fill="none"/>
              <path d="M38 150 L40 120 L42 150" stroke="#3B82F6" strokeWidth="0.5" opacity="0.1" fill="none"/>
              <line x1="36" y1="120" x2="44" y2="120" stroke="#3B82F6" strokeWidth="0.5" opacity="0.1"/>
              <circle cx="100" cy="100" r="40" stroke="#93C5FD" strokeWidth="0.5" opacity="0.12" fill="none"/>
              <circle cx="100" cy="100" r="60" stroke="#93C5FD" strokeWidth="0.4" opacity="0.09" fill="none"/>
              <path d="M155 160 L158 152 L161 160 L169 163 L161 166 L158 174 L155 166 L147 163 Z" fill="#60A5FA" opacity="0.12"/>
            </svg>
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 헤어 — 텁수룩한 다크 브라운, 불규칙 볼륨 */}
              <path d="M22 36 Q21 22 23 14 Q25 8 30 6 Q36 3 40 5 Q45 3 50 6 Q56 8 58 16 Q60 22 58 36 Q54 28 50 24 Q46 19 42 22 Q40 24 38 22 Q35 19 30 24 Q26 28 22 36 Z" fill="#2D1810" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 헤어 결 — 텁수룩 효과 */}
              <path d="M24 22 Q28 17 32 20" stroke="#4B2D18" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7"/>
              <path d="M36 10 Q40 8 44 11" stroke="#4B2D18" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7"/>
              <path d="M48 12 Q52 10 56 16" stroke="#4B2D18" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7"/>
              {/* 헤어 앞머리 흘러내림 */}
              <path d="M30 22 Q31 27 28 32" stroke="#2D1810" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6"/>
              <path d="M35 20 Q35 25 32 30" stroke="#2D1810" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
              {/* 얼굴 — 넓고 큰, 약간 오른쪽 향함 */}
              <circle cx="40" cy="38" r="16" fill="#F5D5A3" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 눈썹 — 중간 굵기 */}
              <path d="M25 31 Q30 29 36 31" stroke="#374151" strokeWidth="1.9" fill="none" strokeLinecap="round"/>
              <path d="M44 31 Q49 29 54 31" stroke="#374151" strokeWidth="1.9" fill="none" strokeLinecap="round"/>
              {/* 눈 */}
              <circle cx="31" cy="36" r="2.8" fill="#2D2D2D"/>
              <circle cx="49" cy="36" r="2.8" fill="#2D2D2D"/>
              <circle cx="30.2" cy="35" r="1" fill="white"/>
              <circle cx="48.2" cy="35" r="1" fill="white"/>
              {/* 코 — 약간 도드라짐 */}
              <path d="M37 41 Q38 44 40 45 Q42 44 43 41" stroke="#2D2D2D" strokeWidth="1.1" fill="none" opacity="0.45" strokeLinecap="round"/>
              <path d="M36 44 Q38 46 40 45 Q42 46 44 44" stroke="#2D2D2D" strokeWidth="0.9" fill="none" opacity="0.35"/>
              {/* 볼 */}
              <ellipse cx="24" cy="41" rx="4.5" ry="2.8" fill="#FCA5A5" opacity="0.2"/>
              <ellipse cx="56" cy="41" rx="4.5" ry="2.8" fill="#FCA5A5" opacity="0.2"/>
              {/* 스마크 — 비대칭, 오른쪽으로 살짝 올라감 */}
              <path d="M30 47 Q36 50 44 46" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              {/* 몸통 — 블랙 턱시도 */}
              <rect x="18" y="55" width="44" height="28" rx="3" fill="#0F172A" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 새틴 라펠 — 넓은 삼각형 */}
              <path d="M40 55 L30 68 L18 62" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M40 55 L50 68 L62 62" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
              {/* 새틴 라펠 광택 */}
              <path d="M34 62 Q36 65 32 68" stroke="#334155" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
              <path d="M46 62 Q44 65 48 68" stroke="#334155" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
              {/* 흰 셔츠 V */}
              <path d="M30 68 L40 76 L50 68" fill="white" stroke="#E5E7EB" strokeWidth="0.9" strokeLinejoin="round"/>
              {/* 칼라 */}
              <path d="M36 55 L40 61 L44 55" fill="white" stroke="#E5E7EB" strokeWidth="0.6"/>
              {/* 어깨 — 넓게 */}
              <path d="M18 56 Q10 62 9 70" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" fill="none"/>
              <path d="M62 56 Q70 62 71 70" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{"🚀 일론 머스크"}</p>
          <p className="text-xs text-gray-500 text-center">{"Elon Musk · Tesla·SpaceX CEO"}</p>
        </div>

        {/* 엘리자베스 2세 */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#CCFBF1] to-[#99F6E4] rounded-2xl p-6 border-2 border-[#14B8A6]/25 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M100 20 L103 8 L106 20 L118 23 L106 26 L103 38 L100 26 L88 23 Z" stroke="#14B8A6" strokeWidth="0.6" opacity="0.12" fill="none"/>
              <path d="M30 60 Q26 56 30 52 Q34 56 38 52 Q34 56 38 60 Q34 64 30 60 Z" stroke="#14B8A6" strokeWidth="0.5" opacity="0.1" fill="none"/>
              <path d="M162 90 Q158 86 162 82 Q166 86 170 82 Q166 86 170 90 Q166 94 162 90 Z" stroke="#14B8A6" strokeWidth="0.5" opacity="0.1" fill="none"/>
              <rect x="15" y="140" width="60" height="45" rx="3" stroke="#14B8A6" strokeWidth="0.5" opacity="0.09" fill="none"/>
              <circle cx="160" cy="160" r="20" stroke="#14B8A6" strokeWidth="0.5" opacity="0.08" fill="none"/>
              <circle cx="160" cy="160" r="12" stroke="#14B8A6" strokeWidth="0.4" opacity="0.07" fill="none"/>
            </svg>
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 흰 컬리 단발 — 좌 */}
              <path d="M18 40 Q14 48 15 58 Q17 64 15 68" stroke="#E5E7EB" strokeWidth="5" fill="none" strokeLinecap="round"/>
              <path d="M19 40 Q16 49 18 58" stroke="#F3F4F6" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8"/>
              {/* 흰 컬리 단발 — 우 */}
              <path d="M62 40 Q66 48 65 58 Q63 64 65 68" stroke="#E5E7EB" strokeWidth="5" fill="none" strokeLinecap="round"/>
              <path d="M61 40 Q64 49 62 58" stroke="#F3F4F6" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8"/>
              {/* 얼굴 — 인자한 노인 여성, 크고 둥글게 */}
              <ellipse cx="40" cy="50" rx="18" ry="17" fill="#FADDBB" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 모자 챙 — 얼굴 위에 씌움 */}
              <ellipse cx="40" cy="36" rx="23" ry="6" fill="#0D9488" stroke="#2D2D2D" strokeWidth="1.4"/>
              {/* 모자 돔 */}
              <path d="M17 36 Q17 7 40 5 Q63 7 63 36 Z" fill="#0D9488" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 모자 질감 (바구니 짜임) */}
              <path d="M20 22 Q32 20 44 22 Q56 24 64 22" stroke="#0F766E" strokeWidth="0.9" fill="none" opacity="0.6"/>
              <path d="M18 28 Q30 26 42 28 Q54 30 63 28" stroke="#0F766E" strokeWidth="0.9" fill="none" opacity="0.6"/>
              <path d="M18 33 Q30 31 42 33 Q55 35 63 33" stroke="#0F766E" strokeWidth="0.8" fill="none" opacity="0.5"/>
              {/* 깃털 — 모자 좌측 */}
              <path d="M22 16 Q16 10 12 4 Q14 7 16 4 Q18 7 20 3 Q22 6 24 2 Q26 5 28 2" stroke="#10B981" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <path d="M24 18 Q18 12 14 6 Q16 9 18 6 Q20 8 22 5 Q24 8 26 5" stroke="#059669" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
              <path d="M27 19 Q22 14 19 8 Q21 11 23 8 Q25 11 27 7" stroke="#10B981" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
              {/* 눈썹 — 인자하고 우아 */}
              <path d="M26 43 Q31 41 36 43" stroke="#6B5540" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              <path d="M44 43 Q49 41 54 43" stroke="#6B5540" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              {/* 눈 — 인자하게 반쯤 뜬, 온화한 눈빛 */}
              <path d="M26 49 Q31 46 36 49" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M26 49 Q31 51.5 36 49" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5"/>
              <ellipse cx="31" cy="48.5" rx="2.2" ry="1.5" fill="#2D2D2D"/>
              <circle cx="31.5" cy="47.8" r="0.7" fill="white" opacity="0.8"/>
              <path d="M44 49 Q49 46 54 49" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M44 49 Q49 51.5 54 49" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5"/>
              <ellipse cx="49" cy="48.5" rx="2.2" ry="1.5" fill="#2D2D2D"/>
              <circle cx="49.5" cy="47.8" r="0.7" fill="white" opacity="0.8"/>
              {/* 눈가 주름 */}
              <path d="M24 48 Q22 50 23 52" stroke="#C4936A" strokeWidth="0.8" fill="none" opacity="0.4"/>
              <path d="M56 48 Q58 50 57 52" stroke="#C4936A" strokeWidth="0.8" fill="none" opacity="0.4"/>
              <path d="M25 52 Q23 54 24 56" stroke="#C4936A" strokeWidth="0.7" fill="none" opacity="0.3"/>
              <path d="M55 52 Q57 54 56 56" stroke="#C4936A" strokeWidth="0.7" fill="none" opacity="0.3"/>
              {/* 코 */}
              <path d="M38 54 Q40 57 42 54" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round"/>
              {/* 볼 — 따뜻하게 */}
              <ellipse cx="26" cy="55" rx="5.5" ry="3.5" fill="#FCA5A5" opacity="0.35"/>
              <ellipse cx="54" cy="55" rx="5.5" ry="3.5" fill="#FCA5A5" opacity="0.35"/>
              {/* 입 — 부드러운 인자한 미소 */}
              <path d="M32 62 Q40 67 48 62" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              {/* 청록 재킷 */}
              <rect x="20" y="68" width="40" height="22" rx="3" fill="#0D9488" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 재킷 라펠 */}
              <path d="M40 68 L34 74 L20 70" fill="#0F766E" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
              <path d="M40 68 L46 74 L60 70" fill="#0F766E" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
              {/* 브로치 */}
              <path d="M50 74 L51 70 L52 74 L56 75 L52 76 L51 80 L50 76 L46 75 Z" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.5"/>
              <circle cx="51" cy="75" r="1.5" fill="#F43F5E" opacity="0.8"/>
              {/* 진주 목걸이 */}
              <path d="M26 68 Q40 72 54 68" stroke="#F5F5F0" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M25 71 Q40 75 55 71" stroke="#EDEDE8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{"👑 엘리자베스 2세"}</p>
          <p className="text-xs text-gray-500 text-center">{"Queen Elizabeth II · 영국 여왕"}</p>
        </div>

        {/* BTS 정국 */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#F5F3FF] to-[#EDE9FE] rounded-2xl p-6 border-2 border-[#A78BFA]/25 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M30 50 L30 38 L46 35 L46 47" stroke="#A78BFA" strokeWidth="1" fill="none" opacity="0.12"/>
              <circle cx="28" cy="51" r="3" fill="#A78BFA" opacity="0.1"/>
              <circle cx="44" cy="48" r="3" fill="#A78BFA" opacity="0.1"/>
              <path d="M160 40 L162 48 L170 48 L164 53 L166 61 L160 56 L154 61 L156 53 L150 48 L158 48 Z" fill="#C084FC" opacity="0.1"/>
              <path d="M145 130 L147 136 L153 138 L147 140 L145 146 L143 140 L137 138 L143 136 Z" fill="#A78BFA" opacity="0.12"/>
              <path d="M10 160 Q30 150 50 160 Q70 170 90 160 Q110 150 130 160" stroke="#A78BFA" strokeWidth="1" opacity="0.09" fill="none"/>
              <circle cx="170" cy="160" r="16" stroke="#C084FC" strokeWidth="0.7" opacity="0.09" fill="none"/>
            </svg>
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              {/* 헤어 — 풍성한 단발 컬링 웨이브, 검정 */}
              <path d="M18 28 Q16 10 40 8 Q64 10 62 28 Q66 38 60 44 Q54 50 62 56 Q64 60 56 62 Q48 64 40 62 Q32 64 24 62 Q16 60 18 56 Q26 50 20 44 Q14 38 18 28 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
              <path d="M22 12 Q32 8 44 10" stroke="#374151" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5"/>
              <path d="M20 22 Q28 18 36 20" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.35"/>
              {/* 얼굴 */}
              <circle cx="40" cy="36" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
              {/* 눈썹 — 짙고 강한 */}
              <path d="M28 28 Q33 26 38 28" stroke="#1F2937" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              <path d="M42 28 Q47 26 52 28" stroke="#1F2937" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              {/* 눈 — 반쯤 뜬 치명적 눈 */}
              <ellipse cx="33" cy="33" rx="3" ry="2.5" fill="#2D2D2D"/>
              <ellipse cx="47" cy="33" rx="3" ry="2.5" fill="#2D2D2D"/>
              <circle cx="34" cy="32" r="1.1" fill="white"/>
              <circle cx="48" cy="32" r="1.1" fill="white"/>
              {/* 눈꺼풀 선 (반개 눈) */}
              <path d="M29 31 Q33 29.5 37 31" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.45"/>
              <path d="M43 31 Q47 29.5 51 31" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.45"/>
              {/* 볼터치 */}
              <ellipse cx="28" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.3"/>
              <ellipse cx="52" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.3"/>
              {/* 입 — 한쪽 올라간 시크한 스마일 */}
              <path d="M33 42 Q38 45 46 41" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              {/* 귀걸이 — 오른쪽 (드롭 이어링) */}
              <circle cx="54" cy="37" r="1.8" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="0.8"/>
              <path d="M54 39 L54 42" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="54" cy="43.5" r="1.5" fill="#BFDBFE" stroke="#9CA3AF" strokeWidth="0.7"/>
              {/* 민트 티셔츠 */}
              <rect x="24" y="50" width="32" height="28" rx="3" fill="#A7F3D0" stroke="#2D2D2D" strokeWidth="1.5"/>
              <path d="M33 50 Q40 55 47 50" fill="#D1FAE5" stroke="#2D2D2D" strokeWidth="1"/>
              {/* 왼팔 */}
              <path d="M24 53 Q16 57 14 65" stroke="#A7F3D0" strokeWidth="5" strokeLinecap="round" fill="none"/>
              <path d="M24 53 Q16 57 14 65" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              {/* 오른팔 */}
              <path d="M56 53 Q64 57 66 65" stroke="#A7F3D0" strokeWidth="5" strokeLinecap="round" fill="none"/>
              <path d="M56 53 Q64 57 66 65" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{"🎤 BTS 정국"}</p>
          <p className="text-xs text-gray-500 text-center">{"Jeon Jungkook · BTS 막내 온 더 블록"}</p>
        </div>

        {/* 크리스티아누 호날두 */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-b from-[#FEF2F2] to-[#FEE2E2] rounded-2xl p-6 border-2 border-[#F87171]/25 w-full flex justify-center relative overflow-hidden">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
              <line x1="10" y1="80" x2="50" y2="80" stroke="#F87171" strokeWidth="1" opacity="0.1"/>
              <line x1="10" y1="86" x2="40" y2="86" stroke="#F87171" strokeWidth="0.8" opacity="0.08"/>
              <line x1="10" y1="92" x2="55" y2="92" stroke="#F87171" strokeWidth="0.6" opacity="0.07"/>
              <circle cx="160" cy="60" r="18" stroke="#F87171" strokeWidth="0.8" opacity="0.12" fill="none"/>
              <path d="M30 140 L32 148 L40 148 L34 153 L36 161 L30 156 L24 161 L26 153 L20 148 L28 148 Z" fill="#F87171" opacity="0.09"/>
              <circle cx="170" cy="160" r="12" fill="#FEE2E2" opacity="0.15"/>
              <text x="140" y="130" fontSize="30" fill="#F87171" opacity="0.07" fontWeight="bold">7</text>
            </svg>
            <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
              <g transform="rotate(-6, 40, 50)">
                {/* 스포츠 캡 헤어 — 짧고 납작, 윗머리 덮음 */}
                <path d="M22 32 Q22 12 40 10 Q58 12 58 32 Q54 26 50 22 Q44 18 40 23 Q36 18 30 22 Q26 26 22 32 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
                <path d="M26 14 Q36 11 48 13" stroke="#374151" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path d="M24 22 Q32 18 40 20" stroke="#374151" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4"/>
                {/* 얼굴 */}
                <circle cx="40" cy="36" r="15" fill="#F0C9A3" stroke="#2D2D2D" strokeWidth="1.5"/>
                {/* 눈썹 — 두껍고 자신감 */}
                <path d="M27 28 Q32 26 37 28" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M43 28 Q48 26 53 28" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                {/* 눈 */}
                <circle cx="33" cy="33" r="2.8" fill="#2D2D2D"/>
                <circle cx="47" cy="33" r="2.8" fill="#2D2D2D"/>
                <circle cx="34" cy="32" r="1" fill="white"/>
                <circle cx="48" cy="32" r="1" fill="white"/>
                {/* 코 */}
                <path d="M38 40 Q40 43 42 40" stroke="#2D2D2D" strokeWidth="0.9" fill="none" opacity="0.3" strokeLinecap="round"/>
                {/* 입 — 자신감 미소 + 치아 */}
                <path d="M33 44 Q40 49 47 44" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M34 44 Q40 48 46 44 L46 46 Q40 51 34 46 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.6"/>
                {/* 볼 */}
                <ellipse cx="27" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.2"/>
                <ellipse cx="53" cy="38" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.2"/>
                {/* 맨유 빨간 유니폼 */}
                <rect x="20" y="52" width="40" height="28" rx="3" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.5"/>
                <path d="M34 52 Q40 58 46 52" fill="white" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
                <text x="40" y="68" fontSize="5.5" fill="white" fontWeight="bold" textAnchor="middle" opacity="0.95">AIG</text>
                <text x="27" y="62" fontSize="5" fill="white" fontWeight="bold" textAnchor="middle" opacity="0.75">7</text>
                {/* 어깨 확장 */}
                <path d="M20 54 Q13 60 11 66" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" fill="none"/>
                <path d="M60 54 Q67 60 69 66" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" fill="none"/>
                {/* 왼팔 → 주먹 */}
                <path d="M20 56 Q12 64 10 74" stroke="#F0C9A3" strokeWidth="5" strokeLinecap="round" fill="none"/>
                <path d="M20 56 Q12 64 10 74" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <rect x="5" y="72" width="11" height="9" rx="2" fill="#F0C9A3" stroke="#2D2D2D" strokeWidth="1.2"/>
                <path d="M5 75 L16 75" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.4"/>
                <path d="M5 77.5 L16 77.5" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.4"/>
                {/* 오른팔 → 주먹 */}
                <path d="M60 56 Q68 64 70 74" stroke="#F0C9A3" strokeWidth="5" strokeLinecap="round" fill="none"/>
                <path d="M60 56 Q68 64 70 74" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <rect x="64" y="72" width="11" height="9" rx="2" fill="#F0C9A3" stroke="#2D2D2D" strokeWidth="1.2"/>
                <path d="M64 75 L75 75" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.4"/>
                <path d="M64 77.5 L75 77.5" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.4"/>
              </g>
            </svg>
          </div>
          <p className="font-bold text-sm text-center" style={{ wordBreak: "keep-all" }}>{"⚽ 크리스티아누 호날두"}</p>
          <p className="text-xs text-gray-500 text-center">{"Cristiano Ronaldo · 포르투갈 축구선수"}</p>
        </div>

      </div>
    </main>
  );
}
