import type { HeavenlyStem, EarthlyBranch, GanZhi, FourPillars } from 'manseryeok';
import {
  STEMS, BRANCHES, STEM_YINYANG, STEM_ELEMENT,
  BRANCH_MAIN_STEM, MONTH_STEM_START, MONTH_BRANCHES,
} from 'manseryeok';
import { determineTenGod } from './ten-gods.js';
import { getPhase } from './twelve-phases.js';
import type { TenGod } from './types.js';
import type { TwelvePhase } from './twelve-phases.js';

export type Gender = 'male' | 'female';

export interface MajorFortune {
  startAge: number;
  ganZhi: GanZhi;
  stemTenGod: TenGod;
  branchTenGod: TenGod;
  twelvePhase: TwelvePhase;
}

export interface MajorFortuneResult {
  direction: 'forward' | 'backward';
  startAge: number;
  fortunes: MajorFortune[];
}

export interface YearlyFortune {
  year: number;
  age: number;
  ganZhi: GanZhi;
  stemTenGod: TenGod;
  branchTenGod: TenGod;
  twelvePhase: TwelvePhase;
}

export interface MonthlyFortune {
  month: number;
  ganZhi: GanZhi;
  stemTenGod: TenGod;
  branchTenGod: TenGod;
  twelvePhase: TwelvePhase;
}

// ── 순행/역행 ──

function getFortuneDirection(yearStem: HeavenlyStem, gender: Gender): 'forward' | 'backward' {
  const isYang = STEM_YINYANG[yearStem] === 'yang';
  const isMale = gender === 'male';
  return (isYang && isMale) || (!isYang && !isMale) ? 'forward' : 'backward';
}

// ── 절기 근사 날짜 ──

const APPROX_TERMS: [number, number][] = [
  [2, 4], [3, 6], [4, 5], [5, 6], [6, 6], [7, 7],
  [8, 8], [9, 8], [10, 8], [11, 7], [12, 7], [1, 6],
];

function calculateStartAge(
  birthYear: number, birthMonth: number, birthDay: number,
  direction: 'forward' | 'backward',
): number {
  const birthMs = new Date(birthYear, birthMonth - 1, birthDay).getTime();

  // 현재 연도 ± 1년의 모든 절기 날짜를 수집
  const allTermMs: number[] = [];
  for (const year of [birthYear - 1, birthYear, birthYear + 1]) {
    for (const [m, d] of APPROX_TERMS) {
      allTermMs.push(new Date(year, m - 1, d).getTime());
    }
  }

  if (direction === 'forward') {
    // 생일 이후 가장 가까운 절기
    let nearest = Infinity;
    for (const ms of allTermMs) {
      if (ms > birthMs && ms < nearest) nearest = ms;
    }
    const days = Math.round((nearest - birthMs) / 86400000);
    return Math.max(1, Math.round(days / 3));
  } else {
    // 생일 이전 가장 가까운 절기
    let nearest = -Infinity;
    for (const ms of allTermMs) {
      if (ms <= birthMs && ms > nearest) nearest = ms;
    }
    const days = Math.round((birthMs - nearest) / 86400000);
    return Math.max(1, Math.round(days / 3));
  }
}

// ── 간지 이동 ──

function shiftGanZhi(gz: GanZhi, steps: number): GanZhi {
  const si = ((STEMS.indexOf(gz.stem) + steps) % 10 + 10) % 10;
  const bi = ((BRANCHES.indexOf(gz.branch) + steps) % 12 + 12) % 12;
  return { stem: STEMS[si], branch: BRANCHES[bi] };
}

// ── 십신 헬퍼 ──

function tenGodForStem(dayMasterStem: HeavenlyStem, target: HeavenlyStem): TenGod {
  return determineTenGod(STEM_ELEMENT[dayMasterStem], STEM_YINYANG[dayMasterStem], STEM_ELEMENT[target], STEM_YINYANG[target]);
}

function tenGodForBranch(dayMasterStem: HeavenlyStem, branch: EarthlyBranch): TenGod {
  const ms = BRANCH_MAIN_STEM[branch];
  return determineTenGod(STEM_ELEMENT[dayMasterStem], STEM_YINYANG[dayMasterStem], STEM_ELEMENT[ms], STEM_YINYANG[ms]);
}

// ── 대운 ──

export function calculateMajorFortunes(
  monthPillarGZ: GanZhi,
  yearStem: HeavenlyStem,
  gender: Gender,
  birthYear: number, birthMonth: number, birthDay: number,
  dayMasterStem: HeavenlyStem,
  count: number = 10,
): MajorFortuneResult {
  const direction = getFortuneDirection(yearStem, gender);
  const startAge = calculateStartAge(birthYear, birthMonth, birthDay, direction);
  const step = direction === 'forward' ? 1 : -1;

  const fortunes: MajorFortune[] = [];
  for (let i = 0; i < count; i++) {
    const gz = shiftGanZhi(monthPillarGZ, step * (i + 1));
    fortunes.push({
      startAge: startAge + i * 10,
      ganZhi: gz,
      stemTenGod: tenGodForStem(dayMasterStem, gz.stem),
      branchTenGod: tenGodForBranch(dayMasterStem, gz.branch),
      twelvePhase: getPhase(dayMasterStem, gz.branch),
    });
  }

  return { direction, startAge, fortunes };
}

// ── 세운 ──

export function calculateYearlyFortunes(
  birthYear: number,
  dayMasterStem: HeavenlyStem,
  fromYear: number,
  toYear: number,
): YearlyFortune[] {
  const result: YearlyFortune[] = [];
  for (let y = fromYear; y <= toYear; y++) {
    const si = ((y - 4) % 10 + 10) % 10;
    const bi = ((y - 4) % 12 + 12) % 12;
    const gz: GanZhi = { stem: STEMS[si], branch: BRANCHES[bi] };

    result.push({
      year: y,
      age: y - birthYear + 1,
      ganZhi: gz,
      stemTenGod: tenGodForStem(dayMasterStem, gz.stem),
      branchTenGod: tenGodForBranch(dayMasterStem, gz.branch),
      twelvePhase: getPhase(dayMasterStem, gz.branch),
    });
  }
  return result;
}

// ── 월운 ──

export function calculateMonthlyFortunes(
  year: number,
  dayMasterStem: HeavenlyStem,
): MonthlyFortune[] {
  const yearStemIdx = ((year - 4) % 10 + 10) % 10;
  const yearStem = STEMS[yearStemIdx];
  const startStem = MONTH_STEM_START[yearStem];
  const startIdx = STEMS.indexOf(startStem);
  const solarMonths = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1];

  const result: MonthlyFortune[] = [];
  for (let i = 0; i < 12; i++) {
    const stem = STEMS[(startIdx + i) % 10];
    const branch = MONTH_BRANCHES[i];

    result.push({
      month: solarMonths[i],
      ganZhi: { stem, branch },
      stemTenGod: tenGodForStem(dayMasterStem, stem),
      branchTenGod: tenGodForBranch(dayMasterStem, branch),
      twelvePhase: getPhase(dayMasterStem, branch),
    });
  }
  return result;
}
