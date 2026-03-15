"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/AuthProvider";
import { BookOpen, Loader2, Mail, Lock, User as UserIcon } from "lucide-react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, authorized, loading, signInWithGoogle, signInWithEmail, signUpWithEmail } =
    useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  if (loading) {
    return (
      <section className="py-24 flex justify-center" aria-label="Carregando">
        <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
      </section>
    );
  }

  // Não logado — tela de login / cadastro
  if (!user) {
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setError("");
      setSubmitting(true);

      if (mode === "login") {
        const res = await signInWithEmail(email, password);
        if (res.error) setError(res.error);
      } else {
        if (password.length < 6) {
          setError("A senha precisa ter no mínimo 6 caracteres.");
          setSubmitting(false);
          return;
        }
        const res = await signUpWithEmail(email, password, name);
        if (res.error) {
          setError(res.error);
        } else {
          setSignupDone(true);
        }
      }
      setSubmitting(false);
    };

    // Tela de sucesso pós-cadastro
    if (signupDone) {
      return (
        <section
          id="acesso"
          className="relative py-20 sm:py-28 overflow-hidden"
          aria-label="Cadastro realizado"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-900 via-ocean-950 to-ocean-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />
          <div className="relative z-10 mx-auto max-w-lg px-4 text-center">
            <div className="text-5xl mb-6" aria-hidden="true">✅</div>
            <h2 className="font-serif text-3xl font-bold text-sand-50 mb-4">
              Conta Criada!
            </h2>
            <p className="text-sand-300 mb-6">
              Verifique seu email <strong className="text-sand-100">{email}</strong> e
              clique no link de confirmação. Depois volte aqui e faça login.
            </p>
            <button
              onClick={() => { setSignupDone(false); setMode("login"); }}
              className="px-8 py-3 rounded-xl bg-gold-500 text-ocean-950 font-bold hover:bg-gold-400 transition-all cursor-pointer"
            >
              Ir para Login
            </button>
          </div>
        </section>
      );
    }

    return (
      <section
        id="acesso"
        className="relative py-20 sm:py-28 overflow-hidden"
        aria-label="Acesso ao conteúdo"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900 via-ocean-950 to-ocean-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-md px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <BookOpen className="w-8 h-8 text-gold-400" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sand-50 mb-4">
            Conteúdo Exclusivo
          </h2>

          <p className="text-sand-300 text-lg mb-2">
            Os poemas, áudios e vídeos do livro <em>Água Viva</em> são
            exclusivos para leitores autorizados.
          </p>
          <p className="text-sand-400 text-sm mb-8">
            {mode === "login"
              ? "Faça login para acessar o conteúdo."
              : "Crie sua conta. Após a confirmação do pagamento pelo autor, o conteúdo será liberado."}
          </p>

          {/* Formulário email/senha */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left mb-6">
            {mode === "signup" && (
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-500" />
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-ocean-800/60 border border-ocean-700/50 text-sand-100 placeholder:text-sand-600 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-500" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-ocean-800/60 border border-ocean-700/50 text-sand-100 placeholder:text-sand-600 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-500" />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-ocean-800/60 border border-ocean-700/50 text-sand-100 placeholder:text-sand-600 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gold-500 text-ocean-950 font-bold text-lg hover:bg-gold-400 transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 mx-auto animate-spin" />
              ) : mode === "login" ? (
                "Entrar"
              ) : (
                "Criar Conta"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-ocean-700/50" />
            <span className="text-sand-600 text-xs uppercase tracking-wider">ou</span>
            <div className="flex-1 h-px bg-ocean-700/50" />
          </div>

          {/* Google OAuth */}
          <button
            onClick={signInWithGoogle}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white text-gray-800 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Entrar com Google
          </button>

          {/* Toggle login/signup */}
          <p className="text-sand-500 text-sm mt-6">
            {mode === "login" ? (
              <>
                Não tem conta?{" "}
                <button
                  onClick={() => { setMode("signup"); setError(""); }}
                  className="text-gold-400 hover:text-gold-300 underline underline-offset-2 cursor-pointer"
                >
                  Cadastre-se
                </button>
              </>
            ) : (
              <>
                Já tem conta?{" "}
                <button
                  onClick={() => { setMode("login"); setError(""); }}
                  className="text-gold-400 hover:text-gold-300 underline underline-offset-2 cursor-pointer"
                >
                  Fazer login
                </button>
              </>
            )}
          </p>

          <p className="text-sand-600 text-xs mt-4">
            Ainda não comprou o livro?{" "}
            <a
              href="#comprar"
              className="text-gold-400 hover:text-gold-300 underline underline-offset-2"
            >
              Adquira seu exemplar
            </a>
          </p>
        </div>
      </section>
    );
  }

  // Logado mas NÃO autorizado — aguardando liberação do autor
  if (!authorized) {
    return (
      <section
        id="acesso"
        className="relative py-20 sm:py-28 overflow-hidden"
        aria-label="Aguardando autorização"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900 via-ocean-950 to-ocean-900" />

        <div className="relative z-10 mx-auto max-w-lg px-4 text-center">
          <div className="text-5xl mb-6" aria-hidden="true">
            ⏳
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sand-50 mb-4">
            Acesso Pendente
          </h2>

          <p className="text-sand-300 text-lg mb-3">
            Olá, <strong className="text-sand-100">{user.user_metadata?.full_name || user.email}</strong>!
          </p>

          <p className="text-sand-400 mb-6">
            Sua conta foi criada com sucesso. O conteúdo será liberado assim
            que o autor confirmar o recebimento do pagamento.
          </p>

          <div className="bg-ocean-800/50 border border-ocean-700/50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sand-300 text-sm">
              <strong className="text-sand-200">Email cadastrado:</strong>{" "}
              {user.email}
            </p>
            <p className="text-sand-400 text-xs mt-2">
              Caso já tenha efetuado o pagamento e o acesso não foi liberado,
              entre em contato pelo formulário de compra abaixo.
            </p>
          </div>

          <a
            href="#comprar"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-2xl bg-gold-500 text-ocean-950 hover:bg-gold-400 transition-all shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5"
          >
            Adquirir o Livro
          </a>
        </div>
      </section>
    );
  }

  // Logado E autorizado
  return <>{children}</>;
}
