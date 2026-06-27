"use client"
import { useUser } from "@/lib/UserContext"
import { useInventory } from "./useInventory"
import { canAccess, itemAccess, CHARACTER_ACCESS } from "@/lib/inventory"

/**
 * 내 소셜 아바타에 쓸 캐릭터 키 (정체성 vs 아바타 룰).
 * 우선순위: 대표 캐릭터(소유 중일 때) → 태생 일주 → null(미온보딩=플레이스홀더).
 * 사주 정체성 맥락에는 쓰지 말 것(그건 항상 user.ilju.id).
 */
export function useMyDisplayCharacter(): string | null {
  const { ilju } = useUser()
  const inv = useInventory()
  const birth = ilju?.id ?? null
  const dk = inv.displayCharacterKey
  if (dk && canAccess(dk, itemAccess(dk, CHARACTER_ACCESS), "character", inv)) return dk
  return birth
}
