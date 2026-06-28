# Instagram 자동화 봇

사주 콘텐츠를 자동 생성하고 Instagram에 포스팅하는 파이프라인.

## 파이프라인

```
스케줄러 → 콘텐츠 생성(Claude) → 이미지 생성 → Meta API 포스팅 → DB 기록
```

## 파일 구조

```
src/
  content-gen.ts     — Claude API로 콘텐츠 텍스트 생성
  celebrity-gen.ts   — 유명인 사주 캐러셀 생성 (핵심)
  image-gen.ts       — 템플릿 기반 이미지 생성 (Sharp/Canvas)
  chart-renderer.ts  — 사주 차트 이미지 렌더링 (4기둥 + 오행 원형)
  publisher.ts       — Meta Graph API 포스팅
  scheduler.ts       — cron 기반 스케줄링
  analytics.ts       — 포스팅 성과 추적
  trending.ts        — 멕시코 트렌딩 유명인 감지
templates/
  celebrity-carousel/ — 유명인 사주 캐러셀 템플릿 (5장) ⭐
  daily-fortune/      — 일일 운세 이미지 템플릿
  saju-chart/         — 사주 차트 시각화 템플릿
  social-proof/       — 후기 카드 템플릿
  personality/        — 성격 분석 카드 템플릿
  compatibility/      — 궁합 카드 템플릿
```

## 콘텐츠 타입 (우선순위순)

| 타입 | 빈도 | Claude 모델 | 퍼널 역할 |
|------|------|------------|----------|
| **celebrity_saju** | **주 2-3회** | **Sonnet** | **후킹/유입** ⭐ |
| daily_fortune | 매일 | Haiku | 채널 활성화 |
| social_proof | 주 1-2회 | Haiku | 신뢰 구축 |
| personality | 주 1회 | Sonnet | 교육/관심 |
| compatibility | 주 1회 | Sonnet | 공유 유도 |
| educational | 주 1회 | Sonnet | SEO/교육 |
| reels_script | 주 2회 | Sonnet | 도달/확산 |

## 캐러셀 구성 (용용사주 레퍼런스)

유명인 사주 캐러셀 5장 구성:
1. **HOOK**: 자극적 제목 + 유명인 컨텍스트 이미지 설명
2. **CHART**: 사주 4기둥 시각화 + 핵심 요약
3. **ANALYSIS**: 성격/커리어 매칭 상세 분석
4. **TIMING**: 대운 타이밍 분석 ("언제 어떤 운이 오는지 정확히...")
5. **CTA**: 후기 + 전환 유도

## 포스팅 시간 (멕시코 CST, UTC-6)

- 평일: 07:00, 12:00, 19:00 중 택 1
- 주말: 10:00, 17:00 중 택 1
- Meta Insights API로 최적 시간 자동 조정

## Meta Graph API 참고

- Business Account + Facebook Page 필요
- 토큰: long-lived page access token 사용
- Rate limit: 시간당 200 API 호출
- 이미지: JPEG, 최소 320px, 최대 1080px 권장
