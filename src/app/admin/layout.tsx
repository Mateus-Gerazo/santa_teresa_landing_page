"use client";

import { logoutAdmin } from "@/actions/auth";
import { LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-neutral-900">{children}</div>;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col font-sans">
      <header className="bg-neutral-900 shadow-md border-b border-neutral-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image 
              src="/images/santa_teresa_logo_branca.png" 
              alt="Logo" 
              width={150} 
              height={40} 
              className="h-8 w-auto object-contain"
            />
            <span className="font-semibold text-amber-500 hidden sm:inline-block border-l border-neutral-700 pl-4">
              Painel de Reservas
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
