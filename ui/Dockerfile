## Multi-stage Dockerfile for Next.js
# - `ui-dev` service (in docker-compose) uses host mounting and runs `pnpm dev` for HMR.
# - `ui-prod` builds and runs the standalone Next.js server.

########################################
# Stage: dependencies (cache)
########################################
FROM node:20-alpine AS deps
WORKDIR /app

# Enable Corepack and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only lockfile & package json to install deps
COPY package.json ./
RUN pnpm install --no-frozen-lockfile

########################################
# Stage: builder
########################################
FROM node:20-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Build the production assets
ENV NODE_ENV=production
RUN pnpm build

########################################
# Stage: runner
########################################
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only the artifacts needed by Next standalone runtime.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

EXPOSE 3000
CMD ["node", "server.js"]
