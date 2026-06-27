"use client"
import { useEffect, useState } from "react"
import SectionCard from "./SectionCard"
import { getMockUser, saveMockBirthDate, MOCK_AUTH_EVENT, type MockBirthDate } from "@/lib/mockAuth"
import { loadInventory, saveInventory } from "@/lib/inventory"

const ILJU_LIST = [
  "갑자","갑술","갑신","갑오","갑진","갑인",
  "을축","을해","을유","을미","을사","을묘",
  "병인","병자","병술","병신","병오","병진",
  "정묘","정축","정해","정유","정미","정사",
  "무진","무인","무자","무술","무신","무오",
  "기사","기묘","기축","기해","기유","기미",
  "경오","경진","경인","경자","경술","경신",
  "신미","신사","신묘","신축","신해","신유",
  "임신","임오","임진","임인","임자","임술",
  "계유","계미","계사","계묘","계축","계해",
]

const HOURS = ["자시(0시)","축시(2시)","인시(4시)","묘시(6시)","진시(8시)","사시(10시)","오시(12시)","미시(14시)","신시(16시)","유시(18시)","술시(20시)","해시(22시)"]

const DEFAULT_BD: MockBirthDate = {
  name: "경진",
  year: "1990", month: "04", day: "23",
  hour: "자시", minute: "00", ampm: "AM",
  gender: "M",
}

export default function SajuSection() {
  const [hasBirth, setHasBirth] = useState(false)
  const [bd, setBd] = useState<MockBirthDate>(DEFAULT_BD)
  const [iljuMode, setIljuMode] = useState<"auto" | "manual">("auto")
  const [selectedIlju, setSelectedIlju] = useState("경진")
  const [selectedGender, setSelectedGender] = useState<"M" | "F">("M")

  useEffect(() => {
    const sync = () => {
      const u = getMockUser()
      setHasBirth(!!u.birthDate)
      if (u.birthDate) setBd(u.birthDate)
    }
    sync()
    window.addEventListener(MOCK_AUTH_EVENT, sync)
    return () => window.removeEventListener(MOCK_AUTH_EVENT, sync)
  }, [])

  const applyBirthDate = () => {
    saveMockBirthDate(bd)
    setHasBirth(true)
  }

  const removeBirthDate = () => {
    const u = getMockUser()
    localStorage.setItem("saju-mock-user", JSON.stringify({ ...u, birthDate: null }))
    window.dispatchEvent(new Event(MOCK_AUTH_EVENT))
    setHasBirth(false)
  }

  const applyManualIlju = () => {
    const key = `${selectedIlju}-${selectedGender === "M" ? "m" : "f"}`
    const inv = loadInventory()
    saveInventory({ ...inv, iljuKey: key })
    window.dispatchEvent(new Event("saju-inventory-change"))
    const mockBd: MockBirthDate = {
      name: selectedGender === "M" ? "테스터M" : "테스터F",
      year: "1990", month: "01", day: "01",
      hour: "자시", minute: "00", ampm: "AM",
      gender: selectedGender,
    }
    saveMockBirthDate(mockBd)
    setHasBirth(true)
  }

  const inv = typeof window !== "undefined" ? loadInventory() : null

  return (
    <SectionCard title="사주 / 일주" emoji="🌙">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-bold text-charcoal">
          사주 등록: <span className={hasBirth ? "text-green-600" : "text-text-muted"}>{hasBirth ? "있음" : "없음"}</span>
        </p>
        {hasBirth && (
          <button
            onClick={removeBirthDate}
            className="text-[11px] text-red-400 border border-red-200 rounded-full px-3 py-1 active:opacity-70"
          >
            사주 제거
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {(["auto", "manual"] as const).map(m => (
          <button
            key={m}
            onClick={() => setIljuMode(m)}
            className={`flex-1 py-2 rounded-xl text-[12px] font-bold border-2 active:opacity-70 transition-opacity ${
              iljuMode === m ? "bg-charcoal text-cream border-charcoal" : "bg-white text-charcoal border-charcoal/20"
            }`}
          >
            {m === "auto" ? "생년월일 입력" : "일주 직접 선택"}
          </button>
        ))}
      </div>

      {iljuMode === "auto" ? (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-text-muted">이름</label>
              <input
                className="w-full mt-0.5 border-2 border-charcoal/20 rounded-xl px-3 py-2 text-[13px] text-charcoal bg-white"
                value={bd.name}
                onChange={e => setBd(p => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-[10px] text-text-muted">성별</label>
              <div className="flex gap-2 mt-1">
                {(["M", "F"] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => setBd(p => ({ ...p, gender: g }))}
                    className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold border-2 ${
                      bd.gender === g ? "bg-charcoal text-cream border-charcoal" : "bg-white text-charcoal border-charcoal/20"
                    }`}
                  >
                    {g === "M" ? "남" : "여"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "년도", key: "year", placeholder: "1990" },
              { label: "월", key: "month", placeholder: "04" },
              { label: "일", key: "day", placeholder: "23" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-[10px] text-text-muted">{f.label}</label>
                <input
                  className="w-full mt-0.5 border-2 border-charcoal/20 rounded-xl px-3 py-2 text-[13px] text-charcoal bg-white"
                  placeholder={f.placeholder}
                  value={(bd as Record<string, string>)[f.key]}
                  onChange={e => setBd(p => ({ ...p, [f.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="text-[10px] text-text-muted">태어난 시</label>
            <select
              className="w-full mt-0.5 border-2 border-charcoal/20 rounded-xl px-3 py-2 text-[13px] text-charcoal bg-white"
              value={bd.hour}
              onChange={e => setBd(p => ({ ...p, hour: e.target.value }))}
            >
              {HOURS.map(h => (
                <option key={h} value={h.split("(")[0]}>{h}</option>
              ))}
            </select>
          </div>
          <button
            onClick={applyBirthDate}
            className="w-full py-2.5 rounded-xl bg-charcoal text-cream text-[13px] font-bold active:opacity-70"
          >
            사주 등록 적용
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-[10px] text-text-muted">일주 선택 (60종)</label>
            <select
              className="w-full mt-0.5 border-2 border-charcoal/20 rounded-xl px-3 py-2 text-[13px] text-charcoal bg-white"
              value={selectedIlju}
              onChange={e => setSelectedIlju(e.target.value)}
            >
              {ILJU_LIST.map(ij => (
                <option key={ij} value={ij}>{ij}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-text-muted">성별</label>
            <div className="flex gap-2 mt-1">
              {(["M", "F"] as const).map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`flex-1 py-2 rounded-xl text-[12px] font-bold border-2 ${
                    selectedGender === g ? "bg-charcoal text-cream border-charcoal" : "bg-white text-charcoal border-charcoal/20"
                  }`}
                >
                  {g === "M" ? "남성" : "여성"}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-2">
            <p className="text-[12px] font-bold text-charcoal">
              선택: {selectedIlju}-{selectedGender === "M" ? "m" : "f"}
            </p>
            {inv && (
              <p className="text-[11px] text-text-muted mt-0.5">현재 인벤토리 일주: {inv.iljuKey}</p>
            )}
          </div>
          <button
            onClick={applyManualIlju}
            className="w-full py-2.5 rounded-xl bg-charcoal text-cream text-[13px] font-bold active:opacity-70"
          >
            일주 적용
          </button>
        </div>
      )}
    </SectionCard>
  )
}
