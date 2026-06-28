import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('기업인 확장', () => {
  it('계산', () => {
    const ceos = [
      // 한국 대기업/유니콘
      { name: "장병규", birth: [1975, 7, 18], company: "크래프톤 창업자", gender: "m" },
      { name: "이수진", birth: [1977, 4, 5], company: "야놀자 창업자", gender: "m" },
      { name: "김용현", birth: [1981, 9, 12], company: "당근 창업자", gender: "m" },
      { name: "조만호", birth: [1988, 3, 24], company: "무신사 창업자", gender: "m" },
      { name: "민희진", birth: [1979, 8, 5], company: "어도어 전 대표", gender: "f" },
      { name: "서정진", birth: [1957, 3, 3], company: "셀트리온 창업자", gender: "m" },
      { name: "이동채", birth: [1955, 3, 15], company: "에코프로 창업자", gender: "m" },
      { name: "장인화", birth: [1960, 6, 5], company: "포스코 CEO", gender: "m" },
      { name: "이재현", birth: [1960, 8, 27], company: "CJ그룹 회장", gender: "m" },
      { name: "정용진", birth: [1968, 9, 19], company: "신세계 회장", gender: "m" },
      { name: "서경배", birth: [1963, 3, 31], company: "아모레퍼시픽 회장", gender: "m" },
      { name: "윤호영", birth: [1970, 5, 15], company: "카카오뱅크 CEO", gender: "m" },
      { name: "홍민택", birth: [1982, 11, 3], company: "토스뱅크 CEO", gender: "m" },

      // 글로벌
      { name: "손정의", birth: [1957, 8, 11], company: "소프트뱅크 창업자", gender: "m" },
      { name: "베르나르 아르노", birth: [1949, 3, 5], company: "LVMH 회장", gender: "m" },
      { name: "하워드 슐츠", birth: [1953, 7, 19], company: "스타벅스 창업자", gender: "m" },
      { name: "장이밍", birth: [1983, 4, 1], company: "바이트댄스(틱톡) 창업자", gender: "m" },
      { name: "다니엘 에크", birth: [1983, 2, 21], company: "스포티파이 창업자", gender: "m" },
      { name: "브라이언 체스키", birth: [1981, 8, 29], company: "에어비앤비 창업자", gender: "m" },
      { name: "트래비스 캘러닉", birth: [1976, 8, 6], company: "우버 창업자", gender: "m" },
      { name: "다라 코스로샤히", birth: [1969, 5, 28], company: "우버 CEO", gender: "m" },
      { name: "에반 스피겔", birth: [1990, 6, 4], company: "스냅챗 창업자", gender: "m" },
      { name: "래리 엘리슨", birth: [1944, 8, 17], company: "오라클 창업자", gender: "m" },
      { name: "제이미 다이먼", birth: [1956, 3, 13], company: "JP모건 CEO", gender: "m" },
      { name: "필 나이트", birth: [1938, 2, 24], company: "나이키 창업자", gender: "m" },
      { name: "후루카와 슌타로", birth: [1972, 1, 10], company: "닌텐도 CEO", gender: "m" },
      { name: "모리스 장", birth: [1931, 7, 10], company: "TSMC 창업자", gender: "m" },
      { name: "팻 겔싱어", birth: [1961, 4, 5], company: "인텔 전 CEO", gender: "m" },
    ];

    console.log('\n=== 기업인 확장 일주 ===\n');
    for (const c of ceos) {
      const ilju = getIlju(c.birth[0], c.birth[1], c.birth[2]);
      console.log(c.gender + ' | ' + ilju + ' | ' + c.name + ' | ' + c.company);
    }
  });
});
