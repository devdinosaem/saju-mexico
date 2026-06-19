import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN, STEM_ELEMENT, BRANCH_ELEMENT, ELEMENT_SPANISH, BRANCH_SPANISH, STEM_YINYANG, HIDDEN_STEMS, BRANCH_MAIN_STEM } from 'manseryeok';
import {
  analyzeTenGods, TEN_GOD_KOREAN, TEN_GOD_HANJA, TEN_GOD_SPANISH,
  analyzeTwelvePhases, PHASE_KOREAN, PHASE_SPANISH,
  analyzeSpiritStars, analyzeSpecialStars, SPIRIT_STAR_KOREAN,
  calculateMajorFortunes, calculateYearlyFortunes, calculateMonthlyFortunes,
  analyzeYongShin, STRENGTH_KOREAN, STRENGTH_SPANISH, ELEMENT_KOREAN,
  analyzeRelations,
} from '../src/index.js';

describe('샘플 리포트 데이터 — 1991-09-11 12:50 남자 서울', () => {
  it('Claude API에 전달할 JSON + 리포트 초안', () => {
    const saju = calculateSaju({ year: 1991, month: 9, day: 11, hour: 12, minute: 50, city: '서울' });
    const p = saju.fourPillars;
    const tenGods = analyzeTenGods(p, saju.dayMaster.stem);
    const phases = analyzeTwelvePhases(p, saju.dayMaster.stem);
    const spirits = analyzeSpiritStars(p);
    const specials = analyzeSpecialStars(p, saju.dayMaster.stem);
    const fortunes = calculateMajorFortunes(p.month, p.year.stem, 'male', 1991, 9, 11, saju.dayMaster.stem);
    const yearly = calculateYearlyFortunes(1991, saju.dayMaster.stem, 2024, 2026);
    const monthly = calculateMonthlyFortunes(2026, saju.dayMaster.stem);
    const yongShin = analyzeYongShin(saju.dayMaster.stem, p, saju.fiveElements, tenGods.count);
    const relations = analyzeRelations(p);

    // ── Claude API 입력 JSON ──
    const apiInput = {
      user_name: "회원",
      gender: "male",
      birth: { date: "1991-09-11", time: "12:50", city: "서울", timezone: "Asia/Seoul" },
      four_pillars: {
        year: { stem: p.year.stem, branch: p.year.branch, korean: `${STEM_KOREAN[p.year.stem]}${BRANCH_KOREAN[p.year.branch]}` },
        month: { stem: p.month.stem, branch: p.month.branch, korean: `${STEM_KOREAN[p.month.stem]}${BRANCH_KOREAN[p.month.branch]}` },
        day: { stem: p.day.stem, branch: p.day.branch, korean: `${STEM_KOREAN[p.day.stem]}${BRANCH_KOREAN[p.day.branch]}` },
        hour: { stem: p.hour.stem, branch: p.hour.branch, korean: `${STEM_KOREAN[p.hour.stem]}${BRANCH_KOREAN[p.hour.branch]}` },
      },
      five_elements: saju.fiveElements,
      day_master: {
        stem: saju.dayMaster.stem,
        element: saju.dayMaster.element,
        element_spanish: ELEMENT_SPANISH[saju.dayMaster.element],
        yin_yang: saju.dayMaster.yinYang,
        korean: STEM_KOREAN[saju.dayMaster.stem],
      },
      ten_gods: {
        entries: tenGods.entries.map(e => ({
          position: e.position,
          char: e.char,
          tenGod: e.tenGod,
          korean: TEN_GOD_KOREAN[e.tenGod],
          spanish: TEN_GOD_SPANISH[e.tenGod],
        })),
        percentages: tenGods.percentages,
      },
      twelve_phases: {
        year: { phase: phases.year, korean: PHASE_KOREAN[phases.year], spanish: PHASE_SPANISH[phases.year] },
        month: { phase: phases.month, korean: PHASE_KOREAN[phases.month], spanish: PHASE_SPANISH[phases.month] },
        day: { phase: phases.day, korean: PHASE_KOREAN[phases.day], spanish: PHASE_SPANISH[phases.day] },
        hour: { phase: phases.hour, korean: PHASE_KOREAN[phases.hour], spanish: PHASE_SPANISH[phases.hour] },
      },
      spirit_stars: {
        year: SPIRIT_STAR_KOREAN[spirits.year],
        month: SPIRIT_STAR_KOREAN[spirits.month],
        day: SPIRIT_STAR_KOREAN[spirits.day],
        hour: SPIRIT_STAR_KOREAN[spirits.hour],
      },
      special_stars: specials.all,
      strength: {
        level: yongShin.strength.level,
        level_korean: STRENGTH_KOREAN[yongShin.strength.level],
        level_spanish: STRENGTH_SPANISH[yongShin.strength.level],
        score: yongShin.strength.score,
        deukryeong: yongShin.strength.deukryeong,
        friend_count: yongShin.strength.friendCount,
        foe_count: yongShin.strength.foeCount,
      },
      yong_shin: {
        element: yongShin.yongShin,
        element_korean: ELEMENT_KOREAN[yongShin.yongShin],
        element_spanish: ELEMENT_SPANISH[yongShin.yongShin],
        category: yongShin.yongShinCategory,
      },
      gi_shin: {
        element: yongShin.giShin,
        element_korean: ELEMENT_KOREAN[yongShin.giShin],
      },
      major_fortunes: {
        direction: fortunes.direction,
        start_age: fortunes.startAge,
        fortunes: fortunes.fortunes.map(f => ({
          age: f.startAge,
          ganZhi: `${STEM_KOREAN[f.ganZhi.stem]}${BRANCH_KOREAN[f.ganZhi.branch]}(${f.ganZhi.stem}${f.ganZhi.branch})`,
          stemTenGod: TEN_GOD_KOREAN[f.stemTenGod],
          branchTenGod: TEN_GOD_KOREAN[f.branchTenGod],
          phase: PHASE_KOREAN[f.twelvePhase],
        })),
      },
      yearly_fortune_2026: yearly.find(y => y.year === 2026),
      relations: relations.relations.map(r => r.description),
      local_time_correction: saju.localTimeCorrection,
    };

    console.log('\n');
    console.log('━'.repeat(60));
    console.log('  CLAUDE API 입력 데이터 (JSON)');
    console.log('━'.repeat(60));
    console.log(JSON.stringify(apiInput, null, 2));

    // ── 스페인어 리포트 초안 ──
    const dm = saju.dayMaster;
    const e = saju.fiveElements;
    const ys = yongShin;

    console.log('\n');
    console.log('━'.repeat(60));
    console.log('  예시 리포트 (스페인어 초안)');
    console.log('━'.repeat(60));

    console.log(`
╔══════════════════════════════════════════════════════════╗
║                    TU CARTA SAJU (사주)                   ║
║              11 de septiembre de 1991, 12:50              ║
╚══════════════════════════════════════════════════════════╝

         Hora        Día         Mes         Año
  天干   庚(경)       甲(갑)       丁(정)       辛(신)
         Metal+      Madera+     Fuego-      Metal-
         편관         비견         상관         정관
  ──────────────────────────────────────────────────
  地支   午(오)       申(신)       酉(유)       未(미)
         Fuego       Metal       Metal       Tierra
         상관         편관         정관         정재
         ${PHASE_KOREAN[phases.hour]}         ${PHASE_KOREAN[phases.day]}         ${PHASE_KOREAN[phases.month]}         ${PHASE_KOREAN[phases.year]}

  띠: ${BRANCH_SPANISH[p.year.branch]} (${BRANCH_KOREAN[p.year.branch]})
  지역시 보정: ${saju.localTimeCorrection?.correctionMinutes}분 (${saju.localTimeCorrection?.originalTime} → ${saju.localTimeCorrection?.correctedTime})

═══════════════════════════════════════════════════════════

CAPÍTULO 1 — TU ESENCIA (너의 본질)

Tu Pilar del Día: 甲木 — El Gran Árbol (큰 나무)

Eres como un gran árbol que crece hacia el cielo con determinación
inquebrantable. La energía de Madera Yang (甲木) te otorga una
naturaleza de líder nato: recto, ambicioso y siempre creciendo.

Como el árbol que busca la luz sin importar los obstáculos, tú
también tienes una dirección clara en la vida. Tu honestidad es
tu mayor virtud — no sabes mentir, y eso te hace ganar la
confianza de quienes te rodean.

Sin embargo, como el árbol que no se dobla, a veces tu rigidez
puede ser tu talón de Aquiles. Aprender a ser flexible como el
bambú, sin perder tu esencia de gran árbol, es tu mayor desafío.

═══════════════════════════════════════════════════════════

DISTRIBUCIÓN DE LOS CINCO ELEMENTOS (오행 분포)

  木 Madera  █░░░░░░░░░  1  (12.5%)  — Tu esencia, pero escasa
  火 Fuego   ██░░░░░░░░  2  (25.0%)  — Tu expresión creativa
  土 Tierra  █░░░░░░░░░  1  (12.5%)  — Tus recursos
  金 Metal   ████░░░░░░  4  (50.0%)  — ¡DOMINANTE! Tu presión
  水 Agua    ░░░░░░░░░░  0  ( 0.0%)  — ¡AUSENTE!

⚠️ Metal domina tu carta con 4 de 8 posiciones (50%).
   Esto significa una enorme presión sobre ti (Metal corta Madera).
   Eres como un árbol rodeado de hachas — pero eso te ha hecho
   increíblemente fuerte y resiliente.

⚠️ Agua está completamente ausente.
   El Agua nutre la Madera. Sin ella, necesitas buscar fuentes
   externas de nutrición: conocimiento, mentores, espiritualidad.

═══════════════════════════════════════════════════════════

TU FUERZA INTERIOR (신강/신약)

Nivel: ${STRENGTH_SPANISH[ys.strength.level]} (${STRENGTH_KOREAN[ys.strength.level]})
Puntuación: ${ys.strength.score.toFixed(1)}

Aliados (비겁+인성): ${ys.strength.friendCount} de 8
Desafíos (식상+재성+관성): ${ys.strength.foeCount} de 8

Tu árbol está rodeado de mucho Metal (관성, presión/autoridad)
y casi sin Agua (인성, nutrición). Esto te convierte en alguien
que ha tenido que fortalecerse a sí mismo desde temprana edad.

═══════════════════════════════════════════════════════════

TU ELEMENTO DE PODER — 용신 (用神)

🌊 AGUA (水, Agua) — Tu elemento salvador

El Agua es lo que más necesitas en tu vida. Como un árbol
sediento, el Agua te nutre, te da sabiduría y suaviza la
presión del Metal que te rodea.

  🎨 Colores de suerte: Azul, Negro
  🧭 Dirección: Norte
  🔢 Números: 1, 6
  💧 Actividades: Natación, meditación, viajes al mar
  🍽️ Alimentos: Mariscos, algas, sopa de miso
  ⏰ Mejores horas: 21:00-23:00 (hora del Agua)

Evita el exceso de Metal (Blanco, Oeste) — ya tienes demasiado.

═══════════════════════════════════════════════════════════

CAPÍTULO 2 — LAS GRANDES ESTACIONES DE TU VIDA (대운)

Dirección: ${fortunes.direction === 'forward' ? 'Progresiva (순행)' : 'Regresiva (역행)'}
Inicio: ${fortunes.startAge} años

`);

    for (const f of fortunes.fortunes.slice(0, 8)) {
      const age = f.startAge;
      const endAge = f.startAge + 9;
      const year = 1991 + age;
      const stem = STEM_KOREAN[f.ganZhi.stem];
      const branch = BRANCH_KOREAN[f.ganZhi.branch];
      const tgS = TEN_GOD_KOREAN[f.stemTenGod];
      const tgB = TEN_GOD_KOREAN[f.branchTenGod];
      const ph = PHASE_KOREAN[f.twelvePhase];

      let desc = '';
      if (age <= 10) desc = '→ Formación y primeras experiencias';
      else if (age <= 20) desc = '→ Adolescencia y autodescubrimiento';
      else if (age <= 30) desc = '→ Establecimiento profesional';
      else if (age <= 40) desc = '→ Madurez y consolidación';
      else if (age <= 50) desc = '→ Cosecha y liderazgo';
      else if (age <= 60) desc = '→ Sabiduría y transformación';
      else if (age <= 70) desc = '→ Legado y nuevos comienzos';
      else desc = '→ Paz y plenitud';

      console.log(`  ${age}-${endAge} años (${year}-${year+9})`);
      console.log(`  ${stem}${branch}(${f.ganZhi.stem}${f.ganZhi.branch}) | ${tgS}/${tgB} | ${ph}`);
      console.log(`  ${desc}`);
      console.log('');
    }

    console.log(`
═══════════════════════════════════════════════════════════

TU AÑO 2026 (세운)

`);

    const y2026 = yearly.find(y => y.year === 2026)!;
    console.log(`  2026 (${y2026.age}세) — ${STEM_KOREAN[y2026.ganZhi.stem]}${BRANCH_KOREAN[y2026.ganZhi.branch]}(${y2026.ganZhi.stem}${y2026.ganZhi.branch})`);
    console.log(`  Energía del año: ${TEN_GOD_KOREAN[y2026.stemTenGod]}/${TEN_GOD_KOREAN[y2026.branchTenGod]}`);
    console.log(`  Fase: ${PHASE_KOREAN[y2026.twelvePhase]}`);

    console.log(`\n  ── Mes a mes ──`);
    const monthNames = ['', '', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene'];
    for (const m of monthly) {
      const stars = m.twelvePhase === 'geonrok' || m.twelvePhase === 'jewang' ? '⭐⭐⭐' :
                    m.twelvePhase === 'jangsaeng' || m.twelvePhase === 'gwandae' ? '⭐⭐' :
                    m.twelvePhase === 'sa' || m.twelvePhase === 'jeol' ? '⚠️' : '⭐';
      console.log(`  ${monthNames[m.month].padEnd(3)} ${stars} ${STEM_KOREAN[m.ganZhi.stem]}${BRANCH_KOREAN[m.ganZhi.branch]} ${TEN_GOD_KOREAN[m.stemTenGod]} ${PHASE_KOREAN[m.twelvePhase]}`);
    }

    console.log(`

═══════════════════════════════════════════════════════════

RELACIONES EN TU CARTA (합충형파해)

`);
    for (const r of relations.relations) {
      const icon = r.type === '충' || r.type === '천간충' ? '⚡' :
                   r.type === '형' ? '🔥' :
                   r.type.includes('합') ? '💫' : '⚠️';
      console.log(`  ${icon} ${r.description} (${r.positions.join(' ↔ ')})`);
    }

    console.log(`

═══════════════════════════════════════════════════════════

ESTRELLAS ESPECIALES (신살/길성)

  ${specials.all.join(', ')}

═══════════════════════════════════════════════════════════

  "Recuerda: tu Saju no es una prisión, es un mapa.
   El destino te dio las cartas — tú decides cómo jugarlas."

                              — Maestro Kim (마에스트로 김)

═══════════════════════════════════════════════════════════
`);
  });
});
