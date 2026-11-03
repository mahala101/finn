"use client";
import { useState } from "react";
import { announcements, volumeAlerts } from "@/data/announcements";
import AnnouncementCard from "./AnnouncementCard";
import { cn, changeColor } from "@/lib/utils";

type TimeWindow = "24h" | "3d" | "7d";

function getHoursAgo(hours: number): Date {
  return new Date(Date.now() - hours * 60 * 60 * 1000);
}

export default function DigestView() {
  const [window, setWindow] = useState<TimeWindow>("7d");
  const [showRoutine, setShowRoutine] = useState(false);

  // Filter by time window
  const cutoff =
    window === "24h"
      ? getHoursAgo(24)
      : window === "3d"
      ? getHoursAgo(72)
      : getHoursAgo(168);

  const filtered = announcements.filter(
    (a) => new Date(a.timestamp) >= cutoff
  );

  const material = filtered.filter((a) => a.priority !== "routine");
  const routine = filtered.filter((a) => a.priority === "routine");
  const critical = material.filter((a) => a.priority === "critical");
  const rest = material.filter((a) => a.priority !== "critical");

  return (
    <div className="px-4 pb-24">
      {/* Time window selector */}
      <div className="flex items-center justify-between py-3">
        <div className="flex gap-1.5">
          {(["24h", "3d", "7d"] as TimeWindow[]).map((w) => (
            <button
              key={w}
              onClick={() => setWindow(w)}
              className={cn(
                "text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors",
                window === w
                  ? "bg-finn-accent text-finn-bg"
                  : "text-finn-textMuted hover:text-finn-textSecondary"
              )}
            >
              {w}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-finn-textMuted font-mono">
          {material.length} material · {routine.length} routine
        </p>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-finn-textMuted text-sm">
            No filings in this window.
          </p>
          <p className="text-finn-textMuted text-xs mt-1">
            Try expanding to 3d or 7d.
          </p>
        </div>
      )}

      {/* Volume alerts bar */}
      {volumeAlerts.length > 0 && filtered.length > 0 && (
        <div className="mb-4 rounded-xl bg-finn-orange/5 border border-finn-orange/15 p-3">
          <p className="text-[10px] font-semibold text-finn-orange uppercase tracking-wider mb-2">
            Unusual volume detected
          </p>
          <div className="space-y-2">
            {volumeAlerts.map((v) => (
              <div key={v.ticker} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-finn-textPrimary">
                    {v.name}
                  </span>
                  <span className="text-[10px] text-finn-orange font-mono font-semibold">
                    {v.ratio.toFixed(1)}× avg
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs font-mono font-semibold",
                    changeColor(v.changePct)
                  )}
                >
                  {v.changePct > 0 ? "+" : ""}
                  {v.changePct.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical announcements */}
      {critical.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 pulse-dot" />
            Requires attention
          </p>
          <div className="space-y-2.5">
            {critical.map((ann) => (
              <AnnouncementCard key={ann.id} ann={ann} />
            ))}
          </div>
        </div>
      )}

      {/* High / medium announcements */}
      {rest.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-finn-textMuted uppercase tracking-wider mb-2">
            Filings
          </p>
          <div className="space-y-2.5">
            {rest.map((ann) => (
              <AnnouncementCard key={ann.id} ann={ann} />
            ))}
          </div>
        </div>
      )}

      {/* Routine — collapsed by default */}
      {routine.length > 0 && (
        <div>
          <button
            onClick={() => setShowRoutine(!showRoutine)}
            className="flex items-center gap-2 text-[10px] text-finn-textMuted hover:text-finn-textSecondary transition-colors py-2"
          >
            <span className="font-semibold uppercase tracking-wider">
              {routine.length} routine filing{routine.length > 1 ? "s" : ""}
            </span>
            <span className="text-[8px]">{showRoutine ? "▲" : "▼"}</span>
          </button>
          {showRoutine && (
            <div className="mt-2 space-y-2">
              {routine.map((ann) => (
                <AnnouncementCard key={ann.id} ann={ann} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
