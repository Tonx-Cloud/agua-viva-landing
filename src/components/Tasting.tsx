import { Sparkles } from "lucide-react";

const TRECHOS = [
  {
    texto:
      "A água-viva nas mãos é bola de cristal… entre queimar-se ou não…",
    subtitulo: "I",
  },
  {
    texto:
      "A água-viva nas mãos é vidro vivo… é energia natural cativa…",
    subtitulo: "II",
  },
  {
    texto:
      "A água-viva nas mãos é forma de poder… entre torná-la água-morta ou não.",
    subtitulo: "III",
  },
];

export default function Tasting() {
  return (
    <section
      id="degustacao"
      className="py-20 sm:py-28 bg-gradient-to-b from-ocean-950 to-ocean-900"
      aria-label="Trechos do livro"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 mb-4">
            <Sparkles size={20} aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-widest">
              Degustação
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sand-50 mb-6">
            Prove antes de mergulhar
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {TRECHOS.map((trecho) => (
            <article
              key={trecho.subtitulo}
              className="group relative bg-ocean-800/50 backdrop-blur rounded-2xl p-8 border border-ocean-700/40 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ocean-950/50"
            >
              {/* Número do trecho */}
              <span className="absolute -top-4 left-8 bg-gold-500 text-ocean-950 text-xs font-bold px-3 py-1 rounded-full">
                Trecho {trecho.subtitulo}
              </span>

              {/* Aspas decorativas */}
              <span
                className="block font-serif text-6xl text-gold-500/30 leading-none mb-2 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <blockquote>
                <p className="font-serif text-lg sm:text-xl text-sand-100 italic leading-relaxed">
                  {trecho.texto}
                </p>
              </blockquote>

              <div className="mt-6 pt-4 border-t border-ocean-700/40">
                <p className="text-sm text-sand-400">
                  — Antônio Carlos Tótoro
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
