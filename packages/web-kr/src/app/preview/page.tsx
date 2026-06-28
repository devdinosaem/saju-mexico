import { DoodleTravelGirl, DoodlePlane, DoodleMusicNote, DoodleQuestionMark, DoodleSpeechBubble, DoodleHeart, DoodleSparkle, DoodleStar } from "@/components/doodles";
import { DOODLE_CATEGORIES } from "@/components/doodle-categories";
import type React from "react";

const ELEM_BADGE: Record<string, { bg: string; fg: string }> = {
  목: { bg: "#D1FAE5", fg: "#047857" },
  화: { bg: "#FEE2E2", fg: "#DC2626" },
  토: { bg: "#FEF3C7", fg: "#B45309" },
  금: { bg: "#F1F5F9", fg: "#475569" },
  수: { bg: "#DBEAFE", fg: "#2563EB" },
  무: { bg: "#F5F5F4", fg: "#A8A29E" },
  전체: { bg: "#EDE9FE", fg: "#7C3AED" },
};

// 배지에 표시할 짧은 글자 (전체는 "올")
const BADGE_TXT: Record<string, string> = { 전체: "올" };

// ── AI 히어로 박스 오행별 그라디언트 변주 (비교용) ──
// 구조 고정(160°·크림 앵커·그림자 8%룰), 위 틴트+그림자만 변주.
const HERO_GRADS: { key: string; label: string; top: string; bot: string; accent: string; glow: string }[] = [
  { key: "현재", label: "현재(핑크)", top: "#FFF6FA", bot: "#FFFDF5", accent: "#E84B6A", glow: "rgba(232,75,106,0.08)" },
  { key: "목", label: "목 · 새싹빛", top: "#F2FCF7", bot: "#FBFEF8", accent: "#4ADE80", glow: "rgba(74,222,128,0.08)" },
  { key: "화", label: "화 · 노을빛", top: "#FFF6F4", bot: "#FFFDF7", accent: "#F87171", glow: "rgba(248,113,113,0.08)" },
  { key: "토", label: "토 · 크림옐로", top: "#FFFBEF", bot: "#FFFEF5", accent: "#FBBF24", glow: "rgba(251,191,36,0.09)" },
  { key: "금", label: "금 · 쿨화이트", top: "#F7FAFC", bot: "#FDFDFB", accent: "#94A3B8", glow: "rgba(148,163,184,0.10)" },
  { key: "수", label: "수 · 물빛", top: "#F2F8FE", bot: "#FAFDFF", accent: "#60A5FA", glow: "rgba(96,165,250,0.08)" },
];

// C안 — 온도 여정(쿨↔웜 가로지르기)으로 몽환감 이식. 위·아래 hue를 일부러 다르게.
const HERO_GRADS_C: { key: string; label: string; top: string; bot: string; accent: string; glow: string }[] = [
  { key: "현재", label: "핑크 · 쿨핑크→웜크림", top: "#FFF6FA", bot: "#FFFDF5", accent: "#E84B6A", glow: "rgba(232,75,106,0.08)" },
  { key: "목", label: "목 · 민트→피치", top: "#E9FBF1", bot: "#FFF7EC", accent: "#34D399", glow: "rgba(52,211,153,0.10)" },
  { key: "화", label: "화 · 코랄→라일락", top: "#FFEFEC", bot: "#F6EFFA", accent: "#FB7185", glow: "rgba(251,113,133,0.10)" },
  { key: "토", label: "토 · 골드→민트", top: "#FFF6DF", bot: "#EFFAF1", accent: "#F59E0B", glow: "rgba(245,158,11,0.10)" },
  { key: "금", label: "금 · 스틸→아이보리", top: "#ECF3FB", bot: "#FFF8EC", accent: "#7C93AC", glow: "rgba(124,147,172,0.12)" },
  { key: "수", label: "수 · 블루→웜크림", top: "#E8F2FE", bot: "#FFF6EC", accent: "#3B82F6", glow: "rgba(59,130,246,0.10)" },
];

function HeroSwatch({ g, border }: { g: (typeof HERO_GRADS)[number]; border: string }) {
  return (
    <div
      className="rounded-2xl px-4 py-3.5 flex flex-col gap-2.5"
      style={{ background: `linear-gradient(160deg, ${g.top}, ${g.bot})`, border, boxShadow: `0 4px 16px ${g.glow}` }}
    >
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: g.accent }} />
        <DoodleSparkle className="!w-4 !h-4" />
        <span className="text-[14px] font-bold text-[#2D2D2D]">정밀 예보</span>
        <span className="ml-auto px-2 py-0.5 rounded-full text-[11px] font-bold" style={{ background: g.accent + "22", color: g.accent }}>{g.label}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-[12px] text-[#2D2D2D]/75 leading-snug">알았어, 친구야. 다음달 네 운을 일기예보처럼 펼쳐볼게.</p>
        <p className="text-[12px] text-[#2D2D2D]/55 leading-snug">무난하면서도 돈이 움직이는 흐름이야. 들어오고 나가는 게 눈에 띄게 느껴질 거야.</p>
      </div>
      <p className="text-[9px] font-mono text-gray-400">{g.top} → {g.bot}</p>
    </div>
  );
}

// ── 앱 파스텔 팔레트 정리 (실제 사용 토큰 수집) ──
const PAL_TOKENS: [string, string, string][] = [
  ["--bg-cream", "#FDF6EE", "페이지 배경"],
  ["--bg-minihompi", "#FFFEF2", "미니홈피 표면"],
  ["--pink", "#E84B6A", "브랜드 핑크"],
  ["--pink-light", "#FFE4EA", "연핑크"],
  ["--black", "#2D2D2D", "charcoal"],
  ["--yellow", "#FACC15", "옐로"],
  ["--green", "#4ADE80", "그린"],
  ["--lavender", "#A78BFA", "라벤더"],
  ["--orange", "#FB923C", "오렌지"],
];
const PAL_ELEM: [string, string, string][] = [
  ["목", "#D1FAE5", "#4ADE80"],
  ["화", "#FEE2E2", "#F87171"],
  ["토", "#FEF3C7", "#FBBF24"],
  ["금", "#F1F5F9", "#94A3B8"],
  ["수", "#DBEAFE", "#60A5FA"],
];
const PAL_SEMANTIC: [string, string, string, string][] = [
  ["긍정·좋음", "#F0FFF4", "#86EFAC", "#16A34A"],
  ["주의·따뜻", "#FFF7ED", "#FDB877", "#C2660C"],
  ["강조 pill", "#FFF4E0", "#F0C060", "#9A7050"],
  ["정보", "#EFF6FF", "#93C5FD", "#2563EB"],
  ["위험·주의", "#FEF2F2", "#FCA5A5", "#DC2626"],
  ["애정·핑크", "#FFF0F5", "#F9A8C4", "#E84B6A"],
  ["보라·라벤더", "#EFEAFE", "#C4B5FD", "#7C3AED"],
  ["중립·뮤트", "#F1F5F9", "#E5E7EB", "#475569"],
];
const PAL_SINSAL: [string, string, string][] = [
  ["귀인·행운", "#FEF3C7", "#B45309"],
  ["재능·예술", "#EDE9FE", "#6D28D9"],
  ["매력·인기", "#FCE7F3", "#BE185D"],
  ["권력·카리스마", "#FEE2E2", "#B91C1C"],
  ["이동·변화", "#DBEAFE", "#1D4ED8"],
  ["주의·전환", "#E2E8F0", "#475569"],
];
const PAL_CREAM: [string, string][] = [
  ["#FFFBF2", "페이퍼"], ["#FFFDF5", "크림"], ["#FFF9F0", "웜화이트"], ["#FFFDE8", "연노랑"],
  ["#FFFEF2", "미니홈피"], ["#F1ECE2", "베이지"], ["#EDE4D4", "샌드"], ["#E0D4C0", "보더샌드"], ["#D8C4A0", "딥샌드"],
];

// ── 파스텔만 모은 다양한 팔레트 (색상환 전체) · app:앱사용 ──
type Pastel = { hex: string; name: string; app?: boolean };
const PASTEL_FAMILIES: { family: string; dot: string; items: Pastel[] }[] = [
  {
    family: "핑크·로즈", dot: "#F9A8C4", items: [
      { hex: "#FFF0F5", name: "연핑크", app: true }, { hex: "#FFE4EA", name: "핑크라이트", app: true },
      { hex: "#FCE7F3", name: "매력핑크", app: true }, { hex: "#FBD5E0", name: "로즈", app: true },
      { hex: "#FFDCE5", name: "블러시" }, { hex: "#F7CAD9", name: "더스티로즈" },
    ],
  },
  {
    family: "코랄·피치", dot: "#FDB877", items: [
      { hex: "#FFF1EC", name: "소프트피치" }, { hex: "#FFE6DA", name: "피치" },
      { hex: "#FFD9C7", name: "코랄파스텔" }, { hex: "#FFDCC2", name: "애프리콧" },
      { hex: "#FFF7ED", name: "연주황", app: true },
    ],
  },
  {
    family: "옐로·크림", dot: "#FBBF24", items: [
      { hex: "#FEF3C7", name: "토·귀인", app: true }, { hex: "#FFFDE8", name: "연노랑", app: true },
      { hex: "#FFF8D6", name: "레몬" }, { hex: "#FBF3D3", name: "바닐라" },
      { hex: "#FDF6EE", name: "크림배경", app: true }, { hex: "#F1ECE2", name: "베이지", app: true },
    ],
  },
  {
    family: "그린·민트·세이지", dot: "#4ADE80", items: [
      { hex: "#D1FAE5", name: "목·민트", app: true }, { hex: "#F0FFF4", name: "긍정연두", app: true },
      { hex: "#DCFCE7", name: "스프링" }, { hex: "#E6F4DF", name: "세이지" },
      { hex: "#CFF0DC", name: "민트딥" }, { hex: "#EAF6E3", name: "라임크림" },
    ],
  },
  {
    family: "틸·아쿠아", dot: "#5EEAD4", items: [
      { hex: "#D5F3EF", name: "아쿠아" }, { hex: "#CDEEEA", name: "틸파스텔" },
      { hex: "#E0F5F2", name: "씨폼" }, { hex: "#D9F2F0", name: "민트워터" },
    ],
  },
  {
    family: "블루·스카이", dot: "#60A5FA", items: [
      { hex: "#DBEAFE", name: "수·스카이", app: true }, { hex: "#EFF6FF", name: "정보연파랑", app: true },
      { hex: "#D6E8FF", name: "스카이" }, { hex: "#E0F2FE", name: "시안" },
      { hex: "#CFE0FA", name: "데님파스텔" },
    ],
  },
  {
    family: "퍼플·라벤더·페리윙클", dot: "#A78BFA", items: [
      { hex: "#EFEAFE", name: "보라", app: true }, { hex: "#EDE9FE", name: "재능라벤더", app: true },
      { hex: "#E5DEFF", name: "라벤더" }, { hex: "#DDD6FE", name: "페리윙클" },
      { hex: "#F3E8FF", name: "라일락" }, { hex: "#EAE0F5", name: "모브" },
    ],
  },
  {
    family: "뉴트럴·그레이·샌드", dot: "#94A3B8", items: [
      { hex: "#F1F5F9", name: "금·중립", app: true }, { hex: "#E2E8F0", name: "쿨그레이", app: true },
      { hex: "#EDE4D4", name: "샌드", app: true }, { hex: "#F5F0E8", name: "오트" },
      { hex: "#ECE8E1", name: "그레이지" }, { hex: "#FFFEF2", name: "미니홈피", app: true },
    ],
  },
];

function Chip({ hex, label }: { hex: string; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-full h-12 rounded-lg border border-[#2D2D2D]/10" style={{ background: hex }} />
      {label && <span className="text-[11px] font-bold text-[#2D2D2D] leading-tight text-center">{label}</span>}
      <span className="text-[9px] font-mono text-gray-400">{hex}</span>
    </div>
  );
}

export default function PreviewPage() {
  const total = DOODLE_CATEGORIES.reduce((s, c) => s + c.stickers.length, 0);
  const classified = DOODLE_CATEGORIES.reduce((s, c) => s + c.stickers.filter(st => st.element).length, 0);

  return (
    <main className="min-h-screen bg-[#FDF6EE] p-8">
      <h1 className="text-2xl font-bold text-center mb-1">두들 스티커 미리보기</h1>
      <p className="text-sm text-center text-gray-500 mb-10">총 {total}종 · {DOODLE_CATEGORIES.length}개 카테고리 · 오행 분류 {classified}/{total}</p>

      {/* ════ 앱 파스텔 팔레트 정리 ════ */}
      <div className="max-w-[760px] mx-auto mb-16 bg-white rounded-2xl border-2 border-[#2D2D2D]/10 p-6">
        <h2 className="text-xl font-bold text-center text-[#2D2D2D] mb-1">앱 파스텔 팔레트 정리</h2>
        <p className="text-xs text-center text-gray-500 mb-8">실제 코드에서 쓰이는 톤 수집 · 빈도 높은 게 사실상 표준</p>

        {/* 1. 코어 토큰 */}
        <h3 className="text-sm font-bold text-[#2D2D2D] mb-3">1 · 코어 토큰 <span className="font-normal text-gray-400 text-xs">globals.css</span></h3>
        <div className="grid grid-cols-5 gap-2.5 mb-8">
          {PAL_TOKENS.map(([name, hex, use]) => <Chip key={name} hex={hex} label={`${name.replace("--", "")} · ${use}`} />)}
        </div>

        {/* 2. 오행 5색 */}
        <h3 className="text-sm font-bold text-[#2D2D2D] mb-3">2 · 오행 5색 <span className="font-normal text-gray-400 text-xs">배경 + 액센트</span></h3>
        <div className="grid grid-cols-5 gap-2.5 mb-8">
          {PAL_ELEM.map(([el, bg, accent]) => (
            <div key={el} className="flex flex-col items-center gap-1">
              <div className="w-full h-12 rounded-lg border border-[#2D2D2D]/10 flex items-center justify-center" style={{ background: bg }}>
                <span className="w-5 h-5 rounded-full border-2 border-white" style={{ background: accent }} />
              </div>
              <span className="text-[11px] font-bold text-[#2D2D2D]">{el}</span>
              <span className="text-[9px] font-mono text-gray-400 text-center leading-tight">{bg}<br />{accent}</span>
            </div>
          ))}
        </div>

        {/* 3. 의미별 소프트 카드 */}
        <h3 className="text-sm font-bold text-[#2D2D2D] mb-3">3 · 의미별 소프트 카드 <span className="font-normal text-gray-400 text-xs">배경 / 보더 / 잉크</span></h3>
        <div className="grid grid-cols-4 gap-2.5 mb-8">
          {PAL_SEMANTIC.map(([label, bg, border, ink]) => (
            <div key={label} className="rounded-xl px-2.5 py-2.5 flex flex-col gap-1" style={{ background: bg, border: `1.5px solid ${border}` }}>
              <span className="text-[12px] font-bold leading-tight" style={{ color: ink }}>{label}</span>
              <span className="text-[8px] font-mono text-[#2D2D2D]/40 leading-tight">{bg}<br />{border} · {ink}</span>
            </div>
          ))}
        </div>

        {/* 4. 신살 카테고리 */}
        <h3 className="text-sm font-bold text-[#2D2D2D] mb-3">4 · 신살 카테고리 6색 <span className="font-normal text-gray-400 text-xs">CAT_STYLE</span></h3>
        <div className="grid grid-cols-3 gap-2.5 mb-8">
          {PAL_SINSAL.map(([label, bg, ink]) => (
            <div key={label} className="rounded-xl px-3 py-2.5 flex flex-col gap-0.5" style={{ background: bg }}>
              <span className="text-[12px] font-bold leading-tight" style={{ color: ink }}>{label}</span>
              <span className="text-[9px] font-mono leading-tight" style={{ color: ink, opacity: 0.5 }}>{bg} · {ink}</span>
            </div>
          ))}
        </div>

        {/* 5. 크림·베이지 계열 */}
        <h3 className="text-sm font-bold text-[#2D2D2D] mb-3">5 · 크림·베이지 계열 <span className="font-normal text-gray-400 text-xs">따뜻한 패널·페이퍼</span></h3>
        <div className="grid grid-cols-5 gap-2.5">
          {PAL_CREAM.map(([hex, label]) => <Chip key={hex} hex={hex} label={label} />)}
        </div>
      </div>

      {/* ════ 파스텔 팔레트 (다양·색상환 전체) ════ */}
      <div className="max-w-[760px] mx-auto mb-16 bg-white rounded-2xl border-2 border-[#2D2D2D]/10 p-6">
        <h2 className="text-xl font-bold text-center text-[#2D2D2D] mb-1">파스텔 팔레트 · 다양</h2>
        <p className="text-xs text-center text-gray-500 mb-8">
          부드러운 틴트만 모음 · 색상환 전체로 확장 ·
          <span className="inline-flex items-center gap-1 ml-1"><span className="w-3 h-3 rounded-full bg-[#FFF0F5] border border-[#2D2D2D]/15 align-middle" /> 앱 = 이미 사용 중</span>
        </p>
        <div className="flex flex-col gap-6">
          {PASTEL_FAMILIES.map(({ family, dot, items }) => (
            <div key={family}>
              <h3 className="text-sm font-bold text-[#2D2D2D] mb-2.5 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: dot }} /> {family}
                <span className="text-xs font-normal text-gray-400">{items.length}</span>
              </h3>
              <div className="grid grid-cols-6 gap-2.5">
                {items.map(p => (
                  <div key={p.hex} className="flex flex-col items-center gap-1">
                    <div className="relative w-full h-14 rounded-lg border border-[#2D2D2D]/10" style={{ background: p.hex }}>
                      {p.app && <span className="absolute top-1 right-1 px-1 py-0.5 rounded-md text-[8px] font-bold bg-white/80 text-[#2D2D2D]/60 leading-none">앱</span>}
                    </div>
                    <span className="text-[10px] font-bold text-[#2D2D2D] leading-tight text-center">{p.name}</span>
                    <span className="text-[9px] font-mono text-gray-400">{p.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {DOODLE_CATEGORIES.map(cat => (
        <section key={cat.id} className="mb-12 max-w-[640px] mx-auto">
          <h2 className="text-base font-bold text-[#2D2D2D] mb-4 pb-2 border-b-2 border-[#2D2D2D]/10">
            {cat.label}
            <span className="ml-2 text-xs font-normal text-gray-400">{cat.stickers.length}종</span>
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {cat.stickers.map(({ name, label, comp: Comp, element }) => (
              <div key={name} className="relative flex flex-col items-center gap-1.5 bg-white rounded-xl p-3 border border-[#2D2D2D]/10">
                {element && (
                  <span
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: ELEM_BADGE[element].bg, color: ELEM_BADGE[element].fg }}
                  >
                    {BADGE_TXT[element] ?? element}
                  </span>
                )}
                <Comp className="!w-12 !h-12" />
                <p className="text-[12px] font-bold text-[#2D2D2D] text-center leading-tight">{label ?? "—"}</p>
                <p className="text-[9px] font-mono text-gray-400 text-center leading-tight">{name}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ── AI 히어로 박스 오행 그라디언트 변주 (비교용) ── */}
      <h2 className="text-xl font-bold text-center mt-12 mb-1 max-w-[640px] mx-auto">AI 히어로 그라디언트 · 오행 변주</h2>
      <p className="text-sm text-center text-gray-500 mb-6 max-w-[640px] mx-auto">현재 핑크안 + 목화토금수 5변주 · A안(charcoal 보더) / B안(오행 틴트 보더)</p>

      <section className="mb-10 max-w-[640px] mx-auto">
        <h3 className="text-base font-bold text-[#2D2D2D] mb-3">A안 — charcoal 보더 고정 <span className="text-xs font-normal text-gray-400">통일감</span></h3>
        <div className="grid grid-cols-2 gap-3">
          {HERO_GRADS.map(g => <HeroSwatch key={g.key} g={g} border="2px solid #2D2D2D" />)}
        </div>
      </section>

      <section className="mb-12 max-w-[640px] mx-auto">
        <h3 className="text-base font-bold text-[#2D2D2D] mb-3">B안 — 오행 틴트 보더 <span className="text-xs font-normal text-gray-400">정체성 ↑</span></h3>
        <div className="grid grid-cols-2 gap-3">
          {HERO_GRADS.map(g => <HeroSwatch key={g.key} g={g} border={`2px solid ${g.accent}`} />)}
        </div>
      </section>

      <section className="mb-12 max-w-[640px] mx-auto">
        <h3 className="text-base font-bold text-[#2D2D2D] mb-1">C안 — 온도 여정 (몽환) <span className="text-xs font-normal text-gray-400">위=자기색 · 아래=반대온도</span></h3>
        <p className="text-[13px] text-gray-500 mb-3">핑크처럼 쿨↔웜을 가로질러 무지갯빛 전이를 만든 버전 · charcoal 보더 고정</p>
        <div className="grid grid-cols-2 gap-3">
          {HERO_GRADS_C.map(g => <HeroSwatch key={g.key} g={g} border="2px solid #2D2D2D" />)}
        </div>
      </section>

      <h2 className="text-xl font-bold text-center mt-12 mb-6 max-w-[640px] mx-auto">조합 예시</h2>
      <div className="relative max-w-[400px] mx-auto bg-white rounded-2xl p-8 border-2 border-[#2D2D2D]/10 min-h-[300px]">
        <DoodleTravelGirl className="!w-32 !h-40 mx-auto" />
        <DoodlePlane className="absolute top-4 right-6 !w-12 !h-8 animate-float" style={{ animationDelay: "0.5s" } as React.CSSProperties} />
        <DoodleMusicNote className="absolute top-8 left-8 animate-wiggle" />
        <DoodleQuestionMark className="absolute bottom-16 left-6 animate-float" />
        <DoodleQuestionMark className="absolute bottom-24 left-12 !w-3 !h-4 animate-float" style={{ animationDelay: "0.3s" } as React.CSSProperties} />
        <DoodleSpeechBubble className="absolute top-12 right-20 animate-wiggle" style={{ animationDelay: "0.8s" } as React.CSSProperties} />
        <DoodleHeart className="absolute top-6 right-32 animate-float" />
        <DoodleSparkle className="absolute top-2 left-20 animate-wiggle" />
        <DoodleStar className="absolute bottom-4 right-8 animate-wiggle" style={{ animationDelay: "1s" } as React.CSSProperties} />
      </div>
    </main>
  );
}
