"use client"
import { signInWithKakao } from "@/lib/supabase/auth"
import { isSupabaseConfigured } from "@/lib/supabase/client"

type Props = {
  open: boolean
  onClose: () => void
  onSuccess: (provider: "kakao" | "naver") => void
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="#3C1E1E">
      <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.748 1.655 5.17 4.17 6.655L5.1 21l5.03-3.31c.61.09 1.23.14 1.87.14 5.523 0 10-3.477 10-7.8S17.523 3 12 3z" />
    </svg>
  )
}

function NaverIcon() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="white">
      <path d="M13.53 12.24L9.87 6H6v12h4.47V11.76L14.13 18H18V6h-4.47z" />
    </svg>
  )
}

export default function LoginSheet({ open, onClose, onSuccess }: Props) {

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-[480px] bg-cream rounded-t-3xl border-t-2 border-x-2 border-charcoal"
        onClick={e => e.stopPropagation()}
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        {/* 드래그 핸들 */}
        <div className="w-10 h-1 rounded-full bg-charcoal/20 mx-auto mt-3 mb-2" />

        <div className="px-5 pt-3 pb-4 flex flex-col gap-6">

          {/* 헤더 */}
          <div className="flex flex-col gap-1">
            <p
              className="text-[22px] font-bold text-charcoal"
              style={{ fontFamily: "'BinggraeTaom', sans-serif" }}
            >
              내 사주TI 시작하기 ✦
            </p>
            <p className="text-[13px] text-text-muted">
              로그인하면 사주카드 저장하고 언제든 다시 볼 수 있어
            </p>
          </div>

          {/* 로그인 버튼들 */}
          <div className="flex flex-col gap-3">

            {/* 카카오 — Supabase 설정 시 실제 OAuth, 아니면 mock */}
            <button
              onClick={() => isSupabaseConfigured ? signInWithKakao(window.location.pathname) : onSuccess("kakao")}
              className="w-full h-[54px] rounded-2xl flex items-center justify-center gap-2.5 active:opacity-85 transition-opacity border-2 border-charcoal font-bold text-[15px]"
              style={{ background: "#FEE500", color: "#3C1E1E" }}
            >
              <KakaoIcon />
              카카오로 시작하기
            </button>

            {/* 네이버 */}
            <button
              onClick={() => onSuccess("naver")}
              className="w-full h-[54px] rounded-2xl flex items-center justify-center gap-2.5 active:opacity-85 transition-opacity border-2 border-charcoal font-bold text-[15px] text-white"
              style={{ background: "#03C75A" }}
            >
              <NaverIcon />
              네이버로 시작하기
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}
