"use client"
import React, { useState } from "react"
import { logoutMockUser, saveMockIlju } from "@/lib/mockAuth"
import { calcIlju } from "@/lib/ilju-calc"
import { useUser } from "@/lib/UserContext"
import MyHero from "./_components/MyHero"
import MyIljuCard from "./_components/MyIljuCard"
import MyongtaeCard from "./_components/MyongtaeCard"
import MyMyeongsikCard from "./_components/MyMyeongsikCard"
import OhneulSajuCard from "./_components/OhneulSajuCard"
import TodaySaju from "./_components/TodaySaju"
import MonthCalendar from "./_components/MonthCalendar"
import WeeklyEnergyFlow from "./_components/WeeklyEnergyFlow"
import SajuInputSheet from "../shop/_components/SajuInputSheet"
import { PRICES, priceLabel, subscriptionLabel } from "@/lib/prices"
import Link from "next/link"
import { DoodleHeart, DoodleCrown, DoodleBook } from "@/components/doodles"
import AdBanner from "@/components/AdBanner"
import AddToHomeScreen from "@/components/AddToHomeScreen"

const GAEGU: React.CSSProperties = {
  fontFamily: "'Cafe24Dongdong', var(--font-gaegu), cursive",
}

const BINGRAE: React.CSSProperties = {
  fontFamily: "'BinggraeTaom', sans-serif",
  fontWeight: 700,
}

export default function MyPage() {
  const [editOpen, setEditOpen] = useState(false)
  const { user, isLoggedIn } = useUser()

  return (
    <div className="flex flex-col gap-4">
      {/* 프로필 히어로 (공유 시 카드 시트 오픈) */}
      <MyHero onEdit={() => setEditOpen(true)} />

      {/* 내 명태 (잔액 + 충전 + 내역) */}
      <MyongtaeCard />

      {/* 오늘의 사주 (일일 운세 위젯) */}
      <OhneulSajuCard />

      {/* 오늘의 사주 상세 */}
      <TodaySaju />

      {/* 내 명식 (사주팔자 + 오행 분포) */}
      <MyMyeongsikCard onEdit={() => setEditOpen(true)} />

      {/* 사주 보관함 진입 */}
      <Link href="/v3/my/archive" className="rounded-2xl bg-white border border-charcoal/10 p-4 flex items-center gap-3 active:opacity-90 transition-opacity">
        <span className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "#FFF0F5" }}>
          <DoodleBook className="w-6 h-6" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-charcoal">사주 보관함</p>
          <p className="text-[11px] text-text-muted mt-0.5 leading-tight">나·신살·다음달·궁합… 내 분석 모아보기</p>
        </div>
        <span className="text-text-muted text-xs">›</span>
      </Link>

      {/* 사주 볼 사람들 진입 */}
      <Link href="/v3/my/people" className="rounded-2xl bg-white border border-charcoal/10 p-4 flex items-center gap-3 active:opacity-90 transition-opacity">
        <span className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "#EFEAFE" }}>
          <DoodleHeart className="w-6 h-6" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-charcoal">사주 볼 사람들</p>
          <p className="text-[11px] text-text-muted mt-0.5 leading-tight">가족·친구·연인 생일 저장 — 재입력 없이 또 보기</p>
        </div>
        <span className="text-text-muted text-xs">›</span>
      </Link>

      {/* 월운 캘린더 */}
      <div>
        <p className="font-bold text-charcoal text-sm mb-2.5">📅 월운 캘린더</p>
        <MonthCalendar />
      </div>

      {/* 운기 관리 */}
      <div>
        <p className="text-[22px] leading-snug text-charcoal mb-2.5" style={BINGRAE}>
          나의 <span className="highlight-pink">명태 관리</span>
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {/* 출석 체크 */}
          <button
            className="rounded-2xl bg-white border-2 border-charcoal p-3.5 flex flex-col gap-2 active:opacity-80 transition-opacity text-left"
            style={{ boxShadow: "2px 2px 0px #2D2D2D" }}
          >
            <div className="w-10 h-10 rounded-xl bg-pink-light/60 border border-charcoal/10 flex items-center justify-center text-xl">🎁</div>
            <div>
              <p className="text-xs font-bold text-charcoal">출석 체크</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-tight">연속 3일 · 오늘 {priceLabel(PRICES.attendanceReward)}</p>
            </div>
            <div className="mt-auto w-full py-1.5 rounded-xl bg-pink/10 text-pink text-[11px] font-bold text-center" style={GAEGU}>
              받기
            </div>
          </button>

          {/* 구독 관리 — 다크 카드 */}
          <button
            className="rounded-2xl bg-charcoal p-3.5 flex flex-col gap-2 active:opacity-80 transition-opacity text-left"
            style={{ boxShadow: "2px 2px 0px #2D2D2D" }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <DoodleCrown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-cream">구독 관리</p>
              <p className="text-[11px] text-cream/60 mt-0.5 leading-tight">모든 기능 무제한</p>
            </div>
            <div className="mt-auto w-full py-1.5 rounded-xl bg-pink text-cream text-[11px] font-bold text-center" style={GAEGU}>
              {subscriptionLabel()}
            </div>
          </button>

          {/* 알림 설정 */}
          <button
            className="rounded-2xl bg-white border-2 border-charcoal p-3.5 flex flex-col gap-2 active:opacity-80 transition-opacity text-left"
            style={{ boxShadow: "2px 2px 0px #2D2D2D" }}
          >
            <div className="w-10 h-10 rounded-xl bg-yellow-50 border border-charcoal/10 flex items-center justify-center text-xl">🔔</div>
            <div>
              <p className="text-xs font-bold text-charcoal">알림 설정</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-tight">매일 아침 7시</p>
            </div>
            <span className="mt-auto text-[10px] text-text-muted font-medium" style={GAEGU}>설정하기 ›</span>
          </button>

          {/* 계정 설정 */}
          <button
            className="rounded-2xl bg-white border-2 border-charcoal p-3.5 flex flex-col gap-2 active:opacity-80 transition-opacity text-left"
            style={{ boxShadow: "2px 2px 0px #2D2D2D" }}
          >
            <div className="w-10 h-10 rounded-xl bg-charcoal/5 border border-charcoal/10 flex items-center justify-center text-xl">⚙️</div>
            <div>
              <p className="text-xs font-bold text-charcoal">계정 설정</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-tight">프로필 · 정보 수정</p>
            </div>
            <span className="mt-auto text-[10px] text-text-muted font-medium" style={GAEGU}>설정하기 ›</span>
          </button>
        </div>
      </div>

      {/* 홈 화면 바로가기 등록 */}
      <AddToHomeScreen />

      {/* 이번 주 에너지 흐름 */}
      <WeeklyEnergyFlow />

      {/* 광고 배너 */}
      <div className="rounded-xl overflow-hidden">
        <AdBanner slot="3333333333" format="horizontal" />
      </div>

      {/* 로그아웃 */}
      <button
        onClick={logoutMockUser}
        className="w-full py-3 text-[13px] text-charcoal/40 font-medium active:opacity-50 transition-opacity"
      >
        {isLoggedIn ? "로그아웃" : "로그인 안 됨"}
      </button>

      {/* 명식 정보 수정 — 저장 시 일주 재계산 */}
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
    </div>
  )
}
