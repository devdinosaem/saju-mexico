import { DoodleTravelGirl, DoodlePlane, DoodleMusicNote, DoodleQuestionMark, DoodleSpeechBubble, DoodleHeart, DoodleSparkle, DoodleStar } from "@/components/doodles";
import { DOODLE_CATEGORIES } from "@/components/doodle-categories";
import type React from "react";

const ELEM_BADGE: Record<string, { bg: string; fg: string }> = {
  목: { bg: "#D1FAE5", fg: "#047857" },
  화: { bg: "#FEE2E2", fg: "#DC2626" },
  토: { bg: "#FEF3C7", fg: "#B45309" },
  금: { bg: "#F1F5F9", fg: "#475569" },
  수: { bg: "#DBEAFE", fg: "#2563EB" },
  무: { bg: "#F5F5F4", fg: "#A8A29E" },
  전체: { bg: "#EDE9FE", fg: "#7C3AED" },
};

// 배지에 표시할 짧은 글자 (전체는 "올")
const BADGE_TXT: Record<string, string> = { 전체: "올" };

// ── AI 히어로 박스 오행별 그라디언트 변주 (비교용) ──
// 구조 고정(160°·크림 앵커·그림자 8%룰), 위 틴트+그림자만 변주.
const HERO_GRADS: { key: string; label: string; top: string; bot: string; accent: string; glow: string }[] = [
  { key: "현재", label: "현재(핑크)", top: "#FFF6FA", bot: "#FFFDF5", accent: "#E84B6A", glow: "rgba(232,75,106,0.08)" },
  { key: "목", label: "목 · 새싹빛", top: "#F2FCF7", bot: "#FBFEF8", accent: "#4ADE80", glow: "rgba(74,222,128,0.08)" },
  { key: "화", label: "화 · 노을빛", top: "#FFF6F4", bot: "#FFFDF7", accent: "#F87171", glow: "rgba(248,113,113,0.08)" },
  { key: "토", label: "토 · 크림옐로", top: "#FFFBEF", bot: "#FFFEF5", accent: "#FBBF24", glow: "rgba(251,191,36,0.09)" },
  { key: "금", label: "금 · 쿨화이트", top: "#F7FAFC", bot: "#FDFDFB", accent: "#94A3B8", glow: "rgba(148,163,184,0.10)" },
  { key: "수", label: "수 · 물빛", top: "#F2F8FE", bot: "#FAFDFF", accent: "#60A5FA", glow: "rgba(96,165,250,0.08)" },
];

function HeroSwatch({ g, border }: { g: (typeof HERO_GRADS)[number]; border: string }) {
  return (
    <div
      className="rounded-2xl px-4 py-3.5 flex flex-col gap-2.5"
      style={{ background: `linear-gradient(160deg, ${g.top}, ${g.bot})`, border, boxShadow: `0 4px 16px ${g.glow}` }}
    >
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: g.accent }} />
        <DoodleSparkle className="!w-4 !h-4" />
        <span className="text-[14px] font-bold text-[#2D2D2D]">정밀 예보</span>
        <span className="ml-auto px-2 py-0.5 rounded-full text-[11px] font-bold" style={{ background: g.accent + "22", color: g.accent }}>{g.label}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-[12px] text-[#2D2D2D]/75 leading-snug">알았어, 친구야. 다음달 네 운을 일기예보처럼 펼쳐볼게.</p>
        <p className="text-[12px] text-[#2D2D2D]/55 leading-snug">무난하면서도 돈이 움직이는 흐름이야. 들어오고 나가는 게 눈에 띄게 느껴질 거야.</p>
      </div>
      <p className="text-[9px] font-mono text-gray-400">{g.top} → {g.bot}</p>
    </div>
  );
}

export default function PreviewPage() {
  const total = DOODLE_CATEGORIES.reduce((s, c) => s + c.stickers.length, 0);
  const classified = DOODLE_CATEGORIES.reduce((s, c) => s + c.stickers.filter(st => st.element).length, 0);

  return (
    <main className="min-h-screen bg-[#FDF6EE] p-8">
      <h1 className="text-2xl font-bold text-center mb-1">두들 스티커 미리보기</h1>
      <p className="text-sm text-center text-gray-500 mb-10">총 {total}종 · {DOODLE_CATEGORIES.length}개 카테고리 · 오행 분류 {classified}/{total}</p>

      {DOODLE_CATEGORIES.map(cat => (
        <section key={cat.id} className="mb-12 max-w-[640px] mx-auto">
          <h2 className="text-base font-bold text-[#2D2D2D] mb-4 pb-2 border-b-2 border-[#2D2D2D]/10">
            {cat.label}
            <span className="ml-2 text-xs font-normal text-gray-400">{cat.stickers.length}종</span>
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {cat.stickers.map(({ name, label, comp: Comp, element }) => (
              <div key={name} className="relative flex flex-col items-center gap-1.5 bg-white rounded-xl p-3 border border-[#2D2D2D]/10">
                {element && (
                  <span
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: ELEM_BADGE[element].bg, color: ELEM_BADGE[element].fg }}
                  >
                    {BADGE_TXT[element] ?? element}
                  </span>
                )}
                <Comp className="!w-12 !h-12" />
                <p className="text-[12px] font-bold text-[#2D2D2D] text-center leading-tight">{label ?? "—"}</p>
                <p className="text-[9px] font-mono text-gray-400 text-center leading-tight">{name}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ── AI 히어로 박스 오행 그라디언트 변주 (비교용) ── */}
      <h2 className="text-xl font-bold text-center mt-12 mb-1 max-w-[640px] mx-auto">AI 히어로 그라디언트 · 오행 변주</h2>
      <p className="text-sm text-center text-gray-500 mb-6 max-w-[640px] mx-auto">현재 핑크안 + 목화토금수 5변주 · A안(charcoal 보더) / B안(오행 틴트 보더)</p>

      <section className="mb-10 max-w-[640px] mx-auto">
        <h3 className="text-base font-bold text-[#2D2D2D] mb-3">A안 — charcoal 보더 고정 <span className="text-xs font-normal text-gray-400">통일감</span></h3>
        <div className="grid grid-cols-2 gap-3">
          {HERO_GRADS.map(g => <HeroSwatch key={g.key} g={g} border="2px solid #2D2D2D" />)}
        </div>
      </section>

      <section className="mb-12 max-w-[640px] mx-auto">
        <h3 className="text-base font-bold text-[#2D2D2D] mb-3">B안 — 오행 틴트 보더 <span className="text-xs font-normal text-gray-400">정체성 ↑</span></h3>
        <div className="grid grid-cols-2 gap-3">
          {HERO_GRADS.map(g => <HeroSwatch key={g.key} g={g} border={`2px solid ${g.accent}`} />)}
        </div>
      </section>

      <h2 className="text-xl font-bold text-center mt-12 mb-6 max-w-[640px] mx-auto">조합 예시</h2>
      <div className="relative max-w-[400px] mx-auto bg-white rounded-2xl p-8 border-2 border-[#2D2D2D]/10 min-h-[300px]">
        <DoodleTravelGirl className="!w-32 !h-40 mx-auto" />
        <DoodlePlane className="absolute top-4 right-6 !w-12 !h-8 animate-float" style={{ animationDelay: "0.5s" } as React.CSSProperties} />
        <DoodleMusicNote className="absolute top-8 left-8 animate-wiggle" />
        <DoodleQuestionMark className="absolute bottom-16 left-6 animate-float" />
        <DoodleQuestionMark className="absolute bottom-24 left-12 !w-3 !h-4 animate-float" style={{ animationDelay: "0.3s" } as React.CSSProperties} />
        <DoodleSpeechBubble className="absolute top-12 right-20 animate-wiggle" style={{ animationDelay: "0.8s" } as React.CSSProperties} />
        <DoodleHeart className="absolute top-6 right-32 animate-float" />
        <DoodleSparkle className="absolute top-2 left-20 animate-wiggle" />
        <DoodleStar className="absolute bottom-4 right-8 animate-wiggle" style={{ animationDelay: "1s" } as React.CSSProperties} />
      </div>
    </main>
  );
}
