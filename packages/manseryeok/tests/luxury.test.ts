import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('명품 브랜드 일주', () => {
  it('계산', () => {
    const luxury = [
      // 샤넬
      { name: "코코 샤넬", birth: [1883, 8, 19], company: "샤넬 창업자", gender: "f" },
      { name: "알랭 베르테메르", birth: [1949, 11, 28], company: "샤넬 오너", gender: "m" },
      { name: "리나 나이르", birth: [1969, 6, 3], company: "샤넬 CEO", gender: "f" },

      // 에르메스
      { name: "악셀 뒤마", birth: [1970, 6, 1], company: "에르메스 회장", gender: "m" },

      // 케링 (구찌, 발렌시아가, 보테가베네타 등)
      { name: "프랑수아앙리 피노", birth: [1962, 5, 28], company: "케링 회장", gender: "m" },

      // 프라다
      { name: "미우치아 프라다", birth: [1949, 5, 10], company: "프라다 창업가문", gender: "f" },
      { name: "안드레아 게라", birth: [1966, 3, 7], company: "프라다 CEO", gender: "m" },

      // 루이비통 (LVMH 산하)
      { name: "피에트로 베카리", birth: [1967, 4, 5], company: "루이비통 CEO", gender: "m" },

      // 디올 (LVMH 산하)
      { name: "델핀 아르노", birth: [1975, 4, 4], company: "디올 CEO", gender: "f" },

      // 티파니 (LVMH 산하)
      { name: "앤서니 르드루", birth: [1973, 3, 15], company: "티파니 CEO", gender: "m" },

      // 까르띠에/리치몬트
      { name: "요한 루퍼트", birth: [1950, 6, 1], company: "리치몬트 회장", gender: "m" },

      // 버버리
      { name: "조슈아 슐만", birth: [1975, 8, 12], company: "버버리 CEO", gender: "m" },

      // 구찌 (케링 산하)
      { name: "스테파노 칸티노", birth: [1967, 10, 20], company: "구찌 CEO", gender: "m" },
    ];

    console.log('\n=== 명품 브랜드 일주 ===\n');
    for (const c of luxury) {
      const ilju = getIlju(c.birth[0], c.birth[1], c.birth[2]);
      console.log(c.gender + ' | ' + ilju + ' | ' + c.name + ' | ' + c.company);
    }
  });
});
