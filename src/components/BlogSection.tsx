import { ExternalLink, PenLine } from "lucide-react";

const BLOG_URL = "https://tortoro.com.br/";

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="py-20 sm:py-28 bg-sand-100"
      aria-label="Blog do autor"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-ocean-600 mb-4">
            <PenLine size={20} aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-widest">
              Blog
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-950 mb-6">
            Acompanhe o autor diariamente
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-lg text-ocean-800 leading-relaxed mb-4">
            A poesia de Antônio Carlos Tótoro não vive apenas nos livros.
            Ela continua, respira e se renova em seu blog diário — um espaço
            onde reflexões, versos e pensamentos ganham forma&nbsp;constante.
          </p>
          <p className="text-ocean-600 leading-relaxed">
            Se você aprecia literatura que dialoga com o cotidiano, vale
            acompanhar o autor além das páginas de{" "}
            <em className="text-ocean-800">Água-Viva</em>.
          </p>
        </div>

        {/* Card destaque do blog */}
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-sand-200 overflow-hidden">
          <div className="border-l-4 border-gold-500 p-6 sm:p-8">
            <p className="text-sm font-semibold text-ocean-600 uppercase tracking-widest mb-3">
              Blog oficial do autor
            </p>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-serif text-xl sm:text-2xl text-ocean-700 hover:text-ocean-900 font-bold transition-colors break-all"
            >
              tortoro.com.br
            </a>
            <p className="text-sand-600 text-sm mt-3">
              Publicações diárias — reflexões, versos e pensamentos.
            </p>
          </div>
        </div>

        {/* Botão */}
        <div className="text-center mt-10">
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-ocean-800 text-sand-50 hover:bg-ocean-900 transition-all shadow-lg hover:-translate-y-0.5"
          >
            <ExternalLink size={18} aria-hidden="true" />
            Visitar o blog
          </a>
        </div>
      </div>
    </section>
  );
}
