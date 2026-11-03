"use client";
import { useState } from "react";
import { Announcement } from "@/data/announcements";
import { cn, timeAgo, priorityColor, categoryIcon } from "@/lib/utils";

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    critical: "bg-red-500/15 text-red-400 border-red-500/20",
    high: "bg-finn-orange/15 text-finn-orange border-finn-orange/20",
    medium: "bg-finn-blue/15 text-finn-blue border-finn-blue/20",
    low: "bg-finn-textMuted/15 text-finn-textMuted border-finn-textMuted/20",
    routine: "bg-finn-surface text-finn-textMuted border-finn-border",
  };
  return (
    <span
      className={cn(
        "text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border",
        colors[priority] || colors.routine
      )}
    >
      {priority}
    </span>
  );
}

export default function AnnouncementCard({ ann }: { ann: Announcement }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border transition-all",
        ann.priority === "critical"
          ? "bg-red-500/5 border-red-500/15"
          : ann.priority === "high"
          ? "bg-finn-card border-finn-orange/15"
          : "bg-finn-card border-finn-border"
      )}
    >
      {/* Always visible header */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="p-3.5 cursor-pointer"
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base flex-shrink-0">
              {categoryIcon(ann.category)}
            </span>
            <span className="text-xs font-semibold text-finn-accent truncate">
              {ann.company}
            </span>
            <PriorityBadge priority={ann.priority} />
          </div>
          <span className="text-[10px] text-finn-textMuted whitespace-nowrap font-mono">
            {timeAgo(ann.timestamp)}
          </span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "text-[13px] font-semibold leading-snug mb-1.5",
            priorityColor(ann.priority)
          )}
        >
          {ann.title}
        </h3>

        {/* Summary — always visible */}
        <p className="text-xs text-finn-textSecondary leading-relaxed">
          {ann.summary}
        </p>

        {/* Expand hint */}
        <div className="flex items-center justify-between mt-2.5">
          <span className="text-[10px] text-finn-textMuted">
            {ann.source}
          </span>
          <span className="text-[10px] text-finn-accent font-medium">
            {expanded ? "Collapse ▲" : (ann.financials || ann.personInfo) ? "View details ▼" : ""}
          </span>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-3.5 pb-3.5 border-t border-finn-border/30 pt-3">
          {/* Financials table */}
          {ann.financials && (
            <div className="rounded-lg bg-finn-bg/50 border border-finn-border overflow-hidden">
              <div className="grid grid-cols-4 text-[10px] font-medium text-finn-textMuted border-b border-finn-border">
                <div className="px-2.5 py-1.5">Metric</div>
                <div className="px-2.5 py-1.5 text-right">Value</div>
                <div className="px-2.5 py-1.5 text-right">QoQ</div>
                <div className="px-2.5 py-1.5 text-right">YoY</div>
              </div>
              {ann.financials.map((f) => (
                <div
                  key={f.metric}
                  className="grid grid-cols-4 text-[11px] border-b border-finn-border/50 last:border-0"
                >
                  <div className="px-2.5 py-1.5 font-medium text-finn-textPrimary">
                    {f.metric}
                  </div>
                  <div className="px-2.5 py-1.5 text-right font-mono text-finn-textSecondary">
                    {f.current}
                  </div>
                  <div
                    className={cn(
                      "px-2.5 py-1.5 text-right font-mono",
                      f.qoq.startsWith("-") ? "text-finn-red" : "text-finn-green"
                    )}
                  >
                    {f.qoq}
                  </div>
                  <div
                    className={cn(
                      "px-2.5 py-1.5 text-right font-mono",
                      f.yoy.startsWith("-") ? "text-finn-red" : "text-finn-green"
                    )}
                  >
                    {f.yoy}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Management change — person info */}
          {ann.personInfo && (
            <div className="rounded-lg bg-finn-accent/5 border border-finn-accent/15 p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-full bg-finn-accent/20 flex items-center justify-center text-xs font-bold text-finn-accent">
                  {ann.personInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-xs font-semibold text-finn-textPrimary">
                    {ann.personInfo.name}
                  </p>
                  <p className="text-[10px] text-finn-accent">
                    {ann.personInfo.role}
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-finn-textMuted mb-1">
                Previously: {ann.personInfo.previousRole}
              </p>
              <p className="text-[11px] text-finn-textSecondary leading-relaxed">
                {ann.personInfo.background}
              </p>
            </div>
          )}

          {/* If no extra details, show a note */}
          {!ann.financials && !ann.personInfo && (
            <p className="text-[11px] text-finn-textMuted italic">
              Full filing available on BSE/NSE. FINN auto-extracts details for results and management changes.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
