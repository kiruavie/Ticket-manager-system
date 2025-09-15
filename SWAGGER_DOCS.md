# Ticket Manager System - Documentation API avec Swagger

## 📚 Documentation Interactive

Votre API est maintenant documentée avec **Swagger UI** !

### 🌐 Accès à la documentation

Une fois le serveur démarré, accédez à la documentation interactive à l'adresse :

**➡️ [http://localhost:4000/api-docs](http://localhost:4000/api-docs)**

## 🚀 Fonctionnalités de la documentation Swagger

### ✅ Interface Interactive

- **Testez vos endpoints** directement depuis l'interface
- **Authentification JWT** intégrée
- **Exemples de requêtes et réponses** pour chaque endpoint
- **Validation des schémas** en temps réel

### 📋 Endpoints documentés

| Méthode | Endpoint             | Description                      | Authentification |
| ------- | -------------------- | -------------------------------- | ---------------- |
| `POST`  | `/api/auth/register` | Inscription d'un utilisateur     | ❌ Non           |
| `POST`  | `/api/auth/login`    | Connexion et génération du token | ❌ Non           |
| `POST`  | `/api/users`         | Créer un utilisateur (alias)     | ❌ Non           |
| `POST`  | `/api/tickets`       | Créer un nouveau ticket          | ✅ JWT requis    |
| `GET`   | `/api/tickets/{id}`  | Voir les détails d'un ticket     | ✅ JWT requis    |

### 🔐 Comment tester avec authentification

1. **Inscrivez-vous ou connectez-vous** via `/api/auth/login`
2. **Copiez le token** reçu dans la réponse
3. **Cliquez sur "Authorize"** en haut de la page Swagger
4. **Entrez** : `Bearer <votre_token>`
5. **Testez les endpoints protégés** !

## 📝 Exemples d'utilisation

### 1. Inscription

```json
POST /api/auth/register
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "password": "password123",
  "role": "client"
}
```

### 2. Connexion

```json
POST /api/auth/login
{
  "email": "jean@example.com",
  "password": "password123"
}
```

### 3. Créer un ticket (avec token)

```json
POST /api/tickets
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "title": "Problème de connexion",
  "description": "Je n'arrive pas à me connecter depuis ce matin"
}
```

## 🛠️ Démarrage rapide

```bash
# Démarrer le serveur
npm run dev

# Accéder à la documentation
open http://localhost:4000/api-docs
```

## 🎨 Personnalisation Swagger

La configuration Swagger se trouve dans :

- **Configuration** : `src/config/swagger-doc.ts`
- **Intégration** : `src/index.ts`

### Fonctionnalités activées :

- ✅ Authentification Bearer JWT
- ✅ Filtrage des endpoints
- ✅ Durée des requêtes
- ✅ Exemples interactifs
- ✅ Schémas de validation
- ✅ Interface personnalisée

## 📊 Schémas de données

### User

- `id` : ID unique
- `name` : Nom (min 3 caractères)
- `email` : Email valide et unique
- `password` : Mot de passe (min 6 caractères)
- `role` : "client" ou "agent"

### Ticket

- `id` : ID unique du ticket
- `userId` : ID de l'utilisateur propriétaire
- `title` : Titre (min 3 caractères)
- `description` : Description (min 10 caractères)
- `status` : "open", "in_progress" ou "closed"
- `user` : Informations de l'utilisateur

## 🔒 Sécurité

- **JWT Authentication** : Tokens sécurisés pour les endpoints protégés
- **Validation Zod** : Validation stricte des données d'entrée
- **Hachage bcrypt** : Mots de passe sécurisés
- **Vérification des rôles** : Contrôle d'accès basé sur les rôles

## 🌟 Avantages de Swagger

1. **Documentation automatique** à jour
2. **Tests interactifs** sans Postman
3. **Onboarding facile** pour les développeurs
4. **Validation des contrats** API
5. **Génération de clients** automatique

---

🎉 **Votre API est maintenant parfaitement documentée !**

Naviguez vers [http://localhost:4000/api-docs](http://localhost:4000/api-docs) pour explorer votre documentation interactive.
