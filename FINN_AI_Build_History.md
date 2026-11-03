# FINN — AI Build History

**Builder:** Anand Mahala, IIT Kanpur
**Tool:** Claude (Anthropic) — conversational AI-assisted development
**Date:** November 3, 2026
**Total build time:** ~3 hours

---

## Phase 1: Problem Analysis & Architecture (30 min)

**Prompt:** Analyzed the ENAM Build Challenge brief and companion reference document in detail. Extracted core requirements:
- Mobile-first financial intelligence agent with Push (proactive) and Pull (on-demand) modes
- Portfolio of 15–20 NSE/BSE-listed stocks
- Three data sources: yfinance (prices), BSE/NSE (filings), screener.in (fundamentals)
- AI layer for classification, summarization, and deep analysis

**Key architectural decisions made with Claude:**

1. **Tech stack selection:**
   - Next.js 14 + Tailwind CSS → mobile-first SSR, one-click Vercel deploy
   - Python scripts for data pipeline → yfinance, BSE API, screener.in scraping
   - Dark theme with gold accent → professional financial UI, Bloomberg-inspired density

2. **Smart model routing strategy:**
   - Gemini 2.0 Flash (free tier) for ~95% of work: announcement classification, summarization, results extraction, person background lookup
   - Claude Sonnet (paid, on-demand only) for deep Narrative vs Numbers analysis where reasoning quality matters
   - Design goal: full daily pipeline under $0.10

3. **Feature scoping — deliberate focus:**
   - Build deep on Push digest + Narrative vs Numbers (the brief's most valued feature)
   - Skip chat interface — scan → drill-in workflow is faster for investors
   - Skip intraday data — brief specifies EOD, fundamental investors don't need ticks
   - Skip news aggregation — brief mandates primary data only for research

---

## Phase 2: Data Layer Design (20 min)

**Portfolio construction:** Selected 18 stocks across 10 sectors for demo diversity:
- Energy: Reliance
- IT: TCS, Infosys, Wipro
- Banking: HDFC Bank, ICICI Bank, SBI
- NBFC: Bajaj Finance
- Consumer: Asian Paints, Titan
- Auto: Tata Motors, Maruti
- Pharma: Sun Pharma
- Infra: L&T, Adani Ports
- FMCG: ITC
- Internet: Zomato
- Metals: JSW Steel

**Announcement classification system:** Implemented 16-category taxonomy from the reference doc (results, management_change, M&A, fund_raise, litigation, insider_trading, earnings_call, credit_rating, dividend, capex, press_release, bonus_split, pledging, agm_egm, postal_ballot, unclassified) with 5-tier priority system (critical → routine).

**Data pipeline scripts:**
- `fetch_prices.py` — yfinance EOD data + 20-day volume average + automatic alert detection (volume spike > 2×, price move > ±3%)
- `fetch_announcements.py` — BSE API scraping with regex-based classification + keyword matching
- `fetch_fundamentals.py` — screener.in scraping for annual P&L, key ratios, concall transcript links
- `ai_analyze.py` — Gemini Flash for bulk classification/enrichment, Claude Sonnet for deep analysis

---

## Phase 3: Frontend Development (90 min)

**Design system:**
- Background: #0A0E17 (near-black blue)
- Surface: #111827 / #1A2236 (card hierarchy)
- Accent: #C8A24E (gold — wealth, conviction)
- Semantic colors: green (gain), red (loss), orange (alert), blue (info)
- Typography: DM Sans (primary), JetBrains Mono (data/numbers)
- Mobile-first: max-width 448px, touch targets, bottom navigation

**Components built:**

1. **Header** — App title, live status indicator, current date/time
2. **BottomNav** — 4-tab navigation: Digest, Portfolio, Research, Alerts
3. **DigestView (Push mode):**
   - Time window selector (24h / 3d / 7d) with working date filtering
   - Volume spike alert bar
   - Priority-grouped announcements: Critical → High → Medium → Routine (collapsed)
4. **AnnouncementCard:**
   - Expand/collapse interaction
   - Financial table auto-render for results (Revenue, EBITDA, PBT, PAT with QoQ/YoY)
   - Person info card for management changes (name, role, previous role, background)
   - Priority-driven color coding and category icons
5. **PortfolioView:**
   - Heatmap grid of top movers
   - Full stock list sorted by magnitude of move
   - High volume badges, sector tags
6. **ResearchView (Pull mode):**
   - Company picker with ticker buttons
   - 4 analysis tabs: Overview, Narrative vs Numbers, Bull/Bear, Cash Quality
   - **Narrative vs Numbers** — quarter-by-quarter cards with: What They Said, What Happened, Verdict (exceeded/delivered/missed), FINN's analytical take
   - Financial trajectory table (multi-year Revenue, EBITDA, PAT, margins)
   - Segment revenue mix breakdown
   - Bull/Bear case cards with green/red coding
   - Cash quality table (PAT vs CFO vs FCF, conversion %)
7. **AlertsView:**
   - Configurable alert rules with toggle switches
   - Market signals: volume spike threshold, price move threshold
   - Announcement type filters: results, M&A, management changes, etc.

**Deep research data created for 3 companies:**
- Zomato (Internet / Quick Commerce) — 4 quarters of Narrative vs Numbers showing Blinkit store count misses but profitability exceeding guidance
- Reliance Industries (Conglomerate) — 4 quarters showing Jio delivering but Retail chronically behind store expansion targets
- Bajaj Finance (NBFC) — 4 quarters showing unsecured lending stress cycle and PAT growth deceleration

---

## Phase 4: API Routes (15 min)

Built Next.js API routes for future live data integration:
- `GET /api/portfolio` — stock data with summary statistics
- `GET /api/digest?window=24h&category=results` — filtered, priority-sorted announcements
- `GET /api/research?ticker=ZOMATO.NS` — full company research data

---

## Phase 5: Testing, Bug Fixes & Deployment (30 min)

**Bugs found and fixed:**
1. Time window filter (24h/3d/7d) wasn't actually filtering — timestamps were hardcoded dates instead of relative. Fixed by generating timestamps with `hoursAgo()` helper.
2. Announcement card expand/collapse wasn't working — financial tables and person info were rendering inline instead of in the expanded section. Restructured component with proper state gating.

**Deployment:**
- GitHub: https://github.com/mahala101/finn
- Vercel: deployed via CLI, production URL live
- Mobile testing: verified all 4 tabs, expand/collapse, time filtering on phone viewport

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│  Frontend (Next.js + Tailwind)  — Vercel            │
│  Mobile-first · Dark theme · 4-tab navigation       │
│  Digest | Portfolio | Research | Alerts              │
├─────────────────────────────────────────────────────┤
│  API Routes (Next.js)                               │
│  /api/digest · /api/portfolio · /api/research       │
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
│  fetch_prices.py → yfinance EOD + volume alerts     │
│  fetch_announcements.py → BSE API + classification  │
│  fetch_fundamentals.py → screener.in + concalls     │
│  ai_analyze.py → enrichment + deep analysis         │
└─────────────────────────────────────────────────────┘
```

---

## What I'd Build Next

1. **Voice briefing** — "Hey FINN, what happened overnight?" as a 60-second morning audio summary
2. **Telegram/WhatsApp push** — real-time alert delivery to phone
3. **Management credibility score** — extend Narrative vs Numbers to 8+ quarters, compute a rolling accuracy score for each management team
4. **Collaborative watchlist** — multiple analysts sharing one digest with annotation
5. **Live data pipeline** — cron job for daily price fetch + BSE announcement polling, replacing static demo data

---

*Built with Claude (Anthropic) as the primary AI development partner. All code, architecture decisions, and product design were discussed and iterated in conversation.*
