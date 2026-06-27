// 도메인 행(row) 타입 — 스키마(0001_init.sql)와 1:1.
// 추후 `supabase gen types typescript`로 자동 생성 타입으로 대체 가능.

export type Profile = {
  id: string
  name: string
  ilju_key: string            // 일주 1개 (불변식)
  birth_info: unknown | null
  friend_code: string
  created_at: string
}

export type FriendshipStatus = "pending" | "accepted"

export type Friendship = {
  id: string
  requester_id: string
  addressee_id: string
  status: FriendshipStatus
  created_at: string
}

export type Room = {
  user_id: string
  data: RoomDataJson         // { stickers, chars, charPos, skinId }
  updated_at: string
}

// MiniRoom의 RoomData와 호환되는 JSON 형태 (캐릭터 N개 = chars)
export type RoomDataJson = {
  stickers: { id: string; name: string; x: number; y: number; rotate: number; scale: number }[]
  charPos: { x: number; y: number; rotate?: number; scale?: number }
  chars?: { id: string; key: string; x: number; y: number; rotate: number; scale: number }[]
  skinId?: string
}

export type GuestbookEntry = {
  id: string
  owner_id: string
  author_id: string
  message: string
  created_at: string
}
