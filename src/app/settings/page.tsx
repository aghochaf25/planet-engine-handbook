"use client";

import React, { useState } from "react";
import VerificationCard from "@/components/handbook/VerificationCard";
import { Settings, RefreshCw, Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const [mockMode, setMockMode] = useState(true);
  const [syncUrl] = useState("https://api.planetengine.internal/telemetry/sync");
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Settings className="h-7 w-7 text-teal-400" />
          Platform Settings
        </h2>
        <p className="text-muted-foreground text-sm">
          Configure the Engineering Handbook interface options, local developer environments, and sync hooks.
        </p>
      </div>

      <VerificationCard
        pageName="Platform Config"
        data={{
          status: "verified",
          coverage: 100,
          confidence: "High",
          reviewer: "System Administrator",
        }}
      />

      <div className="border border-border bg-card rounded-xl p-6 space-y-6">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider pb-3 border-b border-slate-900">
          Telemetry & Synchronization Settings
        </h3>

        {/* Mock Mode Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-slate-200">Simulate Realtime Telemetry (Mock Mode)</h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Simulates mock logs, latency data, and scheduler cycles. Deactivate this to bind to real gRPC ports later.
            </p>
          </div>
          <button
            onClick={() => setMockMode(!mockMode)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              mockMode ? "bg-teal-500" : "bg-slate-800"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow ring-0 transition duration-200 ease-in-out ${
                mockMode ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Webhook Sync URL */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-slate-200">Autocommit Sync Webhook URL</h4>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            The target endpoint receiving telemetry updates from Go test pipelines. (Disabled in Phase 1).
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              disabled
              className="flex-1 bg-slate-950/60 border border-slate-900 rounded-lg px-3 py-2 text-xs text-slate-500 cursor-not-allowed font-mono"
              value={syncUrl}
            />
            <button
              disabled
              className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-500 cursor-not-allowed flex items-center gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Sync Now
            </button>
          </div>
        </div>

        {/* Telemetry Encryption Token */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-slate-200">Platform Access Encryption Key</h4>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Key used to verify incoming SSE connections from target test runners.
          </p>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              disabled
              className="w-full bg-slate-950/60 border border-slate-900 rounded-lg px-3 py-2 text-xs text-slate-500 cursor-not-allowed font-mono pr-10"
              value="pe_handbook_auth_token_7a2b9f3_x82l10s"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-2 text-slate-500 hover:text-slate-400"
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
