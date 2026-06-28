"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import StoryRow from "../my/_components/StoryRow"
import MiniRoom, { RoomCanvas, myGuestbookKey, SKINS } from "../my/_components/MiniRoom"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { ELEMENT_THEME } from "@/lib/ilju-calc"
import { useUser } from "@/lib/UserContext"
import { DoodleSparkle, DoodleMoon, DoodleCrown, DoodleBox } from "@/components/doodles"
import { useInventory } from "@/hooks/useInventory"
import { useFriends } from "@/hooks/useFriends"
import { useMyDisplayCharacter } from "@/hooks/useMyDisplayCharacter"
import { canAccess, itemAccess, STICKER_ACCESS, CHARACTER_ACCESS } from "@/lib/inventory"
import RoomElementStrip from "./_components/RoomElementStrip"
import RoomElementMini from "./_components/RoomElementMini"

type GuestEntry = { id: string; author: string; message: string; date: string }

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
const ELEM_RING: Record<string, string> = {
  목: "linear-gradient(135deg, #4ADE80, #86EFAC)",
  화: "linear-gradient(135deg, #F87171, #FCA5A5)",
  토: "linear-gradient(135deg, #FBBF24, #FDE68A)",
  금: "linear-gradient(135deg, #94A3B8, #CBD5E1)",
  수: "linear-gradient(135deg, #60A5FA, #93C5FD)",
}
function cfColors(iljuKey: string) {
  const elem = STEM_TO_ELEM[iljuKey[0]] ?? "토"
  return { bg: ELEM_BG_MAP[elem], ring: ELEM_RING[elem] }
}

export default function InteriorPage() {
  const router = useRouter()
  const inv = useInventory()
  const { friends, addFriend: addFriendToStore } = useFriends()
  const { user, ilju, hasIlju } = useUser()
  const meName = user.birthDate?.name ?? "나"
  const gbKey = myGuestbookKey(meName)
  const meBg = hasIlju && ilju ? (ELEMENT_THEME[ilju.stemElement]?.bg ?? "#F1F5F9") : "#F1F5F9"
  // 작성자 아바타 = 대표 캐릭터(소셜)
  const meDisplayKey = useMyDisplayCharacter() ?? ""
  const meSvgFn = meDisplayKey ? ILJU_SVG_ICONS[meDisplayKey] : null

  const [guestEntries, setGuestEntries] = useState<GuestEntry[]>([])
  const [seenCount, setSeenCount] = useState(0)
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
    addFriendToStore(addName, addIljuKey)
    setShowAddFriend(false)
    setAddName("")
    setAddIljuKey("")
  }

  const stickerCount = ALL_STICKER_KEYS.filter(k => canAccess(k, itemAccess(k, STICKER_ACCESS), "sticker", inv)).length
  const skinCount    = SKINS.filter(s => canAccess(s.id, s.access, "skin", inv)).length
  const charCount    = Object.keys(ILJU_SVG_ICONS).filter(k => canAccess(k, itemAccess(k, CHARACTER_ACCESS), "character", inv)).length

  const storageItems = [
    { icon: <DoodleBox className="w-6 h-6"><DoodleSparkle /></DoodleBox>, bg: "#FFF0F5", name: "소품",   count: stickerCount, type: "props" },
    { icon: <DoodleBox className="w-6 h-6"><DoodleCrown /></DoodleBox>,   bg: "#F5F0FF", name: "캐릭터", count: charCount,    type: "characters" },
    { icon: <DoodleBox className="w-6 h-6"><DoodleMoon /></DoodleBox>,    bg: "#EFF6FF", name: "스킨",   count: skinCount,    type: "skins" },
  ]

  return (
    <div className="flex flex-col gap-4">
      <StoryRow onAdd={() => setShowAddFriend(true)} />

      {/* 내 미니홈피 */}
      <MiniRoom />

      {/* ▼▼▼ 방의 기운 — 인라인 시안 2종 비교(임시) · 탭 → /energy ▼▼▼ */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-charcoal/35 px-1">시안 1 · 슬림 스트립</span>
        <RoomElementStrip />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-charcoal/35 px-1">시안 2 · 컴팩트 미니카드</span>
        <RoomElementMini />
      </div>
      {/* ▲▲▲ 방의 기운 — 인라인 시안 2종 비교(임시) ▲▲▲ */}

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
                const friend = friends.find(f => f.name === entry.author)
                const friendSvgFn = friend ? ILJU_SVG_ICONS[friend.iljuKey] : null
                return (
                  <div key={entry.id} className="flex gap-2.5" style={{ transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.2deg)" }}>
                    <div
                      className="shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
                      style={{ background: isMe ? meBg : (friend ? cfColors(friend.iljuKey).bg : "#F1F5F9"), border: "1.5px solid #E2E8F0" }}
                    >
                      {isMe
                        ? <div className="w-full h-full">{meSvgFn?.(getIljuProfileViewBox(meDisplayKey))}</div>
                        : friendSvgFn
                          ? <div className="w-full h-full">{friendSvgFn(getIljuProfileViewBox(friend!.iljuKey))}</div>
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

      {/* 친구 미니홈피 방문 */}
      {friends.length > 0 && (
        <div>
          <p className="text-[12px] font-bold mb-2" style={{ color: "#B09070" }}>친구 미니홈피</p>
          <div className="flex flex-col gap-3">
            {friends.map(friend => {
              const colors = cfColors(friend.iljuKey)
              const svgFn = ILJU_SVG_ICONS[friend.iljuKey]
              return (
              <button
                key={friend.id}
                className="w-full rounded-2xl overflow-hidden border border-charcoal/10 active:opacity-90 transition-opacity text-left"
                style={{ height: 220 }}
                onClick={() => router.push(`/v3/interior/${friend.id}`)}
              >
                <div className="relative w-full h-full">
                  <RoomCanvas
                    stickers={friend.room?.stickers ?? []}
                    charPos={friend.room?.charPos ?? { x: 50, y: 62 }}
                    chars={friend.room?.chars}
                    charIcon={svgFn ? <div className="w-full h-full">{svgFn()}</div> : undefined}
                  />
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                    <div className="p-[2px] rounded-full shrink-0" style={{ background: colors.ring }}>
                      <div className="w-[38px] h-[38px] rounded-full overflow-hidden flex items-center justify-center" style={{ background: colors.bg }}>
                        {svgFn ? <div className="w-full h-full">{svgFn(getIljuProfileViewBox(friend.iljuKey))}</div> : <span className="text-[13px] font-bold text-charcoal/50">{friend.name[0]}</span>}
                      </div>
                    </div>
                    <span className="text-[12px] text-[#A0896C]/70 leading-none" style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>{friend.name}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[10px] text-[#B09070]/80 bg-white/40 px-2 py-0.5 rounded-full backdrop-blur-sm" style={{ fontFamily: "'Cafe24Dongdong', cursive" }}>
                    ✦ 방명록 남기기
                  </div>
                </div>
              </button>
              )
            })}
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
            className="w-full max-w-[480px] mx-auto rounded-t-3xl px-4 pt-4 pb-8"
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
