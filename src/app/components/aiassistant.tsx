"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface AIAssistantProps {
  symbol: string;
}

export default function AIAssistant({ symbol }: AIAssistantProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchInsight = async () => {
      setLoading(true);
      setError(null);
      setInsight(null);

      try {
        const response = await axios.post("/api/ai-assistant", { symbol });
        const data = response.data;

        if (data.error) {
          setError(data.error);
        } else {
          if (typeof data.insight === "string") {
            setInsight(data.insight);
          }
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInsight();
  }, [symbol]);

  return (
    <div className="bg-white border-2 border-[#ff385c] rounded-2xl shadow-md p-6 max-w-md w-full text-[#111]">
      <h2 className="text-2xl font-bold mb-4 text-[#ff385c]">
        🤖 AI Insight for <span className="underline">{symbol}</span>
      </h2>

      {loading && (
        <div className="flex items-center text-[#ff385c]">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#ff385c]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Generating insight...
        </div>
      )}

      {error && (
        <div className="text-red-500 bg-red-50 border border-red-300 rounded p-3 mt-2 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {insight && (
        <div className="text-black text-sm leading-relaxed mt-2">
          <div dangerouslySetInnerHTML={{ __html: formatInsight(insight) }} />
        </div>
      )}
    </div>
  );
}

// ✅ Type-safe formatter
function formatInsight(text: string): string {
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<span class="text-[#ff385c] font-semibold">$1</span>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/- (.*?)(\n|$)/g, '<li class="text-red-600">$1</li>');

  formatted = formatted.replace(/\n\n/g, '</p><p class="mb-2">');

  if (!formatted.startsWith('<p>')) {
    formatted = '<p class="mb-2">' + formatted + '</p>';
  }

  if (formatted.includes('<li')) {
    formatted = formatted.replace(/(<li[^>]*>.*?<\/li>)/, '<ul class="list-disc pl-5 mb-2">$1</ul>');
  }

  return formatted;
}
