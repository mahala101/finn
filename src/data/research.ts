export interface CompanyResearch {
  ticker: string;
  name: string;
  sector: string;
  snapshot: {
    description: string;
    segments: { name: string; revenuePct: number }[];
    marketCap: string;
    peRatio: number;
    roce: number;
  };
  financials: {
    year: string;
    revenue: number;
    ebitda: number;
    pat: number;
    ebitdaMargin: number;
    roe: number;
    debtToEquity: number;
  }[];
  narrativeVsNumbers: {
    quarter: string;
    guidance: string;
    actual: string;
    verdict: "delivered" | "missed" | "exceeded";
    detail: string;
  }[];
  bullCase: string[];
  bearCase: string[];
  managementGuidance: string[];
  cashQuality: {
    year: string;
    pat: number;
    cfo: number;
    fcf: number;
    cashConversion: number;
  }[];
}

export const researchData: Record<string, CompanyResearch> = {
  "ZOMATO.NS": {
    ticker: "ZOMATO.NS",
    name: "Zomato",
    sector: "Internet / Quick Commerce",
    snapshot: {
      description: "India's largest food-delivery platform, expanding aggressively into quick commerce (Blinkit) and going-out (District). Two-sided marketplace connecting restaurants, delivery partners, and consumers.",
      segments: [
        { name: "Food Delivery", revenuePct: 52 },
        { name: "Blinkit (Quick Commerce)", revenuePct: 34 },
        { name: "Going Out / Hyperpure", revenuePct: 14 },
      ],
      marketCap: "2.5L Cr",
      peRatio: 252,
      roce: 3.8,
    },
    financials: [
      { year: "FY24", revenue: 12114, ebitda: -340, pat: -611, ebitdaMargin: -2.8, roe: -4.2, debtToEquity: 0 },
      { year: "FY25", revenue: 15670, ebitda: 480, pat: 351, ebitdaMargin: 3.1, roe: 2.1, debtToEquity: 0 },
      { year: "FY26", revenue: 19840, ebitda: 1620, pat: 890, ebitdaMargin: 8.2, roe: 4.8, debtToEquity: 0 },
      { year: "FY27E", revenue: 24200, ebitda: 2800, pat: 1680, ebitdaMargin: 11.6, roe: 8.2, debtToEquity: 0 },
    ],
    narrativeVsNumbers: [
      {
        quarter: "Q1 FY26",
        guidance: "Mgmt guided for Blinkit store count to reach 1,000 by Mar-26, with GOV growth of 70%+ and path to store-level breakeven.",
        actual: "Blinkit reached 639 stores (vs 1,000 target). GOV grew 68% YoY. Store-level EBITDA turned positive for mature stores only.",
        verdict: "missed",
        detail: "Store expansion significantly behind promise — 639 vs 1,000 guided. However, GOV growth was nearly on target and store-level economics improved. Classic case of over-promising on expansion velocity but delivering on unit economics. Net read: mixed — the right things are improving but timeline is unreliable.",
      },
      {
        quarter: "Q2 FY26",
        guidance: "Guided for food delivery to maintain 20%+ GOV growth with stable take rates. Blinkit store count target softened to '800 by Mar-26'.",
        actual: "Food delivery GOV grew 22% YoY. Take rates improved 30bps. Blinkit added 110 stores in Q2, run-rate still below revised target.",
        verdict: "delivered",
        detail: "Food delivery guidance was met cleanly — both growth and take rates delivered. Blinkit store count pace improved but remains behind even the revised target. Management now framing Blinkit as 'quality over speed' which reads as a narrative shift to match the slower reality.",
      },
      {
        quarter: "Q3 FY26",
        guidance: "Company-level adjusted EBITDA breakeven by Q4 FY26. Blinkit AOV expansion into electronics, home categories.",
        actual: "Adjusted EBITDA at ₹120 Cr — breakeven achieved one quarter early. Blinkit electronics category launched in 8 cities. AOV for electronics orders 4x food delivery.",
        verdict: "exceeded",
        detail: "Profitability milestone hit ahead of schedule — credibility boost. Blinkit category expansion is working, AOV uplift is real. First quarter where management's execution matched the ambition. This inflection point changed the stock's narrative from 'cash burner' to 'emerging platform'.",
      },
      {
        quarter: "Q4 FY26",
        guidance: "FY27 guidance: consolidated EBITDA margins of 6-8%. Blinkit to reach 1,000 stores by Sep-26. Food delivery GOV growth of 20-25%.",
        actual: "Q4 EBITDA margin at 9.1% — above full-year guide. Blinkit at 826 stores by Mar-26. Full-year GOV growth 23%.",
        verdict: "delivered",
        detail: "Margins ahead of guide, GOV within range. The persistent miss is Blinkit store count — now delayed for the fourth consecutive quarter. But the market has stopped punishing this because per-store economics are clearly improving. Management has learned to under-promise on store count — a maturation signal.",
      },
    ],
    bullCase: [
      "Blinkit is building India's first real quick-commerce infrastructure — network effects compound as density increases. Category expansion into electronics/home pushes AOV and margins higher.",
      "Food delivery is now a profitable, cash-generating engine funding Blinkit's expansion. The combined platform has no true peer in India.",
      "Path to 15%+ EBITDA margins visible by FY28 as Blinkit matures and going-out segment scales. Current valuation prices in growth but not margin expansion.",
      "Management has shown ability to pivot from growth-at-all-cost to disciplined execution — a rare trait in Indian consumer internet.",
    ],
    bearCase: [
      "Valuation at 250x PE requires flawless execution for years. Any slip in growth or margins will be punished severely.",
      "Quick commerce is a capital-intensive, low-moat business. Swiggy Instamart and Reliance-backed JioMart are scaling fast with deeper pockets.",
      "Food delivery take rates near ceiling — further monetization risks alienating restaurants. Regulatory risk on gig-worker classification.",
      "Blinkit store-count promises have been missed 4 quarters running. If unit economics don't hold as they expand to tier-2, the model breaks.",
    ],
    managementGuidance: [
      "FY27 consolidated EBITDA margin target: 6-8% (already tracking above at 9%+)",
      "Blinkit: 1,200 stores by Mar-27, breakeven at contribution level by Q2 FY27",
      "Food delivery: 20-25% GOV growth, stable take rates",
      "Capex: ₹1,500-2,000 Cr (dark stores + warehouse infra)",
      "District (going-out): monetization experiments in H2 FY27",
    ],
    cashQuality: [
      { year: "FY24", pat: -611, cfo: -280, fcf: -720, cashConversion: 46 },
      { year: "FY25", pat: 351, cfo: 580, fcf: 120, cashConversion: 165 },
      { year: "FY26", pat: 890, cfo: 1420, fcf: 680, cashConversion: 160 },
    ],
  },
  "RELIANCE.NS": {
    ticker: "RELIANCE.NS",
    name: "Reliance Industries",
    sector: "Conglomerate",
    snapshot: {
      description: "India's largest private enterprise. Operates across O2C (refining + petrochemicals), Digital (Jio), Retail, and new energy. Transitioning from fossil fuels to digital + green energy platform.",
      segments: [
        { name: "O2C (Refining + Petchem)", revenuePct: 54 },
        { name: "Digital (Jio)", revenuePct: 18 },
        { name: "Retail", revenuePct: 24 },
        { name: "New Energy + Others", revenuePct: 4 },
      ],
      marketCap: "19.8L Cr",
      peRatio: 28.4,
      roce: 11.2,
    },
    financials: [
      { year: "FY24", revenue: 966780, ebitda: 178420, pat: 79020, ebitdaMargin: 18.4, roe: 9.4, debtToEquity: 0.34 },
      { year: "FY25", revenue: 1012400, ebitda: 192600, pat: 81200, ebitdaMargin: 19.0, roe: 9.1, debtToEquity: 0.32 },
      { year: "FY26", revenue: 1086200, ebitda: 214800, pat: 92400, ebitdaMargin: 19.8, roe: 9.8, debtToEquity: 0.28 },
      { year: "FY27E", revenue: 1148000, ebitda: 236000, pat: 104000, ebitdaMargin: 20.6, roe: 10.4, debtToEquity: 0.24 },
    ],
    narrativeVsNumbers: [
      {
        quarter: "Q1 FY26",
        guidance: "Jio ARPU to reach ₹200 by FY26 end (from ₹182). Retail EBITDA margins to expand 200bps. New energy capex of ₹75,000 Cr over 3 years.",
        actual: "Jio ARPU at ₹189 after July tariff hike — on track. Retail EBITDA margin flat at 7.8%. New energy spend of ₹4,200 Cr in Q1.",
        verdict: "missed",
        detail: "Jio ARPU moving in right direction but Retail margin expansion hasn't started despite repeated promises. New energy capex run-rate well below the ₹25,000 Cr/year implied by guidance. The Jio story delivers; Retail and New Energy are where narrative outruns execution.",
      },
      {
        quarter: "Q2 FY26",
        guidance: "Jio subscriber additions to accelerate post tariff hike churn stabilization. Retail store expansion to continue at 3,000+ stores/quarter.",
        actual: "Jio net adds turned positive at 8.2M (vs 2.1M loss in Q1). Retail added 1,200 stores — well below 3,000 target. O2C margins beat on favorable cracks.",
        verdict: "missed",
        detail: "Jio's subscriber recovery was faster than expected — a genuine positive. But Retail store expansion is chronically behind target. Management's habit of guiding aggressively on Retail then delivering modestly suggests either operational bottlenecks or deliberate over-commitment for narrative purposes.",
      },
      {
        quarter: "Q3 FY26",
        guidance: "Jio IPO 'process initiated' — listing expected within 18 months. Retail restructuring to separate fashion, grocery, electronics into distinct entities for 'value unlock'.",
        actual: "No concrete IPO filing. Retail restructuring announced but timeline vague — 'over the coming quarters'. O2C EBITDA up 12% QoQ on petchem recovery.",
        verdict: "missed",
        detail: "This is where Reliance's narrative management is most visible. 'Process initiated' and 'over the coming quarters' are classic non-commitments that generate headlines without accountability. O2C remains the quiet workhorse that bails out the story every quarter. The market has learned to discount Reliance timelines by 12-18 months.",
      },
      {
        quarter: "Q4 FY26",
        guidance: "FY27 capex of ₹52,000 Cr. Jio to launch satellite broadband in H1 FY27. New energy: 10 GW solar cell manufacturing online by FY28.",
        actual: "Full year EBITDA growth of 12% — in line. Jio ARPU hit ₹203. Retail margins improved to 8.2% (vs 8.0% target). Satellite broadband regulatory approval pending.",
        verdict: "delivered",
        detail: "FY26 closed on a strong note. Jio ARPU target met — the one consistent deliverer. Retail margins marginally improved, not the step-change promised. Satellite broadband delayed by regulation, not execution. Overall: Reliance delivers at the aggregate level but specific segment timelines are persistently aspirational.",
      },
    ],
    bullCase: [
      "India's only integrated digital + energy platform. Jio's 480M subscribers create distribution for every new business — financial services, commerce, entertainment.",
      "New energy (solar + battery + green hydrogen) positions Reliance for the next decade. ₹75,000 Cr committed capex creates an optionality most investors aren't pricing.",
      "O2C business throws off massive cash flow that self-funds the transition. Debt is rapidly declining. Jio + Retail value unlocking through potential IPOs.",
      "Management track record of building category-defining businesses from scratch (Jio from zero to 480M in 7 years).",
    ],
    bearCase: [
      "Capital allocation concentration risk — one family, one decision-maker for ₹20L Cr of market cap. Succession clarity still evolving.",
      "Retail has underperformed promises for 3 years running. Store-level economics are opaque and margins remain well below quick-commerce peers.",
      "New energy is a capital-heavy bet where execution is unproven. Solar manufacturing faces Chinese competition; green hydrogen is pre-revenue.",
      "At 28x PE, the stock prices in a lot of optionality. Any delay in Jio IPO or new energy ramp is a derating catalyst.",
    ],
    managementGuidance: [
      "FY27 capex: ₹52,000 Cr (50% digital, 30% new energy, 20% O2C)",
      "Jio: ARPU target ₹220+ by FY27 end; satellite broadband launch H1 FY27",
      "Retail: 2,500-3,000 stores/quarter; EBITDA margin target 9%+",
      "New energy: 10 GW solar cell capacity by FY28; green hydrogen pilot by Q4 FY27",
      "Leverage: Net debt/EBITDA below 1x by FY27",
    ],
    cashQuality: [
      { year: "FY24", pat: 79020, cfo: 112400, fcf: 64200, cashConversion: 142 },
      { year: "FY25", pat: 81200, cfo: 118600, fcf: 58400, cashConversion: 146 },
      { year: "FY26", pat: 92400, cfo: 132800, fcf: 62400, cashConversion: 144 },
    ],
  },
  "BAJFINANCE.NS": {
    ticker: "BAJFINANCE.NS",
    name: "Bajaj Finance",
    sector: "NBFC",
    snapshot: {
      description: "India's largest non-bank consumer lender. Runs a high-velocity, tech-driven lending machine across consumer durables, personal loans, home loans, SME, and increasingly digital/app-first products.",
      segments: [
        { name: "Consumer Lending", revenuePct: 38 },
        { name: "SME Lending", revenuePct: 22 },
        { name: "Mortgages", revenuePct: 18 },
        { name: "Rural / Gold / Auto", revenuePct: 12 },
        { name: "Digital & Others", revenuePct: 10 },
      ],
      marketCap: "4.4L Cr",
      peRatio: 32.6,
      roce: 14.8,
    },
    financials: [
      { year: "FY24", revenue: 52480, ebitda: 28200, pat: 14840, ebitdaMargin: 53.7, roe: 22.4, debtToEquity: 3.2 },
      { year: "FY25", revenue: 61200, ebitda: 32800, pat: 16200, ebitdaMargin: 53.6, roe: 21.8, debtToEquity: 3.4 },
      { year: "FY26", revenue: 68400, ebitda: 34600, pat: 16800, ebitdaMargin: 50.6, roe: 20.2, debtToEquity: 3.5 },
      { year: "FY27E", revenue: 74200, ebitda: 36400, pat: 17400, ebitdaMargin: 49.1, roe: 19.4, debtToEquity: 3.6 },
    ],
    narrativeVsNumbers: [
      {
        quarter: "Q1 FY26",
        guidance: "AUM growth of 28-30% for FY26. Credit costs to normalize at 1.7-1.8%. New verticals (auto, tractor) to contribute 5% of AUM by FY26 end.",
        actual: "AUM grew 32% YoY — ahead of guide. Credit costs at 1.62% — better than guide. Auto/tractor AUM at 2.8% — behind target.",
        verdict: "exceeded",
        detail: "Core lending machine is humming — AUM and credit costs both better than guided. New verticals are slower to scale but not alarming. This was peak confidence quarter — stock hit all-time highs.",
      },
      {
        quarter: "Q2 FY26",
        guidance: "Maintained 28-30% AUM growth. Unsecured book growth to moderate to 25% (from 38% in FY25). App-first strategy to drive 60% of new loans via digital channels.",
        actual: "AUM grew 29% — in line. Unsecured book actually grew 34%, not the guided 25%. Digital origination at 52% vs 60% target. First uptick in Stage 2 assets.",
        verdict: "missed",
        detail: "The unsecured loan growth overshooting guidance by 900bps is a red flag — management either couldn't or wouldn't slow it down. The Stage 2 uptick is early-cycle stress. When management says they'll moderate unsecured but don't, it suggests the growth machine is harder to control than they claim.",
      },
      {
        quarter: "Q3 FY26",
        guidance: "Acknowledged rising stress in personal loans and e-commerce EMI cards. Guided credit costs for FY26 at 1.8-1.9% (up from 1.7-1.8%).",
        actual: "Credit costs hit 2.1% — above revised guide. GNPAs up 22bps QoQ. Personal loan book growth deliberately slowed to 18% YoY (from 34%).",
        verdict: "missed",
        detail: "This is where the Q2 unsecured overshoot comes home. Credit costs above even the revised guide means the stress was deeper than management admitted last quarter. The deliberate PL growth slowdown confirms they were running too hot. Positive: they're now actively course-correcting, but confidence in forward guidance takes a hit.",
      },
      {
        quarter: "Q4 FY26",
        guidance: "FY27 AUM growth moderated to 23-25%. Credit costs to peak in Q1 FY27 at 2.2% then normalize. Focus shift to secured lending mix.",
        actual: "Q4 credit costs at 1.95% — improving from Q3. AUM growth 26% for full year. Secured mix improved to 54% from 49%. Full-year PAT growth of 13% vs 25% in FY25.",
        verdict: "delivered",
        detail: "Stabilization quarter. Credit costs improving, secured mix moving right direction. But the headline is PAT growth halving from 25% to 13% — for a stock priced at 32x, this is the kind of deceleration that changes the narrative from 'premium growth compounder' to 'mature lender managing through a cycle'. Management's tone has shifted from expansive to cautious — a healthy signal but the stock may need to re-rate.",
      },
    ],
    bullCase: [
      "India's consumer credit penetration at 12% vs 30%+ in peers — massive runway. Bajaj Finance's distribution + tech stack is the best-positioned to capture it.",
      "The credit cycle stress is manageable and peaking. Secured mix shift reduces structural risk. Cost-to-income ratio among best in class.",
      "The app platform (60M+ downloads) is evolving into a marketplace — financial products, commerce, insurance — creating optionality beyond lending.",
      "Management has navigated cycles before (COVID, demonetization) and emerged stronger each time. Track record earns benefit of doubt.",
    ],
    bearCase: [
      "At 32x PE with PAT growth decelerating to 13%, the valuation is stretched. The 'premium growth' narrative is eroding quarter by quarter.",
      "Unsecured lending stress may not be cyclical — digital-first lending to thin-file borrowers has structural adverse selection. Book seasoning will tell.",
      "Competition intensifying from banks (HDFC Bank, ICICI) with lower cost of funds, and fintechs with better distribution. Margins will compress.",
      "Regulatory risk: RBI's concerns on unsecured lending could lead to tighter capital requirements or sector-wide growth caps.",
    ],
    managementGuidance: [
      "FY27 AUM growth: 23-25% (down from 28-30% in FY26)",
      "Credit costs: peak at 2.2% in Q1 FY27, normalize to 1.8% by Q4 FY27",
      "Secured lending mix target: 58% by FY27 end (from 54%)",
      "Digital origination: 65% of new loans by FY27",
      "ROE target: 20%+ (currently 20.2%, under pressure)",
    ],
    cashQuality: [
      { year: "FY24", pat: 14840, cfo: 8200, fcf: 6800, cashConversion: 55 },
      { year: "FY25", pat: 16200, cfo: 4600, fcf: 3200, cashConversion: 28 },
      { year: "FY26", pat: 16800, cfo: 9400, fcf: 7800, cashConversion: 56 },
    ],
  },
};
