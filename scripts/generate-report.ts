import Anthropic from '@anthropic-ai/sdk';
import { calculateSaju, STEM_KOREAN, BRANCH_KOREAN, STEM_ELEMENT, BRANCH_ELEMENT, ELEMENT_SPANISH, STEM_YINYANG, BRANCH_SPANISH } from '../packages/manseryeok/src/index.js';
import { analyzeTenGods, TEN_GOD_KOREAN, TEN_GOD_HANJA, TEN_GOD_SPANISH, analyzeTwelvePhases, PHASE_KOREAN, PHASE_SPANISH, analyzeSpiritStars, analyzeSpecialStars, SPIRIT_STAR_KOREAN, calculateMajorFortunes, calculateYearlyFortunes, calculateMonthlyFortunes, analyzeYongShin, STRENGTH_KOREAN, ELEMENT_KOREAN, analyzeRelations } from '../packages/saju-engine/src/index.js';

const SYSTEM_PROMPT = `You are Maestro Kim (마에스트로 김), a master of Korean Saju (四柱命理學).
You generate premium saju reports in Korean. You combine deep knowledge of traditional
Saju theory with warm, insightful, and culturally resonant communication.

## Rules
- Write in Korean (한국어)
- Use Korean saju terminology with hanja in parentheses: "비견(比肩)"
- Be encouraging but honest — never falsely positive, never fatalistic
- Use nature metaphors: 나무, 바다, 산, 불, 바람
- Frame challenges as growth opportunities
- Include specific timing from 대운/세운 data
- Reference the user's actual saju data throughout
- Total length: 3000+ words across all sections

## Output Structure

### 1. 당신의 본질 (Your Essence) — 800 words
- 일간(Day Master) 해석 with metaphor
- 사주 원국 전체 해석
- 오행 분포 분석 (과다/부족)

### 2. 성격 심층 분석 (Deep Personality) — 600 words
- 강점 3가지 (십신 기반)
- 주의점 3가지 (부족한 오행 기반)
- 숨겨진 면 (지장간/합충 기반)

### 3. 인생의 큰 흐름 — 대운 (Major Fortune Timeline) — 600 words
- 각 대운 시기별 해석 (특히 현재 대운 강조)
- 과거 대운과 실제 삶의 매칭
- 향후 대운 전망

### 4. 올해 운세 (This Year's Fortune) — 400 words
- 올해(2026년) 세운 분석
- 월별 주요 포인트
- 주의 시기 / 기회 시기

### 5. 용신 가이드 — 개운법 (Lucky Element Guide) — 400 words
- 용신 오행과 그 의미
- 행운 색상/방향/숫자/활동
- 피해야 할 것 (기신)

### 6. 마에스트로의 조언 (Final Advice) — 200 words
- 전체 종합
- 격려와 임파워링 마무리`;

async function generateReport() {
  const client = new Anthropic();

  // 사주 계산
  const saju = calculateSaju({ year: 1991, month: 9, day: 11, hour: 12, minute: 50, city: '서울' });
  const p = saju.fourPillars;
  const tenGods = analyzeTenGods(p, saju.dayMaster.stem);
  const phases = analyzeTwelvePhases(p, saju.dayMaster.stem);
  const spirits = analyzeSpiritStars(p);
  const specials = analyzeSpecialStars(p, saju.dayMaster.stem);
  const fortunes = calculateMajorFortunes(p.month, p.year.stem, 'male', 1991, 9, 11, saju.dayMaster.stem);
  const yearly = calculateYearlyFortunes(1991, saju.dayMaster.stem, 2024, 2026);
  const monthly = calculateMonthlyFortunes(2026, saju.dayMaster.stem);
  const yongShin = analyzeYongShin(saju.dayMaster.stem, p, saju.fiveElements, tenGods.count);
  const relations = analyzeRelations(p);

  const sajuData = JSON.stringify({
    birth: '1991-09-11 12:50 서울 (남자)',
    four_pillars: {
      year: `${p.year.stem}${p.year.branch}(${STEM_KOREAN[p.year.stem]}${BRANCH_KOREAN[p.year.branch]})`,
      month: `${p.month.stem}${p.month.branch}(${STEM_KOREAN[p.month.stem]}${BRANCH_KOREAN[p.month.branch]})`,
      day: `${p.day.stem}${p.day.branch}(${STEM_KOREAN[p.day.stem]}${BRANCH_KOREAN[p.day.branch]})`,
      hour: `${p.hour.stem}${p.hour.branch}(${STEM_KOREAN[p.hour.stem]}${BRANCH_KOREAN[p.hour.branch]})`,
    },
    day_master: `${saju.dayMaster.stem}(${STEM_KOREAN[saju.dayMaster.stem]}) — ${saju.dayMaster.element}(${saju.dayMaster.yinYang})`,
    five_elements: saju.fiveElements,
    ten_gods_summary: Object.entries(tenGods.count)
      .filter(([, v]) => v > 0)
      .map(([k, v]) => `${TEN_GOD_KOREAN[k as keyof typeof TEN_GOD_KOREAN]}(${TEN_GOD_HANJA[k as keyof typeof TEN_GOD_HANJA]}) ${v}개 ${((v as number / 8) * 100).toFixed(1)}%`)
      .join(', '),
    twelve_phases: `년:${PHASE_KOREAN[phases.year]} 월:${PHASE_KOREAN[phases.month]} 일:${PHASE_KOREAN[phases.day]} 시:${PHASE_KOREAN[phases.hour]}`,
    spirit_stars: `년:${SPIRIT_STAR_KOREAN[spirits.year]} 월:${SPIRIT_STAR_KOREAN[spirits.month]} 일:${SPIRIT_STAR_KOREAN[spirits.day]} 시:${SPIRIT_STAR_KOREAN[spirits.hour]}`,
    special_stars: specials.all.join(', '),
    strength: `${STRENGTH_KOREAN[yongShin.strength.level]} (점수:${yongShin.strength.score.toFixed(1)}, 아군:${yongShin.strength.friendCount}/적군:${yongShin.strength.foeCount})`,
    yong_shin: `${ELEMENT_KOREAN[yongShin.yongShin]} (${yongShin.yongShinCategory})`,
    gi_shin: ELEMENT_KOREAN[yongShin.giShin],
    major_fortunes: fortunes.fortunes.map(f =>
      `${f.startAge}세 ${STEM_KOREAN[f.ganZhi.stem]}${BRANCH_KOREAN[f.ganZhi.branch]} ${TEN_GOD_KOREAN[f.stemTenGod]}/${TEN_GOD_KOREAN[f.branchTenGod]} ${PHASE_KOREAN[f.twelvePhase]}`
    ).join(' | '),
    fortune_direction: fortunes.direction === 'forward' ? '순행' : '역행',
    yearly_2026: (() => {
      const y = yearly.find(y => y.year === 2026)!;
      return `${STEM_KOREAN[y.ganZhi.stem]}${BRANCH_KOREAN[y.ganZhi.branch]} ${TEN_GOD_KOREAN[y.stemTenGod]}/${TEN_GOD_KOREAN[y.branchTenGod]} ${PHASE_KOREAN[y.twelvePhase]}`;
    })(),
    monthly_2026: monthly.map(m =>
      `${m.month}월:${STEM_KOREAN[m.ganZhi.stem]}${BRANCH_KOREAN[m.ganZhi.branch]} ${TEN_GOD_KOREAN[m.stemTenGod]} ${PHASE_KOREAN[m.twelvePhase]}`
    ).join(' | '),
    relations: relations.relations.map(r => r.description).join(', '),
  }, null, 2);

  console.log('═══ 사주 데이터 (Claude API 입력) ═══\n');
  console.log(sajuData);
  console.log('\n═══ 리포트 생성 중... (Sonnet 4.6, 스트리밍) ═══\n');

  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 16000,
    system: [{
      type: 'text',
      text: SYSTEM_PROMPT,
      cache_control: { type: 'ephemeral' },
    }],
    messages: [{
      role: 'user',
      content: `다음 사주 데이터를 기반으로 풀 리포트를 작성해 주세요.\n\n${sajuData}`,
    }],
  });

  let fullText = '';
  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      process.stdout.write(event.delta.text);
      fullText += event.delta.text;
    }
  }

  const finalMessage = await stream.finalMessage();
  console.log('\n\n═══ 생성 완료 ═══');
  console.log(`토큰: input=${finalMessage.usage.input_tokens} output=${finalMessage.usage.output_tokens}`);
  console.log(`캐시: write=${finalMessage.usage.cache_creation_input_tokens ?? 0} read=${finalMessage.usage.cache_read_input_tokens ?? 0}`);
  console.log(`글자 수: ${fullText.length}자`);
}

generateReport().catch(console.error);
