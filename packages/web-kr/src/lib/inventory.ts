import { spend } from "./balance"

export type AccessType = "free" | "purchase" | "subscription"

export type UserInventory = {
  iljuKey: string           // 내 일주 캐릭터 키 — 단일 소스(user.ilju)에서 useInventory()가 주입. 항상 무료 접근
  isSubscribed: boolean
  ownedStickers: string[]   // 구매한 소품 키 목록
  ownedSkins: string[]      // 구매한 스킨 ID 목록
  ownedCharacters: string[] // 구매한 캐릭터 키 목록 (iljuKey 제외)
  displayCharacterKey?: string // 대표 캐릭터(소셜 아바타). 미설정 시 = 태생 일주. 소유한 캐릭터만 유효
}

export const INVENTORY_KEY = "saju-inventory-v1"
export const INVENTORY_CHANGE_EVENT = "saju-inventory-change"

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

export function notifyInventoryChange(): void {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(INVENTORY_CHANGE_EVENT))
}

export type ItemType = "sticker" | "skin" | "character"
const OWNED_FIELD: Record<ItemType, "ownedStickers" | "ownedSkins" | "ownedCharacters"> = {
  sticker: "ownedStickers", skin: "ownedSkins", character: "ownedCharacters",
}
export type PurchaseResult = { ok: boolean; reason?: "owned" | "insufficient" }

/** 명태로 아이템 구매 — spend 후 owned 적재. 보유 중이면 무차감(ok), 잔액부족이면 ok:false. */
export function purchaseItem(type: ItemType, key: string, price: number, label?: string): PurchaseResult {
  const inv = loadInventory()
  const field = OWNED_FIELD[type]
  if (inv[field].includes(key)) return { ok: true, reason: "owned" }
  if (!spend(price, label)) return { ok: false, reason: "insufficient" }
  saveInventory({ ...inv, [field]: [...inv[field], key] })
  notifyInventoryChange()
  return { ok: true }
}

/** 카트 일괄 구매 — 미보유분 합계를 한 번에 차감하고 모두 적재(원자적). */
export function purchaseItems(items: { type: ItemType; key: string; price: number }[], label?: string): PurchaseResult {
  const inv = loadInventory()
  const toBuy = items.filter(it => !inv[OWNED_FIELD[it.type]].includes(it.key))
  if (toBuy.length === 0) return { ok: true, reason: "owned" }
  const total = Math.round(toBuy.reduce((s, it) => s + it.price, 0) * 1000) / 1000
  if (!spend(total, label)) return { ok: false, reason: "insufficient" }
  const next: UserInventory = { ...inv }
  for (const it of toBuy) next[OWNED_FIELD[it.type]] = [...next[OWNED_FIELD[it.type]], it.key]
  saveInventory(next)
  notifyInventoryChange()
  return { ok: true }
}

/** 대표 캐릭터 설정. null이면 태생 일주로 리셋. */
export function setDisplayCharacter(key: string | null): UserInventory {
  const next: UserInventory = { ...loadInventory(), displayCharacterKey: key ?? undefined }
  saveInventory(next)
  notifyInventoryChange()
  return next
}
