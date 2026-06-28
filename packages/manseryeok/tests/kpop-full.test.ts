import { describe, it, expect } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('K-POP 전 그룹 일주 계산', () => {
  it('전체 멤버 일주 배치 계산', () => {
    const members = [
      // ══════════════════════════════════════
      // 남자 그룹
      // ══════════════════════════════════════

      // ── 1. 방탄소년단 (BTS) - 7명 ──
      { name: "BTS RM", birth: [1994, 9, 12], gender: "m" },
      { name: "BTS 진", birth: [1992, 12, 4], gender: "m" },
      { name: "BTS 슈가", birth: [1993, 3, 9], gender: "m" },
      { name: "BTS 제이홉", birth: [1994, 2, 18], gender: "m" },
      { name: "BTS 지민", birth: [1995, 10, 13], gender: "m" },
      { name: "BTS 뷔", birth: [1995, 12, 30], gender: "m" },
      { name: "BTS 정국", birth: [1997, 9, 1], gender: "m" },

      // ── 2. 세븐틴 (SEVENTEEN) - 13명 ──
      { name: "세븐틴 에스쿱스", birth: [1995, 8, 8], gender: "m" },
      { name: "세븐틴 정한", birth: [1995, 10, 4], gender: "m" },
      { name: "세븐틴 조슈아", birth: [1995, 12, 30], gender: "m" },
      { name: "세븐틴 준", birth: [1996, 6, 10], gender: "m" },
      { name: "세븐틴 호시", birth: [1996, 6, 15], gender: "m" },
      { name: "세븐틴 원우", birth: [1996, 7, 17], gender: "m" },
      { name: "세븐틴 우지", birth: [1996, 11, 22], gender: "m" },
      { name: "세븐틴 디에잇", birth: [1997, 11, 7], gender: "m" },
      { name: "세븐틴 민규", birth: [1997, 4, 6], gender: "m" },
      { name: "세븐틴 도겸", birth: [1997, 2, 18], gender: "m" },
      { name: "세븐틴 승관", birth: [1998, 1, 16], gender: "m" },
      { name: "세븐틴 버논", birth: [1998, 2, 18], gender: "m" },
      { name: "세븐틴 디노", birth: [1999, 2, 11], gender: "m" },

      // ── 3. 엔하이픈 (ENHYPEN) - 7명 ──
      { name: "엔하이픈 희승", birth: [2001, 10, 15], gender: "m" },
      { name: "엔하이픈 제이", birth: [2002, 4, 20], gender: "m" },
      { name: "엔하이픈 제이크", birth: [2002, 11, 15], gender: "m" },
      { name: "엔하이픈 성훈", birth: [2002, 12, 8], gender: "m" },
      { name: "엔하이픈 선우", birth: [2003, 6, 24], gender: "m" },
      { name: "엔하이픈 정원", birth: [2004, 2, 9], gender: "m" },
      { name: "엔하이픈 니키", birth: [2005, 12, 9], gender: "m" },

      // ── 4. 스트레이키즈 (Stray Kids) - 8명 ──
      { name: "스트레이키즈 방찬", birth: [1997, 10, 3], gender: "m" },
      { name: "스트레이키즈 리노", birth: [1998, 10, 25], gender: "m" },
      { name: "스트레이키즈 창빈", birth: [1999, 8, 11], gender: "m" },
      { name: "스트레이키즈 현진", birth: [2000, 3, 20], gender: "m" },
      { name: "스트레이키즈 한", birth: [2000, 9, 14], gender: "m" },
      { name: "스트레이키즈 필릭스", birth: [2000, 9, 15], gender: "m" },
      { name: "스트레이키즈 승민", birth: [2000, 9, 22], gender: "m" },
      { name: "스트레이키즈 아이엔", birth: [2001, 2, 8], gender: "m" },

      // ── 5. 더보이즈 (THE BOYZ) - 11명 ──
      { name: "더보이즈 상연", birth: [1996, 11, 4], gender: "m" },
      { name: "더보이즈 제이콥", birth: [1997, 5, 30], gender: "m" },
      { name: "더보이즈 영훈", birth: [1997, 8, 8], gender: "m" },
      { name: "더보이즈 현재", birth: [1997, 9, 13], gender: "m" },
      { name: "더보이즈 주연", birth: [1998, 11, 10], gender: "m" },
      { name: "더보이즈 케빈", birth: [1998, 2, 23], gender: "m" },
      { name: "더보이즈 뉴", birth: [1998, 4, 26], gender: "m" },
      { name: "더보이즈 큐", birth: [1998, 11, 5], gender: "m" },
      { name: "더보이즈 주학년", birth: [1999, 3, 9], gender: "m" },
      { name: "더보이즈 선우", birth: [2000, 4, 12], gender: "m" },
      { name: "더보이즈 에릭", birth: [2000, 12, 22], gender: "m" },

      // ── 6. 엑소 (EXO) - 9명 ──
      { name: "엑소 수호", birth: [1991, 5, 22], gender: "m" },
      { name: "엑소 시우민", birth: [1990, 3, 26], gender: "m" },
      { name: "엑소 레이", birth: [1991, 10, 7], gender: "m" },
      { name: "엑소 백현", birth: [1992, 5, 6], gender: "m" },
      { name: "엑소 첸", birth: [1992, 9, 21], gender: "m" },
      { name: "엑소 찬열", birth: [1992, 11, 27], gender: "m" },
      { name: "엑소 디오", birth: [1993, 1, 12], gender: "m" },
      { name: "엑소 카이", birth: [1994, 1, 14], gender: "m" },
      { name: "엑소 세훈", birth: [1994, 4, 12], gender: "m" },

      // ── 7. 샤이니 (SHINee) - 4명 (현재) ──
      { name: "샤이니 온유", birth: [1989, 12, 14], gender: "m" },
      { name: "샤이니 키", birth: [1991, 9, 23], gender: "m" },
      { name: "샤이니 민호", birth: [1991, 12, 9], gender: "m" },
      { name: "샤이니 태민", birth: [1993, 7, 18], gender: "m" },

      // ── 8. NCT 127 - 9명 ──
      { name: "NCT127 태일", birth: [1994, 6, 14], gender: "m" },
      { name: "NCT127 쟈니", birth: [1995, 2, 9], gender: "m" },
      { name: "NCT127 태용", birth: [1995, 7, 1], gender: "m" },
      { name: "NCT127 유타", birth: [1995, 10, 26], gender: "m" },
      { name: "NCT127 도영", birth: [1996, 2, 1], gender: "m" },
      { name: "NCT127 재현", birth: [1997, 2, 14], gender: "m" },
      { name: "NCT127 정우", birth: [1998, 2, 19], gender: "m" },
      { name: "NCT127 마크", birth: [1999, 8, 2], gender: "m" },
      { name: "NCT127 해찬", birth: [2000, 6, 6], gender: "m" },

      // ── 9. NCT DREAM - 7명 ──
      { name: "NCT드림 마크", birth: [1999, 8, 2], gender: "m" },
      { name: "NCT드림 런쥔", birth: [2000, 3, 23], gender: "m" },
      { name: "NCT드림 제노", birth: [2000, 4, 23], gender: "m" },
      { name: "NCT드림 해찬", birth: [2000, 6, 6], gender: "m" },
      { name: "NCT드림 재민", birth: [2000, 8, 13], gender: "m" },
      { name: "NCT드림 천러", birth: [2001, 11, 22], gender: "m" },
      { name: "NCT드림 지성", birth: [2002, 2, 5], gender: "m" },

      // ── 10. 플레이브 (PLAVE) - 5명 ──
      { name: "플레이브 은호", birth: [1999, 4, 17], gender: "m" },
      { name: "플레이브 노아", birth: [2000, 5, 6], gender: "m" },
      { name: "플레이브 밤비", birth: [2000, 11, 24], gender: "m" },
      { name: "플레이브 하민", birth: [2002, 8, 5], gender: "m" },
      { name: "플레이브 예준", birth: [2003, 6, 30], gender: "m" },

      // ── 11. NCT WISH - 6명 (2024 데뷔) ──
      { name: "NCTWISH 시온", birth: [2002, 6, 19], gender: "m" },
      { name: "NCTWISH 류이", birth: [2004, 8, 12], gender: "m" },
      { name: "NCTWISH 재희", birth: [2005, 1, 3], gender: "m" },
      { name: "NCTWISH 유우시", birth: [2005, 7, 12], gender: "m" },
      { name: "NCTWISH 사쿠야", birth: [2006, 6, 1], gender: "m" },
      { name: "NCTWISH 리쿠", birth: [2006, 12, 20], gender: "m" },

      // ── 12. 비투비 (BTOB) - 6명 ──
      { name: "비투비 은광", birth: [1990, 11, 22], gender: "m" },
      { name: "비투비 민혁", birth: [1990, 11, 29], gender: "m" },
      { name: "비투비 창섭", birth: [1991, 2, 26], gender: "m" },
      { name: "비투비 혁식", birth: [1991, 6, 7], gender: "m" },
      { name: "비투비 프니엘", birth: [1993, 3, 10], gender: "m" },
      { name: "비투비 성재", birth: [1995, 5, 2], gender: "m" },

      // ── 13. 데이식스 (DAY6) - 5명 ──
      { name: "데이식스 성진", birth: [1993, 1, 16], gender: "m" },
      { name: "데이식스 제이", birth: [1992, 9, 15], gender: "m" },
      { name: "데이식스 영케이", birth: [1993, 12, 19], gender: "m" },
      { name: "데이식스 원필", birth: [1994, 4, 28], gender: "m" },
      { name: "데이식스 도운", birth: [1995, 8, 25], gender: "m" },

      // ── 14. 투모로우바이투게더 (TXT) - 5명 ──
      { name: "TXT 수빈", birth: [2000, 12, 5], gender: "m" },
      { name: "TXT 연준", birth: [1999, 9, 13], gender: "m" },
      { name: "TXT 범규", birth: [2001, 3, 13], gender: "m" },
      { name: "TXT 태현", birth: [2002, 2, 5], gender: "m" },
      { name: "TXT 휴닝카이", birth: [2002, 8, 14], gender: "m" },

      // ── 15. 잔나비 - 4명 ──
      { name: "잔나비 최정훈", birth: [1994, 2, 21], gender: "m" },
      { name: "잔나비 김도형", birth: [1994, 12, 4], gender: "m" },
      { name: "잔나비 장경준", birth: [1993, 11, 12], gender: "m" },
      { name: "잔나비 유영현", birth: [1993, 6, 10], gender: "m" },

      // ── 16. 라이즈 (RIIZE) - 7명 ──
      { name: "라이즈 쇼타로", birth: [2000, 11, 25], gender: "m" },
      { name: "라이즈 은석", birth: [2001, 7, 26], gender: "m" },
      { name: "라이즈 성찬", birth: [2001, 9, 13], gender: "m" },
      { name: "라이즈 원빈", birth: [2002, 4, 14], gender: "m" },
      { name: "라이즈 승한", birth: [2003, 10, 11], gender: "m" },
      { name: "라이즈 소희", birth: [2003, 12, 21], gender: "m" },
      { name: "라이즈 앤톤", birth: [2004, 3, 21], gender: "m" },

      // ── 17. 빅뱅 (BIGBANG) - 4명 (현재) ──
      { name: "빅뱅 지드래곤", birth: [1988, 8, 18], gender: "m" },
      { name: "빅뱅 태양", birth: [1988, 5, 18], gender: "m" },
      { name: "빅뱅 대성", birth: [1989, 4, 26], gender: "m" },
      { name: "빅뱅 탑", birth: [1987, 11, 4], gender: "m" },

      // ── 18. 보이넥스트도어 (BOYNEXTDOOR) - 6명 ──
      { name: "보넥도 성호", birth: [2003, 4, 15], gender: "m" },
      { name: "보넥도 리우", birth: [2003, 6, 10], gender: "m" },
      { name: "보넥도 명재", birth: [2003, 11, 6], gender: "m" },
      { name: "보넥도 태산", birth: [2004, 5, 10], gender: "m" },
      { name: "보넥도 이한", birth: [2005, 10, 10], gender: "m" },
      { name: "보넥도 운학", birth: [2006, 4, 9], gender: "m" },

      // ── 19. 투어스 (TWS) - 6명 ──
      { name: "TWS 신유", birth: [2003, 7, 19], gender: "m" },
      { name: "TWS 도훈", birth: [2003, 12, 18], gender: "m" },
      { name: "TWS 경민", birth: [2004, 10, 28], gender: "m" },
      { name: "TWS 지호", birth: [2005, 5, 27], gender: "m" },
      { name: "TWS 한결", birth: [2005, 12, 13], gender: "m" },
      { name: "TWS 준혁", birth: [2006, 3, 16], gender: "m" },

      // ══════════════════════════════════════
      // 여자 그룹
      // ══════════════════════════════════════

      // ── 20. QWER - 4명 ──
      { name: "QWER 초원", birth: [1998, 6, 5], gender: "f" },
      { name: "QWER 마젤", birth: [2001, 11, 4], gender: "f" },
      { name: "QWER 히나", birth: [2002, 10, 17], gender: "f" },
      { name: "QWER 시연", birth: [2003, 3, 6], gender: "f" },

      // ── 21. 다비치 - 2명 ──
      { name: "다비치 이해리", birth: [1985, 2, 14], gender: "f" },
      { name: "다비치 강민경", birth: [1990, 8, 3], gender: "f" },

      // ── 22. 뉴진스 (NewJeans) - 5명 ──
      { name: "뉴진스 민지", birth: [2004, 5, 7], gender: "f" },
      { name: "뉴진스 하니", birth: [2004, 10, 6], gender: "f" },
      { name: "뉴진스 다니엘", birth: [2005, 4, 11], gender: "f" },
      { name: "뉴진스 해린", birth: [2006, 5, 15], gender: "f" },
      { name: "뉴진스 혜인", birth: [2008, 4, 21], gender: "f" },

      // ── 23. 엔믹스 (NMIXX) - 7명 ──
      { name: "엔믹스 릴리", birth: [2002, 10, 16], gender: "f" },
      { name: "엔믹스 해원", birth: [2003, 4, 26], gender: "f" },
      { name: "엔믹스 설윤", birth: [2004, 1, 26], gender: "f" },
      { name: "엔믹스 BAE", birth: [2004, 10, 21], gender: "f" },
      { name: "엔믹스 지우", birth: [2005, 8, 13], gender: "f" },
      { name: "엔믹스 규진", birth: [2006, 1, 26], gender: "f" },
      { name: "엔믹스 소영", birth: [2006, 8, 14], gender: "f" },

      // ── 24. 르세라핌 (LE SSERAFIM) - 5명 ──
      { name: "르세라핌 사쿠라", birth: [1998, 3, 19], gender: "f" },
      { name: "르세라핌 김채원", birth: [2000, 8, 1], gender: "f" },
      { name: "르세라핌 허윤진", birth: [2001, 10, 8], gender: "f" },
      { name: "르세라핌 카즈하", birth: [2003, 8, 9], gender: "f" },
      { name: "르세라핌 홍은채", birth: [2006, 11, 10], gender: "f" },

      // ── 25. (여자)아이들 ((G)I-DLE) - 5명 ──
      { name: "여자아이들 미연", birth: [1997, 1, 31], gender: "f" },
      { name: "여자아이들 민니", birth: [1997, 10, 23], gender: "f" },
      { name: "여자아이들 소연", birth: [1998, 8, 26], gender: "f" },
      { name: "여자아이들 우기", birth: [1999, 9, 23], gender: "f" },
      { name: "여자아이들 슈화", birth: [2000, 1, 6], gender: "f" },

      // ── 26. 아일릿 (ILLIT) - 5명 ──
      { name: "아일릿 윤아", birth: [2005, 10, 5], gender: "f" },
      { name: "아일릿 민주", birth: [2006, 3, 24], gender: "f" },
      { name: "아일릿 모카", birth: [2006, 10, 28], gender: "f" },
      { name: "아일릿 원희", birth: [2007, 5, 26], gender: "f" },
      { name: "아일릿 이로하", birth: [2008, 2, 4], gender: "f" },

      // ── 27. 있지 (ITZY) - 5명 ──
      { name: "있지 예지", birth: [2000, 5, 26], gender: "f" },
      { name: "있지 리아", birth: [2000, 1, 25], gender: "f" },
      { name: "있지 류진", birth: [2001, 4, 17], gender: "f" },
      { name: "있지 채령", birth: [2001, 6, 5], gender: "f" },
      { name: "있지 유나", birth: [2003, 12, 9], gender: "f" },

      // ── 28. 에스파 (aespa) - 4명 ──
      { name: "에스파 카리나", birth: [2000, 4, 11], gender: "f" },
      { name: "에스파 지젤", birth: [2000, 10, 30], gender: "f" },
      { name: "에스파 윈터", birth: [2001, 1, 1], gender: "f" },
      { name: "에스파 닝닝", birth: [2002, 10, 23], gender: "f" },

      // ── 29. 키스오브라이프 (KISS OF LIFE) - 4명 ──
      { name: "키스오브라이프 줄리", birth: [2003, 8, 29], gender: "f" },
      { name: "키스오브라이프 나띠", birth: [2002, 12, 18], gender: "f" },
      { name: "키스오브라이프 벨", birth: [2004, 6, 11], gender: "f" },
      { name: "키스오브라이프 하늘", birth: [2005, 5, 10], gender: "f" },

      // ── 30. 블랙핑크 (BLACKPINK) - 4명 ──
      { name: "블랙핑크 지수", birth: [1995, 1, 3], gender: "f" },
      { name: "블랙핑크 제니", birth: [1996, 1, 16], gender: "f" },
      { name: "블랙핑크 로제", birth: [1997, 2, 11], gender: "f" },
      { name: "블랙핑크 리사", birth: [1997, 3, 27], gender: "f" },

      // ── 31. 하츠투하츠 (Hearts2Hearts) - 5명 (2025 데뷔) ──
      { name: "하츠투하츠 이린", birth: [2006, 2, 6], gender: "f" },
      { name: "하츠투하츠 수", birth: [2007, 3, 10], gender: "f" },
      { name: "하츠투하츠 은채", birth: [2007, 9, 25], gender: "f" },
      { name: "하츠투하츠 유키", birth: [2007, 11, 17], gender: "f" },
      { name: "하츠투하츠 이토", birth: [2008, 12, 18], gender: "f" },

      // ── 32. 아이브 (IVE) - 6명 ──
      { name: "아이브 안유진", birth: [2003, 9, 1], gender: "f" },
      { name: "아이브 가을", birth: [2002, 9, 24], gender: "f" },
      { name: "아이브 레이", birth: [2004, 2, 3], gender: "f" },
      { name: "아이브 장원영", birth: [2004, 8, 31], gender: "f" },
      { name: "아이브 리즈", birth: [2004, 11, 21], gender: "f" },
      { name: "아이브 이서", birth: [2007, 2, 21], gender: "f" },

      // ── 33. 프로미스나인 (fromis_9) - 9명 ──
      { name: "프로미스나인 이서연", birth: [1997, 12, 6], gender: "f" },
      { name: "프로미스나인 노지선", birth: [1998, 6, 18], gender: "f" },
      { name: "프로미스나인 이채영", birth: [2000, 1, 11], gender: "f" },
      { name: "프로미스나인 이나경", birth: [2003, 5, 1], gender: "f" },
      { name: "프로미스나인 백지헌", birth: [1999, 11, 17], gender: "f" },
      { name: "프로미스나인 박지원", birth: [1998, 9, 1], gender: "f" },
      { name: "프로미스나인 송하영", birth: [1997, 7, 29], gender: "f" },
      { name: "프로미스나인 장규리", birth: [1997, 12, 24], gender: "f" },
      { name: "프로미스나인 이서영", birth: [1999, 3, 22], gender: "f" },
    ];

    const results: { name: string; ilju: string; gender: string; birth: number[] }[] = [];

    for (const m of members) {
      const ilju = getIlju(m.birth[0], m.birth[1], m.birth[2]);
      results.push({ name: m.name, ilju, gender: m.gender, birth: m.birth });
    }

    // 출력: gender | ilju | 그룹명 멤버명 | YYYY.M.D
    console.log('\n=== K-POP 전 그룹 멤버 일주 계산 결과 ===\n');
    for (const r of results) {
      const genderLabel = r.gender === 'm' ? '남' : '여';
      const birthStr = `${r.birth[0]}.${r.birth[1]}.${r.birth[2]}`;
      console.log(`${genderLabel} | ${r.ilju} | ${r.name} | ${birthStr}`);
    }

    // 일주별 그룹핑
    const grouped: Record<string, { m: string[]; f: string[] }> = {};
    for (const r of results) {
      if (!grouped[r.ilju]) grouped[r.ilju] = { m: [], f: [] };
      grouped[r.ilju][r.gender as 'm' | 'f'].push(r.name);
    }

    console.log('\n=== 일주별 그룹 ===\n');
    for (const [ilju, celebs] of Object.entries(grouped).sort()) {
      if (celebs.m.length > 0) console.log(`${ilju}-남: ${celebs.m.join(', ')}`);
      if (celebs.f.length > 0) console.log(`${ilju}-여: ${celebs.f.join(', ')}`);
    }

    // 그룹별 요약
    console.log('\n=== 그룹별 일주 요약 ===\n');
    const groupMap: Record<string, { name: string; ilju: string }[]> = {};
    for (const r of results) {
      const groupName = r.name.split(' ')[0];
      if (!groupMap[groupName]) groupMap[groupName] = [];
      groupMap[groupName].push({ name: r.name, ilju: r.ilju });
    }
    for (const [group, members] of Object.entries(groupMap)) {
      console.log(`[${group}]`);
      for (const m of members) {
        console.log(`  ${m.ilju} - ${m.name}`);
      }
    }

    expect(results.length).toBeGreaterThan(0);
  });
});
