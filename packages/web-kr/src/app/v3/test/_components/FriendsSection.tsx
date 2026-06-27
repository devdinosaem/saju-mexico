"use client"
import SectionCard from "./SectionCard"
import { useFriends } from "@/hooks/useFriends"
import { FRIENDS_KEY } from "@/lib/friends"

const STEM_TO_ELEM: Record<string, string> = {
  갑: "목", 을: "목", 병: "화", 정: "화",
  무: "토", 기: "토", 경: "금", 신: "금",
  임: "수", 계: "수",
}
const ELEM_COLORS: Record<string, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#F1F5F9", 수: "#DBEAFE",
}

export default function FriendsSection() {
  const { friends, removeFriend } = useFriends()

  const reseed = () => {
    localStorage.removeItem(FRIENDS_KEY)
    localStorage.removeItem("saju-sample-friends-seeded")
    window.location.reload()
  }

  return (
    <SectionCard title="친구 목록" emoji="👥">
      <p className="text-[11px] text-text-muted">단일 친구 저장소(saju-custom-friends). 샘플은 NEXT_PUBLIC_SAMPLE_FRIENDS=1 환경에서만 시드됩니다.</p>
      <button onClick={reseed} className="self-start py-1.5 px-3 rounded-full text-[11px] font-bold border border-charcoal/20 text-charcoal active:opacity-70">초기화 + 샘플 재시드</button>
      <div className="flex flex-col gap-1.5">
        {friends.length === 0 && (
          <p className="text-[11px] text-text-muted py-2">등록된 친구가 없습니다.</p>
        )}
        {friends.map(f => {
          const elem = STEM_TO_ELEM[f.iljuKey[0]] ?? "토"
          return (
            <div
              key={f.id}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2"
              style={{ background: ELEM_COLORS[elem] ?? "#F1F5F9" }}
            >
              <div className="flex-1">
                <p className="text-[13px] font-bold text-charcoal">{f.name}</p>
                <p className="text-[10px] text-text-muted">{f.iljuKey} · {elem}(오행)</p>
              </div>
              <button
                onClick={() => removeFriend(f.id)}
                className="px-3 py-1 rounded-full text-[11px] font-bold border-2 bg-white text-text-muted border-charcoal/20 active:opacity-70"
              >
                삭제
              </button>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
