"use client";

import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import { Node, Edge } from "@xyflow/react";

const nodes: Node[] = [
  {
    id: "main",
    type: "input",
    data: { label: "cmd/main.go" },
    position: { x: 250, y: 0 },
    style: { background: "#0c1524", border: "1px solid #ef4444", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "api",
    type: "default",
    data: { label: "package api" },
    position: { x: 150, y: 100 },
    style: { background: "#0c1524", border: "1px solid #0ea5e9", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "scheduler",
    type: "default",
    data: { label: "package scheduler" },
    position: { x: 350, y: 100 },
    style: { background: "#0c1524", border: "1px solid #0d9488", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "physics",
    type: "default",
    data: { label: "package physics" },
    position: { x: 350, y: 200 },
    style: { background: "#0c1524", border: "1px solid #10b981", color: "#f8fafc", borderRadius: "8px" },
  },
  {
    id: "db",
    type: "default",
    data: { label: "package db" },
    position: { x: 150, y: 200 },
    style: { background: "#0c1524", border: "1px solid #334155", color: "#94a3b8", borderRadius: "8px" },
  },
  {
    id: "models",
    type: "output",
    data: { label: "package models" },
    position: { x: 250, y: 300 },
    style: { background: "#0c1524", border: "1px solid #334155", color: "#94a3b8", borderRadius: "8px" },
  },
];

const edges: Edge[] = [
  { id: "e-main-api", source: "main", target: "api", style: { stroke: "#ef4444" } },
  { id: "e-main-sched", source: "main", target: "scheduler", style: { stroke: "#ef4444" } },
  { id: "e-sched-phys", source: "scheduler", target: "physics", animated: true, style: { stroke: "#0d9488" } },
  { id: "e-api-db", source: "api", target: "db", style: { stroke: "#0ea5e9" } },
  { id: "e-sched-db", source: "scheduler", target: "db", style: { stroke: "#0d9488" } },
  { id: "e-phys-models", source: "physics", target: "models", style: { stroke: "#10b981" } },
  { id: "e-db-models", source: "db", target: "models", style: { stroke: "#334155" } },
];

export default function DependencyGraph() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Dependency Graph</h2>
        <p className="text-muted-foreground text-sm">
          A visual layout representing static imports and dependencies across backend Go packages.
        </p>
      </div>

      <VerificationCard
        pageName="Package Dependencies"
        data={{
          status: "verified",
          coverage: 100,
          confidence: "High",
          reviewer: "Principal Architect",
        }}
      />

      <DiagramContainer
        title="Package Dependency Tree"
        description="Tracks directional compilation dependencies. Node boundary colors correspond to logical layer classifications."
        type="flow"
        nodes={nodes}
        edges={edges}
        flowHeight="400px"
      />
    </div>
  );
}
