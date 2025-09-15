// Configuration Swagger manuelle
export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Ticket Manager System API',
    version: '1.0.0',
    description: 'Mini système de tickets de support client avec authentification JWT',
    contact: {
      name: 'Support',
      email: 'support@ticketmanager.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Serveur de développement'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT obtenu lors de la connexion'
      }
    },
    schemas: {
      User: {
        type: 'object',
        required: ['name', 'email', 'password', 'role'],
        properties: {
          id: {
            type: 'string',
            description: 'ID unique de l\'utilisateur',
            example: 'clm123abc456def789'
          },
          name: {
            type: 'string',
            minLength: 3,
            description: 'Nom de l\'utilisateur',
            example: 'Jean Dupont'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Adresse email unique',
            example: 'jean.dupont@example.com'
          },
          password: {
            type: 'string',
            minLength: 6,
            description: 'Mot de passe (minimum 6 caractères)',
            example: 'motdepasse123'
          },
          role: {
            type: 'string',
            enum: ['client', 'agent'],
            description: 'Rôle de l\'utilisateur',
            example: 'client'
          },
          createAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date de création',
            example: '2025-09-15T12:00:00.000Z'
          }
        }
      },
      Ticket: {
        type: 'object',
        required: ['title', 'description'],
        properties: {
          id: {
            type: 'string',
            description: 'ID unique du ticket',
            example: 'clm456def789ghi012'
          },
          userId: {
            type: 'string',
            description: 'ID de l\'utilisateur qui a créé le ticket',
            example: 'clm123abc456def789'
          },
          title: {
            type: 'string',
            minLength: 3,
            description: 'Titre du ticket',
            example: 'Problème de connexion'
          },
          description: {
            type: 'string',
            minLength: 10,
            description: 'Description détaillée du problème',
            example: 'Je n\'arrive pas à me connecter à mon compte depuis ce matin.'
          },
          status: {
            type: 'string',
            enum: ['open', 'in_progress', 'closed'],
            description: 'Statut du ticket',
            example: 'open'
          },
          createAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date de création du ticket',
            example: '2025-09-15T12:00:00.000Z'
          },
          user: {
            $ref: '#/components/schemas/UserPublic'
          }
        }
      },
      UserPublic: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID unique de l\'utilisateur',
            example: 'clm123abc456def789'
          },
          name: {
            type: 'string',
            description: 'Nom de l\'utilisateur',
            example: 'Jean Dupont'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Adresse email',
            example: 'jean.dupont@example.com'
          },
          role: {
            type: 'string',
            enum: ['client', 'agent'],
            description: 'Rôle de l\'utilisateur',
            example: 'client'
          }
        }
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'Adresse email',
            example: 'jean.dupont@example.com'
          },
          password: {
            type: 'string',
            minLength: 6,
            description: 'Mot de passe',
            example: 'motdepasse123'
          }
        }
      },
      RegisterRequest: {
        type: 'object',
        required: ['name', 'email', 'password', 'role'],
        properties: {
          name: {
            type: 'string',
            minLength: 3,
            description: 'Nom de l\'utilisateur',
            example: 'Jean Dupont'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Adresse email',
            example: 'jean.dupont@example.com'
          },
          password: {
            type: 'string',
            minLength: 6,
            description: 'Mot de passe',
            example: 'motdepasse123'
          },
          role: {
            type: 'string',
            enum: ['client', 'agent'],
            description: 'Rôle de l\'utilisateur',
            example: 'client'
          }
        }
      },
      CreateTicketRequest: {
        type: 'object',
        required: ['title', 'description'],
        properties: {
          title: {
            type: 'string',
            minLength: 3,
            description: 'Titre du ticket',
            example: 'Problème de connexion'
          },
          description: {
            type: 'string',
            minLength: 10,
            description: 'Description du problème',
            example: 'Je n\'arrive pas à me connecter à mon compte depuis ce matin.'
          }
        }
      },
      LoginResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Connexion réussie'
          },
          token: {
            type: 'string',
            description: 'Token JWT à utiliser pour l\'authentification',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          },
          user: {
            $ref: '#/components/schemas/UserPublic'
          }
        }
      },
      TicketResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Ticket créé avec succès'
          },
          ticket: {
            $ref: '#/components/schemas/Ticket'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Message d\'erreur',
            example: 'Données invalides'
          },
          issues: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: {
                  type: 'array',
                  items: {
                    type: 'string'
                  }
                },
                message: {
                  type: 'string'
                }
              }
            },
            description: 'Détails des erreurs de validation'
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Authentication',
      description: 'Endpoints d\'authentification et d\'inscription'
    },
    {
      name: 'Tickets',
      description: 'Gestion des tickets de support'
    },
    {
      name: 'Users',
      description: 'Gestion des utilisateurs (compatibilité)'
    }
  ],
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Inscription d\'un nouvel utilisateur',
        description: 'Crée un nouvel utilisateur (client ou agent) avec un mot de passe hashé',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterRequest'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Utilisateur créé avec succès',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Utilisateur créé avec succès'
                    },
                    user: {
                      $ref: '#/components/schemas/UserPublic'
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          '409': {
            description: 'Un utilisateur avec cet email existe déjà',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Un utilisateur avec cet email existe déjà'
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Erreur interne du serveur',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Connexion d\'un utilisateur',
        description: 'Authentifie un utilisateur et retourne un token JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Connexion réussie',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginResponse'
                }
              }
            }
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          '401': {
            description: 'Email ou mot de passe incorrect',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Email ou mot de passe incorrect'
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Erreur interne du serveur',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    '/api/users': {
      post: {
        tags: ['Users'],
        summary: 'Créer un utilisateur (alias)',
        description: 'Alias vers /api/auth/register pour maintenir la compatibilité',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterRequest'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Utilisateur créé avec succès',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Utilisateur créé avec succès'
                    },
                    user: {
                      $ref: '#/components/schemas/UserPublic'
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          '409': {
            description: 'Un utilisateur avec cet email existe déjà',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Un utilisateur avec cet email existe déjà'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/tickets': {
      post: {
        tags: ['Tickets'],
        summary: 'Créer un nouveau ticket',
        description: 'Permet à un client authentifié d\'ouvrir un nouveau ticket de support',
        security: [
          {
            bearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateTicketRequest'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Ticket créé avec succès',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TicketResponse'
                }
              }
            }
          },
          '400': {
            description: 'Données invalides',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          '401': {
            description: 'Token manquant ou invalide',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Token d\'accès requis'
                    }
                  }
                }
              }
            }
          },
          '403': {
            description: 'Seuls les clients peuvent ouvrir des tickets',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Seuls les clients peuvent ouvrir des tickets'
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Erreur interne du serveur',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    '/api/tickets/{id}': {
      get: {
        tags: ['Tickets'],
        summary: 'Voir les détails d\'un ticket',
        description: 'Récupère les détails d\'un ticket spécifique',
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID du ticket',
            schema: {
              type: 'string',
              example: 'clm456def789ghi012'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Détails du ticket récupérés avec succès',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    ticket: {
                      $ref: '#/components/schemas/Ticket'
                    }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Token manquant ou invalide',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Token d\'accès requis'
                    }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Ticket non trouvé',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Ticket non trouvé'
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Erreur interne du serveur',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    }
  }
};