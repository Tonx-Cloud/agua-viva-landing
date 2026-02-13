import { Award } from "lucide-react";

const CREDENCIAIS = [
  { texto: "Ex-presidente da ARL (Academia Ribeirão-pretana de Letras)", destaque: "ARL" },
  { texto: "Idealizador, fundador e ex-presidente da ARE (Academia Ribeirão-pretana de Educação)", destaque: "ARE" },
  { texto: "Ex-membro da ALARP; membro da CPERP", destaque: "ALARP / CPERP" },
  { texto: "Ex-membro da UBE e UBT", destaque: "UBE / UBT" },
  { texto: "Membro fundador da ALAJ", destaque: "ALAJ" },
  { texto: "Membro de academias e casas culturais (Anápolis-GO; Pindamonhangaba; Itaperuna etc.)", destaque: "" },
  { texto: "Diretor do Grupo Amigos da Fotografia", destaque: "Amigos da Fotografia" },
];

export default function AuthorSection() {
  return (
    <section
      id="autor"
      className="py-20 sm:py-28 bg-sand-50"
      aria-label="Sobre o autor"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-ocean-600 mb-4">
            <Award size={20} aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-widest">
              O Autor
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-950 mb-6">
            Antonio Carlos Tórtoro
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-ocean-800 leading-relaxed">
            Antonio Carlos Tórtoro constrói sua trajetória em torno da palavra,
            da educação e da cultura. Sua atuação em instituições literárias e
            educacionais reforça um compromisso contínuo com a formação, a
            produção e a valorização do trabalho&nbsp;artístico.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <h3 className="font-serif text-xl font-bold text-ocean-900 mb-6 text-center">
            Credenciais e atuação
          </h3>
          <ul className="space-y-3" role="list">
            {CREDENCIAIS.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-sand-200 hover:shadow-md transition-shadow"
              >
                <span
                  className="mt-1 w-2 h-2 rounded-full bg-gold-500 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-ocean-800 text-base">{item.texto}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Selo / Mini-frase */}
        <div className="text-center mt-14">
          <p className="inline-block font-serif text-lg sm:text-xl text-ocean-900 font-semibold border-t-2 border-b-2 border-gold-500/40 py-3 px-6">
            Literatura, educação e cultura — uma vida dedicada à&nbsp;palavra.
          </p>
        </div>
      </div>
    </section>
  );
}
