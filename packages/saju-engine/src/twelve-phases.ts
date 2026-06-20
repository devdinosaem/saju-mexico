import type { HeavenlyStem, EarthlyBranch, FourPillars } from 'manseryeok';
import { STEMS, BRANCHES, STEM_YINYANG } from 'manseryeok';

/**
 * 12운성 (十二運星, Twelve Life Phases)
 *
 * 천간(주로 일간)이 각 지지에서 어떤 에너지 상태인지를 나타낸다.
 * 인간 생로병사의 12단계 비유.
 */
export type TwelvePhase =
  | 'jangsaeng'  // 장생(長生) — 탄생, 시작
  | 'mogyok'     // 목욕(沐浴) — 씻김, 불안정
  | 'gwandae'    // 관대(冠帶) — 성인, 준비
  | 'geonrok'    // 건록(建祿) — 자립, 안정
  | 'jewang'     // 제왕(帝旺) — 최고조, 정점
  | 'soe'        // 쇠(衰) — 쇠퇴 시작
  | 'byeong'     // 병(病) — 약화
  | 'sa'         // 사(死) — 정지
  | 'myo'        // 묘(墓) — 저장, 잠복
  | 'jeol'       // 절(絶) — 단절
  | 'tae'        // 태(胎) — 잉태, 새 시작
  | 'yang';      // 양(養) — 양육, 준비

export const TWELVE_PHASES: readonly TwelvePhase[] = [
  'jangsaeng', 'mogyok', 'gwandae', 'geonrok', 'jewang', 'soe',
  'byeong', 'sa', 'myo', 'jeol', 'tae', 'yang',
] as const;

export const PHASE_KOREAN: Record<TwelvePhase, string> = {
  jangsaeng: '장생', mogyok: '목욕', gwandae: '관대', geonrok: '건록',
  jewang: '제왕', soe: '쇠', byeong: '병', sa: '사',
  myo: '묘', jeol: '절', tae: '태', yang: '양',
};

export const PHASE_HANJA: Record<TwelvePhase, string> = {
  jangsaeng: '長生', mogyok: '沐浴', gwandae: '冠帶', geonrok: '建祿',
  jewang: '帝旺', soe: '衰', byeong: '病', sa: '死',
  myo: '墓', jeol: '絶', tae: '胎', yang: '養',
};

export const PHASE_SPANISH: Record<TwelvePhase, string> = {
  jangsaeng: '[Energía de Nuevo Comienzo]', mogyok: '[Alerta de Inestabilidad]',
  gwandae: '[Energía de Preparación]', geonrok: '[Fuerza de Independencia]',
  jewang: '[Fuerza Máxima]', soe: '[Alerta de Declive]',
  byeong: '[Alerta de Debilitamiento]', sa: '[Riesgo de Parálisis]',
  myo: '[Riesgo de Latencia]', jeol: '[Riesgo de Extinción]',
  tae: '[Energía de Nueva Vida]', yang: '[Energía de Gestación]',
};

/**
 * 양간(陽干) 장생 위치 (지지 인덱스)
 * 양간은 순행 (지지 순서대로)
 */
const YANG_STEM_START: Record<string, number> = {
  '甲': 11, // 亥
  '丙': 2,  // 寅
  '戊': 2,  // 寅 (丙과 동일)
  '庚': 5,  // 巳
  '壬': 8,  // 申
};

/**
 * 음간(陰干) 장생 위치 (지지 인덱스)
 * 음간은 역행 (지지 역순)
 */
const YIN_STEM_START: Record<string, number> = {
  '乙': 6,  // 午
  '丁': 9,  // 酉
  '己': 9,  // 酉 (丁과 동일)
  '辛': 0,  // 子
  '癸': 3,  // 卯
};

/**
 * 특정 천간이 특정 지지에서의 12운성을 구한다
 */
export function getPhase(stem: HeavenlyStem, branch: EarthlyBranch): TwelvePhase {
  const branchIdx = BRANCHES.indexOf(branch);
  const isYang = STEM_YINYANG[stem] === 'yang';

  if (isYang) {
    const startIdx = YANG_STEM_START[stem];
    const phaseIdx = (branchIdx - startIdx + 12) % 12;
    return TWELVE_PHASES[phaseIdx];
  } else {
    const startIdx = YIN_STEM_START[stem];
    const phaseIdx = (startIdx - branchIdx + 12) % 12;
    return TWELVE_PHASES[phaseIdx];
  }
}

/** 4기둥 각 지지에 대한 12운성 결과 */
export interface TwelvePhasesResult {
  year: TwelvePhase;
  month: TwelvePhase;
  day: TwelvePhase;
  hour: TwelvePhase;
}

/**
 * 일간 기준 4기둥의 12운성 분석
 */
export function analyzeTwelvePhases(pillars: FourPillars, dayMasterStem: HeavenlyStem): TwelvePhasesResult {
  return {
    year: getPhase(dayMasterStem, pillars.year.branch),
    month: getPhase(dayMasterStem, pillars.month.branch),
    day: getPhase(dayMasterStem, pillars.day.branch),
    hour: getPhase(dayMasterStem, pillars.hour.branch),
  };
}
