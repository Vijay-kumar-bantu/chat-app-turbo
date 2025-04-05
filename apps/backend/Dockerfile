FROM node:18-alpine AS base
RUN corepack enable
 
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /backend

#Install turbo globally
RUN npm install -g turbo

# Copy package files and turbo config
COPY . .

# Install dependencies
# RUN pnpm install

# Copy the rest of the source code
# COPY . .
 
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune backend --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /backend
 
# First install the dependencies (as they change less often)
COPY --from=builder /backend/out/json/ .
RUN pnpm install
 
# Build the project
COPY --from=builder /backend/out/full/ .
COPY ./apps/backend/.env.prod ./apps/backend/.env
RUN pnpm run build
 
FROM base AS runner
WORKDIR /backend
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
 
COPY --from=installer /backend .

EXPOSE 8080

CMD ["pnpm", "start"]