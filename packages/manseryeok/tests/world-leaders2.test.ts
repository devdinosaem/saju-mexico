import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function ilju(year: number, month: number, day: number, city: string): string {
  const s = calculateSaju({ year, month, day, hour: 12, minute: 0, city });
  return STEM_KOREAN[s.fourPillars.day.stem] + BRANCH_KOREAN[s.fourPillars.day.branch];
}

const TARGET = new Set(['무술','무오','신해','을사','임신']);

describe('빈 5개 일주 추가 탐색', () => {
  it('추가 세계 지도자', () => {
    const leaders = [
      // ── 중국 추가 ──
      { name: '저우언라이',          birth: [1898, 3,  5] as const, city: 'Beijing',       country: '중국 초대 총리',    gender: 'm' },
      { name: '후진타오',            birth: [1942, 12, 21] as const, city: 'Beijing',      country: '중국 전 주석',      gender: 'm' },
      { name: '리커창',              birth: [1955, 7,  29] as const, city: 'Beijing',      country: '중국 전 총리',      gender: 'm' },
      { name: '장쩌민',              birth: [1926, 8,  17] as const, city: 'Beijing',      country: '중국 전 주석',      gender: 'm' },

      // ── 독일 추가 ──
      { name: '빌리 브란트',         birth: [1913, 12, 18] as const, city: 'Berlin',       country: '독일 전 총리',      gender: 'm' },
      { name: '게르하르트 슈뢰더',   birth: [1944, 4,   7] as const, city: 'Berlin',       country: '독일 전 총리',      gender: 'm' },
      { name: '콘라트 아데나워',     birth: [1876, 1,   5] as const, city: 'Berlin',       country: '독일 초대 총리',    gender: 'm' },

      // ── 일본 추가 ──
      { name: '나카소네 야스히로',   birth: [1918, 5,  27] as const, city: 'Tokyo',        country: '일본 전 총리',      gender: 'm' },
      { name: '오부치 게이조',       birth: [1937, 6,  25] as const, city: 'Tokyo',        country: '일본 전 총리',      gender: 'm' },
      { name: '하토야마 유키오',     birth: [1947, 2,  11] as const, city: 'Tokyo',        country: '일본 전 총리',      gender: 'm' },
      { name: '노다 요시히코',       birth: [1957, 5,  20] as const, city: 'Tokyo',        country: '일본 전 총리',      gender: 'm' },
      { name: '스가 요시히데',       birth: [1948, 12,  6] as const, city: 'Tokyo',        country: '일본 전 총리',      gender: 'm' },
      { name: '후쿠다 야스오',       birth: [1936, 7,  16] as const, city: 'Tokyo',        country: '일본 전 총리',      gender: 'm' },
      { name: '아소 다로',           birth: [1940, 9,  20] as const, city: 'Tokyo',        country: '일본 전 총리',      gender: 'm' },

      // ── 영국 추가 ──
      { name: '해롤드 맥밀란',       birth: [1894, 2,  10] as const, city: 'London',       country: '영국 전 총리',      gender: 'm' },
      { name: '에드워드 히스',       birth: [1916, 7,   9] as const, city: 'London',       country: '영국 전 총리',      gender: 'm' },
      { name: '제임스 캘러핸',       birth: [1912, 3,  27] as const, city: 'London',       country: '영국 전 총리',      gender: 'm' },
      { name: '해롤드 윌슨',         birth: [1916, 3,  11] as const, city: 'London',       country: '영국 전 총리',      gender: 'm' },
      { name: '리시 수낙',           birth: [1980, 5,  12] as const, city: 'London',       country: '영국 전 총리',      gender: 'm' },
      { name: '테리사 메이',         birth: [1956, 10,  1] as const, city: 'London',       country: '영국 전 총리',      gender: 'f' },

      // ── 프랑스 추가 ──
      { name: '조르주 퐁피두',       birth: [1911, 7,   5] as const, city: 'Paris',        country: '프랑스 전 대통령',  gender: 'm' },
      { name: '발레리 지스카르 데스탱', birth: [1926, 2,  2] as const, city: 'Paris',      country: '프랑스 전 대통령',  gender: 'm' },
      { name: '프랑수아 미테랑',     birth: [1916, 10, 26] as const, city: 'Paris',        country: '프랑스 전 대통령',  gender: 'm' },

      // ── 이탈리아 추가 ──
      { name: '사르디니아 공화국...', birth: [1900, 1,  1] as const, city: 'Rome',         country: '이탈리아',          gender: 'm' },

      // ── 러시아 추가 ──
      { name: '니키타 흐루쇼프',     birth: [1894, 4,  15] as const, city: 'Moscow',       country: '소련 전 서기장',    gender: 'm' },
      { name: '레오니트 브레즈네프', birth: [1906, 12, 19] as const, city: 'Moscow',       country: '소련 전 서기장',    gender: 'm' },
      { name: '미하일 고르바초프',   birth: [1931, 3,   2] as const, city: 'Moscow',       country: '소련 초대 대통령',  gender: 'm' },
      { name: '유리 안드로포프',     birth: [1914, 6,  15] as const, city: 'Moscow',       country: '소련 전 서기장',    gender: 'm' },

      // ── 미국 추가 ──
      { name: '우드로 윌슨',         birth: [1856, 12, 28] as const, city: 'New York',     country: '미국 전 대통령',    gender: 'm' },
      { name: '해리 트루먼',         birth: [1884, 5,   8] as const, city: 'Chicago',      country: '미국 전 대통령',    gender: 'm' },
      { name: '린든 존슨',           birth: [1908, 8,  27] as const, city: 'Houston',      country: '미국 전 대통령',    gender: 'm' },
      { name: '조지 H.W. 부시',      birth: [1924, 6,  12] as const, city: 'New York',     country: '미국 전 대통령',    gender: 'm' },
      { name: '빌 클린턴',           birth: [1946, 8,  19] as const, city: 'Chicago',      country: '미국 전 대통령',    gender: 'm' },
      { name: '드와이트 아이젠하워', birth: [1890, 10, 14] as const, city: 'Chicago',      country: '미국 전 대통령',    gender: 'm' },
      { name: '리처드 닉슨',         birth: [1913, 1,   9] as const, city: 'Los Angeles',  country: '미국 전 대통령',    gender: 'm' },
      { name: '존 F. 케네디',        birth: [1917, 5,  29] as const, city: 'New York',     country: '미국 전 대통령',    gender: 'm' },
      { name: '지미 카터',           birth: [1924, 10,  1] as const, city: 'Chicago',      country: '미국 전 대통령',    gender: 'm' },
      { name: '링컨',                birth: [1809, 2,  12] as const, city: 'Chicago',      country: '미국 전 대통령',    gender: 'm' },

      // ── 멕시코 추가 ──
      { name: '엔리케 페냐 니에토',  birth: [1966, 7,  20] as const, city: 'Mexico City',  country: '멕시코 전 대통령',  gender: 'm' },
      { name: '펠리페 칼데론',       birth: [1962, 8,  18] as const, city: 'Mexico City',  country: '멕시코 전 대통령',  gender: 'm' },
      { name: '비센테 폭스',         birth: [1942, 7,   2] as const, city: 'Mexico City',  country: '멕시코 전 대통령',  gender: 'm' },

      // ── 호주 추가 ──
      { name: '줄리아 길라드',       birth: [1961, 9,  29] as const, city: 'Sydney',       country: '호주 전 총리',      gender: 'f' },
      { name: '말콤 턴불',           birth: [1954, 10, 24] as const, city: 'Sydney',       country: '호주 전 총리',      gender: 'm' },
      { name: '폴 키팅',             birth: [1944, 1,  18] as const, city: 'Sydney',       country: '호주 전 총리',      gender: 'm' },

      // ── 스페인 추가 ──
      { name: '페드로 산체스',       birth: [1972, 2,  29] as const, city: 'Madrid',       country: '스페인 총리',       gender: 'm' },
      { name: '호세 마리아 아스나르', birth: [1953, 2,  25] as const, city: 'Madrid',      country: '스페인 전 총리',    gender: 'm' },

      // ── 인도네시아 추가 ──
      { name: '메가와티 수카르노푸트리', birth: [1947, 1, 23] as const, city: 'Jakarta',   country: '인도네시아 전 대통령', gender: 'f' },
      { name: '수실로 밤방 유도요노', birth: [1949, 9,  9] as const, city: 'Jakarta',      country: '인도네시아 전 대통령', gender: 'm' },

      // ── 사우디 추가 ──
      { name: '파이살 빈 압둘아지즈', birth: [1906, 4, 14] as const, city: 'Riyadh',      country: '사우디 전 국왕',    gender: 'm' },

      // ── 튀르키예 추가 ──
      { name: '쉴레이만 데미렐',     birth: [1924, 11,  1] as const, city: 'Istanbul',     country: '튀르키예 전 대통령', gender: 'm' },
      { name: '뷜렌트 에제비트',     birth: [1925, 5,  28] as const, city: 'Istanbul',     country: '튀르키예 전 총리',  gender: 'm' },
      { name: '투르구트 외잘',       birth: [1927, 10, 13] as const, city: 'Istanbul',     country: '튀르키예 전 대통령', gender: 'm' },

      // ── 이스라엘 추가 ──
      { name: '다비드 벤구리온',     birth: [1886, 10, 16] as const, city: 'Tel Aviv',     country: '이스라엘 초대 총리', gender: 'm' },
      { name: '시몬 페레스',         birth: [1923, 8,   2] as const, city: 'Tel Aviv',     country: '이스라엘 전 대통령', gender: 'm' },
      { name: '골다 메이어',         birth: [1898, 5,   3] as const, city: 'Tel Aviv',     country: '이스라엘 전 총리',  gender: 'f' },

      // ── 스위스 추가 ──
      { name: '이냐치오 카시스',     birth: [1961, 4,   8] as const, city: 'Berlin',       country: '스위스 전 대통령',  gender: 'm' },

      // ── 폴란드 추가 ──
      { name: '레흐 카친스키',       birth: [1949, 6,  18] as const, city: 'Warsaw',       country: '폴란드 전 대통령',  gender: 'm' },
      { name: '브로니스와프 코모로프스키', birth: [1952, 6, 4] as const, city: 'Warsaw',    country: '폴란드 전 대통령',  gender: 'm' },

      // ── 아일랜드 추가 ──
      { name: '에아몬 드 발레라',    birth: [1882, 10, 14] as const, city: 'Dublin',       country: '아일랜드 초대 총리', gender: 'm' },
      { name: '버티 에이헌',         birth: [1951, 9,  12] as const, city: 'Dublin',       country: '아일랜드 전 총리',  gender: 'm' },

      // ── 싱가포르 추가 ──
      { name: '고촉통',              birth: [1941, 5,  20] as const, city: 'Singapore',    country: '싱가포르 전 총리',  gender: 'm' },

      // ── 아르헨티나 추가 ──
      { name: '후안 페론',           birth: [1895, 10,  8] as const, city: 'Buenos Aires', country: '아르헨티나 전 대통령', gender: 'm' },
      { name: '카를로스 메넴',       birth: [1930, 7,   2] as const, city: 'Buenos Aires', country: '아르헨티나 전 대통령', gender: 'm' },

      // ── 덴마크 추가 ──
      { name: '헬레 토르닝슈미트',   birth: [1966, 12, 14] as const, city: 'Copenhagen',   country: '덴마크 전 총리',    gender: 'f' },

      // ── 스웨덴 추가 ──
      { name: '잉바르 칼손',         birth: [1934, 11,  9] as const, city: 'Stockholm',    country: '스웨덴 전 총리',    gender: 'm' },
      { name: '칼 빌트',             birth: [1949, 7,  15] as const, city: 'Stockholm',    country: '스웨덴 전 총리',    gender: 'm' },

      // ── 노르웨이 추가 ──
      { name: '그로 할렘 브룬틀란',  birth: [1939, 4,  20] as const, city: 'Oslo',         country: '노르웨이 전 총리',  gender: 'f' },
      { name: '엘나 솔베르그',       birth: [1961, 2,  24] as const, city: 'Oslo',         country: '노르웨이 전 총리',  gender: 'f' },
    ];

    console.log('\n=== 추가 세계 지도자 일주 계산 (타깃: 무술/무오/신해/을사/임신) ===\n');
    console.log('성별 | 일주 | 이름 | 소속');
    console.log('─'.repeat(65));

    const hits: Record<string, { gender: string; name: string; country: string; birth: string }[]> = {};

    for (const p of leaders) {
      const [y, m, d] = p.birth;
      if (p.name.includes('사르디니아')) continue;
      const ij = ilju(y, m, d, p.city);
      const isTarget = TARGET.has(ij);
      if (isTarget) {
        console.log(`★ ${p.gender} | ${ij} | ${p.name} | ${p.country}`);
        if (!hits[ij]) hits[ij] = [];
        hits[ij].push({ gender: p.gender, name: p.name, country: p.country, birth: `${y}.${m}.${d}` });
      }
    }

    console.log('\n\n=== 타깃 일주 매칭 ===');
    for (const ij of Array.from(TARGET).sort()) {
      const h = hits[ij] || [];
      console.log(`${ij}: ${h.length > 0 ? h.map(x => `${x.name}(${x.gender})[${x.birth}]`).join(', ') : '없음'}`);
    }
  });
});
