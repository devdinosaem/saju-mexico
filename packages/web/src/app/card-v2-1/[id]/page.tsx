"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getSajuType } from "@/lib/saju-types";
import { getCompatibleElement, getClashingElement } from "@/lib/translations";

interface SajuData {
  name: string;
  birth: { year: number; month: number; day: number; hour: number; minute: number; city: string };
  dayMaster: { element: string; elementSpanish: string; solLuna: string };
  fiveElements: Record<string, number>;
  strength: { score: number; levelSpanish: string };
}

const EL_COLORS: Record<string, string> = {
  wood: "#4ADE80", fire: "#F87171", earth: "#FBBF24", metal: "#E2E8F0", water: "#60A5FA",
};

export default function CardV21Page() {
  const { id } = useParams();
  const [data, setData] = useState<SajuData | null>(null);
  const [saving, setSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/saju/calculate?id=${id}`)
      .then((r) => r.json())
      .then((d) => { if (d?.fiveElements) setData(d); });
  }, [id]);

  const captureCard = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null, scale: 2, useCORS: true, logging: false, allowTaint: true, foreignObjectRendering: false,
      });
      return new Promise((r) => canvas.toBlob((b) => r(b), "image/png", 1.0));
    } catch { return null; }
  };

  const handleDownload = async () => {
    setSaving(true);
    const blob = await captureCard();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `saju-${data?.name}.png`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    }
    setSaving(false);
  };

  const handleShare = async () => {
    setSaving(true);
    const blob = await captureCard();
    if (blob && navigator.share) {
      const file = new File([blob], "saju-card.png", { type: "image/png" });
      await navigator.share({ files: [file], title: `Saju de ${data?.name}` }).catch(() => {});
    } else if (blob) { await handleDownload(); }
    setSaving(false);
  };

  if (!data) return <div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" /></div>;

  const t = getSajuType(data.dayMaster.element, data.dayMaster.solLuna, data.strength.score);
  const compat = getCompatibleElement(data.dayMaster.element);
  const clash = getClashingElement(data.dayMaster.element);
  const elList = [
    { key: "wood", emoji: "🌳" }, { key: "fire", emoji: "🔥" },
    { key: "earth", emoji: "⛰️" }, { key: "metal", emoji: "💎" }, { key: "water", emoji: "💧" },
  ];

  return (
    <main className="flex flex-col items-center min-h-screen py-6 px-4" style={{ backgroundColor: "#060612" }}>
      {/* ═══ 카드 ═══ */}
      <div
        ref={cardRef}
        style={{
          width: 360, height: 640,
          background: "linear-gradient(160deg, #0c0c24 0%, #0a0a1a 40%, #12081f 100%)",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative", overflow: "hidden",
          borderRadius: "24px",
        }}
      >
        {/* 글로우 이펙트 */}
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -60, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />

        {/* 노이즈 텍스쳐 오버레이 */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", padding: "28px 28px 20px" }}>

          {/* 이름 — 크고 대담하게 */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <p style={{ fontSize: 10, color: "rgba(212,168,83,0.6)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>
              ✦ tu saju ✦
            </p>
            <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 30, fontWeight: 800, color: "#F0ECE3", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {data.name}
            </h1>
            <p style={{ fontSize: 10, color: "rgba(155,150,160,0.7)", marginTop: 6, letterSpacing: "0.05em" }}>
              {data.birth.year}.{String(data.birth.month).padStart(2, "0")}.{String(data.birth.day).padStart(2, "0")} · {data.birth.hour}:{String(data.birth.minute).padStart(2, "0")}
            </p>
          </div>

          {/* 유형 — 글래스모피즘 카드 */}
          <div style={{
            textAlign: "center", padding: "20px 16px", marginBottom: 16,
            borderRadius: 20,
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(10px)",
          }}>
            <p style={{ fontSize: 40, marginBottom: 4 }}>{t.emoji}</p>
            <h2 style={{
              fontFamily: "Playfair Display, Georgia, serif", fontSize: 24, fontWeight: 700,
              background: "linear-gradient(135deg, #D4A853 0%, #E8924A 50%, #D4A853 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "-0.01em",
            }}>
              {t.name}
            </h2>
            <p style={{ fontSize: 11, color: "rgba(212,168,83,0.7)", marginTop: 4, letterSpacing: "0.08em" }}>
              {data.strength.levelSpanish}
            </p>
          </div>

          {/* 태그라인 */}
          <p style={{
            textAlign: "center", fontFamily: "Playfair Display, Georgia, serif",
            fontSize: 14, fontStyle: "italic", color: "#F0ECE3",
            lineHeight: 1.5, marginBottom: 8, padding: "0 8px",
          }}>
            &ldquo;{t.tagline}&rdquo;
          </p>

          {/* 성격 */}
          <p style={{ textAlign: "center", fontSize: 11, color: "rgba(155,150,160,0.8)", lineHeight: 1.6, marginBottom: 16, padding: "0 4px" }}>
            {t.personality}
          </p>

          {/* 오행 — 미니멀 도트 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16 }}>
            {elList.map((el) => {
              const count = data.fiveElements[el.key] || 0;
              return (
                <div key={el.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <span style={{ fontSize: 16 }}>{el.emoji}</span>
                  <span style={{
                    fontSize: 13, fontWeight: 700, fontFamily: "monospace",
                    color: EL_COLORS[el.key],
                  }}>{count}</span>
                </div>
              );
            })}
          </div>

          {/* 궁합 — 필 스타일 태그 */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 14 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 100,
              background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
            }}>
              <span style={{ fontSize: 14 }}>{compat.emoji}</span>
              <span style={{ fontSize: 11, color: "#4ADE80", fontWeight: 500 }}>{compat.spanish}</span>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 100,
              background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)",
            }}>
              <span style={{ fontSize: 14 }}>{clash.emoji}</span>
              <span style={{ fontSize: 11, color: "#FBBF24", fontWeight: 500 }}>{clash.spanish}</span>
            </div>
          </div>

          {/* 키워드 */}
          <p style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "rgba(212,168,83,0.8)", letterSpacing: "0.12em" }}>
            {t.keywords.join("  ·  ")}
          </p>

          <div style={{ flex: 1 }} />

          {/* 하단 */}
          <p style={{ textAlign: "center", fontSize: 11, color: "rgba(92,87,117,0.8)", letterSpacing: "0.05em" }}>
            @sajudecorea
          </p>
        </div>
      </div>

      {/* ═══ CTA ═══ */}
      <div className="flex flex-col gap-2 mt-6 w-full max-w-[360px]">
        <button
          onClick={handleShare}
          disabled={saving}
          className="w-full rounded-xl py-3.5 font-serif text-sm font-semibold tracking-wide transition-transform active:scale-[0.98] disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #D4A853, #E8924A)", color: "#0A0A1A" }}
        >
          {saving ? "Preparando..." : "Compartir en Stories"}
        </button>
        <button
          onClick={handleDownload}
          disabled={saving}
          className="w-full rounded-xl py-3.5 font-serif text-sm tracking-wide transition-colors disabled:opacity-50"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F0ECE3" }}
        >
          Guardar imagen
        </button>
      </div>
    </main>
  );
}
