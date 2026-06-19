"use client";

import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import { Node, Edge } from "@xyflow/react";

const nodes: Node[] = [
  {
    id: "grib",
    type: "input",
    data: { label: "NOAA GRIB2 File Stream" },
    position: { x: 50, y: 150 },
    style: { background: "#0c1524", border: "1px solid #334155", color: "#94a3b8", borderRadius: "8px" },
  },
  {
    id: "cop",
    type: "input",
    data: { label: "Copernicus NetCDF Stream" },
    position: { x: 50, y: 250 },
    style: { background: "#0c1524", border: "1px solid #334155", color: "#94a3b8", borderRadius: "8px" },
  },
  {
    id: "parser",
    type: "default",
    data: { label: "Binary Grid Parser" },
    position: { x: 250, y: 200 },
    style: { background: "#0c1524", border: "1px solid #0ea5e9", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "consensus",
    type: "default",
    data: { label: "Consensus Weight Calculator" },
    position: { x: 450, y: 200 },
    style: { background: "#0c1524", border: "1px solid #0d9488", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "postgis",
    type: "output",
    data: { label: "PostGIS Spatially Bound Spots" },
    position: { x: 650, y: 200 },
    style: { background: "#0c1524", border: "1px solid #115e59", color: "#38bdf8", borderRadius: "8px" },
  },
];

const edges: Edge[] = [
  { id: "e-grib-parse", source: "grib", target: "parser", animated: true, style: { stroke: "#334155" } },
  { id: "e-cop-parse", source: "cop", target: "parser", animated: true, style: { stroke: "#334155" } },
  { id: "e-parse-con", source: "parser", target: "consensus", style: { stroke: "#0ea5e9" } },
  { id: "e-con-db", source: "consensus", target: "postgis", animated: true, style: { stroke: "#0d9488" } },
];

export default function DataFlow() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Data Flow Layout</h2>
        <p className="text-muted-foreground text-sm">
          Trace showing the conversion of multi-gigabyte spatial binary datasets into lightweight site-specific spot telemetry vectors.
        </p>
      </div>

      <VerificationCard
        pageName="Pipeline Data Flows"
        data={{
          status: "verified",
          coverage: 100,
          confidence: "High",
          reviewer: "Data Architect",
        }}
      />

      <DiagramContainer
        title="Dynamic Dataset Transformation Lifecycle"
        description="Tracks directional telemetry flows from raw binary data ingestion, parsing, weighting filters to SQL records."
        type="flow"
        nodes={nodes}
        edges={edges}
        flowHeight="400px"
      />
    </div>
  );
}
