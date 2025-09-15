import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const authRoutes = Router();

// POST /auth/register → inscription
authRoutes.post("/register", register);

// POST /auth/login → connexion
authRoutes.post("/login", login);

export default authRoutes;
