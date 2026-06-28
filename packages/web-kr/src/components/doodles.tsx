import React from "react"

/**
 * DoodleBox — 두들 스티커 크기 정규화 컨테이너
 * className으로 컨테이너 크기만 지정하면, 내부 SVG가 컨테이너에 맞게 채워집니다.
 * 모든 doodle SVG의 viewBox가 정사각형으로 정규화되어 있어 크기가 일관됩니다.
 *
 * 사용법: <DoodleBox className="w-5 h-5"><DoodleHeart /></DoodleBox>
 */
export function DoodleBox({
  children,
  className = "w-6 h-6",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 overflow-hidden [&>svg]:!w-full [&>svg]:!h-full ${className}`}>
      {children}
    </span>
  )
}

export function DoodleStar({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path
        d="M20 2 L24 14 L36 14 L26 22 L30 34 L20 26 L10 34 L14 22 L4 14 L16 14 Z"
        fill="#FACC15"
        stroke="#2D2D2D"
        strokeWidth="1.5"
      />
      <circle cx="16" cy="16" r="1.5" fill="#2D2D2D" />
      <circle cx="24" cy="16" r="1.5" fill="#2D2D2D" />
      <path d="M17 20 Q20 23 23 20" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleMoon({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 36" className={`w-7 h-7 ${className}`} fill="none">
      <path
        d="M28 18 A12 12 0 1 1 16 6 A8 8 0 0 0 28 18Z"
        fill="#FDE68A"
        stroke="#2D2D2D"
        strokeWidth="1.5"
      />
      <circle cx="18" cy="16" r="1" fill="#2D2D2D" />
      <circle cx="22" cy="18" r="1" fill="#2D2D2D" />
      <path d="M18 21 Q20 23 22 21" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleCloud({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 32" className={`w-10 h-7 ${className}`} fill="none">
      <path
        d="M12 26 A8 8 0 0 1 10 10 A10 10 0 0 1 28 8 A8 8 0 0 1 38 16 A6 6 0 0 1 36 26 Z"
        fill="#FEF9C3"
        stroke="#2D2D2D"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="16" r="1.5" fill="#2D2D2D" />
      <circle cx="28" cy="16" r="1.5" fill="#2D2D2D" />
      <path d="M22 20 Q24 22 26 20" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleHeart({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${className}`} fill="none">
      <path
        d="M12 21 C12 21 3 14 3 8.5 A4.5 4.5 0 0 1 12 6 A4.5 4.5 0 0 1 21 8.5 C21 14 12 21 12 21Z"
        fill="#E84B6A"
        stroke="#2D2D2D"
        strokeWidth="1"
      />
    </svg>
  );
}

export function DoodleSparkle({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" className={`w-4 h-4 ${className}`} fill="none">
      <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#FACC15" />
    </svg>
  );
}

export function DoodlePizza({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 36" className={`w-7 h-7 ${className}`} fill="none">
      <path d="M4 6 L18 34 L32 6 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M4 6 Q18 -2 32 6" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="2.5" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="22" cy="12" r="2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="18" cy="22" r="2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  );
}

export function DoodleLetter({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 28" className={`w-7 h-5 ${className}`} fill="none">
      <rect x="2" y="4" width="32" height="20" rx="3" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M2 7 L18 17 L34 7" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
      <path d="M14 16 L18 19 L22 16" fill="#E84B6A" />
    </svg>
  );
}

export function DoodleFire({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 28 36" className={`w-6 h-7 ${className}`} fill="none">
      <path d="M14 2 C14 2 4 14 4 22 A10 10 0 0 0 24 22 C24 14 14 2 14 2Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M14 14 C14 14 9 20 9 24 A5 5 0 0 0 19 24 C19 20 14 14 14 14Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
    </svg>
  );
}

export function DoodleCat({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 32" className={`w-6 h-6 ${className}`} fill="none">
      <path d="M6 12 L4 4 L10 8" stroke="#2D2D2D" strokeWidth="1.5" fill="#2D2D2D" />
      <path d="M26 12 L28 4 L22 8" stroke="#2D2D2D" strokeWidth="1.5" fill="#2D2D2D" />
      <ellipse cx="16" cy="18" rx="12" ry="10" fill="#2D2D2D" />
      <circle cx="12" cy="16" r="1.5" fill="#FDE68A" />
      <circle cx="20" cy="16" r="1.5" fill="#FDE68A" />
      <ellipse cx="16" cy="19" rx="2" ry="1" fill="#E84B6A" />
      <path d="M10 21 Q16 25 22 21" stroke="#FDE68A" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

export function DoodleBow({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 20" className={`w-7 h-4 ${className}`} fill="none">
      <path d="M16 10 C16 10 6 2 2 6 C-2 10 6 18 16 10Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M16 10 C16 10 26 2 30 6 C34 10 26 18 16 10Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="16" cy="10" r="2.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
    </svg>
  );
}

export function DoodleCrystal({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="-4 0 32 32" className={`w-5 h-5 ${className}`} fill="none">
      <path d="M12 2 L22 12 L12 30 L2 12 Z" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M12 2 L12 30" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.3" />
      <path d="M2 12 L22 12" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function DoodleLeaf({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 28 28" className={`w-6 h-6 ${className}`} fill="none">
      <path d="M4 24 Q4 4 24 4 Q24 24 4 24Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M4 24 Q14 14 24 4" stroke="#2D2D2D" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function DoodleSmiley({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 28 28" className={`w-6 h-6 ${className}`} fill="none">
      <circle cx="14" cy="14" r="12" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="10" cy="12" r="1.5" fill="#2D2D2D" />
      <circle cx="18" cy="12" r="1.5" fill="#2D2D2D" />
      <path d="M9 17 Q14 22 19 17" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleTravelGirl({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 80 100" className={`w-20 h-24 ${className}`} fill="none">
      {/* 번헤어 */}
      <circle cx="40" cy="18" r="8" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.5" />
      <ellipse cx="40" cy="12" rx="5" ry="4" fill="#2D2D2D" />

      {/* 얼굴 */}
      <circle cx="40" cy="22" r="10" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />

      {/* 선글라스 */}
      <rect x="32" y="19" width="7" height="5" rx="2" fill="#2D2D2D" />
      <rect x="41" y="19" width="7" height="5" rx="2" fill="#2D2D2D" />
      <path d="M39 21.5 L41 21.5" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M31 21 L29 19" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M49 21 L51 19" stroke="#2D2D2D" strokeWidth="1" />

      {/* 미소 */}
      <path d="M37 26 Q40 29 43 26" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* 귀걸이 */}
      <circle cx="30" cy="25" r="2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="50" cy="25" r="2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8" />

      {/* 몸통 (흰 티셔츠) */}
      <path d="M32 32 L28 34 L26 44 L34 46 L34 52 L46 52 L46 46 L54 44 L52 34 L48 32" fill="#FFFFFF" stroke="#2D2D2D" strokeWidth="1.5" />

      {/* 왼팔 (위로 들기 — 검지 포인트) */}
      <path d="M26 44 L18 36 L16 28" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="27" r="1.5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1" />

      {/* 오른팔 (캐리어 잡기) */}
      <path d="M54 44 L58 50 L58 56" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* 검은 바지 */}
      <path d="M34 52 L32 72 L38 72 L40 58 L42 72 L48 72 L46 52 Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1" />

      {/* 스니커즈 */}
      <ellipse cx="35" cy="74" rx="5" ry="3" fill="#FFFFFF" stroke="#2D2D2D" strokeWidth="1.2" />
      <ellipse cx="45" cy="74" rx="5" ry="3" fill="#FFFFFF" stroke="#2D2D2D" strokeWidth="1.2" />
      <path d="M32 73 L30 73" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M42 73 L40 73" stroke="#2D2D2D" strokeWidth="1" />

      {/* 캐리어 */}
      <rect x="56" y="56" width="16" height="22" rx="3" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M62 56 L62 52 L66 52 L66 56" stroke="#2D2D2D" strokeWidth="1.2" fill="none" />
      <circle cx="60" cy="80" r="2" fill="#2D2D2D" />
      <circle cx="68" cy="80" r="2" fill="#2D2D2D" />
      {/* 캐리어 스티커 */}
      <circle cx="62" cy="64" r="2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.5" />
      <circle cx="67" cy="68" r="1.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.5" />
    </svg>
  );
}

export function DoodlePlane({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 36" className={`w-10 h-7 ${className}`} fill="none">
      {/* 동체 (통통한 타원) */}
      <ellipse cx="24" cy="18" rx="18" ry="6" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5" transform="rotate(-15 24 18)" />
      {/* 앞코 (밝은 톤) */}
      <ellipse cx="40" cy="14" rx="4" ry="3.5" fill="#C4B5FD" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(-15 40 14)" />
      {/* 윗 날개 */}
      <path d="M20 13 L16 2 L28 10" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* 아래 날개 */}
      <path d="M20 23 L16 34 L28 26" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* 꼬리 날개 */}
      <path d="M8 16 L4 8 L14 14" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round" />
      {/* 창문 */}
      <circle cx="26" cy="16.5" r="1.5" fill="#FFFFFF" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="31" cy="15.5" r="1.5" fill="#FFFFFF" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="36" cy="14.5" r="1.2" fill="#FFFFFF" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  );
}

export function DoodleMusicNote({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 28" className={`w-4 h-5 ${className}`} fill="none">
      <path d="M6 22 L6 6 L16 4 L16 18" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
      <circle cx="4" cy="23" r="3" fill="#2D2D2D" />
      <circle cx="14" cy="19" r="3" fill="#2D2D2D" />
    </svg>
  );
}

export function DoodleQuestionMark({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 28" className={`w-4 h-5 ${className}`} fill="none">
      <path d="M6 8 Q6 2 10 2 Q14 2 14 6 Q14 10 10 12 L10 16" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="10" cy="22" r="2" fill="#2D2D2D" />
    </svg>
  );
}

export function DoodleSpeechBubble({ className = "", children }: { className?: string; children?: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 36" className={`w-14 h-8 ${className}`} fill="none">
      <rect x="2" y="2" width="56" height="26" rx="12" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M16 28 L12 34 L22 28" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1.5" />
    </svg>
  );
}

export function DoodleSuitcase({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="-2 0 36 36" className={`w-7 h-7 ${className}`} fill="none">
      <rect x="3" y="10" width="26" height="18" rx="3" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M11 10 L11 6 L21 6 L21 10" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="30" r="2" fill="#2D2D2D" />
      <circle cx="22" cy="30" r="2" fill="#2D2D2D" />
      {/* 스티커들 */}
      <circle cx="12" cy="18" r="2.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.5" />
      <path d="M11 17.5 Q12 19 13 17.5" stroke="#2D2D2D" strokeWidth="0.5" fill="none" />
      <rect x="18" y="15" width="6" height="4" rx="1" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.5" />
    </svg>
  );
}

export function DoodleSun({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 44" className={`w-9 h-9 ${className}`} style={style} fill="none">
      {/* 삼각형 광선 (8방향, 뾰족한 불꽃 느낌) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const r1 = 13;
        const r2 = i % 2 === 0 ? 20 : 17;
        const rad = (deg * Math.PI) / 180;
        const radL = ((deg - 12) * Math.PI) / 180;
        const radR = ((deg + 12) * Math.PI) / 180;
        return (
          <path
            key={deg}
            d={`M${22 + r1 * Math.cos(radL)} ${22 + r1 * Math.sin(radL)} L${22 + r2 * Math.cos(rad)} ${22 + r2 * Math.sin(rad)} L${22 + r1 * Math.cos(radR)} ${22 + r1 * Math.sin(radR)}`}
            fill="#FB923C"
            stroke="#2D2D2D"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        );
      })}
      {/* 본체 */}
      <circle cx="22" cy="22" r="11" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈 — 아치형 (Smiley의 동그란 눈과 차별화) */}
      <path d="M17 20 Q18 17 19 20" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M25 20 Q26 17 27 20" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="15.5" cy="23" rx="2" ry="1.2" fill="#FB923C" opacity="0.4" />
      <ellipse cx="28.5" cy="23" rx="2" ry="1.2" fill="#FB923C" opacity="0.4" />
      {/* 입 — 큰 활짝 웃음 */}
      <path d="M17 24 Q22 30 27 24" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleTicket({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 28" className={`w-10 h-6 ${className}`} fill="none">
      {/* 티켓 본체 (왼쪽) */}
      <path
        d="M3 4 L30 4 L30 8 A4 4 0 0 0 30 16 L30 24 L3 24 Q2 24 2 23 L2 5 Q2 4 3 4Z"
        fill="#FFFFFF"
        stroke="#2D2D2D"
        strokeWidth="1.5"
      />
      {/* 티켓 본체 (오른쪽 — 떼는 부분) */}
      <path
        d="M30 4 L45 4 Q46 4 46 5 L46 23 Q46 24 45 24 L30 24 L30 16 A4 4 0 0 1 30 8 Z"
        fill="#FDE68A"
        stroke="#2D2D2D"
        strokeWidth="1.5"
      />
      {/* 절취선 */}
      <line x1="30" y1="5" x2="30" y2="7" stroke="#2D2D2D" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      <line x1="30" y1="17" x2="30" y2="23" stroke="#2D2D2D" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      {/* 비행기 아이콘 (왼쪽) */}
      <path d="M8 14 L13 11 L18 14 L13 17 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.8" />
      <path d="M18 14 L22 12.5 L22 15.5 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.5" />
      {/* 텍스트 라인 (장식) */}
      <line x1="8" y1="20" x2="22" y2="20" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.3" />
      <line x1="8" y1="9" x2="16" y2="9" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.3" />
      {/* 바코드 (오른쪽) */}
      {[34, 36, 38, 40, 42].map((x) => (
        <line key={x} x1={x} y1="10" x2={x} y2="18" stroke="#2D2D2D" strokeWidth={x % 4 === 0 ? "1.2" : "0.6"} />
      ))}
    </svg>
  );
}

// ── 오행 5종 스티커 ──

export function DoodleWood({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 44" className={`w-8 h-9 ${className}`} fill="none">
      {/* 나무 줄기 */}
      <rect x="17" y="22" width="6" height="14" rx="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 나뭇잎 (둥근 수관) */}
      <circle cx="20" cy="16" r="12" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈 */}
      <circle cx="16" cy="14" r="1.5" fill="#2D2D2D" />
      <circle cx="24" cy="14" r="1.5" fill="#2D2D2D" />
      {/* 입 */}
      <path d="M17 19 Q20 22 23 19" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="13" cy="18" rx="2" ry="1" fill="#4ADE80" opacity="0.5" />
      <ellipse cx="27" cy="18" rx="2" ry="1" fill="#4ADE80" opacity="0.5" />
      {/* 작은 잎 */}
      <path d="M30 10 Q34 8 32 12" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  );
}

export function DoodleFlameFive({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 44" className={`w-7 h-9 ${className}`} fill="none">
      {/* 불꽃 외곽 */}
      <path d="M18 2 C18 2 6 16 6 26 A12 12 0 0 0 30 26 C30 16 18 2 18 2Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 안쪽 불꽃 */}
      <path d="M18 14 C18 14 12 22 12 27 A6 6 0 0 0 24 27 C24 22 18 14 18 14Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
      {/* 눈 */}
      <circle cx="15" cy="24" r="1.5" fill="#2D2D2D" />
      <circle cx="21" cy="24" r="1.5" fill="#2D2D2D" />
      {/* 입 — 활짝 */}
      <path d="M15 29 Q18 33 21 29" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="12" cy="28" rx="2" ry="1" fill="#FB923C" opacity="0.4" />
      <ellipse cx="24" cy="28" rx="2" ry="1" fill="#FB923C" opacity="0.4" />
    </svg>
  );
}

export function DoodleEarth({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      {/* 산 본체 */}
      <path d="M4 36 L20 8 L36 36 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* 작은 산 */}
      <path d="M24 36 L32 22 L40 36 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
      {/* 눈 */}
      <circle cx="17" cy="24" r="1.5" fill="#2D2D2D" />
      <circle cx="23" cy="24" r="1.5" fill="#2D2D2D" />
      {/* 입 */}
      <path d="M18 28 Q20 31 22 28" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="14" cy="27" rx="2" ry="1" fill="#FB923C" opacity="0.3" />
      <ellipse cx="26" cy="27" rx="2" ry="1" fill="#FB923C" opacity="0.3" />
      {/* 꼭대기 눈 */}
      <path d="M16 14 L20 8 L24 14" fill="white" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
    </svg>
  );
}

export function DoodleMetal({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 40" className={`w-7 h-8 ${className}`} fill="none">
      {/* 다이아몬드 본체 */}
      <path d="M18 4 L32 16 L18 36 L4 16 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* 상단 면 */}
      <path d="M18 4 L10 16 L26 16 Z" fill="#F1F5F9" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
      {/* 광택 */}
      <path d="M10 16 L18 36" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.2" />
      <path d="M26 16 L18 36" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.2" />
      {/* 눈 */}
      <circle cx="14" cy="20" r="1.5" fill="#2D2D2D" />
      <circle cx="22" cy="20" r="1.5" fill="#2D2D2D" />
      <circle cx="14.5" cy="19.5" r="0.5" fill="white" />
      <circle cx="22.5" cy="19.5" r="0.5" fill="white" />
      {/* 입 */}
      <path d="M15 25 Q18 28 21 25" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* 반짝이 */}
      <path d="M30 6 L31 9 L34 10 L31 11 L30 14 L29 11 L26 10 L29 9 Z" fill="#FACC15" opacity="0.5" />
    </svg>
  );
}

export function DoodleWater({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 44" className={`w-7 h-9 ${className}`} fill="none">
      {/* 물방울 본체 */}
      <path d="M18 4 C18 4 4 20 4 28 A14 14 0 0 0 32 28 C32 20 18 4 18 4Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 광택 */}
      <ellipse cx="12" cy="18" rx="3" ry="1.5" fill="white" opacity="0.5" transform="rotate(-20 12 18)" />
      {/* 눈 */}
      <circle cx="14" cy="26" r="1.5" fill="#2D2D2D" />
      <circle cx="22" cy="26" r="1.5" fill="#2D2D2D" />
      <circle cx="14.5" cy="25.5" r="0.5" fill="white" />
      <circle cx="22.5" cy="25.5" r="0.5" fill="white" />
      {/* 입 */}
      <path d="M15 31 Q18 34 21 31" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="11" cy="30" rx="2" ry="1" fill="#3B82F6" opacity="0.3" />
      <ellipse cx="25" cy="30" rx="2" ry="1" fill="#3B82F6" opacity="0.3" />
    </svg>
  );
}

export function DoodleRainbow({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 32" className={`w-10 h-7 ${className}`} fill="none">
      <path d="M4 28 A20 20 0 0 1 44 28" stroke="#EF4444" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M7 28 A17 17 0 0 1 41 28" stroke="#F97316" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M10 28 A14 14 0 0 1 38 28" stroke="#FACC15" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M13 28 A11 11 0 0 1 35 28" stroke="#4ADE80" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M16 28 A8 8 0 0 1 32 28" stroke="#60A5FA" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M19 28 A5 5 0 0 1 29 28" stroke="#A78BFA" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="5" cy="28" rx="5" ry="4" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="43" cy="28" rx="5" ry="4" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
    </svg>
  );
}

export function DoodleIceCream({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 28 44" className={`w-6 h-9 ${className}`} fill="none">
      <path d="M8 24 L14 42 L20 24 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="14" y1="24" x2="11" y2="38" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.4"/>
      <line x1="14" y1="24" x2="17" y2="38" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.4"/>
      <circle cx="14" cy="17" r="9" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="11" cy="16" r="1.2" fill="#2D2D2D"/>
      <circle cx="17" cy="16" r="1.2" fill="#2D2D2D"/>
      <path d="M11 20 Q14 23 17 20" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <ellipse cx="9" cy="20" rx="2" ry="1" fill="#E84B6A" opacity="0.4"/>
      <ellipse cx="19" cy="20" rx="2" ry="1" fill="#E84B6A" opacity="0.4"/>
      <circle cx="14" cy="8" r="2.5" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M14 5.5 Q17 2 20 4" stroke="#4ADE80" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleCake({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 40" className={`w-7 h-8 ${className}`} fill="none">
      <rect x="3" y="20" width="30" height="16" rx="2" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M3 20 Q9 14 15 20 Q21 14 27 20 Q33 14 33 20" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="10" cy="18" r="2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="18" cy="15" r="2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="26" cy="18" r="2" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8"/>
      <rect x="17" y="10" width="3" height="10" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M18.5 10 C18.5 10 16 7 18.5 5 C21 7 18.5 10 18.5 10Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="0.8"/>
      <line x1="3" y1="28" x2="33" y2="28" stroke="#E84B6A" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2"/>
    </svg>
  );
}

export function DoodleFlower({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 40" className={`w-7 h-8 ${className}`} fill="none">
      <path d="M18 32 Q16 37 15 40" stroke="#4ADE80" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M18 34 Q24 30 26 33 Q22 36 18 34Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="18" cy="9" r="5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="26" cy="13" r="5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="23" cy="22" r="5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="13" cy="22" r="5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="10" cy="13" r="5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="18" cy="17" r="7" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="1.2" fill="#2D2D2D"/>
      <circle cx="20" cy="16" r="1.2" fill="#2D2D2D"/>
      <path d="M15.5 20 Q18 22 20.5 20" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleButterfly({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 32" className={`w-9 h-7 ${className}`} fill="none">
      <path d="M22 16 Q18 8 10 6 Q4 6 4 12 Q4 18 12 18 Q18 18 22 16Z" fill="#C084FC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M22 16 Q16 20 12 26 Q8 30 10 28 Q14 24 20 22 Q22 20 22 16Z" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M22 16 Q26 8 34 6 Q40 6 40 12 Q40 18 32 18 Q26 18 22 16Z" fill="#C084FC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M22 16 Q28 20 32 26 Q36 30 34 28 Q30 24 24 22 Q22 20 22 16Z" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="14" cy="12" r="2" fill="white" opacity="0.6"/>
      <circle cx="30" cy="12" r="2" fill="white" opacity="0.6"/>
      <ellipse cx="22" cy="16" rx="2" ry="6" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M21 10 Q18 5 16 3" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <circle cx="16" cy="3" r="1.5" fill="#FACC15"/>
      <path d="M23 10 Q26 5 28 3" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <circle cx="28" cy="3" r="1.5" fill="#FACC15"/>
    </svg>
  );
}

export function DoodleRocket({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 48" className={`w-6 h-10 ${className}`} fill="none">
      <path d="M16 40 C16 40 10 44 10 48 L16 44 L22 48 C22 44 16 40 16 40Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M16 40 C16 40 13 42 13 46 L16 43 L19 46 C19 42 16 40 16 40Z" fill="#FACC15"/>
      <path d="M10 36 L10 16 Q10 6 16 4 Q22 6 22 16 L22 36 Z" fill="#E0E7FF" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="16" cy="22" r="4.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="16" cy="22" r="2.5" fill="white"/>
      <circle cx="15" cy="21" r="0.8" fill="#60A5FA"/>
      <path d="M10 34 L4 38 L10 28" fill="#6366F1" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M22 34 L28 38 L22 28" fill="#6366F1" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

export function DoodleBook({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 36" className={`w-8 h-7 ${className}`} fill="none">
      <path d="M4 4 L20 4 L20 32 Q12 30 4 32 Z" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M20 4 L36 4 L36 32 Q28 30 20 32 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="20" y1="4" x2="20" y2="32" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="7" y1="10" x2="18" y2="10" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
      <line x1="7" y1="14" x2="18" y2="14" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
      <line x1="7" y1="18" x2="15" y2="18" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
      <line x1="22" y1="10" x2="33" y2="10" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
      <line x1="22" y1="14" x2="33" y2="14" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
      <line x1="22" y1="18" x2="30" y2="18" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
      <path d="M33 4 L33 12 L30 10 L27 12 L27 4" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

export function DoodleCoffee({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 40" className={`w-7 h-8 ${className}`} fill="none">
      <path d="M4 14 L8 36 L22 36 L26 14 Z" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M7 20 L9 34 L21 34 L23 20 Z" fill="#92400E" opacity="0.8"/>
      <path d="M26 18 Q32 18 32 24 Q32 30 26 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="15" cy="37" rx="13" ry="3" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M7 20 Q9 16 11 20 Q13 16 15 20 Q17 16 19 20 Q21 16 23 20" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M10 12 Q11 8 10 5" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"/>
      <path d="M15 10 Q16 6 15 3" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"/>
      <path d="M20 12 Q21 8 20 5" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export function DoodleUmbrella({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 44" className={`w-8 h-9 ${className}`} fill="none">
      <ellipse cx="7" cy="6" rx="1" ry="2" fill="#93C5FD"/>
      <ellipse cx="16" cy="3" rx="1" ry="2" fill="#93C5FD"/>
      <ellipse cx="27" cy="5" rx="1" ry="2" fill="#93C5FD"/>
      <ellipse cx="34" cy="8" rx="1" ry="2" fill="#93C5FD"/>
      <path d="M4 20 A16 16 0 0 1 36 20 Q28 12 20 14 Q12 12 4 20Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M14 20 Q16 13 20 20" stroke="#93C5FD" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M20 20 Q22 13 26 20" stroke="#93C5FD" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <line x1="20" y1="20" x2="20" y2="38" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 38 Q20 44 14 44" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleGhost({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 40" className={`w-6 h-8 ${className}`} fill="none">
      <path d="M4 36 Q4 8 16 4 Q28 8 28 36 Q24 32 20 36 Q18 32 16 36 Q14 32 12 36 Q8 32 4 36Z" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="11" cy="18" rx="3" ry="3.5" fill="#2D2D2D"/>
      <ellipse cx="21" cy="18" rx="3" ry="3.5" fill="#2D2D2D"/>
      <circle cx="12" cy="17" r="1.2" fill="white"/>
      <circle cx="22" cy="17" r="1.2" fill="white"/>
      <path d="M12 26 Q16 30 20 26" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <ellipse cx="8" cy="22" rx="2" ry="1.2" fill="#FCA5A5" opacity="0.5"/>
      <ellipse cx="24" cy="22" rx="2" ry="1.2" fill="#FCA5A5" opacity="0.5"/>
    </svg>
  );
}

export function DoodleBalloon({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 28 44" className={`w-6 h-9 ${className}`} fill="none">
      <ellipse cx="14" cy="16" rx="12" ry="14" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="9" cy="10" rx="3" ry="2" fill="white" opacity="0.5" transform="rotate(-20 9 10)"/>
      <path d="M11 30 Q14 34 17 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none"/>
      <circle cx="14" cy="31.5" r="1.5" fill="#EF4444" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M14 33 Q12 36 14 40 Q16 43 14 44" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleCrown({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 -6 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M4 24 L4 12 L12 18 L20 6 L28 18 L36 12 L36 24 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="4" y="20" width="32" height="4" rx="1" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="20" cy="22" r="2.5" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="10" cy="22" r="1.8" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="0.7"/>
      <circle cx="30" cy="22" r="1.8" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.7"/>
    </svg>
  );
}

export function DoodleLightning({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 40" className={`w-5 h-8 ${className}`} fill="none">
      <path d="M16 2 L6 20 L13 20 L8 38 L22 16 L14 16 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

export function DoodleWave({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 32" className={`w-10 h-7 ${className}`} fill="none">
      <path d="M0 24 Q6 18 12 24 Q18 30 24 24 Q30 18 36 24 Q42 30 48 24 L48 32 L0 32 Z" fill="#BFDBFE"/>
      <path d="M0 20 Q6 14 12 20 Q18 26 24 20 Q30 14 36 20 Q42 26 48 20 L48 32 L0 32 Z" fill="#60A5FA"/>
      <path d="M0 16 Q6 10 12 16 Q18 22 24 16 Q30 10 36 16 Q42 22 48 16" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="6" cy="14" r="1.5" fill="white" opacity="0.8"/>
      <circle cx="24" cy="14" r="1.5" fill="white" opacity="0.8"/>
      <circle cx="42" cy="14" r="1.5" fill="white" opacity="0.8"/>
    </svg>
  );
}

export function DoodleKey({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 28" className={`w-9 h-6 ${className}`} fill="none">
      <circle cx="10" cy="14" r="6" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="10" cy="14" r="2.5" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="16" y="12" width="20" height="4" rx="1.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="27" y="16" width="3" height="5" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="33" y="16" width="3" height="3" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2"/>
    </svg>
  );
}

export function DoodleCandy({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 28 40" className={`w-6 h-8 ${className}`} fill="none">
      <line x1="20" y1="16" x2="26" y2="38" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="13" cy="13" r="11" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M5 8 Q9 4 15 8 Q21 12 17 18 Q13 24 7 20 Q3 16 5 10" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      <ellipse cx="8" cy="8" rx="3" ry="2" fill="white" opacity="0.5" transform="rotate(-20 8 8)"/>
    </svg>
  );
}

export function DoodlePlanet({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 36" className={`w-9 h-7 ${className}`} fill="none">
      <path d="M2 18 Q22 12 42 18" stroke="#F97316" strokeWidth="2.5" fill="none" opacity="0.5"/>
      <circle cx="22" cy="18" r="11" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M12 14 Q22 12 32 14" stroke="#7C3AED" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M12 20 Q22 22 32 20" stroke="#7C3AED" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round"/>
      <ellipse cx="17" cy="13" rx="3.5" ry="2" fill="white" opacity="0.4" transform="rotate(-20 17 13)"/>
      <path d="M11 24 Q22 28 33 24" stroke="#F97316" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleFrog({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 32" className={`w-7 h-7 ${className}`} fill="none">
      <ellipse cx="6" cy="26" rx="5" ry="3" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="30" cy="26" rx="5" ry="3" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="18" cy="22" rx="12" ry="9" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="18" cy="23" rx="7" ry="6" fill="#A7F3D0"/>
      <ellipse cx="18" cy="13" rx="12" ry="10" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="11" cy="9" r="4.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.3"/>
      <circle cx="25" cy="9" r="4.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.3"/>
      <circle cx="11" cy="9" r="2.5" fill="#2D2D2D"/>
      <circle cx="25" cy="9" r="2.5" fill="#2D2D2D"/>
      <circle cx="11.7" cy="8.2" r="1" fill="white"/>
      <circle cx="25.7" cy="8.2" r="1" fill="white"/>
      <path d="M12 20 Q18 25 24 20" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleBear({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 36" className={`w-7 h-7 ${className}`} fill="none">
      <circle cx="9" cy="8" r="5" fill="#D4A574" stroke="#2D2D2D" strokeWidth="1.3"/>
      <circle cx="27" cy="8" r="5" fill="#D4A574" stroke="#2D2D2D" strokeWidth="1.3"/>
      <circle cx="9" cy="8" r="2.5" fill="#E8C9A0"/>
      <circle cx="27" cy="8" r="2.5" fill="#E8C9A0"/>
      <circle cx="18" cy="20" r="14" fill="#D4A574" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="18" cy="25" rx="6" ry="4" fill="#E8C9A0"/>
      <circle cx="13" cy="17" r="2.5" fill="#2D2D2D"/>
      <circle cx="23" cy="17" r="2.5" fill="#2D2D2D"/>
      <circle cx="13.7" cy="16.3" r="1" fill="white"/>
      <circle cx="23.7" cy="16.3" r="1" fill="white"/>
      <ellipse cx="18" cy="23" rx="2" ry="1.5" fill="#2D2D2D"/>
      <path d="M16 25 Q18 28 20 25" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <ellipse cx="10" cy="22" rx="3" ry="2" fill="#FCA5A5" opacity="0.4"/>
      <ellipse cx="26" cy="22" rx="3" ry="2" fill="#FCA5A5" opacity="0.4"/>
    </svg>
  );
}

export function DoodleMushroom({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 40" className={`w-7 h-8 ${className}`} fill="none">
      <path d="M10 22 Q8 32 10 38 L26 38 Q28 32 26 22 Z" fill="#F5F5F0" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="14" y1="24" x2="12" y2="36" stroke="#E5E5E0" strokeWidth="0.8" opacity="0.5"/>
      <line x1="22" y1="24" x2="24" y2="36" stroke="#E5E5E0" strokeWidth="0.8" opacity="0.5"/>
      <path d="M2 22 Q4 6 18 4 Q32 6 34 22 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" fill="white" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="22" cy="10" r="2.5" fill="white" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="8" cy="18" r="2" fill="white" stroke="#2D2D2D" strokeWidth="0.7"/>
      <circle cx="28" cy="17" r="2" fill="white" stroke="#2D2D2D" strokeWidth="0.7"/>
      <circle cx="15" cy="26" r="1.5" fill="#2D2D2D"/>
      <circle cx="21" cy="26" r="1.5" fill="#2D2D2D"/>
      <path d="M14 30 Q18 33 22 30" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ── 가구 / 소품 ──────────────────────────────────────────────
export function DoodleChair({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 50 54" className={`w-10 h-11 ${className}`} fill="none">
      <rect x="11" y="4" width="28" height="22" rx="5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.8"/>
      <path d="M15 8 Q25 6 35 8" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      <rect x="7" y="24" width="36" height="10" rx="5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.8"/>
      <path d="M12 27 Q25 25 38 27" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
      <line x1="12" y1="34" x2="10" y2="52" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="38" y1="34" x2="40" y2="52" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="18" y1="34" x2="18" y2="52" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
      <line x1="32" y1="34" x2="32" y2="52" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
      <line x1="10" y1="44" x2="40" y2="44" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
    </svg>
  );
}

export function DoodleSofa({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 44" className={`w-14 h-10 ${className}`} fill="none">
      <rect x="6" y="10" width="52" height="18" rx="6" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="6" y="22" width="10" height="16" rx="5" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="48" y="22" width="10" height="16" rx="5" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="16" y="26" width="32" height="12" rx="4" fill="#EDE9FE" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="32" y1="26" x2="32" y2="38" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <path d="M18 29 Q24 32 30 29" stroke="#C4B5FD" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M34 29 Q40 32 46 29" stroke="#C4B5FD" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <rect x="16" y="38" width="8" height="4" rx="2" fill="#7C3AED" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="40" y="38" width="8" height="4" rx="2" fill="#7C3AED" stroke="#2D2D2D" strokeWidth="1.2"/>
    </svg>
  );
}

export function DoodleMirror({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 58" className={`w-9 h-12 ${className}`} fill="none">
      <ellipse cx="22" cy="22" rx="18" ry="20" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="2"/>
      <ellipse cx="22" cy="22" rx="13" ry="15" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M13 13 Q16 10 19 13" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M14 18 Q15.5 17 17 18" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M8 12 Q22 4 36 12" stroke="#FACC15" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <rect x="20" y="42" width="4" height="8" rx="1" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="14" y="50" width="16" height="5" rx="2.5" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.5"/>
    </svg>
  );
}

export function DoodleLamp({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 46 58" className={`w-9 h-11 ${className}`} fill="none">
      <path d="M23 18 L12 5" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" opacity="0.45"/>
      <path d="M23 18 L4 16" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" opacity="0.35"/>
      <path d="M23 18 L34 5" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" opacity="0.45"/>
      <path d="M23 18 L42 16" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" opacity="0.35"/>
      <path d="M9 20 L23 8 L37 20 Q34 30 23 30 Q12 30 9 20 Z" fill="#FEF08A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <ellipse cx="23" cy="20" rx="14" ry="3" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="23" cy="24" r="3" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="21.5" y="30" width="3" height="20" rx="1.5" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="17" y="48" width="12" height="4" rx="2" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="23" cy="54" rx="9" ry="3" fill="#64748B" stroke="#2D2D2D" strokeWidth="1.5"/>
    </svg>
  );
}

export function DoodleCandle({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 52" className={`w-7 h-11 ${className}`} fill="none">
      <circle cx="16" cy="10" r="5" fill="#FDE68A" opacity="0.25"/>
      <path d="M16 3 Q20 7 18 11 Q16 13 14 11 Q12 7 16 3 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M16 6 Q18 9 17 11 Q16 12 15 11 Q14 9 16 6 Z" fill="#FED7AA"/>
      <line x1="16" y1="13" x2="16" y2="18" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 17 Q8 19 9 22" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      <path d="M22 19 Q24 21 23 24" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
      <rect x="9" y="18" width="14" height="30" rx="4" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="14" y1="18" x2="14" y2="48" stroke="#FDE68A" strokeWidth="1" opacity="0.55"/>
      <line x1="18" y1="18" x2="18" y2="48" stroke="#FDE68A" strokeWidth="1" opacity="0.35"/>
    </svg>
  );
}

export function DoodleClock({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 44" className={`w-10 h-10 ${className}`} fill="none">
      <circle cx="22" cy="22" r="19" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="2"/>
      <line x1="22" y1="5" x2="22" y2="9" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="22" y1="35" x2="22" y2="39" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="5" y1="22" x2="9" y2="22" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="35" y1="22" x2="39" y2="22" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="33" y1="11" x2="30.5" y2="13" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="11" y1="11" x2="13.5" y2="13" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="11" y1="33" x2="13.5" y2="31" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="33" y1="33" x2="30.5" y2="31" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="22" y1="22" x2="15" y2="14" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="22" y1="22" x2="29" y2="14" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="22" y1="22" x2="26" y2="31" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="22" cy="22" r="2" fill="#2D2D2D"/>
    </svg>
  );
}

export function DoodleHourglass({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 38 54" className={`w-8 h-11 ${className}`} fill="none">
      <rect x="5" y="3" width="28" height="5" rx="2.5" fill="#C4A882" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="5" y="46" width="28" height="5" rx="2.5" fill="#C4A882" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M8 8 L30 8 L20 27 L30 46 L8 46 L18 27 Z" fill="#E0F2FE" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 8 L28 8 L21 20 L17 20 Z" fill="#FDE68A"/>
      <path d="M10 46 L28 46 L25 38 L13 38 Z" fill="#FACC15"/>
      <line x1="19" y1="20" x2="19" y2="32" stroke="#FACC15" strokeWidth="1.8" strokeLinecap="round" opacity="0.8"/>
      <path d="M11 13 Q12 11 13 13" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.8"/>
    </svg>
  );
}

export function DoodleTray({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 28" className={`w-14 h-7 ${className}`} fill="none">
      <ellipse cx="30" cy="18" rx="26" ry="7" fill="#C4A882" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="30" cy="15" rx="26" ry="7" fill="#E8D5C4" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="30" cy="15" rx="21" ry="5.5" fill="#F5E6D8" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M18 11 Q24 9 28 11" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

export function DoodleBasket({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 52 50" className={`w-11 h-10 ${className}`} fill="none">
      <path d="M14 24 Q14 8 26 8 Q38 8 38 24" stroke="#C4A882" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M6 26 Q8 44 26 44 Q44 44 46 26 Z" fill="#F5E6D8" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="6" y="23" width="40" height="6" rx="3" fill="#E8D5C4" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="14" y1="29" x2="12" y2="44" stroke="#C4A882" strokeWidth="1" opacity="0.55"/>
      <line x1="20" y1="29" x2="19" y2="44" stroke="#C4A882" strokeWidth="1" opacity="0.55"/>
      <line x1="26" y1="29" x2="26" y2="44" stroke="#C4A882" strokeWidth="1" opacity="0.55"/>
      <line x1="32" y1="29" x2="33" y2="44" stroke="#C4A882" strokeWidth="1" opacity="0.55"/>
      <line x1="38" y1="29" x2="40" y2="44" stroke="#C4A882" strokeWidth="1" opacity="0.55"/>
      <path d="M8 35 Q26 33 44 35" stroke="#C4A882" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export function DoodlePillow({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 54 40" className={`w-12 h-9 ${className}`} fill="none">
      <rect x="3" y="4" width="48" height="32" rx="14" fill="#E0E7FF" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M27 4 Q24 20 27 36" stroke="#C7D2FE" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.55"/>
      <path d="M9 6 Q27 3 45 6" stroke="#C7D2FE" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M9 34 Q27 37 45 34" stroke="#C7D2FE" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      <circle cx="27" cy="20" r="2.5" fill="#A5B4FC" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M7 14 Q14 16 7 20" stroke="#C7D2FE" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.45"/>
      <path d="M47 14 Q40 16 47 20" stroke="#C7D2FE" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.45"/>
    </svg>
  );
}

// ── 꽃 / 식물 ──────────────────────────────────────────────
export function DoodleTulip({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 52" className={`w-8 h-11 ${className}`} fill="none">
      <path d="M18 38 Q17 44 18 50" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M18 42 Q10 38 8 30 Q13 34 17 40 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M18 38 Q26 34 28 26 Q23 30 19 36 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M10 28 Q10 14 18 10 Q26 14 26 28 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 28 Q12 18 18 12 Q18 20 18 28 Z" fill="#FCA5A5"/>
      <path d="M26 28 Q24 18 18 12 Q18 20 18 28 Z" fill="#FCA5A5" opacity="0.65"/>
      <path d="M10 22 Q12 14 16 12" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.35"/>
    </svg>
  );
}

export function DoodleRose({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 52" className={`w-9 h-11 ${className}`} fill="none">
      <path d="M20 36 Q19 44 20 50" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M20 42 Q12 38 10 30 Q14 34 18 40 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M20 38 Q28 34 30 26 Q26 30 22 36 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M20 41 Q12 38 12 33" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"/>
      <circle cx="20" cy="22" r="12" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M13 20 Q15 10 20 12 Q25 10 27 20 Q25 26 20 26 Q15 26 13 20 Z" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M16 18 Q17 10 20 11 Q23 10 24 18 Q23 22 20 22 Q17 22 16 18 Z" fill="#FEE2E2"/>
      <circle cx="20" cy="18" r="4" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="20" cy="18" r="2" fill="#DC2626"/>
    </svg>
  );
}

export function DoodleSunflower({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  const petals = [
    [24, 7, 0], [33, 11, 45], [37, 20, 90], [33, 29, 135],
    [24, 33, 0], [15, 29, 45], [11, 20, 90], [15, 11, 135],
  ] as const;
  return (
    <svg viewBox="0 0 48 56" className={`w-10 h-12 ${className}`} fill="none">
      <path d="M24 38 Q23 46 24 54" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 44 Q14 40 10 32 Q15 36 22 42 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M24 40 Q34 36 38 28 Q33 32 26 38 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      {petals.map(([cx, cy, rot], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="4" ry="7"
          transform={`rotate(${rot} ${cx} ${cy})`}
          fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2"/>
      ))}
      <circle cx="24" cy="20" r="10" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="24" cy="20" r="7" fill="#78350F"/>
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        return <circle key={i} cx={24 + Math.round(Math.cos(r)*4.5)} cy={20 + Math.round(Math.sin(r)*4.5)} r="1.2" fill="#A16207"/>;
      })}
    </svg>
  );
}

export function DoodleCherryBlossom({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 52 48" className={`w-11 h-10 ${className}`} fill="none">
      <path d="M6 44 Q18 30 30 20 Q40 12 46 8" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M20 36 Q26 26 30 18" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.5"/>
      {/* 꽃 1 */}
      <circle cx="20" cy="34" r="5" fill="#FCE7F3" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="17" cy="30" r="3.5" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="23" cy="30" r="3.5" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="24" cy="36" r="3.5" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="16" cy="36" r="3.5" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="20" cy="34" r="2.5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8"/>
      {/* 꽃 2 */}
      <circle cx="40" cy="12" r="5" fill="#FCE7F3" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="37" cy="8" r="3.5" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="43" cy="8" r="3.5" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="44" cy="14" r="3.5" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="36" cy="14" r="3.5" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="40" cy="12" r="2.5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8"/>
      {/* 떨어지는 꽃잎 */}
      <ellipse cx="10" cy="20" rx="3" ry="2" transform="rotate(-30 10 20)" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.7"/>
      <ellipse cx="46" cy="30" rx="2.5" ry="1.8" transform="rotate(20 46 30)" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="0.7"/>
    </svg>
  );
}

export function DoodlePottedPlant({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 54" className={`w-10 h-11 ${className}`} fill="none">
      <path d="M12 36 L14 50 Q24 54 34 50 L36 36 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="10" y="32" width="28" height="6" rx="3" fill="#EA580C" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="24" cy="32" rx="11" ry="4" fill="#92400E" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M24 32 Q20 22 14 16" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M24 32 Q28 20 34 14" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M24 32 Q24 20 24 12" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <ellipse cx="13" cy="14" rx="7" ry="5" transform="rotate(-30 13 14)" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="35" cy="12" rx="7" ry="5" transform="rotate(30 35 12)" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="24" cy="10" rx="6" ry="4.5" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M16 44 Q24 42 32 44" stroke="#EA580C" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.45"/>
    </svg>
  );
}

export function DoodleClover({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 46" className={`w-9 h-10 ${className}`} fill="none">
      <path d="M20 28 Q19 36 20 44" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="20" cy="16" r="8" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="28" r="8" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="12" cy="22" r="8" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="28" cy="22" r="8" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="22" r="5" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M18 18 Q20 16 22 18 M18 26 Q20 28 22 26 M14 20 Q12 22 14 24 M26 20 Q28 22 26 24" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M28 10 L29 7 L30 10 L33 10 L30.5 12 L31.5 15 L29 13 L26.5 15 L27.5 12 L25 10 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6"/>
    </svg>
  );
}

export function DoodleDandelion({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  const spokes = Array.from({length: 12}, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 52 54" className={`w-11 h-11 ${className}`} fill="none">
      <path d="M22 36 Q21 44 22 52" stroke="#86EFAC" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M22 44 Q14 40 10 32 Q15 36 20 42 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      {spokes.map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        const x2 = 22 + Math.round(Math.cos(r) * 14);
        const y2 = 20 + Math.round(Math.sin(r) * 14);
        return <line key={i} x1="22" y1="20" x2={x2} y2={y2} stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>;
      })}
      {spokes.map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        const cx = 22 + Math.round(Math.cos(r) * 14);
        const cy = 20 + Math.round(Math.sin(r) * 14);
        return <circle key={i} cx={cx} cy={cy} r="2.2" fill="white" stroke="#94A3B8" strokeWidth="0.8"/>;
      })}
      <circle cx="22" cy="20" r="4" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="38" y1="12" x2="44" y2="8" stroke="#94A3B8" strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
      <circle cx="44" cy="8" r="1.8" fill="white" stroke="#94A3B8" strokeWidth="0.7"/>
      <line x1="40" y1="22" x2="48" y2="18" stroke="#94A3B8" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
      <circle cx="48" cy="18" r="1.8" fill="white" stroke="#94A3B8" strokeWidth="0.7"/>
      <line x1="6" y1="14" x2="2" y2="8" stroke="#94A3B8" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
      <circle cx="2" cy="8" r="1.8" fill="white" stroke="#94A3B8" strokeWidth="0.7"/>
    </svg>
  );
}

// ── 음식 / 음료 ──────────────────────────────────────────────
export function DoodleBubbleTea({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 52" className={`w-8 h-11 ${className}`} fill="none">
      <rect x="11" y="4" width="14" height="4" rx="2" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="18" y1="4" x2="18" y2="14" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M8 18 L10 46 Q18 50 26 46 L28 18 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 16 Q18 12 28 16 Q28 20 18 20 Q8 20 8 16 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="13" cy="38" r="3" fill="#2D2D2D"/>
      <circle cx="18" cy="42" r="3" fill="#2D2D2D"/>
      <circle cx="23" cy="38" r="3" fill="#2D2D2D"/>
      <circle cx="14" cy="30" r="2.5" fill="#2D2D2D"/>
      <circle cx="22" cy="30" r="2.5" fill="#2D2D2D"/>
      <circle cx="18" cy="34" r="2.5" fill="#2D2D2D" opacity="0.7"/>
      <path d="M10 22 Q18 20 26 22" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export function DoodleTeapot({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 52 44" className={`w-11 h-9 ${className}`} fill="none">
      <path d="M36 16 Q44 14 46 20 Q48 26 42 28 L36 26" stroke="#2D2D2D" strokeWidth="1.5" fill="#E2E8F0" strokeLinecap="round"/>
      <path d="M16 12 Q14 8 18 6 L22 8" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="24" cy="28" rx="16" ry="12" fill="#BFDBFE" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="24" cy="16" rx="10" ry="5" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="24" cy="11" r="3.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M14 24 Q24 22 34 24" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M12 30 Q24 28 36 30" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export function DoodleMatcha({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 44" className={`w-10 h-10 ${className}`} fill="none">
      <ellipse cx="22" cy="36" rx="18" ry="6" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M4 20 Q4 36 22 36 Q40 36 40 20 L38 16 Q22 12 6 16 Z" fill="#A3E635" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="22" cy="20" rx="16" ry="5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M10 18 Q22 16 34 18" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M14 22 Q22 20 30 22" stroke="#16A34A" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M22 12 Q26 6 28 2" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M22 12 Q18 6 16 2" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
    </svg>
  );
}

export function DoodleCroissant({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 52 36" className={`w-11 h-8 ${className}`} fill="none">
      <path d="M8 28 Q4 20 10 12 Q16 6 24 8 Q32 10 36 18 Q40 6 46 8 Q52 12 50 20 Q48 28 40 30 Q32 26 26 28 Q18 32 8 28 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 14 Q16 8 24 10 Q28 12 30 18" stroke="#FACC15" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M38 10 Q44 12 46 18 Q46 24 42 28" stroke="#FACC15" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M20 22 Q26 20 32 22 Q30 26 26 28 Q22 26 20 22 Z" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M12 26 Q16 20 22 22" stroke="#D97706" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export function DoodleDonut({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 44" className={`w-10 h-10 ${className}`} fill="none">
      <circle cx="22" cy="22" r="18" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M8 18 Q12 8 22 8 Q32 8 36 18 Q36 12 22 10 Q10 12 8 18 Z" fill="#FACC15" stroke="none"/>
      <path d="M6 22 Q6 16 10 12 Q14 8 22 8 Q30 8 34 12 Q38 16 38 22" fill="#FDA4AF" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="22" cy="22" r="8" fill="#FDF6EE" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="14" cy="16" r="1.5" fill="#F87171"/>
      <circle cx="22" cy="12" r="1.5" fill="#FACC15"/>
      <circle cx="30" cy="15" r="1.5" fill="#A78BFA"/>
      <circle cx="33" cy="22" r="1.5" fill="#34D399"/>
      <circle cx="10" cy="22" r="1.5" fill="#60A5FA"/>
    </svg>
  );
}

export function DoodleStrawberry({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 44" className={`w-8 h-10 ${className}`} fill="none">
      <path d="M10 8 Q6 4 8 2 Q12 0 14 4" stroke="#4ADE80" strokeWidth="1.5" fill="#4ADE80" strokeLinecap="round"/>
      <path d="M18 8 Q18 2 20 0 Q24 2 22 6" stroke="#4ADE80" strokeWidth="1.5" fill="#4ADE80" strokeLinecap="round"/>
      <path d="M26 10 Q30 4 32 6 Q34 10 30 12" stroke="#4ADE80" strokeWidth="1.5" fill="#4ADE80" strokeLinecap="round"/>
      <path d="M6 16 Q4 10 10 8 Q18 6 26 10 Q32 12 32 18 Q30 32 18 40 Q6 32 6 16 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 14 Q18 10 30 14" stroke="#FCA5A5" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7"/>
      <circle cx="13" cy="20" r="1.5" fill="#FEE2E2"/>
      <circle cx="22" cy="17" r="1.5" fill="#FEE2E2"/>
      <circle cx="25" cy="26" r="1.5" fill="#FEE2E2"/>
      <circle cx="13" cy="29" r="1.5" fill="#FEE2E2"/>
      <circle cx="19" cy="34" r="1.5" fill="#FEE2E2"/>
    </svg>
  );
}

export function DoodleLemon({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 40" className={`w-10 h-9 ${className}`} fill="none">
      <path d="M6 20 Q6 6 18 4 Q26 2 32 6 Q40 10 40 20 Q40 32 28 38 Q20 40 14 36 Q6 30 6 20 Z" fill="#FEF08A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M30 6 Q36 8 38 14" stroke="#FDE047" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M22 8 Q22 18 22 30" stroke="#FDE047" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M10 18 Q22 16 36 20" stroke="#FDE047" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M12 26 Q22 24 34 26" stroke="#FDE047" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"/>
      <path d="M8 14 Q12 10 16 10" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

export function DoodleRamen({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 52 48" className={`w-11 h-10 ${className}`} fill="none">
      <path d="M14 6 Q16 2 18 6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M24 4 Q26 0 28 4" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M34 6 Q36 2 38 6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M6 26 L8 42 Q26 48 44 42 L46 26 Z" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 24 Q26 18 46 24 Q46 28 26 28 Q6 28 6 24 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M12 30 Q22 28 30 32" stroke="#F97316" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M14 36 Q24 34 34 36" stroke="#F97316" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="34" cy="32" r="4" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="34" cy="32" r="2" fill="#DC2626"/>
    </svg>
  );
}

export function DoodleJuiceBox({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 52" className={`w-8 h-11 ${className}`} fill="none">
      <line x1="18" y1="4" x2="18" y2="12" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="18" cy="4" r="2" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="8" y="12" width="20" height="34" rx="3" fill="#A3E635" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="8" y="10" width="20" height="6" rx="2" fill="#84CC16" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="11" y="20" width="14" height="18" rx="2" fill="white" opacity="0.3"/>
      <circle cx="18" cy="26" r="5" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M15 26 Q18 24 21 26" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <path d="M15 28 Q18 30 21 28" stroke="#2D2D2D" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <line x1="12" y1="34" x2="24" y2="34" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
      <line x1="12" y1="37" x2="22" y2="37" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
    </svg>
  );
}

// ── 일상 소품 ──────────────────────────────────────────────
export function DoodleCamera({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 52 40" className={`w-11 h-9 ${className}`} fill="none">
      <path d="M18 8 L20 4 L32 4 L34 8" stroke="#2D2D2D" strokeWidth="1.5" fill="#94A3B8" strokeLinejoin="round"/>
      <rect x="4" y="8" width="44" height="28" rx="6" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="26" cy="22" r="10" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="26" cy="22" r="7" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="26" cy="22" r="4" fill="#1D4ED8" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="24" cy="20" r="1.5" fill="white" opacity="0.7"/>
      <circle cx="40" cy="14" r="3" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="8" y="12" width="8" height="5" rx="2" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleGiftBox({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 50" className={`w-10 h-11 ${className}`} fill="none">
      <rect x="6" y="22" width="36" height="24" rx="3" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="4" y="16" width="40" height="10" rx="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="24" y1="16" x2="24" y2="46" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="4" y1="22" x2="44" y2="22" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M18 16 Q16 8 20 6 Q24 4 24 10 Q24 4 28 6 Q32 8 30 16" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M18 16 Q22 14 24 16 Q26 14 30 16" stroke="#2D2D2D" strokeWidth="1" fill="none"/>
      <circle cx="24" cy="16" r="3" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleDiary({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 42 50" className={`w-9 h-11 ${className}`} fill="none">
      <rect x="8" y="4" width="30" height="42" rx="4" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="6" y="4" width="6" height="42" rx="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="14" y1="14" x2="32" y2="14" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <line x1="14" y1="20" x2="32" y2="20" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <line x1="14" y1="26" x2="28" y2="26" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M18 34 Q22 30 26 34 Q22 38 18 34 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="9" cy="16" r="2" fill="#FDF6EE" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="9" cy="26" r="2" fill="#FDF6EE" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="9" cy="36" r="2" fill="#FDF6EE" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

export function DoodlePencil({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 14 54" className={`w-4 h-11 ${className}`} fill="none">
      <rect x="2" y="4" width="10" height="38" rx="2" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="2" y="4" width="10" height="8" rx="2" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="2" y="38" width="10" height="6" rx="1" fill="#E8D5C4" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M2 44 L7 52 L12 44 Z" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="7" y1="49" x2="7" y2="52" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="6" y1="10" x2="8" y2="10" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
    </svg>
  );
}

export function DoodleLipstick({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 28 52" className={`w-7 h-11 ${className}`} fill="none">
      <rect x="8" y="32" width="12" height="16" rx="3" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="6" y="26" width="16" height="10" rx="3" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="8" y="14" width="12" height="16" rx="2" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M8 14 L10 6 Q14 4 18 6 L20 14 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 14 Q14 12 19 14" stroke="#FCA5A5" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M10 20 Q14 18 18 20" stroke="#FCA5A5" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function DoodlePerfume({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 52" className={`w-9 h-11 ${className}`} fill="none">
      <rect x="16" y="4" width="8" height="6" rx="2" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="12" y="8" width="16" height="5" rx="2.5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M10 14 Q8 16 8 20 L8 44 Q8 48 20 48 Q32 48 32 44 L32 20 Q32 16 30 14 Z" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 14 Q20 10 30 14" stroke="#C4B5FD" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M10 22 Q20 20 30 22" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M12 30 Q20 28 28 30" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"/>
      <path d="M26 10 Q30 6 32 4" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M22 8 Q24 4 26 2" stroke="#C4B5FD" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
    </svg>
  );
}

export function DoodleRing({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 44" className={`w-10 h-10 ${className}`} fill="none">
      <circle cx="22" cy="28" r="14" stroke="#2D2D2D" strokeWidth="3" fill="none"/>
      <circle cx="22" cy="28" r="14" stroke="#E2E8F0" strokeWidth="6" fill="none" opacity="0.6"/>
      <circle cx="22" cy="28" r="14" stroke="#CBD5E1" strokeWidth="3" fill="none"/>
      <path d="M14 18 Q18 10 22 8 Q26 10 30 18" fill="#BFDBFE" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="22" cy="8" r="5" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="22" cy="8" r="3" fill="#DBEAFE"/>
      <path d="M20 6 Q22 4 24 6" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.8"/>
    </svg>
  );
}

export function DoodleNailPolish({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 28 52" className={`w-7 h-11 ${className}`} fill="none">
      <rect x="10" y="4" width="8" height="10" rx="2" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="8" y="12" width="12" height="4" rx="2" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="6" y="14" width="16" height="32" rx="4" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M6 22 Q14 20 22 22" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <rect x="8" y="26" width="12" height="14" rx="2" fill="#F472B6" stroke="none" opacity="0.4"/>
      <path d="M8 18 Q14 16 20 18" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function DoodlePolaroid({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 52" className={`w-10 h-11 ${className}`} fill="none">
      <rect x="4" y="4" width="36" height="44" rx="3" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="8" y="8" width="28" height="26" rx="2" fill="#BFDBFE" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="22" cy="21" r="7" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M8 28 Q14 22 20 26 Q24 28 28 22 Q32 18 36 22 L36 34 L8 34 Z" fill="#86EFAC" stroke="none" opacity="0.8"/>
      <circle cx="22" cy="20" r="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M14 40 Q22 38 30 40" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3"/>
    </svg>
  );
}

// ── 감성 / 빈티지 ──────────────────────────────────────────────
export function DoodleSnowflake({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 44" className={`w-10 h-10 ${className}`} fill="none">
      {[0, 60, 120].map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        const x2 = 22 + Math.round(Math.cos(r) * 18);
        const y2 = 22 + Math.round(Math.sin(r) * 18);
        const x3 = 22 - Math.round(Math.cos(r) * 18);
        const y3 = 22 - Math.round(Math.sin(r) * 18);
        return (
          <g key={i}>
            <line x1="22" y1="22" x2={x2} y2={y2} stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="22" y1="22" x2={x3} y2={y3} stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round"/>
          </g>
        );
      })}
      {[0, 30, 60, 90, 120, 150].map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        const mx = 22 + Math.round(Math.cos(r) * 10);
        const my = 22 + Math.round(Math.sin(r) * 10);
        const pr = r + Math.PI / 2;
        return (
          <g key={i}>
            <line x1={mx} y1={my} x2={mx + Math.round(Math.cos(pr) * 4)} y2={my + Math.round(Math.sin(pr) * 4)} stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1={mx} y1={my} x2={mx - Math.round(Math.cos(pr) * 4)} y2={my - Math.round(Math.sin(pr) * 4)} stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        );
      })}
      <circle cx="22" cy="22" r="3" fill="#38BDF8" stroke="#2D2D2D" strokeWidth="1"/>
      {[0,60,120,180,240,300].map((deg,i) => {
        const r=(deg*Math.PI)/180;
        return <circle key={i} cx={22+Math.round(Math.cos(r)*18)} cy={22+Math.round(Math.sin(r)*18)} r="2" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="0.8"/>;
      })}
    </svg>
  );
}

export function DoodleMapleLeaf({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 50" className={`w-10 h-11 ${className}`} fill="none">
      <path d="M22 4 Q28 10 26 14 Q32 8 38 12 Q36 18 30 18 Q34 22 32 26 Q28 22 24 24 Q26 30 22 34 Q18 30 20 24 Q16 22 12 26 Q10 22 14 18 Q8 18 6 12 Q12 8 18 14 Q16 10 22 4 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 6 Q22 8 24 6" stroke="#FED7AA" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M22 34 Q21 42 22 48" stroke="#92400E" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleFeather({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 54" className={`w-7 h-11 ${className}`} fill="none">
      <path d="M16 4 Q24 10 26 20 Q28 30 22 38 Q18 44 16 50" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M16 4 Q8 10 6 20 Q4 30 10 38 Q14 44 16 50" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M26 20 Q18 22 16 50" fill="#EDE9FE" stroke="none"/>
      <path d="M6 20 Q14 22 16 50" fill="#C4B5FD" stroke="none" opacity="0.5"/>
      {[8,14,20,26,32,38].map((y,i)=> (
        <path key={i} d={`M16 ${y} Q${i%2===0?20:12} ${y+2} ${i%2===0?24:8} ${y}`} stroke="#A78BFA" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.6"/>
      ))}
      <line x1="16" y1="4" x2="16" y2="50" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export function DoodleYarn({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 44" className={`w-10 h-10 ${className}`} fill="none">
      <circle cx="22" cy="22" r="18" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M8 14 Q22 10 36 14" stroke="#F472B6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M6 22 Q22 18 38 22" stroke="#F472B6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M8 30 Q22 26 36 30" stroke="#F472B6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M14 6 Q18 22 14 38" stroke="#EC4899" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M22 5 Q26 22 22 39" stroke="#EC4899" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M30 6 Q34 22 30 38" stroke="#EC4899" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M36 8 Q44 4 46 10" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M36 8 Q38 14 36 18" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleVinylRecord({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 44" className={`w-10 h-10 ${className}`} fill="none">
      <circle cx="22" cy="22" r="19" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="22" cy="22" r="14" fill="#111827" stroke="#374151" strokeWidth="0.8"/>
      <circle cx="22" cy="22" r="9" fill="#1F2937" stroke="#374151" strokeWidth="0.8"/>
      <circle cx="22" cy="22" r="5" fill="#374151" stroke="#4B5563" strokeWidth="1"/>
      <circle cx="22" cy="22" r="2.5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M8 12 Q14 8 20 10" stroke="#4B5563" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M6 18 Q8 14 12 16" stroke="#4B5563" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M34 10 Q38 14 38 20" stroke="#4B5563" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function DoodleCassette({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 54 38" className={`w-12 h-8 ${className}`} fill="none">
      <rect x="3" y="4" width="48" height="30" rx="4" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="3" y="4" width="48" height="30" rx="4" fill="none" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="16" cy="22" r="7" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="38" cy="22" r="7" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="16" cy="22" r="3.5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="38" cy="22" r="3.5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M16 15 Q27 12 38 15" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <rect x="16" y="26" width="22" height="5" rx="1" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="0.8"/>
      <line x1="22" y1="26" x2="22" y2="31" stroke="#2D2D2D" strokeWidth="0.8"/>
      <line x1="27" y1="26" x2="27" y2="31" stroke="#2D2D2D" strokeWidth="0.8"/>
      <line x1="32" y1="26" x2="32" y2="31" stroke="#2D2D2D" strokeWidth="0.8"/>
      <rect x="7" y="6" width="8" height="5" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8"/>
      <rect x="39" y="6" width="8" height="5" rx="1" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

// ── 패션 ──────────────────────────────────────────────
export function DoodleSunglasses({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 54 28" className={`w-12 h-7 ${className}`} fill="none">
      <line x1="2" y1="12" x2="10" y2="14" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <line x1="44" y1="14" x2="52" y2="12" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <rect x="8" y="8" width="16" height="14" rx="5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="30" y="8" width="16" height="14" rx="5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M24 14 Q27 12 30 14" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M12 12 Q16 10 20 12" stroke="#4B5563" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M34 12 Q38 10 42 12" stroke="#4B5563" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export function DoodleBucketHat({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 52 36" className={`w-11 h-8 ${className}`} fill="none">
      <ellipse cx="26" cy="30" rx="22" ry="5" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M8 30 Q10 14 18 10 Q26 8 34 10 Q42 14 44 30 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 30 Q12 20 20 16 Q26 14 32 16 Q40 20 42 30" fill="#FDE68A" stroke="none" opacity="0.5"/>
      <path d="M14 22 Q26 20 38 22" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M12 14 Q14 10 16 12" stroke="#D97706" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export function DoodleSneaker({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 56 36" className={`w-12 h-8 ${className}`} fill="none">
      <path d="M4 26 Q6 16 14 12 Q22 8 28 10 L44 14 Q50 16 52 22 Q54 26 50 28 L6 28 Q4 28 4 26 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M4 26 Q6 24 50 28 L50 32 Q30 34 6 32 Q4 30 4 26 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 12 Q16 8 20 6 Q26 4 30 8 L44 14" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M22 14 Q28 12 36 16" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <circle cx="18" cy="20" r="2" fill="#2D2D2D" opacity="0.3"/>
      <circle cx="24" cy="18" r="2" fill="#2D2D2D" opacity="0.3"/>
      <path d="M18 22 Q20 24 24 22 Q28 24 32 22" stroke="#CBD5E1" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleHandbag({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 50" className={`w-10 h-11 ${className}`} fill="none">
      <path d="M16 16 Q16 8 24 8 Q32 8 32 16" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <rect x="6" y="16" width="36" height="28" rx="6" fill="#FDA4AF" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="6" y="24" width="36" height="4" fill="#F43F5E" stroke="none" opacity="0.4"/>
      <rect x="18" y="26" width="12" height="8" rx="3" fill="#E11D48" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="24" cy="30" r="2" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M10 20 Q24 18 38 20" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function DoodleHeadphones({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 44" className={`w-10 h-10 ${className}`} fill="none">
      <path d="M10 22 Q10 8 24 8 Q38 8 38 22" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <rect x="4" y="20" width="12" height="16" rx="5" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="32" y="20" width="12" height="16" rx="5" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="6" y="22" width="8" height="12" rx="4" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="34" y="22" width="8" height="12" rx="4" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M6 24 Q10 22 14 24" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M34 24 Q38 22 42 24" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

// ── 신비 / 마법 ──────────────────────────────────────────────
export function DoodleCrystalBall({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 52" className={`w-10 h-11 ${className}`} fill="none">
      <rect x="14" y="42" width="20" height="6" rx="3" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="10" y="46" width="28" height="5" rx="2.5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="20" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="16" fill="#EDE9FE" stroke="none"/>
      <circle cx="18" cy="18" r="6" fill="#C4B5FD" opacity="0.5"/>
      <circle cx="30" cy="28" r="4" fill="#A78BFA" opacity="0.3"/>
      <path d="M14 16 Q16 12 20 14" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M16 20 Q17 18 19 20" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M28 16 L29.5 12 L31 16 L35 16 L32 19 L33 23 L29.5 21 L26 23 L27 19 L24 16 Z" fill="#FACC15" opacity="0.6" stroke="#D97706" strokeWidth="0.6"/>
    </svg>
  );
}

export function DoodleMagicWand({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={`w-10 h-10 ${className}`} fill="none">
      <line x1="38" y1="10" x2="10" y2="38" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round"/>
      <line x1="38" y1="10" x2="10" y2="38" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="6" y="34" width="8" height="8" rx="2" transform="rotate(-45 10 38)" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M38 2 L39.5 7 L44 7 L40.5 10 L42 15 L38 12 L34 15 L35.5 10 L32 7 L36.5 7 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M20 16 L21 14 L22 16 L24 16 L22.5 17.5 L23 19.5 L21 18 L19 19.5 L19.5 17.5 L18 16 Z" fill="#FACC15" opacity="0.8"/>
      <path d="M30 26 L31 24 L32 26 L34 26 L32.5 27.5 L33 29.5 L31 28 L29 29.5 L29.5 27.5 L28 26 Z" fill="#FACC15" opacity="0.6"/>
      <circle cx="14" cy="12" r="2" fill="#F9A8D4" opacity="0.8"/>
      <circle cx="36" cy="34" r="1.5" fill="#86EFAC" opacity="0.7"/>
    </svg>
  );
}

export function DoodleTarot({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 34 52" className={`w-7 h-11 ${className}`} fill="none">
      <rect x="3" y="3" width="28" height="46" rx="4" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="5" y="5" width="24" height="42" rx="3" fill="none" stroke="#FACC15" strokeWidth="0.8" strokeDasharray="2 2"/>
      <circle cx="17" cy="18" r="8" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M17 11 L18.5 15.5 L23 15.5 L19.5 18.5 L21 23 L17 20 L13 23 L14.5 18.5 L11 15.5 L15.5 15.5 Z" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="0.8"/>
      <line x1="7" y1="32" x2="27" y2="32" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
      <line x1="7" y1="36" x2="22" y2="36" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
      <line x1="7" y1="40" x2="18" y2="40" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.4"/>
    </svg>
  );
}

export function DoodleFortuneCookie({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 40" className={`w-10 h-9 ${className}`} fill="none">
      <path d="M22 8 Q34 6 38 16 Q42 26 36 32 Q28 36 22 30 Q16 36 8 32 Q2 26 6 16 Q10 6 22 8 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 22 Q22 26 36 22" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M10 18 Q22 14 34 18" stroke="#FACC15" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      <rect x="14" y="22" width="16" height="4" rx="1" fill="white" stroke="#E5C900" strokeWidth="0.8"/>
      <line x1="16" y1="24" x2="28" y2="24" stroke="#94A3B8" strokeWidth="0.8"/>
    </svg>
  );
}

// ── 겨울 / 크리스마스 ──────────────────────────────────────────────
export function DoodleChristmasTree({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 46 58" className={`w-10 h-12 ${className}`} fill="none">
      <path d="M23 4 L24.5 8 L29 8 L25.5 11 L27 15.5 L23 13 L19 15.5 L20.5 11 L17 8 L21.5 8 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M23 14 L14 28 L32 28 Z" fill="#16A34A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M23 22 L10 40 L36 40 Z" fill="#16A34A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M23 32 L6 52 L40 52 Z" fill="#16A34A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="19" y="52" width="8" height="5" rx="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="17" cy="34" r="2.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="29" cy="38" r="2.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="23" cy="45" r="2.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="14" cy="46" r="2" fill="#C084FC" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="32" cy="44" r="2" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="20" cy="26" r="2" fill="#F97316" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleSnowman({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 58" className={`w-9 h-12 ${className}`} fill="none">
      <rect x="15" y="8" width="14" height="10" rx="1" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="11" y="18" width="22" height="3.5" rx="1.5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="15" y="14" width="14" height="3" fill="#F87171"/>
      <circle cx="22" cy="28" r="10" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="18" cy="25" r="2" fill="#2D2D2D"/>
      <circle cx="26" cy="25" r="2" fill="#2D2D2D"/>
      <circle cx="18.8" cy="24.2" r="0.8" fill="white"/>
      <circle cx="26.8" cy="24.2" r="0.8" fill="white"/>
      <path d="M22 29 L27 31 L22 32 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M18 33 Q22 36 26 33" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M12 38 Q22 34 32 38 Q22 40 12 38 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M26 38 Q28 42 26 46" stroke="#F87171" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="22" cy="48" r="10" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="22" cy="44" r="1.5" fill="#2D2D2D"/>
      <circle cx="22" cy="48" r="1.5" fill="#2D2D2D"/>
      <circle cx="22" cy="52" r="1.5" fill="#2D2D2D"/>
    </svg>
  );
}

export function DoodleJingleBell({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 48" className={`w-9 h-10 ${className}`} fill="none">
      <path d="M14 8 Q20 6 26 8 Q22 12 20 12 Q18 12 14 8 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M26 8 Q30 8 32 10 Q30 14 26 12 Q24 10 26 8 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M20 6 Q24 4 26 8" stroke="#F87171" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M6 36 Q6 16 20 14 Q34 16 34 36 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M4 36 Q20 32 36 36 Q32 40 20 40 Q8 40 4 36 Z" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="20" y1="14" x2="20" y2="36" stroke="#D97706" strokeWidth="1" opacity="0.45"/>
      <path d="M11 22 Q13 20 12 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.65"/>
      <circle cx="20" cy="40" r="3" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.2"/>
    </svg>
  );
}

export function DoodleReindeer({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 52 50" className={`w-11 h-10 ${className}`} fill="none">
      <path d="M16 16 Q12 8 8 4 Q12 4 14 8 Q16 4 18 2 Q20 6 18 10 Q22 6 26 8 Q24 12 20 12 Q18 14 16 16 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M36 16 Q40 8 44 4 Q40 4 38 8 Q36 4 34 2 Q32 6 34 10 Q30 6 26 8 Q28 12 32 12 Q34 14 36 16 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <ellipse cx="14" cy="18" rx="4" ry="5" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="38" cy="18" rx="4" ry="5" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="14" cy="18" rx="2.5" ry="3.5" fill="#FCA5A5"/>
      <ellipse cx="38" cy="18" rx="2.5" ry="3.5" fill="#FCA5A5"/>
      <ellipse cx="26" cy="30" rx="18" ry="16" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="20" cy="26" r="3" fill="#2D2D2D"/>
      <circle cx="32" cy="26" r="3" fill="#2D2D2D"/>
      <circle cx="21" cy="25" r="1.2" fill="white"/>
      <circle cx="33" cy="25" r="1.2" fill="white"/>
      <circle cx="26" cy="34" r="5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="24.5" cy="32.5" r="1.5" fill="white" opacity="0.55"/>
    </svg>
  );
}

export function DoodleStocking({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 42 54" className={`w-9 h-11 ${className}`} fill="none">
      <path d="M12 14 L12 40 Q12 50 22 50 Q34 50 34 43 L30 40 L26 40 L26 14 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="10" y="6" width="18" height="10" rx="4" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="16" cy="11" r="1.5" fill="#F87171"/>
      <circle cx="22" cy="11" r="1.5" fill="#60A5FA"/>
      <line x1="12" y1="22" x2="26" y2="22" stroke="white" strokeWidth="1.8" opacity="0.4"/>
      <line x1="12" y1="30" x2="26" y2="30" stroke="white" strokeWidth="1.8" opacity="0.4"/>
    </svg>
  );
}

// ── 동물 ──────────────────────────────────────────────
export function DoodleFox({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 52" className={`w-10 h-11 ${className}`} fill="none">
      <path d="M14 22 L8 4 L20 16 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M34 22 L40 4 L28 16 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 22 L10 10 L18 16 Z" fill="#FCA5A5" stroke="none"/>
      <path d="M34 22 L38 10 L30 16 Z" fill="#FCA5A5" stroke="none"/>
      <circle cx="24" cy="26" r="16" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="24" cy="30" rx="10" ry="8" fill="#FEF3C7"/>
      <circle cx="18" cy="23" r="3" fill="#2D2D2D"/>
      <circle cx="30" cy="23" r="3" fill="#2D2D2D"/>
      <circle cx="19" cy="22" r="1.2" fill="white"/>
      <circle cx="31" cy="22" r="1.2" fill="white"/>
      <ellipse cx="24" cy="29" rx="2" ry="1.5" fill="#2D2D2D"/>
      <path d="M21 31 Q24 33 27 31" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <ellipse cx="14" cy="29" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6"/>
      <ellipse cx="34" cy="29" rx="4" ry="2.5" fill="#FCA5A5" opacity="0.6"/>
      <path d="M10 42 Q6 48 10 50 Q18 54 24 46 Q30 54 38 50 Q42 48 38 42 Q32 38 24 40 Q16 38 10 42 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M32 44 Q38 46 36 50" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export function DoodleRabbit({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 56" className={`w-9 h-12 ${className}`} fill="none">
      <path d="M13 24 Q10 4 14 2 Q17 0 19 4 Q21 8 19 24 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M31 24 Q28 4 32 2 Q35 0 37 4 Q39 8 37 24 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 24 Q12 10 15 5 Q16 3 17 6 Q18 10 16 24 Z" fill="#F9A8D4" stroke="none"/>
      <path d="M30 24 Q28 10 31 5 Q32 3 33 6 Q34 10 32 24 Z" fill="#F9A8D4" stroke="none"/>
      <circle cx="22" cy="32" r="14" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="17" cy="30" r="3" fill="#F9A8D4"/>
      <circle cx="27" cy="30" r="3" fill="#F9A8D4"/>
      <ellipse cx="22" cy="35" rx="2" ry="1.5" fill="#F9A8D4"/>
      <path d="M20 36.5 Q22 38 24 36.5" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <line x1="11" y1="34" x2="17" y2="35" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="11" y1="36" x2="17" y2="36" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="27" y1="35" x2="33" y2="34" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="27" y1="36" x2="33" y2="36" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <ellipse cx="22" cy="50" rx="10" ry="5" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
    </svg>
  );
}

export function DoodlePenguin({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 54" className={`w-9 h-11 ${className}`} fill="none">
      <ellipse cx="20" cy="36" rx="14" ry="16" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="39" rx="9" ry="12" fill="white"/>
      <path d="M6 28 Q2 36 4 44 Q6 46 8 42 L8 26 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M34 28 Q38 36 36 44 Q34 46 32 42 L32 26 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="18" r="12" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="20" rx="7" ry="8" fill="white"/>
      <circle cx="16.5" cy="16" r="2.5" fill="#2D2D2D"/>
      <circle cx="23.5" cy="16" r="2.5" fill="#2D2D2D"/>
      <circle cx="17.2" cy="15.2" r="1" fill="white"/>
      <circle cx="24.2" cy="15.2" r="1" fill="white"/>
      <path d="M17 22 L20 26 L23 22 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="14" cy="52" rx="5" ry="2.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="26" cy="52" rx="5" ry="2.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleHamster({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 50 48" className={`w-11 h-10 ${className}`} fill="none">
      <circle cx="12" cy="14" r="6" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="38" cy="14" r="6" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="12" cy="14" r="3.5" fill="#FCA5A5"/>
      <circle cx="38" cy="14" r="3.5" fill="#FCA5A5"/>
      <ellipse cx="25" cy="28" rx="21" ry="17" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="9" cy="32" rx="7" ry="5" fill="#FED7AA" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="41" cy="32" rx="7" ry="5" fill="#FED7AA" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="19" cy="24" r="3" fill="#2D2D2D"/>
      <circle cx="31" cy="24" r="3" fill="#2D2D2D"/>
      <circle cx="20" cy="23" r="1.2" fill="white"/>
      <circle cx="32" cy="23" r="1.2" fill="white"/>
      <ellipse cx="25" cy="30" rx="2" ry="1.5" fill="#F9A8D4"/>
      <path d="M23 31.5 Q25 33 27 31.5" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <line x1="14" y1="30" x2="18" y2="31" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="32" y1="31" x2="36" y2="30" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

// ── 봄 ──────────────────────────────────────────────
export function DoodleSprout({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 46" className={`w-8 h-10 ${className}`} fill="none">
      <ellipse cx="18" cy="42" rx="14" ry="4" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M18 42 Q18 34 18 26" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M18 34 Q10 30 8 22 Q14 20 18 30 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M18 30 Q26 26 28 18 Q22 16 18 26 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="18" cy="22" r="5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="18" cy="22" r="2.5" fill="#F472B6"/>
      <path d="M16 20 Q18 19 19 21" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.65"/>
    </svg>
  );
}

export function DoodleChick({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 46" className={`w-9 h-10 ${className}`} fill="none">
      <ellipse cx="10" cy="30" rx="6" ry="9" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(-20 10 30)"/>
      <ellipse cx="34" cy="30" rx="6" ry="9" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(20 34 30)"/>
      <ellipse cx="22" cy="32" rx="13" ry="11" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="22" cy="18" r="11" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M18 8 Q20 4 22 8 Q24 4 26 8 Q24 10 22 9 Q20 10 18 8 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <circle cx="17" cy="15" r="2.5" fill="#2D2D2D"/>
      <circle cx="27" cy="15" r="2.5" fill="#2D2D2D"/>
      <circle cx="17.8" cy="14.2" r="1" fill="white"/>
      <circle cx="27.8" cy="14.2" r="1" fill="white"/>
      <path d="M19 20 L22 23 L25 20 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M16 43 L18 40 M18 40 L14 41 M18 40 L16 44" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 43 L26 40 M26 40 L30 41 M26 40 L28 44" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleLadybug({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 42" className={`w-9 h-9 ${className}`} fill="none">
      <path d="M16 8 Q12 4 10 2" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M24 8 Q28 4 30 2" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <circle cx="10" cy="2" r="1.5" fill="#2D2D2D"/>
      <circle cx="30" cy="2" r="1.5" fill="#2D2D2D"/>
      <circle cx="20" cy="10" r="8" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="16" cy="8" r="2" fill="white" opacity="0.45"/>
      <circle cx="24" cy="8" r="2" fill="white" opacity="0.45"/>
      <path d="M6 22 Q6 38 20 40 Q34 38 34 22 Q34 14 20 14 Q6 14 6 22 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="20" y1="14" x2="20" y2="40" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="13" cy="22" r="3" fill="#2D2D2D"/>
      <circle cx="27" cy="22" r="3" fill="#2D2D2D"/>
      <circle cx="12" cy="31" r="2.5" fill="#2D2D2D"/>
      <circle cx="28" cy="31" r="2.5" fill="#2D2D2D"/>
      <circle cx="20" cy="36" r="2" fill="#2D2D2D"/>
    </svg>
  );
}

export function DoodleRaindrop({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 44" className={`w-7 h-10 ${className}`} fill="none">
      <path d="M16 4 Q24 14 26 24 Q26 36 16 40 Q6 36 6 24 Q6 14 16 4 Z" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 24 Q16 18 22 24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.65"/>
      <path d="M11 30 Q16 26 21 30" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.45"/>
      <circle cx="22" cy="16" r="1.5" fill="white" opacity="0.75"/>
      <circle cx="10" cy="20" r="1" fill="white" opacity="0.55"/>
    </svg>
  );
}

// ── 여름 ──────────────────────────────────────────────
export function DoodleWatermelon({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 46 40" className={`w-10 h-9 ${className}`} fill="none">
      <path d="M4 22 Q4 6 23 4 Q42 6 42 22 L4 22 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 22 Q6 10 23 8 Q40 10 40 22 L6 22 Z" fill="#DCFCE7"/>
      <path d="M8 22 Q8 12 23 10 Q38 12 38 22 L8 22 Z" fill="#F87171"/>
      <line x1="4" y1="22" x2="42" y2="22" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="14" cy="18" rx="1.5" ry="2" fill="#2D2D2D" transform="rotate(-15 14 18)"/>
      <ellipse cx="23" cy="15" rx="1.5" ry="2" fill="#2D2D2D"/>
      <ellipse cx="32" cy="18" rx="1.5" ry="2" fill="#2D2D2D" transform="rotate(15 32 18)"/>
      <ellipse cx="18" cy="21" rx="1" ry="1.5" fill="#2D2D2D" transform="rotate(-10 18 21)"/>
      <ellipse cx="28" cy="21" rx="1" ry="1.5" fill="#2D2D2D" transform="rotate(10 28 21)"/>
      <path d="M8 16 Q18 12 28 14" stroke="#86EFAC" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export function DoodleSeashell({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 42 46" className={`w-9 h-10 ${className}`} fill="none">
      <path d="M21 4 Q36 8 38 22 Q40 36 26 42 Q14 46 8 36 Q2 24 8 14 Q14 4 21 4 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M21 8 Q32 12 32 22 Q32 32 24 36 Q16 38 12 30 Q8 22 14 14 Q18 8 21 8 Z" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M21 12 Q28 16 28 22 Q28 28 22 30 Q16 30 14 24 Q12 18 17 14 Z" fill="#FDE68A" stroke="none"/>
      <path d="M21 16 Q26 18 24 22 Q22 26 19 24 Q16 22 18 18 Z" fill="#FCD34D" stroke="none"/>
      <circle cx="21" cy="22" r="3" fill="#F59E0B"/>
      <path d="M21 4 Q18 2 19 0" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M30 12 Q32 16 32 20" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.55"/>
    </svg>
  );
}

export function DoodleStarfish({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={`w-10 h-10 ${className}`} fill="none">
      <ellipse cx="24" cy="15" rx="5" ry="10" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="24" cy="15" rx="5" ry="10" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(72 24 24)"/>
      <ellipse cx="24" cy="15" rx="5" ry="10" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(144 24 24)"/>
      <ellipse cx="24" cy="15" rx="5" ry="10" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(216 24 24)"/>
      <ellipse cx="24" cy="15" rx="5" ry="10" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(288 24 24)"/>
      <circle cx="24" cy="24" r="8" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="21.5" cy="21.5" r="2.5" fill="#FED7AA" opacity="0.55"/>
    </svg>
  );
}

export function DoodlePalmTree({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 56" className={`w-10 h-12 ${className}`} fill="none">
      <ellipse cx="24" cy="54" rx="14" ry="3.5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M22 52 Q20 42 18 32 Q18 26 24 22 Q28 24 28 32 Q28 42 26 52 Z" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M24 22 Q16 16 8 20 Q10 14 20 16 Q23 16 24 22 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 22 Q28 12 38 14 Q36 20 26 18 Q24 20 24 22 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 22 Q18 10 16 4 Q22 8 24 18 Q24 20 24 22 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 22 Q34 8 40 4 Q38 12 28 18 Q24 20 24 22 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="20" cy="24" r="3.5" fill="#78350F" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="26" cy="26" r="3" fill="#92400E" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleFlipFlops({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 52 38" className={`w-11 h-8 ${className}`} fill="none">
      <path d="M4 18 Q4 10 14 8 Q24 8 26 16 Q26 26 16 28 Q6 26 4 18 Z" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M15 10 Q15 15 15 18 Q11 21 8 24" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M15 18 Q19 21 22 24" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M26 18 Q28 10 38 8 Q48 10 48 18 Q48 28 38 30 Q28 26 26 18 Z" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M37 10 Q37 15 37 18 Q33 21 30 24" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M37 18 Q41 21 44 24" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

// ── 가을 ──────────────────────────────────────────────
export function DoodleAcorn({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 34 46" className={`w-8 h-10 ${className}`} fill="none">
      <path d="M17 8 Q19 4 22 2" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M4 16 Q4 8 17 8 Q30 8 30 16 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="2" y="14" width="30" height="5" rx="2.5" fill="#78350F" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M8 14 L8 10" stroke="#7C2D12" strokeWidth="0.8" opacity="0.4"/>
      <path d="M13 14 L13 9" stroke="#7C2D12" strokeWidth="0.8" opacity="0.4"/>
      <path d="M17 14 L17 8" stroke="#7C2D12" strokeWidth="0.8" opacity="0.4"/>
      <path d="M22 14 L22 9" stroke="#7C2D12" strokeWidth="0.8" opacity="0.4"/>
      <path d="M26 14 L26 10" stroke="#7C2D12" strokeWidth="0.8" opacity="0.4"/>
      <path d="M4 18 Q4 36 17 42 Q30 36 30 18 Z" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 26 Q17 28 26 26" stroke="#B45309" strokeWidth="1" fill="none" opacity="0.45"/>
      <path d="M7 32 Q17 34 27 32" stroke="#B45309" strokeWidth="1" fill="none" opacity="0.45"/>
      <path d="M8 20 Q12 18 10 24" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.45"/>
    </svg>
  );
}

export function DoodlePumpkin({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 46 50" className={`w-10 h-11 ${className}`} fill="none">
      <path d="M23 8 Q26 3 30 5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M23 8 Q18 3 14 6 Q14 10 20 10 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M23 8 Q28 6 30 10 Q26 12 24 10" stroke="#4ADE80" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <ellipse cx="8" cy="29" rx="5" ry="10" fill="#EA580C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="38" cy="29" rx="5" ry="10" fill="#EA580C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="14" cy="29" rx="9" ry="14" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="32" cy="29" rx="9" ry="14" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="23" cy="29" rx="11" ry="15" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="23" cy="14" rx="13" ry="4" fill="#EA580C" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="23" cy="44" rx="13" ry="4" fill="#EA580C" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M18 18 Q18 28 16 34" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3"/>
    </svg>
  );
}

export function DoodleChestnut({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 42 50" className={`w-9 h-11 ${className}`} fill="none">
      <path d="M21 4 Q34 8 38 22 Q38 36 21 42 Q4 36 4 22 Q4 8 21 4 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M21 4 L19 0" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M21 4 L23 0" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M30 8 L34 6" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <path d="M36 16 L40 14" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <path d="M38 26 L42 26" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <path d="M12 8 L8 6" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <path d="M6 18 L2 16" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <path d="M17 26 Q21 20 25 26 Q25 38 21 42 Q17 38 17 26 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <ellipse cx="21" cy="36" rx="7" ry="6" fill="#78350F" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M15 34 Q21 32 27 34" stroke="#92400E" strokeWidth="1" fill="none" opacity="0.45"/>
      <path d="M18 28 Q19 30 18 34" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function DoodleGinkgoLeaf({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 46" className={`w-9 h-10 ${className}`} fill="none">
      <line x1="20" y1="44" x2="20" y2="28" stroke="#92400E" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 28 Q6 24 4 14 Q4 6 12 6 Q16 6 20 12 Q24 6 28 6 Q36 6 36 14 Q34 24 20 28 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 28 Q20 20 20 12" stroke="#D97706" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M20 28 Q14 22 10 14" stroke="#D97706" strokeWidth="1" fill="none" opacity="0.45"/>
      <path d="M20 28 Q26 22 30 14" stroke="#D97706" strokeWidth="1" fill="none" opacity="0.45"/>
      <path d="M20 28 Q10 26 6 18" stroke="#D97706" strokeWidth="0.8" fill="none" opacity="0.35"/>
      <path d="M20 28 Q30 26 34 18" stroke="#D97706" strokeWidth="0.8" fill="none" opacity="0.35"/>
      <path d="M10 10 Q20 8 28 10 Q20 22 10 10 Z" fill="#FDE047" opacity="0.35"/>
    </svg>
  );
}

// ── 디저트 ──────────────────────────────────────────────
export function DoodleMacaron({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 30" className={`w-10 h-7 ${className}`} fill="none">
      <ellipse cx="22" cy="23" rx="18" ry="6.5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="22" cy="21" rx="16" ry="5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M6 17 Q22 21 38 17 Q38 21 22 23 Q6 21 6 17 Z" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="22" cy="10" rx="16" ry="5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="22" cy="8" rx="18" ry="6.5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M11 6 Q22 4 33 6" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

export function DoodleCookie({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-9 h-9 ${className}`} fill="none">
      <circle cx="20" cy="20" r="17" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="20" cy="20" r="14" fill="#F59E0B"/>
      <path d="M7 14 Q20 10 33 14" stroke="#D97706" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
      <circle cx="13" cy="16" r="2.5" fill="#78350F"/>
      <circle cx="26" cy="13" r="2" fill="#78350F"/>
      <circle cx="25" cy="25" r="2.5" fill="#78350F"/>
      <circle cx="13" cy="26" r="2" fill="#78350F"/>
      <circle cx="20" cy="20" r="1.5" fill="#78350F"/>
      <path d="M8 20 Q20 18 32 20" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.35"/>
    </svg>
  );
}

export function DoodleWaffle({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 38" className={`w-10 h-9 ${className}`} fill="none">
      <rect x="4" y="4" width="36" height="30" rx="5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="4" y1="14" x2="40" y2="14" stroke="#D97706" strokeWidth="1" opacity="0.55"/>
      <line x1="4" y1="22" x2="40" y2="22" stroke="#D97706" strokeWidth="1" opacity="0.55"/>
      <line x1="16" y1="4" x2="16" y2="34" stroke="#D97706" strokeWidth="1" opacity="0.55"/>
      <line x1="28" y1="4" x2="28" y2="34" stroke="#D97706" strokeWidth="1" opacity="0.55"/>
      <rect x="4" y="4" width="12" height="10" rx="2" fill="#F59E0B" opacity="0.28"/>
      <rect x="28" y="4" width="12" height="10" rx="2" fill="#F59E0B" opacity="0.28"/>
      <rect x="16" y="22" width="12" height="12" rx="2" fill="#F59E0B" opacity="0.28"/>
      <rect x="4" y="22" width="12" height="12" rx="2" fill="#F59E0B" opacity="0.28"/>
      <rect x="28" y="22" width="12" height="12" rx="2" fill="#F59E0B" opacity="0.28"/>
      <rect x="16" y="8" width="12" height="8" rx="2" fill="#FEF9C3" stroke="#FDE68A" strokeWidth="0.8" opacity="0.9"/>
    </svg>
  );
}

export function DoodleToast({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 44" className={`w-9 h-10 ${className}`} fill="none">
      <rect x="4" y="12" width="32" height="28" rx="5" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="4" y="12" width="32" height="10" rx="4" fill="#F59E0B" stroke="none"/>
      <path d="M4 18 Q20 13 36 18" stroke="#D97706" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      <rect x="12" y="3" width="16" height="11" rx="3" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="12" y1="8" x2="28" y2="8" stroke="#94A3B8" strokeWidth="1" opacity="0.5"/>
      <path d="M8 26 Q20 24 32 26" stroke="#FDE68A" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M8 32 Q20 30 32 32" stroke="#FDE68A" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.45"/>
    </svg>
  );
}

// ── 예술 / 인테리어 ──────────────────────────────────────────────
export function DoodleColorPalette({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 50 44" className={`w-11 h-9 ${className}`} fill="none">
      <path d="M4 22 Q4 6 22 4 Q38 4 44 16 Q50 28 42 36 Q38 40 32 38 Q28 36 28 30 Q26 26 22 28 Q14 32 10 36 Q4 36 4 22 Z" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="14" cy="13" r="4" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="24" cy="8" r="4" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="34" cy="10" r="4" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="40" cy="20" r="4" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="38" cy="30" r="4" fill="#C084FC" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="22" cy="28" r="5" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="10" cy="26" r="2" fill="#1F2937" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

export function DoodleScissors({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={`w-10 h-10 ${className}`} fill="none">
      <path d="M18 32 L40 8" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round"/>
      <path d="M22 34 L40 14" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round"/>
      <path d="M18 32 L22 34" stroke="#2D2D2D" strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="11" cy="36" r="8" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="11" cy="36" r="5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="11" cy="36" r="2.5" fill="white"/>
      <circle cx="29" cy="37" r="8" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="29" cy="37" r="5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="29" cy="37" r="2.5" fill="white"/>
    </svg>
  );
}

export function DoodleCactus({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 56" className={`w-10 h-12 ${className}`} fill="none">
      <path d="M14 44 L16 54 Q22 58 30 54 L32 44 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="12" y="40" width="22" height="6" rx="3" fill="#EA580C" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="23" cy="40" rx="9" ry="3.5" fill="#92400E" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="17" y="10" width="12" height="32" rx="6" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M17 24 Q10 24 8 18 Q8 12 14 12 Q17 12 17 16" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M29 28 Q36 28 38 22 Q38 16 32 16 Q29 16 29 20" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="19" y1="16" x2="16" y2="13" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="23" y1="14" x2="23" y2="11" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="27" y1="16" x2="30" y2="13" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="10" y1="18" x2="8" y2="16" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="36" y1="22" x2="38" y2="20" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="23" cy="10" r="4" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="23" cy="10" r="2" fill="#F87171"/>
    </svg>
  );
}

export function DoodleVase({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 52" className={`w-9 h-11 ${className}`} fill="none">
      <path d="M20 20 Q13 13 10 8" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M20 20 Q20 12 20 6" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M20 20 Q27 13 30 8" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="10" cy="8" r="5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="20" cy="6" r="5" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="30" cy="8" r="5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="10" cy="8" r="2.5" fill="#FCA5A5"/>
      <circle cx="20" cy="6" r="2.5" fill="#FACC15"/>
      <circle cx="30" cy="8" r="2.5" fill="#F472B6"/>
      <path d="M12 22 Q8 26 8 36 Q8 46 12 48 Q20 52 28 48 Q32 46 32 36 Q32 26 28 22 Z" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="10" y="20" width="20" height="5" rx="2.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M12 32 Q20 30 28 32" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55"/>
      <path d="M12 38 Q20 36 28 38" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

// ── 파티 / 축하 ──────────────────────────────────────────────
export function DoodlePartyPopper({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={`w-10 h-10 ${className}`} fill="none">
      <path d="M8 40 L30 18 L40 8 L42 12 L34 24 L12 46 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 40 L30 18 L34 24 L12 46 Z" fill="#FDE68A"/>
      <path d="M40 8 Q44 4 46 6 Q48 10 44 14 L42 12 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="32" cy="10" r="3.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="40" cy="22" r="3" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="26" cy="6" r="2.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="46" cy="18" r="2" fill="#C084FC" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="16" cy="12" r="2" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M34 12 L37 6" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M42 22 L46 18" stroke="#4ADE80" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleTrophy({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 46 54" className={`w-10 h-11 ${className}`} fill="none">
      <rect x="16" y="42" width="14" height="6" rx="2" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="12" y="48" width="22" height="4" rx="2" fill="#B45309" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M16 42 Q18 36 23 36 Q28 36 30 42 Z" fill="#D97706" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 8 Q6 6 6 14 Q6 24 14 28 Q16 34 23 36 Q30 34 32 28 Q40 24 40 14 Q40 6 38 8" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="8" y="6" width="30" height="6" rx="3" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M6 14 Q2 18 4 24 Q6 28 10 28" stroke="#2D2D2D" strokeWidth="1.5" fill="#F59E0B" strokeLinecap="round"/>
      <path d="M40 14 Q44 18 42 24 Q40 28 36 28" stroke="#2D2D2D" strokeWidth="1.5" fill="#F59E0B" strokeLinecap="round"/>
      <path d="M16 18 L23 26 L30 18" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 10 L24.5 14.5 L29 14.5 L25.5 17 L27 21.5 L23 19 L19 21.5 L20.5 17 L17 14.5 L21.5 14.5 Z" fill="white" opacity="0.55"/>
    </svg>
  );
}

export function DoodleFireworks({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  const burst = [0,30,60,90,120,150,180,210,240,270,300,330];
  const colors = ['#F87171','#FACC15','#4ADE80','#60A5FA','#C084FC','#F9A8D4','#F87171','#FACC15','#4ADE80','#60A5FA','#C084FC','#F9A8D4'];
  return (
    <svg viewBox="0 0 52 52" className={`w-11 h-11 ${className}`} fill="none">
      {burst.map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        return (
          <line key={`l${i}`} x1="26" y1="26"
            x2={26 + Math.round(Math.cos(r) * 18)} y2={26 + Math.round(Math.sin(r) * 18)}
            stroke={colors[i]} strokeWidth="2" strokeLinecap="round"/>
        );
      })}
      {burst.map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        return (
          <circle key={`c${i}`}
            cx={26 + Math.round(Math.cos(r) * 18)} cy={26 + Math.round(Math.sin(r) * 18)}
            r="2.8" fill={colors[i]}/>
        );
      })}
      {[15,75,135,195,255,315].map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        return (
          <circle key={`s${i}`}
            cx={26 + Math.round(Math.cos(r) * 10)} cy={26 + Math.round(Math.sin(r) * 10)}
            r="1.5" fill="white" opacity="0.8"/>
        );
      })}
      <circle cx="26" cy="26" r="4" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

// ── 특별 / 유명인 ──────────────────────────────────────────────
export function DoodleRitualPollack({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 90" className={`w-12 h-[144px] ${className}`} fill="none">
      {/* ── 상단 술 (frayed rope end) ── */}
      <line x1="30" y1="14" x2="22" y2="4" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="24" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="27" y2="1" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="30" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="33" y2="1" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="36" y2="2" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="14" x2="38" y2="4" stroke="#F1F5F9" strokeWidth="1.5" strokeLinecap="round"/>
      {/* 고리 */}
      <circle cx="30" cy="14" r="3" fill="none" stroke="#94A3B8" strokeWidth="1.8"/>
      <circle cx="30" cy="14" r="1.5" fill="#94A3B8"/>
      {/* ── 새끼줄 (위) ── */}
      <rect x="27" y="16" width="6" height="28" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 20 Q30 22 33 20" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 24 Q30 26 33 24" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 28 Q30 30 33 28" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 32 Q30 34 33 32" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 36 Q30 38 33 36" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 40 Q30 42 33 40" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      {/* ── 물고기 꼬리 (뒤에) ── */}
      <path d="M48 50 Q56 45 58 52 Q56 59 48 57 Z" fill="#C4834A" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      {/* ── 나무 조각 물고기 몸통 ── */}
      <path d="M8 47 Q4 49 4 54 Q6 61 20 64 Q36 67 48 60 Q53 57 53 52 Q51 46 37 44 Q20 42 10 44 Q8 44 8 47 Z" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* 나무결 */}
      <path d="M14 51 Q28 48 42 52" stroke="#B8723A" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M12 57 Q28 55 44 58" stroke="#B8723A" strokeWidth="0.8" fill="none" opacity="0.45"/>
      {/* 등지느러미 */}
      <path d="M22 44 Q30 38 38 44" fill="#C4834A" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      {/* 눈 */}
      <circle cx="9" cy="54" r="2.5" fill="#2D2D2D"/>
      <circle cx="9.8" cy="53.2" r="1" fill="white"/>
      {/* ── 새끼줄이 물고기를 감아묶음 (앞에 겹쳐서) ── */}
      <path d="M30 44 Q28 52 28 62 Q30 66 32 62 Q32 52 30 44" stroke="#F8FAFC" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M30 44 Q28 52 28 62 Q30 66 32 62 Q32 52 30 44" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      {/* ── 새끼줄 (아래) ── */}
      <rect x="27" y="66" width="6" height="16" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2"/>
      <path d="M27 68 Q30 70 33 68" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 72 Q30 74 33 72" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
      <path d="M27 76 Q30 78 33 76" stroke="#CBD5E1" strokeWidth="0.8" fill="none"/>
    </svg>
  );
}


// ── 복 / 행운 ──────────────────────────────────────────────
export function DoodleFortunePouch({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 50" className={`w-9 h-11 ${className}`} fill="none">
      <path d="M20 6 Q24 4 26 8" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M14 10 Q20 8 26 10 Q22 14 20 14 Q18 14 14 10 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M26 10 Q30 10 32 12 Q30 16 26 14 Q24 12 26 10 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M8 18 Q6 30 8 40 Q14 50 20 50 Q26 50 32 40 Q34 30 32 18 Q26 12 20 12 Q14 12 8 18 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <text x="20" y="36" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#FACC15" fontFamily="serif">福</text>
      <path d="M10 24 Q14 22 18 24" stroke="#FACC15" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M22 24 Q26 22 30 24" stroke="#FACC15" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M10 22 Q12 20 11 28" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export function DoodleLuckyPig({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 46 40" className={`w-10 h-9 ${className}`} fill="none">
      <path d="M6 20 Q2 16 4 12 Q8 10 8 16" stroke="#FCA5A5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="24" cy="26" rx="16" ry="12" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="24" cy="28" r="5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="24" cy="28" r="3.5" fill="#F59E0B"/>
      <path d="M24 25 L24 31 M21 28 L27 28" stroke="#D97706" strokeWidth="0.8" opacity="0.6"/>
      <circle cx="38" cy="18" r="10" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M38 8 Q42 4 44 10 Q42 12 38 12 Z" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <ellipse cx="42" cy="20" rx="5" ry="3.5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="40.5" cy="20" r="1.2" fill="#2D2D2D"/>
      <circle cx="43.5" cy="20" r="1.2" fill="#2D2D2D"/>
      <circle cx="35" cy="14" r="2" fill="#2D2D2D"/>
      <circle cx="35.8" cy="13.2" r="0.8" fill="white"/>
      <path d="M12 34 L10 38" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 36 L16 40" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 36 L28 40" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 34 L34 38" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleLuckyToad({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 40" className={`w-10 h-9 ${className}`} fill="none">
      <ellipse cx="24" cy="26" rx="20" ry="14" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="3" fill="#22C55E" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="30" cy="15" r="3.5" fill="#22C55E" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="22" cy="12" r="4" fill="#22C55E" stroke="#2D2D2D" strokeWidth="0.8"/>
      <ellipse cx="14" cy="12" rx="5" ry="6" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="34" cy="12" rx="5" ry="6" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="14" cy="12" rx="3" ry="3.5" fill="#2D2D2D"/>
      <ellipse cx="34" cy="12" rx="3" ry="3.5" fill="#2D2D2D"/>
      <circle cx="13.5" cy="10.5" r="1.2" fill="white"/>
      <circle cx="33.5" cy="10.5" r="1.2" fill="white"/>
      <path d="M16 32 Q24 36 32 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="24" cy="22" r="5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="24" cy="22" r="3.5" fill="#F59E0B"/>
      <path d="M4 28 Q8 32 10 30" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M44 28 Q40 32 38 30" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function DoodleGoldenCarp({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 46 44" className={`w-10 h-9 ${className}`} fill="none">
      <path d="M4 38 Q12 34 20 38 Q28 42 36 38 Q42 36 44 40" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M6 32 Q2 24 4 16 Q10 22 10 32 Z" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M6 32 Q0 26 2 18 Q8 24 10 32 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10 32 Q16 38 28 36 Q40 32 42 24 Q42 14 36 10 Q26 6 18 10 Q10 16 10 32 Z" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M18 14 Q22 16 20 20" stroke="#D97706" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M26 12 Q30 14 28 18" stroke="#D97706" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M34 14 Q36 18 34 22" stroke="#D97706" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M16 22 Q20 24 18 28" stroke="#D97706" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M22 10 Q28 4 32 8 Q28 12 22 10 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="38" cy="20" r="3.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="38.5" cy="20" r="2" fill="#2D2D2D"/>
      <circle cx="39" cy="19.2" r="0.8" fill="white"/>
      <path d="M42 22 Q46 20 46 16" stroke="#D97706" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M42 24 Q46 24 46 20" stroke="#D97706" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleYeopjeon({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 36" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="18" cy="18" r="16" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="18" cy="18" r="13.5" fill="#FACC15"/>
      <rect x="14.5" y="14.5" width="7" height="7" rx="0.5" fill="#B45309" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="18" cy="18" r="11" fill="none" stroke="#D97706" strokeWidth="0.8" opacity="0.5"/>
      <path d="M8 12 Q10 10 9 16" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function DoodlePeachLongevity({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 38 44" className={`w-8 h-10 ${className}`} fill="none">
      <path d="M19 10 Q28 6 30 14 Q24 16 19 12 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M19 12 Q18 8 20 6" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M19 10 Q30 12 34 24 Q34 38 19 42 Q4 38 4 24 Q4 12 19 10 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 14 Q19 12 28 16 Q24 20 19 18 Q14 16 10 14 Z" fill="#FCA5A5" opacity="0.45"/>
      <path d="M19 10 Q18 22 19 34" stroke="#F97316" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round"/>
      <path d="M9 20 Q11 18 10 26" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

// ── 풍수 / 전통 용기 ──────────────────────────────────────────────
export function DoodleSaltJar({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 46" className={`w-8 h-10 ${className}`} fill="none">
      <ellipse cx="18" cy="7" rx="4" ry="2" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="18" cy="9" rx="9" ry="3" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="9" y="7" width="18" height="4" rx="1" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="18" cy="7" rx="8" ry="2.5" fill="#CBD5E1"/>
      <path d="M9 12 Q6 18 6 28 Q6 40 18 44 Q30 40 30 28 Q30 18 27 12 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7 22 Q18 20 29 22" stroke="#F87171" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M7 26 Q18 24 29 26" stroke="#F87171" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="12" cy="33" r="1" fill="#CBD5E1" opacity="0.6"/>
      <circle cx="18" cy="35" r="1" fill="#CBD5E1" opacity="0.6"/>
      <circle cx="24" cy="33" r="1" fill="#CBD5E1" opacity="0.6"/>
      <path d="M9 16 Q11 14 10 22" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function DoodleOnggiJar({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 42 50" className={`w-9 h-11 ${className}`} fill="none">
      <ellipse cx="21" cy="6" rx="10" ry="3.5" fill="#7C4A1A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="21" cy="4" rx="5" ry="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="13" y="6" width="16" height="5" rx="1" fill="#7C4A1A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M13 10 Q6 16 6 28 Q6 42 21 46 Q36 42 36 28 Q36 16 29 10 Z" fill="#8B4513" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 22 Q21 20 33 22" stroke="#6B3410" strokeWidth="1" fill="none" opacity="0.45"/>
      <path d="M7 30 Q21 28 35 30" stroke="#6B3410" strokeWidth="1" fill="none" opacity="0.45"/>
      <path d="M8 38 Q21 36 34 38" stroke="#6B3410" strokeWidth="0.8" fill="none" opacity="0.35"/>
      <path d="M10 16 Q12 14 11 24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3"/>
    </svg>
  );
}

export function DoodleWindChime({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 38 52" className={`w-8 h-11 ${className}`} fill="none">
      <path d="M19 4 Q23 2 25 6" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M10 24 Q10 10 19 8 Q28 10 28 24 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 24 Q19 20 30 24 Q26 28 19 28 Q12 28 8 24 Z" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M13 16 Q15 14 14 22" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
      <line x1="19" y1="28" x2="19" y2="38" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <path d="M13 38 Q19 36 25 40 Q22 44 19 44 Q16 44 13 42 Q11 40 13 38 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M25 40 Q30 38 30 42 Q28 46 25 44 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <circle cx="15" cy="40" r="1.5" fill="#2D2D2D"/>
      <path d="M4 28 Q2 24 4 20" stroke="#FACC15" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55"/>
      <path d="M34 28 Q36 24 34 20" stroke="#FACC15" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55"/>
    </svg>
  );
}

export function DoodleCompass({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 44" className={`w-9 h-9 ${className}`} fill="none">
      <circle cx="22" cy="22" r="20" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="22" cy="22" r="16" fill="none" stroke="#D97706" strokeWidth="0.8" opacity="0.5"/>
      <path d="M22 4 L22 8" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 36 L22 40" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 22 L8 22" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 22 L40 22" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 7 L10 10" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M34 7 L37 10" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M7 37 L10 34" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M34 37 L37 34" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M22 22 L22 8" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M22 22 L22 36" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="22" cy="22" r="3" fill="#2D2D2D" stroke="white" strokeWidth="1"/>
    </svg>
  );
}

// ── 부적 / 미신 ──────────────────────────────────────────────
export function DoodleTalisman({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 50" className={`w-7 h-11 ${className}`} fill="none">
      <rect x="4" y="4" width="24" height="42" rx="2" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="4" y="4" width="24" height="6" rx="2" fill="#F59E0B"/>
      <path d="M16 14 L16 24 M12 18 L20 18" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 28 Q16 26 20 28 Q16 30 12 28 Z" fill="#F87171" stroke="none"/>
      <path d="M13 34 L16 31 L19 34 L16 37 Z" fill="#F87171" stroke="none"/>
      <circle cx="16" cy="34" r="3.5" fill="none" stroke="#F87171" strokeWidth="1.2"/>
      <path d="M12 42 Q16 40 20 42" stroke="#F87171" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <rect x="6" y="6" width="20" height="38" rx="1" fill="none" stroke="#D97706" strokeWidth="0.8" opacity="0.45"/>
    </svg>
  );
}

export function DoodleGarlic({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 48" className={`w-8 h-10 ${className}`} fill="none">
      <path d="M18 8 Q16 4 18 2 Q20 4 18 8" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M18 6 Q12 4 10 8 Q14 10 18 8 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M18 6 Q24 4 26 8 Q22 10 18 8 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M18 8 Q30 10 32 24 Q30 38 18 42 Q6 38 4 24 Q6 10 18 8 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M18 8 Q14 18 14 28 Q16 36 18 42" stroke="#E2E8F0" strokeWidth="1.2" fill="none"/>
      <path d="M18 8 Q22 18 22 28 Q20 36 18 42" stroke="#E2E8F0" strokeWidth="1.2" fill="none"/>
      <path d="M14 42 Q12 46 14 48" stroke="#92400E" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M18 42 Q18 46 18 48" stroke="#92400E" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M22 42 Q24 46 22 48" stroke="#92400E" strokeWidth="1" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function DoodleRedString({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 38" className={`w-9 h-8 ${className}`} fill="none">
      <ellipse cx="4" cy="19" rx="3.5" ry="12" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="36" cy="19" rx="3.5" ry="12" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="4" y="12" width="32" height="14" rx="2" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M6 16 Q20 14 34 16" stroke="#F87171" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M6 19 Q20 17 34 19" stroke="#F87171" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M6 22 Q20 20 34 22" stroke="#F87171" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M36 17 Q40 14 42 10 Q40 8 38 12 Q36 15 36 17" stroke="#F87171" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <line x1="36" y1="7" x2="42" y2="1" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
      <ellipse cx="36.5" cy="7.5" rx="2" ry="1" fill="none" stroke="#94A3B8" strokeWidth="1" transform="rotate(-45 36.5 7.5)"/>
    </svg>
  );
}

export function DoodleMagpie({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 42" className={`w-10 h-9 ${className}`} fill="none">
      <path d="M4 38 Q24 36 44 38" stroke="#92400E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M8 30 Q4 34 4 40 Q8 36 10 32 Z" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <ellipse cx="22" cy="28" rx="15" ry="9" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="26" cy="30" rx="9" ry="6" fill="white"/>
      <path d="M12 24 Q10 18 14 14" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
      <circle cx="36" cy="18" r="10" fill="#1F2937" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="38" cy="16" r="2.5" fill="white"/>
      <circle cx="38.5" cy="16" r="1.5" fill="#2D2D2D"/>
      <circle cx="39" cy="15.6" r="0.6" fill="white"/>
      <path d="M44 18 L48 20 L44 22 Z" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M20 37 L18 40 M18 40 L14 41 M18 40 L20 42" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 37 L26 40 M26 40 L22 41 M26 40 L28 42" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleTaegeuk({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 44" className={`w-9 h-9 ${className}`} fill="none">
      <circle cx="22" cy="22" r="20" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M22 22 L22 4 A18 18 0 0 1 37.6 31 Z" fill="#F87171"/>
      <path d="M22 22 L37.6 31 A18 18 0 0 1 6.4 31 Z" fill="#60A5FA"/>
      <path d="M22 22 L6.4 31 A18 18 0 0 1 22 4 Z" fill="#FDE047"/>
      <line x1="22" y1="4" x2="22" y2="22" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.35"/>
      <line x1="37.6" y1="31" x2="22" y2="22" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.35"/>
      <line x1="6.4" y1="31" x2="22" y2="22" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.35"/>
      <circle cx="22" cy="22" r="5" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="22" cy="22" r="20" fill="none" stroke="#2D2D2D" strokeWidth="1.5"/>
    </svg>
  );
}

// ── 전통 상징 ──────────────────────────────────────────────
export function DoodlePeony({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={`w-10 h-10 ${className}`} fill="none">
      <path d="M24 40 Q16 36 12 30 Q16 28 22 32 Q24 36 24 40 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 40 Q32 36 36 30 Q32 28 26 32 Q24 36 24 40 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <line x1="24" y1="40" x2="24" y2="32" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 32 Q14 26 12 14 Q18 12 22 24 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 32 Q34 26 36 14 Q30 12 26 24 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 32 Q18 18 14 6 Q20 8 22 20 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 32 Q30 18 34 6 Q28 8 26 20 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 32 Q24 16 24 4 Q22 14 24 22 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="24" cy="22" r="9" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="24" cy="22" r="6" fill="#EC4899"/>
      <circle cx="24" cy="22" r="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

export function DoodleIncenseBurner({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 46" className={`w-9 h-10 ${className}`} fill="none">
      <path d="M16 8 Q14 4 16 2 Q18 4 16 8" stroke="#94A3B8" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M20 6 Q22 2 20 0 Q18 2 20 6" stroke="#94A3B8" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M24 8 Q26 4 24 2 Q22 4 24 8" stroke="#94A3B8" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
      <line x1="20" y1="8" x2="20" y2="22" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="22" r="2" fill="#F97316"/>
      <rect x="10" y="22" width="20" height="5" rx="2.5" fill="#78350F" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M12 26 Q10 28 10 34 Q10 40 20 42 Q30 40 30 34 Q30 28 28 26 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="16" y="42" width="8" height="3" rx="1" fill="#6B3410" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M13 32 Q20 30 27 32" stroke="#A0522D" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M13 28 Q14 26 13 34" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.35"/>
    </svg>
  );
}

export function DoodleFuCharacter({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 46" className={`w-9 h-10 ${className}`} fill="none">
      <rect x="4" y="4" width="32" height="38" rx="3" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M4 12 Q20 10 36 12" stroke="#F97316" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M4 34 Q20 32 36 34" stroke="#F97316" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <circle cx="8" cy="8" r="2" fill="#F97316" opacity="0.6"/>
      <circle cx="32" cy="8" r="2" fill="#F97316" opacity="0.6"/>
      <circle cx="8" cy="38" r="2" fill="#F97316" opacity="0.6"/>
      <circle cx="32" cy="38" r="2" fill="#F97316" opacity="0.6"/>
      <text x="20" y="30" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#F87171" fontFamily="serif">福</text>
    </svg>
  );
}

// ── 신성 동물 ──────────────────────────────────────────────
export function DoodleDragon({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={`w-10 h-10 ${className}`} fill="none">
      <path d="M36 10 Q44 14 40 22 Q36 30 28 28 Q20 26 18 34 Q14 40 18 46" stroke="#2D2D2D" strokeWidth="5.5" strokeLinecap="round"/>
      <path d="M36 10 Q44 14 40 22 Q36 30 28 28 Q20 26 18 34 Q14 40 18 46" stroke="#86EFAC" strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="34" cy="10" rx="8" ry="7" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M30 6 Q28 2 30 4" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <path d="M37 4 Q40 1 38 4" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="31" cy="9" r="2" fill="#2D2D2D"/>
      <circle cx="31.7" cy="8.3" r="0.7" fill="white"/>
      <path d="M28 11 Q24 9 22 10" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M28 13 Q24 13 22 15" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M18 46 L13 47 L20 44 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M26 28 L22 33" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 29 L18 33" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38 18 Q40 16 42 18" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <path d="M32 26 Q34 24 36 26" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.6"/>
    </svg>
  );
}

export function DoodleTiger({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 44" className={`w-10 h-10 ${className}`} fill="none">
      <path d="M10 14 Q8 6 14 8 Q16 10 14 14 Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M34 14 Q36 6 30 8 Q28 10 30 14 Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M11 12 Q10 8 14 9 Z" fill="#FDDCB5" stroke="none"/>
      <path d="M33 12 Q34 8 30 9 Z" fill="#FDDCB5" stroke="none"/>
      <ellipse cx="22" cy="24" rx="14" ry="13" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M16 14 Q18 12 20 14" stroke="#2D2D2D" strokeWidth="1.2" fill="none"/>
      <path d="M24 14 Q26 12 28 14" stroke="#2D2D2D" strokeWidth="1.2" fill="none"/>
      <path d="M20 12 Q22 10 24 12" stroke="#2D2D2D" strokeWidth="1.2" fill="none"/>
      <circle cx="17" cy="22" r="3" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="27" cy="22" r="3" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="17" cy="22" r="1.5" fill="#2D2D2D"/>
      <circle cx="27" cy="22" r="1.5" fill="#2D2D2D"/>
      <circle cx="17.5" cy="21.5" r="0.5" fill="white"/>
      <circle cx="27.5" cy="21.5" r="0.5" fill="white"/>
      <ellipse cx="22" cy="28" rx="5" ry="3.5" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="22" cy="27" rx="2" ry="1.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M19 30 Q22 33 25 30" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M8 22 Q10 20 12 22" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M8 26 Q10 24 12 26" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M32 22 Q34 20 36 22" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M32 26 Q34 24 36 26" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function DoodleCrane({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 52" className={`w-9 h-12 ${className}`} fill="none">
      <path d="M20 28 Q6 24 4 18 Q8 22 20 24 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M20 28 Q34 24 36 18 Q32 22 20 24 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M4 18 Q2 14 6 16 Q8 20 4 18 Z" fill="#2D2D2D"/>
      <path d="M36 18 Q38 14 34 16 Q32 20 36 18 Z" fill="#2D2D2D"/>
      <ellipse cx="20" cy="30" rx="9" ry="10" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M18 20 Q17 14 20 10" stroke="#2D2D2D" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M18 20 Q17 14 20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="20" cy="8" r="4" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="5" rx="2.5" ry="2" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M24 8 L30 7 L24 9 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="22" cy="8" r="1.2" fill="#2D2D2D"/>
      <line x1="17" y1="40" x2="14" y2="50" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="23" y1="40" x2="26" y2="50" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 50 L10 50 M14 50 L13 47" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M26 50 L30 50 M26 50 L27 47" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleTurtle({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 42" className={`w-11 h-10 ${className}`} fill="none">
      <ellipse cx="8" cy="18" rx="5" ry="4" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(-20 8 18)"/>
      <ellipse cx="40" cy="18" rx="5" ry="4" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(20 40 18)"/>
      <ellipse cx="10" cy="30" rx="4" ry="3.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(20 10 30)"/>
      <ellipse cx="38" cy="30" rx="4" ry="3.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(-20 38 30)"/>
      <ellipse cx="24" cy="22" rx="15" ry="13" fill="#22C55E" stroke="#2D2D2D" strokeWidth="1.5"/>
      <polygon points="24,12 30,15 30,21 24,24 18,21 18,15" fill="none" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.6"/>
      <polygon points="24,24 30,27 30,33 24,36 18,33 18,27" fill="none" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.4"/>
      <polygon points="30,15 36,18 36,24 30,27 24,24 24,18" fill="none" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.4"/>
      <polygon points="18,15 24,18 24,24 18,27 12,24 12,18" fill="none" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.4"/>
      <ellipse cx="24" cy="9" rx="5" ry="4" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="22" cy="8" r="1.2" fill="#2D2D2D"/>
      <circle cx="26" cy="8" r="1.2" fill="#2D2D2D"/>
      <circle cx="22.4" cy="7.6" r="0.4" fill="white"/>
      <circle cx="26.4" cy="7.6" r="0.4" fill="white"/>
      <path d="M24 35 Q24 38 22 38" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function DoodlePhoenix({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 52" className={`w-10 h-12 ${className}`} fill="none">
      <path d="M24 32 Q20 40 16 50" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 32 Q22 42 20 51" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 32 Q24 44 24 52" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 32 Q26 42 28 51" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 32 Q28 40 32 50" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 22 Q10 18 6 10 Q14 16 24 18 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M24 22 Q38 18 42 10 Q34 16 24 18 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="24" cy="22" rx="9" ry="11" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="24" cy="25" rx="5" ry="6" fill="#FB923C" stroke="none" opacity="0.4"/>
      <circle cx="24" cy="11" r="6" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M20 6 Q22 3 24 5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 5 Q26 2 28 4" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="22" cy="11" r="2" fill="#2D2D2D"/>
      <circle cx="22.6" cy="10.4" r="0.7" fill="white"/>
      <path d="M27 12 L31 11 L27 13 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

// ── 무속 ──────────────────────────────────────────────
export function DoodleShamanBell({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 46" className={`w-9 h-11 ${className}`} fill="none">
      <path d="M14 6 Q12 4 14 2 Q18 1 20 4 Q22 1 26 2 Q28 4 26 6" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <line x1="18" y1="6" x2="18" y2="10" stroke="#B45309" strokeWidth="1.5"/>
      <ellipse cx="18" cy="24" rx="14" ry="15" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M5 18 Q18 16 31 18" stroke="#B45309" strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M4 24 Q18 22 32 24" stroke="#B45309" strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M5 30 Q18 28 31 30" stroke="#B45309" strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M12 38 Q14 40 18 40 Q22 40 24 38" stroke="#B45309" strokeWidth="1.2" fill="none"/>
      <line x1="18" y1="37" x2="18" y2="40" stroke="#B45309" strokeWidth="1"/>
      <line x1="18" y1="36" x2="18" y2="39" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="40" r="1.5" fill="#2D2D2D"/>
    </svg>
  );
}

export function DoodleShamanFan({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 52 44" className={`w-12 h-10 ${className}`} fill="none">
      <path d="M4 8 Q8 2 18 2 Q26 2 34 2 Q44 2 48 8" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M4 8 Q12 18 22 22 Q26 23 30 22 Q40 18 48 8" stroke="#2D2D2D" strokeWidth="1.2" fill="none"/>
      <path d="M4 8 Q10 4 18 2 Q14 10 8 16 Z" fill="#F87171" opacity="0.55" stroke="none"/>
      <path d="M10 4 Q18 2 26 2 Q22 10 14 14 Z" fill="#FB923C" opacity="0.55" stroke="none"/>
      <path d="M18 2 Q26 2 34 2 Q30 10 22 12 Z" fill="#FDE047" opacity="0.55" stroke="none"/>
      <path d="M26 2 Q34 2 42 4 Q36 10 28 12 Z" fill="#4ADE80" opacity="0.55" stroke="none"/>
      <path d="M34 2 Q42 4 48 8 Q40 12 32 14 Z" fill="#60A5FA" opacity="0.55" stroke="none"/>
      <line x1="26" y1="40" x2="4" y2="8" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="26" y1="40" x2="10" y2="4" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="26" y1="40" x2="18" y2="2" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="26" y1="40" x2="26" y2="2" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="26" y1="40" x2="34" y2="2" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="26" y1="40" x2="42" y2="4" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="26" y1="40" x2="48" y2="8" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round"/>
      <circle cx="26" cy="40" r="3" fill="#B45309" stroke="#2D2D2D" strokeWidth="1"/>
      <line x1="26" y1="43" x2="26" y2="46" stroke="#B45309" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleDokkaebi({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 48" className={`w-10 h-11 ${className}`} fill="none">
      <path d="M14 10 Q10 2 12 6 Q14 4 16 8 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M30 10 Q34 2 32 6 Q30 4 28 8 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M8 18 Q6 10 12 8 Q10 12 12 14 Z" fill="#2D2D2D"/>
      <path d="M36 18 Q38 10 32 8 Q34 12 32 14 Z" fill="#2D2D2D"/>
      <ellipse cx="22" cy="28" rx="15" ry="16" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M12 20 Q16 17 20 20" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M24 20 Q28 17 32 20" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="17" cy="25" r="3.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="27" cy="25" r="3.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="17" cy="25" r="2" fill="#FACC15"/>
      <circle cx="27" cy="25" r="2" fill="#FACC15"/>
      <circle cx="17" cy="25" r="1" fill="#2D2D2D"/>
      <circle cx="27" cy="25" r="1" fill="#2D2D2D"/>
      <circle cx="17.4" cy="24.4" r="0.4" fill="white"/>
      <circle cx="27.4" cy="24.4" r="0.4" fill="white"/>
      <ellipse cx="22" cy="30" rx="2" ry="1.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M13 35 Q22 40 31 35" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M16 35 L15 39 L18 35" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M28 35 L29 39 L26 35" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="10" cy="29" rx="3.5" ry="2.5" fill="#F87171" opacity="0.3"/>
      <ellipse cx="34" cy="29" rx="3.5" ry="2.5" fill="#F87171" opacity="0.3"/>
    </svg>
  );
}

// ── 종교 ──────────────────────────────────────────────
export function DoodleLotus({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 44" className={`w-11 h-10 ${className}`} fill="none">
      <path d="M2 38 Q12 34 24 36 Q36 34 46 38" stroke="#93C5FD" strokeWidth="1.2" fill="none"/>
      <path d="M4 42 Q14 38 24 40 Q34 38 44 42" stroke="#93C5FD" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M10 36 Q8 28 16 30 Q20 36 10 36 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" opacity="0.8"/>
      <path d="M38 36 Q40 28 32 30 Q28 36 38 36 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" opacity="0.8"/>
      <path d="M24 30 Q16 22 14 14 Q20 18 24 26 Z" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 30 Q32 22 34 14 Q28 18 24 26 Z" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 30 Q10 26 6 18 Q14 20 22 28 Z" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 30 Q38 26 42 18 Q34 20 26 28 Z" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 28 Q18 20 18 12 Q22 18 24 26 Z" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 28 Q30 20 30 12 Q26 18 24 26 Z" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 28 Q14 22 12 14 Q18 20 22 26 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 28 Q34 22 36 14 Q30 20 26 26 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="24" cy="24" r="4" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="22" cy="23" r="0.8" fill="#B45309"/>
      <circle cx="24" cy="22" r="0.8" fill="#B45309"/>
      <circle cx="26" cy="23" r="0.8" fill="#B45309"/>
      <circle cx="25" cy="25" r="0.8" fill="#B45309"/>
      <circle cx="23" cy="25" r="0.8" fill="#B45309"/>
    </svg>
  );
}

export function DoodlePrayerBeads({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  const beads = Array.from({ length: 18 }, (_, i) => {
    const angle = (i * 360) / 18 - 90;
    const rad = (angle * Math.PI) / 180;
    return { cx: 22 + 15 * Math.cos(rad), cy: 22 + 15 * Math.sin(rad) };
  });
  return (
    <svg viewBox="0 0 44 48" className={`w-10 h-11 ${className}`} fill="none">
      <circle cx="22" cy="22" r="15" fill="none" stroke="#92400E" strokeWidth="0.6" opacity="0.4"/>
      {beads.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r="2.2" fill="#C4884A" stroke="#2D2D2D" strokeWidth="0.8"/>
      ))}
      <circle cx="22" cy="37" r="3.5" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="20" y1="41" x2="18" y2="46" stroke="#92400E" strokeWidth="1" strokeLinecap="round"/>
      <line x1="22" y1="41" x2="22" y2="46" stroke="#92400E" strokeWidth="1" strokeLinecap="round"/>
      <line x1="24" y1="41" x2="26" y2="46" stroke="#92400E" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleCross({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 44" className={`w-8 h-11 ${className}`} fill="none">
      <ellipse cx="16" cy="22" rx="14" ry="20" fill="#FEF08A" opacity="0.2" stroke="none"/>
      <rect x="11" y="4" width="10" height="36" rx="2.5" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="3" y="14" width="26" height="10" rx="2.5" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M13 6 Q14 9 13 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M5 16 Q9 17 7 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <circle cx="27" cy="14" r="1" fill="white" opacity="0.6"/>
    </svg>
  );
}

// ── 행운 소품 ──────────────────────────────────────────────
export function DoodleGoldBar({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 34" className={`w-11 h-8 ${className}`} fill="none">
      <path d="M10 14 L38 14 L44 8 L4 8 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M38 14 L44 8 L44 30 L38 30 Z" fill="#EAB308" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <rect x="4" y="14" width="34" height="16" rx="2" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M8 17 Q16 15 24 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M10 10 Q18 8 26 10" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
      <line x1="10" y1="22" x2="34" y2="22" stroke="#B45309" strokeWidth="0.8" opacity="0.4"/>
      <line x1="10" y1="26" x2="34" y2="26" stroke="#B45309" strokeWidth="0.8" opacity="0.4"/>
      <path d="M40 6 L42 4 L40 2 L38 4 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.6"/>
      <path d="M6 7 L6 4 M4 5.5 L8 5.5" stroke="#FDE047" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

export function DoodleRedLantern({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 52" className={`w-9 h-12 ${className}`} fill="none">
      <line x1="18" y1="2" x2="18" y2="8" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="10" y="8" width="16" height="5" rx="2" fill="#B91C1C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="18" cy="28" rx="13" ry="17" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M10 14 Q6 22 8 32 Q10 40 10 43" stroke="#B91C1C" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
      <path d="M14 12 Q12 22 13 33 Q14 41 14 43" stroke="#B91C1C" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
      <path d="M22 12 Q24 22 23 33 Q22 41 22 43" stroke="#B91C1C" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
      <path d="M26 14 Q30 22 28 32 Q26 40 26 43" stroke="#B91C1C" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
      <ellipse cx="12" cy="22" rx="3" ry="5" fill="white" opacity="0.12"/>
      <text x="18" y="33" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#FDE047" fontFamily="serif">福</text>
      <rect x="10" y="43" width="16" height="5" rx="2" fill="#B91C1C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="14" y1="48" x2="12" y2="52" stroke="#FDE047" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="18" y1="48" x2="18" y2="52" stroke="#FDE047" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="22" y1="48" x2="24" y2="52" stroke="#FDE047" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleHorseshoe({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 40" className={`w-10 h-9 ${className}`} fill="none">
      <path d="M8 38 L8 18 Q8 4 22 4 Q36 4 36 18 L36 38" stroke="#2D2D2D" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M8 38 L8 18 Q8 4 22 4 Q36 4 36 18 L36 38" stroke="#94A3B8" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      <circle cx="8" cy="30" r="2" fill="#2D2D2D"/>
      <circle cx="8" cy="22" r="2" fill="#2D2D2D"/>
      <circle cx="10" cy="14" r="2" fill="#2D2D2D"/>
      <circle cx="36" cy="30" r="2" fill="#2D2D2D"/>
      <circle cx="36" cy="22" r="2" fill="#2D2D2D"/>
      <circle cx="34" cy="14" r="2" fill="#2D2D2D"/>
      <path d="M22 4 Q28 4 32 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M22 16 L23 19 L26 19 L24 21 L25 24 L22 22 L19 24 L20 21 L18 19 L21 19 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

export function DoodleRedEnvelope({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 38" className={`w-11 h-9 ${className}`} fill="none">
      <rect x="4" y="10" width="40" height="26" rx="3" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M4 10 L24 24 L44 10" stroke="#2D2D2D" strokeWidth="1.2" fill="none"/>
      <path d="M4 4 L24 18 L44 4 L44 10 L4 10 Z" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="24" cy="26" r="7" fill="none" stroke="#FDE047" strokeWidth="1.5"/>
      <circle cx="24" cy="26" r="4" fill="#FDE047" opacity="0.25" stroke="none"/>
      <text x="24" y="30" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FDE047" fontFamily="serif">福</text>
      <line x1="8" y1="18" x2="16" y2="18" stroke="#FDE047" strokeWidth="0.8" opacity="0.6"/>
      <line x1="32" y1="18" x2="40" y2="18" stroke="#FDE047" strokeWidth="0.8" opacity="0.6"/>
    </svg>
  );
}

// ── 판타지 & 우주 ──────────────────────────────────────
export function DoodleUnicorn({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="20" cy="26" rx="13" ry="9" fill="#FFF0F5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M14 20 L11 8 L17 19 Z" fill="#FAD7A0" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M26 17 Q29 12 32 14 Q30 17 27 18 Z" fill="#FFF0F5" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="14" cy="24" r="2.5" fill="#2D2D2D"/>
      <circle cx="14.8" cy="23.2" r="1" fill="white"/>
      <circle cx="26" cy="27" r="1" fill="#2D2D2D" opacity="0.35"/>
      <circle cx="29" cy="25" r="1" fill="#2D2D2D" opacity="0.35"/>
      <path d="M25 18 Q31 20 30 27" stroke="#F9A8D4" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M27 17 Q34 20 33 27" stroke="#A78BFA" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M26 16 Q34 18 33 22" stroke="#7DD3FC" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleWitchHat({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 4 L11 30 L29 30 Z" fill="#1E1B4B" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <ellipse cx="20" cy="31" rx="15" ry="4" fill="#7C3AED" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="13" y="27" width="14" height="4" rx="2" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="23" cy="13" r="1.5" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M15 20 Q17 18 19 20" stroke="#A78BFA" strokeWidth="1" fill="none"/>
    </svg>
  );
}

export function DoodlePotion({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="17" y="4" width="6" height="6" rx="1.5" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M15 10 Q10 18 10 26 Q10 36 20 36 Q30 36 30 26 Q30 18 25 10 Z" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M15 10 L20 10 L20 35 Q10 34 10 26 Q10 18 15 10 Z" fill="#A78BFA" opacity="0.35" stroke="none"/>
      <circle cx="16" cy="22" r="2" fill="white" opacity="0.6"/>
      <circle cx="23" cy="28" r="1.5" fill="white" opacity="0.5"/>
      <line x1="16" y1="8" x2="24" y2="8" stroke="#94A3B8" strokeWidth="1.5"/>
    </svg>
  );
}

export function DoodleShootingStar({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <line x1="4" y1="36" x2="22" y2="20" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <line x1="4" y1="32" x2="20" y2="20" stroke="#FDE047" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
      <path d="M22 20 L24 14 L26 20 L32 20 L27 24 L29 30 L24 26 L19 30 L21 24 L16 20 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

export function DoodleUFO({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="20" cy="27" rx="16" ry="5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="23" rx="9" ry="7" fill="#7DD3FC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="21" rx="5" ry="3" fill="#E0F2FE" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="11" cy="29" r="1.8" fill="#FDE047" opacity="0.9"/>
      <circle cx="20" cy="31" r="1.8" fill="#FDE047" opacity="0.9"/>
      <circle cx="29" cy="29" r="1.8" fill="#FDE047" opacity="0.9"/>
    </svg>
  );
}

export function DoodleAstronaut({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="11" r="8" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="11" rx="5" ry="5" fill="#BAE6FD" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="18" cy="10" r="1.2" fill="#2D2D2D" opacity="0.6"/>
      <circle cx="22" cy="10" r="1.2" fill="#2D2D2D" opacity="0.6"/>
      <path d="M12 19 Q8 21 8 25 Q8 29 12 29 L28 29 Q32 29 32 25 Q32 21 28 19 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="17" y="21" width="6" height="4" rx="1" fill="#93C5FD" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="16" y="29" width="8" height="6" rx="2" fill="#CBD5E1" stroke="#2D2D2D" strokeWidth="1.2"/>
    </svg>
  );
}

export function DoodleAlien({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="20" cy="22" rx="12" ry="14" fill="#BBF7D0" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="14" cy="19" rx="4.5" ry="5.5" fill="#2D2D2D"/>
      <ellipse cx="26" cy="19" rx="4.5" ry="5.5" fill="#2D2D2D"/>
      <ellipse cx="14" cy="19" rx="2.5" ry="3.5" fill="#4ADE80"/>
      <ellipse cx="26" cy="19" rx="2.5" ry="3.5" fill="#4ADE80"/>
      <circle cx="13.5" cy="18" r="1" fill="white"/>
      <circle cx="25.5" cy="18" r="1" fill="white"/>
      <path d="M15 29 Q20 32 25 29" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <line x1="8" y1="7" x2="13" y2="12" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="32" y1="7" x2="27" y2="12" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="8" cy="6" r="1.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="32" cy="6" r="1.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

export function DoodleCauldron({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M8 22 Q8 36 20 36 Q32 36 32 22 Z" fill="#1E1B4B" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="22" rx="12" ry="5" fill="#312E81" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M14 19 Q17 13 20 16 Q23 13 26 19" stroke="#86EFAC" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M17 13 Q19 7 18 11" stroke="#86EFAC" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M22 11 Q24 5 23 9" stroke="#C4B5FD" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <line x1="8" y1="24" x2="4" y2="26" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <line x1="32" y1="24" x2="36" y2="26" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleMagicTopHat({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="14" y="7" width="12" height="22" rx="2" fill="#1E1B4B" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="8" y="28" width="24" height="5" rx="2" fill="#1E1B4B" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M17 26 Q20 23 23 26" stroke="#FDE047" strokeWidth="1.2" fill="none"/>
      <circle cx="23" cy="13" r="1.5" fill="#FDE047"/>
      <circle cx="19" cy="17" r="1.5" fill="#F9A8D4"/>
      <circle cx="24" cy="21" r="1.5" fill="#7DD3FC"/>
      <path d="M20 7 L19 4 L20 2 L21 4 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

export function DoodleSaturn({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M4 20 Q4 26 20 26 Q36 26 36 20" stroke="#2D2D2D" strokeWidth="1.2" fill="none" opacity="0.35" strokeDasharray="2 2"/>
      <circle cx="20" cy="20" r="10" fill="#FED7AA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M4 20 Q4 14 20 14 Q36 14 36 20" stroke="#2D2D2D" strokeWidth="1.5" fill="none"/>
      <circle cx="20" cy="17" r="3" fill="#FB923C" opacity="0.4" stroke="none"/>
    </svg>
  );
}

// ── 파티 & 축하 ──────────────────────────────────────
export function DoodlePartyHat({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 4 L8 32 L32 32 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="14" cy="18" r="2" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="22" cy="22" r="2" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="17" cy="26" r="1.5" fill="#7DD3FC" stroke="#2D2D2D" strokeWidth="0.8"/>
      <ellipse cx="20" cy="33" rx="12" ry="3" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="1"/>
      <line x1="20" y1="4" x2="18" y2="1.5" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="17.5" cy="1.5" r="1.5" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

export function DoodleConfetti({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="7" y="5" width="5" height="5" rx="1" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" transform="rotate(20 9.5 7.5)"/>
      <rect x="26" y="4" width="5" height="5" rx="1" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1" transform="rotate(-15 28.5 6.5)"/>
      <rect x="13" y="18" width="4" height="4" rx="0.5" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1" transform="rotate(30 15 20)"/>
      <rect x="28" y="16" width="4" height="4" rx="0.5" fill="#7DD3FC" stroke="#2D2D2D" strokeWidth="1" transform="rotate(-20 30 18)"/>
      <circle cx="10" cy="24" r="2.5" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="30" cy="28" r="2.5" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="18" y="28" width="6" height="3" rx="1" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1" transform="rotate(10 21 29.5)"/>
      <circle cx="20" cy="12" r="2" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="6" y="30" width="4" height="4" rx="0.5" fill="#7DD3FC" stroke="#2D2D2D" strokeWidth="1" transform="rotate(45 8 32)"/>
    </svg>
  );
}

export function DoodleChampagne({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M16 36 L24 36 L22 28 L18 28 Z" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="20" y1="28" x2="20" y2="36" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M14 4 Q10 14 14 22 Q16 26 18 28 L22 28 Q24 26 26 22 Q30 14 26 4 Z" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M14 10 Q13 16 15 22" fill="#FEF08A" opacity="0.4" stroke="none"/>
      <circle cx="18" cy="12" r="1" fill="#2D2D2D" opacity="0.3"/>
      <circle cx="22" cy="18" r="1" fill="#2D2D2D" opacity="0.3"/>
      <circle cx="20" cy="8" r="1" fill="#2D2D2D" opacity="0.3"/>
      <line x1="14" y1="36" x2="26" y2="36" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleBigRibbon({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 20 Q8 10 4 6 Q6 14 20 20 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 20 Q32 10 36 6 Q34 14 20 20 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 20 Q8 30 4 34 Q6 26 20 20 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 20 Q32 30 36 34 Q34 26 20 20 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="20" cy="20" r="4" fill="#EC4899" stroke="#2D2D2D" strokeWidth="1.5"/>
    </svg>
  );
}

export function DoodleMedal({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="17" y="4" width="6" height="12" rx="2" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="20" cy="28" r="11" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="20" cy="28" r="8" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M20 21 L21.4 25.6 L26 25.6 L22.3 28.4 L23.7 33 L20 30.2 L16.3 33 L17.7 28.4 L14 25.6 L18.6 25.6 Z" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round"/>
    </svg>
  );
}

export function DoodleGarland({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M2 10 Q10 18 20 14 Q30 10 38 18" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M4 10 L8 4 L12 10 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M12 14 L16 8 L20 14 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M20 14 L24 8 L28 14 Z" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M28 14 L32 8 L36 14 Z" fill="#7DD3FC" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleCakeSlice({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M8 36 L20 12 L32 36 Z" fill="#FED7AA" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 36 Q9 30 12 28 Q14 26 16 28 Q18 24 20 12 Q22 24 24 28 Q26 26 28 28 Q31 30 32 36 Z" fill="#FBCFE8" stroke="none"/>
      <line x1="10" y1="32" x2="30" y2="32" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.5"/>
      <line x1="12" y1="27" x2="28" y2="27" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="20" cy="10" r="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M20 7 Q22 4 24 5" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ── 동물 ──────────────────────────────────────
export function DoodleDog({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="22" r="13" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M8 18 Q4 10 10 12 Q13 16 11 20 Z" fill="#F0C080" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M32 18 Q36 10 30 12 Q27 16 29 20 Z" fill="#F0C080" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="15" cy="20" r="2.5" fill="#2D2D2D"/>
      <circle cx="25" cy="20" r="2.5" fill="#2D2D2D"/>
      <circle cx="15.8" cy="19.2" r="1" fill="white"/>
      <circle cx="25.8" cy="19.2" r="1" fill="white"/>
      <ellipse cx="20" cy="26" rx="4" ry="2.5" fill="#E8A090" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="26" r="1.5" fill="#2D2D2D"/>
      <path d="M16 28 Q20 32 24 28" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleOwl({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="20" cy="28" rx="12" ry="10" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="20" cy="16" r="10" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M13 8 Q10 3 13 6 L14 9 Z" fill="#B8723A" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M27 8 Q30 3 27 6 L26 9 Z" fill="#B8723A" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="15" cy="16" r="5" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="25" cy="16" r="5" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="15" cy="16" r="3" fill="#2D2D2D"/>
      <circle cx="25" cy="16" r="3" fill="#2D2D2D"/>
      <circle cx="15.8" cy="15.2" r="1" fill="white"/>
      <circle cx="25.8" cy="15.2" r="1" fill="white"/>
      <path d="M18 21 L20 24 L22 21 Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="20" cy="29" rx="6" ry="7" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleDuck({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="18" cy="28" rx="14" ry="9" fill="#FEF08A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="28" cy="16" r="8" fill="#FEF08A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="31" cy="14" r="2" fill="#2D2D2D"/>
      <circle cx="31.7" cy="13.3" r="0.8" fill="white"/>
      <path d="M34 16 Q38 16 38 18 Q36 20 34 18 Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M6 26 Q8 20 18 24" stroke="#FACC15" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleBee({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="20" cy="26" rx="8" ry="11" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="12" y="22" width="16" height="3" rx="0" fill="#2D2D2D" opacity="0.3"/>
      <rect x="12" y="28" width="16" height="3" rx="0" fill="#2D2D2D" opacity="0.3"/>
      <ellipse cx="10" cy="21" rx="6" ry="3.5" fill="#E0F2FE" stroke="#2D2D2D" strokeWidth="1" opacity="0.85" transform="rotate(-20 10 21)"/>
      <ellipse cx="30" cy="21" rx="6" ry="3.5" fill="#E0F2FE" stroke="#2D2D2D" strokeWidth="1" opacity="0.85" transform="rotate(20 30 21)"/>
      <circle cx="20" cy="13" r="7" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="17" cy="12" r="2" fill="#2D2D2D"/>
      <circle cx="23" cy="12" r="2" fill="#2D2D2D"/>
      <circle cx="17.6" cy="11.4" r="0.8" fill="white"/>
      <circle cx="23.6" cy="11.4" r="0.8" fill="white"/>
      <line x1="17" y1="6" x2="14" y2="2" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="23" y1="6" x2="26" y2="2" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="14" cy="1.5" r="1.5" fill="#2D2D2D"/>
      <circle cx="26" cy="1.5" r="1.5" fill="#2D2D2D"/>
    </svg>
  );
}

export function DoodleWhale({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M6 22 Q6 12 18 12 Q32 12 34 22 Q36 28 30 30 Q22 34 12 30 Q4 26 6 22 Z" fill="#7DD3FC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M30 28 Q36 32 38 28 Q38 23 34 25 Q36 19 32 24" fill="#7DD3FC" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="14" cy="20" r="2.5" fill="#2D2D2D"/>
      <circle cx="14.8" cy="19.2" r="1" fill="white"/>
      <path d="M20 12 Q18 8 16 6" stroke="#BAE6FD" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M20 12 Q20 7 20 4" stroke="#BAE6FD" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M20 12 Q22 8 24 6" stroke="#BAE6FD" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M10 24 Q20 28 30 24" fill="#E0F2FE" stroke="none" opacity="0.5"/>
    </svg>
  );
}

export function DoodleDeer({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M14 17 Q10 10 8 6" stroke="#B8723A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M10 11 Q6 9 4 11" stroke="#B8723A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M9 9 Q8 5 10 4" stroke="#B8723A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M26 17 Q30 10 32 6" stroke="#B8723A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M30 11 Q34 9 36 11" stroke="#B8723A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M31 9 Q32 5 30 4" stroke="#B8723A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="20" cy="26" rx="11" ry="10" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M11 17 Q8 13 10 15 Q12 19 14 19 Z" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M29 17 Q32 13 30 15 Q28 19 26 19 Z" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="16" cy="24" r="2.5" fill="#2D2D2D"/>
      <circle cx="24" cy="24" r="2.5" fill="#2D2D2D"/>
      <circle cx="16.8" cy="23.2" r="1" fill="white"/>
      <circle cx="24.8" cy="23.2" r="1" fill="white"/>
      <ellipse cx="20" cy="29" rx="3" ry="2" fill="#E8A090" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

// ── 여행 & 일상 ──────────────────────────────────────
export function DoodleMap({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M4 8 L14 6 L26 10 L36 6 L36 34 L26 36 L14 32 L4 34 Z" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="14" y1="6" x2="14" y2="32" stroke="#2D2D2D" strokeWidth="1" opacity="0.4"/>
      <line x1="26" y1="10" x2="26" y2="36" stroke="#2D2D2D" strokeWidth="1" opacity="0.4"/>
      <path d="M8 14 Q12 14 16 18 Q20 22 24 20 Q28 18 30 22" stroke="#F87171" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 2"/>
      <circle cx="30" cy="22" r="3" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodlePassport({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="8" y="4" width="24" height="32" rx="3" fill="#1D4ED8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="10" y="6" width="20" height="28" rx="2" fill="#2563EB" stroke="none"/>
      <circle cx="20" cy="16" r="6" fill="none" stroke="#BFDBFE" strokeWidth="1.2"/>
      <ellipse cx="20" cy="16" rx="3" ry="6" fill="none" stroke="#BFDBFE" strokeWidth="1.2"/>
      <line x1="14" y1="16" x2="26" y2="16" stroke="#BFDBFE" strokeWidth="1.2"/>
      <rect x="12" y="26" width="16" height="1.5" rx="0.5" fill="#BFDBFE" opacity="0.7"/>
      <rect x="12" y="30" width="10" height="1.5" rx="0.5" fill="#BFDBFE" opacity="0.5"/>
    </svg>
  );
}

export function DoodleBackpack({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="8" y="12" width="24" height="24" rx="5" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M14 12 Q14 8 18 6 Q22 6 26 8 Q26 12 26 12" fill="none" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="12" y="20" width="16" height="11" rx="3" fill="#C4B5FD" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="12" y1="24" x2="28" y2="24" stroke="#2D2D2D" strokeWidth="1" opacity="0.6"/>
      <circle cx="20" cy="24" r="1.5" fill="#7C3AED" opacity="0.7"/>
      <path d="M16 12 Q20 10 24 12" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleBicycle({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="10" cy="28" r="9" fill="none" stroke="#2D2D2D" strokeWidth="1.8"/>
      <circle cx="30" cy="28" r="9" fill="none" stroke="#2D2D2D" strokeWidth="1.8"/>
      <circle cx="10" cy="28" r="2" fill="#2D2D2D"/>
      <circle cx="30" cy="28" r="2" fill="#2D2D2D"/>
      <path d="M10 28 L20 14 L30 28" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 14 L24 14" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 22 L20 22" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="14" r="2" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleGlobe({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="19" r="14" fill="#BAE6FD" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="19" rx="7" ry="14" fill="none" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="20" cy="19" rx="14" ry="5" fill="none" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="6" y1="19" x2="34" y2="19" stroke="#2D2D2D" strokeWidth="1" opacity="0.4"/>
      <line x1="20" y1="33" x2="20" y2="37" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="37" x2="26" y2="37" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

// ── 계절 ──────────────────────────────────────
export function DoodleMitten({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M12 36 Q8 36 7 28 Q6 18 10 14 Q12 10 14 12 Q14 8 16 7 Q18 6 19 10 Q22 6 24 7 Q26 8 24 14 Q28 14 30 18 Q32 22 28 26 Q26 30 22 32 Q18 34 12 36 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 20 Q8 22 9 26" stroke="#EC4899" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  );
}

export function DoodleHotCocoa({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M8 18 L10 36 L30 36 L32 18 Z" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M32 22 Q38 22 38 28 Q38 34 32 34" stroke="#2D2D2D" strokeWidth="1.5" fill="none"/>
      <ellipse cx="20" cy="18" rx="12" ry="5" fill="#FFF5F5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="14" cy="17" r="3" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="20" cy="15" r="3.5" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="26" cy="17" r="3" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M14 12 Q12 9 14 6" stroke="#94A3B8" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M20 10 Q18 7 20 4" stroke="#94A3B8" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M26 12 Q28 9 26 6" stroke="#94A3B8" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleBeachBall({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="20" r="16" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M20 4 Q28 12 20 20 Q12 28 20 36" fill="#F87171" stroke="none"/>
      <path d="M4 20 Q12 12 20 20 Q28 28 36 20" fill="#7DD3FC" stroke="none"/>
      <circle cx="20" cy="20" r="16" fill="none" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M4 20 Q12 12 20 20 Q28 28 36 20" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M20 4 Q28 12 20 20 Q12 28 20 36" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleSunHat({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="20" cy="28" rx="18" ry="5.5" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M6 24 Q6 12 20 12 Q34 12 34 24 Q34 28 20 28 Q6 28 6 24 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M7 24 Q20 26 33 24" stroke="#F87171" strokeWidth="2.5" fill="none"/>
    </svg>
  );
}

export function DoodleApple({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 36 Q8 36 6 24 Q4 14 12 10 Q16 8 20 12 Q24 8 28 10 Q36 14 34 24 Q32 36 20 36 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M20 12 Q20 8 22 6 Q24 4 22 3" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M22 5 Q26 4 28 6" stroke="#86EFAC" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M10 20 Q14 17 18 20" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.25"/>
    </svg>
  );
}

export function DoodlePineCone({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 36 Q12 30 10 24 Q8 18 12 14 Q16 10 20 12 Q24 10 28 14 Q32 18 30 24 Q28 30 20 36 Z" fill="#B8723A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M13 17 Q17 14 20 16 Q23 14 27 17" stroke="#D4956A" strokeWidth="1.5" fill="none"/>
      <path d="M12 22 Q16 19 20 21 Q24 19 28 22" stroke="#D4956A" strokeWidth="1.5" fill="none"/>
      <path d="M11 27 Q15 24 20 26 Q25 24 29 27" stroke="#D4956A" strokeWidth="1.5" fill="none"/>
      <line x1="20" y1="6" x2="20" y2="12" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 8 Q16 5 18 4" stroke="#86EFAC" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ── 음식 & 카페 ──────────────────────────────────────
export function DoodleSushi({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="8" y="26" width="24" height="8" rx="4" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="16" y="22" width="8" height="12" rx="1" fill="#2D4A3E" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="20" cy="22" rx="12" ry="5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M10 20 Q15 17 20 20 Q25 17 30 20" stroke="#FB923C" strokeWidth="0.8" fill="none" opacity="0.5"/>
    </svg>
  );
}

export function DoodleChocolate({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="6" y="10" width="28" height="20" rx="3" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="6" y1="19" x2="34" y2="19" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="17" y1="10" x2="17" y2="30" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="27" y1="10" x2="27" y2="30" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="6" y="10" width="28" height="4" rx="0" fill="#A05020" stroke="none" opacity="0.4"/>
    </svg>
  );
}

export function DoodleOnigiri({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 6 Q8 14 8 28 Q8 36 20 36 Q32 36 32 28 Q32 14 20 6 Z" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="10" y="27" width="20" height="7" rx="1" fill="#2D4A3E" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="22" r="3.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M15 16 Q20 13 25 16" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.2"/>
    </svg>
  );
}

export function DoodleTaiyaki({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M6 20 Q6 10 14 8 Q22 6 28 10 Q34 14 36 20 Q34 26 28 28 Q22 32 14 30 Q8 28 6 20 Z" fill="#FED7AA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M6 20 Q2 16 2 12 Q6 14 8 18" fill="#FED7AA" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M6 20 Q2 24 2 28 Q6 26 8 22" fill="#FED7AA" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="28" cy="18" r="2" fill="#2D2D2D"/>
      <circle cx="28.7" cy="17.3" r="0.8" fill="white"/>
      <path d="M12 14 Q20 12 28 15" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.35"/>
      <path d="M10 20 Q20 18 30 20" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.35"/>
      <path d="M12 26 Q20 24 28 26" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.35"/>
    </svg>
  );
}

// ── 감성 기본 ──────────────────────────────────────
export function DoodleDiamond({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 36 L4 18 L10 6 L30 6 L36 18 Z" fill="#BAE6FD" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="4" y1="18" x2="36" y2="18" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="10" y1="6" x2="20" y2="36" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.35"/>
      <line x1="30" y1="6" x2="20" y2="36" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.35"/>
      <path d="M14 14 Q20 10 26 14" fill="#E0F2FE" stroke="none" opacity="0.6"/>
    </svg>
  );
}

export function DoodleComet({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M6 36 Q14 26 24 20" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.35"/>
      <path d="M4 30 Q12 24 22 20" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
      <path d="M6 26 Q12 22 20 20" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" opacity="0.15"/>
      <circle cx="27" cy="16" r="7" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="25" cy="14" r="2" fill="white" opacity="0.5"/>
    </svg>
  );
}

export function DoodleInfinity({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 20 Q16 12 10 12 Q4 12 4 20 Q4 28 10 28 Q16 28 20 20 Q24 12 30 12 Q36 12 36 20 Q36 28 30 28 Q24 28 20 20 Z" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

export function DoodleSparkles({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 6 L21.8 14 L30 14 L23.4 18.6 L26 26 L20 21.4 L14 26 L16.6 18.6 L10 14 L18.2 14 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M32 8 L32.8 11 L36 11 L33.4 12.8 L34.4 16 L32 14.2 L29.6 16 L30.6 12.8 L28 11 L31.2 11 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round"/>
      <path d="M9 28 L9.5 30 L12 30 L10 31.3 L10.6 34 L9 32.7 L7.4 34 L8 31.3 L6 30 L8.5 30 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round"/>
    </svg>
  );
}

// ── 꽃 & 자연 ──────────────────────────────────────
export function DoodleLavender({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <line x1="14" y1="36" x2="14" y2="16" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="36" x2="20" y2="12" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="26" y1="36" x2="26" y2="16" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="14" cy="14" rx="2.5" ry="4" fill="#C4B5FD" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="14" cy="10" rx="2" ry="3" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="20" cy="10" rx="2.5" ry="4" fill="#C4B5FD" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="20" cy="6" rx="2" ry="3" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="26" cy="14" rx="2.5" ry="4" fill="#C4B5FD" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="26" cy="10" rx="2" ry="3" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleBamboo({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="10" y="4" width="8" height="34" rx="4" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="10" y1="14" x2="18" y2="14" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="10" y1="24" x2="18" y2="24" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="22" y="8" width="8" height="30" rx="4" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="22" y1="18" x2="30" y2="18" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="22" y1="28" x2="30" y2="28" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M18 10 Q24 6 20 12" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M22 20 Q16 15 20 21" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
    </svg>
  );
}

export function DoodleWaterLily({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="20" cy="32" rx="16" ry="4" fill="#BAE6FD" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M20 32 Q20 22 30 24 Q36 28 30 32 Q24 36 20 32 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M20 32 Q20 22 10 24 Q4 28 10 32 Q16 36 20 32 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="20" cy="24" r="5" fill="#FDF4FF" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="20" r="3" fill="#FDF4FF" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="24" cy="23" r="3" fill="#FDF4FF" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="16" cy="23" r="3" fill="#FDF4FF" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="20" cy="24" r="3" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleHibiscus({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 20 Q16 10 14 4 Q20 8 20 20 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M20 20 Q10 16 4 14 Q8 20 20 20 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M20 20 Q10 24 6 30 Q14 28 20 20 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M20 20 Q24 30 24 36 Q20 32 20 20 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M20 20 Q30 24 34 30 Q26 28 20 20 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M20 20 Q30 16 36 14 Q32 20 20 20 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="20" r="5" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="20" y1="15" x2="20" y2="20" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="20" cy="14" r="2" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

// ── 홈 & 인테리어 ──────────────────────────────────────
export function DoodlePictureFrame({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="4" y="4" width="32" height="32" rx="3" fill="#D4956A" stroke="#2D2D2D" strokeWidth="2"/>
      <rect x="10" y="10" width="20" height="20" rx="1" fill="#BAE6FD" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M10 24 Q16 18 22 24 Q26 20 30 24" fill="#4ADE80" stroke="none" opacity="0.5"/>
      <circle cx="22" cy="16" r="3" fill="#FDE047" opacity="0.7" stroke="none"/>
    </svg>
  );
}

export function DoodleBookshelf({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="4" y="4" width="32" height="3" rx="1" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="4" y="22" width="32" height="3" rx="1" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="4" y="37" width="32" height="3" rx="1" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="7" y="7" width="5" height="15" rx="1" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="13" y="9" width="4" height="13" rx="1" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="18" y="7" width="6" height="15" rx="1" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="25" y="8" width="4" height="14" rx="1" fill="#7DD3FC" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="30" y="7" width="4" height="15" rx="1" fill="#C4B5FD" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="7" y="25" width="6" height="12" rx="1" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="14" y="25" width="4" height="12" rx="1" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="19" y="25" width="5" height="12" rx="1" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="25" y="25" width="8" height="12" rx="1" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleBlanket({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M6 10 Q20 8 34 10 Q36 20 34 30 Q20 32 6 30 Q4 20 6 10 Z" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M6 16 Q20 14 34 16" stroke="#A78BFA" strokeWidth="1.5" fill="none"/>
      <path d="M6 22 Q20 20 34 22" stroke="#A78BFA" strokeWidth="1.5" fill="none"/>
      <path d="M6 28 Q20 26 34 28" stroke="#A78BFA" strokeWidth="1.5" fill="none"/>
      <line x1="8" y1="30" x2="7" y2="36" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="14" y1="31" x2="13" y2="37" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="20" y1="32" x2="20" y2="38" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="26" y1="31" x2="27" y2="37" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="32" y1="30" x2="33" y2="36" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodlePlantPot({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M12 22 Q10 36 20 36 Q30 36 28 22 Z" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="10" y="18" width="20" height="5" rx="2" fill="#B8723A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="20" rx="8" ry="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M20 20 Q18 14 14 10" stroke="#4ADE80" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M20 20 Q22 12 24 8" stroke="#4ADE80" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M20 20 Q20 14 20 10" stroke="#4ADE80" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="13" cy="9" rx="4" ry="2.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" transform="rotate(-30 13 9)"/>
      <ellipse cx="24" cy="7" rx="4" ry="2.5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" transform="rotate(20 24 7)"/>
      <ellipse cx="20" cy="9" rx="3.5" ry="2" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

// ── 패션 & 뷰티 ──────────────────────────────────────
export function DoodleDress({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M14 4 Q12 8 10 12 L14 16 L26 16 L30 12 Q28 8 26 4 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 16 Q8 22 6 36 L34 36 Q32 22 26 16 Z" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 4 Q20 7 24 4" stroke="#2D2D2D" strokeWidth="1" fill="none"/>
      <path d="M20 16 Q18 12 16 14 Q18 16 20 16 Q22 16 24 14 Q22 12 20 16 Z" fill="#EC4899" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

export function DoodleHighHeels({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M6 30 Q8 24 14 22 Q20 20 26 22 Q32 24 34 22 Q36 20 36 26 Q34 28 30 30 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 30 Q4 32 4 36 L8 36 L8 30" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="4" y1="36" x2="34" y2="36" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleGlasses({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="13" cy="22" r="8" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.8"/>
      <circle cx="27" cy="22" r="8" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.8"/>
      <path d="M21 22 L19 22" stroke="#2D2D2D" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M5 22 L5 18 Q5 14 8 14" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M35 22 L35 18 Q35 14 32 14" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <circle cx="10" cy="22" r="2" fill="#A78BFA" opacity="0.4" stroke="none"/>
      <circle cx="24" cy="22" r="2" fill="#A78BFA" opacity="0.4" stroke="none"/>
    </svg>
  );
}

export function DoodleEarring({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="13" cy="8" r="3" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="13" y1="11" x2="13" y2="16" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="13" cy="23" rx="5" ry="7" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M10 23 Q13 20 16 23" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <circle cx="27" cy="8" r="3" fill="#FDE047" stroke="#2D2D2D" strokeWidth="1.2"/>
      <line x1="27" y1="11" x2="27" y2="16" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="27" cy="23" rx="5" ry="7" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M24 23 Q27 20 30 23" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6"/>
    </svg>
  );
}

// ── 동물 확장 (얼굴 + 전신) ──────────────────────────────────────
export function DoodleCowFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="22" r="14" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="13" cy="10" rx="3" ry="5" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(-10 13 10)"/>
      <ellipse cx="27" cy="10" rx="3" ry="5" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.2" transform="rotate(10 27 10)"/>
      <ellipse cx="13" cy="9" rx="1.8" ry="3" fill="#FBCFE8" stroke="none"/>
      <ellipse cx="27" cy="9" rx="1.8" ry="3" fill="#FBCFE8" stroke="none"/>
      <ellipse cx="11" cy="16" rx="3" ry="2.5" fill="#2D2D2D" opacity="0.2"/>
      <ellipse cx="28" cy="15" rx="2.5" ry="3" fill="#2D2D2D" opacity="0.2"/>
      <circle cx="15" cy="20" r="2.5" fill="#2D2D2D"/>
      <circle cx="25" cy="20" r="2.5" fill="#2D2D2D"/>
      <circle cx="15.8" cy="19.2" r="1" fill="white"/>
      <circle cx="25.8" cy="19.2" r="1" fill="white"/>
      <ellipse cx="20" cy="27" rx="5.5" ry="4" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="18" cy="27" r="1.2" fill="#2D2D2D" opacity="0.7"/>
      <circle cx="22" cy="27" r="1.2" fill="#2D2D2D" opacity="0.7"/>
    </svg>
  );
}

export function DoodleCow({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="18" cy="26" rx="13" ry="9" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="10" cy="22" rx="3.5" ry="2.5" fill="#2D2D2D" opacity="0.2"/>
      <ellipse cx="25" cy="30" rx="3" ry="2" fill="#2D2D2D" opacity="0.2"/>
      <rect x="8" y="33" width="4" height="6" rx="2" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="14" y="34" width="4" height="5" rx="2" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="20" y="34" width="4" height="5" rx="2" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="26" y="33" width="4" height="6" rx="2" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="34" cy="18" r="8" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="38" cy="13" rx="2" ry="3" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="38" cy="12.5" rx="1.2" ry="2" fill="#FBCFE8" stroke="none"/>
      <circle cx="31" cy="16" r="1.8" fill="#2D2D2D"/>
      <circle cx="31.7" cy="15.3" r="0.7" fill="white"/>
      <ellipse cx="36" cy="21" rx="3.5" ry="2.5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="34.5" cy="21" r="1" fill="#2D2D2D" opacity="0.6"/>
      <circle cx="37" cy="21" r="1" fill="#2D2D2D" opacity="0.6"/>
      <path d="M5 24 Q1 22 1 28 Q2 32 6 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleHorseFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="20" cy="24" rx="10" ry="12" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M13 14 Q11 8 14 10 L15 14 Z" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M27 14 Q29 8 26 10 L25 14 Z" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M11 15 Q8 18 9 26" stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="16" cy="20" r="2.5" fill="#2D2D2D"/>
      <circle cx="24" cy="20" r="2.5" fill="#2D2D2D"/>
      <circle cx="16.8" cy="19.2" r="1" fill="white"/>
      <circle cx="24.8" cy="19.2" r="1" fill="white"/>
      <ellipse cx="20" cy="30" rx="5" ry="3.5" fill="#C4834A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="18.5" cy="30" r="1" fill="#2D2D2D" opacity="0.5"/>
      <circle cx="21.5" cy="30" r="1" fill="#2D2D2D" opacity="0.5"/>
    </svg>
  );
}

export function DoodleHorse({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="17" cy="25" rx="12" ry="8" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="25" y="14" width="7" height="12" rx="3.5" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="33" cy="11" rx="6" ry="7" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="35" cy="9" r="1.5" fill="#2D2D2D"/>
      <circle cx="35.6" cy="8.4" r="0.6" fill="white"/>
      <ellipse cx="35" cy="14" rx="3" ry="2" fill="#C4834A" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M27 14 Q23 17 25 23" stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <rect x="7" y="31" width="4" height="8" rx="2" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="13" y="32" width="4" height="7" rx="2" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="19" y="32" width="4" height="7" rx="2" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="25" y="31" width="4" height="8" rx="2" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M5 23 Q0 21 0 27 Q2 31 6 28" stroke="#92400E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleSheepFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="14" cy="16" r="7" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="26" cy="16" r="7" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="12" r="7" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="20" cy="26" rx="8" ry="8" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="9" cy="24" rx="3.5" ry="5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="31" cy="24" rx="3.5" ry="5" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="16" cy="23" r="2" fill="#2D2D2D"/>
      <circle cx="24" cy="23" r="2" fill="#2D2D2D"/>
      <circle cx="16.7" cy="22.3" r="0.8" fill="white"/>
      <circle cx="24.7" cy="22.3" r="0.8" fill="white"/>
      <ellipse cx="20" cy="29" rx="3" ry="2" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M18 31 Q20 33 22 31" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleSheep({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="14" cy="22" r="8" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="24" cy="20" r="8" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="28" r="7" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="10" cy="28" r="6" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="30" cy="26" r="6" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="32" cy="13" r="7" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="34" cy="11" r="1.8" fill="#2D2D2D"/>
      <circle cx="34.6" cy="10.4" r="0.7" fill="white"/>
      <ellipse cx="34" cy="16" rx="3" ry="2" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="0.8"/>
      <rect x="10" y="33" width="3" height="6" rx="1.5" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="16" y="34" width="3" height="5" rx="1.5" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="22" y="34" width="3" height="5" rx="1.5" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="28" y="33" width="3" height="6" rx="1.5" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.2"/>
    </svg>
  );
}

export function DoodleMonkeyFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="22" r="13" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="6" cy="20" r="6" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="34" cy="20" r="6" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="6" cy="20" r="3.5" fill="#FCA5A5" stroke="none"/>
      <circle cx="34" cy="20" r="3.5" fill="#FCA5A5" stroke="none"/>
      <ellipse cx="20" cy="27" rx="9" ry="7" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="15" cy="19" r="2.5" fill="#2D2D2D"/>
      <circle cx="25" cy="19" r="2.5" fill="#2D2D2D"/>
      <circle cx="15.8" cy="18.2" r="1" fill="white"/>
      <circle cx="25.8" cy="18.2" r="1" fill="white"/>
      <circle cx="18.5" cy="25" r="1" fill="#2D2D2D" opacity="0.6"/>
      <circle cx="21.5" cy="25" r="1" fill="#2D2D2D" opacity="0.6"/>
      <path d="M17 28 Q20 31 23 28" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleMonkey({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="20" cy="29" rx="10" ry="8" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M10 26 Q4 24 4 30 Q4 34 8 33" stroke="#2D2D2D" strokeWidth="1.5" fill="#D4956A" strokeLinecap="round"/>
      <path d="M30 26 Q36 24 36 30 Q36 34 32 33" stroke="#2D2D2D" strokeWidth="1.5" fill="#D4956A" strokeLinecap="round"/>
      <circle cx="20" cy="14" r="10" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="10" cy="14" r="5" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="30" cy="14" r="5" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="10" cy="14" r="3" fill="#FCA5A5" stroke="none"/>
      <circle cx="30" cy="14" r="3" fill="#FCA5A5" stroke="none"/>
      <ellipse cx="20" cy="18" rx="7" ry="5" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="16" cy="12" r="2" fill="#2D2D2D"/>
      <circle cx="24" cy="12" r="2" fill="#2D2D2D"/>
      <circle cx="16.7" cy="11.3" r="0.8" fill="white"/>
      <circle cx="24.7" cy="11.3" r="0.8" fill="white"/>
      <circle cx="19" cy="17" r="0.8" fill="#2D2D2D" opacity="0.6"/>
      <circle cx="21" cy="17" r="0.8" fill="#2D2D2D" opacity="0.6"/>
      <path d="M20 37 Q14 40 10 36 Q8 32 12 33" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <rect x="14" y="35" width="5" height="5" rx="2.5" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="21" y="35" width="5" height="5" rx="2.5" fill="#D4956A" stroke="#2D2D2D" strokeWidth="1.2"/>
    </svg>
  );
}

export function DoodleRoosterFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M14 12 Q14 4 16 6 Q17 4 18 6 Q19 4 20 6 Q21 4 22 6 Q23 4 24 6 Q26 4 26 12" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="22" r="12" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="16" cy="31" rx="4" ry="5" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M8 21 L14 19 L14 23 Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="23" cy="18" r="3" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="23" cy="18" r="1.8" fill="#2D2D2D"/>
      <circle cx="23.6" cy="17.4" r="0.7" fill="white"/>
      <circle cx="24" cy="23" r="3" fill="#FCA5A5" stroke="none" opacity="0.5"/>
    </svg>
  );
}

export function DoodleRooster({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M4 12 Q2 6 6 8 Q4 4 8 8 Q6 2 10 8 Q8 4 12 10" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <ellipse cx="22" cy="27" rx="12" ry="9" fill="#FEF9C3" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M14 24 Q16 18 24 20 Q28 22 26 28" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="28" y="15" width="7" height="12" rx="3.5" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="32" cy="13" r="7" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M28 8 Q29 4 30 6 Q31 3 32 6 Q33 4 34 6 Q35 4 36 8" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="29" cy="18" rx="3" ry="4" fill="#DC2626" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M25 12 L30 10 L30 14 Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="33" cy="11" r="2" fill="#2D2D2D"/>
      <circle cx="33.6" cy="10.4" r="0.7" fill="white"/>
      <line x1="18" y1="36" x2="16" y2="39" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="39" x2="13" y2="39" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="24" y1="36" x2="22" y2="39" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="22" y1="39" x2="19" y2="39" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodlePigFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="22" r="14" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M9 14 Q6 7 10 9 L12 14 Z" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M31 14 Q34 7 30 9 L28 14 Z" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M9.5 14 Q8 9 10.5 10.5 L11.5 14 Z" fill="#F9A8D4" stroke="none"/>
      <path d="M30.5 14 Q32 9 29.5 10.5 L28.5 14 Z" fill="#F9A8D4" stroke="none"/>
      <circle cx="15" cy="20" r="2.5" fill="#2D2D2D"/>
      <circle cx="25" cy="20" r="2.5" fill="#2D2D2D"/>
      <circle cx="15.8" cy="19.2" r="1" fill="white"/>
      <circle cx="25.8" cy="19.2" r="1" fill="white"/>
      <ellipse cx="20" cy="28" rx="7" ry="5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="17.5" cy="28" r="1.8" fill="#2D2D2D" opacity="0.5"/>
      <circle cx="22.5" cy="28" r="1.8" fill="#2D2D2D" opacity="0.5"/>
    </svg>
  );
}

export function DoodlePig({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="17" cy="26" rx="13" ry="9" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="33" cy="20" r="8" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M35 13 Q37 9 36 11 L35 13 Z" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="31" cy="18" r="2" fill="#2D2D2D"/>
      <circle cx="31.7" cy="17.3" r="0.8" fill="white"/>
      <ellipse cx="35" cy="23" rx="4" ry="3" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="33.5" cy="23" r="1.2" fill="#2D2D2D" opacity="0.5"/>
      <circle cx="36.5" cy="23" r="1.2" fill="#2D2D2D" opacity="0.5"/>
      <rect x="7" y="33" width="4" height="6" rx="2" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="13" y="34" width="4" height="5" rx="2" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="19" y="34" width="4" height="5" rx="2" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="25" y="33" width="4" height="6" rx="2" fill="#FCA5A5" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M4 24 Q0 22 2 28 Q4 32 2 34" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleLionFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="20" r="18" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="20" r="12" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="15" cy="17" r="2.5" fill="#2D2D2D"/>
      <circle cx="25" cy="17" r="2.5" fill="#2D2D2D"/>
      <circle cx="15.8" cy="16.2" r="1" fill="white"/>
      <circle cx="25.8" cy="16.2" r="1" fill="white"/>
      <path d="M18 22 L20 24 L22 22 Q20 20 18 22 Z" fill="#2D2D2D"/>
      <line x1="8" y1="22" x2="16" y2="22" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.5"/>
      <line x1="8" y1="24" x2="16" y2="23" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.5"/>
      <line x1="24" y1="22" x2="32" y2="22" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.5"/>
      <line x1="24" y1="23" x2="32" y2="24" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.5"/>
      <path d="M16 26 Q20 29 24 26" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleLion({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="17" cy="28" rx="13" ry="9" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="7" y="34" width="4" height="5" rx="2" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="13" y="35" width="4" height="4" rx="2" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="19" y="35" width="4" height="4" rx="2" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="25" y="34" width="4" height="5" rx="2" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="32" cy="16" r="11" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="32" cy="16" r="8" fill="#FDE8C8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="29" cy="14" r="2" fill="#2D2D2D"/>
      <circle cx="29.7" cy="13.3" r="0.8" fill="white"/>
      <path d="M30 18 L32 20 L34 18 Q32 16 30 18 Z" fill="#2D2D2D"/>
      <path d="M28 22 Q32 24 36 22" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M4 26 Q0 24 0 30 Q2 36 6 32" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="6" cy="32" r="3" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleElephantFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="5" cy="22" rx="7" ry="10" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="35" cy="22" rx="7" ry="10" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="5" cy="22" rx="4.5" ry="7" fill="#FCA5A5" stroke="none" opacity="0.5"/>
      <ellipse cx="35" cy="22" rx="4.5" ry="7" fill="#FCA5A5" stroke="none" opacity="0.5"/>
      <circle cx="20" cy="20" r="14" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="14" cy="16" r="2.5" fill="#2D2D2D"/>
      <circle cx="26" cy="16" r="2.5" fill="#2D2D2D"/>
      <circle cx="14.8" cy="15.2" r="1" fill="white"/>
      <circle cx="26.8" cy="15.2" r="1" fill="white"/>
      <path d="M20 26 Q16 30 16 36 Q18 38 20 36 Q22 34 20 32" stroke="#2D2D2D" strokeWidth="2" fill="#94A3B8" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleElephant({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="17" cy="26" rx="14" ry="9" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="6" y="32" width="5" height="7" rx="2.5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="13" y="33" width="5" height="6" rx="2.5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="20" y="33" width="5" height="6" rx="2.5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="27" y="32" width="5" height="7" rx="2.5" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="34" cy="18" r="9" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="39" cy="19" rx="5" ry="7" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="39" cy="19" rx="3" ry="5" fill="#FCA5A5" stroke="none" opacity="0.5"/>
      <circle cx="31" cy="16" r="2" fill="#2D2D2D"/>
      <circle cx="31.7" cy="15.3" r="0.8" fill="white"/>
      <path d="M34 24 Q30 28 28 34 Q30 36 32 34 Q34 30 34 26" stroke="#2D2D2D" strokeWidth="2" fill="#94A3B8" strokeLinecap="round"/>
      <path d="M3 24 Q0 22 2 28" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleDinoFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M12 12 L14 4 L16 12" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M18 10 L20 2 L22 10" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M24 12 L26 4 L28 12" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <ellipse cx="20" cy="24" rx="14" ry="12" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="14" cy="19" r="3" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="26" cy="19" r="3" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="14" cy="19" r="1.8" fill="#2D2D2D"/>
      <circle cx="26" cy="19" r="1.8" fill="#2D2D2D"/>
      <circle cx="14.6" cy="18.4" r="0.7" fill="white"/>
      <circle cx="26.6" cy="18.4" r="0.7" fill="white"/>
      <circle cx="18" cy="26" r="1.2" fill="#2D2D2D" opacity="0.5"/>
      <circle cx="22" cy="26" r="1.2" fill="#2D2D2D" opacity="0.5"/>
      <path d="M13 30 Q20 34 27 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleDino({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M4 28 Q0 24 2 20 Q4 18 6 22" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="17" cy="26" rx="12" ry="9" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M9 18 L11 11 L13 18" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M15 17 L17 9 L19 17" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M21 18 L23 11 L25 18" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <rect x="25" y="14" width="7" height="12" rx="3.5" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="33" cy="12" rx="6" ry="7" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="35" cy="9" r="2" fill="#2D2D2D"/>
      <circle cx="35.7" cy="8.3" r="0.8" fill="white"/>
      <path d="M28 16 L31 16 L30 18 Z" fill="#FDE047" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M25 24 Q21 22 19 24" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <rect x="9" y="32" width="5" height="7" rx="2.5" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="17" y="32" width="5" height="7" rx="2.5" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.2"/>
    </svg>
  );
}

export function DoodlePandaFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="22" r="14" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="9" cy="10" r="6" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="31" cy="10" r="6" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="14" cy="19" rx="5" ry="5.5" fill="#2D2D2D" transform="rotate(-15 14 19)"/>
      <ellipse cx="26" cy="19" rx="5" ry="5.5" fill="#2D2D2D" transform="rotate(15 26 19)"/>
      <circle cx="14" cy="19" r="2.5" fill="white"/>
      <circle cx="26" cy="19" r="2.5" fill="white"/>
      <circle cx="14" cy="19" r="1.5" fill="#2D2D2D"/>
      <circle cx="26" cy="19" r="1.5" fill="#2D2D2D"/>
      <circle cx="14.6" cy="18.4" r="0.6" fill="white"/>
      <circle cx="26.6" cy="18.4" r="0.6" fill="white"/>
      <ellipse cx="20" cy="27" rx="3" ry="2" fill="#2D2D2D"/>
      <path d="M18 29 Q20 32 22 29" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodlePanda({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="20" cy="28" rx="13" ry="9" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="30" rx="7" ry="5" fill="#F8FAFC" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="7" cy="26" rx="5" ry="4" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1" transform="rotate(-30 7 26)"/>
      <ellipse cx="33" cy="26" rx="5" ry="4" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1" transform="rotate(30 33 26)"/>
      <ellipse cx="14" cy="37" rx="5" ry="3" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="26" cy="37" rx="5" ry="3" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="20" cy="14" r="11" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="10" cy="8" r="5" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="30" cy="8" r="5" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1"/>
      <ellipse cx="15" cy="15" rx="4.5" ry="5" fill="#2D2D2D" transform="rotate(-15 15 15)"/>
      <ellipse cx="25" cy="15" rx="4.5" ry="5" fill="#2D2D2D" transform="rotate(15 25 15)"/>
      <circle cx="15" cy="15" r="2" fill="white"/>
      <circle cx="25" cy="15" r="2" fill="white"/>
      <circle cx="15" cy="15" r="1.2" fill="#2D2D2D"/>
      <circle cx="25" cy="15" r="1.2" fill="#2D2D2D"/>
      <circle cx="15.5" cy="14.5" r="0.5" fill="white"/>
      <circle cx="25.5" cy="14.5" r="0.5" fill="white"/>
      <ellipse cx="20" cy="20" rx="3" ry="2" fill="#2D2D2D"/>
    </svg>
  );
}

export function DoodleOctopusFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M8 28 Q6 34 10 32 Q10 36 14 34" stroke="#C4B5FD" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M16 30 Q16 36 20 34" stroke="#C4B5FD" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M32 28 Q34 34 30 32 Q30 36 26 34" stroke="#C4B5FD" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M24 30 Q24 36 20 34" stroke="#C4B5FD" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="20" cy="17" rx="14" ry="13" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="14" cy="15" r="4" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="26" cy="15" r="4" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="14" cy="15" r="2.5" fill="#2D2D2D"/>
      <circle cx="26" cy="15" r="2.5" fill="#2D2D2D"/>
      <circle cx="14.8" cy="14.2" r="1" fill="white"/>
      <circle cx="26.8" cy="14.2" r="1" fill="white"/>
      <path d="M16 23 Q20 26 24 23" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleOctopus({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M8 24 Q4 30 6 36 Q8 38 10 34 Q10 38 14 36" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M14 26 Q12 34 14 38 Q16 40 18 36" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M20 27 Q20 34 20 38" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M26 26 Q28 34 26 38 Q24 40 22 36" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M32 24 Q36 30 34 36 Q32 38 30 34 Q30 38 26 36" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="20" cy="16" rx="14" ry="12" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="14" cy="14" r="3.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="26" cy="14" r="3.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="14" cy="14" r="2" fill="#2D2D2D"/>
      <circle cx="26" cy="14" r="2" fill="#2D2D2D"/>
      <circle cx="14.7" cy="13.3" r="0.8" fill="white"/>
      <circle cx="26.7" cy="13.3" r="0.8" fill="white"/>
      <path d="M16 20 Q20 23 24 20" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleCrocFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M4 28 Q4 36 20 36 Q36 36 36 28 L32 24 L8 24 Z" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M4 28 Q4 18 20 16 Q36 18 36 28 L32 24 L8 24 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="14" cy="14" r="5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="26" cy="14" r="5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="14" cy="14" r="3" fill="#FEF9C3"/>
      <circle cx="26" cy="14" r="3" fill="#FEF9C3"/>
      <ellipse cx="14" cy="14" rx="1.5" ry="2.5" fill="#2D2D2D"/>
      <ellipse cx="26" cy="14" rx="1.5" ry="2.5" fill="#2D2D2D"/>
      <path d="M12 24 L13 28 L14 24" fill="white" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M18 24 L19 28 L20 24" fill="white" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M24 24 L25 28 L26 24" fill="white" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

export function DoodleCroc({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M4 24 Q0 20 2 28 Q0 32 4 28" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="4" y="20" width="30" height="12" rx="6" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="10" cy="19" r="3" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="18" cy="18" r="3" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="26" cy="19" r="3" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="30" y="17" width="10" height="9" rx="3" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="37" cy="17" r="3" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="37" cy="17" r="1.5" fill="#FEF9C3"/>
      <ellipse cx="37" cy="17" rx="0.8" ry="1.2" fill="#2D2D2D"/>
      <path d="M33 26 L34 30 L35 26" fill="white" stroke="#2D2D2D" strokeWidth="0.8"/>
      <rect x="8" y="30" width="5" height="6" rx="2.5" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="22" y="30" width="5" height="6" rx="2.5" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.2"/>
    </svg>
  );
}

export function DoodleFlamingoFace({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="18" r="12" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M20 30 Q20 36 20 38" stroke="#FBCFE8" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="24" cy="15" r="2.5" fill="#2D2D2D"/>
      <circle cx="24.8" cy="14.2" r="1" fill="white"/>
      <path d="M13 18 L9 20 Q7 24 11 24 Q13 22 13 20" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="22" cy="21" r="4" fill="#F9A8D4" stroke="none" opacity="0.4"/>
    </svg>
  );
}

export function DoodleFlamingo({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <line x1="22" y1="32" x2="22" y2="38" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <line x1="22" y1="38" x2="20" y2="40" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="20" cy="28" rx="10" ry="6" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M12 26 Q14 22 20 24" stroke="#F9A8D4" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M26 22 Q32 16 28 8" stroke="#FBCFE8" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M26 22 Q32 16 28 8" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="26" cy="6" r="6" fill="#FBCFE8" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="28" cy="5" r="2" fill="#2D2D2D"/>
      <circle cx="28.7" cy="4.3" r="0.8" fill="white"/>
      <path d="M21 6 L18 8 Q16 11 19 11 Q21 10 21 8" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

export function DoodleJellyfish({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M8 20 Q8 8 20 8 Q32 8 32 20 Q32 26 20 28 Q8 26 8 20 Z" fill="#DDD6FE" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 18 Q20 16 28 18" stroke="#A78BFA" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M10 22 Q20 20 30 22" stroke="#A78BFA" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <circle cx="16" cy="19" r="1.5" fill="#2D2D2D"/>
      <circle cx="24" cy="19" r="1.5" fill="#2D2D2D"/>
      <circle cx="16.5" cy="18.5" r="0.6" fill="white"/>
      <circle cx="24.5" cy="18.5" r="0.6" fill="white"/>
      <path d="M13 28 Q11 32 13 36" stroke="#A78BFA" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M17 28 Q15 33 17 37" stroke="#A78BFA" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M20 28 Q20 33 20 38" stroke="#A78BFA" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M23 28 Q25 33 23 37" stroke="#A78BFA" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M27 28 Q29 32 27 36" stroke="#A78BFA" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleSeahorse({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="24" cy="9" r="5" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M28 8 L34 6" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="25" cy="7.5" r="1.5" fill="#2D2D2D"/>
      <circle cx="25.5" cy="7" r="0.6" fill="white"/>
      <path d="M22 6 Q20 4 22 3 Q24 2 24 4" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M22 13 Q20 18 18 22 Q16 26 16 30 Q16 34 20 35 Q24 36 25 32" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M21 14 Q17 15 18 19 Q19 22 20 22" stroke="#FCD34D" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M21 14 Q17 15 18 19 Q19 22 20 22" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M25 32 Q28 33 28 30 Q28 26 24 27" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M19 19 Q21 19 22 21" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <path d="M18 23 Q20 23 21 25" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.6"/>
    </svg>
  );
}

export function DoodlePufferfish({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="22" r="13" fill="#86EFAC" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="26" rx="7" ry="5" fill="#BBF7D0" opacity="0.5"/>
      <line x1="20" y1="9" x2="20" y2="5" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="27" y1="11" x2="30" y2="8" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="33" y1="18" x2="37" y2="17" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="33" y1="26" x2="37" y2="27" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="27" y1="33" x2="30" y2="36" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="35" x2="20" y2="38" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="33" x2="10" y2="36" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7" y1="26" x2="3" y2="27" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7" y1="18" x2="3" y2="17" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="11" x2="10" y2="8" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="15" cy="20" r="3" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="25" cy="20" r="3" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="15" cy="20" r="1.5" fill="#2D2D2D"/>
      <circle cx="25" cy="20" r="1.5" fill="#2D2D2D"/>
      <circle cx="15.5" cy="19.5" r="0.6" fill="white"/>
      <circle cx="25.5" cy="19.5" r="0.6" fill="white"/>
      <ellipse cx="20" cy="26" rx="3" ry="2" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleTropicalFish({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M30 20 L38 14 L36 20 L38 26 Z" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <ellipse cx="18" cy="20" rx="14" ry="10" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.5"/>
      <path d="M14 11 Q11 20 14 29" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M8 13 Q5 20 8 27" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M10 11 Q14 6 18 10" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M12 29 Q16 34 20 30" fill="#F97316" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="7" cy="18" r="3" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="7" cy="18" r="1.5" fill="#2D2D2D"/>
      <circle cx="7.5" cy="17.5" r="0.6" fill="white"/>
    </svg>
  );
}

export function DoodleCrab({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M4 18 Q2 14 4 12 Q7 10 9 13 Q10 15 8 17 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M4 18 Q2 22 4 24 Q7 26 9 23 Q10 21 8 19 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M36 18 Q38 14 36 12 Q33 10 31 13 Q30 15 32 17 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M36 18 Q38 22 36 24 Q33 26 31 23 Q30 21 32 19 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <line x1="10" y1="22" x2="5" y2="28" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="24" x2="8" y2="30" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="30" y1="22" x2="35" y2="28" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="28" y1="24" x2="32" y2="30" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="20" cy="22" rx="12" ry="9" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
      <ellipse cx="20" cy="24" rx="7" ry="5" fill="#FCA5A5" opacity="0.5"/>
      <line x1="15" y1="14" x2="14" y2="10" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="25" y1="14" x2="26" y2="10" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="14" cy="9" r="2.5" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="26" cy="9" r="2.5" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="14" cy="9" r="1.2" fill="#2D2D2D"/>
      <circle cx="26" cy="9" r="1.2" fill="#2D2D2D"/>
      <path d="M16 26 Q20 28 24 26" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleShrimp({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M28 6 Q32 3 36 4" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M26 7 Q28 3 32 2" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <ellipse cx="26" cy="9" rx="5" ry="4" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="28" cy="7.5" r="1.5" fill="#2D2D2D"/>
      <circle cx="28.5" cy="7" r="0.6" fill="white"/>
      <path d="M22 12 Q18 16 16 20 Q14 25 16 30 Q18 34 22 34" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 14 Q17 17 16 22" stroke="#EA580C" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <path d="M19 19 Q16 23 17 27" stroke="#EA580C" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <path d="M22 34 Q24 38 20 38 Q16 38 18 34" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M22 34 Q26 38 28 36 Q28 32 24 33" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <line x1="20" y1="16" x2="17" y2="14" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="18" y1="20" x2="15" y2="18" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="17" y1="25" x2="14" y2="23" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleCoral({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <ellipse cx="20" cy="37" rx="10" ry="3" fill="#FED7AA" stroke="#2D2D2D" strokeWidth="1"/>
      <line x1="20" y1="34" x2="20" y2="24" stroke="#F472B6" strokeWidth="3" strokeLinecap="round"/>
      <path d="M19 28 Q14 24 12 18 Q11 14 14 12" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="14" cy="11" r="3" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="11" cy="16" r="2.5" fill="#FB7185" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M21 28 Q26 24 28 18 Q29 14 26 12" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="26" cy="11" r="3" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="29" cy="16" r="2.5" fill="#FB7185" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="20" cy="23" r="3.5" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="18" cy="20" r="2" fill="#FB7185" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="22" cy="19" r="2" fill="#FB7185" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M15 22 Q10 20 9 15" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="9" cy="14" r="2" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M25 22 Q30 20 31 15" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="31" cy="14" r="2" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleClam({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M6 24 Q6 34 20 36 Q34 34 34 24 Q34 20 20 20 Q6 20 6 24 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 36 L20 22" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M14 35 L12 22" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M26 35 L28 22" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M9 32 L8 24" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M31 32 L32 24" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M6 22 Q8 10 20 8 Q32 10 34 22 Q32 18 20 18 Q8 18 6 22 Z" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 8 L20 18" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M14 9 L12 17" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M26 9 L28 17" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <circle cx="20" cy="21" r="4" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <ellipse cx="18.5" cy="19.8" rx="1.2" ry="0.8" fill="white" opacity="0.7" transform="rotate(-30 18.5 19.8)"/>
    </svg>
  );
}

export function DoodleConch({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M10 30 Q8 22 12 16 Q16 10 22 8 Q28 6 32 10 Q36 14 34 20 Q32 26 26 30 Q20 34 14 34 Q10 34 10 30 Z" fill="#FDBA74" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 28 Q16 24 18 18 Q20 12 26 12 Q30 12 31 16 Q32 20 28 24 Q24 28 20 28" stroke="#EA580C" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M10 30 Q12 36 18 36 Q22 36 24 33" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M22 8 Q24 4 26 5 Q28 6 28 9" fill="#FDBA74" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M24 14 Q28 16 28 20 Q28 24 24 26" stroke="#EA580C" strokeWidth="0.8" fill="none" opacity="0.5"/>
    </svg>
  );
}

export function DoodleBeachUmbrella({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 4 Q10 4 6 16 L14 16 Q16 10 20 8 Q24 10 26 16 L34 16 Q30 4 20 4 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M14 16 Q16 10 20 8 Q24 10 26 16 L20 16 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M6 16 Q13 20 20 16 Q27 20 34 16" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M4 17 Q6 19 8 17 Q10 19 12 17 Q14 19 16 17 Q18 19 20 17 Q22 19 24 17 Q26 19 28 17 Q30 19 32 17 Q34 19 36 17" stroke="#F87171" strokeWidth="1" fill="none"/>
      <line x1="20" y1="16" x2="18" y2="36" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="18" cy="36" rx="4" ry="2" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="1"/>
    </svg>
  );
}

export function DoodleFloatTube({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="20" r="15" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="20" cy="20" r="7" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M20 5 A15 15 0 0 1 32 11 L27 15 A9 9 0 0 0 20 13 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M35 20 A15 15 0 0 1 29 32 L25 27 A9 9 0 0 0 29 20 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M20 35 A15 15 0 0 1 8 29 L13 25 A9 9 0 0 0 20 27 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M5 20 A15 15 0 0 1 11 8 L15 13 A9 9 0 0 0 11 20 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.8"/>
      <path d="M12 9 Q15 7 18 8" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleSurfboard({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 3 Q26 4 28 10 Q30 18 28 28 Q26 36 20 38 Q14 36 12 28 Q10 18 12 10 Q14 4 20 3 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 6 Q23 8 24 14 Q25 22 24 30 Q23 34 20 36" stroke="white" strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round"/>
      <path d="M16 16 Q19 12 22 16 Q25 20 22 22 Q19 24 16 22 Q13 20 16 16 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.85"/>
      <path d="M18 35 Q16 38 20 38 Q24 38 22 35" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M15 6 Q14 10 14 14" stroke="white" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleBucketSpade({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M26 6 Q30 6 31 10 Q32 14 29 16 L24 16 Q21 14 22 10 Q23 6 26 6 Z" fill="#6EE7B7" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <line x1="26" y1="16" x2="22" y2="34" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="22" cy="35" rx="3" ry="1.5" fill="#92400E" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M6 18 Q5 30 8 34 Q10 36 15 36 Q20 36 22 34 Q25 30 24 18 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 18 Q15 20 24 18" stroke="#2D2D2D" strokeWidth="1.2" fill="none"/>
      <path d="M8 18 Q15 12 22 18" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M7 24 Q15 26 23 24" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.5"/>
    </svg>
  );
}

export function DoodleSandcastle({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M4 36 Q20 32 36 36" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <rect x="8" y="26" width="24" height="10" rx="1" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="8" y="23" width="5" height="4" rx="1" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="15" y="23" width="5" height="4" rx="1" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="22" y="23" width="5" height="4" rx="1" fill="#FCD34D" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="14" y="14" width="12" height="14" rx="1" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="14" y="11" width="4" height="4" rx="1" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1"/>
      <rect x="20" y="11" width="4" height="4" rx="1" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1"/>
      <line x1="20" y1="11" x2="20" y2="5" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M20 5 L26 7 L20 9 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round"/>
      <path d="M17 36 L17 28 Q20 26 23 28 L23 36" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="0.8"/>
      <rect x="10" y="28" width="3" height="3" rx="0.5" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="0.8"/>
      <rect x="27" y="28" width="3" height="3" rx="0.5" fill="#F59E0B" stroke="#2D2D2D" strokeWidth="0.8"/>
    </svg>
  );
}

export function DoodleBeachTowel({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="4" y="10" width="32" height="22" rx="2" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="4" y="10" width="32" height="4" rx="2" fill="#F87171"/>
      <rect x="4" y="14" width="32" height="4" fill="#60A5FA"/>
      <rect x="4" y="18" width="32" height="4" fill="#FBBF24"/>
      <rect x="4" y="22" width="32" height="4" fill="#4ADE80"/>
      <rect x="4" y="26" width="32" height="6" rx="2" fill="#FB923C"/>
      <rect x="4" y="10" width="32" height="22" rx="2" fill="none" stroke="#2D2D2D" strokeWidth="1.5"/>
      <line x1="7" y1="10" x2="6" y2="6" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="11" y1="10" x2="10" y2="6" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="15" y1="10" x2="14" y2="6" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="19" y1="10" x2="18" y2="6" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="23" y1="10" x2="22" y2="6" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="27" y1="10" x2="26" y2="6" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="31" y1="10" x2="30" y2="6" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="7" y1="32" x2="6" y2="36" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="11" y1="32" x2="10" y2="36" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="15" y1="32" x2="14" y2="36" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="19" y1="32" x2="18" y2="36" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="23" y1="32" x2="22" y2="36" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="27" y1="32" x2="26" y2="36" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <line x1="31" y1="32" x2="30" y2="36" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleSunscreen({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <rect x="13" y="6" width="14" height="6" rx="3" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.2"/>
      <rect x="11" y="11" width="18" height="26" rx="4" fill="white" stroke="#2D2D2D" strokeWidth="1.5"/>
      <rect x="13" y="16" width="14" height="16" rx="2" fill="#DBEAFE" stroke="#2D2D2D" strokeWidth="0.8"/>
      <circle cx="20" cy="22" r="4" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1"/>
      <line x1="20" y1="16" x2="20" y2="14" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="20" y1="30" x2="20" y2="28" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="14" y1="22" x2="12" y2="22" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="28" y1="22" x2="26" y2="22" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="16" y1="18" x2="14" y2="16" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="24" y1="26" x2="26" y2="28" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="24" y1="18" x2="26" y2="16" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="16" y1="26" x2="14" y2="28" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round"/>
      <text x="20" y="35" textAnchor="middle" fontSize="4" fill="#2D2D2D" fontWeight="bold">SPF 50</text>
    </svg>
  );
}

export function DoodleAnchor({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <circle cx="20" cy="7" r="4" fill="none" stroke="#2D2D2D" strokeWidth="2"/>
      <line x1="20" y1="11" x2="20" y2="34" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <line x1="10" y1="16" x2="30" y2="16" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 34 Q12 34 10 28 Q10 24 14 24" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M20 34 Q28 34 30 28 Q30 24 26 24" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="20" cy="34" r="2.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5"/>
      <circle cx="10" cy="24" r="2" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1"/>
      <circle cx="30" cy="24" r="2" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M20 7 Q24 5 26 7" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleSeagull({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 18 Q14 12 6 14 Q10 16 12 20 Q14 22 18 20 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M20 18 Q26 12 34 14 Q30 16 28 20 Q26 22 22 20 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <ellipse cx="20" cy="22" rx="5" ry="4" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="16" r="4" fill="white" stroke="#2D2D2D" strokeWidth="1.2"/>
      <path d="M24 16 L28 17 L24 18 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round"/>
      <circle cx="22" cy="15" r="1.2" fill="#2D2D2D"/>
      <circle cx="22.4" cy="14.6" r="0.5" fill="white"/>
      <path d="M16 24 Q14 28 12 28 Q14 26 16 26" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M16 24 Q16 28 18 30 Q17 27 18 25" fill="white" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M6 14 Q7 16 8 17" stroke="#94A3B8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M34 14 Q33 16 32 17" stroke="#94A3B8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleLighthouse({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M20 8 L8 4 L10 8 Z" fill="#FBBF24" opacity="0.4"/>
      <path d="M20 8 L32 4 L30 8 Z" fill="#FBBF24" opacity="0.4"/>
      <path d="M20 8 L4 10 L8 12 Z" fill="#FBBF24" opacity="0.3"/>
      <path d="M20 8 L36 10 L32 12 Z" fill="#FBBF24" opacity="0.3"/>
      <path d="M14 10 Q13 36 12 38 L28 38 Q27 36 26 10 Z" fill="white" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14.4 14 L25.6 14 L25.4 18 L14.6 18 Z" fill="#F87171"/>
      <path d="M14 22 L26 22 L25.8 26 L14.2 26 Z" fill="#F87171"/>
      <path d="M13.6 30 L26.4 30 L26.2 34 L13.8 34 Z" fill="#F87171"/>
      <path d="M14 10 Q13 36 12 38 L28 38 Q27 36 26 10 Z" fill="none" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="12" y="6" width="16" height="6" rx="1" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.2"/>
      <circle cx="20" cy="9" r="3" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M14 6 Q20 2 26 6" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M8 38 Q14 36 20 38 Q26 36 32 38" stroke="#60A5FA" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleTropicalDrink({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      <path d="M10 10 L12 34 Q14 36 20 36 Q26 36 28 34 L30 10 Z" fill="#FEF3C7" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M11 14 L12.5 34 Q14 36 20 36 Q26 36 27.5 34 L29 14 Z" fill="#F97316" opacity="0.55"/>
      <rect x="15" y="20" width="6" height="6" rx="1" fill="white" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.7" transform="rotate(10 18 23)"/>
      <rect x="19" y="18" width="5" height="5" rx="1" fill="white" stroke="#2D2D2D" strokeWidth="0.8" opacity="0.7" transform="rotate(-8 21 20)"/>
      <line x1="24" y1="6" x2="22" y2="34" stroke="#F87171" strokeWidth="2" strokeLinecap="round"/>
      <line x1="25" y1="6" x2="23" y2="34" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <path d="M24 10 Q24 6 20 6 Q16 6 16 10" fill="#F472B6" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M16 10 Q20 12 24 10" stroke="#2D2D2D" strokeWidth="0.8" fill="none"/>
      <line x1="20" y1="6" x2="20" y2="12" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round"/>
      <path d="M10 10 L12 34 Q14 36 20 36 Q26 36 28 34 L30 10 Z" fill="none" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="10" cy="10" r="4" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1"/>
      <path d="M8 10 L10 8 L12 10 L10 12 Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="0.6"/>
    </svg>
  );
}

// ── 관계 & 심리 개념 6종 ──

// 매력 — 윙크하는 매력적인 얼굴 + 떠다니는 하트
export function DoodleCharm({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} fill="none">
      {/* 얼굴 */}
      <circle cx="19" cy="21" r="14" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 왼쪽 눈 — 윙크 */}
      <path d="M11 19 Q14 16 17 19" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 오른쪽 눈 */}
      <circle cx="25" cy="19" r="1.8" fill="#2D2D2D" />
      {/* 볼터치 */}
      <ellipse cx="11" cy="25" rx="2.5" ry="1.5" fill="#FB923C" opacity="0.4" />
      <ellipse cx="27" cy="25" rx="2.5" ry="1.5" fill="#FB923C" opacity="0.4" />
      {/* 미소 */}
      <path d="M14 26 Q19 31 24 26" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 떠 있는 하트 */}
      <path d="M32 12.5 C32 12.5 28 9.5 28 7.2 A2.3 2.3 0 0 1 32 6 A2.3 2.3 0 0 1 36 7.2 C36 9.5 32 12.5 32 12.5Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="0.8" />
    </svg>
  );
}

// 당기다 — 말굽 자석 + 끌어당기는 방향선
export function DoodlePull({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 36" className={`w-7 h-7 ${className}`} fill="none">
      {/* 자석 본체 */}
      <path d="M7 9 L15 9 L15 22 A3 3 0 0 0 21 22 L21 9 L29 9 L29 22 A11 11 0 0 1 7 22 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* 흰 단자 */}
      <rect x="6.5" y="7" width="9" height="5" rx="1.5" fill="#FFFFFF" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="20.5" y="7" width="9" height="5" rx="1.5" fill="#FFFFFF" stroke="#2D2D2D" strokeWidth="1.2" />
    </svg>
  );
}

// 밀다 — 손바닥 + 미는 방향선
export function DoodlePush({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 36" className={`w-7 h-7 ${className}`} fill="none">
      {/* 손바닥 */}
      <rect x="15" y="11" width="14" height="16" rx="6" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 손가락 4개 */}
      <rect x="16.5" y="5" width="2.6" height="9" rx="1.3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="19.6" y="4" width="2.6" height="10" rx="1.3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="22.7" y="5" width="2.6" height="9" rx="1.3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.2" />
      <rect x="25.8" y="7" width="2.6" height="7" rx="1.3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 엄지 */}
      <path d="M15 16 Q11 16 11 20 Q11 23 15 23" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 미는 방향선 */}
      <path d="M3 14 L8 14" stroke="#2D2D2D" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d="M2 19 L7 19" stroke="#2D2D2D" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d="M3 24 L8 24" stroke="#2D2D2D" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

// 역효과 — 되돌아와 꽂히는 화살 + 빨강 충격 스파크
export function DoodleBackfire({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 36" className={`w-7 h-7 ${className}`} fill="none">
      {/* 되돌아오는 화살 곡선 */}
      <path d="M7 26 C5 8 31 8 27 24" stroke="#FB923C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* 화살촉 (아래로 꽂힘) */}
      <path d="M23 22 L27 28 L31 22 Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round" />
      {/* 충격 스파크 */}
      <path d="M27 30 L25 34 M27 30 L31 34 M27 29 L27 34" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// 확신 — 초록 인장 + 흰 체크
export function DoodleConfidence({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 36" className={`w-7 h-7 ${className}`} fill="none">
      {/* 인장 본체 */}
      <circle cx="18" cy="17" r="13" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 안쪽 링 */}
      <circle cx="18" cy="17" r="9.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
      {/* 체크 */}
      <path d="M11 17 L16 22 L25 11" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* 반짝임 */}
      <path d="M31 8 L32 11 L35 12 L32 13 L31 16 L30 13 L27 12 L30 11 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.5" />
    </svg>
  );
}

// 장소 — 지도 핀
export function DoodleLocation({ className = "" }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 36" className={`w-7 h-7 ${className}`} fill="none">
      {/* 그림자 */}
      <ellipse cx="18" cy="32" rx="6" ry="1.8" fill="#2D2D2D" opacity="0.15" />
      {/* 핀 본체 */}
      <path d="M18 3 A11 11 0 0 1 29 14 C29 22 18 31 18 31 C18 31 7 22 7 14 A11 11 0 0 1 18 3 Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
      {/* 안쪽 원 */}
      <circle cx="18" cy="14" r="4.5" fill="#FFFFFF" stroke="#2D2D2D" strokeWidth="1.2" />
    </svg>
  );
}

export function ScatteredDoodles() {
  return (
    <div className="pointer-events-none select-none" aria-hidden>
      <DoodleStar className="absolute top-8 left-6 animate-wiggle" />
      <DoodleSparkle className="absolute top-20 right-12 animate-float" />
      <DoodleMoon className="absolute top-40 right-4 animate-float" style={{ animationDelay: "1s" }} />
      <DoodleHeart className="absolute top-16 right-28 animate-wiggle" style={{ animationDelay: "0.5s" }} />
      <DoodleCloud className="absolute top-56 left-2 animate-float" style={{ animationDelay: "1.5s" }} />
      <DoodlePizza className="absolute bottom-20 left-8 tilt-left animate-float" style={{ animationDelay: "2s" }} />
      <DoodleLetter className="absolute bottom-32 right-6 tilt-right animate-wiggle" style={{ animationDelay: "0.8s" }} />
      <DoodleSparkle className="absolute bottom-12 right-24 animate-float" style={{ animationDelay: "1.2s" }} />
    </div>
  );
}

// 엄마 — 단발머리, 핑크 헤어핀, 속눈썹, 온화한 미소
export function DoodleMom({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 46" className={`w-10 h-11 ${className}`} style={style} fill="none">
      {/* 단발 헤어 */}
      <path d="M7 26 Q7 8 20 8 Q33 8 33 26 Q34 32 32 38 L28 38 Q30 32 30 24 Q30 14 20 14 Q10 14 10 24 Q10 32 12 38 L8 38 Q6 32 7 26Z" fill="#2D2D2D" />
      {/* 핑크 헤어핀 */}
      <circle cx="30" cy="12" r="3" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="30" cy="12" r="1.2" fill="white" stroke="#2D2D2D" strokeWidth="0.5" />
      {/* 얼굴 */}
      <circle cx="20" cy="27" r="13" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 속눈썹 */}
      <path d="M12 22 Q15 20 18 22" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M22 22 Q25 20 28 22" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="15" cy="24" r="2" fill="#2D2D2D" />
      <circle cx="25" cy="24" r="2" fill="#2D2D2D" />
      <circle cx="16" cy="23" r="0.8" fill="white" />
      <circle cx="26" cy="23" r="0.8" fill="white" />
      {/* 볼터치 */}
      <ellipse cx="9" cy="28" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.6" />
      <ellipse cx="31" cy="28" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.6" />
      {/* 온화한 미소 */}
      <path d="M15 32 Q20 37 25 32" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// 아빠 — 짧은 가르마 머리, 눈썹, 은은한 미소
export function DoodleDad({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 46" className={`w-10 h-11 ${className}`} style={style} fill="none">
      {/* 얼굴 (먼저 그림) */}
      <ellipse cx="20" cy="28" rx="13" ry="12" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 */}
      <path d="M12 22 Q15 20 18 22" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M22 22 Q25 20 28 22" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="15" cy="25" r="2" fill="#2D2D2D" />
      <circle cx="25" cy="25" r="2" fill="#2D2D2D" />
      <circle cx="16" cy="24" r="0.8" fill="white" />
      <circle cx="26" cy="24" r="0.8" fill="white" />
      {/* 눈물 — 오른쪽 눈 아래 */}
      <path d="M27 27 Q25 31 27 33 Q29 31 27 27Z" fill="#93C5FD" opacity="0.9" />
      <circle cx="27.5" cy="35" r="1" fill="#93C5FD" opacity="0.6" />
      {/* 볼터치 */}
      <ellipse cx="9" cy="29" rx="2.5" ry="1.5" fill="#FCA5A5" opacity="0.3" />
      <ellipse cx="31" cy="29" rx="2.5" ry="1.5" fill="#FCA5A5" opacity="0.3" />
      {/* 미소 */}
      <path d="M16 32 Q20 36 24 32" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 짧은 머리 — 얼굴 위에 덮어서 경계 없앰 */}
      <path d="M8 26 Q8 10 20 10 Q32 10 32 26" fill="#2D2D2D" />
      {/* 가르마 */}
      <line x1="20" y1="10" x2="20" y2="18" stroke="#4D4D4D" strokeWidth="0.8" opacity="0.5" />
      {/* 구레나룻 */}
      <path d="M8 26 Q6 32 8 36" fill="#2D2D2D" />
      <path d="M32 26 Q34 32 32 36" fill="#2D2D2D" />
    </svg>
  )
}

// 전남친 — 짧은 헝클어진 머리, 약간 시무룩한 표정
export function DoodleExBF({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 46" className={`w-10 h-11 ${className}`} style={style} fill="none">
      {/* 얼굴 (먼저 그림) */}
      <circle cx="20" cy="28" r="13" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 눈썹 */}
      <path d="M12 23 Q15 21.5 18 23" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M22 23 Q25 21.5 28 23" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="15" cy="26" r="2" fill="#2D2D2D" />
      <circle cx="25" cy="26" r="2" fill="#2D2D2D" />
      <circle cx="16" cy="25" r="0.8" fill="white" />
      <circle cx="26" cy="25" r="0.8" fill="white" />
      {/* 시무룩한 입 */}
      <path d="M15 33 Q20 31 25 33" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 더벅머리 — 얼굴 위에 덮어서 경계 없앰 */}
      <path d="M7 26 Q7 8 20 7 Q33 8 33 26 Q33 18 30 17 Q26 23 20 21 Q14 23 10 17 Q7 18 7 26Z" fill="#2D2D2D" />
      {/* 앞머리 삐죽 3덩어리 */}
      <path d="M10 18 Q12 10 15 18" fill="#2D2D2D" />
      <path d="M16 17 Q19 8 22 17" fill="#2D2D2D" />
      <path d="M23 18 Q26 10 28 18" fill="#2D2D2D" />
      {/* 작은 깨진 하트 */}
      <path d="M34 4 Q36 2 38 4 Q38 6 34 9 Q30 6 30 4 Q32 2 34 4Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="0.7" />
      <line x1="34" y1="4" x2="34" y2="9" stroke="#2D2D2D" strokeWidth="0.7" />
    </svg>
  )
}

// 전여친 — 긴 생머리, 속눈썹, 약간 시무룩한 표정
export function DoodleExGF({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 50" className={`w-10 h-[50px] ${className}`} style={style} fill="none">
      {/* 긴 머리 옆 */}
      <rect x="5" y="22" width="7" height="26" rx="3.5" fill="#2D2D2D" />
      <rect x="28" y="22" width="7" height="26" rx="3.5" fill="#2D2D2D" />
      {/* 머리 위 */}
      <path d="M5 22 Q5 8 20 8 Q35 8 35 22" fill="#2D2D2D" />
      {/* 얼굴 */}
      <ellipse cx="20" cy="27" rx="12" ry="13" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 속눈썹 */}
      <path d="M11 21 Q14 19 17 21" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M23 21 Q26 19 29 21" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* 눈 */}
      <circle cx="14" cy="24" r="2" fill="#2D2D2D" />
      <circle cx="26" cy="24" r="2" fill="#2D2D2D" />
      <circle cx="15" cy="23" r="0.8" fill="white" />
      <circle cx="27" cy="23" r="0.8" fill="white" />
      {/* 볼터치 */}
      <ellipse cx="9" cy="28" rx="3" ry="2" fill="#FCA5A5" opacity="0.6" />
      <ellipse cx="31" cy="28" rx="3" ry="2" fill="#FCA5A5" opacity="0.6" />
      {/* 시무룩한 입 */}
      <path d="M15 33 Q20 31 25 33" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// 올해운 달력 — 핑크 헤더, 링, 날짜 그리드, 별 표시
export function DoodleCalendar({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 40" className={`w-9 h-10 ${className}`} style={style} fill="none">
      {/* 달력 본체 */}
      <rect x="3" y="8" width="30" height="30" rx="3" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
      {/* 헤더 */}
      <path d="M3 8 Q3 8 6 8 L30 8 Q33 8 33 11 L33 16 L3 16 L3 11 Q3 8 3 8Z" fill="#E84B6A" />
      <rect x="3" y="11" width="30" height="5" fill="#E84B6A" />
      {/* 링 2개 */}
      <circle cx="12" cy="8" r="2.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
      <circle cx="24" cy="8" r="2.5" fill="white" stroke="#2D2D2D" strokeWidth="1.2" />
      {/* 날짜 점 5개 */}
      <circle cx="10" cy="23" r="1.5" fill="#2D2D2D" opacity="0.25" />
      <circle cx="18" cy="23" r="1.5" fill="#2D2D2D" opacity="0.25" />
      <circle cx="26" cy="23" r="1.5" fill="#2D2D2D" opacity="0.25" />
      <circle cx="10" cy="31" r="1.5" fill="#2D2D2D" opacity="0.25" />
      <circle cx="18" cy="31" r="1.5" fill="#2D2D2D" opacity="0.25" />
      {/* 별 표시된 날 */}
      <path d="M26 28 L27 31 L30 31 L27.5 32.8 L28.5 36 L26 34 L23.5 36 L24.5 32.8 L22 31 L25 31 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6" />
    </svg>
  )
}

export { DoodleMyeongtae, DoodleMyeongtaePink, DoodleMyeongtaeOrange, DoodleMyeongtaeSky } from "./doodle-myeongtae"
