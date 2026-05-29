FROM node:24-alpine AS build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.29-alpine

COPY services/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /app/dist /usr/share/nginx/html
COPY --chown=101:101 images /usr/share/nginx/menu-images
COPY --chown=101:101 images_optimized /usr/share/nginx/menu-images-optimized

EXPOSE 8080
