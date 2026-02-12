"use client";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-label="Seção principal"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-950 via-ocean-900 to-ocean-800" />

      {/* Decoração */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-block mb-8">
          <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-400 font-medium border border-gold-400/30 rounded-full px-5 py-2">
            Nova obra poética
          </span>
        </div>

        {/* Título */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-sand-50 mb-6 leading-tight">
          Água-Viva
        </h1>

        {/* Autor */}
        <p className="text-lg sm:text-xl text-sand-300 mb-8 tracking-wide">
          por <span className="text-gold-400 font-semibold">Antônio Carlos Tótoro</span>
        </p>

        {/* Citação */}
        <blockquote className="max-w-2xl mx-auto mb-12">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-sand-100 italic leading-relaxed">
            &ldquo;Poesia é água-viva no mar das produções&nbsp;literárias.&rdquo;
          </p>
        </blockquote>

        {/* Subcitação */}
        <p className="text-sand-300 text-base sm:text-lg mb-12 max-w-xl mx-auto">
          &ldquo;Poesia é bola de cristal, é vidro&nbsp;vivo…&rdquo;
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#comprar"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-gold-500 text-ocean-950 hover:bg-gold-400 transition-all shadow-lg hover:shadow-gold-500/25 hover:-translate-y-0.5"
          >
            Comprar agora
          </a>
          <a
            href="#degustacao"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl border-2 border-sand-300/40 text-sand-100 hover:bg-sand-100/10 transition-all"
          >
            Ler trechos
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-sand-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
