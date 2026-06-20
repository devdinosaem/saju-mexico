"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/bottom-sheet";
import { BirthForm } from "@/components/birth-form";
import { trackEvent, EVENTS } from "@/components/analytics";

export default function LandingPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-[448px] mx-auto">
        {/* ═══ HERO ═══ */}
        <section className="relative px-5 pt-12 pb-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,83,0.08),transparent_60%)]" />
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 relative">
            ✦ Saju México ✦
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight mb-6 relative">
            Tu destino está escrito
            <br />
            <span className="text-gradient-gold">en tu fecha de nacimiento</span>
          </h1>
          <p className="text-text-secondary text-base leading-relaxed mb-8 relative">
            Los coreanos llevan{" "}
            <strong className="text-text-primary">más de 500 años</strong>{" "}
            usando el Saju para tomar las decisiones más importantes de su vida
            — desde con quién casarse, hasta cuándo iniciar un negocio.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8 relative">
            <span>🇰🇷 500+ años</span>
            <span className="w-px h-4 bg-text-muted" />
            <span>⭐ 4.9/5</span>
            <span className="w-px h-4 bg-text-muted" />
            <span>📊 12,000+</span>
          </div>

          {/* 천체 일러스트 */}
          <div className="relative w-48 h-48 mx-auto mb-8 animate-float">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.15),transparent_70%)]" />
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#D4A853" strokeWidth="0.5" opacity="0.3" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#D4A853" strokeWidth="0.3" opacity="0.2" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="#E8924A" strokeWidth="0.5" opacity="0.2" />
              <text x="100" y="90" textAnchor="middle" fill="#D4A853" fontSize="28">四柱</text>
              <text x="100" y="118" textAnchor="middle" fill="#9B96A0" fontSize="11">Los Cuatro Pilares</text>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <circle
                  key={i}
                  cx={100 + 70 * Math.cos((deg * Math.PI) / 180)}
                  cy={100 + 70 * Math.sin((deg * Math.PI) / 180)}
                  r="2"
                  fill="#D4A853"
                  opacity={0.4 + (i % 3) * 0.2}
                />
              ))}
            </svg>
          </div>
        </section>

        {/* ═══ POR QUÉ SAJU — 사주란 무엇인가 ═══ */}
        <section className="px-5 py-12">
          <h2 className="font-serif text-2xl font-bold text-center mb-3">
            ¿Qué es el <span className="text-gradient-gold">Saju</span>?
          </h2>
          <p className="text-text-secondary text-center text-sm mb-8">
            사주 (四柱) — Los Cuatro Pilares del Destino
          </p>

          <div className="space-y-6">
            <div className="bg-bg-card rounded-2xl p-5 border border-white/5">
              <div className="text-3xl mb-3">🌏</div>
              <h3 className="font-semibold text-lg mb-2">No es un horóscopo más</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Mientras la astrología occidental usa 12 signos, el Saju coreano
                analiza <strong className="text-text-primary">la interacción de
                8 caracteres únicos</strong> basados en tu año, mes, día y hora
                exacta de nacimiento. Es como tu ADN cósmico — no hay dos
                personas con el mismo Saju.
              </p>
            </div>

            <div className="bg-bg-card rounded-2xl p-5 border border-white/5">
              <div className="text-3xl mb-3">🏛️</div>
              <h3 className="font-semibold text-lg mb-2">Tradición de Estado en Corea</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                En Corea, <strong className="text-text-primary">el 78% de la
                población ha consultado su Saju</strong> al menos una vez.
                Empresarios lo usan para elegir fechas de lanzamiento. Parejas
                lo consultan antes de casarse. Los presidentes coreanos
                históricamente han tenido consejeros de Saju.
              </p>
            </div>

            <div className="bg-bg-card rounded-2xl p-5 border border-white/5">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="font-semibold text-lg mb-2">Filosofía + Datos, no magia</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                El Saju se basa en los{" "}
                <strong className="text-text-primary">Cinco Elementos</strong>{" "}
                (Madera, Fuego, Tierra, Metal, Agua) y ciclos astronómicos
                reales. No predice &quot;un hombre alto y moreno&quot; — analiza los
                patrones energéticos que influyen en tu personalidad, relaciones
                y momentos clave de tu vida.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ ESTADÍSTICAS ═══ */}
        <section className="px-5 py-12">
          <div className="gradient-mystic rounded-2xl p-6 text-center border border-white/5">
            <h2 className="font-serif text-xl font-bold mb-8">El Saju en números</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: "500+", label: "Años de tradición", icon: "📜" },
                { num: "78%", label: "de coreanos lo consultan", icon: "🇰🇷" },
                { num: "200K+", label: "reportes vendidos (en Corea)", icon: "📊" },
                { num: "4.9★", label: "satisfacción promedio", icon: "⭐" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="font-serif text-2xl font-bold text-gradient-gold">{stat.num}</div>
                  <div className="text-text-secondary text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ COMPARACIÓN ═══ */}
        <section className="px-5 py-12">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">
            ¿Por qué el Saju es <span className="text-gradient-gold">diferente</span>?
          </h2>
          <div className="bg-bg-card rounded-2xl overflow-hidden border border-white/5">
            <div className="grid grid-cols-2">
              <div className="p-4 border-r border-white/5">
                <p className="text-text-muted text-xs uppercase tracking-wider mb-3">Horóscopo occidental</p>
                <ul className="text-sm text-text-secondary space-y-2">
                  <li>❌ 12 signos zodiacales</li>
                  <li>❌ Solo usa tu mes</li>
                  <li>❌ Genérico para millones</li>
                  <li>❌ Predicciones vagas</li>
                </ul>
              </div>
              <div className="p-4 bg-bg-surface/30">
                <p className="text-gold text-xs uppercase tracking-wider mb-3">✦ Saju Coreano</p>
                <ul className="text-sm space-y-2">
                  <li>✅ <strong>518,400</strong> combinaciones</li>
                  <li>✅ Año + mes + día + hora</li>
                  <li>✅ Único como tus huellas</li>
                  <li>✅ Fechas y eventos específicos</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-text-secondary text-sm text-center mt-6 leading-relaxed">
            Imagina que el horóscopo es un mapa del mundo.<br />
            <strong className="text-text-primary">El Saju es el Google Maps de tu vida</strong> — con dirección exacta y hora de llegada.
          </p>
        </section>

        {/* ═══ QUÉ INCLUYE TU REPORTE ═══ */}
        <section className="px-5 py-12">
          <h2 className="font-serif text-2xl font-bold text-center mb-3">
            Tu reporte de <span className="text-gradient-gold">+15,000 palabras</span>
          </h2>
          <p className="text-text-secondary text-sm text-center mb-8">
            8 capítulos · 30+ análisis · predicciones hasta 2034
          </p>
          <div className="space-y-3">
            {[
              { ch: "01", title: "Tu Esencia", desc: "Personalidad, fortalezas, talón de Aquiles", icon: "🪞" },
              { ch: "02", title: "Destino en el Amor", desc: "Cuándo llega, cómo es, primer encuentro", icon: "💕" },
              { ch: "03", title: "Destino Financiero", desc: "Tu ciclo de riqueza, inversión ideal", icon: "💰" },
              { ch: "04", title: "Matrimonio y Familia", desc: "Pareja ideal, hijos, timing perfecto", icon: "💒" },
              { ch: "05", title: "Carrera y Logros", desc: "Talento innato, ascensos, negocio ideal", icon: "🚀" },
              { ch: "06", title: "Relaciones Clave", desc: "Tu ángel guardián y tu persona tóxica", icon: "👥" },
              { ch: "07", title: "Salud y Bienestar", desc: "Puntos débiles, dieta, ejercicio ideal", icon: "🏥" },
              { ch: "08", title: "Guía de Buena Fortuna", desc: "Colores, números, lugares de suerte", icon: "🍀" },
            ].map((item) => (
              <div key={item.ch} className="bg-bg-card rounded-xl p-4 flex items-center gap-4 border border-white/5 hover:border-gold/20 transition-colors">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-gold text-xs font-mono">Cap.{item.ch}</span>
                    <span className="font-semibold text-sm">{item.title}</span>
                  </div>
                  <p className="text-text-secondary text-xs">{item.desc}</p>
                </div>
                <span className="text-text-muted text-xs">✦</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ PREVIEW: 대운 타임라인 ═══ */}
        <section className="px-5 py-12">
          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            Conoce las <span className="text-gradient-gold">Grandes Estaciones</span> de tu vida
          </h2>
          <p className="text-text-secondary text-sm text-center mb-8">
            El Saju divide tu vida en ciclos de 10 años — cada uno con su propia energía
          </p>

          <div className="bg-bg-card rounded-2xl p-5 border border-gold/10 relative overflow-hidden">
            <div className="space-y-3">
              {[
                { age: "11-20", label: "Descubrimiento", emoji: "🔥", desc: "Encuentras tu identidad y tus primeras pasiones", type: "good" as const },
                { age: "21-30", label: "Turbulencia", emoji: "🌊", desc: "¿Por qué algunos logran todo a los 25 y otros luchan hasta los 30? Tu Gran Estación lo explica", type: "warn" as const },
                { age: "31-40", label: "???", emoji: "🔒", desc: "Un periodo que puede cambiar todo...", type: "locked" as const },
                { age: "41-50", label: "???", emoji: "🔒", desc: "Tu mayor oportunidad está aquí...", type: "locked" as const },
              ].map((period) => (
                <div key={period.age} className={`flex items-center gap-3 ${period.type === "locked" ? "opacity-40" : ""}`}>
                  <div className="w-12 text-right">
                    <span className="text-gold font-mono text-xs">{period.age}</span>
                  </div>
                  <div className={`w-px h-10 ${period.type === "warn" ? "bg-amber/40" : "bg-gold/20"}`} />
                  <span className="text-lg">{period.emoji}</span>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${period.type === "locked" ? "blur-content" : period.type === "warn" ? "text-amber" : ""}`}>{period.label}</p>
                    <p className={`text-text-secondary text-xs leading-relaxed ${period.type === "locked" ? "blur-content" : ""}`}>{period.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5">
              <p className="text-text-secondary text-xs leading-relaxed mb-2">
                Cada persona tiene un ritmo diferente. Lo que para uno es un periodo de éxito, para otro puede ser de pruebas
                — <strong className="text-text-primary">todo depende de tu Gran Estación</strong>.
                Tu reporte revela los <strong className="text-text-primary">10 periodos</strong> de tu vida con fechas exactas.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="text-gold text-sm font-semibold hover:underline"
              >
                🔓 Ver mi línea de tiempo completa →
              </button>
            </div>
          </div>

          {/* 현시점 분석 미리보기 */}
          <div className="mt-4 gradient-mystic rounded-2xl p-5 border border-gold/10">
            <h3 className="font-serif text-lg font-bold mb-3 text-center">
              ¿En qué momento de tu vida estás <span className="text-gradient-gold">ahora</span>?
            </h3>
            <p className="text-text-secondary text-sm text-center leading-relaxed">
              El Saju no solo te dice quién eres — te dice <strong className="text-text-primary">en qué
              punto del camino estás</strong>. ¿Estás en un ciclo de crecimiento o de cosecha?
              ¿Se acerca un cambio de energía importante? Tu reporte te lo dice con fechas exactas.
            </p>
            <div className="flex justify-center gap-4 mt-4 text-xs text-text-muted">
              <span>✦ Tu Gran Estación actual</span>
              <span>✦ Cuándo cambia</span>
              <span>✦ Qué viene después</span>
            </div>
          </div>
        </section>

        {/* ═══ 삼재: 인생의 위험한 시기 ═══ */}
        <section className="px-5 py-12">
          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            ¿Sabes cuándo llegan los <span className="text-red-400">3 años más peligrosos</span> de tu vida?
          </h2>
          <p className="text-text-secondary text-sm text-center mb-8">
            En Corea lo llaman 삼재 (三災) — &quot;tres desastres&quot;. Un ciclo de calamidades que llega cada 9 años
          </p>

          {(() => {
            const year = new Date().getFullYear();
            const cycles = [
              { range: [2025, 2027], birthYears: [1975, 1979, 1983, 1987, 1991, 1995, 1999, 2003, 2007, 2011] },
              { range: [2028, 2030], birthYears: [1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010] },
              { range: [2031, 2033], birthYears: [1977, 1981, 1985, 1989, 1993, 1997, 2001, 2005, 2009] },
            ];
            const current = cycles.find(c => year >= c.range[0] && year <= c.range[1]);
            const next = cycles.find(c => c.range[0] > year) || cycles[0];
            const active = current || null;

            const phases = [
              { icon: "⚡", label: "Calamidad de entrada", color: "text-amber" },
              { icon: "🔥", label: "Calamidad máxima", color: "text-red-400" },
              { icon: "🌪️", label: "Calamidad de salida", color: "text-red-300" },
            ];
            const startYear = active ? active.range[0] : next.range[0];
            const targetBirthYears = active ? active.birthYears : next.birthYears;

            return (
              <div className="bg-bg-card rounded-2xl p-5 border border-red-500/15">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🚨</span>
                  <div>
                    <p className="font-semibold text-sm text-red-400">
                      {active
                        ? `${year}: Las Tres Calamidades están activas`
                        : `Próximo ciclo: ${next.range[0]}-${next.range[1]}`
                      }
                    </p>
                    <p className="text-text-muted text-xs">
                      Los coreanos consideran este periodo como el más peligroso de cada ciclo vital
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {phases.map((p, i) => {
                    const phaseYear = startYear + i;
                    const isCurrent = phaseYear === year;
                    return (
                      <div key={i} className={`bg-bg-surface/50 rounded-xl p-3 text-center ${isCurrent ? "border border-red-500/30 bg-red-500/8" : ""}`}>
                        <p className={`${p.color} text-lg mb-1`}>{p.icon}</p>
                        <p className={`text-xs font-bold ${isCurrent ? "text-red-400" : ""}`}>{phaseYear}</p>
                        <p className="text-text-muted text-xs">{p.label}</p>
                        {isCurrent && <p className="text-red-400 text-xs mt-0.5 font-bold">← AHORA</p>}
                      </div>
                    );
                  })}
                </div>

                <div className="bg-red-500/5 rounded-xl p-3 mb-4 border border-red-500/10">
                  <p className="text-xs font-semibold text-red-400 mb-2">
                    ⚠️ {active ? `${active.range[0]}-${active.range[1]}` : `${next.range[0]}-${next.range[1]}`} — ¿Naciste en uno de estos años?
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {targetBirthYears.map((by) => (
                      <span key={by} className="bg-white/5 text-text-primary text-xs px-2.5 py-1 rounded-full font-mono font-semibold">
                        {by}
                      </span>
                    ))}
                  </div>
                  <p className="text-text-muted text-xs mt-2">
                    Si naciste en uno de estos años, {active ? "estás" : "estarás"} en un periodo de Tres Calamidades
                  </p>
                </div>

                <p className="text-text-secondary text-xs leading-relaxed mb-3">
                  En Corea, las Tres Calamidades son <strong className="text-text-primary">tomadas con extrema
                  seriedad</strong>. Durante estos 3 años, se evitan decisiones financieras grandes,
                  cirugías no urgentes, mudanzas y cambios laborales arriesgados.
                  Conocer las fechas exactas de tu ciclo te da <strong className="text-text-primary">años de ventaja
                  para prepararte</strong>.
                </p>

                <button
                  onClick={() => setShowForm(true)}
                  className="text-gold text-sm font-semibold hover:underline"
                >
                  🔮 ¿Cuándo llegan tus Tres Calamidades? Descúbrelo →
                </button>
              </div>
            );
          })()}
        </section>

        {/* ═══ PREVIEW: 운명의 짝 카드 ═══ */}
        <section className="px-5 py-12">
          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            ¿Quién es tu <span className="text-gradient-gold">pareja destinada</span>?
          </h2>
          <p className="text-text-secondary text-sm text-center mb-8">
            Según los Cinco Elementos, cada persona tiene un elemento ideal de pareja — y uno que genera conflicto
          </p>

          {/* 오행 궁합 표 */}
          <div className="bg-bg-card rounded-2xl p-5 border border-white/5 mb-4">
            <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-3">Compatibilidad de los Cinco Elementos</p>
            <div className="space-y-2 text-xs">
              {[
                { me: "🌳 Madera", good: "💧 Agua", bad: "💎 Metal", reason: "Agua nutre Madera · Metal la corta" },
                { me: "🔥 Fuego", good: "🌳 Madera", bad: "💧 Agua", reason: "Madera alimenta Fuego · Agua lo apaga" },
                { me: "⛰️ Tierra", good: "🔥 Fuego", bad: "🌳 Madera", reason: "Fuego fortalece Tierra · Madera la penetra" },
                { me: "💎 Metal", good: "⛰️ Tierra", bad: "🔥 Fuego", reason: "Tierra genera Metal · Fuego lo funde" },
                { me: "💧 Agua", good: "💎 Metal", bad: "⛰️ Tierra", reason: "Metal enriquece Agua · Tierra la absorbe" },
              ].map((row) => (
                <div key={row.me} className="flex items-center gap-2 bg-bg-surface/30 rounded-lg p-2">
                  <span className="w-24 font-semibold">{row.me}</span>
                  <span className="text-green-400">♥ {row.good}</span>
                  <span className="text-text-muted mx-1">·</span>
                  <span className="text-red-400">✕ {row.bad}</span>
                </div>
              ))}
            </div>
            <p className="text-text-muted text-xs mt-3 italic">
              ¿Cuál es tu elemento? Tu reporte te dice con quién eres compatible — y de quién debes cuidarte.
            </p>
          </div>

          <div className="bg-bg-card rounded-2xl p-5 border border-gold/20 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💫</span>
              <span className="text-gold font-semibold text-sm uppercase tracking-wider">Tu Pareja Destinada</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-text-secondary">Elemento compatible:</span><span className="blur-content">Agua (💧)</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Personalidad:</span><span className="blur-content">Amable, responsable</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Profesión:</span><span className="blur-content">Ingeniero de sistemas</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Cuándo:</span><span className="blur-content">Noviembre 2027</span></div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-card to-transparent" />
            <div className="relative text-center mt-6">
              <button onClick={() => setShowForm(true)} className="text-gold text-sm font-semibold hover:underline">
                🔓 Desbloquear perfil completo →
              </button>
            </div>
          </div>
        </section>

        {/* ═══ 3대 사건 예고 ═══ */}
        <section className="px-5 py-12">
          <div className="gradient-mystic rounded-2xl p-6 border border-gold/10">
            <h2 className="font-serif text-xl font-bold text-center mb-6">
              🔮 3 eventos que<br />
              <span className="text-gradient-gold">cambiarán tu vida</span>
            </h2>
            <p className="text-text-secondary text-xs text-center mb-6">
              Tu Saju revela los momentos exactos que marcarán tu destino
            </p>
            <div className="space-y-4">
              <div className="bg-bg-primary/40 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber">⚡</span>
                  <span className="text-gold font-mono text-sm">Nov 2026</span>
                </div>
                <p className="text-sm">&quot;Un encuentro inesperado que cambiará tu perspectiva del amor para siempre...&quot;</p>
              </div>
              <div className="bg-bg-primary/40 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber">💰</span>
                  <span className="text-gold font-mono text-sm">Mar 20██</span>
                </div>
                <p className="text-sm">&quot;Una cantidad <span className="blur-content">importante de dinero</span> llegará de donde menos esperas&quot;</p>
              </div>
              <div className="bg-bg-primary/40 rounded-xl p-4 border border-white/5 opacity-60">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber">⚠️</span>
                  <span className="text-gold font-mono text-sm">████ 20██</span>
                </div>
                <p className="text-sm blur-content">&quot;Un momento de precaución que debes conocer con anticipación&quot;</p>
              </div>
            </div>
            <p className="text-text-muted text-xs text-center mt-4 italic">* Eventos calculados con los datos reales de tu fecha de nacimiento</p>
          </div>
        </section>

        {/* ═══ FAMOSOS COREANOS ═══ */}
        <section className="px-5 py-12">
          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            Ellos también <span className="text-gradient-gold">conocen su Saju</span>
          </h2>
          <p className="text-text-secondary text-sm text-center mb-8">
            Las estrellas coreanas que amas consultan su Saju regularmente
          </p>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 snap-x">
            {[
              { name: "BTS (방탄소년단)", fact: "Los miembros consultaron la compatibilidad de Saju entre ellos antes de debutar", element: "Fuego + Metal" },
              { name: "Son Heung-min", fact: "Su padre eligió la hora de entrenamiento basándose en su Saju para maximizar su rendimiento", element: "Madera + Agua" },
              { name: "BLACKPINK", fact: "YG Entertainment consulta Saju para elegir fechas de comeback y debuts", element: "Fuego + Tierra" },
            ].map((celeb) => (
              <div key={celeb.name} className="bg-bg-card rounded-2xl p-4 border border-white/5 min-w-[280px] snap-center">
                <p className="font-semibold text-sm mb-2">{celeb.name}</p>
                <p className="text-text-secondary text-xs leading-relaxed mb-3">{celeb.fact}</p>
                <span className="text-gold text-xs font-mono">✦ Elementos dominantes: {celeb.element}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CÓMO FUNCIONA ═══ */}
        <section className="px-5 py-12">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">
            Así de <span className="text-gradient-gold">fácil</span> es
          </h2>
          <div className="space-y-6">
            {[
              { step: "1", title: "Ingresa tu fecha y hora de nacimiento", desc: "Necesitamos tu hora exacta — pregúntale a tu mamá o revisa tu acta de nacimiento" },
              { step: "2", title: "Un experto en Saju analiza tu carta", desc: "Con fórmulas acumuladas durante siglos por maestros coreanos, calculamos las 518,400 combinaciones posibles y generamos tu perfil único" },
              { step: "3", title: "Recibe tu reporte personalizado", desc: "+15,000 palabras de análisis profundo sobre amor, dinero, salud, carrera y más" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center shrink-0 font-serif font-bold text-bg-primary">{item.step}</div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ TESTIMONIOS ═══ */}
        <section className="px-5 py-12">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">
            Lo que dicen <span className="text-gradient-gold">nuestros usuarios</span>
          </h2>
          <div className="space-y-4">
            {[
              { name: "Car***@gmail.com", sign: "🌳 Alma Armónica", stars: 5, text: "Pensé que sería como cualquier horóscopo, pero la precisión de las fechas me dejó sin palabras. Exactamente en el mes que dijo, cambié de trabajo.", date: "Hace 3 días" },
              { name: "Ana***@hotmail.com", sign: "🔥 Alma Poderosa", stars: 5, text: "Lo de la 'pareja destinada' sonaba a cuento, pero la descripción coincide EXACTAMENTE con mi novio actual. Casi da miedo.", date: "Hace 1 semana" },
              { name: "Lui***@gmail.com", sign: "💧 Alma Sensible", stars: 5, text: "Mi reporte de salud me dijo que cuidara el estómago. Literalmente una semana después me diagnosticaron gastritis. Ahora sigo todos los consejos.", date: "Hace 2 semanas" },
            ].map((review) => (
              <div key={review.name} className="bg-bg-card rounded-2xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">{review.name}</span>
                  <span className="text-gold text-xs font-mono">{review.sign}</span>
                </div>
                <div className="text-amber text-xs mb-2">{"⭐".repeat(review.stars)}</div>
                <p className="text-sm leading-relaxed mb-2">&quot;{review.text}&quot;</p>
                <p className="text-text-muted text-xs">{review.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ GARANTÍAS ═══ */}
        <section className="px-5 py-12">
          <div className="space-y-4">
            {[
              { icon: "🔒", title: "100% personalizado", desc: "No recibirás un texto genérico. Tu reporte se genera desde cero con IA especializada en Saju coreano." },
              { icon: "📚", title: "Tradición + Tecnología", desc: "Algoritmo basado en el Gungtonbbogam (궁통보감), el texto clásico de Saju escrito en el siglo XVII." },
              { icon: "💳", title: "Pago seguro con MercadoPago", desc: "Tarjeta, OXXO o SPEI. Tu información financiera nunca pasa por nosotros." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 bg-bg-card rounded-xl p-4 border border-white/5">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="px-5 py-12">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              { q: "¿Es lo mismo que el horóscopo?", a: "No. El horóscopo usa solo tu mes. El Saju usa tu año, mes, día y hora exacta, creando 518,400 combinaciones únicas. Es incomparablemente más preciso y personalizado." },
              { q: "¿Necesito saber mi hora exacta de nacimiento?", a: "Sí, es fundamental. La hora determina uno de los 4 pilares de tu carta. Puedes encontrarla en tu acta de nacimiento o preguntarle a tu mamá." },
              { q: "¿Es una religión o secta?", a: "Para nada. El Saju es un sistema filosófico basado en ciclos naturales (los Cinco Elementos). Es comparable a la medicina tradicional china — una herramienta ancestral, no una creencia religiosa." },
              { q: "¿Cómo se genera el reporte?", a: "Utilizamos las mismas fórmulas que los maestros coreanos de Saju han perfeccionado durante más de 500 años, respaldadas por siglos de datos acumulados. Tu carta se calcula con precisión matemática y luego un especialista interpreta los resultados en un reporte detallado en español." },
            ].map((faq) => (
              <details key={faq.q} className="bg-bg-card rounded-xl border border-white/5 group">
                <summary className="p-4 cursor-pointer text-sm font-semibold flex items-center justify-between">
                  {faq.q}
                  <span className="text-gold group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-4 pb-4 text-text-secondary text-xs leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="h-32" />
      </div>

      {/* ═══ 하단 고정 CTA ═══ */}
      <div className="fixed bottom-0 inset-x-0 z-40">
        <div className="max-w-[448px] mx-auto bg-bg-primary/95 backdrop-blur-lg border-t border-gold/10 px-5 py-4">
          <button
            onClick={() => { trackEvent(EVENTS.CTA_CLICK, { location: "sticky_bottom" }); setShowForm(true); }}
            className="w-full gradient-gold text-bg-primary font-bold text-base py-4 rounded-xl animate-pulse-gold transition-transform active:scale-[0.98]"
          >
            ✦ DESCUBRE TU SAJU ✦
          </button>
          <p className="text-center text-text-muted text-xs mt-2">
            Análisis gratuito · Resultado en 2 minutos
          </p>
        </div>
      </div>

      {/* ═══ 바텀시트 ═══ */}
      <BottomSheet open={showForm} onClose={() => setShowForm(false)}>
        <BirthForm />
      </BottomSheet>
    </main>
  );
}
