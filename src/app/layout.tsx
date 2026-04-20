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
  metadataBase: new URL("https://agua-viva-landing.vercel.app"),
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
  alternates: { canonical: "/" },
  openGraph: {
    title: "Livro Água Viva — Antonio Carlos Tórtoro",
    description:
      "Poesia é água viva no mar das produções literárias. Conheça o Livro Água Viva de Antonio Carlos Tórtoro.",
    url: "/",
    siteName: "Livro Água Viva",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Livro Água Viva" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Livro Água Viva — Antonio Carlos Tórtoro",
    description:
      "Poesia é água viva no mar das produções literárias.",
    images: ["/og.png"],
  },
  other: { "theme-color": "#0a1628" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a1628" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
