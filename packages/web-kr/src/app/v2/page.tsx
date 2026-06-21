"use client";

import { useState } from "react";
import "./v2.css";

export default function V2LandingPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="v2-wrap">

        {/* ═══ 1. HERO — 다크 + 그린 포인트 ═══ */}
        <section className="v2-slide v2-grad-1 v2-blob-1 v2-checker">
          <div className="relative text-center max-w-[380px]">
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-10">
              ✦ 사주TI ✦
            </p>

            <h1 className="v2-giant mb-3">
              MBTI는
              <br />
              <span className="v2-outline">16</span>개
            </h1>

            <p className="text-white/30 text-sm mb-3">근데</p>

            <h2 className="v2-giant">
              사주TI는
              <br />
              <span className="text-[#1DB954]">120</span>개
            </h2>

            <p className="text-white/30 text-sm mt-10 leading-relaxed">
              기분 따라 바뀌지 않는
              <br />
              태어난 순간이 정한 진짜 나
            </p>
          </div>

          <div className="v2-scroll-hint text-white/30 text-xs flex flex-col items-center gap-1">
            <span>↓</span>
          </div>
          <div className="v2-footer text-white">사주TI · SAJUTI.COM</div>
        </section>

        {/* ═══ 2. 캐릭터 카드 — 핑크→퍼플 그래디언트 ═══ */}
        <section className="v2-slide v2-grad-2 v2-blob-2">
          <div className="relative text-center max-w-[380px]">
            <p className="text-white/60 text-xs tracking-widest mb-4">나의 일주(日柱)가 말해주는</p>

            <h2 className="v2-giant mb-8">
              이게
              <br />
              진짜 나
            </h2>

            {/* 공유용 카드 */}
            <div className="v2-share-card bg-[#111] text-white mx-auto v2-blob-3">
              <div className="relative">
                <p className="text-[#1DB954] text-[10px] font-bold tracking-[0.2em]">庚辰 · 경진일주</p>
              </div>

              <div className="relative text-left">
                <span className="text-4xl mb-2 block">🛡️</span>
                <h3 className="v2-giant !text-[2.5rem] !leading-none">
                  인간
                  <br />
                  탱크
                </h3>
              </div>

              <div className="relative">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="v2-tag bg-[#1DB954]/20 text-[#1DB954] text-[10px]">✓ 결단력</span>
                  <span className="v2-tag bg-[#1DB954]/20 text-[#1DB954] text-[10px]">✓ 리더십</span>
                  <span className="v2-tag bg-[#1DB954]/20 text-[#1DB954] text-[10px]">✓ 책임감</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="v2-tag bg-white/10 text-white/50 text-[10px]">✗ 고집</span>
                  <span className="v2-tag bg-white/10 text-white/50 text-[10px]">✗ 융통성 부족</span>
                </div>

                <div className="flex justify-between items-end mt-4 pt-3 border-t border-white/10 text-[10px] text-white/40">
                  <div>
                    <p className="text-white/20">오행</p>
                    <p className="text-white/60 font-bold">금(金) · 양</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/20">유형</p>
                    <p className="text-white/60 font-bold">120개 중 #47</p>
                  </div>
                </div>
              </div>

              <p className="relative text-[8px] text-white/20 text-center tracking-[0.15em] uppercase">
                사주TI · sajuti.com
              </p>
            </div>

            <p className="text-white/50 text-xs mt-5">↑ 캡처해서 스토리에 올려봐</p>
          </div>
          <div className="v2-footer text-white">사주TI · SAJUTI.COM</div>
        </section>

        {/* ═══ 3. 유형 캐러셀 — 다크 ═══ */}
        <section className="v2-slide v2-grad-3 v2-blob-1 !justify-start !pt-16">
          <div className="relative w-full max-w-[440px]">
            <p className="text-white/30 text-xs text-center tracking-widest mb-2">120개 유형 중 일부</p>
            <h2 className="v2-medium text-center mb-8">
              나는 어떤 유형일까
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x" style={{ scrollbarWidth: "none" }}>
              {[
                {
                  emoji: "🌸", hanja: "乙卯", name: "감성\n예술가",
                  grad: "linear-gradient(150deg, #8B5CF6, #C026D3, #E84B6A)",
                  strengths: ["창의력", "공감력", "직관"], weaknesses: ["우유부단"],
                  quote: "느낌으로 해결함",
                  stat: { element: "목(木) · 음", rank: "#12" },
                },
                {
                  emoji: "🔥", hanja: "壬午", name: "자유\n영혼",
                  grad: "linear-gradient(150deg, #EF4444, #FB923C, #FACC15)",
                  strengths: ["열정", "모험심", "적응력"], weaknesses: ["충동적"],
                  quote: "Plan F까지 있음",
                  stat: { element: "수(水) · 양", rank: "#33" },
                },
                {
                  emoji: "⛰️", hanja: "戊辰", name: "인간\n중장비",
                  grad: "linear-gradient(150deg, #1DB954, #15803D, #0f172a)",
                  strengths: ["안정감", "끈기", "신뢰"], weaknesses: ["느린 결정"],
                  quote: "나는 전진해",
                  stat: { element: "토(土) · 양", rank: "#28" },
                },
                {
                  emoji: "💎", hanja: "辛酉", name: "고독한\n보석",
                  grad: "linear-gradient(150deg, #6366F1, #3B82F6, #0EA5E9)",
                  strengths: ["완벽주의", "분석력"], weaknesses: ["까다로움"],
                  quote: "타협? 그게 뭔데",
                  stat: { element: "금(金) · 음", rank: "#58" },
                },
              ].map((card) => (
                <div
                  key={card.hanja}
                  className="v2-share-card text-white shrink-0 snap-center"
                  style={{ background: card.grad, maxWidth: 220, aspectRatio: "9/15" }}
                >
                  <div>
                    <p className="text-[9px] font-bold opacity-50 tracking-[0.2em]">{card.hanja}</p>
                  </div>
                  <div>
                    <span className="text-3xl block mb-2">{card.emoji}</span>
                    <h3 className="v2-big whitespace-pre-line !text-[1.6rem]">{card.name}</h3>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {card.strengths.map((s) => (
                        <span key={s} className="v2-tag bg-white/15 text-white text-[9px]">✓ {s}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {card.weaknesses.map((w) => (
                        <span key={w} className="v2-tag bg-black/20 text-white/60 text-[9px]">✗ {w}</span>
                      ))}
                    </div>
                    <p className="text-[10px] opacity-40 mt-2 italic">&ldquo;{card.quote}&rdquo;</p>

                    <div className="flex justify-between mt-3 pt-2 border-t border-white/10 text-[9px] text-white/40">
                      <span>{card.stat.element}</span>
                      <span>{card.stat.rank}</span>
                    </div>
                  </div>
                  <p className="text-[7px] text-white/20 text-center tracking-[0.15em] uppercase">사주TI</p>
                </div>
              ))}
            </div>
          </div>
          <div className="v2-footer text-white">사주TI · SAJUTI.COM</div>
        </section>

        {/* ═══ 4. 리포트 미리보기 — 웜 그래디언트 ═══ */}
        <section className="v2-slide v2-grad-4 v2-blob-2">
          <div className="relative text-center max-w-[380px]">
            <p className="text-white/50 text-xs tracking-widest mb-4">사주TI 풀 리포트</p>

            <h2 className="v2-big mb-8">
              성격 말고
              <br />
              <span className="v2-outline">운</span>까지
            </h2>

            {/* 넘버링 리스트 (Wrapped 스타일) */}
            <div className="text-left space-y-3 mb-6">
              {[
                { n: 1, icon: "🪞", title: "나의 본질", sub: "일주가 말하는 진짜 성격", open: true },
                { n: 2, icon: "💕", title: "연애운", sub: "끌리는 유형, 인연의 시기", open: false },
                { n: 3, icon: "💰", title: "재물운", sub: "돈이 들어오는 패턴", open: false },
                { n: 4, icon: "🌊", title: "대운 타임라인", sub: "10년 주기 인생 그래프", open: false },
                { n: 5, icon: "🎯", title: "용신 가이드", sub: "나를 살리는 색·방위·음식", open: false },
              ].map((item) => (
                <div
                  key={item.n}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 ${item.open ? "bg-white/20 backdrop-blur" : "bg-white/8"}`}
                >
                  <span className="v2-rank text-white/80">{item.n}</span>
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className={`text-xs ${item.open ? "text-white/60" : "text-white/30 v2-blur"}`}>{item.sub}</p>
                  </div>
                  {!item.open && <span className="text-xs text-white/30">🔒</span>}
                </div>
              ))}
            </div>

            <p className="text-white/40 text-xs">
              + 직업운 · 건강운 · 올해 운세 · 궁합 · 신살
              <br />
              총 14개 섹션 · 15,000자+
            </p>

            {/* 스탯 바 */}
            <div className="v2-stat-bar text-[10px] mt-6">
              <div className="text-center">
                <p className="text-white/30">섹션</p>
                <p className="font-bold text-sm">14개</p>
              </div>
              <div className="text-center">
                <p className="text-white/30">분석량</p>
                <p className="font-bold text-sm">15,000자+</p>
              </div>
              <div className="text-center">
                <p className="text-white/30">소요시간</p>
                <p className="font-bold text-sm">10초</p>
              </div>
            </div>
          </div>
          <div className="v2-footer text-white">사주TI · SAJUTI.COM</div>
        </section>

        {/* ═══ 5. 유명인 — 그린 그래디언트 ═══ */}
        <section className="v2-slide v2-grad-5 v2-blob-3">
          <div className="relative text-center max-w-[380px]">
            <p className="text-[#111]/30 text-xs tracking-widest mb-4">같은 일주 유명인</p>

            <h2 className="v2-big mb-10">
              이 사람도
              <br />
              나랑 같은 유형?!
            </h2>

            <div className="text-left space-y-3">
              {[
                { n: 1, emoji: "🎤", name: "아이유", ilju: "乙卯", type: "감성 예술가" },
                { n: 2, emoji: "⚽", name: "손흥민", ilju: "庚寅", type: "금속 전사" },
                { n: 3, emoji: "🎬", name: "마동석", ilju: "戊辰", type: "인간 중장비" },
              ].map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3 bg-[#111]/80 backdrop-blur rounded-xl px-4 py-3 text-white"
                >
                  <span className="v2-rank text-[#1DB954]">{c.n}</span>
                  <span className="text-2xl">{c.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{c.name}</p>
                    <p className="text-white/40 text-xs">{c.ilju}</p>
                  </div>
                  <span className="v2-tag bg-[#1DB954] text-[#111] text-[10px]">{c.type}</span>
                </div>
              ))}
            </div>

            <p className="text-[#111]/40 text-sm mt-8">
              나랑 같은 유명인은 누구?
            </p>

            <div className="v2-stat-bar v2-stat-bar-dark text-[10px] mt-6 text-[#111]">
              <div className="text-center">
                <p className="opacity-30">전체 유형</p>
                <p className="font-bold text-sm">120개</p>
              </div>
              <div className="text-center">
                <p className="opacity-30">등록 유명인</p>
                <p className="font-bold text-sm">200+명</p>
              </div>
            </div>
          </div>
          <div className="v2-footer text-[#111]">사주TI · SAJUTI.COM</div>
        </section>

        {/* ═══ 6. 후기 — 퍼플 그래디언트 ═══ */}
        <section className="v2-slide v2-grad-6 v2-blob-1">
          <div className="relative text-center max-w-[380px]">
            <h2 className="v2-big mb-10">
              해본 사람들의
              <br />
              <span className="v2-outline">솔직</span> 후기
            </h2>

            <div className="space-y-3 text-left">
              {[
                { n: 1, text: "MBTI보다 소름... 이게 진짜 나", who: "28세 · 직장인" },
                { n: 2, text: "캡처해서 스토리 올렸더니 난리ㅋㅋ", who: "24세 · 대학생" },
                { n: 3, text: "남친이랑 궁합 봤는데 찐이었음", who: "26세 · 회사원" },
              ].map((r) => (
                <div key={r.n} className="flex items-start gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-4">
                  <span className="v2-rank text-[#FACC15] mt-0.5">{r.n}</span>
                  <div>
                    <p className="text-[#FACC15] text-[10px] mb-1">★★★★★</p>
                    <p className="font-bold text-sm leading-snug">&ldquo;{r.text}&rdquo;</p>
                    <p className="text-white/40 text-xs mt-1">— {r.who}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="v2-footer text-white">사주TI · SAJUTI.COM</div>
        </section>

        {/* ═══ 7. CTA — 웜 그래디언트 ═══ */}
        <section className="v2-slide v2-grad-7 v2-blob-2">
          <div className="relative text-center max-w-[380px]">
            <p className="text-[#111]/30 text-sm mb-6 tracking-widest">10초면 끝</p>

            <h2 className="v2-giant mb-4">
              내 유형
              <br />
              확인하기
            </h2>

            <p className="text-[#111]/50 text-sm mb-10 leading-relaxed">
              생년월일시만 입력하면
              <br />
              120개 중 내 사주TI를 알려줄게
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="bg-[#111] text-white font-bold text-lg px-10 py-5 rounded-full active:scale-95 transition-transform shadow-2xl"
            >
              ✦ 시작하기 ✦
            </button>

            <p className="text-[#111]/30 text-xs mt-4">무료 · 회원가입 없음</p>

            <div className="v2-stat-bar v2-stat-bar-dark text-[10px] mt-8 text-[#111]">
              <div className="text-center">
                <p className="opacity-30">유형</p>
                <p className="font-bold text-sm">120개</p>
              </div>
              <div className="text-center">
                <p className="opacity-30">분석</p>
                <p className="font-bold text-sm">14섹션</p>
              </div>
              <div className="text-center">
                <p className="opacity-30">비용</p>
                <p className="font-bold text-sm">무료</p>
              </div>
            </div>
          </div>
          <div className="v2-footer text-[#111]">사주TI · SAJUTI.COM</div>
        </section>

      </div>

      {/* ═══ 바텀시트 ═══ */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
          onClick={() => setShowForm(false)}
        >
          <div
            className="w-full max-w-[440px] bg-[#111] text-white rounded-t-3xl p-6"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "v2-slide-up 0.3s ease-out" }}
          >
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />
            <h3 className="font-bold text-xl text-center mb-6">내 사주TI 확인하기</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/50 block mb-1">이름</label>
                <input type="text" placeholder="홍길동" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1DB954]" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "년", ph: "1995" },
                  { label: "월", ph: "3" },
                  { label: "일", ph: "15" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-white/50 block mb-1">{f.label}</label>
                    <input type="number" placeholder={f.ph} className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1DB954]" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "시", ph: "14" },
                  { label: "분", ph: "30" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-white/50 block mb-1">{f.label}</label>
                    <input type="number" placeholder={f.ph} className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1DB954]" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/50 block mb-1">성별</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white/10 border border-white/20 rounded-xl py-3 text-sm font-semibold hover:bg-[#1DB954]/20 hover:border-[#1DB954] transition-colors">남성</button>
                  <button className="bg-white/10 border border-white/20 rounded-xl py-3 text-sm font-semibold hover:bg-[#1DB954]/20 hover:border-[#1DB954] transition-colors">여성</button>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#1DB954] text-[#111] font-bold text-base py-4 rounded-full mt-6 active:scale-[0.98] transition-transform">
              ✦ 확인하기 ✦
            </button>
            <p className="text-center text-white/30 text-xs mt-3 mb-2">
              태어난 시간 모르면 비워도 괜찮아요
            </p>
          </div>
        </div>
      )}
    </>
  );
}
