"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { RoomCanvas, SKINS, STORAGE_KEY, myGuestbookKey } from "../my/_components/MiniRoom"
import type { RoomData } from "../my/_components/MiniRoom"
import { FRIEND_ROOMS } from "../interior/_data/friendRooms"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { ELEMENT_THEME } from "@/lib/ilju-calc"
import { useUser } from "@/lib/UserContext"
const withTime = (date: string) => /오전|오후/.test(date) ? date : date + " 오후 12:00"

type GuestEntry = { id: string; author: string; message: string; date: string }

const CARD_COLORS = [
  { bg: "#FFFDE8", border: "#F0DC6C" },
  { bg: "#F0FFF4", border: "#86EFAC" },
  { bg: "#FFF0F5", border: "#F9A8C4" },
  { bg: "#EFF6FF", border: "#93C5FD" },
  { bg: "#FFF7ED", border: "#FDB877" },
]

const DEFAULT_ROOM: RoomData = {
  stickers: [{ id: "d-sofa", name: "Sofa", x: 76, y: 62, rotate: 0, scale: 1 }],
  charPos: { x: 68, y: 62, rotate: 0, scale: 1 },
}

export default function GuestbookPage() {
  const router = useRouter()
  const { user, ilju, hasIlju } = useUser()
  const meName = user.birthDate?.name ?? "나"
  const meIljuKey = hasIlju && ilju ? ilju.id : ""
  const meBg = hasIlju && ilju ? (ELEMENT_THEME[ilju.stemElement]?.bg ?? "#F1F5F9") : "#F1F5F9"
  const meSvgFn = meIljuKey ? ILJU_SVG_ICONS[meIljuKey] : null
  const gbKey = myGuestbookKey(meName)

  const [room, setRoom] = useState<RoomData>(DEFAULT_ROOM)
  const [entries, setEntries] = useState<GuestEntry[]>([])
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setRoom(JSON.parse(saved))
    } catch {}
    try {
      const gb = localStorage.getItem(gbKey)
      if (gb) setEntries(JSON.parse(gb))
    } catch {}
  }, [])

  const deleteEntry = (id: string) => {
    const next = entries.filter(e => e.id !== id)
    setEntries(next)
    try { localStorage.setItem(gbKey, JSON.stringify(next)) } catch {}
  }


  const skin = SKINS.find(s => s.id === room.skinId)

  return (
    <>
      <div
        className="pt-4 px-4 flex flex-col pb-24"
        style={{ background: "var(--bg-minihompi)" }}
      >
        {/* 방 캔버스 */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-charcoal/10"
          style={{ height: 220 }}
        >
          <RoomCanvas stickers={room.stickers} charPos={room.charPos} chars={room.chars} skin={skin} />
          <button
            className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm active:opacity-70 transition-opacity"
            style={{ border: "1.5px solid rgba(45,45,45,0.15)" }}
            onClick={() => router.push("/v3/my/room")}
          >
            <svg viewBox="0 0 20 20" fill="none" width={16} height={16}>
              <path d="M13.5 3.5L16.5 6.5L7 16H4V13L13.5 3.5Z" fill="#2D2D2D" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M11.5 5.5L14.5 8.5" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div style={{ fontFamily: "'BinggraeTaom', sans-serif" }}>
            <div
              className="pt-3 pb-2.5 flex items-center justify-between"
              style={{ borderTop: "1.5px dashed #E0C99A", borderBottom: "1px dashed #EDD9B0" }}
            >
              <p className="text-[14px] font-bold text-charcoal">💌 내 방명록</p>
              <div className="flex items-center gap-2">
                {entries.length > 0 && (
                  <button
                    className="text-[11px] px-2.5 py-0.5 rounded-full font-bold transition-colors"
                    style={editing
                      ? { background: "#2D2D2D", color: "#FFF9F0", border: "1px solid #2D2D2D" }
                      : { background: "#FFF4E0", color: "#9A7050", border: "1px dashed #C4A070" }
                    }
                    onClick={() => setEditing(e => !e)}
                  >
                    {editing ? "완료" : "편집"}
                  </button>
                )}
                <span
                  className="text-[11px] px-2.5 py-0.5 rounded-full text-[#9A7050]"
                  style={{ border: "1px dashed #C4A070", background: "#FFF4E0" }}
                >
                  TODAY {entries.length}
                </span>
              </div>
            </div>

            <div className="py-4 flex flex-col gap-3">
              {entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <div className="text-4xl">📭</div>
                  <p className="text-[14px] font-bold text-[#B09070]">아직 아무도 안 왔어요</p>
                  <p className="text-[12px] text-[#C8A888]">친구들이 방명록을 남기면 여기 나타나요 ♡</p>
                </div>
              ) : (
                entries.map((entry, i) => {
                  const color = CARD_COLORS[i % CARD_COLORS.length]
                  const tilt = i % 2 === 0 ? "rotate(-0.4deg)" : "rotate(0.3deg)"
                  return (
                    <div key={entry.id} className="flex gap-2.5" style={{ transform: tilt }}>
                      <div
                        className="shrink-0 w-9 h-9 rounded-full overflow-hidden flex items-center justify-center"
                        style={{
                          background: entry.author === meName ? meBg : (FRIEND_ROOMS.find(f => f.name === entry.author)?.bg ?? "#F1F5F9"),
                          border: "1.5px dashed #D4B070",
                        }}
                      >
                        {(() => {
                          if (entry.author === meName) return <div className="w-full h-full">{meSvgFn?.(getIljuProfileViewBox(meIljuKey))}</div>
                          const friend = FRIEND_ROOMS.find(f => f.name === entry.author)
                          return friend
                            ? <friend.Face s={32} />
                            : <span className="text-[12px] font-bold text-charcoal/50">{entry.author[0]}</span>
                        })()}
                      </div>
                      <div
                        className="flex-1 rounded-xl rounded-tl-sm px-3 py-1.5 relative"
                        style={{ background: color.bg, border: `1.5px solid ${color.border}`, boxShadow: "2px 2px 0px rgba(0,0,0,0.06)" }}
                      >
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="text-[12px] font-bold text-charcoal">{entry.author === meName ? "나" : entry.author}</span>
                          <span className="text-[10px] text-text-muted">{withTime(entry.date)}</span>
                        </div>
                        <p className="text-[13px] font-normal text-charcoal/80 leading-snug break-all">{entry.message}</p>
                        {editing && (
                          <button
                            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center active:opacity-60 transition-opacity"
                            style={{ background: "#EF4444", border: "1.5px solid white" }}
                            onClick={() => deleteEntry(entry.id)}
                          >
                            <span className="text-[10px] text-white font-bold leading-none">✕</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
        </div>
      </div>

      {/* 친구 초대 안내 */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pt-3 pb-[68px]"
        style={{ background: "var(--bg-minihompi)", borderTop: "1.5px dashed #D8C4A0", fontFamily: "'BinggraeTaom', sans-serif" }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: "#FFF7E8", border: "1.5px dashed #D4B870" }}
        >
          <span className="text-base">💌</span>
          <p className="text-[12px] text-[#B09070] leading-snug">친구가 방문하면 방명록이 쌓여요</p>
        </div>
      </div>
    </>
  )
}
