import type { HeavenlyStem, EarthlyBranch, FiveElement, YinYang, FourPillars } from 'manseryeok';
import { STEM_ELEMENT, BRANCH_ELEMENT, STEM_YINYANG, BRANCH_YINYANG, BRANCH_MAIN_STEM } from 'manseryeok';
import type { TenGod, TenGodEntry, TenGodCount, TenGodResult } from './types.js';

/**
 * 오행 상생상극 관계
 *
 * 상생 (生): 木→火→土→金→水→木
 * 상극 (克): 木→土→水→火→金→木
 */

/** 내가 생하는 오행 */
const I_GENERATE: Record<FiveElement, FiveElement> = {
  wood: 'fire',   // 木生火
  fire: 'earth',  // 火生土
  earth: 'metal', // 土生金
  metal: 'water', // 金生水
  water: 'wood',  // 水生木
};

/** 나를 생하는 오행 */
const GENERATES_ME: Record<FiveElement, FiveElement> = {
  wood: 'water',  // 水生木
  fire: 'wood',   // 木生火
  earth: 'fire',  // 火生土
  metal: 'earth', // 土生金
  water: 'metal', // 金生水
};

/** 내가 극하는 오행 */
const I_CONTROL: Record<FiveElement, FiveElement> = {
  wood: 'earth',  // 木克土
  fire: 'metal',  // 火克金
  earth: 'water', // 土克水
  metal: 'wood',  // 金克木
  water: 'fire',  // 水克火
};

/** 나를 극하는 오행 */
const CONTROLS_ME: Record<FiveElement, FiveElement> = {
  wood: 'metal',  // 金克木
  fire: 'water',  // 水克火
  earth: 'wood',  // 木克土
  metal: 'fire',  // 火克金
  water: 'earth', // 土克水
};

/**
 * 십신 판정
 *
 * 일간의 오행/음양 기준으로 대상 글자의 관계를 판정.
 *
 * | 관계              | 같은 음양 | 다른 음양 |
 * |-------------------|----------|----------|
 * | 같은 오행          | 비견     | 겁재     |
 * | 내가 생하는 오행    | 식신     | 상관     |
 * | 내가 극하는 오행    | 편재     | 정재     |
 * | 나를 극하는 오행    | 편관     | 정관     |
 * | 나를 생하는 오행    | 편인     | 정인     |
 */
export function determineTenGod(
  dayMasterElement: FiveElement,
  dayMasterYinYang: YinYang,
  targetElement: FiveElement,
  targetYinYang: YinYang,
): TenGod {
  const sameYinYang = dayMasterYinYang === targetYinYang;

  if (targetElement === dayMasterElement) {
    return sameYinYang ? 'bijeon' : 'geopjae';
  }
  if (targetElement === I_GENERATE[dayMasterElement]) {
    return sameYinYang ? 'siksin' : 'sanggwan';
  }
  if (targetElement === I_CONTROL[dayMasterElement]) {
    return sameYinYang ? 'pyeonjae' : 'jeongjae';
  }
  if (targetElement === CONTROLS_ME[dayMasterElement]) {
    return sameYinYang ? 'pyeongwan' : 'jeonggwan';
  }
  if (targetElement === GENERATES_ME[dayMasterElement]) {
    return sameYinYang ? 'pyeonin' : 'jeongin';
  }

  throw new Error(`Unable to determine ten god: ${dayMasterElement}/${dayMasterYinYang} vs ${targetElement}/${targetYinYang}`);
}

/**
 * 사주 전체 십신 분석
 *
 * 8글자(천간4 + 지지4) 모두에 대해 십신 판정.
 * 일간 자신도 비견/겁재로 포함.
 */
export function analyzeTenGods(pillars: FourPillars, dayMasterStem: HeavenlyStem): TenGodResult {
  const dmElement = STEM_ELEMENT[dayMasterStem];
  const dmYinYang = STEM_YINYANG[dayMasterStem];

  const positions: {
    position: TenGodEntry['position'];
    char: HeavenlyStem | EarthlyBranch;
    element: FiveElement;
    yinYang: YinYang;
  }[] = [
    { position: 'year_stem', char: pillars.year.stem, element: STEM_ELEMENT[pillars.year.stem], yinYang: STEM_YINYANG[pillars.year.stem] },
    { position: 'year_branch', char: pillars.year.branch, element: STEM_ELEMENT[BRANCH_MAIN_STEM[pillars.year.branch]], yinYang: STEM_YINYANG[BRANCH_MAIN_STEM[pillars.year.branch]] },
    { position: 'month_stem', char: pillars.month.stem, element: STEM_ELEMENT[pillars.month.stem], yinYang: STEM_YINYANG[pillars.month.stem] },
    { position: 'month_branch', char: pillars.month.branch, element: STEM_ELEMENT[BRANCH_MAIN_STEM[pillars.month.branch]], yinYang: STEM_YINYANG[BRANCH_MAIN_STEM[pillars.month.branch]] },
    { position: 'day_stem', char: pillars.day.stem, element: STEM_ELEMENT[pillars.day.stem], yinYang: STEM_YINYANG[pillars.day.stem] },
    { position: 'day_branch', char: pillars.day.branch, element: STEM_ELEMENT[BRANCH_MAIN_STEM[pillars.day.branch]], yinYang: STEM_YINYANG[BRANCH_MAIN_STEM[pillars.day.branch]] },
    { position: 'hour_stem', char: pillars.hour.stem, element: STEM_ELEMENT[pillars.hour.stem], yinYang: STEM_YINYANG[pillars.hour.stem] },
    { position: 'hour_branch', char: pillars.hour.branch, element: STEM_ELEMENT[BRANCH_MAIN_STEM[pillars.hour.branch]], yinYang: STEM_YINYANG[BRANCH_MAIN_STEM[pillars.hour.branch]] },
  ];

  const entries: TenGodEntry[] = positions.map(p => ({
    ...p,
    tenGod: determineTenGod(dmElement, dmYinYang, p.element, p.yinYang),
  }));

  const count: TenGodCount = {
    bijeon: 0, geopjae: 0,
    siksin: 0, sanggwan: 0,
    pyeonjae: 0, jeongjae: 0,
    pyeongwan: 0, jeonggwan: 0,
    pyeonin: 0, jeongin: 0,
  };

  for (const entry of entries) {
    count[entry.tenGod]++;
  }

  const total = entries.length; // 8
  const percentages = {} as Record<TenGod, number>;
  for (const [key, val] of Object.entries(count)) {
    percentages[key as TenGod] = (val / total) * 100;
  }

  return { entries, count, percentages };
}
