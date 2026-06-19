import { describe, it, expect } from 'vitest';
import { calculateSaju, dayPillar, yearPillar, hourPillar, toJulianDay } from '../src/pillars.js';
import { STEM_KOREAN, BRANCH_KOREAN } from '../src/constants.js';
import type { GanZhi } from '../src/types.js';

function formatGanZhi(gz: GanZhi): string {
  return `${STEM_KOREAN[gz.stem]}${BRANCH_KOREAN[gz.branch]}(${gz.stem}${gz.branch})`;
}

describe('율리우스일 계산', () => {
  it('2000-01-01 JD', () => {
    const jd = toJulianDay(2000, 1, 1);
    expect(jd).toBeCloseTo(2451544.5, 0);
  });

  it('1900-01-01 JD', () => {
    const jd = toJulianDay(1900, 1, 1);
    expect(jd).toBeCloseTo(2415020.5, 0);
  });
});

describe('일주 계산', () => {
  // 검증 데이터: 인터넷 만세력 기준
  it('1900-01-01 = 甲戌', () => {
    const dp = dayPillar(1900, 1, 1);
    expect(dp.stem).toBe('甲');
    expect(dp.branch).toBe('戌');
  });

  it('1991-09-11 = 甲申 (사용자 검증)', () => {
    const dp = dayPillar(1991, 9, 11);
    expect(dp.stem).toBe('甲');
    expect(dp.branch).toBe('申');
  });
});

describe('년주 계산', () => {
  it('1990년 (입춘 이후) = 庚午', () => {
    const yp = yearPillar(1990, 5, 15, 14, 0);
    expect(yp.stem).toBe('庚');
    expect(yp.branch).toBe('午');
  });

  it('2024년 (입춘 이후) = 甲辰', () => {
    const yp = yearPillar(2024, 7, 1, 12, 0);
    expect(yp.stem).toBe('甲');
    expect(yp.branch).toBe('辰');
  });

  it('입춘 이전 출생 → 전년도 간지', () => {
    // 2024-01-15는 입춘(2024-02-04) 이전 → 2023년 = 癸卯
    const yp = yearPillar(2024, 1, 15, 12, 0);
    expect(yp.stem).toBe('癸');
    expect(yp.branch).toBe('卯');
  });
});

describe('시주 계산', () => {
  it('자시 (23:00~01:00)', () => {
    const hp = hourPillar('甲', 23);
    expect(hp.branch).toBe('子');
    expect(hp.stem).toBe('甲'); // 甲일간 자시 = 甲子
  });

  it('오시 (11:00~13:00)', () => {
    const hp = hourPillar('甲', 12);
    expect(hp.branch).toBe('午');
  });
});

describe('사주 전체 계산', () => {
  it('2026-06-20 12:00 사주 계산', () => {
    const result = calculateSaju({
      year: 2026, month: 6, day: 20, hour: 12, minute: 0,
    });

    expect(result.fourPillars.year).toBeDefined();
    expect(result.fourPillars.month).toBeDefined();
    expect(result.fourPillars.day).toBeDefined();
    expect(result.fourPillars.hour).toBeDefined();

    // 년주: 2026년 = 丙午
    expect(result.fourPillars.year.stem).toBe('丙');
    expect(result.fourPillars.year.branch).toBe('午');

    // 오행 분포 총합 = 8
    const total = Object.values(result.fiveElements).reduce((a, b) => a + b, 0);
    expect(total).toBe(8);

    console.log('=== 2026-06-20 12:00 사주 ===');
    console.log(`년주: ${formatGanZhi(result.fourPillars.year)}`);
    console.log(`월주: ${formatGanZhi(result.fourPillars.month)}`);
    console.log(`일주: ${formatGanZhi(result.fourPillars.day)}`);
    console.log(`시주: ${formatGanZhi(result.fourPillars.hour)}`);
    console.log(`오행: 木${result.fiveElements.wood} 火${result.fiveElements.fire} 土${result.fiveElements.earth} 金${result.fiveElements.metal} 水${result.fiveElements.water}`);
    console.log(`일간: ${STEM_KOREAN[result.dayMaster.stem]}(${result.dayMaster.element}, ${result.dayMaster.yinYang})`);
  });

  it('오행 분포 합계는 항상 8', () => {
    const cases = [
      { year: 1990, month: 5, day: 15, hour: 14, minute: 30 },
      { year: 2000, month: 1, day: 1, hour: 0, minute: 0 },
      { year: 1985, month: 12, day: 25, hour: 8, minute: 0 },
    ];

    for (const input of cases) {
      const result = calculateSaju(input);
      const total = Object.values(result.fiveElements).reduce((a, b) => a + b, 0);
      expect(total).toBe(8);
    }
  });
});
