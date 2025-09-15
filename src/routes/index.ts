import { Router } from "express";
import userRoutes from "./user.routes";
import ticketRoutes from "./ticket.routes";
import authRoutes from "./auth.routes";

const router = Router();

// Routes d'authentification
router.use("/auth", authRoutes);

// Routes des utilisateurs (pour compatibilité)
router.use("/users", userRoutes);

// Routes des tickets (protégées)
router.use("/tickets", ticketRoutes);

export default router;
