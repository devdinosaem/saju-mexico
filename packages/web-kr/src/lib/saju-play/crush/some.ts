// ════════════════════════════════════════════════════════════════
// 썸 분석기 카피 뱅크 — core(CrushFunnel)에 주입.
// 톤: 설레고 가벼움. 서로 관심 있는 듯한 "썸" 전제. 점수는 오행에서 파생.
// ════════════════════════════════════════════════════════════════
import {
  DoodleSparkles, DoodleFire, DoodleEarth, DoodleDiamond, DoodleWave,
  DoodleSprout, DoodleLightning, DoodleMirror, DoodleSpeechBubble, DoodleHeart,
} from "@/components/doodles"
import type { CrushConfig } from "./core"

export const SOME_CONFIG: CrushConfig = {
  mode: "some",
  accent: "#E84B6A",
  landing: {
    hi: DoodleSparkles,
    line: "그 사람, 나한테 마음 있을까?",
    sub: "두 사람 생년월일만 넣으면, 지금 우리 사이 온도와 다가가는 법을 사주로 풀어드려요.",
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
  lucky: {
    목: { day: "토요일", place: "공원·식물원", color: "초록", colorHex: "#4ADE80" },
    화: { day: "금요일", place: "야경 좋은 곳", color: "빨강", colorHex: "#F87171" },
    토: { day: "일요일", place: "아늑한 카페", color: "노랑", colorHex: "#FBBF24" },
    금: { day: "목요일", place: "전시·미술관", color: "화이트", colorHex: "#E2E8F0" },
    수: { day: "수요일", place: "바다·강가", color: "파랑", colorHex: "#60A5FA" },
  },
  price: "₩2,900",
}
