import express from "express";
import { Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import prisma from "./config/prisma";
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json);
app.use(helmet());

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Connecté à la base de données");
  } catch (error) {
    console.error("❌ Erreur de connexion à la base :", error);
    process.exit(1); // Arrêter le serveur si pas de DB
  }
};

app.get("/", (_, res: Response) => {
  res.json("Mini système de tickets de support client");
});

app.listen(port, () => {
  connectDB();
  console.log(`serveur connecté http://localhost:${port}`);
});
