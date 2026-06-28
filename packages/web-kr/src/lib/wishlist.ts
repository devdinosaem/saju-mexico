export type WishlistItemType = "sticker" | "skin" | "character"

export type WishlistItem = {
  type: WishlistItemType
  key: string
  name: string
  price: number   // 명태 단위
}

export const WISHLIST_KEY = "saju-wishlist-v1"

export function loadWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return []
}

export function saveWishlist(items: WishlistItem[]): void {
  try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(items)) } catch {}
}
