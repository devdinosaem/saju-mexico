"use client"
import { createClient } from "@/lib/supabase/client"
import type { Friend } from "@/lib/friends"

// 소셜 친구 데이터 접근 — Supabase friendships + profiles.
// 정책: docs/SOCIAL-BACKEND-POLICY.md (상호 친구, accepted만 노출).

/** 내 수락된 친구 목록. 비로그인이면 빈 배열. */
export async function fetchFriends(): Promise<Friend[]> {
  const sb = createClient()
  const { data: auth } = await sb.auth.getUser()
  const me = auth.user?.id
  if (!me) return []

  const { data: links, error } = await sb
    .from("friendships")
    .select("requester_id,addressee_id")
    .eq("status", "accepted")
  if (error || !links?.length) return []

  const otherIds = links.map(l => (l.requester_id === me ? l.addressee_id : l.requester_id))
  const { data: profs } = await sb
    .from("profiles")
    .select("id,name,ilju_key")
    .in("id", otherIds)

  return (profs ?? []).map(p => ({ id: p.id, name: p.name, iljuKey: p.ilju_key }))
}

/** friend_code로 친구 추가. (find_profile_by_code RPC 필요 — 마이그레이션 0002)
 *  데이터부터 단계: 수락 플로우 생략하고 즉시 accepted. 추후 pending→수락으로 교체. */
export async function addFriendByCode(code: string): Promise<{ ok: boolean; error?: string }> {
  const sb = createClient()
  const { data: auth } = await sb.auth.getUser()
  const me = auth.user?.id
  if (!me) return { ok: false, error: "not_logged_in" }

  const { data: found, error: rpcErr } = await sb.rpc("find_profile_by_code", { p_code: code.trim() })
  if (rpcErr) return { ok: false, error: rpcErr.message }
  const target = (Array.isArray(found) ? found[0] : found) as { id: string } | undefined
  if (!target) return { ok: false, error: "not_found" }
  if (target.id === me) return { ok: false, error: "self" }

  const { error } = await sb
    .from("friendships")
    .insert({ requester_id: me, addressee_id: target.id, status: "accepted" })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

/** 친구 삭제(양방향 관계 행 제거). */
export async function removeFriendLink(friendId: string): Promise<void> {
  const sb = createClient()
  const { data: auth } = await sb.auth.getUser()
  const me = auth.user?.id
  if (!me) return
  await sb
    .from("friendships")
    .delete()
    .or(
      `and(requester_id.eq.${me},addressee_id.eq.${friendId}),` +
      `and(requester_id.eq.${friendId},addressee_id.eq.${me})`,
    )
}
