"use client"
import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { PRICES, WON_PER_MYONGTAE } from "@/lib/prices"
import { useBalance, spend, refund, CONSULT_COST } from "@/lib/balance"
import { loadHistory, saveHistory } from "@/lib/consult-history"
import { getSummaryCache, setSummaryCache, windowMessages } from "@/lib/consult-context"
import { DoodleBox, DoodleSparkle, DoodleHeart, DoodleSuitcase, DoodleCrystal, DoodleMagicWand, DoodleStar, DoodleMoon } from "@/components/doodles"
import { useUser, DEFAULT_PROFILE_IMG } from "@/lib/UserContext"
import type { IljuType } from "@/lib/ilju-types"
import type { MockUser } from "@/lib/mockAuth"
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN } from "manseryeok"
import type { GanZhi } from "manseryeok"
import {
  calculateMajorFortunes, calculateYearlyFortunes,
  analyzeTenGods, analyzeYongShin, analyzeRelations, calculateSamjae,
  TEN_GOD_KOREAN, STRENGTH_KOREAN,
} from "saju-engine"

// ── 사주 컨텍스트 빌더 ────────────────────────────────────────────
const EL_KO: Record<string, string> = {
  wood: "목(木)", fire: "화(火)", earth: "토(土)", metal: "금(金)", water: "수(水)",
}

function gzStr(gz: GanZhi) {
  return `${STEM_KOREAN[gz.stem]}${BRANCH_KOREAN[gz.branch]}`
}

function to24h(hour: string, ampm: "AM" | "PM"): number {
  const h = parseInt(hour)
  if (ampm === "AM") return h === 12 ? 0 : h
  return h === 12 ? 12 : h + 12
}

function buildSajuContext(user: MockUser, ilju: IljuType): string {
  const bd = user.birthDate
  if (!bd) return ""

  const year = parseInt(bd.year), month = parseInt(bd.month), day = parseInt(bd.day)
  // 출생 시간 미상/이상이면 hour가 NaN이 되어 시주가 undefined → analyzeTenGods 크래시.
  // 정오(12시)로 추정 계산해 크래시를 막고, 컨텍스트에 "시주 추정" 경고를 남긴다.
  let hour = to24h(bd.hour, bd.ampm), minute = parseInt(bd.minute)
  const hasTime = Number.isFinite(hour)
  if (!hasTime) hour = 12
  if (!Number.isFinite(minute)) minute = 0
  const gender = bd.gender === "M" ? "male" as const : "female" as const
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()
  const currentAge = currentYear - year + 1

  const saju = calculateSaju({ year, month, day, hour, minute })
  const { fourPillars: fp, fiveElements, dayMaster } = saju

  const majorResult = calculateMajorFortunes(fp.month, fp.year.stem, gender, year, month, day, dayMaster.stem, 8)
  const currentMajorIdx = majorResult.fortunes.findIndex((f, i) => {
    const next = majorResult.fortunes[i + 1]
    return f.startAge <= currentAge && (!next || next.startAge > currentAge)
  })

  const yearlyFortunes = calculateYearlyFortunes(year, dayMaster.stem, currentYear - 1, currentYear + 1)
  const yThis = yearlyFortunes.find(f => f.year === currentYear)
  const yNext = yearlyFortunes.find(f => f.year === currentYear + 1)
  const yLast = yearlyFortunes.find(f => f.year === currentYear - 1)
  const tenGods = analyzeTenGods(fp, dayMaster.stem)
  const yongShin = analyzeYongShin(dayMaster.stem, fp, fiveElements, tenGods.count)
  const relations = analyzeRelations(fp)
  const samjae = calculateSamjae(fp, currentYear)

  return [
    `# ${bd.name}님 사주`,
    `생년월일: ${year}년 ${month}월 ${day}일 ${bd.ampm === "AM" ? "오전" : "오후"} ${bd.hour}시 ${bd.minute}분`,
    `성별: ${bd.gender === "M" ? "남성" : "여성"} / 현재 나이: ${currentAge}세`,
    ...(hasTime ? [] : [`⚠️ 출생 시간 미상 — 시주(時)는 정오 기준 추정값이야. 시간·시주 기반 해석은 단정하지 말 것.`]),
    ``,
    `## ⏰ 시간 기준 (반드시 이걸 따라라 — 다른 해를 올해로 착각 금지)`,
    `오늘은 ${currentYear}년 ${currentMonth}월 ${currentDay}일이야.`,
    `올해 = ${currentYear}년${yThis ? `(${gzStr(yThis.ganZhi)}년)` : ""} / 내년 = ${currentYear + 1}년${yNext ? `(${gzStr(yNext.ganZhi)}년)` : ""} / 작년 = ${currentYear - 1}년${yLast ? `(${gzStr(yLast.ganZhi)}년)` : ""}`,
    `"올해"·"지금"이라고 말할 땐 무조건 ${currentYear}년 기준이야. ${currentYear - 1}년을 올해로 말하면 안 돼.`,
    ``,
    `## 사주 원국`,
    `년주: ${gzStr(fp.year)} / 월주: ${gzStr(fp.month)} / 일주: ${gzStr(fp.day)} / 시주: ${gzStr(fp.hour)}`,
    ``,
    `## 일간`,
    `${dayMaster.stem}(${STEM_KOREAN[dayMaster.stem]}) / ${EL_KO[dayMaster.element]} / ${dayMaster.yinYang === "yang" ? "양" : "음"}`,
    `신강신약: ${STRENGTH_KOREAN[yongShin.strength.level]} / 득령: ${yongShin.strength.deukryeong ? "있음" : "없음"} / 득지: ${yongShin.strength.deukji ? "있음" : "없음"}`,
    ``,
    `## 오행 분포`,
    `목 ${fiveElements.wood} / 화 ${fiveElements.fire} / 토 ${fiveElements.earth} / 금 ${fiveElements.metal} / 수 ${fiveElements.water}`,
    ``,
    `## 용신/기신`,
    `용신: ${EL_KO[yongShin.yongShin]} / 기신: ${EL_KO[yongShin.giShin]} (${yongShin.yongShinCategory})`,
    ``,
    `## 십신 구성`,
    tenGods.entries.map(e => `${e.position}(${e.char}): ${TEN_GOD_KOREAN[e.tenGod]}`).join(", "),
    ``,
    `## 합충형파해`,
    relations.relations.length > 0
      ? relations.relations.map(r => `${r.type}: ${r.chars.join("+")}(${r.positions.join(",")}) - ${r.description}`).join(" / ")
      : "없음",
    ``,
    `## 삼재`,
    samjae.isSamjae ? `현재 삼재 중 (${samjae.type})` : "삼재 없음",
    ``,
    `## 대운 (${majorResult.direction === "forward" ? "순행" : "역행"}, ${majorResult.startAge}세 시작)`,
    ...majorResult.fortunes.slice(0, 7).map((f, i) =>
      `${f.startAge}~${f.startAge + 9}세: ${gzStr(f.ganZhi)} [${TEN_GOD_KOREAN[f.stemTenGod]}/${TEN_GOD_KOREAN[f.branchTenGod]}]${i === currentMajorIdx ? " ← 현재" : ""}`
    ),
    ``,
    `## 세운`,
    ...yearlyFortunes.map(f => {
      const rel = f.year === currentYear ? "올해, " : f.year === currentYear + 1 ? "내년, " : f.year === currentYear - 1 ? "작년, " : ""
      return `${f.year}년(${rel}${f.age}세): ${gzStr(f.ganZhi)} [${TEN_GOD_KOREAN[f.stemTenGod]}/${TEN_GOD_KOREAN[f.branchTenGod]}]`
    }),
    ``,
    `## 일주 캐릭터`,
    `${ilju.ilju}(${ilju.hanja}) / "${ilju.name}" / 강점: ${ilju.strengths.join(", ")} / 약점: ${ilju.weaknesses.join(", ")}`,
    `성격: ${ilju.description}`,
  ].join("\n")
}

const ELEM_BG: Record<string, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE",
}

type Msg = { role: "user" | "char" | "system"; text: string; transient?: boolean }

const ERROR_TEXT = "잠시 후 다시 시도해줘."
const INITIAL_VISIBLE = 12 // 약 6턴
const LOAD_BATCH = 12      // 최상단 도달 시 추가로 불러올 메시지 수

const TOPICS = [
  { label: "직접 입력", Icon: DoodleMagicWand },
  { label: "연애",     Icon: DoodleHeart    },
  { label: "직장",     Icon: DoodleSuitcase },
  { label: "재물",     Icon: DoodleCrystal  },
  { label: "기일 잡기", Icon: DoodleStar     },
  { label: "운세",     Icon: DoodleMoon     },
]

const DAYS_KO = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]

// 일주 카드가 없을 때 보여줄 안내 (캐릭터는 DEFAULT_PROFILE_IMG 사용)
const GUIDE_TEXT_NO_ILJU =
  "안녕! 나는 네 사주 속에 살게 될 캐릭터야.\n\n" +
  "근데 아직 네가 누군지 몰라서, 지금은 제대로 된 얘기를 못 해주겠어. 아래에서 사주카드를 뽑으면 나는 너만의 캐릭터로 바뀌고, 그때부터 네 사주를 보면서 진짜 네 얘기를 들려줄게.\n\n" +
  "먼저 카드부터 뽑고 올래?"

function generateGreeting(firstName: string, ilju: IljuType, day: string, timeLabel: string): string {
  const lastCode = firstName.charCodeAt(firstName.length - 1)
  const hasBatchim = lastCode >= 0xAC00 && lastCode <= 0xD7A3 && (lastCode - 0xAC00) % 28 !== 0
  const nc = firstName + (hasBatchim ? "아" : "야")
  const il = ilju.ilju

  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  const openers: Record<string, string[]> = {
    새벽: [
      `${nc}, ${day} 새벽까지 안 잤구나.`,
      `${nc}, ${day} 새벽이야.`,
      `${nc}, 새벽에 여기 왔네.`,
      `${nc}, 이렇게 늦은 새벽에 뭐 하고 있었어.`,
      `${nc}, 새벽에 안 자고 있었구나.`,
    ],
    아침: [
      `${nc}, ${day} 아침이야.`,
      `${nc}, 이른 아침부터 왔네.`,
      `${nc}, ${day} 아침에 왔구나.`,
      `${nc}, 아침부터 여기 왔어?`,
      `${nc}, 아침이네.`,
    ],
    점심: [
      `${nc}, ${day} 점심이야.`,
      `${nc}, 점심 시간에 왔네.`,
      `${nc}, 점심에 왔구나.`,
      `${nc}, 벌써 점심이야.`,
    ],
    오후: [
      `${nc}, ${day} 오후야.`,
      `${nc}, 오후에 왔구나.`,
      `${nc}, 오후네.`,
      `${nc}, 오후에 여기 왔어?`,
    ],
    저녁: [
      `${nc}, ${day} 저녁이야.`,
      `${nc}, 저녁에 왔네.`,
      `${nc}, ${day} 저녁에 왔구나.`,
      `${nc}, 저녁이네.`,
      `${nc}, 하루 마무리할 시간이야.`,
    ],
    밤: [
      `${nc}, ${day} 밤이야.`,
      `${nc}, 밤에 여기 왔구나.`,
      `${nc}, 밤까지 깨어 있었구나.`,
      `${nc}, 밤이 됐네.`,
      `${nc}, 늦은 밤에 왔어.`,
    ],
  }

  const intros: string[] = [
    `나는 너 사주에서 나온 캐릭터야, 네 ${il} 일주에 깃들어 있어 — 가까운 친구처럼 편하게 말해줘.`,
    `있잖아, 나는 너와 같은 ${il} 일주의 캐릭터야, 네 사주 속에 살고 있어.`,
    `나는 네 ${il} 일주에서 나온 캐릭터야, 너의 가장 가까운 친구처럼 얘기하자.`,
    `나는 너 사주에서 나온 캐릭터야, 네 ${il} 일주에 깃들어 있어.`,
    `있잖아, 나는 너 사주에서 나온 캐릭터야 — 너 사주인 ${il}일주거든.`,
    `너 사주 속 ${il} 일주에서 나왔어, 나는. 그냥 친구처럼 편하게 얘기해.`,
    `나는 네 사주 ${il} 일주에서 나온 캐릭터야, 뭐든 편하게 꺼내도 돼.`,
    `있잖아, 나 네 ${il} 일주에서 나온 캐릭터거든. 편하게 얘기하자.`,
  ]

  const questions: Record<string, string[]> = {
    새벽: [
      `이 시간에 뭐 생각하고 있었어?`,
      `새벽에 머릿속에 맴도는 거 있어?`,
      `이 시간에 뭐 하고 있었어?`,
      `잠이 안 와?`,
      `새벽까지 깨어 있는 이유가 있어?`,
    ],
    아침: [
      `아침부터 생각나는 거 있어?`,
      `오늘 어떻게 시작됐어?`,
      `오늘 어떤 하루가 될 것 같아?`,
      `요즘 어떻게 지내?`,
    ],
    점심: [
      `오전은 어떻게 흘렀어?`,
      `오늘 어때?`,
      `요즘 뭐 있어?`,
      `점심 시간에 생각나는 거 있어?`,
    ],
    오후: [
      `오후에 어때?`,
      `오늘 어떻게 지내고 있어?`,
      `요즘 어때?`,
      `머릿속에 뭐 있어?`,
    ],
    저녁: [
      `오늘 어떻게 지냈어?`,
      `저녁이 되니까 생각나는 거 있어?`,
      `오늘 하루 어땠어?`,
      `요즘 어때, 뭐 있어?`,
    ],
    밤: [
      `밤에 뭐 생각하고 있었어?`,
      `요즘 어때, 뭐 있어?`,
      `밤이 되니까 머릿속에 맴도는 거 있어?`,
      `오늘 어떻게 지냈어?`,
    ],
  }

  const offers: string[] = [
    "고민 있으면 알려줘, 네 사주 보면서 같이 얘기해줄게.",
    "고민이나 궁금한 거 있으면 말해줘, 네 사주 기반으로 같이 풀어볼 수 있어.",
    "고민 있으면 알려줘, 사주랑 연결해서 봐줄게.",
    "궁금한 거 있으면 얘기해줘, 네 사주 보면서 같이 짚어줄 수 있어.",
    "고민 있으면 말해줘, 네 사주 기반으로 풀어줄게.",
    "있으면 말해줘, 사주 보면서 같이 생각해볼 수 있어.",
    "고민이 있으면 얘기해줘, 네 사주랑 연결해서 같이 들여다볼게.",
    "있으면 알려줘, 네 사주 보면서 풀어줄 수 있어.",
    "고민이나 궁금한 거 있으면 얘기해줘, 사주 보면서 같이 짚어보자.",
    "걸리는 게 있으면 말해줘도 돼, 사주 기반으로 같이 봐줄게.",
  ]

  const tl = timeLabel in openers ? timeLabel : "밤"
  const part1 = `${pick(openers[tl])} ${pick(intros)}`
  const part2 = `${pick(questions[tl])} ${pick(offers)}`
  return `${part1}\n\n\n${part2}`
}

// 한자 → 한글 독음 (사주 도메인은 독음이 고정)
const HANJA_MAP: Record<string, string> = {
  // 천간
  甲: "갑", 乙: "을", 丙: "병", 丁: "정", 戊: "무", 己: "기", 庚: "경", 辛: "신", 壬: "임", 癸: "계",
  // 지지
  子: "자", 丑: "축", 寅: "인", 卯: "묘", 辰: "진", 巳: "사", 午: "오", 未: "미", 申: "신", 酉: "유", 戌: "술", 亥: "해",
  // 오행·음양
  木: "목", 火: "화", 土: "토", 金: "금", 水: "수", 陰: "음", 陽: "양",
  // 자주 새는 사주 용어
  大: "대", 運: "운", 歲: "세", 合: "합", 沖: "충", 刑: "형", 破: "파", 害: "해",
  用: "용", 忌: "기", 神: "신", 財: "재", 官: "관", 印: "인", 食: "식", 傷: "상", 比: "비", 劫: "겁", 殺: "살",
}


// 정규식 리터럴 한자는 소스 인코딩에 따라 불안정 → codePoint 숫자로만 판정 (인코딩 무관)
function isHanjaCp(cp: number): boolean {
  return (cp >= 0x3400 && cp <= 0x9fff) || (cp >= 0xf900 && cp <= 0xfaff) || cp === 0x3005
}
// 일본어 가나(히라가나 3040-309f, 가타카나 30a0-30ff, 반각가나 ff66-ff9d) — DeepSeek가 가끔 새 흘림(らしい 등)
function isKanaCp(cp: number): boolean {
  return (cp >= 0x3040 && cp <= 0x30ff) || (cp >= 0xff66 && cp <= 0xff9d)
}

// AI 출력의 외국 문자를 출력단에서 제거 — 프롬프트 금지로도 새는 한자/가나를 확실히 차단
function stripHanjaSafe(text: string): string {
  const chars = [...text]
  let out = ""
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i]
    // "(漢字…)" 괄호 안이 한자뿐이면 통째 제거: 경진(庚辰) → 경진
    if (ch === "(") {
      let j = i + 1
      while (j < chars.length && isHanjaCp(chars[j].codePointAt(0)!)) j++
      if (j > i + 1 && chars[j] === ")") { i = j; continue }
    }
    const cp = ch.codePointAt(0)!
    if (isHanjaCp(cp)) { out += HANJA_MAP[ch] ?? ""; continue } // 한자: 독음 변환, 없으면 제거
    if (isKanaCp(cp)) continue                                  // 일본어 가나: 제거
    out += ch
  }
  return out
}

// 하드 욕설 차단 — 페르소나는 어떤 경우에도 욕 안 함. 프롬프트로도 새면 출력단에서 제거.
// 오탐(년/시발/졸라/미친/병신(丙申)/보지/자지/꺼져/닥쳐 등)은 제외, 복합·명백 욕설만.
const PROFANITY_RE = new RegExp(
  [
    "씨발년", "씨발놈", "씨발", "씨바", "씨불", "시발놈", "시발년",
    "개새끼", "개색기", "개세끼", "개자식", "개놈",
    "좆같", "좆나", "좆밥", "좆까", "존나", "존만",
    "개지랄", "지랄",
    "븅신", "빙신", "등신",
    "미친새끼", "미친놈", "미친년",
    "쌍놈", "쌍년", "썅",
    "니애미", "니애비", "니미", "호로자식", "후레자식", "후레아들",
    "엿같", "엿먹어",
    "잠지", "창녀", "걸레년", "화냥년",
    "(?<!전)염병",                                // 전염병 제외
    "(?:이|그|저|나쁜|이런|미친|씨발)\\s*새끼",   // 새끼는 욕 맥락만 (강아지 새끼 제외)
    // C등급 — 오탐어를 lookahead로 좁혀 욕일 때만 차단
    "시발(?![점역지])",                           // 시발! 차단, 시발점/역/지 유지
    "졸라(?!매)",                                 // 졸라 짜증 차단, 졸라매다 유지
    "병신(?=아|같|짓|새끼|이야|이네)",            // 병신아 차단, 병신년(丙申)/병신 대운 유지
    "[이그저]년아",                               // 이년아/그년아 차단, 2년 유지
  ].join("|"),
  "g",
)
function maskProfanity(text: string): string {
  return text.replace(PROFANITY_RE, "").replace(/ {2,}/g, " ")
}

function renderInline(text: string): React.ReactNode[] {
  return maskProfanity(stripHanjaSafe(text)).split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{part}</React.Fragment>
  )
}

// ── 채팅 화면 ───────────────────────────────────────────────────────
export default function ConsultPage() {
  const router = useRouter()
  const { hasIlju, ilju, user } = useUser()
  const balance = useBalance()
  const [input, setInput]            = useState("")
  const [msgs, setMsgs]              = useState<Msg[]>([{ role: "char", text: "" }])
  const [selectedTopic, setSelected]  = useState<string | null>(null)
  const [customMood, setCustomMood]   = useState("")
  const [showModal, setShowModal]     = useState(false)
  const [modalDraft, setModalDraft]   = useState("")
  const [kbHeight, setKbHeight]       = useState(0)
  const [headerH, setHeaderH]         = useState(0)
  const [navH, setNavH]               = useState(64)
  const [isLoading, setIsLoading]     = useState(false)
  const [summary, setSummary]         = useState("") // 재접속 요약(전송 컨텍스트용)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
  const [showScrollDown, setShowScrollDown] = useState(false) // 맨 아래로 플로팅
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const pendingScrollAnchor = useRef<number | null>(null) // 위로 더 불러올 때 스크롤 보정용
  const wantScrollBottom = useRef(false)                  // 복원/전송 시 하단으로
  const resumedKeyRef = useRef("")                        // 재접속 요약 중복 생성 방지(StrictMode 등)
  const abortRef = useRef<AbortController | null>(null)   // 생성 중단용
  const lastChipTap = useRef<{ label: string; t: number }>({ label: "", t: 0 }) // 토픽 더블탭 해제

  const elemKey = ilju?.stemElement.charAt(0) ?? "목"
  const iljuKey = ilju?.id ?? ""
  // 일주 있으면 해당 캐릭터, 없으면 회색 기본 캐릭터 이미지
  const renderAvatar = () =>
    ilju
      ? ILJU_SVG_ICONS[iljuKey]?.(getIljuProfileViewBox(iljuKey))
      : <img src={DEFAULT_PROFILE_IMG} alt="" className="w-full h-full object-cover" />
  // 아바타 배경: 일주 있으면 오행색, 없으면 서비스 연분홍(--pink-light)
  const avatarBg = ilju ? ELEM_BG[elemKey] : "#FFE4EA"

  // 표시는 최근 visibleCount개만(나머지는 위로 스크롤 시 로드). key는 절대 인덱스로 안정화
  const visibleStart = Math.max(0, msgs.length - visibleCount)
  const visibleMsgs = msgs.slice(visibleStart)
  const hasMore = visibleStart > 0

  // 사주 컨텍스트는 고정 → 매 전송 재계산 방지(메모). DeepSeek prompt caching 활용
  const sajuContext = React.useMemo(
    () => (ilju && user.birthDate ? buildSajuContext(user, ilju) : ""),
    [iljuKey, user.birthDate], // eslint-disable-line react-hooks/exhaustive-deps
  )
  const headerName = ilju ? `${ilju.ilju}(${ilju.hanja}) · 나` : "사주 친구"
  const headerLabel = ilju ? (ilju.name ?? "") : "사주카드를 뽑으면 시작돼"

  // 게이팅: 일주 카드 없음(card) > 잔액 부족(charge) > 정상(null)
  const gate: "card" | "charge" | null =
    !hasIlju ? "card" : (balance < CONSULT_COST - 1e-9 ? "charge" : null)
  const hasStarted = msgs.some(m => m.role === "user") // 대화 시작 여부(충전 플로팅 문구 분기)

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    const el = e.target
    el.style.height = "auto"
    el.style.height = Math.min(el.scrollHeight, 104) + "px"
  }

  // 모바일 키보드 높이 추적(모달 + 메인 입력바 공용)
  React.useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    const update = () => setKbHeight(Math.max(0, window.innerHeight - vv.offsetTop - vv.height))
    vv.addEventListener("resize", update)
    vv.addEventListener("scroll", update)
    update()
    return () => { vv.removeEventListener("resize", update); vv.removeEventListener("scroll", update) }
  }, [])

  React.useEffect(() => {
    if (!headerRef.current) return
    const ro = new ResizeObserver(() => setHeaderH(headerRef.current?.offsetHeight ?? 0))
    ro.observe(headerRef.current)
    setHeaderH(headerRef.current.offsetHeight)
    return () => ro.disconnect()
  }, [hasIlju])

  // 입력바를 하단 내비게이터에 정확히 붙이기 위해 내비 높이 측정
  React.useEffect(() => {
    const nav = document.querySelector("nav")
    if (!nav) return
    const ro = new ResizeObserver(() => setNavH(nav.offsetHeight))
    ro.observe(nav)
    setNavH(nav.offsetHeight)
    return () => ro.disconnect()
  }, [])

  React.useEffect(() => {
    if (!hasIlju || !ilju || !user.birthDate) {
      // 일주 카드 없음 → 디폴트 캐릭터 안내 (잠금화면 대신)
      if (!hasIlju) setMsgs([{ role: "char", text: GUIDE_TEXT_NO_ILJU }])
      return
    }
    setVisibleCount(INITIAL_VISIBLE)
    // 저장된 이력 있으면 복원(하단으로), 없으면 그리팅
    const saved = loadHistory(iljuKey)
    if (saved?.length) {
      setMsgs(saved as Msg[])
      wantScrollBottom.current = true
      void resumeWithSummary(iljuKey, saved as Msg[]) // 재접속 → 요약+이어받는 그리팅
      return
    }
    const name = user.birthDate.name
    const firstName = name.length >= 3 ? name.slice(1) : name
    const now = new Date()
    const day = DAYS_KO[now.getDay()]
    const h = now.getHours()
    const timeLabel =
      h < 6  ? "새벽" : h < 11 ? "아침" :
      h < 14 ? "점심" : h < 18 ? "오후" :
      h < 22 ? "저녁" : "밤"
    setMsgs([{ role: "char", text: generateGreeting(firstName, ilju, day, timeLabel) }])
  }, [hasIlju, iljuKey])

  // 대화 저장 — 스트리밍 중·그리팅만일 때 제외, 빈 char·에러버블 제외
  React.useEffect(() => {
    if (!iljuKey || isLoading) return
    if (!msgs.some(m => m.role === "user")) return
    saveHistory(iljuKey, msgs.filter(m => !m.transient && !(m.role === "char" && (m.text === "" || m.text === ERROR_TEXT))))
  }, [msgs, isLoading, iljuKey])

  // 페이지네이션(최상단 로드) + 맨아래 플로팅 노출 판정
  React.useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < headerH + 60 && visibleCount < msgs.length) {
        pendingScrollAnchor.current = document.documentElement.scrollHeight
        setVisibleCount(c => Math.min(msgs.length, c + LOAD_BATCH))
      }
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160
      setShowScrollDown(!nearBottom)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [headerH, visibleCount, msgs.length])

  // 이전 배치 로드 후 스크롤 위치 보정(점프 방지)
  React.useLayoutEffect(() => {
    if (pendingScrollAnchor.current != null) {
      window.scrollBy(0, document.documentElement.scrollHeight - pendingScrollAnchor.current)
      pendingScrollAnchor.current = null
    }
  }, [visibleCount])

  // 복원·전송 시 하단으로
  React.useLayoutEffect(() => {
    if (wantScrollBottom.current) {
      window.scrollTo(0, document.documentElement.scrollHeight)
      wantScrollBottom.current = false
    }
  }, [msgs])

  async function send() {
    if (!input.trim() || isLoading || !ilju) return
    if (!spend(CONSULT_COST)) { router.push("/v3/charge"); return } // 잔액 부족 → 충전(게이팅으로 도달 안 하지만 안전)
    const userText = input.trim()
    setInput("")
    if (inputRef.current) { inputRef.current.style.height = "auto" }

    const nextMsgs: Msg[] = [...msgs, { role: "user", text: userText }]
    setMsgs([...nextMsgs, { role: "char", text: "" }])
    wantScrollBottom.current = true // 보낸 직후 하단으로
    setIsLoading(true)

    const controller = new AbortController()
    abortRef.current = controller
    let acc = "" // 받은 답변 누적 — 중단 시 빈 답 여부 판정

    try {
      // 전송 컨텍스트 = 요약 + 최근 N메시지(윈도우). 표시(전체 이력)와 독립
      const apiMessages = windowMessages(
        nextMsgs
          .filter(m => m.role !== "system")
          .map(m => ({ role: m.role === "char" ? "assistant" as const : "user" as const, content: m.text }))
      )

      const topic = selectedTopic === "직접 입력" ? customMood || null : selectedTopic

      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, sajuContext, topic, summary }),
        signal: controller.signal,
      })
      if (!res.ok || !res.body) throw new Error()

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buf = ""

      await new Promise(r => setTimeout(r, 500))

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        const lines = buf.split("\n")
        buf = lines.pop() ?? ""
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const data = line.slice(6)
          if (data === "[DONE]") break
          try {
            const chunk = JSON.parse(data).choices?.[0]?.delta?.content ?? ""
            for (const char of chunk) {
              await new Promise(r => setTimeout(r, 15))
              acc += char
              setMsgs(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: "char", text: updated[updated.length - 1].text + char }
                return updated
              })
            }
          } catch {}
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // 사용자가 중단 — 받은 부분은 유지. 빈 답이면 환불 + 빈 거품 제거
        if (acc === "") {
          refund(CONSULT_COST)
          setMsgs(prev => prev.slice(0, -1))
        }
      } else {
        console.error("[consult] send 실패:", err)
        refund(CONSULT_COST) // 응답 실패 → 차감분 환불
        setMsgs(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: "char", text: ERROR_TEXT }
          return updated
        })
      }
    } finally {
      abortRef.current = null
      setIsLoading(false)
    }
  }

  function stopGen() {
    abortRef.current?.abort()
  }

  // 재접속: 지난 대화 요약 + 이어받는 그리팅 (캐시 유효하면 재사용, 아니면 생성)
  async function resumeWithSummary(id: string, saved: Msg[]) {
    const marker = `${id}:${saved.length}`
    if (resumedKeyRef.current === marker) return // 같은 상태로 이미 재접속 처리됨 → 중복 방지
    resumedKeyRef.current = marker
    const apiMsgs = saved
      .filter(m => m.role !== "system")
      .map(m => ({ role: m.role === "char" ? "assistant" as const : "user" as const, content: m.text }))
    if (!apiMsgs.length) return

    const cache = getSummaryCache(id)
    if (cache && cache.basedOnLen === saved.length && cache.greeting) {
      setSummary(cache.summary)
      setMsgs(m => [...m, { role: "char", text: cache.greeting, transient: true }])
      wantScrollBottom.current = true
      return
    }
    // 생성 — 타이핑 점부터
    setMsgs(m => [...m, { role: "char", text: "", transient: true }])
    wantScrollBottom.current = true
    try {
      const res = await fetch("/api/consult/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sajuContext, messages: apiMsgs }),
      })
      if (!res.ok) throw new Error()
      const { summary: sm, greeting } = await res.json() as { summary: string; greeting: string }
      if (!greeting) throw new Error("empty")
      setSummary(sm ?? "")
      setSummaryCache(id, { summary: sm ?? "", greeting, basedOnLen: saved.length })
      setMsgs(m => {
        const u = [...m]
        for (let i = u.length - 1; i >= 0; i--) {
          if (u[i].transient) { u[i] = { role: "char", text: greeting, transient: true }; break }
        }
        return u
      })
      wantScrollBottom.current = true
    } catch {
      // 실패 → 이어받기 인사 생략(복원된 대화만 유지)
      setMsgs(m => m.filter(x => !x.transient))
    }
  }

  function handleChip(label: string) {
    const now = Date.now()
    const isDouble = lastChipTap.current.label === label && now - lastChipTap.current.t < 400
    lastChipTap.current = { label, t: now }

    // 선택된 칩을 더블탭 → 해제(일반 모드 복귀)
    if (selectedTopic === label && isDouble) {
      setSelected(null)
      if (label === "직접 입력") setCustomMood("")
      setMsgs(m => [...m, { role: "system", text: "일반 상담 모드로 돌아왔어" }])
      return
    }
    if (label === "직접 입력") {
      setModalDraft(customMood)
      setShowModal(true)
      return
    }
    if (selectedTopic === label) return // 이미 선택된 칩 단일 탭 — 무시(더블탭 대기)
    setSelected(label)
    setMsgs(m => [...m, { role: "system", text: `${label} 상담 모드` }])
  }

  function applyCustom() {
    const trimmed = modalDraft.trim()
    if (trimmed) {
      setCustomMood(trimmed)
      setSelected("직접 입력")
      setMsgs(m => [...m, { role: "system", text: `"${trimmed}" 상담 모드` }])
    }
    setShowModal(false)
  }

  function chipLabel(label: string) {
    if (label === "직접 입력" && customMood && selectedTopic === "직접 입력") {
      return customMood.length > 8 ? customMood.slice(0, 8) + "…" : customMood
    }
    return label
  }

  return (
    <>
      {/* 프로필 + 칩 — fixed (입력바와 동일 방식) */}
      <div ref={headerRef} className="fixed top-12 left-0 right-0 z-40 bg-cream border-b border-charcoal/10">
        <div className="max-w-[480px] mx-auto px-4 pt-4">
          {/* 캐릭터 헤더 */}
          <div className="flex items-center gap-3 pb-3">
            <div
              className="w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-charcoal/15 shrink-0"
              style={{ background: avatarBg }}
            >
              {renderAvatar()}
            </div>
            <div>
              <p className="text-[15px] font-bold text-charcoal">{headerName}</p>
              <p className="text-[11px] text-text-muted">{headerLabel}</p>
            </div>
            {hasIlju && (
              <button
                onClick={() => router.push("/v3/charge")}
                className="ml-auto flex flex-col items-end gap-0.5 bg-charcoal/5 rounded-xl px-2.5 py-1 shrink-0 active:opacity-70 transition-opacity"
              >
                <span className="text-[11px] font-bold text-charcoal">잔액 {balance}명태</span>
                <span className="text-[9px] text-text-muted">1회 {PRICES.aiConsultPerTurn}명태({Math.round(PRICES.aiConsultPerTurn * WON_PER_MYONGTAE)}원)</span>
              </button>
            )}
          </div>
          {/* 주제 칩 */}
          <div className="flex gap-2 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
            {TOPICS.map(t => {
              const active = selectedTopic === t.label
              return (
                <button
                  key={t.label}
                  onClick={() => handleChip(t.label)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium shrink-0 active:scale-95 transition-all border ${
                    active
                      ? "bg-pink/10 border-pink text-pink font-bold"
                      : "bg-white border-charcoal/15 text-charcoal"
                  }`}
                >
                  <DoodleBox className="w-3.5 h-3.5"><t.Icon /></DoodleBox>
                  {chipLabel(t.label)}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 메시지 목록 — 고정 헤더/입력바 높이만큼 패딩 */}
      <div className="flex flex-col gap-3 pb-32" style={{ paddingTop: headerH + 16 }}>
        {hasMore && (
          <div className="flex justify-center py-1 text-[11px] text-text-muted/60">⋯ 위로 올리면 이전 대화</div>
        )}
        {visibleMsgs.map((msg, i) =>
          msg.role === "system" ? (
            <div key={visibleStart + i} className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-charcoal/10" />
              <span className="text-[11px] text-text-muted shrink-0">{msg.text}</span>
              <div className="flex-1 h-px bg-charcoal/10" />
            </div>
          ) : msg.role === "char" ? (
            <div key={visibleStart + i} className="flex items-end gap-2">
              <div
                className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-charcoal/10"
                style={{ background: avatarBg }}
              >
                {renderAvatar()}
              </div>
              <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-white border border-charcoal/10 px-3.5 py-2.5">
                {msg.text
                  ? <div className="flex flex-col gap-2">
                      {msg.text.split("\n\n").map((para, pi) =>
                        para.trim() ? <p key={pi} className="text-[13px] text-charcoal leading-relaxed whitespace-pre-line">{renderInline(para.trim())}</p> : null
                      )}
                    </div>
                  : <span className="flex gap-1 items-center h-5"><span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-bounce [animation-delay:0ms]" /><span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-bounce [animation-delay:150ms]" /><span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-bounce [animation-delay:300ms]" /></span>
                }
              </div>
            </div>
          ) : (
            <div key={visibleStart + i} className="flex justify-end">
              <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-pink/15 border border-pink/20 px-3.5 py-2.5">
                <p className="text-[13px] text-charcoal leading-relaxed">{msg.text}</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* 입력바 — 키보드 올라오면 그 위로, 아니면 내비 위 */}
      <div className="fixed left-0 right-0 z-40 bg-cream border-t border-charcoal/10" style={{ bottom: kbHeight > 0 ? kbHeight : navH }}>
        {/* 게이팅 플로팅: 카드 없음 → 카드 뽑기 / 잔액 부족 → 충전 */}
        {gate && (
          <div className="absolute bottom-full left-0 right-0 flex justify-center pb-3 px-4 pointer-events-none">
            <button
              onClick={() => router.push(gate === "card" ? "/v3/shop" : "/v3/charge")}
              className="pointer-events-auto max-w-[480px] px-5 py-3 rounded-full bg-pink text-cream text-[13px] font-bold border-2 border-charcoal shadow-lg active:scale-95 transition-transform"
            >
              {gate === "card"
                ? "내 사주카드 뽑기 →"
                : `명태 충전하고 ${hasStarted ? "이어가기" : "대화 시작하기"} →`}
            </button>
          </div>
        )}
        {/* 맨 아래로 스크롤 플로팅 (위로 올려둔 상태에서만) */}
        {showScrollDown && !gate && (
          <button
            onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
            aria-label="맨 아래로"
            className="absolute bottom-full right-4 mb-3 w-9 h-9 rounded-full bg-white border-2 border-charcoal/15 shadow-md flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="text-[15px] leading-none text-charcoal">↓</span>
          </button>
        )}
        <div className="max-w-[480px] mx-auto px-4 py-2.5 flex items-center gap-2">
          <div className="relative flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder={!gate ? "고민을 털어놔봐..." : gate === "card" ? "사주카드를 뽑으면 대화할 수 있어" : "명태를 충전하면 대화할 수 있어"}
              rows={1}
              maxLength={500}
              disabled={!!gate}
              style={{ maxHeight: "104px", resize: "none" }}
              className={`w-full bg-white border border-charcoal/15 rounded-xl pl-3.5 pr-14 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal/30 outline-none focus:border-pink/50 transition-all overflow-y-auto leading-relaxed ${gate ? "opacity-40 pointer-events-none" : ""}`}
            />
            <span className={`absolute top-1/2 -translate-y-1/2 right-3 text-[10px] pointer-events-none ${input.length >= 450 ? "text-pink font-bold" : "text-charcoal/30"}`}>
              {input.length}/500
            </span>
          </div>
          <button
            onClick={isLoading ? stopGen : send}
            disabled={isLoading ? false : (!input.trim() || !!gate)}
            aria-label={isLoading ? "생성 중단" : "전송"}
            className="w-10 h-10 rounded-xl bg-pink flex items-center justify-center shrink-0 active:opacity-80 disabled:opacity-30 transition-opacity"
          >
            {isLoading
              ? <span className="block w-3 h-3 rounded-[2px] bg-cream" />
              : <span className="text-cream text-[16px] leading-none">→</span>}
          </button>
        </div>
      </div>

      {/* 직접 입력 — 바텀시트 */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-[480px] bg-cream rounded-t-3xl border-t-2 border-x-2 border-charcoal"
            onClick={e => e.stopPropagation()}
            style={{ paddingBottom: `max(1.5rem, ${kbHeight}px)` }}
          >
            <div className="w-10 h-1 rounded-full bg-charcoal/20 mx-auto mt-3 mb-1" />
            <div className="px-5 pt-3 pb-2 flex flex-col gap-4">
              <p className="text-[17px] font-bold text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif" }}>
                어떤 걸 상담받고 싶어?
              </p>
              <textarea
                autoFocus
                value={modalDraft}
                onChange={e => setModalDraft(e.target.value)}
                placeholder="ex) 사업, 이사, 건강, 인간관계..."
                rows={3}
                inputMode="text"
                className="w-full bg-white border border-charcoal/15 rounded-xl px-3.5 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal/30 outline-none focus:border-pink/50 transition-colors resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border border-charcoal/15 text-[13px] font-medium text-text-muted active:opacity-70 transition-opacity"
                >
                  취소
                </button>
                <button
                  onClick={applyCustom}
                  disabled={!modalDraft.trim()}
                  className="flex-1 py-3 rounded-xl bg-pink text-cream text-[13px] font-bold active:opacity-80 disabled:opacity-30 transition-opacity"
                >
                  적용 →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
