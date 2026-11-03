"use client";
import { portfolio } from "@/data/portfolio";
import { cn, changeColor, formatVolume } from "@/lib/utils";

export default function PortfolioView() {
  const gainers = portfolio.filter((s) => s.changePct > 0).length;
  const losers = portfolio.filter((s) => s.changePct < 0).length;

  const sorted = [...portfolio].sort(
    (a, b) => Math.abs(b.changePct) - Math.abs(a.changePct)
  );

  return (
    <div className="px-4 pb-24">
      {/* Summary strip */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-finn-green" />
          <span className="text-xs text-finn-textSecondary">
            <span className="font-semibold text-finn-green">{gainers}</span>{" "}
            advancing
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-finn-red" />
          <span className="text-xs text-finn-textSecondary">
            <span className="font-semibold text-finn-red">{losers}</span>{" "}
            declining
          </span>
        </div>
        <span className="text-[10px] text-finn-textMuted ml-auto font-mono">
          EOD · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
        </span>
      </div>

      {/* Heatmap */}
      <div className="grid grid-cols-4 gap-1.5 mb-6">
        {sorted.slice(0, 8).map((s) => (
          <div
            key={s.ticker}
            className={cn(
              "rounded-lg p-2 text-center border",
              s.changePct > 2
                ? "bg-finn-green/15 border-finn-green/20"
                : s.changePct > 0
                ? "bg-finn-green/8 border-finn-green/10"
                : s.changePct < -2
                ? "bg-finn-red/15 border-finn-red/20"
                : "bg-finn-red/8 border-finn-red/10"
            )}
          >
            <p className="text-[10px] font-semibold text-finn-textPrimary truncate">
              {s.ticker.replace(".NS", "")}
            </p>
            <p
              className={cn(
                "text-xs font-bold font-mono mt-0.5",
                changeColor(s.changePct)
              )}
            >
              {s.changePct > 0 ? "+" : ""}
              {s.changePct.toFixed(1)}%
            </p>
          </div>
        ))}
      </div>

      {/* Stock list */}
      <div className="space-y-0.5">
        {sorted.map((s) => (
          <div
            key={s.ticker}
            className="flex items-center justify-between py-3 border-b border-finn-border/50"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-semibold text-finn-textPrimary">
                  {s.ticker.replace(".NS", "")}
                </p>
                <span className="text-[10px] text-finn-textMuted px-1.5 py-0.5 bg-finn-surface rounded">
                  {s.sector}
                </span>
                {s.volume > s.avgVolume * 1.5 && (
                  <span className="text-[9px] text-finn-orange px-1 py-0.5 bg-finn-orange/10 rounded font-semibold">
                    HIGH VOL
                  </span>
                )}
              </div>
              <p className="text-[10px] text-finn-textMuted mt-0.5 truncate">
                {s.name} · Vol {formatVolume(s.volume)}
              </p>
            </div>
            <div className="text-right ml-3">
              <p className="text-[13px] font-mono font-semibold text-finn-textPrimary">
                ₹{s.price.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </p>
              <p
                className={cn(
                  "text-xs font-mono font-medium",
                  changeColor(s.changePct)
                )}
              >
                {s.changePct > 0 ? "+" : ""}
                {s.changePct.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
