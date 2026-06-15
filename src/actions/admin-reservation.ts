"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "./auth";
import { ReservationStatus } from "@prisma/client";

export async function getReservations(filters?: { status?: string; date?: string; search?: string }) {
  const isAuth = await verifyAuth();
  if (!isAuth) throw new Error("Unauthorized");

  const where: any = {};
  
  if (filters?.status && filters.status !== "ALL") {
    where.status = filters.status;
  }
  
  if (filters?.date) {
    where.date = filters.date;
  }
  
  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { phone: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  const reservations = await prisma.reservation.findMany({
    where,
    orderBy: [
      { date: 'asc' },
      { time: 'asc' }
    ],
  });

  return reservations;
}

export async function updateReservationStatus(id: string, status: ReservationStatus) {
  const isAuth = await verifyAuth();
  if (!isAuth) throw new Error("Unauthorized");

  try {
    await prisma.reservation.update({
      where: { id },
      data: { status },
    });
    
    revalidatePath("/admin/reservas");
    return { success: true };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: "Falha ao atualizar o status" };
  }
}
