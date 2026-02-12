import { Award } from "lucide-react";

const CREDENCIAIS = [
  "Ex-presidente da ARL (Academia Ribeirão-pretana de Letras)",
  "Idealizador, fundador e ex-presidente da ARE (Academia Ribeirão-pretana de Educação)",
  "Ex-membro da ALARP; membro da CPERP",
  "Ex-membro da UBE e UBT",
  "Membro fundador da ALAJ",
  "Membro de academias e casas culturais (Anápolis-GO; Pindamonhangaba; Itaperuna etc.)",
  "Diretor do Grupo Amigos da Fotografia",
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
            Antônio Carlos Tótoro
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-ocean-800 leading-relaxed">
            Poeta, educador e líder cultural com décadas de atuação
            em instituições literárias e acadêmicas.
            Uma vida dedicada às letras e à cultura brasileira.
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
                <span className="text-ocean-800 text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
