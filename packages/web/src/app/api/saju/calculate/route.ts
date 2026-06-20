import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN, STEM_ELEMENT, BRANCH_ELEMENT, ELEMENT_SPANISH, BRANCH_SPANISH, STEM_YINYANG } from "manseryeok";
import {
  analyzeTenGods, TEN_GOD_KOREAN, TEN_GOD_SPANISH,
  analyzeTwelvePhases, PHASE_KOREAN, PHASE_SPANISH,
  analyzeSpiritStars, analyzeSpecialStars, SPIRIT_STAR_KOREAN,
  calculateMajorFortunes, calculateYearlyFortunes, calculateMonthlyFortunes,
  analyzeYongShin, STRENGTH_KOREAN, STRENGTH_SPANISH, ELEMENT_KOREAN,
  analyzeRelations,
  calculateSamjae, getSamjaeYearsAround,
} from "saju-engine";

import { saveSaju, getSaju } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, gender, year, month, day, hour, minute, city, unknownTime } = body;

    if (!name || !year || !month || !day || !city) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }
    if (!unknownTime && (hour === undefined || minute === undefined)) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const saju = calculateSaju({ year, month, day, hour, minute, city });
    const p = saju.fourPillars;
    const tenGods = analyzeTenGods(p, saju.dayMaster.stem);
    const phases = analyzeTwelvePhases(p, saju.dayMaster.stem);
    const spirits = analyzeSpiritStars(p);
    const specials = analyzeSpecialStars(p, saju.dayMaster.stem);
    const fortunes = calculateMajorFortunes(p.month, p.year.stem, gender, year, month, day, saju.dayMaster.stem);
    const currentYear = new Date().getFullYear();
    const yearly = calculateYearlyFortunes(year, saju.dayMaster.stem, currentYear, currentYear);
    const monthly = calculateMonthlyFortunes(currentYear, saju.dayMaster.stem);
    const yongShin = analyzeYongShin(saju.dayMaster.stem, p, saju.fiveElements, tenGods.count);
    const relations = analyzeRelations(p);

    const animals: Record<string, string> = {
      "子": "🐀", "丑": "🐂", "寅": "🐅", "卯": "🐇", "辰": "🐉", "巳": "🐍",
      "午": "🐴", "未": "🐐", "申": "🐒", "酉": "🐔", "戌": "🐕", "亥": "🐷",
    };

    const id = randomUUID();
    const sajuData = {
      id,
      name,
      gender,
      birth: { year, month, day, hour, minute, city },
      pillars: {
        year: {
          stem: p.year.stem,
          branch: p.year.branch,
          korean: `${STEM_KOREAN[p.year.stem]}${BRANCH_KOREAN[p.year.branch]}`,
          animal: animals[p.year.branch] || "✦",
          element: ELEMENT_SPANISH[STEM_ELEMENT[p.year.stem]],
          branchElement: ELEMENT_SPANISH[BRANCH_ELEMENT[p.year.branch]],
        },
        month: {
          stem: p.month.stem,
          branch: p.month.branch,
          korean: `${STEM_KOREAN[p.month.stem]}${BRANCH_KOREAN[p.month.branch]}`,
          animal: animals[p.month.branch] || "✦",
          element: ELEMENT_SPANISH[STEM_ELEMENT[p.month.stem]],
          branchElement: ELEMENT_SPANISH[BRANCH_ELEMENT[p.month.branch]],
        },
        day: {
          stem: p.day.stem,
          branch: p.day.branch,
          korean: `${STEM_KOREAN[p.day.stem]}${BRANCH_KOREAN[p.day.branch]}`,
          animal: animals[p.day.branch] || "✦",
          element: ELEMENT_SPANISH[STEM_ELEMENT[p.day.stem]],
          branchElement: ELEMENT_SPANISH[BRANCH_ELEMENT[p.day.branch]],
        },
        hour: {
          stem: p.hour.stem,
          branch: p.hour.branch,
          korean: `${STEM_KOREAN[p.hour.stem]}${BRANCH_KOREAN[p.hour.branch]}`,
          animal: animals[p.hour.branch] || "✦",
          element: ELEMENT_SPANISH[STEM_ELEMENT[p.hour.stem]],
          branchElement: ELEMENT_SPANISH[BRANCH_ELEMENT[p.hour.branch]],
        },
      },
      fiveElements: saju.fiveElements,
      dayMaster: {
        stem: saju.dayMaster.stem,
        element: saju.dayMaster.element,
        elementSpanish: ELEMENT_SPANISH[saju.dayMaster.element],
        solLuna: saju.dayMaster.yinYang,
        korean: STEM_KOREAN[saju.dayMaster.stem],
      },
      tenGods: {
        entries: tenGods.entries.map(e => ({
          position: e.position,
          char: e.char,
          tenGod: e.tenGod,
          korean: TEN_GOD_KOREAN[e.tenGod],
          spanish: TEN_GOD_SPANISH[e.tenGod],
        })),
        percentages: tenGods.percentages,
      },
      twelvePhases: {
        year: { phase: phases.year, korean: PHASE_KOREAN[phases.year], spanish: PHASE_SPANISH[phases.year] },
        month: { phase: phases.month, korean: PHASE_KOREAN[phases.month], spanish: PHASE_SPANISH[phases.month] },
        day: { phase: phases.day, korean: PHASE_KOREAN[phases.day], spanish: PHASE_SPANISH[phases.day] },
        hour: { phase: phases.hour, korean: PHASE_KOREAN[phases.hour], spanish: PHASE_SPANISH[phases.hour] },
      },
      strength: {
        level: yongShin.strength.level,
        levelKorean: STRENGTH_KOREAN[yongShin.strength.level],
        levelSpanish: STRENGTH_SPANISH[yongShin.strength.level],
        score: yongShin.strength.score,
      },
      yongShin: {
        element: yongShin.yongShin,
        elementKorean: ELEMENT_KOREAN[yongShin.yongShin],
        elementSpanish: ELEMENT_SPANISH[yongShin.yongShin],
      },
      giShin: {
        element: yongShin.giShin,
        elementKorean: ELEMENT_KOREAN[yongShin.giShin],
      },
      majorFortunes: {
        direction: fortunes.direction,
        startAge: fortunes.startAge,
        fortunes: fortunes.fortunes.slice(0, 8).map(f => ({
          age: f.startAge,
          ganZhi: `${STEM_KOREAN[f.ganZhi.stem]}${BRANCH_KOREAN[f.ganZhi.branch]}(${f.ganZhi.stem}${f.ganZhi.branch})`,
          stemTenGod: TEN_GOD_KOREAN[f.stemTenGod],
          branchTenGod: TEN_GOD_KOREAN[f.branchTenGod],
          phase: PHASE_KOREAN[f.twelvePhase],
        })),
      },
      yearlyFortune: yearly[0] ? {
        year: yearly[0].year,
        age: yearly[0].age,
        ganZhi: `${STEM_KOREAN[yearly[0].ganZhi.stem]}${BRANCH_KOREAN[yearly[0].ganZhi.branch]}`,
        stemTenGod: TEN_GOD_KOREAN[yearly[0].stemTenGod],
        branchTenGod: TEN_GOD_KOREAN[yearly[0].branchTenGod],
        phase: PHASE_KOREAN[yearly[0].twelvePhase],
      } : null,
      relations: relations.relations.map(r => r.description),
      specialStars: specials.all,
      spiritStars: {
        year: SPIRIT_STAR_KOREAN[spirits.year],
        month: SPIRIT_STAR_KOREAN[spirits.month],
        day: SPIRIT_STAR_KOREAN[spirits.day],
        hour: SPIRIT_STAR_KOREAN[spirits.hour],
      },
      samjae: calculateSamjae(p.year.branch, currentYear),
      samjaeYears: getSamjaeYearsAround(p.year.branch, currentYear),
      unknownTime: !!unknownTime,
      createdAt: new Date().toISOString(),
    };

    await saveSaju(id, sajuData);
    return NextResponse.json({ id, success: true });
  } catch (err) {
    console.error("Saju calculation error:", err);
    return NextResponse.json({ error: "Error al calcular tu Saju" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

  const data = await getSaju(id);
  if (!data) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  return NextResponse.json(data);
}
