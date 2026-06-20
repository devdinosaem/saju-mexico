import Anthropic from '@anthropic-ai/sdk';
import type { ReportInput, SajuReport, ReportSection, ReportGeneratorOptions } from './types.js';
import { SYSTEM_PROMPT, CALL1_PROMPT, CALL2_PROMPT, CALL3_PROMPT, CALL4_PROMPT } from './prompts.js';

const DEFAULT_MODEL = 'claude-sonnet-4-6';

function buildUserMessage(input: ReportInput, sectionPrompt: string): string {
  return `## Datos del consultante

${JSON.stringify(input, null, 2)}

---

${sectionPrompt}`;
}

function parseSections(text: string): ReportSection[] {
  const sections: ReportSection[] = [];
  const parts = text.split(/^## /m).filter(Boolean);

  for (const part of parts) {
    const newlineIdx = part.indexOf('\n');
    if (newlineIdx === -1) continue;
    const title = part.slice(0, newlineIdx).trim();
    const content = part.slice(newlineIdx + 1).trim();
    if (title && content) {
      sections.push({ title, content });
    }
  }

  return sections;
}

export class ReportGenerator {
  private client: Anthropic;
  private model: string;

  constructor(options: ReportGeneratorOptions = {}) {
    this.client = new Anthropic({
      apiKey: options.apiKey,
      maxRetries: options.maxRetries ?? 3,
    });
    this.model = options.model ?? DEFAULT_MODEL;
  }

  private async callApi(input: ReportInput, sectionPrompt: string) {
    return this.client.messages.create({
      model: this.model,
      max_tokens: 4096,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: buildUserMessage(input, sectionPrompt),
        },
      ],
    });
  }

  async generate(input: ReportInput): Promise<SajuReport> {
    const callPrompts = [CALL1_PROMPT, CALL2_PROMPT, CALL3_PROMPT, CALL4_PROMPT];

    // 4개 동시 호출
    const responses = await Promise.all(
      callPrompts.map((prompt) => this.callApi(input, prompt))
    );

    const allSections: ReportSection[] = [];
    const usage = {
      inputTokens: 0,
      outputTokens: 0,
      cacheReadTokens: 0,
      cacheCreationTokens: 0,
    };

    for (const response of responses) {
      usage.inputTokens += response.usage.input_tokens;
      usage.outputTokens += response.usage.output_tokens;
      usage.cacheReadTokens += response.usage.cache_read_input_tokens ?? 0;
      usage.cacheCreationTokens += response.usage.cache_creation_input_tokens ?? 0;

      const text = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map(b => b.text)
        .join('');

      allSections.push(...parseSections(text));
    }

    return { sections: allSections, usage };
  }

  async generateStreaming(
    input: ReportInput,
    onSection: (section: ReportSection) => void,
  ): Promise<SajuReport> {
    const callPrompts = [CALL1_PROMPT, CALL2_PROMPT, CALL3_PROMPT, CALL4_PROMPT];
    const allSections: ReportSection[] = [];
    const usage = {
      inputTokens: 0,
      outputTokens: 0,
      cacheReadTokens: 0,
      cacheCreationTokens: 0,
    };

    for (const sectionPrompt of callPrompts) {
      const stream = this.client.messages.stream({
        model: this.model,
        max_tokens: 4096,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [
          {
            role: 'user',
            content: buildUserMessage(input, sectionPrompt),
          },
        ],
      });

      const chunks: string[] = [];
      for await (const event of stream) {
        if (
          event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta'
        ) {
          chunks.push(event.delta.text);
        }
      }

      const finalMessage = await stream.finalMessage();
      usage.inputTokens += finalMessage.usage.input_tokens;
      usage.outputTokens += finalMessage.usage.output_tokens;
      usage.cacheReadTokens += finalMessage.usage.cache_read_input_tokens ?? 0;
      usage.cacheCreationTokens += finalMessage.usage.cache_creation_input_tokens ?? 0;

      const text = chunks.join('');
      const sections = parseSections(text);
      for (const section of sections) {
        allSections.push(section);
        onSection(section);
      }
    }

    return { sections: allSections, usage };
  }
}
