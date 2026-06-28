// "내 신살 도감" 카피 뱅크 — 27 신살(12신살 + 특수신살).
// ★핵심 가치: 무서운 한자 이름 → 친근한 별명 + 따뜻하고 명확한 풀이. 공포 조장 금지.
// 흉살도 전부 강점/특성으로. myth는 "무서운 이름, 사실은…" 오해풀기용.
import {
  DoodleLightning, DoodleCompass, DoodleHourglass, DoodleSprout, DoodleRose,
  DoodleMoon, DoodleSpeechBubble, DoodleCrown, DoodleHorseshoe, DoodlePlane,
  DoodleScissors, DoodleLotus, DoodleCrane, DoodleStar, DoodleClover,
  DoodleTaegeuk, DoodlePencil, DoodleBook, DoodleMedal, DoodleFortunePouch,
  DoodleRing, DoodleGoldBar, DoodleHeart, DoodleHibiscus, DoodleFire,
  DoodleTiger, DoodleFeather,
} from "@/components/doodles"

type DoodleC = React.FC<{ className?: string }>

// 6분류 (UI 카테고리)
export type SinsalCat = "이동·변화" | "매력·인기" | "재능·예술" | "권력·카리스마" | "귀인·행운" | "주의·전환"
export const CAT_ORDER: SinsalCat[] = ["귀인·행운", "재능·예술", "매력·인기", "권력·카리스마", "이동·변화", "주의·전환"]
export const CAT_STYLE: Record<SinsalCat, { bg: string; ink: string }> = {
  "귀인·행운": { bg: "#FEF3C7", ink: "#B45309" },
  "재능·예술": { bg: "#EDE9FE", ink: "#6D28D9" },
  "매력·인기": { bg: "#FCE7F3", ink: "#BE185D" },
  "권력·카리스마": { bg: "#FEE2E2", ink: "#B91C1C" },
  "이동·변화": { bg: "#DBEAFE", ink: "#1D4ED8" },
  "주의·전환": { bg: "#E2E8F0", ink: "#475569" },
}

// 5능력치 축 (레이더)
export type SinsalStat = "이동" | "매력" | "재능" | "추진" | "복"
export const STAT_LABEL: Record<SinsalStat, string> = {
  이동: "이동·확장", 매력: "매력·인기", 재능: "재능·표현", 추진: "추진·카리스마", 복: "복·귀인",
}

export type SinsalInfo = {
  alias: string    // 친근 별명
  mean: string     // 진짜 뜻 (한 줄)
  good: string     // 좋은 면
  caution: string  // 주의 (부드럽게)
  use: string      // 활용 영역
  cat: SinsalCat
  stat: SinsalStat
  myth?: string    // "무서운 이름, 사실은…" 오해풀기 (겁나는 살만)
  D: DoodleC
}

export const SINSAL: Record<string, SinsalInfo> = {
  // ── 12신살 (자리·인생 시기) ──────────────────────────────
  겁살: {
    alias: "정면돌파러", stat: "추진", cat: "권력·카리스마", D: DoodleLightning,
    mean: "위기가 와도 피하지 않고 정면으로 부딪쳐 뚫는 기운",
    good: "급박할수록 강해지는 승부사. 남들 얼어붙을 때 네가 먼저 움직여",
    caution: "다 짊어지려다 혼자 지칠 수 있어. 가끔은 덜어내도 괜찮아",
    use: "위기관리·결단이 필요한 일에서 진가가 나와",
    myth: "‘빼앗길 살’이라 겁주지만, 사실은 위기를 정면돌파하는 승부 기질이야",
  },
  재살: {
    alias: "판 읽는 전략가", stat: "추진", cat: "권력·카리스마", D: DoodleCompass,
    mean: "상황의 흐름과 핵심을 빠르게 읽어 주도권을 쥐는 기운",
    good: "경쟁·협상에서 수 읽기에 능한 두뇌파. 한 발 앞서 봐",
    caution: "너무 재고 따지다 타이밍을 놓치지 않게",
    use: "기획·전략·승부처에서 강해",
    myth: "‘재앙 살’이라 무섭게 들리지만, 판을 읽고 주도권 쥐는 전략가 기질이야",
  },
  천살: {
    alias: "리셋 버튼", stat: "복", cat: "주의·전환", D: DoodleHourglass,
    mean: "한 번 비우고 더 단단해지는 전환의 마디",
    good: "큰 흐름을 보는 눈. 비운 뒤에 더 크게 채우는 사람",
    caution: "내 뜻대로 안 되는 영역엔 너무 힘주지 않아도 돼",
    use: "방향 전환·재정비 시기에 오히려 기회가 와",
    myth: "‘하늘이 내린 살’이라지만, 사실은 비우고 다시 단단해지는 전환점이야",
  },
  지살: {
    alias: "개척러", stat: "이동", cat: "이동·변화", D: DoodleSprout,
    mean: "스스로 길을 내며 나아가는 개척의 기운",
    good: "새 환경·새 시작을 두려워 않는 추진력. 이사·이직·도전에 강해",
    caution: "벌여만 놓고 마무리를 놓치지 않게",
    use: "창업·해외·새 분야 개척에 잘 맞아",
  },
  년살: {
    alias: "타고난 매력러", stat: "매력", cat: "매력·인기", D: DoodleRose,
    mean: "어디서든 눈에 띄고 사람을 끌어당기는 매력 (도화의 결)",
    good: "첫인상·끼·인기. 사람들 시선이 자연스레 모여",
    caution: "관심이 많은 만큼 선 긋기도 필요해",
    use: "사람 대하는 일·무대·콘텐츠에서 빛나",
  },
  월살: {
    alias: "숨 고르기 타임", stat: "복", cat: "주의·전환", D: DoodleMoon,
    mean: "잠시 멈춰 안을 채우는 시기의 기운",
    good: "조급하지 않게 내실을 다지는 힘. 준비된 사람이 돼",
    caution: "메마른 느낌 들 땐 무리한 확장보다 충전 먼저",
    use: "공부·저축·기초 다지기에 잘 맞는 시기",
    myth: "‘마른 살’이라 불리지만, 사실은 숨 고르며 내실 다지는 시기야",
  },
  망신살: {
    alias: "거침없는 직진러", stat: "추진", cat: "권력·카리스마", D: DoodleSpeechBubble,
    mean: "솔직하고 과감하게 자기를 드러내는 기운",
    good: "꾸밈없는 매력과 추진력. 할 말 하고 할 일 해",
    caution: "감추는 게 약할 수 있어. 가끔은 한 박자 쉬어가도 돼",
    use: "표현·영업·도전적인 일에서 강해",
    myth: "‘망신 당할 살’ 같지만, 사실은 솔직하고 거침없는 과감함이야",
  },
  장성살: {
    alias: "타고난 대장", stat: "추진", cat: "권력·카리스마", D: DoodleCrown,
    mean: "사람을 이끌고 중심에 서는 우두머리 기운",
    good: "리더십·책임감·존재감. 자리를 맡으면 빛나",
    caution: "다 끌어안으려다 무거워지지 않게, 위임도 힘이야",
    use: "조직·관리·리더 자리에서 진가 발휘",
  },
  반안살: {
    alias: "차근차근 출세러", stat: "복", cat: "귀인·행운", D: DoodleHorseshoe,
    mean: "말 안장에 올라타듯 차근차근 자리를 잡는 안정의 기운",
    good: "꾸준히 올라타 결국 자리를 얻는 끈기. 승진·인정운",
    caution: "안정에 안주하면 멈출 수 있어, 한 계단씩 더",
    use: "조직 생활·장기전에서 빛나",
  },
  역마살: {
    alias: "타고난 방랑자", stat: "이동", cat: "이동·변화", D: DoodlePlane,
    mean: "이동·변화·넓은 세상을 즐기는 기운",
    good: "활동력·적응력·글로벌 감각. 가만히 있는 게 더 답답해",
    caution: "한곳에 못 붙어 산만해질 수 있어, 닻 하나는 두기",
    use: "여행·해외·영업·이동 많은 일에 천생",
    myth: "‘떠돌 살’이라지만, 사실은 넓은 세상을 누비는 활동력이야",
  },
  육해살: {
    alias: "진짜만 거르는 분별러", stat: "복", cat: "주의·전환", D: DoodleScissors,
    mean: "관계를 깊게 거르고 진짜를 남기는 분별의 기운",
    good: "사람 보는 눈·세심함. 곁에 진짜만 남겨",
    caution: "혼자 끙끙 앓지 말고 도움도 받기",
    use: "사람·건강을 세심히 챙기는 일에 강해",
    myth: "‘해로운 살’ 같지만, 사실은 진짜와 가짜를 거르는 분별력이야",
  },
  화개살: {
    alias: "예술혼·통찰러", stat: "재능", cat: "재능·예술", D: DoodleLotus,
    mean: "예술·영성·깊은 통찰의 결",
    good: "남다른 감성·집중력·재능. 혼자만의 깊이가 있어",
    caution: "혼자 가라앉기 쉬워, 세상과도 이어두기",
    use: "예술·연구·종교·전문 분야에서 빛나",
  },

  // ── 특수신살 — 귀인·복 ──────────────────────────────────
  천을귀인: {
    alias: "위기탈출 치트키", stat: "복", cat: "귀인·행운", D: DoodleCrane,
    mean: "어려울 때 귀인이 손 내미는 최고의 복",
    good: "곤란할 때 꼭 도움이 나타나. 사람 복·위기 모면운",
    caution: "복을 당연히 여기지 말고 감사·환원도 함께",
    use: "어떤 일이든 사람의 도움으로 풀려",
  },
  천덕귀인: {
    alias: "하늘의 우산", stat: "복", cat: "귀인·행운", D: DoodleStar,
    mean: "위기에 길이 열리는 하늘의 도움",
    good: "큰 고비에도 결국 길이 나는 보호막",
    caution: "운만 믿지 말고 노력도 함께면 더 커져",
    use: "위기·전환기에 든든한 뒷배",
  },
  월덕귀인: {
    alias: "음덕 적립러", stat: "복", cat: "귀인·행운", D: DoodleClover,
    mean: "주변의 음덕과 신뢰가 따르는 복",
    good: "보이지 않게 돕는 손·두터운 신뢰. 평판이 곧 자산",
    caution: "베푼 만큼 돌아오니 관계에 진심을",
    use: "신뢰가 중요한 일·장기 관계에서 빛나",
  },
  태극귀인: {
    alias: "반전의 통찰러", stat: "복", cat: "귀인·행운", D: DoodleTaegeuk,
    mean: "큰 그림을 보고 반전을 만드는 복",
    good: "통찰력·대기만성. 끝에 가서 빛나는 사람",
    caution: "조급함만 내려놓으면 더 크게 풀려",
    use: "철학·연구·큰 판을 보는 일에 강해",
  },
  문창귀인: {
    alias: "공부머리·필력러", stat: "재능", cat: "재능·예술", D: DoodlePencil,
    mean: "글·공부·표현이 빛나는 머리의 복",
    good: "학습력·시험운·글솜씨. 머리 쓰는 일에 강해",
    caution: "머리만 믿고 손 놓지 않기, 꾸준함도",
    use: "시험·연구·글·교육에 천생",
  },
  학당귀인: {
    alias: "가르치고 배우는 사람", stat: "재능", cat: "재능·예술", D: DoodleBook,
    mean: "배우고 가르치는 데 타고난 재능",
    good: "지식 흡수·전달력. 선생·멘토 기질",
    caution: "아는 걸 나눌수록 더 커져",
    use: "교육·강의·연구·전문직에 잘 맞아",
  },
  관귀학관: {
    alias: "실력으로 자리 얻는 사람", stat: "재능", cat: "재능·예술", D: DoodleMedal,
    mean: "실력으로 인정과 자리를 얻는 기운",
    good: "전문성·승진운. 실력이 곧 무기",
    caution: "실력만큼 관계도 챙기면 완성",
    use: "전문직·공직·자격 기반 일에 강해",
  },
  암록: {
    alias: "숨은 조력자", stat: "복", cat: "귀인·행운", D: DoodleFortunePouch,
    mean: "보이지 않는 곳에서 도움이 들어오는 숨은 복",
    good: "위기에 의외의 도움·뜻밖의 기회. 비상금 같은 운",
    caution: "기댈 곳이 있다고 방심은 금물",
    use: "사업·재물에서 든든한 안전망",
  },
  금여성: {
    alias: "꽃길·좋은인연러", stat: "복", cat: "귀인·행운", D: DoodleRing,
    mean: "안락과 좋은 인연이 따르는 복",
    good: "편안한 환경·좋은 배우자/파트너운. 품격 있는 매력",
    caution: "편함에 안주 말고 가꾸기",
    use: "결혼·파트너십·풍요로운 환경에 복",
  },
  정록: {
    alias: "먹을 복·안정러", stat: "복", cat: "귀인·행운", D: DoodleGoldBar,
    mean: "제 몫의 안정된 자리와 먹을 복",
    good: "꾸준한 수입·안정된 자리. 기본이 단단해",
    caution: "안정만 좇다 도전을 미루지 않기",
    use: "직장·전문직 등 꾸준한 일에 복",
  },

  // ── 특수신살 — 매력·강한 기운 ──────────────────────────────
  도화살: {
    alias: "매력 자석", stat: "매력", cat: "매력·인기", D: DoodleHeart,
    mean: "사람을 끌어당기는 타고난 매력",
    good: "인기·끼·이성운. 어딜 가나 분위기를 만들어",
    caution: "관심이 몰리는 만큼 중심 잡기",
    use: "연예·서비스·콘텐츠·영업에 강해",
    myth: "‘바람기 살’로 오해받지만, 사실은 사람을 끌어당기는 매력 그 자체야",
  },
  홍염살: {
    alias: "은은한 분위기러", stat: "매력", cat: "매력·인기", D: DoodleHibiscus,
    mean: "은은하게 번지는 분위기와 인기",
    good: "도화가 화려한 매력이면 홍염은 스며드는 매력. 묘한 끌림",
    caution: "은근한 인기가 오해 사지 않게 선은 분명히",
    use: "예술·분위기가 중요한 일에 잘 맞아",
  },
  괴강살: {
    alias: "카리스마 끝판왕", stat: "추진", cat: "권력·카리스마", D: DoodleFire,
    mean: "강렬한 카리스마와 추진력",
    good: "압도하는 존재감·결단력·리더십. 마음먹으면 끝장을 봐",
    caution: "기가 강해 부딪칠 수 있어, 부드러움 한 스푼",
    use: "리더·전문가·승부처에서 폭발해",
    myth: "‘드센 살’이라지만, 사실은 압도적인 카리스마와 추진력이야",
  },
  백호대살: {
    alias: "흰호랑이 에너지", stat: "추진", cat: "권력·카리스마", D: DoodleTiger,
    mean: "폭발적인 에너지와 강단",
    good: "강한 추진력·생존력·승부 근성. 위기에 더 강해져",
    caution: "에너지가 센 만큼 페이스 조절·건강 챙기기",
    use: "강한 추진력이 필요한 일·승부처에 강해",
    myth: "가장 무섭게 겁주는 살이지만, 사실은 폭발적인 에너지와 강단이야. 겁먹을 필요 전혀 없어",
  },
  현침살: {
    alias: "바늘 같은 집중러", stat: "재능", cat: "재능·예술", D: DoodleFeather,
    mean: "바늘처럼 예리한 집중력과 섬세함",
    good: "날카로운 분석력·손재주·디테일. 정밀한 일에 강해",
    caution: "예리함이 말로 나가면 따끔할 수 있어, 둥글게",
    use: "의료·기술·디자인·분석 등 정밀한 일에 천생",
    myth: "‘찌르는 살’ 같지만, 사실은 바늘처럼 예리한 집중력과 섬세함이야",
  },
}

// 시그니처 능력치 → 한 줄 밈 (공유용)
export const STAT_MEME: Record<SinsalStat, string> = {
  이동: "가만 못 있는 자유로운 영혼",
  매력: "어딜 가나 시선 강탈러",
  재능: "타고난 재주꾼",
  추진: "한번 가면 끝장 보는 불도저",
  복: "은근 운 좋은 럭키가이",
}

// 신살 시너지 — 능력치 축 2개가 함께 있을 때의 조합 캐릭터
export type Synergy = { a: SinsalStat; b: SinsalStat; alias: string; line: string }
export const SYNERGY: Synergy[] = [
  { a: "이동", b: "매력", alias: "어디서든 인기 많은 방랑자", line: "가는 곳마다 사람이 따라붙어 — 이동이 곧 인연을 불러." },
  { a: "이동", b: "재능", alias: "세상이 무대인 재주꾼", line: "넓은 곳에서 재능을 펼치는 사람 — 해외·확장에서 빛나." },
  { a: "이동", b: "추진", alias: "세상을 휘젓는 개척자", line: "넓은 무대에서 강하게 밀어붙이는 글로벌 승부사." },
  { a: "이동", b: "복", alias: "역마에 귀인까지", line: "어디로 가든 도와줄 사람이 생겨 — 이동운이 복이 돼." },
  { a: "매력", b: "재능", alias: "끼 부자 아티스트", line: "표현력에 매력까지 — 무대·콘텐츠 체질이야." },
  { a: "매력", b: "추진", alias: "휘어잡는 매력파", line: "끌어당기고 밀어붙이는 힘 — 사람 앞에 서는 일에 강해." },
  { a: "매력", b: "복", alias: "사랑받는 행운아", line: "매력에 사람 복까지 — 인연으로 일이 풀려." },
  { a: "재능", b: "추진", alias: "실력으로 관철하는 사람", line: "재능을 카리스마로 밀어붙여 — 전문가 리더감." },
  { a: "재능", b: "복", alias: "복받은 재주꾼", line: "재능에 귀인운까지 — 빛 볼 자리가 꼭 와." },
  { a: "추진", b: "복", alias: "운까지 따르는 승부사", line: "세게 가는데 귀인까지 — 위기를 기회로 바꿔." },
]

// 시그니처 선정 우선순위 (앞일수록 '대표 신살'로 뽑힘 — 희소·임팩트 순)
export const SIG_PRIORITY: string[] = [
  "천을귀인", "백호대살", "괴강살", "도화살", "화개살", "역마살", "장성살", "태극귀인",
  "홍염살", "문창귀인", "천덕귀인", "월덕귀인", "현침살", "금여성", "학당귀인", "관귀학관",
  "암록", "정록", "반안살", "겁살", "재살", "망신살", "지살", "년살", "육해살", "천살", "월살",
]
