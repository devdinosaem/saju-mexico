export function SajuTILogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width="40" height="40" className={className} fill="none">
      {/* 해 */}
      <circle cx="38" cy="38" r="24" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2.5" />
      {/* 광선 */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg) => {
        const r = 28;
        const len = deg % 80 === 0 ? 7 : 5;
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={`logo-ray-${deg}`}
            x1={38 + r * Math.cos(rad)}
            y1={38 + r * Math.sin(rad)}
            x2={38 + (r + len) * Math.cos(rad)}
            y2={38 + (r + len) * Math.sin(rad)}
            stroke="#FACC15"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })}
      {/* 해 얼굴 */}
      <circle cx="32" cy="34" r="2" fill="#2D2D2D" />
      <circle cx="42" cy="34" r="2" fill="#2D2D2D" />
      <path d="M33 42 Q38 46 43 42" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="40" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
      <ellipse cx="48" cy="40" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
      {/* 달 */}
      <path d="M82 62 A20 20 0 1 1 62 36 A14 14 0 0 0 82 62Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="2.5" />
      <circle cx="64" cy="56" r="1.5" fill="#FACC15" />
      <circle cx="72" cy="54" r="1.5" fill="#FACC15" />
      <path d="M64 62 Q68 65 72 62" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="60" rx="2.5" ry="1.2" fill="#FACC15" opacity="0.2" />
    </svg>
  );
}
