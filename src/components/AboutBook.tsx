import { BookOpen } from "lucide-react";

export default function AboutBook() {
  return (
    <section
      id="livro"
      className="py-20 sm:py-28 bg-sand-50"
      aria-label="Sobre o livro"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-ocean-600 mb-4">
            <BookOpen size={20} aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-widest">
              O Livro
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-950 mb-6">
            Uma obra que pulsa
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl text-ocean-800 leading-relaxed mb-6 text-center">
            <strong className="text-ocean-950">Água-Viva</strong> é poesia que
            queima e ilumina. Uma coleção que nos convida a segurar nas mãos
            aquilo que é, ao mesmo tempo, belo e perigoso — como a própria
            experiência de viver e sentir.
          </p>
          <p className="text-lg sm:text-xl text-ocean-800 leading-relaxed text-center">
            Em versos precisos e imagens deslumbrantes, Antônio Carlos Tótoro
            transforma a água-viva em metáfora do poder da poesia: transparente,
            fluida, luminosa — mas capaz de marcar para&nbsp;sempre.
          </p>
        </div>
      </div>
    </section>
  );
}
