# LASYA — Ritual of Elegance

A static-first storefront preview for a premium Indian festive and gifting brand. It uses Vite, React, TypeScript, React Router and local TypeScript data. There is no backend, database, API, authentication, payment gateway, live shipping, or order submission.

## Run locally

```sh
npm install
npm run dev
```

The development server prints its local URL. Production files are generated in `dist/`:

```sh
npm run build
npm run preview
```

The clean routes use browser-side routing. The included `public/_redirects` supports Netlify and Cloudflare Pages-style fallback rules. Configure equivalent rewrites to serve `/index.html` for application routes on other static hosts.

## Checks

```sh
npm test
npm run lint
npm run build
```

## Editing the sample catalogue

- Products, paise prices, variants, stock examples and attributes: `src/data/products.ts`.
- Categories and collection rules: `src/data/collections.ts`.
- Brand copy, FAQs, policy drafts and journal drafts: `src/data/content.ts`.
- Image URL aliases and sizing: `src/data/images.ts`.
- Brand tokens and responsive layouts: `src/styles/site.css`.

Every product, price, material, stock status, campaign threshold and editorial entry is sample content, not confirmed inventory or business information. Replace or verify these values before publication. The content intentionally contains no fabricated reviews, delivery guarantees, contact details, legal claims or successful promotions.

## Brand and photography assets

The official LASYA logo is at `public/images/lasya-logo.jpeg`; the header, footer and favicon load that original file without redrawing it. The shopping bag reference was not supplied. Add it to the gifting section when available.

Most sample photographs reference Unsplash CDN images. The Diwali diya campaign/product reference is “Diya Diwali India” by Subharnab Majumdar, sourced from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Diya_Diwali_India.jpg) under [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/); attribution appears beside the image. They are replaceable in `src/data/products.ts`, `src/data/collections.ts` and `src/data/content.ts`; `src/data/images.ts` centralizes image URLs and attribution. For local hosting, place authorized files under `public/images/` and use paths such as `/images/diwali-clay-diya.webp` in the data. Confirm each image depicts the associated product and optimize its dimensions before publishing.

## Static demo boundaries

- Cart and wishlist are stored in this browser's `localStorage` under versioned LASYA keys.
- Checkout, contact and newsletter forms validate locally only. They do not transmit or store submitted information.
- No payment details are requested; delivery options and item totals are demonstrations only. No order is created or confirmed.
- Account, admin, order tracking, reviews, coupons and live shipping are omitted because they require business data or backend services.
- Policy text and contact details are drafts awaiting merchant review.

## Before publishing

1. Add the approved LASYA logo, shopping bag reference and authorized product images.
2. Replace demo products, prices, stock, variants, editorial content and policy drafts with verified information.
3. Add verified business contact and shipping details; have legal copy reviewed by the merchant's advisor.
4. Replace `YOUR-DOMAIN.example` in `public/robots.txt` and `public/sitemap.xml` with the verified public domain.
5. Confirm the chosen static host's SPA fallback behavior and image-host permissions.

No environment variables or external services are required to run this preview.

For manual GitHub Pages branch publishing from the existing `Lasya` repository, follow [DEPLOYMENT.md](DEPLOYMENT.md).
