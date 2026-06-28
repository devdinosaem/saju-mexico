"use client";

export function SajuTILogoAnimated({ size = 100 }: { size?: number }) {
  const s = size;
  const cx = s / 2;

  return (
    <>
      <style>{`
        @keyframes a-orbit1 { from { transform: rotate(0deg) translateX(${s * 0.225}px) rotate(0deg); } to { transform: rotate(360deg) translateX(${s * 0.225}px) rotate(-360deg); } }
        @keyframes a-orbit2 { from { transform: rotate(0deg) translateX(${s * 0.325}px) rotate(0deg); } to { transform: rotate(360deg) translateX(${s * 0.325}px) rotate(-360deg); } }
        @keyframes a-orbit-moon { from { transform: rotate(0deg) translateX(${s * 0.275}px) rotate(0deg); } to { transform: rotate(360deg) translateX(${s * 0.275}px) rotate(-360deg); } }
        @keyframes a-sun-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
        @keyframes a-sun-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .a-p1 { animation: a-orbit2 9s linear infinite; animation-delay: 0s; }
        .a-p2 { animation: a-orbit1 13s linear infinite; animation-delay: -4s; }
        .a-p3 { animation: a-orbit2 18s linear infinite; animation-delay: -3s; }
        .a-p4 { animation: a-orbit2 24s linear infinite; animation-delay: -13s; }
        .a-p5 { animation: a-orbit2 12s linear infinite; animation-delay: -8s; }
        .a-earth { animation: a-orbit1 11s linear infinite reverse; animation-delay: -5.5s; }
        .a-moon { animation: a-orbit-moon 15s linear infinite reverse; animation-delay: -9s; }
        .a-sun { animation: a-sun-pulse 4s ease-in-out infinite; }
        .a-rays { animation: a-sun-spin 20s linear infinite; }
      `}</style>
      <div style={{ width: s, height: s, position: "relative" }}>
        {/* 궤도선 */}
        <svg viewBox={`0 0 ${s} ${s}`} style={{ position: "absolute", inset: 0 }} fill="none">
          <circle cx={cx} cy={cx} r={s * 0.225} stroke="#2D2D2D" strokeWidth="0.5" opacity="0.1" />
          <circle cx={cx} cy={cx} r={s * 0.325} stroke="#2D2D2D" strokeWidth="0.5" opacity="0.1" />
        </svg>

        {/* 행성들 */}
        {[
          { cls: "a-p1", color: "#4ADE80", sz: 8 },
          { cls: "a-p2", color: "#F87171", sz: 7 },
          { cls: "a-p3", color: "#FBBF24", sz: 6.5 },
          { cls: "a-p4", color: "#E2E8F0", sz: 7 },
          { cls: "a-p5", color: "#60A5FA", sz: 5.5 },
        ].map((p) => (
          <div key={p.cls} style={{ position: "absolute", left: cx, top: cx, width: 0, height: 0 }}>
            <div className={p.cls} style={{ position: "absolute", left: -p.sz / 2, top: -p.sz / 2 }}>
              <div style={{ width: p.sz, height: p.sz, borderRadius: "50%", background: p.color, border: "1.2px solid #2D2D2D" }} />
            </div>
          </div>
        ))}

        {/* 지구 */}
        <div style={{ position: "absolute", left: cx, top: cx, width: 0, height: 0 }}>
          <div className="a-earth" style={{ position: "absolute", left: -7, top: -7 }}>
            <svg viewBox="0 0 14 14" width="14" height="14" fill="none">
              <circle cx="7" cy="7" r="6" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1.2" />
              <path d="M4 5 Q7 4 9 6.5 Q8 9 5 9 Q3 7.5 4 5Z" fill="#4ADE80" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* 달 */}
        <div style={{ position: "absolute", left: cx, top: cx, width: 0, height: 0 }}>
          <div className="a-moon" style={{ position: "absolute", left: -9, top: -9 }}>
            <svg viewBox="0 0 18 18" width="18" height="18" fill="none">
              <path d="M14 9 A6 6 0 1 1 9 3 A4 4 0 0 0 14 9Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1.2" />
            </svg>
          </div>
        </div>

        {/* 해 중심 */}
        <div className="a-sun" style={{ position: "absolute", left: cx - s * 0.15, top: cx - s * 0.15, width: s * 0.3, height: s * 0.3 }}>
          <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none">
            <g className="a-rays" style={{ transformOrigin: "20px 20px" }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <line key={`ar-${deg}`} x1={20 + 13 * Math.cos(rad)} y1={20 + 13 * Math.sin(rad)} x2={20 + 17 * Math.cos(rad)} y2={20 + 17 * Math.sin(rad)} stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
                );
              })}
            </g>
            <circle cx="20" cy="20" r="11" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" />
            <circle cx="17" cy="18" r="1.5" fill="#2D2D2D" />
            <circle cx="23" cy="18" r="1.5" fill="#2D2D2D" />
            <circle cx="17.5" cy="17.5" r="0.5" fill="white" />
            <circle cx="23.5" cy="17.5" r="0.5" fill="white" />
            <path d="M17.5 23 Q20 26 22.5 23" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <ellipse cx="14.5" cy="22" rx="2" ry="1" fill="#FB923C" opacity="0.3" />
            <ellipse cx="25.5" cy="22" rx="2" ry="1" fill="#FB923C" opacity="0.3" />
          </svg>
        </div>
      </div>
    </>
  );
}
