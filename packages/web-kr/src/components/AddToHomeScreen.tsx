"use client"
import { useEffect, useState } from "react"

// beforeinstallprompt 이벤트 타입 (표준 미포함 — 최소 정의)
type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

/**
 * 홈 화면 바로가기 등록(PWA 설치).
 * - Android/데스크톱 Chrome: beforeinstallprompt 캡처 → 버튼 클릭 시 네이티브 설치 프롬프트.
 * - iOS Safari / 프롬프트 미지원: 수동 안내 시트.
 * - 이미 설치(standalone)면 렌더 안 함.
 */
export default function AddToHomeScreen() {
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [isIos, setIsIos] = useState(false)

  useEffect(() => {
    const nav = window.navigator as Navigator & { standalone?: boolean }
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true
    setInstalled(standalone)
    setIsIos(/iphone|ipad|ipod/i.test(nav.userAgent) && !/crios|fxios/i.test(nav.userAgent))

    const onPrompt = (e: Event) => {
      e.preventDefault()
      setDeferred(e as InstallPromptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferred(null)
    }
    window.addEventListener("beforeinstallprompt", onPrompt)
    window.addEventListener("appinstalled", onInstalled)
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt)
      window.removeEventListener("appinstalled", onInstalled)
    }
  }, [])

  if (installed) return null

  const onClick = async () => {
    if (deferred) {
      await deferred.prompt()
      await deferred.userChoice
      setDeferred(null)
      return
    }
    setShowHelp(true) // iOS 또는 프롬프트 미준비 → 수동 안내
  }

  return (
    <>
      <button
        onClick={onClick}
        className="w-full rounded-2xl bg-white border-2 border-charcoal p-3.5 flex items-center gap-3 active:opacity-80 transition-opacity text-left"
        style={{ boxShadow: "2px 2px 0px #2D2D2D" }}
      >
        <div className="w-10 h-10 rounded-xl bg-pink-light/60 border border-charcoal/10 flex items-center justify-center text-xl shrink-0">
          📲
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-charcoal">홈 화면에 추가</p>
          <p className="text-[11px] text-text-muted mt-0.5 leading-tight">
            앱처럼 바로 실행 — 한 번 등록해두면 편해요
          </p>
        </div>
        <span className="text-charcoal/30 text-lg shrink-0">＋</span>
      </button>

      {showHelp && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="w-full max-w-[480px] bg-white rounded-t-3xl border-t-2 border-charcoal px-5 pt-5 pb-8 flex flex-col gap-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-charcoal/15 mx-auto mb-1" />
            <p className="text-[17px] font-bold text-charcoal">홈 화면에 추가하기</p>
            {isIos ? (
              <ol className="flex flex-col gap-2 text-[14px] text-charcoal/80 leading-snug">
                <li>1. 사파리 하단의 <b>공유 버튼</b>(▢↑)을 눌러요.</li>
                <li>2. 메뉴에서 <b>‘홈 화면에 추가’</b>를 선택해요.</li>
                <li>3. <b>‘추가’</b>를 누르면 끝!</li>
              </ol>
            ) : (
              <ol className="flex flex-col gap-2 text-[14px] text-charcoal/80 leading-snug">
                <li>1. 브라우저 <b>메뉴(⋮)</b>를 열어요.</li>
                <li>2. <b>‘홈 화면에 추가’</b> 또는 <b>‘앱 설치’</b>를 선택해요.</li>
                <li>3. 안내에 따라 추가하면 끝!</li>
              </ol>
            )}
            <button
              onClick={() => setShowHelp(false)}
              className="mt-2 w-full py-3 rounded-2xl bg-charcoal text-cream text-sm font-bold active:opacity-80"
            >
              알겠어요
            </button>
          </div>
        </div>
      )}
    </>
  )
}
