"use client";

import { useState, FormEvent, useEffect, useCallback } from "react";
import { X, Mail, Send, ShoppingCart, Info, Gift, MessageCircle, Check } from "lucide-react";

const EMAIL = "ancartor@yahoo.com";
const FORMSUBMIT_URL = `https://formsubmit.co/${EMAIL}`;

const OPCOES = [
  {
    icone: ShoppingCart,
    titulo: "Comprar agora",
    desc: "Envie sua mensagem e finalize o pedido",
  },
  {
    icone: Info,
    titulo: "Informações",
    desc: "Valores, entrega e detalhes do livro",
  },
  {
    icone: Gift,
    titulo: "Dedicatória",
    desc: "Peça um exemplar especial para presentear",
  },
];

export default function BuyModal() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [mensagem, setMensagem] = useState(
    "Olá! Quero comprar o livro Água-Viva.\nGostaria de saber sobre: (valor / entrega / dedicatória).\nObrigado!"
  );
  const [enviado, setEnviado] = useState<"email" | "whatsapp" | "form" | null>(null);

  // Fechar com ESC
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    },
    []
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, handleEsc]);

  // Validação simples
  const camposValidos = nome.trim().length > 0 && email.trim().length > 0 && email.includes("@");

  // Montar corpo da mensagem
  const montarMensagem = () => {
    const partes = [
      `Olá, Antônio Carlos!`,
      ``,
      `Meu nome é ${nome}.`,
      `E-mail: ${email}`,
    ];
    if (cidade.trim()) partes.push(`Cidade/UF: ${cidade}`);
    partes.push(``);
    if (mensagem.trim()) partes.push(mensagem.trim());
    partes.push(``);
    partes.push(`Aguardo retorno. Obrigado(a)!`);
    return partes.join("\n");
  };

  // === ENVIAR POR E-MAIL (mailto) ===
  const handleMailto = () => {
    if (!camposValidos) return;

    const subject = "Pedido / Contato — Livro Água-Viva";
    const body = montarMensagem();

    // Usar location.href é mais confiável que window.open para mailto
    const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    setEnviado("email");
    setTimeout(() => setEnviado(null), 5000);
  };

  // === ENVIAR POR WHATSAPP ===
  const handleWhatsApp = () => {
    if (!camposValidos) return;

    const texto = `*Pedido / Contato — Livro Água-Viva*\n\n${montarMensagem()}`;

    // WhatsApp Web / App — sem número fixo, abre para o usuário escolher ou enviar ao autor
    // Se o autor tiver WhatsApp, pode colocar o número aqui:
    // const whatsappUrl = `https://wa.me/5516999999999?text=${encodeURIComponent(texto)}`;
    // Sem número, usa o compartilhamento genérico:
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setEnviado("whatsapp");
    setTimeout(() => setEnviado(null), 5000);
  };

  // === ENVIAR VIA FORMSUBMIT ===
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    // O formsubmit.co lida com o POST nativamente
    // Não precisamos de preventDefault — deixamos o form submeter
    setEnviado("form");
  };

  // Feedback de sucesso
  const feedbackMsg =
    enviado === "email"
      ? "Seu app de e-mail foi aberto com a mensagem pronta. Basta enviar!"
      : enviado === "whatsapp"
        ? "WhatsApp aberto! Escolha o contato do autor e envie."
        : enviado === "form"
          ? "Formulário enviado com sucesso!"
          : null;

  return (
    <>
      {/* Seção CTA Comprar */}
      <div id="comprar" className="py-20 sm:py-28 bg-gradient-to-b from-ocean-900 to-ocean-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sand-50 mb-4">
              Leve &ldquo;Água-Viva&rdquo; para a sua estante
            </h2>
            <p className="text-sand-300 text-lg max-w-lg mx-auto">
              Quer comprar, tirar dúvidas, pedir dedicatória ou combinar
              entrega? Fale diretamente com o autor. É simples e&nbsp;rápido.
            </p>
          </div>

          {/* Cards de opções */}
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-3xl mx-auto">
            {OPCOES.map((opcao) => {
              const Icone = opcao.icone;
              return (
                <div
                  key={opcao.titulo}
                  className="bg-ocean-800/50 backdrop-blur rounded-2xl p-6 text-center border border-ocean-700/40 hover:border-gold-500/40 transition-all"
                >
                  <Icone
                    size={28}
                    className="mx-auto mb-3 text-gold-400"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif font-bold text-sand-50 text-lg mb-1">
                    {opcao.titulo}
                  </h3>
                  <p className="text-sand-400 text-sm">{opcao.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold rounded-2xl bg-gold-500 text-ocean-950 hover:bg-gold-400 transition-all shadow-2xl hover:shadow-gold-500/30 hover:-translate-y-1"
            >
              <ShoppingCart size={24} aria-hidden="true" />
              Comprar agora
            </button>
            <p className="text-sand-500 text-sm mt-4">
              Você envia a mensagem e o autor retorna para combinar os
              próximos&nbsp;passos.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Formulário de compra"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-ocean-950/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Conteúdo */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-ocean-400 hover:text-ocean-700 transition-colors p-1"
              aria-label="Fechar formulário"
            >
              <X size={24} />
            </button>

            <h3 className="font-serif text-2xl font-bold text-ocean-950 mb-2">
              Pedido / Contato — Livro Água-Viva
            </h3>
            <p className="text-ocean-600 text-sm mb-6">
              Preencha seus dados e escolha como enviar sua&nbsp;mensagem.
            </p>

            {/* Feedback de sucesso */}
            {feedbackMsg && (
              <div className="mb-4 flex items-start gap-2 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 text-sm">
                <Check size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            <form
              action={FORMSUBMIT_URL}
              method="POST"
              onSubmit={handleSubmitForm}
              className="space-y-4"
            >
              {/* Honeypot anti-spam para formsubmit */}
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_subject"
                value="Pedido / Contato — Livro Água-Viva"
              />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="_next" value="https://agua-viva-landing.vercel.app/?enviado=1" />

              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-semibold text-ocean-800 mb-1"
                >
                  Nome completo <span className="text-red-500">*</span>
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

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
                  name="cidade"
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
                  placeholder="Ex.: Ribeirão Preto - SP"
                />
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-semibold text-ocean-800 mb-1"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors resize-none"
                />
              </div>

              {/* 3 botões de envio */}
              <div className="space-y-3 pt-2">
                {/* Linha 1: E-mail + WhatsApp */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleMailto}
                    disabled={!camposValidos}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-ocean-600 text-white rounded-xl font-semibold hover:bg-ocean-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mail size={18} aria-hidden="true" />
                    Enviar por e-mail
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    disabled={!camposValidos}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageCircle size={18} aria-hidden="true" />
                    Enviar por WhatsApp
                  </button>
                </div>

                {/* Linha 2: Formulário */}
                <button
                  type="submit"
                  disabled={!camposValidos}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-gold-500 text-ocean-950 rounded-xl font-semibold hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} aria-hidden="true" />
                  Enviar formulário direto
                </button>
              </div>
            </form>

            {!camposValidos && (nome.length > 0 || email.length > 0) && (
              <p className="text-xs text-red-500 mt-2 text-center">
                Preencha nome e e-mail válido para enviar.
              </p>
            )}

            <p className="text-xs text-ocean-400 mt-4 text-center">
              Ao enviar, você concorda em ser contatado pelo autor para
              finalizar o pedido.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
