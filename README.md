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

Products and categories are plain TypeScript data — no CMS or database. Edit [`src/data/products.ts`](src/data/products.ts) and [`src/data/categories.ts`](src/data/categories.ts), then rebuild. Product photography is currently a generated placeholder (`src/components/product-art.tsx`); swap in real photos via `next/image` when available.

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

### 2. Deploy to your own VPS

The app is a standard Next.js server (not static export), so it needs Node.js running on the VPS.

```bash
# on the VPS
git clone <your-repo-url>
cd duc-chinh-fashion
npm install
npm run build

# run with PM2 (recommended, keeps the app alive across reboots/crashes)
npm install -g pm2
pm2 start npm --name "duc-chinh-fashion" -- start
pm2 save
pm2 startup   # follow the printed instructions to enable on boot
```

Put nginx in front as a reverse proxy (example `/etc/nginx/sites-available/ducchinhfashion`):

```nginx
server {
    listen 80;
    server_name ducchinhfashion.vn www.ducchinhfashion.vn;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then enable HTTPS with Certbot: `sudo certbot --nginx -d ducchinhfashion.vn -d www.ducchinhfashion.vn`.

To ship an update later: `git pull && npm install && npm run build && pm2 restart duc-chinh-fashion`.

### Node.js version

Next.js 16 requires **Node.js 20.9+**. Check your VPS with `node -v` before deploying.
