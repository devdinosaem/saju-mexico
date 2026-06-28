"use client";

import { useState } from "react";
import {
  ScatteredDoodles,
  DoodleStar,
  DoodleSparkle,
  DoodleHeart,
  DoodleMoon,
  DoodleCloud,
  DoodlePizza,
  DoodleFire,
  DoodleCat,
  DoodleBow,
  DoodleCrystal,
  DoodleLeaf,
  DoodleSmiley,
} from "@/components/doodles";
import { SajuTILogo } from "@/components/logo";
import { SajuTILogoAnimated } from "@/components/logo-animated";
import { getIljuType } from "@/lib/ilju-types";

const SAMPLE_CARDS = (["경진-m", "을묘-m", "임오-m", "무진-m"] as const).map(id => {
  const t = getIljuType(id)!;
  return {
    id: t.id,
    hanja: t.hanja,
    name: t.name,
    element: t.stemElement,
    yinyang: t.yinyang,
    tagColor: t.tagColor,
    strengths: t.strengths,
    weaknesses: t.weaknesses,
    quote: t.quote,
    emoji: t.emoji,
  };
});


const REPORT_SECTIONS = [
  { icon: "💕", title: "연애운", preview: "당신이 끌리는 유형은" },
  { icon: "💰", title: "재물운", preview: "정재가 강해서 안정적인" },
  { icon: "🌊", title: "대운", preview: "31~40세에 편재 대운이" },
  { icon: "💼", title: "직업운", preview: "편관이 강한 당신은 조직보다" },
  { icon: "🏥", title: "건강운", preview: "토(土)가 과다한 당신은" },
  { icon: "📅", title: "올해 운세", preview: "2026년 병오년, 화(火)" },
];

const CELEBRITIES = [
  { emoji: "🎤", name: "아이유", ilju: "을묘(乙卯)", desc: getIljuType("을묘-f")!.name },
  { emoji: "⚽", name: "손흥민", ilju: "경인(庚寅)", desc: getIljuType("경인-m")!.name },
  { emoji: "🎬", name: "마동석", ilju: "무진(戊辰)", desc: getIljuType("무진-m")!.name },
];

const REVIEWS = [
  { text: "MBTI보다 소름... 이게 진짜 나", who: "28세 직장인" },
  { text: "캡처해서 스토리 올렸더니 친구들 난리ㅋㅋ", who: "24세 대학생" },
  { text: "남친이랑 궁합 봤는데 찐이었음", who: "26세 회사원" },
];

export default function LandingPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-[440px] mx-auto overflow-hidden">

        {/* ═══ HERO ═══ */}
        <section className="relative px-6 pt-16 pb-14 text-center">
          <ScatteredDoodles />

          <div className="relative flex flex-col items-center mb-6">
            <SajuTILogo className="w-16 h-16 mb-2" />
            <p className="font-display text-sm tracking-[0.3em] text-pink">
              ✦ 사주TI ✦
            </p>
          </div>

          <h1 className="relative font-display text-[2.2rem] leading-[1.15] mb-3 text-charcoal">
            태어날 때 정해진
            <br />
            <span className="highlight-pink">&apos;나&apos;</span>의 사주TI는?
          </h1>

          <p className="relative text-text-sub text-sm mb-8 leading-relaxed">
            바뀌지 않는 120개 유형 중<br />
            나는 어디에 있을까
          </p>

          {/* 미니 태그 */}
          <div className="relative flex justify-center gap-2 mb-8 text-xs">
            <span className="bg-white border-2 border-charcoal rounded-full px-3 py-1 sticker-shadow font-semibold">
              🎯 120개 유형
            </span>
            <span className="bg-white border-2 border-charcoal rounded-full px-3 py-1 sticker-shadow font-semibold">
              🔒 절대 안 변함
            </span>
            <span className="bg-white border-2 border-charcoal rounded-full px-3 py-1 sticker-shadow font-semibold">
              ⚡ 10초
            </span>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="relative bg-pink text-white font-bold text-base px-10 py-4 rounded-2xl border-2 border-charcoal sticker-shadow active:scale-95 transition-transform"
          >
            ✦ 내 사주TI 확인하기 ✦
          </button>
          <p className="relative text-text-muted text-xs mt-3">
            생년월일시만 입력 · 무료
          </p>
        </section>

        {/* ═══ 실시간 카운터 ═══ */}
        <section className="px-6 py-10 relative">
          <DoodleSmiley className="absolute top-6 right-8 animate-wiggle" />

          <div className="bg-white rounded-2xl p-4 border-2 border-charcoal sticker-shadow text-center">
            <p className="text-text-muted text-xs mb-1">지금까지</p>
            <p className="font-display text-3xl text-pink">12,847<span className="text-sm text-text-muted font-sans">명</span></p>
            <p className="text-text-muted text-xs mb-3">이 확인했어요</p>

            <div className="space-y-1.5">
              {[
                { time: "3분 전", city: "서울", age: "28세", type: getIljuType("을묘-f")!.name, emoji: getIljuType("을묘-f")!.emoji },
                { time: "5분 전", city: "부산", age: "24세", type: getIljuType("경진-m")!.name, emoji: getIljuType("경진-m")!.emoji },
                { time: "8분 전", city: "대구", age: "31세", type: getIljuType("임오-m")!.name, emoji: getIljuType("임오-m")!.emoji },
              ].map((feed) => (
                <div key={feed.time} className="flex items-center gap-2 text-xs text-text-sub">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green shrink-0" />
                  <span className="text-text-muted">{feed.time}</span>
                  <span>{feed.city} · {feed.age}</span>
                  <span className="ml-auto font-semibold text-charcoal">{feed.emoji} {feed.type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 캐릭터 카드 미리보기 ═══ */}
        <section className="px-6 py-10">
          <h2 className="font-display text-2xl text-center text-charcoal mb-2">
            120개 중 당신은?
          </h2>
          <p className="text-center text-text-sub text-sm mb-6">나는 어떤 유형일까 👀</p>

          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 pt-2 snap-x scrollbar-hide">
            {SAMPLE_CARDS.map((card, i) => (
              <div
                key={card.id}
                className={`min-w-[260px] snap-center rounded-2xl p-5 border-2 border-charcoal sticker-shadow bg-white ${i % 2 === 0 ? "tilt-left" : "tilt-right"}`}
              >
                {/* 상단 */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{card.emoji}</span>
                  <span className="text-text-muted text-xs font-mono">{card.hanja}</span>
                </div>

                {/* 별명 */}
                <h3 className="font-display text-2xl text-charcoal mb-1">{card.name}</h3>

                {/* 오행 태그 */}
                <div className="flex gap-2 mb-4">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${card.tagColor} text-white border border-charcoal`}>
                    {card.element}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cream border border-charcoal text-charcoal">
                    {card.yinyang}
                  </span>
                </div>

                {/* 강점 */}
                <div className="mb-3">
                  {card.strengths.map((s) => (
                    <div key={s} className="flex items-center gap-1.5 text-sm">
                      <span className="text-neon-green">✓</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                {/* 약점 */}
                <div className="mb-4">
                  {card.weaknesses.map((w) => (
                    <div key={w} className="flex items-center gap-1.5 text-sm text-text-sub">
                      <span className="text-pink">✗</span>
                      <span>{w}</span>
                    </div>
                  ))}
                </div>

                {/* 말풍선 */}
                <div className="speech-bubble text-sm font-medium">
                  &ldquo;{card.quote}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 궁합 티저 ═══ */}
        <section className="px-6 py-10 relative">
          <DoodleHeart className="absolute top-4 left-10 animate-float" />
          <DoodleHeart className="absolute top-8 left-20 w-3 h-3 animate-float" style={{ animationDelay: "0.5s" }} />
          <DoodleCat className="absolute bottom-6 right-6 animate-wiggle" />

          <h2 className="font-display text-2xl text-center text-charcoal mb-2">
            이 조합, 실화임?
          </h2>
          <p className="text-center text-text-sub text-sm mb-6">사주TI 궁합 💕</p>

          <div className="space-y-4">
            {/* 궁합 1 — 좋은 궁합 (경진-m ↔ 을묘-f: bestMatch 실제 쌍) */}
            <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-center">
                  <span className="text-2xl">{getIljuType("경진-m")!.emoji}</span>
                  <p className="text-xs font-bold mt-1">{getIljuType("경진-m")!.name}</p>
                </div>
                <div className="bg-pink text-white text-xs font-bold px-3 py-1 rounded-full border border-charcoal">
                  ♥ 92%
                </div>
                <div className="text-center">
                  <span className="text-2xl">{getIljuType("을묘-f")!.emoji}</span>
                  <p className="text-xs font-bold mt-1">{getIljuType("을묘-f")!.name}</p>
                </div>
              </div>
              <p className="text-center text-sm text-text-sub">
                &ldquo;서로 없는 걸 채워주는 <span className="highlight-pink font-semibold text-charcoal">환상의 조합</span>&rdquo;
              </p>
            </div>

            {/* 궁합 2 — 묘한 궁합 (임오-m ↔ 무진-f: worstMatch 실제 쌍) */}
            <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow tilt-slight">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-center">
                  <span className="text-2xl">{getIljuType("임오-m")!.emoji}</span>
                  <p className="text-xs font-bold mt-1">{getIljuType("임오-m")!.name}</p>
                </div>
                <div className="bg-mustard text-charcoal text-xs font-bold px-3 py-1 rounded-full border border-charcoal">
                  ⚡ 41%
                </div>
                <div className="text-center">
                  <span className="text-2xl">{getIljuType("무진-f")!.emoji}</span>
                  <p className="text-xs font-bold mt-1">{getIljuType("무진-f")!.name}</p>
                </div>
              </div>
              <p className="text-center text-sm text-text-sub">
                &ldquo;매일 싸우는데 <span className="highlight-yellow font-semibold text-charcoal">헤어지진 않음</span> ㅋㅋ&rdquo;
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-6">
            <button onClick={() => setShowForm(true)} className="text-pink font-bold text-sm">
              내 궁합 유형은? →
            </button>
            <p className="text-text-muted text-xs">카톡으로 상대방한테 보내기 📲</p>
          </div>
        </section>

        {/* ═══ 리포트 미리보기 ═══ */}
        <section className="px-6 py-10">
          <h2 className="font-display text-2xl text-center text-charcoal mb-2">
            이런 분석을 받아요
          </h2>
          <p className="text-center text-text-sub text-sm mb-6">
            14개 섹션 · 15,000자+ 맞춤 리포트
          </p>

          {/* 본질 미리보기 */}
          <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow mb-5 relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🪞</span>
              <span className="font-bold text-sm">나의 본질</span>
            </div>
            <p className="text-sm leading-relaxed text-text-sub">
              당신은 <span className="font-semibold text-charcoal">갑목(甲木) 일간</span>,
              거대한 소나무 같은 사람이에요. 한번 뿌리를 내리면 어떤 폭풍에도 꺾이지 않는
              강인함이 있지만, 동시에 하늘을 향해 끊임없이 뻗어나가려는 성장 본능이 있어요.
            </p>
            <p className="text-sm leading-relaxed mt-2 blur-lock">
              주변 사람들이 당신에게서 느끼는 첫인상은 믿음직하다는 거예요. 그런데 정작
              본인은 내면에 숨겨진 불안과 완벽주의가 있어서...
            </p>
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent rounded-b-2xl" />
            <button
              onClick={() => setShowForm(true)}
              className="relative text-pink text-sm font-bold mt-2"
            >
              🔒 전체 분석 보기 →
            </button>
          </div>

          {/* 섹션 캐러셀 */}
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-6 px-6 snap-x scrollbar-hide">
            {REPORT_SECTIONS.map((sec) => (
              <div
                key={sec.title}
                className="min-w-[150px] snap-center bg-white rounded-xl p-4 border-2 border-dashed border-charcoal/30"
              >
                <span className="text-xl">{sec.icon}</span>
                <p className="font-bold text-xs mt-2 mb-1">{sec.title}</p>
                <p className="text-xs text-text-muted leading-snug">
                  &ldquo;{sec.preview}
                  <span className="blur-lock inline"> 상세 내용</span>&rdquo;
                </p>
                <p className="text-pink text-xs font-bold mt-2">🔒</p>
              </div>
            ))}
          </div>

          <p className="text-center text-text-muted text-xs mt-4">
            + 용신 가이드 · 궁합 · 합충형파해 · 신살 해석 등
          </p>
        </section>

        {/* ═══ 올해 경고 카드 ═══ */}
        <section className="px-6 py-10 relative">
          <DoodleFire className="absolute top-6 right-8 animate-float" />
          <DoodleFire className="absolute top-12 right-16 w-4 h-5 animate-float" style={{ animationDelay: "0.8s" }} />
          <DoodleSparkle className="absolute bottom-10 left-6 animate-wiggle" />

          <h2 className="font-display text-2xl text-center text-charcoal mb-2">
            ⚠️ 2026년, 주의보
          </h2>
          <p className="text-center text-text-sub text-sm mb-6">올해 당신에게 오는 에너지는?</p>

          <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🔥</span>
              <div>
                <p className="font-bold text-sm text-charcoal">2026년은 병오(丙午)년</p>
                <p className="text-xs text-text-muted">화(火) 에너지가 폭발하는 해</p>
              </div>
            </div>

            {/* 오행 에너지 바 */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <span className="text-xs w-10 text-right">화🔥</span>
                <div className="flex-1 bg-cream rounded-full h-4 border border-charcoal/20 overflow-hidden">
                  <div className="bg-gradient-to-r from-pink to-pop-orange h-full rounded-full" style={{ width: "80%" }} />
                </div>
                <span className="text-xs font-bold text-pink w-8">80%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs w-10 text-right">토⛰️</span>
                <div className="flex-1 bg-cream rounded-full h-4 border border-charcoal/20 overflow-hidden">
                  <div className="bg-mustard h-full rounded-full" style={{ width: "30%" }} />
                </div>
                <span className="text-xs text-text-muted w-8">30%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs w-10 text-right">수💧</span>
                <div className="flex-1 bg-cream rounded-full h-4 border border-charcoal/20 overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full" style={{ width: "10%" }} />
                </div>
                <span className="text-xs text-text-muted w-8">10%</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="bg-neon-green/10 rounded-xl px-4 py-2.5 border border-neon-green/30">
                <p className="text-xs">
                  <span className="font-bold text-neon-green">🟢 화(火)가 용신인 사람</span>
                  <br />
                  <span className="text-text-sub">→ 인생 최고의 해가 될 수 있음</span>
                </p>
              </div>
              <div className="bg-pink/10 rounded-xl px-4 py-2.5 border border-pink/30">
                <p className="text-xs">
                  <span className="font-bold text-pink">🔴 화(火)가 기신인 사람</span>
                  <br />
                  <span className="text-text-sub">→ 큰 결정은 미루는 게 좋을 수도</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full text-center text-pink text-sm font-bold"
            >
              나는 어느 쪽? → 확인하기
            </button>
          </div>
        </section>

        {/* ═══ 유명인 사주TI ═══ */}
        <section className="px-6 py-10">
          <h2 className="font-display text-2xl text-center text-charcoal mb-6">
            이 사람들도 같은 일주?!
          </h2>

          <div className="space-y-3">
            {CELEBRITIES.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border-2 border-charcoal sticker-shadow"
              >
                <span className="text-2xl">{c.emoji}</span>
                <div className="flex-1">
                  <span className="font-bold text-sm">{c.name}</span>
                  <span className="text-text-muted text-xs ml-2">{c.ilju}</span>
                </div>
                <span className="text-xs bg-pink-light text-pink px-2.5 py-1 rounded-full font-semibold border border-pink/30">
                  {c.desc}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-text-sub text-sm mt-4">
            나랑 같은 유명인은? →{" "}
            <button onClick={() => setShowForm(true)} className="text-pink font-bold">
              확인하기
            </button>
          </p>
        </section>

        {/* ═══ 후기 ═══ */}
        <section className="px-6 py-10">
          <div className="space-y-3">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl px-4 py-3 border-2 border-charcoal sticker-shadow ${i % 2 === 0 ? "tilt-slight" : ""}`}
              >
                <p className="text-mustard text-xs mb-1">★★★★★</p>
                <p className="text-sm font-medium">&ldquo;{r.text}&rdquo;</p>
                <p className="text-text-muted text-xs mt-1">— {r.who}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 미니 퀴즈 ═══ */}
        <section className="px-6 py-10 relative">
          <DoodleLeaf className="absolute top-4 right-6 animate-float tilt-right" />
          <DoodleCrystal className="absolute bottom-6 left-8 animate-wiggle" />

          <h2 className="font-display text-2xl text-center text-charcoal mb-2">
            30초 테스트
          </h2>
          <p className="text-center text-text-sub text-sm mb-6">내 오행 성향은? 🧪</p>

          <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow">
            <p className="font-bold text-sm text-charcoal mb-4">
              Q. 친구가 갑자기 울면?
            </p>

            <div className="space-y-2.5">
              {[
                { label: "A", text: "일단 안아줌", element: "목(木)", color: "bg-neon-green/10 border-neon-green/30 hover:bg-neon-green/20", emoji: "🌳" },
                { label: "B", text: "왜 우는지 물어봄", element: "금(金)", color: "bg-lavender/20 border-lavender/30 hover:bg-lavender/30", emoji: "💎" },
                { label: "C", text: "같이 울어버림", element: "수(水)", color: "bg-blue-100 border-blue-200 hover:bg-blue-200", emoji: "💧" },
                { label: "D", text: "맛있는 거 사줌", element: "토(土)", color: "bg-mustard/10 border-mustard/30 hover:bg-mustard/20", emoji: "⛰️" },
              ].map((opt) => (
                <button
                  key={opt.label}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 border-2 ${opt.color} transition-colors text-left`}
                >
                  <span className="font-bold text-charcoal text-sm w-5">{opt.label}</span>
                  <span className="text-sm flex-1">{opt.text}</span>
                  <span className="text-xs text-text-muted">{opt.emoji} {opt.element}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-charcoal/10">
              <p className="text-xs text-text-muted text-center leading-relaxed">
                근데 이건 <span className="text-charcoal font-semibold">네가 생각하는 나</span>고,
                <br />
                사주TI는 <span className="highlight-pink font-semibold text-charcoal">진짜 나</span>를 알려줘
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="block mx-auto mt-3 text-pink text-sm font-bold"
              >
                진짜 결과 확인하기 →
              </button>
            </div>
          </div>
        </section>

        {/* ═══ 희귀도 통계 ═══ */}
        <section className="px-6 py-10 relative">
          <DoodleStar className="absolute top-4 left-6 animate-wiggle" />
          <DoodleSparkle className="absolute top-10 right-10 animate-float" />
          <DoodleMoon className="absolute bottom-8 right-6 animate-float" style={{ animationDelay: "1s" }} />

          <h2 className="font-display text-2xl text-center text-charcoal mb-6">
            내 유형은 얼마나 희귀할까?
          </h2>

          <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow text-center mb-4">
            <span className="text-4xl">{getIljuType("경진-m")!.emoji}</span>
            <p className="font-display text-xl text-charcoal mt-2">경진일주(庚辰)</p>
            <p className="text-text-muted text-xs mt-1 mb-4">{getIljuType("경진-m")!.name}</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-cream rounded-xl py-3 border border-charcoal/10">
                <p className="font-display text-xl text-pink">3.2%</p>
                <p className="text-[10px] text-text-muted mt-1">전체 비율</p>
              </div>
              <div className="bg-cream rounded-xl py-3 border border-charcoal/10">
                <p className="font-display text-xl text-charcoal">★★★★</p>
                <p className="text-[10px] text-text-muted mt-1">희귀도</p>
              </div>
              <div className="bg-cream rounded-xl py-3 border border-charcoal/10">
                <p className="font-display text-xl text-neon-green">92%</p>
                <p className="text-[10px] text-text-muted mt-1">공유율</p>
              </div>
            </div>

            <div className="bg-cream rounded-xl px-4 py-3 border border-charcoal/10">
              <p className="text-xs text-text-sub">
                지금까지 <span className="font-bold text-charcoal">12,847명</span> 중
                <br />
                같은 유형은 <span className="font-bold text-pink">411명</span>뿐
              </p>
            </div>
          </div>

          <div className="speech-bubble text-sm text-center text-text-sub max-w-[280px] mx-auto">
            &ldquo;내 유형이 이렇게 희귀했어?!&rdquo;
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="block mx-auto mt-4 text-pink text-sm font-bold"
          >
            내 희귀도 확인하기 →
          </button>
        </section>

        <div className="h-28" />
      </div>

      {/* ═══ 하단 고정 CTA ═══ */}
      <div className="fixed bottom-0 inset-x-0 z-40">
        <div className="max-w-[440px] mx-auto bg-cream/95 backdrop-blur-md border-t-2 border-charcoal/10 px-5 py-4">
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-pink text-white font-bold text-base py-4 rounded-2xl border-2 border-charcoal sticker-shadow active:scale-[0.98] transition-transform"
          >
            ✦ 내 사주TI 확인하기 ✦
          </button>
          <p className="text-center text-text-muted text-xs mt-2">
            무료 · 생년월일시만 입력 · 10초
          </p>
        </div>
      </div>

      {/* ═══ 바텀시트 (간단 플레이스홀더) ═══ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setShowForm(false)}>
          <div
            className="w-full max-w-[440px] bg-cream rounded-t-3xl p-6 animate-slide-up border-t-2 border-charcoal"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "slide-up 0.3s ease-out" }}
          >
            <div className="w-10 h-1 bg-charcoal/20 rounded-full mx-auto mb-6" />
            <h3 className="font-display text-xl text-center mb-6">내 사주TI 확인하기</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold block mb-1">이름</label>
                <input
                  type="text"
                  placeholder="홍길동"
                  className="w-full bg-white border-2 border-charcoal rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-semibold block mb-1">년</label>
                  <input
                    type="number"
                    placeholder="1995"
                    className="w-full bg-white border-2 border-charcoal rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-pink"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">월</label>
                  <input
                    type="number"
                    placeholder="3"
                    className="w-full bg-white border-2 border-charcoal rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-pink"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">일</label>
                  <input
                    type="number"
                    placeholder="15"
                    className="w-full bg-white border-2 border-charcoal rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-pink"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold block mb-1">시</label>
                  <input
                    type="number"
                    placeholder="14"
                    className="w-full bg-white border-2 border-charcoal rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-pink"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">분</label>
                  <input
                    type="number"
                    placeholder="30"
                    className="w-full bg-white border-2 border-charcoal rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-pink"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">성별</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white border-2 border-charcoal rounded-xl py-3 text-sm font-semibold hover:bg-pink-light hover:border-pink transition-colors">
                    남성
                  </button>
                  <button className="bg-white border-2 border-charcoal rounded-xl py-3 text-sm font-semibold hover:bg-pink-light hover:border-pink transition-colors">
                    여성
                  </button>
                </div>
              </div>
            </div>

            <button className="w-full bg-pink text-white font-bold text-base py-4 rounded-2xl border-2 border-charcoal sticker-shadow mt-6 active:scale-[0.98] transition-transform">
              ✦ 확인하기 ✦
            </button>
            <p className="text-center text-text-muted text-xs mt-3 mb-2">
              태어난 시간 모르면 비워도 괜찮아요
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
