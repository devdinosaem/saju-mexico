"use client"
// ════════════════════════════════════════════════════════════════
// SinsalReportV2 — "내 신살 도감" 결과 본문 (디자인 시스템 적용판).
// v1(report.tsx)과 동일 콘텐츠·데이터(deriveSinsal). 표현만 키트로:
//   흰 카드 · 섀도우 제거 · 색 박스→InfoBox · 그라디언트 Hero(오행+테두리) ·
//   폰트(감성=박다현/본문=Pretendard) · 프로필 보강 · Section depth 평탄화
// 비교: /v3/sinsal/compare
// ════════════════════════════════════════════════════════════════
import Link from "next/link"
import { POS_LABEL, type Pos, type SinsalData } from "./sinsal-adapter"
import { SINSAL, CAT_STYLE, STAT_LABEL, type SinsalStat } from "./flavor"
import { deriveSinsal, SinsalBadge, SinsalCard, Radar, Avatar, resolveChar, POS_ORDER, POS_MEAN } from "./report"
import { FONT } from "@/lib/ds"
import { Ico, Card, InfoBox, Section, ChapterDivider, Hero, Prose, GradBadge } from "@/components/ds"
import {
  DoodleSparkles, DoodleBook, DoodleKey, DoodleTaegeuk, DoodleHeart,
  DoodleStar, DoodleSpeechBubble, DoodleQuestionMark, DoodleLightning,
  DoodleClover, DoodleCalendar,
} from "@/components/doodles"

/** 감성 포인트 손글씨 — 온글잎 박다현체. 짧은 어절·감성 한 줄에만. (단일 두께라 bold 금지) */
const OWNGLYPH: React.CSSProperties = { fontFamily: "'Ownglyph ParkDaHyun', var(--font-pretendard)" }

export function SinsalReportV2({ data, aiText, aiLoading = false }: { data: SinsalData; aiText: string; aiLoading?: boolean }) {
  const x = deriveSinsal(data)
  const charKey = resolveChar(data.iljuKey)

  return (
    <div className="flex flex-col gap-6">
      {/* 내 신살 정밀 풀이 — AI 요약 히어로(그라디언트 + 오행 테두리) */}
      <Hero icon={DoodleSparkles} title="내 신살 정밀 풀이" basis="신살 종합" theme="pink" borderColor="var(--black)" borderWidth={2}>
        {aiLoading ? (
          <div className="flex flex-col gap-2 py-1">
            {[100, 96, 100, 72].map((w, i) => <div key={i} className="h-3 rounded-full bg-charcoal/10 animate-pulse" style={{ width: `${w}%` }} />)}
            <p className="text-[13px] text-text-muted mt-1">신살을 하나씩 풀어보는 중…</p>
          </div>
        ) : <Prose text={aiText} />}
      </Hero>

      <ChapterDivider n={1} title="내가 가진 신살은" />

      {/* 나의 시그니처 */}
      <Section icon={DoodleStar} title="나의 시그니처" basis="대표 신살">
        <div className="rounded-[var(--r-lg)] px-4 py-4 flex flex-col gap-3" style={{ background: x.sigCs.bg, border: `2px solid ${x.sigCs.ink}` }}>
          <div className="flex items-center gap-3">
            <span className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shrink-0"><Ico as={x.sigInfo.D} size={30} /></span>
            <div className="min-w-0">
              <p className="text-[18px] leading-tight" style={{ ...FONT.title, color: x.sigCs.ink }}>{x.sigInfo.alias}</p>
              <p className="text-[13px] text-charcoal/55">{x.sig} · {x.sigInfo.cat}</p>
            </div>
          </div>
          <p className="text-[14px] text-charcoal/80 leading-snug" style={OWNGLYPH}>{x.sigInfo.mean}.</p>
          <div className="rounded-xl bg-white/70 px-3 py-2.5">
            <p className="text-[14px] text-charcoal/80 leading-relaxed">{x.sigInfo.good}</p>
          </div>
        </div>
      </Section>

      {/* 보유 신살 도감 */}
      <Section icon={DoodleBook} title={`내 신살 도감 · ${data.ownedCount}개`} basis="원국 종합">
        <div className="grid grid-cols-2 gap-2">
          {data.owned.map(o => <SinsalBadge key={o.name} name={o.name} sub={`${o.positions.length}자리`} />)}
        </div>
        <p className="text-[14px] text-charcoal/55 leading-snug" style={OWNGLYPH}>무서운 이름도 사실은 다 너의 특수 속성이야. 다음 장에서 하나씩 풀어줄게.</p>
      </Section>

      {/* 신살 능력치 */}
      <Section icon={DoodleLightning} title="내 신살 능력치" basis="신살 분포" card bodyClass="flex flex-col gap-1">
        <Radar data={x.statData} />
        <p className="text-[14px] text-charcoal/70 leading-snug text-center" style={OWNGLYPH}>
          제일 센 건 <span className="font-bold" style={{ color: "var(--pink)", ...FONT.title }}>{STAT_LABEL[x.topStat.label as SinsalStat]}</span> — 여기에 네 무기가 몰려 있어.
        </p>
      </Section>

      {/* 6분류 묶음 */}
      <Section icon={DoodleTaegeuk} title="신살, 결대로 묶어보면" basis="카테고리">
        <div className="flex flex-col gap-2">
          {x.byCat.map(({ cat, items }) => {
            const cs = CAT_STYLE[cat]
            return (
              <div key={cat} className="rounded-[var(--r-lg)] px-3.5 py-3 flex items-start gap-2.5" style={{ background: cs.bg }}>
                <span className="text-[13px] font-bold shrink-0 mt-0.5 px-2 py-0.5 rounded-full bg-white/70" style={{ color: cs.ink }}>{cat}</span>
                <p className="text-[14px] text-charcoal/75 leading-snug pt-0.5">{items.map(o => SINSAL[o.name].alias).join(" · ")}</p>
              </div>
            )
          })}
        </div>
      </Section>

      <ChapterDivider n={2} title="무서운 이름, 사실은" />

      {/* 신살 풀 카드 도감 */}
      <Section icon={DoodleBook} title="신살 하나씩 펼치기" basis="신살 풀이">
        <div className="flex flex-col gap-3">
          {data.owned.map(o => <SinsalCard key={o.name} name={o.name} positions={o.positions} />)}
        </div>
        <p className="text-[14px] text-charcoal/55 leading-snug" style={OWNGLYPH}>겁주는 이름은 다 옛날식 작명일 뿐 — 네가 가진 건 전부 쓸 수 있는 힘이야.</p>
      </Section>

      <ChapterDivider n={3} title="어디에 있냐면" />

      {/* 자리별 신살 */}
      <Section icon={DoodleStar} title="자리마다 다른 신살" basis="년·월·일·시">
        <div className="flex flex-col gap-2">
          {POS_ORDER.map(p => {
            const stars = x.posStars(p), isMe = p === "day"
            return (
              <div key={p} className="rounded-[var(--r-lg)] px-4 py-3 flex flex-col gap-1.5"
                style={isMe ? { background: "var(--love-bg)", border: "1.5px solid var(--love-line)" } : { background: "var(--surface-card)", border: "1px solid var(--line-soft)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-charcoal">{POS_LABEL[p].era}</span>
                  <span className="text-[12px] text-text-muted">{POS_LABEL[p].area}</span>
                  {isMe && <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full text-white shrink-0" style={{ background: "var(--pink)" }}>나</span>}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stars.map(n => {
                    const cs = CAT_STYLE[SINSAL[n].cat]
                    return <span key={n} className="text-[12px] font-bold px-2 py-0.5 rounded-full" style={{ background: cs.bg, color: cs.ink }}>{SINSAL[n].alias}</span>
                  })}
                </div>
                <p className="text-[13px] text-charcoal/60 leading-snug">{POS_MEAN[p]}</p>
              </div>
            )
          })}
        </div>
      </Section>

      <ChapterDivider n={4} title="신살끼리 만나면" />

      {/* 시너지 */}
      <Section icon={DoodleSparkles} title="내 신살 시너지" basis="능력치 조합">
        {x.synergies.length > 0 ? (
          <div className="flex flex-col gap-2">
            {x.synergies.map((s, i) => (
              <Card key={i} className="px-4 py-3 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0 mt-0.5" style={{ background: "var(--pink)" }}>{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-charcoal leading-tight">{s.alias} <span className="text-[12px] text-text-muted font-normal">· {STAT_LABEL[s.a]}+{STAT_LABEL[s.b]}</span></p>
                  <p className="text-[14px] text-charcoal/70 leading-snug" style={OWNGLYPH}>{s.line}</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="px-4 py-4 text-center">
            <p className="text-[14px] text-charcoal/60 leading-snug" style={OWNGLYPH}>한 가지 힘에 집중된 타입 — 시그니처 «{x.sigInfo.alias}» 하나로 승부 보는 스타일이야.</p>
          </Card>
        )}
      </Section>

      <ChapterDivider n={5} title="살릴 건 살리고" />

      {/* 길성 활용 */}
      <Section icon={DoodleClover} title="이건 키워" basis="길성·재능">
        {x.blessUse.length > 0 ? (
          <div className="ds-infobox ds-accent-ok px-4 py-4 flex flex-col gap-3">
            {x.blessUse.map(o => {
              const info = SINSAL[o.name]
              return (
                <div key={o.name} className="flex items-start gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shrink-0"><Ico as={info.D} size={18} /></span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-charcoal leading-tight">{info.alias}</p>
                    <p className="text-[14px] text-charcoal/70 leading-snug">{info.use}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <InfoBox accent="ok" icon={DoodleClover} title="우직한 한 길">화려한 길성은 적지만, 그만큼 한 길을 우직하게 파는 힘이 있어 — 꾸준함이 네 무기야.</InfoBox>
        )}
      </Section>

      {/* 흉살 안심 */}
      {x.scary.length > 0 && (
        <Section icon={DoodleHeart} title="겁낼 것 없어" basis="안심 처방">
          <div className="ds-infobox ds-accent-warn px-4 py-4 flex flex-col gap-3">
            <p className="text-[14px] text-charcoal/80 leading-snug" style={OWNGLYPH}>이름이 무서운 살들, 사실은 다 다룰 수 있는 힘이야. 이렇게만 기억해 둬.</p>
            {x.scary.map(o => {
              const info = SINSAL[o.name]
              return (
                <div key={o.name} className="rounded-xl bg-white/70 px-3 py-2.5 flex items-start gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0"><Ico as={info.D} size={18} /></span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-charcoal leading-tight">{info.alias} <span className="text-[12px] text-text-muted font-normal">· {o.name}</span></p>
                    <p className="text-[13px] text-charcoal/70 leading-snug">{info.caution}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Section>
      )}

      <ChapterDivider n={6} title="올해의 신살" />

      {/* 올해 들어오는 신살 */}
      {x.seunInfo && (
        <Section icon={DoodleCalendar} title={`${data.curYear}년의 기운`} basis="세운">
          <div className="rounded-[var(--r-lg)] px-4 py-4 flex flex-col gap-3" style={{ background: CAT_STYLE[x.seunInfo.cat].bg, border: `2px solid ${CAT_STYLE[x.seunInfo.cat].ink}` }}>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shrink-0"><Ico as={x.seunInfo.D} size={26} /></span>
              <div className="min-w-0">
                <p className="text-[16px] leading-tight" style={{ ...FONT.title, color: CAT_STYLE[x.seunInfo.cat].ink }}>{x.seunInfo.alias}</p>
                <p className="text-[13px] text-charcoal/55">{data.seunSinsal}{data.seunOwned ? " · 원래 가진 기운이 더 세지는 해" : " · 올해 새로 들어오는 기운"}</p>
              </div>
            </div>
            <p className="text-[14px] text-charcoal/80 leading-snug" style={OWNGLYPH}>{x.seunInfo.mean}.</p>
            <div className="rounded-xl bg-white/70 px-3 py-2.5 flex flex-col gap-1.5">
              <p className="text-[13px] text-charcoal/75 leading-snug"><span className="font-bold" style={{ color: "var(--pink)" }}>이렇게 써 · </span>{x.seunInfo.use}</p>
              <p className="text-[13px] text-charcoal/75 leading-snug"><span className="font-bold" style={{ color: "var(--pink)" }}>이건 살짝 · </span>{x.seunInfo.caution}</p>
            </div>
            <p className="text-[13px] text-charcoal/55 leading-snug" style={OWNGLYPH}>무리해서 판을 뒤집기보다, 올해 들어온 이 결에 맞춰 한 발씩 가면 돼.</p>
          </div>
        </Section>
      )}

      {/* ── 보너스 ── */}
      <div className="flex items-center gap-2.5 pt-3">
        <Ico as={DoodleSparkles} size={20} />
        <span className="text-[15px] text-charcoal shrink-0" style={FONT.title}>재미로 보는 신살</span>
        <div className="flex-1 h-px" style={{ background: "var(--line-medium)" }} />
      </div>

      {/* 신살 한 줄 캐릭터 — 프로필 */}
      <div className="ds-card px-4 py-4 flex items-center gap-3" style={{ background: "var(--surface-card)" }}>
        <Avatar iljuKey={charKey} size={52} />
        <div className="min-w-0 flex-1">
          <span className="text-[12px] text-text-muted">내 신살을 한 줄로</span>
          <p className="text-[19px] leading-tight" style={{ ...FONT.title, color: "var(--pink)" }}>{x.charHead}</p>
          <p className="text-[14px] text-charcoal/70 leading-snug mt-0.5" style={OWNGLYPH}>{x.charLine}</p>
        </div>
      </div>

      {/* 희귀도 + 한 줄 밈 */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="px-3 py-3.5 flex flex-col items-center gap-1 text-center">
          <Ico as={DoodleKey} size={18} />
          <span className="text-[12px] text-text-muted">도감 희귀도</span>
          <span className="text-[15px]" style={{ ...FONT.title, color: "var(--pink)" }}>{x.rarity}</span>
        </Card>
        <div className="ds-card flex flex-col items-center justify-center gap-1 text-center px-3 py-3.5" style={{ background: "var(--surface-card)" }}>
          <span className="text-[12px] text-text-muted">한 줄 요약</span>
          <span className="text-[15px]" style={{ ...FONT.title, color: "var(--pink)" }}>{x.meme}</span>
        </div>
      </div>

      {/* consult 크로스셀 */}
      <Link href="/v3/consult" className="rounded-[var(--r-xl)] px-4 py-4 flex items-center gap-3 active:opacity-90 transition-opacity"
        style={{ background: "var(--surface-card)", border: "1px solid var(--line-soft)" }}>
        <Ico as={DoodleSpeechBubble} size={24} />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-charcoal" style={FONT.title}>더 궁금한 건 대화로 물어봐</p>
          <p className="text-[14px] text-charcoal/60 leading-snug" style={OWNGLYPH}>내 사주 캐릭터한테 직접 — 신살·운세 뭐든</p>
        </div>
        <span className="text-[18px]" style={{ color: "var(--pink)" }}>→</span>
      </Link>
    </div>
  )
}
