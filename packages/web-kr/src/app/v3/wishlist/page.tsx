"use client"
import { useRouter } from "next/navigation"
import { useWishlist } from "@/hooks/useWishlist"
import { STICKER_MAP } from "../my/_components/MiniRoom"
import { SKINS } from "../my/_components/MiniRoom"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import { wonLabel } from "@/lib/prices"
import type { WishlistItemType } from "@/lib/wishlist"

const TYPE_LABEL: Record<WishlistItemType, string> = {
  sticker: "소품", skin: "스킨", character: "캐릭터",
}

const SECTIONS: WishlistItemType[] = ["sticker", "skin", "character"]

export default function WishlistPage() {
  const router = useRouter()
  const { items, remove, clear, totalPrice, count } = useWishlist()

  const byType = (type: WishlistItemType) => items.filter(i => i.type === type)

  return (
    <>
      {/* 서브 헤더 */}
      <div
        className="fixed top-12 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-20 px-4 h-[52px] flex items-center justify-between"
        style={{ background: "var(--bg-main, #FFFBF2)", borderBottom: "1.5px dashed #D8C4A8" }}
      >
        <button className="text-sm text-text-muted" onClick={() => router.back()}>← 뒤로</button>
        <p className="text-[14px] font-bold text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif" }}>
          담은 목록 🛒
        </p>
        {count > 0 ? (
          <button className="text-[11px] text-red-400" onClick={clear}>비우기</button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="pt-[52px] pb-32 flex flex-col gap-6">
        {count === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="text-5xl">🛒</div>
            <p className="text-[14px] font-bold text-text-muted" style={{ fontFamily: "'BinggraeTaom', sans-serif" }}>
              담은 아이템이 없어요
            </p>
            <p className="text-[12px] text-text-muted">방 꾸미기에서 마음에 드는 걸 담아보세요</p>
          </div>
        ) : (
          SECTIONS.map(type => {
            const section = byType(type)
            if (section.length === 0) return null
            return (
              <div key={type}>
                <div
                  className="pb-2 mb-2"
                  style={{ borderBottom: "1px dashed #E0C99A" }}
                >
                  <span className="text-[12px] font-bold text-[#9A7050]" style={{ fontFamily: "'BinggraeTaom', sans-serif" }}>
                    {TYPE_LABEL[type]} · {section.length}개
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {section.map(item => {
                    const StickerComp = item.type === "sticker" ? STICKER_MAP[item.key] : null
                    const skin = item.type === "skin" ? SKINS.find(s => s.id === item.key) : null
                    const charIconFn = item.type === "character" ? ILJU_SVG_ICONS[item.key] : null

                    return (
                      <div
                        key={item.key}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-white border border-charcoal/10"
                      >
                        {/* 프리뷰 */}
                        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-charcoal/10"
                          style={{ background: skin?.preview ?? "#F8F8F8" }}
                        >
                          {StickerComp && <StickerComp className="w-7 h-7" />}
                          {skin && (
                            <div className="w-full h-full relative">
                              <div className="absolute inset-0" style={{ background: skin.wallL, clipPath: "polygon(0 0, 50% 0, 50% 38%, 0 70%)" }} />
                              <div className="absolute inset-0" style={{ background: skin.wallR, clipPath: "polygon(50% 0, 100% 0, 100% 70%, 50% 38%)" }} />
                              <div className="absolute inset-0" style={{ background: skin.floor, clipPath: "polygon(50% 38%, 0 70%, 0 100%, 100% 100%, 100% 70%)" }} />
                            </div>
                          )}
                          {charIconFn && <div className="w-full h-full">{charIconFn()}</div>}
                        </div>

                        {/* 이름 + 가격 */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold text-charcoal truncate">{item.name}</p>
                          <p className="text-[11px] text-text-muted">{item.price}명태 · {wonLabel(item.price)}</p>
                        </div>

                        {/* 제거 */}
                        <button
                          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-text-muted active:opacity-60"
                          style={{ background: "#F1F5F9" }}
                          onClick={() => remove(item.key)}
                        >
                          <span className="text-[12px] leading-none">✕</span>
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* 하단 고정 — 합계 + 구매 CTA */}
      {count > 0 && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-30 px-4 py-3"
          style={{ background: "var(--bg-main, #FFFBF2)", borderTop: "1.5px dashed #D8C4A0" }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[13px] text-text-muted" style={{ fontFamily: "'BinggraeTaom', sans-serif" }}>
              총 {count}개
            </span>
            <span className="text-[15px] font-bold text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif" }}>
              {totalPrice}명태 · {wonLabel(totalPrice)}
            </span>
          </div>
          <button
            className="w-full h-[52px] rounded-xl bg-charcoal text-cream text-[15px] font-bold active:opacity-80 transition-opacity flex items-center justify-center gap-2"
            style={{ fontFamily: "'BinggraeTaom', sans-serif" }}
            onClick={() => alert("결제 준비 중이에요 ✨")}
          >
            🛒 전체 구매하기
          </button>
        </div>
      )}
    </>
  )
}
