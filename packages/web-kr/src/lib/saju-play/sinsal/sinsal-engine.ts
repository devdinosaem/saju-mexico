// 신살(12신살 + 특수신살) → 카테고리 묶음 + 강점 리프레이밍으로 프롬프트 블록 생성.
// 명리 판정은 엔진(analyzeSpiritStars·getSpecialStars)이, 현상번역·조언은 프롬프트가.
// ★핵심: 흉살도 전부 강점/특성으로. 공포(사고·재난·배신) 단정 금지 — 출력엔 현상으로만.
//
// ── 연동 예시 (다른 에이전트/UI에서) ───────────────────────────────
//  ⚠️ analyzeSpiritStars는 영문키(yeokma…)를 반환 → 반드시 SPIRIT_STAR_KOREAN으로
//     한글 변환 후 넘길 것. 안 하면 REFRAME 미스로 원시 영문키가 노출됨.
//     getSpecialStars는 이미 한글 배열이라 그대로 사용.
//
//  import { calculateSaju, analyzeSpiritStars, getSpecialStars, SPIRIT_STAR_KOREAN } from "saju-engine"
//  import { buildSinsalBlock } from "@/lib/saju-play/sinsal/sinsal-engine"
//
//  const { pillars } = calculateSaju(...)
//  const ss = analyzeSpiritStars(pillars)
//  const K = SPIRIT_STAR_KOREAN
//  const twelve = { year: K[ss.year], month: K[ss.month], day: K[ss.day], hour: K[ss.hour] }
//  const dm = pillars.day.stem
//  const branches = [pillars.year.branch, pillars.month.branch, pillars.day.branch, pillars.hour.branch]
//  const sp = (stem, br) => getSpecialStars(dm, pillars.month.branch, branches, stem, br) // 한글 배열
//  const special = {
//    year: sp(pillars.year.stem, pillars.year.branch),
//    month: sp(pillars.month.stem, pillars.month.branch),
//    day: sp(pillars.day.stem, pillars.day.branch),
//    hour: sp(pillars.hour.stem, pillars.hour.branch),
//  }
//  const sinsalBlock = buildSinsalBlock(twelve, special)
//  await fetch("/api/saju-play/sinsal", { method:"POST", body: JSON.stringify({ name, sinsalBlock }) })
// ───────────────────────────────────────────────────────────────

// 각 신살 → 강점 현상(1줄). 신살 이름은 출력에 노출 말고 이 현상으로 풀게 함.
const REFRAME: Record<string, string> = {
  // 12신살(위치 신살)
  겁살: "위기를 정면돌파하는 승부사 기질",
  재살: "판을 읽고 주도권을 쥐는 전략가 기질",
  천살: "한 번 비우고 더 단단해지는 전환의 마디",
  지살: "스스로 길을 내며 나아가는 개척의 기운",
  년살: "어디서든 눈에 띄는 타고난 매력",
  월살: "잠시 숨 고르며 내실을 다지는 시기",
  망신살: "솔직하고 거침없는 과감함",
  장성살: "사람을 이끄는 우두머리 통솔력",
  반안살: "차근차근 올라타 자리를 잡는 안정감",
  역마살: "넓은 세상·이동·변화를 즐기는 기운",
  육해살: "관계를 깊게 거르고 진짜를 남기는 분별",
  화개살: "예술·영성·깊은 통찰의 결",
  // 특수신살 — 길성(복·재능)
  천을귀인: "어려울 때 귀인이 손 내미는 복",
  천덕귀인: "위기에 길이 열리는 하늘의 도움",
  월덕귀인: "주변의 음덕과 신뢰가 따르는",
  태극귀인: "큰 그림을 보는 통찰과 반전의 복",
  문창귀인: "글·공부·표현이 빛나는 머리",
  학당귀인: "배우고 가르치는 데 타고난 재능",
  관귀학관: "실력으로 인정과 자리를 얻는 기운",
  암록: "보이지 않는 곳에서 도움이 들어오는 숨은 복",
  금여성: "안락과 좋은 인연이 따르는",
  정록: "제 몫의 안정된 자리·먹을 복",
  // 특수신살 — 매력·강한 기운
  도화살: "사람을 끌어당기는 타고난 매력",
  홍염살: "은은하게 번지는 분위기와 인기",
  괴강살: "강렬한 카리스마와 추진력",
  백호대살: "폭발적인 에너지와 강단",
  현침살: "바늘처럼 예리한 집중력과 섬세함",
}

// 특수신살 → 카테고리(가독성 묶음)
const CATEGORY: Record<string, string> = {
  천을귀인:"타고난 복·귀인", 천덕귀인:"타고난 복·귀인", 월덕귀인:"타고난 복·귀인",
  태극귀인:"타고난 복·귀인", 암록:"타고난 복·귀인", 금여성:"타고난 복·귀인", 정록:"타고난 복·귀인",
  문창귀인:"재능·학문·표현", 학당귀인:"재능·학문·표현", 관귀학관:"재능·학문·표현",
  도화살:"매력·인연", 홍염살:"매력·인연",
  괴강살:"추진·돌파·카리스마", 백호대살:"추진·돌파·카리스마", 현침살:"추진·돌파·카리스마",
  역마살:"이동·변화·확장",
}
const CATEGORY_ORDER = ["타고난 복·귀인", "재능·학문·표현", "매력·인연", "추진·돌파·카리스마", "이동·변화·확장", "기타"]

const POS_LABEL: Record<string, string> = { year:"초년·뿌리", month:"청년·사회", day:"중년·자기", hour:"말년·결실" }

const reframe = (name: string) => REFRAME[name] ?? name

export type TwelveByPos = { year: string; month: string; day: string; hour: string } // 한글 12신살
export type SpecialByPos = { year: string[]; month: string[]; day: string[]; hour: string[] } // 한글 특수신살

// 프롬프트에 박을 신살 데이터 블록 — 12신살(위치)·특수신살(카테고리) 분리
export function buildSinsalBlock(twelve: TwelveByPos, special: SpecialByPos): string {
  // 12신살: 위치별
  const twelveLines = (["year","month","day","hour"] as const).map(
    pos => `- ${POS_LABEL[pos]}: ${reframe(twelve[pos])}`
  )

  // 특수신살: 합집합 후 카테고리별 묶기
  const uniq = [...new Set(([] as string[]).concat(...Object.values(special)))]
  const byCat: Record<string, string[]> = {}
  for (const name of uniq) {
    const cat = CATEGORY[name] ?? "기타"
    ;(byCat[cat] ??= []).push(reframe(name))
  }
  const specialLines = CATEGORY_ORDER
    .filter(c => byCat[c]?.length)
    .map(c => `- [${c}] ${byCat[c].join(" / ")}`)

  return [
    `[신살 데이터 — 아래 '강점 현상'으로 풀어 설명. 신살 이름(겁살·백호 등)은 출력에 노출 금지, 현상으로만.`,
    ` 흉살도 전부 강점/특성으로 — "사고·재난·배신·질병" 류 공포 단정 절대 금지]`,
    ``,
    `## 타고난 흐름 (12신살 — 인생 시기/영역)`,
    ...twelveLines,
    ``,
    `## 개성·재능 (특수신살 — 카테고리별)`,
    ...(specialLines.length ? specialLines : ["- (두드러진 특수신살 없음 — 12신살 흐름 중심으로)"]),
  ].join("\n")
}
