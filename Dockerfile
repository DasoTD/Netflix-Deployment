# Stage 1: Build Backend (optional, if keeping separate backend logic)
FROM node:16-alpine AS backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/server.js .

# Stage 2: Serve Frontend and Backend
FROM node:16-alpine
WORKDIR /app
# Copy frontend
COPY frontend ./frontend
# Copy root server.js and dependencies
COPY package.json package-lock.json ./
RUN npm install
COPY server.js .
# Expose port
EXPOSE 3000
CMD ["node", "server.js"]