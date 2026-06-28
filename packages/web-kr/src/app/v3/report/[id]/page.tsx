"use client"
// ════════════════════════════════════════════════════════════════
// 사주 보관함 뷰어 — 저장 레코드 id → type별 본문(순수 컴포넌트)로 직행 렌더.
// 랜딩·페이월 없이 그날 본 최종 리포트 그대로. 기획: docs/plans/report-archive.md
// ════════════════════════════════════════════════════════════════
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getReport, type ReportRecord } from "@/lib/report-archive"
import { SelfReport, BINGGRAE, GAEGU } from "@/lib/saju-play/self/report"
import type { SelfData } from "@/lib/saju-play/self/self-adapter"
import { SinsalReport } from "@/lib/saju-play/sinsal/report"
import type { SinsalData } from "@/lib/saju-play/sinsal/sinsal-adapter"
import { NextMonthReport } from "@/lib/saju-play/nextmonth/report"
import type { NextMonthData } from "@/lib/saju-play/nextmonth/nextmonth-adapter"

function fmtDate(ts: number): string {
  const d = new Date(ts)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`
}

function ReportBody({ record }: { record: ReportRecord }) {
  switch (record.type) {
    case "self":
      return <SelfReport data={record.snapshot.data as SelfData} aiText={record.snapshot.aiText} />
    case "sinsal":
      return <SinsalReport data={record.snapshot.data as SinsalData} aiText={record.snapshot.aiText} />
    case "nextmonth":
      return <NextMonthReport data={record.snapshot.data as NextMonthData} aiText={record.snapshot.aiText} />
    default:
      return (
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-10 text-center">
          <p className="text-[14px] text-charcoal/55 leading-relaxed" style={GAEGU}>
            「{record.title}」 뷰어는 곧 추가돼요.<br />저장은 잘 돼 있어요.
          </p>
        </div>
      )
  }
}

export default function ReportViewerPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [record, setRecord] = useState<ReportRecord | null | undefined>(undefined)

  useEffect(() => {
    setRecord(getReport(id))
  }, [id])

  if (record === undefined) {
    return <div className="pt-24 text-center text-[14px] text-text-muted" style={GAEGU}>불러오는 중…</div>
  }

  if (!record) {
    return (
      <div className="flex flex-col gap-4 pt-2">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-[13px] text-charcoal/55 active:opacity-60 w-fit">‹ 뒤로</button>
        <div className="rounded-2xl bg-white border border-charcoal/10 px-4 py-12 text-center">
          <p className="text-[14px] text-charcoal/55 leading-relaxed" style={GAEGU}>저장된 리포트를 찾을 수 없어요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* 뒤로 + 메타 */}
      <div className="flex items-center gap-2 pt-1">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-[13px] text-charcoal/55 active:opacity-60 shrink-0">‹ 뒤로</button>
        <span className="ml-auto text-[12px] text-text-muted">저장됨 · {fmtDate(record.createdAt)}</span>
      </div>
      <p className="text-[18px] text-charcoal leading-tight" style={BINGGRAE}>{record.title}</p>

      <ReportBody record={record} />
    </div>
  )
}
