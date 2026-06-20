"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getSajuType, getInsightLine } from "@/lib/saju-types";
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

  const captureCard = async () => {
    if (!cardRef.current) return null;
    const html2canvas = (await import("html2canvas")).default;
    return html2canvas(cardRef.current, { backgroundColor: "#0A0A1A", scale: 2 });
  };

  const handleDownload = async () => {
    setSaving(true);
    const canvas = await captureCard();
    if (canvas) {
      const link = document.createElement("a");
      link.download = `saju-${data?.name || "card"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
    setSaving(false);
  };

  const handleShare = async () => {
    setSaving(true);
    const canvas = await captureCard();
    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (!blob) { setSaving(false); return; }
        const file = new File([blob], "saju-card.png", { type: "image/png" });
        if (navigator.share) {
          await navigator.share({ files: [file], title: `Saju de ${data?.name}` }).catch(() => {});
        } else {
          const link = document.createElement("a");
          link.download = `saju-${data?.name || "card"}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
        }
        setSaving(false);
      });
    } else {
      setSaving(false);
    }
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  const sajuType = getSajuType(data.dayMaster.element, data.dayMaster.yinYang, data.strength.score);
  const insight = getInsightLine(data.dayMaster.element, data.strength.score, data.fiveElements);
  const compat = getCompatibleElement(data.dayMaster.element);
  const clash = getClashingElement(data.dayMaster.element);
  const total = Object.values(data.fiveElements).reduce((a, b) => a + b, 0) || 1;
  const yy = data.dayMaster.yinYang === "yang" ? "Yang" : "Yin";

  return (
    <main className="flex flex-col items-center min-h-screen bg-bg-primary py-6 px-4">
      {/* ═══ 캡쳐 영역 (9:16, CTA 제외) ═══ */}
      <div
        ref={cardRef}
        className="w-[360px] h-[640px] bg-bg-primary relative overflow-hidden flex flex-col"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,83,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,168,83,0.04),transparent_60%)]" />

        <div className="relative flex-1 flex flex-col px-8 py-6">
          {/* 이름 + 생년월일 */}
          <div className="text-center mb-4">
            <h1 className="font-serif text-2xl font-bold tracking-tight">{data.name}</h1>
            <p className="text-text-secondary text-xs mt-1">
              {data.birth.year}.{String(data.birth.month).padStart(2, "0")}.{String(data.birth.day).padStart(2, "0")} · {data.birth.hour}:{String(data.birth.minute).padStart(2, "0")} · {data.birth.city}
            </p>
          </div>

          {/* 유형 */}
          <div className="text-center mb-3">
            <p className="text-5xl mb-2">{sajuType.emoji}</p>
            <h2 className="font-serif text-xl font-bold text-gradient-gold">&quot;{sajuType.name}&quot;</h2>
            <p className="text-text-secondary text-xs mt-1">{data.dayMaster.elementSpanish} {yy} · {data.strength.levelSpanish}</p>
          </div>

          <div className="w-12 h-px bg-gold/30 mx-auto mb-3" />

          {/* 태그라인 */}
          <p className="text-center text-text-primary text-sm italic font-serif mb-2">
            &quot;{sajuType.tagline}&quot;
          </p>

          {/* 인사이트 1줄 */}
          <p className="text-center text-text-muted text-xs leading-relaxed mb-4 px-2">
            {insight}
          </p>

          {/* 오행 수직 바 */}
          <div className="flex gap-2 justify-center mb-4">
            {[
              { key: "wood", label: "木" },
              { key: "fire", label: "火" },
              { key: "earth", label: "土" },
              { key: "metal", label: "金" },
              { key: "water", label: "水" },
            ].map((el) => {
              const pct = Math.round(((data.fiveElements[el.key] || 0) / total) * 100);
              return (
                <div key={el.key} className="flex flex-col items-center gap-0.5">
                  <div className="w-8 h-16 bg-bg-surface rounded-full overflow-hidden flex flex-col-reverse">
                    <div className="w-full rounded-full" style={{ height: `${Math.max(pct, 5)}%`, backgroundColor: ELEMENT_COLORS[el.key] }} />
                  </div>
                  <span className="text-[10px] text-text-muted">{el.label}</span>
                  <span className="text-[10px] font-mono" style={{ color: ELEMENT_COLORS[el.key] }}>{pct}%</span>
                </div>
              );
            })}
          </div>

          {/* 궁합 */}
          <div className="flex gap-2 justify-center mb-4">
            <div className="flex items-center gap-1 bg-bg-card rounded-full px-3 py-1.5 border border-white/5 text-xs">
              <span>{compat.emoji}</span>
              <span className="text-green-400">♥</span>
              <span>{compat.spanish}</span>
            </div>
            <div className="flex items-center gap-1 bg-bg-card rounded-full px-3 py-1.5 border border-white/5 text-xs">
              <span>{clash.emoji}</span>
              <span className="text-amber">✕</span>
              <span>{clash.spanish}</span>
            </div>
          </div>

          {/* 키워드 */}
          <p className="text-center text-gold text-xs font-semibold tracking-wider">
            {sajuType.keywords.join(" · ")}
          </p>

          <div className="flex-1" />

          {/* 계정 태그 */}
          <p className="text-center text-text-muted text-xs">@sajudecorea</p>
        </div>
      </div>

      {/* ═══ CTA (캡쳐 영역 밖) ═══ */}
      <div className="flex flex-col gap-2 mt-6 w-full max-w-[360px]">
        <button
          onClick={handleShare}
          disabled={saving}
          className="w-full gradient-gold text-bg-primary rounded-xl py-3.5 text-sm font-bold transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          {saving ? "Preparando..." : "📲 Subir a Instagram Stories"}
        </button>
        <button
          onClick={handleDownload}
          disabled={saving}
          className="w-full bg-bg-card border border-white/10 rounded-xl py-3.5 text-sm font-medium hover:border-gold/30 transition-colors disabled:opacity-50"
        >
          📥 Guardar imagen
        </button>
      </div>
    </main>
  );
}
