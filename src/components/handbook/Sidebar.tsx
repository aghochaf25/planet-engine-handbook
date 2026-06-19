"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Compass, ChevronDown, ChevronRight, 
  Layers, Database, BarChart3, HelpCircle, 
  Milestone, FileText, Settings, Award 
} from "lucide-react";
import CommandPalette from "./CommandPalette";

interface SidebarItem {
  title: string;
  path?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: { title: string; path: string }[];
  isCollapsible?: boolean;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: Compass,
  },
  {
    title: "Architecture",
    icon: Layers,
    isCollapsible: true,
    children: [
      { title: "System Architecture", path: "/architecture/system" },
      { title: "Dependency Graph", path: "/architecture/dependencies" },
      { title: "Sequence Diagrams", path: "/architecture/sequence" },
      { title: "Data Flow", path: "/architecture/data-flow" },
      { title: "Forecast Pipeline", path: "/architecture/pipelines/forecast" },
      { title: "Scheduler Pipeline", path: "/architecture/pipelines/scheduler" },
      { title: "Storm Engine Pipeline", path: "/architecture/pipelines/storm" },
      { title: "Database Relations", path: "/architecture/db-relations" },
    ],
  },
  {
    title: "Repository Topography",
    icon: Database,
    isCollapsible: true,
    children: [
      { title: "Backend Main", path: "/repository/backend" },
      { title: "Frontend Main", path: "/repository/frontend" },
      { title: "Admin OS", path: "/repository/admin" },
      { title: "Physics Engine", path: "/repository/physics" },
      { title: "Weather Core", path: "/repository/weather" },
      { title: "Ocean Intelligence", path: "/repository/ocean" },
      { title: "Forecast Module", path: "/repository/forecast" },
      { title: "Storm Engine Module", path: "/repository/storm-engine" },
      { title: "Scheduler Daemon", path: "/repository/scheduler" },
      { title: "Metadata SSOT", path: "/repository/metadata" },
      { title: "Importer Pipeline", path: "/repository/importer" },
      { title: "Search Engine", path: "/repository/search" },
      { title: "Database (Postgres)", path: "/repository/db" },
      { title: "API (REST/SSE)", path: "/repository/api" },
      { title: "Infrastructure Config", path: "/repository/infrastructure" },
    ],
  },
  {
    title: "Mathematics Engine",
    icon: BarChart3,
    isCollapsible: true,
    children: [
      { title: "Wave Equations", path: "/mathematics/wave-equations" },
      { title: "Storm Equations", path: "/mathematics/storm-equations" },
      { title: "PDE Solvers", path: "/mathematics/pde" },
      { title: "ODE Solvers", path: "/mathematics/ode" },
      { title: "Optimization Models", path: "/mathematics/optimization" },
      { title: "Forecast Models", path: "/mathematics/forecast-models" },
      { title: "Confidence Models", path: "/mathematics/confidence-models" },
      { title: "Calibration Loops", path: "/mathematics/calibration" },
    ],
  },
  {
    title: "Roadmap",
    path: "/roadmap",
    icon: Milestone,
  },
  {
    title: "Architecture Decisions (ADR)",
    path: "/adr",
    icon: FileText,
  },
  {
    title: "Glossary",
    path: "/glossary",
    icon: HelpCircle,
  },
  {
    title: "Reports & Audits",
    path: "/reports",
    icon: Award,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsedStates, setCollapsedStates] = useState<Record<string, boolean>>({
    Architecture: false,
    "Repository Topography": true,
    "Mathematics Engine": true,
  });

  const toggleCategory = (title: string) => {
    setCollapsedStates((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const isChildActive = (children?: { path: string }[]) => {
    if (!children) return false;
    return children.some((child) => pathname === child.path);
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-[#060913] border-r border-slate-800 text-slate-300 w-64 shrink-0">
      {/* Brand logo header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-900 bg-slate-950/40">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-gradient-to-tr from-teal-400 to-cyan-500 flex items-center justify-center text-[11px] font-black text-black tracking-tighter">
            PE
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-white leading-none">PLANET ENGINE</h1>
            <span className="text-[9px] uppercase tracking-widest text-teal-400 font-semibold mt-0.5 block">
              Handbook Platform
            </span>
          </div>
        </Link>
        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isOpenCategory = !collapsedStates[item.title];
          const activeItem = isActive(item.path) || isChildActive(item.children);

          return (
            <div key={item.title} className="space-y-1">
              {hasChildren ? (
                // Collapsible parent link
                <div>
                  <button
                    onClick={() => toggleCategory(item.title)}
                    className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-xs font-semibold transition-all ${
                      activeItem
                        ? "bg-slate-900/60 text-teal-400 font-bold border-l-2 border-teal-500"
                        : "hover:bg-slate-900/40 hover:text-slate-200"
                    }`}
                  >
                    {Icon && <Icon className={`h-4 w-4 shrink-0 ${activeItem ? "text-teal-400" : "text-slate-400"}`} />}
                    <span className="flex-1">{item.title}</span>
                    {isOpenCategory ? (
                      <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                    )}
                  </button>

                  {isOpenCategory && (
                    <div className="pl-6 border-l border-slate-900 ml-4.5 mt-1 space-y-0.5">
                      {item.children!.map((child) => {
                        const childActive = pathname === child.path;
                        return (
                          <Link
                            key={child.title}
                            href={child.path}
                            className={`block px-3 py-1.5 text-[11px] rounded transition-all font-medium ${
                              childActive
                                ? "text-cyan-400 font-bold bg-slate-950/60"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-950/20"
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                // Standalone link
                <Link
                  href={item.path || "/"}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeItem
                      ? "bg-slate-900/60 text-teal-400 font-bold border-l-2 border-teal-500"
                      : "hover:bg-slate-900/40 hover:text-slate-200"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {Icon && <Icon className={`h-4 w-4 shrink-0 ${activeItem ? "text-teal-400" : "text-slate-400"}`} />}
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-900 bg-slate-950/40 text-[10px] text-slate-500 font-semibold space-y-1.5">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SSOT Engine v1.0.0</span>
        </div>
        <div className="text-slate-600">Verification Engine Offline</div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-[#060913] border-b border-slate-800 text-white sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-gradient-to-tr from-teal-400 to-cyan-500 flex items-center justify-center text-[10px] font-black text-black">
            PE
          </div>
          <span className="text-xs font-extrabold tracking-tight">PLANET HANDBOOK</span>
        </div>
        <div className="flex items-center gap-3">
          <CommandPalette />
          <button className="text-slate-300 hover:text-white" onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden md:flex h-screen sticky top-0 select-none">
        {renderSidebarContent()}
      </aside>

      {/* Mobile drawer backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-64 h-full animate-slide-in">
            {renderSidebarContent()}
          </div>
          <div className="flex-1" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
