"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-[#060913]">
      <div className="glass-panel border border-slate-900 rounded-xl p-8 flex flex-col items-center justify-center max-w-sm space-y-4 neon-glow-teal">
        <Loader2 className="h-8 w-8 text-teal-400 animate-spin" />
        <div>
          <span className="text-xs uppercase tracking-widest text-teal-400 font-extrabold font-mono">
            Telemetry Loading
          </span>
          <p className="text-[11px] text-muted-foreground mt-1">
            Parsing spatial geometries & forecasting equations...
          </p>
        </div>
      </div>
    </div>
  );
}
