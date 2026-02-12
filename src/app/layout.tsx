import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Água-Viva — Antônio Carlos Tótoro | Poesia",
  description:
    "Água-Viva: o novo livro de poesia de Antônio Carlos Tótoro. Poesia é água-viva no mar das produções literárias. Adquira já o seu exemplar.",
  keywords: [
    "Água-Viva",
    "Antônio Carlos Tótoro",
    "poesia",
    "livro",
    "literatura brasileira",
  ],
  openGraph: {
    title: "Água-Viva — Antônio Carlos Tótoro",
    description:
      "Poesia é água-viva no mar das produções literárias. Conheça o novo livro de Antônio Carlos Tótoro.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
