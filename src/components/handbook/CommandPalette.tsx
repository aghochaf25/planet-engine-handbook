"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Compass, Calculator, FileCode2, Landmark, Settings, X, CornerDownLeft } from "lucide-react";

interface SearchItem {
  id: string;
  title: string;
  category: "Architecture" | "Repository" | "Mathematics" | "General";
  path: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SEARCH_ITEMS: SearchItem[] = [
  { id: "dash", title: "Dashboard Overview", category: "General", path: "/", description: "Platform telemetry and status reports", icon: Compass },
  { id: "sys-arch", title: "System Architecture", category: "Architecture", path: "/architecture/system", description: "Global topology and dependencies", icon: Compass },
  { id: "seq-diag", title: "Sequence Diagrams", category: "Architecture", path: "/architecture/sequence", description: "Interaction flows between services", icon: Compass },
  { id: "data-flow", title: "Data Flow Map", category: "Architecture", path: "/architecture/data-flow", description: "Ingestion and attribution flows", icon: Compass },
  { id: "forecast-pipe", title: "Forecast Pipeline", category: "Architecture", path: "/architecture/pipelines/forecast", description: "Blending consensus computations", icon: Calculator },
  { id: "scheduler-pipe", title: "Scheduler Pipeline", category: "Architecture", path: "/architecture/pipelines/scheduler", description: "Realtime state managers & crons", icon: Settings },
  { id: "db-relations", title: "Database Relationships", category: "Architecture", path: "/architecture/db-relations", description: "PostgreSQL schemas and indexes", icon: Landmark },
  { id: "dataset-arch", title: "Planetary Dataset Design", category: "Architecture", path: "/architecture/dataset", description: "Geographic dataset hierarchy and versions", icon: Landmark },
  { id: "physics-mod", title: "Wave Physics Engine", category: "Repository", path: "/repository/physics", description: "Wave energy flux and normalizations", icon: FileCode2 },
  { id: "ocean-mod", title: "Ocean Intelligence Module", category: "Repository", path: "/repository/ocean", description: "Consensus blending and provider logs", icon: FileCode2 },
  { id: "wave-eq", title: "Wave Equations", category: "Mathematics", path: "/mathematics/wave-equations", description: "Fourier transforms and wave decay formulas", icon: Calculator },
  { id: "pde-ode", title: "PDE & ODE Solvers", category: "Mathematics", path: "/mathematics/pde", description: "Advection-diffusion and CFL bounds", icon: Calculator },
  { id: "reports", title: "Quality Reports", category: "General", path: "/reports", description: "Verification metrics and technical debt", icon: Landmark },
  { id: "glossary", title: "Handbook Glossary", category: "General", path: "/glossary", description: "Domain terminology index", icon: Landmark },
  { id: "adr", title: "Architecture Decisions (ADR)", category: "General", path: "/adr", description: "Decisions record archive", icon: Settings },
  { id: "settings", title: "Settings", category: "General", path: "/settings", description: "Handbook configs and toggles", icon: Settings },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle Command Palette with Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(0);
        setQuery("");
      }, 50);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filteredItems = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex].path);
      }
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-slate-950/60 hover:bg-slate-900 text-xs text-muted-foreground transition-all w-60 text-left"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Quick Navigation...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-slate-900 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        ref={modalRef}
        className="w-full max-w-xl rounded-xl border border-slate-800 bg-slate-950/95 shadow-2xl overflow-hidden glass-panel flex flex-col"
        onKeyDown={handleKeyDown}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-900">
          <Search className="h-5 w-5 text-teal-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-none text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-0"
            placeholder="Type a query (e.g. 'physics', 'pde', 'reports')..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground shrink-0 rounded p-1 hover:bg-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[350px] overflow-y-auto p-2 flex flex-col gap-1 scrollbar-thin">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.path)}
                  className={`flex items-start gap-3.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-900 text-teal-400 border border-slate-800"
                      : "text-muted-foreground hover:bg-slate-900/60 border border-transparent"
                  }`}
                >
                  <div className={`rounded-md p-1.5 ${isSelected ? "bg-slate-950 text-cyan-400" : "bg-slate-950 text-slate-500"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold truncate ${isSelected ? "text-foreground" : "text-slate-300"}`}>
                        {item.title}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-900">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{item.description}</p>
                  </div>
                  {isSelected && (
                    <div className="self-center flex items-center text-[10px] text-muted-foreground font-mono bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded">
                      <CornerDownLeft className="h-3 w-3 mr-1" />
                      Enter
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No results found for &ldquo;<span className="text-foreground">{query}</span>&rdquo;
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center gap-4 px-4 py-2 bg-slate-950 border-t border-slate-900 text-[10px] text-slate-500 font-medium">
          <div className="flex items-center gap-1">
            <kbd className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">↑↓</kbd> Navigate
          </div>
          <div className="flex items-center gap-1">
            <kbd className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">Enter</kbd> Select
          </div>
          <div className="flex items-center gap-1">
            <kbd className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">ESC</kbd> Close
          </div>
        </div>
      </div>
    </div>
  );
}
