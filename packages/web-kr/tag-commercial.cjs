// tag-commercial.cjs
// celeb-data-with-birth.txt 전체를 수익 가능[ok] / 불가(기본) 로 태깅
// Usage: node tag-commercial.cjs

const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, 'celeb-data-with-birth.txt');

// ── 수익 가능 판별 규칙 ─────────────────────────────────────────────────────

// 1. 소속 패턴으로 외국인 확정
const OK_ORG_PATTERNS = [/^조선 제\d+대$/];

const OK_ORGS = new Set([
  // 중동 왕족
  'UAE 왕자','두바이 왕세자','두바이 통치자','카타르 국왕',
  // 외국 역사 위인
  '예술가','예술가·과학자','팝의 황제','로마 황제','프랑스 황제','마케도니아 왕','몽골 제국',
  '다산 선생','와룡 선생','삼국지 군주','삼국지 장수','성녀','발명가','간호사',
  '노벨상',
  // 외국 정치인 직함 (현 DB에서 전원 외국인)
  '미국 대통령','미국 전 대통령',
  '독일 총리','독일 전 총리','독일 초대 총리',
  '프랑스 대통령','프랑스 전 대통령',
  '영국 총리','영국 여왕',
  '중국 주석','일본 총리','일본 전 총리',
  '싱가포르 총리','싱가포르 건국 총리',
  '캐나다 총리','캐나다 전 총리',
  '호주 전 총리','멕시코 대통령',
  '브라질 전 대통령','스페인 전 총리',
  '이탈리아 총리','네덜란드 전 총리','우크라이나 대통령',
]);

// 2. 소속에 이 키워드가 들어가면 외국 기업 → 가능
const OK_ORG_KEYWORDS = [
  '테슬라','애플','MS','구글','아마존','메타','엔비디아',
  '넷플릭스','우버','에어비앤비','스포티파이','오라클',
  '나이키','포드','소프트뱅크','TSMC','LVMH','샤넬','에르메스',
  '루이비통','케링','구찌','리치몬트','스타벅스','스냅챗',
  '알리바바','바이트댄스','버크셔해서웨이','JP모건','세일즈포스',
  '닌텐도','GM','AMD','오픈AI','버버리','티파니','디올','프라다',
  'X 전 CEO','디즈니 CEO',
];

// 3. 이름으로 명시 가능 (소속이 가수/배우/스포츠 등 국적 불명인 외국인)
const OK_NAMES = new Set([
  // 명시 예외 (한국인이지만 가능)
  '이순신','김구','윤봉길','안중근',
  // 재일교포
  '손정의',
  // 외국 가수
  '브루노 마스','마돈나',
  '테일러 스위프트','비욘세','리한나','아리아나 그란데','드레이크',
  '빌리 아일리시','레이디 가가','저스틴 비버','두아 리파',
  '폴 매카트니','에드 시런','아델','셀레나 고메즈','해리 스타일스',
  '라나 델 레이',
  // 외국 배우
  '오드리 햅번',
  '키아누 리브스','엠마 왓슨','레오나르도 디카프리오','조니 뎁',
  '나탈리 포트만','스칼렛 요한슨','앤 해서웨이','브래드 피트',
  '안젤리나 졸리','윌 스미스','니콜 키드먼','에마 스톤',
  '로버트 다우니 주니어','크리스 헴스워스','크리스 에반스','갈 가돗',
  '마고 로비','라이언 고슬링','제니퍼 로렌스','티모시 샬라메',
  '밀리 바비 브라운','젠데이아','톰 크루즈','톰 홀랜드',
  // 위인 (소속 기반 자동 분류 외 추가)
  '고든 램지',
  // 외국 스포츠
  '리오넬 메시','크리스티아누 호날두','킬리안 음바페','네이마르','펠레',
  '우사인 볼트','무하마드 알리','마이클 조던','세레나 윌리엄스',
  '나오미 오사카','노바크 조코비치','나달','로저 페더러',
  '르브론 제임스','스테판 커리','루이스 해밀턴','막스 페르스타펜',
  '호나우지뉴','엘링 홀란','플로이드 메이웨더',
  '타이거 우즈','마이클 펠프스','오타니 쇼헤이','다비드 베컴',
]);

// ── 수익 불가 강제 ──────────────────────────────────────────────────────────

const BLOCK_NAMES = new Set([
  '블랙핑크 리사', // 태국인이지만 불가 명시
]);

const BLOCK_ORGS = new Set([
  '앗.....', // 북한
  '뽀로로','카카오프렌즈','도라에몽','나루토','원피스',
  '스폰지밥','짱구는못말려','포켓몬','산리오','디즈니',
]);

// ── 판별 함수 ───────────────────────────────────────────────────────────────

function isOk(name, org) {
  if (BLOCK_NAMES.has(name))  return false;
  if (BLOCK_ORGS.has(org))    return false;
  if (OK_NAMES.has(name))     return true;
  if (OK_ORGS.has(org))       return true;
  if (OK_ORG_PATTERNS.some(p => p.test(org))) return true;
  if (OK_ORG_KEYWORDS.some(kw => org.includes(kw))) return true;
  return false;
}

// ── 파일 처리 ───────────────────────────────────────────────────────────────

const lines = fs.readFileSync(FILE, 'utf-8').split('\n');
const stats = { ok: 0, no: 0, skipped: 0 };

const newLines = lines.map(line => {
  const pfx = line.match(/^([가-힣]{2}-[mfb]):\s*/);
  if (!pfx) return line;

  // 이미 태깅된 경우 스킵
  if (line.includes('[ok]')) { stats.skipped++; return line; }

  // 각 항목 처리
  const rest = line.slice(pfx[0].length);
  // 항목 분리: 이름(소속)[날짜], 이름(소속) 패턴
  const tagged = rest.replace(
    /([^,]+?\([^)]+\)(?:\[\d{4}\.\d+\.\d+\])?)/g,
    (entry) => {
      const m = entry.match(/^(.+?)\(([^)]+)\)/);
      if (!m) return entry;
      const name = m[1].trim();
      const org  = m[2].trim();
      if (isOk(name, org)) {
        stats.ok++;
        // [ok] 삽입: 날짜 뒤 or 소속 뒤
        return entry.replace(/(\[\d{4}\.\d+\.\d+\])$/, '$1[ok]')
                    .replace(/(\([^)]+\))$/, '$1[ok]');
      }
      stats.no++;
      return entry;
    }
  );
  return pfx[0] + tagged;
});

fs.writeFileSync(FILE, newLines.join('\n'), 'utf-8');

console.log(`\n✓ 태깅 완료`);
console.log(`  수익 가능 [ok] : ${stats.ok}명`);
console.log(`  수익 불가      : ${stats.no}명`);
console.log(`  스킵 (기존)    : ${stats.skipped}명`);
console.log(`  합계           : ${stats.ok + stats.no + stats.skipped}명`);
