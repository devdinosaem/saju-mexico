"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { ConceptCard, TermTooltip } from "@/components/term-tooltip";

interface ReportSection {
  title: string;
  content: string;
}

interface SajuData {
  id: string;
  name: string;
  birth: { year: number; month: number; day: number; hour: number; minute: number; city: string };
  pillars: Record<string, { stem: string; branch: string; korean: string; animal: string; element: string }>;
  dayMaster: { stem: string; element: string; elementSpanish: string; korean: string; yinYang: string };
  fiveElements: Record<string, number>;
  strength: { levelSpanish: string; levelKorean: string; score: number };
  yongShin: { element: string; elementSpanish: string; elementKorean: string };
  majorFortunes: { direction: string; startAge: number; fortunes: { age: number; ganZhi: string; stemTenGod: string; phase: string }[] };
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

export default function ReportePage() {
  const { id } = useParams();
  const [data, setData] = useState<SajuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    fetch(`/api/saju/calculate?id=${id}`)
      .then((r) => r.json())
      .then(async (d) => {
        if (!d || !d.fiveElements) { setLoading(false); return; }
        if (!d.report) {
          setGenerating(true);
          await fetch("/api/saju/report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });
          const updated = await fetch(`/api/saju/calculate?id=${id}`).then(r => r.json());
          setData(updated);
          setGenerating(false);
        } else {
          setData(d);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading || generating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center px-8">
          <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-6" />
          <h2 className="font-serif text-xl font-bold mb-2">
            {generating ? "Generando tu reporte..." : "Cargando..."}
          </h2>
          {generating && (
            <div className="space-y-2 text-text-secondary text-sm">
              <p>Analizando los 8 pilares de tu carta</p>
              <p className="text-xs text-text-muted">Esto puede tomar hasta 2 minutos</p>
            </div>
          )}
        </div>
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
        <section className="px-5 pt-8 pb-4 text-center border-b border-gold/10">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">✦ Reporte Saju Completo ✦</p>
          <h1 className="font-serif text-2xl font-bold mb-1">{data.name}</h1>
          <p className="text-text-secondary text-sm">
            {data.birth.day}/{data.birth.month}/{data.birth.year} · {data.birth.hour}:{String(data.birth.minute).padStart(2, "0")} · {data.birth.city}
          </p>
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
                {i + 1}
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
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 text-center">
              <p className="text-xs text-text-secondary">
                Pilar del Día (일주): <span className="text-gold font-semibold">{data.dayMaster?.korean} — {data.dayMaster?.elementSpanish}</span>
                {" · "}Fuerza: <span className="text-gold">{data.strength?.levelSpanish}</span>
                {" · "}Poder: <span className="text-gold">{data.yongShin?.elementSpanish}</span>
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 오행 분포 차트 ═══ */}
        <section className="px-5 py-4">
          <h3 className="font-serif text-lg font-bold mb-3">Cinco Elementos (오행)</h3>
          <ConceptCard termKey="fiveElements" compact />
          <div className="space-y-2">
            {[
              { key: "wood", label: "Madera (木)", emoji: "🌳" },
              { key: "fire", label: "Fuego (火)", emoji: "🔥" },
              { key: "earth", label: "Tierra (土)", emoji: "⛰️" },
              { key: "metal", label: "Metal (金)", emoji: "⚔️" },
              { key: "water", label: "Agua (水)", emoji: "💧" },
            ].map((el) => {
              const count = data.fiveElements[el.key] || 0;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={el.key} className="flex items-center gap-2">
                  <span className="text-sm w-5 text-center">{el.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-text-secondary">{el.label}</span>
                      <span className="font-mono">{count} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 bg-bg-surface rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.max(pct, 2)}%`, backgroundColor: ELEMENT_COLORS[el.key] }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ 리포트 섹션들 ═══ */}
        {report.sections.map((section, i) => {
          const conceptKey = getSectionConcept(section.title);
          return (
            <section
              key={i}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="px-5 py-8 border-t border-white/5"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gold font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-serif text-xl font-bold">{section.title}</h2>
              </div>
              {conceptKey && <ConceptCard termKey={conceptKey} compact />}
              <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </section>
          );
        })}

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
        {data.majorFortunes && (
          <section className="px-5 py-8 border-t border-white/5">
            <h2 className="font-serif text-xl font-bold mb-2">📊 Línea de Tiempo de tu Vida</h2>
            <ConceptCard termKey="majorFortune" compact />
            <p className="text-text-secondary text-xs mb-4">
              Dirección: {data.majorFortunes.direction === "forward" ? "Progresiva (순행)" : "Regresiva (역행)"} · Inicio: {data.majorFortunes.startAge} años
            </p>
            <div className="space-y-2">
              {data.majorFortunes.fortunes.map((f, i) => {
                const yearStart = data.birth.year + f.age;
                return (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-16 shrink-0 text-right">
                      <span className="text-gold font-mono text-xs">{f.age}-{f.age + 9}</span>
                      <p className="text-text-muted text-xs">{yearStart}</p>
                    </div>
                    <div className="w-px bg-gold/20 self-stretch" />
                    <div className="flex-1 pb-2">
                      <p className="text-sm font-semibold">{f.ganZhi}</p>
                      <p className="text-xs text-text-secondary">{f.stemTenGod} · {f.phase}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ═══ FOOTER ═══ */}
        <section className="px-5 py-12 text-center border-t border-gold/10">
          <div className="font-serif text-lg italic text-text-secondary leading-relaxed mb-4">
            &quot;Tu Saju no es una prisión, es un mapa.<br />
            El destino te dio las cartas —<br />
            tú decides cómo jugarlas.&quot;
          </div>
          <p className="text-gold text-sm">✦ Saju México ✦</p>
          <p className="text-text-muted text-xs mt-4">
            Generado el {new Date(report.generatedAt).toLocaleDateString("es-MX")}
          </p>
        </section>

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
