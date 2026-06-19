import { describe, it, expect } from 'vitest';
import { buildReportInput } from '../src/build-input.js';
import { ReportGenerator } from '../src/report-generator.js';

describe('buildReportInput', () => {
  it('사주 데이터를 리포트 입력 형식으로 변환', () => {
    const input = buildReportInput({
      userName: 'Carlos',
      gender: 'male',
      year: 1991,
      month: 9,
      day: 11,
      hour: 12,
      minute: 50,
      city: '서울',
      timezone: 'Asia/Seoul',
    });

    expect(input.userName).toBe('Carlos');
    expect(input.gender).toBe('male');
    expect(input.birth.date).toBe('1991-09-11');
    expect(input.dayMaster.stem).toBeTruthy();
    expect(input.fourPillars.year.korean).toBeTruthy();
    expect(input.tenGods.entries.length).toBeGreaterThan(0);
    expect(input.majorFortunes.fortunes.length).toBeGreaterThan(0);
    expect(input.monthlyFortunes.length).toBe(12);
    expect(input.specialStars).toBeDefined();

    console.log('\n=== 리포트 입력 데이터 (요약) ===');
    console.log(`이름: ${input.userName}`);
    console.log(`생년월일: ${input.birth.date} ${input.birth.time}`);
    console.log(`일간: ${input.dayMaster.korean} (${input.dayMaster.elementSpanish})`);
    console.log(`신강/신약: ${input.strength.levelKorean} (${input.strength.levelSpanish})`);
    console.log(`용신: ${input.yongShin.elementKorean} (${input.yongShin.elementSpanish})`);
    console.log(`대운: ${input.majorFortunes.direction}`);
    console.log(`올해 세운: ${input.yearlyFortune.ganZhi}`);
    console.log(`합충형파해: ${input.relations.join(', ')}`);
  });
});

describe('ReportGenerator', () => {
  it('Claude API로 스페인어 리포트 생성 (실제 API 호출)', async () => {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.log('⚠️  ANTHROPIC_API_KEY 미설정 — 스킵');
      return;
    }

    const input = buildReportInput({
      userName: 'María García',
      gender: 'female',
      year: 1995,
      month: 3,
      day: 15,
      hour: 14,
      minute: 30,
      city: 'Ciudad de México',
      timezone: 'America/Mexico_City',
    });

    const generator = new ReportGenerator();
    const report = await generator.generate(input);

    expect(report.sections.length).toBeGreaterThanOrEqual(10);

    console.log('\n' + '═'.repeat(60));
    console.log('  REPORTE SAJU COMPLETO');
    console.log('═'.repeat(60));

    for (const section of report.sections) {
      console.log(`\n## ${section.title}`);
      console.log(section.content.slice(0, 200) + '...\n');
    }

    console.log('\n--- 토큰 사용량 ---');
    console.log(`입력: ${report.usage.inputTokens}`);
    console.log(`출력: ${report.usage.outputTokens}`);
    console.log(`캐시 읽기: ${report.usage.cacheReadTokens}`);
    console.log(`캐시 생성: ${report.usage.cacheCreationTokens}`);
  });
});
