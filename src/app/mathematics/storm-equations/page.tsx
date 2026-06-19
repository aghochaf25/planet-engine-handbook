import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import FormulaBlock from "@/components/handbook/FormulaBlock";
import { Calculator } from "lucide-react";

export default function StormEquationsMath() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Calculator className="h-7 w-7 text-teal-400" />
          Storm Fetch & Swell Decay
        </h2>
        <p className="text-muted-foreground text-sm">
          Calculations tracing swell decay rates across geographical distances from generating storm fetch zones.
        </p>
      </div>

      <VerificationCard
        pageName="Storm Fetch & Swell Decay"
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
          formula="H_d = H_0 \\cdot e^{-\\alpha d}"
          description="Swell height attenuation equation where H_0 is initial significant wave height at storm boundary, \\alpha is the period-dependent decay coefficient, and d is travel distance."
        />
      </div>
    </div>
  );
}
