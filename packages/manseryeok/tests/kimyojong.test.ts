import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';
function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}
describe('김여정', () => {
  it('계산', () => {
    const ilju = getIlju(1987, 9, 26);
    console.log('김여정: ' + ilju);
  });
});
