"use client"
import { useState, useEffect } from "react"
import { type UserInventory, DEFAULT_INVENTORY, loadInventory } from "@/lib/inventory"
import { useUser } from "@/lib/UserContext"

export function useInventory(): UserInventory {
  const { ilju } = useUser()
  const [inv, setInv] = useState<UserInventory>(DEFAULT_INVENTORY)
  useEffect(() => { setInv(loadInventory()) }, [])
  // 일주 캐릭터는 단일 소스(user.ilju)에서 주입 — 인벤토리에 따로 저장/하드코딩하지 않음.
  // ilju 없으면(미온보딩) 저장된 폴백 사용.
  return { ...inv, iljuKey: ilju?.id ?? inv.iljuKey }
}
