import express from "express";
import { Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import prisma from "./config/prisma";
import router from "./routes";
import { swaggerDocument } from "./config/swagger-doc";
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
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
  res.json({
    message: "Mini système de tickets de support client",
    documentation: "http://localhost:4000/api-docs",
    version: "1.0.0",
  });
});

// Documentation Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "Ticket Manager API",
    customCss: ".swagger-ui .topbar { display: none }",
    swaggerOptions: {
      docExpansion: "none",
      filter: true,
      showRequestDuration: true,
    },
  })
);

// Utilisation des routes API
app.use("/api", router);

app.listen(port, () => {
  connectDB();
  console.log(`serveur connecté http://localhost:${port}`);
});
