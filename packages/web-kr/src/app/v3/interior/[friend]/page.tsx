"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { RoomCanvas } from "../../my/_components/MiniRoom"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { ELEMENT_THEME } from "@/lib/ilju-calc"
import { useUser } from "@/lib/UserContext"
import { useFriends } from "@/hooks/useFriends"

const withTime = (date: string) => /오전|오후/.test(date) ? date : date + " 오후 12:00"

type GuestEntry = {
  id: string
  author: string
  message: string
  date: string
}

const guestbookKey = (id: string) => `saju-guestbook-${id}`

const CARD_COLORS = [
  { bg: "#FFFDE8", border: "#F0DC6C" },
  { bg: "#F0FFF4", border: "#86EFAC" },
  { bg: "#FFF0F5", border: "#F9A8C4" },
  { bg: "#EFF6FF", border: "#93C5FD" },
  { bg: "#FFF7ED", border: "#FDB877" },
]

const STEM_TO_ELEM: Record<string, string> = {
  갑: "목", 을: "목", 병: "화", 정: "화",
  무: "토", 기: "토", 경: "금", 신: "금",
  임: "수", 계: "수",
}
const ELEM_BG_MAP: Record<string, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#E2E8F0", 수: "#DBEAFE",
}
const ELEM_RING_MAP: Record<string, string> = {
  목: "linear-gradient(135deg, #4ADE80, #86EFAC)",
  화: "linear-gradient(135deg, #F87171, #FCA5A5)",
  토: "linear-gradient(135deg, #FBBF24, #FDE68A)",
  금: "linear-gradient(135deg, #94A3B8, #CBD5E1)",
  수: "linear-gradient(135deg, #60A5FA, #93C5FD)",
}
function cfColors(key: string) {
  const elem = STEM_TO_ELEM[key[0]] ?? "토"
  return { bg: ELEM_BG_MAP[elem], ring: ELEM_RING_MAP[elem] }
}

export default function FriendRoomPage() {
  const router = useRouter()
  const params = useParams()
  const { friends } = useFriends()
  const { user, ilju, hasIlju } = useUser()
  const meName = user.birthDate?.name ?? "나"
  const meIljuKey = hasIlju && ilju ? ilju.id : ""
  const meBg = hasIlju && ilju ? (ELEMENT_THEME[ilju.stemElement]?.bg ?? "#F1F5F9") : "#F1F5F9"
  const meSvgFn = meIljuKey ? ILJU_SVG_ICONS[meIljuKey] : null

  const friendId = decodeURIComponent(params.friend as string)
  const friend = friends.find(f => f.id === friendId)

  const [entries, setEntries] = useState<GuestEntry[]>([])
  const [draft, setDraft] = useState("")

  useEffect(() => {
    try {
      const saved = localStorage.getItem(guestbookKey(friendId))
      if (saved) setEntries(JSON.parse(saved))
    } catch {}
  }, [friendId])

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
    try { localStorage.setItem(guestbookKey(friendId), JSON.stringify(next)) } catch {}
    setDraft("")
  }

  // 친구 목록 로딩 중이거나 존재하지 않는 id면 렌더 보류
  if (!friend) return null

  const friendName = friend.name
  const colors = cfColors(friend.iljuKey)
  const svgFn = ILJU_SVG_ICONS[friend.iljuKey]
  const displayStickers = friend.room?.stickers ?? []
  const displayCharPos = friend.room?.charPos ?? { x: 50, y: 62 }

  return (
    <>
      {/* ── 헤더 — fixed: v3 헤더(48px) 바로 아래 */}
      <div
        className="fixed top-12 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-30 px-4 h-[52px] flex items-center justify-between"
        style={{ background: "var(--bg-minihompi)", borderBottom: "1.5px dashed #D8C4A8" }}
      >
        <button className="text-sm text-text-muted" onClick={() => router.back()}>← 나가기</button>
        <p className="text-[14px] font-bold text-charcoal" style={{ fontFamily: "'BinggraeTaom', sans-serif" }}>
          {friendName}의 방 ✦
        </p>
        <div className="w-14" />
      </div>

      <div
        data-minihompi
        className="flex flex-col pb-24"
        style={{ paddingTop: "64px", background: "var(--bg-minihompi)", minHeight: "calc(100dvh - 48px)" }}
      >
        {/* ── 방 캔버스 ── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-charcoal/10"
          style={{ height: 220 }}
        >
          <RoomCanvas
            stickers={displayStickers}
            charPos={displayCharPos}
            chars={friend.room?.chars}
            charIcon={svgFn ? <div className="w-full h-full">{svgFn()}</div> : undefined}
          />
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
            <div className="p-[2px] rounded-full shrink-0" style={{ background: colors.ring }}>
              <div
                className="w-[38px] h-[38px] rounded-full overflow-hidden flex items-center justify-center"
                style={{ background: colors.bg }}
              >
                {svgFn
                  ? <div className="w-full h-full">{svgFn(getIljuProfileViewBox(friend.iljuKey))}</div>
                  : <span className="text-[14px] font-bold text-charcoal/50">{friendName[0]}</span>
                }
              </div>
            </div>
            <span
              className="text-[12px] text-[#A0896C]/70 leading-none"
              style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}
            >
              {friendName}
            </span>
          </div>
        </div>

        {/* ── 방명록 ── */}
        <div className="mt-4" style={{ fontFamily: "'BinggraeTaom', sans-serif" }}>
          <div
            className="pt-3 pb-2.5 flex items-center justify-between"
            style={{ borderTop: "1.5px dashed #E0C99A", borderBottom: "1px dashed #EDD9B0" }}
          >
            <p className="text-[14px] font-bold text-charcoal">💌 방명록</p>
            <span
              className="text-[11px] px-2.5 py-0.5 rounded-full text-[#9A7050]"
              style={{ border: "1px dashed #C4A070", background: "#FFF4E0" }}
            >
              TODAY {entries.length}
            </span>
          </div>

          <div className="py-4 flex flex-col gap-3">
            {entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="text-4xl">📭</div>
                <p className="text-[14px] font-bold text-[#B09070]">아직 아무도 안 왔어요</p>
                <p className="text-[12px] text-[#C8A888]">첫 방문자가 되어보세요 ♡</p>
              </div>
            ) : (
              entries.map((entry, i) => {
                const color = CARD_COLORS[i % CARD_COLORS.length]
                const tilt = i % 2 === 0 ? "rotate(-0.4deg)" : "rotate(0.3deg)"
                return (
                  <div key={entry.id} className="flex gap-2.5" style={{ transform: tilt }}>
                    {(() => {
                      const isMe = entry.author === meName
                      const entryFriend = friends.find(f => f.name === entry.author)
                      const entrySvgFn = entryFriend ? ILJU_SVG_ICONS[entryFriend.iljuKey] : null
                      return (
                        <div
                          className="shrink-0 w-9 h-9 rounded-full overflow-hidden flex items-center justify-center"
                          style={{ background: isMe ? meBg : (entryFriend ? cfColors(entryFriend.iljuKey).bg : "#F1F5F9"), border: "1.5px dashed #D4B070" }}
                        >
                          {isMe
                            ? <div className="w-full h-full">{meSvgFn?.(getIljuProfileViewBox(meIljuKey))}</div>
                            : entrySvgFn
                              ? <div className="w-full h-full">{entrySvgFn(getIljuProfileViewBox(entryFriend!.iljuKey))}</div>
                              : <span className="text-[13px] font-bold text-charcoal/60">{entry.author[0]}</span>
                          }
                        </div>
                      )
                    })()}
                    <div
                      className="flex-1 rounded-xl rounded-tl-sm px-3 py-1.5"
                      style={{ background: color.bg, border: `1.5px solid ${color.border}`, boxShadow: "2px 2px 0px rgba(0,0,0,0.06)" }}
                    >
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-[12px] font-bold text-charcoal">{entry.author === meName ? "나" : entry.author}</span>
                        <span className="text-[10px] text-text-muted">{withTime(entry.date)}</span>
                      </div>
                      <p className="text-[13px] font-normal text-charcoal/80 leading-snug break-all">{entry.message}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* ── 입력창 — BottomNav 바로 위 고정 ── */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40 px-4 pt-3 pb-[68px]"
        style={{ background: "var(--bg-minihompi)", borderTop: "1.5px dashed #D8C4A0" }}
      >
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
            <textarea
              className="w-full text-[13px] text-charcoal rounded-xl px-3 py-2.5 resize-none focus:outline-none leading-relaxed"
              style={{ background: "#FFFDE8", border: "1.5px dashed #D4B870", fontFamily: "'BinggraeTaom', sans-serif" }}
              placeholder={`${friendName}에게 한마디... ✏️`}
              rows={1}
              maxLength={100}
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  submit()
                }
              }}
            />
            {draft.length > 0 && (
              <span className="absolute bottom-1.5 right-2 text-[9px]" style={{ color: draft.length >= 90 ? "#EF4444" : "#C8B898" }}>
                {draft.length}/100
              </span>
            )}
            </div>
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
