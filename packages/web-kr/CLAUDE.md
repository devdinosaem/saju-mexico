# web-kr — 사주TI 한국판 웹서비스

한국 시장 대상 사주 웹서비스. "바뀌지 않는 나의 사주 유형" 컨셉.
**웹 + 앱 (iOS/Android) 동시 서비스 — Capacitor로 네이티브 앱 패키징 예정.**

---

## 🚨 모바일 퍼스트 — 모든 작업에 적용되는 최우선 규칙

**이 프로젝트의 모든 화면, 컴포넌트, UI 기능은 반드시 모바일(375px) 기준으로 설계·구현한다.**

- 레이아웃, 여백, 폰트 크기, 터치 영역, 팝업·바텀시트·모달 — 전부 모바일 기준
- 데스크톱 대응은 고려하지 않는다 (Capacitor 앱 타겟이므로)
- 새 화면·컴포넌트 작업 전 반드시 스스로 확인: "이게 폰 화면에서 자연스러운가?"
- 팝업/모달은 full-width 바텀시트 형태가 기본. 가운데 띄우는 다이얼로그 금지
- 버튼 터치 영역 최소 44px (py 기준 `py-2.5` 이상)
- 텍스트는 `text-sm`(14px) 이상. 보조 텍스트는 `text-xs`(12px) 최소

### 페이지 배경색 — 반드시 `bg-cream` 통일

모든 페이지와 fixed 오버레이는 **`bg-cream` (`#FDF6EE`)**을 배경으로 사용한다.

```tsx
// ✅ 일반 페이지 — v3 layout이 자동으로 bg-cream 적용
// ✅ 표준 페이지
<div className="bg-cream">...</div>   // var(--bg-cream) = #FDF6EE

// ✅ 미니홈피 전용 (방 수정창·친구홈피창·방명록) — var(--bg-minihompi)
<div style={{ background: "var(--bg-minihompi)" }}>...</div>   // #FFFBF2

// ❌ 하드코딩 금지
style={{ background: "#E8E4DC" }}   // 어두운 베이지 — 사용 금지
style={{ background: "#F7F3EE" }}   // 중간 베이지 — 사용 금지
```

컴포넌트 내부의 카드·입력창·구분선 배경(`bg-white`, `#FFFBF2` 등)은 유지해도 된다. 페이지·오버레이 전체 배경만 통일.

### 한자 노출 정책 — 전역 제거 작업 대기 중

사용자는 web-kr 화면에서 **한자가 안 보이길** 원함(괄호 안 한자는 괄호째 삭제). 전역 적용은 **아직 안 했고 대기 상태**. 착수 요청("한자 제거하자") 시 아래대로 진행.

**재사용 로직 (검증 완료, consult에 적용됨):** `app/v3/consult/page.tsx`의 `stripHanjaSafe()` + `HANJA_MAP` + `isHanjaCp()`.
- ⚠️ **정규식에 리터럴 한자(`[㐀-鿿…]`) 절대 쓰지 말 것.** 소스 인코딩 불일치로 Edit 매칭이 깨지고 런타임도 불안정함(이번에 실제로 겪음). 반드시 `codePointAt` 숫자 범위(0x3400-0x9fff, 0xf900-0xfaff, 0x3005)로 판정.
- 동작: `한글(漢字)` → 괄호째 제거 / 단독 간지·오행 → 한글 독음 변환 / 매핑 없는 한자 → 제거.

**착수 1단계:** 위 로직을 `src/lib/hanja.ts`로 추출 → 공유 유틸화 → consult도 거기서 import.

**한자 렌더 지점 (`.hanja` 필드, 7개 파일):**
- 괄호형(괄호째 제거로 끝): `preview-ilju/page.tsx:165`, `result/[id]/page.tsx:241`, `v3/consult/page.tsx:104`(처리됨)
- 단독 라벨(★처리 방식 미결): `page.tsx:156`, `preview-ilju/page.tsx:44`, `purchase/[id]/page.tsx:56`, `report/[id]/page.tsx:131`, `result/[id]/page.tsx:72`, `components/ilju-type-card.tsx:179`. 데이터 할당은 `page.tsx:27`.

**착수 전 물을 것:** 단독 한자 라벨을 ①한글 독음 변환 ②아예 제거 ③파일별 맥락 판단 중 무엇으로 할지(괄호형은 어느 쪽이든 제거 동일).

### ⚠️ 가로 레이아웃 이탈 절대 금지 — globals.css 전역 설정

`globals.css`의 아래 두 줄은 **절대 수정·제거하지 말 것**. 이 설정이 없으면 페이지 이동 시 `max-w-[430px] mx-auto` 레이아웃이 오른쪽으로 밀리는 현상이 발생한다.

```css
html { scrollbar-gutter: stable; }   /* 스크롤바 유무에 따른 레이아웃 흔들림 방지 */
body { overflow-x: clip; }           /* 가로 넘침 차단 (scroll container 생성 없음) */
```

**절대 금지 패턴:**
```css
/* ❌ html에 overflow-x: hidden 금지 */
html { overflow-x: hidden; }
/* 이유: html의 수직 스크롤 컨테이너가 body로 이전되어 scrollbar-gutter: stable이 무력화됨 */

/* ❌ body에 overflow-x: hidden 금지 */
body { overflow-x: hidden; }
/* 이유: body가 새 scroll container가 되어 수직 스크롤까지 이전되는 부작용 발생 */

/* ✅ 유일하게 올바른 조합 */
html { scrollbar-gutter: stable; }
body { overflow-x: clip; }
```

`overflow-x: clip` vs `overflow-x: hidden` 차이:
- `hidden` → 새 scroll container(BFC) 생성 → 사이드 이펙트 발생
- `clip` → scroll container 생성 없이 시각적 클리핑만 → 사이드 이펙트 없음

### 마퀴/가로 애니메이션 패턴

`width: "max-content"` 또는 가로 무한 흐름(`animation: marquee`)을 쓸 때는 반드시 `overflow: clip` 부모로 감싸야 한다.

```tsx
// ✅ 안전 (BFC 생성 없음, 가로 클리핑)
<div style={{ overflow: "clip" }}>
  <div style={{ width: "max-content", animation: "marquee 28s linear infinite" }}>
    ...
  </div>
</div>

// ❌ 위험 — 클리핑 없는 max-content → 페이지 가로 넘침 직결
<div>
  <div style={{ width: "max-content" }}>...</div>
</div>

// ⚠️ 허용되지만 비권장 — overflow:hidden은 BFC를 생성함
<div className="overflow-hidden">...</div>
```

### ⚠️ 바텀시트는 반드시 탭바 위에 떠야 함 — Portal 규칙

바텀시트를 `fixed` 또는 `z-index`가 설정된 요소(헤더, 푸터 등) **안에서 렌더링하면 탭바(z-50) 아래에 깔린다.**  
이유: `fixed` 부모가 새 스태킹 컨텍스트를 만들어 자식의 `z-[100]`이 그 안에 갇히기 때문.

```tsx
// ✅ fixed/stacked 부모 안에서 바텀시트를 열어야 할 때 — Portal 필수
import { createPortal } from "react-dom"
import { useState, useLayoutEffect } from "react"

const [mounted, setMounted] = useState(false)
useLayoutEffect(() => { setMounted(true) }, [])

return (
  <>
    <button onClick={() => setOpen(true)}>열기</button>
    {mounted && createPortal(
      <BottomSheet open={open} onClose={() => setOpen(false)} />,
      document.body   // body에 직접 마운트 → 스태킹 컨텍스트 탈출
    )}
  </>
)

// ❌ 헤더/푸터 안에 바텀시트 직접 렌더 — 탭바 아래 깔림
<header className="fixed top-0 z-50">
  <BottomSheet />   // z-[100]이어도 z-50 헤더 컨텍스트 안에 갇힘
</header>
```

**적용 예:** `TopBarRight.tsx` — 헤더 안에서 LoginSheet/SajuInputSheet를 Portal로 마운트.

---

### 바텀시트 필수 패턴 (어길 시 레이아웃 깨짐)

```tsx
// ✅ 반드시 이 구조로
<div className="fixed inset-0 z-50 flex items-end justify-center">   {/* justify-center 필수 */}
  <div className="absolute inset-0 bg-black/40" />
  <div
    className="relative w-full max-w-[430px] rounded-t-3xl ..."      {/* max-w-[430px] 필수 */}
    style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}  {/* iOS 홈바 필수 */}
  >
    ...
  </div>
</div>

// ❌ 금지 패턴
<div className="fixed inset-0 flex items-end">          // justify-center 누락 → 데스크톱에서 좌측 붙음
  <div className="w-full rounded-t-3xl pb-8 ...">       // max-w 누락, pb 고정 → iOS 홈바 가림
```

**체크리스트 — 바텀시트 만들 때마다 확인:**
- [ ] 오버레이: `flex items-end justify-center`
- [ ] 패널: `w-full max-w-[430px]`
- [ ] 하단 여백: `paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))"`
- [ ] 버튼: `py-3` 이상 (44px 터치 영역)
- [ ] 텍스트: 본문 `14px` 이상, 보조 `12px` 이상

### ⚠️ 하단 고정바(입력바 등)는 BottomNav 실제 높이에 맞춰 붙일 것

BottomNav는 **고정 높이가 없다.** `py-2.5` 콘텐츠 기준 **약 61px**이지 80px(`h-20`)가 아니다. 따라서 채팅 입력바 같은 하단 고정 요소를 `bottom-20`(80px)으로 두면 내비와의 사이에 ~19px 크림색 틈이 생긴다("내비에 안 붙는" 현상).

```tsx
// ❌ 하드코딩 — 내비 실제 높이와 안 맞아 틈 생김
<div className="fixed bottom-20 left-0 right-0 z-40">

// ✅ 내비 높이를 실측해서 붙임
const [navH, setNavH] = useState(64)
useEffect(() => {
  const nav = document.querySelector("nav")
  if (!nav) return
  const ro = new ResizeObserver(() => setNavH(nav.offsetHeight))
  ro.observe(nav); setNavH(nav.offsetHeight)
  return () => ro.disconnect()
}, [])
<div className="fixed left-0 right-0 z-40" style={{ bottom: navH }}>
```

**다른 수정 시 이 패턴을 `bottom-20` 등으로 되돌리지 말 것.** (consult 페이지에 적용됨)

### ⚠️ fixed 요소 높이 측정 useEffect는 조건부 렌더 게이트를 deps에 넣을 것

헤더/바의 높이를 `ResizeObserver`로 재서 본문 `paddingTop`에 쓸 때, 측정 effect의 deps를 `[]`로 두면 함정이 있다. 데이터 로딩 전(`hasIlju === false` 등) `LockedScreen`이 렌더되어 `ref.current`가 null이면 effect가 early-return하고, 이후 본 화면이 렌더돼도 `[]` deps라 **다시 실행되지 않아 높이가 0으로 고정**된다 → `paddingTop`이 모자라 첫 콘텐츠가 헤더에 가려진다.

```tsx
// ❌ 조건부 렌더 뒤에 ref가 생기는데 deps가 비어있음 → 높이 0 고정
useEffect(() => { if (!headerRef.current) return; /* measure */ }, [])

// ✅ 게이트 조건을 deps에 — 화면이 실제 렌더된 뒤 재측정
useEffect(() => { if (!headerRef.current) return; /* measure */ }, [hasIlju])
```

**다른 수정 시 이 deps를 `[]`로 되돌리지 말 것.** (consult 페이지 첫 말풍선 잘림의 근본 원인)

### CTA 버튼 — 핑크 두들 스티커 버튼

샵/디스커버리 섹션의 주요 액션 버튼. 아이콘 컨테이너 미지정 시 버튼 높이가 제각각이 되므로 반드시 `w-6 h-6` 컨테이너로 감쌀 것.

```tsx
const GAEGU: React.CSSProperties = {
  fontFamily: "'Cafe24Dongdong', var(--font-gaegu), cursive",
  fontSizeAdjust: 0.52,
  letterSpacing: "normal",
}

// ✅ 정의된 패턴
<button
  className="w-full h-[52px] rounded-xl bg-pink/75 text-cream text-[16px] active:opacity-85 transition-opacity border-2 border-charcoal flex items-center justify-center gap-2"
  style={GAEGU}
>
  <span className="w-6 h-6 flex items-center justify-center shrink-0">
    <DoodleIcon className="w-5 h-5" />  {/* 아이콘은 반드시 w-5 h-5 */}
  </span>
  버튼 텍스트
  <span className="w-6 h-6 flex items-center justify-center shrink-0">
    <DoodleIcon className="w-5 h-5" />
  </span>
</button>

// ❌ 금지 — py-3.5 사용 시 아이콘 크기에 따라 높이가 달라짐
<button className="w-full py-3.5 ...">
  <DoodleCrown style={{ width: 20, height: 20 }} />  // 컨테이너 없이 직접 배치 금지
```

**규칙:**
- 높이: `h-[52px]` 고정 (`py-*` 사용 금지)
- 아이콘 컨테이너: `w-6 h-6 flex items-center justify-center shrink-0` (24px 박스)
- 아이콘 크기: `w-5 h-5` (20px) — 컨테이너 대비 2px 여백
- 폰트: `GAEGU` (Cafe24Dongdong)
- 색상: `bg-pink/75 text-cream border-2 border-charcoal`

### 폰트 사용 규칙

| 용도 | 폰트 | 비고 |
|------|------|------|
| 헤더 / 타이틀 / 섹션 제목 | `'BinggraeTaom', sans-serif` | **필수. Cafe24Dongdong 절대 금지** |
| 손글씨 느낌 본문 / 레이블 / 카드 내 작은 텍스트 | `'Cafe24Dongdong', cursive` | 헤더 사용 금지 |
| CTA 버튼 | `GAEGU` (= Cafe24Dongdong) | CTA 버튼 전용 |
| 일반 UI (기본값) | Noto Sans KR | Tailwind 기본 |

```tsx
// ✅ 헤더/타이틀
<p style={{ fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }}>
  섹션 제목
</p>

// ✅ 손글씨 느낌 레이블 (소형 텍스트, 카드 내부)
<p style={{ fontFamily: "'Cafe24Dongdong', cursive" }}>
  경진의 방
</p>

// ❌ 헤더에 Cafe24Dongdong 금지
<h2 style={{ fontFamily: "'Cafe24Dongdong', cursive" }}>페이지 제목</h2>
```

---

## 인증 (Auth) — 목업 → 실제 구현 전환 가이드

> **현재 상태 (2026-06): Supabase + 카카오 OAuth 스캐폴딩 완료.** 자세한 셋업·진행은 `SUPABASE-SETUP.md` 참고.
> - 인프라: `@supabase/supabase-js`+`@supabase/ssr`, `lib/supabase/{client,server,middleware,auth}`, 스키마/RLS `supabase/migrations/0001_init.sql`(profiles/friendships/rooms/guestbook_entries).
> - 로그인: `LoginSheet` 카카오 버튼 → `signInWithKakao`, `/auth/callback` 라우트, `UserContext`가 세션 기반 로그인 상태(설정 시) + mock 폴백.
> - 남은 것: 카카오 동의항목(닉네임 등) 설정 후 첫 로그인 → `profiles` 생성, 방/친구/방명록을 DB로 이전(Phase 3~4). 그 전까지 데이터는 여전히 localStorage 목업.
> - env: `NEXT_PUBLIC_SUPABASE_URL/ANON_KEY`(+`SAMPLE_FRIENDS`)는 `.env.local`(git 무시). `env.example` 참고.

### 현재 목업 구현 (`src/lib/mockAuth.ts`)

로그인/로그아웃 상태를 `localStorage`로 관리. 실제 Supabase 연동 전까지만 사용.

- `loginMockUser(provider)` — 카카오/네이버 로그인 시뮬레이션 + `saju-auth-change` 이벤트 발행
- `saveMockBirthDate(bd)` — 생년월일 저장
- `logoutMockUser()` — localStorage 삭제 + 이벤트 발행
- `getMockUser()` — 현재 유저 상태 반환

### ⚠️ 자동로그인 — `useLayoutEffect` 필수

auth 상태를 구독하는 컴포넌트는 반드시 `useLayoutEffect`를 사용할 것.  
`useEffect`는 첫 렌더 후 실행되어 "로그아웃" 상태가 깜빡이다 "로그인"으로 바뀌는 플래시가 생긴다.

```tsx
// ✅ 플래시 없는 자동로그인
useLayoutEffect(() => {
  setUser(getMockUser())                          // 첫 렌더 전 동기 반영
  const handler = () => setUser(getMockUser())
  window.addEventListener(MOCK_AUTH_EVENT, handler)
  return () => window.removeEventListener(MOCK_AUTH_EVENT, handler)
}, [])

// ❌ useEffect → 첫 렌더에 로그아웃 상태 노출 후 깜빡임
useEffect(() => {
  setUser(getMockUser())
  ...
}, [])
```

### 실제 구현 전환 시 (`src/lib/mockAuth.ts` → Supabase Auth)

```
목업                         →   실제
─────────────────────────────────────────────────────────
loginMockUser(provider)       →   supabase.auth.signInWithOAuth({ provider })
getMockUser().loggedIn        →   supabase.auth.getUser()
logoutMockUser()              →   supabase.auth.signOut()
localStorage (birthDate)      →   profiles 테이블 (birth_date, gender 컬럼)
saju-auth-change 이벤트       →   supabase.auth.onAuthStateChange()
```

**카카오/네이버 OAuth 세션은 Supabase가 자동으로 localStorage에 저장 → 자동로그인 기본 지원.**  
`useLayoutEffect` 패턴은 실제 구현에서도 유지할 것 (Supabase 세션 읽기도 동기 가능).

### 로그인 플로우 (목업 기준)

```
CTA 클릭
  ├─ 비로그인 → LoginSheet → 로그인 → 400ms 딜레이 → SajuInputSheet
  ├─ 로그인O, 생년월일X → SajuInputSheet (LoginSheet 스킵)
  └─ 로그인O, 생년월일O → "내 사주카드 보기" (결과 화면, 추후 구현)
```

### 관련 파일

- `src/lib/mockAuth.ts` — 목업 인증 유틸 (실제 구현 시 이 파일만 교체)
- `src/app/v3/_nav/TopBarUserButton.tsx` — 로그인 상태 표시 + 로그아웃 버튼
- `src/app/v3/shop/_components/LoginSheet.tsx` — 카카오/네이버 로그인 바텀시트
- `src/app/v3/shop/_components/SajuInputSheet.tsx` — 생년월일/시간/성별 입력 바텀시트

---

## 배포 전략

```
Next.js (web-kr)
  ├→ 웹: Vercel 배포 (브라우저)
  ├→ iOS: Capacitor → Xcode → App Store
  └→ Android: Capacitor → Android Studio → Play Store

하나의 코드베이스에서 웹+앱 모두 서비스.
```

## 앱 대응 개발 규칙

**반드시 지켜야 할 것:**

1. **API 호출은 `lib/` 안에 순수 함수로 분리** — 컴포넌트에서 fetch/supabase 직접 호출 금지
2. **인증은 Supabase Auth만 사용** — NextAuth, 자체 세션 금지 (RN 호환 불가)
3. **결제는 채널별 분리** — 웹: 토스페이먼츠(3.5%), 앱: 인앱결제 필수(30%, 소규모 15%). 앱에서 디지털 콘텐츠 판매 시 인앱결제 안 쓰면 스토어 리젝됨
4. **Next.js 서버 전용 기능에 비즈니스 로직 넣지 않기** — cookies(), headers() 등에 핵심 로직 의존 금지
5. **푸시 알림: OneSignal 예정** — 앱 스토어 심사 통과 + 리텐션 용도

**하지 않아도 되는 것:**
- 지금 Capacitor 설정 (스토어 제출 시점에)
- 공용 UI 라이브러리 (웹=Tailwind, 앱도 WebView라 동일)
- RN 프로젝트 별도 생성

## 구조

```
src/
  app/
    page.tsx             — v1 랜딩 (두들/스티커 스타일, 메인)
    v2/page.tsx          — v2 랜딩 (Spotify Wrapped 스타일, 실험)
    result/[id]/page.tsx — 요약 결과 페이지 (무료 캐릭터 카드)
    purchase/[id]/page.tsx — 결제 확인 페이지
    generating/[id]/page.tsx — 리포트 생성 중 로딩
    report/[id]/page.tsx — 상세 리포트 (14섹션 유료)
    preview/page.tsx     — 두들 미리보기 (개발용)
    preview-ilju/page.tsx — 일주 120유형 검수 (개발용)
    preview-logo/page.tsx — 로고 시안 (개발용)
    globals.css          — v1 전용 스타일 (크림+핑크+블랙)
    v2/v2.css            — v2 전용 스타일 (그래디언트+blob)
    layout.tsx           — Noto Sans KR + Black Han Sans
    v3/                  — 미니홈피 소셜 허브 (리텐션 피처)
      layout.tsx         — BottomNav 포함 레이아웃 (z-50)
      interior/
        page.tsx         — 메인 피드 (스토리→내 방→방명록 미리보기→상점→친구 미니홈피)
        [friend]/page.tsx — 친구 방 + 방명록 작성 (id 라우트)
      my/
        _components/
          MiniRoom.tsx   — RoomCanvas, RoomChar, SKINS, RoomSkin 타입, myGuestbookKey()
          StoryRow.tsx   — 스토리 (useFriends 기반)
          DisplayCharacterSheet.tsx — 대표 캐릭터 변경 시트
        room/
          page.tsx       — 내 방 편집기 (소품/캐릭터/스킨 탭, 드래그 배치)
          guestbook/
            page.tsx     — 내 방명록 전체 보기
  components/
    doodles.tsx          — SVG 두들 스티커 19종+
  hooks/                 — useFriends, useInventory, useMyDisplayCharacter
  lib/
    friends.ts           — 친구 단일 모델/저장소/샘플 시드
    supabase/            — client·server·middleware·auth·types (백엔드)
    ilju-types.ts        — 일주 120유형 데이터 (이름/강점/약점/대사/캐치포인트)
    ilju-svg-icons.tsx   — 일주별 SVG 아이콘 레지스트리 (ILJU_SVG_ICONS)
```

## 유명인 DB 추가 규칙

유명인 일주 추가 시 반드시 아래 절차를 따를 것.

### ⚠️ 중복 방지 — 반드시 선행 확인

**celeb-data-with-birth.txt 추가 전:**
```powershell
# 이름이 이미 DB에 있는지 확인
Select-String -Path celeb-data-with-birth.txt -Pattern "이름"
```

**preview-celebs.html R0~R5 셋 변경 전:**
```powershell
# 추가할 이름이 이미 어느 셋에 있는지 확인
$html = Get-Content preview-celebs.html -Raw
foreach ($set in @('R0','R1','R2','R4','R5')) {
  $m = [regex]::Match($html, "const $set = new Set\(\[(.*?)\]\)", 'Singleline')
  if ($m.Groups[1].Value -match "'추가할이름'") { Write-Host "$set 에 이미 있음!" }
}
```

규칙:
- 낮은 셋(R1~R5)에 이미 있으면 → 제거 후 높은 셋에 추가 (R0 > R1 > R2)
- 이미 같은 셋에 있으면 → 추가 안 함
- **셋 내용을 global replace로 수정하지 말 것** — 다른 셋까지 오염됨. 반드시 셋 범위를 특정한 뒤 범위 내에서만 수정할 것

### 외국인 판별 → 도시/국가 기준 일주 계산

외국인 여부 판별 기준: 소속 설명에 한국 이외의 국가명/외국 기업명이 포함된 경우.

```ts
// 올바른 방법 — 출생 도시 지정
calculateSaju({ year, month, day, hour: 12, minute: 0, city: 'New York' })

// 출생 도시가 cities.ts에 없으면 → 국가 대표 도시 사용
// 없는 도시 발견 시 cities.ts에 추가 후 사용
```

도시 매핑 원칙:
- 출생 도시가 cities.ts에 있으면 그 도시 사용
- 없으면 같은 국가의 대표 도시(수도/대도시) 사용
- 그것도 없으면 longitude + utcOffset 직접 지정

검증: `packages/manseryeok/tests/foreign-tz.test.ts` 에 추가 후 실행 확인.

> 참고: 시간 미상 시 noon(12:00) 기본값 사용. 자정 근처 출생이 아닌 한 일주 변동 없음이 확인됨 (29명 전수 테스트 완료).

### 유명인 랭크 기준 (r1~r5)

새 유명인 추가 시 아래 기준으로 랭크를 `celeb-data-with-birth.txt`에 함께 기록할 것.

| 등급 | 기준 | 예시 |
|------|------|------|
| r0 | 초 거물 — 전 세대 국민 인지도 + 글로벌 아이콘 (35명 고정) | 이재용, BTS, 블랙핑크, 손흥민, 메시, 트럼프, 젠슨 황 |
| r1 | 국민 인지도 90%+, 해당 일주 대표 얼굴 / 조선왕 전원 / 국내 대기업 회장 / 해외 유명 CEO / 위인 전원 / 해외 대통령·총리 | 이병철, 정의선, 오바마, 이정재, 송강호 |
| r2 | 노벨수상자 / 국내 IT CEO / 명품 브랜드 임원 / 전문경영인 CEO | 아이브 장원영, 뉴진스 멤버, 박지성, 아인슈타인 |
| r3 | 대중 인지도 높음, MZ 타겟에 확실히 통함 | |
| r4 | 팬덤/업계에선 유명, 일반 대중엔 중간 | 중견 배우, 2군 스포츠 선수 |
| r5 | 특정 팬층만 앎, 또는 인지도 낮아짐 | 덜 알려진 아이돌 멤버, 前 유명인 |

## 데이터 파일

```
celeb-data-with-birth.txt  — 유명인 DB (단일 소스, 여기만 수정)
rank-config.json           — R0~R5 랭크 설정 (이름 리스트)
generate-preview.cjs       — preview-celebs.html 생성 스크립트
preview-celebs.html        — 유명인 DB 검수용 HTML (생성된 파일, 직접 수정 금지)
preview-ilju.html          — 일주 120유형 검수용 HTML
birth-map-raw.txt          — 유명인 생년월일 원본 데이터
```

### celeb-data-with-birth.txt 성별 행 규칙

각 일주 행의 성별 접미사:

| 접미사 | 의미 | 예시 |
|--------|------|------|
| `-m`   | 남성 전용 | `경자-m: 조승우(배우)...` |
| `-f`   | 여성 전용 | `경자-f: 트와이스 사나(가수)...` |
| `-b`   | 남녀 공용 (both) | `경자-b: 알렉산더 대왕(마케도니아 왕)...` |

**`-b` 사용 기준:** 인물이 적어 m/f를 분리하기 어려운 일주에 사용. `-b` 행의 인물은 생성 시 `-m`과 `-f` 양쪽에 자동으로 포함됨.

**`-b` 추가/수정/삭제 시 주의:**
- `tag-commercial.cjs` — `-b` 행에도 `[ok]` 태그 자동 적용됨
- `generate-preview.cjs` — `-b` 인물은 m/f 양쪽 카운트에 각각 1씩 집계됨 (중복 계산)
- 나중에 `-m` / `-f` 행이 충분히 채워지면 `-b`를 분리해서 이동하는 게 바람직

### preview-celebs.html 재생성 방법

```powershell
# 사람 추가/삭제: celeb-data-with-birth.txt 수정 후
# 랭크 변경: rank-config.json 수정 후
node packages/web-kr/generate-preview.cjs
```

**preview-celebs.html을 직접 수정하지 말 것** — 다음 재생성 시 덮어씌워짐.
랭크(R0~R5) 변경은 반드시 rank-config.json에서 할 것.

## v1 랜딩 섹션 구성 (/)

1. Hero — "바뀌지 않는 나의 유형" + 두들 장식
2. 실시간 카운터 — 참여자 수 + 실시간 피드
3. 캐릭터 카드 — 4종 가로 스크롤
4. 궁합 티저 — 유형별 궁합 점수 + 카톡 공유
5. 리포트 미리보기 — 본질 텍스트 + 섹션 캐러셀
6. 올해 경고 — 2026 병오년 에너지 바
7. 유명인 — 아이유/손흥민/마동석
8. 후기 — 3개
9. 미니 퀴즈 — 1문제 오행 성향
10. 희귀도 통계 — 상위 X% + 공유율

## 공유 패키지

- `manseryeok` — 만세력 (공유)
- `saju-engine` — 사주 엔진 (공유)
- `saju-report` — locale='kr'로 호출 → 한국어 리포트 생성

## Commands

- `pnpm --filter web-kr dev` — 개발 서버 (포트 3001)
- `pnpm --filter web-kr build` — 빌드

### 슬래시 커맨드 (`.claude/commands/`)

- `/ilju-character [일주ID]` — 일주 캐릭터 카드 생성 (SVG 두들 + 배경 + 오행 뱃지)
  - 사용 예시: `/ilju-character 갑자-m`, `/ilju-character 을묘-f`
  - 스펙: viewBox 0 0 80 90, #2D2D2D 아웃라인, 성별(-m/-f) 필수 반영
  - 결과는 `preview-ilju/characters-{오행}.tsx`에 추가
  - **새 캐릭터 만들 때 반드시 이 커맨드 사용** (스타일 가이드 포함)

## ⚠️ 일주 캐릭터 SVG 수정 필수 규칙

**`characters-wood.tsx` / `characters-fire.tsx` / `characters-earth.tsx` / `characters-metal.tsx` / `characters-water.tsx` 파일을 수정하기 전, 반드시 아래 파일을 먼저 읽어라:**

```
packages/web-kr/src/app/preview-ilju/.claude/commands/ilju-character.md
```

또는

```
saju/.claude/commands/ilju-character.md
```

이 파일에는 성별 구분 SVG 패턴, 드로잉 순서, 헤어스타일 규칙, 얼굴 형태 등 반드시 지켜야 할 스펙이 담겨 있다. **읽지 않고 수정하면 히잡 헤어, 남성에 ellipse 얼굴 등 규칙 위반이 발생한다.**

### preview-ilju 파일 구조

일주 120유형 캐릭터는 오행별 5개 파일로 분리됨 (단일 파일 OOM 방지):

```
preview-ilju/
  page.tsx              — 진입점 (5개 파일 import만)
  characters-shared.tsx — 공유 상수/컴포넌트 (ElementBadge, SHOW_ELEMENT_BADGE)
  characters-wood.tsx   — 목(木) 001~024 (갑자~을묘)
  characters-fire.tsx   — 화(火) 025~048 (병인~정사)
  characters-earth.tsx  — 토(土) 049~072 (무진~기미)
  characters-metal.tsx  — 금(金) 073~096 (경오~신유)
  characters-water.tsx  — 수(水) 097~120 (임신~계해)
```

## ⚠️ 일주 데이터 규칙 — 반드시 준수

**`src/lib/ilju-types.ts`가 유일한 원천(SSOT)이다.**
일주의 이름·태그라인·대사·이모지·설명·강점·약점 등 **모든 텍스트는 반드시 이 파일에서 동적으로 가져올 것.**

### 올바른 사용

```typescript
import { getIljuType, ILJU_TYPES } from "@/lib/ilju-types"

// 단일 조회
const ilju = getIljuType("갑자-m")!
<p>{ilju.emoji} {ilju.name}</p>
<p>{ilju.tagline}</p>

// 목록 필터
const woodTypes = ILJU_TYPES.filter(t => t.stemElement === "목(木)")
```

### 절대 금지

```typescript
// ❌ 이름 하드코딩
<p>{"🚜 인간 불도저"}</p>
<p>{"고민 끝나기 전에 이미 가고 있음"}</p>
const name = "인간 불도저"

// ❌ raw string prop 전달
<SampleCard name="인간 불도저" tagline="고민 끝나기 전에..." />
```

### 컴포넌트 설계 원칙

새 컴포넌트가 일주 데이터를 필요로 할 때:
- **prop으로 `id: string`** 또는 **`ilju: IljuType`** 을 받을 것
- 컴포넌트 내부에서 `getIljuType(id)`로 조회
- 이름·태그라인·대사 등의 문자열을 직접 prop으로 받는 인터페이스 설계 금지

```typescript
import type { IljuType } from "@/lib/ilju-types"

// ✅ 올바른 인터페이스
function IljuCard({ ilju }: { ilju: IljuType }) { ... }
function IljuCard({ id }: { id: string }) {
  const ilju = getIljuType(id)!
  ...
}

// ❌ 금지 — string을 직접 받으면 하드코딩 유발
function IljuCard({ name, tagline, quote }: { name: string; tagline: string; quote: string }) { ... }
```

### 수정 흐름

일주 데이터 변경 시 **`ilju-types.ts` 하나만 수정** → 모든 페이지/컴포넌트 자동 반영.
HTML 스냅샷(`preview-ilju.html`)은 `pnpm generate:preview` 로 재생성.

## v3 Shop 탭 (1탭) 레이아웃 규칙

### 그룹 간격

최상위 `div`는 `gap-10`(40px) 고정. 그룹 내부 카드/서브항목은 각 컴포넌트의 `gap-3`(12px) 사용.

```tsx
// ✅ shop/page.tsx 최상위 컨테이너
<div className="flex flex-col gap-10 py-4">
  ...
</div>
```

### 그룹 순서 (위→아래)

| # | 그룹 | 컴포넌트 | 비고 |
|---|------|----------|------|
| 1 | 일주 디스커버리 | `<IljuDiscovery />` | 우상단에 doodle 스티커 absolute overlay |
| 2 | 유명인 디스커버리 | `<CelebDiscovery />` | "귀하게 자란 내가..." |
| 3 | 공주 궁합 | `<SquadSection />` | "우리 중에 타고난 공주는 누구?" |
| 4 | 밤티 궁합 | `<PairsSection />` | "우리 궁합, 밤티인 거 아니지..?" |
| 5 | 귀한 나를 위한 힌트 | inline (page.tsx) | 전남친운/전여친운/올해운/엄마운/아빠운 |
| 6 | 같은 일주 유명인 | inline (page.tsx) | 상세 리포트 후킹 카드 |
| 7 | 2-col 상품 그리드 | inline (page.tsx) | 커플궁합/오늘의사주/월운캘린더/구독 |
| 8 | 오늘 운세 | inline (page.tsx) | 다크 배너 |
| 9 | 광고 배너 | `<AdBanner />` | — |

### CompatibilityCards 컴포넌트 구조

`CompatibilityCards.tsx`는 두 개의 named export로 분리되어 있다. default export는 두 섹션을 합친 것 (직접 사용 지양).

```tsx
// ✅ shop/page.tsx에서 개별 사용 (gap-10 균등 적용을 위해)
import { SquadSection, PairsSection } from "./_components/CompatibilityCards"

// ❌ default import 사용 시 두 섹션 사이 간격이 gap-10이 아님
import CompatibilityCards from "./_components/CompatibilityCards"
```

### doodle 스티커 오버레이 패턴

그룹 우상단에 스티커를 absolute로 올릴 때:

```tsx
<div className="relative">
  <div className="absolute top-0 right-0 flex items-center gap-1.5 opacity-60 pointer-events-none">
    <DoodleStar className="w-4 h-4 -rotate-12" />
    <DoodleMoon className="w-4 h-4 rotate-6" />
    <DoodleSparkle className="w-4 h-4 -rotate-6" />
  </div>
  <IljuDiscovery />
</div>
```

---

## v3 미니홈피 개발 규칙

### ⚠️ 친구·일주·캐릭터 데이터 모델 (2026-06 리팩토링 — 필독)

**친구는 단일 모델/단일 소스다.** 더미 `FRIEND_ROOMS`/`friendRooms.tsx`는 **삭제됨.**
- 모든 화면은 `useFriends()` 훅(`@/hooks/useFriends`)으로만 친구 접근. 모델 `Friend { id, name, iljuKey, room? }`(`@/lib/friends`).
- 저장소 `saju-custom-friends`, 변경 이벤트 `saju-custom-friends-change`. **매칭·라우트·방명록 키는 id 기준**(`/v3/interior/[id]`, `saju-guestbook-{id}`). 이름으로 키 만들지 말 것.
- 친구 정렬은 `useFriends()`가 **최근 활동순**(방명록 최신 글/추가 시각)으로 처리 → 스토리 왼쪽=최신, 미니홈피 목록 위=최신.
- 샘플 친구(지수 등)는 `NEXT_PUBLIC_SAMPLE_FRIENDS=1`(테스트)에서만 시드. 운영엔 안 뜸.

**일주(정체성) vs 대표 캐릭터(외형) 분리 — 전역 룰:**
- 일주는 1개(`user.iljuId`/`profiles.ilju_key`), 불변, 사주 로직 전부. 방 캐릭터는 N개(`RoomData.chars`).
- 대표 캐릭터 = 소셜 아바타용(`inventory.displayCharacterKey`, 기본=일주). 변경: `useMyDisplayCharacter()` 훅 / `DisplayCharacterSheet`.
- **아바타 해석 순서:** ①일주 없음→`DEFAULT_PROFILE_IMG` ②소셜 맥락(프로필·방명록 작성자)→대표 캐릭터 ③사주 정체성 맥락(일주 라벨·운세·상담)→태생 일주.

### 방명록 작성자 아바타 — 고정 규칙

작성자 아바타는 **일주 캐릭터 SVG**(`ILJU_SVG_ICONS`)를 쓴다. 이모지 절대 금지.

```tsx
// 친구 글: useFriends()에서 찾아 iljuKey로 렌더
const friend = friends.find(f => f.name === entry.author)
const fn = friend ? ILJU_SVG_ICONS[friend.iljuKey] : null
{fn ? <div className="w-full h-full">{fn(getIljuProfileViewBox(friend!.iljuKey))}</div> : <span>{entry.author[0]}</span>}

// 내 글: 대표 캐릭터(소셜) 사용 — useMyDisplayCharacter()
const meDisplayKey = useMyDisplayCharacter() ?? ""
```

### DoodleBox 정렬 규칙

`DoodleBox`는 `<span className="inline-flex ...">` — 인라인 요소다.  
`<div>` 안에 넣으면 descender 공백(line-height 하단 여백)이 생겨 세로 정렬이 틀어진다.

```tsx
// ✅ flex 컨텍스트에 직접 — block-ified되어 정렬 정상
<button className="flex items-center gap-2">
  <DoodleBox className="w-6 h-6"><DoodleStar /></DoodleBox>
  <span>텍스트</span>
</button>

// ❌ div 래퍼 → inline-flex descender 공백 → 세로 정렬 틀어짐
<button className="flex items-center gap-2">
  <div className="shrink-0">
    <DoodleBox className="w-6 h-6"><DoodleStar /></DoodleBox>
  </div>
  <span>텍스트</span>
</button>
```

`DoodleBox`에는 이미 `shrink-0`이 내장되어 있으므로 별도 래퍼 불필요.

### overflow-hidden + 절대 위치 자식 (빨콩 등)

`overflow-hidden` 컨테이너 밖으로 삐져나오는 절대 위치 요소(알림 뱃지 등)는 반드시 **wrapper `relative` div를 분리**해야 한다.

```tsx
// ✅ wrapper에 relative만, 내부 div에 overflow-hidden
<div className="relative">
  <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full z-10" />
  <div className="rounded-2xl overflow-hidden">...</div>
</div>

// ❌ 같은 div에 relative + overflow-hidden → 뱃지가 clip됨
<div className="relative rounded-2xl overflow-hidden">
  <div className="absolute -top-1.5 -right-1.5 ..." />  {/* 안 보임 */}
</div>
```

### 방 편집기 터치 이벤트

RoomCanvas는 `touchAction: "none"` + 포인터 캡처를 사용하므로 트레이 버튼에 `onClick`이 불안정하다.  
트레이 내 모든 인터랙션은 `onPointerDown` + `e.stopPropagation()` 사용.

```tsx
// ✅ 트레이 버튼
<button onPointerDown={e => { e.stopPropagation(); handleSelect() }}>
// ❌ onClick은 포인터 캡처에 막힐 수 있음
<button onClick={handleSelect}>
```

### localStorage 키 목록

| 키 | 내용 |
|---|---|
| `saju-miniroom-v1` | 내 방 데이터 (stickers, chars[], charPos, skinId) |
| `saju-inventory-v1` | 인벤토리 (소유 소품/스킨/캐릭터, `displayCharacterKey`) |
| `saju-custom-friends` | 친구 단일 저장소 (`useFriends`, id 기준) |
| `saju-guestbook-{내이름}` | 내 방명록 (`myGuestbookKey(name)`) |
| `saju-guestbook-{내이름}-seen` | 읽은 방명록 수 (빨콩 계산용) |
| `saju-guestbook-{친구id}` | 친구 방 방명록 (**이름 아닌 id**) |

> ⚠️ 일주 식별은 단일 소스(`user.iljuId`)로 통일됨. `inv.iljuKey`는 `useInventory()`가 `user.ilju`에서 주입(하드코딩 아님).

### 스킨 시스템

`SKINS` 배열 (MiniRoom.tsx export): 기본/봄벚꽃/달빛하늘/라벤더/민트숲/레몬 6종.  
`RoomCanvas`에 `skin?: RoomSkin` prop으로 전달. 미전달 시 `SKINS[0]` (기본) 자동 적용.

### B급 감성 디자인 토큰

- 폰트: `'BinggraeTaom', sans-serif` (방명록 영역 전체)
- 방명록 카드: 파스텔 포스트잇 5색 순환 (`CARD_COLORS`), 약간의 tilt rotate
- 테두리: `1.5px dashed #D8C4A0` (섹션 구분), `1px dashed #EDD9B0` (내부 구분)
- 배경: `#FFFBF2` (방명록), `#F7F3EE` (페이지 전체)

---

## 완료된 것

- [x] saju-report locale 분리 (kr/mx) — 프롬프트/딕셔너리 분기
- [x] 한국어 리포트 프롬프트 — 친구 반말 톤 ("~거든", "~해보는 것도 좋아")
- [x] 랜딩페이지 v1 — 두들/스티커 스타일, 10개 섹션 + CTA + 바텀시트
- [x] 랜딩페이지 v2 — Spotify Wrapped 스타일 (실험)
- [x] 두들 스티커 19종+ 캐릭터 (여행여자, 비행기, 해 등)
- [x] 두들 스타일 가이드 + /doodle 커맨드
- [x] 일주 120유형 데이터 — 이름/강점/약점/대사/캐치포인트/궁합
- [x] 유명인 DB 775명 — 10개 카테고리 (가수/배우/예능인/기업인/스포츠/정치인/캐릭터/조선왕/위인/노벨상) + 생년월일
- [x] 요약 결과 페이지 (/result/[id]) — 데모 데이터
- [x] 상세 리포트 페이지 (/report/[id]) — 데모 14섹션
- [x] 결제 확인 페이지 (/purchase/[id]) — 데모
- [x] 로딩 페이지 (/generating/[id]) — 체크리스트 애니메이션
- [x] 로고 심볼 시안 14개 (A~N)
- [x] 기획서 — LANDING-STRUCTURE.md, RESULT-PAGE-PLAN.md, REPORT-PAGE-PLAN.md, PURCHASE-FLOW-PLAN.md
- [x] v3 미니홈피 — 내 방 편집기 (소품 드래그 배치, 스킨 6종), 친구 방 5명
- [x] v3 방명록 — 친구 방 방명록 작성, 내 방명록 인라인 미리보기 + 전체 보기
- [x] v3 빨콩 알림 — 새 방명록 도착 시 인라인 미리보기에 red dot 표시
- [x] v3 B급 감성 디자인 — BinggraeTaom 폰트, 포스트잇 카드, dashed border
- [x] v3 상점 — 소품·스킨·액막이점 가로 스크롤 카드 (UI, 결제 미연동)

## TODO

**Phase 1 — MVP (서비스가 실제로 돌아가게)**
- [ ] 로고 확정 + 서비스 적용
- [ ] Supabase 연동 (lib/supabase.ts, lib/store.ts — 순수 함수)
- [ ] 사주 계산 API (api/saju/calculate)
- [ ] 바텀시트 → API 연결 (랜딩 입력폼 실제 작동)
- [ ] 결과 페이지 API 연동 (데모 → 실제 데이터)
- [ ] 일주 유형 + 유명인 DB 연동 (결과 페이지에서 매칭)
- [ ] OG이미지 자동 생성 (캐릭터 카드)
- [ ] 카카오톡 공유 (카카오 JS SDK)

**Phase 2 — 매출**
- [ ] 토스페이먼츠 결제 (웹), 인앱결제 (앱)
- [ ] 리포트 생성 API (DeepSeek locale='kr')
- [ ] 리포트/로딩 페이지 API 연동 (데모 → 실제 AI 텍스트)
- [ ] 상담 채팅 AI 연동 (`/v3/consult`) — 모델: `deepseek-v4-flash`, 유저 일주/오행 정보를 시스템 프롬프트에 주입, 1턴당 명태 차감

**Phase 3 — 성장**
- [ ] 궁합 기능
- [ ] 인스타 스토리용 이미지 생성
- [ ] GA4 이벤트 태깅
- [ ] SEO (robots.ts, sitemap.ts, 네이버 서치어드바이저)
- [ ] 카카오 로그인 (Supabase Auth)

**Phase 3.5 — 데일리 리텐션 5대 기능 (구독 ₩2,900/월 수익화)**

- [ ] **오늘의 사주 한마디 + 푸시**
  만세력으로 오늘 일주 계산 → 유저 일주와 오행 상생/상극 비교 → AI 없이 엔진만으로 생성
  출력: 오늘의 에너지 + 럭키컬러 + 럭키넘버 + 한줄 조언
  수익: 무료=한줄, 구독=상세

- [ ] **월운 캘린더**
  saju-engine 월운/일운 데이터 → 유저 일주와 매일의 일진 비교
  표시: 상생 🟢 / 상극 🔴 / 중립 🟡
  수익: 이번 주만 무료, 다음 주~다음 달은 구독

- [ ] **주간 에너지 그래프**
  월~일 7일 운세 → 이번 주 베스트/워스트 날
  출력: 7일 에너지 바 그래프 + "수요일이 베스트!"
  수익: 구독 포함

- [ ] **오행 밸런스 트래커**
  매일 1탭 오행 체크인 (5초) → 주간 오행 분포 집계 → 용신 기반 맞춤 조언
  출력: 🌳1 🔥3 ⛰️1 💎0 💧2 → "화(火) 과잉, 수(水) 활동 추천"
  수익: 주간 리포트는 구독자만

- [ ] **궁합 캘린더**
  두 사람 일주 + 오늘의 일진 3개 조합 → 매일 다른 결과
  출력: 오늘 궁합 % + 한줄 + 히스토리 그래프
  수익: 1일 1회 무료, 추가는 건당 ₩1,900 또는 구독

**Phase 4 — 앱 출시**
- [ ] Capacitor 설정 + 빌드
- [ ] OneSignal 푸시 알림
- [ ] Apple App Store 제출
- [ ] Google Play Store 제출
- [ ] 도메인 + Vercel 배포
