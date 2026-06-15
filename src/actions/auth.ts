"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.ADMIN_PASSWORD || "default_secret_key_change_me";
const key = new TextEncoder().encode(secretKey);

export async function loginAdmin(password: string) {
  if (password === process.env.ADMIN_PASSWORD) {
    // Create JWT
    const jwt = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(key);

    const cookieStore = await cookies();
    cookieStore.set("admin_token", jwt, {
      httpOnly: true,
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

export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return false;

  try {
    await jwtVerify(token, key);
    return true;
  } catch (error) {
    return false;
  }
}
