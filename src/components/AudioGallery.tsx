"use client";

import React, { useState } from "react";
import { audios, AudioItem } from "@/data/audios";

const AudioCard: React.FC<{ audio: AudioItem }> = ({ audio }) => {
  const [error, setError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-4 hover:bg-black/55 transition-colors flex flex-col backdrop-blur-sm">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white mb-1">{audio.title}</h3>
        {audio.poem && audio.poem !== "(não identificado)" && (
          <p className="text-xs text-gray-400 mb-1">
            Poema: <span className="text-white/80 italic">{audio.poem}</span>
          </p>
        )}
        {audio.author && audio.author !== "(não identificado)" && (
          <p className="text-xs text-gray-400 mb-1">
            Autor: <span className="text-white/70">{audio.author}</span>
          </p>
        )}

        <span className="inline-block bg-white/10 text-white text-xs rounded px-2 py-0.5">
          {audio.duration}
        </span>
      </div>
      <p className="text-gray-300 text-xs mb-2 flex-grow line-clamp-3">{audio.note}</p>
      {audio.transcriptPreview && (
        <div className="mb-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-xs text-gray-400 hover:text-gray-200 transition-colors underline underline-offset-2"
          >
            {showPreview ? "Ocultar trecho" : "Ver trecho do poema"}
          </button>
          {showPreview && (
            <p className="text-gray-400 text-xs mt-2 italic leading-relaxed border-l-2 border-white/10 pl-3 line-clamp-4">
              &ldquo;{audio.transcriptPreview}&rdquo;
            </p>
          )}
        </div>
      )}
      {error ? (
        <p className="text-red-400 text-xs">Áudio temporariamente indisponível.</p>
      ) : (
        <audio controls preload="none" className="w-full h-8" onError={() => setError(true)}>
          <source src={audio.src} type="audio/mpeg" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
      )}
    </div>
  );
};

export default function AudioGallery() {
  return (
    <section className="relative overflow-hidden min-h-[70vh] md:min-h-[80vh] text-white">
      {/* Vídeo de fundo — luau (fogueira + mar) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/degustacao-luau.webm" type="video/webm" />
        <source src="/videos/degustacao-luau.mp4" type="video/mp4" />
      </video>

      {/* Overlay para legibilidade — "noite bonita" */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:py-20">
        {/* Glass panel */}
        <div className="rounded-3xl border border-white/15 bg-white/[0.08] backdrop-blur-md shadow-2xl p-5 sm:p-8 md:p-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-5">
              Livro Água Viva — Edição Audiobook
            </h2>
            <p className="text-base sm:text-lg text-gray-200 mb-6">
              Há versos que precisam ser lidos.<br />E há versos que precisam ser ouvidos.
            </p>
            <p className="text-sm sm:text-base text-gray-300 mb-0 max-w-2xl mx-auto">
              Todos que adquirirem <strong>Água Viva</strong> receberão acesso
              exclusivo ao audiobook oficial — uma interpretação intimista,
              com cadência suave e presença emocional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
            {audios.map((audio) => (
              <AudioCard key={audio.id} audio={audio} />
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold mb-3">
              📖 + 🎧 Livro físico + experiência sonora
            </p>
            <p className="text-gray-300 text-sm">
              Garanta seu exemplar agora e receba também acesso ao audiobook.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="inline-block bg-white/10 text-white text-xs rounded px-3 py-1.5 font-semibold tracking-wide">
                ⭐ Exclusivo para leitores
              </span>
              <span className="inline-block bg-white/10 text-white text-xs rounded px-3 py-1.5 font-semibold tracking-wide">
                🔒 Disponível apenas para quem adquirir o livro
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
