import { NextResponse } from "next/server";
import { researchData } from "@/data/research";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker");

  if (!ticker) {
    // Return list of available companies
    return NextResponse.json({
      available: Object.keys(researchData).map((t) => ({
        ticker: t,
        name: researchData[t].name,
        sector: researchData[t].sector,
      })),
    });
  }

  const data = researchData[ticker];
  if (!data) {
    return NextResponse.json(
      {
        error: `No research data for ${ticker}. Available: ${Object.keys(researchData).join(", ")}`,
        hint: "In production, this would trigger an on-demand analysis using Claude + screener.in data.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    research: data,
    sources: [
      "Annual Report (screener.in)",
      "Quarterly Results (BSE/NSE filings)",
      "Earnings Call Transcripts (screener.in)",
    ],
    note: "All analysis grounded in primary sources only. No broker notes, no news, no secondary commentary.",
    lastUpdated: new Date().toISOString(),
  });
}
