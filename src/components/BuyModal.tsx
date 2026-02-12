"use client";

import { useState, FormEvent } from "react";
import { X, Mail, Send, ShoppingCart, Info, Gift } from "lucide-react";

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

  const handleMailto = () => {
    const subject = encodeURIComponent(
      "Pedido / Contato — Livro Água-Viva"
    );
    const body = encodeURIComponent(
      `Olá, Antônio Carlos!\n\nMeu nome é ${nome}.\nE-mail: ${email}\n${cidade ? `Cidade/UF: ${cidade}\n` : ""}\n${mensagem}\n\nAguardo retorno. Obrigado(a)!`
    );
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_self");
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.currentTarget.submit();
  };

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
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8">
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
              Preencha seus dados e envie sua solicitação ao autor.
            </p>

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
              <input type="text" name="_honey" className="hidden" />

              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-semibold text-ocean-800 mb-1"
                >
                  Nome completo *
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label
                  htmlFor="email-campo"
                  className="block text-sm font-semibold text-ocean-800 mb-1"
                >
                  E-mail *
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

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleMailto}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-ocean-600 text-white rounded-xl font-semibold hover:bg-ocean-700 transition-colors"
                >
                  <Mail size={18} aria-hidden="true" />
                  Enviar por e-mail
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-gold-500 text-ocean-950 rounded-xl font-semibold hover:bg-gold-400 transition-colors"
                >
                  <Send size={18} aria-hidden="true" />
                  Enviar formulário
                </button>
              </div>
            </form>

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
