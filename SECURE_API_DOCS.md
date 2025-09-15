# Documentation API - Système de Gestion de Tickets Sécurisé

## Endpoints implémentés

### 1. Inscription d'un utilisateur

**POST** `/api/auth/register`

Crée un nouvel utilisateur (client ou agent) avec un mot de passe hashé.

#### Corps de la requête

```json
{
  "name": "string (min 3 caractères)",
  "email": "string (email valide)",
  "password": "string (min 6 caractères)",
  "role": "client" | "agent"
}
```

#### Exemple de requête

```json
{
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "password": "motdepasse123",
  "role": "client"
}
```

#### Réponses

- **201 Created** : Utilisateur créé avec succès
- **400 Bad Request** : Données invalides
- **409 Conflict** : Email déjà utilisé
- **500 Internal Server Error** : Erreur serveur

### 2. Connexion d'un utilisateur

**POST** `/api/auth/login`

Authentifie un utilisateur et retourne un token JWT.

#### Corps de la requête

```json
{
  "email": "string (email valide)",
  "password": "string (min 6 caractères)"
}
```

#### Exemple de requête

```json
{
  "email": "jean.dupont@example.com",
  "password": "motdepasse123"
}
```

#### Réponses

- **200 OK** : Connexion réussie avec token
- **400 Bad Request** : Données invalides
- **401 Unauthorized** : Email ou mot de passe incorrect
- **500 Internal Server Error** : Erreur serveur

#### Exemple de réponse

```json
{
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clm123abc456def789",
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "role": "client"
  }
}
```

### 3. Créer un utilisateur (compatibilité)

**POST** `/api/users`

Alias vers `/api/auth/register` pour maintenir la compatibilité.

### 4. Ouvrir un ticket (protégé)

**POST** `/api/tickets`

Permet à un client authentifié d'ouvrir un nouveau ticket de support.

#### Headers requis

```
Authorization: Bearer <token_jwt>
```

#### Corps de la requête

```json
{
  "title": "string (min 3 caractères)",
  "description": "string (min 10 caractères)"
}
```

#### Exemple de requête

```json
{
  "title": "Problème de connexion",
  "description": "Je n'arrive pas à me connecter à mon compte depuis ce matin."
}
```

#### Réponses

- **201 Created** : Ticket créé avec succès
- **400 Bad Request** : Données invalides
- **401 Unauthorized** : Token manquant ou invalide
- **403 Forbidden** : Seuls les clients peuvent ouvrir des tickets
- **500 Internal Server Error** : Erreur serveur

### 5. Voir les détails d'un ticket (protégé)

**GET** `/api/tickets/:id`

Récupère les détails d'un ticket spécifique.

#### Headers requis

```
Authorization: Bearer <token_jwt>
```

#### Réponses

- **200 OK** : Détails du ticket
- **401 Unauthorized** : Token manquant ou invalide
- **404 Not Found** : Ticket non trouvé
- **500 Internal Server Error** : Erreur serveur

## Flux d'authentification sécurisé

### Comment créer un ticket de manière sécurisée

1. **Inscription/Connexion**

```bash
# Inscription
POST /api/auth/register
{
  "name": "Client Test",
  "email": "client@test.com",
  "password": "password123",
  "role": "client"
}

# Ou connexion si déjà inscrit
POST /api/auth/login
{
  "email": "client@test.com",
  "password": "password123"
}

# Réponse : { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

2. **Créer un ticket avec le token**

```bash
POST /api/tickets
Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
{
  "title": "Mon problème",
  "description": "Description détaillée du problème"
}
```

## Sécurité implémentée

- **Authentification JWT** : Tous les endpoints de tickets sont protégés
- **Hachage des mots de passe** : Utilisation de bcrypt avec salt de 12
- **Validation des rôles** : Seuls les clients peuvent créer des tickets
- **Validation des données** : Schémas Zod pour toutes les entrées
- **Extraction sécurisée de l'utilisateur** : L'ID utilisateur vient du token, pas du body

## Variables d'environnement

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ticket_db"
PORT=3000
JWT_SECRET="votre_secret_jwt_super_securise"
```

## Base de données

Le modèle User inclut maintenant :

- `id` : ID unique
- `name` : Nom de l'utilisateur
- `email` : Email unique
- `password` : Mot de passe hashé
- `role` : "client" ou "agent"
- `createAt` : Date de création

## Démarrage

```bash
# Installation des dépendances
npm install

# Migration de la base de données
npx prisma migrate dev

# Démarrage en mode développement
npm run dev
```
