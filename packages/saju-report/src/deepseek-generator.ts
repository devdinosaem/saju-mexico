import type { ReportInput, SajuReport, ReportSection } from './types.js';
import { SYSTEM_PROMPT, CALL1_PROMPT, CALL2_PROMPT, CALL3_PROMPT, CALL4_PROMPT } from './prompts.js';

const DICT: Record<string, string> = {
  // 십신
  "비견": "[Fuerza de Autonomía]", "겁재": "[Riesgo de Apuesta Audaz]",
  "식신": "[Fortuna de Creatividad]", "상관": "[Fuerza de Talento Rebelde]",
  "편재": "[Fortuna Inesperada]", "정재": "[Fortuna de Sueldo Fijo]",
  "편관": "[Fuerza de Carisma]", "정관": "[Fuerza de Ascenso]",
  "편인": "[Energía de Intuición]", "정인": "[Energía de Protección]",
  // 12운성
  "장생": "[Nuevo Comienzo]", "목욕": "[Inestabilidad]", "관대": "[Preparación]",
  "건록": "[Independencia]", "제왕": "[Máximo Poder]", "쇠": "[Declive]",
  "병": "[Debilitamiento]", "사": "[Pausa]", "묘": "[Latencia]",
  "절": "[Renovación]", "태": "[Nueva Vida]", "양": "[Gestación]",
  // 12신살
  "겁살": "[Alerta de Asalto]", "재살": "[Alerta de Desastre]",
  "천살": "[Alerta Celestial]", "지살": "[Alerta Terrenal]",
  "년살": "[Alerta Anual]", "월살": "[Alerta Mensual]",
  "망신살": "[Alerta de Reputación]", "육해살": "[Alerta de Conflicto]",
  "장성살": "[Energía de Liderazgo]", "반안살": "[Energía de Estabilidad]",
  "역마살": "[Energía de Vagabundeo]", "화개살": "[Energía de Espiritualidad]",
  // 특수신살
  "천덕귀인": "[Energía de Protección Divina]", "월덕귀인": "[Energía de Virtud Natural]",
  "문창귀인": "[Energía de Talento Escrito]", "학당귀인": "[Energía de Éxito Académico]",
  "천을귀인": "[Energía de Protector Supremo]", "태극귀인": "[Energía de Intuición Protectora]",
  "천복귀인": "[Energía de Bendición]",
  "암록": "[Fortuna Oculta]", "정록": "[Fortuna de Ingreso Estable]",
  "관귀학관": "[Energía de Éxito por Mérito]", "금여성": "[Fortuna de Buena Pareja]",
  "천문성": "[Energía de Sabiduría]", "현침살": "[Energía de Análisis Agudo]",
  "괴강살": "[Fuerza de Liderazgo Extremo]", "홍염살": "[Energía de Magnetismo Romántico]",
  "도화살": "[Energía de Atractivo]",
  "백호대살": "[Riesgo de Accidente]", "비인살": "[Riesgo de Conflicto Súbito]",
  // 오행
  "목(木)": "Madera", "화(火)": "Fuego", "토(土)": "Tierra", "금(金)": "Metal", "수(水)": "Agua",
  // 강약
  "용신": "Elemento de Poder", "기신": "Elemento Adverso",
  "신강": "Alma Poderosa", "신약": "Alma Sensible", "태강": "Alma Dominante", "태약": "Alma Receptiva", "중화": "Alma Armónica",
  // 운
  "대운": "Gran Estación", "세운": "Fortuna Anual", "월운": "Fortuna Mensual",
  // 관계
  "천간합": "Unión Celestial", "천간충": "Choque Celestial",
  "육합": "Armonía Dual", "삼합": "Triple Armonía", "방합": "Armonía Direccional",
  "삼형살": "Triple Tensión", "상충": "Choque",
  // 음양
  "Yang": "Sol", "Yin": "Luna", "yang": "Sol", "yin": "Luna",
  "Madera Yang": "Madera Sol", "Madera Yin": "Madera Luna",
  "Fuego Yang": "Fuego Sol", "Fuego Yin": "Fuego Luna",
  "Tierra Yang": "Tierra Sol", "Tierra Yin": "Tierra Luna",
  "Metal Yang": "Metal Sol", "Metal Yin": "Metal Luna",
  "Agua Yang": "Agua Sol", "Agua Yin": "Agua Luna",
  // 한자
  "用神": "Elemento de Poder", "忌神": "Elemento Adverso",
  "日柱": "Pilar del Día", "四柱": "Cuatro Pilares",
  "木": "Madera", "火": "Fuego", "土": "Tierra", "金": "Metal", "水": "Agua",
};

function sanitizeWithDict(text: string): string {
  let result = text;
  const sorted = Object.entries(DICT).sort((a, b) => b[0].length - a[0].length);
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
      section.content = sanitizeWithDict(section.content);
      section.title = sanitizeWithDict(section.title);
    }

    return { sections: allSections, usage };
  }
}
