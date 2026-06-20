"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CountdownTimer } from "@/components/countdown-timer";
import { PurchaseToast } from "@/components/purchase-toast";

interface SajuData {
  id: string;
  name: string;
  gender: string;
  birth: { year: number; month: number; day: number; hour: number; minute: number; city: string };
  pillars: {
    year: { stem: string; branch: string; animal: string; element: string };
    month: { stem: string; branch: string; animal: string; element: string };
    day: { stem: string; branch: string; animal: string; element: string };
    hour: { stem: string; branch: string; animal: string; element: string };
  };
  fiveElements: Record<string, number>;
  dayMaster: { element: string; elementSpanish: string };
  strength: { level: string; score: number };
  yongShin: { element: string };
}

const ELEMENT_COLORS: Record<string, string> = {
  Madera: "#4ADE80",
  Fuego: "#F87171",
  Tierra: "#FBBF24",
  Metal: "#E2E8F0",
  Agua: "#60A5FA",
  wood: "#4ADE80",
  fire: "#F87171",
  earth: "#FBBF24",
  metal: "#E2E8F0",
  water: "#60A5FA",
};

export default function ResultadoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<SajuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    fetch(`/api/saju/calculate?id=${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d && d.fiveElements) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary text-sm">Calculando tu carta Saju...</p>
          <p className="text-text-muted text-xs mt-1">Analizando 518,400 combinaciones</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-text-secondary">No se encontró tu resultado.</p>
      </div>
    );
  }

  const total = Object.values(data.fiveElements).reduce((a, b) => a + b, 0) || 1;

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-[448px] mx-auto">
        {/* ═══ HEADER ═══ */}
        <section className="px-5 pt-8 pb-6 text-center">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">✦ Tu Carta Saju ✦</p>
          <h1 className="font-serif text-2xl font-bold mb-1">{data.name}</h1>
          <p className="text-text-secondary text-sm">
            {data.birth.day}/{data.birth.month}/{data.birth.year} · {data.birth.hour}:{String(data.birth.minute).padStart(2, "0")} · {data.birth.city}
          </p>
        </section>

        {/* ═══ 4기둥 차트 ═══ */}
        <section className="px-5 py-6">
          <div className="bg-bg-card rounded-2xl p-5 border border-gold/10">
            <div className="grid grid-cols-4 gap-3 text-center">
              {(["hour", "day", "month", "year"] as const).map((pos) => {
                const pillar = data.pillars[pos];
                const labels = { hour: "Hora", day: "Día", month: "Mes", year: "Año" };
                return (
                  <div key={pos}>
                    <p className="text-text-muted text-xs mb-2">{labels[pos]}</p>
                    <div className="bg-bg-surface rounded-xl p-2 mb-1">
                      <p className="text-2xl font-serif" style={{ color: ELEMENT_COLORS[pillar.element] }}>
                        {pillar.stem}
                      </p>
                      <p className="text-xs text-text-secondary">{pillar.element}</p>
                    </div>
                    <div className="bg-bg-surface rounded-xl p-2">
                      <p className="text-2xl">{pillar.animal}</p>
                      <p className="text-lg font-serif text-text-secondary">{pillar.branch}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 오행 분포 (무료) ═══ */}
        <section className="px-5 py-6">
          <h2 className="font-serif text-xl font-bold mb-1">Distribución de los Cinco Elementos</h2>
          <p className="text-text-secondary text-xs mb-4">오행 분포 — El balance energético de tu carta</p>

          <div className="space-y-3">
            {[
              { key: "wood", label: "Madera (木)", emoji: "🌳" },
              { key: "fire", label: "Fuego (火)", emoji: "🔥" },
              { key: "earth", label: "Tierra (土)", emoji: "⛰️" },
              { key: "metal", label: "Metal (金)", emoji: "⚔️" },
              { key: "water", label: "Agua (水)", emoji: "💧" },
            ].map((el) => {
              const count = data.fiveElements[el.key] || 0;
              const pct = Math.round((count / total) * 100);
              const isZero = count === 0;
              const isDominant = pct >= 40;
              return (
                <div key={el.key} className="flex items-center gap-3">
                  <span className="text-lg w-6 text-center">{el.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={isZero ? "text-red-400" : isDominant ? "text-amber" : "text-text-secondary"}>
                        {el.label}
                      </span>
                      <span className="font-mono">
                        {count} ({pct}%)
                        {isZero && " ❌"}
                        {isDominant && " ⚠️"}
                      </span>
                    </div>
                    <div className="h-2 bg-bg-surface rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.max(pct, 2)}%`,
                          backgroundColor: ELEMENT_COLORS[el.key],
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ 일간 요약 (무료, 짧은 버전) ═══ */}
        <section className="px-5 py-6">
          <div className="bg-bg-card rounded-2xl p-5 border border-white/5">
            <h2 className="font-serif text-xl font-bold mb-3">
              Tu Pilar del Día: <span className="text-gradient-gold">{data.dayMaster.elementSpanish}</span>
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Tu elemento dominante es <strong className="text-text-primary">{data.dayMaster.elementSpanish}</strong>.
              Este elemento define tu esencia — cómo piensas, cómo amas y cómo enfrentas los desafíos de la vida.
              Es la base sobre la que se construye todo tu destino...
            </p>
            <div className="relative">
              <p className="text-text-secondary text-sm leading-relaxed blur-content">
                Las personas con este elemento tienden a ser líderes naturales con una capacidad
                extraordinaria para inspirar a otros. Tu mayor fortaleza radica en tu determinación,
                pero debes cuidarte de la rigidez que puede alejarte de las personas que amas.
              </p>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-bg-card/80 text-gold text-xs font-semibold px-4 py-2 rounded-full border border-gold/20">
                  🔒 Desbloquear análisis completo
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 3대 사건 예고 ═══ */}
        <section className="px-5 py-6">
          <div className="gradient-mystic rounded-2xl p-6 border border-gold/10">
            <h2 className="font-serif text-xl font-bold text-center mb-6">
              🔮 3 eventos que cambiarán
              <br />
              <span className="text-gradient-gold">la vida de {data.name}</span>
            </h2>

            <div className="space-y-4">
              <div className="bg-bg-primary/40 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span>⚡</span>
                  <span className="text-gold font-mono text-sm">
                    {["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][Math.floor(Math.random() * 12)]} 2027
                  </span>
                </div>
                <p className="text-sm">&quot;Un encuentro inesperado que cambiará tu perspectiva del amor para siempre...&quot;</p>
              </div>

              <div className="bg-bg-primary/40 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span>💰</span>
                  <span className="text-gold font-mono text-sm">██ 20██</span>
                </div>
                <p className="text-sm">
                  &quot;Una cantidad <span className="blur-content">importante de dinero</span> llegará de una fuente inesperada&quot;
                </p>
              </div>

              <div className="bg-bg-primary/40 rounded-xl p-4 border border-white/5 opacity-50">
                <div className="flex items-center gap-2 mb-2">
                  <span>⚠️</span>
                  <span className="text-gold font-mono text-sm">████ 20██</span>
                </div>
                <p className="text-sm blur-content">
                  &quot;Un momento de precaución que deberías conocer con anticipación&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 운명의 짝 프로필 카드 ═══ */}
        <section className="px-5 py-6">
          <h2 className="font-serif text-xl font-bold text-center mb-6">
            💫 <span className="text-gradient-gold">Tu Pareja Destinada</span>
          </h2>
          <div className="bg-bg-card rounded-2xl p-5 border border-gold/20 relative overflow-hidden">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-text-secondary">Estatura</span>
                <span>1█ █ cm</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-text-secondary">Personalidad</span>
                <span className="blur-content">Amable, introvertido</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-text-secondary">Profesión</span>
                <span className="blur-content">Ingeniero / Creativo</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-text-secondary">Cuándo lo conocerás</span>
                <span className="blur-content">Noviembre 2027</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-text-secondary">Primer encuentro</span>
                <span className="blur-content">En un evento social</span>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-xl font-bold text-center mt-8 mb-6">
            ⚠️ <span className="text-red-400">Tu Persona de Cuidado</span>
          </h2>
          <div className="bg-bg-card rounded-2xl p-5 border border-red-500/20 relative overflow-hidden">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-text-secondary">Estatura</span>
                <span className="blur-content">1██ cm</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-text-secondary">Personalidad</span>
                <span className="blur-content">Manipulador, ESTJ</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-text-secondary">Peligro</span>
                <span className="blur-content">Pérdida financiera</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-text-secondary">Cuándo aparece</span>
                <span className="blur-content">2028</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 리포트 목차 ═══ */}
        <section className="px-5 py-6">
          <h2 className="font-serif text-xl font-bold text-center mb-2">
            Tu reporte incluye
          </h2>
          <p className="text-text-secondary text-xs text-center mb-6">
            +15,000 palabras · 8 capítulos · 30+ análisis
          </p>
          <div className="space-y-2">
            {[
              { ch: "01", title: "Tu Carta Saju", items: ["Análisis de 4 pilares", "Personalidad innata", "Fortalezas y debilidades", "Primera impresión vs verdadero yo"] },
              { ch: "02", title: "Destino en el Amor", items: ["Momento exacto del amor", "Perfil de tu pareja", "Escenario del primer encuentro", "Tu arma secreta de seducción"] },
              { ch: "03", title: "Destino Financiero", items: ["Ciclo de riqueza", "¿Negocio o empleo?", "Periodos de riesgo", "Tu estrategia de inversión"] },
              { ch: "04", title: "Matrimonio y Familia", items: ["Pareja ideal detallada", "Timing de matrimonio", "Hijos que te depara el destino"] },
              { ch: "05", title: "Carrera y Logros", items: ["Talento innato", "Mejor momento para cambiar", "Ascensos y oportunidades"] },
              { ch: "06", title: "Relaciones Clave", items: ["Tu ángel guardián", "Tu persona tóxica", "Cómo ganarte la confianza"] },
              { ch: "07", title: "Salud y Bienestar", items: ["Puntos débiles", "Periodos de riesgo", "Dieta y ejercicio ideal"] },
              { ch: "08", title: "Guía de Buena Fortuna", items: ["3 cosas que evitar", "3 cosas que hacer", "Tu fórmula personal de suerte"] },
            ].map((ch) => (
              <details key={ch.ch} className="bg-bg-card rounded-xl border border-white/5 group">
                <summary className="p-4 cursor-pointer flex items-center gap-3">
                  <span className="text-gold font-mono text-xs">Cap.{ch.ch}</span>
                  <span className="font-semibold text-sm flex-1">{ch.title}</span>
                  <span className="text-text-muted text-xs group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-4 pb-4">
                  <ul className="space-y-1">
                    {ch.items.map((item) => (
                      <li key={item} className="text-text-secondary text-xs flex items-center gap-2">
                        <span className="text-gold">✦</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ═══ 후기 ═══ */}
        <section className="px-5 py-6">
          <h2 className="font-serif text-xl font-bold text-center mb-6">
            Miles de personas ya descubrieron su Saju
          </h2>
          <div className="space-y-3">
            {[
              { name: "Mar***@gmail.com", text: "La parte de la pareja destinada me dejó en shock. Todo coincide con mi novio.", stars: 5 },
              { name: "Jes***@outlook.com", text: "Nunca creí en esto pero las fechas que me dió fueron exactas. Increíble.", stars: 5 },
              { name: "Rob***@gmail.com", text: "Mucho más profundo que cualquier horóscopo. Vale cada peso.", stars: 5 },
            ].map((r) => (
              <div key={r.name} className="bg-bg-card rounded-xl p-4 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-text-muted">{r.name}</span>
                  <span className="text-xs">{"⭐".repeat(r.stars)}</span>
                </div>
                <p className="text-sm text-text-secondary">&quot;{r.text}&quot;</p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-40" />
      </div>

      {/* ═══ 하단 고정 CTA ═══ */}
      <div className="fixed bottom-0 inset-x-0 z-40">
        <div className="max-w-[448px] mx-auto bg-bg-primary/95 backdrop-blur-lg border-t border-gold/10 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-text-muted text-xs line-through mr-2">$499 MXN</span>
              <span className="text-gold font-serif text-xl font-bold">$299 MXN</span>
            </div>
            <CountdownTimer />
          </div>
          <button
            disabled={purchasing}
            onClick={async () => {
              setPurchasing(true);
              try {
                const res = await fetch("/api/payment/create", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ sajuId: id }),
                });
                const data = await res.json();
                if (data.mode === "payment" && data.initPoint) {
                  window.location.href = data.initPoint;
                } else {
                  await fetch("/api/saju/report", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id }),
                  });
                  router.push(`/reporte/${id}`);
                }
              } catch {
                router.push(`/reporte/${id}`);
              }
            }}
            className="w-full gradient-gold text-bg-primary font-bold text-base py-4 rounded-xl animate-pulse-gold transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            {purchasing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
                Generando reporte...
              </span>
            ) : (
              "✦ VER MI REPORTE COMPLETO ✦"
            )}
          </button>
          <div className="flex items-center justify-center gap-3 mt-2 text-text-muted text-xs">
            <span>💳 Tarjeta</span>
            <span>·</span>
            <span>🏪 OXXO</span>
            <span>·</span>
            <span>🏦 SPEI</span>
          </div>
        </div>
      </div>

      <PurchaseToast />
    </main>
  );
}
