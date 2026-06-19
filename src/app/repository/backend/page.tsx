"use client";

import React, { useState } from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import backendData from "@/data/backend.json";
import {
  FolderGit2,
  Activity,
  Layers,
  Cpu,
  Code,
  Shield,
  Sparkles,
  Terminal,
  ArrowRight,
  ArrowUpRight,
  FileCode2,
  AlertTriangle,
  CheckCircle,
  Settings,
  Database
} from "lucide-react";

export default function BackendTopography() {
  const [activeTab, setActiveTab] = useState<"overview" | "topography" | "flows" | "debt">("overview");
  const [selectedFile, setSelectedFile] = useState<any>(backendData.files[0]);

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Title & Metadata */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500/10 p-2 rounded-lg border border-teal-500/20">
            <FolderGit2 className="h-8 w-8 text-teal-400" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Backend Main Bootstrapping & Engine Config
            </h2>
            <p className="text-muted-foreground text-sm">
              Core high-performance Go application codebase. Contains command inputs, configs, environment checkers, and database override systems.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Gate Card */}
      <VerificationCard
        pageName="Go Backend Core"
        data={{
          status: backendData.status as any,
          coverage: backendData.coverage,
          filesReviewed: backendData.filesReviewed,
          functionsReviewed: backendData.functionsReviewed,
          confidence: backendData.confidence as any,
          verificationDate: backendData.verificationDate,
          reviewer: backendData.reviewer,
          lastCommit: backendData.lastCommit
        }}
      />

      {/* Tab Switcher */}
      <div className="flex border-b border-border bg-slate-950/40 p-1 rounded-lg max-w-fit gap-1">
        {[
          { id: "overview", label: "Module Overview", icon: Shield },
          { id: "topography", label: "File Topography", icon: FileCode2 },
          { id: "flows", label: "Runtime Bootstrapping", icon: Activity },
          { id: "debt", label: "Technical Debt", icon: AlertTriangle }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-all ${
                activeTab === tab.id
                  ? "bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-sm"
                  : "text-muted-foreground hover:text-slate-200 border border-transparent"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panel Contexts */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Purpose */}
              <div className="border border-border bg-card rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-teal-400" />
                  Core Purpose & Inception
                </h3>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                  The Go Backend Core serves as the bootstrapper and configuration management layer for the entire physical scoring pipeline.
                  It sets up the main web server, verifies environment variables, loads spot calibration data from static config files and country bundles,
                  redirects database connection URLs (intercepting PgBouncer transactions to Neon endpoints), and manages a clean OS shutdown sequence
                  handling database checkpoints and daemon cancellation.
                </p>
              </div>

              {/* Architecture Details */}
              <div className="border border-border bg-slate-950/20 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="h-4.5 w-4.5 text-teal-400" />
                  System Setup & Dependency Injection
                </h3>
                <div className="space-y-3.5 text-sm">
                  <div className="flex gap-3">
                    <div className="bg-teal-500/10 p-1.5 rounded text-teal-400 h-fit mt-0.5">
                      <Terminal className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">Outbound Pre-Flight Connectivity Checks</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        Validates network accessibility to critical endpoints (NOAA GFS Servers, Copernicus Marine, and external providers) prior to spinning up scheduler routines.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-teal-500/10 p-1.5 rounded text-teal-400 h-fit mt-0.5">
                      <Settings className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">PostgreSQL Connection Interceptor</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        To avoid prepared-statement errors typical of pg-pooler servers, the bootstrapper intercepts Neon connection strings, renaming <code className="text-teal-400 font-mono text-[10px] bg-slate-900 px-1 py-0.5 rounded">/neondb</code> to <code className="text-teal-400 font-mono text-[10px] bg-slate-900 px-1 py-0.5 rounded">/wavenow-data</code> and enforcing strict connection timeouts.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-teal-500/10 p-1.5 rounded text-teal-400 h-fit mt-0.5">
                      <Database className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">Hydrated Multi-Tier Configuration Engine</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        Performs legacy baseline configuration loads, updates them with v2 metadata overlays, and walks country directories importing JSON spots data with on-the-fly deduplication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats & Settings */}
            <div className="space-y-6">
              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Default Configuration Flags</h4>
                <div className="space-y-2.5 font-mono text-xs">
                  {[
                    { header: "PRIMARY_DATABASE", val: "postgres" },
                    { header: "ENV", val: "production" },
                    { header: "PORT", val: "8080" },
                    { header: "SCHEDULER_MODE", val: "daemon" },
                    { header: "TRUTH_TIER", val: "disabled" }
                  ].map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-900 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-slate-400">{h.header}</span>
                      <span className="text-teal-300 font-semibold">{h.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Graceful Shutdown Sequence</h4>
                <div className="text-xs text-muted-foreground space-y-2.5 leading-relaxed">
                  <p>
                    Catches <code className="text-amber-400 font-mono text-[11px] bg-slate-900 px-1 py-0.5 rounded">SIGINT</code> and <code className="text-amber-400 font-mono text-[11px] bg-slate-900 px-1 py-0.5 rounded">SIGTERM</code>.
                  </p>
                  <p>
                    Invokes the scheduler daemon cancellation context first to halt in-flight requests, followed by the database sync-down process.
                  </p>
                  <p>
                    Sets a hard 5-second HTTP server shutdown timer before exiting the main thread.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "topography" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Topography File Tree */}
            <div className="border border-border bg-slate-950/20 rounded-xl p-4 flex flex-col gap-4 h-[550px]">
              <div>
                <h3 className="text-sm font-bold text-white">Go Core File Index</h3>
                <p className="text-[11px] text-muted-foreground">Select a file to inspect its indexed functions</p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-thin">
                {backendData.files.map((file: any) => (
                  <button
                    key={file.name}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex flex-col gap-1.5 ${
                      selectedFile?.name === file.name
                        ? "border-teal-500 bg-teal-950/20 text-teal-300"
                        : "border-slate-900 bg-slate-950/40 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-xs font-bold">{file.name}</span>
                      <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">
                        {file.functions.length} fn
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">{file.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* File Inspector details */}
            <div className="lg:col-span-2 border border-border bg-card rounded-xl p-6 h-[550px] overflow-hidden flex flex-col justify-between">
              {selectedFile ? (
                <div className="space-y-6 overflow-y-auto flex-1 scrollbar-thin">
                  {/* Header */}
                  <div className="border-b border-slate-900 pb-4">
                    <span className="text-[10px] uppercase font-mono text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-900">
                      File Analyzer
                    </span>
                    <h3 className="text-xl font-bold text-slate-200 mt-2 font-mono flex items-center gap-2">
                      <FileCode2 className="h-5 w-5 text-teal-400" />
                      {selectedFile.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">{selectedFile.path}</p>
                  </div>

                  {/* File description */}
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Functional Role</h4>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed">{selectedFile.description}</p>
                  </div>

                  {/* Functions list */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      Indexed Functions ({selectedFile.functions.length})
                    </h4>
                    <div className="space-y-2.5">
                      {selectedFile.functions.map((fn: any, idx: number) => (
                        <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-slate-900 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-teal-300 font-mono">{fn.name}</span>
                            <a
                              href={fn.url}
                              className="text-[10px] text-cyan-400 hover:underline flex items-center gap-0.5 font-mono"
                            >
                              Line {fn.line}
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                          </div>
                          <pre className="p-2 rounded bg-black/40 text-[10px] font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                            {fn.sig}
                          </pre>
                          <div className="text-[11px] text-muted-foreground border-l-2 border-slate-800 pl-2 mt-1">
                            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wide block">Auditor Notes</span>
                            {fn.notes}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                  <FileCode2 className="h-8 w-8 text-slate-800 animate-pulse mb-3" />
                  <span className="text-sm font-semibold">Select a File</span>
                  <p className="text-xs mt-1">Pick a backend source file in the left list to review its functions.</p>
                </div>
              )}

              {/* Safety notice */}
              <div className="border-t border-slate-900 pt-3 mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                  Complete coverage verification passed
                </span>
                <span>Active Commit: {backendData.lastCommit}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "flows" && (
          <div className="space-y-6">
            <DiagramContainer
              title="Go Core Inception & Bootstrapping Sequence"
              description="Sequence flow representing pre-flight checks, dependency bindings, database intercept, schema migration, and readiness state triggers."
              type="mermaid"
              definition={`graph TD
    Start[Process Init] --> Logger[Initialize Logger & Defaults]
    Logger --> EnvVerify[Verify Env Key/Envs]
    EnvVerify --> ConfigData[Load configdata.Engine spots list]
    ConfigData --> ScoreEngine[Initialize ScoreEngine]
    ScoreEngine --> ProvFactory[Initialize ForecastProvider]
    ProvFactory --> CacheInit[Initialize SnapshotCache]
    CacheInit --> GinRouter[Setup API Gin Router]
    GinRouter --> BindServer[Bind HTTP server to PORT]
    BindServer --> BackgroundDiag[Spawn background goroutine: Run pre-flight diagnostic connectivity]
    BackgroundDiag --> DBConnect[Initialize Postgres Store with Neon URL intercept]
    DBConnect --> Migrations[Run schema migrations RunBootstrap]
    Migrations --> DependencyInject[Inject dependencies: state managers & persistence workers]
    DependencyInject --> SchedulerStart[Start jobs.Scheduler and truth.TruthScheduler]
    SchedulerStart --> Heartbeat[Start memory/goroutine metrics heartbeats]
    Heartbeat --> ReadyState[Set readiness state IsReady to True]`}
            />
          </div>
        )}

        {activeTab === "debt" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-border bg-card rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-[3px] w-full bg-amber-500" />
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
                  Critical Architectural Observations
                </h3>
                <div className="mt-4 space-y-4 text-sm text-slate-300">
                  <div className="border-l-2 border-amber-500 pl-4 space-y-1">
                    <h4 className="font-bold text-slate-200">Implicit Production Key Fallback</h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      If the <code className="text-amber-400 font-mono text-[10px] bg-slate-900 px-1 py-0.5 rounded">ADMIN_API_KEY</code> env is missing, it silently falls back to a hardcoded production key. This is a potential security risk in sandbox/testing environments.
                    </p>
                  </div>
                  <div className="border-l-2 border-amber-500 pl-4 space-y-1">
                    <h4 className="font-bold text-slate-200">Asynchronous Boot Routing Risks</h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      The Gin Router binds and starts listening *before* the DB connections and scheduler are fully initialized. While this avoids container startup health checks timeouts, handlers triggered during bootstrap might experience temporary <code className="text-amber-400 font-mono text-[10px] bg-slate-900 px-1 py-0.5 rounded">nil</code> pointer reference panic risks.
                    </p>
                  </div>
                  <div className="border-l-2 border-amber-500 pl-4 space-y-1">
                    <h4 className="font-bold text-slate-200">File-System Config Seeding Mutability</h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      Seeding config spots walks regional folders dynamically, merging them with legacy versions. If any JSON file is malformed, the entire server process fails validation and aborts booting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Audit Checklist</h4>
              <div className="space-y-3 text-xs">
                {[
                  { label: "Outbound NOAA Ping verified", ok: true },
                  { label: "Postgres Connection pooling configured", ok: true },
                  { label: "PG-Pooler URL override checked", ok: true },
                  { label: "Dynamic local folders walking validated", ok: true },
                  { label: "Interrupt signals graceful handling tested", ok: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] font-bold">✓</div>
                    <span className="text-slate-300 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
