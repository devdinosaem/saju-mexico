"use client"
import { createClient } from "@/lib/supabase/client"

// 스토리 — 활동 링(친구 방 꾸밈/방명록) + 일간 기반 매일 문구(클라 결정적).
// 정책: docs/SOCIAL-BACKEND-POLICY.md §11 #3·#7·#10.

const STEM_TO_ELEM: Record<string, "목" | "화" | "토" | "금" | "수"> = {
  갑: "목", 을: "목", 병: "화", 정: "화",
  무: "토", 기: "토", 경: "금", 신: "금",
  임: "수", 계: "수",
}

// ── 일간 기반 매일 문구 (오행 풀 × 일간·날짜 시드로 결정적 선택) ──
const STORY_PHRASES: Record<"목" | "화" | "토" | "금" | "수", string[]> = {
  목: [
    "오늘 뭔가 새로 시작하고 싶어. 아이디어 있으면 말해줘",
    "쑥쑥 자라는 기분이야. 좋은 거 같이 하자",
    "새 길이 보여. 일단 한 발 떼볼래",
    "에너지가 위로 뻗는 날. 도전 환영",
    "싱그러운 모드. 산책이나 같이 갈래?",
    "머리에 새싹 돋는 중. 기획 들어와",
  ],
  화: [
    "오늘 좀 뜨거워. 건드리면 타",
    "텐션 최고조. 신나는 거 던져봐",
    "불꽃 모드라 추진력 만렙이야",
    "오늘은 화끈하게 가는 날. 미적대지 마",
    "열정이 넘쳐. 같이 사고 한번 칠까",
    "반짝반짝 빛나고 싶은 날이야",
  ],
  토: [
    "오늘 차분하게 있을 예정. 큰 변화 없음",
    "단단하게 중심 잡는 날. 기대도 돼",
    "느긋하게 흘러가는 중. 편하게 와",
    "오늘은 안정 모드. 잔잔하게 가자",
    "묵직하게 버티는 하루야. 믿어도 좋아",
    "땅처럼 든든하게. 고민 있으면 들어줄게",
  ],
  금: [
    "오늘 결단 모드야. 쓸데없는 말 하면 잘림",
    "칼같이 정리하는 날. 핵심만 말해",
    "단호한 하루. 미련은 접었어",
    "반짝 날 세운 상태. 빈틈 없음",
    "오늘은 깔끔하게 끊고 가는 날이야",
    "정밀 모드. 디테일 놓치지 마",
  ],
  수: [
    "오늘 감수성 폭발 중. 연락해줘",
    "물처럼 유연한 날. 뭐든 흘려보낼게",
    "깊어지는 하루야. 진솔한 얘기 환영",
    "촉촉한 모드. 위로가 필요하면 와",
    "생각이 깊어지는 날. 같이 잠겨볼까",
    "잔잔히 스며드는 중. 가볍게 말 걸어줘",
  ],
}

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

/** 일간×날짜 결정적 일일 문구. 같은 날 같은 친구면 항상 같고, 날이 바뀌면 변함. */
export function storyPhrase(iljuKey: string, date: Date = new Date()): string {
  const elem = STEM_TO_ELEM[iljuKey[0]] ?? "토"
  const pool = STORY_PHRASES[elem]
  const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return pool[hashStr(iljuKey + "|" + day) % pool.length]
}

// ── 활동 신호 (친구 방 updated_at + 친구 벽 최신 방명록) ──
/** 친구별 최신 활동 시각(ms). */
export async function fetchFriendActivity(friendIds: string[]): Promise<Record<string, number>> {
  const act: Record<string, number> = {}
  if (!friendIds.length) return act
  const sb = createClient()

  const { data: rooms } = await sb.from("rooms").select("user_id,updated_at").in("user_id", friendIds)
  for (const r of (rooms ?? []) as { user_id: string; updated_at: string }[]) {
    act[r.user_id] = Math.max(act[r.user_id] ?? 0, new Date(r.updated_at).getTime())
  }

  const { data: gb } = await sb
    .from("guestbook_entries")
    .select("owner_id,created_at")
    .in("owner_id", friendIds)
    .order("created_at", { ascending: false })
  for (const g of (gb ?? []) as { owner_id: string; created_at: string }[]) {
    act[g.owner_id] = Math.max(act[g.owner_id] ?? 0, new Date(g.created_at).getTime())
  }
  return act
}

// ── 읽음(last-seen) — 기기 로컬(per-friend) ──
const seenKey = (id: string) => `saju-story-seen-${id}`

export function getStorySeen(id: string): number {
  if (typeof window === "undefined") return 0
  try { return Number(localStorage.getItem(seenKey(id))) || 0 } catch { return 0 }
}

export function markStorySeen(id: string): void {
  if (typeof window === "undefined") return
  try { localStorage.setItem(seenKey(id), String(Date.now())) } catch {}
}

/** 안 본 활동이 있나(활동 링 점등 여부). */
export function hasNewActivity(id: string, activityMs: number | undefined): boolean {
  return !!activityMs && activityMs > getStorySeen(id)
}
