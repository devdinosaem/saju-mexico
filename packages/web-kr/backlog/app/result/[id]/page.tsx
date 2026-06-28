"use client";

import { useParams, useRouter } from "next/navigation";
import { SajuTILogo } from "@/components/logo";
import {
  DoodleStar, DoodleSparkle, DoodleHeart, DoodleMoon,
  DoodleCloud, DoodleSmiley, DoodleBow, DoodleCrystal,
  DoodleLeaf, DoodleFire,
} from "@/components/doodles";
import { ILJU_TYPES, type IljuType } from "@/lib/ilju-types";

// ── 데모 데이터 (향후 API 연동으로 교체) ──
const DEMO_DATA = {
  name: "김민수",
  gender: "male" as const,
  birth: { year: 1995, month: 3, day: 15, hour: 14, minute: 30 },
  ilju: "경진",
  fiveElements: { wood: 2, fire: 1, earth: 3, metal: 1, water: 1 },
  strength: { level: "신강", score: 2 },
  yongShin: { element: "수(水)", emoji: "💧" },
  yearlyFortune: { year: 2026, ganZhi: "병오(丙午)", energy: "화(火)" },
  majorFortunes: [
    { ageRange: "11~20세", tenGod: "식신(食神)", emoji: "🌱", desc: "감수성이 풍부하고 배움에 몰두하던 시기야. 재능을 발견하는 시간이었거든." },
    { ageRange: "21~30세", tenGod: "편관(偏官)", emoji: "🔥", desc: "도전과 시련이 많지만 그만큼 급성장하는 시기야. 지금 여기에 있는 거야.", current: true },
    { ageRange: "31~40세", tenGod: "???", emoji: "🔒", locked: true },
    { ageRange: "41~50세", tenGod: "???", emoji: "🔒", locked: true },
    { ageRange: "51~60세", tenGod: "???", emoji: "🔒", locked: true },
  ],
};

const ELEMENT_INFO: Record<string, { emoji: string; color: string; label: string }> = {
  wood: { emoji: "🌳", color: "#4ADE80", label: "목(木)" },
  fire: { emoji: "🔥", color: "#F87171", label: "화(火)" },
  earth: { emoji: "⛰️", color: "#FBBF24", label: "토(土)" },
  metal: { emoji: "💎", color: "#E2E8F0", label: "금(金)" },
  water: { emoji: "💧", color: "#60A5FA", label: "수(水)" },
};

export default function ResultPage() {
  const { id } = useParams();
  const router = useRouter();

  // 데모: ilju-types에서 매칭
  const d = DEMO_DATA;
  const type = ILJU_TYPES.find(t => t.ilju === d.ilju && t.gender === d.gender) || ILJU_TYPES[0];
  const bestType = ILJU_TYPES.find(t => t.id === type.bestMatch);
  const worstType = ILJU_TYPES.find(t => t.id === type.worstMatch);

  const total = Object.values(d.fiveElements).reduce((a, b) => a + b, 0) || 1;
  const dominantElement = Object.entries(d.fiveElements).sort((a, b) => b[1] - a[1])[0];

  return (
    <main className="flex flex-col items-center bg-cream min-h-screen">
      <div className="w-full max-w-[440px] mx-auto overflow-hidden">

        {/* ═══ 1. 캐릭터 카드 ═══ */}
        <section className="px-6 pt-12 pb-8 relative">
          <DoodleStar className="absolute top-6 left-4 animate-wiggle" />
          <DoodleSparkle className="absolute top-10 right-8 animate-float" />
          <DoodleMoon className="absolute top-32 right-2 animate-float" style={{ animationDelay: "1s" }} />
          <DoodleHeart className="absolute bottom-12 left-6 animate-wiggle" style={{ animationDelay: "0.5s" }} />

          <div className="flex flex-col items-center mb-4 relative">
            <SajuTILogo className="w-12 h-12 mb-1" />
            <p className="text-pink text-xs tracking-[0.3em]">{"✦ 나의 SAJUPLAY ✦"}</p>
          </div>

          {/* 카드 */}
          <div className="bg-white rounded-2xl p-6 border-2 border-charcoal sticker-shadow relative mx-auto max-w-[340px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-4xl">{type.emoji}</span>
              <span className="text-text-muted text-xs font-mono">{type.hanja}</span>
            </div>

            <h1 className="font-display text-3xl text-charcoal mb-1">{type.name}</h1>
            <p className="text-text-sub text-sm mb-4">{type.tagline}</p>

            <div className="flex gap-2 mb-4">
              <span className={`text-xs px-2.5 py-0.5 rounded-full ${type.tagColor} text-white border border-charcoal`}>
                {type.stemElement}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cream border border-charcoal text-charcoal">
                {type.yinyang}
              </span>
            </div>

            <div className="mb-3">
              {type.strengths.map((s) => (
                <div key={s} className="flex items-center gap-1.5 text-sm">
                  <span className="text-neon-green">✓</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              {type.weaknesses.map((w) => (
                <div key={w} className="flex items-center gap-1.5 text-sm text-text-sub">
                  <span className="text-pink">✗</span>
                  <span>{w}</span>
                </div>
              ))}
            </div>

            <div className="speech-bubble text-sm font-medium">
              &ldquo;{type.quote}&rdquo;
            </div>

            <p className="text-center text-[8px] text-text-muted mt-4 tracking-widest">SAJUPLAY · SAJUPLAY.COM</p>
          </div>

          {/* 공유 버튼 */}
          <div className="flex justify-center gap-3 mt-5">
            <button className="flex items-center gap-1.5 bg-[#FEE500] text-charcoal text-sm font-bold px-5 py-2.5 rounded-xl border-2 border-charcoal sticker-shadow active:scale-95 transition-transform">
              📲 카카오톡 공유
            </button>
            <button className="flex items-center gap-1.5 bg-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-xl border-2 border-charcoal sticker-shadow active:scale-95 transition-transform">
              📸 이미지 저장
            </button>
          </div>
          <div className="flex justify-center gap-3 mt-2">
            <button className="flex items-center gap-1.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-sm font-bold px-5 py-2.5 rounded-xl border-2 border-charcoal sticker-shadow active:scale-95 transition-transform">
              📷 인스타 스토리 올리기
            </button>
          </div>

          <p className="text-center text-text-muted text-xs mt-4">
            120개 유형 중 <span className="font-bold text-pink">상위 {type.rarity === 5 ? "1.2" : type.rarity === 4 ? "3.2" : type.rarity === 3 ? "5.8" : type.rarity === 2 ? "8.4" : "12.1"}%</span>
          </p>
        </section>

        {/* ═══ 2. 성격 요약 ═══ */}
        <section className="px-6 py-8 relative">
          <DoodleSmiley className="absolute top-4 right-6 animate-wiggle" />

          <h2 className="font-display text-xl text-charcoal mb-4">🪞 너는 이런 사람이야</h2>
          <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow">
            <p className="text-sm leading-relaxed text-text-sub">
              {type.description}
            </p>
          </div>
        </section>

        {/* ═══ 3. 오행 밸런스 ═══ */}
        <section className="px-6 py-8 relative">
          <DoodleLeaf className="absolute top-2 left-6 animate-float tilt-right" />
          <DoodleCrystal className="absolute bottom-4 right-6 animate-wiggle" />

          <h2 className="font-display text-xl text-charcoal mb-4">⚖️ 내 안의 오행 밸런스</h2>
          <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow">
            <div className="space-y-3">
              {(["wood", "fire", "earth", "metal", "water"] as const).map((key) => {
                const count = d.fiveElements[key] || 0;
                const pct = Math.round((count / total) * 100);
                const info = ELEMENT_INFO[key];
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-lg w-6 text-center">{info.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-sub">{info.label}</span>
                        <span className="font-mono text-text-muted">{pct}%</span>
                      </div>
                      <div className="h-3 bg-cream rounded-full overflow-hidden border border-charcoal/10">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${Math.max(pct, 4)}%`, backgroundColor: info.color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-charcoal/10">
              <p className="text-sm text-text-sub">
                {dominantElement && (
                  <>
                    <span className="font-semibold text-charcoal">{ELEMENT_INFO[dominantElement[0]].label}</span>이 강한 편이야.{" "}
                    {dominantElement[0] === "wood" && "성장 욕구가 크고 새로운 걸 시작하는 힘이 있거든."}
                    {dominantElement[0] === "fire" && "열정적이고 에너지가 넘쳐. 사람들이 자연스럽게 따라오는 타입이야."}
                    {dominantElement[0] === "earth" && "안정감이 있고 사람들한테 신뢰를 주는 타입이야."}
                    {dominantElement[0] === "metal" && "기준이 확실하고 결단력이 있어. 판단이 정확한 편이야."}
                    {dominantElement[0] === "water" && "적응력이 좋고 머리가 잘 돌아가. 유연하게 상황을 읽는 타입이야."}
                  </>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 4. 올해 에너지 (티저) ═══ */}
        <section className="px-6 py-8 relative">
          <DoodleFire className="absolute top-4 right-8 animate-float" />
          <DoodleSparkle className="absolute bottom-8 left-6 animate-wiggle" />

          <h2 className="font-display text-xl text-charcoal mb-4">📅 2026년, 너한테 오는 에너지</h2>
          <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔥</span>
              <div>
                <p className="font-bold text-sm text-charcoal">올해는 {d.yearlyFortune.ganZhi}년</p>
                <p className="text-xs text-text-muted">{d.yearlyFortune.energy} 에너지가 강한 해</p>
              </div>
            </div>

            <p className="text-sm text-text-sub mb-2">
              너의 용신은 {d.yongShin.emoji} {d.yongShin.element}인데...
            </p>
            <p className="text-sm text-text-sub blur-lock">
              올해 화(火) 에너지와 너의 용신이 만나면 특별한 흐름이 생기거든.
              이 조합에서 가장 좋은 달은 3월과 9월이야. 특히 재물운에서...
            </p>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-charcoal/10">
              <button onClick={() => router.push(`/purchase/${id}`)} className="w-full text-center text-pink text-sm font-bold">
                🔒 올해 운세 전체 보기 →
              </button>
            </div>
          </div>
        </section>

        {/* ═══ 5. 궁합 티저 ═══ */}
        <section className="px-6 py-8 relative">
          <DoodleHeart className="absolute top-2 left-10 animate-float" />
          <DoodleBow className="absolute bottom-4 right-8 animate-wiggle tilt-left" />

          <h2 className="font-display text-xl text-charcoal mb-4">💕 나랑 잘 맞는 유형은?</h2>
          <div className="space-y-3">
            {/* 찰떡 궁합 (공개) */}
            {bestType && (
              <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-neon-green/10 text-neon-green text-xs font-bold px-2.5 py-1 rounded-full border border-neon-green/30">♥ 찰떡 궁합</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{bestType.emoji}</span>
                  <div>
                    <p className="font-bold text-sm text-charcoal">{bestType.name}</p>
                    <p className="text-xs text-text-muted">{bestType.ilju}({bestType.hanja}) · {bestType.gender === "male" ? "남" : "여"}</p>
                  </div>
                </div>
                <p className="text-sm text-text-sub mt-2">
                  서로 없는 걸 채워주는 조합이야. 같이 있으면 편하고, 오래 갈 확률이 높아.
                </p>
              </div>
            )}

            {/* 주의 궁합 (블러) */}
            {worstType && (
              <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow relative">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-pink/10 text-pink text-xs font-bold px-2.5 py-1 rounded-full border border-pink/30">⚡ 주의 궁합</span>
                </div>
                <div className="flex items-center gap-3 blur-lock">
                  <span className="text-3xl">{worstType.emoji}</span>
                  <div>
                    <p className="font-bold text-sm text-charcoal">{worstType.name}</p>
                    <p className="text-xs text-text-muted">{worstType.ilju}</p>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent rounded-b-2xl flex items-end justify-center pb-3">
                  <span className="text-pink text-xs font-bold">🔒 풀 리포트에서 확인</span>
                </div>
              </div>
            )}

            <button className="w-full bg-[#FEE500] text-charcoal text-sm font-bold py-3 rounded-xl border-2 border-charcoal sticker-shadow active:scale-95 transition-transform">
              📲 상대방한테 테스트 보내기
            </button>
          </div>
        </section>

        {/* ═══ 6. 대운 타임라인 ═══ */}
        <section className="px-6 py-8 relative">
          <DoodleCloud className="absolute top-2 left-4 animate-float" />
          <DoodleStar className="absolute bottom-6 right-6 animate-wiggle" style={{ animationDelay: "1s" }} />

          <h2 className="font-display text-xl text-charcoal mb-4">🌊 내 인생의 큰 흐름</h2>
          <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow">
            <div className="space-y-3">
              {d.majorFortunes.map((f, i) => (
                <div
                  key={i}
                  className={`rounded-xl px-4 py-3 border-2 ${
                    f.current
                      ? "border-pink bg-pink/5"
                      : f.locked
                      ? "border-charcoal/10 bg-cream"
                      : "border-charcoal/20 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{f.emoji}</span>
                    <span className={`text-xs font-bold ${f.current ? "text-pink" : "text-charcoal"}`}>
                      {f.ageRange}
                    </span>
                    {f.current && (
                      <span className="bg-pink text-white text-[10px] font-bold px-2 py-0.5 rounded-full">지금</span>
                    )}
                    {!f.locked && !f.current && (
                      <span className="text-text-muted text-[10px]">{f.tenGod}</span>
                    )}
                  </div>
                  {f.locked ? (
                    <p className="text-xs text-text-muted blur-lock">이 시기에 큰 변화가 찾아올 수 있어. 어떤 에너지가 들어오는지 확인해봐.</p>
                  ) : (
                    <p className="text-xs text-text-sub">{f.desc}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-charcoal/10">
              <p className="text-sm text-text-sub mb-2">
                지금 너는 <span className="font-bold text-pink">편관(偏官) 대운</span>의 한가운데야.
                이 시기가 끝나면...
              </p>
              <button onClick={() => router.push(`/purchase/${id}`)} className="w-full text-center text-pink text-sm font-bold">
                🔒 전체 타임라인 보기 →
              </button>
            </div>
          </div>
        </section>

        {/* ═══ 7. 상세 리포트 미리보기 (블러) ═══ */}
        <section className="px-6 py-8 relative">
          <DoodleSparkle className="absolute top-4 left-8 animate-float" />

          <h2 className="font-display text-xl text-charcoal mb-4">📖 풀 리포트 미리보기</h2>
          <div className="space-y-3">
            {[
              { icon: "💕", title: "연애운과 인연", preview: "너한테 끌리는 사람은 주로 차분한 타입이야. 근데 실제로 잘 맞는 건 좀 다를 수 있거든..." },
              { icon: "💰", title: "재물운", preview: "정재(正財)가 강한 편이라 안정적인 수입 스타일이야. 투자보다는 꾸준히 모으는 게..." },
              { icon: "💼", title: "직업운과 적성", preview: "편관이 있어서 조직에서 인정받는 힘이 있어. 너한테 맞는 분야는..." },
              { icon: "🏥", title: "건강운", preview: "토(土)가 좀 과한 편이라 소화기 쪽을 신경 쓰면 좋겠어. 특히..." },
            ].map((sec) => (
              <div key={sec.title} className="bg-white rounded-2xl p-4 border-2 border-charcoal sticker-shadow relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{sec.icon}</span>
                  <span className="font-bold text-sm text-charcoal">{sec.title}</span>
                </div>
                <p className="text-xs text-text-sub leading-relaxed blur-lock">
                  {sec.preview}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent rounded-b-2xl flex items-end justify-center pb-2">
                  <span className="text-pink text-[10px] font-bold">🔒</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 8. CTA ═══ */}
        <section className="px-6 py-10 relative">
          <DoodleStar className="absolute top-4 right-10 animate-wiggle" />
          <DoodleHeart className="absolute bottom-16 left-8 animate-float" />

          <div className="bg-white rounded-2xl p-6 border-2 border-charcoal sticker-shadow text-center">
            <p className="font-display text-lg text-charcoal mb-2">14개 섹션 · 15,000자+</p>
            <p className="text-text-sub text-xs mb-4">연애운 · 재물운 · 직업운 · 건강운 · 대운 · 올해 운세 · 용신 · 궁합 · 신살</p>

            <button
              onClick={() => router.push(`/purchase/${id}`)}
              className="w-full bg-pink text-white font-bold text-base py-4 rounded-2xl border-2 border-charcoal sticker-shadow active:scale-[0.98] transition-transform mb-3"
            >
              {"✦ ₩9,900 · 풀 리포트 받기 ✦"}
            </button>

            <p className="text-text-muted text-xs">
              {"지금까지 "}
              <span className="font-bold text-pink">12,847명</span>
              {"이 확인했어요"}
            </p>
          </div>
        </section>

        <div className="h-8" />
      </div>
    </main>
  );
}
