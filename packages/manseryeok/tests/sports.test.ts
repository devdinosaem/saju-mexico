import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('스포츠 선수 일주', () => {
  it('배치 계산', () => {
    const athletes = [
      // 한국 축구
      { name: "이강인", birth: [2001, 2, 19], sport: "축구", gender: "m" },
      { name: "김민재", birth: [1996, 11, 15], sport: "축구", gender: "m" },
      { name: "황희찬", birth: [1996, 1, 26], sport: "축구", gender: "m" },
      { name: "차범근", birth: [1953, 5, 22], sport: "축구", gender: "m" },
      { name: "박주영", birth: [1985, 7, 10], sport: "축구", gender: "m" },
      { name: "기성용", birth: [1989, 1, 24], sport: "축구", gender: "m" },
      { name: "이청용", birth: [1988, 7, 2], sport: "축구", gender: "m" },
      { name: "황의조", birth: [1992, 8, 28], sport: "축구", gender: "m" },
      { name: "조규성", birth: [1998, 1, 25], sport: "축구", gender: "m" },

      // 한국 야구
      { name: "박찬호", birth: [1973, 6, 29], sport: "야구", gender: "m" },
      { name: "이승엽", birth: [1976, 8, 18], sport: "야구", gender: "m" },
      { name: "김광현", birth: [1988, 7, 22], sport: "야구", gender: "m" },
      { name: "양현종", birth: [1988, 3, 1], sport: "야구", gender: "m" },

      // 한국 골프
      { name: "박세리", birth: [1977, 9, 28], sport: "골프", gender: "f" },
      { name: "박인비", birth: [1988, 7, 12], sport: "골프", gender: "f" },
      { name: "고진영", birth: [1995, 7, 7], sport: "골프", gender: "f" },
      { name: "전인지", birth: [1994, 8, 2], sport: "골프", gender: "f" },
      { name: "임성재", birth: [1998, 7, 11], sport: "골프", gender: "m" },

      // 한국 수영
      { name: "박태환", birth: [1989, 9, 27], sport: "수영", gender: "m" },
      { name: "황선우", birth: [2003, 5, 21], sport: "수영", gender: "m" },

      // 한국 MMA
      { name: "추성훈", birth: [1975, 7, 30], sport: "MMA", gender: "m" },
      { name: "정찬성", birth: [1987, 3, 17], sport: "MMA", gender: "m" },

      // 한국 e스포츠
      { name: "페이커(이상혁)", birth: [1996, 5, 7], sport: "e스포츠", gender: "m" },

      // 한국 쇼트트랙
      { name: "최민정", birth: [1998, 1, 16], sport: "쇼트트랙", gender: "f" },
      { name: "심석희", birth: [1997, 6, 21], sport: "쇼트트랙", gender: "f" },

      // 한국 피겨 — 김연아 이미 있음

      // 해외 축구
      { name: "지네딘 지단", birth: [1972, 6, 23], sport: "축구", gender: "m" },
      { name: "호나우지뉴", birth: [1980, 3, 21], sport: "축구", gender: "m" },

      // 해외 농구
      { name: "야니스 아데토쿤보", birth: [1994, 12, 6], sport: "농구", gender: "m" },

      // 해외 테니스
      { name: "세레나 윌리엄스", birth: [1981, 9, 26], sport: "테니스", gender: "f" },
      { name: "나오미 오사카", birth: [1997, 10, 16], sport: "테니스", gender: "f" },

      // 해외 F1
      { name: "루이스 해밀턴", birth: [1985, 1, 7], sport: "F1", gender: "m" },
      { name: "막스 페르스타펜", birth: [1997, 9, 30], sport: "F1", gender: "m" },

      // 해외 MMA
      { name: "코너 맥그리거", birth: [1988, 7, 14], sport: "MMA", gender: "m" },
      { name: "매니 파퀴아오", birth: [1978, 12, 17], sport: "MMA", gender: "m" },
      { name: "플로이드 메이웨더", birth: [1977, 2, 24], sport: "MMA", gender: "m" },

      // 해외 수영
      { name: "마이클 펠프스", birth: [1985, 6, 30], sport: "수영", gender: "m" },

      // 해외 육상
      { name: "우사인 볼트", birth: [1986, 8, 21], sport: "육상", gender: "m" },
    ];

    console.log('\n=== 스포츠 선수 일주 ===\n');
    for (const a of athletes) {
      const ilju = getIlju(a.birth[0], a.birth[1], a.birth[2]);
      console.log(a.gender + ' | ' + ilju + ' | ' + a.name + ' | ' + a.sport);
    }
  });
});
