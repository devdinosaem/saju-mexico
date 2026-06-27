"use client"
import SectionCard from "./SectionCard"
import { INVENTORY_KEY, DEFAULT_INVENTORY, type UserInventory } from "@/lib/inventory"
import { WISHLIST_KEY } from "@/lib/wishlist"
import { STORAGE_KEY as ROOM_KEY } from "@/app/v3/my/_components/MiniRoom"
import { BALANCE_MOCK_KEY } from "@/lib/balance"
import { FRIENDS_KEY } from "@/lib/friends"

const AUTH_KEY = "saju-mock-user"
const AUTH_EVENT = "saju-auth-change"

function setAuth(loggedIn: boolean, provider: "kakao" | "naver" | null, name?: string, gender?: "M" | "F") {
  if (!loggedIn) {
    localStorage.removeItem(AUTH_KEY)
  } else {
    const bd = name ? {
      name,
      year: "1990", month: "04", day: "23",
      hour: "자시", minute: "00", ampm: "AM" as const,
      gender: gender ?? "M",
    } : null
    localStorage.setItem(AUTH_KEY, JSON.stringify({ loggedIn: true, provider, birthDate: bd }))
  }
  window.dispatchEvent(new Event(AUTH_EVENT))
}

function setInventory(inv: Partial<UserInventory>) {
  const next = { ...DEFAULT_INVENTORY, ...inv }
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event("saju-inventory-change"))
}

function setBalance(val: number) {
  localStorage.setItem(BALANCE_MOCK_KEY, String(val))
  window.dispatchEvent(new Event("saju-balance-change"))
}

function clearWishlist() {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify([]))
}

function clearHiddenFriends() {
  // 친구 단일 저장소 초기화 + 시드 마커 제거 → 다음 로드 시 샘플 재시드(테스트 환경 한정)
  localStorage.removeItem(FRIENDS_KEY)
  localStorage.removeItem("saju-sample-friends-seeded")
  localStorage.removeItem("saju-test-hidden-friends") // 레거시 키 정리
  window.dispatchEvent(new Event("saju-custom-friends-change"))
}

type Preset = {
  label: string
  desc: string
  color: string
  apply: () => void
}

const PRESETS: Preset[] = [
  {
    label: "신규 비로그인",
    desc: "로그아웃 · 사주 없음 · 명태 0",
    color: "#F1F5F9",
    apply: () => {
      setAuth(false, null)
      setInventory({ iljuKey: "경진-m", isSubscribed: false, ownedStickers: [], ownedSkins: [], ownedCharacters: [] })
      setBalance(0)
      clearWishlist()
      clearHiddenFriends()
    },
  },
  {
    label: "신규 로그인",
    desc: "카카오 로그인 · 사주 없음 · 명태 0",
    color: "#FEF9C3",
    apply: () => {
      setAuth(true, "kakao")
      setInventory({ iljuKey: "경진-m", isSubscribed: false, ownedStickers: [], ownedSkins: [], ownedCharacters: [] })
      setBalance(0)
      clearWishlist()
      clearHiddenFriends()
    },
  },
  {
    label: "사주 등록 직후",
    desc: "로그인 · 사주 있음 · 명태 0",
    color: "#FFF7ED",
    apply: () => {
      setAuth(true, "kakao", "경진", "M")
      setInventory({ iljuKey: "경진-m", isSubscribed: false, ownedStickers: [], ownedSkins: [], ownedCharacters: [] })
      setBalance(0)
      clearWishlist()
      clearHiddenFriends()
    },
  },
  {
    label: "명태 부족",
    desc: "로그인 · 사주 있음 · 명태 0.05",
    color: "#FEF2F2",
    apply: () => {
      setAuth(true, "kakao", "경진", "M")
      setInventory({ iljuKey: "경진-m", isSubscribed: false, ownedStickers: [], ownedSkins: [], ownedCharacters: [] })
      setBalance(0.05)
      clearHiddenFriends()
    },
  },
  {
    label: "구독자",
    desc: "로그인 · 구독 중 · 명태 10 · 구독 전용 해금",
    color: "#F0FDF4",
    apply: () => {
      setAuth(true, "kakao", "경진", "M")
      setInventory({
        iljuKey: "경진-m",
        isSubscribed: true,
        ownedStickers: ["Crown"],
        ownedSkins: ["lemon"],
        ownedCharacters: [],
      })
      setBalance(10)
      clearHiddenFriends()
    },
  },
  {
    label: "파워유저",
    desc: "로그인 · 구독 · 명태 50 · 아이템 풀소유",
    color: "#EFF6FF",
    apply: () => {
      setAuth(true, "kakao", "경진", "M")
      setInventory({
        iljuKey: "경진-m",
        isSubscribed: true,
        ownedStickers: ["CrystalBall", "MagicWand", "Tarot", "Crystal", "Crown"],
        ownedSkins: ["pink", "blue", "lavender", "mint", "lemon", "ocean"],
        ownedCharacters: [],
      })
      setBalance(50)
      clearHiddenFriends()
    },
  },
  {
    label: "비구독 구매",
    desc: "로그인 · 비구독 · 소품 3개 · 스킨 1개",
    color: "#F5F3FF",
    apply: () => {
      setAuth(true, "naver", "경진", "M")
      setInventory({
        iljuKey: "경진-m",
        isSubscribed: false,
        ownedStickers: ["CrystalBall", "MagicWand", "Tarot"],
        ownedSkins: ["pink"],
        ownedCharacters: [],
      })
      setBalance(2.1)
      clearHiddenFriends()
    },
  },
]

export default function PresetSection() {
  return (
    <SectionCard title="프리셋 시나리오" emoji="⚡" defaultOpen={true}>
      <p className="text-[11px] text-text-muted">원클릭으로 상태 묶음을 세팅합니다. 적용 후 앱 탭을 새로고침하세요.</p>
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map(p => (
          <button
            key={p.label}
            onClick={p.apply}
            className="rounded-xl border border-charcoal/15 p-3 text-left active:scale-[0.97] transition-transform"
            style={{ background: p.color }}
          >
            <p className="text-[12px] font-black text-charcoal leading-tight">{p.label}</p>
            <p className="text-[10px] text-text-muted mt-0.5 leading-snug">{p.desc}</p>
          </button>
        ))}
      </div>
    </SectionCard>
  )
}
