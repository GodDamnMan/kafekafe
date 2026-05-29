# Kafe Halal

Минимальная сборка сайта кафе: React/Vite фронтенд, JSON-меню и картинки блюд, nginx для статики, небольшой Flask API для меню.

## Что где лежит

- `frontend/` - фронтенд, перенесенный из `myFlaskApp/client` без изменений исходников.
- `data/` - исходные данные меню из `myFlaskApp/data`.
- `images/` - изображения блюд из `myFlaskApp/images`.
- `images_optimized/` - WebP-версии картинок для быстрой выдачи с телефонов.
- `services/backend/` - API `GET /api/menu`.
- `services/frontend/` - nginx, который отдает React build, `/api/image/<id>` и проксирует API.
- `scripts/` - проверка меню, оптимизация картинок и smoke-test.
- `deploy/docker-compose.prod.yml` - production compose для Ubuntu-сервера.

## Production

На сервере с Ubuntu 24.04:

```bash
cd mySite/deploy
cp .env.prod.example .env.prod
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build
```

По умолчанию контейнерный nginx публикуется на порт `80`. Чтобы поднять за host nginx/Certbot, поставьте в `deploy/.env.prod`:

```env
HTTP_PORT=127.0.0.1:8080
```

Подробный HTTPS-сценарий лежит в `deploy/HTTPS.md`.

## Local Docker Check

```bash
cd mySite
docker compose -f docker-compose.local.yml up -d --build
```

Локально сайт будет доступен на `http://localhost:8080`.

## Checks

Проверить данные и наличие картинок:

```bash
python3 scripts/check_menu.py
```

Пересобрать оптимизированные WebP-картинки:

```bash
python3 -m pip install -r scripts/requirements.txt
python3 scripts/optimize_images.py
```

Проверить уже поднятый сайт:

```bash
scripts/smoke_test.sh http://localhost:8080
```
