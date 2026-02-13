import { NextRequest, NextResponse } from "next/server";

const VM_BASE = process.env.AUDIO_VM_URL ?? "http://34.9.51.163/audios";

const ALLOWED_FILES = new Set([
  "audio-01.mpeg",
  "audio-02.mpeg",
  "audio-03.mpeg",
  "audio-04.mpeg",
  "audio-05.mpeg",
  "audio-06.mpeg",
]);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  if (!ALLOWED_FILES.has(filename)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const vmUrl = `${VM_BASE}/${filename}`;

  // Forward Range header for partial content support
  const headers: HeadersInit = {};
  const range = request.headers.get("range");
  if (range) {
    headers["Range"] = range;
  }

  try {
    const upstream = await fetch(vmUrl, { headers });

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "audio/mpeg");
    responseHeaders.set("Accept-Ranges", "bytes");
    responseHeaders.set("Cache-Control", "public, max-age=86400, immutable");

    const contentLength = upstream.headers.get("content-length");
    if (contentLength) responseHeaders.set("Content-Length", contentLength);

    const contentRange = upstream.headers.get("content-range");
    if (contentRange) responseHeaders.set("Content-Range", contentRange);

    return new NextResponse(upstream.body, {
      status: upstream.status,       // 200 or 206
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json(
      { error: "Upstream unavailable" },
      { status: 502 }
    );
  }
}
