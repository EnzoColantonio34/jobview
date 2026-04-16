# Jobview

## 🛠️ Configuration des Variables d'Environnement (.env)

Obligatoire pour le fonctionnement de l'app : ajouter un fichier .env dans `jobview/api/`

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| **APPLICATION** | | |
| `PORT` | Port d'écoute de l'API NestJS | `3001` |
| **DATABASE** | | |
| `DB_HOST` | Hôte de la base de données PostgreSQL | `localhost` |
| `DB_PORT` | Port d'écoute PostgreSQL | `5433` |
| `DB_USER` | Nom de l'utilisateur de la base de données | `jobview-user` |
| `DB_PASSWORD` | Mot de passe de l'utilisateur PostgreSQL | `jobview-password` |
| `DB_NAME` | Nom de la base de données | `jobview-database` |
| **JWT CONFIG** | | |
| `JWT_SECRET` | Clé secrète pour signer les Access Tokens | *Clé générée via OpenSSL* |
| `JWT_REFRESH_SECRET` | Clé secrète pour signer les Refresh Tokens | *Clé générée via OpenSSL* |

> **Note** : Pour obtenir une clé facilement avec OpenSSL, exécuter la commande `openssl rand -base64 48` dans un terminal Linux, masOS ou Git Bash et copier-coller la clé générée.


## 🏁 Lancement de l'application

Démarrez le serveur en mode développement avec rechargement automatique :

```bash
pnpm i 
pnpm run dev
```
