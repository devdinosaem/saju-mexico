import { describe, it, expect } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from 'manseryeok';
import {
  analyzeSpiritStars, analyzeSpecialStars,
  SPIRIT_STAR_KOREAN,
  analyzeTenGods, TEN_GOD_KOREAN, TEN_GOD_HANJA,
  analyzeTwelvePhases, PHASE_KOREAN, PHASE_HANJA,
} from '../src/index.js';

describe('신살 — 1990-06-19 12:00 (정답 검증)', () => {
  const result = calculateSaju({ year: 1990, month: 6, day: 19, hour: 12, minute: 0 });
  const spirits = analyzeSpiritStars(result.fourPillars);
  const specials = analyzeSpecialStars(result.fourPillars, result.dayMaster.stem);

  describe('12신살', () => {
    it('시주 午 = 장성살 (년지 기준)', () => {
      expect(spirits.hour).toBe('jangseong');
    });

    it('일주 卯 = 년살 (년지 기준)', () => {
      expect(spirits.day).toBe('nyeonsal');
    });

    it('월주 午 = 장성살 (년지 기준)', () => {
      expect(spirits.month).toBe('jangseong');
    });

    it('년주 午 = 육해살 (일지 기준)', () => {
      expect(spirits.year).toBe('yukhae');
    });
  });

  describe('길성/흉성', () => {
    it('午 지지에 문창귀인 포함', () => {
      expect(specials.year).toContain('문창귀인');
      expect(specials.month).toContain('문창귀인');
      expect(specials.hour).toContain('문창귀인');
    });

    it('午 지지에 학당귀인 포함', () => {
      expect(specials.year).toContain('학당귀인');
    });

    it('午 지지에 도화살 포함', () => {
      expect(specials.year).toContain('도화살');
    });

    it('卯(일지)에 정록 포함', () => {
      expect(specials.day).toContain('정록');
    });

    it('卯(일지)에 도화살 포함', () => {
      expect(specials.day).toContain('도화살');
    });

    it('전체 길성 목록에 핵심 항목 포함', () => {
      expect(specials.all).toContain('문창귀인');
      expect(specials.all).toContain('학당귀인');
      expect(specials.all).toContain('도화살');
      expect(specials.all).toContain('정록');
    });
  });

  it('종합 출력', () => {
    const tenGods = analyzeTenGods(result.fourPillars, result.dayMaster.stem);
    const phases = analyzeTwelvePhases(result.fourPillars, result.dayMaster.stem);
    const p = result.fourPillars;

    const positions = [
      { label: '시주', key: 'hour' as const, stem: p.hour.stem, branch: p.hour.branch },
      { label: '일주', key: 'day' as const, stem: p.day.stem, branch: p.day.branch },
      { label: '월주', key: 'month' as const, stem: p.month.stem, branch: p.month.branch },
      { label: '년주', key: 'year' as const, stem: p.year.stem, branch: p.year.branch },
    ];

    console.log('');
    console.log('═══ 1990-06-19 12:00 종합 분석 ═══');
    console.log('');

    for (const pos of positions) {
      const stemTG = tenGods.entries.find(e => e.position === `${pos.key}_stem`)!;
      const branchTG = tenGods.entries.find(e => e.position === `${pos.key}_branch`)!;
      const phase = phases[pos.key];
      const spirit = SPIRIT_STAR_KOREAN[spirits[pos.key]];
      const special = specials[pos.key];

      console.log(`  ${pos.label}`);
      console.log(`    ${pos.stem}(${STEM_KOREAN[pos.stem]}) — ${TEN_GOD_KOREAN[stemTG.tenGod]}`);
      console.log(`    ${pos.branch}(${BRANCH_KOREAN[pos.branch]}) — ${TEN_GOD_KOREAN[branchTG.tenGod]} | ${PHASE_KOREAN[phase]} | ${spirit}`);
      if (special.length > 0) {
        console.log(`    길성: ${special.join(', ')}`);
      }
      console.log('');
    }

    console.log(`  전체 길성/흉성: ${specials.all.join(', ')}`);
    console.log('');
  });
});
