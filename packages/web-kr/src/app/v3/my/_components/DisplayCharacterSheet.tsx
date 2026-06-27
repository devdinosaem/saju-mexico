"use client"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import { useInventory } from "@/hooks/useInventory"
import { useUser } from "@/lib/UserContext"
import { canAccess, itemAccess, CHARACTER_ACCESS, setDisplayCharacter } from "@/lib/inventory"

/** 대표 캐릭터(소셜 아바타) 변경 시트 — 소유한 캐릭터만. 태생 일주 선택 = 리셋. */
export default function DisplayCharacterSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { ilju } = useUser()
  const inv = useInventory()
  if (!open) return null

  const birthKey = ilju?.id
  const current = inv.displayCharacterKey ?? birthKey
  const owned = Object.keys(ILJU_SVG_ICONS).filter(k => canAccess(k, itemAccess(k, CHARACTER_ACCESS), "character", inv))

  const pick = (key: string) => {
    setDisplayCharacter(key === birthKey ? null : key) // 태생 일주 = 리셋(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-[480px] bg-cream rounded-t-3xl border-t-2 border-x-2 border-charcoal"
        onClick={e => e.stopPropagation()}
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="w-10 h-1 rounded-full bg-charcoal/20 mx-auto mt-3 mb-2" />
        <div className="px-5 pt-2 pb-4 flex flex-col gap-3">
          <div>
            <p className="text-[16px] font-bold text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif" }}>대표 캐릭터 ✦</p>
            <p className="text-[12px] text-text-muted mt-0.5">소셜 아바타로 보일 캐릭터를 골라줘 (사주 일주는 그대로예요)</p>
          </div>
          <div className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto scrollbar-hide py-0.5">
            {owned.map(key => {
              const active = key === current
              const isBirth = key === birthKey
              return (
                <button
                  key={key}
                  onClick={() => pick(key)}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl border transition-colors"
                  style={active
                    ? { background: "#FEF3C7", border: "1.5px solid #F59E0B" }
                    : { background: "white", border: "1px solid #E0D4C0" }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">{ILJU_SVG_ICONS[key]?.()}</div>
                  <span className="text-[9px] text-text-muted">{isBirth ? "기본(일주)" : key}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
