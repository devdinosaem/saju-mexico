"use client"
// ════════════════════════════════════════════════════════════════
// 마이페이지 v2 — 디자인 검토용 목업 (별도 페이지, /v3/my 는 그대로 보존)
//
// 목적: 흩어진 13개 카드를 "나 · 오늘 · 기록 · 계정" 4-Zone 으로 재구성하고,
//       시간축 운세(오늘/주/월)를 세그먼트 위젯 1개로 통합한 정보구조를 눈으로 검토.
//
// 방침
//  · 콘텐츠 카드는 기존 컴포넌트를 재활용(실데이터) → 재구성/통합 효과를 그대로 확인.
//  · 새 골격(Zone 구분·세그먼트·접이식 명식·placeholder 상태)만 새로 작성.
//  · 위계는 룩으로: Zone 2(운세)에만 시그니처 그라디언트, 나머지는 흰 카드·파스텔.
//  · placeholder(구독·알림·계정)는 제거하지 않고 "예정" 상태 + 탭 피드백으로 유지.
// ════════════════════════════════════════════════════════════════
import { useState } from "react"
import Link from "next/link"
import { logoutMockUser, saveMockIlju } from "@/lib/mockAuth"
import { calcIlju } from "@/lib/ilju-calc"
import { useUser } from "@/lib/UserContext"
import { FONT } from "@/lib/ds"
import { Ico } from "@/components/ds"
import {
  DoodleSmiley, DoodleBook, DoodleHeart, DoodleSun, DoodleCalendar,
  DoodleGiftBox, DoodleCrown, DoodleJingleBell, DoodleKey, DoodlePencil,
  DoodleSparkle, DoodleBookshelf, DoodleStar, DoodleTaegeuk,
} from "@/components/doodles"

import MyHero from "../_components/MyHero"
import MyMyeongsikCard from "../_components/MyMyeongsikCard"
import OhneulSajuCard from "../_components/OhneulSajuCard"
import WeeklyEnergyFlow from "../_components/WeeklyEnergyFlow"
import MonthCalendar from "../_components/MonthCalendar"
import MyongtaeCard from "../_components/MyongtaeCard"
import SajuInputSheet from "../../shop/_components/SajuInputSheet"

// ── Zone 구분 라벨 ────────────────────────────────────────────────
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

// ── 운세 세그먼트 토글 ────────────────────────────────────────────
const SEGMENTS = [
  { key: "today", label: "오늘", icon: DoodleSun },
  { key: "week", label: "이번주", icon: DoodleStar },
  { key: "month", label: "이번달", icon: DoodleCalendar },
] as const
type SegKey = typeof SEGMENTS[number]["key"]

export default function MyV2MockPage() {
  const { user, isLoggedIn } = useUser()
  const [editOpen, setEditOpen] = useState(false)
  const [myeongsikOpen, setMyeongsikOpen] = useState(false)
  const [seg, setSeg] = useState<SegKey>("today")
  const [toast, setToast] = useState<string | null>(null)

  const ping = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 1600)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 목업 안내 배너 */}
      <div className="rounded-xl bg-charcoal/5 border border-dashed border-charcoal/15 px-3 py-2 flex items-center gap-2">
        <span className="text-[11px] font-bold text-charcoal/70">v2 목업 · 디자인 검토용</span>
        <Link href="/v3/my" className="ml-auto text-[11px] font-bold text-pink active:opacity-60">현재 버전 보기 →</Link>
      </div>

      {/* ════ ZONE 1 · 나 (정체성) ════════════════════════════════ */}
      <ZoneLabel icon={DoodleSmiley} n={1} title="나" />

      {/* 정체성 한 덩어리: 프로필 + (접이식) 명식 + 사용설명서 동선 */}
      <div className="rounded-[var(--r-lg)] bg-white border border-charcoal/10 px-4 py-4 flex flex-col gap-3">
        <MyHero onEdit={() => setEditOpen(true)} />

        {/* 접이식 명식 — 정체성과 같은 카드 안에서 펼쳐짐(분산 해소) */}
        <button
          onClick={() => setMyeongsikOpen(v => !v)}
          className="flex items-center gap-2 pt-3 border-t border-charcoal/8 active:opacity-60"
        >
          <Ico as={DoodleTaegeuk} size={16} />
          <span className="text-[13px] font-bold text-charcoal">내 명식 (사주팔자 · 오행)</span>
          <span className={`ml-auto text-charcoal/40 text-[12px] transition-transform ${myeongsikOpen ? "rotate-180" : ""}`}>▾</span>
        </button>
        {myeongsikOpen && (
          <div className="-mt-1">
            <MyMyeongsikCard onEdit={() => setEditOpen(true)} />
          </div>
        )}

        {/* 깊이 동선 — 막다른 명식에서 사용설명서로 */}
        <Link
          href="/v3/self"
          className="rounded-2xl bg-pink-soft px-4 py-3 flex items-center gap-3 active:opacity-85 transition-opacity"
          style={{ border: "1px solid var(--love-line)" }}
        >
          <Ico as={DoodleBook} size={22} />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-charcoal">내 사용설명서 보기</p>
            <p className="text-[11px] text-text-muted mt-0.5">내 성격·연애·돈·기질 깊이 풀이</p>
          </div>
          <span className="text-pink text-xs">›</span>
        </Link>
      </div>

      {/* ════ ZONE 2 · 오늘의 나 (최상위 위계 — 시그니처 그라디언트) ════ */}
      <ZoneLabel icon={DoodleSun} n={2} title="오늘의 나" />

      <div
        className="rounded-[var(--r-xl)] px-3.5 py-3.5 flex flex-col gap-3"
        style={{ background: "var(--grad-pink-surface)", border: "1px solid var(--love-line)" }}
      >
        {/* 세그먼트 토글 — 흩어진 일/주/월을 한 자리에서 전환 */}
        <div className="flex gap-1 p-1 rounded-full bg-white/70 border border-charcoal/8">
          {SEGMENTS.map(s => {
            const active = seg === s.key
            return (
              <button
                key={s.key}
                onClick={() => setSeg(s.key)}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-full text-[13px] font-bold transition-colors ${
                  active ? "bg-pink text-cream" : "text-charcoal/55"
                }`}
              >
                <Ico as={s.icon} size={14} /> {s.label}
              </button>
            )
          })}
        </div>

        {/* 선택된 시간축 운세 */}
        <div>
          {seg === "today" && <OhneulSajuCard />}
          {seg === "week" && <WeeklyEnergyFlow />}
          {seg === "month" && <MonthCalendar />}
        </div>

        {/* 출석 체크 — 데일리 행동을 운세 확인과 같은 Zone에 묶음 */}
        <button
          onClick={() => ping("출석 체크 — 곧 만나요 ✦")}
          className="w-full rounded-2xl bg-white border border-charcoal/10 px-4 py-3 flex items-center gap-3 active:opacity-85"
        >
          <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--warn-bg)" }}>
            <Ico as={DoodleGiftBox} size={22} />
          </span>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-[14px] font-bold text-charcoal">출석 체크</p>
            <p className="text-[11px] text-text-muted mt-0.5">매일 들러 명태 받기 · 연속 보너스</p>
          </div>
          <span className="text-[12px] font-bold text-pink shrink-0">받기</span>
        </button>
      </div>

      {/* ════ ZONE 3 · 내 기록 ═══════════════════════════════════ */}
      <ZoneLabel icon={DoodleBookshelf} n={3} title="내 기록" />

      <div className="grid grid-cols-2 gap-2.5">
        <Link href="/v3/my/archive" className="rounded-[var(--r-lg)] bg-white border border-charcoal/10 p-4 flex flex-col gap-2 active:opacity-90">
          <span className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "var(--love-bg)" }}>
            <Ico as={DoodleBook} size={24} />
          </span>
          <div>
            <p className="text-[14px] font-bold text-charcoal">사주 보관함</p>
            <p className="text-[11px] text-text-muted mt-0.5 leading-tight">내가 본 분석 모아보기</p>
          </div>
        </Link>
        <Link href="/v3/my/people" className="rounded-[var(--r-lg)] bg-white border border-charcoal/10 p-4 flex flex-col gap-2 active:opacity-90">
          <span className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "var(--special-bg)" }}>
            <Ico as={DoodleHeart} size={24} />
          </span>
          <div>
            <p className="text-[14px] font-bold text-charcoal">사주 볼 사람들</p>
            <p className="text-[11px] text-text-muted mt-0.5 leading-tight">저장한 생일 · 재입력 없이</p>
          </div>
        </Link>
      </div>

      {/* ════ ZONE 4 · 계정 · 명태 ═══════════════════════════════ */}
      <ZoneLabel icon={DoodleCrown} n={4} title="계정 · 명태" />

      <MyongtaeCard />

      {/* 설정 — 동작하는 것/예정인 것을 한 카드에. 예정은 "준비중" 상태 + 탭 피드백 */}
      <div className="rounded-[var(--r-lg)] bg-white border border-charcoal/10 overflow-hidden divide-y divide-charcoal/8">
        <SettingRow icon={DoodleCrown} label="구독 관리" sub="모든 기능 무제한" soon onTap={() => ping("구독 관리 — 곧 만나요 ✦")} />
        <SettingRow icon={DoodleJingleBell} label="알림 설정" sub="매일 아침 7시 운세 푸시" soon onTap={() => ping("알림 설정 — 곧 만나요 ✦")} />
        <SettingRow icon={DoodleKey} label="계정 설정" sub="프로필 · 정보 수정" soon onTap={() => ping("계정 설정 — 곧 만나요 ✦")} />
        <SettingRow icon={DoodlePencil} label="명식 정보 수정" sub="생년월일 · 시간" onTap={() => setEditOpen(true)} />
      </div>

      {/* 로그아웃 */}
      <button
        onClick={logoutMockUser}
        className="w-full py-3 text-[13px] text-charcoal/40 font-medium active:opacity-50"
      >
        {isLoggedIn ? "로그아웃" : "로그인 안 됨"}
      </button>

      {/* 명식 정보 수정 시트 — 저장 시 일주 재계산 */}
      <SajuInputSheet
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialData={user.birthDate ?? undefined}
        title={user.birthDate ? "내 명식 정보 수정 ✦" : "생년월일을 알려줘 ✦"}
        submitLabel={user.birthDate ? "저장하기" : undefined}
        onSuccess={(bd) => {
          const ij = calcIlju(bd.year, bd.month, bd.day, bd.gender)
          saveMockIlju(ij.id)
        }}
      />

      {/* placeholder 탭 피드백 토스트 */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-24 z-[60] px-4 py-2.5 rounded-full bg-charcoal text-cream text-[13px] font-bold shadow-lg flex items-center gap-1.5">
          <Ico as={DoodleSparkle} size={15} /> {toast}
        </div>
      )}
    </div>
  )
}

// ── 설정 행 ──────────────────────────────────────────────────────
function SettingRow({
  icon, label, sub, soon, onTap,
}: {
  icon: React.FC<{ className?: string }>; label: string; sub: string; soon?: boolean; onTap: () => void
}) {
  return (
    <button onClick={onTap} className="w-full px-4 py-3.5 flex items-center gap-3 active:bg-charcoal/[0.03] transition-colors text-left">
      <span className="w-9 h-9 rounded-xl bg-charcoal/5 flex items-center justify-center shrink-0">
        <Ico as={icon} size={18} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-charcoal flex items-center gap-1.5">
          {label}
          {soon && <span className="text-[10px] font-bold text-warn-ink px-1.5 py-0.5 rounded-full" style={{ background: "var(--warn-bg)" }}>준비중</span>}
        </p>
        <p className="text-[11px] text-text-muted mt-0.5">{sub}</p>
      </div>
      <span className="text-charcoal/30 text-xs shrink-0">›</span>
    </button>
  )
}
