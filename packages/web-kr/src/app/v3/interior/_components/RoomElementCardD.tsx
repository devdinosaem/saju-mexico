"use client"
/**
 * 시안 D — 칩 + 개수 + 설명 (그래프/바 없음).
 * compat·onesided·self 결과 화면 디자인 언어: SectionTitle + Basis 칩 + 오행색 칩 + 컬러 설명 블록.
 * 비교용 시안 — 제거 시 이 파일 + interior/page.tsx 마운트만 지우면 됨.
 */
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DoodleBox, DoodleTaegeuk } from "@/components/doodles"
import { useRoomElementSummary } from "@/hooks/useRoomElementSummary"
import { roomElementCounts, ELEMENTS, ELEMENT_LABEL, ELEMENT_PILL } from "@/lib/room-element"
import { ELEM_DOODLE } from "./ElementPill"
import RoomElementSheet from "./RoomElementSheet"

const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const PINK = "#E84B6A"

export default function RoomElementCardD() {
  const router = useRouter()
  const { room, saju, reading } = useRoomElementSummary()
  const { counts, total } = roomElementCounts(room)
  const [sheet, setSheet] = useState(false)

  const top = total > 0 ? ELEMENTS.reduce((a, b) => (counts[b] > counts[a] ? b : a)) : null

  return (
    <>
      <div
        className="flex flex-col gap-2.5 cursor-pointer active:opacity-95 transition-opacity"
        onClick={() => total > 0 && setSheet(true)}
      >
        {/* 섹션 타이틀 + Basis 칩 */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-[15px] text-charcoal flex items-center gap-1.5" style={BINGGRAE}>
            <DoodleBox className="w-[18px] h-[18px]"><DoodleTaegeuk /></DoodleBox> 이 방의 기운
          </p>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] font-bold shrink-0" style={{ background: "#FFF0F5", color: PINK }}>
            <DoodleBox className="w-[11px] h-[11px]"><DoodleTaegeuk /></DoodleBox> 오행 분포
          </span>
        </div>

        {total === 0 ? (
          <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-5 text-center">
            <p className="text-[13px] text-text-muted leading-relaxed">
              아직 방에 놓인 아이템이 없어요.<br />소품과 캐릭터를 배치하면 기운이 채워져요.
            </p>
          </div>
        ) : (
          <>
            {/* 오행색 칩 + 개수 */}
            <div className="flex flex-wrap gap-2">
              {ELEMENTS.map(e => {
                const has = counts[e] > 0
                const p = ELEMENT_PILL[e]
                const D = ELEM_DOODLE[e]
                return (
                  <span
                    key={e}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-bold"
                    style={has
                      ? { background: p.bg, border: `1.5px solid ${p.border}`, color: p.text }
                      : { background: "#F4F0E9", border: "1.5px solid #E7DFD2", color: "#B6A893", opacity: 0.7 }}
                  >
                    <DoodleBox className="w-4 h-4"><D /></DoodleBox>
                    {ELEMENT_LABEL[e]}
                    <span className="tabular-nums">{counts[e]}</span>
                  </span>
                )
              })}
            </div>

            {/* 컬러 설명 블록 (최다 오행 기준) */}
            {top && (
              <div
                className="rounded-2xl px-4 py-3.5 flex items-start gap-2.5"
                style={{ background: ELEMENT_PILL[top].bg, border: `1.5px solid ${ELEMENT_PILL[top].border}` }}
              >
                {(() => { const TopD = ELEM_DOODLE[top]; return <DoodleBox className="w-[22px] h-[22px] mt-0.5"><TopD /></DoodleBox> })()}
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-bold text-charcoal leading-snug">
                    이 방엔 {ELEMENT_LABEL[top]} 기운이 가장 많아요 · {counts[top]}개
                  </p>
                  <p className="text-[13px] text-charcoal/70 leading-snug mt-0.5">
                    {reading ? reading.message : `아이템 ${total}개가 방의 기운을 더하고 있어요.`}
                  </p>
                </div>
              </div>
            )}

            {/* 보완 추천 CTA */}
            {reading && (
              <button
                className="w-full py-2.5 rounded-xl text-[12.5px] font-bold active:opacity-80 transition-opacity"
                style={{ background: ELEMENT_PILL[reading.recommend].bg, border: `1.5px solid ${ELEMENT_PILL[reading.recommend].border}`, color: ELEMENT_PILL[reading.recommend].text }}
                onClick={e => { e.stopPropagation(); router.push("/v3/interior/inventory/props") }}
              >
                {ELEMENT_LABEL[reading.recommend]} 기운 소품 더하기 →
              </button>
            )}
          </>
        )}
      </div>

      {sheet && <RoomElementSheet room={room} saju={saju} onClose={() => setSheet(false)} />}
    </>
  )
}
