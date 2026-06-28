// ════════════════════════════════════════════════════════════════
// SAJUPLAY 디자인 시스템 토큰 (TS 미러) — SSOT는 globals.css의 CSS 변수.
// 인라인 style이 필요한 곳에서만 사용. className으로 가능하면 .ds-* 유틸/Tailwind를 우선.
// 문서: packages/web-kr/DESIGN-SYSTEM.md · 쇼케이스: /design
// ════════════════════════════════════════════════════════════════
import type { CSSProperties } from "react"

/* ── 폰트 역할 (3종 · 기준 일관) ──
   title  = 제목·강조·브랜드   (BinggraeTaom)
   flavor = 감성 카피·말맛·인용 (Cafe24Dongdong)
   base   = 기능·데이터·긴 본문 (Pretendard, 기본값이므로 보통 지정 불필요) */
export const FONT = {
  title:  { fontFamily: "var(--font-title)",  fontWeight: 700 } as CSSProperties,
  flavor: { fontFamily: "var(--font-flavor)" } as CSSProperties,
} as const

/** @deprecated FONT.title 사용 */
export const BINGGRAE = FONT.title
/** @deprecated FONT.flavor 사용 */
export const GAEGU = FONT.flavor

export const COLOR = {
  pink: "var(--pink)",
  pinkSoft: "var(--pink-soft)",
  ink: "var(--text-main)",
  inkSub: "var(--text-sub)",
  inkMuted: "var(--text-muted)",
  line: "var(--line-soft)",
  lineMedium: "var(--line-medium)",
} as const
/** @deprecated COLOR.pink 사용 — 리터럴 hex 금지 */
export const PINK = "var(--pink)"

export const SURFACE = {
  page: "var(--surface-page)",
  card: "var(--surface-card)",
  raised: "var(--surface-raised)",
  sunken: "var(--surface-sunken)",
} as const

export const SHADOW = {
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  pop: "var(--shadow-pop)",
} as const

export const RADIUS = {
  sm: "var(--r-sm)", md: "var(--r-md)", lg: "var(--r-lg)", xl: "var(--r-xl)", full: "999px",
} as const

/** 의미색 5종 — bg(파스텔 표면)/line(경계)/ink(텍스트·아이콘) */
export type Accent = "love" | "info" | "warn" | "ok" | "special"
export const ACCENT: Record<Accent, { bg: string; line: string; ink: string }> = {
  love:    { bg: "var(--love-bg)",    line: "var(--love-line)",    ink: "var(--love-ink)" },
  info:    { bg: "var(--info-bg)",    line: "var(--info-line)",    ink: "var(--info-ink)" },
  warn:    { bg: "var(--warn-bg)",    line: "var(--warn-line)",    ink: "var(--warn-ink)" },
  ok:      { bg: "var(--ok-bg)",      line: "var(--ok-line)",      ink: "var(--ok-ink)" },
  special: { bg: "var(--special-bg)", line: "var(--special-line)", ink: "var(--special-ink)" },
}
