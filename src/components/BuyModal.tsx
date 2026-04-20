"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  FileText,
  Smartphone,
  BookOpen,
  Check,
  Loader2,
  Star,
} from "lucide-react";

const OBRIGADO_URL = "/obrigado";

const PLANOS = [
  {
    icone: FileText,
    titulo: "PDF do Livro",
    preco: "R$ 29",
    destaque: false,
    features: [
      "Versão digital em PDF",
      "Leitura em celular, tablet ou PC",
      "Acesso imediato após confirmação",
    ],
  },
  {
    icone: Smartphone,
    titulo: "Água Viva Play",
    preco: "R$ 98",
    destaque: true,
    badge: "Mais popular",
    features: [
      "Aplicativo PWA interativo",
      "Poemas declamados em áudio",
      "Leitura assistida",
      "Vídeos e poemas musicados",
      "Navegação prática entre poemas",
    ],
  },
  {
    icone: BookOpen,
    titulo: "Edição Premium",
    subtitulo: "de Luxo",
    preco: "R$ 297",
    destaque: false,
    features: [
      "Livro físico encadernado, capa dura",
      "Acabamento artesanal de luxo",
      "Dedicatória exclusiva do autor",
      "Acesso ao Água Viva Play incluso",
      "Produção sob demanda (2–3 semanas)",
      "Frete por conta do comprador",
    ],
  },
];

export default function BuyModal() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  // Resetar estado ao fechar
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setError("");
      setSending(false);
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      {/* Seção CTA Comprar */}
      <div id="comprar" className="py-12 sm:py-20 md:py-28 bg-linear-to-b from-ocean-900 to-ocean-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-sand-50 mb-2 sm:mb-3">
              Leve &ldquo;Água Viva&rdquo; com você
            </h2>
            <p className="text-sand-300 text-sm sm:text-lg max-w-xl mx-auto">
              Escolha a experiência que mais combina com você e fale
              diretamente com o autor.
            </p>
          </div>

          {/* Cards de preço */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10 max-w-4xl mx-auto items-stretch">
            {PLANOS.map((plano) => {
              const Icone = plano.icone;
              return (
                <div
                  key={plano.titulo}
                  className={`relative rounded-2xl p-5 sm:p-6 text-center border transition-all flex flex-col ${
                    plano.destaque
                      ? "bg-ocean-800 border-gold-500/60 shadow-lg shadow-gold-500/10 scale-[1.03] sm:scale-105"
                      : "bg-ocean-800/50 border-ocean-700/40 hover:border-gold-500/30"
                  }`}
                >
                  {plano.destaque && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-gold-500 text-ocean-950 text-xs font-bold px-3 py-1 rounded-full">
                      <Star size={12} aria-hidden="true" />
                      {plano.badge}
                    </span>
                  )}
                  <Icone
                    size={28}
                    className="mx-auto mb-2 text-gold-400"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif font-bold text-sand-50 text-base sm:text-lg leading-tight">
                    {plano.titulo}
                  </h3>
                  {"subtitulo" in plano && plano.subtitulo && (
                    <span className="text-gold-400 text-xs font-semibold">
                      {plano.subtitulo}
                    </span>
                  )}
                  <p className="text-3xl sm:text-4xl font-bold text-sand-50 mt-3 mb-4">
                    {plano.preco}
                  </p>
                  <ul className="text-left space-y-2 mb-5 flex-1">
                    {plano.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sand-300 text-xs sm:text-sm"
                      >
                        <Check
                          size={16}
                          className="text-gold-400 mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={openModal}
                    className={`w-full py-2.5 rounded-xl font-bold text-sm transition-colors ${
                      plano.destaque
                        ? "bg-gold-500 text-ocean-950 hover:bg-gold-400"
                        : "bg-ocean-700/60 text-sand-100 hover:bg-ocean-600/60"
                    }`}
                  >
                    Quero este
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-sand-400 text-xs sm:text-sm max-w-md mx-auto">
              Escolha a opção que mais combina com você, clique em
              &ldquo;Quero este&rdquo; e envie sua mensagem diretamente ao
              autor para finalizar o pedido.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-100 m-auto max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-0 bg-transparent backdrop:bg-ocean-950/80 backdrop:backdrop-blur-sm"
        aria-label="Formulário de compra"
      >
        <div className="bg-white rounded-3xl p-6 sm:p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-ocean-400 hover:text-ocean-700 transition-colors p-1"
              aria-label="Fechar formulário"
            >
              <X size={24} />
            </button>

            <h3 className="font-serif text-2xl font-bold text-ocean-950 mb-2">
              Pedido / Contato — Livro Água Viva
            </h3>
            <p className="text-ocean-600 text-sm mb-6">
              Preencha seus dados e envie sua mensagem diretamente ao&nbsp;autor.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                setSending(true);
                const fd = new FormData(e.currentTarget);
                const body = Object.fromEntries(fd.entries());
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                  });
                  if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    throw new Error(data.error || "Erro ao enviar");
                  }
                  globalThis.location.href = OBRIGADO_URL;
                } catch (err: unknown) {
                  setSending(false);
                  setError(err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.");
                }
              }}
              className="space-y-4"
            >
              {/* Honey-pot anti-spam (hidden) */}
              <input
                type="text"
                name="_honey"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Nome */}
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-semibold text-ocean-800 mb-1"
                >
                  Nome completo <span className="text-red-500">*</span>
                </label>
                <input
                  id="nome"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              {/* E-mail */}
              <div>
                <label
                  htmlFor="email-campo"
                  className="block text-sm font-semibold text-ocean-800 mb-1"
                >
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  id="email-campo"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              {/* Cidade / UF */}
              <div>
                <label
                  htmlFor="cidade"
                  className="block text-sm font-semibold text-ocean-800 mb-1"
                >
                  Cidade / UF{" "}
                  <span className="text-ocean-400 font-normal">(opcional)</span>
                </label>
                <input
                  id="cidade"
                  name="city"
                  type="text"
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
                  placeholder="Ex.: Ribeirão Preto - SP"
                />
              </div>

              {/* Mensagem */}
              <div>
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-semibold text-ocean-800 mb-1"
                >
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="mensagem"
                  name="message"
                  rows={4}
                  required
                  defaultValue={`Olá! Quero comprar o livro Água Viva.\nGostaria de informações sobre valor, entrega e dedicatória.\nObrigado!`}
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors resize-none"
                />
              </div>

              {/* Botão de envio */}
              <div className="pt-2">
                {error && (
                  <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-gold-500 text-ocean-950 rounded-xl font-bold text-lg hover:bg-gold-400 transition-colors shadow-lg hover:shadow-gold-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      <Send size={20} aria-hidden="true" />
                      Enviar pedido
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="text-xs text-ocean-500 mt-4 text-center leading-relaxed">
              Seu pedido será enviado diretamente ao e-mail do autor.
              Você receberá retorno pelo e-mail ou telefone informado.
            </p>

            <p className="text-xs text-ocean-400 mt-2 text-center">
              Ao enviar, você concorda em ser contatado pelo autor para
              finalizar o pedido.
            </p>
        </div>
      </dialog>
    </>
  );
}
