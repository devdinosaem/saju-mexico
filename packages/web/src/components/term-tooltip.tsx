"use client";

import { useState } from "react";
import { GLOSSARY, type GlossaryKey } from "@/lib/glossary";

interface TermTooltipProps {
  termKey: GlossaryKey;
  children?: React.ReactNode;
  showKorean?: boolean;
}

export function TermTooltip({ termKey, children, showKorean = true }: TermTooltipProps) {
  const [open, setOpen] = useState(false);
  const entry = GLOSSARY[termKey];
  if (!entry) return <>{children}</>;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-gold/90 hover:text-gold underline decoration-dotted decoration-gold/30 underline-offset-2 transition-colors cursor-help"
      >
        {children || entry.term}
        {showKorean && (
          <span className="text-text-muted text-xs no-underline">({entry.korean})</span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-[420px] mx-4 mb-4 bg-bg-secondary rounded-2xl border border-gold/10 shadow-2xl animate-slide-up overflow-hidden">
            {/* Header */}
            <div className="bg-bg-card px-5 py-4 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold">{entry.term}</h3>
                  <p className="text-text-muted text-xs">
                    {entry.korean}
                    {entry.hanja && ` (${entry.hanja})`}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-text-muted hover:text-text-primary text-xl transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-gold text-sm mt-2">{entry.short}</p>
            </div>

            {/* Body */}
            <div className="px-5 py-4 space-y-3 max-h-[50vh] overflow-y-auto">
              <p className="text-text-secondary text-sm leading-relaxed">{entry.long}</p>

              {entry.analogy && (
                <div className="bg-bg-surface/50 rounded-xl p-3 border border-gold/5">
                  <p className="text-xs text-gold mb-1 font-semibold">💡 Para entenderlo mejor:</p>
                  <p className="text-text-secondary text-sm leading-relaxed italic">
                    {entry.analogy}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface ConceptCardProps {
  termKey: GlossaryKey;
  compact?: boolean;
}

export function ConceptCard({ termKey, compact = false }: ConceptCardProps) {
  const entry = GLOSSARY[termKey];
  if (!entry) return null;

  if (compact) {
    return (
      <div className="bg-bg-surface/30 rounded-lg px-3 py-2 border border-white/5 mb-4">
        <p className="text-xs leading-relaxed">
          <span className="text-gold font-semibold">¿Qué es esto?</span>{" "}
          <span className="text-text-secondary">{entry.short}</span>
          {entry.analogy && (
            <span className="text-text-muted"> — {entry.analogy}</span>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-xl p-4 border border-gold/10 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gold text-xs font-semibold uppercase tracking-wider">¿Qué es esto?</span>
        <span className="text-text-muted text-xs">{entry.korean} {entry.hanja && `(${entry.hanja})`}</span>
      </div>
      <p className="text-sm font-semibold mb-1">{entry.term}: {entry.short}</p>
      <p className="text-text-secondary text-xs leading-relaxed">{entry.long}</p>
      {entry.analogy && (
        <p className="text-text-muted text-xs leading-relaxed mt-2 italic">
          💡 {entry.analogy}
        </p>
      )}
    </div>
  );
}
