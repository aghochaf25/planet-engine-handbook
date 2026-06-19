"use client";

import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import { Node, Edge } from "@xyflow/react";

const nodes: Node[] = [
  {
    id: "raw",
    type: "input",
    data: { label: "Raw Direction Vector Vectors (Angles θ)" },
    position: { x: 250, y: 0 },
    style: { background: "#0c1524", border: "1px solid #334155", color: "#94a3b8", borderRadius: "8px" },
  },
  {
    id: "trig",
    type: "default",
    data: { label: "Trigonometric Conversion (sin θ, cos θ)" },
    position: { x: 250, y: 90 },
    style: { background: "#0c1524", border: "1px solid #0ea5e9", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "sum",
    type: "default",
    data: { label: "Circular Mean Vector Aggregation" },
    position: { x: 250, y: 180 },
    style: { background: "#0c1524", border: "1px solid #0d9488", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "weights",
    type: "default",
    data: { label: "Apply Provider Consensus Weights" },
    position: { x: 250, y: 270 },
    style: { background: "#0c1524", border: "1px solid #10b981", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "final",
    type: "output",
    data: { label: "Normalized Swell Direction" },
    position: { x: 250, y: 360 },
    style: { background: "#0c1524", border: "1px solid #115e59", color: "#38bdf8", borderRadius: "8px" },
  },
];

const edges: Edge[] = [
  { id: "e-raw-trig", source: "raw", target: "trig", style: { stroke: "#334155" } },
  { id: "e-trig-sum", source: "trig", target: "sum", animated: true, style: { stroke: "#0ea5e9" } },
  { id: "e-sum-weights", source: "sum", target: "weights", style: { stroke: "#0d9488" } },
  { id: "e-weights-final", source: "weights", target: "final", animated: true, style: { stroke: "#10b981" } },
];

export default function ForecastPipeline() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Forecast Pipeline</h2>
        <p className="text-muted-foreground text-sm">
          Multi-source consensus blending pipeline utilizing circular statistic formulations for wave swell directions.
        </p>
      </div>

      <VerificationCard
        pageName="Forecast Pipeline Gateway"
        data={{
          status: "in_progress",
          coverage: 85,
          confidence: "High",
          reviewer: "Forecasting Lead Scientist",
        }}
      />

      <DiagramContainer
        title="Circular Consensus Blending Pipeline"
        description="Conversion flow of directional wave parameters to circular statistic averages."
        type="flow"
        nodes={nodes}
        edges={edges}
        flowHeight="400px"
      />
    </div>
  );
}
