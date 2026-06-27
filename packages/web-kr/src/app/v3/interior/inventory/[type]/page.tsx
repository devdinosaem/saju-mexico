"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DoodleBox } from "@/components/doodles"
import { STICKER_MAP, SKINS } from "../../../my/_components/MiniRoom"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import { useInventory } from "@/hooks/useInventory"
import { useUser } from "@/lib/UserContext"
import { canAccess, itemAccess, STICKER_ACCESS, CHARACTER_ACCESS } from "@/lib/inventory"
import { ITEM_PRICES } from "@/lib/prices"

const PROP_NAMES: Record<string, string> = {
  Chair: "의자", Sofa: "소파", Lamp: "조명", Mirror: "거울", Clock: "시계",
  Candle: "캔들", Pillow: "쿠션", Basket: "바구니", Plant: "화분", Cactus: "선인장",
  Tulip: "튤립", Rose: "장미", Sunflower: "해바라기", Vase: "꽃병",
  CrystalBall: "수정구", MagicWand: "마법봉", Tarot: "타로", Crystal: "크리스탈",
  Star: "별", Heart: "하트", Moon: "달", Sparkle: "반짝이", Crown: "왕관",
  Balloon: "풍선", Rainbow: "무지개", Vinyl: "바이닐", Cassette: "카세트",
  Headphones: "헤드폰", BubbleTea: "버블티", Coffee: "커피", Matcha: "말차",
}

const CATEGORIES = [
  { label: "전체",    keys: [] as string[] },
  { label: "가구",    keys: ["Chair","Sofa","Lamp","Mirror","Clock"] },
  { label: "꽃·식물", keys: ["Plant","Cactus","Tulip","Rose","Sunflower","Vase"] },
  { label: "소품",    keys: ["Candle","Pillow","Basket"] },
  { label: "음료",    keys: ["BubbleTea","Coffee","Matcha"] },
  { label: "음악",    keys: ["Vinyl","Cassette","Headphones"] },
  { label: "사주",    keys: ["CrystalBall","MagicWand","Tarot","Crystal"] },
  { label: "감성",    keys: ["Star","Heart","Moon","Sparkle","Crown","Balloon","Rainbow"] },
]
CATEGORIES[0].keys = Object.keys(STICKER_MAP)

function MiniHeader({ title, subtitle, onBack }: { title: string; subtitle: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 pt-3 pb-4" style={{ borderBottom: "1px solid #EDE4D4" }}>
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full shrink-0 active:opacity-60"
        style={{ background: "#EDE4D4" }}
        onClick={onBack}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="#5C4A3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div>
        <p className="text-[15px] font-bold text-charcoal leading-none">{title}</p>
        <p className="text-[11px] text-text-muted mt-0.5">{subtitle}</p>
      </div>
    </div>
  )
}

function PropsView({ onBack }: { onBack: () => void }) {
  const [cat, setCat] = useState(0)
  const inv = useInventory()
  const router = useRouter()

  const keys = CATEGORIES[cat].keys
  const ownedCount = CATEGORIES[0].keys.filter(k => canAccess(k, itemAccess(k, STICKER_ACCESS), "sticker", inv)).length

  return (
    <div className="flex flex-col gap-0">
      <MiniHeader title="소품 보관함" subtitle={`${ownedCount}개 보유`} onBack={onBack} />

      <div className="flex gap-2 overflow-x-auto py-3" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((c, i) => (
          <button
            key={c.label}
            onClick={() => setCat(i)}
            className="shrink-0 px-4 py-1.5 rounded-full text-[13px] font-bold transition-all"
            style={{
              background: cat === i ? "#1C1C1E" : "white",
              color: cat === i ? "white" : "#5C4A3A",
              border: `1.5px solid ${cat === i ? "#1C1C1E" : "#DDD3C4"}`,
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
        {keys.map(key => {
          const Icon = STICKER_MAP[key]
          const owned = canAccess(key, itemAccess(key, STICKER_ACCESS), "sticker", inv)
          return (
            <button
              key={key}
              className="shrink-0 flex flex-col items-center rounded-2xl pt-3.5 px-2.5 pb-3 active:scale-95 transition-transform relative"
              style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.07)", width: 80 }}
            >
              {!owned && (
                <div
                  className="absolute top-2 right-2 flex items-center justify-center rounded-full z-10"
                  style={{ width: 17, height: 17, background: "rgba(0,0,0,0.07)" }}
                >
                  <span style={{ fontSize: 9, lineHeight: 1 }}>🔒</span>
                </div>
              )}
              <div style={{ filter: owned ? "none" : "grayscale(0.6) opacity(0.5)" }}>
                <DoodleBox className="w-12 h-12"><Icon /></DoodleBox>
              </div>
              <span className="text-[11px] font-bold text-charcoal text-center mt-2 leading-tight w-full truncate px-1">
                {PROP_NAMES[key]}
              </span>
              <span className="text-[10px] mt-0.5" style={{ color: owned ? "#10B981" : "#B8A898" }}>
                {owned ? "보유 중" : `${ITEM_PRICES.sticker}명태`}
              </span>
            </button>
          )
        })}
      </div>

      <button
        className="w-full py-3.5 rounded-2xl text-[14px] font-bold text-charcoal active:opacity-80 transition-opacity mt-2"
        style={{ background: "#FFF9F0", border: "2px solid #2D2D2D", boxShadow: "2px 2px 0px #2D2D2D" }}
        onClick={() => router.push("/v3/inventory?tab=소품")}
      >
        소품 구매하러 가기 →
      </button>
    </div>
  )
}

function SkinsView({ onBack }: { onBack: () => void }) {
  const router = useRouter()
  const inv = useInventory()

  const ownedSkins  = SKINS.filter(s =>  canAccess(s.id, s.access, "skin", inv))
  const lockedSkins = SKINS.filter(s => !canAccess(s.id, s.access, "skin", inv))

  return (
    <div className="flex flex-col gap-4">
      <MiniHeader title="스킨 보관함" subtitle={`${ownedSkins.length}개 보유`} onBack={onBack} />

      <div className="grid grid-cols-2 gap-3">
        {ownedSkins.map(skin => (
          <div key={skin.id} className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
            <div className="relative h-28 overflow-hidden" style={{ background: skin.bg }}>
              <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 45% 0, 45% 100%, 0 100%)", background: skin.wallL }} />
              <div className="absolute inset-0" style={{ clipPath: "polygon(45% 0, 100% 0, 100% 60%, 45% 60%)", background: skin.wallR }} />
              <div className="absolute bottom-0 left-0 right-0" style={{ height: "40%", background: skin.floor }} />
              <div className="absolute left-0 right-0" style={{ bottom: "40%", height: "1.5px", background: skin.line }} />
              <div className="absolute top-2 right-2 text-white text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#10B981" }}>보유</div>
            </div>
            <div className="px-3 py-2.5 bg-white flex items-center justify-between">
              <span className="text-[13px] font-bold text-charcoal">{skin.name}</span>
              <span className="text-[11px] font-bold" style={{ color: "#10B981" }}>✓</span>
            </div>
          </div>
        ))}
        {lockedSkins.map(skin => (
          <div key={skin.id} className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)", opacity: 0.6 }}>
            <div className="relative h-28 overflow-hidden" style={{ background: skin.bg }}>
              <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 45% 0, 45% 100%, 0 100%)", background: skin.wallL }} />
              <div className="absolute inset-0" style={{ clipPath: "polygon(45% 0, 100% 0, 100% 60%, 45% 60%)", background: skin.wallR }} />
              <div className="absolute bottom-0 left-0 right-0" style={{ height: "40%", background: skin.floor }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl" style={{ filter: "grayscale(1)" }}>🔒</span>
              </div>
            </div>
            <div className="px-3 py-2.5 bg-white flex items-center justify-between">
              <span className="text-[13px] font-bold text-charcoal">{skin.name}</span>
              <span className="text-[11px] font-bold" style={{ color: "#C8B898" }}>{ITEM_PRICES.skin}명태</span>
            </div>
          </div>
        ))}
      </div>

      <button
        className="w-full py-3.5 rounded-2xl text-[14px] font-bold text-charcoal active:opacity-80 transition-opacity"
        style={{ background: "#FFF9F0", border: "2px solid #2D2D2D", boxShadow: "2px 2px 0px #2D2D2D" }}
        onClick={() => router.push("/v3/my/room")}
      >
        방 편집에서 적용하기 →
      </button>
    </div>
  )
}

function CharactersView({ onBack }: { onBack: () => void }) {
  const router = useRouter()
  const inv = useInventory()
  const { ilju, hasIlju } = useUser()
  const meKey = hasIlju && ilju ? ilju.id : ""

  const allKeys    = Object.keys(ILJU_SVG_ICONS)
  const ownedKeys  = allKeys.filter(k =>  canAccess(k, itemAccess(k, CHARACTER_ACCESS), "character", inv))
  const lockedKeys = allKeys.filter(k => !canAccess(k, itemAccess(k, CHARACTER_ACCESS), "character", inv))

  return (
    <div className="flex flex-col gap-3">
      <MiniHeader title="캐릭터 보관함" subtitle={`${ownedKeys.length}개 보유`} onBack={onBack} />

      {ownedKeys.length > 0 && (
        <>
          <p className="text-[11px] font-bold tracking-wider" style={{ color: "#B8A898" }}>보유 중</p>
          {ownedKeys.map(key => (
            <div
              key={key}
              className="rounded-2xl p-4 flex items-center gap-4"
              style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1.5px solid #F5E8CC" }}
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center shrink-0" style={{ background: "#F1F5F9" }}>
                {ILJU_SVG_ICONS[key]?.()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[16px] font-bold text-charcoal">{key.replace(/-[mf]$/, "")}</span>
                  {key === meKey && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#FEF3C7", color: "#92400E" }}>내 일주</span>
                  )}
                </div>
                <p className="text-[11px] text-text-muted">{key.endsWith("-m") ? "남성" : "여성"}</p>
              </div>
              <span className="text-[12px] font-bold shrink-0" style={{ color: "#10B981" }}>✓ 보유</span>
            </div>
          ))}
        </>
      )}

      {lockedKeys.length > 0 && (
        <>
          <p className="text-[11px] font-bold tracking-wider mt-1" style={{ color: "#B8A898" }}>미보유</p>
          {lockedKeys.slice(0, 6).map(key => (
            <div
              key={key}
              className="rounded-2xl p-4 flex items-center gap-4"
              style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden" style={{ background: "#F5F1EB" }}>
                <div style={{ filter: "grayscale(0.7) opacity(0.5)" }}>{ILJU_SVG_ICONS[key]?.()}</div>
              </div>
              <div className="flex-1">
                <span className="text-[15px] font-bold" style={{ color: "#C8B8A8" }}>{key.replace(/-[mf]$/, "")}</span>
                <p className="text-[11px] mt-0.5" style={{ color: "#C8B8A8" }}>{key.endsWith("-m") ? "남성" : "여성"}</p>
              </div>
              <span className="text-[12px] font-bold shrink-0" style={{ color: "#C8B8A8" }}>{ITEM_PRICES.character}명태</span>
            </div>
          ))}
          {lockedKeys.length > 6 && (
            <p className="text-center text-[12px] py-2" style={{ color: "#C8B8A8" }}>외 {lockedKeys.length - 6}개</p>
          )}
        </>
      )}

      <button
        className="w-full py-3.5 rounded-2xl text-[14px] font-bold text-charcoal active:opacity-80 transition-opacity mt-1"
        style={{ background: "#FFF9F0", border: "2px solid #2D2D2D", boxShadow: "2px 2px 0px #2D2D2D" }}
        onClick={() => router.push("/v3/my")}
      >
        일주 카드 보러가기 →
      </button>
    </div>
  )
}

export default function InventoryPage() {
  const params = useParams()
  const router = useRouter()
  const type = params.type as string
  const onBack = () => router.back()

  return (
    <div className="px-4 pb-24">
      {type === "props"      && <PropsView      onBack={onBack} />}
      {type === "skins"      && <SkinsView      onBack={onBack} />}
      {type === "characters" && <CharactersView onBack={onBack} />}
    </div>
  )
}
