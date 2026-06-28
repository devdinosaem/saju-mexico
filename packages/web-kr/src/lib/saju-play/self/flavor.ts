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
