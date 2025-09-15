# Exemples d'utilisation API - Ticket Manager

## 🔧 Collection de tests pour votre API

### 1. Inscription d'un client

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Martin",
    "email": "alice@example.com",
    "password": "secure123",
    "role": "client"
  }'
```

**Réponse attendue :**

```json
{
  "message": "Utilisateur créé avec succès",
  "user": {
    "id": "clm123abc456def789",
    "name": "Alice Martin",
    "email": "alice@example.com",
    "role": "client"
  }
}
```

### 2. Inscription d'un agent

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Agent",
    "email": "bob@support.com",
    "password": "agent123",
    "role": "agent"
  }'
```

### 3. Connexion d'un utilisateur

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "secure123"
  }'
```

**Réponse attendue :**

```json
{
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbG0xMjNhYmM0NTZkZWY3ODkiLCJpYXQiOjE2OTQ3ODQwMDAsImV4cCI6MTY5NDg3MDQwMH0.signature",
  "user": {
    "id": "clm123abc456def789",
    "name": "Alice Martin",
    "email": "alice@example.com",
    "role": "client"
  }
}
```

### 4. Créer un ticket (client authentifié)

```bash
# Remplacez YOUR_JWT_TOKEN par le token reçu lors de la connexion
curl -X POST http://localhost:4000/api/tickets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Problème de connexion",
    "description": "Je n'\''arrive pas à me connecter à mon compte depuis ce matin. Le message d'\''erreur indique un problème de mot de passe mais je suis sûr qu'\''il est correct."
  }'
```

**Réponse attendue :**

```json
{
  "message": "Ticket créé avec succès",
  "ticket": {
    "id": "clm456def789ghi012",
    "userId": "clm123abc456def789",
    "title": "Problème de connexion",
    "description": "Je n'arrive pas à me connecter à mon compte depuis ce matin...",
    "status": "open",
    "createAt": "2025-09-15T22:30:00.000Z",
    "user": {
      "id": "clm123abc456def789",
      "name": "Alice Martin",
      "email": "alice@example.com",
      "role": "client"
    }
  }
}
```

### 5. Voir les détails d'un ticket

```bash
# Remplacez TICKET_ID par l'ID du ticket et YOUR_JWT_TOKEN par votre token
curl -X GET http://localhost:4000/api/tickets/TICKET_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## ⚠️ Cas d'erreurs communes

### Tentative de création de ticket sans authentification

```bash
curl -X POST http://localhost:4000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "description": "Test description"
  }'
```

**Réponse :**

```json
{
  "error": "Token d'accès requis"
}
```

### Tentative de création de ticket par un agent

```bash
# Si vous utilisez le token d'un agent au lieu d'un client
curl -X POST http://localhost:4000/api/tickets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer AGENT_TOKEN" \
  -d '{
    "title": "Test",
    "description": "Test description"
  }'
```

**Réponse :**

```json
{
  "error": "Seuls les clients peuvent ouvrir des tickets"
}
```

### Données invalides

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Al",
    "email": "invalid-email",
    "password": "123",
    "role": "invalid"
  }'
```

**Réponse :**

```json
{
  "error": "Données invalides",
  "issues": [
    {
      "path": ["name"],
      "message": "Le nom doit contenir 3 caractères minimum"
    },
    {
      "path": ["email"],
      "message": "Adresse email incorrecte"
    },
    {
      "path": ["password"],
      "message": "Le mot de passe doit contenir au moins 6 caractères"
    },
    {
      "path": ["role"],
      "message": "Le rôle doit être soit 'client' soit 'agent'"
    }
  ]
}
```

## 🧪 Script de test automatisé

Vous pouvez également créer un script de test :

```bash
#!/bin/bash

echo "🚀 Test de l'API Ticket Manager"

# Variables
API_URL="http://localhost:4000/api"
EMAIL="test@example.com"
PASSWORD="password123"

echo "📝 1. Inscription d'un client..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test Client\",
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\",
    \"role\": \"client\"
  }")

echo "✅ Inscription : $REGISTER_RESPONSE"

echo "🔐 2. Connexion..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\"
  }")

echo "✅ Connexion : $LOGIN_RESPONSE"

# Extraire le token (nécessite jq)
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

echo "🎫 3. Création d'un ticket..."
TICKET_RESPONSE=$(curl -s -X POST "$API_URL/tickets" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Ticket de test automatisé",
    "description": "Ce ticket a été créé automatiquement pour tester l'\''API."
  }')

echo "✅ Ticket créé : $TICKET_RESPONSE"

echo "🎉 Tests terminés !"
```

Sauvegardez ce script dans `test-api.sh` et exécutez-le avec `bash test-api.sh`.
