import { WOOD_CHARACTER_MAP } from "@/app/preview-ilju/characters-wood";
import { FIRE_CHARACTER_MAP } from "@/app/preview-ilju/characters-fire";
import { EARTH_CHARACTER_MAP } from "@/app/preview-ilju/characters-earth";
import { METAL_CHARACTER_MAP } from "@/app/preview-ilju/characters-metal";
import { WATER_CHARACTER_MAP } from "@/app/preview-ilju/characters-water";
import type React from "react";

/** 일주 ID → 두들 캐릭터 노드. 모든 120개 일주 포함. */
export const ILJU_CHARACTER_MAP: Record<string, React.ReactNode> = {
  ...WOOD_CHARACTER_MAP,
  ...FIRE_CHARACTER_MAP,
  ...EARTH_CHARACTER_MAP,
  ...METAL_CHARACTER_MAP,
  ...WATER_CHARACTER_MAP,
};

export { ILJU_SVG_ICONS } from "./ilju-svg-icons";
