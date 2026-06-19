import { describe, it, expect } from 'vitest';
import { calculateSaju } from 'manseryeok';
import { analyzeRelations } from '../src/index.js';

describe('합충형파해 — 1996-10-10 서울 (庚辰/戊戌 辰戌충)', () => {
  const saju = calculateSaju({ year: 1996, month: 10, day: 10, hour: 17, minute: 0, city: '서울' });
  const rel = analyzeRelations(saju.fourPillars);

  it('辰戌충 발견 (일지-월지)', () => {
    const chung = rel.relations.find(r => r.type === '충' && r.chars.includes('辰') && r.chars.includes('戌'));
    expect(chung).toBeDefined();
    expect(chung!.positions).toContain('일지');
    expect(chung!.positions).toContain('월지');
  });

  it('전체 출력', () => {
    console.log(`\n  ═══ 1996 서울 합충형파해 ═══`);
    console.log(`  사주: 丙子 戊戌 庚辰 甲申`);
    console.log(`  합: ${rel.summary.hapCount} | 충: ${rel.summary.chungCount} | 형: ${rel.summary.hyeongCount} | 파: ${rel.summary.paCount} | 해: ${rel.summary.haeCount}`);
    for (const r of rel.relations) {
      console.log(`  [${r.type}] ${r.positions.join('↔')} ${r.description}`);
    }
    console.log('');
  });
});

describe('합충형파해 — 1980-10-10 과달라하라 (辰戌충, 辰辰자형)', () => {
  const saju = calculateSaju({ year: 1980, month: 10, day: 10, hour: 8, minute: 0, city: 'Guadalajara' });
  const rel = analyzeRelations(saju.fourPillars);

  it('辰戌충 발견', () => {
    const chung = rel.relations.find(r => r.type === '충' && r.chars.includes('辰') && r.chars.includes('戌'));
    expect(chung).toBeDefined();
  });

  it('辰辰 자형 (일지-시지 둘 다 辰)', () => {
    const ja = rel.relations.find(r => r.type === '형' && r.description.includes('자형'));
    expect(ja).toBeDefined();
  });

  it('辰酉 육합 (일지/시지 辰 + 없음? 확인)', () => {
    // 申 있음 → 巳申합 체크
    const hapCheck = rel.relations.filter(r => r.type === '육합');
    console.log('  육합:', hapCheck.map(h => h.description).join(', ') || '없음');
  });

  it('전체 출력', () => {
    console.log(`\n  ═══ 1980 과달라하라 합충형파해 ═══`);
    console.log(`  사주: 庚申 丙戌 丙辰 壬辰`);
    console.log(`  합: ${rel.summary.hapCount} | 충: ${rel.summary.chungCount} | 형: ${rel.summary.hyeongCount} | 파: ${rel.summary.paCount} | 해: ${rel.summary.haeCount}`);
    for (const r of rel.relations) {
      console.log(`  [${r.type}] ${r.positions.join('↔')} ${r.description}`);
    }
    console.log('');
  });
});

describe('합충형파해 — 1990-06-19 (午午午 삼중, 卯戌합)', () => {
  const saju = calculateSaju({ year: 1990, month: 6, day: 19, hour: 12, minute: 0 });
  const rel = analyzeRelations(saju.fourPillars);

  it('午午 자형 (午가 3개)', () => {
    const jaHyeong = rel.relations.find(r => r.type === '형' && r.description.includes('午午'));
    expect(jaHyeong).toBeDefined();
  });

  it('卯戌 육합은 없음 (戌 없음)', () => {
    const yukap = rel.relations.find(r => r.type === '육합' && r.chars.includes('卯'));
    expect(yukap).toBeUndefined();
  });

  it('전체 출력', () => {
    console.log(`\n  ═══ 1990 합충형파해 ═══`);
    console.log(`  사주: 庚午 壬午 乙卯 壬午`);
    console.log(`  합: ${rel.summary.hapCount} | 충: ${rel.summary.chungCount} | 형: ${rel.summary.hyeongCount} | 파: ${rel.summary.paCount} | 해: ${rel.summary.haeCount}`);
    for (const r of rel.relations) {
      console.log(`  [${r.type}] ${r.positions.join('↔')} ${r.description}`);
    }
    console.log('');
  });
});
