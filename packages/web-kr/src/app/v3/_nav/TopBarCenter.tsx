"use client"
import { usePathname } from "next/navigation"

/** 상단바 정중앙 텍스트 로고 — /v3/shop 에서만 노출 */
export default function TopBarCenter() {
  const pathname = usePathname()
  if (pathname !== "/v3/shop") return null

  return (
    <span
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[20px] leading-none text-charcoal tracking-tight pointer-events-none select-none"
      style={{ fontFamily: "'Cafe24Meongi', sans-serif" }}
    >
      SAJU
      {/* PLAY — 오행 플라워 로고 색상에 맞춤 */}
      <span style={{ color: "#EF4444" }}>P</span>
      <span style={{ color: "#60A5FA" }}>L</span>
      <span style={{ color: "#4ADE80" }}>A</span>
      <span style={{ color: "#FACC15" }}>Y</span>
    </span>
  )
}
