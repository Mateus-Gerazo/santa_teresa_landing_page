"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  priceHalf?: string;
  priceFull?: string;
  priceOptions?: { label: string; price: string }[];
}

interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    id: "risotos",
    title: "Risotos",
    items: [
      { name: "Risoto de limão siciliano com Salmon", price: "R$ 75,00" },
      { name: "Risoto de filé mignon", price: "R$ 75,00" },
      { name: "Risoto de fungi", price: "R$ 75,00" },
    ],
  },
  {
    id: "massas",
    title: "Massas",
    items: [
      { name: "Fettucine bolonhesa", price: "R$ 75,00" },
      { name: "Molho sugo com iscas de filé mignon", price: "R$ 75,00" },
      { name: "4 queijos com salmão", price: "R$ 75,00" },
      { name: "Molho pesto com tilápia", price: "R$ 75,00" },
    ],
  },
  {
    id: "lanches",
    title: "Lanches",
    items: [
      { name: "Pão na chapa", price: "R$ 8,00" },
      { name: "Misto quente", description: "Queijo, presunto, tomate e orégano", price: "R$ 16,00" },
      { name: "Omelete", description: "Queijo, presunto e bacon", price: "R$ 18,00" },
      { name: "Tapioca", description: "Peito de peru, queijo, Nutella, doce de leite", price: "R$ 20,00" },
      { name: "Lanche natural", description: "Frango, peito de peru, queijo, alface, maionese e cenoura", price: "R$ 20,00" },
      { name: "Bauru Santa Tereza", description: "Pão francês, filé mignon, queijo, bacon, rúcula e batata frita", price: "R$ 40,00" },
      { name: "Beirute filé de frango", description: "Pão sírio, requeijão, queijo, alface, tomate e fritas", price: "R$ 45,00" },
      { name: "Beirute filé mignon", description: "Pão sírio, requeijão, queijo, alface, tomate e fritas", price: "R$ 55,00" },
    ],
  },
  {
    id: "cafe",
    title: "Café",
    items: [
      { name: "Café expresso", price: "R$ 7,50" },
      { name: "Café com leite", price: "R$ 9,00" },
      { name: "Café com chantilly", price: "R$ 9,00" },
      { name: "Capuccino tradicional", price: "R$ 19,80" },
      { name: "Frappé gelado", price: "R$ 19,80" },
      { name: "Capuccino de chocolate brando", price: "R$ 19,80" },
      { name: "Capuccino de doce de leite", price: "R$ 19,80" },
      { name: "Chocolate (quente ou gelado)", price: "R$ 19,80" },
      { name: "Mocca", price: "R$ 19,80" },
    ],
  },
  {
    id: "bebidas",
    title: "Bebidas",
    items: [
      { name: "Água mineral", price: "R$ 7,00" },
      { name: "Água com gás", price: "R$ 8,00" },
      { name: "Sucos", description: "Laranja / limão / abacaxi / maracujá / morango / Limonada Suíça", price: "R$ 18,00" },
      { name: "Soda Italiana", description: "Xarope de sabor, água com gás - consulte os sabores", price: "R$ 20,00" },
      { name: "Refrigerantes", description: "Coca-Cola normal ou zero / Fanta Guaraná / Laranja ou Uva", price: "R$ 8,00" },
    ],
  },
  {
    id: "cervejas-chopp",
    title: "Cervejas e Chopp",
    items: [
      { name: "Cervejas Long Neck", description: "Heineken normal ou zero, Budweiser, Stella Artois", price: "R$ 15,00" },
      { name: "Cervejas 600ml", priceOptions: [{ label: "Original / Spaten", price: "R$ 20,00" }, { label: "Heineken", price: "R$ 24,00" }] },
      { name: "Chopp", priceOptions: [{ label: "Pilsen 370ml", price: "R$ 12,00" }, { label: "Pilsen 500ml", price: "R$ 14,00" }, { label: "IPA 370ml", price: "R$ 14,00" }, { label: "IPA 500ml", price: "R$ 16,00" }] },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    items: [
      { name: "Aperol Spritz", description: "Aperol, espumante, água com gás e laranja bahia", price: "R$ 26,90" },
      { name: "Mojito", description: "Rum, suco de limão gaseificado e hortelã", price: "R$ 32,00" },
      { name: "Caipirinha de Vinho", description: "Limão, gelo, açúcar e vinho - consulte", price: "R$ 35,00" },
      { name: "Caipirinha de Frutas", description: "Limão, gelo, açúcar e fruta da estação", price: "R$ 30,00" },
      { name: "Gim Tônica", description: "Gim, água tônica e gelo", price: "R$ 40,00" },
      { name: "Jack Lemonade", description: "Jack Daniel's, suco de limão siciliano, xarope de açúcar e água com gás", price: "R$ 38,00" },
    ],
  },
  {
    id: "entradas-porcoes",
    title: "Entradas e Porções",
    items: [
      { name: "Bolinho de Bacalhau (06 unidades)", description: "Acompanha molho de pimenta", price: "R$ 42,00" },
      { name: "Bruscheta com brie e mel (06 unidades)", description: "Bruscheta na média, acompanhada de brie e mel", price: "R$ 47,00" },
      { name: "Pão de alho com goiabada", description: "Pão de alho acompanhado de queijo coalho e goiabada", price: "R$ 42,00" },
      { name: "Batata frita", description: "Porção de batata frita da casa", price: "R$ 47,00" },
      { name: "Batata com cheddar e bacon", description: "Porção de batata frita da casa acompanhada de cheddar e bacon", price: "R$ 72,00" },
      { name: "Mandioca frita", description: "Porção de mandioca frita", price: "R$ 47,00" },
      { name: "Mandioca frita com catupiry e carne seca", price: "R$ 83,00" },
      { name: "Isca de peixe", description: "Isca de tilápia frita empanada, acompanhada de molho da casa", price: "R$ 84,00" },
      { name: "Isca de baby beef empanado", description: "Porção de baby beef empanado, acompanhado de catupiry e molho tarê", price: "R$ 109,00" },
      { name: "Isca de frango Malásia", description: "Porção de isca de frango, coberto de molho tarê e acompanhado de catupiry", price: "R$ 107,00" },
      { name: "Churrasco de fraldinha", description: "Fraldinha bovina, batata frita, farofa e molho de cebolete", price: "R$ 130,00" },
      { name: "Baby beef ao molho 2 queijos", description: "Iscas de baby beef Maturatta mergulhados em nosso mix de queijo gratinado", price: "R$ 144,00" },
    ],
  },
  {
    id: "pratos-a-la-carte",
    title: "Pratos a La Carte",
    items: [
      { name: "Picanha à moda", description: "Arroz com alho crocante, farofa, vinagrete, fritas, ovo, alface, rúcula e tomate", priceHalf: "R$ 105,00", priceFull: "R$ 177,00" },
      { name: "Parmegiana de Filé Mignon", description: "Arroz e batata frita", priceHalf: "R$ 84,00", priceFull: "R$ 158,00" },
      { name: "Tilápia do Chefe", description: "Arroz, molho pesto, legumes gratinados e purê de batata", priceHalf: "R$ 84,00", priceFull: "R$ 156,00" },
      { name: "Frango a milanesa", description: "Arroz, batata frita, alface e rúcula", priceHalf: "R$ 74,00", priceFull: "R$ 120,00" },
      { name: "Contra a milanesa", description: "Arroz, batata frita, alface e rúcula", priceHalf: "R$ 80,00", priceFull: "R$ 140,00" },
      { name: "Tilápia a milanesa", description: "Arroz, purê de batata, alface e rúcula", priceHalf: "R$ 80,00", priceFull: "R$ 140,00" },
      { name: "Salmon Molho Maracujá", description: "Arroz, batata sauté e banana milanesa", priceHalf: "R$ 109,00", priceFull: "R$ 189,00" },
    ],
  },
  {
    id: "pratos-executivos-saladas",
    title: "Pratos Executivos e Saladas",
    items: [
      { name: "Prato Vegetariano", price: "R$ 45,00" },
      { name: "Executivo", description: "Arroz e batata frita", price: "R$ 45,00" },
      { name: "Salada da Casa", price: "R$ 28,00" },
      { name: "Salada Caesar", description: "Anotado no cardápio acompanhando arroz e batata frita", price: "R$ 38,00" },
    ],
  },
];

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  // Auto-center header pills when activeCategory changes
  useEffect(() => {
    if (headerScrollRef.current) {
      const container = headerScrollRef.current;
      const activeButton = container.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement;
      if (activeButton) {
        const scrollPos = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);
        container.scrollTo({
          left: scrollPos,
          behavior: "smooth"
        });
      }
    }
  }, [activeCategory]);

  const handleScroll = () => {
    if (isClickScrolling.current) return;
    if (!scrollContainerRef.current) return;

    const scrollPos = scrollContainerRef.current.scrollTop;
    const offset = 140; // Adjust for sticky header height + some padding

    let currentCategory = activeCategory;

    // Iterate backwards to find the last element that has passed the scroll offset
    for (let i = menuData.length - 1; i >= 0; i--) {
      const category = menuData[i];
      const element = document.getElementById(`category-${category.id}`);
      if (element) {
        if (element.offsetTop <= scrollPos + offset) {
          currentCategory = category.id;
          break;
        }
      }
    }

    if (currentCategory !== activeCategory) {
      setActiveCategory(currentCategory);
    }
  };

  const scrollToCategory = (id: string) => {
    isClickScrolling.current = true;
    setActiveCategory(id);
    const element = document.getElementById(`category-${id}`);
    if (element && scrollContainerRef.current) {
      const topPos = element.offsetTop - 120; // Adjust for sticky header height
      scrollContainerRef.current.scrollTo({
        top: topPos,
        behavior: "smooth",
      });

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 800); // Wait for smooth scroll to finish
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none sm:items-center">
            {/* Modal Content */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full h-[90vh] sm:h-[85vh] sm:max-w-2xl bg-neutral-900 rounded-t-3xl sm:rounded-2xl pointer-events-auto flex flex-col relative overflow-hidden shadow-2xl border border-neutral-800"
            >
              {/* Header (Sticky) */}
              <div className="bg-neutral-900/95 backdrop-blur-md z-10 pt-4 pb-2 px-6 border-b border-neutral-800 sticky top-0 shrink-0">
                {/* Pull handle for mobile */}
                <div className="w-12 h-1.5 bg-neutral-700 rounded-full mx-auto mb-4 sm:hidden" />

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Nosso Cardápio</h2>
                  <button
                    onClick={onClose}
                    className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-neutral-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Pills */}
                <div ref={headerScrollRef} className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-6 px-6 mask-fade-edges scroll-smooth">
                  {menuData.map((category) => (
                    <button
                      key={category.id}
                      data-category={category.id}
                      onClick={() => scrollToCategory(category.id)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id
                          ? "bg-amber-500 text-neutral-950"
                          : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                        }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body / Menu Items */}
              <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-6 py-4 pb-24 scroll-smooth">
                {menuData.map((category) => (
                  <div key={category.id} id={`category-${category.id}`} className="mb-10 last:mb-0 pt-4">
                    <h3 className="text-xl font-semibold text-white mb-4 border-b border-neutral-800 pb-2">
                      {category.title}
                    </h3>
                    <div className="space-y-4">
                      {category.items.map((item, index) => (
                        <div key={index} className="flex flex-col gap-1 py-3 border-b border-neutral-800/50 last:border-0">
                          <div className="flex justify-between items-start gap-4">
                            <h4 className="text-neutral-100 font-medium">{item.name}</h4>

                            {/* Standard Price */}
                            {item.price && (
                              <span className="text-amber-500 font-semibold shrink-0">
                                {item.price}
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          {item.description && (
                            <p className="text-sm text-neutral-400 leading-relaxed pr-12">
                              {item.description}
                            </p>
                          )}

                          {/* Half / Full Price Options */}
                          {(item.priceHalf || item.priceFull) && (
                            <div className="flex gap-4 mt-2 text-sm">
                              {item.priceHalf && (
                                <div className="bg-neutral-800/50 px-3 py-1 rounded-md">
                                  <span className="text-neutral-400 mr-2">Meia:</span>
                                  <span className="text-amber-500 font-medium">{item.priceHalf}</span>
                                </div>
                              )}
                              {item.priceFull && (
                                <div className="bg-neutral-800/50 px-3 py-1 rounded-md">
                                  <span className="text-neutral-400 mr-2">Inteira:</span>
                                  <span className="text-amber-500 font-medium">{item.priceFull}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Options with different prices (e.g., Chopp) */}
                          {item.priceOptions && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                              {item.priceOptions.map((opt, i) => (
                                <div key={i} className="flex justify-between items-center text-sm bg-neutral-800/30 px-3 py-2 rounded-md">
                                  <span className="text-neutral-300">{opt.label}</span>
                                  <span className="text-amber-500 font-medium">{opt.price}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* CTA at the end of the scroll */}
                <div className="flex flex-col items-center justify-center mt-8 mb-8">
                  <p className="text-neutral-400 text-sm mb-3">Gostou do que viu?</p>
                  <a
                    href="https://wa.me/5514997096292?text=Ol%C3%A1!%20Acabei%20de%20ver%20o%20card%C3%A1pio%20no%20site%20e%20gostaria%20de%20fazer%20um%20pedido%20ou%20reserva."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border-2 border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white font-bold py-3 px-10 rounded-full transition-all"
                  >
                    Fazer Reserva
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
