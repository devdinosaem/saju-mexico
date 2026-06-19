# saju-report — Claude API 사주 리포트 생성

Claude API를 사용하여 스페인어 사주 풀 리포트를 생성하는 패키지.

## 구조

- `src/types.ts` — 리포트 입출력 타입
- `src/prompts.ts` — 시스템 프롬프트 + 4회 호출별 섹션 프롬프트
- `src/build-input.ts` — manseryeok + saju-engine 데이터를 리포트 입력으로 변환
- `src/report-generator.ts` — Claude API 호출 (프롬프트 캐싱 적용)

## API 호출 구조

시스템 프롬프트를 캐싱하여 4회 순차 호출:

| Call | 섹션 |
|------|------|
| 1 | 본질 + 오행분포 + 신강신약 + 십신 |
| 2 | 연애운 + 재물운 + 직업운 + 건강운 |
| 3 | 대운 타임라인 + 올해 운세 + 합충형파해 |
| 4 | 용신 가이드 + 신살 + 종합 메시지 |

## 모델

- 리포트 해석: `claude-sonnet-4-6` (기본값)
- 프롬프트 캐싱으로 2~4회차 호출 비용 90% 절감

## 사용법

```typescript
import { buildReportInput, ReportGenerator } from 'saju-report';

const input = buildReportInput({
  userName: 'María',
  gender: 'female',
  year: 1995, month: 3, day: 15,
  hour: 14, minute: 30,
  city: 'Ciudad de México',
  timezone: 'America/Mexico_City',
});

const generator = new ReportGenerator();
const report = await generator.generate(input);
```

## 테스트

```bash
ANTHROPIC_API_KEY=sk-ant-... pnpm --filter saju-report test
```

실제 API 호출 테스트는 `ANTHROPIC_API_KEY` 환경변수 필요.
