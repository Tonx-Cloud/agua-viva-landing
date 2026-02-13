import { Heart } from "lucide-react";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-ocean-950 border-t border-ocean-800/50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <p className="font-serif text-xl text-sand-100 mb-4">Água Viva</p>
        <p className="text-sand-400 text-sm mb-4">
          Antonio Carlos Tórtoro &copy; {ano}. Todos os direitos reservados.
        </p>
        <p className="text-sand-500 text-xs flex items-center justify-center gap-1">
          Feito com{" "}
          <Heart size={12} className="text-red-400" aria-hidden="true" /> para a
          poesia brasileira
        </p>
      </div>
    </footer>
  );
}
