import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('위인 일주', () => {
  it('계산', () => {
    const heroes = [
      // 양력 변환 완료된 생년월일
      // 이순신: 음력 1545.3.8 → 양력 1545.4.28
      { name: "이순신", birth: [1545, 4, 28], label: "충무공", gender: "m" },
      // 안중근: 1879.9.2 (양력)
      { name: "안중근", birth: [1879, 9, 2], label: "독립운동가", gender: "m" },
      // 유관순: 음력 1902.11.17 → 양력 1902.12.16
      { name: "유관순", birth: [1902, 12, 16], label: "독립운동가", gender: "f" },
      // 김구: 음력 1876.7.11 → 양력 1876.8.29
      { name: "김구", birth: [1876, 8, 29], label: "독립운동가", gender: "m" },
      // 안창호: 음력 1878.10.9 → 양력 1878.11.9
      { name: "안창호", birth: [1878, 11, 9], label: "독립운동가", gender: "m" },
      // 윤봉길: 음력 1908.6.21 → 양력 1908.6.21 (양력설 채택 이후)
      { name: "윤봉길", birth: [1908, 6, 21], label: "독립운동가", gender: "m" },
      // 신사임당: 음력 1504.10.29 → 양력 1504.12.5
      { name: "신사임당", birth: [1504, 12, 5], label: "예술가", gender: "f" },
      // 이황(퇴계): 음력 1501.11.25 → 양력 1502.1.3
      { name: "이황", birth: [1502, 1, 3], label: "퇴계 선생", gender: "m" },
      // 이이(율곡): 음력 1536.12.26 → 양력 1537.1.16 (강릉 출생)
      { name: "이이", birth: [1537, 1, 16], label: "율곡 선생", gender: "m" },
      // 장영실: 생년 불확실 (1390년경), 제외
      // 김정호: 생년 불확실 (1804년경), 제외
      // 권율: 1537.7.7 양력
      { name: "권율", birth: [1537, 7, 7], label: "행주대첩", gender: "m" },
    ];

    console.log('\n=== 위인 일주 ===\n');
    for (const h of heroes) {
      const ilju = getIlju(h.birth[0], h.birth[1], h.birth[2]);
      console.log(h.gender + ' | ' + ilju + ' | ' + h.name + ' | ' + h.label);
    }
  });
});
