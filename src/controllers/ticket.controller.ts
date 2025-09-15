import { Response } from "express";
import { createTicketSchema } from "../schemas/ticketSchema";
import prisma from "../config/prisma";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export const openTicket = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // L'userId vient du token d'authentification, pas du body
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    // Valider seulement title et description (pas userId)
    const data = createTicketSchema.safeParse(req.body);

    if (!data.success) {
      return res
        .status(400)
        .json({ error: "Données invalides", issues: data.error.issues });
    }

    // Vérifier que l'utilisateur est un client
    if (req.user?.role !== "client") {
      return res
        .status(403)
        .json({ error: "Seuls les clients peuvent ouvrir des tickets" });
    }

    const ticket = await prisma.ticket.create({
      data: {
        userId: userId, // Utiliser l'ID du token
        title: data.data.title,
        description: data.data.description,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Ticket créé avec succès",
      ticket,
    });
  } catch (error) {
    console.error("Erreur lors de la création du ticket:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// voir les details d'un ticket
export const getTicket = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await prisma.ticket.findUnique({ where: { id: id } });

    return res.status(200).json({ success: true, ticket });
  } catch (error) {
    console.error("Erreur lors de la création du ticket:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
