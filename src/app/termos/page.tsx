import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso — Livro Água Viva",
  description:
    "Termos de Uso do site Livro Água Viva de Antonio Carlos Tórtoro.",
};

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-sand-50 py-16 px-4 sm:px-6">
      <article className="mx-auto max-w-3xl prose prose-ocean">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ocean-950 mb-8">
          Termos de Uso
        </h1>

        <p className="text-sm text-ocean-500 mb-8">
          Última atualização: 20 de abril de 2026
        </p>

        <section>
          <h2>1. Aceitação</h2>
          <p>
            Ao acessar e utilizar o site{" "}
            <strong>agua-viva-landing.vercel.app</strong> (&ldquo;Site&rdquo;),
            você concorda com estes Termos de Uso. Caso não concorde, por favor
            não utilize o Site.
          </p>
        </section>

        <section>
          <h2>2. Uso aceitável</h2>
          <p>Você se compromete a utilizar o Site apenas para fins legítimos. É proibido:</p>
          <ul>
            <li>Copiar, reproduzir ou distribuir conteúdo sem autorização;</li>
            <li>Tentar acessar áreas restritas ou interferir no funcionamento;</li>
            <li>Utilizar o Site para fins ilegais ou prejudiciais.</li>
          </ul>
        </section>

        <section>
          <h2>3. Propriedade intelectual</h2>
          <p>
            Todo o conteúdo do Site — textos, poemas, áudios, vídeos, imagens e
            design — é de propriedade exclusiva de{" "}
            <strong>Antonio Carlos Tórtoro</strong> e está protegido pela Lei de
            Direitos Autorais (Lei 9.610/1998). A reprodução, total ou parcial,
            sem autorização expressa do autor, é proibida.
          </p>
        </section>

        <section>
          <h2>4. Compras e contato</h2>
          <p>
            O Site oferece um formulário para contato e interesse de compra do
            livro &ldquo;Água Viva&rdquo;. O envio do formulário não constitui
            contrato de compra. A finalização do pedido ocorre diretamente com o
            autor, por e-mail ou WhatsApp, após combinação de valores, forma de
            pagamento e entrega.
          </p>
        </section>

        <section>
          <h2>5. Responsabilidade</h2>
          <p>
            O autor se empenha em manter o Site funcionando e atualizado, mas não
            garante disponibilidade ininterrupta. O Site é fornecido &ldquo;como
            está&rdquo;, sem garantias de qualquer natureza além das previstas em
            lei.
          </p>
        </section>

        <section>
          <h2>6. Privacidade</h2>
          <p>
            O tratamento de dados pessoais é regido pela nossa{" "}
            <Link href="/privacidade" className="text-ocean-600 underline">
              Política de Privacidade
            </Link>
            , em conformidade com a LGPD (Lei 13.709/2018) e o Marco Civil da
            Internet (Lei 12.965/2014).
          </p>
        </section>

        <section>
          <h2>7. Rescisão</h2>
          <p>
            O autor reserva-se o direito de restringir o acesso ao Site a
            qualquer momento, sem aviso prévio, em caso de violação destes
            Termos.
          </p>
        </section>

        <section>
          <h2>8. Alterações</h2>
          <p>
            Estes Termos podem ser atualizados a qualquer momento. A data de
            última atualização será sempre indicada no topo da página.
          </p>
        </section>

        <section>
          <h2>9. Foro</h2>
          <p>
            Fica eleito o foro da Comarca de Ribeirão Preto — SP para dirimir
            quaisquer questões decorrentes destes Termos, com renúncia a
            qualquer outro, por mais privilegiado que seja.
          </p>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-ocean-600 hover:text-ocean-800 underline text-sm"
          >
            ← Voltar ao site
          </Link>
        </div>
      </article>
    </main>
  );
}
