"use client";

import { Star, ShieldCheck } from "lucide-react";
import { useRef } from "react";

const reviews = [
  {
    id: 1,
    author_name: "Carlos Eduardo",
    profile_photo_url: "/images/profile-photo.jpg",
    rating: 5,
    relative_time_description: "há 2 semanas",
    text: "Comida excepcional! O ambiente é super charmoso e fomos muito bem atendidos. A coleção de cachaças é um show à parte. Recomendo muito a parmegiana!"
  },
  {
    id: 2,
    author_name: "Mariana Silva",
    profile_photo_url: "https://ui-avatars.com/api/?name=Mariana+Silva&background=D4A574&color=fff",
    rating: 5,
    relative_time_description: "há 1 mês",
    text: "Parada obrigatória em Brotas. O risoto de limão siciliano com salmão estava dos deuses. Atendimento rápido e garçons super educados. Com certeza voltaremos."
  },
  {
    id: 3,
    author_name: "Roberto e Família",
    profile_photo_url: "https://ui-avatars.com/api/?name=Roberto&background=171717&color=fff",
    rating: 5,
    relative_time_description: "há 2 meses",
    text: "Fomos com nosso cachorro e a experiência foi incrível. Realmente pet-friendly! O espaço é muito gostoso, meia luz à noite, romântico e a comida chegou rápido."
  }
];

export default function SocialProof() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-neutral-900 border-t border-neutral-800">
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold tracking-widest text-sm uppercase mb-3 block">
            A Voz dos Clientes
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-serif">
            O que dizem sobre nós
          </h2>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-3 md:gap-8 hide-scrollbar"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="snap-center shrink-0 w-[85vw] md:w-auto bg-neutral-950 p-8 rounded-3xl border border-neutral-800 flex flex-col shadow-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-neutral-800"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{review.author_name}</h4>
                    <span className="text-neutral-500 text-xs">{review.relative_time_description}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </div>

              <p className="text-neutral-300 text-sm leading-relaxed italic flex-grow">
                "{review.text}"
              </p>

              <div className="mt-6 flex items-center justify-end gap-1 opacity-50">
                <ShieldCheck size={14} className="text-blue-400" />
                <span className="text-xs text-neutral-500">Avaliação verificada no Google</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-neutral-400 text-sm">
            Mais de <strong className="text-white">250 avaliações positivas</strong> no Google.{" "}
            <a href="#" className="text-amber-500 hover:text-amber-400 underline decoration-amber-500/30 underline-offset-4 transition-colors">
              Veja todas as avaliações
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
