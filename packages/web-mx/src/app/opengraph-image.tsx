import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Saju Astral — Desde Corea, más allá de tu horóscopo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const playfairResp = await fetch(
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
  );
  const playfairCss = await playfairResp.text();
  const fontUrl = playfairCss.match(/src: url\(([^)]+)\)/)?.[1];

  let playfairFont: ArrayBuffer | undefined;
  if (fontUrl) {
    playfairFont = await fetch(fontUrl).then((r) => r.arrayBuffer());
  }

  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: (i * 137.5 + 50) % 1200,
    y: (i * 89.3 + 30) % 630,
    size: 1 + (i % 3),
    opacity: 0.2 + (i % 5) * 0.1,
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
        {/* Stars */}
        {stars.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${s.x}px`,
              top: `${s.y}px`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: "50%",
              background: "#D4A853",
              opacity: s.opacity,
            }}
          />
        ))}

        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            border: "1px solid rgba(212, 168, 83, 0.15)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            border: "1px solid rgba(212, 168, 83, 0.08)",
            display: "flex",
          }}
        />

        {/* Top aztec line */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            height: "3px",
            background: "linear-gradient(90deg, transparent 0%, #D4A853 30%, #E8924A 50%, #D4A853 70%, transparent 100%)",
            opacity: 0.6,
            display: "flex",
          }}
        />
        {/* Bottom aztec line */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "3px",
            background: "linear-gradient(90deg, transparent 0%, #D4A853 30%, #E8924A 50%, #D4A853 70%, transparent 100%)",
            opacity: 0.6,
            display: "flex",
          }}
        />

        {/* Four pillars symbols - corners */}
        <div style={{ position: "absolute", top: "60px", left: "100px", display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.25 }}>
          <span style={{ fontFamily: "serif", fontSize: "32px", color: "#D4A853" }}>年</span>
        </div>
        <div style={{ position: "absolute", top: "60px", right: "100px", display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.25 }}>
          <span style={{ fontFamily: "serif", fontSize: "32px", color: "#D4A853" }}>月</span>
        </div>
        <div style={{ position: "absolute", bottom: "60px", left: "100px", display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.25 }}>
          <span style={{ fontFamily: "serif", fontSize: "32px", color: "#D4A853" }}>日</span>
        </div>
        <div style={{ position: "absolute", bottom: "60px", right: "100px", display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.25 }}>
          <span style={{ fontFamily: "serif", fontSize: "32px", color: "#D4A853" }}>時</span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 10 }}>
          {/* 四柱 symbol */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "12px",
            }}
          >
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #D4A853)", display: "flex" }} />
            <span style={{ fontFamily: "serif", fontSize: "36px", color: "#D4A853", opacity: 0.7 }}>✦</span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #D4A853, transparent)", display: "flex" }} />
          </div>

          {/* Brand name */}
          <h1
            style={{
              fontFamily: playfairFont ? "'Playfair Display'" : "Georgia, serif",
              fontSize: "72px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #D4A853 0%, #E8924A 50%, #D4A853 100%)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            Saju Astral
          </h1>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "8px 0",
            }}
          >
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #D4A853)", display: "flex" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4A853", display: "flex" }} />
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #D4A853, transparent)", display: "flex" }} />
          </div>

          {/* Slogan */}
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "24px",
              color: "#F0ECE3",
              margin: 0,
              letterSpacing: "2px",
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            Desde Corea, más allá de tu horóscopo
          </p>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "16px",
              color: "#9B96A0",
              margin: "12px 0 0 0",
              letterSpacing: "1px",
            }}
          >
            El oráculo coreano de los 4 pilares del destino
          </p>
        </div>

        {/* Corner decorations */}
        <div style={{ position: "absolute", top: "20px", left: "20px", width: "40px", height: "40px", borderTop: "2px solid #D4A853", borderLeft: "2px solid #D4A853", opacity: 0.3, display: "flex" }} />
        <div style={{ position: "absolute", top: "20px", right: "20px", width: "40px", height: "40px", borderTop: "2px solid #D4A853", borderRight: "2px solid #D4A853", opacity: 0.3, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "20px", left: "20px", width: "40px", height: "40px", borderBottom: "2px solid #D4A853", borderLeft: "2px solid #D4A853", opacity: 0.3, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "20px", right: "20px", width: "40px", height: "40px", borderBottom: "2px solid #D4A853", borderRight: "2px solid #D4A853", opacity: 0.3, display: "flex" }} />
      </div>
    ),
    {
      ...size,
      fonts: playfairFont
        ? [{ name: "Playfair Display", data: playfairFont, weight: 700 as const, style: "normal" as const }]
        : [],
    }
  );
}
