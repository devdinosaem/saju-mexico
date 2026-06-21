export function DoodleStar({ className = "" }: { className?: string }) {
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

export function DoodleMoon({ className = "" }: { className?: string }) {
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

export function DoodleCloud({ className = "" }: { className?: string }) {
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

export function DoodleHeart({ className = "" }: { className?: string }) {
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

export function DoodleSparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`w-4 h-4 ${className}`} fill="none">
      <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#FACC15" />
    </svg>
  );
}

export function DoodlePizza({ className = "" }: { className?: string }) {
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

export function DoodleLetter({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 28" className={`w-7 h-5 ${className}`} fill="none">
      <rect x="2" y="4" width="32" height="20" rx="3" fill="white" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M2 7 L18 17 L34 7" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
      <path d="M14 16 L18 19 L22 16" fill="#E84B6A" />
    </svg>
  );
}

export function DoodleFire({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 36" className={`w-6 h-7 ${className}`} fill="none">
      <path d="M14 2 C14 2 4 14 4 22 A10 10 0 0 0 24 22 C24 14 14 2 14 2Z" fill="#FB923C" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M14 14 C14 14 9 20 9 24 A5 5 0 0 0 19 24 C19 20 14 14 14 14Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
    </svg>
  );
}

export function DoodleCat({ className = "" }: { className?: string }) {
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

export function DoodleBow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={`w-7 h-4 ${className}`} fill="none">
      <path d="M16 10 C16 10 6 2 2 6 C-2 10 6 18 16 10Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M16 10 C16 10 26 2 30 6 C34 10 26 18 16 10Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="16" cy="10" r="2.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
    </svg>
  );
}

export function DoodleCrystal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={`w-5 h-6 ${className}`} fill="none">
      <path d="M12 2 L22 12 L12 30 L2 12 Z" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M12 2 L12 30" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.3" />
      <path d="M2 12 L22 12" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function DoodleLeaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={`w-6 h-6 ${className}`} fill="none">
      <path d="M4 24 Q4 4 24 4 Q24 24 4 24Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
      <path d="M4 24 Q14 14 24 4" stroke="#2D2D2D" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function DoodleSmiley({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={`w-6 h-6 ${className}`} fill="none">
      <circle cx="14" cy="14" r="12" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
      <circle cx="10" cy="12" r="1.5" fill="#2D2D2D" />
      <circle cx="18" cy="12" r="1.5" fill="#2D2D2D" />
      <path d="M9 17 Q14 22 19 17" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
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
