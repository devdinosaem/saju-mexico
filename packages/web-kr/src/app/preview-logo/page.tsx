export default function LogoPreview() {
  return (
    <main className="min-h-screen bg-[#FDF6EE] p-8">
      <h1 className="text-2xl font-bold text-center mb-2">사주TI 심볼 로고 시안</h1>
      <p className="text-sm text-center text-gray-500 mb-12">글씨 없는 심볼만</p>

      <div className="max-w-[700px] mx-auto space-y-16">

        {/* ═══ A안: 오행 꽃 — 5개 오행이 꽃잎처럼 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">A — 오행 꽃</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                {/* 5개 꽃잎 = 5행 */}
                <ellipse cx="50" cy="28" rx="14" ry="20" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="2" transform="rotate(0 50 50)" />
                <ellipse cx="50" cy="28" rx="14" ry="20" fill="#EF4444" stroke="#2D2D2D" strokeWidth="2" transform="rotate(72 50 50)" />
                <ellipse cx="50" cy="28" rx="14" ry="20" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" transform="rotate(144 50 50)" />
                <ellipse cx="50" cy="28" rx="14" ry="20" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="2" transform="rotate(216 50 50)" />
                <ellipse cx="50" cy="28" rx="14" ry="20" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="2" transform="rotate(288 50 50)" />
                {/* 중심 — 눈 달린 원 */}
                <circle cx="50" cy="50" r="14" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" />
                <circle cx="46" cy="48" r="2" fill="#2D2D2D" />
                <circle cx="54" cy="48" r="2" fill="#2D2D2D" />
                <path d="M46 54 Q50 58 54 54" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <ellipse cx="50" cy="28" rx="14" ry="20" fill="#4ADE80" stroke="#F5F5F5" strokeWidth="2" transform="rotate(0 50 50)" />
                <ellipse cx="50" cy="28" rx="14" ry="20" fill="#EF4444" stroke="#F5F5F5" strokeWidth="2" transform="rotate(72 50 50)" />
                <ellipse cx="50" cy="28" rx="14" ry="20" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2" transform="rotate(144 50 50)" />
                <ellipse cx="50" cy="28" rx="14" ry="20" fill="#E2E8F0" stroke="#F5F5F5" strokeWidth="2" transform="rotate(216 50 50)" />
                <ellipse cx="50" cy="28" rx="14" ry="20" fill="#60A5FA" stroke="#F5F5F5" strokeWidth="2" transform="rotate(288 50 50)" />
                <circle cx="50" cy="50" r="14" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2" />
                <circle cx="46" cy="48" r="2" fill="#2D2D2D" />
                <circle cx="54" cy="48" r="2" fill="#2D2D2D" />
                <path d="M46 54 Q50 58 54 54" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ B안: 눈 달린 별 — 기존 두들 스타 확대 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">B — 눈 달린 별 (두들 마스코트)</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <path d="M50 5 L58 35 L90 35 L64 55 L72 85 L50 67 L28 85 L36 55 L10 35 L42 35 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2.5" strokeLinejoin="round" />
                <circle cx="42" cy="42" r="3" fill="#2D2D2D" />
                <circle cx="58" cy="42" r="3" fill="#2D2D2D" />
                <path d="M44 52 Q50 58 56 52" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="36" cy="50" rx="4" ry="2.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="64" cy="50" rx="4" ry="2.5" fill="#E84B6A" opacity="0.3" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <path d="M50 5 L58 35 L90 35 L64 55 L72 85 L50 67 L28 85 L36 55 L10 35 L42 35 Z" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2.5" strokeLinejoin="round" />
                <circle cx="42" cy="42" r="3" fill="#2D2D2D" />
                <circle cx="58" cy="42" r="3" fill="#2D2D2D" />
                <path d="M44 52 Q50 58 56 52" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
                <ellipse cx="36" cy="50" rx="4" ry="2.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="64" cy="50" rx="4" ry="2.5" fill="#E84B6A" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ C안: 사주 4기둥 — 4개 기둥이 캐릭터 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">C — 사주 4기둥 캐릭터</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 120 80" className="w-[120px]" fill="none">
                {/* 기둥 4개 — 각각 다른 오행 색 + 눈 */}
                {[
                  { x: 18, color: "#4ADE80" },
                  { x: 44, color: "#EF4444" },
                  { x: 70, color: "#FACC15" },
                  { x: 96, color: "#60A5FA" },
                ].map((p, i) => (
                  <g key={i}>
                    {/* 머리 */}
                    <circle cx={p.x} cy="22" r="12" fill={p.color} stroke="#2D2D2D" strokeWidth="2" />
                    {/* 눈 */}
                    <circle cx={p.x - 3} cy="20" r="1.5" fill="#2D2D2D" />
                    <circle cx={p.x + 3} cy="20" r="1.5" fill="#2D2D2D" />
                    {/* 입 — 각각 다른 표정 */}
                    {i === 0 && <path d={`M${p.x - 3} 26 Q${p.x} 30 ${p.x + 3} 26`} stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />}
                    {i === 1 && <line x1={p.x - 2} y1="26" x2={p.x + 2} y2="26" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" />}
                    {i === 2 && <circle cx={p.x} cy="26" r="2" fill="#2D2D2D" />}
                    {i === 3 && <path d={`M${p.x - 3} 28 Q${p.x} 24 ${p.x + 3} 28`} stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />}
                    {/* 몸통 (기둥) */}
                    <rect x={p.x - 6} y="34" width="12" height="30" rx="4" fill={p.color} stroke="#2D2D2D" strokeWidth="2" />
                  </g>
                ))}
                {/* 바닥선 */}
                <path d="M6 68 Q60 72 114 68" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 120 80" className="w-[120px]" fill="none">
                {[
                  { x: 18, color: "#4ADE80" },
                  { x: 44, color: "#EF4444" },
                  { x: 70, color: "#FACC15" },
                  { x: 96, color: "#60A5FA" },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy="22" r="12" fill={p.color} stroke="#F5F5F5" strokeWidth="2" />
                    <circle cx={p.x - 3} cy="20" r="1.5" fill="#2D2D2D" />
                    <circle cx={p.x + 3} cy="20" r="1.5" fill="#2D2D2D" />
                    {i === 0 && <path d={`M${p.x - 3} 26 Q${p.x} 30 ${p.x + 3} 26`} stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />}
                    {i === 1 && <line x1={p.x - 2} y1="26" x2={p.x + 2} y2="26" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" />}
                    {i === 2 && <circle cx={p.x} cy="26" r="2" fill="#2D2D2D" />}
                    {i === 3 && <path d={`M${p.x - 3} 28 Q${p.x} 24 ${p.x + 3} 28`} stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />}
                    <rect x={p.x - 6} y="34" width="12" height="30" rx="4" fill={p.color} stroke="#F5F5F5" strokeWidth="2" />
                  </g>
                ))}
                <path d="M6 68 Q60 72 114 68" stroke="#F5F5F5" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.2" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ D안: 오행 링 — 5색 도넛 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">D — 오행 링</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                {/* 5색 아크 */}
                <path d="M50 10 A40 40 0 0 1 88 38" stroke="#4ADE80" strokeWidth="10" strokeLinecap="round" />
                <path d="M88 38 A40 40 0 0 1 74 82" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
                <path d="M74 82 A40 40 0 0 1 26 82" stroke="#FACC15" strokeWidth="10" strokeLinecap="round" />
                <path d="M26 82 A40 40 0 0 1 12 38" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round" />
                <path d="M12 38 A40 40 0 0 1 50 10" stroke="#60A5FA" strokeWidth="10" strokeLinecap="round" />
                {/* 아웃라인 */}
                <circle cx="50" cy="50" r="40" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
                {/* 중심 눈 */}
                <circle cx="50" cy="50" r="12" fill="#FDF6EE" stroke="#2D2D2D" strokeWidth="1.5" />
                <circle cx="46" cy="48" r="2" fill="#2D2D2D" />
                <circle cx="54" cy="48" r="2" fill="#2D2D2D" />
                <path d="M46 53 Q50 56 54 53" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <path d="M50 10 A40 40 0 0 1 88 38" stroke="#4ADE80" strokeWidth="10" strokeLinecap="round" />
                <path d="M88 38 A40 40 0 0 1 74 82" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
                <path d="M74 82 A40 40 0 0 1 26 82" stroke="#FACC15" strokeWidth="10" strokeLinecap="round" />
                <path d="M26 82 A40 40 0 0 1 12 38" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round" />
                <path d="M12 38 A40 40 0 0 1 50 10" stroke="#60A5FA" strokeWidth="10" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" stroke="#F5F5F5" strokeWidth="1" fill="none" opacity="0.3" />
                <circle cx="50" cy="50" r="30" stroke="#F5F5F5" strokeWidth="1" fill="none" opacity="0.3" />
                <circle cx="50" cy="50" r="12" fill="#2D2D2D" stroke="#F5F5F5" strokeWidth="1.5" />
                <circle cx="46" cy="48" r="2" fill="#F5F5F5" />
                <circle cx="54" cy="48" r="2" fill="#F5F5F5" />
                <path d="M46 53 Q50 56 54 53" stroke="#F5F5F5" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ E안: 핑크 하트 별 — 하트+별 합체 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">E — 하트별 (하트+별 합체)</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                {/* 별 실루엣 안에 하트 */}
                <path d="M50 5 L58 32 L88 32 L64 52 L72 82 L50 65 L28 82 L36 52 L12 32 L42 32 Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="2.5" strokeLinejoin="round" />
                {/* 안쪽 하트 */}
                <path d="M50 68 C50 68 32 56 32 44 A9 9 0 0 1 50 40 A9 9 0 0 1 68 44 C68 56 50 68 50 68Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" />
                {/* 눈 */}
                <circle cx="44" cy="48" r="2" fill="#2D2D2D" />
                <circle cx="56" cy="48" r="2" fill="#2D2D2D" />
                {/* 입 */}
                <path d="M46 54 Q50 58 54 54" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="40" cy="53" rx="3" ry="1.5" fill="#E84B6A" opacity="0.4" />
                <ellipse cx="60" cy="53" rx="3" ry="1.5" fill="#E84B6A" opacity="0.4" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <path d="M50 5 L58 32 L88 32 L64 52 L72 82 L50 65 L28 82 L36 52 L12 32 L42 32 Z" fill="#E84B6A" stroke="#F5F5F5" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M50 68 C50 68 32 56 32 44 A9 9 0 0 1 50 40 A9 9 0 0 1 68 44 C68 56 50 68 50 68Z" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2" />
                <circle cx="44" cy="48" r="2" fill="#2D2D2D" />
                <circle cx="56" cy="48" r="2" fill="#2D2D2D" />
                <path d="M46 54 Q50 58 54 54" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="40" cy="53" rx="3" ry="1.5" fill="#E84B6A" opacity="0.4" />
                <ellipse cx="60" cy="53" rx="3" ry="1.5" fill="#E84B6A" opacity="0.4" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ F안: 귀여운 음양 — 양쪽에 다른 표정 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"F — 귀여운 음양"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <circle cx="50" cy="50" r="44" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2.5" />
                <path d="M50 6 A44 44 0 0 1 50 94 A22 22 0 0 0 50 50 A22 22 0 0 1 50 6Z" fill="#E84B6A" />
                <circle cx="50" cy="28" r="8" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2.5" />
                <circle cx="50" cy="72" r="8" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="2.5" />
                <circle cx="36" cy="44" r="1.8" fill="#2D2D2D" />
                <circle cx="44" cy="40" r="1.8" fill="#2D2D2D" />
                <path d="M35 50 Q40 54 45 50" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <circle cx="56" cy="60" r="1.8" fill="#FACC15" />
                <path d="M62 58 L66 58" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M56 66 Q60 69 65 66" stroke="#FACC15" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <ellipse cx="32" cy="48" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="69" cy="64" rx="3" ry="1.5" fill="#FACC15" opacity="0.3" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <circle cx="50" cy="50" r="44" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2.5" />
                <path d="M50 6 A44 44 0 0 1 50 94 A22 22 0 0 0 50 50 A22 22 0 0 1 50 6Z" fill="#E84B6A" />
                <circle cx="50" cy="28" r="8" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2.5" />
                <circle cx="50" cy="72" r="8" fill="#E84B6A" stroke="#F5F5F5" strokeWidth="2.5" />
                <circle cx="36" cy="44" r="1.8" fill="#2D2D2D" />
                <circle cx="44" cy="40" r="1.8" fill="#2D2D2D" />
                <path d="M35 50 Q40 54 45 50" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <circle cx="56" cy="60" r="1.8" fill="#FACC15" />
                <path d="M62 58 L66 58" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M56 66 Q60 69 65 66" stroke="#FACC15" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <ellipse cx="32" cy="48" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="69" cy="64" rx="3" ry="1.5" fill="#FACC15" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ G안: 눈달린 크리스탈볼 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">G — 눈달린 크리스탈볼</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 110" className="w-[100px]" fill="none">
                {/* 구체 */}
                <circle cx="50" cy="48" r="36" fill="#F5F0FF" stroke="#2D2D2D" strokeWidth="2.5" />
                {/* 광택 */}
                <ellipse cx="38" cy="32" rx="8" ry="4" fill="white" opacity="0.6" transform="rotate(-20 38 32)" />
                {/* 안의 오행 도트들 */}
                <circle cx="36" cy="44" r="4" fill="#4ADE80" opacity="0.7" />
                <circle cx="50" cy="36" r="3.5" fill="#EF4444" opacity="0.7" />
                <circle cx="62" cy="42" r="3" fill="#FACC15" opacity="0.7" />
                <circle cx="44" cy="56" r="3.5" fill="#60A5FA" opacity="0.7" />
                <circle cx="58" cy="54" r="3" fill="#A78BFA" opacity="0.7" />
                {/* 눈 */}
                <circle cx="42" cy="46" r="2.5" fill="#2D2D2D" />
                <circle cx="58" cy="46" r="2.5" fill="#2D2D2D" />
                <circle cx="43" cy="45" r="0.8" fill="white" />
                <circle cx="59" cy="45" r="0.8" fill="white" />
                {/* 입 */}
                <path d="M46 54 Q50 58 54 54" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="38" cy="52" rx="3" ry="1.5" fill="#E84B6A" opacity="0.25" />
                <ellipse cx="62" cy="52" rx="3" ry="1.5" fill="#E84B6A" opacity="0.25" />
                {/* 받침대 */}
                <path d="M34 84 Q50 80 66 84" stroke="#2D2D2D" strokeWidth="2" fill="none" />
                <rect x="30" y="84" width="40" height="6" rx="3" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" />
                <path d="M38 84 L42 78" stroke="#2D2D2D" strokeWidth="1.5" />
                <path d="M62 84 L58 78" stroke="#2D2D2D" strokeWidth="1.5" />
                {/* 반짝이 */}
                <path d="M78 20 L80 26 L86 28 L80 30 L78 36 L76 30 L70 28 L76 26 Z" fill="#FACC15" />
                <path d="M18 60 L19 63 L22 64 L19 65 L18 68 L17 65 L14 64 L17 63 Z" fill="#E84B6A" opacity="0.5" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 110" className="w-[100px]" fill="none">
                <circle cx="50" cy="48" r="36" fill="#3A3050" stroke="#F5F5F5" strokeWidth="2.5" />
                <ellipse cx="38" cy="32" rx="8" ry="4" fill="white" opacity="0.15" transform="rotate(-20 38 32)" />
                <circle cx="36" cy="44" r="4" fill="#4ADE80" opacity="0.8" />
                <circle cx="50" cy="36" r="3.5" fill="#EF4444" opacity="0.8" />
                <circle cx="62" cy="42" r="3" fill="#FACC15" opacity="0.8" />
                <circle cx="44" cy="56" r="3.5" fill="#60A5FA" opacity="0.8" />
                <circle cx="58" cy="54" r="3" fill="#A78BFA" opacity="0.8" />
                <circle cx="42" cy="46" r="2.5" fill="#F5F5F5" />
                <circle cx="58" cy="46" r="2.5" fill="#F5F5F5" />
                <circle cx="43" cy="45" r="0.8" fill="#3A3050" />
                <circle cx="59" cy="45" r="0.8" fill="#3A3050" />
                <path d="M46 54 Q50 58 54 54" stroke="#F5F5F5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="38" cy="52" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="62" cy="52" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <path d="M34 84 Q50 80 66 84" stroke="#F5F5F5" strokeWidth="2" fill="none" />
                <rect x="30" y="84" width="40" height="6" rx="3" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2" />
                <path d="M38 84 L42 78" stroke="#F5F5F5" strokeWidth="1.5" />
                <path d="M62 84 L58 78" stroke="#F5F5F5" strokeWidth="1.5" />
                <path d="M78 20 L80 26 L86 28 L80 30 L78 36 L76 30 L70 28 L76 26 Z" fill="#FACC15" />
                <path d="M18 60 L19 63 L22 64 L19 65 L18 68 L17 65 L14 64 L17 63 Z" fill="#E84B6A" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ H안: 겹친 4원 벤다이어그램 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">H — 겹친 4원 (사주 4기둥)</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <circle cx="40" cy="38" r="22" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="2" opacity="0.7" />
                <circle cx="60" cy="38" r="22" fill="#EF4444" stroke="#2D2D2D" strokeWidth="2" opacity="0.7" />
                <circle cx="40" cy="58" r="22" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" opacity="0.7" />
                <circle cx="60" cy="58" r="22" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="2" opacity="0.7" />
                {/* 중심 눈 */}
                <circle cx="46" cy="46" r="2" fill="#2D2D2D" />
                <circle cx="54" cy="46" r="2" fill="#2D2D2D" />
                <path d="M46 52 Q50 56 54 52" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="42" cy="50" rx="2.5" ry="1.2" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="58" cy="50" rx="2.5" ry="1.2" fill="#E84B6A" opacity="0.3" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <circle cx="40" cy="38" r="22" fill="#4ADE80" stroke="#F5F5F5" strokeWidth="1.5" opacity="0.6" />
                <circle cx="60" cy="38" r="22" fill="#EF4444" stroke="#F5F5F5" strokeWidth="1.5" opacity="0.6" />
                <circle cx="40" cy="58" r="22" fill="#FACC15" stroke="#F5F5F5" strokeWidth="1.5" opacity="0.6" />
                <circle cx="60" cy="58" r="22" fill="#60A5FA" stroke="#F5F5F5" strokeWidth="1.5" opacity="0.6" />
                <circle cx="46" cy="46" r="2" fill="#F5F5F5" />
                <circle cx="54" cy="46" r="2" fill="#F5F5F5" />
                <path d="M46 52 Q50 56 54 52" stroke="#F5F5F5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="42" cy="50" rx="2.5" ry="1.2" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="58" cy="50" rx="2.5" ry="1.2" fill="#E84B6A" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ I안: 별+달 듀오 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">I — 별+달 듀오 (음양 짝꿍)</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 120 80" className="w-[120px]" fill="none">
                {/* 별 */}
                <path d="M38 8 L44 26 L62 26 L48 38 L52 56 L38 45 L24 56 L28 38 L14 26 L32 26 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="34" cy="30" r="1.8" fill="#2D2D2D" />
                <circle cx="42" cy="30" r="1.8" fill="#2D2D2D" />
                <path d="M34 36 Q38 40 42 36" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <ellipse cx="30" cy="34" rx="2.5" ry="1.2" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="46" cy="34" rx="2.5" ry="1.2" fill="#E84B6A" opacity="0.3" />
                {/* 달 */}
                <path d="M96 40 A18 18 0 1 1 80 14 A12 12 0 0 0 96 40Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="2" />
                <circle cx="76" cy="30" r="1.8" fill="#FACC15" />
                <circle cx="84" cy="28" r="1.8" fill="#FACC15" />
                <path d="M75 36 Q80 39 84 36" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <ellipse cx="72" cy="34" rx="2.5" ry="1.2" fill="#FACC15" opacity="0.2" />
                {/* 연결 하트 */}
                <path d="M58 34 C58 34 55 30 55 28 A2.5 2.5 0 0 1 58 27 A2.5 2.5 0 0 1 61 28 C61 30 58 34 58 34Z" fill="#E84B6A" />
                {/* 스파클 */}
                <path d="M104 12 L105 15 L108 16 L105 17 L104 20 L103 17 L100 16 L103 15 Z" fill="#FACC15" opacity="0.6" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 120 80" className="w-[120px]" fill="none">
                <path d="M38 8 L44 26 L62 26 L48 38 L52 56 L38 45 L24 56 L28 38 L14 26 L32 26 Z" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="34" cy="30" r="1.8" fill="#2D2D2D" />
                <circle cx="42" cy="30" r="1.8" fill="#2D2D2D" />
                <path d="M34 36 Q38 40 42 36" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <ellipse cx="30" cy="34" rx="2.5" ry="1.2" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="46" cy="34" rx="2.5" ry="1.2" fill="#E84B6A" opacity="0.3" />
                <path d="M96 40 A18 18 0 1 1 80 14 A12 12 0 0 0 96 40Z" fill="#E84B6A" stroke="#F5F5F5" strokeWidth="2" />
                <circle cx="76" cy="30" r="1.8" fill="#FACC15" />
                <circle cx="84" cy="28" r="1.8" fill="#FACC15" />
                <path d="M75 36 Q80 39 84 36" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M58 34 C58 34 55 30 55 28 A2.5 2.5 0 0 1 58 27 A2.5 2.5 0 0 1 61 28 C61 30 58 34 58 34Z" fill="#E84B6A" />
                <path d="M104 12 L105 15 L108 16 L105 17 L104 20 L103 17 L100 16 L103 15 Z" fill="#FACC15" opacity="0.6" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ J안: 오행 주사위 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">J — 오행 주사위</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                {/* 윗면 */}
                <path d="M50 15 L85 35 L50 55 L15 35 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" strokeLinejoin="round" />
                {/* 왼면 */}
                <path d="M15 35 L50 55 L50 88 L15 68 Z" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="2" strokeLinejoin="round" />
                {/* 오른면 */}
                <path d="M85 35 L50 55 L50 88 L85 68 Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="2" strokeLinejoin="round" />
                {/* 윗면 눈 */}
                <circle cx="44" cy="34" r="2" fill="#2D2D2D" />
                <circle cx="56" cy="34" r="2" fill="#2D2D2D" />
                <path d="M46 40 Q50 44 54 40" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="40" cy="38" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="60" cy="38" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                {/* 왼면 도트 */}
                <circle cx="30" cy="52" r="3" fill="#2D2D2D" opacity="0.3" />
                <circle cx="36" cy="62" r="3" fill="#2D2D2D" opacity="0.3" />
                {/* 오른면 도트 */}
                <circle cx="70" cy="52" r="3" fill="#2D2D2D" opacity="0.3" />
                <circle cx="64" cy="62" r="3" fill="#2D2D2D" opacity="0.3" />
                <circle cx="70" cy="68" r="3" fill="#2D2D2D" opacity="0.3" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <path d="M50 15 L85 35 L50 55 L15 35 Z" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2" strokeLinejoin="round" />
                <path d="M15 35 L50 55 L50 88 L15 68 Z" fill="#4ADE80" stroke="#F5F5F5" strokeWidth="2" strokeLinejoin="round" />
                <path d="M85 35 L50 55 L50 88 L85 68 Z" fill="#60A5FA" stroke="#F5F5F5" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="44" cy="34" r="2" fill="#2D2D2D" />
                <circle cx="56" cy="34" r="2" fill="#2D2D2D" />
                <path d="M46 40 Q50 44 54 40" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="40" cy="38" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="60" cy="38" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <circle cx="30" cy="52" r="3" fill="#F5F5F5" opacity="0.2" />
                <circle cx="36" cy="62" r="3" fill="#F5F5F5" opacity="0.2" />
                <circle cx="70" cy="52" r="3" fill="#F5F5F5" opacity="0.2" />
                <circle cx="64" cy="62" r="3" fill="#F5F5F5" opacity="0.2" />
                <circle cx="70" cy="68" r="3" fill="#F5F5F5" opacity="0.2" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ K안: 오행 물방울 마블링 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">K — 오행 물방울</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 80 100" className="w-[80px]" fill="none">
                {/* 물방울 본체 */}
                <path d="M40 8 C40 8 10 45 10 65 A30 30 0 0 0 70 65 C70 45 40 8 40 8Z" fill="white" stroke="#2D2D2D" strokeWidth="2.5" />
                {/* 마블링 오행 */}
                <ellipse cx="30" cy="55" rx="10" ry="14" fill="#4ADE80" opacity="0.5" transform="rotate(-15 30 55)" />
                <ellipse cx="50" cy="50" rx="8" ry="12" fill="#EF4444" opacity="0.4" transform="rotate(10 50 50)" />
                <ellipse cx="42" cy="68" rx="12" ry="8" fill="#60A5FA" opacity="0.4" transform="rotate(-5 42 68)" />
                <ellipse cx="35" cy="42" rx="6" ry="8" fill="#FACC15" opacity="0.5" transform="rotate(20 35 42)" />
                <ellipse cx="55" cy="62" rx="7" ry="6" fill="#A78BFA" opacity="0.4" transform="rotate(-10 55 62)" />
                {/* 눈 */}
                <circle cx="34" cy="56" r="2.5" fill="#2D2D2D" />
                <circle cx="46" cy="56" r="2.5" fill="#2D2D2D" />
                <circle cx="35" cy="55" r="0.8" fill="white" />
                <circle cx="47" cy="55" r="0.8" fill="white" />
                {/* 입 */}
                <path d="M36 64 Q40 68 44 64" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="30" cy="62" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="50" cy="62" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                {/* 광택 */}
                <ellipse cx="30" cy="35" rx="4" ry="2" fill="white" opacity="0.7" transform="rotate(-30 30 35)" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 80 100" className="w-[80px]" fill="none">
                <path d="M40 8 C40 8 10 45 10 65 A30 30 0 0 0 70 65 C70 45 40 8 40 8Z" fill="#3A3050" stroke="#F5F5F5" strokeWidth="2.5" />
                <ellipse cx="30" cy="55" rx="10" ry="14" fill="#4ADE80" opacity="0.5" transform="rotate(-15 30 55)" />
                <ellipse cx="50" cy="50" rx="8" ry="12" fill="#EF4444" opacity="0.4" transform="rotate(10 50 50)" />
                <ellipse cx="42" cy="68" rx="12" ry="8" fill="#60A5FA" opacity="0.4" transform="rotate(-5 42 68)" />
                <ellipse cx="35" cy="42" rx="6" ry="8" fill="#FACC15" opacity="0.5" transform="rotate(20 35 42)" />
                <ellipse cx="55" cy="62" rx="7" ry="6" fill="#A78BFA" opacity="0.4" transform="rotate(-10 55 62)" />
                <circle cx="34" cy="56" r="2.5" fill="#F5F5F5" />
                <circle cx="46" cy="56" r="2.5" fill="#F5F5F5" />
                <circle cx="35" cy="55" r="0.8" fill="#3A3050" />
                <circle cx="47" cy="55" r="0.8" fill="#3A3050" />
                <path d="M36 64 Q40 68 44 64" stroke="#F5F5F5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="30" cy="62" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="50" cy="62" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="30" cy="35" rx="4" ry="2" fill="white" opacity="0.15" transform="rotate(-30 30 35)" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ L안: 해+달 포옹 — 서로 감싸는 형태 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"L — 해+달 포옹"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                {/* 해 (왼쪽 위) */}
                <circle cx="38" cy="38" r="24" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2.5" />
                {/* 해 광선 */}
                {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg) => {
                  const r = 28;
                  const len = deg % 80 === 0 ? 7 : 5;
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line
                      key={`ray-${deg}`}
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

                {/* 달 (오른쪽 아래, 해에 살짝 겹침) */}
                <path d="M82 62 A20 20 0 1 1 62 36 A14 14 0 0 0 82 62Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="2.5" />
                {/* 달 얼굴 */}
                <circle cx="64" cy="56" r="1.5" fill="#FACC15" />
                <circle cx="72" cy="54" r="1.5" fill="#FACC15" />
                <path d="M64 62 Q68 65 72 62" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <ellipse cx="60" cy="60" rx="2.5" ry="1.2" fill="#FACC15" opacity="0.2" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <circle cx="38" cy="38" r="24" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2.5" />
                {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg) => {
                  const r = 28;
                  const len = deg % 80 === 0 ? 7 : 5;
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line key={`ray2-${deg}`} x1={38 + r * Math.cos(rad)} y1={38 + r * Math.sin(rad)} x2={38 + (r + len) * Math.cos(rad)} y2={38 + (r + len) * Math.sin(rad)} stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
                  );
                })}
                <circle cx="32" cy="34" r="2" fill="#2D2D2D" />
                <circle cx="42" cy="34" r="2" fill="#2D2D2D" />
                <path d="M33 42 Q38 46 43 42" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="28" cy="40" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
                <ellipse cx="48" cy="40" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
                <path d="M82 62 A20 20 0 1 1 62 36 A14 14 0 0 0 82 62Z" fill="#E84B6A" stroke="#F5F5F5" strokeWidth="2.5" />
                <circle cx="64" cy="56" r="1.5" fill="#FACC15" />
                <circle cx="72" cy="54" r="1.5" fill="#FACC15" />
                <path d="M64 62 Q68 65 72 62" stroke="#FACC15" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ M안: 해+달 하나로 — 반반 합체 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"M — 해+달 반반 합체"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                {/* 왼쪽 반: 해 */}
                <path d="M50 10 A40 40 0 0 0 50 90" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2.5" />
                {/* 오른쪽 반: 달 */}
                <path d="M50 10 A40 40 0 0 1 50 90" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="2.5" />
                {/* 중심선 */}
                <line x1="50" y1="10" x2="50" y2="90" stroke="#2D2D2D" strokeWidth="2" />
                {/* 해 쪽 광선 (왼쪽만) */}
                {[150, 180, 210].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line key={`mray-${deg}`} x1={50 + 42 * Math.cos(rad)} y1={50 + 42 * Math.sin(rad)} x2={50 + 48 * Math.cos(rad)} y2={50 + 48 * Math.sin(rad)} stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
                  );
                })}
                {/* 달 쪽 별 장식 */}
                <path d="M72 28 L73 31 L76 32 L73 33 L72 36 L71 33 L68 32 L71 31 Z" fill="#FACC15" />
                <path d="M78 65 L79 67 L81 68 L79 69 L78 71 L77 69 L75 68 L77 67 Z" fill="#FACC15" opacity="0.6" />
                {/* 해 쪽 눈 (왼쪽) */}
                <circle cx="34" cy="44" r="2.5" fill="#2D2D2D" />
                {/* 달 쪽 눈 (오른쪽) — 윙크 */}
                <path d="M62 42 L68 42" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
                {/* 공유 입 (중심) */}
                <path d="M40 58 Q50 66 60 58" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="28" cy="52" rx="4" ry="2" fill="#FB923C" opacity="0.3" />
                <ellipse cx="72" cy="52" rx="4" ry="2" fill="#FACC15" opacity="0.25" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <path d="M50 10 A40 40 0 0 0 50 90" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2.5" />
                <path d="M50 10 A40 40 0 0 1 50 90" fill="#E84B6A" stroke="#F5F5F5" strokeWidth="2.5" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="#F5F5F5" strokeWidth="2" />
                {[150, 180, 210].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line key={`mray2-${deg}`} x1={50 + 42 * Math.cos(rad)} y1={50 + 42 * Math.sin(rad)} x2={50 + 48 * Math.cos(rad)} y2={50 + 48 * Math.sin(rad)} stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
                  );
                })}
                <path d="M72 28 L73 31 L76 32 L73 33 L72 36 L71 33 L68 32 L71 31 Z" fill="#FACC15" />
                <path d="M78 65 L79 67 L81 68 L79 69 L78 71 L77 69 L75 68 L77 67 Z" fill="#FACC15" opacity="0.6" />
                <circle cx="34" cy="44" r="2.5" fill="#2D2D2D" />
                <path d="M62 42 L68 42" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
                <path d="M40 58 Q50 66 60 58" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
                <ellipse cx="28" cy="52" rx="4" ry="2" fill="#FB923C" opacity="0.3" />
                <ellipse cx="72" cy="52" rx="4" ry="2" fill="#FACC15" opacity="0.25" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ N안: 달이 해를 안고 있는 형태 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"N — 달이 해를 안은 형태"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                {/* 큰 달 (배경) */}
                <path d="M85 50 A35 35 0 1 1 50 15 A24 24 0 0 0 85 50Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="2.5" />
                {/* 작은 해 (달 안에) */}
                <circle cx="42" cy="55" r="16" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" />
                {/* 해 광선 */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line key={`nray-${deg}`} x1={42 + 18 * Math.cos(rad)} y1={55 + 18 * Math.sin(rad)} x2={42 + 22 * Math.cos(rad)} y2={55 + 22 * Math.sin(rad)} stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
                  );
                })}
                {/* 해 얼굴 */}
                <circle cx="38" cy="52" r="1.8" fill="#2D2D2D" />
                <circle cx="46" cy="52" r="1.8" fill="#2D2D2D" />
                <path d="M39 58 Q42 62 45 58" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <ellipse cx="34" cy="57" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.3" />
                <ellipse cx="50" cy="57" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.3" />
                {/* 달 위 별 */}
                <path d="M65 25 L67 31 L73 33 L67 35 L65 41 L63 35 L57 33 L63 31 Z" fill="#FACC15" />
                <path d="M78 42 L79 44 L81 45 L79 46 L78 48 L77 46 L75 45 L77 44 Z" fill="#FACC15" opacity="0.6" />
                <path d="M55 20 L56 22 L58 23 L56 24 L55 26 L54 24 L52 23 L54 22 Z" fill="#FACC15" opacity="0.4" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <path d="M85 50 A35 35 0 1 1 50 15 A24 24 0 0 0 85 50Z" fill="#E84B6A" stroke="#F5F5F5" strokeWidth="2.5" />
                <circle cx="42" cy="55" r="16" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line key={`nray2-${deg}`} x1={42 + 18 * Math.cos(rad)} y1={55 + 18 * Math.sin(rad)} x2={42 + 22 * Math.cos(rad)} y2={55 + 22 * Math.sin(rad)} stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
                  );
                })}
                <circle cx="38" cy="52" r="1.8" fill="#2D2D2D" />
                <circle cx="46" cy="52" r="1.8" fill="#2D2D2D" />
                <path d="M39 58 Q42 62 45 58" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <ellipse cx="34" cy="57" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.3" />
                <ellipse cx="50" cy="57" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.3" />
                <path d="M65 25 L67 31 L73 33 L67 35 L65 41 L63 35 L57 33 L63 31 Z" fill="#FACC15" />
                <path d="M78 42 L79 44 L81 45 L79 46 L78 48 L77 46 L75 45 L77 44 Z" fill="#FACC15" opacity="0.6" />
                <path d="M55 20 L56 22 L58 23 L56 24 L55 26 L54 24 L52 23 L54 22 Z" fill="#FACC15" opacity="0.4" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ O안: 지문 오행 — "태어날 때 정해진 나" ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"O — 지문 오행 (태어날 때 정해진 나)"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                {/* 지문 모양 동심원 — 5색 오행 */}
                <ellipse cx="50" cy="52" rx="12" ry="14" stroke="#4ADE80" strokeWidth="3" fill="none" />
                <ellipse cx="50" cy="52" rx="20" ry="22" stroke="#F87171" strokeWidth="3" fill="none" />
                <ellipse cx="50" cy="52" rx="28" ry="30" stroke="#FBBF24" strokeWidth="3" fill="none" />
                <ellipse cx="50" cy="52" rx="36" ry="38" stroke="#E2E8F0" strokeWidth="3" fill="none" />
                <ellipse cx="50" cy="52" rx="44" ry="46" stroke="#60A5FA" strokeWidth="3" fill="none" />
                {/* 눈 */}
                <circle cx="44" cy="48" r="2.5" fill="#2D2D2D" />
                <circle cx="56" cy="48" r="2.5" fill="#2D2D2D" />
                {/* 입 */}
                <path d="M45 56 Q50 60 55 56" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="40" cy="54" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="60" cy="54" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <ellipse cx="50" cy="52" rx="12" ry="14" stroke="#4ADE80" strokeWidth="3" fill="none" />
                <ellipse cx="50" cy="52" rx="20" ry="22" stroke="#F87171" strokeWidth="3" fill="none" />
                <ellipse cx="50" cy="52" rx="28" ry="30" stroke="#FBBF24" strokeWidth="3" fill="none" />
                <ellipse cx="50" cy="52" rx="36" ry="38" stroke="#E2E8F0" strokeWidth="3" fill="none" />
                <ellipse cx="50" cy="52" rx="44" ry="46" stroke="#60A5FA" strokeWidth="3" fill="none" />
                <circle cx="44" cy="48" r="2.5" fill="#F5F5F5" />
                <circle cx="56" cy="48" r="2.5" fill="#F5F5F5" />
                <path d="M45 56 Q50 60 55 56" stroke="#F5F5F5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="40" cy="54" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="60" cy="54" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ P안: 다이아몬드 눈 — "유일한 나" ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"P — 다이아몬드 (유일한 나)"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                {/* 다이아몬드 본체 */}
                <path d="M50 8 L85 35 L50 92 L15 35 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2.5" strokeLinejoin="round" />
                {/* 상단 컷 */}
                <path d="M50 8 L30 35 L70 35 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
                {/* 5색 오행 면 */}
                <path d="M15 35 L30 35 L50 92 Z" fill="#4ADE80" opacity="0.3" />
                <path d="M30 35 L50 35 L50 92 Z" fill="#F87171" opacity="0.3" />
                <path d="M50 35 L70 35 L50 92 Z" fill="#60A5FA" opacity="0.3" />
                <path d="M70 35 L85 35 L50 92 Z" fill="#A78BFA" opacity="0.3" />
                {/* 눈 */}
                <circle cx="42" cy="48" r="2.5" fill="#2D2D2D" />
                <circle cx="58" cy="48" r="2.5" fill="#2D2D2D" />
                <circle cx="43" cy="47" r="0.8" fill="white" />
                <circle cx="59" cy="47" r="0.8" fill="white" />
                {/* 입 */}
                <path d="M44 56 Q50 61 56 56" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="38" cy="54" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="62" cy="54" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                {/* 반짝이 */}
                <path d="M88 20 L90 26 L96 28 L90 30 L88 36 L86 30 L80 28 L86 26 Z" fill="#FACC15" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <path d="M50 8 L85 35 L50 92 L15 35 Z" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M50 8 L30 35 L70 35 Z" fill="#FDE68A" stroke="#F5F5F5" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M15 35 L30 35 L50 92 Z" fill="#4ADE80" opacity="0.3" />
                <path d="M30 35 L50 35 L50 92 Z" fill="#F87171" opacity="0.3" />
                <path d="M50 35 L70 35 L50 92 Z" fill="#60A5FA" opacity="0.3" />
                <path d="M70 35 L85 35 L50 92 Z" fill="#A78BFA" opacity="0.3" />
                <circle cx="42" cy="48" r="2.5" fill="#2D2D2D" />
                <circle cx="58" cy="48" r="2.5" fill="#2D2D2D" />
                <circle cx="43" cy="47" r="0.8" fill="#FDE68A" />
                <circle cx="59" cy="47" r="0.8" fill="#FDE68A" />
                <path d="M44 56 Q50 61 56 56" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="38" cy="54" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="62" cy="54" rx="3" ry="1.5" fill="#E84B6A" opacity="0.3" />
                <path d="M88 20 L90 26 L96 28 L90 30 L88 36 L86 30 L80 28 L86 26 Z" fill="#FACC15" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ Q안: 말풍선 별 — "사주가 말해주는 나" ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"Q — 말풍선 별 (사주가 말해주는 나)"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                {/* 말풍선 */}
                <rect x="10" y="8" width="80" height="60" rx="20" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="2.5" />
                {/* 말풍선 꼬리 */}
                <path d="M35 68 L28 85 L50 68" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="2.5" strokeLinejoin="round" />
                {/* 별 (말풍선 안) */}
                <path d="M50 18 L56 32 L72 32 L60 42 L64 56 L50 47 L36 56 L40 42 L28 32 L44 32 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
                {/* 별 눈 */}
                <circle cx="44" cy="36" r="2" fill="#2D2D2D" />
                <circle cx="56" cy="36" r="2" fill="#2D2D2D" />
                {/* 별 입 */}
                <path d="M46 42 Q50 46 54 42" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="40" cy="40" rx="3" ry="1.5" fill="#FDE68A" opacity="0.5" />
                <ellipse cx="60" cy="40" rx="3" ry="1.5" fill="#FDE68A" opacity="0.5" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <rect x="10" y="8" width="80" height="60" rx="20" fill="#E84B6A" stroke="#F5F5F5" strokeWidth="2.5" />
                <path d="M35 68 L28 85 L50 68" fill="#E84B6A" stroke="#F5F5F5" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M50 18 L56 32 L72 32 L60 42 L64 56 L50 47 L36 56 L40 42 L28 32 L44 32 Z" fill="#FACC15" stroke="#F5F5F5" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="44" cy="36" r="2" fill="#2D2D2D" />
                <circle cx="56" cy="36" r="2" fill="#2D2D2D" />
                <path d="M46 42 Q50 46 54 42" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <ellipse cx="40" cy="40" rx="3" ry="1.5" fill="#FDE68A" opacity="0.5" />
                <ellipse cx="60" cy="40" rx="3" ry="1.5" fill="#FDE68A" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ R안: 오행 쿠키 — 귀여운 먹거리 모티프 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"R — 오행 쿠키 (SNS 친화적)"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                {/* 쿠키 본체 (울퉁불퉁 원) */}
                <path d="M50 6 Q68 4 80 18 Q94 30 90 50 Q94 70 80 82 Q68 96 50 94 Q32 96 20 82 Q6 70 10 50 Q6 30 20 18 Q32 4 50 6Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2.5" />
                {/* 오행 초코칩 5개 */}
                <circle cx="30" cy="30" r="5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1" />
                <circle cx="68" cy="25" r="4" fill="#F87171" stroke="#2D2D2D" strokeWidth="1" />
                <circle cx="75" cy="60" r="5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1" />
                <circle cx="25" cy="65" r="4" fill="#A78BFA" stroke="#2D2D2D" strokeWidth="1" />
                <circle cx="55" cy="75" r="4.5" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1" />
                {/* 눈 */}
                <circle cx="40" cy="45" r="3" fill="#2D2D2D" />
                <circle cx="60" cy="45" r="3" fill="#2D2D2D" />
                <circle cx="41" cy="44" r="1" fill="white" />
                <circle cx="61" cy="44" r="1" fill="white" />
                {/* 입 — 활짝 */}
                <path d="M42 56 Q50 64 58 56" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="34" cy="54" rx="4" ry="2" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="66" cy="54" rx="4" ry="2" fill="#E84B6A" opacity="0.3" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[100px]" fill="none">
                <path d="M50 6 Q68 4 80 18 Q94 30 90 50 Q94 70 80 82 Q68 96 50 94 Q32 96 20 82 Q6 70 10 50 Q6 30 20 18 Q32 4 50 6Z" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2.5" />
                <circle cx="30" cy="30" r="5" fill="#4ADE80" stroke="#F5F5F5" strokeWidth="1" />
                <circle cx="68" cy="25" r="4" fill="#F87171" stroke="#F5F5F5" strokeWidth="1" />
                <circle cx="75" cy="60" r="5" fill="#60A5FA" stroke="#F5F5F5" strokeWidth="1" />
                <circle cx="25" cy="65" r="4" fill="#A78BFA" stroke="#F5F5F5" strokeWidth="1" />
                <circle cx="55" cy="75" r="4.5" fill="#E2E8F0" stroke="#F5F5F5" strokeWidth="1" />
                <circle cx="40" cy="45" r="3" fill="#2D2D2D" />
                <circle cx="60" cy="45" r="3" fill="#2D2D2D" />
                <circle cx="41" cy="44" r="1" fill="#FDE68A" />
                <circle cx="61" cy="44" r="1" fill="#FDE68A" />
                <path d="M42 56 Q50 64 58 56" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
                <ellipse cx="34" cy="54" rx="4" ry="2" fill="#E84B6A" opacity="0.3" />
                <ellipse cx="66" cy="54" rx="4" ry="2" fill="#E84B6A" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ S안: 핑크 방패 — "바뀌지 않는 나" ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"S — 핑크 방패 (바뀌지 않는 나)"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 110" className="w-[100px]" fill="none">
                {/* 방패 */}
                <path d="M50 6 L88 22 L88 55 Q88 85 50 102 Q12 85 12 55 L12 22 Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="2.5" strokeLinejoin="round" />
                {/* 안쪽 하이라이트 */}
                <path d="M50 14 L80 28 L80 53 Q80 78 50 94 Q20 78 20 53 L20 28 Z" fill="none" stroke="#FACC15" strokeWidth="1.5" strokeLinejoin="round" />
                {/* 별 */}
                <path d="M50 30 L55 42 L68 42 L58 50 L62 62 L50 54 L38 62 L42 50 L32 42 L45 42 Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
                {/* 별 눈 */}
                <circle cx="45" cy="45" r="1.8" fill="#2D2D2D" />
                <circle cx="55" cy="45" r="1.8" fill="#2D2D2D" />
                {/* 별 입 */}
                <path d="M47 50 Q50 53 53 50" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* 오행 도트 하단 */}
                <circle cx="32" cy="72" r="3" fill="#4ADE80" />
                <circle cx="41" cy="78" r="3" fill="#F87171" />
                <circle cx="50" cy="80" r="3" fill="#FBBF24" />
                <circle cx="59" cy="78" r="3" fill="#E2E8F0" />
                <circle cx="68" cy="72" r="3" fill="#60A5FA" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 110" className="w-[100px]" fill="none">
                <path d="M50 6 L88 22 L88 55 Q88 85 50 102 Q12 85 12 55 L12 22 Z" fill="#E84B6A" stroke="#F5F5F5" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M50 14 L80 28 L80 53 Q80 78 50 94 Q20 78 20 53 L20 28 Z" fill="none" stroke="#FACC15" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M50 30 L55 42 L68 42 L58 50 L62 62 L50 54 L38 62 L42 50 L32 42 L45 42 Z" fill="#FACC15" stroke="#F5F5F5" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="45" cy="45" r="1.8" fill="#2D2D2D" />
                <circle cx="55" cy="45" r="1.8" fill="#2D2D2D" />
                <path d="M47 50 Q50 53 53 50" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
                <circle cx="32" cy="72" r="3" fill="#4ADE80" />
                <circle cx="41" cy="78" r="3" fill="#F87171" />
                <circle cx="50" cy="80" r="3" fill="#FBBF24" />
                <circle cx="59" cy="78" r="3" fill="#E2E8F0" />
                <circle cx="68" cy="72" r="3" fill="#60A5FA" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ D 변형 시리즈 ═══ */}

        {/* ═══ D-1: 큰 얼굴 + 노란 배경 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"D-1 — 오행링 + 큰 얼굴 (노란 안쪽)"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 100 100" className="w-[120px]" fill="none">
                <path d="M50 10 A40 40 0 0 1 88 38" stroke="#4ADE80" strokeWidth="10" strokeLinecap="round" />
                <path d="M88 38 A40 40 0 0 1 74 82" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
                <path d="M74 82 A40 40 0 0 1 26 82" stroke="#FACC15" strokeWidth="10" strokeLinecap="round" />
                <path d="M26 82 A40 40 0 0 1 12 38" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round" />
                <path d="M12 38 A40 40 0 0 1 50 10" stroke="#60A5FA" strokeWidth="10" strokeLinecap="round" />
                <circle cx="50" cy="50" r="28" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2" />
                <circle cx="40" cy="44" r="4" fill="#2D2D2D" />
                <circle cx="60" cy="44" r="4" fill="#2D2D2D" />
                <circle cx="41.5" cy="42.5" r="1.2" fill="white" />
                <circle cx="61.5" cy="42.5" r="1.2" fill="white" />
                <path d="M40 58 Q50 68 60 58" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <ellipse cx="32" cy="55" rx="5" ry="2.5" fill="#FB923C" opacity="0.3" />
                <ellipse cx="68" cy="55" rx="5" ry="2.5" fill="#FB923C" opacity="0.3" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 100 100" className="w-[120px]" fill="none">
                <path d="M50 10 A40 40 0 0 1 88 38" stroke="#4ADE80" strokeWidth="10" strokeLinecap="round" />
                <path d="M88 38 A40 40 0 0 1 74 82" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
                <path d="M74 82 A40 40 0 0 1 26 82" stroke="#FACC15" strokeWidth="10" strokeLinecap="round" />
                <path d="M26 82 A40 40 0 0 1 12 38" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round" />
                <path d="M12 38 A40 40 0 0 1 50 10" stroke="#60A5FA" strokeWidth="10" strokeLinecap="round" />
                <circle cx="50" cy="50" r="28" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2" />
                <circle cx="40" cy="44" r="4" fill="#2D2D2D" />
                <circle cx="60" cy="44" r="4" fill="#2D2D2D" />
                <circle cx="41.5" cy="42.5" r="1.2" fill="white" />
                <circle cx="61.5" cy="42.5" r="1.2" fill="white" />
                <path d="M40 58 Q50 68 60 58" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <ellipse cx="32" cy="55" rx="5" ry="2.5" fill="#FB923C" opacity="0.3" />
                <ellipse cx="68" cy="55" rx="5" ry="2.5" fill="#FB923C" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>


        {/* ═══ U안: L의 해 중심 + 궤도 3줄 + 5행성 + 달 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"U — 해 중심 태양계 (궤도3 + 5행성 + 달)"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 120 120" className="w-[140px]" fill="none">
                {/* 궤도 3줄 */}
                <circle cx="60" cy="60" r="30" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.12" />
                <circle cx="60" cy="60" r="42" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.12" />
                <circle cx="60" cy="60" r="54" stroke="#2D2D2D" strokeWidth="0.7" opacity="0.12" />

                {/* 오행 행성 5개 — 궤도 위에 배치 */}
                <circle cx="90" cy="60" r="5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
                <circle cx="73" cy="25" r="4.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
                <circle cx="18" cy="72" r="4" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" />
                <circle cx="38" cy="104" r="4.5" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" />
                <circle cx="105" cy="88" r="3.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />

                {/* 달 (L스타일 초승달) — 궤도 위 */}
                <path d="M30 38 A10 10 0 1 1 24 26 A7 7 0 0 0 30 38Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="2" />

                {/* 중심: L스타일 해 */}
                <circle cx="60" cy="60" r="16" fill="#FACC15" stroke="#2D2D2D" strokeWidth="2.5" />
                {/* 해 광선 */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line
                      key={`u-ray-${deg}`}
                      x1={60 + 18 * Math.cos(rad)}
                      y1={60 + 18 * Math.sin(rad)}
                      x2={60 + 22 * Math.cos(rad)}
                      y2={60 + 22 * Math.sin(rad)}
                      stroke="#FACC15"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  );
                })}
                {/* 해 눈 */}
                <circle cx="55" cy="57" r="2.5" fill="#2D2D2D" />
                <circle cx="65" cy="57" r="2.5" fill="#2D2D2D" />
                <circle cx="56" cy="56" r="0.8" fill="white" />
                <circle cx="66" cy="56" r="0.8" fill="white" />
                {/* 해 입 */}
                <path d="M56 64 Q60 68 64 64" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="50" cy="63" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
                <ellipse cx="70" cy="63" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 120 120" className="w-[140px]" fill="none">
                <circle cx="60" cy="60" r="30" stroke="#F5F5F5" strokeWidth="0.7" opacity="0.08" />
                <circle cx="60" cy="60" r="42" stroke="#F5F5F5" strokeWidth="0.7" opacity="0.08" />
                <circle cx="60" cy="60" r="54" stroke="#F5F5F5" strokeWidth="0.7" opacity="0.08" />
                <circle cx="90" cy="60" r="5" fill="#4ADE80" stroke="#F5F5F5" strokeWidth="1.5" />
                <circle cx="73" cy="25" r="4.5" fill="#F87171" stroke="#F5F5F5" strokeWidth="1.5" />
                <circle cx="18" cy="72" r="4" fill="#FBBF24" stroke="#F5F5F5" strokeWidth="1.5" />
                <circle cx="38" cy="104" r="4.5" fill="#E2E8F0" stroke="#F5F5F5" strokeWidth="1.5" />
                <circle cx="105" cy="88" r="3.5" fill="#60A5FA" stroke="#F5F5F5" strokeWidth="1.5" />
                <path d="M30 38 A10 10 0 1 1 24 26 A7 7 0 0 0 30 38Z" fill="#E84B6A" stroke="#F5F5F5" strokeWidth="2" />
                <circle cx="60" cy="60" r="16" fill="#FACC15" stroke="#F5F5F5" strokeWidth="2.5" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line
                      key={`u-ray2-${deg}`}
                      x1={60 + 18 * Math.cos(rad)}
                      y1={60 + 18 * Math.sin(rad)}
                      x2={60 + 22 * Math.cos(rad)}
                      y2={60 + 22 * Math.sin(rad)}
                      stroke="#FACC15"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  );
                })}
                <circle cx="55" cy="57" r="2.5" fill="#2D2D2D" />
                <circle cx="65" cy="57" r="2.5" fill="#2D2D2D" />
                <circle cx="56" cy="56" r="0.8" fill="#FACC15" />
                <circle cx="66" cy="56" r="0.8" fill="#FACC15" />
                <path d="M56 64 Q60 68 64 64" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="50" cy="63" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
                <ellipse cx="70" cy="63" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ V안: U변형 — 궤도 2줄 + 얇은 테두리 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"V — 궤도 2줄 + 얇은 해 테두리"}</p>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <svg viewBox="0 0 120 120" className="w-[140px]" fill="none">
                {/* 궤도 2줄 */}
                <circle cx="60" cy="60" r="36" stroke="#2D2D2D" strokeWidth="0.6" opacity="0.12" />
                <circle cx="60" cy="60" r="52" stroke="#2D2D2D" strokeWidth="0.6" opacity="0.12" />

                {/* 오행 행성 5개 */}
                <circle cx="96" cy="60" r="5" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
                <circle cx="76" cy="20" r="4.5" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
                <circle cx="16" cy="78" r="4" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" />
                <circle cx="44" cy="108" r="4.5" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" />
                <circle cx="108" cy="85" r="3.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />

                {/* 달 */}
                <path d="M28 40 A10 10 0 1 1 22 28 A7 7 0 0 0 28 40Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1.8" />

                {/* 중심: 해 (얇은 테두리) */}
                <circle cx="60" cy="60" r="16" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.8" />
                {/* 광선 */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line
                      key={`v-ray-${deg}`}
                      x1={60 + 18 * Math.cos(rad)}
                      y1={60 + 18 * Math.sin(rad)}
                      x2={60 + 22 * Math.cos(rad)}
                      y2={60 + 22 * Math.sin(rad)}
                      stroke="#FACC15"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  );
                })}
                {/* 눈 */}
                <circle cx="55" cy="57" r="2.5" fill="#2D2D2D" />
                <circle cx="65" cy="57" r="2.5" fill="#2D2D2D" />
                <circle cx="56" cy="56" r="0.8" fill="white" />
                <circle cx="66" cy="56" r="0.8" fill="white" />
                {/* 입 */}
                <path d="M56 64 Q60 68 64 64" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* 볼터치 */}
                <ellipse cx="50" cy="63" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
                <ellipse cx="70" cy="63" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
              </svg>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-10">
              <svg viewBox="0 0 120 120" className="w-[140px]" fill="none">
                <circle cx="60" cy="60" r="36" stroke="#F5F5F5" strokeWidth="0.6" opacity="0.08" />
                <circle cx="60" cy="60" r="52" stroke="#F5F5F5" strokeWidth="0.6" opacity="0.08" />
                <circle cx="96" cy="60" r="5" fill="#4ADE80" stroke="#F5F5F5" strokeWidth="1.5" />
                <circle cx="76" cy="20" r="4.5" fill="#F87171" stroke="#F5F5F5" strokeWidth="1.5" />
                <circle cx="16" cy="78" r="4" fill="#FBBF24" stroke="#F5F5F5" strokeWidth="1.5" />
                <circle cx="44" cy="108" r="4.5" fill="#E2E8F0" stroke="#F5F5F5" strokeWidth="1.5" />
                <circle cx="108" cy="85" r="3.5" fill="#60A5FA" stroke="#F5F5F5" strokeWidth="1.5" />
                <path d="M28 40 A10 10 0 1 1 22 28 A7 7 0 0 0 28 40Z" fill="#E84B6A" stroke="#F5F5F5" strokeWidth="1.8" />
                <circle cx="60" cy="60" r="16" fill="#FACC15" stroke="#F5F5F5" strokeWidth="1.8" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line
                      key={`v-ray2-${deg}`}
                      x1={60 + 18 * Math.cos(rad)}
                      y1={60 + 18 * Math.sin(rad)}
                      x2={60 + 22 * Math.cos(rad)}
                      y2={60 + 22 * Math.sin(rad)}
                      stroke="#FACC15"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  );
                })}
                <circle cx="55" cy="57" r="2.5" fill="#2D2D2D" />
                <circle cx="65" cy="57" r="2.5" fill="#2D2D2D" />
                <circle cx="56" cy="56" r="0.8" fill="#FACC15" />
                <circle cx="66" cy="56" r="0.8" fill="#FACC15" />
                <path d="M56 64 Q60 68 64 64" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="50" cy="63" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
                <ellipse cx="70" cy="63" rx="3" ry="1.5" fill="#FB923C" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ W안: V + 태양계 회전 모션 ═══ */}
        <div>
          <p className="text-xs text-gray-400 mb-4 text-center">{"W — 태양계 회전 모션"}</p>
          <style>{`
            @keyframes orbit1 { from { transform: rotate(0deg) translateX(36px) rotate(0deg); } to { transform: rotate(360deg) translateX(36px) rotate(-360deg); } }
            @keyframes orbit2 { from { transform: rotate(0deg) translateX(52px) rotate(0deg); } to { transform: rotate(360deg) translateX(52px) rotate(-360deg); } }
            @keyframes orbit-moon { from { transform: rotate(0deg) translateX(44px) rotate(0deg); } to { transform: rotate(360deg) translateX(44px) rotate(-360deg); } }
            @keyframes sun-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
            .planet-1 { animation: orbit2 9s linear infinite; animation-delay: 0s; }
            .planet-2 { animation: orbit1 13s linear infinite; animation-delay: -4s; }
            .planet-3 { animation: orbit2 18s linear infinite; animation-delay: -3s; }
            .planet-4 { animation: orbit2 24s linear infinite; animation-delay: -13s; }
            .planet-5 { animation: orbit2 12s linear infinite; animation-delay: -8s; }
            .earth-orbit { animation: orbit1 11s linear infinite reverse; animation-delay: -5.5s; }
            .moon-orbit { animation: orbit-moon 15s linear infinite reverse; animation-delay: -9s; }
            .sun-breathe { animation: sun-pulse 4s ease-in-out infinite; }
            .sun-rays-spin { animation: sun-spin 20s linear infinite; transform-origin: 24px 24px; }
            @keyframes sun-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
          <div className="flex justify-center gap-8">
            <div className="bg-[#FDF6EE] rounded-2xl p-10 border-2 border-[#2D2D2D]/10">
              <div style={{ width: 160, height: 160, position: "relative" }}>
                {/* 궤도선 */}
                <svg viewBox="0 0 160 160" style={{ position: "absolute", inset: 0 }} fill="none">
                  <circle cx="80" cy="80" r="36" stroke="#2D2D2D" strokeWidth="0.6" opacity="0.12" />
                  <circle cx="80" cy="80" r="52" stroke="#2D2D2D" strokeWidth="0.6" opacity="0.12" />
                </svg>

                {/* 행성들 (절대 위치, 중심 기준 회전) */}
                <div style={{ position: "absolute", left: 80, top: 80, width: 0, height: 0 }}>
                  <div className="planet-1" style={{ position: "absolute", left: -5, top: -5 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ADE80", border: "1.5px solid #2D2D2D" }} />
                  </div>
                </div>
                <div style={{ position: "absolute", left: 80, top: 80, width: 0, height: 0 }}>
                  <div className="planet-2" style={{ position: "absolute", left: -4.5, top: -4.5 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#F87171", border: "1.5px solid #2D2D2D" }} />
                  </div>
                </div>
                <div style={{ position: "absolute", left: 80, top: 80, width: 0, height: 0 }}>
                  <div className="planet-3" style={{ position: "absolute", left: -4, top: -4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FBBF24", border: "1.5px solid #2D2D2D" }} />
                  </div>
                </div>
                <div style={{ position: "absolute", left: 80, top: 80, width: 0, height: 0 }}>
                  <div className="planet-4" style={{ position: "absolute", left: -4.5, top: -4.5 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#E2E8F0", border: "1.5px solid #2D2D2D" }} />
                  </div>
                </div>
                <div style={{ position: "absolute", left: 80, top: 80, width: 0, height: 0 }}>
                  <div className="planet-5" style={{ position: "absolute", left: -3.5, top: -3.5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#60A5FA", border: "1.5px solid #2D2D2D" }} />
                  </div>
                </div>

                {/* 지구 (1번째 궤도, 역방향) */}
                <div style={{ position: "absolute", left: 80, top: 80, width: 0, height: 0 }}>
                  <div className="earth-orbit" style={{ position: "absolute", left: -9, top: -9 }}>
                    <svg viewBox="0 0 18 18" width="18" height="18" fill="none">
                      <circle cx="9" cy="9" r="7.5" fill="#3B82F6" stroke="#2D2D2D" strokeWidth="1.5" />
                      <path d="M5 6 Q9 5 12 8 Q10 11 6 11 Q3 9 5 6Z" fill="#4ADE80" opacity="0.6" />
                      <path d="M9 12 Q12 14 14 11" fill="#4ADE80" opacity="0.4" />
                    </svg>
                  </div>
                </div>

                {/* 달 (가장 큼) */}
                <div style={{ position: "absolute", left: 80, top: 80, width: 0, height: 0 }}>
                  <div className="moon-orbit" style={{ position: "absolute", left: -12, top: -12 }}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                      <path d="M19 12 A8 8 0 1 1 12 4 A5.5 5.5 0 0 0 19 12Z" fill="#E84B6A" stroke="#2D2D2D" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

                {/* 중심: 해 */}
                <div className="sun-breathe" style={{ position: "absolute", left: 56, top: 56, width: 48, height: 48 }}>
                  <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                    {/* 광선만 회전 */}
                    <g className="sun-rays-spin">
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                        const rad = (deg * Math.PI) / 180;
                        return (
                          <line
                            key={`w-ray-${deg}`}
                            x1={24 + 16 * Math.cos(rad)}
                            y1={24 + 16 * Math.sin(rad)}
                            x2={24 + 20 * Math.cos(rad)}
                            y2={24 + 20 * Math.sin(rad)}
                            stroke="#FACC15"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        );
                      })}
                    </g>
                    {/* 해 본체 (안 돌아감) */}
                    <circle cx="24" cy="24" r="14" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1.8" />
                    <circle cx="20" cy="22" r="2" fill="#2D2D2D" />
                    <circle cx="28" cy="22" r="2" fill="#2D2D2D" />
                    <circle cx="21" cy="21" r="0.6" fill="white" />
                    <circle cx="29" cy="21" r="0.6" fill="white" />
                    <path d="M21 28 Q24 32 27 28" stroke="#2D2D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                    <ellipse cx="17" cy="27" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.3" />
                    <ellipse cx="31" cy="27" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════ */}
        {/* ═══ 액맞이명태 로고 시안 6종               ═══ */}
        {/* ════════════════════════════════════════════ */}
        <div className="border-t-2 border-dashed border-[#2D2D2D]/15 pt-14 space-y-14">
          <div>
            <p className="text-base font-bold text-center mb-0.5">액맞이명태 로고 시안</p>
            <p className="text-xs text-center text-gray-400 mb-1">나무 조각 · 새끼줄 번들 · 황동 고리 고증</p>
            <p className="text-[10px] text-center text-gray-300 mb-10">텍스트 없음 · 6종</p>
          </div>

          {/* ── A 캐릭터형 ── */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-6 text-center tracking-widest">A — 캐릭터형</p>
            <div className="flex gap-8 justify-center flex-wrap items-end">

              {/* A-1 거꾸로 — 나무 조각 고증 */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-[#F5EFE4] rounded-2xl px-10 py-7 border border-[#C8A878]/30 shadow-sm flex justify-center">
                  <svg viewBox="0 0 100 232" className="w-[80px] h-[186px]" fill="none">
                    {/* 황동 고리 */}
                    <circle cx="50" cy="11" r="9" stroke="#C8A040" strokeWidth="4" fill="none"/>
                    <path d="M 43 6 Q 50 3 57 6" stroke="#E8C864" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    {/* 새끼줄 번들 */}
                    <ellipse cx="50" cy="55" rx="21" ry="36" fill="#EAE0C4"/>
                    <path d="M 31 28 Q 50 23 69 28" stroke="#C8B898" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M 29 38 Q 50 33 71 38" stroke="#C8B898" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M 29 48 Q 50 43 71 48" stroke="#C8B898" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M 29 58 Q 50 53 71 58" stroke="#C8B898" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M 29 68 Q 50 63 71 68" stroke="#C8B898" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M 31 78 Q 50 73 69 78" stroke="#C8B898" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M 33 26 Q 50 21 67 26" stroke="#F4EDD8" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.9"/>
                    <ellipse cx="50" cy="55" rx="21" ry="36" fill="none" stroke="#A8946C" strokeWidth="1.5"/>
                    {/* 꼬리 가지 */}
                    <path d="M 38 100 Q 28 98 20 86 L 14 74 Q 18 86 28 100 Q 33 108 39 108" fill="#D4AF82" stroke="#6B4220" strokeWidth="1.7" strokeLinejoin="round"/>
                    <path d="M 62 100 Q 72 98 80 86 L 86 74 Q 82 86 72 100 Q 67 108 61 108" fill="#D4AF82" stroke="#6B4220" strokeWidth="1.7" strokeLinejoin="round"/>
                    {/* 몸통 — 나무 판자 실루엣 */}
                    <path d="M 36 110 Q 26 128 25 150 Q 24 172 28 190 Q 33 206 40 214 Q 45 220 50 221 Q 55 220 60 214 Q 67 206 72 190 Q 76 172 75 150 Q 74 128 64 110 Z" fill="#D4AF82" stroke="#6B4220" strokeWidth="2.2"/>
                    {/* 나뭇결 */}
                    <path d="M 36 128 Q 50 123 64 128" stroke="#C49A6A" strokeWidth="0.9" fill="none" opacity="0.55"/>
                    <path d="M 34 148 Q 50 143 66 148" stroke="#C49A6A" strokeWidth="0.9" fill="none" opacity="0.5"/>
                    <path d="M 33 168 Q 50 163 67 168" stroke="#C49A6A" strokeWidth="0.8" fill="none" opacity="0.45"/>
                    <path d="M 33 186 Q 50 181 67 186" stroke="#C49A6A" strokeWidth="0.7" fill="none" opacity="0.38"/>
                    {/* 아가미선 (새긴 선) */}
                    <line x1="36" y1="148" x2="44" y2="156" stroke="#8B6030" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="36" y1="157" x2="44" y2="165" stroke="#8B6030" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="36" y1="166" x2="44" y2="174" stroke="#8B6030" strokeWidth="2" strokeLinecap="round"/>
                    {/* 몸통 무늬선 */}
                    <line x1="58" y1="137" x2="66" y2="131" stroke="#8B6030" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="60" y1="146" x2="68" y2="140" stroke="#8B6030" strokeWidth="1.6" strokeLinecap="round"/>
                    {/* 눈 (새긴 원) */}
                    <circle cx="41" cy="200" r="4.5" fill="none" stroke="#8B6030" strokeWidth="2"/>
                    <circle cx="41" cy="200" r="1.5" fill="#8B6030"/>
                    {/* 입 (새긴 곡선) */}
                    <path d="M 40 213 Q 50 220 60 213" stroke="#8B6030" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    {/* 새끼줄 꿰는 구멍 */}
                    <ellipse cx="50" cy="107" rx="5.5" ry="3.5" fill="#C49A6A" stroke="#6B4220" strokeWidth="1.4"/>
                  </svg>
                </div>
                <p className="text-[11px] text-gray-400">거꾸로 매달림</p>
              </div>

              {/* A-2 헤엄 — 나무 조각 고증 */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-[#F5EFE4] rounded-2xl px-7 py-7 border border-[#C8A878]/30 shadow-sm flex justify-center">
                  <svg viewBox="0 0 224 132" className="w-[196px] h-[116px]" fill="none">
                    {/* 황동 고리 */}
                    <circle cx="112" cy="12" r="9" stroke="#C8A040" strokeWidth="4" fill="none"/>
                    <path d="M 105 7 Q 112 4 119 7" stroke="#E8C864" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    {/* 새끼줄 번들 */}
                    <ellipse cx="112" cy="48" rx="26" ry="27" fill="#EAE0C4"/>
                    <path d="M 88 28 Q 112 23 136 28" stroke="#C8B898" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M 86 38 Q 112 33 138 38" stroke="#C8B898" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M 86 48 Q 112 43 138 48" stroke="#C8B898" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M 86 58 Q 112 53 138 58" stroke="#C8B898" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M 88 68 Q 112 63 136 68" stroke="#C8B898" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M 90 25 Q 112 20 134 25" stroke="#F4EDD8" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.9"/>
                    <ellipse cx="112" cy="48" rx="26" ry="27" fill="none" stroke="#A8946C" strokeWidth="1.5"/>
                    {/* 꼬리 가지 (오른쪽) */}
                    <path d="M 168 66 Q 182 55 196 44 Q 188 58 174 72" fill="#D4AF82" stroke="#6B4220" strokeWidth="1.7" strokeLinejoin="round"/>
                    <path d="M 168 78 Q 182 89 196 100 Q 188 86 174 72" fill="#D4AF82" stroke="#6B4220" strokeWidth="1.7" strokeLinejoin="round"/>
                    {/* 몸통 — 나무 판자 실루엣 */}
                    <path d="M 26 72 Q 18 68 14 72 Q 18 76 26 72 Q 44 58 82 54 Q 112 50 148 58 Q 162 62 166 72 Q 162 82 148 86 Q 112 94 82 90 Q 44 86 26 72 Z" fill="#D4AF82" stroke="#6B4220" strokeWidth="2.2"/>
                    {/* 나뭇결 */}
                    <path d="M 78 56 Q 115 52 152 59" stroke="#C49A6A" strokeWidth="0.9" fill="none" opacity="0.5"/>
                    <path d="M 76 66 Q 115 62 154 69" stroke="#C49A6A" strokeWidth="0.8" fill="none" opacity="0.4"/>
                    <path d="M 78 78 Q 115 82 152 85" stroke="#C49A6A" strokeWidth="0.7" fill="none" opacity="0.35"/>
                    {/* 아가미선 */}
                    <line x1="62" y1="59" x2="68" y2="66" stroke="#8B6030" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="69" y1="57" x2="75" y2="64" stroke="#8B6030" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="76" y1="55" x2="82" y2="62" stroke="#8B6030" strokeWidth="2" strokeLinecap="round"/>
                    {/* 몸통 무늬 */}
                    <line x1="136" y1="59" x2="142" y2="65" stroke="#8B6030" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="142" y1="57" x2="148" y2="63" stroke="#8B6030" strokeWidth="1.6" strokeLinecap="round"/>
                    {/* 눈 */}
                    <circle cx="28" cy="70" r="4" fill="none" stroke="#8B6030" strokeWidth="2"/>
                    <circle cx="28" cy="70" r="1.4" fill="#8B6030"/>
                    {/* 입 */}
                    <path d="M 14 75 Q 10 72 10 69" stroke="#8B6030" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    {/* 새끼줄 구멍 */}
                    <ellipse cx="112" cy="72" rx="4" ry="6" fill="#C49A6A" stroke="#6B4220" strokeWidth="1.4"/>
                  </svg>
                </div>
                <p className="text-[11px] text-gray-400">헤엄치기</p>
              </div>
            </div>
          </div>

          {/* ── B 심볼형 ── */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-6 text-center tracking-widest">B — 심볼형</p>
            <div className="flex gap-8 justify-center flex-wrap items-end">

              {/* B-1 거꾸로 — 심볼형 나무 조각 */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-[#F5EFE4] rounded-2xl px-10 py-7 border border-[#C8A878]/30 shadow-sm flex justify-center">
                  <svg viewBox="0 0 100 232" className="w-[80px] h-[186px]" fill="none">
                    {/* 황동 고리 — 더 두껍고 단순 */}
                    <circle cx="50" cy="11" r="9" stroke="#B89038" strokeWidth="5" fill="none"/>
                    <path d="M 43 6 Q 50 2 57 6" stroke="#D4A830" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                    {/* 새끼줄 번들 — 더 길쭉하고 단정 */}
                    <ellipse cx="50" cy="56" rx="17" ry="37" fill="#E2D6B0"/>
                    <path d="M 34 25 Q 50 19 66 25" stroke="#C0AC84" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 33 34 Q 50 28 67 34" stroke="#C0AC84" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 33 43 Q 50 37 67 43" stroke="#C0AC84" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 33 52 Q 50 46 67 52" stroke="#C0AC84" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 33 61 Q 50 55 67 61" stroke="#C0AC84" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 33 70 Q 50 64 67 70" stroke="#C0AC84" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 34 79 Q 50 73 66 79" stroke="#C0AC84" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                    <path d="M 36 22 Q 50 16 64 22" stroke="#F0E8CC" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <ellipse cx="50" cy="56" rx="17" ry="37" fill="none" stroke="#9A8460" strokeWidth="2"/>
                    {/* 꼬리 — 날카로운 삼각형 */}
                    <path d="M 37 102 L 20 78 L 36 106" fill="#C4944A" stroke="#6B4220" strokeWidth="2"/>
                    <path d="M 63 102 L 80 78 L 64 106" fill="#C4944A" stroke="#6B4220" strokeWidth="2"/>
                    {/* 몸통 — 더 진한 나무색 */}
                    <path d="M 36 108 Q 26 128 25 152 Q 24 174 28 192 Q 33 208 40 216 Q 45 221 50 222 Q 55 221 60 216 Q 67 208 72 192 Q 76 174 75 152 Q 74 128 64 108 Z" fill="#C49050" stroke="#6B4220" strokeWidth="2.5"/>
                    {/* 나뭇결 — 뚜렷하게 */}
                    <path d="M 35 130 Q 50 124 65 130" stroke="#A07030" strokeWidth="1.2" fill="none" opacity="0.65"/>
                    <path d="M 33 152 Q 50 146 67 152" stroke="#A07030" strokeWidth="1.2" fill="none" opacity="0.6"/>
                    <path d="M 33 172 Q 50 166 67 172" stroke="#A07030" strokeWidth="1.1" fill="none" opacity="0.55"/>
                    <path d="M 33 190 Q 50 184 67 190" stroke="#A07030" strokeWidth="1" fill="none" opacity="0.5"/>
                    {/* 아가미선 — 굵게 */}
                    <line x1="35" y1="151" x2="44" y2="160" stroke="#5C3810" strokeWidth="2.2" strokeLinecap="round"/>
                    <line x1="35" y1="161" x2="44" y2="170" stroke="#5C3810" strokeWidth="2.2" strokeLinecap="round"/>
                    <line x1="35" y1="171" x2="44" y2="180" stroke="#5C3810" strokeWidth="2.2" strokeLinecap="round"/>
                    {/* 눈 — 채운 원 */}
                    <circle cx="40" cy="200" r="5" fill="#5C3810"/>
                    {/* 입 */}
                    <path d="M 39 214 Q 50 222 61 214" stroke="#5C3810" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                    {/* 구멍 */}
                    <ellipse cx="50" cy="107" rx="5" ry="3.5" fill="#A07030" stroke="#6B4220" strokeWidth="1.6"/>
                  </svg>
                </div>
                <p className="text-[11px] text-gray-400">거꾸로 매달림</p>
              </div>

              {/* B-2 헤엄 — 심볼형 나무 조각 */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-[#F5EFE4] rounded-2xl px-7 py-7 border border-[#C8A878]/30 shadow-sm flex justify-center">
                  <svg viewBox="0 0 224 132" className="w-[196px] h-[116px]" fill="none">
                    {/* 황동 고리 */}
                    <circle cx="112" cy="12" r="9" stroke="#B89038" strokeWidth="5" fill="none"/>
                    <path d="M 105 7 Q 112 4 119 7" stroke="#D4A830" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                    {/* 새끼줄 번들 */}
                    <ellipse cx="112" cy="47" rx="22" ry="27" fill="#E2D6B0"/>
                    <path d="M 92 27 Q 112 21 132 27" stroke="#C0AC84" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 90 36 Q 112 30 134 36" stroke="#C0AC84" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 90 45 Q 112 39 134 45" stroke="#C0AC84" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 90 54 Q 112 48 134 54" stroke="#C0AC84" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 92 63 Q 112 57 132 63" stroke="#C0AC84" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                    <path d="M 94 24 Q 112 18 130 24" stroke="#F0E8CC" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <ellipse cx="112" cy="47" rx="22" ry="27" fill="none" stroke="#9A8460" strokeWidth="2"/>
                    {/* 꼬리 — 날카로운 삼각형 */}
                    <path d="M 168 65 L 194 45 L 180 70" fill="#C4944A" stroke="#6B4220" strokeWidth="2"/>
                    <path d="M 168 79 L 194 99 L 180 74" fill="#C4944A" stroke="#6B4220" strokeWidth="2"/>
                    {/* 몸통 */}
                    <path d="M 26 72 Q 18 68 14 72 Q 18 76 26 72 Q 44 58 82 53 Q 112 49 150 57 Q 164 62 168 72 Q 164 82 150 87 Q 112 95 82 91 Q 44 86 26 72 Z" fill="#C49050" stroke="#6B4220" strokeWidth="2.5"/>
                    {/* 나뭇결 */}
                    <path d="M 78 55 Q 115 51 154 58" stroke="#A07030" strokeWidth="1" fill="none" opacity="0.55"/>
                    <path d="M 76 66 Q 115 62 156 69" stroke="#A07030" strokeWidth="0.9" fill="none" opacity="0.45"/>
                    <path d="M 78 80 Q 115 84 154 87" stroke="#A07030" strokeWidth="0.9" fill="none" opacity="0.4"/>
                    {/* 아가미선 */}
                    <line x1="62" y1="58" x2="68" y2="66" stroke="#5C3810" strokeWidth="2.2" strokeLinecap="round"/>
                    <line x1="70" y1="56" x2="76" y2="64" stroke="#5C3810" strokeWidth="2.2" strokeLinecap="round"/>
                    <line x1="78" y1="54" x2="84" y2="62" stroke="#5C3810" strokeWidth="2.2" strokeLinecap="round"/>
                    {/* 눈 */}
                    <circle cx="27" cy="71" r="4.5" fill="#5C3810"/>
                    {/* 입 */}
                    <path d="M 14 76 Q 10 73 10 70" stroke="#5C3810" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                    {/* 구멍 */}
                    <ellipse cx="112" cy="71" rx="4" ry="6" fill="#A07030" stroke="#6B4220" strokeWidth="1.6"/>
                  </svg>
                </div>
                <p className="text-[11px] text-gray-400">헤엄치기</p>
              </div>
            </div>
          </div>

          {/* ── C 뱃지형 ── */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-6 text-center tracking-widest">C — 뱃지형</p>
            <div className="flex gap-8 justify-center flex-wrap items-center">

              {/* C-1 거꾸로 — 뱃지형 나무 조각 */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-[#F5EFE4] rounded-2xl p-8 border border-[#C8A878]/30 shadow-sm">
                  <svg viewBox="0 0 160 160" className="w-[160px] h-[160px]" fill="none">
                    {/* 원형 뱃지 — 나무 느낌 배경 */}
                    <circle cx="80" cy="80" r="74" fill="#EDE6D4" stroke="#6B4220" strokeWidth="3"/>
                    <circle cx="80" cy="80" r="67" stroke="#6B4220" strokeWidth="0.8" strokeDasharray="4 3.5" opacity="0.4"/>
                    {/* 황동 고리 */}
                    <circle cx="80" cy="9" r="7" stroke="#C8A040" strokeWidth="3.5" fill="none"/>
                    <path d="M 75 5 Q 80 2 85 5" stroke="#E8C864" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    {/* 새끼줄 번들 */}
                    <ellipse cx="80" cy="42" rx="14" ry="24" fill="#EAE0C4"/>
                    <path d="M 67 24 Q 80 19 93 24" stroke="#C8B898" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M 66 32 Q 80 27 94 32" stroke="#C8B898" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M 66 40 Q 80 35 94 40" stroke="#C8B898" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M 66 48 Q 80 43 94 48" stroke="#C8B898" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M 67 56 Q 80 51 93 56" stroke="#C8B898" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                    <path d="M 68 21 Q 80 16 92 21" stroke="#F4EDD8" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.9"/>
                    <ellipse cx="80" cy="42" rx="14" ry="24" fill="none" stroke="#A8946C" strokeWidth="1.3"/>
                    {/* 꼬리 가지 */}
                    <path d="M 72 76 Q 63 73 56 63 L 50 53 Q 54 63 64 76" fill="#D4AF82" stroke="#6B4220" strokeWidth="1.5"/>
                    <path d="M 88 76 Q 97 73 104 63 L 110 53 Q 106 63 96 76" fill="#D4AF82" stroke="#6B4220" strokeWidth="1.5"/>
                    {/* 몸통 — 나무 판자 */}
                    <path d="M 68 79 Q 60 93 59 108 Q 58 122 62 133 Q 67 143 73 148 Q 76.5 152 80 153 Q 83.5 152 87 148 Q 93 143 98 133 Q 102 122 101 108 Q 100 93 92 79 Z" fill="#D4AF82" stroke="#6B4220" strokeWidth="2"/>
                    {/* 나뭇결 */}
                    <path d="M 68 94 Q 80 89 92 94" stroke="#C49A6A" strokeWidth="0.9" fill="none" opacity="0.55"/>
                    <path d="M 66 110 Q 80 105 94 110" stroke="#C49A6A" strokeWidth="0.8" fill="none" opacity="0.5"/>
                    <path d="M 66 126 Q 80 121 94 126" stroke="#C49A6A" strokeWidth="0.7" fill="none" opacity="0.4"/>
                    {/* 아가미선 */}
                    <line x1="66" y1="108" x2="73" y2="115" stroke="#8B6030" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="66" y1="116" x2="73" y2="123" stroke="#8B6030" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="66" y1="124" x2="73" y2="131" stroke="#8B6030" strokeWidth="1.8" strokeLinecap="round"/>
                    {/* 눈 */}
                    <circle cx="70" cy="139" r="3.5" fill="none" stroke="#8B6030" strokeWidth="1.8"/>
                    <circle cx="70" cy="139" r="1.2" fill="#8B6030"/>
                    {/* 입 */}
                    <path d="M 71 149 Q 80 155 89 149" stroke="#8B6030" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    {/* 구멍 */}
                    <ellipse cx="80" cy="78" rx="4.5" ry="3" fill="#C49A6A" stroke="#6B4220" strokeWidth="1.3"/>
                  </svg>
                </div>
                <p className="text-[11px] text-gray-400">거꾸로 매달림</p>
              </div>

              {/* C-2 헤엄 — 뱃지형 나무 조각 */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-[#F5EFE4] rounded-2xl p-8 border border-[#C8A878]/30 shadow-sm">
                  <svg viewBox="0 0 160 160" className="w-[160px] h-[160px]" fill="none">
                    {/* 원형 뱃지 */}
                    <circle cx="80" cy="80" r="74" fill="#EDE6D4" stroke="#6B4220" strokeWidth="3"/>
                    <circle cx="80" cy="80" r="67" stroke="#6B4220" strokeWidth="0.8" strokeDasharray="4 3.5" opacity="0.4"/>
                    {/* 황동 고리 */}
                    <circle cx="80" cy="9" r="7" stroke="#C8A040" strokeWidth="3.5" fill="none"/>
                    <path d="M 75 5 Q 80 2 85 5" stroke="#E8C864" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    {/* 새끼줄 번들 */}
                    <ellipse cx="80" cy="42" rx="22" ry="21" fill="#EAE0C4"/>
                    <path d="M 60 28 Q 80 22 100 28" stroke="#C8B898" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M 58 37 Q 80 31 102 37" stroke="#C8B898" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M 58 46 Q 80 40 102 46" stroke="#C8B898" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M 58 55 Q 80 49 102 55" stroke="#C8B898" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                    <path d="M 62 25 Q 80 19 98 25" stroke="#F4EDD8" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.9"/>
                    <ellipse cx="80" cy="42" rx="22" ry="21" fill="none" stroke="#A8946C" strokeWidth="1.3"/>
                    {/* 꼬리 가지 (오른쪽) */}
                    <path d="M 120 66 Q 132 55 144 46 Q 138 60 126 72" fill="#D4AF82" stroke="#6B4220" strokeWidth="1.5"/>
                    <path d="M 120 78 Q 132 89 144 98 Q 138 84 126 72" fill="#D4AF82" stroke="#6B4220" strokeWidth="1.5"/>
                    {/* 몸통 */}
                    <path d="M 26 74 Q 18 70 15 74 Q 18 78 26 74 Q 42 62 68 58 Q 88 55 112 61 Q 122 65 124 74 Q 122 83 112 87 Q 88 93 68 90 Q 42 86 26 74 Z" fill="#D4AF82" stroke="#6B4220" strokeWidth="2"/>
                    {/* 나뭇결 */}
                    <path d="M 64 60 Q 92 56 116 63" stroke="#C49A6A" strokeWidth="0.9" fill="none" opacity="0.5"/>
                    <path d="M 62 70 Q 92 66 118 73" stroke="#C49A6A" strokeWidth="0.8" fill="none" opacity="0.4"/>
                    <path d="M 64 82 Q 92 86 116 85" stroke="#C49A6A" strokeWidth="0.7" fill="none" opacity="0.35"/>
                    {/* 아가미선 */}
                    <line x1="48" y1="63" x2="54" y2="70" stroke="#8B6030" strokeWidth="1.7" strokeLinecap="round"/>
                    <line x1="55" y1="61" x2="61" y2="68" stroke="#8B6030" strokeWidth="1.7" strokeLinecap="round"/>
                    <line x1="62" y1="59" x2="68" y2="66" stroke="#8B6030" strokeWidth="1.7" strokeLinecap="round"/>
                    {/* 눈 */}
                    <circle cx="27" cy="73" r="3.2" fill="none" stroke="#8B6030" strokeWidth="1.8"/>
                    <circle cx="27" cy="73" r="1.1" fill="#8B6030"/>
                    {/* 입 */}
                    <path d="M 15 77 Q 11 75 11 73" stroke="#8B6030" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
                    {/* 구멍 + 연결 */}
                    <ellipse cx="80" cy="73" rx="3.5" ry="5" fill="#C49A6A" stroke="#6B4220" strokeWidth="1.3"/>
                    <path d="M 77 64 Q 77 68 80 68" stroke="#A8946C" strokeWidth="2" fill="none"/>
                    <path d="M 83 64 Q 83 68 80 68" stroke="#A8946C" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <p className="text-[11px] text-gray-400">헤엄치기</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-12">{"로고 심볼 시안"}</p>
      </div>
    </main>
  );
}

