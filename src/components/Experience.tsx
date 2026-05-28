"use client";

import { Wine, Home, Dog } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const experiences = [
  {
    id: 1,
    title: "Charme na Mário Pinoti",
    description: "Nosso espaço foi pensado para fazer você relaxar. Um ambiente rústico, acolhedor e com uma trilha sonora agradável, bem no coração do roteiro turístico de Brotas.",
    image: "/images/exp-ambiente.jpg",
    icon: <Home className="text-amber-600 w-6 h-6" />,
    highlight: false,
  },
  {
    id: 2,
    title: "Cachaçaria Exclusiva",
    description: "Explore sabores únicos. Contamos com uma seleção primorosa de cachaças artesanais próprias, perfeitas para abrir o apetite ou para levar um pedacinho de Brotas para casa.",
    image: "/images/exp-cachacas.jpg",
    icon: <Wine className="text-amber-600 w-6 h-6" />,
    highlight: true,
  },
  {
    id: 3,
    title: "Pet-Friendly de Verdade",
    description: "Aqui toda a família é bem-vinda. Nossa área externa é arejada e espaçosa para receber seu pet com todo o conforto e segurança que ele merece enquanto você aproveita a refeição.",
    image: "/images/exp-pet.jpg",
    icon: <Dog className="text-amber-600 w-6 h-6" />,
    highlight: false,
  }
];

export default function Experience() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-amber-600 font-semibold tracking-widest text-xs md:text-sm uppercase mb-3 block">
            Muito além da comida
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif">
            Sinta o clima do Santa Teresa
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {experiences.map((exp) => (
            <motion.div 
              key={exp.id} 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
              }}
              className={`group bg-neutral-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col ${
                exp.highlight ? 'border border-amber-500/30 ring-1 ring-amber-500/10' : 'border border-neutral-800'
              }`}
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image 
                  src={exp.image} 
                  alt={exp.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 bg-neutral-900/80 backdrop-blur-md p-2 rounded-xl">
                  {exp.icon}
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-serif">
                  {exp.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed font-light text-sm md:text-base">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
