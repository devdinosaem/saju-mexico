/**
 * 오행 원형 뱃지 컴포넌트
 * 디자인을 여기서 한번 바꾸면 모든 캐릭터 시안에 일관 적용됨
 */

type Element = "wood" | "fire" | "earth" | "metal" | "water";

const BADGE_DATA: Record<Element, { bg: string; border: string; inner: React.ReactNode }> = {
  wood: {
    bg: "#D1FAE5", border: "#4ADE80",
    inner: (
      <>
        <rect x="27" y="36" width="6" height="12" rx="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="30" cy="26" r="13" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="26" cy="24" r="1.8" fill="#2D2D2D" />
        <circle cx="34" cy="24" r="1.8" fill="#2D2D2D" />
        <path d="M27 30 Q30 33 33 30" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  fire: {
    bg: "#FEE2E2", border: "#F87171",
    inner: (
      <>
        <path d="M30 6 C30 6 14 22 14 32 A16 16 0 0 0 46 32 C46 22 30 6 30 6Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
        <path d="M30 18 C30 18 22 28 22 33 A8 8 0 0 0 38 33 C38 28 30 18 30 18Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
        <circle cx="26" cy="30" r="1.8" fill="#2D2D2D" />
        <circle cx="34" cy="30" r="1.8" fill="#2D2D2D" />
        <path d="M27 36 Q30 39 33 36" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  earth: {
    bg: "#FEF3C7", border: "#FBBF24",
    inner: (
      <>
        <path d="M8 46 L30 12 L52 46 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M22 20 L30 12 L38 20" fill="white" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
        <circle cx="26" cy="32" r="1.8" fill="#2D2D2D" />
        <circle cx="34" cy="32" r="1.8" fill="#2D2D2D" />
        <path d="M27 37 Q30 40 33 37" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  metal: {
    bg: "#F1F5F9", border: "#94A3B8",
    inner: (
      <>
        <path d="M30 6 L50 22 L30 50 L10 22 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M30 6 L18 22 L42 22 Z" fill="#F1F5F9" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
        <circle cx="25" cy="28" r="1.8" fill="#2D2D2D" />
        <circle cx="35" cy="28" r="1.8" fill="#2D2D2D" />
        <path d="M27 34 Q30 37 33 34" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  water: {
    bg: "#DBEAFE", border: "#60A5FA",
    inner: (
      <>
        <path d="M30 6 C30 6 12 24 12 34 A18 18 0 0 0 48 34 C48 24 30 6 30 6Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
        <circle cx="25" cy="30" r="1.8" fill="#2D2D2D" />
        <circle cx="35" cy="30" r="1.8" fill="#2D2D2D" />
        <path d="M27 36 Q30 39 33 36" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      </>
    ),
  },
};

export function ElementBadge({ element, className = "absolute top-3 right-3 w-9 h-9 z-20" }: { element: Element; className?: string }) {
  const d = BADGE_DATA[element];
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <circle cx="30" cy="30" r="28" fill={d.bg} stroke={d.border} strokeWidth="1.5" />
      {d.inner}
    </svg>
  );
}

export function stemToElement(stemElement: string): Element {
  if (stemElement.includes("목")) return "wood";
  if (stemElement.includes("화")) return "fire";
  if (stemElement.includes("토")) return "earth";
  if (stemElement.includes("금")) return "metal";
  return "water";
}
