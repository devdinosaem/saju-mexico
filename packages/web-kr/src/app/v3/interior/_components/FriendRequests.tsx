"use client"
import { useCallback, useEffect, useState } from "react"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { SOCIAL_BACKEND_ENABLED, ensureDevSession } from "@/lib/supabase/dev-session"
import { fetchPendingRequests, acceptRequest, declineRequest, type PendingRequest } from "@/lib/social/friends"
import { notifyFriendsChange } from "@/lib/friends"

const STEM_TO_ELEM: Record<string, string> = {
  갑: "목", 을: "목", 병: "화", 정: "화", 무: "토", 기: "토", 경: "금", 신: "금", 임: "수", 계: "수",
}
const ELEM_BG: Record<string, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#E2E8F0", 수: "#DBEAFE",
}

export default function FriendRequests() {
  const [reqs, setReqs] = useState<PendingRequest[]>([])
  const [busy, setBusy] = useState<string | null>(null)

  const load = useCallback(async () => {
    await ensureDevSession()
    setReqs(await fetchPendingRequests())
  }, [])

  useEffect(() => { if (SOCIAL_BACKEND_ENABLED) void load() }, [load])

  if (!SOCIAL_BACKEND_ENABLED || reqs.length === 0) return null

  const accept = async (id: string) => {
    setBusy(id)
    await acceptRequest(id)
    notifyFriendsChange() // 친구 목록 갱신
    await load()
    setBusy(null)
  }
  const decline = async (id: string) => {
    setBusy(id)
    await declineRequest(id)
    await load()
    setBusy(null)
  }

  return (
    <div className="rounded-2xl bg-white border-2 border-charcoal p-3 flex flex-col gap-2" style={{ boxShadow: "2px 2px 0px #2D2D2D" }}>
      <p className="text-[13px] font-bold text-charcoal flex items-center gap-1.5" style={{ fontFamily: "'BinggraeTaom', sans-serif" }}>
        💌 받은 친구 요청 <span className="text-pink">{reqs.length}</span>
      </p>
      {reqs.map(r => {
        const fn = ILJU_SVG_ICONS[r.iljuKey]
        const elem = STEM_TO_ELEM[r.iljuKey[0]] ?? "토"
        return (
          <div key={r.friendshipId} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-charcoal/15 flex items-center justify-center shrink-0" style={{ background: ELEM_BG[elem] }}>
              {fn ? <div className="w-full h-full">{fn(getIljuProfileViewBox(r.iljuKey))}</div> : <span className="text-[12px] font-bold text-charcoal/50">{r.name[0]}</span>}
            </div>
            <p className="flex-1 min-w-0 text-[13px] font-bold text-charcoal truncate">{r.name}</p>
            <button
              onClick={() => accept(r.friendshipId)}
              disabled={busy === r.friendshipId}
              className="px-3 py-1.5 rounded-xl text-[12px] font-bold text-cream active:opacity-80 disabled:opacity-50"
              style={{ background: "#E84B6A" }}
            >수락</button>
            <button
              onClick={() => decline(r.friendshipId)}
              disabled={busy === r.friendshipId}
              className="px-2.5 py-1.5 rounded-xl text-[12px] font-bold text-text-muted bg-charcoal/5 active:opacity-80 disabled:opacity-50"
            >거절</button>
          </div>
        )
      })}
    </div>
  )
}
