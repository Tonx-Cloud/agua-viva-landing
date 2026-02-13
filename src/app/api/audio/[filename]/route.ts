import { NextRequest, NextResponse } from "next/server";

/* ─── Configuração ─────────────────────────────────────────── */

const VM_BASE_RAW = process.env.AUDIO_VM_URL?.trim();

if (!VM_BASE_RAW) {
  console.warn(
    "[audio-proxy] AUDIO_VM_URL não definida — requisições de áudio falharão."
  );
}

// Alerta se não for HTTPS (manter compatibilidade, mas recomendar migração)
if (VM_BASE_RAW?.startsWith("http://")) {
  console.warn(
    "[audio-proxy] ⚠️  AUDIO_VM_URL usa HTTP. Migre para HTTPS assim que possível."
  );
}

const BACKEND_TOKEN = process.env.AUDIO_BACKEND_TOKEN?.trim();

if (!BACKEND_TOKEN) {
  console.warn(
    "[audio-proxy] AUDIO_BACKEND_TOKEN não definida — requisições para a VM serão rejeitadas pelo backend."
  );
}

const ALLOWED_FILES = new Set([
  "audio-01.mpeg",
  "audio-02.mpeg",
  "audio-03.mpeg",
  "audio-04.mpeg",
  "audio-05.mpeg",
  "audio-06.mpeg",
]);

const TIMEOUT_MS = 15_000;        // 15 segundos
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB

/* ─── Helpers ──────────────────────────────────────────────── */

/** Constrói URL segura evitando path-traversal e SSRF */
function buildSafeUrl(filename: string): string | null {
  if (!VM_BASE_RAW) return null;

  // Rejeita qualquer tentativa de path-traversal
  if (filename.includes("/") || filename.includes("\\") || filename.includes("..")) {
    return null;
  }

  try {
    // Garante que a base termine com /
    const base = VM_BASE_RAW.endsWith("/") ? VM_BASE_RAW : `${VM_BASE_RAW}/`;
    const url = new URL(filename, base);

    // Verifica que a URL construída ainda pertence ao host original
    const baseUrl = new URL(base);
    if (url.origin !== baseUrl.origin) return null;

    return url.href;
  } catch {
    return null;
  }
}

/** Limita a leitura de um stream a maxBytes */
function limitedStream(
  body: ReadableStream<Uint8Array>,
  maxBytes: number
): ReadableStream<Uint8Array> {
  let received = 0;
  const reader = body.getReader();

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      received += value.byteLength;
      if (received > maxBytes) {
        controller.error(new Error("Upstream payload too large"));
        reader.cancel();
        return;
      }
      controller.enqueue(value);
    },
    cancel() {
      reader.cancel();
    },
  });
}

/* ─── Handler ──────────────────────────────────────────────── */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // 1. Whitelist de arquivos permitidos
  if (!ALLOWED_FILES.has(filename)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 2. Construção segura da URL (anti-SSRF)
  const vmUrl = buildSafeUrl(filename);
  if (!vmUrl) {
    return NextResponse.json(
      { error: "Audio service unavailable" },
      { status: 503 }
    );
  }

  // 3. Headers para upstream
  const upstreamHeaders: HeadersInit = {};

  // Forward Range header para streaming parcial
  const range = request.headers.get("range");
  if (range) {
    upstreamHeaders["Range"] = range;
  }

  // Token de autenticação Vercel → VM
  if (BACKEND_TOKEN) {
    upstreamHeaders["x-origin-token"] = BACKEND_TOKEN;
  }

  // 4. AbortController com timeout de 15s
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(vmUrl, {
      headers: upstreamHeaders,
      signal: controller.signal,
      redirect: "manual",           // Bloqueia redirecionamentos (anti-SSRF)
    });

    clearTimeout(timeoutId);

    // 5. Rejeita redirecionamentos (opaque-redirect ou 3xx)
    if (upstream.status >= 300 && upstream.status < 400) {
      return NextResponse.json(
        { error: "Upstream redirect blocked" },
        { status: 502 }
      );
    }

    // Se upstream retornou erro, propaga
    if (!upstream.ok && upstream.status !== 206) {
      return NextResponse.json(
        { error: "Upstream error" },
        { status: upstream.status >= 500 ? 502 : upstream.status }
      );
    }

    // 6. Verificar Content-Length contra limite
    const contentLengthHeader = upstream.headers.get("content-length");
    const contentLength = contentLengthHeader ? parseInt(contentLengthHeader, 10) : null;

    if (contentLength !== null && contentLength > MAX_BYTES) {
      // Abortar — arquivo grande demais
      upstream.body?.cancel();
      return NextResponse.json(
        { error: "Payload too large" },
        { status: 413 }
      );
    }

    // 7. Response headers seguros
    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "audio/mpeg");
    responseHeaders.set("X-Content-Type-Options", "nosniff");
    responseHeaders.set("Accept-Ranges", "bytes");
    responseHeaders.set("Cache-Control", "public, max-age=86400, immutable");
    responseHeaders.set("Content-Disposition", "inline");

    if (contentLengthHeader) {
      responseHeaders.set("Content-Length", contentLengthHeader);
    }

    const contentRange = upstream.headers.get("content-range");
    if (contentRange) {
      responseHeaders.set("Content-Range", contentRange);
    }

    // 8. Stream com limite de tamanho (proteção quando Content-Length ausente)
    let responseBody: ReadableStream<Uint8Array> | null = upstream.body;
    if (responseBody && contentLength === null) {
      responseBody = limitedStream(responseBody, MAX_BYTES) as ReadableStream<Uint8Array>;
    }

    return new NextResponse(responseBody, {
      status: upstream.status, // 200 ou 206
      headers: responseHeaders,
    });
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json(
        { error: "Upstream timeout" },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Upstream unavailable" },
      { status: 502 }
    );
  }
}
