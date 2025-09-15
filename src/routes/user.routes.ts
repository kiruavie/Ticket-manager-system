import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const userRoutes = Router();

// POST /users → créer un utilisateur (client ou agent)
userRoutes.post("/", createUser);

export default userRoutes;
