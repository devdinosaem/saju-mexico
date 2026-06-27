"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import {
  DoodleSprout, DoodleFire, DoodleEarth, DoodleDiamond, DoodleWave,
  DoodleHeart, DoodleSparkle, DoodleCrown, DoodleStar,
  DoodleSpeechBubble, DoodlePencil, DoodlePolaroid,
  DoodleSuitcase, DoodleGoldBar, DoodleSmiley,
  DoodleMirror, DoodleLightning, DoodleTaegeuk, DoodleCompass, DoodleMedal,
  DoodleBackpack, DoodleBamboo, DoodlePottedPlant, DoodleRamen, DoodleMusicNote,
  DoodleColorPalette, DoodleOnggiJar, DoodlePictureFrame, DoodleCoffee, DoodleTicket,
} from "@/components/doodles"

/* ────────────────────────────────────────────────────────────
   그룹 궁합 펀널 — 목업 UI (INVITE-COMPAT-PLAN.md)
   랜딩 → 카카오 1초 입장(mock) → 사주 입력 → 대기 → 결과(고도화)
   ※ 백엔드/실제 궁합 계산 미연동. 모든 풀이는 오행 기반 mock.
   ※ 아이콘은 전부 두들 스티커 — <Ico> 고정 컨테이너로 일관 크기(줄 안 넘침).
──────────────────────────────────────────────────────────── */

type DoodleC = React.FC<{ className?: string }>
const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }

/** 두들 아이콘 — 고정 컨테이너(shrink-0, inline-flex)로 줄 높이/넘침 방지 */
function Ico({ as: D, size = 18 }: { as: DoodleC; size?: number }) {
  return (
    <span className="inline-flex items-center justify-center shrink-0 align-middle" style={{ width: size, height: size }}>
      <D className="w-full h-full" />
    </span>
  )
}

const ELEMS = ["목", "화", "토", "금", "수"] as const
type Elem = (typeof ELEMS)[number]

const ELEM_BG: Record<string, string> = { 목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE" }
const ELEM_COLOR: Record<string, string> = { 목: "#4ADE80", 화: "#F87171", 토: "#FBBF24", 금: "#94A3B8", 수: "#60A5FA" }
const ELEM_DOODLE: Record<Elem, DoodleC> = { 목: DoodleSprout, 화: DoodleFire, 토: DoodleEarth, 금: DoodleDiamond, 수: DoodleWave }
const STEM_TO_ELEM: Record<string, Elem> = { 갑: "목", 을: "목", 병: "화", 정: "화", 무: "토", 기: "토", 경: "금", 신: "금", 임: "수", 계: "수" }
const elemOf = (key: string): Elem => STEM_TO_ELEM[key[0]] ?? "토"

const ROLE: Record<Elem, { label: string; D: DoodleC }> = {
  목: { label: "기획자", D: DoodleSprout },
  화: { label: "분위기메이커", D: DoodleFire },
  토: { label: "든든한 중재자", D: DoodleEarth },
  금: { label: "팩폭 담당", D: DoodleDiamond },
  수: { label: "감성 케어", D: DoodleWave },
}
const ARCHETYPE_NAME: Record<Elem, string> = {
  목: "아이디어 뱅크 모임", 화: "추진력 만렙 불도저 모임", 토: "든든한 베이스캠프 모임",
  금: "칼같은 팩폭 모임", 수: "물 흐르듯 평화로운 모임",
}
// 부족 오행을 채우는 추천 활동 3가지
const ELEM_FILL: Record<Elem, { label: string; D: DoodleC }[]> = {
  목: [
    { label: "다 같이 등산 가기", D: DoodleBackpack },
    { label: "숲속 힐링 캠핑", D: DoodleBamboo },
    { label: "화분·식물 선물 교환", D: DoodlePottedPlant },
  ],
  화: [
    { label: "캠프파이어 불멍", D: DoodleFire },
    { label: "매운 음식 먹방", D: DoodleRamen },
    { label: "다 같이 노래방 직행", D: DoodleMusicNote },
  ],
  토: [
    { label: "도자기·공방 체험", D: DoodleColorPalette },
    { label: "집밥 한 상 모임", D: DoodleOnggiJar },
    { label: "캠핑으로 땅 밟기", D: DoodleEarth },
  ],
  금: [
    { label: "미술관·전시 관람", D: DoodlePictureFrame },
    { label: "호캉스로 리셋", D: DoodleSparkle },
    { label: "골프·사격 정밀 활동", D: DoodleDiamond },
  ],
  수: [
    { label: "바다·온천 여행", D: DoodleWave },
    { label: "카페에서 수다", D: DoodleCoffee },
    { label: "영화관 가기", D: DoodleTicket },
  ],
}
const SHENG: Record<Elem, Elem> = { 목: "화", 화: "토", 토: "금", 금: "수", 수: "목" }
const KE: Record<Elem, Elem> = { 목: "토", 토: "수", 수: "화", 화: "금", 금: "목" }

type Participant = { name: string; iljuKey: string; me?: boolean }

const CAPACITY = 4
const HOST: Participant = { name: "지수", iljuKey: "갑자-f" }
const DEMO_FILL: Participant[] = [
  { name: "민준", iljuKey: "병인-m" },
  { name: "하은", iljuKey: "계묘-f" },
]
const MY_MOCK_ILJU = "무인-m"

// ── mock 풀이 로직 (오행 기반) ──
function distOf(ps: Participant[]): Record<Elem, number> {
  const d: Record<Elem, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 }
  ps.forEach(p => { d[elemOf(p.iljuKey)]++ })
  return d
}
function dominantElem(d: Record<Elem, number>): Elem {
  return ELEMS.reduce((a, b) => (d[b] > d[a] ? b : a), "목")
}
function archetype(d: Record<Elem, number>): { name: string; D: DoodleC } {
  const present = ELEMS.filter(e => d[e] > 0).length
  if (present >= 4) return { name: "오행 풀세트 밸런스 모임", D: DoodleTaegeuk }
  const dom = dominantElem(d)
  return { name: ARCHETYPE_NAME[dom], D: ELEM_DOODLE[dom] }
}
function balanceLine(d: Record<Elem, number>): string {
  const over = dominantElem(d)
  const miss = ELEMS.filter(e => d[e] === 0)
  if (miss.length === 0) return "오행이 골고루 섞여 균형 잡힌 모임이에요. 서로 빈 곳을 채워줘요"
  return `${over}(${over}) 기운이 강하고 ${miss.map(m => `${m}(${m})`).join("·")} 기운이 비어요 → 추진력은 좋은데 ${miss.includes("수") ? "차분함" : miss.includes("금") ? "결단력" : "균형"}이 아쉬워요`
}
function pairScore(a: Participant, b: Participant): number {
  const ea = elemOf(a.iljuKey), eb = elemOf(b.iljuKey)
  if (ea === eb) return 72
  if (SHENG[ea] === eb || SHENG[eb] === ea) return 91
  if (KE[ea] === eb || KE[eb] === ea) return 56
  return 80
}
function pairLabel(a: Participant, b: Participant): { text: string; D: DoodleC } {
  const ea = elemOf(a.iljuKey), eb = elemOf(b.iljuKey)
  if (ea === eb) return { text: "닮은꼴", D: DoodleMirror }
  if (SHENG[ea] === eb || SHENG[eb] === ea) return { text: "찰떡 케미", D: DoodleFire }
  if (KE[ea] === eb || KE[eb] === ea) return { text: "티키타카", D: DoodleLightning }
  return { text: "무난한 사이", D: DoodleSmiley }
}
function allPairs(ps: Participant[]) {
  const out: { a: Participant; b: Participant; s: number; label: { text: string; D: DoodleC } }[] = []
  for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++)
    out.push({ a: ps[i], b: ps[j], s: pairScore(ps[i], ps[j]), label: pairLabel(ps[i], ps[j]) })
  return out.sort((x, y) => y.s - x.s)
}
const PERSONAL: Record<Elem, string> = {
  목: "아이디어는 네가 다 내. 근데 벌려놓고 마무리는 남 시킴 ㅋㅋ",
  화: "네가 빠지면 모임이 조용해져. 텐션 과할 땐 누가 좀 말려줘",
  토: "싸움 나면 네가 다 중재함. 정작 네 얘긴 안 하더라",
  금: "할 말은 하는 사이다. 가끔 너무 팩트라 따끔해",
  수: "분위기 다 읽고 챙김. 혼자 삭이다 골병 들지 마",
}
const clamp = (n: number) => Math.max(30, Math.min(98, Math.round(n)))
function situational(ps: Participant[], base: number): { key: string; D: DoodleC; score: number; line: string }[] {
  const d = distOf(ps)
  return [
    { key: "우정", D: DoodleSmiley, score: clamp(base + 8), line: "같이 노는 덴 최고. 단톡 평생 갈 듯" },
    { key: "연애", D: DoodleHeart, score: clamp(base - 10), line: "썸은 짜릿, 장기전은 노력 필요" },
    { key: "같이 일", D: DoodleSuitcase, score: clamp(base - 4 + (d.금 + d.토) * 3 - d.화 * 2), line: "추진은 빠른데 역할 분담이 관건" },
    { key: "같이 돈", D: DoodleGoldBar, score: clamp(base - 15 - d.화 * 2), line: "돈 얘긴 미리 정하고 시작해 ㅋㅋ" },
  ]
}
function overallScore(ps: Participant[]): number {
  if (ps.length < 2) return 0
  let sum = 0, n = 0
  for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) { sum += pairScore(ps[i], ps[j]); n++ }
  return Math.round(sum / n)
}
function vibeOf(score: number): { text: string; D: DoodleC } {
  if (score >= 88) return { text: "찰떡궁합", D: DoodleSparkle }
  if (score >= 80) return { text: "꽤 잘 맞아요", D: DoodleHeart }
  if (score >= 70) return { text: "티격태격 케미", D: DoodleLightning }
  return { text: "노력하면 됨", D: DoodleSprout }
}

function Avatar({ p, size = 56 }: { p: Participant; size?: number }) {
  return (
    <div className="rounded-full overflow-hidden border-2 border-charcoal/15 shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: ELEM_BG[elemOf(p.iljuKey)] }}>
      {ILJU_SVG_ICONS[p.iljuKey]?.(getIljuProfileViewBox(p.iljuKey))}
    </div>
  )
}
function EmptySlot({ size = 56 }: { size?: number }) {
  return (
    <div className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: "#F1F5F9", border: "2px dashed #CBD5E1" }}>
      <span className="text-[18px] text-charcoal/25">?</span>
    </div>
  )
}

type Step = "landing" | "input" | "waiting" | "result"

export default function CompatFunnelPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("landing")
  const [parts, setParts] = useState<Participant[]>([HOST])
  const [name, setName] = useState("")
  const [birth, setBirth] = useState({ y: "", m: "", d: "" })
  const [gender, setGender] = useState<"M" | "F" | null>(null)
  const [addAll, setAddAll] = useState(true)

  const filled = parts.length
  const slots = Array.from({ length: CAPACITY }, (_, i) => parts[i] ?? null)

  const submitMine = () => {
    if (!name.trim()) return
    setParts(prev => [...prev, { name: name.trim(), iljuKey: MY_MOCK_ILJU, me: true }])
    setStep("waiting")
  }
  const demoFillRest = () => {
    setParts(prev => [...prev, ...DEMO_FILL.slice(0, CAPACITY - prev.length)])
    setStep("result")
  }

  // ── 랜딩 (맛보기) ──
  if (step === "landing") {
    return (
      <div className="flex flex-col items-center gap-5 pt-6 text-center">
        <p className="text-[20px] text-charcoal flex items-center justify-center gap-1.5 flex-wrap" style={BINGGRAE}>
          <span className="highlight-pink">{HOST.name}</span>님이 궁합 보자고 초대했어요 <Ico as={DoodleSparkle} size={20} />
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="p-[3px] rounded-full" style={{ background: "linear-gradient(135deg, #E84B6A, #FBBF24)" }}>
            <Avatar p={HOST} size={84} />
          </div>
          <p className="text-[13px] text-text-muted flex items-center gap-1">{`${elemOf(HOST.iljuKey)} 기운`} <Ico as={ELEM_DOODLE[elemOf(HOST.iljuKey)]} size={14} /></p>
        </div>
        <div className="w-full rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col items-center gap-3">
          <p className="text-[14px] text-charcoal flex items-center gap-1.5" style={GAEGU}>4명이 모이면 우리 궁합이 나와요 <Ico as={DoodleHeart} size={16} /></p>
          <div className="flex gap-2.5">
            {slots.map((p, i) => (p ? <Avatar key={i} p={p} size={44} /> : <EmptySlot key={i} size={44} />))}
          </div>
          <p className="text-[12px] text-text-muted">{filled} / {CAPACITY} 참여 중</p>
        </div>
        <button onClick={() => setStep("input")}
          className="w-full h-[54px] rounded-2xl flex items-center justify-center gap-2 active:opacity-85 transition-opacity border-2 border-charcoal text-[15px]"
          style={{ background: "#FEE500", color: "#3C1E1E", ...BINGGRAE }}>
          <Ico as={DoodleSpeechBubble} size={20} /> 카카오로 1초 입장
        </button>
        <p className="text-[11px] text-text-muted">로그인하면 내 결과 저장 + 친구 맺기 가능</p>
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
                    ? { background: "#2D2D2D", color: "#FFF9F0", borderColor: "#2D2D2D" }
                    : { background: "white", color: "#94A3B8", borderColor: "#E0D4C0" }}>
                  {g === "M" ? "남" : "여"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={submitMine} disabled={!valid}
          className="w-full h-[54px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal disabled:opacity-30"
          style={{ background: "#2D2D2D", color: "#FFF9F0", ...BINGGRAE }}>
          입력 완료
        </button>
      </div>
    )
  }

  // ── 대기 ──
  if (step === "waiting") {
    return (
      <div className="flex flex-col items-center gap-5 pt-6 text-center">
        <Ico as={DoodleSparkle} size={32} />
        <p className="text-[20px] text-charcoal" style={BINGGRAE}>친구를 기다리는 중...</p>
        <p className="text-[14px] text-text-muted">{filled} / {CAPACITY} 명 입력 완료</p>
        <div className="w-full rounded-2xl bg-white border border-charcoal/10 px-4 py-5 flex flex-col gap-3">
          {slots.map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              {p ? <Avatar p={p} size={44} /> : <EmptySlot size={44} />}
              <span className="text-[14px] text-charcoal" style={GAEGU}>{p ? (p.me ? `${p.name} (나)` : p.name) : "입력 대기 중..."}</span>
            </div>
          ))}
        </div>
        <button onClick={demoFillRest}
          className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-charcoal/5 text-charcoal active:opacity-70 flex items-center justify-center gap-1.5" style={GAEGU}>
          <Ico as={DoodleStar} size={16} /> 데모: 나머지 친구 자동 입력
        </button>
      </div>
    )
  }

  // ── 결과 (고도화) ──
  const d = distOf(parts)
  const score = overallScore(parts)
  const arch = archetype(d)
  const vibe = vibeOf(score)
  const miss = ELEMS.filter(e => d[e] === 0)
  const maxCount = Math.max(...ELEMS.map(e => d[e]), 1)
  const others = parts.filter(p => !p.me)

  return (
    <div className="flex flex-col gap-6 pt-4 pb-10">
      {/* [1] 종합 % + 아키타입 */}
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-[15px] text-text-muted flex items-center gap-1.5" style={GAEGU}><Ico as={DoodleHeart} size={18} /> 우리 {parts.length}명의 궁합은</p>
        <p className="text-[64px] leading-none text-pink" style={BINGGRAE}>{score}%</p>
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}>{vibe.text} <Ico as={vibe.D} size={18} /></p>
        <div className="mt-1 px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#FFF4E0", border: "1.5px dashed #F0C060" }}>
          <Ico as={arch.D} size={16} /> <p className="text-[14px] text-[#9A7050]" style={BINGGRAE}>{arch.name}</p>
        </div>
      </div>

      {/* [2] 그룹 롤 배정 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleMedal} size={18} /> 우리 모임 역할</p>
        <div className="grid grid-cols-2 gap-2">
          {parts.map((p, i) => {
            const r = ROLE[elemOf(p.iljuKey)]
            return (
              <div key={i} className="flex items-center gap-2.5 rounded-2xl bg-white border border-charcoal/10 px-3 py-2.5">
                <Avatar p={p} size={40} />
                <div className="min-w-0">
                  <p className="text-[11px] text-text-muted truncate">{p.me ? "나" : p.name}</p>
                  <p className="text-[13px] font-bold text-charcoal leading-tight flex items-center gap-1"><Ico as={r.D} size={15} /> {r.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* [3] 오행 밸런스 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleTaegeuk} size={18} /> 우리 모임 오행 밸런스</p>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-2.5">
          {ELEMS.map(e => (
            <div key={e} className="flex items-center gap-2.5">
              <Ico as={ELEM_DOODLE[e]} size={16} />
              <span className="w-4 text-[12px] font-bold text-charcoal shrink-0">{e}</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${(d[e] / maxCount) * 100}%`, background: ELEM_COLOR[e] }} />
              </div>
              <span className="w-5 text-[11px] text-text-muted text-right shrink-0">{d[e]}</span>
            </div>
          ))}
          <p className="text-[12px] text-charcoal/70 leading-relaxed mt-1" style={GAEGU}>{balanceLine(d)}</p>
        </div>
      </div>

      {/* [4] 페어별 궁합 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleHeart} size={18} /> 페어별 궁합</p>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3 flex flex-col">
          {allPairs(parts).map((pr, i, arr) => (
            <div key={i} className={`flex items-center gap-2.5 py-2 ${i < arr.length - 1 ? "border-b border-charcoal/5" : ""}`}>
              <div className="flex -space-x-1.5 shrink-0"><Avatar p={pr.a} size={30} /><Avatar p={pr.b} size={30} /></div>
              <span className="text-[12px] text-charcoal/80 flex-1 min-w-0 truncate flex items-center gap-1">
                {pr.a.me ? "나" : pr.a.name} · {pr.b.me ? "나" : pr.b.name} <Ico as={pr.label.D} size={13} /> <span className="text-text-muted">{pr.label.text}</span>
              </span>
              <span className="text-[14px] font-bold shrink-0" style={{ color: pr.s >= 85 ? "#E84B6A" : pr.s >= 70 ? "#2D2D2D" : "#94A3B8" }}>{pr.s}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* [5] 개인별 한마디 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleSpeechBubble} size={18} /> 각자에게 한마디</p>
        <div className="flex flex-col gap-2">
          {parts.map((p, i) => (
            <div key={i} className="flex gap-2.5 rounded-2xl bg-white border border-charcoal/10 px-3 py-2.5">
              <Avatar p={p} size={36} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-charcoal">{p.me ? "나" : p.name} <span className="text-text-muted font-normal">· {ROLE[elemOf(p.iljuKey)].label}</span></p>
                <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{PERSONAL[elemOf(p.iljuKey)]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* [6] 상황별 궁합 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}><Ico as={DoodleCompass} size={18} /> 상황별 궁합</p>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
          {situational(parts, score).map(s => (
            <div key={s.key} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-charcoal flex items-center gap-1.5"><Ico as={s.D} size={16} /> {s.key}</span>
                <span className="text-[13px] font-bold" style={{ color: s.score >= 80 ? "#E84B6A" : "#2D2D2D" }}>{s.score}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: s.score >= 80 ? "#E84B6A" : s.score >= 65 ? "#FBBF24" : "#94A3B8" }} />
              </div>
              <p className="text-[11px] text-text-muted" style={GAEGU}>{s.line}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 부족 오행 → 채우는 활동 3가지 */}
      {miss.length > 0 && (
        <div className="rounded-2xl px-4 py-4 flex flex-col gap-3" style={{ background: ELEM_BG[miss[0]], border: `1.5px solid ${ELEM_COLOR[miss[0]]}` }}>
          <div className="flex items-center gap-2">
            <Ico as={ELEM_DOODLE[miss[0]]} size={22} />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-charcoal leading-tight">이 모임엔 {miss[0]}({miss[0]}) 기운이 없어요</p>
              <p className="text-[11px] text-charcoal/60">{miss[0]}({miss[0]}) 기운을 채우는 활동을 같이 해봐요</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {ELEM_FILL[miss[0]].map((a, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.7)" }}>
                <Ico as={a.D} size={18} />
                <span className="text-[13px] font-bold text-charcoal">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 전원 친구 추가 (기본 ON) */}
      <button onClick={() => setAddAll(v => !v)}
        className="w-full rounded-2xl px-4 py-3.5 flex items-center justify-between active:opacity-80 transition-opacity"
        style={{ background: addAll ? "#FFF4E0" : "#F1F5F9", border: `1.5px solid ${addAll ? "#F0C060" : "#E0D4C0"}` }}>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">{others.map((p, i) => <Avatar key={i} p={p} size={28} />)}</div>
          <span className="text-[13px] font-bold text-charcoal">전원 친구 추가</span>
        </div>
        <span className="w-11 h-6 rounded-full relative transition-colors shrink-0" style={{ background: addAll ? "#2D2D2D" : "#CBD5E1" }}>
          <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: addAll ? 22 : 2 }} />
        </span>
      </button>

      {/* 모임 길일 + 공유 */}
      <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3.5 flex items-center gap-3">
        <Ico as={DoodleCrown} size={24} />
        <div className="flex-1">
          <p className="text-[12px] text-text-muted">이 모임 다음 만나기 좋은 날</p>
          <p className="text-[14px] font-bold text-charcoal flex items-center gap-1">7월 12일 (토) · 화기운 충전 <Ico as={DoodleFire} size={14} /></p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button onClick={() => router.push("/v3/interior")}
          className="w-full h-[54px] rounded-2xl text-[15px] active:opacity-85 transition-opacity border-2 border-charcoal"
          style={{ background: "#E84B6A", color: "#FFF9F0", boxShadow: "2px 2px 0px #2D2D2D", ...BINGGRAE }}>
          {addAll ? "친구 추가하고 내 미니홈피로 →" : "내 미니홈피로 →"}
        </button>
        <button className="w-full h-[50px] rounded-2xl text-[14px] border-2 border-charcoal/15 bg-white text-charcoal active:opacity-70 flex items-center justify-center gap-1.5" style={GAEGU}>
          <Ico as={DoodlePolaroid} size={18} /> 결과 카드 단톡에 공유
        </button>
      </div>
    </div>
  )
}
