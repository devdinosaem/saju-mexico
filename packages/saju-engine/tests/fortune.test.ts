import { describe, it, expect } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from 'manseryeok';
import {
  calculateMajorFortunes, calculateYearlyFortunes, calculateMonthlyFortunes,
  TEN_GOD_KOREAN, PHASE_KOREAN,
} from '../src/index.js';
import type { MajorFortuneResult } from '../src/fortune.js';

function printFortunes(label: string, result: MajorFortuneResult) {
  console.log(`\n  ── ${label} 대운 (${result.direction === 'forward' ? '순행' : '역행'}, ${result.startAge}세 시작) ──`);
  console.log('  ' + result.fortunes.map(f =>
    `${f.startAge}세`
  ).join('    '));
  console.log('  ' + result.fortunes.map(f =>
    TEN_GOD_KOREAN[f.stemTenGod].padEnd(4)
  ).join('  '));
  console.log('  ' + result.fortunes.map(f =>
    `${STEM_KOREAN[f.ganZhi.stem]}(${f.ganZhi.stem})`
  ).join('  '));
  console.log('  ' + result.fortunes.map(f =>
    TEN_GOD_KOREAN[f.branchTenGod].padEnd(4)
  ).join('  '));
  console.log('  ' + result.fortunes.map(f =>
    `${BRANCH_KOREAN[f.ganZhi.branch]}(${f.ganZhi.branch})`
  ).join('  '));
  console.log('  ' + result.fortunes.map(f =>
    PHASE_KOREAN[f.twelvePhase].padEnd(4)
  ).join('  '));
}

describe('대운 — 1996-10-10 남자 서울 (순행, 9세 시작)', () => {
  const saju = calculateSaju({ year: 1996, month: 10, day: 10, hour: 17, minute: 0, city: '서울' });
  const fortunes = calculateMajorFortunes(
    saju.fourPillars.month, saju.fourPillars.year.stem, 'male',
    1996, 10, 10, saju.dayMaster.stem,
  );

  it('순행', () => {
    expect(fortunes.direction).toBe('forward');
  });

  it('시작 나이 9세', () => {
    expect(fortunes.startAge).toBe(9);
  });

  it('첫 대운 = 己亥', () => {
    expect(fortunes.fortunes[0].ganZhi.stem).toBe('己');
    expect(fortunes.fortunes[0].ganZhi.branch).toBe('亥');
  });

  it('2번째 대운 = 庚子 (19세)', () => {
    expect(fortunes.fortunes[1].ganZhi.stem).toBe('庚');
    expect(fortunes.fortunes[1].ganZhi.branch).toBe('子');
    expect(fortunes.fortunes[1].startAge).toBe(19);
  });

  it('3번째 대운 = 辛丑 (29세)', () => {
    expect(fortunes.fortunes[2].ganZhi.stem).toBe('辛');
    expect(fortunes.fortunes[2].ganZhi.branch).toBe('丑');
  });

  it('십신 정답 검증', () => {
    // 己 = 정인 (일간 庚 기준: 토생금, 나를 생하는 다른 음양)
    expect(TEN_GOD_KOREAN[fortunes.fortunes[0].stemTenGod]).toBe('정인');
    // 庚 = 비견
    expect(TEN_GOD_KOREAN[fortunes.fortunes[1].stemTenGod]).toBe('비견');
    // 辛 = 겁재
    expect(TEN_GOD_KOREAN[fortunes.fortunes[2].stemTenGod]).toBe('겁재');
  });

  it('전체 출력', () => {
    printFortunes('1996 남 서울', fortunes);
  });
});

describe('대운 — 1980-10-10 여자 과달라하라 (역행, 1세 시작)', () => {
  const saju = calculateSaju({ year: 1980, month: 10, day: 10, hour: 8, minute: 0, city: 'Guadalajara' });
  const fortunes = calculateMajorFortunes(
    saju.fourPillars.month, saju.fourPillars.year.stem, 'female',
    1980, 10, 10, saju.dayMaster.stem,
  );

  it('역행', () => {
    expect(fortunes.direction).toBe('backward');
  });

  it('시작 나이 1세', () => {
    expect(fortunes.startAge).toBe(1);
  });

  it('첫 대운 = 乙酉', () => {
    expect(fortunes.fortunes[0].ganZhi.stem).toBe('乙');
    expect(fortunes.fortunes[0].ganZhi.branch).toBe('酉');
  });

  it('2번째 대운 = 甲申 (11세)', () => {
    expect(fortunes.fortunes[1].ganZhi.stem).toBe('甲');
    expect(fortunes.fortunes[1].ganZhi.branch).toBe('申');
    expect(fortunes.fortunes[1].startAge).toBe(11);
  });

  it('3번째 대운 = 癸未 (21세)', () => {
    expect(fortunes.fortunes[2].ganZhi.stem).toBe('癸');
    expect(fortunes.fortunes[2].ganZhi.branch).toBe('未');
  });

  it('십신 정답 검증', () => {
    // 乙 = 정인 (일간 丙 기준: 목생화, 나를 생하는 다른 음양)
    expect(TEN_GOD_KOREAN[fortunes.fortunes[0].stemTenGod]).toBe('정인');
    // 甲 = 편인
    expect(TEN_GOD_KOREAN[fortunes.fortunes[1].stemTenGod]).toBe('편인');
    // 癸 = 정관
    expect(TEN_GOD_KOREAN[fortunes.fortunes[2].stemTenGod]).toBe('정관');
  });

  it('전체 출력', () => {
    printFortunes('1980 여 과달라하라', fortunes);
  });
});

describe('세운 — 1996 남자, 2004~2013', () => {
  const saju = calculateSaju({ year: 1996, month: 10, day: 10, hour: 17, minute: 0, city: '서울' });
  const yearly = calculateYearlyFortunes(1996, saju.dayMaster.stem, 2004, 2013);

  it('2004년 = 甲申', () => {
    expect(yearly[0].ganZhi.stem).toBe('甲');
    expect(yearly[0].ganZhi.branch).toBe('申');
  });

  it('2004년 십신 = 편재', () => {
    expect(TEN_GOD_KOREAN[yearly[0].stemTenGod]).toBe('편재');
  });

  it('10년 분량', () => {
    expect(yearly.length).toBe(10);
  });

  it('전체 출력', () => {
    console.log('\n  ── 세운 2004~2013 ──');
    for (const y of yearly) {
      console.log(`  ${y.year}(${y.age}세) ${STEM_KOREAN[y.ganZhi.stem]}${BRANCH_KOREAN[y.ganZhi.branch]} ${TEN_GOD_KOREAN[y.stemTenGod]}/${TEN_GOD_KOREAN[y.branchTenGod]} ${PHASE_KOREAN[y.twelvePhase]}`);
    }
  });
});

describe('월운 — 2026년, 일간 庚', () => {
  const monthly = calculateMonthlyFortunes(2026, '庚');

  it('12개월', () => {
    expect(monthly.length).toBe(12);
  });

  it('2월(인월) 천간 = 庚', () => {
    // 2026 병오년 → MONTH_STEM_START['丙'] = '庚' → 인월 천간 = 庚
    expect(monthly[0].ganZhi.stem).toBe('庚');
    expect(monthly[0].month).toBe(2);
  });

  it('전체 출력', () => {
    console.log('\n  ── 2026년 월운 (일간 庚) ──');
    for (const m of monthly) {
      console.log(`  ${String(m.month).padStart(2)}월 ${STEM_KOREAN[m.ganZhi.stem]}${BRANCH_KOREAN[m.ganZhi.branch]} ${TEN_GOD_KOREAN[m.stemTenGod]}/${TEN_GOD_KOREAN[m.branchTenGod]} ${PHASE_KOREAN[m.twelvePhase]}`);
    }
  });
});
