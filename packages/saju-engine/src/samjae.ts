import type { EarthlyBranch } from 'manseryeok';
import { BRANCHES } from 'manseryeok';

/**
 * 삼재 (三災, Tres Desafíos)
 *
 * 12지지를 4그룹으로 나누고, 각 그룹에 해당하는 삼재 연도가 있음.
 * 12년에 한 번, 3년 연속으로 찾아옴.
 *
 * - 寅午戌 그룹: 申酉戌 년이 삼재
 * - 巳酉丑 그룹: 亥子丑 년이 삼재
 * - 申子辰 그룹: 寅卯辰 년이 삼재
 * - 亥卯未 그룹: 巳午未 년이 삼재
 */

type SamjaePhase = 'entering' | 'peak' | 'leaving';

export interface SamjaeInfo {
  isActive: boolean;
  phase?: SamjaePhase;
  phaseKorean?: string;
  phaseSpanish?: string;
  startYear: number;
  endYear: number;
  description: string;
  descriptionSpanish: string;
}

const SAMJAE_GROUPS: [EarthlyBranch[], EarthlyBranch[]][] = [
  [['寅', '午', '戌'], ['申', '酉', '戌']],
  [['巳', '酉', '丑'], ['亥', '子', '丑']],
  [['申', '子', '辰'], ['寅', '卯', '辰']],
  [['亥', '卯', '未'], ['巳', '午', '未']],
];

const PHASE_KOREAN: Record<SamjaePhase, string> = {
  entering: '들삼재',
  peak: '눌삼재',
  leaving: '날삼재',
};

const PHASE_SPANISH: Record<SamjaePhase, string> = {
  entering: 'Inicio del ciclo',
  peak: 'Punto máximo',
  leaving: 'Cierre del ciclo',
};

function getYearBranch(year: number): EarthlyBranch {
  const idx = ((year - 4) % 12 + 12) % 12;
  return BRANCHES[idx];
}

function getSamjaeBranches(yearBranch: EarthlyBranch): EarthlyBranch[] {
  for (const [group, samjae] of SAMJAE_GROUPS) {
    if (group.includes(yearBranch)) return samjae;
  }
  return [];
}

export function calculateSamjae(birthYearBranch: EarthlyBranch, targetYear: number): SamjaeInfo {
  const samjaeBranches = getSamjaeBranches(birthYearBranch);
  const targetBranch = getYearBranch(targetYear);
  const isActive = samjaeBranches.includes(targetBranch);

  // 현재 삼재 시작/끝 년도 찾기
  let startYear = targetYear;
  let endYear = targetYear;

  if (isActive) {
    const idx = samjaeBranches.indexOf(targetBranch);
    startYear = targetYear - idx;
    endYear = startYear + 2;
  } else {
    // 다음 삼재 시작 년도 찾기
    for (let y = targetYear + 1; y <= targetYear + 12; y++) {
      if (samjaeBranches[0] === getYearBranch(y)) {
        startYear = y;
        endYear = y + 2;
        break;
      }
    }
  }

  let phase: SamjaePhase | undefined;
  if (isActive) {
    const idx = samjaeBranches.indexOf(targetBranch);
    phase = (['entering', 'peak', 'leaving'] as const)[idx];
  }

  return {
    isActive,
    phase,
    phaseKorean: phase ? PHASE_KOREAN[phase] : undefined,
    phaseSpanish: phase ? PHASE_SPANISH[phase] : undefined,
    startYear,
    endYear,
    description: isActive
      ? `${PHASE_KOREAN[phase!]} (${startYear}-${endYear})`
      : `다음 삼재: ${startYear}-${endYear}`,
    descriptionSpanish: isActive
      ? `Estás en los Tres Desafíos — ${PHASE_SPANISH[phase!]} (${startYear}-${endYear})`
      : `Próximos Tres Desafíos: ${startYear}-${endYear}`,
  };
}

export function getSamjaeYearsAround(birthYearBranch: EarthlyBranch, centerYear: number): { year: number; phase: SamjaePhase }[] {
  const result: { year: number; phase: SamjaePhase }[] = [];
  for (let y = centerYear - 6; y <= centerYear + 12; y++) {
    const info = calculateSamjae(birthYearBranch, y);
    if (info.isActive && info.phase) {
      result.push({ year: y, phase: info.phase });
    }
  }
  return result;
}
