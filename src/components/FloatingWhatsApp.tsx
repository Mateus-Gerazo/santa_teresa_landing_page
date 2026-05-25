import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const phoneNumber = "14997096292";
  const message = encodeURIComponent("Olá! Vi o site do Santa Teresa e gostaria de fazer uma reserva / tirar uma dúvida.");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-[0_4px_20px_rgba(34,197,94,0.4)] transition-all duration-300 hover:scale-110 z-50 group flex items-center justify-center animate-bounce"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={28} className="fill-white" />
      <span className="absolute right-full mr-4 bg-neutral-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-neutral-800 shadow-xl">
        Fale conosco!
        <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-neutral-900 rotate-45 border-r border-t border-neutral-800"></span>
      </span>
    </a>
  );
}
