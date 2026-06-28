"use client"
// ════════════════════════════════════════════════════════════════
// SelfReportV2 — "나 사용설명서" 결과 본문 (디자인 시스템 적용판).
// v1(report.tsx)과 동일 콘텐츠·동일 데이터(deriveSelf). 차이는 "표현"만:
//   · 흰 카드 → 파스텔 Card/Section      · 산재한 색 박스 → 의미색 InfoBox 통합
//   · AI 풀이 → 그라디언트 Hero(오행 테마) · 자체 재정의 컴포넌트 제거(키트 사용)
//   · 반복 래퍼(div+SectionTitle+Card) → <Section> 으로 depth 평탄화
// 폰트(시범): 본문 기본 Pretendard, 감성 포인트만 온글잎 박다현체(OWNGLYPH).
//   ※ --font-flavor(디자인시스템)는 미교체 — 이 페이지 한정 적용.
// 비교: /v3/self/compare  ·  계약: DESIGN-SYSTEM.md
// ════════════════════════════════════════════════════════════════
import Link from "next/link"
import { ELEMS, type Elem } from "../engine"
import { ELEM_BG, ELEM_COLOR, ELEM_DOODLE } from "../flavor"
import type { SelfData } from "./self-adapter"
import {
  TALENT, ELEM_TRAIT, MEETING, LOVE_STYLE, IDEAL, JOB, ELEM_ORGAN,
  SEUN_LINE, PAST_LIFE, DARK_HIST, ELEM_FILL,
} from "./flavor"
import { deriveSelf, LifeGraph, Radar, CelebCard, NaCard, Avatar } from "./report"
import { FONT } from "@/lib/ds"
import {
  Ico, Card, InfoBox, Section, ChapterDivider, Hero, Prose, GradBadge,
} from "@/components/ds"
import {
  DoodleSparkles, DoodleBook, DoodleKey, DoodleTaegeuk, DoodleHeart,
  DoodleLightning, DoodleMedal, DoodleMirror, DoodleSpeechBubble, DoodleStar,
  DoodleDiamond, DoodleCalendar, DoodleClover, DoodleQuestionMark, DoodleMoon, DoodleCrown,
} from "@/components/doodles"

type DoodleC = React.FC<{ className?: string }>

/** 감성 포인트 손글씨 — 온글잎 박다현체. 짧은 어절·감성 한 줄에만. (단일 두께라 bold 금지) */
const OWNGLYPH: React.CSSProperties = { fontFamily: "'Ownglyph ParkDaHyun', var(--font-pretendard)" }

/** 오행-틴트 박스 — 의미색이 아닌 오행색으로 칠하는 강조 박스(부족 오행·용신 환경 등).
 *  본문 기본 폰트 = Pretendard. 감성 포인트가 필요하면 children 안에서 개별 지정. */
function ElemBox({ elem, icon, title, children }:
  { elem: Elem; icon?: DoodleC; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="rounded-[var(--r-lg)] px-4 py-3.5 flex items-start gap-2.5"
      style={{ background: ELEM_BG[elem], border: `1px solid ${ELEM_COLOR[elem]}` }}>
      {icon && <Ico as={icon} size={20} />}
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-bold text-charcoal leading-tight">{title}</p>
        {children && <div className="text-[14px] text-charcoal/75 leading-relaxed mt-0.5">{children}</div>}
      </div>
    </div>
  )
}

export function SelfReportV2({ data: self, aiText, aiLoading = false }: { data: SelfData; aiText: string; aiLoading?: boolean }) {
  const x = deriveSelf(self)

  return (
    <div className="flex flex-col gap-6">
      {/* 나 정밀 풀이 — AI 요약 히어로(그라디언트 시그니처, 오행 테마) */}
      <Hero icon={DoodleSparkles} title="나 정밀 풀이" basis="원국 종합" theme={self.dayElem}>
        {aiLoading ? (
          <div className="flex flex-col gap-2 py-1">
            {[100, 96, 100, 72].map((w, i) => <div key={i} className="h-3 rounded-full bg-charcoal/10 animate-pulse" style={{ width: `${w}%` }} />)}
            <p className="text-[13px] text-text-muted mt-1">원국을 깊게 읽는 중…</p>
          </div>
        ) : <Prose text={aiText} />}
      </Hero>

      <ChapterDivider n={1} title="나는 이런 사람" />

      {/* 일주 스펙시트 */}
      <Section icon={DoodleStar} title="내 스펙시트" basis="일주" card bodyClass="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar iljuKey={x.charKey} size={48} />
          <div>
            <p className="text-[15px] font-bold text-charcoal">{x.iljuType?.name ?? `${self.dayKr}${self.dayElem} 일간`}</p>
            <p className="text-[13px] text-text-muted">{self.dayKr}({self.dayElem})·{self.yinYang} 일간</p>
          </div>
        </div>
        {x.iljuType && (
          <>
            <div className="flex flex-wrap gap-1.5">
              {x.iljuType.strengths.slice(0, 4).map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full text-[12px] font-bold" style={{ background: "var(--ok-bg)", color: "var(--ok-ink)" }}>{s}</span>
              ))}
            </div>
            {x.iljuType.weaknesses?.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap gap-1.5">
                  {x.iljuType.weaknesses.slice(0, 3).map((w, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full text-[12px] font-bold" style={{ background: "var(--surface-sunken)", color: "var(--text-muted)" }}>{w}</span>
                  ))}
                </div>
                {/* [박다현] */}
                <p className="text-[14px] text-charcoal/60 leading-snug" style={OWNGLYPH}>이런 면도 있는데, 알아두면 오히려 다루기 쉬워.</p>
              </div>
            )}
          </>
        )}
      </Section>

      {/* 사주가 같은 사람 — 카드 role 라벨[박다현] */}
      <Section icon={DoodleCrown} title="사주가 같은 사람" basis="일주">
        {x.celeb && x.celeb.persons.length > 0 ? (() => {
          const cs = x.celeb.persons.slice(0, 2)
          const naRole = `${x.bareIlju}일주`
          return (
            <div className="flex justify-center items-start gap-2 pt-2 pb-1">
              {cs.length >= 2 ? (
                <>
                  <CelebCard name={cs[0].name} role={cs[0].role} cat={cs[0].cat} elem={self.dayElem} idx={0} roleStyle={OWNGLYPH} />
                  <NaCard iljuKey={x.charKey} role={naRole} elem={self.dayElem} idx={1} roleStyle={OWNGLYPH} />
                  <CelebCard name={cs[1].name} role={cs[1].role} cat={cs[1].cat} elem={self.dayElem} idx={2} roleStyle={OWNGLYPH} />
                </>
              ) : (
                <>
                  <NaCard iljuKey={x.charKey} role={naRole} elem={self.dayElem} idx={0} roleStyle={OWNGLYPH} />
                  <CelebCard name={cs[0].name} role={cs[0].role} cat={cs[0].cat} elem={self.dayElem} idx={1} roleStyle={OWNGLYPH} />
                </>
              )}
            </div>
          )
        })() : (
          <Card className="px-4 py-4 text-center">
            <p className="text-[14px] text-charcoal/60 leading-snug">{x.bareIlju}일주는 아직 등록된 유명인이 없어 — 네가 1호일지도?</p>
          </Card>
        )}
        {/* [박다현] */}
        <p className="text-[14px] text-charcoal/55 text-center" style={OWNGLYPH}>너도 이 기운을 타고났어.</p>
      </Section>

      {/* 내 오행 밸런스 */}
      <Section icon={DoodleTaegeuk} title="내 오행 밸런스" basis="오행 분포" card bodyClass="flex flex-col gap-2.5">
        {ELEMS.map(e => {
          const v = self.dist[e], max = Math.max(1, ...ELEMS.map(xx => self.dist[xx]))
          return (
            <div key={e} className="flex items-center gap-2.5">
              <Ico as={ELEM_DOODLE[e]} size={16} />
              <span className="w-4 text-[14px] font-bold text-charcoal shrink-0">{e}</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden ds-sunken">
                <div className="h-full rounded-full" style={{ width: `${(v / max) * 100}%`, background: ELEM_COLOR[e] }} />
              </div>
              <span className="w-4 text-[14px] text-text-muted text-right shrink-0">{v}</span>
            </div>
          )
        })}
        {/* [박다현] */}
        <p className="text-[14px] text-charcoal/70 leading-snug pt-1" style={OWNGLYPH}>
          나를 살리는 기운은 <span className="font-bold" style={{ color: "var(--pink)", ...FONT.title }}>{self.yong}</span> · 조심할 기운은 {self.gi}.
        </p>
      </Section>

      {/* 부족 오행 채우기 */}
      <ElemBox elem={x.weakest} icon={ELEM_DOODLE[x.weakest]} title={`너에겐 ${x.weakest} 기운이 부족해`}>
        <div className="flex flex-col gap-2 mt-1.5">
          {ELEM_FILL[x.weakest].map((a, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.65)" }}>
              <Ico as={a.D} size={18} />
              <span className="text-[14px] font-bold text-charcoal">{a.label}</span>
            </div>
          ))}
        </div>
      </ElemBox>

      {/* 에너지 운용 */}
      <Section icon={DoodleLightning} title="에너지 운용" basis="신강신약" card bodyClass="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-[12px] text-text-muted"><span>기댐·충전형</span><span>주도·추진형</span></div>
        <div className="relative h-3 rounded-full" style={{ background: "linear-gradient(90deg,#93C5FD,#E5E7EB,#F9A8C4)" }}>
          <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white" style={{ left: `${x.energyPos}%`, border: "2px solid var(--pink)" }} />
        </div>
        <div className="flex items-start gap-3 pt-0.5">
          <Avatar iljuKey={x.charKey} size={44} />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-bold text-charcoal">{self.strongLevel}</p>
            {/* [박다현] */}
            <p className="text-[14px] text-charcoal/70 leading-snug mt-0.5" style={OWNGLYPH}>{self.isStrong ? "에너지 풀충전형 — 내가 키 쥐고 밀어붙일 때 잘 풀려. 가끔 브레이크만 잊지 마." : self.strongLevel.includes("중화") ? "균형형 — 상황 따라 유연하게 가는 게 강점이야." : "섬세·기댐형 — 좋은 환경·사람에 기대고 채울 때 빛나. 무리한 독주는 방전돼."}</p>
          </div>
        </div>
      </Section>

      <ChapterDivider n={2} title="내 안엔 이런 게" />

      {/* 타고난 재능 — line[박다현] */}
      <Section icon={DoodleMedal} title="타고난 재능" basis="십신">
        <div className="grid grid-cols-2 gap-2">
          {self.topTalent.map((gp, i) => {
            const t = TALENT[gp]
            return (
              <Card key={i} className="px-3 py-3.5 flex flex-col gap-1.5">
                <Ico as={t.D} size={22} />
                <p className="text-[14px] font-bold" style={{ color: "var(--pink)" }}>{t.tag}</p>
                <p className="text-[14px] text-charcoal/65 leading-snug" style={OWNGLYPH}>{t.line}</p>
              </Card>
            )
          })}
        </div>
      </Section>

      {/* 본캐 vs 부캐 — [프리텐다드] + 두들스티커(남들이 보는 나 카드처럼) */}
      <Section icon={DoodleMirror} title="본캐 vs 부캐" basis="일간·오행" card bodyClass="flex items-start gap-2.5">
        <Ico as={DoodleMirror} size={18} />
        <div className="min-w-0 flex-1">
          {x.sameCore ? (
            <p className="text-[14px] text-charcoal/75 leading-relaxed">겉과 속이 일관된 사람. 보이는 그대로 — <span className="font-bold text-charcoal">{ELEM_TRAIT[x.ego]}</span>.</p>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2.5"><span className="text-[13px] font-bold w-12 shrink-0" style={{ color: "var(--pink)" }}>겉(부캐)</span><span className="text-[14px] text-charcoal/75 leading-relaxed">{ELEM_TRAIT[x.persona]}</span></div>
              <div className="flex items-start gap-2.5"><span className="text-[13px] font-bold w-12 shrink-0" style={{ color: "var(--pink)" }}>속(본캐)</span><span className="text-[14px] text-charcoal/75 leading-relaxed">{ELEM_TRAIT[x.ego]}</span></div>
            </div>
          )}
        </div>
      </Section>

      {/* 남들이 보는 나 */}
      <InfoBox accent="info" icon={DoodleSpeechBubble} title="남들이 보는 나">{x.seenLine} 쪽으로 비쳐.</InfoBox>

      {/* 내 안의 오행 회의실 — voice·캡션[박다현] */}
      <Section icon={DoodleSpeechBubble} title="내 안의 오행 회의실" basis="오행 분포">
        <Card className="px-4 py-1">
          {x.meetingOrder.map(e => {
            const m = MEETING[e]; const n = self.dist[e]
            const power = n >= 3 ? "주도권" : n === 0 ? "발언권 없음" : n >= 2 ? "목소리 큼" : "한마디"
            return (
              <div key={e} className="flex items-center gap-2.5 py-2.5 border-b border-charcoal/5 last:border-0" style={n === 0 ? { opacity: 0.4 } : undefined}>
                <Ico as={ELEM_DOODLE[e]} size={18} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-charcoal">{e} · {m.role} <span className="text-[12px] text-text-muted font-normal">{power}</span></p>
                  <p className="text-[14px] text-charcoal/60 leading-snug" style={OWNGLYPH}>&ldquo;{m.voice}&rdquo;</p>
                </div>
              </div>
            )
          })}
        </Card>
        {/* [박다현] */}
        <p className="text-[14px] text-charcoal/60 leading-snug" style={OWNGLYPH}>제일 목소리 큰 {x.meetingOrder[0]}({MEETING[x.meetingOrder[0]].role})이 너를 주로 끌고 가. {x.weakElems.length ? `빠진 ${x.weakElems.join("·")}은 의식적으로 챙겨야 균형이 맞아.` : ``}</p>
      </Section>

      <ChapterDivider n={3} title="사랑할 때 나는" />

      {/* 내 연애 스타일 — 일주 프로필 + line[박다현] */}
      <Section icon={DoodleHeart} title="내 연애 스타일" basis="일간·도화" card bodyClass="flex items-center gap-3">
        <Avatar iljuKey={x.charKey} size={52} />
        <div className="min-w-0 flex-1 flex flex-col gap-1">
          <p className="text-[14px] font-bold" style={{ color: "var(--pink)" }}>{LOVE_STYLE[self.dayElem].tag}</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={OWNGLYPH}>{LOVE_STYLE[self.dayElem].line}.{self.dohwa ? " 매력(도화) 기운이 있어 끌어당기는 힘도 있어." : ""}</p>
        </div>
      </Section>

      {/* 나를 채워주는 사람 — [프리텐다드] */}
      <ElemBox elem={self.yong} icon={ELEM_DOODLE[self.yong]} title={`나를 채워주는 사람 (${self.yong} 기운)`}>
        {IDEAL[self.yong]}{x.loveAges.length ? ` 관계 흐름은 ${x.loveAges.slice(0, 2).join(", ")} 전후에 움직여.` : ""}
      </ElemBox>

      {/* 크로스셀 → 썸/짝사랑 */}
      <div className="grid grid-cols-2 gap-2">
        <Link href="/v3/some" className="ds-infobox ds-accent-love px-3 py-3 flex flex-col gap-1 active:opacity-85 transition-opacity">
          <Ico as={DoodleHeart} size={18} />
          <p className="text-[13px] font-bold text-charcoal">썸 궁합 보기 →</p>
          <p className="text-[12px] text-charcoal/55 leading-snug">그 사람과 나, 가능성은?</p>
        </Link>
        <Link href="/v3/onesided" className="ds-infobox ds-accent-special px-3 py-3 flex flex-col gap-1 active:opacity-85 transition-opacity">
          <Ico as={DoodleSparkles} size={18} />
          <p className="text-[13px] font-bold text-charcoal">짝사랑 궁합 보기 →</p>
          <p className="text-[12px] text-charcoal/55 leading-snug">그 사람, 내 맘 알까?</p>
        </Link>
      </div>

      <ChapterDivider n={4} title="일·돈 앞에서 나는" />

      {/* 어울리는 일 — [프리텐다드] */}
      <Section icon={DoodleMedal} title="어울리는 일" basis="십신" card bodyClass="flex flex-col gap-2">
        {self.topTalent.map((gp, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0" style={{ background: "var(--pink)" }}>{i + 1}</span>
            <p className="text-[14px] text-charcoal/75 leading-relaxed">{JOB[gp]}</p>
          </div>
        ))}
      </Section>

      {/* 재물 그릇 + 돈 시기 — moneyLine[프리텐다드] / 돈 시기[박다현] */}
      <Section icon={DoodleDiamond} title="재물 그릇" basis="재성·대운" card bodyClass="flex flex-col gap-2.5">
        <p className="text-[14px] text-charcoal/75 leading-relaxed">{x.moneyLine}</p>
        <div className="ds-infobox ds-accent-warn px-3 py-2.5 flex items-center gap-2">
          <Ico as={DoodleCalendar} size={16} />
          <p className="text-[14px] text-charcoal/75 leading-snug" style={OWNGLYPH}>{x.moneyAges.length ? `돈이 트이는 시기: ${x.moneyAges.slice(0, 3).join(", ")} 전후` : "한 방보다 쌓는 게 맞아 — 꾸준함이 돈으로 와."}</p>
        </div>
      </Section>

      <ChapterDivider n={5} title="나, 지금 어디쯤" />

      {/* 내 인생 그래프 — 캡션[박다현] */}
      <Section icon={DoodleStar} title="내 인생 그래프" basis="대운" card bodyClass="flex flex-col gap-2">
        <LifeGraph life={self.life} />
        <div className="flex items-center justify-center gap-3 text-[12px] text-text-muted">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: "var(--pink)", background: "#fff" }} />지금</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: "#F0A020" }} />황금기</span>
        </div>
        <p className="text-[14px] text-charcoal/70 leading-snug text-center" style={OWNGLYPH}>{self.peak ? `황금기는 ${self.peak.ageLabel}세 전후. ` : ""}지금({self.curAge}세)은 {x.curFavorLine}이야.</p>
      </Section>

      <ChapterDivider n={6} title="나 다루는 법" />

      {/* 나 사용설명서 카드 — 값[박다현] */}
      <Section icon={DoodleBook} title="나 사용설명서" basis="일간·용신">
        <Card className="overflow-hidden">
          {/* 제품 라벨 헤더 — 프로필 */}
          <div className="px-4 py-3 flex items-center gap-2.5 border-b border-charcoal/5 ds-sunken">
            <Avatar iljuKey={x.charKey} size={40} />
            <div className="min-w-0">
              <p className="text-[11px] text-text-muted">제품명</p>
              <p className="text-[14px] font-bold text-charcoal leading-tight">나 — {x.iljuType?.name ?? `${self.dayKr}${self.dayElem} 일간`}</p>
            </div>
          </div>
          {([["취급주의", x.manual.care], ["충전법", x.manual.charge], ["방전 신호", x.manual.drain], ["셀프 A/S", x.manual.as]] as const).map(([k, v]) => (
            <div key={k} className="px-4 py-2.5 flex gap-3 border-b border-charcoal/5 last:border-0">
              <span className="text-[13px] font-bold shrink-0 w-16 whitespace-nowrap" style={{ color: "var(--pink)" }}>{k}</span>
              <span className="text-[14px] text-charcoal/75 leading-snug" style={OWNGLYPH}>{v}</span>
            </div>
          ))}
        </Card>
      </Section>

      {/* 번아웃 신호 */}
      <InfoBox accent="warn" icon={DoodleLightning} title="번아웃 신호">{x.burnout}</InfoBox>

      {/* 나를 살리는 환경 — 보약 한 줄[박다현] / 방향·색·때[프리텐다드] */}
      <Section icon={DoodleClover} title="나를 살리는 환경" basis="용신">
        <ElemBox elem={self.yong} icon={ELEM_DOODLE[self.yong]} title={<><span style={{ color: "var(--pink)" }}>{self.yong}</span> 기운을 채우면 잘 풀려</>}>
          <span style={OWNGLYPH}>{x.env.act} 쪽이 보약이야.</span>
          <div className="grid grid-cols-3 gap-2 mt-2.5">
            {[["방향", x.env.dir], ["색", x.env.color], ["때", x.env.season]].map(([k, v]) => (
              <div key={k} className="rounded-xl px-2 py-2 flex flex-col items-center gap-0.5 text-center" style={{ background: "rgba(255,255,255,0.65)" }}>
                <span className="text-[12px] text-text-muted">{k}</span>
                <span className="text-[13px] font-bold text-charcoal">{v}</span>
              </div>
            ))}
          </div>
        </ElemBox>
      </Section>

      {/* 건강 신호등 */}
      <InfoBox accent="ok" icon={DoodleHeart} title="건강 신호등">가장 약한 {x.weakest} 기운 — {ELEM_ORGAN[x.weakest]}. 단정은 아니고, 이 기운만 챙겨주면 컨디션이 좋아져.</InfoBox>

      <ChapterDivider n={7} title="올해의 나" />

      {/* 올해 흐름 — 두들이 타이틀을 리드, 서브는 타이틀에 맞춰 정렬 / 한 줄[박다현] */}
      <Section icon={DoodleCalendar} title="올해 흐름" basis="세운" card bodyClass="flex items-start gap-2.5">
        <Ico as={DoodleStar} size={18} />
        <div className="min-w-0 flex-1 flex flex-col gap-1">
          <p className="text-[14px] font-bold text-charcoal">{x.seunGroup ? SEUN_LINE[x.seunGroup] : "잔잔히 흐르는 해 — 네 페이스대로"}</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={OWNGLYPH}>무리해서 판을 뒤집기보다, 이 흐름에 맞춰 한 발씩 가면 돼.</p>
        </div>
      </Section>

      {/* 인생 전환점 */}
      {x.nextDaeun && (
        <InfoBox accent="info" icon={DoodleStar} title={`다음 전환점 · ${x.nextDaeun.startAge}세`}>
          {x.nextDaeun.startAge}세부터 결이 바뀌어{x.nextDaeun.favor >= (x.cur?.favor ?? 50) ? " — 흐름이 한 단계 트여." : " — 새로운 색으로 갈아타는 시기야."}
        </InfoBox>
      )}

      {/* 삼재 */}
      {self.samjae && (
        <InfoBox accent="warn" icon={DoodleQuestionMark} title="삼재 구간">너무 겁먹지 마 — 큰 결정만 한 박자 신중히, 평소처럼 살면 무탈하게 지나가.</InfoBox>
      )}

      {/* ── 보너스 ── */}
      <div className="flex items-center gap-2.5 pt-3">
        <Ico as={DoodleSparkles} size={20} />
        <span className="text-[15px] text-charcoal shrink-0" style={FONT.title}>재미로 보는 나</span>
        <div className="flex-1 h-px" style={{ background: "var(--line-medium)" }} />
      </div>

      {/* 사주 RPG 스탯 */}
      <Section icon={DoodleStar} title="사주 RPG 스탯" basis="오행·십신" card bodyClass="flex flex-col gap-1">
        <Radar data={x.stats} />
        <p className="text-[14px] text-charcoal/70 leading-snug text-center">최고 스탯은 <GradBadge theme={self.dayElem} className="!px-2 !py-0.5 text-[13px] align-middle">{x.topStat.label} {x.topStat.value}</GradBadge> — 여기로 승부 봐.</p>
      </Section>

      {/* 나 코드 + 한 줄 밈 */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="px-3 py-3.5 flex flex-col items-center gap-1 text-center">
          <Ico as={DoodleKey} size={18} />
          <span className="text-[12px] text-text-muted">나 코드</span>
          <span className="text-[20px]" style={{ ...FONT.title, color: "var(--pink)", letterSpacing: "0.05em" }}>{x.code}</span>
        </Card>
        <div className="ds-card flex flex-col items-center justify-center gap-1 text-center px-3 py-3.5" style={{ background: "var(--grad-pink-surface)" }}>
          <span className="text-[12px] text-text-muted">한 줄 요약</span>
          <span className="text-[16px]" style={{ ...FONT.title, color: "var(--pink)" }}>{x.meme}</span>
        </div>
      </div>

      {/* 전생의 나 */}
      <InfoBox accent="special" icon={DoodleMoon} title="전생의 나">{PAST_LIFE[x.dominantElem]}</InfoBox>

      {/* 나의 흑역사 버튼 */}
      <InfoBox accent="love" icon={DoodleLightning} title="나의 흑역사 버튼">{DARK_HIST[x.dominantElem]}</InfoBox>

      {/* consult 크로스셀 — 서브[박다현] */}
      <Link href="/v3/consult" className="rounded-[var(--r-xl)] px-4 py-4 flex items-center gap-3 active:opacity-90 transition-opacity"
        style={{ background: "var(--grad-pink-surface)", border: "1px solid var(--line-soft)" }}>
        <Ico as={DoodleSpeechBubble} size={24} />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-charcoal" style={FONT.title}>더 궁금한 건 대화로 물어봐</p>
          <p className="text-[14px] text-charcoal/60 leading-snug" style={OWNGLYPH}>내 사주 캐릭터한테 직접 — 연애·일·고민 뭐든</p>
        </div>
        <span className="text-[18px]" style={{ color: "var(--pink)" }}>→</span>
      </Link>
    </div>
  )
}
