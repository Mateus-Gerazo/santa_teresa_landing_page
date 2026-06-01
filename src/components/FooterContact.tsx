"use client";

import { MapPin, Clock, Phone } from "lucide-react";
import { motion } from "framer-motion";

const InstagramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function FooterContact() {
  return (
    <footer id="localizacao" className="bg-neutral-950 text-neutral-300 border-t border-neutral-900 pt-16 md:pt-20">
      <div className="container mx-auto px-4 sm:px-6 mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

          {/* Lado Esquerdo: Mapa */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.7286734603465!2d-48.129266773197784!3d-22.290912019280057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c779004a573993%3A0xb050a71544bdf394!2sRestaurante%20Santa%20Teresa%20Brotas!5e0!3m2!1spt-BR!2sbr!4v1779747249246!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(20%) contrast(1.2)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Restaurante Santa Teresa"
            />
          </motion.div>

          {/* Lado Direito: Informações */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="flex flex-col gap-10"
          >
            <div>
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="text-3xl md:text-4xl font-bold text-white font-serif mb-6 md:mb-8"
              >
                Venha nos visitar
              </motion.h2>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="flex gap-4 items-start mb-6 group"
              >
                <div className="mt-1 bg-neutral-900 p-3 rounded-xl border border-neutral-800 group-hover:border-amber-600/50 transition-colors">
                  <MapPin className="text-amber-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-1">Endereço</h4>
                  <p className="text-neutral-400 leading-relaxed mb-3">
                    Av. Mario Pinoti, 500 - Centro<br />
                    Brotas - SP, 17380-000
                  </p>
                  <a href="https://maps.app.goo.gl/mUPU3LZ7z7Pfsbke9" className="inline-block text-sm text-amber-500 hover:text-amber-400 font-medium" target="_blank">
                    Abrir no Waze / Google Maps &rarr;
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="flex gap-4 items-start mb-6 group"
              >
                <div className="mt-1 bg-neutral-900 p-3 rounded-xl border border-neutral-800 group-hover:border-amber-600/50 transition-colors">
                  <Clock className="text-amber-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-2">Horário de Funcionamento</h4>
                  <ul className="text-neutral-400 space-y-2">
                    <li className="flex justify-between w-full max-w-xs border-b border-neutral-800 pb-1">
                      <span>Quarta a Segunda</span>
                      <span className="text-white ml-4">11h30 às 15h00</span>
                    </li>
                    <li className="flex justify-between w-full max-w-xs border-b border-neutral-800 pb-1">
                      <span></span>
                      <span className="text-white ml-4">18h30 às 23h00</span>
                    </li>
                    <li className="flex justify-between w-full max-w-xs pt-1">
                      <span>Terça-feira</span>
                      <span className="text-red-400 font-medium ml-4">Fechado</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="flex gap-4 items-start group"
              >
                <div className="mt-1 bg-neutral-900 p-3 rounded-xl border border-neutral-800 group-hover:border-amber-600/50 transition-colors">
                  <Phone className="text-amber-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-2">Contato e Redes</h4>
                  <p className="text-neutral-400 mb-2">
                    (14) 99709-6292
                  </p>
                  <a href="https://www.instagram.com/santateresabrotas/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-amber-500 transition-colors">
                    <InstagramIcon size={18} />
                    <span>@restaurantesantateresa</span>
                  </a>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Micro-Rodapé */}
      <div className="bg-black py-6 border-t border-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs text-neutral-600">
          <p>&copy; {new Date().getFullYear()} Restaurante Santa Teresa Brotas. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por <a href="#" className="text-neutral-400 hover:text-amber-500 transition-colors font-medium">Você / Agência</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
