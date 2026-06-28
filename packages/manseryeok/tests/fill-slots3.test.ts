import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('빈 슬롯 3차', () => {
  it('계산', () => {
    const candidates = [
      // 갑오-m (디노만) — 갑(甲)일간+오(午)지지 찾기
      { name: "김지훈(1981)", birth: [1981, 2, 9], gender: "m" },
      { name: "이기광(비스트)", birth: [1990, 3, 30], gender: "m" },
      { name: "남태현", birth: [1994, 5, 10], gender: "m" },
      { name: "WOODZ 조승연", birth: [1996, 8, 21], gender: "m" },
      { name: "AB6IX 이대휘", birth: [2001, 1, 29], gender: "m" },

      // 갑자-m (신동엽만)
      { name: "이경규", birth: [1960, 7, 26], gender: "m" }, // already 기해?
      { name: "서장훈", birth: [1974, 2, 6], gender: "m" },
      { name: "안정환", birth: [1976, 1, 27], gender: "m" },
      { name: "김동율(김동률)", birth: [1974, 8, 15], gender: "m" },

      // 경신-m (제프만)
      { name: "윤종신", birth: [1969, 11, 15], gender: "m" },
      { name: "유희열", birth: [1971, 4, 19], gender: "m" },
      { name: "이문세", birth: [1959, 1, 28], gender: "m" },
      { name: "양현석", birth: [1970, 1, 9], gender: "m" },
      { name: "이수만", birth: [1952, 6, 18], gender: "m" },
      { name: "JYP 박진영", birth: [1972, 1, 13], gender: "m" },
      { name: "방시혁", birth: [1972, 8, 9], gender: "m" },

      // 계사-f (티파니만)
      { name: "김완선", birth: [1969, 3, 25], gender: "f" },
      { name: "비비(가수)", birth: [1998, 9, 27], gender: "f" }, // already 정축?
      { name: "자우림 김윤아", birth: [1974, 5, 14], gender: "f" },
      { name: "장윤정", birth: [1980, 2, 18], gender: "f" },
      { name: "홍진경", birth: [1974, 8, 21], gender: "f" },

      // 기유-m (이준혁만)
      { name: "정일우", birth: [1987, 9, 9], gender: "m" },
      { name: "지창욱", birth: [1987, 7, 5], gender: "m" }, // already 을묘?
      { name: "옥택연", birth: [1988, 12, 27], gender: "m" },
      { name: "닉쿤(2PM)", birth: [1988, 6, 24], gender: "m" },
      { name: "준호(2PM)", birth: [1990, 1, 25], gender: "m" },
      { name: "크나큰 박서준A", birth: [1993, 5, 16], gender: "m" },

      // 신유-m (송중기만)
      { name: "지성(배우)", birth: [1977, 2, 27], gender: "m" },
      { name: "최진혁", birth: [1986, 2, 9], gender: "m" },
      { name: "장기용", birth: [1992, 8, 7], gender: "m" },
      { name: "김강우", birth: [1978, 7, 11], gender: "m" },

      // 임자-m (워렌 버핏만)
      { name: "이영표", birth: [1977, 4, 23], gender: "m" },
      { name: "설기현", birth: [1979, 1, 8], gender: "m" },
      { name: "조규성", birth: [1998, 1, 25], gender: "m" },
      { name: "김민재", birth: [1996, 11, 15], gender: "m" },
      { name: "이재성", birth: [1992, 8, 10], gender: "m" },
      { name: "이승우(축구)", birth: [1998, 1, 6], gender: "m" },

      // 정묘-m (니키만)
      { name: "데이식스 영케이", birth: [1993, 12, 19], gender: "m" },
      { name: "데이식스 제이", birth: [1992, 9, 15], gender: "m" },
      { name: "DAY6 원필", birth: [1994, 4, 28], gender: "m" },
      { name: "래퍼 빈지노", birth: [1988, 9, 18], gender: "m" },
      { name: "사무엘", birth: [2002, 1, 17], gender: "m" },
    ];

    const targets = ['갑오-m','갑자-m','경신-m','계사-f','기유-m','신유-m','임자-m','정묘-m'];

    console.log('\n=== 3차 후보 ===\n');
    for (const c of candidates) {
      const ilju = getIlju(c.birth[0], c.birth[1], c.birth[2]);
      const slot = ilju + '-' + c.gender;
      const isTarget = targets.includes(slot);
      console.log((isTarget ? '✅ HIT: ' : '   ') + slot + ' ← ' + c.name + ' (' + c.birth.join('.') + ')');
    }
  });
});
