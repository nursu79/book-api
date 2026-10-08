# ==========================================
# STAGE 1: Build Phase
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests first for efficient layer caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies for TypeScript build)
RUN npm ci

# Copy TypeScript source code and config
COPY tsconfig.json ./
COPY src ./src

# Compile TypeScript to JavaScript (outputs to /app/dist)
RUN npm run build

# ==========================================
# STAGE 2: Production Runtime Phase
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package manifests and install ONLY production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled JavaScript code from builder stage
COPY --from=builder /app/dist ./dist

# Expose HTTP port
EXPOSE 3000

# Run as non-root user for container security
USER node

# Start production server
CMD ["node", "dist/server.js"]
