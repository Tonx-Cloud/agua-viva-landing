import { BookOpen, ExternalLink } from "lucide-react";

const DESTAQUES = [
  {
    titulo: "Estrelas no Mar",
    ano: "",
    desc: "Editora Moderna — concorreu ao Prêmio Jabuti",
  },
  {
    titulo: "Ecos",
    ano: "1991",
    desc: "Poesia lírica e introspectiva",
  },
  {
    titulo: "Edelweiss",
    ano: "1992",
    desc: "Versos sobre memória e delicadeza",
  },
  {
    titulo: "Mosaico",
    ano: "2000",
    desc: "Fragmentos poéticos da vida cotidiana",
  },
  {
    titulo: "Antologia Ítalo-Brasileira",
    ano: "2003",
    desc: "Obra coletiva celebrando raízes culturais",
  },
  {
    titulo: "Livro Água Viva",
    ano: "",
    desc: "Poesia que toca, acende e permanece",
  },
];

const OUTRAS = [
  "Arquitetura do Passado — Um Olhar Sobre Ribeirão",
  "Ribeirão Preto — O Passado Manda Lembrança (série)",
  "Outras publicações digitais e artigos",
];

export default function AuthorWorks() {
  return (
    <section
      className="py-20 sm:py-28 bg-gradient-to-b from-sand-50 to-sand-100"
      aria-label="Obras do autor"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Título */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-ocean-600 mb-4">
            <BookOpen size={20} aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-widest">
              Bibliografia
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-950 mb-6">
            Obras do autor
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        {/* Destaques */}
        <div className="mb-16">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-ocean-900 mb-8 text-center">
            Destaques — Principais publicações
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DESTAQUES.map((obra) => (
              <article
                key={obra.titulo}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-sand-200 hover:shadow-lg hover:border-gold-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <h4 className="font-serif text-lg font-bold text-ocean-950 mb-1 group-hover:text-gold-600 transition-colors">
                  {obra.titulo}
                </h4>
                {obra.ano && (
                  <span className="text-xs font-semibold text-gold-600 tracking-wide uppercase">
                    {obra.ano}
                  </span>
                )}
                <p className="text-ocean-600 text-sm mt-2 leading-relaxed">
                  {obra.desc}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Outras obras */}
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="font-serif text-lg font-bold text-ocean-700 mb-5 text-center">
            Outras obras e parcerias
          </h3>
          <ul className="space-y-3" role="list">
            {OUTRAS.map((titulo) => (
              <li
                key={titulo}
                className="flex items-start gap-3 bg-sand-50 rounded-xl p-4 border border-sand-200"
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ocean-400 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-ocean-700 text-sm">{titulo}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Link blog */}
        <div className="text-center">
          <a
            href="https://tortoro.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ocean-700 hover:text-gold-600 font-semibold transition-colors"
          >
            Veja mais no blog oficial
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
