"use client"
// ════════════════════════════════════════════════════════════════
// 사주 보관함 — 본 리포트 스냅샷(계산데이터+AI원문)을 localStorage에 영속.
// 단일 컬렉션(saju-report-archive). 변경 시 이벤트 발행 → useReports() 반응.
// 기획: docs/plans/report-archive.md · 선례: consult-history.ts
// ════════════════════════════════════════════════════════════════

export type ReportType = "self" | "sinsal" | "nextmonth" | "some" | "onesided" | "compat" | "couple"

export type Subject = {
  who: "me" | "other"
  name: string          // "나" 또는 입력 이름
  birthKey: string      // 생년월일(+시) 정규화 키 — me 판정·중복 판정
  friendId?: string
  iljuKey?: string      // 카드 아바타용 (예: 경진-m)
}

export type ReportRecord = {
  id: string
  type: ReportType
  createdAt: number
  subjects: Subject[]            // 1인=1, 관계=2+
  group: "me" | "others"        // 파생
  dedupeKey: string             // 같은 키면 갱신
  title: string                  // "나 사용설명서" / "나 × 민지 · 썸"
  highlight: string              // "시그니처 · 흰호랑이" / "88%" / "맑음"
  snapshot: { v: number; data: unknown; aiText: string }
}

/** 저장 입력 — id/createdAt/group/dedupeKey 자동 채움(dedupeKey는 override 가능) */
export type NewReport = Omit<ReportRecord, "id" | "createdAt" | "group" | "dedupeKey"> & { dedupeKey?: string }

const KEY = "saju-report-archive"
export const REPORT_ARCHIVE_EVENT = "saju-report-archive-change"
const SCHEMA = 1

const pad = (n: number) => String(n).padStart(2, "0")
/** 생일 → 정규화 키 (me 판정·중복 판정용). hour 없으면 'x'. */
export function makeBirthKey(b: { year: number; month: number; day: number; hour?: number | null }): string {
  return `${b.year}${pad(b.month)}${pad(b.day)}-${b.hour == null ? "x" : pad(b.hour)}`
}

export function deriveGroup(subjects: Subject[]): "me" | "others" {
  return subjects.length === 1 && subjects[0].who === "me" ? "me" : "others"
}

function defaultDedupeKey(type: ReportType, subjects: Subject[]): string {
  return `${type}|${subjects.map(s => s.birthKey).sort().join(",")}`
}

const uuid = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `r-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

function readAll(): ReportRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEY)
    const data = raw ? JSON.parse(raw) : null
    return Array.isArray(data?.records) ? (data.records as ReportRecord[]) : []
  } catch {
    return []
  }
}

function writeAll(records: ReportRecord[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: SCHEMA, records }))
    window.dispatchEvent(new Event(REPORT_ARCHIVE_EVENT))
  } catch {
    // 용량 초과 등 — 조용히 무시
  }
}

/** 최근순(createdAt desc) 전체 */
export function listReports(): ReportRecord[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt)
}

export function getReport(id: string): ReportRecord | null {
  return readAll().find(r => r.id === id) ?? null
}

/** 저장(같은 dedupeKey 있으면 갱신: 기존 제거 후 새로 추가, id 승계) */
export function saveReport(input: NewReport): ReportRecord {
  const records = readAll()
  const group = deriveGroup(input.subjects)
  const dedupeKey = input.dedupeKey ?? defaultDedupeKey(input.type, input.subjects)
  const prev = records.find(r => r.dedupeKey === dedupeKey)
  const record: ReportRecord = {
    ...input,
    id: prev?.id ?? uuid(),
    createdAt: Date.now(),
    group,
    dedupeKey,
  }
  writeAll([record, ...records.filter(r => r.dedupeKey !== dedupeKey)])
  return record
}

export function deleteReport(id: string): void {
  writeAll(readAll().filter(r => r.id !== id))
}

export function clearReports(): void {
  writeAll([])
}
