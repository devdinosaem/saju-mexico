import type { GanZhi, FourPillars, BirthInput, FiveElementCount, SajuResult } from './types.js';
import {
  STEMS, BRANCHES, MONTH_BRANCHES,
  STEM_ELEMENT, BRANCH_ELEMENT, STEM_YINYANG,
  MONTH_STEM_START, HOUR_STEM_START,
  hourToBranch,
} from './constants.js';
import { getSolarTermMonth } from './solar-terms.js';
import { findCity, applyLocalSolarTime, getSolarTimeCorrection } from './cities.js';

/**
 * 율리우스일(JD) 계산 (그레고리력)
 * 자정(0시) 기준 정수 JD 반환
 */
export function toJulianDay(year: number, month: number, day: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
}

/**
 * 년주 계산
 * 입춘 이전 출생이면 전년도 간지 사용
 */
export function yearPillar(year: number, month: number, day: number, hour: number, minute: number): GanZhi {
  let effectiveYear = year;

  const ipchunMonth = getSolarTermMonth(year, month, day, hour, minute);
  if (ipchunMonth !== null && ipchunMonth === 0) {
    // 아직 입춘(1월 절기) 이전이면 전년도
    // getSolarTermMonth가 null이면 절기 데이터 없음 → 양력 기준 fallback
  }

  // 입춘 기준 보정: 대략 2월 3~5일
  // 정밀 절기 데이터가 있으면 그걸 사용하고, 없으면 2월 4일 기준
  const ipchunDate = getApproxIpchun(year);
  const birthDate = new Date(year, month - 1, day, hour, minute);
  if (birthDate < ipchunDate) {
    effectiveYear = year - 1;
  }

  const stemIdx = ((effectiveYear - 4) % 10 + 10) % 10;
  const branchIdx = ((effectiveYear - 4) % 12 + 12) % 12;

  return {
    stem: STEMS[stemIdx],
    branch: BRANCHES[branchIdx],
  };
}

/**
 * 입춘 대략 날짜 (정밀 절기 데이터 없을 때 fallback)
 * 실제 입춘은 2월 3~5일 사이에서 변동
 */
function getApproxIpchun(year: number): Date {
  // 평균 입춘: 2월 4일 ~03:50 UTC
  return new Date(year, 1, 4, 3, 50);
}

/**
 * 월주 계산
 * 절기(節) 기준으로 월 결정, 년간 기준 월건표로 천간 결정
 */
export function monthPillar(yearStem: GanZhi['stem'], year: number, month: number, day: number, hour: number, minute: number): GanZhi {
  // 절기 기반 월 결정 (1=인월 ~ 12=축월)
  const sajuMonth = getSajuMonth(year, month, day, hour, minute);

  // 월 지지
  const branch = MONTH_BRANCHES[sajuMonth - 1];

  // 월 천간: 년간 기준 월건표
  const startStem = MONTH_STEM_START[yearStem];
  const startIdx = STEMS.indexOf(startStem);
  const stemIdx = (startIdx + sajuMonth - 1) % 10;

  return {
    stem: STEMS[stemIdx],
    branch,
  };
}

/**
 * 절기 기반 사주 월 계산 (1~12)
 * 1=인월(입춘~경칩), 2=묘월(경칩~청명), ...
 */
function getSajuMonth(year: number, month: number, day: number, hour: number, minute: number): number {
  const termMonth = getSolarTermMonth(year, month, day, hour, minute);
  if (termMonth !== null) return termMonth;

  // fallback: 대략적 절기 경계 (절기 데이터 없을 때)
  // [양력월, 양력일, 사주월] — 양력 내림차순 정렬
  const TERM_BOUNDARIES: [number, number, number][] = [
    [12, 7, 11],  // 대설 → 자월(子)
    [11, 7, 10],  // 입동 → 해월(亥)
    [10, 8,  9],  // 한로 → 술월(戌)
    [ 9, 8,  8],  // 백로 → 유월(酉)
    [ 8, 8,  7],  // 입추 → 신월(申)
    [ 7, 7,  6],  // 소서 → 미월(未)
    [ 6, 6,  5],  // 망종 → 오월(午)
    [ 5, 6,  4],  // 입하 → 사월(巳)
    [ 4, 5,  3],  // 청명 → 진월(辰)
    [ 3, 6,  2],  // 경칩 → 묘월(卯)
    [ 2, 4,  1],  // 입춘 → 인월(寅)
    [ 1, 6, 12],  // 소한 → 축월(丑)
  ];

  for (const [m, d, sajuMonth] of TERM_BOUNDARIES) {
    if (month > m || (month === m && day >= d)) {
      return sajuMonth;
    }
  }

  // 1월 소한(1/6) 이전 → 자월(子, month 11)
  return 11;
}

/**
 * 일주 계산
 * 기준일: 1900-01-01 = 甲子일 (stemIdx=0, branchIdx=0)
 * 1900-01-01의 JD = 2415020.5
 */
export function dayPillar(year: number, month: number, day: number): GanZhi {
  const BASE_JD = 2415020.5; // 1900-01-01 JD
  const jd = toJulianDay(year, month, day);
  const diff = Math.round(jd - BASE_JD);

  // 1900-01-01 = 甲戌일 (검증: 1991-09-11 = 甲申 기준 역산)
  const STEM_OFFSET = 0;    // 甲 = index 0
  const BRANCH_OFFSET = 10; // 戌 = index 10

  const stemIdx = ((diff + STEM_OFFSET) % 10 + 10) % 10;
  const branchIdx = ((diff + BRANCH_OFFSET) % 12 + 12) % 12;

  return {
    stem: STEMS[stemIdx],
    branch: BRANCHES[branchIdx],
  };
}

/**
 * 시주 계산
 * 일간 기준 시두법으로 천간, 출생시각으로 지지 결정
 */
export function hourPillar(dayStem: GanZhi['stem'], hour: number): GanZhi {
  const branch = hourToBranch(hour);
  const branchIdx = BRANCHES.indexOf(branch);

  const startStem = HOUR_STEM_START[dayStem];
  const startIdx = STEMS.indexOf(startStem);
  const stemIdx = (startIdx + branchIdx) % 10;

  return {
    stem: STEMS[stemIdx],
    branch,
  };
}

/**
 * 오행 분포 계산 (8글자 전체)
 */
export function countElements(pillars: FourPillars): FiveElementCount {
  const count: FiveElementCount = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };

  for (const pillar of [pillars.year, pillars.month, pillars.day, pillars.hour]) {
    count[STEM_ELEMENT[pillar.stem]]++;
    count[BRANCH_ELEMENT[pillar.branch]]++;
  }

  return count;
}

/**
 * 사주 전체 계산
 *
 * city 또는 longitude/utcOffset을 지정하면 지역시(Local Solar Time)를 자동 보정.
 * 예: { ..., city: '서울' } → -32분 보정
 * 예: { ..., city: 'Ciudad de México' } → -36분 보정
 */
export function calculateSaju(input: BirthInput): SajuResult {
  let { year, month, day, hour, minute } = input;
  let correctionInfo: SajuResult['localTimeCorrection'] = undefined;

  // 지역시 보정
  let lng: number | undefined;
  let utcOff: number | undefined;
  let cityName: string | undefined;

  if (input.city) {
    const city = findCity(input.city);
    if (city) {
      lng = city.lng;
      utcOff = city.utcOffset;
      cityName = city.name;
    }
  } else if (input.longitude !== undefined && input.utcOffset !== undefined) {
    lng = input.longitude;
    utcOff = input.utcOffset;
  }

  if (lng !== undefined && utcOff !== undefined) {
    const originalTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    const corrected = applyLocalSolarTime(hour, minute, lng, utcOff);
    const correctionMinutes = Math.round(getSolarTimeCorrection(lng, utcOff));

    if (corrected.dayShift !== 0) {
      const d = new Date(year, month - 1, day + corrected.dayShift);
      year = d.getFullYear();
      month = d.getMonth() + 1;
      day = d.getDate();
    }

    hour = corrected.hour;
    minute = corrected.minute;

    correctionInfo = {
      city: cityName,
      longitude: lng,
      utcOffset: utcOff,
      correctionMinutes,
      originalTime,
      correctedTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    };
  }

  const yearP = yearPillar(year, month, day, hour, minute);
  const monthP = monthPillar(yearP.stem, year, month, day, hour, minute);
  const dayP = dayPillar(year, month, day);
  const hourP = hourPillar(dayP.stem, hour);

  const fourPillars: FourPillars = {
    year: yearP,
    month: monthP,
    day: dayP,
    hour: hourP,
  };

  return {
    input,
    fourPillars,
    fiveElements: countElements(fourPillars),
    dayMaster: {
      stem: dayP.stem,
      element: STEM_ELEMENT[dayP.stem],
      yinYang: STEM_YINYANG[dayP.stem],
    },
    localTimeCorrection: correctionInfo,
  };
}
