"use client"
import { useState, useEffect } from "react"
import { type UserInventory, DEFAULT_INVENTORY, loadInventory, INVENTORY_CHANGE_EVENT } from "@/lib/inventory"
import { useUser } from "@/lib/UserContext"

export function useInventory(): UserInventory {
  const { ilju } = useUser()
  const [inv, setInv] = useState<UserInventory>(DEFAULT_INVENTORY)
  useEffect(() => {
    const load = () => setInv(loadInventory())
    load()
    window.addEventListener(INVENTORY_CHANGE_EVENT, load)
    return () => window.removeEventListener(INVENTORY_CHANGE_EVENT, load)
  }, [])
  // 일주 캐릭터는 단일 소스(user.ilju)에서 주입 — 인벤토리에 따로 저장/하드코딩하지 않음.
  // ilju 없으면(미온보딩) 저장된 폴백 사용.
  return { ...inv, iljuKey: ilju?.id ?? inv.iljuKey }
}
