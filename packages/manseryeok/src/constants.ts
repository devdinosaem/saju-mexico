import type { HeavenlyStem, EarthlyBranch, FiveElement, YinYang } from './types.js';

/** 천간 10개 (갑~계) */
export const STEMS: readonly HeavenlyStem[] = [
  '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'
] as const;

/** 지지 12개 (자~해) */
export const BRANCHES: readonly EarthlyBranch[] = [
  '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'
] as const;

/** 천간 한글 읽기 */
export const STEM_KOREAN: Record<HeavenlyStem, string> = {
  '甲': '갑', '乙': '을', '丙': '병', '丁': '정', '戊': '무',
  '己': '기', '庚': '경', '辛': '신', '壬': '임', '癸': '계'
};

/** 지지 한글 읽기 */
export const BRANCH_KOREAN: Record<EarthlyBranch, string> = {
  '子': '자', '丑': '축', '寅': '인', '卯': '묘', '辰': '진', '巳': '사',
  '午': '오', '未': '미', '申': '신', '酉': '유', '戌': '술', '亥': '해'
};

/** 천간 → 오행 */
export const STEM_ELEMENT: Record<HeavenlyStem, FiveElement> = {
  '甲': 'wood', '乙': 'wood',
  '丙': 'fire', '丁': 'fire',
  '戊': 'earth', '己': 'earth',
  '庚': 'metal', '辛': 'metal',
  '壬': 'water', '癸': 'water'
};

/** 지지 → 오행 (본기 기준) */
export const BRANCH_ELEMENT: Record<EarthlyBranch, FiveElement> = {
  '寅': 'wood', '卯': 'wood',
  '巳': 'fire', '午': 'fire',
  '辰': 'earth', '丑': 'earth', '未': 'earth', '戌': 'earth',
  '申': 'metal', '酉': 'metal',
  '子': 'water', '亥': 'water'
};

/** 천간 → 음양 */
export const STEM_YINYANG: Record<HeavenlyStem, YinYang> = {
  '甲': 'yang', '乙': 'yin',
  '丙': 'yang', '丁': 'yin',
  '戊': 'yang', '己': 'yin',
  '庚': 'yang', '辛': 'yin',
  '壬': 'yang', '癸': 'yin'
};

/** 지지 → 음양 */
export const BRANCH_YINYANG: Record<EarthlyBranch, YinYang> = {
  '子': 'yang', '丑': 'yin',
  '寅': 'yang', '卯': 'yin',
  '辰': 'yang', '巳': 'yin',
  '午': 'yang', '未': 'yin',
  '申': 'yang', '酉': 'yin',
  '戌': 'yang', '亥': 'yin'
};

/**
 * 지장간 (地藏干, Hidden Stems)
 * 각 지지 안에 숨겨진 천간. [본기, 중기?, 여기?]
 * 십신 판정 시 본기(첫 번째)의 오행/음양을 사용
 */
export const HIDDEN_STEMS: Record<EarthlyBranch, HeavenlyStem[]> = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '庚', '戊'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲'],
};

/**
 * 지지 본기 (本氣) — 지장간의 첫 번째 천간
 * 십신 판정 시 지지의 오행/음양은 이것을 사용
 */
export const BRANCH_MAIN_STEM: Record<EarthlyBranch, HeavenlyStem> = {
  '子': '癸', '丑': '己', '寅': '甲', '卯': '乙',
  '辰': '戊', '巳': '丙', '午': '丁', '未': '己',
  '申': '庚', '酉': '辛', '戌': '戊', '亥': '壬',
};

/**
 * 월건표 (月建表)
 * 년간 기준으로 인월(1월)의 천간을 결정.
 * 예: 년간이 甲 또는 己이면 인월 천간은 丙.
 */
export const MONTH_STEM_START: Record<HeavenlyStem, HeavenlyStem> = {
  '甲': '丙', '己': '丙',
  '乙': '戊', '庚': '戊',
  '丙': '庚', '辛': '庚',
  '丁': '壬', '壬': '壬',
  '戊': '甲', '癸': '甲'
};

/**
 * 시두법 (時頭法)
 * 일간 기준으로 자시(子時)의 천간을 결정.
 * 예: 일간이 甲 또는 己이면 자시 천간은 甲.
 */
export const HOUR_STEM_START: Record<HeavenlyStem, HeavenlyStem> = {
  '甲': '甲', '己': '甲',
  '乙': '丙', '庚': '丙',
  '丙': '戊', '辛': '戊',
  '丁': '庚', '壬': '庚',
  '戊': '壬', '癸': '壬'
};

/**
 * 시간 → 지지 매핑
 * 23:00~01:00 = 子, 01:00~03:00 = 丑, ...
 */
export function hourToBranch(hour: number): EarthlyBranch {
  const idx = Math.floor(((hour + 1) % 24) / 2);
  return BRANCHES[idx];
}

/**
 * 절기(節) 월 지지 순서 (인월=1월 ~ 축월=12월)
 * 사주의 월은 인월(寅)부터 시작
 */
export const MONTH_BRANCHES: readonly EarthlyBranch[] = [
  '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'
] as const;

/** 오행 스페인어 */
export const ELEMENT_SPANISH: Record<FiveElement, string> = {
  wood: 'Madera', fire: 'Fuego', earth: 'Tierra', metal: 'Metal', water: 'Agua'
};

/** 지지 스페인어 (12띠) */
export const BRANCH_SPANISH: Record<EarthlyBranch, string> = {
  '子': 'Rata', '丑': 'Buey', '寅': 'Tigre', '卯': 'Conejo',
  '辰': 'Dragón', '巳': 'Serpiente', '午': 'Caballo', '未': 'Cabra',
  '申': 'Mono', '酉': 'Gallo', '戌': 'Perro', '亥': 'Cerdo'
};
