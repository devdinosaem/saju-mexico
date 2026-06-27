"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import StoryRow from "../my/_components/StoryRow"
import MiniRoom, { RoomCanvas, myGuestbookKey, SKINS } from "../my/_components/MiniRoom"
import { FRIEND_ROOMS, ELEM_RING } from "./_data/friendRooms"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { ELEMENT_THEME } from "@/lib/ilju-calc"
import { useUser } from "@/lib/UserContext"
import { DoodleSparkle, DoodleMoon, DoodleCrown, DoodleBox } from "@/components/doodles"
import { useInventory } from "@/hooks/useInventory"
import { canAccess, itemAccess, STICKER_ACCESS, CHARACTER_ACCESS } from "@/lib/inventory"

export const HIDDEN_FRIENDS_KEY = "saju-test-hidden-friends"
export const CUSTOM_FRIENDS_KEY = "saju-custom-friends"

type GuestEntry = { id: string; author: string; message: string; date: string }
type CustomFriend = { id: string; name: string; iljuKey: string }

const CARD_COLORS = [
  { bg: "#FFFDE8", border: "#F0DC6C" },
  { bg: "#F0FFF4", border: "#86EFAC" },
  { bg: "#FFF0F5", border: "#F9A8C4" },
  { bg: "#EFF6FF", border: "#93C5FD" },
  { bg: "#FFF7ED", border: "#FDB877" },
]

const ALL_STICKER_KEYS = [
  "Chair","Sofa","Lamp","Mirror","Clock","Candle","Pillow","Basket",
  "Plant","Cactus","Tulip","Rose","Sunflower","Vase",
  "CrystalBall","MagicWand","Tarot","Crystal",
  "Star","Heart","Moon","Sparkle","Crown","Balloon","Rainbow",
  "Vinyl","Cassette","Headphones","BubbleTea","Coffee","Matcha",
]

const STEM_TO_ELEM: Record<string, "목" | "화" | "토" | "금" | "수"> = {
  갑: "목", 을: "목", 병: "화", 정: "화",
  무: "토", 기: "토", 경: "금", 신: "금",
  임: "수", 계: "수",
}
const ELEM_BG_MAP: Record<string, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#E2E8F0", 수: "#DBEAFE",
}
function cfColors(iljuKey: string) {
  const elem = STEM_TO_ELEM[iljuKey[0]] ?? "토"
  return { bg: ELEM_BG_MAP[elem], ring: ELEM_RING[elem] }
}

export default function InteriorPage() {
  const router = useRouter()
  const inv = useInventory()
  const { user, ilju, hasIlju } = useUser()
  const meName = user.birthDate?.name ?? "나"
  const gbKey = myGuestbookKey(meName)
  const meIljuKey = hasIlju && ilju ? ilju.id : ""
  const meBg = hasIlju && ilju ? (ELEMENT_THEME[ilju.stemElement]?.bg ?? "#F1F5F9") : "#F1F5F9"
  const meSvgFn = meIljuKey ? ILJU_SVG_ICONS[meIljuKey] : null

  const [guestEntries, setGuestEntries] = useState<GuestEntry[]>([])
  const [seenCount, setSeenCount] = useState(0)
  const [hiddenFriends, setHiddenFriends] = useState<string[]>([])
  const [customFriends, setCustomFriends] = useState<CustomFriend[]>([])
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [addName, setAddName] = useState("")
  const [addIljuKey, setAddIljuKey] = useState("")

  useEffect(() => {
    try {
      const saved = localStorage.getItem(gbKey)
      if (saved) setGuestEntries(JSON.parse(saved))
    } catch {}
    try {
      const seen = localStorage.getItem(gbKey + "-seen")
      if (seen) setSeenCount(parseInt(seen))
    } catch {}
    try {
      const hf = localStorage.getItem(HIDDEN_FRIENDS_KEY)
      if (hf) setHiddenFriends(JSON.parse(hf))
    } catch {}
    try {
      const cf = localStorage.getItem(CUSTOM_FRIENDS_KEY)
      if (cf) setCustomFriends(JSON.parse(cf))
    } catch {}
    const handler = () => {
      try {
        const hf = localStorage.getItem(HIDDEN_FRIENDS_KEY)
        setHiddenFriends(hf ? JSON.parse(hf) : [])
      } catch {}
    }
    window.addEventListener("saju-friends-change", handler)
    return () => window.removeEventListener("saju-friends-change", handler)
  }, [gbKey])

  const previewEntries = guestEntries.slice(0, 2)
  const hasNew = guestEntries.length > seenCount

  const goGuestbook = () => {
    localStorage.setItem(gbKey + "-seen", String(guestEntries.length))
    setSeenCount(guestEntries.length)
    router.push("/v3/my/room/guestbook")
  }

  const addFriend = () => {
    if (!addName.trim() || !addIljuKey) return
    const next = [...customFriends, { id: Date.now().toString(), name: addName.trim(), iljuKey: addIljuKey }]
    setCustomFriends(next)
    localStorage.setItem(CUSTOM_FRIENDS_KEY, JSON.stringify(next))
    window.dispatchEvent(new Event("saju-custom-friends-change"))
    setShowAddFriend(false)
    setAddName("")
    setAddIljuKey("")
  }

  const removeFriend = (id: string) => {
    const next = customFriends.filter(f => f.id !== id)
    setCustomFriends(next)
    localStorage.setItem(CUSTOM_FRIENDS_KEY, JSON.stringify(next))
    window.dispatchEvent(new Event("saju-custom-friends-change"))
  }

  const stickerCount = ALL_STICKER_KEYS.filter(k => canAccess(k, itemAccess(k, STICKER_ACCESS), "sticker", inv)).length
  const skinCount    = SKINS.filter(s => canAccess(s.id, s.access, "skin", inv)).length
  const charCount    = Object.keys(ILJU_SVG_ICONS).filter(k => canAccess(k, itemAccess(k, CHARACTER_ACCESS), "character", inv)).length

  const storageItems = [
    { icon: <DoodleBox className="w-6 h-6"><DoodleSparkle /></DoodleBox>, bg: "#FFF0F5", name: "소품",   count: stickerCount, type: "props" },
    { icon: <DoodleBox className="w-6 h-6"><DoodleCrown /></DoodleBox>,   bg: "#F5F0FF", name: "캐릭터", count: charCount,    type: "characters" },
    { icon: <DoodleBox className="w-6 h-6"><DoodleMoon /></DoodleBox>,    bg: "#EFF6FF", name: "스킨",   count: skinCount,    type: "skins" },
  ]

  const visibleDummyFriends = FRIEND_ROOMS.filter(f => !hiddenFriends.includes(f.name))

  return (
    <div className="flex flex-col gap-4">
      <StoryRow onAdd={() => setShowAddFriend(true)} />

      {/* 내 미니홈피 */}
      <MiniRoom />

      {/* 방명록 인라인 미리보기 */}
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
            <div className="px-4 py-3 flex flex-col gap-2.5">
              {previewEntries.map((entry, i) => {
                const color = CARD_COLORS[i % CARD_COLORS.length]
                const isMe = entry.author === meName
                const friend = FRIEND_ROOMS.find(f => f.name === entry.author)
                return (
                  <div key={entry.id} className="flex gap-2.5" style={{ transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.2deg)" }}>
                    <div
                      className="shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
                      style={{ background: isMe ? meBg : (friend?.bg ?? "#F1F5F9"), border: "1.5px solid #E2E8F0" }}
                    >
                      {isMe
                        ? <div className="w-full h-full">{meSvgFn?.(getIljuProfileViewBox(meIljuKey))}</div>
                        : friend
                          ? <friend.Face s={28} />
                          : <span className="text-[11px] font-bold text-charcoal/50">{entry.author[0]}</span>
                      }
                    </div>
                    <div
                      className="flex-1 rounded-xl rounded-tl-sm px-3 py-1.5"
                      style={{ background: color.bg, border: `1.5px solid ${color.border}`, boxShadow: "1px 1px 0px rgba(0,0,0,0.05)" }}
                    >
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-[11px] font-bold text-charcoal">{entry.author === meName ? "나" : entry.author}</span>
                        <span className="text-[10px] text-text-muted">{/오전|오후/.test(entry.date) ? entry.date : entry.date + " 오후 12:00"}</span>
                      </div>
                      <p className="text-[12px] text-charcoal/80 leading-snug break-all line-clamp-2">{entry.message}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* 보관함 — 내 방 편집기 아닌 보관함 뷰로 라우팅 */}
      <div className="grid grid-cols-3 gap-2">
        {storageItems.map(item => (
          <button
            key={item.name}
            className="flex items-center gap-2.5 rounded-2xl active:opacity-80 transition-opacity px-3 py-2.5"
            style={{ background: item.bg, border: "1.5px solid #E0D4C0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            onClick={() => router.push(`/v3/interior/inventory/${item.type}`)}
          >
            {item.icon}
            <div className="flex-1 min-w-0">
              <span className="block truncate text-[12px] font-bold text-charcoal leading-tight">{item.name}</span>
              <span className="text-[10px] text-charcoal/40">{item.count}개 보유</span>
            </div>
          </button>
        ))}
      </div>

      {/* 추천 방문 (더미 친구들) */}
      {visibleDummyFriends.length > 0 && (
        <div>
          <p className="text-[12px] font-bold mb-2" style={{ color: "#B09070" }}>추천 방문</p>
          <div className="flex flex-col gap-3">
            {visibleDummyFriends.map(friend => (
              <button
                key={friend.name}
                className="w-full rounded-2xl overflow-hidden border border-charcoal/10 active:opacity-90 transition-opacity text-left"
                style={{ height: 220 }}
                onClick={() => router.push(`/v3/interior/${encodeURIComponent(friend.name)}`)}
              >
                <div className="relative w-full h-full">
                  <RoomCanvas stickers={friend.stickers} charPos={friend.charPos} />
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                    <div className="p-[2px] rounded-full shrink-0" style={{ background: friend.ring }}>
                      <div className="w-[38px] h-[38px] rounded-full overflow-hidden flex items-center justify-center" style={{ background: friend.bg }}>
                        <friend.Face s={34} />
                      </div>
                    </div>
                    <span className="text-[12px] text-[#A0896C]/70 leading-none" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>{friend.name}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[10px] text-[#B09070]/80 bg-white/40 px-2 py-0.5 rounded-full backdrop-blur-sm" style={{ fontFamily: "'Cafe24Dongdong', cursive" }}>
                    ✦ 방명록 남기기
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 친구 추가 시트 */}
      {showAddFriend && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setShowAddFriend(false)}
        >
          <div
            className="w-full max-w-[430px] mx-auto rounded-t-3xl px-4 pt-4 pb-8"
            style={{ background: "#FFFBF2", fontFamily: "'BinggraeTaom', sans-serif" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: "#D8C4A0" }} />
            <p className="text-[16px] font-bold text-charcoal mb-4">친구 추가 ✦</p>

            <div className="mb-3">
              <label className="text-[11px] text-text-muted font-bold mb-1.5 block">친구 이름</label>
              <input
                type="text"
                value={addName}
                onChange={e => setAddName(e.target.value)}
                maxLength={10}
                placeholder="이름을 입력하세요"
                className="w-full text-[14px] text-charcoal rounded-xl px-3 py-2.5 focus:outline-none"
                style={{ background: "#FFFDE8", border: "1.5px dashed #D4B870" }}
              />
            </div>

            <div className="mb-4">
              <label className="text-[11px] text-text-muted font-bold mb-1.5 block">
                친구 일주 선택
                {addIljuKey && <span className="text-charcoal ml-1">({addIljuKey})</span>}
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-[200px] overflow-y-auto scrollbar-hide py-1">
                {Object.keys(ILJU_SVG_ICONS).map(key => (
                  <button
                    key={key}
                    className="flex flex-col items-center p-1.5 rounded-xl border transition-colors shrink-0"
                    style={addIljuKey === key
                      ? { background: "#FEF3C7", border: "1.5px solid #F59E0B" }
                      : { background: "white", border: "1.5px solid #E0D4C0" }
                    }
                    onClick={() => setAddIljuKey(key)}
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                      {ILJU_SVG_ICONS[key]?.(getIljuProfileViewBox(key))}
                    </div>
                    <span className="text-[8px] text-charcoal/50 mt-0.5">{key}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="w-full py-3 rounded-xl text-[14px] font-bold transition-opacity disabled:opacity-30 active:opacity-70"
              style={{ background: "#2D2D2D", color: "#FFF9F0" }}
              disabled={!addName.trim() || !addIljuKey}
              onClick={addFriend}
            >
              추가하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
