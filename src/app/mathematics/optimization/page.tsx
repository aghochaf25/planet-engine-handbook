import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import FormulaBlock from "@/components/handbook/FormulaBlock";
import { Calculator } from "lucide-react";

export default function OptimizationMath() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Calculator className="h-7 w-7 text-teal-400" />
          Optimization Models
        </h2>
        <p className="text-muted-foreground text-sm">
          Ridge-regularized multi-model consensus optimization algorithms for weather data providers.
        </p>
      </div>

      <VerificationCard
        pageName="Optimization Models"
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

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4 font-mono">
          Physical Formulation
        </h3>
        <FormulaBlock
          formula="\\min_{\\mathbf{w}} \\sum_{i=1}^M \\left(y_i - \\sum_{k=1}^K w_k f_{k,i}\\right)^2 + \\lambda \\|\\mathbf{w}\\|_2^2"
          description="L2-regularized objective function for provider weights optimization, minimizing prediction residual variance while preventing model over-fitting."
        />
      </div>
    </div>
  );
}
