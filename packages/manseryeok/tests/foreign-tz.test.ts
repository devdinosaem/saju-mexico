import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function ilju(year: number, month: number, day: number, city?: string): string {
  const s = calculateSaju({ year, month, day, hour: 12, minute: 0, city });
  return STEM_KOREAN[s.fourPillars.day.stem] + BRANCH_KOREAN[s.fourPillars.day.branch];
}

describe('외국인 출생 도시 기준 일주 재측정', () => {
  it('정치인', () => {
    const people = [
      { name: '도널드 트럼프',   birth: [1946,  6, 14] as const, city: 'New York'     }, // Queens, NY
      { name: '버락 오바마',     birth: [1961,  8,  4] as const, city: 'Honolulu'     }, // Honolulu, HI
      { name: '조 바이든',       birth: [1942, 11, 20] as const, city: 'New York'     }, // Scranton, PA (UTC-5)
      { name: '키어 스타머',     birth: [1962,  9,  2] as const, city: 'London'       }, // Oxted, Surrey
      { name: '에마뉘엘 마크롱', birth: [1977, 12, 21] as const, city: 'Paris'        }, // Amiens
      { name: '올라프 숄츠',     birth: [1958,  6, 14] as const, city: 'Berlin'       }, // Osnabrück
      { name: '조르자 멜로니',   birth: [1977,  1, 15] as const, city: 'Rome'         }, // Rome
      { name: '시진핑',          birth: [1953,  6, 15] as const, city: 'Beijing'      }, // Beijing
      { name: '이시바 시게루',   birth: [1957,  2,  4] as const, city: 'Tokyo'        }, // Tottori
      { name: '저스틴 트뤼도',   birth: [1971, 12, 25] as const, city: 'Ottawa'       }, // Ottawa
      { name: '젤렌스키',        birth: [1978,  1, 25] as const, city: 'Kyiv'         }, // Kryvyi Rih
      { name: '나렌드라 모디',   birth: [1950,  9, 17] as const, city: 'Mumbai'       }, // Vadnagar, Gujarat
    ];

    run(people);
  });

  it('기업인', () => {
    const people = [
      { name: '스티브 잡스',     birth: [1955,  2, 24] as const, city: 'San Francisco' }, // San Francisco, CA
      { name: '일론 머스크',     birth: [1971,  6, 28] as const, city: 'Johannesburg'  }, // Pretoria
      { name: '제프 베이조스',   birth: [1964,  1, 12] as const, city: 'New York'      }, // Albuquerque → UTC-7, New York 근사
      { name: '마크 저커버그',   birth: [1984,  5, 14] as const, city: 'New York'      }, // White Plains, NY
      { name: '래리 페이지',     birth: [1973,  3, 26] as const, city: 'New York'      }, // East Lansing, MI (UTC-5)
      { name: '세르게이 브린',   birth: [1973,  8, 21] as const, city: 'Moscow'        }, // Moscow
      { name: '리드 헤이스팅스', birth: [1960, 10,  8] as const, city: 'New York'      }, // Boston, MA
      { name: '테드 사란도스',   birth: [1964,  7, 30] as const, city: 'Los Angeles'   }, // Phoenix, AZ (UTC-7 → LA 근사)
      { name: '팀 쿡',           birth: [1960, 11,  1] as const, city: 'Chicago'       }, // Mobile, AL (UTC-6)
      { name: '안디 재시',       birth: [1968,  1, 13] as const, city: 'New York'      }, // Scarsdale, NY
      { name: '순다르 피차이',   birth: [1972,  6, 10] as const, city: 'Mumbai'        }, // Chennai
      { name: '젠슨 황',         birth: [1963,  2, 17] as const, city: 'Shanghai'      }, // Tainan, Taiwan (UTC+8)
      { name: '손정의',          birth: [1957,  8, 11] as const, city: 'Tokyo'         }, // Saga Prefecture
      { name: '마윈',            birth: [1964,  9, 10] as const, city: 'Shanghai'      }, // Hangzhou
      { name: '장이밍',          birth: [1983,  4,  1] as const, city: 'Shanghai'      }, // Longyan, Fujian
      { name: '베르나르 아르노', birth: [1949,  3,  5] as const, city: 'Paris'         }, // Roubaix
      { name: '필 나이트',       birth: [1938,  2, 24] as const, city: 'San Francisco' }, // Portland, OR (UTC-8)
    ];

    run(people);
  });
});

function run(people: { name: string; birth: readonly [number, number, number]; city: string }[]) {
  let changed = 0;
  console.log('\n이름             기준(noon/KST)   현지도시 보정    변동');
  console.log('─'.repeat(58));
  for (const p of people) {
    const [y, m, d] = p.birth;
    const base  = ilju(y, m, d);
    const local = ilju(y, m, d, p.city);
    const diff  = base !== local;
    if (diff) changed++;
    console.log(`${p.name.padEnd(13)} ${base.padEnd(8)} → ${local.padEnd(8)} ${p.city.padEnd(15)} ${diff ? '⚠️ 달라짐' : '동일'}`);
  }
  console.log(`\n→ 변동 ${changed}건 / 총 ${people.length}명`);
}
