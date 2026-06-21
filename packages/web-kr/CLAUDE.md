# web-kr — 사주TI 한국판 랜딩페이지

한국 시장 대상 사주 웹서비스. "MBTI보다 정확한 진짜 나" 컨셉.

## 구조

```
src/
  app/
    page.tsx      — v1 랜딩 (두들/스티커 스타일, 메인)
    v2/page.tsx   — v2 랜딩 (Spotify Wrapped 스타일, 실험)
    globals.css   — v1 전용 스타일 (크림+핑크+블랙)
    v2/v2.css     — v2 전용 스타일 (그래디언트+blob)
    layout.tsx    — Noto Sans KR + Black Han Sans
  components/
    doodles.tsx   — SVG 두들 스티커 13종
  lib/            — (향후 supabase, tosspayments 등)
```

## v1 랜딩 섹션 구성 (/)

1. Hero — MBTI vs 사주TI + 두들 장식
2. MBTI 브릿지 — ENFP→???일주 + 실시간 카운터
3. 캐릭터 카드 — 4종 가로 스크롤
4. 궁합 티저 — 유형별 궁합 점수 + 카톡 공유
5. 리포트 미리보기 — 본질 텍스트 + 섹션 캐러셀
6. 올해 경고 — 2026 병오년 에너지 바
7. 유명인 — 아이유/손흥민/마동석
8. 후기 — 3개
9. 미니 퀴즈 — 1문제 오행 성향
10. 희귀도 통계 — 상위 X% + 공유율

## v2 랜딩 (/v2)

Spotify Wrapped 스타일 풀스크린 snap scroll.
7개 슬라이드, 섹션별 다색 그래디언트, blob 모핑.

## 디자인 시스템

**v1**: 크림(#FDF6EE) 배경 + 핑크(#E84B6A) + 블랙(#2D2D2D)
- 두들 스티커가 흩뿌려진 낙서장/스크랩북 느낌
- 카드: 흰색 + border-2 border-charcoal + sticker-shadow
- 삐뚤 배치 (tilt-left/right), 말풍선 (speech-bubble)
- 형광펜 밑줄 (highlight-pink/yellow/green)

**v2**: 다색 그래디언트 배경 + 풀스크린
- 한 화면 = 한 메시지
- 넘버링 리스트 + 스탯 바 + 브랜딩 푸터

## 공유 패키지

- `manseryeok` — 만세력 (공유)
- `saju-engine` — 사주 엔진 (공유)
- `saju-report` — locale='kr'로 호출 → 한국어 리포트 생성

## Commands

- `pnpm --filter web-kr dev` — 개발 서버 (포트 3001)
- `pnpm --filter web-kr build` — 빌드

## TODO

- [ ] 입력폼 → saju-engine 연동 (사주 계산)
- [ ] 결과 페이지 (무료 캐릭터 카드)
- [ ] Supabase 연동 (DB 공유)
- [ ] 토스페이먼츠 결제
- [ ] 카카오 로그인/공유
- [ ] 배포 (Vercel)
