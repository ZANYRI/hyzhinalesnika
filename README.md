# База отдыха «Хижина лесника» (hyzhinalesnika.ru) — Next.js

Полная автономная версия сайта `https://hyzhinalesnika.ru/` на **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.

Все шрифты (`public/fonts/`), фотографии домиков и статей (`public/images/`), иконки и юридические документы хранятся локально в репозитории и не зависят от серверов Megagroup. Онлайн-бронирование подключено через оригинальный модуль **Контур.Отель** (`bookonline24.ru`), карта и отзывы — через виджеты Яндекса.

---

## Быстрый старт локально

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`.

Проверка production-сборки:

```bash
npm run build
npm run start -- -p 3001
```

---

## Запуск вторым сайтом на одном VPS (на отдельном порту `3001`)

Если первый сайт на сервере уже работает (например, на порту `3000`), этот проект запускается параллельно на порту **`3001`** через `PM2`, а `Nginx` разводит домены по разным портам.

### 1. Первичная настройка на сервере

```bash
sudo mkdir -p /var/www/hyzhinalesnika
sudo chown $USER:$USER /var/www/hyzhinalesnika
git clone git@github.com:<ВАШ_АККАУНТ>/<ВАШ_РЕПОЗИТОРИЙ>.git /var/www/hyzhinalesnika
cd /var/www/hyzhinalesnika

cp .env.example .env
npm ci
npm run build

pm2 start ecosystem.config.cjs
pm2 save
```

### 2. Конфигурация Nginx (`/etc/nginx/sites-available/hyzhinalesnika.ru`)

```nginx
server {
    listen 80;
    server_name hyzhinalesnika.ru www.hyzhinalesnika.ru;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активация сайта и выпуск бесплатного SSL-сертификата Let's Encrypt:

```bash
sudo ln -s /etc/nginx/sites-available/hyzhinalesnika.ru /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d hyzhinalesnika.ru -d www.hyzhinalesnika.ru
```

---

## Автодеплой через GitHub Actions (CI/CD)

В репозитории уже настроен workflow `.github/workflows/deploy.yml`. При каждом `git push` в ветку `main` GitHub сначала проверяет сборку, а затем подключается по SSH к серверу и обновляет сайт.

Добавьте в репозитории на GitHub (**Settings → Secrets and variables → Actions**) следующие секреты:

- `VPS_HOST` — IP-адрес вашего сервера
- `VPS_USER` — SSH-пользователь (например, `deploy` или `root`)
- `VPS_SSH_KEY` — приватный SSH-ключ для доступа к серверу
- `VPS_PORT` — SSH-порт (по умолчанию `22`)
- `VPS_APP_DIR` — путь к папке проекта на сервере (по умолчанию `/var/www/hyzhinalesnika`)
