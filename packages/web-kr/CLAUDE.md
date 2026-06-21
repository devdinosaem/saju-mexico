# web-kr — 사주TI 한국판 웹서비스

한국 시장 대상 사주 웹서비스. "바뀌지 않는 나의 사주 유형" 컨셉.
**웹 + 앱 (iOS/Android) 동시 서비스 — Capacitor로 네이티브 앱 패키징 예정.**

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
3. **결제는 웹 결제(토스페이먼츠)로** — 인앱결제 30% 수수료 회피
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
    page.tsx        — v1 랜딩 (두들/스티커 스타일, 메인)
    v2/page.tsx     — v2 랜딩 (Spotify Wrapped 스타일, 실험)
    preview/page.tsx — 두들 미리보기 (개발용)
    globals.css     — v1 전용 스타일 (크림+핑크+블랙)
    v2/v2.css       — v2 전용 스타일 (그래디언트+blob)
    layout.tsx      — Noto Sans KR + Black Han Sans
  components/
    doodles.tsx     — SVG 두들 스티커 19종+
  lib/              — API 호출, Supabase, 결제 (순수 함수로 분리)
```

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

## TODO

**Phase 1 — MVP (무료 결과까지)**
- [ ] Supabase 연동 (lib/supabase.ts, lib/store.ts — 순수 함수)
- [ ] 사주 계산 API (api/saju/calculate)
- [ ] 120종 일주 유형 데이터
- [ ] 무료 결과 페이지 (/result/[id])
- [ ] OG이미지 + 카카오톡 공유

**Phase 2 — 매출**
- [ ] 토스페이먼츠 결제 (웹 결제, 인앱결제 X)
- [ ] 리포트 생성 API (locale='kr')
- [ ] 리포트 페이지 (/report/[id])
- [ ] 로딩 페이지 (/generating/[id])

**Phase 3 — 성장**
- [ ] 궁합 기능
- [ ] 인스타 스토리용 이미지 생성
- [ ] GA4 이벤트 태깅

**Phase 4 — 앱 출시**
- [ ] Capacitor 설정 + 빌드
- [ ] OneSignal 푸시 알림
- [ ] Apple App Store 제출
- [ ] Google Play Store 제출
- [ ] 도메인 + Vercel 배포
