"use client"
import { useState, useRef, useCallback, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { RoomCanvas, STICKER_MAP, STORAGE_KEY, RoomChar, SKINS } from "../_components/MiniRoom"
import type { PlacedSticker, PlacedChar, RoomData, RoomSkin } from "../_components/MiniRoom"
import { useInventory } from "@/hooks/useInventory"
import { canAccess, itemAccess, STICKER_ACCESS, CHARACTER_ACCESS } from "@/lib/inventory"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import { calcRoomElements, ELEMENT_COLORS, ELEMENT_LABEL } from "@/lib/room-element"
import RoomElementBar from "../../interior/_components/RoomElementBar"

const STICKER_LABELS: Record<string, string> = {
  Chair: "의자", Sofa: "소파", Lamp: "램프", Mirror: "거울", Clock: "시계",
  Candle: "캔들", Pillow: "쿠션", Basket: "바구니", Plant: "화분", Cactus: "선인장",
  Tulip: "튤립", Rose: "장미", Sunflower: "해바라기", Vase: "꽃병",
  CrystalBall: "수정구", MagicWand: "마법봉", Tarot: "타로", Crystal: "크리스탈",
  Star: "별", Heart: "하트", Moon: "달", Sparkle: "반짝", Crown: "왕관",
  Balloon: "풍선", Rainbow: "무지개", Vinyl: "레코드", Cassette: "카세트",
  Headphones: "헤드폰", BubbleTea: "버블티", Coffee: "커피", Matcha: "말차",
}

const ALL_STICKER_KEYS = ["Chair", "Sofa", "Lamp", "Mirror", "Clock", "Candle", "Pillow", "Basket", "Plant", "Cactus", "Tulip", "Rose", "Sunflower", "Vase", "CrystalBall", "MagicWand", "Tarot", "Crystal", "Star", "Heart", "Moon", "Sparkle", "Crown", "Balloon", "Rainbow", "Vinyl", "Cassette", "Headphones", "BubbleTea", "Coffee", "Matcha"]

const STICKER_CATS = [
  { label: "방꾸",   keys: ["Chair", "Sofa", "Lamp", "Mirror", "Clock", "Candle", "Pillow", "Basket"] },
  { label: "꽃·식물", keys: ["Plant", "Cactus", "Tulip", "Rose", "Sunflower", "Vase"] },
  { label: "사주",   keys: ["CrystalBall", "MagicWand", "Tarot", "Crystal"] },
  { label: "키치",   keys: ["Star", "Heart", "Moon", "Sparkle", "Crown", "Balloon", "Rainbow"] },
  { label: "추억",   keys: ["Vinyl", "Cassette", "Headphones"] },
  { label: "음료",   keys: ["BubbleTea", "Coffee", "Matcha"] },
]
const MAIN_TABS = ["소품", "캐릭터", "스킨"] as const
type MainTab = typeof MAIN_TABS[number]

const DEFAULT: RoomData = {
  stickers: [{ id: "d-sofa", name: "Sofa", x: 76, y: 62, rotate: 0, scale: 1 }],
  charPos: { x: 68, y: 62, rotate: 0, scale: 1 },
}

const BASE_PX = 36   // sticker base size px (w-9)
const CHAR_PX = 68   // character base width px

type DragState =
  | { op: "move"; startPtr: { x: number; y: number }; startPos: { x: number; y: number } }
  | { op: "scale"; center: { x: number; y: number }; startDist: number; startScale: number }
  | { op: "rotate"; center: { x: number; y: number }; startAngle: number; startRotate: number }

// ── Transform handle overlay ──────────────────────────────────────────────────
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
      width: 0, height: 0,
      zIndex: 30,
      pointerEvents: "none",
    }}>
      {/* 점선 테두리 */}
      <div style={{
        position: "absolute",
        left: -half, top: -half,
        width: half * 2, height: half * 2,
        border: "1.5px dashed #3B82F6",
        borderRadius: 4,
      }} />

      {/* 4 모서리 핸들 (크기 조절) */}
      {([[-1, -1], [1, -1], [1, 1], [-1, 1]] as [number, number][]).map(([sx, sy], i) => (
        <div key={i} style={{
          position: "absolute",
          left: half * sx - H / 2,
          top: half * sy - H / 2,
          width: H, height: H,
          background: "white",
          border: "1.5px solid #3B82F6",
          borderRadius: 3,
          pointerEvents: "auto",
          touchAction: "none",
          cursor: "nwse-resize",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        }}
        onPointerDown={onScaleDown} />
      ))}

      {/* 회전 핸들 연결선 */}
      <div style={{
        position: "absolute",
        left: -0.5, top: -half - 22,
        width: 1, height: 22,
        background: "#3B82F6",
        opacity: 0.45,
      }} />

      {/* 회전 핸들 (원형, 상단) */}
      <div style={{
        position: "absolute",
        left: -11, top: -half - 38,
        width: 22, height: 22,
        background: "white",
        border: "1.5px solid #3B82F6",
        borderRadius: "50%",
        pointerEvents: "auto",
        touchAction: "none",
        cursor: "grab",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        color: "#3B82F6",
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        userSelect: "none",
      }}
      onPointerDown={onRotateDown}>
        ↻
      </div>

      {/* 삭제 버튼 */}
      {canDelete && (
        <div style={{
          position: "absolute",
          left: half - H,
          top: -half - H,
          width: 22, height: 22,
          background: "#EF4444",
          border: "2px solid white",
          borderRadius: "50%",
          pointerEvents: "auto",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 14,
          fontWeight: "bold",
          lineHeight: "1",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
        onPointerDown={e => { e.stopPropagation(); onDelete() }}>
          ×
        </div>
      )}
    </div>
  )
}

// ── Main edit page ────────────────────────────────────────────────────────────
export default function RoomEditPage() {
  const router = useRouter()
  const roomRef = useRef<HTMLDivElement>(null)
  const inv = useInventory()

  const [stickers, setStickers] = useState<PlacedSticker[]>([])
  const [chars, setChars] = useState<PlacedChar[]>([])
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("소품")
  const [activeStickerCat, setActiveStickerCat] = useState(0)
  const [activeSkin, setActiveSkin] = useState<RoomSkin>(SKINS[0])

  const dragRef = useRef<DragState | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const d: RoomData = JSON.parse(saved)
        setStickers((d.stickers ?? []).map(s => ({ ...s, scale: s.scale ?? 1 })))
        if (d.chars && d.chars.length > 0) {
          setChars(d.chars.map(c => ({ ...c, scale: c.scale ?? 1 })))
        } else {
          // 구버전 호환: charPos → chars 변환
          const cp = d.charPos ?? DEFAULT.charPos
          setChars([{ id: "char-legacy", key: "경진-m", x: cp.x, y: cp.y, rotate: cp.rotate ?? 0, scale: cp.scale ?? 1 }])
        }
        if (d.skinId) {
          const found = SKINS.find(sk => sk.id === d.skinId)
          if (found) setActiveSkin(found)
        }
      }
    } catch {}
  }, [])

  // 선택된 아이템 데이터 반환
  const getItem = useCallback((id: string) => {
    const s = stickers.find(s => s.id === id)
    if (s) return { x: s.x, y: s.y, scale: s.scale, rotate: s.rotate }
    const c = chars.find(c => c.id === id)
    if (c) return { x: c.x, y: c.y, scale: c.scale, rotate: c.rotate }
    return null
  }, [stickers, chars])

  // 선택된 아이템 업데이트
  const updateItem = useCallback((id: string, u: Partial<{ x: number; y: number; scale: number; rotate: number }>) => {
    setStickers(prev => prev.map(s => s.id === id ? { ...s, ...u } : s))
    setChars(prev => prev.map(c => c.id === id ? { ...c, ...u } : c))
  }, [])

  // 스티커/캐릭터 탭 → 선택 + 이동 드래그 시작
  const handleItemDown = useCallback((e: React.PointerEvent, id: string) => {
    e.stopPropagation()
    if (!roomRef.current) return
    roomRef.current.setPointerCapture(e.pointerId)

    setSelected(id)
    setSelectedKey(null)

    const item = stickers.find(s => s.id === id) ?? chars.find(c => c.id === id) ?? { x: 0, y: 0 }

    dragRef.current = {
      op: "move",
      startPtr: { x: e.clientX, y: e.clientY },
      startPos: { x: item.x, y: item.y },
    }
  }, [chars, stickers])

  // 모서리 핸들 → 크기 드래그 시작
  const handleScaleDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation()
    if (!roomRef.current || !selected) return
    roomRef.current.setPointerCapture(e.pointerId)

    const item = getItem(selected)
    if (!item) return

    const rect = roomRef.current.getBoundingClientRect()
    const cx = rect.left + (item.x / 100) * rect.width
    const cy = rect.top + (item.y / 100) * rect.height
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy) || 1

    dragRef.current = { op: "scale", center: { x: cx, y: cy }, startDist: dist, startScale: item.scale }
  }, [selected, getItem])

  // 회전 핸들 → 회전 드래그 시작
  const handleRotateDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation()
    if (!roomRef.current || !selected) return
    roomRef.current.setPointerCapture(e.pointerId)

    const item = getItem(selected)
    if (!item) return

    const rect = roomRef.current.getBoundingClientRect()
    const cx = rect.left + (item.x / 100) * rect.width
    const cy = rect.top + (item.y / 100) * rect.height

    dragRef.current = {
      op: "rotate",
      center: { x: cx, y: cy },
      startAngle: Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI),
      startRotate: item.rotate,
    }
  }, [selected, getItem])

  // 포인터 이동 → 드래그 처리
  const handleMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d || !selected || !roomRef.current) return
    const rect = roomRef.current.getBoundingClientRect()

    if (d.op === "move") {
      const newX = Math.max(2, Math.min(98, d.startPos.x + ((e.clientX - d.startPtr.x) / rect.width) * 100))
      const newY = Math.max(2, Math.min(95, d.startPos.y + ((e.clientY - d.startPtr.y) / rect.height) * 100))
      updateItem(selected, { x: newX, y: newY })
    } else if (d.op === "scale") {
      const dist = Math.hypot(e.clientX - d.center.x, e.clientY - d.center.y)
      updateItem(selected, { scale: Math.max(0.3, Math.min(3.5, d.startScale * (dist / d.startDist))) })
    } else if (d.op === "rotate") {
      const angle = Math.atan2(e.clientY - d.center.y, e.clientX - d.center.x) * (180 / Math.PI)
      updateItem(selected, { rotate: d.startRotate + (angle - d.startAngle) })
    }
  }, [selected, updateItem])

  const handleUp = useCallback(() => { dragRef.current = null }, [])

  // 빈 공간 탭 → 선택 해제
  const handleRoomDown = useCallback(() => {
    setSelected(null)
    setSelectedKey(null)
  }, [])

  const deleteSelected = useCallback(() => {
    if (selected) {
      setStickers(prev => prev.filter(s => s.id !== selected))
      setChars(prev => prev.filter(c => c.id !== selected))
    }
    setSelected(null)
  }, [selected])

  const save = useCallback(() => {
    // charPos는 하위 호환용으로 첫 번째 캐릭터 위치 저장
    const firstChar = chars[0]
    const charPos = firstChar ? { x: firstChar.x, y: firstChar.y, rotate: firstChar.rotate, scale: firstChar.scale } : DEFAULT.charPos
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ stickers, chars, charPos, skinId: activeSkin.id }))
    router.back()
  }, [stickers, chars, activeSkin, router])

  const selData = selected ? getItem(selected) : null
  const selBasePx = chars.some(c => c.id === selected) ? CHAR_PX : BASE_PX

  // 실시간 방 오행 미터 (편집 중 즉시 갱신)
  const roomElements = useMemo(
    () => calcRoomElements({ stickers, chars, skinId: activeSkin.id }),
    [stickers, chars, activeSkin],
  )

  const hintText = selected
    ? "드래그 이동 · 모서리 크기 · ↻ 회전"
    : "아이템을 탭하면 바로 배치돼요"

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#FFFBF2" }}>
      <div className="w-full max-w-[480px] mx-auto flex flex-col h-full" style={{ background: "#FFFBF2" }}>

      {/* 헤더 */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-black/8" style={{ background: "#FFFBF2" }}>
        <button className="text-sm text-text-muted" onClick={() => router.back()}>← 나가기</button>
        <p className="text-sm font-bold text-charcoal">방 꾸미기</p>
        <button
          className="text-sm font-bold text-charcoal bg-yellow-300 px-3.5 py-1 rounded-full border border-charcoal"
          onClick={save}
        >완료</button>
      </div>

      {/* 방 캔버스 */}
      <div className="px-4 pt-4 pb-2 shrink-0">
      <div
        ref={roomRef}
        className="relative w-full rounded-2xl overflow-hidden border border-charcoal/10"
        style={{ height: 220, touchAction: "none", userSelect: "none" }}
        onPointerDown={handleRoomDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
      >
        <RoomCanvas stickers={[]} charPos={{ x: 50, y: 62 }} hideChar skin={activeSkin} />

        {/* 스티커 레이어 */}
        {stickers.map(s => {
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
        {chars.map(c => (
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
        {selData && selected && (
          <TransformHandles
            x={selData.x} y={selData.y}
            scale={selData.scale} basePx={selBasePx}
            canDelete
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

      </div>
      </div>{/* px-4 wrapper */}

      {/* 실시간 방 오행 미터 */}
      <div className="shrink-0 px-4 pb-2">
        <div className="rounded-xl px-3 py-2" style={{ background: "#FFF7E8", border: "1px solid #F0E2C4" }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-charcoal/70">방의 기운</span>
            {roomElements.total > 0 && roomElements.dominant ? (
              <span className="flex items-center gap-1 text-[10px] font-bold" style={{ color: "#A0896C" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: ELEMENT_COLORS[roomElements.dominant] }} />
                {ELEMENT_LABEL[roomElements.dominant]} 기운
              </span>
            ) : (
              <span className="text-[10px] text-charcoal/35">아이템을 배치해보세요</span>
            )}
          </div>
          {roomElements.total > 0 ? (
            <RoomElementBar percent={roomElements.percent} compact />
          ) : (
            <div className="h-2.5 rounded-full" style={{ background: "#EDE4D4" }} />
          )}
        </div>
      </div>

      {/* 스티커 트레이 */}
      <div className="flex-1 flex flex-col overflow-hidden border-t border-black/8" style={{ background: "#FFFBF2" }}>

        {/* 메인 탭 3개 — 고정 */}
        <div className="shrink-0 flex gap-1.5 px-3 pt-2.5 pb-2">
          {MAIN_TABS.map(tab => (
            <button key={tab}
              className={`flex-1 text-[12px] py-1.5 rounded-full border font-bold transition-colors ${
                activeMainTab === tab ? "bg-charcoal text-white border-charcoal" : "bg-white text-text-muted border-charcoal/15"
              }`}
              onPointerDown={e => { e.stopPropagation(); setActiveMainTab(tab) }}
            >{tab}</button>
          ))}
        </div>

        {/* 소품 탭 */}
        {activeMainTab === "소품" && (
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex gap-1 px-3 pb-1.5 overflow-x-auto shrink-0" style={{ scrollbarWidth: "none" }}>
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
            <div className="flex flex-wrap gap-2 px-3 pb-4 pt-0.5">
              {(activeStickerCat === -1 ? ALL_STICKER_KEYS : STICKER_CATS[activeStickerCat].keys)
                .filter(key => canAccess(key, itemAccess(key, STICKER_ACCESS), "sticker", inv))
                .map(key => {
                  const Comp = STICKER_MAP[key]
                  const active = selectedKey === key
                  return (
                    <button key={key}
                      className={`flex flex-col items-center gap-0.5 p-2 rounded-xl border transition-colors ${
                        active ? "bg-yellow-100 border-yellow-400" : "bg-white border-charcoal/10"
                      }`}
                      onPointerDown={e => {
                        e.stopPropagation()
                        const newId = `${Date.now()}-${Math.random()}`
                        const x = 25 + Math.random() * 50
                        const y = 42 + Math.random() * 28
                        setStickers(prev => [...prev, { id: newId, name: key, x, y, rotate: Math.floor(Math.random() * 20) - 10, scale: 1 }])
                        setSelected(newId)
                        setSelectedKey(null)
                      }}
                    >
                      <Comp className="w-8 h-8" />
                      <span className="text-[9px] text-text-muted">{STICKER_LABELS[key]}</span>
                    </button>
                  )
                })}
            </div>
          </div>
        )}

        {/* 캐릭터 탭 — 일주는 1개지만 방엔 소유한 캐릭터를 N개 배치 가능 */}
        {activeMainTab === "캐릭터" && (
          <div className="flex-1 overflow-y-auto px-3 pb-4 pt-1">
            <div className="flex flex-wrap gap-2">
              {Object.keys(ILJU_SVG_ICONS)
                .filter(key => canAccess(key, itemAccess(key, CHARACTER_ACCESS), "character", inv))
                .map(key => (
                  <button key={key}
                    className="flex flex-col items-center gap-1 shrink-0 p-2 rounded-xl border transition-colors bg-white border-charcoal/10"
                    onPointerDown={e => {
                      e.stopPropagation()
                      const newId = `char-${Date.now()}-${Math.random()}`
                      const x = 25 + Math.random() * 50
                      const y = 42 + Math.random() * 28
                      setChars(prev => [...prev, { id: newId, key, x, y, rotate: Math.floor(Math.random() * 10) - 5, scale: 1 }])
                      setSelected(newId)
                      setSelectedKey(null)
                    }}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden">{ILJU_SVG_ICONS[key]?.()}</div>
                    <span className="text-[9px] text-text-muted">{key === inv.iljuKey ? "내 캐릭터" : key}</span>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* 스킨 탭 */}
        {activeMainTab === "스킨" && (
          <div className="flex gap-2 px-3 pb-4 pt-0.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {SKINS.filter(s => canAccess(s.id, s.access, "skin", inv)).map(skin => {
              const isActive = activeSkin.id === skin.id
              return (
                <button
                  key={skin.id}
                  className={`flex flex-col items-center gap-1 shrink-0 p-2 rounded-xl border transition-colors ${
                    isActive ? "border-charcoal bg-charcoal/5" : "border-charcoal/10 bg-white"
                  }`}
                  onPointerDown={e => { e.stopPropagation(); setActiveSkin(skin) }}
                >
                  <div className="w-10 h-10 rounded-xl border border-charcoal/15 relative overflow-hidden"
                    style={{ background: skin.floor, pointerEvents: "none" }}>
                    <div className="absolute inset-0" style={{ background: skin.wallL, clipPath: "polygon(0 0, 50% 0, 50% 38%, 0 70%)", pointerEvents: "none" }} />
                    <div className="absolute inset-0" style={{ background: skin.wallR, clipPath: "polygon(50% 0, 100% 0, 100% 70%, 50% 38%)", pointerEvents: "none" }} />
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: "none" }}>
                        <span className="text-[14px]">✓</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-text-muted whitespace-nowrap" style={{ pointerEvents: "none" }}>{skin.name}</span>
                </button>
              )
            })}
          </div>
        )}

      </div>

      </div>{/* max-w-sm wrapper */}
    </div>
  )
}
