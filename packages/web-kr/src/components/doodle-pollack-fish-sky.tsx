// 액맞이명태 — 물고기만 (새끼줄·고리·술 전부 제거)

type FishColors = { body: string; tail: string; grain: string; stroke?: string };

function FishOnly({ className = "", c }: { className?: string; c: FishColors }) {
  const s = c.stroke ?? "#2D2D2D";
  return (
    <svg viewBox="0 26 60 29" className={`w-12 h-[23px] ${className}`} fill="none">
      <path d="M46 38 Q54 34 56 40 Q54 46 46 44 Z" fill={c.tail} stroke={s} strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10 36 Q6 38 6 42 Q8 48 22 50 Q36 52 46 46 Q50 44 50 40 Q48 35 36 34 Q22 32 12 34 Q10 34 10 36 Z"
            fill={c.body} stroke={s} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 39 Q28 37 40 40" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M14 44 Q28 42 42 45" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.45"/>
      <path d="M24 34 Q30 29 36 34" fill={c.tail} stroke={s} strokeWidth="1" strokeLinejoin="round"/>
      <circle cx="13" cy="41"     r="2.5" fill="#2D2D2D"/>
      <circle cx="13.8" cy="40.2" r="1"   fill="white"/>
    </svg>
  );
}

export function DoodleRitualPollackFishSky({ className = "" }: { className?: string }) {
  return <FishOnly className={className} c={{ body: "#BAE6FD", tail: "#38BDF8", grain: "#38BDF8" }}/>;
}

export function DoodleRitualPollackFishPink({ className = "" }: { className?: string }) {
  return <FishOnly className={className} c={{ body: "#FFE4EA", tail: "#E84B6A", grain: "#E84B6A" }}/>;
}

export function DoodleRitualPollackFishYellow({ className = "" }: { className?: string }) {
  return <FishOnly className={className} c={{ body: "#FEF08A", tail: "#FACC15", grain: "#FACC15", stroke: "#FACC15" }}/>;
}
