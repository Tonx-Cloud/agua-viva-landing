"use client";

import React, { useState } from "react";
import { audios, AudioItem } from "@/data/audios";

const AudioCard: React.FC<{ audio: AudioItem }> = ({ audio }) => {
  const [error, setError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="bg-black/50 border border-white/10 rounded-lg p-6 hover:bg-black/70 transition-colors flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">{audio.title}</h3>
        {audio.poem && audio.poem !== "(não identificado)" && (
          <p className="text-sm text-gray-400 mb-1">
            Poema: <span className="text-white/80 italic">{audio.poem}</span>
          </p>
        )}
        {audio.author && audio.author !== "(não identificado)" && (
          <p className="text-sm text-gray-400 mb-1">
            Autor: <span className="text-white/70">{audio.author}</span>
          </p>
        )}

        <span className="inline-block bg-white/10 text-white text-xs rounded px-2 py-1">
          {audio.duration}
        </span>
      </div>
      <p className="text-gray-300 text-sm mb-3 flex-grow">{audio.note}</p>
      {audio.transcriptPreview && (
        <div className="mb-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2"
          >
            {showPreview ? "Ocultar trecho" : "Ver trecho do poema"}
          </button>
          {showPreview && (
            <p className="text-gray-400 text-xs mt-2 italic leading-relaxed border-l-2 border-white/10 pl-3">
              &ldquo;{audio.transcriptPreview}&rdquo;
            </p>
          )}
        </div>
      )}
      {error ? (
        <p className="text-red-400 text-sm">Áudio temporariamente indisponível.</p>
      ) : (
        <audio controls preload="none" className="w-full" onError={() => setError(true)}>
          <source src={audio.src} type="audio/mpeg" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
      )}
    </div>
  );
};

export default function AudioGallery() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Livro Água Viva — Edição Audiobook
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Há versos que precisam ser lidos.<br />E há versos que precisam ser ouvidos.
          </p>
          <p className="text-lg text-gray-400 mb-12">
            Todos que adquirirem <strong>Água Viva</strong> receberão acesso
            exclusivo ao audiobook oficial — uma interpretação intimista,
            com cadência suave e presença emocional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {audios.map((audio) => (
            <AudioCard key={audio.id} audio={audio} />
          ))}
        </div>

        <div className="text-center">
          <p className="text-xl font-semibold mb-4">
            📖 + 🎧 Livro físico + experiência sonora
          </p>
          <p className="text-gray-400">
            Garanta seu exemplar agora e receba também acesso ao audiobook.
          </p>
          <div className="mt-8">
            <span className="inline-block bg-white/10 text-white text-sm rounded px-4 py-2 mr-2 font-semibold tracking-wide">
              ⭐ Exclusivo para leitores
            </span>
            <span className="inline-block bg-white/10 text-white text-sm rounded px-4 py-2 font-semibold tracking-wide">
              🔒 Disponível apenas para quem adquirir o livro
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
