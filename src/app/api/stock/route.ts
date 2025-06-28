import { NextRequest, NextResponse } from "next/server";

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY; // Set this in .env.local

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol parameter" }, { status: 400 });
  }

  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch stock data from Alpha Vantage");
    }

    const data = await res.json(); 
    const timeSeries = data["Time Series (1min)"];

    if (!timeSeries) {
      return NextResponse.json({ error: "Invalid symbol or API limit reached" }, { status: 400 });
    }

    const latestTimestamp = Object.keys(timeSeries)[0];
    const latestData = timeSeries[latestTimestamp];

    const stockData = {
      symbol: symbol.toUpperCase(),
      open: parseFloat(latestData["1. open"]),
      high: parseFloat(latestData["2. high"]),
      low: parseFloat(latestData["3. low"]),
      close: parseFloat(latestData["4. close"]),
      volume: parseInt(latestData["5. volume"]),
    };

    return NextResponse.json(stockData);
  } catch (error: unknown) {
     if(typeof error === 'string') {
      return NextResponse.json({ error: error }, { status: 500 });
    }
    console.log("Error fetching stock data:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}

}
