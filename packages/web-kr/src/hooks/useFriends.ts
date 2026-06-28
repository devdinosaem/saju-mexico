"use client"
import { useCallback, useEffect, useState } from "react"
import {
  type Friend,
  FRIENDS_CHANGE_EVENT,
  loadFriends,
  saveFriends,
  notifyFriendsChange,
  sortByActivity,
} from "@/lib/friends"
import { SOCIAL_BACKEND_ENABLED, ensureDevSession } from "@/lib/supabase/dev-session"
import { fetchFriends, addFriendByCode, removeFriendLink } from "@/lib/social/friends"

/** 친구 단일 소스 접근 훅.
 *  - 백엔드 모드(SOCIAL_BACKEND_ENABLED): Supabase friendships 실연동.
 *  - 그 외: 기존 localStorage 모델(샘플/로컬). */
export function useFriends() {
  const [friends, setFriends] = useState<Friend[]>([])

  useEffect(() => {
    if (SOCIAL_BACKEND_ENABLED) {
      let alive = true
      const load = async () => {
        await ensureDevSession()
        const list = await fetchFriends()
        if (alive) setFriends(list)
      }
      void load()
      window.addEventListener(FRIENDS_CHANGE_EVENT, load)
      return () => { alive = false; window.removeEventListener(FRIENDS_CHANGE_EVENT, load) }
    }
    // localStorage 모드 — 최근 활동순(스토리 왼쪽=최신, 미니홈피 목록 위=최신)
    const load = () => setFriends(sortByActivity(loadFriends()))
    load()
    window.addEventListener(FRIENDS_CHANGE_EVENT, load)
    return () => window.removeEventListener(FRIENDS_CHANGE_EVENT, load)
  }, [])

  // 백엔드 모드: nameOrCode = friend_code / 로컬 모드: name(+iljuKey)
  const addFriend = useCallback(async (nameOrCode: string, iljuKey?: string) => {
    if (SOCIAL_BACKEND_ENABLED) {
      await addFriendByCode(nameOrCode)
      notifyFriendsChange()
      return
    }
    const next: Friend[] = [
      ...loadFriends(),
      { id: Date.now().toString(), name: nameOrCode.trim(), iljuKey: iljuKey ?? "" },
    ]
    saveFriends(next)
    setFriends(sortByActivity(next))
    notifyFriendsChange()
  }, [])

  const removeFriend = useCallback(async (id: string) => {
    if (SOCIAL_BACKEND_ENABLED) {
      await removeFriendLink(id)
      notifyFriendsChange()
      return
    }
    const next = loadFriends().filter(f => f.id !== id)
    saveFriends(next)
    setFriends(sortByActivity(next))
    notifyFriendsChange()
  }, [])

  return { friends, addFriend, removeFriend }
}
