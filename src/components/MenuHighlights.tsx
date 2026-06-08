"use client";

import { UtensilsCrossed, Plus } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { MenuModal } from "./MenuModal";

const destaques = [
  {
    id: 1,
    nome: "Parmegiana de Filé Mignon",
    descricao: "Um clássico irresistível. Acompanha arroz branco e batata frita crocante.",
    preco: "R$ 158,00",
    tag: "Mais Pedido",
    imagem: "/images/prato-parmegiana.jpg"
  },
  {
    id: 2,
    nome: "Salmon ao Molho Maracujá",
    descricao: "Toque agridoce perfeito. Acompanha arroz, batata sauté e deliciosa banana à milanesa.",
    preco: "R$ 189,00",
    tag: "Especial do Chef",
    imagem: "/images/prato-salmao.jpg"
  },
  {
    id: 3,
    nome: "Baby Beef ao Molho 2 Queijos",
    descricao: "Iscas de baby beef Maturatta mergulhados em nosso mix exclusivo de queijo gratinado.",
    preco: "R$ 144,00",
    tag: "Para Compartilhar",
    imagem: "/images/prato-babybeef.jpg"
  },
  {
    id: 4,
    nome: "Risoto de Limão Siciliano com Salmon",
    descricao: "Cremosidade e frescor na medida certa, combinados com o sabor marcante do salmão.",
    preco: "R$ 75,00",
    tag: "Novidade",
    imagem: "/images/prato-risoto.jpg"
  }
];

export default function MenuHighlights() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="cardapio" className="py-16 md:py-24 bg-neutral-950 relative border-t border-neutral-900">
      <div className="container mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-amber-600 font-semibold tracking-widest text-xs md:text-sm uppercase mb-3 block">
            Os Campeões de Vendas
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-serif">
            Destaques do Cardápio
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
        >
          {destaques.map((prato) => (
            <motion.div
              key={prato.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="bg-neutral-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col border border-neutral-800 hover:border-amber-600/30 h-full"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={prato.imagem}
                  alt={prato.nome}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
                <span className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                  {prato.tag}
                </span>
              </div>

              <div className="p-5 md:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-serif">
                    {prato.nome}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                    {prato.descricao}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-neutral-800 mt-auto">
                  <span className="text-lg font-bold text-amber-500">
                    {prato.preco}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 md:mt-16 text-center px-4"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 border-2 border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white font-semibold py-4 px-10 rounded-full transition-all hover:scale-105"
          >
            <UtensilsCrossed size={20} />
            Ver Cardápio Completo
          </button>
        </motion.div>

        <MenuModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );
}
