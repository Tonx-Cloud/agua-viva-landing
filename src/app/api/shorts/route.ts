import { NextResponse } from "next/server";
import { extractShortIds } from "@/lib/shorts";

const CHANNEL_SHORTS_URL =
  "https://www.youtube.com/@antoniocarlostortoro2031/shorts";

const JINA_URLS = [
  `https://r.jina.ai/http://www.youtube.com/@antoniocarlostortoro2031/shorts`,
  `https://r.jina.ai/https://www.youtube.com/@antoniocarlostortoro2031/shorts`,
];

export const revalidate = 3600; // revalidar a cada 1 hora

export async function GET() {
  let ids: string[] = [];

  for (const url of JINA_URLS) {
    try {
      const res = await fetch(url, {
        headers: {
          Accept: "text/html",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) continue;

      const text = await res.text();
      ids = extractShortIds(text);

      if (ids.length > 0) break;
    } catch {
      continue;
    }
  }

  // Limitar a 12 vídeos
  const shorts = ids.slice(0, 12);

  return NextResponse.json({
    ids: shorts,
    channelUrl: CHANNEL_SHORTS_URL,
    source: shorts.length > 0 ? "jina" : "fallback",
  });
}
