import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('정치인 일주', () => {
  it('계산', () => {
    const people = [
      // 국무총리
      { name: "한덕수", birth: [1949, 12, 22], label: "국무총리", gender: "m" },

      // 한국은행
      { name: "이창용", birth: [1965, 4, 20], label: "한국은행 총재", gender: "m" },

      // 현직 장관들 (2025-2026 기준)
      { name: "조태열", birth: [1960, 2, 12], label: "외교부 장관", gender: "m" },
      { name: "김용현", birth: [1963, 3, 15], label: "국방부 장관", gender: "m" },
      // 김용현은 당근 창업자와 이름 겹침 — 별도 표기
      { name: "이상민", birth: [1958, 9, 2], label: "행정안전부 장관", gender: "m" },
      { name: "최상목", birth: [1967, 2, 5], label: "기획재정부 장관", gender: "m" },
      { name: "이주호", birth: [1961, 6, 15], label: "교육부 장관", gender: "m" },
      { name: "안덕근", birth: [1966, 4, 14], label: "산업통상자원부 장관", gender: "m" },
      { name: "이정식", birth: [1966, 1, 12], label: "고용노동부 장관", gender: "m" },
      { name: "원희룡", birth: [1964, 3, 31], label: "국토교통부 장관", gender: "m" },
      { name: "조규홍", birth: [1962, 8, 7], label: "보건복지부 장관", gender: "m" },
      { name: "한화진", birth: [1968, 5, 10], label: "환경부 장관", gender: "f" },
      { name: "박민수", birth: [1966, 9, 20], label: "보건복지부 2차관", gender: "m" },
      { name: "유인촌", birth: [1955, 8, 10], label: "문화체육관광부 장관", gender: "m" },
      { name: "송미령", birth: [1965, 7, 25], label: "농림축산식품부 장관", gender: "f" },
      { name: "승인호", birth: [1964, 11, 20], label: "해양수산부 장관", gender: "m" },
      { name: "이기일", birth: [1964, 2, 15], label: "보건복지부 1차관", gender: "m" },
      { name: "방문규", birth: [1965, 3, 1], label: "중소벤처기업부 장관", gender: "m" },
      { name: "이종호", birth: [1964, 5, 30], label: "과학기술정보통신부 장관", gender: "m" },
      { name: "김건희", birth: [1972, 9, 17], label: "영부인", gender: "f" },

      // 북한
      { name: "김정은", birth: [1984, 1, 8], label: "앗.....", gender: "m" },
      { name: "김일성", birth: [1912, 4, 15], label: "앗.....", gender: "m" },
      { name: "김정일", birth: [1941, 2, 16], label: "앗.....", gender: "m" },
      { name: "리설주", birth: [1989, 9, 28], label: "앗.....", gender: "f" },

      // 주요국 정상
      { name: "도널드 트럼프", birth: [1946, 6, 14], label: "미국 대통령", gender: "m" },
      { name: "시진핑", birth: [1953, 6, 15], label: "중국 주석", gender: "m" },
      { name: "이시바 시게루", birth: [1957, 2, 4], label: "일본 총리", gender: "m" },
      { name: "키어 스타머", birth: [1962, 9, 2], label: "영국 총리", gender: "m" },
      { name: "에마뉘엘 마크롱", birth: [1977, 12, 21], label: "프랑스 대통령", gender: "m" },
      { name: "올라프 숄츠", birth: [1958, 6, 14], label: "독일 총리", gender: "m" },
      { name: "조르자 멜로니", birth: [1977, 1, 15], label: "이탈리아 총리", gender: "f" },
      { name: "저스틴 트뤼도", birth: [1971, 12, 25], label: "캐나다 총리", gender: "m" },
      { name: "나렌드라 모디", birth: [1950, 9, 17], label: "인도 총리", gender: "m" },
      { name: "볼로디미르 젤렌스키", birth: [1978, 1, 25], label: "우크라이나 대통령", gender: "m" },
      { name: "조 바이든", birth: [1942, 11, 20], label: "미국 전 대통령", gender: "m" },
    ];

    console.log('\n=== 정치인 일주 ===\n');
    for (const p of people) {
      const ilju = getIlju(p.birth[0], p.birth[1], p.birth[2]);
      console.log(p.gender + ' | ' + ilju + ' | ' + p.name + ' | ' + p.label);
    }
  });
});
