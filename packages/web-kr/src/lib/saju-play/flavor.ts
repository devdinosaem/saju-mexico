// ════════════════════════════════════════════════════════════════
// 사주 풀이 카피 뱅크 — 모든 풀이 콘텐츠의 단일 소스.
// 여기를 늘리면 모든 기능이 풍부해진다. (오행/조합/관계종류에서 파생)
// ════════════════════════════════════════════════════════════════
import type { FC } from "react"
import {
  DoodleSprout, DoodleFire, DoodleEarth, DoodleDiamond, DoodleWave,
  DoodleHeart, DoodleSparkle, DoodleLightning, DoodleMirror, DoodleSmiley,
  DoodleSuitcase, DoodleGoldBar, DoodleSpeechBubble, DoodleRing, DoodleStar,
  DoodleColorPalette, DoodleCalendar, DoodleMedal,
  DoodleBackpack, DoodleBamboo, DoodlePottedPlant, DoodleRamen, DoodleMusicNote,
  DoodleOnggiJar, DoodlePictureFrame, DoodleCoffee, DoodleTicket,
} from "@/components/doodles"
import type { Elem, Rel, RelKind } from "./engine"

export type DoodleC = FC<{ className?: string }>

// ── 오행 기본 토큰 ───────────────────────────────────────────────
export const ELEM_BG: Record<Elem, string> = { 목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE" }
export const ELEM_COLOR: Record<Elem, string> = { 목: "#4ADE80", 화: "#F87171", 토: "#FBBF24", 금: "#94A3B8", 수: "#60A5FA" }
export const ELEM_DOODLE: Record<Elem, DoodleC> = { 목: DoodleSprout, 화: DoodleFire, 토: DoodleEarth, 금: DoodleDiamond, 수: DoodleWave }
export const ELEM_LABEL: Record<Elem, string> = { 목: "목 기운", 화: "화 기운", 토: "토 기운", 금: "금 기운", 수: "수 기운" }

// ── 그룹: 역할 / 개인 한마디 ─────────────────────────────────────
export const ROLE: Record<Elem, { label: string; D: DoodleC }> = {
  목: { label: "기획자", D: DoodleSprout },
  화: { label: "분위기메이커", D: DoodleFire },
  토: { label: "든든한 중재자", D: DoodleEarth },
  금: { label: "팩폭 담당", D: DoodleDiamond },
  수: { label: "감성 케어", D: DoodleWave },
}
export const PERSONAL: Record<Elem, string> = {
  목: "아이디어는 네가 다 내. 근데 벌려놓고 마무리는 남 시킴 ㅋㅋ",
  화: "네가 빠지면 모임이 조용해져. 텐션 과할 땐 누가 좀 말려줘",
  토: "싸움 나면 네가 다 중재함. 정작 네 얘긴 안 하더라",
  금: "할 말은 하는 사이다. 가끔 너무 팩트라 따끔해",
  수: "분위기 다 읽고 챙김. 혼자 삭이다 골병 들지 마",
}

// ── 커플: 연애 스타일 / 개인 한마디 ──────────────────────────────
export const LOVE_STYLE: Record<Elem, { label: string; line: string }> = {
  목: { label: "성장형", line: "같이 발전하고 미래를 그리는 타입" },
  화: { label: "직진형", line: "좋으면 바로 표현, 불같이 사랑하는 타입" },
  토: { label: "안정형", line: "한결같고 든든하게 챙기는 타입" },
  금: { label: "쿨·솔직형", line: "깔끔하고 할 말은 하는 타입" },
  수: { label: "감성형", line: "깊고 섬세하게 마음을 읽는 타입" },
}
export const COUPLE_PERSONAL: Record<Elem, string> = {
  목: "관계를 키우는 사람. 가끔 앞서가니 상대 속도도 맞춰줘",
  화: "표현이 확실해서 좋아. 욱할 땐 한 박자만 쉬어가자",
  토: "한결같이 챙기는 기둥. 네 마음도 가끔 표현해줘",
  금: "솔직해서 편한데, 말투에 다정 한 스푼이면 완벽",
  수: "분위기 다 읽고 맞춰주는 사람. 혼자 참지 말고 말해",
}

// ── 조합별 페어 라벨/점수 (상생 5 + 상극 5, 동일은 별도) ──────────
export const PAIR_DATA: Record<string, { text: string; D: DoodleC; score: number }> = {
  목화: { text: "불씨 케미", D: DoodleFire, score: 90 },
  토화: { text: "든든 콤비", D: DoodleEarth, score: 88 },
  금토: { text: "결과 메이커", D: DoodleDiamond, score: 86 },
  금수: { text: "깔끔 밸런스", D: DoodleWave, score: 92 },
  목수: { text: "성장 파트너", D: DoodleSprout, score: 89 },
  목토: { text: "밀당 케미", D: DoodleLightning, score: 60 },
  수토: { text: "은근 긴장", D: DoodleLightning, score: 58 },
  수화: { text: "냉탕온탕", D: DoodleLightning, score: 54 },
  금화: { text: "다듬는 사이", D: DoodleDiamond, score: 63 },
  금목: { text: "자극 케미", D: DoodleLightning, score: 56 },
}
export const SAME_PAIR = { text: "닮은꼴", D: DoodleMirror, score: 72 }

// ── 커플 아키타입 (조합별) ───────────────────────────────────────
export const COUPLE_TYPE: Record<string, { name: string; vibe: string; score: number; D: DoodleC }> = {
  목화: { name: "불붙는 커플", vibe: "한 명이 불씨, 한 명이 키워줘 같이 있으면 텐션 업", score: 91, D: DoodleFire },
  토화: { name: "포근한 커플", vibe: "따뜻하게 받쳐주는, 집 같은 편안함", score: 88, D: DoodleEarth },
  금토: { name: "단단한 커플", vibe: "현실적이고 흔들림 없는, 결과로 보여주는", score: 86, D: DoodleDiamond },
  금수: { name: "물 흐르듯 커플", vibe: "깔끔함과 유연함, 다툼이 적은 사이", score: 92, D: DoodleWave },
  목수: { name: "함께 자라는 커플", vibe: "서로 물 주고 키워주는 성장 연애", score: 89, D: DoodleSprout },
  목토: { name: "밀당 커플", vibe: "밀고 당기는 재미, 긴장감이 매력", score: 66, D: DoodleLightning },
  수토: { name: "은근 긴장 커플", vibe: "느긋함과 단단함이 부딪혀 조율이 필요한", score: 63, D: DoodleLightning },
  수화: { name: "냉탕온탕 커플", vibe: "뜨거움과 차분함이 오가는 극과 극의 끌림", score: 60, D: DoodleLightning },
  금화: { name: "다듬는 커플", vibe: "서로 모난 곳을 깎아주는 성장통 있는", score: 68, D: DoodleDiamond },
  금목: { name: "자극 주는 커플", vibe: "서로 깨우는 자극제, 지루할 틈 없는", score: 64, D: DoodleLightning },
}
export const SAME_COUPLE = { name: "닮은꼴 커플", vibe: "취향도 성격도 비슷해 편한데 새로움은 직접 챙겨야", score: 78, D: DoodleMirror }

// ── 잘 맞는/조심할 점 · 처방전 (관계 무관, 상생/상극/동일) ─────────
export const FIT: Record<Rel, { good: string; care: string }> = {
  sheng: { good: "서로 부족한 걸 자연스럽게 채워줘요", care: "너무 편해서 설렘 이벤트를 깜빡할 수 있어요" },
  ke: { good: "정반대라 끌리고 절대 안 지루해요", care: "한 명이 가끔 져주지 않으면 기싸움이 길어져요" },
  same: { good: "말 안 해도 통하는 게 많아요", care: "비슷해서 둘 다 같은 실수를 해요" },
}
export const REMEDY: Record<Rel, string[]> = {
  sheng: ["이미 잘 맞아요. 가끔 새로운 이벤트로 설렘을 충전해요", "편한 만큼 표현은 줄지 않게 — 사소한 칭찬 자주"],
  ke: ["부딪힐 땐 차분한 쪽이 먼저 손 내밀기", "티격태격도 애정 표현 — 단, 선은 미리 정해두기"],
  same: ["둘 다 비슷해 편한 만큼 반대 성향과 어울려 환기", "같은 실수 반복 주의 — 한 명은 브레이크 역할"],
}

// ── 상황별 궁합 (관계종류별 축) ──────────────────────────────────
type Situ = { key: string; D: DoodleC; delta: number; line: string }
export const SITUATIONAL: Record<RelKind, Situ[]> = {
  friend: [
    { key: "우정", D: DoodleSmiley, delta: 8, line: "같이 노는 덴 최고. 단톡 평생 갈 듯" },
    { key: "연애", D: DoodleHeart, delta: -10, line: "썸은 짜릿, 장기전은 노력 필요" },
    { key: "같이 일", D: DoodleSuitcase, delta: -4, line: "추진은 빠른데 역할 분담이 관건" },
    { key: "같이 돈", D: DoodleGoldBar, delta: -15, line: "돈 얘긴 미리 정하고 시작해 ㅋㅋ" },
  ],
  couple: [
    { key: "썸·설렘", D: DoodleSparkle, delta: 4, line: "초반 텐션과 끌림이 좋아요" },
    { key: "안정·장기", D: DoodleHeart, delta: 1, line: "오래 볼수록 편해지는 사이" },
    { key: "싸울 때 회복", D: DoodleSpeechBubble, delta: -8, line: "대화로 풀면 금방 회복돼요" },
    { key: "미래·결혼", D: DoodleRing, delta: -3, line: "방향만 맞추면 길게 가요" },
  ],
  crush: [
    { key: "첫인상", D: DoodleSparkle, delta: 6, line: "끌림은 확실해요" },
    { key: "밀당", D: DoodleLightning, delta: -2, line: "타이밍 싸움이 관건" },
    { key: "고백 타이밍", D: DoodleHeart, delta: -6, line: "재면 식어요 — 용기 필요" },
    { key: "사귀면", D: DoodleRing, delta: 0, line: "막상 사귀면 편해질 사이" },
  ],
  family: [
    { key: "화목", D: DoodleHeart, delta: 6, line: "기본 정이 두터워요" },
    { key: "대화", D: DoodleSpeechBubble, delta: -6, line: "표현을 아끼면 오해 생겨요" },
    { key: "명절·행사", D: DoodleStar, delta: -2, line: "역할만 나누면 평화로워요" },
    { key: "돈·재산", D: DoodleGoldBar, delta: -12, line: "선은 미리 정하기" },
  ],
  work: [
    { key: "협업", D: DoodleSuitcase, delta: 2, line: "역할 명확하면 시너지" },
    { key: "갈등", D: DoodleLightning, delta: -8, line: "감정 말고 사안으로" },
    { key: "성과", D: DoodleMedal, delta: 4, line: "추진력은 충분" },
    { key: "회식·친목", D: DoodleSmiley, delta: 6, line: "일 밖에선 잘 풀려요" },
  ],
  bestie: [
    { key: "의리", D: DoodleHeart, delta: 9, line: "위기 때 진가가 나와요" },
    { key: "비밀 공유", D: DoodleSpeechBubble, delta: 5, line: "털어놓기 편한 사이" },
    { key: "싸움 회복", D: DoodleSparkle, delta: -3, line: "싸워도 금방 풀려요" },
    { key: "오래가기", D: DoodleStar, delta: 4, line: "10년 가는 사이" },
  ],
}

// ── 부족 오행 채우는 활동 (일상/데이트 겸용) ─────────────────────
export const ELEM_FILL: Record<Elem, { label: string; D: DoodleC }[]> = {
  목: [{ label: "등산·식물원", D: DoodleBackpack }, { label: "숲길 산책", D: DoodleBamboo }, { label: "화분 같이 키우기", D: DoodlePottedPlant }],
  화: [{ label: "불멍 캠핑", D: DoodleFire }, { label: "매운맛 맛집 투어", D: DoodleRamen }, { label: "노래방", D: DoodleMusicNote }],
  토: [{ label: "도자기 공방", D: DoodleColorPalette }, { label: "집밥 같이 해먹기", D: DoodleOnggiJar }, { label: "캠핑", D: DoodleEarth }],
  금: [{ label: "미술관·전시", D: DoodlePictureFrame }, { label: "호캉스", D: DoodleSparkle }, { label: "드라이브", D: DoodleDiamond }],
  수: [{ label: "바다·온천 여행", D: DoodleWave }, { label: "카페 수다", D: DoodleCoffee }, { label: "영화관", D: DoodleTicket }],
}

// ════════════════════════════════════════════════════════════════
// 신규 모듈 데이터 뱅크
// ════════════════════════════════════════════════════════════════

// ① 럭키 세트 — 오행 정통 대응(색/수/방위) + 아이템
export const LUCKY: Record<Elem, { color: string; colorHex: string; numbers: string; item: string; direction: string; D: DoodleC }> = {
  목: { color: "초록", colorHex: "#4ADE80", numbers: "3·8", item: "식물·나무 소품", direction: "동(東)", D: DoodleSprout },
  화: { color: "빨강", colorHex: "#F87171", numbers: "2·7", item: "캔들·조명", direction: "남(南)", D: DoodleFire },
  토: { color: "노랑", colorHex: "#FBBF24", numbers: "5·10", item: "도자기·돌", direction: "중앙", D: DoodleEarth },
  금: { color: "흰색·은", colorHex: "#94A3B8", numbers: "4·9", item: "금속 액세서리", direction: "서(西)", D: DoodleDiamond },
  수: { color: "검정·파랑", colorHex: "#60A5FA", numbers: "1·6", item: "유리·물병", direction: "북(北)", D: DoodleWave },
}

// ② 한 줄 사주 코드 (MBTI식)
export const SAJU_CODE: Record<Elem, { code: string; nick: string }> = {
  목: { code: "WD", nick: "새싹 기획러" },
  화: { code: "FR", nick: "직진 불꽃러" },
  토: { code: "ER", nick: "든든 베이스" },
  금: { code: "MT", nick: "쿨 팩폭러" },
  수: { code: "WT", nick: "감성 물결러" },
}

// ③ "이럴 땐?" 시나리오 카드 (관계종류별)
export const SCENARIO: Partial<Record<RelKind, { q: string; a: string }[]>> = {
  couple: [
    { q: "데이트 코스 막힐 때", a: "부족한 오행 활동에서 하나 골라봐 — 새로운 게 통해" },
    { q: "싸웠을 때", a: "차분한 쪽이 먼저 한마디. 사안만 짧게, 감정은 나중" },
    { q: "권태기 올 때", a: "각자 시간 갖고 한 가지 새 경험 만들어 오기" },
  ],
  friend: [
    { q: "약속 자꾸 미뤄질 때", a: "기획자 기운(목) 있는 친구한테 총대 맡기기" },
    { q: "돈 문제 생길 때", a: "시작 전에 N분의 1 규칙 박아두기" },
  ],
}

// ④ 시기운 (이번 달 관계 흐름) — 관계종류 무관 템플릿 + mock 등급
export const MONTH_FLOW = {
  rating: "맑음", // mock: 맑음/구름조금/흐림
  line: "이번 달은 표현이 통하는 시기예요. 미뤘던 대화를 꺼내기 좋아요",
  bestWeek: "둘째 주",
}

// ⑤ 비교 베이스라인 (mock)
export const COMPARE = {
  averageScore: 76,
  celebPair: { name: "유명 커플 평균", score: 82 },
  percentileLabel: (s: number) => (s >= 90 ? "상위 5%" : s >= 80 ? "상위 20%" : s >= 70 ? "평균권" : "노력파"),
}

// ⑥ 결과 카드 테마 (오행별 색/스티커)
export const CARD_THEME: Record<Elem, { bg: string; accent: string; D: DoodleC }> = {
  목: { bg: "#ECFDF5", accent: "#4ADE80", D: DoodleSprout },
  화: { bg: "#FFF1F2", accent: "#F87171", D: DoodleFire },
  토: { bg: "#FFFBEB", accent: "#FBBF24", D: DoodleEarth },
  금: { bg: "#F8FAFC", accent: "#94A3B8", D: DoodleDiamond },
  수: { bg: "#EFF6FF", accent: "#60A5FA", D: DoodleWave },
}

// ⑦ 인터랙션 퀴즈 — "누가 더 ~할까?" (관계종류별)
export const QUIZ: Partial<Record<RelKind, string[]>> = {
  couple: ["먼저 연락하는 사람?", "더 잘 삐지는 사람?", "지갑 먼저 여는 사람?", "더 표현 많은 사람?"],
  friend: ["약속 잘 어기는 사람?", "계산할 때 빠른 사람?", "단톡 알림 폭격범?"],
}

// ⑧ 재참여 훅 카피
export const REENGAGE: Record<RelKind, string> = {
  friend: "다른 친구랑도 궁합 봐보기",
  couple: "전 연인과는 어땠을까?",
  crush: "다른 썸이랑도 비교해보기",
  family: "다른 가족과도 보기",
  work: "팀원들과도 보기",
  bestie: "찐친이랑도 확인하기",
}

// ⑨ 시리즈 메타 (관계종류 라벨/아이콘) — 엔진은 RelKind 하나로 확장
export const REL_META: Record<RelKind, { label: string; D: DoodleC }> = {
  friend: { label: "친구", D: DoodleSmiley },
  couple: { label: "커플", D: DoodleHeart },
  crush: { label: "썸·짝사랑", D: DoodleSparkle },
  family: { label: "가족", D: DoodleHeart },
  work: { label: "직장", D: DoodleSuitcase },
  bestie: { label: "베프", D: DoodleStar },
}

// 럭키 데이트 mock (관계 무관)
export const LUCKY_DATE = { date: "7월 12일 (토)", activity: "불멍 데이트", D: DoodleCalendar }
