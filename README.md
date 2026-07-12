# Đức Chinh Fashion

Luxury fashion storefront for **Đức Chinh Fashion**, built with Next.js 16 (App Router, Turbopack), Tailwind CSS v4, and `next-intl` for Vietnamese/English bilingual routing.

## Stack

- **Framework:** Next.js 16 (App Router, static site generation)
- **Styling:** Tailwind CSS v4, custom design tokens (ivory / ink / gold palette), Playfair Display + Inter
- **i18n:** `next-intl` — `/vi` and `/en` routes, all copy in [`src/messages`](src/messages)
- **Data:** Static TypeScript catalog in [`src/data`](src/data) (3 categories, 12 products) — no database yet
- **Cart:** Client-side, persisted to `localStorage` via `useSyncExternalStore`
- **Checkout:** Demo flow (COD / bank-transfer placeholder). **No live payment gateway is wired up** — see [Payments](#payments-not-yet-connected) below

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` (redirects to `/vi`).

```bash
npm run build   # production build, prerenders all locale/category/product pages
npm run start   # serve the production build
npm run lint    # ESLint
```

## Project structure

```
src/
  app/[locale]/        route segments (home, collections, product, cart, checkout, about, contact)
  components/          UI components (header, footer, product card, cart, forms...)
  context/cart-context.tsx   cart state (localStorage-backed)
  data/                 product & category catalog (edit here to change the catalog)
  i18n/                 next-intl routing/navigation config
  messages/{vi,en}.json all UI copy
  proxy.ts              next-intl locale routing (Next.js 16 renamed `middleware.ts` to `proxy.ts`)
```

### Editing the catalog

Products and categories are plain TypeScript data — no CMS or database. Edit [`src/data/products.ts`](src/data/products.ts) and [`src/data/categories.ts`](src/data/categories.ts), then rebuild.

### Photography

`public/images/` currently holds **stock photography from Unsplash** (free under the [Unsplash License](https://unsplash.com/license), no attribution required) — it stands in for real product shots so the site feels alive, but it is not actual Đức Chinh Fashion merchandise or models. Before a real launch, replace every file under `public/images/products`, `public/images/categories`, `public/images/hero.jpg`, and `public/images/about/` with your own product photography, then update the paths in `src/data/products.ts` / `src/data/categories.ts` if filenames change.

## Payments (not yet connected)

Checkout collects shipping info and lets the customer pick **COD** or **bank transfer**, then shows a confirmation screen — no money moves and no order is actually transmitted anywhere. When you're ready to go live:

1. Pick a gateway (Stripe for international cards, or VNPay/MoMo for domestic).
2. Add the gateway's server SDK and API routes under `src/app/api/`.
3. Store secret keys in environment variables (`.env.local`, never commit them).
4. Replace the `handleSubmit` stub in [`src/app/[locale]/checkout/page.tsx`](src/app/[locale]/checkout/page.tsx) with a real request to your new API route.

## Deploying

### 1. Push to GitHub

```bash
git remote add origin <your-empty-repo-url>
git branch -M main
git push -u origin main
```

### 2. Deploy to your own VPS (Docker)

The repo includes a `Dockerfile` (Next.js standalone build) and `docker-compose.yml`, matching a VPS that already runs other apps as Docker containers behind nginx — the container binds to `127.0.0.1:3300` (host-only, not the public port), and nginx reverse-proxies the public port to it. Using a different host port for the container than the public nginx port avoids a port collision between the two.

```bash
# on the VPS
mkdir -p /opt/apps && cd /opt/apps
git clone https://github.com/ducchinhit/ducchinhFashion.git duc-chinh-fashion
cd duc-chinh-fashion
docker compose up -d --build
```

Add an nginx server block for the public port you want to expose it on (example `/etc/nginx/sites-available/duc-chinh-fashion`, listening on port 3000 and proxying to the container's host-mapped port 3300):

```nginx
server {
    listen 3000;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3300;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/duc-chinh-fashion /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

Once you have a domain pointed at the VPS, swap `server_name _;` for the real domain, change `listen 3000;` to `listen 80;` (or add a TLS block), and enable HTTPS with Certbot.

To ship an update later:

```bash
cd /opt/apps/duc-chinh-fashion && git pull && docker compose up -d --build
```

#### Alternative: PM2 without Docker

If the VPS doesn't run Docker, install Node.js 20.9+ directly and run the app with PM2 instead:

```bash
npm install && npm run build
npm install -g pm2
pm2 start npm --name "duc-chinh-fashion" -- start
pm2 save && pm2 startup
```

Then point nginx at `http://127.0.0.1:3000` the same way as above.

### Node.js version

Next.js 16 requires **Node.js 20.9+**. Check your VPS with `node -v` before deploying.
