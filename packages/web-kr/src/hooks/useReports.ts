"use client"
// 사주 보관함 구독 훅 — 저장 변경 시 자동 갱신. 나/타인 그룹 파생.
import { useEffect, useState } from "react"
import { listReports, REPORT_ARCHIVE_EVENT, type ReportRecord } from "@/lib/report-archive"

export function useReports() {
  const [records, setRecords] = useState<ReportRecord[]>([])

  useEffect(() => {
    const sync = () => setRecords(listReports())
    sync()
    window.addEventListener(REPORT_ARCHIVE_EVENT, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(REPORT_ARCHIVE_EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  return {
    records,                                          // 최근순 전체
    me: records.filter(r => r.group === "me"),        // 나 섹션
    others: records.filter(r => r.group === "others"), // 타인 시간순
    total: records.length,
  }
}
