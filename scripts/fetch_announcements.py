"""
FINN Data Pipeline — Corporate Announcement Fetcher
Fetches recent announcements from BSE for portfolio stocks.
Run: python scripts/fetch_announcements.py
"""
import json
import os
import time
from datetime import datetime, timedelta

try:
    import requests
except ImportError:
    print("Install requests: pip install requests")
    exit(1)

# BSE scrip codes for our portfolio — map ticker to BSE code
SCRIP_CODES = {
    "RELIANCE.NS": "500325",
    "TCS.NS": "532540",
    "HDFCBANK.NS": "500180",
    "INFY.NS": "500209",
    "ICICIBANK.NS": "532174",
    "BAJFINANCE.NS": "500034",
    "ASIANPAINT.NS": "500820",
    "TITAN.NS": "500114",
    "TATAMOTORS.NS": "500570",
    "SBIN.NS": "500112",
    "ITC.NS": "500875",
    "SUNPHARMA.NS": "524715",
    "LT.NS": "500510",
    "ADANIPORTS.NS": "532921",
    "MARUTI.NS": "532500",
    "ZOMATO.NS": "543320",
    "WIPRO.NS": "507685",
    "JSWSTEEL.NS": "500228",
}

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "generated")
os.makedirs(OUTPUT_DIR, exist_ok=True)

CATEGORIES_KEYWORDS = {
    "results": ["financial result", "quarterly result", "annual result", "board meeting.*result"],
    "management_change": ["resignation", "appointment", "cessation", "director", "ceo", "cfo", "managing director"],
    "M&A": ["acquisition", "merger", "demerger", "joint venture", "subsidiary", "amalgamation"],
    "fund_raise": ["rights issue", "qip", "preferential allotment", "buyback", "commercial paper"],
    "litigation": ["lawsuit", "regulatory", "fine", "penalty", "sebi", "order", "nclt"],
    "insider_trading": ["insider", "promoter.*shares", "trading window", "esop exercise"],
    "earnings_call": ["earnings call", "concall", "conference call", "investor call", "transcript"],
    "credit_rating": ["credit rating", "crisil", "icra", "care rating", "india ratings"],
    "dividend": ["dividend", "record date.*dividend"],
    "capex": ["capex", "capital expenditure", "new plant", "capacity expansion", "new facility"],
    "bonus_split": ["bonus", "stock split", "sub-division"],
    "press_release": ["order win", "partnership", "product launch", "press release", "clarification"],
    "pledging": ["pledg", "encumbrance"],
    "agm_egm": ["annual general meeting", "extraordinary general meeting", "agm", "egm"],
}


def classify_announcement(subject: str) -> str:
    """Classify announcement into category based on keywords."""
    subject_lower = subject.lower()
    import re
    for category, keywords in CATEGORIES_KEYWORDS.items():
        for kw in keywords:
            if re.search(kw, subject_lower):
                return category
    return "unclassified"


def assign_priority(category: str) -> str:
    """Assign priority based on category."""
    critical = {"results", "management_change"}
    high = {"M&A", "fund_raise", "capex", "litigation"}
    medium = {"earnings_call", "insider_trading", "credit_rating", "dividend", "press_release"}
    if category in critical:
        return "critical"
    if category in high:
        return "high"
    if category in medium:
        return "medium"
    return "routine"


def fetch_bse_announcements(scrip_code: str, ticker: str, days: int = 7) -> list:
    """Fetch announcements from BSE for a given scrip code."""
    from_date = (datetime.now() - timedelta(days=days)).strftime("%Y%m%d")
    to_date = datetime.now().strftime("%Y%m%d")

    url = f"https://api.bseindia.com/BseIndiaAPI/api/AnnSubCategoryGetData/w"
    params = {
        "pageno": "1",
        "strCat": "-1",
        "strPrevDate": from_date,
        "strScrip": scrip_code,
        "strSearch": "P",
        "strToDate": to_date,
        "strType": "C",
    }
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.bseindia.com/",
        "Accept": "application/json",
    }

    try:
        resp = requests.get(url, params=params, headers=headers, timeout=10)
        resp.raise_for_status()
        data = resp.json()

        announcements = []
        if isinstance(data, dict) and "Table" in data:
            for item in data["Table"]:
                subject = item.get("NEWSSUB", "")
                category = classify_announcement(subject)
                announcements.append({
                    "ticker": ticker,
                    "company": item.get("SLONGNAME", ticker.replace(".NS", "")),
                    "category": category,
                    "priority": assign_priority(category),
                    "title": subject,
                    "timestamp": item.get("NEWS_DT", ""),
                    "source": "BSE Filing",
                    "attachmentUrl": item.get("ATTACHMENTNAME", ""),
                })

        return announcements

    except Exception as e:
        print(f"  ✗ {ticker} (BSE {scrip_code}): {e}")
        return []


if __name__ == "__main__":
    print("FINN — Fetching corporate announcements...")

    all_announcements = []
    for ticker, code in SCRIP_CODES.items():
        print(f"  → {ticker}...", end=" ")
        anns = fetch_bse_announcements(code, ticker)
        all_announcements.extend(anns)
        print(f"{len(anns)} filings")
        time.sleep(0.5)  # Rate limiting

    # Sort by timestamp descending
    all_announcements.sort(key=lambda x: x.get("timestamp", ""), reverse=True)

    # Save
    output_path = os.path.join(OUTPUT_DIR, "announcements.json")
    with open(output_path, "w") as f:
        json.dump(all_announcements, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Fetched {len(all_announcements)} announcements")

    # Stats
    from collections import Counter
    cats = Counter(a["category"] for a in all_announcements)
    for cat, count in cats.most_common():
        print(f"  {cat}: {count}")
