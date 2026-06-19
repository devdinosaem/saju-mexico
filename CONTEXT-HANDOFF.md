# Saju México — 전체 프로젝트 컨텍스트 핸드오프

이 문서는 프로젝트의 모든 의사결정, 분석, 설계를 담고 있다.
새로운 AI에게 이 문서 + 프로젝트 파일을 전달하면 맥락을 완전히 이어받을 수 있다.

---

## 1. 프로젝트 개요

**목표**: 멕시코인 대상으로 한국 사주(四柱命理)를 소개하는 Instagram 채널 + 유료 웹서비스.
**수익 모델**: Instagram으로 유입 → 웹에서 유료 사주 리포트 판매 (MercadoPago 결제)
**자동화**: 콘텐츠 생성, 포스팅, 사주 계산, 리포트 생성 모두 자동화 (Claude API + Meta API)
**프로젝트 경로**: `C:/Users/20151.HANSAEM/projects/saju-mexico/`

---

## 2. 핵심 퍼널 (검증된 모델)

### 레퍼런스: 용용사주 (yongyong.ai)
한국에서 검증된 사주 서비스. 누적 판매 20만 건.
- Instagram에서 유명인 사주 분석으로 후킹
- 웹에서 "6만자 리포트" 유료 판매
- 실제 스크래핑하여 구조 분석 완료 (Puppeteer 사용)

### 퍼널 구조
```
[1] Instagram 후킹
    멕시코 유명인 사주 분석 캐러셀 5장
    "¿Canelo nació para pelear? Su Saju lo confirma 🥊"
        ↓
[2] 신뢰 구축
    실제 사주 차트 + 공개된 성격/커리어와 사주 분석 일치 → "소름" 반응
        ↓
[3] 사회적 증거
    사용자 후기 슬라이드
        ↓
[4] CTA → 웹 전환
    "Descubre tu propio Saju → link in bio"
        ↓
[5] 웹: 판매 페이지 (무료 티저)
    3대 사건 예고 → 성향 분석 → 재물운 티저 → 운명의 짝 프로필
    핵심 정보 가림 처리 ("████년 ██월", "가려진내용")
        ↓
[6] MercadoPago 결제
        ↓
[7] 유료 풀 리포트 (8 Chapter, 30+ 풀이 항목)
```

---

## 3. 기술 스택 (확정)

| 영역 | 기술 | 선택 이유 |
|------|------|----------|
| 언어 | TypeScript | 프론트/백 통합, 타입 안전성 |
| 모노레포 | pnpm workspaces + Turborepo | 만세력 엔진 독립 패키지 재사용 |
| 만세력 엔진 | 순수 TS, 외부 의존성 없음 | 핵심 로직, API 의존 제거 |
| 웹 프레임워크 | Next.js 14+ (App Router) | SSR/SEO + Vercel 최적화 |
| UI | Tailwind + shadcn/ui | 빠른 프리미엄 UI 구축 |
| DB | Supabase (PostgreSQL) | Auth+DB+Storage 올인원, 무료 시작 |
| ORM | Drizzle ORM | 타입 안전, 경량 |
| 인증 | Supabase Auth (Google/Facebook OAuth) | 멕시코 사용자 편의 |
| 결제 | MercadoPago | 멕시코 1위 결제, OXXO 현금결제 지원 |
| Instagram | Meta Graph API | 공식 API, 자동 포스팅 |
| AI | Claude API | 한국어 사주 지식 + 스페인어 출력 |
| 호스팅(웹) | Vercel | Next.js 배포 최적, 무료 시작 |
| 호스팅(DB) | Supabase | PostgreSQL+Auth+Storage 통합 |
| 인스타 봇 | Vercel Cron → 성장 시 Railway 분리 | 초기 간단, 확장 가능 |
| 테스트 | vitest | 빠르고 TS 네이티브 |
| 이미지 생성 | Sharp/Canvas (템플릿 기반) | 서버사이드 이미지 자동 생성 |

### 호스팅 선택 과정
Vercel+Supabase / Cloudflare / VPS / Railway 4개 비교 후 **Vercel+Supabase** 선택.
이유: DevOps 최소, 무료 시작, Next.js 최적화, Auth 통합.

---

## 4. 프로젝트 디렉토리 구조

```
saju-mexico/
├── CLAUDE.md                           # 루트 컨텍스트 (기술스택, 퍼널, 만세력규칙, 스페인어규칙)
├── CONTEXT-HANDOFF.md                  # 이 파일 (전체 맥락)
├── .gitignore
├── .env.example                        # 필요한 API 키 목록
├── package.json
│
├── .claude/
│   ├── settings.json                   # Claude Code 권한 설정
│   └── commands/
│       ├── celebrity-saju.md           # /celebrity-saju — 유명인 사주 캐러셀 생성
│       ├── generate-content.md         # /generate-content — 일반 콘텐츠 생성
│       ├── calculate-saju.md           # /calculate-saju — 사주 계산 테스트
│       └── weekly-plan.md              # /weekly-plan — 주간 캘린더
│
├── agents/
│   ├── celebrity-saju.md               # 유명인 사주 캐러셀 5장 생성 프롬프트
│   ├── content-creator.md              # Instagram 콘텐츠 생성 프롬프트
│   ├── saju-interpreter.md             # 유료 리포트 생성 프롬프트 (5회 API 호출 설계)
│   └── customer-support.md             # DM/문의 응대 프롬프트
│
├── data/
│   └── mexican-celebrities.json        # 멕시코 유명인 12명 DB
│
├── packages/
│   ├── manseryeok/                     # 만세력 엔진 (미구현)
│   │   ├── CLAUDE.md                   # 계산 규칙 상세
│   │   ├── src/
│   │   ├── data/
│   │   └── tests/
│   ├── saju-engine/                    # 사주 해석 엔진 (미구현)
│   │   ├── CLAUDE.md
│   │   ├── src/
│   │   └── tests/
│   ├── web/                            # Next.js 웹서비스 (미구현)
│   │   └── REPORT-STRUCTURE.md         # 리포트 구조 설계 (용용사주 스크래핑 기반)
│   └── instagram-bot/                  # Instagram 자동화 (미구현)
│       ├── CLAUDE.md
│       ├── src/
│       └── templates/
│
└── scripts/
```

---

## 5. 만세력(萬歲曆) 엔진 설계

외부 API 없이 양력 생년월일시 → 사주 4기둥 계산. 이것이 서비스의 핵심이자 가장 어려운 부분.

### 4기둥 계산 로직

**년주 (Year Pillar)**
- 입춘(立春) 이전 출생 → 전년도 간지
- 천간: (양력년 - 4) % 10
- 지지: (양력년 - 4) % 12

**월주 (Month Pillar)**
- 절기(節) 기준으로 월 결정 (절입 시각 이전 → 전월)
- 천간: 년간 기준 월건표(月建表)로 결정
- 지지: 인월(1월)~축월(12월) 고정 순환

**일주 (Day Pillar)**
- 기준일(1900-01-01 = 갑자) + 경과일수 → 60갑자 순환
- JD(율리우스일) 활용 권장

**시주 (Hour Pillar)**
- 출생시각 → 12지지 매핑 (23:00~01:00=자, 01:00~03:00=축, ...)
- 천간: 일간 기준 시두법(時頭法)으로 결정

### 핵심 데이터
- 천간 10개: 갑을병정무기경신임계
- 지지 12개: 자축인묘진사오미신유술해
- 60갑자: 천간×지지 조합 (60주기)
- 24절기 중 절(節) 12개가 월 구분 기준
- 절기 정밀도: 분 단위, 1900-2100년 데이터 필요

### 테스트 전략
알려진 사주 100개 이상과 대조 검증.

---

## 6. 유료 리포트 구조 (용용사주 스크래핑 분석 기반)

### 판매 페이지 (무료 → 유료 전환)
1. 사주 차트 헤더 (4기둥 시각화)
2. 3대 사건 예고 ("2026년 11월 — 운명의 상대와의 만남", 일부 가림)
3. 성향 분석 (4축 바 차트: 에너지/판단/관계/행동)
4. 특화 영역 티저 (재물운 가림 처리)
5. 8대 영역 카드 슬라이더
6. 운명의 짝/악인 프로필 카드 (일부 가림)
7. 보장 3가지 (전문가 검증, 차트 제공, 합리적 가격)
8. 상세 목차 전체 공개 (볼륨감 전달)
9. 후기 + 실시간 구매 알림
10. CTA + 할인 카운트다운 타이머

### 유료 리포트 본문 (8 Chapter, 30+ 항목)

**CAPÍTULO 01: Tu Carta Saju (명식풀이)**
- 사주명식 풀이
- 타고난 성향 (에너지/판단/관계/행동)
- 성격 장점과 치명적 단점
- 첫인상과 현재 인상

**CAPÍTULO 02: Tu Destino en el Amor (연애운)**
- 연애운이 들어오는 정확한 시기
- 점지된 연애 상대 (외모, 나이, 성격)
- 연애 상대와의 첫 만남 시나리오
- 이성을 홀리는 매력 비법

**CAPÍTULO 03: Tu Destino Financiero (재물운)**
- 재물운이 트이는 대운 시기
- 사업 vs 직장 적합도
- [경고] 금전 손실 주의 시기
- 맞춤 투자법

**CAPÍTULO 04: Matrimonio y Familia (결혼/가정운)**
- 운명의 짝 예측 (외모, 성격, 직업)
- 만남/결혼 시기
- 점지된 자녀 수

**CAPÍTULO 05: Logros y Carrera (성취운)**
- 타고난 재능
- 커리어 전환 타이밍
- 이직/승진 시기
- 추천 부업

**CAPÍTULO 06: Relaciones (관계운)**
- 귀인 특징 및 등장시기
- 악인 특징 및 등장시기
- 인정받고 신뢰 얻는 비법

**CAPÍTULO 07: Salud (건강운)**
- 타고난 약한 신체 부위
- [경고] 큰 병/사고 위험 시기
- 체질 맞춤 식단
- 사주 맞춤 운동법

**CAPÍTULO 08: Tu Guía de Buena Fortuna (개운법)**
- 올해 피해야 할 것 3가지
- 올해 해야 할 것 3가지
- 사주 맞춤 개운법
- 행운 장소/색/숫자 총정리

### 리포트 생성: Claude API 5회 분할 호출
시스템 프롬프트 캐싱 적용. 상세 설계: `packages/web/REPORT-STRUCTURE.md`

---

## 7. Instagram 콘텐츠 전략

### 주간 콘텐츠 배분
| 요일 | 콘텐츠 | 퍼널 역할 |
|------|--------|----------|
| 월 | **유명인 사주 캐러셀** | 후킹/유입 |
| 화 | 일일 운세 | 채널 활성화 |
| 수 | 교육 또는 성격 카드 | 관심 유지 |
| 목 | **유명인 사주 캐러셀** | 후킹/유입 |
| 금 | 일일 운세 | 채널 활성화 |
| 토 | **유명인 사주** 또는 궁합 | 후킹/공유 |
| 일 | 후기 카드 | 신뢰/전환 |

### 유명인 사주 캐러셀 5장 구성
1. **HOOK**: 자극적 제목 + 유명인 이미지 설명
2. **CHART**: 사주 4기둥 시각화 + 오행 컬러 원형 + 핵심 요약
3. **ANALYSIS**: 성격/커리어와 사주 매칭 상세 분석
4. **TIMING**: 대운 타이밍 분석 → "소름" 유도
5. **CTA**: 후기 + 웹 전환

### 멕시코 유명인 DB (12명)
Canelo Álvarez, Peso Pluma, Salma Hayek, Luis Miguel, Checo Pérez,
Eugenio Derbez, Thalía, Frida Kahlo, Christian Nodal, Luisito Comunica,
Gael García Bernal, Selena Quintanilla
(각각 생년월일, 특성, 후킹 문구, 해시태그 포함 — data/mexican-celebrities.json)

---

## 8. 스페인어 콘텐츠 규칙

- 멕시코 스페인어: tú/ustedes 사용
- 사주 용어: 한국어 원어 + 스페인어 병기 → "Tu pilar del día (일주)"
- 오행: Madera(목) Fuego(화) Tierra(토) Metal(금) Agua(수)
- 12지지: Rata(자) Buey(축) Tigre(인) Conejo(묘) Dragón(진) Serpiente(사) Caballo(오) Cabra(미) Mono(신) Gallo(유) Perro(술) Cerdo(해)
- 서양 점성술과 비교하되 동일시 금지
- 자연 메타포 활용 (화산, 바다, 정글, 사막 — 멕시코 문화)
- 가족, 공동체, 회복력 — 멕시코 핵심 가치 반영

---

## 9. UI 디자인 사양 (용용사주 기반)

- 다크 틸/그린 배경 (#0a2a2a 계열)
- max-width: 448px (모바일 퍼스트)
- 풀스크린 배경 이미지 (AI 생성, 몽환적)
- 오행 컬러: verde(#4CAF50) rojo(#F44336) amarillo(#FFC107) blanco(#E0E0E0) azul(#2196F3)
- 사주 차트: 4열 그리드 + 오행 컬러 원형 배지 + 한자
- 대운 그래프: 곡선 라인 차트
- 가림 처리: blur 또는 "가려진내용" 텍스트
- 실시간 구매 알림 팝업 + 카운트다운 타이머
- 폰트: 본문 Pretendard/SUIT 계열, 강조 명조체 (동양적 권위감)
- 이미지 포맷: WebP, lazy loading

---

## 10. 구현 로드맵

| Phase | 내용 | 상태 |
|-------|------|------|
| **Phase 0** | Claude 세팅, MD, 에이전트, 커맨드, 리포트 구조 설계 | **완료** |
| **Phase 1** | 만세력 엔진 TypeScript 구현 (packages/manseryeok/) | **다음 단계** |
| Phase 2 | 웹서비스 MVP (Next.js + Supabase + MercadoPago) | 미착수 |
| Phase 3 | Instagram 자동화 (Meta API + 콘텐츠 파이프라인) | 미착수 |
| Phase 4 | 고도화 (대운/세운, 궁합, 구독 모델, A/B 테스트) | 미착수 |

---

## 11. 에이전트 프롬프트 요약

프로젝트 내 `agents/` 폴더에 4개 에이전트 프롬프트가 있다:

1. **celebrity-saju.md** — 유명인 사주 캐러셀 5장 생성. 슬라이드별 구성, 톤, 셀러브리티 카테고리, 해시태그 전략 포함.
2. **content-creator.md** — 7가지 Instagram 콘텐츠 타입 (celebrity_saju 최우선). 이미지 디렉션, CTA 템플릿, engagement 프롬프트 포함.
3. **saju-interpreter.md** — 유료 리포트 본문 생성. 5회 API 호출별 섹션 구성. 십신 스페인어 아키타입, 일간 자연물 메타포 10종 포함.
4. **customer-support.md** — DM/문의 응대. 가격 안내, 생년월일 수집, 웹 전환 유도.

---

## 12. 파일별 역할 요약

| 파일 | 역할 |
|------|------|
| `CLAUDE.md` | 프로젝트 전체 컨텍스트. AI가 매 대화 시작 시 읽어야 할 핵심 정보 |
| `packages/manseryeok/CLAUDE.md` | 만세력 계산 규칙 (년주/월주/일주/시주 계산법, 절기 기준) |
| `packages/saju-engine/CLAUDE.md` | 사주 해석 로직 (십신 매핑, Claude API 프롬프트 설계) |
| `packages/instagram-bot/CLAUDE.md` | 인스타 파이프라인, 콘텐츠 타입/빈도, Meta API 규격 |
| `packages/web/REPORT-STRUCTURE.md` | 리포트 판매 페이지 + 유료 본문 전체 설계 (용용사주 스크래핑 기반) |
| `agents/*.md` | Claude API 호출 시 사용할 시스템 프롬프트 |
| `data/mexican-celebrities.json` | 유명인 12명 DB (생년월일, 특성, 후킹 문구) |
| `.claude/commands/*.md` | 반복 작업 자동화 커맨드 |
| `.env.example` | 필요한 API 키 목록 |

---

## 13. 주의사항 / 비즈니스 규칙

- 만세력 년주는 **입춘(立春)** 기준. 양력 1/1이 아님
- 월주는 **절기(節)** 기준. 음력 1일이 아님
- 사주 해석에서 절대 운명론적/부정적 표현 금지
- 멕시코 결제는 반드시 MercadoPago (Stripe는 멕시코 보급률 낮음)
- OXXO 현금결제 지원 필수 (은행 없는 인구 비율 높음)
- 서양 점성술과 비교하되 동일시하지 않기
- 유명인 콘텐츠에서 사생활/건강/죽음 예측 절대 금지
