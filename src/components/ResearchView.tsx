"use client";
import { useState } from "react";
import { researchData, CompanyResearch } from "@/data/research";
import { cn } from "@/lib/utils";

type ResearchTab = "overview" | "narrative" | "bull_bear" | "cash";

function CompanyPicker({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (t: string) => void;
}) {
  const companies = Object.values(researchData);
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {companies.map((c) => (
        <button
          key={c.ticker}
          onClick={() => onSelect(c.ticker)}
          className={cn(
            "flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors",
            selected === c.ticker
              ? "bg-finn-accent text-finn-bg border-finn-accent"
              : "bg-finn-card text-finn-textSecondary border-finn-border hover:border-finn-accent/40"
          )}
        >
          {c.ticker.replace(".NS", "")}
        </button>
      ))}
      <button className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium border border-dashed border-finn-border text-finn-textMuted">
        + Search any ticker
      </button>
    </div>
  );
}

function OverviewTab({ data }: { data: CompanyResearch }) {
  return (
    <div className="space-y-4">
      {/* Business snapshot */}
      <div>
        <h3 className="text-xs font-semibold text-finn-accent mb-2">
          Business Snapshot
        </h3>
        <p className="text-xs text-finn-textSecondary leading-relaxed">
          {data.snapshot.description}
        </p>
        <div className="mt-3 flex gap-2 flex-wrap">
          {data.snapshot.segments.map((s) => (
            <div
              key={s.name}
              className="bg-finn-surface rounded-lg px-2.5 py-1.5 border border-finn-border"
            >
              <p className="text-[10px] text-finn-textMuted">{s.name}</p>
              <p className="text-xs font-semibold text-finn-textPrimary font-mono">
                {s.revenuePct}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Key ratios */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Market Cap", value: data.snapshot.marketCap },
          { label: "P/E", value: `${data.snapshot.peRatio}x` },
          { label: "ROCE", value: `${data.snapshot.roce}%` },
        ].map((r) => (
          <div
            key={r.label}
            className="bg-finn-surface rounded-lg p-2.5 border border-finn-border text-center"
          >
            <p className="text-[10px] text-finn-textMuted">{r.label}</p>
            <p className="text-sm font-bold text-finn-textPrimary font-mono mt-0.5">
              {r.value}
            </p>
          </div>
        ))}
      </div>

      {/* Financial trajectory */}
      <div>
        <h3 className="text-xs font-semibold text-finn-accent mb-2">
          Financial Trajectory
        </h3>
        <div className="rounded-lg bg-finn-bg/50 border border-finn-border overflow-hidden">
          <div className="grid grid-cols-5 text-[9px] font-medium text-finn-textMuted border-b border-finn-border">
            <div className="px-2 py-1.5">Year</div>
            <div className="px-2 py-1.5 text-right">Revenue</div>
            <div className="px-2 py-1.5 text-right">EBITDA</div>
            <div className="px-2 py-1.5 text-right">PAT</div>
            <div className="px-2 py-1.5 text-right">Margin</div>
          </div>
          {data.financials.map((f) => (
            <div
              key={f.year}
              className="grid grid-cols-5 text-[10px] border-b border-finn-border/50 last:border-0"
            >
              <div className="px-2 py-1.5 font-semibold text-finn-textPrimary">
                {f.year}
              </div>
              <div className="px-2 py-1.5 text-right font-mono text-finn-textSecondary">
                {f.revenue >= 100000
                  ? `${(f.revenue / 100).toFixed(0)}K`
                  : f.revenue.toLocaleString()}
              </div>
              <div
                className={cn(
                  "px-2 py-1.5 text-right font-mono",
                  f.ebitda < 0 ? "text-finn-red" : "text-finn-green"
                )}
              >
                {f.ebitda >= 100000
                  ? `${(f.ebitda / 100).toFixed(0)}K`
                  : f.ebitda.toLocaleString()}
              </div>
              <div
                className={cn(
                  "px-2 py-1.5 text-right font-mono",
                  f.pat < 0 ? "text-finn-red" : "text-finn-green"
                )}
              >
                {f.pat >= 100000
                  ? `${(f.pat / 100).toFixed(0)}K`
                  : f.pat.toLocaleString()}
              </div>
              <div
                className={cn(
                  "px-2 py-1.5 text-right font-mono",
                  f.ebitdaMargin < 0 ? "text-finn-red" : "text-finn-textSecondary"
                )}
              >
                {f.ebitdaMargin.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-finn-textMuted mt-1">
          Revenue, EBITDA, PAT in ₹ Cr. Source: Annual Reports, screener.in
        </p>
      </div>

      {/* Management guidance */}
      <div>
        <h3 className="text-xs font-semibold text-finn-accent mb-2">
          Management Guidance
        </h3>
        <div className="space-y-1.5">
          {data.managementGuidance.map((g, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-finn-accent text-xs mt-0.5">→</span>
              <p className="text-[11px] text-finn-textSecondary leading-relaxed">
                {g}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NarrativeTab({ data }: { data: CompanyResearch }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-finn-accent/5 border border-finn-accent/15 p-3">
        <p className="text-[11px] text-finn-textSecondary leading-relaxed">
          What management promised each quarter vs. what the numbers actually
          delivered. This is the difference between summarising management and
          analysing them.
        </p>
      </div>

      {data.narrativeVsNumbers.map((n, i) => (
        <div
          key={i}
          className="rounded-xl border border-finn-border bg-finn-card p-3.5"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-finn-textPrimary">
              {n.quarter}
            </span>
            <span
              className={cn(
                "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                n.verdict === "exceeded"
                  ? "bg-finn-green/15 text-finn-green"
                  : n.verdict === "delivered"
                  ? "bg-finn-blue/15 text-finn-blue"
                  : "bg-finn-red/15 text-finn-red"
              )}
            >
              {n.verdict}
            </span>
          </div>

          <div className="space-y-2.5">
            <div>
              <p className="text-[9px] font-semibold text-finn-textMuted uppercase tracking-wider mb-1">
                What they said
              </p>
              <p className="text-[11px] text-finn-textSecondary leading-relaxed">
                {n.guidance}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold text-finn-textMuted uppercase tracking-wider mb-1">
                What happened
              </p>
              <p className="text-[11px] text-finn-textSecondary leading-relaxed">
                {n.actual}
              </p>
            </div>

            <div className="border-t border-finn-border pt-2.5">
              <p className="text-[9px] font-semibold text-finn-accent uppercase tracking-wider mb-1">
                FINN&apos;s read
              </p>
              <p className="text-[11px] text-finn-textPrimary leading-relaxed">
                {n.detail}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BullBearTab({ data }: { data: CompanyResearch }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-finn-green" />
          <h3 className="text-xs font-semibold text-finn-green">Bull Case</h3>
        </div>
        <div className="space-y-2.5">
          {data.bullCase.map((b, i) => (
            <div
              key={i}
              className="rounded-lg bg-finn-green/5 border border-finn-green/10 p-3"
            >
              <p className="text-[11px] text-finn-textSecondary leading-relaxed">
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-finn-red" />
          <h3 className="text-xs font-semibold text-finn-red">Bear Case</h3>
        </div>
        <div className="space-y-2.5">
          {data.bearCase.map((b, i) => (
            <div
              key={i}
              className="rounded-lg bg-finn-red/5 border border-finn-red/10 p-3"
            >
              <p className="text-[11px] text-finn-textSecondary leading-relaxed">
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CashTab({ data }: { data: CompanyResearch }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-finn-accent">
        Cash Quality — Do profits turn into cash?
      </h3>

      <div className="rounded-lg bg-finn-bg/50 border border-finn-border overflow-hidden">
        <div className="grid grid-cols-5 text-[9px] font-medium text-finn-textMuted border-b border-finn-border">
          <div className="px-2 py-1.5">Year</div>
          <div className="px-2 py-1.5 text-right">PAT</div>
          <div className="px-2 py-1.5 text-right">CFO</div>
          <div className="px-2 py-1.5 text-right">FCF</div>
          <div className="px-2 py-1.5 text-right">Conv %</div>
        </div>
        {data.cashQuality.map((c) => (
          <div
            key={c.year}
            className="grid grid-cols-5 text-[10px] border-b border-finn-border/50 last:border-0"
          >
            <div className="px-2 py-1.5 font-semibold text-finn-textPrimary">
              {c.year}
            </div>
            <div
              className={cn(
                "px-2 py-1.5 text-right font-mono",
                c.pat < 0 ? "text-finn-red" : "text-finn-textSecondary"
              )}
            >
              {c.pat.toLocaleString()}
            </div>
            <div
              className={cn(
                "px-2 py-1.5 text-right font-mono",
                c.cfo < 0 ? "text-finn-red" : "text-finn-green"
              )}
            >
              {c.cfo.toLocaleString()}
            </div>
            <div
              className={cn(
                "px-2 py-1.5 text-right font-mono",
                c.fcf < 0 ? "text-finn-red" : "text-finn-green"
              )}
            >
              {c.fcf.toLocaleString()}
            </div>
            <div
              className={cn(
                "px-2 py-1.5 text-right font-mono font-semibold",
                c.cashConversion > 100
                  ? "text-finn-green"
                  : c.cashConversion > 60
                  ? "text-finn-textSecondary"
                  : "text-finn-red"
              )}
            >
              {c.cashConversion}%
            </div>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-finn-textMuted">
        CFO = Cash from Operations. FCF = Free Cash Flow. Conv % = CFO / PAT.
        Values in ₹ Cr. Over 100% means the business generates more cash than
        accounting profit suggests.
      </p>
    </div>
  );
}

export default function ResearchView() {
  const [selected, setSelected] = useState("ZOMATO.NS");
  const [tab, setTab] = useState<ResearchTab>("narrative");

  const data = researchData[selected];
  if (!data) return null;

  const tabs: { id: ResearchTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "narrative", label: "Narrative vs Numbers" },
    { id: "bull_bear", label: "Bull / Bear" },
    { id: "cash", label: "Cash Quality" },
  ];

  return (
    <div className="px-4 pb-24">
      <div className="py-3">
        <CompanyPicker selected={selected} onSelect={setSelected} />
      </div>

      {/* Company header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-finn-textPrimary">
          {data.name}
        </h2>
        <p className="text-xs text-finn-textMuted">{data.sector}</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto pb-3 scrollbar-hide mb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap",
              tab === t.id
                ? "bg-finn-accent text-finn-bg"
                : "text-finn-textMuted hover:text-finn-textSecondary"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "overview" && <OverviewTab data={data} />}
      {tab === "narrative" && <NarrativeTab data={data} />}
      {tab === "bull_bear" && <BullBearTab data={data} />}
      {tab === "cash" && <CashTab data={data} />}
    </div>
  );
}
