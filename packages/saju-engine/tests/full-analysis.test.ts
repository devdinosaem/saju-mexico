import { describe, it, expect } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN, STEM_ELEMENT, BRANCH_ELEMENT, ELEMENT_SPANISH, BRANCH_SPANISH, STEM_YINYANG } from 'manseryeok';
import {
  analyzeTenGods, TEN_GOD_KOREAN, TEN_GOD_HANJA,
  analyzeTwelvePhases, PHASE_KOREAN, PHASE_HANJA,
  analyzeSpiritStars, analyzeSpecialStars, SPIRIT_STAR_KOREAN,
} from '../src/index.js';
import type { GanZhi } from 'manseryeok';
import type { TenGod } from '../src/types.js';

function fullAnalysis(label: string, input: { year: number; month: number; day: number; hour: number; minute: number }) {
  const result = calculateSaju(input);
  const p = result.fourPillars;
  const tenGods = analyzeTenGods(p, result.dayMaster.stem);
  const phases = analyzeTwelvePhases(p, result.dayMaster.stem);
  const spirits = analyzeSpiritStars(p);
  const specials = analyzeSpecialStars(p, result.dayMaster.stem);
  const e = result.fiveElements;

  const bar = (n: number, max: number = 8) => {
    const filled = Math.round((n / max) * 10);
    return '█'.repeat(filled) + '░'.repeat(10 - filled);
  };

  const positions = [
    { label: '시주', key: 'hour' as const, stem: p.hour.stem, branch: p.hour.branch,궁위: '자녀운/말년운' },
    { label: '일주', key: 'day' as const, stem: p.day.stem, branch: p.day.branch, 궁위: '자아/배우자' },
    { label: '월주', key: 'month' as const, stem: p.month.stem, branch: p.month.branch, 궁위: '부모/사회' },
    { label: '년주', key: 'year' as const, stem: p.year.stem, branch: p.year.branch, 궁위: '조상/초년운' },
  ];

  console.log('');
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log(`║  ${label}`);
  console.log('╚═══════════════════════════════════════════════════════╝');
  console.log('');

  // ── 사주 원국 ──
  console.log('┌─────────────────────────────────────────────────────┐');
  console.log('│                    사주 원국 (四柱原局)                │');
  console.log('├──────────┬──────────┬──────────┬──────────┤');
  console.log('│   시주    │   일주    │   월주    │   년주    │');
  console.log('├──────────┼──────────┼──────────┼──────────┤');

  // 천간 행
  const stemLine = positions.map(pos => {
    const tg = tenGods.entries.find(e => e.position === `${pos.key}_stem`)!;
    const yy = STEM_YINYANG[pos.stem] === 'yang' ? '+' : '-';
    return `${pos.stem}(${STEM_KOREAN[pos.stem]})${yy}${STEM_ELEMENT[pos.stem].slice(0,3)}`;
  });
  console.log(`│ ${stemLine.map(s => s.padEnd(9)).join('│ ')}│`);

  // 천간 십신
  const stemTGLine = positions.map(pos => {
    const tg = tenGods.entries.find(e => e.position === `${pos.key}_stem`)!;
    return TEN_GOD_KOREAN[tg.tenGod];
  });
  console.log(`│ ${stemTGLine.map(s => s.padEnd(9)).join('│ ')}│`);

  console.log('├──────────┼──────────┼──────────┼──────────┤');

  // 지지 행
  const branchLine = positions.map(pos => {
    const yy = pos.branch === '子' || pos.branch === '寅' || pos.branch === '辰' || pos.branch === '午' || pos.branch === '申' || pos.branch === '戌' ? '+' : '-';
    return `${pos.branch}(${BRANCH_KOREAN[pos.branch]})${yy}`;
  });
  console.log(`│ ${branchLine.map(s => s.padEnd(9)).join('│ ')}│`);

  // 지지 십신
  const branchTGLine = positions.map(pos => {
    const tg = tenGods.entries.find(e => e.position === `${pos.key}_branch`)!;
    return TEN_GOD_KOREAN[tg.tenGod];
  });
  console.log(`│ ${branchTGLine.map(s => s.padEnd(9)).join('│ ')}│`);

  // 12운성
  const phaseLine = positions.map(pos => PHASE_KOREAN[phases[pos.key]]);
  console.log(`│ ${phaseLine.map(s => s.padEnd(9)).join('│ ')}│`);

  // 12신살
  const spiritLine = positions.map(pos => SPIRIT_STAR_KOREAN[spirits[pos.key]]);
  console.log(`│ ${spiritLine.map(s => s.padEnd(9)).join('│ ')}│`);

  console.log('└──────────┴──────────┴──────────┴──────────┘');
  console.log('');

  // ── 오행 분포 ──
  console.log('┌─────────────────────────────────────────────────────┐');
  console.log('│                    오행 분포 (五行)                   │');
  console.log('├─────────────────────────────────────────────────────┤');
  const total = 8;
  const elements: [string, string, number][] = [
    ['木', 'Madera', e.wood], ['火', 'Fuego', e.fire],
    ['土', 'Tierra', e.earth], ['金', 'Metal', e.metal], ['水', 'Agua', e.water],
  ];
  for (const [hanja, spanish, count] of elements) {
    const pct = ((count / total) * 100).toFixed(1);
    const status = count === 0 ? '부족' : count >= 3 ? '과다' : count >= 2 ? '발달' : '적정';
    console.log(`│  ${hanja} ${spanish.padEnd(7)} ${bar(count)} ${count}개 ${pct.padStart(5)}% ${status}`);
  }
  console.log('└─────────────────────────────────────────────────────┘');
  console.log('');

  // ── 십신 분포 ──
  console.log('┌─────────────────────────────────────────────────────┐');
  console.log('│                    십신 분포 (十神)                   │');
  console.log('├─────────────────────────────────────────────────────┤');
  const tenGodPairs: [TenGod, TenGod][] = [
    ['bijeon', 'geopjae'], ['siksin', 'sanggwan'],
    ['pyeonjae', 'jeongjae'], ['pyeongwan', 'jeonggwan'],
    ['pyeonin', 'jeongin'],
  ];
  for (const [a, b] of tenGodPairs) {
    const aCount = tenGods.count[a];
    const bCount = tenGods.count[b];
    const aPct = tenGods.percentages[a].toFixed(1);
    const bPct = tenGods.percentages[b].toFixed(1);
    const aStr = aCount > 0 ? `${TEN_GOD_KOREAN[a]}(${TEN_GOD_HANJA[a]}) ${aCount}개 ${aPct}%` : `${TEN_GOD_KOREAN[a]}(${TEN_GOD_HANJA[a]}) -`;
    const bStr = bCount > 0 ? `${TEN_GOD_KOREAN[b]}(${TEN_GOD_HANJA[b]}) ${bCount}개 ${bPct}%` : `${TEN_GOD_KOREAN[b]}(${TEN_GOD_HANJA[b]}) -`;
    console.log(`│  ${aStr.padEnd(25)} ${bStr}`);
  }
  console.log('└─────────────────────────────────────────────────────┘');
  console.log('');

  // ── 일간 (Day Master) ──
  console.log('┌─────────────────────────────────────────────────────┐');
  console.log('│                  일간 (Day Master)                   │');
  console.log('├─────────────────────────────────────────────────────┤');
  const dmNames: Record<string, string> = {
    '甲': 'El Gran Árbol (큰 나무)', '乙': 'El Bambú Flexible (대나무)',
    '丙': 'El Sol Brillante (태양)', '丁': 'La Llama Íntima (촛불)',
    '戊': 'La Gran Montaña (큰 산)', '己': 'La Tierra Fértil (옥토)',
    '庚': 'La Espada Afilada (칼)', '辛': 'La Joya Pulida (보석)',
    '壬': 'El Océano Profundo (바다)', '癸': 'La Lluvia Suave (비)',
  };
  console.log(`│  ${result.dayMaster.stem}(${STEM_KOREAN[result.dayMaster.stem]}) — ${dmNames[result.dayMaster.stem]}`);
  console.log(`│  오행: ${ELEMENT_SPANISH[result.dayMaster.element]}(${result.dayMaster.element})`);
  console.log(`│  음양: ${result.dayMaster.yinYang === 'yang' ? '양(陽, Yang)' : '음(陰, Yin)'}`);
  console.log(`│  띠:   ${BRANCH_SPANISH[p.year.branch]}(${BRANCH_KOREAN[p.year.branch]})`);
  console.log('└─────────────────────────────────────────────────────┘');
  console.log('');

  // ── 길성/흉성 ──
  console.log('┌─────────────────────────────────────────────────────┐');
  console.log('│                 신살과 길성 (神殺吉星)                 │');
  console.log('├─────────────────────────────────────────────────────┤');
  for (const pos of positions) {
    const stars = specials[pos.key];
    if (stars.length > 0) {
      console.log(`│  ${pos.label} ${pos.stem}${pos.branch}: ${stars.join(', ')}`);
    }
  }
  console.log('│');
  console.log(`│  전체: ${specials.all.join(', ')}`);
  console.log('└─────────────────────────────────────────────────────┘');
  // 지역시 보정 정보
  if (result.localTimeCorrection) {
    const c = result.localTimeCorrection;
    console.log('┌─────────────────────────────────────────────────────┐');
    console.log('│                 지역시 보정 (地域時)                  │');
    console.log('├─────────────────────────────────────────────────────┤');
    console.log(`│  도시: ${c.city || '직접 입력'} (경도 ${c.longitude}°)`);
    console.log(`│  보정: ${c.correctionMinutes > 0 ? '+' : ''}${c.correctionMinutes}분`);
    console.log(`│  표준시: ${c.originalTime} → 지역시: ${c.correctedTime}`);
    console.log('└─────────────────────────────────────────────────────┘');
    console.log('');
  }
}

describe('종합 분석 테스트', () => {
  it('1996-10-10 17:00 서울 (지역시 보정)', () => {
    fullAnalysis('1996년 10월 10일 17:00 (양력, 남, 서울) — 지역시 보정', {
      year: 1996, month: 10, day: 10, hour: 17, minute: 0, city: '서울특별시',
    });
  });

  it('1996-10-10 17:00 서울 — 시주 검증', () => {
    const result = calculateSaju({
      year: 1996, month: 10, day: 10, hour: 17, minute: 0, city: '서울',
    });
    // 지역시 보정 후 16:28 → 申시 → 甲申
    expect(result.fourPillars.hour.stem).toBe('甲');
    expect(result.fourPillars.hour.branch).toBe('申');
    expect(result.fourPillars.day.stem).toBe('庚');
    expect(result.fourPillars.day.branch).toBe('辰');
    expect(result.fourPillars.month.stem).toBe('戊');
    expect(result.fourPillars.month.branch).toBe('戌');
    expect(result.fourPillars.year.stem).toBe('丙');
    expect(result.fourPillars.year.branch).toBe('子');
    expect(result.localTimeCorrection).toBeDefined();
    expect(result.localTimeCorrection!.correctionMinutes).toBeLessThan(0);
  });

  it('스페인어로 도시 검색 — Ciudad de México', () => {
    const result = calculateSaju({
      year: 2000, month: 1, day: 1, hour: 12, minute: 0, city: 'Ciudad de México',
    });
    expect(result.localTimeCorrection).toBeDefined();
    expect(result.localTimeCorrection!.city).toBe('Ciudad de México');
  });

  it('스페인어 약칭으로 검색 — mexico, cdmx', () => {
    const r1 = calculateSaju({ year: 2000, month: 1, day: 1, hour: 12, minute: 0, city: 'mexico' });
    const r2 = calculateSaju({ year: 2000, month: 1, day: 1, hour: 12, minute: 0, city: 'cdmx' });
    expect(r1.localTimeCorrection!.city).toBe('Ciudad de México');
    expect(r2.localTimeCorrection!.city).toBe('Ciudad de México');
  });

  it('1990-06-19 12:00 (보정 없이, 검증 완료)', () => {
    fullAnalysis('1990년 6월 19일 12:00', {
      year: 1990, month: 6, day: 19, hour: 12, minute: 0,
    });
  });
});
