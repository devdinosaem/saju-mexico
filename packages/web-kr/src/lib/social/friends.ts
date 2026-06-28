"use client"
import { createClient } from "@/lib/supabase/client"
import type { Friend } from "@/lib/friends"

// 소셜 친구 데이터 접근 — Supabase friendships + profiles.
// 정책: docs/SOCIAL-BACKEND-POLICY.md (상호 친구, 초대링크 → 요청→수락).

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

export type TargetProfile = { id: string; name: string; iljuKey: string }

/** 코드로 상대 프로필 조회(요청 전 확인용). find_profile_by_code RPC(0002). */
export async function lookupByCode(code: string): Promise<TargetProfile | null> {
  const sb = createClient()
  const { data } = await sb.rpc("find_profile_by_code", { p_code: code.trim() })
  const t = (Array.isArray(data) ? data[0] : data) as { id: string; name: string; ilju_key: string } | undefined
  return t ? { id: t.id, name: t.name, iljuKey: t.ilju_key } : null
}

/** 내 친구 코드(초대 링크용). */
export async function fetchMyFriendCode(): Promise<string | null> {
  const sb = createClient()
  const { data: auth } = await sb.auth.getUser()
  const me = auth.user?.id
  if (!me) return null
  const { data } = await sb.from("profiles").select("friend_code").eq("id", me).maybeSingle()
  return (data as { friend_code?: string } | null)?.friend_code ?? null
}

/** 친구 요청 보내기(pending). 상대가 이미 내게 요청해뒀으면 즉시 수락(상호 의사). */
export async function sendFriendRequest(code: string): Promise<{
  ok: boolean
  status?: "requested" | "accepted"
  name?: string
  error?: "not_logged_in" | "not_found" | "self" | string
}> {
  const sb = createClient()
  const { data: auth } = await sb.auth.getUser()
  const me = auth.user?.id
  if (!me) return { ok: false, error: "not_logged_in" }

  const target = await lookupByCode(code)
  if (!target) return { ok: false, error: "not_found" }
  if (target.id === me) return { ok: false, error: "self" }

  // 기존 관계(양방향) 확인
  const { data: existing } = await sb
    .from("friendships")
    .select("id,requester_id,addressee_id,status")
    .or(`and(requester_id.eq.${me},addressee_id.eq.${target.id}),and(requester_id.eq.${target.id},addressee_id.eq.${me})`)
  const rel = (existing ?? [])[0] as
    | { id: string; requester_id: string; addressee_id: string; status: string }
    | undefined

  if (rel) {
    if (rel.status === "accepted") return { ok: true, status: "accepted", name: target.name }
    if (rel.addressee_id === me) {
      // 상대가 내게 보낸 pending → 수락
      await sb.from("friendships").update({ status: "accepted" }).eq("id", rel.id)
      return { ok: true, status: "accepted", name: target.name }
    }
    return { ok: true, status: "requested", name: target.name } // 이미 내가 보낸 요청
  }

  const { error } = await sb
    .from("friendships")
    .insert({ requester_id: me, addressee_id: target.id, status: "pending" })
  if (error) return { ok: false, error: error.message }
  return { ok: true, status: "requested", name: target.name }
}

export type PendingRequest = { friendshipId: string; requesterId: string; name: string; iljuKey: string }

/** 내가 받은 친구 요청(pending, addressee=나). */
export async function fetchPendingRequests(): Promise<PendingRequest[]> {
  const sb = createClient()
  const { data: auth } = await sb.auth.getUser()
  const me = auth.user?.id
  if (!me) return []
  const { data, error } = await sb
    .from("friendships")
    .select("id,requester_id,requester:profiles!requester_id(name,ilju_key)")
    .eq("addressee_id", me)
    .eq("status", "pending")
  if (error || !data) return []
  return (data as unknown as { id: string; requester_id: string; requester: { name: string; ilju_key: string } | null }[])
    .map(r => ({ friendshipId: r.id, requesterId: r.requester_id, name: r.requester?.name ?? "친구", iljuKey: r.requester?.ilju_key ?? "" }))
}

export async function acceptRequest(friendshipId: string): Promise<void> {
  const sb = createClient()
  await sb.from("friendships").update({ status: "accepted" }).eq("id", friendshipId)
}

export async function declineRequest(friendshipId: string): Promise<void> {
  const sb = createClient()
  await sb.from("friendships").delete().eq("id", friendshipId)
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
