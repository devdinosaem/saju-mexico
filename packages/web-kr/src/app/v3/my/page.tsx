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
import MonthCalendar from "./_components/MonthCalendar"
import WeeklyEnergyFlow from "./_components/WeeklyEnergyFlow"
import SajuInputSheet from "../shop/_components/SajuInputSheet"
import { PRICES, priceLabel } from "@/lib/prices"
import { ElementBadgePill } from "@/components/ilju-type-card"
import { DoodleHeart, DoodleSparkle, DoodleStar, DoodleMoon, DoodleCrystal, DoodleKey, DoodleMagicWand, DoodleCrown } from "@/components/doodles"
import AdBanner from "@/components/AdBanner"
import CTAButton from "@/components/cta-button"

const GAEGU: React.CSSProperties = {
  fontFamily: "'Cafe24Dongdong', var(--font-gaegu), cursive",
}

const BINGRAE: React.CSSProperties = {
  fontFamily: "'BinggraeTaom', sans-serif",
  fontWeight: 700,
}

const ELEM_BG: Record<string, string> = {
  "목(木)": "#D1FAE5",
  "화(火)": "#FEE2E2",
  "수(水)": "#DBEAFE",
  "금(金)": "#F1F5F9",
  "토(土)": "#FEF3C7",
}

type Category = "전체" | "운세" | "요약" | "상세" | "궁합" | "월운"

const COLLECTION = [
  { icon: <DoodleStar className="w-5 h-5" />,    label: "운세",  count: "23", locked: false, bg: "bg-yellow-50"     },
  { icon: <DoodleSparkle className="w-5 h-5" />, label: "요약",  count: "✓",  locked: false, bg: "bg-pink-light/40" },
  { icon: <DoodleCrystal className="w-5 h-5" />, label: "상세",  count: "🔒", locked: true,  bg: "bg-charcoal/5"    },
  { icon: <DoodleHeart className="w-5 h-5" />,   label: "궁합",  count: "0",  locked: false, bg: "bg-pink-light/40" },
  { icon: <DoodleMoon className="w-5 h-5" />,    label: "월운",  count: "🔒", locked: true,  bg: "bg-charcoal/5"    },
]

const PURCHASED = [
  { emoji: "⭐", title: "오늘의 사주",        sub: "일일 에너지 흐름 진단",        cat: "운세" as Category, date: "오늘",    owned: true  },
  { emoji: "📅", title: "월운 캘린더",        sub: "6월 길일·흉일 지도",           cat: "월운" as Category, date: "이번달",  owned: true  },
  { emoji: "🌿", title: "엄마 궁합 리포트",   sub: "목(木) ↑ 금(金) · 91%",       cat: "궁합" as Category, date: "3일 전",  owned: true  },
  { emoji: "✦",  title: "경진일주 요약",      sub: "나의 일주 핵심 성격 분석",      cat: "요약" as Category, date: "7일 전",  owned: true  },
  { emoji: "🔮", title: "경진일주 상세 리포트", sub: "심층 분석 · 990운기",         cat: "상세" as Category, date: "",       owned: false },
]

const CATS: Category[] = ["전체", "운세", "요약", "상세", "궁합", "월운"]

const FRIENDS = [
  { name: "엄마",  element: "목(木)", compat: 91, emoji: "🌱" },
  { name: "남친",  element: "화(火)", compat: 87, emoji: "🔥" },
  { name: "친구",  element: "수(水)", compat: 34, emoji: "💧" },
]

export default function MyPage() {
  const [activeCat, setActiveCat] = useState<Category>("전체")
  const [editOpen, setEditOpen] = useState(false)
  const { user, isLoggedIn } = useUser()
  const filtered = PURCHASED.filter(p => activeCat === "전체" || p.cat === activeCat)

  return (
    <div className="flex flex-col gap-4">
      {/* 프로필 히어로 (공유 시 카드 시트 오픈) */}
      <MyHero onEdit={() => setEditOpen(true)} />

      {/* 내 명태 (잔액 + 충전 + 내역) */}
      <MyongtaeCard />

      {/* 오늘의 사주 (일일 운세 위젯) */}
      <OhneulSajuCard />

      {/* 내 명식 (사주팔자 + 오행 분포) */}
      <MyMyeongsikCard onEdit={() => setEditOpen(true)} />

      {/* 내 보관함 */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="font-bold text-charcoal text-sm">📁 내 보관함</p>
          <span className="text-[11px] text-text-muted">구매 4 · 미구매 2</span>
        </div>

        {/* 카테고리 카드 */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-4 px-4 mb-3 scrollbar-hide">
          {COLLECTION.map((item, i) => (
            <button
              key={i}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border min-w-[72px] shrink-0 transition-all active:scale-95 ${
                item.locked
                  ? "bg-charcoal/5 border-charcoal/10 opacity-50"
                  : `${item.bg} border-charcoal/10`
              }`}
            >
              <span className="leading-none">{item.icon}</span>
              <span className={`text-sm font-bold leading-none ${item.locked ? "text-text-muted" : "text-charcoal"}`}>
                {item.count}
              </span>
              <span className="text-[11px] text-text-muted">{item.label}</span>
            </button>
          ))}
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-3">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-bold transition-all active:scale-95 ${
                activeCat === cat
                  ? "bg-charcoal text-cream"
                  : "bg-charcoal/8 text-text-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 구매 목록 */}
        <div className="rounded-2xl bg-white border border-charcoal/10 overflow-hidden">
          {filtered.map((item, i) => (
            <button
              key={item.title}
              className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-charcoal/5 transition-colors text-left ${
                i < filtered.length - 1 ? "border-b border-charcoal/5" : ""
              } ${!item.owned ? "opacity-50" : ""}`}
            >
              <span className="text-xl w-8 text-center shrink-0">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-charcoal truncate">{item.title}</p>
                <p className="text-[11px] text-text-muted truncate">{item.sub}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {item.owned ? (
                  <>
                    <span className="text-[10px] text-text-muted">{item.date}</span>
                    <span className="text-text-muted text-xs">›</span>
                  </>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink/10 text-pink font-bold">구매하기</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 월운 캘린더 */}
      <div>
        <p className="font-bold text-charcoal text-sm mb-2.5">📅 월운 캘린더</p>
        <MonthCalendar />
      </div>

      {/* 내 지인 */}
      <div>
        <p className="text-[22px] leading-snug text-charcoal mb-2.5" style={BINGRAE}>
          내 지인, <span className="highlight-pink">오늘 기운은?</span>
        </p>
        <div
          className="rounded-2xl bg-white border-2 border-charcoal px-4 py-4 flex flex-col gap-4"
          style={{ boxShadow: "2px 2px 0px #2D2D2D" }}
        >
          <div className="flex justify-between items-end">
            {FRIENDS.map(f => (
              <button key={f.name} className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
                <div
                  className="w-[52px] h-[52px] rounded-full border-2 border-charcoal/20 flex items-center justify-center text-2xl"
                  style={{ background: ELEM_BG[f.element] }}
                >
                  {f.emoji}
                </div>
                <p className="text-[11px] font-bold text-charcoal">{f.name}</p>
                <ElementBadgePill element={f.element} />
              </button>
            ))}
            <button className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
              <div className="w-[52px] h-[52px] rounded-full border-2 border-dashed border-charcoal/30 bg-charcoal/5 flex items-center justify-center text-xl text-charcoal/30">
                +
              </div>
              <p className="text-[11px] text-text-muted">추가</p>
            </button>
          </div>

          <div className="w-full border-t border-charcoal/10" />

          <div className="flex items-center gap-2">
            <div
              className="w-[28px] h-[28px] rounded-full border-2 border-charcoal/15 flex items-center justify-center text-sm shrink-0"
              style={{ background: ELEM_BG["목(木)"] }}
            >
              🌱
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
              <span className="text-[12px] font-bold text-green-700">엄마와 오늘 궁합 91%</span>
            </div>
            <span className="text-[11px] text-text-muted ml-auto shrink-0">목(木)↑</span>
          </div>
        </div>

        <CTAButton className="mt-2.5">
          <DoodleMagicWand className="w-5 h-5 shrink-0" />
          친구랑 무료 궁합 보기
          <DoodleMagicWand className="w-5 h-5 shrink-0" />
        </CTAButton>
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
              ₩2,900/월
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

      {/* 이번 주 에너지 흐름 (운기달력에서 이전) */}
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
