"use client";

import React, { useState } from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import { FileText, ChevronRight, ChevronDown, CheckCircle2 } from "lucide-react";

interface ADRItem {
  id: string;
  title: string;
  status: "Accepted" | "Superceded" | "Draft";
  date: string;
  context: string;
  decision: string;
  consequences: string[];
}

const ADR_LIST: ADRItem[] = [
  {
    id: "ADR-001",
    title: "Separation of Core Compute (Go) and Visual Operations (React)",
    status: "Accepted",
    date: "May 2026",
    context: "Planet Engine processes millions of float-based wave calculations per second. Rendering or data processing logic must never compile inside the same boundary to prevent blocking runtime loops.",
    decision: "Separate core forecasting computations into a high-performance Go binary. Expose REST/SSE APIs for data reading. Visualize layers independently inside a client React dashboard OS.",
    consequences: [
      "Physics computations run isolated from UI render loops.",
      "Clear separation of concerns (Go computes, Postgres stores, React visualizes).",
      "Deployments can occur independently on different cloud topologies.",
    ],
  },
  {
    id: "ADR-002",
    title: "PostgreSQL for Oceanographic Spatial Geometry Indexing",
    status: "Accepted",
    date: "June 2026",
    context: "Swells propagate across arbitrary polygon shapes (Ocean Basins, Seas, Spots). Geo-queries must fetch spots within bounding fetch angles and coastal outlines quickly.",
    decision: "Utilize PostgreSQL with PostGIS extension for geometry storage. Implement GIST indices on all lat/lng coordinate geometry columns.",
    consequences: [
      "Robust, queryable bounding-box lookups inside ingestion schedulers.",
      "High relational integrity between Spot coordinates and Country/Region hierarchies.",
    ],
  },
  {
    id: "ADR-003",
    title: "RealtimeStateManager Memory Allocation Isolation",
    status: "Accepted",
    date: "June 2026",
    context: "Concurrency leaks occurred during high-frequency API scans under high-traffic events, allocating garbage collection cycles dynamically.",
    decision: "Create a Sync.Pool memory allocation system inside Go's RealtimeStateManager. Re-use state buffer chunks instead of generating garbage-collected objects.",
    consequences: [
      "Drastic reduction in heap allocations.",
      "Zero GC latency spikes on core scheduler ticking cycles.",
    ],
  },
];

export default function ADR() {
  const [expandedId, setExpandedId] = useState<string | null>("ADR-001");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <FileText className="h-7 w-7 text-teal-400" />
          Architecture Decision Records
        </h2>
        <p className="text-muted-foreground text-sm">
          A historical archive of foundational architectural decisions, contexts, and trade-offs made in Planet Engine.
        </p>
      </div>

      <VerificationCard
        pageName="ADR Ledger"
        data={{
          status: "verified",
          coverage: 100,
          confidence: "High",
          reviewer: "Chief System Architect",
        }}
      />

      {/* Accordion List */}
      <div className="space-y-4">
        {ADR_LIST.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="border border-border bg-card rounded-xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-900/40 text-left font-semibold text-sm transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-teal-400 font-extrabold">{item.id}</span>
                  <h3 className="text-white font-bold">{item.title}</h3>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    item.status === "Accepted"
                      ? "bg-emerald-950/40 text-emerald-400 border-emerald-800"
                      : "bg-amber-950/40 text-amber-400 border-amber-800"
                  }`}>
                    {item.status}
                  </span>
                  {isExpanded ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 border-t border-slate-900 bg-slate-950/20 space-y-4 text-xs">
                  <div className="text-muted-foreground">ADR Created: <strong className="text-slate-300">{item.date}</strong></div>
                  
                  {/* Context */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Context & Problem</span>
                    <p className="text-slate-300 leading-relaxed bg-slate-950/40 border border-slate-900 p-3.5 rounded-lg">
                      {item.context}
                    </p>
                  </div>

                  {/* Decision */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-teal-500">Proposed Decision</span>
                    <p className="text-slate-200 font-semibold leading-relaxed border-l-2 border-teal-500 pl-3">
                      {item.decision}
                    </p>
                  </div>

                  {/* Consequences */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Consequences</span>
                    <ul className="space-y-1.5 pl-1.5">
                      {item.consequences.map((cons, idx) => (
                        <li key={idx} className="text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 mt-0.5 shrink-0" />
                          <span>{cons}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
