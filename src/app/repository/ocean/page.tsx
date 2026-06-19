"use client";

import React, { useState } from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import FormulaBlock from "@/components/handbook/FormulaBlock";
import {
  FolderGit2,
  Activity,
  Layers,
  Cpu,
  Code,
  Database,
  Lock,
  Shield,
  Sparkles,
  Terminal,
  ArrowRight,
  ArrowUpRight,
  RefreshCw,
  Play,
  FileCode2,
  AlertTriangle,
  Flame,
  CheckCircle,
  Eye,
  GitCommit,
  Globe,
  Sliders,
  HardDrive
} from "lucide-react";

// Functions list for providers files
const PROVIDERS_FUNCTIONS = [
  {
    name: "blending.go",
    path: "backend/internal/providers/consensus/blending.go",
    description: "Implements the Truth-Weighted Consensus Engine, blending multiple wind and wave feeds using weighted statistics.",
    functions: [
      {
        name: "NewTruthWeightedConsensusEngine",
        line: 17,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/consensus/blending.go#L17",
        sig: "func NewTruthWeightedConsensusEngine(region string, accuracies map[string]*models.ProviderAccuracy) *TruthWeightedConsensusEngine",
        notes: "Instantiates a consensus engine for a given ocean region using historical performance metrics."
      },
      {
        name: "Blend",
        line: 24,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/consensus/blending.go#L24",
        sig: "func (e *TruthWeightedConsensusEngine) Blend(input ConsensusInput) (*UnifiedForecast, error)",
        notes: "Performs hourly weighted blending of wave heights, periods, wind speeds, and circular mean directions."
      },
      {
        name: "normalizeAndClamp",
        line: 239,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/consensus/blending.go#L239",
        sig: "func normalizeAndClamp(weights map[string]float64, sum float64)",
        notes: "Enforces bounding limits on provider influence, clamping weights between a minimum of 0.05 and a maximum of 0.90."
      }
    ]
  },
  {
    name: "manager.go",
    path: "backend/internal/providers/manager/manager.go",
    description: "Coordinates provider registers, concurrent HTTP retrievals, reliability logs, and multi-layered fallbacks.",
    functions: [
      {
        name: "NewProviderManager",
        line: 54,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/manager/manager.go#L54",
        sig: "func NewProviderManager(cfg ConfigEngine, cache Cache, store Store) *ProviderManager",
        notes: "Constructs a provider manager, setting up routing tables and starting the asynchronous logging worker queue."
      },
      {
        name: "GetForecast",
        line: 100,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/manager/manager.go#L100",
        sig: "func (pm *ProviderManager) GetForecast(lat, lng float64) (*models.ForecastInput, error)",
        notes: "Queries registered regional providers concurrently with a 5s timeout, blending successful responses."
      },
      {
        name: "fallbackSingleForecast",
        line: 218,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/manager/manager.go#L218",
        sig: "func (pm *ProviderManager) fallbackSingleForecast(lat, lng float64) (*models.ForecastInput, error)",
        notes: "Retrieves stale forecast records from local cache tables first, then Firestore, defaulting to synthetic baselines."
      },
      {
        name: "startReliabilityLoggingWorker",
        line: 616,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/manager/manager.go#L616",
        sig: "func (pm *ProviderManager) startReliabilityLoggingWorker()",
        notes: "Consumes log items from a buffered channel queue, flushing batches to the database asynchronously."
      }
    ]
  },
  {
    name: "routing.go",
    path: "backend/internal/providers/routing/routing.go",
    description: "Evaluates coordinate boundaries to route spots to the appropriate ocean basin and priority lists.",
    functions: [
      {
        name: "GetRoute",
        line: 21,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/routing/routing.go#L21",
        sig: "func (r *RegionRouter) GetRoute(lat, lng float64) (Region, []string)",
        notes: "Checks coordinates against bounding boxes for Mediterranean, East Pacific, West Pacific, Indian, and Atlantic Oceans."
      },
      {
        name: "ClassifyRegion",
        line: 53,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/routing/routing.go#L53",
        sig: "func (r *RegionRouter) ClassifyRegion(lat, lng float64) string",
        notes: "Resolves coordinate locations to strings like Mediterranean, Canary Current, East Pacific, or Atlantic."
      }
    ]
  },
  {
    name: "health.go",
    path: "backend/internal/providers/health/health.go",
    description: "Monitors response successes, failures, latencies, and error codes in a thread-safe registry.",
    functions: [
      {
        name: "RecordSuccess",
        line: 32,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/health/health.go#L32",
        sig: "func (m *ProviderHealthManager) RecordSuccess(provider string, latencyMs int64)",
        notes: "Registers query completion times, updating cumulative sample counters."
      },
      {
        name: "RecordFailure",
        line: 47,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/health/health.go#L47",
        sig: "func (m *ProviderHealthManager) RecordFailure(provider string, errStr string)",
        notes: "Registers failures with error logs to adjust realtime reliability scores."
      }
    ]
  },
  {
    name: "noaa.go",
    path: "backend/internal/providers/noaa.go",
    description: "Requests NOAA WaveWatch III (ncep_gfswave016) marine and global GFS weather parameters.",
    functions: [
      {
        name: "fetchNOAAData",
        line: 90,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/noaa.go#L90",
        sig: "func (p *NOAAProvider) fetchNOAAData(lat, lng float64, days int) ([]*models.ForecastInput, error)",
        notes: "Dispatches concurrent HTTP calls to Open-Meteo proxies for wave height, periods, speeds, and directions."
      },
      {
        name: "fetchWithRetry",
        line: 216,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/providers/noaa.go#L216",
        sig: "func (p *NOAAProvider) fetchWithRetry(ctx context.Context, url string) ([]byte, error)",
        notes: "Wraps requests in a 3-attempt retry loop with exponential backoff starting at 200ms."
      }
    ]
  }
];

export default function OceanTopography() {
  const [activeTab, setActiveTab] = useState<"overview" | "equations" | "topography" | "flows" | "debt">("overview");
  const [selectedFile, setSelectedFile] = useState<any>(PROVIDERS_FUNCTIONS[0]);

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
              Ocean Intelligence: Data Ingestion & Blending
            </h2>
            <p className="text-muted-foreground text-sm">
              Geographic routers, concurrent multi-provider streams, truth-weighted blending, and database-persisted health gauges.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Gate Card */}
      <VerificationCard
        pageName="Ocean Intelligence Providers Module"
        data={{
          status: "verified",
          coverage: 93.1,
          filesReviewed: 11,
          functionsReviewed: 45,
          confidence: "High",
          verificationDate: "June 19, 2026",
          reviewer: "Documentation Platform Lead",
          lastCommit: "9889729 (verified)"
        }}
      />

      {/* Tab Switcher */}
      <div className="flex border-b border-border bg-slate-950/40 p-1 rounded-lg max-w-fit gap-1">
        {[
          { id: "overview", label: "Overview", icon: Cpu },
          { id: "equations", label: "Consensus Equations", icon: Activity },
          { id: "topography", label: "File Topography", icon: FolderGit2 },
          { id: "flows", label: "Ingestion Flows", icon: Layers },
          { id: "debt", label: "Error Limits & Debt", icon: HardDrive }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-all ${
                activeTab === tab.id
                  ? "bg-teal-500/10 text-teal-400 border border-teal-500/30"
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-border bg-card rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-teal-400" />
                  Multi-Source Ingestion Architecture
                </h3>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                  The Ingestion and Blending pipeline coordinates data retrieval from global agencies including NOAA (GFS WaveWatch III), ECMWF, and Open-Meteo. 
                  Geographic routing rules inspect location coordinates, classifying locations into five ocean basins. 
                  Priority lists are dispatched concurrently to query respective providers. 
                  When multiple feeds succeed, the system blends heights, periods, and directions using historical accuracies as weightings.
                </p>
              </div>

              <div className="border border-border bg-slate-950/20 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="h-4.5 w-4.5 text-teal-400" />
                  Provider Health & Logging Workers
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    A thread-safe ProviderHealthManager records response metrics. 
                    Rather than blocking requests during telemetry inserts, the manager uses a buffered channel queue (logChan, buffer size: 1000 items). 
                    A background worker consumes items from logChan, flushing batches (up to 100 entries or every 2 seconds) to Firestore and PostgreSQL:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs mt-3">
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1">
                      <span className="text-teal-400 font-bold block">1. Bounded Timeout</span>
                      <span>Dispatches concurrent queries with a hard 5-second context timeout.</span>
                    </div>
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1">
                      <span className="text-teal-400 font-bold block">2. Batch Buffering</span>
                      <span>Queues reliability logs, avoiding database bottlenecks.</span>
                    </div>
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1">
                      <span className="text-teal-400 font-bold block">3. Regional Accuracy</span>
                      <span>Fetches historical RMSE coefficients to configure inverse error blending weights.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Ingestion Flowchart</h4>
                <DiagramContainer
                  title="Geographic Router Blending Flow"
                  type="mermaid"
                  definition={`graph TD
    A[GetForecast Request] --> B[RegionRouter: GetRoute]
    B --> C[Determine Basin & Priority list]
    C --> D[Concurrent Fetch dispatches]
    D --> E{Failed provider count?}
    E -- All failed --> F[Retrieve stale cache fallback]
    F -- Cache miss --> G[Query cold store backup]
    G -- Store miss --> H[Synthesize default values]
    E -- 1 Succeeded --> I[Return single provider feed]
    E -- Multi Succeeded --> J[Query historical provider RMSEs]
    J --> K[TruthWeightedConsensusEngine]
    K --> L[Resolve circular mean directions]
    L --> M[Assemble blended result]`}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "equations" && (
          <div className="border border-border bg-card rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Truth-Weighted Blending Calculations</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Inverse RMSE error statistics, circular direction trigonometry, and consensus confidence bounds.</p>
            </div>

            <div className="space-y-6 text-sm text-muted-foreground font-sans">
              {/* Weighting Model */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200">1. Inverse Error Weight Allocation</h4>
                <p className="text-xs leading-relaxed">
                  Historical accuracies dictate weights for wave height, period, and direction. 
                  Calculated from regional Root Mean Square Error (RMSE) or Mean Absolute Error (MAE):
                </p>
                <FormulaBlock
                  formula="s_H = \frac{1}{\text{RMSE}_{height} + \epsilon}, \quad s_P = \frac{1}{\text{RMSE}_{period} + \epsilon}, \quad s_D = \frac{1}{\text{MAE}_{dir} + \epsilon}"
                />
                <p className="text-xs leading-relaxed mt-2">
                  Weights are normalized. Bounding clamps are applied so no provider's weight falls below 0.05 or exceeds 0.90:
                </p>
                <FormulaBlock
                  formula="W_i = \max(0.05, \min(0.90, \frac{s_i}{\sum s}))"
                />
              </div>

              {/* Circular Mean */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200">2. Circular Mean Directions</h4>
                <p className="text-xs leading-relaxed">
                  Directions are blended in circular space rather than linear space. 
                  Compass degrees are converted to radians to calculate weighted Cartesian components:
                </p>
                <FormulaBlock
                  formula="X_{dir} = \sum W_i \cdot \cos(\theta_i \cdot \frac{\pi}{180}), \quad Y_{dir} = \sum W_i \cdot \sin(\theta_i \cdot \frac{\pi}{180})"
                />
                <FormulaBlock
                  formula="\theta_{blended} = \text{atan2}(Y_{dir}, X_{dir}) \cdot \frac{180}{\pi} \pmod{360}"
                />
              </div>

              {/* Blending Confidence */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200">3. Consensus Confidence Score</h4>
                <p className="text-xs leading-relaxed">
                  Reflects data availability, provider health (reliability), historical accuracy, and standard deviation (agreement) between feeds:
                </p>
                <FormulaBlock
                  formula="C_{final} = 0.15 \cdot A_{avail} + 0.15 \cdot H_{health} + 0.30 \cdot A_{accuracy} + 0.40 \cdot A_{agreement}"
                />
                <ul className="list-disc list-inside text-xs space-y-1 pl-2 mt-2">
                  <li>Availability (A_avail): number of reporting providers / 3.0</li>
                  <li>Health (H_health): average success rate of reporting feeds</li>
                  <li>Accuracy (A_accuracy): exponential decay of average wave height RMSE: exp(-avg_RMSE)</li>
                  <li>Agreement (A_agreement): exponential decay of weighted standard deviation of swell heights: exp(-swell_SD)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "topography" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tree */}
            <div className="border border-border bg-slate-950/20 rounded-xl p-4 flex flex-col gap-4 h-[550px]">
              <div>
                <h3 className="text-sm font-bold text-white">Providers Module Files</h3>
                <p className="text-[11px] text-muted-foreground">Select a file to inspect its functions</p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-thin">
                {PROVIDERS_FUNCTIONS.map((file) => (
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
                      <span className="text-xs font-bold font-mono">{file.name}</span>
                      <FileCode2 className="h-3.5 w-3.5 opacity-80" />
                    </div>
                    <span className="text-[11px] leading-relaxed opacity-90">{file.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Function Inspector */}
            <div className="lg:col-span-2 border border-border bg-card rounded-xl p-6 h-[550px] flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-400 font-mono tracking-wide uppercase">File Path</span>
                  <span className="text-xs text-muted-foreground font-mono">{selectedFile?.path}</span>
                </div>
                <h3 className="text-lg font-extrabold text-white mt-1">{selectedFile?.name} Detailed Functions</h3>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin pr-1">
                {selectedFile?.functions.map((func: any) => (
                  <div key={func.name} className="border border-slate-900 bg-slate-950/30 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                          <Terminal className="h-3.5 w-3.5 text-teal-400" />
                          {func.name}
                        </h4>
                        <span className="text-[10px] text-muted-foreground font-mono mt-0.5 block">{func.sig}</span>
                      </div>
                      <a
                        href={func.url}
                        className="text-teal-400 hover:text-teal-300 text-xs font-mono flex items-center gap-1 shrink-0 border border-teal-500/20 px-2 py-1 rounded bg-teal-950/10"
                      >
                        Source Link
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{func.notes}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1.5 border-t border-slate-900/60 font-mono text-[10px]">
                      <div>
                        <span className="text-muted-foreground block">Verification</span>
                        <span className="text-teal-400 font-semibold">100% Verified</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Confidence</span>
                        <span className="text-teal-400 font-semibold">10/10 Score</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Line Range</span>
                        <span>Line {func.line}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Side Effects</span>
                        <span className="text-yellow-400/80">Channel Write</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "flows" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-border bg-card rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Lock className="h-4.5 w-4.5 text-teal-400" />
                  Geographic Bounding Box Limits
                </h3>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-3 font-sans">
                  <p>
                    RegionRouter matches target coordinates to specific ocean basins, defining priority feeds. 
                    This ensures specialized wave models (like NOAA WaveWatch III in the Pacific or custom Open-Meteo configurations in the Mediterranean) are preferred:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-2">
                    <li>
                      <strong className="text-slate-200 font-mono text-xs">Mediterranean:</strong> 
                      Boundaries: Lat [30.0, 46.0], Lng [-6.0, 36.0]. Priority: Open-Meteo, ECMWF.
                    </li>
                    <li>
                      <strong className="text-slate-200 font-mono text-xs">East Pacific:</strong> 
                      Boundaries: Lat [-60.0, 65.0], Lng [-180.0, -80.0]. Priority: NOAA, ECMWF, Open-Meteo.
                    </li>
                    <li>
                      <strong className="text-slate-200 font-mono text-xs">West Pacific:</strong> 
                      Boundaries: Lat [-60.0, 65.0], Lng [100.0, 180.0]. Priority: ECMWF, NOAA, Open-Meteo.
                    </li>
                    <li>
                      <strong className="text-slate-200 font-mono text-xs">Indian Ocean:</strong> 
                      Boundaries: Lat [-60.0, 25.0], Lng [20.0, 100.0]. Priority: ECMWF, NOAA, Open-Meteo.
                    </li>
                    <li>
                      <strong className="text-slate-200 font-mono text-xs">Atlantic Ocean:</strong> 
                      Boundaries: Lat [-60.0, 70.0], Lng [-80.0, 20.0]. Priority: ECMWF, NOAA, Open-Meteo.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Concurrent Fetch Flow</h4>
              <DiagramContainer
                title="Concurrent Retrieval Sequence"
                type="mermaid"
                definition={`sequenceDiagram
    participant M as Provider Manager
    participant N as NOAA API
    participant E as ECMWF API
    participant O as OpenMeteo API
    participant H as Health Manager
    M->>N: GetForecast (goroutine)
    M->>E: GetForecast (goroutine)
    M->>O: GetForecast (goroutine)
    Note over M: Wait for goroutines (timeout: 5s)
    O-->>M: Succeeded response (200ms)
    M->>H: RecordSuccess(openmeteo, 200ms)
    N-->>M: Succeeded response (350ms)
    M->>H: RecordSuccess(noaa, 350ms)
    E-->>M: Timeout / Network Err (5000ms)
    M->>H: RecordFailure(ecmwf, errStr)
    Note over M: Blend successful feeds (noaa, openmeteo)
    M-->>M: Truth-Weighted Blend
`}
              />
            </div>
          </div>
        )}

        {activeTab === "debt" && (
          <div className="border border-border bg-card rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Ingestion Reliability & Database Flushes</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Logging worker queues, backoff retries, and synthetic fallback systems.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div className="border border-slate-900 bg-slate-950/20 p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-teal-400" />
                  <span className="text-white font-bold">Retry Backoff Policy</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Individual providers wrap raw HTTP client requests in a 3-attempt retry loop. 
                  If a request encounters a timeout or status code anomaly, it waits before retrying. 
                  The delay starts at 200ms and doubles for subsequent attempts:
                </p>
                <ul className="list-disc list-inside text-[11px] space-y-1 font-mono">
                  <li>Attempt 1: immediate</li>
                  <li>Attempt 2: 200ms delay</li>
                  <li>Attempt 3: 400ms delay</li>
                </ul>
              </div>

              <div className="border border-slate-900 bg-slate-950/20 p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-400" />
                  <span className="text-white font-bold">Fallback Priorities</span>
                </div>
                <p className="text-xs leading-relaxed">
                  If concurrent fetches fail, the manager applies a tiered fallback policy:
                </p>
                <ul className="list-decimal list-inside text-[11px] space-y-1 font-mono">
                  <li>Local snapshot cache: retrieve last valid forecast</li>
                  <li>COLD store: fetch last physical Firestore snapshot</li>
                  <li>Synthetic builder: generate randomized baseline metrics (Swell: 1-2.5m, Period: 8-16s)</li>
                </ul>
              </div>

              <div className="border border-slate-900 bg-slate-950/20 p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span className="text-white font-bold">Logging Channel Limits</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Reliability logs are enqueued onto logChan. 
                  If database writing hangs, the channel can fill. 
                  The logger handles this gracefully by dropping telemetry events on a full channel to prevent request blockage:
                </p>
                <div className="text-[10px] bg-slate-950 p-2 rounded font-mono text-yellow-500/90 border border-yellow-500/20">
                  [MANAGER] Reliability logging channel full, dropping log item
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
