// 수익가능(commercial=ok) 유명인 데이터 — 일주별 (남+여 합산)
// 출처: preview-celebs.html

export interface IljuCelebInfo {
  count: number
  topCat: string
  persons: { name: string; role: string; cat: string }[]
}

export const ILJU_CELEB_DATA: Record<string, IljuCelebInfo> = {
  "갑술": {
    count: 1,
    topCat: "정치인",
    persons: [
    { name: "앙겔라 메르켈", role: "독일 전 총리", cat: "정치인" }
    ],
  },
  "갑신": {
    count: 4,
    topCat: "노벨상 수상자",
    persons: [
    { name: "세종대왕", role: "조선 제4대", cat: "왕족" },
    { name: "저스틴 트뤼도", role: "캐나다 총리", cat: "정치인" },
    { name: "일론 머스크", role: "테슬라 창업자", cat: "기업인" }
    ],
  },
  "갑오": {
    count: 3,
    topCat: "역사적 위인",
    persons: [
    { name: "나폴레옹", role: "프랑스 황제", cat: "위인" },
    { name: "베르나르 아르노", role: "LVMH 창업자", cat: "기업인" },
    { name: "유비", role: "삼국지 군주", cat: "위인" }
    ],
  },
  "갑인": {
    count: 1,
    topCat: "배우",
    persons: [
    { name: "키아누 리브스", role: "배우", cat: "배우" }
    ],
  },
  "갑자": {
    count: 1,
    topCat: "왕족",
    persons: [
    { name: "문종", role: "조선 제5대", cat: "왕족" }
    ],
  },
  "갑진": {
    count: 2,
    topCat: "스포츠 스타",
    persons: [
    { name: "만수르", role: "UAE 왕자", cat: "왕족" },
    { name: "리오넬 메시", role: "축구", cat: "스포츠" }
    ],
  },
  "경술": {
    count: 4,
    topCat: "스포츠 스타",
    persons: [
    { name: "레오나르도 다빈치", role: "예술가·과학자", cat: "위인" },
    { name: "엠마 왓슨", role: "배우", cat: "배우" },
    { name: "타이거 우즈", role: "골프", cat: "스포츠" }
    ],
  },
  "경신": {
    count: 6,
    topCat: "기업인",
    persons: [
    { name: "중종", role: "조선 제11대", cat: "왕족" },
    { name: "제프 베이조스", role: "아마존 창업자", cat: "기업인" },
    { name: "장비", role: "삼국지 장수", cat: "위인" }
    ],
  },
  "경오": {
    count: 2,
    topCat: "스포츠 스타",
    persons: [
    { name: "무하마드 알리", role: "권투", cat: "스포츠" },
    { name: "이순신", role: "충무공", cat: "위인" }
    ],
  },
  "경인": {
    count: 4,
    topCat: "기업인",
    persons: [
    { name: "헨리 포드", role: "포드 창업자", cat: "기업인" },
    { name: "트래비스 캘러닉", role: "우버 창업자", cat: "기업인" },
    { name: "헤밍웨이", role: "노벨상", cat: "노벨상" }
    ],
  },
  "경자": {
    count: 5,
    topCat: "기업인",
    persons: [
    { name: "잔다르크", role: "성녀", cat: "위인" },
    { name: "마이클 펠프스", role: "수영", cat: "스포츠" },
    { name: "미우치아 프라다", role: "프라다", cat: "기업인" }
    ],
  },
  "경진": {
    count: 6,
    topCat: "기업인",
    persons: [
    { name: "엘리자베스 2세", role: "영국 여왕", cat: "정치인" },
    { name: "다니엘 에크", role: "스포티파이 창업자", cat: "기업인" },
    { name: "테드 사란도스", role: "넷플릭스 CEO", cat: "기업인" }
    ],
  },
  "계묘": {
    count: 3,
    topCat: "왕족",
    persons: [
    { name: "효종", role: "조선 제17대", cat: "왕족" },
    { name: "키어 스타머", role: "영국 총리", cat: "정치인" },
    { name: "다라 코스로샤히", role: "우버 CEO", cat: "기업인" }
    ],
  },
  "계미": {
    count: 4,
    topCat: "정치인",
    persons: [
    { name: "헬무트 콜", role: "독일 전 총리", cat: "정치인" },
    { name: "로렌스 웡", role: "싱가포르 총리", cat: "정치인" },
    { name: "조니 뎁", role: "배우", cat: "배우" }
    ],
  },
  "계사": {
    count: 3,
    topCat: "스포츠 스타",
    persons: [
    { name: "클라우디아 셰인바움", role: "멕시코 대통령", cat: "정치인" },
    { name: "호나우지뉴", role: "축구", cat: "스포츠" },
    { name: "팀 쿡", role: "애플 CEO", cat: "기업인" }
    ],
  },
  "계유": {
    count: 1,
    topCat: "왕족",
    persons: [
    { name: "고종", role: "조선 제26대", cat: "왕족" }
    ],
  },
  "계축": {
    count: 2,
    topCat: "기업인",
    persons: [
    { name: "셰이크 무함마드", role: "두바이 통치자", cat: "왕족" },
    { name: "래리 엘리슨", role: "오라클 창업자", cat: "기업인" }
    ],
  },
  "계해": {
    count: 1,
    topCat: "노벨상 수상자",
    persons: [
    { name: "마더 테레사", role: "노벨상", cat: "노벨상" }
    ],
  },
  "기묘": {
    count: 4,
    topCat: "왕족",
    persons: [
    { name: "선조", role: "조선 제14대", cat: "왕족" },
    { name: "정조", role: "조선 제22대", cat: "왕족" },
    { name: "브라이언 체스키", role: "에어비앤비 창업자", cat: "기업인" }
    ],
  },
  "기미": {
    count: 2,
    topCat: "정치인",
    persons: [
    { name: "도널드 트럼프", role: "미국 대통령", cat: "정치인" },
    { name: "장이밍", role: "바이트댄스 창업자", cat: "기업인" }
    ],
  },
  "기사": {
    count: 4,
    topCat: "역사적 위인",
    persons: [
    { name: "리드 헤이스팅스", role: "넷플릭스 창업자", cat: "기업인" },
    { name: "김구", role: "독립운동가", cat: "위인" },
    { name: "버락 오바마", role: "미국 전 대통령", cat: "정치인" }
    ],
  },
  "기유": {
    count: 3,
    topCat: "배우",
    persons: [
    { name: "마르크 뤼터", role: "네덜란드 전 총리", cat: "정치인" },
    { name: "오드리 햅번", role: "배우", cat: "배우" },
    { name: "리나 나이르", role: "샤넬 CEO", cat: "기업인" }
    ],
  },
  "기축": {
    count: 3,
    topCat: "기업인",
    persons: [
    { name: "세르게이 브린", role: "구글 창업자", cat: "기업인" },
    { name: "라이언 고슬링", role: "배우", cat: "배우" },
    { name: "린다 야카리노", role: "X 전 CEO", cat: "기업인" }
    ],
  },
  "기해": {
    count: 5,
    topCat: "배우",
    persons: [
    { name: "펠레", role: "축구", cat: "스포츠" },
    { name: "앤 해서웨이", role: "배우", cat: "배우" },
    { name: "갈 가돗", role: "배우", cat: "배우" }
    ],
  },
  "무술": {
    count: 2,
    topCat: "스포츠 스타",
    persons: [
    { name: "윌 스미스", role: "배우", cat: "배우" },
    { name: "르브론 제임스", role: "농구", cat: "스포츠" }
    ],
  },
  "무신": {
    count: 2,
    topCat: "기업인",
    persons: [
    { name: "마크 저커버그", role: "메타 창업자", cat: "기업인" },
    { name: "다비드 베컴", role: "축구", cat: "스포츠" }
    ],
  },
  "무오": {
    count: 6,
    topCat: "아티스트",
    persons: [
    { name: "해리 트루먼", role: "미국 전 대통령", cat: "정치인" },
    { name: "리처드 파인만", role: "노벨상", cat: "노벨상" },
    { name: "나탈리 포트만", role: "배우", cat: "배우" }
    ],
  },
  "무인": {
    count: 4,
    topCat: "스포츠 스타",
    persons: [
    { name: "영조", role: "조선 제21대", cat: "왕족" },
    { name: "마이클 잭슨", role: "팝의 황제", cat: "위인" },
    { name: "아리아나 그란데", role: "가수", cat: "가수" }
    ],
  },
  "무자": {
    count: 2,
    topCat: "역사적 위인",
    persons: [
    { name: "안중근", role: "독립운동가", cat: "위인" },
    { name: "로버트 다우니 주니어", role: "배우", cat: "배우" }
    ],
  },
  "무진": {
    count: 4,
    topCat: "배우",
    persons: [
    { name: "칼 마르크스", role: "사상가", cat: "기업인" },
    { name: "마고 로비", role: "배우", cat: "배우" },
    { name: "스테판 커리", role: "농구", cat: "스포츠" }
    ],
  },
  "병술": {
    count: 4,
    topCat: "역사적 위인",
    persons: [
    { name: "리사 수", role: "AMD CEO", cat: "기업인" },
    { name: "관우", role: "삼국지 장수", cat: "위인" },
    { name: "나이팅게일", role: "간호사", cat: "위인" }
    ],
  },
  "병신": {
    count: 2,
    topCat: "정치인",
    persons: [
    { name: "케빈 러드", role: "호주 전 총리", cat: "정치인" },
    { name: "아인슈타인", role: "노벨상", cat: "노벨상" }
    ],
  },
  "병오": {
    count: 1,
    topCat: "스포츠 스타",
    persons: [
    { name: "루이스 해밀턴", role: "F1", cat: "스포츠" }
    ],
  },
  "병인": {
    count: 3,
    topCat: "기업인",
    persons: [
    { name: "넬슨 만델라", role: "노벨상", cat: "노벨상" },
    { name: "모리스 장", role: "TSMC 창업자", cat: "기업인" },
    { name: "프랑수아앙리 피노", role: "케링 회장", cat: "기업인" }
    ],
  },
  "병자": {
    count: 3,
    topCat: "노벨상 수상자",
    persons: [
    { name: "프리드리히 메르츠", role: "독일 총리", cat: "정치인" },
    { name: "신사임당", role: "예술가", cat: "위인" },
    { name: "제임스 왓슨", role: "노벨상", cat: "노벨상" }
    ],
  },
  "병진": {
    count: 2,
    topCat: "기업인",
    persons: [
    { name: "스티브 잡스", role: "애플 창업자", cat: "기업인" },
    { name: "레오나르도 디카프리오", role: "배우", cat: "배우" }
    ],
  },
  "신묘": {
    count: 7,
    topCat: "기업인",
    persons: [
    { name: "젠슨 황", role: "엔비디아 창업자", cat: "기업인" },
    { name: "마이클 조던", role: "농구", cat: "스포츠" },
    { name: "샘 올트먼", role: "오픈AI 창업자", cat: "기업인" }
    ],
  },
  "신미": {
    count: 5,
    topCat: "배우",
    persons: [
    { name: "줄리어스 시저", role: "로마 황제", cat: "위인" },
    { name: "하워드 슐츠", role: "스타벅스 전 CEO", cat: "기업인" },
    { name: "레이디 가가", role: "가수", cat: "가수" }
    ],
  },
  "신사": {
    count: 4,
    topCat: "정치인",
    persons: [
    { name: "조지 W 부시", role: "미국 전 대통령", cat: "정치인" },
    { name: "자이르 보우소나루", role: "브라질 전 대통령", cat: "정치인" },
    { name: "안젤리나 졸리", role: "배우", cat: "배우" }
    ],
  },
  "신유": {
    count: 2,
    topCat: "기업인",
    persons: [
    { name: "숙종", role: "조선 제19대", cat: "왕족" },
    { name: "래리 페이지", role: "구글 창업자", cat: "기업인" }
    ],
  },
  "신축": {
    count: 4,
    topCat: "배우",
    persons: [
    { name: "파자", role: "두바이 왕세자", cat: "왕족" },
    { name: "젠데이아", role: "배우", cat: "배우" },
    { name: "킬리안 음바페", role: "축구", cat: "스포츠" }
    ],
  },
  "신해": {
    count: 3,
    topCat: "노벨상 수상자",
    persons: [
    { name: "태조 이성계", role: "조선 제1대", cat: "왕족" },
    { name: "한강", role: "노벨상", cat: "노벨상" },
    { name: "네이마르", role: "축구", cat: "스포츠" }
    ],
  },
  "을묘": {
    count: 6,
    topCat: "기업인",
    persons: [
    { name: "손정의", role: "소프트뱅크 창업자", cat: "기업인" },
    { name: "사티아 나델라", role: "MS CEO", cat: "기업인" },
    { name: "마크 카니", role: "캐나다 총리", cat: "정치인" }
    ],
  },
  "을미": {
    count: 2,
    topCat: "기업인",
    persons: [
    { name: "코코 샤넬", role: "샤넬 창업자", cat: "기업인" },
    { name: "브래드 피트", role: "배우", cat: "배우" }
    ],
  },
  "을사": {
    count: 1,
    topCat: "아티스트",
    persons: [
    { name: "리한나", role: "가수", cat: "가수" }
    ],
  },
  "을유": {
    count: 4,
    topCat: "아티스트",
    persons: [
    { name: "존 레논", role: "비틀즈", cat: "기업인" },
    { name: "조조", role: "삼국지 군주", cat: "위인" },
    { name: "두아 리파", role: "가수", cat: "가수" }
    ],
  },
  "을축": {
    count: 4,
    topCat: "기업인",
    persons: [
    { name: "모차르트", role: "음악가", cat: "기업인" },
    { name: "마돈나", role: "가수", cat: "가수" },
    { name: "에마 스톤", role: "배우", cat: "배우" }
    ],
  },
  "을해": {
    count: 4,
    topCat: "스포츠 스타",
    persons: [
    { name: "인조", role: "조선 제16대", cat: "왕족" },
    { name: "칭기즈칸", role: "몽골 제국", cat: "위인" },
    { name: "크리스티아누 호날두", role: "축구", cat: "스포츠" }
    ],
  },
  "임술": {
    count: 5,
    topCat: "기업인",
    persons: [
    { name: "빌 게이츠", role: "MS 창업자", cat: "기업인" },
    { name: "올라프 숄츠", role: "독일 총리", cat: "정치인" },
    { name: "마윈", role: "알리바바 창업자", cat: "기업인" }
    ],
  },
  "임신": {
    count: 4,
    topCat: "정치인",
    persons: [
    { name: "콘라트 아데나워", role: "독일 초대 총리", cat: "정치인" },
    { name: "조르자 멜로니", role: "이탈리아 총리", cat: "정치인" },
    { name: "순다르 피차이", role: "구글 CEO", cat: "기업인" }
    ],
  },
  "임오": {
    count: 5,
    topCat: "정치인",
    persons: [
    { name: "장 크레티앵", role: "캐나다 전 총리", cat: "정치인" },
    { name: "성종", role: "조선 제9대", cat: "왕족" },
    { name: "스티브 하퍼", role: "캐나다 전 총리", cat: "정치인" }
    ],
  },
  "임인": {
    count: 3,
    topCat: "배우",
    persons: [
    { name: "기시다 후미오", role: "일본 전 총리", cat: "정치인" },
    { name: "톰 크루즈", role: "배우", cat: "배우" },
    { name: "폴 매카트니", role: "가수", cat: "가수" }
    ],
  },
  "임자": {
    count: 5,
    topCat: "기업인",
    persons: [
    { name: "워렌 버핏", role: "버크셔해서웨이", cat: "기업인" },
    { name: "에마뉘엘 마크롱", role: "프랑스 대통령", cat: "정치인" },
    { name: "제니퍼 로렌스", role: "배우", cat: "배우" }
    ],
  },
  "임진": {
    count: 4,
    topCat: "스포츠 스타",
    persons: [
    { name: "리콴유", role: "싱가포르 건국 총리", cat: "정치인" },
    { name: "티모시 샬라메", role: "배우", cat: "배우" },
    { name: "알베르 카뮈", role: "노벨상", cat: "노벨상" }
    ],
  },
  "정묘": {
    count: 3,
    topCat: "왕족",
    persons: [
    { name: "세조", role: "조선 제7대", cat: "왕족" },
    { name: "지우마 호세프", role: "브라질 전 대통령", cat: "정치인" },
    { name: "요한 루퍼트", role: "리치몬트 회장", cat: "기업인" }
    ],
  },
  "정미": {
    count: 8,
    topCat: "정치인",
    persons: [
    { name: "샤를 드골", role: "프랑스 전 대통령", cat: "정치인" },
    { name: "로널드 레이건", role: "미국 전 대통령", cat: "정치인" },
    { name: "이시바 시게루", role: "일본 총리", cat: "정치인" }
    ],
  },
  "정사": {
    count: 2,
    topCat: "기업인",
    persons: [
    { name: "월트 디즈니", role: "월트디즈니 창업자", cat: "기업인" },
    { name: "스테파노 칸티노", role: "구찌 CEO", cat: "기업인" }
    ],
  },
  "정유": {
    count: 2,
    topCat: "스포츠 스타",
    persons: [
    { name: "시진핑", role: "중국 주석", cat: "정치인" },
    { name: "우사인 볼트", role: "육상", cat: "스포츠" }
    ],
  },
  "정축": {
    count: 3,
    topCat: "역사적 위인",
    persons: [
    { name: "조 바이든", role: "미국 전 대통령", cat: "정치인" },
    { name: "에디슨", role: "발명가", cat: "위인" },
    { name: "마크 베니오프", role: "세일즈포스 창업자", cat: "기업인" }
    ],
  },
  "정해": {
    count: 3,
    topCat: "정치인",
    persons: [
    { name: "마리아노 라호이", role: "스페인 전 총리", cat: "정치인" },
    { name: "볼로디미르 젤렌스키", role: "우크라이나 대통령", cat: "정치인" },
    { name: "필 나이트", role: "나이키 창업자", cat: "기업인" }
    ],
  },
}