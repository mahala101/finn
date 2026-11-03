"use client";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  active: "digest" | "portfolio" | "research" | "alerts";
  onNavigate: (tab: "digest" | "portfolio" | "research" | "alerts") => void;
}

const tabs = [
  { id: "digest" as const, label: "Digest", icon: "⚡" },
  { id: "portfolio" as const, label: "Portfolio", icon: "📈" },
  { id: "research" as const, label: "Research", icon: "🔍" },
  { id: "alerts" as const, label: "Alerts", icon: "🔔" },
];

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-finn-border">
      <div className="max-w-md mx-auto flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={cn(
              "flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors",
              active === tab.id
                ? "text-finn-accent"
                : "text-finn-textMuted"
            )}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-[10px] font-medium tracking-wide">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
