import { NextResponse } from "next/server";
import { portfolio } from "@/data/portfolio";

export async function GET() {
  // In production: read from generated/prices.json or database
  // For demo: return static portfolio data
  return NextResponse.json({
    stocks: portfolio,
    summary: {
      total: portfolio.length,
      gainers: portfolio.filter((s) => s.changePct > 0).length,
      losers: portfolio.filter((s) => s.changePct < 0).length,
      topGainer: [...portfolio].sort((a, b) => b.changePct - a.changePct)[0],
      topLoser: [...portfolio].sort((a, b) => a.changePct - b.changePct)[0],
    },
    lastUpdated: new Date().toISOString(),
  });
}
