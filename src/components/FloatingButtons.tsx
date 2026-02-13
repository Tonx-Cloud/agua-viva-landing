"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ShoppingCart } from "lucide-react";

export default function FloatingButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-2 sm:gap-3 z-50">
      {/* Topo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ocean-900/90 text-sand-100 shadow-lg backdrop-blur hover:bg-ocean-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} />
      </button>

      {/* Comprar */}
      <button
        onClick={() =>
          document
            .getElementById("comprar")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="group flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-gold-500 text-ocean-950 font-bold shadow-lg hover:bg-gold-400 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        aria-label="Comprar agora"
      >
        <ShoppingCart size={18} aria-hidden="true" />
        <span className="text-sm hidden sm:inline">Comprar</span>
      </button>
    </div>
  );
}
