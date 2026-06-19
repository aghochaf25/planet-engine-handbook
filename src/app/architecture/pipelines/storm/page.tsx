"use client";

import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import { Node, Edge } from "@xyflow/react";

const nodes: Node[] = [
  {
    id: "poly",
    type: "input",
    data: { label: "Fetch Storm Wind Polygon" },
    position: { x: 250, y: 0 },
    style: { background: "#0c1524", border: "1px solid #334155", color: "#94a3b8", borderRadius: "8px" },
  },
  {
    id: "group",
    type: "default",
    data: { label: "Calculate Wave Group Velocity" },
    position: { x: 250, y: 90 },
    style: { background: "#0c1524", border: "1px solid #0ea5e9", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "decay",
    type: "default",
    data: { label: "Apply Wave Decay Equations" },
    position: { x: 250, y: 180 },
    style: { background: "#0c1524", border: "1px solid #0d9488", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "attrib",
    type: "output",
    data: { label: "Write Storm Spot Attributions" },
    position: { x: 250, y: 270 },
    style: { background: "#0c1524", border: "1px solid #115e59", color: "#38bdf8", borderRadius: "8px" },
  },
];

const edges: Edge[] = [
  { id: "e-poly-group", source: "poly", target: "group", style: { stroke: "#334155" } },
  { id: "e-group-decay", source: "group", target: "decay", animated: true, style: { stroke: "#0ea5e9" } },
  { id: "e-decay-attrib", source: "decay", target: "attrib", animated: true, style: { stroke: "#0d9488" } },
];

export default function StormEnginePipeline() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Storm Engine Pipeline</h2>
        <p className="text-muted-foreground text-sm">
          Trace representing swell propagation decay models, tracking decay rates as waves travel away from storm fetch boundaries.
        </p>
      </div>

      <VerificationCard
        pageName="Storm Engine Pipeline"
        data={{
          status: "in_progress",
          coverage: 72,
          confidence: "Medium",
          reviewer: "Hydrodynamics Specialist",
        }}
      />

      <DiagramContainer
        title="Wave Swell Propagation Lifecycle"
        description="Tracks swell generation boundaries, velocity vectors, decay computations, and coastal attributes."
        type="flow"
        nodes={nodes}
        edges={edges}
        flowHeight="350px"
      />
    </div>
  );
}
