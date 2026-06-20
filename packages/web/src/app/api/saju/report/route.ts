import { NextRequest, NextResponse } from "next/server";
import { getSaju, updateSaju } from "@/lib/store";
import { buildReportInput, ReportGenerator } from "saju-report";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

    const saju = (await getSaju(id)) as Record<string, unknown> | null;
    if (!saju) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    if ((saju as { report?: unknown }).report) {
      return NextResponse.json({ success: true, cached: true });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      // MVP: API 키 없으면 더미 리포트 생성
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

    // Claude API로 실제 리포트 생성
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

    const generator = new ReportGenerator();
    const report = await generator.generate(input);

    await updateSaju(id, {
      report: { ...report, generatedAt: new Date().toISOString() },
      paid: true,
    });

    return NextResponse.json({ success: true, cached: false });
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
    esencia: `${name}, tu Pilar del Día revela una esencia de ${element}. Eres como un gran árbol que crece hacia el cielo con determinación inquebrantable. La energía de ${element} te otorga una naturaleza de líder nato: recto, ambicioso y siempre creciendo.\n\nComo el árbol que busca la luz sin importar los obstáculos, tú también tienes una dirección clara en la vida. Tu honestidad es tu mayor virtud — no sabes mentir, y eso te hace ganar la confianza de quienes te rodean.\n\nSin embargo, como el árbol que no se dobla, a veces tu rigidez puede ser tu talón de Aquiles. Aprender a ser flexible como el bambú, sin perder tu esencia, es tu mayor desafío.`,
    elementos: `La distribución de los Cinco Elementos en tu carta revela un patrón fascinante. Tu elemento ${element} es la base de todo, pero la interacción con los demás elementos cuenta la historia completa de tu vida.\n\nCada elemento ausente o dominante tiene un significado profundo: un elemento ausente no es una debilidad, sino una invitación a buscarlo en el mundo exterior — en las personas que te rodean, en los lugares que visitas, en las actividades que eliges.`,
    fuerza: `Tu fuerza interior determina cómo enfrentas los desafíos. Como persona de ${element}, tu energía natural fluye de manera particular. Los aliados en tu carta (las energías que te apoyan) y los desafíos (las que te empujan a crecer) crean el equilibrio único de tu vida.\n\nEste balance es clave para entender por qué ciertas épocas de tu vida se sienten más fáciles que otras.`,
    dioses: `Los Diez Dioses (십신) en tu carta son las relaciones energéticas entre los elementos. Cada uno representa un aspecto diferente de tu vida: desde tu creatividad hasta tu ambición, desde tus relaciones hasta tu forma de manejar el dinero.\n\nLa distribución particular de estos Dioses en tu carta revela por qué tienes ciertos talentos naturales y por qué algunos aspectos de la vida te resultan más desafiantes.`,
    amor: `En el amor, tu carta Saju revela patrones fascinantes, ${name}. Tu elemento ${element} busca naturalmente una pareja que complemente tu energía — alguien que traiga el balance que necesitas.\n\nLos periodos más favorables para el amor en tu vida están marcados por las Grandes Estaciones que traen energías compatibles con tu esencia. Presta especial atención a los años donde tu elemento de poder (${yongShinEl}) es fuerte — esos son los momentos donde el amor tiene más probabilidad de florecer.`,
    dinero: `Tu relación con el dinero está profundamente marcada por tu elemento ${element}. La forma en que generas, conservas y multiplicas tu riqueza sigue patrones que tu Saju revela con claridad.\n\nTu ciclo de riqueza más importante llegará cuando las Grandes Estaciones traigan la energía adecuada. Mientras tanto, tu estrategia ideal de inversión debe alinearse con tu elemento de poder: ${yongShinEl}.`,
    carrera: `Tu vocación natural está escrita en tu carta, ${name}. El elemento ${element} te orienta hacia profesiones donde puedas expresar tu naturaleza auténtica.\n\nLos campos más favorables para ti son aquellos relacionados con tu elemento dominante y tu elemento de poder. Los momentos ideales para cambios profesionales coinciden con las transiciones en tus Grandes Estaciones.`,
    salud: `Tu salud está íntimamente conectada con el balance de los Cinco Elementos en tu carta. Cada elemento rige órganos y sistemas específicos del cuerpo.\n\nComo persona de ${element}, debes prestar especial atención a los órganos asociados con los elementos más débiles en tu carta. Tu elemento de poder (${yongShinEl}) te indica qué tipo de ejercicio, alimentación y estilo de vida te benefician más.`,
    estaciones: `Las Grandes Estaciones (대운) son los ciclos de 10 años que marcan las grandes etapas de tu vida. Cada estación trae una energía diferente que influye en todo: relaciones, carrera, salud y oportunidades.\n\nIdentificar en qué estación te encuentras ahora y qué viene después es una de las herramientas más poderosas del Saju. Te permite prepararte para aprovechar los buenos tiempos y protegerte durante los desafíos.`,
    año: `Este año trae una energía particular que interactúa con tu carta natal de maneras específicas. Algunos meses serán más favorables que otros — y conocerlos de antemano te da una ventaja enorme.\n\nLos meses donde la energía del año se alinea con tu elemento de poder (${yongShinEl}) son tus mejores momentos para tomar decisiones importantes.`,
    relaciones: `Las relaciones entre tus pilares revelan las dinámicas internas de tu carta. Las armonías (合) indican áreas de tu vida donde las cosas fluyen naturalmente. Los conflictos (沖) señalan donde necesitas más atención y crecimiento.\n\nEntender estas relaciones te ayuda a comprender por qué ciertas áreas de tu vida siempre han sido más fáciles que otras.`,
    poder: `Tu Elemento de Poder (용신) es ${yongShinEl} — es la energía que más necesitas en tu vida para alcanzar el equilibrio. Piensa en él como tu "medicina cósmica".\n\nIncorporar más ${yongShinEl} en tu vida diaria — a través de colores, actividades, alimentos, y dirección geográfica — puede mejorar significativamente tu bienestar y suerte general.`,
    estrellas: `Las Estrellas Especiales en tu carta son indicadores adicionales que refinan la interpretación de tu Saju. Cada estrella aporta una cualidad única a tu personalidad y destino.\n\nEstas estrellas no determinan tu vida, pero sí añaden matices importantes que un análisis superficial podría pasar por alto.`,
    final: `${name}, recuerda: tu Saju no es una prisión, es un mapa. El destino te dio las cartas — tú decides cómo jugarlas.\n\nConocer tu Saju te da la ventaja de saber cuándo empujar y cuándo esperar, cuándo arriesgar y cuándo proteger. Usa esta sabiduría ancestral como lo que es: una brújula, no una sentencia.\n\n"El sabio gobierna su destino; el ignorante es gobernado por él."\n— Proverbio coreano (현명한 자는 운명을 다스리고, 어리석은 자는 운명에 다스림을 받는다)`,
  };

  return sections[type] || `Sección de análisis para ${name}.`;
}
