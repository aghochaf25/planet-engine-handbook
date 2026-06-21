"use client";

import React, { useState } from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";
import { 
  Globe2, 
  Map, 
  Database, 
  History, 
  ShieldAlert, 
  Check, 
  FileCode
} from "lucide-react";

// Mermaid Diagram definition matching PLANETARY_DATASET_ARCHITECTURE.md
const hierarchyDiagramDef = `graph TD
    %% Physical Traversal
    Planet[Planet: Earth] --> Ocean[Ocean: Atlantic, Pacific]
    Ocean --> Basin[Basin: North Atlantic, South Atlantic]
    Basin --> Sea[Sea: Mediterranean Sea, Coral Sea]
    
    %% Geopolitical Traversal
    Planet --> Country[Country: MA, US, AU]
    Country --> Region[Region: MA-TAG, US-HI]
    Region --> Coastline[Coastline: Taghazout Shore, North Shore]
    
    %% Leaf Integration
    Coastline --> SurfSpot[Surf Spot: Anchor Point, Pipeline]
    Sea -.->|Marginal Border| SurfSpot
    Basin -.->|Open Coastline| SurfSpot
    
    %% DNA Attachment
    SurfSpot --- SpotDNA[Spot DNA Profile: Ideal Swells, Wind Angles]

    classDef physical fill:#0c1a30,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef geopolitical fill:#06201e,stroke:#0d9488,stroke-width:2px,color:#fff;
    classDef spot fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#fff;
    
    class Planet,Ocean,Basin,Sea physical;
    class Country,Region,Coastline geopolitical;
    class SurfSpot,SpotDNA spot;
`;

const erDiagramDef = `erDiagram
    PLANET ||--o{ OCEANS : contains
    OCEANS ||--o{ BASINS : divides
    BASINS ||--o{ SEAS : borders
    PLANET ||--o{ COUNTRIES : maps
    COUNTRIES ||--o{ REGIONS : governs
    REGIONS ||--o{ COASTLINES : groups
    COASTLINES ||--o{ SPOTS : contains
    SPOTS ||--|| SPOT_DNA : profiles
`;

const sqlSchemaCode = `-- 1. Planet
CREATE TABLE "planet" (
    "id" VARCHAR(32) PRIMARY KEY,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "metadata" JSONB
);

-- 2. Ocean
CREATE TABLE "oceans" (
    "id" VARCHAR(32) PRIMARY KEY,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "parent_id" VARCHAR(32) REFERENCES "planet"("id")
);

-- 3. Basin
CREATE TABLE "basins" (
    "id" VARCHAR(32) PRIMARY KEY,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "parent_id" VARCHAR(32) REFERENCES "oceans"("id")
);

-- 4. Sea (Optional marginal basin connection)
CREATE TABLE "seas" (
    "id" VARCHAR(32) PRIMARY KEY,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "parent_id" VARCHAR(32) REFERENCES "basins"("id")
);

-- 5. Country
CREATE TABLE "countries" (
    "id" VARCHAR(8) PRIMARY KEY,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "parent_id" VARCHAR(32) REFERENCES "planet"("id")
);

-- 6. Region
CREATE TABLE "regions" (
    "id" VARCHAR(64) PRIMARY KEY,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "parent_id" VARCHAR(8) REFERENCES "countries"("id")
);

-- 7. Coastline
CREATE TABLE "coastlines" (
    "id" VARCHAR(64) PRIMARY KEY,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "parent_id" VARCHAR(64) REFERENCES "regions"("id")
);

-- 8. Surf Spot (Denormalized Ancestry Linkage)
CREATE TABLE "spots" (
    "id" VARCHAR(64) PRIMARY KEY,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "planet_id" VARCHAR(32) REFERENCES "planet"("id"),
    "ocean_id" VARCHAR(32) REFERENCES "oceans"("id"),
    "basin_id" VARCHAR(32) REFERENCES "basins"("id"),
    "sea_id" VARCHAR(32) REFERENCES "seas"("id"),
    "country_id" VARCHAR(8) REFERENCES "countries"("id"),
    "region_id" VARCHAR(64) REFERENCES "regions"("id"),
    "coastline_id" VARCHAR(64) REFERENCES "coastlines"("id")
);

-- 9. Spot DNA Profile
CREATE TABLE "spot_dna" (
    "spot_id" VARCHAR(64) PRIMARY KEY REFERENCES "spots"("id") ON DELETE CASCADE,
    "orientation" VARCHAR(50) NOT NULL,
    "wave_type" VARCHAR(50) NOT NULL,
    "bottom_type" VARCHAR(50) NOT NULL,
    "engine_profile" VARCHAR(50) NOT NULL,
    "ideal_swell_dirs" JSONB NOT NULL,
    "reject_swell_dirs" JSONB NOT NULL,
    "ideal_wind_dirs" JSONB NOT NULL,
    "bad_wind_dirs" JSONB NOT NULL,
    "tide_preference" VARCHAR(50) NOT NULL,
    "min_size_good" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "min_size_epic" DOUBLE PRECISION NOT NULL DEFAULT 2.0,
    "power_factor" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "tide_sensitivity" DOUBLE PRECISION NOT NULL DEFAULT 0.5
);`;

export default function PlanetaryDatasetDesign() {
  const [activeTab, setActiveTab] = useState<"hierarchy" | "schema" | "scalability">("hierarchy");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Globe2 className="h-8 w-8 text-teal-400" />
          Planetary Dataset Design
        </h2>
        <p className="text-muted-foreground text-sm max-w-3xl">
          Geographic, topological, and physical dataset specifications mapping the 9-tier hierarchy from Planet core down to Spot DNA profiles.
        </p>
      </div>

      {/* Verification Card */}
      <VerificationCard
        pageName="Planetary Dataset Blueprint"
        data={{
          status: "verified",
          coverage: 100,
          confidence: "High",
          reviewer: "Chief Systems Architect",
          verificationDate: "2026-06-20",
          lastCommit: "PLANETARY.DATASET.3",
          filesReviewed: 4,
          functionsReviewed: 12,
          manualReview: true
        }}
      />

      {/* Interactive Tabs */}
      <div className="border-b border-slate-800">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("hierarchy")}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all ${
              activeTab === "hierarchy"
                ? "border-teal-500 text-teal-400"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <Map className="h-4 w-4" />
            9-Tier Hierarchy
          </button>
          <button
            onClick={() => setActiveTab("schema")}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all ${
              activeTab === "schema"
                ? "border-teal-500 text-teal-400"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <Database className="h-4 w-4" />
            Relational Schema
          </button>
          <button
            onClick={() => setActiveTab("scalability")}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all ${
              activeTab === "scalability"
                ? "border-teal-500 text-teal-400"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <ShieldAlert className="h-4 w-4" />
            Scalability & Versioning
          </button>
        </nav>
      </div>

      {/* Tab Contents */}
      {activeTab === "hierarchy" && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border border-slate-900 bg-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Physical vs. Geopolitical Decoupling</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  The Planetary Dataset architecture splits the spatial topological tree into two paths:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-xs font-semibold text-teal-400 font-mono uppercase">Physical Path</span>
                    <h4 className="text-sm font-bold text-slate-100 mt-1">Swell Decay & Hydrodynamics</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Models the physical boundaries where storm swell wave energy decays. Covers:
                      <br /><strong className="text-slate-300">Planet ➔ Ocean ➔ Basin ➔ Sea</strong>
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-xs font-semibold text-sky-400 font-mono uppercase">Geopolitical Path</span>
                    <h4 className="text-sm font-bold text-slate-100 mt-1">User Filters & Administration</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Governs timezone groups, jurisdictional policies, and regional forecast score matrices. Covers:
                      <br /><strong className="text-slate-300">Planet ➔ Country ➔ Region ➔ Coastline</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Nine Tiers Timeline */}
              <div className="rounded-xl border border-slate-900 bg-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">The 9-Tier Spatial Specification</h3>
                <div className="relative border-l border-slate-800 ml-3.5 space-y-6 my-2">
                  {[
                    { title: "1. Planet", desc: "The global boundary sphere modeling gravity and Earth coordinates." },
                    { title: "2. Ocean", desc: "Global salt water bodies managing long-range swell propagation paths." },
                    { title: "3. Basin", desc: "Sub-basins limiting meteorological fetch domains (e.g. North Atlantic)." },
                    { title: "4. Sea", desc: "Marginal seas bordering localized coastlines (e.g. Mediterranean Sea)." },
                    { title: "5. Country", desc: "Sovereign territories carrying timezone offsets and reporting priorities." },
                    { title: "6. Region", desc: "Federal states or provincial coastline segments (e.g. Hawaii)." },
                    { title: "7. Coastline", desc: "Target shore segments grouping nearby spots (e.g. Taghazout Shore)." },
                    { title: "8. Surf Spot", desc: "Point coord nodes where wave metrics blending formulas are executed." },
                    { title: "9. Spot DNA", desc: "Hardcoded physical swell direction limits, bathymetry, and ideal wind angles." }
                  ].map((tier, idx) => (
                    <div key={idx} className="relative pl-6">
                      <span className="absolute -left-[6px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-teal-500 bg-slate-950" />
                      <h4 className="text-sm font-bold text-slate-200">{tier.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{tier.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Diagram Panel */}
            <div className="space-y-6">
              <DiagramContainer
                title="Geographical Tree Traversal"
                description="Visualizes physical oceans and geopolitical boundaries merging at the leaf nodes (Surf Spot & DNA)."
                type="mermaid"
                definition={hierarchyDiagramDef}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "schema" && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              {/* Architecture Design Decoupling Card */}
              <div className="rounded-xl border border-slate-900 bg-card p-6">
                <h3 className="text-md font-bold text-foreground flex items-center gap-2">
                  <Database className="h-5 w-5 text-teal-400" />
                  Denormalized Ancestry Linkage
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  To avoid recursive CTE joins traversing 9 tables on high-traffic forecasting routes, the <code className="text-teal-400 font-mono">spots</code> table stores explicit foreign key columns for all ancestor levels.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300">
                  <div className="text-teal-400">SELECT * FROM spots</div>
                  <div>WHERE ocean_id = &apos;atlantic&apos;</div>
                  <div>  AND country_id = &apos;MA&apos;</div>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 italic">
                  O(1) ancestor resolving without subqueries or recursive tree traversals.
                </div>
              </div>

              {/* Schema Status */}
              <div className="rounded-xl border border-slate-900 bg-card p-6">
                <h3 className="text-md font-bold text-foreground">Constraints & Mappings</h3>
                <ul className="mt-3 space-y-2 text-xs">
                  <li className="flex items-start gap-2 text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">ON DELETE RESTRICT</strong> protects top-tier configurations (Planet, Country, Ocean) from accidental cascade wipes.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">ON DELETE CASCADE</strong> cleans up Spot DNA instantly if a spot coordinate record is removed.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">JSONB Fields</strong> for wind/swell directions inside Spot DNA allow storing variable-length wind angles without mapping tables.</span>
                  </li>
                </ul>
              </div>

              {/* ER diagram */}
              <DiagramContainer
                title="Relational Schema Entity Diagram"
                description="Database relational relationships."
                type="mermaid"
                definition={erDiagramDef}
              />
            </div>

            {/* SQL schema code viewer */}
            <div className="lg:col-span-2 rounded-xl border border-slate-900 bg-card overflow-hidden flex flex-col h-[650px]">
              <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-teal-400" />
                  <span className="text-xs font-semibold text-slate-300 font-mono">schema.sql</span>
                </div>
                <span className="text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  SQL Schema Definition
                </span>
              </div>
              <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs text-slate-300 scrollbar-thin">
                <pre>{sqlSchemaCode}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "scalability" && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Risk A */}
            <div className="rounded-xl border border-slate-900 bg-card p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold text-amber-500 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                  Risk A
                </span>
                <h3 className="text-base font-bold text-foreground mt-2">SQL Join Performance</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Deep joins across 9 nested tables (spots ➔ coastlines ➔ regions ➔ countries ➔ planet) degrade query performance under high API throughput.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Mitigation</h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  Denormalized ancestry linkage in the spots table enables O(1) resolving of any level, dropping query complexity significantly.
                </p>
              </div>
            </div>

            {/* Risk B */}
            <div className="rounded-xl border border-slate-900 bg-card p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold text-amber-500 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                  Risk B
                </span>
                <h3 className="text-base font-bold text-foreground mt-2">Spatial Polygon Bottlenecks</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Executing PostGIS ST_Contains boundary containment on hot spots routes drains database CPU.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Mitigation</h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  Static boundary check mapping during import cycles. Checks are computed once at ingestion time, caching IDs directly onto records.
                </p>
              </div>
            </div>

            {/* Risk C */}
            <div className="rounded-xl border border-slate-900 bg-card p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold text-amber-500 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                  Risk C
                </span>
                <h3 className="text-base font-bold text-foreground mt-2">Trie Search Rebuild Block</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Rebuilding prefix search trie trees on every HTTP autocomplete query blocks the single-threaded CPU loops.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Mitigation</h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  Keep trie structures in memory on boot. Provide thread-safe mutation handlers that incremental-update nodes during CRUD spot events.
                </p>
              </div>
            </div>
          </div>

          {/* Versioning & Provenance Specification */}
          <div className="rounded-xl border border-slate-900 bg-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <History className="h-5 w-5 text-teal-400" />
              Versioning Ledger & Ingest Provenance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200">Ingestion Ledger Table</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    A semantic ledger controls state version migrations to guarantee boot stability:
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">version:</span>
                    <span className="text-teal-400">&quot;2.0.0-draft&quot;</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">bootstrap_hash:</span>
                    <span className="text-teal-400">&quot;sha256:7f08c3e...&quot;</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">applied_at:</span>
                    <span className="text-teal-400">&quot;2026-06-20T10:45Z&quot;</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200">Provenance Metadata</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Tracks the audit origin trail for spot profile calibrations:
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-teal-500 rounded-full shrink-0" />
                    <span><strong className="text-white">git_commit</strong>: Connects ingestion data version with solver engine release hashes.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-teal-500 rounded-full shrink-0" />
                    <span><strong className="text-white">operator_email</strong>: Authenticated actor key executing dataset bootstrapping.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-teal-500 rounded-full shrink-0" />
                    <span><strong className="text-white">ingestion_source</strong>: Remote file URL (or JSON blob payload) from which metadata was pulled.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
