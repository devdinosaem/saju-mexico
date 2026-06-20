import type { ReportInput, SajuReport, ReportSection } from './types.js';
import { SYSTEM_PROMPT, CALL1_PROMPT, CALL2_PROMPT, CALL3_PROMPT, CALL4_PROMPT } from './prompts.js';

const KOREAN_SPANISH: Record<string, string> = {
  "비견": "Autonomía", "겁재": "Apuesta Audaz", "식신": "Creatividad", "상관": "Talento Rebelde",
  "편재": "Fortuna Inesperada", "정재": "Sueldo Fijo", "편관": "Carisma", "정관": "Ascenso",
  "편인": "Intuición", "정인": "Protección",
  "갑": "Jiǎ", "을": "Yǐ", "병": "Bǐng", "정": "Dīng", "무": "Wù",
  "기": "Jǐ", "경": "Gēng", "신": "Xīn", "임": "Rén", "계": "Guǐ",
  "목": "Madera", "화": "Fuego", "토": "Tierra", "금": "Metal", "수": "Agua",
  "용신": "Elemento de Poder", "기신": "Elemento Adverso",
  "신강": "Alma Poderosa", "신약": "Alma Sensible", "태강": "Alma Dominante", "태약": "Alma Sensible", "중화": "Alma Armónica",
  "대운": "Gran Estación", "세운": "Fortuna Anual", "월운": "Fortuna Mensual",
  "합": "armonía", "충": "choque", "형": "tensión", "파": "ruptura", "해": "daño",
};

const HANJA_SPANISH: Record<string, string> = {
  "木": "Madera", "火": "Fuego", "土": "Tierra", "金": "Metal", "水": "Agua",
  "甲": "Madera Sol", "乙": "Madera Luna", "丙": "Fuego Sol", "丁": "Fuego Luna",
  "戊": "Tierra Sol", "己": "Tierra Luna", "庚": "Metal Sol", "辛": "Metal Luna",
  "壬": "Agua Sol", "癸": "Agua Luna",
  "子": "Rata", "丑": "Buey", "寅": "Tigre", "卯": "Conejo", "辰": "Dragón", "巳": "Serpiente",
  "午": "Caballo", "未": "Cabra", "申": "Mono", "酉": "Gallo", "戌": "Perro", "亥": "Cerdo",
  "用神": "Elemento de Poder", "忌神": "Elemento Adverso",
  "日柱": "Pilar del Día", "四柱": "Cuatro Pilares",
};

function sanitizeAsianChars(text: string): string {
  let result = text;
  for (const [kr, es] of Object.entries(KOREAN_SPANISH)) {
    result = result.replace(new RegExp(kr, 'g'), es);
  }
  for (const [ch, es] of Object.entries(HANJA_SPANISH)) {
    result = result.replace(new RegExp(ch, 'g'), es);
  }
  result = result.replace(/[가-힯]+/g, '');
  result = result.replace(/\(\s*\)/g, '');
  return result;
}

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';
const DEFAULT_MODEL = 'deepseek-reasoner';
const MAX_RETRIES = 2;
const TIMEOUT_MS = 50_000;

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

  constructor(options: { apiKey?: string; model?: string } = {}) {
    this.apiKey = options.apiKey || process.env.DEEPSEEK_API_KEY || '';
    this.model = options.model || DEFAULT_MODEL;
  }

  private async callApi(input: ReportInput, sectionPrompt: string) {
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
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: buildUserMessage(input, sectionPrompt) },
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
    const callPrompts = [CALL1_PROMPT, CALL2_PROMPT, CALL3_PROMPT, CALL4_PROMPT];

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
      section.content = sanitizeAsianChars(section.content);
      section.title = sanitizeAsianChars(section.title);
    }

    return { sections: allSections, usage };
  }
}
