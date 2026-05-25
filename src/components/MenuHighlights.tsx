import { UtensilsCrossed, Plus } from "lucide-react";

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
  return (
    <section id="cardapio" className="py-24 bg-neutral-950 relative border-t border-neutral-900">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold tracking-widest text-sm uppercase mb-3 block">
            Os Campeões de Vendas
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-serif">
            Destaques do Cardápio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {destaques.map((prato) => (
            <div 
              key={prato.id}
              className="bg-neutral-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col border border-neutral-800 hover:border-amber-600/30"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img 
                  src={prato.imagem} 
                  alt={prato.nome}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
                <span className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                  {prato.tag}
                </span>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 font-serif">
                  {prato.nome}
                </h3>
                <p className="text-sm text-neutral-400 mb-6 flex-grow leading-relaxed">
                  {prato.descricao}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-800">
                  <span className="text-lg font-bold text-amber-500">
                    {prato.preco}
                  </span>
                  <button className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white group-hover:bg-amber-600 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="inline-flex items-center justify-center gap-2 border-2 border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white font-semibold py-4 px-10 rounded-full transition-all hover:scale-105"
          >
            <UtensilsCrossed size={20} />
            Ver Cardápio Completo
          </a>
        </div>
        
      </div>
    </section>
  );
}
