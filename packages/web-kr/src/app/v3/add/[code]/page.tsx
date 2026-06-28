"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { ensureDevSession } from "@/lib/supabase/dev-session"
import { lookupByCode, sendFriendRequest, type TargetProfile } from "@/lib/social/friends"

const STEM_TO_ELEM: Record<string, string> = {
  갑: "목", 을: "목", 병: "화", 정: "화", 무: "토", 기: "토", 경: "금", 신: "금", 임: "수", 계: "수",
}
const ELEM_BG: Record<string, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#E2E8F0", 수: "#DBEAFE",
}
const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }

type Phase =
  | { k: "loading" }
  | { k: "notfound" }
  | { k: "ready"; target: TargetProfile }
  | { k: "done"; name: string; accepted: boolean }

export default function AddFriendPage() {
  const router = useRouter()
  const params = useParams()
  const code = decodeURIComponent((params.code as string) ?? "")
  const [phase, setPhase] = useState<Phase>({ k: "loading" })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    let alive = true
    ;(async () => {
      await ensureDevSession()
      const t = await lookupByCode(code)
      if (!alive) return
      setPhase(t ? { k: "ready", target: t } : { k: "notfound" })
    })()
    return () => { alive = false }
  }, [code])

  const onSend = async () => {
    if (phase.k !== "ready" || sending) return
    setSending(true)
    const res = await sendFriendRequest(code)
    setSending(false)
    if (res.ok) setPhase({ k: "done", name: res.name ?? phase.target.name, accepted: res.status === "accepted" })
  }

  const Avatar = ({ iljuKey }: { iljuKey: string }) => {
    const fn = ILJU_SVG_ICONS[iljuKey]
    const elem = STEM_TO_ELEM[iljuKey[0]] ?? "토"
    return (
      <div className="w-[88px] h-[88px] rounded-full overflow-hidden border-2 border-charcoal flex items-center justify-center" style={{ background: ELEM_BG[elem] }}>
        {fn ? <div className="w-full h-full">{fn(getIljuProfileViewBox(iljuKey))}</div> : <span className="text-2xl font-bold text-charcoal/50">?</span>}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center gap-5">
      {phase.k === "loading" && (
        <p className="text-[15px] text-text-muted" style={GAEGU}>친구를 찾는 중…</p>
      )}

      {phase.k === "notfound" && (
        <>
          <div className="text-5xl">🧐</div>
          <p className="text-[17px] text-charcoal" style={BINGGRAE}>친구를 찾을 수 없어요</p>
          <p className="text-[13px] text-text-muted leading-snug" style={GAEGU}>초대 링크가 만료됐거나 잘못됐어요.</p>
          <button onClick={() => router.push("/v3/interior")} className="mt-2 px-5 py-2.5 rounded-2xl bg-charcoal text-cream text-sm font-bold active:opacity-80">운테리어로</button>
        </>
      )}

      {phase.k === "ready" && (
        <>
          <p className="text-[13px] text-text-muted tracking-wider">친구 초대</p>
          <Avatar iljuKey={phase.target.iljuKey} />
          <p className="text-[20px] text-charcoal" style={BINGGRAE}>{phase.target.name}</p>
          <p className="text-[14px] text-charcoal/70 leading-snug" style={GAEGU}>{phase.target.name}님과 친구가 되면<br/>서로의 미니홈피·방명록을 주고받을 수 있어요.</p>
          <button
            onClick={onSend}
            disabled={sending}
            className="mt-2 w-full max-w-[280px] h-[52px] rounded-2xl text-[15px] border-2 border-charcoal active:opacity-85 disabled:opacity-50"
            style={{ background: "#E84B6A", color: "#FFF9F0", boxShadow: "2px 2px 0px #2D2D2D", ...BINGGRAE }}
          >
            {sending ? "보내는 중…" : "친구 요청 보내기"}
          </button>
        </>
      )}

      {phase.k === "done" && (
        <>
          <div className="text-5xl">{phase.accepted ? "🎉" : "💌"}</div>
          <p className="text-[18px] text-charcoal" style={BINGGRAE}>
            {phase.accepted ? `${phase.name}님과 친구가 됐어요!` : "친구 요청을 보냈어요"}
          </p>
          <p className="text-[13px] text-text-muted leading-snug" style={GAEGU}>
            {phase.accepted ? "이제 미니홈피에 놀러 가보세요 ♡" : `${phase.name}님이 수락하면 친구가 돼요.`}
          </p>
          <button onClick={() => router.push("/v3/interior")} className="mt-2 px-5 py-2.5 rounded-2xl bg-charcoal text-cream text-sm font-bold active:opacity-80">운테리어로</button>
        </>
      )}
    </div>
  )
}
