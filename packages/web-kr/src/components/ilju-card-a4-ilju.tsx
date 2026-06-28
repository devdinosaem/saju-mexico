import { CARD_W, CARD_H, ELEMENT_STYLE, ElementBadgePill, YinyangBadge, type IljuTypeCardProps } from "./ilju-type-card";
import { SajuTILogo } from "./logo";

export function SetlogCardA4Ilju({ ilju, character, characterBg }: IljuTypeCardProps) {
  const el = ELEMENT_STYLE[ilju.stemElement];
  const accentColor = el?.border ?? "#4ADE80";
  const bgColor = characterBg ?? el?.bg ?? "#D1FAE5";
  const headerTextColor = el?.text ?? "#1a1a1a";

  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col bg-white"
      style={{ width: CARD_W, height: CARD_H, boxShadow: "0 4px 32px rgba(0,0,0,0.13)" }}
    >
      <div className="h-[3px] shrink-0" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

      <div
        className="relative shrink-0 flex items-center justify-center overflow-hidden"
        style={{ height: 252, background: `linear-gradient(145deg, ${bgColor} 0%, ${bgColor}bb 100%)` }}
      >
        <div className="absolute rounded-full" style={{ width: 200, height: 200, background: accentColor, opacity: 0.18, top: -50, right: -40 }} />
        <div className="absolute rounded-full" style={{ width: 110, height: 110, background: accentColor, opacity: 0.15, bottom: -30, left: -20 }} />
        <div className="scale-[1.15] relative z-10">{character}</div>
        <span className="absolute top-5 left-5 text-2xl" style={{ opacity: 0.65 }}>✦</span>
        <span className="absolute top-4 right-5 text-base" style={{ opacity: 0.45 }}>◆</span>
        <span className="absolute bottom-5 right-6 text-xl" style={{ opacity: 0.7 }}>⭐</span>
        <div className="absolute top-0 left-0 px-5 pt-3 pb-2 flex items-center gap-2 z-20">
          <SajuTILogo className="w-7 h-7" />
          <span className="text-[16px] font-black tracking-[0.08em] uppercase" style={{ color: headerTextColor }}>SAJUPLAY</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10" style={{ background: "linear-gradient(to bottom, transparent, white)" }} />
      </div>

      <div className="flex flex-col flex-1 px-4 pt-3 pb-5">
        <p className="text-[27px] leading-[1.15] tracking-tight text-black" style={{ fontFamily: "var(--font-black-han-sans), sans-serif" }}>
          {ilju.name}
        </p>

        {/* 일주 배지 — ElementBadgePill과 동일한 스타일, 이름 바로 아래 */}
        <div className="mt-1.5">
          <span
            className="inline-flex items-center text-[13px] font-bold px-3 py-0.5 rounded-full"
            style={{
              fontFamily: "var(--font-black-han-sans), sans-serif",
              background: el?.bg,
              border: `1.5px solid ${accentColor}`,
              color: headerTextColor,
            }}
          >
            {ilju.ilju} 일주
          </span>
        </div>

        <p className="text-[11px] text-gray-400 mt-1.5 font-medium" style={{ fontFamily: "var(--font-pretendard), sans-serif" }}>
          {ilju.tagline}
        </p>
        <div className="flex gap-1.5 flex-wrap mt-2.5">
          <ElementBadgePill element={ilju.stemElement} />
          <ElementBadgePill element={ilju.branchElement} />
          <YinyangBadge yinyang={ilju.yinyang} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1.5">
          {ilju.strengths.slice(0, 3).map((s) => (
            <div key={s} className="flex items-center gap-1.5 min-w-0">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: accentColor }} />
              <span className="text-[11px] font-semibold text-gray-800 truncate" style={{ fontFamily: "var(--font-pretendard), sans-serif" }}>{s}</span>
            </div>
          ))}
        </div>
        <div className="grow" />
        <div className="w-full rounded-2xl px-4 py-3" style={{ background: `${bgColor}99`, border: `1.5px solid ${accentColor}66` }}>
          <p className="text-[13px] font-bold text-gray-900 leading-snug" style={{ fontFamily: "var(--font-pretendard), sans-serif" }}>
            &ldquo;{ilju.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
