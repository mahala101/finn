export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePct: number;
  volume: number;
  avgVolume: number;
  marketCap: string;
}

export const portfolio: Stock[] = [
  { ticker: "RELIANCE.NS", name: "Reliance Industries", sector: "Energy", price: 2934.50, change: -42.30, changePct: -1.42, volume: 12800000, avgVolume: 8200000, marketCap: "19.8L Cr" },
  { ticker: "TCS.NS", name: "Tata Consultancy Services", sector: "IT", price: 4312.80, change: 28.60, changePct: 0.67, volume: 3100000, avgVolume: 3400000, marketCap: "15.6L Cr" },
  { ticker: "HDFCBANK.NS", name: "HDFC Bank", sector: "Banking", price: 1789.25, change: 15.40, changePct: 0.87, volume: 9400000, avgVolume: 8800000, marketCap: "13.6L Cr" },
  { ticker: "INFY.NS", name: "Infosys", sector: "IT", price: 1876.50, change: -12.80, changePct: -0.68, volume: 5600000, avgVolume: 5200000, marketCap: "7.8L Cr" },
  { ticker: "ICICIBANK.NS", name: "ICICI Bank", sector: "Banking", price: 1298.70, change: 22.10, changePct: 1.73, volume: 11200000, avgVolume: 7500000, marketCap: "9.1L Cr" },
  { ticker: "BAJFINANCE.NS", name: "Bajaj Finance", sector: "NBFC", price: 7142.60, change: -156.30, changePct: -2.14, volume: 4200000, avgVolume: 1800000, marketCap: "4.4L Cr" },
  { ticker: "ASIANPAINT.NS", name: "Asian Paints", sector: "Consumer", price: 2456.80, change: -8.90, changePct: -0.36, volume: 1900000, avgVolume: 2100000, marketCap: "2.4L Cr" },
  { ticker: "TITAN.NS", name: "Titan Company", sector: "Consumer", price: 3678.40, change: 45.20, changePct: 1.24, volume: 2800000, avgVolume: 2400000, marketCap: "3.3L Cr" },
  { ticker: "TATAMOTORS.NS", name: "Tata Motors", sector: "Auto", price: 924.30, change: 18.70, changePct: 2.06, volume: 18600000, avgVolume: 12000000, marketCap: "3.4L Cr" },
  { ticker: "SBIN.NS", name: "State Bank of India", sector: "Banking", price: 812.45, change: -5.60, changePct: -0.68, volume: 14200000, avgVolume: 13500000, marketCap: "7.3L Cr" },
  { ticker: "ITC.NS", name: "ITC Ltd", sector: "FMCG", price: 498.30, change: 3.20, changePct: 0.65, volume: 8900000, avgVolume: 9100000, marketCap: "6.2L Cr" },
  { ticker: "SUNPHARMA.NS", name: "Sun Pharma", sector: "Pharma", price: 1823.60, change: 34.80, changePct: 1.95, volume: 3400000, avgVolume: 2800000, marketCap: "4.4L Cr" },
  { ticker: "LT.NS", name: "Larsen & Toubro", sector: "Infra", price: 3567.90, change: -23.40, changePct: -0.65, volume: 2600000, avgVolume: 2900000, marketCap: "4.9L Cr" },
  { ticker: "ADANIPORTS.NS", name: "Adani Ports", sector: "Infra", price: 1345.20, change: 56.80, changePct: 4.41, volume: 9800000, avgVolume: 4200000, marketCap: "2.9L Cr" },
  { ticker: "MARUTI.NS", name: "Maruti Suzuki", sector: "Auto", price: 12456.30, change: -189.40, changePct: -1.50, volume: 1100000, avgVolume: 800000, marketCap: "3.9L Cr" },
  { ticker: "ZOMATO.NS", name: "Zomato", sector: "Internet", price: 284.60, change: 8.40, changePct: 3.04, volume: 32000000, avgVolume: 18000000, marketCap: "2.5L Cr" },
  { ticker: "WIPRO.NS", name: "Wipro", sector: "IT", price: 542.80, change: -4.20, changePct: -0.77, volume: 4100000, avgVolume: 4500000, marketCap: "2.8L Cr" },
  { ticker: "JSWSTEEL.NS", name: "JSW Steel", sector: "Metals", price: 978.40, change: 32.60, changePct: 3.45, volume: 7800000, avgVolume: 3900000, marketCap: "2.4L Cr" },
];

export const watchlist = ["DMART.NS", "TRENT.NS", "PAYTM.NS", "IRCTC.NS", "HAL.NS"];
