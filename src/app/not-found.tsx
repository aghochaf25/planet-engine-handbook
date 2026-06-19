import React from "react";
import Link from "next/link";
import { Compass, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-[#060913]">
      <div className="glass-panel border border-slate-900 rounded-xl p-8 flex flex-col items-center justify-center max-w-sm space-y-6 neon-glow-teal">
        <div className="rounded-full bg-cyan-500/10 border border-cyan-500/20 p-3.5 text-cyan-400">
          <HelpCircle className="h-8 w-8" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-extrabold font-mono">
            404 Route Missing
          </span>
          <h3 className="text-lg font-bold text-white mt-1">Swell Node Not Discovered</h3>
          <p className="text-xs text-muted-foreground mt-2 max-w-xs leading-relaxed">
            The target address does not exist inside our spatial indexes. Try returning to base.
          </p>
        </div>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-teal-400 rounded-lg border border-slate-800 hover:border-teal-500/40 transition-all duration-300"
        >
          <Compass className="h-3.5 w-3.5" />
          Dashboard Overview
        </Link>
      </div>
    </div>
  );
}
