"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics service or server console
    console.error("System Error Boundary:", error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-[#060913]">
      <div className="glass-panel border border-slate-900 rounded-xl p-8 flex flex-col items-center justify-center max-w-md space-y-6 neon-glow-teal">
        <div className="rounded-full bg-rose-500/10 border border-rose-500/20 p-3.5 text-rose-400">
          <AlertOctagon className="h-8 w-8" />
        </div>
        
        <div>
          <span className="text-xs uppercase tracking-widest text-rose-400 font-extrabold font-mono">
            System Error Boundary
          </span>
          <h3 className="text-lg font-bold text-white mt-1">An unexpected error has occurred</h3>
          <p className="text-xs text-muted-foreground mt-2 max-w-xs leading-relaxed">
            The telemetry parser failed to map the current view. Try resetting the route cache.
          </p>
        </div>

        {error.digest && (
          <div className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded border border-slate-900 select-all">
            Digest: {error.digest}
          </div>
        )}

        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-teal-400 rounded-lg border border-slate-800 hover:border-teal-500/40 transition-all duration-300"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset State
        </button>
      </div>
    </div>
  );
}
