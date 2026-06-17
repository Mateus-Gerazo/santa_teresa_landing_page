"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reservationSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4,5}$/, "Formato de telefone inválido"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido").refine((val) => {
    const date = new Date(`${val}T00:00:00`);
    if (isNaN(date.getTime())) return false;
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const maxDate = new Date(now);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    
    const minDate = new Date(now);
    minDate.setDate(minDate.getDate() - 1); // Tolerância de fuso horário

    return date >= minDate && date <= maxDate;
  }, "A data não pode estar no passado nem ser maior que 1 ano no futuro"),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de horário inválido"),
  guests: z.number().min(1, "Mínimo de 1 pessoa").max(15, "Máximo de 15 pessoas"),
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
