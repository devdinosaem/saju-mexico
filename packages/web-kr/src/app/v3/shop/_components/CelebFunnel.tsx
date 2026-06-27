"use client"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useUser, DEFAULT_PROFILE_IMG } from "@/lib/UserContext"
import { calcIlju, ELEMENT_THEME } from "@/lib/ilju-calc"
import { calcSajuPillars, calcElementDistribution } from "@/lib/calcSaju"
import { isBirthDateComplete, type MockBirthDate } from "@/lib/mockAuth"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { ILJU_CELEB_DATA } from "@/lib/ilju-celeb-data"
import SajuInputSheet from "./SajuInputSheet"
import { CelebMarquee } from "./CelebDiscovery"
import CTAButton from "@/components/cta-button"
import {
  DoodleWood, DoodleFlameFive, DoodleEarth, DoodleMetal, DoodleWater, DoodleSun,
} from "@/components/doodles"

const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }

const ELEMENTS = ["목(木)", "화(火)", "토(土)", "금(金)", "수(水)"] as const
const ELEM_COLOR: Record<string, string> = {
  "목(木)": "#4ADE80", "화(火)": "#F87171", "토(土)": "#FBBF24", "금(金)": "#94A3B8", "수(水)": "#60A5FA",
}
const ELEM_DOODLE: Record<string, React.FC<{ className?: string }>> = {
  "목(木)": DoodleWood, "화(火)": DoodleFlameFive, "토(土)": DoodleEarth, "금(金)": DoodleMetal, "수(水)": DoodleWater,
}
const ELEM_SHORT: Record<string, string> = {
  "목(木)": "목", "화(火)": "화", "토(土)": "토", "금(金)": "금", "수(水)": "수",
}
const ELEM_BG: Record<string, string> = {
  "목(木)": "#D1FAE5", "화(火)": "#FEE2E2", "토(土)": "#FEF3C7", "금(金)": "#F1F5F9", "수(水)": "#DBEAFE",
}
const ELEM_STICKER: Record<string, React.ReactNode> = {
  "목(木)": <DoodleWood className="w-6 h-6" />,
  "화(火)": <DoodleFlameFive className="w-6 h-6" />,
  "토(土)": <DoodleEarth className="w-6 h-6" />,
  "금(金)": <DoodleMetal className="w-6 h-6" />,
  "수(水)": <DoodleWater className="w-6 h-6" />,
}

// 카테고리 → 오행 / 이모지
const CAT_ELEM: Record<string, string> = {
  "기업인": "금(金)", "정치인": "토(土)", "배우": "화(火)",
  "스포츠": "목(木)", "위인": "토(土)", "가수": "화(火)",
  "왕족": "금(金)", "노벨상": "수(水)",
}
const CAT_EMOJI: Record<string, string> = {
  "기업인": "💼", "정치인": "🏛️", "배우": "🎬",
  "스포츠": "🏆", "위인": "✨", "가수": "🎤",
  "왕족": "👑", "노벨상": "🔬",
}

const CARD_TILTS = [-6, 1, 5]
const CARD_MT    = [0, 16, 4]

// ── 오행 분석 ──
const GENERATES: Record<string, string> = {
  "목(木)": "화(火)", "화(火)": "토(土)", "토(土)": "금(金)", "금(金)": "수(水)", "수(水)": "목(木)",
}
const CONTROLS: Record<string, string> = {
  "목(木)": "토(土)", "화(火)": "금(金)", "토(土)": "수(水)", "금(金)": "목(木)", "수(水)": "화(火)",
}
const HAS_JONG: Record<string, boolean> = {
  "목(木)": true, "화(火)": false, "토(土)": false, "금(金)": true, "수(水)": false,
}
const ig = (e: string) => HAS_JONG[e] ? "이" : "가"

const ELEM_DESC: Record<string, { strength: string; caution: string }> = {
  "목(木)": { strength: "새로운 걸 먼저 시작하고 밀어붙이는 힘이 있어요", caution: "마무리와 집중력을 함께 챙기면 완성도가 올라가요" },
  "화(火)": { strength: "어디서든 분위기를 만들고 에너지를 퍼뜨려요",      caution: "지속력과 내실을 기르면 더 큰 불꽃이 돼요" },
  "토(土)": { strength: "맡은 건 반드시 해내는 든든함이 있어요",           caution: "변화에 유연하게 반응하면 더 멀리 가요" },
  "금(金)": { strength: "핵심을 꿰뚫고 불필요한 걸 걷어내는 능력이 있어요", caution: "유연함을 더하면 관계와 기회가 넓어져요" },
  "수(水)": { strength: "깊이 보는 눈과 유연한 적응력이 있어요",           caution: "생각을 행동으로 옮기는 연습이 큰 차이를 만들어요" },
}
const LACKING_ADVICE: Record<string, string> = {
  "목(木)": "새로운 도전에 먼저 손 내밀어보는 것",
  "화(火)": "생각과 감정을 밖으로 표현하는 것",
  "토(土)": "구체적인 계획을 세우고 하나씩 실행하는 루틴",
  "금(金)": "중요한 것에 집중하고 나머지는 내려놓는 것",
  "수(水)": "직관을 믿고 깊이 생각하는 시간을 갖는 것",
}

function genOhaengAnalysis(
  dist: Record<string, number>,
  stemElem: string,
  name: string
): { headline: string; body: string } {
  const sorted = (Object.entries(dist) as [string, number][]).sort((a, b) => b[1] - a[1])
  const [topElem, topScore] = sorted[0]
  const [bottomElem, bottomScore] = sorted[sorted.length - 1]
  const desc = ELEM_DESC[topElem]

  if (topScore < 33) {
    return {
      headline: "오행이 균형 잡혀 있어요",
      body: `특정 기운이 튀지 않고 고르게 분포됐어요. 어떤 상황에서도 유연하게 녹아드는 힘이 있어요. 일간인 ${stemElem} 기운이 중심을 잡아주면서, 상황에 따라 다양한 강점이 자연스럽게 나와요.`,
    }
  }

  let stemCtx = ""
  if (topElem === stemElem) {
    stemCtx = `이게 바로 ${name}의 핵심 에너지예요.`
  } else if (GENERATES[topElem] === stemElem) {
    stemCtx = `이 기운이 일간인 ${stemElem}${ig(stemElem)} 직접 키워주고 있어요.`
  } else if (CONTROLS[topElem] === stemElem) {
    stemCtx = `이 기운이 일간인 ${stemElem}${ig(stemElem)} 견제하는 구조예요. 내 중심을 잡는 게 특히 중요해요.`
  } else if (GENERATES[stemElem] === topElem) {
    stemCtx = `일간인 ${stemElem}이 이 기운을 만들어내고 있어요. 에너지를 많이 쓰는 만큼 회복도 챙겨야 해요.`
  } else if (CONTROLS[stemElem] === topElem) {
    stemCtx = `일간인 ${stemElem}이 이 기운을 다스리는 구조예요. 주도성이 자연스럽게 발휘돼요.`
  }

  return {
    headline: `${ELEM_SHORT[topElem]}(${topScore}%)이 지배적이에요`,
    body: `${desc?.strength ?? ""}. ${stemCtx} ${bottomElem}${ig(bottomElem)} ${bottomScore}%로 가장 적으니, ${LACKING_ADVICE[bottomElem] ?? "균형을 맞추는 것"}이 큰 도움이 될 수 있어요.`,
  }
}

type Step = "target" | "preview" | "result"

export default function CelebFunnel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const { user, ilju: registeredIlju, hasIlju } = useUser()
  const [step, setStep] = useState<Step>("target")
  const [target, setTarget] = useState<"me" | "other" | null>(null)
  const [birthData, setBirthData] = useState<MockBirthDate | null>(null)
  const [showInput, setShowInput] = useState(false)

  const bd = birthData ?? (target === "me" ? user.birthDate : null)

  const pillars = bd
    ? calcSajuPillars(bd.year, bd.month, bd.day, bd.hour || "", bd.minute || "", bd.ampm)
    : null
  const elementDist = pillars ? calcElementDistribution(pillars) : null

  const ilju = bd ? calcIlju(bd.year, bd.month, bd.day, bd.gender) : null
  const theme = ilju ? (ELEMENT_THEME[ilju.stemElement] ?? ELEMENT_THEME["목(木)"]) : ELEMENT_THEME["목(木)"]
  const displayName = bd?.name ?? "나"

  // 일주별 유명인 데이터
  const celebInfo = ilju ? (ILJU_CELEB_DATA[ilju.ilju] ?? null) : null

  function handleTargetSelect(t: "me" | "other") {
    setTarget(t)
    if (t === "me" && user.birthDate && isBirthDateComplete(user.birthDate)) {
      setStep("preview")
    } else {
      setShowInput(true)
    }
  }

  function handleClose() {
    setStep("target")
    setTarget(null)
    setBirthData(null)
    setShowInput(false)
    onClose()
  }

  if (!open || !mounted) return null

  const isResult = step === "result"

  // 결과 카드에 쓸 persons (최대 3)
  const resultPersons = celebInfo?.persons?.slice(0, 3) ?? []
  // 잠김 카드용 티저: 첫 번째 카테고리만 힌트
  const teaserCat = celebInfo?.topCat ?? "유명인"

  return createPortal(
    <>
      {/* ── Step 1: 대상 선택 ── */}
      {step === "target" && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center" onClick={handleClose}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-[480px] bg-cream rounded-t-3xl border-t-2 border-x-2 border-charcoal"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-charcoal/20 mx-auto mt-3 mb-1" />
            <div className="px-5 pt-2 pb-10 flex flex-col gap-4">
              <p className="text-[19px] font-bold text-charcoal" style={BINGGRAE}>
                누구 사주가 궁금해?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleTargetSelect("me")}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-charcoal/10 bg-white active:scale-95 transition-transform"
                  style={{ boxShadow: "2px 2px 0 rgba(45,45,45,0.08)" }}
                >
                  <div
                    className="w-16 h-16 rounded-full overflow-hidden flex items-end justify-center border-2 border-charcoal/10"
                    style={{
                      background: hasIlju && registeredIlju
                        ? `radial-gradient(ellipse at 50% 80%, white 0%, ${ELEMENT_THEME[registeredIlju.stemElement]?.bg ?? "#F1F5F9"} 100%)`
                        : "#F1F5F9",
                    }}
                  >
                    {hasIlju && registeredIlju && ILJU_SVG_ICONS[registeredIlju.id]
                      ? ILJU_SVG_ICONS[registeredIlju.id]!(getIljuProfileViewBox(registeredIlju.id))
                      : <img src={DEFAULT_PROFILE_IMG} alt="나" className="w-full h-full object-cover" />
                    }
                  </div>
                  <div className="text-center">
                    <p className="text-[15px] font-bold text-charcoal" style={BINGGRAE}>나</p>
                    {user.birthDate && (
                      <p className="text-[11px] text-charcoal/35 mt-0.5" style={BINGGRAE}>
                        {user.birthDate.year}.{user.birthDate.month}.{user.birthDate.day}
                      </p>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => handleTargetSelect("other")}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-charcoal/10 bg-white active:scale-95 transition-transform"
                  style={{ boxShadow: "2px 2px 0 rgba(45,45,45,0.08)" }}
                >
                  <div className="w-16 h-16 rounded-full bg-charcoal/5 border-2 border-dashed border-charcoal/20 flex items-center justify-center">
                    <DoodleSun style={{ width: 32, height: 32 }} />
                  </div>
                  <div className="text-center">
                    <p className="text-[15px] font-bold text-charcoal" style={BINGGRAE}>다른 사람</p>
                    <p className="text-[11px] text-charcoal/35 mt-0.5" style={BINGGRAE}>연인·가족·친구</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2+: 프리뷰 / 결과 ── */}
      {(step === "preview" || step === "result") && (
        <div className="fixed inset-0 z-[200] bg-cream overflow-y-auto">
          <div className="w-full max-w-[430px] mx-auto flex flex-col pb-10">

            {/* 상단 네비 */}
            <div className="flex items-center justify-between px-4 pt-3 pb-1 sticky top-0 bg-cream/95 backdrop-blur-sm z-10">
              <button
                onClick={() => { setStep("target"); setBirthData(null) }}
                className="text-[13px] text-charcoal/40 active:opacity-60"
                style={BINGGRAE}
              >
                ← 다시 선택
              </button>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-charcoal/8 flex items-center justify-center active:scale-90 transition-transform"
              >
                <span className="text-[16px] text-charcoal/50 leading-none">✕</span>
              </button>
            </div>

            <div className="flex flex-col gap-5 px-5 pt-2">

              {/* 타이틀 */}
              <div>
                {ilju && (
                  <p className="text-[12px] text-charcoal/40" style={BINGGRAE}>
                    {displayName} · {ilju.ilju}일주
                  </p>
                )}
                <p className="text-[22px] font-bold text-charcoal leading-snug mt-0.5" style={BINGGRAE}>
                  {isResult
                    ? `${displayName}${(displayName.charCodeAt(displayName.length - 1) - 0xAC00) % 28 !== 0 ? "과" : "와"} 같은 사주`
                    : <>나와 같은 사주를 가진<br />셀럽은 누구?</>}
                </p>
              </div>

              {/* ── 셀럽 카드 섹션 ── */}
              <div className="flex flex-col gap-3">

                {/* 발견 뱃지 + 티저 */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold"
                    style={{ ...BINGGRAE, background: theme.bg, color: "#2D2D2D", border: `1.5px solid ${theme.accent}60` }}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full animate-pulse shrink-0"
                      style={{ background: theme.accent }}
                    />
                    {isResult
                      ? `${celebInfo?.count ?? 0}명 매칭됨`
                      : `이 중 ${celebInfo?.count ?? "?"}명이 ${displayName}와 일치해요`}
                  </span>
                  {!isResult && (
                    <span className="text-[11px] text-charcoal/45" style={BINGGRAE}>
                      {teaserCat} 포함
                    </span>
                  )}
                </div>

                {/* 마퀴 (프리뷰) or 공개 카드 (결과) */}
                {!isResult ? (
                  // 전체 셀럽 마퀴 — 다 보이지만 누가 내 사주인지는 모름
                  <div className="-mx-5">
                    <CelebMarquee />
                  </div>
                ) : (
                  // 공개된 매칭 카드
                  <div className="flex justify-center items-start gap-2" style={{ paddingTop: 8, paddingBottom: 8 }}>
                    {resultPersons.map((p, i) => {
                      const elem = CAT_ELEM[p.cat] ?? "토(土)"
                      const bg = ELEM_BG[elem] ?? "#FEF3C7"
                      return (
                        <div
                          key={i}
                          className="shrink-0 flex flex-col rounded-2xl overflow-hidden"
                          style={{
                            width: 108,
                            background: "white",
                            border: "2px solid rgba(45,45,45,0.1)",
                            transform: `rotate(${CARD_TILTS[i]}deg)`,
                            boxShadow: "2px 2px 0px rgba(45,45,45,0.1)",
                            marginTop: CARD_MT[i],
                          }}
                        >
                          <div className="flex flex-col items-center px-2.5 pt-2.5 pb-1.5 gap-1">
                            <div
                              className="w-16 h-16 rounded-full border-2 border-charcoal/15 flex items-center justify-center text-[26px] shrink-0"
                              style={{ background: bg }}
                            >
                              {CAT_EMOJI[p.cat] ?? "✨"}
                            </div>
                            <p className="text-[12px] leading-tight text-charcoal text-center font-bold mt-0.5" style={BINGGRAE}>{p.name}</p>
                            <p className="text-[11px] text-text-muted leading-tight text-center" style={GAEGU}>{p.role}</p>
                          </div>
                          <div
                            className="flex items-center justify-center py-2 border-t-2 border-charcoal/10"
                            style={{ background: bg }}
                          >
                            {ELEM_STICKER[elem]}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* 오행 밸런스 */}
              {elementDist && pillars && (
                <div className="rounded-2xl border border-charcoal/10 bg-white px-4 py-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-bold text-charcoal" style={BINGGRAE}>오행 밸런스</p>
                    <p className="text-[10px] text-charcoal/30" style={BINGGRAE}>
                      {pillars.hasTime ? "사주팔자 기준" : "사주육자 기준 (시간 미입력)"}
                    </p>
                  </div>
                  {ELEMENTS.map(e => {
                    const score = elementDist[e] ?? 0
                    const color = ELEM_COLOR[e]
                    const Doodle = ELEM_DOODLE[e]
                    const isDayStem   = e === pillars.day.stemElement
                    const isDayBranch = e === pillars.day.branchElement && e !== pillars.day.stemElement
                    return (
                      <div key={e} className="flex items-center gap-2">
                        <Doodle className="w-4 h-4 shrink-0 opacity-60" />
                        <p className="text-[11px] text-charcoal/60 w-6 shrink-0" style={BINGGRAE}>
                          {ELEM_SHORT[e]}
                        </p>
                        <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${score}%`, background: color }}
                          />
                        </div>
                        <p className="text-[11px] text-charcoal/40 w-7 text-right shrink-0" style={BINGGRAE}>
                          {score}%
                        </p>
                        {(isDayStem || isDayBranch) && (
                          <span
                            className="text-[9px] px-1 py-0.5 rounded shrink-0"
                            style={{
                              ...BINGGRAE,
                              background: `${color}20`,
                              color,
                              border: `1px solid ${color}50`,
                            }}
                          >
                            {isDayStem ? "일간" : "일지"}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* 오행 분석 텍스트 */}
              {elementDist && pillars && (() => {
                const { headline, body } = genOhaengAnalysis(elementDist, pillars.day.stemElement, displayName)
                const color = ELEM_COLOR[pillars.day.stemElement]
                return (
                  <div className="rounded-2xl border border-charcoal/10 bg-white px-4 py-3.5 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-2 h-2 rounded-full shrink-0"
                        style={{ background: color }}
                      />
                      <p className="text-[13px] font-bold text-charcoal" style={BINGGRAE}>{headline}</p>
                    </div>
                    <p className="text-[12px] text-charcoal/65 leading-relaxed" style={BINGGRAE}>{body}</p>
                  </div>
                )
              })()}

              {/* CTA */}
              {!isResult ? (
                <div className="flex flex-col gap-2">
                  <CTAButton onClick={() => setStep("result")}>
                    {celebInfo ? `${celebInfo.count}명 공개하기` : "셀럽 공개하기"}
                  </CTAButton>
                  <p className="text-center text-[11px] text-charcoal/30" style={BINGGRAE}>
                    명태 잔액에서 차감됩니다
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-center">
                  <p className="text-[14px] font-bold text-green-700" style={BINGGRAE}>🎉 분석 완료</p>
                  <p className="text-[11px] text-green-600/70 mt-0.5" style={BINGGRAE}>
                    이 결과는 보관함에서 다시 볼 수 있어요
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 생년월일 입력 */}
      <SajuInputSheet
        open={showInput}
        onClose={() => { setShowInput(false); setTarget(null) }}
        initialData={target === "me" ? (user.birthDate ?? undefined) : undefined}
        skipSave={target === "other"}
        onSuccess={bd => {
          setBirthData(bd)
          setShowInput(false)
          setStep("preview")
        }}
      />
    </>,
    document.body
  )
}
