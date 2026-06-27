"use client"
import { useLayoutEffect, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { DoodleMyeongtae } from "@/components/doodle-myeongtae"
import { getMockUser, loginMockUser, logoutMockUser, isBirthDateComplete } from "@/lib/mockAuth"
import { useUser } from "@/lib/UserContext"
import LoginSheet from "../shop/_components/LoginSheet"
import SajuInputSheet from "../shop/_components/SajuInputSheet"
import LoadingOverlay from "../shop/_components/LoadingOverlay"
import SajuRevealOverlay from "../shop/_components/SajuRevealOverlay"
import { IljuMarquee } from "../shop/_components/IljuDiscovery"

export default function TopBarRight() {
  const { user, isLoggedIn } = useUser()
  const [loginOpen, setLoginOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [revealOpen, setRevealOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => { setMounted(true) }, [])

  if (isLoggedIn) {
    return (
      <Link
        href="/v3/charge"
        className="flex items-center gap-1.5 bg-pink/10 rounded-full px-3 py-1.5 active:scale-95 transition-transform"
      >
        <DoodleMyeongtae className="w-4 h-6 shrink-0" />
        <span className="text-xs font-bold text-charcoal">5.2</span>
        <span className="text-[10px] text-text-muted font-bold">+</span>
      </Link>
    )
  }

  return (
    <>
      <button
        onClick={() => setLoginOpen(true)}
        className="flex items-center gap-1.5 bg-pink/10 rounded-full px-3 py-1.5 active:scale-95 transition-transform"
      >
        <span className="text-xs font-bold text-charcoal">로그인</span>
      </button>

      {/* fixed 헤더 안에 있으면 z-index가 헤더 스태킹 컨텍스트에 갇히므로 Portal로 body에 직접 마운트 */}
      {mounted && createPortal(
        <>
          <LoginSheet
            open={loginOpen}
            onClose={() => setLoginOpen(false)}
            onSuccess={(provider) => {
              loginMockUser(provider)
              setLoginOpen(false)
              const bd = getMockUser().birthDate
              if (!bd || !isBirthDateComplete(bd)) setTimeout(() => setSheetOpen(true), 400)
            }}
          />
          <SajuInputSheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            initialData={user.birthDate ?? undefined}
            onSuccess={() => setLoadingOpen(true)}
          />
        </>,
        document.body
      )}
      <LoadingOverlay
        open={loadingOpen}
        name={user.birthDate?.name ?? ""}
        onDone={() => { setLoadingOpen(false); setRevealOpen(true) }}
      >
        <IljuMarquee />
      </LoadingOverlay>
      {user.birthDate && (
        <SajuRevealOverlay
          open={revealOpen}
          birthDate={user.birthDate}
          onClose={() => setRevealOpen(false)}
          onRetry={() => {
            setRevealOpen(false)
            logoutMockUser()
            setTimeout(() => setSheetOpen(true), 300)
          }}
        />
      )}
    </>
  )
}
