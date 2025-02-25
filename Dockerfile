# Stage 1: Building the code
FROM node:20-alpine AS builder

WORKDIR /app

# Install necessary build tools
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the application with ESLint disabled
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DISABLE_ESLINT=true
ENV DISABLE_ESLINT_PLUGIN=true
RUN NEXT_LINT=false npm run build

# Stage 2: Run the built application
FROM node:20-alpine AS runner

WORKDIR /app

# Install necessary runtime packages
RUN apk add --no-cache libc6-compat

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
