import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedido enviado — Água Viva",
  description: "Sua mensagem foi enviada com sucesso. Em breve o autor entrará em contato.",
};

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ocean-950 to-ocean-900 px-4">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6" aria-hidden="true">
          📖✨
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-50 mb-4">
          Pedido enviado!
        </h1>

        <p className="text-sand-300 text-lg mb-2">
          Recebemos sua mensagem com sucesso.
        </p>
        <p className="text-sand-400 mb-8">
          Em breve entraremos em contato pelo e-mail ou telefone informado
          para combinar os próximos passos.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-2xl bg-gold-500 text-ocean-950 hover:bg-gold-400 transition-all shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5"
        >
          ← Voltar para a página inicial
        </Link>

        <p className="text-sand-600 text-xs mt-8">
          Caso não receba retorno em até 48 horas, verifique sua caixa de spam
          ou envie novamente.
        </p>
      </div>
    </main>
  );
}
