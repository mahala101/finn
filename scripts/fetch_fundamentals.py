"""
FINN Data Pipeline — Fundamentals Fetcher
Scrapes annual reports + concall transcript links from screener.in
Run: python scripts/fetch_fundamentals.py
"""
import json
import os
import re
import time

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Install: pip install requests beautifulsoup4")
    exit(1)

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "generated")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Screener.in company slugs
COMPANY_SLUGS = {
    "RELIANCE.NS": "reliance-industries",
    "TCS.NS": "tata-consultancy-services",
    "HDFCBANK.NS": "hdfc-bank",
    "INFY.NS": "infosys",
    "BAJFINANCE.NS": "bajaj-finance",
    "ZOMATO.NS": "zomato",
    "TATAMOTORS.NS": "tata-motors-dvr",
    "SUNPHARMA.NS": "sun-pharmaceutical-industries",
    "JSWSTEEL.NS": "jsw-steel",
    "ICICIBANK.NS": "icici-bank",
    "ITC.NS": "itc",
    "LT.NS": "larsen-toubro",
    "MARUTI.NS": "maruti-suzuki-india",
    "ADANIPORTS.NS": "adani-ports-special-economic-zone",
    "TITAN.NS": "titan-company",
    "ASIANPAINT.NS": "asian-paints",
    "WIPRO.NS": "wipro",
    "SBIN.NS": "state-bank-of-india",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "text/html",
}


def fetch_screener_data(slug: str, ticker: str) -> dict:
    """Fetch financial data and document links from screener.in."""
    url = f"https://www.screener.in/company/{slug}/consolidated/"

    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        result = {"ticker": ticker, "slug": slug, "url": url}

        # Extract key ratios from the top section
        ratios = {}
        ratio_list = soup.select(".company-ratios .flex-row li")
        for li in ratio_list:
            name_el = li.select_one(".name")
            value_el = li.select_one(".value, .number")
            if name_el and value_el:
                ratios[name_el.get_text(strip=True)] = value_el.get_text(strip=True)
        result["ratios"] = ratios

        # Extract annual P&L numbers from the table
        pl_table = soup.select_one("#profit-loss")
        if pl_table:
            headers_row = pl_table.select("thead th")
            years = [th.get_text(strip=True) for th in headers_row[1:]]

            rows = pl_table.select("tbody tr")
            financials = {}
            for row in rows:
                cells = row.select("td")
                if cells:
                    metric = cells[0].get_text(strip=True)
                    values = [c.get_text(strip=True) for c in cells[1:]]
                    financials[metric] = dict(zip(years, values))

            result["annual_financials"] = financials
            result["financial_years"] = years

        # Extract concall transcript links
        documents_section = soup.select("a[href*='concall'], a[href*='annual-report']")
        doc_links = []
        for a in documents_section:
            href = a.get("href", "")
            text = a.get_text(strip=True)
            if href:
                doc_links.append({"text": text, "url": href})
        result["document_links"] = doc_links

        # Extract concall links specifically from the documents section
        concall_section = soup.select(".documents a")
        concalls = []
        for a in concall_section:
            href = a.get("href", "")
            text = a.get_text(strip=True)
            if "concall" in text.lower() or "transcript" in text.lower():
                concalls.append({"text": text, "url": href})
        result["concall_transcripts"] = concalls

        return result

    except Exception as e:
        print(f"  ✗ {ticker}: {e}")
        return {"ticker": ticker, "error": str(e)}


if __name__ == "__main__":
    print("FINN — Fetching fundamentals from screener.in...\n")

    all_data = {}
    for ticker, slug in COMPANY_SLUGS.items():
        print(f"  → {ticker}...", end=" ")
        data = fetch_screener_data(slug, ticker)
        all_data[ticker] = data

        n_ratios = len(data.get("ratios", {}))
        n_years = len(data.get("financial_years", []))
        n_docs = len(data.get("concall_transcripts", []))
        print(f"{n_ratios} ratios, {n_years} years, {n_docs} concalls")

        time.sleep(1.5)  # Be polite to screener.in

    output_path = os.path.join(OUTPUT_DIR, "fundamentals.json")
    with open(output_path, "w") as f:
        json.dump(all_data, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Saved fundamentals for {len(all_data)} companies to {output_path}")
