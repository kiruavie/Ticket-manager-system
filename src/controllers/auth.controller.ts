import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { createUserSchema } from "../schemas/userSchema";

// Schéma de validation pour la connexion
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

// Inscription d'un utilisateur
export const register = async (req: Request, res: Response) => {
  try {
    const data = createUserSchema.safeParse(req.body);

    if (!data.success) {
      return res.status(400).json({
        error: "Données invalides",
        issues: data.error.issues,
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: data.data.email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Un utilisateur avec cet email existe déjà" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(data.data.password, 12);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name: data.data.name,
        email: data.data.email,
        password: hashedPassword,
        role: data.data.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createAt: true,
      },
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Connexion d'un utilisateur
export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.safeParse(req.body);

    if (!data.success) {
      return res.status(400).json({
        error: "Données invalides",
        issues: data.error.issues,
      });
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email: data.data.email },
    });

    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(
      data.data.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secret_temp_key",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
