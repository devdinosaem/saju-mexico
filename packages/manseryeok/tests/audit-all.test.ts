import { describe, it } from 'vitest';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from '../src/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getIlju(year: number, month: number, day: number, city = 'Seoul'): string {
  const s = calculateSaju({ year, month, day, hour: 12, minute: 0, city });
  return STEM_KOREAN[s.fourPillars.day.stem] + BRANCH_KOREAN[s.fourPillars.day.branch];
}

// 알려진 외국인 도시 매핑 (Stage 2용 — 여기에 있으면 해당 도시로 계산)
const CITY_MAP: Record<string, string> = {
  // 미국
  '일론 머스크': 'Johannesburg', // 남아공 출생
  '빌 게이츠': 'Seattle',
  '스티브 잡스': 'San Francisco',
  '마크 저커버그': 'New York',
  '제프 베이조스': 'Albuquerque',
  '젠슨 황': 'Tainan',          // 대만 출생
  '워렌 버핏': 'Omaha',
  '래리 페이지': 'East Lansing',
  '세르게이 브린': 'Moscow',
  '리드 헤이스팅스': 'Boston',
  '트래비스 캘러닉': 'Los Angeles',
  '리사 수': 'Tainan',
  '잭 도시': 'St. Louis',
  '브라이언 체스키': 'Niskayuna',
  '다니엘 에크': 'Stockholm',
  '래리 엘리슨': 'New York',
  '필 나이트': 'Portland',
  '하워드 슐츠': 'Brooklyn',
  '안디 재시': 'Scarsdale',
  '사티아 나델라': 'Hyderabad',
  '순다르 피차이': 'Chennai',
  '샘 올트먼': 'Chicago',
  '제이미 다이먼': 'New York',
  '마윈': 'Hangzhou',
  '베르나르 아르노': 'Roubaix',
  '모리스 장': 'Ningbo',
  // 스포츠
  '리오넬 메시': 'Rosario',
  '크리스티아누 호날두': 'Funchal',
  '마이클 조던': 'Brooklyn',
  '우사인 볼트': 'Sherwood Content',
  '무하마드 알리': 'Louisville',
  '펠레': 'Três Corações',
  '손정의': 'Tosu',
  // 정치/역사
  '도널드 트럼프': 'New York',
  '버락 오바마': 'Honolulu',
  '시진핑': 'Beijing',
  '앙겔라 메르켈': 'Hamburg',
  '헬무트 콜': 'Ludwigshafen',
  '프리드리히 메르츠': 'Brilon',
  '올라프 숄츠': 'Osnabrück',
  '에마뉘엘 마크롱': 'Amiens',
  '샤를 드골': 'Lille',
  '조르자 멜로니': 'Rome',
  '마리아노 라호이': 'Santiago de Compostela',
  '나렌드라 모디': 'Vadnagar',
  '보리스 옐친': 'Yekaterinburg',
  '저스틴 트뤼도': 'Ottawa',
  '마크 카니': 'Fort Smith',
  '스티브 하퍼': 'Toronto',
  '장 크레티앵': 'Shawinigan',
  '클라우디아 셰인바움': 'Mexico City',
  '자이르 보우소나루': 'Glicério',
  '지우마 호세프': 'Belo Horizonte',
  '케빈 러드': 'Nambour',
  '로렌스 웡': 'Singapore',
  '마르크 뤼터': 'The Hague',
  '기시다 후미오': 'Tokyo',
  '이시바 시게루': 'Tokyo',
  '무함마드 빈 살만': 'Riyadh',
  '리콴유': 'Singapore',
  '콘라트 아데나워': 'Cologne',
  '해리 트루먼': 'Lamar',
  '조지 W 부시': 'New Haven',
  '로널드 레이건': 'Tampico',
  '조 바이든': 'Scranton',
  '키어 스타머': 'London',
  '볼로디미르 젤렌스키': 'Kryvyi Rih',
  // 엔터/문화
  '마이클 잭슨': 'Gary',
  '마릴린 먼로': 'Los Angeles',
  '넬슨 만델라': 'Mthatha',
  '마더 테레사': 'Skopje',
  '나폴레옹': 'Ajaccio',
  '칭기즈칸': 'Khentii',
  '알렉산더 대왕': 'Pella',
  '줄리어스 시저': 'Rome',
  '헨리 포드': 'Dearborn',
  '레오나르도 다빈치': 'Florence',
  '엘리자베스 2세': 'London',
  '코코 샤넬': 'Saumur',
  '덩샤오핑': 'Chongqing',
  '블랙핑크 리사': 'Bangkok',
};

interface Mismatch {
  listed: string;
  name: string;
  org: string;
  birth: string;
  calculated: string;
  city: string;
  likelyForeign: boolean;
}

describe('전체 유명인 일주 검수', () => {
  it('Stage 1+2 — 불일치 리스트 출력', () => {
    const dbPath = path.resolve(__dirname, '../../../packages/web-kr/celeb-data-with-birth.txt');
    const lines = fs.readFileSync(dbPath, 'utf-8').split('\n');

    const mismatches: Mismatch[] = [];
    let totalChecked = 0;

    for (const line of lines) {
      if (!line.trim() || line.startsWith('#')) continue;

      const prefixMatch = line.match(/^([가-힣]{2})-[mf]:/);
      if (!prefixMatch) continue;
      const listedIlju = prefixMatch[1];

      // 이름(소속)[YYYY.M.D] 패턴 추출
      const entries = [...line.matchAll(/([^,:()\[\]]+?)\s*\(([^)]*)\)\[(\d{4})\.(\d+)\.(\d+)\]/g)];

      for (const entry of entries) {
        const name = entry[1].trim();
        const org = entry[2].trim();
        const year = parseInt(entry[3]);
        const month = parseInt(entry[4]);
        const day = parseInt(entry[5]);
        if (!name || year < 1800) continue;

        // 도시 결정: 매핑 있으면 해당 도시, 없으면 Seoul
        const city = CITY_MAP[name] ?? 'Seoul';
        const likelyForeign = !!CITY_MAP[name] || /[a-zA-Z]/.test(name);

        const calculated = getIlju(year, month, day, city);
        totalChecked++;

        if (calculated !== listedIlju) {
          mismatches.push({ listed: listedIlju, name, org, birth: `${year}.${month}.${day}`, calculated, city, likelyForeign });
        }
      }
    }

    // ── 결과 출력 ──
    const foreignMismatch = mismatches.filter(m => m.likelyForeign);
    const koreanMismatch = mismatches.filter(m => !m.likelyForeign);

    console.log(`\n${'='.repeat(70)}`);
    console.log(`전체 검수: ${totalChecked}명 / 불일치: ${mismatches.length}건`);
    console.log(`  한국인 불일치: ${koreanMismatch.length}건`);
    console.log(`  외국인 불일치: ${foreignMismatch.length}건`);
    console.log('='.repeat(70));

    if (koreanMismatch.length > 0) {
      console.log('\n── 한국인 불일치 (수정 필요 가능성 높음) ──');
      for (const m of koreanMismatch) {
        console.log(`  ${m.name}(${m.org})[${m.birth}]  등록:${m.listed} → 계산:${m.calculated}`);
      }
    }

    if (foreignMismatch.length > 0) {
      console.log('\n── 외국인 불일치 (도시/시간대 보정 or 데이터 오류) ──');
      for (const m of foreignMismatch) {
        console.log(`  ${m.name}(${m.org})[${m.birth}] [${m.city}]  등록:${m.listed} → 계산:${m.calculated}`);
      }
    }
  });
});
