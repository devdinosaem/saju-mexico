"use client"
// ════════════════════════════════════════════════════════════════
// 사주 풀이 공용 UI 키트 — 디자인 계약(두들 Ico, 14px floor, 메인 핑크) 고정.
// 이모지 금지: 아이콘은 전부 <Ico as={Doodle} />.
// ════════════════════════════════════════════════════════════════
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { elemOf, type Elem } from "./engine"
import { ELEM_BG, ELEM_COLOR, ELEM_DOODLE, ELEM_STICKER_RATIO } from "./flavor"

export type DoodleC = React.FC<{ className?: string }>
export const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
export const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
export const PINK = "#E84B6A"

/** 두들 아이콘 — 고정 컨테이너(shrink-0)로 줄 높이/넘침 방지. 이모지 대신 항상 이걸 사용. */
export function Ico({ as: D, size = 18 }: { as: DoodleC; size?: number }) {
  return (
    <span className="inline-flex items-center justify-center shrink-0 align-middle" style={{ width: size, height: size }}>
      <D className="w-full h-full" />
    </span>
  )
}

/** 일주 캐릭터 원형 아바타. */
export function Avatar({ iljuKey, size = 56 }: { iljuKey: string; size?: number }) {
  return (
    <div className="rounded-full overflow-hidden border-2 border-charcoal/15 shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: ELEM_BG[elemOf(iljuKey)] }}>
      {ILJU_SVG_ICONS[iljuKey]?.(getIljuProfileViewBox(iljuKey))}
    </div>
  )
}

// ── 오행 컴포넌트 (표준) ──────────────────────────────────────────
// 오행 두들 스티커는 표준 5종(preview-ilju: 목 Wood·화 FlameFive·토 Earth·금 Metal·수 Water)만 쓰고,
// 반드시 컨테이너에 담는다. 직접 두들을 노출하지 말고 이 컴포넌트를 쓸 것.

/** 오행 두들 스티커 — 표준 두들 + 필수 컨테이너(회색 선 테두리, 섀도우 없음).
 *  size=글리프 높이(px). bg: "card"(기본 파스텔) | "tint"(오행 배경색). */
export function ElementSticker({ elem, size = 28, bg = "card", className = "" }:
  { elem: Elem; size?: number; bg?: "card" | "tint"; className?: string }) {
  const [w, h] = ELEM_STICKER_RATIO[elem]
  const D = ELEM_DOODLE[elem]
  const pad = Math.round(size * 0.42)
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ padding: pad, borderRadius: "var(--r-lg)", background: bg === "tint" ? ELEM_BG[elem] : "var(--surface-card)", border: "1px solid var(--line-soft)" }}>
      <span className="inline-flex" style={{ width: Math.round((size * w) / h), height: size }}>
        <D className="w-full h-full" />
      </span>
    </span>
  )
}

/** 오행 원형 뱃지 — 컴팩트한 오행 정체성(테두리 원). 작은 자리·라벨 옆에. */
export function ElementBadge({ elem, size = 48 }: { elem: Elem; size?: number }) {
  return (
    <span className="inline-flex shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 60 60" className="w-full h-full" fill="none">
        <circle cx="30" cy="30" r="28" fill={ELEM_BG[elem]} stroke={ELEM_COLOR[elem]} strokeWidth="1.5" />
        {ELEM_BADGE_INNER[elem]}
      </svg>
    </span>
  )
}

// 원형 뱃지 내부 아트 — preview-ilju 표준 그대로.
const ELEM_BADGE_INNER: Record<Elem, React.ReactNode> = {
  목: (<>
    <rect x="27" y="36" width="6" height="12" rx="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5" />
    <circle cx="30" cy="26" r="13" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5" />
    <circle cx="26" cy="24" r="1.8" fill="#2D2D2D" /><circle cx="34" cy="24" r="1.8" fill="#2D2D2D" />
    <path d="M27 30 Q30 33 33 30" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    <ellipse cx="22" cy="28" rx="2.5" ry="1.2" fill="#4ADE80" opacity="0.5" /><ellipse cx="38" cy="28" rx="2.5" ry="1.2" fill="#4ADE80" opacity="0.5" />
    <path d="M40 20 Q44 17 42 23" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="0.8" />
  </>),
  화: (<>
    <path d="M30 6 C30 6 14 22 14 32 A16 16 0 0 0 46 32 C46 22 30 6 30 6Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5" />
    <path d="M30 18 C30 18 22 28 22 33 A8 8 0 0 0 38 33 C38 28 30 18 30 18Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" />
    <circle cx="26" cy="30" r="1.8" fill="#2D2D2D" /><circle cx="34" cy="30" r="1.8" fill="#2D2D2D" />
    <path d="M27 36 Q30 39 33 36" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    <ellipse cx="22" cy="34" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.4" /><ellipse cx="38" cy="34" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.4" />
  </>),
  토: (<>
    <path d="M8 46 L30 12 L52 46 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M22 20 L30 12 L38 20" fill="white" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
    <circle cx="26" cy="32" r="1.8" fill="#2D2D2D" /><circle cx="34" cy="32" r="1.8" fill="#2D2D2D" />
    <path d="M27 37 Q30 40 33 37" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    <ellipse cx="22" cy="36" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.3" /><ellipse cx="38" cy="36" rx="2.5" ry="1.2" fill="#FB923C" opacity="0.3" />
  </>),
  금: (<>
    <path d="M30 6 L50 22 L30 50 L10 22 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M30 6 L18 22 L42 22 Z" fill="#F1F5F9" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round" />
    <circle cx="25" cy="28" r="1.8" fill="#2D2D2D" /><circle cx="35" cy="28" r="1.8" fill="#2D2D2D" />
    <circle cx="25.5" cy="27.5" r="0.5" fill="white" /><circle cx="35.5" cy="27.5" r="0.5" fill="white" />
    <path d="M27 34 Q30 37 33 34" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M46 10 L47.5 14 L52 15.5 L47.5 17 L46 21 L44.5 17 L40 15.5 L44.5 14 Z" fill="#FACC15" opacity="0.5" />
  </>),
  수: (<>
    <path d="M30 6 C30 6 12 24 12 34 A18 18 0 0 0 48 34 C48 24 30 6 30 6Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5" />
    <ellipse cx="22" cy="20" rx="3.5" ry="1.5" fill="white" opacity="0.5" transform="rotate(-20 22 20)" />
    <circle cx="25" cy="30" r="1.8" fill="#2D2D2D" /><circle cx="35" cy="30" r="1.8" fill="#2D2D2D" />
    <circle cx="25.5" cy="29.5" r="0.5" fill="white" /><circle cx="35.5" cy="29.5" r="0.5" fill="white" />
    <path d="M27 36 Q30 39 33 36" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" />
    <ellipse cx="21" cy="34" rx="2.5" ry="1.2" fill="#3B82F6" opacity="0.3" /><ellipse cx="39" cy="34" rx="2.5" ry="1.2" fill="#3B82F6" opacity="0.3" />
  </>),
}

export function EmptySlot({ size = 56 }: { size?: number }) {
  return (
    <div className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: "#F1F5F9", border: "2px dashed #CBD5E1" }}>
      <span className="text-[18px] text-charcoal/25">?</span>
    </div>
  )
}

/** 섹션 제목 — 두들 + 텍스트. 결과 화면 헤더 표준. */
export function SectionTitle({ icon, children }: { icon: DoodleC; children: React.ReactNode }) {
  return (
    <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}>
      <Ico as={icon} size={18} /> {children}
    </p>
  )
}

/** 카드 컨테이너 표준. */
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white border border-charcoal/10 ${className}`}>{children}</div>
}

/** 단일 막대(오행 1색). 그룹 오행 밸런스용. */
export function ElemBar({ elem, value, max }: { elem: Elem; value: number; max: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <Ico as={ELEM_DOODLE[elem]} size={16} />
      <span className="w-4 text-[14px] font-bold text-charcoal shrink-0">{elem}</span>
      <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${(value / max) * 100}%`, background: ELEM_COLOR[elem] }} />
      </div>
      <span className="w-5 text-[14px] text-text-muted text-right shrink-0">{value}</span>
    </div>
  )
}

/** 좌우 분할 막대(두 사람). 커플 오행 밸런스용 — 좌(left)/우(right) 개수 비율로 채움 + 양옆 숫자. */
export function SplitBar({ elem, left, right, leftColor = PINK, rightColor = "#60A5FA" }:
  { elem: Elem; left: number; right: number; leftColor?: string; rightColor?: string }) {
  const tot = left + right
  return (
    <div className="flex items-center gap-2">
      <Ico as={ELEM_DOODLE[elem]} size={16} />
      <span className="w-4 text-[14px] font-bold text-charcoal shrink-0">{elem}</span>
      <span className="w-4 text-[14px] font-bold text-right shrink-0" style={{ color: leftColor }}>{left}</span>
      <div className="flex-1 h-3.5 rounded-full overflow-hidden flex" style={{ background: "#F1F5F9" }}>
        <div style={{ width: `${tot ? (left / tot) * 100 : 0}%`, background: leftColor }} />
        <div style={{ width: `${tot ? (right / tot) * 100 : 0}%`, background: rightColor }} />
      </div>
      <span className="w-4 text-[14px] font-bold shrink-0" style={{ color: rightColor }}>{right}</span>
    </div>
  )
}
