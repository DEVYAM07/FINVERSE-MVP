"use client";

import React, { useEffect, useState } from "react";

interface StockData {
  symbol: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
}

interface StockCardProps {
  symbol: string;
}

export default function StockCard({ symbol }: StockCardProps) {
  const [stock, setStock] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStock = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/stock?symbol=${symbol}`);

        if (!res.ok) {
          throw new Error("Failed to fetch stock data");
        }

        const data: StockData = await res.json();
        setStock(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch stock data");
        }
        setStock(null);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) fetchStock();
  }, [symbol]);

  if (loading) {
    return <div className="text-red-500 text-lg">Loading {symbol} data...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-lg">Error: {error}</div>;
  }

  if (!stock) {
    return <div className="text-gray-600 text-lg">No stock data found.</div>;
  }

  return (
    <div className="bg-white border-2 border-[#ff385c] rounded-2xl shadow-lg p-6 max-w-md w-full text-[#222] transition hover:shadow-red-200">
      <h2 className="text-3xl font-extrabold text-[#ff385c] mb-4 tracking-tight">
        {stock.symbol}
      </h2>

      <div className="grid grid-cols-2 gap-4 text-sm text-[#333]">
        <div>
          <p className="text-[#ff385c] font-semibold">Open:</p>
          <p>{stock.open !== null ? `$${stock.open.toFixed(2)}` : "N/A"}</p>
        </div>
        <div>
          <p className="text-[#ff385c] font-semibold">High:</p>
          <p>{stock.high !== null ? `$${stock.high.toFixed(2)}` : "N/A"}</p>
        </div>
        <div>
          <p className="text-[#ff385c] font-semibold">Low:</p>
          <p>{stock.low !== null ? `$${stock.low.toFixed(2)}` : "N/A"}</p>
        </div>
        <div>
          <p className="text-[#ff385c] font-semibold">Close:</p>
          <p>{stock.close !== null ? `$${stock.close.toFixed(2)}` : "N/A"}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[#ff385c] font-semibold">Volume:</p>
          <p>{stock.volume !== null ? stock.volume.toLocaleString() : "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
