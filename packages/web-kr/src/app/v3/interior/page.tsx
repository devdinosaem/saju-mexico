"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import StoryRow from "../my/_components/StoryRow"
import MiniRoom, { RoomCanvas, MY_GUESTBOOK_KEY } from "../my/_components/MiniRoom"
import { FRIEND_ROOMS } from "./_data/friendRooms"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
import { ELEMENT_THEME } from "@/lib/ilju-calc"
import { useUser } from "@/lib/UserContext"

export const HIDDEN_FRIENDS_KEY = "saju-test-hidden-friends"

type GuestEntry = { id: string; author: string; message: string; date: string }

const CARD_COLORS = [
  { bg: "#FFFDE8", border: "#F0DC6C" },
  { bg: "#F0FFF4", border: "#86EFAC" },
  { bg: "#FFF0F5", border: "#F9A8C4" },
  { bg: "#EFF6FF", border: "#93C5FD" },
  { bg: "#FFF7ED", border: "#FDB877" },
]
import { DoodleSparkle, DoodleMoon, DoodleCrown, DoodleBox } from "@/components/doodles"
import { SKINS } from "../my/_components/MiniRoom"
import { useInventory } from "@/hooks/useInventory"
import { canAccess, itemAccess, STICKER_ACCESS, CHARACTER_ACCESS } from "@/lib/inventory"

const ALL_STICKER_KEYS = [
  "Chair","Sofa","Lamp","Mirror","Clock","Candle","Pillow","Basket",
  "Plant","Cactus","Tulip","Rose","Sunflower","Vase",
  "CrystalBall","MagicWand","Tarot","Crystal",
  "Star","Heart","Moon","Sparkle","Crown","Balloon","Rainbow",
  "Vinyl","Cassette","Headphones","BubbleTea","Coffee","Matcha",
]

export default function InteriorPage() {
  const router = useRouter()
  const inv = useInventory()
  const { user, ilju, hasIlju } = useUser()
  const meName = user.birthDate?.name ?? "나"
  const meIljuKey = hasIlju && ilju ? ilju.id : ""
  const meBg = hasIlju && ilju ? (ELEMENT_THEME[ilju.stemElement]?.bg ?? "#F1F5F9") : "#F1F5F9"
  const meSvgFn = meIljuKey ? ILJU_SVG_ICONS[meIljuKey] : null

  const [guestEntries, setGuestEntries] = useState<GuestEntry[]>([])
  const [seenCount, setSeenCount] = useState(0)
  const [hiddenFriends, setHiddenFriends] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(MY_GUESTBOOK_KEY)
      if (saved) setGuestEntries(JSON.parse(saved))
    } catch {}
    try {
      const seen = localStorage.getItem(MY_GUESTBOOK_KEY + "-seen")
      if (seen) setSeenCount(parseInt(seen))
    } catch {}
    try {
      const hf = localStorage.getItem(HIDDEN_FRIENDS_KEY)
      if (hf) setHiddenFriends(JSON.parse(hf))
    } catch {}
    const handler = () => {
      try {
        const hf = localStorage.getItem(HIDDEN_FRIENDS_KEY)
        setHiddenFriends(hf ? JSON.parse(hf) : [])
      } catch {}
    }
    window.addEventListener("saju-friends-change", handler)
    return () => window.removeEventListener("saju-friends-change", handler)
  }, [])

  const previewEntries = guestEntries.slice(0, 2)
  const hasNew = guestEntries.length > seenCount

  const goGuestbook = () => {
    localStorage.setItem(MY_GUESTBOOK_KEY + "-seen", String(guestEntries.length))
    setSeenCount(guestEntries.length)
    router.push("/v3/interior/room/guestbook")
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <StoryRow />

      {/* 내 미니홈피 */}
      <MiniRoom />

      {/* 방명록 인라인 미리보기 — 항목 있을 때만 표시 */}
      {previewEntries.length > 0 && (
      <div className="relative">
        {hasNew && (
          <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#F7F3EE] z-10" />
        )}
        <div
          className="rounded-2xl overflow-hidden cursor-pointer active:opacity-80 transition-opacity"
          style={{ border: "1.5px dashed #D8C4A0", background: "#FFFBF2", fontFamily: "'BinggraeTaom', sans-serif" }}
          onClick={goGuestbook}
        >
        {/* 내용 */}
        <div className="px-4 py-3 flex flex-col gap-2.5">
          {previewEntries.map((entry, i) => {
              const color = CARD_COLORS[i % CARD_COLORS.length]
              const isMe = entry.author === meName
              const friend = FRIEND_ROOMS.find(f => f.name === entry.author)
              return (
                <div
                  key={entry.id}
                  className="flex gap-2.5"
                  style={{ transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.2deg)" }}
                >
                  {/* 일주 캐릭터 */}
                  <div
                    className="shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
                    style={{
                      background: isMe ? meBg : (friend?.bg ?? "#F1F5F9"),
                      border: friend ? `1.5px solid ${friend.ring.split(",")[0].replace("linear-gradient(135deg", "").trim()}40` : "1.5px solid #E2E8F0",
                    }}
                  >
                    {isMe
                      ? <div className="w-full h-full">{meSvgFn?.()}</div>
                      : friend
                        ? <friend.Face s={28} />
                        : <span className="text-[11px] font-bold text-charcoal/50">{entry.author[0]}</span>
                    }
                  </div>
                  <div
                    className="flex-1 rounded-xl rounded-tl-sm px-3 py-2"
                    style={{ background: color.bg, border: `1.5px solid ${color.border}`, boxShadow: "1px 1px 0px rgba(0,0,0,0.05)" }}
                  >
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-[11px] font-bold text-charcoal">{entry.author === meName ? "나" : entry.author}</span>
                      <span className="text-[10px] text-text-muted">{/오전|오후/.test(entry.date) ? entry.date : entry.date + " 오후 12:00"}</span>
                    </div>
                    <p className="text-[12px] text-charcoal/80 leading-relaxed line-clamp-2">{entry.message}</p>
                  </div>
                </div>
              )
            })
          }
        </div>

        </div>{/* inner overflow-hidden */}
      </div>
      )}{/* 방명록 미리보기 end */}

      {/* 보관함 */}
      {(() => {
        const stickerCount   = ALL_STICKER_KEYS.filter(k => canAccess(k, itemAccess(k, STICKER_ACCESS), "sticker", inv)).length
        const skinCount      = SKINS.filter(s => canAccess(s.id, s.access, "skin", inv)).length
        const charCount      = Object.keys(ILJU_SVG_ICONS).filter(k => canAccess(k, itemAccess(k, CHARACTER_ACCESS), "character", inv)).length
        const items = [
          { icon: <DoodleBox className="w-6 h-6"><DoodleSparkle /></DoodleBox>, bg: "#FFF0F5", name: "소품",   count: stickerCount, tab: "소품" },
          { icon: <DoodleBox className="w-6 h-6"><DoodleCrown /></DoodleBox>,   bg: "#F5F0FF", name: "캐릭터", count: charCount,    tab: "캐릭터" },
          { icon: <DoodleBox className="w-6 h-6"><DoodleMoon /></DoodleBox>,    bg: "#EFF6FF", name: "스킨",   count: skinCount,    tab: "스킨" },
        ]
        return (
          <div className="grid grid-cols-3 gap-2">
            {items.map(item => (
              <button
                key={item.name}
                className="flex items-center gap-2.5 rounded-2xl active:opacity-80 transition-opacity px-3 py-2.5"
                style={{ background: item.bg, border: "1.5px solid #E0D4C0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                onClick={() => router.push(`/v3/inventory?tab=${encodeURIComponent(item.tab)}`)}
              >
                {item.icon}
                <span className="flex-1 min-w-0 truncate text-[12px] font-bold text-charcoal leading-tight">{item.name}</span>
              </button>
            ))}
          </div>
        )
      })()}

      {/* 친구들 미니홈피 */}
      {FRIEND_ROOMS.filter(f => !hiddenFriends.includes(f.name)).map(friend => (
        <button
          key={friend.name}
          className="w-full rounded-2xl overflow-hidden border border-charcoal/10 active:opacity-90 transition-opacity text-left"
          style={{ height: 220 }}
          onClick={() => router.push(`/v3/interior/${encodeURIComponent(friend.name)}`)}
        >
          <div className="relative w-full h-full">
            <RoomCanvas stickers={friend.stickers} charPos={friend.charPos} />

            {/* 친구 프로필 + 이름 */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
              <div className="p-[2px] rounded-full shrink-0" style={{ background: friend.ring }}>
                <div
                  className="w-[38px] h-[38px] rounded-full overflow-hidden flex items-center justify-center"
                  style={{ background: friend.bg }}
                >
                  <friend.Face s={34} />
                </div>
              </div>
              <span
                className="text-[12px] text-[#A0896C]/70 leading-none"
                style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}
              >
                {friend.name}
              </span>
            </div>

            {/* 방명록 힌트 */}
            <div
              className="absolute bottom-2 right-3 text-[10px] text-[#B09070]/80 bg-white/40 px-2 py-0.5 rounded-full backdrop-blur-sm"
              style={{ fontFamily: "'Cafe24Dongdong', cursive" }}
            >
              ✦ 방명록 남기기
            </div>
          </div>
        </button>
      ))}

    </div>
  )
}
