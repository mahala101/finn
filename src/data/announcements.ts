export type AnnouncementCategory =
  | "results"
  | "management_change"
  | "M&A"
  | "fund_raise"
  | "litigation"
  | "insider_trading"
  | "earnings_call"
  | "credit_rating"
  | "dividend"
  | "capex"
  | "press_release"
  | "bonus_split"
  | "pledging"
  | "unclassified";

export type Priority = "critical" | "high" | "medium" | "low" | "routine";

export interface Announcement {
  id: string;
  ticker: string;
  company: string;
  category: AnnouncementCategory;
  priority: Priority;
  title: string;
  summary: string;
  detail?: string;
  timestamp: string;
  source: string;
  financials?: {
    metric: string;
    current: string;
    qoq: string;
    yoy: string;
  }[];
  personInfo?: {
    name: string;
    role: string;
    previousRole: string;
    background: string;
  };
}

// Helper: generate timestamps relative to NOW so time filtering always works
function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
}

export const announcements: Announcement[] = [
  {
    id: "ann-001",
    ticker: "BAJFINANCE.NS",
    company: "Bajaj Finance",
    category: "results",
    priority: "critical",
    title: "Q2 FY27 Results: PAT misses estimates by 12%",
    summary: "Net profit at ₹3,842 Cr vs ₹4,368 Cr expected. NII growth slowed to 14% YoY from 22% in Q1. Management flagged higher credit costs in unsecured lending.",
    timestamp: hoursAgo(3),
    source: "BSE Filing",
    financials: [
      { metric: "Revenue", current: "₹16,240 Cr", qoq: "+4.2%", yoy: "+18.6%" },
      { metric: "EBITDA", current: "₹8,120 Cr", qoq: "-2.1%", yoy: "+11.4%" },
      { metric: "PBT", current: "₹5,128 Cr", qoq: "-6.8%", yoy: "+8.2%" },
      { metric: "PAT", current: "₹3,842 Cr", qoq: "-8.4%", yoy: "+5.6%" },
    ],
  },
  {
    id: "ann-002",
    ticker: "RELIANCE.NS",
    company: "Reliance Industries",
    category: "management_change",
    priority: "critical",
    title: "CFO transition: Alok Agarwal steps down, Anshuman Thakur appointed",
    summary: "Board approved the appointment of Anshuman Thakur as new Group CFO effective Jan 1, 2027. Alok Agarwal transitions to advisory role after 18 years.",
    timestamp: hoursAgo(5),
    source: "NSE Filing",
    personInfo: {
      name: "Anshuman Thakur",
      role: "Group CFO, Reliance Industries",
      previousRole: "Head of Strategy, Jio Platforms (2019–2026)",
      background: "IIT Delhi + Wharton MBA. Led Jio's fundraise of $22B from global investors including Google, Facebook, and KKR. Previously with Goldman Sachs (London) for 8 years in TMT advisory.",
    },
  },
  {
    id: "ann-003",
    ticker: "ADANIPORTS.NS",
    company: "Adani Ports",
    category: "press_release",
    priority: "high",
    title: "Awarded ₹12,400 Cr concession for Colombo West Terminal",
    summary: "40-year concession to develop and operate Colombo West International Container Terminal. Expected throughput of 3.5M TEUs by FY32. Funded through internal accruals + project finance.",
    timestamp: hoursAgo(8),
    source: "NSE Filing",
  },
  {
    id: "ann-004",
    ticker: "ZOMATO.NS",
    company: "Zomato",
    category: "results",
    priority: "high",
    title: "Q2 FY27 Results: First full-year profitability in sight",
    summary: "Adjusted EBITDA at ₹410 Cr, third consecutive profitable quarter. Blinkit GOV grew 82% YoY. Food delivery GOV grew 24% YoY. Management guided for 20-25% GOV growth in H2.",
    timestamp: hoursAgo(2),
    source: "BSE Filing",
    financials: [
      { metric: "Revenue", current: "₹4,690 Cr", qoq: "+12.8%", yoy: "+62.4%" },
      { metric: "EBITDA", current: "₹410 Cr", qoq: "+38.2%", yoy: "Loss→Profit" },
      { metric: "PBT", current: "₹284 Cr", qoq: "+42.1%", yoy: "Loss→Profit" },
      { metric: "PAT", current: "₹248 Cr", qoq: "+35.6%", yoy: "Loss→Profit" },
    ],
  },
  {
    id: "ann-005",
    ticker: "TATAMOTORS.NS",
    company: "Tata Motors",
    category: "capex",
    priority: "high",
    title: "Board approves ₹7,500 Cr EV manufacturing facility in Tamil Nadu",
    summary: "New dedicated EV platform plant in Hosur with 250,000 units/year capacity. Production to begin Q3 FY28. Will produce vehicles on the Gen-3 architecture across Tata and JLR brands.",
    timestamp: hoursAgo(6),
    source: "BSE Filing",
  },
  {
    id: "ann-006",
    ticker: "ICICIBANK.NS",
    company: "ICICI Bank",
    category: "insider_trading",
    priority: "medium",
    title: "MD & CEO acquired 50,000 shares via ESOP exercise",
    summary: "Sandeep Bakhshi exercised 50,000 stock options at ₹620/share. Post-transaction holding: 2,14,000 shares. No shares sold.",
    timestamp: hoursAgo(10),
    source: "NSE Filing",
  },
  {
    id: "ann-007",
    ticker: "SUNPHARMA.NS",
    company: "Sun Pharma",
    category: "M&A",
    priority: "high",
    title: "Acquires US-based Concert Pharma for $1.2B",
    summary: "All-cash deal for Concert Pharmaceuticals' dermatology pipeline. Lead asset CTP-543 (alopecia areata) in Phase 3. Funded through internal cash + $400M term loan. Accretive to EPS from FY28.",
    timestamp: hoursAgo(14),
    source: "NSE Filing",
  },
  {
    id: "ann-008",
    ticker: "TCS.NS",
    company: "TCS",
    category: "earnings_call",
    priority: "medium",
    title: "Q2 FY27 earnings call transcript available",
    summary: "Key themes: BFSI recovery stronger than expected, GenAI deal TCV at $900M cumulative. Attrition down to 12.1%. Management expects demand improvement in H2 led by North America.",
    timestamp: hoursAgo(12),
    source: "NSE Filing",
  },
  {
    id: "ann-009",
    ticker: "ITC.NS",
    company: "ITC",
    category: "dividend",
    priority: "medium",
    title: "Interim dividend of ₹6.50/share declared",
    summary: "Record date: November 18, 2026. Dividend yield at current price: ~1.3%. Payout consistent with company's policy of returning 80-85% of PAT.",
    timestamp: hoursAgo(7),
    source: "BSE Filing",
  },
  {
    id: "ann-010",
    ticker: "MARUTI.NS",
    company: "Maruti Suzuki",
    category: "press_release",
    priority: "medium",
    title: "October sales: Total volume at 1,82,400 units, +8% YoY",
    summary: "Domestic PV sales 1,56,800 (+6% YoY). Exports 25,600 (+22% YoY). SUV mix at 52% vs 47% in Oct-25. New Brezza EV bookings crossed 12,000 in first week.",
    timestamp: hoursAgo(30),
    source: "BSE Filing",
  },
  {
    id: "ann-011",
    ticker: "HDFCBANK.NS",
    company: "HDFC Bank",
    category: "credit_rating",
    priority: "low",
    title: "CRISIL reaffirms AAA/Stable on long-term instruments",
    summary: "Rating reflects strong capitalisation, diversified loan book, and healthy asset quality. Outlook stable.",
    timestamp: hoursAgo(36),
    source: "NSE Filing",
  },
  {
    id: "ann-012",
    ticker: "LT.NS",
    company: "L&T",
    category: "press_release",
    priority: "medium",
    title: "Wins ₹8,200 Cr order for Bullet Train civil works (Package C5)",
    summary: "Mumbai-Ahmedabad High Speed Rail corridor, civil & structural works for 48km stretch. To be completed in 42 months. Total order inflow YTD: ₹1,12,000 Cr (+18% YoY).",
    timestamp: hoursAgo(32),
    source: "BSE Filing",
  },
  {
    id: "ann-013",
    ticker: "WIPRO.NS",
    company: "Wipro",
    category: "unclassified",
    priority: "routine",
    title: "ESOP allotment: 1,24,000 shares under ESOP 2019 plan",
    summary: "Routine allotment under employee stock option plan. Total dilution: negligible.",
    timestamp: hoursAgo(40),
    source: "BSE Filing",
  },
  {
    id: "ann-014",
    ticker: "JSWSTEEL.NS",
    company: "JSW Steel",
    category: "results",
    priority: "high",
    title: "Q2 FY27 Results: EBITDA/ton rebounds sharply to ₹12,400",
    summary: "Best quarterly EBITDA/ton in 6 quarters, driven by coking coal cost decline and better product mix. Crude steel production at 7.1 MT (+14% YoY). Debt reduced by ₹2,800 Cr QoQ.",
    timestamp: hoursAgo(26),
    source: "BSE Filing",
    financials: [
      { metric: "Revenue", current: "₹42,680 Cr", qoq: "+8.4%", yoy: "+22.1%" },
      { metric: "EBITDA", current: "₹8,804 Cr", qoq: "+24.6%", yoy: "+48.2%" },
      { metric: "PBT", current: "₹5,240 Cr", qoq: "+32.4%", yoy: "+68.4%" },
      { metric: "PAT", current: "₹3,920 Cr", qoq: "+28.8%", yoy: "+56.2%" },
    ],
  },
  {
    id: "ann-015",
    ticker: "INFY.NS",
    company: "Infosys",
    category: "litigation",
    priority: "medium",
    title: "GST demand notice of ₹3,280 Cr for FY20–FY23",
    summary: "DGGI issued show cause notice for alleged short-payment of IGST on software services. Company believes the demand is unsustainable and will contest. No provision created.",
    timestamp: hoursAgo(9),
    source: "NSE Filing",
  },
];

export const volumeAlerts = [
  { ticker: "BAJFINANCE.NS", name: "Bajaj Finance", volume: 4200000, avgVolume: 1800000, ratio: 2.33, price: 7142.60, changePct: -2.14 },
  { ticker: "ADANIPORTS.NS", name: "Adani Ports", volume: 9800000, avgVolume: 4200000, ratio: 2.33, price: 1345.20, changePct: 4.41 },
  { ticker: "JSWSTEEL.NS", name: "JSW Steel", volume: 7800000, avgVolume: 3900000, ratio: 2.0, price: 978.40, changePct: 3.45 },
  { ticker: "ZOMATO.NS", name: "Zomato", volume: 32000000, avgVolume: 18000000, ratio: 1.78, price: 284.60, changePct: 3.04 },
];
