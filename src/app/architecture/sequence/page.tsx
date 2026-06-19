import React from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import DiagramContainer from "@/components/handbook/DiagramContainer";

const seqDef = `sequenceDiagram
    autonumber
    participant Cron as Scheduler Cron
    participant Net as Network Fetcher
    participant NOAA as NOAA API Grid
    participant Blend as Consensus Blender
    participant DB as PostGIS Storage
    participant SSE as SSE Streamer
    
    Cron->>Net: Trigger Ingestion (every 6h)
    Net->>NOAA: Request GRIB2 Vectors
    NOAA-->>Net: NetCDF/GRIB2 binary stream
    Net->>Blend: Forward raw values
    activate Blend
    Note over Blend: Circular direction means<br/>& confidence variance calculation
    Blend-->>Net: Standardized Swell & Wind Data
    deactivate Blend
    Net->>DB: UPSERT Spot forecast metrics
    Net->>SSE: Publish Realtime Sync Event
    SSE-->>Client: Streaming data broadcast
`;

export default function SequenceDiagrams() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Sequence Diagrams</h2>
        <p className="text-muted-foreground text-sm">
          Dynamic flow diagram tracing step-by-step function calls during the periodic ingestion tick.
        </p>
      </div>

      <VerificationCard
        pageName="Swell Ingestion Sequence"
        data={{
          status: "verified",
          coverage: 95,
          confidence: "High",
          reviewer: "Operations Lead",
        }}
      />

      <DiagramContainer
        title="Execution Sequence: Scheduler Ingestion & SSE Broadcast"
        description="Mermaid diagram tracing network requests, consensus blends, database writes, and client stream pushes."
        type="mermaid"
        definition={seqDef}
      />
    </div>
  );
}
