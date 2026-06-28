import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function ilju(year: number, month: number, day: number, city?: string): string {
  const s = calculateSaju({ year, month, day, hour: 12, minute: 0, city });
  return STEM_KOREAN[s.fourPillars.day.stem] + BRANCH_KOREAN[s.fourPillars.day.branch];
}

describe('이건희 이재용 일주 검증', () => {
  it('계산', () => {
    console.log('이건희 1942.1.9 (한국):', ilju(1942, 1, 9));
    console.log('이재용 1968.6.23 (한국):', ilju(1968, 6, 23));
  });
});
