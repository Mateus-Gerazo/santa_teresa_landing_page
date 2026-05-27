"use client";

import { Star, ShieldCheck } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

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
          setReviews(data.reviews || []);
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
          {isLoading ? (
            // Skeleton loaders
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="snap-center shrink-0 w-[85vw] md:w-auto bg-neutral-950 p-8 rounded-3xl border border-neutral-800 flex flex-col shadow-xl animate-pulse"
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
              <div
                key={index}
                className="snap-center shrink-0 w-[85vw] md:w-auto bg-neutral-950 p-8 rounded-3xl border border-neutral-800 flex flex-col shadow-xl"
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

                <p className="text-neutral-300 text-sm leading-relaxed italic flex-grow">
                  "{review.text}"
                </p>

                <div className="mt-6 flex items-center justify-end gap-1 opacity-50">
                  <ShieldCheck size={14} className="text-blue-400" />
                  <span className="text-xs text-neutral-500">Avaliação verificada no Google</span>
                </div>
              </div>
            ))
          )}
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
