# Stage 1: Build Backend
FROM node:16-alpine AS backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/server.js .

# Stage 2: Serve Frontend and Backend
FROM node:16-alpine
WORKDIR /app
# Copy backend dependencies
COPY --from=backend /app/backend ./backend
# Copy frontend
COPY frontend ./frontend
# Install express in root to serve static files
RUN npm init -y && npm install express
# Copy the combined server.js
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]