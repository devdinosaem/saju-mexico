"use client"
import { useState } from "react"
import SajuInputSheet from "@/app/v3/shop/_components/SajuInputSheet"
import { calcIlju } from "@/lib/ilju-calc"
import { saveMockIlju } from "@/lib/mockAuth"

const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }

/**
 * 생일 미등록 시 게이트 — 폴백(가짜 생일) 대신 실제 생일을 받는다.
 * SajuInputSheet가 birthDate를 저장(saveMockBirthDate) → UserContext bd 갱신 → 펀널 재렌더.
 * 일주도 함께 계산해 둠(온보딩 일관).
 */
export default function BirthGate({ title = "생일을 알려주면 펼쳐볼 수 있어요" }: { title?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-24 text-center px-6">
      <span className="text-5xl">🎂</span>
      <p className="text-[17px] text-charcoal" style={BINGGRAE}>{title}</p>
      <p className="text-[13px] text-text-muted leading-snug" style={GAEGU}>생년월일시를 입력하면 네 사주로 분석해줄게.</p>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-2xl text-cream text-[15px] border-2 border-charcoal active:opacity-85"
        style={{ background: "#E84B6A", boxShadow: "2px 2px 0px #2D2D2D", ...BINGGRAE }}
      >
        생일 입력하기
      </button>
      <SajuInputSheet
        open={open}
        onClose={() => setOpen(false)}
        title="생년월일을 알려줘 ✦"
        submitLabel="저장하기"
        onSuccess={(bd) => {
          // birthDate는 SajuInputSheet가 저장. 일주도 함께 세팅.
          const ij = calcIlju(bd.year, bd.month, bd.day, bd.gender)
          saveMockIlju(ij.id)
          setOpen(false)
        }}
      />
    </div>
  )
}
