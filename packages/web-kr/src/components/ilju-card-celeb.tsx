"use client";
import React from "react";
import { CARD_W, CARD_H } from "./ilju-type-card";
import { SajuTILogo } from "./logo";

export interface CelebCardData {
  emoji: string;
  nameKr: string;
  nameEn: string;
  title: string;
  ilju: string;
  iljuKanji: string;
  domainColor: string;
  domainBg: string;
  category: string;
  character: React.ReactNode;
}

// ── Design 1: A-4 기반 유명인 카드 ──────────────────────────────────
export function CelebCardA4({ celeb }: { celeb: CelebCardData }) {
  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col bg-white"
      style={{ width: CARD_W, height: CARD_H, boxShadow: "0 4px 32px rgba(0,0,0,0.13)" }}
    >
      {/* 상단 포인트 라인 */}
      <div
        className="h-[3px] shrink-0"
        style={{ background: `linear-gradient(90deg, transparent, ${celeb.domainColor}, transparent)` }}
      />

      {/* 캐릭터 영역 */}
      <div
        className="relative shrink-0 flex items-center justify-center overflow-hidden"
        style={{ height: 268, background: `linear-gradient(145deg, ${celeb.domainBg} 0%, ${celeb.domainBg}cc 100%)` }}
      >
        <div className="absolute rounded-full" style={{ width: 200, height: 200, background: celeb.domainColor, opacity: 0.15, top: -50, right: -40 }} />
        <div className="absolute rounded-full" style={{ width: 100, height: 100, background: celeb.domainColor, opacity: 0.12, bottom: -30, left: -20 }} />

        <span className="absolute top-5 left-5 text-2xl" style={{ opacity: 0.6 }}>✦</span>
        <span className="absolute top-4 right-5 text-base" style={{ opacity: 0.4 }}>◆</span>
        <span className="absolute bottom-5 right-6 text-xl" style={{ opacity: 0.65 }}>⭐</span>

        {/* SAJU TI 로고 */}
        <div className="absolute top-0 left-0 px-4 pt-3 pb-2 flex items-center gap-2 z-20">
          <SajuTILogo className="w-6 h-6" />
          <span className="text-[14px] font-black tracking-[0.08em] uppercase" style={{ color: "#1a1a1a" }}>SAJU TI</span>
        </div>

        {/* 카테고리 뱃지 */}
        <div className="absolute top-3 right-4 z-20">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: celeb.domainColor + "28", color: celeb.domainColor, border: `1px solid ${celeb.domainColor}55` }}
          >
            {celeb.category}
          </span>
        </div>

        <div className="scale-[1.15] relative z-10">{celeb.character}</div>

        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: "linear-gradient(to bottom, transparent, white)" }} />
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 justify-between">
        <div>
          {/* 일주 — 가장 크게 */}
          <div className="flex items-baseline gap-2.5 mb-2">
            <span
              className="text-[36px] leading-none font-black"
              style={{ fontFamily: "var(--font-black-han-sans), sans-serif", color: "#1a1a1a" }}
            >
              {celeb.ilju}
            </span>
            <span
              className="text-[20px] text-gray-300"
              style={{ fontFamily: "var(--font-black-han-sans), sans-serif" }}
            >
              {celeb.iljuKanji}
            </span>
          </div>

          {/* 이름 */}
          <p
            className="text-[28px] leading-tight font-black"
            style={{ fontFamily: "var(--font-black-han-sans), sans-serif", color: "#1a1a1a" }}
          >
            {celeb.emoji} {celeb.nameKr}
          </p>

          {/* 영문명 · 직함 */}
          <p className="text-[12px] text-gray-400 mt-1.5 font-medium">
            {celeb.nameEn} · {celeb.title}
          </p>
        </div>

        <div className="h-[2px] rounded-full" style={{ background: celeb.domainColor, opacity: 0.5 }} />
      </div>
    </div>
  );
}

// ── Design 2: B 기반 다크 유명인 카드 ───────────────────────────────
export function CelebCardB({ celeb }: { celeb: CelebCardData }) {
  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col"
      style={{ width: CARD_W, height: CARD_H, background: "#0D0D1A", boxShadow: "0 4px 48px rgba(0,0,0,0.5)" }}
    >
      <div
        className="h-[3px] shrink-0"
        style={{ background: `linear-gradient(90deg, transparent, ${celeb.domainColor}, transparent)` }}
      />

      <div className="relative shrink-0 flex items-center justify-center overflow-hidden" style={{ height: 268 }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${celeb.domainColor}18 0%, transparent 65%)` }} />
        <div className="absolute rounded-full" style={{ width: 140, height: 140, background: celeb.domainColor, opacity: 0.07, top: -20, right: -20, filter: "blur(40px)" }} />

        <div className="absolute top-3 left-4 flex items-center gap-2 z-20">
          <SajuTILogo className="w-6 h-6" />
          <span className="text-[14px] font-black tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>SAJU TI</span>
        </div>
        <div className="absolute top-3 right-4 z-20">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: celeb.domainColor + "18", color: celeb.domainColor, border: `1px solid ${celeb.domainColor}35` }}
          >
            {celeb.category}
          </span>
        </div>

        <span className="absolute top-12 right-7 text-sm" style={{ color: celeb.domainColor, opacity: 0.5 }}>✦</span>
        <span className="absolute bottom-10 left-6 text-xs" style={{ color: celeb.domainColor, opacity: 0.4 }}>◆</span>
        <span className="absolute bottom-6 right-10 text-base" style={{ color: celeb.domainColor, opacity: 0.35 }}>✧</span>

        <div className="scale-[1.15] relative z-10">{celeb.character}</div>

        <div className="absolute bottom-0 left-0 right-0 h-14" style={{ background: "linear-gradient(to bottom, transparent, #0D0D1A)" }} />
      </div>

      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 justify-between">
        <div>
          <div className="flex items-baseline gap-2.5 mb-2">
            <span
              className="text-[36px] leading-none font-black"
              style={{
                fontFamily: "var(--font-black-han-sans), sans-serif",
                color: celeb.domainColor,
                textShadow: `0 0 24px ${celeb.domainColor}66`,
              }}
            >
              {celeb.ilju}
            </span>
            <span
              className="text-[19px]"
              style={{ color: celeb.domainColor + "66", fontFamily: "var(--font-black-han-sans), sans-serif" }}
            >
              {celeb.iljuKanji}
            </span>
          </div>

          <p
            className="text-[27px] leading-tight font-black text-white"
            style={{ fontFamily: "var(--font-black-han-sans), sans-serif" }}
          >
            {celeb.emoji} {celeb.nameKr}
          </p>
          <p className="text-[12px] mt-1.5 font-medium" style={{ color: "rgba(255,255,255,0.38)" }}>
            {celeb.nameEn} · {celeb.title}
          </p>
        </div>

        <div
          className="h-[1.5px] rounded-full"
          style={{
            background: `linear-gradient(90deg, ${celeb.domainColor}, transparent)`,
            boxShadow: `0 0 8px ${celeb.domainColor}66`,
          }}
        />
      </div>
    </div>
  );
}

// ── Design 3: 자유로운 제안 1 — 인물도감 / 뮤지엄 카드 ───────────────
export function CelebCardMuseum({ celeb }: { celeb: CelebCardData }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{
        width: CARD_W,
        height: CARD_H,
        background: "#FFFBF4",
        borderRadius: "20px",
        border: "2.5px solid #2D2D2D",
        boxShadow: "5px 5px 0px #2D2D2D",
      }}
    >
      {/* 상단 헤더 스트립 */}
      <div className="shrink-0 px-4 py-2.5 flex items-center justify-between" style={{ background: "#2D2D2D" }}>
        <span className="text-[10px] font-black tracking-[0.18em] text-white uppercase">사주TI MUSEUM</span>
        <span className="text-[10px] font-bold" style={{ color: celeb.domainColor }}>{celeb.category}</span>
      </div>

      {/* 캐릭터 존 */}
      <div className="relative flex items-center justify-center overflow-hidden shrink-0" style={{ height: 232, background: celeb.domainBg }}>
        {/* 사선 패턴 배경 */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 270 232" fill="none" style={{ opacity: 0.055 }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1={-20 + i * 30} y1={0} x2={i * 30 - 110} y2={232} stroke={celeb.domainColor} strokeWidth="9" />
          ))}
        </svg>

        <div className="scale-[1.1] relative z-10">{celeb.character}</div>

        {/* 일주 도장 — 우상단 살짝 기울임 */}
        <div className="absolute top-4 right-4 z-20" style={{ transform: "rotate(7deg)" }}>
          <div
            className="rounded-lg px-2.5 py-1.5 flex flex-col items-center"
            style={{ border: `2px solid ${celeb.domainColor}`, background: celeb.domainColor + "18" }}
          >
            <span
              className="text-[17px] font-black leading-tight"
              style={{ fontFamily: "var(--font-black-han-sans), sans-serif", color: celeb.domainColor }}
            >
              {celeb.ilju}
            </span>
            <span className="text-[10px] font-bold" style={{ color: celeb.domainColor + "99" }}>
              {celeb.iljuKanji}
            </span>
          </div>
        </div>

        {/* SAJU TI 워터마크 */}
        <div className="absolute bottom-2 left-3" style={{ opacity: 0.28 }}>
          <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: celeb.domainColor }}>SAJU TI</span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="mx-4 shrink-0" style={{ height: "1.5px", background: "#2D2D2D", opacity: 0.1 }} />

      {/* 정보 영역 */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-4">
        <span className="text-3xl mb-1">{celeb.emoji}</span>
        <p
          className="text-[30px] leading-none font-black"
          style={{ fontFamily: "var(--font-black-han-sans), sans-serif", color: "#1a1a1a" }}
        >
          {celeb.nameKr}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{celeb.nameEn}</p>
        <p className="text-[12px] font-bold mt-1" style={{ color: celeb.domainColor }}>
          {celeb.title}
        </p>

        {/* 하단 브랜드 */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i < 3 ? celeb.domainColor : "#E5E7EB" }} />
            ))}
          </div>
          <span className="text-[9px] text-gray-300 font-bold tracking-widest">SAJUTI.COM</span>
        </div>
      </div>
    </div>
  );
}

// ── Design 4: 자유로운 제안 2 — 플래티넘 홀로그램 카드 ────────────────
const SPARKLE_POSITIONS = [
  { left: "9%",  top: "7%",  size: "1.4rem", opacity: 0.88, sym: "✦" },
  { left: "79%", top: "5%",  size: "1rem",   opacity: 0.72, sym: "★" },
  { left: "4%",  top: "52%", size: "0.9rem", opacity: 0.62, sym: "✦" },
  { left: "83%", top: "48%", size: "1.2rem", opacity: 0.78, sym: "★" },
  { left: "14%", top: "80%", size: "0.8rem", opacity: 0.65, sym: "✦" },
  { left: "74%", top: "76%", size: "1rem",   opacity: 0.70, sym: "✧" },
  { left: "44%", top: "4%",  size: "0.7rem", opacity: 0.55, sym: "✧" },
  { left: "49%", top: "86%", size: "0.75rem",opacity: 0.50, sym: "★" },
];

export function CelebCardPlatinum({ celeb }: { celeb: CelebCardData }) {
  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col"
      style={{
        width: CARD_W,
        height: CARD_H,
        background:
          "linear-gradient(145deg, #2E0854 0%, #5B21B6 18%, #1E40AF 36%, #1D4ED8 52%, #0369A1 68%, #312E81 84%, #4C1D95 100%)",
        boxShadow:
          "0 8px 64px rgba(60,0,120,0.55), 0 0 0 1px rgba(139,92,246,0.4), inset 0 1px 0 rgba(200,150,255,0.25)",
      }}
    >
      {/* 홀로그램 무지개 스트립 */}
      <div
        className="h-[5px] shrink-0"
        style={{ background: "linear-gradient(90deg, #FF6B6B, #FFD93D, #6BCB77, #4ECDC4, #A29BFE, #FD79A8, #FF6B6B)" }}
      />

      {/* 상단 로고 행 */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2">
        <span className="text-[10px] font-black tracking-[0.22em] uppercase" style={{ color: "rgba(255,255,255,0.65)" }}>SAJU TI</span>
        <span className="text-[10px] font-bold tracking-widest" style={{ color: "#FACC15" }}>✦ LEGEND ✦</span>
      </div>

      {/* 캐릭터 영역 */}
      <div className="relative flex items-center justify-center overflow-hidden shrink-0" style={{ height: 258 }}>
        {/* 퍼플-블루 광택 원 */}
        <div
          className="absolute rounded-full z-0"
          style={{
            width: 214,
            height: 214,
            background:
              "radial-gradient(circle at 35% 28%, #C084FC 0%, #7C3AED 22%, #3B82F6 48%, #0369A1 72%, #0891B2 100%)",
            boxShadow:
              "inset 0 3px 16px rgba(192,132,252,0.5), inset 0 -4px 16px rgba(3,105,161,0.4), 0 4px 32px rgba(109,40,217,0.4)",
          }}
        />

        {/* 광택 오버레이 — 좌상단 하이라이트 */}
        <div
          className="absolute inset-0 z-10 pointer-events-none rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 40%, rgba(147,51,234,0.12) 100%)",
          }}
        />

        {/* 골드 스파클 */}
        {SPARKLE_POSITIONS.map((s, i) => (
          <span
            key={i}
            className="absolute z-20 select-none pointer-events-none"
            style={{ left: s.left, top: s.top, fontSize: s.size, color: "#FACC15", opacity: s.opacity }}
          >
            {s.sym}
          </span>
        ))}

        <div className="scale-[1.15] relative z-10">{celeb.character}</div>

        {/* 하단 페이드 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 z-20"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(30,5,70,0.97))" }}
        />
      </div>

      {/* 정보 영역 */}
      <div
        className="flex flex-col flex-1 px-5 pt-3 pb-5 justify-between"
        style={{
          background: "linear-gradient(180deg, rgba(30,5,70,0.97) 0%, rgba(10,3,40,1) 100%)",
        }}
      >
        <div>
          {/* 일주 — 골드 글로우 */}
          <div className="flex items-baseline gap-2.5 mb-1.5">
            <span
              className="text-[36px] leading-none font-black"
              style={{
                fontFamily: "var(--font-black-han-sans), sans-serif",
                color: "#FACC15",
                textShadow: "0 0 20px rgba(250,204,21,0.7), 0 0 6px rgba(250,204,21,0.4)",
              }}
            >
              {celeb.ilju}
            </span>
            <span
              className="text-[20px]"
              style={{ color: "rgba(250,204,21,0.55)", fontFamily: "var(--font-black-han-sans), sans-serif" }}
            >
              {celeb.iljuKanji}
            </span>
          </div>

          {/* 이름 */}
          <p
            className="text-[27px] leading-tight font-black text-white"
            style={{ fontFamily: "var(--font-black-han-sans), sans-serif" }}
          >
            {celeb.emoji} {celeb.nameKr}
          </p>

          {/* 영문명 · 직함 */}
          <p className="text-[11px] mt-1.5 font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
            {celeb.nameEn} · {celeb.title}
          </p>
        </div>

        {/* 홀로그램 바 */}
        <div
          className="h-[3px] rounded-full"
          style={{ background: "linear-gradient(90deg, #FF6B6B, #FFD93D, #6BCB77, #4ECDC4, #A29BFE, #FD79A8)" }}
        />
      </div>
    </div>
  );
}
