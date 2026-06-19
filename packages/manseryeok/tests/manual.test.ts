import { describe, it } from 'vitest';
import { calculateSaju } from '../src/pillars.js';
import { STEM_KOREAN, BRANCH_KOREAN, STEM_ELEMENT, BRANCH_ELEMENT, ELEMENT_SPANISH, BRANCH_SPANISH } from '../src/constants.js';
import type { GanZhi } from '../src/types.js';

function fmt(gz: GanZhi): string {
  return `${STEM_KOREAN[gz.stem]}${BRANCH_KOREAN[gz.branch]}(${gz.stem}${gz.branch})`;
}

function elemKor(gz: GanZhi): string {
  return `${ELEMENT_SPANISH[STEM_ELEMENT[gz.stem]]}(${STEM_ELEMENT[gz.stem]}) + ${ELEMENT_SPANISH[BRANCH_ELEMENT[gz.branch]]}(${BRANCH_ELEMENT[gz.branch]})`;
}

function printSaju(label: string, input: { year: number; month: number; day: number; hour: number; minute: number }) {
  const result = calculateSaju(input);
  const p = result.fourPillars;
  const e = result.fiveElements;
  const bar = (n: number) => '█'.repeat(n) + '░'.repeat(4 - Math.min(n, 4));

  console.log('');
  console.log('═══════════════════════════════════════');
  console.log(`  ${label}`);
  console.log('═══════════════════════════════════════');
  console.log('');
  console.log(`  시주(時)    일주(日)    월주(月)    년주(年)`);
  console.log(`  ${fmt(p.hour)}   ${fmt(p.day)}   ${fmt(p.month)}   ${fmt(p.year)}`);
  console.log('');
  console.log('── 오행 분석 ──');
  console.log(`  년주: ${elemKor(p.year)}`);
  console.log(`  월주: ${elemKor(p.month)}`);
  console.log(`  일주: ${elemKor(p.day)}`);
  console.log(`  시주: ${elemKor(p.hour)}`);
  console.log('');
  console.log('── 오행 분포 ──');
  console.log(`  木 Madera : ${bar(e.wood)} ${e.wood}`);
  console.log(`  火 Fuego  : ${bar(e.fire)} ${e.fire}`);
  console.log(`  土 Tierra : ${bar(e.earth)} ${e.earth}`);
  console.log(`  金 Metal  : ${bar(e.metal)} ${e.metal}`);
  console.log(`  水 Agua   : ${bar(e.water)} ${e.water}`);
  console.log('');
  console.log('── 일간 (Day Master) ──');
  console.log(`  ${STEM_KOREAN[result.dayMaster.stem]}(${result.dayMaster.stem})`);
  console.log(`  오행: ${ELEMENT_SPANISH[result.dayMaster.element]}(${result.dayMaster.element})`);
  console.log(`  음양: ${result.dayMaster.yinYang === 'yang' ? '양(陽)' : '음(陰)'}`);
  console.log(`  띠: ${BRANCH_SPANISH[p.year.branch]}(${BRANCH_KOREAN[p.year.branch]})`);
  console.log('');
}

describe('사주 분석', () => {
  it('1990-06-19 12:00', () => {
    printSaju('1990년 6월 19일 오후 12시', { year: 1990, month: 6, day: 19, hour: 12, minute: 0 });
  });

  it('1991-09-11 12:50', () => {
    printSaju('1991년 9월 11일 오후 12시 50분', { year: 1991, month: 9, day: 11, hour: 12, minute: 50 });
  });
});
