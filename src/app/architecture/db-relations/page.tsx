import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";

const erDiagramDef = `erDiagram
    PLANET ||--o{ OCEAN_BASIN : contains
    OCEAN_BASIN ||--o{ SEA : intersects
    SEA ||--o{ COUNTRY : borders
    COUNTRY ||--o{ REGION : divides
    REGION ||--o{ SPOT : locates
    SPOT ||--|| SPOT_DNA : profiles
    SPOT_DNA ||--|| CALIBRATION_PROFILE : applies
`;

export default function DatabaseRelations() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Database Relationships</h2>
        <p className="text-muted-foreground text-sm">
          Spatial relational boundaries mapping planets, ocean basins, regions, and spot calibrations inside PostgreSQL.
        </p>
      </div>

      <VerificationCard
        pageName="Database Relations Schema"
        data={{
          status: "verified",
          coverage: 100,
          confidence: "High",
          reviewer: "Lead Database Engineer",
        }}
      />

      <DiagramContainer
        title="Entity Relationship Layout"
        description="Mermaid layout tracing data integrity constraints and spatial linkages."
        type="mermaid"
        definition={erDiagramDef}
      />
    </div>
  );
}
