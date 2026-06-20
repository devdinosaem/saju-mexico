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

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setSaving(true);
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#0A0A1A",
      scale: 2,
      width: 1080 / 2,
      height: 1920 / 2,
    });
    const link = document.createElement("a");
    link.download = `saju-${data?.name || "card"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setSaving(false);
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    setSaving(true);
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#0A0A1A",
      scale: 2,
      width: 1080 / 2,
      height: 1920 / 2,
    });
    canvas.toBlob(async (blob) => {
      if (!blob) { setSaving(false); return; }
      const file = new File([blob], "saju-card.png", { type: "image/png" });
      if (navigator.share) {
        await navigator.share({ files: [file], title: `Saju de ${data?.name}` }).catch(() => {});
      }
      setSaving(false);
    });
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
      {/* 캡쳐 영역 — 9:16 비율 (540×960 → @2x = 1080×1920) */}
      <div
        ref={cardRef}
        className="w-[540px] h-[960px] bg-bg-primary relative overflow-hidden flex flex-col"
        style={{ maxWidth: "100vw", aspectRatio: "9/16" }}
      >
        {/* 배경 장식 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,83,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,168,83,0.04),transparent_60%)]" />

        {/* 컨텐츠 */}
        <div className="relative flex-1 flex flex-col px-10 py-8">

          {/* 이름 + 생년월일 */}
          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl font-bold tracking-tight">{data.name}</h1>
            <p className="text-text-secondary text-sm mt-1">
              {data.birth.year}.{String(data.birth.month).padStart(2, "0")}.{String(data.birth.day).padStart(2, "0")} · {data.birth.hour}:{String(data.birth.minute).padStart(2, "0")} · {data.birth.city}
            </p>
          </div>

          {/* 유형 이모지 + 이름 */}
          <div className="text-center mb-4">
            <p className="text-6xl mb-3">{sajuType.emoji}</p>
            <h2 className="font-serif text-2xl font-bold text-gradient-gold tracking-wide">
              &quot;{sajuType.name}&quot;
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              {data.dayMaster.elementSpanish} {yy} · {data.strength.levelSpanish}
            </p>
          </div>

          {/* 구분선 */}
          <div className="w-16 h-px bg-gold/30 mx-auto mb-4" />

          {/* 태그라인 */}
          <p className="text-center text-text-primary text-base italic font-serif mb-4">
            &quot;{sajuType.tagline}&quot;
          </p>

          {/* 핵심 인사이트 1줄 */}
          <p className="text-center text-text-secondary text-xs leading-relaxed mb-5 px-4">
            {insight}
          </p>

          {/* 오행 분포 미니 */}
          <div className="flex gap-2 justify-center mb-5">
            {[
              { key: "wood", label: "木" },
              { key: "fire", label: "火" },
              { key: "earth", label: "土" },
              { key: "metal", label: "金" },
              { key: "water", label: "水" },
            ].map((el) => {
              const count = data.fiveElements[el.key] || 0;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={el.key} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-24 bg-bg-surface rounded-full overflow-hidden flex flex-col-reverse">
                    <div
                      className="w-full rounded-full transition-all"
                      style={{ height: `${Math.max(pct, 5)}%`, backgroundColor: ELEMENT_COLORS[el.key] }}
                    />
                  </div>
                  <span className="text-xs text-text-muted">{el.label}</span>
                  <span className="text-xs font-mono" style={{ color: ELEMENT_COLORS[el.key] }}>{pct}%</span>
                </div>
              );
            })}
          </div>

          {/* 궁합 */}
          <div className="flex gap-3 justify-center mb-5">
            <div className="flex items-center gap-1.5 bg-bg-card rounded-full px-4 py-2 border border-white/5">
              <span className="text-sm">{compat.emoji}</span>
              <span className="text-xs text-green-400">♥</span>
              <span className="text-xs">{compat.spanish}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-bg-card rounded-full px-4 py-2 border border-white/5">
              <span className="text-sm">{clash.emoji}</span>
              <span className="text-xs text-amber">✕</span>
              <span className="text-xs">{clash.spanish}</span>
            </div>
          </div>

          {/* 키워드 */}
          <p className="text-center text-gold text-sm font-semibold tracking-wider">
            {sajuType.keywords.join(" · ")}
          </p>

          {/* 하단 spacer */}
          <div className="flex-1" />

          {/* 하단 계정명 */}
          <div className="text-center">
            <p className="text-text-muted text-xs">@sajudecorea</p>
          </div>
        </div>
      </div>

      {/* 다운로드/공유 버튼 (캡쳐 영역 밖) */}
      <div className="flex gap-3 mt-6 w-full max-w-[540px]">
        <button
          onClick={handleDownload}
          disabled={saving}
          className="flex-1 bg-bg-card border border-white/10 rounded-xl py-3.5 text-sm font-medium hover:border-gold/30 transition-colors disabled:opacity-50"
        >
          {saving ? "Guardando..." : "📥 Guardar imagen"}
        </button>
        <button
          onClick={handleShare}
          disabled={saving}
          className="flex-1 gradient-gold text-bg-primary rounded-xl py-3.5 text-sm font-bold transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          📲 Compartir
        </button>
      </div>
    </main>
  );
}
