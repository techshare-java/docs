---
id: frontend-dev
title: Frontend Development
sidebar_label: Frontend Dev Guide
sidebar_position: 3
---

# Frontend Development Guide

This guide covers the frontend development workflow for `techshare-fe`.

---

## Project Structure

```
src/
├── api/
│   └── ordersApi.ts       Fetch client + mock toggle
├── components/
│   ├── OrderForm.tsx       Create-order form
│   └── OrderList.tsx       Orders table
├── types/
│   └── order.ts            TypeScript interfaces
├── App.tsx                 Root component, state orchestration
└── main.tsx                React entry point
```

---

## Running in development

```bash
npm run dev       # dev server on http://localhost:5173
npm run build     # TypeScript check + production build
```

---

## Mock Mode

The API client in `ordersApi.ts` supports a local mock that bypasses the backend entirely. This is useful for:

- Working on UI without running the backend
- Demos without a network connection
- UI-only feature development

**Enable mock mode:**

```bash
# techshare-fe/.env.local
VITE_USE_MOCK=true
```

The mock replicates all domain rules (STARTER seat cap, enterprise approval threshold) and ships with two pre-seeded orders.

---

## Adding a new API call

1. Add the TypeScript type to `src/types/order.ts` if needed.
2. Add a real `fetch` function and a mock equivalent in `src/api/ordersApi.ts`.
3. Call it from a component or `App.tsx`.

Follow the existing pattern — keep the mock and real implementations in the same file, gated by `USE_MOCK`.

---

## Vite Proxy

`vite.config.ts` proxies all `/api` requests to `http://localhost:8080` during development:

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
},
```

This means you can call `/api/v1/orders` from the frontend without worrying about CORS in development.

---

## TypeScript

The project uses strict TypeScript. Run a type check at any time:

```bash
npx tsc --noEmit
```

This is also run as part of `npm run build`.
