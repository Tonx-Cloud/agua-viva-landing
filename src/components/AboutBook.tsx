import { BookOpen, Heart, Sun, Waves, Flame, Volume2, Clock } from "lucide-react";

const TEMAS = [
  { icone: Clock, titulo: "Vida e tempo", desc: "A urgência do agora" },
  { icone: Sun, titulo: "Fé e esperança", desc: "Luz que não faz barulho" },
  { icone: Heart, titulo: "Amor e memória", desc: "O que fica quando passa" },
  { icone: Waves, titulo: "Mar e imagem", desc: "Poesia como paisagem" },
  { icone: Flame, titulo: "Intensidade", desc: "Sentir sem pedir desculpas" },
  { icone: Volume2, titulo: "Silêncio", desc: "O verso que fala baixinho" },
];

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
            Sobre &ldquo;Água Viva&rdquo;
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg sm:text-xl text-ocean-800 leading-relaxed mb-6 text-center">
            <em>Água Viva</em> é poesia em estado sensível: pequena no tamanho
            de cada verso, grande no que desperta. Uma obra que brinca com a
            transparência, o brilho e a força da palavra — ora suave,
            ora&nbsp;elétrica.
          </p>
          <p className="text-lg sm:text-xl text-ocean-800 leading-relaxed text-center">
            Aqui, a poesia se comporta como o próprio símbolo que dá nome ao
            livro: bela, viva, inesperada. Uma leitura para abrir o dia com
            mais presença — e fechar a noite com mais&nbsp;significado.
          </p>
        </div>

        {/* Cards de temas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto mb-12">
          {TEMAS.map((tema) => {
            const Icone = tema.icone;
            return (
              <div
                key={tema.titulo}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-sand-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <Icone
                  size={24}
                  className="mx-auto mb-3 text-ocean-500"
                  aria-hidden="true"
                />
                <h3 className="font-serif font-bold text-ocean-950 text-base mb-1">
                  {tema.titulo}
                </h3>
                <p className="text-ocean-600 text-sm">{tema.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Mini-destaque */}
        <p className="text-center font-serif text-xl sm:text-2xl text-ocean-900 font-semibold">
          Leitura rápida. Impacto&nbsp;duradouro.
        </p>
        <p className="text-center text-ocean-600 text-base sm:text-lg mt-3 max-w-xl mx-auto leading-relaxed">
          Presente ideal para quem você ama — para aquele amigo culto que
          aprecia poesia e a melhor música&nbsp;brasileira.
        </p>
      </div>
    </section>
  );
}
