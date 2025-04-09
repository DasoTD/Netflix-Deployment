# Stage 1: Build Backend
FROM node:16-alpine AS backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/server.js .

# Stage 2: Serve Frontend and Backend
FROM node:16-alpine
WORKDIR /app
# Copy backend
COPY --from=backend /app/backend ./backend
# Copy frontend
COPY frontend ./frontend
# Install express in root to serve static files
RUN npm init -y && npm install express
# Simple server to combine frontend and backend
COPY <<EOF ./server.js
const express = require('express');
const app = express();
const port = 3000;

// Serve frontend statically
app.use(express.static('frontend'));

// Backend API
const movies = [
    { title: 'Sample Movie 1', thumbnail: 'https://via.placeholder.com/200' },
    { title: 'Sample Movie 2', thumbnail: 'https://via.placeholder.com/200' }
];
app.get('/movies', (req, res) => {
    res.json(movies);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
EOF

EXPOSE 3000
CMD ["node", "server.js"]