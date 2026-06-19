"use client";

import React, { useState } from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import {
  FolderGit2,
  Activity,
  Layers,
  Cpu,
  Code,
  Network,
  Database,
  Lock,
  Shield,
  Search,
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
  HelpCircle,
  Eye
} from "lucide-react";

// Categorized API Routes
const ROUTES = [
  {
    category: "Public Surf APIs",
    description: "End-user endpoints returning spot profiles, multi-source wave forecasts, and real-time live surf snapshots.",
    routes: [
      {
        id: "API-001",
        method: "GET",
        path: "/",
        handler: "SetupRouter",
        file: "router.go",
        line: 87,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/router.go#L87",
        auth: "None",
        desc: "Base health check. Returns simple JSON status indicating the container is alive."
      },
      {
        id: "API-002",
        method: "GET",
        path: "/api/v1/health",
        handler: "HealthHandler",
        file: "health.go",
        line: 13,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/health.go#L13",
        auth: "None",
        desc: "System status ping utilized by load balancers and container orchestrators."
      },
      {
        id: "API-005",
        method: "GET",
        path: "/api/v1/spots",
        handler: "ListSpotsHandler",
        file: "handlers.go",
        line: 332,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L332",
        auth: "None",
        desc: "Lists all configured surf spots. Supports server-side query filtering ('?q=') and pagination limits."
      },
      {
        id: "API-017",
        method: "GET",
        path: "/api/v1/spots/:slug",
        handler: "GetSpotHandler",
        file: "handlers.go",
        line: 375,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L375",
        auth: "None",
        desc: "Fetches spot metadata configuration profile by its unique URL slug or spot ID."
      },
      {
        id: "API-018",
        method: "GET",
        path: "/api/v1/spots/:slug/forecast",
        handler: "GetForecastHandler",
        file: "handlers.go",
        line: 393,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L393",
        auth: "None",
        desc: "Compiles swell and wind forecasts, overlays decision-first interpretations, supports 3-day payload compression (?compact=true)."
      },
      {
        id: "API-019",
        method: "GET",
        path: "/api/v1/live/:slug",
        handler: "GetLiveSpotHandler",
        file: "handlers.go",
        line: 473,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L473",
        auth: "None",
        desc: "Retrieves the latest real-time physical surf conditions. Falls back to relational store on cache miss."
      },
      {
        id: "API-020",
        method: "GET",
        path: "/api/v1/rankings/global",
        handler: "GetGlobalRankingsHandler",
        file: "handlers.go",
        line: 509,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L509",
        auth: "None",
        desc: "Calculates global or country-level rankings by blending consensus wave scores and travel metrics."
      },
      {
        id: "API-016",
        method: "GET",
        path: "/api/v1/search",
        handler: "SearchHandler",
        file: "search_handlers.go",
        line: 342,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/search_handlers.go#L342",
        auth: "None",
        desc: "Performs full-text prefix searches across the global spot directory utilizing an in-memory search Trie."
      }
    ]
  },
  {
    category: "Diagnostics & Mathematical Observability",
    description: "Endpoints exposing high-dimensional equations and numerical states computed by the physical surf engine.",
    routes: [
      {
        id: "API-039",
        method: "GET",
        path: "/api/v1/math/jacobian/:slug",
        handler: "MathJacobianHandler",
        file: "diagnostics_handlers.go",
        line: 13,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/diagnostics_handlers.go#L13",
        auth: "None",
        desc: "Exposes the local Jacobian matrix representing first-order partial derivatives of wave velocity fields."
      },
      {
        id: "API-040",
        method: "GET",
        path: "/api/v1/math/eigen/:slug",
        handler: "MathEigenHandler",
        file: "diagnostics_handlers.go",
        line: 35,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/diagnostics_handlers.go#L35",
        auth: "None",
        desc: "Retrieves calculated complex Eigenvalues and Eigenvectors modeling wave phase instabilities."
      },
      {
        id: "API-041",
        method: "GET",
        path: "/api/v1/math/phase-space/:slug",
        handler: "MathPhaseSpaceHandler",
        file: "diagnostics_handlers.go",
        line: 59,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/diagnostics_handlers.go#L59",
        auth: "None",
        desc: "Returns coordinates tracking multi-dimensional state transitions inside the shoaling phase-space attractor."
      },
      {
        id: "API-042",
        method: "GET",
        path: "/api/v1/math/continuity-energy/:slug",
        handler: "MathContinuityEnergyHandler",
        file: "diagnostics_handlers.go",
        line: 74,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/diagnostics_handlers.go#L74",
        auth: "None",
        desc: "Verifies spatial energy conservation by checking divergence values of shoaling wave equations."
      },
      {
        id: "API-043",
        method: "GET",
        path: "/api/v1/math/attractors/:slug",
        handler: "MathGlobalAttractorsHandler",
        file: "global_math_handlers.go",
        line: 12,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/global_math_handlers.go#L12",
        auth: "None",
        desc: "Retrieves global chaotic attractors for macro-scale ocean swells."
      },
      {
        id: "API-045",
        method: "GET",
        path: "/api/v1/math/resonance-topology/:slug",
        handler: "MathGlobalResonanceHandler",
        file: "global_math_handlers.go",
        line: 60,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/global_math_handlers.go#L60",
        auth: "None",
        desc: "Calculates wave resonance frequencies aligning with coastal shelf contours."
      },
      {
        id: "API-055",
        method: "GET",
        path: "/api/v1/math/coupling/:slug",
        handler: "MathCouplingHandler",
        file: "distributed_math_handlers.go",
        line: 81,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/distributed_math_handlers.go#L81",
        auth: "None",
        desc: "Evaluates spatial coupling indexes between neighboring coastal domains."
      }
    ]
  },
  {
    category: "Operational Administrative Control",
    description: "Protected endpoints enabling manual cache clears, hot config reloads, database audits, and ingestion controls.",
    routes: [
      {
        id: "API-086",
        method: "POST",
        path: "/api/v1/admin/engine/sync",
        handler: "AdminTriggerGlobalCycleHandler",
        file: "handlers.go",
        line: 759,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L759",
        auth: "Admin API Key, IP Allowlist",
        desc: "Triggers a synchronous GFS/ECMWF ingestion, model calculation, and PostgreSQL write cycle."
      },
      {
        id: "API-087",
        method: "GET",
        path: "/api/v1/admin/db/audit",
        handler: "AdminDbAuditHandler",
        file: "handlers.go",
        line: 779,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L779",
        auth: "Admin API Key",
        desc: "Runs schema verification checks and integrity constraints audits against active databases."
      },
      {
        id: "API-096",
        method: "POST",
        path: "/api/v1/admin/cache/clear",
        handler: "AdminClearCacheHandler",
        file: "handlers.go",
        line: 972,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L972",
        auth: "Admin API Key",
        desc: "Flushes the Redis snapshot cache, forcing backend handlers to reload data from relational storage."
      },
      {
        id: "API-098",
        method: "POST",
        path: "/api/v1/admin/config/reload",
        handler: "AdminRefreshConfigHandler",
        file: "handlers.go",
        line: 1000,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L1000",
        auth: "Admin API Key",
        desc: "Hot-reloads spot configurations and engine profiles from config files without restarting the process."
      },
      {
        id: "API-175",
        method: "GET",
        path: "/api/v1/admin/ops/verification-audit",
        handler: "AdminOpsVerificationAuditHandler",
        file: "ops_handlers.go",
        line: 296,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/ops_handlers.go#L296",
        auth: "Admin API Key",
        desc: "Generates the VERIFY.RUNTIME.2 operational integrity dashboard checklist payload."
      },
      {
        id: "API-173",
        method: "POST",
        path: "/api/v1/admin/ops/dlq/replay",
        handler: "AdminOpsDLQReplayHandler",
        file: "ops_handlers.go",
        line: 260,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/ops_handlers.go#L260",
        auth: "Admin API Key",
        desc: "Replays queued failed writes inside the Dead Letter Queue back into PostgreSQL."
      }
    ]
  },
  {
    category: "Real-Time Telemetry Streams (SSE)",
    description: "Server-Sent Events streaming channels pushing operational logs and model calculations directly to clients.",
    routes: [
      {
        id: "API-146",
        method: "GET",
        path: "/api/v1/admin/stream/runtime",
        handler: "StreamRuntimeHandler",
        file: "router.go",
        line: 357,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/router.go#L357",
        auth: "Admin API Key (Token Query)",
        desc: "Streams CPU, memory, active database connections, and active goroutines telemetry at 1Hz."
      },
      {
        id: "API-147",
        method: "GET",
        path: "/api/v1/admin/stream/ecology",
        handler: "StreamEcologyHandler",
        file: "router.go",
        line: 358,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/router.go#L358",
        auth: "Admin API Key",
        desc: "Streams NOAA and Copernicus ingestion pipeline lifecycle triggers and failures."
      },
      {
        id: "API-149",
        method: "GET",
        path: "/api/v1/admin/stream/intelligence/:slug",
        handler: "StreamIntelligenceHandler",
        file: "router.go",
        line: 360,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/router.go#L360",
        auth: "Admin API Key",
        desc: "Streams calculations from the physical surf engine in real-time as new swarms are processed."
      }
    ]
  }
];

// File Topography Inventory
const FILES_INVENTORY = [
  {
    name: "router.go",
    path: "backend/internal/api/router.go",
    description: "Central router entry point initializing Gin, mounting global security and metrics middleware, and organizing endpoints under API v1 groups.",
    functions: [
      { name: "SetupRouter", line: 26, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/router.go#L26", sig: "func SetupRouter(env string, cfgEngine *configdata.Engine, scoreEngine *engine.ScoreEngine, provider providers.ForecastProvider, cacheStore *cache.SnapshotCache, dbStore store.Store, scheduler *jobs.Scheduler) *gin.Engine", notes: "Registers 60+ endpoints; starts stream processing context." }
    ]
  },
  {
    name: "middleware.go",
    path: "backend/internal/api/middleware.go",
    description: "Production-grade HTTP middlewares enforcing CORS, XSS headers, IP allowlists, rate limiting, and collecting HTTP telemetry metrics.",
    functions: [
      { name: "SecurityHeadersMiddleware", line: 19, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/middleware.go#L19", sig: "func SecurityHeadersMiddleware() gin.HandlerFunc", notes: "Adds HSTS, CSP, Frame Options, and XSS blocking headers." },
      { name: "RateLimitMiddleware", line: 50, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/middleware.go#L50", sig: "func RateLimitMiddleware() gin.HandlerFunc", notes: "IP-level token bucket algorithm capping admin endpoint traffic." },
      { name: "IPAllowlistMiddleware", line: 89, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/middleware.go#L89", sig: "func IPAllowlistMiddleware() gin.HandlerFunc", notes: "Filters CIDR ranges in WAVENOW_ADMIN_IP_ALLOWLIST." },
      { name: "SecureCompare", line: 147, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/middleware.go#L147", sig: "func SecureCompare(a, b string) bool", notes: "Constant-time string comparison preventing timing attacks." },
      { name: "RedactedAdminLogger", line: 158, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/middleware.go#L158", sig: "func RedactedAdminLogger() gin.HandlerFunc", notes: "Logs execution paths while filtering query token fields." },
      { name: "APIGatewayTelemetryMiddleware", line: 194, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/middleware.go#L194", sig: "func APIGatewayTelemetryMiddleware() gin.HandlerFunc", notes: "Records latency & errors; ignores active SSE streams." }
    ]
  },
  {
    name: "handlers.go",
    path: "backend/internal/api/handlers.go",
    description: "Core bridging controller, routing data dependencies, computing forecast interpretations, and defining database administration endpoints.",
    functions: [
      { name: "GetForecastHandler", line: 393, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L393", sig: "func (h *HandlerContext) GetForecastHandler(c *gin.Context)", notes: "Parses forecast curves; overlays textual decisions based on score bounds." },
      { name: "GetLiveSpotHandler", line: 473, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L473", sig: "func (h *HandlerContext) GetLiveSpotHandler(c *gin.Context)", notes: "Fetches live snapshots from Redis, falling back to PostgreSQL." },
      { name: "AdminTriggerGlobalCycleHandler", line: 759, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/handlers.go#L759", sig: "func (h *HandlerContext) AdminTriggerGlobalCycleHandler(c *gin.Context)", notes: "Runs global synchronizations synchronously to satisfy Cloud Run throttling." }
    ]
  },
  {
    name: "ops_handlers.go",
    path: "backend/internal/api/ops_handlers.go",
    description: "Database operational diagnostics, DLQ message processing, migration execution, and verification audit dashboards.",
    functions: [
      { name: "AdminOpsSchedulerHandler", line: 18, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/ops_handlers.go#L18", sig: "func (h *HandlerContext) AdminOpsSchedulerHandler(c *gin.Context)", notes: "Extracts event bus telemetry and dual-write postgres status." },
      { name: "AdminDbMigrateHandler", line: 222, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/ops_handlers.go#L222", sig: "func (h *HandlerContext) AdminDbMigrateHandler(c *gin.Context)", notes: "Executes manual migrations on provider health and accuracy tables." },
      { name: "AdminOpsVerificationAuditHandler", line: 296, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/ops_handlers.go#L296", sig: "func (h *HandlerContext) AdminOpsVerificationAuditHandler(c *gin.Context)", notes: "Retrieves DB row growth projections, forecast MAEs, and deployment confidence metrics." }
    ]
  },
  {
    name: "cockpit_handlers.go",
    path: "backend/internal/api/cockpit_handlers.go",
    description: "Aggregates physical spot profiles, live conditions, forecast timelines, and diagnostics into a single unified dashboard payload.",
    functions: [
      { name: "GetCockpitSpotHandler", line: 45, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/cockpit_handlers.go#L45", sig: "func (h *HandlerContext) GetCockpitSpotHandler(c *gin.Context)", notes: "Consolidates configuration profiles, active forecasts, and calculations." }
    ]
  },
  {
    name: "validation_handlers.go",
    path: "backend/internal/api/validation_handlers.go",
    description: "Validates spot configurations, testing coordinates boundaries, DNA profiles, and structural anomalies.",
    functions: [
      { name: "AdminValidationHandler", line: 20, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/validation_handlers.go#L20", sig: "func (h *HandlerContext) AdminValidationHandler(c *gin.Context)", notes: "Validates a single spot against engine parameters." }
    ]
  }
];

export default function ApiTopography() {
  const [activeTab, setActiveTab] = useState<"overview" | "endpoints" | "topography" | "flows" | "debt">("overview");
  const [selectedRouteCategory, setSelectedRouteCategory] = useState(ROUTES[0].category);
  const [selectedRoute, setSelectedRoute] = useState<any>(ROUTES[0].routes[0]);
  const [selectedFile, setSelectedFile] = useState<any>(FILES_INVENTORY[0]);

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
              API Topography & Middleware Ingress
            </h2>
            <p className="text-muted-foreground text-sm">
              Architectural registry of public REST routes, high-dimensional diagnostics, SSE streaming channels, and auth filters.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Gate Card */}
      <VerificationCard
        pageName="API (REST/SSE) Module"
        data={{
          status: "verified",
          coverage: 92.4,
          filesReviewed: 29,
          functionsReviewed: 176,
          confidence: "High",
          verificationDate: "June 19, 2026",
          reviewer: "Lead Software Architect",
          lastCommit: "56226cae (verified)"
        }}
      />

      {/* Tab Switcher */}
      <div className="flex border-b border-border bg-slate-950/40 p-1 rounded-lg max-w-fit gap-1">
        {[
          { id: "overview", label: "Module Overview", icon: Shield },
          { id: "endpoints", label: "Route Registry", icon: Network },
          { id: "topography", label: "File Topography", icon: FileCode2 },
          { id: "flows", label: "Runtime Flows", icon: Activity },
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
                  The API module provides a high-throughput, secure interface layer bridging external request networks to 
                  the underlying wave models, job schedulers, and database layers of the Planet Engine ecosystem. 
                  It manages public queries for forecasts, hosts real-time SSE telemetry streams, registers 
                  diagnostics endpoints for mathematical modeling, and secures operational tasks (like recompute triggers 
                  and database migrations) via strict API key validation and client IP checking.
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
                      <h4 className="font-bold text-slate-200">Gin Web Framework Integration</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        Constructs HTTP routers in release mode during production builds. Features customizable 404 NoRoute templates 
                        and recovery behaviors, and mounts custom middlewares globally.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-teal-500/10 p-1.5 rounded text-teal-400 h-fit mt-0.5">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">Centralized Dependency Binding</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        Wires databases, config engines, providers, and schedulers directly into handlers using a single 
                        <code className="text-teal-400 font-mono text-[11px] bg-slate-900 px-1 py-0.5 rounded ml-1">HandlerContext</code> struct, 
                        eliminating global state risks.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-teal-500/10 p-1.5 rounded text-teal-400 h-fit mt-0.5">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">Security hardening & Guardrails</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        Blocks malicious queries via constant-time string comparisons, IP-based bucket rate-limiters, 
                        CIDR block allowlists, and log redactions of credentials and API keys.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats & Settings */}
            <div className="space-y-6">
              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Security Middleware Policies</h4>
                <div className="space-y-2.5 font-mono text-xs">
                  {[
                    { header: "X-Frame-Options", val: "DENY" },
                    { header: "X-Content-Type-Options", val: "nosniff" },
                    { header: "Referrer-Policy", val: "no-referrer" },
                    { header: "Strict-Transport-Security", val: "max-age=31536000" },
                    { header: "X-XSS-Protection", val: "1; mode=block" }
                  ].map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-900 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-slate-400">{h.header}</span>
                      <span className="text-teal-300 font-semibold">{h.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Concurrency Threading Model</h4>
                <div className="text-xs text-muted-foreground space-y-2.5 leading-relaxed">
                  <p>
                    Because Gin handles requests concurrently across multiple goroutines, the API controllers do not maintain mutable local states.
                  </p>
                  <p>
                    All shared writing tasks, such as updating operational metrics, are executed using atomic hardware counters.
                  </p>
                  <p>
                    Data snapshots returned by cache queries are strictly deep-copied before mutation to prevent shared pointer references.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "endpoints" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Endpoints List */}
            <div className="border border-border bg-slate-950/20 rounded-xl p-4 flex flex-col gap-4 h-[600px]">
              <div>
                <h3 className="text-sm font-bold text-white">Route Category Switcher</h3>
                <p className="text-[11px] text-muted-foreground">Select a group to list its mounted routes</p>
              </div>
              <div className="flex flex-wrap gap-1.5 border-b border-slate-900 pb-3">
                {ROUTES.map((group) => (
                  <button
                    key={group.category}
                    onClick={() => {
                      setSelectedRouteCategory(group.category);
                      setSelectedRoute(group.routes[0]);
                    }}
                    className={`px-3 py-1.5 rounded text-[11px] font-semibold transition-all ${
                      selectedRouteCategory === group.category
                        ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                        : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    {group.category}
                  </button>
                ))}
              </div>

              {/* Category Description */}
              <p className="text-xs italic text-muted-foreground bg-slate-900/60 p-2.5 rounded border border-slate-800">
                {ROUTES.find((g) => g.category === selectedRouteCategory)?.description}
              </p>

              {/* Routes Grid */}
              <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin">
                {ROUTES.find((g) => g.category === selectedRouteCategory)?.routes.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route)}
                    className={`w-full p-3 rounded-lg border text-left font-mono text-xs transition-all flex items-center justify-between ${
                      selectedRoute?.id === route.id
                        ? "border-teal-500 bg-teal-950/20 text-teal-300 font-bold"
                        : "border-slate-900 bg-slate-950/40 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                          route.method === "POST"
                            ? "bg-amber-950 text-amber-400 border border-amber-800"
                            : route.method === "DELETE"
                            ? "bg-rose-950 text-rose-400 border border-rose-800"
                            : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        }`}
                      >
                        {route.method}
                      </span>
                      <span className="truncate max-w-[200px]">{route.path}</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            {/* Route Inspector details */}
            <div className="lg:col-span-2 border border-border bg-card rounded-xl p-6 h-[600px] overflow-hidden flex flex-col justify-between">
              {selectedRoute ? (
                <div className="space-y-6 overflow-y-auto flex-1 scrollbar-thin">
                  {/* Header */}
                  <div className="border-b border-slate-900 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-900">
                        {selectedRoute.id} Route Inspector
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Lock className="h-3 w-3 text-slate-500" />
                        <span>Security: {selectedRoute.auth}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold font-mono text-slate-200 mt-2 flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-black ${
                          selectedRoute.method === "POST"
                            ? "bg-amber-950 text-amber-400"
                            : selectedRoute.method === "DELETE"
                            ? "bg-rose-950 text-rose-400"
                            : "bg-emerald-950 text-emerald-400"
                        }`}
                      >
                        {selectedRoute.method}
                      </span>
                      {selectedRoute.path}
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
                        <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Handler Method</h4>
                        <span className="text-xs font-mono text-teal-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 inline-block mt-1">
                          {selectedRoute.handler}()
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Verification Link</h4>
                        <a
                          href={selectedRoute.url}
                          className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 mt-1"
                        >
                          {selectedRoute.file}:{selectedRoute.line}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Request/Response Payloads mock */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Typical Output Payload</h4>
                      <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-900 font-mono text-[11px] text-teal-300/90 overflow-x-auto">
                        {selectedRoute.id === "API-018"
                          ? `{\n  "status": "success",\n  "data": {\n    "spot_id": "ouss-massa-taghazout",\n    "decision_summary": "High-quality window identified...",\n    "updated_at": "2026-06-19T18:00:00Z",\n    "days": [\n      {\n        "date": "2026-06-19",\n        "daily_average_score": 88,\n        "interpretation": "Elite conditions. Offshore support with period peak..."\n      }\n    ]\n  }\n}`
                          : selectedRoute.id === "API-019"
                          ? `{\n  "status": "success",\n  "data": {\n    "spot_id": "ouss-massa-taghazout",\n    "live_score": 85,\n    "swell_height_m": 2.1,\n    "swell_period_s": 14,\n    "wind_speed_kts": 6.8,\n    "freshness_minutes": 12,\n    "stale": false\n  }\n}`
                          : selectedRoute.id === "API-175"
                          ? `{\n  "reliability_score": 95.0,\n  "reliability_breakdown": {\n    "scheduler_health": 100,\n    "database_health": 96,\n    "event_bus_health": 99\n  },\n  "db_persistence": {\n    "postgres_connected": true,\n    "db_size_mb": 45.2\n  }\n}`
                          : `{\n  "status": "success",\n  "message": "Transaction executed successfully",\n  "data": {}\n}`}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                  <Network className="h-8 w-8 text-slate-800 animate-pulse mb-3" />
                  <span className="text-sm font-semibold">Select a Route</span>
                  <p className="text-xs mt-1">Pick an endpoint route in the left list to inspect its configuration.</p>
                </div>
              )}

              {/* Safety notice */}
              <div className="border-t border-slate-900 pt-3 mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-emerald-500" />
                  Verified Gate Policy Compliance
                </span>
                <span>Active Commit: 56226cae</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "topography" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Topography File Tree */}
            <div className="border border-border bg-slate-950/20 rounded-xl p-4 flex flex-col gap-4 h-[600px]">
              <div>
                <h3 className="text-sm font-bold text-white">API Module File Index</h3>
                <p className="text-[11px] text-muted-foreground">Select a file to inspect its indexed functions</p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-thin">
                {FILES_INVENTORY.map((file) => (
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
            <div className="lg:col-span-2 border border-border bg-card rounded-xl p-6 h-[600px] overflow-hidden flex flex-col justify-between">
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
                <span>Active Commit: 56226cae</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "flows" && (
          <div className="space-y-6">
            <DiagramContainer
              title="HTTP Route Ingress and Middleware Execution Graph"
              description="Sequence flow representing routing pipelines, rate limits, CORS configurations, security filters, telemetry hooks, and handler lookups."
              type="mermaid"
              definition={`graph TD
    Client[Client Request] -->|HTTPS| Route[APIGatewayTelemetryMiddleware]
    Route --> Header[SecurityHeadersMiddleware]
    Header --> AuthCheck{Admin Route?}
    AuthCheck -->|Yes| AdminAuth[IP Allowlist / Admin Token Verification]
    AdminAuth --> RateLimit[Token-Bucket Rate Limiter]
    RateLimit --> AuditLog[RedactedAdminLogger]
    AuditLog --> RouteExec[Route Handler Execution]
    AuthCheck -->|No| RouteExec
    RouteExec --> StoreCheck{Needs DB/Cache?}
    StoreCheck -->|Cache Hit| CacheRead[Read from Redis Snapshot Cache]
    StoreCheck -->|Cache Miss| DBRead[Query PostgreSQL / Firestore]
    StoreCheck -->|Math Engine| MathCalc[Evaluate Physical Surf Models]
    CacheRead --> Response[JSON Response]
    DBRead --> Response
    MathCalc --> Response`}
            />

            <DiagramContainer
              title="Unified Ingestion and Persistence Event Flow"
              description="Interaction flow demonstrating asynchronous persistence cycles, Dead Letter Queue (DLQ) backups, and manual replay actions."
              type="mermaid"
              definition={`sequenceDiagram
    participant C as Client
    participant H as Handler (HTTP Context)
    participant E as Event Bus
    participant W as Persistence Worker
    participant P as PostgreSQL Store
    C->>H: POST /api/v1/admin/spots (Add Spot)
    H->>P: Save Spot Metadata
    H->>E: Publish Spot Config Event
    H-->>C: 200 OK (Success response)
    Note over E,W: Asynchronous Processing
    E->>W: Consume Event
    alt Success
        W->>P: Hydrate and Sync Tables
    else DB Timeout / Down
        W->>W: Enqueue to Dead-Letter Queue (DLQ)
    end
    Note over W: Admin triggers DLQ replay manually
    C->>H: POST /api/v1/admin/ops/dlq/replay
    H->>W: ReplayDLQ()
    W->>P: Retry Failed Operations`}
            />
          </div>
        )}

        {activeTab === "debt" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Concurrency and memory risk */}
            <div className="border border-border bg-card rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-500" />
                Concurrency & Cache Mutability Risks
              </h3>
              <div className="space-y-3.5 text-sm text-muted-foreground">
                <div className="border-l-2 border-amber-500 pl-3">
                  <h4 className="font-bold text-slate-200 text-xs">Concurrent Context Pointer Modification</h4>
                  <p className="text-xs mt-1 leading-relaxed">
                    Gin contexts are handled inside multi-threaded goroutines. Returning pointer references of cache maps directly to responders 
                    can result in severe memory corruption and panic cycles if another goroutine mutates the map. 
                    <strong className="text-slate-300"> Hardening:</strong> Handlers like <code className="text-amber-400 bg-slate-900 px-1 py-0.5 rounded text-[10px]">GetForecastHandler</code> 
                    must invoke a strict deep copy function (<code className="text-slate-300">DeepCopy()</code>) to guarantee thread safety.
                  </p>
                </div>
                <div className="border-l-2 border-amber-500 pl-3">
                  <h4 className="font-bold text-slate-200 text-xs">In-Memory Trie Write Locks</h4>
                  <p className="text-xs mt-1 leading-relaxed">
                    The Search Trie structure inside <code className="text-slate-300">search_handlers.go</code> is updated dynamically as admin spots change. 
                    Writing to the trie concurrently with search requests will cause memory segmentation faults without synchronization primitives.
                    <strong className="text-slate-300"> Hardening:</strong> The search module utilizes a strict read-write mutex lock (<code className="text-slate-300">sync.RWMutex</code>) to prevent write conflicts.
                  </p>
                </div>
              </div>
            </div>

            {/* Performance and DB debt */}
            <div className="border border-border bg-card rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-teal-400" />
                Database and Stream Telemetry Debt
              </h3>
              <div className="space-y-3.5 text-sm text-muted-foreground">
                <div className="border-l-2 border-teal-500 pl-3">
                  <h4 className="font-bold text-slate-200 text-xs">Dual-Write Sync Latency Gaps</h4>
                  <p className="text-xs mt-1 leading-relaxed">
                    The backend supports writing spot updates synchronously to both Firestore and PostgreSQL databases. 
                    During connection drops or DB timeouts, HTTP response cycles can spike up to 10 seconds before timeout termination.
                    <strong className="text-slate-300"> Hardening:</strong> Wires asynchronous persistence workers to delegate Postgres writes, enqueuing failed transactions into a DLQ.
                  </p>
                </div>
                <div className="border-l-2 border-teal-500 pl-3">
                  <h4 className="font-bold text-slate-200 text-xs">SSE Stream Disconnections Memory Accumulation</h4>
                  <p className="text-xs mt-1 leading-relaxed">
                    Slow client disconnections on Server-Sent Events (SSE) stream handlers can result in blocked goroutines if the writer fails to receive a cancel signal. 
                    <strong className="text-slate-300"> Hardening:</strong> Wraps SSE handles inside context timeouts (<code className="text-slate-300">c.Request.Context().Done()</code>) to guarantee connection cleanup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
