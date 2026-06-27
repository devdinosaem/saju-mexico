"use client"
import { useEffect, useState } from "react"
import SectionCard from "./SectionCard"
import { STORAGE_KEY as ROOM_KEY, myGuestbookKey, type RoomData } from "@/app/v3/my/_components/MiniRoom"

// 테스트 패널은 고정 테스트 유저(경진) 방명록 기준
const MY_GUESTBOOK_KEY = myGuestbookKey("경진")

const DEFAULT_ROOM: RoomData = {
  stickers: [],
  charPos: { x: 50, y: 65 },
  skinId: "default",
}

type GuestEntry = { id: string; author: string; message: string; date: string }

export default function RoomSection() {
  const [stickerCount, setStickerCount] = useState(0)
  const [skinId, setSkinId] = useState("default")
  const [guestCount, setGuestCount] = useState(0)
  const [newAuthor, setNewAuthor] = useState("지수")
  const [newMsg, setNewMsg] = useState("안녕~ 방 예쁘다!")

  const syncRoom = () => {
    try {
      const raw = localStorage.getItem(ROOM_KEY)
      if (raw) {
        const rd: RoomData = JSON.parse(raw)
        setStickerCount(rd.stickers?.length ?? 0)
        setSkinId(rd.skinId ?? "default")
      }
    } catch {}
    try {
      const gb = localStorage.getItem(MY_GUESTBOOK_KEY)
      setGuestCount(gb ? JSON.parse(gb).length : 0)
    } catch {}
  }

  useEffect(() => { syncRoom() }, [])

  const resetRoom = () => {
    localStorage.setItem(ROOM_KEY, JSON.stringify(DEFAULT_ROOM))
    syncRoom()
  }

  const clearGuestbook = () => {
    localStorage.setItem(MY_GUESTBOOK_KEY, JSON.stringify([]))
    localStorage.removeItem(MY_GUESTBOOK_KEY + "-seen")
    setGuestCount(0)
  }

  const addGuestEntry = () => {
    if (!newMsg.trim()) return
    try {
      const raw = localStorage.getItem(MY_GUESTBOOK_KEY)
      const entries: GuestEntry[] = raw ? JSON.parse(raw) : []
      const now = new Date()
      const hh = now.getHours()
      const ampm = hh < 12 ? "오전" : "오후"
      const h = hh % 12 || 12
      const mm = String(now.getMinutes()).padStart(2, "0")
      const dateStr = `${ampm} ${h}:${mm}`
      entries.push({ id: Date.now().toString(), author: newAuthor.trim() || "익명", message: newMsg.trim(), date: dateStr })
      localStorage.setItem(MY_GUESTBOOK_KEY, JSON.stringify(entries))
      setGuestCount(entries.length)
    } catch {}
  }

  return (
    <SectionCard title="미니룸 & 방명록" emoji="🏠">
      <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 px-3 py-2">
        <div>
          <p className="text-[12px] font-bold text-charcoal">미니룸</p>
          <p className="text-[11px] text-text-muted">스킨: {skinId} · 소품 {stickerCount}개</p>
        </div>
        <button
          onClick={resetRoom}
          className="text-[11px] text-red-400 border border-red-200 rounded-full px-3 py-1 active:opacity-70"
        >
          초기화
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] font-bold text-charcoal">방명록 ({guestCount}건)</p>
          <button
            onClick={clearGuestbook}
            className="text-[11px] text-red-400 border border-red-200 rounded-full px-3 py-1 active:opacity-70"
          >
            전체 삭제
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-text-muted">작성자</label>
              <input
                className="w-full mt-0.5 border-2 border-charcoal/20 rounded-xl px-3 py-2 text-[13px] text-charcoal bg-white"
                value={newAuthor}
                onChange={e => setNewAuthor(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] text-text-muted">내용</label>
              <input
                className="w-full mt-0.5 border-2 border-charcoal/20 rounded-xl px-3 py-2 text-[13px] text-charcoal bg-white"
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={addGuestEntry}
            className="w-full py-2 rounded-xl bg-white text-charcoal text-[12px] font-bold border-2 border-charcoal/20 active:opacity-70"
          >
            방명록 글 추가
          </button>
        </div>
      </div>
    </SectionCard>
  )
}
