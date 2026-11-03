export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(n: number): string {
  if (Math.abs(n) >= 10000000) return `₹${(n / 10000000).toFixed(0)} Cr`;
  if (Math.abs(n) >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function formatVolume(v: number): string {
  if (v >= 10000000) return `${(v / 10000000).toFixed(1)} Cr`;
  if (v >= 100000) return `${(v / 100000).toFixed(1)} L`;
  return v.toLocaleString("en-IN");
}

export function timeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${Math.floor(diffHrs / 24)}d ago`;
}

export function priorityColor(priority: string): string {
  switch (priority) {
    case "critical": return "text-red-400";
    case "high": return "text-finn-orange";
    case "medium": return "text-finn-blue";
    case "low": return "text-finn-textSecondary";
    default: return "text-finn-textMuted";
  }
}

export function categoryIcon(category: string): string {
  switch (category) {
    case "results": return "📊";
    case "management_change": return "👤";
    case "M&A": return "🤝";
    case "fund_raise": return "💰";
    case "litigation": return "⚖️";
    case "insider_trading": return "📋";
    case "earnings_call": return "🎙️";
    case "credit_rating": return "⭐";
    case "dividend": return "💵";
    case "capex": return "🏭";
    case "press_release": return "📰";
    case "bonus_split": return "✂️";
    case "pledging": return "🔒";
    default: return "📄";
  }
}

export function changeColor(val: number): string {
  if (val > 0) return "text-finn-green";
  if (val < 0) return "text-finn-red";
  return "text-finn-textSecondary";
}
