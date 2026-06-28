"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { trackEvent } from "@/components/analytics";
import { getSajuType } from "@/lib/saju-types";
import { getCompatibleElement, getClashingElement } from "@/lib/translations";
import { buildElementIcons, buildStoryLine } from "@/lib/saju-story";

interface SajuData {
  name: string;
  birth: { year: number; month: number; day: number; hour: number; minute: number; city: string };
  dayMaster: { element: string; elementSpanish: string; solLuna: string };
  fiveElements: Record<string, number>;
  strength: { score: number; levelSpanish: string };
}

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
    } catch {
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
      }
    } catch { /* ignore */ }
    setSaving(false);
  };

  const handleShare = async () => {
    setSaving(true);
    trackEvent("card_share", { name: data?.name });
    try {
      const blob = await captureCard();
      if (blob && navigator.share) {
        const file = new File([blob], "saju-card.png", { type: "image/png" });
        await navigator.share({ files: [file], title: `Saju de ${data?.name}`, text: "Descubre tu tipo en @sajuastral" });
      } else if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `saju-${data?.name || "card"}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch { /* ignore */ }
    setSaving(false);
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  const sajuType = getSajuType(data.dayMaster.element, data.dayMaster.solLuna, data.strength.score);
  const compat = getCompatibleElement(data.dayMaster.element);
  const clash = getClashingElement(data.dayMaster.element);
  const elementIcons = buildElementIcons(data.fiveElements);
  const storyLine = buildStoryLine(data.dayMaster.element, data.fiveElements);

  return (
    <main className="flex flex-col items-center min-h-screen bg-bg-primary py-6 px-4">
      <div
        ref={cardRef}
        className="w-[360px] h-[640px] relative overflow-hidden flex flex-col"
        style={{ backgroundColor: "#0A0A1A", fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, rgba(212,168,83,0.06), transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom, rgba(212,168,83,0.04), transparent 60%)" }} />

        <div className="relative flex-1 flex flex-col px-6 py-5">
          {/* 이름 + 생년월일 */}
          <div className="text-center mb-3">
            <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "22px", fontWeight: 700, color: "#F0ECE3" }}>
              {data.name}
            </h1>
            <p style={{ fontSize: "10px", color: "#9B96A0", marginTop: "2px" }}>
              {data.birth.year}.{String(data.birth.month).padStart(2, "0")}.{String(data.birth.day).padStart(2, "0")} · {data.birth.hour}:{String(data.birth.minute).padStart(2, "0")} · {data.birth.city}
            </p>
          </div>

          {/* 유형 카드 */}
          <div className="text-center mb-3 py-3 rounded-2xl" style={{ backgroundColor: "rgba(26,26,62,0.6)", border: "1px solid rgba(212,168,83,0.15)" }}>
            <p style={{ fontSize: "9px", color: "#D4A853", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>
              Tú eres
            </p>
            <p style={{ fontSize: "28px", marginBottom: "4px" }}>{sajuType.emoji}</p>
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "20px", fontWeight: 700, background: "linear-gradient(135deg, #D4A853, #E8924A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {sajuType.name}
            </h2>
            <p style={{ fontSize: "10px", color: "#9B96A0", marginTop: "2px" }}>
              {data.strength.levelSpanish}
            </p>
          </div>

          {/* 오행 */}
          <div className="mb-2">
            <div className="flex justify-center gap-3">
              {[
                { key: "wood", emoji: "🌳" },
                { key: "fire", emoji: "🔥" },
                { key: "earth", emoji: "⛰️" },
                { key: "metal", emoji: "💎" },
                { key: "water", emoji: "💧" },
              ].map((el) => {
                const count = data.fiveElements[el.key] || 0;
                return (
                  <div key={el.key} className="flex flex-col items-center">
                    <span style={{ fontSize: "16px" }}>{el.emoji}</span>
                    <span style={{ fontSize: "12px", fontFamily: "monospace", fontWeight: 700, color: "#F0ECE3", marginTop: "1px" }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 태그라인 */}
          <p className="text-center mb-2 px-2" style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "12px", fontStyle: "italic", color: "#F0ECE3", lineHeight: "1.4" }}>
            &quot;{sajuType.tagline}&quot;
          </p>

          {/* 사주 개연성 + 성격 */}
          <p className="text-center mb-1 px-2" style={{ fontSize: "10px", color: "#D4A853", lineHeight: "1.4", opacity: 0.85 }}>
            {sajuType.sajuIntro}
          </p>
          <p className="text-center mb-3 px-2" style={{ fontSize: "10px", color: "#9B96A0", lineHeight: "1.4" }}>
            {sajuType.personality}
          </p>

          {/* 궁합 */}
          <div className="flex gap-2 mb-3 px-1">
            <div className="flex-1 py-2 rounded-xl text-center" style={{ backgroundColor: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}>
              <p style={{ fontSize: "8px", color: "#4ADE80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Armonía</p>
              <span style={{ fontSize: "18px" }}>{compat.emoji}</span>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#F0ECE3", marginTop: "1px" }}>{compat.spanish}</p>
            </div>
            <div className="flex-1 py-2 rounded-xl text-center" style={{ backgroundColor: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
              <p style={{ fontSize: "8px", color: "#FBBF24", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Tensión</p>
              <span style={{ fontSize: "18px" }}>{clash.emoji}</span>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#F0ECE3", marginTop: "1px" }}>{clash.spanish}</p>
            </div>
          </div>

          {/* 키워드 */}
          <p className="text-center" style={{ fontSize: "10px", color: "#D4A853", fontWeight: 600, letterSpacing: "0.1em" }}>
            {sajuType.keywords.join(" · ")}
          </p>

          <div className="flex-1" />

          <p className="text-center" style={{ fontSize: "10px", color: "#5C5775" }}>@sajuastral</p>
        </div>
      </div>

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
