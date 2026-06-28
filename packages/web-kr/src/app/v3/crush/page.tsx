"use client"
import CrushFunnel from "@/lib/saju-play/crush/core"
import { ONESIDED_CONFIG } from "@/lib/saju-play/crush/onesided"

export default function CrushPage() {
  return <CrushFunnel config={ONESIDED_CONFIG} />
}
