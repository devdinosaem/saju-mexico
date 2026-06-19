# Saju México — 한국 사주 × 멕시코 시장

멕시코인 대상 한국 사주(四柱命理) 웹서비스 + Instagram 자동화 프로젝트.
Instagram으로 사주 콘텐츠를 유통하고, 웹서비스에서 유료 개인 사주 분석을 제공한다.

## Funnel (핵심 퍼널)

```
[1. Instagram 후킹]
    멕시코 유명인 사주 분석 캐러셀 포스트
    "¿Canelo nació para pelear? Su Saju lo predijo ㄷㄷ"
        ↓
[2. 신뢰 구축]
    실제 사주 차트 + 성격/커리어 맞춤 해석
    대중이 아는 사실과 사주 분석의 일치 → "소름" 반응 유도
        ↓
[3. 사회적 증거]
    사용자 후기 슬라이드 (결제 후 본인 사주 맞았다는 증언)
        ↓
[4. CTA → 웹 전환]
    "Descubre tu propio Saju → link in bio"
        ↓
[5. 웹: 무료 기본 분석]
    생년월일시 입력 → 오행 분포 + 1줄 요약 (무료)
        ↓
[6. 유료 전환]
    "Desbloquea tu reporte completo" → MercadoPago 결제
        ↓
[7. 풀 리포트 제공]
    PDF/웹 리포트 (800-1200자 상세 해석)
```

## Architecture

```
[Instagram Bot] → 유명인 사주 콘텐츠 자동생성/포스팅 → 웹 유입
[Web Service]  → 무료 기본 분석 → 유료 상세 리포트 (MercadoPago)
[만세력 Engine] → 사주 4기둥 계산 (자체 구현, 외부 API 미사용)
[Claude API]   → 스페인어 사주 해석 생성 + 유명인 콘텐츠 작성
```

## 레퍼런스: 용용사주 (yongyong.ai)

한국 시장에서 검증된 퍼널 구조. 핵심 전략:
- 유명인 사주 분석으로 Instagram 후킹 (충주맨, 연예인 등)
- 캐러셀 구성: 후킹 제목 → 실제 사주 차트 → 분석 내용 → 후기 → CTA
- "공무원 하나만 할 사주가 아니에요ㅋㅋ" 같은 대중적 흥미 유발
- 웹에서 6만자 분량 유료 리포트 판매 (누적 20만 건)
- 이 모델을 멕시코 시장에 현지화하여 적용

## Tech Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Language**: TypeScript (전 패키지 공통)
- **만세력 엔진**: 순수 TS, 외부 의존성 없음
- **Web**: Next.js 14+ (App Router) + Tailwind + shadcn/ui
- **DB**: Supabase (PostgreSQL + Auth + Storage)
- **ORM**: Drizzle ORM
- **Auth**: Supabase Auth (Google/Facebook OAuth)
- **결제**: MercadoPago (OXXO 현금결제 포함)
- **Instagram**: Meta Graph API
- **AI**: Claude API (해석: Sonnet, 콘텐츠: Haiku)
- **Hosting**: Vercel (Next.js) + Supabase (DB/Auth/Storage)
- **Instagram 봇**: Vercel Cron (성장 시 Railway 분리)

## Package Structure

```
packages/
  manseryeok/    — 만세력 계산 엔진 (CLAUDE.md 참조)
  saju-engine/   — 사주 해석 로직 (오행/십신/용신)
  saju-report/   — Claude API 스페인어 리포트 생성 (CLAUDE.md 참조)
  web/           — Next.js 웹서비스 + 유료 리포트 (REPORT-STRUCTURE.md 참조)
  instagram-bot/ — 인스타그램 자동화
```

## 유료 리포트 (핵심 수익 모델)

14개 섹션, ~15,000-18,000자(스페인어) 풀 리포트.
상세 구조: packages/web/REPORT-STRUCTURE.md 참조.

리포트 생성: Claude API 4회 호출 (시스템 프롬프트 캐싱)
- Call 1: 오행 분포 + 일간 + 성격 + 십신
- Call 2: 연애운 + 재물운 + 직업운 + 건강운
- Call 3: 대운 타임라인 + 올해 운세
- Call 4: 용신 가이드 + 종합 조언

## 만세력 핵심 규칙 (모든 작업에 적용)

- 년주: **입춘(立春)** 기준. 양력 1/1 아님
- 월주: **절기(節)** 기준. 음력 1일 아님
- 일주 기준일: 1900-01-01 = 갑자(甲子)일
- 시주: 23:00~01:00 = 자시(子時), 2시간 단위
- 날짜 계산: UTC 기준 처리, 사용자 timezone 별도 변환
- 절기 정밀도: 분 단위 (초 불필요)

## 스페인어 콘텐츠 규칙

- 멕시코 스페인어: tú/ustedes 사용
- 사주 용어: 한국어 원어 + 스페인어 병기 → "Tu pilar del día (일주)"
- 오행 번역: Madera(목) Fuego(화) Tierra(토) Metal(금) Agua(수)
- 12지지: Rata(자) Buey(축) Tigre(인) Conejo(묘) Dragón(진) Serpiente(사) Caballo(오) Cabra(미) Mono(신) Gallo(유) Perro(술) Cerdo(해)
- 서양 점성술과 비교하되 동일시 금지

## Commands

- `/generate-content` — Instagram 콘텐츠 생성
- `/celebrity-saju` — 멕시코 유명인 사주 캐러셀 콘텐츠 생성
- `/calculate-saju` — 사주 계산 테스트
- `/weekly-plan` — 주간 콘텐츠 캘린더 생성

## Test

- `pnpm test` — 전체 테스트
- `pnpm --filter manseryeok test` — 만세력 엔진만
- vitest 사용, 만세력은 최소 100개 known-good 사주로 검증

## Conventions

- 커밋 메시지: 한국어, 동사형 시작 ("추가:", "수정:", "개선:")
- 브랜치: feature/*, fix/*, content/*
- PR: 한국어 제목, 본문에 변경 사유 포함
