
FROM node:18-alpine AS base
RUN corepack enable
 
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /frontend
# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN yarn global add turbo@^2
RUN npm install -g turbo
# RUN npm install -g pnpm@^9
COPY . .
   

# Install dependencies
RUN pnpm install

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune frontend --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /frontend
 
# First install the dependencies (as they change less often)
COPY --from=builder /frontend/out/json/ .
RUN pnpm install
 
# Build the project
COPY --from=builder /frontend/out/full/ .
RUN pnpm turbo build
 
FROM nginx:alpine AS production
WORKDIR /frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
# COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
# COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public
 
COPY --from=installer /frontend/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]