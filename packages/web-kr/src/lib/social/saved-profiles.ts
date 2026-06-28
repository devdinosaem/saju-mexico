"use client"
import { createClient } from "@/lib/supabase/client"
import { calcIlju } from "@/lib/ilju-calc"

// "사주 볼 타인" — 내가 저장한 타인 사주(친구관계와 무관, 본인 전용).
// 정책: docs/SOCIAL-BACKEND-POLICY.md §11 #2.
// 핵심: 생일(년월일시분+성별) 수정 시 일주(ilju_key) 자동 재계산.

/** 관계유형 칩 프리셋 (UI 입력창에서 사용). 이 외엔 자유 입력(직접 입력). */
export const RELATION_PRESETS = ["친구", "가족", "연인", "자녀", "부모님"] as const
export type RelationPreset = typeof RELATION_PRESETS[number]

/** 저장용 생일(앱 입력 시트 MockBirthDate와 동일 결, name 제외). */
export type SavedBirth = {
  year: string
  month: string
  day: string
  hour: string
  minute: string
  ampm: "AM" | "PM"
  gender: "M" | "F"
}

export type SavedProfile = {
  id: string
  name: string
  relation: string | null   // 프리셋 또는 직접 입력 문자열
  iljuKey: string           // 생일에서 파생 (자동 계산)
  birth: SavedBirth
  createdAt: string
}

/** 생일 → 일주키("갑자-f"). 생일 바뀔 때마다 이걸로 재계산. */
export function iljuFromBirth(b: SavedBirth): string {
  return calcIlju(b.year, b.month, b.day, b.gender).id
}

type Row = { id: string; name: string; relation: string | null; ilju_key: string; birth_info: SavedBirth; created_at: string }

const toModel = (r: Row): SavedProfile => ({
  id: r.id, name: r.name, relation: r.relation, iljuKey: r.ilju_key, birth: r.birth_info, createdAt: r.created_at,
})

/** 내가 저장한 타인 목록(최신 먼저). */
export async function fetchSavedProfiles(): Promise<SavedProfile[]> {
  const sb = createClient()
  const { data: auth } = await sb.auth.getUser()
  if (!auth.user) return []
  const { data, error } = await sb
    .from("saved_profiles")
    .select("id,name,relation,ilju_key,birth_info,created_at")
    .order("created_at", { ascending: false })
  if (error || !data) return []
  return (data as unknown as Row[]).map(toModel)
}

/** 저장. 일주는 생일에서 자동 계산. */
export async function createSavedProfile(input: { name: string; relation?: string; birth: SavedBirth }): Promise<{ ok: boolean; error?: string }> {
  const sb = createClient()
  const { data: auth } = await sb.auth.getUser()
  const me = auth.user?.id
  if (!me) return { ok: false, error: "not_logged_in" }
  const { error } = await sb.from("saved_profiles").insert({
    owner_id: me,
    name: input.name.trim(),
    relation: input.relation?.trim() || null,
    ilju_key: iljuFromBirth(input.birth),
    birth_info: input.birth,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

/** 수정. birth가 오면 일주 자동 재계산해서 함께 갱신. */
export async function updateSavedProfile(
  id: string,
  patch: { name?: string; relation?: string | null; birth?: SavedBirth },
): Promise<{ ok: boolean; error?: string }> {
  const sb = createClient()
  const row: Record<string, unknown> = {}
  if (patch.name !== undefined) row.name = patch.name.trim()
  if (patch.relation !== undefined) row.relation = patch.relation?.trim() || null
  if (patch.birth) {
    row.birth_info = patch.birth
    row.ilju_key = iljuFromBirth(patch.birth) // ★ 생일 수정 → 일주 재계산
  }
  if (Object.keys(row).length === 0) return { ok: true }
  const { error } = await sb.from("saved_profiles").update(row).eq("id", id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function deleteSavedProfile(id: string): Promise<void> {
  const sb = createClient()
  await sb.from("saved_profiles").delete().eq("id", id)
}
