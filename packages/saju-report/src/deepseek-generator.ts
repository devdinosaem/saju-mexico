import type { ReportInput, SajuReport, ReportSection } from './types.js';
import { type Locale, getLocaleConfig } from './locales/index.js';

function sanitizeWithDict(text: string, dict: Record<string, string>): string {
  if (Object.keys(dict).length === 0) return text;
  let result = text;
  const sorted = Object.entries(dict).sort((a, b) => b[0].length - a[0].length);
  for (const [original, translated] of sorted) {
    result = result.replace(new RegExp(original, 'g'), translated);
  }
  result = result.replace(/```[^\n]*\n?/g, '');
  result = result.replace(/\n{3,}/g, '\n\n');
  return result;
}

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';
const DEFAULT_MODEL = 'deepseek-reasoner';
const MAX_RETRIES = 2;
const TIMEOUT_MS = 50_000;

function buildUserMessage(input: ReportInput, sectionPrompt: string, header: string): string {
  return `${header}\n\n${JSON.stringify(input, null, 2)}\n\n---\n\n${sectionPrompt}`;
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

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export class DeepSeekReportGenerator {
  private apiKey: string;
  private model: string;
  private locale: Locale;

  constructor(options: { apiKey?: string; model?: string; locale?: Locale } = {}) {
    this.apiKey = options.apiKey || process.env.DEEPSEEK_API_KEY || '';
    this.model = options.model || DEFAULT_MODEL;
    this.locale = options.locale || 'mx';
  }

  private async callApi(input: ReportInput, sectionPrompt: string) {
    const config = getLocaleConfig(this.locale);
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await fetchWithTimeout(
          `${DEEPSEEK_BASE_URL}/chat/completions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
              model: this.model,
              messages: [
                { role: 'system', content: config.SYSTEM_PROMPT },
                { role: 'user', content: buildUserMessage(input, sectionPrompt, config.USER_DATA_HEADER) },
              ],
              max_tokens: 4096,
              temperature: 0.7,
            }),
          },
          TIMEOUT_MS,
        );

        if (!response.ok) {
          const err = await response.text();
          throw new Error(`DeepSeek API ${response.status}: ${err}`);
        }

        return await response.json();
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (attempt < MAX_RETRIES) {
          await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        }
      }
    }

    throw lastError;
  }

  async generate(input: ReportInput): Promise<SajuReport> {
    const config = getLocaleConfig(this.locale);
    const callPrompts = [config.CALL1_PROMPT, config.CALL2_PROMPT, config.CALL3_PROMPT, config.CALL4_PROMPT];

    const results = await Promise.all(
      callPrompts.map((prompt) => this.callApi(input, prompt))
    );

    const allSections: ReportSection[] = [];
    const usage = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheCreationTokens: 0 };

    for (const data of results) {
      const text = data.choices?.[0]?.message?.content || '';
      usage.inputTokens += data.usage?.prompt_tokens || 0;
      usage.outputTokens += data.usage?.completion_tokens || 0;
      allSections.push(...parseSections(text));
    }

    for (const section of allSections) {
      section.content = sanitizeWithDict(section.content, config.DICT);
      section.title = sanitizeWithDict(section.title, config.DICT);
    }

    return { sections: allSections, usage };
  }
}
