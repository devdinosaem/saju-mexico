# 사주TI 두들 스티커 스타일 가이드

유저가 단어/문구를 제시하면, 이 가이드에 맞춰 일관된 SVG 두들 스티커를 생성한다.

## 핵심 규칙

### 1. 구조

```
export function Doodle{Name}({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 {W} {H}" className={`w-{n} h-{n} ${className}`} fill="none">
      {/* 본체 */}
      {/* 눈 (선택) */}
      {/* 입 (선택) */}
      {/* 디테일 */}
    </svg>
  );
}
```

- React 함수 컴포넌트, `className` prop만 받음
- `fill="none"`을 svg에 설정, 각 path에서 개별 fill
- viewBox 크기: 20~48 범위 (작은 것 20, 큰 것 48)
- Tailwind 기본 크기: `w-5 h-5` ~ `w-10 h-7` 범위

### 2. 선 스타일 (가장 중요)

```
stroke: #2D2D2D (차콜)
strokeWidth: 1 ~ 1.5 (본체), 0.5 ~ 1 (디테일)
strokeLinecap: "round" (곡선에만)
```

- **모든 오브젝트에 #2D2D2D 아웃라인 필수** — 이게 두들 느낌의 핵심
- 선 굵기는 오브젝트 크기에 비례, 본체 1.5 / 세부 0.8~1

### 3. 컬러 팔레트

본체 fill에 사용할 색상. 이 범위를 벗어나지 않는다.

```
핑크:     #E84B6A   — 하트, 리본, 강조
옐로:     #FACC15   — 별, 스마일리, 하이라이트
크림옐로: #FDE68A   — 달, 구름 (부드러운 오브젝트)
연크림:   #FEF9C3   — 구름 내부
그린:     #4ADE80   — 나뭇잎, 자연
오렌지:   #FB923C   — 불꽃, 음식 토핑
레드:     #EF4444   — 피자 토핑, 경고
라벤더:   #A78BFA   — 크리스탈, 보석
화이트:   #FFFFFF   — 편지, 카드
차콜:     #2D2D2D   — 고양이, 다크 오브젝트
```

### 4. 얼굴 표현 (캐릭터성 부여 시)

모든 오브젝트에 넣을 필요 없음. 별, 달, 구름 등 "귀여운 오브젝트"에만 선택적으로.

```
눈: circle r=1~1.5, fill="#2D2D2D"
   — 두 눈 간격은 본체 폭의 20~25%
   — 위치는 본체 중심보다 살짝 위

입: path "M{x1} {y} Q{cx} {cy} {x2} {y}"
   — 미소: Q 제어점이 아래 (cy > y)
   — stroke="#2D2D2D", strokeWidth=0.8~1, fill="none"
   — strokeLinecap="round"
```

### 5. 형태 원칙

```
✓ 기본 도형 조합: circle, ellipse, rect, path
✓ 유기적 곡선: Q(quadratic) 베지어로 부드럽게
✓ 비대칭 허용: 약간의 불규칙함이 손그림 느낌
✓ 단순함 유지: path 노드 최소화 (10개 이하 권장)
✗ 직선 위주의 기계적 형태 금지
✗ 그래디언트 금지 (flat fill만)
✗ filter/shadow 금지 (CSS에서 처리)
```

### 6. 카테고리별 예시

| 카테고리 | 예시 | fill 색상 | 얼굴 |
|---------|------|----------|------|
| 천체 | 별, 달, 구름 | 옐로/크림 | ✓ |
| 감정 | 하트, 스마일리 | 핑크/옐로 | 선택 |
| 자연 | 나뭇잎, 불꽃, 물방울 | 그린/오렌지 | ✗ |
| 음식 | 피자, 아이스크림, 커피 | 크림/오렌지 | 선택 |
| 동물 | 고양이, 토끼 | 차콜/화이트 | ✓ |
| 소품 | 편지, 리본, 크리스탈, 왕관 | 화이트/라벤더/핑크 | ✗ |
| 기호 | 스파클, 느낌표, 물음표 | 옐로 | ✗ |

### 7. 파일 위치 & 네이밍

```
파일: packages/web-kr/src/components/doodles.tsx
네이밍: Doodle{PascalCase}
  — DoodleStar, DoodleCoffee, DoodleRabbit 등
```

기존 컴포넌트 아래에 추가. 기존 것은 수정하지 않는다.

## 기존 스티커 목록 (13종)

| 이름 | 오브젝트 | fill | 얼굴 |
|------|---------|------|------|
| DoodleStar | 별 | #FACC15 | ✓ |
| DoodleMoon | 달 | #FDE68A | ✓ |
| DoodleCloud | 구름 | #FEF9C3 | ✓ |
| DoodleHeart | 하트 | #E84B6A | ✗ |
| DoodleSparkle | 반짝이 | #FACC15 | ✗ |
| DoodlePizza | 피자 | #FDE68A | ✗ |
| DoodleLetter | 편지 | #FFFFFF | ✗ |
| DoodleFire | 불꽃 | #FB923C | ✗ |
| DoodleCat | 고양이 | #2D2D2D | ✓ |
| DoodleBow | 리본 | #E84B6A | ✗ |
| DoodleCrystal | 크리스탈 | #A78BFA | ✗ |
| DoodleLeaf | 나뭇잎 | #4ADE80 | ✗ |
| DoodleSmiley | 스마일리 | #FACC15 | ✓ |

| DoodleTravelGirl | 여행 여자 캐릭터 | 다색 | ✓ (선글라스) |
| DoodlePlane | 비행기 | #FFFFFF | ✗ |
| DoodleMusicNote | 음표 | #2D2D2D | ✗ |
| DoodleQuestionMark | 물음표 | #2D2D2D | ✗ |
| DoodleSpeechBubble | 말풍선 | #E84B6A | ✗ |
| DoodleSuitcase | 캐리어 | #E84B6A | ✗ (스티커 얼굴) |

## 캐릭터 두들 추가 규칙

일반 오브젝트보다 복잡하지만 동일한 스타일 원칙을 따른다:

```
- viewBox: 60~100 범위 (일반 두들보다 큼)
- 피부색: #FDE68A (크림옐로)
- 머리카락: #2D2D2D (차콜)
- 옷: 팔레트 내 색상 (흰 티=#FFF, 검은 바지=#2D2D2D 등)
- 아웃라인: 동일하게 #2D2D2D, strokeWidth 1~1.5
- 소품: 별도 컴포넌트로도 분리 가능 (캐리어, 비행기 등)
- 복잡도: path 노드 20개 이하 (일반 두들의 2배까지 허용)
```

## 생성 요청 예시

유저: "커피" → DoodleCoffee (컵: #FDE68A, 김: path 웨이브, 얼굴: 선택)
유저: "왕관" → DoodleCrown (왕관: #FACC15, 보석: #E84B6A, 얼굴: ✗)
유저: "번개" → DoodleLightning (번개: #FACC15, 얼굴: ✗)
