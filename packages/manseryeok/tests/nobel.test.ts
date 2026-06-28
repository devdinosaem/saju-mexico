import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('노벨상 수상자', () => {
  it('계산', () => {
    const nobel = [
      { name: "한강", birth: [1970, 11, 27], gender: "f" },
      { name: "알베르트 아인슈타인", birth: [1879, 3, 14], gender: "m" },
      { name: "마리 퀴리", birth: [1867, 11, 7], gender: "f" },
      { name: "넬슨 만델라", birth: [1918, 7, 18], gender: "m" },
      { name: "마틴 루터 킹", birth: [1929, 1, 15], gender: "m" },
      { name: "밥 딜런", birth: [1941, 5, 24], gender: "m" },
      { name: "어니스트 헤밍웨이", birth: [1899, 7, 21], gender: "m" },
      { name: "알베르 카뮈", birth: [1913, 11, 7], gender: "m" },
      { name: "마더 테레사", birth: [1910, 8, 26], gender: "f" },
      { name: "달라이 라마", birth: [1935, 7, 6], gender: "m" },
      { name: "말랄라 유사프자이", birth: [1997, 7, 12], gender: "f" },
      { name: "존 내시", birth: [1928, 6, 13], gender: "m" },
      { name: "리처드 파인만", birth: [1918, 5, 11], gender: "m" },
      { name: "제임스 왓슨", birth: [1928, 4, 6], gender: "m" },
      { name: "알렉산더 플레밍", birth: [1881, 8, 6], gender: "m" },
    ];

    console.log('\n=== 노벨상 수상자 일주 ===\n');
    for (const n of nobel) {
      const ilju = getIlju(n.birth[0], n.birth[1], n.birth[2]);
      console.log(n.gender + ' | ' + ilju + ' | ' + n.name);
    }
  });
});
