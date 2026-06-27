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

/** 친구 단일 소스 접근 훅. 모든 화면은 FRIEND_ROOMS 대신 이걸 사용한다. */
export function useFriends() {
  const [friends, setFriends] = useState<Friend[]>([])

  useEffect(() => {
    // 최근 활동순(최신 먼저)으로 정렬 — 스토리 왼쪽=최신, 미니홈피 목록 위=최신
    const load = () => setFriends(sortByActivity(loadFriends()))
    load()
    window.addEventListener(FRIENDS_CHANGE_EVENT, load)
    return () => window.removeEventListener(FRIENDS_CHANGE_EVENT, load)
  }, [])

  const addFriend = useCallback((name: string, iljuKey: string) => {
    const next: Friend[] = [
      ...loadFriends(),
      { id: Date.now().toString(), name: name.trim(), iljuKey },
    ]
    saveFriends(next)
    setFriends(sortByActivity(next)) // 방금 추가 = 최신 → 맨 앞
    notifyFriendsChange()
  }, [])

  const removeFriend = useCallback((id: string) => {
    const next = loadFriends().filter(f => f.id !== id)
    saveFriends(next)
    setFriends(sortByActivity(next))
    notifyFriendsChange()
  }, [])

  return { friends, addFriend, removeFriend }
}
