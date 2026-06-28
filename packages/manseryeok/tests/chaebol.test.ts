import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('재벌 회장/창업자 추가', () => {
  it('계산', () => {
    const chaebols = [
      // 유저 요청 4명
      { name: "정몽구", birth: [1938, 3, 19], label: "현대차 명예회장", gender: "m" },
      { name: "신격호", birth: [1922, 10, 4], label: "롯데 창업자", gender: "m" },
      { name: "구본무", birth: [1945, 2, 10], label: "LG 전 회장", gender: "m" },
      { name: "최종현", birth: [1929, 11, 13], label: "SK 창업자", gender: "m" },

      // 빠졌을 수 있는 주요 재벌 창업자/회장
      { name: "이병철", birth: [1910, 2, 12], label: "삼성 창업자", gender: "m" },
      { name: "정주영", birth: [1915, 11, 25], label: "현대 창업자", gender: "m" },
      { name: "구인회", birth: [1907, 8, 27], label: "LG 창업자", gender: "m" },
      { name: "최태원", birth: [1960, 12, 3], label: "SK 회장", gender: "m" }, // 이미 있음 확인용
      { name: "정몽준", birth: [1951, 10, 17], label: "현대중공업 명예회장", gender: "m" },
      { name: "정몽진", birth: [1963, 3, 2], label: "KCC 회장", gender: "m" },
      { name: "김범수", birth: [1966, 3, 13], label: "카카오 창업자", gender: "m" }, // 이미 있음
      { name: "조석래", birth: [1935, 5, 12], label: "효성 창업자", gender: "m" },
      { name: "이명희", birth: [1943, 7, 24], label: "신세계 명예회장", gender: "f" },
      { name: "이미경", birth: [1958, 11, 24], label: "CJ 부회장", gender: "f" },
      { name: "홍라희", birth: [1945, 4, 18], label: "삼성미술관 리움", gender: "f" },
      { name: "정유경", birth: [1972, 1, 6], label: "신세계 총괄사장", gender: "f" },
      { name: "이서현", birth: [1973, 9, 6], label: "삼성복지재단 이사장", gender: "f" }, // 이미 있음
      { name: "이영자", birth: [1966, 5, 20], label: "LS그룹 부회장", gender: "f" },
      { name: "구본준", birth: [1952, 7, 15], label: "LX 회장", gender: "m" },
      { name: "허창수", birth: [1949, 1, 3], label: "GS 명예회장", gender: "m" },
      { name: "조양호", birth: [1949, 3, 8], label: "한진 전 회장", gender: "m" },
      { name: "최종건", birth: [1963, 1, 13], label: "SK스퀘어 부회장", gender: "m" },
      { name: "김승연", birth: [1952, 9, 7], label: "한화 회장", gender: "m" }, // 이미 있음
      { name: "박용만", birth: [1955, 4, 8], label: "두산 전 회장", gender: "m" },
      { name: "구자열", birth: [1953, 10, 19], label: "LS 회장", gender: "m" },
    ];

    console.log('\n=== 재벌 일주 ===\n');
    for (const c of chaebols) {
      const ilju = getIlju(c.birth[0], c.birth[1], c.birth[2]);
      console.log(c.gender + ' | ' + ilju + ' | ' + c.name + ' | ' + c.label);
    }
  });
});
