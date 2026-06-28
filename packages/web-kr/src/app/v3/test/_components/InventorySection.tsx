"use client"
import { useEffect, useState } from "react"
import SectionCard from "./SectionCard"
import { loadInventory, saveInventory, INVENTORY_KEY, type UserInventory, STICKER_ACCESS } from "@/lib/inventory"
import { ITEM_PRICES, priceLabel } from "@/lib/prices"
import { SKINS } from "@/app/v3/my/_components/MiniRoom"

const PURCHASE_STICKERS = ["CrystalBall", "MagicWand", "Tarot", "Crystal"]
const SUBSCRIPTION_STICKERS = ["Crown"]

const STICKER_LABELS: Record<string, string> = {
  CrystalBall: "수정구슬", MagicWand: "마법봉", Tarot: "타로", Crystal: "크리스탈", Crown: "왕관",
}

function syncInventory(updater: (prev: UserInventory) => UserInventory) {
  const prev = loadInventory()
  const next = updater(prev)
  saveInventory(next)
  window.dispatchEvent(new Event("saju-inventory-change"))
  return next
}

export default function InventorySection() {
  const [inv, setInv] = useState<UserInventory>(loadInventory())

  useEffect(() => {
    setInv(loadInventory())
    const handler = () => setInv(loadInventory())
    window.addEventListener("saju-inventory-change", handler)
    window.addEventListener(INVENTORY_KEY, handler)
    return () => {
      window.removeEventListener("saju-inventory-change", handler)
      window.removeEventListener(INVENTORY_KEY, handler)
    }
  }, [])

  const toggleSubscription = () => {
    setInv(syncInventory(p => ({
      ...p,
      isSubscribed: !p.isSubscribed,
      ownedStickers: !p.isSubscribed ? p.ownedStickers : p.ownedStickers.filter(s => STICKER_ACCESS[s] !== "subscription"),
      ownedSkins: !p.isSubscribed ? p.ownedSkins : p.ownedSkins.filter(s => SKINS.find(sk => sk.id === s)?.access !== "subscription"),
    })))
  }

  const toggleSticker = (key: string) => {
    setInv(syncInventory(p => ({
      ...p,
      ownedStickers: p.ownedStickers.includes(key)
        ? p.ownedStickers.filter(s => s !== key)
        : [...p.ownedStickers, key],
    })))
  }

  const toggleSkin = (id: string) => {
    setInv(syncInventory(p => ({
      ...p,
      ownedSkins: p.ownedSkins.includes(id)
        ? p.ownedSkins.filter(s => s !== id)
        : [...p.ownedSkins, id],
    })))
  }

  const selectAllStickers = () => {
    setInv(syncInventory(p => ({ ...p, ownedStickers: [...PURCHASE_STICKERS, ...SUBSCRIPTION_STICKERS] })))
  }
  const clearStickers = () => {
    setInv(syncInventory(p => ({ ...p, ownedStickers: [] })))
  }
  const selectAllSkins = () => {
    setInv(syncInventory(p => ({ ...p, ownedSkins: SKINS.map(s => s.id) })))
  }
  const clearSkins = () => {
    setInv(syncInventory(p => ({ ...p, ownedSkins: [] })))
  }

  const purchaseSkins = SKINS.filter(s => s.access === "purchase" || s.access === "free")
  const subSkins = SKINS.filter(s => s.access === "subscription")

  return (
    <SectionCard title="인벤토리" emoji="🎒">
      {/* 구독 */}
      <div className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200 px-3 py-2.5">
        <div>
          <p className="text-[13px] font-bold text-charcoal">구독 상태</p>
          <p className="text-[11px] text-text-muted">
            {inv.isSubscribed ? "구독 중 — 구독 전용 아이템 해금" : "비구독 — Crown·Lemon 잠김"}
          </p>
        </div>
        <button
          onClick={toggleSubscription}
          className={`px-4 py-1.5 rounded-full text-[12px] font-bold border-2 active:opacity-70 ${
            inv.isSubscribed ? "bg-amber-400 text-white border-amber-400" : "bg-white text-charcoal border-charcoal/30"
          }`}
        >
          {inv.isSubscribed ? "ON" : "OFF"}
        </button>
      </div>

      {/* 소품 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] font-bold text-charcoal">소품</p>
          <div className="flex gap-1.5">
            <button onClick={selectAllStickers} className="text-[10px] text-pink border border-pink/40 rounded-full px-2.5 py-0.5 active:opacity-70">전체</button>
            <button onClick={clearStickers} className="text-[10px] text-text-muted border border-charcoal/20 rounded-full px-2.5 py-0.5 active:opacity-70">해제</button>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {PURCHASE_STICKERS.map(key => (
            <label key={key} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={inv.ownedStickers.includes(key)}
                onChange={() => toggleSticker(key)}
                className="w-4 h-4 rounded accent-[#2D2D2D]"
              />
              <span className="text-[13px] text-charcoal flex-1">{STICKER_LABELS[key] ?? key}</span>
              <span className="text-[10px] text-text-muted bg-white border border-charcoal/10 rounded-full px-2 py-0.5">구매 {priceLabel(ITEM_PRICES.sticker)}</span>
            </label>
          ))}
          {SUBSCRIPTION_STICKERS.map(key => (
            <label key={key} className={`flex items-center gap-2.5 cursor-pointer ${!inv.isSubscribed ? "opacity-40" : ""}`}>
              <input
                type="checkbox"
                checked={inv.ownedStickers.includes(key)}
                onChange={() => inv.isSubscribed && toggleSticker(key)}
                disabled={!inv.isSubscribed}
                className="w-4 h-4 rounded accent-[#2D2D2D]"
              />
              <span className="text-[13px] text-charcoal flex-1">{STICKER_LABELS[key] ?? key}</span>
              <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">구독 전용</span>
            </label>
          ))}
        </div>
      </div>

      {/* 스킨 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] font-bold text-charcoal">스킨</p>
          <div className="flex gap-1.5">
            <button onClick={selectAllSkins} className="text-[10px] text-pink border border-pink/40 rounded-full px-2.5 py-0.5 active:opacity-70">전체</button>
            <button onClick={clearSkins} className="text-[10px] text-text-muted border border-charcoal/20 rounded-full px-2.5 py-0.5 active:opacity-70">해제</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {SKINS.map(skin => {
            const isSubOnly = skin.access === "subscription"
            const disabled = isSubOnly && !inv.isSubscribed
            const owned = skin.access === "free" || inv.ownedSkins.includes(skin.id) || (isSubOnly && inv.isSubscribed)
            return (
              <label
                key={skin.id}
                className={`flex items-center gap-2 cursor-pointer rounded-xl px-2.5 py-2 border ${
                  disabled ? "opacity-40" : ""
                } ${owned ? "border-charcoal/20 bg-white" : "border-charcoal/10 bg-white/50"}`}
              >
                <div className="w-5 h-5 rounded-full shrink-0 border border-charcoal/20" style={{ background: skin.preview }} />
                <input
                  type="checkbox"
                  checked={inv.ownedSkins.includes(skin.id)}
                  onChange={() => !disabled && toggleSkin(skin.id)}
                  disabled={disabled || skin.access === "free"}
                  className="w-3.5 h-3.5 rounded accent-[#2D2D2D]"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-charcoal truncate">{skin.name}</p>
                  <p className="text-[9px] text-text-muted">
                    {skin.access === "free" ? "무료" : skin.access === "subscription" ? "구독" : priceLabel(ITEM_PRICES.skin)}
                  </p>
                </div>
              </label>
            )
          })}
        </div>
      </div>
    </SectionCard>
  )
}
