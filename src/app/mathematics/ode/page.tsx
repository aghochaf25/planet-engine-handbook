import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import FormulaBlock from "@/components/handbook/FormulaBlock";
import { Calculator } from "lucide-react";

export default function OdeMath() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Calculator className="h-7 w-7 text-teal-400" />
          Ordinary Differential Equations (ODE)
        </h2>
        <p className="text-muted-foreground text-sm">
          Swell packet group synchronizations solved via Kuramoto phase-coupled models.
        </p>
      </div>

      <VerificationCard
        pageName="Ordinary Differential Equations (ODE)"
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
          formula="\\frac{d \\theta_i}{dt} = \\omega_i + \\frac{K}{N} \\sum_{j=1}^N \\sin(\\theta_j - \\theta_i)"
          description="Kuramoto phase-coupling ODE modeling synchronization of local wave peak directions on coastal node graphs. \\theta_i is the phase angle, \\omega_i is natural frequency, and K is coupling strength."
        />
      </div>
    </div>
  );
}
