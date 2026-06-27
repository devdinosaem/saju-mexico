export type AccessType = "free" | "purchase" | "subscription"

export type UserInventory = {
  iljuKey: string           // 내 일주 캐릭터 키 — 단일 소스(user.ilju)에서 useInventory()가 주입. 항상 무료 접근
  isSubscribed: boolean
  ownedStickers: string[]   // 구매한 소품 키 목록
  ownedSkins: string[]      // 구매한 스킨 ID 목록
  ownedCharacters: string[] // 구매한 캐릭터 키 목록 (iljuKey 제외)
}

export const INVENTORY_KEY = "saju-inventory-v1"

export const DEFAULT_INVENTORY: UserInventory = {
  iljuKey: "경진-m",        // 미온보딩 폴백 전용 (온보딩 후엔 user.ilju가 주입됨)
  isSubscribed: false,
  ownedStickers: [],
  ownedSkins: [],
  ownedCharacters: [],
}

// 아이템별 접근 등급 레지스트리 — 미분류 항목은 "free" 기본값
export const STICKER_ACCESS: Record<string, AccessType> = {
  CrystalBall: "purchase",
  MagicWand:   "purchase",
  Tarot:       "purchase",
  Crystal:     "purchase",
  Crown:       "subscription",
}
export const CHARACTER_ACCESS: Record<string, AccessType> = {}
// 스킨 접근 등급은 RoomSkin.access 에 직접 정의

export function canAccess(
  key: string,
  access: AccessType,
  type: "sticker" | "skin" | "character",
  inv: UserInventory,
): boolean {
  if (access === "free") return true
  if (access === "subscription") return inv.isSubscribed
  switch (type) {
    case "sticker":   return inv.ownedStickers.includes(key)
    case "skin":      return inv.ownedSkins.includes(key)
    case "character": return inv.ownedCharacters.includes(key) || key === inv.iljuKey
  }
}

export function itemAccess(key: string, registry: Record<string, AccessType>): AccessType {
  return registry[key] ?? "free"
}

export function loadInventory(): UserInventory {
  if (typeof window === "undefined") return DEFAULT_INVENTORY
  try {
    const raw = localStorage.getItem(INVENTORY_KEY)
    if (raw) return { ...DEFAULT_INVENTORY, ...JSON.parse(raw) }
  } catch {}
  return DEFAULT_INVENTORY
}

export function saveInventory(inv: UserInventory): void {
  try { localStorage.setItem(INVENTORY_KEY, JSON.stringify(inv)) } catch {}
}
