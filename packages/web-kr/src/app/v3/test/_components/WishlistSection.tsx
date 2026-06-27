"use client"
import { useEffect, useState } from "react"
import SectionCard from "./SectionCard"
import { loadWishlist, saveWishlist, WISHLIST_KEY, type WishlistItem } from "@/lib/wishlist"

const SAMPLE_ITEMS: WishlistItem[] = [
  { type: "sticker", key: "CrystalBall", name: "수정구슬", price: 0.3 },
  { type: "sticker", key: "Crown",       name: "왕관",     price: 0.3 },
  { type: "skin",    key: "pink",        name: "봄 벚꽃",  price: 2   },
  { type: "skin",    key: "ocean",       name: "여름 바다", price: 2   },
  { type: "character", key: "갑자-m",   name: "갑자(남)",  price: 3   },
]

const TYPE_LABEL: Record<string, string> = { sticker: "소품", skin: "스킨", character: "캐릭터" }
const TYPE_COLOR: Record<string, string> = {
  sticker: "#FFF0F5", skin: "#EFF6FF", character: "#F5F0FF",
}

export default function WishlistSection() {
  const [items, setItems] = useState<WishlistItem[]>([])

  const sync = () => setItems(loadWishlist())

  useEffect(() => {
    sync()
    const handler = () => sync()
    window.addEventListener("saju-wishlist-change", handler)
    return () => window.removeEventListener("saju-wishlist-change", handler)
  }, [])

  const clearAll = () => {
    saveWishlist([])
    sync()
  }

  const addSample = (item: WishlistItem) => {
    const current = loadWishlist()
    if (current.find(i => i.key === item.key)) return
    saveWishlist([...current, item])
    sync()
  }

  const fillAll = () => {
    saveWishlist(SAMPLE_ITEMS)
    sync()
  }

  const removeItem = (key: string) => {
    const current = loadWishlist()
    saveWishlist(current.filter(i => i.key !== key))
    sync()
  }

  const total = items.reduce((s, i) => s + i.price, 0)

  return (
    <SectionCard title="위시리스트" emoji="❤️" defaultOpen={false}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-bold text-charcoal">
          {items.length}개 담김 · 합계 {total.toFixed(1)}명태
        </p>
        <button
          onClick={clearAll}
          className="text-[11px] text-red-400 border border-red-200 rounded-full px-3 py-1 active:opacity-70"
        >
          전체 삭제
        </button>
      </div>

      {items.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {items.map(item => (
            <div key={item.key} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: TYPE_COLOR[item.type] }}>
              <span className="text-[10px] text-text-muted w-10">{TYPE_LABEL[item.type]}</span>
              <span className="flex-1 text-[12px] font-bold text-charcoal">{item.name}</span>
              <span className="text-[11px] text-text-muted">{item.price}명태</span>
              <button onClick={() => removeItem(item.key)} className="text-[11px] text-red-400 ml-1 active:opacity-70">✕</button>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="text-[11px] text-text-muted mb-1.5">샘플 추가</p>
        <div className="flex flex-wrap gap-1.5">
          {SAMPLE_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => addSample(item)}
              disabled={!!items.find(i => i.key === item.key)}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-charcoal/20 active:opacity-70 disabled:opacity-30"
              style={{ background: TYPE_COLOR[item.type] }}
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={fillAll}
            className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-charcoal bg-charcoal text-cream active:opacity-70"
          >
            전부 채우기
          </button>
        </div>
      </div>
    </SectionCard>
  )
}
