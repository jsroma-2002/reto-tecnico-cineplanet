# Stage 1 — Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Variables de entorno Vite (build-time)
ARG VITE_API_URL=http://localhost:3001
ARG VITE_CANDYSTORE_API_URL=http://localhost:8081
ARG VITE_COMPLETE_API_URL=http://localhost:8082
ARG VITE_GOOGLE_CLIENT_ID=

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CANDYSTORE_API_URL=$VITE_CANDYSTORE_API_URL
ENV VITE_COMPLETE_API_URL=$VITE_COMPLETE_API_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

COPY . .
RUN npm run build

# Stage 2 — Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
