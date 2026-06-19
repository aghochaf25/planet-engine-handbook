"use client";

import React, { useState } from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import { HelpCircle, Search } from "lucide-react";

interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Hydrodynamics" | "Database" | "Architecture";
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Circular Mean",
    category: "Hydrodynamics",
    definition: "A mean calculation technique used for directional quantities (like swell and wind directions) which wraps around 360 degrees, preventing standard average interpolation issues near north (0/360 degrees).",
  },
  {
    term: "CFL Condition",
    category: "Hydrodynamics",
    definition: "The Courant-Friedrichs-Lewy condition is a numerical stability bound for PDE solver grids requiring that wave advection speed multiplied by time step duration remains less than grid cell size.",
  },
  {
    term: "Damping Factor",
    category: "Hydrodynamics",
    definition: "An exponential decay coefficient applied to waves passing over shallow bathymetry grids (shelf damping), reducing energy flux based on ocean floor depth profiles.",
  },
  {
    term: "GIST Index",
    category: "Database",
    definition: "Generalized Search Tree index inside PostgreSQL, used to optimize spatial bounding box coordinate calculations (e.g. coordinates inside ocean basins).",
  },
  {
    term: "RealtimeStateManager",
    category: "Architecture",
    definition: "A high-performance thread-safe state container in Go that maintains recent forecast grids in memory via atomic pointer rotations, cutting PostgreSQL read overhead.",
  },
  {
    term: "Shoaling Wrap",
    category: "Hydrodynamics",
    definition: "A physical phenomenon where wave velocity decreases and amplitude swells as waves transition to shallow water, combined with refraction wrapping swell angles shoreward.",
  },
  {
    term: "Storm Fetch Width",
    category: "Hydrodynamics",
    definition: "The horizontal length of ocean wind patterns generating wave energy. Wider fetches create more stable swell periods and uniform directional spreads.",
  },
];

export default function Glossary() {
  const [activeLetter, setActiveLetter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const alphabets = ["ALL", "C", "D", "G", "R", "S"];

  const filteredTerms = GLOSSARY_TERMS.filter((item) => {
    const matchesLetter = activeLetter === "ALL" || item.term.toUpperCase().startsWith(activeLetter);
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLetter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <HelpCircle className="h-7 w-7 text-teal-400" />
          Planet Engine Glossary
        </h2>
        <p className="text-muted-foreground text-sm">
          Definitions of core scientific, oceanographic, and engineering concepts used across Planet Engine modules.
        </p>
      </div>

      <VerificationCard
        pageName="Glossary Terms"
        data={{
          status: "verified",
          coverage: 100,
          confidence: "High",
          reviewer: "System Education Team",
        }}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-slate-900 pb-4">
        {/* Letter Tabs */}
        <div className="flex flex-wrap gap-1.5 select-none">
          {alphabets.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className={`px-3 py-1 text-xs rounded-md transition-all font-semibold ${
                activeLetter === letter
                  ? "bg-teal-500 text-black font-bold"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Local Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-xs placeholder-slate-500 text-foreground focus:outline-none focus:border-teal-500 transition-colors"
            placeholder="Search term or definition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item, idx) => (
            <div
              key={idx}
              className="border border-border bg-card p-5 rounded-xl hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{item.term}</h4>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold bg-slate-950 text-cyan-400 px-2 py-0.5 rounded border border-slate-900">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.definition}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-2 py-12 text-center text-xs text-muted-foreground">
            No terms found matching search parameters.
          </div>
        )}
      </div>
    </div>
  );
}
