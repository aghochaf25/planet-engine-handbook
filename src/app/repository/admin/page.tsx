"use client";

import React, { useState } from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import adminData from "@/data/admin.json";
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
  Network,
  Lock,
  Radio
} from "lucide-react";

export default function AdminTopography() {
  const [activeTab, setActiveTab] = useState<"overview" | "routes" | "hooks" | "debt">("overview");
  const [selectedRoute, setSelectedRoute] = useState<any>(adminData.protectedRoutes[0]);
  const [selectedHook, setSelectedHook] = useState<any>(adminData.hooks[0]);

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Title & Metadata */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500/10 p-2 rounded-lg border border-teal-500/20">
            <Lock className="h-8 w-8 text-teal-400" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Admin OS & Operations Control Center
            </h2>
            <p className="text-muted-foreground text-sm">
              Operational dashboard managing spots calibration, truth audits, database growth, and Server-Sent Event (SSE) streams.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Gate Card */}
      <VerificationCard
        pageName="Admin OS Module"
        data={{
          status: adminData.status as any,
          coverage: adminData.coverage,
          filesReviewed: adminData.filesReviewed,
          functionsReviewed: adminData.functionsReviewed,
          confidence: adminData.confidence as any,
          verificationDate: adminData.verificationDate,
          reviewer: adminData.reviewer,
          lastCommit: adminData.lastCommit
        }}
      />

      {/* Tab Switcher */}
      <div className="flex border-b border-border bg-slate-950/40 p-1 rounded-lg max-w-fit gap-1">
        {[
          { id: "overview", label: "Module Overview", icon: Shield },
          { id: "routes", label: "Protected Directory", icon: Lock },
          { id: "hooks", label: "SSE Streams & Hooks", icon: Radio },
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
                  Core Purpose & Mission
                </h3>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                  Admin OS is the telemetry, monitoring, and calibration control deck of the WaveNow platform.
                  It permits administrators to configure physical model constants (fetch coordinates, shoaling ratios, and wrap coefficients),
                  manually trigger NOAA/ECMWF ingestion cycle schedules, audit historical forecasts against direct observation consensus truth weights,
                  and inspect server health telemetry metrics (heap memory allocations, active goroutines, and database query latency) streamed live.
                </p>
              </div>

              {/* Architecture Details */}
              <div className="border border-border bg-slate-950/20 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="h-4.5 w-4.5 text-teal-400" />
                  Telemetry Infrastructure
                </h3>
                <div className="space-y-3.5 text-sm">
                  <div className="flex gap-3">
                    <div className="bg-teal-500/10 p-1.5 rounded text-teal-400 h-fit mt-0.5">
                      <Terminal className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">Server-Sent Events (SSE) Live Streams</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        Feeds continuous 1Hz resource updates, ingestion statuses, and chaotic phase-space attractor metrics directly from backend daemons, avoiding database polling overhead.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-teal-500/10 p-1.5 rounded text-teal-400 h-fit mt-0.5">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">Token-Locked Edge Guardrails</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        Enforces JSON Web Token (JWT) route headers on all 15 operational routes, redirecting unauthenticated traffic instantly to protect system calibrations.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-teal-500/10 p-1.5 rounded text-teal-400 h-fit mt-0.5">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">Unified Contracts Schema</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        Locks metrics definitions (such as ReplayMismatch, ForecastResidual, and EcologySnapshot) into a shared telemetry interface to guarantee strict structure alignment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats & Settings */}
            <div className="space-y-6">
              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Security Gateways</h4>
                <div className="space-y-2.5 font-mono text-xs">
                  {[
                    { header: "Auth Mechanism", val: "JWT Cookie / Auth Bearer" },
                    { header: "Protected Routes", val: "15 Sub-pages" },
                    { header: "Admin API Endpoint", val: "/api/v1/admin/*" },
                    { header: "Edge Middleware", val: "active" },
                    { header: "Rate Limiting", val: "100req/min (IP Bucket)" }
                  ].map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-900 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-slate-400">{h.header}</span>
                      <span className="text-teal-300 font-semibold">{h.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Dual-Write Ingestion Logging</h4>
                <div className="text-xs text-muted-foreground space-y-2.5 leading-relaxed">
                  <p>
                    Persistence operations stream database rows to dual backends concurrently. Failed records generate Dead Letter Queue (DLQ) alerts, forcing manual re-trigger options inside Orchestration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "routes" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Protected Directory List */}
            <div className="border border-border bg-slate-950/20 rounded-xl p-4 flex flex-col gap-4 h-[550px]">
              <div>
                <h3 className="text-sm font-bold text-white">Protected Control Subsystems</h3>
                <p className="text-[11px] text-muted-foreground">Select a directory to inspect its utility</p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin">
                {adminData.protectedRoutes.map((route) => (
                  <button
                    key={route.path}
                    onClick={() => setSelectedRoute(route)}
                    className={`w-full p-3 rounded-lg border text-left font-mono text-xs transition-all flex items-center justify-between ${
                      selectedRoute?.path === route.path
                        ? "border-teal-500 bg-teal-950/20 text-teal-300 font-bold"
                        : "border-slate-900 bg-slate-950/40 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-950 text-amber-400 border border-amber-800">
                        ADMIN
                      </span>
                      <span className="truncate max-w-[200px]">{route.path}</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            {/* Route Inspector details */}
            <div className="lg:col-span-2 border border-border bg-card rounded-xl p-6 h-[550px] overflow-hidden flex flex-col justify-between">
              {selectedRoute ? (
                <div className="space-y-6 overflow-y-auto flex-1 scrollbar-thin">
                  {/* Header */}
                  <div className="border-b border-slate-900 pb-4">
                    <span className="text-[10px] uppercase font-mono text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-900">
                      Subsystem Inspector
                    </span>
                    <h3 className="text-xl font-bold font-mono text-slate-200 mt-2 flex items-center gap-2">
                      <Lock className="h-4.5 w-4.5 text-teal-400" />
                      (protected){selectedRoute.path}
                    </h3>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Functional Role</h4>
                      <p className="text-sm text-slate-300 mt-1 leading-relaxed">{selectedRoute.desc}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-900 py-4">
                      <div>
                        <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Security State</h4>
                        <span className="text-xs font-mono text-teal-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 inline-block mt-1">
                          JWT Cookie Required
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Directory Path</h4>
                        <span className="text-xs font-mono text-cyan-400 inline-block mt-1">
                          admin/src/app/(protected){selectedRoute.path}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                  <Lock className="h-8 w-8 text-slate-800 animate-pulse mb-3" />
                  <span className="text-sm font-semibold">Select a Subsystem</span>
                  <p className="text-xs mt-1">Pick an admin directory in the left list to review its specifications.</p>
                </div>
              )}

              {/* Safety notice */}
              <div className="border-t border-slate-900 pt-3 mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-emerald-500" />
                  Verified Gate Policy Compliance
                </span>
                <span>Active Commit: {adminData.lastCommit}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hooks" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hooks List */}
            <div className="border border-border bg-slate-950/20 rounded-xl p-4 flex flex-col gap-4 h-[550px]">
              <div>
                <h3 className="text-sm font-bold text-white">SSE Telemetry Listeners</h3>
                <p className="text-[11px] text-muted-foreground">Select a hook to inspect its stream target</p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-thin">
                {/* Hooks */}
                <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">React Hooks</div>
                {adminData.hooks.map((hook) => (
                  <button
                    key={hook.name}
                    onClick={() => setSelectedHook(hook)}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex flex-col gap-1 ${
                      selectedHook?.name === hook.name
                        ? "border-teal-500 bg-teal-950/20 text-teal-300"
                        : "border-slate-900 bg-slate-950/40 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{hook.name}</span>
                    <span className="text-[10px] text-muted-foreground line-clamp-1">{hook.file}</span>
                  </button>
                ))}

                {/* Schemas */}
                <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-4 mb-1">Shared Interfaces</div>
                {adminData.schemas.map((schema) => (
                  <button
                    key={schema.name}
                    onClick={() => setSelectedHook(schema)}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex flex-col gap-1 ${
                      selectedHook?.name === schema.name
                        ? "border-teal-500 bg-teal-950/20 text-teal-300"
                        : "border-slate-900 bg-slate-950/40 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{schema.name}</span>
                    <span className="text-[10px] text-muted-foreground line-clamp-1">{schema.file}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hook Inspector details */}
            <div className="lg:col-span-2 border border-border bg-card rounded-xl p-6 h-[550px] overflow-hidden flex flex-col justify-between">
              {selectedHook ? (
                <div className="space-y-6 overflow-y-auto flex-1 scrollbar-thin">
                  {/* Header */}
                  <div className="border-b border-slate-900 pb-4">
                    <span className="text-[10px] uppercase font-mono text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-900">
                      Module Inspector
                    </span>
                    <h3 className="text-xl font-bold text-slate-200 mt-2 font-mono flex items-center gap-2">
                      <Radio className="h-5 w-5 text-teal-400 animate-pulse" />
                      {selectedHook.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">admin/src/{selectedHook.file}</p>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Functional Role</h4>
                      <p className="text-sm text-slate-300 mt-1 leading-relaxed">{selectedHook.description}</p>
                    </div>

                    {selectedHook.endpoint && (
                      <div className="border-t border-slate-900 pt-4">
                        <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Stream Endpoint</h4>
                        <span className="text-xs font-mono text-teal-300 bg-slate-950 px-2 py-1 rounded border border-slate-900 inline-block mt-1">
                          {selectedHook.endpoint}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                  <Radio className="h-8 w-8 text-slate-800 mb-3" />
                  <span className="text-sm font-semibold">Select a Telemetry hook</span>
                  <p className="text-xs mt-1">Pick a hook in the left list to review its stream specifications.</p>
                </div>
              )}

              {/* Safety notice */}
              <div className="border-t border-slate-900 pt-3 mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                  Complete coverage verification passed
                </span>
                <span>Active Commit: {adminData.lastCommit}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "debt" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-border bg-card rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-[3px] w-full bg-amber-500" />
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
                  Operational Debt & Telemetry Vulnerabilities
                </h3>
                <div className="mt-4 space-y-4 text-sm text-slate-300">
                  <div className="border-l-2 border-amber-500 pl-4 space-y-1">
                    <h4 className="font-bold text-slate-200">Fallback Polling API Overhead</h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      If SSE drops, the hook defaults to polling the REST API at 15-second intervals. While functional, multiple administrators loading the cockpit page concurrently will create a burst of HTTP traffic on backend database servers.
                    </p>
                  </div>
                  <div className="border-l-2 border-amber-500 pl-4 space-y-1">
                    <h4 className="font-bold text-slate-200">Prisma Client Thread Blockages</h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      During calibration recomputes, raw sql transactions inside Postgres are executed synchronously to verify math. If the connection pool saturates, this blocks incoming EventSource streams.
                    </p>
                  </div>
                  <div className="border-l-2 border-amber-500 pl-4 space-y-1">
                    <h4 className="font-bold text-slate-200">Client-Side JWT verification</h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      The Next.js middleware verifies JWT header expiration but does not check token revocation blacklists, relying on backend API gateways to throw 401 statuses on subsequent requests.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Audit Checklist</h4>
              <div className="space-y-3 text-xs">
                {[
                  { label: "JWT Route guards fully implemented", ok: true },
                  { label: "15 protected sub-directories checked", ok: true },
                  { label: "Server-Sent Events hooks validated", ok: true },
                  { label: "Offline polling fallbacks verified", ok: true },
                  { label: "Prisma schema model constraints audited", ok: true }
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
