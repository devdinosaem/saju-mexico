유저가 제시한 일주 유형에 맞는 두들 캐릭터 시안을 생성한다.

## 결과물 스펙 (절대 변경 금지)

### 캐릭터 SVG
- **viewBox**: `0 0 80 90` (가로 80, 세로 90 — 약간 세로가 긴 비율)
- **표시 크기**: `w-[120px]` (className)
- **z-index**: `relative z-10` (배경 위에 올라감)
- **스타일**: 두들 스타일 가이드 준수 (#2D2D2D 아웃라인, strokeWidth 1.5~2, flat fill, 볼터치)
- **구성**: 머리(얼굴+표정) + 몸통 + 특성 소품 (일주 이름에서 추출)

### 배경
- **카드 div**: `bg-gradient-to-b from-[{오행색 연한}] to-[#FDF6EE] rounded-2xl p-6 border-2 border-[#2D2D2D]/10 w-full flex justify-center relative overflow-hidden`
- **배경 장식 SVG**: `viewBox="0 0 200 200"`, `absolute inset-0 w-full h-full`, opacity 0.1~0.3
- **장식 구성**: 일주 특성에 맞는 아이템 4~6개 (스파클, 화살표, 하트, 물방울, 불꽃 등)

### 오행 뱃지
- **위치**: 배경 div 안, `absolute top-3 right-3 w-9 h-9 z-20`
- **viewBox**: `0 0 60 60`
- **구성**: 원형 배경(연한 오행색) + 테두리(진한 오행색, strokeWidth 1.5) + 안쪽 오행 캐릭터

### 오행별 색상 매핑
```
목(木): from-[#D1FAE5], border=#4ADE80, fill=#4ADE80
화(火): from-[#FEE2E2], border=#F87171, fill=#F87171
토(土): from-[#FEF3C7], border=#FBBF24, fill=#FBBF24
금(金): from-[#F1F5F9], border=#94A3B8, fill=#E2E8F0
수(水): from-[#DBEAFE], border=#60A5FA, fill=#60A5FA
```

### 오행 뱃지 SVG (5종 고정 — 그대로 복사해서 사용)
```
목: <circle cx="30" cy="30" r="28" fill="#D1FAE5" stroke="#4ADE80" strokeWidth="1.5"/><rect x="27" y="36" width="6" height="12" rx="2" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/><circle cx="30" cy="26" r="13" fill="#4ADE80" stroke="#2D2D2D" strokeWidth="1.5"/><circle cx="26" cy="24" r="1.8" fill="#2D2D2D"/><circle cx="34" cy="24" r="1.8" fill="#2D2D2D"/><path d="M27 30 Q30 33 33 30" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>

화: <circle cx="30" cy="30" r="28" fill="#FEE2E2" stroke="#F87171" strokeWidth="1.5"/><path d="M30 6 C30 6 14 22 14 32 A16 16 0 0 0 46 32 C46 22 30 6 30 6Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/><path d="M30 18 C30 18 22 28 22 33 A8 8 0 0 0 38 33 C38 28 30 18 30 18Z" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/><circle cx="26" cy="30" r="1.8" fill="#2D2D2D"/><circle cx="34" cy="30" r="1.8" fill="#2D2D2D"/><path d="M27 36 Q30 39 33 36" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>

토: <circle cx="30" cy="30" r="28" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="1.5"/><path d="M8 46 L30 12 L52 46 Z" fill="#FBBF24" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/><path d="M22 20 L30 12 L38 20" fill="white" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round"/><circle cx="26" cy="32" r="1.8" fill="#2D2D2D"/><circle cx="34" cy="32" r="1.8" fill="#2D2D2D"/><path d="M27 37 Q30 40 33 37" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>

금: <circle cx="30" cy="30" r="28" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5"/><path d="M30 6 L50 22 L30 50 L10 22 Z" fill="#E2E8F0" stroke="#2D2D2D" strokeWidth="1.5" strokeLinejoin="round"/><path d="M30 6 L18 22 L42 22 Z" fill="#F1F5F9" stroke="#2D2D2D" strokeWidth="0.8" strokeLinejoin="round"/><circle cx="25" cy="28" r="1.8" fill="#2D2D2D"/><circle cx="35" cy="28" r="1.8" fill="#2D2D2D"/><path d="M27 34 Q30 37 33 34" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>

수: <circle cx="30" cy="30" r="28" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1.5"/><path d="M30 6 C30 6 12 24 12 34 A18 18 0 0 0 48 34 C48 24 30 6 30 6Z" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1.5"/><circle cx="25" cy="30" r="1.8" fill="#2D2D2D"/><circle cx="35" cy="30" r="1.8" fill="#2D2D2D"/><path d="M27 36 Q30 39 33 36" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round"/>
```

## 절차

1. `packages/web-kr/src/lib/ilju-types.ts`에서 해당 일주 유형 데이터를 읽는다 (이름, 강점, 약점, 대사, emoji, stemElement)
2. **🚨 일주 ID에서 성별을 반드시 확인한다**: `-m` = 남성, `-f` = 여성. 이것을 먼저 메모하고 시작한다.
   - 예: "갑자-m" → 남성 → 짧은 머리 + 넓은 어깨
   - 예: "을묘-f" → 여성 → 아래 **여성 헤어스타일 5종**(장발/웨이브단발/롱웨이브/양갈래/잔잔단발) 중 하나 + 선명한 볼터치. ❌ 짧고 밋밋한 랩 금지
3. `packages/web-kr/DOODLE-STYLE-GUIDE.md`를 읽어서 두들 스타일 규칙을 확인한다
4. 일주 이름에서 **핵심 모티프**를 추출한다:
   - "인간 불도저" → 불도저/헬멧/바퀴
   - "츤데레 본체" → 반반 몸통(물+불)/쿨한 눈/숨긴 하트
   - "걱정 삭제 담당" → 곰/포옹/따뜻한 눈
5. stemElement에서 오행을 확인하고, 해당 오행 색상/뱃지를 적용한다
6. **위 스펙대로** 캐릭터 SVG + 배경 + 뱃지를 조합한 완성 카드를 생성한다
7. `packages/web-kr/src/app/preview-ilju/page.tsx`의 캐릭터 시안 영역에 추가한다

## 입력

$ARGUMENTS — 생성할 일주 ID (예: "갑자-m", "임오-f") 또는 일주 이름 (예: "인간 불도저", "츤데레 본체")

## 규칙

- **위 지침은 최소 기준이다** — 소품, 컬러, 헤어스타일 모두 지침 외에도 캐릭터에 더 잘 어울린다고 판단되면 자유롭게 창작한다. 정해진 목록에 없는 것도 적극 사용해도 된다.
- **동물 표현 허용** — 일주 이름이나 성격을 표현할 때 동물이 더 어울린다고 판단되면 사람 대신 동물 캐릭터로 그려도 된다. 단, 동물도 두들 스타일(#2D2D2D 아웃라인, flat fill, 표정 포함)을 동일하게 적용한다. 동물로 표현할 경우 머리카락 지침(헤어스타일/헤어컬러/민머리 8% 룰 등)은 적용하지 않는다 — 동물 귀·털·뿔 등 해당 동물의 특징으로 대체한다.
- **viewBox, 크기, 비율은 절대 변경하지 않는다** — 모든 캐릭터가 동일한 카드 안에 일관되게 들어가야 함
- 캐릭터는 viewBox 80x90 안에서 적절히 채운다 (너무 작거나 크지 않게)
- 얼굴은 항상 포함: 눈(2개) + 입(1개) + 볼터치(선택)
- **우울한 표정 금지**: 울상, 눈물, 찡그림(슬픔형), 처진 눈꼬리 등 부정적/우울한 표정은 사용하지 않는다. 무표정·시크한 표정은 괜찮으나, 슬프거나 의기소침해 보이는 표현은 제외. 모든 캐릭터는 에너지 있거나 중립적인 표정을 유지한다.
- **🚨 입술(채워진 입) 절대 금지**: 입은 항상 **단순 stroke 곡선 하나**로만 그린다. `fill`로 채운 입(빨강/마룬 입술, 벌린 입 안쪽 채우기, 혀, 이빨 줄)은 만들지 않는다. 남녀 공통.
  - ✅ 올바름: `<path d="M35 44 Q40 47 45 44" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`
  - ❌ 금지: `<path d="M35 44 Q40 49 45 44 Q42 42 40 42 ..." fill="#7F1D1D"/>` (채워진 입/입술)
  - 놀란 표정도 채우지 말고 작은 `<circle ... fill="none" stroke=.../>` 또는 stroke 타원으로.
- **🚨 코 절대 표현 금지**: 어떤 캐릭터도 코(콧대 선·콧방울·코 점 등)를 그리지 않는다. 얼굴은 **눈·눈썹·입·볼터치만**으로 구성한다. 남성·여성·동물·유명인 공통.
- 오행 뱃지는 위 고정 SVG를 그대로 복사 (수정 금지)
- 배경 장식은 opacity 0.1~0.3으로 은은하게
- 한 번에 여러 일주를 받으면 각각 별도 카드로 생성
- preview-ilju에 추가할 때 **wrapper div 닫힘 위치를 확인**한다 (depth 체크)

### 🎨 컬러 규칙 (필수)

- **모노톤 사용 금지**: 회색/무채색 계열을 메인 fill로 쓰지 않는다
- 몸통/소품/헤어에 **서로 다른 색상**을 사용한다 (같은 계열 반복 금지)
- 오행 테마색을 베이스로 쓰되, 포인트 컬러 1~2가지를 추가해 다채롭게 구성
- 소품/장식에 밝고 선명한 색상 적극 활용 (예: #FACC15 노랑, #F87171 빨강, #4ADE80 초록, #60A5FA 파랑, #C084FC 보라, #FB923C 주황)
- 같은 캐릭터 안에서 몸통 색 ≠ 소품 색 ≠ 헤어 색 (3가지 이상 차별화)

### 🚨 성별 표현 규칙 (필수 — SVG 코드 수준까지 반영)

일주 ID의 `-m` / `-f` 를 반드시 확인하고 캐릭터 외형에 반영한다.

---

**남성(-m) SVG 패턴**

공통:
- 눈: 단순 원형/타원
- 볼터치: 작고 연한 타원 (opacity 0.3 이하, 없어도 됨)
- 몸통: rect 또는 사각형 path, rx 작게 (어깨 넓게)
  ```svg
  <rect x="24" y="50" width="32" height="22" rx="4" fill="..."/>
  ```

### 🎨 헤어 컬러 — 자유롭게 선택 (단색 고정 금지)

헤어 fill 색상을 캐릭터 성격/테마에 맞게 다양하게 사용한다. `#92400E` 갈색에 고정하지 말 것.

| 분위기 | 예시 컬러 |
|--------|-----------|
| 강렬/개성 | `#EF4444` 빨강, `#F97316` 주황, `#EAB308` 노랑 |
| 신비/쿨 | `#6366F1` 남색, `#8B5CF6` 보라, `#06B6D4` 하늘 |
| 자연/따뜻 | `#92400E` 갈색, `#1F2937` 검정, `#D1D5DB` 은발 |
| 개성파 | `#4ADE80` 초록, `#F9A8D4` 핑크, `#FDE68A` 금발 |

---

### 👤 민머리 — 남녀 공통 옵션 (사용 빈도 ≤8%)

성격이 강렬하거나, 승려/무사/반항아 스타일에 어울리는 캐릭터에 선택적으로 사용.
전체 캐릭터 중 8%를 넘지 않도록 드물게 사용한다.

**기본 민머리** (완전 민두):
```svg
<!-- 헤어 없음 — 얼굴 타원만 그림 -->
<ellipse cx="40" cy="34" rx="16" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**민머리 + 작은 튀어나온 삐죽 머리** (이미지 참고 — 위로 솟은 작은 뭉텅이):
```svg
<!-- 얼굴 먼저 -->
<ellipse cx="40" cy="36" rx="16" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 위에 솟은 작은 머리 뭉텅이 -->
<ellipse cx="40" cy="20" rx="9" ry="7" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**민머리 + 정수리 상투/리본** (여성형):
```svg
<ellipse cx="40" cy="36" rx="16" ry="15" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 정수리 리본 -->
<path d="M34 22 Q40 18 46 22 Q40 26 34 22 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1"/>
<circle cx="40" cy="22" r="2" fill="#2D2D2D"/>
```

---

### 💇 머리 소품/장식 — 남녀 공통, 자유롭게 추가 (선택)

헤어스타일 위에 소품을 얹어 캐릭터 개성을 강조한다. 없어도 되고, 여러 개 조합도 가능.

**머리끈 / 리본**:
```svg
<!-- 포니테일 머리끈 -->
<circle cx="40" cy="58" r="3" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1"/>
<!-- 큰 리본 (좌우 날개) -->
<path d="M30 14 Q35 10 38 14 Q35 18 30 14Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
<path d="M50 14 Q45 10 42 14 Q45 18 50 14Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
<circle cx="40" cy="14" r="2.5" fill="#2D2D2D"/>
```

**꽃 / 헤어핀**:
```svg
<!-- 꽃 장식 (왼쪽 귀 위) -->
<circle cx="22" cy="26" r="5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="1"/>
<circle cx="18" cy="22" r="3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8"/>
<circle cx="26" cy="22" r="3" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="0.8"/>
<circle cx="22" cy="26" r="2" fill="#F97316"/>
<!-- 헤어핀 (직선 핀) -->
<line x1="54" y1="20" x2="62" y2="28" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
<circle cx="54" cy="20" r="2" fill="#6366F1"/>
```

**헤어밴드 / 머리띠**:
```svg
<path d="M20 28 Q40 18 60 28" stroke="#60A5FA" strokeWidth="4" fill="none" strokeLinecap="round"/>
```

**왕관 / 별 장식**:
```svg
<!-- 작은 왕관 -->
<path d="M28 18 L32 10 L37 16 L40 8 L43 16 L48 10 L52 18 Z"
  fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
<!-- 별 핀 -->
<path d="M58 14 L59.5 10 L61 14 L65 14 L62 17 L63 21 L59.5 19 L56 21 L57 17 L54 14 Z"
  fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.8"/>
```

**모자 / 비니**:
```svg
<!-- 비니 -->
<path d="M20 30 Q20 10 40 8 Q60 10 60 30" fill="#6366F1" stroke="#2D2D2D" strokeWidth="1.5"/>
<rect x="18" y="29" width="44" height="6" rx="3" fill="#4F46E5" stroke="#2D2D2D" strokeWidth="1.5"/>
<circle cx="40" cy="8" r="3.5" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1"/>
<!-- 야구모자 -->
<path d="M20 30 Q20 12 40 10 Q60 12 60 30" fill="#F87171" stroke="#2D2D2D" strokeWidth="1.5"/>
<path d="M18 32 Q14 32 12 30 Q10 28 14 28 L20 30Z" fill="#F87171" stroke="#2D2D2D" strokeWidth="1"/>
```

**뿔/귀 장식** (동물귀, 악마뿔 등 특이 캐릭터용):
```svg
<!-- 곰귀 -->
<circle cx="26" cy="16" r="6" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
<circle cx="26" cy="16" r="3" fill="#FDDCB5"/>
<circle cx="54" cy="16" r="6" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
<circle cx="54" cy="16" r="3" fill="#FDDCB5"/>
<!-- 악마 뿔 -->
<path d="M28 18 Q24 8 30 6 Q32 12 30 18Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1"/>
<path d="M52 18 Q56 8 50 6 Q48 12 50 18Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1"/>
```

---

### 💇‍♀️ 여성 헤어스타일 5종 (closed Z — 얼굴을 감싸며 길게 흐름)

**여성 헤어 핵심**: 닫힌 Z path가 얼굴 양옆을 감싸 **아래로 길게(y64~86) 흘러내린다**. 끝은 스캘롭(물결) 또는 둥근 컷. 짧고 밋밋하게 y50 근처에서 끊지 말 것(아래 ❌ 참조). 색상은 자유(위 헤어 컬러표).

**1. 장발 스트레이트** (깔끔한 긴 생머리):
```svg
<path d="M18 32 Q18 10 40 8 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**2. 웨이브 펌 단발** (옆선이 물결치는 단발):
```svg
<path d="M18 30 Q18 10 40 8 Q62 10 62 30 Q66 38 60 44 Q54 50 62 54 Q66 60 58 64 Q50 68 44 65 Q40 63 36 65 Q30 68 22 64 Q14 60 18 54 Q26 50 20 44 Q14 38 18 30 Z" fill="#FDE68A" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 웨이브 결 (옵션) -->
<path d="M22 36 Q26 33 30 36" stroke="#EAB308" strokeWidth="0.9" fill="none" opacity="0.5"/>
<path d="M50 36 Q54 33 58 36" stroke="#EAB308" strokeWidth="0.9" fill="none" opacity="0.5"/>
```

**3. 롱 웨이브** (길고 물결치는 머리):
```svg
<path d="M16 30 Q16 8 40 6 Q64 8 64 30 Q68 42 62 50 Q56 58 64 66 Q68 74 62 80 Q54 86 46 82 Q40 80 34 82 Q26 86 18 80 Q12 74 16 66 Q24 58 18 50 Q12 42 16 30 Z" fill="#4338CA" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 웨이브 결 (옵션) -->
<path d="M20 40 Q24 36 28 40" stroke="#312E81" strokeWidth="0.9" fill="none" opacity="0.5"/>
<path d="M52 40 Q56 36 60 40" stroke="#312E81" strokeWidth="0.9" fill="none" opacity="0.5"/>
```

**4. 양갈래** (상단 캡 + 좌우 갈래 — 묶음 장식 얹기):
```svg
<!-- 상단 캡 -->
<path d="M22 30 Q22 10 40 8 Q58 10 58 30 Q58 38 50 42 Q40 44 30 42 Q22 38 22 30 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 왼쪽 갈래 -->
<path d="M20 30 Q12 40 14 62 Q16 70 20 68 Q26 64 22 50 Q20 40 22 32 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 오른쪽 갈래 -->
<path d="M60 30 Q68 40 66 62 Q64 70 60 68 Q54 64 58 50 Q60 40 58 32 Z" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 묶음 장식 (별/방울 등) -->
<circle cx="21" cy="30" r="3.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1"/>
<circle cx="59" cy="30" r="3.5" fill="#60A5FA" stroke="#2D2D2D" strokeWidth="1"/>
```

**5. 잔잔한 웨이브 단발** (어깨선 단발):
```svg
<path d="M18 34 Q18 12 40 10 Q62 12 62 34 Q64 46 58 52 Q60 58 56 62 Q48 66 40 64 Q32 66 24 62 Q20 58 22 52 Q16 46 18 34 Z" fill="#22D3EE" stroke="#2D2D2D" strokeWidth="1.5"/>
```

> 헤어 위에 리본·별·머리핀·초승달 등 장식을 얹어 개성을 강화한다(선택).

**❌ 절대 금지 — 짧고 밋밋한 랩 (싸구려 단발):**
```svg
<!-- ❌ y48~53에서 짧게 끊기는 밋밋한 랩 — 여성 헤어로 쓰지 말 것 -->
<path d="M24 30 Q22 14 40 12 Q60 14 58 30 Q55 42 53 48 Q46 53 40 53 Q34 53 27 48 Q25 42 24 30Z" fill="#2D2D2D"/>
```
이 패턴은 길이·웨이브·볼륨이 없어 빈약/싸구려로 보인다. 반드시 위 1~5번처럼 **얼굴을 감싸 길게 흐르는 닫힌 Z**를 사용한다.

---

### 남성 헤어스타일 7종 (캐릭터 성격에 맞게 다양하게 선택)

**1. 숏컷** (귀 완전 노출, 군인컷):
```svg
<!-- 머리 상단 캡만 — 짧고 납작 -->
<path d="M24 30 Q24 14 40 12 Q56 14 56 30" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**2. 투블럭 스트레이트** (옆은 짧고 위는 볼륨 — 한국 남자 국민 헤어):
```svg
<!-- 위쪽 볼륨만. 🚨 사이드 stroke-only path 절대 금지 — 이어머프/헤드폰처럼 보임 -->
<path d="M22 28 Q20 10 40 8 Q60 10 58 28" fill="#92400E" stroke="#2D2D2D" strokeWidth="2"/>
```

**3. 투블럭 퍼머** (위쪽에 웨이브):
```svg
<!-- 웨이브 위쪽 볼륨만. 🚨 사이드 stroke-only path 절대 금지 -->
<path d="M22 28 Q18 18 22 12 Q28 6 40 8 Q52 6 58 12 Q62 18 58 28
  Q54 22 48 26 Q44 28 40 26 Q36 24 32 26 Q26 28 22 28 Z"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**4. 중단발 + 커튼 앞머리** (앞머리가 이마를 가림):
```svg
<!-- 머리 전체 -->
<path d="M20 30 Q20 10 40 8 Q60 10 60 30 Q60 42 58 44" stroke="#92400E" strokeWidth="0" fill="#92400E"/>
<path d="M20 30 Q20 10 40 8 Q60 10 60 30" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 커튼 앞머리 (이마 위를 살짝 덮음) -->
<path d="M26 22 Q30 28 36 26 Q40 24 44 26 Q50 28 54 22"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**5. 중단발 올백** (앞머리 없이 뒤로 넘김):
```svg
<!-- 상단 캡만. 🚨 사이드 stroke-only path 절대 금지 — 이어머프/헤드폰처럼 보임 -->
<path d="M20 30 Q18 10 40 8 Q62 10 60 30" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**6. 중단발 웨이브 퍼머** (전체 웨이브):
```svg
<path d="M18 30 Q16 10 40 8 Q64 10 62 30
  Q66 36 60 40 Q54 44 62 48 Q64 54 58 56 Q50 58 44 56
  Q40 54 36 56 Q30 58 22 56 Q16 54 18 48
  Q26 44 20 40 Q14 36 18 30 Z"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**7. 장발 스트레이트** (귀 덮고 뒷목까지):
```svg
<path d="M18 30 Q18 10 40 8 Q62 10 62 30 L62 64 Q56 72 48 70 Q40 68 32 70 Q24 72 18 64 Z"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

### 🚨 남성 헤어 핵심 규칙 — 여성 Z path 패턴 절대 금지

**남성 헤어에서 가장 많이 발생하는 실수**:
여성용 닫힌 Z path (`Q48 58 40 58 Q32 58 24 52 Z` 형태 — 옆머리가 아래로 감싸 내려오는 패턴)를 남성에게 적용하면 **히잡/숏단발 여성 헤어**처럼 보인다.

**남성 헤어 올바른 패턴** (스타일 1~5):
```svg
<!-- ✅ 올바름: 상단 캡만 그리고 Z로 닫음 — 옆머리가 내려가지 않음 -->
<path d="M22 32 Q20 10 40 8 Q60 10 58 32 Z" fill="..." stroke="#2D2D2D" strokeWidth="1.5"/>
```

**절대 금지 패턴** (남성에게 사용 시 여성 헤어처럼 보임 ❌):
```svg
<!-- ❌ 금지: 옆머리가 y=50~60까지 내려오는 전체 감싸기 패턴 -->
<path d="M22 34 Q20 14 40 12 Q60 14 58 34 Q56 46 56 52 Q48 58 40 58 Q32 58 24 52 Q22 46 22 34 Z" .../>
```

옆머리 디테일이 필요하면 **stroke-only path**(fill 없음)로 추가:
```svg
<path d="M22 32 Q20 38 22 44" stroke="..." strokeWidth="2" fill="none" strokeLinecap="round"/>
```
⚠️ 단, **굵은(strokeWidth 3+) 옆 stroke는 구렛나루처럼** 보인다. 가늘게(≤2) 쓰거나 생략한다.

---

### 🧑 남성 앞머리(fringe) — 2레이어 필수 (바가지 방지)

**문제**: 상단 캡 하나만 그리면 hairline이 좌우대칭 매끈한 아치가 되어 **바가지/헬멧**으로 보인다.

**해결**: 머리를 두 겹으로 그린다.
- **레이어 A. 크라운 캡** — 얼굴 **이전**에 그림 (정수리 볼륨). 바닥은 **평평·단순**하게.
- **레이어 B. 앞머리** — 얼굴 **이후**에 그림 (이마 피부 위에 얹힘). ← 바가지 방지의 핵심

**🚨 검은 선 방지 규칙 (실사례 반복 지적)**:
- 앞머리 path는 **`fill`만, `stroke` 금지**. 크라운과 같은 색이라 stroke를 넣으면 머리 한가운데 **검은 경계선**이 생긴다.
- 크라운 캡 바닥에 **물결 inner stroke**(예: `Q54 22 48 24 Q44 26 40 24 ...`)를 넣지 않는다 — 머리 사이 검은 선이 된다. 바닥은 평평하게 닫는다.

**기타 규칙**:
- 앞머리는 반드시 얼굴 circle **다음**에 그린다 (안 그러면 얼굴 fill이 앞머리를 덮음).
- 앞머리 다발 끝(tongue tip)은 **눈썹 위(y28~32)**에서 멈춘다. 눈·안경 안 가리게.
- 바닥 가장자리를 매끈한 단일 Q 아치로 끝내지 말고 **다발 2~3개로 불규칙**하게.
- **머리띠·모자를 hairline(y22~28)에 가로지르면 앞머리가 가려진다** — 앞머리 스타일과 이마 띠는 같이 쓰지 않는다 (필요하면 목수건·한쪽 두건으로 대체).

**검증된 앞머리 템플릿** (얼굴 cx40 cy36 기준, 얼굴 다음에 그림, `fill="{헤어}"` 만):
```svg
<!-- ① 가르마 스윕 (단정/지적) -->
<path d="M24 26 Q26 30 31 28 Q38 31 46 28 Q52 30 56 25 Q57 20 40 19 Q25 20 24 26 Z" fill="{헤어}"/>
<path d="M47 21 Q42 26 36 29" stroke="{진한 헤어}" strokeWidth="0.9" fill="none" opacity="0.6"/>

<!-- ② 일자 뱅 (차분/시크) -->
<path d="M24 26 Q25 31 28 30 Q34 32 40 30 Q46 32 52 30 Q55 31 56 26 Q57 20 40 19 Q24 20 24 26 Z" fill="{헤어}"/>
<path d="M31 22 L30 30 M40 21 L40 30 M49 22 L50 30" stroke="{진한 헤어}" strokeWidth="0.7" opacity="0.5"/>

<!-- ③ 더벅 (자유/엉뚱) — 뾰족 다발 -->
<path d="M23 26 Q25 32 28 28 Q30 33 33 28 Q36 33 39 28 Q42 33 45 28 Q48 33 51 28 Q54 32 57 26 Q58 19 40 18 Q22 19 23 26 Z" fill="{헤어}"/>

<!-- ④ 컬 펌 (부드러움) — 둥근 가리비 -->
<path d="M24 26 Q27 31 31 28 Q34 31 38 28 Q42 31 46 28 Q50 31 53 28 Q56 30 56 26 Q57 20 40 19 Q24 20 24 26 Z" fill="{헤어}"/>

<!-- ⑤ 투블럭 앞머리 내림 (센터, 옆은 짧게) -->
<path d="M28 31 Q30 35 34 32 Q40 35 46 32 Q50 35 52 31 Q53 24 40 23 Q27 24 28 31 Z" fill="{헤어}"/>

<!-- ⑥ 쉼표머리 (한쪽 쓸어 + 끝 컬) -->
<path d="M24 27 Q26 32 33 30 Q44 33 51 27 Q55 24 54 29 Q52 33 56 29 Q58 20 40 19 Q25 20 24 27 Z" fill="{헤어}"/>
<path d="M48 22 Q44 27 38 30" stroke="{진한 헤어}" strokeWidth="0.9" fill="none" opacity="0.6"/>

<!-- ⑦ 가운데 가르마 커튼 — 크라운에 사이드 커튼 포함해야 읽힘 -->
<!-- 크라운(얼굴 전): 옆머리가 얼굴 양옆을 y44~46까지 감쌈 -->
<path d="M19 46 Q17 14 40 9 Q63 14 61 46 Q58 30 50 29 Q44 28 40 31 Q36 28 30 29 Q22 30 19 46 Z" fill="{헤어}" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 얼굴 circle … 그린 뒤 앞머리(가운데 가름) -->
<path d="M40 25 Q32 26 27 31 Q32 33 37 30 Q40 28 40 25 Z" fill="{헤어}"/>
<path d="M40 25 Q48 26 53 31 Q48 33 43 30 Q40 28 40 25 Z" fill="{헤어}"/>
```

**❌ 짧은 스파이크 앞머리 — 금지**: 이마 위 작은 톱니(`M27 29 Q28 32 31 29 ...`) 형태는 어색해서 사용하지 않는다.

**🚨 히잡 ≠ 앞머리 (혼동 금지)**:
- ❌ 히잡: 옆머리가 **y50+ 턱·뺨**까지 감싸 내려옴
- ✅ 앞머리: 다발이 **이마(y28~32)에서 멈춤** — 턱까지 안 내려옴 → 권장

---

### 🚨🚨 남성 디테일 최소 기준 (필수 — 위반 시 "밋밋한 남자" 발생)

**문제**: 남성은 헤어가 "상단 캡만"이라, 그냥 그리면 얼굴 위가 휑하고 표정이 비어 보인다.

**해결**: 남성 캐릭터는 아래 4개 카테고리에서 **최소 3개**를 반드시 채운다.

- [ ] **① 앞머리(fringe) 필수** — 상단 캡만 그리면 바가지가 된다. 위 "남성 앞머리 2레이어" 템플릿 중 1종을 **얼굴 다음에** 얹는다 (fill만, stroke 금지). 추가로 가르마선·삐친 머리(cowlick)·구레나룻 등 텍스처는 선택.
- [ ] **② 표정 담당 눈썹** — 눈썹이 표정을 만든다. 수평 직선 금지, 각도·곡선으로 감정 표현
- [ ] **③ 몸통 디테일** — 민짜 rect 금지. 카라 / 지퍼 / 후드끈 / 넥타이 / 단추 / 옷주름 중 1개 이상
- [ ] **④ 소품 + 팔 연결** — 소품은 반드시 팔(stroke path)로 몸통과 연결. 공중에 뜬 소품 금지

추가로 **얼굴 보조 디테일**(주근깨·수염·구레나룻·점)을 선택적으로 얹으면 "얼굴 밀도"를 확보할 수 있다. (코는 절대 금지 — 아래 규칙 참조)

---

### 💇 남성 헤어 텍스처 라이브러리 (캡 위에 얹기 — 히잡 안 건드림)

```svg
<!-- 가르마 선 (옆가르마) -->
<path d="M44 12 Q40 18 38 26" stroke="#2D2D2D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>

<!-- 앞머리 결 (3가닥 짧은 선) -->
<path d="M32 14 Q33 18 31 22" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.4"/>
<path d="M40 12 Q41 17 40 22" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.4"/>
<path d="M48 14 Q47 18 49 22" stroke="#2D2D2D" strokeWidth="0.8" fill="none" opacity="0.4"/>

<!-- 삐친 머리 cowlick (정수리 한 가닥) -->
<path d="M40 8 Q44 2 48 5 Q45 7 43 10Z" fill="{헤어색}" stroke="#2D2D2D" strokeWidth="1"/>

<!-- 구레나룻 (stroke-only, fill 없음 — 히잡 방지) -->
<path d="M24 30 Q22 36 24 42" stroke="{헤어색}" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
<path d="M56 30 Q58 36 56 42" stroke="{헤어색}" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
```

### 👕 남성 몸통 디테일 라이브러리 (민짜 rect 위에 얹기)

```svg
<!-- 셔츠 카라 (V) -->
<path d="M36 50 L40 56 L44 50" stroke="#2D2D2D" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>

<!-- 지퍼 + 풀탭 -->
<line x1="40" y1="54" x2="40" y2="72" stroke="#2D2D2D" strokeWidth="1" strokeDasharray="1.5 1.5"/>
<rect x="38.5" y="54" width="3" height="3" rx="1" fill="#94A3B8" stroke="#2D2D2D" strokeWidth="0.6"/>

<!-- 후드 끈 (양쪽 늘어진 끈 + 매듭) -->
<line x1="36" y1="52" x2="35" y2="64" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
<line x1="44" y1="52" x2="45" y2="64" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
<circle cx="35" cy="65" r="1.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6"/>
<circle cx="45" cy="65" r="1.5" fill="#FACC15" stroke="#2D2D2D" strokeWidth="0.6"/>

<!-- 넥타이 -->
<path d="M40 52 L37 56 L40 70 L43 56 Z" fill="#EF4444" stroke="#2D2D2D" strokeWidth="1"/>
<path d="M38 52 L42 52 L40 55 Z" fill="#B91C1C" stroke="#2D2D2D" strokeWidth="0.6"/>

<!-- 단추 (2개) -->
<circle cx="40" cy="58" r="1.2" fill="#2D2D2D"/>
<circle cx="40" cy="66" r="1.2" fill="#2D2D2D"/>
```

### 👨 남성 얼굴 보조 디테일 (선택 — 얼굴 밀도용)

```svg
<!-- 주근깨 -->
<circle cx="32" cy="42" r="0.6" fill="#92400E" opacity="0.5"/>
<circle cx="35" cy="43" r="0.6" fill="#92400E" opacity="0.5"/>
<circle cx="45" cy="43" r="0.6" fill="#92400E" opacity="0.5"/>
<circle cx="48" cy="42" r="0.6" fill="#92400E" opacity="0.5"/>

<!-- 콧수염 / 구레나룻 수염 -->
<path d="M35 46 Q40 49 45 46" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

<!-- 점 -->
<circle cx="46" cy="46" r="0.8" fill="#2D2D2D"/>
```

---

**여성(-f) SVG 패턴 — 반드시 포함**

### 🚨🚨 삼각형 방지 — 절대 규칙 (위반 시 삼각형 반드시 발생)

**원인**: 머리카락을 여러 개의 열린 path로 그리면 SVG fill이 자동으로 직선을 이어 삼각형을 만든다.

**유일한 해결법**: 머리카락을 **하나의 닫힌 Z path**로 그리고, 얼굴(ellipse)을 **그 위에** 그린다.

**절대 금지 (삼각형 발생 ❌):**
```svg
<!-- 열린 path 3개로 분리 → 무조건 삼각형 생김 -->
<path d="M22 26 Q22 12 40 12 Q58 12 58 26" fill="#92400E" .../>   ← 상단만
<path d="M22 26 Q18 42 20 60 Q24 68 28 64" fill="#92400E" .../>   ← 왼쪽만 (열림)
<path d="M58 26 Q62 42 60 60 Q56 68 52 64" fill="#92400E" .../>   ← 오른쪽만 (열림)
<ellipse cx="40" cy="36" .../>  ← 얼굴이 마지막 → 삼각형 그대로 보임
```

**반드시 이렇게 (삼각형 없음 ✅):**
```svg
<!-- 1. 머리: 하나의 닫힌 path (Z로 닫음) — 반드시 먼저 -->
<path d="M18 32 Q18 10 40 10 Q62 10 62 32 L62 66 Q56 74 46 70 Q40 68 34 70 Q24 74 18 66 Z"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1"/>

<!-- 2. 얼굴: 머리 다음에 그림 → face가 머리 중앙을 자연스럽게 덮음 → 삼각형 없어짐 -->
<ellipse cx="40" cy="36" rx="15" ry="14" fill="#FDDCB5" stroke="#2D2D2D" strokeWidth="1.5"/>

<!-- 3. 이목구비: 마지막 -->
```

**체크리스트 (코드 작성 후 확인):**
- [ ] 머리카락 path가 `Z`로 닫혀 있는가?
- [ ] 머리카락이 얼굴(ellipse/circle)보다 먼저 그려졌는가?
- [ ] 열린 path(Z 없음)로 머리를 그리지 않았는가?

---

① **헤어스타일 — 기장 × 퍼머 조합으로 다양하게 선택 (매번 같은 스타일 금지)**

### 기장 3단계 (hair path의 하단 끝점 y값으로 조절)
- **단발**: y ≈ 54~60 (턱 아래 살짝)
- **중단발**: y ≈ 66~72 (어깨 위)
- **장발**: y ≈ 78~86 (어깨 아래, viewBox 바닥 근처)

### 퍼머 여부 (path curve 스타일로 표현)
- **퍼머 없음 (스트레이트)**: 부드러운 단일 Q 곡선
- **퍼머 있음 (웨이브)**: 좌우로 흔들리는 S자 연속 Q 곡선

---

**A. 단발 스트레이트** (y≈56, 직선적):
```svg
<path d="M20 32 Q20 10 40 8 Q60 10 60 32 Q62 48 54 54 Q46 58 40 58 Q34 58 26 54 Q18 48 20 32 Z"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**B. 중단발 스트레이트** (y≈68, 어깨선):
```svg
<path d="M18 32 Q18 10 40 8 Q62 10 62 32 L62 62 Q56 72 46 70 Q40 68 34 70 Q24 72 18 62 Z"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**C. 장발 스트레이트** (y≈82, 어깨 아래):
```svg
<path d="M18 32 Q18 10 40 8 Q62 10 62 32 L64 74 Q56 86 46 82 Q40 80 34 82 Q24 86 16 74 Z"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**D. 중단발 웨이브 퍼머** (S자 곡선 — 사진처럼 볼륨감):
```svg
<!-- 퍼머: 좌우로 물결치는 S자 곡선 반복 -->
<path d="M18 30 Q18 10 40 8 Q62 10 62 30
  Q66 40 60 46 Q54 52 62 58 Q66 64 58 70 Q50 74 44 72 Q40 70 36 72 Q30 74 22 70
  Q14 64 18 58 Q26 52 20 46 Q14 40 18 30 Z"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**E. 장발 웨이브 퍼머** (사진 참고 — 볼륨 풍성한 긴 웨이브):
```svg
<path d="M16 30 Q16 8 40 6 Q64 8 64 30
  Q68 42 62 50 Q56 58 64 66 Q68 74 62 80 Q54 86 46 82
  Q40 80 34 82 Q26 86 18 80 Q12 74 16 66
  Q24 58 18 50 Q12 42 16 30 Z"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
```

**F. 양갈래 머리** (단발/중단발 기장, 트윈테일):
```svg
<path d="M22 30 Q22 10 40 8 Q58 10 58 30" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 왼쪽 갈래 (중단발 기준 y≈68) -->
<path d="M20 30 Q12 40 14 62 Q16 70 20 68 Q26 64 22 50 Q20 40 22 32 Z"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 오른쪽 갈래 -->
<path d="M60 30 Q68 40 66 62 Q64 70 60 68 Q54 64 58 50 Q60 40 58 32 Z"
  fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
<!-- 묶음 장식 -->
<circle cx="21" cy="30" r="3.5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1"/>
<circle cx="59" cy="30" r="3.5" fill="#F9A8D4" stroke="#2D2D2D" strokeWidth="1"/>
```

**G. 공주 올림머리** (번 + 왕관/리본):
```svg
<ellipse cx="40" cy="12" rx="13" ry="9" fill="#92400E" stroke="#2D2D2D" strokeWidth="1.5"/>
<path d="M26 24 Q22 32 24 44" stroke="#92400E" strokeWidth="5" fill="none" strokeLinecap="round"/>
<path d="M54 24 Q58 32 56 44" stroke="#92400E" strokeWidth="5" fill="none" strokeLinecap="round"/>
<path d="M30 6 L33 1 L37 6 L40 2 L43 6 L47 1 L50 6 Z"
  fill="#FACC15" stroke="#2D2D2D" strokeWidth="1" strokeLinejoin="round"/>
```

> (양갈래=F, 공주 올림머리=G 참조. 구체 SVG·❌금지패턴은 위 **여성 헤어스타일 5종** 섹션에도 정리됨)

---

② **볼터치** (다양한 색상, 때로는 없어도 됨):
- 핑크: `fill="#F9A8D4"` / 복숭아: `fill="#FCA5A5"` / 라벤더: `fill="#C4B5FD"` / 없음: 생략
- 크기: `rx="5" ry="3"`, opacity 0.6~0.8
```svg
<!-- 예시 (복숭아) -->
<ellipse cx="32" cy="40" rx="5" ry="3" fill="#FCA5A5" opacity="0.7"/>
<ellipse cx="48" cy="40" rx="5" ry="3" fill="#FCA5A5" opacity="0.7"/>
```

몸통: 어깨 좁고 둥근 실루엣 (`rx` 크게, 너비 좁게)
```svg
<path d="M28 50 Q26 54 26 72 L54 72 Q54 54 52 50 Q46 48 40 48 Q34 48 28 50Z" fill="..."/>
```

---

예시:
- 갑자-m(남): 짧은 머리 path, 단순 원형 눈, 연한 볼터치, 넓은 어깨 rect
- 을묘-f(여): 귀 아래까지 내려오는 긴 머리 path, 핑크 볼터치 타원(opacity 0.7), 좁은 어깨 둥근 몸통

## 참고 — 검증된 예시 3개

인간 불도저(갑자-m/목): 헬멧+불도저삽날+바퀴+먼지 / 배경: 화살표+스파클+흙바닥
츤데레 본체(임오-f/수): 반개눈+빨간볼+반반몸통(파랑+빨강)+하트 / 배경: 물방울+불꽃+하트+눈결정
걱정 삭제 담당(무진-f/토): 곰귀+아치눈+포옹팔+배하트 / 배경: 하트+별+구름+음표
