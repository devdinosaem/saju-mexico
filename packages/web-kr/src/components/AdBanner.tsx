"use client"
import { useEffect, useRef } from "react"

declare global {
  interface Window { adsbygoogle: unknown[] }
}

type Props = {
  slot: string
  className?: string
  format?: "auto" | "rectangle" | "horizontal"
}

export default function AdBanner({ slot, className = "", format = "auto" }: Props) {
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [])

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}
