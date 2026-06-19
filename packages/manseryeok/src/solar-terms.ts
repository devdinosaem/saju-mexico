/**
 * 절기(節氣) 데이터 모듈
 *
 * 24절기 중 절(節) 12개가 사주 월 구분 기준:
 * 입춘(1월), 경칩(2월), 청명(3월), 입하(4월), 망종(5월), 소서(6월),
 * 입추(7월), 백로(8월), 한로(9월), 입동(10월), 대설(11월), 소한(12월)
 *
 * TODO: 정밀 절기 데이터 추가 (1900-2100)
 * 현재는 대략적 날짜 기반 fallback 사용
 */

/**
 * 절기 시각 데이터 타입
 * [월, 일, 시, 분] (UTC 기준)
 */
export type SolarTermTime = [month: number, day: number, hour: number, minute: number];

/**
 * 연도별 12절(節) 시각 데이터
 * key: 연도, value: 12개 절기 시각 배열 (입춘~소한 순)
 */
const SOLAR_TERM_DATA: Record<number, SolarTermTime[]> = {
  // 2024년 절기 (절만, UTC 기준)
  2024: [
    [2, 4, 8, 27],    // 입춘
    [3, 5, 4, 23],    // 경칩
    [4, 4, 9, 2],     // 청명
    [5, 5, 2, 10],    // 입하
    [6, 5, 6, 10],    // 망종
    [7, 6, 14, 20],   // 소서
    [8, 7, 2, 9],     // 입추
    [9, 7, 5, 11],    // 백로
    [10, 8, 3, 0],    // 한로
    [11, 7, 0, 20],   // 입동
    [12, 6, 17, 17],  // 대설
    [1, 6, 4, 49],    // 소한 (다음해 1월이지만 사주상 12월)
  ],
  // 2025년 절기
  2025: [
    [2, 3, 14, 10],
    [3, 5, 10, 7],
    [4, 4, 14, 48],
    [5, 5, 7, 57],
    [6, 5, 12, 56],
    [7, 6, 20, 12],
    [8, 7, 8, 1],
    [9, 7, 11, 0],
    [10, 8, 8, 41],
    [11, 7, 6, 4],
    [12, 6, 22, 52],
    [1, 5, 10, 33],
  ],
  // 2026년 절기
  2026: [
    [2, 3, 19, 52],
    [3, 5, 15, 59],
    [4, 4, 20, 39],
    [5, 5, 13, 49],
    [6, 5, 18, 42],
    [7, 7, 1, 57],
    [8, 7, 13, 42],
    [9, 7, 16, 41],
    [10, 8, 14, 29],
    [11, 7, 11, 52],
    [12, 7, 4, 44],
    [1, 5, 16, 23],
  ],
  // TODO: 1900-2100 범위의 정밀 절기 데이터 추가
  // 천문 알고리즘(Jean Meeus) 또는 한국천문연구원 데이터 활용
};

/**
 * 절기 기반 사주 월 계산
 *
 * @returns 사주 월 (1=인월 ~ 12=축월), 데이터 없으면 null
 */
export function getSolarTermMonth(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): number | null {
  const terms = SOLAR_TERM_DATA[year];
  if (!terms) return null;

  const birthMinutes = toMinutes(month, day, hour, minute);

  // 소한(12번째 절기)은 다음해 1월이므로 별도 처리
  // 역순으로 순회하여 해당 절기 이후인지 확인
  for (let i = 10; i >= 0; i--) {
    const [tm, td, th, tmin] = terms[i];
    const termMinutes = toMinutes(tm, td, th, tmin);
    if (birthMinutes >= termMinutes) {
      return i + 1;
    }
  }

  // 입춘 이전 → 전년도 소한 이후인지 확인
  const prevTerms = SOLAR_TERM_DATA[year - 1];
  if (prevTerms) {
    const [sm, sd, sh, smin] = prevTerms[11]; // 전년도 소한
    const sohanMinutes = toMinutes(sm, sd, sh, smin);
    if (birthMinutes >= sohanMinutes) {
      return 12; // 축월
    }
  }

  // 소한 이전 → 전년도 대설(11월) 이후
  return null; // fallback으로 넘김
}

function toMinutes(month: number, day: number, hour: number, minute: number): number {
  return ((month * 31 + day) * 24 + hour) * 60 + minute;
}

/**
 * 특정 연도의 절기 데이터 존재 여부
 */
export function hasSolarTermData(year: number): boolean {
  return year in SOLAR_TERM_DATA;
}
