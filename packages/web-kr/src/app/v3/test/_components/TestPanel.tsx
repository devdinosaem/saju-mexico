"use client"
import Link from "next/link"
import PresetSection from "./PresetSection"
import AuthSection from "./AuthSection"
import SajuSection from "./SajuSection"
import BalanceSection from "./BalanceSection"
import InventorySection from "./InventorySection"
import RoomSection from "./RoomSection"
import FriendsSection from "./FriendsSection"
import WishlistSection from "./WishlistSection"
import StorageViewer from "./StorageViewer"

function resetAll() {
  const KEYS = [
    "saju-mock-user", "saju-inventory-v1", "saju-wishlist-v1",
    "saju-miniroom-v1", "saju-guestbook-경진", "saju-balance-mock",
    "saju-custom-friends", "saju-sample-friends-seeded",
    "saju-test-hidden-friends", "saju-guestbook-경진-seen",
  ]
  KEYS.forEach(k => localStorage.removeItem(k))
  window.dispatchEvent(new Event("saju-auth-change"))
  window.dispatchEvent(new Event("saju-inventory-change"))
  window.dispatchEvent(new Event("saju-balance-change"))
  window.dispatchEvent(new Event("saju-custom-friends-change"))
}

export default function TestPanel() {
  return (
    <div className="flex flex-col gap-4 py-4">
      {/* 헤더 */}
      <div className="rounded-2xl border-2 border-yellow-400 bg-yellow-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[16px] font-black text-charcoal">🧪 테스트 컨트롤 패널</p>
            <p className="text-[11px] text-text-muted mt-0.5">개발 환경 전용 · 프로덕션 비노출</p>
          </div>
          <Link
            href="/v3/shop"
            className="text-[11px] font-bold text-charcoal border-2 border-charcoal rounded-full px-3 py-1.5 active:opacity-70"
            target="_blank"
          >
            앱 열기 →
          </Link>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={resetAll}
            className="flex-1 py-2 rounded-xl bg-red-50 text-red-500 text-[12px] font-bold border border-red-200 active:opacity-70"
          >
            전체 초기화 (localStorage 삭제)
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-white text-charcoal text-[12px] font-bold border border-charcoal/20 active:opacity-70"
          >
            새로고침
          </button>
        </div>
      </div>

      {/* 빠른 이동 */}
      <div className="flex flex-wrap gap-1.5">
        {[
          ["shop", "/v3/shop"],
          ["my", "/v3/my"],
          ["interior", "/v3/interior"],
          ["charge", "/v3/charge"],
          ["consult", "/v3/consult"],
          ["wishlist", "/v3/wishlist"],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="px-3 py-1 rounded-full text-[11px] font-bold border border-charcoal/20 bg-white text-charcoal active:opacity-70"
          >
            {label}
          </Link>
        ))}
      </div>

      <PresetSection />
      <AuthSection />
      <SajuSection />
      <BalanceSection />
      <InventorySection />
      <RoomSection />
      <FriendsSection />
      <WishlistSection />
      <StorageViewer />
    </div>
  )
}
