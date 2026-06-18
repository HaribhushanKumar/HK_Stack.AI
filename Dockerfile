# Stage 1: Build the React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
# Build the production bundle
RUN npm run build

# Stage 2: Serve via Node/Express Backend
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend/ ./backend/
# Copy the built frontend static assets from Stage 1 into the backend container space
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

EXPOSE 5000
ENV NODE_ENV=production
WORKDIR /app/backend
CMD ["node", "index.js"]
