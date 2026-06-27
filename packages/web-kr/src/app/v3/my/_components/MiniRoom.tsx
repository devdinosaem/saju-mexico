"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import {
  DoodleChair, DoodleSofa, DoodleLamp, DoodleMirror, DoodleClock,
  DoodleCandle, DoodlePillow, DoodleBasket, DoodlePottedPlant, DoodleCactus,
  DoodleTulip, DoodleRose, DoodleSunflower, DoodleVase, DoodleCrystalBall,
  DoodleMagicWand, DoodleTarot, DoodleCrystal, DoodleStar, DoodleHeart,
  DoodleMoon, DoodleSparkle, DoodleCrown, DoodleBalloon, DoodleRainbow,
  DoodleVinylRecord, DoodleCassette, DoodleHeadphones, DoodleBubbleTea,
  DoodleCoffee, DoodleMatcha,
} from "@/components/doodles"

export const STICKER_MAP: Record<string, React.FC<{ className?: string }>> = {
  Chair: DoodleChair, Sofa: DoodleSofa, Lamp: DoodleLamp, Mirror: DoodleMirror,
  Clock: DoodleClock, Candle: DoodleCandle, Pillow: DoodlePillow, Basket: DoodleBasket,
  Plant: DoodlePottedPlant, Cactus: DoodleCactus, Tulip: DoodleTulip, Rose: DoodleRose,
  Sunflower: DoodleSunflower, Vase: DoodleVase, CrystalBall: DoodleCrystalBall,
  MagicWand: DoodleMagicWand, Tarot: DoodleTarot, Crystal: DoodleCrystal,
  Star: DoodleStar, Heart: DoodleHeart, Moon: DoodleMoon, Sparkle: DoodleSparkle,
  Crown: DoodleCrown, Balloon: DoodleBalloon, Rainbow: DoodleRainbow,
  Vinyl: DoodleVinylRecord, Cassette: DoodleCassette, Headphones: DoodleHeadphones,
  BubbleTea: DoodleBubbleTea, Coffee: DoodleCoffee, Matcha: DoodleMatcha,
}

export type PlacedSticker = { id: string; name: string; x: number; y: number; rotate: number; scale: number }
/** 방에 배치된 캐릭터 인스턴스. 한 방에 N개 배치 가능. key = 일주 캐릭터 키(소유한 것만). */
export type PlacedChar = { id: string; key: string; x: number; y: number; rotate: number; scale: number }
/**
 * 방 데이터.
 * ⚠️ 프로젝트 불변식: 일주(정체성)는 1개 / 캐릭터(chars)는 N개 배치 가능.
 *   - chars: 캐릭터 다중 배치(정식). 있으면 이걸로 N개 렌더.
 *   - charPos: 단일 캐릭터 레거시 호환 필드(첫 캐릭터 위치). chars 없을 때만 사용.
 */
export type RoomData = { stickers: PlacedSticker[]; charPos: { x: number; y: number; rotate?: number; scale?: number }; chars?: PlacedChar[]; skinId?: string }
export const STORAGE_KEY = "saju-miniroom-v1"

export type RoomSkin = {
  id: string
  name: string
  preview: string
  bg: string
  wallL: string
  wallR: string
  floor: string
  line: string
  access: import("@/lib/inventory").AccessType
}

export const SKINS: RoomSkin[] = [
  { id: "default",  name: "기본",      preview: "#FFF7E8", bg: "#FFFEF9", wallL: "#FDF8F0", wallR: "#FFFCF6", floor: "#FFF7E8", line: "#D8CCBA", access: "free" },
  { id: "pink",     name: "봄 벚꽃",   preview: "#FFE4EF", bg: "#FFF8FA", wallL: "#FFF0F5", wallR: "#FFF5F8", floor: "#FFE4EF", line: "#F0B8CC", access: "free" },
  { id: "blue",     name: "달빛 하늘", preview: "#D8EEFF", bg: "#F8FCFF", wallL: "#EFF6FF", wallR: "#F3F8FF", floor: "#D8EEFF", line: "#A8C8E8", access: "free" },
  { id: "lavender", name: "라벤더",    preview: "#E8D8FF", bg: "#FAF8FF", wallL: "#F3EEFF", wallR: "#F6F2FF", floor: "#E8D8FF", line: "#C0A8E0", access: "free" },
  { id: "mint",     name: "민트 숲",   preview: "#C8F0E0", bg: "#F8FFFC", wallL: "#EDFFF6", wallR: "#F2FFF9", floor: "#C8F0E0", line: "#90D4B8", access: "free" },
  { id: "lemon",    name: "레몬",      preview: "#F8ECA0", bg: "#FFFEF5", wallL: "#FFFCE8", wallR: "#FFFEF0", floor: "#F8ECA0", line: "#D4C070", access: "subscription" },
  { id: "ocean",    name: "여름 바다", preview: "#EDD4A0", bg: "#E2F3FB", wallL: "#AACFE8", wallR: "#B5D8EE", floor: "#EDD4A0", line: "#3A9EC8", access: "free" },
]

export const RoomChar = ({ size = 68 }: { size?: number }) => (
  <svg viewBox="0 0 80 90" fill="none" width={size} height={(size * 90) / 80}>
    <path d="M20 34 Q18 12 40 10 Q62 12 60 34" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="2" />
    <line x1="40" y1="10" x2="40" y2="34" stroke="#64748B" strokeWidth="2" opacity="0.5" />
    <rect x="16" y="32" width="48" height="7" rx="2" fill="#64748B" stroke="#2D2D2D" strokeWidth="1.5" />
    <circle cx="40" cy="46" r="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="2" />
    <line x1="28" y1="39" x2="38" y2="43" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
    <line x1="52" y1="39" x2="42" y2="43" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" />
    <circle cx="34" cy="44" r="2.5" fill="#2D2D2D" />
    <circle cx="46" cy="44" r="2.5" fill="#2D2D2D" />
    <circle cx="33" cy="43" r="0.8" fill="white" />
    <circle cx="45" cy="43" r="0.8" fill="white" />
    <line x1="35" y1="51" x2="45" y2="51" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
    <rect x="24" y="60" width="32" height="22" rx="4" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="2" />
    <line x1="40" y1="60" x2="40" y2="82" stroke="#64748B" strokeWidth="1.5" />
    <path d="M32 66 Q40 72 48 66" stroke="#64748B" strokeWidth="1.2" fill="none" />
    <path d="M16 60 Q14 66 18 70 L24 68 L24 60 Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
    <path d="M64 60 Q66 66 62 70 L56 68 L56 60 Z" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1.5" />
    <rect x="62" y="38" width="3" height="38" rx="1" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.2" />
    <rect x="57" y="52" width="13" height="3.5" rx="1" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="1" />
    <rect x="62.5" y="38" width="2" height="14" rx="0.5" fill="#FACC15" opacity="0.7" />
  </svg>
)

export function RoomCanvas({
  stickers,
  charPos,
  hideChar,
  skin,
  charIcon,
  chars,
}: {
  stickers: PlacedSticker[]
  charPos: { x: number; y: number; rotate?: number; scale?: number }
  hideChar?: boolean
  skin?: RoomSkin
  charIcon?: React.ReactNode
  chars?: PlacedChar[]
}) {
  const s = skin ?? SKINS[0]
  const P = { x: 50, y: 38 }
  const FL = { x: 0, y: 85 }
  const FR = { x: 100, y: 85 }

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: s.bg }}>

      {/* ── 왼쪽 벽 ── */}
      {s.id !== "ocean" && (
        <div className="absolute inset-0" style={{
          background: s.wallL,
          clipPath: `polygon(0 0, ${P.x}% 0, ${P.x}% ${P.y}%, ${FL.x}% ${FL.y}%)`,
        }} />
      )}

      {/* ── 오른쪽 벽 ── */}
      {s.id !== "ocean" && (
        <div className="absolute inset-0" style={{
          background: s.wallR,
          clipPath: `polygon(${P.x}% 0, 100% 0, 100% ${FR.y}%, ${P.x}% ${P.y}%)`,
        }} />
      )}

      {/* ── 바닥 ── */}
      {s.id !== "ocean" && (
        <div className="absolute inset-0" style={{
          background: s.floor,
          clipPath: `polygon(${P.x}% ${P.y}%, ${FL.x}% ${FL.y}%, 0 100%, 100% 100%, ${FR.x}% ${FR.y}%)`,
        }} />
      )}

      {/* ── 여름 바다 전용 씬 — 대각선 해변 ── */}
      {s.id === "ocean" && (
        <>
          {/* 바다 — bg(하늘) 아래 ~ 모래 대각선 위 */}
          <div className="absolute inset-0" style={{
            background: "#7ECDE8",
            opacity: 0.78,
            clipPath: "polygon(0% 34%, 100% 34%, 100% 52%, 0% 68%)",
          }} />
          {/* 모래사장 — 대각선 아래 */}
          <div className="absolute inset-0" style={{
            background: s.floor,
            clipPath: "polygon(0% 68%, 100% 52%, 100% 100%, 0% 100%)",
          }} />

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 3 }}>
            {/* 수평선 */}
            <line x1="0" y1="34" x2="100" y2="34" stroke="#7ECDE0" strokeWidth="0.4" opacity="0.6" />

            {/* 바다 잔물결 */}
            <path d="M0 38 Q14 36.5 28 38 Q42 39.5 56 38 Q70 36.5 84 38 Q92 37.2 100 38"   stroke="white" strokeWidth="0.5" fill="none" opacity="0.28" strokeLinecap="round" />
            <path d="M0 43 Q16 41.5 32 43 Q48 44.5 64 43 Q80 41.5 100 43"                  stroke="white" strokeWidth="0.4" fill="none" opacity="0.2"  strokeLinecap="round" />
            <path d="M0 50 Q20 48.5 38 50.5 Q54 52 68 49.5 Q82 47 100 50"                  stroke="white" strokeWidth="0.35" fill="none" opacity="0.16" strokeLinecap="round" />

            {/* 파도 거품 — 대각선 경계 (0,68)→(100,52) */}
            <path d="M0 67 Q9 64.5 17 66.5 Q25 68.5 33 65 Q41 61.5 50 64 Q58 66.5 67 63 Q75 59.5 83 62 Q91 64.5 100 61.5" fill="white" opacity="0.72" />
            <path d="M0 69 Q11 66.5 20 68.5 Q29 70.5 38 67 Q47 63.5 56 66 Q64 68.5 73 65 Q81 61.5 90 64 Q95 65.5 100 63.5" fill="white" opacity="0.42" />

            {/* 태양 — 오른쪽 하늘 (rx = r/1.81 보정) */}
            <ellipse cx="84" cy="17" rx="3.9" ry="7"  fill="#FFE44A" opacity="0.9" />
            <ellipse cx="84" cy="17" rx="5.5" ry="10" fill="#FFE44A" opacity="0.14" />
            <line x1="84"   y1="9"    x2="84"   y2="7"    stroke="#FFD000" strokeWidth="1.2" strokeLinecap="round" opacity="0.72" />
            <line x1="84"   y1="25"   x2="84"   y2="27"   stroke="#FFD000" strokeWidth="1.2" strokeLinecap="round" opacity="0.72" />
            <line x1="79"   y1="17"   x2="77"   y2="17"   stroke="#FFD000" strokeWidth="1.2" strokeLinecap="round" opacity="0.72" />
            <line x1="89"   y1="17"   x2="91"   y2="17"   stroke="#FFD000" strokeWidth="1.2" strokeLinecap="round" opacity="0.72" />
            <line x1="86.8" y1="12.1" x2="88.2" y2="9.6"  stroke="#FFD000" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />
            <line x1="81.2" y1="12.1" x2="79.8" y2="9.6"  stroke="#FFD000" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />
            <line x1="86.8" y1="22"   x2="88.2" y2="24.5" stroke="#FFD000" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />
            <line x1="81.2" y1="22"   x2="79.8" y2="24.5" stroke="#FFD000" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />

            {/* 큰 구름 — 왼쪽 */}
            <ellipse cx="20" cy="13"   rx="12"  ry="5.5" fill="white" opacity="0.97" />
            <ellipse cx="11" cy="16.5" rx="8"   ry="5.5" fill="white" opacity="0.97" />
            <ellipse cx="30" cy="16.5" rx="8"   ry="5.5" fill="white" opacity="0.97" />
            <ellipse cx="20" cy="17.5" rx="11"  ry="4.5" fill="white" opacity="0.97" />
            <ellipse cx="20" cy="20"   rx="12"  ry="2.8" fill="#C8DFEF" opacity="0.3" />

            {/* 작은 구름 — 중앙 */}
            <ellipse cx="54" cy="21"   rx="7.5" ry="3.8" fill="white" opacity="0.88" />
            <ellipse cx="47" cy="23.5" rx="5.5" ry="3.8" fill="white" opacity="0.88" />
            <ellipse cx="61" cy="23.5" rx="5.5" ry="3.8" fill="white" opacity="0.88" />
            <ellipse cx="54" cy="24.5" rx="7"   ry="3.2" fill="white" opacity="0.88" />

            {/* 갈매기 */}
            <path d="M6 27 Q9.5 24 13 26"  stroke="#8BBDD4" strokeWidth="0.85" fill="none" strokeLinecap="round" />
            <path d="M13 26 Q16.5 24 20 27" stroke="#8BBDD4" strokeWidth="0.85" fill="none" strokeLinecap="round" />
            <path d="M38 19 Q41 17 44 18.5" stroke="#8BBDD4" strokeWidth="0.75" fill="none" strokeLinecap="round" />
            <path d="M44 18.5 Q47 17 50 19" stroke="#8BBDD4" strokeWidth="0.75" fill="none" strokeLinecap="round" />

            {/* 모래 발자국 — 대각선 따라 이어지는 느낌 */}
            <ellipse cx="18"   cy="84"   rx="2"   ry="1.3" fill="#CCA870" opacity="0.5"  transform="rotate(-25 18 84)" />
            <ellipse cx="22.5" cy="86.5" rx="2"   ry="1.3" fill="#CCA870" opacity="0.5"  transform="rotate(-25 22.5 86.5)" />
            <ellipse cx="28"   cy="80.5" rx="2"   ry="1.3" fill="#CCA870" opacity="0.45" transform="rotate(-22 28 80.5)" />
            <ellipse cx="32.5" cy="83"   rx="2"   ry="1.3" fill="#CCA870" opacity="0.45" transform="rotate(-22 32.5 83)" />
            <ellipse cx="38"   cy="77"   rx="1.8" ry="1.1" fill="#CCA870" opacity="0.38" transform="rotate(-22 38 77)" />
            <ellipse cx="42"   cy="79"   rx="1.8" ry="1.1" fill="#CCA870" opacity="0.38" transform="rotate(-22 42 79)" />

            {/* 조개 */}
            <path d="M11 93 Q17 88 23 93" fill="#F4C870" opacity="0.8" />
            <path d="M11 93 Q17 97 23 93" fill="#EDB85A" opacity="0.55" />
            <path d="M13 93 Q17 90 21 93" stroke="#E8A830" strokeWidth="0.35" fill="none" opacity="0.5" />
            <path d="M14.5 93 Q17 91 19.5 93" stroke="#E8A830" strokeWidth="0.3"  fill="none" opacity="0.45" />

            {/* 모래 파문 — 젖은 모래 느낌 */}
            <ellipse cx="55" cy="88" rx="7"  ry="2"  fill="none" stroke="#CCA870" strokeWidth="0.4" opacity="0.3" />
            <ellipse cx="55" cy="88" rx="10" ry="3"  fill="none" stroke="#CCA870" strokeWidth="0.3" opacity="0.2" />
            <ellipse cx="72" cy="80" rx="5"  ry="1.5" fill="none" stroke="#CCA870" strokeWidth="0.35" opacity="0.28" />
          </svg>
        </>
      )}

      {/* ── 골격선 3개 (ocean 스킨에서는 숨김) ── */}
      {s.id !== "ocean" && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 5 }}>
          <line x1={P.x} y1={P.y} x2={P.x} y2="0"      stroke={s.line} strokeWidth="0.5" opacity="0.5" />
          <line x1={P.x} y1={P.y} x2={FL.x} y2={FL.y}  stroke={s.line} strokeWidth="0.5" opacity="0.5" />
          <line x1={P.x} y1={P.y} x2={FR.x} y2={FR.y}  stroke={s.line} strokeWidth="0.5" opacity="0.5" />
        </svg>
      )}

      {/* ── 스티커 ── */}
      {stickers.map(s => {
        const Comp = STICKER_MAP[s.name]
        if (!Comp) return null
        return (
          <div key={s.id} className="absolute pointer-events-none" style={{
            left: `${s.x}%`, top: `${s.y}%`,
            transform: `translate(-50%, -50%) rotate(${s.rotate}deg) scale(${s.scale ?? 1})`,
            zIndex: 10,
          }}>
            <Comp className="w-9 h-9" />
          </div>
        )
      })}

      {/* ── 캐릭터 (다중) ── */}
      {!hideChar && chars && chars.map(c => (
        <div key={c.id} className="absolute pointer-events-none" style={{
          left: `${c.x}%`, top: `${c.y}%`,
          transform: `translate(-50%, -50%) rotate(${c.rotate}deg) scale(${c.scale})`,
          zIndex: 25,
        }}>
          {ILJU_SVG_ICONS[c.key]
            ? <div className="w-[68px] h-[68px] rounded-full overflow-hidden">{ILJU_SVG_ICONS[c.key]?.()}</div>
            : <RoomChar />
          }
        </div>
      ))}

      {/* ── 캐릭터 (단일 레거시 / charIcon) ── */}
      {!hideChar && !chars && (
        <div className="absolute pointer-events-none" style={{
          left: `${charPos.x}%`, top: `${charPos.y}%`,
          transform: `translate(-50%, -50%) rotate(${charPos.rotate ?? 0}deg) scale(${charPos.scale ?? 1})`,
          zIndex: 25,
        }}>
          {charIcon
            ? <div className="w-[68px] h-[68px] rounded-full overflow-hidden">{charIcon}</div>
            : <RoomChar />
          }
        </div>
      )}
    </div>
  )
}

const DEFAULT_ROOM: RoomData = {
  stickers: [
    { id: "d-sofa", name: "Sofa", x: 76, y: 62, rotate: 0, scale: 1 },
  ],
  charPos: { x: 68, y: 62, rotate: 0, scale: 1 },
}

export const myGuestbookKey = (name: string) => `saju-guestbook-${name}`

export default function MiniRoom() {
  const router = useRouter()
  const [room, setRoom] = useState<RoomData>(DEFAULT_ROOM)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setRoom(JSON.parse(saved))
    } catch {}
  }, [])

  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-charcoal/10 active:opacity-90 transition-opacity text-left cursor-pointer relative"
      style={{ height: 220 }}
      onClick={() => router.push("/v3/my/room/guestbook")}
    >
      <RoomCanvas
        stickers={room.stickers}
        charPos={room.charPos}
        chars={room.chars}
        skin={SKINS.find(s => s.id === room.skinId)}
      />

      {/* 방명록 힌트 — 좌측 하단 */}
      <div
        className="absolute bottom-2 left-3 text-[10px] text-[#B09070]/80 bg-white/40 px-2 py-0.5 rounded-full backdrop-blur-sm pointer-events-none"
        style={{ fontFamily: "'Cafe24Dongdong', cursive" }}
      >
        ✦ 방명록 보기
      </div>

      {/* 수정 버튼 — 우측 하단 */}
      <button
        className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm active:opacity-70 transition-opacity"
        style={{ border: "1.5px solid rgba(45,45,45,0.15)" }}
        onClick={e => { e.stopPropagation(); router.push("/v3/my/room") }}
      >
        <svg viewBox="0 0 20 20" fill="none" width={16} height={16}>
          <path d="M13.5 3.5L16.5 6.5L7 16H4V13L13.5 3.5Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
          <path d="M11.5 5.5L14.5 8.5" stroke="white" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}
