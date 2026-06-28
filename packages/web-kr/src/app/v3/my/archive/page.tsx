"use client"
// ════════════════════════════════════════════════════════════════
// 사주 보관함 — 저장된 결과 리포트 기록 리스트.
// 나 섹션(고정) + 다른 사람(시간순). 카드 탭 → /v3/report/[id] 직행.
// 디자인: 친구/커플 결과화면 톤(두들·BINGGRAE/GAEGU·핑크).
// ════════════════════════════════════════════════════════════════
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useReports } from "@/hooks/useReports"
import { resolveChar } from "@/lib/saju-play/self/report"
import { elemOf } from "@/lib/saju-play/engine"
import { ELEM_BG } from "@/lib/saju-play/flavor"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { buildSelf } from "@/lib/saju-play/self/self-adapter"
import { devSeedReports, clearReports, deriveGroup, type ReportRecord, type ReportType, type Subject } from "@/lib/report-archive"
import {
  DoodleBook, DoodleStar, DoodleCalendar, DoodleHeart, DoodleMoon,
  DoodleSpeechBubble, DoodleRing, DoodleSparkles,
} from "@/components/doodles"

type DoodleC = React.FC<{ className?: string }>
const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
const PINK = "#E84B6A"

const TYPE_META: Record<ReportType, { label: string; D: DoodleC; bg: string }> = {
  self: { label: "사용설명서", D: DoodleBook, bg: "#FFF0F5" },
  sinsal: { label: "신살 도감", D: DoodleStar, bg: "#FEF3C7" },
  nextmonth: { label: "다음달 운", D: DoodleCalendar, bg: "#DBEAFE" },
  some: { label: "썸 궁합", D: DoodleHeart, bg: "#FFE9F0" },
  onesided: { label: "짝사랑 궁합", D: DoodleMoon, bg: "#EFEAFE" },
  compat: { label: "친구 궁합", D: DoodleSpeechBubble, bg: "#F0FFF4" },
  couple: { label: "커플 궁합", D: DoodleRing, bg: "#FFF4E0" },
}

function fmtRel(ts: number): string {
  const days = Math.floor((Date.now() - ts) / 86400000)
  if (days <= 0) return "오늘"
  if (days === 1) return "어제"
  if (days < 7) return `${days}일 전`
  const d = new Date(ts)
  return `${d.getMonth() + 1}.${d.getDate()}`
}

function RecordAvatar({ iljuKey, size = 38 }: { iljuKey?: string; size?: number }) {
  if (!iljuKey) {
    return <div className="rounded-full shrink-0 border-2 border-charcoal/10" style={{ width: size, height: size, background: "#F1F5F9" }} />
  }
  const key = resolveChar(iljuKey)
  return (
    <div className="rounded-full overflow-hidden border-2 border-white shrink-0 flex items-center justify-center" style={{ width: size, height: size, background: ELEM_BG[elemOf(key)] }}>
      {ILJU_SVG_ICONS[key]?.(getIljuProfileViewBox(key))}
    </div>
  )
}

function Avatars({ record }: { record: ReportRecord }) {
  const subs = record.subjects
  if (subs.length <= 1) {
    return <div className="border-2 border-charcoal/10 rounded-full"><RecordAvatar iljuKey={subs[0]?.iljuKey} size={40} /></div>
  }
  const extra = subs.length - 2
  return (
    <div className="flex items-center -space-x-2.5 shrink-0">
      <RecordAvatar iljuKey={subs[0].iljuKey} size={36} />
      <RecordAvatar iljuKey={subs[1].iljuKey} size={36} />
      {extra > 0 && (
        <span className="w-9 h-9 rounded-full border-2 border-white bg-charcoal/10 flex items-center justify-center text-[11px] font-bold text-charcoal/60 shrink-0">+{extra}</span>
      )}
    </div>
  )
}

function RecordRow({ record }: { record: ReportRecord }) {
  const meta = TYPE_META[record.type]
  const D = meta.D
  return (
    <Link href={`/v3/report/${record.id}`} className="rounded-2xl bg-white border border-charcoal/10 px-3.5 py-3 flex items-center gap-3 active:opacity-90 transition-opacity">
      <Avatars record={record} />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] text-charcoal leading-tight truncate" style={BINGGRAE}>{record.title}</p>
        <p className="text-[12px] text-text-muted leading-snug truncate mt-0.5" style={GAEGU}>{record.highlight}</p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1" style={{ background: meta.bg, color: "#6B5B45" }}>
          <span className="w-3 h-3 inline-flex"><D className="w-full h-full" /></span>{meta.label}
        </span>
        <span className="text-[11px] text-text-muted">{fmtRel(record.createdAt)}</span>
      </div>
    </Link>
  )
}

// ── dev 더미 시드 ──────────────────────────────────────────────
function seedDummies() {
  const me = (iljuKey: string): Subject => ({ who: "me", name: "나", birthKey: "me-1990", iljuKey })
  const other = (name: string, iljuKey: string): Subject => ({ who: "other", name, birthKey: `o-${name}`, iljuKey })
  const mk = (
    type: ReportType, subjects: Subject[], title: string, highlight: string, daysAgo: number, data: unknown = {},
  ): ReportRecord => {
    const id = `dev-${type}-${Math.random().toString(36).slice(2, 8)}`
    return { id, type, createdAt: Date.now() - daysAgo * 86400000, subjects, group: deriveGroup(subjects), dedupeKey: id, title, highlight, snapshot: { v: 1, data, aiText: "(더미 저장본)" } }
  }
  const real = buildSelf({ year: 1990, month: 2, day: 14, hour: 12, minute: 0 }, "M")
  const meKey = real?.iljuKey ?? "갑신-m"

  const records: ReportRecord[] = [
    // 나
    ...(real ? [mk("self", [me(meKey)], "나 사용설명서", `${real.dayKr}(${real.dayElem})·${real.yinYang} · ${real.strongLevel}`, 0, real)] : []),
    mk("sinsal", [me(meKey)], "내 신살 도감", "시그니처 · 흰호랑이", 2),
    mk("nextmonth", [me(meKey)], "다음달 운 미리보기", "2026.07 · 맑음", 5),
    // 다른 사람
    mk("self", [other("철수", "병인-m")], "철수 사용설명서", "병인(화)·양 · 신강", 1),
    mk("some", [me(meKey), other("민지", "갑자-f")], "나 × 민지 · 썸", "88%", 1),
    mk("some", [me(meKey), other("수아", "신유-f")], "나 × 수아 · 썸", "72%", 3),
    mk("onesided", [me(meKey), other("지훈", "임오-m")], "나 × 지훈 · 짝사랑", "65%", 4),
    mk("couple", [me(meKey), other("하은", "을미-f")], "나 × 하은 · 커플", "91%", 6),
    mk("self", [other("영희", "계묘-f")], "영희 사용설명서", "계묘(목)·음 · 신약", 8),
    mk("compat", [me(meKey), other("민지", "갑자-f"), other("철수", "병인-m"), other("영희", "계묘-f")], "우리 모임 궁합", "84% · 4명", 10),
    mk("some", [me(meKey), other("다은", "정사-f")], "나 × 다은 · 썸", "79%", 12),
    mk("onesided", [me(meKey), other("현우", "무인-m")], "나 × 현우 · 짝사랑", "58%", 14),
    mk("self", [other("엄마", "기미-f")], "엄마 사용설명서", "기토(토)·음 · 중화", 18),
    mk("couple", [me(meKey), other("서연", "경진-m")], "나 × 서연 · 커플", "86%", 20),
  ]
  devSeedReports(records)
}

export default function SajuArchivePage() {
  const router = useRouter()
  const { me, others, total } = useReports()

  return (
    <div className="flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-[13px] text-charcoal/55 active:opacity-60 w-fit">‹ 뒤로</button>

      <div className="flex items-center gap-2">
        <span className="inline-flex w-[22px] h-[22px]"><DoodleSparkles className="w-full h-full" /></span>
        <div>
          <p className="text-[20px] text-charcoal leading-tight" style={BINGGRAE}>사주 보관함</p>
          <p className="text-[13px] text-text-muted" style={GAEGU}>내가 본 리포트가 여기 쌓여</p>
        </div>
      </div>

      {total === 0 ? (
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-12 flex flex-col items-center gap-3 text-center">
          <span className="inline-flex w-9 h-9 opacity-60"><DoodleBook className="w-full h-full" /></span>
          <p className="text-[14px] text-charcoal/55 leading-relaxed" style={GAEGU}>아직 저장된 리포트가 없어요.<br />사주 분석을 보면 여기 자동으로 쌓여요.</p>
          <Link href="/v3/shop" className="mt-1 px-4 py-2 rounded-xl text-[13px] font-bold active:opacity-85" style={{ background: PINK, color: "#FFF9F0", ...BINGGRAE }}>
            분석 보러 가기 →
          </Link>
        </div>
      ) : (
        <>
          {me.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-[14px] text-charcoal px-1" style={BINGGRAE}>나</p>
              {me.map(r => <RecordRow key={r.id} record={r} />)}
            </div>
          )}
          {others.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-[14px] text-charcoal px-1" style={BINGGRAE}>다른 사람</p>
              {others.map(r => <RecordRow key={r.id} record={r} />)}
            </div>
          )}
        </>
      )}

      {/* dev 더미 시드/비우기 (임시) */}
      <div className="flex gap-2 pt-4 mt-2 border-t border-charcoal/10">
        <button onClick={seedDummies} className="flex-1 py-2 rounded-xl text-[12px] font-bold text-charcoal/60 bg-charcoal/5 active:opacity-70">+ 더미 쌓기 (dev)</button>
        <button onClick={() => clearReports()} className="px-4 py-2 rounded-xl text-[12px] font-bold text-charcoal/45 bg-charcoal/5 active:opacity-70">비우기</button>
      </div>
    </div>
  )
}
