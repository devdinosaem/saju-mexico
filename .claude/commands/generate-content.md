오늘 날짜 기준으로 Instagram 콘텐츠를 생성한다.

## 절차

1. 오늘의 일주를 만세력 엔진으로 계산
2. 콘텐츠 타입을 결정 (요일별 스케줄 기반)
   - 월/수/금: daily_fortune
   - 화/목: personality
   - 토: compatibility
   - 일: educational
3. agents/content-creator.md 프롬프트를 참고하여 스페인어 콘텐츠 생성
4. 캡션 + 해시태그 + CTA 포함
5. 결과를 content-output/ 디렉토리에 저장

## 인자

- $ARGUMENTS: 콘텐츠 타입 오버라이드 (선택). 예: "daily_fortune", "compatibility"

## 출력 형식

```
[타입]: ...
[제목]: ...
[캡션]: ... (스페인어)
[해시태그]: ...
[CTA]: ...
[이미지 설명]: ... (이미지 생성용 프롬프트)
```
