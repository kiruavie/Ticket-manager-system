import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ticket Manager System API",
      version: "1.0.0",
      description:
        "Mini système de tickets de support client avec authentification JWT",
      contact: {
        name: "Support",
        email: "support@ticketmanager.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Serveur de développement",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT obtenu lors de la connexion",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password", "role"],
          properties: {
            id: {
              type: "string",
              description: "ID unique de l'utilisateur",
              example: "clm123abc456def789",
            },
            name: {
              type: "string",
              minLength: 3,
              description: "Nom de l'utilisateur",
              example: "Jean Dupont",
            },
            email: {
              type: "string",
              format: "email",
              description: "Adresse email unique",
              example: "jean.dupont@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "Mot de passe (minimum 6 caractères)",
              example: "motdepasse123",
            },
            role: {
              type: "string",
              enum: ["client", "agent"],
              description: "Rôle de l'utilisateur",
              example: "client",
            },
            createAt: {
              type: "string",
              format: "date-time",
              description: "Date de création",
              example: "2025-09-15T12:00:00.000Z",
            },
          },
        },
        Ticket: {
          type: "object",
          required: ["title", "description"],
          properties: {
            id: {
              type: "string",
              description: "ID unique du ticket",
              example: "clm456def789ghi012",
            },
            userId: {
              type: "string",
              description: "ID de l'utilisateur qui a créé le ticket",
              example: "clm123abc456def789",
            },
            title: {
              type: "string",
              minLength: 3,
              description: "Titre du ticket",
              example: "Problème de connexion",
            },
            description: {
              type: "string",
              minLength: 10,
              description: "Description détaillée du problème",
              example:
                "Je n'arrive pas à me connecter à mon compte depuis ce matin.",
            },
            status: {
              type: "string",
              enum: ["open", "in_progress", "closed"],
              description: "Statut du ticket",
              example: "open",
            },
            createAt: {
              type: "string",
              format: "date-time",
              description: "Date de création du ticket",
              example: "2025-09-15T12:00:00.000Z",
            },
            user: {
              $ref: "#/components/schemas/UserPublic",
            },
          },
        },
        UserPublic: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "ID unique de l'utilisateur",
              example: "clm123abc456def789",
            },
            name: {
              type: "string",
              description: "Nom de l'utilisateur",
              example: "Jean Dupont",
            },
            email: {
              type: "string",
              format: "email",
              description: "Adresse email",
              example: "jean.dupont@example.com",
            },
            role: {
              type: "string",
              enum: ["client", "agent"],
              description: "Rôle de l'utilisateur",
              example: "client",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "Adresse email",
              example: "jean.dupont@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "Mot de passe",
              example: "motdepasse123",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password", "role"],
          properties: {
            name: {
              type: "string",
              minLength: 3,
              description: "Nom de l'utilisateur",
              example: "Jean Dupont",
            },
            email: {
              type: "string",
              format: "email",
              description: "Adresse email",
              example: "jean.dupont@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "Mot de passe",
              example: "motdepasse123",
            },
            role: {
              type: "string",
              enum: ["client", "agent"],
              description: "Rôle de l'utilisateur",
              example: "client",
            },
          },
        },
        CreateTicketRequest: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: {
              type: "string",
              minLength: 3,
              description: "Titre du ticket",
              example: "Problème de connexion",
            },
            description: {
              type: "string",
              minLength: 10,
              description: "Description du problème",
              example:
                "Je n'arrive pas à me connecter à mon compte depuis ce matin.",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Connexion réussie",
            },
            token: {
              type: "string",
              description: "Token JWT à utiliser pour l'authentification",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            user: {
              $ref: "#/components/schemas/UserPublic",
            },
          },
        },
        TicketResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Ticket créé avec succès",
            },
            ticket: {
              $ref: "#/components/schemas/Ticket",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Message d'erreur",
              example: "Données invalides",
            },
            issues: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  message: {
                    type: "string",
                  },
                },
              },
              description: "Détails des erreurs de validation",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "Endpoints d'authentification et d'inscription",
      },
      {
        name: "Tickets",
        description: "Gestion des tickets de support",
      },
      {
        name: "Users",
        description: "Gestion des utilisateurs (compatibilité)",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // chemins vers les fichiers contenant les annotations
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
