// ════════════════════════════════════════════════════════════════
// SAJUPLAY 디자인 시스템 — 앱 전역 공용 컴포넌트 키트 (도메인 무관).
// 토큰: lib/ds.ts + globals.css(.ds-*) · 문서: DESIGN-SYSTEM.md · 쇼케이스: /design
//
// 규칙
//  · 색/섀도우는 토큰만. 리터럴 hex·하드 차콜 섀도우(0px 오프셋)·border-2 border-charcoal 금지.
//  · 아이콘은 두들(Ico) 사용. 시스템 이모지 최소화.
//  · 흰색 카드 대신 파스텔 서피스(.ds-card).
// ════════════════════════════════════════════════════════════════
import type { ReactNode } from "react"
import { FONT, ACCENT, GRADIENT, type Accent, type GradTheme } from "@/lib/ds"

export type DoodleC = React.FC<{ className?: string }>

/** 두들 아이콘 — 고정 컨테이너(shrink-0)로 줄 높이/넘침 방지. 이모지 대신 항상 이걸 사용. */
export function Ico({ as: D, size = 18, className = "" }: { as: DoodleC; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 align-middle ${className}`} style={{ width: size, height: size }}>
      <D className="w-full h-full" />
    </span>
  )
}

/** 표준 카드 — 파스텔 서피스 + 은은한 경계 + 소프트 섀도우. */
export function Card({ children, className = "", raised = false, flat = false }:
  { children: ReactNode; className?: string; raised?: boolean; flat?: boolean }) {
  return <div className={`${flat ? "ds-card-flat" : "ds-card"} ${raised ? "ds-raised" : ""} ${className}`}>{children}</div>
}

/** 의미색 인포박스 — 아이콘 + 제목 + 본문. 화면 곳곳의 "색 박스" 통합. */
export function InfoBox({ accent = "info", icon, title, children, iconSize = 18, className = "" }:
  { accent?: Accent; icon?: DoodleC; title?: ReactNode; children?: ReactNode; iconSize?: number; className?: string }) {
  return (
    <div className={`ds-infobox ds-accent-${accent} px-4 py-3.5 flex items-start gap-2.5 ${className}`}>
      {icon && <Ico as={icon} size={iconSize} />}
      <div className="min-w-0 flex-1">
        {title && <p className="text-[14px] font-bold text-charcoal leading-tight">{title}</p>}
        {children && <div className="text-[14px] text-charcoal/75 leading-relaxed mt-0.5">{children}</div>}
      </div>
    </div>
  )
}

/** 데이터 출처 배지 — 섹션이 무엇에 근거하는지. */
export function Basis({ children }: { children: ReactNode }) {
  return (
    <span className="ds-accent-love ds-ink inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-bold shrink-0"
      style={{ background: ACCENT.love.bg }}>{children}</span>
  )
}

/** 섹션 제목 — 두들 + 텍스트(+ 선택 출처 배지). 결과 화면 헤더 표준. */
export function SectionTitle({ icon, children, basis }: { icon: DoodleC; children: ReactNode; basis?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <p className="text-[15px] text-charcoal flex items-center gap-1.5 min-w-0" style={FONT.title}>
        <Ico as={icon} size={18} /> {children}
      </p>
      {basis != null && <Basis>{basis}</Basis>}
    </div>
  )
}

/** 섹션 묶음 — 제목(+출처) + 본문을 한 번에. `<div flex-col gap><SectionTitle/>…</div>` 반복 제거.
 *  card=true면 본문을 표준 카드로 감싼다(가장 흔한 케이스). 그래프/그리드 등은 card=false. */
export function Section({ icon, title, basis, children, card = false, bodyClass = "" }:
  { icon: DoodleC; title: ReactNode; basis?: ReactNode; children: ReactNode; card?: boolean; bodyClass?: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <SectionTitle icon={icon} basis={basis}>{title}</SectionTitle>
      {card ? <Card className={`px-4 py-4 ${bodyClass}`}>{children}</Card> : <>{children}</>}
    </div>
  )
}

/** 챕터 구분선 — 번호 칩 + 제목 + 가는 선. */
export function ChapterDivider({ n, title }: { n: number | string; title: string }) {
  return (
    <div className="flex items-center gap-2.5 pt-3">
      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0"
        style={{ background: "var(--pink)" }}>{n}</span>
      <span className="text-[15px] text-charcoal shrink-0" style={FONT.title}>{title}</span>
      <div className="flex-1 h-px" style={{ background: "var(--line-medium)" }} />
    </div>
  )
}

/** 히어로 박스 — 위계 최상위·AI 요약 시그니처. 핵심 그라디언트(surface) 배경 + 소프트 섀도우.
 *  theme: 디폴트 pink, 오행 커스텀 시 목/화/토/금/수. */
export function Hero({ icon, title, basis, children, theme = "pink", className = "" }:
  { icon?: DoodleC; title: ReactNode; basis?: ReactNode; children?: ReactNode; theme?: GradTheme; className?: string }) {
  const grad = GRADIENT[theme]
  return (
    <div className={`rounded-[var(--r-xl)] px-4 py-4 flex flex-col gap-3 ${className}`}
      style={{ background: grad.surface, border: "1px solid var(--line-soft)" }}>
      <div className="flex items-center gap-2">
        {icon && <Ico as={icon} size={20} />}
        <span className="text-[15px] text-charcoal" style={FONT.title}>{title}</span>
        {basis != null && <span className="ml-auto"><Basis>{basis}</Basis></span>}
      </div>
      {children}
    </div>
  )
}

/** 핵심 그라디언트 강조 칩/배지/CTA — bold 그라디언트 + 흰 텍스트. 대표 수치·핵심 행동 강조용. */
export function GradBadge({ children, theme = "pink", className = "", as: Tag = "span" }:
  { children: ReactNode; theme?: GradTheme; className?: string; as?: "span" | "div" }) {
  return (
    <Tag className={`inline-flex items-center justify-center text-white font-bold rounded-full px-3 py-1 ${className}`}
      style={{ background: GRADIENT[theme].bold }}>
      {children}
    </Tag>
  )
}

/** **굵게** 마크업 인라인 렌더. */
export function renderBold(s: string) {
  return s.split(/(\*\*[^*]+\*\*)/g).map((seg, i) =>
    seg.startsWith("**") && seg.endsWith("**")
      ? <strong key={i} className="text-charcoal font-bold">{seg.slice(2, -2)}</strong>
      : <span key={i}>{seg}</span>)
}

/** 문단 본문 — 빈 줄로 단락 분리, **굵게** 지원. */
export function Prose({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      {text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).map((p, i) =>
        <p key={i} className="text-[14px] text-charcoal/85 leading-relaxed">{renderBold(p)}</p>)}
    </div>
  )
}
