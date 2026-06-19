"use client";

import React, { useEffect, useState, useId } from "react";
import { ReactFlow, Background, Controls, Node, Edge } from "@xyflow/react";

// Initialize mermaid library on the client side
let mermaidInitialized = false;

interface FlowDiagramProps {
  nodes: Node[];
  edges: Edge[];
  height?: string;
}

export function FlowDiagram({ nodes, edges, height = "400px" }: FlowDiagramProps) {
  return (
    <div style={{ height }} className="border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        colorMode="dark"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#334155" gap={16} size={1} />
        <Controls className="!bg-slate-900 !border-slate-800 !text-slate-200" />
      </ReactFlow>
      <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
        Interactive Flow Map
      </div>
    </div>
  );
}

interface MermaidDiagramProps {
  definition: string;
}

export function MermaidDiagram({ definition }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const id = useId();
  const elementId = `mermaid-${id.replace(/:/g, "")}`;

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const mermaidModule = (await import("mermaid")).default;
        if (!mermaidInitialized) {
          mermaidModule.initialize({
            startOnLoad: false,
            theme: "dark",
            securityLevel: "loose",
            themeVariables: {
              background: "#0c1524",
              primaryColor: "#0ea5e9",
              primaryTextColor: "#f8fafc",
              lineColor: "#334155",
              secondaryColor: "#1e293b",
              tertiaryColor: "#060913",
            },
          });
          mermaidInitialized = true;
        }

        const { svg: renderedSvg } = await mermaidModule.render(elementId, definition);
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error("Mermaid parsing error:", err);
        setError("Failed to render Mermaid diagram. Check syntax.");
      }
    };

    renderDiagram();
  }, [definition, elementId]);

  if (error) {
    return (
      <div className="p-4 rounded-xl border border-rose-950/40 bg-rose-950/10 text-rose-400 text-xs font-mono">
        {error}
        <pre className="mt-2 p-2 bg-black/40 rounded text-slate-400 overflow-x-auto">{definition}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center p-8 border border-border bg-slate-950/40 rounded-xl animate-pulse text-xs text-muted-foreground">
        Rendering sequence diagram...
      </div>
    );
  }

  return (
    <div className="border border-slate-800 rounded-xl bg-slate-950/60 p-6 overflow-x-auto flex justify-center">
      <div className="w-full max-w-4xl" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}

interface DiagramContainerProps {
  title: string;
  description?: string;
  type: "flow" | "mermaid";
  // Props for Flow
  nodes?: Node[];
  edges?: Edge[];
  flowHeight?: string;
  // Props for Mermaid
  definition?: string;
}

export default function DiagramContainer({
  title,
  description,
  type,
  nodes = [],
  edges = [],
  flowHeight = "400px",
  definition = "",
}: DiagramContainerProps) {
  return (
    <div className="flex flex-col gap-3 my-6">
      <div>
        <h4 className="text-sm font-bold text-foreground">{title}</h4>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>

      {type === "flow" ? (
        <FlowDiagram nodes={nodes} edges={edges} height={flowHeight} />
      ) : (
        <MermaidDiagram definition={definition} />
      )}
    </div>
  );
}
