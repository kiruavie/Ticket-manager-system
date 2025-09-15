import z from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
