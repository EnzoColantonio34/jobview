# Jobview

Jobview est une application de suivi de recherche d'emploi (candidatures, entreprises, entretiens, profil) avec un module LLM pour s'entrainer aux entretiens.

## Stack technique

- Monorepo pnpm workspace (`api`, `ui`, `shared`)
- Backend: NestJS + TypeORM + PostgreSQL
- Frontend: Next.js (App Router) + React + TanStack Query
- Package partage: DTOs TypeScript communs (`@jobview/shared`)
- Environnement dev: Docker Compose (API, UI, PostgreSQL)

## Architecture du projet

```text
jobview/
├── api/                    # Backend NestJS
│   ├── src/
│   │   ├── main.ts         # Bootstrap, CORS, validation globale, prefix /api/v1
│   │   ├── app.module.ts   # Modules principaux + config TypeORM
│   │   └── modules/v1/
│   │       ├── auth/
│   │       ├── users/
│   │       ├── companies/
│   │       ├── interviews/
│   │       ├── degrees/
│   │       ├── experiences/
│   │       ├── user-contexts/
│   │       └── chat/       # Integration LLM (preparation entretien)
│   ├── uploads/avatars/    # Fichiers uploades
│   └── docker-compose.yml  # Services DB + API dev
│
├── ui/                     # Frontend Next.js
│   ├── app/                # Routes App Router (auth, onboarding, settings...)
│   │   └── api/[...proxy]/ # Proxy serveur vers l'API backend
│   ├── components/         # UI par domaine (auth, chat, calendar, layout, etc.)
│   ├── hooks/              # Hooks custom + queries/mutations
│   ├── lib/                # API client, schemas, utils
│   ├── providers/          # Auth, i18n, theme, query client
│   └── docker-compose.yml  # Service UI dev / prod
│
├── shared/                 # Contrat commun front/back
│   └── src/dtos/           # DTOs exportes dans @jobview/shared
│
├── package.json            # Scripts racine (docker, dev, build)
└── pnpm-workspace.yaml     # Declaration des workspaces
```

## Prerequis

- Node.js 20+
- Corepack active
- pnpm 10.13.1
- Docker Desktop (recommande pour le dev local)

## Lancer le projet

### Scripts pnpm utiles

Depuis la racine (pour lancer en dev) :
```bash
pnpm i
pnpm run dev
```

Depuis la racine (pour lancer en prod) :

```bash
pnpm i
pnpm build
pnpm start
```

Acces:

- UI: http://localhost:5173
- API: http://localhost:3001/api/v1
- PostgreSQL: localhost:5433

## Endpoints et conventions

- Prefix global API: `/api/v1`
- Le frontend appelle l'API via `ui/app/api/[...proxy]/route.ts`
- Les DTOs sont centralises dans `shared/src/dtos`

## Resume

- `api` = logique metier + donnees + auth + chat LLM
- `ui` = experience utilisateur (suivi candidatures, calendrier, profil, chat)
- `shared` = contrat TypeScript commun front/back