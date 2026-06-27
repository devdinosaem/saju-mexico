"use client"
// ════════════════════════════════════════════════════════════════
// 사주 풀이 공용 UI 키트 — 디자인 계약(두들 Ico, 14px floor, 메인 핑크) 고정.
// 이모지 금지: 아이콘은 전부 <Ico as={Doodle} />.
// ════════════════════════════════════════════════════════════════
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { elemOf, type Elem } from "./engine"
import { ELEM_BG, ELEM_COLOR, ELEM_DOODLE } from "./flavor"

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
