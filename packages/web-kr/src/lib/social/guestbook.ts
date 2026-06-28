"use client"
import { createClient } from "@/lib/supabase/client"

// 방명록 데이터 접근 — Supabase guestbook_entries(+author profile 조인).
// 정책: 친구/본인만 작성(RLS), 1~100자, 작성자·벽주인 삭제.

export type GbEntry = {
  id: string
  authorId: string
  authorName: string
  authorIljuKey: string
  message: string
  date: string          // 표시용 (YYYY. M. D.)
  isMe: boolean
}

async function myId(sb: ReturnType<typeof createClient>): Promise<string | null> {
  const { data } = await sb.auth.getUser()
  return data.user?.id ?? null
}

/** 특정 벽(owner)의 방명록. 최신 먼저. */
export async function fetchGuestbook(ownerId: string): Promise<GbEntry[]> {
  const sb = createClient()
  const me = await myId(sb)
  const { data, error } = await sb
    .from("guestbook_entries")
    .select("id,author_id,message,created_at,author:profiles!author_id(name,ilju_key)")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false })
  if (error || !data) return []
  return (data as unknown as RawEntry[]).map(e => ({
    id: e.id,
    authorId: e.author_id,
    authorName: e.author?.name ?? "친구",
    authorIljuKey: e.author?.ilju_key ?? "",
    message: e.message,
    date: new Date(e.created_at).toLocaleDateString("ko-KR"),
    isMe: e.author_id === me,
  }))
}

type RawEntry = {
  id: string; author_id: string; message: string; created_at: string
  author: { name: string; ilju_key: string } | null
}

/** 내 벽 방명록. */
export async function fetchMyGuestbook(): Promise<GbEntry[]> {
  const sb = createClient()
  const me = await myId(sb)
  if (!me) return []
  return fetchGuestbook(me)
}

/** ownerId 벽에 글 남기기(작성자=본인). 친구/본인만 RLS 허용. */
export async function addGuestbookEntry(ownerId: string, message: string): Promise<{ ok: boolean; error?: string }> {
  const sb = createClient()
  const me = await myId(sb)
  if (!me) return { ok: false, error: "not_logged_in" }
  const msg = message.trim().slice(0, 100)
  if (!msg) return { ok: false, error: "empty" }
  const { error } = await sb.from("guestbook_entries").insert({ owner_id: ownerId, author_id: me, message: msg })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

/** 방명록 삭제(작성자 또는 벽주인 — RLS로 강제). */
export async function deleteGuestbookEntry(id: string): Promise<void> {
  const sb = createClient()
  await sb.from("guestbook_entries").delete().eq("id", id)
}
