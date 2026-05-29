# HTTPS on Ubuntu 24.04

There are two supported production shapes.

## Direct HTTP

Use this when another load balancer or cloud panel terminates HTTPS before the server.

```bash
cp .env.prod.example .env.prod
sed -i 's/^HTTP_PORT=.*/HTTP_PORT=80/' .env.prod
docker compose --env-file .env.prod -f docker-compose.prod.yml pull
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d
```

## Host nginx + Certbot

Use this when this Ubuntu server should own the public TLS certificate.

1. Bind the app container only to localhost:

```bash
cp .env.prod.example .env.prod
sed -i 's/^HTTP_PORT=.*/HTTP_PORT=127.0.0.1:8080/' .env.prod
docker compose --env-file .env.prod -f docker-compose.prod.yml pull
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d
```

2. Install host nginx and Certbot:

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

3. Copy `nginx-host-http.conf.example` to the host nginx config, replace `example.com`, then enable it:

```bash
sudo cp nginx-host-http.conf.example /etc/nginx/sites-available/kafe-halal.conf
sudo nano /etc/nginx/sites-available/kafe-halal.conf
sudo ln -sf /etc/nginx/sites-available/kafe-halal.conf /etc/nginx/sites-enabled/kafe-halal.conf
sudo nginx -t
sudo systemctl reload nginx
```

4. Issue and install the certificate:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot will edit the enabled nginx site and add HTTPS/redirect rules.
