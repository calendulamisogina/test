# CLAUDE.md

## Project Overview

This is an Italian wine e-commerce demo application built with **Next.js 14** (App Router), **TypeScript**, and **pure CSS**. It produces a static site export suitable for deployment on Netlify, Vercel, or GitHub Pages.

The app features product browsing, cart management, checkout with form validation, and order confirmation — all with mock data (no backend).

## Repository Structure

```
ecommerce-wine 2/
├── app/
│   ├── layout.tsx            # Root layout (lang="it", metadata, global CSS import)
│   ├── page.tsx              # Home page: product listing + cart sidebar
│   ├── globals.css           # All styles (CSS variables, components, responsive)
│   └── checkout/
│       ├── page.tsx          # Checkout form with validation
│       └── success/
│           └── page.tsx      # Order confirmation with animated checkmark
├── public/images/            # Product images (hero + 6 wines)
├── package.json
├── tsconfig.json
├── next.config.js            # Static export config (output: 'export')
├── netlify.toml              # Netlify deployment settings
└── README.md                 # Documentation (Italian)
```

The project root also contains a `.gitkeep` file.

## Tech Stack

| Technology   | Version | Purpose                          |
|-------------|---------|----------------------------------|
| Next.js     | 14.2.3  | Framework (App Router, static export) |
| React       | ^18.3.1 | UI components                    |
| TypeScript  | ^5.4.5  | Type safety (strict mode)        |
| CSS         | —       | Styling (no framework, pure CSS) |

No external runtime dependencies beyond Next.js and React. No state management library, HTTP client, or CSS framework.

## Development Commands

All commands should be run from the `ecommerce-wine 2/` directory:

```bash
# Install dependencies
npm install

# Start development server (localhost:3000)
npm run dev

# Production build (outputs to out/)
npm run build

# Start production server
npm run start

# Run linter (ESLint via Next.js)
npm run lint
```

## Build & Deployment

- **Build output**: Static HTML export to `out/` directory (`output: 'export'` in next.config.js)
- **Image optimization**: Disabled (`images: { unoptimized: true }`) for static compatibility
- **Trailing slashes**: Enabled for static hosting compatibility
- **Deployment target**: Netlify (configured in `netlify.toml`), but works on any static host

## Architecture & Patterns

### Page Structure (Next.js App Router)

| Route               | File                              | Purpose                     |
|---------------------|-----------------------------------|-----------------------------|
| `/`                 | `app/page.tsx`                    | Product listing + cart      |
| `/checkout`         | `app/checkout/page.tsx`           | Checkout form               |
| `/checkout/success` | `app/checkout/success/page.tsx`   | Order confirmation          |

### State Management

- **React hooks only**: `useState` for local state, `useMemo` for derived values
- **localStorage**: Persists cart data (`wine-cart`) and order data (`wine-last-order`) across page reloads
- **No global state library**: State is managed per-page with localStorage as the bridge between pages

### Client Components

All page components use the `'use client'` directive since they rely on browser APIs (localStorage, window, event handlers).

### Data Models

Key TypeScript interfaces defined in `app/page.tsx`:

- `Wine` — product with id, name, price, vintage, region, type, stock status, rating
- `CartItem` — extends Wine with quantity
- `CheckoutForm` — shipping/billing form fields
- `OrderData` — completed order with items, totals, shipping info

### Mock Data

Six Italian wines are hardcoded in `app/page.tsx`. There is no backend or API integration.

## Code Conventions

### Naming

- **Components**: PascalCase (`WineCard`, `CheckoutPage`, `SuccessPage`)
- **Variables/functions**: camelCase (`cartItems`, `formatPrice`, `handleSubmit`)
- **CSS classes**: kebab-case (`product-card`, `cart-item`, `checkout-btn`)
- **Files**: Next.js convention (`page.tsx`, `layout.tsx`, `globals.css`)

### Styling

- Pure CSS with CSS custom properties (variables) for theming
- Wine-themed color palette: `--wine-dark`, `--wine-red`, `--wine-light`, `--gold`, `--cream`
- Responsive breakpoints at `768px` and `968px`
- Flexbox and CSS Grid for layouts

### Component Patterns

- Sub-components (e.g., `WineCard`) are defined inline within page files
- Utility functions (e.g., `formatPrice()`) are defined at module level
- Form validation uses custom regex patterns (email, phone, ZIP code)
- Navigation uses `next/navigation` router (`useRouter().push()`)

### Accessibility

- Semantic HTML elements (`article`, `section`, `main`, `footer`)
- ARIA labels on interactive elements
- Proper heading hierarchy
- Alt text on images
- Keyboard navigation support

## Testing

No testing framework is currently configured. There are no test files in the repository.

## Linting

ESLint is available through Next.js (`npm run lint`). TypeScript strict mode is enabled in `tsconfig.json`.

## Key Files to Know

- `app/page.tsx` — Main application logic: product data, cart state, product grid, cart sidebar (~400 lines)
- `app/globals.css` — All styling for the entire app (~1370 lines)
- `app/checkout/page.tsx` — Checkout form with validation and order processing
- `app/checkout/success/page.tsx` — Order confirmation with SVG animation
- `next.config.js` — Static export configuration
- `netlify.toml` — Deployment configuration

## Language

The application UI and README are in **Italian**. All user-facing text, product descriptions, form labels, and documentation use Italian language.
