"use client"
// ════════════════════════════════════════════════════════════════
// SAJUPLAY 디자인 시스템 — 라이브 쇼케이스 (공유용).
// 토큰/폰트/섀도우/컴포넌트를 한 화면에서 확인. 문서: DESIGN-SYSTEM.md
// ════════════════════════════════════════════════════════════════
import { FONT, ACCENT, type Accent } from "@/lib/ds"
import { Card, InfoBox, SectionTitle, ChapterDivider, Hero, Prose, Basis, Ico } from "@/components/ds"
import {
  DoodleSparkles, DoodleHeart, DoodleStar, DoodleLightning, DoodleCrown,
  DoodleSpeechBubble, DoodleMoon, DoodleBook, DoodleKey, DoodleClover,
} from "@/components/doodles"

const SURFACES = [
  { name: "page", v: "#FDF6EE", note: "페이지 바탕" },
  { name: "card", v: "#FFFCF6", note: "기본 카드(순백 아님)" },
  { name: "raised", v: "#FFFFFF", note: "한 단계 위 요소" },
  { name: "sunken", v: "#F6EEE2", note: "트랙·인셋" },
]
const ACCENTS: { key: Accent; label: string }[] = [
  { key: "love", label: "love · 연애·하이라이트" },
  { key: "info", label: "info · 정보·전환점" },
  { key: "warn", label: "warn · 주의·재물" },
  { key: "ok", label: "ok · 긍정·건강" },
  { key: "special", label: "special · 특별·신비" },
]
const SHADOWS = [
  { name: "sm", v: "var(--shadow-sm)", note: "카드" },
  { name: "md", v: "var(--shadow-md)", note: "히어로·떠있는 카드" },
  { name: "lg", v: "var(--shadow-lg)", note: "시트·모달" },
  { name: "pop", v: "var(--shadow-pop)", note: "핑크 CTA" },
]

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] text-text-muted mb-2" style={FONT.title}>{children}</p>
}

export default function DesignSystemPage() {
  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100dvh", letterSpacing: "var(--tracking-base)" }}>
      <div className="max-w-[480px] mx-auto px-4 py-8 flex flex-col gap-9">

        {/* 헤더 */}
        <div className="flex flex-col gap-1">
          <p className="text-[26px] text-charcoal" style={FONT.title}>SAJUPLAY 디자인 시스템</p>
          <p className="text-[14px] text-charcoal/70" style={FONT.flavor}>토큰 · 폰트 · 섀도우 · 컴포넌트 한눈에 — 공유용 쇼케이스</p>
        </div>

        {/* 1. 폰트 */}
        <section>
          <ChapterDivider n={1} title="폰트 — 역할 3종" />
          <div className="flex flex-col gap-3 pt-3">
            <Card className="px-4 py-3.5">
              <p className="text-[11px] text-text-muted mb-1">제목·강조·브랜드 — BinggraeTaom</p>
              <p className="text-[22px] text-charcoal" style={FONT.title}>나를 살리는 우주의 힌트</p>
            </Card>
            <Card className="px-4 py-3.5">
              <p className="text-[11px] text-text-muted mb-1">감성 카피·말맛·인용 — Cafe24Dongdong</p>
              <p className="text-[16px] text-charcoal" style={FONT.flavor}>&ldquo;준비됐든 안 됐든 오긴 와&rdquo;</p>
            </Card>
            <Card className="px-4 py-3.5">
              <p className="text-[11px] text-text-muted mb-1">기능·데이터·긴 본문 — Pretendard(기본)</p>
              <p className="text-[14px] text-charcoal/85 leading-relaxed">
                길게 읽는 본문과 라벨·수치는 가독성 좋은 Pretendard로. 감성 폰트는 짧은 한 줄에만 써서 위계를 살린다.
              </p>
            </Card>
          </div>
        </section>

        {/* 2. 색 */}
        <section>
          <ChapterDivider n={2} title="색 토큰" />
          <div className="flex flex-col gap-4 pt-3">
            <div>
              <Label>서피스 — 흰색 대신 파스텔</Label>
              <div className="grid grid-cols-4 gap-2">
                {SURFACES.map(s => (
                  <div key={s.name} className="flex flex-col gap-1">
                    <div className="h-12 rounded-[var(--r-md)]" style={{ background: s.v, border: "1px solid var(--line-soft)" }} />
                    <p className="text-[11px] font-bold text-charcoal">{s.name}</p>
                    <p className="text-[10px] text-text-muted leading-tight">{s.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>의미색 5종 — bg / line / ink</Label>
              <div className="flex flex-col gap-2">
                {ACCENTS.map(a => (
                  <div key={a.key} className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-7 h-7 rounded-lg" style={{ background: ACCENT[a.key].bg, border: `1px solid ${ACCENT[a.key].line}` }} />
                      <span className="w-7 h-7 rounded-lg" style={{ background: ACCENT[a.key].ink }} />
                    </div>
                    <p className="text-[12px] text-charcoal/80">{a.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. 섀도우 — 하드 vs 소프트 */}
        <section>
          <ChapterDivider n={3} title="섀도우 — 소프트만" />
          <div className="pt-3 flex flex-col gap-4">
            <div>
              <Label>❌ 안티패턴 — 하드 차콜 섀도우 / 두꺼운 외곽선</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 rounded-2xl flex items-center justify-center text-[12px] text-charcoal/70 bg-white"
                  style={{ border: "2px solid #2D2D2D", boxShadow: "3px 3px 0px #2D2D2D" }}>네오브루탈</div>
                <div className="h-16 rounded-2xl flex items-center justify-center text-[12px] text-charcoal/70 bg-white"
                  style={{ border: "2px solid #2D2D2D", boxShadow: "0 -4px 0px #2D2D2D" }}>하드 시트</div>
              </div>
            </div>
            <div>
              <Label>✅ 소프트 섀도우 — 블러 + 낮은 불투명도</Label>
              <div className="grid grid-cols-2 gap-3">
                {SHADOWS.map(s => (
                  <div key={s.name} className="h-16 rounded-[var(--r-lg)] flex flex-col items-center justify-center gap-0.5"
                    style={{ background: "var(--surface-card)", border: "1px solid var(--line-soft)", boxShadow: s.v }}>
                    <span className="text-[13px] font-bold text-charcoal">{s.name}</span>
                    <span className="text-[10px] text-text-muted">{s.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. 컴포넌트 */}
        <section>
          <ChapterDivider n={4} title="컴포넌트" />
          <div className="pt-3 flex flex-col gap-5">

            <div className="flex flex-col gap-2.5">
              <SectionTitle icon={DoodleStar} basis="출처 배지">SectionTitle + Basis</SectionTitle>
              <Card className="px-4 py-3.5">
                <p className="text-[13px] text-charcoal/70" style={FONT.flavor}>섹션 헤더 표준 — 두들 + 제목 + 오른쪽 출처 배지.</p>
              </Card>
            </div>

            <div className="flex flex-col gap-2.5">
              <Label>Hero</Label>
              <Hero icon={DoodleSparkles} title="나 정밀 풀이" basis="원국 종합">
                <Prose text={"원국 전체를 읽어 **너라는 사람**을 한 장으로 정리했어.\n\n강점과 빈틈, 흐름까지 — 여기서 시작하자."} />
              </Hero>
            </div>

            <div className="flex flex-col gap-2.5">
              <Label>InfoBox — 의미색 5종</Label>
              <InfoBox accent="love" icon={DoodleHeart} title="연애 스타일">끌어당기는 힘이 있어.</InfoBox>
              <InfoBox accent="info" icon={DoodleStar} title="다음 전환점 · 38세">결이 한 단계 트여.</InfoBox>
              <InfoBox accent="warn" icon={DoodleLightning} title="번아웃 신호">혼자 다 짊어질 때가 방전 신호.</InfoBox>
              <InfoBox accent="ok" icon={DoodleClover} title="건강 신호등">이 기운만 챙기면 컨디션이 좋아져.</InfoBox>
              <InfoBox accent="special" icon={DoodleMoon} title="전생의 나">달빛 아래 글을 쓰던 사람.</InfoBox>
            </div>

            <div className="flex flex-col gap-2.5">
              <Label>Card (raised) + CTA</Label>
              <Card raised className="px-4 py-4 flex items-center gap-3">
                <Ico as={DoodleBook} size={28} />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] text-charcoal" style={FONT.title}>나 사용설명서</p>
                  <p className="text-[13px] text-charcoal/60" style={FONT.flavor}>취급주의·충전법·인생 그래프까지</p>
                </div>
                <button className="ds-cta px-3.5 py-2 text-[13px] font-bold">2,900원</button>
              </Card>
            </div>

            <div className="flex flex-col gap-2.5">
              <Label>Basis 칩 / 두들 아이콘</Label>
              <div className="flex flex-wrap items-center gap-2">
                <Basis>일주</Basis><Basis>오행 분포</Basis><Basis>대운</Basis>
                {[DoodleCrown, DoodleKey, DoodleSpeechBubble, DoodleHeart].map((D, i) => <Ico key={i} as={D} size={24} />)}
              </div>
            </div>

          </div>
        </section>

        <p className="text-[12px] text-text-muted text-center pt-2" style={FONT.flavor}>
          토큰: globals.css · lib/ds.ts · 컴포넌트: components/ds.tsx · 문서: DESIGN-SYSTEM.md
        </p>
      </div>
    </div>
  )
}
