"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "O Livro", href: "#livro" },
  { label: "Degustação", href: "#degustacao" },
  { label: "Vídeos", href: "#videos" },
  { label: "O Autor", href: "#autor" },
  { label: "Blog", href: "#blog" },
  { label: "Comprar", href: "#comprar" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ocean-950/95 backdrop-blur-md border-b border-ocean-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            className="font-serif text-xl font-bold text-sand-100 hover:text-gold-400 transition-colors"
            aria-label="Ir para o início"
          >
            Água-Viva
          </a>

          {/* Nav desktop */}
          <nav className="hidden md:flex gap-6" aria-label="Menu principal">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-sand-200 hover:text-gold-400 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Botão mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-sand-100 p-2"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      {open && (
        <nav
          className="md:hidden bg-ocean-950/98 border-t border-ocean-800/50 pb-4"
          aria-label="Menu principal"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sand-200 hover:text-gold-400 hover:bg-ocean-900/50 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
