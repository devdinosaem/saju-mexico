"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getSajuType } from "@/lib/saju-types";
import { getCompatibleElement, getClashingElement } from "@/lib/translations";

interface SajuData {
  name: string;
  birth: { year: number; month: number; day: number; hour: number; minute: number; city: string };
  dayMaster: { element: string; elementSpanish: string; yinYang: string };
  fiveElements: Record<string, number>;
  strength: { score: number; levelSpanish: string };
}

const ELEMENT_COLORS: Record<string, string> = {
  wood: "#4ADE80", fire: "#F87171", earth: "#FBBF24", metal: "#E2E8F0", water: "#60A5FA",
};

export default function CardPage() {
  const { id } = useParams();
  const [data, setData] = useState<SajuData | null>(null);
  const [saving, setSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/saju/calculate?id=${id}`)
      .then((r) => r.json())
      .then((d) => { if (d && d.fiveElements) setData(d); });
  }, [id]);

  const captureCard = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#0A0A1A",
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        foreignObjectRendering: false,
      });
      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png", 1.0);
      });
    } catch (err) {
      console.error("Capture error:", err);
      return null;
    }
  };

  const handleDownload = async () => {
    setSaving(true);
    try {
      const blob = await captureCard();
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `saju-${data?.name || "card"}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        alert("Error al guardar. Intenta con una captura de pantalla.");
      }
    } catch {
      alert("Error al guardar. Intenta con una captura de pantalla.");
    }
    setSaving(false);
  };

  const handleShare = async () => {
    setSaving(true);
    try {
      const blob = await captureCard();
      if (blob && navigator.share) {
        const file = new File([blob], "saju-card.png", { type: "image/png" });
        await navigator.share({
          files: [file],
          title: `Saju de ${data?.name}`,
          text: "Descubre tu tipo en @sajuastral",
        });
      } else if (blob) {
        // Fallback: download
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `saju-${data?.name || "card"}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        alert("Error al compartir. Intenta guardando la imagen primero.");
      }
    } catch {
      alert("Error al compartir. Intenta guardando la imagen primero.");
    }
    setSaving(false);
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  const sajuType = getSajuType(data.dayMaster.element, data.dayMaster.yinYang, data.strength.score);
  const compat = getCompatibleElement(data.dayMaster.element);
  const clash = getClashingElement(data.dayMaster.element);
  const total = Object.values(data.fiveElements).reduce((a, b) => a + b, 0) || 1;

  return (
    <main className="flex flex-col items-center min-h-screen bg-bg-primary py-6 px-4">
      {/* ═══ 캡쳐 영역 ═══ */}
      <div
        ref={cardRef}
        className="w-[360px] h-[640px] bg-bg-primary relative overflow-hidden flex flex-col"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,83,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,168,83,0.04),transparent_60%)]" />

        <div className="relative flex-1 flex flex-col px-8 py-6">
          <div className="text-center mb-4">
            <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "28px", fontWeight: 700 }}>{data.name}</h1>
            <p className="text-text-secondary text-xs mt-1">
              {data.birth.year}.{String(data.birth.month).padStart(2, "0")}.{String(data.birth.day).padStart(2, "0")} · {data.birth.hour}:{String(data.birth.minute).padStart(2, "0")} · {data.birth.city}
            </p>
          </div>

          <div className="text-center mb-3">
            <p className="text-5xl mb-2">{sajuType.emoji}</p>
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "22px", fontWeight: 700, background: "linear-gradient(135deg, #D4A853, #E8924A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              &quot;{sajuType.name}&quot;
            </h2>
            <p className="text-text-secondary text-xs mt-1">{data.strength.levelSpanish}</p>
          </div>

          <div className="w-12 h-px mx-auto mb-3" style={{ backgroundColor: "rgba(212,168,83,0.3)" }} />

          <p className="text-center text-sm mb-2" style={{ fontFamily: "Playfair Display, Georgia, serif", fontStyle: "italic", color: "#F0ECE3" }}>
            &quot;{sajuType.tagline}&quot;
          </p>

          <p className="text-center text-xs leading-relaxed mb-5 px-2" style={{ color: "#9B96A0" }}>
            {sajuType.personality}
          </p>

          {/* 오행 수평 바 */}
          <div className="space-y-1.5 mb-5 px-2">
            {[
              { key: "wood", label: "Madera", emoji: "🌳" },
              { key: "fire", label: "Fuego", emoji: "🔥" },
              { key: "earth", label: "Tierra", emoji: "⛰️" },
              { key: "metal", label: "Metal", emoji: "💎" },
              { key: "water", label: "Agua", emoji: "💧" },
            ].map((el) => {
              const pct = Math.round(((data.fiveElements[el.key] || 0) / total) * 100);
              return (
                <div key={el.key} className="flex items-center gap-1.5">
                  <span className="text-xs w-4 shrink-0">{el.emoji}</span>
                  <span className="w-12 shrink-0" style={{ fontSize: "10px", color: "#9B96A0" }}>{el.label}</span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#232350" }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.max(pct, 3)}%`, backgroundColor: ELEMENT_COLORS[el.key] }} />
                  </div>
                  <span className="w-8 shrink-0 text-right" style={{ fontSize: "10px", fontFamily: "monospace", color: ELEMENT_COLORS[el.key] }}>{pct}%</span>
                </div>
              );
            })}
          </div>

          {/* 궁합 */}
          <div className="space-y-1.5 mb-4 px-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-20 shrink-0 text-right" style={{ color: "#4ADE80" }}>Armonía</span>
              <span className="w-px h-3" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              <span>{compat.emoji} {compat.spanish}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-20 shrink-0 text-right" style={{ color: "#FBBF24" }}>Tensión</span>
              <span className="w-px h-3" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              <span>{clash.emoji} {clash.spanish}</span>
            </div>
          </div>

          {/* 키워드 */}
          <p className="text-center text-xs font-semibold tracking-wider" style={{ color: "#D4A853" }}>
            {sajuType.keywords.join(" · ")}
          </p>

          <div className="flex-1" />

          <p className="text-center text-xs" style={{ color: "#5C5775" }}>@sajuastral</p>
        </div>
      </div>

      {/* ═══ CTA (캡쳐 영역 밖) ═══ */}
      <div className="flex flex-col gap-2 mt-6 w-full max-w-[360px]">
        <button
          onClick={handleShare}
          disabled={saving}
          className="w-full gradient-gold text-bg-primary rounded-xl py-3.5 font-serif text-sm font-semibold tracking-wide transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          {saving ? "Preparando..." : "Compartir en Stories"}
        </button>
        <button
          onClick={handleDownload}
          disabled={saving}
          className="w-full bg-bg-card border border-white/10 rounded-xl py-3.5 font-serif text-sm tracking-wide hover:border-gold/30 transition-colors disabled:opacity-50"
        >
          Guardar imagen
        </button>
      </div>
    </main>
  );
}
