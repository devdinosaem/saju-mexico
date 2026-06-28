import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number, city?: string): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0, city });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

// 정사 집중 탐색 - 더 많은 유명인
const candidates = [
  // 더 많은 후보들
  { name: '제임스 카메론', birth: [1954,8,16], city: 'Kapuskasing' },
  { name: '스티븐 스필버그', birth: [1946,12,18], city: 'Cincinnati' },
  { name: '크리스토퍼 놀란', birth: [1970,7,30], city: 'London' },
  { name: '마틴 스코세이지', birth: [1942,11,17], city: 'New York' },
  { name: '쿠엔틴 타란티노', birth: [1963,3,27], city: 'Knoxville' },
  { name: '리들리 스콧', birth: [1937,11,30], city: 'South Shields' },
  { name: '스탠리 큐브릭', birth: [1928,7,26], city: 'New York' },
  { name: '알프레드 히치콕', birth: [1899,8,13], city: 'London' },
  { name: '찰리 채플린', birth: [1889,4,16], city: 'London' },
  { name: '오드리 햅번', birth: [1929,5,4], city: 'Ixelles' },
  { name: '그레타 가르보', birth: [1905,9,18], city: 'Stockholm' },
  { name: '험프리 보가트', birth: [1899,12,25], city: 'New York' },
  { name: '말론 브란도', birth: [1924,4,3], city: 'Omaha' },
  { name: '알 파치노', birth: [1940,4,25], city: 'New York' },
  { name: '잭 니콜슨', birth: [1937,4,22], city: 'Neptune City' },
  { name: '더스틴 호프만', birth: [1937,8,8], city: 'Los Angeles' },
  { name: '로버트 드 니로', birth: [1943,8,17], city: 'New York' },
  { name: '모건 프리먼', birth: [1937,6,1], city: 'Memphis' },
  { name: '덴젤 워싱턴', birth: [1954,12,28], city: 'Mount Vernon' },
  { name: '해리슨 포드', birth: [1942,7,13], city: 'Chicago' },
  { name: '클린트 이스트우드', birth: [1930,5,31], city: 'San Francisco' },
  { name: '실베스터 스탤론', birth: [1946,7,6], city: 'New York' },
  { name: '아놀드 슈워제네거', birth: [1947,7,30], city: 'Thal' },
  { name: '브루스 윌리스', birth: [1955,3,19], city: 'Idar-Oberstein' },
  { name: '니콜라스 케이지', birth: [1964,1,7], city: 'Long Beach' },
  { name: '앤서니 홉킨스', birth: [1937,12,31], city: 'Port Talbot' },
  { name: '피어스 브로스넌', birth: [1953,5,16], city: 'Drogheda' },
  { name: '숀 코너리', birth: [1930,8,25], city: 'Edinburgh' },
  { name: '다니엘 크레이그', birth: [1968,3,2], city: 'Chester' },
  { name: '조지 클루니', birth: [1961,5,6], city: 'Lexington' },
  { name: '맷 데이먼', birth: [1970,10,8], city: 'Cambridge' },
  { name: '벤 애플렉', birth: [1972,8,15], city: 'Berkeley' },
  { name: '휴 잭맨', birth: [1968,10,12], city: 'Sydney' },
  { name: '콜린 퍼스', birth: [1960,9,10], city: 'Grayshott' },
  { name: '베네딕트 컴버배치', birth: [1976,7,19], city: 'London' },
  { name: '이드리스 엘바', birth: [1972,9,6], city: 'London' },
  { name: '크리스찬 베일', birth: [1974,1,30], city: 'Haverfordwest' },
  { name: '조쉬 브롤린', birth: [1968,2,12], city: 'Santa Monica' },
  { name: '에반 피터스', birth: [1987,1,20], city: 'Saint Louis' },
  // 음악
  { name: '밥 말리', birth: [1945,2,6], city: 'Nine Mile' },
  { name: '지미 헨드릭스', birth: [1942,11,27], city: 'Seattle' },
  { name: '에릭 클랩튼', birth: [1945,3,30], city: 'Ripley' },
  { name: '믹 재거', birth: [1943,7,26], city: 'Dartford' },
  { name: '키스 리처즈', birth: [1943,12,18], city: 'Dartford' },
  { name: '로버트 플랜트', birth: [1948,8,20], city: 'West Bromwich' },
  { name: '지미 페이지', birth: [1944,1,9], city: 'Heston' },
  { name: '로저 워터스', birth: [1943,9,6], city: 'Great Bookham' },
  { name: '브라이언 메이', birth: [1947,7,19], city: 'Hampton' },
  { name: '로저 테일러', birth: [1949,7,26], city: 'King\'s Lynn' },
  { name: '엘튼 존', birth: [1947,3,25], city: 'Pinner' },
  { name: '데이빗 보위', birth: [1947,1,8], city: 'London' },
  { name: '스팅', birth: [1951,10,2], city: 'Wallsend' },
  { name: '브루스 스프링스틴', birth: [1949,9,23], city: 'Long Branch' },
  { name: '빌리 조엘', birth: [1949,5,9], city: 'Bronx' },
  // 기업인 추가
  { name: '래리 엘리슨', birth: [1944,8,17], city: 'New York' },
  { name: '마이클 델', birth: [1965,2,23], city: 'Houston' },
  { name: '샘 올트먼', birth: [1985,4,22], city: 'Chicago' },
  { name: '피터 틸', birth: [1967,10,11], city: 'Frankfurt' },
  { name: '리드 호프먼', birth: [1967,8,5], city: 'Stanford' },
  { name: '수전 워치츠키', birth: [1968,7,5], city: 'Santa Clara' },
  { name: '셰릴 샌드버그', birth: [1969,8,28], city: 'Washington' },
  { name: '잭 도시', birth: [1976,11,19], city: 'Saint Louis' },
  { name: '브라이언 체스키', birth: [1981,8,29], city: 'Niskayuna' },
  { name: '휘트니 울프 허드', birth: [1989,7,1], city: 'Salt Lake City' },
  { name: '앤드루 카네기', birth: [1835,11,25], city: 'Dunfermline' },
  { name: '존 D 록펠러', birth: [1839,7,8], city: 'Richford' },
  { name: '존 피어폰트 모건', birth: [1837,4,17], city: 'Hartford' },
  { name: '코넬리우스 밴더빌트', birth: [1794,5,27], city: 'Staten Island' },
  { name: '헨리 포드', birth: [1863,7,30], city: 'Wayne County' },
  { name: '앤드루 멜론', birth: [1855,3,24], city: 'Pittsburgh' },
  { name: '월트 디즈니', birth: [1901,12,5], city: 'Chicago' },
];

const target = new Set(['정사']);

describe('정사 탐색', () => {
  it('matches', () => {
    for (const c of candidates) {
      try {
        const ilju = getIlju(c.birth[0], c.birth[1], c.birth[2], c.city);
        if (target.has(ilju)) {
          console.log(ilju + '\t' + c.name + '\t' + c.birth.join('.'));
        }
      } catch(e) {}
    }
  });
});
