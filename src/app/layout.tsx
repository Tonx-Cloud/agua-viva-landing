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
  title: "Livro Água Viva — Antonio Carlos Tórtoro",
  description:
    "Livro Água Viva: o novo livro de poesia de Antonio Carlos Tórtoro. Poesia é água viva no mar das produções literárias. Adquira já o seu exemplar.",
  keywords: [
    "Livro Água Viva",
    "Antonio Carlos Tórtoro",
    "poesia",
    "livro",
    "literatura brasileira",
  ],
  openGraph: {
    title: "Livro Água Viva — Antonio Carlos Tórtoro",
    description:
      "Poesia é água viva no mar das produções literárias. Conheça o Livro Água Viva de Antonio Carlos Tórtoro.",
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
