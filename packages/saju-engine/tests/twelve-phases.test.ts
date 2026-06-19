import { describe, it, expect } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from 'manseryeok';
import { analyzeTwelvePhases, PHASE_KOREAN, PHASE_HANJA } from '../src/index.js';
import { analyzeTenGods, TEN_GOD_KOREAN, TEN_GOD_HANJA } from '../src/index.js';

describe('12운성 — 1990-06-19 12:00 (정답 검증)', () => {
  const result = calculateSaju({ year: 1990, month: 6, day: 19, hour: 12, minute: 0 });
  const phases = analyzeTwelvePhases(result.fourPillars, result.dayMaster.stem);

  it('일간 乙 + 년지 午 = 장생', () => {
    expect(phases.year).toBe('jangsaeng');
  });

  it('일간 乙 + 월지 午 = 장생', () => {
    expect(phases.month).toBe('jangsaeng');
  });

  it('일간 乙 + 일지 卯 = 건록', () => {
    expect(phases.day).toBe('geonrok');
  });

  it('일간 乙 + 시지 午 = 장생', () => {
    expect(phases.hour).toBe('jangsaeng');
  });

  it('전체 출력 (십신 + 12운성 통합)', () => {
    const tenGods = analyzeTenGods(result.fourPillars, result.dayMaster.stem);
    const p = result.fourPillars;

    const pillars = [
      { label: '시주', stem: p.hour.stem, branch: p.hour.branch, phase: phases.hour },
      { label: '일주', stem: p.day.stem, branch: p.day.branch, phase: phases.day },
      { label: '월주', stem: p.month.stem, branch: p.month.branch, phase: phases.month },
      { label: '년주', stem: p.year.stem, branch: p.year.branch, phase: phases.year },
    ];

    console.log('');
    console.log('═══ 1990-06-19 12:00 사주 통합 분석 ═══');
    console.log('');

    // 천간 행
    const stemEntries = tenGods.entries.filter(e => e.position.endsWith('_stem'));
    const branchEntries = tenGods.entries.filter(e => e.position.endsWith('_branch'));

    for (const { label, stem, branch, phase } of pillars) {
      const stemTG = tenGods.entries.find(e => e.position === `${label === '시주' ? 'hour' : label === '일주' ? 'day' : label === '월주' ? 'month' : 'year'}_stem`)!;
      const branchTG = tenGods.entries.find(e => e.position === `${label === '시주' ? 'hour' : label === '일주' ? 'day' : label === '월주' ? 'month' : 'year'}_branch`)!;

      console.log(`  ${label}`);
      console.log(`    ${stem}(${STEM_KOREAN[stem]}) — ${TEN_GOD_KOREAN[stemTG.tenGod]}(${TEN_GOD_HANJA[stemTG.tenGod]})`);
      console.log(`    ${branch}(${BRANCH_KOREAN[branch]}) — ${TEN_GOD_KOREAN[branchTG.tenGod]}(${TEN_GOD_HANJA[branchTG.tenGod]}) — ${PHASE_KOREAN[phase]}(${PHASE_HANJA[phase]})`);
      console.log('');
    }
  });
});
