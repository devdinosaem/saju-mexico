// "나 사용설명서" 카피 뱅크 — 십신 재능 · 오행 성향 · 오행 회의실.
import type { Elem } from "../engine"
import {
  DoodleLightning, DoodleColorPalette, DoodleDiamond, DoodleMedal, DoodleBook,
  DoodlePottedPlant, DoodleBamboo, DoodleSun, DoodleFire, DoodleMusicNote,
  DoodleOnggiJar, DoodleCoffee, DoodlePictureFrame, DoodleWave, DoodleSparkles,
} from "@/components/doodles"

type DoodleC = React.FC<{ className?: string }>
export type TGGroup = "비겁" | "식상" | "재성" | "관성" | "인성"

// 십신 그룹 → 타고난 재능
export const TALENT: Record<TGGroup, { tag: string; line: string; D: DoodleC }> = {
  비겁: { tag: "주체·독립", line: "내 힘으로 밀고 나가는, 경쟁에 강한 추진력", D: DoodleLightning },
  식상: { tag: "표현·창작", line: "끼와 아이디어, 표현하고 만들어내는 손", D: DoodleColorPalette },
  재성: { tag: "현실·수완", line: "돈·실리 감각, 현실을 굴려 결과로 만드는", D: DoodleDiamond },
  관성: { tag: "책임·성취", line: "조직·규율에서 빛나는, 끝까지 해내는 뚝심", D: DoodleMedal },
  인성: { tag: "학습·내공", line: "받아들이고 깊어지는, 전문성으로 쌓는", D: DoodleBook },
}

// 부족 오행 채우는 것들 (혼자 self-care)
export const ELEM_FILL: Record<Elem, { label: string; D: DoodleC }[]> = {
  목: [{ label: "식물원·숲길 산책", D: DoodlePottedPlant }, { label: "새 취미 배우기", D: DoodleBook }, { label: "화분 키우기", D: DoodleBamboo }],
  화: [{ label: "햇빛·운동", D: DoodleSun }, { label: "사람들과 어울리기", D: DoodleFire }, { label: "노래·표현하기", D: DoodleMusicNote }],
  토: [{ label: "집밥·정리정돈", D: DoodleOnggiJar }, { label: "규칙적인 루틴", D: DoodleCoffee }, { label: "짧은 명상", D: DoodleColorPalette }],
  금: [{ label: "미술관·전시 관람", D: DoodlePictureFrame }, { label: "미니멀 정리", D: DoodleDiamond }, { label: "드라이브", D: DoodleSparkles }],
  수: [{ label: "바다·물가 산책", D: DoodleWave }, { label: "독서·사색", D: DoodleBook }, { label: "음악·휴식", D: DoodleMusicNote }],
}

// 오행 → 기질 한 줄 (본캐/부캐용)
export const ELEM_TRAIT: Record<Elem, string> = {
  목: "추진·성장 — 새로 벌이고 키우는 결",
  화: "열정·표현 — 뜨겁게 드러내는 결",
  토: "안정·신뢰 — 묵직하게 받쳐주는 결",
  금: "원칙·결단 — 깔끔하게 잘라내는 결",
  수: "지혜·유연 — 깊고 흐르듯 가는 결",
}

// 내 안의 오행 회의실 — 의인화된 목소리
export const MEETING: Record<Elem, { role: string; voice: string }> = {
  목: { role: "기획자", voice: "새로 벌이자, 키우자!" },
  화: { role: "분위기 메이커", voice: "지금 당장 표현해!" },
  토: { role: "중재자", voice: "일단 안정부터, 천천히 가자" },
  금: { role: "감독관", voice: "원칙대로. 자를 건 자르자" },
  수: { role: "전략가", voice: "흐름을 보자, 깊게 생각하고" },
}

// 일간 오행 → 연애 스타일
export const LOVE_STYLE: Record<Elem, { tag: string; line: string }> = {
  목: { tag: "성장형", line: "같이 발전하고 미래를 그리는 연애" },
  화: { tag: "직진·표현형", line: "좋으면 화끈하게 표현하는 연애" },
  토: { tag: "안정형", line: "한결같이 챙기는, 든든한 연애" },
  금: { tag: "쿨·솔직형", line: "깔끔하고 선이 분명한 연애" },
  수: { tag: "감성형", line: "깊고 섬세하게 감정으로 통하는 연애" },
}

// 용신 오행 → 이상형(나를 채워주는 사람)
export const IDEAL: Record<Elem, string> = {
  목: "새로운 자극과 성장을 주는 사람.",
  화: "따뜻하게 표현해주고 텐션을 올려주는 사람.",
  토: "묵직하게 받쳐주고 안정감을 주는 사람.",
  금: "깔끔하게 정리해주고 중심을 잡아주는 사람.",
  수: "깊이 이해하고 차분하게 품어주는 사람.",
}

// 십신 그룹 → 어울리는 일
export const JOB: Record<TGGroup, string> = {
  비겁: "독립·전문가·프리랜서 — 내 이름 걸고 하는 일",
  식상: "창작·기획·콘텐츠·교육 — 표현하고 만드는 일",
  재성: "사업·영업·금융·유통 — 현실을 굴려 돈으로 잇는 일",
  관성: "조직·관리·공직·전문직 — 책임지고 끌어가는 일",
  인성: "연구·교육·전문기술·상담 — 깊이 쌓아 전하는 일",
}

// 일간 오행 → 나 사용설명서 (취급주의/충전법/방전신호/셀프AS)
export const SELF_MANUAL: Record<Elem, { care: string; charge: string; drain: string; as: string }> = {
  목: { care: "새로 벌이는 걸 좋아해 — 가지치기를 잊으면 과부하", charge: "성장·배움·자연에서 충전", drain: "갇히거나 정체되면 방전", as: "새 목표 하나 세우면 다시 켜져요" },
  화: { care: "확 타오르고 확 식어 — 페이스 조절이 필요해", charge: "표현·인정·재미에서 충전", drain: "무시당하거나 단조로우면 방전", as: "텐션 올릴 자리 한 번이면 재점화돼요" },
  토: { care: "묵직해 좋은데 너무 끌어안으면 무거워져", charge: "안정·신뢰·꾸준한 루틴에서 충전", drain: "급변·불확실에 방전", as: "정리·휴식 하루면 회복돼요" },
  금: { care: "예리해 좋은데 날이 서면 주변이 다쳐", charge: "성취·완결·깔끔한 정리에서 충전", drain: "어수선·우유부단에 방전", as: "한 가지 끝장내면 다시 날카로워져요" },
  수: { care: "깊어 좋은데 혼자 가라앉기 쉬워", charge: "사색·공감·물가에서 충전", drain: "감정 소모·시끄러움에 방전", as: "혼자만의 시간 + 대화 한 번이면 회복돼요" },
}

// 용신 오행 → 나를 살리는 환경
export const SELF_ENV: Record<Elem, { dir: string; color: string; season: string; act: string }> = {
  목: { dir: "동쪽", color: "초록", season: "봄·아침", act: "자연·식물·새 배움" },
  화: { dir: "남쪽", color: "빨강", season: "여름·한낮", act: "사람·표현·운동" },
  토: { dir: "중앙", color: "노랑", season: "환절기", act: "안정·루틴·집" },
  금: { dir: "서쪽", color: "흰색", season: "가을·저녁", act: "정리·완결·산책" },
  수: { dir: "북쪽", color: "파랑", season: "겨울·밤", act: "물가·사색·휴식" },
}

// 오행 → 약할 때 챙길 몸 (부드럽게)
export const ELEM_ORGAN: Record<Elem, string> = {
  목: "간·눈·근육 — 무리한 분노·피로 조심",
  화: "심장·혈액·수면 — 과열·불면 조심",
  토: "위·소화 — 신경성 소화 조심",
  금: "폐·호흡·피부 — 환절기 호흡기 조심",
  수: "신장·방광·뼈 — 수분·하체 순환 챙기기",
}

// 세운 십신 → 올해 흐름 한 줄
export const SEUN_LINE: Record<TGGroup, string> = {
  비겁: "주도권·경쟁의 해 — 내가 나서서 판을 만들 때",
  식상: "표현·확장의 해 — 끼를 펼치고 새로 시작하기 좋아",
  재성: "결실·재물의 해 — 현실 성과가 손에 잡혀",
  관성: "책임·성취의 해 — 자리·관계가 단단해져",
  인성: "충전·배움의 해 — 쉬며 채우고 실력 쌓을 때",
}

// ── 재미·바이럴 ──────────────────────────────────────────────
// 우세 오행 → 전생의 나
export const PAST_LIFE: Record<Elem, string> = {
  목: "새 길을 내던 개척자였을지도. 늘 뭔가를 시작하던 사람.",
  화: "무대를 밝히던 예인이었을지도. 사람을 끌어모으던 사람.",
  토: "마을을 지키던 촌장이었을지도. 모두가 기대던 사람.",
  금: "칼을 벼리던 장인이었을지도. 원칙이 분명하던 사람.",
  수: "별을 읽던 점성가였을지도. 깊이 들여다보던 사람.",
}

// 우세 오행 → 나의 흑역사 버튼 (위트 + 자기수용)
export const DARK_HIST: Record<Elem, string> = {
  목: "벌여놓고 수습 못 해 일 키우기 — 근데 그게 네 추진력이야 ㅎㅎ",
  화: "욱해서 질러놓고 새벽에 후회하기 — 뜨거운 만큼 빨리 식어서 그래",
  토: "고집부리다 타이밍 놓치기 — 신중함의 부작용일 뿐이야",
  금: "할 말 다 해놓고 분위기 싸하게 — 솔직함이 가끔 과해서",
  수: "생각만 너무 많아 시작도 못 하기 — 깊어서 그런 거니까 괜찮아",
}

// 우세 오행 → 한 줄 밈
export const MEME: Record<Elem, string> = {
  목: "벌이고 보는 추진러",
  화: "감성 과몰입러",
  토: "은근 고집 마이웨이",
  금: "팩트폭격 직진러",
  수: "생각 만렙 잠수러",
}
