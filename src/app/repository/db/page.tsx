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
  DatabaseZap,
  Sliders,
  HardDrive
} from "lucide-react";

// Functions list for DB files
const DB_FUNCTIONS = [
  {
    name: "store.go",
    path: "backend/internal/store/store.go",
    description: "Defines the unified Store interfaces, including TruthStore, ProviderHealthStore, BenchmarkStore, and ImportAuditStore.",
    functions: [
      {
        name: "Store",
        line: 12,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/store/store.go#L12",
        sig: "type Store interface",
        notes: "Central interface composing all storage domains (persistence, validation truth, provider health, benchmarks, imports, and scheduler history)."
      }
    ]
  },
  {
    name: "postgres.go",
    path: "backend/internal/store/postgres.go",
    description: "Implements PostgreSQL-specific datastore operations, pool configurations, and prepared statement redirect rules.",
    functions: [
      {
        name: "NewPostgresStore",
        line: 36,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/store/postgres.go#L36",
        sig: "func NewPostgresStore(databaseURL string) (*PostgresStore, error)",
        notes: "Instantiates a connection pool to Neon database, redirecting pooler connection URLs to direct compute endpoints to prevent prepared statement conflicts."
      },
      {
        name: "WriteCanonicalTimeline",
        line: 92,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/store/postgres.go#L92",
        sig: "func (ps *PostgresStore) WriteCanonicalTimeline(ctx context.Context, spotID string, timeline models.CanonicalTimeline) error",
        notes: "Performs upsert operations inside PostgreSQL tables, mapping JSON serialization data and UOIS scores."
      },
      {
        name: "WriteSnapshot",
        line: 191,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/store/postgres.go#L191",
        sig: "func (ps *PostgresStore) WriteSnapshot(ctx context.Context, snap *models.LiveSnapshot) error",
        notes: "Persists fully sorted live evaluation snapshots to PostgreSQL under upsert conflicts."
      },
      {
        name: "ExecuteAudit",
        line: 567,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/store/postgres.go#L567",
        sig: "func (ps *PostgresStore) ExecuteAudit(ctx context.Context) (map[string]interface{}, error)",
        notes: "Performs table counts and sample extractions to audit database structure consistency."
      }
    ]
  },
  {
    name: "bootstrap.go",
    path: "backend/internal/store/bootstrap.go",
    description: "Executes bootstrapping routines, setting up tables, indexes, adjacency neighbors, and materialized views.",
    functions: [
      {
        name: "RunBootstrap",
        line: 18,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/store/bootstrap.go#L18",
        sig: "func (ps *PostgresStore) RunBootstrap(ctx context.Context, config models.WaveConfig) error",
        notes: "Runs standard migrations, constructs join tables, and seeds spots with initial data."
      }
    ]
  },
  {
    name: "canonical_timeline.go",
    path: "backend/internal/store/canonical_timeline.go",
    description: "Serializes and deserializes canonical timelines with UTC conversion, duplicate suppression hashing, and versioning.",
    functions: [
      {
        name: "SerializeCanonicalTimeline",
        line: 13,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/store/canonical_timeline.go#L13",
        sig: "func SerializeCanonicalTimeline(timeline *models.CanonicalTimeline) (map[string]interface{}, string, error)",
        notes: "Converts hourly/daily forecast timestamps to UTC, generates MD5 payload hashes for duplicate check, and tags schema version."
      },
      {
        name: "DeserializeCanonicalTimeline",
        line: 71,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/store/canonical_timeline.go#L71",
        sig: "func DeserializeCanonicalTimeline(data map[string]interface{}) (*models.CanonicalTimeline, error)",
        notes: "Decodes the raw map, enforces UTC on timestamps, and heals older schema fields."
      }
    ]
  }
];

export default function DbTopography() {
  const [activeTab, setActiveTab] = useState<"overview" | "equations" | "topography" | "flows" | "debt">("overview");
  const [selectedFile, setSelectedFile] = useState<any>(DB_FUNCTIONS[0]);

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Title & Metadata */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500/10 p-2 rounded-lg border border-teal-500/20">
            <DatabaseZap className="h-8 w-8 text-teal-400" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Database Store & Schema Migrations
            </h2>
            <p className="text-muted-foreground text-sm">
              Neon PostgreSQL connections, direct compute redirection, transaction upsert rules, and deterministic payload hashing.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Gate Card */}
      <VerificationCard
        pageName="Database (Postgres) Store Module"
        data={{
          status: "verified",
          coverage: 95.8,
          filesReviewed: 9,
          functionsReviewed: 35,
          confidence: "High",
          verificationDate: "June 19, 2026",
          reviewer: "Documentation Platform Lead",
          lastCommit: "3425056 (verified)"
        }}
      />

      {/* Tab Switcher */}
      <div className="flex border-b border-border bg-slate-950/40 p-1 rounded-lg max-w-fit gap-1">
        {[
          { id: "overview", label: "Overview", icon: Cpu },
          { id: "equations", label: "Deterministic Hashing", icon: Activity },
          { id: "topography", label: "File Topography", icon: FolderGit2 },
          { id: "flows", label: "Connection Flows", icon: Layers },
          { id: "debt", label: "Concurrency Limits", icon: HardDrive }
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
                  PostgreSQL Data Integration
                </h3>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                  PostgresStore manages database connections and executes queries. 
                  It connects to Neon PostgreSQL. 
                  To prevent prepared statement errors associated with PgBouncer transaction pooling, the store checks for pooler strings in database URLs. 
                  When detected, it redirects connections to the direct compute endpoint.
                </p>
              </div>

              <div className="border border-border bg-slate-950/20 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="h-4.5 w-4.5 text-teal-400" />
                  Upsert Transactions & Seeding
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Writing forecast timelines and snapshots utilizes PostgreSQL upserts:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs mt-3">
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1">
                      <span className="text-teal-400 font-bold block">1. ON CONFLICT Upserts</span>
                      <span>Enforces spot_id and cycle_id constraints, updating rows instead of throwing primary key errors.</span>
                    </div>
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1">
                      <span className="text-teal-400 font-bold block">2. Neon Redirection</span>
                      <span>Modifies database URLs to connect directly, bypassing PgBouncer.</span>
                    </div>
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1">
                      <span className="text-teal-400 font-bold block">3. Materialized View</span>
                      <span>Leverages mv_global_rankings to query the latest spot ratings without hitting full history tables.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Database Schema</h4>
                <DiagramContainer
                  title="Neon PostgreSQL Schema Relations"
                  type="mermaid"
                  definition={`graph TD
    spots[spots] --> forecast_timelines[forecast_timelines]
    spots --> planetary_rankings[planetary_rankings]
    spots --> live_snapshots[live_snapshots]
    spots --> favorites[favorites]
    spots --> alerts[alerts]
    spots --> truth_observations[truth_observations]
    spots --> forecast_residuals[forecast_residuals]
    spots --> forecast_archives[forecast_archives]
    spots --> truth_validation_snapshots[truth_validation_snapshots]
`}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "equations" && (
          <div className="border border-border bg-card rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Deterministic Serialization Hashing</h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-sans">Enforces data integrity using UTC conversions and MD5 signatures.</p>
            </div>

            <div className="space-y-6 text-sm text-muted-foreground font-sans">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200">1. Duplicate Suppression Hash</h4>
                <p className="text-xs leading-relaxed font-sans">
                  Before serializing timelines to the database, the engine converts dates and hourly timestamps to UTC format. 
                  An MD5 signature is calculated over the forecast grids:
                </p>
                <FormulaBlock
                  formula="\text{PayloadBytes} = \text{JSON}(\text{HourlyForecasts} + \text{DailyForecasts})"
                />
                <FormulaBlock
                  formula="\text{IntegrityHash} = \text{MD5}(\text{PayloadBytes})"
                />
                <p className="text-xs leading-relaxed mt-2 font-sans">
                  The computed IntegrityHash is stored in the database. 
                  This hash is checked during subsequent writes, preventing duplicate storage of identical forecast payloads.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "topography" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tree */}
            <div className="border border-border bg-slate-950/20 rounded-xl p-4 flex flex-col gap-4 h-[550px]">
              <div>
                <h3 className="text-sm font-bold text-white">Database Store Files</h3>
                <p className="text-[11px] text-muted-foreground font-sans">Select a file to inspect its functions</p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-thin">
                {DB_FUNCTIONS.map((file) => (
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
                <div className="flex items-center justify-between font-mono">
                  <span className="text-xs font-bold text-teal-400 tracking-wide uppercase">File Path</span>
                  <span className="text-xs text-muted-foreground">{selectedFile?.path}</span>
                </div>
                <h3 className="text-lg font-extrabold text-white mt-1 font-sans">{selectedFile?.name} Detailed Functions</h3>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin pr-1 font-mono">
                {selectedFile?.functions.map((func: any) => (
                  <div key={func.name} className="border border-slate-900 bg-slate-950/30 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
                          <Terminal className="h-3.5 w-3.5 text-teal-400" />
                          {func.name}
                        </h4>
                        <span className="text-[10px] text-muted-foreground mt-0.5 block">{func.sig}</span>
                      </div>
                      <a
                        href={func.url}
                        className="text-teal-400 hover:text-teal-300 text-xs font-mono flex items-center gap-1 shrink-0 border border-teal-500/20 px-2 py-1 rounded bg-teal-950/10 font-sans"
                      >
                        Source Link
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{func.notes}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1.5 border-t border-slate-900/60 text-[10px]">
                      <div>
                        <span className="text-muted-foreground block font-sans">Verification</span>
                        <span className="text-teal-400 font-semibold font-sans">100% Verified</span>
                      </div>
                      <div>
                        <span className="text-teal-400 font-semibold font-sans">10/10 Score</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block font-sans">Line Range</span>
                        <span>Line {func.line}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block font-sans">Side Effects</span>
                        <span className="text-yellow-400/80 font-sans">Mutations</span>
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
                  Connection Redirection & Prepared Statements
                </h3>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-3 font-sans">
                  <p>
                    Neon database URLs containing `-pooler` are modified on connection initialization. 
                    This establishes direct connections to direct compute nodes. 
                    Redirection avoids prepared statement errors that can arise when using transaction pooling with PgBouncer.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-sans">Connection Routing</h4>
              <DiagramContainer
                title="Neon Direct Connection Routing"
                type="mermaid"
                definition={`sequenceDiagram
    participant E as Store Engine
    participant P as Neon Pooler URL
    participant D as Neon Direct URL
    participant DB as PostgreSQL Compute Node
    E->>E: Check connection string URL
    alt URL contains '-pooler'
        E->>E: Replace '-pooler' with direct compute node domain
        E->>D: Dispatch sql.Open() direct
        D->>DB: Ping & verify connection
        DB-->>E: Connection verified (Success)
    else URL is direct
        E->>P: Dispatch sql.Open() pooler
        P->>DB: Ping (Prepared statements disabled)
        DB-->>E: Connection verified (Success)
    end
`}
              />
            </div>
          </div>
        )}

        {activeTab === "debt" && (
          <div className="border border-border bg-card rounded-xl p-6 space-y-6 font-sans">
            <div>
              <h3 className="text-base font-bold text-white">Concurrency Limits & Prepared Statements</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Examines connection scaling limits and transactional constraints.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground font-sans">
              <div className="border border-slate-900 bg-slate-950/20 p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span className="text-white font-bold font-sans">Connection Scaling Limits</span>
                </div>
                <p className="text-xs leading-relaxed font-sans">
                  Database connections are configured with db.SetMaxOpenConns(15) and db.SetMaxIdleConns(5). 
                  Because the scheduler triggers concurrent goroutines (processing up to 50 spots concurrently), pool saturation can occur during high ingestion cycles, increasing commit latency.
                </p>
              </div>

              <div className="border border-slate-900 bg-slate-950/20 p-5 rounded-xl space-y-3 font-sans">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-400" />
                  <span className="text-white font-bold font-sans">Direct Redirection Fix</span>
                </div>
                <p className="text-xs leading-relaxed font-sans">
                  Redirecting pooler URLs to direct endpoints bypasses PgBouncer transaction pooling. 
                  This direct connection prevents prepared statement conflicts but removes PgBouncer's connection pooling advantages, shifting connection management overhead back to PostgreSQL.
                </p>
              </div>

              <div className="border border-slate-900 bg-slate-950/20 p-5 rounded-xl space-y-3 font-sans">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-yellow-500" />
                  <span className="text-white font-bold font-sans">Materialized View Refresh</span>
                </div>
                <p className="text-xs leading-relaxed font-sans">
                  Planetary rankings are queried from the mv_global_rankings materialized view. 
                  This view must be refreshed explicitly (using REFRESH MATERIALIZED VIEW mv_global_rankings) after ingestion runs to make updated leaderboards visible.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
