"use client"

import { SKINS, RoomCanvas } from "@/app/v3/my/_components/MiniRoom"

const SAMPLE_STICKERS = [
  { id: "s1", name: "Sofa",   x: 75, y: 62, rotate: 0, scale: 1 },
  { id: "s2", name: "Plant",  x: 22, y: 58, rotate: 0, scale: 0.9 },
  { id: "s3", name: "Clock",  x: 38, y: 22, rotate: 0, scale: 0.85 },
  { id: "s4", name: "Star",   x: 62, y: 18, rotate: 10, scale: 0.8 },
]
const CHAR_POS = { x: 65, y: 62, rotate: 0, scale: 1 }

export default function PreviewSkin() {
  return (
    <main className="min-h-screen bg-[#F0EDE8] py-8">
      <h1 className="text-lg font-bold text-center mb-1">미니홈피 스킨 목록</h1>
      <p className="text-xs text-center text-gray-500 mb-6">총 {SKINS.length}종 · 실제 고객 노출 비율</p>

      {/* 실제 앱과 동일한 컨테이너: max-w-[480px] px-4 */}
      <div className="max-w-[480px] mx-auto px-4 flex flex-col gap-6">
        {SKINS.map((skin) => (
          <div key={skin.id} className="flex flex-col gap-2">
            {/* 이름 */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-black/15" style={{ background: skin.preview }} />
              <p className="text-sm font-semibold text-gray-800">{skin.name}</p>
              <p className="text-xs text-gray-400">{skin.id}</p>
            </div>

            {/* 실제 앱과 동일한 방 비율: w-full h-[220px] rounded-2xl */}
            <div
              className="relative w-full rounded-2xl overflow-hidden border border-black/10 shadow-sm"
              style={{ height: 220 }}
            >
              <RoomCanvas stickers={SAMPLE_STICKERS} charPos={CHAR_POS} skin={skin} />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
