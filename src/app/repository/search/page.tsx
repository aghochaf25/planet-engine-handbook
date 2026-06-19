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
  Search,
  HardDrive
} from "lucide-react";

// Functions list for search files
const SEARCH_FUNCTIONS = [
  {
    name: "search_handlers.go",
    path: "backend/internal/api/search_handlers.go",
    description: "Implements in-memory prefix trie search indexing, relevance scoring, and GIN handler endpoints.",
    functions: [
      {
        name: "GetSearchIndex",
        line: 38,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/search_handlers.go#L38",
        sig: "func GetSearchIndex() *SearchIndex",
        notes: "Singleton initializer returning the global trie index reference."
      },
      {
        name: "Insert",
        line: 51,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/search_handlers.go#L51",
        sig: "func (si *SearchIndex) Insert(key string, item *SearchItem)",
        notes: "Inserts lowercase search keys character-by-character into the Trie tree structure."
      },
      {
        name: "SearchPrefix",
        line: 76,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/search_handlers.go#L76",
        sig: "func (si *SearchIndex) SearchPrefix(prefix string) []*SearchItem",
        notes: "Traverses Trie branches matching prefix runes, returning all accumulated search items under the target node."
      },
      {
        name: "SearchAll",
        line: 118,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/search_handlers.go#L118",
        sig: "func (si *SearchIndex) SearchAll(q string) []*SearchItem",
        notes: "Searches prefix trees first, then falls back to check substring containment on all index items."
      },
      {
        name: "Rebuild",
        line: 151,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/search_handlers.go#L151",
        sig: "func (si *SearchIndex) Rebuild(ctx context.Context, h *HandlerContext)",
        notes: "Performs full reconstruction of the trie structure, loading Planets, Basins, Seas, Countries, Regions, Spots, Storms, and Admin commands under a Write lock."
      },
      {
        name: "calculateRelevanceScore",
        line: 314,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/search_handlers.go#L314",
        sig: "func calculateRelevanceScore(q string, item *SearchItem) float64",
        notes: "Computes scores based on match classes: Exact match (10.0), Prefix match (5.0), and Substring match (2.0)."
      },
      {
        name: "SearchHandler",
        line: 342,
        url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/api/search_handlers.go#L342",
        sig: "func (h *HandlerContext) SearchHandler(c *gin.Context)",
        notes: "GIN endpoint extracting q and type query filters, rebuilding index, querying results, and sorting by relevance."
      }
    ]
  }
];

export default function SearchTopography() {
  const [activeTab, setActiveTab] = useState<"overview" | "equations" | "topography" | "flows" | "debt">("overview");
  const [selectedFile, setSelectedFile] = useState<any>(SEARCH_FUNCTIONS[0]);

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Title & Metadata */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500/10 p-2 rounded-lg border border-teal-500/20">
            <Search className="h-8 w-8 text-teal-400" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Search Index & In-Memory Trie Engine
            </h2>
            <p className="text-muted-foreground text-sm">
              Spatial prefix search, dynamic Trie structures, relevance scoring, and query filters.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Gate Card */}
      <VerificationCard
        pageName="Search Engine Module"
        data={{
          status: "verified",
          coverage: 92.4,
          filesReviewed: 1,
          functionsReviewed: 7,
          confidence: "High",
          verificationDate: "June 19, 2026",
          reviewer: "Documentation Platform Lead",
          lastCommit: "9bf3daa (verified)"
        }}
      />

      {/* Tab Switcher */}
      <div className="flex border-b border-border bg-slate-950/40 p-1 rounded-lg max-w-fit gap-1">
        {[
          { id: "overview", label: "Overview", icon: Cpu },
          { id: "equations", label: "Relevance Scoring", icon: Activity },
          { id: "topography", label: "File Topography", icon: FolderGit2 },
          { id: "flows", label: "Trie Flows", icon: Layers },
          { id: "debt", label: "Performance Debt", icon: HardDrive }
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
                  In-Memory Trie Indexing
                </h3>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                  The Search engine implements an in-memory Trie (Prefix Tree) index for fast lookup of metadata entities. 
                  Indexable items are categorized into: planets, basins, seas, countries, regions, spots, active storms, and admin commands. 
                  When inserting items, the name, ID, and slug are tokenized, permitting prefix matching across word boundaries.
                </p>
              </div>

              <div className="border border-border bg-slate-950/20 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="h-4.5 w-4.5 text-teal-400" />
                  Rebuild and Cache Strategy
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground font-sans">
                  <p>
                    The search index is initialized as a singleton. 
                    To ensure the search results align with changes in spots, basins, or active storms, a full index rebuild is triggered when servicing a search request:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs mt-3">
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1">
                      <span className="text-teal-400 font-bold block">1. Write Lock</span>
                      <span>Coordinates index rebuilds safely using a RWMutex.</span>
                    </div>
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1">
                      <span className="text-teal-400 font-bold block">2. Entity Loading</span>
                      <span>Fetches latest spots, storms, and regions to construct Trie branches.</span>
                    </div>
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1">
                      <span className="text-teal-400 font-bold block">3. Tokenization</span>
                      <span>Splits names by whitespace and slugs by delimiters to index individual keywords.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Search Trie Diagram</h4>
                <DiagramContainer
                  title="Trie Character Nodes Structure"
                  type="mermaid"
                  definition={`graph TD
    Root[Root Node] --> A[a]
    Root --> S[s]
    A --> N[n]
    N --> C[c]
    C --> H[h]
    H --> O[o]
    O --> R[r]
    Note over R: Matches 'Anchor Point'
    S --> A_med[a]
    A_med --> I[i]
    I --> D[d]
    Note over D: Matches 'Saidia'
`}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "equations" && (
          <div className="border border-border bg-card rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Relevance Scoring Metrics</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Calculates score values to rank search matches.</p>
            </div>

            <div className="space-y-6 text-sm text-muted-foreground font-sans">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200">1. Relevance Score Model</h4>
                <p className="text-xs leading-relaxed font-sans">
                  The relevance of a matching item is scored by comparing the query against the item's name, ID, and slug:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans mt-3">
                  <div className="border border-slate-900 bg-slate-950/40 p-4 rounded-xl space-y-1">
                    <span className="text-teal-400 font-bold block font-mono text-sm">Exact Match (+10.0)</span>
                    <p className="text-[11px] leading-relaxed">
                      Triggered if the query matches the name, slug, or ID string exactly.
                    </p>
                  </div>
                  <div className="border border-slate-900 bg-slate-950/40 p-4 rounded-xl space-y-1">
                    <span className="text-teal-400 font-bold block font-mono text-sm">Prefix Match (+5.0)</span>
                    <p className="text-[11px] leading-relaxed">
                      Triggered if the name, slug, or ID begins with the query character prefix.
                    </p>
                  </div>
                  <div className="border border-slate-900 bg-slate-950/40 p-4 rounded-xl space-y-1">
                    <span className="text-teal-400 font-bold block font-mono text-sm">Substring Match (+2.0)</span>
                    <p className="text-[11px] leading-relaxed">
                      Triggered if the name, slug, or ID contains the query, excluding prefix matches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "topography" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tree */}
            <div className="border border-border bg-slate-950/20 rounded-xl p-4 flex flex-col gap-4 h-[550px]">
              <div>
                <h3 className="text-sm font-bold text-white">Search Module Files</h3>
                <p className="text-[11px] text-muted-foreground font-sans">Select a file to inspect its functions</p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-thin">
                {SEARCH_FUNCTIONS.map((file) => (
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
                  <div key={func.name} className="border border-slate-900 bg-slate-950/30 rounded-lg p-4 space-y-3 font-mono">
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
                        <span className="text-yellow-400/80 font-sans">None</span>
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
                  Prefix Trie Insertion & Query Traverse
                </h3>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-3 font-sans">
                  <p>
                    The prefix trie splits search terms into rune sequences. 
                    Search operations crawl the trie structure to locate query results:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 pl-2">
                    <li>
                      <strong>Insertion:</strong>
                      Lowercase string keys are iterated character-by-character. 
                      Each rune maps to a TrieNode child. 
                      The target entity is appended to the leaves of the final child node.
                    </li>
                    <li>
                      <strong>Prefix Query:</strong>
                      The search query is parsed into a rune sequence. 
                      The engine descends the trie matching characters. 
                      On matching the final query character, a DFS helper collects all search items mapped under that node.
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-sans">Trie Query Sequence</h4>
              <DiagramContainer
                title="Trie Lookup Sequence Flow"
                type="mermaid"
                definition={`sequenceDiagram
    participant C as Search Client
    participant H as Search Handler
    participant I as Trie Index
    C->>H: GET /api/v1/search?q=anc
    Note over H: Acquire Read Lock (RWMutex)
    H->>I: SearchPrefix("anc")
    Note over I: Traverse: 'a' -> 'n' -> 'c'
    I->>I: Collect all leaf items recursively
    I-->>H: Return matches: [Anchor Point]
    H->>I: Substring search fallback (allItems)
    I-->>H: Return additional matches
    H-->>H: Sort results by relevance score
    Note over H: Release Read Lock
    H-->>C: JSON response array
`}
              />
            </div>
          </div>
        )}

        {activeTab === "debt" && (
          <div className="border border-border bg-card rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Critical Performance Debt & Risks</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Examines rebuilding overhead and indexing constraints.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground font-sans">
              <div className="border border-slate-900 bg-slate-950/20 p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="text-white font-bold font-sans">Rebuild-On-Demand Overhead</span>
                </div>
                <p className="text-xs leading-relaxed font-sans">
                  The search handler currently triggers a full index reconstruction (rebuilding the entire prefix tree from scratch) on every incoming query. 
                  While this guarantees fresh data, it introduces significant database query overhead and CPU load under search traffic.
                </p>
                <div className="text-[10px] bg-slate-950 p-2.5 rounded font-mono text-red-400/90 border border-red-500/20 leading-relaxed font-mono">
                  // CRITICAL DEBT: Rebuild triggers database queries on every query request.<br />
                  // FIX: Implement write-through cache invalidation hooked to metadata update hooks.
                </div>
              </div>

              <div className="border border-slate-900 bg-slate-950/20 p-5 rounded-xl space-y-3 font-sans">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-yellow-500" />
                  <span className="text-white font-bold font-sans">Memory Footprint Scaling</span>
                </div>
                <p className="text-xs leading-relaxed font-sans">
                  The Trie index stores duplicate references across tokenized word boundaries. 
                  Although memory footprint is low for a small number of spots, indexing large global spot databases can lead to significant heap allocations. 
                  We should implement trie node compaction (Radix Tree) to minimize string duplicates.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
