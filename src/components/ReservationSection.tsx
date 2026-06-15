"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, User, Phone, FileText } from "lucide-react";
import { createReservation } from "@/actions/reservation";

export default function ReservationSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      guests: Number(formData.get("guests")),
      notes: formData.get("notes") as string,
    };

    try {
      const res = await createReservation(data);
      if (res.success) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(res.error || "Erro ao realizar reserva.");
      }
    } catch (err) {
      setError("Erro de conexão ao realizar reserva.");
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD for the min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reservas" className="py-20 md:py-28 bg-neutral-900 text-white relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-500 tracking-widest text-sm uppercase font-semibold mb-2 block"
          >
            Viva essa experiência
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Reserve sua Mesa
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-amber-600 mx-auto rounded-full"
          ></motion.div>
        </div>

        <div className="max-w-3xl mx-auto bg-neutral-800/50 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl">
          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Reserva Solicitada!</h3>
              <p className="text-neutral-300">
                Sua solicitação de reserva foi enviada com sucesso. Em breve entraremos em contato pelo telefone informado para confirmar sua mesa.
              </p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-8 text-amber-500 hover:text-amber-400 font-semibold transition-colors"
              >
                Fazer outra reserva
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-neutral-300">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      minLength={3}
                      className="w-full bg-neutral-900/80 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      placeholder="Seu nome"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-neutral-300">Telefone (WhatsApp)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      className="w-full bg-neutral-900/80 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      placeholder="(11) 99999-9999"
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length > 11) value = value.substring(0, 11);
                        if (value.length > 2) value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                        if (value.length > 9) value = `${value.substring(0, 9)}-${value.substring(9)}`;
                        e.target.value = value;
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium text-neutral-300">Data</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                    <input 
                      type="date" 
                      id="date" 
                      name="date" 
                      required 
                      min={today}
                      className="w-full bg-neutral-900/80 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium text-neutral-300">Horário</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                    <input 
                      type="time" 
                      id="time" 
                      name="time" 
                      required 
                      className="w-full bg-neutral-900/80 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="guests" className="text-sm font-medium text-neutral-300">Quantidade de Pessoas</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                    <input 
                      type="number" 
                      id="guests" 
                      name="guests" 
                      required 
                      min={1}
                      max={20}
                      className="w-full bg-neutral-900/80 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      placeholder="Ex: 2"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="notes" className="text-sm font-medium text-neutral-300">Observações (Opcional)</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-4 text-neutral-500 w-5 h-5" />
                    <textarea 
                      id="notes" 
                      name="notes" 
                      rows={3}
                      className="w-full bg-neutral-900/80 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none"
                      placeholder="Alguma restrição alimentar ou pedido especial?"
                    ></textarea>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-lg transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(212,165,116,0.2)] flex items-center justify-center disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Confirmar Reserva"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
