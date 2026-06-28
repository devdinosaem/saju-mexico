"use client";

import {
  TEN_GOD_ES, PHASE_ES, STRENGTH_ES,
  SPIRIT_STAR_ES, SPECIAL_STAR_ES,
  YINYANG_ES,
} from "@/lib/translations";

const RENDER_DICT: Record<string, string> = {
  ...TEN_GOD_ES,
  ...PHASE_ES,
  ...STRENGTH_ES,
  ...SPIRIT_STAR_ES,
  ...SPECIAL_STAR_ES,
  ...YINYANG_ES,
  "Yang": "Sol", "Yin": "Luna",
  "Madera Yang": "Madera Sol", "Madera Yin": "Madera Luna",
  "Fuego Yang": "Fuego Sol", "Fuego Yin": "Fuego Luna",
  "Tierra Yang": "Tierra Sol", "Tierra Yin": "Tierra Luna",
  "Metal Yang": "Metal Sol", "Metal Yin": "Metal Luna",
  "Agua Yang": "Agua Sol", "Agua Yin": "Agua Luna",
  "用神": "Elemento de Poder", "忌神": "Elemento Adverso",
  "日柱": "Pilar del Día", "四柱": "Cuatro Pilares",
  "木": "Madera", "火": "Fuego", "土": "Tierra", "金": "Metal", "水": "Agua",
};

function sanitizeForRender(text: string): string {
  let result = text;
  const sorted = Object.entries(RENDER_DICT).sort((a, b) => b[0].length - a[0].length);
  for (const [original, translated] of sorted) {
    result = result.replace(new RegExp(original, 'g'), translated);
  }
  result = result.replace(/```[^\n]*\n?/g, '');
  return result;
}

function parseMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith("```")) continue;
    if (line.trim() === "---") continue;

    // ### 소제목
    if (line.startsWith("### ")) {
      result.push(
        <h4 key={i} className="font-serif text-base font-bold text-text-primary mt-4 mb-2">
          {parseInline(line.slice(4))}
        </h4>
      );
      continue;
    }

    // 빈 줄
    if (line.trim() === "") {
      result.push(<div key={i} className="h-2" />);
      continue;
    }

    // 리스트 (- 또는 •)
    if (line.match(/^\s*[-•]\s/)) {
      result.push(
        <div key={i} className="flex gap-2 ml-1 mb-1">
          <span className="text-gold text-xs mt-0.5">✦</span>
          <span className="flex-1">{parseInline(line.replace(/^\s*[-•]\s/, ""))}</span>
        </div>
      );
      continue;
    }

    // 짧은 이모지 항목 (🎨 Colores: ... 같은 가이드 항목만, 80자 이하)
    if (line.trim().length < 80 && line.match(/^[🎨🧭🔢💧🍽️⏰💎🌊⚡⚠️✅❌🌳🔥⛰️💎🪵🐀🐂🐅🐇🐉🐍🐴🐐🐒🐔🐕🐷]/u)) {
      result.push(
        <div key={i} className="bg-bg-surface/30 rounded-lg px-3 py-2 mb-1.5">
          {parseInline(line)}
        </div>
      );
      continue;
    }

    // 일반 텍스트
    result.push(
      <p key={i} className="mb-2">
        {parseInline(line)}
      </p>
    );
  }

  return result;
}

function parseInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // **bold**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(remaining.slice(0, boldMatch.index));
      }
      parts.push(
        <strong key={key++} className="text-text-primary font-semibold">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }

    // *italic*
    const italicMatch = remaining.match(/\*(.+?)\*/);
    if (italicMatch && italicMatch.index !== undefined) {
      if (italicMatch.index > 0) {
        parts.push(remaining.slice(0, italicMatch.index));
      }
      parts.push(
        <em key={key++} className="italic text-gold/80">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch.index + italicMatch[0].length);
      continue;
    }

    parts.push(remaining);
    break;
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

const SECTION_ICONS: Record<number, string> = {
  0: "🪞",
  1: "⚖️",
  2: "💪",
  3: "🔮",
  4: "💕",
  5: "💰",
  6: "🚀",
  7: "🏥",
  8: "📊",
  9: "📅",
  10: "🔗",
  11: "✨",
  12: "⭐",
  13: "🧭",
};

interface MarkdownContentProps {
  content: string;
  sectionIndex: number;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="text-text-secondary text-sm leading-relaxed">
      {parseMarkdown(sanitizeForRender(content))}
    </div>
  );
}

export function getSectionIcon(index: number): string {
  return SECTION_ICONS[index] || "✦";
}
