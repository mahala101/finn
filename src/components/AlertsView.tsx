"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AlertRule {
  id: string;
  type: "volume" | "price" | "announcement";
  label: string;
  description: string;
  enabled: boolean;
  threshold?: string;
}

const defaultRules: AlertRule[] = [
  {
    id: "vol-spike",
    type: "volume",
    label: "Volume spike",
    description: "Alert when daily volume exceeds multiple of 20-day average",
    enabled: true,
    threshold: "2.0×",
  },
  {
    id: "price-move",
    type: "price",
    label: "Large price move",
    description: "Alert when stock moves beyond threshold in a single day",
    enabled: true,
    threshold: "±3%",
  },
  {
    id: "results",
    type: "announcement",
    label: "Quarterly results",
    description: "Always alert on results filings for portfolio companies",
    enabled: true,
  },
  {
    id: "mgmt-change",
    type: "announcement",
    label: "Management changes",
    description: "CEO, CFO, MD, or director changes",
    enabled: true,
  },
  {
    id: "ma",
    type: "announcement",
    label: "M&A activity",
    description: "Acquisitions, mergers, demergers, JVs",
    enabled: true,
  },
  {
    id: "litigation",
    type: "announcement",
    label: "Litigation / regulatory",
    description: "Lawsuits, fines, regulatory orders",
    enabled: true,
  },
  {
    id: "insider",
    type: "announcement",
    label: "Insider trading",
    description: "Promoter or insider buying/selling",
    enabled: false,
  },
  {
    id: "dividend",
    type: "announcement",
    label: "Dividends",
    description: "Cash dividend declarations",
    enabled: false,
  },
  {
    id: "capex",
    type: "announcement",
    label: "Capex announcements",
    description: "New plants, facilities, capacity expansion",
    enabled: true,
  },
  {
    id: "credit",
    type: "announcement",
    label: "Credit rating changes",
    description: "Upgrades, downgrades, or reaffirmations",
    enabled: false,
  },
];

export default function AlertsView() {
  const [rules, setRules] = useState(defaultRules);

  const toggle = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const grouped = {
    "Market signals": rules.filter((r) => r.type === "volume" || r.type === "price"),
    "Announcement types": rules.filter((r) => r.type === "announcement"),
  };

  return (
    <div className="px-4 pb-24">
      <div className="py-4">
        <h2 className="text-base font-bold text-finn-textPrimary">
          Alert rules
        </h2>
        <p className="text-xs text-finn-textMuted mt-0.5">
          Configure what triggers a push notification. FINN watches your
          portfolio 24/7.
        </p>
      </div>

      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="mb-6">
          <p className="text-[10px] font-semibold text-finn-textMuted uppercase tracking-wider mb-2">
            {group}
          </p>
          <div className="space-y-1">
            {items.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between py-3 border-b border-finn-border/50"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-finn-textPrimary">
                      {rule.label}
                    </p>
                    {rule.threshold && (
                      <span className="text-[10px] font-mono text-finn-accent bg-finn-accent/10 px-1.5 py-0.5 rounded">
                        {rule.threshold}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-finn-textMuted mt-0.5">
                    {rule.description}
                  </p>
                </div>
                <button
                  onClick={() => toggle(rule.id)}
                  className={cn(
                    "w-10 h-5.5 rounded-full relative transition-colors flex-shrink-0",
                    rule.enabled ? "bg-finn-accent" : "bg-finn-border"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform shadow-sm",
                      "block w-[18px] h-[18px]",
                      rule.enabled ? "translate-x-[20px]" : "translate-x-[2px]"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-xl bg-finn-card border border-finn-border p-3.5">
        <p className="text-xs font-semibold text-finn-textPrimary mb-1">
          How alerts work
        </p>
        <p className="text-[11px] text-finn-textSecondary leading-relaxed">
          FINN scans NSE/BSE filings and end-of-day price data for your
          portfolio. When a rule triggers, the announcement appears in your
          Digest with elevated priority. Market signal thresholds are editable —
          tap the value to adjust.
        </p>
      </div>
    </div>
  );
}
