import type { PlacedSticker } from "@/app/v3/my/_components/MiniRoom"

/** 친구가 꾸민 방 (없으면 빈 방으로 렌더) */
export type FriendRoom = { stickers: PlacedSticker[]; charPos: { x: number; y: number } }

/** 단일 친구 모델 — 등록 친구·샘플(테스트 계정) 모두 이 형태 하나로 통일 */
export type Friend = {
  id: string
  name: string
  iljuKey: string
  room?: FriendRoom
}

export const FRIENDS_KEY = "saju-custom-friends"
export const FRIENDS_CHANGE_EVENT = "saju-custom-friends-change"
const SEEDED_KEY = "saju-sample-friends-seeded"

/** 운영 노출 금지 — NEXT_PUBLIC_SAMPLE_FRIENDS=1 인 환경(테스트)에서만 시드 */
const SAMPLE_ENABLED = process.env.NEXT_PUBLIC_SAMPLE_FRIENDS === "1"

/** 테스트용 샘플 친구(실제 등록 친구와 동일 취급). 고정 id 보유 → 삭제 시 재시드 안 됨 */
export const SAMPLE_FRIENDS: Friend[] = [
  {
    id: "sample-jisu",
    name: "지수",
    iljuKey: "갑자-f",
    room: {
      stickers: [
        { id: "f1-1", name: "Tulip", x: 20, y: 55, rotate: -8, scale: 0.9 },
        { id: "f1-2", name: "Rose", x: 72, y: 70, rotate: 5, scale: 0.85 },
        { id: "f1-3", name: "Vase", x: 83, y: 52, rotate: 0, scale: 0.8 },
      ],
      charPos: { x: 55, y: 62 },
    },
  },
  {
    id: "sample-minjun",
    name: "민준",
    iljuKey: "병인-m",
    room: {
      stickers: [
        { id: "f2-1", name: "Vinyl", x: 18, y: 60, rotate: -5, scale: 0.9 },
        { id: "f2-2", name: "Headphones", x: 75, y: 72, rotate: 8, scale: 0.85 },
        { id: "f2-3", name: "Cassette", x: 30, y: 72, rotate: 12, scale: 0.8 },
      ],
      charPos: { x: 60, y: 64 },
    },
  },
  {
    id: "sample-haeun",
    name: "하은",
    iljuKey: "계묘-f",
    room: {
      stickers: [
        { id: "f3-1", name: "Moon", x: 78, y: 20, rotate: 0, scale: 0.8 },
        { id: "f3-2", name: "Crystal", x: 22, y: 68, rotate: -10, scale: 0.85 },
        { id: "f3-3", name: "Candle", x: 70, y: 65, rotate: 5, scale: 0.8 },
      ],
      charPos: { x: 50, y: 63 },
    },
  },
  {
    id: "sample-junho",
    name: "준호",
    iljuKey: "무인-m",
    room: {
      stickers: [
        { id: "f4-1", name: "Sofa", x: 72, y: 68, rotate: 0, scale: 1 },
        { id: "f4-2", name: "Plant", x: 20, y: 58, rotate: -5, scale: 0.9 },
        { id: "f4-3", name: "Coffee", x: 35, y: 72, rotate: 8, scale: 0.75 },
      ],
      charPos: { x: 58, y: 63 },
    },
  },
  {
    id: "sample-areum",
    name: "아름",
    iljuKey: "병자-f",
    room: {
      stickers: [
        { id: "f5-1", name: "Heart", x: 80, y: 18, rotate: 10, scale: 0.75 },
        { id: "f5-2", name: "Crown", x: 20, y: 22, rotate: -5, scale: 0.7 },
        { id: "f5-3", name: "Balloon", x: 68, y: 65, rotate: 5, scale: 0.85 },
      ],
      charPos: { x: 48, y: 62 },
    },
  },
]

export function saveFriends(list: Friend[]) {
  if (typeof window === "undefined") return
  try { localStorage.setItem(FRIENDS_KEY, JSON.stringify(list)) } catch {}
}

/** 친구 목록 로드. 테스트 환경이면 최초 1회 샘플 친구를 시드한다. */
export function loadFriends(): Friend[] {
  if (typeof window === "undefined") return []
  let list: Friend[] = []
  try { list = JSON.parse(localStorage.getItem(FRIENDS_KEY) || "[]") } catch {}

  if (SAMPLE_ENABLED && !localStorage.getItem(SEEDED_KEY)) {
    const ids = new Set(list.map(f => f.id))
    const toAdd = SAMPLE_FRIENDS.filter(f => !ids.has(f.id))
    if (toAdd.length) {
      list = [...toAdd, ...list]
      saveFriends(list)
    }
    try { localStorage.setItem(SEEDED_KEY, "1") } catch {}
  }
  return list
}

export function notifyFriendsChange() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(FRIENDS_CHANGE_EVENT))
}

export const findFriendById = (list: Friend[], id: string) => list.find(f => f.id === id)
export const findFriendByName = (list: Friend[], name: string) => list.find(f => f.name === name)
