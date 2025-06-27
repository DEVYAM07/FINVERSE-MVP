"use client";

import React from "react";
import Navbar from "../components/navbar";

export default function RootLayout({ children}: {children: React.ReactNode;})
   {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="pt-4">{children}</main>
      </body>
    </html>
  );
}

