import {
  calculateSaju, STEM_KOREAN, BRANCH_KOREAN, STEM_ELEMENT,
  BRANCH_ELEMENT, ELEMENT_SPANISH, BRANCH_SPANISH, STEM_YINYANG,
} from 'manseryeok';
import type { FiveElement } from 'manseryeok';
import {
  analyzeTenGods, TEN_GOD_KOREAN, TEN_GOD_SPANISH,
  analyzeTwelvePhases, PHASE_KOREAN, PHASE_SPANISH,
  analyzeSpiritStars, analyzeSpecialStars, SPIRIT_STAR_KOREAN,
  calculateMajorFortunes, calculateYearlyFortunes, calculateMonthlyFortunes,
  analyzeYongShin, STRENGTH_KOREAN, STRENGTH_SPANISH, ELEMENT_KOREAN,
  analyzeRelations,
} from 'saju-engine';
import type { StrengthLevel } from 'saju-engine';
import type { Gender, ReportInput } from './types.js';
import type { Locale } from './locales/index.js';

export interface BuildInputParams {
  userName: string;
  gender: Gender;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  city: string;
  timezone: string;
  locale?: Locale;
}

const DIRECTION_LABELS: Record<Locale, { forward: string; reverse: string }> = {
  mx: { forward: 'Progresiva (순행)', reverse: 'Regresiva (역행)' },
  kr: { forward: '순행(順行)', reverse: '역행(逆行)' },
};

export function buildReportInput(params: BuildInputParams): ReportInput {
  const { userName, gender, year, month, day, hour, minute, city, timezone, locale = 'mx' } = params;

  const saju = calculateSaju({ year, month, day, hour, minute, city });
  const p = saju.fourPillars;
  const tenGods = analyzeTenGods(p, saju.dayMaster.stem);
  const phases = analyzeTwelvePhases(p, saju.dayMaster.stem);
  const spirits = analyzeSpiritStars(p);
  const specials = analyzeSpecialStars(p, saju.dayMaster.stem);
  const fortunes = calculateMajorFortunes(
    p.month, p.year.stem, gender, year, month, day, saju.dayMaster.stem,
  );
  const currentYear = new Date().getFullYear();
  const yearly = calculateYearlyFortunes(year, saju.dayMaster.stem, currentYear, currentYear);
  const monthly = calculateMonthlyFortunes(currentYear, saju.dayMaster.stem);
  const yongShin = analyzeYongShin(saju.dayMaster.stem, p, saju.fiveElements, tenGods.count);
  const relations = analyzeRelations(p);

  const getElementDisplay = (element: FiveElement) =>
    locale === 'kr' ? ELEMENT_KOREAN[element] : ELEMENT_SPANISH[element];
  const getStrengthDisplay = (level: StrengthLevel) =>
    locale === 'kr' ? STRENGTH_KOREAN[level] : STRENGTH_SPANISH[level];

  const makePillar = (pillar: typeof p.year, position: 'year' | 'month' | 'day' | 'hour') => {
    const stemEntry = tenGods.entries.find(e => e.position === `${position}_stem`);
    return {
      stem: pillar.stem,
      branch: pillar.branch,
      korean: `${STEM_KOREAN[pillar.stem]}${BRANCH_KOREAN[pillar.branch]}`,
      stemElement: getElementDisplay(STEM_ELEMENT[pillar.stem]),
      branchElement: getElementDisplay(BRANCH_ELEMENT[pillar.branch]),
      tenGod: stemEntry ? TEN_GOD_KOREAN[stemEntry.tenGod] : '',
    };
  };

  const dirLabels = DIRECTION_LABELS[locale];

  return {
    userName,
    gender,
    birth: {
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      city,
      timezone,
    },
    fourPillars: {
      year: makePillar(p.year, 'year'),
      month: makePillar(p.month, 'month'),
      day: makePillar(p.day, 'day'),
      hour: makePillar(p.hour, 'hour'),
    },
    fiveElements: saju.fiveElements,
    dayMaster: {
      stem: saju.dayMaster.stem,
      element: saju.dayMaster.element,
      elementSpanish: getElementDisplay(saju.dayMaster.element),
      yinYang: saju.dayMaster.yinYang,
      korean: STEM_KOREAN[saju.dayMaster.stem],
    },
    tenGods: {
      entries: tenGods.entries.map(e => ({
        position: e.position,
        char: e.char,
        tenGod: e.tenGod,
        korean: TEN_GOD_KOREAN[e.tenGod],
        spanish: locale === 'kr' ? TEN_GOD_KOREAN[e.tenGod] : TEN_GOD_SPANISH[e.tenGod],
      })),
      percentages: tenGods.percentages,
    },
    twelvePhases: {
      year: { phase: phases.year, korean: PHASE_KOREAN[phases.year], spanish: locale === 'kr' ? PHASE_KOREAN[phases.year] : PHASE_SPANISH[phases.year] },
      month: { phase: phases.month, korean: PHASE_KOREAN[phases.month], spanish: locale === 'kr' ? PHASE_KOREAN[phases.month] : PHASE_SPANISH[phases.month] },
      day: { phase: phases.day, korean: PHASE_KOREAN[phases.day], spanish: locale === 'kr' ? PHASE_KOREAN[phases.day] : PHASE_SPANISH[phases.day] },
      hour: { phase: phases.hour, korean: PHASE_KOREAN[phases.hour], spanish: locale === 'kr' ? PHASE_KOREAN[phases.hour] : PHASE_SPANISH[phases.hour] },
    },
    spiritStars: {
      year: SPIRIT_STAR_KOREAN[spirits.year],
      month: SPIRIT_STAR_KOREAN[spirits.month],
      day: SPIRIT_STAR_KOREAN[spirits.day],
      hour: SPIRIT_STAR_KOREAN[spirits.hour],
    },
    specialStars: specials.all,
    strength: {
      level: yongShin.strength.level,
      levelKorean: STRENGTH_KOREAN[yongShin.strength.level],
      levelSpanish: getStrengthDisplay(yongShin.strength.level),
      score: yongShin.strength.score,
      deukryeong: yongShin.strength.deukryeong,
      friendCount: yongShin.strength.friendCount,
      foeCount: yongShin.strength.foeCount,
    },
    yongShin: {
      element: yongShin.yongShin,
      elementKorean: ELEMENT_KOREAN[yongShin.yongShin],
      elementSpanish: getElementDisplay(yongShin.yongShin),
      category: yongShin.yongShinCategory,
    },
    giShin: {
      element: yongShin.giShin,
      elementKorean: ELEMENT_KOREAN[yongShin.giShin],
    },
    majorFortunes: {
      direction: fortunes.direction === 'forward' ? dirLabels.forward : dirLabels.reverse,
      startAge: fortunes.startAge,
      fortunes: fortunes.fortunes.map(f => ({
        age: f.startAge,
        ganZhi: `${STEM_KOREAN[f.ganZhi.stem]}${BRANCH_KOREAN[f.ganZhi.branch]}(${f.ganZhi.stem}${f.ganZhi.branch})`,
        stemTenGod: TEN_GOD_KOREAN[f.stemTenGod],
        branchTenGod: TEN_GOD_KOREAN[f.branchTenGod],
        phase: PHASE_KOREAN[f.twelvePhase],
      })),
    },
    yearlyFortune: (() => {
      const y = yearly[0];
      return {
        year: y.year,
        age: y.age,
        ganZhi: `${STEM_KOREAN[y.ganZhi.stem]}${BRANCH_KOREAN[y.ganZhi.branch]}(${y.ganZhi.stem}${y.ganZhi.branch})`,
        stemTenGod: TEN_GOD_KOREAN[y.stemTenGod],
        branchTenGod: TEN_GOD_KOREAN[y.branchTenGod],
        phase: PHASE_KOREAN[y.twelvePhase],
      };
    })(),
    monthlyFortunes: monthly.map(m => ({
      month: m.month,
      ganZhi: `${STEM_KOREAN[m.ganZhi.stem]}${BRANCH_KOREAN[m.ganZhi.branch]}`,
      stemTenGod: TEN_GOD_KOREAN[m.stemTenGod],
      phase: PHASE_KOREAN[m.twelvePhase],
    })),
    relations: relations.relations.map(r => r.description),
  };
}
