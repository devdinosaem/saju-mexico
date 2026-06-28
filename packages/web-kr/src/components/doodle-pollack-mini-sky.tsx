// 액맞이명태 — 슬림 미니 (위아래 새끼줄 모두 짧게) · 스카이 블루
// 기준: SlimBase 위 rope height 34→22(-12), 물고기 -12 이동, 아래 rope height 8

const BODY   = "#BAE6FD";
const TAIL   = "#38BDF8";
const GRAIN  = "#38BDF8";

export function DoodleRitualPollackMiniSky({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={`w-12 h-[144px] ${className}`} fill="none">
      {/* 상단 술 — 고리는 그대로 */}
      <line x1="30" y1="14" x2="22" y2="4"  stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="24" y2="2"  stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="27" y2="1"  stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="30" y2="2"  stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="33" y2="1"  stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="36" y2="2"  stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="38" y2="4"  stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="30" cy="14" r="3"   fill="none"    stroke="#94A3B8" strokeWidth="1.8"/>
      <circle cx="30" cy="14" r="1.5" fill="#94A3B8"/>

      {/* 위 새끼줄 — height 34→22 (12 단축) */}
      <rect x="27" y="16" width="6" height="22" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 20 Q30 22 33 20" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 24 Q30 26 33 24" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 28 Q30 30 33 28" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 32 Q30 34 33 32" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>

      {/* 꼬리 — SlimBase 대비 y -12 */}
      <path d="M46 38 Q54 34 56 40 Q54 46 46 44 Z" fill={TAIL} stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>

      {/* 몸통 — SlimBase 대비 y -12 */}
      <path d="M10 36 Q6 38 6 42 Q8 48 22 50 Q36 52 46 46 Q50 44 50 40 Q48 35 36 34 Q22 32 12 34 Q10 34 10 36 Z"
            fill={BODY} stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>

      {/* 나뭇결 */}
      <path d="M16 39 Q28 37 40 40" stroke={GRAIN} strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M14 44 Q28 42 42 45" stroke={GRAIN} strokeWidth="0.8" fill="none" opacity="0.45"/>

      {/* 등지느러미 */}
      <path d="M24 34 Q30 29 36 34" fill={TAIL} stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>

      {/* 눈 */}
      <circle cx="13" cy="41"   r="2.5" fill="#2D2D2D"/>
      <circle cx="13.8" cy="40.2" r="1" fill="white"/>

      {/* 새끼줄이 물고기를 감아묶음 */}
      <path d="M30 34 Q28 40 28 48 Q30 52 32 48 Q32 40 30 34" stroke="#F8FAFC" strokeWidth="6"   strokeLinecap="round" fill="none"/>
      <path d="M30 34 Q28 40 28 48 Q30 52 32 48 Q32 40 30 34" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" fill="none"/>

      {/* 아래 새끼줄 — height 8 (짧게), y도 -12 이동 */}
      <rect x="27" y="50" width="6" height="8" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 54 Q30 56 33 54" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
    </svg>
  );
}
