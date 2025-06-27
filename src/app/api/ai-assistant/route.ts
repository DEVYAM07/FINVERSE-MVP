import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { symbol } = await req.json();

    if (!symbol) {
      return NextResponse.json({ error: "Missing stock symbol" }, { status: 400 });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions", // or other model host endpoint
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "system",
            content:
              "You're a stock assistant. Provide clear, useful summaries about stocks. give the pros and cons of the stock based on the current market news and thesituation of the company .",
          },
          {
            role: "user",
            content: `Analyze the stock ${symbol}.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 600,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // or your specific Bearer key
          "Content-Type": "application/json",
        },
      }
    );

    const insight = response.data?.choices?.[0]?.message?.content;

    if (!insight) {
      return NextResponse.json({ error: "No response from model" }, { status: 500 });
    }

    return NextResponse.json({ insight });
  } catch (error: unknown) {
  console.error("API Error:", error);
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}

}
