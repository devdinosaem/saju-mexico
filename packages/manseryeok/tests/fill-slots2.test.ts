import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('빈 슬롯 2차', () => {
  it('계산', () => {
    const candidates = [
      // 갑술-m (아직 필요)
      { name: "이시언", birth: [1982, 6, 20], gender: "m" },
      { name: "김영철", birth: [1974, 9, 4], gender: "m" },
      { name: "송민호(WINNER)", birth: [1993, 3, 30], gender: "m" },
      { name: "이승훈(WINNER)", birth: [1992, 1, 11], gender: "m" },
      { name: "래퍼 지코", birth: [1992, 9, 14], gender: "m" },

      // 갑오-m (세븐틴 디노만)
      { name: "이현우", birth: [1993, 3, 23], gender: "m" },
      { name: "나인우", birth: [1995, 5, 31], gender: "m" },
      { name: "NCT 런쥔", birth: [2000, 3, 23], gender: "m" },
      { name: "정용화(CNBLUE)", birth: [1989, 6, 22], gender: "m" },
      { name: "이홍기(FT아일랜드)", birth: [1990, 3, 2], gender: "m" },

      // 갑자-m (신동엽만)
      { name: "배정남", birth: [1972, 3, 12], gender: "m" },
      { name: "장동건", birth: [1972, 3, 7], gender: "m" },
      { name: "이상민", birth: [1968, 1, 20], gender: "m" },
      { name: "나영석PD", birth: [1976, 1, 24], gender: "m" },

      // 경신-m (제프 베이조스만, 한국인 필요)
      { name: "이무진", birth: [1999, 10, 5], gender: "m" },
      { name: "폴킴", birth: [1988, 6, 9], gender: "m" },
      { name: "10cm 권정열", birth: [1985, 11, 16], gender: "m" },
      { name: "크러쉬", birth: [1992, 5, 3], gender: "m" },
      { name: "정승환", birth: [1996, 4, 26], gender: "m" },

      // 계사-f (티파니만)
      { name: "한승연(카라)", birth: [1988, 7, 24], gender: "f" },
      { name: "구구단 세정", birth: [1996, 8, 28], gender: "f" }, // already 정유?
      { name: "오마이걸 유아", birth: [1995, 9, 17], gender: "f" },
      { name: "러블리즈 류수정", birth: [1997, 11, 19], gender: "f" },
      { name: "스테이씨 시은", birth: [2001, 8, 1], gender: "f" },
      { name: "레드벨벳 예리", birth: [1999, 3, 5], gender: "f" }, // already 병진

      // 기유-m (이준혁만)
      { name: "이상엽", birth: [1973, 4, 19], gender: "m" },
      { name: "최시원(슈주)", birth: [1986, 4, 7], gender: "m" },
      { name: "이특(슈주)", birth: [1983, 7, 1], gender: "m" },
      { name: "슈퍼주니어 동해", birth: [1986, 10, 15], gender: "m" },
      { name: "슈퍼주니어 은혁", birth: [1986, 4, 4], gender: "m" },

      // 병신-f (조윤희만 — 더 유명한 여성 필요)
      { name: "박하선", birth: [1987, 10, 22], gender: "f" },
      { name: "오연수", birth: [1971, 3, 23], gender: "f" },
      { name: "고두심", birth: [1951, 5, 22], gender: "f" },
      { name: "이엘", birth: [1990, 10, 22], gender: "f" },
      { name: "정소민", birth: [1989, 3, 16], gender: "f" }, // already 을해?
      { name: "전혜진", birth: [1976, 12, 17], gender: "f" },
      { name: "유선", birth: [1975, 10, 17], gender: "f" },

      // 신유-m (송중기만)
      { name: "이상우", birth: [1981, 8, 6], gender: "m" },
      { name: "김명민", birth: [1972, 10, 7], gender: "m" },
      { name: "전지현남편김준수", birth: [1980, 1, 1], gender: "m" }, // skip
      { name: "지석진", birth: [1966, 2, 10], gender: "m" },
      { name: "김성균", birth: [1972, 6, 25], gender: "m" },

      // 임자-m (워렌 버핏만)
      { name: "이동국", birth: [1979, 4, 29], gender: "m" },
      { name: "차범근", birth: [1953, 5, 22], gender: "m" },
      { name: "김병현", birth: [1979, 5, 21], gender: "m" },
      { name: "이천수", birth: [1981, 7, 9], gender: "m" },
      { name: "안정환", birth: [1976, 1, 27], gender: "m" }, // already 무인?
      { name: "이영표", birth: [1977, 4, 23], gender: "m" },
      { name: "기성용", birth: [1989, 1, 24], gender: "m" },
      { name: "황희찬", birth: [1996, 1, 26], gender: "m" },
      { name: "이강인", birth: [2001, 2, 19], gender: "m" },

      // 정묘-m (니키만)
      { name: "박재범", birth: [1987, 4, 25], gender: "m" },
      { name: "사이먼 도미닉", birth: [1984, 3, 9], gender: "m" },
      { name: "그레이", birth: [1986, 12, 8], gender: "m" },
      { name: "우원재", birth: [1997, 6, 4], gender: "m" },
      { name: "pH-1", birth: [1989, 9, 19], gender: "m" },
    ];

    const targets = ['갑술-m','갑오-m','갑자-m','경신-m','계사-f','기유-m','병신-f','신유-m','임자-m','정묘-m'];

    console.log('\n=== 2차 후보 ===\n');
    for (const c of candidates) {
      const ilju = getIlju(c.birth[0], c.birth[1], c.birth[2]);
      const slot = ilju + '-' + c.gender;
      const isTarget = targets.includes(slot);
      if (isTarget) {
        console.log('✅ HIT: ' + slot + ' ← ' + c.name + ' (' + c.birth.join('.') + ')');
      }
    }
  });
});
