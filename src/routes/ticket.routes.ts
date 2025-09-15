import { Router } from "express";
import { getTicket, openTicket } from "../controllers/ticket.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const ticketRoutes = Router();

// POST /tickets → un client ouvre un ticket (protégé)
ticketRoutes.post("/", authenticateToken, openTicket);

// voir les détails d'un ticket + messages (protégé)
ticketRoutes.get("/:id", authenticateToken, getTicket);

export default ticketRoutes;
