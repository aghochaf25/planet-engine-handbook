import React from "react";
import { CheckCircle2, HelpCircle, ShieldAlert, Award, Calendar, User, Eye, Percent, FileCode2, GitBranch } from "lucide-react";

export type VerificationStatusType = "verified" | "in_progress" | "pending" | "unverified";

export interface VerificationData {
  status: VerificationStatusType;
  coverage: number;
  filesReviewed: number;
  functionsReviewed: number;
  manualReview: boolean;
  lastCommit: string;
  confidence: "High" | "Medium" | "Low" | "None";
  verificationDate: string;
  reviewer: string;
}

const defaultData: VerificationData = {
  status: "unverified",
  coverage: 0,
  filesReviewed: 0,
  functionsReviewed: 0,
  manualReview: false,
  lastCommit: "7a2b9f3 (placeholder)",
  confidence: "None",
  verificationDate: "Pending Gate Execution",
  reviewer: "Unassigned",
};

export function VerificationBadge({ status }: { status: VerificationStatusType }) {
  const config = {
    verified: {
      color: "bg-emerald-950 text-emerald-400 border-emerald-800",
      icon: CheckCircle2,
      label: "VERIFIED GATE",
    },
    in_progress: {
      color: "bg-cyan-950 text-cyan-400 border-cyan-800",
      icon: Eye,
      label: "IN RUNTIME AUDIT",
    },
    pending: {
      color: "bg-amber-950 text-amber-400 border-amber-800",
      icon: HelpCircle,
      label: "PENDING REVIEW",
    },
    unverified: {
      color: "bg-rose-950 text-rose-400 border-rose-800",
      icon: ShieldAlert,
      label: "UNVERIFIED GATE",
    },
  }[status];

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.color}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}

export default function VerificationCard({
  data,
  pageName,
}: {
  data?: Partial<VerificationData>;
  pageName: string;
}) {
  const stats = { ...defaultData, ...data };

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 neon-glow-teal">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Award className="h-24 w-24 text-teal-400" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            System Integrity Gate
            <span className="text-xs font-normal text-muted-foreground">({pageName})</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Automatic quality gates verified by Planet Engine operating guidelines.
          </p>
        </div>
        <div>
          <VerificationBadge status={stats.status} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
        {/* Verification Status */}
        <div className="flex items-start gap-3">
          <div className="rounded-lg p-2 bg-slate-900 border border-border text-teal-400 mt-0.5">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Integrity</div>
            <div className="text-sm font-semibold capitalize text-foreground mt-0.5">{stats.status.replace("_", " ")}</div>
          </div>
        </div>

        {/* Coverage */}
        <div className="flex items-start gap-3">
          <div className="rounded-lg p-2 bg-slate-900 border border-border text-teal-400 mt-0.5">
            <Percent className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Test Coverage</div>
            <div className="text-sm font-semibold text-foreground mt-0.5">{stats.coverage}%</div>
          </div>
        </div>

        {/* Files Reviewed */}
        <div className="flex items-start gap-3">
          <div className="rounded-lg p-2 bg-slate-900 border border-border text-teal-400 mt-0.5">
            <FileCode2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Structure Reviewed</div>
            <div className="text-sm font-semibold text-foreground mt-0.5">
              {stats.filesReviewed} files / {stats.functionsReviewed} fn
            </div>
          </div>
        </div>

        {/* Confidence rating */}
        <div className="flex items-start gap-3">
          <div className="rounded-lg p-2 bg-slate-900 border border-border text-teal-400 mt-0.5">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Confidence Metric</div>
            <div className="text-sm font-semibold text-foreground mt-0.5">{stats.confidence}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border mt-4 pt-4 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <GitBranch className="h-4 w-4 text-slate-500" />
          <span>Last Commit: <strong className="text-foreground">{stats.lastCommit}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4 text-slate-500" />
          <span>Verified: <strong className="text-foreground">{stats.verificationDate}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-4 w-4 text-slate-500" />
          <span>Reviewer: <strong className="text-foreground">{stats.reviewer}</strong></span>
        </div>
      </div>
    </div>
  );
}
