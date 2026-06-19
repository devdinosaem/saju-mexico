# 사주 리포트 구조 설계

용용사주(yongyong.ai) 실제 스크래핑 분석 기반 (2026-06-20 기준).

## 레퍼런스 핵심 구조 (용용사주 실제 분석)

### 기술 스택
- Next.js (App Router, RSC)
- Tailwind CSS
- max-width: 448px (모바일 퍼스트)
- 이미지: WebP 포맷, CDN 호스팅 (/880033/*.webp — botId별 에셋)
- 폰트: Pretendard, SUIT, Nanum Myeongjo, Do Hyeon
- 트래킹: Facebook Pixel, Naver WCS

### 페이지 구조 (실제 랜딩 = 유료 전환 페이지)
이 페이지는 **리포트 결과가 아니라 판매 페이지**(세일즈 퍼널)임.
일부 내용을 보여주고 나머지를 가려서 결제를 유도하는 구조.

```
[무료 미리보기 영역]
  사주 차트 → 3대 사건 예고 → 성향 분석 → 재물운 티저 → 운명의 짝 티저
[유료 잠금 영역]
  "결제 이후 볼 수 있어요!" + "평생사주 풀이 받기" CTA
[상세 목차 공개]
  8 Chapter 풀이 항목 목록 (뭘 받는지 미리 보여줌)
[신뢰 요소]
  보장 3가지 + 후기 49건 + 실시간 구매 팝업 + 할인 카운트다운
```

---

## 실제 페이지 섹션 구조 (스크래핑 결과)

### Section 1: 사주 차트 헤더
- 클래스: `w-full px-[20px] pt-[40px] pb-[30px]`
- 내용: 사용자 이름, 생년월일, 일주 표시
- 4기둥(시주/일주/월주/년주) 시각화
- 각 기둥에 천간/지지 + ? (유료잠금) 표시
- 이미지: paper.webp (두루마리 배경)

### Section 2: 3대 사건 예고 (후킹)
- 클래스: `relative w-full overflow-visible`
- **핵심 후킹 섹션**: "회원 낭자의 인생을 뒤흔드는 3가지 사건이 보이는군"
- 3개 사건 티저:
  - "2026년 11월 — 운명의 상대와의 만남"
  - "2027년 3월 — 통장에 꽂히는 엄청난 목돈"
  - "202X년 6월 — 해외여행 중 경미한 사고" (일부 가림)
- 이미지: scroll_trait.webp (두루마리 스타일)

### Section 3: 전환 브릿지
- "안좋은 말도 전부 풀어줄 텐데 각오하고 들어보겠소?"
- 캐릭터 이미지 + 대사 스타일

### Section 4: CHAPTER 1 — 명식분석
- 클래스: `flex w-full flex-col items-center px-[20px] py-[100px]`
- **성향 바 차트** (4축):
  - 내향적 55% ←→ 외향적 45%
  - 감성적 60% ←→ 이성적 40%
  - 협조적 75% ←→ 독립적 25%
  - 안정 추구 40% ←→ 모험 추구 60%
- **성격 분석 텍스트** (미리보기):
  - "큰 그림을 그리는 덴 완벽하지만 작은 마무리에서 실수하는 사주"
  - 2-3 문단 분석 후 "..." + "리포트에서 더 깊은 풀이가 제공됩니다"로 잠금
- 이미지: scene_analyze.webp

### Section 5: CHAPTER 2 — 영역별 사주풀이 (티저)
- 재물운 집중 티저:
  - "회원 낭자 사주에 돈 냄새가 진동을 하는군"
  - 재물운 분석 일부 공개 후 "████년 ██월" 가림 처리
  - "결제 이후 볼 수 있어요!" + CTA 버튼
- **8대 영역 카드 슬라이더** (가로 스크롤):
  - 연애운: 시기, 상대, 매력 비법
  - 재물운: 대운 시기, 손실 주의, 투자법
  - 결혼 및 가정운: 배우자 예측, 자녀 수, 결혼 후 운
  - 성취운: 재능, 커리어 전환, 승진
  - 관계운: 귀인, 악인, 인정받는 비법
  - 건강운: 체질, 사고 시기, 운동법
- 이미지: wealth_scene.webp, toc_4.webp

### Section 6: CHAPTER 3 — 인생을 뒤흔들 사람들
- **운명의 짝 프로필 카드**:
  - 외모: "181cm · 가려진내용 · 체격있는편"
  - 성격: "가려진내용 · 책임감"
  - 직업: "가려진내용"
  - 특징: "일찍취업 · 가려진내용"
- **악인 프로필 카드**:
  - 외모: "161cm · 가려진내용 · 가려진내용"
  - 성격: "가려진내용 · ESTJ"
  - 피해규모: "가려진내용"
  - 주의시기: "2027년 03월"
- 이미지: scene_fate.webp, man_hero.webp, villain_hero.webp

### Section 7: 보장 3가지 (신뢰 구축)
1. "역술가 18인이 검증한 정확성" — 궁통보감, 토정비결 기반
2. "그래프 및 차트 제공" — 운세 흐름 그래프 미리보기
   - 2025(62%) → 2030(45%) → 2035(78%) → 2040(55%) → 2045(92%,최고조) → 2050(70%)
   - 레이더 차트: 연애운/재물운/결혼운/성취운/관계운/건강운/직장운/학업운
3. "타사 대비 가장 합리적인 가격" — 5만 개 후기 강조

### Section 8: TABLE OF CONTENTS — 상세목차
전체 목차를 공개하여 "이만큼 받는다"는 볼륨감 전달:

**CHAPTER 01: 내 사주 명식 풀이**
- 풀이 1: 회원님의 사주명식 풀이
- 풀이 2: 회원님이 타고난 성향 (에너지/판단/관계/행동)
- 풀이 3: 회원님의 성격 장점과 치명적 단점
- 풀이 4: 남들이 보는 첫인상과 현재 인상

**CHAPTER 02: 연애운 심층 풀이**
- 풀이 1: 연애운이 들어오는 정확한 시기
- 풀이 2: 내게 점지된 연애 상대 (외모, 나이, 성격)
- 풀이 3: 연애 상대와의 첫 만남 시나리오
- 풀이 4: 이성들을 홀리는 회원님만의 매력 비법

**CHAPTER 03: 재물운 심층 풀이**
- 풀이 1: 재물운이 트이는 부(富)의 대운 시기
- 풀이 2: 사업 vs 직장, 나와 맞는 직업은?
- 풀이 3: [경고] 싹 다 잃을 수 있는, 금전 손실 주의 시기
- 풀이 4: 큰돈 벌어줄 회원님 맞춤 투자법

**CHAPTER 04: 결혼 및 가정운 심층 풀이**
- 풀이 1: 나와 결혼할 운명의 짝 예측 (외모, 성격, 직업)
- 풀이 2: 운명의 짝을 만나는 시기와 결혼 시기
- 풀이 3: 내게 점지된 자녀 수

**CHAPTER 05: 성취운 심층 풀이**
- 풀이 1: 내가 타고난 나의 재능
- 풀이 2: 커리어 전환 타이밍
- 풀이 3: 이직운 및 승진운이 들어오는 정확한 시기
- 풀이 4: 일 100만원은 벌어줄 부업 추천

**CHAPTER 06: 관계운 심층 풀이**
- 풀이 1: 귀인 특징 및 등장시기
- 풀이 2: 악인 특징 및 등장시기
- 풀이 3: 남들에게 인정받고 신뢰를 얻는 비법

**CHAPTER 07: 건강운 심층 풀이**
- 풀이 1: 내 사주가 타고난 약한 신체 부위
- 풀이 2: [경고] 큰 병·사고 올 수 있는 위험 시기
- 풀이 3: 내가 타고난 신체 기질에 맞춘 식단 추천
- 풀이 4: 건강한 체질 만드는 사주 맞춤 운동법

**CHAPTER 08: 평생사주 개운법**
- 풀이 1: 올해 반드시 피해야 할 것 3가지
- 풀이 2: 올해 반드시 해야 할 것 3가지
- 풀이 3: 나쁜 운도 뒤집는 사주 맞춤 개운법
- 풀이 4: 나와 맞는 장소·색·숫자 총정리

### Section 9: 후기 섹션
- 49건 후기 카루셀
- 이메일(일부 가림) + 일주 + 별점 + 날짜 + 본문
- 실시간 구매 알림: "박*수님이 2분전에 구매했어요"

### Section 10: CTA (최종 전환)
- 특별 할인 카운트다운 타이머 (00:18:13)
- "평생사주 리포트 보기" 버튼

---

## 핵심 전환 기법 분석

### 1. 가림 처리 (Blur/Mask)
- 핵심 정보를 일부만 공개: "20██년 ██월", "가려진내용"
- 궁금증 극대화 → 결제 유도
- **우리 적용**: 무료 기본 분석에서 오행 분포만 공개, 나머지 가림

### 2. 구체적 예언 (후킹)
- "2026년 11월 — 운명의 상대와의 만남" (연/월 특정)
- "통장에 꽂히는 엄청난 목돈" (구체적 자극)
- **우리 적용**: "En noviembre de 2026, conocerás a alguien especial..."

### 3. 인물 프로필 카드 (운명의 짝/악인)
- 키, 체형, MBTI, 직업까지 구체적 묘사
- 마치 실제 프로필처럼 카드 형태
- **우리 적용**: "Tu pareja destinada" 카드 — 키/성격/직업 일부 공개

### 4. 실시간 사회적 증거
- "박*수님이 2분전에 구매했어요" (실시간 팝업)
- 49건 후기 + 별점
- **우리 적용**: "Mar***@gmail.com compró hace 3 minutos"

### 5. 긴박감 (Urgency)
- 카운트다운 타이머
- "특별 할인" 라벨
- **우리 적용**: "Oferta especial — 00:15:00"

### 6. 볼륨감 = 가치 인식
- "최대 6만자 리포트" 강조
- 상세 목차 전체 공개 (8 Chapter, 30+ 풀이 항목)
- **우리 적용**: "Reporte completo de +15,000 palabras, 8 capítulos"

---

## 우리 리포트 구조 (멕시코 현지화)

### 판매 페이지 (무료 → 유료 전환)

용용사주와 동일한 "티저 → 잠금 → 목차 → 신뢰 → CTA" 구조 적용.

```
[1] 사주 차트 헤더 (무료)
    — 4기둥 시각화, 이름, 생년월일

[2] 3대 사건 예고 (무료, 일부 가림)
    — "3 eventos que cambiarán tu vida"
    — 연/월 일부 가림: "202X년 ██월"

[3] 성향 분석 (무료)
    — 4축 바 차트 (에너지/판단/관계/행동)
    — 성격 분석 2문단 + "..." 잠금

[4] 특화 영역 티저 (일부 가림)
    — 가장 강한 운세 1개 집중 티저
    — 핵심 시기 가림 + "Desbloquea tu reporte completo"

[5] 8대 영역 카드 (목차 역할)
    — Amor / Dinero / Matrimonio / Logros / Relaciones / Salud + 개운법
    — 각 영역별 3-4개 풀이 항목 리스트

[6] 운명의 사람들 (일부 가림)
    — Tu Pareja Destinada: 키/성격/직업 일부 공개
    — Tu Persona de Cuidado: 주의 인물 프로필

[7] 보장 3가지
    — 전문가 검증 / 시각적 차트 / 합리적 가격

[8] 상세 목차 (전체 공개)
    — 8 Chapter, 30+ 항목

[9] 후기 + 실시간 구매 알림

[10] CTA + 할인 타이머
```

### 유료 리포트 본문 (8 Chapter)

**CAPÍTULO 01: Tu Carta Saju (명식풀이)**
- Tu carta Saju completa (4 기둥 상세)
- Tu personalidad innata (4축 성향 + 상세)
- Tus fortalezas y tu talón de Aquiles (장점/단점)
- Tu primera impresión vs tu verdadero yo (첫인상/진짜 모습)

**CAPÍTULO 02: Tu Destino en el Amor (연애운)**
- El momento exacto en que el amor llega
- Tu pareja destinada (외모, 나이, 성격)
- Cómo será tu primer encuentro
- Tu arma secreta de seducción

**CAPÍTULO 03: Tu Destino Financiero (재물운)**
- Tu gran ciclo de riqueza (대운 시기)
- ¿Negocio propio o empleo? Tu camino ideal
- [Alerta] Periodo de riesgo financiero
- Tu estrategia de inversión personalizada

**CAPÍTULO 04: Matrimonio y Familia (결혼/가정운)**
- Tu pareja ideal (외모, 성격, 직업 예측)
- Cuándo conocerás a tu pareja y cuándo casarte
- Cuántos hijos te depara el destino

**CAPÍTULO 05: Logros y Carrera (성취운)**
- Tu talento innato
- El mejor momento para cambiar de carrera
- Cuándo llegan ascensos y oportunidades
- Un negocio secundario hecho para ti

**CAPÍTULO 06: Relaciones y Personas Clave (관계운)**
- Tu ángel guardián: características y cuándo aparece
- Tu persona tóxica: características y cuándo aparece
- Cómo ganarte el respeto y la confianza de todos

**CAPÍTULO 07: Salud y Bienestar (건강운)**
- Tus puntos débiles de salud
- [Alerta] Periodos de riesgo de accidentes/enfermedades
- Dieta personalizada según tu constitución
- Ejercicios ideales para tu cuerpo

**CAPÍTULO 08: Tu Guía de Buena Fortuna (개운법)**
- 3 cosas que DEBES evitar este año
- 3 cosas que DEBES hacer este año
- Cómo revertir la mala suerte (tu fórmula personal)
- Tus lugares, colores y números de suerte

---

## UI 사양 (용용사주 기반)

### 레이아웃
- max-width: 448px (모바일 최적화)
- 풀스크린 섹션 전환
- `<section>` 태그 기반 구분
- padding: px-[20px], py-[40px~100px]

### 이미지 패턴
botId별 전용 에셋 디렉토리:
- `paper.webp` — 두루마리/종이 배경
- `scroll_trait.webp` — 성향 스크롤
- `scene_analyze.webp` — 분석 장면
- `wealth_scene.webp` — 재물 장면
- `scene_fate.webp` — 운명 장면
- `man_hero.webp` / `villain_hero.webp` — 인물 카드
- `report.webp` — 리포트 미리보기
- `toc_4.webp` — 목차 장식

### 색상
- 배경: CSS variable `--dragon-background` (다크 틸/그린)
- 텍스트: `--dragon-foreground` (밝은 회색/흰색)
- 제목: text-white, font-extrabold
- 가림 처리: blur 또는 "가려진내용" 텍스트

### 폰트
- 본문: Pretendard, SUIT
- 강조: Nanum Myeongjo (명조체 = 동양적 권위감)
- 제목: Do Hyeon, Black Han Sans (임팩트)

### 전환 요소
- 실시간 구매 알림 팝업 (하단 고정)
- 카운트다운 타이머 (하단 CTA 영역)
- "가려진내용" 블러 처리
- CTA 버튼: 하단 고정 sticky

---

## Claude API 호출 설계 (리포트 생성)

유료 결제 후 8 Chapter 풀이 생성. 시스템 프롬프트 캐싱 적용.

### 호출 1: Chapter 1 (명식풀이)
- 입력: 4기둥 + 오행 + 십신 JSON
- 출력: 성향 4축 수치 + 성격 분석 + 장단점 + 첫인상

### 호출 2: Chapter 2-3 (연애운 + 재물운)
- 입력: 동일 JSON + 대운/세운
- 출력: 연애 시기/상대/매력 + 재물 대운/투자법

### 호출 3: Chapter 4-5 (결혼운 + 성취운)
- 입력: 동일 JSON + 대운
- 출력: 배우자 프로필/자녀 + 재능/커리어/승진

### 호출 4: Chapter 6-7 (관계운 + 건강운)
- 입력: 동일 JSON
- 출력: 귀인/악인 프로필 + 건강/식단/운동

### 호출 5: Chapter 8 (개운법) + 3대 사건 + 운명의 짝/악인 프로필
- 입력: 이전 호출 요약 + 용신/기신
- 출력: 피해야 할 것/해야 할 것/개운법 + 인물 프로필 카드 데이터

총 5회 호출, 시스템 프롬프트 캐싱으로 2-5회차 토큰 절약.
