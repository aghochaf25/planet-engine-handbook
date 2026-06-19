import React from "react";

interface CoverageGaugeProps {
  percentage: number;
  label: string;
  size?: number;
  strokeWidth?: number;
}

export default function CoverageGauge({
  percentage,
  label,
  size = 120,
  strokeWidth = 10,
}: CoverageGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine colors based on percentage
  const getColors = () => {
    if (percentage >= 80) return { stroke: "stroke-emerald-400", text: "text-emerald-400" };
    if (percentage >= 50) return { stroke: "stroke-cyan-400", text: "text-cyan-400" };
    if (percentage >= 20) return { stroke: "stroke-amber-400", text: "text-amber-400" };
    return { stroke: "stroke-rose-400", text: "text-rose-400" };
  };

  const colors = getColors();

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-950/40 rounded-xl border border-border">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background track circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="stroke-slate-800"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress circle */}
          <circle
            className={`transition-all duration-500 ease-out ${colors.stroke}`}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold tracking-tight text-foreground">{percentage}%</span>
        </div>
      </div>
      <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}
