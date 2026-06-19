"use client";

import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import { Node, Edge } from "@xyflow/react";

const nodes: Node[] = [
  {
    id: "cron",
    type: "input",
    data: { label: "Ingestion Cron Trigger (Tick)" },
    position: { x: 250, y: 0 },
    style: { background: "#0c1524", border: "1px solid #ef4444", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "check",
    type: "default",
    data: { label: "Acquire Mutex Lock / Check Exec Status" },
    position: { x: 250, y: 90 },
    style: { background: "#0c1524", border: "1px solid #0ea5e9", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "fetch",
    type: "default",
    data: { label: "Execute Parallel Fetch Workers" },
    position: { x: 250, y: 180 },
    style: { background: "#0c1524", border: "1px solid #0d9488", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "state",
    type: "default",
    data: { label: "RealtimeStateManager Checkpoint Rotation" },
    position: { x: 250, y: 270 },
    style: { background: "#0c1524", border: "1px solid #10b981", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "release",
    type: "output",
    data: { label: "Release Lock & Sleep" },
    position: { x: 250, y: 360 },
    style: { background: "#0c1524", border: "1px solid #334155", color: "#94a3b8", borderRadius: "8px" },
  },
];

const edges: Edge[] = [
  { id: "e-cron-check", source: "cron", target: "check", style: { stroke: "#ef4444" } },
  { id: "e-check-fetch", source: "check", target: "fetch", animated: true, style: { stroke: "#0ea5e9" } },
  { id: "e-fetch-state", source: "fetch", target: "state", style: { stroke: "#0d9488" } },
  { id: "e-state-rel", source: "state", target: "release", animated: true, style: { stroke: "#10b981" } },
];

export default function SchedulerPipeline() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Scheduler Pipeline</h2>
        <p className="text-muted-foreground text-sm">
          Execution cycle of periodic data ingestion engines, tracking Mutex concurrency limits and checkpoint states.
        </p>
      </div>

      <VerificationCard
        pageName="Scheduler Pipeline"
        data={{
          status: "verified",
          coverage: 92,
          confidence: "High",
          reviewer: "System Lead Architect",
        }}
      />

      <DiagramContainer
        title="Ingestion Scheduler Lifecycle"
        description="Tracks tick triggers, mutex locking, execution threads, and state checkpoint commits."
        type="flow"
        nodes={nodes}
        edges={edges}
        flowHeight="400px"
      />
    </div>
  );
}
