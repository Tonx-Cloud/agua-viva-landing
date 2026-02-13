import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/api/:path*"],
};

type Bucket = { tokens: number; last: number };
const buckets = new Map<string, Bucket>();

const RATE = 30; // tokens por janela
const WINDOW = 60_000; // 1 minuto
const BURST = 30; // capacidade máxima

function getIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff?.split(",")[0] ?? "unknown").trim();
}

export function middleware(req: NextRequest) {
  const ip = getIp(req);
  const now = Date.now();

  const b = buckets.get(ip) ?? { tokens: BURST, last: now };
  const elapsed = now - b.last;
  const refill = (elapsed / WINDOW) * RATE;

  b.tokens = Math.min(BURST, b.tokens + refill);
  b.last = now;

  if (b.tokens < 1) {
    return NextResponse.json(
      { error: "Too Many Requests" },
      { status: 429 }
    );
  }

  b.tokens -= 1;
  buckets.set(ip, b);

  return NextResponse.next();
}
