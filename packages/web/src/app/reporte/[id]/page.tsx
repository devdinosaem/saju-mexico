"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { trackEvent, EVENTS } from "@/components/analytics";
import { generateElementInsight } from "@/lib/saju-types";
import { ConceptCard, TermTooltip } from "@/components/term-tooltip";
import { MarkdownContent, getSectionIcon } from "@/components/markdown-content";
import { translateTenGod, translatePhase, getCompatibleElement, getClashingElement } from "@/lib/translations";

interface ReportSection {
  title: string;
  content: string;
}

interface SajuData {
  id: string;
  name: string;
  birth: { year: number; month: number; day: number; hour: number; minute: number; city: string };
  pillars: Record<string, { stem: string; branch: string; korean: string; animal: string; element: string; stemElement?: string; branchElement?: string }>;
  dayMaster: { stem: string; element: string; elementSpanish: string; korean: string; solLuna: string };
  fiveElements: Record<string, number>;
  strength: { levelSpanish: string; levelKorean: string; score: number };
  yongShin: { element: string; elementSpanish: string; elementKorean: string };
  majorFortunes: { direction: string; startAge: number; fortunes: { age: number; ganZhi: string; stemTenGod: string; branchTenGod: string; phase: string }[] };
  yearlyFortune?: { year: number; age: number; ganZhi: string; stemTenGod: string; branchTenGod: string; phase: string };
  samjae?: { isActive: boolean; phase?: string; phaseSpanish?: string; startYear: number; endYear: number; descriptionSpanish: string };
  samjaeYears?: { year: number; phase: string }[];
  report?: { sections: ReportSection[]; generatedAt: string };
}

const ELEMENT_COLORS: Record<string, string> = {
  Madera: "#4ADE80", Fuego: "#F87171", Tierra: "#FBBF24", Metal: "#E2E8F0", Agua: "#60A5FA",
  wood: "#4ADE80", fire: "#F87171", earth: "#FBBF24", metal: "#E2E8F0", water: "#60A5FA",
};

const YONGSHIN_GUIDE: Record<string, { colors: string; direction: string; numbers: string; activities: string; foods: string; crystal: string }> = {
  wood: { colors: "Verde, Turquesa", direction: "Este", numbers: "3, 8", activities: "Senderismo, jardinería, yoga al aire libre", foods: "Verduras de hoja verde, brotes, alimentos ácidos", crystal: "Jade, Aventurina verde" },
  fire: { colors: "Rojo, Rosa, Naranja", direction: "Sur", numbers: "2, 7", activities: "Correr, baile, cocina", foods: "Alimentos picantes, té caliente, chocolate", crystal: "Granate, Cornalina" },
  earth: { colors: "Amarillo, Marrón, Beige", direction: "Centro/Suroeste", numbers: "5, 10", activities: "Meditación, cerámica, cocina lenta", foods: "Granos, tubérculos, alimentos dulces naturales", crystal: "Citrino, Ojo de tigre" },
  metal: { colors: "Blanco, Plateado, Dorado", direction: "Oeste", numbers: "4, 9", activities: "Artes marciales, respiración, minimalismo", foods: "Arroz blanco, rábano, alimentos picantes suaves", crystal: "Cuarzo claro, Pirita" },
  water: { colors: "Azul, Negro, Gris oscuro", direction: "Norte", numbers: "1, 6", activities: "Natación, meditación, lectura nocturna", foods: "Mariscos, sopa de miso, alimentos salados", crystal: "Aguamarina, Labradorita" },
};

export default function ReportePageWrapper() {
  return (
    <Suspense>
      <ReportePage />
    </Suspense>
  );
}

function ReportePage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isShared = searchParams.get("shared") === "1";
  const [data, setData] = useState<SajuData | null>(null);
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    fetch(`/api/saju/calculate?id=${id}`)
      .then((r) => r.json())
      .then(async (d) => {
        if (!d || !d.fiveElements) { setLoading(false); return; }
        if (!d.report) {
          router.push(`/generando/${id}`);
          return;
        }
        setData(d);
        trackEvent(EVENTS.REPORT_VIEW, { sajuId: id, name: d.name, shared: isShared });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!data || !data.report) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-text-secondary">No se encontró tu reporte.</p>
      </div>
    );
  }

  const { report } = data;
  const total = Object.values(data.fiveElements).reduce((a, b) => a + b, 0) || 1;
  const guide = YONGSHIN_GUIDE[data.yongShin?.element] || YONGSHIN_GUIDE.water;

  const scrollTo = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-[448px] mx-auto">
        {/* ═══ HEADER ═══ */}
        <section className="px-5 pt-8 pb-4 text-center border-b border-gold/10 relative">
          <button
            onClick={() => router.push(`/resultado/${id}`)}
            className="absolute left-4 top-8 text-text-muted hover:text-text-primary transition-colors text-sm"
          >
            ← Resultado
          </button>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">✦ Reporte Saju Completo ✦</p>
          <h1 className="font-serif text-2xl font-bold mb-1">{data.name}</h1>
          <p className="text-text-secondary text-sm mb-3">
            {data.birth.day}/{data.birth.month}/{data.birth.year} · {data.birth.hour}:{String(data.birth.minute).padStart(2, "0")} · {data.birth.city}
          </p>
          <a
            href={`/card/${data.id}`}
            className="inline-flex items-center gap-1.5 bg-gold/10 text-gold text-xs font-medium px-4 py-1.5 rounded-full border border-gold/20 hover:bg-gold/20 transition-colors"
          >
            Descarga tu Tarjeta Saju &gt;
          </a>
        </section>

        {/* ═══ NAV ═══ */}
        <nav className="sticky top-0 z-30 bg-bg-primary/95 backdrop-blur-lg border-b border-white/5 px-3 py-2 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {report.sections.map((s, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="px-3 py-1.5 text-xs rounded-full bg-bg-card hover:bg-bg-surface text-text-secondary hover:text-gold transition-colors whitespace-nowrap"
              >
                {getSectionIcon(i)} {i + 1}
              </button>
            ))}
          </div>
        </nav>

        {/* ═══ 4기둥 풀 차트 ═══ */}
        <section className="px-5 py-6">
          <ConceptCard termKey="saju" />
          <div className="bg-bg-card rounded-2xl p-5 border border-gold/10">
            <h2 className="text-center font-serif text-lg font-bold mb-4">Tu Carta Saju (사주)</h2>
            <div className="grid grid-cols-4 gap-3 text-center">
              {(["hour", "day", "month", "year"] as const).map((pos) => {
                const pillar = data.pillars[pos];
                if (!pillar) return null;
                const labels = { hour: "Hora (시)", day: "Día (일)", month: "Mes (월)", year: "Año (년)" };
                return (
                  <div key={pos}>
                    <p className="text-text-muted text-xs mb-2">{labels[pos]}</p>
                    <div className="bg-bg-surface rounded-xl p-2 mb-1">
                      <p className="text-2xl font-serif" style={{ color: ELEMENT_COLORS[pillar.element] || "#D4A853" }}>{pillar.stem}</p>
                      <p className="text-xs text-text-secondary">{pillar.element}</p>
                    </div>
                    <div className="bg-bg-surface rounded-xl p-2">
                      <p className="text-2xl">{pillar.animal}</p>
                      <p className="text-lg font-serif text-text-secondary">{pillar.branch}</p>
                      <p className="text-xs text-text-muted">{pillar.branchElement}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 text-center">
              <p className="text-xs text-text-secondary">
                Elemento Natal (일주): <span className="text-gold font-semibold">{data.dayMaster?.korean} — {data.dayMaster?.elementSpanish}</span>
                {" · "}Fuerza: <span className="text-gold">{data.strength?.levelSpanish}</span>
                {" · "}Poder: <span className="text-gold">{data.yongShin?.elementSpanish}</span>
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 오행 분포 차트 ═══ */}
        <section className="px-5 py-4">
          <h3 className="font-serif text-lg font-bold mb-3">Cinco Elementos</h3>
          <ConceptCard termKey="fiveElements" compact />
          <div className="space-y-2">
            {[
              { key: "wood", label: "Madera", hanja: "木", emoji: "🌳" },
              { key: "fire", label: "Fuego", hanja: "火", emoji: "🔥" },
              { key: "earth", label: "Tierra", hanja: "土", emoji: "⛰️" },
              { key: "metal", label: "Metal", hanja: "金", emoji: "💎" },
              { key: "water", label: "Agua", hanja: "水", emoji: "💧" },
            ].map((el) => {
              const count = data.fiveElements[el.key] || 0;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={el.key} className="flex items-center gap-2">
                  <span className="text-sm w-6 shrink-0 text-center">{el.emoji}</span>
                  <span className="text-xs text-text-secondary w-20 shrink-0">{el.label} ({el.hanja})</span>
                  <div className="flex-1">
                    <div className="h-2 bg-bg-surface rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.max(pct, 2)}%`, backgroundColor: ELEMENT_COLORS[el.key] }} />
                    </div>
                  </div>
                  <span className="font-mono text-xs w-16 shrink-0 text-right">{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ 오행 해석 ═══ */}
        {(() => {
          const insight = generateElementInsight(
            data.dayMaster.element,
            data.dayMaster.solLuna || "yang",
            data.fiveElements,
            data.strength.score,
            data.yongShin.element,
            data.dayMaster.stem,
          );
          return (
            <section className="px-5 py-4">
              <div className="space-y-3">
                <div className="bg-bg-card rounded-2xl p-4 border border-gold/10">
                  <h4 className="font-serif text-base font-bold mb-1.5 flex items-center gap-2">
                    <span>{insight.essence.emoji}</span> {insight.essence.title} <span className="text-gold text-sm font-normal">— {insight.essence.label}</span>
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{insight.essence.body}</p>
                </div>
                <div className="bg-bg-card rounded-2xl p-4 border border-white/5">
                  <h4 className="font-serif text-base font-bold mb-1.5 flex items-center gap-2">
                    <span>{insight.world.emoji}</span> {insight.world.title} <span className="text-gold text-sm font-normal">— {insight.world.label}</span>
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{insight.world.body}</p>
                </div>
                <div className="bg-bg-card rounded-2xl p-4 border border-gold/10">
                  <h4 className="font-serif text-base font-bold mb-1.5 flex items-center gap-2">
                    <span>{insight.meaning.emoji}</span> {insight.meaning.title} <span className="text-gold text-sm font-normal">— {insight.meaning.label}</span>
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{insight.meaning.body}</p>
                </div>
              </div>
            </section>
          );
        })()}

        {/* ═══ 신강/신약 (Fuerza Interior) ═══ */}
        <section className="px-5 py-8 border-t border-white/5">
          <h2 className="font-serif text-xl font-bold mb-2">⚖️ Tu Fuerza Interior</h2>
          <ConceptCard termKey="strength" />

          <div className="bg-bg-card rounded-2xl p-5 border border-gold/10 mb-4">
            <div className="text-center mb-4">
              <p className="text-gold font-serif text-3xl font-bold">{data.strength?.levelSpanish}</p>
              <p className="text-text-muted text-xs">{data.strength?.levelKorean} · Puntuación: {data.strength?.score?.toFixed(1)}</p>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-blue-400">Sensible</span>
                <span className="text-green-400">Armónica</span>
                <span className="text-red-400">Dominante</span>
              </div>
              <div className="h-4 bg-bg-surface rounded-full overflow-hidden relative">
                <div className="h-full w-full bg-gradient-to-r from-blue-500 via-green-400 to-red-500 opacity-30" />
                <div
                  className="absolute top-0 h-full w-1 bg-gold rounded-full shadow-lg shadow-gold/50"
                  style={{ left: `${Math.min(98, Math.max(2, (data.strength?.score + 5) * 10))}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-bg-surface/30 rounded-lg p-3">
                <p className="text-xs text-text-muted mb-1">Energías aliadas</p>
                <p className="text-text-primary font-semibold">Las que te apoyan</p>
                <p className="text-xs text-text-secondary mt-1">
                  {data.strength?.score >= 0
                    ? "Tu energía se sostiene por sí sola — naces con fuerza interior"
                    : "Tu sensibilidad te conecta con energías que potencian tu talento"
                  }
                </p>
              </div>
              <div className="bg-bg-surface/30 rounded-lg p-3">
                <p className="text-xs text-text-muted mb-1">Energías retadoras</p>
                <p className="text-text-primary font-semibold">Las que te empujan</p>
                <p className="text-xs text-text-secondary mt-1">
                  {data.strength?.score >= 0
                    ? "Tu fortaleza convierte los desafíos en impulso"
                    : "Tu receptividad transforma los desafíos en aprendizaje"
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 용신 가이드 (실용 정보) ═══ */}
        <section className="px-5 py-8 border-t border-white/5">
          <h2 className="font-serif text-xl font-bold mb-4">
            🧭 Tu Guía Práctica de <TermTooltip termKey="yongShin">{data.yongShin?.elementSpanish}</TermTooltip>
          </h2>
          <ConceptCard termKey="yongShin" compact />
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🎨", label: "Colores de suerte", value: guide.colors },
              { icon: "🧭", label: "Dirección favorable", value: guide.direction },
              { icon: "🔢", label: "Números de suerte", value: guide.numbers },
              { icon: "💎", label: "Cristales", value: guide.crystal },
            ].map((item) => (
              <div key={item.label} className="bg-bg-card rounded-xl p-3 border border-white/5">
                <div className="text-lg mb-1">{item.icon}</div>
                <p className="text-xs text-text-muted mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-3">
            <div className="bg-bg-card rounded-xl p-3 border border-white/5">
              <p className="text-xs text-text-muted mb-0.5">💧 Actividades recomendadas</p>
              <p className="text-sm">{guide.activities}</p>
            </div>
            <div className="bg-bg-card rounded-xl p-3 border border-white/5">
              <p className="text-xs text-text-muted mb-0.5">🍽️ Alimentos favorables</p>
              <p className="text-sm">{guide.foods}</p>
            </div>
          </div>
        </section>

        {/* ═══ 대운 타임라인 ═══ */}
        {data.majorFortunes && (() => {
          const currentYear = new Date().getFullYear();
          const currentAge = currentYear - data.birth.year + 1;

          return (
            <section className="px-5 py-8 border-t border-white/5">
              <h2 className="font-serif text-xl font-bold mb-2">📊 Línea de Tiempo de tu Vida</h2>
              <ConceptCard termKey="majorFortune" compact />
              <p className="text-text-secondary text-xs mb-4">
                Dirección: {data.majorFortunes.direction === "forward" ? "Progresiva (순행)" : "Regresiva (역행)"} · Inicio: {data.majorFortunes.startAge} años
              </p>

              <div className="space-y-3">
                {data.majorFortunes.fortunes.map((f, i) => {
                  const yearStart = data.birth.year + f.age;
                  const isCurrent = currentAge >= f.age && currentAge < f.age + 10;
                  const isPast = currentAge >= f.age + 10;

                  return (
                    <div
                      key={i}
                      className={`flex gap-3 items-start rounded-xl p-3 transition-colors ${
                        isCurrent ? "bg-gold/10 border border-gold/20" : isPast ? "opacity-50" : ""
                      }`}
                    >
                      <div className="w-16 shrink-0 text-right">
                        <span className={`font-mono text-xs ${isCurrent ? "text-gold font-bold" : "text-text-muted"}`}>
                          {f.age}-{f.age + 9}
                        </span>
                        <p className="text-text-muted text-xs">{yearStart}</p>
                      </div>
                      <div className={`w-px self-stretch ${isCurrent ? "bg-gold" : "bg-gold/20"}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-semibold ${isCurrent ? "text-gold" : ""}`}>{f.ganZhi}</p>
                          {isCurrent && <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">← AHORA</span>}
                        </div>
                        <p className="text-xs text-text-secondary">{translateTenGod(f.stemTenGod)} · {translatePhase(f.phase)}</p>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">
                          {getFortuneDescription(f.stemTenGod)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 올해 세운 */}
              {data.yearlyFortune && (
                <div className="mt-6 bg-bg-card rounded-2xl p-5 border border-gold/10">
                  <ConceptCard termKey="yearlyFortune" compact />
                  <h3 className="font-serif text-lg font-bold mb-3">📅 Tu año {data.yearlyFortune.year}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-center">
                      <p className="font-serif text-2xl text-gold">{data.yearlyFortune.ganZhi}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        Energía: <span className="text-gold font-semibold">{translateTenGod(data.yearlyFortune.stemTenGod)} / {translateTenGod(data.yearlyFortune.branchTenGod)}</span>
                      </p>
                      <p className="text-xs text-text-secondary">Fase: {translatePhase(data.yearlyFortune.phase)}</p>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        {getFortuneDescription(data.yearlyFortune.stemTenGod)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PRÓXIMO CAMBIO — 다음 대운 */}
              {(() => {
                const birthYear = data.birth.year;
                const currentYear = new Date().getFullYear();
                const currentAge = currentYear - birthYear + 1;
                const nextFortune = data.majorFortunes.fortunes.find(
                  (f: { age: number }) => f.age > currentAge
                );
                if (!nextFortune) return null;
                return (
                  <div className="mt-4 bg-bg-card rounded-2xl p-5 border border-amber/15">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-amber text-sm">⏭️ PRÓXIMO CAMBIO</span>
                    </div>
                    <p className="text-sm">
                      A los <strong className="text-text-primary">{nextFortune.age} años</strong> ({birthYear + nextFortune.age}), entrarás en una nueva Gran Estación:
                      <span className="text-gold font-semibold"> {nextFortune.ganZhi.split("(")[0]}</span> — {translateTenGod(nextFortune.stemTenGod)}
                    </p>
                    <p className="text-text-secondary text-xs mt-2 leading-relaxed">
                      {getFortuneDescription(nextFortune.stemTenGod)}
                    </p>
                  </div>
                );
              })()}
            </section>
          );
        })()}

        {/* ═══ 3대 사건 예고 (풀 버전) ═══ */}
        {data.majorFortunes && (() => {
          const currentYear = new Date().getFullYear();
          const birthYear = data.birth.year;
          const fortunes = data.majorFortunes.fortunes;

          const pastFortune = [...fortunes]
            .filter(f => birthYear + f.age + 10 <= currentYear)
            .pop();

          const loveTenGods = ["정재", "편재", "정관", "편관"];
          const loveFortune = fortunes.find(f =>
            birthYear + f.age > currentYear && loveTenGods.includes(f.stemTenGod)
          );

          const wealthTenGods = ["편재", "정재", "식신"];
          const wealthFortune = fortunes.find(f =>
            birthYear + f.age > currentYear &&
            wealthTenGods.includes(f.stemTenGod) &&
            f !== loveFortune
          );

          const futureFortunes = fortunes.filter(f => birthYear + f.age > currentYear);
          const fallbackLove = loveFortune || futureFortunes[0];
          const fallbackWealth = wealthFortune || futureFortunes[1] || futureFortunes[0];

          return (
            <section className="px-5 py-8 border-t border-white/5">
              <div className="gradient-mystic rounded-2xl p-6 border border-gold/10">
                <h2 className="font-serif text-xl font-bold text-center mb-2">
                  🔮 3 eventos que cambiarán la vida de {data.name}
                </h2>
                <p className="text-text-secondary text-xs text-center mb-6">
                  Calculados a partir de tu carta natal y tus Grandes Estaciones
                </p>

                <div className="space-y-4">
                  {pastFortune && (
                    <div className="bg-bg-primary/40 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <span>⏪</span>
                        <span className="text-gold font-mono text-sm">{birthYear + pastFortune.age}-{birthYear + pastFortune.age + 9}</span>
                        <span className="text-text-muted text-xs">(ya ocurrió)</span>
                      </div>
                      <p className="text-sm">
                        Un periodo de <strong className="text-text-primary">{translateTenGod(pastFortune.stemTenGod)}</strong> marcó esta etapa de tu vida.
                      </p>
                      <p className="text-text-secondary text-xs mt-1">{getFortuneDescription(pastFortune.stemTenGod)}</p>
                    </div>
                  )}

                  {fallbackLove && (
                    <div className="bg-bg-primary/40 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <span>💕</span>
                        <span className="text-gold font-mono text-sm">{birthYear + fallbackLove.age}-{birthYear + fallbackLove.age + 9}</span>
                        <span className="text-text-muted text-xs">({translateTenGod(fallbackLove.stemTenGod)})</span>
                      </div>
                      <p className="text-sm">
                        Un encuentro que cambiará tu perspectiva del amor. La persona llegará cuando menos lo esperes, en un contexto que jamás imaginaste.
                      </p>
                      <p className="text-text-secondary text-xs mt-1">{getFortuneDescription(fallbackLove.stemTenGod)}</p>
                    </div>
                  )}

                  {fallbackWealth && (
                    <div className="bg-bg-primary/40 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <span>💰</span>
                        <span className="text-gold font-mono text-sm">{birthYear + fallbackWealth.age}-{birthYear + fallbackWealth.age + 9}</span>
                        <span className="text-text-muted text-xs">({translateTenGod(fallbackWealth.stemTenGod)})</span>
                      </div>
                      <p className="text-sm">
                        Tu ciclo de mayor prosperidad financiera. Una oportunidad que podría cambiar tu nivel de vida por completo.
                      </p>
                      <p className="text-text-secondary text-xs mt-1">{getFortuneDescription(fallbackWealth.stemTenGod)}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })()}

        {/* ═══ 운명의 짝/악인 프로필 카드 ═══ */}
        {data.dayMaster && (() => {
          const compat = getCompatibleElement(data.dayMaster.element);
          const clash = getClashingElement(data.dayMaster.element);
          return (
            <section className="px-5 py-8 border-t border-white/5">
              <h2 className="font-serif text-xl font-bold text-center mb-6">
                💫 <span className="text-gradient-gold">Tu Pareja Destinada</span>
              </h2>
              <div className="bg-bg-card rounded-2xl p-5 border border-gold/20 mb-4">
                <div className="bg-gold/5 rounded-xl p-3 mb-4 border border-gold/10">
                  <p className="text-xs text-gold mb-1">Tu elemento: {data.dayMaster.elementSpanish} · Compatibilidad ideal:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{compat.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold">{compat.spanish}</p>
                      <p className="text-text-muted text-xs">{compat.reason}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-text-secondary">Personalidad</span>
                    <span>Amable, empático, introvertido</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-text-secondary">Profesión</span>
                    <span>Campo creativo o tecnológico</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-text-secondary">Cuándo lo conocerás</span>
                    <span>Durante tu Gran Estación de {translateTenGod(data.majorFortunes?.fortunes[1]?.stemTenGod || "정재")}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-text-secondary">Señal</span>
                    <span>Sentirás una conexión inmediata e inexplicable</span>
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-xl font-bold text-center mt-8 mb-6">
                ⚠️ <span className="text-red-400">La persona que más daño te hará</span>
              </h2>
              <div className="bg-bg-card rounded-2xl p-5 border border-red-500/20">
                <div className="bg-red-500/5 rounded-xl p-3 mb-4 border border-red-500/10">
                  <p className="text-xs text-red-400 mb-1">Elemento de conflicto:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{clash.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-red-300">{clash.spanish}</p>
                      <p className="text-text-muted text-xs">{clash.reason}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-text-secondary">Personalidad</span>
                    <span>Controlador, manipulador, competitivo</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-text-secondary">Tipo de daño</span>
                    <span>Pérdida financiera o emocional</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-text-secondary">Cómo protegerte</span>
                    <span>Refuerza tu Elemento de Poder ({data.yongShin?.elementSpanish})</span>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* ═══ 오행 궁합 — 운명의 짝/악인 ═══ */}
        {data.dayMaster && (() => {
          const compat = getCompatibleElement(data.dayMaster.element);
          const clash = getClashingElement(data.dayMaster.element);
          return (
            <section className="px-5 py-8 border-t border-white/5">
              <h2 className="font-serif text-xl font-bold mb-4">💫 Compatibilidad de Elementos</h2>
              <p className="text-text-secondary text-xs mb-4">
                Tu elemento natal es <strong className="text-text-primary">{data.dayMaster.elementSpanish}</strong>.
                Según la ley de los Cinco Elementos, estas son las energías que te complementan — y las que chocan contigo.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-green-500/5 rounded-2xl p-4 border border-green-500/15">
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-2">♥ Elemento afín</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{compat.emoji}</span>
                    <span className="font-serif text-lg font-bold">{compat.spanish}</span>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed">{compat.reason}</p>
                  <p className="text-text-muted text-xs mt-2 italic">
                    Las personas con energía de {compat.spanish} tienden a ser tu mejor pareja, socio y amigo.
                  </p>
                </div>
                <div className="bg-red-500/5 rounded-2xl p-4 border border-red-500/15">
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-2">✕ Elemento de conflicto</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{clash.emoji}</span>
                    <span className="font-serif text-lg font-bold text-red-300">{clash.spanish}</span>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed">{clash.reason}</p>
                  <p className="text-text-muted text-xs mt-2 italic">
                    Las personas con energía de {clash.spanish} pueden generar tensión, competencia o pérdidas.
                  </p>
                </div>
              </div>
            </section>
          );
        })()}

        {/* ═══ 리포트 섹션들 (1~14장) ═══ */}
        {report.sections.map((section, i) => {
          const conceptKey = getSectionConcept(section.title);
          const icon = getSectionIcon(i);
          return (
            <section
              key={i}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="px-5 py-8 border-t border-white/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{icon}</span>
                <div>
                  <span className="text-gold font-mono text-xs">Cap.{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="font-serif text-xl font-bold">{section.title}</h2>
                </div>
              </div>
              {conceptKey && <ConceptCard termKey={conceptKey} compact />}
              <div className="bg-bg-card rounded-2xl p-5 border border-white/5">
                <MarkdownContent content={section.content} sectionIndex={i} />
              </div>
            </section>
          );
        })}

        {/* ═══ 삼재 (三災) ═══ */}
        {data.samjae && (
          <section className="px-5 py-8 border-t border-white/5">
            <h2 className="font-serif text-xl font-bold mb-2">⚠️ Los Tres Calamidades</h2>
            <ConceptCard termKey="samjae" />

            <div className={`rounded-2xl p-5 border mb-4 ${data.samjae.isActive ? "bg-red-500/5 border-red-500/20" : "bg-bg-card border-white/5"}`}>
              <p className={`text-sm font-semibold mb-3 ${data.samjae.isActive ? "text-red-400" : "text-green-400"}`}>
                {data.samjae.isActive
                  ? `⚠️ ${data.samjae.descriptionSpanish}`
                  : `🛡️ No estás en un periodo de Tres Calamidades`
                }
              </p>

              {/* 삼재 타임라인 */}
              {data.samjaeYears && data.samjaeYears.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-text-muted mb-2">Tu ciclo de Tres Calamidades:</p>
                  <div className="flex gap-1 flex-wrap">
                    {data.samjaeYears.map((sy) => {
                      const currentYear = new Date().getFullYear();
                      const isCurrent = sy.year === currentYear;
                      return (
                        <span key={sy.year} className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                          isCurrent ? "bg-red-500/20 text-red-400 font-bold border border-red-500/30" :
                          sy.phase === "peak" ? "bg-red-500/10 text-red-400" :
                          "bg-bg-surface text-text-muted"
                        }`}>
                          {sy.year}
                          {isCurrent && " ←"}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
                <p>
                  <strong className="text-text-primary">¿Qué hacer durante los Tres Calamidades?</strong>
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-bg-surface/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-red-400 mb-1">❌ Evitar:</p>
                    <p className="text-xs text-text-secondary">Inversiones riesgosas, cambios laborales impulsivos, cirugías no urgentes, mudanzas innecesarias, préstamos grandes</p>
                  </div>
                  <div className="bg-bg-surface/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-green-400 mb-1">✅ Reforzar:</p>
                    <p className="text-xs text-text-secondary">Chequeos médicos regulares, ahorro, fortalecer relaciones cercanas, actividades de tu Elemento de Poder ({data.yongShin?.elementSpanish}), meditación y autocuidado</p>
                  </div>
                </div>
                <p className="text-xs text-text-muted italic">
                  Las Tres Calamidades no se pueden evitar, pero sí se puede minimizar el daño. Como un terremoto: no puedes impedirlo, pero si sabes que viene, puedes preparar tu casa y proteger a tu familia.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ═══ 사주 유형 카드 ═══ */}
        <section className="px-5 py-8 border-t border-white/5">
          <div className="gradient-mystic rounded-2xl p-6 border border-gold/10 text-center">
            <h2 className="font-serif text-2xl font-bold mb-1">Tu Tarjeta Saju</h2>
            <p className="text-text-secondary text-sm mb-4">Descarga tu tipo y compártelo en Stories</p>
            <a
              href={`/card/${data.id}`}
              className="inline-block gradient-gold text-bg-primary font-serif text-sm font-semibold tracking-wide py-3 px-8 rounded-xl"
            >
              Ver mi tarjeta &gt;
            </a>
          </div>
        </section>

        {/* ═══ 공유 ═══ */}
        <section className="px-5 py-8 border-t border-white/5">
          <h2 className="font-serif text-xl font-bold text-center mb-4">
            📱 Comparte tu Saju
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const url = `${window.location.origin}/reporte/${data.id}?shared=1`;
                navigator.clipboard.writeText(url);
                alert("¡Enlace copiado!");
              }}
              className="flex-1 bg-bg-card border border-white/10 rounded-xl py-3 text-sm font-medium hover:border-gold/30 transition-colors"
            >
              🔗 Copiar enlace
            </button>
            <button
              onClick={() => {
                const url = `${window.location.origin}/reporte/${data.id}?shared=1`;
                const text = `Acabo de descubrir mi destino con el Saju coreano — ¡es increíblemente preciso! Descubre el tuyo:`;
                if (navigator.share) {
                  navigator.share({ title: `Saju de ${data.name}`, text, url });
                } else {
                  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
                }
              }}
              className="flex-1 bg-green-600/20 border border-green-500/20 rounded-xl py-3 text-sm font-medium text-green-400 hover:bg-green-600/30 transition-colors"
            >
              💬 WhatsApp
            </button>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <section className="px-5 py-12 text-center border-t border-gold/10">
          <div className="font-serif text-lg italic text-text-secondary leading-relaxed mb-4">
            &quot;Tu Saju no es una prisión, es un mapa.<br />
            El destino te dio las cartas —<br />
            tú decides cómo jugarlas.&quot;
          </div>
          <p className="text-gold text-sm">✦ Saju Astral ✦</p>
          <p className="text-text-muted text-xs mt-4">
            Generado el {new Date(report.generatedAt).toLocaleDateString("es-MX")}
          </p>
        </section>

        {/* ═══ 공유 접속 시 CTA ═══ */}
        {isShared && (
          <section className="px-5 py-8 border-t border-gold/10">
            <div className="gradient-mystic rounded-2xl p-6 border border-gold/10 text-center">
              <p className="text-gold text-sm mb-2">✦ ¿Quieres conocer tu propio Saju? ✦</p>
              <h3 className="font-serif text-xl font-bold mb-3">
                Descubre qué dice tu fecha de nacimiento
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Más de 500 años de tradición coreana, ahora disponible para ti
              </p>
              <a
                href="/"
                className="inline-block gradient-gold text-bg-primary font-bold text-base py-3 px-8 rounded-xl"
              >
                ✦ DESCUBRE TU SAJU ✦
              </a>
            </div>
          </section>
        )}

        <div className="h-8" />
      </div>
    </main>
  );
}

function getSectionConcept(title: string): import("@/lib/glossary").GlossaryKey | null {
  const t = title.toLowerCase();
  if (t.includes("esencia") || t.includes("pilar del día")) return "dayMaster";
  if (t.includes("cinco elementos") || t.includes("distribución")) return "fiveElements";
  if (t.includes("fuerza interior")) return "strength";
  if (t.includes("diez dioses") || t.includes("십신")) return "tenGods";
  if (t.includes("doce fases") || t.includes("운성")) return "twelvePhases";
  if (t.includes("estaciones") || t.includes("대운")) return "majorFortune";
  if (t.includes("año actual") || t.includes("세운")) return "yearlyFortune";
  if (t.includes("relaciones") || t.includes("합충")) return "relations";
  if (t.includes("elemento de poder") || t.includes("용신")) return "yongShin";
  if (t.includes("estrellas") || t.includes("신살")) return "spiritStars";
  return null;
}

function getFortuneDescription(tenGod: string): string {
  const descriptions: Record<string, string> = {
    "비견": "Periodo de independencia y competencia. Buen momento para emprender por tu cuenta, pero cuidado con los conflictos por ego.",
    "겁재": "Energía intensa de acción. Grandes oportunidades, pero también riesgo de pérdidas impulsivas. Controla tus gastos.",
    "식신": "Época de creatividad y disfrute. Tu expresión artística florece. Buen momento para crear, cocinar, escribir.",
    "상관": "Periodo de rebeldía productiva. Cuestionas todo y encuentras caminos nuevos. Cuidado con los conflictos laborales.",
    "편재": "¡Ciclo de oportunidades financieras! Dinero puede llegar de fuentes inesperadas. Buen momento para inversiones.",
    "정재": "Estabilidad financiera. Ahorro y crecimiento constante. Buen momento para comprar casa o invertir a largo plazo.",
    "편관": "Periodo de desafíos y presión externa. Puede haber cambios bruscos, pero te fortalecen. Cuidado con la salud.",
    "정관": "Época de reconocimiento y autoridad. Ascensos, títulos, responsabilidades. Tu esfuerzo finalmente se nota.",
    "편인": "Periodo de búsqueda espiritual y aprendizaje alternativo. Intuición aguda. Buen momento para estudiar algo nuevo.",
    "정인": "Época de protección y sabiduría. Mentores aparecen en tu vida. Buen momento para estudiar y crecer internamente.",
  };
  return descriptions[tenGod] || "Un periodo de transformación que merece análisis detallado.";
}
