"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  DoodleStar, DoodleSparkle, DoodleMoon, DoodleCloud, DoodleSmiley,
} from "@/components/doodles";
import { SajuTILogo } from "@/components/logo";

const STEPS = [
  { icon: "📜", text: "생년월일시 확인 완료" },
  { icon: "🏛️", text: "사주 4기둥 계산 완료" },
  { icon: "⚖️", text: "오행 분석 완료" },
  { icon: "🎭", text: "십신 · 신살 해석 중..." },
  { icon: "🌊", text: "대운 타임라인 생성" },
  { icon: "✍️", text: "개인 맞춤 리포트 작성" },
  { icon: "✅", text: "최종 검수" },
];

const TIPS = [
  "사주 한 건 분석하는 데 옛날에는 3일 걸렸대",
  "너의 리포트는 15,000자가 넘는 분량이야",
  "120개 유형별로 완전 다른 해석이 나와",
  "대운 타임라인은 10년 단위로 인생을 분석하는 거야",
  "용신 가이드에 너한테 맞는 색상도 나와",
  "같은 일주도 남녀에 따라 해석이 달라",
  "한국에서는 결혼 전에 사주 궁합 보는 게 전통이야",
  "너의 오행 밸런스에 맞는 음식도 알려줄 거야",
];

export default function GeneratingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  // 단계 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 프로그레스 바
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 0.6;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // 팁 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 완료 시 리포트로 이동 (데모: 22초 후)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/report/${id}`);
    }, 22000);
    return () => clearTimeout(timer);
  }, [id, router]);

  return (
    <main className="flex flex-col items-center justify-center bg-cream min-h-screen">
      <div className="w-full max-w-[440px] mx-auto px-6 relative">
        <DoodleStar className="absolute top-8 left-4 animate-wiggle" />
        <DoodleSparkle className="absolute top-16 right-6 animate-float" />
        <DoodleMoon className="absolute bottom-32 right-4 animate-float" style={{ animationDelay: "1s" }} />
        <DoodleCloud className="absolute bottom-16 left-2 animate-float" style={{ animationDelay: "1.5s" }} />

        {/* 제목 */}
        <div className="text-center mb-8 relative">
          <SajuTILogo className="w-12 h-12 mx-auto mb-2" />
          <p className="text-pink text-xs tracking-[0.3em] mb-3">{"✦ 사주TI ✦"}</p>
          <h1 className="font-display text-2xl text-charcoal mb-2">{"리포트 만드는 중..."}</h1>
          <p className="text-text-muted text-sm">{"조금만 기다려줘 🙏"}</p>
        </div>

        {/* 프로그레스 바 */}
        <div className="mb-8 relative">
          <div className="h-4 bg-white rounded-full border-2 border-charcoal overflow-hidden sticker-shadow">
            <div
              className="h-full bg-gradient-to-r from-pink to-pop-orange rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-center text-xs text-text-muted mt-2 font-mono">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </div>

        {/* 체크리스트 */}
        <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow mb-8 relative">
          <div className="space-y-3">
            {STEPS.map((step, i) => {
              const isDone = i < currentStep;
              const isCurrent = i === currentStep;
              const isPending = i > currentStep;

              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-opacity duration-500 ${isPending ? "opacity-30" : ""}`}
                >
                  <span className="text-lg w-7 text-center">
                    {isDone ? "✅" : isCurrent ? step.icon : "⬜"}
                  </span>
                  <span className={`text-sm ${isDone ? "text-charcoal" : isCurrent ? "text-pink font-semibold" : "text-text-muted"}`}>
                    {step.text}
                    {isCurrent && (
                      <span className="inline-block ml-1 animate-pulse">{"..."}</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 랜덤 팁 */}
        <div className="bg-white rounded-2xl p-4 border-2 border-charcoal/20 sticker-shadow text-center relative">
          <DoodleSmiley className="absolute -top-3 -right-2 w-6 h-6 animate-wiggle" />
          <p className="text-xs text-text-muted mb-1">{"💡 알고 있었어?"}</p>
          <p className="text-sm text-text-sub animate-fade-up" key={tipIndex}>
            &ldquo;{TIPS[tipIndex]}&rdquo;
          </p>
        </div>
      </div>
    </main>
  );
}
