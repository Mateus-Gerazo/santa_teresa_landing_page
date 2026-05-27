"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, UtensilsCrossed } from "lucide-react";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceStatus = async () => {
      try {
        const res = await fetch('/api/google-places');
        if (res.ok) {
          const data = await res.json();
          setIsOpen(data.isOpen);
        }
      } catch (error) {
        console.error("Failed to fetch place data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaceStatus();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-prato-assinatura.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-neutral-900/90 backdrop-blur-sm py-4 shadow-lg" : "bg-transparent py-6"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="mr-2">
            <Image
              src="/images/santa_teresa_logo_branca.png"
              alt="Santa Teresa Restaurante Logo"
              width={300}
              height={100}
              className="w-auto h-10 sm:h-12 lg:h-14 object-contain"
              priority
            />
          </div>

          {/* Status Badge */}
          {isLoading ? (
            <div className="w-24 h-6 sm:w-28 sm:h-8 bg-neutral-800 rounded-full animate-pulse"></div>
          ) : isOpen ? (
            <span className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm bg-green-500/20 text-green-400 px-2 sm:px-3 py-1 rounded-full border border-green-500/30 whitespace-nowrap">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse"></div>
              Aberto Agora
            </span>
          ) : (
            <span className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm bg-red-500/20 text-red-400 px-2 sm:px-3 py-1 rounded-full border border-red-500/30 whitespace-nowrap">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-400"></div>
              Fechado
            </span>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="tracking-widest text-amber-500 text-sm md:text-base font-semibold uppercase mb-4"
        >
          Tradição na Mário Pinoti
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-serif"
        >
          Gastronomia, Charme e a Melhor Cachaça de Brotas.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto font-light"
        >
          Um ambiente acolhedor com pratos inesquecíveis, perfeito para o seu almoço ou jantar no coração da cidade.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#cardapio"
            className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
          >
            <UtensilsCrossed size={20} />
            Ver Cardápio e Destaques
          </a>
          <a
            href="#localizacao"
            className="flex items-center justify-center gap-2 border-2 border-white/50 hover:border-white text-white bg-white/5 backdrop-blur-sm py-3 px-8 rounded-full transition-all hover:bg-white/10"
          >
            <MapPin size={20} />
            Como Chegar
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">Descubra</span>
        <ChevronDown className="animate-bounce" size={24} />
      </motion.div>
    </section>
  );
}
