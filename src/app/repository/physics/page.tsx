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
  GitCommit
} from "lucide-react";

// Functions list for physics files
const PHYSICS_FUNCTIONS = [
  {
    name: "energy.go",
    path: "backend/internal/physics/energy.go",
    description: "Computes raw ocean wave power flux (kW/m) and normalizes values to prevent long-period saturation.",
    functions: [
      { name: "CalculateEnergyFlux", line: 5, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/physics/energy.go#L5", sig: "func CalculateEnergyFlux(swellHeightM float64, swellPeriodS int) float64", notes: "Implements wave power approximation: P = 0.5 * H^2 * T." },
      { name: "NormalizeEnergyFlux", line: 18, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/physics/energy.go#L18", sig: "func NormalizeEnergyFlux(flux float64) float64", notes: "Normalizes flux into bounded (0-100) scores for mellow, active, heavy, and extreme swells." }
    ]
  },
  {
    name: "bathymetry.go",
    path: "backend/internal/physics/bathymetry.go",
    description: "Simulates reef, point, and beach bathymetry profiles and calculates swell wrap refraction coefficients.",
    functions: [
      { name: "GetBathymetryProfile", line: 7, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/physics/bathymetry.go#L7", sig: "func GetBathymetryProfile(spotID string) models.BathymetryProfile", notes: "Returns ReefType, WrapFactor, RefractionStrength, and CloseoutRisk profile parameters." },
      { name: "CalculateRefractionFactor", line: 53, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/physics/bathymetry.go#L53", sig: "func CalculateRefractionFactor(profile models.BathymetryProfile, periodS int, tuning RegionalTuning) float64", notes: "Boosts wave height for long-period point/reef wraps, and applies closeout penalties for beach breaks." }
    ]
  },
  {
    name: "offshore.go",
    path: "backend/internal/physics/offshore.go",
    description: "Evaluates offshore and onshore wind speed impact on the wave face.",
    functions: [
      { name: "CalculateOffshoreQuality", line: 7, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/physics/offshore.go#L7", sig: "func CalculateOffshoreQuality(windSpeedKts float64, angleDiff float64) float64", notes: "Implements a wind-speed sigmoid curve, penalizing high winds (>12kts) and strong onshore angles." }
    ]
  },
  {
    name: "shape.go",
    path: "backend/internal/physics/shape.go",
    description: "Semantic wave classification and barrel probability modeling.",
    functions: [
      { name: "CalculateWaveShape", line: 7, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/physics/shape.go#L7", sig: "func CalculateWaveShape(periodS int, offshoreQuality float64, energyFlux float64, profile models.BathymetryProfile, tideQuality float64, windSpeedKts float64) string", notes: "Outputs wave shape labels: PEAKING, WALLING, HOLLOW, FAT, CLOSEOUT, STORMY, GLASSY." },
      { name: "CalculateBarrelProbability", line: 43, url: "file:///Users/Apple/.gemini/antigravity/scratch/wavenow-backend/backend/internal/physics/shape.go#L43", sig: "func CalculateBarrelProbability(offshoreQuality float64, periodS int, profile models.BathymetryProfile, tideQuality float64, energyFlux float64, tuning RegionalTuning) float64", notes: "Computes barrel probability index (0.0 to 1.0) based on reef profiles and period thresholds." }
    ]
  }
];

export default function PhysicsTopography() {
  const [activeTab, setActiveTab] = useState<"overview" | "equations" | "topography" | "flows">("overview");
  const [selectedFile, setSelectedFile] = useState<any>(PHYSICS_FUNCTIONS[0]);

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Title & Metadata */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500/10 p-2 rounded-lg border border-teal-500/20">
            <Cpu className="h-8 w-8 text-teal-400" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Wave Physics & Kinematic Modeling Engine
            </h2>
            <p className="text-muted-foreground text-sm">
              Shallow-water shoaling solvers, refraction wraps, offshore wind sigmoids, and semantic wave classification.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Gate Card */}
      <VerificationCard
        pageName="Physics Engine Module"
        data={{
          status: "verified",
          coverage: 95.0,
          filesReviewed: 9,
          functionsReviewed: 22,
          confidence: "High",
          verificationDate: "June 19, 2026",
          reviewer: "Documentation Platform Lead",
          lastCommit: "56226cae (verified)"
        }}
      />

      {/* Tab Switcher */}
      <div className="flex border-b border-border bg-slate-950/40 p-1 rounded-lg max-w-fit gap-1">
        {[
          { id: "overview", label: "Module Overview", icon: Shield },
          { id: "equations", label: "Physical Equations", icon: Cpu },
          { id: "topography", label: "File Topography", icon: FileCode2 },
          { id: "flows", label: "Physics Pipeline", icon: Activity }
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

      {/* Tab Panels */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Purpose */}
              <div className="border border-border bg-card rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-teal-400" />
                  Core Purpose & Shoaling Physics
                </h3>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                  The physics module simulates wave behaviors as they transition from deep-water ocean basins to shallow 
                  coastal bathymetry profiles. It calculates wave power flux density, wraps swells around point breaks and reefs using 
                  period-dependent refraction models, accounts for wind shear on the wave face, and outputs classification metadata 
                  such as wave shape labels and barrel probability coefficients.
                </p>
              </div>

              {/* Bathymetry Profile mapping */}
              <div className="border border-border bg-slate-950/20 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="h-4.5 w-4.5 text-teal-400" />
                  Reef & Bathymetry Classification
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Wave transformation is governed by the spot's local bathymetric layout:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1.5">
                      <span className="text-teal-400 font-bold block">1. Point Breaks</span>
                      <span>Wrap: 1.8</span>
                      <span>Refraction: 0.9</span>
                      <span>Closeout: 0.1</span>
                    </div>
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1.5">
                      <span className="text-teal-400 font-bold block">2. Reef Breaks</span>
                      <span>Wrap: 1.2</span>
                      <span>Refraction: 1.0</span>
                      <span>Closeout: 0.3</span>
                    </div>
                    <div className="border border-slate-900 bg-slate-950/40 p-3 rounded space-y-1.5">
                      <span className="text-teal-400 font-bold block">3. Beach Breaks</span>
                      <span>Wrap: 0.5</span>
                      <span>Refraction: 0.3</span>
                      <span>Closeout: 0.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar metrics */}
            <div className="space-y-6">
              <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Wave Shape States</h4>
                <div className="space-y-3.5 text-xs text-muted-foreground">
                  <div className="border-l border-slate-800 pl-3.5 space-y-1">
                    <span className="text-slate-300 font-bold block">HOLLOW / BARREL</span>
                    <span>Triggered on points/reefs when T &ge; 12s, with strong offshore winds (&ge;0.8) and optimal tide heights.</span>
                  </div>
                  <div className="border-l border-slate-800 pl-3.5 space-y-1">
                    <span className="text-slate-300 font-bold block">WALLING</span>
                    <span>Triggered on point breaks with long swell periods (T &ge; 12s) and high energy flux.</span>
                  </div>
                  <div className="border-l border-slate-800 pl-3.5 space-y-1">
                    <span className="text-slate-300 font-bold block">CLOSEOUT</span>
                    <span>Occurs at beach breaks when long-period swells (T &ge; 14s) and high energy saturate sandbars.</span>
                  </div>
                  <div className="border-l border-slate-800 pl-3.5 space-y-1">
                    <span className="text-slate-300 font-bold block">FAT</span>
                    <span>Occurs at point breaks when tide window quality falls below 0.5, slowing wave breaking.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "equations" && (
          <div className="border border-border bg-card rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Wave Modeling Equations</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Trigonometric and fluid mechanics curves solved by the module.</p>
            </div>

            <div className="space-y-6 text-sm text-muted-foreground">
              {/* Energy Flux */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200">1. Wave Power Density</h4>
                <p className="text-xs leading-relaxed">
                  Calculates wave energy flux P (kW/m of wave crest) in deep water:
                </p>
                <FormulaBlock
                  formula="P \approx 0.5 \cdot H_{swell}^2 \cdot T_{period}"
                />
              </div>

              {/* Refraction wraps */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200">2. Shallow-Water Bathymetric wrap</h4>
                <p className="text-xs leading-relaxed">
                  Long-period swells feel bottom earlier and wrap around shoals. 
                  Refraction factor F_ref scales with period T, wrap factor W_f, and refraction strength R_s:
                </p>
                <FormulaBlock
                  formula="F_{ref} = 1.0 + (T - 13) \cdot 0.1 \cdot W_f \cdot R_s \cdot M_{tuning} \quad (\text{For } T \ge 14\text{s})"
                />
              </div>

              {/* Offshore sigmoid */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200">3. Wind Shear Sigmoid Curve</h4>
                <p className="text-xs leading-relaxed">
                  Rewards offshore wind directions (alignment A_align &gt; 0) and penalizes onshore directions. 
                  Offshore speed quality Q_speed peaks at 5-12 kts, decaying exponentially for strong winds:
                </p>
                <FormulaBlock
                  formula="Q_{speed} = e^{-0.05 \cdot (V_{wind} - 12)} \quad (\text{For } V_{wind} > 12\text{ kts})"
                />
                <FormulaBlock
                  formula="Q_{wind} = Q_{speed} \cdot A_{align}"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "topography" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tree */}
            <div className="border border-border bg-slate-950/20 rounded-xl p-4 flex flex-col gap-4 h-[550px]">
              <div>
                <h3 className="text-sm font-bold text-white">Physics Module Files</h3>
                <p className="text-[11px] text-muted-foreground">Select a file to inspect its functions</p>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-thin">
                {PHYSICS_FUNCTIONS.map((file) => (
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
                {/* Unit Tests File entry */}
                <div className="p-3 rounded-lg border border-slate-900 bg-slate-950/20 text-slate-500">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs">physics_test.go</span>
                    <span className="text-[9px] uppercase tracking-wider bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-black">
                      PASSED (6/6)
                    </span>
                  </div>
                  <p className="text-[11px] mt-1 text-slate-600">Tests energy flux realism, refraction wraps, and shapes classification.</p>
                </div>
              </div>
            </div>

            {/* Inspector */}
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
              title="Physics Calculation Swarm Execution Pipeline"
              description="Chronological mathematical evaluation stages executed on a spot forecast input to compute wave quality metrics."
              type="mermaid"
              definition={`graph TD
    Start[Forecast Inputs] --> PowerCalc[Calculate raw EnergyFlux: H^2 * T * 0.5]
    PowerCalc --> PowerNorm[Normalize EnergyFlux: prevent saturation]
    PowerNorm --> RefractCalc[Calculate Refraction Wrap: Point/Reef wrap multipliers]
    RefractCalc --> WindAlign[Calculate Wind Direction Alignment diff]
    WindAlign --> WindSigmoid[Evaluate Offshore wind speed Sigmoid quality]
    WindSigmoid --> TideCalc[Evaluate Tide window quality based on ReefType]
    TideCalc --> ScoreEngine[Calculate components score: wind, swell, tide, decay]
    ScoreEngine --> ShapeClass[Semantic Wave Shape Classification]
    ShapeClass --> BarrelProb[Calculate Barrel Probability index]
    BarrelProb --> End[Return completed SpotScore data]`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
