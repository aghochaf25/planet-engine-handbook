import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import CodeExplorer from "@/components/handbook/CodeExplorer";
import { FolderGit2 } from "lucide-react";

export default function AdminTopography() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <FolderGit2 className="h-7 w-7 text-teal-400" />
          Admin OS Topography
        </h2>
        <p className="text-muted-foreground text-sm">
          Operational dashboard for metadata administration, logs, and state checkpoints.
        </p>
      </div>

      <VerificationCard
        pageName="Admin OS Module"
        data={{
          status: "unverified",
          coverage: 0,
          filesReviewed: 0,
          functionsReviewed: 0,
          confidence: "None",
          verificationDate: "Pending Verification Run",
          reviewer: "Unassigned",
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
