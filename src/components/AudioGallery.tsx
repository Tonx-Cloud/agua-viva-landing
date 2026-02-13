import React from "react";
import { audios, AudioItem } from "@/data/audios";

const AudioCard: React.FC<{ audio: AudioItem }> = ({ audio }) => {
  return (
    <div className="bg-black/50 border border-white/10 rounded-lg p-6 hover:bg-black/70 transition-colors">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">{audio.title}</h3>
        {audio.poem && (
          <p className="text-sm text-gray-400 mb-1">Poema: {audio.poem}</p>
        )}
        <p className="text-sm text-gray-400 mb-2">Voz: {audio.voice}</p>
        <span className="inline-block bg-white/10 text-white text-xs rounded px-2 py-1">
          {audio.duration}
        </span>
      </div>
      <p className="text-gray-300 text-sm mb-4">{audio.note}</p>
      <audio controls className="w-full" preload="none">
        <source src={audio.src} type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </div>
  );
};

export default function AudioGallery() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Água Viva — Edição Lua
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
            Garanta seu exemplar agora e receba também acesso à Edição Lua.
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
