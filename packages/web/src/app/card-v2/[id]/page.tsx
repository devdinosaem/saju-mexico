"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getSajuType } from "@/lib/saju-types";
import { getCompatibleElement, getClashingElement } from "@/lib/translations";
import { buildElementIcons, buildStoryLine } from "@/lib/saju-story";

interface SajuData {
  name: string;
  birth: { year: number; month: number; day: number; hour: number; minute: number; city: string };
  dayMaster: { element: string; elementSpanish: string; yinYang: string };
  fiveElements: Record<string, number>;
  strength: { score: number; levelSpanish: string };
}

export default function CardV2Page() {
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
        await navigator.share({ files: [file], title: `Saju de ${data?.name}`, text: "Descubre tu tipo en @sajudecorea" });
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

  const sajuType = getSajuType(data.dayMaster.element, data.dayMaster.yinYang, data.strength.score);
  const compat = getCompatibleElement(data.dayMaster.element);
  const clash = getClashingElement(data.dayMaster.element);
  const elementIcons = buildElementIcons(data.fiveElements);
  const storyLine = buildStoryLine(data.dayMaster.element, data.fiveElements);

  return (
    <main className="flex flex-col items-center min-h-screen bg-bg-primary py-6 px-4">
      {/* ═══ 캡쳐 영역 (v2) ═══ */}
      <div
        ref={cardRef}
        className="w-[360px] h-[640px] relative overflow-hidden flex flex-col"
        style={{ backgroundColor: "#0A0A1A", fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, rgba(212,168,83,0.06), transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom, rgba(212,168,83,0.04), transparent 60%)" }} />

        <div className="relative flex-1 flex flex-col px-8 py-6">
          {/* 이름 + 생년월일 */}
          <div className="text-center mb-5">
            <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "26px", fontWeight: 700, color: "#F0ECE3" }}>
              {data.name}
            </h1>
            <p style={{ fontSize: "11px", color: "#9B96A0", marginTop: "4px" }}>
              {data.birth.year}.{String(data.birth.month).padStart(2, "0")}.{String(data.birth.day).padStart(2, "0")} · {data.birth.hour}:{String(data.birth.minute).padStart(2, "0")} · {data.birth.city}
            </p>
          </div>

          {/* TÚ 영역 */}
          <div className="text-center mb-4 py-4 rounded-2xl" style={{ backgroundColor: "rgba(26,26,62,0.6)", border: "1px solid rgba(212,168,83,0.15)" }}>
            <p style={{ fontSize: "10px", color: "#D4A853", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
              Tú eres
            </p>
            <p className="text-4xl mb-2">{sajuType.emoji}</p>
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "22px", fontWeight: 700, background: "linear-gradient(135deg, #D4A853, #E8924A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {sajuType.name}
            </h2>
            <p style={{ fontSize: "11px", color: "#9B96A0", marginTop: "4px" }}>
              {data.strength.levelSpanish}
            </p>
          </div>

          {/* 내 세계 — 오행 개수 */}
          <div className="mb-3">
            <p className="text-center" style={{ fontSize: "10px", color: "#9B96A0", marginBottom: "8px" }}>Tu mundo interior:</p>
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
                    <span style={{ fontSize: "18px" }}>{el.emoji}</span>
                    <span style={{ fontSize: "14px", fontFamily: "monospace", fontWeight: 700, color: "#F0ECE3", marginTop: "2px" }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 태그라인 (30유형별) */}
          <p className="text-center mb-3 px-4" style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "13px", fontStyle: "italic", color: "#F0ECE3", lineHeight: "1.5" }}>
            &quot;{sajuType.tagline}&quot;
          </p>

          {/* 성격 문구 */}
          <p className="text-center mb-4 px-4" style={{ fontSize: "11px", color: "#9B96A0", lineHeight: "1.5" }}>
            {sajuType.personality}
          </p>

          {/* 궁합 — 2칸 카드 */}
          <div className="flex gap-2 mb-4 px-2">
            <div className="flex-1 py-3 rounded-xl text-center" style={{ backgroundColor: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}>
              <p style={{ fontSize: "9px", color: "#4ADE80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Armonía</p>
              <span style={{ fontSize: "22px" }}>{compat.emoji}</span>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#F0ECE3", marginTop: "2px" }}>{compat.spanish}</p>
            </div>
            <div className="flex-1 py-3 rounded-xl text-center" style={{ backgroundColor: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
              <p style={{ fontSize: "9px", color: "#FBBF24", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Tensión</p>
              <span style={{ fontSize: "22px" }}>{clash.emoji}</span>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#F0ECE3", marginTop: "2px" }}>{clash.spanish}</p>
            </div>
          </div>

          {/* 키워드 */}
          <p className="text-center" style={{ fontSize: "11px", color: "#D4A853", fontWeight: 600, letterSpacing: "0.1em" }}>
            {sajuType.keywords.join(" · ")}
          </p>

          <div className="flex-1" />

          {/* 계정 태그 */}
          <p className="text-center" style={{ fontSize: "11px", color: "#5C5775" }}>@sajudecorea</p>
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
