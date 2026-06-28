"use client"
import { createClient } from "@/lib/supabase/client"
import type { RoomData } from "@/app/v3/my/_components/MiniRoom"

// 미니홈피(방) 데이터 접근 — Supabase rooms(user당 1행, data jsonb).
// 정책: 본인+친구 읽기, 본인만 쓰기(RLS). updated_at 자동 갱신(스토리 활동 신호).

/** 특정 유저의 방 데이터. 없으면 null. */
export async function fetchRoom(userId: string): Promise<RoomData | null> {
  const sb = createClient()
  const { data } = await sb.from("rooms").select("data").eq("user_id", userId).maybeSingle()
  return (data?.data as RoomData) ?? null
}

/** 내 방 데이터. */
export async function fetchMyRoom(): Promise<RoomData | null> {
  const sb = createClient()
  const { data: auth } = await sb.auth.getUser()
  const me = auth.user?.id
  if (!me) return null
  return fetchRoom(me)
}

/** 내 방 저장(upsert). */
export async function saveMyRoom(data: RoomData): Promise<void> {
  const sb = createClient()
  const { data: auth } = await sb.auth.getUser()
  const me = auth.user?.id
  if (!me) return
  await sb.from("rooms").upsert({ user_id: me, data })
}
