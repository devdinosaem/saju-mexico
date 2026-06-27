"use client";

import React from "react";
import { getIljuType } from "@/lib/ilju-types";
import { WOOD_CHARACTER_MAP } from "../characters-wood";
import { FIRE_CHARACTER_MAP } from "../characters-fire";
import { EARTH_CHARACTER_MAP } from "../characters-earth";
import { METAL_CHARACTER_MAP } from "../characters-metal";
import { WATER_CHARACTER_MAP } from "../characters-water";
import { HAIR_BATCH } from "../hair-batch";

const MAPS: Record<string, Record<string, React.ReactNode>> = {
  wood: WOOD_CHARACTER_MAP,
  fire: FIRE_CHARACTER_MAP,
  earth: EARTH_CHARACTER_MAP,
  metal: METAL_CHARACTER_MAP,
  water: WATER_CHARACTER_MAP,
};

export default function HairComparePage() {
  return (
    <main className="min-h-screen bg-[#FDF6EE] p-4">
      <h1 className="text-2xl font-bold text-center mb-1">{"남성 헤어 비포 / 애프터"}</h1>
      <p className="text-sm text-center text-gray-500 mb-8">
        {`1차 배치 ${HAIR_BATCH.length}종 · 애프터 = 라이브 카드 + 앞머리(fringe) 오버레이`}
      </p>

      <div className="max-w-[760px] mx-auto flex flex-col gap-6 pb-20">
        {HAIR_BATCH.map((item) => {
          const lookupId = item.baseId ?? item.id;
          const before = MAPS[item.element]?.[lookupId];
          const t = getIljuType(lookupId);
          if (!before) {
            return (
              <div key={item.id} className="text-center text-red-500 text-sm">
                {`⚠ ${item.id}: 라이브 카드를 찾을 수 없음`}
              </div>
            );
          }
          return (
            <div key={item.id} className="bg-white rounded-2xl border-2 border-[#2D2D2D]/10 p-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="font-mono font-bold text-sm">{item.id}</span>
                {t && <span className="text-sm">{t.emoji + " " + t.name}</span>}
                <span className="text-[11px] bg-indigo-100 text-indigo-600 rounded px-1.5 py-0.5 font-bold">
                  {"앞머리: " + item.style}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* BEFORE */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-bold text-gray-400 tracking-wide">{"BEFORE"}</span>
                  {before}
                </div>
                {/* AFTER = 풀 교체 노드 또는 라이브 카드 + 앞머리 오버레이 */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-bold text-indigo-500 tracking-wide">{"AFTER"}</span>
                  {item.after ? (
                    item.after
                  ) : (
                    <div className="relative w-full flex justify-center">
                      {before}
                      <svg
                        viewBox="0 0 80 90"
                        className="absolute top-6 left-1/2 -translate-x-1/2 w-[120px] h-[135px] pointer-events-none z-20"
                        fill="none"
                      >
                        {item.fringe}
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
