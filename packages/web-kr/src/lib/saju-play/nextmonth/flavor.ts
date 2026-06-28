// "다음달 운 미리보기" 카피 뱅크 — 날씨·테마·영역·행운·미션.
// 톤: self/sinsal과 동일(따뜻·명확). 예보형 — 단정 금지, 흐름·확률로.
import type { Elem } from "../engine"
import type { TGGroup } from "../self/flavor"
import {
  DoodleSun, DoodleRainbow, DoodleCloud, DoodleUmbrella, DoodleLightning,
  DoodleColorPalette, DoodleDiamond, DoodleMedal, DoodleBook, DoodleHeart,
  DoodleClover, DoodleSpeechBubble, DoodlePottedPlant, DoodleCandle,
  DoodleOnggiJar, DoodleRing, DoodleWater,
} from "@/components/doodles"

type DoodleC = React.FC<{ className?: string }>

// 종합 점수 → 운세 날씨 (favor 내림차순, 처음 매칭)
export const WEATHER: { min: number; key: string; label: string; line: string; D: DoodleC }[] = [
  { min: 80, key: "맑음", label: "맑음", line: "활짝 트이는 달 — 벌여도 좋아.", D: DoodleSun },
  { min: 64, key: "대체로맑음", label: "대체로 맑음", line: "흐름이 순한 달 — 한 발씩 나가면 풀려.", D: DoodleRainbow },
  { min: 48, key: "구름조금", label: "구름 조금", line: "잔잔한 달 — 무리 말고 내 페이스로.", D: DoodleCloud },
  { min: 34, key: "비소식", label: "비 소식", line: "숨 고르는 달 — 키우기보다 다지기.", D: DoodleUmbrella },
  { min: 0, key: "천둥주의", label: "천둥·주의", line: "변동 큰 달 — 큰 결정은 한 박자 신중히.", D: DoodleLightning },
]

// 월운 십신 그룹 → 이 달의 테마 카드 (use: 어떻게 쓰면 좋은지)
export const MONTH_THEME: Record<TGGroup, { title: string; line: string; use: string; D: DoodleC }> = {
  비겁: { title: "내가 나서는 달", line: "주도권·경쟁의 기운 — 내가 판을 만들 때야.", use: "미뤄둔 일을 내가 직접 밀어붙이기 좋아. 단, 혼자 다 짊어지진 말고.", D: DoodleLightning },
  식상: { title: "펼치는 달", line: "표현·확장의 기운 — 끼를 내고 새로 시작하기 좋아.", use: "콘텐츠·기획·새 취미를 시작하기 좋은 달. 표현할 자리를 만들어 봐.", D: DoodleColorPalette },
  재성: { title: "결실의 달", line: "재물·성과의 기운 — 현실 성과가 손에 잡혀.", use: "계약·정산·투자 점검에 유리해. 벌인 걸 돈으로 매듭짓기 좋아.", D: DoodleDiamond },
  관성: { title: "자리 잡는 달", line: "책임·성취의 기운 — 일·관계가 단단해져.", use: "승진·시험·중요한 약속에 힘이 실려. 책임지는 자리에서 빛나.", D: DoodleMedal },
  인성: { title: "채우는 달", line: "충전·배움의 기운 — 쉬며 안을 채울 때.", use: "공부·자격·휴식에 좋은 달. 무리한 확장보다 실력·체력 채우기.", D: DoodleBook },
}

// 영역별 게이지 (Ch2) — 표시 순서·아이콘
export type AreaKey = "love" | "work" | "money" | "health" | "rel"
export const AREA: { key: AreaKey; label: string; D: DoodleC }[] = [
  { key: "love", label: "애정", D: DoodleHeart },
  { key: "work", label: "일·성취", D: DoodleMedal },
  { key: "money", label: "돈·재물", D: DoodleDiamond },
  { key: "health", label: "건강", D: DoodleClover },
  { key: "rel", label: "관계", D: DoodleSpeechBubble },
]
// 영역별 점수 구간 한 줄 (hi≥72 / lo≤42 / 그 외 mid)
export const AREA_LINE: Record<AreaKey, { hi: string; mid: string; lo: string }> = {
  love: { hi: "끌림이 도는 달 — 표현하면 통해", mid: "잔잔한 애정운 — 자연스럽게 가", lo: "혼자 시간도 필요한 달 — 서두르지 마" },
  work: { hi: "치고 나가기 좋은 달 — 성과가 보여", mid: "꾸준히 가면 되는 달", lo: "벌이기보다 정리·마무리에 집중" },
  money: { hi: "돈이 붙는 달 — 기회를 잡아", mid: "큰 변동 없는 무난한 재물운", lo: "지출 관리·충동구매 주의" },
  health: { hi: "컨디션 좋은 달 — 활동량 늘려도 OK", mid: "무난해 — 기본 루틴만 지켜", lo: "피로·잔병 주의 — 쉼표를 챙겨" },
  rel: { hi: "사람 덕 보는 달 — 먼저 연락해봐", mid: "관계는 평온 — 있는 인연을 챙겨", lo: "오해 생기기 쉬워 — 말 한 번 더 확인" },
}

// 용신 오행 → 이 달의 행운 아이템 (Ch5)
export const LUCKY: Record<Elem, { color: string; dir: string; num: string; item: string; D: DoodleC }> = {
  목: { color: "초록", dir: "동쪽", num: "3·8", item: "화분·식물", D: DoodlePottedPlant },
  화: { color: "빨강", dir: "남쪽", num: "2·7", item: "캔들·조명", D: DoodleCandle },
  토: { color: "노랑", dir: "중앙", num: "5·10", item: "도자기·흙빛 소품", D: DoodleOnggiJar },
  금: { color: "흰색", dir: "서쪽", num: "4·9", item: "반지·금속 액세서리", D: DoodleRing },
  수: { color: "파랑", dir: "북쪽", num: "1·6", item: "유리병·물 가까이", D: DoodleWater },
}

// 용신 오행 → 이 달의 미션 (채우면 트이는 행동)
export const MISSION: Record<Elem, { act: string; D: DoodleC }> = {
  목: { act: "숲길·식물원 산책으로 새 기운 채우기", D: DoodlePottedPlant },
  화: { act: "햇빛·운동·사람 속에서 텐션 올리기", D: DoodleSun },
  토: { act: "집밥·정리·루틴으로 중심 잡기", D: DoodleOnggiJar },
  금: { act: "전시 관람·미니멀 정리로 결 다듬기", D: DoodleRing },
  수: { act: "물가 산책·독서로 깊이 채우기", D: DoodleWater },
}

// 충/합 이벤트 → 한 줄 배지 카피
export const EVENT_COPY: Record<"충" | "합", { title: string; line: string }> = {
  충: { title: "변화의 달", line: "흔들림·이동수가 도는 달 — 흔들릴 땐 핵심만 붙잡아." },
  합: { title: "귀인의 달", line: "사람·인연이 붙는 달 — 손 내밀면 도움이 와." },
}
