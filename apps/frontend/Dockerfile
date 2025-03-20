# FROM node:18-alpine

# WORKDIR /frontend

# COPY package*.json ./   

# RUN npm install

# COPY . .

# # RUN npm run build

# EXPOSE 5173

# CMD ["npm", "run", "dev"]

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
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
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
 
FROM base AS runner
WORKDIR /frontend
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
# COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
# COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public
 
COPY --from=installer /frontend .
EXPOSE 3000

CMD ["pnpm", "start"]