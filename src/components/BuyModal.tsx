"use client";

import { useState, FormEvent } from "react";
import { X, Mail, Send, ShoppingCart } from "lucide-react";

const EMAIL = "ancartor@yahoo.com";
const FORMSUBMIT_URL = `https://formsubmit.co/${EMAIL}`;

export default function BuyModal() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleMailto = () => {
    const subject = encodeURIComponent(
      "Interesse no livro Água-Viva — Antônio Carlos Tótoro"
    );
    const body = encodeURIComponent(
      `Olá, Antônio Carlos!\n\nMeu nome é ${nome}.\nE-mail: ${email}\n${cidade ? `Cidade/UF: ${cidade}\n` : ""}\n${mensagem ? `Mensagem: ${mensagem}\n` : ""}\nGostaria de adquirir o livro Água-Viva.\n\nAguardo retorno. Obrigado(a)!`
    );
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_self");
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.currentTarget.submit();
  };

  return (
    <>
      {/* Botão flutuante CTA */}
      <div id="comprar" className="py-16 bg-gradient-to-b from-ocean-900 to-ocean-950">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sand-50 mb-4">
            Garanta o seu exemplar
          </h2>
          <p className="text-sand-300 text-lg mb-8 max-w-lg mx-auto">
            Entre em contato diretamente com o autor para adquirir
            o livro Água-Viva.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold rounded-2xl bg-gold-500 text-ocean-950 hover:bg-gold-400 transition-all shadow-2xl hover:shadow-gold-500/30 hover:-translate-y-1"
          >
            <ShoppingCart size={24} aria-hidden="true" />
            Comprar agora
          </button>
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
              Adquirir Água-Viva
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
                value="Nova solicitação — Livro Água-Viva"
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
                  Mensagem{" "}
                  <span className="text-ocean-400 font-normal">(opcional)</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={3}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className="w-full rounded-xl border border-sand-300 px-4 py-3 text-ocean-900 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors resize-none"
                  placeholder="Deixe sua mensagem para o autor..."
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
              Seus dados serão enviados diretamente ao autor. Não armazenamos
              informações.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
