import type { ReportInput, SajuReport, ReportSection } from './types.js';
import { SYSTEM_PROMPT, CALL1_PROMPT, CALL2_PROMPT, CALL3_PROMPT, CALL4_PROMPT } from './prompts.js';

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';
const DEFAULT_MODEL = 'deepseek-reasoner';

function buildUserMessage(input: ReportInput, sectionPrompt: string): string {
  return `## Datos del consultante\n\n${JSON.stringify(input, null, 2)}\n\n---\n\n${sectionPrompt}`;
}

function parseSections(text: string): ReportSection[] {
  const sections: ReportSection[] = [];
  const parts = text.split(/^## /m).filter(Boolean);
  for (const part of parts) {
    const newlineIdx = part.indexOf('\n');
    if (newlineIdx === -1) continue;
    const title = part.slice(0, newlineIdx).trim();
    const content = part.slice(newlineIdx + 1).trim();
    if (title && content) sections.push({ title, content });
  }
  return sections;
}

export class DeepSeekReportGenerator {
  private apiKey: string;
  private model: string;

  constructor(options: { apiKey?: string; model?: string } = {}) {
    this.apiKey = options.apiKey || process.env.DEEPSEEK_API_KEY || '';
    this.model = options.model || DEFAULT_MODEL;
  }

  async generate(input: ReportInput): Promise<SajuReport> {
    const callPrompts = [CALL1_PROMPT, CALL2_PROMPT, CALL3_PROMPT, CALL4_PROMPT];
    const allSections: ReportSection[] = [];
    const usage = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheCreationTokens: 0 };

    for (const sectionPrompt of callPrompts) {
      const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: buildUserMessage(input, sectionPrompt) },
          ],
          max_tokens: 4096,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`DeepSeek API error: ${response.status} ${err}`);
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || '';

      usage.inputTokens += data.usage?.prompt_tokens || 0;
      usage.outputTokens += data.usage?.completion_tokens || 0;

      allSections.push(...parseSections(text));
    }

    return { sections: allSections, usage };
  }
}
