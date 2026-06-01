"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check initial position on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phoneNumber = "14997096292";
  const message = encodeURIComponent("Olá! Vi o site do Santa Teresa e gostaria de fazer uma reserva / tirar uma dúvida.");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group flex items-center justify-center"
        >
          {/* Radar Ping Effect */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-30 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
          
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgba(34,197,94,0.4)] transition-all duration-300 hover:scale-105"
            aria-label="Reservar Mesa no WhatsApp"
          >
            <MessageCircle size={22} className="fill-white" />
            <span className="font-semibold text-sm md:text-base">Reservar Mesa</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
