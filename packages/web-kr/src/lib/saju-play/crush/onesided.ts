// ════════════════════════════════════════════════════════════════
// 짝사랑 분석기 카피 뱅크 — core(CrushFunnel)에 주입.
// 톤: 일방·불확실 전제. 조심스럽고 따뜻하게, 가능성 낮아도 비난·절망 금지(위로).
// 구조는 썸과 동일, 결만 다름. 점수·신호는 compat-engine에서 파생.
// ════════════════════════════════════════════════════════════════
import {
  DoodleSparkles, DoodleFire, DoodleEarth, DoodleDiamond, DoodleWave,
  DoodleSprout, DoodleLightning, DoodleMirror, DoodleSpeechBubble, DoodleHeart, DoodleMoon,
  DoodleBackpack, DoodleBamboo, DoodlePottedPlant, DoodleRamen, DoodleMusicNote,
  DoodleColorPalette, DoodleOnggiJar, DoodlePictureFrame, DoodleCoffee, DoodleTicket,
} from "@/components/doodles"
import type { CrushConfig } from "./core"
import { PRICES, priceLabel } from "@/lib/prices"

export const ONESIDED_CONFIG: CrushConfig = {
  mode: "crush",
  accent: "#8B6FC9",
  landing: {
    hi: DoodleMoon,
    line: "그 사람 마음에, 내가 있을까?",
    sub: "혼자 간직한 마음 — 사주로 가능성과 다가가는 법을 짚어줄게.",
    cta: "짝사랑 분석 시작하기",
  },
  gaugeName: "마음 닿을 가능성",
  scoreOpt: { same: 70, sheng: 80, ke: 58 },
  archetype: {
    목화: { name: "은근한 끌림", vibe: "네 마음이 그 사람을 천천히 데우는 사이", D: DoodleFire },
    토화: { name: "포근한 짝사랑", vibe: "옆에 있으면 편안해, 스며들 듯 가까워지는", D: DoodleEarth },
    금토: { name: "묵직한 마음", vibe: "티 안 나지만 깊고 단단하게 쌓이는", D: DoodleDiamond },
    금수: { name: "잔잔한 여운", vibe: "다툼 없이 자연스럽게 물드는 사이", D: DoodleWave },
    목수: { name: "키워가는 마음", vibe: "곁에서 서로 자라게 하는 결", D: DoodleSprout },
    목토: { name: "닿을 듯 말 듯", vibe: "거리감이 매력인, 밀고 당기는", D: DoodleLightning },
    수토: { name: "조심스러운 거리", vibe: "느긋함과 단단함 사이, 조율이 필요한", D: DoodleLightning },
    수화: { name: "엇갈리는 온도", vibe: "뜨거움과 차분함이 오가는 극과 극", D: DoodleLightning },
    금화: { name: "다듬어지는 마음", vibe: "톡톡 부딪히며 가까워지는", D: DoodleDiamond },
    금목: { name: "자극이 되는 사이", vibe: "서로를 깨우는, 지루할 틈 없는", D: DoodleLightning },
  },
  sameArch: { name: "닮은 마음", vibe: "결이 비슷해 편한데 먼저 다가가야 움직여요", D: DoodleMirror },
  temp: [
    { min: 0, label: "아직 멀어 보여요", line: "상대 레이더 밖일 수 있어요. 작은 접점부터 만들 때." },
    { min: 55, label: "가능성이 보여요", line: "흐름이 나쁘지 않아요. 천천히 다가가도 좋은 자리." },
    { min: 74, label: "거의 닿았어요", line: "마음이 열리기 직전 — 용기만 내면 되는 사이예요." },
  ],
  situational: [
    { key: "첫인상", D: DoodleSparkles, delta: 5, line: "처음부터 눈에 들어오는 케미예요" },
    { key: "호감 전환", D: DoodleHeart, delta: 1, line: "친구에서 그 이상으로 갈 여지가 있어요" },
    { key: "다가가는 속도", D: DoodleLightning, delta: -6, line: "너무 빠르면 부담될 수 있는 구간" },
    { key: "고백 성공률", D: DoodleMoon, delta: -3, line: "타이밍만 맞추면 충분히 승산 있어요" },
  ],
  journey: [
    { name: "관심 밖", tip: "먼저 자연스러운 접점부터 — 인사·공감으로 존재감을 남겨요" },
    { name: "나를 인지", tip: "가벼운 대화로 '편한 사람'이 되어요" },
    { name: "호감 싹틈", tip: "둘만의 순간·작은 챙김으로 특별해져요" },
    { name: "마음 열림", tip: "슬쩍 마음을 비춰요 — 고백 타이밍이 가까워요" },
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
    화: ["속도 안 맞추고 끌기 — 답답해해요", "무덤덤·시큰둥한 반응 — 텐션이 확 깎여요", "재기만 하기 — 기회를 놓쳐요"],
    토: ["변덕스럽게 들었다 놨다 — 신뢰가 깨져요", "급하게 몰아붙이기 — 오히려 더 느려져요", "약속 어기기 — 한 번에 마이너스예요"],
    금: ["과한 들이댐·집착 표현 — 거리감이 무기예요", "TMI·감정 폭발 — 부담스러워해요", "선 넘는 농담 — 정 떨어져요"],
    수: ["감정을 가볍게 넘기기 — 깊게 상처받아요", "단답·무심한 연락 — 벽으로 느껴요", "다른 사람과 비교 — 마음을 닫아요"],
  },
  manual: {
    목: { care: "천천히 자라는 타입 — 급히 흔들면 뿌리가 흔들려요", charge: "같이 그릴 미래·꿈 얘기를 들려주면 충전돼요", ban: "재촉·비교 (금세 시들어요)", as: "진심 어린 응원 한마디면 금방 회복돼요" },
    화: { care: "뜨겁게 타오르지만 식는 것도 빨라요", charge: "즉각적인 리액션·솔직한 표현으로 충전돼요", ban: "미지근한 반응·과한 재기 (불이 꺼져요)", as: "텐션 한 번 올려주면 바로 재점화돼요" },
    토: { care: "묵직하고 느려도 한번 정 주면 오래가요", charge: "꾸준함·약속 지키기로 충전돼요", ban: "변덕·급발진 (그냥 멈춰버려요)", as: "한결같은 모습이면 신뢰가 복구돼요" },
    금: { care: "단단하고 예리해 거리 조절이 핵심이에요", charge: "깔끔한 매너·센스 있는 한 방으로 충전돼요", ban: "집착·과한 들이댐 (방어막이 켜져요)", as: "쿨하게 한 발 물러나면 다시 다가와요" },
    수: { care: "깊고 섬세해 말보다 분위기에 반응해요", charge: "공감·깊은 대화 한 번이면 충전돼요", ban: "무심·단답 (마음을 닫아요)", as: "감정 읽어주는 한마디면 스르륵 풀려요" },
  },
  memes: [{ min: 0, label: "마음 정리 중" }, { min: 55, label: "가능성 발견" }, { min: 74, label: "거의 다 왔어" }],
  pushPull: {
    목: { best: "push", pushLine: "천천히 다가가면 마음이 열려요 — 좋아요!", pullLine: "너무 기다리면 관심 없다고 느낄 수 있어요." },
    화: { best: "push", pushLine: "솔직하게 다가가면 바로 반응해요 — 좋아요!", pullLine: "재기만 하면 기회를 놓쳐요." },
    토: { best: "push", pushLine: "꾸준히 다가가면 신뢰가 쌓여요 — 좋아요!", pullLine: "마냥 기다리면 진전이 없어요." },
    금: { best: "pull", pushLine: "들이대면 거리를 둬요 — 한 박자 천천히.", pullLine: "여유를 주면 먼저 다가와요 — 좋아요!" },
    수: { best: "pull", pushLine: "몰아붙이면 부담스러워해요 — 천천히.", pullLine: "여운을 주면 더 생각나게 해요 — 좋아요!" },
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
    sheng: { good: "서로 부족한 걸 채워줘 곁에 있으면 편해요", care: "너무 편해서 '친구'에 머물 수 있어요" },
    ke: { good: "정반대라 끌리고 묘하게 신경 쓰여요", care: "조급하면 거리가 더 벌어질 수 있어요" },
    same: { good: "결이 비슷해 말이 잘 통해요", care: "둘 다 먼저 다가가길 기다리기 쉬워요" },
  },
  strategy: {
    sheng: ["이미 편한 사이 — 둘만의 작은 약속으로 특별해지기", "꾸준한 관심으로 '친구 그 이상'을 만들기"],
    ke: ["조급함은 금물 — 여유 있게, 먼저 한 발", "다른 점을 매력으로 보여주되 선은 지키기"],
    same: ["둘 다 기다리는 타입 — 내가 먼저 다가가기", "비슷해 편한 만큼 새로운 경험으로 환기"],
  },
  timing: {
    when: "이번 달 중순~말, 흐름이 올라와요",
    line: "편한 자리에서 한 발 더 다가가기 좋아요.",
    avoid: "마음 무거운 시기엔 무리한 고백은 한 박자 미루기",
  },
  anti: {
    목: "재촉하거나 미래를 다그치지 마세요. 부담이 제일 큰 적이에요.",
    화: "미지근하게 굴지 마세요. 한번 식으면 빨라요.",
    토: "변덕스럽게 들었다 놨다 하지 마세요. 신뢰가 깨져요.",
    금: "과한 들이댐·집착 표현은 금물. 거리감이 오히려 무기예요.",
    수: "감정을 가볍게 넘기지 마세요. 무심함에 쉽게 상처받아요.",
  },
  extra: {
    title: "한 번 더 다가가기", D: DoodleHeart,
    a: [
      { k: "지금", v: "흐름이 좋아요 — 자연스러운 자리에서 한 발 더 다가가요" },
      { k: "표현", v: "부담 없는 관심부터. 작은 챙김이 차곡차곡 쌓여요" },
      { k: "고백", v: "확신이 서면 슬쩍 마음을 비춰도 좋아요" },
    ],
  },
  extraLow: {
    title: "마음, 천천히", D: DoodleMoon,
    a: [
      { k: "지금은", v: "타이밍이 아닐 뿐, '안 될 사람'이 아니에요" },
      { k: "이렇게", v: "무리해 다가가기보다 너를 채우는 시간에 — 흐름은 바뀌어요" },
      { k: "정리도", v: "정리하는 것도 용기예요. 다음 인연은 더 잘 맞을 거예요" },
    ],
  },
  extraThreshold: 58,
  lucky: {
    목: { day: "토요일", place: "공원·식물원", color: "초록", colorHex: "#4ADE80" },
    화: { day: "금요일", place: "야경 좋은 곳", color: "빨강", colorHex: "#F87171" },
    토: { day: "일요일", place: "아늑한 카페", color: "노랑", colorHex: "#FBBF24" },
    금: { day: "목요일", place: "전시·미술관", color: "화이트", colorHex: "#E2E8F0" },
    수: { day: "수요일", place: "바다·강가", color: "파랑", colorHex: "#60A5FA" },
  },
  price: priceLabel(PRICES.onesidedCompat),
  apiPath: "/api/saju-play/onesided",
  chapters: ["두 기운이 만나면", "그 사람 마음엔", "그래서 가능성은", "그 사람 파헤치기", "어떻게 닿을까", "다가갈까, 기다릴까", "언제 움직일까"],
  tempTitle: "마음 온도계",
  journeyTitle: "마음 여정",
  situationalTitle: "상황별 가능성",
  leverTitle: "다가갈까, 기다릴까",
  lever: { prompt: "지금 어떻게 할까?", push: "다가가기", pull: "기다리기" },
  balance: {
    생받음: { pos: 62, line: "그 사람 기운이 너를 끌어당기는 결 — 가능성이 있어요" },
    극받음: { pos: 58, line: "묘하게 너를 신경 쓰게 만드는 끌림이 있어요" },
    같음: { pos: 50, line: "결이 비슷해 편한 사이 — 먼저 다가가면 움직여요" },
    생해줌: { pos: 40, line: "지금은 네 마음이 더 크지만, 정성으로 닿을 수 있어요" },
    극해줌: { pos: 44, line: "네가 이끄는 흐름 — 조급함만 내려놓으면 돼요" },
  },
}
