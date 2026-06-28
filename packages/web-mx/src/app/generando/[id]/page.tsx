"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { trackEvent, EVENTS } from "@/components/analytics";

const STEPS = [
  { icon: "📜", text: "Leyendo tu fecha de nacimiento..." },
  { icon: "🏛️", text: "Calculando los Cuatro Pilares (四柱)..." },
  { icon: "⚖️", text: "Analizando el balance de los Cinco Elementos..." },
  { icon: "🔮", text: "Interpretando los Diez Dioses de tu carta..." },
  { icon: "📊", text: "Mapeando las Grandes Estaciones de tu vida..." },
  { icon: "⚡", text: "Generando predicciones personalizadas..." },
  { icon: "✨", text: "Redactando tu reporte de +15,000 palabras..." },
];

const TIPS = [
  "En Corea, el 78% consulta su Saju antes de casarse",
  "Tu reporte analiza 518,400 combinaciones posibles",
  "El Saju tiene más de 500 años de tradición",
  "Cada pilar representa un aspecto diferente de tu vida",
  "Los Cinco Elementos interactúan como las estaciones del año",
  "Tu reporte incluye predicciones hasta 2034",
  "Los maestros coreanos dedicaban días a una sola lectura",
  "Tu Elemento de Poder es la clave para mejorar tu suerte",
];

export default function GenerandoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const startedRef = useRef(false);

  // 단계 자동 전환 (5초 간격)
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 5000);

    return () => clearInterval(stepInterval);
  }, []);

  // 프로그레스 바 (부드럽게)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return 92;
        return prev + 0.5;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  // 팁 전환 (6초 간격)
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 6000);

    return () => clearInterval(tipInterval);
  }, []);

  const [retryCount, setRetryCount] = useState(0);

  // 리포트 생성 API 호출 (타임아웃 + 재시도)
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    fetch("/api/saju/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeout);
        if (data.success) {
          setProgress(100);
          setCurrentStep(STEPS.length - 1);
          trackEvent(EVENTS.PAYMENT_COMPLETE, { sajuId: id });
          setTimeout(() => router.push(`/reporte/${id}`), 800);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        clearTimeout(timeout);
        if (retryCount < 2) {
          startedRef.current = false;
          setRetryCount((prev) => prev + 1);
          setProgress(0);
          setCurrentStep(0);
        } else {
          setError(true);
        }
      });

    return () => clearTimeout(timeout);
  }, [id, router, retryCount]);

  if (error) {
    return (
      <main className="flex items-center justify-center min-h-screen px-5">
        <div className="text-center max-w-[400px]">
          <p className="text-4xl mb-4">😔</p>
          <h2 className="font-serif text-xl font-bold mb-2">Error al generar el reporte</h2>
          <p className="text-text-secondary text-sm mb-6">
            Hubo un problema con la generación. Por favor intenta de nuevo.
          </p>
          <button
            onClick={() => { setError(false); startedRef.current = false; setProgress(0); setCurrentStep(0); }}
            className="gradient-gold text-bg-primary font-bold text-sm py-3 px-6 rounded-xl"
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-5">
      <div className="w-full max-w-[400px] text-center">
        {/* 로고 */}
        <p className="text-gold text-sm tracking-[0.3em] uppercase mb-8">✦ Saju Astral ✦</p>

        {/* 메인 아이콘 애니메이션 */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.15),transparent_70%)] animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl animate-float" key={currentStep}>
              {STEPS[currentStep].icon}
            </span>
          </div>
          {/* 회전 링 */}
          <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: "3s" }} viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#D4A853" strokeWidth="1" strokeDasharray="8 12" opacity="0.3" />
          </svg>
        </div>

        {/* 메인 메시지 */}
        <h2 className="font-serif text-xl font-bold mb-2 animate-fade-in" key={`step-${currentStep}`}>
          {STEPS[currentStep].text}
        </h2>

        {/* 프로그레스 바 */}
        <div className="mt-6 mb-8">
          <div className="h-2 bg-bg-surface rounded-full overflow-hidden mx-8">
            <div
              className="h-full rounded-full gradient-gold transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gold font-mono text-sm mt-2">{Math.round(progress)}%</p>
        </div>

        {/* 단계 체크리스트 */}
        <div className="text-left mx-auto max-w-[300px] space-y-2 mb-8">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                i < currentStep ? "text-text-muted" :
                i === currentStep ? "text-text-primary" :
                "text-text-muted/40"
              }`}
            >
              <span className="w-5 text-center">
                {i < currentStep ? (
                  <span className="text-green-400">✓</span>
                ) : i === currentStep ? (
                  <span className="text-gold animate-pulse">●</span>
                ) : (
                  <span>○</span>
                )}
              </span>
              <span className={i === currentStep ? "font-medium" : ""}>{step.text.replace("...", "")}</span>
            </div>
          ))}
        </div>

        {/* 하단 팁 */}
        <div className="bg-bg-card rounded-xl p-4 border border-white/5 mx-4">
          <p className="text-text-secondary text-xs leading-relaxed animate-fade-in" key={`tip-${tipIndex}`}>
            💡 {TIPS[tipIndex]}
          </p>
        </div>
      </div>
    </main>
  );
}
