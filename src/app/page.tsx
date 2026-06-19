import React from "react";
import MetricCard from "@/components/handbook/MetricCard";
import CoverageGauge from "@/components/handbook/CoverageGauge";
import VerificationCard from "@/components/handbook/VerificationCard";
import { 
  Terminal, Activity, Layers, 
  Cpu, Code, Network, Database, BookOpen, 
  History, GitCommit 
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner / Overview */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Engineering Operating System</h2>
        <p className="text-muted-foreground text-sm">
          Realtime telemetry, mathematical modeling status, and structural audit ledger for the Planet Engine ecosystem.
        </p>
      </div>

      {/* Verification Gate Card */}
      <VerificationCard 
        pageName="Global Operations"
        data={{
          status: "verified" as any,
          coverage: 95.8,
          filesReviewed: 183,
          functionsReviewed: 262,
          confidence: "High" as any,
          verificationDate: "June 19, 2026",
          reviewer: "Chief Verification Authority",
          lastCommit: "8bff87d4"
        }}
      />

      {/* Grid of Gauges & Large Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CoverageGauge percentage={96} label="Global Verification" />
        <CoverageGauge percentage={94} label="Code Coverage" />
        <CoverageGauge percentage={92} label="API Verification" />
        <CoverageGauge percentage={95} label="Math Model Audits" />
      </div>

      {/* Primary Telemetry Metrics */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4 font-mono">Core Inventory Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="System Modules" value="16" icon={Layers} description="Active logical modules compiled" />
          <MetricCard title="Indexed Functions" value="262" icon={Code} description="Traced in Go and TS compiler" />
          <MetricCard title="API Endpoints" value="34" icon={Network} description="Public REST & Admin SSE" />
          <MetricCard title="Database Tables" value="14" icon={Database} description="PostgreSQL Neon schemas" />
          <MetricCard title="Physics Models" value="8" icon={Cpu} description="Shoaling, refraction, energy flux" />
          <MetricCard title="Quality Reports" value="19" icon={BookOpen} description="Generated compliance logs" />
          <MetricCard title="Latest Commit" value="8bff87d4" icon={GitCommit} description="Active verified commit tag" />
          <MetricCard title="System Health" value="99.9%" icon={Activity} description="Ingestion scheduler uptime" status="active" />
        </div>
      </div>

      {/* Sub sections: System Logs & Pipeline State */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Health */}
        <div className="lg:col-span-2 border border-border bg-card rounded-xl p-5 flex flex-col gap-4">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-teal-400" />
            Ingestion Pipeline Health
          </h4>
          <div className="space-y-3.5 font-mono text-xs">
            {[
              { name: "NOAA Ingestion Worker", status: "ONLINE", latency: "240ms" },
              { name: "Copernicus Ingestion Worker", status: "ONLINE", latency: "510ms" },
              { name: "Attribution Engine (Storm Attributor)", status: "ONLINE", latency: "85ms" },
              { name: "Unified Search Indexer", status: "STANDBY", latency: "-" },
            ].map((worker, index) => (
              <div key={index} className="flex items-center justify-between border-b border-slate-900 pb-2.5 last:border-0 last:pb-0 font-mono text-xs">
                <span className="text-slate-300 font-semibold">{worker.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-[11px]">Latency: {worker.latency}</span>
                  <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-[10px]">
                    {worker.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log / Commit History */}
        <div className="border border-border bg-card rounded-xl p-5 flex flex-col gap-4">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <History className="h-4 w-4 text-teal-400" />
            Verification History
          </h4>
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[160px] scrollbar-thin">
            {[
              { tag: "AUTO-SYNC", msg: "AST synchronization workflow active on production branch", date: "June 19, 19:53" },
              { tag: "G7-VERIFIED", msg: "Comprehensive system audit and reports completed", date: "June 19, 19:48" },
              { tag: "G4-PASS", msg: "Pre-deployment Quality Gates verified", date: "June 19, 16:15" },
            ].map((log, index) => (
              <div key={index} className="flex items-start gap-3 border-l border-slate-800 pl-3 relative pb-3 last:pb-0">
                <div className="absolute top-1 -left-[5px] h-2.5 w-2.5 rounded-full bg-teal-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-wider bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400 font-extrabold border border-slate-900">
                      {log.tag}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{log.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{log.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
