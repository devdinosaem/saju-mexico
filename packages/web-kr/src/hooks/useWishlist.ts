"use client"
import { useState, useEffect, useCallback } from "react"
import { type WishlistItem, loadWishlist, saveWishlist } from "@/lib/wishlist"

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => { setItems(loadWishlist()) }, [])

  const sync = useCallback((next: WishlistItem[]) => {
    setItems(next)
    saveWishlist(next)
  }, [])

  const toggle = useCallback((item: WishlistItem) => {
    setItems(prev => {
      const next = prev.some(i => i.key === item.key)
        ? prev.filter(i => i.key !== item.key)
        : [...prev, item]
      saveWishlist(next)
      return next
    })
  }, [])

  const remove = useCallback((key: string) => {
    setItems(prev => { const next = prev.filter(i => i.key !== key); saveWishlist(next); return next })
  }, [])

  const clear = useCallback(() => sync([]), [sync])

  const has = useCallback((key: string) => items.some(i => i.key === key), [items])

  const totalPrice = items.reduce((s, i) => s + i.price, 0)

  return { items, toggle, remove, clear, has, totalPrice, count: items.length }
}
