import React from "react";

const audioTracks = [
  "/audio/AUD-20260212-WA0052.mp3",
  "/audio/AUD-20260212-WA0053.mp3",
  "/audio/AUD-20260212-WA0054.mp3",
  "/audio/AUD-20260212-WA0055.mp3",
  "/audio/AUD-20260212-WA0056.mp3",
  "/audio/mariana-declamacao-1.mp3",
];

export default function AudiobookSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
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
        <h3 className="text-2xl font-semibold mb-6">
          🎧 Degustação da Edição Lua
        </h3>
        <p className="text-gray-400 mb-8">
          Feche os olhos por alguns segundos.<br />Deixe a palavra tocar antes de entender.
        </p>
        <div className="space-y-6">
          {audioTracks.map((src, i) => (
            <audio controls className="w-full" key={src}>
              <source src={src} type="audio/mpeg" />
            </audio>
          ))}
        </div>
        <div className="mt-12">
          <p className="text-xl font-semibold mb-4">
            📖 + 🎧 Livro físico + experiência sonora
          </p>
          <p className="text-gray-400">
            Garanta seu exemplar agora e receba também acesso à Edição Lua.
          </p>
        </div>
        <div className="mt-8">
          <span className="inline-block bg-white/10 text-white text-sm rounded px-4 py-2 mr-2 font-semibold tracking-wide">
            ⭐ Exclusivo para leitores
          </span>
          <span className="inline-block bg-white/10 text-white text-sm rounded px-4 py-2 font-semibold tracking-wide">
            🔒 Disponível apenas para quem adquirir o livro
          </span>
        </div>
      </div>
    </section>
  );
}
