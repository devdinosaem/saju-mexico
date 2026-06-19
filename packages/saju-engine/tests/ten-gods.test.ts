import { describe, it, expect } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from 'manseryeok';
import { analyzeTenGods, TEN_GOD_KOREAN, TEN_GOD_HANJA } from '../src/index.js';

describe('십신 판정 — 1990-06-19 12:00 (정답 검증)', () => {
  const result = calculateSaju({ year: 1990, month: 6, day: 19, hour: 12, minute: 0 });
  const tenGods = analyzeTenGods(result.fourPillars, result.dayMaster.stem);

  it('일간 = 乙木 (을목)', () => {
    expect(result.dayMaster.stem).toBe('乙');
    expect(result.dayMaster.element).toBe('wood');
  });

  it('년간 庚 = 정관', () => {
    const entry = tenGods.entries.find(e => e.position === 'year_stem')!;
    expect(entry.char).toBe('庚');
    expect(entry.tenGod).toBe('jeonggwan');
  });

  it('년지 午 = 식신', () => {
    const entry = tenGods.entries.find(e => e.position === 'year_branch')!;
    expect(entry.char).toBe('午');
    expect(entry.tenGod).toBe('siksin');
  });

  it('월간 壬 = 정인', () => {
    const entry = tenGods.entries.find(e => e.position === 'month_stem')!;
    expect(entry.char).toBe('壬');
    expect(entry.tenGod).toBe('jeongin');
  });

  it('월지 午 = 식신', () => {
    const entry = tenGods.entries.find(e => e.position === 'month_branch')!;
    expect(entry.tenGod).toBe('siksin');
  });

  it('일간 乙 = 비견 (자기 자신)', () => {
    const entry = tenGods.entries.find(e => e.position === 'day_stem')!;
    expect(entry.char).toBe('乙');
    expect(entry.tenGod).toBe('bijeon');
  });

  it('일지 卯 = 비견', () => {
    const entry = tenGods.entries.find(e => e.position === 'day_branch')!;
    expect(entry.char).toBe('卯');
    expect(entry.tenGod).toBe('bijeon');
  });

  it('시간 壬 = 정인', () => {
    const entry = tenGods.entries.find(e => e.position === 'hour_stem')!;
    expect(entry.tenGod).toBe('jeongin');
  });

  it('시지 午 = 식신', () => {
    const entry = tenGods.entries.find(e => e.position === 'hour_branch')!;
    expect(entry.tenGod).toBe('siksin');
  });

  it('십신 분포 정답 검증: 비견25% 식신37.5% 정관12.5% 정인25%', () => {
    expect(tenGods.count.bijeon).toBe(2);
    expect(tenGods.count.siksin).toBe(3);
    expect(tenGods.count.jeonggwan).toBe(1);
    expect(tenGods.count.jeongin).toBe(2);

    expect(tenGods.percentages.bijeon).toBe(25);
    expect(tenGods.percentages.siksin).toBe(37.5);
    expect(tenGods.percentages.jeonggwan).toBe(12.5);
    expect(tenGods.percentages.jeongin).toBe(25);

    // 나머지 전부 0
    expect(tenGods.count.geopjae).toBe(0);
    expect(tenGods.count.sanggwan).toBe(0);
    expect(tenGods.count.pyeonjae).toBe(0);
    expect(tenGods.count.jeongjae).toBe(0);
    expect(tenGods.count.pyeongwan).toBe(0);
    expect(tenGods.count.pyeonin).toBe(0);
  });

  it('전체 출력', () => {
    console.log('');
    console.log('═══ 1990-06-19 12:00 십신 분석 ═══');
    console.log('');
    for (const entry of tenGods.entries) {
      const posLabel: Record<string, string> = {
        year_stem: '년간', year_branch: '년지',
        month_stem: '월간', month_branch: '월지',
        day_stem: '일간', day_branch: '일지',
        hour_stem: '시간', hour_branch: '시지',
      };
      console.log(`  ${posLabel[entry.position]}  ${entry.char}  ${TEN_GOD_KOREAN[entry.tenGod]}(${TEN_GOD_HANJA[entry.tenGod]})`);
    }
    console.log('');
    console.log('── 십신 분포 ──');
    for (const [key, val] of Object.entries(tenGods.count)) {
      if (val > 0) {
        console.log(`  ${TEN_GOD_KOREAN[key as keyof typeof TEN_GOD_KOREAN]}: ${val}개 (${tenGods.percentages[key as keyof typeof tenGods.percentages]}%)`);
      }
    }
  });
});
