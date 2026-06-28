import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('기업인 일주 계산', () => {
  it('배치 계산', () => {
    const ceos = [
      { name: "이재용", birth: [1968, 6, 23], company: "삼성전자" },
      { name: "정의선", birth: [1970, 10, 18], company: "현대차그룹" },
      { name: "최태원", birth: [1960, 12, 3], company: "SK그룹" },
      { name: "마크 저커버그", birth: [1984, 5, 14], company: "메타(페이스북)" },
      { name: "워렌 버핏", birth: [1930, 8, 30], company: "버크셔 해서웨이" },
      { name: "빌 게이츠", birth: [1955, 10, 28], company: "마이크로소프트" },
      { name: "도널드 트럼프", birth: [1946, 6, 14], company: "미국 대통령 / 트럼프그룹" },
      { name: "일론 머스크", birth: [1971, 6, 28], company: "테슬라 / 스페이스X" },
      { name: "스티브 잡스", birth: [1955, 2, 24], company: "애플" },
      { name: "이건희", birth: [1942, 1, 9], company: "삼성그룹" },
      { name: "구광모", birth: [1978, 5, 12], company: "LG그룹" },
      { name: "팀 쿡", birth: [1960, 11, 1], company: "애플" },
      { name: "김승연", birth: [1952, 9, 7], company: "한화그룹" },
      { name: "김동관", birth: [1983, 7, 7], company: "한화그룹" },
      { name: "이해진", birth: [1967, 6, 22], company: "네이버" },
      { name: "김범수", birth: [1966, 3, 13], company: "카카오" },
      { name: "젠슨 황", birth: [1963, 2, 17], company: "엔비디아" },
      // 기존 리스트의 기업인
      { name: "제프 베이조스", birth: [1964, 1, 12], company: "아마존" },
    ];

    console.log('\n=== 기업인 일주 매칭 ===\n');
    console.log('이름 | 일주 | 기업');
    console.log('---|---|---');
    for (const c of ceos) {
      const ilju = getIlju(c.birth[0], c.birth[1], c.birth[2]);
      console.log(c.name + ' | ' + ilju + ' | ' + c.company);
    }
  });
});
