import type { IljuType } from "@/lib/ilju-types";
import { SajuTILogo } from "./logo";

// ── 미니 두들 스티커 (뱃지용) ──────────────────────────────────

function MiniWood() {
  return (
    <svg viewBox="0 0 40 44" width="14" height="16" fill="none">
      <rect x="17" y="22" width="6" height="14" rx="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="20" cy="16" r="12" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="16" cy="14" r="1.5" fill="#2D2D2D" />
      <circle cx="24" cy="14" r="1.5" fill="#2D2D2D" />
      <path d="M17 19 Q20 22 23 19" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MiniFire() {
  return (
    <svg viewBox="0 0 36 44" width="12" height="16" fill="none">
      <path d="M18 2 C18 2 6 16 6 26 A12 12 0 0 0 30 26 C30 16 18 2 18 2Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M18 14 C18 14 12 22 12 27 A6 6 0 0 0 24 27 C24 22 18 14 18 14Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="15" cy="24" r="1.5" fill="#2D2D2D" />
      <circle cx="21" cy="24" r="1.5" fill="#2D2D2D" />
      <path d="M15 29 Q18 33 21 29" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MiniEarth() {
  return (
    <svg viewBox="0 0 40 40" width="14" height="14" fill="none">
      <path d="M4 36 L20 8 L36 36 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 14 L20 8 L24 14" fill="white" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
      <circle cx="17" cy="24" r="1.5" fill="#2D2D2D" />
      <circle cx="23" cy="24" r="1.5" fill="#2D2D2D" />
      <path d="M18 28 Q20 31 22 28" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MiniMetal() {
  return (
    <svg viewBox="0 0 36 40" width="12" height="14" fill="none">
      <path d="M18 4 L32 16 L18 36 L4 16 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 4 L10 16 L26 16 Z" fill="#F1F5F9" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
      <circle cx="14" cy="20" r="1.5" fill="#2D2D2D" />
      <circle cx="22" cy="20" r="1.5" fill="#2D2D2D" />
      <path d="M15 25 Q18 28 21 25" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MiniWater() {
  return (
    <svg viewBox="0 0 36 44" width="12" height="16" fill="none">
      <path d="M18 4 C18 4 4 20 4 28 A14 14 0 0 0 32 28 C32 20 18 4 18 4Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
      <ellipse cx="12" cy="18" rx="3" ry="1.5" fill="white" opacity="0.5" transform="rotate(-20 12 18)" />
      <circle cx="14" cy="26" r="1.5" fill="#2D2D2D" />
      <circle cx="22" cy="26" r="1.5" fill="#2D2D2D" />
      <path d="M15 31 Q18 34 21 31" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function MiniSun() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <circle cx="12" cy="12" r="5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 12 + 7 * Math.cos(rad);
        const y1 = 12 + 7 * Math.sin(rad);
        const x2 = 12 + 9.5 * Math.cos(rad);
        const y2 = 12 + 9.5 * Math.sin(rad);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" />;
      })}
    </svg>
  );
}

export function MiniMoon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path d="M19 12 A9 9 0 1 1 10 3 A6 6 0 0 0 19 12Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="13" cy="10" r="1" fill="#2D2D2D" />
      <circle cx="16" cy="13" r="1" fill="#2D2D2D" />
    </svg>
  );
}

// ── 오행별 스타일 ──────────────────────────────────────────────

export const ELEMENT_STYLE: Record<string, { bg: string; border: string; text: string; sticker: React.ReactNode; label: string; from: string }> = {
  "목(木)": { bg: "#D1FAE5", border: "#4ADE80", text: "#166534", sticker: <MiniWood />, label: "목", from: "#D1FAE5" },
  "화(火)": { bg: "#FEE2E2", border: "#F87171", text: "#991B1B", sticker: <MiniFire />, label: "화", from: "#FEE2E2" },
  "토(土)": { bg: "#FEF3C7", border: "#FBBF24", text: "#92400E", sticker: <MiniEarth />, label: "토", from: "#FEF3C7" },
  "금(金)": { bg: "#F1F5F9", border: "#94A3B8", text: "#334155", sticker: <MiniMetal />, label: "금", from: "#F1F5F9" },
  "수(水)": { bg: "#DBEAFE", border: "#60A5FA", text: "#1E3A8A", sticker: <MiniWater />, label: "수", from: "#DBEAFE" },
};

// ── 뱃지 컴포넌트 ─────────────────────────────────────────────

function IljuBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-900 text-white">
      {text}
    </span>
  );
}

export function ElementBadgePill({ element }: { element: string }) {
  const s = ELEMENT_STYLE[element];
  if (!s) return null;
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full"
      style={{ background: s.bg, border: `1.5px solid ${s.border}`, color: s.text }}
    >
      {s.sticker}
      {s.label}
    </span>
  );
}

export function YinyangBadge({ yinyang }: { yinyang: string }) {
  const isSun = yinyang === "양(陽)";
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full"
      style={{
        background: isSun ? "#FFFBEB" : "#EFF6FF",
        border: `1.5px solid ${isSun ? "#FBBF24" : "#93C5FD"}`,
        color: isSun ? "#92400E" : "#1E3A8A",
      }}
    >
      {isSun ? <MiniSun /> : <MiniMoon />}
      {isSun ? "양" : "음"}
    </span>
  );
}

// ── 메인 카드 컴포넌트 (9:16 인스타 스토리 비율) ───────────────

export interface IljuTypeCardProps {
  ilju: IljuType;
  character: React.ReactNode;
  characterBg?: string;
}

// 인스타 스토리 비율: 9:16 = 270 × 480
export const CARD_W = 270;
export const CARD_H = Math.round(CARD_W * 16 / 9); // 480

export function IljuTypeCard({ ilju, character, characterBg }: IljuTypeCardProps) {
  const fromColor = characterBg ?? ELEMENT_STYLE[ilju.stemElement]?.from ?? "#F5F5F5";

  return (
    <div
      className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.1)] border-2 border-[#2D2D2D]/10 overflow-hidden flex flex-col"
      style={{ width: CARD_W, height: CARD_H }}
    >
      {/* ① 캐릭터명 — 카드 안 최상단, Jua 폰트 */}
      <div className="px-5 pt-5 pb-2 shrink-0">
        <p
          className="leading-tight text-gray-900 text-[22px]"
          style={{ fontFamily: "var(--font-jua), sans-serif" }}
        >
          {ilju.name}
        </p>
      </div>

      {/* ② 캐릭터 일러스트 — flex-grow로 남은 공간 채움 */}
      <div
        className="relative flex items-center justify-center grow"
        style={{ background: `linear-gradient(to bottom, ${fromColor}, #FDF6EE)` }}
      >
        <span className="absolute top-2 right-4 text-xs text-gray-400 font-medium tracking-wider">
          {ilju.hanja}
        </span>
        {/* 캐릭터 크기 키움 (스토리 비율에 맞춰) */}
        <div className="relative z-10 scale-[1.3]">{character}</div>
      </div>

      {/* ③ 하단 바디 */}
      <div className="px-4 pt-3 pb-5 flex flex-col gap-2.5 shrink-0">

        {/* 뱃지 — 한자 없이 한 줄 */}
        <div className="flex gap-1 flex-wrap">
          <IljuBadge text={ilju.ilju} />
          <ElementBadgePill element={ilju.stemElement} />
          <ElementBadgePill element={ilju.branchElement} />
          <YinyangBadge yinyang={ilju.yinyang} />
        </div>

        {/* 강점 */}
        <ul className="flex flex-col gap-0.5">
          {ilju.strengths.slice(0, 3).map((s) => (
            <li key={s} className="flex items-center gap-1.5 text-[12px] text-gray-700">
              <span className="text-green-500 font-black text-[11px]">✓</span>
              {s}
            </li>
          ))}
        </ul>

        {/* 약점 */}
        <ul className="flex flex-col gap-0.5">
          {ilju.weaknesses.slice(0, 2).map((w) => (
            <li key={w} className="flex items-center gap-1.5 text-[12px] text-gray-400">
              <span className="text-red-400 font-black text-[11px]">✗</span>
              {w}
            </li>
          ))}
        </ul>

        {/* 말풍선 — 라이트 스타일 */}
        <div className="relative mt-1">
          <div className="bg-white border-2 border-[#2D2D2D] rounded-2xl px-4 py-2.5">
            <p
              className="text-[13px] text-gray-900 leading-snug"
              style={{ fontFamily: "var(--font-jua), sans-serif" }}
            >
              &ldquo;{ilju.quote}&rdquo;
            </p>
          </div>
          <div
            className="absolute left-6 -bottom-[9px] w-0 h-0"
            style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "10px solid #2D2D2D" }}
          />
          <div
            className="absolute left-[26px] -bottom-[6px] w-0 h-0"
            style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "8px solid white" }}
          />
        </div>

      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// 신규 디자인 시안 v2 — 한자(hanja) 미표시
// ══════════════════════════════════════════════════════════════

// ── SetlogCard (셋로그 피드 스타일) ─────────────────────────────
export function SetlogCard({ ilju, character, characterBg }: IljuTypeCardProps) {
  const el = ELEMENT_STYLE[ilju.stemElement];
  const bgFrom = characterBg ?? el?.bg ?? "#F5F5F5";

  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col"
      style={{
        width: CARD_W,
        height: CARD_H,
        background: "linear-gradient(160deg, #FFFBF5 0%, #FFF5EE 100%)",
        boxShadow: "0 4px 28px rgba(0,0,0,0.10)",
      }}
    >
      {/* 셋로그 스타일 프로필 헤더 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-black"
            style={{ background: el?.border ?? "#2D2D2D" }}
          >
            TI
          </div>
          <span className="text-[12px] font-bold text-gray-900">SAJUPLAY</span>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: ilju.rarity }).map((_, i) => (
            <span key={i} className="text-[10px] text-amber-400">★</span>
          ))}
          {Array.from({ length: 5 - ilju.rarity }).map((_, i) => (
            <span key={i} className="text-[10px] text-gray-300">★</span>
          ))}
        </div>
      </div>

      {/* 캐릭터 포토 슬롯 */}
      <div
        className="mx-3 rounded-[20px] relative overflow-hidden shrink-0"
        style={{ height: 200, background: `linear-gradient(155deg, ${bgFrom} 0%, #FDF8EE 100%)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="scale-[1.25]">{character}</div>
        </div>
        <span className="absolute top-2 right-3 text-xl">⭐</span>
        <span className="absolute top-4 left-3 text-xs text-gray-400" style={{ opacity: 0.6 }}>✦</span>
        <span className="absolute bottom-4 right-5 text-xs text-gray-300" style={{ opacity: 0.6 }}>◆</span>
        <div className="absolute bottom-2 left-2">
          <ElementBadgePill element={ilju.stemElement} />
        </div>
      </div>

      {/* 이름 + 태그라인 */}
      <div className="px-4 pt-3 shrink-0">
        <p className="text-[22px] leading-tight text-gray-900" style={{ fontFamily: "var(--font-jua), sans-serif" }}>
          {ilju.name}
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5">{ilju.tagline}</p>
      </div>

      {/* 뱃지 */}
      <div className="px-4 pt-2 flex gap-1.5 flex-wrap shrink-0">
        <ElementBadgePill element={ilju.branchElement} />
        <YinyangBadge yinyang={ilju.yinyang} />
      </div>

      {/* 강점 태그 */}
      <div className="px-4 pt-2.5 flex gap-1.5 flex-wrap shrink-0">
        {ilju.strengths.slice(0, 3).map((s) => (
          <span
            key={s}
            className="text-[10px] rounded-full px-2.5 py-1 font-medium text-gray-600"
            style={{ background: "rgba(255,255,255,0.85)", border: "1px solid #E5E7EB" }}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="grow" />

      {/* 말풍선 */}
      <div className="px-4 pb-5 shrink-0">
        <div
          className="w-full rounded-2xl px-4 py-3"
          style={{ background: "white", border: "1.5px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}
        >
          <p className="text-[12px] text-gray-800 leading-snug" style={{ fontFamily: "var(--font-jua), sans-serif" }}>
            &ldquo;{ilju.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

// ── SetlogCardA1 (A-1: 헤더 제거 + 메인 오행 뱃지 이동 + 강한 폰트) ──
export function SetlogCardA1({ ilju, character, characterBg }: IljuTypeCardProps) {
  const el = ELEMENT_STYLE[ilju.stemElement];
  const bgFrom = characterBg ?? el?.bg ?? "#F5F5F5";

  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col"
      style={{
        width: CARD_W,
        height: CARD_H,
        background: "linear-gradient(160deg, #FFFBF5 0%, #FFF5EE 100%)",
        boxShadow: "0 4px 28px rgba(0,0,0,0.10)",
      }}
    >
      {/* 캐릭터 포토 슬롯 — 헤더 제거, stemElement 뱃지 제거 */}
      <div
        className="mx-3 mt-4 rounded-[20px] relative overflow-hidden shrink-0"
        style={{ height: 222, background: `linear-gradient(155deg, ${bgFrom} 0%, #FDF8EE 100%)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="scale-[1.3]">{character}</div>
        </div>
        <span className="absolute top-2 right-3 text-xl">⭐</span>
        <span className="absolute top-4 left-3 text-xs text-gray-400" style={{ opacity: 0.6 }}>✦</span>
        <span className="absolute bottom-4 right-5 text-xs text-gray-300" style={{ opacity: 0.6 }}>◆</span>
      </div>

      {/* 이름 — 크고 강렬하게 */}
      <div className="px-4 pt-4 shrink-0">
        <p
          className="text-[28px] leading-tight tracking-tight text-black"
          style={{ fontFamily: "var(--font-jua), sans-serif" }}
        >
          {ilju.name}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5 font-medium tracking-wide">{ilju.tagline}</p>
      </div>

      {/* 뱃지 — stemElement 맨 앞 */}
      <div className="px-4 pt-2.5 flex gap-1.5 flex-wrap shrink-0">
        <ElementBadgePill element={ilju.stemElement} />
        <ElementBadgePill element={ilju.branchElement} />
        <YinyangBadge yinyang={ilju.yinyang} />
      </div>

      {/* 강점 태그 */}
      <div className="px-4 pt-2.5 flex gap-1.5 flex-wrap shrink-0">
        {ilju.strengths.slice(0, 3).map((s) => (
          <span
            key={s}
            className="text-[11px] rounded-full px-3 py-1 font-semibold text-gray-700"
            style={{ background: "rgba(255,255,255,0.9)", border: "1.5px solid #D1D5DB" }}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="grow" />

      {/* 말풍선 */}
      <div className="px-4 pb-5 shrink-0">
        <div
          className="w-full rounded-2xl px-4 py-3"
          style={{ background: "white", border: "1.5px solid #E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}
        >
          <p
            className="text-[13px] text-gray-900 leading-snug"
            style={{ fontFamily: "var(--font-jua), sans-serif" }}
          >
            &ldquo;{ilju.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

// ── SetlogCardA2 (A-2: 풀 컬러 상단 + 리디자인) ──────────────────
export function SetlogCardA2({ ilju, character, characterBg }: IljuTypeCardProps) {
  const el = ELEMENT_STYLE[ilju.stemElement];
  const accentColor = el?.border ?? "#4ADE80";
  const bgColor = characterBg ?? el?.bg ?? "#D1FAE5";

  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col bg-white"
      style={{ width: CARD_W, height: CARD_H, boxShadow: "0 4px 32px rgba(0,0,0,0.13)" }}
    >
      {/* 풀 컬러 캐릭터 영역 — 프레임 없이 풀 블리드 */}
      <div
        className="relative shrink-0 flex items-center justify-center overflow-hidden"
        style={{ height: 252, background: `linear-gradient(145deg, ${bgColor} 0%, ${bgColor}bb 100%)` }}
      >
        {/* 장식용 원형 블롭 */}
        <div
          className="absolute rounded-full"
          style={{ width: 200, height: 200, background: accentColor, opacity: 0.18, top: -50, right: -40 }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 110, height: 110, background: accentColor, opacity: 0.15, bottom: -30, left: -20 }}
        />
        {/* 캐릭터 크게 */}
        <div className="scale-[1.45] relative z-10">{character}</div>
        {/* 데코 */}
        <span className="absolute top-5 left-5 text-2xl" style={{ opacity: 0.65 }}>✦</span>
        <span className="absolute top-4 right-5 text-base" style={{ opacity: 0.45 }}>◆</span>
        <span className="absolute bottom-5 right-6 text-xl" style={{ opacity: 0.7 }}>⭐</span>
        {/* 하단 페이드 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10"
          style={{ background: "linear-gradient(to bottom, transparent, white)" }}
        />
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col flex-1 px-5 pt-3 pb-5">
        {/* 이름 — 크고 강렬 */}
        <p
          className="text-[30px] leading-[1.1] tracking-tight text-black"
          style={{ fontFamily: "var(--font-jua), sans-serif" }}
        >
          {ilju.name}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5 font-medium tracking-wide">{ilju.tagline}</p>

        {/* 뱃지 — stemElement 맨 앞 */}
        <div className="flex gap-1.5 flex-wrap mt-3">
          <ElementBadgePill element={ilju.stemElement} />
          <ElementBadgePill element={ilju.branchElement} />
          <YinyangBadge yinyang={ilju.yinyang} />
        </div>

        {/* 강점 — 컬러 닷 리스트 */}
        <div className="mt-3 flex flex-col gap-1.5">
          {ilju.strengths.slice(0, 3).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: accentColor }} />
              <span className="text-[12px] font-semibold text-gray-800">{s}</span>
            </div>
          ))}
        </div>

        <div className="grow" />

        {/* 오행 색상 말풍선 */}
        <div
          className="w-full rounded-2xl px-4 py-3"
          style={{ background: `${bgColor}99`, border: `1.5px solid ${accentColor}66` }}
        >
          <p
            className="text-[13px] text-gray-900 leading-snug"
            style={{ fontFamily: "var(--font-jua), sans-serif" }}
          >
            &ldquo;{ilju.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

// ── SetlogCardA3 (A-2 기반 + Black Han Sans 이름 + Noto Sans KR 본문) ──
export function SetlogCardA3({ ilju, character, characterBg }: IljuTypeCardProps) {
  const el = ELEMENT_STYLE[ilju.stemElement];
  const accentColor = el?.border ?? "#4ADE80";
  const bgColor = characterBg ?? el?.bg ?? "#D1FAE5";

  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col bg-white"
      style={{ width: CARD_W, height: CARD_H, boxShadow: "0 4px 32px rgba(0,0,0,0.13)" }}
    >
      {/* 풀 컬러 캐릭터 영역 — A-2 동일 */}
      <div
        className="relative shrink-0 flex items-center justify-center overflow-hidden"
        style={{ height: 252, background: `linear-gradient(145deg, ${bgColor} 0%, ${bgColor}bb 100%)` }}
      >
        <div className="absolute rounded-full" style={{ width: 200, height: 200, background: accentColor, opacity: 0.18, top: -50, right: -40 }} />
        <div className="absolute rounded-full" style={{ width: 110, height: 110, background: accentColor, opacity: 0.15, bottom: -30, left: -20 }} />
        <div className="scale-[1.45] relative z-10">{character}</div>
        <span className="absolute top-5 left-5 text-2xl" style={{ opacity: 0.65 }}>✦</span>
        <span className="absolute top-4 right-5 text-base" style={{ opacity: 0.45 }}>◆</span>
        <span className="absolute bottom-5 right-6 text-xl" style={{ opacity: 0.7 }}>⭐</span>
        <div className="absolute bottom-0 left-0 right-0 h-10" style={{ background: "linear-gradient(to bottom, transparent, white)" }} />
      </div>

      {/* 정보 영역 — px-4로 너비 확보 */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-5">

        {/* 이름 — Black Han Sans */}
        <p
          className="text-[27px] leading-[1.15] tracking-tight text-black"
          style={{ fontFamily: "var(--font-black-han-sans), sans-serif" }}
        >
          {ilju.name}
        </p>

        {/* 태그라인 — Noto Sans KR */}
        <p
          className="text-[11px] text-gray-400 mt-0.5 font-medium"
          style={{ fontFamily: "var(--font-pretendard), sans-serif" }}
        >
          {ilju.tagline}
        </p>

        {/* 뱃지 — stemElement 맨 앞 */}
        <div className="flex gap-1.5 flex-wrap mt-2.5">
          <ElementBadgePill element={ilju.stemElement} />
          <ElementBadgePill element={ilju.branchElement} />
          <YinyangBadge yinyang={ilju.yinyang} />
        </div>

        {/* 강점 — 2열 그리드 (3항목 → 2행) */}
        <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1.5">
          {ilju.strengths.slice(0, 3).map((s) => (
            <div key={s} className="flex items-center gap-1.5 min-w-0">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: accentColor }} />
              <span
                className="text-[11px] font-semibold text-gray-800 truncate"
                style={{ fontFamily: "var(--font-pretendard), sans-serif" }}
              >
                {s}
              </span>
            </div>
          ))}
        </div>

        <div className="grow" />

        {/* 오행 말풍선 — Noto Sans KR bold, 내부 패딩 개선 */}
        <div
          className="w-full rounded-2xl px-4 py-3"
          style={{ background: `${bgColor}99`, border: `1.5px solid ${accentColor}66` }}
        >
          <p
            className="text-[13px] font-bold text-gray-900 leading-snug"
            style={{ fontFamily: "var(--font-pretendard), sans-serif" }}
          >
            &ldquo;{ilju.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

// ── NightCard (다크/네온 스타일) ─────────────────────────────────
export function NightCard({ ilju, character, characterBg }: IljuTypeCardProps) {
  const el = ELEMENT_STYLE[ilju.stemElement];
  const accentColor = el?.border ?? "#4ADE80";
  const bgFrom = characterBg ?? el?.bg ?? "#D1FAE5";

  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col"
      style={{ width: CARD_W, height: CARD_H, background: "linear-gradient(160deg, #0D0D1A 0%, #161628 100%)" }}
    >
      {/* 상단 네온 라인 */}
      <div
        className="h-[3px] shrink-0"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      {/* 헤더 */}
      <div className="px-5 pt-4 pb-1 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black tracking-[0.15em] uppercase" style={{ color: accentColor }}>
            SAJUPLAY
          </span>
          <div className="h-px flex-1" style={{ background: accentColor, opacity: 0.25 }} />
          <span className="text-[10px] text-white/30">
            {"★".repeat(ilju.rarity)}{"☆".repeat(5 - ilju.rarity)}
          </span>
        </div>
      </div>

      {/* 캐릭터 — 글로우 */}
      <div
        className="relative mx-4 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center"
        style={{
          height: 210,
          background: `radial-gradient(ellipse at 50% 60%, ${bgFrom}44 0%, transparent 70%)`,
          border: `1px solid ${accentColor}33`,
        }}
      >
        <div className="scale-[1.3] relative z-10">{character}</div>
        <span className="absolute top-5 right-5 text-2xl" style={{ color: "#FDE68A", opacity: 0.65 }}>✦</span>
        <span className="absolute top-4 left-5 text-base" style={{ color: accentColor, opacity: 0.45 }}>◆</span>
        <span className="absolute bottom-5 left-6 text-xl" style={{ opacity: 0.7 }}>⭐</span>
      </div>

      {/* 이름 + 태그라인 */}
      <div className="px-5 pt-4 shrink-0">
        <p className="text-[22px] leading-tight text-white" style={{ fontFamily: "var(--font-jua), sans-serif" }}>
          {ilju.name}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: `${accentColor}99` }}>{ilju.tagline}</p>
      </div>

      {/* 네온 뱃지 — 두들 스티커 포함 */}
      <div className="px-5 pt-2.5 flex gap-1.5 flex-wrap shrink-0">
        {[ilju.stemElement, ilju.branchElement].map((elem, i) => {
          const s = ELEMENT_STYLE[elem];
          return (
            <span
              key={`${elem}-${i}`}
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ border: `1.5px solid ${s?.border}`, color: s?.border, background: `${s?.bg}22` }}
            >
              {s?.sticker}
              {s?.label}
            </span>
          );
        })}
        <span
          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ border: "1.5px solid #FDE68A", color: "#FDE68A", background: "#FDE68A22" }}
        >
          {ilju.yinyang === "양(陽)" ? <MiniSun /> : <MiniMoon />}
          {ilju.yinyang === "양(陽)" ? "양" : "음"}
        </span>
      </div>

      {/* 강점 — 2열 그리드 */}
      <div className="px-5 pt-3 grid grid-cols-2 gap-x-2 gap-y-1 shrink-0">
        {ilju.strengths.slice(0, 3).map((s) => (
          <div key={s} className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] font-bold shrink-0" style={{ color: accentColor }}>—</span>
            <span className="text-[11px] text-white/60 truncate">{s}</span>
          </div>
        ))}
      </div>

      <div className="grow" />

      {/* 다크 말풍선 */}
      <div className="px-5 pb-5 shrink-0">
        <div
          className="rounded-2xl px-4 py-3"
          style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}44` }}
        >
          <p className="text-[12px] text-white/90 leading-snug" style={{ fontFamily: "var(--font-jua), sans-serif" }}>
            &ldquo;{ilju.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

// ── NightCardB1 (B 기반 + 로고 + 큰 브랜드명) ────────────────────
export function NightCardB1({ ilju, character, characterBg }: IljuTypeCardProps) {
  const el = ELEMENT_STYLE[ilju.stemElement];
  const accentColor = el?.border ?? "#4ADE80";
  const bgFrom = characterBg ?? el?.bg ?? "#D1FAE5";

  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col"
      style={{ width: CARD_W, height: CARD_H, background: "linear-gradient(160deg, #0D0D1A 0%, #161628 100%)" }}
    >
      {/* 상단 네온 라인 */}
      <div
        className="h-[3px] shrink-0"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      {/* 헤더 — 로고 + 큰 브랜드명 */}
      <div className="px-5 pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <SajuTILogo className="w-7 h-7" />
          <span
            className="text-[16px] font-black tracking-[0.08em] uppercase"
            style={{ color: accentColor }}
          >
            SAJUPLAY
          </span>
          <div className="h-px flex-1" style={{ background: accentColor, opacity: 0.2 }} />
          <span className="text-[10px] text-white/30">
            {"★".repeat(ilju.rarity)}{"☆".repeat(5 - ilju.rarity)}
          </span>
        </div>
      </div>

      {/* 캐릭터 — 글로우 */}
      <div
        className="relative mx-4 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center"
        style={{
          height: 200,
          background: `radial-gradient(ellipse at 50% 60%, ${bgFrom}44 0%, transparent 70%)`,
          border: `1px solid ${accentColor}33`,
        }}
      >
        <div className="scale-[1.3] relative z-10">{character}</div>
        <span className="absolute top-5 right-5 text-2xl" style={{ color: "#FDE68A", opacity: 0.65 }}>✦</span>
        <span className="absolute top-4 left-5 text-base" style={{ color: accentColor, opacity: 0.45 }}>◆</span>
        <span className="absolute bottom-5 left-6 text-xl" style={{ opacity: 0.7 }}>⭐</span>
      </div>

      {/* 이름 + 태그라인 */}
      <div className="px-5 pt-4 shrink-0">
        <p className="text-[22px] leading-tight text-white" style={{ fontFamily: "var(--font-jua), sans-serif" }}>
          {ilju.name}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: `${accentColor}99` }}>{ilju.tagline}</p>
      </div>

      {/* 네온 뱃지 — 두들 스티커 포함 */}
      <div className="px-5 pt-2.5 flex gap-1.5 flex-wrap shrink-0">
        {[ilju.stemElement, ilju.branchElement].map((elem, i) => {
          const s = ELEMENT_STYLE[elem];
          return (
            <span
              key={`${elem}-${i}`}
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ border: `1.5px solid ${s?.border}`, color: s?.border, background: `${s?.bg}22` }}
            >
              {s?.sticker}
              {s?.label}
            </span>
          );
        })}
        <span
          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ border: "1.5px solid #FDE68A", color: "#FDE68A", background: "#FDE68A22" }}
        >
          {ilju.yinyang === "양(陽)" ? <MiniSun /> : <MiniMoon />}
          {ilju.yinyang === "양(陽)" ? "양" : "음"}
        </span>
      </div>

      {/* 강점 — 2열 그리드 */}
      <div className="px-5 pt-3 grid grid-cols-2 gap-x-2 gap-y-1 shrink-0">
        {ilju.strengths.slice(0, 3).map((s) => (
          <div key={s} className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] font-bold shrink-0" style={{ color: accentColor }}>—</span>
            <span className="text-[11px] text-white/60 truncate">{s}</span>
          </div>
        ))}
      </div>

      <div className="grow" />

      {/* 다크 말풍선 */}
      <div className="px-5 pb-5 shrink-0">
        <div
          className="rounded-2xl px-4 py-3"
          style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}44` }}
        >
          <p className="text-[12px] text-white/90 leading-snug" style={{ fontFamily: "var(--font-jua), sans-serif" }}>
            &ldquo;{ilju.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

// ── BubbleCard (팝/스티커 스타일) ────────────────────────────────
export function BubbleCard({ ilju, character, characterBg }: IljuTypeCardProps) {
  const el = ELEMENT_STYLE[ilju.stemElement];
  const accentColor = el?.border ?? "#4ADE80";
  const bgColor = characterBg ?? el?.bg ?? "#D1FAE5";

  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col bg-white"
      style={{ width: CARD_W, height: CARD_H, border: "3px solid #1a1a1a", boxShadow: "5px 5px 0px #1a1a1a" }}
    >
      {/* 상단 컬러 배너 */}
      <div
        className="h-10 shrink-0 flex items-center px-4 gap-2"
        style={{ background: bgColor, borderBottom: "2px solid #1a1a1a" }}
      >
        <ElementBadgePill element={ilju.stemElement} />
        <YinyangBadge yinyang={ilju.yinyang} />
        <div className="ml-auto flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#1a1a1a]" />
          <div className="w-3 h-3 rounded-full" style={{ background: accentColor, border: "1.5px solid #1a1a1a" }} />
        </div>
      </div>

      {/* 캐릭터 — 원형 배경 */}
      <div
        className="flex items-center justify-center relative shrink-0"
        style={{ height: 195, background: `${bgColor}55` }}
      >
        <div
          className="absolute rounded-full"
          style={{ width: 145, height: 145, background: bgColor, border: `2.5px dashed ${accentColor}` }}
        />
        <div className="scale-[1.2] relative z-10">{character}</div>
        <span className="absolute top-3 right-5 text-xl">✨</span>
        <span className="absolute bottom-3 left-5 text-sm text-gray-400">◆</span>
        <span className="absolute top-5 left-4 text-xs" style={{ color: accentColor }}>✦</span>
      </div>

      {/* 이름 + 태그라인 */}
      <div className="px-4 pt-3 shrink-0" style={{ borderTop: "2px solid #1a1a1a" }}>
        <p className="text-[24px] leading-none text-[#1a1a1a]" style={{ fontFamily: "var(--font-jua), sans-serif" }}>
          {ilju.name}
        </p>
        <p className="text-[11px] text-gray-500 mt-1">{ilju.tagline}</p>
      </div>

      {/* 강점/약점 */}
      <div className="px-4 pt-2 flex flex-col gap-0.5 shrink-0">
        {ilju.strengths.slice(0, 3).map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className="text-[12px] font-bold" style={{ color: accentColor }}>✓</span>
            <span className="text-[12px] font-medium text-[#1a1a1a]">{s}</span>
          </div>
        ))}
        {ilju.weaknesses.slice(0, 1).map((w) => (
          <div key={w} className="flex items-center gap-1.5">
            <span className="text-[12px] text-red-400">✗</span>
            <span className="text-[12px] text-gray-400">{w}</span>
          </div>
        ))}
      </div>

      <div className="grow" />

      {/* 말풍선 */}
      <div className="px-4 pb-5 shrink-0">
        <div
          className="w-full rounded-2xl px-4 py-3"
          style={{ background: bgColor, border: "2px solid #1a1a1a" }}
        >
          <p className="text-[12px] text-[#1a1a1a] leading-snug" style={{ fontFamily: "var(--font-jua), sans-serif" }}>
            &ldquo;{ilju.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
