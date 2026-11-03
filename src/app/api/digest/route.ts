import { NextResponse } from "next/server";
import { announcements, volumeAlerts } from "@/data/announcements";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const window = searchParams.get("window") || "24h";
  const category = searchParams.get("category");

  let filtered = [...announcements];

  // Filter by category if specified
  if (category && category !== "all") {
    filtered = filtered.filter((a) => a.category === category);
  }

  // Sort by priority then timestamp
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3, routine: 4 };
  filtered.sort((a, b) => {
    const pDiff =
      (priorityOrder[a.priority] ?? 5) - (priorityOrder[b.priority] ?? 5);
    if (pDiff !== 0) return pDiff;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return NextResponse.json({
    announcements: filtered,
    volumeAlerts,
    meta: {
      total: filtered.length,
      material: filtered.filter((a) => a.priority !== "routine").length,
      routine: filtered.filter((a) => a.priority === "routine").length,
      window,
    },
    lastUpdated: new Date().toISOString(),
  });
}
