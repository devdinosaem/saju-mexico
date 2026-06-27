"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import {
  DoodleSprout, DoodleFire, DoodleEarth, DoodleDiamond, DoodleWave,
  DoodleHeart, DoodleSparkle, DoodleSpeechBubble, DoodlePencil, DoodlePolaroid,
  DoodleMirror, DoodleLightning, DoodleRing, DoodleCalendar, DoodleTaegeuk,
  DoodleBackpack, DoodleBamboo, DoodlePottedPlant, DoodleRamen, DoodleMusicNote,
  DoodleColorPalette, DoodleOnggiJar, DoodlePictureFrame, DoodleCoffee, DoodleTicket,
} from "@/components/doodles"

/* ────────────────────────────────────────────────────────────
   커플 궁합 펀널 — 목업 (이미 사귀는 커플, 링크로 같이 보기, 2명 고정, 무료)
   랜딩 → 카카오 1초 입장(mock) → 내 사주 입력 → 결과
   ※ 썸/짝사랑(혼자 둘 다 입력)은 별도 진입점·유료로 추후. 여기선 다루지 않음.
   ※ 백엔드/실제 궁합 계산 미연동. 오행 기반 mock. 아이콘은 두들 <Ico>.
──────────────────────────────────────────────────────────── */

type DoodleC = React.FC<{ className?: string }>
const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
const PINK = "#E84B6A"

function Ico({ as: D, size = 18 }: { as: DoodleC; size?: number }) {
  return (
    <span className="inline-flex items-center justify-center shrink-0 align-middle" style={{ width: size, height: size }}>
      <D className="w-full h-full" />
    </span>
  )
}

type Elem = "목" | "화" | "토" | "금" | "수"
const ELEM_BG: Record<string, string> = { 목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE" }
const ELEM_COLOR: Record<string, string> = { 목: "#4ADE80", 화: "#F87171", 토: "#FBBF24", 금: "#94A3B8", 수: "#60A5FA" }
const ELEM_DOODLE: Record<Elem, DoodleC> = { 목: DoodleSprout, 화: DoodleFire, 토: DoodleEarth, 금: DoodleDiamond, 수: DoodleWave }
const ELEMS: Elem[] = ["목", "화", "토", "금", "수"]
const STEM_TO_ELEM: Record<string, Elem> = { 갑: "목", 을: "목", 병: "화", 정: "화", 무: "토", 기: "토", 경: "금", 신: "금", 임: "수", 계: "수" }
const elemOf = (key: string): Elem => STEM_TO_ELEM[key[0]] ?? "토"

const SHENG: Record<Elem, Elem> = { 목: "화", 화: "토", 토: "금", 금: "수", 수: "목" }
const relType = (a: Elem, b: Elem): "same" | "sheng" | "ke" =>
  a === b ? "same" : SHENG[a] === b || SHENG[b] === a ? "sheng" : "ke"

// 오행 조합별 커플 타입 (상생/상극/동일)
const COUPLE: Record<string, { name: string; vibe: string; score: number; D: DoodleC }> = {
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
const SAME_COUPLE = { name: "닮은꼴 커플", vibe: "취향도 성격도 비슷해 편한데 새로움은 직접 챙겨야", score: 78, D: DoodleMirror }

const LOVE_STYLE: Record<Elem, { label: string; line: string }> = {
  목: { label: "성장형", line: "같이 발전하고 미래를 그리는 타입" },
  화: { label: "직진형", line: "좋으면 바로 표현, 불같이 사랑하는 타입" },
  토: { label: "안정형", line: "한결같고 든든하게 챙기는 타입" },
  금: { label: "쿨·솔직형", line: "깔끔하고 할 말은 하는 타입" },
  수: { label: "감성형", line: "깊고 섬세하게 마음을 읽는 타입" },
}

const FIT: Record<"same" | "sheng" | "ke", { good: string; care: string }> = {
  sheng: { good: "서로 부족한 걸 자연스럽게 채워줘요", care: "너무 편해서 설렘 이벤트를 깜빡할 수 있어요" },
  ke: { good: "정반대라 끌리고 절대 안 지루해요", care: "한 명이 가끔 져주지 않으면 기싸움이 길어져요" },
  same: { good: "말 안 해도 통하는 게 많아요", care: "비슷해서 둘 다 같은 실수를 해요" },
}
const REMEDY: Record<"same" | "sheng" | "ke", string[]> = {
  sheng: ["이미 잘 맞아요. 가끔 새로운 데이트로 설렘을 충전해요", "편한 만큼 표현은 줄지 않게 — 사소한 칭찬 자주"],
  ke: ["부딪힐 땐 차분한 쪽이 먼저 손 내밀기", "티격태격도 애정 표현 — 단, 선은 미리 정해두기"],
  same: ["둘 다 비슷해 편한 만큼 반대 성향과 어울려 환기", "같은 실수 반복 주의 — 한 명은 브레이크 역할"],
}
// 각자에게 한마디 (커플 맥락)
const COUPLE_PERSONAL: Record<Elem, string> = {
  목: "관계를 키우는 사람. 가끔 앞서가니 상대 속도도 맞춰줘",
  화: "표현이 확실해서 좋아. 욱할 땐 한 박자만 쉬어가자",
  토: "한결같이 챙기는 기둥. 네 마음도 가끔 표현해줘",
  금: "솔직해서 편한데, 말투에 다정 한 스푼이면 완벽",
  수: "분위기 다 읽고 맞춰주는 사람. 혼자 참지 말고 말해",
}
// 부족 오행을 채우는 데이트 3가지
const ELEM_FILL_C: Record<Elem, { label: string; D: DoodleC }[]> = {
  목: [{ label: "등산·식물원 데이트", D: DoodleBackpack }, { label: "숲길 산책", D: DoodleBamboo }, { label: "화분 같이 키우기", D: DoodlePottedPlant }],
  화: [{ label: "불멍 캠핑", D: DoodleFire }, { label: "매운맛 맛집 투어", D: DoodleRamen }, { label: "노래방 데이트", D: DoodleMusicNote }],
  토: [{ label: "도자기 공방 체험", D: DoodleColorPalette }, { label: "집밥 같이 해먹기", D: DoodleOnggiJar }, { label: "캠핑", D: DoodleEarth }],
  금: [{ label: "미술관·전시 관람", D: DoodlePictureFrame }, { label: "호캉스", D: DoodleSparkle }, { label: "드라이브", D: DoodleDiamond }],
  수: [{ label: "바다·온천 여행", D: DoodleWave }, { label: "카페 데이트", D: DoodleCoffee }, { label: "영화관", D: DoodleTicket }],
}
// mock 사주 오행 분포 (8자 가정, 일간 강조 + char 기반 분배)
function mockDist(key: string): Record<Elem, number> {
  const d: Record<Elem, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 }
  d[elemOf(key)] = 3
  const seed = key.charCodeAt(0) + (key.charCodeAt(1) || 0) * 7 + (key.charCodeAt(3) || 0) * 3
  let i = seed % 5, rest = 5
  while (rest > 0) { d[ELEMS[i % 5]]++; i += (seed % 3) + 1; rest-- }
  return d
}

const clamp = (n: number) => Math.max(40, Math.min(98, Math.round(n)))
function coupleSituational(base: number) {
  return [
    { key: "썸·설렘", D: DoodleSparkle, score: clamp(base + 4), line: "초반 텐션과 끌림이 좋아요" },
    { key: "안정·장기", D: DoodleHeart, score: clamp(base + 1), line: "오래 볼수록 편해지는 사이" },
    { key: "싸울 때 회복", D: DoodleSpeechBubble, score: clamp(base - 8), line: "대화로 풀면 금방 회복돼요" },
    { key: "미래·결혼", D: DoodleRing, score: clamp(base - 3), line: "방향만 맞추면 길게 가요" },
  ]
}

type P = { name: string; iljuKey: string; me?: boolean }
const HOST: P = { name: "지수", iljuKey: "갑자-f" }
const MY_MOCK_ILJU = "병오-m" // 화 → 호스트(목)와 목생화 = 불붙는 커플 데모

function coupleOf(a: P, b: P) {
  const ea = elemOf(a.iljuKey), eb = elemOf(b.iljuKey)
  if (ea === eb) return SAME_COUPLE
  const key = [ea, eb].sort().join("")
  return COUPLE[key] ?? SAME_COUPLE
}

function Avatar({ p, size = 72 }: { p: P; size?: number }) {
  return (
    <div className="rounded-full overflow-hidden border-2 border-charcoal/15 shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: ELEM_BG[elemOf(p.iljuKey)] }}>
      {ILJU_SVG_ICONS[p.iljuKey]?.(getIljuProfileViewBox(p.iljuKey))}
    </div>
  )
}

type Step = "landing" | "input" | "result"

export default function CoupleFunnelPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("landing")
  const [me, setMe] = useState<P | null>(null)
  const [name, setName] = useState("")
  const [birth, setBirth] = useState({ y: "", m: "", d: "" })
  const [gender, setGender] = useState<"M" | "F" | null>(null)
  const [befriend, setBefriend] = useState(true)

  const submit = () => {
    if (!name.trim()) return
    setMe({ name: name.trim(), iljuKey: MY_MOCK_ILJU, me: true })
    setStep("result")
  }

  // ── 랜딩 ──
  if (step === "landing") {
    return (
      <div className="flex flex-col items-center gap-5 pt-6 text-center">
        <p className="text-[20px] text-charcoal flex items-center justify-center gap-1.5 flex-wrap" style={BINGGRAE}>
          <span className="highlight-pink">{HOST.name}</span>님이 커플 궁합 보자고 했어요 <Ico as={DoodleHeart} size={20} />
        </p>
        <div className="flex items-center gap-3">
          <div className="p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
            <Avatar p={HOST} size={76} />
          </div>
          <Ico as={DoodleHeart} size={26} />
          <div className="rounded-full flex items-center justify-center" style={{ width: 82, height: 82, background: "#F1F5F9", border: "2px dashed #CBD5E1" }}>
            <span className="text-[26px] text-charcoal/25">?</span>
          </div>
        </div>
        <div className="w-full rounded-2xl bg-white border border-charcoal/10 px-4 py-4">
          <p className="text-[14px] text-charcoal flex items-center justify-center gap-1.5" style={GAEGU}>둘이 입력하면 우리 커플 궁합이 나와요 <Ico as={DoodleSparkle} size={16} /></p>
        </div>
        <button onClick={() => setStep("input")}
          className="w-full h-[54px] rounded-2xl flex items-center justify-center gap-2 active:opacity-85 transition-opacity border-2 border-charcoal text-[15px]"
          style={{ background: "#FEE500", color: "#3C1E1E", ...BINGGRAE }}>
          <Ico as={DoodleSpeechBubble} size={20} /> 카카오로 1초 입장
        </button>
      </div>
    )
  }

  // ── 사주 입력 ──
  if (step === "input") {
    const valid = name.trim() && birth.y.length === 4 && birth.m && birth.d && gender
    return (
      <div className="flex flex-col gap-5 pt-4">
        <p className="text-[20px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodlePencil} size={20} /> 내 사주 입력</p>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[12px] text-text-muted font-bold mb-1.5 block">이름</label>
            <input value={name} onChange={e => setName(e.target.value)} maxLength={10} placeholder="이름"
              className="w-full text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none"
              style={{ background: "#FFFDE8", border: "1.5px dashed #D4B870" }} />
          </div>
          <div>
            <label className="text-[12px] text-text-muted font-bold mb-1.5 block">생년월일</label>
            <div className="flex gap-2">
              <input value={birth.y} onChange={e => setBirth({ ...birth, y: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="1998" inputMode="numeric"
                className="flex-1 text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none text-center" style={{ background: "white", border: "1.5px solid #E0D4C0" }} />
              <input value={birth.m} onChange={e => setBirth({ ...birth, m: e.target.value.replace(/\D/g, "").slice(0, 2) })} placeholder="월" inputMode="numeric"
                className="w-16 text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none text-center" style={{ background: "white", border: "1.5px solid #E0D4C0" }} />
              <input value={birth.d} onChange={e => setBirth({ ...birth, d: e.target.value.replace(/\D/g, "").slice(0, 2) })} placeholder="일" inputMode="numeric"
                className="w-16 text-[15px] text-charcoal rounded-xl px-3 py-3 focus:outline-none text-center" style={{ background: "white", border: "1.5px solid #E0D4C0" }} />
            </div>
          </div>
          <div>
            <label className="text-[12px] text-text-muted font-bold mb-1.5 block">성별</label>
            <div className="flex gap-2">
              {(["M", "F"] as const).map(g => (
                <button key={g} onClick={() => setGender(g)}
                  className="flex-1 py-3 rounded-xl text-[14px] font-bold border-2 transition-colors"
                  style={gender === g
                    ? { background: PINK, color: "#FFF9F0", borderColor: PINK }
                    : { background: "white", color: "#94A3B8", borderColor: "#E0D4C0" }}>
                  {g === "M" ? "남" : "여"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={submit} disabled={!valid}
          className="w-full h-[54px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal disabled:opacity-30"
          style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
          입력 완료
        </button>
      </div>
    )
  }

  // ── 결과 ──
  const partner = me!
  const c = coupleOf(HOST, partner)
  const t = relType(elemOf(HOST.iljuKey), elemOf(partner.iljuKey))
  const fit = FIT[t]
  const eHost = elemOf(HOST.iljuKey), eMe = elemOf(partner.iljuKey)
  const hd = mockDist(HOST.iljuKey), md = mockDist(partner.iljuKey)
  const minElem = ELEMS.reduce((a, b) => (hd[b] + md[b] < hd[a] + md[a] ? b : a), "목" as Elem)

  return (
    <div className="flex flex-col gap-6 pt-4 pb-10">
      {/* 헤더 — 마주보기 + % */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <Avatar p={HOST} size={72} />
            <span className="text-[14px] font-bold text-charcoal">{HOST.name}</span>
            <span className="text-[14px] text-text-muted flex items-center gap-1">{eHost} <Ico as={ELEM_DOODLE[eHost]} size={13} /></span>
          </div>
          <div className="flex flex-col items-center">
            <Ico as={DoodleHeart} size={28} />
            <span className="text-[40px] leading-none text-pink" style={BINGGRAE}>{c.score}%</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar p={partner} size={72} />
            <span className="text-[14px] font-bold text-charcoal">나</span>
            <span className="text-[14px] text-text-muted flex items-center gap-1">{eMe} <Ico as={ELEM_DOODLE[eMe]} size={13} /></span>
          </div>
        </div>
        <div className="px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#FFF4E0", border: "1.5px dashed #F0C060" }}>
          <Ico as={c.D} size={16} /> <p className="text-[15px] text-[#9A7050]" style={BINGGRAE}>{c.name}</p>
        </div>
        <p className="text-[14px] text-charcoal/70 leading-relaxed" style={GAEGU}>{c.vibe}</p>
      </div>

      {/* 사주 오행 밸런스 — 좌 초대자 / 우 나, 각 오행 개수 비율로 분할 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleTaegeuk} size={18} /> 사주 오행 밸런스</p>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-end gap-3">
            <span className="flex items-center gap-1 text-[14px] text-charcoal/70"><span className="w-2.5 h-2.5 rounded-full" style={{ background: PINK }} />{HOST.name}</span>
            <span className="flex items-center gap-1 text-[14px] text-charcoal/70"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#60A5FA" }} />나</span>
          </div>
          {ELEMS.map(e => {
            const h = hd[e], m = md[e], tot = h + m
            return (
              <div key={e} className="flex items-center gap-2.5">
                <Ico as={ELEM_DOODLE[e]} size={16} />
                <span className="w-4 text-[14px] font-bold text-charcoal shrink-0">{e}</span>
                <div className="flex-1 h-3.5 rounded-full overflow-hidden flex" style={{ background: "#F1F5F9" }}>
                  <div style={{ width: `${tot ? (h / tot) * 100 : 0}%`, background: PINK }} />
                  <div style={{ width: `${tot ? (m / tot) * 100 : 0}%`, background: "#60A5FA" }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 연애 스타일 매칭 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleHeart} size={18} /> 연애 스타일</p>
        <div className="grid grid-cols-2 gap-2">
          {[HOST, partner].map((p, i) => {
            const ls = LOVE_STYLE[elemOf(p.iljuKey)]
            return (
              <div key={i} className="rounded-2xl bg-white border border-charcoal/10 px-3 py-3 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Avatar p={p} size={34} />
                  <span className="text-[14px] font-bold text-charcoal">{p.me ? "나" : p.name}</span>
                </div>
                <p className="text-[14px] font-bold" style={{ color: PINK }}>{ls.label}</p>
                <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{ls.line}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* 각자에게 한마디 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleSpeechBubble} size={18} /> 각자에게 한마디</p>
        <div className="flex flex-col gap-2">
          {[HOST, partner].map((p, i) => (
            <div key={i} className="flex gap-2.5 rounded-2xl bg-white border border-charcoal/10 px-3 py-2.5">
              <Avatar p={p} size={36} />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-charcoal">{p.me ? "나" : p.name} <span className="text-text-muted font-normal">· {LOVE_STYLE[elemOf(p.iljuKey)].label}</span></p>
                <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{COUPLE_PERSONAL[elemOf(p.iljuKey)]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 잘 맞는 점 / 조심할 점 */}
      <div className="grid grid-cols-1 gap-2">
        <div className="rounded-2xl px-4 py-3 flex items-start gap-2.5" style={{ background: "#F0FFF4", border: "1.5px solid #86EFAC" }}>
          <Ico as={DoodleHeart} size={18} />
          <div>
            <p className="text-[14px] font-bold text-charcoal">이런 점이 잘 맞아요</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{fit.good}</p>
          </div>
        </div>
        <div className="rounded-2xl px-4 py-3 flex items-start gap-2.5" style={{ background: "#FFF7ED", border: "1.5px solid #FDB877" }}>
          <Ico as={DoodleLightning} size={18} />
          <div>
            <p className="text-[14px] font-bold text-charcoal">이런 건 조심해요</p>
            <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{fit.care}</p>
          </div>
        </div>
      </div>

      {/* 연애 상황별 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleSparkle} size={18} /> 연애 상황별 궁합</p>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
          {coupleSituational(c.score).map(s => (
            <div key={s.key} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-charcoal flex items-center gap-1.5"><Ico as={s.D} size={16} /> {s.key}</span>
                <span className="text-[14px] font-bold" style={{ color: s.score >= 80 ? PINK : "#2D2D2D" }}>{s.score}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: s.score >= 80 ? PINK : s.score >= 65 ? "#FBBF24" : "#94A3B8" }} />
              </div>
              <p className="text-[14px] text-text-muted" style={GAEGU}>{s.line}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 우리 사이 처방전 (2개) */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleSpeechBubble} size={18} /> 우리 사이 처방전</p>
        <div className="rounded-2xl px-4 py-3.5 flex flex-col gap-2.5" style={{ background: "#FFF0F5", border: "1.5px solid #F9A8C4" }}>
          {REMEDY[t].map((r, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[14px] font-bold shrink-0" style={{ color: PINK }}>{i + 1}</span>
              <p className="text-[14px] text-charcoal/80 leading-snug" style={GAEGU}>{r}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 부족 오행 → 채우는 데이트 (가장 부족한 원소) */}
      <div className="rounded-2xl px-4 py-4 flex flex-col gap-3" style={{ background: ELEM_BG[minElem], border: `1.5px solid ${ELEM_COLOR[minElem]}` }}>
        <div className="flex items-center gap-2">
          <Ico as={ELEM_DOODLE[minElem]} size={22} />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-charcoal leading-tight">둘 사이에 {minElem}({minElem}) 기운이 부족해요</p>
            <p className="text-[14px] text-charcoal/60">{minElem}({minElem}) 기운을 채우는 데이트를 해봐요</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {ELEM_FILL_C[minElem].map((a, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.7)" }}>
              <Ico as={a.D} size={18} />
              <span className="text-[14px] font-bold text-charcoal">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 럭키 데이트 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5 flex items-center gap-3">
        <Ico as={DoodleCalendar} size={24} />
        <div className="flex-1">
          <p className="text-[14px] text-text-muted">둘에게 좋은 데이트 날</p>
          <p className="text-[14px] font-bold text-charcoal flex items-center gap-1">7월 12일 (토) · 불멍 데이트 <Ico as={DoodleFire} size={14} /></p>
        </div>
      </div>

      {/* 친구 맺기 (선택) */}
      <button onClick={() => setBefriend(v => !v)}
        className="w-full rounded-2xl px-4 py-3.5 flex items-center justify-between active:opacity-80 transition-opacity"
        style={{ background: befriend ? "#FFF4E0" : "#F1F5F9", border: `1.5px solid ${befriend ? "#F0C060" : "#E0D4C0"}` }}>
        <div className="flex items-center gap-2">
          <Avatar p={HOST} size={28} />
          <span className="text-[14px] font-bold text-charcoal">{HOST.name}님과 친구 맺기</span>
        </div>
        <span className="w-11 h-6 rounded-full relative transition-colors shrink-0" style={{ background: befriend ? "#2D2D2D" : "#CBD5E1" }}>
          <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: befriend ? 22 : 2 }} />
        </span>
      </button>

      <div className="flex flex-col gap-2">
        <button onClick={() => router.push("/v3/interior")}
          className="w-full h-[54px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal"
          style={{ background: PINK, color: "#FFF9F0", boxShadow: "2px 2px 0px #2D2D2D", ...BINGGRAE }}>
          내 미니홈피로 →
        </button>
        <button className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-white text-charcoal active:opacity-70 flex items-center justify-center gap-1.5" style={GAEGU}>
          <Ico as={DoodlePolaroid} size={18} /> 커플 결과 카드 공유
        </button>
      </div>
    </div>
  )
}
