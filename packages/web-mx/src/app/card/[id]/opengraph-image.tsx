import { ImageResponse } from "next/og";
import { getSaju } from "@/lib/store";

export const alt = "Tu Carta Saju Astral";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ELEMENT_COLORS: Record<string, string> = {
  Madera: "#4ADE80", Fuego: "#F87171", Tierra: "#FBBF24",
  Metal: "#E2E8F0", Agua: "#60A5FA",
  wood: "#4ADE80", fire: "#F87171", earth: "#FBBF24",
  metal: "#E2E8F0", water: "#60A5FA",
};

const ELEMENT_EMOJI: Record<string, string> = {
  Madera: "🌿", Fuego: "🔥", Tierra: "⛰️",
  Metal: "⚔️", Agua: "🌊",
  wood: "🌿", fire: "🔥", earth: "⛰️",
  metal: "⚔️", water: "🌊",
};

const ELEMENT_LABELS: Record<string, string> = {
  wood: "Madera", fire: "Fuego", earth: "Tierra",
  metal: "Metal", water: "Agua",
  Madera: "Madera", Fuego: "Fuego", Tierra: "Tierra",
  Metal: "Metal", Agua: "Agua",
};

interface SajuResult {
  name?: string;
  dayMaster?: { element: string; elementSpanish: string; stem: string; solLuna?: string };
  strength?: { level: string; levelSpanish: string };
  fiveElements?: Record<string, number>;
}

export default async function OGImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let data: SajuResult | null = null;
  try {
    data = (await getSaju(id)) as SajuResult | null;
  } catch {}

  const name = data?.name || "Descubre tu tipo";
  const element = data?.dayMaster?.elementSpanish || data?.dayMaster?.element || "Misterio";
  const elementKey = data?.dayMaster?.element || "fire";
  const color = ELEMENT_COLORS[elementKey] || "#D4A853";
  const emoji = ELEMENT_EMOJI[elementKey] || "✦";
  const strengthLabel = data?.strength?.levelSpanish || "";
  const solLuna = data?.dayMaster?.solLuna === "양" ? "Sol ☀️" : data?.dayMaster?.solLuna === "음" ? "Luna 🌙" : "";

  const fiveElements = data?.fiveElements;
  const total = fiveElements ? Object.values(fiveElements).reduce((a, b) => a + b, 0) : 0;

  const stars = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 137.5 + 60) % 1200,
    y: (i * 89.3 + 20) % 630,
    s: 1 + (i % 2),
    o: 0.12 + (i % 4) * 0.06,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0A0A1A 0%, #111128 40%, #1A1A3E 70%, #0A0A1A 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {stars.map((s, i) => (
          <div key={i} style={{ position: "absolute", left: `${s.x}px`, top: `${s.y}px`, width: `${s.s}px`, height: `${s.s}px`, borderRadius: "50%", background: "#D4A853", opacity: s.o }} />
        ))}

        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #D4A853 30%, #E8924A 50%, #D4A853 70%, transparent)", opacity: 0.5, display: "flex" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #D4A853 30%, #E8924A 50%, #D4A853 70%, transparent)", opacity: 0.5, display: "flex" }} />

        {/* Orbit ring */}
        <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(212, 168, 83, 0.1)", display: "flex" }} />

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
          <span style={{ color: "#D4A853", fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase" as const }}>✦ Saju Astral</span>
        </div>

        {/* Element icon */}
        <div style={{ fontSize: "56px", marginBottom: "12px", display: "flex" }}>{emoji}</div>

        {/* Element name */}
        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: "56px",
          fontWeight: 700,
          color: color,
          margin: "0 0 4px 0",
          lineHeight: 1.1,
        }}>
          {element}
        </h1>

        {/* Yin/Yang + Strength */}
        {(solLuna || strengthLabel) && (
          <p style={{ fontSize: "20px", color: "#9B96A0", margin: "0 0 16px 0", letterSpacing: "2px" }}>
            {[solLuna, strengthLabel].filter(Boolean).join(" · ")}
          </p>
        )}

        {/* Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "8px 0 20px 0" }}>
          <div style={{ width: "40px", height: "1px", background: `linear-gradient(90deg, transparent, ${color})`, display: "flex" }} />
          <span style={{ fontFamily: "Georgia, serif", fontSize: "28px", color: "#F0ECE3" }}>{name}</span>
          <div style={{ width: "40px", height: "1px", background: `linear-gradient(90deg, ${color}, transparent)`, display: "flex" }} />
        </div>

        {/* Five Elements Bar */}
        {fiveElements && total > 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <div style={{ display: "flex", height: "8px", borderRadius: "4px", overflow: "hidden", width: "400px" }}>
              {Object.entries(fiveElements).map(([el, val]) => (
                <div key={el} style={{ width: `${(val / total) * 100}%`, background: ELEMENT_COLORS[el] || "#666", display: "flex" }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              {Object.entries(fiveElements).map(([el, val]) => (
                <div key={el} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: ELEMENT_COLORS[el] || "#666", display: "flex" }} />
                  <span style={{ color: "#9B96A0", fontSize: "11px" }}>{ELEMENT_LABELS[el] || el} {Math.round((val / total) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 24px", borderRadius: "8px", background: "linear-gradient(135deg, #D4A853, #E8924A)", marginTop: "20px" }}>
          <span style={{ color: "#0A0A1A", fontSize: "14px", fontWeight: 700 }}>Descubre tu tipo →</span>
        </div>

        {/* Corners */}
        <div style={{ position: "absolute", top: "16px", left: "16px", width: "24px", height: "24px", borderTop: "2px solid #D4A853", borderLeft: "2px solid #D4A853", opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", top: "16px", right: "16px", width: "24px", height: "24px", borderTop: "2px solid #D4A853", borderRight: "2px solid #D4A853", opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "16px", left: "16px", width: "24px", height: "24px", borderBottom: "2px solid #D4A853", borderLeft: "2px solid #D4A853", opacity: 0.25, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "16px", right: "16px", width: "24px", height: "24px", borderBottom: "2px solid #D4A853", borderRight: "2px solid #D4A853", opacity: 0.25, display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}
