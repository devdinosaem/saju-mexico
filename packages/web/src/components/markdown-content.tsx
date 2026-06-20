"use client";

function parseMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

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
          <span>{parseInline(line.replace(/^\s*[-•]\s/, ""))}</span>
        </div>
      );
      continue;
    }

    // 이모지로 시작하는 항목 (🎨, 🧭, etc)
    if (line.match(/^\s*[🎨🧭🔢💧🍽️⏰💎🌊⚡💰⚠️✅❌]/u)) {
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
  0: "🪞",  // Tu Esencia
  1: "⚖️",  // Cinco Elementos
  2: "💪",  // Fuerza Interior
  3: "🔮",  // Diez Dioses
  4: "💕",  // Amor
  5: "💰",  // Dinero
  6: "🚀",  // Carrera
  7: "🏥",  // Salud
  8: "📊",  // Grandes Estaciones
  9: "📅",  // Año Actual
  10: "🔗", // Relaciones
  11: "✨",  // Elemento de Poder
  12: "⭐",  // Estrellas
  13: "🧭",  // Mensaje Final
};

interface MarkdownContentProps {
  content: string;
  sectionIndex: number;
}

export function MarkdownContent({ content, sectionIndex }: MarkdownContentProps) {
  return (
    <div className="text-text-secondary text-sm leading-relaxed">
      {parseMarkdown(content)}
    </div>
  );
}

export function getSectionIcon(index: number): string {
  return SECTION_ICONS[index] || "✦";
}
