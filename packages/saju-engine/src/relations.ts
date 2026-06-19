import type { HeavenlyStem, EarthlyBranch, FourPillars } from 'manseryeok';
import { STEMS, BRANCHES } from 'manseryeok';

// ──────────────────────────────────────
// 천간 관계 (天干)
// ──────────────────────────────────────

/**
 * 천간합 (天干合) — 두 천간이 합하여 오행이 변할 수 있음
 * 甲己합토, 乙庚합금, 丙辛합수, 丁壬합목, 戊癸합화
 */
const STEM_COMBINATIONS: [HeavenlyStem, HeavenlyStem, string][] = [
  ['甲', '己', '토(土)'],
  ['乙', '庚', '금(金)'],
  ['丙', '辛', '수(水)'],
  ['丁', '壬', '목(木)'],
  ['戊', '癸', '화(火)'],
];

/**
 * 천간충 (天干沖) — 같은 오행 다른 음양이 충돌
 * 甲庚충, 乙辛충, 丙壬충, 丁癸충
 */
const STEM_CLASHES: [HeavenlyStem, HeavenlyStem][] = [
  ['甲', '庚'], ['乙', '辛'], ['丙', '壬'], ['丁', '癸'],
];

// ──────────────────────────────────────
// 지지 관계 (地支)
// ──────────────────────────────────────

/**
 * 지지 육합 (六合) — 두 지지가 합
 */
const BRANCH_YUKAP: [EarthlyBranch, EarthlyBranch, string][] = [
  ['子', '丑', '토(土)'], ['寅', '亥', '목(木)'], ['卯', '戌', '화(火)'],
  ['辰', '酉', '금(金)'], ['巳', '申', '수(水)'], ['午', '未', '화(火)/토(土)'],
];

/**
 * 지지 삼합 (三合) — 세 지지가 합하여 오행 형성
 */
const BRANCH_SAMHAP: [EarthlyBranch, EarthlyBranch, EarthlyBranch, string][] = [
  ['寅', '午', '戌', '화(火)'],
  ['巳', '酉', '丑', '금(金)'],
  ['申', '子', '辰', '수(水)'],
  ['亥', '卯', '未', '목(木)'],
];

/**
 * 지지 방합 (方合) — 같은 방위 세 지지
 */
const BRANCH_BANGHAP: [EarthlyBranch, EarthlyBranch, EarthlyBranch, string][] = [
  ['寅', '卯', '辰', '목(木) 동방'],
  ['巳', '午', '未', '화(火) 남방'],
  ['申', '酉', '戌', '금(金) 서방'],
  ['亥', '子', '丑', '수(水) 북방'],
];

/**
 * 지지충 (地支沖) — 정반대 방위 충돌
 */
const BRANCH_CLASHES: [EarthlyBranch, EarthlyBranch][] = [
  ['子', '午'], ['丑', '未'], ['寅', '申'], ['卯', '酉'], ['辰', '戌'], ['巳', '亥'],
];

/**
 * 지지형 (地支刑) — 세 가지 유형
 */
const BRANCH_PUNISHMENTS: [EarthlyBranch, EarthlyBranch, string][] = [
  // 삼형 (무례지형)
  ['寅', '巳', '무례지형'], ['巳', '申', '무례지형'], ['寅', '申', '무례지형'],
  // 상형 (무은지형)
  ['丑', '戌', '무은지형'], ['戌', '未', '무은지형'], ['丑', '未', '무은지형'],
  // 자형 (자기형벌)
  ['辰', '辰', '자형'], ['午', '午', '자형'], ['酉', '酉', '자형'], ['亥', '亥', '자형'],
  // 상형
  ['子', '卯', '무례지형'],
];

/**
 * 지지파 (地支破)
 */
const BRANCH_BREAKS: [EarthlyBranch, EarthlyBranch][] = [
  ['子', '酉'], ['丑', '辰'], ['寅', '亥'], ['卯', '午'], ['巳', '申'], ['未', '戌'],
];

/**
 * 지지해 (地支害) — 육해
 */
const BRANCH_HARMS: [EarthlyBranch, EarthlyBranch][] = [
  ['子', '未'], ['丑', '午'], ['寅', '巳'], ['卯', '辰'], ['申', '亥'], ['酉', '戌'],
];

// ──────────────────────────────────────
// 분석 결과 타입
// ──────────────────────────────────────

export interface RelationEntry {
  type: '천간합' | '천간충' | '육합' | '삼합' | '방합' | '충' | '형' | '파' | '해';
  positions: string[];
  chars: string[];
  result?: string;
  description: string;
}

export interface RelationsResult {
  relations: RelationEntry[];
  summary: {
    hapCount: number;   // 합 총 개수
    chungCount: number; // 충 총 개수
    hyeongCount: number; // 형
    paCount: number;    // 파
    haeCount: number;   // 해
  };
}

// ──────────────────────────────────────
// 분석 로직
// ──────────────────────────────────────

const POSITION_LABELS = ['년', '월', '일', '시'] as const;

export function analyzeRelations(pillars: FourPillars): RelationsResult {
  const stems: [HeavenlyStem, string][] = [
    [pillars.year.stem, '년간'],
    [pillars.month.stem, '월간'],
    [pillars.day.stem, '일간'],
    [pillars.hour.stem, '시간'],
  ];

  const branches: [EarthlyBranch, string][] = [
    [pillars.year.branch, '년지'],
    [pillars.month.branch, '월지'],
    [pillars.day.branch, '일지'],
    [pillars.hour.branch, '시지'],
  ];

  const relations: RelationEntry[] = [];

  // 천간합/충 — 인접한 기둥 간 + 원거리도 체크
  for (let i = 0; i < stems.length; i++) {
    for (let j = i + 1; j < stems.length; j++) {
      const [s1, p1] = stems[i];
      const [s2, p2] = stems[j];

      for (const [a, b, result] of STEM_COMBINATIONS) {
        if ((s1 === a && s2 === b) || (s1 === b && s2 === a)) {
          relations.push({
            type: '천간합',
            positions: [p1, p2],
            chars: [s1, s2],
            result,
            description: `${s1}${s2}합 → ${result}`,
          });
        }
      }

      for (const [a, b] of STEM_CLASHES) {
        if ((s1 === a && s2 === b) || (s1 === b && s2 === a)) {
          relations.push({
            type: '천간충',
            positions: [p1, p2],
            chars: [s1, s2],
            description: `${s1}${s2}충`,
          });
        }
      }
    }
  }

  // 지지 관계 — 모든 쌍 체크
  for (let i = 0; i < branches.length; i++) {
    for (let j = i + 1; j < branches.length; j++) {
      const [b1, p1] = branches[i];
      const [b2, p2] = branches[j];

      // 육합
      for (const [a, b, result] of BRANCH_YUKAP) {
        if ((b1 === a && b2 === b) || (b1 === b && b2 === a)) {
          relations.push({
            type: '육합',
            positions: [p1, p2],
            chars: [b1, b2],
            result,
            description: `${b1}${b2}합 → ${result}`,
          });
        }
      }

      // 충
      for (const [a, b] of BRANCH_CLASHES) {
        if ((b1 === a && b2 === b) || (b1 === b && b2 === a)) {
          relations.push({
            type: '충',
            positions: [p1, p2],
            chars: [b1, b2],
            description: `${b1}${b2}충`,
          });
        }
      }

      // 형
      for (const [a, b, kind] of BRANCH_PUNISHMENTS) {
        if ((b1 === a && b2 === b) || (b1 === b && b2 === a)) {
          relations.push({
            type: '형',
            positions: [p1, p2],
            chars: [b1, b2],
            description: `${b1}${b2}형 (${kind})`,
          });
        }
      }

      // 파
      for (const [a, b] of BRANCH_BREAKS) {
        if ((b1 === a && b2 === b) || (b1 === b && b2 === a)) {
          relations.push({
            type: '파',
            positions: [p1, p2],
            chars: [b1, b2],
            description: `${b1}${b2}파`,
          });
        }
      }

      // 해
      for (const [a, b] of BRANCH_HARMS) {
        if ((b1 === a && b2 === b) || (b1 === b && b2 === a)) {
          relations.push({
            type: '해',
            positions: [p1, p2],
            chars: [b1, b2],
            description: `${b1}${b2}해`,
          });
        }
      }
    }
  }

  // 자형 (같은 지지 2개 이상)
  const branchChars = branches.map(b => b[0]);
  for (const [a, , kind] of BRANCH_PUNISHMENTS) {
    if (a !== BRANCH_PUNISHMENTS.find(p => p[0] === a && p[1] === a)?.[1]) continue;
    // 자형: 같은 글자가 2개 이상
    const indices = branchChars.map((b, i) => b === a ? i : -1).filter(i => i >= 0);
    if (indices.length >= 2) {
      relations.push({
        type: '형',
        positions: indices.map(i => branches[i][1]),
        chars: indices.map(() => a),
        description: `${a}${a}자형`,
      });
    }
  }

  // 삼합 — 3개 모두 있는지 체크
  for (const [a, b, c, result] of BRANCH_SAMHAP) {
    const has = [a, b, c].every(x => branchChars.includes(x));
    if (has) {
      const positions = [a, b, c].map(x => {
        const idx = branchChars.indexOf(x);
        return branches[idx][1];
      });
      relations.push({
        type: '삼합',
        positions,
        chars: [a, b, c],
        result,
        description: `${a}${b}${c} 삼합 → ${result}`,
      });
    }
  }

  // 방합 — 3개 모두 있는지 체크
  for (const [a, b, c, result] of BRANCH_BANGHAP) {
    const has = [a, b, c].every(x => branchChars.includes(x));
    if (has) {
      relations.push({
        type: '방합',
        positions: [a, b, c].map(x => branches[branchChars.indexOf(x)][1]),
        chars: [a, b, c],
        result,
        description: `${a}${b}${c} 방합 → ${result}`,
      });
    }
  }

  return {
    relations,
    summary: {
      hapCount: relations.filter(r => ['천간합', '육합', '삼합', '방합'].includes(r.type)).length,
      chungCount: relations.filter(r => r.type === '충' || r.type === '천간충').length,
      hyeongCount: relations.filter(r => r.type === '형').length,
      paCount: relations.filter(r => r.type === '파').length,
      haeCount: relations.filter(r => r.type === '해').length,
    },
  };
}
