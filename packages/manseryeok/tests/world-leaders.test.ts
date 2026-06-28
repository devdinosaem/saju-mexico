import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function ilju(year: number, month: number, day: number, city: string): string {
  const s = calculateSaju({ year, month, day, hour: 12, minute: 0, city });
  return STEM_KOREAN[s.fourPillars.day.stem] + BRANCH_KOREAN[s.fourPillars.day.branch];
}

// 현재 R0 없는 20개 일주
const EMPTY_ILJU = new Set([
  '갑술','계미','계사','기유','무술','무오','무자',
  '병신','병자','신사','신해','을묘','을사',
  '임신','임오','임인','임진','정묘','정미','정해'
]);

describe('세계 경제력 상위 30개국 전·현직 정상 일주 (한국 제외)', () => {
  it('계산 및 빈 일주 매칭', () => {
    const leaders = [
      // ── 미국 ──
      { name: '빌 클린턴',        birth: [1946,  8, 19] as const, city: 'Chicago',       country: '미국 전 대통령',    gender: 'm' },
      { name: '조지 W 부시',      birth: [1946,  7,  6] as const, city: 'New York',      country: '미국 전 대통령',    gender: 'm' },
      { name: '로널드 레이건',    birth: [1911,  2,  6] as const, city: 'Chicago',       country: '미국 전 대통령',    gender: 'm' },
      { name: '조 바이든',        birth: [1942, 11, 20] as const, city: 'New York',      country: '미국 전 대통령',    gender: 'm' },
      { name: '링컨',             birth: [1809,  2, 12] as const, city: 'Chicago',       country: '미국 전 대통령',    gender: 'm' },
      { name: '프랭클린 루스벨트',birth: [1882,  1, 30] as const, city: 'New York',      country: '미국 전 대통령',    gender: 'm' },
      { name: '지미 카터',        birth: [1924, 10,  1] as const, city: 'Chicago',       country: '미국 전 대통령',    gender: 'm' },
      { name: '리처드 닉슨',      birth: [1913,  1,  9] as const, city: 'Los Angeles',   country: '미국 전 대통령',    gender: 'm' },
      { name: '존 F 케네디',      birth: [1917,  5, 29] as const, city: 'New York',      country: '미국 전 대통령',    gender: 'm' },
      { name: '드와이트 아이젠하워', birth: [1890, 10, 14] as const, city: 'Chicago',    country: '미국 전 대통령',    gender: 'm' },

      // ── 중국 ──
      { name: '마오쩌둥',         birth: [1893, 12, 26] as const, city: 'Shanghai',      country: '중국 전 주석',      gender: 'm' },
      { name: '덩샤오핑',         birth: [1904,  8, 22] as const, city: 'Shanghai',      country: '중국 전 최고지도자', gender: 'm' },
      { name: '장쩌민',           birth: [1926,  8, 17] as const, city: 'Shanghai',      country: '중국 전 주석',      gender: 'm' },
      { name: '후진타오',         birth: [1942, 12, 21] as const, city: 'Shanghai',      country: '중국 전 주석',      gender: 'm' },
      { name: '리커창',           birth: [1955,  7, 29] as const, city: 'Shanghai',      country: '중국 전 총리',      gender: 'm' },

      // ── 독일 ──
      { name: '앙겔라 메르켈',    birth: [1954,  7, 17] as const, city: 'Berlin',        country: '독일 전 총리',      gender: 'f' },
      { name: '헬무트 콜',        birth: [1930,  4,  3] as const, city: 'Berlin',        country: '독일 전 총리',      gender: 'm' },
      { name: '프리드리히 메르츠', birth: [1955, 11, 11] as const, city: 'Berlin',       country: '독일 총리',         gender: 'm' },

      // ── 일본 ──
      { name: '아베 신조',        birth: [1954,  9, 21] as const, city: 'Tokyo',         country: '일본 전 총리',      gender: 'm' },
      { name: '기시다 후미오',    birth: [1957,  7, 29] as const, city: 'Tokyo',         country: '일본 전 총리',      gender: 'm' },
      { name: '고이즈미 준이치로',birth: [1942,  1,  8] as const, city: 'Tokyo',         country: '일본 전 총리',      gender: 'm' },

      // ── 인도 ──
      { name: '나렌드라 모디',    birth: [1950,  9, 17] as const, city: 'Mumbai',        country: '인도 총리',         gender: 'm' },
      { name: '인디라 간디',      birth: [1917, 11, 19] as const, city: 'Mumbai',        country: '인도 전 총리',      gender: 'f' },
      { name: '자와할랄 네루',    birth: [1889, 11, 14] as const, city: 'Mumbai',        country: '인도 초대 총리',    gender: 'm' },

      // ── 영국 ──
      { name: '마거릿 대처',      birth: [1925, 10, 13] as const, city: 'London',        country: '영국 전 총리',      gender: 'f' },
      { name: '토니 블레어',      birth: [1953,  5,  6] as const, city: 'London',        country: '영국 전 총리',      gender: 'm' },
      { name: '윈스턴 처칠',      birth: [1874, 11, 30] as const, city: 'London',        country: '영국 전 총리',      gender: 'm' },
      { name: '고든 브라운',      birth: [1951,  2, 20] as const, city: 'London',        country: '영국 전 총리',      gender: 'm' },
      { name: '보리스 존슨',      birth: [1964,  6, 19] as const, city: 'New York',      country: '영국 전 총리',      gender: 'm' },

      // ── 프랑스 ──
      { name: '샤를 드골',        birth: [1890, 11, 22] as const, city: 'Paris',         country: '프랑스 전 대통령',  gender: 'm' },
      { name: '니콜라 사르코지',  birth: [1955,  1, 28] as const, city: 'Paris',         country: '프랑스 전 대통령',  gender: 'm' },
      { name: '프랑수아 올랑드',  birth: [1954,  8, 12] as const, city: 'Paris',         country: '프랑스 전 대통령',  gender: 'm' },
      { name: '자크 시라크',      birth: [1932, 11, 29] as const, city: 'Paris',         country: '프랑스 전 대통령',  gender: 'm' },

      // ── 이탈리아 ──
      { name: '마리오 드라기',    birth: [1947,  9,  3] as const, city: 'Rome',          country: '이탈리아 전 총리',  gender: 'm' },
      { name: '실비오 베를루스코니', birth: [1936,  9, 29] as const, city: 'Rome',       country: '이탈리아 전 총리',  gender: 'm' },
      { name: '로마노 프로디',    birth: [1939,  8,  9] as const, city: 'Rome',          country: '이탈리아 전 총리',  gender: 'm' },

      // ── 브라질 ──
      { name: '룰라 다 시우바',   birth: [1945, 10, 27] as const, city: 'São Paulo',     country: '브라질 대통령',     gender: 'm' },
      { name: '자이르 보우소나루', birth: [1955, 3,  21] as const, city: 'São Paulo',    country: '브라질 전 대통령',  gender: 'm' },
      { name: '페르난도 카르도주', birth: [1931,  6, 18] as const, city: 'São Paulo',    country: '브라질 전 대통령',  gender: 'm' },
      { name: '지우마 호세프',    birth: [1947, 12, 14] as const, city: 'São Paulo',     country: '브라질 전 대통령',  gender: 'f' },

      // ── 캐나다 ──
      { name: '마크 카니',        birth: [1965,  3,  2] as const, city: 'Ottawa',        country: '캐나다 총리',       gender: 'm' },
      { name: '스티브 하퍼',      birth: [1959,  4, 30] as const, city: 'Toronto',       country: '캐나다 전 총리',    gender: 'm' },
      { name: '장 크레티앵',      birth: [1934,  1, 11] as const, city: 'Ottawa',        country: '캐나다 전 총리',    gender: 'm' },

      // ── 러시아 ──
      { name: '블라디미르 푸틴',  birth: [1952, 10,  7] as const, city: 'Moscow',        country: '러시아 대통령',     gender: 'm' },
      { name: '드미트리 메드베데프', birth: [1965, 9, 14] as const, city: 'Moscow',      country: '러시아 전 대통령',  gender: 'm' },
      { name: '보리스 옐친',      birth: [1931,  2,  1] as const, city: 'Moscow',        country: '러시아 전 대통령',  gender: 'm' },
      { name: '레닌',             birth: [1870,  4, 22] as const, city: 'Moscow',        country: '소련 초대 지도자',  gender: 'm' },
      { name: '스탈린',           birth: [1878, 12, 18] as const, city: 'Moscow',        country: '소련 전 지도자',    gender: 'm' },

      // ── 멕시코 ──
      { name: '클라우디아 셰인바움', birth: [1962, 6, 24] as const, city: 'Mexico City', country: '멕시코 대통령',    gender: 'f' },
      { name: '안드레스 마누엘 로페스 오브라도르', birth: [1953, 11, 13] as const, city: 'Mexico City', country: '멕시코 전 대통령', gender: 'm' },

      // ── 호주 ──
      { name: '앤서니 앨버니지',  birth: [1963,  3,  2] as const, city: 'Sydney',        country: '호주 총리',         gender: 'm' },
      { name: '스콧 모리슨',      birth: [1968,  5, 13] as const, city: 'Sydney',        country: '호주 전 총리',      gender: 'm' },
      { name: '존 하워드',        birth: [1939,  7, 26] as const, city: 'Sydney',        country: '호주 전 총리',      gender: 'm' },
      { name: '케빈 러드',        birth: [1957,  9, 21] as const, city: 'Sydney',        country: '호주 전 총리',      gender: 'm' },

      // ── 스페인 ──
      { name: '마리아노 라호이',  birth: [1955,  3, 27] as const, city: 'Madrid',        country: '스페인 전 총리',    gender: 'm' },
      { name: '호세 사파테로',    birth: [1960,  8,  4] as const, city: 'Madrid',        country: '스페인 전 총리',    gender: 'm' },

      // ── 인도네시아 ──
      { name: '프라보워 수비안토', birth: [1951, 10, 17] as const, city: 'Jakarta',      country: '인도네시아 대통령', gender: 'm' },
      { name: '조코 위도도',      birth: [1961,  6, 21] as const, city: 'Jakarta',       country: '인도네시아 전 대통령', gender: 'm' },
      { name: '수하르토',         birth: [1921,  6,  8] as const, city: 'Jakarta',       country: '인도네시아 전 대통령', gender: 'm' },

      // ── 네덜란드 ──
      { name: '마르크 뤼터',      birth: [1967,  2, 14] as const, city: 'Amsterdam',     country: '네덜란드 전 총리',  gender: 'm' },
      { name: '딕 스코프',        birth: [1967,  7, 13] as const, city: 'Amsterdam',     country: '네덜란드 총리',     gender: 'm' },

      // ── 사우디아라비아 ──
      { name: '무함마드 빈 살만', birth: [1985,  8, 31] as const, city: 'Riyadh',        country: '사우디 왕세자',     gender: 'm' },
      { name: '살만 빈 압둘아지즈', birth: [1935, 12, 31] as const, city: 'Riyadh',      country: '사우디 국왕',       gender: 'm' },

      // ── 튀르키예 ──
      { name: '레제프 타이이프 에르도안', birth: [1954, 2, 26] as const, city: 'Istanbul', country: '튀르키예 대통령', gender: 'm' },
      { name: '무스타파 케말 아타튀르크', birth: [1881, 5, 19] as const, city: 'Istanbul', country: '튀르키예 초대 대통령', gender: 'm' },

      // ── 폴란드 ──
      { name: '도날트 투스크',    birth: [1957,  4, 22] as const, city: 'Warsaw',        country: '폴란드 총리',       gender: 'm' },
      { name: '안제이 두다',      birth: [1972,  5, 16] as const, city: 'Kraków',        country: '폴란드 대통령',     gender: 'm' },
      { name: '레흐 바웬사',      birth: [1943,  9, 29] as const, city: 'Warsaw',        country: '폴란드 전 대통령',  gender: 'm' },

      // ── 아르헨티나 ──
      { name: '하비에르 밀레이',  birth: [1970, 10, 22] as const, city: 'Buenos Aires',  country: '아르헨티나 대통령', gender: 'm' },
      { name: '크리스티나 페르난데스', birth: [1953, 2, 19] as const, city: 'Buenos Aires', country: '아르헨티나 전 대통령', gender: 'f' },

      // ── 스웨덴 ──
      { name: '울프 크리스테르손', birth: [1963, 12, 18] as const, city: 'Stockholm',    country: '스웨덴 총리',       gender: 'm' },
      { name: '스테판 뢰벤',      birth: [1957,  7, 21] as const, city: 'Stockholm',     country: '스웨덴 전 총리',    gender: 'm' },

      // ── 벨기에 ──
      { name: '알렉산더 드 크로', birth: [1975, 11,  3] as const, city: 'Brussels',      country: '벨기에 전 총리',   gender: 'm' },
      { name: '샤를 미셸',        birth: [1975, 12, 21] as const, city: 'Brussels',      country: '벨기에 전 총리',   gender: 'm' },

      // ── 노르웨이 ──
      { name: '요나스 가르 스퇴레', birth: [1960, 8, 25] as const, city: 'Oslo',         country: '노르웨이 총리',     gender: 'm' },
      { name: '에르나 솔베르그',  birth: [1961,  2, 24] as const, city: 'Oslo',          country: '노르웨이 전 총리',  gender: 'f' },

      // ── 아랍에밀리트 ──
      { name: '무함마드 빈 자이드', birth: [1961, 3, 30] as const, city: 'Abu Dhabi',    country: 'UAE 대통령',        gender: 'm' },

      // ── 이스라엘 ──
      { name: '베냐민 네타냐후',  birth: [1949, 10, 21] as const, city: 'Tel Aviv',      country: '이스라엘 총리',     gender: 'm' },
      { name: '이츠하크 라빈',    birth: [1922,  3,  1] as const, city: 'Tel Aviv',      country: '이스라엘 전 총리',  gender: 'm' },

      // ── 아일랜드 ──
      { name: '미홀 마틴',        birth: [1960,  8,  1] as const, city: 'Dublin',        country: '아일랜드 총리',     gender: 'm' },
      { name: '레오 버라드커',    birth: [1979,  1, 18] as const, city: 'Dublin',        country: '아일랜드 전 총리',  gender: 'm' },

      // ── 싱가포르 ──
      { name: '로렌스 웡',        birth: [1972, 12, 18] as const, city: 'Singapore',     country: '싱가포르 총리',     gender: 'm' },
      { name: '리셴룽',           birth: [1952,  2, 10] as const, city: 'Singapore',     country: '싱가포르 전 총리',  gender: 'm' },
      { name: '리콴유',           birth: [1923,  9, 16] as const, city: 'Singapore',     country: '싱가포르 건국 총리', gender: 'm' },

      // ── 덴마크 ──
      { name: '메테 프레데릭센',  birth: [1977, 11, 19] as const, city: 'Copenhagen',    country: '덴마크 총리',       gender: 'f' },
      { name: '라르스 뢰케 라스무센', birth: [1964, 5, 26] as const, city: 'Copenhagen', country: '덴마크 전 총리',    gender: 'm' },
    ];

    const matched: Record<string, { gender: string; name: string; country: string; birth: string }[]> = {};

    console.log('\n=== 세계 정상 일주 계산 ===\n');
    console.log('성별 | 일주 | 이름 | 소속 | 빈슬롯?');
    console.log('─'.repeat(70));

    for (const p of leaders) {
      const [y, m, d] = p.birth;
      const ij = ilju(y, m, d, p.city);
      const isEmpty = EMPTY_ILJU.has(ij);
      console.log(`${p.gender} | ${ij} | ${p.name} | ${p.country} | ${isEmpty ? '★ 빈 슬롯!' : ''}`);
      if (isEmpty) {
        if (!matched[ij]) matched[ij] = [];
        matched[ij].push({ gender: p.gender, name: p.name, country: p.country, birth: `${y}.${m}.${d}` });
      }
    }

    console.log('\n\n=== 빈 일주 매칭 결과 ===\n');
    for (const ij of Array.from(EMPTY_ILJU).sort()) {
      const hits = matched[ij] || [];
      console.log(`${ij}: ${hits.length > 0 ? hits.map(h => `${h.name}(${h.gender}) [${h.birth}]`).join(', ') : '없음'}`);
    }
  });
});
