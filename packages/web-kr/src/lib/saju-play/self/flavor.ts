// "나 사용설명서" 카피 뱅크 — 십신 재능 · 오행 성향 · 오행 회의실.
import type { Elem } from "../engine"
import {
  DoodleLightning, DoodleColorPalette, DoodleDiamond, DoodleMedal, DoodleBook,
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
