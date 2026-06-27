import type { PlacedSticker } from "../../my/_components/MiniRoom"
import {
  FaceJisu,
  FaceMinjun,
  FaceHaeun,
  FaceJunho,
  FaceAreum,
} from "../../my/_components/StoryRow"

export type Elem = "목" | "화" | "토" | "금" | "수"

export type FaceComponent = typeof FaceJisu

export type FriendRoom = {
  name: string
  elem: Elem
  Face: FaceComponent
  bg: string
  ring: string
  stickers: PlacedSticker[]
  charPos: { x: number; y: number }
}

export const ELEM_RING: Record<Elem, string> = {
  목: "linear-gradient(135deg, #4ADE80, #86EFAC)",
  화: "linear-gradient(135deg, #F87171, #FCA5A5)",
  토: "linear-gradient(135deg, #FBBF24, #FDE68A)",
  금: "linear-gradient(135deg, #94A3B8, #CBD5E1)",
  수: "linear-gradient(135deg, #60A5FA, #93C5FD)",
}

export const FRIEND_ROOMS: FriendRoom[] = [
  {
    name: "지수",
    elem: "목",
    Face: FaceJisu,
    bg: "#D1FAE5",
    ring: ELEM_RING["목"],
    stickers: [
      { id: "f1-1", name: "Tulip", x: 20, y: 55, rotate: -8,  scale: 0.9 },
      { id: "f1-2", name: "Rose",  x: 72, y: 70, rotate: 5,   scale: 0.85 },
      { id: "f1-3", name: "Vase",  x: 83, y: 52, rotate: 0,   scale: 0.8 },
    ],
    charPos: { x: 55, y: 62 },
  },
  {
    name: "민준",
    elem: "화",
    Face: FaceMinjun,
    bg: "#FEE2E2",
    ring: ELEM_RING["화"],
    stickers: [
      { id: "f2-1", name: "Vinyl",      x: 18, y: 60, rotate: -5,  scale: 0.9 },
      { id: "f2-2", name: "Headphones", x: 75, y: 72, rotate: 8,   scale: 0.85 },
      { id: "f2-3", name: "Cassette",   x: 30, y: 72, rotate: 12,  scale: 0.8 },
    ],
    charPos: { x: 60, y: 64 },
  },
  {
    name: "하은",
    elem: "수",
    Face: FaceHaeun,
    bg: "#DBEAFE",
    ring: ELEM_RING["수"],
    stickers: [
      { id: "f3-1", name: "Moon",    x: 78, y: 20, rotate: 0,   scale: 0.8 },
      { id: "f3-2", name: "Crystal", x: 22, y: 68, rotate: -10, scale: 0.85 },
      { id: "f3-3", name: "Candle",  x: 70, y: 65, rotate: 5,   scale: 0.8 },
    ],
    charPos: { x: 50, y: 63 },
  },
  {
    name: "준호",
    elem: "토",
    Face: FaceJunho,
    bg: "#FEF3C7",
    ring: ELEM_RING["토"],
    stickers: [
      { id: "f4-1", name: "Sofa",   x: 72, y: 68, rotate: 0,  scale: 1 },
      { id: "f4-2", name: "Plant",  x: 20, y: 58, rotate: -5, scale: 0.9 },
      { id: "f4-3", name: "Coffee", x: 35, y: 72, rotate: 8,  scale: 0.75 },
    ],
    charPos: { x: 58, y: 63 },
  },
  {
    name: "아름",
    elem: "화",
    Face: FaceAreum,
    bg: "#FCE7F3",
    ring: ELEM_RING["화"],
    stickers: [
      { id: "f5-1", name: "Heart",   x: 80, y: 18, rotate: 10, scale: 0.75 },
      { id: "f5-2", name: "Crown",   x: 20, y: 22, rotate: -5, scale: 0.7 },
      { id: "f5-3", name: "Balloon", x: 68, y: 65, rotate: 5,  scale: 0.85 },
    ],
    charPos: { x: 48, y: 62 },
  },
]
