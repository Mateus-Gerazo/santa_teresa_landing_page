"use client";

import { Star, ShieldCheck } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Review = {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
};

export default function SocialProof() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/google-places');
        if (res.ok) {
          const data = await res.json();
          // Limita para exibir apenas 3 avaliações
          const allReviews = data.reviews || [];
          setReviews(allReviews.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-neutral-900 border-t border-neutral-800">
      <div className="container mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-amber-600 font-semibold tracking-widest text-xs md:text-sm uppercase mb-3 block">
            A Voz dos Clientes
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-serif">
            O que dizem sobre nós
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          ref={scrollContainerRef}
          className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 sm:gap-6 pb-8 md:flex-wrap md:justify-center md:gap-8 hide-scrollbar items-stretch"
        >
          {isLoading ? (
            // Skeleton loaders
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.33px)] h-full bg-neutral-950 p-6 md:p-8 rounded-3xl border border-neutral-800 flex flex-col justify-between shadow-xl animate-pulse"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-neutral-800 shrink-0"></div>
                  <div className="space-y-2 flex-1 pt-2">
                    <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
                    <div className="h-3 bg-neutral-800 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="h-3 bg-neutral-800 rounded w-full"></div>
                  <div className="h-3 bg-neutral-800 rounded w-full"></div>
                  <div className="h-3 bg-neutral-800 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : (
            reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                }}
                className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.33px)] h-full bg-neutral-950 p-6 md:p-8 rounded-3xl border border-neutral-800 flex flex-col justify-between shadow-xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      width={56}
                      height={56}
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

                <div className="flex-grow flex flex-col">
                  <p className="text-neutral-300 text-sm leading-relaxed italic line-clamp-6">
                    "{review.text}"
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-end gap-1 opacity-50 pt-4 border-t border-neutral-800/50">
                  <ShieldCheck size={14} className="text-blue-400" />
                  <span className="text-xs text-neutral-500">Avaliação verificada no Google</span>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-neutral-400 text-sm">
            Mais de <strong className="text-white">250 avaliações positivas</strong> no Google.{" "}
            <a href="https://www.google.com/maps/place/Restaurante+Santa+Teresa+Brotas/@-22.2907705,-48.1292853,20.67z/data=!4m8!3m7!1s0x94c779004a573993:0xb050a71544bdf394!8m2!3d-22.2908135!4d-48.129134!9m1!1b1!16s%2Fg%2F11y3my1scc?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D" className="text-amber-500 hover:text-amber-400 underline decoration-amber-500/30 underline-offset-4 transition-colors">
              Veja todas as avaliações
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
