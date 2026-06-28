import { ImageResponse } from "next/og";
import { getSaju } from "@/lib/store";

export const alt = "Resultado Saju Astral";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ELEMENT_COLORS: Record<string, string> = {
  Madera: "#4ADE80", Fuego: "#F87171", Tierra: "#FBBF24",
  Metal: "#E2E8F0", Agua: "#60A5FA",
  wood: "#4ADE80", fire: "#F87171", earth: "#FBBF24",
  metal: "#E2E8F0", water: "#60A5FA",
};

const ELEMENT_LABELS: Record<string, string> = {
  wood: "Madera", fire: "Fuego", earth: "Tierra",
  metal: "Metal", water: "Agua",
  Madera: "Madera", Fuego: "Fuego", Tierra: "Tierra",
  Metal: "Metal", Agua: "Agua",
};

interface SajuResult {
  name?: string;
  pillars?: {
    year: { stem: string; branch: string; element: string };
    month: { stem: string; branch: string; element: string };
    day: { stem: string; branch: string; element: string };
    hour: { stem: string; branch: string; element: string };
  };
  fiveElements?: Record<string, number>;
  dayMaster?: { element: string; elementSpanish: string; stem: string };
  strength?: { levelSpanish: string };
}

export default async function OGImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let data: SajuResult | null = null;
  try {
    data = (await getSaju(id)) as SajuResult | null;
  } catch {}

  const name = data?.name || "Tu destino";
  const pillars = data?.pillars;
  const fiveElements = data?.fiveElements;
  const dayMaster = data?.dayMaster;
  const strength = data?.strength;

  const pillarLabels = ["年柱", "月柱", "日柱", "時柱"];
  const pillarData = pillars
    ? [pillars.year, pillars.month, pillars.day, pillars.hour]
    : null;

  const total = fiveElements
    ? Object.values(fiveElements).reduce((a, b) => a + b, 0)
    : 0;

  const stars = Array.from({ length: 25 }, (_, i) => ({
    x: (i * 137.5 + 80) % 1200,
    y: (i * 89.3 + 40) % 630,
    s: 1 + (i % 2),
    o: 0.15 + (i % 4) * 0.08,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "row",
          background: "linear-gradient(160deg, #0A0A1A 0%, #111128 50%, #1A1A3E 100%)",
          position: "relative",
          overflow: "hidden",
          padding: "40px 50px",
        }}
      >
        {stars.map((s, i) => (
          <div key={i} style={{ position: "absolute", left: `${s.x}px`, top: `${s.y}px`, width: `${s.s}px`, height: `${s.s}px`, borderRadius: "50%", background: "#D4A853", opacity: s.o }} />
        ))}

        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #D4A853 30%, #E8924A 50%, #D4A853 70%, transparent)", opacity: 0.5, display: "flex" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #D4A853 30%, #E8924A 50%, #D4A853 70%, transparent)", opacity: 0.5, display: "flex" }} />

        {/* LEFT: Name + Info */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, paddingRight: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span style={{ color: "#D4A853", fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase" as const }}>✦ Saju Astral</span>
          </div>

          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "44px", fontWeight: 700, color: "#F0ECE3", margin: "0 0 8px 0", lineHeight: 1.2 }}>
            El destino de
          </h1>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "52px", fontWeight: 700, background: "linear-gradient(135deg, #D4A853, #E8924A)", backgroundClip: "text", color: "transparent", margin: "0 0 24px 0", lineHeight: 1.1 }}>
            {name}
          </h2>

          {dayMaster && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "20px", border: `1px solid ${ELEMENT_COLORS[dayMaster.element] || "#D4A853"}`, background: "rgba(26, 26, 62, 0.8)" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: ELEMENT_COLORS[dayMaster.element] || "#D4A853", display: "flex" }} />
                <span style={{ color: "#F0ECE3", fontSize: "14px" }}>{dayMaster.elementSpanish || ELEMENT_LABELS[dayMaster.element]}</span>
              </div>
              {strength && (
                <span style={{ color: "#9B96A0", fontSize: "14px" }}>{strength.levelSpanish}</span>
              )}
            </div>
          )}

          {fiveElements && total > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
              <div style={{ display: "flex", height: "8px", borderRadius: "4px", overflow: "hidden", width: "380px" }}>
                {Object.entries(fiveElements).map(([el, val]) => (
                  <div key={el} style={{ width: `${(val / total) * 100}%`, background: ELEMENT_COLORS[el] || "#666", display: "flex" }} />
                ))}
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                {Object.entries(fiveElements).map(([el, val]) => (
                  <div key={el} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: ELEMENT_COLORS[el] || "#666", display: "flex" }} />
                    <span style={{ color: "#9B96A0", fontSize: "11px" }}>{ELEMENT_LABELS[el] || el} {Math.round((val / total) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "8px", background: "linear-gradient(135deg, #D4A853, #E8924A)", width: "fit-content" }}>
            <span style={{ color: "#0A0A1A", fontSize: "14px", fontWeight: 700 }}>Descubre tu destino →</span>
          </div>
        </div>

        {/* RIGHT: Four Pillars */}
        {pillarData && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {pillarData.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  padding: "20px 16px",
                  borderRadius: "12px",
                  background: "rgba(26, 26, 62, 0.6)",
                  border: i === 2 ? "1px solid rgba(212, 168, 83, 0.4)" : "1px solid rgba(212, 168, 83, 0.1)",
                  width: "100px",
                }}
              >
                <span style={{ fontSize: "11px", color: "#9B96A0", letterSpacing: "1px" }}>{pillarLabels[i]}</span>
                <span style={{ fontSize: "36px", fontFamily: "serif", color: ELEMENT_COLORS[p.element] || "#D4A853" }}>{p.stem}</span>
                <div style={{ width: "30px", height: "1px", background: "rgba(212, 168, 83, 0.2)", display: "flex" }} />
                <span style={{ fontSize: "36px", fontFamily: "serif", color: ELEMENT_COLORS[p.element] || "#D4A853" }}>{p.branch}</span>
                <span style={{ fontSize: "10px", color: "#9B96A0" }}>{ELEMENT_LABELS[p.element] || p.element}</span>
              </div>
            ))}
          </div>
        )}

        {!pillarData && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.5 }}>
              <span style={{ fontFamily: "serif", fontSize: "64px", color: "#D4A853" }}>四柱</span>
              <span style={{ fontSize: "14px", color: "#9B96A0" }}>Los 4 Pilares del Destino</span>
            </div>
          </div>
        )}

        {/* Corner decorations */}
        <div style={{ position: "absolute", top: "16px", left: "16px", width: "24px", height: "24px", borderTop: "2px solid #D4A853", borderLeft: "2px solid #D4A853", opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", top: "16px", right: "16px", width: "24px", height: "24px", borderTop: "2px solid #D4A853", borderRight: "2px solid #D4A853", opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "16px", left: "16px", width: "24px", height: "24px", borderBottom: "2px solid #D4A853", borderLeft: "2px solid #D4A853", opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "16px", right: "16px", width: "24px", height: "24px", borderBottom: "2px solid #D4A853", borderRight: "2px solid #D4A853", opacity: 0.25, display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}
