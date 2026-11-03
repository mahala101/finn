# FINN — Financial Intelligence Agent

A mobile-first AI-powered investment copilot that filters the noise and surfaces what matters.

Built for the ENAM Holdings AI Engineer Build Challenge.

---

## What FINN Does

**Push** — FINN watches your portfolio 24/7 and tells you what changed, ranked by what actually matters.

- **Daily Digest**: Every filing across 18 portfolio stocks, classified by AI into 16 categories, prioritized by material impact. Routine paperwork is collapsed; results misses and management exits surface first.
- **Smart Enrichment**: Quarterly results auto-extract Revenue / EBITDA / PBT / PAT with QoQ and YoY comparisons. Management changes pull the incoming person's professional background.
- **Triggered Alerts**: Configurable thresholds for volume spikes (default 2× avg) and price moves (default ±3%). You decide what "unusual" means.

**Pull** — On-demand deep research grounded in primary sources only (annual reports + concall transcripts).

- **Narrative vs Numbers**: The crown jewel — what management promised each quarter vs what the numbers actually delivered. Not summarizing management, but analyzing them.
- **Business & Financial Snapshot**: Segments, revenue mix, headline ratios, multi-year trajectory.
- **Bull vs Bear**: Tight case each way, grounded in the data.
- **Cash Quality**: Does profit convert to cash? CFO vs PAT, FCF, cash conversion ratios.

---

## Architecture & Model Routing

```
┌─────────────────────────────────────────────────────┐
│  Frontend (Next.js + Tailwind)  — Vercel            │
│  Mobile-first · Dark theme · Real-time digest       │
├─────────────────────────────────────────────────────┤
│  AI Layer — Smart Model Routing                     │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │ Gemini 2.0 Flash │  │ Claude Sonnet            │ │
│  │ FREE             │  │ On-demand only           │ │
│  │ • Classification │  │ • Narrative vs Numbers   │ │
│  │ • Summarization  │  │ • Deep company analysis  │ │
│  │ • Results extract │  │ • Bull/Bear synthesis    │ │
│  │ • Person lookup  │  │                          │ │
│  └──────────────────┘  └──────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│  Data Pipeline (Python)                             │
│  • yfinance → EOD price & volume                    │
│  • BSE API → Corporate announcements                │
│  • screener.in → Annual reports, concalls, ratios   │
└─────────────────────────────────────────────────────┘
```

**Cost philosophy**: Gemini Flash handles ~95% of the work for free. Claude is reserved for the deep analysis that genuinely requires reasoning (Narrative vs Numbers). A full day's pipeline run costs < $0.10.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | Next.js 14 + Tailwind | Mobile-first SSR, deploys to Vercel in one click |
| Styling | Custom dark theme | Bloomberg-inspired density with modern mobile UX |
| Data: Prices | yfinance | Free, reliable, covers all NSE/BSE tickers |
| Data: Filings | BSE API | Direct from exchange, real-time announcements |
| Data: Fundamentals | screener.in | Consolidated annual reports + concall transcripts |
| AI: Bulk | Gemini 2.0 Flash | Free tier, fast, good at structured extraction |
| AI: Deep | Claude Sonnet | Best reasoning for nuanced financial analysis |
| Deploy | Vercel | Free tier, instant mobile-accessible link |

---

## Portfolio (18 stocks, 10 sectors)

| Ticker | Company | Sector |
|--------|---------|--------|
| RELIANCE | Reliance Industries | Energy |
| TCS | Tata Consultancy Services | IT |
| HDFCBANK | HDFC Bank | Banking |
| INFY | Infosys | IT |
| ICICIBANK | ICICI Bank | Banking |
| BAJFINANCE | Bajaj Finance | NBFC |
| ASIANPAINT | Asian Paints | Consumer |
| TITAN | Titan Company | Consumer |
| TATAMOTORS | Tata Motors | Auto |
| SBIN | State Bank of India | Banking |
| ITC | ITC Ltd | FMCG |
| SUNPHARMA | Sun Pharma | Pharma |
| LT | Larsen & Toubro | Infra |
| ADANIPORTS | Adani Ports | Infra |
| MARUTI | Maruti Suzuki | Auto |
| ZOMATO | Zomato | Internet |
| WIPRO | Wipro | IT |
| JSWSTEEL | JSW Steel | Metals |

**Ad-hoc research**: DMART, TRENT, PAYTM, IRCTC, HAL

---

## Setup & Run

```bash
# 1. Clone and install
git clone <repo-url>
cd finn
npm install

# 2. Set up API keys (copy and fill)
cp .env.example .env.local

# 3. Run data pipeline (Python)
pip install yfinance requests beautifulsoup4 google-generativeai
python scripts/fetch_prices.py
python scripts/fetch_announcements.py
python scripts/fetch_fundamentals.py
python scripts/ai_analyze.py

# 4. Start the app
npm run dev
# Open http://localhost:3000 on your phone

# 5. Deploy to Vercel
npx vercel --prod
```

---

## Key Decisions & Tradeoffs

**What I built deep:**
- **Narrative vs Numbers** — this is FINN's differentiator. Not a summary engine but an analysis engine that holds management accountable to their own words. The quarter-by-quarter verdict system (exceeded / delivered / missed) makes it scannable.
- **Push digest with smart priority** — the 16-category classification + priority system means an investor sees results misses and M&A deals first, ESOP allotments last (or never).
- **Management change enrichment** — automatically pulling the incoming person's background so you know who they are without leaving the app.

**What I deliberately left out:**
- **Real-time intraday data** — the brief specified EOD, and real-time adds complexity without insight for a fundamental investor.
- **Chat interface** — considered it, but a well-designed digest + research view saves more time than a chatbot. The investor's workflow is scan → drill in, not type a question.
- **News aggregation** — the brief explicitly says primary data only for research. Push-side uses exchange filings, not news.

**Where I'd take it next:**
- Voice briefing — "Hey FINN, what happened overnight?" as a 60-second morning audio summary
- Watchlist sharing — let multiple analysts collaborate on a shared digest
- Alerting via Telegram/WhatsApp push notifications
- Historical Narrative vs Numbers — extend to 8+ quarters to show management credibility score over time
- Live data: WebSocket connection to NSE for intraday alerts

---

## Design Philosophy

Dark, dense, financial. Every pixel earns its place. The design language is inspired by professional trading terminals but built mobile-first — because the investor who matters most is the one checking their phone at 7am over coffee.

Key design choices:
- **Gold accent (#C8A24E)** — wealth, conviction, premium feel without being flashy
- **Priority-driven color coding** — red for critical, amber for high, blue for medium, grey for routine
- **Data tables over charts** — for financial data, numbers > visualizations. An investor reads ₹3,842 Cr faster than they decode a bar chart
- **Collapsed routine** — routine filings hidden by default. The app's job is to NOT show you things.

---

## License

Built for the ENAM Holdings AI Engineer Build Challenge, 2026.
