"use client"
// ════════════════════════════════════════════════════════════════
// 감성 포인트 폰트(현 Cafe24Dongdong=gaegu) 대체 후보 비교 — 리포트 실제 문구로.
// 가독성(짧은 포인트 + 본문 길이 + 작은 크기) + 젊은 톤을 한 화면에서 판단.
// 결정되면 globals.css --font-flavor 한 줄만 교체.
// ════════════════════════════════════════════════════════════════
import { FONT } from "@/lib/ds"

const FONT_FACES = `
@font-face { font-family:'Cafe24 Ssurround'; src:url('https://cdn.jsdelivr.net/gh/fonts-archive/Cafe24Ssurround/Cafe24Ssurround.woff2') format('woff2'); font-display:swap; }
@font-face { font-family:'Ownglyph ParkDaHyun'; src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/Ownglyph_ParkDaHyun.woff2') format('woff2'); font-display:swap; }
@font-face { font-family:'Nanum SuJub'; src:url('https://cdn.jsdelivr.net/gh/fonts-archive/NanumSuJubEunDaeHagSaeng/NanumSuJubEunDaeHagSaeng.woff2') format('woff2'); font-display:swap; }
`

const CANDIDATES = [
  { family: "Cafe24Dongdong", label: "현재 · 카페24 동동", note: "기준(gaegu 역할). 둥근 손글씨", current: true },
  { family: "Cafe24 Ssurround", label: "카페24 써라운드", note: "둥근·젊음·가독성 최상 (카페24 패밀리 일관)", reco: true },
  { family: "Ownglyph ParkDaHyun", label: "온글잎 박다현체", note: "자연스러운 손글씨·인스타 감성·트렌디" },
  { family: "Nanum SuJub", label: "나눔손글씨 수줍은 대학생", note: "부드러운 손글씨·말랑한 젊은 톤" },
]

const POINT = "준비됐든 안 됐든 오긴 와"
const BODY = "타고난 결은 표현·창작 쪽 — 여기에 네 무기가 있어. 나를 살리는 기운은 금, 이걸 채울수록 잘 풀려."
const SHORT = "그 사람도 날 좋아할까?"

export default function FontComparePage() {
  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100dvh", letterSpacing: "var(--tracking-base)" }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_FACES }} />
      <div className="max-w-[480px] mx-auto px-4 py-8 flex flex-col gap-6">

        <div className="flex flex-col gap-1">
          <p className="text-[24px] text-charcoal" style={FONT.title}>감성 포인트 폰트 후보</p>
          <p className="text-[14px] text-charcoal/70">리포트 실제 문구로 비교 — 짧은 포인트 / 본문 길이 / 작은 크기 가독성. 제목은 빙그레(고정).</p>
        </div>

        {/* 제목 폰트(고정) 참고 */}
        <div className="ds-card px-4 py-3">
          <p className="text-[11px] text-text-muted mb-1">제목(고정) — 빙그레타옴</p>
          <p className="text-[20px] text-charcoal" style={FONT.title}>나 정밀 풀이 · 원국 종합</p>
        </div>

        {CANDIDATES.map(c => (
          <div key={c.family} className={`ds-card ${c.reco ? "ds-raised" : ""} px-4 py-4 flex flex-col gap-3`}>
            <div className="flex items-center gap-2">
              <p className="text-[15px] text-charcoal" style={FONT.title}>{c.label}</p>
              {c.reco && <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: "var(--grad-pink-bold)" }}>추천</span>}
              {c.current && <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: "var(--surface-sunken)", color: "var(--text-muted)" }}>현재</span>}
            </div>
            <p className="text-[12px] text-text-muted -mt-1">{c.note}</p>

            <div className="h-px" style={{ background: "var(--line-soft)" }} />

            {/* 짧은 포인트(주 용도) */}
            <div>
              <p className="text-[10px] text-text-muted mb-0.5">짧은 포인트 (16px)</p>
              <p className="text-[16px] text-charcoal" style={{ fontFamily: `'${c.family}'` }}>&ldquo;{POINT}&rdquo;</p>
            </div>

            {/* 본문 길이 가독성 */}
            <div>
              <p className="text-[10px] text-text-muted mb-0.5">본문 2줄 (14px)</p>
              <p className="text-[14px] text-charcoal/85 leading-relaxed" style={{ fontFamily: `'${c.family}'` }}>{BODY}</p>
            </div>

            {/* 작은 크기 + 핑크 포인트 */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-[13px] text-charcoal/70" style={{ fontFamily: `'${c.family}'` }}>{SHORT}</span>
              <span className="text-[12px]" style={{ fontFamily: `'${c.family}'`, color: "var(--pink)" }}>{SHORT}</span>
            </div>
          </div>
        ))}

        <p className="text-[12px] text-text-muted text-center pt-2">
          결정 시 globals.css <code>--font-flavor</code> 한 줄 교체 → 앱 전체 반영.
        </p>
      </div>
    </div>
  )
}
