// 액맞이명태 두들 스티커 — 슬림 / 통통 × 무지개 색상 모음

type PollackColors = { body: string; tail: string; grain: string };

const COLORS: Record<string, PollackColors> = {
  wood:   { body: "#D4956A", tail: "#C4834A", grain: "#B8723A" },
  red:    { body: "#FECACA", tail: "#F87171", grain: "#F87171" },
  orange: { body: "#FED7AA", tail: "#FB923C", grain: "#FB923C" },
  yellow: { body: "#FEF08A", tail: "#FACC15", grain: "#FACC15" },
  green:  { body: "#BBF7D0", tail: "#4ADE80", grain: "#4ADE80" },
  sky:    { body: "#BAE6FD", tail: "#38BDF8", grain: "#38BDF8" },
  violet: { body: "#DDD6FE", tail: "#A78BFA", grain: "#A78BFA" },
  pink:   { body: "#FBCFE8", tail: "#F472B6", grain: "#F472B6" },
};

function SlimBase({ className = "", c }: { className?: string; c: PollackColors }) {
  return (
    <svg viewBox="0 0 60 90" className={`w-12 h-[144px] ${className}`} fill="none">
      <line x1="30" y1="14" x2="22" y2="4" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="24" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="27" y2="1" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="30" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="33" y2="1" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="36" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="38" y2="4" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="30" cy="14" r="3" fill="none" stroke="#94A3B8" strokeWidth="1.8"/>
      <circle cx="30" cy="14" r="1.5" fill="#94A3B8"/>
      <rect x="27" y="16" width="6" height="34" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 20 Q30 22 33 20" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 24 Q30 26 33 24" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 28 Q30 30 33 28" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 32 Q30 34 33 32" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 36 Q30 38 33 36" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 40 Q30 42 33 40" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 44 Q30 46 33 44" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M46 50 Q54 46 56 52 Q54 58 46 56 Z" fill={c.tail} stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10 48 Q6 50 6 54 Q8 60 22 62 Q36 64 46 58 Q50 56 50 52 Q48 47 36 46 Q22 44 12 46 Q10 46 10 48 Z" fill={c.body} stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 51 Q28 49 40 52" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M14 56 Q28 54 42 57" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.45"/>
      <path d="M24 46 Q30 41 36 46" fill={c.tail} stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <circle cx="13" cy="53" r="2.5" fill="#2D2D2D"/>
      <circle cx="13.8" cy="52.2" r="1" fill="white"/>
      <path d="M30 46 Q28 52 28 60 Q30 64 32 60 Q32 52 30 46" stroke="#F8FAFC" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M30 46 Q28 52 28 60 Q30 64 32 60 Q32 52 30 46" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <rect x="27" y="62" width="6" height="20" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 66 Q30 68 33 66" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 70 Q30 72 33 70" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 74 Q30 76 33 74" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 78 Q30 80 33 78" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
    </svg>
  );
}

function ChubbyBase({ className = "", c }: { className?: string; c: PollackColors }) {
  return (
    <svg viewBox="0 0 60 90" className={`w-12 h-[144px] ${className}`} fill="none">
      <line x1="30" y1="14" x2="22" y2="4" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="24" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="27" y2="1" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="30" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="33" y2="1" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="36" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="38" y2="4" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="30" cy="14" r="3" fill="none" stroke="#94A3B8" strokeWidth="1.8"/>
      <circle cx="30" cy="14" r="1.5" fill="#94A3B8"/>
      <rect x="27" y="16" width="6" height="28" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 20 Q30 22 33 20" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 24 Q30 26 33 24" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 28 Q30 30 33 28" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 32 Q30 34 33 32" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 36 Q30 38 33 36" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 40 Q30 42 33 40" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M48 50 Q56 45 58 52 Q56 59 48 57 Z" fill={c.tail} stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M8 47 Q4 49 4 54 Q6 61 20 64 Q36 67 48 60 Q53 57 53 52 Q51 46 37 44 Q20 42 10 44 Q8 44 8 47 Z" fill={c.body} stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 51 Q28 48 42 52" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M12 57 Q28 55 44 58" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.45"/>
      <path d="M22 44 Q30 38 38 44" fill={c.tail} stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <circle cx="9" cy="54" r="2.5" fill="#2D2D2D"/>
      <circle cx="9.8" cy="53.2" r="1" fill="white"/>
      <path d="M30 44 Q28 52 28 62 Q30 66 32 62 Q32 52 30 44" stroke="#F8FAFC" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M30 44 Q28 52 28 62 Q30 66 32 62 Q32 52 30 44" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <rect x="27" y="66" width="6" height="16" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 68 Q30 70 33 68" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 72 Q30 74 33 72" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 76 Q30 78 33 76" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
    </svg>
  );
}

function ShortBase({ className = "", c }: { className?: string; c: PollackColors }) {
  return (
    <svg viewBox="0 0 60 90" className={`w-12 h-[144px] ${className}`} fill="none">
      <line x1="30" y1="14" x2="22" y2="4" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="24" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="27" y2="1" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="30" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="33" y2="1" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="36" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="38" y2="4" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="30" cy="14" r="3" fill="none" stroke="#94A3B8" strokeWidth="1.8"/>
      <circle cx="30" cy="14" r="1.5" fill="#94A3B8"/>
      <rect x="27" y="16" width="6" height="34" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 20 Q30 22 33 20" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 24 Q30 26 33 24" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 28 Q30 30 33 28" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 32 Q30 34 33 32" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 36 Q30 38 33 36" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 40 Q30 42 33 40" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 44 Q30 46 33 44" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M46 50 Q54 46 56 52 Q54 58 46 56 Z" fill={c.tail} stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10 48 Q6 50 6 54 Q8 60 22 62 Q36 64 46 58 Q50 56 50 52 Q48 47 36 46 Q22 44 12 46 Q10 46 10 48 Z" fill={c.body} stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 51 Q28 49 40 52" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M14 56 Q28 54 42 57" stroke={c.grain} strokeWidth="0.8" fill="none" opacity="0.45"/>
      <path d="M24 46 Q30 41 36 46" fill={c.tail} stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <circle cx="13" cy="53" r="2.5" fill="#2D2D2D"/>
      <circle cx="13.8" cy="52.2" r="1" fill="white"/>
      <path d="M30 46 Q28 52 28 60 Q30 64 32 60 Q32 52 30 46" stroke="#F8FAFC" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M30 46 Q28 52 28 60 Q30 64 32 60 Q32 52 30 46" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      {/* 아래 새끼줄 — 짧게 */}
      <rect x="27" y="62" width="6" height="8" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 66 Q30 68 33 66" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
    </svg>
  );
}

// ── 슬림 ──────────────────────────────────────
export function DoodleRitualPollackV1       ({ className = "" }: { className?: string }) { return <SlimBase className={className} c={COLORS.wood}   />; }
export function DoodleRitualPollackSlimRed  ({ className = "" }: { className?: string }) { return <SlimBase className={className} c={COLORS.red}    />; }
export function DoodleRitualPollackSlimOrange({ className = "" }: { className?: string }) { return <SlimBase className={className} c={COLORS.orange} />; }
export function DoodleRitualPollackSlimYellow({ className = "" }: { className?: string }) { return <SlimBase className={className} c={COLORS.yellow} />; }
export function DoodleRitualPollackSlimGreen({ className = "" }: { className?: string }) { return <SlimBase className={className} c={COLORS.green}  />; }
export function DoodleRitualPollackSlimSky  ({ className = "" }: { className?: string }) { return <SlimBase className={className} c={COLORS.sky}    />; }
export function DoodleRitualPollackSlimViolet({ className = "" }: { className?: string }) { return <SlimBase className={className} c={COLORS.violet} />; }
export function DoodleRitualPollackSlimPink ({ className = "" }: { className?: string }) { return <SlimBase className={className} c={COLORS.pink}   />; }

// ── 슬림 숏 ──────────────────────────────────────
export function DoodleRitualPollackShortV1       ({ className = "" }: { className?: string }) { return <ShortBase className={className} c={COLORS.wood}   />; }
export function DoodleRitualPollackShortRed      ({ className = "" }: { className?: string }) { return <ShortBase className={className} c={COLORS.red}    />; }
export function DoodleRitualPollackShortOrange   ({ className = "" }: { className?: string }) { return <ShortBase className={className} c={COLORS.orange} />; }
export function DoodleRitualPollackShortYellow   ({ className = "" }: { className?: string }) { return <ShortBase className={className} c={COLORS.yellow} />; }
export function DoodleRitualPollackShortGreen    ({ className = "" }: { className?: string }) { return <ShortBase className={className} c={COLORS.green}  />; }
export function DoodleRitualPollackShortSky      ({ className = "" }: { className?: string }) { return <ShortBase className={className} c={COLORS.sky}    />; }
export function DoodleRitualPollackShortViolet   ({ className = "" }: { className?: string }) { return <ShortBase className={className} c={COLORS.violet} />; }
export function DoodleRitualPollackShortPink     ({ className = "" }: { className?: string }) { return <ShortBase className={className} c={COLORS.pink}   />; }

// ── 통통 ──────────────────────────────────────
export function DoodleRitualPollackV2         ({ className = "" }: { className?: string }) { return <ChubbyBase className={className} c={COLORS.wood}   />; }
export function DoodleRitualPollackChubbyRed  ({ className = "" }: { className?: string }) { return <ChubbyBase className={className} c={COLORS.red}    />; }
export function DoodleRitualPollackChubbyOrange({ className = "" }: { className?: string }) { return <ChubbyBase className={className} c={COLORS.orange} />; }
export function DoodleRitualPollackChubbyYellow({ className = "" }: { className?: string }) { return <ChubbyBase className={className} c={COLORS.yellow} />; }
export function DoodleRitualPollackChubbyGreen({ className = "" }: { className?: string }) { return <ChubbyBase className={className} c={COLORS.green}  />; }
export function DoodleRitualPollackChubbySky  ({ className = "" }: { className?: string }) { return <ChubbyBase className={className} c={COLORS.sky}    />; }
export function DoodleRitualPollackChubbyViolet({ className = "" }: { className?: string }) { return <ChubbyBase className={className} c={COLORS.violet} />; }
export function DoodleRitualPollackChubbyPink ({ className = "" }: { className?: string }) { return <ChubbyBase className={className} c={COLORS.pink}   />; }
