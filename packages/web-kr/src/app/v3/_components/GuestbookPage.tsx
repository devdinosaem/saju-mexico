"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { RoomCanvas, SKINS, STORAGE_KEY, MY_GUESTBOOK_KEY } from "../my/_components/MiniRoom"
import type { RoomData } from "../my/_components/MiniRoom"
import { FRIEND_ROOMS } from "../interior/_data/friendRooms"
import { ILJU_SVG_ICONS } from "@/lib/ilju-svg-icons"
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

  const [room, setRoom] = useState<RoomData>(DEFAULT_ROOM)
  const [entries, setEntries] = useState<GuestEntry[]>([])
  const [draft, setDraft] = useState("")
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setRoom(JSON.parse(saved))
    } catch {}
    try {
      const gb = localStorage.getItem(MY_GUESTBOOK_KEY)
      if (gb) setEntries(JSON.parse(gb))
    } catch {}
  }, [])

  const deleteEntry = (id: string) => {
    const next = entries.filter(e => e.id !== id)
    setEntries(next)
    try { localStorage.setItem(MY_GUESTBOOK_KEY, JSON.stringify(next)) } catch {}
  }

  const submit = () => {
    if (!draft.trim()) return
    const entry: GuestEntry = {
      id: Date.now().toString(),
      author: meName,
      message: draft.trim(),
      date: new Date().toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }),
    }
    const next = [entry, ...entries]
    setEntries(next)
    try { localStorage.setItem(MY_GUESTBOOK_KEY, JSON.stringify(next)) } catch {}
    setDraft("")
  }

  const skin = SKINS.find(s => s.id === room.skinId)

  return (
    <>
      {/* 방 캔버스 */}
      <div
        className="fixed top-12 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-10 px-4 pt-4 pb-2"
        style={{ background: "var(--bg-minihompi)" }}
      >
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-charcoal/10"
          style={{ height: 220 }}
        >
          <RoomCanvas stickers={room.stickers} charPos={room.charPos} skin={skin} />
        </div>
      </div>

      {/* 스크롤 콘텐츠 */}
      <div
        className="fixed left-1/2 -translate-x-1/2 w-full max-w-[430px] overflow-y-auto scrollbar-hide"
        style={{ top: "calc(3rem + 244px)", bottom: 0, background: "var(--bg-minihompi)" }}
      >
        <div className="px-4 pb-40 flex flex-col">
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
                  {entries.length > 0 ? `${entries.length}명 방문` : "아직 0명"}
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
                          if (entry.author === meName) return <div className="w-full h-full">{meSvgFn?.()}</div>
                          const friend = FRIEND_ROOMS.find(f => f.name === entry.author)
                          return friend
                            ? <friend.Face s={32} />
                            : <span className="text-[12px] font-bold text-charcoal/50">{entry.author[0]}</span>
                        })()}
                      </div>
                      <div
                        className="flex-1 rounded-xl rounded-tl-sm px-3 py-2.5 relative"
                        style={{ background: color.bg, border: `1.5px solid ${color.border}`, boxShadow: "2px 2px 0px rgba(0,0,0,0.06)" }}
                      >
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-[12px] font-bold text-charcoal">{entry.author === meName ? "나" : entry.author}</span>
                          <span className="text-[10px] text-text-muted">{withTime(entry.date)}</span>
                        </div>
                        <p className="text-[13px] text-charcoal/80 leading-relaxed">{entry.message}</p>
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
      </div>

      {/* 입력창 */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pt-3 pb-[68px]"
        style={{ background: "var(--bg-minihompi)", borderTop: "1.5px dashed #D8C4A0", fontFamily: "'BinggraeTaom', sans-serif" }}
      >
        <div className="flex gap-2 items-center">
          <textarea
            className="flex-1 text-[13px] text-charcoal rounded-xl px-3 py-2.5 resize-none focus:outline-none leading-relaxed"
            style={{ background: "#FFFDE8", border: "1.5px dashed #D4B870", fontFamily: "'BinggraeTaom', sans-serif" }}
            placeholder="내 방명록에 한마디... ✏️"
            rows={1}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit() } }}
          />
          <button
            className="shrink-0 px-4 py-2.5 rounded-xl text-[13px] font-bold active:opacity-70 transition-opacity disabled:opacity-30"
            style={{ background: "#2D2D2D", color: "#FFF9F0", fontFamily: "'BinggraeTaom', sans-serif", border: "2px solid #2D2D2D", boxShadow: "2px 2px 0px #A08060" }}
            disabled={!draft.trim()}
            onClick={submit}
          >
            남기기
          </button>
        </div>
      </div>
    </>
  )
}
