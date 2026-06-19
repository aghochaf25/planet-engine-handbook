"use client";

import React, { useState } from "react";
import { Folder, File, ChevronRight, ChevronDown, Code, ArrowRightLeft, Cpu, Layers } from "lucide-react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  language?: string;
  functions?: { name: string; signature: string; line: number; calls: string[] }[];
  dependencies?: string[];
  crossRefs?: string[];
}

const REPO_TREE: FileNode[] = [
  {
    name: "backend",
    type: "folder",
    children: [
      {
        name: "cmd",
        type: "folder",
        children: [
          {
            name: "main.go",
            type: "file",
            language: "go",
            functions: [
              { name: "main", signature: "func main()", line: 15, calls: ["StartScheduler", "RegisterAPIRoutes"] },
            ],
            dependencies: ["backend/scheduler", "backend/api"],
          },
        ],
      },
      {
        name: "physics",
        type: "folder",
        children: [
          {
            name: "wave_power.go",
            type: "file",
            language: "go",
            functions: [
              { name: "CalculateEnergyFlux", signature: "func CalculateEnergyFlux(h float64, t float64) float64", line: 20, calls: [] },
              { name: "ApplyShelfDamping", signature: "func ApplyShelfDamping(flux float64, depth float64) float64", line: 45, calls: ["CalculateEnergyFlux"] },
            ],
            dependencies: ["math"],
          },
        ],
      },
      {
        name: "scheduler",
        type: "folder",
        children: [
          {
            name: "cron.go",
            type: "file",
            language: "go",
            functions: [
              { name: "StartScheduler", signature: "func StartScheduler()", line: 12, calls: ["FetchNOAAData", "FetchCopernicusData"] },
              { name: "FetchNOAAData", signature: "func FetchNOAAData()", line: 30, calls: ["CalculateEnergyFlux"] },
            ],
            dependencies: ["backend/physics"],
          },
        ],
      },
    ],
  },
  {
    name: "shared",
    type: "folder",
    children: [
      {
        name: "models.go",
        type: "file",
        language: "go",
        functions: [],
        dependencies: [],
      },
    ],
  },
];

export default function CodeExplorer() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    backend: true,
  });

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const renderTree = (node: FileNode, path = "") => {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    const isFolder = node.type === "folder";
    const isExpanded = expandedFolders[currentPath];

    if (isFolder) {
      return (
        <div key={currentPath} className="pl-3">
          <button
            onClick={() => toggleFolder(currentPath)}
            className="flex items-center gap-1.5 py-1 text-xs text-slate-300 hover:text-teal-400 font-mono transition-colors"
          >
            {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            <Folder className="h-3.5 w-3.5 text-cyan-500 fill-cyan-500/10" />
            <span>{node.name}</span>
          </button>
          {isExpanded && node.children && (
            <div className="border-l border-slate-900 ml-1.5 mt-0.5">
              {node.children.map((child) => renderTree(child, currentPath))}
            </div>
          )}
        </div>
      );
    }

    const isSelected = selectedFile?.name === node.name;
    return (
      <button
        key={currentPath}
        onClick={() => setSelectedFile(node)}
        className={`flex items-center gap-1.5 py-1 pl-5 text-xs font-mono w-full text-left transition-all border-l ${
          isSelected
            ? "text-teal-400 border-teal-500 bg-teal-950/20 font-bold"
            : "text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-800"
        }`}
      >
        <File className="h-3.5 w-3.5 text-slate-500" />
        <span>{node.name}</span>
      </button>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl border border-border bg-slate-950/40 p-4">
      {/* File Tree Panel */}
      <div className="border border-slate-900 rounded-lg p-3 bg-card flex flex-col h-[400px]">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold px-2 pb-2 border-b border-slate-900 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-teal-400" />
          Repository Topography
        </div>
        <div className="mt-3 overflow-y-auto flex-1 scrollbar-thin">
          {REPO_TREE.map((node) => renderTree(node))}
        </div>
      </div>

      {/* Explorer / Inspector panel */}
      <div className="md:col-span-2 flex flex-col border border-slate-900 rounded-lg bg-card h-[400px] overflow-hidden">
        {selectedFile ? (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-900 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-teal-400 font-mono">
                  {selectedFile.language?.toUpperCase()} MODULE
                </span>
                <h4 className="text-sm font-bold text-foreground mt-0.5">{selectedFile.name}</h4>
              </div>
              <div className="text-[10px] text-muted-foreground bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                Mock Code Explorer
              </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
              {/* Functions List */}
              {selectedFile.functions && selectedFile.functions.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Code className="h-3.5 w-3.5 text-teal-400" />
                    Indexed Functions ({selectedFile.functions.length})
                  </h5>
                  <div className="space-y-2">
                    {selectedFile.functions.map((fn, idx) => (
                      <div key={idx} className="p-3 bg-slate-950/60 rounded-lg border border-slate-900 font-mono text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-400 font-semibold">{fn.name}</span>
                          <span className="text-slate-500">Line {fn.line}</span>
                        </div>
                        <div className="text-slate-400 mt-1 text-[11px]">{fn.signature}</div>
                        {fn.calls.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-slate-900 flex items-center gap-2">
                            <span className="text-[10px] uppercase text-slate-500">Call-graph calls:</span>
                            <div className="flex flex-wrap gap-1">
                              {fn.calls.map((c, i) => (
                                <span key={i} className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-cyan-400">
                                  {c}()
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dependencies & Cross References */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedFile.dependencies && (
                  <div>
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5 text-teal-400" />
                      Dependencies
                    </h5>
                    {selectedFile.dependencies.length > 0 ? (
                      <ul className="space-y-1 pl-1">
                        {selectedFile.dependencies.map((dep, idx) => (
                          <li key={idx} className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                            <span className="h-1 w-1 bg-teal-500 rounded-full" />
                            {dep}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-xs italic text-muted-foreground">No explicit dependencies.</span>
                    )}
                  </div>
                )}

                {selectedFile.dependencies && (
                  <div>
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ArrowRightLeft className="h-3.5 w-3.5 text-teal-400" />
                      Cross References
                    </h5>
                    <span className="text-xs italic text-muted-foreground">
                      No incoming references mapped yet. Run code compiler loop to build.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-muted-foreground">
            <Code className="h-8 w-8 text-slate-700 animate-pulse mb-3" />
            <span className="text-sm font-semibold">No File Selected</span>
            <p className="text-xs max-w-xs mt-1">
              Select a source file in the topography tree to view its functions, calls, and packages.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
