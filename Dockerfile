# Stage 1: Build Frontend
FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Backend and Serve
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY backend/package.json backend/
WORKDIR /app/backend
RUN npm install
COPY backend/server.js .
EXPOSE 3000
CMD ["node", "server.js"]