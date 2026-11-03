"""
FINN Data Pipeline — Price & Volume Fetcher
Uses yfinance to fetch EOD data for portfolio stocks.
Run: python scripts/fetch_prices.py
"""
import json
import os
from datetime import datetime, timedelta

try:
    import yfinance as yf
except ImportError:
    print("Install yfinance: pip install yfinance")
    exit(1)

PORTFOLIO_TICKERS = [
    "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
    "BAJFINANCE.NS", "ASIANPAINT.NS", "TITAN.NS", "TATAMOTORS.NS",
    "SBIN.NS", "ITC.NS", "SUNPHARMA.NS", "LT.NS", "ADANIPORTS.NS",
    "MARUTI.NS", "ZOMATO.NS", "WIPRO.NS", "JSWSTEEL.NS",
]

# Also fetch watchlist / ad-hoc research companies
EXTRA_TICKERS = ["DMART.NS", "TRENT.NS", "PAYTM.NS", "IRCTC.NS", "HAL.NS"]

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "generated")
os.makedirs(OUTPUT_DIR, exist_ok=True)


def fetch_stock_data(tickers: list[str], period: str = "3mo") -> dict:
    """Fetch EOD price + volume for given tickers."""
    results = {}
    for ticker in tickers:
        try:
            stock = yf.Ticker(ticker)
            hist = stock.history(period=period)
            info = stock.info

            if hist.empty:
                print(f"  ⚠ No data for {ticker}")
                continue

            latest = hist.iloc[-1]
            prev = hist.iloc[-2] if len(hist) > 1 else latest

            # Calculate 20-day average volume
            avg_vol = int(hist["Volume"].tail(20).mean()) if len(hist) >= 20 else int(hist["Volume"].mean())

            results[ticker] = {
                "ticker": ticker,
                "name": info.get("shortName", ticker.replace(".NS", "")),
                "sector": info.get("sector", "Unknown"),
                "price": round(float(latest["Close"]), 2),
                "prevClose": round(float(prev["Close"]), 2),
                "change": round(float(latest["Close"] - prev["Close"]), 2),
                "changePct": round(float((latest["Close"] - prev["Close"]) / prev["Close"] * 100), 2),
                "volume": int(latest["Volume"]),
                "avgVolume": avg_vol,
                "volumeRatio": round(float(latest["Volume"] / avg_vol), 2) if avg_vol > 0 else 1.0,
                "high52w": round(float(info.get("fiftyTwoWeekHigh", 0)), 2),
                "low52w": round(float(info.get("fiftyTwoWeekLow", 0)), 2),
                "marketCap": info.get("marketCap", 0),
                "pe": round(float(info.get("trailingPE", 0)), 1),
                "fetchedAt": datetime.now().isoformat(),
            }
            print(f"  ✓ {ticker}: ₹{results[ticker]['price']} ({results[ticker]['changePct']:+.2f}%)")

        except Exception as e:
            print(f"  ✗ {ticker}: {e}")

    return results


def detect_alerts(data: dict) -> list:
    """Detect unusual volume or price movements."""
    alerts = []
    for ticker, d in data.items():
        # Volume spike > 2x
        if d["volumeRatio"] >= 2.0:
            alerts.append({
                "ticker": ticker,
                "type": "volume_spike",
                "message": f"Volume {d['volumeRatio']:.1f}× average",
                "severity": "high" if d["volumeRatio"] >= 3.0 else "medium",
            })
        # Price move > 3%
        if abs(d["changePct"]) >= 3.0:
            direction = "surged" if d["changePct"] > 0 else "dropped"
            alerts.append({
                "ticker": ticker,
                "type": "price_move",
                "message": f"Price {direction} {abs(d['changePct']):.1f}% in a day",
                "severity": "high" if abs(d["changePct"]) >= 5.0 else "medium",
            })
    return alerts


if __name__ == "__main__":
    print("FINN — Fetching EOD data...")
    print(f"Portfolio: {len(PORTFOLIO_TICKERS)} stocks")

    all_tickers = PORTFOLIO_TICKERS + EXTRA_TICKERS
    data = fetch_stock_data(all_tickers)
    alerts = detect_alerts(data)

    # Save
    with open(os.path.join(OUTPUT_DIR, "prices.json"), "w") as f:
        json.dump(data, f, indent=2)

    with open(os.path.join(OUTPUT_DIR, "alerts.json"), "w") as f:
        json.dump(alerts, f, indent=2)

    print(f"\n✓ Fetched {len(data)} stocks, {len(alerts)} alerts detected")
    print(f"  Saved to {OUTPUT_DIR}")
