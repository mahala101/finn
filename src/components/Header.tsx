"use client";

export default function Header() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <header className="sticky top-0 z-40 glass border-b border-finn-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-finn-accent">FINN</span>
          </h1>
          <p className="text-[11px] text-finn-textMuted mt-0.5 font-mono">
            {dateStr} · {timeStr} IST
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-finn-green/10 border border-finn-green/20">
            <span className="w-1.5 h-1.5 rounded-full bg-finn-green pulse-dot" />
            <span className="text-[10px] text-finn-green font-medium">
              LIVE
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
