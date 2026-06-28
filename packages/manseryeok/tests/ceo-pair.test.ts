import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('기업 창업자-CEO 쌍', () => {
  it('계산', () => {
    const pairs = [
      // 하이브
      { name: "이재상", birth: [1977, 1, 15], company: "하이브 CEO", gender: "m" },
      // JYP
      { name: "정욱", birth: [1971, 3, 15], company: "JYP CEO", gender: "m" },
      // SM (카카오 인수 후)
      { name: "장철혁", birth: [1972, 5, 10], company: "SM CEO", gender: "m" },
      // 넥슨
      { name: "이정헌", birth: [1972, 8, 20], company: "넥슨 CEO", gender: "m" },
      // 넷플릭스
      { name: "테드 사란도스", birth: [1964, 7, 30], company: "넷플릭스 CEO", gender: "m" },
      // 카카오 (공동대표)
      { name: "정신아", birth: [1972, 9, 28], company: "카카오 공동CEO", gender: "f" },
      // 토스
      { name: "이은미", birth: [1980, 3, 12], company: "토스 CEO", gender: "f" },
      // X(트위터)
      { name: "린다 야카리노", birth: [1963, 8, 14], company: "X CEO", gender: "f" },
      // 삼성
      { name: "경계현", birth: [1962, 4, 15], company: "삼성전자 CEO", gender: "m" },
      { name: "한종희", birth: [1962, 10, 1], company: "삼성전자 부회장", gender: "m" },
      // 현대차
      { name: "장재훈", birth: [1966, 3, 20], company: "현대차 CEO", gender: "m" },
      // SK하이닉스
      { name: "곽노정", birth: [1964, 11, 5], company: "SK하이닉스 CEO", gender: "m" },
      // LG전자
      { name: "조주완", birth: [1964, 12, 10], company: "LG전자 CEO", gender: "m" },
      // 네이버 (최근)
      { name: "김남선", birth: [1975, 6, 15], company: "네이버 CFO", gender: "m" },
    ];

    console.log('\n=== 창업자-CEO 쌍 일주 ===\n');
    for (const c of pairs) {
      const ilju = getIlju(c.birth[0], c.birth[1], c.birth[2]);
      console.log(c.gender + ' | ' + ilju + ' | ' + c.name + ' | ' + c.company);
    }
  });
});
