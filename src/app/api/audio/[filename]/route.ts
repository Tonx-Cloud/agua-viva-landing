import { NextRequest, NextResponse } from "next/server";

/* ─── Configuração ─────────────────────────────────────────── */

const SUPABASE_PROJECT_REF = "ibwecmqihluczufnjnur";
const SUPABASE_BUCKET = "audios";
const SUPABASE_STORAGE_URL = `https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/${SUPABASE_BUCKET}`;

const ALLOWED_FILES = new Set([
  "audio-01.mpeg",
  "audio-02.mpeg",
  "audio-03.mpeg",
  "audio-04.mpeg",
  "audio-05.mpeg",
  "audio-06.mpeg",
]);

/* ─── Handler ──────────────────────────────────────────────── */

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // 1. Whitelist de arquivos permitidos
  if (!ALLOWED_FILES.has(filename)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 2. Redireciona para URL pública do Supabase Storage (CDN)
  const publicUrl = `${SUPABASE_STORAGE_URL}/${filename}`;

  return NextResponse.redirect(publicUrl, {
    status: 302,
    headers: {
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
