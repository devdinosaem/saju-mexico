// ════════════════════════════════════════════════════════════════
// 썸 분석기 카피 뱅크 — core(CrushFunnel)에 주입.
// 톤: 설레고 가벼움. 서로 관심 있는 듯한 "썸" 전제. 점수는 오행에서 파생.
// ════════════════════════════════════════════════════════════════
import {
  DoodleSparkles, DoodleFire, DoodleEarth, DoodleDiamond, DoodleWave,
  DoodleSprout, DoodleLightning, DoodleMirror, DoodleSpeechBubble, DoodleHeart,
  DoodleBackpack, DoodleBamboo, DoodlePottedPlant, DoodleRamen, DoodleMusicNote,
  DoodleColorPalette, DoodleOnggiJar, DoodlePictureFrame, DoodleCoffee, DoodleTicket,
} from "@/components/doodles"
import type { CrushConfig } from "./core"

export const SOME_CONFIG: CrushConfig = {
  mode: "some",
  accent: "#E84B6A",
  landing: {
    hi: DoodleSparkles,
    line: "그 사람, 나한테 마음 있을까?",
    sub: "썸남·썸녀의 사주와 다가가는 법을 낱낱이 풀어줄게",
    cta: "썸 분석 시작하기",
  },
  gaugeName: "연애 가능성",
  scoreOpt: { same: 78, sheng: 88, ke: 64 },
  archetype: {
    목화: { name: "불씨 케미", vibe: "한쪽이 불씨, 한쪽이 키워줘 금방 뜨거워지는 사이", D: DoodleFire },
    토화: { name: "포근한 끌림", vibe: "옆에 있으면 편하고 따뜻해지는 사이", D: DoodleEarth },
    금토: { name: "단단한 호감", vibe: "믿음직해서 천천히, 깊게 가까워지는", D: DoodleDiamond },
    금수: { name: "스며드는 케미", vibe: "다툼 적고 자연스럽게 물들 듯 가까워지는", D: DoodleWave },
    목수: { name: "함께 크는 썸", vibe: "서로 물 주듯 키워주는 성장형 끌림", D: DoodleSprout },
    목토: { name: "밀당 케미", vibe: "밀고 당기는 재미, 긴장감이 매력인", D: DoodleLightning },
    수토: { name: "은근 신경전", vibe: "느긋함과 단단함이 부딪혀 조율이 필요한", D: DoodleLightning },
    수화: { name: "냉탕온탕", vibe: "뜨거움과 차분함이 오가는 극과 극의 끌림", D: DoodleLightning },
    금화: { name: "다듬는 사이", vibe: "톡톡 부딪히며 서로를 깎아주는 성장통", D: DoodleDiamond },
    금목: { name: "자극 케미", vibe: "서로 깨우는 자극제, 지루할 틈 없는", D: DoodleLightning },
  },
  sameArch: { name: "닮은꼴 썸", vibe: "취향도 결도 비슷해 편한데 설렘은 직접 만들어야", D: DoodleMirror },
  temp: [
    { min: 0, label: "아직 탐색기", line: "서로 간 보는 중이에요. 작은 신호부터 차곡차곡 쌓을 때." },
    { min: 55, label: "그린라이트 깜빡", line: "호감 신호가 보여요. 한 발 더 다가가도 좋은 타이밍." },
    { min: 74, label: "거의 확실해요", line: "연애로 넘어가기 직전. 확신만 주면 되는 사이예요." },
  ],
  situational: [
    { key: "첫인상", D: DoodleSparkles, delta: 5, line: "처음부터 눈길이 가는 케미예요" },
    { key: "대화 케미", D: DoodleSpeechBubble, delta: 2, line: "말이 잘 통해서 시간 가는 줄 몰라요" },
    { key: "밀당", D: DoodleLightning, delta: -8, line: "한 명이 더 달면 흔들리기 쉬운 구간" },
    { key: "고백 성공률", D: DoodleHeart, delta: -2, line: "타이밍만 맞추면 충분히 승산 있어요" },
  ],
  journey: [
    { name: "탐색기", tip: "가벼운 안부·공감으로 접점부터 늘려요" },
    { name: "호감 싹틈", tip: "둘만의 대화·소소한 약속으로 특별함을 만들어요" },
    { name: "그린라이트", tip: "한 발 더 — 단둘이 만나는 자리를 자연스럽게 제안해요" },
    { name: "확신 직전", tip: "마음을 슬쩍 비춰 확신을 줘요. 고백 타이밍이 가까워요" },
  ],
  dateCourse: {
    목: [{ label: "식물원·수목원", D: DoodlePottedPlant }, { label: "숲길 산책", D: DoodleBamboo }, { label: "감성 북카페", D: DoodleBackpack }],
    화: [{ label: "야경 핫플", D: DoodleFire }, { label: "매운맛 맛집", D: DoodleRamen }, { label: "노래방·페스티벌", D: DoodleMusicNote }],
    토: [{ label: "아늑한 카페", D: DoodleCoffee }, { label: "원데이 공방", D: DoodleColorPalette }, { label: "집밥·홈파티", D: DoodleOnggiJar }],
    금: [{ label: "전시·미술관", D: DoodlePictureFrame }, { label: "드라이브", D: DoodleDiamond }, { label: "호텔 라운지", D: DoodleSparkles }],
    수: [{ label: "바다·강가", D: DoodleWave }, { label: "영화관", D: DoodleTicket }, { label: "분위기 카페", D: DoodleCoffee }],
  },
  mines: {
    목: ["재촉하거나 미래를 다그치기 — 부담이 제일 큰 적", "다른 사람과 비교하기 — 자존심을 건드려요", "즉흥 강요 — 생각할 시간을 뺏지 마요"],
    화: ["밀당으로 약 올리기 — 한번 식으면 빨라요", "무덤덤·시큰둥한 반응 — 텐션이 확 깎여요", "우유부단하게 끌기 — 답답해해요"],
    토: ["변덕스럽게 들었다 놨다 — 신뢰가 깨져요", "급하게 몰아붙이기 — 오히려 더 느려져요", "약속 어기기 — 한 번에 마이너스예요"],
    금: ["과한 들이댐·집착 표현 — 거리감이 무기예요", "TMI·감정 폭발 — 부담스러워해요", "선 넘는 농담 — 정 떨어져요"],
    수: ["감정을 가볍게 넘기기 — 깊게 상처받아요", "단답·무심한 연락 — 벽으로 느껴요", "다른 사람과 비교 — 마음을 닫아요"],
  },
  persona: {
    목: { tag: "성장형", line: "같이 발전하고 미래를 그리는 타입" },
    화: { tag: "직진형", line: "좋으면 바로 표현하는 불같은 타입" },
    토: { tag: "안정형", line: "한결같이 든든하게 챙기는 타입" },
    금: { tag: "쿨·솔직형", line: "깔끔하고 할 말은 하는 타입" },
    수: { tag: "감성형", line: "깊고 섬세하게 마음을 읽는 타입" },
  },
  openHeart: {
    목: { title: "천천히, 미래를 보여줘", line: "급하면 도망가요. 같이 그릴 그림을 슬쩍 보여주면 마음이 열려요." },
    화: { title: "솔직하게 직진", line: "돌려 말하면 답답해해요. 좋다는 티를 분명히 내면 빠르게 반응해요." },
    토: { title: "꾸준함으로 안심시켜", line: "변덕에 약해요. 한결같이 챙기면 어느 날 마음을 활짝 열어요." },
    금: { title: "깔끔하게, 선 지키며", line: "들이대면 식어요. 적당한 거리에서 센스 있게 다가가는 게 통해요." },
    수: { title: "분위기와 공감으로", line: "감정을 읽어주면 무너져요. 깊은 대화 한 번이 열 마디보다 세요." },
  },
  chemi: {
    sheng: { good: "서로 부족한 걸 채워줘 같이 있으면 편해요", care: "너무 편해서 설렘 포인트를 놓치기 쉬워요" },
    ke: { good: "정반대라 끌리고 절대 안 지루해요", care: "한 명이 가끔 져주지 않으면 신경전이 길어져요" },
    same: { good: "말 안 해도 통하는 게 많아요", care: "비슷해서 둘 다 먼저 다가가길 기다려요" },
  },
  strategy: {
    sheng: ["이미 편한 사이 — 둘만의 작은 약속으로 '특별함'을 만들어요", "편한 만큼 설렘 신호도 같이 — 가끔 콕 집은 칭찬 한 스푼"],
    ke: ["부딪히면 먼저 한 발 물러서기 — 여유 있는 쪽이 이겨요", "티격태격도 호감 표현 — 단, 선은 미리 정해 상처 주지 않기"],
    same: ["둘 다 기다리는 타입 — 내가 먼저 약속을 잡아요", "비슷해 편한 만큼 새로운 경험으로 설렘을 환기해요"],
  },
  timing: {
    when: "이번 달 중순~말, 흐름이 올라와요",
    line: "주말 저녁 가벼운 만남에서 한 발 더 다가가기 좋아요.",
    avoid: "감정 소모 큰 시기엔 무리한 고백은 한 박자 미루기",
  },
  anti: {
    목: "재촉하거나 미래를 다그치지 마세요. 부담이 제일 큰 적이에요.",
    화: "밀당으로 약 올리지 마세요. 한번 식으면 빨라요.",
    토: "변덕스럽게 들었다 놨다 하지 마세요. 신뢰가 깨져요.",
    금: "과한 들이댐·집착 표현은 금물. 거리감이 오히려 무기예요.",
    수: "감정을 가볍게 넘기지 마세요. 무심함에 쉽게 상처받아요.",
  },
  extra: {
    title: "밀당 가이드", D: DoodleLightning,
    a: [
      { k: "당길 때", v: "답장이 빨라지고 먼저 연락이 올 때 — 자연스럽게 약속으로 이어요" },
      { k: "풀 때", v: "상대가 바쁘거나 식은 듯할 때 — 한 발 빼고 여유를 줘요" },
      { k: "확신 줄 때", v: "애매함이 길어지면, 가벼운 직진 한 번이 판을 바꿔요" },
    ],
  },
  manual: {
    목: { care: "천천히 자라는 타입 — 급히 흔들면 뿌리가 흔들려요", charge: "같이 그릴 미래·꿈 얘기를 들려주면 충전돼요", ban: "재촉·비교 (금세 시들어요)", as: "진심 어린 응원 한마디면 금방 회복돼요" },
    화: { care: "뜨겁게 타오르지만 식는 것도 빨라요", charge: "즉각적인 리액션·솔직한 표현으로 충전돼요", ban: "미지근한 반응·과한 밀당 (불이 꺼져요)", as: "텐션 한 번 올려주면 바로 재점화돼요" },
    토: { care: "묵직하고 느려도 한번 정 주면 오래가요", charge: "꾸준함·약속 지키기로 충전돼요", ban: "변덕·급발진 (그냥 멈춰버려요)", as: "한결같은 모습이면 신뢰가 복구돼요" },
    금: { care: "단단하고 예리해 거리 조절이 핵심이에요", charge: "깔끔한 매너·센스 있는 한 방으로 충전돼요", ban: "집착·과한 들이댐 (방어막이 켜져요)", as: "쿨하게 한 발 물러나면 다시 다가와요" },
    수: { care: "깊고 섬세해 말보다 분위기에 반응해요", charge: "공감·깊은 대화 한 번이면 충전돼요", ban: "무심·단답 (마음을 닫아요)", as: "감정 읽어주는 한마디면 스르륵 풀려요" },
  },
  memes: [
    { min: 0, label: "탐색 모드 ON" },
    { min: 52, label: "썸 가속 중" },
    { min: 66, label: "running…" },
    { min: 80, label: "D-7 골든타임" },
  ],
  pushPull: {
    목: { best: "push", pushLine: "같이 그릴 그림을 슬쩍 보여주며 다가가면 마음이 열려요 — 좋아요!", pullLine: "너무 빼면 관심 없다고 느껴요. 적당히만 풀어요." },
    화: { best: "push", pushLine: "직진에 바로 반응하는 타입 — 솔직하게 다가가요. 좋아요!", pullLine: "밀당하면 금세 식어요 — 역효과 주의." },
    토: { best: "push", pushLine: "꾸준히 다가가면 신뢰가 쌓여요 — 좋아요!", pullLine: "변덕으로 느껴질 수 있어요. 한결같이가 정답." },
    금: { best: "pull", pushLine: "들이대면 방어막이 켜져요 — 한 발 빼는 게 나아요.", pullLine: "여유 있는 거리에 더 끌려요 — 좋아요!" },
    수: { best: "pull", pushLine: "몰아붙이면 부담스러워해요 — 천천히 가요.", pullLine: "여운을 주면 더 생각나게 해요 — 좋아요!" },
  },
  lucky: {
    목: { day: "토요일", place: "공원·식물원", color: "초록", colorHex: "#4ADE80" },
    화: { day: "금요일", place: "야경 좋은 곳", color: "빨강", colorHex: "#F87171" },
    토: { day: "일요일", place: "아늑한 카페", color: "노랑", colorHex: "#FBBF24" },
    금: { day: "목요일", place: "전시·미술관", color: "화이트", colorHex: "#E2E8F0" },
    수: { day: "수요일", place: "바다·강가", color: "파랑", colorHex: "#60A5FA" },
  },
  price: "1명태",
}
