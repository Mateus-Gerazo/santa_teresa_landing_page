"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";
import { loginAdmin } from "@/actions/auth";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginAdmin(password);
      
      if (res.success) {
        router.push("/admin/reservas");
        router.refresh();
      } else {
        setError(res.error || "Erro ao fazer login.");
      }
    } catch (err) {
      setError("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-950 text-neutral-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/hero-prato-assinatura.jpg')] bg-cover bg-center opacity-10" />
      
      <div className="w-full max-w-md bg-neutral-900/90 backdrop-blur-md rounded-2xl border border-neutral-800 shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <Image 
            src="/images/santa_teresa_logo_branca.png" 
            alt="Logo" 
            width={200} 
            height={60} 
            className="mx-auto h-12 w-auto object-contain mb-6"
          />
          <h1 className="text-2xl font-serif font-bold text-white mb-2">Acesso Restrito</h1>
          <p className="text-neutral-400 text-sm">Digite a senha para acessar o painel administrativo.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de Acesso"
                required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg flex items-center justify-center"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
