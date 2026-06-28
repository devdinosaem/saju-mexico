import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';
function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}
describe('노벨상 추가', () => {
  it('계산', () => {
    const nobel = [
      { name: "김대중", birth: [1924, 1, 6], gender: "m" },
      { name: "미하일 고르바초프", birth: [1931, 3, 2], gender: "m" },
      { name: "가즈오 이시구로", birth: [1954, 11, 8], gender: "m" },
      { name: "대니얼 카너먼", birth: [1934, 3, 5], gender: "m" },
      { name: "제니퍼 다우드나", birth: [1964, 2, 19], gender: "f" },
    ];
    for (const n of nobel) {
      const ilju = getIlju(n.birth[0], n.birth[1], n.birth[2]);
      console.log(n.gender + ' | ' + ilju + ' | ' + n.name + ' | ' + n.birth.join('.'));
    }
  });
});
