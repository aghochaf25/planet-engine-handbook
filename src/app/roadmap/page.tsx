import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import { Milestone, Flag, CircleDot, CheckCircle } from "lucide-react";

export default function Roadmap() {
  const roadmapItems = [
    {
      phase: "Phase 1: Foundation & TOPOGRAPHY",
      status: "COMPLETED",
      description: "Reverse-engineer existing surf-engine backend logic. Build the core handbook platform framework, code explorer layout, mathematical formulas, and verification cards.",
      milestones: ["Boot Next.js platform skeleton", "Install visual flow tools", "Set up KaTeX & Mermaid scripts", "Publish topography outline"],
    },
    {
      phase: "Phase 2: Ocean Knowledge Graph & Governance",
      status: "IN_PROGRESS",
      description: "Establish the unified metadata structures. Connect planets, ocean basins, seas, countries, and spots into a single spatial relationship tree in PostgreSQL.",
      milestones: ["Map spatial indexing logic", "Verify Spot DNA calculation loops", "Implement provider accuracy metrics", "Compile metadata consensus engine"],
    },
    {
      phase: "Phase 3: Independent Engine De-coupling",
      status: "PLANNED",
      description: "Extract core engines (Physics, Weather, Ocean) into independent microservices. Support high-frequency polling schedules and parallel netCDF dataset parser threads.",
      milestones: ["Separate wave equations package", "Harden SSE data streaming broker", "Create gRPC communications interface", "Optimize memory usage on grid parsing"],
    },
    {
      phase: "Phase 4: Global Verification Platform",
      status: "PLANNED",
      description: "Automated precision testing. Implement MAE/RMSE calculations comparing actual sensor buoys against blended forecasts to run continuously.",
      milestones: ["Integrate buoy telemetry fetching", "Generate daily MAE drift reports", "Harden AI consensus weight feedback loop"],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Milestone className="h-7 w-7 text-teal-400" />
          Planet Engine Roadmap
        </h2>
        <p className="text-muted-foreground text-sm">
          Expansion milestones from a localized forecasting system to a global distributed ocean intelligence network.
        </p>
      </div>

      <VerificationCard
        pageName="Roadmap Strategy"
        data={{
          status: "pending",
          coverage: 100,
          confidence: "Medium",
          reviewer: "Operations & Product Lead",
        }}
      />

      {/* Timeline view */}
      <div className="relative border-l border-slate-900 ml-4 pl-6 space-y-8">
        {roadmapItems.map((item, idx) => {
          const isDone = item.status === "COMPLETED";
          const isCurrent = item.status === "IN_PROGRESS";

          return (
            <div key={idx} className="relative group">
              {/* Bullet indicator */}
              <div className={`absolute top-1.5 -left-[30px] rounded-full border border-[#060913] p-1 ${
                isDone 
                  ? "bg-emerald-500 text-black" 
                  : isCurrent 
                  ? "bg-cyan-500 text-black animate-pulse" 
                  : "bg-slate-950 text-slate-600"
              }`}>
                {isDone ? <CheckCircle className="h-3 w-3" /> : <CircleDot className="h-3 w-3" />}
              </div>

              <div className="border border-border bg-card rounded-xl p-5 hover:border-teal-500/40 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-900">
                  <h3 className="text-sm font-bold text-foreground">{item.phase}</h3>
                  <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${
                    isDone 
                      ? "bg-emerald-950/40 text-emerald-400 border-emerald-800" 
                      : isCurrent 
                      ? "bg-cyan-950/40 text-cyan-400 border-cyan-800" 
                      : "bg-slate-950 text-slate-500 border-slate-900"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">{item.description}</p>

                <div className="mt-4">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Key Targets:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.milestones.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <Flag className={`h-3 w-3 ${isDone ? "text-emerald-400" : isCurrent ? "text-cyan-400" : "text-slate-600"}`} />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
