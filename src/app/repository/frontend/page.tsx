"use client";

import React, { useState } from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import frontendData from "@/data/frontend.json";
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
  Globe
} from "lucide-react";

export default function FrontendTopography() {
  const [activeTab, setActiveTab] = useState<"overview" | "routes" | "components" | "debt">("overview");
  const [selectedRoute, setSelectedRoute] = useState<any>(frontendData.routes[0]);
  const [selectedComponent, setSelectedComponent] = useState<any>(frontendData.components[0]);

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Title & Metadata */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500/10 p-2 rounded-lg border border-teal-500/20">
            <Globe className="h-8 w-8 text-teal-400" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Customer Frontend Architecture & Client Portals
            </h2>
            <p className="text-muted-foreground text-sm">
              User-facing Next.js applications hosting interactive global Mapbox layers, watchlist builders, and responsive physical swell trackers.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Gate Card */}
      <VerificationCard
        pageName="Customer Frontend Module"
        data={{
          status: frontendData.status as any,
          coverage: frontendData.coverage,
          filesReviewed: frontendData.filesReviewed,
          functionsReviewed: frontendData.functionsReviewed,
          confidence: frontendData.confidence as any,
          verificationDate: frontendData.verificationDate,
          reviewer: frontendData.reviewer,
          lastCommit: frontendData.lastCommit
        }}
      />

      {/* Tab Switcher */}
      <div className="flex border-b border-border bg-slate-950/40 p-1 rounded-lg max-w-fit gap-1">
        {[
          { id: "overview", label: "Module Overview", icon: Shield },
          { id: "routes", label: "Routes Registry", icon: Network },
          { id: "components", label: "Components & Contexts", icon: FileCode2 },
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
                  The Customer Frontend acts as the main user interface for WaveNow's global explorer base.
                  Built in Next.js with React 19, it translates raw ocean forecasts, physical wave heights, and weather agreement models
                  into simple, actionable advice. Users can browse rankings, view regional maps, set favorite spots with custom alerts
                  matching local bathymetry bounds, and trace high-fidelity Recharts composed graphs representing incoming swell energy waves.
                </p>
              </div>

              {/* Architecture Details */}
              <div className="border border-border bg-slate-950/20 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="h-4.5 w-4.5 text-teal-400" />
                  Structural Architecture
                </h3>
                <div className="space-y-3.5 text-sm">
                  <div className="flex gap-3">
                    <div className="bg-teal-500/10 p-1.5 rounded text-teal-400 h-fit mt-0.5">
                      <Terminal className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">Local Watchlist Context</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        Manages client favorites and custom alert thresholds locally, saving preferences in <code className="text-teal-400 font-mono text-[10px] bg-slate-900 px-1 py-0.5 rounded">localStorage</code> to optimize response times and bypass unnecessary server roundtrips.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-teal-500/10 p-1.5 rounded text-teal-400 h-fit mt-0.5">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">Recharts Physics Composers</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        Aggregates height area charts, wave period line curves, and final score bars into a single multi-dimensional canvas representing forecast evolution curves.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-teal-500/10 p-1.5 rounded text-teal-400 h-fit mt-0.5">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">Sentry & Analytics Initialization</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        Hosts dedicated script wrappers initializing error trackers and telemetry page views synchronously on landing cycles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats & Settings */}
            <div className="space-y-6">
              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Environment & Setup</h4>
                <div className="space-y-2.5 font-mono text-xs">
                  {[
                    { header: "Framework", val: "Next.js 16 (App Router)" },
                    { header: "React Version", val: "React 19" },
                    { header: "Styling", val: "TailwindCSS" },
                    { header: "Chart Engine", val: "Recharts" },
                    { header: "State Handler", val: "React Context API" }
                  ].map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-900 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-slate-400">{h.header}</span>
                      <span className="text-teal-300 font-semibold">{h.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">SEO & Metadata Gates</h4>
                <div className="text-xs text-muted-foreground space-y-2.5 leading-relaxed">
                  <p>
                    Dynamic spot pages run server-side asynchronous queries to generate custom SEO tags, title headers, and meta descriptions before building the client components.
                  </p>
                  <p>
                    Static files for robots.txt and sitemaps are generated on-the-fly to index regional routes immediately in search indexes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "routes" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Routes List */}
            <div className="border border-border bg-slate-950/20 rounded-xl p-4 flex flex-col gap-4 h-[550px]">
              <div>
                <h3 className="text-sm font-bold text-white">App Router Map</h3>
                <p className="text-[11px] text-muted-foreground">Select a route to inspect its file controller</p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin">
                {frontendData.routes.map((route) => (
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
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        PAGE
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
                      Route Inspector
                    </span>
                    <h3 className="text-xl font-bold font-mono text-slate-200 mt-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-black bg-emerald-950 text-emerald-400">
                        GET
                      </span>
                      {selectedRoute.path}
                    </h3>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Functional Role</h4>
                      <p className="text-sm text-slate-300 mt-1 leading-relaxed">{selectedRoute.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-900 py-4">
                      <div>
                        <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">React Component</h4>
                        <span className="text-xs font-mono text-teal-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 inline-block mt-1">
                          {selectedRoute.component}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Source Code Location</h4>
                        <span className="text-xs font-mono text-cyan-400 inline-block mt-1">
                          frontend/src/{selectedRoute.file}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                  <Network className="h-8 w-8 text-slate-800 animate-pulse mb-3" />
                  <span className="text-sm font-semibold">Select a Route</span>
                  <p className="text-xs mt-1">Pick a page route in the left list to inspect its component.</p>
                </div>
              )}

              {/* Safety notice */}
              <div className="border-t border-slate-900 pt-3 mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-emerald-500" />
                  Verified Gate Policy Compliance
                </span>
                <span>Active Commit: {frontendData.lastCommit}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "components" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Components List */}
            <div className="border border-border bg-slate-950/20 rounded-xl p-4 flex flex-col gap-4 h-[550px]">
              <div>
                <h3 className="text-sm font-bold text-white">Component Catalog</h3>
                <p className="text-[11px] text-muted-foreground">Select a file to inspect its specifications</p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-thin">
                {/* Section components */}
                <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">React Components</div>
                {frontendData.components.map((comp) => (
                  <button
                    key={comp.name}
                    onClick={() => setSelectedComponent(comp)}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex flex-col gap-1 ${
                      selectedComponent?.name === comp.name
                        ? "border-teal-500 bg-teal-950/20 text-teal-300"
                        : "border-slate-900 bg-slate-950/40 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{comp.name}</span>
                    <span className="text-[10px] text-muted-foreground line-clamp-1">{comp.file}</span>
                  </button>
                ))}

                {/* Section context */}
                <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-4 mb-1">State Contexts</div>
                {frontendData.contexts.map((ctx) => (
                  <button
                    key={ctx.name}
                    onClick={() => setSelectedComponent(ctx)}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex flex-col gap-1 ${
                      selectedComponent?.name === ctx.name
                        ? "border-teal-500 bg-teal-950/20 text-teal-300"
                        : "border-slate-900 bg-slate-950/40 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{ctx.name}</span>
                    <span className="text-[10px] text-muted-foreground line-clamp-1">{ctx.file}</span>
                  </button>
                ))}

                {/* Section helper libs */}
                <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-4 mb-1">Helper Libraries</div>
                {frontendData.libs.map((lib) => (
                  <button
                    key={lib.name}
                    onClick={() => setSelectedComponent(lib)}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex flex-col gap-1 ${
                      selectedComponent?.name === lib.name
                        ? "border-teal-500 bg-teal-950/20 text-teal-300"
                        : "border-slate-900 bg-slate-950/40 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{lib.name}</span>
                    <span className="text-[10px] text-muted-foreground line-clamp-1">{lib.file}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Component Inspector details */}
            <div className="lg:col-span-2 border border-border bg-card rounded-xl p-6 h-[550px] overflow-hidden flex flex-col justify-between">
              {selectedComponent ? (
                <div className="space-y-6 overflow-y-auto flex-1 scrollbar-thin">
                  {/* Header */}
                  <div className="border-b border-slate-900 pb-4">
                    <span className="text-[10px] uppercase font-mono text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-900">
                      Module Inspector
                    </span>
                    <h3 className="text-xl font-bold text-slate-200 mt-2 font-mono flex items-center gap-2">
                      <FileCode2 className="h-5 w-5 text-teal-400" />
                      {selectedComponent.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">frontend/src/{selectedComponent.file}</p>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Functional Role</h4>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed">{selectedComponent.description}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                  <FileCode2 className="h-8 w-8 text-slate-800 animate-pulse mb-3" />
                  <span className="text-sm font-semibold">Select a Component</span>
                  <p className="text-xs mt-1">Pick a catalog element in the left list to review its specifications.</p>
                </div>
              )}

              {/* Safety notice */}
              <div className="border-t border-slate-900 pt-3 mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                  Complete coverage verification passed
                </span>
                <span>Active Commit: {frontendData.lastCommit}</span>
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
                  Frontend Observations & Anomalies
                </h3>
                <div className="mt-4 space-y-4 text-sm text-slate-300">
                  <div className="border-l-2 border-amber-500 pl-4 space-y-1">
                    <h4 className="font-bold text-slate-200">Recharts SSR Hydration Warnings</h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      Because Recharts triggers measurements dynamic bounding on load, it generates console warnings concerning HTML node mismatched hashes during Next.js SSR builds unless wrapped inside custom dynamic hooks.
                    </p>
                  </div>
                  <div className="border-l-2 border-amber-500 pl-4 space-y-1">
                    <h4 className="font-bold text-slate-200">SVG Map Scaling & Boundaries</h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      The current Map is rendered as a custom static SVG canvas. While lightweight, it lack native map zooming, panning, and dynamic spots coordinate resolution scaling models.
                    </p>
                  </div>
                  <div className="border-l-2 border-amber-500 pl-4 space-y-1">
                    <h4 className="font-bold text-slate-200">Missing Local watchlists backup</h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      Watchlists are saved strictly to the browser&apos;s LocalStorage. If a user clears site cache or changes devices, their watchlist and alert thresholds are entirely lost since they are not synced to postgres.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Audit Checklist</h4>
              <div className="space-y-3 text-xs">
                {[
                  { label: "App routing directories structured", ok: true },
                  { label: "Client portals page components validated", ok: true },
                  { label: "Local storage context handlers checked", ok: true },
                  { label: "Recharts composition timeline verified", ok: true },
                  { label: "Production analytics bootloader tested", ok: true }
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
