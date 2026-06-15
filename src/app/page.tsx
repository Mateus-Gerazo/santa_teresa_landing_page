import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import MenuHighlights from "@/components/MenuHighlights";
import SocialProof from "@/components/SocialProof";
import FooterContact from "@/components/FooterContact";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ReservationSection from "@/components/ReservationSection";

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
