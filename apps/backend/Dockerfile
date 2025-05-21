# Etapa 1 - Builder
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm install -g nx
RUN npx nx build backend

# Etapa 2 - Runtime
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/apps/backend/dist ./dist

CMD ["node", "dist/main.js"]
