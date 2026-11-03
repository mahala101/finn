"""
FINN AI Layer — Smart Model Routing
- Gemini Flash (free) for bulk classification & summarization
- Claude Sonnet for deep Narrative vs Numbers analysis

Run: python scripts/ai_analyze.py
"""
import json
import os
import time

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "generated")

# ──────────────────────────────────────────────
# TIER 1: Gemini Flash — bulk work (FREE)
# ──────────────────────────────────────────────

def classify_with_gemini(announcements: list[dict]) -> list[dict]:
    """
    Use Gemini 2.0 Flash to classify and summarize announcements.
    Cost: FREE via Google AI Studio API.
    """
    try:
        import google.generativeai as genai
    except ImportError:
        print("Install: pip install google-generativeai")
        return announcements

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Set GEMINI_API_KEY env variable (free from ai.google.dev)")
        return announcements

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.0-flash-exp")

    CATEGORIES = [
        "results", "management_change", "M&A", "fund_raise", "litigation",
        "insider_trading", "earnings_call", "credit_rating", "dividend",
        "capex", "press_release", "bonus_split", "pledging", "agm_egm", "unclassified"
    ]

    # Batch process — send 10 at a time to minimize API calls
    batch_size = 10
    for i in range(0, len(announcements), batch_size):
        batch = announcements[i:i + batch_size]
        titles = [f"{j+1}. [{a['ticker']}] {a['title']}" for j, a in enumerate(batch)]

        prompt = f"""You are a financial filing classifier for Indian stock markets.

For each announcement below, respond with ONLY a JSON array where each item has:
- "index": the number
- "category": one of {CATEGORIES}
- "priority": "critical" | "high" | "medium" | "low" | "routine"
- "summary": one-line plain English summary (max 120 chars) explaining why this matters to an investor

Announcements:
{chr(10).join(titles)}

Respond ONLY with valid JSON array, no markdown."""

        try:
            response = model.generate_content(prompt)
            text = response.text.strip()
            # Clean potential markdown
            if text.startswith("```"):
                text = text.split("\n", 1)[1].rsplit("```", 1)[0]

            results = json.loads(text)
            for r in results:
                idx = r["index"] - 1
                if 0 <= idx < len(batch):
                    batch[idx]["category"] = r.get("category", batch[idx]["category"])
                    batch[idx]["priority"] = r.get("priority", batch[idx]["priority"])
                    batch[idx]["ai_summary"] = r.get("summary", "")

            print(f"  ✓ Classified batch {i//batch_size + 1} ({len(batch)} items)")

        except Exception as e:
            print(f"  ✗ Gemini batch {i//batch_size + 1} failed: {e}")

        time.sleep(1)  # Rate limiting

    return announcements


# ──────────────────────────────────────────────
# TIER 1 ALT: Groq — if you prefer (also FREE)
# ──────────────────────────────────────────────

def classify_with_groq(announcements: list[dict]) -> list[dict]:
    """Alternative: use Groq (Llama 3.1 70B) for classification. Also free."""
    try:
        from groq import Groq
    except ImportError:
        print("Install: pip install groq")
        return announcements

    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        print("Set GROQ_API_KEY (free from console.groq.com)")
        return announcements

    client = Groq(api_key=api_key)
    # Similar logic as Gemini, using client.chat.completions.create()
    # Implementation left as exercise — swap the model call
    return announcements


# ──────────────────────────────────────────────
# TIER 2: Claude Sonnet — deep analysis (paid, use sparingly)
# ──────────────────────────────────────────────

def analyze_narrative_vs_numbers(
    ticker: str,
    annual_report_text: str,
    concall_transcripts: list[str],
    quarterly_results: list[dict],
) -> dict:
    """
    Deep Narrative vs Numbers analysis using Claude.
    This is the premium analysis — use only for on-demand research (Pull mode).
    """
    try:
        import anthropic
    except ImportError:
        print("Install: pip install anthropic")
        return {}

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Set ANTHROPIC_API_KEY")
        return {}

    client = anthropic.Anthropic(api_key=api_key)

    # Combine transcripts
    transcript_text = "\n\n---\n\n".join(concall_transcripts[:4])  # Last 4 quarters

    prompt = f"""You are FINN, a financial analysis engine. Analyze this company's management credibility by comparing what they promised vs what they delivered.

COMPANY: {ticker}

EARNINGS CALL TRANSCRIPTS (last 4 quarters):
{transcript_text[:30000]}

QUARTERLY RESULTS:
{json.dumps(quarterly_results, indent=2)[:5000]}

For each of the last 4 quarters, produce:
1. **What they said**: Key guidance/promises from the earnings call (specific numbers, targets, timelines)
2. **What happened**: Actual results vs those promises
3. **Verdict**: "exceeded" | "delivered" | "missed"
4. **Your read**: 2-3 sentence analytical take — not summarizing, but analyzing the gap and what it means

Also produce:
- **Bull case**: 4 bullet points for why to buy
- **Bear case**: 4 bullet points for why to sell
- **Cash quality assessment**: Does profit convert to cash?

Respond in JSON format:
{{
  "narrative_vs_numbers": [
    {{"quarter": "Q1 FY26", "guidance": "...", "actual": "...", "verdict": "...", "detail": "..."}}
  ],
  "bull_case": ["...", "..."],
  "bear_case": ["...", "..."],
  "cash_quality_note": "..."
}}"""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}],
        )
        text = response.content[0].text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1].rsplit("```", 1)[0]
        return json.loads(text)

    except Exception as e:
        print(f"  ✗ Claude analysis failed: {e}")
        return {}


# ──────────────────────────────────────────────
# TIER 2: Results deep-dive (auto for quarterly results)
# ──────────────────────────────────────────────

def summarize_results_filing(ticker: str, filing_text: str) -> dict:
    """
    When quarterly results are filed, auto-generate the headline comparison.
    Uses Gemini (cheap) for this since it's structured extraction.
    """
    try:
        import google.generativeai as genai
    except ImportError:
        return {}

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return {}

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.0-flash-exp")

    prompt = f"""Extract headline financials from this quarterly results filing.

FILING TEXT:
{filing_text[:10000]}

Return ONLY valid JSON:
{{
  "quarter": "Q2 FY27",
  "financials": [
    {{"metric": "Revenue", "current": "₹X Cr", "qoq": "+X%", "yoy": "+X%"}},
    {{"metric": "EBITDA", "current": "₹X Cr", "qoq": "+X%", "yoy": "+X%"}},
    {{"metric": "PBT", "current": "₹X Cr", "qoq": "+X%", "yoy": "+X%"}},
    {{"metric": "PAT", "current": "₹X Cr", "qoq": "+X%", "yoy": "+X%"}}
  ],
  "one_line": "One-line investor summary of what matters most"
}}"""

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1].rsplit("```", 1)[0]
        return json.loads(text)
    except Exception as e:
        print(f"  ✗ Results extraction failed for {ticker}: {e}")
        return {}


# ──────────────────────────────────────────────
# Enrichment: Management change — pull background
# ──────────────────────────────────────────────

def enrich_management_change(name: str, company: str) -> dict:
    """
    For management changes, pull a quick background of the person.
    Uses Gemini to synthesize from web search results.
    """
    try:
        import google.generativeai as genai
    except ImportError:
        return {}

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return {}

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.0-flash-exp")

    prompt = f"""Give a brief professional background of {name}, recently appointed at {company}.

Return JSON:
{{
  "name": "{name}",
  "role": "Their new role at {company}",
  "previousRole": "Their most recent previous role",
  "background": "2-3 sentence professional summary — education, key career highlights, notable achievements"
}}

If you don't have reliable info, say so honestly. No fabrication."""

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1].rsplit("```", 1)[0]
        return json.loads(text)
    except Exception as e:
        return {"name": name, "role": f"New appointment at {company}", "previousRole": "Unknown", "background": "Background information not available."}


# ──────────────────────────────────────────────
# Main pipeline
# ──────────────────────────────────────────────

if __name__ == "__main__":
    print("FINN AI Layer — Processing announcements...\n")

    # Load raw announcements
    ann_path = os.path.join(OUTPUT_DIR, "announcements.json")
    if not os.path.exists(ann_path):
        print("Run fetch_announcements.py first!")
        exit(1)

    with open(ann_path) as f:
        announcements = json.load(f)

    print(f"Loaded {len(announcements)} announcements\n")

    # Step 1: Classify with Gemini (free)
    print("Step 1: Classifying with Gemini Flash...")
    announcements = classify_with_gemini(announcements)

    # Step 2: Enrich management changes
    print("\nStep 2: Enriching management changes...")
    for ann in announcements:
        if ann.get("category") == "management_change":
            # Try to extract name from title
            title = ann.get("title", "")
            # Simple heuristic — in production you'd parse more carefully
            if "appoint" in title.lower() or "designat" in title.lower():
                # Use Gemini to extract and enrich
                info = enrich_management_change(title, ann.get("company", ""))
                if info:
                    ann["personInfo"] = info
                    print(f"  ✓ Enriched: {info.get('name', 'Unknown')}")

    # Step 3: Extract results financials
    print("\nStep 3: Processing results filings...")
    for ann in announcements:
        if ann.get("category") == "results" and ann.get("attachmentUrl"):
            # In production: download the PDF, extract text, then summarize
            # For now, flag it for manual processing
            print(f"  → {ann['ticker']}: Results filing detected — would extract financials")

    # Save enriched data
    output_path = os.path.join(OUTPUT_DIR, "announcements_enriched.json")
    with open(output_path, "w") as f:
        json.dump(announcements, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Enriched announcements saved to {output_path}")
    print("\nModel routing summary:")
    print("  Gemini Flash (free): classification, summarization, results extraction, person lookup")
    print("  Claude Sonnet (paid): Narrative vs Numbers deep analysis (on-demand only)")
