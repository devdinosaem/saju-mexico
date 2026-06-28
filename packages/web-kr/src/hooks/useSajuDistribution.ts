"use client"
/**
 * 내 사주 오행 분포 — birthDate → calcSajuPillars → calcElementDistribution.
 * "방의 기운"을 사주와 비교 해석할 때 사용 (Phase 2).
 *
 * 키 브릿지: calcElementDistribution 은 "목(木)" 형태, 여기선 첫 글자만 떼어
 * ElemKr("목")로 정규화한다. 생시 미입력이면 시주 제외(사주육자)로 계산된다.
 */
import { useMemo } from "react"
import { useUser } from "@/lib/UserContext"
import { calcSajuPillars, calcElementDistribution } from "@/lib/calcSaju"
import type { ElemKr } from "@/lib/day-fortune"
import type { ElementScores } from "@/lib/room-element"

export function useSajuDistribution(): ElementScores | null {
  const { user } = useUser()
  const bd = user.birthDate

  return useMemo(() => {
    if (!bd) return null
    const pillars = calcSajuPillars(bd.year, bd.month, bd.day, bd.hour, bd.minute, bd.ampm)
    const dist = calcElementDistribution(pillars)
    const out: ElementScores = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 }
    for (const [k, v] of Object.entries(dist)) out[k[0] as ElemKr] = v
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bd?.year, bd?.month, bd?.day, bd?.hour, bd?.minute, bd?.ampm])
}
