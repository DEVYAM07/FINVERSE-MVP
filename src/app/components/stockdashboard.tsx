"use client";

import React, { useState } from "react";
import StockList from "./stocklist";
import StockCard from "./stockcard";
import AIAssistant from "./aiassistant";

export default function StockDashboard() {
  const [selectedStock, setSelectedStock] = useState("AAPL");

  return (
    <div className="flex min-h-screen text-black p-6 gap-8 bg-white">
      <StockList selectedStock={selectedStock} onSelectStock={setSelectedStock} />
      <main className="flex-grow flex gap-8">
        <div className="flex-1">
          <StockCard symbol={selectedStock} />
        </div>
        <div className="w-[400px]">
          <AIAssistant symbol={selectedStock} />
        </div>
      </main>
    </div>
  );
}
