## Multi-stage Dockerfile for Next.js
# - `ui-dev` service (in docker-compose) uses host mounting and runs `pnpm dev` for HMR.
# - `ui-prod` builds and runs the standalone Next.js server.
# NOTE: build context must be the monorepo root so pnpm-lock.yaml is available.

########################################
# Stage: dependencies (cache)
########################################
FROM node:20-alpine AS deps
WORKDIR /app

# Enable Corepack and install pinned pnpm version
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

# Copy workspace manifests and lockfile for reproducible installs
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY ui/package.json ./ui/
COPY api/package.json ./api/
COPY shared/package.json ./shared/
RUN pnpm install --frozen-lockfile --filter ui

########################################
# Stage: builder
########################################
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/ui/node_modules ./ui/node_modules

# Build the production assets
ENV NODE_ENV=production
RUN pnpm --filter ui run build

########################################
# Stage: runner
########################################
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only the artifacts needed by Next standalone runtime.
COPY --from=builder /app/ui/public ./public
COPY --from=builder /app/ui/.next/static ./.next/static
COPY --from=builder /app/ui/.next/standalone ./

EXPOSE 3000
CMD ["node", "server.js"]
