# 사주 해석 엔진

만세력 엔진이 계산한 4기둥 원시 데이터를 받아 분석하고,
Claude API를 통해 스페인어 해석을 생성하는 패키지.

## 파일 구조

```
src/
  five-elements.ts   — 오행 분석 (과다/부족/균형)
  ten-gods.ts        — 십신 판정 (비견~정인)
  twelve-phases.ts   — 12운성 (장생~묘)
  yong-shin.ts       — 용신 판정 로직
  relations.ts       — 합충형파해 분석
  compatibility.ts   — 궁합 분석
  prompt-builder.ts  — 분석 결과 → Claude API 프롬프트 조립
  interpreter.ts     — Claude 응답 파싱 및 구조화
```

## 십신(十神) 매핑

일간 기준으로 나머지 7개 간지의 관계를 판정:
- 같은 오행 같은 음양 → 비견 | 다른 음양 → 겁재
- 내가 생하는 같은 음양 → 식신 | 다른 음양 → 상관
- 내가 극하는 같은 음양 → 편재 | 다른 음양 → 정재
- 나를 극하는 같은 음양 → 편관 | 다른 음양 → 정관
- 나를 생하는 같은 음양 → 편인 | 다른 음양 → 정인

## Claude API 프롬프트 설계 원칙

- 구조화된 JSON 입력 → 자연스러운 스페인어 출력
- 시스템 프롬프트에 사주 해석 프레임워크 포함 (agents/saju-interpreter.md)
- 무료 분석: Haiku, 200단어 이내
- 유료 분석: Sonnet, 800-1200단어
- 프롬프트 캐싱 적극 활용 (시스템 프롬프트 고정)
