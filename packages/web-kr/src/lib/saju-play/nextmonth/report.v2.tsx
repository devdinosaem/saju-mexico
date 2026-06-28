"use client"
// ════════════════════════════════════════════════════════════════
// NextMonthReportV2 — "다음달 운 미리보기" 본편 (디자인 시스템 적용판).
// v1(report.tsx)과 동일 콘텐츠·데이터(deriveNextMonth). 표현만 키트로:
//   흰 카드 · 섀도우 제거 · 색 박스→InfoBox/ElemBox · 그라디언트 Hero(핑크+검은선 고정) ·
//   폰트(감성=박다현/본문=Pretendard) · Section depth 평탄화. 달력/게이지 재사용.
// 비교: /v3/nextmonth/compare
// ════════════════════════════════════════════════════════════════
import Link from "next/link"
import { ELEM_BG, ELEM_DOODLE } from "../flavor"
import { type NextMonthData } from "./nextmonth-adapter"
import { AREA, EVENT_COPY } from "./flavor"
import { SINSAL, CAT_STYLE } from "../sinsal/flavor"
import { deriveNextMonth, CalendarGrid, gaugeColor, AREA_LABEL } from "./report"
import { FONT } from "@/lib/ds"
import { Ico, Card, InfoBox, Section, ChapterDivider, Hero, Prose } from "@/components/ds"
import {
  DoodleSparkles, DoodleTaegeuk, DoodleCalendar, DoodleSpeechBubble, DoodleLightning,
} from "@/components/doodles"

const OWNGLYPH: React.CSSProperties = { fontFamily: "'Ownglyph ParkDaHyun', var(--font-pretendard)" }

export function NextMonthReportV2({ data, aiText, aiLoading = false }: { data: NextMonthData; aiText: string; aiLoading?: boolean }) {
  const x = deriveNextMonth(data)

  return (
    <div className="flex flex-col gap-6">
      {/* 다음달 정밀 예보 — AI 요약 히어로(핑크+검은선 고정) */}
      <Hero icon={DoodleSparkles} title="다음달 정밀 예보" basis={`${data.monthLabel} 월운`} theme="pink" borderColor="var(--black)" borderWidth={2}>
        {aiLoading ? (
          <div className="flex flex-col gap-2 py-1">
            {[100, 96, 100, 72].map((w, i) => <div key={i} className="h-3 rounded-full bg-charcoal/10 animate-pulse" style={{ width: `${w}%` }} />)}
            <p className="text-[13px] text-text-muted mt-1">다음달 흐름을 읽는 중…</p>
          </div>
        ) : <Prose text={aiText} />}
      </Hero>

      <ChapterDivider n={1} title="다음달, 한눈에" />

      {/* 운세 날씨 종합 */}
      <Section icon={x.weather.D} title={`${data.monthLabel} 운세 날씨`} basis="종합" card bodyClass="flex flex-col items-center gap-2 text-center !py-5">
        <Ico as={x.weather.D} size={52} />
        <p className="text-[22px] text-charcoal" style={FONT.title}>{x.weather.label}</p>
        <p className="text-[14px] text-charcoal/70 leading-snug" style={OWNGLYPH}>{x.weather.line}</p>
        <div className="flex flex-wrap justify-center gap-1.5 pt-1">
          {data.keywords.map(k => (
            <span key={k} className="px-2.5 py-1 rounded-full text-[13px] font-bold" style={{ background: "var(--love-bg)", color: "var(--love-ink)" }}>#{k}</span>
          ))}
        </div>
      </Section>

      {/* 이 달의 테마 — 긍정/중립 헤드라인이라 주의색(warn) 아닌 special(특별 강조) */}
      <InfoBox accent="special" icon={x.theme.D} title={`${x.theme.title} · ${data.monthTenGod}결`}>{x.theme.line}</InfoBox>

      {/* 오행 호악 */}
      {x.elemFavor === "good" ? (
        <InfoBox accent="ok" icon={ELEM_DOODLE[data.monthElem]} title={`다음달은 ${data.monthElem} 기운의 달`}>나를 살리는 {data.yong} 기운이 들어와 — 흐름이 트이는 달이야. 벌여도 좋아.</InfoBox>
      ) : x.elemFavor === "warn" ? (
        <InfoBox accent="warn" icon={ELEM_DOODLE[data.monthElem]} title={`다음달은 ${data.monthElem} 기운의 달`}>조심할 {data.gi} 기운이 도는 달 — 키우기보다 다지기, 큰 결정은 한 박자 쉬어가.</InfoBox>
      ) : (
        <Card className="px-4 py-3.5 flex items-start gap-2.5">
          <Ico as={ELEM_DOODLE[data.monthElem]} size={22} />
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-charcoal leading-tight">다음달은 {data.monthElem} 기운의 달</p>
            <p className="text-[14px] text-charcoal/70 leading-snug mt-0.5">용신 {data.yong}·기신 {data.gi} 어느 쪽도 아닌 무난한 달 — 내 페이스대로 가면 돼.</p>
          </div>
        </Card>
      )}

      {/* 충/합 이벤트 배지 */}
      {x.evtTypes.length > 0 && x.evtTypes.map(type => {
        const c = EVENT_COPY[type]
        const withList = [...new Set(data.events.filter(e => e.type === type).map(e => e.withLabel))].join(", ")
        const good = type === "합"
        return (
          <InfoBox key={type} accent={good ? "ok" : "warn"} icon={good ? DoodleSparkles : DoodleLightning}
            title={<>{c.title} <span className="text-[12px] text-text-muted font-normal">· {withList} {type}</span></>}>
            {c.line}
          </InfoBox>
        )
      })}

      <ChapterDivider n={2} title="영역별 예보" />

      {/* 5대 영역 게이지 */}
      <Section icon={DoodleTaegeuk} title="애정·일·돈·건강·관계" basis="십신·신살" card bodyClass="flex flex-col gap-3">
        {AREA.map(a => {
          const v = data.areas[a.key]
          return (
            <div key={a.key} className="flex items-center gap-2.5">
              <Ico as={a.D} size={16} />
              <span className="w-12 text-[14px] font-bold text-charcoal shrink-0">{a.label}</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden ds-sunken">
                <div className="h-full rounded-full" style={{ width: `${v}%`, background: gaugeColor(v) }} />
              </div>
              <span className="w-7 text-[13px] text-text-muted text-right shrink-0">{v}</span>
            </div>
          )
        })}
        <p className="text-[14px] text-charcoal/70 leading-snug pt-1" style={OWNGLYPH}>
          다음달은 <span className="font-bold" style={{ color: "var(--pink)", ...FONT.title }}>{x.topAreaLabel}</span> 쪽으로 바람이 불어{data.areas[x.lowAreaKey] < 45 ? `, ${AREA_LABEL[x.lowAreaKey]} 쪽은 살짝 신경 써주면 좋아` : ""}.
        </p>
      </Section>

      <ChapterDivider n={3} title="이 달의 결" />

      {/* 이 달 켜지는 신살 */}
      {x.monthSinsalInfo && (
        <Section icon={DoodleSparkles} title="이번 달 켜지는 기운" basis="월지 신살">
          <div className="rounded-[var(--r-lg)] px-4 py-4 flex flex-col gap-2.5" style={{ background: CAT_STYLE[x.monthSinsalInfo.cat].bg, border: `2px solid ${CAT_STYLE[x.monthSinsalInfo.cat].ink}` }}>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shrink-0"><Ico as={x.monthSinsalInfo.D} size={26} /></span>
              <div className="min-w-0">
                <p className="text-[16px] leading-tight" style={{ ...FONT.title, color: CAT_STYLE[x.monthSinsalInfo.cat].ink }}>{x.monthSinsalInfo.alias} <span className="text-[13px] font-normal text-charcoal/50">ON</span></p>
                <p className="text-[13px] text-charcoal/55">{data.monthSinsal} · {x.monthSinsalInfo.cat}</p>
              </div>
            </div>
            <p className="text-[14px] text-charcoal/80 leading-snug" style={OWNGLYPH}>{x.monthSinsalInfo.mean}.</p>
            <div className="rounded-xl bg-white/70 px-3 py-2.5">
              <p className="text-[14px] text-charcoal/80 leading-relaxed">{x.monthSinsalInfo.good}</p>
            </div>
            <Link href="/v3/sinsal" className="text-[13px] font-bold text-right active:opacity-70" style={{ color: CAT_STYLE[x.monthSinsalInfo.cat].ink }}>내 신살 전체 보기 →</Link>
          </div>
        </Section>
      )}

      {/* 십신 테마 심화 */}
      <Section icon={x.theme.D} title="이 기운, 이렇게 써" basis="월운 십신" card bodyClass="flex flex-col gap-2">
        <p className="text-[14px] font-bold text-charcoal">{x.theme.title}</p>
        <p className="text-[14px] text-charcoal/75 leading-relaxed">{x.theme.use}</p>
      </Section>

      <ChapterDivider n={4} title="일진 캘린더" />

      {/* 다음달 달력 */}
      <Section icon={DoodleCalendar} title={`${data.monthLabel} 좋은 날·주의할 날`} basis="일진" card bodyClass="flex flex-col gap-3 !px-3.5">
        <CalendarGrid days={data.days} year={data.ym.year} month={data.ym.month} />
        <div className="flex items-center justify-center gap-4 text-[12px] text-text-muted pt-1 border-t border-charcoal/5">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#16A34A" }} />좋은 날</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#DC2626" }} />주의할 날</span>
        </div>
      </Section>

      {/* 좋은 날 / 조심할 날 요약 */}
      <div className="grid grid-cols-2 gap-2">
        <div className="ds-infobox ds-accent-ok px-3.5 py-3.5 flex flex-col gap-2">
          <p className="text-[13px] font-bold ds-ink">이런 날 움직여</p>
          {data.goodDays.length ? (
            <div className="flex flex-wrap gap-1.5">
              {data.goodDays.map(d => {
                const tag = data.days.find(xx => xx.day === d)?.tag
                return <span key={d} className="px-2 py-0.5 rounded-full text-[12px] font-bold bg-white/70 ds-ink">{d}일{tag ? `·${tag}` : ""}</span>
              })}
            </div>
          ) : <p className="text-[13px] text-charcoal/60">특별히 튀는 날 없이 고른 편이야.</p>}
        </div>
        <div className="ds-infobox ds-accent-warn px-3.5 py-3.5 flex flex-col gap-2">
          <p className="text-[13px] font-bold ds-ink">이런 날 한 박자 쉬어</p>
          {data.warnDays.length ? (
            <div className="flex flex-wrap gap-1.5">
              {data.warnDays.map(d => <span key={d} className="px-2 py-0.5 rounded-full text-[12px] font-bold bg-white/70 ds-ink">{d}일</span>)}
            </div>
          ) : <p className="text-[13px] text-charcoal/60">크게 조심할 날은 없어 — 무난해.</p>}
        </div>
      </div>
      <p className="text-[13px] text-text-muted leading-snug text-center" style={OWNGLYPH}>좋은 날엔 중요한 약속·결정을, 주의할 날엔 큰 선택을 미뤄두면 돼.</p>

      <ChapterDivider n={5} title="다음달 처방" />

      {/* 이 달의 미션 */}
      <div className="rounded-[var(--r-lg)] px-4 py-3.5 flex items-start gap-2.5" style={{ background: ELEM_BG[data.yong], border: `1px solid ${"var(--line-soft)"}` }}>
        <Ico as={x.mission.D} size={22} />
        <div className="min-w-0">
          <p className="text-[14px] font-bold text-charcoal leading-tight">이 달의 미션 ({data.yong} 채우기)</p>
          <p className="text-[14px] text-charcoal/70 leading-snug mt-0.5" style={OWNGLYPH}>{x.mission.act} — 나를 살리는 {data.yong} 기운이 보약이야.</p>
        </div>
      </div>

      {/* 행운 아이템 */}
      <Section icon={x.lucky.D} title="이 달의 행운 아이템" basis="용신">
        <div className="grid grid-cols-4 gap-2">
          {([["색", x.lucky.color], ["방향", x.lucky.dir], ["숫자", x.lucky.num], ["아이템", x.lucky.item]] as const).map(([k, v]) => (
            <Card key={k} className="px-2 py-2.5 flex flex-col items-center gap-0.5 text-center">
              <span className="text-[11px] text-text-muted">{k}</span>
              <span className="text-[12px] font-bold text-charcoal leading-tight">{v}</span>
            </Card>
          ))}
        </div>
      </Section>

      {/* 할 것 / 하지 말 것 */}
      <div className="grid grid-cols-2 gap-2">
        <div className="ds-infobox ds-accent-ok px-3.5 py-3.5 flex flex-col gap-1">
          <p className="text-[13px] font-bold ds-ink">이 달엔 이렇게</p>
          <p className="text-[13px] text-charcoal/75 leading-relaxed">{x.theme.use}</p>
        </div>
        <div className="ds-infobox ds-accent-warn px-3.5 py-3.5 flex flex-col gap-1">
          <p className="text-[13px] font-bold ds-ink">이건 한 박자 쉬어</p>
          <p className="text-[13px] text-charcoal/75 leading-relaxed">{data.chungCount > 0 ? "충 기운이 도는 달 — 큰 계약·이사·결별 같은 결정은 신중히." : data.monthElem === data.gi ? "무리한 확장·새 빚은 다음으로 — 키우기보다 지키기." : "욕심내서 일을 키우기보다, 벌인 것부터 매듭짓기."}</p>
        </div>
      </div>

      {/* ── 보너스 ── */}
      <div className="flex items-center gap-2.5 pt-3">
        <Ico as={DoodleSparkles} size={20} />
        <span className="text-[15px] text-charcoal shrink-0" style={FONT.title}>재미로 보는 다음달</span>
        <div className="flex-1 h-px" style={{ background: "var(--line-medium)" }} />
      </div>

      {/* 이번달 vs 다음달 */}
      <Card className="px-4 py-4 flex items-center gap-3">
        <div className="flex-1 text-center">
          <p className="text-[12px] text-text-muted">이번달</p>
          <p className="text-[20px]" style={{ ...FONT.title, color: "#94A3B8" }}>{data.thisFavor}</p>
        </div>
        <span className="text-[28px]" style={{ ...FONT.title, color: x.trend.color }}>{x.trend.arrow}</span>
        <div className="flex-1 text-center">
          <p className="text-[12px] text-text-muted">다음달</p>
          <p className="text-[20px]" style={{ ...FONT.title, color: "var(--pink)" }}>{data.favorMonth}</p>
        </div>
      </Card>
      <p className="text-[13px] text-text-muted leading-snug text-center -mt-3" style={OWNGLYPH}>{x.trend.line}</p>

      {/* 다음달 운세 카드 */}
      <div className="ds-card px-4 py-4 flex flex-col items-center gap-2 text-center" style={{ background: "var(--surface-card)" }}>
        <Ico as={x.weather.D} size={28} />
        <span className="text-[12px] text-text-muted">{data.monthLabel} 한 줄 운세</span>
        <p className="text-[17px]" style={{ ...FONT.title, color: "var(--pink)" }}>{x.weather.label}, {data.keywords[0] ? `#${data.keywords[0]}` : ""}의 달</p>
        <p className="text-[14px] text-charcoal/70 leading-snug" style={OWNGLYPH}>{x.topAreaLabel} 쪽으로 바람이 불어와.</p>
      </div>

      {/* consult 크로스셀 */}
      <Link href="/v3/consult" className="rounded-[var(--r-xl)] px-4 py-4 flex items-center gap-3 active:opacity-90 transition-opacity"
        style={{ background: "var(--surface-card)", border: "1px solid var(--line-soft)" }}>
        <Ico as={DoodleSpeechBubble} size={24} />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-charcoal" style={FONT.title}>다음달, 더 궁금한 건 물어봐</p>
          <p className="text-[14px] text-charcoal/60 leading-snug" style={OWNGLYPH}>내 사주 캐릭터한테 직접 — 시기·선택 뭐든</p>
        </div>
        <span className="text-[18px]" style={{ color: "var(--pink)" }}>→</span>
      </Link>
    </div>
  )
}
