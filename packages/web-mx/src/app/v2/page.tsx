"use client";

import { useState } from "react";
import { BirthForm } from "@/components/birth-form";
import { trackEvent, EVENTS } from "@/components/analytics";

const ELEMENT_COLORS = {
  wood: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300", emoji: "🌳" },
  fire: { bg: "bg-red-100", text: "text-red-600", border: "border-red-300", emoji: "🔥" },
  earth: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300", emoji: "⛰️" },
  metal: { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-300", emoji: "⚔️" },
  water: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-300", emoji: "🌊" },
};

const SAMPLE_ARCHETYPES = [
  {
    id: "甲申",
    name: "El Inventor Rebelde",
    korean: "갑신",
    frase: "Rompe moldes para crear bosques",
    element: "wood" as const,
    traits: ["Creativo", "Inconformista", "Visionario"],
    weakness: "Impaciente con la rutina",
    speech: "¿Reglas? Las reescribo.",
  },
  {
    id: "庚午",
    name: "El Guerrero Forjado",
    korean: "경오",
    frase: "Del fuego nace el acero más fuerte",
    element: "metal" as const,
    traits: ["Determinado", "Líder natural", "Resistente"],
    weakness: "Terco y poco flexible",
    speech: "No me muevo. Avanzo.",
  },
  {
    id: "癸酉",
    name: "El Alquimista del Rocío",
    korean: "계유",
    frase: "Una gota revela todo el universo",
    element: "water" as const,
    traits: ["Intuitivo", "Analítico", "Misterioso"],
    weakness: "Se pierde en sus pensamientos",
    speech: "Ya lo sabía antes de que me lo dijeras.",
  },
  {
    id: "丁亥",
    name: "El Guía en la Niebla",
    korean: "정해",
    frase: "Una luz que ninguna ola apaga",
    element: "fire" as const,
    traits: ["Empático", "Resiliente", "Inspirador"],
    weakness: "Se olvida de sí mismo por ayudar",
    speech: "Si no hay camino, yo soy la luz.",
  },
  {
    id: "己丑",
    name: "El Guardián Eterno",
    korean: "기축",
    frase: "La paciencia mueve más que la fuerza",
    element: "earth" as const,
    traits: ["Paciente", "Confiable", "Leal"],
    weakness: "Demasiado cauteloso",
    speech: "Yo no corro. Pero siempre llego.",
  },
];

export default function V2LandingPage() {
  const [showForm, setShowForm] = useState(false);

  const openForm = (location: string) => {
    trackEvent(EVENTS.FORM_OPEN, { location: `v2_${location}` });
    setShowForm(true);
  };

  return (
    <main className="min-h-screen" style={{ background: "#FAF6F0", color: "#1A1A1A" }}>
      <div className="w-full max-w-[448px] mx-auto">

        {/* ═══ HERO ═══ */}
        <section className="px-5 pt-10 pb-6 text-center">
          <p className="text-sm tracking-wider mb-3" style={{ color: "#E8924A" }}>
            ✦ SAJU ASTRAL ✦
          </p>
          <h1 className="text-3xl font-extrabold leading-tight mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            ¿Qué tipo de
            {" "}<span style={{ color: "#D4A853" }}>alma</span> eres?
          </h1>
          <p className="text-sm mb-6" style={{ color: "#999" }}>
            No es horóscopo. No es MBTI. Es más preciso que ambos.
          </p>
        </section>

        {/* ═══ FEATURED CHARACTER CARD ═══ */}
        <section className="px-5 pb-8">
          <div
            className="rounded-3xl overflow-hidden relative"
            style={{ background: "#FAF3EB", border: "2px solid #E8DED0" }}
          >
            {/* Top label */}
            <div className="px-5 pt-4 pb-2 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold tracking-wider" style={{ color: "#C4A67D" }}>
                  壬寅 · 임인
                </p>
                <p className="text-xs" style={{ color: "#BBB" }}>
                  🌊 Agua · Elemento dominante
                </p>
              </div>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "#EFF6FF", color: "#2563EB" }}
              >
                #39 de 60
              </span>
            </div>

            {/* Character image */}
            <div className="px-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/characters/imin-f.png"
                alt="El Explorador Sin Fronteras — 壬寅 임인"
                className="w-full rounded-2xl"
                style={{ maxHeight: "420px", objectFit: "contain" }}
              />
            </div>

            {/* Character info overlay */}
            <div className="px-5 pt-3 pb-5">
              <h2 className="text-xl font-extrabold mb-1">El Explorador Sin Fronteras</h2>
              <p className="text-xs italic mb-3" style={{ color: "#999" }}>
                "Donde fluye el agua, nace la vida"
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {["Aventurera", "Independiente", "Valiente", "Ambiciosa", "Leal"].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: "#EFF6FF", color: "#2563EB" }}
                  >
                    ✓ {t}
                  </span>
                ))}
              </div>

              <p className="text-xs" style={{ color: "#BBB" }}>
                ⚠️ Debilidad: No se queda quieta ni para dormir
              </p>
            </div>
          </div>

          {/* CTA below card */}
          <div className="mt-5 text-center">
            <p className="text-sm font-semibold mb-3" style={{ color: "#666" }}>
              Este es solo 1 de 60 tipos. ¿Cuál eres tú?
            </p>
            <button
              onClick={() => openForm("hero")}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-transform active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #D4A853, #E8924A)" }}
            >
              Descubre tu tipo →
            </button>
            <p className="text-xs mt-3" style={{ color: "#BBB" }}>
              Gratis · 2 minutos · 60 tipos posibles
            </p>
          </div>
        </section>

        {/* ═══ 60 TIPOS TEASE ═══ */}
        <section className="px-5 py-10">
          <h2 className="text-2xl font-extrabold text-center mb-2">
            60 tipos de alma.
            <br />
            <span style={{ color: "#D4A853" }}>¿Cuál eres tú?</span>
          </h2>
          <p className="text-center text-sm mb-8" style={{ color: "#888" }}>
            El Saju coreano identifica 60 personalidades únicas.
            <br />
            Aquí van algunos... ¿te identificas?
          </p>

          <div className="space-y-5">
            {SAMPLE_ARCHETYPES.map((arch) => {
              const colors = ELEMENT_COLORS[arch.element];
              return (
                <div
                  key={arch.id}
                  className={`rounded-2xl p-5 border-2 ${colors.border} relative overflow-hidden`}
                  style={{ background: "white" }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold tracking-wider mb-1" style={{ color: "#BBB" }}>
                        {arch.id} · {arch.korean}
                      </p>
                      <h3 className="text-xl font-extrabold leading-tight">{arch.name}</h3>
                    </div>
                    <span className="text-3xl">{colors.emoji}</span>
                  </div>

                  {/* Speech bubble */}
                  <div
                    className="rounded-xl px-4 py-2.5 mb-4 relative"
                    style={{ background: "#F5F0E8" }}
                  >
                    <p className="text-sm font-semibold italic">"{arch.speech}"</p>
                    <div
                      className="absolute -bottom-2 left-6 w-0 h-0"
                      style={{
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "8px solid #F5F0E8",
                      }}
                    />
                  </div>

                  {/* Traits */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {arch.traits.map((t) => (
                      <span
                        key={t}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}
                      >
                        ✓ {t}
                      </span>
                    ))}
                  </div>

                  {/* Weakness */}
                  <p className="text-xs" style={{ color: "#999" }}>
                    ⚠️ Debilidad: {arch.weakness}
                  </p>

                  {/* Frase */}
                  <div className="mt-3 pt-3" style={{ borderTop: "1px dashed #E5E0D5" }}>
                    <p className="text-xs italic" style={{ color: "#BBB" }}>
                      "{arch.frase}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm font-semibold mb-1" style={{ color: "#666" }}>
              ...y 55 tipos más.
            </p>
            <p className="text-xs" style={{ color: "#999" }}>
              ¿Eres El Poeta de la Lluvia? ¿La Protectora Generosa?
              <br />
              ¿El Dragón del Océano? Solo hay una forma de saberlo.
            </p>
          </div>
        </section>

        {/* ═══ SAJU vs OTHERS ═══ */}
        <section className="px-5 py-10">
          <div className="rounded-2xl p-5" style={{ background: "white" }}>
            <h2 className="text-xl font-extrabold text-center mb-6">
              ¿Por qué no es un
              <br />
              horóscopo más? 🤔
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-lg">🔮</span>
                <div>
                  <p className="font-bold">Horóscopo: 12 signos</p>
                  <p style={{ color: "#999" }}>Compartes signo con 600 millones de personas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🧠</span>
                <div>
                  <p className="font-bold">MBTI: 16 tipos</p>
                  <p style={{ color: "#999" }}>Te toca uno de 16. Cambia según el día.</p>
                </div>
              </div>
              <div
                className="flex items-start gap-3 rounded-xl p-3 -mx-1"
                style={{ background: "#FFF9EE", border: "2px solid #D4A853" }}
              >
                <span className="text-lg">✦</span>
                <div>
                  <p className="font-bold" style={{ color: "#D4A853" }}>
                    Saju: 518,400 combinaciones
                  </p>
                  <p style={{ color: "#888" }}>
                    Año + mes + día + hora exacta. Único como tus huellas digitales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ ELEMENT QUIZ TEASE ═══ */}
        <section className="px-5 py-10">
          <h2 className="text-2xl font-extrabold text-center mb-2">
            Tu alma tiene un
            <br />
            <span style={{ color: "#D4A853" }}>elemento dominante</span>
          </h2>
          <p className="text-center text-sm mb-6" style={{ color: "#888" }}>
            Madera, Fuego, Tierra, Metal o Agua — cada uno define cómo piensas, amas y trabajas
          </p>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {[
              { emoji: "🌳", name: "Madera", color: "#059669", bg: "#ECFDF5" },
              { emoji: "🔥", name: "Fuego", color: "#DC2626", bg: "#FEF2F2" },
              { emoji: "⛰️", name: "Tierra", color: "#D97706", bg: "#FFFBEB" },
              { emoji: "⚔️", name: "Metal", color: "#475569", bg: "#F1F5F9" },
              { emoji: "🌊", name: "Agua", color: "#2563EB", bg: "#EFF6FF" },
            ].map((el) => (
              <div
                key={el.name}
                className="rounded-xl p-3 text-center"
                style={{ background: el.bg }}
              >
                <p className="text-2xl mb-1">{el.emoji}</p>
                <p className="text-xs font-bold" style={{ color: el.color }}>
                  {el.name}
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl p-4 text-center"
            style={{ background: "#F5F0E8" }}
          >
            <p className="text-sm" style={{ color: "#666" }}>
              🤫 Tu elemento no se elige — <strong>ya nació contigo</strong>.
              <br />
              Y define con quién eres compatible... y de quién deberías huir.
            </p>
          </div>
        </section>

        {/* ═══ WHAT YOU GET ═══ */}
        <section className="px-5 py-10">
          <h2 className="text-2xl font-extrabold text-center mb-2">
            Esto es lo que
            <br />
            <span style={{ color: "#D4A853" }}>descubrirás</span>
          </h2>
          <p className="text-center text-sm mb-6" style={{ color: "#888" }}>
            Gratis: tu tipo de alma + resumen.
            <br />
            Reporte completo: 8 capítulos, +15,000 palabras.
          </p>

          <div className="space-y-3">
            {[
              { icon: "🪞", title: "Tu tipo de alma", desc: "De los 60 tipos, ¿cuál eres?", free: true },
              { icon: "💕", title: "Tu pareja destinada", desc: "Cómo es, cuándo llega, dónde lo encuentras", free: false },
              { icon: "💰", title: "Tu ciclo de riqueza", desc: "Cuándo viene el dinero (y cuándo cuidarlo)", free: false },
              { icon: "⚠️", title: "Tus 3 años peligrosos", desc: "El ciclo que los coreanos temen cada 9 años", free: false },
              { icon: "🚀", title: "Tu carrera ideal", desc: "Talento innato + timing de oportunidades", free: false },
              { icon: "🍀", title: "Tu guía de suerte", desc: "Colores, números, lugares que te favorecen", free: false },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-xl p-4"
                style={{ background: "white" }}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs" style={{ color: "#999" }}>{item.desc}</p>
                </div>
                {item.free ? (
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    GRATIS
                  </span>
                ) : (
                  <span className="text-xs" style={{ color: "#CCC" }}>🔒</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SOCIAL PROOF ═══ */}
        <section className="px-5 py-10">
          <h2 className="text-xl font-extrabold text-center mb-6">
            "No mames, ¿cómo sabe eso?" 😳
          </h2>

          <div className="space-y-4">
            {[
              {
                name: "Car***@gmail.com",
                type: "🌳 El Soñador Floreciente",
                text: "Dijo que en noviembre cambiaría de trabajo. Adivinen qué pasó en noviembre. 🤯",
                date: "Hace 3 días",
              },
              {
                name: "Ana***@hotmail.com",
                type: "🔥 El Líder Apasionado",
                text: "La descripción de mi 'pareja destinada' es LITERALMENTE mi novio. Casi le mando captura.",
                date: "Hace 1 semana",
              },
              {
                name: "Lui***@gmail.com",
                type: "🌊 El Poeta de la Lluvia",
                text: "Me dijo que cuidara el estómago. Una semana después: gastritis. Ahora sigo TODO lo que dice.",
                date: "Hace 2 semanas",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="rounded-xl p-4"
                style={{ background: "white" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold" style={{ color: "#999" }}>
                    {review.name}
                  </span>
                  <span className="text-xs font-bold" style={{ color: "#D4A853" }}>
                    {review.type}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-2">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-500">⭐⭐⭐⭐⭐</span>
                  <span className="text-xs" style={{ color: "#CCC" }}>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="px-5 py-10">
          <h2 className="text-xl font-extrabold text-center mb-6">
            Así de fácil 👇
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Pon tu fecha y hora de nacimiento", desc: "Pregúntale a tu mamá o revisa tu acta", emoji: "📝" },
              { step: "2", title: "El Saju calcula tu carta", desc: "518,400 combinaciones analizadas en segundos", emoji: "⚡" },
              { step: "3", title: "Descubre tu tipo de alma", desc: "Tu arquetipo + tu elemento + tu destino", emoji: "✨" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "#FFF9EE" }}
                >
                  {item.emoji}
                </div>
                <div>
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs" style={{ color: "#999" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="px-5 py-10">
          <h2 className="text-xl font-extrabold text-center mb-6">
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {[
              { q: "¿Es gratis?", a: "Sí, tu tipo de alma y resumen es 100% gratis. El reporte completo de 8 capítulos tiene un costo accesible." },
              { q: "¿Es lo mismo que el horóscopo?", a: "No. El horóscopo usa solo tu mes (12 tipos). El Saju usa año + mes + día + hora = 518,400 combinaciones únicas." },
              { q: "¿Necesito saber mi hora exacta?", a: "Sí, es clave. La hora define uno de tus 4 pilares. Revisa tu acta de nacimiento o pregúntale a tu mamá." },
              { q: "¿Es una religión?", a: "No. Es un sistema filosófico basado en los Cinco Elementos y ciclos naturales. Como la medicina china pero para tu personalidad y destino." },
            ].map((faq) => (
              <details
                key={faq.q}
                className="rounded-xl group"
                style={{ background: "white" }}
              >
                <summary className="p-4 cursor-pointer text-sm font-bold flex items-center justify-between">
                  {faq.q}
                  <span
                    className="transition-transform group-open:rotate-45 text-lg"
                    style={{ color: "#D4A853" }}
                  >
                    +
                  </span>
                </summary>
                <p className="px-4 pb-4 text-xs leading-relaxed" style={{ color: "#666" }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div className="h-28" />
      </div>

      {/* ═══ STICKY CTA ═══ */}
      <div className="fixed bottom-0 inset-x-0 z-40">
        <div
          className="max-w-[448px] mx-auto px-5 py-4"
          style={{ background: "rgba(250, 246, 240, 0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid #E5E0D5" }}
        >
          <button
            onClick={() => {
              trackEvent(EVENTS.CTA_CLICK, { location: "v2_sticky_bottom" });
              openForm("sticky");
            }}
            className="w-full py-4 rounded-2xl text-white font-bold text-base transition-transform active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #D4A853, #E8924A)" }}
          >
            ¿Qué tipo de alma soy? →
          </button>
          <p className="text-center text-xs mt-2" style={{ color: "#BBB" }}>
            Gratis · 2 minutos · Sin registro
          </p>
        </div>
      </div>

      {/* ═══ BOTTOM SHEET ═══ */}
      {showForm && (
        <div className="fixed inset-0 z-50" style={{ touchAction: "none" }}>
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />
          <div
            className="absolute bottom-0 inset-x-0 max-w-[448px] mx-auto rounded-t-3xl animate-slide-up"
            style={{ background: "#111128", maxHeight: "90dvh", overflow: "hidden", color: "#F0ECE3" }}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-xl z-10"
              style={{ color: "#5C5775" }}
            >
              ✕
            </button>
            <div className="px-6 pb-8">
              <BirthForm />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
