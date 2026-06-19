import { describe, it, expect } from 'vitest';
import { calculateSaju, ELEMENT_SPANISH } from 'manseryeok';
import {
  analyzeTenGods, analyzeYongShin,
  STRENGTH_KOREAN, ELEMENT_KOREAN,
} from '../src/index.js';

describe('용신/신강신약 — 1996-10-10 남자 서울', () => {
  const saju = calculateSaju({ year: 1996, month: 10, day: 10, hour: 17, minute: 0, city: '서울' });
  const tenGods = analyzeTenGods(saju.fourPillars, saju.dayMaster.stem);
  const ys = analyzeYongShin(saju.dayMaster.stem, saju.fourPillars, saju.fiveElements, tenGods.count);

  it('일간 庚金', () => {
    expect(saju.dayMaster.stem).toBe('庚');
    expect(saju.dayMaster.element).toBe('metal');
  });

  it('신강 (중화신강)', () => {
    expect(['singang', 'junghwa']).toContain(ys.strength.level);
    expect(ys.strength.score).toBeGreaterThan(0);
  });

  it('득령 = true (월지 戌 본기 戊토 → 토생금)', () => {
    expect(ys.strength.deukryeong).toBe(true);
  });

  it('용신 = 木 (억부용신)', () => {
    expect(ys.yongShin).toBe('wood');
    expect(ys.yongShinCategory).toBe('억부용신');
  });

  it('전체 출력', () => {
    console.log('');
    console.log('═══ 1996 남 서울 — 신강/용신 ═══');
    console.log(`  일간: 庚金`);
    console.log(`  신강/신약: ${STRENGTH_KOREAN[ys.strength.level]} (점수: ${ys.strength.score.toFixed(1)})`);
    console.log(`  득령: ${ys.strength.deukryeong ? '○' : '×'} | 득지: ${ys.strength.deukji ? '○' : '×'}`);
    console.log(`  아군(비겁+인성): ${ys.strength.friendCount}개 | 적군(식상+재성+관성): ${ys.strength.foeCount}개`);
    console.log(`  용신: ${ELEMENT_KOREAN[ys.yongShin]} (${ys.yongShinCategory})`);
    console.log(`  기신: ${ELEMENT_KOREAN[ys.giShin]}`);
    console.log('');
  });
});

describe('용신/신강신약 — 1980-10-10 여자 과달라하라', () => {
  const saju = calculateSaju({ year: 1980, month: 10, day: 10, hour: 8, minute: 0, city: 'Guadalajara' });
  const tenGods = analyzeTenGods(saju.fourPillars, saju.dayMaster.stem);
  const ys = analyzeYongShin(saju.dayMaster.stem, saju.fourPillars, saju.fiveElements, tenGods.count);

  it('일간 丙火', () => {
    expect(saju.dayMaster.stem).toBe('丙');
    expect(saju.dayMaster.element).toBe('fire');
  });

  it('태약', () => {
    expect(ys.strength.level).toBe('taeyak');
  });

  it('실령 (월지 戌 → 화생토 → 나를 빼앗김)', () => {
    expect(ys.strength.deukryeong).toBe(false);
  });

  it('용신 = 木 (억부용신)', () => {
    expect(ys.yongShin).toBe('wood');
  });

  it('전체 출력', () => {
    console.log('');
    console.log('═══ 1980 여 과달라하라 — 신강/용신 ═══');
    console.log(`  일간: 丙火`);
    console.log(`  신강/신약: ${STRENGTH_KOREAN[ys.strength.level]} (점수: ${ys.strength.score.toFixed(1)})`);
    console.log(`  득령: ${ys.strength.deukryeong ? '○' : '×'} | 득지: ${ys.strength.deukji ? '○' : '×'}`);
    console.log(`  아군: ${ys.strength.friendCount}개 | 적군: ${ys.strength.foeCount}개`);
    console.log(`  용신: ${ELEMENT_KOREAN[ys.yongShin]} (${ys.yongShinCategory})`);
    console.log(`  기신: ${ELEMENT_KOREAN[ys.giShin]}`);
    console.log('');
  });
});
