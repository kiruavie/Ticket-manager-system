import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir 3 caractères minimum"),
  email: z.string().email("Adresse email incorrecte"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  role: z.enum(["client", "agent"], {
    message: "Le rôle doit être soit 'client' soit 'agent'",
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
