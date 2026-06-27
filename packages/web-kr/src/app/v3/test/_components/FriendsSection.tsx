"use client"
import { useEffect, useState } from "react"
import SectionCard from "./SectionCard"
import { HIDDEN_FRIENDS_KEY } from "@/app/v3/interior/page"
import { FRIEND_ROOMS } from "@/app/v3/interior/_data/friendRooms"

const ELEM_COLORS: Record<string, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE",
}

export default function FriendsSection() {
  const [hidden, setHidden] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HIDDEN_FRIENDS_KEY)
      if (raw) setHidden(JSON.parse(raw))
    } catch {}
  }, [])

  const toggle = (name: string) => {
    const next = hidden.includes(name) ? hidden.filter(h => h !== name) : [...hidden, name]
    setHidden(next)
    if (next.length === 0) {
      localStorage.removeItem(HIDDEN_FRIENDS_KEY)
    } else {
      localStorage.setItem(HIDDEN_FRIENDS_KEY, JSON.stringify(next))
    }
    window.dispatchEvent(new Event("saju-friends-change"))
  }

  const showAll = () => {
    setHidden([])
    localStorage.removeItem(HIDDEN_FRIENDS_KEY)
    window.dispatchEvent(new Event("saju-friends-change"))
  }

  const hideAll = () => {
    const names = FRIEND_ROOMS.map(f => f.name)
    setHidden(names)
    localStorage.setItem(HIDDEN_FRIENDS_KEY, JSON.stringify(names))
    window.dispatchEvent(new Event("saju-friends-change"))
  }

  return (
    <SectionCard title="친구 목록" emoji="👥">
      <p className="text-[11px] text-text-muted">interior 페이지의 친구 방 표시 여부를 제어합니다.</p>
      <div className="flex gap-2">
        <button onClick={showAll} className="flex-1 py-1.5 rounded-full text-[11px] font-bold border border-charcoal/20 text-charcoal active:opacity-70">전체 표시</button>
        <button onClick={hideAll} className="flex-1 py-1.5 rounded-full text-[11px] font-bold border border-charcoal/20 text-charcoal active:opacity-70">전체 숨김</button>
      </div>
      <div className="flex flex-col gap-1.5">
        {FRIEND_ROOMS.map(f => {
          const visible = !hidden.includes(f.name)
          return (
            <div
              key={f.name}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2"
              style={{ background: ELEM_COLORS[f.elem] ?? "#F1F5F9" }}
            >
              <div className="flex-1">
                <p className="text-[13px] font-bold text-charcoal">{f.name}</p>
                <p className="text-[10px] text-text-muted">{f.elem}(오행)</p>
              </div>
              <button
                onClick={() => toggle(f.name)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold border-2 active:opacity-70 ${
                  visible
                    ? "bg-charcoal text-cream border-charcoal"
                    : "bg-white text-text-muted border-charcoal/20"
                }`}
              >
                {visible ? "표시" : "숨김"}
              </button>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
