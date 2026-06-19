이번 주 Instagram 콘텐츠 캘린더를 생성한다.
유명인 사주 분석이 핵심 후킹 콘텐츠이며, 주 2-3회 배치한다.

## 절차

1. 오늘 날짜 기준으로 이번 주(월~일) 날짜 산출
2. data/mexican-celebrities.json에서 아직 다루지 않은 유명인 선정 (주 2-3명)
3. 현재 멕시코 트렌딩/이슈와 연결 가능한 유명인 우선 선정
4. 각 날짜의 일주를 만세력 엔진으로 계산
5. 요일별 콘텐츠 타입 배정 (캘린더 템플릿 기반)
6. agents/celebrity-saju.md, agents/content-creator.md 참고

## 콘텐츠 캘린더 템플릿

- 월: celebrity_saju (유명인 1)
- 화: daily_fortune
- 수: personality 또는 educational
- 목: celebrity_saju (유명인 2)
- 금: daily_fortune
- 토: celebrity_saju 또는 compatibility
- 일: social_proof (후기)

## 출력 형식

```
═══ 주간 콘텐츠 캘린더 (MM/DD ~ MM/DD) ═══

월 MM/DD | ⭐ celebrity_saju | Canelo Álvarez     | "¿Canelo nació para pelear? Su Saju lo confirma 🥊"
화 MM/DD | daily_fortune     | 오행: 火            | "Hoy el Fuego domina..."
수 MM/DD | educational       | 사주 vs 별자리       | "Tu Saju vs tu signo zodiacal"
목 MM/DD | ⭐ celebrity_saju | Peso Pluma          | "Su explosión musical estaba escrita en su Saju 🎵"
금 MM/DD | daily_fortune     | 오행: 水            | "El Agua trae reflexión..."
토 MM/DD | ⭐ celebrity_saju | Frida Kahlo         | "El dolor que la hizo eterna: su Saju lo explica 🎨"
일 MM/DD | social_proof      | 후기 카드           | "Pensé que era como el horóscopo... pero 😱"

[유명인 선정 근거]
- Canelo: 이번 주 경기 예정, 트렌딩 예상
- Peso Pluma: 신곡 발매, SNS 화제
- Frida Kahlo: 주말 문화 콘텐츠, 높은 공유율 기대
```
