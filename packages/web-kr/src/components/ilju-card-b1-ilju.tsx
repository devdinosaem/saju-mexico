import { CARD_W, CARD_H, ELEMENT_STYLE, MiniSun, MiniMoon, type IljuTypeCardProps } from "./ilju-type-card";
import { SajuTILogo } from "./logo";

export function NightCardB1Ilju({ ilju, character, characterBg }: IljuTypeCardProps) {
  const el = ELEMENT_STYLE[ilju.stemElement];
  const accentColor = el?.border ?? "#4ADE80";
  const bgFrom = characterBg ?? el?.bg ?? "#D1FAE5";

  return (
    <div
      className="relative rounded-[28px] overflow-hidden flex flex-col"
      style={{ width: CARD_W, height: CARD_H, background: "linear-gradient(160deg, #0D0D1A 0%, #161628 100%)" }}
    >
      <div className="h-[3px] shrink-0" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

      <div className="px-5 pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <SajuTILogo className="w-7 h-7" />
          <span className="text-[16px] font-black tracking-[0.08em] uppercase" style={{ color: accentColor }}>SAJU TI</span>
          <div className="h-px flex-1" style={{ background: accentColor, opacity: 0.2 }} />
          <span className="text-[10px] text-white/30">{"★".repeat(ilju.rarity)}{"☆".repeat(5 - ilju.rarity)}</span>
        </div>
      </div>

      <div
        className="relative mx-4 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center"
        style={{ height: 200, background: `radial-gradient(ellipse at 50% 60%, ${bgFrom}44 0%, transparent 70%)`, border: `1px solid ${accentColor}33` }}
      >
        <div className="scale-[1.3] relative z-10">{character}</div>
        <span className="absolute top-5 right-5 text-2xl" style={{ color: "#FDE68A", opacity: 0.65 }}>✦</span>
        <span className="absolute top-4 left-5 text-base" style={{ color: accentColor, opacity: 0.45 }}>◆</span>
        <span className="absolute bottom-5 left-6 text-xl" style={{ opacity: 0.7 }}>⭐</span>
      </div>

      <div className="px-5 pt-4 shrink-0">
        <p className="text-[22px] leading-tight text-white" style={{ fontFamily: "var(--font-jua), sans-serif" }}>
          {ilju.name}
        </p>

        {/* 일주 배지 — 기존 네온 배지와 동일한 스타일, Jua 폰트 유지 */}
        <div className="mt-1.5">
          <span
            className="inline-flex items-center text-[13px] font-bold px-3 py-0.5 rounded-full"
            style={{
              fontFamily: "var(--font-jua), sans-serif",
              border: `1.5px solid ${accentColor}`,
              color: accentColor,
              background: `${accentColor}18`,
            }}
          >
            {ilju.ilju} 일주
          </span>
        </div>

        <p className="text-[11px] mt-1.5" style={{ color: `${accentColor}99` }}>{ilju.tagline}</p>
      </div>

      <div className="px-5 pt-2.5 flex gap-1.5 flex-wrap shrink-0">
        {[ilju.stemElement, ilju.branchElement].map((elem, i) => {
          const s = ELEMENT_STYLE[elem];
          return (
            <span
              key={`${elem}-${i}`}
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ border: `1.5px solid ${s?.border}`, color: s?.border, background: `${s?.bg}22` }}
            >
              {s?.sticker}{s?.label}
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

      <div className="px-5 pt-3 grid grid-cols-2 gap-x-2 gap-y-1 shrink-0">
        {ilju.strengths.slice(0, 3).map((s) => (
          <div key={s} className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] font-bold shrink-0" style={{ color: accentColor }}>—</span>
            <span className="text-[11px] text-white/60 truncate">{s}</span>
          </div>
        ))}
      </div>

      <div className="grow" />

      <div className="px-5 pb-5 shrink-0">
        <div className="rounded-2xl px-4 py-3" style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}44` }}>
          <p className="text-[12px] text-white/90 leading-snug" style={{ fontFamily: "var(--font-jua), sans-serif" }}>
            &ldquo;{ilju.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
