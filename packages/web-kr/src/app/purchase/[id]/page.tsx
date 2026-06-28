"use client";

import { useParams, useRouter } from "next/navigation";
import {
  DoodleStar, DoodleSparkle, DoodleHeart, DoodleSmiley,
} from "@/components/doodles";
import { SajuTILogo } from "@/components/logo";
import { ILJU_TYPES } from "@/lib/ilju-types";

const INCLUDES = [
  { icon: "🪞", text: "성격 심층 분석 (4섹션)" },
  { icon: "💕", text: "연애 · 재물 · 직업 · 건강운" },
  { icon: "🌊", text: "대운 타임라인 (10년 단위)" },
  { icon: "📅", text: "올해 운세 + 좋은 달/조심할 달" },
  { icon: "🎯", text: "용신 가이드 (색상·방위·음식)" },
  { icon: "⚡", text: "합충형파해 + 신살 해석" },
  { icon: "💌", text: "종합 메시지" },
];

const REVIEWS = [
  { text: "리포트 읽고 소름 돋았음... 진짜 나", who: "28세 직장인", stars: 5 },
  { text: "연애운 부분이 너무 정확해서 캡처함", who: "25세 대학생", stars: 5 },
  { text: "용신 가이드대로 했더니 진짜 달라짐", who: "32세 프리랜서", stars: 5 },
];

export default function PurchasePage() {
  const { id } = useParams();
  const router = useRouter();
  const type = ILJU_TYPES.find(t => t.ilju === "경진" && t.gender === "male") || ILJU_TYPES[0];

  const handlePurchase = () => {
    // 향후 토스페이먼츠 연동. 지금은 바로 generating으로
    router.push(`/generating/${id}`);
  };

  return (
    <main className="flex flex-col items-center bg-cream min-h-screen">
      <div className="w-full max-w-[440px] mx-auto">

        {/* ═══ 헤더 ═══ */}
        <section className="px-6 pt-10 pb-6 text-center relative">
          <DoodleStar className="absolute top-6 left-4 animate-wiggle" />
          <DoodleSparkle className="absolute top-8 right-6 animate-float" />

          <div className="flex flex-col items-center mb-4">
            <SajuTILogo className="w-10 h-10 mb-1" />
            <p className="text-pink text-xs tracking-[0.3em]">{"✦ 사주TI 풀 리포트 ✦"}</p>
          </div>

          {/* 미니 캐릭터 카드 */}
          <div className="bg-white rounded-2xl p-4 border-2 border-charcoal sticker-shadow inline-block mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{type.emoji}</span>
              <div className="text-left">
                <p className="font-display text-lg text-charcoal">{type.name}</p>
                <p className="text-xs text-text-muted">{"김민수 · 경진일주 · "}{type.hanja}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 포함 내용 ═══ */}
        <section className="px-6 pb-6">
          <h2 className="font-display text-lg text-charcoal mb-4">{"이런 내용이 담겨 있어"}</h2>
          <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow">
            <div className="space-y-3">
              {INCLUDES.map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-text-sub">{item.text}</span>
                  <span className="ml-auto text-neon-green text-xs">{"✓"}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t-2 border-dashed border-charcoal/10 text-center">
              <p className="text-text-muted text-xs">{"총 14개 섹션 · 15,000자+ 맞춤 분석"}</p>
            </div>
          </div>
        </section>

        {/* ═══ 후기 ═══ */}
        <section className="px-6 pb-6 relative">
          <DoodleHeart className="absolute top-0 right-8 animate-float" />

          <div className="space-y-2.5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-xl px-4 py-3 border-2 border-charcoal sticker-shadow">
                <p className="text-mustard text-[10px] mb-1">{"★".repeat(r.stars)}</p>
                <p className="text-sm font-medium">{"“"}{r.text}{"”"}</p>
                <p className="text-text-muted text-xs mt-1">{"— "}{r.who}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 가격 + CTA ═══ */}
        <section className="px-6 py-8 relative">
          <DoodleSmiley className="absolute top-2 left-6 animate-wiggle" />

          <div className="bg-white rounded-2xl p-6 border-2 border-pink/30 sticker-shadow text-center">
            {/* 가격 */}
            <div className="mb-4">
              <span className="text-text-muted text-sm line-through mr-2">{"₩19,900"}</span>
              <span className="font-display text-3xl text-pink">{"₩9,900"}</span>
            </div>

            <p className="text-xs text-text-muted mb-1">{"🎉 오픈 기념 50% 할인 중"}</p>
            <p className="text-xs text-pink font-semibold mb-5">{"남은 수량: 127개"}</p>

            {/* 결제 버튼 */}
            <button
              onClick={handlePurchase}
              className="w-full bg-pink text-white font-bold text-base py-4 rounded-2xl border-2 border-charcoal sticker-shadow active:scale-[0.98] transition-transform mb-3"
            >
              {"✦ 결제하고 리포트 받기 ✦"}
            </button>

            <div className="space-y-1.5 text-xs text-text-muted">
              <p>{"🔒 결제 후 바로 확인 가능"}</p>
              <p>{"📱 30일 내 재열람 무제한"}</p>
              <p>{"💳 안전한 결제 (토스페이먼츠)"}</p>
            </div>
          </div>
        </section>

        <div className="h-8" />
      </div>
    </main>
  );
}
