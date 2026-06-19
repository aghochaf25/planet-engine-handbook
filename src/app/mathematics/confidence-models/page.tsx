import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import FormulaBlock from "@/components/handbook/FormulaBlock";
import { Calculator } from "lucide-react";

export default function ConfidenceModelsMath() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Calculator className="h-7 w-7 text-teal-400" />
          Confidence & Variance Models
        </h2>
        <p className="text-muted-foreground text-sm">
          Statistical variance measures calculating consensus tightness for multiple weather forecasts.
        </p>
      </div>

      <VerificationCard
        pageName="Confidence & Variance Models"
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
          formula="R = \\sqrt{\\left(\\sum_{k=1}^K w_k \\cos \\theta_k\\right)^2 + \\left(\\sum_{k=1}^K w_k \\sin \\theta_k\\right)^2}"
          description="Mean resultant vector length R. A value close to 1 indicates high provider directional consensus alignment, while values near 0 represent isotropic wind/swell dispersion."
        />
      </div>
    </div>
  );
}
