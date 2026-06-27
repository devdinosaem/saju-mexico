유저가 사진/이름을 제시하면 그 유명인을 두들 스타일로 묘사한 캐릭터 카드를 생성하고 page.tsx의 "유명인 두들 캐릭터" 섹션에 추가한다.

## 목표 — 최대 재현 충실도

일주 캐릭터(성격 표현)와 달리 유명인 캐릭터는 **외모 재현**이 1순위다.
보는 사람이 사진 없이도 누구인지 즉시 알아봐야 한다.

---

## SVG 스펙

| 항목 | 값 |
|------|----|
| viewBox | `0 0 80 90` |
| 표시 크기 | `w-[120px]` className |
| z-index | `relative z-10` |
| 아웃라인 색 | `#2D2D2D` |
| strokeWidth | 1.5 (주요 윤곽) / 1~1.2 (세부) |
| 스타일 | 두들 플랫, fill 단색, 질감은 선으로만 표현 |

---

## 절차

### 1단계 — 사진 분석 (작업 전 반드시 메모)

아래 항목을 사진에서 추출해 메모한다:

**헤어:**
- 색상: 검정/갈색/금발/회색/은발/백발 등 정확한 톤
- 헤어라인: 앞머리 유무, 이마 노출 정도, 관자놀이 형태(후퇴 여부)
- 스타일: 기장, 볼륨, 웨이브/스트레이트, 방향성(옆가르마/올백 등)
- 특이사항: 반백, 탈색, 인상적인 윤기 등

**얼굴 형태:**
- 형태: 둥근/갸름/네모/넓은
- 피부톤: 밝은 황인(`#FDDCB5`), 어두운 황인(`#EFBA87`), 백인(`#FADDBB`~`#F5C9A4`), 흑인(`#C87941`~`#8B5E3C`) 등
- 인상적인 골격: 넓은 턱, 높은 광대, 뚜렷한 이마 등

**시그니처 피처 — 가장 중요:**
가장 먼저, 이 사람을 이 사람으로 만드는 특징 1~3가지를 골라낸다.
예: 젠슨황 → 직사각 안경 + 블랙 레더재킷 + 은발

**눈썹:**
- 굵기/형태: 두껍고 수평/얇고 아치형/짙게 붙어있는 등

**눈:**
- 크기: 크고 동그란/가늘고 긴/졸린듯한
- 특이점: 쌍꺼풀 두꺼운, 눈가 주름 뚜렷 등

**입:**
- 인상적인 특징만 메모 (모두 그릴 필요 없음)
- 큰 웃음/시크한 무표정/특이한 입모양 등 (코는 그리지 않음)

**의상 — 시그니처 룩:**
- 그 사람을 대표하는 옷차림 (항상 같은 옷을 입는다면 반드시 그것으로)
- 색상, 재질감, 디테일 (지퍼/라펠/넥타인 등)

---

### 2단계 — SVG 제작

#### 그리기 순서 (반드시 이 순서대로)

1. 뒤에 배치할 소품 (등에 든 것, 배경 오브젝트)
2. **헤어** (closed Z path)
3. 얼굴 circle/ellipse
4. 눈썹
5. 안경/모자 등 얼굴 앞 소품
6. 눈
7. 볼 (subtle, opacity 0.2~0.35)
8. 눈가 주름 등 인상적 디테일 (opacity 0.25~0.4)
9. 입
10. 몸통/의상 (base rect → 디테일 레이어 순서)
11. 의상 디테일 (라펠, 지퍼, 광택 등)

---

#### 헤어 렌더링 — 레이어드 기법 (4단계)

단색 fill 하나로 끝내지 않는다. 색상+질감을 레이어로 쌓는다.

```
① 베이스 fill — 헤어 전체 형태를 하나의 닫힌 Z path로
② 정수리/크라운 — 약간 진한 색 fill, opacity 0.4~0.55 (깊이/볼륨)
③ 측두부/하이라이트 — 밝은 색 stroke, strokeWidth 4~6, opacity 0.6~0.75
④ 머리카락 결 방향선 — 얇은 stroke(0.9~1.2), 3쌍(위/중/아래), opacity 0.45~0.65
```

**색상 레이어 예시 — 은발/회색 (젠슨황 패턴):**
```svg
<!-- ① 베이스 — 전체 실버그레이 -->
<path d="M24 29 Q22 17 25 10 Q30 7 40 7 Q50 7 55 10 Q58 17 56 29 Z"
  fill="#9CA3AF" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- ② 정수리 진회색 -->
<path d="M31 9 Q40 7 49 9 Q46 14 40 13 Q34 14 31 9 Z" fill="#6B7280" opacity="0.5"/>
<!-- ③ 측두부 밝은 은발 -->
<path d="M24 29 Q22 19 25 11" stroke="#D1D5DB" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7"/>
<path d="M56 29 Q58 19 55 11" stroke="#D1D5DB" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7"/>
<!-- ④ 결 방향선 (위/중/아래 3쌍) -->
<path d="M27 11 Q33 9 39 10" stroke="#BEC5CE" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.65"/>
<path d="M41 10 Q47 9 53 11" stroke="#BEC5CE" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.65"/>
<path d="M25 18 Q30 16 35 17" stroke="#C8CDD7" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55"/>
<path d="M45 17 Q50 16 55 18" stroke="#C8CDD7" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55"/>
<path d="M24 24 Q28 22 33 23" stroke="#D1D5DB" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.45"/>
<path d="M47 23 Q52 22 56 24" stroke="#D1D5DB" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.45"/>
```

**주요 헤어 컬러 레퍼런스:**

| 헤어 색상 | 베이스 fill | 정수리 어둠 | 측면 하이라이트 | 결 선 |
|-----------|------------|------------|----------------|-------|
| 은발/백발 | `#9CA3AF` | `#6B7280` | `#D1D5DB` | `#BEC5CE` |
| 검정 | `#1F2937` | `#111827` | `#374151` | `#374151` |
| 짙은 갈색 | `#78350F` | `#451A03` | `#92400E` | `#92400E` |
| 금발 | `#FDE68A` | `#FACC15` | `#FEF9C3` | `#FCD34D` |
| 밝은 갈색 | `#B45309` | `#92400E` | `#D97706` | `#CA8A04` |
| 빨간 머리 | `#B91C1C` | `#7F1D1D` | `#DC2626` | `#EF4444` |

#### 헤어라인 형태

헤어라인은 헤어 Z path의 하단 모양으로 결정된다. 사진 특징에 맞게 조정:

- **풍성한 헤어라인**: 측면을 y=30까지 내려서 이마 하단까지 커버
- **후퇴한 관자놀이**: 측면 시작점을 x=26~28 정도로 좁게 (넓은 이마 노출)
- **일자 헤어라인**: 하단을 `L` 직선으로 (Q 곡선 없이)
- **볼드**: 헤어 path 생략, 얼굴 위에 두피 색 ellipse만

---

#### 의상 렌더링 — 복잡한 의상 레이어드 기법

단순 rect 하나로 끝내지 않는다. 의상도 레이어를 쌓아 재질감을 표현한다.

```
① 베이스 rect — 몸통 전체 형태
② 라펠/칼라 path — 의상 구조
③ 안쪽 레이어 path — 내복/셔츠/넥타이 등
④ 디테일 선 — 지퍼/버튼/주름
⑤ 재질 광택/질감 — opacity 낮은 stroke overlay
⑥ 어깨 확장 stroke — 어깨 넓이감
```

**블랙 레더 재킷 예시 (젠슨황 패턴):**
```svg
<!-- ① 몸통 베이스 -->
<rect x="21" y="52" width="38" height="30" rx="3" fill="#111827" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- ② 라펠 좌 -->
<path d="M40 52 L33 64 L21 59" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
<!-- ② 라펠 우 -->
<path d="M40 52 L47 64 L59 59" fill="#1E293B" stroke="#2D2D2D" strokeWidth="1.2" strokeLinejoin="round"/>
<!-- ③ 안쪽 V넥 티셔츠 -->
<path d="M33 64 L40 73 L47 64" fill="#0F172A" stroke="#374151" strokeWidth="0.8" strokeLinejoin="round"/>
<!-- ④ 지퍼선 -->
<line x1="40" y1="73" x2="40" y2="82" stroke="#374151" strokeWidth="1" opacity="0.45"/>
<!-- ⑤ 가죽 광택 -->
<path d="M23 58 Q25 55 27 60" stroke="#374151" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
<path d="M53 58 Q55 55 57 60" stroke="#374151" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
<!-- ⑥ 어깨 확장 -->
<path d="M21 53 Q15 58 14 65" stroke="#111827" strokeWidth="5" strokeLinecap="round" fill="none"/>
<path d="M59 53 Q65 58 66 65" stroke="#111827" strokeWidth="5" strokeLinecap="round" fill="none"/>
```

---

#### 안경 — 정밀 렌더링

안경은 많은 유명인의 핵심 특징이다. 프레임 모양을 사진과 최대한 일치시킨다.

**직사각형 얇은 프레임 (젠슨황 스타일):**
```svg
<rect x="24" y="31" width="12.5" height="8" rx="1.5" fill="none" stroke="#1F2937" strokeWidth="1.8"/>
<rect x="43.5" y="31" width="12.5" height="8" rx="1.5" fill="none" stroke="#1F2937" strokeWidth="1.8"/>
<path d="M36.5 35.5 Q40 34.5 43.5 35.5" stroke="#1F2937" strokeWidth="1.3" fill="none"/>
<line x1="14" y1="34.5" x2="24" y2="34.5" stroke="#1F2937" strokeWidth="1.2"/>
<line x1="56" y1="34.5" x2="66" y2="34.5" stroke="#1F2937" strokeWidth="1.2"/>
```

**둥근 원형 프레임 (빈티지/레트로 스타일):**
```svg
<circle cx="30.5" cy="35" r="7" fill="none" stroke="#1F2937" strokeWidth="1.8"/>
<circle cx="49.5" cy="35" r="7" fill="none" stroke="#1F2937" strokeWidth="1.8"/>
<line x1="37.5" y1="35" x2="42.5" y2="35" stroke="#1F2937" strokeWidth="1.3"/>
<line x1="14" y1="34" x2="23.5" y2="35" stroke="#1F2937" strokeWidth="1.2"/>
<line x1="57" y1="35" x2="66" y2="34" stroke="#1F2937" strokeWidth="1.2"/>
```

**렌즈 착색 (선글라스):**
```svg
<!-- 안경 그린 후, 렌즈 위치에 반투명 fill 추가 -->
<rect x="24" y="31" width="12.5" height="8" rx="1.5" fill="#374151" opacity="0.75"/>
<rect x="43.5" y="31" width="12.5" height="8" rx="1.5" fill="#374151" opacity="0.75"/>
```

---

#### 얼굴 디테일 — 인상적 특징에 집중

모든 요소를 다 그리지 말고, 그 사람의 특징적인 부분에 집중한다.

**눈썹 (굵기 중요):**
```svg
<!-- 두껍고 수평한 눈썹 (강한 인상) -->
<path d="M26 29 Q31 27 36 29" stroke="#374151" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
<!-- 얇고 아치형 눈썹 (부드러운 인상) -->
<path d="M26 29 Q31 26.5 36 29" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
```

**눈가 주름 (나이/인상 표현):**
```svg
<!-- 미소 주름 (눈꼬리 바깥) -->
<path d="M22 39 Q20 41 22 43" stroke="#C47B5A" strokeWidth="0.8" fill="none" opacity="0.28"/>
<path d="M58 39 Q60 41 58 43" stroke="#C47B5A" strokeWidth="0.8" fill="none" opacity="0.28"/>
```

**볼:**
```svg
<!-- 통통한 볼 — opacity 0.2~0.25 -->
<ellipse cx="27" cy="41" rx="4.5" ry="2.8" fill="#FCA5A5" opacity="0.22"/>
<ellipse cx="53" cy="41" rx="4.5" ry="2.8" fill="#FCA5A5" opacity="0.22"/>
```

**치아 드러나는 환한 미소:**
```svg
<path d="M30 44 Q40 51 50 44" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
<path d="M31 44 Q40 50 49 44 L49 46.5 Q40 53 31 46.5 Z" fill="white" stroke="#2D2D2D" strokeWidth="0.6"/>
```

---

### 3단계 — 배경 디자인

배경은 그 사람의 도메인/정체성을 시각화한다.

**구성:**
- 배경 div: `bg-gradient-to-b from-[연한색] to-[더연한색] rounded-2xl p-6 border-2 border-[테마색]/25`
- 배경 SVG: `viewBox="0 0 200 200"`, `absolute inset-0 w-full h-full`, opacity **0.08~0.15**

**도메인별 배경 아이디어:**

| 도메인 | 테마 색 | 배경 모티프 |
|--------|---------|------------|
| IT/테크 CEO | 초록/청록 | 회로기판 선+점, IC칩 rect |
| 음악가 | 보라/핑크 | 음표, 물결(사운드웨이브), 별 |
| 스포츠선수 | 파랑/빨강 | 스포츠 공, 속도선, 숫자 |
| 배우/연예인 | 금/노랑 | 별, 스파클, 카메라, 마이크 |
| 과학자 | 청보라 | 분자구조, 수식, 원자 |
| 기업가/경영자 | 남색/회색 | 그래프, 화살표, 달러 |
| 예술가 | 다색 | 붓, 팔레트, 물감 방울 |

**배경 SVG 예시 — 회로기판 (NVIDIA/테크):**
```svg
<svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
  <rect x="18" y="18" width="44" height="28" rx="3" stroke="#4ADE80" strokeWidth="0.8" opacity="0.15" fill="none"/>
  <line x1="62" y1="32" x2="95" y2="32" stroke="#4ADE80" strokeWidth="0.8" opacity="0.1"/>
  <circle cx="95" cy="32" r="2.5" fill="#4ADE80" opacity="0.12"/>
  <rect x="138" y="58" width="44" height="32" rx="3" stroke="#4ADE80" strokeWidth="0.8" opacity="0.12" fill="none"/>
  <line x1="160" y1="90" x2="160" y2="114" stroke="#4ADE80" strokeWidth="0.8" opacity="0.1"/>
  <circle cx="160" cy="116" r="2.5" fill="#4ADE80" opacity="0.1"/>
</svg>
```

---

### 4단계 — 카드 완성 및 page.tsx 삽입

**카드 JSX 구조:**
```jsx
{/* [이름] */}
<div className="flex flex-col items-center gap-3">
  <div className="bg-gradient-to-b from-[{연한테마색}] to-[{더연한색}] rounded-2xl p-6 border-2 border-[{테마색}]/25 w-full flex justify-center relative overflow-hidden">
    {/* 배경 장식 SVG */}
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
      {/* 도메인 테마 패턴 */}
    </svg>
    {/* 캐릭터 SVG */}
    <svg viewBox="0 0 80 90" className="w-[120px] relative z-10" fill="none">
      {/* 헤어 → 얼굴 → 이목구비 → 의상 순서 */}
    </svg>
  </div>
  <p className="font-bold text-sm">{"{이모지} {한글이름}"}</p>
  <p className="text-xs text-gray-500 text-center">{"{영문이름} · {직함/설명}"}</p>
</div>
```

**삽입 위치:** `page.tsx`의 `유명인 두들 캐릭터` 섹션 — `grid grid-cols-3` div 안에 추가.
기존 캐릭터 바로 다음에 붙인다 (div depth 주의).

---

## 레퍼런스 — 젠슨 황 (기준 캐릭터)

```
외모 분석:
- 헤어: 실버그레이 (#9CA3AF 베이스), 정수리 약간 진함, 측두부 밝은 은발
- 헤어라인: 측면 y=29 수준, 이마 약간 노출
- 얼굴: circle cx=40 cy=36 r=15, 피부 #EFBA87 (어두운 황인)
- 눈썹: 굵고 수평 strokeWidth="2.2", 색 #374151
- 안경: 직사각 얇은 프레임, lens 12.5×8, rx=1.5, #1F2937
- 눈: 안경 안쪽 작은 원 r=2.3, 흰 하이라이트
- 볼: 매우 연한 핑크 FCA5A5, opacity 0.22
- 눈가주름: C47B5A, opacity 0.28
- 입: 치아 드러나는 환한 미소
- 의상: 블랙 레더재킷 #111827 + 라펠 #1E293B + V넥 티 #0F172A + 가죽 광택

배경: NVIDIA 초록 그라데이션 from-[#ECFDF5] to-[#D1FAE5], 회로기판 패턴 #4ADE80
```

---

## 규칙

- 오행 뱃지 없음 (일주 캐릭터 전용)
- 일주 성별 규칙(circle/ellipse) 미적용 — 사진에서 직접 판단
- 헤어는 반드시 닫힌 Z path (삼각형 방지)
- **🚨 코 절대 표현 금지** — 아무리 인상적인 코라도 그리지 않는다. 얼굴은 눈·눈썹·입·볼만으로 구성
- **시그니처 피처에 가장 많은 시간을 투자한다** — 나머지는 단순화해도 됨
- 배경 opacity는 0.08~0.15 이하로 (캐릭터보다 눈에 띠면 안됨)
- 캡션: 이모지 + 한글이름 (bold) / 영문이름 · 직함 (gray text)
- 추가 후 wrapper div depth 확인 (`npx tsc --noEmit`으로 구조 에러 체크)

## 입력

$ARGUMENTS — 유명인 이름 또는 사진 (사진이 있으면 사진 우선)
