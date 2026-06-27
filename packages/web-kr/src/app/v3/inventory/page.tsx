"use client"
import { useState, useRef, useCallback, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { RoomCanvas, STICKER_MAP, SKINS, RoomChar, STORAGE_KEY } from "../my/_components/MiniRoom"
import type { PlacedSticker, PlacedChar, RoomSkin, RoomData } from "../my/_components/MiniRoom"
import { useInventory } from "@/hooks/useInventory"
import { canAccess, itemAccess, STICKER_ACCESS, CHARACTER_ACCESS } from "@/lib/inventory"
import { useWishlist } from "@/hooks/useWishlist"
import { ITEM_PRICES, wonLabel } from "@/lib/prices"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import type { WishlistItem, WishlistItemType } from "@/lib/wishlist"

const STICKER_LABELS: Record<string, string> = {
  Chair: "의자", Sofa: "소파", Lamp: "램프", Mirror: "거울", Clock: "시계",
  Candle: "캔들", Pillow: "쿠션", Basket: "바구니", Plant: "화분", Cactus: "선인장",
  Tulip: "튤립", Rose: "장미", Sunflower: "해바라기", Vase: "꽃병",
  CrystalBall: "수정구", MagicWand: "마법봉", Tarot: "타로", Crystal: "크리스탈",
  Star: "별", Heart: "하트", Moon: "달", Sparkle: "반짝", Crown: "왕관",
  Balloon: "풍선", Rainbow: "무지개", Vinyl: "레코드", Cassette: "카세트",
  Headphones: "헤드폰", BubbleTea: "버블티", Coffee: "커피", Matcha: "말차",
}
const ALL_STICKER_KEYS = [
  "Chair","Sofa","Lamp","Mirror","Clock","Candle","Pillow","Basket",
  "Plant","Cactus","Tulip","Rose","Sunflower","Vase",
  "CrystalBall","MagicWand","Tarot","Crystal",
  "Star","Heart","Moon","Sparkle","Crown","Balloon","Rainbow",
  "Vinyl","Cassette","Headphones","BubbleTea","Coffee","Matcha",
]
const STICKER_CATS = [
  { label: "방꾸",    keys: ["Chair","Sofa","Lamp","Mirror","Clock","Candle","Pillow","Basket"] },
  { label: "꽃·식물", keys: ["Plant","Cactus","Tulip","Rose","Sunflower","Vase"] },
  { label: "사주",    keys: ["CrystalBall","MagicWand","Tarot","Crystal"] },
  { label: "키치",    keys: ["Star","Heart","Moon","Sparkle","Crown","Balloon","Rainbow"] },
  { label: "추억",    keys: ["Vinyl","Cassette","Headphones"] },
  { label: "음료",    keys: ["BubbleTea","Coffee","Matcha"] },
]
const MAIN_TABS = ["소품", "캐릭터", "스킨"] as const
type MainTab = typeof MAIN_TABS[number]

const DEMO_STICKERS: PlacedSticker[] = [
  { id: "d1", name: "Sofa",  x: 74, y: 65, rotate: -3, scale: 1.05 },
  { id: "d2", name: "Clock", x: 22, y: 40, rotate:  0, scale: 0.9  },
]
const DEMO_CHAR = { x: 50, y: 62, rotate: 0, scale: 1 }

const BASE_PX = 36
const CHAR_PX = 68

type DragState =
  | { op: "move"; startPtr: { x: number; y: number }; startPos: { x: number; y: number } }
  | { op: "scale"; center: { x: number; y: number }; startDist: number; startScale: number }
  | { op: "rotate"; center: { x: number; y: number }; startAngle: number; startRotate: number }

function TransformHandles({
  x, y, scale, basePx, canDelete,
  onScaleDown, onRotateDown, onDelete,
}: {
  x: number; y: number; scale: number; basePx: number; canDelete: boolean
  onScaleDown: (e: React.PointerEvent) => void
  onRotateDown: (e: React.PointerEvent) => void
  onDelete: () => void
}) {
  const half = (basePx * scale) / 2 + 8
  const H = 11
  return (
    <div style={{
      position: "absolute",
      left: `${x}%`, top: `${y}%`,
      transform: "translate(-50%, -50%)",
      width: 0, height: 0, zIndex: 30, pointerEvents: "none",
    }}>
      <div style={{
        position: "absolute", left: -half, top: -half,
        width: half * 2, height: half * 2,
        border: "1.5px dashed #3B82F6", borderRadius: 4,
      }} />
      {([[-1,-1],[1,-1],[1,1],[-1,1]] as [number,number][]).map(([sx,sy],i) => (
        <div key={i} style={{
          position: "absolute",
          left: half * sx - H / 2, top: half * sy - H / 2,
          width: H, height: H, background: "white",
          border: "1.5px solid #3B82F6", borderRadius: 3,
          pointerEvents: "auto", touchAction: "none", cursor: "nwse-resize",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        }} onPointerDown={onScaleDown} />
      ))}
      <div style={{
        position: "absolute", left: -0.5, top: -half - 22,
        width: 1, height: 22, background: "#3B82F6", opacity: 0.45,
      }} />
      <div style={{
        position: "absolute", left: -11, top: -half - 38,
        width: 22, height: 22, background: "white",
        border: "1.5px solid #3B82F6", borderRadius: "50%",
        pointerEvents: "auto", touchAction: "none", cursor: "grab",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, color: "#3B82F6",
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)", userSelect: "none",
      }} onPointerDown={onRotateDown}>↻</div>
      {canDelete && (
        <div style={{
          position: "absolute", left: half - H, top: -half - H,
          width: 22, height: 22, background: "#EF4444",
          border: "2px solid white", borderRadius: "50%",
          pointerEvents: "auto", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: 14, fontWeight: "bold", lineHeight: "1",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} onPointerDown={e => { e.stopPropagation(); onDelete() }}>×</div>
      )}
    </div>
  )
}

function OwnedBadge() {
  return (
    <div
      className="absolute top-1 left-1 w-4 h-4 rounded-full flex items-center justify-center pointer-events-none z-10"
      style={{ background: "#4ADE80", border: "1.5px solid white" }}
    >
      <span className="text-white font-bold leading-none" style={{ fontSize: 9 }}>✓</span>
    </div>
  )
}

function InventoryPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab") as MainTab | null

  const [activeMainTab, setActiveMainTab] = useState<MainTab>(
    MAIN_TABS.includes(tabParam as MainTab) ? (tabParam as MainTab) : "소품"
  )
  const [activeStickerCat, setActiveStickerCat] = useState(-1)

  // Canvas state (ephemeral — preview only, not saved)
  const roomRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const [demoStickers, setDemoStickers] = useState<PlacedSticker[]>(DEMO_STICKERS)
  const [demoChars, setDemoChars] = useState<PlacedChar[]>([])
  const [demoSkin, setDemoSkin] = useState<RoomSkin>(SKINS[0])

  const [isRoomMode, setIsRoomMode] = useState(false)
  const [roomSnapshot, setRoomSnapshot] = useState<{ stickers: PlacedSticker[]; chars: PlacedChar[]; skin: RoomSkin } | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return
      const room: RoomData = JSON.parse(saved)
      setDemoStickers(room.stickers ?? DEMO_STICKERS)
      setDemoChars(room.chars ?? [])
      if (room.skinId) {
        const skin = SKINS.find(s => s.id === room.skinId)
        if (skin) setDemoSkin(skin)
      }
      setIsRoomMode(true)
    } catch {}
  }, [])

  // Selection
  const [selectedId, setSelectedId] = useState<string | null>(null)  // canvas item
  const [placingKey, setPlacingKey] = useState<string | null>(null)   // sticker in tray, pending placement

  const inv = useInventory()
  const wishlist = useWishlist()

  const stickerOwned = (k: string) => canAccess(k, itemAccess(k, STICKER_ACCESS), "sticker", inv)
  const skinOwned    = (id: string) => canAccess(id, SKINS.find(s => s.id === id)?.access ?? "free", "skin", inv)
  const charOwned    = (k: string) => canAccess(k, itemAccess(k, CHARACTER_ACCESS), "character", inv)

  const sortOwned = <T,>(items: T[], owned: (i: T) => boolean) =>
    [...items.filter(owned), ...items.filter(i => !owned(i))]

  // ── Transform helpers ────────────────────────────────────────────────────────
  const getItem = useCallback((id: string) => {
    const s = demoStickers.find(s => s.id === id)
    if (s) return { x: s.x, y: s.y, scale: s.scale, rotate: s.rotate }
    const c = demoChars.find(c => c.id === id)
    if (c) return { x: c.x, y: c.y, scale: c.scale, rotate: c.rotate }
    return null
  }, [demoStickers, demoChars])

  const updateItem = useCallback((id: string, u: Partial<{ x: number; y: number; scale: number; rotate: number }>) => {
    setDemoStickers(prev => prev.map(s => s.id === id ? { ...s, ...u } : s))
    setDemoChars(prev => prev.map(c => c.id === id ? { ...c, ...u } : c))
  }, [])

  // ── Pointer handlers ─────────────────────────────────────────────────────────
  const handleItemDown = useCallback((e: React.PointerEvent, id: string) => {
    e.stopPropagation()
    if (!roomRef.current) return
    roomRef.current.setPointerCapture(e.pointerId)
    setSelectedId(id)
    setPlacingKey(null)
    const item = demoStickers.find(s => s.id === id) ?? demoChars.find(c => c.id === id) ?? { x: 0, y: 0 }
    dragRef.current = { op: "move", startPtr: { x: e.clientX, y: e.clientY }, startPos: { x: item.x, y: item.y } }
  }, [demoStickers, demoChars])

  const handleScaleDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation()
    if (!roomRef.current || !selectedId) return
    roomRef.current.setPointerCapture(e.pointerId)
    const item = getItem(selectedId)
    if (!item) return
    const rect = roomRef.current.getBoundingClientRect()
    const cx = rect.left + (item.x / 100) * rect.width
    const cy = rect.top + (item.y / 100) * rect.height
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy) || 1
    dragRef.current = { op: "scale", center: { x: cx, y: cy }, startDist: dist, startScale: item.scale }
  }, [selectedId, getItem])

  const handleRotateDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation()
    if (!roomRef.current || !selectedId) return
    roomRef.current.setPointerCapture(e.pointerId)
    const item = getItem(selectedId)
    if (!item) return
    const rect = roomRef.current.getBoundingClientRect()
    const cx = rect.left + (item.x / 100) * rect.width
    const cy = rect.top + (item.y / 100) * rect.height
    dragRef.current = {
      op: "rotate", center: { x: cx, y: cy },
      startAngle: Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI),
      startRotate: item.rotate,
    }
  }, [selectedId, getItem])

  const handleMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d || !selectedId || !roomRef.current) return
    const rect = roomRef.current.getBoundingClientRect()
    if (d.op === "move") {
      const newX = Math.max(2, Math.min(98, d.startPos.x + ((e.clientX - d.startPtr.x) / rect.width) * 100))
      const newY = Math.max(2, Math.min(95, d.startPos.y + ((e.clientY - d.startPtr.y) / rect.height) * 100))
      updateItem(selectedId, { x: newX, y: newY })
    } else if (d.op === "scale") {
      const dist = Math.hypot(e.clientX - d.center.x, e.clientY - d.center.y)
      updateItem(selectedId, { scale: Math.max(0.3, Math.min(3.5, d.startScale * (dist / d.startDist))) })
    } else if (d.op === "rotate") {
      const angle = Math.atan2(e.clientY - d.center.y, e.clientX - d.center.x) * (180 / Math.PI)
      updateItem(selectedId, { rotate: d.startRotate + (angle - d.startAngle) })
    }
  }, [selectedId, updateItem])

  const handleUp = useCallback(() => { dragRef.current = null }, [])

  const handleRoomDown = useCallback(() => {
    setSelectedId(null)
  }, [])

  const deleteSelected = useCallback(() => {
    if (selectedId) {
      setDemoStickers(prev => prev.filter(s => s.id !== selectedId))
      setDemoChars(prev => prev.filter(c => c.id !== selectedId))
    }
    setSelectedId(null)
  }, [selectedId])

  // ── Tray tap handlers ────────────────────────────────────────────────────────
  const tapSticker = (key: string) => {
    const existing = demoStickers.find(s => s.name === key)
    if (existing) {
      setDemoStickers(prev => prev.filter(s => s.name !== key))
      if (selectedId === existing.id) setSelectedId(null)
      return
    }
    const newId = `${Date.now()}-${Math.random()}`
    const x = 25 + Math.random() * 50
    const y = 42 + Math.random() * 28
    setDemoStickers(prev => [...prev, { id: newId, name: key, x, y, rotate: Math.floor(Math.random() * 20) - 10, scale: 1 }])
    setSelectedId(newId)
    setPlacingKey(null)
  }

  const tapCharacter = (key: string) => {
    const existing = demoChars.find(c => c.key === key)
    if (existing) {
      setDemoChars(prev => prev.filter(c => c.key !== key))
      if (selectedId === existing.id) setSelectedId(null)
      return
    }
    const newId = `char-${Date.now()}-${Math.random()}`
    const x = 25 + Math.random() * 50
    const y = 42 + Math.random() * 28
    setDemoChars(prev => [...prev, { id: newId, key, x, y, rotate: Math.floor(Math.random() * 10) - 5, scale: 1 }])
    setSelectedId(newId)
    setPlacingKey(null)
  }

  const switchMode = () => {
    if (isRoomMode) {
      setRoomSnapshot({ stickers: demoStickers, chars: demoChars, skin: demoSkin })
      setDemoStickers(DEMO_STICKERS)
      setDemoChars([])
      setDemoSkin(SKINS[0])
    } else {
      if (roomSnapshot) {
        setDemoStickers(roomSnapshot.stickers)
        setDemoChars(roomSnapshot.chars)
        setDemoSkin(roomSnapshot.skin)
      }
    }
    setIsRoomMode(m => !m)
    setSelectedId(null)
    setPlacingKey(null)
  }

  const tapSkin = (skin: RoomSkin) => {
    setDemoSkin(skin)
    setSelectedId(null)
    setPlacingKey(null)
  }

  // 방에 놓인 미구매 아이템 = 장바구니
  const cartItems: WishlistItem[] = [
    ...demoStickers
      .filter(s => !stickerOwned(s.name))
      .map(s => ({ type: "sticker" as const, key: s.name, name: STICKER_LABELS[s.name] ?? s.name, price: ITEM_PRICES.sticker })),
    ...demoChars
      .filter(c => !charOwned(c.key))
      .map(c => ({ type: "character" as const, key: c.key, name: c.key, price: ITEM_PRICES.character })),
    ...(!skinOwned(demoSkin.id) ? [{ type: "skin" as const, key: demoSkin.id, name: demoSkin.name, price: ITEM_PRICES.skin }] : []),
  ]
  const totalMT = Math.round(cartItems.reduce((sum, i) => sum + i.price, 0) * 10) / 10

  // ── Derived ──────────────────────────────────────────────────────────────────
  const selData = selectedId ? getItem(selectedId) : null
  const selBasePx = demoChars.some(c => c.id === selectedId) ? CHAR_PX : BASE_PX

  const hintText = selectedId
    ? "드래그 이동 · 모서리 크기 · ↻ 회전"
    : "아이템을 탭하면 바로 배치돼요"

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#FFFBF2" }}>
      <div className="w-full max-w-[430px] mx-auto flex flex-col h-full" style={{ background: "#FFFBF2" }}>

        {/* 헤더 */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-black/8" style={{ background: "#FFFBF2" }}>
          <button className="text-sm text-text-muted" onClick={() => router.back()}>← 나가기</button>
          <p className="text-sm font-bold text-charcoal">액막이샵</p>
          <button
            className="relative text-sm text-charcoal px-2.5 py-1 rounded-full border border-charcoal/20 bg-white active:opacity-70"
            onClick={() => router.push("/v3/wishlist")}
          >
            🛒
            {wishlist.count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                {wishlist.count}
              </span>
            )}
          </button>
        </div>

        {/* 인터랙티브 캔버스 */}
        <div className="px-4 pt-4 pb-2 shrink-0">
          <div
            ref={roomRef}
            className="relative w-full rounded-2xl overflow-hidden border border-charcoal/10"
            style={{ height: 220, touchAction: "none", userSelect: "none" }}
            onPointerDown={handleRoomDown}
            onPointerMove={handleMove}
            onPointerUp={handleUp}
          >
            <RoomCanvas stickers={[]} charPos={{ x: 50, y: 62 }} hideChar skin={demoSkin} />

            {/* 스티커 레이어 */}
            {demoStickers.map(s => {
              const Comp = STICKER_MAP[s.name]
              if (!Comp) return null
              return (
                <div key={s.id} className="absolute" style={{
                  left: `${s.x}%`, top: `${s.y}%`,
                  transform: `translate(-50%, -50%) rotate(${s.rotate}deg) scale(${s.scale})`,
                  zIndex: 10, touchAction: "none", cursor: "pointer",
                }} onPointerDown={e => handleItemDown(e, s.id)}>
                  <Comp className="w-9 h-9" />
                </div>
              )
            })}

            {/* 캐릭터 레이어 */}
            {demoChars.map(c => (
              <div key={c.id} className="absolute" style={{
                left: `${c.x}%`, top: `${c.y}%`,
                transform: `translate(-50%, -50%) rotate(${c.rotate}deg) scale(${c.scale})`,
                zIndex: 25, touchAction: "none", cursor: "pointer",
              }} onPointerDown={e => handleItemDown(e, c.id)}>
                {ILJU_SVG_ICONS[c.key]
                  ? <div className="w-[68px] h-[68px] rounded-full overflow-hidden">{ILJU_SVG_ICONS[c.key]?.()}</div>
                  : <RoomChar />
                }
              </div>
            ))}

            {/* 변환 핸들 */}
            {selData && selectedId && (
              <TransformHandles
                x={selData.x} y={selData.y}
                scale={selData.scale} basePx={selBasePx}
                canDelete={selectedId !== "char"}
                onScaleDown={handleScaleDown}
                onRotateDown={handleRotateDown}
                onDelete={deleteSelected}
              />
            )}

            {/* 힌트 */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
              <div className="text-[10px] bg-black/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                {hintText}
              </div>
            </div>

            {/* 내 방 토글 */}
            <div
              className="absolute top-2 right-2 z-40 flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full pointer-events-auto"
              onPointerDown={e => { e.stopPropagation(); switchMode() }}
            >
              <span className="text-[10px] text-white/90">내 방</span>
              <div
                className="relative w-7 h-3.5 rounded-full transition-colors duration-200"
                style={{ background: isRoomMode ? "#E84B6A" : "rgba(255,255,255,0.3)" }}
              >
                <span
                  className="absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white shadow transition-transform duration-200"
                  style={{ left: 2, transform: isRoomMode ? "translateX(12px)" : "translateX(0)" }}
                />
              </div>
            </div>

            {/* 전체 삭제 */}
            {demoStickers.length > 0 && !selectedId && (
              <button
                className="absolute top-2 left-2 z-40 w-7 h-7 flex items-center justify-center bg-white/70 text-red-400 rounded-full border border-red-200 backdrop-blur-sm"
                onPointerDown={e => { e.stopPropagation(); setDemoStickers(DEMO_STICKERS) }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* 트레이 */}
        <div className="flex-1 flex flex-col overflow-hidden border-t border-black/8" style={{ background: "#FFFBF2" }}>

          {/* 메인 탭 */}
          <div className="shrink-0 flex gap-1.5 px-3 pt-2.5 pb-2">
            {MAIN_TABS.map(tab => (
              <button key={tab}
                className={`flex-1 text-[12px] py-1.5 rounded-full border font-bold transition-colors ${
                  activeMainTab === tab ? "bg-charcoal text-white border-charcoal" : "bg-white text-text-muted border-charcoal/15"
                }`}
                onPointerDown={e => { e.stopPropagation(); setActiveMainTab(tab); setPlacingKey(null); setSelectedId(null) }}
              >{tab}</button>
            ))}
          </div>

          {/* 소품 탭 */}
          {activeMainTab === "소품" && (
            <>
              <div className="shrink-0 flex gap-1 px-3 pb-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                <button
                  className={`text-[11px] px-2.5 py-1 rounded-full border shrink-0 font-medium transition-colors ${
                    activeStickerCat === -1 ? "bg-charcoal text-white border-charcoal" : "bg-white text-text-muted border-charcoal/15"
                  }`}
                  onPointerDown={e => { e.stopPropagation(); setActiveStickerCat(-1) }}
                >전체</button>
                {STICKER_CATS.map((cat, i) => (
                  <button key={cat.label}
                    className={`text-[11px] px-2.5 py-1 rounded-full border shrink-0 font-medium transition-colors ${
                      activeStickerCat === i ? "bg-charcoal text-white border-charcoal" : "bg-white text-text-muted border-charcoal/15"
                    }`}
                    onPointerDown={e => { e.stopPropagation(); setActiveStickerCat(i) }}
                  >{cat.label}</button>
                ))}
              </div>
              <div className={`flex-1 overflow-y-auto scrollbar-hide flex flex-wrap gap-2 content-start px-3 pt-0.5 ${cartItems.length > 0 ? "pb-[170px]" : "pb-4"}`}>
                {sortOwned(
                  activeStickerCat === -1 ? ALL_STICKER_KEYS : STICKER_CATS[activeStickerCat].keys,
                  stickerOwned
                ).map(key => {
                  const Comp = STICKER_MAP[key]
                  const owned = stickerOwned(key)
                  const active = demoStickers.some(s => s.name === key)
                  return (
                    <button key={key}
                      className={`relative flex flex-col items-center gap-0.5 p-2 rounded-xl border transition-colors ${
                        active ? "bg-yellow-100 border-yellow-400" : "bg-white border-charcoal/10"
                      }`}
                      onPointerDown={e => { e.stopPropagation(); tapSticker(key) }}
                    >
                      {owned && <OwnedBadge />}
                      <Comp className="w-8 h-8" />
                      <span className="text-[9px] text-text-muted">{STICKER_LABELS[key]}</span>
                      {!owned && <span className="text-[8px] font-bold text-amber-500">{ITEM_PRICES.sticker}명태</span>}
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {/* 캐릭터 탭 */}
          {activeMainTab === "캐릭터" && (
            <div className={`flex-1 overflow-y-auto scrollbar-hide flex flex-wrap gap-2 content-start px-3 pt-1 ${cartItems.length > 0 ? "pb-[170px]" : "pb-4"}`}>
              {sortOwned(Object.keys(ILJU_SVG_ICONS), charOwned).map(key => {
                const owned = charOwned(key)
                const active = demoChars.some(c => c.key === key)
                return (
                  <button key={key}
                    className={`relative flex flex-col items-center gap-0.5 p-2 rounded-xl border transition-colors ${
                      active ? "bg-yellow-100 border-yellow-400" : "bg-white border-charcoal/10"
                    }`}
                    onPointerDown={e => { e.stopPropagation(); tapCharacter(key) }}
                  >
                    {owned && <OwnedBadge />}
                    <div className="w-10 h-10 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                      {ILJU_SVG_ICONS[key]?.()}
                    </div>
                    <span className="text-[9px] text-text-muted">{key}</span>
                    {!owned && <span className="text-[8px] font-bold text-amber-500">{ITEM_PRICES.character}명태</span>}
                  </button>
                )
              })}
            </div>
          )}

          {/* 스킨 탭 */}
          {activeMainTab === "스킨" && (
            <div className={`flex-1 overflow-y-auto scrollbar-hide flex flex-wrap gap-2 content-start px-3 pt-1 ${cartItems.length > 0 ? "pb-[170px]" : "pb-4"}`}>
              {sortOwned(SKINS, s => skinOwned(s.id)).map(skin => {
                const owned = skinOwned(skin.id)
                const active = demoSkin.id === skin.id
                return (
                  <button key={skin.id}
                    className={`relative flex flex-col items-center gap-1 p-2 rounded-xl border transition-colors ${
                      active ? "bg-yellow-100 border-yellow-400" : "bg-white border-charcoal/10"
                    }`}
                    onPointerDown={e => { e.stopPropagation(); tapSkin(skin) }}
                  >
                    {owned && <OwnedBadge />}
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-charcoal/15 relative"
                      style={{ background: skin.floor }}>
                      <div className="absolute inset-0" style={{ background: skin.wallL, clipPath: "polygon(0 0,50% 0,50% 38%,0 70%)" }} />
                      <div className="absolute inset-0" style={{ background: skin.wallR, clipPath: "polygon(50% 0,100% 0,100% 70%,50% 38%)" }} />
                    </div>
                    <span className="text-[9px] text-text-muted">{skin.name}</span>
                    {!owned && <span className="text-[8px] font-bold text-amber-500">{ITEM_PRICES.skin}명태</span>}
                  </button>
                )
              })}
            </div>
          )}

        </div>
      </div>

      {/* CTA */}
      {cartItems.length > 0 && (
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pt-3 pb-[68px]"
          style={{ background: "#FFFBF2", borderTop: "1.5px dashed #D8C4A0" }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-[13px] font-bold text-charcoal">
              {cartItems.length === 1 ? cartItems[0].name : `${cartItems.length}개 선택됨`}
            </p>
            <p className="text-[11px] text-text-muted">{totalMT}명태 · {wonLabel(totalMT)}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 h-[44px] rounded-xl text-[14px] font-bold transition-colors border-2 bg-amber-50 text-amber-700 border-amber-300 active:opacity-70"
              style={{ fontFamily: "'BinggraeTaom', sans-serif" }}
              onClick={() => { cartItems.forEach(item => { if (!wishlist.has(item.key)) wishlist.toggle(item) }) }}
            >
              위시리스트 담기
            </button>
            <button
              className="flex-1 h-[44px] rounded-xl text-[14px] font-bold transition-colors border-2 text-white active:opacity-70"
              style={{ background: "#E84B6A", borderColor: "#E84B6A", fontFamily: "'BinggraeTaom', sans-serif" }}
              onClick={() => alert("결제 준비중 🌙")}
            >
              구매하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function InventoryPage() {
  return (
    <Suspense>
      <InventoryPageInner />
    </Suspense>
  )
}
