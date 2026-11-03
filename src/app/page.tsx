"use client";
import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import DigestView from "@/components/DigestView";
import PortfolioView from "@/components/PortfolioView";
import ResearchView from "@/components/ResearchView";
import AlertsView from "@/components/AlertsView";

type Tab = "digest" | "portfolio" | "research" | "alerts";

export default function Home() {
  const [tab, setTab] = useState<Tab>("digest");

  return (
    <div className="min-h-dvh bg-finn-bg">
      <Header />
      {tab === "digest" && <DigestView />}
      {tab === "portfolio" && <PortfolioView />}
      {tab === "research" && <ResearchView />}
      {tab === "alerts" && <AlertsView />}
      <BottomNav active={tab} onNavigate={setTab} />
    </div>
  );
}
