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
