import { describe, it, expect } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN, STEM_ELEMENT, BRANCH_ELEMENT, ELEMENT_SPANISH, STEM_YINYANG, BRANCH_SPANISH } from 'manseryeok';
import {
  analyzeTenGods, TEN_GOD_KOREAN, TEN_GOD_HANJA,
  analyzeTwelvePhases, PHASE_KOREAN,
  analyzeSpiritStars, analyzeSpecialStars, SPIRIT_STAR_KOREAN,
} from '../src/index.js';

describe('1980-10-10 08:00 여자 Guadalajara', () => {
  const result = calculateSaju({
    year: 1980, month: 10, day: 10, hour: 8, minute: 0, city: 'Guadalajara',
  });

  it('4기둥 + 종합 출력', () => {
    const p = result.fourPillars;
    const tenGods = analyzeTenGods(p, result.dayMaster.stem);
    const phases = analyzeTwelvePhases(p, result.dayMaster.stem);
    const spirits = analyzeSpiritStars(p);
    const specials = analyzeSpecialStars(p, result.dayMaster.stem);
    const e = result.fiveElements;
    const c = result.localTimeCorrection!;

    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║  1980/10/10 08:00 여자 Guadalajara                       ║');
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log('');
    console.log(`  지역시 보정: ${c.city} (${c.longitude}°E, UTC${c.utcOffset})`);
    console.log(`  보정: ${c.correctionMinutes}분 | ${c.originalTime} → ${c.correctedTime}`);
    console.log('');

    const positions = [
      { label: '시주', key: 'hour' as const, stem: p.hour.stem, branch: p.hour.branch },
      { label: '일주', key: 'day' as const, stem: p.day.stem, branch: p.day.branch },
      { label: '월주', key: 'month' as const, stem: p.month.stem, branch: p.month.branch },
      { label: '년주', key: 'year' as const, stem: p.year.stem, branch: p.year.branch },
    ];

    console.log('  ┌──────────┬──────────┬──────────┬──────────┐');
    console.log('  │   시주    │   일주    │   월주    │   년주    │');
    console.log('  ├──────────┼──────────┼──────────┼──────────┤');

    for (const pos of positions) {
      const stemTG = tenGods.entries.find(e => e.position === `${pos.key}_stem`)!;
      const branchTG = tenGods.entries.find(e => e.position === `${pos.key}_branch`)!;
    }

    // 천간
    console.log('  │ ' + positions.map(x =>
      `${x.stem}(${STEM_KOREAN[x.stem]})`.padEnd(9)
    ).join('│ ') + '│');

    // 천간 십신
    console.log('  │ ' + positions.map(x => {
      const tg = tenGods.entries.find(e => e.position === `${x.key}_stem`)!;
      return TEN_GOD_KOREAN[tg.tenGod].padEnd(9);
    }).join('│ ') + '│');

    console.log('  ├──────────┼──────────┼──────────┼──────────┤');

    // 지지
    console.log('  │ ' + positions.map(x =>
      `${x.branch}(${BRANCH_KOREAN[x.branch]})`.padEnd(9)
    ).join('│ ') + '│');

    // 지지 십신
    console.log('  │ ' + positions.map(x => {
      const tg = tenGods.entries.find(e => e.position === `${x.key}_branch`)!;
      return TEN_GOD_KOREAN[tg.tenGod].padEnd(9);
    }).join('│ ') + '│');

    // 12운성
    console.log('  │ ' + positions.map(x =>
      PHASE_KOREAN[phases[x.key]].padEnd(9)
    ).join('│ ') + '│');

    // 12신살
    console.log('  │ ' + positions.map(x =>
      SPIRIT_STAR_KOREAN[spirits[x.key]].padEnd(9)
    ).join('│ ') + '│');

    console.log('  └──────────┴──────────┴──────────┴──────────┘');
    console.log('');

    // 오행
    const bar = (n: number) => '█'.repeat(n) + '░'.repeat(4 - Math.min(n, 4));
    const status = (n: number) => n === 0 ? '부족' : n >= 3 ? '과다' : n >= 2 ? '발달' : '적정';
    console.log('  ── 오행 분포 ──');
    console.log(`  木 Madera  ${bar(e.wood)} ${e.wood}개 ${(e.wood/8*100).toFixed(1)}% ${status(e.wood)}`);
    console.log(`  火 Fuego   ${bar(e.fire)} ${e.fire}개 ${(e.fire/8*100).toFixed(1)}% ${status(e.fire)}`);
    console.log(`  土 Tierra  ${bar(e.earth)} ${e.earth}개 ${(e.earth/8*100).toFixed(1)}% ${status(e.earth)}`);
    console.log(`  金 Metal   ${bar(e.metal)} ${e.metal}개 ${(e.metal/8*100).toFixed(1)}% ${status(e.metal)}`);
    console.log(`  水 Agua    ${bar(e.water)} ${e.water}개 ${(e.water/8*100).toFixed(1)}% ${status(e.water)}`);
    console.log('');

    // 십신
    console.log('  ── 십신 분포 ──');
    const tgKeys = Object.entries(tenGods.count).filter(([,v]) => v > 0);
    for (const [key, val] of tgKeys) {
      console.log(`  ${TEN_GOD_KOREAN[key as keyof typeof TEN_GOD_KOREAN]}(${TEN_GOD_HANJA[key as keyof typeof TEN_GOD_HANJA]}) ${val}개 ${(val as number / 8 * 100).toFixed(1)}%`);
    }
    console.log('');

    // 일간
    const dmNames: Record<string, string> = {
      '甲': 'El Gran Árbol (큰 나무)', '乙': 'El Bambú (대나무)',
      '丙': 'El Sol (태양)', '丁': 'La Llama (촛불)',
      '戊': 'La Montaña (큰 산)', '己': 'La Tierra Fértil (옥토)',
      '庚': 'La Espada (칼)', '辛': 'La Joya (보석)',
      '壬': 'El Océano (바다)', '癸': 'La Lluvia (비)',
    };
    console.log('  ── 일간 (Day Master) ──');
    console.log(`  ${result.dayMaster.stem}(${STEM_KOREAN[result.dayMaster.stem]}) — ${dmNames[result.dayMaster.stem]}`);
    console.log(`  오행: ${ELEMENT_SPANISH[result.dayMaster.element]} | 음양: ${result.dayMaster.yinYang === 'yang' ? '양(陽)' : '음(陰)'} | 띠: ${BRANCH_SPANISH[p.year.branch]}(${BRANCH_KOREAN[p.year.branch]})`);
    console.log('');

    // 신살
    console.log('  ── 신살/길성 ──');
    for (const pos of positions) {
      const stars = specials[pos.key];
      if (stars.length > 0) console.log(`  ${pos.label} ${pos.stem}${pos.branch}: ${stars.join(', ')}`);
    }
    console.log(`  전체: ${specials.all.join(', ')}`);
    console.log('');

    // 기본 assertion
    expect(result.localTimeCorrection).toBeDefined();
    expect(result.localTimeCorrection!.city).toBe('Guadalajara');
  });
});
