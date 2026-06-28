import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('빈 슬롯 유명인 탐색', () => {
  it('후보 계산', () => {
    const candidates = [
      // 갑술 타겟 (甲戌) — 필요: 남1 여1
      { name: "이상윤", birth: [1981, 8, 15], gender: "m" },
      { name: "장혁", birth: [1976, 12, 20], gender: "m" },
      { name: "소지섭", birth: [1977, 11, 4], gender: "m" },
      { name: "김재중", birth: [1986, 1, 26], gender: "m" },
      { name: "이준기", birth: [1982, 4, 17], gender: "m" }, // already matched 경오
      { name: "김범수", birth: [1979, 1, 29], gender: "m" },
      { name: "성시경", birth: [1979, 4, 17], gender: "m" },
      { name: "이석훈", birth: [1979, 2, 21], gender: "m" },
      { name: "장기하", birth: [1982, 3, 21], gender: "m" },
      { name: "유연석", birth: [1984, 4, 11], gender: "m" },
      { name: "안재현", birth: [1987, 7, 1], gender: "m" },
      { name: "지성", birth: [1977, 2, 27], gender: "m" },
      { name: "감우성", birth: [1970, 6, 11], gender: "m" },
      { name: "박해진", birth: [1983, 5, 1], gender: "m" },
      { name: "오달수", birth: [1968, 6, 15], gender: "m" },
      { name: "이서진", birth: [1971, 4, 2], gender: "m" },
      { name: "배성우", birth: [1972, 1, 5], gender: "m" },
      { name: "김동완", birth: [1979, 11, 21], gender: "m" },
      { name: "윤두준", birth: [1989, 7, 4], gender: "m" },
      { name: "양세형", birth: [1981, 5, 14], gender: "m" },
      { name: "조세호", birth: [1982, 1, 20], gender: "m" },
      { name: "이용진", birth: [1987, 5, 29], gender: "m" },
      { name: "문상훈", birth: [1981, 12, 6], gender: "m" },
      { name: "전현무", birth: [1977, 9, 21], gender: "m" }, // already in 신해?
      { name: "도경수", birth: [1993, 1, 12], gender: "m" }, // already 계사
      { name: "안재홍", birth: [1986, 5, 28], gender: "m" },
      { name: "김동현(UFC)", birth: [1988, 11, 17], gender: "m" },
      { name: "이승윤", birth: [1993, 1, 15], gender: "m" },
      { name: "황민현", birth: [1995, 8, 9], gender: "m" },

      // 여성 후보
      { name: "한예리", birth: [1984, 12, 23], gender: "f" },
      { name: "고아라", birth: [1990, 2, 11], gender: "f" },
      { name: "서예지", birth: [1990, 4, 6], gender: "f" },
      { name: "이주빈", birth: [1990, 8, 18], gender: "f" },
      { name: "서현진", birth: [1985, 2, 27], gender: "f" }, // already 정유
      { name: "김유정", birth: [1999, 9, 22], gender: "f" }, // already 정축
      { name: "노정의", birth: [2001, 1, 29], gender: "f" },
      { name: "이유미", birth: [1994, 7, 18], gender: "f" },
      { name: "권나라", birth: [1991, 3, 13], gender: "f" },
      { name: "최희서", birth: [1987, 6, 18], gender: "f" },
      { name: "한채아", birth: [1979, 10, 25], gender: "f" },
      { name: "이세영", birth: [1992, 12, 20], gender: "f" }, // already 경오
      { name: "소유", birth: [1992, 2, 12], gender: "f" },
      { name: "효린", birth: [1991, 1, 11], gender: "f" },
      { name: "윤보미", birth: [1993, 8, 13], gender: "f" },
      { name: "김소혜", birth: [1999, 7, 19], gender: "f" },
      { name: "이수민", birth: [2003, 5, 11], gender: "f" },
      { name: "안소희", birth: [1992, 6, 27], gender: "f" },
      { name: "크리스탈(정수정)", birth: [1994, 10, 24], gender: "f" },
      { name: "박초롱", birth: [1991, 3, 3], gender: "f" },
      { name: "초아(AOA)", birth: [1990, 7, 12], gender: "f" },
      { name: "혜리(걸스데이)", birth: [1994, 6, 9], gender: "f" }, // already 병인?
      { name: "이하이", birth: [1996, 9, 23], gender: "f" },
      { name: "백아연", birth: [1991, 11, 11], gender: "f" },
      { name: "박지민(15&)", birth: [1997, 7, 5], gender: "f" },
      { name: "민서", birth: [1996, 1, 18], gender: "f" },
      { name: "헤이즈", birth: [1991, 8, 9], gender: "f" },
      { name: "유빈(원더걸스)", birth: [1988, 10, 4], gender: "f" },
      { name: "선예(원더걸스)", birth: [1989, 8, 12], gender: "f" },
    ];

    // 타겟 슬롯
    const targets = ['갑술-m','갑술-f','갑오-m','갑자-m','경신-m','계묘-m','계사-f','기미-m','기유-m','병신-f','병자-m','신유-m','을축-m','임자-m','정묘-m','정사-m'];

    console.log('\n=== 후보 일주 계산 ===\n');
    for (const c of candidates) {
      const ilju = getIlju(c.birth[0], c.birth[1], c.birth[2]);
      const slot = ilju + '-' + c.gender;
      const isTarget = targets.includes(slot);
      if (isTarget) {
        console.log('✅ HIT: ' + slot + ' ← ' + c.name + ' (' + c.birth.join('.') + ')');
      } else {
        console.log('   ' + slot + ' ← ' + c.name);
      }
    }
  });
});
