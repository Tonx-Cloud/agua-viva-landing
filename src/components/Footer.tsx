import { Heart, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-ocean-950 border-t border-ocean-800/50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <p className="font-serif text-xl text-sand-100 mb-4">Água Viva</p>
        <p className="text-sand-400 text-sm mb-4">
          Antonio Carlos Tórtoro &copy; {ano}. Todos os direitos reservados.
        </p>

        <div className="flex items-center justify-center gap-2 text-sand-400 text-sm mb-4">
          <Mail size={14} aria-hidden="true" />
          <a
            href="mailto:contato@tortoro.com.br"
            className="hover:text-sand-200 transition-colors"
          >
            contato@tortoro.com.br
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 text-sand-500 text-xs mb-6">
          <Link href="/privacidade" className="hover:text-sand-300 transition-colors underline">
            Política de Privacidade
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/termos" className="hover:text-sand-300 transition-colors underline">
            Termos de Uso
          </Link>
          <span aria-hidden="true">·</span>
          <a
            href="https://tortoro.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sand-300 transition-colors underline"
          >
            Blog do Autor
          </a>
        </div>

        <p className="text-sand-500 text-xs flex items-center justify-center gap-1">
          Feito com{" "}
          <Heart size={12} className="text-red-400" aria-hidden="true" /> para a
          poesia brasileira
        </p>
      </div>
    </footer>
  );
}
