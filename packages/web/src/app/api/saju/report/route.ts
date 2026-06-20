import { NextRequest, NextResponse } from "next/server";
import { getSaju, updateSaju } from "@/lib/store";
import { ReportGenerator, DeepSeekReportGenerator } from "saju-report";
import type { ReportInput } from "saju-report";

type AnyReportInput = {
  [K in keyof ReportInput]: unknown;
};

export const maxDuration = 60;

function dbToReportInput(saju: Record<string, unknown>): AnyReportInput {
  const birth = saju.birth as { year: number; month: number; day: number; hour: number; minute: number; city: string };
  const pillars = saju.pillars as Record<string, { stem: string; branch: string; korean?: string; element: string; branchElement?: string }>;
  const dayMaster = saju.dayMaster as { stem: string; element: string; elementSpanish: string; solLuna?: string; yinYang?: string; korean: string };
  const tenGods = saju.tenGods as { entries: { position: string; char: string; tenGod: string; korean: string; spanish: string }[]; percentages: Record<string, number> };
  const twelvePhases = saju.twelvePhases as Record<string, { phase: string; korean: string; spanish: string }>;
  const strength = saju.strength as { level: string; levelKorean: string; levelSpanish: string; score: number };
  const yongShin = saju.yongShin as { element: string; elementKorean: string; elementSpanish: string };
  const giShin = saju.giShin as { element: string; elementKorean: string } | undefined;
  const majorFortunes = saju.majorFortunes as { direction: string; startAge: number; fortunes: { age: number; ganZhi: string; stemTenGod: string; branchTenGod: string; phase: string }[] };
  const yearlyFortune = saju.yearlyFortune as { year: number; age: number; ganZhi: string; stemTenGod: string; branchTenGod: string; phase: string };
  const monthlyFortunes = saju.monthlyFortunes as { month: number; ganZhi: string; stemTenGod: string; phase: string }[] | undefined;
  const spiritStars = saju.spiritStars as Record<string, string> | undefined;
  const specialStars = saju.specialStars as string[] | undefined;
  const relations = saju.relations as string[] | undefined;

  const makePillar = (p: typeof pillars.year) => ({
    stem: p.stem,
    branch: p.branch,
    korean: p.korean || "",
    stemElement: p.element,
    branchElement: p.branchElement || p.element,
    tenGod: tenGods?.entries?.find(e => e.char === p.stem)?.korean || "",
  });

  return {
    userName: saju.name as string,
    gender: saju.gender as "male" | "female",
    birth: {
      date: `${birth.year}-${String(birth.month).padStart(2, "0")}-${String(birth.day).padStart(2, "0")}`,
      time: `${String(birth.hour).padStart(2, "0")}:${String(birth.minute).padStart(2, "0")}`,
      city: birth.city,
      timezone: "America/Mexico_City",
    },
    fourPillars: {
      year: makePillar(pillars.year),
      month: makePillar(pillars.month),
      day: makePillar(pillars.day),
      hour: makePillar(pillars.hour),
    },
    fiveElements: saju.fiveElements as Record<string, number>,
    dayMaster: {
      stem: dayMaster.stem,
      element: dayMaster.element,
      elementSpanish: dayMaster.elementSpanish,
      yinYang: dayMaster.solLuna || dayMaster.yinYang || "yang",
      korean: dayMaster.korean,
    },
    tenGods: {
      entries: tenGods.entries,
      percentages: tenGods.percentages,
    },
    twelvePhases,
    spiritStars: spiritStars || {},
    specialStars: specialStars || [],
    strength: { ...strength, deukryeong: 0, friendCount: 0, foeCount: 0 },
    yongShin: { ...yongShin, category: "" },
    giShin: giShin || { element: "", elementKorean: "" },
    majorFortunes,
    yearlyFortune,
    monthlyFortunes: monthlyFortunes || [],
    relations: relations || [],
  };
}

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

    const saju = (await getSaju(id)) as Record<string, unknown> | null;
    if (!saju) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    if ((saju as { report?: unknown }).report) {
      return NextResponse.json({ success: true, cached: true });
    }

    if (!process.env.ANTHROPIC_API_KEY && !process.env.DEEPSEEK_API_KEY) {
      const dummyReport = {
        sections: [
          { title: "TU ESENCIA", content: generateDummySection("esencia", saju) },
          { title: "DISTRIBUCIÓN DE LOS CINCO ELEMENTOS", content: generateDummySection("elementos", saju) },
          { title: "TU FUERZA INTERIOR", content: generateDummySection("fuerza", saju) },
          { title: "LOS DIEZ DIOSES EN TU CARTA", content: generateDummySection("dioses", saju) },
          { title: "TU VIDA AMOROSA", content: generateDummySection("amor", saju) },
          { title: "TU RIQUEZA Y FINANZAS", content: generateDummySection("dinero", saju) },
          { title: "TU CARRERA Y VOCACIÓN", content: generateDummySection("carrera", saju) },
          { title: "TU SALUD Y BIENESTAR", content: generateDummySection("salud", saju) },
          { title: "LAS GRANDES ESTACIONES DE TU VIDA", content: generateDummySection("estaciones", saju) },
          { title: "TU AÑO ACTUAL", content: generateDummySection("año", saju) },
          { title: "RELACIONES EN TU CARTA", content: generateDummySection("relaciones", saju) },
          { title: "TU ELEMENTO DE PODER", content: generateDummySection("poder", saju) },
          { title: "ESTRELLAS ESPECIALES", content: generateDummySection("estrellas", saju) },
          { title: "MENSAJE FINAL — TU MAPA, TU CAMINO", content: generateDummySection("final", saju) },
        ],
        usage: { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheCreationTokens: 0 },
        generatedAt: new Date().toISOString(),
      };

      await updateSaju(id, { report: dummyReport, paid: true });
      return NextResponse.json({ success: true, cached: false });
    }

    const input = dbToReportInput(saju);

    let report;
    let provider: string;

    if (process.env.DEEPSEEK_API_KEY) {
      try {
        report = await new DeepSeekReportGenerator().generate(input as ReportInput);
        provider = "deepseek";
      } catch (deepseekErr) {
        console.error("DeepSeek failed, falling back to Claude:", deepseekErr);
        if (process.env.ANTHROPIC_API_KEY) {
          report = await new ReportGenerator().generate(input as ReportInput);
          provider = "claude (fallback)";
        } else {
          throw deepseekErr;
        }
      }
    } else {
      report = await new ReportGenerator().generate(input as ReportInput);
      provider = "claude";
    }

    await updateSaju(id, {
      report: { ...report, provider, generatedAt: new Date().toISOString() },
      paid: true,
    });

    return NextResponse.json({ success: true, cached: false, provider });
  } catch (err) {
    console.error("Report generation error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Error al generar el reporte", detail: message }, { status: 500 });
  }
}

function generateDummySection(type: string, saju: Record<string, unknown>): string {
  const name = saju.name as string || "Consultante";
  const dm = saju.dayMaster as { elementSpanish?: string } | undefined;
  const element = dm?.elementSpanish || "Madera";
  const ys = saju.yongShin as { elementSpanish?: string } | undefined;
  const yongShinEl = ys?.elementSpanish || "Agua";

  const sections: Record<string, string> = {
    esencia: `${name}, tu esencia es ${element}. Tu energía te otorga una naturaleza única.`,
    elementos: `La distribución de los Cinco Elementos en tu carta revela un patrón único.`,
    fuerza: `Tu fuerza interior determina cómo enfrentas los desafíos de la vida.`,
    dioses: `Los Diez Dioses representan las relaciones energéticas en tu carta.`,
    amor: `Tu carta revela patrones fascinantes sobre tu vida amorosa.`,
    dinero: `Tu relación con el dinero está marcada por tu elemento ${element}.`,
    carrera: `Tu vocación natural está escrita en tu carta, ${name}.`,
    salud: `Tu salud está conectada con el balance de los Cinco Elementos.`,
    estaciones: `Las Grandes Estaciones marcan las grandes etapas de tu vida.`,
    año: `Este año trae una energía particular para ti.`,
    relaciones: `Las relaciones entre tus pilares revelan dinámicas internas.`,
    poder: `Tu Elemento de Poder es ${yongShinEl} — la energía que más necesitas.`,
    estrellas: `Las Estrellas Especiales refinan la interpretación de tu Saju.`,
    final: `${name}, tu Saju no es una prisión, es un mapa. El destino te dio las cartas — tú decides cómo jugarlas.`,
  };

  return sections[type] || `Sección de análisis para ${name}.`;
}
