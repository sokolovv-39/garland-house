FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

# Установка зависимостей для сборки
FROM base AS builder
WORKDIR /app
RUN npm install  # Добавляем установку зависимостей перед сборкой
COPY . .
RUN npm run build

# Конфигурация для production
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
RUN npm ci --only=production  # Устанавливаем только production-зависимости
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
CMD ["npm", "start"]

# Конфигурация для development
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
