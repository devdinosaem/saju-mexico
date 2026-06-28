import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number, city: string): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0, city });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

const candidates = [
  { ilju: '갑인', name: '키아누 리브스',        birth: [1964, 9, 2],  city: 'Beirut' },
  { ilju: '갑자', name: '문종',                birth: [1414,11,15],  city: 'Seoul' },
  { ilju: '무술', name: '윌 스미스',           birth: [1968, 9,25],  city: 'Philadelphia' },
  { ilju: '무자', name: '로버트 다우니 주니어', birth: [1965, 4, 4],  city: 'Manhattan' },
  { ilju: '무진', name: '칼 마르크스',         birth: [1818, 5, 5],  city: 'Trier' },
  { ilju: '병오', name: '루이스 해밀턴',        birth: [1985, 1, 7],  city: 'Stevenage' },
  { ilju: '을사', name: '리한나',              birth: [1988, 2,20],  city: 'Bridgetown' },
  { ilju: '을유', name: '존 레논',             birth: [1940,10, 9],  city: 'Liverpool' },
  { ilju: '을축', name: '모차르트',            birth: [1756, 1,27],  city: 'Salzburg' },
  { ilju: '정사', name: '월트 디즈니',         birth: [1901,12, 5],  city: 'Chicago' },
];

describe('검수', () => {
  it('일주 재확인', () => {
    for (const c of candidates) {
      const actual = getIlju(c.birth[0], c.birth[1], c.birth[2], c.city);
      const ok = actual === c.ilju ? '✅' : `❌ 실제:${actual}`;
      console.log(`${ok}  ${c.ilju} | ${c.name} | ${c.birth.join('.')} | ${c.city}`);
    }
  });
});
