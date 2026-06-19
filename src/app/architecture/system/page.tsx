"use client";

import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import { Node, Edge } from "@xyflow/react";

const nodes: Node[] = [
  {
    id: "ingest",
    type: "default",
    data: { label: "Ingestion Schedulers (NOAA / Copernicus)" },
    position: { x: 250, y: 0 },
    style: { background: "#0c1524", border: "1px solid #0d9488", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "manager",
    type: "default",
    data: { label: "RealtimeStateManager (Go memory)" },
    position: { x: 250, y: 100 },
    style: { background: "#0c1524", border: "1px solid #0ea5e9", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "db",
    type: "output",
    data: { label: "Postgres Storage (PostGIS Coordinates)" },
    position: { x: 100, y: 200 },
    style: { background: "#0c1524", border: "1px solid #334155", color: "#94a3b8", borderRadius: "8px" },
  },
  {
    id: "api",
    type: "default",
    data: { label: "API Gateway (Public / Admin auth)" },
    position: { x: 400, y: 200 },
    style: { background: "#0c1524", border: "1px solid #0ea5e9", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "sse",
    type: "output",
    data: { label: "SSE Client Broadcaster" },
    position: { x: 400, y: 300 },
    style: { background: "#0c1524", border: "1px solid #115e59", color: "#38bdf8", borderRadius: "8px" },
  },
];

const edges: Edge[] = [
  { id: "e1-2", source: "ingest", target: "manager", animated: true, style: { stroke: "#0d9488" } },
  { id: "e2-3", source: "manager", target: "db", style: { stroke: "#334155" } },
  { id: "e2-4", source: "manager", target: "api", style: { stroke: "#0ea5e9" } },
  { id: "e4-5", source: "api", target: "sse", animated: true, style: { stroke: "#38bdf8" } },
];

export default function SystemArchitecture() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">System Architecture Map</h2>
        <p className="text-muted-foreground text-sm">
          Topological view of Planet Engine&apos;s major layers: ingestion pipelines, state storage, and public data routers.
        </p>
      </div>

      <VerificationCard
        pageName="System Architecture Topology"
        data={{
          status: "verified",
          coverage: 100,
          confidence: "High",
          reviewer: "Platform Engineering Lead",
        }}
      />

      <DiagramContainer
        title="Planet Core Infrastructure Layout"
        description="Interactive nodes represent containerized boundary layers. Arrows trace primary execution data flows."
        type="flow"
        nodes={nodes}
        edges={edges}
        flowHeight="400px"
      />
    </div>
  );
}
