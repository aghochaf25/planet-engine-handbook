import React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  status?: "active" | "inactive" | "warning";
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  change,
  changeType = "neutral",
  status = "active",
}: MetricCardProps) {
  const statusColor = {
    active: "bg-teal-500",
    inactive: "bg-slate-500",
    warning: "bg-amber-500",
  }[status];

  const changeColor = {
    positive: "text-emerald-400",
    negative: "text-rose-400",
    neutral: "text-slate-400",
  }[changeType];

  return (
    <div className="relative group overflow-hidden rounded-xl border border-border bg-card p-6 neon-glow-blue transition-all duration-300 hover:border-teal-500 hover:translate-y-[-2px]">
      {/* Top indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-right from-primary to-accent transition-all duration-300 group-hover:h-[4px]" />
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="rounded-lg p-2 bg-muted text-primary transition-colors group-hover:text-cyan-400 group-hover:bg-slate-800">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
        {change && (
          <span className={`text-xs font-semibold ${changeColor}`}>
            {change}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      )}

      {/* Decorative pulse glow in the corner */}
      <div className={`absolute bottom-3 right-3 h-2 w-2 rounded-full ${statusColor} opacity-75 group-hover:animate-pulse`} />
    </div>
  );
}
