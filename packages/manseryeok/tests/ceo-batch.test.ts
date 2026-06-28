import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';

function getIlju(year: number, month: number, day: number): string {
  const saju = calculateSaju({ year, month, day, hour: 12, minute: 0 });
  return STEM_KOREAN[saju.fourPillars.day.stem] + BRANCH_KOREAN[saju.fourPillars.day.branch];
}

describe('기업인 대규모 배치', () => {
  it('계산', () => {
    const ceos = [
      // 한국 대기업 총수/CEO
      { name: "이승건", birth: [1982, 7, 15], company: "비바리퍼블리카(토스)" },
      { name: "김범석", birth: [1978, 6, 10], company: "쿠팡" },
      { name: "방시혁", birth: [1972, 8, 9], company: "하이브" },
      { name: "박진영", birth: [1972, 1, 13], company: "JYP" },
      { name: "양현석", birth: [1970, 1, 9], company: "YG" },
      { name: "이수만", birth: [1952, 6, 18], company: "SM" },
      { name: "신동빈", birth: [1955, 2, 14], company: "롯데그룹" },
      { name: "조현준", birth: [1968, 10, 9], company: "효성그룹" },
      { name: "조원태", birth: [1975, 3, 8], company: "한진그룹(대한항공)" },
      { name: "신동주", birth: [1954, 1, 28], company: "롯데그룹" },
      { name: "허태수", birth: [1958, 8, 22], company: "GS그룹" },
      { name: "박정원", birth: [1963, 2, 26], company: "두산그룹" },
      { name: "김택진", birth: [1967, 4, 8], company: "엔씨소프트" },
      { name: "권혁빈", birth: [1968, 3, 25], company: "스마일게이트" },
      { name: "김정주", birth: [1968, 1, 16], company: "넥슨" },
      { name: "방준혁", birth: [1968, 3, 13], company: "넷마블" },
      { name: "이정(배달의민족)", birth: [1981, 1, 15], company: "우아한형제들(배민)" },
      { name: "김봉진", birth: [1976, 5, 8], company: "우아한형제들(배민)" },
      { name: "김슬아", birth: [1983, 7, 4], company: "마켓컬리" },
      { name: "한성숙", birth: [1966, 8, 20], company: "네이버(전CEO)" },
      { name: "최수연", birth: [1972, 11, 23], company: "네이버 CEO" },
      { name: "홍은택", birth: [1972, 3, 25], company: "카카오 CEO" },

      // 미국/글로벌 대기업
      { name: "순다르 피차이", birth: [1972, 6, 10], company: "구글(알파벳)" },
      { name: "사티아 나델라", birth: [1967, 8, 19], company: "마이크로소프트" },
      { name: "샘 올트먼", birth: [1985, 4, 22], company: "오픈AI" },
      { name: "마크 베니오프", birth: [1964, 9, 25], company: "세일즈포스" },
      { name: "리드 헤이스팅스", birth: [1960, 10, 8], company: "넷플릭스" },
      { name: "잭 마", birth: [1964, 9, 10], company: "알리바바" },
      { name: "래리 페이지", birth: [1973, 3, 26], company: "구글" },
      { name: "세르게이 브린", birth: [1973, 8, 21], company: "구글" },
      { name: "잭 도시", birth: [1976, 11, 19], company: "트위터(X)/블록" },
      { name: "리사 수", birth: [1969, 11, 7], company: "AMD", gender: "f" },
      { name: "메리 바라", birth: [1961, 12, 24], company: "GM", gender: "f" },
      { name: "안디 재시", birth: [1968, 1, 13], company: "아마존" },
      { name: "밥 아이거", birth: [1951, 2, 10], company: "디즈니" },

      // 한국 재벌 2세/3세
      { name: "정기선", birth: [1985, 2, 12], company: "HD현대" },
      { name: "최윤정", birth: [1988, 10, 27], company: "SK" , gender: "f"},
      { name: "이서현", birth: [1973, 9, 6], company: "삼성복지재단", gender: "f" },
      { name: "이부진", birth: [1970, 10, 7], company: "호텔신라", gender: "f" },
      { name: "조현민", birth: [1984, 12, 27], company: "한진칼", gender: "f" },
    ];

    console.log('\n=== 기업인 일주 ===\n');
    for (const c of ceos) {
      const ilju = getIlju(c.birth[0], c.birth[1], c.birth[2]);
      const g = (c as any).gender === 'f' ? '여' : '남';
      console.log(g + ' | ' + ilju + ' | ' + c.name + ' | ' + c.company);
    }
  });
});
