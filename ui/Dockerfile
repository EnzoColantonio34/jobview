## Multi-stage Dockerfile for Vite + React
# - `ui-dev` service (in docker-compose) uses the host-mounted source and runs `pnpm dev` for HMR.
# - `ui-prod` builds the app and serves `dist/` via nginx.

########################################
# Stage: dependencies (cache)
########################################
FROM node:20-alpine AS deps
WORKDIR /app
ENV NODE_ENV=production

# Enable Corepack and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only lockfile & package json to install deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod

########################################
# Stage: builder
########################################
FROM node:20-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Build the production assets
RUN pnpm build

########################################
# Stage: runner (nginx)
########################################
FROM nginx:stable-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

# Provide a simple nginx config for SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
