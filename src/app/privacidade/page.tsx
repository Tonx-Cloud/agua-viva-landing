import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade — Livro Água Viva",
  description:
    "Política de Privacidade do site Livro Água Viva, em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-sand-50 py-16 px-4 sm:px-6">
      <article className="mx-auto max-w-3xl prose prose-ocean">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ocean-950 mb-8">
          Política de Privacidade
        </h1>

        <p className="text-sm text-ocean-500 mb-8">
          Última atualização: 20 de abril de 2026
        </p>

        <section>
          <h2>1. Controlador dos dados</h2>
          <p>
            Antonio Carlos Tórtoro (&ldquo;Autor&rdquo;), responsável pelo site{" "}
            <strong>agua-viva-landing.vercel.app</strong> (&ldquo;Site&rdquo;).
          </p>
          <p>
            Contato do encarregado (DPO):{" "}
            <a href="mailto:contato@tortoro.com.br">contato@tortoro.com.br</a>
          </p>
        </section>

        <section>
          <h2>2. Dados coletados</h2>
          <p>Coletamos apenas os dados fornecidos voluntariamente por você:</p>
          <ul>
            <li>
              <strong>Formulário de contato/compra:</strong> nome completo,
              e-mail, cidade/UF e mensagem.
            </li>
            <li>
              <strong>Dados de navegação:</strong> informações anônimas de uso
              coletadas pelo Vercel Analytics (sem cookies, sem dados pessoais
              identificáveis).
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Finalidade e base legal</h2>
          <table>
            <thead>
              <tr>
                <th>Dado</th>
                <th>Finalidade</th>
                <th>Base legal (LGPD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nome, e-mail, cidade</td>
                <td>Responder pedidos de compra e contato</td>
                <td>Consentimento (art. 7º, I)</td>
              </tr>
              <tr>
                <td>Mensagem</td>
                <td>Atender solicitação do titular</td>
                <td>Execução de contrato (art. 7º, V)</td>
              </tr>
              <tr>
                <td>Dados de navegação</td>
                <td>Melhorar a experiência do site</td>
                <td>Interesse legítimo (art. 7º, IX)</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>4. Compartilhamento de dados</h2>
          <p>
            Seus dados pessoais <strong>não são vendidos nem compartilhados</strong>{" "}
            com terceiros, exceto:
          </p>
          <ul>
            <li>
              <strong>Vercel:</strong> hospedagem do site (dados de navegação
              anônimos).
            </li>
            <li>
              <strong>Provedor de e-mail:</strong> envio do formulário de
              contato ao autor.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Retenção dos dados</h2>
          <p>
            Os dados do formulário são mantidos pelo tempo necessário para
            atender sua solicitação e, após, eliminados. Não mantemos banco de
            dados de clientes no site.
          </p>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>
            Este site <strong>não utiliza cookies</strong> de rastreamento. O
            Vercel Analytics opera sem cookies, em conformidade com a LGPD.
          </p>
        </section>

        <section>
          <h2>7. Seus direitos (art. 18 da LGPD)</h2>
          <p>Você pode, a qualquer momento, solicitar:</p>
          <ul>
            <li>Confirmação da existência de tratamento;</li>
            <li>Acesso, correção ou eliminação dos seus dados;</li>
            <li>Informação sobre compartilhamento;</li>
            <li>Revogação do consentimento;</li>
            <li>Portabilidade dos dados.</li>
          </ul>
          <p>
            Para exercer seus direitos, entre em contato pelo e-mail{" "}
            <a href="mailto:contato@tortoro.com.br">contato@tortoro.com.br</a>.
          </p>
        </section>

        <section>
          <h2>8. Segurança</h2>
          <p>
            Adotamos medidas técnicas (HTTPS, CSP, HSTS) e organizacionais para
            proteger seus dados contra acesso não autorizado, perda ou
            destruição.
          </p>
        </section>

        <section>
          <h2>9. Alterações nesta política</h2>
          <p>
            Esta política pode ser atualizada. A data de última atualização será
            sempre indicada no topo da página.
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
