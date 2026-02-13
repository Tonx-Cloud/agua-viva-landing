"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Send, ShoppingCart, Info, Gift } from "lucide-react";

const EMAIL = "ancartor@yahoo.com";
const FORMSUBMIT_URL = `https://formsubmit.co/${EMAIL}`;
const OBRIGADO_URL = "https://agua-viva-landing.vercel.app/obrigado";

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

  return (
    <>
      {/* Seção CTA Comprar */}
      <div id="comprar" className="py-20 sm:py-28 bg-gradient-to-b from-ocean-900 to-ocean-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sand-50 mb-4">
              Leve &ldquo;Água Viva&rdquo; para a sua estante
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
              Pedido / Contato — Livro Água Viva
            </h3>
            <p className="text-ocean-600 text-sm mb-6">
              Preencha seus dados e envie sua mensagem diretamente ao&nbsp;autor.
            </p>

            <form
              action={FORMSUBMIT_URL}
              method="POST"
              className="space-y-4"
            >
              {/* Campos ocultos FormSubmit */}
              <input type="hidden" name="_subject" value="Pedido — Livro Água Viva" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_next" value={OBRIGADO_URL} />
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

              {/* Telefone / WhatsApp do comprador */}
              <div>
                <label
                  htmlFor="telefone"
                  className="block text-sm font-semibold text-ocean-800 mb-1"
                >
                  Telefone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  id="telefone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
                  placeholder="(00) 00000-0000"
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
                  defaultValue={`Olá! Quero comprar o livro Água Viva.\nMeu nome é:\nMeu telefone/WhatsApp:\nGostaria de informações sobre valor/entrega/dedicatória.\nObrigado!`}
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors resize-none"
                />
              </div>

              {/* Botão de envio */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-gold-500 text-ocean-950 rounded-xl font-bold text-lg hover:bg-gold-400 transition-colors shadow-lg hover:shadow-gold-500/30"
                >
                  <Send size={20} aria-hidden="true" />
                  Enviar pedido
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
        </div>
      )}
    </>
  );
}
