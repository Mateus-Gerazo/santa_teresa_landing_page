import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import MenuHighlights from "@/components/MenuHighlights";
import SocialProof from "@/components/SocialProof";
import FooterContact from "@/components/FooterContact";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ReservationSection from "@/components/ReservationSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página Inicial",
  description: "Faça sua reserva online no Restaurante Santa Teresa e venha provar nossos pratos e a melhor cachaça da região de Brotas - SP.",
  openGraph: {
    title: "Restaurante Santa Teresa | Brotas - SP",
    description: "O Restaurante Santa Teresa oferece uma experiência culinária inesquecível em Brotas. Faça sua reserva online!",
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <Hero />
      <Experience />
      <MenuHighlights />
      <ReservationSection />
      <SocialProof />
      <FooterContact />
      <FloatingWhatsApp />
    </main>
  );
}
