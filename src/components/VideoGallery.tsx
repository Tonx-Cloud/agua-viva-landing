"use client";

import { useEffect, useState, useCallback } from "react";
import { Play, ExternalLink, ClipboardPaste } from "lucide-react";
import { extractIdsFromUrls } from "@/lib/shorts";

interface ShortsData {
  ids: string[];
  channelUrl: string;
  source: string;
}

export default function VideoGallery() {
  const [data, setData] = useState<ShortsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [manualIds, setManualIds] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/shorts")
      .then((res) => res.json())
      .then((json: ShortsData) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleManualParse = useCallback(() => {
    const ids = extractIdsFromUrls(manualInput);
    setManualIds(ids);
  }, [manualInput]);

  const videoIds =
    data && data.ids.length > 0
      ? data.ids
      : manualIds.length > 0
        ? manualIds
        : [];

  const channelUrl =
    data?.channelUrl ||
    "https://www.youtube.com/@antoniocarlostortoro2031/shorts";

  return (
    <section
      id="videos"
      className="py-20 sm:py-28 bg-sand-100"
      aria-label="Vídeos musicados"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-ocean-600 mb-4">
            <Play size={20} aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-widest">
              Vídeos Musicados
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-950 mb-6">
            Vídeos musicados — poesia em movimento
          </h2>
          <p className="text-ocean-700 text-lg max-w-2xl mx-auto mb-4">
            Assista aos poemas musicados diretamente aqui no site. Uma forma
            diferente de entrar no universo do livro: pelo ritmo, pela imagem
            e pela voz do&nbsp;verso.
          </p>
          <p className="font-serif text-ocean-600 italic text-base">
            Dê play — e deixe a poesia encontrar&nbsp;você.
          </p>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-6" />
        </div>

        {loading && (
          <div className="flex justify-center py-12" role="status">
            <div className="w-10 h-10 border-4 border-ocean-200 border-t-ocean-600 rounded-full animate-spin" />
            <span className="sr-only">Carregando vídeos…</span>
          </div>
        )}

        {!loading && videoIds.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videoIds.map((id) => (
              <div
                key={id}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg bg-ocean-100 hover:shadow-xl transition-shadow"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`Short do autor — ${id}`}
                  loading="lazy"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ))}
          </div>
        )}

        {/* Fallback: sem vídeos carregados */}
        {!loading && videoIds.length === 0 && (
          <div className="text-center space-y-6">
            {(error || (data && data.ids.length === 0)) && (
              <>
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg"
                >
                  <ExternalLink size={18} aria-hidden="true" />
                  Abrir Shorts no YouTube
                </a>

                <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-2xl shadow border border-sand-200">
                  <label
                    htmlFor="manual-shorts"
                    className="flex items-center gap-2 text-sm font-semibold text-ocean-800 mb-3"
                  >
                    <ClipboardPaste size={16} aria-hidden="true" />
                    Cole links de Shorts aqui
                  </label>
                  <textarea
                    id="manual-shorts"
                    rows={4}
                    className="w-full rounded-lg border border-sand-300 p-3 text-sm text-ocean-900 focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 resize-none"
                    placeholder="Cole aqui os links dos Shorts, um por linha..."
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                  />
                  <button
                    onClick={handleManualParse}
                    className="mt-3 w-full py-2.5 bg-ocean-600 text-white rounded-lg font-medium hover:bg-ocean-700 transition-colors"
                  >
                    Carregar vídeos
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Link para o canal */}
        <div className="text-center mt-12">
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ocean-600 hover:text-ocean-800 font-medium transition-colors"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Ver todos no canal do YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
