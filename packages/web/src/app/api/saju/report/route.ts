import { NextRequest, NextResponse } from "next/server";
import { getSaju, updateSaju } from "@/lib/store";
import { buildReportInput, ReportGenerator, DeepSeekReportGenerator } from "saju-report";

// Vercel 서버리스 타임아웃 확장 (Pro: 최대 300초, Hobby: 최대 60초)
export const maxDuration = 60;

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

    const birth = saju.birth as { year: number; month: number; day: number; hour: number; minute: number; city: string };
    const input = buildReportInput({
      userName: saju.name as string,
      gender: (saju.gender as "male" | "female"),
      year: birth.year,
      month: birth.month,
      day: birth.day,
      hour: birth.hour,
      minute: birth.minute,
      city: birth.city,
      timezone: "America/Mexico_City",
    });

    let report;
    let provider: string;

    // DeepSeek 우선 시도, 실패 시 Claude 폴백
    if (process.env.DEEPSEEK_API_KEY) {
      try {
        report = await new DeepSeekReportGenerator().generate(input);
        provider = "deepseek";
      } catch (deepseekErr) {
        console.error("DeepSeek failed, falling back to Claude:", deepseekErr);
        if (process.env.ANTHROPIC_API_KEY) {
          report = await new ReportGenerator().generate(input);
          provider = "claude (fallback)";
        } else {
          throw deepseekErr;
        }
      }
    } else {
      report = await new ReportGenerator().generate(input);
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
