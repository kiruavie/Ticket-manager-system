# Documentation API - Système de Gestion de Tickets

## Endpoints implémentés

### 1. Créer un utilisateur

**POST** `/api/users`

Crée un nouvel utilisateur (client ou agent).

#### Corps de la requête

```json
{
  "name": "string (min 3 caractères)",
  "email": "string (email valide)",
  "role": "client" | "agent"
}
```

#### Exemple de requête

```json
{
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "role": "client"
}
```

#### Réponses

- **201 Created** : Utilisateur créé avec succès
- **400 Bad Request** : Données invalides
- **500 Internal Server Error** : Erreur serveur

### 2. Ouvrir un ticket

**POST** `/api/tickets`

Permet à un client d'ouvrir un nouveau ticket de support.

#### Corps de la requête

```json
{
  "userId": "string (ID de l'utilisateur)",
  "title": "string (min 3 caractères)",
  "description": "string (min 10 caractères)"
}
```

#### Exemple de requête

```json
{
  "userId": "clm123abc456def789",
  "title": "Problème de connexion",
  "description": "Je n'arrive pas à me connecter à mon compte depuis ce matin."
}
```

#### Réponses

- **201 Created** : Ticket créé avec succès
- **400 Bad Request** : Données invalides
- **403 Forbidden** : Seuls les clients peuvent ouvrir des tickets
- **404 Not Found** : Utilisateur non trouvé
- **500 Internal Server Error** : Erreur serveur

#### Exemple de réponse

```json
{
  "message": "Ticket créé avec succès",
  "ticket": {
    "id": "clm456def789ghi012",
    "userId": "clm123abc456def789",
    "title": "Problème de connexion",
    "description": "Je n'arrive pas à me connecter à mon compte depuis ce matin.",
    "status": "open",
    "createAt": "2025-09-11T12:30:00.000Z",
    "user": {
      "id": "clm123abc456def789",
      "name": "Jean Dupont",
      "email": "jean.dupont@example.com",
      "role": "client"
    }
  }
}
```

## Base de données

Le système utilise PostgreSQL avec Prisma ORM. Les modèles incluent :

- **User** : Utilisateurs (clients et agents)
- **Ticket** : Tickets de support
- **Message** : Messages dans les tickets

## Variables d'environnement

Assurez-vous d'avoir un fichier `.env` avec :

```
DATABASE_URL="postgresql://username:password@localhost:5432/ticket_db"
PORT=3000
```

## Démarrage

```bash
# Installation des dépendances
npm install

# Migration de la base de données
npx prisma migrate dev

# Démarrage en mode développement
npm run dev
```
