import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export const config = {
  matcher: [
    /*
     * Match all routes EXCEPT:
     * - _next/static, _next/image, favicon.ico, sitemap.xml, robots.txt
     * - arquivos estáticos com extensão (svg, png, jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

type Bucket = { tokens: number; last: number };
const buckets = new Map<string, Bucket>();

const RATE = 30; // tokens por janela
const WINDOW = 60_000; // 1 minuto
const BURST = 30; // capacidade máxima
const GC_INTERVAL = 5 * 60_000; // limpeza a cada 5 min
const GC_MAX_AGE = 10 * 60_000; // remove buckets inativos há 10 min
let lastGc = Date.now();

function getIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff?.split(",")[0] ?? "unknown").trim();
}

/** Rate limiting apenas para rotas /api/* */
function rateLimit(req: NextRequest): NextResponse | null {
  if (!req.nextUrl.pathname.startsWith("/api/")) return null;

  const ip = getIp(req);
  const now = Date.now();

  // Garbage collection periódico
  if (now - lastGc > GC_INTERVAL) {
    lastGc = now;
    for (const [key, val] of buckets) {
      if (now - val.last > GC_MAX_AGE) buckets.delete(key);
    }
  }

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
  return null;
}

export async function middleware(req: NextRequest) {
  // 1. Rate limiting para APIs
  const rateLimited = rateLimit(req);
  if (rateLimited) return rateLimited;

  // 2. Refresh de sessão Supabase (mantém cookies válidos)
  return await updateSession(req);
}
