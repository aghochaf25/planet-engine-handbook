import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import FormulaBlock from "@/components/handbook/FormulaBlock";
import { Calculator } from "lucide-react";

export default function ForecastModelsMath() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Calculator className="h-7 w-7 text-teal-400" />
          Forecast Blending Models
        </h2>
        <p className="text-muted-foreground text-sm">
          Circular statistics formulations blending directional angles from NOAA, Copernicus, and regional grid nodes.
        </p>
      </div>

      <VerificationCard
        pageName="Forecast Blending Models"
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
          formula="\\bar{\\theta} = \\text{atan2}\\left(\\sum_{k=1}^K w_k \\sin \\theta_k, \\sum_{k=1}^K w_k \\cos \\theta_k\\right)"
          description="Circular mean swell direction formula. Prevents arithmetic averaging errors at boundary transitions (0/360 degrees) by resolving horizontal and vertical vector components."
        />
      </div>
    </div>
  );
}
