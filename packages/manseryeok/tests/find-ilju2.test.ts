import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number, city?: string): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0, city });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

const candidates = [
  // 더 많은 후보들 - 병오, 정사 집중
  { name: '스티브 잡스', birth: [1955,2,24], city: 'San Francisco' },
  { name: '버락 오바마', birth: [1961,8,4], city: 'Honolulu' },
  { name: '빌 게이츠', birth: [1955,10,28], city: 'Seattle' },
  { name: '마더 테레사', birth: [1910,8,26], city: 'Skopje' },
  { name: '아이작 뉴턴', birth: [1643,1,4], city: 'Woolsthorpe' },
  { name: '다윈', birth: [1809,2,12], city: 'Shrewsbury' },
  { name: '갈릴레오', birth: [1564,2,15], city: 'Pisa' },
  { name: '미켈란젤로', birth: [1475,3,6], city: 'Caprese Michelangelo' },
  { name: '나폴레옹', birth: [1769,8,15], city: 'Ajaccio' },
  { name: '히틀러', birth: [1889,4,20], city: 'Braunau am Inn' },
  { name: '프란치스코 교황', birth: [1936,12,17], city: 'Buenos Aires' },
  { name: '엘리자베스 2세', birth: [1926,4,21], city: 'London' },
  { name: '찰스 3세', birth: [1948,11,14], city: 'London' },
  { name: '다이애나 왕세자비', birth: [1961,7,1], city: 'Sandringham' },
  { name: '마거릿 대처', birth: [1925,10,13], city: 'Grantham' },
  { name: '토니 블레어', birth: [1953,5,6], city: 'Edinburgh' },
  { name: '고르바초프', birth: [1931,3,2], city: 'Privolnoye' },
  { name: '마오쩌둥', birth: [1893,12,26], city: 'Shaoshan' },
  { name: '덩샤오핑', birth: [1904,8,22], city: 'Guang\'an' },
  { name: '간디 인디라', birth: [1917,11,19], city: 'Allahabad' },
  { name: '문재인', birth: [1953,1,24], city: 'Geoje' },
  { name: '박근혜', birth: [1952,2,2], city: 'Seoul' },
  { name: '이명박', birth: [1941,12,19], city: 'Osaka' },
  { name: '김대중', birth: [1924,1,6], city: 'Sinan' },
  { name: '노무현', birth: [1946,9,1], city: 'Gimhae' },
  // 스포츠
  { name: '노바크 조코비치', birth: [1987,5,22], city: 'Belgrade' },
  { name: '나달', birth: [1986,6,3], city: 'Manacor' },
  { name: '킬리안 음바페', birth: [1998,12,20], city: 'Paris' },
  { name: '엘링 홀란', birth: [2000,7,21], city: 'Leeds' },
  { name: '네이마르', birth: [1992,2,5], city: 'Mogi das Cruzes' },
  { name: '호나우지뉴', birth: [1980,3,21], city: 'Porto Alegre' },
  { name: '루이스 해밀턴', birth: [1985,1,7], city: 'Stevenage' },
  { name: '막스 페르스타펜', birth: [1997,9,30], city: 'Hasselt' },
  { name: '타이슨', birth: [1966,6,30], city: 'Brooklyn' },
  { name: '콜로 달러', birth: [2005,7,4], city: 'Paris' },
  // 연예  
  { name: '프린스', birth: [1958,6,7], city: 'Minneapolis' },
  { name: '데이비드 보위', birth: [1947,1,8], city: 'London' },
  { name: '짐 모리슨', birth: [1943,12,8], city: 'Melbourne' },
  { name: '커트 코베인', birth: [1967,2,20], city: 'Aberdeen' },
  { name: '밥 딜런', birth: [1941,5,24], city: 'Duluth' },
  { name: '브루스 리', birth: [1940,11,27], city: 'San Francisco' },
  { name: '재키 챈', birth: [1954,4,7], city: 'Victoria Peak' },
  { name: '이소룡', birth: [1940,11,27], city: 'San Francisco' },
  { name: '메릴 스트립', birth: [1949,6,22], city: 'Summit' },
  { name: '케이트 블란쳇', birth: [1969,5,14], city: 'Ivanhoe' },
  { name: '케이트 윈슬렛', birth: [1975,10,5], city: 'Reading' },
  { name: '나탈리 포트만', birth: [1981,6,9], city: 'Jerusalem' },
  { name: '샤를리즈 테론', birth: [1975,8,7], city: 'Benoni' },
  { name: '페넬로페 크루즈', birth: [1974,4,28], city: 'Madrid' },
  { name: '소피아 로렌', birth: [1934,9,20], city: 'Rome' },
  { name: '그레이스 켈리', birth: [1929,11,12], city: 'Philadelphia' },
  // 조선왕
  { name: '태조 이성계', birth: [1335,10,27], city: 'Seoul' },
  { name: '정종', birth: [1357,7,1], city: 'Seoul' },
  { name: '태종', birth: [1367,5,16], city: 'Seoul' },
  { name: '세종', birth: [1397,5,7], city: 'Seoul' },
  { name: '세조', birth: [1417,11,2], city: 'Seoul' },
  { name: '예종', birth: [1450,1,14], city: 'Seoul' },
  { name: '성종', birth: [1457,8,19], city: 'Seoul' },
  { name: '중종', birth: [1488,4,16], city: 'Seoul' },
  { name: '인종', birth: [1515,3,10], city: 'Seoul' },
  { name: '명종', birth: [1534,7,3], city: 'Seoul' },
  { name: '선조', birth: [1552,11,26], city: 'Seoul' },
  { name: '인조', birth: [1595,12,7], city: 'Seoul' },
  { name: '효종', birth: [1619,7,3], city: 'Seoul' },
  { name: '현종', birth: [1641,3,14], city: 'Seoul' },
  { name: '숙종', birth: [1661,10,7], city: 'Seoul' },
  { name: '경종', birth: [1688,10,28], city: 'Seoul' },
  { name: '영조', birth: [1694,10,31], city: 'Seoul' },
  { name: '정조', birth: [1752,10,28], city: 'Seoul' },
  { name: '순조', birth: [1790,7,29], city: 'Seoul' },
  { name: '헌종', birth: [1827,9,8], city: 'Seoul' },
  { name: '철종', birth: [1831,7,25], city: 'Seoul' },
  { name: '고종', birth: [1852,9,8], city: 'Seoul' },
  { name: '순종', birth: [1874,3,25], city: 'Seoul' },
  // 기타 유명 외국인
  { name: '스티브 발머', birth: [1956,3,24], city: 'Detroit' },
  { name: '일론 머스크', birth: [1971,6,28], city: 'Pretoria' },
  { name: '빌 클린턴', birth: [1946,8,19], city: 'Hope' },
  { name: '조지 W 부시', birth: [1946,7,6], city: 'New Haven' },
  { name: '조지 부시 시니어', birth: [1924,6,12], city: 'Milton' },
  { name: '리처드 닉슨', birth: [1913,1,9], city: 'Yorba Linda' },
  { name: '아이젠하워', birth: [1890,10,14], city: 'Denison' },
  { name: '해리 트루먼', birth: [1884,5,8], city: 'Lamar' },
  { name: '루스벨트 FDR', birth: [1882,1,30], city: 'Hyde Park' },
  { name: '우드로 윌슨', birth: [1856,12,28], city: 'Staunton' },
  { name: '시어도어 루스벨트', birth: [1858,10,27], city: 'New York' },
  { name: '제임스 와트', birth: [1736,1,19], city: 'Greenock' },
  { name: '애덤 스미스', birth: [1723,6,5], city: 'Kirkcaldy' },
  { name: '드와이트 아이젠하워', birth: [1890,10,14], city: 'Denison' },
  { name: '코코 샤넬', birth: [1883,8,19], city: 'Saumur' },
];

const target = new Set(['병오','정사']);

describe('일주 후보 탐색 2', () => {
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
