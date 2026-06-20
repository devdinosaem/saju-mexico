import type { HeavenlyStem, EarthlyBranch, FourPillars } from 'manseryeok';
import { BRANCHES, STEMS } from 'manseryeok';

/**
 * 12신살 (十二神殺)
 */
export type TwelveSpiritStar =
  | 'geobsal'    // 겁살(劫殺)
  | 'jaesal'     // 재살(災殺)
  | 'cheonsal'   // 천살(天殺)
  | 'jisal'      // 지살(地殺)
  | 'nyeonsal'   // 년살(年殺)
  | 'wolsal'     // 월살(月殺)
  | 'mangsinsal' // 망신살(亡身殺)
  | 'jangseong'  // 장성살(將星殺)
  | 'banan'      // 반안살(攀鞍殺)
  | 'yeokma'     // 역마살(驛馬殺)
  | 'yukhae'     // 육해살(六害殺)
  | 'hwagae';    // 화개살(華蓋殺)

export const SPIRIT_STAR_KOREAN: Record<TwelveSpiritStar, string> = {
  geobsal: '겁살', jaesal: '재살', cheonsal: '천살', jisal: '지살',
  nyeonsal: '년살', wolsal: '월살', mangsinsal: '망신살', jangseong: '장성살',
  banan: '반안살', yeokma: '역마살', yukhae: '육해살', hwagae: '화개살',
};

export const SPIRIT_STAR_SPANISH: Record<TwelveSpiritStar, string> = {
  geobsal: 'Alerta de [Asalto]', jaesal: 'Alerta de [Desastre]',
  cheonsal: 'Alerta [Celestial]', jisal: 'Alerta [Terrenal]',
  nyeonsal: 'Alerta [Anual]', wolsal: 'Alerta [Mensual]',
  mangsinsal: 'Alerta de [Reputación]', jangseong: 'Influencia de [Comando]',
  banan: 'Influencia de [Estabilidad]', yeokma: 'Influencia de [Vagabundeo]',
  yukhae: 'Alerta de [Conflicto]', hwagae: 'Influencia de [Espiritualidad]',
};

const SPIRIT_STAR_ORDER: readonly TwelveSpiritStar[] = [
  'geobsal', 'jaesal', 'cheonsal', 'jisal', 'nyeonsal', 'wolsal',
  'mangsinsal', 'jangseong', 'banan', 'yeokma', 'yukhae', 'hwagae',
] as const;

/**
 * 삼합(三合) 그룹의 첫 번째 지지 인덱스
 *
 * 寅午戌 → 寅(2), 巳酉丑 → 巳(5), 申子辰 → 申(8), 亥卯未 → 亥(11)
 */
const SAMHAP_FIRST: Record<EarthlyBranch, number> = {
  '寅': 2, '午': 2, '戌': 2,
  '巳': 5, '酉': 5, '丑': 5,
  '申': 8, '子': 8, '辰': 8,
  '亥': 11, '卯': 11, '未': 11,
};

/**
 * 12신살 판정
 *
 * 기준 지지(년지 또는 일지)의 삼합 그룹으로부터
 * 대상 지지가 어떤 12신살인지 판정
 */
export function getTwelveSpiritStar(referenceBranch: EarthlyBranch, targetBranch: EarthlyBranch): TwelveSpiritStar {
  const firstIdx = SAMHAP_FIRST[referenceBranch];
  const startIdx = (firstIdx - 3 + 12) % 12; // 겁살 시작점
  const targetIdx = BRANCHES.indexOf(targetBranch);
  const spiritIdx = (targetIdx - startIdx + 12) % 12;
  return SPIRIT_STAR_ORDER[spiritIdx];
}

/**
 * 4기둥 전체 12신살 분석
 *
 * - 년주: 일지 기준 (교차 판정)
 * - 월주/일주/시주: 년지 기준
 */
export function analyzeSpiritStars(pillars: FourPillars): SpiritStarResult {
  const yearBranch = pillars.year.branch;
  const dayBranch = pillars.day.branch;

  return {
    year: getTwelveSpiritStar(dayBranch, yearBranch),
    month: getTwelveSpiritStar(yearBranch, pillars.month.branch),
    day: getTwelveSpiritStar(yearBranch, dayBranch),
    hour: getTwelveSpiritStar(yearBranch, pillars.hour.branch),
  };
}

export interface SpiritStarResult {
  year: TwelveSpiritStar;
  month: TwelveSpiritStar;
  day: TwelveSpiritStar;
  hour: TwelveSpiritStar;
}

// ──────────────────────────────────────
// 길성 (吉星) / 개별 신살
// ──────────────────────────────────────

export type SpecialStar = string;

/**
 * 문창귀인 (文昌貴人) — 일간 기준
 * 학문, 시험, 문서에 유리
 */
const MUNCHANG: Record<HeavenlyStem, EarthlyBranch> = {
  '甲': '巳', '乙': '午', '丙': '申', '丁': '酉', '戊': '申',
  '己': '酉', '庚': '亥', '辛': '子', '壬': '寅', '癸': '卯',
};

/**
 * 학당귀인 (學堂貴人) — 일간 기준
 * 학업 성취, 총명
 */
const HAKDANG: Record<HeavenlyStem, EarthlyBranch> = {
  '甲': '亥', '乙': '午', '丙': '寅', '丁': '酉', '戊': '寅',
  '己': '酉', '庚': '巳', '辛': '子', '壬': '申', '癸': '卯',
};

/**
 * 천을귀인 (天乙貴人) — 일간 기준
 * 귀인의 도움, 위기 탈출
 */
const CHEONUL: Record<HeavenlyStem, EarthlyBranch[]> = {
  '甲': ['丑', '未'], '乙': ['子', '申'], '丙': ['亥', '酉'], '丁': ['亥', '酉'],
  '戊': ['丑', '未'], '己': ['子', '申'], '庚': ['丑', '未'], '辛': ['寅', '午'],
  '壬': ['卯', '巳'], '癸': ['卯', '巳'],
};

/**
 * 태극귀인 (太極貴人) — 일간 기준
 * 신비한 보호, 종교적 인연
 */
const TAEGEUK: Record<HeavenlyStem, EarthlyBranch[]> = {
  '甲': ['子', '午'], '乙': ['卯', '酉'], '丙': ['午', '卯'], '丁': ['酉', '午'],
  '戊': ['子', '午'], '己': ['卯', '酉'], '庚': ['寅', '亥'], '辛': ['子', '巳'],
  '壬': ['申', '酉'], '癸': ['卯', '辰'],
};

/**
 * 홍염살 (紅艷殺) — 일간 기준
 * 이성에 대한 매력, 색정
 */
const HONGYEOM: Record<HeavenlyStem, EarthlyBranch> = {
  '甲': '午', '乙': '申', '丙': '寅', '丁': '未',  '戊': '辰',
  '己': '辰', '庚': '戌', '辛': '酉', '壬': '子', '癸': '申',
};

/**
 * 도화살 (桃花殺) — 년지/일지 삼합 기준
 * 이성 인연, 매력, 바람기
 */
const DOHWA: Record<number, EarthlyBranch> = {
  2: '卯',  // 寅午戌 → 卯
  5: '午',  // 巳酉丑 → 午
  8: '酉',  // 申子辰 → 酉
  11: '子', // 亥卯未 → 子
};

/**
 * 현침살 (懸針殺) — 특정 글자의 형태에 기반
 * 甲, 申, 卯, 午 등 글자 획이 뾰족한 것
 */
const HYEONCHIM_STEMS: HeavenlyStem[] = ['甲', '辛', '壬'];
const HYEONCHIM_BRANCHES: EarthlyBranch[] = ['卯', '午', '申', '酉'];

// ── 추가 신살 데이터 ──

/**
 * 괴강살 (魁罡殺) — 특정 간지 조합
 * 결단력, 강한 카리스마, 극단적 성향
 */
const GOEGANG_PILLARS = ['庚辰', '庚戌', '壬辰', '壬戌'] as const;

/**
 * 천덕귀인 (天德貴人) — 월지 기준 → 천간
 * 하늘의 덕, 위기 극복, 은인
 */
const CHEONDUK: Record<EarthlyBranch, HeavenlyStem> = {
  '寅': '丁', '卯': '壬', '辰': '壬', '巳': '辛', '午': '甲', '未': '癸',
  '申': '壬', '酉': '丙', '戌': '丙', '亥': '乙', '子': '己', '丑': '庚',
};

/**
 * 월덕귀인 (月德貴人) — 월지 삼합 기준 → 천간
 * 寅午戌月→丙, 巳酉丑月→庚, 申子辰月→壬, 亥卯未月→甲
 */
const WOLDUK: Record<number, HeavenlyStem> = {
  2: '丙',   // 寅午戌
  5: '庚',   // 巳酉丑
  8: '壬',   // 申子辰
  11: '甲',  // 亥卯未
};

/**
 * 금여성 (金輿星) — 일간 기준
 * 귀인의 수레, 물질적 풍요
 */
const GEUMYEO: Record<HeavenlyStem, EarthlyBranch> = {
  '甲': '辰', '乙': '巳', '丙': '未', '丁': '申', '戊': '未',
  '己': '申', '庚': '戌', '辛': '亥', '壬': '丑', '癸': '寅',
};

/**
 * 암록 (暗祿) — 일간 정록의 육합 위치
 * 숨은 녹, 보이지 않는 도움
 */
const YUKAP: Record<EarthlyBranch, EarthlyBranch> = {
  '子': '丑', '丑': '子', '寅': '亥', '卯': '戌', '辰': '酉', '巳': '申',
  '午': '未', '未': '午', '申': '巳', '酉': '辰', '戌': '卯', '亥': '寅',
};
const GEONROK_MAP: Record<HeavenlyStem, EarthlyBranch> = {
  '甲': '寅', '乙': '卯', '丙': '巳', '丁': '午', '戊': '巳',
  '己': '午', '庚': '申', '辛': '酉', '壬': '亥', '癸': '子',
};

/**
 * 관귀학관 (官貴學館) — 일간 기준
 * 학문으로 출세, 시험 합격
 */
const GWANGWI: Record<HeavenlyStem, EarthlyBranch> = {
  '甲': '巳', '乙': '午', '丙': '申', '丁': '酉', '戊': '申',
  '己': '酉', '庚': '亥', '辛': '子', '壬': '寅', '癸': '卯',
};

/**
 * 백호대살 (白虎大殺) — 일간 기준
 * 사고, 수술, 급격한 변화
 */
const BAEKHO: Record<HeavenlyStem, EarthlyBranch> = {
  '甲': '辰', '乙': '丑', '丙': '戌', '丁': '未', '戊': '辰',
  '己': '丑', '庚': '戌', '辛': '未', '壬': '辰', '癸': '丑',
};

/**
 * 역마살/화개살 위치 (삼합 기준)
 */
const YEOKMA: Record<number, EarthlyBranch> = {
  2: '申',  // 寅午戌 → 역마 申
  5: '亥',  // 巳酉丑 → 역마 亥
  8: '寅',  // 申子辰 → 역마 寅
  11: '巳', // 亥卯未 → 역마 巳
};
const HWAGAE: Record<number, EarthlyBranch> = {
  2: '戌',  // 寅午戌 → 화개 戌
  5: '丑',  // 巳酉丑 → 화개 丑
  8: '辰',  // 申子辰 → 화개 辰
  11: '未', // 亥卯未 → 화개 未
};

/**
 * 특정 기둥에 해당하는 모든 길성/흉성 조회
 */
export function getSpecialStars(
  dayMasterStem: HeavenlyStem,
  monthBranch: EarthlyBranch,
  allBranches: EarthlyBranch[],
  targetStem: HeavenlyStem,
  targetBranch: EarthlyBranch,
): string[] {
  const stars: string[] = [];

  // 천덕귀인 — 월지 기준
  if (targetStem === CHEONDUK[monthBranch]) {
    stars.push('천덕귀인');
  }

  // 월덕귀인 — 월지 삼합 기준
  const monthGroup = SAMHAP_FIRST[monthBranch];
  if (targetStem === WOLDUK[monthGroup]) {
    stars.push('월덕귀인');
  }

  // 문창귀인
  if (targetBranch === MUNCHANG[dayMasterStem]) {
    stars.push('문창귀인');
  }

  // 학당귀인
  if (targetBranch === HAKDANG[dayMasterStem]) {
    stars.push('학당귀인');
  }

  // 천을귀인
  if (CHEONUL[dayMasterStem].includes(targetBranch)) {
    stars.push('천을귀인');
  }

  // 태극귀인
  if (TAEGEUK[dayMasterStem].includes(targetBranch)) {
    stars.push('태극귀인');
  }

  // 암록 — 일간 정록의 육합
  const amrok = YUKAP[GEONROK_MAP[dayMasterStem]];
  if (targetBranch === amrok) {
    stars.push('암록');
  }

  // 관귀학관
  if (targetBranch === GWANGWI[dayMasterStem]) {
    stars.push('관귀학관');
  }

  // 금여성
  if (targetBranch === GEUMYEO[dayMasterStem]) {
    stars.push('금여성');
  }

  // 괴강살 — 간지 조합 체크
  if (GOEGANG_PILLARS.includes(`${targetStem}${targetBranch}` as typeof GOEGANG_PILLARS[number])) {
    stars.push('괴강살');
  }

  // 홍염살
  if (targetBranch === HONGYEOM[dayMasterStem]) {
    stars.push('홍염살');
  }

  // 백호대살
  if (targetBranch === BAEKHO[dayMasterStem]) {
    stars.push('백호대살');
  }

  // 도화살 — 子午卯酉(사정위)
  const DOHWA_BRANCHES: EarthlyBranch[] = ['子', '午', '卯', '酉'];
  if (DOHWA_BRANCHES.includes(targetBranch)) {
    stars.push('도화살');
  }

  // 역마살 — 사주 내 모든 지지 삼합 기준으로 체크
  for (const b of allBranches) {
    const group = SAMHAP_FIRST[b];
    if (targetBranch === YEOKMA[group]) {
      stars.push('역마살');
      break;
    }
  }

  // 화개살 — 사주 내 모든 지지 삼합 기준으로 체크
  for (const b of allBranches) {
    const group = SAMHAP_FIRST[b];
    if (targetBranch === HWAGAE[group]) {
      stars.push('화개살');
      break;
    }
  }

  // 천문성 — 戌
  if (targetBranch === '戌') {
    stars.push('천문성');
  }

  // 현침살
  if (HYEONCHIM_STEMS.includes(targetStem) || HYEONCHIM_BRANCHES.includes(targetBranch)) {
    stars.push('현침살');
  }

  // 정록
  if (targetBranch === GEONROK_MAP[dayMasterStem]) {
    stars.push('정록');
  }

  return stars;
}

/**
 * 4기둥 전체 길성/흉성 분석
 */
export interface SpecialStarsResult {
  year: string[];
  month: string[];
  day: string[];
  hour: string[];
  all: string[];
}

export function analyzeSpecialStars(pillars: FourPillars, dayMasterStem: HeavenlyStem): SpecialStarsResult {
  const mb = pillars.month.branch;
  const allBranches: EarthlyBranch[] = [pillars.year.branch, pillars.month.branch, pillars.day.branch, pillars.hour.branch];

  const year = getSpecialStars(dayMasterStem, mb, allBranches, pillars.year.stem, pillars.year.branch);
  const month = getSpecialStars(dayMasterStem, mb, allBranches, pillars.month.stem, pillars.month.branch);
  const day = getSpecialStars(dayMasterStem, mb, allBranches, pillars.day.stem, pillars.day.branch);
  const hour = getSpecialStars(dayMasterStem, mb, allBranches, pillars.hour.stem, pillars.hour.branch);

  const allSet = new Set([...year, ...month, ...day, ...hour]);

  return { year, month, day, hour, all: [...allSet] };
}
