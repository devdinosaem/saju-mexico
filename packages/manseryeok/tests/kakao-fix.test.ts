import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('카카오프렌즈 생일+출시연도', () => {
  it('계산', () => {
    const chars = [
      // 초기 7캐릭터 — 2012년 + 각 캐릭터 공식 생일
      { name: "네오", birth: [2012, 4, 17], label: "카카오프렌즈" },    // 생일 4/17
      { name: "제이지", birth: [2012, 12, 24], label: "카카오프렌즈" }, // 생일 12/24
      { name: "어피치", birth: [2012, 7, 24], label: "카카오프렌즈" },  // 생일 7/24
      { name: "프로도", birth: [2012, 3, 6], label: "카카오프렌즈" },   // 생일 3/6
      { name: "튜브", birth: [2012, 1, 25], label: "카카오프렌즈" },    // 생일 1/25
      { name: "무지", birth: [2012, 8, 7], label: "카카오프렌즈" },     // 생일 8/7
      { name: "콘", birth: [2012, 9, 28], label: "카카오프렌즈" },      // 생일 9/28

      // 라이언 — 2016년 + 생일 9/3
      { name: "라이언", birth: [2016, 9, 3], label: "카카오프렌즈" },

      // 춘식이 — 2020년 + 생일 3/17
      { name: "춘식이", birth: [2020, 3, 17], label: "카카오프렌즈" },

      // 죠르디 — 2017년(니니즈 출시) + 죠르디 자체 생일 불명이면 니니즈 출시 11월
      { name: "죠르디", birth: [2017, 11, 1], label: "카카오프렌즈" },
    ];

    console.log('\n=== 카카오프렌즈 생일+출시연도 ===\n');
    for (const c of chars) {
      const ilju = getIlju(c.birth[0], c.birth[1], c.birth[2]);
      console.log(ilju + ' | ' + c.name + ' (' + c.birth.join('.') + ')');
    }
  });
});
