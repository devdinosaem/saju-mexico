import type { HeavenlyStem, EarthlyBranch, FiveElement, YinYang, GanZhi, FourPillars } from 'manseryeok';

/** 십신 (十神, Ten Gods) */
export type TenGod =
  | 'bijeon'    // 비견 (比肩) — 같은 오행, 같은 음양
  | 'geopjae'   // 겁재 (劫財) — 같은 오행, 다른 음양
  | 'siksin'    // 식신 (食神) — 내가 생하는, 같은 음양
  | 'sanggwan'  // 상관 (傷官) — 내가 생하는, 다른 음양
  | 'pyeonjae'  // 편재 (偏財) — 내가 극하는, 같은 음양
  | 'jeongjae'  // 정재 (正財) — 내가 극하는, 다른 음양
  | 'pyeongwan' // 편관 (偏官) — 나를 극하는, 같은 음양
  | 'jeonggwan' // 정관 (正官) — 나를 극하는, 다른 음양
  | 'pyeonin'   // 편인 (偏印) — 나를 생하는, 같은 음양
  | 'jeongin';  // 정인 (正印) — 나를 생하는, 다른 음양

/** 십신 한글 이름 */
export const TEN_GOD_KOREAN: Record<TenGod, string> = {
  bijeon: '비견',
  geopjae: '겁재',
  siksin: '식신',
  sanggwan: '상관',
  pyeonjae: '편재',
  jeongjae: '정재',
  pyeongwan: '편관',
  jeonggwan: '정관',
  pyeonin: '편인',
  jeongin: '정인',
};

/** 십신 한자 */
export const TEN_GOD_HANJA: Record<TenGod, string> = {
  bijeon: '比肩',
  geopjae: '劫財',
  siksin: '食神',
  sanggwan: '傷官',
  pyeonjae: '偏財',
  jeongjae: '正財',
  pyeongwan: '偏官',
  jeonggwan: '正官',
  pyeonin: '偏印',
  jeongin: '正印',
};

/** 십신 스페인어 */
export const TEN_GOD_SPANISH: Record<TenGod, string> = {
  bijeon: 'Compañero',
  geopjae: 'Rival',
  siksin: 'Creador',
  sanggwan: 'Rebelde',
  pyeonjae: 'Aventurero',
  jeongjae: 'Administrador',
  pyeongwan: 'Guerrero',
  jeonggwan: 'Líder',
  pyeonin: 'Místico',
  jeongin: 'Maestro',
};

/** 사주 한 글자의 십신 분석 결과 */
export interface TenGodEntry {
  position: 'year_stem' | 'year_branch' | 'month_stem' | 'month_branch' | 'day_stem' | 'day_branch' | 'hour_stem' | 'hour_branch';
  char: HeavenlyStem | EarthlyBranch;
  element: FiveElement;
  yinYang: YinYang;
  tenGod: TenGod;
}

/** 십신 분포 */
export type TenGodCount = Record<TenGod, number>;

/** 십신 분석 결과 */
export interface TenGodResult {
  entries: TenGodEntry[];
  count: TenGodCount;
  percentages: Record<TenGod, number>;
}
