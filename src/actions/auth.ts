"use server";

import { cookies } from "next/headers";

export async function loginAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD não está definida no arquivo .env");
    return { success: false, error: "Erro de configuração no servidor." };
  }

  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "authenticated", {
      httpOnly: true, // Mais seguro, impede acesso via JavaScript (js-cookie)
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    
    return { success: true };
  }
  
  return { success: false, error: "Senha incorreta." };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}
