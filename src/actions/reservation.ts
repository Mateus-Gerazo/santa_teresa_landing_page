"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reservationSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: z.string().min(10, "Telefone inválido"),
  date: z.string().min(10, "Data inválida"),
  time: z.string().min(4, "Horário inválido"),
  guests: z.number().min(1).max(20),
  notes: z.string().optional(),
});

export async function createReservation(data: z.infer<typeof reservationSchema>) {
  try {
    const validatedData = reservationSchema.parse(data);
    
    await prisma.reservation.create({
      data: {
        ...validatedData,
        status: "PENDING",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating reservation:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "Erro ao criar reserva" };
  }
}
