import type { HeavenlyStem, EarthlyBranch, FiveElement, FourPillars, FiveElementCount } from 'manseryeok';
import { STEM_ELEMENT, STEM_YINYANG, BRANCH_MAIN_STEM } from 'manseryeok';
import { getPhase } from './twelve-phases.js';
import type { TenGodCount } from './types.js';

/**
 * 오행 상생상극 관계 매핑
 */
const I_GENERATE: Record<FiveElement, FiveElement> = {
  wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood',
};
const GENERATES_ME: Record<FiveElement, FiveElement> = {
  wood: 'water', fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal',
};
const I_CONTROL: Record<FiveElement, FiveElement> = {
  wood: 'earth', fire: 'metal', earth: 'water', metal: 'wood', water: 'fire',
};
const CONTROLS_ME: Record<FiveElement, FiveElement> = {
  wood: 'metal', fire: 'water', earth: 'wood', metal: 'fire', water: 'earth',
};

/** 신강/신약 등급 */
export type StrengthLevel = 'taegang' | 'singang' | 'junghwa' | 'sinyak' | 'taeyak';

export const STRENGTH_KOREAN: Record<StrengthLevel, string> = {
  taegang: '태강', singang: '신강', junghwa: '중화',
  sinyak: '신약', taeyak: '태약',
};

export const STRENGTH_SPANISH: Record<StrengthLevel, string> = {
  taegang: 'Muy Fuerte', singang: 'Fuerte', junghwa: 'Equilibrado',
  sinyak: 'Débil', taeyak: 'Muy Débil',
};

export interface StrengthAnalysis {
  level: StrengthLevel;
  score: number;
  deukryeong: boolean;  // 득령 (월지 지지)
  deukji: boolean;      // 득지 (일지 12운성)
  friendCount: number;  // 아군 (비겁+인성)
  foeCount: number;     // 적군 (식상+재성+관성)
}

export interface YongShinResult {
  yongShin: FiveElement;       // 용신 (보완 필요 오행)
  giShin: FiveElement;         // 기신 (과다/해로운 오행)
  yongShinCategory: string;    // 억부용신, 조후용신 등
  strength: StrengthAnalysis;
}

/**
 * 득령 판정 — 월지 본기가 일간을 돕는가
 */
function checkDeukryeong(dayMasterElement: FiveElement, monthBranch: EarthlyBranch): boolean {
  const monthMainStem = BRANCH_MAIN_STEM[monthBranch];
  const monthElement = STEM_ELEMENT[monthMainStem];
  return monthElement === dayMasterElement || monthElement === GENERATES_ME[dayMasterElement];
}

/**
 * 득지 판정 — 일지 12운성이 강한 상태인가
 */
function checkDeukji(dayMasterStem: HeavenlyStem, dayBranch: EarthlyBranch): boolean {
  const phase = getPhase(dayMasterStem, dayBranch);
  return ['jangsaeng', 'gwandae', 'geonrok', 'jewang'].includes(phase);
}

/**
 * 12운성 점수
 */
function phaseScore(dayMasterStem: HeavenlyStem, branch: EarthlyBranch): number {
  const phase = getPhase(dayMasterStem, branch);
  const scores: Record<string, number> = {
    geonrok: 1.5, jewang: 1.5, jangsaeng: 1, gwandae: 1,
    yang: 0.5, mogyok: 0.5, tae: 0,
    soe: -0.5, byeong: -1, myo: -1, sa: -1.5, jeol: -1.5,
  };
  return scores[phase] ?? 0;
}

/**
 * 신강/신약 판정
 */
function analyzeStrength(
  dayMasterStem: HeavenlyStem,
  pillars: FourPillars,
  tenGodCount: TenGodCount,
): StrengthAnalysis {
  const dmElement = STEM_ELEMENT[dayMasterStem];

  // 아군: 비겁(比劫) + 인성(印星) — 나를 돕는 세력
  const friendCount = tenGodCount.bijeon + tenGodCount.geopjae + tenGodCount.pyeonin + tenGodCount.jeongin;
  // 적군: 식상(食傷) + 재성(財星) + 관성(官星) — 나를 소모하는 세력
  const foeCount = tenGodCount.siksin + tenGodCount.sanggwan + tenGodCount.pyeonjae + tenGodCount.jeongjae + tenGodCount.pyeongwan + tenGodCount.jeonggwan;

  const deukryeong = checkDeukryeong(dmElement, pillars.month.branch);
  const deukji = checkDeukji(dayMasterStem, pillars.day.branch);

  // 종합 점수
  let score = (friendCount - foeCount); // 기본 세력 차이
  score += deukryeong ? 1 : -1;         // 득령 가중치
  score += phaseScore(dayMasterStem, pillars.day.branch) * 0.5; // 일지 12운성

  let level: StrengthLevel;
  if (score >= 4) level = 'taegang';
  else if (score >= 1) level = 'singang';
  else if (score >= -1) level = 'junghwa';
  else if (score >= -3) level = 'sinyak';
  else level = 'taeyak';

  return { level, score, deukryeong, deukji, friendCount, foeCount };
}

/**
 * 용신/기신 판정 (억부용신법)
 *
 * 신강 → 과다한 아군을 억제하는 오행 = 용신
 * 신약 → 부족한 아군을 보충하는 오행 = 용신
 */
export function analyzeYongShin(
  dayMasterStem: HeavenlyStem,
  pillars: FourPillars,
  fiveElements: FiveElementCount,
  tenGodCount: TenGodCount,
): YongShinResult {
  const dmElement = STEM_ELEMENT[dayMasterStem];
  const strength = analyzeStrength(dayMasterStem, pillars, tenGodCount);

  const bigyeopElement = dmElement;                    // 비겁 오행 = 일간 오행
  const inseongElement = GENERATES_ME[dmElement];      // 인성 오행 = 나를 생하는
  const siksangElement = I_GENERATE[dmElement];        // 식상 오행 = 내가 생하는
  const jaeseongElement = I_CONTROL[dmElement];        // 재성 오행 = 내가 극하는
  const gwanseongElement = CONTROLS_ME[dmElement];     // 관성 오행 = 나를 극하는

  let yongShin: FiveElement;
  let giShin: FiveElement;

  if (strength.level === 'taegang' || strength.level === 'singang' || (strength.level === 'junghwa' && strength.score > 0)) {
    // 신강: 과다한 아군을 억제
    const bigyeopCount = fiveElements[bigyeopElement];
    const inseongCount = fiveElements[inseongElement];

    if (inseongCount >= bigyeopCount) {
      // 인성 과다 → 인성을 극하는 재성 = 용신
      yongShin = jaeseongElement;
    } else {
      // 비겁 과다 → 비겁을 빼앗는 식상 or 극하는 관성
      if (fiveElements[gwanseongElement] <= fiveElements[siksangElement]) {
        yongShin = gwanseongElement;
      } else {
        yongShin = siksangElement;
      }
    }
    // 기신 = 가장 과다한 아군 오행
    giShin = inseongCount >= bigyeopCount ? inseongElement : bigyeopElement;
  } else {
    // 신약: 부족한 아군을 보충
    const inseongCount = fiveElements[inseongElement];
    const bigyeopCount = fiveElements[bigyeopElement];

    if (inseongCount <= bigyeopCount) {
      // 인성 부족 → 인성 오행 = 용신
      yongShin = inseongElement;
    } else {
      // 비겁 부족 → 비겁 오행 = 용신
      yongShin = bigyeopElement;
    }
    // 기신 = 가장 과다한 적군 오행
    const foeCounts: [FiveElement, number][] = [
      [siksangElement, fiveElements[siksangElement]],
      [jaeseongElement, fiveElements[jaeseongElement]],
      [gwanseongElement, fiveElements[gwanseongElement]],
    ];
    foeCounts.sort((a, b) => b[1] - a[1]);
    giShin = foeCounts[0][0];
  }

  return {
    yongShin,
    giShin,
    yongShinCategory: '억부용신',
    strength,
  };
}

/** 오행 한글 */
export const ELEMENT_KOREAN: Record<FiveElement, string> = {
  wood: '목(木)', fire: '화(火)', earth: '토(土)', metal: '금(金)', water: '수(水)',
};
