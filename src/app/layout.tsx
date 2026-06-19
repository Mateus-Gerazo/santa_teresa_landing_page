import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://restaurantesantateresa.com.br"),
  title: {
    template: "%s | Restaurante Santa Teresa",
    default: "Restaurante Santa Teresa | Gastronomia & Charme em Brotas - SP",
  },
  description: "Descubra a melhor gastronomia de Brotas no Restaurante Santa Teresa. Ambiente acolhedor, pratos exclusivos e a melhor cachaça da região. Faça sua reserva online!",
  keywords: ["restaurante brotas", "onde comer em brotas", "restaurante santa teresa", "gastronomia brotas", "reserva online restaurante", "melhor restaurante de brotas", "cachaça brotas"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://restaurantesantateresa.com.br",
    siteName: "Restaurante Santa Teresa",
    title: "Restaurante Santa Teresa | Gastronomia & Charme em Brotas",
    description: "Descubra a melhor gastronomia de Brotas no Restaurante Santa Teresa. Ambiente acolhedor e pratos exclusivos.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Interior do Restaurante Santa Teresa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurante Santa Teresa | Gastronomia em Brotas",
    description: "Descubra a melhor gastronomia de Brotas no Restaurante Santa Teresa.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
        {children}
        <Toaster theme="dark" richColors position="top-right" />
      </body>
    </html>
  );
}
