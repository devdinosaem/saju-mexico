"use client"
import { useCallback, useEffect, useState } from "react"
import { SOCIAL_BACKEND_ENABLED, ensureDevSession } from "@/lib/supabase/dev-session"
import {
  fetchSavedProfiles, createSavedProfile, updateSavedProfile, deleteSavedProfile,
  type SavedProfile, type SavedBirth,
} from "@/lib/social/saved-profiles"

/** "사주 볼 타인" 목록 + CRUD 훅. 백엔드 모드에서만 동작. */
export function useSavedProfiles() {
  const [profiles, setProfiles] = useState<SavedProfile[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!SOCIAL_BACKEND_ENABLED) { setProfiles([]); setLoading(false); return }
    await ensureDevSession()
    setProfiles(await fetchSavedProfiles())
    setLoading(false)
  }, [])

  useEffect(() => { void load() }, [load])

  const add = useCallback(async (input: { name: string; relation?: string; birth: SavedBirth }) => {
    const res = await createSavedProfile(input)
    if (res.ok) await load()
    return res
  }, [load])

  const update = useCallback(async (id: string, patch: { name?: string; relation?: string | null; birth?: SavedBirth }) => {
    const res = await updateSavedProfile(id, patch)
    if (res.ok) await load()
    return res
  }, [load])

  const remove = useCallback(async (id: string) => {
    await deleteSavedProfile(id)
    await load()
  }, [load])

  return { profiles, loading, add, update, remove, reload: load }
}
