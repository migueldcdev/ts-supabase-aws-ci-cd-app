# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Use a lightweight image to serve the app
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Install a lightweight HTTP server
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 4173

# Start the application
CMD ["serve", "-s", "dist", "-l", "4173"]
