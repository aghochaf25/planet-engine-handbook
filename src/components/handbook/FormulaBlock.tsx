import React from "react";
import katex from "katex";

interface FormulaBlockProps {
  formula: string;
  description?: string;
  inline?: boolean;
}

export default function FormulaBlock({ formula, description, inline = false }: FormulaBlockProps) {
  let html = "";
  try {
    html = katex.renderToString(formula, {
      displayMode: !inline,
      throwOnError: false,
    });
  } catch {
    html = formula; // Fallback to raw text if parsing fails
  }

  if (inline) {
    return (
      <span
        className="inline-block px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded font-mono text-cyan-400 align-middle"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className="my-6 p-6 rounded-xl border border-border bg-slate-950/60 neon-glow-teal flex flex-col items-center justify-center">
      <div
        className="overflow-x-auto max-w-full text-foreground text-lg py-2 select-all scrollbar-thin"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {description && (
        <p className="mt-3 text-xs italic text-muted-foreground text-center border-t border-slate-900 pt-2 w-full max-w-[80%]">
          {description}
        </p>
      )}
    </div>
  );
}
