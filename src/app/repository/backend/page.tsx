import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import CodeExplorer from "@/components/handbook/CodeExplorer";
import { FolderGit2 } from "lucide-react";

export default function BackendTopography() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <FolderGit2 className="h-7 w-7 text-teal-400" />
          Backend Main Topography
        </h2>
        <p className="text-muted-foreground text-sm">
          Core high-performance Go application codebase. Contains command inputs, routers, and spatial math systems.
        </p>
      </div>

      <VerificationCard
        pageName="Go Backend Core"
        data={{
          status: "unverified",
          coverage: 0,
          confidence: "None",
          verificationDate: "Pending Verification Run",
        }}
      />

      {/* Code Explorer */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">Module Code Explorer</h3>
        <CodeExplorer />
      </div>
    </div>
  );
}
