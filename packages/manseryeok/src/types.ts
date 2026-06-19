/** 천간 (天干, Heavenly Stems) */
export type HeavenlyStem = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';

/** 지지 (地支, Earthly Branches) */
export type EarthlyBranch = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';

/** 오행 (五行, Five Elements) */
export type FiveElement = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

/** 음양 */
export type YinYang = 'yang' | 'yin';

/** 간지 (干支) 조합 */
export interface GanZhi {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
}

/** 사주 4기둥 */
export interface FourPillars {
  year: GanZhi;
  month: GanZhi;
  day: GanZhi;
  hour: GanZhi;
}

/** 오행 분포 */
export interface FiveElementCount {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

/** 사주 계산 입력 */
export interface BirthInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  isLunar?: boolean;
  /** 도시 이름 (지역시 자동 보정) */
  city?: string;
  /** 직접 경도 지정 (도시 DB에 없을 때) */
  longitude?: number;
  /** UTC 오프셋 (longitude 사용 시 필수) */
  utcOffset?: number;
}

/** 사주 계산 결과 */
export interface SajuResult {
  input: BirthInput;
  fourPillars: FourPillars;
  fiveElements: FiveElementCount;
  dayMaster: {
    stem: HeavenlyStem;
    element: FiveElement;
    yinYang: YinYang;
  };
  /** 지역시 보정 정보 (적용된 경우) */
  localTimeCorrection?: {
    city?: string;
    longitude: number;
    utcOffset: number;
    correctionMinutes: number;
    originalTime: string;
    correctedTime: string;
  };
}
