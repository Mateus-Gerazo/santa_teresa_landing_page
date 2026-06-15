"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ReservationStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function getReservations(filters?: { status?: string; date?: string; search?: string }) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get('admin_token')?.value === 'authenticated';
  if (!isAuth) return { success: false, error: "Unauthorized" };

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

  return { success: true, data: reservations };
}

export async function updateReservationStatus(id: string, status: ReservationStatus) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get('admin_token')?.value === 'authenticated';
  if (!isAuth) return { success: false, error: "Unauthorized" };

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
