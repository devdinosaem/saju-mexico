"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { spend } from "@/lib/balance"
import { saveReport, findByDedupe, type NewReport } from "@/lib/report-archive"

// 1인 사주 리포트 펀널 공용 결제 게이트.
// self/sinsal/nextmonth가 공유: 연출 → AI 호출 → 페이월(spend) → 보관함 저장 → 재열람 스킵.
// data가 null(생일 미등록)이면 펀널은 BirthGate를 렌더(이 훅은 no-op 상태 반환).

type Ai = { status: "idle" | "loading" | "done" | "error"; text: string }

export function usePaidReport<T>(opts: {
  data: T | null
  dedupeKey: string | null                       // null이면(생일없음) 동작 안 함
  price: number
  spendLabel: string
  fetchAiText: (data: T) => Promise<string | null>
  fallbackText: (data: T) => string
  buildSave: (data: T, aiText: string) => NewReport
  // 구독 혜택 등 "무료 잠금해제" 경로(선택). available()이 true면 결제 없이 해제 + consume().
  freeBenefit?: { available: () => boolean; consume: () => void }
}) {
  const { data, dedupeKey, price, spendLabel, fetchAiText, fallbackText, buildSave, freeBenefit } = opts
  const router = useRouter()
  // 재열람 판정 — 같은 dedupeKey 리포트가 보관함에 있으면 페이월·AI 스킵
  const existing = dedupeKey ? findByDedupe(dedupeKey) : null
  // 이번 잠금해제가 무료(구독 혜택)인지 — CTA 라벨용. 재열람은 이미 unlocked라 무관.
  const freeUnlock = !existing && !!freeBenefit?.available()

  const [step, setStep] = useState<"loading" | "result">(existing ? "result" : "loading")
  const [unlocked, setUnlocked] = useState(!!existing)
  const [ai, setAi] = useState<Ai>(existing ? { status: "done", text: existing.snapshot.aiText } : { status: "idle", text: "" })
  const savedRef = useRef(!!existing)

  // dedupeKey 변화(생일 미등록→등록 포함)마다 평가.
  useEffect(() => {
    if (existing) {
      // 재열람: AI 호출 없이 스냅샷으로 즉시 결과
      savedRef.current = true
      setStep("result"); setUnlocked(true)
      setAi({ status: "done", text: existing.snapshot.aiText })
      return
    }
    if (!data) return
    setStep("loading")
    setAi({ status: "loading", text: "" })
    fetchAiText(data)
      .then(t => setAi(t ? { status: "done", text: t } : { status: "error", text: "" }))
      .catch(() => setAi({ status: "error", text: "" }))
    const timer = setTimeout(() => setStep("result"), 1600)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dedupeKey])

  // 완성(잠금해제 + AI확정) 순간 보관함 1회 저장
  useEffect(() => {
    if (savedRef.current || !data || !unlocked) return
    if (ai.status !== "done" && ai.status !== "error") return
    savedRef.current = true
    saveReport(buildSave(data, ai.status === "done" ? ai.text : fallbackText(data)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked, ai.status])

  const aiText = data ? (ai.status === "done" ? ai.text : fallbackText(data)) : ""
  const aiLoading = ai.status === "loading"

  const onUnlock = () => {
    if (existing) { setUnlocked(true); return }
    if (freeBenefit?.available()) { freeBenefit.consume(); setUnlocked(true); return } // 구독 혜택 무료
    if (!spend(price, spendLabel)) { router.push("/v3/charge"); return } // 잔액 부족 → 충전
    setUnlocked(true)
  }

  return { step, unlocked, aiText, aiLoading, onUnlock, freeUnlock }
}
