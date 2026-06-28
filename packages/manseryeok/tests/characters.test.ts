import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('캐릭터+역사인물', () => {
  it('계산', () => {
    const entries = [
      // ── 가상 캐릭터 (생년월일 확실한 것만) ──
      // 카카오프렌즈 — 출시일 기준
      { name: "라이언", birth: [2016, 1, 22], label: "카카오프렌즈", gender: "m" },
      // 초기 7캐릭터 — 2012년 11월 (정확한 일자 불명, 11월 1일 기준)
      { name: "어피치", birth: [2012, 11, 1], label: "카카오프렌즈", gender: "f" },
      { name: "무지", birth: [2012, 11, 1], label: "카카오프렌즈", gender: "m" },
      { name: "콘", birth: [2012, 11, 1], label: "카카오프렌즈", gender: "m" },
      { name: "네오", birth: [2012, 11, 1], label: "카카오프렌즈", gender: "f" },
      { name: "프로도", birth: [2012, 11, 1], label: "카카오프렌즈", gender: "m" },
      { name: "튜브", birth: [2012, 11, 1], label: "카카오프렌즈", gender: "m" },
      { name: "제이지", birth: [2012, 11, 1], label: "카카오프렌즈", gender: "m" },

      // 기타 캐릭터 (방영/출시일 + 설정 생일)
      { name: "짱구(신노스케)", birth: [1992, 5, 5], label: "짱구는못말려", gender: "m" },
      { name: "도라에몽", birth: [1970, 1, 1], label: "도라에몽", gender: "m" }, // 만화 연재 시작 1969.12, 작중 생일 9/3이지만 2112년
      { name: "피카츄", birth: [1996, 2, 27], label: "포켓몬", gender: "m" }, // 포켓몬 레드/그린 발매일
      { name: "루피", birth: [1997, 5, 5], label: "원피스", gender: "m" }, // 설정 생일
      { name: "나루토", birth: [1999, 10, 10], label: "나루토", gender: "m" }, // 연재시작1999 + 설정생일10/10
      { name: "미키마우스", birth: [1928, 11, 18], label: "디즈니", gender: "m" },
      { name: "헬로키티", birth: [1974, 11, 1], label: "산리오", gender: "f" },
      { name: "스폰지밥", birth: [1999, 5, 1], label: "스폰지밥", gender: "m" }, // 방영시작 1999.5.1
      { name: "뽀로로", birth: [2003, 11, 27], label: "뽀로로", gender: "m" }, // 첫방영

      // ── 조선시대 왕 (양력 변환) ──
      // 음력→양력 변환은 정확하지 않을 수 있음. 일반적으로 알려진 양력 기준.
      { name: "태조 이성계", birth: [1335, 10, 27], label: "조선 제1대 왕", gender: "m" },
      { name: "세종대왕", birth: [1397, 5, 7], label: "조선 제4대 왕", gender: "m" },
      { name: "세조", birth: [1417, 11, 2], label: "조선 제7대 왕", gender: "m" },
      { name: "성종", birth: [1457, 8, 19], label: "조선 제9대 왕", gender: "m" },
      { name: "중종", birth: [1488, 4, 16], label: "조선 제11대 왕", gender: "m" },
      { name: "선조", birth: [1552, 11, 26], label: "조선 제14대 왕", gender: "m" },
      { name: "인조", birth: [1595, 12, 7], label: "조선 제16대 왕", gender: "m" },
      { name: "효종", birth: [1619, 7, 2], label: "조선 제17대 왕", gender: "m" },
      { name: "숙종", birth: [1661, 10, 7], label: "조선 제19대 왕", gender: "m" },
      { name: "영조", birth: [1694, 10, 31], label: "조선 제21대 왕", gender: "m" },
      { name: "정조", birth: [1752, 10, 28], label: "조선 제22대 왕", gender: "m" },
      { name: "고종", birth: [1852, 9, 8], label: "조선 제26대 왕", gender: "m" },
    ];

    console.log('\n=== 캐릭터+역사인물 일주 ===\n');
    for (const e of entries) {
      const ilju = getIlju(e.birth[0], e.birth[1], e.birth[2]);
      console.log(e.gender + ' | ' + ilju + ' | ' + e.name + ' | ' + e.label);
    }
  });
});
