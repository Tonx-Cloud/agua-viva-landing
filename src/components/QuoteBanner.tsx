const FRASES = [
  "Poesia para ler devagar, mesmo quando o dia corre.",
  "Um livro pequeno no volume. Grande no sentido.",
  "Versos que brilham — e às vezes queimam.",
  "Palavra viva, transparente, intensa.",
];

interface QuoteBannerProps {
  /** Índice da frase (0–3). Padrão: 0 */
  index?: number;
  /** Variação visual: "dark" sobre fundo escuro, "light" sobre fundo claro */
  variant?: "dark" | "light";
}

export default function QuoteBanner({
  index = 0,
  variant = "dark",
}: QuoteBannerProps) {
  const frase = FRASES[index % FRASES.length];

  const bg =
    variant === "dark"
      ? "bg-ocean-950"
      : "bg-sand-100";

  const text =
    variant === "dark"
      ? "text-sand-200"
      : "text-ocean-800";

  const border =
    variant === "dark"
      ? "border-ocean-800/50"
      : "border-sand-300";

  return (
    <div
      className={`${bg} ${border} border-y py-8 sm:py-10`}
      aria-hidden="true"
    >
      <p
        className={`font-serif text-lg sm:text-xl md:text-2xl ${text} text-center italic max-w-3xl mx-auto px-4`}
      >
        &ldquo;{frase}&rdquo;
      </p>
    </div>
  );
}
