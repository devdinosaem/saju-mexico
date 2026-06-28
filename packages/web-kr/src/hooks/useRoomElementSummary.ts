"use client"
/**
 * 방의 기운 요약 — 카드 시안들이 공유하는 데이터 훅.
 * 방 분포(calcRoomElements) + 사주 비교 해석(interpretRoomVsSaju)을 한 번에.
 */
import { useMyRoom } from "@/hooks/useMyRoom"
import { useSajuDistribution } from "@/hooks/useSajuDistribution"
import { calcRoomElements, interpretRoomVsSaju } from "@/lib/room-element"

export function useRoomElementSummary() {
  const room = useMyRoom()
  const result = calcRoomElements(room)
  const saju = useSajuDistribution()
  const reading = saju ? interpretRoomVsSaju(result, saju) : null
  return { room, result, saju, reading }
}
