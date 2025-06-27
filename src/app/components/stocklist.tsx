"use client";
import React, { useState } from "react";

const popularStocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "META"];

interface StockListProps {
  selectedStock: string;
  onSelectStock: (symbol: string) => void; 
}

export default function StockList({ selectedStock, onSelectStock }: StockListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSelectStock(searchQuery.trim().toUpperCase());
      setSearchQuery("");
    }
  }; 


  return (
    <aside className="w-64 bg-white border-2 border-[#ff385c] rounded-2xl p-5 shadow-lg flex flex-col text-[#111]">
      <h2 className="mb-4 text-xl font-bold text-[#ff385c] tracking-wide">
        📈 Browse Stocks
      </h2>

      <div className="flex gap-2 mb-4">
        <input 
          type="text"
          placeholder="Enter symbol"
          className="flex-grow rounded-md border border-red-300 px-3 py-2 text-sm text-black placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-[#ff385c]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="rounded-md bg-[#ff385c] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-600 transition"
          aria-label="Find stock"
        >
          Find
        </button>
      </div>

      <nav className="flex-grow overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {popularStocks.map((symbol) => (
            <li key={symbol}>
              <button
                className={`w-full text-left rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  selectedStock === symbol
                    ? "bg-[#ff385c] text-white shadow-md"
                    : "bg-red-50 text-[#ff385c] hover:bg-red-100"
                }`}
                onClick={() => onSelectStock(symbol)}
                aria-label={`Select stock ${symbol}`}
              >
                {symbol}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
