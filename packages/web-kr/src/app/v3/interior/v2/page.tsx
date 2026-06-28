"use client"
// ════════════════════════════════════════════════════════════════
// 운테리어 v2 — 디자인 검토용 목업 (별도 페이지, /v3/interior 는 그대로 보존)
//
// 목적: 흩어진 구성(친구 스토리 → 내 방 → 방의기운 3시안 → 방명록 → 보관함 → 친구방문)을
//       "① 내 미니홈피  ② 친구" 2-Zone 으로 재구성.
//
// 핵심 재구성
//  · 방의 기운 "시안 1/2/3"(Strip·Mini·Chips) 동시 3겹 노출 → 1개(가장 완성도 높은 시안2)로 통합.
//  · 숨어있던 "방 꾸미기"(미니홈피 우하단 작은 연필) → 명시적 CTA 로 승격.
//  · 운테리어 탭의 주인공인 "내 방"을 최상단·최상위 위계(그라디언트 프레임)로.
//  · 흩어진 친구 동선(상단 스토리 + 하단 방문 리스트)을 한 Zone 으로 묶음.
//
// 방침: 콘텐츠 카드는 기존 컴포넌트 재활용(실데이터), 새 골격(Zone·CTA·통합)만 새로 작성.
// ════════════════════════════════════════════════════════════════
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FONT } from "@/lib/ds"
import { Ico } from "@/components/ds"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { useFriends } from "@/hooks/useFriends"
import { useInventory } from "@/hooks/useInventory"
import { canAccess, itemAccess, STICKER_ACCESS, CHARACTER_ACCESS } from "@/lib/inventory"
import {
  DoodleHeart, DoodleSparkle, DoodleCrown, DoodleMoon,
  DoodlePencil, DoodleSpeechBubble, DoodleSmiley,
} from "@/components/doodles"

import MiniRoom, { RoomCanvas, SKINS } from "../../my/_components/MiniRoom"
import StoryRow from "../../my/_components/StoryRow"
import FriendRequests from "../_components/FriendRequests"
import RoomElementMini from "../_components/RoomElementMini"

// ── 오행 색 (친구 카드 링/배경) ──────────────────────────────────
const STEM_TO_ELEM: Record<string, "목" | "화" | "토" | "금" | "수"> = {
  갑: "목", 을: "목", 병: "화", 정: "화", 무: "토", 기: "토", 경: "금", 신: "금", 임: "수", 계: "수",
}
const ELEM_BG_MAP: Record<string, string> = { 목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#E2E8F0", 수: "#DBEAFE" }
const ELEM_RING: Record<string, string> = {
  목: "linear-gradient(135deg, #4ADE80, #86EFAC)",
  화: "linear-gradient(135deg, #F87171, #FCA5A5)",
  토: "linear-gradient(135deg, #FBBF24, #FDE68A)",
  금: "linear-gradient(135deg, #94A3B8, #CBD5E1)",
  수: "linear-gradient(135deg, #60A5FA, #93C5FD)",
}
function cfColors(iljuKey: string) {
  const elem = STEM_TO_ELEM[iljuKey[0]] ?? "토"
  return { bg: ELEM_BG_MAP[elem], ring: ELEM_RING[elem] }
}

const ALL_STICKER_KEYS = [
  "Chair","Sofa","Lamp","Mirror","Clock","Candle","Pillow","Basket",
  "Plant","Cactus","Tulip","Rose","Sunflower","Vase",
  "CrystalBall","MagicWand","Tarot","Crystal",
  "Star","Heart","Moon","Sparkle","Crown","Balloon","Rainbow",
  "Vinyl","Cassette","Headphones","BubbleTea","Coffee","Matcha",
]

// ── Zone 구분 라벨 (마이 v2 와 동일 패턴) ────────────────────────
function ZoneLabel({ icon, n, title }: { icon: React.FC<{ className?: string }>; n: number; title: string }) {
  return (
    <div className="flex items-center gap-2 px-0.5 pt-1">
      <span className="w-6 h-6 rounded-full bg-pink/10 flex items-center justify-center shrink-0">
        <Ico as={icon} size={14} />
      </span>
      <span className="text-[12px] font-bold text-text-muted tracking-wide">ZONE {n}</span>
      <span className="text-[15px] text-charcoal" style={FONT.title}>{title}</span>
      <div className="flex-1 h-px bg-charcoal/8" />
    </div>
  )
}

export default function InteriorV2MockPage() {
  const router = useRouter()
  const inv = useInventory()
  const { friends } = useFriends()
  const [toast, setToast] = useState<string | null>(null)

  const ping = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 1600)
  }

  const stickerCount = ALL_STICKER_KEYS.filter(k => canAccess(k, itemAccess(k, STICKER_ACCESS), "sticker", inv)).length
  const skinCount = SKINS.filter(s => canAccess(s.id, s.access, "skin", inv)).length
  const charCount = Object.keys(ILJU_SVG_ICONS).filter(k => canAccess(k, itemAccess(k, CHARACTER_ACCESS), "character", inv)).length

  const storage = [
    { icon: DoodleSparkle, bg: "var(--love-bg)", name: "소품", count: stickerCount, type: "props" },
    { icon: DoodleCrown, bg: "var(--special-bg)", name: "캐릭터", count: charCount, type: "characters" },
    { icon: DoodleMoon, bg: "var(--info-bg)", name: "스킨", count: skinCount, type: "skins" },
  ]

  return (
    <div className="flex flex-col gap-3">
      {/* 목업 안내 배너 */}
      <div className="rounded-xl bg-charcoal/5 border border-dashed border-charcoal/15 px-3 py-2 flex items-center gap-2">
        <span className="text-[11px] font-bold text-charcoal/70">v2 목업 · 디자인 검토용</span>
        <Link href="/v3/interior" className="ml-auto text-[11px] font-bold text-pink active:opacity-60">현재 버전 보기 →</Link>
      </div>

      {/* ════ 친구 스토리 + 요청 — 최상단 스트립 (익숙한 SNS 패턴) ════ */}
      {/* 친구 스토리 + 초대 */}
      <StoryRow onAdd={() => ping("친구 추가 — 곧 만나요 ✦")} />
      {/* 받은 친구 요청 — 요청 있을 때만 자체 렌더(없으면 null) */}
      <FriendRequests />

      {/* ════ ZONE 1 · 내 미니홈피 (최상위 위계 — 그라디언트 프레임) ════ */}
      <ZoneLabel icon={DoodleSmiley} n={1} title="내 미니홈피" />

      <div
        className="rounded-[var(--r-xl)] px-3.5 py-3.5 flex flex-col gap-3"
        style={{ background: "var(--grad-pink-surface)", border: "1px solid var(--love-line)" }}
      >
        {/* 내 방 캔버스 (탭→방명록, 우하단 연필→편집은 그대로) */}
        <MiniRoom />

        {/* 숨어있던 핵심 행동을 명시적 CTA 로 승격 */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => router.push("/v3/my/room")}
            className="rounded-2xl bg-pink text-cream px-4 py-3 flex items-center justify-center gap-1.5 active:opacity-85"
          >
            <span className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center shrink-0">
              <Ico as={DoodlePencil} size={13} />
            </span>
            <span className="text-[14px] font-bold">방 꾸미기</span>
          </button>
          <button
            onClick={() => router.push("/v3/my/room/guestbook")}
            className="rounded-2xl bg-white border border-charcoal/10 px-4 py-3 flex items-center justify-center gap-1.5 active:opacity-85"
          >
            <Ico as={DoodleSpeechBubble} size={18} />
            <span className="text-[14px] font-bold text-charcoal">방명록</span>
          </button>
        </div>

        {/* 방의 기운 — 3시안 중 1개만(시안2). ※자리 확정은 디자인 선택 */}
        <RoomElementMini />

        {/* 보관함 — 소품/캐릭터/스킨 */}
        <div className="grid grid-cols-3 gap-2">
          {storage.map(item => (
            <button
              key={item.name}
              onClick={() => router.push(`/v3/interior/inventory/${item.type}`)}
              className="rounded-2xl bg-white border border-charcoal/10 px-2.5 py-2.5 flex flex-col items-center gap-1 active:opacity-85"
            >
              <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: item.bg }}>
                <Ico as={item.icon} size={18} />
              </span>
              <span className="text-[12px] font-bold text-charcoal leading-tight">{item.name}</span>
              <span className="text-[10px] text-text-muted">{item.count}개 보유</span>
            </button>
          ))}
        </div>
      </div>

      {/* ════ ZONE 2 · 친구 미니홈피 방문 — 친구 있을 때만 생성(빈 상태 영역 없음) ════ */}
      {friends.length > 0 && (
        <>
        <ZoneLabel icon={DoodleHeart} n={2} title="친구 미니홈피" />
        <div className="flex flex-col gap-3">
          {friends.map(friend => {
            const colors = cfColors(friend.iljuKey)
            const svgFn = ILJU_SVG_ICONS[friend.iljuKey]
            return (
              <button
                key={friend.id}
                onClick={() => router.push(`/v3/interior/${friend.id}`)}
                className="w-full rounded-[var(--r-lg)] overflow-hidden border border-charcoal/10 active:opacity-90 text-left"
                style={{ height: 200 }}
              >
                <div className="relative w-full h-full">
                  <RoomCanvas
                    stickers={friend.room?.stickers ?? []}
                    charPos={friend.room?.charPos ?? { x: 50, y: 62 }}
                    chars={friend.room?.chars}
                    charIcon={svgFn ? <div className="w-full h-full">{svgFn()}</div> : undefined}
                  />
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                    <div className="p-[2px] rounded-full shrink-0" style={{ background: colors.ring }}>
                      <div className="w-[38px] h-[38px] rounded-full overflow-hidden flex items-center justify-center" style={{ background: colors.bg }}>
                        {svgFn ? <div className="w-full h-full">{svgFn(getIljuProfileViewBox(friend.iljuKey))}</div> : <span className="text-[13px] font-bold text-charcoal/50">{friend.name[0]}</span>}
                      </div>
                    </div>
                    <span className="text-[13px] text-charcoal" style={FONT.title}>{friend.name}</span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[10px] text-charcoal/60 bg-white/55 px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                    <Ico as={DoodleSpeechBubble} size={11} /> 방명록 남기기
                  </div>
                </div>
              </button>
            )
          })}
        </div>
        </>
      )}

      {/* placeholder 탭 피드백 토스트 */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-24 z-[60] px-4 py-2.5 rounded-full bg-charcoal text-cream text-[13px] font-bold shadow-lg flex items-center gap-1.5">
          <Ico as={DoodleSparkle} size={15} /> {toast}
        </div>
      )}
    </div>
  )
}
