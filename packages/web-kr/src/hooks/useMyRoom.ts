"use client"
/**
 * 내 미니홈피 방 데이터 구독 — localStorage(STORAGE_KEY) 단일 소스.
 * MiniRoom 편집 결과를 다른 화면(방의 기운 카드 등)에서 읽을 때 사용.
 */
import { useEffect, useState } from "react"
import { STORAGE_KEY, type RoomData } from "@/app/v3/my/_components/MiniRoom"

const EMPTY_ROOM: RoomData = { stickers: [], charPos: { x: 50, y: 62 } }

export function useMyRoom(): RoomData {
  const [room, setRoom] = useState<RoomData>(EMPTY_ROOM)

  useEffect(() => {
    const load = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) setRoom(JSON.parse(saved))
      } catch {}
    }
    load()
    // 다른 탭/편집기에서 방을 바꾸면 반영
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) load()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  return room
}
